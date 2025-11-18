<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index(){
        $team = Team::latest()->paginate(15);
        return response()->json([
            'status' => true,
            'data' => $team
        ]);
    }
}
