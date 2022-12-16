Compression là kĩ thuật tương đối đơn giản và hiệu quả để user tiết kiệm được bandwidth và tăng tốc cho website của bạn. Nhưng với cương vị là một `Web Developer`, bạn đã bao giờ tự tìm hiểu cách mà `gzip` làm việc hay chưa? hay là vì sao chúng ta lại phải sử dụng nó hay chưa?

# Why are we doing this?
Trước tiên chúng ta hãy xem cách mà `server` và `browser` nói chuyện với nhau. 
![Http request](https://images.viblo.asia/2f96f12a-9b33-4ba4-9b69-8ccd43368534.png)

1. **Browser:** Hey, **GET** me */index.html*
2. **Server:** Ok, let me see if *index.html* is lying around...
3. **Server:** Found it! Here your response code (**200 OK**) and I'm sending the file.
4. **Browser:** 100KB? Ouch...waiting, waiting...ok, It's loaded.

Tất nhiên là phía sau câu chuyện đơn giản này còn có nhiều vấn đề khác nữa nhưng trong khuân khổ bài viết này chúng ta chỉ cần đề cập đến bề nổi câu chuyện như vậy.
# So what's the problem?
Như ví dụ ở trên, `Browser` lấy được file mà người dùng yêu cầu, nhưng nó chưa tối ưu, `100KB` text là quá nhiều, và có một thực tế là `HTML` (hay người họ hàng của nó `XML`) là quá dư thừa. Mỗi tag như là `html`, `body`, hay `div` và các close tag của nó giống nhau nên chúng ta có thể thấy chúng ta đang dư thừa tài nguyên để lưu chúng. 

>  Và làm thế nào để giảm nhỏ file size lại? **Zip** nó!
>  
Nếu chúng ta có thể gửi file *index.html.zip* thay vì file *index.html* thì chúng ta sẽ tiết kiệm được bandwidth cũng như thời gian để `Browser` download file. 
`Browser` download file đã được `zip` giải nén ra, sau đó render lên lại cho `User`, website của bạn sẽ được tăng tốc đáng kể. 
![](https://images.viblo.asia/72755dc2-05c2-4ffb-bea3-c52ab453b4bb.png)

1. **Browser:** Hey, can I GET index.html? I’ll take a compressed version if you’ve got it.
2. **Server:**: Let me find the file… yep, it’s here. And you’ll take a compressed version? Awesome.
3. **Server:** Ok, I’ve found index.html (200 OK), am zipping it and sending it over.
4. **Browser:**: Great! It’s only 10KB. I’ll unzip it and show the user.

Công thức đơn giản: 
> **Smaller file = faster download = happy user**

# The (Not So) Hairy Details
Nhưng làm cách nào để `Server` biết mà zip file lại rồi gửi cho `Browser`? Có 2 bước thực hiện:

1. Browser gửi request kèm theo Header để nói rằng nó có thể nhận file đã nén
> Accept-Encoding: gzip, deflate
> 
2. Server ngay sau đó sẽ gửi nội dung đến cho `Browser` với Header thông báo rằng file nó gửi đi đã được nén lại:
> Content-Encoding: gzip
> 
Nhưng có một điều phải chú ý là: `Browser` sẽ yêu cầu `Server` nén data lại và gửi cho mình tuy nhiên không nhất thiết `Server` phải làm điều đó, nó có thể không nén data và gửi cho `Browser`, nó không bị bắt buộc phải nén data lại, đó chỉ là gợi ý mà `Browser` dành cho nó mà thôi.

# Setting Up The Server
Có một điều phải chú là chúng ta không control được việc lúc nào thì `Browser` gửi request kèm theo Header: 
> Accept-Encoding: gzip, deflate
> 
Nó có thể gửi hoặc là không.

Điều chúng ta có thể control là việc set up `Server` để nó có thể gửi lại data đã nén cho `Browser`.
Trong bài viết này mình sẽ trình bày cách setup `gzip` cho `Server` sử dụng `Nginx`:
```nginx
. . .
##
# `gzip` Settings
#
#
gzip on;
gzip_disable "msie6";

gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_min_length 256;
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;
. . .
```


> `gzip on;`
> 
Đầu tiên chúng ta bật `gzip` settings

>`gzip_disable "msie6";`
>
do một số trình duyệt không hỗ trợ `gzip` như `IE6` nên chúng ta sẽ disable nó đi 

> `gzip_vary on;`
> 
sẽ thông báo cho các proxies cache lại cả bản zip và bản gốc của resource

> `gzip_proxied any;`
> 
`Server` sẽ nén data lại bất kể là các request được gửi từ `proxy` thông qua Header: `Via`
> `gzip_comp_level 6;`
> 
có 9 levels được đưa ra (1-9) thể hiện mức độ data sẽ được zip lại, khi nén lại chúng ta phải chọn level cho phù hợp giữa size và `CPU`, nếu nén level quá nhỏ thì file được nén ít, nhưng nếu nén ở level quá cao thì tốn `CPU` để nén.
Với các file `ASCII` thì level cũng không khác level 9 là mấy, mà còn giảm được `CPU Usage`.
>`gzip_buffers 16 8k;`
>
Syntax cho settings này là: `gzip_buffers number size`
`number` thể hiện số buffers và `size` thể hiện kích thước của buffer. Thông thường, `size` sẽ có gía trị bằng một page size trong hệ điều hành. Về page size trong HDH thì bạn có thể tham khảo link:

[Page size in Computer Memory](https://en.wikipedia.org/wiki/Page_(computer_memory))

> `gzip_http_version 1.1;`
>
Chúng ta sẽ zip cho cả request sử dụng `HTTP/1.0` cũng như là `HTTP/1.1`
>`gzip_min_length 256;`
>
Không cần zip các response mà kích thước nhỏ hơn 256 bytes, giá trị mặc định là 20 bytes.
> `gzip_types text/plain...`
>
chỉ các `gzip_types` được liệt kê ra sẽ được nén lại. 

Chỉ với mấy dòng config đơn giản, giờ đây server `Nginx` của bạn đã được trang bị `gzip`, giúp tăng tốc đáng kể cho website của bạn.

# Conclusion
Việc tìm hiểu những cách khác để có thể tăng perfomance của một web application là rất thú vị. Mong rằng, lần tới mình sẽ đem đến cho các bạn các bài viết thú vị hơn nữa.