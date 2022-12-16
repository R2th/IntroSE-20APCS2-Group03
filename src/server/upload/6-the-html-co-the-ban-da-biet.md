HTML là ngôn ngữ đánh dấu tiêu chuẩn cho các trang Web được sử dụng để cấu trúc ứng dụng web và mang lại nhiều lợi ích mạnh mẽ, nhưng chỉ khi nó được sử dụng một cách thích hợp.
Do đó, hôm nay chúng ta sẽ khám phá 7 thẻ HTML mà bạn có thể đã biết với hy vọng rằng bạn có thể tạo các ứng dụng web dễ tiếp cận hơn.

Nếu bạn muốn tìm hiểu thêm về HTML, bạn có thể truy cập [W3Schools](https://www.w3schools.com/tags/) để biết thêm các thẻ HTML.

### output

Thẻ <output> biểu thị kết quả của phép tính.   

```
<form oninput="totalWeight.value=parseInt(catAWeight.value)+parseInt(catBWeight.value)"> 0
    <input type="range" id="catAWeight" value="50">100
    + <input type="number" id="catBWeight" value="50">
    = <output name="totalWeight" for="catAWeight catBWeight"></output>
</form
```

{@codepen: https://codepen.io/emmawedekind/pen/zbamRN}

### picture

Thẻ `<picture>` cho phép bạn chỉ định nguồn hình ảnh. Thay vì có một hình ảnh mà bạn tăng tỷ lệ lên xuống tùy theo độ rộng của khung nhìn, nhiều hình ảnh có thể được thiết kế để lấp đầy khung nhìn của trình duyệt.

Thẻ hình ảnh chứa hai thẻ khác nhau: một hoặc nhiều <source> và  <image>.

Source có các thuộc tính sau:

* srcset (bắt buộc): Xác định URL của hình ảnh để hiển thị
* media: Chấp nhận mọi  media query mà xác định được trong CSS
* size: Xác định một giá trị width  , một media query có giá trị width hoặc danh sách media query được phân tách bằng dấu phẩy với giá trị width
* loại: Xác định MIME type.
    
Trình duyệt sử dụng các giá trị thuộc tính để tải hình ảnh phù hợp nhất; nó sử dụng <source> đầu tiên với lần truy cập phù hợp và bỏ qua các <source> tiếp theo.

Thẻ <img> được dùng như fallback nếu trình duyệt không hỗ trợ hoặc nếu không có  <source> nào phù hợp.
    
```
<picture>
    <source media="(min-width: 650px)" srcset="img_pink_flowers.jpg">
     <source media="(min-width: 465px)" srcset="img_white_flower.jpg">
    <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;">
</picture>
```

### progress
    
Thẻ `<progress>` thể hiện tiến trình/quá trình của một task.
Thẻ `<progress>` không phải là thẻ thay thế cho thẻ <meter>, do đó, các thành phần biểu thị việc sử dụng ổ đĩa ... nên sử dụng thẻ <meter>.

`<progress value="22" max="100"></progress>    `
    
### meter 
    
Thẻ <meter> trình bày phép đo vô hướng trong phạm vi đã biết hoặc giá trị phân số. Ví dụ cho việc trình bày dung lượng đĩa đã sử dụng ... 
Không sử dụng thẻ <meter> cho việc trình bày process của một task

    *Đọc thêm: https://www.w3schools.com/tags/tagmeter.asp*

### template 
    
Thẻ <template> chứa mà HTML nhưng không hiển thị nó ra.
Sử dụng thẻ <template> khi có mã HTML bạn muốn sử dụng lại nhiều lần. Để hiển thì thì cần sử dụng JS.
```
<template>
    <h2> Tác giả: XXX </h2>
</temlate>
```
![](https://images.viblo.asia/d74da4e7-2319-4e5e-a7c6-f5e06c5b565c.png)

### wbr
    
Nếu bạn có một khối văn bản dài hoặc một từ dài, bạn có thể sử dụng thẻ <wbr> để chỉ định vị trí phần văn bản được ngắt. Đây là một cách để đảm bảo khi thay đổi kích thước trình duyệt không phá vỡ văn bản, làm cho việc hiển thị không đúng mong muốn.
    
    
    `<p>Một câu dài ơi là dài, nhưng phải <wbr> xuống dòng ở đây</wbr> mới ngầu</p>`
    
Trên đây là một số thẻ HTML có thể nhiều người đã biết, nhưng bài viết lại dành cho người chưa biết hoặc biết rồi vẫn muốn đọc lại cho biết như bạn đó :heart_eyes:. Cảm ơn bạn đã đọc tới dòng này. :kissing_heart:
    
*Nguồn: https://dev.to/emmawedekind/10-html-element-you-didnt-know-you-needed-3jo4*