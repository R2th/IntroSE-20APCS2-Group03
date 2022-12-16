Khi có những bước chân tập tễnh vào nghề lập trình, mình luôn nghĩ unit testing chỉ để phòng bị là chính. Mình luôn test thủ công, nhưng trải qua những bug phát sinh từ chính những dòng code của mình, nên mình đã dành chút thời gian để có thể học các viết unit test. Trong phần này mình sẽ đề cập tới một số lý do mà tại sao viết unit test lại quan trọng như vậy.
# Unit Test là gì? 
![](https://images.viblo.asia/bed273d9-7062-4c51-b3be-ec71b759307b.jpg)

Unit nghĩa là một đơn vi, hay ta có hỉêu nôm na là một đoạn code, một method hay một class bất kì trong ứng dụng của bạn. Unit Testing là một công đoạn khi phát triển phần mềm dể kiểm tra đầu ra vào đầu vào của một phần ứng dụng đúng như chúng ta mong muốn.  Mỗi đơn vị code đều được test bằng một test case.
# Tại sao ta cần Unit Test?
## Testing giúp code được tổ chức chặt chẽ hơn.

Khi làm với các ngôn ngữ script như PHP hay JS, rất có nhiều trường hợp bạn tập trung viết một feature vào hết một file. Ví dụ, bạn có một feature là lấy danh sách người dùng dịch vụ và xuất ra một file CSV. Bạn có thể viết thành một function bao gồm kiểm tra dữ liệu người dùng nhập để lọc danh sách, truy xuất cơ sở dữ liệu, in ra file CSV.Tuy nhiên, việc viết hết một function sẽ khiến function đó trở nên rất dài và khó để hiểu.

Vậy tại sao viết unit test lại khiến code được tổ chức chặt chẽ hơn? Khi bạn viết unit test, bạn muốn những đoạn code của bạn càng nhỏ càng tốt đễ có thể viết được các test case cho các funtion. Bạn có thể dễ dàng tách một function xuất file CSV thành 3 function khác nhau: 

* Kiểm tra dữ liệu người dùng nhập vào từ bàn phím có đúng chuẩn hay không.
* Truy xuất cơ sở dữ liệu theo điều kiện người dùng nhập vào.
* Xuất ra file CSV từ dữ liệu mà bạn truy xuất được từ cơ sở dữ liệu.

Bằng việc viết tách nhỏ một function to thành các function nhỏ, bạn có thể dễ dàng viết test và kiểm tra được tất cả các testcase. Và do đó, ta hưởng lợi từ việc viết unit test là các function được chia nhỏ giúp việc đọc và maintain dễ dàng hơn.

## Testing là một dạng tài liệu cho code.

Khi bạn viết các test case, chúng sẽ được hiểu như là tài liệu giúp ta biêt được luồng xử lý của function mà bạn test và các trường hợp có thể xảy ra. Giả sử bạn có một function để validate một số và bạn viết test case cho nó: 

```php
public function test_run_validate_number_with_real_number()
{
    $value = 5;

    $result = validateNumber($value);

    $this->assertTrue($result);
}

public function test_run_validate_number_with_string()
{
    $value = 'random string';

    $result = validateNumber($value);

    $this->assertFalse($result);
}
```

Nhìn vào đoạn test trên, bạn đã có thể biết được function **validateNumber** sẽ nhận bao nhiều tham số truyền vào. Thứ hai ta sẽ biết được function sẽ trả về giá trị true nếu giá trị truyền vào là số và trả ra false nếu giá trị là string. Thông qua test ta có thể biết được giá trị truyền vào và giá trị đầu ra của một function mà không cần phải xem logic của function đó.

Đây là một ví dụ nhỏ nhưng nó giúp minh hoạ việc test có thể giải thích đoạn code của bạn. Bạn cũng có thể hướng dẫn đồng nghiệp sử dụng những đoạn code của bạn nếu chúng được đầy đủ các test case.

## Testing giúp ta tránh những lỗi không đáng có.

Bạn đã bao giờ lo lắng mỗi khi ta sửa đổi một function sẽ khiến chương trình gặp lỗi. Mỗi chỉnh sửa đều tồn tại nguy cơ gây lỗi ở một phần ứng dụng nào đó nếu chúng ta kiểm tra không kiểm tra lại. Khi dự án ngày càng lớn, vịêc kiếm tra thủ công sẽ rất khó khăn và tốn thời gian. 

Vịêc viết các test case giúp chúng ta kiểm soát được liệu chương trình mình có đang hoạt động đúng, tuy không có thể kiểm soát hết được toàn bộ bug nhưng các test case sẽ chúng ta phần nào phát hiện những nguy cơ tiềm tàng.

Hãy tưởng tượng vào 12h giờ đêm, khi bạn đang say giấc nồng thì có người gọi điện tới báo úng dụng bạn gặp sự cỗ, và khi kiếm tra lại là chính function mình chỉnh sửa vào sáng nay. Điều này chẳng ai muốn phải không các bạn.

# Tổng kết

Unit Test là bước đầu tiên trong một chu trình kiểm thử phần mềm. 

![](https://images.viblo.asia/241b0843-547b-4e09-9b27-fbfa5aaa55b9.jpg)

Vịêc viết unit test khi đang phát triển ứng dụng có thể tiêu tốn khoản thời gian khá khá, tuy nhiên bạn sẽ nhận lại nhiều hơn thế.