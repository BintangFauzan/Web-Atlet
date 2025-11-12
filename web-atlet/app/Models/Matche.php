<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matche extends Model
{
    use HasFactory;
    protected $fillable = [
        'team_id',
        'opponent_name',
        'date',
        'time',
        'location',
        'result',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function team(){
        return $this->belongsTo(Team::class);
    }
}
