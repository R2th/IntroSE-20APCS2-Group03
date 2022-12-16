![Image](https://images.viblo.asia/10010416-3881-454a-ad79-e2fc8e4056e1.png)


## Unit test là gì ?
- **Unit test - Kiểm thử mức đơn vị** là một mức kiểm thử phần mềm với mục đích dùng để kiểm tra kiến trúc nội tại của chương trình. Đây là mức kiểm tra nhỏ nhất trong quy trình kiểm thử phần mềm.

- **Unit - Đơn vị phần mềm** là một thành phần nhỏ nhất mà ta có thể kiểm tra được, các hàm (function), thủ tục (procedure), lớp (class), hoặc các phương thức (method) đều có thể được xem là Unit.

- Unit test thường do lập trình viên thực hiện. Được chạy để  kiểm tra mã nguồn của các chương trình, các chức năng riêng rẽ hoạt động đúng hay không. Unit test thường được chạy mỗi khi xây dựng và chạy thử nghiệm để đảm bảo các hàm đều chạy đúng sau khi ta sửa code.

- Unit test đòi hỏi phải chuẩn bị trước các tình huống (test case) hoặc kịch bản (script), trong đó chỉ định rõ dữ liệu vào, các bước thực hiện và dữ liệu mong chờ sẽ xuất ra.

## Một số đặc điểm của unit test
- Code unit test phải ngắn gọn, dễ hiểu, dễ đọc.

- Mỗi unit test là một đơn vi riêng biệt, độc lập, không phụ thuộc vào unit khác.

- Mỗi unit test là một phương thức (method) trong test class, tên phương thức (method) cũng là tên UnitTest. Do đó ta nên đặt tên hàm rõ ràng, nói rõ unit test này test cái gì.

- Unit test phải nhanh, vì nó sẽ được chạy để kiểm định lỗi mỗi lần xây dựng và chạy thử nghiệm.

- Unit test nên test từng đối tượng riêng biệt. 

## Lợi ích khi viết unit test
- Viết unit test cẩn thận giúp tăng sự tin tưởng vào mã nguồn được thay đổi hoặc bảo trì, vì đã có unit test phát hiện lỗi.

- Vì unit được chọn để kiểm tra thường có kích thước nhỏ và chức năng hoạt động đơn giản, nếu phát hiện lỗi thì việc xác định nguyên nhân và khắc phục cũng tương đối dễ dàng.

- Phát hiện những hàm chạy chậm và không hiệu quả thông qua thời gian chạy của unit test.

- Chi phí và thời gian cho việc sửa chữa lỗi trong giai đoạn unit test sẽ ít hơn so với các giai đoạn sau này.

- Có thể tái sử dụng mã nguồn.

## Thư viện unit test trong Python
- Việc viết unit test trong Python khá đơn giản, cách thông dụng nhất là sử dụng [package unittest](https://docs.python.org/2/library/unittest.html) có sẵn trong standard library.

- Module **unittest** cung cấp tập hợp các công cụ phong phú cho việc xây dựng và chạy thử nghiệm.

## Thiết kế unit test
- Mỗi unit test đều được tiết kế theo trình tự sau:
```
- Thiết lập các điều kiện cần thiết bao gồm khởi tạo các đối tượng, xác định tài nguyên cần thiết, xây dựng các dữ liệu giả.
- Gọi các phương thức cần kiểm tra.
- Kiểm tra sự hoạt động đúng đắn của các phương thức.
- Dọn dẹp tài nguyên sau khi kết thúc kiểm tra.
```

## Ví dụ cơ bản
- Tạo một tệp **example.py**, đây là một đoạn chương trình ngắn để kiểm tra ba phương thức chuỗi:
```
# Python code to demonstrate working of unittest 
import unittest 
  
class TestStringMethods(unittest.TestCase):
    """Sample test case"""
    
    # Setting up for the test
    def setUp(self):
        pass
    
    # Cleaning up after the test
    def tearDown(self):
        pass

    # Returns True if the string contains 6 a. 
    def test_strings_a(self): 
        self.assertEqual( 'a'*6, 'aaaaaa') 
  
    # Returns True if the string is in upper case. 
    def test_upper(self):
        self.assertEqual('love'.upper(), 'LOVE') 
  
    # Returns True if the string is in uppercase 
    # else returns False. 
    def test_isupper(self):
        self.assertTrue('LOVE'.isupper()) 
        self.assertFalse('Love'.isupper())  
  
if __name__ == '__main__': 
    unittest.main() 
```

- Đoạn mã trên là một đoạn script ngắn để kiểm tra 3 phương thức chuỗi.

- **unittest.TestCase** được sử dụng để tạo các trường hợp thử nghiệm, testcase được tạo ra bằng cách kế thừa **unittest.TestCase**.

- Phương thức bắt đầu bằng tiền tố **test_**

- Phương thức **setUp()** và **tearDown()** cho phép định nghĩa hướng dẫn sẽ được thực hiện trước và sau mỗi phương thức test.

- **test_strings_a** : thử nghiệm này được sử dụng để kiểm tra thuộc tính của chuỗi trong đó một ký tự **a** nhân với một số **x** cho đầu ra là  ra là **x lần a**. Câu lệnh **assertEqual()** được sử dụng để kiểm tra xem kết quả thu được có bằng kết quả mong đợi hay không. 

- **test_upper** : thử nghiệm này được sử dụng để kiểm tra xem chuỗi đã cho có được chuyển đổi thành chữ hoa hay không. Câu lệnh **assertEqual()** được sử dụng để xác minh xem một câu lệnh đã cho là đúng hay sai. Câu lệnh trả về **True** nếu chuỗi trả về là chữ hoa.

- **test_isupper** : thử nghiệm này được sử dụng để kiểm tra thuộc tính của chuỗi trả về **True** nếu chuỗi nằm ở chữ hoa khác trả về **False**. Câu lệnh **assertTrue() / assertFalse()** được sử dụng để xác minh điều này.

- khối mã ở phía dưới cùng **unittest.main()** cung cấp giao diện dòng lệnh cho tập lệnh thử nghiệm. Khi chạy tập lệnh trên từ dòng lệnh :
```
python -m unittest example
``` 

- Cho ra kết quả sau :
```
...
----------------------------------------------------------------------
Ran 3 tests in 0.000s

OK
```

- Thay vì sử dụng **unittest.main()**, có nhiều cách khác để chạy thử nghiệm với mức độ kiểm soát tốt hơn, đầu ra ít hơn và không yêu cầu phải chạy từ dòng lệnh. Ví dụ: **unittest.main()** có thể được thay thế bằng :
```
suite = unittest.TestLoader().loadTestsFromTestCase(TestStringMethods)
unittest.TextTestRunner(verbosity=2).run(suite)
```

- Chạy tập lệnh :
```
python example.py
```

- Cho ra kết quả :
```
test_isupper (__main__.TestStringMethods) ... ok
test_strings_a (__main__.TestStringMethods) ... ok
test_upper (__main__.TestStringMethods) ... ok

----------------------------------------------------------------------
Ran 3 tests in 0.000s

OK
```

- Kết quả thử nghiệm nếu tất cả các trường hợp kiểm tra được thông qua, đầu ra cho thấy **OK**.

## Kết luận
- Bằng việc có một bộ test để đảm bảo hệ thống đang hoạt động đúng, giúp các thành viên khác trong team của bạn, hay chính bản thân bạn tự tin khi thêm/thay đổi/sửa/xóa code, mà không sợ ảnh hướng tới những chức năng khác thì việc tìm hiểu và thực hành viết unit test là không thừa đúng không nào.

- Đối với các bạn mới tiếp cận về **unit test** mình hi vọng bài viết này của mình sẽ giúp các bạn hiểu hơn và không ngần ngại mỗi khi động tới vấn đề này. Cảm ơn các bạn đã quan tâm. 

## Tài liệu tham khảo
- [Unit Testing in Python – docs](https://docs.python.org/2/library/unittest.html)
- [Unittest Python - gist](https://gist.github.com/ntk148v/55154ea867555001c4aa47b970cac64b#unittest_python)