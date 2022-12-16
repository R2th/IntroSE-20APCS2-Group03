Như đã đề cập trong [Lời mở đầu](https://viblo.asia/p/tang-toc-website-su-dung-page-cache-loi-mo-dau-gAm5y7pOZdb), trong phần này tôi sẽ đề cập tới cách thực hiện page cache đầu tiên đó là `Application Cache` - tôi tạm gọi như vậy, với ý nghĩa là thực hiện cache ngay trong web application.

Trước khi bắt đầu, hãy cùng tôi play một bản piano như là bạn vừa đọc vừa relax ha. Chỉnh âm lượng xuống nhỏ xíu còn 2-4% để còn hấp thụ được nội dung bài viết nhé! ^^

{@embed:https://soundcloud.com/relaxdaily/looking-back-how-did-i-get-here}

## Application cache

Hãy cùng làm rõ hơn về việc application cache - tạm hiểu là *cache tại tầng ứng dụng*. Nghĩa là bản thân web của bạn sẽ tự thực hiện công việc page cache. Phía backend sẽ có module để làm điều đó. Trong phạm vi của series này, tôi sẽ chỉ đưa ra giải pháp và demo trên hai loại web đó là Laravel và Nuxt.js. Bạn hãy tham khảo và làm tương tự nếu web của bạn không phải Laravel và Nuxt.js nha.

Nếu bạn code Laravel, chắc hẳn bạn đã biết module `Cache`. Còn với Nuxt.js, chúng ta có thể sử dụng module [@kimyvgy/nuxt-page-cache](https://npmjs.org/@kimyvgy/nuxt-page-cache) - Đó cũng là một cách triển khai page cache.

Như vậy, trong cách này thì chúng ta sẽ cần implement Cache Module, thường các framework thì cũng đều hỗ trợ sẵn. HTML Response sẽ được lưu vào cache storage bởi chính web app.

Không chỉ với Page Cache, phương án application cache cũng thường được sử dụng để cache lại một phần của ứng dụng. Chẳng hạn, trong website của bạn có nhưng trang thống kê. Nếu dữ liệu thống kê cần phải được truy vấn từ database và qua nhiều bước tính toán xử lý, bạn có thể cache lại phần data đã xử lý vào cache storage để giảm thời gian xử lý ở lần tiếp theo.

## Cache storage

Cache Storage - tạm hiểu là vùng lưu trữ dữ liệu được cache. Với việc cache ngay tại tầng ứng dụng, bạn có một số lựa chọn cache storage phổ biến và dễ dàng triển khai như:
- Memory (lưu vào RAM của server)
- File
- Memcached
- Redis
- Database: MySQL, MongoDB, Postgres...

Với mỗi cache thì đều có ưu điểm riêng, cá nhân tôi thì quả thật tôi cũng chưa lưu data cache vào trong database bao giờ. Nhưng đó cũng vẫn là một cách triển khai, do vậy tôi vẫn quyết định liệt kê ra như là ghi chú lại cho bản thân. Bởi đâu cũng sẽ có lúc tôi hoặc bạn sẽ chọn phươn án lưu cache vào DB thì sao. :)

### Memory cache

Lưu data cache vào memory là một phương án khá hay. Memory hay còn được biết tới là RAM của máy chủ.

Đặc điểm của phương án này đó là khi ứng dụng bị restart hoặc tiến trình bị kill hoặc khởi động lại server thì RAM sẽ bị xóa. Dó đó, các dữ liệu đã cache cũng sẽ không còn. Tuy nhiên thì bù lại, do lưu vào RAM nên tốc độ đọc ghi lại rất nhanh.

Nếu bạn có số lượng rất lớn các trang và cần lưu một lượng lớn data cache thì dung lượng RAM cần thiết cũng sẽ tăng lên. Nếu vô tình chiếm hết memory của server thì toang. Như bạn biết với server Linux, full RAM thì hệ thống chậm như rùa luôn. Thậm chí còn không truy cập được. Vậy có nghĩa là chúng ta sẽ scale (mở rộng khả năng đáp ứng) bằng cách tăng dung lượng RAM cho server.

Nói vậy thôi, nếu bạn đang lo sợ dùng memory cache tốn hết RAM thì chúng ta cũng có thể limit dung lượng memory cấp cho việc Cache được mà. :)

=> Tóm cái váy, nếu ứng dụng của bạn cần nhanh chóng thực hiện, ít trang, lưu ít data, hoặc nếu bạn có nhiều RAM trên server thì sử dụng memory cache cũng khá phù hợp mà lại có hiệu năng cao.

### Memcached

Lưu data cache vào Memcached cũng tương tự như phương án sử dụng memory cache. Chúng đều lưu data cache vào trong memory (RAM). Có điều, Memcached thì một service chạy độc lập để quản lý và tối ưu cho việc lưu dữ liệu. Bạn có thể tìm hiểu rõ hơn tại https://memcached.org. Như vậy, nếu bạn có nhiều web server, chỉ cần một con server chạy memcached lưu data nhưng cả 3 server đều có thể truy cập data đã lưu qua service memcached.

Memcached mặc địch sẽ chạy ở port 11211. Ngoài ra, do cũng lưu giống phương án trên là lưu dữ liệu vào memory của server nên khi restart thì dữ liệu đã lưu sẽ không còn tồn tại nữa.

### Redis

Tương tự memcached, Redis cũng là một service riêng biệt nhưng Redis ngoài việc lưu vào memory, nó còn có cơ chế lưu ra cả Disk. Chính bởi vì vậy nên dù có bị restart thì khi chạy lại, dữ liệu đã lưu trước đó vẫn tiếp tục tồn tại. Ngoài việc dùng là cache storage, Redis cũng có thể hoặc động như một database để lưu dữ liệu và có những chức năng hay ho khác. Bạn có thể đọc thêm tại https://redis.io.

Cả Redis và memcached đều cho tốc độ rất nhanh. Mình có cái link sưu tập về việc so sánh giữa Redis và memcached https://stackoverflow.com/questions/10558465/memcached-vs-redis, bạn cũng có thể truy cập để đọc thêm nha.

### File

Phương án này, data sẽ được lưu vào ổ cứng (disk) thay vì lưu vào RAM. Khi bị restart thì file vẫn còn nên dữ liệu cache trước đó vẫn tồn tại. Như vậy, nếu server có nhiều redis thì việc đọc ghi liên tục vào ổ disk sẽ tăng lên. Chất lương ổ cứng cũng ảnh hưởng một phần tới tốc độ. Mình vẫn recommend phương án lưu vào Redis/memcahed hơn.

## Tổng kết

Trên đây là phần tổng hợp qua một số lý thuyết về việc triển khai page cache theo hướng Application Cache và một số cache storage chúng ta có thể sử dụng. Trong phần tiếp theo, tôi và các bạn sẽ cùng bắt tay thực hiện việc triển khai chúng vào dự án. 

Nhìn chung thì, với application cache:
- Có thể cache một phần nào đó của app. Chẳng hạn cache lại kết quả của một đoạn code xử lý dữ liệu sau khi tính toán thứ hạng của thí sinh trong một cuộc thi trên Viblo Code kết hợp cùng với cả page cache.
- Có thể cache cho từng trang chỉ định.
- Có thể cache tùy theo logic của app. Chẳng hạn, tôi lấy ví dụ, bạn có thể dùng page cache chỉ cho user bình thường, không áp dụng cache với tài khoản quản trị viên.
- Có thể tùy biến TTL cho từng trang là khác nhau. Giả sử một trang đọc bài như Viblo: bạn có thể cấu hình trang Homepage: TTL 10 phút; trang đọc một bài viết: TTL 24 giờ.
- Có hiệu năng thấp hơn so với các phương pháp cache mà tôi sẽ đề cập trong cách phần sau như dùng Nginx hoặc là CDN server.

Phần tiếp theo: https://viblo.asia/p/tang-toc-website-nuxtjs-voi-page-level-caching-module-LzD5dMM4KjY

Hãy upvote và follow tôi để nhận thông báo khi có phần tiếp theo nha! Cảm ơn các bạn đã theo dõi!

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***