<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Modify the enum column to add 'admin'
            // Note: Using DB::statement for broader database compatibility (especially for SQLite)
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('manager', 'coach', 'athlete', 'admin')");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Revert the enum column to its original state
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('manager', 'coach', 'athlete')");
        });
    }
};