<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Matche>
 */
class MatcheFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Kolom wajib diisi
            'opponent_name' => fake()->company() . ' FC', // Nama lawan dummy
            'time' => '15:00:00', // Waktu Pertandingan default
            'location' => fake()->city(), // Lokasi pertandingan dummy
        ];
    }
}
