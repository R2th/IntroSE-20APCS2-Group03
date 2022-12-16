## 1. Mở đầu

<hr>

Đối với các bạn làm Web Developer ở phía Front-end hay Back-end chắc hẳn không còn xa lạ gì với khái niệm **Web Responsive Design (WRD)** nữa, nó là một phương pháp giúp cho trang web của bạn có thể hiện thị tốt trên các loại màn hình khác nhau như Desktop, Laptop, Tablet hay Mobile. 

![](https://images.viblo.asia/db9f92fe-5593-4a12-bffa-604e54d0af42.jpg)

**WRD** giường như tồn tại trong mọi website mà bạn truy cập hàng ngày và cũng như trong mọi sản phẩm web mà bạn tham gia phát triển. Trước đó mình làm chủ yếu với Back-end bằng Laravel  tuy nhiên gần đây mình có cơ hội tham gia làm responsive cho giao diện web và đã thử đang thực hiện **WRD** theo hướng cả hai hướng **Mobile First** + **Desktop First**. Sau khi tìm hiểu kĩ hơn thì hiện tại mình đã chuyển theo phương pháp duy nhất là **Mobile First** vì những ưu điểm mà theo mình nó mang lại nhiều hơn so với **Desktop First**. Bài viết này của mình sẽ chia sẻ với các bạn những điều mà mình tìm hiểu về cả hai được.

## 2. WRD

<hr>

Đầu tiên chúng ta sẽ cùng nhau tìm hiểu về sự khác nhau trong việc phát triển **WRD** theo lần lượt **Desktop First** và **Mobile First**. 

### a. Desktop First

Đối với phương pháp **Desktop First** giao diện của bạn sẽ được ưu tiên code sao cho phù hợp với màn hình Desktop của bạn trước rồi sau đó mới tiếp tục thêm code CSS mới vào bằng **@media query** sao cho giao diện và bố cục trang web của bạn phù hợp với các màn hình bé hơn lần lượt là Laptop, Tablet và Mobile. Quá trình phát triển sẽ có dạng như sau:

![](https://images.viblo.asia/3893ea74-525a-4de9-a203-5ab391d637f9.PNG)

Giả sử chúng ta có một đoạn code HTML và CSS đơn giản như sau [(link tham khảo)](https://codepen.io/quang-huyy/pen/WmJgaL?editors=1100#0):
```html
<!DOCTYPE html>
<html>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<body style="margin: 20px 50px">

<h2 class="title">Setting the Viewport</h2>
<p class="content">This example does not really do anything, other than showing you how to add the viewport meta element.</p>

</body>
</html>
```
```css
.title {
  color: red;
}
.content {
  color: blue;
}
@media only screen and (max-width: 1024px) {
  .title {
    color: orange;
  }
  .content {
    color: aqua;
  }
}
@media only screen and (max-width: 768px) {
  .title {
    color: brown;
  }
  .content {
    color: green;
  }
}
```

Đối với phương pháp **Desktop First** chúng ta sẽ sử dụng thuộc tính **max-width** như bạn thấy trong đoạn code CSS. Hay nói cách khác, giao diện của chúng ta sẽ thay đổi nếu chiều rộng (width) của màn hình hiện tại nhỏ hơn hoặc bằng các **break point**, mà chúng ta đặt ra ở trên. Các **break point** bạn có thể hiểu chính là chiều rộng (width) của màn hình mà chúng ta muốn giao diện thay đổi và ở đây sẽ là này lần lượt là `1024px` và `768px`. Kết quả đoạn code trên sẽ cho ta kết quả như sau:

- Ở màn hình Desktop giao diện sẽ có dạng:

![](https://images.viblo.asia/e95956e6-fca3-4d8c-a6ac-16f51dbe070d.PNG)

- Khi màn hình của chúng ta chạm **break point** đầu tiên hay nói cách khác có động rộng nhỏ hơn hoặc bằng với 1024px thì sẽ có dạng như sau:

![](https://images.viblo.asia/549ba9aa-4334-4749-b16f-abe7eec9de1f.PNG)

- Và cuối cùng khi chạm **break point** cuối cùng là chiều rộng màn nhỏ hơn hoặc bằng 768px sẽ có dạng như sau:

![](https://images.viblo.asia/bbe9b9d1-e7a7-48a9-b31b-29698cdc49c4.PNG)

Với cách làm nói trên thì với màn Desktop hay có thể nói là mặc định thì tiêu đề và nội dung sẽ có màu đỏ và xanh lục. Với màn hình nhỏ hơn nó cụ thể ở đây có thể coi là màn Tablet (<= 1024px) thì tiêu đề và nội dung sẽ có màu cam và xanh nhạt hơn. Và cuối cùng ở màn hình Mobile (<= 768px) sẽ có màu nâu và xanh lá cây.

### b. Mobile First

Ngược lại đối với **Desktop First** thì ở phương pháp này, giao diện web của bạn sẽ được thực hiện theo hướng từ thiết bị có màn hình nhỏ (Mobile) rồi mới đến các thiết bị có màn hình lớn hơn lần lượt là Tablet, Laptop và Desktop. Tương tự với **Desktop First** thì chúng ta cũng sẽ sử dụng **@media query** của CSS để thực hiện quá trình này. Cụ thể nó sẽ như sau:

![](https://images.viblo.asia/1ffa9a75-37cb-4020-bdde-2146f63d905c.PNG)

Chúng ta sẽ sử dụng lại ví dụ giống như trên và chỉ thay đổi lại 1 chút như sau [(link tham khảo)](https://codepen.io/quang-huyy/pen/rRvqxL):
```html
<!DOCTYPE html>
<html>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<body style="margin: 20px 50px">

<h2 class="title">Setting the Viewport</h2>
<p class="content">This example does not really do anything, other than showing you how to add the viewport meta element.</p>

</body>
</html>
```
```css
.title {
  color: brown;
}
.content {
  color: green;
}
@media only screen and (min-width: 768px) {
  .title {
    color: orange;
  }
  .content {
    color: aqua;
  }
}
@media only screen and (min-width: 1024px) {
  .title {
    color: red;
  }
  .content {
    color: blue;
  }
}
```

Đối với **Mobile First** ta sẽ sử dụng thuộc tính **min-width** thay vì **max-width** như **Desktop First**. Lúc này giao diện của chúng ta cũng sẽ thay đổi khi chạm các **break point** cụ thể nếu màn hình của chúng ta có độ rộng (width) lớn hơn hoặc bằng các **break point** mà chúng ta đặt ra thì (768px, 1024px). Khi bạn chạy đoạn code trên sẽ thấy kết quả thu được giống hệt với phương pháp đầu tiên :D :D :D chỉ có điều cách làm ngược lại.

Nói chung với mỗi phương pháp sẽ khác nhau như sau:
<br>

**Desktop First**:
- Sử dụng `max-width`
- Giao diện thay đổi khi độ rộng màn hình nhỏ hơn hoặc bằng `break point`
<br>

**Mobile First**:
- Sử dụng `min-width`
- Giao diện thay đổi khi độ rộng màn hình lớn hơn hoặc bằng `break point`

## 3. Tại sao Mobile First ?

<hr>

Như ví dụ mình đưa ra ở trên, bạn có thể thấy chúng ta sẽ thu được kết quả giống hệt nhau thế thì câu hỏi đặt ra là tại sao lại chia ra làm hai hay tại sao lại là **Mobile First**.

### a. Số lượng thiết bị Mobile

Ngày nay số lượng các thiết bị di động được sử dụng ngày càng nhiều lên so với thiết bị desktop. Điều này đơn giản là do sự tiện dụng bởi ta có thể mang theo một chiếc điện thoại di động mọi lúc mọi nơi và truy cập vào internet tức thì. Còn đối với Desktop thì việc này thì không thể, hãy tưởng tượng ta phải luôn vác theo 1 màn hình và 1 cái case máy tính cùng đống dây dợ lằng nhằng xem.

![](https://images.viblo.asia/d302761b-cdc9-4109-9c03-344841b15a49.jpg)

Chính vì lý do này mà số lượng thiệt bị Mobile càng ngày càng tăng đồng nghĩa với việc truy cập internet từ Mobile cũng tăng nên sẽ không có gì lạ nếu người dùng truy cập vào website của bạn từ Mobile nhiều hơn so với các thiết bị khác. Mình có xin được một bức ảnh thu được từ Google Analytic về lượng traffic truy cập vào trang web của bạn mình và kết quả nó như sau:

![](https://images.viblo.asia/f41ade49-81e4-437d-a3d5-3ba44f5d03ed.png)

Như bạn thấy lượng truy cập vào từ Mobile là tận **77.4%** so với Desktop chỉ có **17.9%**, một khác biệt khá lớn. Vì thế ngay từ đầu nếu bạn đi theo con đường Mobile First thì sẽ tối ưu rất nhiều cho các thiết bị Mobile.

### b. Tối ưu nội dung

Đối với mỗi trang web chúng ta có thể thấy chứa rất nhiều nội dung khác nhau nằm trong nó. Với màn hình desktop rộng lớn, ta có thể cho vô vàn các nội dung, các thành phần khác nhau như sidebar, slider, .. để tăng lượng thông tin xuất hiện trên màn hình của chúng ta:

![](https://images.viblo.asia/c0eff0b8-1697-4183-be80-269ffadb71df.PNG)

Tuy nhiên khi màn hình của chúng ta bé đi rất nhiều, cụ thể là kích cỡ màn chỉ còn một nửa hoặc 1/6 kích cỡ ban đầu thì chắc chắn chúng ta sẽ cần phải tối ưu hóa lại nội dung, tối ưu hóa lại các thành phần xuất hiện trên trang web bằng cách xóa cái nọ bỏ cái kia và cân đo đong đếm xem trong đống nội dung trong màn hình chỗ nào cần chỗ nào không. Việc bạn mất công thêm thắt đủ các thứ vào cái màn to kia để cho nó là `hoàn hảo` trong mắt bạn rồi lại phải xóa dần đi thì thật khó chịu :(. Nhưng với phương pháp **Mobile First** thì ngay từ đầu màn hình chúng ta chỉ có kích thước vỏn vẹn khoảng 320px chiều rộng nên tất nhiên chúng ta sẽ cần phải tập chung vào nội dung cũng như các thành phần quan trọng nhất mà người dùng mong muốn và có thể chưa cần suy nghĩ đến các thứ màu mè khác.

![](https://images.viblo.asia/65915526-df04-4e00-967d-b683e77d6d80.PNG)

Sau đó khi phát triển lên các màn hình tiếp theo, ta có thể thoải mái hơn khi thêm các nội dung mới hay các thành phần mới như slider, side-bar vào.

### c. Hạn chế lỗi

Như bạn biết tới thời điểm hiện tại, số lượng các thiết bị với kích cỡ màn hình khác nhau là nhiều vô cùng và chúng ta không có cách nào để code giao diện với **break point** phù hợp với từng màn hình một

![](https://images.viblo.asia/6e930125-151a-43d4-ab68-90af9e02dfd3.jpg)

Với ví dụ đơn giản nói trên thì tất nhiên không có vấn đề gì cả tuy nhiên giao diện thực tế của bạn sẽ phức tạp hơn rất nhiều. Để minh chứng cho điều trên ta sẽ có thêm một giao diện như sau ([link tham khảo](https://codepen.io/quang-huyy/pen/OqZBGJ)) theo hướng **Desktop First** (với độ rộng ban đầu 1440px):
```html
<!DOCTYPE html>
<html>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
<body>
  <div class="header">
    <i class="fas fa-bars"></i>
    <h2 class="logo">MY LOGO</h2>
    <ul class="nav">
      <li>HOME</li>
      <li>PRODUCT</li>
      <li>PRICING</li>
      <li>ABOUT US</li>
      <li>CONTACT</li>
    </ul>
  </div>
</body>
</html>
```
```css
body {
  overflow-x: hidden;
}
body h2, body li{
  font-family: 'Roboto', sans-serif;
}
.header {
  background-color: white;
  box-shadow: 0 0.25rem 0.125rem 0 rgba(0,0,0,0.05);
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.logo {
  font-weight: bold;
  font-size: 25px;
}
.header i {
  display: none;
}
.nav {
  display: flex;
  flex-flow: wrap;
}
.nav li {
  line-height: 30px;
  width: 100px;
  text-align: center;
}

@media only screen and (max-width: 633px) {
  .nav {
    display: none;
  }
  .header i {
    display: block;
    position: absolute;
    left: 20px;
  }
  .header {
    justify-content: center;
  }
}
```

![](https://images.viblo.asia/b98e755e-a57a-4921-93a7-c9b3edd0f5a7.PNG)

Như trên là kết quả ta đạt được sau khi thực hiện style cho giao diện desktop. Tiếp theo với giao diện Tablet (với kích cỡ 768px). Do thanh header của chúng ta khá đơn gian nên khi bạn thử thu nhỏ màn hình xuống kích cỡ này sẽ thấy giao diện vẫn rất ổn nên không cần sửa gì cả:

![](https://images.viblo.asia/ecc467d9-7fa4-48ed-b5d7-5c3937406133.PNG)

Tiếp theo với giao diện mobile. Các kích thước mình chọn ở đây là các kích thước tương ứng khi ta sử dụng công tụ test responsive trong **Chrome Dev Tool**:

![](https://images.viblo.asia/1bac9a77-6062-4cc8-861f-b1db48337c98.PNG)

Kích cỡ màn mobile lớn nhất đầu tiên mình thấy trong **Chrome Dev Tool** là 633px (kích cỡ khi ta quay ngang màn hình), ta sẽ sửa giao diện thành như sau:

![](https://images.viblo.asia/7ae7e752-86c8-4ca3-a35c-71ce0ee976bb.PNG)

Đến đây nghe chừng có vẻ là ổn ổn rồi, tuy nhiên tự nhiên một ngày nào đó có cái màn quái dị nằm giữa 768px và 633px của bạn thì điều sau đây sẽ xảy ra (644px):

![](https://images.viblo.asia/6befacbf-76ab-42ab-a06c-b656d764246d.PNG)

Điều này sở dĩ xảy ra là do giao diện của bạn chỉ thay đổi nếu độ rộng màn hình của nó nhỏ hơn hoặc bằng 633px nên khoảng giữa các **break point** hoàn toàn có thể xảy ra lỗi nhất là khi bạn có một giao diện phức tạp. Tuy nhiên nếu bạn chọn đi theo con đường **Mobile First** thì giao diện của bạn ban đầu sẽ có dạng:

![](https://images.viblo.asia/883036c5-80b5-489b-b68a-3e3abc1d96ad.PNG)

Giao diện bạn thấy ở trên sẽ duy trì cho đến khi màn hình của bạn có kích cỡ lớn hơn hoặc bằng 768px thì nó mới chuyển thành như thế này:

![](https://images.viblo.asia/ecc467d9-7fa4-48ed-b5d7-5c3937406133.PNG)

Như vậy bạn có thể đảm bảo được rằng giữa các **break point** theo hướng mobile first sẽ không làm vỡ giao diện của bạn nếu gặp 1 số kích cỡ màn hình hơi lại một chút vì nó sẽ mãi mãi nhìn giống giao diện mobile cho đến khi nó đủ lớn - hay chính xác là kích cỡ màn lớn hơn hoặc bằng 768px. Nếu bạn chưa tin thì có thể xem thử ví dụ trên nhưng với phiên bản **Mobile First** ở [đây](https://codepen.io/quang-huyy/pen/bZMQww).


### d. Lý do khác

- Nếu bạn tìm hiểu về SEO thì chắc hẳn bạn cũng biết được rằng chính Google cũng yêu cầu rất cụ thể về **mobile friendly** nếu bạn muốn trang web của bạn đạt được đánh giá cao
- Chắc hẳn các bạn cũng không hề lạ với các thư viện hỗ trợ việc Front-end như **Bootstrap**. Chính bản thân **Boostrap** cũng đi theo hướng Mobile First, nếu không tin bạn có thể tự mở code của bootstrap lên xem sẽ thấy được điều này

## 4. Kết bài

<hr>

Qua những gì mình vừa chia sẻ trong bài viết mong rằng bạn sẽ tăng thêm được một chút kiến thức về **Responsive Web Design**. Cám ơn bạn đã đọc bài !!!