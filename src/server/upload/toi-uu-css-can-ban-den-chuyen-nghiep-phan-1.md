# Từng bước trở thành Front-end Developer
Sau một thời gian làm việc với CSS mình mong muốn chia sẻ một vài kinh nghiệm có được giúp các bạn newbie mới tìm hiểu và mong muốn trở thành frontend developer trong tương lai code CSS một cách ngon nghẻ hơn.

## Bước 1: Reset CSS
Trước khi bắt đầu 1 dự án chúng ta cần nhận ra rằng: Các element HTML trên các trình duyệt khác nhau sẽ được cài đặt sẵn những thuộc tính mặc định. Nên khi các bạn cũng xem một trang web trên trình duyệt khác nhau sẽ cho thấy có sự khác biệt rất nhỏ nếu như các bạn chú ý kỹ.
Nguyên do là mỗi phần tử HTML đều có những quy tắc hiển thị khác nhau tuỳ theo mỗi trình duyệt. Có những khi tôi debug trên hai trình duyệt khác nhau và đột nhiên thấy 1 trình duyệt đẻ ra đâu một thuộc tính CSS mới: ví dụ như 1 thẻ `<div>` tự nhiên có thêm thuộc tính `padding-top`. 

Để giải quyết sự thống nhất và đồng bộ này các nhà phát triển trên thế giới đã đưa ra một phương pháp được gọi là **Reset CSS**.   
**Reset CSS** được dùng để cài đặt lại tất cả thuộc tính html về mặc định theo yêu cầu của dự án. Nó giúp thống nhất cách CSS hiển thị giao diện trên các trình duyệt hiện nay.
 
Việc này là tối quan trọng nếu các anh em không muốn viết nhiều phiên bản CSS trên project của mình riêng cho mỗi trình duyệt. Bản chất thì các CSS framework như Bootstrap đều sử dụng Reset CSS.
Một ví dụ nho nhỏ về reset Css các phần tử thường được sử dụng nhất:

```
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

body {
  margin: 0;
}

main {
  display: block;
}
    
div {
    padding: 5px;
}
```
    
**Nguyên Tắc Sử Dụng CSS Reset**

**Rule 1: CSS Reset luôn ở đầu tiên trong các file CSS**
Những phần code reset CSS này luôn được đặt bên trên cũng khi bắt đầu gọi CSS. 
Nếu nó là một file riêng hãy import nó ở trên cùng, còn nếu copy thì cũng nên nhớ paste nó ở trên cùng file CSS của mình. Những phần custom css bên dưới có thể đi đè lên nó.

**Rule 2: CSS Reset luôn xử lý các element HTML**
Nhiệm vụ của CSS Reset là làm việc trực tiếp với các element chứ không phải các class hay ID nào cả. Bởi nó sẽ làm việc với trình duyệt, mà các trình duyệt cũng làm cách tương tự để thêm các CSS mặc định vào.
    
**Rule 3: Custom CSS Style phải gọi vào các Class/ID hoặc có parent element**
Bạn nên code vào .button thay vì a.button
Bạn nên code vào .list li thay vì ul li hay ul.list li
Việc tránh gọi các element trình duyệt mà sử dụng Class/ID đóng vai trò quan trọng giúp bạn dễ dàng xử lý xung đột giữa CSS Reset và Custom Style.

Ngoài việc tự  tay custom reset Css thì các Developer thường import một thư viện reset Css phổ biến, đáng tin cậy như [Normalize.css](https://necolas.github.io/normalize.css/) để tiết kiệm thời gian phát triển.
    
## Bước 2: CSS Priority Rankings- Độ ưu tiên trong CSS.

Để có thể viết Css một cách chính xác và công phu thì một điều kiên quyết là chúng ta cần hiểu rõ thứ tự ưu tiên ghi dè trong CSS.

Có bao giờ các bạn code CSS cho một site nào đó của bạn bè hoặc dự án công ty. Nhưng bạn gặp rắc rối với **#id, .class,  inline style, !important**  khi mà các phần tử bị ghi đè và kết quả không được như mong muốn.

**CSS Priority Rankings** là thứ tự ưu tiên các CSS được browser quy định, thông qua đó các anh em có thể biết đâu sẽ là thuộc tính được hiển thị trong trường hợp có sự xung đột CSS trên cùng một phần tử HTML.

*Dưới dây là một list danh sách liệt kê thứ tự ưu tiên của thuộc tính CSS:*

![](https://images.viblo.asia/629b56a1-af0d-4ce7-99e3-81fcf1b4cb9b.png)

**1- !important siêu cấp ưu tiên.**

Là thuộc tính có thứ tự ưu tiên cao nhất trong CSS. Nó sẽ luôn luôn overwrite tất cả các thuộc tính CSS còn lại.
```
<style>
    .mauxanh { color: blue!important; }
    .maudo { color: red; }
 </style>

<h1 class="maudo mauxanh"> important la gi </h1>
```
Thẻ `<h1>` sẽ hiển thị chữ có nội dung màu xanh `blue` do có !important giống như một sự nhất mạnh tầm quan trọng của thẻ.

**2- Inline CSS.**

Inline CSS thường được dùng cho một phần tử HTML xác định. <style> attribute được dùng để style mỗi HTML tag.

```
<style> 
  .maudo { color: red; }
  .mauden { color: black!important; }  
</style>
 
<h1 class="maudo" style="color:blue;"> inline css la gi </h1>
<h2 class="maudo mauden" style="color:blue;">important la gi </h2>
```

Ở đây đoạn text trong tag h1 sẽ có kết quả là màu xanh vì độ ưu tiên của Inline CSS cao hơn với việc style CSS bằng CLASS, nhưng đoạn text trong tag **<h2>** sẽ có màu đen vì độ ưu tiên của thuộc tính **important** cao hơn.

**3- Media Query: Overwrite Css theo kích thước màng hình trong Responsive trang web.**

**Media Query** là một trong những tính năng mới được thêm vào trong CSS3, bằng việc sử dụng những cú pháp query để chúng ta có thể đáp ứng được nhiều kích cỡ màn hình khác nhau cho riêng mỗi thiết bị: desktop, mobile, tablet.

```
<style>
  .maudo { color: red; }
  @media screen (mix-width: 320px) {
  .mauxanh { color: blue; }
  }
</style>

<h1 class="maudo mauxanh">Media Query la gi</h1>
```

Ở đây kết quả của đoạn text trong tag h1 sẽ màu xanh ở kích cỡ màn hình lớn hơn 320px vì ở đây mình dùng Media Query để overwrite CSS và nếu màn hình nhỏ hơn 320px nó sẽ màu đỏ.

**4 - Selector Specificity: CLASS hoặc ID, arttributes and pseudo-classes.**

```
<style>
  .mauxanh { color: blue; }
  #maudo { color: red; }
  h2 { color: yellow; }
</style>

<h1 class="mauxanh" id="maudo">ket qua la mau do</h1>
<h2 class="mauxanh">ket qua la mau xanh</h2>
<h2 id="maudo">ket qua la mau do</h2>
```

Theo thứ tự xếp độ ưu tiên thì Select phần tử **HTML bằng ID > CLASS > Default tag HTML**. Do đó thẻ h1 đầu tiên sẽ là màu đỏ, thẻ h2 tiếp theo sẽ là màu xanh và thẻ h2 cuối cùng sẽ là màu đỏ.

Đơn giản nhất, độ ưu tiên sẽ là:
***Incline > ID > Class (pseudo-class, attribute) > Element (pseudo-element)***

```
p {
  color: red;
}
.p1 {
  color: green;
}
#p2 {
  color: blue;
}
```
    
```
<p class="p1" id="p2" style="color: yellow;">Inline</p>
<p class="p1" id="p2">ID</p>
<p class="p1">Class</p>
<p>Element</p>
```
Bạn có thể đoán ra kết quả:

* đoạn 1 có màu vàng
* đoạn 2 có màu xanh lam
* đoạn 3 có xanh lục
* đoạn 4 có màu đỏ
   
**5- Rule Order:**

Thứ tự các thuộc tính khai báo CSS từ trên xuống dưới.

CSS đặt sau cùng sẽ luôn luôn overwrite các CSS ở trên cùng.
```   
 <style>
   p {
        color: blue;
        font-size: 16px;
     }
    
   p {
        color: red;
     }
  .mauxanh { color: blue!important; }
  .maudo { color: red!important; }
</style>
<p>Demo</>
<h1 class="mauxanh maudo">ket qua la mau do</h1>
 
```
  Với phần code trên thì nội dung trong thẻ  `<p>` sẽ hiện chữ màu đỏ với cỡ chữ 16px.
  Ở đây kết quả sẽ là màu đỏ vì CSS của CLASS .maudo đứng sau CSS của CLASS .mauxanh

**6: Browser Default: Là CSS mặc định được quy đinh bởi trình duyệt.**

Đây chính là Rule để áp dụng Reset Css mà tôi giới thiệu ở phía trên.

** ***Cách tính tứ tự ưu tiên CSS:***

![](https://images.viblo.asia/c7bdc3e4-4f46-495a-85d3-4fe5ab0632e1.png)
1. CSS dự vào cấp độ ưu tiên CSS đã nêu phía trên để đánh Rank cho CSS
2. Nếu cùng Rank thì CSS sẽ tính theo số lượng.
3. Css tính theo tính cụ thể mà phần tử đó được chỉ định .

Để rõ ràng hơn về độ ưu tiên này trong CSS thì mình làm câu chuyện nho nhỏ như sau cho các bạn dễ hình dung.

Giả sử các bạn đang xếp hàng có 4 người mua bánh. A (anh bạn) B (Bạn) C (Chú bạn) D (Dì bạn) thì bây giờ theo thứ tự ưu tiên sẽ là A B C D.

Đầu tiên là các elements(thẻ) trong CSS như là thẻ p, div, section , header … thì độ ưu tiên trong CSS của nó nằm cuối ta có (0A, 0B, 0C, 1D).

Tiếp theo là các class, pseudo class như .home , .content , :hover , :before , :after hoặc các attribute(thuộc tính) như a[target="_blank"], input[type="text"], a[href^="http"]… thì độ ưu tiên của nó nằm kế cuối ta có (0A, 0B, 1C, 0D).

Tiếp đến là các id như ***#header, #banner*** nó có độ ưu tiên thứ nhì ta được (0A, 1B, 0C, 0D)

Và cuối cùng là ***inline-style***. Nghĩa là code trực tiếp bên trong thẻ HTML luôn như này và nó có độ ưu tiên cao nhất ta được (1A, 0B, 0C, 0D).

```
div p.text { 
  font-size: 14px !important; 
}
#header p {
  font-size: 20px !important; 
}
```
Lúc này nó ngang hàng về mặt ***!important*** coi như ta bỏ nó ra rồi so sánh như ở trên ban đầu thôi. Mặc dù ***div p.text*** có tính chỉ định cụ thể cao hơn nhưng ***#header p*** là là ***ID*** lên có ưu tiên cao hơn sẽ đè đoạn ở trên rồi.

```
#header div div div p { /*4 elements và 1 id ta có (0A,1B,0C,4D)*/
  font-size: 14px; 
}
 
#header div p { /*1 id và 2 element ta có (0A,1B,0C,2D)*/
  font-size: 25px; 
}
```
Do ***#header div div div p*** có tính cụ thể cao hơn là 4D so với 2D bên dưới lên sẽ được CSS sử dụng.

***Specificity*** của một CSS selector được tính dựa vào việc đếm một số thành phần và biểu diễn dưới dạng (a, b, c, d).

Với mỗi element, pseudo-element chúng ta thêm 1 vào phần tử cuối (d).

Với mỗi class, pseudo-class, attribute chúng ta thêm 1 vào phần tử (c).

Với mỗi ID chúng ta thêm 1 vào phần tử (b).

Với 1 incline style ta thêm 1 vào phần tử (a).
Để hiểu rõ hơn hãy xem kết quả tính specificity của một số selector sau:
![](https://images.viblo.asia/2cf241f3-2a9a-45ec-8b13-679111933beb.png)

Chúng ta sẽ so sánh hai specificity theo lần lượt từng phần tử tương ứng từ trái qua phải. Ví dụ specificity (0, 0, 1, 0) thì rõ ràng hơn specificity (0, 0, 0, 15).

Selector có specificity rõ ràng hơn sẽ được áp dụng.

Chú ý selector (*) có specificity bằng 0 (0, 0, 0, 0).

## Bước 4: Làm quen với Bootstrap.

Bootstrap có lẽ là 1 CSS framework được sử dụng rộng dãi nhất. Rất nhiều nguồn hỗ trợ từ cộng đồng. Bạn có thể lựa chọn framwork này để tập tành dựng một giao diện Resposive nhanh chóng, dễ dàng. 

Cùng với đó bạn sẽ được làm quen với rất nhiều khái niệm quan trọng để có nhiều kinh nghiệm phát triển frontend sau này như:

***Grid,Containers,  Components, Dropdowns, Carousel, Modal, Scrollspy, Collapse, Badges, Progress, Tooltips, Toasts, Cards,...*** Mà sau này bạn sẽ sử dụng đến chúng thường xuyên để tùy biến giao diện.

## Bước 3: BEM hoặc Atomic CSS
BEM (viết tắt: Block-Element-Modifier) là một tiêu chuẩn trong việc viết CSS, sử dụng BEM rất hữu ích - làm cho code CSS dễ đọc, hiểu, bảo trì hay mở rộng…

Tại sao sử dụng BEM ?

* Thống nhất
* Tạo ra một cấu trúc có thể mở rộng và dễ bảo trì.

BEM là một tiêu chuẩn được sử dụng rộng rãi bởi các frontend-developer chuyên nghiệp và được áp dụng rộng rãi hầu hết các css framwork hiện này.
Nếu như bạn đã từng sử dụng Boostrap chắc hẳn đã dùng những cách gọi class kiểu như này:
`class="btn btn-primary"` hay `class="row col-md-12 col-sm-6"`. Với cách viết này Developer sẽ rất dể thống nhất cách gọi, sử dụng, maintain và mở rộng css của mình.
Với BEM bạn sẽ học được rất nhiều tư duy để viết css clean nhất.
Để tìm hiểu thêm về BEM vui lòng tham khảo bài viết: [Tổng quan về BEM](https://viblo.asia/p/tong-quan-ve-bem-Ljy5Vpe3Zra).

Còn Về ***Atomic CSS*** khá mới mẻ và chưa phổ biến nên mình sẽ bổ sung trong phần tiếp theo của bài viết.

## Bước 4: [SCSS](https://sass-lang.com/)-> CSS Preprocessing đưa CSS lên một tầm cao mới.

Với rất nhiều tính năng được xây dựng trên Ruby. ***SCSS*** là một ***CSS Preprocessing*** giúp biên dịch từ cách viết SCSS thành CSS mới việc giúp các frontend developer viết code ngắn hơn, tiết kiệm tối đa thời gian phát triển, code css dễ bảo trì.
Với một loạt những tính năng như:

**Variables**: Đặt biến chứa giá trị Static có khả năng sử dụng lại ở mọi file scss bằng cách dùng @import filename.

***Nesting, Import, Partials, Mixins, Extend/Inheritance, Operators, Interpolation, Functions,...***

Sự hỗ trợ SCSS là rất đa dạng, nhiều tính năng mà một Developer giàu kinh nghiệm cũng không chắc sẽ sử dụng hết những tính năng hay ho này.

## Bước 5: Làm quen với Responsive Website cùng với SCSS, Mixins, Media Querry và Breakpoint.

Chỉ cần làm quen được ***SCSS*** một cách căn bản thì bạn có thể bắt tay ngay vào thử nghiệm ***Responsive*** giao diện đa màn hình một cách nhanh chóng.

Đầu tiên lựa chọn ***breakpoint*** là điều cực kì quan trọng khi responsive một trang web, nó quyết định trang web của bạn sẽ tương thích với các loại màn hình nào, co giãn ra sao khi người dùng resize trình duyệt, dưới đây là một số breakpoint mình hay sử dụng khi làm việc. Chúng ta sẽ sử dụng chức năng map của SCSS để định nghĩa nó.
```
$breakpoints: (
    xsmall: 480px,
    phone: 600px,
    tablet-up: 768px,
    tablet-down: 1024px,
    desktop-down: 1279px,
    desktop-up: 1280px,
);
```
Sau đó ta sẽ sử dụng ***Mixins*** để bắt các case trong ***breakpoint***. ***SCSS*** sẽ tự động reponsive khi kích thước màn hình rơi vào các Case này:
    
```
@mixin for-size($breakpoint, $direction:down) {
    //neu breakpoint ton tai
    @if map-has-key($breakpoints,  $breakpoint) {
        //Kiểm tra breakpoint truyền vào có tồn tại như bạn đã định nghĩa hay không.
        $breakpoint-value: map-get($breakpoints, $breakpoint);

        // Xác định min-width hay max-width
        @if $direction == up {
            //Build media query
            @media (min-width: $breakpoint-value) {
                @content;
            }
        }
        @else if $direction == down {
            //Build media query
            @media (max-width: $breakpoint-value) {
                @content;
            }
        }
    }
}
```
## Tổng quan:
Đến đây thì mình xin tổng kết lại:

***Ở phần 1*** mình sẽ ví dụ chi tiết vào những nguyên tắc căn bản nhất làm nền tảng để bạn có thể phát triển lên những level tiếp theo từng bước dễ dàng và vững vàng hơn. Qua đó biết bản thân cần tìm hiểu qua những bước quan trọng nào để có thể lên được những bước kế tiếp.

***Ở phần 2*** bài viết lần sau: Mình sẽ trình bày rõ hơn về Responsive với SCSS, Media Query, Mixins, giới thiệu thêm về Atomic CSS.
Rất mong nhận được nhiều ý kiến đóng góp từ quý bạn đọc.

***Nguồn tham khảo:***

https://viblo.asia/p/tiet-kiem-thoi-gian-responsive-cho-trang-web-cua-ban-bang-scss-Qbq5Qpr4lD8

https://viblo.asia/p/tong-quan-ve-bem-Ljy5Vpe3Zra

https://evondev.com/do-uu-tien-trong-css/

https://hungphamdevweb.com/front-end-vai-phut-tim-hieu-css-priority-rankings.html

https://hungphamdevweb.com/front-end-reset-css-voi-normalize-css.html