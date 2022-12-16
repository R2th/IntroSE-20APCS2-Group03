Nguồn: **alexeymezenin** dịch và chém bởi **Tuấn Dũng Nguyễn**.

If you like this article, please star the original repository: https://github.com/alexeymezenin/laravel-best-practices
# Đặt vấn đề
Khi ta mới bắt đầu học code, việc ta quan tâm chỉ là code làm sao cho chạy được. Chấm hết đúng không nào, nhưng theo thời gian bạn không còn code một mình nữa, ở level cao hơn bạn phải code theo team vì dự án trăm ngàn đô, triệu đô... không thể 1 người code mà được.

Khi làm theo team bạn phải đối mặt với nhiều thứ, trong đó có việc code làm sao cho mọi người trong team đọc hiểu, không phải bỏ chạy mấy trăm mét vì code lởm của bạn gây ra. Vậy thì code Laravel làm sao cho chuẩn, hãy đọc hết bài viết này nhé!

# 1. Nguyên tắc ĐƠN TRÁCH NHIỆM - Single responsibility principle (SRP)
* Một lớp và một phương thức nên chỉ có một trách nhiệm và nên chỉ có một trách nhiệm mà thôi, cái này là nguyên tắc của **SOLID** trong hướng đối tượng PHP.
* Ví dụ: Giả sử như table user của bạn có các trường là first_name, middle_name, last_name, gender và bạn muốn lấy ra full_name. Nhưng nếu user đã đăng nhập, đã được xác nhận và user đó là khách hàng của công ty bạn, bạn phải xưng hô Ông/Bà ở đằng trước full_name.
* Sử dụng **Accessors** trong Laravel ta làm như sau:
****
Coder Laravel gà viết thế này:
```
    public function getFullNameAttribute()
    {
        if ($this->gender) {
            $genderText = 'Mr. ';
        } else {
            $genderText = 'Mrs. ';
        }

        if (auth()->user() && auth()->user()->hasRole('client') && auth()->user()->isVerified()) {
            return $genderText . $this->first_name . ' ' . $this->middle_name . ' ' . $this->last_name;
        } else {
            return $this->first_name . ' ' . $this->last_name;
        }
    }
```

Coder Laravel Pro sẽ viết thế này (Tách bạch mọi thứ ra hết, mỗi hàm chỉ đảm nhận 1 nhiệm vụ xử lý duy nhất)
```
    public function getFullNameAttribute()
    {
        return $this->isVerifiedClient() ? $this->getFullNameLong() : $this->getFullNameShort();
    }

    public function isVerifiedClient()
    {
        // Trả về true or false
        return auth()->user() && auth()->user()->hasRole('client') && auth()->user()->isVerified();
    }

    public function getFullNameLong()
    {
        return $this->gender_text . $this->first_name . ' ' . $this->middle_name . ' ' . $this->last_name;
    }

    public function getFullNameShort()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getGenderTextAttribute()
    {
        // Nếu là nam
        if ($this->gender) {
            return 'Mr. ';
        }
        return 'Mrs. ';
    }
```

# 2. Models thì mập, Controllers thì gầy - Fat models, skinny controllers

* Đặt tất cả các logic liên quan đến DB vào các Eloquent model hoặc vào các lớp Repository nếu bạn đang sử dụng Query Builder hoặc raw Query.

* Coder Laravel gà sẽ viết:
```
    public function index()
    {
        $clients = Client::verified()
            ->with(['orders' => function ($q) {
                $q->where('created_at', '>', Carbon::today()->subWeek());
            }])
            ->get();

        return view('index', ['clients' => $clients]);
    }
```

* Về logic không sai một tí nào, nhưng nếu là coder Laravel chuẩn sẽ viết:

```
    public function index()
    {
        return view('index', ['clients' => $this->client->getWithNewOrders()]);
    }

    class Client extends Model
    {
        public function getWithNewOrders()
        {
            return $this->verified()
                ->with(['orders' => function ($q) {
                    $q->where('created_at', '>', Carbon::today()->subWeek());
                }])
                ->get();
        }
    }
```

* Ở đoạn code này, ta đặt một phương thức getWithNewOrders() viết tất tần tật Query trong đó và ở controller chỉ gọi 1 dòng duy nhất. Giả sử như có 10 chỗ dùng getWithNewOrdedùng, chỗ nào bạn cũng viết thẳng vào controller,  nếu mà logic đó cần chỉnh sửa, bạn phải chỉnh cả 10 chỗ. 

# 3. Validation - Kiểm tra dữ liệu đầu vào
* Hãy để đoạn code validate vào trong Request.
* Laravel cung cấp linh hoạt nhiều cách để validate.
* Coder Laravel gà chắc chắn sẽ chọn cách đơn giản nhất:

```
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
            'publish_at' => 'nullable|date',
        ]);

        ....
    }
```

* Coder Pro thì sao:
```
    public function store(PostRequest $request)
    {    
        ....
    }

    // chạy lệnh: php artisan make:request PostRequest
    class PostRequest extends Request
    {
        public function authorize()
        {
            true;
        }

        public function rules()
        {
            return [
                'title' => 'required|unique:posts|max:255',
                'body' => 'required',
                'publish_at' => 'nullable|date',
            ];
        }
    }
```

# 4. Logic nghiệp vụ (Business) phải ở trong lớp dịch vụ (Service)

* Giả sử như bạn có 1 form trong đó có mục upload hình, dữ liệu sẽ được gửi lên "ArticleController@store" và bạn lưu hình upload lên vào một thư mục nào đó trên server. 
* Ta cùng xem coder Laravel gà sẽ viết gì nào:

```
    public function store(Request $request)
    {
        if ($request->hasFile('image')) {
            // move file vào 1 thư mục nào đó
            $request->file('image')->move(public_path('images') . 'temp');
        }

        ....
    }
```

* Coder Version Pro
```
    public function store(Request $request)
    {
        $this->articleService->handleUploadedImage($request->file('image'));

        ....
    }

    class ArticleService
    {
        public function handleUploadedImage($image)
        {
            if (!is_null($image)) {
                $image->move(public_path('images') . 'temp');
            }
        }
    }
```

* Bạn thấy gì không? **NGUYÊN TẮC THỨ NHẤT LUÔN ĐÚNG!**
*  Vì sao? 
    => Hàm store ý nghĩa của nó là store dữ liệu người dùng gửi lên vào database, nếu kiêm luôn cả việc move hình đi đâu nữa thì
    chẳng phải là vi phạm nguyên tắc thứ nhất rồi sao? Việc lưu hình đi đâu có phải là 1 nghiệp vụ không? Đúng vậy, những thứ gì mang tính đặc thù hãy đưa nó cho Service class xử lý nhé!
*  Khi xử lý các nghiệp vụ, ta nên đưa vào lớp service. Có rất nhiều lợi ích như sau:

    1. Trong controller sẽ mỏng đi, đáp ứng nguyên lý số 2 (mỏng controller).
    2. Ngoài front em cũng xử lý upload image, trong backend em cũng xử lý upload image, nếu viết thẳng trong controller em sẽ k tái sử dụng được (em sẽ chọn cách copy code - sai từ đây)
    => tái sử dụng
    3. Khi nghiệp vụ quy về cho service xử lý, nghiệp vụ thay đổi em chỉ cần maintain lớp service mà k quan tâm nó được dùng ở đâu
    => dễ maintain
    4.  ...



# 5. Don't repeat yourself (DRY) - Đừng tự lặp lại chính mình

* Tái sử dụng code của bạn bất cứ khi nào có thể. Hãy áp dụng nguyên tắc thứ nhất ở trên, chắc chắn bạn sẽ không vi phạm nguyên tắc số 5 này. Hễ bạn thấy đoạn code nào được viết từ 2 lần trở lên, hãy nghiên cứu đưa nó về 1 hàm và gọi đến, nhiều hàm có cùng điểm giống nhau thì tổ chức thành class. Đấy là cách mà pro đã làm. 
* Ta hãy xem bạn tự làm khổ mình như thế nào bằng cách xem ví dụ dưới đây nhé
```
    public function getActive()
    {
        return $this->where('verified', 1)->whereNotNull('deleted_at')->get();
    }

    public function getArticles()
    {
        return $this->whereHas('user', function ($q) {
                $q->where('verified', 1)->whereNotNull('deleted_at');
            })->get();
    }
```

* Bạn thấy gì không where('verified', 1)->whereNotNull('deleted_at') được viết ở 2 nơi. 
Coder có kinh nghiệm sẽ viết:

```
    public function scopeActive($q)
    {
        return $q->where('verified', 1)->whereNotNull('deleted_at');
    }

    public function getActive()
    {
        return $this->active()->get();
    }

    public function getArticles()
    {
        return $this->whereHas('user', function ($q) {
                $q->active();
            })->get();
    }
```

* Dễ đúng không nào, đưa phần giống nhau vào scope query trong Laravel, sau này có thêm điều kiện active là sms verify chẳng hạn, bạn có phải mất công đi sửa code ở N chỗ hay không?

# 6. Ưu tiên dùng Eloquent hơn Query Builder, raw SQL. Ưu tiên Collection hơn là array.

* Eloquent cho phép bạn viết mã có thể đọc và duy trì được sau này. Eloquent có rất nhiều built-in tools như scope, soft deletes, events, relationship, ...
* Nhiều bạn sẽ đặt ưu tiên cho tốc độ, nhưng biết bao nhiêu ưu điểm của Eloquent đổi lấy vài phần trăm speed là quá đáng để hi sinh.

```
    SELECT *
    FROM `articles`
    WHERE EXISTS (SELECT *
                  FROM `users`
                  WHERE `articles`.`user_id` = `users`.`id`
                  AND EXISTS (SELECT *
                              FROM `profiles`
                              WHERE `profiles`.`user_id` = `users`.`id`) 
                  AND `users`.`deleted_at` IS NULL)
    AND `verified` = '1'
    AND `active` = '1'
    ORDER BY `created_at` DESC
```

wow, chắc phải có kiến thức về mysql,  để đọc cái đoạn EXITS loằng ngoằng kia chỉ để mất 3 tiếng để hiểu và 5 phút để chỉnh sửa, thất là quá đáng lắm luôn á 😱😱😭😭

* Coder Laravel pro ơi, viết Eloquent em coi thử đi:
```
    Article::has('user.profile')->verified()->latest()->get();
```

* Oh, ACTICLE ⇒ HAS ⇒ USER ⇒ PROFILE ⇒ VERIFIED ⇒ LATEST ⇒ GET. Ôi mẹ ơi, không khác gì bài văn tiếng Anh 🤩🤩🌺🌺

* Collection trong Laravel phải nói là kì quan thiên nhiên vĩ đại, nó bao hàm cả array trong đó và còn plus thêm gần cả trăm function hỗ trợ hiện đại, bạn đã bao giờ dùng map, chunk, pop, push, pipe,... chưa 😵 

* Chẳng hạn bạn muốn lấy ra user có tuổi lớn hơn 18:

```
    $usersOver18 = User::where('age', '>=' 18)->get();
```

* Bây giờ bạn muốn lọc thêm là ở Hà Nội, có mã province_id là 4. Thay vì tốn thêm 1 query vào db như cách viết dưới đây:

```
    $usersOver18LiveInHaNoi = User::where('age', '>=' 18)->where('province_id', 4)->get();
```

* Bạn có thể tận dụng kết quả đã lấy ở trên
```
    $usersOver18LiveInHaNoi = $usersOver18->where('province_id', 4);
```
# 7. Mass assignment - Gán giá trị hàng loạt

* Khi tạo một bài viết mới, code sẽ như thế này:
    ```
    $article = new Article;
    $article->title = $request->title;
    $article->content = $request->content;
    $article->verified = $request->verified;
    // Add category to article
    $article->category_id = $category->id;
    $article->save();
    ```

*  Nhưng nếu database có 50 cột, thì không ổn phải không nào!!!

* Hãy dùng tính năng Mass assignment:

    ```
    $category->article()->create($request->all());
    ```
    => Tính năng mass assignment của Laravel, cho phép bạn insert hàng loạt vào database, chỉ cần bên form phần name giống với cột trong database. Thay vì insert thủ công như ví dụ ở trên
    
    https://laravel.com/docs/master/eloquent#mass-assignment 
# 8. Không thực hiện truy vấn trong Blade view và sử dụng eager loading (N + 1 query)

* Giả sử trong Blade bạn thực hiện show danh sách all user, đi kèm với profile.
    ```php
    @foreach (User::all() as $user)
        {{ $user->profile->name }}
    @endforeach
    ```

* Ở đây  , profile chính là mối quan hệ và Laravel sẽ truy vấn Query đó sau mỗi vòng lặp, giả sử có 100 user thì đoạn code trên sẽ thực hiện 101 truy vấn lên db 😐😐

* Coder Laravel chuẩn phải viết

    ```
    // trong controller
    $users = User::with('profile')->get();


    // ngoài blade view
    @foreach ($users as $user)
        {{ $user->profile->name }}
    @endforeach
    ```
    
    
    Nguồn: **alexeymezenin** 
    
    If you like this article, please star the original repository: https://github.com/alexeymezenin/laravel-best-practices