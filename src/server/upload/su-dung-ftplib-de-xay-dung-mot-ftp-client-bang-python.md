**FTP protocol**: Một giao thức khá phổ biến (trước năm 2010), được nhiều lập trình viên ưa thích sử dụng cho việc lưu trữ file để chia sẻ giữa các hệ thống. 

Hiện tại có vẻ như đã lỗi thời nhưng đâu đó vẫn còn những thế thống "già" vẫn sử dụng và "biết đâu bất ngờ", một ngày nào đó chúng ta sẽ phải làm việc với nó. 

Tôi đã từng gặp một case như vậy, hệ thống của khách hàng là Windows Server, phương án share file hiện tại của họ là sử dụng FTP Server. 

Nhiệm vụ của tôi là truy nhập vào server của khách hàng, di chuyển đến đúng thư mục mà họ đã chỉ định từ trước, tìm kiếm xem có file nào mới được tạo (do khách hàng đẩy vào), download file đó về. Tiến hành xử lý sau đó lại truy nhập vào ftp server và upload file sau xử lý lên một thư mục mà họ chỉ định sẵn, đôi khi cần tạo mới một thư mục để thực hiện. 

Tôi đã giải quyết bài toán trên bằng cách sử dụng thư viện ftplib của python. Mời các bạn xem listing code từng phần của tôi dưới đây. 


# Dựng một ftp server 
 Để tiếp tục với bài viết, nếu các bạn muốn thực hiện demo theo code của tôi, các bạn có thể tự khởi tạo cho mình một ftp-server theo các hướng dẫn. 


Để xây dựng một FTP Server, trên Windows rất dễ, sử dụng FileZilla Server: 
https://quantrimang.com/huong-dan-thiet-lap-ftp-server-ca-nhan-bang-filezilla-84531

Với Ubuntu, cần thực  hiện theo hướng dẫn (nhớ chọn Authenticated):
https://ubuntu.com/server/docs/service-ftp


**Đặc điểm**
FTP Server: 
- Lưu trữ file
- Quản lý user/password
- Phân quyền truy nhập
- Cung cấp kết nối qua một cổng bất kỳ (default: 21):
    + Kết nối nặc danh.
    + Kết nối định danh: user/password.
    
FTP Client: 
- Chương trình trên máy người dùng, sử dụng để kết nối đến FTP Server


# Xây dựng FTP-CLIENT bằng thư viện ftplib

Trong Python, muốn kết nối FTP, sử dụng thư viện ftplib, đây là thư viện mặc định trong hệ thống (có sau khi cài đặt python) nên không cần cài thêm.

## Khởi tạo kết nối

```Python
from ftplib import FTP

ftp_ip = "your-host-ip"
ftp_usr = "your-username"
ftp_pwd = "your-password"


ftp_client = FTP(ftp_ip)
ftp_client.login(user=ftp_usr, passwd = ftp_pwd)

```

Sau khi login thành công, dữ liệu trả về:


>'230 Logged on'


### Xem thông số của ftp-server

```python
ftp_client.welcome
```

>'220-FileZilla Server 0.9.60 beta\n220-written by Tim Kosse (tim.kosse@filezilla-project.org)\n220 Please visit https://filezilla-project.org/'


## Các câu lệnh liên quan đến thư mục/file.

### Hiển thị thư mục hiện tại

```python

ftp_client.pwd()
```

>'/'

Tùy vào cấu hình & phân quyền của server theo mỗi user đăng nhập, mặc định là vào thư mục gốc của ftp-server, có user sau khi đăng nhập sẽ được chỉ định vào một thư mục sâu bên trong và không có quyền được dịch chuyển ra các thư mục bên ngoài. 


### Liệt kê các thư mục/file trong thư mục kết nối đến
```python
print(ftp_client.retrlines('LIST'))
```

>     -rw-r--r-- 1 ftp ftp          11234 May 09 21:39 Doc1.docx
>     drwxr-xr-x 1 ftp ftp              0 May 09 23:21 Folder1
>     drwxr-xr-x 1 ftp ftp              0 May 09 21:26 Folder2
>     -rw-r--r-- 1 ftp ftp           1085 May 09 21:49 sample.ipynb
>     226 Successfully transferred "/"
    
 
### Di chuyển đến thư mục khác từ thư mục cha:


```python
ftp_client.cwd("Folder1")
```

>     '250 CWD successful. "/Folder1" is current directory.'

Lưu ý: Chỉ lên di chuyển đến 1 cấp thư mục con 

### Di chuyển về thư mục trước đó.

```python

ftp_client.cwd("..")
```

> '200 CDUP successful. "/" is current directory.'


### Tạo thư mục mới

```python

ftp_client.mkd("NewFolder")

```

>     '/NewFolder'


### Xóa thư mục 

```python

ftp_client.rmd("NewFolder")
```

>     '250 Directory deleted successfully'
   


## Lệnh liên quan đến file.

### Kiểm tra dung lượng file 
```python
ftp_client.size("Doc1.docx")
```

>     11234

Đơn vị tính dung lượng ở đây là Byte

### Xóa file
```python

ftp_client.delete("Doc1.docx")
print(ftp_client.retrlines('LIST'))
```

>     drwxr-xr-x 1 ftp ftp              0 May 09 23:21 Folder1
>     drwxr-xr-x 1 ftp ftp              0 May 09 21:26 Folder2
>     -rw-r--r-- 1 ftp ftp           1085 May 09 21:49 sample.ipynb
>     226 Successfully transferred "/"
    

## Upload file.

- Điều kiện file upload lên từ client phải ở cùng hoặc sâu hơn vị trí đặt file chạy ftp-client (file code .python) hoặc phải trỏ được đường dẫn chính xác đến vị trí file.
- Muốn upload đến thư mục nào đó thì thực hiện kết nối đến thư mục đó trên server.


```python
from ftplib import FTP
ftp_client = FTP(ftp_ip)
ftp_client.login(user=ftp_usr, passwd = ftp_pwd)

# di chuyển đến thư mục Folder1
ftp_client.cwd("Folder1")
print("before upload\n", ftp_client.retrlines("LIST"))

# read file to send to byte
file_stream = open("sample_9_5.ipynb","rb") 

# send the file       
ftp_client.storbinary("{CMD} {FileName}".
               format(CMD="STOR",FileName="sample_9_5.ipynb"),
               file_stream)     
file_stream.close()                     
print("after upload\n", ftp_client.retrlines("LIST"))
ftp_client.close
```


>     drwxr-xr-x 1 ftp ftp              0 May 09 21:31 Folder3
>     -rw-r--r-- 1 ftp ftp           6174 May 09 21:32 New t.xlsx
>     -rw-r--r-- 1 ftp ftp           1085 May 09 21:50 sample.ipynb
>     before upload
>      226 Successfully transferred "/Folder1"
>     drwxr-xr-x 1 ftp ftp              0 May 09 21:31 Folder3
>     -rw-r--r-- 1 ftp ftp           6174 May 09 21:32 New t.xlsx
>     -rw-r--r-- 1 ftp ftp           1085 May 09 21:50 sample.ipynb
>     -rw-r--r-- 1 ftp ftp           1085 May 10 18:59 sample_9_5.ipynb
>     after upload
>      226 Successfully transferred "/Folder1"
    

## Download file
- Muốn download về đâu, thực hiện khởi chạy file chương trình tại vị trí đấy.
- Kết nối vào FTP server và thực hiện download


```python
from ftplib import FTP

ftp_client = FTP(ftp_ip)
ftp_client.login(user=ftp_usr, passwd = ftp_pwd)

ftp_client.cwd("Folder1")
print("before upload\n", ftp_client.retrlines("LIST"))
file_path = "New t.xlsx"
file_name = "New t.xlsx"
file_stream = open(file_path,"wb")         # read file to send to byte
ftp_client.retrbinary('RETR {}'.format(file_name),
               file_stream.write, 1024)
file_stream.close()                     
print("Download OK")
ftp_client.close
```


>     drwxr-xr-x 1 ftp ftp              0 May 09 21:31 Folder3
>     -rw-r--r-- 1 ftp ftp           6174 May 09 21:32 New t.xlsx
>     -rw-r--r-- 1 ftp ftp           1085 May 09 21:50 sample.ipynb
>     -rw-r--r-- 1 ftp ftp           1085 May 10 18:59 sample_9_5.ipynb
>     before upload
>      226 Successfully transferred "/Folder1"
>     Download OK
    


## Đóng kết nối.
Thực hiện đóng kết nối mỗi khi đã thực hiện download/upload xong.

```python
ftp_client.close
```

><bound method ftp_client.close of <ftplib.FTP object at 0x000001F61AFE65F8>>


---
Ngoài các câu lệnh cơ bản trên, các bạn có thể tham khảo thêm các câu lệnh khác của ftplib từ đường dẫn sau: https://docs.python.org/3/library/ftplib.html