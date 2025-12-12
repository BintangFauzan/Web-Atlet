<?php

namespace Database\Seeders;

use App\Models\Matche;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Matche::truncate();
        Matche::factory(10)->create();
    }
}
