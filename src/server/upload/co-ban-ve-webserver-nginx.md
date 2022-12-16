Như bài [này](https://viblo.asia/p/tong-quan-ve-kien-truc-he-thong-4P856nAL5Y3) mình đã giới thiệu cho các bạn tổng quan về 1 hệ thống. Vậy ở bài này mình sẽ đi sâu về khái niệm **WEBSERVER** nó là gì cũng như muốn cho các bạn hiểu được chính xác cách hoạt động của nó cũng như hiểu được các thuật ngữ và cấu hình cơ bản. **WEBSERVER** có rất nhiều loại phổ biến như apache, nginx, Web server IIS,... nhưng chung quy lại chúng sẽ có điểm chung và riêng nên ở phạm vi bài này mình sẽ chỉ đi sâu vào 1 loại được coi là hot hiện hnay là **NGINX** và các bạn hiểu được cơ bản về nó thì mình nghĩ các webserver khác cũng tương tự thôi.

# WEBSERVER là gì? 
**Webserver** các bạn có thể hiểu đơn giản nó là 1 phần mềm được cài đặt trên 1 con server và nó sẽ có trách nhiệm thực hiện
nhận yêu cầu từ client (browser) và xử lý rồi phản hồi lại cho client (browser).
![image.png](https://images.viblo.asia/b7790c20-d249-47db-be42-fed02e0ca62e.png)
Ở đây để rõ hơn như hình mình sẽ chia ra 2 phần: <br>
+ Client có thể hiểu là trình duyệt (browser)
+ Webserver nó là 1 phần mềm đặt trên 1 con server (người ta hay gọi tắt là server hoặc webserver) <br>

**Bài toán đặt ra làm sao để 2 thằng này nói chuyện được với nhau?** <br>

Để 2 thằng này nói chuyện được với nhau thì chúng sẽ phải dùng 1 ngôn ngữ chung là **giao thức HTTP** và các bạn cần nắm được mấy khái niệm cơ bản về HTTP như sau: <br>
*  HTTP là giao thức client-server
*  HTTP là giao tức text base (tức là có thể đọc được)
*  HTTP là giao thức **stateless** (độc lập) nhưng có thể biến nó thành **statefull** bằng kĩ thuật session. <br>
* Vậy **STATELESS** và **STATEFULL**  nghĩa là sao? <br>
Ví dụ bài toán gửi xe: ( Bạn ví như **client** và nhà xe ví như **server**) <br>
  * Khi bạn vào gửi xe thì nhà xe bắt bạn điền thông tin và phát cho bạn vé xe và lần sau đến bạn cũng làm thao tao điền thông tin vì nhà xe không lưu lại thông tin của bạn nên cũng chả biết bạn là ai. Đó là **STATELESS** (Client gửi đến server và server trả về là hết chu trình) <br>
  * Khi bạn vào gửi xe thì nhà xe bắt bạn điền thông tin và lưu lại thông tin của bạn và phát cho bạn 1 cái thẻ và lần sau bạn đến bạn cầm thẻ quẹt cái là server đã biết được thông tin của bạn luôn mà không cần điền lại. Đó là **STATEFULL** <br>
# NGINX hoạt động thế nào?
Để đơn giản hóa thì các bạn có hiểu **NGINX** như là một anh gác cổng vậy. Nhiệm vụ của nó nhận request từ client gửi lên và xử lý sau đó trả lại dữ liệu cho client.  <br>
Cái này quan trọng này NGINX **chỉ trả về cho client web tĩnh** thôi vì client chỉ hiểu được file html( kèm theo css, js bên trong) thôi các bạn ạ.  <br>
Còn muốn trả về **web động** hoặc muốn đọc file PHP, Java, Python, ...thì sao?  <br> 
Ở hình dưới mình có ví dụ cho đọc file PHP và lấy dữ liệu từ databse à mình cũng nói qua cho các bạn biết web tĩnh, web động có thể hiểu đơn giản là  **web tĩnh** là web cố định nội dung tức là khi tải thì nội dung không thay đổi (tức không có database) ngược lại thì **web động** là sẽ sử dụng database nên khi load dữ liệu thì mỗi lần dữ liệu sẽ khác.
![image.png](https://images.viblo.asia/46a691e2-ae68-4e8a-a920-325215b95a77.png)
Ở hình trên mình sẽ mô tả cái luồng hoạt động như sau: <br>
1. Browser sẽ gửi yêu cầu lên server (nginx)
2. Server (nginx) tìm file hello.php
3. Trong file.php sẽ gọi đến database để lấy dữ liệu
4. Trả dữ liệu về cho Nginx và nginx sẽ trả lại dữ liệu về cho browser <br>

Ô trong hình thế PHP-FPM có nhiệm vụ gì ? Thì bên dưới nhé bạn.

Các bạn có thấy kì không khi ở phần trên mình có nói là Nginx chỉ đọc được web tĩnh thôi tức file html thôi nhưng ở đây bước 2 
như vậy thì làm sao có thể đọc được file có đuôi php. Chính vì thế PHP-FPM được tạo ra như 1 anh phiên dịch giữa **nginx** và **php** tức là Nginx sẽ dùng PHP-FPM để điều hướng đến file PHP và xử lý tùm la tùm lum muốn làm thế nào thì làm nhưng cuối cùng thì anh PHP-FPM sẽ dịch file PHP lại thành html và trả về cho anh NGINX là được và anh NGINX sẽ trả về BROWSER để hiện thị dữ liệu. Vậy là luồng cụ thể chi tiết thì các bạn phải đính thêm PHP-FPM nữa cho nó thêm độ chi tiết cũng như sinh động. 

**Chú ý:** Nginx giao tiếp với PHP-FPM qua **tcp socket** hoặc **file socket**
# NGINX cấu hình cơ bản?
## Khái niệm cơ cần nắm được về webserver
* **Multi-process** (apache) tức là 1 webserver chịu trách nhiệm đa xử lý các task vụ cùng 1 lúc và **multi-thread** (nginx) thì sẽ xử lý thành nhiều luồng cùng 1 lúc.
* **Default vhost**: Người dùng gửi request lên mà không khớp vs servername thì sẽ đẩy vào đây.
* **Hostname**: Tên website
* **Document root**: quy định chứa content của vhost
* **Default page**: page default nếu người dung k chỉ định đúng url (index.html)
* **Index** (true/false): quy định bạn có nhìn thấy content của webserver (link vào thấy được các thư mục (true) ngược lại k thấy (false))
* **Rewrite url**: Khi request browser thì webserver dịch web của mình thành 1 cấu trúc khác
* **Khái niệm vhost**:1 webserver  có thể chứa nhiều website bằng cách tạo ra các khối server (vhost)
* **Forward proxy**  (gọi tắt là proxy)


    ![image.png](https://images.viblo.asia/24c34f4a-e076-4562-9993-53cad784cd0a.png)
    Có thể hiểu đơn giản thay vì client gửi dữ liệu trực tiếp qua internet thì nó nhờ thằng  **Forward proxy** gửi đi và thằng này có trách nhiệm gửi dữ liệu hoặc có các rule chặn các site trước khi cho chúng đi ra ngoài internet. <br> Hiểu đơn giản nhất cứ coi **Forward proxy** nó là ông bảo vệ như ở trường học vậy. Ai đó muốn gửi gì thì đều phải nhờ ông ý hết. Ông ý sẽ có trách nhiệm duyệt và thay bạn gửi dữ liệu ra bên ngoài. <br>
    **Forward proxy** thường được ứng dụng: Tường lửa và lọc, cache, chia sẻ kết nối và hay được thấy ở doanh nghiệp hoặc công ty, chính phủ,...
* **Reverse Proxy**  
![image.png](https://images.viblo.asia/d8613060-7c58-41aa-9da2-ff3e27ebf397.png)
Có thể hiểu đơn giản **Reverse Proxy** như ông bảo vệ để điều hướng tới các server bên backend và nó ứng dụng như: <br>
     * Load balancing: giúp điều phối requests tới các servers backend để cân bằng tải, ngoài ra nó còn giúp hệ thống đạt tính sẵn sàng cao khi lỡ không may có server bị ngỏm thì nó sẽ chuyển request tới một server còn sống để thực thi.
    * Increased Security: Reverse Proxy còn đóng vai trò là một lớp bảo vệ cho các servers backend. Nó giúp cho chúng ta có thể ẩn đi địa chỉ và cấu trúc thực của server backend
    * Logging: Tất cả các requests tới các servers backend đều phải đi qua reverse proxy nên việc quản lý log của access tới từng server và endpoint sẽ dễ dàng hơn rất nhiều so với việc kiểm tra trên từng server một.
    * Encrypted Connection: Bằng việc mã hóa kết nối giữa client và reverse proxy với TLS, users sẽ được hưởng lợi từ việc mã hóa dữ liệu và bảo mật với HTTPS <br>

Khác biệt lớn nhất giữa hai loại này là **forward proxy** được sử dụng bởi client (ví dụ như trình duyệt). Trong khi đó, **reverse proxy** được sử dụng bởi server (ví dụ như web server). **Forward proxy** có thể nằm trong một mạng nội bộ cùng với client hoặc cũng có thể công khai trên Internet.

Hay nói một cách dễ hiểu hơn, **forward proxy** đại diện cho client, còn **reverse proxy** đại diện cho server.
## Cấu hình Nginx

Nginx khởi chạy thường sẽ load file cấu hình ở  /etc/nginx/nginx.conf: <br>
Mở file này ra ta sẽ thấy như ảnh: 

![](https://images.viblo.asia/76539f60-f633-4c0e-863d-8205ac7812df.png)
Dưới đây là 1 số thông số quan trọng tương ứng với ảnh trên: 
1. Dùng user nginx (con của user root)
2. Số lượng worker process
3.	Đường dẫn file lưu pid của tiến trình
4.	Import 1 file hoặc nhiều file cấu hình độc lập vào file tổng <br>
5.	Worker connection = 1024 hiểu đơn giản là 1 worker có thể phục vụ được 1024 connection cùng 1 lúc <br>

Bây giờ ta sẽ đi đến cấu trúc tổng quan cơ bản của 1 file cấu hình sẽ gồm những phần nào: <br>

Về tổng quan, file config chính (nginx.conf) sẽ được sắp xếp theo cấu trúc cây, xác định bởi các tập hợp hay dấu hoặc ({ }). Trong thuật ngữ NGINX, thành phần được xác định bởi các dấu ngoặc gọi là “context”. <br>
Tổng quan nó sẽ có thể có hoặc không các phần chính như ảnh sau: <br>

![image.png](https://images.viblo.asia/53bd9966-6b61-4de5-9e50-b0512f1d6726.png)
Các bạn có thể hiểu file cấu hình như code vậy: <br>
Khối ngoài cùng main context như là kiểu cấu hình toàn cục dưới đó là các khối chính events, http, mail,... và chúng đều được chia thành các block tương ứng với cấu hình cụ thể trong cặp dấu {}. Và đặc biệt các khối con sẽ có tính kế thừa khối cha và muốn ghi đè cấu hình lại thuộc tính của cha thì sẽ viết lại thuộc tính ở trong dấu {} tương ứng với khối cần cấu hình. <br>
Ở trên chỉ là các cấu hình hay sử dụng và các bạn có thể tham khảo đọc thêm các cấu hình khác ở đây (https://nginx.org/en/docs/http/ngx_http_core_module.html#absolute_redirect) <br>
Dưới đây mình sẽ đi qua 1 số block phổ biến như ảnh trên: <br>
### Events
Event Context là một context được chứa bên trong main context. Nó dùng để đặt các tùy chọn ở mức độ global, ảnh hưởng đến cách NGINX xử lý các kết nối ở cấp độ chung. Trong NGINX config, chỉ có một event context duy nhất được xác định.

Event context ở trong file config sẽ có dạng sau:
```
# main context

events {

    # events context
    . . .

}
```

NGINX sử dụng mô hình xử lý kết nối dựa trên các event. Do đó, các directive được xác định trong context này sẽ xác định cách worker processes ở trên xử lý các kết nối. Chủ yếu, các directive được tìm thấy ở đây được sử dụng để chọn ra kỹ thuật xử lý kết nối để sử dụng. Hoặc là sửa đổi cách các phương thức được triển khai.

Thông thường, phương thức xử lý kết nối được chọn tự động, dựa trên sự lựa chọn tối ưu mà nền tảng có sẵn. Đối với các hệ thống của Linux, sự lựa chọn tốt nhất thường là epoll.

Các mục khác có thể được cấu hình là số lượng kết nối mỗi worker có thể xử lý. Hay quyết định mỗi worker chỉ đảm nhận 1 kết nối hay tất cả kết nối đang chờ cùng lúc. Và quyết định xem các worker có thay phiên nhau respond các event không.
### HTTP Context
Khi cấu hình NGINX như một web server hay một reverse proxy, http context sẽ chiếm phần lớn cấu hình. Context này sẽ chứa mọi directive cũng như các context cần thiết khác để xác định cách các chương trình xử lý kết nối HTTP hay HTTPS.

HTTP context thực ra tương đương với event context, nên chúng sẽ được liệt kê cạnh nhau, thay vì lồng vào nhau. Cả hai đều là context con của main context:
```
# main context

http {
    # http context
    . . .
}
```

Các context thấp hơn sẽ cụ thể hơn về cách xử lý request. Nhưng các directive ở cấp độ này sẽ kiểm soát mặc định cho mỗi máy chủ ảo được xác định trong nó. Một lượng lớn các directive có thể được cấu hình theo context này và những context thấp hơn. Việc này tùy thuộc cách người dùng xác định quyền thừa kế.

Một số directive thường gặp kiểm soát location mặc định cho các truy cập và nhật ký lỗi (access_log và error_log). Nó cũng cấu hình I/O không đồng bộ cho các hoạt động của file (aio, sendfile, directio). Cấu hình trạng thái server khi xảy ra lỗi (error_page). Một số directive khác cấu hình nén (gzip, gzip_disable), fine-tune cài đặt keep alive TCP (keepalive_disable, keepalive_requests, keepalive_timeout). Hoặc cấu hình các quy tắc mà NGINX sẽ theo để tối ưu hóa các packet và system call (sendfile, tcp_nodelay, tcp_nopush). Các directive bổ sung cấu hình root các tài liệu tầng ứng dụng và index file (root, index). Nó cũng thiết lập các hash table dùng để chứa nhiều loại dữ liệu khác nhau (*_hash_bucket_size và *_hash_max_size cho server_names, types, variables).
### Server Context
Server Context được khai báo trong http context. Đây cũng là một ví dụ về các context lồng nhau. Server context cũng là context đầu tiên cho phép khai báo nhiều lần.

Định dạng chung của server context có dạng như sau:
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
}
```

Trong context này, mỗi trường hợp sẽ xác định một virtual server cụ thể để xử lý yêu cầu của client. Do đó, server context cho phép khai báo nhiều lần. Ta có thể có bao nhiêu server block tùy ý. Mỗi block có thể xử lý một subnet cụ thể.

Đồng thời, server context cũng là context đầu tiên là NGINX phải sử dụng một thuật toán lựa chọn để đưa ra quyết định. Mỗi client request sẽ được xử lý dựa trên cấu hình được xác định trong mỗi server context. Do đó, NGINX cần quyết định server context nào phù hợp nhất cho request đó. Các directive được sử dụng để quyết định server context là:
* listen: là sự kết hợp địa chỉ IP/port mà server block này được thiết kế để respond. Nếu một request từ client phù hợp với các giá trị này, block này có khả năng sẽ được lựa chọn để xử lý kết nối.
* server_name: directive này là một thành phần khác, dùng để chọn một server block để xử lý. Nếu có nhiều server đáp ứng được directive listen, NGINX sẽ phân tích cú pháp header “Host” của request và lựa chọn block phù hợp

Các directive trong context này có thể ghi đè lên nhiều directive được xác định trong http context. Bên cạnh các directive từ http context, ta cũng có thể cấu hình file để phản hồi lại các request (try_files), redirect và rewrite (return, rewrite), đặt giá trị cho biến (set).
### Location Context
Location text có tương đối nhiều điểm chung với server context. Lấy ví dụ, nhiều location context có thể được xác định, mỗi location được dùng để xử lý một loại client request xác định. Và mỗi location được chọn để phù hợp với định nghĩa location với client request thông qua một thuật toán lựa chọn.

Các directive xác định xem một server block có được xác định trong server context hay không. Thành phần quyết định khả năng xử lý yêu cầu của location sẽ nằm trong định nghĩa location (dòng mở đầu location block).

Cú pháp chung của location context:
```
location match_modifier location_match {
    . . .
}
```

Location block không giống với server block – lồng bên trong nhau, chúng sẽ nằm bên trong các server context. Việc này sẽ hữu ích khi tạo một location context chung hơn để bắt một subnet lưu lượng cụ thể. Sau đó, các process sau sẽ dựa trên các tiêu chí cụ thể hơn, với các context bổ sung bên trong:
```
# main context

server {
    # server context

    location /match/criteria {
        # first location context
    }

    location /other/criteria {
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

Location block phân chia các request trong một server block thông ua URI của request. Đây là phần xuất hiện sau tên miền hoặc tổ hợp địa chỉ IP/port.

Các directive mới ở tầng parent cho phép truy cập vào location bên ngoài document root (alias). Ngoài ra còn có thể đánh dấu location để chỉ có thể truy cập nội bộ (internal). Proxy đến các server hay location khác (sử dụng http, fastcgi, scgi, uwsgi proxying).

### Upstream Context
Upstream Context được dùng để định nghĩa và cấu hình các server upstream. Về cơ bản, context này xác định một nhóm các máy chủ mà NGINX có thể proxy các request đến. Context này chủ yếu được dùng khi cấu hình proxy của các loại khác nhau.

Upstream Context được đặt trong http context. Đồng thời nằm bên ngoài bất kỳ server context nào khác. Nó có dạng chung như sau:
```
# main context

http {
    # http context

    upstream upstream_name {
        # upstream context

        server proxy_server1;
        server proxy_server2;
        . . .
    }

    server {
        # server context
    }
}
```
Upstream Context sau đó có thể được tham chiếu theo tên trong máy chủ hoặc các location block để pass các request của một loại xác định, đi đến nhóm các server cụ thể. Sau đó, upstream sẽ sử dụng một thuật toán (mặc định là round-robin) để xác định server nó sẽ gửi request. Context này cho phép NGINX cân bằng tải khi đang proxy các request. 
<br>
**Note:** Cái này sẽ cấu hình loadbalancer được sử dụng khá phổ biến và ở cuối bài các bạn nên thực hành để hiểu cách hoạt động của nó hơn.
### Mail Context
Bên cạnh việc được sử dụng như một server web hay reverse proxy, NGINX cũng có thể được sử dụng như một mail proxy server hiệu suất cao. Mail context được xác định trong main context, bên ngoài http context.

Chức năng chính của context này là cung cấp khu vực để cấu hình một giải pháp mail proxy trên server. Khi đó, NGINX có thể chuyển hướng các request xác thức đến một server bên ngoài. Sau đó cung cấp quyền truy cập vào các mail server POP3 và IMAP. Bên cạnh đó, mail context cũng có thể được cấu hình để kết nối đến một SMTP Relayhost.

Dạng chung của mail context:
```
# main context

events {
    # events context
}

mail {
    # mail context
}
```
### Quy tắc chung trong Context, NGINX config
**Áp dụng các directive trong context cao nhất có thể:**
Nhiều directive có thể được sử dụng trong nhiều hơn một context. Lấy ví dụ, một số directive có thể được sử dụng trong các context http, server, location. Vì vậy, ta có thể linh hoạt khi thiết lập các directive này.

Tuy nhiên, có một quy tắc chung trong việc này. Hãy luôn khai báo các directive trong context cao nhất có thể. Đồng thời, ghi đè chúng ở các context thấp hơn nếu cần thiết. Có nhiều lý do để sử dụng chiến thuật này:

Đầu tiên, nó tránh sự lặp lại không cần thiết giữa các context tương đương. Lấy ví dụ trên, khi mỗi location được khai báo trong cùng một document root:
```
http {
    server {
        location / {
            root /var/www/html;
            . . .
        }

        location /another {
            root /var/www/html;
            . . .
        }
    }
}
```
Ta có thể đưa root ra server block. Hay thậm chí là ra http block:
```
http {
    root /var/www/html;
    server {
        location / {
            . . .
        }

        location /another {
            . . .
        }
    }
}
```
Hầu hết thì server level sẽ là phù hợp nhất. Nhưng khai báo ở level cao hơn cũng có cái lợi của nó. Việc này không những cho phép đặt directive ở ít địa điểm hơn. Mà nó còn cho phép xếp tầng các giá trị mặc định xuống tất cả các yếu tố con, ngăn việc gặp lỗi nếu chẳng may quên một directive ở cấp thấp hơn. Thậm chí đây là một vấn đề lớn đối với các cấu hình dài hạn.<br>
# Thực hành
Để nắm rõ hơn về lý thuyết cũng như áp dụng thì các bạn cùng với mình làm 2 bài thực hành sau: 
## Tạo 2 website dùng 1 con webserver
Ở đây mình dùng trên ubuntu nhé. <br>
Mình sẽ tạo ra 2 trang có tên web1.com và web2.com trên 1 con webserver <br>

**I. Cài đặt nginx** 
```
sudo apt update
sudo apt install nginx
```
Khi cài xong bạn check câu lệnh dưới đây ra như thế này là đã cài NGINX thành công: 
```
nginx -v
```
![image.png](https://images.viblo.asia/f10f2d15-28c9-48e5-ad38-8ce4353bde29.png)

Trước khi đến bước tiếp theo mình thử vào thư mục /etc/nginx xem có những gì và điểm qua ý nghĩa của mấy thư mục quan trọng nhé. <br>
![image.png](https://images.viblo.asia/365408f7-cea9-4585-9a9f-32368193d2ff.png)
* 	nginx.conf: File config chính, chịu trách nhiệm tải nhiều tệp khác trong thư mục cấu hình
* 	sites-available: chứa các file config VirtualHost, cho phép chúng ta cấu hình riêng biệt cho từng website
* 	conf.d: chứa các file config của riêng bạn, lưu trữ Server Block của mỗi trang web
* 	sites-enabled: chứa các tệp liên kết tới sites-available

Chúng ta hãy chú ý đến file nginx.conf là file config chính khi nginx chạy nó sẽ load file này và trong file này nó sẽ gọi các file khác trong các thư mục cần thiết vào thay vì viết tất cả trong 1 file khó quản lý. <br>
Như trong file nginx.conf dưới đây nó có load tất cả các file trong thư mục /etc/nginx/sites-enabled <br>
![image.png](https://images.viblo.asia/08f32066-30a5-40d6-8536-c9465f0c930e.png)

Nhưng ở trên rõ ràng mình có ghi thư mục **sites-available** sẽ chứa các file config VirtualHost tương ứng với 2 site web1 và web2 . Nhưng trong file cấu hình chính sao lại k load cái thư mục này mà lại load cái thư mục **sites-enabled** mà lại dùng thư mục **sites-available** ánh xạ sang ???  <br>
Đơn giản vì nó linh hoạt, bảo mật cũng như mình thích load file nào thì mình ánh xạ sang chủ động hơn rất nhiều mà nó vẫn toàn vẹn được dữ liệu so với load trực tiếp ở thư mục  **sites-enabled**. (Best practice)


**II. Tạo các thư mục chứa nội dung trang web**

Ở đây mình sẽ tạo ra 2 thư mục web1 và web2 nằm trong /data/webroot và mỗi thư mục chứa 1 file index.html tương ứng với nội dung bên trong là web1 và web2
![image.png](https://images.viblo.asia/93826213-065f-4ff0-8758-b9f1c4e3a2cb.png)

**III. Tạo file cấu hình tương ứng với 2 trang web** 

Tạo ra 2 file **web1** và **web2** nằm trong thư mục /etc/nginx/sites-available với nội dung 2 file như sau: <br>

**web1**
```
server {
        listen 80; # lắng nghe cổng 80
        root /data/webroot/web1; # thư mục gốc lấy nội dung
        index index.html index.htm index.nginx-debian.html;
        server_name web1.com; # nếu trùng cổng thì phân biệt bằng SName từ client gửi lên
        location / {
                try_files $uri $uri/ =404;
        }
}
```

**web2**
```
server {
        listen 80;
        root /data/webroot/web2;
        index index.html index.htm index.nginx-debian.html;
        server_name web2.com;
        location / {
                try_files $uri $uri/ =404;
        }
}
```
Sau đó thực hiện link (ánh xạ) chúng tới thư mục  /etc/nginx/sites-enabled bằng cách truy cập vào thư mục sites-enabled và thực hiện 2 câu lệnh sau: 
```
ln -s /etc/nginx/sites-available/web1 web1
ln -s /etc/nginx/sites-available/web1 web2
```
À ở bài thực hành này mình sẽ không ánh xạ default sang nên mình sẽ unlink nó bằng `unlink default` <br>

Nội dung trong 2 file trên mình cũng comment giải thích qua rùi các bạn chỉ cần hiểu luồng: <br>
ví dụ browser gõ web1.com -> nginx sẽ tìm lắng nghe cổng 80 nó sẽ trả về được 2 file cấu hình tương ứng ở trên chọn cái nào thì sẽ dựa vào **server_name** ->Sau khi chọn được thì nó sẽ lấy nội dung ở root và lấy file index.hml để hiển thị nội dung trả về browser. <br>
Chạy lệnh dưới đây để kiểm tra cú pháp có đúng không. <br>
```
nginx -t
```
Cuối cùng các bạn restart nginx để ăn cấu hình: <br>
```
service nginx restart
```
**IV. Tạo ra 2 host ảo trong file host** <br>
Ở đây do k có domain thật nên mình tạo 2 domain ảo là web1.com và web2.com trỏ đến 1 địa chỉ IP chứa webserver. <br>
Các bạn mở file host ra thêm 2 dòng:
```
<dia chi IP webserver> web1.com
<dia chi IP webserver> web2.com
```
À để lấy địa chỉ IP thì các bạn gõ `ifconfig` nhé. <br>
Oke vậy là xong rùi đó các bạn ra trình duyệt thử gõ web1.com và web2.com xem thành quả nào. 
## Sử dụng NGINX như một Load Balancer
Ở phần này các bạn sẽ qua [đây](https://kipalog.com/posts/Su-dung-NGINX-nhu-mot-Load-Balancer)  đọc và thực hành theo để hiểu cũng như nắm được cách hoạt động của Nginx  làm Load Balancer nhé vì thực tế nó được ứng dụng rất nhiều đó.<br> 
Bài viết cũng khá dài rùi. Mong rằng các bạn có thể hiểu thêm phần nào về các khái niệm về Nginx cũng như cách cấu hình nó.

**Tài liệu tham khảo**: <br>
https://vietnix.vn/nginx-config/ <br>
https://kipalog.com/posts/Su-dung-NGINX-nhu-mot-Load-Balancer <br>
https://viblo.asia/p/fordward-proxy-va-reverse-proxy-la-gi-va-chung-khac-nhau-nhu-the-nao-924lJpobKPM <br>
https://kipalog.com/posts/Su-dung-NGINX-nhu-mot-Load-Balancer