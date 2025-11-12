<?php

namespace Database\Seeders;

use App\Models\Matche;
use App\Models\Practice;
use App\Models\PracticeAttendance;
use App\Models\Team;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
  public function run(): void
    {
        // === 1. Buat 1 Manajer (ID: 1) ===
        $manager = User::factory()->create([
            'name' => 'Bintang Manager',
            'email' => 'manager@test.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'team_id' => null,
        ]);

        // === 2. Buat 2 Tim (Total: 2) ===
        $team1 = Team::factory()->create([
            'name' => 'Tim Elang Merah',
            'manager_id' => $manager->id,
        ]);
        
        $team2 = Team::factory()->create([
            'name' => 'Tim Harimau Biru',
            'manager_id' => $manager->id,
        ]);

        // === 3. Buat 2 Pelatih & 6 Atlet (Total User: 1 + 2 + 7 = 10) ===
        $coach1 = User::factory()->create([
            'name' => 'Sarah Pelatih 1',
            'email' => 'coach1@test.com',
            'password' => Hash::make('password'),
            'role' => 'coach',
            'team_id' => $team1->id,
        ]);
        
        $coach2 = User::factory()->create([
            'name' => 'Doni Pelatih 2',
            'email' => 'coach2@test.com',
            'password' => Hash::make('password'),
            'role' => 'coach',
            'team_id' => $team2->id,
        ]);
        
        // Buat 7 Atlet (4 di Tim 1, 3 di Tim 2)
        $athletesTeam1 = User::factory(4)->create([
            'role' => 'athlete',
            'team_id' => $team1->id,
        ]);
        $athletesTeam2 = User::factory(3)->create([
            'role' => 'athlete',
            'team_id' => $team2->id,
        ]);

        $allAthletes = $athletesTeam1->merge($athletesTeam2);


        // === 4. Buat 10 Jadwal Latihan (Practices) ===
        $practices = collect();
        for ($i = 0; $i < 10; $i++) {
            $team = ($i % 2 === 0) ? $team1 : $team2;
            
            $practices->push(Practice::factory()->create([
                'team_id' => $team->id,
                'date' => Carbon::now()->addDays($i)->toDateString(),
            ]));
        }


        // === 5. Buat 10 Jadwal Pertandingan (Matches) ===
        $matches = collect();
        for ($i = 0; $i < 10; $i++) {
            $team = ($i % 2 === 0) ? $team1 : $team2;
            
            $matches->push(Matche::factory()->create([
                'team_id' => $team->id,
                'date' => Carbon::now()->addWeeks($i)->toDateString(),
            ]));
        }

        // === 6. Buat 10 Data Absensi (Practice Attendances) ===
        // Ambil 10 latihan pertama dan buat absensi untuk 1 Atlet pertama di setiap tim
        
        // Atlet yang akan diuji absensinya (ID 4)
        $testAthlete = $athletesTeam1->first(); 
        
        for ($i = 0; $i < 10; $i++) {
            $practice = $practices->get($i);
            
            PracticeAttendance::create([
                'practice_id' => $practice->id,
                'user_id' => $testAthlete->id,
                'status' => ($i % 3 === 0) ? 'present' : 'absent', // Variasikan status
                'check_in_time' => ($i % 3 === 0) ? Carbon::now()->subMinutes(rand(1, 30)) : null,
            ]);
        }
    }
}
