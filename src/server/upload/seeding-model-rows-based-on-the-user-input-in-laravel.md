# **1.Giới thiệu**
![](https://images.viblo.asia/eb731051-1582-4a8d-866f-4dbe03ee2845.png)

Laravel cung cấp phương pháp dễ dàng tạo dữ liệu mẫu trong database bằng các lớp seed.
Nhưng sẽ rất hữu ích nếu bạn có thể nhập số lượng record ưa thích mỗi khi **seeder**, tức là bạn không hard code or setting **.env** nữa . 

Thay vồ đó, bạn chỉ cần nhập số record mỗi khi chạy **command**, kiểu như thế này: `How many books you want to create?`
# **2.Bắt đầu**
* Tạo Factory **BookFactory.php** trong **database/factories** `php artisan make:factory BookFactory`

     ```
    <?php

    namespace Database\Factories;

    use App\Models\Book;
    use Illuminate\Database\Eloquent\Factories\Factory;
    use Illuminate\Support\Str;

    class BookFactory extends Factory
    {
        /**
         * The name of the factory's corresponding model.
         *
         * @var string
         */
        protected $model = Book::class;

        /**
         * Define the model's default state.
         *
         * @return array
         */
        public function definition()
        {
            return [
                'title' => $this->faker->name,
                'author' => $this->faker->name,
                'published' => 1
            ];
        }
    }
    ```

* Tạo **BookSeeder.php** trong **database/seeds**
    ```
    <?php

    namespace Database\Seeders;

    use App\Models\Book;
    use Illuminate\Database\Seeder;

    class BookSeeder extends Seeder
    {
        /**
         * Seed the application's database.
         *
         * @return void
         */
        public function run()
        {
            $count = $this->command->ask(
                'How many books you want to create?', 
                10
            );

            Book::factory((int)$count)->create();
        }
    }
    ```
*  **Deploy**

    Bây giờ, khi bạn chạy `php Artian db: seed --class = BookSeeder`, bạn sẽ được nhắc với câu hỏi "How many books you want to create ?”. 
    
    Bạn chỉ cần nhập số **record** hoặc chỉ cần nhấn **enter**, thao tác này sẽ tạo ra 10 **record** theo mặc định.
    
    ![](https://images.viblo.asia/cc1be8cd-31be-46a4-b18b-da62eef2e27a.png)

# **3.Kết luận**
Hy vọng với chia sẻ trên sẽ giúp a/e phần nào có thể Apply vào dự án của mình khi cần thiết !

Thân ái , chồ tộm biệt, quyết thắng !