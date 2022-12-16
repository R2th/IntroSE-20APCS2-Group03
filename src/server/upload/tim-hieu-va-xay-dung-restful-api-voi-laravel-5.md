# Mở đầu
Hiện nay, REST là một kiến trúc phần mềm đang trở nên phổ biến trên internet. Có thể nói nguyên lý REST và cấu trúc dữ liệu RESTful được biết đến rộng rãi trong giới lập trình và hiệu quả mà nó mang lại rất thiết thực. Bài viết này sẽ giới thiệu một số khái niệm về REST, API và xây dựng RESTful API với Laravel 5.
# 1.Phân biệt Web và Web Service
Trước khi đi tìm hiểu về REST, chúng ta sẽ tìm hiểu sơ lược về **Web** và **Web Service**.
* Đối với một trang web bình thường, khi browser gửi một request thông qua url thì server sẽ xử lý và trả về một trang HTML, sau đó browser nhận và hiển thị trang HTML này ra, đây là một nội dung mà thông thường chúng ta có thể đọc được, nó là nội dung dành cho người dùng ở đầu cuối.
* Khác với khái niệm web thông thường, Web Service là một dịch vụ web, nó cung cấp các dữ liệu thô (raw data) mà về cơ bản khá khó hiểu với đa số người dùng (có thể là **JSON** hoặc **XML**), dữ liệu thô này được sử dụng bởi các ứng dụng. Các ứng dụng sẽ xử lý dữ liệu thô trước khi trả về cho nguời dùng đầu cuối.
* Ví dụ, chúng ta truy cập vào trang web bongdaxyz.com để xem thông tin về bóng đá. Trang web sẽ hiện thị cho chúng ta những thông tin mà chúng ta muốn. Vậy để có được những thông tin này, trang web bongdaxyz.com có thể lấy thông tin từ một vài nguồn nào đó, có thể là một web service khác chuyên cung cấp các thông tin về bóng đá chẳng hạn. Và các thông tin sau khi lấy về sẽ được web bongdaxyz.com xử lý trước khi trả về một trang web hoàn chỉnh cho chúng ta.
# 2. RESTful Web Service và RESTful API
## 2.1. RESTful Web Service
* **RESTful Web Service** là các Web Service được viết dựa trên kiến trúc **REST** (**RE**presentational **S**tate **T**ransfer), là một loạt hướng dẫn và dạng cấu trúc dùng cho việc chuyển đổi dữ liệu dựa trên giao thức không trạng thái ( thường là HTTP) để tương tác. REST đã được sử dụng rộng rãi thay thế cho các Web Service dựa trên SOAP và WSDL. RESTful Web Service nhẹ, dễ dàng mở rộng và bảo trì hơn.
* REST dựa vào các verb của HTTP (GET, POST, PUT, DELETE, ...) để truyền và nhận dữ liệu giữa Client và Server. Cùng một url (ví dụ: http://nankurunaisa.com/api/user) hay còn gọi là endpoint, nhưng với GET thì ta có một endpoint, với POST ta lại có một endpoint khác (khác ở đây có nghĩa là cách xử lý và trả dữ liệu về cho client), điều này giúp chúng ta thuận tiện hơn trong việc quản lý các endpoint này, dễ chỉnh sửa và thay đổi hơn so với dùng SOAP.
* Đối với một trang web bình thường client của nó chính là Web Browser, tuy nhiên đới với RESTful vì dữ liệu truyền nhận qua lại chủ yếu là JSON nên client của nó không chỉ giới hạn là một Web Browser, nó có thể là một App Mobile, hoặc thậm chí là một Web Service khác.Tuy vậy, cần lưu ý rằng mối quan hệ giữ client và server lúc này là Stateless, có nghĩa là server không cần biết client là ai, server cũng không cần phải lưu session đối với client giống như website bình thường. Server cần biết có một request từ một client nào đó tới và thỏa một số điều kiện của mình (cần access token chẳng hạn), nó sẽ xử lý, trả dữ liệu về cho client và kết thúc.
## 2.2. RESTful API
**API** (**A**pplication **P**rogramming **I**nterface) là giao diện lập trình ứng dụng giúp tạo ra các phương thức kết nối với các thư viện và ứng dụng khác nhau. Vậy **RESTful API** là API đi theo cấu trúc REST.  RESTful API không được xem là một công nghệ, nó là một giải pháp để tạo ra các ứng dụng Web Services thay thế cho các kiểu khác như SOAP, WSDL (Web Service Definition Language),…
Ta có một số HTTP method theo chuẩn RESTful API như sau:
* GET : truy xuất tài nguyên (READ)
* POST : tạo tài nguyên mới ( CREATE)
* PUT / PATCH: cập nhật, sửa đổi tài nguyên (UPDATE)
* DELETE : xóa tài nguyên ( DELETE)
# 3. Xây dựng RESTful API với Laravel 5
Để hiểu rõ hơn về cách xây dựng cũng như cách hoạt động của RESTful API, chúng ta sẽ thử xây dựng một RESTful Web Service ( có thể hiểu là một tập hợp các RESTful API) dựa trên Laravel 5. Để thuận tiện, mình chỉ hướng dẫn cơ bản các bước chứ không đi đến từng chi tiết. 
* Tạo một project Laravel:
```
laravel new restful-api
```
* Vào thư mục restful-api tạo app key
```
php artisan key:generate
```
* Chạy server và kiểm tra xem trang web của chúng ta có chạy ổn không <br/>
![](https://images.viblo.asia/eb0fc6b0-00c4-4a35-9ab5-3a00aa28d2ba.png)
* Cũng giống như Web, chúng ta cần phải tạo route để làm endpoint. Tuy vậy vì chúng ta đang nói về RESTful nên chỉ quan tâm đến file **routes/api.php**, đây là file chứa tất cả các endpoint dùng để xử lý các request từ client và lưu các route theo chuẩn RESTful API của chúng ta:
## 3.1. Thử viết API đầu tiên
Bây giờ chúng ta sẽ thử viết API đầu tiên, giả sử chúng ta tạo một url như sau: http://nankurunaisa.com/api/hello/{username} thì server sẽ trả về nội dung là "Hello <username>!". 
* Thêm đoạn code sau vào file api.php:
```
Route::get('welcome/{username}', function(Request $request, $username){
    return response()->json("Hello $username!", 200);
});
```
Hàm Route::get(), có nghĩa là Server sẽ xử lý endpoint này với HTTP verb là GET. Tham số thứ nhất chính là url (tạm gọi là part endpoint), tham số thứ 2 chính là một callback function xử lý tương ứng với enpoint này. Để ý dòng return response()->json("Hello $username!", 200);. Chúng ta sử dụng hàm json() để cấu hình dữ liệu trả về dưới dạng JSON, 200 ở đây là HTTP status code, tìm hiểu thêm về HTTP status code tại đây: <br/>
https://en.wikipedia.org/wiki/List_of_HTTP_status_codes<br/>
* Để test API vừa viết, chúng ta có thể sử dụng Web Browser, tuy nhiên với Web Browser chúng ta sẽ không thể test được các verb khác như POST, PUT, DELETE. Chúng ta sẽ sử dụng ứng dụng Postman để đáp ứng điều này, download Postman tại đây:<br/>
https://www.getpostman.com/<br/>
* Mở Postman và test API vừa tạo <br/>
![](https://images.viblo.asia/f4a4c1f0-dbb9-41cc-a521-855552f0f8ce.png)
## 3.2. Viết API tương tác với cơ sở dữ liệu
Tiếp theo chúng ta sẽ thử viết một vài API để tương tác với cơ sở dữ liệu.  Sử dụng các verb khác như POST, PUT, DELETE.
* Ta sẽ tạo bảng Users như sau:
```
 Schema::create('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->string('email')->unique();
        $table->string('contact_number');
        $table->timestamps();
});
```
* Sau đó fake một vài bản ghi:
```
$faker = Faker\Factory::create();
$limit = 10;

for ($i = 0; $i < $limit; $i++) {
    DB::table('users')->insert([
        'name' => $faker->name,
        'email' => $faker->unique()->email,
        'contact_number' => $faker->phoneNumber,
    ]);
}
```
* Tạo UsersController:
```
php artisan make:controller UsersController
```
###  Lấy toàn bộ bản ghi
Các bước thiết lập đã xong, bây giờ ta sẽ viết một API để lấy toàn bộ bản ghi các user vừa tạo. 
* Trước hết, tạo một url trong file api.php:
```
Route::get('/users','UsersController@index');
```
* Viết controller để lấy toàn bộ bản ghi các user:
```
public function index(){
        $users= DB::table('users')->get();
        return response()->json($users, 200);
}
```
* Lại mở Postman và test thôi:<br/>
![](https://images.viblo.asia/dbcbf6a2-87bd-48f9-a474-e9e1f29219c8.png)
<br/>

Chúng ta có thể thấy dữ liệu trả về có dạng JSON.<br/>
Tương tự chúng ta có thể viết một vài API khác để lấy thông tin của một user cụ thể (show), tạo một bản ghi user mới (create), update (put/patch) bản ghi user, ...
### Lấy một bản ghi cụ thể
* route
```
Route::get('/users/{id}','UsersController@show');
```
* controller
```
public function show($id){
        if($user = DB::table('users')->find($id)){
            return response()->json($user, 200);
        }
        else{
            return response()->json("user not found", 200);
        }
}
```
* test<br/>
   ![](https://images.viblo.asia/6dbb41b2-bfeb-4d91-b48b-f0077f1e13ec.png)
### Tạo một bản ghi mới
Tạo một bản ghi user
* route
```
Route::post('/users','UsersController@store');
```
* controller
```
public function store(Request $request){
        if(DB::table('users')->insert($request->all())){
            return response()->json("User has been created",201);
        }
        else{
            return response()->json("Can not create");
        }   
}
```
* test<br/>
![](https://images.viblo.asia/001619dc-0e06-4941-8d73-0c2692f609a3.png)<br/>
![](https://images.viblo.asia/09d5c104-3b65-4c6d-b737-c635b4ec2aa0.png)
### Update một bản ghi
Update một bản ghi user
* route
```
Route::put('/users/{id}','UsersController@update');
```
* controller
```
public function update(Request $request, $id){
        if(DB::table('users')->where('id',$id)->update($request->all())){
            $user = DB::table('users')->find($id);
        return response()->json($user,200);
        }
        else{
            return response()->json("Can not update");
        }
}
```
* test<br/>
![](https://images.viblo.asia/75ac4a48-d3d1-4f4e-8bf6-76d1e626cb52.png)
# 4. Kết luận
Thông qua bài viết mình đã giới thiệu cho các bạn về Web Service, RESTful API cũng như cách xây dựng một số API cơ bản với Laravel 5. Hy vọng các bạn có thể hiểu và dễ dàng xây dựng được RESTful API theo ý muốn của mình. Mình mới tập tành viết bài trên Viblo và cũng là newbie về Laravel nên bài viết cũng như cách code không thể tránh được những sai sót. Mong nhận được những nhận xét và đóng góp từ các bạn :pray:. Cảm ơn vì đã đọc bài viết :handshake:.
# 5. Tài liệu tham khảo
https://www.toptal.com/laravel/restful-laravel-api-tutorial<br/>
https://blog.pusher.com/build-rest-api-laravel-api-resources/<br/>
https://o7planning.org/vi/10773/restful-web-service-la-gi<br/>