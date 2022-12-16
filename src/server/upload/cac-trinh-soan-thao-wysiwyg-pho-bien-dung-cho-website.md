Trong qúa trình làm web mình có sử dụng qua khá nhiều editor phục vụ cho việc soạn thảo nội dung dễ dàng, trực quan hơn. Mỗi editor sẽ có những ưu điểm, nhược điểm riêng. Các bạn có thể vào trang web của chúng để tìm hiểu thêm vì giới hạn ở bài viết này mình không thể đề cập quá nhiều nội dung mà chủ yếu chỉ đề xuất những cái tên để các bạn có thể biết và tham khải,

> WYSIWYG là chữ viết tắt của What You See Is What You Get (thấy sao là ra vậy). Những editors này có giao diện biên tập văn bản sẽ hiển thị chính xác cách hiển thị của mã nguồn khi xuất bản thành trang web. Sử dụng WYSIWYG editor thì bạn không cần kiến thức về HTML; vì vậy sẽ dễ dàng hơn với những ai không có kinh nghiệm lập trình.
> 
Các bạn có thể hình dung nó giống như khi các bạn gõ văn bản trong Microsoft Word vậy. Cứ chọn định dạng trên thanh công cụ.
![](https://images.viblo.asia/de1489ce-f6ea-485a-84da-a613cc720da8.png)

Một số tính năng phổ biến của  cacs **WYSIWYG editor** phải kể đến như:

* Định dạng kiểu chữ in đậm, nghiêng, gạch chân, …
* Tạo các tiêu đề văn bản từ h1 -> h6, …
* Tạo các liên kết link trong tài liệu
* Thiết lập kiểu font chữ, màu sắc và kích thước, …
* Tạo danh sách gạch đầu dòng (đánh số hoặc ký tự)
* Tạo bảng
* Căn chữ, căn lề, …
* Nhúng link ảnh, link phim, flash hoặc các tập tin media.
* Chỉnh sửa HTML trực tiếp nếu muốn.

Nếu nói về tính phổ biến của 1 số html `WYSIWYG editor` hiện này thì người ta thường nghĩ ngay tới `CKeditor` hay `Tinymce`.Không chỉ đẹp, phong phú về giao diện, đầy đủ về tính năng mà khả năng mở rộng, tương thích của chúng với nhiều mã nguồn, framework hiện nay cũng như dễ dàng để tích hợp chúng vào trang web của bạn

Tuy nhiên, có một số trường hợp mình lại ít khi dùng tinymce bởi dùng khi nhúng vào website, chúng khá nặng. Mình lại thích kiểu đơn giản, ví dụ trong trường hợp sử dụng cho khung bình luận của website chẳng hạn. Mình sẽ ưu tiên 1 số edior WYSIWYG nhẹ nhàng hơn. 

## Cách cài đặt chung của các WYSIWYG editor

Hầu hết các HTML WYSIWYG này đều có 1 cách cài đặt chung đơn giản như sau:

```
Bước 1: Tải về file source (Js, css, images) của chúng ( Hoặc include từ link CDN). Sau đó include script, stylesheet vào phần header hoặc footer của website.

Bước 2: Xác định id của input text, textarea hoặc content editable mà bạn muốn biến chúng thành WYSIWYG. Sử dụng funtion mà các editor đó hỗ trợ để replace chúng thành WYSIWYG editor
```

## Các WYSIWYG khuyên dùng

Mình sẽ không sắp xếp theo tính phổ biến, do đó mà mình sẽ đặt Ckeditor hay Tinymce ở cuối cùng vì chúng quá phổ biến và ai cũng biết rồi

### 1. NicEdit
![](https://images.viblo.asia/f86050ba-b68f-4dc9-bba8-a389c871fe49.png)

**Đặc điểm nổi bật**

+ Rất nhẹ và dễ dàng tích hợp.
+ Dễ dàng custom giao diện.

**Cách cài đặt.**

1. Các bạn vào trang chủ của nó để tải source code mới nhất về: http://nicedit.com/download.php hoặc sử dụng link js có sẵn.
2. Chèn script vào header của website:
` <script type="text/javascript" src="http://js.nicedit.com/nicEdit-latest.js"></script>`
 3. Chèn thêm đoạn này để khởi tạo nicEdit 

```
<script type="text/javascript">
        bkLib.onDomLoaded(function() {
             new nicEditor().panelInstance('area1');
        }); // Thay thế text area có id là area1 trở thành WYSIWYG editor sử dụng nicEditor
</script>
```
**Một ví dụ đầy đủ như sau**
```
<html>
<head>
  <title>WYSIWYG editor với nicEditor</title>  
<script type="text/javascript" src="http://js.nicedit.com/nicEdit-latest.js"></script>
  <script type="text/javascript">
  bkLib.onDomLoaded(function() {
        new nicEditor({maxHeight : 200}).panelInstance('area');
  });
  </script>
</head>
<body>
<div id="sample">
  <h4>Simple textarea</h4>  
  <textarea name="area" id="area" style="width:70%;height:200px;">
      Đây là nội dung
  </textarea>
</div>
</body>
</html>
```

### 2. MooEditable
Tuy rằng cái editor này đã khá lâu, không được cập nhật và hỗ trợ nữa nhưng mình thấy nó khá là đơn giản. Phù hợp để các bạn sử dụng cho phần bình luận trên website

Các bạn có thể thử sử dụng nó qua demo này: http://cheeaun.github.io/mooeditable/

![](https://images.viblo.asia/1e368f36-8cc9-4ef4-9a1e-750a9058cb55.png)
Tìm hiểu thêm về các chức năng nó hỗ trợ ở trang document: http://cheeaun.github.io/mooeditable/docs.html

### 3. jHtmlArea
Nhiếu người nhận xét giao diện thằng này hơi xấu. Nhưng mình thì lại thấy nó đơn giản, đủ xài. Nếu cần đẹp thì các bạn có thể css lại xóa border của nó đi hoặc thay thế các icon button chẳng hạn.

![](https://images.viblo.asia/c3e16a37-a79e-4d4b-9081-4d88d0a0b8d3.png)
Trải nghiệm và sử dụng nó tại Link: http://pietschsoft.com/demo/jHtmlArea/

### 4. wiris
Nếu nói về soạn thảo công thức toán học Latex hay công thức hóa học trực tiếp trên website thì có lẽ ở thời điểm hiện tại. Chưa có cái editor nào vượt mặt được wiris. Dễ dàng cài đặt, dễ sử dụng, đầy đủ ác loại công thức có lẽ là những nhận xét tổng quát về nó.
![](https://images.viblo.asia/7a564e6b-7fda-4ee4-9bb5-184efa06d689.png)

Nếu không thích gõ, hay click vào các công thức, bạn cũng có thể viết( vẽ) bằng tay. Wiris sẽ nhận dạng chúng và hiển thị đúng nhất với mong muốn của bạn.
![](https://images.viblo.asia/4782d405-0c73-4d82-88b6-dfdaed91ea32.png)

### 5. quilljs
Trang chủ: https://quilljs.com/

Mình khá thích giao diện của quilljs, có hỗ trợ dạng giao diện inline giống medium rất đẹp. Các chức năng đủ dùng, có hỗ trợ gõ công thức toán học Latex. Cài đặt cũng chỉ cần include 1 file js mà thôi
![](https://images.viblo.asia/67af1b04-04e3-4ced-8816-7cb0ffac2e1e.png)

### 6. Ckeditor
Đã quá nổi tiếng rồi nên mình sẽ không cần phải giới thiệu gì thêm nữa. Ngoài chức năng soạn thảo thì nó còn hỗ trợ thêm các plugin tải file và quản lý file rất mạnh mẽ, trong đó phải kể tới **Ckfinder**

Tuy nhiên như mình đã đề cập ở ban đầu, cái gì mà hỗ trợ quá nhiều chức năng thì rất là nặng, sẽ làm giảm tốc độ website của bạn. Do đó, bạn hãy cân nhắc khi sử dụng, nếu thật sự cần hỗ trợ nhiều định dạng cho khung soạn thảo thì mới sử dụng chúng. Còn nếu chỉ cần 1 số định dạng cơ bản thôi thì hãy sử dụng những editor khác ở trên.

### 7. Tinymce

Đây có lẽ là đối thủ hiện tại của CKEditor, hầu hết những chức năng CKeditor có thì Tinymce cũng có.