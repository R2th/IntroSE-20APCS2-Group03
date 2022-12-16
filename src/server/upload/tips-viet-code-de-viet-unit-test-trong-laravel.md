# Mở đầu

Unit test chắc cũng không còn xa lạ với mọi người. Nó chủ yếu được viết ra để kiểm thử các chức năng đã được thiết kế cũng như bao quát được tất cả các dòng code trong dự án và quy lại là để đảm bảo chất lượng dự án. Nhưng cách viết code thế nào để viết unit test dễ cũng là 1 trong các vấn đề đáng quan tâm.<br>
Chính vì vậy hôm nay mình sẽ giới thiệu cho các bạn các tips viết code trong laravel để dễ viết unit test mà mình đã học được trong thời gian qua.<br>
Bắt đầu nào! <br>
(Ở bài này mình mặc định các bạn đã biết viết unit test cơ bản rồi nhé.)
# Nội dung
## 1.Hãy nạp các class sử dụng bên ngoài trong class vào __construct()

Khi khởi tạo 1 class nếu bên trong class có sử dụng các class khác từ bên ngoài thay vì gọi trực tiếp như thế này cho nhanh:
```
class Test
{
    public function test () {
        //khởi tạo class A 
        $a = new class(A);
        //hoặc
        $a = app(A::class)
        //gọi hàm create
        $a->create()
        //Gọi trưc tiếp model
        User::create()
    }
}
```
Thì ta sẽ làm như sau: Tất cả các class bên ngoài được sử dụng thì ta sẽ thêm hết vào **construct**() trong class:
```
class Test
{
     protected $a;
     protected $user;
     public function __construct(
            A $a,
            User $user,

        ) {
            $this->a = $a;
            $this->user = $user;
     }
        
    public function test () {
        $this->a->create()
        $this->user->create()
    }
}
```
Hoặc có thể sử dụng **Dependency Injection** ngay trong hàm gọi nó thay vì thêm vào  **construct** :
```
class Test
{
     public function __construct(
     }
        
    public function test ( User $user, A $a) {
        $user->create()
        $a->user->create()
    }
}
```
<br>

**Lý do**: Khi ta không thêm mà gọi trực tiếp thì khi viết unit test cho class  **Test**  thì ta rất khó có thể dùng Mockery để mock inject object hay các class bên ngoài và set các phương thức trả về giá trị cần thiết cho nó==> dẫn đến việc thực thi viết  unit test cho hàm đó trở nên khó khăn.(có lúc dường như còn không thể viết được).

## 2.Hạn chế sử dụng function private call function private, static, final
Ví dụ:
```
class Test
{
        public function __construct(
                A $a,
                User $user,
            ) {
            $this->a = $a;
            $this->user = $user;
        }
        private function testA() 
        {
            $data = [
                'name' => 'name'
            ]
            $this->B($data);
            self::testC;
        }
        
         private function testB(data) 
        {
              $user = $this->user->create(data);
             
              return $user;
        }
        public function static testC()
        {
            //  to do ...
        }
}
```

Nhìn đoạn code trên trong function private testA gọi đến function private testB (hoặc static testC) thực sự viết unitest mock function testB (hoặc static testC) để trả về 1 giá trị nào đó cũng rất khó. Do bản chất của unit test là khi test hàm A mà trong A có sử dụng các class bên ngoài thì ta sẽ cô lập và mock các class đó để trả về các giá trị ta mong muốn. Chính vì vậy mà ở trên ta không thể mock được function testB cũng như testC để sử dụng kết quả khi thực hiện viết unit test cho function testA.
(Các bạn có thể vào đây đọc thêm https://phpunit.readthedocs.io/en/8.5/test-doubles.html có đoạn sau)
![](https://images.viblo.asia/343e1fc8-1bfe-4c8d-9064-c872dc56f97e.png)
<br>
**Note**: Thay vì đó chúng ta có thể chuyển các phương thức đó sang **protected** 

## 3. 1 function chỉ nên tối đa 30-40 dòng 

Cũng như viết chuẩn code thì 1 function nên tối đa 30-40 line nhưng thực tế nhiều bạn không để ý cũng không quan tâm mấy nên khi viết số line trong 1 function lên tới 200-300 dòng. Thực sự khi chính bạn đọc code hay người khác đọc code bạn cũng đúng là ác mộng . Huống chi là phải viết test cho nó. 

## 4. Luôn return value cho function

Một function nên có kết quả trả về để ta có thể viết unit test 1 cách chính xác hay đúng nghĩa hơn thay vì không trả về gì (đôi lúc coverage hết cũng chỉ cho qua các dòng code và dùng assertNull thì nhìn hơi vô nghĩa :)) ).
## 5. Tổ chức luồng logic (Controller -> Service -> Repository)
Thường chúng ta hay theo MVC kiểu **controller** sẽ gọi trực tiếp đến **model** nhưng mình thấy việc như thế chỉ xử lý được những case đơn giản  nếu logic phức tạp hơn thì ta thấy code trong controller sẽ phình ra và khó kiểm soát. Vậy nên sử dụng thêm Service trung gian để xử lý những logic phức tạp là cần thiết. <br>
Mỗi 1 file controller nên có 1 file service và 1 file repository riêng để ta viết code sẽ theo quy tắc sau:<br>

Vd: TestController ----> TestService ----> TestRepository <br>
TestController: Chủ yếu dùng để điều hướng tức sẽ kiểu nhìn vào ta biết nó sẽ làm gì ngắn gọn và rõ ràng.<br>
TestService: Chủ yếu sẽ thực thi các chức năng logic phức tạp  <br>
TestRepository: sẽ thao tác với model truy vấn vào database  <br>

**Note**: Nên hạn chế ở trong **controller** lại gọi trực tiếp tới **repository** đặc biệt là gọi thằng tới model kiểu User::all(), hay DB::table('User') .... <br>
Chúng ta nên tuân thủ quy tắc trên để khi thực hiện viết unit test hay đọc code cũng dễ dàng hơn. 

# Tổng kết
Trên đó là những kinh nghiệm mà mình rút ra được trong quá trình viết unit test trong laravel của mình. 

Mong rằng sẽ giúp ích được cho các bạn.