# Giới thiệu.
Ở những người dùng linux thì việc cài đặt một ứng dụng có rất nhiều cách khác nhau . Ví dụ như : Packages,software , cài đặt bằng file riêng của từng distros (.deb). Nhưng hôm nay, mình xin hướng dẫn cách chung nhất có thể sử dụng trên nhiều bản phân phối linux đó chính snap Packages . Tại sao mình lại giới thiệu cách này ? Packages snap được Cacnonical giới thiệu vào bản cập nhật Ubuntu 16.04 LTS .Nó được sinh ra với mục tiêu làm cho việc cài đặt trở nên dể dàng , an toàn và tiện lợi.Với hơn 600 ứng dụng có sẵn mình tin sẽ đáp ứng đủ phần nào cho đại đa số người dùng Linux.

# 1.Cài đặt snap.
Ở Ubuntu vì nó đã có sẵn trong Packages apt nên việc cài đặt rất đơn giản.
```
$ sudo apt update
$ sudo apt install snapd
```
Ở các bản phân phối khác các bạn có thể truy cập vào trang chủ của snapstore để xem.
https://snapcraft.io/snap-store

# 2.Tìm kiếm.
Việc đầu tiên bạn muốn cài đặt một ứng dụng nào đó bạn phải tìm kiếm hoặc kiểm tra xem nó có tồn tại trong kho ứng dụng không.Ở snap việc tìm kiếm khá nhanh và đơn giản.
```
snap find <search_text>
```

Ví dụ:
![](https://images.viblo.asia/4f5fcbcf-9157-4f51-8054-46b96e866a4a.png)
# 3.Cài đặt.
Sau khi đã biết nó có tồn tại thì đến phần ta mong muốn nhất đó chính là cài đặt phần mềm.Các bạn lưu ý như sau khi cài đặt nếu phần mềm bạn muốn cài đặt ở phần Notes không phải dấu '-' thì hãy thêm từ đó vào sau tên phần mềm bạn muốn cài đặt.
```
sudo snap install <package>
```

Ví dụ:
![](https://images.viblo.asia/08bbc0f8-e4d9-45aa-a35c-9a564fd95bd3.png)

# 4.Xem danh sách.
Để xem danh sách các ứng dụng đã tải.
```
snap list
```

![](https://images.viblo.asia/7e83760e-2f0e-4b12-bc02-dcf83455bbee.png)


# 5.Xóa.
Đã có nhu cầu tải một ứng thì đôi lúc bạn cũng phải có nhu cầu xóa một ứng dụng đi.Câu lênh xóa như sau:

```
sudo snap remove <package>`
```

Ví dụ:
![](https://images.viblo.asia/ace6b758-c2ca-42c2-8c44-40c52a126165.png)

# 6.Cập nhật
Ở snap việc cập nhật là tự động.Nhưng nếu muốn vẫn có thể cập nhật bằng tay.

```
sudo snap refresh --list
```

Nguồn tham khảo:

https://itsfoss.com/use-snap-packages-ubuntu-16-04/

https://quantrimang.com/so-sanh-flathub-va-snap-store-166089