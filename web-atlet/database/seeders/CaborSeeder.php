<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CaborSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cabors')->insert([
            ['nama_cabor' => 'Sepakbola'],
            ['nama_cabor' => 'Basket'],
            ['nama_cabor' => 'Voli']
        ]);
    }
}
