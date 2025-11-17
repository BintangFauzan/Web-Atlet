<?php

use App\Http\Controllers\Api\AthleteController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CoachController;
use App\Http\Controllers\Api\ManagerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/current', function(Request $request){
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
   // Rute untuk Pelatih (Coach)
    Route::prefix('coach')->group(function () {
        Route::get('dashboard', [CoachController::class, 'dashboard']);
        Route::get('attendance/{practice}', [CoachController::class, 'getAttendance']);
        Route::post('attendance/update', [CoachController::class, 'updateAttendance']);
        // ... rute lain untuk Pelatih
    });

    // Rute untuk Atlet (Athlete)
    Route::prefix('athlete')->group(function () {
        Route::get('dashboard', [AthleteController::class, 'dashboard']);
        Route::post('checkin/{practice}', [AthleteController::class, 'checkIn']);
        Route::get('attendance/{practice}', [AthleteController::class, 'myAttendance']);
        // ... rute lain untuk Atlet
    }); 

    Route::prefix('manager')->group(function() {
        // Dashboard
        Route::get('dashboard', [ManagerController::class, 'dashboard']);

        // Tim
        Route::post('teams', [ManagerController::class, 'storeTeam']);
        
        // Latihan
        Route::post('practices', [ManagerController::class, 'storePractice']);
        
        // Pertandingan (Matche)
        Route::post('matches', [ManagerController::class, 'storeMatche']);
    });
});
