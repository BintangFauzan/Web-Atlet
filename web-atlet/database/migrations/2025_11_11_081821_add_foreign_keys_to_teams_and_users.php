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
        // 1. Tambahkan FK Manager ke tabel teams (users sudah ada)
        Schema::table('teams', function (Blueprint $table) {
            $table->foreign('manager_id')->references('id')->on('users')->onDelete('restrict');
        });
        
        // 2. Tambahkan FK Team ke tabel users (teams sudah ada)
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('team_id')->references('id')->on('teams')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['team_id']);
        });

        Schema::table('teams', function (Blueprint $table) {
            $table->dropForeign(['manager_id']);
        });
    }
};
