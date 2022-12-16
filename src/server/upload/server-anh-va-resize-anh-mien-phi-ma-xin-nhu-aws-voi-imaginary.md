Tối ưu kích thước ảnh chính là một phần rất quan trọng trong việc tối ưu tốc độ website. Trang web của bạn sẽ không chỉ
cần một file ảnh với kích thước tối ưu mà sẽ cần nhiều kích thước khác nhau cho mỗi bức ảnh. Ví dụ như ảnh preview,
ảnh thumbnail, avatar...
Nhất là khi trang của bạn cho phép người dùng upload ảnh. Bạn thường sẽ không muốn sử dụng trực tiếp file ảnh siêu to
do người dùng upload lên mà sẽ dùng một bức ảnh đã được resize với kích thước phù hợp để đảm bảo tốc độ tải trang.

Một trang với nhiều content, ví dụ như Viblo chẳng hạn, có thể phải handle đến hàng triệu request ảnh mỗi ngày.
Bạn có thể dùng [Lambda@Edge và CloudFront](https://aws.amazon.com/blogs/networking-and-content-delivery/resizing-images-with-amazon-cloudfront-lambdaedge-aws-cdn-blog/) nếu bạn có nhiều tiền.
Hoặc là bạn có thể tự build một cái service giống thế mà không cần viết dòng code nào.

## Imaginary

[Imaginary](https://github.com/h2non/imaginary) là một cái microservice cho phép bạn thực hiện resize ảnh thông qua HTTP API.
Nó dùng [libvips](https://github.com/libvips/libvips), một trong số những thư viện xử lý ảnh nhanh và sử dụng memory hiệu quả nhất hiện có.

*Imaginary* hỗ trợ xử lý ảnh với định dạng JPEG, PNG và output với các định dạng JPEG, PNG và WEBP.
Hầu hết các thao tác xử lý ảnh phổ biến đều được hỗ trợ. Chúng ta có thể resize, crop, rotate, flip, blur, hoặc kết hợp
nhiều thao tác, hay thậm chí cả convert giữa các định dạng, hay lấy thông tin về ảnh (kích thước, định dạng, chiều xoay)...

Ảnh xử lý có thể là từ ảnh được lưu trên server, do người dùng upload thông qua API, hoặc là từ một URL của một dịch vụ khác.

Chúng ta sẽ dùng *imaginary* làm backend cho service xử lý ảnh.

## Cài đặt

*Imaginary* thì lại không có binary release hay cài đặt được từ package manager nào mà vẫn phải cài khá thủ công.
Tuy nhiên thì chúng ta vẫn có docker image nên để cho đơn giản thì trong bài này mình hãy dùng docker nhé.
Nếu bạn chưa biết gì về docker thì chịu khó đi tìm hiểu tí vậy :rofl:.

Đầu tiên, pull image về:

```sh
docker pull h2non/imaginary
```

Sau đó chạy:

```sh
docker run -p 9000:9000 -v <folder chứa ảnh của bạn>:/mnt/data h2non/imaginary -mount /mnt/data -enable-url-source
```

Nếu bạn muốn cho phép xử lý ảnh từ remote URL thì có thể thêm `-enable-url-source` vào cuối như trên.
Giờ bạn có thể dùng thử rồi. Ví dụ để resize 1 bức ảnh thì bạn dùng URL thế này.

```
http://localhost:9000/resize?url=<url>&width=400&height=400
```

Nếu file của bạn được lưu trên server thì bạn có thể thay param `url` bằng `file`.
Đường dẫn của file sẽ là đường dẫn tương đối với folder gốc mà bạn chỉ định ở trên. Ví dụ như này

```
http://localhost:9000/resize?file=cute_pic.jpg&width=400&height=400
```

Các thao tác xử lý khác như crop, fit... cũng làm tương tự.
Tất cả những thao tác được hỗ trợ và chi tiết các param bạn có thể xem ở [đây](https://github.com/h2non/imaginary#supported-image-operations).

## Config với Nginx

Chỉ cần chạy imaginary như trên kia là chúng ta đã có một service xử lý ảnh khá ổn rồi.
Nhưng có thể bạn vẫn muốn thay đổi một chút nữa. Đơn giản là muốn URL của ảnh trông dễ nhìn hơn một chút chẳng hạn.
Hoặc có thể bạn không muốn cho phép mọi người tùy ý sử dụng tất cả API như trên mà chỉ cho dùng những kiểu xử lý bạn muốn.
Nhưng quan trọng hơn là những tùy chỉnh để tối ưu service của bạn như load-balancing, caching...
Mình sẽ dùng nginx để làm một cái reverse proxy cho service của chúng ta.
Đầu tiên thì một config đơn giản thế này là đủ.

```conf
server {
    server_name images.localhost;

    root /path/to/image_dir;

    proxy_pass              http://imaginary/;
    proxy_intercept_errors  on;

    error_page 400 = @error;
    location @error {
        return 400;
    }

    location / {
        return 404;
    }
}

upstream imaginary {
    localhost:9000;
    # Thêm vào đây nữa nếu bạn có nhiều server nhé
}
```

Chúng ta đơn giản pass mọi request qua cho imaginary xử lý thôi. Thêm `root` ở folder chứa ảnh nữa để load được ảnh gốc.
Ngoài ra mình redirect những request lỗi tới trang lỗi của nginx để mọi người khỏi thấy được chi tiết lỗi của backend nữa.
Bạn có thể thêm nhiều instance khác của imaginary nếu có vào phần upstream để làm load-balancing.

Nếu bạn muốn thay đổi URL đơn giản hơn, ví dụ dạng `http://images.localhost/fit/<width>x<height>/cutie.jpg` chẳng hạn, thì
thêm config như thế này.

```conf
server {
    # ...

    if ($uri ~* "/(.+\.(jpg|jpeg|png|gif)$)") {
        set $filename $1;
    }

    location ~ ^/fit/(\d+)x(\d+)/ {
        expires 1y;
        proxy_pass http://imaginary/fit?width=$1&height=$2&file=$filename;
    }
}

```

Và nhiều kiểu nữa tùy ý bạn cài đặt. Ngoài ra còn 1 cái nữa cần lưu ý là `libvips` không resize được ảnh **GIF** nên bạn
có 2 lựa chọn là *1. Không resize* hoặc là *2. Output dưới dạng khác (không còn ảnh động đậy nữa)*.

Nếu muốn giữ nguyên ảnh gif và không resize bạn có thể làm như này để redirect request ảnh gif về ảnh gốc ở root.

```conf
server {
    # ...

    location ~* "\.gif$" {
        rewrite (?i)/(.+\.gif)$ /$1 break;
    }
}
```

Còn nếu bạn chọn output dưới định dạng khác thì tất cả API đều có thể thêm param `type=<type>` (ví dụ `type=png`) để output
ảnh dưới định dạng tùy ý. Ví dụ mình có thể làm như này.

```conf
server {
    location ~* "\.gif$" {
        proxy_pass http://imaginary/$uri$is_args$args&type=jpeg;
    }
}
```

## Dùng cache để tăng tốc độ load và tiết kiệm resource

Mỗi request tới server cần phải xử lý (resize, crop...) đều tốn tài nguyên của server.
Để có thể thực hiện vài nghìn hay vài triệu request mỗi ngày thì bạn nhất định cần có cơ chế cache.
Đơn giản nhất thì bạn có thể dùng Cloudflare. Cloudflare có thể giúp bạn cache tất cả ảnh và tăng đáng kể tốc độ tải.
Nếu bạn không dùng được Cloudflare thì với nginx cũng chẳng khó khăn gì.
Bạn chỉ cần đơn giản thêm mấy dòng như này là được rồi.

```conf
server {
    # ...
    proxy_cache_path    /var/cache/nginx keys_zone=image-cache:10m;
    proxy_cache         image-cache;
    proxy_cache_key     $uri;
    proxy_cache_lock    on;
}
```

## Tối ưu kích thước ảnh với WebP

**WEBP** là định dạng ảnh được khuyến khích sử dụng cho web vì kích thước nhỏ nên load nhanh hơn.
Nếu bạn dùng Cloudflare thì ảnh của bạn đã được convert sang định dạng webp mỗi khi có thể rồi.
Còn nếu bạn không dùng thì imaginary cũng có thể giúp bạn convert ảnh thành định dạng này.
Với tất cả API bạn đều có thể thêm param `&type=webp` để output ảnh với định dạng webp.
Mình sẽ thêm vài dòng nữa vào config của nginx như này nhé.

```conf
server {
    if ($http_accept ~* webp) {
        set $serve_webp "&type=webp";
    }

    proxy_pass              http://imaginary/$uri$is_args$args$serve_webp&stripmeta=true;
    proxy_cache             image-cache;
    proxy_cache_key         $uri$http_accept;
    proxy_cache_lock        on;
    proxy_intercept_errors  on;
}
```

Có vài browser chưa support webp (iOS Safari) nên chúng ta cũng cần check xem khi nào thì output webp bằng cách check
trong header `Accept` gửi lên có `image/webp` không thì mới output dạng webp.
`proxy_cache_key` cũng phải thay đổi 1 tí, thêm `$http_accept` để lưu cache khác nhau cho request support và không support webp.

Nhân tiện mình cũng thêm luôn param `stripmeta=true` để xóa bỏ metadata của ảnh, cũng sẽ giúp giảm kích thước ảnh một tí tẹo nữa.

## Thêm watermark để chống ăn trộm

Nếu trang của bạn thường xuyên bị người ta lấy trộm content về thì thêm watermark cũng là một cách hay để bạn bảo vệ content
của mình. Imaginary cũng hỗ trợ chúng ta làm cái này luôn nhé.
Để tạo watermark bạn có thể sử dụng API [watermark](https://github.com/h2non/imaginary#get--post-watermark) (watermark bằng text)
hoặc [watermarkimage](https://github.com/h2non/imaginary#get--post-watermarkimage) (watermark bằng ảnh).

Ví dụ như này

```
http://localhost:9000/watermark?file=file=cute_pic.jpg&text=©viblo.asia&textwidth=300&color=255,255,255&opacity=1&noreplicate=true
```

Như bạn vừa thấy thì API này chỉ giúp chúng ta gắn watermark thôi, để kết hợp vừa resize vừa watermark thì chúng ta cần dùng
API [pipeline](https://github.com/h2non/imaginary#get--post-pipeline) để kết hợp nhiều API với nhau.

Chúng ta vẫn có param `url` và `file` như trước, các API cần dùng sẽ được định nghĩa trong param `operations`.
`operations` sẽ là 1 *JSON string*, có dạng 1 array với mỗi object *operation* là 1 phần tử. Chi tiết bạn xem thêm document nhé.
Ví dụ như này

```
http://localhost:9000/pipeline?file=cutie.jpeg&operations=[{"operation":"watermark","params":{"text":"©viblo.asia","textwidth":300,"font":"sans bold 15","opacity":1,"color":"66,66,66","noreplicate":true}},{"operation":"fit","params":{"width":800,"height":800,"stripmeta":true}}]
```

Vậy là chỉ cần vài chục dòng config là bạn đã có một cái service resize ảnh khá xịn rồi :D.
Mà khả năng xử lý số lượng request cực lớn mỗi ngày chắc chắn không tệ tí nào đâu. Chúc bạn thành công.