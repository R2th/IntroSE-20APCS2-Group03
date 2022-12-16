Trong quá trình phát triển ứng dụng, có rất nhiều kĩ thuật và công nghệ giúp **nâng cao**, **cải thiện** hiệu suất và trải nghiệm của người dùng. Tuy nhiên trong quá trình phát triển một số kĩ thuật đã được `cấu hình` mặc định làm cho các lập trình viên thường dễ bị bỏ qua. Một trong số các kĩ thuật đó là `HTTP Cache`.

   `HTTP Cache` là một phương pháp được áp dụng phổ biến trên tất cả các trình duyệt web hiện đại, giúp cho việc triển khai kĩ thuật này trở nên đơn giản. Việc sử dụng hợp lí kĩ thuật này có thể giúp ích cho ứng dụng của bạn rất nhiều, **cải thiện thời gian phản hồi** về `client` và **giảm tải** các `request` cho máy chủ. Tuy nhiên nếu cấu hình không chính xác có thể khiến `người dùng` nhận về các nội dung **cũ** và khó để `fix bug`.
   
   Bài viết này sẽ chúng ta sẽ cùng đi tìm hiểu xem **HTTP Cache là gì ?** và **cách cấu hình chúng với một server thông dụng hiện nay là nginx.**
   
   Sau khi đã hiểu rõ về HTTP Caching chúng ta sẽ bắt tay vào việc triển khai chúng trên server để tối ưu hóa website. Nếu bạn lười theo dõi thì có thể nhìn kết quả sau khi mình đã **cấu hình caching đúng cách** để có động lực theo dõi tiếp.
   
   **Mặc định của server nginx**
   ![](https://images.viblo.asia/dc470b70-8271-44de-b9b6-e7d918d792c0.png)

**Sau khi đã customize**

![](https://images.viblo.asia/3ce166da-f54c-4a71-bcb6-01946410c788.png)

   
   # 1. HTTP Caching là gì ?
   
   **HTTP Caching** xảy ra khi trình duyệt lưu lại các bản sao của các tài nguyên(*ví dụ như cái file css, js, ảnh*) để phục vụ cho những request tiếp theo. Điều này giúp **giảm tả**i cho các máy chủ không phải xử lí quá nhiều request từ các `client khác nhau` và **cải thiện tốc độ của website** khi các **tài liệu được lấy về một cách nhanh hơn**, giúp người dùng có **trải nghiệm tốt hơn**.
   
   ![](https://images.viblo.asia/23c1c077-1151-44cf-81c9-9f1ab2527339.jpg)

Ví dụ như khi trang web của bạn cần tải một `file js`. Toàn bộ quá trình trao đổi giữa `client` và `server` sẽ diễn ra như sau.

**Client:** Lấy cho tao file js có tên app.js

**Server:** Đợi tao tìm đã, à có đây rồi, tao đã gửi về rồi nhé.

**2 phút sau**

**Client:** Lấy lại cho tao file app.js với, tao lại có việc cần dùng nó.

**Server:** Tao check thì file đó không có gì thay đổi, hãy lấy từ `Cache của trình duyệt` ra nhé.

Hay cùng một context trên nhưng thậm chí **client** còn không cần request hỏi server xem file đó có sự thay đổi hay không. Tức là **không cần phải request thêm bất cứ lần nào nữa lên server** vẫn có được file app.js như mong muốn mà không sự file đó **đã bị cũ** so với file trên server.

Để làm được việc đó, chúng ta cùng tìm hiểu tiếp các giải pháp Caching để xem làm thế nào có thể thực hiện được việc đó nhé?
# 2. Các giải pháp Caching
Về cơ bản thì dựa vào nguyên tắc hoạt động có `request` lên server để kiểm tra sự thay đổi không ? Chúng ta có thể chia ra làm 2 loại giải pháp.
* **Strong Caching Header**: `Expires` và `Cache-Control`.
* **Weak Caching Header**: `Etag` và `Last-Modified`.

Trong đó **Weak Caching Heade** là giải pháp *phải request lên server để check sự thay đổi của các tài nguyên*, ngược lại thì **Strong Caching Header** không phải thực hiện việc check request này.

## 2.1. Last-modified

Khi lần đầu tiên thực hiện việc request lên server để lấy tài nguyên(ví dụ như file logo.png). File này chưa được `cache` lại nên server trả về file logo.png kèm theo tham số `Last-Modified` ở response để xác định thời điểm cuối cùng thay đổi của file này.

Trong lần tiếp theo request lên server để lấy file logo này. Client gửi kèm tham số `If-Modified-Since`, là giá trị của tham số `Last-Modified` lần trước nhận được. Server kiểm tra tham số này nếu trùng với thời gian thay đổi trên server thì sẽ trả về code **304 Not Modified** để báo cho client biết file này không có gì thay đổi, có thể sử dụng file bản sao đã được lưu ở cache trình duyệt.

Cuộc trao đổi có thể được tưởng tượng như sau:

**Client:** *Lấy cho tao file logo có tên logo.png*

**Server:** *Tao gửi file logo kèm tham số **Last-Modified** lưu thông tin về lần thay đổi cuối cùng của file này*

**2 phút sau**

**Client:** *Kiểm tra cho tao sự thay đổi của file logo.png, tao thấy lần thay đổi gần nhất là ngày **Thứ 2, ngày 1/6/2015, lúc 2 giờ 57 phút** tao gửi lại cho mày qua header **If-Modified-Since**, nếu file có thay đổi thì gửi lại cho tao file mới, còn không thông báo giúp tao để tao lấy từ cache.*

**Server:** *Tao vừa so sánh thì không thấy sự thay đổi, tao gửi về code **304 Not Modified** để thể hiện điều đó nhé.*

Trên hình là ví dụ thực tế khi chúng tao F12 lên kiểm tra các `request header` và `response header`
![](https://images.viblo.asia/10c9d9b9-9b11-4e87-8a2e-00a7687c3653.png)

## 2.2. Etag

Tương tự như cách hoạt động của **Last-modified** nhưng Etag dùng một chuỗi kí tự để kiểm tra sự thay đổi của file tài nguyên thông qua **request header If-None-Match** và **response Header Etag**

Ví dụ thực tế khi ta F12 lên kiểm tra kết quả.

![](https://images.viblo.asia/eda78222-e191-4f45-87dd-09d79621604b.png)

Trước đây khi đọc về `Etag` mình có một thắc mắc như sau:

> Trên lí thuyết thì khi trên server check If-None-Match khi có một resquest header gửi lên thì sẽ check như thế nào ? Mình đoán server sẽ lưu lại cái Etag ở một chỗ nào đó để khi có request truyền lên sẽ lôi ra để check ?

Nhưng sau quá trình tìm hiểu thì **server không lưu lại giá trị Etag**. Đối với mỗi server sẽ tự implement thuật toán gì để tính Etag trong spec của HTTP . Việc này giúp cho server hạn chế được việc update Etag khi file có sự thay đổi.

## 2.3. Expires

Để khắc phục tình trạng phải request lên server kiểm tra sự thay đổi của file. **Expires** định nghĩa khoảng thời gian hết hạn của một file trong một khoảng thời gian nhất định. Để khi cần lấy một file, client chỉ việc kiểm tra file đó đã hết hạn hay chưa ? Nếu chưa thì có thể lấy luôn trong cache của trình duyệt.

Đơn vị xác định thời gian của `Expires` được tính bằng phút

> expires  5m; 

Xác định file này hết hạn trong vòng 5 phút. Mặc kệ client có request lên server hay không ?

## 2.4. Cache-Control
**Cache-control** linh hoạt hơn một chút so với **Expires**, ngoài xác định thời gian hết hạn của file, nó có cách option sau trong quá trình cấu hình.

#### No-store
Không lưu trữ bất cứ điều gì khi có request của máy chủ. Tức là mỗi lần có **request từ client**. Server chỉ thị không lưu bất thông tin gì trong cache trình duyệt. FIle được trả về theo cách thông thường.
> Cache-Control: no-store
> 
#### Cache but revalidate

Cache sẽ gửi yêu cầu đến máy chủ để xác thực trước khi tiến hành sao chép, lưu trữ trong trình duyệt.
> Cache-Control: no-cache

#### Private and public caches
**Public** cho phép file được cache bởi các Proxy và các server trung gian. Ngược lại **private**  chỉ cho phép file có giá trị khác nhau cho các Client khác nhau, Browser có thể cache nhưng Proxy thì không.


> Cache-Control: private
> 
> Cache-Control: public

#### Expiration
Đây là option quan trọng nhất trong việc caching với `Cache-Control`. 

> max-age=<seconds>
> 
**Max-age** là thời gian tối đa mà tài nguyên được coi là còn hạn sử dụng =)))
    
> Cache-Control: max-age=31536000
    
#### Validation
 Option này bắt buộc client phải validate với server trước khi sử dụng các file đã được caching.
>     Cache-Control: must-revalidate
 # 3. Cấu hình với Nginx.
  Như phần trên chúng ta thấy có tận 4 giải pháp khác nhau. Vậy lựa chọn giải pháp nào cho phù hợp, trước tiên chúng ta cùng điểm lại ưu nhược điểm của các các giải pháp trên.
    
Nếu như với cách chúng ta đã tìm hiểu ở trên thì có vẻ như **Strong Caching Header** tối ưu hơn khi **không phải request lên server để kiểm tra sự thay đổi của tài nguyên**. Nhưng lại có một nhược điểm sau.
    
 Ví dụ như khi cấu hình `Expires` 5 phút, **nhưng trong 5 phút đó, file cache đã bị thay đổi**. V**ậy là người dùng sẽ nhận được tài nguyên cũ**. Việc này gần như là một bug đối với **trải nghiệm người dùng**. 
    
  Để giải quyết được bài toán này, nhiều hệ thống đã thực hiện việc đánh **version file** thông qua một số kĩ thuật như *Laravel mix* để đánh dấu sự thay đổi của file ngay trong tiêu đề file. 
>     Version có thể là một thành phần trong tên file (VD: A.123456.js) hoặc có thể ở dạng query string (VD: a.js?v=123456).
    
    
Tuy nhiên không phải lúc nào dự án cũng áp dụng các kĩ thuật trên nên cần kết hợp giữa phương pháp `Strong Caching Header` và `Weak Caching Header` một cách hợp lí.
    
Đối với một trang web, mình sẽ chia ra file gồm các dạng sau.
    
* **File css, js:** Là những file thường xuyên thay đổi, vì vậy mình dùng giải pháp `Etag`
    
* **Đối với cái file ảnh, font chữ:** Là những file ít khi thay đổi, vì vậy mình đặt expires là 5 phút.
    
>   Đối với các server config mặc định Etag  caching cho tất cả các file nên khi customize lại chúng ta vào thằng file file config server nginx cấu hình như sau 
 ```php
    server {
    listen 80;
    server_name xxxxx; /Thông số đã được ẩn đi ahihi
    root xxxxx; //Thông số đã được ẩn đi

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;


    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~* \.(?:css|js)$ {
        access_log        off;
        log_not_found     off;

        etag on; // Bật chế độ cache Etag
    }

    location ~* \.(?:jpg|jpeg|gif|png|ico|xml)$ {
        access_log        off;
        log_not_found     off;
    
        expires           5m; // Bật chế độ cache expires
        add_header        Cache-Control "public"; // Caching cả cho proxy
    }
  

    location ~* \.(?:eot|woff|woff2|ttf|svg|otf) {
        access_log        off;
        log_not_found     off;

        expires           5m;  // Bật chế độ cache expires
        add_header        Cache-Control "public"; // Caching cả cho proxy
        add_header        Access-Control-Allow-Origin *;

        types     {font/opentype otf;}
        types     {application/vnd.ms-fontobject eot;}
        types     {font/truetype ttf;}
        types     {application/font-woff woff;}
        types     {font/x-woff woff2;}
    }

    location ~ /\. { 
        access_log        off; 
        log_not_found     off; 
        deny              all; 
    }
}
  ```
Sau khi cusommize ta thu về được kết quả cực kì thuyết phục :D
    Trước khi customize việc caching mặc định. Ta bật F12 lên -> **Tab Audits** chọn **Run audits**
    ![](https://images.viblo.asia/dc470b70-8271-44de-b9b6-e7d918d792c0.png)
    
> Performance của trang đang là 52
    
Sau khi customize theo config trên của mình kết quả thu được khá ấn tượng.
    ![](https://images.viblo.asia/3ce166da-f54c-4a71-bcb6-01946410c788.png)

Performance của trang tăng lên 72, trong đó các thông số về `First Contentful Paint`, `Speed Index`, `First Meaningful Paint` ... đều được cải thiện rõ rệt. Yayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy !!!!!
>   Performance của trang tăng lên 72

    
 # 4. Tổng kết
Như vậy là là chúng ta đã cấu hình thành công config `HTTP Caching` cho `server nginx`. Về cơ bản kinh nghiệm ở đây rút ra như sau.
    
* **File css, js:** Là những file thường xuyên thay đổi, vì vậy mình dùng giải pháp `Etag`
    
* **Đối với cái file ảnh, font chữ:** Là những file ít khi thay đổi, dùng **Strong Caching Header**
    
Cảm ơn mọi người đã theo dõi bài viết, nếu thấy bài viết hữu ích, ấn nút upvote và follow để mình viết bài thường xuyên nhé.
    
 Bài viết có  tham khảo:  
* [HTTP Caching via Viblo](https://viblo.asia/p/http-caching-6BAMYknzvnjz)
 * [Increasing Application Performance with HTTP Cache Headers](https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers)