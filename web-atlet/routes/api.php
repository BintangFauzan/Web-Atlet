<?php

use App\Http\Controllers\Api\AthleteController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CaborController;
use App\Http\Controllers\Api\CoachController;
use App\Http\Controllers\Api\ManagerController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\Api\PracticeController;
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

    Route::get('/match', [MatchController::class, 'index']);
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
        
        // Edit user
        Route::put("user/{id}", [AuthController::class, 'update']);
        // Delete User
        Route::delete('user/{id}', [AuthController::class, 'deleteUser']);

        // Cabor
        Route::get('cabor', [CaborController::class, 'index']);
        Route::post('cabor', [CaborController::class, 'store']);
        Route::put('cabor/{id}', [CaborController::class, 'update']);
        Route::delete('cabor/{id}', [CaborController::class, 'destroy']);

        // Tim
        Route::post('teams', [ManagerController::class, 'storeTeam']);
        // Update Tim
        Route::put("teams/{id}", [ManagerController::class, 'updateTeam']);
        // Hapus Tim
        Route::delete('teams/{id}', [ManagerController::class, 'deleteTim']);
        
        // Latihan
        Route::post('practices', [ManagerController::class, 'storePractice']);
        // Update latihan
        Route::put("practices/{id}", [ManagerController::class, 'updateJadwalPraktek']);
        
        // Pertandingan (Matche)
        Route::post('matches', [ManagerController::class, 'storeMatche']);
        // Update jadwal pertandingan
        Route::put("/matches/{id}", [ManagerController::class, 'updateJadwalPertandingan']);

        // Hapus jadwal pertandingan
        Route::delete("/matches/{id}", [MatchController::class, "destroy"]);

        // Hapus jadwal latihan
        Route::delete("/practice/{id}", [PracticeController::class, 'destroy']);    
    });
});
