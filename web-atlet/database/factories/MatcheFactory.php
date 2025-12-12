<?php

namespace Database\Factories;

use App\Models\Team;
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
        $startTime = fake()->time('H:i:s');
        $endTime = date('H:i:s', strtotime($startTime) + fake()->numberBetween(1,2)* 3600);
        return [
            // Kolom wajib diisi
            'team_id' => Team::all()->random()->id,
            'opponent_name' => fake()->company() . ' FC', // Nama lawan dummy
            'date' => fake()->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'time' => $startTime, // Waktu Pertandingan default
            'location' => fake()->city(), // Lokasi pertandingan dummy
        ];
    }
}
