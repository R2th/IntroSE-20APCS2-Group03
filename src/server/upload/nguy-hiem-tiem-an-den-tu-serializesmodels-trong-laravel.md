Trong quá trình làm việc với Laravel chắc hẳn các bạn cũng đã không mấy xa lạ gì với `SerializesModels`. Nó có liên quan đến việc sử dụng `queue` hay `job` trong Laravel. Để thuận thiện cho việc đưa ra các ví dụ, trong bài viết này chúng ta sẽ sử dụng queue driver là Redis.
Như các bạn đã biết, Redis giống như một database với kiểu lưu trữ dạng `key-value`. Tất cả các dữ liệu trước khi được đưa vào Redis sẽ được chuyển thành dạng json. Trong Laravel chúng ta có facade `Redis` có các method hỗ trợ việc thao tác trên Redis.
Các bạn có thể xem các ví dụ dưới đây:
```php
$post = new App\Models\Post([
    'name' => 'Post name',
    'description' => 'Post description',
]);

Redis::set('one', 1);
Redis::set('post', $post);
Redis::set('array', '[1, 2]');

Redis::get('one');   // "1";
Redis::get('post');  // "{"id":1,"name":"Post name","description":"Post description"}"
Redis::get('array'); // "[1, 2]"
```
Trong trường hợp `value` truyền vào trong hàm `Redis::set(key, value)` có implement phương thức `toJson` thì nó sẽ tự động được gọi.

## SerializesModels là gì?
`SerializesModels` là một `trait` các method hỗ trợ việc chuyển dữ liệu đầu vào sang dạng json trước khi đưa vào Redis, cùng với đó là việc đảo ngược lại quá trình trên, tức là chuyển dữ liệu từ json và biến đổi chúng thành những kiểu dữ liệu ban đầu. Đây là một điều rất tuyệt vời, nó làm cho việc thao tác trên Redis trở nên dễ dàng và linh hoạt hơn. Nhưng cùng với đó là những tiềm ẩn theo mình nghĩ là rất nguy hiểm.

## Làm lộ dữ liệu
Đây là một vấn đề dễ gặp phải nhưng cũng rất nghiêm trọng đó là việc `SerializesModels` sẽ thực hiện load lại các relations làm lộ dữ liệu. Chúng ta sẽ đi vào ví dụ cụ thể sau đây để làm rõ hơn điều này:

```php
<?php

namespace App\Events;

class PostCreatedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $post;

    public function __construct(Post $post)
    {
        $this->post = $post->load('user:id,name');

        \Log::info(json_encode($this->post));
    }

    public function broadcastWith()
    {
        return [
            'message' => $this->post,
        ];
    }
}
```
Event `PostCreatedEvent` có nhiệm vụ xử lý realtime khi có một post mới được tạo ra. Trong event này, chúng ta truyền vào một model Post, đồng thời load luôn quan hệ user của nó. Để ý rằng chúng ta chỉ select duy nhất `id`, và `name` của user đó.
Thực hiện chạy:

```php
$post = $user->posts()->create([
    'name' => 'New post',
    'description' => 'Post description',
]);
App\Events\PostCreatedEvent::dispatch($post);
```

Kiểm tra log và chúng ta thấy một điều khá bất ngờ:
```css
[2019-10-20 10:09:43] local.INFO:
{
    "id": 1,
    "name": "New post",
    "description": "Post description",
    "user_id": 12,
    "created_at": "2019-08-20 14:58:30",
    "updated_at": "2019-08-20 14:58:30",
    "user": {
        "id": 12,
        "name": "Lam Do"
    }
}
[2019-10-20 10:09:43] local.INFO: Broadcasting [post.created] on channels [private-*] with payload:
{
    "message": {
        "id": 1,
        "name": "New post",
        "description": "Post description",
        "user_id": 12,
        "created_at": "2019-08-20 14:58:30",
        "updated_at": "2019-08-20 14:58:30",
        "user": {
            "id": 12,
            "name": "Lam Do",
            "email": "lamdo@example.com",
            "password": "$2y$10$SxWneK9d1Nv6t03WOAAPUerk6zIFP0kV.8Bq5VVbAH1T/jMjSb1D6"
        }
    },
    "socket": null
}  
```
Đoạn log đầu tiên là khi chúng ta khởi tạo ra một instance của `App\Events\PostCreatedEvent` lần đầu. Hàm `dispatch` sẽ thực hiện nhiệm vụ này đồng thời đẩy dữ liệu vào queue, trong trường hợp này là Redis. Mọi thứ lúc này vẫn đúng như những gì chúng ta mong muốn.

Chúng ta chỉ `dispatch` một lần duy nhất tuy nhiên lại nhận được tới 2 đoạn log, như vậy có thể hiểu, Laravel đã tự động khởi tạo `App\Events\PostCreatedEvent` thêm một lần nữa và đồng thời lấy dữ liệu từ redis ra và chuyển chúng thành một model Post cùng với các quan hệ của nó. Nhưng rõ ràng lúc này dữ liệu đã bị lấy thừa ra, như chúng ta có thể thấy trong ví dụ trên, cả `email` và `password` của user đã được lấy ra và điều này thực sự nguy hiểm vì đây là những dữ liệu chúng ta sẽ trả về cho phía client.

Để tìm hiểu nguyên nhân, hãy cùng mở source code của [SerializesModels](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Queue/SerializesModels.php) ra:

```php
<?php
trait SerializesModels
{
    use SerializesAndRestoresModelIdentifiers;
}
```
Chúng ta thấy `SerializesModels` lại sử dụng đến một trait khác đó là [SerializesAndRestoresModelIdentifiers](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Queue/SerializesAndRestoresModelIdentifiers.php), có lẽ đây mới là nơi chúng ta cần tìm:
```php
/**
 * Restore the model from the model identifier instance.
 *
 * @param  \Illuminate\Contracts\Database\ModelIdentifier  $value
 * @return \Illuminate\Database\Eloquent\Model
 */
public function restoreModel($value)
{
    return $this->getQueryForModelRestoration(
        (new $value->class)->setConnection($value->connection), $value->id
    )->useWritePdo()->firstOrFail()->load($value->relations ?? []);
}
```
Đoạn code trên sẽ thực hiện việc restore lại model đúng như tên gọi của nó. Trong đó còn có việc load lại các `relations` tương ứng.
Đó là lý do chúng ta nhận được những kết quả bên trên.

## Restore không đúng model
Laravel dựa vào tên của class và khóa chính để thực hiện quá trình restore lại model đã được lưu trong queue. Cũng trong `SerializesAndRestoresModelIdentifiers` chúng ta hãy cùng xem lại các đoạn [code](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Queue/SerializesAndRestoresModelIdentifiers.php#L64) sau:
```php
/**
 * Restore a queueable collection instance.
 *
 * @param  \Illuminate\Contracts\Database\ModelIdentifier  $value
 * @return \Illuminate\Database\Eloquent\Collection
 */
protected function restoreCollection($value)
{
    if (! $value->class || count($value->id) === 0) {
        return new EloquentCollection;
    }
    return $this->getQueryForModelRestoration(
        (new $value->class)->setConnection($value->connection), $value->id
    )->useWritePdo()->get();
}

/**
 * Restore the model from the model identifier instance.
 *
 * @param  \Illuminate\Contracts\Database\ModelIdentifier  $value
 * @return \Illuminate\Database\Eloquent\Model
 */
public function restoreModel($value)
{
    return $this->getQueryForModelRestoration(
        (new $value->class)->setConnection($value->connection), $value->id
    )->useWritePdo()->firstOrFail()->load($value->relations ?? []);
}
```
Từ việc restore lại một `model` hay cả một `collection` cũng  được thực hiện tương tự nhau. Có một điều là trong Laravel, khi thực hiện join hai table có tên các khóa chính giống nhau, kết quả mà chúng ta nhận được là một collection với các object có id không đúng với id thực tế của chúng ở trong database:
```php
Post::join('categories', 'posts.category_id', 'categories.id')->get();
=> Illuminate\Database\Eloquent\Collection {#3052
     all: [
       App\Post {#3033
         id: 13,
         name: "Post One,
         category_id: 13,
         created_at: "2019-08-17 01:51:12",
         updated_at: "2019-08-17 01:51:12",
       },
       App\Post {#3044
         id: 13,
         name: "Post Two",
         category_id: 13,
         created_at: "2019-08-17 01:51:12",
         updated_at: "2019-08-17 01:51:12",
       },
       App\Post {#3049
         id: 17,
         name: "Post three",
         category_id: 17,
         created_at: "2019-08-17 01:52:48",
         updated_at: "2019-08-17 01:52:48",
       },
     ],
   }
```
Điều này xảy ra là do `categories.id` đã overwriting `posts.id` trong câu lệnh `join` bởi vì hai table có tên khóa chính là giống nhau.
Có lẽ đây là một hạn chế của Laravel, hoặc đó cũng có thể là tính năng nhưng có lẽ mình sẽ chẳng bao giờ dùng. 
Vậy điều gì sẽ xảy ra nếu như chúng ta truyền chúng vào `constructor` của các `Events` hay các `Jobs`? Chúng sẽ được đưa vào queue như những gì chúng ta nhìn thấy nhưng khi được lấy ra chúng sẽ lại là những model hoàn toàn khác. Như trong trường hợp bên trên, các post được lấy ra sẽ có các id tương ứng là 13 và 17, trong khi điều chúng ta muốn phải là 1, 2 và 3.

Điều này là rất nghiêm trọng nếu như trong các Events hay Jobs chúng ta có những hoạt động liên quan đến việc thêm, sửa, xóa trong database.

## Kết luận
Nhìn chung việc lưu các object vào trong queue và restore chúng lại để sử dụng đôi khi sẽ mang lại nhiều tiện lợi cho lập trình viên nhưng việc chuyển dữ liệu từ dạng json sang các object phức tạp hơn cũng sẽ tiềm ẩn nhiều vấn đề. Vì thế trong một số framework hay các thư viện hỗ trợ thao tác với queue chỉ cho phép truyền vào những dữ liệu nguyên thủy như `Number`, `String`, `Array`...
Các ví dụ và kiểm tra mình thực hiện trên phiên **Laravel 5.6** trở lên, các phiên bản thấp hơn mình chưa có thời gian để kiểm chứng.
Hi vọng bài viết sẽ phần nào đó giúp các bạn hiểu thêm về việc Laravel xử lý dữ liệu của queue cũng như tránh được các lỗi liên quan đến nó.

Blog: https://www.dnlblog.com/posts/nguyen-hiem-tiem-an-den-tu-serializesmodels-trong-laravel