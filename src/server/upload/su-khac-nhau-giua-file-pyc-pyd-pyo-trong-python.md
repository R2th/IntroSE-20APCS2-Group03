Trong bài viết này, chúng ta sẽ xem xét các loại tệp Python .pyc, .pyo và .pyd và cách chúng được sử dụng để lưu trữ mã bytecode sẽ được nhập bởi các chương trình Python khác nhau .

Bạn có thể đã làm việc với các tệp .py viết mã Python, nhưng bạn muốn biết những loại tệp khác này làm gì và chúng được sử dụng ở đâu. Để hiểu những điều này, chúng ta sẽ xem xét cách Python biến đổi mã bạn viết trong cấu trúc mà máy có thể thực thi trực tiếp.

# 1. Bytecode và Máy ảo Python
Python cung cấp một trình thông dịch có thể được sử dụng như một REPL (read-eval-print-loop), một cách tương tác, trên dòng lệnh. Ngoài ra, bạn có thể gọi Python bằng các tập lệnh của mã Python. Trong cả hai trường hợp, trình thông dịch phân tích dữ liệu đầu vào của bạn và sau đó biên dịch nó thành bytecode (lệnh máy cấp thấp hơn), sau đó được thực thi bởi một "tái hiện Pythonic"("Pythonic representation"  ) của máy tính. "Pythonic representation" này được gọi là máy ảo Python.

Tuy nhiên, nó có đủ khác biệt so với các máy ảo khác như máy ảo Java hoặc máy ảo Erlang mà nó đáng được nghiên cứu. Máy ảo lại giao tiếp với hệ điều hành và phần cứng thực tế để thực thi các lệnh của máy. 

Điều quan trọng cần lưu ý khi bạn nhìn thấy các loại tệp .pyc, .pyo và .pyd, đó là đây là các tệp được tạo bởi trình thông dịch Python khi nó chuyển đổi mã thành mã bytecode được biên dịch. Biên dịch mã nguồn Python thành mã bytecode là bước trung gian cần thiết trong quá trình dịch các lệnh từ mã nguồn bằng ngôn ngữ có thể đọc được của con người sang các lệnh máy mà hệ điều hành của bạn có thể thực thi.
# 2 .Loại tệp .pyc

Đầu tiên chúng ta xem xét loại tệp .pyc. Các tệp thuộc loại .pyc được trình thông dịch tạo tự động khi bạn nhập một mô-đun, điều này giúp tăng tốc độ nhập mô-đun đó trong tương lai. Do đó, các tệp này chỉ được tạo từ tệp .py nếu nó được nhập bởi một tệp hoặc mô-đun .py khác.

Đây là một mô-đun Python ví dụ mà chúng ta muốn nhập. Mô-đun này tính toán các giai thừa.
```
# math_helpers.py

# a function that computes the nth factorial, e.g. factorial(2)
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)

# a main function that uses our factorial function defined above
def main():
    print("I am the factorial helper")
    print("you can call factorial(number) where number is any integer")
    print("for example, calling factorial(5) gives the result:")
    print(factorial(5))

# this runs when the script is called from the command line
if __name__ == '__main__':
    main()
    
```
Bây giờ, khi bạn chỉ chạy mô-đun này từ dòng lệnh, sử dụng python math_helpers.py, không có tệp .pyc nào được tạo.
Bây giờ chúng ta hãy nhập nó vào một mô-đun khác, như được hiển thị bên dưới. Chúng ta đang nhập hàm giai thừa từ tệp math_helpers.py và sử dụng nó để tính giai thừa của 6.
```
# computations.py

# import from the math_helpers module
from math_helpers import factorial

# a function that makes use of the imported function
def main():
    print("Python can compute things easily from the REPL")
    print("for example, just write : 4 * 5")
    print("and you get: 20.")
    print("Computing things is easier when you use helpers")
    print("Here we use the factorial helper to find the factorial of 6")
    print(factorial(6))

# this runs when the script is called from the command line
if __name__ == '__main__':
    main()
```
Chúng ta có thể chạy tập lệnh này bằng cách gọi python computations.py tại terminal. Chúng ta không chỉ nhận được kết quả của 6 giai thừa, tức là 720, mà chúng ta còn nhận thấy rằng trình thông dịch tự động tạo tệp math_helpers.pyc. Điều này xảy ra do mô-đun tính toán nhập mô-đun math_helpers. Để tăng tốc độ tải mô-đun đã nhập trong tương lai, trình thông dịch tạo tệp bytecode của mô-đun.

Khi tệp mã nguồn được cập nhật, tệp .pyc cũng được cập nhật. Điều này xảy ra bất cứ khi nào thời gian cập nhật cho mã nguồn khác với thời gian của tệp bytecode và đảm bảo rằng bytecode được cập nhật.

Lưu ý rằng việc sử dụng tệp .pyc chỉ tăng tốc độ tải chương trình của bạn chứ không phải việc thực thi nó thực sự. Điều này có nghĩa là bạn có thể cải thiện thời gian khởi động bằng cách viết chương trình chính của mình trong một mô-đun được nhập bởi một mô-đun khác nhỏ hơn. Tuy nhiên, để cải thiện hiệu suất một cách tổng quát hơn, bạn sẽ cần phải xem xét các kỹ thuật như tối ưu hóa thuật toán và phân tích thuật toán.

Vì các tệp .pyc độc lập với nền tảng, chúng có thể được chia sẻ trên các máy có kiến ​​trúc khác nhau. Tuy nhiên, nếu các nhà phát triển có thời gian đồng hồ khác nhau trên hệ thống của họ, việc kiểm tra tệp .pyc vào kiểm soát nguồn có thể tạo dấu thời gian hiệu quả trong tương lai cho việc đọc thời gian của người khác. Do đó, các bản cập nhật cho mã nguồn không còn kích hoạt các thay đổi trong mã bytecode. Đây có thể là một lỗi khó chịu để phát hiện. Cách tốt nhất để tránh nó là thêm tệp .pyc vào danh sách bỏ qua trong hệ thống kiểm soát phiên bản của bạn.

# 3 .Loại tệp .pyo

Loại tệp .pyo cũng được tạo bởi trình thông dịch khi một mô-đun được nhập. Tuy nhiên, tệp .pyo dẫn đến việc chạy trình thông dịch khi cài đặt tối ưu hóa được bật.

Trình tối ưu hóa được bật bằng cách thêm cờ "-O" khi chúng ta gọi trình thông dịch Python. Đây là một ví dụ mã để minh họa việc sử dụng tối ưu hóa. Đầu tiên, chúng ta có một mô-đun định nghĩa lambda. Trong Python, lambda giống như một hàm, nhưng được định nghĩa ngắn gọn hơn.

```
# lambdas.py

# a lambda that returns double whatever number we pass it
g = lambda x: x * 2
```

Nếu bạn nhớ từ ví dụ trước, chúng ta sẽ cần nhập mô-đun này để sử dụng nó. Trong danh sách mã sau, chúng ta nhập lambdas.py và sử dụng g lambda.
```
# using_lambdas.py

# import the lambdas module
import lambdas

# a main function in which we compute the double of 7
def main():
    print(lambdas.g(7))

# this executes when the module is invoked as a script at the command line
if __name__ == '__main__':
    main()
```

Bây giờ chúng ta đến phần quan trọng của ví dụ này. Thay vì gọi Python bình thường như trong ví dụ trước, chúng ta sẽ sử dụng tối ưu hóa ở đây. Việc bật trình tối ưu hóa sẽ tạo ra các tệp bytecode nhỏ hơn so với khi không sử dụng trình tối ưu hóa.
```
$ python -O using_lambdas.py

```
Chúng ta không chỉ nhận được kết quả chính xác của việc nhân đôi 7, tức là 14, như đầu ra tại dòng lệnh, mà chúng tôi còn thấy rằng một tệp bytecode mới được tạo tự động cho chúng ta. Tệp này dựa trên việc nhập lambdas.py trong lệnh gọi using_lambdas.py. Bởi vì chúng ta đã bật trình tối ưu hóa, một tệp bytecode .pyo được tạo. Trong trường hợp này, nó được đặt tên là lambdas.pyo.

Trình tối ưu hóa, không làm được nhiều việc, sẽ xóa các câu lệnh khẳng định khỏi mã bytecode của bạn. Kết quả sẽ không đáng chú ý trong hầu hết các trường hợp, nhưng có thể có lúc bạn cần.

Cũng lưu ý rằng, vì tệp bytecode .pyo được tạo, nó thay thế cho tệp .pyc lẽ ra đã được tạo mà không có tối ưu hóa. Khi tệp mã nguồn được cập nhật, tệp .pyo được cập nhật bất cứ khi nào thời gian cập nhật cho mã nguồn khác với thời gian cập nhật của tệp bytecode.

# 4 .  Loại tệp .pyd

Loại tệp .pyd, trái ngược với hai loại trước, là dành riêng cho nền tảng đối với lớp hệ điều hành Windows. Do đó, nó có thể thường gặp trên các phiên bản cá nhân và doanh nghiệp của Windows 10, 8, 7 và các phiên bản khác..

Trong hệ sinh thái Windows, tệp .pyd là tệp thư viện chứa mã Python có thể được gọi ra và sử dụng bởi các ứng dụng Python khác. Để cung cấp thư viện này cho các chương trình Python khác, nó được đóng gói dưới dạng thư viện liên kết động.

Tệp .pyd là một thư viện liên kết động có chứa mô-đun Python hoặc tập hợp các mô-đun, được gọi bằng mã Python khác. Để tạo tệp .pyd, bạn cần tạo một mô-đun có tên, ví dụ: example.pyd. Trong mô-đun này, bạn sẽ cần tạo một hàm có tên là PyInit_example (). Khi các chương trình gọi thư viện này, chúng cần gọi nhập foo và hàm PyInit_example () sẽ chạy.
# 5. Sự khác biệt giữa các loại tệp này
Mặc dù có một số điểm tương đồng giữa các loại tệp này, nhưng cũng có một số khác biệt lớn. Ví dụ: trong khi các tệp .pyc và .pyo giống nhau ở chỗ chúng chứa mã bytecode của Python, chúng khác nhau ở chỗ các tệp .pyo nhỏ gọn hơn nhờ các tối ưu hóa do trình thông dịch thực hiện. Loại tệp thứ ba, .pyd, khác với hai loại trước bởi là một thư viện được liên kết động để sử dụng trên hệ điều hành Windows. Hai loại tệp còn lại có thể được sử dụng trên bất kỳ hệ điều hành nào, không chỉ Windows
Nguồn: https://stackabuse.com/differences-between-pyc-pyd-and-pyo-python-files/