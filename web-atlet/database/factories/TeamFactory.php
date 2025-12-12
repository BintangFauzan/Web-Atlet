<?php

namespace Database\Factories;

use App\Models\Cabor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->city() . ' FC',
            // Mengambil ID cabor secara acak. Pastikan tabel cabor sudah terisi.
            'cabor_id' => Cabor::all()->random()->id,
            // Mengambil ID dari satu akun manager yang sudah terdaftar.
            // Pastikan ada user dengan role 'manager' sebelum menjalankan seeder.
            'manager_id' => User::where('role', 'manager')->first()->id,
        ];
    }
}
