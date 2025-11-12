<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required',
            // Manager bisa mendaftar sendiri, Coach, atau Athlete
            'role' => 'required|in:manager,coach,athlete', 
            
            // Validasi Tim (Hanya diwajibkan jika bukan Manager)
            'team_id' => 'nullable|exists:teams,id', 
        ]);
        
        // Aturan Khusus Team ID:
        $teamId = $request->team_id;
        if ($request->role !== 'manager' && !$teamId) {
            // Atlet/Pelatih wajib memiliki team_id
             return response()->json(['message' => 'Atlet dan Pelatih harus terikat pada Team ID.'], 422);
        }
        
        if ($request->role === 'manager') {
            // Manager tidak boleh terikat pada team_id tertentu (untuk skema kita)
             $teamId = null;
        }

        // Buat Pengguna Baru
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'team_id' => $teamId, // Menggunakan teamId yang sudah divalidasi
        ]);
        
        // Buat token (agar langsung bisa login setelah register)
        $token = $user->createToken("auth_token_{$user->role}", [$user->role])->plainTextToken;

        return response()->json([
            'message' => 'Pendaftaran berhasil. Silakan gunakan token ini untuk mengakses API.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'team_id' => $user->team_id,
            ],
            'token' => $token,
        ], 201);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Kredensial yang diberikan tidak cocok dengan catatan kami.'],
            ]);
        }

        $user = Auth::user();

        // Hapus token lama untuk keamanan
        $user->tokens()->delete();

        // Buat token baru
        $token = $user->createToken("auth_token_{$user->role}", [$user->role])->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'team_id' => $user->team_id,
            ]
        ], 200);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Berhasil logout.'], 200);
    }
}
