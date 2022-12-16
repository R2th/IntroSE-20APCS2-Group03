## 1. Mở đầu
Với một web developer, CSS chắc chắn là một điều gì đó rất thân thuộc, và không thể thiếu trong quá trình làm việc của họ. Đặc biệt là với một Front-end developer, thì CSS lại cực kì quan trọng. Viết CSS thì không khó, nhưng để tối ưu được CSS, nhằm giúp cho website của bạn có một trải nghiệm tốt hơn thì không hề dễ dàng. Bài viết này mình xin chia sẻ một vài cách nhanh chóng và dễ dàng để nhằm cải thiện hiệu suất CSS cho website của bạn.
## 2. Chém gió một chút về CSS
Cascading  style sheets - CSS mà mình đang nói tới chứ không phải CSS của một từ viết tắt nào khác cả, là ngôn ngữ được sử dụng để tạo các style cho website của bạn. CSS thường được biết đến và sử dụng sau khi bạn đã biết HTML. Với các bạn đi theo hướng Front-end developer, các bạn có thể tham khảo ở [LỘ TRÌNH TRỞ THÀNH LẬP TRÌNH VIÊN FRONT-END 2018](https://viblo.asia/p/lo-trinh-tro-thanh-lap-trinh-vien-front-end-2018-Az45bnBL5xY) <br>


CSS  được coi là "công nghệ nền tảng" của web bên cạnh HTML và Javascript. Vì vậy khi xác định theo con đường web developer, gần như 3 công nghệ đầu tiên bạn cần học đó là HTML, CSS và Javascript.  CSS thường được lưu trong các file có đuôi `.css` hoặc được viết trực tiếp trong các file HTML. Nó cho phép tách biệt giữa nội dung và cách thể hiện, hiển thị của nội dung trong website. Ví dụ khi bạn truy cập vào website bằng desktop sẽ khác với khi bạn vào bằng mobile.

## 3. Chém gió về CSS Performance và Website Speed
Khi đánh giá tốc độ của một website, có nhiều thước đo để đo hiệu suất, tuy nhiên có hai số liệu nổi bật nhất đó là TTFB - Time to first byte và TTSR - Time to start render.
Time to first byte có ý nghĩa rằng thời gian để byte đầu tiên mà client sau khi gửi request lên URL nhận được.
Với time to start render thì đó là thời điểm mà website bắt đầu hiển thị content cho client. 
Vậy có thể hình như sau, khi bạn request lên một URL, thì website sẽ nhận được request, sau đó nó bắt đầu trả dữ liệu, việc nhận dữ liệu hiển thị nội dung càng sớm thì chứng tỏ website đó đang hoạt động rất tốt và hiệu năng cao. Với TTFB thì nó phụ thuộc về server của bạn, còn với TTSR thì sẽ phụ thuộc vào cấu trúc CSS của bạn.  **Tin được không? Nhưng điều đó là thật.** Mình sẽ coi TTFB như là server, còn cốt lõi của TTSR chính là CSS. 

Mối liên kết giữa TTFB và TTSR ở đây có thể hiểu như sau:
>Trình duyệt của bạn sẽ không render cho đến khi nó nhận được data từ server, vì vậy nếu TTFB website của bạn chậm, chắc chắn nó sẽ làm cho thời gian hiển thị nội dung bị chậm theo (TTSR). Vậy nên trước hết bạn cần để ý đến server trước, tức là mọi thứ liên quan đến server của bạn, hãy tối ưu nó. Khi bạn đã cảm thấy ổn rồi thì hãy quan tâm đến việc tối ưu performance cho CSS.   


Với TTFB thì bạn có thể check tại https://www.bytecheck.com, còn Time to start render tại https://www.webpagetest.org/. 
## 4. Một vài tips nâng cao CSS Performance
Vậy là mình đã hiểu được lý do tại sao cần cải thiện CSS Performance rồi đúng không? Giờ đây mình sẽ tìm cách để thực hiện điều này. 

##### Use preload / HTTP/2 Push
The preload resource (tài nguyên tải trước) sẽ gợi ý cho trình duyệt việc của bạn việc lấy các tài nguyên về sớm hơn. Để làm được điều này, bạn cần set một số thuộc tính trong thẻ `link`:
```html
<link rel="preload" href="/css/styles.css" as="style">
```
<br>

##### Don’t inline everything
Tạm dịch: Không nên viết css inline vô tội vạ

Cái này mình thấy gặp khá nhiều, có rất nhiều lý do như kiểu quen kiểu, tiện tay...bla bla. Chốt lại là không nên. Đơn giản vì nó sẽ khiến cục HMTL của bạn sẽ to đùng lên, và như thế thì sẽ mất nhiều thời gian hơn cho TTFB. Hơn nữa, việc viết css inline sẽ gây ảnh hưởng khá nhiều và có thể bị đè css mà bạn không để ý. Bạn có thể tìm hiểu về thứ tự ưu tiên css đối với html sẽ hiểu vấn đề này. 

##### Concatenate and minify CSS
Ý nghĩa ở phần này là có những phần bạn cần sử dụng chung một style. Khi ấy bạn nên viết hết trong 1 file css duy nhất. Như vậy sẽ làm giảm đáng kể so với việc ở mỗi file bạn cần style bạn lại viết một lần. 

##### Reduce the size of your stylesheets
Khi các stylesheets được tối ưu và nhỏ hơn, trình duyệt sẽ không phải làm việc nhiều để thực hiện việc render webpage cho bạn. Do vậy, bạn nên cố gắng hết sức để loại bỏ các selectors css không cần thiết. Ngoài ra việc sử dụng các utilities class và tránh lặp lại css ở các đoạn selectors giống nhau cũng cực kì quan trọng. Với ultilities class thì nếu sử dụng bootstrap chắc chắn các bạn sẽ không lạ gì cả. 

##### Be selective of your selectors
Không nên selectors css với độ "sâu" lớn. Sử dụng css selectors một cách "nông" nhất có thể. Để làm được điều này bạn cần hiểu và viết một cách tối ưu cấu trúc DOM html và tuân thủ việc đặt tên các class sao cho hợp lý. Một gợi ý là quy tắc **BEM** hiện nay đang được nhiều người sử dụng và ưa chuộng.

##### Avoid expensive properties
Trong CSS có những thuộc tính khá nặng và hao tài nguyên. Vì thế cần hạn chế khi sử dụng:
- border-radius
- box-shadow
- filter
- :nth-child
- position: fixed;
- transform

Tất nhiên việc sử dụng thì chắc chắn rồi, nhưng nếu chúng cứ xuất hiện nhiều lần, thì điều này không nên một chút nào, hiệu suất CSS của bạn có thể bị ảnh hưởng.

##### Avoid `@import`
Tránh sử dụng từ khóa `@import` để include các external css, vì nó sẽ chặn việc tải xuống song song các tài nguyên CSS khác. Hãy luôn luôn sử dụng các thẻ liên kết. 

## 5. Tổng kết
Với một web developer, việc optimize và nâng cao performance của website là cả một vấn đề lớn. Có vô vàn cách, có vô vàn hướng, nhưng việc làm sao để cho người dùng một trải nghiệm tốt thì chưa bao giờ là dễ cả. Với một chút chia sẻ trong bài viết này, hi vọng sẽ giúp các bạn được một số tips nhỏ về kiến thức khi làm việc với CSS cũng như tối ưu trải nghiệm người dùng cho website. Bài viết của mình xin dừng lại. Cảm ơn các bạn đã quan tâm và theo dõi. 

Nguồn: https://www.keycdn.com/blog/css-performance