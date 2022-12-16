### **Tip 1: Sử dụng updateOrCreate() để tránh dư thừa dữ liệu**

Hãy tưởng tượng rằng khi bạn sử dụng seeder này, và chạy nó nhiều lần:

```
public function run()
{
    $items = [            
        ['id' => 1, 'title' => 'Administrator'],
        ['id' => 2, 'title' => 'Simple user'],
    ];

    foreach ($items as $item) {
        Role::create($item);
    }
}
```

Đến lần thứ hai bạn chạy seeder thì có thể sẽ thất bại vì ID xung đột. Trong trường hợp dữ liệu ban đầu của bạn không có ID, thì bạn có thể tạo mới được dữ liệu nhưng nó sẽ tạo ra rất nhiều bản ghi giống nhau. Để tránh điều đó, bạn nên thay đổi code một chút.

```
foreach ($items as $item) {
    Role::updateOrCreate(['id' => $item['id']], $item);
}
```

### **Tip 2: Chạy riêng một class seeder**

Rất nhiều người thường hay chỉ chạy lệnh này

```
php artisan db:seed
```

Khi chạy lệnh này thì nó sẽ chạy mọi thứ được liệt kê trong file **DatabaseSeeder.php**.

Nhưng nếu bạn chỉ muốn chạy một file seeder nào đó riêng biệt, thì bạn có thể chạy lệnh này:

```
php artisan db:seed --class=UsersTableSeeder
```

### **Tip 3: Chạy seeder class từ migration**

Để thực hiện công việc này, bạn có thể làm như sau:

```
public function up()
{
    Schema::create('themes', function (Blueprint $table) {
        $table->increments('id');
        $table->text('name');
    });

    Artisan::call('db:seed', [
        '--class' => ThemesTableSeeder::class
    ]);
}
```


### **Tip 4: Seeder Factory với relationship: Sử dụng Parent's Factory**

Nếu bạn sử dụng Factory, bạn có thể thiết lập  mối quan hệ giữa hai mô hình. Ví dụ, bạn cần tạo 10 công ty và 10 liên hệ trong các công ty đó.

```
$factory->define(App\Contact::class, function (Faker\Generator $faker) {
    return [
        'company_id' => factory('App\Company')->create()->id,
        'first_name' => $faker->firstName(),
        'last_name' => $faker->lastName,
        'phone1' => $faker->phoneNumber,
        'phone2' => $faker->phoneNumber,
        'email' => $faker->email,
        'skype' => $faker->word,
        'address' => $faker->address,
    ];
});
```

### **Tip 5: DatabaseSeeder cho local và production**

Đôi khi bạn chỉ cần seeder một số dữ liệu trên môi trường local của bạn, nhưng nó lại không có trên môi trường production. Hoặc sử dụng các dữ liệu khác nhau trên các môi trường khác nhau.

Không chắc đây có phải là cách tốt hay không, nhưng đây là cách tôi hay sử dụng trong trường hợp này:

```
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if (app()->environment() == 'production') {
            $this->call(ThemesTableSeeder::class);
            $this->call(LanguagesTableSeeder::class);
        } else {
            $this->call(UsersTableSeeder::class);
            $this->call(ModulesTableSeeder::class);
            $this->call(ThemesTableSeeder::class);
            $this->call(LanguagesTableSeeder::class);
        }
    }
}
```

**Tài liệu tham khảo:**

https://laraveldaily.com/10-tips-about-data-seeding-in-laravel/

https://laravel.com/