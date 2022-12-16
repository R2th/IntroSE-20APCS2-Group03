Lightbox plugin của jquery là một thư viện javascript dùng để tạo image slide. Khi người dùng click vào một hình thumbnail, lightbox sẽ tạo một khung để hiển thị hình ảnh được phóng lớn, cung cấp các nút để người dùng duyệt hình ảnh. Cái này sẽ rất tiện khi chúng ta xem ảnh gốc trực tiếp.

Các bạn có thể xem qua một vài demo: https://bevry-archive.github.io/jquery-lightbox/demo/

Để sử dụng Lightbox cho vào trong website của mình, các bạn làm như sau:

1. Tải thư viện [Lightbox](https://github.com/bevry-archive/jquery-lightbox/archive/master.zip) về dưới máy tính của mình.
2. Giải nén và di chuyển thư mục` jquery-lightbox` đến một nơi nào đó trên máy chủ web của bạn.
3. Chèn thư viện jquery vào trong thẻ `<head>`

```
<!-- Include jQuery (Lightbox Requirement) -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
```

4. Chèn thư viện Lightbox vào trong thẻ `<head>`

```
<!-- Include Lightbox (Production) -->
<script type="text/javascript" src="http://www.yoursite.com/somewhere/on/your/webserver/jquery-lightbox/scripts/jquery.lightbox.min.js"></script>
```

5. Sử dụng thuộc tính `rel` có chứa `lightbox` vào thư viện của Lightbox

`<a rel="lightbox-mygallery" href="...` 

hoặc

`<a rel="lightbox" href="...`

Sau đó, sử dụng đoạn code bên dưới vào trước thẻ `</body>`

```
<script type="text/javascript">
    $('a:has(img)').lightbox();
</script>
```

Ngoài ra, bạn có thể tuỳ chỉnh thêm các tham số cho phù hợp với mục đích của mình. Chúc các bạn thành công!