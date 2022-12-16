### Lời mở đầu
&nbsp; &nbsp; &nbsp; &nbsp; Trong quá trình phát triển dự án một điều mà chúng ta thường xuyên bỏ qua và ít khi để ý đó là kiểm soát lỗi hệ thống của chúng ta. Nhưng theo năm tháng ứng dụng của chúng ta ngày càng lớn, càng nhiều module được phát triển thì việc kiểm soát lỗi là vô cùng quan trọng. Khi nhận được yêu cầu thay đổi từ khách hàng chúng ta lại cuống cuồng vào đọc code và sửa lại những đoạn code trước đó. Tuy nhiên đoạn code đó được sử dụng ở khá nhiều nơi, sửa chỗ này lại toang chỗ kia =)). Vậy làm sao để kiểm soát được sửa dòng này thì những chỗ nào sẽ toang? có ảnh hưởng gì tới những chỗ khác không? Nếu dự án của bạn nhỏ thì không vấn đề gì những cứ tưởng tượng dự án của bạn khá lớn, mỗi tháng khách hàng trả cho bạn 100 tỏi và hiện tại đang có vài triệu người dùng thì chắc hẳn dự án của bạn cũng khá lớn rồi đấy. Sửa 1 dòng code thôi là ăn ngay incident như chơi. :v Vậy đấy, những lúc như vậy Unit Test sẽ phát huy tác dụng cực kì. Và hôm nay mình sẽ hướng dẫn các bạn viết test relationship trong model.
<br>
Nhìn lại xem 1 vài quan hệ phổ biến trong Laravel để chúng ta viết test cho nó nhé: <br>
- One to One <br>
- One to Many<br>
- Many to Many<br>
- Polymorphic Relations<br>
- Many To Many Polymorphic Relations<br>

Ok, hãy cùng bắt đầu thôi. :D
 ### 1. Quan hệ One to One (Quan hệ một - một)
 &nbsp;  Ví dụ chúng ta có Model User quan hệ một một với Product
 ##### hasOne()
 ```php
 public function product() 
{ 
    return $this->hasOne(Product::class); 
}
 ```
 Chúng ta sẽ viết test như sau:
 ```php
  public function test_user_has_one_product()
    {
        $user = factory(User::class)->create(); 
        $product = factory(Product::class)->create(['user_id' => $user->id]); 
       
        $this->assertInstanceOf(Product::class, $user->product); 
        $this->assertEquals(1, $user->product->count()); 
    }
 ```
 Giải thích:<br>
  &nbsp; &nbsp; &nbsp; &nbsp;Ở đây chúng ta dùng factory tạo ra 1 user và 1 product cho user đó.
 Nếu `$user->product` trả về một instance của Product thì như vậy là đúng. Hoặc `$user->product->count()` trả về 1 là đúng vì một user chỉ có một product.
 ##### Định nghĩa ngược lại belongsTo()
  ```php
 public function user() 
{ 
    return $this->belongsTo(User::class); 
}
 ```
 Chúng ta sẽ viết test như sau:
 ```php
 use Illuminate\Database\Eloquent\Relations\BelongsTo;
 
 public function test_product_be_longs_to_user()
 {
     $user = factory(User::class)->create(); 
     $product = factory(Product::class)->create(['user_id' => $user->id]); 
     
     // kiểm tra foreignkey có giống nhau không
     $this->assertEquals('user_id', $product->user()->getForeignKey());
     
      // kiểm tra instance BelongsTo
      $this->assertInstanceOf(BelongsTo::class, $product->user());
 }
 ```
 <br>
 
Note: Từ phiển bản 5.8 trở lên Laravel đã sửa hàm `getForeignKey()` thành `getForeignKeyName()` rồi nhé.
 
 ### 2. Quan hệ One to Many (Quan hệ một nhiều)
 ##### hasMany()
  &nbsp;  Ví dụ chúng ta có Model User quan hệ một nhiều với Product
 ##### hasOne()
 
 ```php
 //Model User
 public function products() 
{ 
    return $this->hasMany(Product::class); 
}

 //Model Product
 public function user() 
{ 
    return $this->belongsTo(User::class); 
}
 ```
 Chúng ta sẽ viết test như sau:
 ```php
 public function test_user_has_many_products()
 {
     $user = factory(User::class)->create(); 
     $product = factory(Product::class)->create(['user_id' => $user->id]); 
    
     // kiểm tra có phải là instance của HasMany không
     $this->assertInstanceOf(HasMany::class, $user->products());
     // kiểm tra foreignkey
     $this->assertEquals('user_id', $user->products()->getForeignKeyName());
 }
 ```
 <br>
 
 ##### Định nghĩa quan hệ ngược lại là belongsTo 
 Xem ở bên trên mình đã viết rồi nhé. :D
 ### 3. Quan hệ Many to Many (Quan hệ nhiều nhiều)
 Ví dụ: Chúng ta có model Book quan hệ nhiều nhiều với Category
 ```php
 // Model Book
  public function categories() 
{ 
    return $this->belongsToMany(Category::class); 
}

 // Model Category
  public function books() 
{ 
    return $this->belongsToMany(Book::class); 
}
 ```
 Chúng ta sẽ viết test như sau:
 ```php
 public function test_book_be_longs_to_many_categories()
 {
     // kiểm tra instance BelongsToMany
     $this->assertInstanceOf(BelongsToMany::class, $book->categories());
     // kiểm tra foreignKey
     $this->assertEquals($foreignKey, $book->categories()->getForeignPivotKeyName());
     // kiểm tra related pivot key
      $this->assertEquals($relateKey, $book->categories()->getRelatedPivotKeyName());
      // Càng nhiều so sánh thì test của chúng ta càng chính xác. Vì vậy hãy thêm số lượng test phù hợp
      // với function của bạn nhé
 }
 ```
 
 ### 4. Quan hệ Polymorphic Relations (Quan hệ đa hình)
 ### 4.1 Quan hệ One One
 Ví dụ: Chúng ta có bảng post và product quan hệ với bảng image như sau. Bảng image sẽ lưu hình ảnh của post và product
 ```php
 posts
    id - integer
    title - string

products
    id - integer
    name - string

images
    id - integer
    url - string
    imageable_id - integer
    imageable_type - string
 ```
<br> Và model của chúng sẽ như sau:
 ```php
     // Model Image
     public function imageable()
     {
         return $this->morphTo();
     }
     
     // Model Product
     public function image()
     {
         return $this->morphOne('App\Image', 'imageable');
     }
     
     // Model Post
     public function image()
     {
         return $this->morphOne('App\Image', 'imageable');
     }
 ```
 
 Vậy là chúng ta sẽ cần test 2 relation là `morphTo `và `morphOne()`
 ##### morphTo()
 ```php
 public function test_imageable_with_post()
 {
     $image = factory(Image::class)->create([
          "imageable_id" => $user->id,
          "imageable_type" => "App\Post",
        ]); 
        
        $this->assertInstanceOf(Post::class, $image->imageable);
 }
 // tương tự với product nhé
 ```
 ##### morphOne()
 ```php
 public funtion test_post_morph_one_image()
 {
     // kiểm tra instance MorphOne
     $this->assertInstanceOf(MorphOne::class, $post->image());
     //kiểm tra key type
     $name = 'imageable';
     $this->assertEquals($name . '_type', $post->image()->getMorphType());
     $this->assertEquals($name . '_id';, $post->image()->getForeignKeyName());
 }
 ```
  ### 4.2 Quan hệ One Many
  Ví dụ: Chúng ta có 4 bảng là: post, product và comment. Quan hệ của chúng như sau:
  ```
  posts
    id - integer
    title - string

products
    id - integer
    namestring

comments
    id - integer
    body - text
    commentable_id - integer
    commentable_type - string
  ```
  <br> Và model của chúng sẽ như sau:
  ```php
     // Model Comment
     public function commentable()
     {
         return $this->morphTo();
     }
     
     //Model Post
     public function comments()
     {
        return $this->morphMany('App\Comment', 'commentable');
     }
     
     //Model Product
     public function comments()
     {
         return $this->morphMany('App\Comment', 'commentable');
     }
  ```
  
   Vậy là chúng ta sẽ cần test 1relation là  `morphOne()`. `morphTo ` thì đã viết ở trên rồi. <br>
   Cũng tương tự như trên chúng ta làm như sau:
   
   ```php
   public function test_post_morph_many_comment()
   {
        $relation = $post->comment();
        $name = 'commentable';
        $this->assertInstanceOf(MorphMany::class, $relation);
        $this->assertEquals($name . '_type', $relation->getMorphType());
        $this->assertEquals($name . '_id', $relation->getForeignKeyName());
   }
   ```
   
   ### 4.3 Quan hệ Many Many
   Giả sử chúng ta có bảng tag sử dụng cho cả post và product.
   ```
   posts
    id - integer
    title - string

products
    id - integer
    name - string

tags
    id - integer
    name - string

taggables
    tag_id - integer
    taggable_id - integer
    taggable_type - string
   ```
   
   Cấu trúc model sẽ như sau:
   
   ```php
   //Model Post
  public function tags()
   {
       return $this->morphToMany('App\Tag', 'taggable');
   }
   
   //Model Product
  public function tags()
   {
       return $this->morphToMany('App\Tag', 'taggable');
   }
   
   //Model Tag
  public function posts()
   {
       return $this->morphedByMany('App\Post', 'taggable');
   }

   public function products()
   {
       return $this->morphedByMany('App\Product', 'taggable');
   }
   ```
   
   Như vậy chúng ta sẽ cần test 2 relation là `morphToMany()` và `morrphedByMany()`
   ##### morphToMany():
   Tương tự như quan hệ nhiều nhiều chúng ta sẽ test như sau:
   ```php
   public function test_tags_morph_to_many_posts()
   {
       $relation = $tags->posts();
       $name = 'taggable';
       $this->assertInstanceOf(MorphToMany::class, $relation);
       $this->assertEquals($name . '_type', $relation->getMorphType());
       $this->assertEquals($name . '_id';, $relation->getForeignPivotKeyName());
       $this->assertEquals($tags->getForeignKey(), $relation->getRelatedPivotKeyName());
   }
   ```
   
   ##### morphedByMany():
   
 ```php
 public function test_products_morphed_by_many_tags()
  {
        $relation = $products->tags();
        $related = $products;
        $this->assertInstanceOf(MorphToMany::class, $relation);
        $this->assertEquals($name . '_type', $relation->getMorphType());
        $this->assertEquals($products->getForeignKey(), $relation->getForeignPivotKeyName());
        $this->assertEquals($name . '_id', $relation->getRelatedPivotKeyName());
  }
```

Vậy là xong. Khá dễ dàng. :D <br>
Trong dự án chúng ta nên viết 1 file model test case chung và khi test model nào chúng ta extend từ file đó và chỉ cần gọi những function viết test mà chúng ta đã viết sẵn ra là xong.
Ví dụ:
```php
class ModelTestCase extends TestCase
{
    protected function assertHasManyRelation(
            $relation,
            Model $model,
            Model $related,
            $key = null,
            $parent = null,
            \Closure $queryCheck = null
        ) {
            $this->assertInstanceOf(HasMany::class, $relation);
            if (!is_null($queryCheck)) {
                $queryCheck->bindTo($this);
                $queryCheck($relation->getQuery(), $model, $relation);
            }
            if (is_null($key)) {
                $key = $model->getForeignKey();
            }
            $this->assertEquals($key, $relation->getForeignKeyName());
            if (is_null($parent)) {
                $parent = $model->getKeyName();
            }
            $this->assertEquals($model->getTable() . '.' . $parent, $relation->getQualifiedParentKeyName());
        }
}
// như vậy khi cần test quan hệ hasMany chúng ta gọi làm hàm này và truyền vào tham số cần thiết là xong.

```
Trên đây là cách viết test relationship cho model trong Laravel. Bài viết sau mình sẽ viết test cho controller, service và repository. Cảm ơn bạn đã đọc bài của mình.