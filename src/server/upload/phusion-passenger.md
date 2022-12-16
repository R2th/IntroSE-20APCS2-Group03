# Passenger
Passenger là 1 mã nguồn mở web application server cho ruby. Nó đảm nhận việc handle các HTTP request, quản lý các processes và resources. Nó cũng cho phép chúng ta xem và phân tích các vấn đề. Passenger rất dễ sử dụng và deploy lên production.

Passenger là 1 app server kiểu như (puma, unicorn, torquebox).
Nginx, Apache là 1 web server.

Khi đó passenger sẽ giúp bạn tự động kết nối giữa web apps và web server

Nếu như trước kia ta hay dùng unicorn để kết nối rails apps với web server và capistrano để tự động compile assets, đóng gói code ... thì nay bạn có thể sử dụng passerger bởi nó hiện đại và triển khai dễ dàng hơn nhiều. Dưới đây là bẳng so sánh tốc độ. Có thể nói passenger chạy nhanh gấp 4 lần so với các ruby web server khác.

![](https://images.viblo.asia/cdfeba63-bf7d-42ec-b7c4-3af4cd095c0c.png)

Chúng ta đều biết Unicorn, Puma, Torquebox đều khác nhanh vì vậy để nhanh hơn 2 -> 4 lần là điều hết sức khó khăn. Tuy vậy có khá nhiều lý do giúp cho Phusion Passenger nhanh hơn. 

https://www.rubyraptor.org/how-we-made-raptor-up-to-4x-faster-than-unicorn-and-up-to-2x-faster-than-puma-torquebox/

các bạn có thể tham khảo tại link trên.


# Deploy với phusion passenger và nginx

1.  Cài đặt nginx và start nginx
    ```
    sudo apt-get update
    sudo apt-get install nginx
    sudo service nginx start
    ```

    Nginx như nói ở trên sẽ là 1 web server, có tác dụng sẽ gửi request từ user lên app server. Nếu request không thay đổi thưởng xuyên như css, js thì web server có thể giải quyết được mà không cần tương tác với app. Như vậy tốc độ xử lý sẽ nhanhhown.

2. Cài đặt passenger

    Bạn có thể cài đặt thông qua gem passenger
    
    ```
    gem install passenger
    ```

    kết nối module với nginx
    ```
    rvmsudo passenger-install-nginx-module
    ```
    
    Hoặc cài qua apt
    
    ```
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 561F9B9CAC40B2F7
    ```
    
    
    tiếp đến tạo một APT file:
    
    ```
    sudo nano /etc/apt/sources.list.d/passenger.list
    ```
    
    Cấp quyền cho file và save lại
    
    ```
    sudo chown ubuntu: /etc/apt/sources.list.d/passenger.list
   sudo chmod 600 /etc/apt/sources.list.d/passenger.list
    ```
    
    Update và cài đặt passenger với nginx
    
    ```
    sudo apt-get update
    sudo apt-get install nginx-extras passenger
    ```
    
    OK vậy là đã cài đặt thành công passenger
    
  3. Config nginx
    
        Mở file /etc/nginx/nginx.conf và bỏ comment ở 2 dòng
        ```
        # passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;
        # passenger_ruby /usr/bin/ruby;
        ```
        Nếu không thấy thì ta có thể thêm vào trong block http
        
        ```
        http {
          passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;
          passenger_ruby /usr/bin/ruby;
        }
        ```
        
  4. Restart nginx
    
        ```
        sudo service nginx restart
        ```
        
   5. Kiểm tra validate installation
      ```
      rvmsudo passenger-config validate-install
      * Checking whether this Phusion Passenger install is in PATH... ✓
      * Checking whether there are no other Phusion Passenger installations... ✓
      ```
      
  6. Kiểm tra các tiến trình
      ```
      rvmsudo passenger-memory-stats
      Version: 5.0.8
      Date   : 2015-05-28 08:46:20 +0200
      ...

      ---------- Nginx processes ----------
      PID    PPID   VMSize   Private  Name
      -------------------------------------
      12443  4814   60.8 MB  0.2 MB   nginx: master process /usr/sbin/nginx
      12538  12443  64.9 MB  5.0 MB   nginx: worker process
      ### Processes: 3
      ### Total private dirty RSS: 5.56 MB

      ----- Passenger processes ------
      PID    VMSize    Private   Name
      --------------------------------
      12517  83.2 MB   0.6 MB    PassengerAgent watchdog
      12520  266.0 MB  3.4 MB    PassengerAgent server
      12531  149.5 MB  1.4 MB    PassengerAgent logger
      ...
      ```
   7. Tạo các môi trường rails app, database, bundle, gem
   
      VD app `/var/www/html/passenger-app/public` chứa source code của app
   9. Config web server
      Tạo 1 file config kết nối với rails app của bạn `passenger-app`
      ```
      sudo vi /etc/nginx/sites-available/passenger-app
      ```
      
      Thêm config
       ```
       server {
          listen 80 default_server;
          server_name www.xxx.com;
          passenger_enabled on;
          root /var/www/html/passenger-app/public;
        }
       ```
       
       Save và tạo symlink
       ```
       sudo ln -s /etc/nginx/sites-available/passenger-app /etc/nginx/sites-enabled/passenger-app
       ```
       
   10. Reset lại nginx và xem thành quả
        ```
        sudo service nginx restart
        ```