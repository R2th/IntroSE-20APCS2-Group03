Làm việc với hình ảnh trong JavaScript có thể khá khó khăn và cồng kềnh. Rất may, có một số thư viện có thể làm cho mọi thứ dễ dàng hơn nhiều. Dưới đây là những thư viện hữu dụng.

## 1. Pica

Plugin này giúp bạn giảm kích thước tải lên cho hình ảnh lớn do đó tiết kiệm thời gian tải lên. Nó cho phép bạn thay đổi kích thước hình ảnh trong trình duyệt của bạn mà không bị vỡ ảnh và nhanh chóng hợp lý. Nó tự động chọn các công nghệ tốt nhất có sẵn từ các web-workers, web assembly, createdImageBitmap và JS thuần túy.
[Demo](http://nodeca.github.io/pica/demo/)
[Github](https://github.com/nodeca/pica)

![](https://images.viblo.asia/9db56ff3-00ed-418d-b9e7-c2d5fb536069.png)

## 2. Lena.js

Thư viện hình ảnh mới mẻ này có kích thước rất nhỏ nhưng có khoảng 22 bộ lọc hình ảnh khá tuyệt để sử dụng. Bạn cũng có thể tạo và thêm các bộ lọc mới vào repo Github.

[Demo](https://fellipe.com/demos/lena-js/)
[Tutorial](https://ourcodeworld.com/articles/read/515/how-to-add-image-filters-photo-effects-to-images-in-the-browser-with-javascript-using-lena-js)
[Github](https://github.com/davidsonfellipe/lena.js)

![](https://images.viblo.asia/b8425671-00c2-42d4-b508-dafc0fcb8cd0.png)

## 3. Compressor.js

Đây là một trình nén hình ảnh JS đơn giản sử dụng API canvas.toBlob của Trình duyệt để xử lý việc nén ảnh. Nó cho phép bạn set chất lượng đầu ra của ảnh được nén từ khoảng 0 đến 1.

[Demo](https://fengyuanchen.github.io/compressorjs/)
[Github](https://github.com/fengyuanchen/compressorjs)

![](https://images.viblo.asia/14958dc8-2017-4602-9246-348b1109e305.png)

## 4. Fabric.js

Fabric.js cho phép bạn dễ dàng tạo các hình đơn giản như hình chữ nhật, hình tròn, hình tam giác và các hình đa giác khác hoặc hình dạng phức tạp hơn được tạo thành từ nhiều đường dẫn, trên phần tử `<canvas>` trong trang web bằng JavaScript. Fabric.js sau đó sẽ cho phép bạn thao tác kích thước, vị trí và xoay của các đối tượng này bằng chuột.
Nó cũng có thể thay đổi một số thuộc tính của các đối tượng này như màu sắc, độ trong suốt, vị trí độ sâu trên trang web hoặc chọn các đối tượng theo nhóm. Fabric.js cũng sẽ cho phép bạn chuyển đổi hình ảnh SVG thành dữ liệu JavaScript có thể được sử dụng để đưa nó vào phần tử `<canvas>`.

[Demo](http://fabricjs.com/)
[Tutorials](http://fabricjs.com/articles/)
[Github](https://github.com/fabricjs/fabric.js)

![](https://images.viblo.asia/b708709b-6382-4292-a4cb-a2c38fe7a1d6.png)

## 5. Blurify

Đây là một thư viện nhỏ (~ 2kb) để làm mờ hình ảnh. Plugin này hoạt động theo ba chế độ:

* css: sử dụng thuộc tính bộ lọc (mặc định)
* canvas: sử dụng canvas xuất cơ sở64
* auto: trước tiên hãy sử dụng chế độ css, nếu không thì tự động chuyển sang chế độ canvas

Bạn chỉ cần yêu cầu chuyển hình ảnh, giá trị mờ và chế độ cho hàm để có được hình ảnh mờ - đơn giản và hiệu quả.

[Demo](https://justclear.github.io/blurify/)
[Github](https://github.com/JustClear/blurify)

![](https://images.viblo.asia/8c4db62b-4373-4b95-82f1-501c06f222bb.png)

## 6. Merge Images

Thư viện này cho phép bạn dễ dàng kết hợp các hình ảnh lại với nhau mà không phải loay hoay với canvas. Canvas đôi khi có thể gây khó khăn khi làm việc, đặc biệt nếu bạn chỉ cần làm một cái gì đó tương đối đơn giản như hợp nhất một số hình ảnh lại với nhau. Hoặc hợp nhất các hình ảnh, tất cả các tác vụ lặp đi lặp lại thành một lệnh gọi hàm đơn giản.

Hình ảnh có thể được chồng lên nhau và định vị lại. Hàm trả về một Promise sẽ phân giải thành URI dữ liệu base64. Hỗ trợ cả trình duyệt và Node.js.

[Github](https://github.com/lukechilds/merge-images)

![](https://images.viblo.asia/9164ce0f-3ac2-47e2-9b70-015c799eccf6.png)

## 7. Cropper.js

Plugin này là một trình cắt ảnh JavaScript đơn giản cho phép bạn cắt, xoay, chia tỷ lệ, phóng to xung quanh hình ảnh của bạn trong một môi trường tương tác. Nó cũng cho phép các tỷ lệ khung hình được thiết lập trước đó.

[Demo](https://fengyuanchen.github.io/cropperjs/)
[Github](https://github.com/fengyuanchen/cropperjs)

![](https://images.viblo.asia/f4a5081c-34bf-46b9-9324-cf3782aee00e.png)

## 8. CamanJS

Nó là một thư viện thao tác canvas cho Javascript. Nó là sự kết hợp của một giao diện dễ sử dụng với các kỹ thuật chỉnh sửa hình ảnh / canvas tiên tiến và hiệu quả. Nó rất dễ dàng để mở rộng với các bộ lọc và plugin mới, và nó đi kèm với một loạt các chức năng chỉnh sửa hình ảnh, và vẫn đang được tiếp tục phát triển. Nó đầy đủ thư viện độc lập và hoạt động cả trong NodeJS và trình duyệt.

Bạn có thể chọn một bộ các bộ lọc đặt trước hoặc thay đổi các thuộc tính như độ sáng, độ tương phản, độ bão hòa bằng tay để có được đầu ra mong muốn.

[Demo](http://camanjs.com/examples/)
[Website](http://camanjs.com/)
[Github](https://github.com/meltingice/CamanJS/)

![](https://images.viblo.asia/ecdfb6ed-efa9-4818-a57d-aa452b1d369d.png)

## 9. MarvinJ

MarvinJ là một khung xử lý hình ảnh javascript thuần túy có nguồn gốc từ Marvin Framework. MarvinJ dễ dàng và mạnh mẽ cho nhiều ứng dụng xử lý ảnh khác nhau.

Marvin cung cấp nhiều thuật toán để thao tác màu sắc và ngoại hình. Marvin cũng tự động phát hiện các tính năng. Khả năng làm việc với các tính năng hình ảnh cơ bản như cạnh, góc và hình dạng là cơ bản để xử lý hình ảnh. Plugin giúp phát hiện và phân tích các góc của các đối tượng để xác định vị trí của đối tượng chính trong cảnh. Do những điểm này, có thể tự động cắt ra đối tượng.

[Website](https://www.marvinj.org/en/index.html)
[Github](https://github.com/gabrielarchanjo/marvinj)

![](https://images.viblo.asia/c6fa7052-ce8b-43bd-92f8-18e2e8d2496b.png)

## 10. Grade

Thư viện JS này tạo ra các gradient bổ sung được tạo từ 2 màu chủ đạo trong các hình ảnh được cung cấp. Điều này cho phép trang web của bạn điền vào div của bạn với một gradient phù hợp xuất phát từ hình ảnh của bạn. Đây là một plugin dễ sử dụng giúp bạn giữ cho trang web của bạn trực quan dễ chịu.

HTML file
```
<!--the gradients will be applied to these outer divs, as background-images-->
<div class="gradient-wrap">
    <img src="./samples/finding-dory.jpg" alt="" />
</div>
<div class="gradient-wrap">
    <img src="./samples/good-dinosaur.jpg" alt="" />
</div>
```

JS

```
<script src="path/to/grade.js"></script>
<script type="text/javascript">
    window.addEventListener('load', function(){
        /*
            A NodeList of all your image containers (Or a single Node).
            The library will locate an <img /> within each
            container to create the gradient from.
         */
        Grade(document.querySelectorAll('.gradient-wrap'))
    })
</script>
```

[Demo](https://benhowdle89.github.io/grade/)
[Github](https://github.com/benhowdle89/grade)

![](https://images.viblo.asia/a0d2dd00-bd8f-47ee-be29-0976e78db256.png)

Hy vọng bạn có thể tìm được thư viện cần thiết trong danh sách này

Via: [https://blog.bitsrc.io/](https://blog.bitsrc.io/)