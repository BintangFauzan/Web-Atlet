<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cabor extends Model
{
    protected $fillable = [
        
        'nama_cabor'
    ];
    public function team(){
        return $this->hasMany(Team::class);
    }
    public function admin(){
        return $this->belongsTo(User::class, 'admin_id');
    }
}
