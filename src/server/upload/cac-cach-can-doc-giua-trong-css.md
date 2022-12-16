## Giới thiệu
Đã bao giờ các bạn thắc mắc cái thuộc tính vertical-align: middle trong CSS chưa? Rõ ràng tên nó là căn dọc giữa mà sao nó lại không căn dọc giữa cho mình chứ?
Nếu bạn chưa biết nguyên nhân vì sao thì mình sẽ giải đáp ngay trong bài viết này cho các bạn, còn nếu biết rồi thì... thôi đọc tiếp cũng được cho bõ công mình viết :D

## Vertical Align
Thuộc tính vertical-align là gì? Nó giúp căn dọc theo các chiều trên, giữa, dưới nhưng **không phải cho tất cả element**. 
Thuộc tính này thực chất bắt chước thuộc tính **valign** của table cell nếu dùng cho table cell và bắt chước thuộc tính **align** cho thẻ img. 
***2 thuộc tính valign và align này không khuyến khích sử dụng trong HTML5***

Demo:
{@embed: https://codepen.io/terry-do/pen/BvqZYo}

![](https://images.viblo.asia/f7bb38d8-292a-4cff-b05d-f13a36472143.jpg)

Như các bạn thấy, khi dùng vertical-align: middle cho các table cell **(hoặc mọi element có thuộc tính display: table-cell;)** trong table, nội dung bên trong cell đó sẽ được căn dọc giữa (giống valign) so với chiều cao bảng. Tương tự khi dùng cho img **(hoặc mọi element có thuộc tính display dạng inline)** nó sẽ căn dọc giữa theo các thành phần inline khác cùng 1 dòng (giống align của img).

Vậy nên nếu chúng ta dùng cho table cell hay các thẻ inline (img, span, ...) khác thì nó hoạt động chính xác, nhưng với các element khác thì không.

## Các giải pháp căn dọc giữa nội dung
Ta thường gặp 2 bài toán, đó là **Căn dọc giữa thành phần cùng 1 hàng** và **căn dọc giữa thành phần con trong thành phần cha.**

### 1. Dùng inline-block và vertical align
Ta set thuộc tính display: inline-block và thuộc tính vertical align cho các DOM ngang hàng. Phương pháp này là phương pháp cơ bản, hỗ trợ trên đại đa số trình duyệt.
Được dùng khi **căn dọc giữa các thành phần cùng 1 hàng (Danh sách, menu trang web, ...)**

```html
<style>
    .demo-div {
        display: inline-block;
        vertical-align: middle;
    }
</style>
<div class="demo-div">Thuộc <br> tính 1</div>
<div class="demo-div">Thuộc tính 2</div>
<div class="demo-div">Thuộc tính 3 <br> chiếm <br> 3 dòng</div>
```

Kết quả thu được :
![](https://images.viblo.asia/02410cb6-4915-489e-b73e-f263b9205952.jpg)

### 2. Dùng display table và table-cell 
Set thuộc tính display table cho khối nội dung cha và display table-cell cho khối nội dung dưới 1 cấp nội dung cha. 
Giải quyết nhanh chóng cả 2 bài toán **căn dọc các thành phần cùng 1 hàng** và **căn dọc khối nội dung con bên trong khối nội dung cha** 

Tuy nhiên, phương pháp này sẽ **khiến mọi thành phần căn dọc chỉ nằm được cùng 1 hàng (Không thể xuống dòng)** vì table-cell không thể xuống dòng. ( Làm gì có cái td nào xuống được dòng trong một cái tr chứ :v )

Demo: 
{@embed: https://codepen.io/terry-do/pen/BvqVXe}

### 3. Dùng Flexbox
Cực kì nhanh chóng, linh hoạt, và cũng khá dễ dùng nữa. Không những thế ngoài căn dọc ra, việc dùng flex cũng mang lại rất nhiều lợi ích khác nhờ các thuộc tính **align-items, flex-shrink, flex-grow, order,...** Giải quyết nhanh chóng **toàn bộ bài toán căn dọc**

*Nhưng nếu các bạn muốn hỗ trợ trên IE cũ, Safari cũ hay những trình duyệt proxy trên điện thoại như Opera Mini hay UC Browser thì đừng dùng flex. Bạn có thể tham khảo trên https://caniuse.com/#feat=flexbox*

```html
<style>
    .flex-wrapper {
      background: red;
      height: 300px;
      display: -webkit-box; 
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex; 
      display: flex;
      align-items: center;
      justify-content: center;
    }
</style>

<div class="flex-wrapper">
  <div style="background: blue">Flex 1</div>
  <div style="background: yellow">Flex <br> thứ 2</div>
  <div style="background: green">Flex thứ 3</div>
</div>
```

Kết quả thu được: {@embed: https://codepen.io/terry-do/pen/gZBKdB}

**Lưu ý dùng các prefix -webkit, -moz, ... để đạt hỗ trợ trình duyệt tốt nhất**

### 4. Dùng Pseudo Elements
*Phương án này sẽ hơi khó hiểu nếu bạn mới học CSS, và thường thì ta sẽ sử dụng phương án 2 thay vì phương án này*

Về căn bản, nó giống phương án 1: dùng thuộc tính inline block và vertical align. Nhưng nó có thể giải quyết thêm bài toán căn dọc giữa thành phần con trong thành phần cha

Ví dụ ta có code sau:
```html
<style>
    .post {
      background: orange;
      height: 200px;
      margin-bottom: 15px;
    }
</style>
<div class="post">
    <div class="post__content">
          <h2 class="post__title">Tiêu đề bài viết</h2>
          <p class="post__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni aspernatur aliquam dignissimos ab cumque labore maiores, rem, doloremque reiciendis saepe voluptatibus, quasi id officia fugiat ea quam pariatur ex fuga.
          </p>
    </div>
</div>
```

Vì chiều cao của div post__content sẽ cao bằng toàn bộ nội dung bên trong nó (~100px) nhưng div post lại cao 200px nên hiển nhiên nội dung sẽ không được căn giữa
![](https://images.viblo.asia/f31cd682-d3bf-45c5-97dc-e5782e3bc9ec.jpg)

Trong khối div class là post chỉ có 1 element là post__content, nhưng để áp dụng phương án 1 thì ta cần có ít nhất **2 element cùng cấp** ( căn dọc các thành phần inline cùng 1 hàng mà, nhưng chỉ có 1 thành phần thì sao căn được :v )

Ý tưởng của giải pháp này là ta thêm một pseudo element nữa trong div post (để nó có 2 element cùng cấp là cái pseudo element và cái div post__content đó), pseudo element đó sẽ có height là 100%, rồi set cho 2 chúng nó thuộc tính display inline-block cùng với vertical-align.

Minh họa ý tưởng
![](https://images.viblo.asia/539a34ad-18ad-4651-98b8-239e4cf4a24d.jpg)

Kết quả thu được
{@embed: https://codepen.io/terry-do/pen/KbGRrG}

### 5. Dùng Position Absolute
Ngoài 4 cách trên còn có 1 phương pháp nữa hơi ít phổ thông.

Ý tưởng là 
- set position: relative cho element cha
- set position: absolute, top: 50% và transform: translateY(-50%) cho element con

Khi để top 50% cho element con, nó sẽ cách từ phía trên element cha có position: relative khoảng cách là 50% chiều cao element cha. Khi đó elem con sẽ thụt xuống hơi quá nên chưa thật sự được căn dọc giữa.
![](https://images.viblo.asia/0f22b71b-2a15-4b0e-a8e8-6e2a91c270e4.jpg)
Sau đó ta cho element con dịch lên trên 1 nửa chiều cao của chính nó thông qua transform: translateY(-50%) **(Vì translate theo % sẽ tính theo chiều cao của element được áp dụng)**.
![](https://images.viblo.asia/23d2163f-8496-4bdc-b0be-9a3cab3ea604.jpg)

## Lời kết
Bài viết dựa trên những gì mình biết, nếu có sai sót hay khó hiểu mong mọi người bỏ qua và giúp đỡ :) Qua bài viết này mình chỉ muốn nói là:
*Mỗi phương pháp đều có cái hay và cái dở riêng. Vậy nên hãy phân tích và chọn ra phương án thích hợp nhất cho trường hợp của bạn nhé*

Cảm ơn các bạn đã đọc, hi vọng các bạn ủng hộ để mình có động lực viết tiếp ^^!