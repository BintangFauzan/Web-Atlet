<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Practice>
 */
class PracticeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
       return [
            // Tambahkan semua kolom yang wajib diisi (NOT NULL)
            'start_time' => '19:00:00', // Waktu Mulai default
            'end_time' => '21:00:00',   // Waktu Selesai default
            'location' => fake()->address(), // Lokasi dummy
        ];
    }
}
