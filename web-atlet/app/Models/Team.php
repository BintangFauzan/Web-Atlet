<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name',
        'manager_id',
    ];

    public function manager(){
        return $this->belongsTo(User::class, 'manager_id');
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
}
