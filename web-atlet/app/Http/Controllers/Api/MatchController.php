<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Matche;
use App\Models\Practice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MatchController extends Controller
{
   public function destroy($id){
    $match = Matche::findOrFail($id);
    $match->delete();
    return response()->json([
        'status' => true,
        'message' => 'berhasil hapus jadwal latihan',
        'data' => $match
    ]);
   }
}
