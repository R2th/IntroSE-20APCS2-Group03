Như tiêu đề bài đã nêu tạo ứng dụng realtime feedback bằng hình ảnh, để hiểu rõ hơn về ứng dụng mình có nén lại file gif để mọi người dễ hình dung hơn ứng dụng. [Demo](https://cdn-images-1.medium.com/max/800/1*qQ4sLy92bnhxKQfoNyEy9g.gif)
# Yêu cầu khi xây dựng ứng dụng
Trước khi chúng ta bắt đầu, chúng ta cần một vài kiến thức cơ bản cần thiết để xây dựng ứng dụng:
* Có kiến thức PHP và framework laravel
* Có kiến thức về javscript (ES6)
* Có kiến thức về React
* Môi trường PHP 7.0 + ở local
* Môi trương MYSQL
* Đã cài đặt Composer
* Đã cài đặt NPM
* Đã cài đặt redis
# Xây dựng ứng dụng
## Cài đặt database và migration

Ở đây mình **không** hướng dẫn cài đặt môi trường theo yêu cầu ở trên, việc cài đặt môi trường ở trên mạng rất là nhiều nguồn có hướng dẫn, ở bài viết này mình tập trung vào việc xây dựng ứng dụng. Chúng ta cài đặt 2 migration cần thiết cho ứng dụng:
```
$ php artisan make:model Photo --migration --controller
$ php artisan make:model PhotoComment --migration
```
Các bạn để ý câu lệnh ở trên khi tạo model **Photo** có 2 đối số là **--migration** và **--controller**. Khi run câu lệnh này đồng nghĩa với việc sẽ tạo ra file migration ở thư mục `./database/migrations` và controller tương ứng. Thật tiện lợi phải không nào. 
Tiếp theo chúng ta truy vào file `database/migrations/create_photos_table.php` để thêm vài column cần thiết.
```
public function up()
{
    Schema::create('photos', function (Blueprint $table) {
        $table->increments('id');
        $table->string('url')->unique();
        $table->string('image')->unique();
        $table->timestamps();
    });
}
```
Và chúng ta cũng tạo một vài column cho table **photo_comments**
```
public function up()
{
    Schema::create('photo_comments', function (Blueprint $table) {
        $table->increments('id');
        $table->unsignedInteger('photo_id');
        $table->text('comment');
        $table->integer('top')->default(0);
        $table->integer('left')->default(0);
        $table->timestamps();

        $table->foreign('photo_id')->references('id')->on('photos');
    });
}
```
Như vậy đã tạo xong 2 tables là **photos** và **photo_comments** cần thiết cho ứng dụng. Chạy câu lệnh migrate là coi như xong phần database.
```
$ php artisan migrate
```
## Thiết lập Models
Chúng ta mở file model Photo để thiết lập mối quan hệ giữa chúng:
```
<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $with = ['comments'];

    protected $fillable = ['url', 'image'];

    public function comments()
    {
        return $this->hasMany(PhotoComment::class);
    }
}
```
Ở trên chúng ta có add thuộc tính `fillable`, thuộc tính này có nhiệm vụ sẽ filter những value cần thiết khi chúng ta sử dụng `Photo::create`. Chúng ta cũng có thêm thuộc tính with eager loading với **comments**. Định nghĩa relationship giữa chúng, ở đây để ý sẽ thấy rằng **Photo** quan hệ 1-n với **PhotoComments**
Tiếp theo, chúng ta mở Model **PhotoComment** và thay thế bằng nội dung phía dưới:
```
<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class PhotoComment extends Model
{
    protected $fillable = ['photo_id', 'comment', 'top', 'left'];

    protected $appends = ['position'];

    public function getPositionAttribute()
    {
        return [
            'top' => $this->attributes['top'], 
            'left' => $this->attributes['left']
        ];
    }
}
```
Cũng như model Photo chúng ta cũng thuộc tính **$fillable**. Chúng ta có sử dụng [Eloquent accessors](https://laravel.com/docs/5.5/eloquent-mutators#accessors-and-mutators) và **$appends**
## Thiết lập môi trường server realtime
Ở ứng dụng này, chúng ta sử dụng Redis broadcaster, bạn nên cài đặt thư viện **Predis**
```
composer require predis/predis
```
Với Redis broadcaster sẽ truyền nội dung sử dụng tính năng pub/sub. Vì vậy chúng ta cần WebSocket server để nhận nội dung từ redis và truyền nôi dung đó đến Websocket channels của bạn. Ở client chúng ta sử dụng thư viện Socket.IO JavaScript vì vậy cần phải có Socket.IO server tưng ứng. Với laravel không có Socket.IO server, tuy nhiên cộng đồng đã xây dựng `tlaverdure/laravel-echo-server `. Công việc chúng ta không phải quá lo lắng về việc dựng Socket.IO server mà chỉ tập trung vào việc xây dựng ứng dụng dựa vào những nền tảng có sẵn.
### Cài đặt Laravel Echo Server
Trước tiên, chúng ta cài đặt package ở trạng thái global:
```
npm install -g laravel-echo-server
```
Sau đó, bạn cần làm là cấu hình những tham số cần thiết cho server bằng cách chạy câu lệnh đơn giản như sau:
```
laravel-echo-server init
```
Khi bạn chạy câu lệnh này nó sẽ, nó sẽ đưa ra những yêu cầu cho bạn lựa chọn tùy thêm mục đích mà chúng ta sử dụng, khi bạn hoàn thành những yêu cầu đó thì nó tự động sinh ra mục file `laravel-echo-server.json`. File này sẽ chứa những settings của Socket.IO server. Các bạn sẽ thấy một điều là xây dựng Socket.IO server vô cùng đơn giản chỉ vài thao tác là coi như đã xong phần server.
![](https://images.viblo.asia/d4a47dd4-c3f4-40bb-be40-40117dc50561.png)
Và đây là thành quả khi hoàn thành:
![](https://images.viblo.asia/935002d3-4bae-4b53-afb4-72333a0cbab7.png)
Và một điều lưu ý nho nhỏ nữa là mình phải thay đổi tham số ** BROADCAST_DRIVER** trong file `.env` bằng 
```
BROADCAST_DRIVER=redis
```
Việc cài đặt môi trường này, sẽ gây rất người khó khăn nên ở bài viết này mình chia ra 2 phần, phần đầu mình sẽ hướng dẫn cài đặt môi trường cũng như là khởi tạo database cho phát triển ứng dụng. Mong mọi người sẽ chờ đợi phần 2 của mình, ứng dụng này đối với mình khá thú vụ. Happy coding!