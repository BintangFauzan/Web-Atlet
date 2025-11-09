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
       Schema::create('practice_attendances', function (Blueprint $table) {
            $table->id();
            
            // FK: Jadwal Latihan yang diabsen
            $table->foreignId('practice_id')->constrained()->onDelete('cascade'); 
            
            // FK: Pengguna (Atlet/Pelatih) yang mengisi absensi
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Status kehadiran
            $table->enum('status', ['present', 'absent', 'late']);
            
            $table->dateTime('check_in_time')->nullable();
            $table->timestamps();

            // Memastikan satu pengguna hanya bisa absen sekali per Latihan
            $table->unique(['practice_id', 'user_id']); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('practice_attendances');
    }
};
