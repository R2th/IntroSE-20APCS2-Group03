Vẫn là chàng kỹ sư đi làm thợ xây ngày nào, hôm nay trở lại với câu chuyện xây dựng một hệ thống xử lý thumbnail cho ứng dụng của mình. Bonus theo đó là bản vẽ thiết kế của hệ thống lưu trữ và xử lý hình ảnh cho các ứng dụng hiện đại.

![](https://images.viblo.asia/f37c2811-cb4f-4b8c-8d2c-163f6982c3d3.jpg)

## First things first

Hế lô các bạn, chào mừng các bạn đã trở lại với một bài viết của **Minh Monmen**, chàng kiến trúc sư nhưng lại tốt nghiệp đại học kinh tế vẫn đang chật vật cày cuốc với công việc thợ code để kiếm cơm qua ngày. Chính vì chật vật kiếm cơm mà mình đã làm không từ công việc nào, từ thiết kế hệ thống cho tới code backend, code frontend, rồi cả cài cắm server, monitor hệ thống,... Kể ra thì làm cái nghề này cũng nhàn, 7 năm kinh nghiệm của mình cũng chỉ loanh quanh có mỗi mấy cái việc này thôi không có chi nhiều.

Hôm nay thì mình sẽ cầm tay chỉ việc cho các bạn để xây dựng một server xử lý thumbnail theo đúng tiêu chuẩn của một hệ thống lưu trữ và xử lý hình ảnh hiện đại nhé. Về mặt concept thì hệ thống nào cũng sẽ được thiết kế na ná vậy thôi. Chỉ có mỗi cái bên trong từng chỗ dùng phần mềm gì, lib nào thì sẽ khác nhau vậy thôi.

Giới thiệu nhanh vậy thôi. Bắt đầu nhé?

À bình tĩnh, trước khi bắt đầu bài viết thì các bạn hãy trang bị cho mình một chút kiến thức về những thứ sau đây để cho khỏi bỡ ngỡ:

- Docker và docker-compose (biết nó là gì và chạy được nó lên là đủ)
- Nginx và config cho nginx: Đây là kiến thức tối quan trọng, kể cả bạn có dừng ở đây không đọc nữa thì cũng nên trang bị cho mình kiến thức về nginx và cấu hình của nó nhé. Sẽ dùng được ở **rất rất nhiều chỗ** và làm được **rất rất nhiều trò** hay ho với nó đấy.
- Proxy, CDN,...: Cái này thì optional thôi, sau bài viết tìm hiểu sau cũng được.

Ok, bắt đầu thật này!

## Một thoáng system design

Trước khi đi vào chi tiết về việc setup thì hãy cùng nhìn qua việc một ứng dụng bình thường đang lưu trữ và phục vụ hình ảnh như thế nào nhé:

![](https://images.viblo.asia/4966d59a-7206-4308-a9f4-44608ef9650a.png)

Nhìn qua bức hình này thì chúng ta có thể chia hệ thống này ra 2 flow:

- **Flow 1**: User upload hình ảnh lên server, sau đó server sẽ xử lý hình ảnh và lưu trữ vào một nơi nào đó (có thể là local, có thể là cloud, có thể là cả 2). Flow này thường được thực hiện thông qua ứng dụng backend của các bạn để đảm bảo việc xử lý về authentication, authorization, validation,... của hình ảnh được thực hiện đúng và đủ.
- **Flow 2**: Hiển thị hình ảnh đã lưu trữ cho user thông qua việc serve file.

Với các ứng dụng hiện đại thì việc chạy trên container hay rộng hơn là những stateless application chạy trong các hệ thống distributed là rất phổ biến. Vì vậy, dần dần việc lưu trữ hình ảnh trực tiếp trên server được thay thế bằng những dịch vụ lưu trữ dạng block storage chuyên biệt cho file trên các cloud provider. Trong đó phổ biến nhất và gần như đã thống trị thị trường chính là hội S3-compatible storage, ví dụ như AWS S3, DigitalOcean Spaces, Google Cloud Storage, Azure Blob Storage,...

> Chỗ này đừng nhầm S3-compatible storage và Amazon S3 nhé. Khi mình nói tới S3, hay S3-compatible storage thì đang nói chung 1 hội storage có interface tương tự và tương thích với Amazon S3. Còn AWS S3 thì cụ thể chính là sản phẩm S3 storage của Amazon.

Chính vì nó thống trị rồi nên mình cũng không cần nói thêm nhiều chỗ này làm gì nữa mà cứ cho là các bạn đã quen thuộc với luồng thiết kế này rồi nhé. Chúng ta cũng không cần phát minh ra hệ thống gì quá cao siêu mà cứ thế làm thôi. Ai mà rủi có chưa rõ việc lưu trữ file trên S3 như thế nào thì đi google ngay và luôn nhé.

Sau khi lưu trữ được file trên S3 rồi thì cần serve file cho user và đây sẽ là chỗ mà chúng ta sẽ động tay động chân vào trong bài viết này. 

## Serve file từ S3 như thế nào?

Ô hay, tại sao còn phải nói về chuyện serve file từ S3 như thế nào làm gì nhỉ? S3 không phải nó có sẵn HTTP endpoint để serve file luôn rồi à? Không phải cứ lấy cái link đấy đưa cho user là xong hở?

Nope, mọi chuyện không hề đơn giản như vậy đâu các bạn trẻ. Nếu hệ thống của bạn chỉ là một blog cá nhân với vài hình ảnh minh họa chơi chơi cho bài viết, cùng với lượng người đọc khiêm tốn thì các bạn có thể lôi luôn cái endpoint của S3 đập vào mặt người dùng luôn mà chẳng phải suy nghĩ gì nhiều. 

Thế nhưng giờ bạn lại làm sản phẩm cho cả ngàn user, cả vạn lượt truy cập thì sẽ gặp phải mấy vấn đề sau:

**S3 là nơi lưu trữ gốc và nó thường ở 1 region xác định.** Ví dụ như S3 đặt ở Singapore đi, thế user châu Âu hay châu Phi vào thì tốc độ load lại là chậm ối zồi ôi luôn. Tưởng tượng đang hóng ảnh nóng mà lại bị như này:

![](https://images.viblo.asia/8e2046a0-ce25-4c0f-a0a2-ec35cdaadf35.png)

**Dung lượng ảnh gốc thì nặng, mà phí data transfer thì đắt.** Ví dụ 1 phép tính đơn giản:

- Hệ thống có 1k daily active user
- Mỗi ngày 1 user up 1 cái ảnh với dung lượng trung bình là 1MB (ảnh từ device của user thường khá nặng, cỡ 2-3 thậm chí 5-10MB)
- Mỗi user hàng ngày xem 100 cái ảnh 

Vậy số tiền để chi trả cho chỗ ảnh này là: (tính giá theo AWS S3 với region Singapore)

- Lưu trữ: **1k user * 1MB * 30 ngày = 30GB** 
~> **$0.025/GB/tháng = $0.9/tháng**, số này sẽ cộng dồn từng tháng nếu không xóa ảnh gốc đi
- Data transfer out: **1k user * 100 cái ảnh * 1MB * 30 ngày = 3TB**
~> **$0.12/GB/tháng = $360/tháng**, có thể trừ đi 100GB free data đầu tiên thì còn là ~ **$356/tháng**, tức là gần 9 củ khoai mỗi tháng. Khá là chát mà đấy mới chỉ là 1 user xem có mỗi 100 cái ảnh hàng ngày thôi đó.

**Ảnh gốc thì to, mà thiết bị của người dùng và vị trí hiển thị lại nhỏ**, thành ra vừa mất băng thông với thời gian chờ vừa nặng app. Tưởng tượng bạn load cái màn hình home của shopee mà ảnh sản phẩm nào cũng 1MB xem...

## Triển khai CDN

CDN (hay Content Delivery Network) là một tập hợp các server làm nhiệm vụ cache ở nhiều khu vực khác nhau, giúp giảm độ trễ về network tới user do ở gần user hơn. Ví dụ như dù AWS S3 của mình được đặt tại Singapore thì user tại Mỹ truy cập sẽ chậm nên giờ đặt 1 lớp AWS Cloudfront (chính là dịch vụ CDN) phía trước thì giờ user tại Mỹ sẽ được serve file từ Cloudfront ở Mỹ sau khi được cache, tốc độ load sẽ nhanh hơn rất nhiều.

![](https://images.viblo.asia/98c29a16-f82a-452b-9ee3-86585c1222fb.png)

Để serve ảnh thì ai cũng nghĩ tới CDN đầu tiên, tuy nhiên CDN chỉ giải quyết được vấn đề về tốc độ load của user do vị trí địa lý xa xôi chứ còn tiền data transfer thì vẫn thế, ảnh load về device của user thì vẫn to và phí như thế (dù là tốc độ cũng load nhanh hơn rồi).

## Thumbnail to the rescue

Lúc này thì lời giải cho những bài toán còn lại chính là việc tạo ra 1 cái ảnh với kích thước nhỏ hơn để vừa với kích thước hiển thị của user, hay còn gọi là **thumbnail** ấy. Ảnh nhỏ hơn thì đồng nghĩa với dung lượng nhỏ hơn, băng thông nhỏ hơn và tất nhiên là tốc độ hiển thị sẽ nhanh hơn rồi.

Có 2 cách để triển khai thumbnail:

**Generate trước**: Đây là cách truyền thống mà các service đời tống hồi xưa hay sử dụng. Cách này thì có một số đặc điểm:
- Tốc độ load thumb rất nhanh do thumb đã được tạo sẵn thành file tĩnh
- Tốn dung lượng lưu trữ do phải lưu trữ cả ảnh gốc và ảnh thumb
- Tốn thời gian và resource để generate thumb mà chưa chắc đã dùng đến
- Chỉ có thể support một số lượng ít kích cỡ và việc thêm kích cỡ sẽ khó khăn do phải generate lại toàn bộ ảnh.

Tất nhiên là hiện tại vẫn nhiều hệ thống sử dụng cách này, vì nó phù hợp với usecase mà số lượng kích thước ảnh rất ít và chắc chắn thumb sẽ được sử dụng ấy. Lúc đó thì chi phí compute ban đầu và lưu trữ sẽ không bị phí phạm.

**Generate khi cần**: Đây là cách mà đa phần các hệ thống hiện đại đều đang sử dụng. Tức là khi request user sẽ trực tiếp yêu cầu kích thước trên url và phía server sẽ generate thumb với kích thước tương ứng. Cách này thì sẽ có những đặc điểm trái ngược với cách trên:
- Tốc độ load thumb sẽ chậm do phải mất công tính toán, resize,... 
- Không tốn dung lượng lưu trữ do hệ thống lưu trữ chỉ lưu trữ ảnh gốc
- Chỉ generate thumb khi cần do đó sẽ không phí phạm nguồn lực generate
- Support nhiều loại kích thước và thêm bớt kích thước dễ dàng

Cách này phù hợp với đa phần các hệ thống cho phép user upload ảnh từ mạng xã hội, thương mại điện tử, content,... do vừa tiết kiệm được tài nguyên lưu trữ, tính toán vừa dễ thay đổi kích thước trong quá trình chạy. Điểm yếu duy nhất của nó chính là việc generate on demand sẽ lâu và tốn tài nguyên tính toán thì có thể chữa bằng cách cache lại kết quả generate (trên chính server generate) hoặc bằng CDN.

![](https://images.viblo.asia/77631452-8721-4fda-acd1-e56ce46b0c9e.png)

## Triển khai thumbnail service

Có rất nhiều giải pháp để triển khai thumbnail service cho các bạn. Từ dịch vụ sẵn của bên thứ 3 như Cloudflare Image Resizing cho đến các giải pháp self-hosted như thumbor, imaginary, imgproxy,... Trong đó thì nổi tiếng và nhiều tính năng nhất là thằng thumbor. Tuy nhiên mình không thích thằng thumbor cho lắm vì nó viết bằng python, ăn resource cũng kha khá và tốc độ chỉ tạm được. Mình thì chỉ cần 1 thằng nhanh, nhẹ với tính năng chính là resize thôi nên sẽ chọn thằng imgproxy.

> Imgproxy là thằng bắt trả phí để sử dụng nhiều advanced feature. Tuy nhiên mình thấy bản free phù hợp với nhu cầu resize đơn giản của mình rồi nên là vẫn đang xài tốt nha.

Cách tốt nhất để cài đặt imgproxy là với docker. Các bạn có thể dễ dàng cài đặt imgproxy lên k8s qua helm chart. Tuy nhiên trong bài viết này mình sẽ chạy demo cho các bạn với docker-compose nha.

```yaml
version: "3.9"

services:
  imgproxy:
    image: darthsim/imgproxy:v3.11
    restart: always
    environment:
      IMGPROXY_USE_ETAG: "true"
      IMGPROXY_TTL: "604800" # 1 week
    ports:
      - "8080:8080"
    networks:
      - common

networks:
  common:
```

Mặc dù đang lưu trữ image trên S3, tuy nhiên mình không sử dụng source S3 của imgproxy mà dùng source http để đỡ công config nhiều credential của AWS. Tất nhiên là nếu bucket s3 của bạn rất bảo mật thì có thể dùng source S3 với private bucket cho bảo mật.

Sau khi chạy `docker-compose up` thì mình có thể request một chiếc thumbnail với url sau: `http://localhost:8080/insecure/rt:fill/w:200/h:100/plain/https://dulichsinhcafe.com.vn/wp-content/uploads/2017/11/anhr-cafe-sapa.jpg`

Với các param:
- `insecure` là biểu thị url không có signature bảo vệ url
- `rt:fill` là viết tắt của `resizing_type` là `fill` (có thể là `fit` hoặc `auto`,...)
- `w:200/h:100` là kích thước width và height mong muốn
- `plain/https://...` là source http với đường link ảnh gốc

Các bạn thấy chiếc link này vừa xấu mà lại vừa không an toàn do ai cũng có thể generate ra cả. (Nên có thể hacker sẽ DDOS hệ thống của các bạn bằng rất nhiều kích thước khác nhau và xài chùa bằng source image của họ). Do đó mình sẽ đặt phía trước của imgproxy một con nginx để vừa bảo vệ url vừa cache lại những ảnh đã resize (phòng tránh việc resize lại nhiều lần).

```yaml
version: "3.9"

services:
  imgproxy:
    image: darthsim/imgproxy:v3.11
    restart: always
    environment:
      IMGPROXY_USE_ETAG: "true"
      IMGPROXY_TTL: "604800" # 1 week
      IMGPROXY_PRESETS: >
        thumbnail=rt:fill-down/g:sm
        ,200x100=w:200/h:100
    ports:
      - "8080:8080"
    networks:
      - common

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./default.conf:/etc/nginx/conf.d/default.conf:ro
      - ./cache:/data/cache
    restart: always
    networks:
      - common

networks:
  common:
```

Và config nginx với file `default.conf` như này:

```
proxy_cache_path /data/cache levels=1:2 keys_zone=images:20m max_size=10G inactive=30d use_temp_path=off;

server {
    listen 80;

    server_name _;

    client_max_body_size 1G;
    underscores_in_headers on;
    # Add new param here

    location ~* ^/\d+x\d+/.+ {
        rewrite /(\d+)x(\d+)/(.+) /insecure/thumbnail:$1x$2/plain/http://my.bucket.url/$3 break;
        proxy_pass http://imgproxy;
        include proxy_params;
        proxy_redirect     off;
        proxy_cache images;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        proxy_cache_background_update on;
        proxy_cache_lock on;
        expires           7d; 
        add_header        Cache-Control "public"; 
        add_header        X-Cache-Status $upstream_cache_status;
    }
}
```

Ở đây mình đã sử dụng thêm 1 tính năng là **preset** để define ra sẵn những kích thước mình cho phép resize, ngoài ra mình cũng định nghĩa sẵn đường dẫn tới bucket của mình để chống việc sử dụng chùa thumb server cho các nguồn ảnh khác. 

URL để request: `http://localhost/200x100/my-image.jpg`
URL gọi tới imgproxy: `http://imgproxy/insecure/thumbnail:200x100/plain/http://my.bucket.url/my-image.jpg`

Ngoài ra mình cũng đã cache lại những hình ảnh thành công trên chính thằng nginx với config `proxy_cache`.

> Tại sao ở phía trước mình có 1 lớp CDN rồi mà mình vẫn còn phải cache trên nginx ở server xử lý thumb làm gì? Đó là vì CDN thì có rất nhiều server, và mỗi khi 1 server miss cache sẽ lại gọi tới origin (chính là server thumb của mình) để lấy ảnh về. Do đó mình sẽ cache lại ở server thumb để tránh việc bị gọi generate 1 thumb nhiều lần.

## Một số kinh nghiệm khi triển khai

Tới hiện tại thì hệ thống lưu trữ ảnh của mình sẽ như thế này:

![](https://images.viblo.asia/2f6c53f1-1a67-437c-bcf5-29d37fe6bf77.png)

Sau đây là một số kinh nghiệm mình có được khi triển khai hệ thống thumb này:

**Nên tính toán kỹ chi phí data transfer** của cloud. Từ đó thì server thumb của các bạn sẽ có vị trí đặt tùy thuộc vào cách tính chi phí ấy. Ví dụ như AWS S3 free data transfer trong cùng region thì ta có thể cài server thumb trên AWS EC2 trong chính region chứa S3 để không mất tiền băng thông.

**Nếu server thumb ở khác region S3 thì sao?** Có nhiều trường hợp hạ tầng của các bạn đang tập trung ở 1 chỗ, S3 ở 1 chỗ khác và không cho phép setup server thumb gần với S3 thì có 1 cái trick để giảm tiền băng thông (và cũng giảm latency khi generate thumb nhiều kích thước) chính là đặt 1 con nginx cache trước S3 trong file docker compose. Thay vì imgproxy trỏ thẳng tới nguồn S3 thì sẽ trỏ tới con nginx được cài đặt `proxy_cache`. Các bạn sẽ giảm được kha khá việc truyền tải khi phải generate nhiều kích thước cho 1 file ảnh gốc đó.

**Tại sao mình lại hướng dẫn các bạn sử dụng bằng docker compose** mà không phải là k8s? Bởi vì từ việc các bạn cần setup server thumb gần với S3, cùng với việc các bạn có thể có nhiều nhà cung cấp S3 khác nhau thì việc cài đặt server thumb sẽ trở nên phân tán. Không phải ở đâu cũng có k8s nên việc chỉ dùng docker-compose sẽ giúp việc triển khai trở nên linh động hơn rất nhiều vì không phải cloud nào cũng có k8s hay có đủ điều kiện để cài 1 đống dependencies của k8s lên.

**Scale con server thumb thế nào?** Nếu hệ thống của các bạn cần xử lý một lượng lớn thumb on demand thì sẽ cần scale. Trước mắt là scale số instance của imgproxy đã. Mặc định thì imgproxy sẽ giới hạn số concurrent request là **2 * số core CPU**. Các bạn có thể tăng số lượng request đồng thời bằng cách chạy nhiều instance imgproxy trên 1 VPS với lệnh `docker-compose up -d --scale imgproxy=5` (5 là số instance imgproxy, nhớ map mỗi instance 1 port khác nhau nhé) hoặc tăng số VPS để chạy imgproxy trên nhiều máy.

**Có nên tạo nhiều loại kích thước cho thumb không?** Các bạn nên tạo một cách vừa đủ và thống nhất giữa mobile client cũng như web client. Tốt nhất là du di nhiều loại kích thước của nhiều client về một vài kích thước tiêu chuẩn. Ví dụ nếu client cần kích thước width=290, width=300 và width=310 thì có thể quy hết về ảnh có width=300 chẳng hạn. Như vậy thì số lượng kích thước cần define trước cũng ít hơn. Hơi cực nhưng mà nên define nhé đừng để client truyền thoải mái không là toang đấy.

**Nếu dùng thumbor thì sao?** Concept y hệt chỉ khác mỗi đoạn cấu hình, còn đâu mọi thứ từ cache đến security, cần lớp proxy nào proxy nào đều giống vầy cả thôi.

## Tổng kết

Qua bài viết này hy vọng các bạn đã có thể setup cho mình một hệ thống generate thumb xịn để phục vụ ảnh cho user tương tự như các ông lớn. Tất nhiên là khi làm cái này hãy cân đo đong đếm chi phí thật kỹ càng. Có nhiều giải pháp dùng dịch vụ có sẵn, gần như chả phải làm gì cả mà vấn đề duy nhất chỉ là tiền thôi.

Hết rồi. Nếu anh em có thắc mắc gì thì comment bên dưới và đừng quên upvote cho mình nhé. Bai bai!