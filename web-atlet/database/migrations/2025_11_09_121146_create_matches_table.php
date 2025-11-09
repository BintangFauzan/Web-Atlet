<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
         $table->id();
            
            // FK: Tim yang bertanding
            $table->foreignId('team_id')->constrained()->onDelete('cascade'); 
            
            $table->string('opponent_name');
            $table->date('date');
            $table->time('time');
            $table->string('location');
            $table->string('result')->nullable(); // Hasil pertandingan, bisa kosong
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
