# Mở đầu
Ngày nay, khi thương mại điện tử đang phát triển mạnh thì mỗi doanh nghiệp hay cá nhân đều muốn sở hữu cho mình một trang web riêng. Với đa số người sử dụng đều không có nhiều kiến thức về lập trình thì sự xuất hiện của những nền tảng giúp cho họ có thể tạo ra các website một cách nhanh chóng mà không đòi hỏi kiến thức chuyên sâu về công nghệ là cần thiết.  WordPress là nền tảng có thể đáp ứng được điều này. Đơn giản, dễ sử dụng và miễn phí, những đặc thù này dã đưa WordPress trở thành một trong những phần mềm mã nguồn mở được ưa thích sử dụng nhất với mọi người trên thế giới.  
# Tổng quan về WordPress 
WordPress là một phần mềm mã nguồn mở được viết bằng ngôn ngữ PHP và sử dụng hệ quản trị cơ sở dữ liệu MySQL. Đây là một phần mềm quản trị nội dung CMS (Content Management System) được sử dụng để tạo ra các blogs hay các website bán hàng hoặc quảng cáo. Nói cách khác, WordPress là một công cụ giúp người dùng thiết kế website, blogs hoặc tin tức cho riêng mình.  

WordPress được phát triển nhằm mục đích phục vụ những người dùng phổ thông. Vì vậy, các thao tác trong WordPress rất đơn giản và gần gũi, khiến cho người viết blog không cần quá am hiểu các kiến thức về lập trình hay website nâng cao  mà vẫn có thể thiết kế được website cho riêng mình. Bên cạnh đó, giao diện quản trị của WordPress trực quan và thân thiện giúp người dùng có thể nắm rõ cơ cấu quản lý một website một cách dễ dàng. 

Không chỉ dễ dàng với người dùng phổ thông, WordPress cũng đủ mạnh và linh hoạt phục vụ cho những cá nhân, doanh nghiệp am hiểu công nghệ, muốn sử dụng Wordpress trong việc phát triển kinh doanh hay mua bán trực tuyến. Chính vì lý do đó mà rất nhiều trang web lớn hàng đầu trên thế giới đã chọn WordPress để phát triển. Thống kê năm 2019 cho thấy có khoảng xấp xỉ 33.8% các trang web nằm trong top 10 triệu trang web hàng đầu thế giới đang sử dụng WordPress. Điển hình như CNN, Dow Jones, Wall Street Journal, techCrunch, Mashable, BBC America, Variety, Sony Music, MTV News, Bata, Quartz…. 
# Cài đặt WordPress trên Ubuntu 18.04 bằng XAMPP
Vì WordPress được viết bằng ngôn ngữ PHP và sử dụng hệ quản trị cơ sở dữ liệu MySQL nên trước khi cài đặt Wordpress, ta cần cài đặt PHP và MySQL. Ở đây, để thuận tiện, mình sẽ giới thiệu cho các bạn cách cài đặt Apache Xampp Server trước khi cài đặt WordPress.
## Cài đặt Apache Xampp Server 
1.  Download Apache Xampp Server từ trang web [](https://www.apachefriends.org/index.html) 
2.  Sau khi Download Xampp về máy thì trong thư mục *~/Download* sẽ chứa một file thực thi *xampp-linux-7.2.10-0-installer.run*. 
    Sử dụng lệnh sudo `./xampp-linux-7.2.10-0-installer.run` để cài đặt Xampp Server.  
    
    ![](https://images.viblo.asia/f5c66bc8-a9de-44be-9395-f6b48fb552be.png)
    
4.  Khởi động Xampp Server: 
    Truy cập vào thư mục */opt/lampp/* và sử dụng lệnh `sudo ./manager-linux-x64.run` để khởi động Xampp Server. 
    
    ![](https://images.viblo.asia/0b78a601-3445-46e2-9299-a13802539190.png)
    
 Vậy là chúng ta đã cài đặt Apache Xampp Server xong. Sau đây ta sẽ tiến hành cài đặt WordPress.  
## Cài đặt WordPress 
1.  Sử dụng lệnh `wget` để tải file nén WordPress về từ trang chủ wordpress.org
    Lệnh sử dụng: `wget https://wordpress.org/lastest.tar.gz`
2.  Giải nén file *lastest.tar.gz* 
    Sử dụng lệnh: `tar -xzvf lastest.tar.gz` 
    
    ![](https://images.viblo.asia/fcef0f97-20d7-48de-8c93-499876185374.png)

3.  Tạo cơ sở dữ liệu và người dùng cho Wordpress 

    3.1.  Khởi động Xampp Server rồi chọn tab **Manage Servers** -> chọn start **MySQL Database** và **Apache Web Server**
   
    ![](https://images.viblo.asia/4950d181-4d48-489f-ab05-df2aba1c50c2.png)

    3.2.  Truy cập **phpmyadmin** trên trình duyệt qua đường link [](http://localhost/phpmyadmin/)
    3.3.  Create Database cho WordPress:
    
    ![](https://images.viblo.asia/e874e173-6419-4053-9325-4c4dbeb27fa8.png)

    3.4.  Tạo người dùng cho WordPress trong MySQL:
    
    ![](https://images.viblo.asia/ad68f74b-f9f9-4eeb-b5f3-3fc5795996e9.png)

    3.5.  Grant quyền cho người dùng WordPress 
    
    ![](https://images.viblo.asia/ff1402dd-8a31-45b6-ac30-14e9a0b882dc.png)
    
  4.  Config file wp-config.php 
  
      4.1.  Đổi tên file *wp-config-sample.php* thành *wp-config.php* bằng lệnh `mv wp-config-sample.php wp-config.php`.
      
      ![](https://images.viblo.asia/c90de467-06e1-456a-b3f6-b28b3c361a57.png)
      
      4.2.  Sử dụng lệnh nano để chỉnh sửa file *wp-config.php* với nội dung như sau:
      
      ![](https://images.viblo.asia/4536f061-1d99-4203-a7d3-7387926cdd00.png)

      4.3.  Di chuyển thư mục *wordpress* sang thư mục */opt/lampp/htdocs/* bằng lệnh `sudo mv wordpress /opt/lampp/htdocs/`.
      
      4.4.  Truy cập `localhost/wordpress/wp-admin/install.php` để install wordpress  
          - Chọn ngôn ngữ và nhấn continue 
          - Thiết lập các thông số cần thiết như title, username, password cho trang WordPress. Có hai lựa chọn để thiết lập mật khẩu. Một là bạn có thể lấy mật khẩu mà Wordpress generate tự động generate. Tuy rằng bảo mật nhưng lại khó nhớ. Hai là bạn có thể chọn một mật khẩu cho chính mình. Nếu bạn chọn mật khẩu ngắn và đơn giản thì tích vào ô *confirm use of weak password*.

   ![](https://images.viblo.asia/212ffc3a-8ddd-4796-b870-f195f3b6779a.png)
          
  Sau khi đăng kí thành công, trang sẽ hiển thị thông báo thành công. Vậy là bạn đã hoàn thành các bước cài đặt WordPress rồi đấy. Giờ đây bạn có thể tự tạo cho mình các trang web hay các bài blog cho riêng mình rồi!
  Hẹn gặp lại các bạn ở bài viết sắp tới nhé!