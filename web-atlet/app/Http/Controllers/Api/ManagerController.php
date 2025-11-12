<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Matche;
use App\Models\Practice;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    public function storeTeam(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255|unique:teams,name']);

        $team = Team::create([
            'name' => $request->name,
            'manager_id' => Auth::id(), // Langsung dari Manager yang sedang login
        ]);

        return response()->json(['message' => 'Tim berhasil dibuat.', 'team' => $team], 201);
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
}
