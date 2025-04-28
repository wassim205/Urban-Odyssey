<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function PHPUnit\Framework\callback;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

       $this->call(CategorySeeder::class);
        // User::create([
        //     'username' => 'testuser',
        //     'firstname' => 'Test',
        //     'lastname' => 'User',
        //     'email' => 'test@example.com',
        //     'email_verified_at' => now(),
        //     'password' => bcrypt('password'),
        //     'role_id' => 1,
        //     'preferred_categories' => json_encode(['Tech', 'Gaming']),
        // ]);
    }
}
