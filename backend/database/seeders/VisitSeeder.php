<?php

namespace Database\Seeders;

use App\Models\Place;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VisitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $places = Place::all();

        $visits = [];
        foreach ($places as $place) {
            $randomVisits = rand(50, 200);
            for ($i = 0; $i < $randomVisits; $i++) {
                $visits[] = [
                    'place_id' => $place->id,
                    'created_at' => now()->subDays(rand(0, 365)),
                ];
            }
        }

        DB::table('visits')->insert($visits);
    }
}
