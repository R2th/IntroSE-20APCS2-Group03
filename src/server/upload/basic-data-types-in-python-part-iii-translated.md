![](https://images.viblo.asia/335ef808-e6eb-4404-9a57-aeef3060059d.png)

#### Here’s what you’ll learn in this tutorial:

- Bạn sẽ tìm hiểu về một số dữ liệu cơ bản **numeric**, **string** và **Boolean** được xây dựng sẵn trong Python
- Bạn cũng sẽ có được cái nhìn tổng quan về các hàm built-in của Python

### Built-In Functions

Trình biên dịch Python hỗ trợ rất nhiều các hàm built-in: 68, kể từ Python 3.6. Rất nhiều trong số đó sẽ được đề cập ở dưới đây, tất nhiên là một cách ngắn gọn.

**1. Math**

| Function   |      Description      |
|:----------:|:-------------:|
| abs() | Trả về giá trị tuyệt đối của một số |
| divmod() | Trả về phần nguyên và phần dư của phép chia |
| max() | Trả về giá trị lớn nhất của một tập các giá trị |
| min() | Trả về giá trị nhỏ nhất của một tập các giá trị |
| pow() | Phép toán nâng lũy thừa |
| round() | Làm tròn một giá trị |
| sum() | Tính tổng các phần tử của một iterable |

**2. Type Conversion**

| Function   |      Description      |
|:----------:|:-------------:|
| ascii() | Trả về một string dưới dạng một biểu diễn có thể in được của một object |
| bin() | Convert một số nguyên thành một string nhị phân |
| bool() | Convert một tham trị thành một giá trị Boolean |
| chr() | Trả về string / ký tự có điểm mã Unicode là số nguyên truyền vào |
| complex() | Trả về số phức từ các tham trị |
| float() | Convert tham trị (số hoặc string) thành kiểu float |
| hex() | Convert một số nguyên thành string hexa |
| int() | Convert tham trị (số hoặc string) thành kiểu integer |
| oct() | Convert một số nguyên thành string octal |
| ord() | Trả về điểm mã Unicode tương ứng với ký tự đầu vào |
| repr()  | Trả về một string dưới dạng một biểu diễn có thể in được của một object |
| str() | Convert một đối tượng sang string |
| type() | Trả về type của đối tượng hoặc tạo ra một object type mới |

**3. Iterables and Iterators**

| Function   |      Description      |
|:----------:|:-------------:|
| all() | Trả về `True` nếu tất cả phần tử của một iterable là true |
| any() | Trả về `True` nếu tồn tại bất kỳ một phần tử nào của một iterable là true |
| enumerate() | Trả về một list các tuple gồm chỉ mục và giá trị của một iterable |
| filter() | Lọc các phần tử của một iterable |
| iter() | Trả về một iterator |
| len() | Trả về độ dài của một object |
| map() | Gọi hàm với các phần tử của iterable và trả về một list các kết quả |
| next() | Lấy ra phần tử tiếp theo của iterator |
| range() | Tạo ra một dải các giá trị nguyên |
| reversed() | Trả về một iterator đã được đảo ngược |
| slice() | Trả về một object `slice` |
| sorted() | Trả về một list đã được sắp xếp từ một iterable |
| zip() | Tạo ra một iterator gồm các tuple được tổng hợp từ các phần tử của các iterable |

**4. Composite Data Type**

| Function   |      Description      |
|:----------:|:-------------:|
| bytearray() | Trả về một object `bytearray` |
| bytes() | Trả về một object `bytes` |
| dict() | Trạo ra một object `dict` |
| frozenset() | Trả về một object `frozenset` |
| list() | Tạo ra một object `list` |
| object() | Trả về một object nguyên thủy |
| set() | Tạo ra một object `set` |
| tuple() | Tạo ra một object `tuple` |

**5. Classes, Attributes, and Inheritance**

| Function   |      Description      |
|:----------:|:-------------:|
| classmethod() | Trả về một class method với một hàm cho trước |
| delattr() | Xóa một attribute của một object |
| getattr() | Lấy ra giá trị của một attribute của một object |
| hasattr() | Xác định xem một object có chứa một attribute hay không |
| isinstance() | Xác định xem một object có thuộc một class hay không |
| issubclass() | Xác định xem một class có là con của một class khác hay không |
| property() | Trả về một giá trị property của một class |
| setattr() | Gán giá trị property của một class |
| super() | Trả về một proxy object cho phép tham chiếu tới class cha |

**6. Input/Output**

| Function   |      Description      |
|:----------:|:-------------:|
| format() | Convert một giá trị thành một biểu diễn theo một định dạng nào đó |
| input() | Đọc đầu vào từ console |
| open() | Mở và trả về một file object |
| print() | In một chuỗi |

**7. Variables, References, and Scope**

| Function   |      Description      |
|:----------:|:-------------:|
| dir() | Trả về list các attribute của một object |
| globals() | Trả về một dictionary gồm bảng ký hiệu toàn cục (global symbol table) |
| id() | Trả về ID của một object |
| locals() | Trả về một dictionary gồm bảng ký hiệu cục bộ (local symbol table) |
| vars() | Trả về attribute `__dict__` của một module, class hoặc object |

**8. Miscellaneous**

| Function   |      Description      |
|:----------:|:-------------:|
| callable() | Kiểm tra xem một object có là callable hay không |
| compile() | Convert một nguồn (string, AST object) thành object mã Python |
| eval() | Evaluate một biểu thức Python |
| exec() | Thực thi một đoạn mã Python |
| hash() | Trả về giá trị hash của một object |
| help() | Gọi ra hệ thống hỗ trợ của Pyhon |
| memoryview() | Trả về một memory view object |
| staticmethod() | Trả về một static method của một function |
| `__import__()` | Hàm được gọi bởi lệnh `import` (không được khuyến cáo dùng) |








Nguồn: https://realpython.com/python-data-types/