<?php

namespace Database\Factories;

use App\Models\Team;
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
        // 1. Buat waktu mulai secara acak
        $startTime = fake()->time('H:i:s');
        // 2. Buat waktu selesai dengan menambahkan 1-2 jam dari waktu mulai
        $endTime = date('H:i:s', strtotime($startTime) + fake()->numberBetween(1, 2) * 3600);

       return [
            'team_id' => Team::all()->random()->id, // Lebih efisien
            'date' => fake()->dateTimeBetween('now', '+1 month')->format('Y-m-d'), // Tanggal acak 1 bulan ke depan
            'start_time' => $startTime,
            'end_time' => $endTime,
            'location' => fake()->streetAddress(), // Lebih cocok untuk lokasi latihan
        ];
    }
}
