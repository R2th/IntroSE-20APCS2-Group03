Chào các bạn, Laravel hiện đang là hot trend trong "_thế giới PHP_".
Thao tác với database cũng có rất nhiều bài viết, trong bài viết lần này mình sẽ đưa ra một số kiểu thao tác thêm dữ liệu vào bảng nhưng theo một kiểu phong cách viết bài mới, cộng với thêm có một chút kiến thức của mình vào trong đó.

### 1. Cấu hình cơ bản ban đầu
- Cấu hình mình đang xài cho bài viết này:
    - `Laravel 7` (các bạn vui lòng kiểm tra thêm một số yêu cầu khác cho Laravel bản này nhé)
    - `MySql 5.7`
    - `MacOS`
- Các kiến thức khác: trong bài này mình dùng thêm một số kiến thức khác trong Laravel:
    - _Mutators_ của **Eloquent**:  [link](https://laravel.com/docs/7.x/eloquent-mutators)
    - _Mass Assignment_ của **Eloquent**:  [link](https://laravel.com/docs/7.x/eloquent#mass-assignment)
    - **Builder Query**: [link](https://laravel.com/docs/7.x/queries#inserts)
- Chúng ta sẽ đi xét table `users` với migration:
    ```
    Schema::create('users', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->string('name');
        $table->date('birthday')->nullable();
        $table->string('password')->default('');
        $table->string('status', 20)->default('inactive');
        $table->timestamps();
        $table->softDeletes();
    });
    ```
- Model `User` như sau:
    ```
    use Illuminate\Database\Eloquent\Model;

    class User extends Model
    {
        protected $fillable = [
            'name',
            'birthday',
            'password',
            'status',
        ];

        public function setStatusAttribute($value)
        {
            if (!in_array(['active', 'pending', 'inactive'])) {
                $this->attributes['status'] = 'inactive';
            } else {
                $this->attributes['status'] = $value;
            }
        }

        public function setPasswordAttribute($value)
        {
            if (strlen($hash) == 60 && preg_match('/^\$2y\$/', $hash)) {
                $this->attributes['password'] = $value;
            } else {
                $this->attributes['password'] = bcrypt($value);
            }
        }
    }
    ```

### 2. Thêm mới một dòng dữ liệu vào database
#### 2.1. Model::create
```
    $user = User::create([
        'name'     => 'User 1',
        'birthday' => '1999-09-09',
        'password' => bcrypt('123456'),
        'status'   => 'inactive',
    ]);
```

#### 2.2. Model::insert
```
    $user = User::insert([
        'name'     => 'User 2',
        'birthday' => '1998-08-08',
        'password' => bcrypt('123456'),
        'status'   => 'inactive',
    ]);
```

#### 2.3. DB::insert
```
    DB::table('users')->insert([
        'name'     => 'User 3',
        'birthday' => '1998-07-07',
        'password' => bcrypt('123456'),
        'status'   => 'inactive',
    ]);
```

Ba cách trên đều có kết quả insert một dòng dữ liệu mới vào table `users`.  Ngoài ra, còn một cách nữa là `DB::select(DB::raw('insert ....'))` - mọi người có thể tìm hiểu thêm, tuy nhiên mình không thích cách dùng này.

### 3. So sánh các kiểu thêm dữ liệu
Có bao giờ các bạn tự hỏi, sao nó phải sinh ra nhiều cách làm để làm cho một việc như nhau? 

Mình cùng xem qua các ví dụ bên dưới để có câu trả lời cho riêng mình nha. 

#### 3.1 Kết quả
Trước tiên, chạy thử 3 câu sau đó xem nó có gì khác nhau không:

```
$user = User::create([
    'name'     => 'User 1',
    'birthday' => '1999-09-09',
    'password' => '123456',
    'status'   => 'inactive',
]);

dump("User::create([
    'name'     => 'User 1',
    'birthday' => '1999-09-09',
    'password' => bcrypt('123456'),
    'status'   => 'abcdef',
])", $user);

$user = User::insert([
    'name'     => 'User 1',
    'birthday' => '1999-09-09',
    'password' => '123456',
    'status'   => 'inactive',
]);

dump("User::insert([
    'name'     => 'User 2',
    'birthday' => '1999-09-09',
    'password' => bcrypt('123456'),
    'status'   => 'abcdef',
])", $user);

$user = DB::table('users')->insert([
    'name'     => 'User 3',
    'birthday' => '1999-09-09',
    'password' => '123456',
    'status'   => 'inactive',
]);

dump("User::insert([
    'name'     => 'User 1',
    'birthday' => '1999-09-09',
    'password' => bcrypt('123456'),
    'status'   => 'abcdef',
])", $user);
```

Kết quả:
![](https://images.viblo.asia/e628be07-ae62-4066-b2f3-7c4a37ed3550.png)

Đây là kết quả ở DB:
![](https://images.viblo.asia/932455f7-c207-43fa-93af-550538a90b3b.png)

Giải thích như sau: đó là do cách hoạt động của hàm `insert` và `create`.
- `Insert` thao tác dưới dạng query builder, nên lúc build như nào, nó sẽ ra như vậy
- `Create` dùng dưới dạng mass assignment, nên sẽ là new object, fill rồi sau đó mới save. (Vui lòng tham khảo thêm ở trong document của Laravel hoặc có thể đi sâu vào tầng eloquent của nó (https://laravel.com/docs/7.x/eloquent#mass-assignment))

#### 3.2 Performance

Trong vấn đề đánh giá này mình thử insert tầm `100` dòng dữ liệu để test thử tốc độ của mỗi trường hợp:
```
function create($arr, $fn)
{
    try {
        DB::beginTransaction();
        foreach ($arr as $it) {
            $fn($it);
        }
        DB::commit();
    } catch (Exception $e) {
        DB::rollback();
        dd($e->getMessage());
    }
}
$times   = 100;
$arr     = [];

for ($t = 0; $t < $times; $t++) {
    $arr[] = [
        'name'     => 'User 1',
        'birthday' => '1999-09-09',
        'password' => '123456',
        'status'   => 'inactive',
    ];
}

$fns = [
    'DB::table()->insert()' => function ($it) {
        DB::table('users')->insert($it);
    },
    'User::insert()' => function ($it) {
        User::insert($it);
    },
    'User::create()' => function ($it) {
        User::create($it);
    },
];

foreach ($fns as $label => $fn) {
    $start = microtime(true);
    create($arr, $fn);
    $end = microtime(true);
    dump("Function $label " . number_format($times) . " rows of data in " . ($end - $start) . " seconds");
}
```
Và đây là kết quả:
![](https://images.viblo.asia/50edc213-2187-4a8d-b8aa-a73581dffa81.png)


Để đo tốt hơn cho hai hàm `insert`, mình comment dòng `User::create()` ra, và tăng độ khó lên thành `10,000`, và đây là kết quả:
![](https://images.viblo.asia/9a7e5e8a-2940-4e15-8043-53d2fd88e0b3.png)

Theo mình nguyên nhân là do các bước của mỗi hàm để thực thi:
- `DB::table()->insert()` thì chỉ việc tạo ra câu query và thực hiện.
- `User::insert()` thì nó tạo ra object rồi mới tạo câu query rồi mới thực hiện.
- `User::create()` thì phải tạo object, rồi fill, rồi mới thực hiện - nên chậm hơn 2 cái trên.

## 4. Kết luận.
Trên đây là một số cách để thêm một dòng dữ liệu vào database cũng như ưu nhược điểm của nó mà bản thân mình đã vô tình tìm thấy được, cũng như nghiên cứu thêm để có bài viết này. 

Tuy nhiên, tuỳ vào ngữ cảnh và mục đích code, mỗi cái sẽ phát huy được tác dụng của nó. Hi vọng bài viết này sẽ giúp ích tới mọi người trong trường hợp nào đó. 

Link tài liệu tham khảo: https://laravel.com/docs

Rất mong nhận được sự đóng góp của bạn đọc, xin chân thành cám ơn.