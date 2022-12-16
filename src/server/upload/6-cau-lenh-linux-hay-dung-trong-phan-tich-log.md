Hôm nay mình chia sẻ cho mọi người 1 số câu lệnh linux mình hay dùng trong phân tích log trên server.

# 1. Các usecase hay dùng  
- Muốn điều tra nguyên nhân khi số lượng access đến server tăng dột biến
- Đã phát hiện trên server có lỗ hổng và muốn điều tra xem đã có ai xâm nhập vào hay chưa

# 2. Các câu lệnh linux hay dùng

| Command line  |  Giải thích  |
| ---- | ---- |
|  grep  |  Tìm các dòng chứa chuỗi được chỉ định |
|  awk  |  Phân tách cột và tìm kiếm hàng có điều kiện |
| sort | Sắp xếp dòng |
| uniq | Loại bỏ các hàng trùng lặp và đếm |
| wc | Đếm số ký tự, số dòng |
| sed | Thay thế điều kiện quy định |

# 3. Đối tượng phân tích

```
# access_log

203.0.113.1 - - [03/May/2020:12:00:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
203.0.113.1 - - [03/May/2020:12:10:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
203.0.113.2 - - [03/May/2020:12:20:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 6.3; Win64; x64)"
203.0.113.2 - - [03/May/2020:12:30:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 6.3; Win64; x64)"
203.0.113.2 - - [03/May/2020:12:40:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 6.3; Win64; x64)"
198.51.100.3 - - [03/May/2020:12:50:00 +0900] "GET /index.cgi?page=<Script>alert('Evil')</Script> HTTP/1.1" 200 3000 "-" "Evil User Agent"
198.51.100.3 - - [03/May/2020:13:00:00 +0900] "GET /../../../../../etc/shadow HTTP/1.1" 200 3000 "-" "Evil User Agent"
```

Trong đó:  
- 203.0.113.0/24 là địa chỉ ip đúng từ người dùng
- 198.51.100.0/24 là địa chỉ ip từ nguồn đáng ngờ

# 4. Áp dụng

## 4.1. Tìm kiếm đặc biệt (grep)

### ・Điều tra cuộc tấn công vào thư mục

```
$ grep -n "\.\." access_log
7:198.51.100.3 - - [03/May/2020:13:00:00 +0900] "GET /../../../../../etc/shadow HTTP/1.1" 200 3000 "-" "Evil User Agent"
```

### ・Điều tra chèn script đáng ngờ

```
$ grep -i "<script>" --color access_log
198.51.100.3 - - [03/May/2020:12:50:00 +0900] "GET /index.cgi?page=<Script>alert('Evil')</Script> HTTP/1.1" 200 3000 "-" "Evil User Agent"
```

### ・Điều tra chèn thẻ tag html đáng ngờ

```
$ grep -E "<[^>]+>[^<]+<[^>]+>" -o access_log
<Script>alert('Evil')</Script>
```

Giải thích về option trong grep:

| option | Giải thích |
| ---- | ---- |
| -n | Hiển thị số dòng của dòng match | 
| -i | Không phân biệt chữ hoa và chữ thường | 
| --color | Hiển thị màu đối với từ đã match| 
| -o | Hiển thị phần đã match| 
| -E | Sử dụng biểu thức regex |  

## 4.2. Loại bỏ log không cần thiết

### ・Loại bỏ log từ nguồn chuẩn

```
$ grep -v "203.0.113." access_log
198.51.100.3 - - [03/May/2020:12:50:00 +0900] "GET /index.cgi?page=<Script>alert('Evil')</Script> HTTP/1.1" 200 3000 "-" "Evil User Agent"
198.51.100.3 - - [03/May/2020:13:00:00 +0900] "GET /../../../../../etc/shadow HTTP/1.1" 200 3000 "-" "Evil User Agent"
```

Giải thích về option trong grep:

| option | Giải thích |
| ---- | ---- |
| -v | Không hiển thị dòng match | 

## 4.3. Trích xuất phần tử(awk)

### ・Trích xuất ra địa chỉ ip client

```
$ awk '{print $1}' access_log 
203.0.113.1
203.0.113.1
203.0.113.2
203.0.113.2
203.0.113.2
198.51.100.3
198.51.100.3
```

### ・Trích xuất ra User Agent của client

```
$ awk -F[\"] '{print $6}' access_log 
Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Mozilla/5.0 (Windows NT 6.3; Win64; x64)
Mozilla/5.0 (Windows NT 6.3; Win64; x64)
Mozilla/5.0 (Windows NT 6.3; Win64; x64)
Evil User Agent
Evil User Agent
```

Giải thích về option trong awk:

| option | Giải thích |
| ---- | ---- |
| {print $1} | Hiển thị ra cột đầu tiên được phân tách bằng dấu phân cách | 
| -F | Chỉ định dấu phân cách (mặc định là khoảng trắng) | 

## 4.4. Thống kê và sắp xếp (sort/uniq/wc)

### ・Hiển thị ra số lượng của mỗi địa chỉ ip client

```
$ awk '{print $1}' access_log | sort | uniq -c | sort -rn
      3 203.0.113.2
      2 203.0.113.1
      2 198.51.100.3
```

### ・Tổng số lượng của địa chỉ duy nhất ip client

```
$ awk '{print $1}' access_log | sort | uniq | wc -l
3
```

Giải thích:

| command line, option | Giải thích |
| ---- | ---- |
| uniq -c | Hiển thị số trùng lặp (yêu cầu sắp xếp để so sánh trước và sau) | 
| sort -n	 | Sắp xếp các trường số theo giá trị số học | 
| sort -r	 | Sắp xếp theo thứ tự giảm dần (mặc định là thứ tự tăng dần) | 
| wc -l	 | Hiển thị ra số dòng | 

## 4.5. Thay thế (sed)

### ・Ẩn danh địa chỉ IP nguồn để truy cập bình thường

```
$ sed "s/203\.0\.113\.[0-9]\{1\,3\}/xxx.xxx.xxx.xxx/g" access_log
xxx.xxx.xxx.xxx - - [03/May/2020:12:00:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
xxx.xxx.xxx.xxx - - [03/May/2020:12:10:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
xxx.xxx.xxx.xxx - - [03/May/2020:12:20:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 6.3; Win64; x64)"
xxx.xxx.xxx.xxx - - [03/May/2020:12:30:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 6.3; Win64; x64)"
xxx.xxx.xxx.xxx - - [03/May/2020:12:40:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 6.3; Win64; x64)"
198.51.100.3 - - [03/May/2020:12:50:00 +0900] "GET /index.cgi?page=<Script>alert('Evil')</Script> HTTP/1.1" 200 3000 "-" "Evil User Agent"
198.51.100.3 - - [03/May/2020:13:00:00 +0900] "GET /../../../../../etc/shadow HTTP/1.1" 200 3000 "-" "Evil User Agent"
```

Giải thích:

| option | Giải thích |
| ---- | ---- |
| s/string A/string B/g | Thay chuỗi A bằng chuỗi B. Thay thế tất cả bằng cách thêm g. | 

# Kết luận

Nếu sử dụng 6 câu lệnh mình bảo bên trên thì chúng ta có thể phân tích log 1 cách dễ dàng.

Hơn nữa, thông thường hay sử dụng kí tự pipe line | để phân tích log 1 cách hiệu quả hơn.

Ví dụ:  
```
$ grep -v "203.0.113." access_log | awk '{print $1}' | sort | uniq -c | sort -rn
      2 198.51.100.3
```

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

→→→ [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)