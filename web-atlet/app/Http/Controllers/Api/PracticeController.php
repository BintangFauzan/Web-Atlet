<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Practice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PracticeController extends Controller
{
    public function destroy($id){
      $practice = Practice::findOrFail($id);
      $practice->delete();
      return response()->json([
        'status' => true,
        'message' => 'jadwal latihan berhasil dihapus',
        'data' => $practice
      ]);
    }
}
