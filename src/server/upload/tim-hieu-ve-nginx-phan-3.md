Chúng ta đã cùng lướt qua 1 lượt về cài đặt và cấu hình cơ bản Nginx ở bài trước. Ở bài viết này, ta sẽ đi vào chi tiết hơn để có thể cấu hình theo nhu cầu của bản thân.
# Chi tiết về nginx.conf
Cùng nhìn lại nội dung file
```
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;

	# gzip_vary on;
	# gzip_proxied any;
	# gzip_comp_level 6;
	# gzip_buffers 16 8k;
	# gzip_http_version 1.1;
	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

	##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}


#mail {
#	# See sample authentication script at:
#	# http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
# 
#	# auth_http localhost/auth.php;
#	# pop3_capabilities "TOP" "USER";
#	# imap_capabilities "IMAP4rev1" "UIDPLUS";
# 
#	server {
#		listen     localhost:110;
#		protocol   pop3;
#		proxy      on;
#	}
# 
#	server {
#		listen     localhost:143;
#		protocol   imap;
#		proxy      on;
#	}
#}

```
Ta chú ý đến cách viết các blocks mở đầu bằng dấu { và kết thúc bằng  dấu }, nội bên trong 1 block hay context gồm một hoặc nhiều các directive. Các tùy chọn cấu hình trong Nginx được gọi là directive. 

Các block có thể được viết lồng nhau giúp các block con kế thừa các directive từ block cha - block bao quanh nó. Ngoài ra, trong block con ta cũng có thể được ghi đè các giá trị directive được kế thừa tử cha bởi các giá trị theo ý muốn.

Ký tự # đứng trước là các comment và không được Nginx thực thi. Các dòng chứa directive phải kết thúc bằng dấu ; 

Nginx sẽ báo lỗi khi đọc tệp cấu hình với các lệnh được khai báo trong context bị sai. Tới đây ta sẽ tóm gọn lại cấu trúc của một tệp cấu hình như sau :
```
user  nginx;
worker_processes  number_process;

error_log  /var/log/nginx/error.log;
pid        /var/run/nginx.pid;

events {
       . . .
}

http {
       . . .
}
```
Cùng phân tích một chút :
Tệp bắt đầu với 4 directive: **user**, **worker_processes**, **error_log**, **pid**. Những directive này nằm ngoài cặp ngoặc nhọn và không thuộc context nào, ảnh hưởng đến toàn bộ ứng dụng ở mức cơ bản. Ta gọi nó là **main** context. Hai block là **events** và **http** là các directive bổ sung. Chúng tồn tại trong **main** context.
# Events context
Events context ở trong main context. Nó được sử dụng để đặt các directive mức global,  ảnh hưởng đến cách Nginx xử lý các kết nối. Chỉ có duy nhất 1 event context được định nghĩa trong cấu hình Nginx.
```
# main context

events {

    # events context
    . . .

}
```

Nginx sử dụng mô hình xử lý kết nối dựa trên hướng sự kiện. Do đó, các directive nằm trong context này sẽ xác định cách mà các worker process nên xử lý các connect như thế nào. 

Thông thường, phương thức xử lý kết nối được chọn tự động dựa trên sự lựa chọn hiệu quả nhất mà nền tảng đang sẵn có. Đối với hệ thống Linux thì epoll chính là phương thức tối ưu nhất.
# Http context
Đồng bậc với events context là Http context. Nó cũng nằm trong main context. Nếu cấu hình Nginx với mục đích làm máy chủ web hoặc reverse proxy thì http context sẽ giữ phần lớn cấu hình. Nó sẽ chứa tất cả các directive và các context cần thiết để xác định cách chương trình sẽ xử lý các kết nối HTTP hoặc HTTPS.
```
# main context

events {
    # events context

    . . .

}

http {
    # http context

    . . .

}
```
**Http context** chứa các directive để xử lý lưu lượng truy cập web. Các bạn có thể xem đầy đủ danh sách các directive cuả http context tại [đây](https://nginx.org/en/docs/http/ngx_http_core_module.html).
# Server context
Nằm trong http context và có thể được khai báo nhiều lần.
```
# main context

http {

    # http context

    server {

        # first server context

    }

    server {

        # second server context

    }

```
Mỗi **server context** xác định một máy chủ ảo để xử lý các yêu cầu của máy khách. Mỗi một máy chủ ảo có thể xử lý một tập hợp con cụ thể các kết nối khác nhau.
### Listen port
Mỗi **listen port** đại diện cho 1 Nginx hostname và cổng TCP sẽ lắng nghe các kết nối HTTP. Nếu một request từ client phù hợp với các giá trị này, khối này sẽ có khả năng được chọn để xử lý kết nối.
```
server {
		listen     localhost:110;
		###
}
```
### Name-Based Virtual Hosting
server_name cho phép nhiều tên miền được trỏ tới cùng 1 địa chỉ IP. Nginx sử dụng tên miền từ HTTP header để trả lời các yêu cầu. Bất kể, tên miền có hợp lệ hay không.

Dưới đây chúng ta tạo file config cho các domain có tên là domain_name cụ thể như sau :

trong /etc/nginx/conf.d/domain_name.com.conf  có nội dung sau
```
server_name   domain_name.com www.domain_name.com;
```
Như config ở trên thì khi nhận được tên doimain tương ứng ở Header HTTP, server sẽ đối chiếu nó với các domain được định nghĩa trong directive server_name. Nếu hợp lệ thì request sẽ được tiếp tục xử lí.

Cũng có thể viết tắt như sau để đại diện cho các tên miền phụ của domain_name.com
```
server_name   *.domain_name.com;
# hoặc
server_name   .domain_name.com;
```
Hoặc xử lí cho các tên miền bắt đầu bằng "cụm_từ_nào_đó": 
```
server_name   cụm_từ_nào_đó.*;
```
Ngoài ra bạn hoàn toàn có thể định nghĩa server_name ngay bên trong /ect/nginx/nginx.conf như này ( thuộc server context)
```
# main context
server {
		listen     localhost:110;
		server_name     domain_name.com
}
```

### Location context
Trước tiên ta đến với cấu trúc chung của nó 
```
location match_modifier location_match {

    . . .

}
```
Location context nằm trong server context và có thể được lồng nhau. Lí do của việc lồng nhau xuất phát từ sự cho phép xử lí các URI từ cùng 1 domain nào đó, mỗi URI sẽ có cấu trúc phần mở đầu giống nhau nên xuất hiện các directive dùng chung được sử dụng, phần sau của URI khác nhau và do đó có thể phân tách nhau để xử lí theo các directive con.

Ví dụ, nếu request là http://www.abc.com/home ở cổng 80, thì http, www.abc.com và cổng 80 sẽ được sử dụng để xác định server block thực hiện. Sau khi chọn server, phần /home sẽ được đánh giá theo vị trí và sẽ được location context  tương ứng xử lý.
```
# main context

server {
    listen     abc.com:80
    server_name    abc.com;

    location /home {

        # first location context

    }
    
    # orther example location context
    
    location = /page1 {

       . . .

   }
   
   location ~ \.(jpe?g|png|gif|ico)$ {

    . . .

   }
   
   location ~* \.(jpe?g|png|gif|ico)$ {

      . . .

    }
    
    location ^~ /costumes {

    . . .
    
    }

    location /other/bar {

        # second location context

        location nested_match {

            # first nested location

        }

        location other_nested {

            # second nested location

        }

    }

}
```
Ok, mình sẽ dừng bài viết ở đây vì nó cũng khá dài rồi, và còn nhiều vấn đề nữa mà mình sẽ nói tới trong [bài viết tiếp theo](https://viblo.asia/p/tim-hieu-ve-nginx-phan-4-RQqKLo8m57z). Cảm ơn các bạn đã dành thời gian cho mình ^^