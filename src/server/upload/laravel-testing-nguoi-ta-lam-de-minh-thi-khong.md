![](https://images.viblo.asia/4157b49c-c367-4d6f-8d29-947ff16b6561.jpg)

## Trời sinh ra Dev, lại sinh thêm Test làm gì?
Trong bài viết này, mình sẽ không giới thiệu khái niệm testing, và những lý thuyết test  vì trên [Viblo](https://viblo.asia/) đã có rất nhiều tác giả viết về chủ đề này, các bạn có thể tìm đọc nếu có thời gian. 
Bài viết này chỉ áp dụng cho:
* Những bạn Dev đã từng viết unit test và phải chịu những nỗi đau mà việc viết test mang lại, nội dung bài viết này sẽ là tổng hợp những câu hỏi lớn để tất cả chúng ta cùng trả lời, để cuộc sống này đỡ vất vả hơn.
* Không áp dụng cho các chị/em Tester, vì đây là code test, việc mà cứ ngỡ dev không bao giờ phải làm.
* Dành cho Laravel.

### 1. Viết test trước hay viết sau khi dev?
Câu hỏi nghe có vẻ trái với đạo lý này đến bao giờ mới có câu trả lời

Lý thuyết rằng việc viết code unit test dành cho senior dev, người có nhiều năm kinh nghiệm làm việc, khi nắm được spec dự án họ có thể code được các unit test, sau đó các dev member bắt đầu nhảy vào code và phải làm sao cho code mình chạy pass được đống method test mà ông senior đã viết ra. :( Làm sao có thể thế được trong khi code còn chưa được dòng nào.

Thực tế thì ngược lại, mình chưa gặp anh senior nào code test trước cả, và các bài hướng dẫn viết test cũng đều test những cái đã được code. Và hơn nữa trong khi code test chúng ta cố gắng **mock**, cố gắng **fake** sao cho pass hết được các method đã viết, và mỗi lần pass chúng ta đều thầm nghĩ `Ơn trời, May mắn thay`.

Và bạn đã làm theo trường hợp nào, chắc là cũng như mình thôi, dev chán xong rồi mới code test, hoặc chăm chỉ thì code xong method nào, viết test luôn cho method đó để bớt khổ về sau.

### 2. Nếu muốn chạy test nhanh thì code kiểu gì?
Rõ ràng khi viết test trong laravel, chúng ta phải tạo trong file `.env` biến DB_CONNECTION=mysql_test, và tên một database chúng ta config. và cũng chạy migrate để tạo các bảng ra như bình thường. Việc này làm chúng ta nghĩ đến việc phải thao tác với DB khi chạy test, dẫn đến việc viết test sẽ có những chỗ insert, update, delete dữ liệu trong DB, chính việc này làm cho code test của chúng ta chạy như 1 function thực sự chứ không còn test nữa. `Mockery` cho phép chúng ta mock tất cả những gì chúng ta muốn, thậm chí cả DB, chúng ta không còn thao tác trực tiếp với `db` nữa, dẫn đến code test chạy nhanh hơn.

![](https://images.viblo.asia/3f95379e-fd64-4589-860e-ae29e105d050.jpg)

Chúng ta cần setUp lại method setUp của class `TestCase` 
```PHP
public function setUp()
    {
        $this->afterApplicationCreated(function () {
            $this->db = m::mock(
                Connection::class.'[select,update,insert,delete]',
                [m::mock(\PDO::class)]
            );

            $manager = $this->app['db'];
            $manager->setDefaultConnection('mock');

            $r = new \ReflectionClass($manager);
            $p = $r->getProperty('connections');
            $p->setAccessible(true);
            $list = $p->getValue($manager);
            $list['mock'] = $this->db;
            $p->setValue($manager, $list);

            $this->cityMock = m::mock(City::class');
        });

        parent::setUp();
    }
```

### 3. Viết code kiểu gì thì rất khó viết test?
Trong lúc code thường chúng ta không quan tâm lắm hậu quả mà code chúng ta sẽ để lại cho người viết code test sau này, hoặc chính chúng ta sẽ phải tự hót đống rác của mình, bằng việt tự phải viết test. Mình và các bạn trong team thường gọi đó là **Quả báo**.

1. **Viết 1 hàm quá dài**: việc này làm cho code vừa khó hiểu vừa khó maintain lại vừa khó test, code càng dài thì chắc chắn càng nhiều logic, mà càng nhiều logic thì tỉ lệ để test chạy pass hết các trường hợp là rất khó, vì thế khuyến cáo chúng ta nên tách ra nhiều method nếu có thể và đặc biệt hạn chế **if else , switch case** nếu không cần thiết.
2.  **Viết gọi static function trong controller** kiểu `$user = User::select()->where() ...` Có vẻ code chạy thì đúng đấy nhưng việc viết query kiểu này mà lúc test thì mock ốm :D Tin tôi đi, nhọc lắm. Khuyến cáo nên tách ra thành các `provider` riêng, để khi test chúng ta có thể cô lập từng phần nhỏ làm cho việc viết test đơn giản hơn.
3.  **Viết quá nhiều điều kiện trong 1 hàm** Việc này dẫn tới mỗi một trường hợp chúng ta phải viết 1 function test cho trường hợp đó, điều này khá ức chế, tuy nhiên khó tránh khỏi vì cuộc đời mà =)) cố gắng hạn chế được thì tốt thôi.

### 4. Nếu phải viết test cho một function như mục 3 thì sao?
1. **Hàm quá dài**: Bắt buộc vẫn phải vừa viết vừa tức thôi chứ không biết làm sao. Nếu là người tạo ra hoặc hiểu hàm đó thì nên refactor lại, tách ra cho code vừa đẹp vừa dễ test.
2. **Viết gọi static function trong controller**  Loại này chúng ta có thể không dùng `Mock` mà dùng `Stubs`. Stubs là dạng test mà chúng ta đi theo chiều sâu, gọi tất cả những hàm liên quan mà hàm đang test đã gọi. Test theo kiểu này thì khá dễ mock dữ liệu, tuy nhiên làm cho test chạy chậm và thực sự cũng không đỡ mệt hơn mấy vì cục data fake cũng phải làm sao cho pass cả những method đang bị gọi. Tuy nhiên có thể `1 mũi tên trúng N đích` vì có thể đang test method A  nhưng có thể coverage được cả method B mà A đã gọi đến. Quá tuyệt :D Loại test này có thể sẽ phải thao tác trực tiếp với dữ liệu trong database. Đôi khi có một số trường hợp kết hợp được cả `Mock` và `Stub`.
3. **Viết quá nhiều điều kiện trong 1 hàm** Phải tách ra nhiều function test, mỗi function là 1 điều kiện mà code có thể rơi vào. Ngoài refactor code thì không còn thuốc nào chữa cho được :(

### 5. Mock kiểu gì khi dính những lỗi này đây ?
1. `BadMethodCallException: Received Mockery_1_Illuminate_Database_Connection::select(), but no expectations were specified`
Thì đúng rồi, trong controller có chỗ nào đó lấy dữ liệu từ database, không nhất thiết là cứ phải có chữ `select` mà thậm chí là find(), where() ... thì tóm lại vẫn là `select` trong database. Mock query `select` cho nó là được:
```php
$this->db->shouldReceive('select')->once()->andReturn((object) []);
```
2.  `ErrorException: Undefined index: aggregate`
Đa số là do trong query của bạn có sử dụng phân trang paginate(), và trong code test thì thiếu param trả về cho mock
```php
$this->db->shouldReceive('select')->once()->andReturn((object) ['aggregate' => 10]);
```
3. `BadMethodCallException: Received Mockery_1_Illuminate_Database_Connection::insert(), but no expectations were specified`
Tương tự như TH 1: Thêm insert vào query mock
```php
$this->db->shouldReceive('insert')->once()->andReturn((object) []);
```
4. `BadMethodCallException: Received Mockery_0_PDO::lastInsertId(), but no expectations were specified`
Kiểu này hơi khác chút, lỗi này do sau khi insert vào db thì kết quả trả ra object vừa được thêm vào, nên yêu cầu phải có expect cho dữ liệu trả ra đó:
```php
$this->db->getPdo()->shouldReceive('lastInsertId')->andReturn(333);
```

### 6. Fake request như thế nào?
Việc sử dụng request trong laravel là gần như luôn luôn và luôn. việc fake request kiểu gì cũng sẽ là vấn đề mà gây không ít lúng túng cho anh em dev. just do it
```php
        $data = [
            'name' => 'New data',
        ];

        $request = new Request();
        $request->headers->set('content-type', 'application/json');
        $request->setJson(new ParameterBag($data));
```

### 7. Fake login như nào?
Login là việc không thể thiết trong hầu hết các project, việc fake login sẽ giúp tạo ra user login giả cho phép truy cập vào các method mà có sẻ dụng middleware.
```php
$user = factory(User::class)->make(['username' => 'phucqd', 'role' => 2]);
$this->be($user);
```

## Tổng kết
Còn rất nhiều dạng của testing mà không ngôn từ nào diễn tả hết được, phải khi thực sự viết test và rơi vào đúng case đó chúng ta mới ngộ ra code có vấn đề. Tuy nhiên trên đây là chút kiến thức về testing trong laravel mà mình đã không may gặp phải, hy vọng sẽ giúp ích được cho những ai đang gặp khó khăn trong việc viết test. Cảm ơn tất cả các bạn đã đón đọc!