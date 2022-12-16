Nghe qua có vẻ hơi xàm xí, đặt tên thôi mà, làm gì cần phải lưu ý? 

Không biết bạn thế nào chứ mình thì rất hay bị "bí từ" khi đặt tên, đặt thế nào mới đúng, mới dùng được nhiều lần, đặt thế nào code thật gọn gàng và dễ hiểu,...  
Bài viết sẽ là tổng hợp các cái gạch đầu dòng nho nhỏ về những gì cần lưu ý khi đặt tên, nếu lười đọc thì thử lướt qua các đề mục xem, biết đâu có thứ khiến bạn phải ngạc nhiên :wink:

### 1. Hãy đặt tên cho các phần tử con nhỏ nhất có thể
Dịch ra tiếng việt nghe hơi buồn cười, nhìn vào ví dụ này để hiểu rõ hơn nhé:
```
file .html
<main class='mainly'>
  <p>Lorem ipsum</p> <!-- Mình muốn thêm style cho thẻ <p> này -->
</main>

file .css
main.mainly p { /* Đừng viết như này */
}

/* Thay vì thế hãy đặt tên cho thẻ <p> : <p class='paragraphly' /> */
.paragraphly {
}
```
Hãy đặt 1 cái tên cụ thể cho phần tử HTML mà bạn muốn thêm style, ngay cả khi nó sẽ khiến bạn phải tốn nhiều công sức hơn. Khi mà file HTML còn đơn giản, ngắn thì ko vấn đề, nhưng nếu bạn có nhiều thẻ `<p>` chẳng hạn, mà mỗi thẻ p lại có css riêng, hoặc là bạn thay đổi thẻ tag 1 cái, sẽ rất mất công để tìm xem rốt cuộc nó ở đâu trong hàng nghìn dòng css. 
### 2. Sử dụng nội dung để đặt tên
Ví dụ mình có 1 class là `.c-header-logo`, chỉ cần nhìn vào cái tên này, mình có thể biết ngay được đây là phần css cho logo trong header. 

Tuy nhiên hãy tránh đặt tên bằng những từ cụ thể như là `.blue`, `.text-gray`, `light-box`. Giả dụ có lúc muốn đổi màu, thì lớp màu xanh có khi lại có màu đỏ.

Hãy đặt tên theo kiểu "thác nước", ngăn cách bằng dấu gạch ngang (-), thì khi nhìn vào cái tên bạn sẽ dễ dàng biết được nó nằm ở đâu. Thế nào là kiểu thác nước? Giống như trong ví dụ phía trên mình đưa ra, mình sẽ có class `.header` và logo bên trong sẽ có class `.header-logo`, rất dễ tìm phải không. 

Còn nữa, cố gắng viết 1 từ đầy đủ, đừng viết tắt, nó có thể giúp bạn tiết kiệm vài ms để gõ, nhưng sẽ khiến code của bạn trở nên khó hiểu, có khi một thời gian sau đọc lại chính bạn còn không nhớ nó nghĩa là gì. Tất nhiên, cũng có ngoại lệ, như là `url`, chắc chẳng ai viết `uniform-resource-locator` đâu nhỉ =)) Và để an toàn thì hãy viết bằng chữ thường, không viết hoa, có một số trường hợp hy hữu trình duyệt gặp vấn đề với chữ hoa. 
### 3. Không sử dụng camelCase
camelCase là kiểu viết hoa chữ cái đầu tiên của mỗi từ, như kiểu
```
.navToOneModuleICreated {
  font-size:2em;
}
```
Css vốn là cú pháp được phân cách bằng các dấu gạch nối, giống như là `font-size`, `border-bottom`. Vì vậy đừng cố gắng diễn giải nó theo 1 cách khác, nó không những khó đọc mà còn khiến code của chúng ta trở nên không nhất quán. Ví dụ như 
```
#content{ ... }
#subContent{ ... }
```
Ở đây chúng ta có 2 phần tử đều diễn tả nội dung, nhưng 1 cái là `content`, một cái lại là `Content`? Nói chung là nếu ngay từ đầu người ta đã đặt tên css theo format như vậy thì chắc chắn có lý do của họ, hãy tuân theo. Quay ngược lại ví dụ đầu tiên, chúng ta sẽ sửa tên class thành:
```
.nav-to-one-module-i-created {
  font-size:2em;
}
```
Dễ đọc hơn nhiều nhỉ?
### 4. Thử BEM
Nó là một trong những quy ước được sử dụng phổ biến nhất hiện nay. Mới đầu nhìn nó có thể lạ, đừng sợ, bạn có thể thử nó ngay bây giờ trên bất cứ phần nào của dự án bạn đang làm, về lâu về dài, nó sẽ đem lại lợi ích rất lớn.

Hiểu đơn giản nhất thì `--` để diễn tả biến của phần tử, `__` dùng để diễn tả phần tử con của phần tử đó. Ví dụ:
```
<button class='btn btn--warning'> <!-- .btn--warning là 1 biến của .btn-->
  <div class="btn__text"></div> <!-- .btn__text là thằng con của .btn-->
</button>
```
```
.btn--warning {
/* Nhìn vào đây ta biết ngay phần code này liên quan đến biến "warning" của button mà không cần nhìn vào code*/
}
.btn__text {
/* Tương tự ta biết nó định nghĩa style cho phần text của button */
}
```
### 5. Thêm tiền tố, hậu tố cho class
Những tiền tố phổ biến thường được dùng là:
* `p-` Trang cụ thể, thường thì nó là lớp áp dụng cho thẻ body, thường khá hữu dụng cho trang tĩnh, ví dụ như `p-homepage`
* `l-` Layout, các phần tử để định vị cấu trúc, bố cục của trang, ví dụ `l-footer`, `l-grid`, `l-container`
* `c-` Component, thường nó sẽ là các phần tử có tác dụng như xương sống của trang, ví dụ `c-card`, `c-checklist`, `c-dropdown`
* `u-` Các class tiện ích, thường thì nó sẽ không bao giờ thay đổi, không bị ghi đè ở bất cứ chỗ nào trong code, ví dụ như: `u-text-center`, `u-clearfix`
* `js-` Dùng để gọi đến xử lý trong javascript, thường thì không thêm style cho class này, ví dụ: `js-click-me`, `js-tab-switcher`

Khi đã quen rồi bạn cũng có thể sáng tạo các tiền tố khác phù hợp vs project của bạn, tuy nhiên cũng không nên lạm dụng quá, sẽ phản tác dụng đấy.

Ngoài ra ta có thể thêm hậu tố có định dạng `@<>` để thể hiện class này cho kích thước nào:
```
<div class="o-media@md  c-user  c-user--premium">
  <img src="" alt="" class="u-hidden@print  c-user__photo  c-avatar" />
  <p class="o-media__body@md  c-user__bio">...</p>
</div>
```
Nhìn vào class `u-hidden@print`, ta hiểu là phần tử này sẽ bị ẩn đi khi ở kích thước để in. Trong file css, ta sẽ viết thế này:
```
@media print {
  .u-hidden\@print {
    display: none;
  }
}
```
### 6, Đặt tên class dựa trên thuộc tính của chúng
Các class mà hầu như chỉ chứa 1 thuộc tính thì ta có thể dùng chính tên thuộc tính để đặt tên cho class, ví dụ:
```
.horizontal-alignment { /* Đặt như này thì nhìn vào ta cũng không biết căn theo chiều ngang là thế nào */
  text-align: center;
}
/* Đặt như này ta sẽ hiểu ngay class này muốn căn giữa */
.u-text-align--center {
  text-align: center;
}
```
### 7. Sử dụng file shame.css
Từ việc dùng `overflow: hidden;` thay vì tìm ra nguyên nhân gây ra vỡ layout, đến thêm `!importain` để ghi đè lên CSS không đúng, đôi khi, có thể do deadline hoặc cần hotfix, chúng ta không đủ thời gian để viết CSS lý tưởng. Nhưng vấn đề ở đây là thường thì ta ít khi quay lại để sửa lại nó, và như một dây chuyền, những người khác khi nhìn thấy bạn dùng `!importain` cũng sẽ không cảm thấy có vấn đề gì khi dùng `!importain`, và những đoạn code xấu cứ thế sinh sôi nảy nở. 

Khi điều kiện không cho phép, thì có thể viết như vậy, nhưng hãy đảm bảo rằng nó sẽ ko bị ngó lơ hay không được sửa, từ đó, sinh ra 1 file gọi là **shame.css**. Như tên gọi, nó sẽ là nơi chứa những đoạn mã mới mà ta bắt buộc phải thêm vào, những đoạn mã khiến ta cảm thấy xấu hổ. Bằng cách này, ta sẽ vẫn giữ được code của mình sạch sẽ, cũng ko bị quên mất nó, các thành viên khác trong team cũng sẽ biết đó chỉ là đoạn code để fix nhanh.

Trong file này, chúng ta cũng cần phải viết đầy đủ những điều sau:
* Nó sửa phần nào?
* Vì sao cần sửa?
* Sửa như thế nào?
* Làm thế nào để có thể sửa nó đúng cách, thêm thời gian có được không?

Ví dụ:
```
/**
 * Fix phần navigation.
 *
 * Ai đó đã sử dụng ID trong phần code header (`#header a {}`) để viết css thay vì nav (`.site-nav a {}`)
 * Dùng !importaint để ghi đè lên nó cho đến khi có thời gian refactor lại phần header.
 */
.site-nav a {
    color: #BADA55 !important;
}
```
### 8. Cố gắng tránh đặt tên cho 1 class nhiều hơn 2 từ
Nếu sử dụng quá nhiều từ cho 1 cái tên sẽ khiến việc maintain trở nên khó khăn hơn
```
.button {
  /* OK */
}
.dropdown-button {
  /* vẫn OK */
}
.dropdown-button-part-one {
  /* vẫn ok thôi, nhưng sẽ khá khó đọc khi ta thêm phần tử con cho nó, ví dụ : */
}
.dropdown-button-part-one__button-admin {
  /* Nhìn đã muốn hoa cả mắt @.@ */
}
```
### 9. Sử dụng tiền tố has- hay is- cho trạng thái
Khi một component thay đổi trạng thái (phản hồi cho 1 hành động nào đó của người dùng), chúng ta thường thêm 1 class để thể hiện trạng thái và thêm style cho nó, thường thì nó không cố định mà sẽ được thêm hoặc xóa dựa theo hành động của người dùng. Tên của các class này thường sẽ giống như ý nghĩa của nó với tiền tố `is-`, ví dụ như `c--is-selected`.  Một lưu ý nhỏ nữa là hãy để phần css cho class này xuống cuối cùng để tránh bị ghi đè.
```
<ul class="c-select">
    <li class="c-select__option c--is-selected">Item 1</li>
    <li class="c-select__option">Item 2</li>
    <li class="c-select__option">Item 3</li>
</ul>
```
```
.c-select {}

.c-select__option {}

.c-select__option.c--is-selected {} 
```
Một tiền tố khác dùng khi ta muốn đánh dấu một component cha với sub-component đang ở 1 trạng thái nào đó là `has-`:
```
<ul class="c-select c--has-selection">
    <li class="c-select__option c--is-selected">Item 1</li>
    <li class="c-select__option">Item 2</li>
    <li class="c-select__option">Item 3</li>
</ul>
```
Tuy nhiên trường hợp này cũng ít khi gặp.
### 10. Sử dụng dấu gạch ngang làm tiền tố khi muốn kết hợp nhiều class
Tất nhiên chúng ta nên hạn chế việc viết quá nhiều class trong cùng 1 phần tử, nhưng nếu không thể tránh khỏi thì có thể viết như này cho dễ nhìn:
```
<button class="btn -color-red -size-large -shape-round"></button>
```

***Một lưu ý nho nhỏ cuối cùng là bạn nên sử dụng nháy đơn thay vì nháy kép, để tránh bị nhiễu thông tin khi tệp HTML quá dài.***

Nguồn: 
* http://bdavidxyz.com/blog/how-to-name-css-classes/
* http://www.phpied.com/css-coding-conventions/
* https://csswizardry.com/2010/12/css-camel-case-seriously-sucks/
* https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/
* https://csswizardry.com/2013/04/shame-css/
* https://github.com/mobify/mobify-code-style/tree/master/css/class-naming-conventions#state