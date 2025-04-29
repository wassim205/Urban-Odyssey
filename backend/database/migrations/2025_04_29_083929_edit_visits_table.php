<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('visits', function (Blueprint $table) {
            $table->dropForeign(['place_id']);
            $table->dropColumn('place_id');

            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('ip_address', 45)->default('0.0.0.0');
            $table->date('visit_date');
            $table->text('user_agent')->nullable();
            $table->string('session_id')->nullable();
        });

            Schema::table('visits', function (Blueprint $table) {
                $table->string('ip_address', 45)->nullable(false)->default(null)->change();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
