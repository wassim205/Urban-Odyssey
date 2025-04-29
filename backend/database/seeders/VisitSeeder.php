<?php

namespace Database\Seeders;

use App\Models\Place;
use App\Models\User;
use App\Models\Visits;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VisitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            Visits::create([
                'user_id' => $user->id,
                'ip_address' => fake()->ipv4(),
                'visit_date' => now()->subDays(rand(1, 30)),
                'user_agent' => fake()->userAgent(),
                'session_id' => Str::uuid(),
            ]);
        }
    }
}
