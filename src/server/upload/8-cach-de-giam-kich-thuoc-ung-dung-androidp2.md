Ở [bài viết trước](https://viblo.asia/p/8-cach-de-giam-kich-thuoc-ung-dung-androidp1-3P0lPEXv5ox) mình đã giới thiệu cho các bạn về 4 cách để giảm kích thước của một ứng dụng android. Ở bài viết này, mình sẽ giới thiệu 4 cách còn lại để giảm kích thước của một ứng dụng android
# 5 Xóa bỏ các phương thức, lớp, trường , thuộc tính và tài nguyên không sử dụng
Việc tìm kiếm và xóa bỏ các tài nguyên không được sử dụng trong ứng dụng là một công việc khá dễ dàng. Đặc biệt khi sử dụng các thư viện ngoài, họ thường thêm các tài nguyên không có giá trị sử dụng vào ứng dụng của bạn, bạn nên luôn theo dõi và xóa các tài nguyên không cần thiết. Hiện nay cố kha nhiều công cụ có thể giúp bạn thực hiện công việc này một cách dễ dàng và chính xác:
## 1. New R8 Code Shrinker
Thu nhỏ mã có thể giúp bạn giảm kích thước APK bằng cách xóa các tài nguyên và mã code không sử dụng.

Từ Android Studio 3.3 beta, google đã giới thiệu một công cụ giúp làm gọn mã code là R8, công cụ này cũng thực hiện giải mã và dexing, theo Google, R8 thu nhỏ các đoạn code nhanh hơn ProGuard.

Để tự mình thử R8, hãy đảm bảo rằng bạn đang chạy Android Studio 3.3 beta 1 trở lên, sau đó thêm phần sau vào tệp gradle.properIES của bạn:
```
android.enableR8=true
```
## 2. Thu nhỏ mã code với ProGuard
Trước khi R8 ra mắt, ProGuard là một trong những lựa chọn rất tốt giúp bạn xóa bỏ các phương thức, trường, thuộc tính không sử dụng khỏi project của mình.  Để sử dụng ProGuard, hãy thêm đoạn mã sau vaof tệp  build,gradle cấp module :
```
buildTypes {
       release {
       minifyEnabled true
           proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
       }
   }
}
```
Lưu ý rằng ProGuard có thể sẽ xóa cả những mã code mà ứng dụng của bạn thực sự cần, vì vậy bạn phải luôn kiểm tra dự án của mình một cách kỹ càng khi ProGuard được bật, trước khi xuất bản nó.
## 3. Bật tính năng thu dọn tài nguyên không cần thiết - Resource Shrinking 
Khi phát triển ứng dụng đôi khi chúng ta tạo ra các tài nguyên như các file xml, các icon, vector mà không dùng tới. Vì vậy, hãy bật tính năng thu dọn tài nguyên không cần thiết và xóa bỏ chúng khỏi dự án của bạn: 
```
buildTypes {
       release {
 
//Add the following//
 
        shrinkResources true
           minifyEnabled true
           proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
       }
   }
}
```
## 4. Cải thiện mã nguồn của bạn với Android Lint
Lint là một công cụ quét tĩnh có thể xác định các tài nguyên mà không được tham chiếu ở bất cứ đâu trong mã nguồn của bạn. Tuy nhiên, Lint  không thực sự loại bỏ các tài nguyên này, vì vậy bạn sẽ cần kiểm tra báo cáo và xóa các tài nguyên được xác định theo cách thủ công.
Để chạy Lint, chọn Analyze -> Inspect Code ... từ thanh công cụ của Android studio. Nếu Lint phát hiện bất kỳ tài nguyên không được ước tính nào, thì nó sẽ liệt kê chúng trong cửa sổ **Inspection Results**.
![](https://images.viblo.asia/3a2293be-816e-4177-a26e-8a1951b9ac59.jpg)
# 6. Chuyển đổi các file ảnh PNG, JPEG và BMP của bạn thành WebP
Nếu dự án của bạn chứa một số bản vẽ, thì việc nén chúng có thể làm giảm đáng kể kích thước APK của bạn.

Nếu dự án minSdkVersion của dự án của bạn là 18 hoặc cao hơn, thì bạn có thể nén PNG, JPEG và BMP của mình bằng cách chuyển đổi chúng sang định dạng WebP.

Đầu tiên, chọn file ảnh mà bạn muốn chuyển đổi và chọn Convert to WebP ... Chọn giữa mã hóa mất hoặc mất mã. Chọn **Skip images when the encoded result is larger than the original** và bấm **OK** để chuyển đổi hình ảnh.
# 7. Kiểm tra APK của bạn bằng cách sử dụng Trình phân tích APK của Android Studio
Đôi khi, bạn có thể không hoàn toàn chắc chắn điều gì đã khiến APK của bạn vượt quá tầm kiểm soát.

Bạn có thể xác định những thành phần có kích thước lớn nhất đối trong mình bằng cách sử dụng Trình phân tích APK của Android Studio. Công cụ này cho phép bạn biết kích thước tuyệt đối và tương đối của các loại tệp khác nhau và thậm chí kích thước của các tệp riêng lẻ.

Để phân tích APK, chỉ cần chọn Build> Analyze APK từ thanh menu của Android Studio.

Trong cửa sổ tiếp theo, chọn APK. Trình phân tích APK sẽ mở trong một bảng điều khiển mới.
![](https://images.viblo.asia/583ca9ef-823b-4e63-a9b2-af78e9bd023f.jpg)

Đối với mỗi file và thư mục, trình phân tích sẽ biểu diễn: 
* **Raw file size**: Đây là kích thước được giải nén của mục này trên đĩa.
* **Download size**: Đây là kích thước nén ước tính của sản phẩm
* **% of total download size**: Tỷ lệ phần trăm của tổng kích thước tải xuống APK mà mặt hàng này đại diện.

Đây không phải là tính năng duy nhất mà Trình phân tích APK cung cấp.

Hãy tưởng tượng bạn đã cắt giảm thành công kích thước APK của mình và phát hành một ứng dụng nhẹ trên Google Play, điều đó không có nghĩa là bạn có thể ngừng lo lắng về kích thước APK! Tại một số điểm, bạn sẽ muốn phát hành bản cập nhật, điều đó có nghĩa là kích thước APK một lần nữa sẽ trở thành mối quan tâm lớn.

Mặc dù nó luôn luôn là một ý tưởng tốt để theo dõi cách APK của bạn phát triển từ lần phát hành này sang lần phát hành tiếp theo, nếu có một sự gia tăng lớn về kích thước APK thì bạn chắc chắn sẽ muốn xem xét kỹ hơn những gì diễn ra.

Bạn có thể sử dụng Trình phân tích APK để làm nổi bật tất cả sự khác biệt giữa APK hiện tại và APK trước đó của bạn, điều này có thể giúp bạn không tham gia vào các khu vực và tài sản mà bạn có thể tối ưu hóa hoặc thậm chí xóa hoàn toàn.

Để so sánh APK, trước tiên hãy chọn Build> Phân tích APK từ thanh menu của Android Studio.

Sau đó chọn phiên bản APK mới nhất của bạn. Ở góc trên bên phải của Trình phân tích APK, chọn So sánh với APK trước đó ... Tiếp theo, chọn phiên bản APK trước đó của bạn. Một cửa sổ bật lên sẽ xuất hiện, làm nổi bật tất cả sự khác biệt giữa APK hiện tại của bạn và APK trước đó của bạn.
# 8. Android Go!
Các thị trường mới nổi đại diện cho một số khán giả điện thoại thông minh phát triển nhanh nhất trên thế giới và sự gia tăng của các thương hiệu như Vivo và Oppo đã chứng minh rằng các thiết bị ngân sách có tiềm năng thống trị thị trường đang mở rộng nhanh chóng này.

Để giúp Android thu hút đối tượng hoàn toàn mới và đang phát triển này, Google đã phát hành Android Go, phiên bản Android với các cải tiến về hiệu suất và lưu trữ được thiết kế để cung cấp trải nghiệm tốt hơn trên các thiết bị thân thiện với ngân sách, bao gồm các thiết bị có RAM dưới 1GB.

Người dùng Android Go có quyền truy cập vào toàn bộ cửa hàng Google Play, nhưng Google nhấn mạnh các ứng dụng được tối ưu hóa cho Android Go, bao gồm các ứng dụng chiếm ít hơn 40 MB trên thiết bị của người dùng.

Bằng cách làm theo lời khuyên trong bài viết này, bạn sẽ có thể giảm đáng kể kích thước APK của mình cho mọi người sử dụng nó. Tuy nhiên, nếu bạn muốn thực hiện một số mức giảm bổ sung cụ thể cho người dùng Android Go, thì bạn có thể sử dụng tính năng đa APK của Android, để xuất bản một APK được tối ưu hóa cho nền tảng Android Go.

Để tạo một ứng dụng Android Go chuyên dụng, bạn sẽ cần phải tạo một APK có cùng tên gói và chứng chỉ ký giống như ứng dụng của bạn thông thường, nhưng có mã phiên bản duy nhất.
Để tạo APK Android Go của bạn, bạn cũng sẽ cần thêm các mục sau vào file manifetcủa mình:
```
<uses-feature android:name="android.hardware.ram.low" android:required="true">
```
Nguồn tham khảo: https://code.tutsplus.com/articles/8-ways-to-reduce-your-android-app-apk-size--cms-32508