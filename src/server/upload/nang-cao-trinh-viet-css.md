Hầu hết ai cũng nghĩ CSS rất đơn giản và dễ học, đúng ngoại trừ... những cái khó ra. Nói vui vậy thôi nhưng hầu hết với lập trình viên thì việc học CSS lúc ban đầu đều thấy nó rất dễ vì nó chỉ là styling mà thôi, nhưng càng làm việc nhiều với CSS thì lại càng cảm thấy nó không hề đơn giản mà rất phức tạp là đằng khác.
<br>
Ở bài viết này mình muốn chia sẻ 4 điều để có thể nâng cao việc viết CSS và tránh những phiền toái không đáng có, cũng như tránh "phát rồ" khi muốn maintain những đoạn code CSS sau này: sử dụng semantics thích hợp, viết CSS theo module, lựa chọn cách đặt tên, và nguyên tắc đơn nhiệm (Single Responsibility Principle).
# Sử dụng semantics thích hợp
Trong HTML và CSS có một khái niệm gọi là semantic markup. Có thể hiểu một cách đơn giản, trong HTML thì việc sử dụng thích hợp semantics có nghĩa là sử dụng các thẻ tags thích hợp. Hãy cùng xem qua ví dụ dưới đây:
```
<!-- bad -->
<div class=”footer”></div>

<!-- good -->
<footer></footer>
```

Thêm một ví dụ nữa

```
<!-- bad -->
<div class="article">
  <div class="article_title">Smurf Movie Kinda Sucks</div>
  <div class="the_content">Not surprisingly, this weeks release of
     <div class="darkbold">The Smurfs</div> kinda sucks.</div>
</div>

<!-- good -->
<article>
  <h1>Smurf Movie Kinda Sucks</h1>
  <p>Not surprisingly, this weeks release of
     <b>The Smurfs</b> kinda sucks.</p>
</article>
```

Semantic HTML thì khá là đơn giản và có ngữ nghĩa. Tuy nhiên, semantic CSS thì hơi trừu tượng hơn 1 chút. Semantic CSS ở đây nghĩa là chọn tên class mà nó phải chuyển tải được ý nghĩa và chức năng trong class đó để làm gì. Hãy chọn những tên class đơn giản, dễ hiểu mà lại hiệu quả. Hãy chắc chắn là ko chọn trên class mà quá chi tiết. Bằng cách này, bạn có thể sử dụng lại những class đó ở một nơi khác. Để minh họa một tên class tốt, hãy xem một ví dụ dưới đây có ở trang Bootstrap:

```
<div class="card" style="width: 18rem;">
  <img class="card-img-top" src=".../100px180/" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

Từ đoạn code trên bạn có thể nhận ra được các cấu trúc, chức năng và ý nghĩa. Class cha là card, điều này ám thị đây sẽ là một block như một tấm thẻ nào đó. Trong class cha có 2 class con là `card-img-top` - nơi sẽ chứa hình ảnh và được đặt ở trên cùng và class `card-body` - nơi chứa nội dung bên trong. Và trong thẻ `card-body` này lại có thêm các thẻ con với những chức năng cũng đã được liệt kê rõ ràng ngay ở tên class. Có thể thấy rõ các thẻ cha và con quan hệ rõ ràng với nhau như thế nào. Hơn nữa nếu đặt theo tên class như vậy, bạn có thể dễ dàng tái sử dụng lại và có thể bê nó sang một trang khác, màn hình khác cùng với chức năng tương tự.

Mỗi lần viết một đoạn code hãy thử đọc lại mà không cần xem trên trình duyệt, xem là mình viết vậy đã ổn chưa, nó đúng ngữ nghĩa chưa. Việc viết semantic CSS là rất quan trọng, nó sẽ khiến cho người đọc code của bạn thấy dễ chịu cũng như sẽ làm cho bạn tránh gặp phải phiền toái khi muốn maintain hay chỉnh sửa đoạn code của mình sau này.

# Modularize

Ở thời điểm mà các ngôn ngữ "chia theo component" đang hot ví dụ như React chẳng hạn, thì Modularize là việc cực kì ưa chuộng. Vậy modularize là gì? Tại sao nó hiệu hiệu quả? Modularize nghĩa là module hóa. Còn tại sao nó hiệu quả thì hãy xem ví dụ dưới đây. Đây là một ví dụ từ trang Product Hunt. Hãy break các đoạn ra làm nhiều components khác nhau:

![](https://images.viblo.asia/83021474-2ae5-498d-bbb4-d95376fca6ce.png)

Ở hình trên có thể thấy có 3 thành phần được sử dụng lại nhiều tương ứng với 3 components.
```
<div class="stream">
  <div class="streamItem">
    <!-- product info -->
  </div>
</div>
```

Và với các components này có thể chia ra làm các component nhỏ hơn. 

![](https://images.viblo.asia/ab07a7a3-57ea-48f9-a23b-6eae72ebdf77.png)

Mỗi stream item có 1 hình ảnh thumnail và thông tin về sản phẩm

```
<!-- STREAM COMPONENT -->
<div class="stream">
  <div class="streamItem">
  
    <!-- POST COMPONENT -->
    <div class="post">
      <img src="thumbnail.png" class="postThumbnail"/>
      <div class="content">
        <!-- product info -->
      </div>
    </div>
  </div>
</div>
```
Bởi vì stream component thì đứng độc lập với các thẻ con và ngược lại, bạn có thể dễ dàng điều chỉnh cho Post component mà không làm cho Stream class có thay đổi đáng kể nào. Với việc "think in component" sẽ giúp cho những đoạn class của bạn được tách riêng ra khiến cho việc chỉnh sửa và maintain dễ dàng hơn bao giờ hết về lâu về dài.

Trước khi bắt tay vào style thì hãy để ý quan sát toàn bộ design, xem những đoạn nào trùng lặp, những đoạn nào có khả năng tái sử dụng lại được và đừng quên "think in component"

# Chọn cách đặt tên tối ưu
Có hàng tá cách đặt tên CSS hiện nay. Mình cũng đã một lần chia sẻ về điều này, các bạn có thể xem [tại đây](https://viblo.asia/p/lam-the-nao-de-quan-ly-css-don-gian-hon-1VgZvE47KAw)
<br>
Dưới đây là một vài naming convention nổi tiếng mà các lập trình viên thường sử dụng:

Object oriented CSS OOCSS <br>
Block element modifier (BEM) <br>
Scalable and modular architecture for CSS (SMACSS) <br>
Atomic <br>

Với riêng bản thân mình thì mình chọn BEM. BEM được viết tắt bằng các chữ cái đầu của block, element, và modifier

# Nguyên tắc đơn nhiệm (single responsibility principle)
Nguyên tắc đơn nhiệm là gì? Nghe có vẻ trừu tượng quá nhưng thực ra nó chỉ là mỗi một module hay class chỉ nên có "trách nhiệm" ở trên mỗi phần đơn lẻ trong một chức năng.
<br>
Ở ngữ cảnh là CSS, thì nguyên tắc đơn nhiệm nghĩa là một đoạn code, class, và module chỉ nên có một chức năng mà thôi. Khi áp dụng vào một tổ hợp các file CSS, thì hãy nhóm các file CSS có cùng chức năng, ví dụ như `carousels` hoặc `navigation bars`. Tất cả các file liên quan đến carousel component đều đượp group lại với nhau. Hãy cùng xem ví dụ dưới đây: 

```
/components 
  |- carousel
  |- |- carousel.css
  |- |- carousel.partial.html
  |- |- carousel.js
  |- nav
  |- |- nav.css
  |- |- nav.partial.html
  |- |- nav.js
```

In addition to separating component styles, it’s good to separate global style using the single responsibility principle. Hoặc một cách khác cũng được các lập trình viên sử dụng đó là nhóm chúng lại ở global style:
```
/base
  |- application.css 
  |- typography.css
  |- colors.css
  |- grid.css
```
Ở ví dụ này, thì những file này được nhóm lại ở folder base. Mỗi style sẽ đảm nhiệm một nhiệm vụ riêng nhưng có đặc điểm chung là phục vụ để style ở global. Bằng cách này, chẳng hạn bạn muốn update màu thì bạn có thể biết chính xác cập nhật ở đâu.
<br><br>
Vừa rồi là bài viết chia sẻ của mình về việc nâng cao trình viết CSS. Hy vọng qua bài viết này bạn sẽ không còn vướng vào rắc rối với CSS nữa. Chúc các bạn học tốt!
<hr>

Bài viết tham khảo tại [freeCodeCamp](https://medium.freecodecamp.org/leveling-up-css-44b5045a2667)