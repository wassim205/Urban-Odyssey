<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NearbyFacility extends Model
{
    protected $primaryKey = 'facility_id';

    protected $fillable = [
        'name',
        'type',
        'distance',
        'latitude',
        'longitude',
    ];
}
