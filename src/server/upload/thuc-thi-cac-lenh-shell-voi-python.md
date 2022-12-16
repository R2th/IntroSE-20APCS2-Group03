Với nhiệm vụ lặp đi lặp lại đã hoàn thiện cho tự động hóa. Thông thường các developer và quản trị viên hệ thống sẽ tự động hóa các tác vụ thông thường như health checks và sao lưu tệp bằng các tập lệnh shell. Tuy nhiên, khi các tác vụ đó trở nên phức tạp hơn, các shell script có thể trở nên khó bảo trì hơn. 

May mắn thay, chúng ta có thể sử dụng Python thay vì shell script để tự động hóa. Python cung cấp các phương thức để chạy các lệnh shell, cung cấp cho chúng ta chức năng tương tự của các tập lệnh shell đó. Học cách chạy các lệnh shell trong Python mở ra cơ hội cho chúng ta tự động hóa các tác vụ máy tính theo cách có cấu trúc và có thể mở rộng. 
# 1. Sử dụng os.system để chạy lệnh
Python cho phép chúng ta thực thi ngay một lệnh shell được lưu trữ trong một chuỗi bằng hàm os.system (). Hãy bắt đầu bằng cách tạo một tệp python mới có tên echo_adelle.py 
```
import os

os.system("echo Hello from the other side!")
```
Trong Terminal của bạn, hãy chạy tệp này bằng cách sử dụng lệnh sau và bạn sẽ thấy đầu ra tương ứng:
```
$ python3 echo_adelle.py
Hello from the other side!
```

Khi các lệnh echo in ra, os.system () cũng hiển thị đầu ra trên luồng. Mặc dù không hiển thị trong console, lệnh os.system () trả về mã  của lệnh shell. Mã exit 0 có nghĩa là nó chạy mà không có bất kỳ vấn đề nào và bất kỳ số nào khác có nghĩa là lỗi. Để thấy rõ hơn mã exit , tạo  file cd_return_codes.py với nội dung:
```
home_dir = os.system("cd ~")
print("`cd ~` ran with exit code %d" % home_dir)
unknown_dir = os.system("cd doesnotexist")
print("`cd doesnotexis` ran with exit code %d" % unknown_dir)
```
chúng ta tạo hai biến lưu trữ kết quả của việc thực thi các lệnh thay đổi thư mục vào thư mục chính và thư mục không tồn tại. Chạy tệp này, chúng ta sẽ thấy:
```
$ python3 cd_return_codes.py
`cd ~` ran with exit code 0
sh: line 0: cd: doesnotexist: No such file or directory
`cd doesnotexist` ran with exit code 256
```
Với câu lệnh đầu, thay đổi thư mục thành thư muc home. os.system() trả về code 0 , với nơi lưu trữ là home_dir. Với cách khác, unknow_dir sẽ trả về mã code failed, với lệnh thay đổi đến thư mục không tồn tại. Os.system() thực thi 1 câu lệnh , in và cho ra kết quả đầu ra tại console, và trả về mã code của câu lệnh đó.
# 2. Sử dụng subprocess 
Module [subprocess](https://docs.python.org/3/library/subprocess.html) thực sự được khuyên dùng để thực thi các lệnh shell. 
Nó cho phép chúng ta linh hoạt để lược bớt đầu ra của các lệnh shell hoặc chuỗi đầu vào và đầu ra của các lệnh khác nhau cùng nhau, trong khi vẫn cung cấp trải nghiệm tương tự như os.system () cho các trường hợp sử dụng cơ bản. Tạo file list_subprocess.py với nội dung
```
import subprocess

list_files = subprocess.run(["ls", "-l"])
print("The exit code was: %d" % list_files.returncode)
```
Không giống os.system(), module subprocess.run() yêu cầu 1 list chuỗi các lệnh đầu vào thay vì 1 chuỗi string duy nhất , phần từ đầu tiên của list chính là tên lệnh thực thy , phần còn lại là biến số mà lệnh muốn thực hiện 

Ví dụ: muốn thực hiện lệnh ls -alh sẽ có list ["ls", "-alh"] với tên lênh là ls với các tham số -a -l -h, Tương tự , lệnh echo hello world sẽ thành ["echo", "hello", "world"]hoặc ["echo", "hello world"]
```
$ python3 list_subprocess.py
total 80
-rw-r--r--@ 1 stackabuse  staff    216 Dec  6 10:29 cd_return_codes.py
-rw-r--r--@ 1 stackabuse  staff     56 Dec  6 10:11 echo_adelle.py
-rw-r--r--@ 1 stackabuse  staff    116 Dec  6 11:20 list_subprocess.py
The exit code was: 0
```
bây giờ muốn chỉnh lại lệnh ls với đầu ra chỉnh lại 
```
list_files = subprocess.run(["ls", "-l"], stdout=subprocess.DEVNULL)
```

Đầu ra tiêu chuẩn của lệnh bây giờ chuyển sang  /dev/null, có nghĩa là đầu ra sẽ không xuất hiện trên bảng điều khiển nữa. Thực hiện tệp trong trình bao của bạn để xem đầu ra sau:
```
$ python3 list_subprocess.py
The exit code was: 0
```
Thêm điều kiện cho điều này bằng đối số đầu vào của nó, với file cat_subprocess.py,
```
import subprocess

useless_cat_call = subprocess.run(["cat"], stdout=subprocess.PIPE, text=True, input="Hello from the other side")
print(useless_cat_call.stdout)  # Hello from the other side
```
* stdout=subprocess.PIPE để Python chỉ ra đầu ra của lện là 1 object mà có thể đọc sau 
*  text=True trả về stdout và stderr dưới dạng chuỗi, mặc định trả về bytes
*  input="Hello from the other side" để Python thêm chuỗi vào  

Chúng ta cũ có thể raise Exception ngoài các trường hợp check trả về giá trị, tạo file false_subprocess.py
```
import subprocess

failed_command = subprocess.run(["false"], check=True)
print("The exit code was: %d" % failed_command.returncode)
```
```
$ python3 false_subprocess.py
Traceback (most recent call last):
  File "false_subprocess.py", line 4, in <module>
    failed_command = subprocess.run(["false"], check=True)
  File "/usr/local/python/3.7.5/Frameworks/Python.framework/Versions/3.7/lib/python3.7/subprocess.py", line 512, in run
    output=stdout, stderr=stderr)
subprocess.CalledProcessError: Command '['false']' returned non-zero exit status 1.
```
với check= True, exception xảy ra nếu có lỗi 

# 3. Chạy câu lệnh với Popen
subprocess.Popen cung cấp nhiều lựa chọn hơn cho developer khi muốn tương tác với shell. Tuy nhiên nó chúng ta cũng cần rõ ràng hơn về việc lấy kết quả và lỗi. Mặc định subprocess.Popen không tự dừng processing của 1 chương trình python nếu lệnh không có hàm kết thúc, tạo 1 file mới list_popen.py
```
import subprocess

list_dir = subprocess.Popen(["ls", "-l"])
list_dir.wait()
```
Code này tương đương với code của list_sub process.py. Nó chạy một lệnh bằng cách sử dụng subprocess.Popen và đợi nó hoàn thành trước khi thực thi phần còn lại của tập lệnh Python. 
Giả sử chúng ta không muốn đợi lệnh shell của mình hoàn thành thực thi để chương trình có thể hoạt động trên những thứ khác. Làm thế nào nó biết khi lệnh shell đã thực hiện xong? 
Phương thức poll () trả về code exit nếu một lệnh đã chạy xong hoặc Không có nếu nó vẫn đang thực thi. Ví dụ: nếu chúng tôi muốn kiểm tra xem list_dir đã hoàn thành thay vì chờ đợi, chúng ta sẽ có dòng mã sau:
```
list_dir.poll()
```
Để quản lý đầu ra , vào của subprocess.Popen, chúng ta cần sử dụng communicate()
```
import subprocess

useless_cat_call = subprocess.Popen(["cat"], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
output, errors = useless_cat_call.communicate(input="Hello from the other side!")
useless_cat_call.wait()
print(output)
print(errors)
```
Phương thức communicate() lấy tham số input để sử dụng cho đầu ra của shell, nó đồng thời cũng có đầu ra và hiện lỗi khi chúng ta khái báo 
# 4. So sánh
![](https://images.viblo.asia/71970f7b-10be-456b-bf98-23be1dafe629.png)
Nguồn : https://stackabuse.com/executing-shell-commands-with-python/