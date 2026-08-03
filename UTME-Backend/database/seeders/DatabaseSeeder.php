<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Database\Seeders\ChemistrySeeder;
use Database\Seeders\PhysicsSeeder;
use Database\Seeders\AccountingSeeder;
use Database\Seeders\BiologySeeder;
use Database\Seeders\CivilEducationSeeder;
use Database\Seeders\CommerceSeeder;
use Database\Seeders\CRKSeeder;
use Database\Seeders\CurrentAffairSeeder;
use Database\Seeders\EconomicSeeder;
use Database\Seeders\EnglishSeeder;
use Database\Seeders\EnglishLitSeeder;
use Database\Seeders\GeographySeeder;
use Database\Seeders\GovernmentSeeder;
use Database\Seeders\HistorySeeder;
use Database\Seeders\IRSSeeder;
use Database\Seeders\MathemathicsSeeder;
// use Database\Seeders\GovernmentSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        $this->call([
            ChemistrySeeder::class, // Add your seeder here
            AccountingSeeder::class,
            BiologySeeder::class,
            CivilEducationSeeder::class,
            CommerceSeeder::class,
            CRKSeeder::class,
            CurrentAffairSeeder::class,
            EconomicSeeder::class,
            EnglishSeeder::class,
            EnglishLitSeeder::class,
            GeographySeeder::class,
            GovernmentSeeder::class,
            HistorySeeder::class,
            IRKSeeder::class,
            MathematicsSeeder::class,
            PhysicsSeeder::class,
        ]);


    }
}
