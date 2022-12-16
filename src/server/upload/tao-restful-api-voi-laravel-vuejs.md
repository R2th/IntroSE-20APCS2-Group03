## **1. Giới Thiệu** <br>
Trong bài này mình sẽ hướng dẫn các bạn tạo một ứng dụng CRUD posts hoàn chỉnh sử dụng Laravel để viết API và Vuejs đảm nhiệm phẩn frontend.<br>
Trước tiên, để chạy được Vuejs bạn nên cài [Laravel Mix](https://laravel.com/docs/5.7/mix) <br>
## **2. Tạo migration, model, seeder** <br> 
**Tạo migration cho bảng posts**
```
php artisan make:migration create_posts_table
```
```php
class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('content');
            $table->string('author');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
```
**Chạy migrate**
```
php artisan migrate
```
**Tạo model Post**
```
php artisan make:model Post
```
```php
class Post extends Model
{
    use Searchable;

    protected $fillable = [
        'id',
        'title',
        'content',
        'author'
    ];
}
```
**Tạo factory cho post**
```
php artisan make:factory PostFactory
```
```php
<?php

use Faker\Generator as Faker;

$factory->define(\App\Post::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(),
        'content' => $faker->paragraph(3, 5),
        'author' => $faker->name
    ];
});
```
**Tạo post seeder**
```
php artisan make:seed PostSeeder
```
```php
class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Post::class, 10)->create();
    }
}
```
**Chạy DB seed**
```
php artisan db:seed --class=PostSeeder
```
## **3. Crud Post API** <br>
### **3.1 Tạo controller**
```
php artisan make:controller PostController -r
```
**Định nghĩa route** <br>
trong file routes/api.php ta chèn đoạn code sau
```php
Route::group(['prefix' => '/posts', 'as' => 'posts.'], function () {
    Route::get('/', 'PostController@index')->name('index');
    Route::post('/', 'PostController@store')->name('store');
    Route::get('/{id}', 'PostController@show')->name('show');
    Route::put('/', 'PostController@update')->name('update');
    Route::delete('/{id}', 'PostController@destroy')->name('destroy');
});
```
### **3.2 Index** <br>
chèn đoạn code sau trong hàm index
```php
    public function index(Request $request)
    {
        return response()->json(Post::orderBy('updated_at')->paginate(5));
    }
```
kết quả ta được
![](https://images.viblo.asia/5d7980d1-36bc-40fa-afe3-e93fd7b4550a.png)
Ta thấy kết quả trả về bao gồm tất cả các cột trong bảng. Nếu ta chỉ muốn trả về các cột mong muốn hoặc xử lý các kết quả trả về thì ta nên tạo 1 **resource**
```
php artisan make:resource ResourcePost
```
Ví dụ: ta chỉ muốn kết quả trả về bao gồm: id, title, content, author. Trong đó các từ trong title được viết hoa chữ cái đầu. <br>
chèn doạn code sau trong file **ResourcePost**
```php
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'author' => $this->author,
            'updated_at' => $this->updated_at
        ];
    }
```
ta sẽ viết lại hàm **index** trong **PostController**
```php
    public function index(Request $request)
    {
        return ResourcePost::collection(Post::orderBy('updated_at')->paginate(5));
    }
```
kết quả trả về:
![](https://images.viblo.asia/b62b66ac-96d2-4a21-b5ae-2fa8bd5d3dd5.png)
### **3.3 Store**
```php
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:255',
            'content' => 'required',
            'author' => 'required'
        ]);

        Post::create($request->only(
            'title',
            'content',
            'author'
        ));

        return response()->json(['message' => 'success']);
    }
```
### **3.3 Show**
```php
    public function show($id)
    {
        return new ResourcePost(Post::findOrFail($id));
    }
```php
### **3.5 Update**
```php
    public function update(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|integer|exists:posts,id',
            'title' => 'required|max:255',
            'content' => 'required',
            'author' => 'required'
        ]);

        $post = Post::findOrFail($request->id);

        $post->update($request->only(
            'title',
            'content',
            'author'
        ));

        return response()->json(['message' => 'update success']);
    }
```php
**3.6 Destroy**
```php
    public function destroy($id)
    {
        Post::destroy($id);
    }
```
## **4. Tạo frontend với Vuejs** <br>
### **4.1 Tạo posts component**
```html
<template>
    <div>
        <div class="card-header"><h3>Posts</h3></div>
        <div class="card card-body mb-2" v-for="article in posts" :key="article.id">
            <h4>{{ article.title }}</h4>
            <p>{{ article.content }}</p>
            <div>
                <h5 class="float-left">{{ article.author }}</h5>
                <div class="float-right">
                    <button class="btn btn-primary" @click="post = article">Edit</button>
                    <button class="btn btn-danger" @click="deletePost(article.id)">Delete</button>
                </div>
            </div>
        </div>
    </div>   
</template>
```
Script
```html
<script>
export default {
    data() {
        return {
            posts: [''],
            post: {
                id: '',
                title: '',
                content: '',
                author: ''
            }
        };
    },

    created() {
        this.fetchPosts(); // sau khi component được tạo thì ta sẽ fetch tất cả các post
    },

    methods: {
        fetchPosts: function(page_url) {
            page_url = page_url || 'api/posts'; // nếu page_url không được truyền vào thì mặc định là 'api/posts'
            fetch(page_url)
                .then(res => res.json())
                .then(res => {
                    this.posts = res.data;
                });
        },
    }
};
</script>
```
### **4.2 Tạo phân trang** <br>
tạo component **pagination**
```html
<template>
    <nav aria-label="Pagination">
        <ul class="pagination">
            <li class="page-item" v-bind:class="[{disabled: !pagination.prev}]">
                <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fetchList(pagination.first)">
                    <span aria-hidden="true">First</span>
                    <span class="sr-only">First</span>
                </a>
            </li>                
            <li class="page-item" v-bind:class="[{disabled: !pagination.prev}]">
                <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fetchList(pagination.prev)">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>

            <template v-if="pagination.last_page <= 6">
                <div v-for="(n) in pagination.last_page" :key="n">
                    <li class="page-item" v-bind:class="[{active: n == pagination.current_page}]"><a class="page-link" href="javascript:void(0)" @click="fetchList(pagination.path + '?page=' + n)">{{ n }}</a></li>
                </div>
            </template>

            <template v-else>
                <template v-if="pagination.current_page >= 4">
                    <template v-if="pagination.current_page <= (pagination.last_page - 4)">
                        <li class="page-item" ><a class="page-link" href="javascript:void(0)">...</a></li>
                        <li class="page-item" ><a class="page-link" href="javascript:void(0)" @click="fetchList(pagination.path + '?page=' + (pagination.current_page - 1))">{{ (pagination.current_page -1 ) }}</a></li>
                        <li class="page-item active"><a class="page-link" href="javascript:void(0)" disabled>{{ pagination.current_page }}</a></li>
                        <li class="page-item" ><a class="page-link" href="javascript:void(0)" @click="fetchList(pagination.path + '?page=' + (pagination.current_page + 1))">{{ (pagination.current_page + 1) }}</a></li>
                        <li class="page-item" ><a class="page-link" href="javascript:void(0)" >...</a></li>
                    </template>
                </template>

                <template v-if="pagination.current_page < 4">
                    <li v-for="(n) in 4" :key="n" class="page-item" v-bind:class="[{active: n == pagination.current_page}]"><a class="page-link" href="javascript:void(0)" @click="fetchList(pagination.path + '?page=' + n)">{{ n }}</a></li>
                    <li class="page-item" ><a class="page-link" href="javascript:void(0)" disabled>...</a></li>
                </template>

                <template v-if="pagination.current_page > (pagination.last_page - 4)">
                    <li class="page-item" ><a class="page-link" href="javascript:void(0)" disabled>...</a></li>
                    <li v-for="(n) in 4" :key="n" class="page-item" 
                        v-bind:class="[{active: (pagination.last_page - 4 + n) == pagination.current_page}]">
                            <a class="page-link" href="javascript:void(0)" 
                                @click="fetchList(pagination.path + '?page=' + (pagination.last_page - 4 +  n))">
                                {{ pagination.last_page - 4 + n }}
                            </a>
                    </li>
                </template>
            </template>

            <li class="page-item" v-bind:class="[{disabled: !pagination.next}]">
                <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fetchList(pagination.next)">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
            <li class="page-item" v-bind:class="[{disabled: !pagination.next}]">
            <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fetchList(pagination.last)">
                <span aria-hidden="true">Last</span>
                <span class="sr-only">Last</span>
            </a>
            </li>
        </ul>
    </nav>
</template>
```
script <br>
```js
<script>
    export default {
        props: {
            pagination: Object,
            fetchList: Function,
        },

        methods: {
            makePagination(meta, links) {
                let pagination = {
                    first: links.first,
                    current_page: meta.current_page,
                    last_page: meta.last_page,
                    last: links.last,
                    next: links.next,
                    prev: links.prev,
                    path: meta.path
                }
                this.$emit('makePagination', pagination);
            },  
        }
    }
</script>
```
ta sẽ sửa lại hàm **fetchPosts** như sau:
```js
    fetchPosts: function(page_url) {
        page_url = page_url || 'api/posts';
        fetch(page_url)
            .then(res => res.json())
            .then(res => {
                this.posts = res.data;
                //thêm dòng dưới đây
                this.$refs.child.makePagination(res.meta, res.links);
            });
    },
```
thêm biến pagination trong **Post component**
```javascript
    data() {
        return {
            post: {
                id: '',
                title: '',
                content: '',
                author: ''
            },
            pagination: {}, //thêm dòng này
        };
    },
```
gọi **pagination** trong **Post component**
```
<pagination ref="child" :fetchList="fetchPosts" :pagination="pagination" @makePagination="pagination = $event"></pagination>
```
ta sẽ được kết quả như sau: <br> <br>
![](https://images.viblo.asia/ccf01a77-11cd-447f-8523-6d474d12d573.png)
### **4.3 Delete Post**
```js
    deletePost(id) {
        if (confirm('Are you sure?')) {
            let vm = this;
            fetch(`api/posts/${id}`, {
                method: 'delete'
            }).then(fun => {
                let url =
                    this.pagination.path +
                    '?page=' +
                    this.pagination.current_page;
                this.fetchPosts(url);
            });
        }
    }
```
### **4.4 Tạo một post mới**
tạo 1 form để nhập dữ liệu
```html
<form @submit.prevent="savePost" class="mb-3">
    <div class="form-group">
        <input type="text" name="title" class="form-control" placeholder="Title" v-model="post.title">
        <template v-if="errors.title">
            <span v-text="errors.title[0]"></span>
        </template>
    </div>
    <div class="form-group">
        <textarea name="content" class="form-control" placeholder="Content" v-model="post.content" cols="30" rows="5"></textarea>
        <template v-if="errors.content">
            <span v-text="errors.content[0]"></span>
        </template>
    </div>
    <div class="form-group">
        <input type="text" name="author" class="form-control" placeholder="Author" v-model="post.author">
        <template v-if="errors.author">
            <span v-text="errors.author[0]"></span>
        </template>
    </div>
    <div class="form-group">
        <input type="submit" class="btn btn-primary" value="Save">
    </div>
</form>
```
thêm biến **post**, **errors** và **headers** trong data
```js
    post: {
        id: '',
        title: '',
        content: '',
        author: ''
    },
    errors: { //validation errors
        title: [],
        content: [],
        author: []
    },
    headers: { // gửi thêm headers để laravel hiểu request ta gửi là ajax request 
               // và trả về thông báo lỗi dạng JSON
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
```
method savePost
```js
    savePost: function() {
        fetch('api/posts', {
            method: this.editting ? 'put' : 'post',
            body: JSON.stringify(this.post),
            headers: this.headers
        })
            .then(res => res.json())
            .then(res => {
                if (res.errors) {
                    this.errors = res.errors;
                } else {
                    this.fetchPosts();
                    alert(res.message);
                }
            });
    },
```
nếu có lỗi sẽ trả về thông báo
![](https://images.viblo.asia/18a3cade-e55f-428c-b71e-cba0e23bb631.png)
### **4.4 Edit post** <br>
ở đây ta sử dụng luôn form bên trên để edit.
thêm biến **editting** vào trong data
```
editting: false,
```
method **editPost**: hàm này để set biến **post** ta đã định nghĩa từ trước
```js
    editPost(post) {
        this.editting = true;
        this.post.id = post.id;
        this.post.title = post.title;
        this.post.content = post.content;
        this.post.author = post.author;
    }
```
## **Tổng kết** <br>
Vậy là chúng ta đã hoàn thành app Crud post sử dụng **laravel** và **vuejs**. Chúc các bạn thành công.