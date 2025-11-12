<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Practice;
use App\Models\Team;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CoachController extends Controller
{
    public function dashboard()
    {
        $coach = Auth::user();

        if ($coach->role !== 'coach' || !$coach->team_id) {
            return response()->json([
                'status' => false,
                'message' => "Akses ditolak"
            ]);
        }

        $team = Team::with([
            'members' => function ($query) {
                $query->where('role', 'athlete')->orderBy('name');
            },
            'matches' => function ($query) {
                $query->where('date', '>=', Carbon::today())->orderBy('date');
            }
        ])->find($coach->team_id);

        if (!$team) {
            return response()->json([
                'status' => false,
                'message' => 'Tim tidak ditemukan'
            ], 404);
        }
        $upcomingPractices = Practice::where('team_id', $coach->team_id)
            ->where(function ($query) {
                $query->whereDate('date', '>', Carbon::today())
                    ->orWhere(function ($query) {
                        $query->whereDate('date', '=', Carbon::today())
                            ->whereTime('start_time', '>', Carbon::now()->format('H:i:s'));
                    });
            })
            ->orderBy('date')
            ->orderBy('start_time')
            ->limit(5)
            ->get();

        return response()->json([
            'team_name' => $team->name,
            'athlete_count' => $team->members->count(),
            'athletes' => $team->members->map(fn($a) => ['id' => $a->id, 'name' => $a->name]), // Hanya nama dan ID
            'upcoming_practices' => $upcomingPractices,
            'upcoming_matches' => $team->matches,
        ]);
    }

    public function getAttendance(Practice $practice){
        $coach = Auth::user();

        // Cek otorisasi: pastikan Pelatih mengelola Tim yang benar
        if ($practice->team_id !== $coach->team_id) {
            return response()->json(['message' => 'Anda tidak memiliki akses ke jadwal latihan tim ini.'], 403);
        }

        // Ambil semua Atlet dari Tim
        $athletes = User::where('team_id', $coach->team_id)
                        ->where('role', 'athlete')
                        ->get(['id', 'name']);
        
        // Ambil semua data absensi untuk Latihan ini
        $attendances = $practice->attendances()->get()->keyBy('user_id');

        // Gabungkan data Atlet dengan status Absensi
        $attendanceList = $athletes->map(function ($athlete) use ($attendances) {
            $status = $attendances->get($athlete->id);
            return [
                'athlete_id' => $athlete->id,
                'athlete_name' => $athlete->name,
                'status' => $status ? $status->status : 'absent', // Default: absent
                'check_in_time' => $status ? $status->check_in_time : null,
            ];
        });

        return response()->json([
            'practice_details' => $practice,
            'attendance_status' => $attendanceList
        ]);
    }

    public function updateAttendance(Request $request){
        $request->validate([
            'practice_id' => 'required|exists:practices,id',
            'athlete_id' => 'required|exists:users,id',
            'status' => 'required|in:present,absent,late',
        ]);

        $coach = Auth::user();
        $athlete = User::find($request->athlete_id);

        // Otorisasi: Cek apakah Pelatih dan Atlet berada dalam Tim yang sama
        if ($coach->team_id !== $athlete->team_id) {
            return response()->json(['message' => 'Atlet tidak berada dalam tim Anda.'], 403);
        }

        // Cari atau buat catatan absensi
        $attendance = $athlete->attendances()->updateOrCreate(
            [
                'practice_id' => $request->practice_id,
                'user_id' => $request->athlete_id,
            ],
            [
                'status' => $request->status,
                'check_in_time' => $request->status === 'present' ? Carbon::now() : null,
            ]
        );

        return response()->json(['message' => 'Status absensi berhasil diperbarui.', 'attendance' => $attendance], 200);
    }
}
