Trong bài trước ta đã tìm hiểu về sizing và color trong css. Trong bài này ta áp dụng sizing cho một trong những khái niệm quan trọng nhất trong thiết kế web, đó là: *box model*. <br>
Về cơ bản trình duyệt sẽ coi một page là một tập hợp các box khác nhau chứa nội dung. Cùng với chiều cao và chiều rộng, các box còn có các thuộc tính như là *borders* (một đường viền bao quanh hộp), *margins* (khoảng cách tới các hộp khác), và *padding* (không gian khoảng cách bên trong hộp ngăn cách với borders).  <br>
Box Model là một kỹ thuật cơ bản nhất trong CSS Layout và được sử dụng để bạn mô tả về khoảng cách mà mỗi phần tử trên website được sở hữu, hay nói cách khác là kỹ thuật tinh chỉnh khoảng cách hiển thị cho mỗi phần tử trên website. Trong bài này, ta sẽ tìm hiểu một số phương pháp căn chỉnh, đặt các box nằm cạnh nhau, từ đó làm quen dần với cách bố trí các thành phần của một website. <br>

![](https://images.viblo.asia/3ef0a6a8-aa6a-41b6-b990-1700921a32a8.png)

## Inline vs. block
Ta sẽ bắt đầu tìm hiểu về box model bằng cách thảo luận về hiệu ứng khác nhau của spacing và borders trên inline và block elements.  <br>
Các phần tử được coi là *inline elements* như **span** hay **a**, thì margin hay padding chỉ áp dụng cho trái hoặc phải (chứ không có trên hoặc dưới), và nó không chấp nhận chiều rộng hoặc chiều cao được set bởi CSS. Còn đối với *block elements*, thì không có hạn chế nào cả. <br>
Tuy nhiên, vẫn có những style biến inline element thành block element (ví dụ như thuộc tính float). 
### display: none
**display: none** Style này ngăn một phần tử hiển thị trên page. Ví dụ ta thử add thêm style **display: none** vào class **.social-link**
```css:index.html
.
.
.
.social-link {
  background: rgba(150, 150, 150, 0.5);
  color: blue;
  display: none;
}
.
.
.
```

Khi lưu và refresh lại trình duyệt, ta thấy rằng các social link đã không còn hiển thị nữa. Kiểu này thường được sử dụng cho việc ẩn các phần tử trong interactive websites, đặc biệt là khi kết hợp với JavaScript. <br>

![](https://images.viblo.asia/ec8daa22-ca30-47dc-afcf-29f18455fae1.JPG)

Để khôi phục lại hiển thị của phần tử đã bị ẩn, ta có thể setting thuộc tính **display** thành **initial** hoặc **block**.

### display: block
**display: block** để ép một phần tử thành một block element, dù nó là kiểu gì trước đó. Nếu như bạn không set kích thước sau khi thay đổi phần tử đó thành **display: block**, nó sẽ hoạt động giống như bất kỳ block element nào bằng cách là lấy toàn bộ chiều rộng của parent element. <br>
Như đã đề cập ngắn gọn ở phía trên, inline elements (như là links và span) sẽ không thể có chiều rộng và chiều cao, tuy nhiên một khi ta thay đổi thuộc tính display thì dimensional styles sẽ được áp dụng. Để xem cụ thể nó hoạt động ra sao, ta thử add chiều cao cho class **.social-link**.
```css:index.html
.
.
.
.social-link {
  background: rgba(150, 150, 150, 0.5);
  color: blue;
  height: 36px;
}
.
.
.
```
Khi save và refresh lại page, ta thấy rằng không có gì thay đổi cả - bởi vì, .social-link là inline elements. Tiếp theo , ta thử add thuộc tính **display: block** vào và save lại xem sao. 
```css:index.html
.
.
.
.social-link {
  background: rgba(150, 150, 150, 0.5);
  color: blue;
  display: block;
  ​height: 36px;
}
.
.
.
```
Sau khi save và refresh, ta thấy rằng class .social-link đã có chiều cao 36px, và nó căng ra chiếm toàn bộ không gian của parent elements. <br>

![](https://images.viblo.asia/78fa044a-8d42-4b50-9ea3-c784ce8ab259.JPG)

### display: inline
**display: inline** sẽ biến một block element thành một inline element (nó ngược với **display: block** ). Bất kỳ style nào không apply cho inline elements (ví dụ như, width và height, top margins, hay padding) thì sẽ không có tác dụng với thuộc tính này. Nó sẽ không nằm trên line riêng của nó nữa, mà hòa vào với các inline element khác. 

### display: inline-block
**inline-block** là thuộc tính kết hợp giữa inline và block, nó là một thuộc tính rất hữu ích, vì nó cho phép tạo kiểu mà bình thường chỉ hoạt động trên block element - ví dụ như, width và height, top margins, và padding và áp dụng cho một element cụ thể. Đồng thời, nó cũng cho phép toàn bộ phần tử hoạt động giống như một inline element. Điều này có nghĩa là text sẽ vẫn hiển thị xung quanh và nó chỉ chiếm nhiều không gian theo chiều ngang mà nó cần để chứa content. (nó trái ngược với block element - cái mà trải dài khắp các trang, trừ khi bạn thiết lập width trước cho chúng). <br>
Để xem cụ thể nó hoạt động như nào, ta sẽ set class .social-link hiển thị kiểu inline-block. 
```css:index.html
.
.
.
.social-link {
  background: rgba(150, 150, 150, 0.5);
  color: blue;
  display: inline-block;
  ​height: 36px;
}
.
.
.
```
Khi save và refresh, ta thấy rằng các link có chiều cao được áp dụng style, và chiều rộng chỉ bằng đúng kích thược chứa content. <br>

![](https://images.viblo.asia/7476aae1-b4ab-4053-9f02-69bebd03f815.JPG)

Ở phần sau, ta sẽ thêm các icon cho các link social media khác nhau, và ta muốn rằng, những link này sẽ có cùng kích thước chiều rộng, chiều cao, bất kỳ nội dung của nó là gì. Để làm được điều này, ta cần thêm thuộc tính width vào các social link.
```css:index.html
.
.
.
.social-link {
  background: rgba(150, 150, 150, 0.5);
  color: blue;
  display: inline-block;
  height: 36px;
  width: 36px;
}
.
.
.
```
Giờ đây, các social links sẽ có kích thước là hình vuông, giống nhau như sau: <br>

![](https://images.viblo.asia/4804ef38-f6aa-4694-8a86-9cb8a840bea3.JPG)

Vậy thì website sẽ sử dụng kiểu css này ở đâu và khi nào ? Kiểu khai báo **inline-block** này đặc biệt hữu ích khi thực hiện điều hướng website, hoặc khi tạo kiểu cho một nhóm phần tử nằm cạnh nhau. Chúng ta sẽ tiếp tục thảo luận về thuộc tính này trong các bài viết sau.

### display: flex
**display: flex** là một thuộc tính mạnh mẽ, buộc thất cả phần tử con phải lấp đẩy toàn bộ bộ parent element, và có khả năng tùy chỉnh cao sử dụng cho layout. Thuộc tính flex này là thứ giúp giải quyết một số vấn đề khó khăn tồn tại trong một thời gian dài về page layouts. <br>
Ở bài này t sẽ chỉ giới thiệu về khái niệm, để hiểu sâu về thuộc tính này, ta sẽ tìm hiểu cụ thể trong một bài viết khác. 

## Margins, padding, and borders
Một trong những nơi mà các developer tương tác với box model nhiều nhất đó là khi thêm *margin*, *padding*, và *borders* cho các phần tử trên trang - trong khi thuộc tính *margin* hay *padding* kiểm soát không gian xung quanh hoặc bên trong các phần tử, thì thuộc tính *border* chỉ định sự xuất hiện đường biên của box. Trong bài này, chúng ta sẽ cùng tìm hiểu trước về cách những style này ảnh hưởng ra sao tới box model (bao gồm một số điều thú vị), và trong các bài viết sau ta cùng nhau tìm hiểu chi tiết về cách thức margin, padding hay border được sử dụng trong thực tế như thế nào. <br>
Chúng ta sẽ bắt đầu điều tra, tìm hiểu sự khác biệt giữa padding, border, và margin. Hơn nữa, nếu bạn thiết lập chiều rộng cho block element, (ví dụ như **div** hay **p**) rồi sau đó apply border hay padding cho nó, thì border hoặc padding đó sẽ nằm ngoài content. Điều này có nghĩa rằng, bạn có thể gặp tình trạng phần tử của bạn có kích thước lớn hơn kích thước bạn đã chỉ định. Có thể nhiều người sẽ hiểu nhầm rằng, khi bạn đặt kích thước chiều rộng là 200px chẳng hạn, thì nó phải luôn là 200px... nhưng không, mặc định là CSS sẽ giả sử rằng khi bạn set size cho phần tử thì nghĩa là bạn đang chỉ nói về phần content của phần tử. Điều này đã tạo ra khá nhiều nhầm lẫn cho những người học CSS, vì họ cho rằng phần tử và nội dung của nó là giống nhau. Hay xem thử ví dụ sau: <br>
Giả sử ta có một thẻ **div**, có style như sau: 
```css
width: 200px;
padding: 40px;
border: 10px solid #c00;
```
Trong trường hợp này, kích thước toàn bộ phần tử sẽ lên tới **300px**, bao gồm: 200px cho content, 40px cho mỗi padding trái, phải, và 10px cho mỗi cạnh border trái phải (200+40×2+10×2=  **300px**). Ta có thể xem hình minh họa dưới đây: <br>

![](https://images.viblo.asia/47b887a1-49af-4899-8534-de2fb82dd180.JPG)

Ta có thể cố định tổng chiều rộng của content box và ép border và padding nằm bên trong nó. Để làm được điều này, ta cần khai báo **box-sizing**. Cụ thể để xem nó hoạt động như nào, ta thử add một số phần tử và styles.
```css:index.html
.
.
.
<h2>I'm an h2</h2>

<div class="test-box">
  200px wide
</div>
<div class="test-box test-box-nosizing">
  200px wide + border + padding = 300px
</div>
<div class="test-box test-box-nosizing test-box-sizing">
  200px wide + border + padding + box-sizing: border-box = 200px
</div>
.
.
.
```

Sau đó, add thêm một số style sau: 
```css:index.html
.
.
.
  .test-box {
    background: #9db6dd;
    width: 200px;
  }
  .test-box-nosizing {
    border: 10px solid #000;
    padding: 40px;
  }
  .test-box-sizing {
    box-sizing: border-box;
  }
</style>
.
.
.
```
Khi save và refresh lại trình duyệt, ta thu được các box với chiều rộng khác nhau. Chú ý rằng, class **.test-box-sizing** ép div phải là 200px chiều rộng. Thuộc tính **border-box** đã khiến trình duyệt phải thiết lập border và padding nằm trong giới hạn kích thước ta đã chỉ định<br>

![](https://images.viblo.asia/8f1bb23b-bcde-4fdc-ac17-50f430f00bed.JPG)

### Margin weirdness
Ở trên, ta đã nói về việc box model có thể có những hành vi bất ngờ về border và padding, vậy đối với margin thì sao? có thể bạn sẽ mong muốn rằng, khi 2 phần tử có margin nằm cạnh nhau, thì margin của chúng sẽ luôn được aply đúng k ? Ví dụ, nếu 2 phần tử đều có margin là **20px**, có thể bạn sẽ mong đợi rằng các phần tử sẽ luôn cách nhau **20 + 20 = 40px** - tuy nhiên, nó sẽ không như vậy. <br>

![](https://images.viblo.asia/c1efd922-4def-4f3b-a618-12cf3eb83c37.JPG)

Ta sẽ thử thay đổi code, để kiểm tra cách hoạt động của margin như sau: <br>
```css:index.html
.
.
.
  .test-box {
    background: #9db6dd;
    display: inline-block;
    margin: 50px;
    ​width: 200px;
 ​}
 ​.test-box-nosizing {
   ​border: 10px solid #000;
   ​padding: 40px;
 ​}
 ​.test-box-sizing {
   ​box-sizing: border-box;    display: block;
    width: auto;
￼  ​}
</style>
.
.
```

Thực hiện save và refresh lại trình duyệt, ta thấy rằng các box đều cách nhau 50px. <br>

![](https://images.viblo.asia/9bda6429-cbd8-458a-8466-37310db08bce.JPG)

Bây giờ ta sẽ xóa thuộc tính **display**, sao cho phần tử **div** bên trên giảm xuống style mặc định của nó, đồng thời ta cũng xóa width styles như dưới đây: <br>
```css:index.html
.
.
.
.test-box {
  background: #9db6dd;
  margin: 50px;
}
.test-box-nosizing {
  border: 10px solid #000;
  padding: 40px;
}
.test-box-sizing {
  box-sizing: border-box;
}
.
.
.
```

Kết quả là margin được thu gọn một cách bất ngờ, tất cả các box được phân cách theo chiều dọc có margin là 50px, như dưới đây: <br>
![](https://images.viblo.asia/b18c7360-6da2-4837-a7fe-bd67b3ad3ccd.JPG)

Lý do ví dụ đầu tiên hoạt động đúng theo dự đoán đó là 2 phần tử đầu tiên không phải là block elements, do vậy trình duyệt hoạt động đúng theo margin đã set. Tuy nhiên, một khi chúng trở thành các block element, thì trình duyệt chỉ cho phép apply 1 margin. <br>
Lý do điều này tồn tại là do những ngày đầu của HTML, khi tất cả các trang web sử dụng trình duyệt mặc định cho tất cả các phần tử (vì không có css). Một số block element (như là phần tử paragraph **p**) có mặc định margin trên, dưới, để giữ text cách xa các phần tử khác để tăng khả năng đọc dễ dàng hơn. Nếu không có tự động thu hẹp margin thì bất cứ khi nào bạn đặt 2 phần tử này cạnh nhau sẽ có quá nhiều khoảng cách. Vì vậy người ta đã thiết lập rằng, khi 2 block element có margin nối tiếp nhau, thì một trong margin trên hoặc dưới sẽ bị hủy bỏ. <br>
Trong các bài viết sau, chúng ta sẽ cùng nhau tìm hiểu cách đặt các box cạnh nhau. 
## Floats
Ở phần trên, ta đã tìm hiểu một số chú ý trong box model, giờ thì hãy sử dụng nó để tạo kiểu cho website mẫu của chúng ta. Một số điều ta thường cần xử lý khi thiết kế trang web đó là, đặt các phần tử khác nhau nằm cạnh nhau trên trang, và đối với các developer ít kinh nghiệm thì họ thường gặp khá nhiều vấn đề với box model. <br>
Ở các bài viết trước, t đã đề cập tới một thuộc tính gọi là **float** giúp di chuyển vị trí của image. Ý tưởng là khi ta set phần tử bằng cách float sang trái hoặc sang phải, thì inline content xung quanh sẽ hiển thị xung quanh floated element đó. Các floated element sẽ luôn nằm cạnh các floated element khác trên cùng một dòng, miễn là có đủ khoảng trống chiều ngang. Nếu các phần tử quá lớn, nó sẽ nhảy xuống dòng tiếp theo. <br>
Hay thử xem ví dụ này. Đó là ta thêm thuộc tính **float: left** cho class **.bio-box**, và cũng thiết lập thêm một số padding và width. Dưới đây, là file index.html mới nhất cho đến thời điểm hiện tại, bạn có thể dùng nếu chưa theo dõi các bài viết lần trước. 
```css:index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Test Page: Don't Panic</title>
    <meta charset="utf-8">
    <style>
      /* GLOBAL STYLES */
      h1 {
        font-size: 7vw;
        margin-top: 0;
      }
      a {
        color: #f00;
      }

      /* HERO STYLES */
      .full-hero {
        background-color: #c7dbfc;
        height: 50vh;
      }

      /* SOCIAL STYLES */
      .social-link {
        background: rgba(150, 150, 150, 0.5);
        color: blue;
        display: inline-block;
        height: 36px;
      }

      /* BIO STYLES */
      .bio-wrapper {
        font-size: 24px;
      }
      .bio-box {
        border: 1px solid black;
        float: left;
        font-size: 1rem;
        padding: 2%;
        width: 25%;
      }
      .bio-box h3 {
        font-size: 1.5em;
      }
      .bio-copy {
        font-size: 1em;
      }
      .bio-copy a {
        color: green;
      }
    </style>
  </head>
  <body>
    <div class="full-hero hero-home">
      <h1>I'm an h1</h1>
      <ul>
        <li>
          <a href="https://example.com/" class="social-link">Link</a>
        </li>
        <li>
          <a href="https://example.com/" class="social-link">Link</a>
        </li>
        <li>
          <a href="https://example.com/" class="social-link">Link</a>
        </li>
      </ul>
    </div>
    <h2>I'm an h2</h2>
    <div class="bio-wrapper">
      <div class="bio-box">
        <h3>Michael Hartl</h3>
        <a href="https://twitter.com/mhartl" class="social-link">here</a>
        <div class="bio-copy">
          <p>
            Known for his dazzling charm, rapier wit, and unrivaled humility,
            Michael is the creator of the
            <a href="https://www.railstutorial.org/">Ruby on Rails
            Tutorial</a> and principal author of the
            <a href="https://learnenough.com/">
            Learn Enough to Be Dangerous</a> introductory sequence. Michael
            is also notorious as the founder of
            <a href="http://tauday.com/">Tau Day</a> and author of
            <a href="http://tauday.com/tau-manifesto"><em>The Tau
            Manifesto</em></a>, but rumors that he's secretly a supervillain
            are slightly exaggerated.
          </p>
        </div>
      </div>
      <div class="bio-box">
        <h3>Lee Donahoe</h3>
        <a href="https://twitter.com/leedonahoe" class="social-link">here</a>
        <div class="bio-copy">
          <p>
            When he's not literally swimming with sharks or hunting powder
            stashes on his snowboard, you can find Lee in front of his computer
            designing interfaces, doing front-end development, or writing some of
            the interface-related Learn Enough tutorials.
          </p>
        </div>
      </div>
      <div class="bio-box">
        <h3>Nick Merwin</h3>
        <a href="https://twitter.com/nickmerwin" class="social-link">here</a>
        <div class="bio-copy">
          <p>
            You may have seen him shredding guitar live with Capital Cities on
            Jimmy Kimmel, Conan, or The Ellen Show, but rest assured Nick is a
            true nerd at heart. He's just as happy shredding well-spec'd lines
            of code from a tour bus as he is from his kitchen table.
          </p>
        </div>
      </div>
      <div class="bio-box">
        <h3>??</h3>
        <p>
          The Future
        </p>
      </div>
    </div>
  </body>
</html>
```
Sau khi save và refresh lại trình duyệt, ta thu được kết quả như sau: <br>

![](https://images.viblo.asia/7084cab4-5173-4516-87d6-00333b6f8ffe.png)

Ta thấy rằng, hiện tại tất cả các box đã nằm trong cùng một hàng, nhưng tại sao box cuối cùng lại tràn xuống dòng tiếp theo. <br>
Đó là do vấn đề box model sizing. Ở đây, left border, right border, left padding, right padding, đã được thêm vào chiều rộng của phần tử **div**. Hãy thử tính tổng chiều rộng xem sao nhé, **25% + 1px border-left + 1px border-right + 2% padding-left + 2% padding-right** thì sẽ có tổng là **29% + 2px**. Nhân với 4box, sẽ có kết quả là **116% + 8px** > 100%.<br>
Giờ ta thử khắc phục bằng cách, add thêm thuộc tính **box-sizing: border-box** cho thẻ **div**, để ép buộc border và padding nằm trong thẻ div. 
```css:index.html
.
.
.
.bio-box {
  border: 1px solid black;
  box-sizing: border-box;
  float: left;
  font-size: 1rem;
  padding: 2%;
  width: 25%;
}
.
.
.
```
Khi save và refresh lại trình duyệt, ta sẽ có được 4 box nằm cùng trên một hàng của page. <br>

![](https://images.viblo.asia/bf1b1258-bcc0-4281-8f00-bc8d6ad2d44c.png)

### Clearing floats
Vậy tại sao một số developer lại không muốn là luôn luôn dùng float để đặt các phần tử cạnh nhau? Đối với mỗi phần tử, chỉ có 2 option đó là **float: left** và **float: right** nhưng lại không có **float: center**. Điều này thật khó chịu, tuy nhiên ta đều có cách xử lý. Vấn đề lớn hơn đó trình duyệt không phải lúc nào cũng biết nơi kết thúc của float. Khi thực hiện float phần tử, bạn đang nói với trình duyệt rằng, bạn muốn phần tử hiển thị trên page, ở vị trí mà nó sẽ float, nhưng ngay sau vị trí bắt đầu đó, bạn muốn các content còn lại của page phải hiển thị xung quanh phần tử float đó. Điều này có thể phá vỡ sự sắp xếp có trật tự của các phần tử và tạo ra một số bố cục trông kỳ quặc. <br>
Để hiểu rõ hơn, ta thử thêm một paragraphs vào bên dưới thẻ đóng `</div>` của class **.bio-wrapper**. 
```css:index.html
.
.
.
  <div class="bio-wrapper">
    .
    .
    .
  </div>
  <p>
    Learn Enough to Be Dangerous is a leader in the movement to teach the
    world <em>technical sophistication</em>, which includes both "hard
    skills" like coding, command lines, and version control, and "soft
     skills" like guessing keyboard shortcuts, Googling error messages, and
    knowing when to just reboot the darn thing.
  </p>
  <p>
    We believe there are <strong>at least a billion people</strong> who can
    benefit from learning technical sophistication, probably more. To join
    our movement,
    <a href="https://learnenough.com/#email_list">sign up for our official
    email list</a> now.
  </p>
  <h3>Background</h3>
  <p>
    Learn Enough to Be Dangerous is an outgrowth of the
    <a href="https://www.railstutorial.org/">Ruby on Rails Tutorial</a> and the
    <a href="https://www.softcover.io/">Softcover publishing platform</a>.
    This page is part of the sample site for
    <a href="https://learnenough.com/css-tutorial"><em>Learn Enough CSS and
    Layout to Be Dangerous</em></a>, which teaches the basics of
    <strong>C</strong>ascading <strong>S</strong>tyle
    <strong>S</strong>heets, the language that allows web pages to be styled.
    Other related tutorials can be found at
    <a href="https://learnenough.com/">learnenough.com</a>.
  </p>
.
.
.
```
Khi save và refresh lại trình duyệt, ta thấy rằng text đang hiển thị nối liên tiếp với phần tử float ngoài cùng chứ không hiển thị bắt đầu ở dòng mới. <br>

![](https://images.viblo.asia/c3b47d7e-d02d-4c23-9ce9-85f042a4702f.JPG)

Nếu các float element được float sang bên phải bằng cách sử dụng **float: right**, bạn cần xóa trạng thái float của chúng bằng cách **clear: right**, hoặc nếu cần thận hơn, bạn có thể xóa cả 2 loại float bằng cách sử dụng **clear: both**. <br>
Nếu bạn đã thử xóa float với inline style trên page test, bạn nên xóa style đó từ thẻ **p** - việc thao tác với inline style có thể khiến bạn khó chịu, nhưng đôi khi đó là một cách nhanh chóng để thử nghiệm các style.<br>
Việc phải add **clear** style trực tiếp sau một phần tử float bất kỳ  (kiểu inline hoặc stylesheet) là một điều khá khó khăn - Đặc biệt là trên một dynamic site, mà nó có thể pull code từ nhiều nơi để xây dựng một page. Khi đó bạn sẽ không biết phần tử nào sẽ theo sau float. <br>
Một cách tốt hơn để clear float đó áp dụng quy tắc clear mọ thứ trong class **.bio-wrapper**. Ý tưởng đó là ta sắp xếp phần tử **.bio-wrapper** và mọi thử trong nó hoạt động giống như một Lego block - có thể di chuyển xung quanh một cách an toàn mà không cần phải lo lắng về các float chưa được clear làm xóa trộn layout. <br>
Có 2 method để xóa float trong wrapper, đó là: method **overflow** và “clearfix” method **:after**. Đầu tiên, ta sẽ thử add method **overflow** vào class **.bio-wrapper** để xem nó hoạt động như thế nào nhé. 
```css:index.html
.
.
.
/* BIO STYLES */
.bio-wrapper {
  font-size: 24px;
  overflow: hidden;
}
.
.
.
```
Thực hiện save và refresh lại trình duyệt, ta thấy rằng paragraph đã hiển thị hợp lý dưới phần tử float mà không cần dùng inline style hay thuộc tính **clear**. <br>

![](https://images.viblo.asia/c1054a59-2b4c-4826-b231-0e0bd8098fa1.JPG)

Vấn đề với method này đó là nếu bạn cũng set chiều rộng hoặc chiều cao trên phần tử có **overflow: hidden** thì content bên trong có thể bị cắt bỏ. Điều này thường xảy ra với các *dropdown menus* trong site navigation với float - cái mà được clear bằng cách sử dụng overflow method, tuy nhiên header cũng đã được set chiều cao. Như hình ảnh dưới đây cho thấy homepage dropdown sẽ bị bị ẩn hiển thị nếu ta set method overflow: hidden không hợp lý. <br>

![](https://images.viblo.asia/7f5b3c0a-2c1b-4bbf-82cf-6667dbf97578.png)

Do đó, nếu bạn cần clear float, nhưng bạn lo lắng về content bị cắt bỏ, vì bạn phải set chiều cao cho wrapper element, thì bạn có thể sử dụng **:after** method. <br>
Để xem nó hoạt động như thế nào. Ta sẽ xóa method **overflow: hidden** ở class **.bio-wrapper** và thêm vào bộ khai báo mới. 
```css:index.html
/* BIO STYLES */
.
.
.
/* BIO STYLES */
.bio-wrapper {
  font-size: 24px;
}
.bio-wrapper:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.
.
.
```
ĐĐoạncode trên có khá nhiều thứ mới mẻ, tuy nhiên chúng ta có thể tìm hiều dần dần và không cần lo lắng. Ta sẽ tìm hiểu kỹ hơn về **:after** trong các bài sau. Điều quan trọng là **:after** sẽ tạo ra mọt phần tử ảo ở cuối **bio-wrapper** - và ta có thể thêm các style vào phần tử này. Setting **clear: both** trên phần tử này sẽ clear các float và cho phép content hiển thị như dự định. Cuối cùng, nếu bạn save và refresh lại trình duyệt, text vấn được hiển thị giống như bên trên.

<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác trong CSS ở các bài viết lần tới nhé.<br>
Nguồn: [Learn-enough](https://www.learnenough.com/)*