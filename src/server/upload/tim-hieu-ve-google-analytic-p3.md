## 1. Mở đầu 
<hr>

Chào mừng các bạn đã quay trở lại với part 3 của bài viết `Tìm hiểu về Google Analytic`. Ở bài viết [trước](https://viblo.asia/p/tim-hieu-ve-google-analytic-p2-gGJ59N2xKX2), chúng ta đã tìm hiểu được một số khái niệm liên quan đến phần `Acquisition` như `Medium`, các loại medium, `Source`, `Channel` và phần thống kê cơ bản liên quan đến việc kết hợp giữa `Source/ Medium`. Trong phần tiếp theo này chúng ta sẽ cùng nhau tìm về phần `Behavior` hay báo cáo về hành vi trên trang của chúng ta

## 2. Behavior
<hr>

### a. All pages

Như bạn đã biết mỗi khi một đường link bất kì trên trang web của chúng ta được người dùng gọi đến thì lượt `pageview` của trang đó sẽ được tăng lên một. `GA` dựa vào thông tin này để hỗ trợ việc tính toán rất nhiều các thông tin khác nhau trên `GA` và cơ bản nhất đó là lượt xem :D. Chúng ta sẽ đến phần đầu tiên ở mục `Behavior/ Site Content/ All Pages`:

![](https://images.viblo.asia/659672b3-c6b7-4d88-96b5-616f433089e4.png)

Phần này sẽ cung cấp cho chúng ta nội dung như sau:

![](https://images.viblo.asia/eff16b39-9790-4770-918d-3c22dcfe9714.png)


Đầu tiên như bạn thấy chúng ta sẽ có thông tin về `URI` cụ thể trên trang web của chúng ta và cả tổng số lượt xem của trang đó. Trong trường hợp đường URI của bạn có dạng `/post/hashId` và bạn khó theo dõi cũng như hiểu được nội dung cụ thể thì bạn có thể click chọn `Page Title` ở ngay phía trên bảng. Sau đó trong bảng thống kê của chúng ta sẽ thay thế phần URI bằng tiêu đề trang web của trang web:

![](https://images.viblo.asia/d955a9a2-f8de-4171-9bd2-6843f886f8e7.png)

Đầu tiên như bạn thấy ở đây chúng ta có thể quan sát được tổng số `pageview` của từng trang trên web của chúng ta. Ngoài ra chúng ta nên quan tâm tới một số thông tin quan trọng khác như:
- `Avg time on page`: thời gian trung bình mà người dùng xem trang của chúng ta. Giả sử nếu trang đó có nội dung quan trọng như `Avg time on page` quá thấp thì chúng ta nên tìm hiểu nguyên do nội dung đó không được hấp dẫn hay không phù hợp hay có vấn đề nào khác. Còn trong trường hợp `Avg time on page` cao thì chúng ta có thể dùng những trang này làm hướng dẫn cho các trang sau này hoặc chỉnh sửa các trang khá
- `Bounce rate`: tỉ lệ thoát trang. Nếu trang của chúng ta có tỉ lệ thoát trang cao thì có thể hệ thống gợi ý bài tương tự trên trang của chúng ta không hợp lý hoặc cũng có thể do vấn đề nào đó khác. Dựa vào thông số này mà ta có thể nhanh chóng xác minh các trang có vấn đề

Dựa vào 2 thông số nói trên sẽ hỗ trợ ta trong việc phát hiện và giải quyết các vấn đề trên trang đó.c. Đối với `Bounce`

### b. Content Drilldowns

![](https://images.viblo.asia/6dac30ac-d7a1-4405-8b7f-4f2ec0c1a1a7.png)

`GA` sẽ tự động nhóm các trang của bạn thành các thư mục dựa trên `URI` của các trang. Ta có thể xem phần này ở mục `Content Drilldown`. Giả sử chúng ta là một trang web dạng blog với rất nhiều các category khác nhau, và mỗi đường dẫn đến một bài viết cụ thể trên trang của chúng ta có thể có dạng:

- `/technology/post/4v02n34`
- `/technology/post/4v02344`
- `/health/post/k6psd93`

Thì GA sẽ tự động nhóm được chúng thành các nhóm như `technology`, `health`, ... . Dưới đây là hình ảnh cho nội dung trong tab này :

![](https://images.viblo.asia/6ab6251a-5dc7-4c47-bd51-245701387de5.png)

Thông qua phần thông tin thống kê này ta có thể thấy được mức độ quan tâm cũng như lượt view của chúng ta đến từ nhóm nội dung nào và từ đó ta có thể tập chung phát triển cho phần nội dung đó hơn.

### c. Landing Pages

![](https://images.viblo.asia/e92d3df0-974b-4841-8ddc-6c6c78825be8.png)

![](https://images.viblo.asia/2d387688-b0bc-4b66-97ec-ad38ebe21c64.png)

Đây là phần thống kê liên quan đến trang nào của bạn là nơi người dùng truy cập vào đầu tiên khi đến với web của bạn. Ở đây bạn cần chú ý đến phần `Bounce Rate` vì nếu tỉ lệ này cao thì đồng nghĩa với việc nội dung mà bạn cung cấp trên trang đó đang không liên quan đến nội dung người dùng mong muốn hoặc nội dung của trang đang không đủ hấp dẫn để cho người dùng tiếp tục trên trang của bạn.

### d. Exit Pages

Đây là thống kê về những trang cuối cùng mà người dùng xem trước khi rời khỏi trang của bạn.

![](https://images.viblo.asia/557a5666-9580-4d39-95f6-ac5f98343ffd.png)

![](https://images.viblo.asia/2485fd4b-08d8-4de7-b6c3-56a28d4b07ff.png)

Nếu trang của bạn là một trang web bán hàng thì bạn nên định kì kiểm tra phần này vì nếu trang cuối cùng mà người dùng xem trước khi rời trang của bạn là trang giỏ hàng hoặc chuẩn bị thanh toán thì đồng nghĩa với việc người dùng đã không hoàn tất việc thanh toán mua hàng và bạn nên tìm hiểu xem lý do tại sao

### e. Page Timming

Perfomance là một trong những vấn đề rất quan trọng đối với mọi website vì theo nghiên cứu chỉ ra rằng chỉ cần page bạn load chậm hơn 1s thì cũng đồng nghĩa với việc bạn mất đi một số % user nhất định. `GA` cũng cung cấp cho chúng ta một tab dùng để so sánh thời gian load giữa các trang trên web của bạn là `Site Speed/ Page Timmings`:

![](https://images.viblo.asia/591cef29-7c3e-43d1-8132-856aa80ee256.png)

Ở đây đã hiện sẵn phần biểu đồ dùng để so sánh thời gian load trang đối với từng trang của bạn trên thời gian trung bình của toàn bộ trang web. Như bạn có thể thấy thời gian trung bình trên toàn trang đang là 4.34s. Những trang có thời gian load trung bình càng ở ở bên mức xanh lá cây nghĩa là đang load nhanh hơn thời gian trung bình còn đối với nhưng trang đỏ thì nó đang lớn hơn thời gian trung bình từng kia %. Bằng phần thống kê này bạn có thể kiểm tra các trang đang load quá lâu và có thể điều tra nguyên nhân. 

*Lưu ý: Ở phần này còn liên quan khá nhiều đến techstack bạn đang dùng là Server Side Render hay Client Side Render nên bạn cũng cần lưu ý phần này*

### f. Events

Đây là phần nâng cao trong `GA` vì nó đòi hỏi bạn cần phải tự set-up thêm các thứ khác trước khi sử dụng được thống kê ở phần này nên mình sẽ chỉ giải thích qua. Cơ bản thì đây là tính năng cho phép bạn có thể tracking các sự kiện cụ thể trên trang web của bạn. Ví dụ như có bao nhiều người bấm vào nút này, bao nhiêu người tải video của bạn về, bao nhiêu người bấm nút play video của bạn trên trang web. Bằng việc tạo ra các events này ta có thể tracking thêm rất nhiều các sự kiện mà người dùng tạo ra trên trang web của chúng ta để phục vụ cho các yêu cầu cá nhân.

## 3. Kết bài 
<hr>

Bài viết của mình đến đây là là kết thúc, cám ơn các bạn đã đọc và đừng quên để lại 1 upvote nhé :D.