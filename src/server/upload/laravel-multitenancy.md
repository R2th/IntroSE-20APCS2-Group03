Doc: https://spatie.be/docs/laravel-multitenancy/v2/installation/using-multiple-databases
Ex: https://morioh.com/p/c90628dd793f

**create DB 
- landlord (quản lý domain tương ứng DB) : domain ---conection----> DB

- tenant (các DB tenant):
	+ petbooking ( chọn 1 tenant làm máy chủ)
	+ tenant1
	+ tenant2
	+ tenant3
	+ ...

**migrate vs seed:
- landlord (tạo 1 domain(localhost) - 1DB ban đầu petbooking ):
	sail php artisan migrate --path=database/migrations/landlord --database=landlord
	sail php artisan migrate --path=database/migrations/landlord --database=landlord --seed (only DatabaseLandlordSeeder)
```
class DatabaseLandlordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tenant::create([
            'name' => 'Administrator',
            'domain' => 'localhost',
            'database' => 'petbooking',
        ]);
    }
}
```

- tenant (run all migrate DB: petbooking, tenant1, tenant2...):
	sail php artisan tenants:artisan "migrate --database=tenant --seed" (only UserSeeder)
    
```
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Administrator',
            'email' => 'test@gmail.com',
            'password' => Hash::make('a12345678X'),
            'email_verified_at' => Carbon::now(),
        ]);
    }
}
```

```
config/database.php
'connections' => [
        'mysql' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'tenant' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => null,
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'landlord' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => 'landlord',
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ]
    ],
```

config/multitenancy.php 
```
'tenant_finder' => Spatie\Multitenancy\TenantFinder\DomainTenantFinder::class,
'switch_tenant_tasks' => [
        Spatie\Multitenancy\Tasks\SwitchTenantDatabaseTask::class,
    ],
'tenant_database_connection_name' => null,
'landlord_database_connection_name' => 'landlord',
```

 check : dd(Tenant::current());