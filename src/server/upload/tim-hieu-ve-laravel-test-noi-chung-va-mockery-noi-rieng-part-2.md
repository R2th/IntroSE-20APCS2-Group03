<div align="center">

# Lời mở đầu
</div>

Xin chào các bạn, đã **2 năm** rồi mình mới quay trở lại viết viblo ^^ <br> Lời đầu tiên xin được chúc cho các bạn đọc năm mới an khang thịnh vượng,  có nhiều thành công trong công việc cũng như là niềm vui trong cuộc sống. 

Và quan trọng hơn nữa là năm mới hãy tiếp tục ủng hộ **[Viblo](https://viblo.asia/)** nói chung và **[bản thân mình](https://viblo.asia/u/vuongthai95)** nói riêng để ngày càng có thêm nhiều bài viết chất lượng hơn nữa nhé.

Thôi tán gẫu đầu xuân thế thôi, mình xin quay lại với nội dung bài viết, ở **[part 1](https://viblo.asia/p/tim-hieu-ve-laravel-test-noi-chung-va-mockery-noi-rieng-part-1-4dbZN3MLlYM)** mình đã giới thiệu những khái niệm cơ bản về **Automation test** nói chung và **Laravel test** nói riêng (chắc vì cơ bản quá nên chỉ được có 75 lượt views :sob::sob::sob::sob::sob::sob:). <br> Và trong phần 2 này, mình sẽ đề cấp đến một nội dung khó nhằn hơn (đối với mình thì là như vậy, các cao nhân có đọc bài thì góp ý nhẹ nhàng giúp em tiến bộ với ạ), đó chính là **[Mockery](https://laravel.com/docs/5.5/mocking)**.
<br>
<br>

<div align="center">

# Nội dung
</div>

<div align="center">

## Mockery là gì? Tại sao lại phải dùng Mockery?
</div>

Nếu bạn còn nhớ thì ở bài viết trước, mình đã hướng dẫn viết một file test để check xem một `comment` có thuộc về `user` hay không. Đó là một trường hợp test khá đơn giản, vì nó chỉ việc kiểm tra trong cơ sở dữ liệu xem trường `user_id` trong bảng `comments` có trùng với `id` trong bảng `users` hay không!
<br>
<br>
Và tất nhiên, cuộc sống thì không phải lúc nào cũng toàn những thứ đơn giản, và trong một project cũng vậy, ngoài những chức năng thêm sửa xóa trong cơ sở dữ liệu thì còn vô vàn các chức năng khác phức tạp hơn như là `gửi thông báo (notifications)`, `gửi mail (xác thực tài khoản, đổi mật khẩu, ...)` rồi thì `gọi sang API bên thứ 3`. Các chức năng này phức tạp ở chỗ nó không chạy độc lập mà có liên quan đến một/nhiều phần khác nữa.

<br>
Hiểu đơn giản là thế này, giờ 1 bài tập có 2 phần và phần 2 phải dùng kết quả của 1 phần 1 để làm. Tức là nếu phần 2 bị sai thì có 2 khả năng có thể xảy ra:

- Bản thân phần 2 bị sai (cái này thì không có gì đặc biệt rồi)
- Phần 1 sai dẫn đến phần 2 sai (**LÀM THẾ NÀO KIỂM SOÁT ĐƯỢC CÁI THẰNG KHÔNG THUỘC PHẠM VỊ TRÁCH NHIỆM CỦA MÌNH NHỈ?**)

Và **Mockery** là câu trả lời cho câu hỏi to tướng được in đậm ở trên!

Với **Mockery**, bạn có thể giả lập/mô phỏng hành vi của những đối tượng (**KHÔNG THUỘC PHẠM VI TRÁCH NHIỆM**) và coi như nó chạy đúng thay vì chạy thật. Ví dụ, nếu chức năng của bạn cần gọi sang API bên thứ 3 để lấy dữ liệu thì bạn sẽ không kiểm soát được là lúc nào cái API ấy lăn ra chết, vì vậy cần sử dụng Mockery để mô phỏng việc gọi API thay vì gọi sang API thật!

Dài dòng như thế mong rằng các bạn đã hiểu được bài toán nào thì cần sử dụng Mockery rồi chứ. Giờ thì bắt tay tìm hiểu xem sử dụng nó như thế nào nhé!

<div align="center">

## Sử dụng Mockery như thế nào?
</div>

- Trước hết, để sử dụng được Mockery thì chúng ta phải cài đặt vào project, thông qua Composer thì việc này không thể đơn giản hơn, chỉ cần thêm vào file `composer.json` rồi chạy lệnh `composer install` là xong

    ```php:composer.json
    {
      "require-dev": {
        "mockery/mockery": "1.0.0-alpha1@dev"
      }
    }
    ```


- Sau khi cài đặt xong thì dùng thôi chứ chờ đợi gì nữa
    - Để khai báo:
        ```php
        //giả lập cả một class
        $mock = Mockery::mock('path-to-mock-class'); 
        
        //giả lập method chỉ định
        $mock = Mockery::mock('path-to-mock-class[method]');
        // hoặc
        $mock = Mockery::mock('path-to-mock-class')->makePartial();
        $mock->shouldReceive('methodName')
        ```
        
        
    - Một số tùy chọn khác:
    
        ```php:option
        //ngoài ra có thể thêm một số tùy chọn như:
        shouldAllowMockingProtectedMethods() //cho phép truy cập các protected method
        times() //chỉ định số lần thực hiện method
        makePartial() //chỉ thực hiện mock cho một phần cụ thể, được sử dụng kèm với shouldReceive
        shouldReceive() //chỉ định những method nào được gọi 
        
        //truyền tham số
        with($arg1, $arg2); withArgs([$arg1, $arg2]) 
        withAnyArgs() //có thể truyền tham số bất kì (đây là lựa chọn mặc định)
        withNoArgs() //không truyền tham số
        
        // trả về kết quả của method
        andReturn() //có thể trả về nhiều kết quả 
        andReturnValues([])
        andReturnNull()
        
        //còn nhiều cái hay lắm, như `andReturnUsing` này, `andReturnSelf`, các bạn lên đọc rồi tự dịch nhé, như thế thấm hơn là đọc sẵn như thế này nhiều
        
        //ngoài trả về giá trị, bạn cũng có thể xử lý ngoại lệ với 
        andThrow(Exception)
        
        ```
  
  
- Khẩu quyết mình đưa ra như thế này chắc cũng tạm ổn rồi, giờ thì "thực chiến" một tí cho nóng người nhỉ (làm cái đơn giản thôi nhé ^^)
    - Bài toán đặt ra: trong `__contruct` của `UserController` bạn sử dụng `UserRepository` thì khi viết test cho phần UserController, bạn sẽ cần sử dụng Mockery để mock `UserRepository` thì bạn mới có thể test được các function ở trong `UserController` (ví dụ của mình ở đây là `index`, ngoài ra có thể có nhiều function khác nữa tuỳ vào bài toán của bạn)
    - Controller:
        ```php:UserController.php
        class UserController extends BaseController 
        {
            public function __construct(UserRepository $users)
            {
                $this->users = $users;
            }

            public function index()
            {
                $users = $this->users->all();
                return View::make('user.index', compact('users'));
            }
        }
        ```
    - Code test:
        ```php:UserControllerTest.php
        class UserControllerTest extends TestCase
        {
            public function testIndex()
            {
                $repository = Mockery::mock('UserRepository');
                $repository->shouldReceive('all')->andReturn(new Collection(array(new User, new User)));
                App::instance('UserRepositoryInterface', $repository);

                $this->call('GET', 'users');
            }

        }
        ```
<div align="center">

# Lời kết
</div>

Vì mình cũng chỉ mới tìm hiểu về Mockery nên chưa thể chia sẻ những kiến thức sau hơn về Mockery, tuy vậy vẫn hi vọng bài viết của mình có ích đối với các bạn.

Các bạn nếu quan tâm đến Laravel và thấy bài viết của mình hữu ích thì hãy follow mình và clip [series Laravel của mình](https://viblo.asia/s/nhung-dieu-can-tim-hieu-khi-bat-dau-lam-project-php-laravel-Wj53OmjP56m) để đón đọc những bài viết tiếp theo của mình nhé!
<br>
<br>

Cảm ơn các bạn rất nhiều và chúc mừng năm mớiiiiiiiiiiiiiiiiiiiiiiiiiiii!
<br>
<br>

<div align="center">

# Tài liệu tham khảo
</div>

- **Laravel mocking**: https://laravel.com/docs/5.5/mocking
- **Mockery document**: http://docs.mockery.io/en/latest/
- Một số bài viết của các tiền bối đi trước trên **Viblo**!!!!!!!