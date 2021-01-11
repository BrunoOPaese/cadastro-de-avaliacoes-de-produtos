<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductRatings extends Model
{
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function product() {
        return $this->belongsTo('App\Products');
    }
}
