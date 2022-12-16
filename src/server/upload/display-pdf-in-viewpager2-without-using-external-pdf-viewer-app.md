![](https://images.viblo.asia/49f54c1e-694e-4e2c-8988-eaf4e89c9cfe.jpg)
Chào mọi người, có rất nhiều ứng dụng hiện nay sử dụng trình hiển thị pdf quen thuộc như đọc sách, văn bản, học tiếng anh, tài liệu v.v nhưng thường thông qua một external app, điều này gây ra nhiều hạn chế mà không phải ai cũng thích

Trong bài viết này, chúng ta sẽ cùng tìm hiểu các bước để xây dựng ứng dụng hiển thị PDF file ngay trong chính ứng dụng của mình với ViewPager2

Để dễ dàng hơn, chúng ta sẽ tập trung vào phần trích xuất PDF, nếu bạn nào chưa sử dụng qua ViewPager 2 thì có thể tìm hiểu trước, hoặc xem trong demo chi tiết ở cuối bài, cùng bắt đầu thôi.
### I. Context
Như mình đã trình bày, cách thuận tiện nhất để ứng dụng của bạn đọc một tệp PDF được cung cấp là chuyển nó qua một intent đến một external App(ứng dụng bên ngoài) như bên dưới
```
Intent(Intent.ACTION_VIEW).apply {
    setDataAndType(pdfPathUri, "application/pdf")
    flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
    startActivity(this)
}
```
Tuy nhiên, điều đó đang bị hạn chế vì
* Điều đó yêu cầu bạn sẽ phải có một ứng dụng đọc PDF trong điện thoại
* Người dùng sẽ thoát khỏi ứng dụng của bạn và có thể không quay lại được
* Bạn không thể đọc tệp PDF trong nội dung của mình
Vì vậy, cách tốt hơn là hiển thị tệp PDF trong Ứng dụng của bạn.

### II. Display PDF in ViewPager2
Thay vì những hạn chế đã nêu ở trên, chúng ta sẽ tải PDF trong ứng dụng của mình, hãy sử dụng ViewPager2 version mới nhất với Kotlint để có thể hiển thị như bên dưới
- ![](https://images.viblo.asia/0be1e7d6-000e-496c-8778-883728857ca5.gif)

Dưới đây là cách để trích xuất các tập tin PDF và hãy xem theo từng bước
- ![](https://images.viblo.asia/87ebb33d-7895-43aa-8a64-c6f089f5ac89.png)

Nó chỉ đơn giản là 2 bước đã trình bày ở trên:

**1. Convert File to PdfRenderer**
- Bắt đầu từ Android SDK API 21 đã cung cấp cho chúng ta PdfRenderer class, chúng ta chỉ cần convert(chuyển đổi) file PDF(đã được tải xuống, hoặc từ local resource) thành nó (PdfRenderer)
- Điều này có thể được thực hiện bằng cách mở tệp dưới dạng ParcelFileDescriptor bên dưới và chuyển nó cho PdfRenderer.
```
private val fileDescriptor = ParcelFileDescriptor.open(
    pdfFile, ParcelFileDescriptor.MODE_READ_ONLY)
private val pdfRenderer = PdfRenderer(fileDescriptor)
```

**2. Converter Pdf Page to Image**

Cùng với đó, hiện nay các đối tượng pdfRenderer sẽ chứa các trang của file PDF bên trong. Chúng tôi có thể chuyển đổi một trang nhất định để được xem bởi
1. Bằng cách cung cấp số trang(page), chúng ta có thể sử dụng mở trang pdf bằng pdfRenderer.openPage (pageIndex).
2. Sau đó, chúng ta sẽ sử dụng createBitmap base trên currentPage.height và currentPage.width.
3. Sau đó, sử dụng currentPage.render để hiển thị Bitmap đã tạo ở bước trên
4. Gửi Bitmap vào imageView đã cho
```
fun openPage(page: Int, pdfImage: ImageView) {
    if (page >= pdfRenderer.pageCount) return
    currentPage?.close()
    currentPage = pdfRenderer.openPage(page).apply {
        val bitmap = Bitmap.createBitmap(
            width, height, Bitmap.Config.ARGB_8888)
        render(bitmap, null, null, 
            PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY)
        pdfImage.setImageBitmap(bitmap)
    }
}
```
Vậy là đã xong các bước để có thể để trích xuất các tập tin PDF, rất ngắn gọn phải k nào.
### III. Conclusion 
Như vậy là chúng ta đã tìm hiểu xong các bước để có thể hiển thị PDF trên chính ứng dụng của mình mà không cần phải hiển thị thông qua một external App

Cảm ơn các bạn đã đọc bài viết này, hy vọng mọi người có thể áp dụng vào trong các dự án của mình, xin chào và hẹn gặp lại trong các bài viết tiếp theo.

Source code đầy đủ ở [đây](https://github.com/elye/demo_android_pdf_reader_viewpager2), các bạn có thể xem chi tiết hơn

Bài viết có tham khảo [nguồn](https://medium.com/mobile-app-development-publication/displaying-pdf-in-viewpager2-f0778eac7aa3)