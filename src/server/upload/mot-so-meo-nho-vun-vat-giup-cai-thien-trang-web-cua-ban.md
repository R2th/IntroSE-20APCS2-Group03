### Mở đầu

Hôm nay mình xin phép giới thiệu một số mẹo nhỏ, linh tinh để tăng hiệu năng cũng như khiến trang của chúng ta thân thiện hơn một chút trong mắt google. Những điều mà trước đây mình không để ý đến cho lắm, nhưng khá hiệu quả....

### Để ý hơn đến các thẻ meta

Điều này thực tế chả có gì mới. Nhưng do thói quen làm bài tập lớn ở trường hoặc làm các trainning project chẳng hạn, chúng ta thường chẳng mấy khi để ý đến các thẻ meta này. Chỉ chăm chăm làm sao giao diện thành hình và các tính năng chạy ổn là được. Có chăng chỉ thêm thẻ meta `<meta name="viewport" content="...">` cho responsive.

Nhưng thực tế còn khá nhiều thẻ meta quan trọng, mà khi thiết kế database, cá nhân mình hay thêm trường và các input riêng cho các thẻ meta này. Ví dụ như với mỗi bài viết hay sản phẩm, mình thường thêm vào đó các trường như `meta_title` , `meta_descript`, `meta_keyword`... Điều này đặc biệt tốt để hướng đến việc SEO cho từng bài viết hoặc sản phẩm trên trang của bạn. Và khiến trang của bạn xuất hiện trên kết quả tìm kiếm đẹp hơn nữa. Dưới đây là một số thẻ mình hay thêm trường trong DB cho riêng nó:

**1.**  
   `<meta name="description" content="Mô tả về trang" />`

Thẻ này cung cấp một mô tả ngắn của trang.  Và nó thường được hiển thị như là một đoạn trích ngắn trên kết quả tìm kiếm của google như hình dưới đây (hình mình lụm được trên mạng):

![](https://images.viblo.asia/ed61eee9-dba9-4b00-a475-3c6cc6c79f18.png)

Khi người dùng tìm kiếm và trang của bạn xuất hiện trong kết quả tìm kiếm, việc có một thẻ meta description với nội dung mô tả ngắn chất lượng, góp phần thu hút người dùng click vào kết quả tìm kiếm để đi đến trang của bạn.

Độ dài tốt nhất cho thẻ meta description thường là 70 đến 320 ký tự

**2.**  `<title>` 

Thẻ `title`  này rất quan trọng, nhưng nhiều khi bị ngó lơ luôn. Ví dụ như dùng laravel blade chẳng hạn, nhiều khi các trang con mình hay extends luôn phần bên trong thẻ head của một trang base. Hậu quả là trang nào cũng có title y chang nhau (yaoming) 

Bạn tham khảo luôn ví dụ về thẻ title trong kết quả tìm kiếm ở hình bên trên nhé.

Còn một lưu ý là,  độ dài tối ưu cho title thường nên nằm trong khoảng 35 đến 65 ký tự...

<br/>

**3.** Thẻ `<meta name="keywords" content="abc, def ,xyz">`
Thẻ này định nghĩa các keyword mà người dùng tìm kiếm có liên quan đến nội dung trên trang của bạn. Ví dụ trang cuả chúng ta bán sản phẩm là nước mắm chẳng hạn:

`<meta name="keywords" content="nước mắm, nước mắm ngon , mua nuoc mam">`

....................
<br/>

Ngoài ra còn nhiều thẻ meta khác nữa, nhưng với mình, mình thường chú ý nhất đến các thẻ trên đây. Nếu trang của chúng ta không có content quá đặc sắc, hoặc kinh phí không đủ lớn để tung adwords thần chưởng ngày này qua ngày khác, thì việc chủ động tối ưu những phần như thế này mang đến nhiều ý nghĩa. Đặc biệt là khách hàng không phải ai cũng rành những chi tiết như thế này...

### Tận dụng công cụ test website

**PageSpeed Insights** 

Công cụ của google giúp bạn có thể đánh giá hiệu suất trang của mình, đồng thời còn phân tích và đưa ra đề xuất cho bạn một số điểm cần thiết để bạn có thể cải thiện trang của mình. Để đạt được điểm số cao của PageSpeed Insights hơi bị khó đấy nhé.

Mình đã ngồi mất hai ngày, để thử optimize từ config server đến optimize code các thứ. Cho cái trang của mình từ 72 điểm ban đầu, để xem liệu nó đạt điểm tuyệt đối của Google PageSpeed Insights được không. Và....

![](https://images.viblo.asia/5bd309c4-91e1-4491-8bce-c383725ea335.png)

(yaoming)

**sitechecker**  

Có rất nhiều trang cung cấp cho bạn chỉ cần search seo check là ra khá nhiều. **sitechecker** xuất hiện ngay đầu kết quả tìm kiếm nên mình chọn nó 

![](https://images.viblo.asia/bb715eb7-89e3-4e9d-b91e-98c8ff0f4a05.png)

Trang này sẽ duyện url bạn cần check. Đánh giá và chấm điểm trang của bạn cũng như đưa ra những cảnh báo, những điểm cần cải thiện để có được điểm số cao và thân thiện với SEO hơn.

### Nén tài nguyên của bạn từ phía server trước khi gửi nó tới trình duyệt

Thực ra mình bắt đầu tìm hiểu về vấn đề này bắt nguồn từ việc mình **PageSpeed Insights**  như đã nói ở trên cảnh báo:
```
Các tài nguyên dựa trên văn bản phải được phân phối ở định dạng nén (gzip, deflate hoặc brotli) 
```
Tư tưởng là trước khi phải hồi request từ phía browers, server thay vì render và gửi luôn cả file - ví dụ index.htm đến browser, thì lúc này server nén file index.html này lại rồi mới gửi.

Như kiểu chúng ta hay zip folder lại cho nhẹ trước khi đính kèm qua mail ấy, người nhận sẽ thực hiện giải nén file này ra sau khi nhận được file. 

Ở đây server đóng vai trò người gửi mail, nén content lại rồi sau đó mới gửi đến browser. Điều này giúp tiết kiệm băng thông cũng như tốc độc phản hồi request. Thường thì các trình duyệt hiện tại đều accept định dạng nén  gzip, deflate hoặc brotli từ phía server như hình bên dưới. Trừ các browser quá cũ...

![](https://images.viblo.asia/ca4ce39f-f081-4fbc-8be3-b29f76b6b179.png)

Việc nén này tăng hiệu năng đáng kể. Sau khi cấu hình gzip cho server và test lại trên **PageSpeed Insights**, điểm trang web của mình tăng vọt thêm 13 điểm. Điều mà mình khá chật vật trước đó optimize đủ thứ mà chỉ tăng lèo tèo vài điểm. Tuy việc này làm tăng thêm gánh nặng cho CPU server của chúng ta thêm một chút. Nhưng kết quả đạt được về mặt tốc độ khá là xứng đáng.

Đưới đây là cấu hình cho `nginx` của mình:

```
##
	# Gzip Settings
	##
	gzip on;

    gzip_vary on;
	gzip_proxied any;
    gzip_comp_level 6;
	gzip_buffers 16 8k;
	gzip_http_version 1.1;
	gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

```
<br/>
Phần này mình không dám lạm bàn quá sâu mà chỉ hướng dẫn cấu hình nén resource với nginx như trên. Bạn có thể tìm hiểu thêm quà một số bài viết trên chính Viblo của chúng ta:

[Cách tối ưu trang web của bạn với nén Gzip](https://viblo.asia/p/cach-toi-uu-trang-web-cua-ban-voi-nen-gzip-XL6lAwwRKek)

[Nâng cao hiệu quả nén Http response với Brotli compression](https://viblo.asia/p/nang-cao-hieu-qua-nen-http-response-voi-brotli-compression-m68Z03EAKkG)

...

### Cache lại được càng nhiều thứ càng tốt

Trước hết, trong quá trình code mình cache lại kết quả truy vấn vào redis. Điều này tăng tốc độ thực thi đáng kể. Bạn có thể xem qua bài viết hay ho này trên viblo với Laravel:

[Tăng tốc độ trang web sử dụng laravel với object caching](https://viblo.asia/p/tang-toc-do-trang-web-su-dung-laravel-voi-object-caching-gGJ59b6aKX2)

Ngoài ra ở phía server - nginx thêm dòng cấu hình cho `http caching` như dưới đây:

```
location ~*  \.(jpg|jpeg|png|gif|ico|css|js|woff2)$ {
            expires 365d;
}
```

Điều này thông báo cho trình duyệt cache lại các file với định dạng `jpg|jpeg|png|gif|ico|css|js|woff2`

Nói về HTTP caching thì bạn có thể xem qua bài viết này, khá là chi tiết. Mình xin phép không lạm bài ở nài viết này :kissing_heart:

https://viblo.asia/p/http-caching-6BAMYknzvnjz


### Tạm kết

Trên đây mình xin chia sẻ một số kinh nghiệm vụn văt của cá nhân mình. Dù còn một số thứ linh tinh nữa như tối ưu kích thước hình ảnh, phân bổ hình ảnh dưới các định dạng tối ưu hơn..nữa cơ. Nhưng mà bài dài quá rồi, mình xin khép lại tại đây đã. Mong nhận được sự góp ý của mọi người phía cuối bài viết nhé.

Cảm ơn bạn nhiều vì đã dành hời gian cho bài viết của mình....