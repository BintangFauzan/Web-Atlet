<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Matche;
use App\Models\Practice;
use App\Models\Team;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AthleteController extends Controller
{
    public function dashboard()
    {
        $athlete = Auth::user();

        if ($athlete->role !== 'athlete' || !$athlete->team_id) {
            return response()->json(['message' => 'Akses ditolak atau tim tidak ditemukan.'], 403);
        }

        $team = Team::find($athlete->team_id);

        $today = Carbon::today();
        
        // Ambil 5 jadwal Latihan terdekat
        $upcomingPractices = Practice::where('team_id', $athlete->team_id)
            ->where('date', '>=', $today)
            ->withExists(['attendances as has_checked_in' => function ($query) use ($athlete) {
                $query->where('user_id', $athlete->id);
            }])
            ->orderBy('date')
            ->orderBy('start_time')
            ->limit(5)
            ->get();

        // Ambil 5 jadwal Pertandingan terdekat
        $upcomingMatches = Matche::where('team_id', $athlete->team_id)
            ->whereDate('date', '>=', $today)
            ->orderBy('date')
            ->limit(5)
            ->get();

        return response()->json([
            'team_name' => $team ? $team->name : null,
            'upcoming_practices' => $upcomingPractices,
            'upcoming_matches' => $upcomingMatches,
        ]);
    }

    public function checkIn(Practice $practice)
    {
        $athlete = Auth::user();

        // Otorisasi: Cek apakah Atlet berada di Tim yang benar
        if ($practice->team_id !== $athlete->team_id) {
            return response()->json(['message' => 'Anda bukan anggota tim ini.'], 403);
        }

        // Cek waktu: Pastikan check-in dilakukan pada hari yang sama dengan Latihan
        if (!Carbon::parse($practice->date)->isToday()) {
            return response()->json(['message' => 'Check-in hanya bisa dilakukan pada hari latihan.'], 400);
        }

        // Buat atau perbarui catatan absensi
        $attendance = $athlete->attendances()->updateOrCreate(
            [
                'practice_id' => $practice->id,
                'user_id' => $athlete->id,
            ],
            [
                'status' => 'present',
                'check_in_time' => Carbon::now(),
            ]
        );

        return response()->json(['message' => 'Kehadiran berhasil dicatat.', 'attendance' => $attendance], 200);
    }

    public function myAttendance(Practice $practice)
    {
        $athlete = Auth::user();
        
        // Otorisasi
        if ($practice->team_id !== $athlete->team_id) {
            return response()->json(['message' => 'Anda tidak memiliki akses ke jadwal latihan tim ini.'], 403);
        }

        $attendance = $practice->attendances()
            ->where('user_id', $athlete->id)
            ->first();

        if (!$attendance) {
            return response()->json(['status' => 'absent', 'check_in_time' => null]);
        }

        return response()->json(['status' => $attendance->status, 'check_in_time' => $attendance->check_in_time]);
    }
}
