![](https://images.viblo.asia/64a71c14-9304-43ff-9e73-96fbb53a6b0c.jpg)

Trong bài viết này, tôi sẽ giới thiệu cho các bạn những tính năng bảo vệ được tích hợp trong Angular nhằm chống lại những lỗ hổng bảo mật và những cuộc tấn công phổ biến trên các ứng dụng web ví dụ như `Cross-site scripting` attacks (XSS). Nó không bao gồm bảo mật ở tầng ứng dụng, ví dụ như authentication (người dùng này là ai) và authorization (người dùng này có thể làm những gì).

## Ngăn chặn cross-site scripting (XSS)
Nhắc lại một chút kiến thức cho các bạn nhớ, [Cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) là một trong những loại lỗ hổng bảo mật máy tính phổ biến nhất trong các ứng dụng web. `XSS` cho phép những kẻ tấn công inject các mã code độc vào trang web của bạn. Những mã code đó có thể ăn cắp dữ liệu của người dùng (cụ thể như dữ liệu đăng nhập) hoặc thực hiện những hành động giả mạo người dụng.
![](https://images.viblo.asia/1bb93767-4dcf-4ede-9d06-29818e86c57e.jpg)

Để chặn những tấn công `XSS` này, bạn phải ngăn chặn những mã code độc hại khỏi sự xâm nhập vào DOM (Document Object Model). Ví dụ, nếu những kẻ tấn công có thể đánh lừa bạn chèn một thẻ tag `<script>` vào trong DOM, chúng có thể thực thi những đoạn code tùy ý trên trang web của bạn. Những cuộc tấn công không chỉ giới hạn ở thẻ tag `<script>` - rất nhiều elements và properties khác trong DOM cho phép thực thi các đoạn code, ví dụ `<img onerror="..."> ` và `<a href="javascript:...">`. Nếu dữ liệu được kiểm soát bởi những kẻ tấn công vào DOM, một lỗ hổng bảo mật đã được hình thành.

### Mô hình bảo mật XSS của Angular
Để chặn những tấn công `XSS` một cách có hệ thống, Angular mặc định sẽ xử lý tất cả những giá trị không đáng tin cậy. Khi một giá trị được chèn vào DOM từ một template, thông qua các property, attribute, style, class binding hay interpolation, Angular sẽ sanitizes(khử độc) và escape những giá trị không đáng tin cậy.

Những Angular template giống như những đoạn code có thể thực thi: HTML, attributes, và binding expression (nhưng không phải là các giá trị ràng buộc) trong template là đáng tin cậy và an toàn. Điều này có nghĩa là ứng dụng phải ngăn chặn các giá trị mà một  kẻ tấn công có thể điều khiển từ lúc đưa nó vào mã nguồn của một template. Không bao giờ tạo ra mã nguồn template bằng cách nối các user input và template với nhau. Để ngăn chặn những lỗ hổng bảo mật này, sử dụng `offline template compiler`, hay còn được gọi là `template injection`.

### Sanitization và bối cảnh an ninh
`Sanitization` như đã nhắc đến ở trên,  là kiểm tra các giá trị không đáng tin cậy, biến nó thành một giá trị an toàn trước khi chèn nó vào DOM. Trong nhiều trường hợp, sanitization không làm thay đổi giá trị nào cả. Sanitization phụ thuộc vào ngữ cảnh: một giá trị vô hại trong CSS có khả năng gây nguy hiểm trong một URL.

Angular định nghĩa những bối cảnh an ninh sau đây:
- HTML được sử dụng khi thông dịch một giá trị như HTML, ví dụ, khi binding vào `innerHtml`.
- Style được sử dụng khi binding CSS vào `style` property.
- URL được sử dụng cho URL property, ví dụ `<a href>`.
- Resource URL là một URL sẽ được tải và thực thi như các đoạn mã, ví dụ, trong `<script src>`.

Angular khử độc những giá trị không đáng tin cậy cho HTML, các styles, và các URLs; khử độc những resource URLs là không thể bởi vì chúng chứa những mà code tùy ý. Trong development mode, Angular in ra một console warning khi nó phải thay đổi một giá trị trong quá trình khử độc.

### Một số ví dụ về sanitization
Template dưới đây bind giá trị của thuộc tính `htmlSnippet`, một lần bằng cách interpolating nó vào nội dung của element, một lần bằng cách binding nó vào thuộc tính `innerHTML` của element, và ta thu được kết quả như sau:

```typescripts
# src/app/inner-html-binding.component.html
<h3>Binding innerHTML</h3>
<p>Bound value:</p>
<p class="e2e-inner-html-interpolated">{{htmlSnippet}}</p>
<p>Result of binding to innerHTML:</p>
<p class="e2e-inner-html-bound" [innerHTML]="htmlSnippet"></p>
```

Những interpolated content sẽ luôn được escape - HTML sẽ không được thông dịch và browser sẽ vẫn hiển thị các `< >` trong nội dung của element.

Để HTML được thông dịch, bind nó vào trong một HTML property như `innerHTML`. Tuy nhiên, bind một giá trị mà một kẻ tấn công có thể kiểm soát 
vào `innerHTML` thường gây ra một lỗ hổng bảo mật XSS. Ví dụ, đoạn code chứa trong  thẻ tag `<script>` như sau:

```typescripts
export class InnerHtmlBindingComponent {
  // Ví dụ,  một giá trị bị một kẻ tấn công kiểm soát từ một URL.
  htmlSnippet = 'Template <script>alert("0wned")</script> <b>Syntax</b>';
}
```
Angular sẽ nhận biết giá trị không an toàn và tự động khử độc nó, loại bỏ thẻ tag `<script>` nhưng vẫn giữ lại những nội dung an toàn như nội dung bên trong thẻ `<script>` và phần tử `<b>`

> Template alert("Owned") **Syntax**


### Tránh sử dụng trực tiếp DOM APIs

Những DOM APIs được tích hợp sẵn trong browser không tự động bảo vệ bạn khỏi những lỗ hổng bảo mật. Ví dụ như, `document`, các nút có sẵn thông qua `ElementRef`, và nhiều API bên thứ 3 chứa những method không an toàn. Tránh tương tác trực tiếp với DOM, và thay vào đó sử dụng các Angular template khi có thể.


### Content security policy
`Content Security Policy (CSP)` là một kỹ thuật phòng thủ sâu để ngăn chặn XSS. Để cho phép CSP,  cấu hình web server của bạn trả về một HTTP header `Content-Security-Policy`.  Để tìm hiểu kĩ hơn về CSP, bạn có thể đọc bài viết sau đây [Giới thiệu về Content Security Policy](http://www.html5rocks.com/en/tutorials/security/content-security-policy/).

### Sử dụng offline template compiler 
Offline template compiler (OTC) giúp ngăn chặn toàn bộ các lớp của lỗ hổng bảo mật, được gọi là template injection, và cải thiện đáng kể hiệu suất của ứng dụng. Sử dụng OTC trong việc triển khai production, không tự động tạo ra các template. Angular tin tưởng template code, nên khi tạo ra các template, đặc biệt là các template chứa dữ liệu người dùng, có thể làm hỏng lớp bảo vệ được xây dựng của Angular. Để biết thêm thông tin về cách tạo ra các form động một cách an toàn, các bạn xem thêm hướng dẫn ở đây [Dynamic Forms](https://angular.io/guide/dynamic-form)

### Lớp bảo vệ XSS phía server

HTML được xây dựng trên phía server là những lỗ hổng dễ bị tấn công. Inject template code vào trong ứng dụng Angular giống như việc inject các đoạn mã code có thể thực thi vào trong ứng dụng: nó cho phép những kẻ tấn công chiếm toàn bộ quyền kiểm soát ứng dụng. Để ngăn chặn điều này, sử dụng ngôn ngữ template sẽ tự động escape những giá trị khỏi sự tấn công của XSS trên phía server. Không tạo ra Angular template trên phía server sử dụng một ngôn ngữ template; việc này mang lại một nguy cơ cao xảy ra một lỗ hổng bảo mật từ việc inject vào các template.

## Tin tưởng các giá trị an toàn
Đôi khi, ứng dụng của chúng ta thực sự cần include các đoạn mã thực thi, ví dụ hiển thị một `<iframe>` từ các URL, hay xây dựng các URL tiềm ẩn nguy hiểm. Để ngăn chặn việc tự động sanitization trong bất kì những tình huống đó, bạn có thể nói với Angular rằng bạn đã kiểm tra một giá trị, kiểm tra cách nó đã được tạo ra và chắc chắn rằng nó sẽ luôn được an toàn. Nhưng hãy cẩn thận. Nếu bạn tin tưởng một giá trị có thể bị dính độc hại, bạn đang vô tình đẩy ứng dụng của bạn rơi vào một lỗ hổng bảo mật đấy. Nếu như nghi ngờ chúng, hãy tìm kiếm chuyên gia đánh giá chuyên nghiệp. 

Để đánh dấu một giá trị là đáng tin cậy, inject [DomSanitizer](https://angular.io/api/platform-browser/DomSanitizer) và gọi một trong những methods sau đây:
- `bypassSecurityTrustHtml`
- `bypassSecurityTrustScript`
- `bypassSecurityTrustStyle`
- `bypassSecurityTrustUrl`
- `bypassSecurityTrustResourceUrl`

Hãy nhớ rằng, một giá trị an toàn hay không còn tùy thuộc vào ngữ cảnh, vì vậy hãy chọn một ngữ cảnh phù hợp cho mục đích sử dụng giá trị của bạn. Tưởng tượng rằng template dưới đây cần bind một URL vào một `javascript:alert(...)` như sau:

```typescripts
<h4>An untrusted URL:</h4>
<p><a class="e2e-dangerous-url" [href]="dangerousUrl">Click me</a></p>
<h4>A trusted URL:</h4>
<p><a class="e2e-trusted-url" [href]="trustedUrl">Click me</a></p>
```

Thông thường, Angular sẽ tự động khử độc các URL, vô hiệu hóa những đoạn mã nguy hiểm, và trong development mode, log những hành động này vào console. Để ngăn chặn điều này, đánh dấu giá trị của URL đó như một URL đáng tin cậy bằng cách sử dụng `bypassSecurityTrustUrl` như sau:

```typescript
constructor(private sanitizer: DomSanitizer) {
  // javascript: URLs sẽ là nguy hiểm nếu như bị kẻ tấn công kiểm soát
  // Angular sẽ khử độc chúng trong data binding, nhưng bạn có thể
  // nói cho Angular rằng bạn tin tưởng chúng:
  this.dangerousUrl = 'javascript:alert("Hi there")';
  this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
}
```
![](https://images.viblo.asia/b2d7ee82-5aa5-4c5c-8216-4ae7d426648c.png)

Nếu bạn cần convert user input thành các giá trị tin cậy, sử dụng một controller method. Template dưới đây cho phép user nhập một Youtube video ID và load video tương ứng trong một thẻ `<iframe>`. Thuộc tính `<iframe src>` là một resource URL security context, bởi vì một nguồn không đáng tin cậy có thể bất hợp pháp trong file download mà người dùng không nghi ngờ có thể được thực thi. Do vậy, gọi một method trong controller để xây dựng một video URL đáng tin cậy, mà Angular cho phép binding vào `<iframe src>`:

```typescripts
<h4>Resource URL:</h4>
<p>Showing: {{dangerousVideoUrl}}</p>
<p>Trusted:</p>
<iframe class="e2e-iframe-trusted-src" width="640" height="390" [src]="videoUrl"></iframe>
<p>Untrusted:</p>
<iframe class="e2e-iframe-untrusted-src" width="640" height="390" [src]="dangerousVideoUrl"></iframe>
```

```typescript
constructor() {
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    this.videoUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
}
```

**Các bạn có thể xem code demo ở [link sau đây](https://stackblitz.com/angular/ynyojrvmxka)**

## Những lỗ hổng bảo mật ở tầng HTTP
Angular đã tích hợp sẵn những công cụ giúp ngăn chặn 2 lỗ hổng bảo mật phổ biến trên HTTP, đó là `cross-site request forgery (CSRF hay XSRF)` và `cross-site script inclusion (XSSI)`. Cả hai trong số đó đều phải được ngăn chặn chủ yếu ở server side, tuy nhiên Angular cung cấp những hỗ trợ giúp cho việc tích hợp nó ở client side một cách dễ dàng hơn.

###  Cross-site request forgery (CSRF hay XSRF)

Trong một `cross-site request forgery`, kẻ tấn công đánh lừa người dùng vào một trang web khác (ví dụ `evil.com`) với những mã code độc hại, bí mật gửi những request độc hại đến web server của ứng dụng (ví dụ 1 trang web ngân hàng nào đó `example-bank.com`).

Giả sử người dùng đã đăng nhập thành công vào trang web của ngân hàng `example-bank.com`. Sau đó người dùng mở 1 email và click vào đường dẫn đến `evil.com`, mở một tab mới.

Trang web `evil.com` ngay lập tức gửi một request độc hại tới `example-bank.com`. Có thể đó là một request chuyển tiền từ tài khoản người dùng đến tài khoản của kẻ tấn công. Trình duyệt sẽ tự động gửi những cookies từ `example-bank.com` (bao gồm cookie cho việc xác thực) kèm theo những request đó.
![](https://images.viblo.asia/6956c319-1016-4b53-831b-5cff2d081543.png)

Nếu như server của `example-bank.com` thiếu những sự bảo vệ từ XSRF, nó sẽ không thể phân biệt được một request hợp pháp từ ừng dụng với một yêu cầu giả mạo từ `evil.com`.

Để ngăn chặn điều này, ứng dụng phải đảm bảo rằng request của người dùng bắt nguồn từ chính ứng dụng đó chứ không phải từ một trang web khác. Server và client phải hợp tác với nhau để ngăn chặn những tấn công.

Trong những kĩ thuật chống XSRF phổ biến, server của ứng dụng gửi một token xác thực được tạo ngẫu nhiên trong một cookie. Phía client sẽ đọc cookie đó và thêm một custom request header với token đó trong những request sau đó. Server sẽ so sánh giá trị cookie gửi đi với cookie nhận được trong request header và sẽ từ chối những request nếu như nó thiếu cookie hoặc cookie không đúng.

Kĩ thuật này hiệu quả bởi vì tất cả các trình duyệt đều implement *same origin policy*. Chỉ những trang web mà cookies được thiết lập mới có thể đọc được những cookies đó từ trang web đó và thiết lập một custom header trong request tới trang web đó. Nó có nghĩa là chỉ ứng dụng của bạn mới có thể đọc được những cookie token này và set custom header. Những mã code độc hại trên `evil.com` thì không thể làm điều đó.

Thư viện `HttpClient` của Angular đã tích hợp sẵn hỗ trợ cho phía client một nửa của kĩ thuật này. Bạn có thể đọc kĩ hơn ở đây [HttpClient](https://angular.io/guide/http#security-xsrf-protection).

### Cross-site script inclusion (XSSI)
`Cross-site script inclusion` được biết đến như một lỗ hổng về JSON, nó có thể cho phép trang web của kẻ tấn công đọc được dữ liệu từ một JSON API. Những cuộc tấn công này được thực hiện trên những trình duyệt cũ hơn bằng cách override native Javascript object constructor, sau đóinclude một API URL sử dụng một thẻ `<script>`.

Tấn công kiểu này chỉ thành công nếu JSON trả về được thực thi như Javascript. Server có thể ngăn ngừa tấn công kiểu này bằng cách thêm tiền tố cho những JSON response để làm cho chúng không thể thực thi được,  theo quy ước, sử dụng string ` ")]}',\n"`.

 Thư viện `HttpClient` của Angular nhận biết những quy ước này và tự động strip những string ` ")]}',\n"` từ tất cả những response trước khi phân tích thêm chúng.
 
 ## Kết luận
 Trên đây, tôi đã giới thiệu cho các bạn về những lỗ hổng dễ mắc phải trên các ứng dụng web. Angular đã tích hợp cho mình những công cụ hỗ trợ cho việc ngăn chặn được những lỗ hổng đó. Hãy sử dụng nó một cách có hiệu quả để bảo vệ trang web của bạn nhé.

## Tài liệu tham khảo
1. https://angular.io/guide/security
2. https://docs.angularjs.org/guide/security