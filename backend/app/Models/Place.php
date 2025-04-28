<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Place extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'city',
        'country',
        'description',
        'latitude',
        'longitude',
        'image_url',
        'address',
        'category',
    ];

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'user_favorites')
            ->withTimestamps();
    }
    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'place_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'place_category');
    }
}
