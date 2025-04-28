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
        Schema::table('places', function (Blueprint $table) {
            $table->dropColumn('category');
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('places', function (Blueprint $table) {
            $table->string('category')->nullable();
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
        });
    }
};
