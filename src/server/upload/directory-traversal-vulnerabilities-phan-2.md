## III. Vì sao lỗ hổng Directory traversal xuất hiện?

Với mỗi ngôn ngữ lập trình khác nhau, điểm xuất hiện các lỗ hổng Directory traversal cũng khác nhau. Lỗ hổng thường xuất hiện khi chương trình sử dụng một số hàm đọc file đồng thời tin tưởng tuyệt đối vào các input từ người dùng (không thực hiện filter các giá trị đầu vào từ phía người dùng). Ở bài viết này tôi sẽ giới thiệu nguyên nhân xuất hiện lỗ hổng này trong một số ngôn ngữ lập trình tiêu biểu, việc "đào" sâu hơn mong bạn đọc tự tìm hiểu thêm.

### 1. Lỗ hổng Directory traversal trong ngôn ngữ PHP

Đại đa phần các lỗ hổng Directory traversal thường xuất hiện ở các ứng dụng web sử dụng ngôn ngữ lập trình **PHP**, một phần vì ngôn ngữ **PHP** được nhiều lập trình viên ưa chuộng nhưng còn hạn chế về kiến thức bảo mật thông tin, còn phần nguyên nhân chính xuất phát từ một số lượng lớn các hàm đọc file, hiển thị file trong **PHP** như: **include(), include_once(), require(), require_once(), file_get_contents(), file(), fopen(), ...** Chúng ta sẽ phân tích kỹ hơn trong các bài lab.

### 2. Lỗ hổng Directory traversal trong ngôn ngữ Python

Trong các ứng dụng web phát triển dựa trên ngôn ngữ lập trình **Python** cũng có thể xảy ra lổ hổng Directory traversal. Ở đây tôi lấy ví dụ với hàm `open()`.

Xét đoạn code **Python** sau:

```py=
from flask import *
app = Flask(__name__)

@app.route('/')
def index():
    return 'This is a directory traversal vulnerability testing with python language'

@app.route('/files', methods = ['GET'])
def read_file():
    file = request.args.get('file')
    f = open(file, 'r')
    return f.read()

if __name__ == "__main__":
    app.run(port = 1111, host = "127.0.0.1", debug = True)
```

Đoạn code trên sử dụng framework **Flask** (các bạn tự tìm hiểu thêm về framework này tại [Framework Flask in Python](https://pythonbasics.org/what-is-flask-python/#:~:text=Flask%20is%20a%20web%20framework,like%20url%20routing%2C%20template%20engine.)). 

Chạy tệp `main.py`:

![](https://i.imgur.com/D899GR4.png)

Sau đó, truy cập `http://127.0.0.1:1111` kiểm tra đã dựng thành công hay chưa:

![](https://i.imgur.com/P6LeWEX.png)

Khi truy cập tới thư mục `/files` và truyền lên hệ thống tham số `file`, đoạn code sử dụng hàm `open()` mở tệp tin người dùng yêu cầu và trả về nội dung tệp tin trên giao diện:

![](https://i.imgur.com/e57EbuL.png)

Chúng ta có thể thấy hệ thống không thực hiện filter giá trị đầu vào, do đó ở đây xuất hiện lỗ hổng Directory traversal - người dùng có thể đọc tệp tin tùy ý. Thật vậy, chúng ta có thể kiểm tra bằng cách đọc nội dung tệp `/etc/passwd`:

![](https://i.imgur.com/KL4sJml.png)

### 3. Lỗ hổng Directory traversal trong ngôn ngữ Java

Ngoài lớp `FileInputStream` thực hiện chức năng đọc file, một số framework trong **Java** cũng cho phép giao thức (protocol) `://` hoạt động. Đây là những điểm thường xuyên xuất hiện các lỗ hổng Directory traversal. Bạn đọc có thể tham khảo thêm với **[Spring Cloud Config Server Directory Traversal CVE-2019-3799](https://github.com/mpgn/CVE-2019-3799)**, **[Jenkins Arbitrary Directory Traversal CVE-2018-1999002](https://github.com/imelven/research/blob/master/CVE-2018-1999002_jenkins_arbitrary_file_read.md)**.

### 4. Lỗ hổng Directory traversal trong ngôn ngữ Ruby

Lỗ hổng Directory traversal trong ngôn ngữ **Ruby** thường xảy ra với framework **[Rails](https://rubyonrails.org/)**. Một số tài liệu tham khảo thêm: **[Ruby on Rails Directory traversal CVE-2018-3760](https://github.com/mpgn/CVE-2018-3760)**, **[Ruby on Rails Directory traversal CVE-2019-5418](https://github.com/mpgn/CVE-2019-5418)**.

### 5. Lỗ hổng Directory traversal trong ngôn ngữ Node.js

Với Node.js, lỗ hổng Directory traversal đã từng xuất hiện trong framework **[Express](https://expressjs.com/)**, bạn đọc có thể tham khảo thêm tại **[Node.js on Express Directory traversal CVE-2017-14849](https://github.com/advisories/GHSA-c5w2-4jcq-rvf5)**.

## IV. Một số tệp mục tiêu trong lỗ hổng Directory traversal

Các thư mục dưới `/etc` chứa rất nhiều các file cấu hình server cũng như hệ thống. Khi một ứng dụng web xảy ra lổ hổng Directory traversal, các thư mục hoặc tệp tin dưới thư mục `/etc` sẽ là một trong những mục tiêu đầu tiên chúng ta nhắm tới. Ở đây tôi chỉ giới thiệu một số tệp tin tiêu biểu.

### 1. Tệp tin /etc/passwd

Các hệ điều hành phát triển hướng theo hướng Module như Unix đều có tính chất đa người dùng. Và để tạo điều kiện quản lý người dùng thích hợp, hệ thống thực hiện lưu trữ thông tin người dùng trong tệp tin `/etc/passwd` (tên đường dẫn này không thay đổi).

![](https://i.imgur.com/AOi3NFe.png)

`/etc/passwd` là một file cấu hình chứa thông tin chi tiết các người dùng, gồm các trường username, password (kí hiệu bởi dấu **x**), user ID, group ID, GECOS, Home directory, shell. Chi tiết từng trường tôi sẽ không nói kỹ trong bài viết này. Các bạn có thể tìm hiểu thêm qua Google.

![](https://i.imgur.com/BemLwSl.png)

Chúng ta thường sử dụng file `/etc/passwd` để kiểm tra sự tồn tại của lỗ hổng Directory traversal.

### 2. Các tệp tin /etc/apache2/*

`/etc/apache2/*` là các tệp cấu hình **[Apache](https://ubuntu.com/server/docs/web-servers-apache)**, từ các tệp này chúng ta có thể tìm kiếm các thông tin như web index, các cổng (port) của server.

![](https://i.imgur.com/ppAqHjV.png)

### 3. Các tệp tin /etc/nginx/*

![](https://i.imgur.com/Y2PtBVQ.png)

Giống với `/etc/apache2/*`, `/etc/nginx/*` là các tệp cấu hình **[Nginx](https://viblo.asia/p/tim-hieu-tong-quan-ve-nginx-63vKjOExZ2R)**, từ các tệp này chúng ta có thể tìm kiếm các thông tin như mục lục web, các cổng (port) của server.

### 4. Tệp tin /etc/environment

![](https://i.imgur.com/y5Fi8OZ.png)

`/etc/environment` là một trong những tệp chứa giá trị các biến môi trường. Khi chúng ta có được giá trị các biến môi trường có thể mang tới lượng lớn thông tin hữu ích, chẳng hạn như giá trị biến **SECRET_KEY**.

### 5. Các tệp tin trong hệ điều hành khác

Đối với server hoạt động trên hệ điều hành Windows, chúng ta có thể kiểm tra các tệp `C:/Users/Administrator/NTUser.dat`, `C:/boot.ini`, ...

## Các tài liệu tham khảo

- [https://portswigger.net/web-security/file-path-traversal](https://portswigger.net/web-security/file-path-traversal)
- [https://github.com/digininja/DVWA](https://github.com/digininja/DVWA)