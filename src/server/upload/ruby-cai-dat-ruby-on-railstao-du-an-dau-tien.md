## Cài Đặt

Để có thể sử dụng Ruby on Rails thì cần cài đặt trên máy tính các phần mềm sau:

* Ruby: Ngôn ngữ lập trình sử dụng bởi Ruby on Rails.
* RubyGems: Chương trình quản lý thư viện Ruby (còn được gọi là gem) trên máy tính (hoặc máy chủ).
* Ruby on Rails: Khác với một số framework khác, Ruby on Rails framework được sử dụng như một phần mềm và do đó bạn cần cài đặt Rails trên máy tính (hoặc máy chủ). Thực chất Ruby on Rails cũng là một gem và chúng ta có thể cài đặt Rails sử dụng RubyGems như bạn sẽ thấy ở phần dưới đây.
* SQLite3: Phần mềm quản trị cơ sở dữ liệu dùng trong ứng dụng. Rails có thể sử dụng với nhiều chương trình quản trị cơ sở dữ liệu khác nhau, tuy nhiên để băt đầu tìm hiểu thì mình sử dụng SQLite.

### Cài Đặt Ruby
Ruby là ngôn ngữ đa nền tảng và có thể được cài đặt trên các hệ điều hành phổ biến như Windows, Mac OS và bản phân phối của Linux (bao gồm Ubuntu, Linux Mint...).

**Windows**
Để cài đặt Ruby trên Windows chúng ta sử dụng phần mềm Ruby Installer. Bạn có thể tải Ruby Installer từ trang [rubyinstaller.org](https://rubyinstaller.org/).
Sau khi tải về bạn chỉ cần nhấp đúp vào tập tin cài đặt để bắt đầu tiến trình cài đặt như một phần mềm thông thường.

**Mac OS**
Với các máy tính sử dụng hệ điều hành OS X thì Ruby đã được cài đặt sẵn trên máy. Trường hợp bạn không muốn sử dụng phiên bản Ruby có sẵn và muốn cài phiên bản khác của Ruby thì bạn sử dụng chương trình quản lý phần mềm HomeBrew (hay Brew).
Tuy nhiên, HomeBrew không được cài sẵn trên máy Mac mà bạn cần phải tự tay cài nó. Việc cài HomeBrew khá đơn giản là sử dụng một câu lệnh duy nhất trên cửa sổ dòng lệnh terminal như sau:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Nếu gặp phải lỗi khi chạy câu lệnh trên thì bạn có thể lên trang[ brew.sh](https://brew.sh/) để lấy về câu lệnh cập nhật.

Sau khi cài xong Brew bạn có thể cập nhật Ruby sử dụng câu lệnh sau:
```
$ brew install ruby
```

**Linux**
Tuỳ vào hệ điều hành Linux mà chúng ta sẽ chạy các câu lệnh khác nhau để cài đặt Ruby.

Với các hệ điều hành sử dụng apt-get làm chương trình quản lý phần mềm (như Ubuntu) chúng ta sẽ sử dụng câu lệnh sau trên cửa sổ dòng lệnh terminal để cài đặt Ruby:
```
$ sudo apt-get install ruby-full
```
Với các hệ điều hành sử dụng yum (như CentOS, Fedora hay RHEL) chúng ta dùng câu lệnh sau:
```
$ sudo yum install ruby
```

### Cài Đặt RubyGems
Trên Windows sau khi cài đặt Ruby sử dụng Ruby Installer thì máy tính bạn cũng sẽ được cài đặt RubyGems.

Với các hệ điều hành khác thì trong hầu hết các trường hợp, sau khi cài đặt Ruby thì chương trình RubyGems cũng sẽ được cài đặt cùng. Bạn có thể kiểm tra RubyGems đã được cài đặt trên máy hay chưa sử dụng câu lệnh sau:
```
$ gem -v
```
Nếu máy tính bạn không có RubyGems bạn có thể tải chương trình cài đặt từ [rubygems.org](https://rubygems.org/pages/download). Sau khi tải về bạn tiến hành giải nén tập tin. Sau đó trên cửa sổ dòng lệnh terminal bạn di chuyển vào thư mục vừa được giải nén và chạy câu lệnh sau (dành cho Mac OS và Linux):
```
$ ruby setup.rb
```
### Cài Đặt Ruby on Rails
Cuối cùng sau khi cài đặt Ruby và RubyGems chúng ta có thể cài đặt Rails framework sử dụng câu lệnh sau trên terminal (với Windows bạn sử dụng command prompt):
```
$ gem install rails -v 5.0.4
```
Kết thúc quá trình cài đặt bạn có thể kiểm tra phiên bản Rails trên máy sử dụng câu lệnh sau:
```
$ rails -v
```

### Cài Đặt SQLite
Giống như Ruby, SQLite có thể được cài đặt trên hệ điều hành Windows, Mac OSX và Linux.

**Windows**
Để cài SQLite trên Windows bạn thực hiện các bước sau:

Vào trang [sqlite.org](https://www.sqlite.org/download.html) và tìm mục Precompiled Binaries for Windows
Ở mục này nhập chọn và tải về sqlite-shell và sqlite-dll.
Giải nén hai tập tin tải về ở trên vào thư mục C:\WINDOWS\system32
Trên command prompt bạn có thể kiểm tra lại SQLite3 đã được cài đặt bằng cách chạy câu lệnh sau:
```
> sqlite3 --version
```
 Nếu bạn không thấy thông tin về SQLite3 xuất hiện thì bạn cần thêm 2 tập tin chương trình sqlite-shell và sqlite-dll tải về ở trên vào biến môi trường (environment variables) trên Windows.
Cuối cùng để kết thúc, bạn cũng cần cài đặt sqlite3 gem sử dụng RubyGems:
```
> gem install sqlite3
```
**Mac OSX**
Trên Mac OSX thì SQLite3 đã được cài đặt sẵn, nếu bạn muốn cập nhật lên phiên bản mới nhất bạn có thể sử dụng HomeBrew:
```
$ brew install sqlite3
```
**Linux**
Tương tự như Mac OSX, trên các phiên bản của Linux thì SQLite3 cũng được cài đặt sẵn. Nếu bạn muốn cập nhật hoặc cài lại bạn có thể sử dụng câu lệnh sau:
```
$ sudo apt-get install sqlite3 libsqlite3-dev
```
Hoặc với yum:
```
$ sudo yum install sqlite3 libsqlite3-dev
```
## Tạo dự án mới
### Tạo dự án
Sau khi cài đặt xong các phần mềm cần thiết thì ta có thể tạo dự án đầu tiên.
Bước 1: Kiểm tra phiên bản của Ruby on Rails được cài đặt:
```
$ rails --version
```
Bước 2: Tạo dự án

Để tạo ứng dụng blog thì trên cửa sổ trong lệnh bạn di chuyển tới thư mục sử dụng để lưu trữ ứng dụng. Dưới đây tôi sử dụng thư mục Sites trong thư mục người dùng để lưu ứng dụng:
```
$ cd ~/Sites
```
Sau đó chạy câu lệnh sau:
```
$ rails new app_demo
```
![](https://images.viblo.asia/33ac2b62-e172-4da7-9ca8-f82c046bc6c7.png)
Bước 3: Confirm folder dự án vừa tạo ra
![](https://images.viblo.asia/aab349b1-b91f-4d89-acad-fa902a9877fe.png)
### Khởi động server
Ở trên bạn đã tạo thư mục dự án app_demo. Tuy nhiên để chạy được ứng dụng thì chúng ta cần sử dụng một HTTP web server để phục vụ việc chạy ứng dụng.
Với Ruby on Rails chúng ta cũng có thể sử dụng Apache, tuy nhiên điều tuyệt vời ở Rails đó là bạn có thể sử dụng câu lệnh rails để tạo server cho ứng dụng thay vì phải cài đặt và cấu hình Apache.
Web server được cung cấp bởi Ruby on Rails có tên là WEBrick và để khởi động WEBrick bạn chạy câu lệnh sau trên cửa sổ dòng lệnh:
```
$ bin/rails server
```
Nếu bạn sử dụng hệ điều hành Windows bạn cần chạy câu lệnh trên sử dụng Ruby:
```
C:\Sites\app_demo> rails server
```
Câu lệnh trên sẽ khởi động WEBrick web server. Để dừng WEBrick bạn sử dụng tổ hợp phím Ctrl + C
Bước 1: Khởi động web server
![](https://images.viblo.asia/5833f6f0-b968-46a4-8738-9a6f33fe966b.png)
Bước 2: Confirm màn hình
![](https://images.viblo.asia/fd96e657-5dde-449d-8b14-6a074689d717.png)
### Tự động tạo top page
Bước 1:  Sử dụng câu lệnh rails generator để tạo controller, views và route trong cùng một câu lệnh
```
rails generate controller home top
```
Vì trên của sổ cmd hiện tại server đang chạy nên bạn hãy mở terminal khác để thực hiện lệnh trên nhé.
Chú ý là nhớ trỏ đến đúng thư mục của dự án (Ở đây là cd c:/Sites/app_demo)
![](https://images.viblo.asia/20478267-620a-4b11-8cbd-a620848ed8a7.png)
Bước 2: confirm trên trình duyệt (http://localhost:3000/home/top)
Trên windown bạn có thể sẽ gặp lỗi `ExecJS::ProgramError in Home#top` như hình bên dưới
![](https://images.viblo.asia/4b990d30-b8f3-4ae8-a2fb-d276430e18f5.png)
Thì hãy mở file  /app/views/layouts/application.html.erb và đổi trong line 7 và 8 parameter đầu tiên từ `application` thành ` default` rồi thử lại nhé.
Kết quả như dưới là đã thành công
![](https://images.viblo.asia/ad5a6e9f-9980-4472-9935-6b1c72e7b737.png)

Ở trong Rails thì hiển thị page thì cần có 3 file : view, controller, routing. Chúng ta sẽ tìm hiểu chi tiết tứng cái một nhé.
## View
### View Là Gì
Trong mô hình MVC thì Views là thành phần được dùng để xuất ra kết quả cuối cùng trước khi gửi về trình duyệt. Kết quả này có thể là trang HTML, trang XML hay thậm chí là văn bản đơn thuần.

Các tập tin View trong Ruby on Rails được đặt trong thư mục app/views.
Ở trên, khi chạy lệnh`rails generate controller home top` thì đồng thời cũng đã tạo ra trong folder` views` folder `home` và file `top.html.erb`.
### Thay đổi view
Nội dung bên trong view (file HTML) là nội dung được hiển thị lên trên trình duyệt nên bạn có thể thay đổi nội dung hiển thị bằng việc edit file đó. Hãy thử thay đổi file top.html.erb rồi confirm nội dung thay đổi trên top page nhé.
Bước 1: Hãy mở file C:\Sites\app_demo\app\views\home\top.html rồi sửa nội dung thành như dưới:
```
<div class="main top-main">
  <div class="top-message">
    <h2>UPDATE VIEW</h2>
    <p>Change contence in top.html file</p>
  </div>
</div>
```
Bước 2: Confirm nội dung thay đổi trên tình duyệt  (http://localhost:3000/home/top)
![](https://images.viblo.asia/86bac888-5df8-43d2-b16f-b5ea98cf8c04.png)
## Controller
Khi hiển thị page, ở trong Rails thì thông qua controller trả views về trên trình duyệt.
### Tạo Controller

Trong phần trên mình đã nói, chúng ta có thể sử dụng câu lệnh rails generator để tạo ra controller
```
rails generate controller home top
```
Câu lệnh trên sẽ tạo ra một số tập tin home_controller.rb có nội dung như dưới trong thư mục app/controllers cùng một số tập tin liên quan khác.
```
class HomeController < ApplicationController
  def top
  end
end
```
Bạn có thể thấy tập tin controller trên định nghĩa một lớp `HomeController` và lớp này kế thừa lớp `ApplicationController`. Phương thức `top` ở đây gọi là acction.
### Controller Action
Controller action giữ vai trò tìm view tương ứng trong folder views trả về trình duyệt. Cụ thể là action sẽ tìm trong folder view trùng tên với controller cái file HTML trùng tên với action rồi trả về cho trình duyệt.
Các action trong route sẽ tương ứng với một phương thức của controller. Ví dụ một route sau:
```
  get 'home#index'
```
Thì action index ở trên sẽ được kết nối (hay map) với phương thức index trong HomeController. 
Mặc dù phương thức này đang tạm thời trống chúng ta sẽ thêm các đoạn mã cần thiết sau.
## Routing
### Routing Là Gì

Trong phát triển ứng dụng web thì routing giúp xác định luồng xử lý của ứng dụng. Routing bao gồm tập hợp các quy tắc giúp xác định với mỗi một địa chỉ URL được gửi tới máy chủ nó sẽ được xử lý ở đâu (hay như thế nào) trong ứng dụng. Các quy tắc này còn được gọi là các route.

### Routing Trong Rails
Trong Rails thì thông qua controller trả views về browser nhưng giữ vai trò liên kết giữa browser và controller là routing. Thứ tự xử lý đến khi hiển thị là : routing → controller → view
Trong Rails các tập luật route được đặt trong tập tin config/routes.rb. Khi mở tập tin này bạn sẽ thấy một route như sau:
```
Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  ...
end
```
Tập tin này bao gồm nhiều dòng lệnh dùng để định nghĩa các route khác nhau. Mỗi route sẽ giúp xác định một địa chỉ URL với định dạng cho trước khi gửi tới máy chủ sẽ được xử lý ở tập tin controller nào trong ứng dụng và cụ thể hơn ở phương thức (action) nào trong controller đó.
VD: Trong config/routes.rb định nghĩa bằng phương pháp 「get "URL" => "controller_name#action_name"」
```
get "home/top" => "home#top"
```
Khi Browser gửi URL (localhost:3000/home/top) thì routing sẽ dựa vào URL và gọi ra action top của controller home tương ứng.
### Route Cơ Bản
Cú pháp cơ bản để tạo một route như sau:
```
  http_method 'url_format' => 'controller#action'
```
Trong đó:
* http_method: Quy định phương thức của request gửi tới HTTP sẽ được xử lý bởi route này
* url_format: Quy định định dạng format của địa chỉ URL gửi tới máy chủ sẽ được xử lý bởi route này.
* controller: Quy định tập tin controller sẽ được dùng để xử lý yêu cầu gửi tới.
* action: Quy định phương thức (hay action) sẽ được dùng để xử lý yêu cầu gửi tới.
Để hiểu rõ hơn chúng ta xem một route ví dụ như sau:
```
  get 'products/:id' => 'product#view'
```
Với route trên thì các yêu cầu gửi tới máy chủ với địa chỉ URL dưới dạng /products/:id (ví dụ /product/1 sẽ được xử lý ở controller product và trong action view. 

### Route Trang Chủ

Ở tập tin routes.rb bạn thấy có một dòng comment như sau ở dòng số 6:
```
  # root 'welcome#index'
```
Route trên được gọi là route trang chủ vì nó xác định yêu cầu gửi tới máy chủ cho trang chủ củ website sẽ được xử lý ở đâu. Bây giờ bạn xoá dấu comment # ở trên để kích hoạt một route đầu tiên:
```
  root 'welcome#index'
```
Với route trên thì các yêu cầu gửi tới máy chủ dưới địa chỉ URL http://localhost:3000/ sẽ được xử lý ở welcome controller và cụ thể hơn ở index action có trong controller này.
## Add thêm 1 page
Bây giờ chúng ta sẽ thử add thêm 1 page giới thiệu về trang web của mình.
Bạn ko thể tiếp tục sử dụng command rails generator để tạo thêm nữa. Vì thế, để add thêm page mới thì bạn phải tự mình chuẩn bị thêm vào routing, controller, view đã được tự động tạo ra bằng command. 
Bước 1: Mở file routes.rb và add thêm định nghĩa route `about`
```
Rails.application.routes.draw do

  get 'home/top'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Add thêm route about
  get "about" => "home#about"
end
```
Bước 2: Mở file controller.rb và add thêm định nghĩa action about
```
class HomeController < ApplicationController
  def top
  end
  # Add thêm action about
def about
  end
  
end
```
Bước 3: Tiếp theo trong thư mục app\views\home bạn tạo một tập tin about.html với nội dung như sau:
```
<div class="main top-main"> 
    <div class="top-message">
        <h2>ABOUT</h2>
        <p>Add new page </p> 
    </div> 
</div>
```
Bước 4: Confirm thành phẩm trên trình duyệt nào (http://localhost:3000/about)
![](https://images.viblo.asia/4e51078c-8f30-4f6e-a25c-173e92c4e26c.png)
## Điều chỉnh Layout 
### Apply CSS
File CSS thì được đưa vào trong folder `app/assets/stylesheets`. Khi chạy command `rails generate controller home ...` thì file CSS (home.scss)cũng được tạo ra. scss là đuôi mở rộng của CSS

Bước 1: Định nghĩa css

Bước 2: Sử dụng css trong view (html)
```
<header>
  <div class="header-logo">
    TweetApp
  </div>
  <ul class="header-menus">
    <li>About Test App</li>
  </ul>
</header>

<div class="main top-main">
  <div class="top-message">
    <h2>Header</h2>
    <p>Content</p>
  </div>
</div>
```
Bước 3: Confirm trên trình duyệt
### Hiển thị ảnh
Ảnh thì được đặt ở folder「public」, chỉ cần chỉ định tên ảnh bằng 「<img src="/picture_name" >」hoặc「background-image: url("/picture_name");」có thể dễ dàng hiển thị ảnh.

Refer bài trước: https://viblo.asia/p/ruby-co-ban-ve-ruby-ruby-on-rails-L4x5xR9rZBM