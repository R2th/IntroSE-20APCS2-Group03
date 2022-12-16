Kích thước ứng dụng nhỏ hơn giúp người dùng tiết kiệm thời gian, dữ liệu di động và pin khi tải chúng xuống từ Play Store. Tất cả chúng ta đều thích các ứng dụng nhỏ hơn!

### Introduction
WebP là một định dạng hình ảnh được phát triển bởi Google, chủ yếu tập trung vào tối ưu hóa và chất lượng. Một trong những tính năng thú vị của WebP là nó không mất dữ liệu, có nghĩa là nó hỗ trợ cả hai loại nén, không giống như PNG và JPG. WebP được hỗ trợ đầy đủ trên các trình duyệt web như Chrome, Firefox và Opera (xem hình ảnh bên dưới). Về phía Android, WebP đã được thêm vào từ API 14, vì vậy, ngày nay việc sử dụng WebP trên Android sẽ an toàn hơn.

![](https://images.viblo.asia/7401632c-f537-4f68-823c-0d681731c85a.png)

Ngay cả khi WebP không được hỗ trợ trong hệ sinh thái của Apple nhưng nó sẽ sớm được hỗ trợ trong tương lai. Tuy nhiên, có một thư viện dành cho Swift được gọi là [SDWebImageWebPCoder](https://github.com/SDWebImage/SDWebImageWebPCoder) hỗ trợ nó. Nếu bạn muốn sử dụng WebP trên web, hãy đảm bảo rằng bạn sử dụng polyfills.

### Alpha Transparency
WebP cũng hỗ trợ Transparent Background như PNG, vì vậy nó là một sự thay thế tốt cho cả JPG và PNG. Bây giờ, chúng ta chỉ có một định dạng image.

### Lossy and lossless compression
Nén mất dữ liệu là một cách để giảm kích thước hình ảnh bằng cách loại bỏ một số phần hoặc byte của hình ảnh mà mắt thường không nhận thấy được. Không thể hoàn nguyên định dạng bị mất về chất lượng hình ảnh gốc. Định dạng ảnh bị mất phổ biến nhất là JPEG hoặc JPG. Mặt khác, PNG, TIFF và GIF là định dạng hình ảnh không mất dữ liệu cung cấp một cách để giảm kích thước hình ảnh mà không làm giảm bất kỳ chất lượng hình ảnh nào. Định dạng ảnh không mất dữ liệu có thể được đảo ngược về định dạng ban đầu có kích thước ảnh gốc.

### Tooling — Android Studio
Android Studio giúp việc chuyển định dạng JPG và PNG sang WebP dễ dàng hơn bằng cách chỉ cần nhấp chuột phải vào hình ảnh cần chuyển đổi và chọn Convert to WebP…

![](https://images.viblo.asia/ce229a04-92a4-4c3e-ae60-f1c7fb5c96f1.png)

Sau đó, cửa sổ bật lên này sẽ hiển thị yêu cầu chúng ta lựa chọn giữa mã hóa Lossless và Lossy. Trong trường hợp này, tôi sẽ sử dụng Mã hóa Lossy với chất lượng mã hóa 75%. Chất lượng càng kém, kích thước hình ảnh sẽ càng nhỏ. Nhấn Ok để tiếp tục.

![](https://images.viblo.asia/54e624c5-1893-4ac2-802d-fe85f0123a8f.png)

Sau khi nhấp vào Ok, Android Studio sẽ cho chúng ta thấy sự khác biệt giữa trước và sau khi chuyển đổi. Như chúng ta có thể thấy, kích thước hình ảnh giảm 52% so với kích thước ban đầu. Điều đó thật điên rồ, phải không? Tuy nhiên, nếu mọi thứ không ổn, chúng ta luôn có thể điều chỉnh thanh theo dõi chất lượng bên dưới hình ảnh để tăng hoặc giảm độ rõ nét của nó. Trong trường hợp này, hình ảnh trông đã ổn, vì vậy chỉ cần nhấn Accept All, và chúng ta đã hoàn tất.

![](https://images.viblo.asia/59b8b4ae-2b9d-4562-ab8a-b85763b38d4d.png)

> Chúng ta cũng có thể thực hiện chuyển đổi hàng loạt, bằng cách chọn tất cả các hình ảnh và làm theo bước tương tự. Bạn không cần phải làm từng ảnh một!

### For Designers
Nếu bạn là UX/UI designer trước khi cung cấp Image Assets cho Android developers để sử dụng trong ứng dụng, hãy đảm bảo chúng được nén và có kích thước phù hợp. Ngoài ra, bạn nên khuyến khích các developer sử dụng WebP thay vì JPG và PNG, nếu họ chưa biết về WebP, hãy giới thiệu chúng!

Để có thể làm việc với WebP trong Adobe Photoshop, bạn cần phải cài đặt plugin [WebpShop](https://developers.google.com/speed/webp/docs/webpshop).

Nếu các công cụ thiết kế của bạn không hỗ trợ WebP, bạn cũng có thể thực hiện online.

> Không sử dụng định dạng WebP cho các icon có thể được lưu dưới dạng SVG hoặc VectorDrawable —Một SVG nhẹ trong Android.

### Summary
Theo ý kiến riêng của tôi, WebP là sự thay thế tốt nhất cho PNG và JPG trong phát triển Android vì nó có thể tối ưu hóa kích thước ứng dụng ở mức thấp nhất có thể. Định dạng WebP khá mới nhưng đã đến lúc bắt đầu sử dụng nó ngay bây giờ. Tôi tin rằng nó sẽ sớm trở thành định dạng hình ảnh chuẩn trên các hệ điều hành và trình duyệt trong tương lai.

REF: https://proandroiddev.com/webp-a-preferred-image-format-for-android-apps-251a0ab1aa70