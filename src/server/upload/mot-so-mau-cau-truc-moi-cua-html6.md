## HTML6 là gì?
HTML6 là phiên bản thứ sáu của HTML với không gian tên có cấu trúc như XML, không gian tên XML sẽ giúp bạn sử dụng cùng một từ khóa mà không mâu thuẫn với bất kỳ thẻ khác. Ví dụ những sử dụng trong các DOCTYPE XHTML:
```
1xmlns: xhtml = " http://www.w3.org/1999/xhtml "
```

Trước đây HTML5 đã đem lại nhiều tính năng thú vị cho thiết kế website như âm thanh, hỗ trợ video, lưu trữ offline địa phương, và quan trọng nhất là khả năng xây dựng các trang web tối ưu hóa điện thoại di động. Tuy nhiên nó vẫn còn trong giai đoạn phát triển và vẫn chưa thực sự trở thành một dấu mốc quan trọng cho HTML. Nó cần phải phát triển thêm và đó cũng chính là lí do mà HTML6 đang chuẩn bị hoàn tất để ra mắt.

## Các cấu trúc mới của HTML6
HTML6 sẽ cung cấp cho chúng ta những lợi ích sử dụng thẻ mà chúng ta muốn và sẽ không phải chỉ sử dụng các thẻ được định nghĩa.

Ví dụ về HTML6:

```
<!DOCTYPE html>
<html:html>
    <html:head>
        <html:title>A Look Into HTML6</html:title>
        <html:meta type="title" value="Page Title">
        <html:meta type="description" value="HTML example with namespaces">
        <html:link src="css/mainfile.css" title="Styles" type="text/css">
        <html:link src="js/mainfile.js" title="Script" type="text/javascript">
    </html:head>
    <html:body>
        <header>
            <logo>
                <html:media type="image" src="images/xyz.png">
            </logo>
            <nav>
               <html:a href="/img1">a1</a>
               <html:a href="/img2">a2</a>
             </nav>
        </header>
        <content>
            <article>
                <h1>Heading of main article</h1>
                <h2>Sub-heading of main article</h2>
                <p>[...]</p>
                <p>[...]</p>
            </article>
            <article>
                <h1>The concept of HTML6</h1>
                <h2>Understanding the basics</h2>
                <p>[...]</p>
               </article>
        </content>
        <footer>
            <copyright>This site is &copy; to Anonymous 2014</copyright>
        </footer>
    </html:body>
</html:html>
```

Nhìn vào các tài liệu HTML6 ở trên, bạn sẽ thấy một số thẻ lẻ  `<html: x>`. Những thẻ lẻ là các yếu tố không gian tên thuộc về W3C và HTML6 , và sẽ kích hoạt sự kiện trình duyệt. Ví dụ, `<html: title>` phần tử sẽ thay đổi thanh tiêu đề của trình duyệt của bạn và` <html: media>`  sẽ giúp làm cho hình ảnh được xác định xuất hiện trên màn hình trình duyệt của bạn. Phần tốt nhất là tất cả các yếu tố này được xác định cụ thể cho người sử dụng và không có bất cứ điều gì để làm với các trình duyệt. Chúng chẳng có gì hơn những cái mác cho JavaScript và style sheet để làm cho mẫu mã của bạn nhiều ngữ nghĩa.

## HTML6 APIs – Giao diện chương trình ứng dụng

Các thẻ HTML6 sẽ có html namespace như `<html: html>` hoặc `<html: head>` , v.v.. Hãy nhìn vào những thuộc tính của mỗi thẻ, được sử dụng trong các tài liệu ví dụ HTML6 ở trên.


- <html: html>

```
<!DOCTYPE html>
<html:html>// this is equivalent to <html> tag written in previous HTML versions
  <!-- sample of HTML document -->
</html:html>
```

- <html: head>

Thẻ này là tương đương với <head> tag. Đó là mục đích là để có được dữ liệu và kịch bản mà tweaks thế nào nội dung được hiển thị bên trong thẻ <html: body> 
```
<!DOCTYPE html>
<html:html>
  <html:head>
    <!-- Main content would come here, like the <html:title> tag -->
  </html:head>
</html:html>
```
    
- <html: title>

Như tên gọi của nó, nó sẽ thay đổi tiêu đề của tài liệu HTML, và tương tự như thẻ <title> được sử dụng trong các phiên bản HTML trước đó. Thẻ này được sử dụng bởi các trình duyệt để thay đổi thanh tiêu đề yêu thích, v.v.
    
```
<!DOCTYPE html>
<html:html>
  <html:head>
    <html:title>A Look Into HTML6</html:title>
  </html:head>
</html:html>
```
    
- <html: meta>
    
    Thẻ này khác nhau một chút với thẻ <meta>  được sử dụng trong các phiên bản HTML mới nhất. Sử dụng thẻ HTML6 này bạn có thể sử dụng bất kỳ loại dữ liệu meta. Không giống như HTML5 bạn sẽ không phải sử dụng các loại meta tiêu chuẩn trong HTML6. Nó giúp tích lũy thông tin như mô tả trang web, bằng cách lưu trữ nội dung.

```
  <!DOCTYPE html>
    <html:html>
      <html:head>
        <html:title>A Look Into HTML6</html:title>
        <html:meta type="description" value="HTML example with namespaces">
      </html:head>
    </html:html>
```
    
- <html: link>
    
    Thẻ này sẽ giúp bạn liên kết tài liệu bên ngoài và các kịch bản (như CSS, JS vv) để các tài liệu HTML. Nó tương tự như thẻ <link> được sử dụng trong HTML5. Thẻ này bao gồm các thuộc tính sau:

    * charset: “UTF-8” nhân vật mã hóa.
    * href: Nó chứa liên kết đến tập tin nguồn của bạn.
    * media: Điều này xác định các loại thiết bị mà hàng của bạn sẽ chạy, ví dụ, “điện thoại thông minh” hoặc “máy tính bảng”.
    * type: kiểu MIME của tài liệu

```
<!DOCTYPE html>
<html:html>
  <html:head>
    <html:title>A Look Into HTML6</html:title>
 <html:link src="js/mainfile.js" title="Script" type="text/javascript">
  </html:head>
</html:html>
```
    
- <html: body>
    
    Điều này cũng giống như thẻ <body> mà bạn đã sử dụng trong phiên bản HTML hiện hành. Đây là nơi mà tất cả các công cụ trang web của bạn như văn bản, phương tiện truyền thông và những người khác được đặt.
    
```
<!DOCTYPE html>
<html:html>
  <html:head>
    <html:title>A Look Into HTML6</html:title>
  </html:head>
  <html:body>
    <!-- This is where your website content is placed -->
  </html:body>
</html:html>
```
    
- <html: a>
    
    Thẻ này là tương tự như các thẻ <a>, và được sử dụng để đại diện cho một liên kết đến trang web khác. Tuy nhiên, không giống như các <a> thẻ <html: a> chỉ mất một đơn ‘href’ thuộc tính, trong đó chỉ đạo các liên kết đến các trang web mà bạn cần phải truy cập.
    
```
<!DOCTYPE html>
<html:html>
  <html:head>
    <html:title>A Look Into HTML6</html:title>
  </html:head>
  <html:body>
    <html:a href="http://siteurl">Go to siteurl.com!</html:a>
  </html:body>
</html:html>
```
    
    
- <html: buton>
    
    Thẻ này là tương đương với thẻ <button> hoặc <input type = "button"> được sử dụng trong các phiên bản HTML hiện hành và lớn hơn. Thẻ này cho phép bạn tạo ra một nút để giúp người dùng thực hiện một số tương tác trên trang web của bạn. Nó đã là một thuộc tính bị vô hiệu hóa.
    
```
<!DOCTYPE html>
<html:html>
  <html:head>
    <html:title>A Look Into HTML6</html:title>
  </html:head>
  <html:body>
    <html:button>Click Here</html:button>
  </html:body>
</html:html>
```
    
- <html: media>
    
    Thẻ này quấn lên tất cả các thẻ <media> như <img> , <video> , <embed> ,v.v..Bằng cách sử dụng thẻ <html: media>, bạn không còn phải xác định một từ khóa cho từng loại tập tin. Các thẻ <html: media> mà bạn đang sử dụng sẽ được thực hiện bởi các trình duyệt dựa trên các loại thuộc tính (nếu được cung cấp), hoặc nó sẽ chỉ làm cho một đoán trên cơ sở mở rộng tập tin, hoặc bằng loại MIME

```
<!DOCTYPE html>
<html:html>
  <html:head>
    <html:title>A Look Into HTML6</html:title>
  </html:head>
  <html:body>
    <!-- Image would come here -->
    <html:media src="img1/logo.jpg" type="image">
    <!-- Video doesn't need a type -->
    <html:media src="videos/slide.mov">
  </html:body>
</html:html>
```
    
 HTML6 vẫn chưa thực sự được ra mắt, nhưng nó sẽ sớm được chào bán và cung cấp bởi Oscar Godson. Bài viết này sẽ cung cấp cho bạn một cái nhìn tổng quan về một số khái niệm cơ bản của HTML6. Hi vọng bạn sẽ tìm thấy nhiều điều bổ ích từ bài viết.
      
Tham khảo: https://www.script-tutorials.com/a-look-into-html6-what-is-it-and-what-it-has-to-offer/