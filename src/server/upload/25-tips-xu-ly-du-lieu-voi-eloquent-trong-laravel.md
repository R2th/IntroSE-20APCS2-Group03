#  1. Increments and Decrements
```
Article::find($article_id)->increment('read_count');
Article::find($article_id)->increment('read_count', 10); // +10
Product::find($produce_id)->decrement('stock'); // -1
```
# 2. XorY methods
### findOrFail

```$user = User::findOrFail($id);```

### firstOrCreate()

`$user = User::firstOrCreate(['email' => $email]);`

# 3.Model boot() method

```
public static function boot()
    {
        parent::boot();
        
        static::saving(function ($model) {
            // do some logging
            // override some property like $model->something = transform($something);
        });
        static::updating(function($model)
        {
            // do some logging
            // override some property like $model->something = transform($something);
        });
        static::deleting(function($model) { 
            // do some logging
            // override some property like $model->something = transform($something);
       });
        
    }
```

# 4.Relationship with conditions and ordering

```
public function approvedUsers() {
    return $this->hasMany('App\User')->where('approved', 1)->orderBy('email');
}
```

# 5.Model properties: timestamps, appends etc.

```
class User extends Model {
    protected $connection = 'connection-name';
    protected $table = 'users';
    protected $guarded = 'user';
    protected $fillable = ['email', 'password']; // which fields can be filled with User::create()
    protected $dates = ['created_at', 'deleted_at']; // which fields will be Carbon-ized
    protected $appends = ['field1', 'field2']; // additional values returned in JSON
    protected $primaryKey = 'uuid'; // it doesn't have to be "id"
    public $incrementing = false; // and it doesn't even have to be auto-incrementing!
    protected $perPage = 25; // Yes, you can override pagination count PER MODEL (default 15)
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at'; // Yes, even those names can be overridden
    public $timestamps = false; // or even not used at all
}
```

# 6. Find multiple entries

`$users = User::find([1,2,3]);`

# 7. WhereX

```
$users = User::whereApproved(1)->get(); 

User::whereDate('created_at', date('Y-m-d'));

User::whereDay('created_at', date('d'));

User::whereMonth('created_at', date('m'));

User::whereYear('created_at', date('Y'));
```

# 8. Load

```
public function show(Order $order){
    $order = $order->load(['order_info', 'products:id,title','order_address' => function ($query){
        $query->with('province', 'district', 'ward');
    }]);
}
```

# 9. Eloquent::when() – no more if-else’s

```$query = Author::query();
$query->when(request('filter_by') == 'likes', function ($q) {
    return $q->where('likes', '>', request('likes_amount', 0));
});
$query->when(request('filter_by') == 'date', function ($q) {
    return $q->orderBy('created_at', request('ordering_rule', 'desc'));
});
```

# 10. BelongsTo Default Models

`{{ $post->author->name ?? '' }} or {{ optional($post->author)->name }}`

# 11. Order by Mutator
Trong model bạn thêm function:

```
function getFullNameAttribute()
{
  return $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
}
```

Cách sắp xếp:

`$clients = Client::get()->sortBy('full_name'); `

# 12. Default ordering in global scope

```
protected static function boot()
{
    parent::boot();

    // Order by name ASC
    static::addGlobalScope('order', function (Builder $builder) {
        $builder->orderBy('name', 'asc');
    });
}
```

# 13. Raw query methods

```
// whereRaw
$orders = DB::table('orders')
    ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
    ->get();

// havingRaw
Product::groupBy('category_id')->havingRaw('COUNT(*) > 1')->get();

// orderByRaw
User::where('created_at', '>', '2016-01-01')
  ->orderByRaw('(updated_at - created_at) desc')
  ->get();
```

# 14. Replicate: make a copy of a row

```
$task = Tasks::find(1);
$newTask = $task->replicate();
$newTask->save();
```

# 15.Chunk() method for big tables

```
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        // ...
    }
});
```

# 16.Create additional things when creating a model

`php artisan make:model Company -mcr`

* -m tương ứng là sẽ tao ra file migration
* -c tương ứng là sẽ tạo file Controller
* -r tương là sẽ biểu thị rằng Controller được tạo ra là Resource Controller

# 17.Override updated_at when saving

```
$product = Product::find($id);
$product->updated_at = '2019-01-01 10:00:00';
$product->save(['timestamps' => false]);
```

# 18.What is the result of an update()?

`$result = $products->whereNull('category_id')->update(['category_id' => 2]);`

# 19. Transform brackets into an Eloquent query

```
$q->where(function ($query) {
    $query->where('gender', 'Male')
        ->where('age', '>=', 18);
})->orWhere(function($query) {
    $query->where('gender', 'Female')
        ->where('age', '>=', 65); 
})
```

# 20. orWhere with multiple parameters

```
$q->where('a', 1);
$q->orWhere(['b' => 2, 'c' => 3]);
```

# 21. Cache Database Queries

`$questions = Question::remember(60)->get();`

# 22. Forget Cache on Save

```
class Post extends Model
{
    // Forget cache key on storing or updating
    public static function boot()
    {
        parent::boot();
        static::saved(function () {
           Cache::forget('posts');
        });
    }
}
```

# 23. Reduce Memory

`$orders = Order::toBase()->get();`

# 24. Perform any action on failure

```
$model = Flight::where('legs', '>', 3)->firstOr(function () {
    // ...
})
```

# 25. New way to define accessor and mutator

```
// Before, two-method approach
public function setTitleAttribute($value)
{
    $this->attributes['title'] = strtolower($value);
}
public function getTitleAttribute($value)
{
    return strtoupper($value);
}
 
// New approach
protected function title(): Attribute
{
    return new Attribute(
        get: fn ($value) => strtoupper($value),
        set: fn ($value) => strtolower($value),
}
```

Chúc các bạn thành công !