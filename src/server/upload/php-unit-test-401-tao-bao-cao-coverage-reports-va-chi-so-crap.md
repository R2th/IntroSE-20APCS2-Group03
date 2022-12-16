Một câu hỏi rất hay gặp đó là: "Chúng ta cần test bao nhiêu là đủ?". Và câu trả lời thường gặp: "Cho đến khi bạn cover được 100% code.". 
Trong bài này, tôi sẽ giải thích code coverage là gì và tại sao con số 100% đôi khi không phải cái đích của unit test.

### Coverage Report
Thử tưởng tượng, project bạn có một lượng lớn code, cũng như vài trăm unit tests. Bạn tự tin rằng phần lớn code của bạn đã được test cẩn thận, nhưng bạn cần phải làm điều gì đó để chắc chắn điều này.
Bạn có thể đi qua từng unit test và tự xác nhận rằng mọi trường hợp của code của bạn đã được bao hàm trong unit test, nhưng nghe có vẻ thật nhàm chán và tốn thời gian? Programmers thường rất thích "lười" và may mắn thay một công cụ vô cùng hữu ích đã tích hợp trong PHPUnit cho phép chúng ta tiếp tục "lười".
Công cụ *Coverage Report* có  chức năng generate các file HTML tĩnh giúp bạn có thể xem thống kê về việc testing code của bạn một cách dễ dàng, bao gồm các thống kê bao nhiêu % code được test và độ phức tạp của đoạn code.
Nó thậm chí còn cho bạn biết liệu unit test của bạn có bỏ qua trường hợp nào không, ví dụ điều kiện `if` chưa được test hết các nhánh chẳng hạn.

#### Tạo coverage report
Đối với phiên bản PHPUnit gần đây, bạn cần update file `phpunit.xml`, thêm thẻ `filter`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit colors="true">
    <testsuites>
        <testsuite name="Application Test Suite">
            <directory>./tests/</directory>
        </testsuite>
    </testsuites>
    <filter>
        <whitelist processUncoveredFilesFromWhitelist="true">
            <directory suffix=".php">./src</directory>
        </whitelist>
    </filter>
</phpunit>
```

Sau đó chạy lệnh `phpunit` với tham số `--coverage-html <thư-mục-output-file-html>` để generate report:
```sh
./vendor/bin/phpunit --coverage-html coverage
```

Bạn sẽ thấy 1 folder mới `coverage` được tạo và chứa các file html. Mở file `index.html` xem thử:
![](https://images.viblo.asia/b8f3cf56-783c-4561-8ce3-46fcced9c310.png)

Chúng ta có 2 kết quả tương ứng với 2 file được test. Mặc dù, chúng ta đang có 3 file test, nhưng `StupidTest.php` không liên quan đến bất cứ file mã nguồn nào nên nó không được thêm vào kết quả report.

#### Coverage cho URL.php
Click vào link `URL.php` trên trang kết quả và bạn sẽ thấy:
![](https://images.viblo.asia/ce48515f-631e-44ff-8a6d-dc185ed7d078.png)

Để ý tới _Legend_ ở cuối trang, nó chú thích những dòng code được bôi mà xanh là đã được thực thi khi chạy test, màu đỏ biểu thị code chưa được thực thi (ví dụ đoạn code trong nhánh `else` chưa được test,...) và mà vàng biểu thị _dead code_ (là những đoạn code thừa, có thể được thực thi nhưng không gây ảnh hưởng gì đến kết quả của hàm/phương thức, ngoài ra, như bạn thấy PHPUnit xem dấu `}` kết thúc function cũng là dead code, điều này là do cơ chế của Xdebug, tham khảo thêm => https://github.com/sebastianbergmann/php-code-coverage/issues/305).

Nếu bạn hover chuột qua từng dòng code, một popup sẽ hiện ra thông tin test unit nào đã cover dòng code đó:
![](https://images.viblo.asia/0aebdbe2-0c39-4be7-82a6-c332938378d7.png)

#### Coverage cho User.php
Back lại trang trước và click vào link `User.php`:
![](https://images.viblo.asia/d25cc1d4-1b09-4644-b883-ca9133e32c7c.png)

Omg!! Đã xuất hiện một dòng màu đỏ.
Cụ thể, ở dòng điều kiện `if`, chưa có test case nào làm thỏa mãn điều kiện `strlen($password) < self::MIN_PASS_LENGTH` trong `::setPassword()`, do đó, dòng code `return false` trong block `if` chưa bao giờ được thực thi.

Chúng ta sẽ thêm 1 test case nữa vào `./phpunit-tut/tests/URLTest.php`. Chúng ta đang mong muốn thực thi code trong block `if`, do đó ta sẽ truyền vào password có độ dài 3 và assert kết quả trả về là `false`:
```php
public function testSetPasswordReturnsFalseWhenPasswordLengthIsTooShort()
{
    $details = [];

    $user = new User($details);

    $password = 'fub';

    $result = $user->setPassword($password);

    $this->assertFalse($result);
}
```

Chạy lại `phpunit` để generate coverage và reload trang và bạn sẽ thấy dòng màu đỏ lúc đầu giờ đã chuyển sang màu xanh.
![](https://images.viblo.asia/78f5d60d-2bf5-4988-a2c3-6227fefe9889.png)

### CRAP
Nếu bạn nhìn vào bảng report, bạn sẽ thấy 1 column tên là `CRAP`, nó là từ viết tắt của `Change Risk Analysis and Predictions` hay `Change Risk Anti-Patterns`, nghe có vẻ khó hiểu, nhưng tôi thích cách hiểu nôm na là: độ khó để bạn đọc lại đoạn 1 code trong tương lai và hiểu được nó đã và đang làm cái quái quỷ gì ở đó.

Một bài chi tiết về CRAP index bạn có thể tham khảo tại [đây](http://www.artima.com/weblogs/viewpost.jsp?thread=210575).

Tôi sẽ không trách bạn tại sao đóng cái link đó nhanh như vậy, nó khá khô cứng và nhạt nhẽo nếu bạn không thực sự quan tâm đến chỉ số `CRAP`...

Một cách đơn giản, chỉ số CRAP của method càng cao thì nó càng khó để hiểu hơn. 

Nếu method của bạn rất đơn giản, chẳng hạn 1 method getter thông thường, thì CRAP sẽ gần bằng 1 (giá trị nhỏ nhất của CRAP). Nếu code trở nên phức tạp hơn, ví dụ thêm vài đoạn `if` vào, thì CRAP sẽ bắt đầu tăng lên. Với `foreach` và các đoạn code lồng nhau, CRAP sẽ tăng lên đáng kể.

Khi bạn viết unit test để xác định các trường hợp thực thi khác nhau của 1 method, chỉ số CRAP sẽ bắt đầu giảm xuống. Một khi method đã được test cover hoàn toàn các trường hợp thì CRAP sẽ nhỏ hơn rất nhiều so với khi chưa có test case nào.

Cho đến bây giờ, các đoạn code mẫu của chúng ta là khá đơn giản. Không có quá nhiều trường hợp thực thi xảy ra, giữ cho chỉ số CRAP hiện tại khá thấp. Đây là cách mà tôi mong muốn: chia nhỏ method để thực hiện các task cụ thể. Nó không chỉ giúp code dễ đọc hơn mà còn cho phép refactoring code trong khi vẫn giữ nguyên unit test.

### 100% code coverage
Có cần thiết phải đạt được 100% code coverage?
Nhiều lập trình viên tán thành với ý kiến viết unit test cho đến khi bạn đạt được 100% coverage. Tuy nhiên, đối với tác giả điều đó là không cần thiết, theo tác giả: nếu 1 method có CRAP < 5 thì nó không phải là phức tạp và không cần thiết để viết test.

Còn theo mình, viết test cho 1 method còn để đảm bảo method đó không bị thay đổi input / output, do đó hãy cố gắng đạt được con số 100%.