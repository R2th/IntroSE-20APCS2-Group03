Lâu rồi mình cũng chưa có ra bài viết mới nhân tiện vừa tròn 2 tháng chuyển qua team <a href="https://hungphamdevweb.com/category/coding-tips/back-end"><strong>Backend</strong></a>. Được vật lộn với đống <strong>Unit Test</strong> và <a href="https://hungphamdevweb.com/tag/php-language"><strong>PHP</strong></a> nên mình cũng có vài thứ để chia sẽ cho các anh em, ahihi.

Hôm nay chúng ta sẽ nói về <code>Public</code>, <code>Protected</code> và <code>Private</code> ở hàm hoặc biến trong ngôn ngữ PHP nói riêng hoặc OOP nói chung.
<h2>Chúng Là Cái Chi Chi:</h2>
Ở trên mạng thì có rất nhiều bài viết định nghĩa rồi, ở đây mình chỉ tóm tắt ngắn ngọn lại như sau:

<strong>Public</strong>: là kiểu dữ liệu khai báo thuộc loại công cộng, những phương thức hoặc biến với kiểu dữ liệu này sẽ được truy xuất và sử dụng ở đâu cũng được.

<strong>Private:</strong> là kiểu kiểu dữ liệu khai báo thuộc loại nội bộ, những phương thức hoặc biến với kiểu dữ liệu này sẽ được truy xuất và sử dụng trong nội bộ của <code>Class</code> nơi mà phương thức hoặc biến đó được khai báo.

<strong>Protected:</strong> là kiểu dữ liệu khai báo cũng thuộc loại nội bộ như <strong>Private</strong>, nhưng thêm vào đó những phương thức hoặc biến với kiểu dữ liệu này ngoài việc sử dụng trong nội bộ <code>Class</code>, chúng còn có thể được truy xuất ở <code>Class</code> con kế thừa <code>Class</code> khai báo hàm hoặc phương thức đó.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/nr4vo3ojra_variable.jpg)
<h2>Ví Dụ:</h2>
Để hiểu thêm về những khái niệm trên chúng ta sẽ cùng nhau làm rõ sương sương qua ví dụ nho nhỏ như sau:

```
class Human
{
  private $year;
  protected $beauty = 'Xau';
  public function getOld() :int
  {
    return $this-&gt;calculateOld();
  }

  private function calculateOld() :int
  {
    return 2019-$this-&gt;year;
  }
  public function setYear($year) :int
  {
     return $this-&gt;year = $year;
  }
}

class HungPham extends Human
{
  public function seeBeauty() :string
  {
    return $this-&gt;beauty;
  }
}

$human = new Human;
$human-&gt;setYear(2000);
echo($human-&gt;getOld()); // kết quả là 19
$hung = new HungPham;
echo($hung-&gt;seeBeauty()); // kết quả là Xau
```

Ở đây mình có một <code>Abstract Class</code> là <strong>Human</strong>, sau khi new một instance mới( new Human ), mình sẽ gọi hàm <code>setYear</code> để đẩy giá trị 2000 vào.

Ở đây hàm <code>setYear</code> phải là kiểu <code>public</code> vì mình cần truy cập nó ở bên ngoài phạm vi Class <strong>Human</strong>.

Giả sử mình cần giấu thông tin của Class <strong>Human</strong>( vì một lý do bảo mật nào đó ), đặc biệt là hàm <code>calculateOld</code> do đó mình cần phải khai báo nó dưới dạng <code>private</code>.

Bởi hàm <code>calculateOld</code> được khai báo là kiểu <code>private</code> nên mình sẽ ko truy xuất được trực tiếp bằng cách gọi ($human-&gt;calculateOld) đó là lý do vì sao mình cần có thêm hàm <code>getOld</code> được khai báo theo kiểu <code>public</code>.

Ở ví dụ tiếp theo mình có một Class con là <strong>HungPham</strong> kế thừa từ Class <strong>Human</strong>, để hàm <code>seeBeauty</code> có thể truy cập được biến <code>beauty</code> ở Class cha mình cần phải khai báo nó dưới dạng là <code>protected</code>

Dễ hiểu phải không các anh em  :laughing:  :laughing:  :laughing:
<h2>Cách Sử Dụng:</h2>
Khi nào dùng những hàm Set hoặc Get, chúng cần dùng thuộc tính <code>public</code> cho phương thức của mình vì nó cần được truy cập ở ngoài Class.

Đối với nhưng phương thức tính toán mang tính chất cốt lõi của Class hãy nên sử dụng <code>private</code>.

Còn <code>protected</code> được sử dụng trong trường hợp Class con muốn truy cập giá trị một biến hoặc một phương thức từ Class cha.
<h2>Kết Luận:</h2>
Bằng cách nắm kỹ những kiến thức cơ bản này, mình nghĩ nó sẽ giúp các anh em đỡ bị ngộp khi đọc code của người khác.

Nếu bài viết còn chỗ nào chưa đúng mong sẽ nhận được những phản hồi tích cực từ các anh em. Hẹn gặp lại vào một bài viết khác vào một ngày không xa. ahihi  :smile:  :smile:  :smile:

Link bài viết gốc của mình ở link bên dưới nhé:

**[https://hungphamdevweb.com/php-language-vai-phut-phut-tim-hieu-public-protected-va-private.html](https://hungphamdevweb.com/php-language-vai-phut-phut-tim-hieu-public-protected-va-private.html)**