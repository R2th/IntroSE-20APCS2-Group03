## Increments & Decrements

Thay vì:

```
$article = Article::find($article_id);
$article->read_count++;
$article->save();
```

Chúng ta có thể viết thành:

```
$article = Article::find($article_id);
$article->increment('read_count');
```

Hoặc:

```
Article::find($article_id)->increment('read_count');
Article::find($article_id)->increment('read_count', 10); // +10
Product::find($produce_id)->decrement('stock'); // -1
```

## XorY methods
Eloquent trong laravel có môt số hàm thực hiên tổ hợp của 2 method, ví dụ như  “thực hiện công việc X, nếu không thực hiện Y”.

### Ví dụ 1 – findOrFail():

Thay vì:

```
$user = User::find($id);
if (!$user) { abort (404); }
```

Chúng ta có thể viết thành:

`$user = User::findOrFail($id);`


### Ví dụ 2 – firstOrCreate():

Thay vì:

```
$user = User::where('email', $email)->first();
if (!$user) {
  User::create([
    'email' => $email
  ]);
}
```

Chúng ta có thể viết thành:

`$user = User::firstOrCreate(['email' => $email]);`

## Model boot() method

Chúng ta có thể sử dụng boot() trong Eloquent model để override các default behavior:

```
class User extends Model
{
    public static function boot()
    {
        parent::boot();
        static::updating(function($model)
        {
            // do some logging
            // override some property like $model->something = transform($something);
        });
    }
}
```
###  Ví dụ generate UUID fieldt:

```
public static function boot()
{
  parent::boot();
  self::creating(function ($model) {
    $model->uuid = (string)Uuid::generate();
  });
}
```


## Relationship cùng conditions và ordering

Chắc hẳn các bạn đẫ quá quen thuộc với cú pháp dưới:

```
public function users() {
    return $this->hasMany('App\User');    
}
```

Thay vì vậy chúng ta có thể sử dụng where() và orderBy()

```
public function approvedUsers() {
    return $this->hasMany('App\User')->where('approved', 1)->orderBy('email');
}
```