# 1. Mở đầu
Khi mới chập chững bước vào lập trình, mình chỉ nghĩ đơn giản là mình phát triển chức năng thì mình cứ code cho xong, nếu có bug thì lại fix. Nhưng đối với những dự án lớn, khách hàng liên tục thay đổi yêu cầu và thêm chức năng. Thì lúc này, mình chỉ sửa một vài dòng code nhỏ thôi cũng có thể ảnh hưởng đến rất nhiều đến toàn bộ hệ thống. Và để đảm bảo được độ ảnh hưởng cũng như không phải mất quá nhiều thời gian self-test lại toàn bộ hệ thống. Thì các công cụ Testing được ra đời nhằm phục vụ cho việc này.

Trên thực tế thì có rất nhiều công cụ cũng như mức độ `Testing` nhưng trọng tâm của bài viết này mình sẽ nói về `Unit test` nha. 

![](https://images.viblo.asia/0902b0ef-9693-4246-91bb-152768d9486b.png)

# 2. Unit test là gì?
- Unit Testing là một phương pháp kiểm thử phần mềm mà ở đó từng đơn vị riêng lẻ (Individual Unit) của source code được test để kiểm tra xem chúng có đảm bảo chất lượng để sử dụng không.
- Ở trong Django Project, viết Unit Test là quá trình mà ở đó, tất cả các Test cases cho từng function/method riêng biệt được viết.
- Unit Test cần được thiết kế để kiểm tra function một cách độc lập. Hay nói cách khác: `A` cần `B` để chạy. Ngay cả khi `B` có lỗi, thì Unit Test của `A` **VẪN SẼ PASS** nếu không có vấn đề gì với `A`
- Một Unit Test tốt KHÔNG NÊN thực hiện những việc như sau:
    * Trigger để chạy codes từ những functions khác trong project
    * Truy vấn vào cơ sở dữ liệu thật
    * Sử dụng file system
    * Truy cập mạng
# 3. Cấu trúc thư mục và các file tests?
Trong Django, mỗi một `module/app` sẽ đều có 1 file `test.py`. Nó đảm bảo được việc test riêng biệt các `function/method` trong `module/app` đó. Nếu một `module/app` lớn, chúng ta có thể chia file `test.py` thành folder `tests` và trong đó chứa các file test.

![](https://images.viblo.asia/22d34ea2-af33-4720-85ba-8fead8c4c616.png)

Và nội dung của mỗi file test sẽ có dạng:
```file_test.py
# your test file
from django.test import TestCase


# class to define a test case for login
class UserLoginTestCase(TestCase):

    def setUp(self):
        ...
        
    def tearDown(self):
        ...

    def test_correct_login(self):
        # unit test
        # Corroborate the expected scenario
        ...
    
    def test_if_password_incorrect_then_can_not_login(self):
        # unit test
        # Corroborate that user's password needs to be only the correct one
        ...
    
    def test_if_user_not_registered_can_not_login(self):
        # unit test
        # Corroborate that user's are able to login only if they're registered
    
    ...
```
# 4. Chạy thử 1 test
Để chạy 1 test, chúng ta sử dụng command:
```
$ python manage.py test <module>
```

Lưu ý về **convention**:
- `python manage.py test` là bắt buộc.
- `<module>` là module/app nằm ở root của project (ngang hàng với file manage.py)
# 5. setUp và tearDown
Trường hợp đặt ra là trong class test của chúng ta có rất nhiều biến global và chúng ta phải gán hoặc hủy giá trị này sau mỗi lần chạy test, nếu mỗi testcase đều có những câu lệnh gán và hủy giống nhau thì không ổn. PHPUnit cung cấp các phương thức để giải quyết vấn đề:
- `setUp()`: Chạy trước mỗi method test. Sử dụng khi muốn khởi tạo biến, mở kết nối file,... chuẩn bị môi trường để test
- `tearDown()`: Chạy sau mỗi method test. Sử dụng để hủy các biến, kết nối,...
- `setUpClass()`: Chạy khi bắt đầu class test
- `tearDownClass()`: Chạy sau khi kết thúc class test

Như ở ví dụ trên, việc test sẽ chạy lần lượt theo thứ tự:
1. UserLoginTestCase.setUp
1. UserLoginTestCase.test_correct_login
1. UserLoginTestCase.tearDown
1. UserLoginTestCase.setUp
1. UserLoginTestCase.test_if_password_incorrect_then_can_not_login
1. UserLoginTestCase.tearDown
1. UserLoginTestCase.setUp
1. UserLoginTestCase.test_if_user_not_registered_can_not_login
1. UserLoginTestCase.tearDown

# 6. Assertion 
`Assertion` hiểu một cách đơn giản nhất thì nó là một function để so sánh các giá trị có đúng với mong đợi hay không.

Ví dụ: Nếu giá trị là false thì test sẽ fail
```file_test.py 
def test_example(self):
    foo = false;
    self.assertTrue(foo);
```

Một số `assetion` thường dùng:
- `assertEqual`/`assertNotEqual`
- `assertTrue`/ `assertFalse`
- `assertIn`/`assertNotIn`
- `assertIsNone`/`assertIsNotNone`

# 7. Test Coverage 
- Code coverage là một phương pháp đánh giá được dùng để mô tả mức độ mà source code của một chương trình đã được thực thi, khi mà một bộ Test cụ thể chạy. Nói một cách khác, Code coverage là một cách để đảm bảo rằng Tests của bạn thực sự đang test Codes của bạn!
- Công thức tính Code coverage:
```
Code Coverage = (Lines of code that unit test accessed) / (Total lines of code in project) x 100%
```
Ví dụ: Nếu code coverage của bạn là 90%, điều đó có nghĩa là 90% các dòng codes trong project của bạn đã được gọi ghi chạy Test.
- Cài đặt `test coverage`:
```python
$ pip install coverage
```
- Sau khi cài đặt coverage, chúng ta chạy chúng bằng command:
```
$ coverage run manage.py test <module>
```
```
- Và kiểm tra coverage của dự án:
```python
# return a folder named htmlcov
$ coverage html 

# return direct in terminal
$ coverage report
```
- Trong trường hợp coverage đọc cả những file `.venv` (file môi trường) thì chúng ta sẽ sử dụng `--include='<module>/*'` để report cụ thể những file có nằm trong module đó:
```python
$ coverage html --include='<module>/*'
```

**Note: Code Coverage thực sự là một công cụ rất hữu ích để tìm kiếm những thành phần chưa được tests trong project của bạn. Tuy nhiên, nó không phải là một con số vạn năng để có thể đảm bảo cho chất lượng Tests của bạn.**

## Lời kết 
Bài viết hôm nay của mình tạm dừng ở đây thôi, hy vọng sẽ mang đủ thông tin cần thiết về việc testing trong dự án Django của bạn.