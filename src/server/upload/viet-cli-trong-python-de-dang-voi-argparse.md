**Xin chào các bạn. Hôm nay mình xin phép giới thiệu `argparse`. Đây là một thư viện có sẵn và sẽ sẽ giúp bạn viết CLI (Command Line Interface) trong Python một cách rất dễ dàng.**

Trước tiên, nếu bạn chưa biết CLI là gì, bạn có thể đọc qua tại [đây](https://ubuntu.com/tutorials/command-line-for-beginners#1-overview).  Đại khái có thể hiểu nó là môi trường mà bạn tương tác với máy tính qua lệnh (Command Line). 

## 1. Argparse để làm gì. 

`argparse` là một thư viện có sẵn trong Python dùng để viết CLI. Khi viết, chương trình của bạn sẽ định nghĩa các tham số cần thiết và `argparse` sẽ tìm cách truyền các tham số đó từ `sys.argv`.

Ví dụ, bạn viết 1 phần mềm chuyên dùng để tính toán phức tạp, và bạn viết nó dưới dạng CLI. Người dùng sẽ chạy phần mềm này qua Terminal mà không cần đến giao diện đồ họa (không nút bấm, không cửa sổ). 

Ví dụ chương trình của bạn tên là được chứa trong file tên là `foo`. Vậy người dùng có thể chạy và hiển thị kết quả. 
```
python foo.py arg1 arg2 arg3
result
```

## 2. Dùng argparse như thế nào. 

Chúng ta sẽ bắt đầu với 1 ví dụ được lấy trực tiếp từ doc của thư viện này.

```
import argparse

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('integers', metavar='N', type=int, nargs='+',
                    help='an integer for the accumulator')
parser.add_argument('--sum', dest='accumulate', action='store_const',
                    const=sum, default=max,
                    help='sum the integers (default: find the max)')

args = parser.parse_args()
print(args.accumulate(args.integers))
```

Bạn lấy code này rồi chạy trong Terminal, kết quả sẽ như sau. 
```
usage: prog.py [-h] [--sum] N [N ...]

Process some integers.

positional arguments:
 N           an integer for the accumulator

optional arguments:
 -h, --help  show this help message and exit
 --sum       sum the integers (default: find the max)
```

Mình sẽ giải thích từng phần như sau: 

 ### 1. 
 `import argparse`

Bước này không có gì khó hiểu nếu bạn quen với Python hay một số ngôn ngữ khác cú pháp tương tự. Ở đây chúng ta đang `import` , tức đang gọi code từ module `argparse` sang phiên làm việc hiện tại.

### 2. 
```
parser = argparse.ArgumentParser(description='Process some integers.')
```

Ở đây, chúng ta đang tạo ra 1 biến là `parser`. phần `ArgumentParser` sẽ trả về một object, hay một đối tượng. Từ bước này trở đi biến parser sẽ lưu giữ các thông tin cần thiết để truyền các biến từ CLI vào chương trình Python. Tham số `description` được sử dụng để cung cấp thông tin mô tả chương trình của bạn. Ví dụ ở đây thì `description='Process some integers.'`

Ngoài `description` thì ArgumentParrser còn một số các tham số khác như sau:
* `prog` : Tên của chương trình (Mặc định `sys.argv[0]`, đây thường chính là tên file mà bạn lưu code. )
* `usage`: Một chuỗi miêu tả cách sử dụng chương trình
* `formatter_class`: Một class để tùy chỉnh phần thông tin trợ giúp
* `add_help` : Thêm cờ `-h/--help` cho chương trình để thiện phần thông tin trợ giúp
* `argument_default`: Các tham số mặc định truyền vào

### 3.

```
parser.add_argument('integers', metavar='N', type=int, nargs='+',
                    help='an integer for the accumulator')
parser.add_argument('--sum', dest='accumulate', action='store_const',
                    const=sum, default=max,
                    help='sum the integers (default: find the max)')
```

Ở đây, trước hết `add_argument` định nghĩa cách mà các biến từ CLI sẽ được truyền vào Python. Mỗi lần gọi `add_argument` sẽ xử lý một tham số duy nhất.

Ở vị trí đầu tiên (ở trong ví dụ là `integers` hoặc `--sum`), đây có thể là tên hoặc một cờ bạn sẽ truyền vào. 

Các tham số còn lại có chức năng sau:
* `metavar`: Tên của tham số khi được ghi trong các phần thông tin trợ giúp (ở trong ví dụ là các đoạn 
`usage: prog.py [-h] [--sum] N [N ...]`
và 
`positional arguments:
 N           an integer for the accumulator`
*  `type` : Kiểu dữ liệu mà tham số truyền vào sẽ được ép thành (ở trong ví dụ là kiểu `int`)
*  `help`: Phần thông tin trợ giúp
*  `dest`: Tên của thuộc tính mà sẽ được thêm vào biến được trả về bởi `parse_args()`. `dest` ở trong ví dụ là `accumulate`, và bạn có thể thấy thuộc tính này được gọi sau này.
*  `const`: Một hằng giá trị , không được truyền vào từ CLI nhưng vẫn được lưu bên trong để 1 số hàm bên trong sử dụng, nhất là hàm `action`
* `default`: Giá trị mặc định trả về nếu không có biến nào được truyền vào từ CLI.


Trong hàm add_argument, có 2 tham số đặc biệt cần lưu ý là `nargs` và `action` 

`action`: Mỗi tham số truyền vào CLI sẽ được lớp `ArgumentParser` đính với 1 `action` , tức là một hành động duy nhất. Tham số này sẽ định nghĩa cách các tham số truyền vào từ CLI được xử lý. Hành động này có nhiều kiểu như sau: 

* `'store'`: hành động này sẽ lưu giá trị truyền vào. Đây là hành động mặc định
* `'store_const'`: hành động này sẽ lưu trữ giá trị được định nghĩa bởi từ khóa `const`. Như ở ví dụ trên, `const` đang truyền vào hàm `sum`. Biến này thường được dùng với các tham số dạng cờ. Ví dụ: 
```
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument('--foo', action='store_const', const=42)
>>> parser.parse_args(['--foo'])
Namespace(foo=42)
```

* `'store_true'` và `'store_false'` : đây là dạng đặc biệt của action `'store_const'`, chuyên dùng để lưu các biến `True` và `False`, và đồng thời tạo các giá trị mặc định `False` và `True`. 
* `'count'`: Đếm số lần một `keyword argument` xảy ra
* `'extend'`: Lưu 1 `list`, thêm các tham số truyền vào sau vào `list` đó. 


`nargs`: Như đã nói ở trên thì mỗi tham số truyền vào CLI sẽ được lớp `ArgumentParser` đính với 1 `action`
Tham số `nargs` có thể đính một số lượng các tham số khác nhau với 1 `action`. Các giá trị của `nargs` như sau: 

* `'*'`: Tất cả các tham số truyền vào từ CLI được gom lại vào 1 `list`
* `'+'`: Giống như` '*'`. Nhưng sẽ trả ra 1 tin nhắn lỗi nếu không có tham số nào được truyền vào. Đây là giá trị được sử dụng ở ví dụ.  
* `N`: Một số nguyên `N` các tham số truyền vaò từ CLI sẽ được gom vào một `list`. 
* `?`: Sẽ chỉ có 1 tham số truyền vào từ CLI  được xử lý. Nếu không có tham số nào thì giá trị từ tham số `default` sẽ được sử dụng. 


### 4. 
`args = parser.parse_args()`

Hàm `parse_args()` biến các tham số được gửi vào từ CLI thành các thuộc tính của 1 object và trả về object đó. 
Như vậy có thể thấy trong ví dụ ở bên trên, `args` sẽ là một object chứa các biến được truyền vào như `integer` và `accumulate`.
Sau đó hàm `print` in ra kết quả trả về khi gọi hàm `accumulate` với biến `integers`.
Mình xin phép tổng kết lại các bước và phân tích ví dụ trực tiếp như sau.

Bước 1: Tạo 1 parser từ `Argument Parser`


Bước 2: Thêm `argument` với hàm `add_argument`. 

- Dòng 
```
parser.add_argument('integers', metavar='N', type=int, nargs='+',
                    help='an integer for the accumulator')
```
Thêm tham số integers, là một `list` của tất cả các số truyền vào từ CLI, kiểu số bắt buộc là số nguyên.
- Dòng 
```
parser.add_argument('--sum', dest='accumulate', action='store_const',
                    const=sum, default=max,
                    help='sum the integers (default: find the max)')
```
Thêm tham số `--sum`, được lưu vào thuộc tính `accumulate`, được dùng để tạo ra 1 hàm trả về tổng của các tham số truyền vào, hoặc nếu không có tham số `--sum` được truyền vào sẽ mặc định trả về giá trị lớn nhất.

Bước 3: Các tham số trên được biến đổi thành thuộc tính của một object.


Bước 4: In ra kết quả khi áp dùng hàm `acccumulate` với list `integers`. 

Đó là các bước để viết 1 chương trình CLI trong Python. Mình mong các bạn học được nhiều từ Tutorial này. Nếu muốn đọc thêm bạn có thể tham khảo ở [đây](https://docs.python.org/3/library/argparse.html). Xin cảm ơn vì đã đọc.