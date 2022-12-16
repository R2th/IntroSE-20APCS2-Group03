Trong bài viết này, chúng ta sẽ tìm hiểu về các loại font được sử dụng cho web (web fonts), cách sử dụng web fonts sao cho hợp lý và giải quyết một số lỗi liên quan đến việc tích hợp web fonts.
# Các loại định dạng của web fonts
## 1. Embedded OpenType (EOT):
EOT là định dạng được phát triển bởi Microsoft hơn 15 năm về trước. EOT thường không được nén và là định dạng duy nhất mà trình duyệt Internet Explorer (IE) từ phiên bản 8 trở xuống có thể nhận dạng được khi sử dụng @font-face. Nếu không có ý định hỗ trợ IE8 hoặc các phiên bản thấp hơn thì tốt nhất nên bỏ qua định dạng font này. 
## 2. TrueType (TTF):
TTF là định dạng font được phát triển bởi Microsoft và Apple vào những năm 1980. Những phiên bản TTF mới sau này được gọi là TrueType OpenType. TTF có thể hỗ trợ những trình duyệt cũ, đặc biệt trên cả những thiết bị di động.
Ngoài ra, TTF còn cung cấp một cơ chế quản lý bản quyền số cơ bản. Theo đó, một giá trị cờ được nhúng vào font sẽ xác định người sử dụng font có quyền được tích hợp vào file PDFs hay websites hay không. Đối với các phiên bản IE từ 9 trở lên, TTF chỉ hoạt động được nếu những bit tích hợp (embedding bits) được đặt về giá trị là installable. 
## 3. Web Open Font Format (WOFF)
WOFF ra đời năm 2009 và được phát triển bởi Mozilla cùng một số tổ chức khác. WOFF fonts thường load nhanh hơn những định dạng khác bởi nó là phiên bản nén, cấu tạo kết hợp từ 2 loại font là OpenType và TrueType. Định dạng này cũng có thể chứa metadata và những thông tin về giấy phép sử dụng.
## 4. Web Open Font Format 2 (WOFF2) 
WOFF2 là phiên bản nâng cấp của WOFF được phát triển bởi Google. Đây được coi là định dạng web font tốt nhất hiện nay bởi dung lượng nhỏ hơn và hỗ trợ tốt hơn cho các trình duyệt về mặt hiệu năng. Khả năng nén của WOFF 2 trung bình cao hơn 30% so với WOFF 1 (và có thể lên tới hơn 50% trong một số trường hợp).

Ngoài ra còn có 2 loại font khác nữa: 
- **Scalable Vector Graphics (SVG)**: SVG fonts là những file text chứa các đường tượng hình thể hiện các thành phần và thuộc tính SVG chuẩn. Mỗi file là một đối tượng vector đơn lẻ. Điều này cũng chính là điểm yếu lớn nhất của định dạng font này. SVG fonts không bao giờ được nén và thường có kích thước khá lớn. SVG là định dạng duy nhất được sử dụng trên các phiên bản Safari cho iOS từ 4.1 trở xuống. Hiện tại, SVG không được hỗ trợ trên các trình duyệt FireFox, IE, IE Mobile và Opera Mini.
- **TrueType Collection (TTC)**: là một phần mở rộng của định dạng TrueType khi mà cho phép gộp nhiều font thành một file, tiết kiệm một phần lớn không gian lưu trữ đối với các bộ fonts có nhiều biểu tượng giống nhau. TTC ban đầu được sử dụng trên các phiên bản hệ điều hành Windows tiếng Trung,tiếng Nhật và tiếng Hàn. Sau đó nó được sử dụng trên tất cả các phiên bản của Windows 2000 trở về sau. Mac OS bắt đầu hỗ trợ TTC từ phiên bản Mac OS 8.5
# Tích hợp web fonts
Web fonts được sử dụng thông qua cú pháp `@font-face`:
```css
@font-face {
  font-family: 'FontName';
  src: url('webfont.eot'); /* IE9+ Compat Modes */
  src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('webfont.woff2') format('woff2'), /* Super modern browsers */
       url('webfont.woff') format('woff'), /* Modern browsers */
       url('webfont.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('webfont.svg#FontName') format('svg'); /* Legacy iOS */
}
```
Khi font đã được định nghĩa và khai báo, chúng có thể được sử dụng như sau:
```css
body {
  font-family: 'FontName', Helvetica, Arial, sans-serif;
}
```
# Các lỗi khi sử dụng web fonts
Các lỗi khi sử dụng web fonts có thể theo dõi trên tab Console của trình duyệt:
* **CSS3117: @font-face failed cross-origin request. Resource access is restricted.**

Lỗi này xảy ra trên Firefox và IE khi sử dụng web fonts trên remote servers (CDN chẳng hạn) mà không khai báo tường minh header `Access-Control-Allow-Origin`. Lý do là bởi IE và Firefox mặc định sẽ không cho phép font ở một tên miền khác. Trong khi đó, Chrome sẽ load font bình thường. Nếu không nhận ra vấn đề là ở cross-origin thì sẽ rất khó để debug lỗi này. Trong trường hợp này sẽ có 2 cách giải quyết. Một là để font trên cùng một tên miền. Hai là khai báo header trong file .htaccess như sau:
```
<FilesMatch "\.(ttf|otf|eot|woff)$">  
    <IfModule mod_headers.c>
        Header set Access-Control-Allow-Origin http://mydomain.com"
    </IfModule>
</FilesMatch>  
``` 
* **CSS3114: @font-face failed OpenType embedding permission check. Permission must be Installable.**

Lỗi này thường xảy ra khi file EOT đã từng là một file TTF bị khóa (giả sử sau khi chuyển đổi từ TTF sang EOT). TTF đã khóa có một giá trị cờ tích hợp để xác định tính hợp pháp khi sử dụng font trên một file hay một website. Có một công cụ cho phép thay thế giá trị cờ này mang tên là TTFPatch. Tuy nhiên, TTFPatch không đảm bảo tính hợp pháp của font. Do đó việc sử dụng font vẫn có thể được coi là vi phạm bản quyền. Tốt hơn hết là nên sử dụng font một cách hợp pháp.
* **CSS3111: @font-face encountered unknown error.**

Lỗi này khá là mập mờ và khó debug bởi nội dung message không cụ thể. Một trong những điều cần làm nhất đó là kiểm tra lại nguồn gốc của font. Đơn cử như việc chuyển đổi font từ TTF sang EOT có thể khiến NAME table của file không tuân thủ những chuẩn của Microsoft. Do đó, những font EOT sẽ không được load trên IE và sinh ra lỗi CSS3111. Khi gặp phải lỗi này sau khi chuyển đổi font từ TTF sang EOT, nên cân nhắc sử dụng những bộ chuyển đổi khác.

Các trang chuyển đổi font hữu ích:

* http://www.fontsquirrel.com/fontface/generator
* http://fontface.codeandmore.com
* http://www.font2web.com/
* https://transfonter.org/
# Tài liệu về web fonts
* [**Clagnut’s OpenType CSS Sandbox** ](http://clagnut.com/sandbox/css3/) by **Richard Rutter**: Một nơi hữu ích để kiểm tra những đặc tính của OpenType và dễ dàng kết hợp những đoạn CSS code.
* [**Webfont Handbook**](https://abookapart.com/products/webfont-handbook) by **Bram Stein**: Cuốn sách chuyên sâu về web fonts, font rendering và hiệu năng của font. 
* [ **Copy Paste Character** ](http://copypastecharacter.com/): Website cho phép tiếp cận tới khá nhiều ký tự đặc biệt.
* [**Using @font-face**](https://css-tricks.com/snippets/css/using-font-face/) by **CSS-Tricks**: Bài viết về việc khai báo web fonts dựa trên việc hỗ trợ trình duyệt đa nền tảng

### *Tham khảo*
* **Thierry Blancpain**, [Understanding Web Fonts and Getting the Most Out of Them](https://css-tricks.com/understanding-web-fonts-getting/)
*  **Marin Bezhanov**, [How to Embed Webfonts Properly and How to Solve the Ambiguous "CSS3111: @font-face encountered unknown error"](http://marinbezhanov.com/how-to-embed-webfonts-properly-and-how-to-solve-the-ambiguous-css3111-font-face-encountered-unknown-error/)
*  **Transfonter.org,** [Webfont formats](https://transfonter.org/formats)