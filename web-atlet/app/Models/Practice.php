<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Practice extends Model
{
    protected $fillable = [
        'team_id',
        'date',
        'start_time',
        'end_time',
        'location',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function attendances()
    {
        return $this->hasMany(PracticeAttendance::class);
    }

    public function attendees()
    {
        return $this->belongsToMany(User::class, 'practice_attendances')
            ->using(PracticeAttendance::class)
            ->withPivot('status', 'check_in_time')
            ->as('attendance_data');
    }
}
