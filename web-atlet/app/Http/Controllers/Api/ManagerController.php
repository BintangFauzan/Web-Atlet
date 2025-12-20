<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Matche;
use App\Models\Practice;
use App\Models\Team;
use Exception;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\LengthAwarePaginator;

class ManagerController extends Controller
{
    public function dashboard()
    {
        $manager = Auth::user();

        // Ambil semua tim yang dikelola oleh Manager ini, termasuk relasi penting.
        $teams = $manager->managedTeams()->with([
            'members', // Anggota tim
            'practices' => fn($q) => $q->orderBy('date')->limit(5), // 5 latihan terdekat
            'matches' => fn($q) => $q->orderBy('date')->limit(5), // 5 pertandingan terdekat
        ])->get();

        return response()->json([
            'manager_name' => $manager->name,
            'total_teams' => $teams->count(),
            'teams_data' => $teams,
        ]);
    }

    public function getSchedules(Request $request)
    {
        $manager = Auth::user();
        $teamIds = $manager->managedTeams()->pluck('id');

        // Mengambil semua jadwal (latihan & pertandingan) dari tim yang dikelola
        $practices = Practice::whereIn('team_id', $teamIds)->with('team:id,name')->get()->map(function ($p) {
            return (object)[
                'id' => 'practice-' . $p->id,
                'type' => 'Latihan',
                'team_name' => $p->team->name,
                'team_id' => $p->team_id,
                'datetime' => Carbon::parse($p->date->format('Y-m-d') . ' ' . $p->start_time),
                'location' => $p->location,
                'date' => $p->date,
                'start_time' => $p->start_time,
                'end_time' => $p->end_time,
            ];
        });

        $matches = Matche::whereIn('team_id', $teamIds)->with('team:id,name')->get()->map(function ($m) {
            return (object)[
                'id' => 'match-' . $m->id,
                'type' => 'Pertandingan',
                'team_name' => $m->team->name,
                'team_id' => $m->team_id,
                'datetime' => Carbon::parse($m->date->format('Y-m-d') . ' ' . $m->time),
                'location' => $m->location,
                'opponent' => $m->opponent_name,
                'date' => $m->date,
                'time' => $m->time,
            ];
        });

        // Gabungkan dan urutkan berdasarkan datetime
        $allSchedules = $practices->concat($matches)->sortBy('datetime');

        // Buat Paginator secara manual
        $perPage = $request->input('per_page', 10); // Default 10 item per halaman, bisa diubah via query param
        $currentPage = $request->input('page', 1);
        $pagedData = new LengthAwarePaginator($allSchedules->forPage($currentPage, $perPage)->values(), $allSchedules->count(), $perPage, $currentPage);

        return response()->json($pagedData);
    }
    public function storeTeam(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255|unique:teams,name', 
    'cabor_id' => 'required'
    ]);

        $team = Team::create([
            'name' => $request->name,
            'cabor_id'=> $request->cabor_id,
            'manager_id' => Auth::id(), // Langsung dari Manager yang sedang login
        ]);

        return response()->json(['message' => 'Tim berhasil dibuat.', 'team' => $team], 201);
    }
    // Update Team
    public function updateTeam($id, Request $request){
        try{
            $validate = $request->validate([
                'name' => 'required|string',
                'manager_id' => Auth::id()
            ]);
            $team = Team::findOrFail($id);
            $team->update($validate);
            return response()->json([
                'status' => true,
                'message' => 'Berhasil update team',
                'data' => $team
            ]);
        }catch(Exception $err){
            return response()->json([
                'status' => false,
                'message' => 'gagal update team',
                'error' => $err
            ]);
        }
    }
    public function deleteTim($id){
        $tim = Team::findOrFail($id);
        $tim->delete();
        return response()->json([
            'status' => true,
            'message' => 'berhasil hapus data',
            'data' => $tim
        ]);
    }
    public function storePractice(Request $request)
    {
        $request->validate([
            'team_id' => 'required|exists:teams,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'location' => 'required|string',
        ]);

        // Cek Otorisasi: Manager hanya bisa membuat jadwal untuk timnya sendiri.
        if (Auth::user()->managedTeams()->where('id', $request->team_id)->doesntExist()) {
            return response()->json(['message' => 'Anda tidak mengelola tim ini.'], 403);
        }

        $practice = Practice::create($request->all());

        return response()->json(['message' => 'Jadwal latihan berhasil dibuat.', 'practice' => $practice], 201);
    }

    // Update Jadwal
    public function updateJadwalPraktek(Request $request, $id){
        try{
            $validate = $request->validate([
            'team_id' => 'required|exists:teams,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'location' => 'required|string',
            ]);
            $practice = Practice::findOrFail($id);
            $practice->update($validate);
            return response()->json([
                'status' => true,
                'message' => 'Berhasil update pratek',
                'data' => $practice
            ]);
        }catch(Exception $err){
            return response()->json([
                'status' => false,
                'messager' => 'gagal update praktek',
                'error' => $err
            ]);
        }
    }
    public function storeMatche(Request $request)
    {
        $request->validate([
            'team_id' => 'required|exists:teams,id',
            'opponent_name' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'location' => 'required|string',
        ]);
        
        // Cek Otorisasi
        if (Auth::user()->managedTeams()->where('id', $request->team_id)->doesntExist()) {
            return response()->json(['message' => 'Anda tidak mengelola tim ini.'], 403);
        }

        $matche = Matche::create($request->all());

        return response()->json(['message' => 'Jadwal pertandingan berhasil dibuat.', 'matche' => $matche], 201);
    }

    // Update jadwal pertandingan
    public function updateJadwalPertandingan(Request $request, $id){
        try{
            $validate = $request->validate([
            'team_id' => 'required|exists:teams,id',
            'opponent_name' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'location' => 'required|string',
            ]);

            $match = Matche::findOrFail($id);
            $match->update($validate);
            return response()->json([
                'status' => true,
                'message' => 'Berhasil update jadwal pertandingan',
                'data' => $match
            ]);
        }catch(Exception $err){
            return response()->json([
                'status' => false,
                'message' => 'Gagal update jadwal pertandingan',
                'error' => $err
            ]);
        }
    }
}
