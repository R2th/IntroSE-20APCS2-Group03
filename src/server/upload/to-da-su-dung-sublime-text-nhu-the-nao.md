**Sublime text** là một trong những trình soạn thảo phổ biến nhất hiện nay với ưu thế về tốc độ, giao diện đơn giản, nhiều tính năng mạnh mẽ. Trong bài viết này tớ sẽ chia sẻ một số thủ thuật hữu ích dành cho **Web Developer**, bắt đầu nào !!!

# 1. Cài đặt
Các bạn có thể truy cập vào trang chủ của [Sublime text](https://www.sublimetext.com/3) để tải về máy rồi tiến hành cài đặt.
Đối với Ubuntu các bạn có thể cài đặt thông qua terminal với các câu lệnh lần lượt như sau:
```
sudo add-apt-repository ppa:webupd8team/sublime-text-3
sudo apt-get update
sudo apt-get install sublime-text-installer
```

### Package control
**Package control** giúp bạn có thể quản lý các package một cách dễ dàng. Cài đặt bằng cách nhấn tổ hợp phím `Ctrl + ~` hoặc chọn `View > Show Console` trên thanh menu, paste đoạn mã Python trong [link](https://packagecontrol.io/installation) vào console:

`import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)`

![](https://images.viblo.asia/d561570b-945c-4c59-b853-7dd941294334.png)
Sau khi hoàn tất, sử dụng nó bằng cách nhấn tổ hợp phím `Ctrl + Shift + P`, Yo....tiếp theo sẽ là những package tớ đang sử dụng :D

# 2. Những package cho Web Developer
```
1. Emmet.
2. Bracket HighLighter.
3. Color HighLighter.
4. Color Picker.
5. SidebarEnhancements.
6. Git.
7. AutoPrefixer.
8. DocBlockr.
9. CodeIntel.
10. AutoFileName.
11. Cập nhật thêm.
```
## 2.1 Emmet.
Package toẹt vời này giúp cho việc viết code của bạn trở nên rất nhanh chóng, chỉ việc gõ các lệnh tắt rồi nhấn `Tab`, các bạn có thể tham khảo cách gõ tắt ở [link](https://docs.emmet.io/cheat-sheet/) này.
![](https://images.viblo.asia/e7b32e97-9ab9-46ae-9e5e-a2378bee4aa3.png)
Tiện lợi chưa :heart_eyes:
## 2.2 Bracket Highlighter.
Đây là package giúp cho các bạn có thể dễ nhìn ra phần mở/ đóng của thẻ nằm ở chỗ nào.
![](https://images.viblo.asia/65943199-28c6-4c47-8677-6dccde11ab80.png)
## 2.3 Color Highlighter.
Package này giúp bạn code css hay hơn bằng cách hiển thị luôn màu sắc của mã màu, sinh động nhờ :hugs: .
![](https://images.viblo.asia/0ac22859-5943-464a-937f-2366afabfdc5.gif)
## 2.4 Color Picker.
Package này giúp cho chúng ta có thể lấy được mã màu mà không cần dùng đến photoshop, Để sử dụng chúng ta nhấn tổ hợp phím `Ctrl +shift +C`
![](https://images.viblo.asia/06ee2b44-dbd0-4a05-9d01-fecc2d2fc36b.png)
## 2.5 SidebarEnhancements.
Package này tạo ra các context menu với nhiều tiện ích tốt như open in browser......
![](https://images.viblo.asia/58fc6b3c-afaf-4ebc-9c96-9e876e63cf7d.png)
## 2.6 Git.
Packge này cho phép bạn thao tác với **Git** thông qua tổ hợp phím `Ctrl + Shift + P` sau đó gõ `Git` để hiện thị các lệnh.
![](https://images.viblo.asia/b06a51fc-530a-48c8-b4a8-553fe0f69a6a.png)
## 2.7 AutoPrefixer.
Package này thuận tiện cho các bạn làm `Front end`, nó giúp tạo ra các prefix cho các trình duyệt tương ứng.
![](https://images.viblo.asia/4c54909c-2f93-4726-a187-80d3bfac5cf8.gif)
## 2.8 DocBlockr.
Package này giúp bạn tạo ra các **comment** chuẩn.
![](https://images.viblo.asia/8f994bea-53a8-4865-8392-b6f3d53e8df2.gif)
## 2.9 CodeIntel.
package này giúp các bạn có thể dễ dàng tìm ra các function,class,.. đang sử dụng được viết từ đâu.
![](https://images.viblo.asia/76aeab8a-666e-4f18-be0d-e7c9f63787f4.gif)
## 2.10 AutoFileName.
Package này sẽ hiển thị ra tất cả các file có trong thư mục để các bạn có thể nhúng file đơn giản hơn.
![](https://images.viblo.asia/39709507-4549-4a3f-b005-cc4f7f25e71d.gif)
## 2.11 Cập nhật thêm.
Ngoài những package kể trên mình cũng sử dụng **Alignment** cho code thêm đẹp ... humm, ở Framgia thì cái này không được vì convention :v.

Riêng về PHP thì mình có sử dụng **SublimeLinter, SublimeLinter-php, SublimeLinter-phpcs, PHPSnippets**.

Laravel thì có các package này mình sử dụng **Laravel 5 Snippets, Laravel Blade Highlighter, LaravelCollective HTML Form Snippets** .

Theme mình sử dụng là **Predawn**, khá là đẹp, các bạn có thể install qua **Package Control**

# 3. Thủ thuật (nho nhỏ :v).
## 3.1 Goto Anything
Sử dụng `Ctrl + P` .
Bạn có thể nhanh chóng chuyển đến file bằng cách gõ tên file.
Chuyển đến method: thêm `@` trước tên method .
Chuyển đến dòng: thêm `:` trước số dòng .
Tìm kiếm từ trong file: Thêm `#` .

Các shortcut trên có thể kết hợp với nhau, chẳng hạn để chuyển đến dòng số 10 của file user.rb bạn có thể ấn `Ctrl + P` rồi gõ vào `user:10`.

## 3.2 Multiple Selections
Sublime Text cho phép bạn lựa chọn và sửa nhiều đoạn code cùng một lúc bằng cách giữ Ctrl và click chuột trái vào nhiều vị trí sử dụng `Ctrl + Click` hoặc `Ctrl + D`.

## 3.3 Distraction Free Mode
Nhằm giúp bạn tập trung và tối ưu hóa việc code, Sublime Text cung cấp cho bạn chế độ soạn thảo toàn màn hình, ấn `Shift + F11`

## 3.4 Split Editing
**Sublime** Cho phép bạn tạo nhiều nhiều cửa số song song bằng cách chọn trên thanh menu `View > Layout` hoặc tổ hợp phím `Alt + Shift + 2` với 2 là số cửa sổ bạn muốn hiển thị.
## 3.5 Hot key
* `Ctrl+ K + B`: ẩn/hiện side bar
* `Ctrl + /`: comment
* `Ctrl + Shift + /`: comment dạng block
* `Ctrl + K + U`: chuyển text sang dạng uppercase
* `Ctrl + K + L`: chuyển text sang dạng lowercase
* `Ctrl + L`: select 1 dòng
* `Ctrl + Shift + K`: xóa 1 dòng
* `Ctrl + ]`: indent
* `Ctrl + [`: bỏ indent
* `Ctrl + Shift + D`: nhân đôi dòng
* `Ctrl + J`: nối dòng với dòng tiếp theo
* `Ctrl + Shift + [`: đóng 1 đoạn code
* `Ctrl + Shift + ]`: mở 1 đoạn code
* `Ctrl + F`: tìm kiếm
* `Ctrl + H`: tìm kiếm và thay thế
* `Ctrl + Shift + N`: mở cửa sổ mới
* `Ctrl + N`: mở tab mới
* `Alt + <number>`: chuyển tab (ví dụ Alt + 3)

Ngoài ra các bạn có thể tham khảo cách sử dụng gõ tiếng việt **sublime text** trên hệ điều hành Ubuntu qua bài viết của anh [Nguyễn Huy Hùng](https://viblo.asia/p/ubuntu-os-go-tieng-viet-kieu-telex-voi-sublime-text-3-mrDkMrPXvzL)

# Kết
Trên đây là những package và một vài thủ thuật "nho nhỏ :v" mà mình giới thiệu tới các bạn, tải Sublime về và dùng thoi :grin: 

--Bài viết được tham khảo nguồn từ anh **Vũ Thanh Tài** và anh **Nguyễn Đức Tùng**