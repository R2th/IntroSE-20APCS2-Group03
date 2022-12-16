> Trong bài này mình sẽ giới thiệu mọi người cách cài đặt và chạy trên Windows mà ko cần cài máy ảo, Linux hay trên Ubuntu.

> Cách cài đặt Ruby on Rails Windows 10/11. Với rất nhiều ngôn ngữ lập trình trong môi trường CNTT của chúng ta, Ruby là một trong những ngôn ngữ đó. Nó khá mạnh mẽ và được sử dụng cho nhiều tác vụ động nhưng chủ yếu là phát triển ứng dụng web. Ngoài ra có rất nhiều phần mềm nổi tiếng được xây dựng bằng ngôn ngữ này. Do đó, hôm nay chúng ta sẽ học cách cài đặt Ruby trên Windows 11. Trong bài này chúng ta sẽ thiết lập môi trường phát triển Ruby on Rails trên Windows 10/11.

# Cài đặt Ruby on Rails trên Windows 10/11


## 1. Cài đặt Git
Trước khi bắt đầu, bạn sẽ cần cài đặt gói phần mềm Git trên hệ thống của mình.  <br>
Bạn có thể tải xuống từ trang tải xuống Git.
https://git-scm.com/download/win

## 2. Cài đặt Ruby trên Windows

Đầu tiên, hãy truy cập trang web trình cài đặt Ruby và tải xuống phiên bản Ruby mới nhất cho hệ thống của bạn.
https://rubyinstaller.org/downloads/

Sau khi nhấn **Finish** cài xong ruby, cửa sổ như hình dưới hiện lên :  

![](https://images.viblo.asia/d64d0e43-19d0-46af-9e26-d7bde363fa53.png)

Nhấn **Enter** để kết thúc quá trình cài đặt.

## 3. Khởi chạy Ruby Shell
Mở terminal : kích chuột phải vào trang chủ màn hình, nhấn **Terminal**. 
Kiểm tra phiên bản Ruby đã cài bằng lệnh
```
ruby -v
```
Sẽ hiện như hình dưới đây: 

![](https://images.viblo.asia/64009444-4e85-40fa-8791-0172f1a4644d.PNG)

<br>
 Xác minh cài đặt Gem và liệt kê tất cả các Gem đã cài đặt, chạy lệnh sau:
 
```
gem -v
gem list
```
<br>
Muốn cập nhập Gem , ta dùng: 

```
gem update - - system
```

Bạn sẽ thấy trang sau: 
![](https://images.viblo.asia/2fae5952-3395-43b8-a935-1ca884740367.PNG)

<br>
Nếu muốn cập nhập Gem Ruby, ta chạy lệnh sau: 

```
gem update - - system
```

## 4. Cài đặt Rails trên Windows thông qua lệnh Gem

Rails là một trong những Gem Ruby và bạn có thể cài đặt nó bằng cách sử dụng lệnh gem như hình dưới đây:

```
gem install rails
```

Sau khi Rails được cài đặt, các bạn sẽ thấy trang sau:
![](https://images.viblo.asia/98ca8f47-4757-4e5c-97a8-4db87f42d259.PNG)

<br>
Các ứng dụng Rails không thể hoạt động nếu không có cơ sở dữ liệu. Rails hỗ trợ MySQL hoặc cơ sở dữ liệu SQLite. SQLite3 là cơ sở dữ liệu Rails mặc định và nó có thể được cài đặt bằng lệnh sau:

```
gem install sqlite3
```

![](https://images.viblo.asia/5ac21960-c019-41da-98a3-7c5b944ca46c.PNG)


## 5. Tạo một ứng dụng Rails
Sau khi cài đặt Ruby and Rails, chúng ta sẽ tạo mộtứng dụng Railsđơn giản để kiểm tra việc cài đặt Ruby on Rails. Hãy tạo một ứng dụng đơn giản có tên ứng dụng bằng lệnh sau:

```
rails new app
```

Bạn sẽ nhận được một số lỗi liên quan đến dữ liệu tzinfo. Để khắc phục lỗi này, hãy mở Gemfile nằm bên trong thư mục ứng dụng bằng trình chỉnh sửa NotePad.

- Tìm dòng sau:
```
gem 'tzinfo-data', platforms: [:x64_mingw, :mingw, :mswin]
```

- Và, thay thế nó bằng dòng sau:
```
gem 'tzinfo-data', '~> 1.2021', '>= 1.2021.5'
```

- Lưu và đóng tệp sau đó mở Ruby shell .

 <br>

 Thay đổi thư mục thành thư mục ứng dụng của bạn:
```
cd app
```

Tiếp theo, cập nhật tất cả các Gem bằng lệnh sau:
```
bundle update
```

Bây giờ, start ứng dụng Rails sử dụng lệnh sau:
```
rails server
```

Khi ứng dụng được khởi động, bạn sẽ nhận được màn hình sau:
![](https://images.viblo.asia/6ccc22a8-a017-4d58-a4fe-940ff82cb6a3.PNG)

Nhấn Ctrl+nhấn chuột vào địa chỉ như ảnh phía trên:   http://127.0.0.1:3000
bạn sẽ thấy trang ứng dụng Rails trên màn hình sau:

![](https://images.viblo.asia/ec0cb345-7112-403f-8a29-5c86f4d9df59.PNG)

Bạn có thể bắt đầu phát triển ứng dụng Rails của riêng mình ngay bây giờ

***~~Lời kết: ~~*** <br>
- Ruby là một ngôn ngữ lập trình và môi trường phát triển cho các ứng dụng Web, phân tích dữ liệu và lập trình chung.Trong bài đăng này, chúng ta đã học cách cài đặt Ruby on Rails trên máy Windows và học cách tạo một ứng dụng Rails đơn giản. 
- Sau nhiều ngày lập trình trên Windows, mình khuyến khích các bạn nên dùng trên Linux,Ubuntu và Mac CentOS. Vì sao ư, vì rất ít các tài liệu học Rails trên Windows, nếu có lỗi ta cũng phải tìm hiểu rất lâu mới sửa được, và các thư viện trên Win cũng không đầy đủ để fix lỗi.


<br>
Tham khảo:

*  [how-to-install-ruby-on-rails-windows-10-11](https://cloudinfrastructureservices.co.uk/how-to-install-ruby-on-rails-windows-10-11/)

<br>