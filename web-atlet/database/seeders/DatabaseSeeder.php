<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // $this->call(TestDataSeeder::class);
        $this->call(CaborSeeder::class);
        $this->call(TeamSeeder::class); // Membuat tim terlebih dahulu
        $this->call(UserSeeder::class); // Kemudian membuat user (pelatih & atlet) untuk tim tersebut
        $this->call(PracticeSeeder::class);
        $this->call(MatchSeeder::class);

    }
}
