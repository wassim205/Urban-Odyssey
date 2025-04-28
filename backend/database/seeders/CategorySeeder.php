<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Historical'],
            ['name' => 'Nature'],
            ['name' => 'Entertainment'],
            ['name' => 'Shopping'],
            ['name' => 'Food & Drinks'],
            ['name' => 'Museums'],
            ['name' => 'Parks'],
            ['name' => 'Beaches'],
            ['name' => 'Mountains'],
            ['name' => 'Cultural Centers'],
            ['name' => 'Art Galleries'],
            ['name' => 'Landmarks'],
            ['name' => 'Religious Sites'],
            ['name' => 'Amusement Parks'],
            ['name' => 'Zoos & Aquariums'],
            ['name' => 'Sports Venues'],
            ['name' => 'Libraries'],
            ['name' => 'Nightlife'],
            ['name' => 'Theaters'],
            ['name' => 'Markets & Bazaars'],
        ]);
        
    }
}
