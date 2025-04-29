<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visits extends Model
{
    protected $table = 'visits';

    protected $fillable = [
        'user_id',
        'ip_address',
        'visit_date',
        'user_agent',
        'session_id',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
