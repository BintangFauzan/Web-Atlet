<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PracticeAttendance extends Model
{
    protected $table = 'practice_attendances';

    protected $fillable = [
        'practice_id',
        'user_id',
        'status',
        'check_in_time',
    ];
    
    // Konversi tipe data
    protected $casts = [
        'check_in_time' => 'datetime',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function practice(){
        return $this->belongsTo(Practice::class);
    }
}
