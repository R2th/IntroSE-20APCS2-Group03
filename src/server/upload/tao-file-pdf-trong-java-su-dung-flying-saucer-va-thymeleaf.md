Chắc hẳn các bạn đã quá quen thuộc với các file định dạng PDF. Nào là CV, các văn bản đặc tả spec, các công văn, báo cáo, các vé điện tử .v.v.v
Điều đó đặt ra yêu cầu các ứng dụng web phải có khả năng xuất file PDF với format nào đó phù hợp với từng yêu cầu của hệ thống chức năng.
Bài viết hôm nay của mình sẽ hướng dẫn các bạn dùng Java để thực hiện điều đó!

![](https://images.viblo.asia/aa6e3a66-ddbd-4c9c-9356-5edf17d80bda.png)

Trong bài này, các bạn sẽ thấy, quá trình xuất file PDF của mình gồm 2 bước chính như sau

1. Sử Thymeleaf để đưa dữ liệu vào mẫu và từ đó nhận được document dạng XHTML với các data đã được bind. Mình ví dụ hình trên, ${name} được gán với giá trị Thomas

2. Save document XHTML đó dưới dạng PDF sử dụng Flying Saucer.

` Lưu ý ` rằngm 2 bước trên là hoàn toàn đoọc lập. Chúng ta có thể dễ dàng sử dụng các template engine khác (ví dụ như Apache FreeMarker) hay thậm chí là HTML thuần. Tuy nhiên, bài viết này sử dụng Thymeleaf là bởi vì Thymeleaf là 1 template engine rất phổ biến được biệt là khi làm việc với Spring
# 1. Bước 1: Cài đặt project
Để bắt đầu, chúng ta cần 3 dependencies 
```
compile group: 'org.thymeleaf', name: 'thymeleaf', version: '3.0.6.RELEASE'
compile group: 'org.xhtmlrenderer', name: 'flying-saucer-core', version: '9.1.6'
compile group: 'org.xhtmlrenderer', name: 'flying-saucer-pdf-itext5', version: '9.1.6'
```

# 2. Bước 2: Thymeleaf Template
Đầu tiên, để đơn giản cho các bạn dễ hình dung, mình sẽ sử dụng 1 ví dụ đơn giản trước, Ở đây Thymeleaf Template mình tạo đơn giản như sau
```
<html>
    <body>
        <h1>Hi! My name is [[${name}]]!</h1>
    </body>
</html>
```
và đển render template này với ThymeLeaf, bạn có thể sử dụng đoạn code sau
```java
ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
templateResolver.setSuffix(".html");
templateResolver.setTemplateMode("HTML");
 
TemplateEngine templateEngine = new TemplateEngine();
templateEngine.setTemplateResolver(templateResolver);
 
Context context = new Context();
// Gán giá trị "Thomas" cho biến name để lát nữa bind dữ liệu
context.setVariable("name", "Thomas");
// Trả về chuỗi là html string sau khi thực hiện bind dữ liệu
String html = templateEngine.process("template", context);
```


Và như thế, bạn đã có 1 chuỗi là chuỗi htlml sau khi bind dữ liệu (name = Thomas).

Việc tiếp theo là sử dụng chuỗi này cho việc chuyển hóa sang PDF thôi.

`Chú ý` rằng, ví dụ này của mình chỉ là 1 ví dụ vô cùng đơn giản. ThymeLeaf thực tế còn mạnh hơn rất nhiều với việc cung cấp các cấu trúc lệnh for, if và gọi lệnh Java trong template. Bạn có thể tìm được rất nhiều các vi dụ và hướng dẫn trên internet :D Hãy thử nhé.

# 3. Bước 3: PDF Generation
Đến với bước 3, rất đơn giản. Về cơ bản, chúng ta chỉ cần có chuỗi HTML và sử dụng nó trong đọan code dưới đây

```Javaa
OutputStream outputStream = new FileOutputStream("message.pdf");
ITextRenderer renderer = new ITextRenderer();
renderer.setDocumentFromString(html);
renderer.layout();
renderer.createPDF(outputStream);
outputStream.close();

```

Và thành quả là đây

![](https://images.viblo.asia/73b59f76-dae1-4a2a-8537-c6e66c3a7f74.png)

# 4. Nâng cấp

Ví dụ bên trên thực tế là 1 ví dụ quá đơn giản và nó k đc áp dụng trong thực tiễn. Trong thực tế, file PDF có bố cục và nội dụng phức tạp hơn rất nhiều.
Như vậy, chúng ta thay đổi chiến thuật

![](https://images.viblo.asia/1f95899e-b04e-4890-9ab8-4f63b2c797fe.png)

Và như thế, để gen ra được 1 file PDF, chúng ta sẽ phải đi qua vài bước như sau

1. Đầu tiên, chúng ta có 1 Thymeleaf HTML template. Mẫu này được bind data bằng việc sử dụng Thymeleaf rendering engine
2. Flying Saucer yêu cầu XHTML. nên chúng ta cần chuyển đổi HTML sang XHTML. Để làm đc điều đó, chúng ta dùng JTidy. 
3. XHTML file refer tới các
4. Cuối cùng, chuyển đổi từ XHTML sang PDF bằng Flying Saucer

Chúng ta có thể làm design file PDF của mình bằng cách design thymeleaf template. Như là

Chỉ định file css
```
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" media="all"  href="style.css" />
    </head>
    <body>
        ...
```

Hoặc thậm chí viết css ngay trong đó
```
.logo {
    width: 275px;
}
 
h1 {
    font-size: 18px;
    margin-bottom: 40px;
    margin-top: 40px;
}
 
p {
    font-size: 12px;
}
```

Hoặc là nhét ảnh vào
```
<tr>
    <td><span class="barcode">*TEST BARCODE*</span></td>
    <td class="right"><img class="logo" src="logo.png"></td>
</tr>
```

Nói chung, về cơ bản, việc chúng ta cần phải làm là design XHTML cho ổn, sau đó FlyingSaucer sẽ chuyển đổi nó sang PDF cho bạn

Bài viết của mình được tham khảm từ



1. Generating PDFs with Java, Flying Saucer and Thymeleaf Part 1
https://tuhrig.de/generating-pdfs-with-java-flying-saucer-and-thymeleaf/

2. Generating PDFs with Java, Flying Saucer and Thymeleaf Part 2
https://tuhrig.de/generating-pdfs-with-java-flying-saucer-and-thymeleaf-part-2/

Và Github repository của tác giả 2 bài viết trên tại https://github.com/tuhrig/Flying_Saucer_PDF_Generation