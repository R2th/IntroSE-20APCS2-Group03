# Lời mở đầu
Xin chào mọi người, là 1 lập trình viên thì chắc các bạn cũng khá quen thuộc với khái niệm viết test (hay unit test) cho các chức năng của mình rồi. Về Unit test thì minh sẽ không nói tới trong bài viết này. Mình sẽ chỉ focus vào phần **API Testing** (thuộc feature test). Hồi mới được tham gia vào dự án, mình cũng chưa biết đến khái niệm API test, và chỉ tới khi được giao task về viết API test . Thì nhờ sự support nhiệt tình từ các member của team, mình mới dần hiểu ra 1 chút. Vì chưa có nhiều kinh nghiệm trong phần này nên mình sẽ cố gắng chia sẻ chi tiết nhất những gì mình hiểu được. hy vọng có thể giúp ích cho các bạn.

# Giới thiệu Feature Test

Ngoài việc coverage toàn bộ code thì Feature Test có thể kiểm tra  sự tương tác giữa các modul với nhau hoặc ngay cả việc gởi nhận các HTTP Request đầy đủ.
Trước khi vào viết test thì các bạn cần phải config database với laravel. Sau đó gõ câu lệnh sau trong thư mục gốc để tạo file test 
```
php artisan make:Test /path/to/file/FileName
```
![](https://images.viblo.asia/f30d3348-e969-4391-b11f-6fb7a5c71655.png)

Lưu ý là thư mục  được tạo ra cần có cấu trúc đường dẫn tương tự với controller(để dễ tìm file test, hoàn toàn có thể cấu trúc đường dẫn khác với controller). Và tên file test phải có hậu tố Test phía sau.

Đây là cấu trúc thư mục controller
![](https://images.viblo.asia/17257ddc-e9e1-4c58-8ebb-aeadb3152266.png)

Và đây là cấu trúc thư mục test
![](https://images.viblo.asia/b86924df-991a-4d6a-a5f2-cc1eb317908e.png)

# Hướng dẫn viết API TEST
Sau khi thực hiện lệnh chúng ta sẽ có 1 file  như thế này

![](https://images.viblo.asia/cfee9804-2b88-4ed5-8d6a-6b3aaf4ee8b6.png)

Trước hết chúng ta sẽ thực hiện `use DatabaseTransactions;` vào đã. Mục đích là để sau khi thực hiện chạy test, dữ liệu trong database sẽ được revert về như ban đầu.
![](https://images.viblo.asia/e44f1e53-cc6b-4723-bc86-9d87382e5c45.png)

Sau đó ta sẽ viết các hàm cần thiết như hàm setUp()

```
public function setUp()
    {
        parent::setUp();
        $this->setAuthUser($this->getGuard()); // login
        // implement your code
    }
```
Hàm này sẽ được gọi trước mỗi hàm test(), giả sử có n hàm test thì setUp() sẽ được chạy tuần tự trước hàm test() n lần.

Chúng ta cũng sẽ viết các hàm fake dữ liệu

```
private function fakeData()
    {
        $this->faker = Faker::create();
        $this->model = factory(Model::class)->create();
    }
```

Các bạn hãy để ý ở trên tôi có dùng hàm create() chứ không dùng make() như khi viết unit test. Điều đó có nghĩa là  mình đã thêm dữ liệu vào database ( làm thay đổi db) . Chúng ta tạo ra dữ liệu thật và sẽ revert nó sau khi chạy xong hàm test. Hàm fake dữ liệu sẽ được viết và sử dụng tùy theo mục đích và vị trí bạn muốn.

Tiếp theo
```
protected function dataStruct()
    {
        return [
            'id',
            'content',
            'updated_at',
            'created_at',
        ];
    }
```

Mỗi response trả về ta sẽ đều có 1 struct , để kiểm tra thì ta viết 1 struct mong muốn như trên


Viết hàm gọi API, hàm này sẽ trả về response cho chúng ta
```
private function actionApi(... $dataInput)
    {
        return $this->json(
            'METHOD',
            "path/to/call/api",
            $dataInput
        );
    }
    
    protected function sendActionRequest(array $dataInput, $statusCode = 200)
    {
        $response = $this->actionApi($dataInput);
        $response->assertStatus($statusCode); // kiểm tra trạng thái trả về có đúng không
        $response->assertJsonStructure($this->dataStruct()); // kiểm tra cấu trúc trả về
        $this->assertDatabaseHas($tableName, $dataToCompare); // kiểm tra xem dữ liệu có khớp với database hay không nếu cần
        // orther check 
    }
```

Hàm sendActionRequest chỉ dùng để gởi api và nhận response, nó được gọi tới trong hàm test() như dưới đây

```
public function testAction()
    {
        $this->fakeData(); // ta sẽ fake dữ liệu nếu cần
        $this->sendActionRequest($dataInput, $statusCode); // sau khi fake dữ liệu ta sẽ gởi request
    }
```


Done!. Để chạy test ta sử dụng lệnh sau :
```
phpunit /path/to/file/FileName.php  // chạy tất cả các hàm test của file test
// or
phpunit /path/to/file/FileName.php --filter testAction // chỉ chạy riêng 1 hàm test
```
![](https://images.viblo.asia/6903fee4-e143-4722-8aa2-87eb43f00540.png)
![](https://images.viblo.asia/e09f0556-c034-4c19-b078-fec6815e5a1f.png)

Như vậy là ta đã hoàn thành 1 file test api đơn giản,  hy vọng bài viết giúp các bạn có thêm những gợi ý khi viết test ^^.