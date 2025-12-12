<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Kosongkan tabel users, KECUALI user manager.
        // Ini penting agar akun manager Anda tidak terhapus.
        User::where('role', '!=', 'manager')->delete();

        // 2. Ambil semua tim yang sudah dibuat oleh TeamSeeder.
        $teams = Team::all();

        // 3. Lakukan perulangan untuk setiap tim.
        foreach ($teams as $team) {
            // 4. Buat 1 pelatih (coach) untuk setiap tim.
            User::factory()->create([
                'role' => 'coach',
                'team_id' => $team->id,
            ]);

            // 5. Buat 7 atlet (athlete) untuk setiap tim.
            // Anda bisa mengubah angka 7 sesuai kebutuhan.
            User::factory(7)->create([
                'role' => 'athlete',
                'team_id' => $team->id,
            ]);
        }
    }
}