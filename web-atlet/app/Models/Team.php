<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Team extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'cabor_id',
        'manager_id',
    ];

    public function manager(){
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function coach(){
        return $this->hasOne(User::class)->where('role', 'coach');
    }

    public function athletes(){
        return $this->hasMany(User::class)->where('role', 'athlete');
    }

    public function members(){
        return $this->hasMany(User::class);
    }

    public function practices(){
        return $this->hasMany(Practice::class);
    }

    public function matches(){
        return $this->hasMany(Matche::class);
    }

    public function cabor(){
        return $this->belongsTo(Cabor::class);
    }
}
