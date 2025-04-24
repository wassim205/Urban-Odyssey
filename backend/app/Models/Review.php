<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $primaryKey = 'review_id';

    protected $fillable = [
        'user_id',
        'facility_id',
        'rating',
        'comment',
        'status',
    ];


    public function facility()
    {
        return $this->belongsTo(NearbyFacility::class, 'facility_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
