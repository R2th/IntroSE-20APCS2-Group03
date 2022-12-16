Chào các bạn!

Các bạn làm việc với HTML, HTML5 vậy đã từng nghe tới thuật ngữ **Semantic tag** hoặc **Semantic element** bao giờ chưa? Thực ra thuật ngữ này đã có từ rất lâu, ở cả các phiên bản HTML cũ chứ không phải chỉ tới HTML5 mới có. Vậy **Semantic tag** hay **Semantic element** là gì thì chúng ta cùng đi tìm hiểu qua khái niệm về nó nhé.


Trong ngôn ngữ học, ngữ nghĩa học là nghiên cứu về ý nghĩa của từ và cụm từ trong ngôn ngữ. Mỗi phần tử Semantic (phần tử ngữ nghĩa hay phần tử có ý nghĩa) đều mang một ý nghĩa riêng.

Bài học này sẽ giúp chúng ta hiểu rõ hơn về các phần tử Semantic và có thể giúp bạn thiết kế cấu trúc/giao diện của một trang web đẹp và rõ ràng hơn.

## 1. Semantic element là gì?

**Semantic element** là những phần tử mô tả rõ ràng ý nghĩa về cấu trúc của phần tử đó đối với các trình duyệt và lập trình viên. Nói một cách dễ hiểu hơn có nghĩa là chỉ cần đọc tên các element này là chúng ta có thể hiểu được nội dung bên trong element này nói về cái gì.

Ví dụ về một vài **semantic element** trong HTML bao gồm: **<a>**, **<form>, <table>**, **<img>**, **<h1> -> <h6>**,...

Ngược lại, có **semantic element** thì sẽ tồn tại **non-semantic element**. Vậy **non-semantic element** có nghĩa là gì? Hiểu theo một cách đơn giản nhất có nghĩa là những phần tử này không có mô tả rõ ràng về nội dung bên trong nó. Nếu chưa đọc nội dung mà chỉ nhìn vào bản thân element đó thì chúng ta sẽ không thể biết trước được nội dung của element này nói về cái gì

Ví dụ:  **div**, **<span>**

## 2. Browser support

![](https://images.viblo.asia/3a87a122-896a-4192-94e6-7d0bf700c40f.png)

Hầu hết các trình duyệt mới hiện nay đều support semantic element bởi vì bản chất semantic tag cũng là HTML hoặc HTML5. 

## 3. Semantic element trong HTML5
Hiện nay có rất nhiều website vẫn đang thiết kế dựa trên các mã HTML như sau: **<div id=”nav”> <div class=”header”> <div id=”footer”>** để tạo giao diện có menu điều hướng (**nav**), đầu trang (**heade**r) và cuối trang (**footer**).

Dưới đây, HTML5 cung cấp các phần tử semantic mới để xác định từng phần khác nhau của một trang web:

![](https://images.viblo.asia/170fc35c-3c55-44ec-baca-286f16e463ed.gif)

<article>, <aside>, <details>, <figcaption>, <figure>, <footer>, <header>, <main>, <mark>, <nav>, <section>, <summary>, <time>

Bây giờ, mình sẽ nói qua về 1 vài tag semantic trong HTML5 nhé.

### 3.1. Element <section> trong HTML5

**Element <section>** đại diện cho một phần chung có trong tài liệu hoặc ứng dụng.

Cụ thể hơn, một section là một nhóm các nội dung có cùng chủ đề.

Ví dụ: trang chủ của một trang web có thể được chia thành các section như giới thiệu, nội dung, thông tin liên lạc, góp ý… 

```
<section>
   <h2>Giới thiệu Framgia</h2>
   <p>Được thành lập vào tháng 10/2012, tại Hà Nội đến nay Framgia đã có ba chi nhánh tại Hà Nội, Đà Nẵng và TP. HCM và có mặt tại 5 quốc gia tại châu Á với gần 1000 nhân viên từ nhiều quốc gia trên thế giới như: Nhật Bản, Bangladesh, Cambodia, Nigeria, Kazakstan. Đạt tốc độ phát triển vượt bậc, từ khởi đầu chỉ với 5 thành viên, sau 5 năm Framgia Inc. đã trở thành là tập đoàn Offshore IT của Nhật Bản lớn nhất tại Việt Nam. </p>
</section>

<section>
   <h2>Sứ mệnh của Framgia</h2>
   <p>Với lý tưởng chung tay xây dựng nên một tương lai tốt đẹp và tươi sáng, sứ mệnh của Framgia là luôn cố gắng tạo ra những trải nghiệm thú vị khiến người ta phải thốt lên rằng “Awesome!” (Thật tuyệt vời), hoặc “Wow” hay “Crazy” (Thật không thể tin được)</p>
</section>
```

### 3.2. Element <article> trong HTML5
    
Element <article> được sử dụng cho các nội dung độc lập và chứa nội dung của riêng nó. Nội dung bên trong <article> có ý nghĩa riêng biệt và có thể độc lập với các nội dung khác của trang web.

Ví dụ: một số nơi bạn có thể sử dụng <article>:

Bài viết trên một Forum.
Bài viết trên một Blog.
Bài viết trên một tờ báo.

```
<article>
   <h2>FRAMGIA INC. – người bạn dẫn đầu xu hướng IT đến từ Nhật Bản</h2>
   <p>Được thành lập vào tháng 10/2012, tại Hà Nội đến nay Framgia đã có ba chi nhánh tại Hà Nội, Đà Nẵng và TP. HCM và có mặt tại 5 quốc gia tại châu Á với gần 1000 nhân viên từ nhiều quốc gia trên thế giới như: Nhật Bản, Bangladesh, Cambodia, Nigeria, Kazakstan. Đạt tốc độ phát triển vượt bậc, từ khởi đầu chỉ với 5 thành viên, sau 5 năm Framgia Inc. đã trở thành là tập đoàn Offshore IT của Nhật Bản lớn nhất tại Việt Nam.</p>
</article>
```

### 3.3. Mối tương quan giữa <section>  và <article>
    
Như các bạn thấy giữa <section>  và <article> có cấu trúc khá giống nhau. Vậy thì dựa vào chức năng của 2 element này, 1 câu hỏi đặt ra là **<article> nằm trong <section> hay ngược lại**?
    
Trong chuẩn HTML5, element<article> xác định một khối các nội dung hoàn chỉnh của nhiều phần tử liên quan liên kết với nhau.

Element <section> được sử dụng để tạo ra một nhóm các phần tử liên quan đến nhau.

Vậy chúng ta có cần  phải dựa vào chức năng các element để quyết định xem element nào phải nằm bên trong element nào hay không? Câu trả lời là: Không!

Trên mạng Internet, bạn có thể tìm thấy rất nhiều các trang web sử dụng element <section> để chứa các <article> và ngược lại.

Bên cạnh đó bạn cũng thấy nhiều trang web sử dụng  <section> chứa <section>và  <article> chứa  <article>.

VD về một trang báo mạng: Trong khu vực thể thao bao gồm nhiều bài viết thể thao, trong mỗi bài viết thể thao lại có một khu vực nói về kỹ thuật.

### 3.4. Element <header> trong HTML5
    
Element <header> xác định phần đầu của một trang tài liệu hay phần đầu của một đoạn. Nó được sử dụng như một containter chứa nội dung giới thiệu hoặc mở đầu.

Bạn có thể sử dụng một hoặc nhiều phần tử <header> trong một tài liệu.

Trong ví dụ dưới đây sử dụng một thẻ <header> bên trong một bài viết:

```
<article>
  <header>
    <h1>WWF làm gì?</h1>
    <p>Sứ mệnh của WWF:</p>
  </header>
  <p>Sứ mệnh của WWF là ngăn chặn sự xuống cấp môi trường tự nhiên của hành tinh chúng ta và xây dựng một tương lai trong đó con người sống hài hòa với thiên nhiên.</p>
</article>
```

### 3.5. Element <footer> trong HTML5
    
```
<footer>
  <p>Liên hệ với chúng tôi</p>
  <p>13F Keangnam Landmark 72 Tower, Plot E6, Pham Hung Road, Nam Tu Liem District., Ha Noi</p>
  <p>Thời gian làm việc: Từ 7h45 - 15:45h (Thứ 2 đến thứ 6)</p>
  <p>Hotline: 84-24-3795-5417</p>
</footer>
```

Ngoài ra còn rất nhiều semantic element khác trong HTML5 mà mình đã liệt kê ở trên.

## 4. Tại sao sử dụng các Semantic element trong HTML5?
Trong HTML4 và các bản cũ hơn, các lập trình viên thường phải tạo tên các thuộc tính riêng để thiết kế các phần như: header, top, bottom, footer, menu, navigation, main, container, content, article, sidebar, topnav…

Điều này khiến công cụ tìm kiếm không thể xác định nội dung có bên trong trang web chính xác.

Trong HTML5, các element như: <header> <footer> <nav> <section> <article> làm cho mọi thứ trở nên dễ dàng hơn rất nhiều.
    
Dưới đây là danh sách các yếu tố semantic mới trong HTML5:


| Element | Ý nghĩa |
| -------- | -------- | 
| <article>    | Xác định một bài viết/bài báo     |
| <aside>    | Xác định nội dung nằm bên cạnh nội dung của trang   |
| <details>    | Xác định các chi tiết mà người dùng có thể xem hoặc ẩn    |
| <figcaption>   | Chú thích cho thẻ <figure>     |
| <figure>     | Đánh dấu nội dung ảnh trong tài liệu   |
| <footer>     | Xác định phần cuối của một trang tài liệu hay một đoạn    |
| <header>     | Xác định phần đầu của một trang tài liệu hay một đoạn.    |
| <main>     | Chỉ định các nội dung chính của một tài liệu    |
| <mark>    | Xác định vùng đánh dấu/làm nổi bật văn bản     |
| <nav>   | Xác định một khu vực chứa các link điều hướng     |
| <section>     | Xác định một phần trong tài liệu  |
| <summary>    | Hiển thị tiêu đề cho phần tử <details>    |
| <time>     | Xác định ngày/giờ    |

## 5. Kết luận

Như vậy, qua bài viết này hi vọng các bạn có thể hiểu thêm được chính xác hơn về **semantic element** và sử dụng chúng một cách dễ dàng hơn. Nếu có thắc mắc cần giải đáp, hãy comment ở dưới bài nhé.

Chúc các bạn may mắn.