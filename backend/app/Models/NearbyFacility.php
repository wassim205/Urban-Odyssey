<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NearbyFacility extends Model
{
   
    protected $table = 'nearby_facilities';
    protected $primaryKey = 'facility_id';
    
    protected $fillable = [
        'name',
        'type',
        'latitude',
        'longitude',
    ];
}
