## 1. Mở đầu
Nhiều bạn mới học Android thường bỡ ngỡ hay không biết Material Design là gì, nó không phải là một đối tượng hay thành phần nào trong Android cả.
Material Design là một triết lý thiết kế trực quan mà Google đưa ra năm 2014. Mục đích của nó là để trải nghiệm người dùng thống nhất trên các nền tảng và kích thước thiết bị. Material Design bao gồm một danh sách các hướng dẫn về style, layout, motion và các khía cạnh khác của app design. Material Design dùng cho ứng dụng Web cũng như mobile. Nhưng trong phần này chỉ sẽ tập trung chủ yếu vào Material Design cho ứng dụng Android Mobile các bạn nhé.
## 2. Các nguyên tắc của Material Design
Trong Material Design các thành phần trong ứng dụng Android giống như các thực thể trong thế giới thực: Chúng đổ bóng (giống như một vật nào có có ánh nắng mặt trời chiếu vào thì sẽ có bóng), chúng chiếm không gian, và tương tác với những những thành phần khác.
- Bold, graphic, intentional
Material Design liên quan đến màu sắc có chủ đích, hình ảnh góc cạnh, kiểu chữ quy mô lớn và khoảng trắng có mục đích tạo ra giao diện đậm và đồ họa.
Giao diện được thiết kế để nhấn mạnh hành động của người dùng, hướng dẫn họ biết phải làm gì và làm như thế nào. Ví dụ như làm nổi bật những thứ mà người dùng có thể tương tác chẳng hạn như button, edittext, switch.

![](https://images.viblo.asia/a5e8c40b-0133-440e-9c89-50a48f8e3fa4.png)
- Meaningful motion (chuyển động có ý nghĩa)
Làm cho hình ảnh động và chuyển động của ứng dụng chúng ta có ý nghĩa, tức không để chúng xảy ra một cách ngẫu nhiên. Sử dụng các chuyển động để cũng cố rằng người dùng đang làm chủ ứng dụng. Ví dụ như ta sẽ thiết kế ra ứng dụng mà hầu hết các chuyển động được bắt đầu bằng hành động của người dùng, không phải bởi các sự kiện nằm ngoài sự kiểm soát của người dùng. Ta cũng có thể dùng motion để tập trung sự chú ý của người dùng, cung cấp cho họ những phản hồi tinh tế hoặc làm nổi bật một vài yếu tố cần thiết của ứng dụng.
Khi ứng dụng của chúng ta đang trình bày một đối tượng, một sự kiện gì đó cho người dùng thì hãy đảm bảo chuyển động không phá vỡ tính liên tục của trải nghiệm người dùng. Ví dụ như người dùng không cần phải đợi animation hoặc quá trình chuyển đổi hoàn tất.

## 3. Colors
Các nguyên tắc của Material Design bao gồm cả việc sử dụng màu sắc thế nào cho hợp lý
- Bảng màu Material Design. Bạn có thể tham khảo nó [ở đây](https://material-ui.com/customization/color/)
![](https://images.viblo.asia/a1e9f54c-263a-4b5c-a112-0ddd9014b76d.png)
Bảng màu của Material Design chứa các màu sắc để lựa chọn, mỗi loài màu có một màu chính và các sắc thái được dán nhãn từ 50 đến 900
+ chọn màu có nhãn 500 làm máu chính cho style của bạn, sử dụng các màu liên quan với các sắc thái khác nhau kết hợp.
+ chọn một màu tương phản làm màu nhấn và sử dụng nó để tạo điểm nhấn trong ứng dụng. Chọn bất kỳ màu nào bắt đầu bằng chữ cái A
Khi chúng ta start một project bởi Android Studio thì trong file color.xml đã có 3 màu được định nghĩa.
```Kotlin
<resources>
    <color name="colorPrimary">#3F51B5</color>
    <!-- Indigo. -->
    <color name="colorPrimaryDark">#303F9F</color>
    <!-- A darker shade of indigo. -->
    <color name="colorAccent">#FF4081</color>
    <!-- A shade of pink. -->
</resources>
```
Và chúng được áp dụng cho Theme mặc định, và sẽ áp dụng cho các thành phần trong ứng dụng:
- colorPrimary được sử dụng cho một số View theo mặc định. Ví dụ trong AppTheme thì nó được dùng làm màu cho thanh action bar. Ta có thể thay giá trị này bằng màu 500 trong cột màu mà chúng ta chọn.
- colorPrimaryDark cần sử dụng ở những nơi cần tương phản nhẹ với primary color. Ví dụ thanh trạng thái phía trên ứng dụng. Màu này ta thường chọn tối hơn một chút màu 500.
- colorAccent được sử dụng làm màu tô sáng cho một số thành phần View. Nó cũng được sử dụng cho các công tắc ở ví trí tắt - bật, FloatingActionButton, …
Như hình ảnh dưới thì hình của thanh action bar sử dụng colorPrimary (màu chàm), thanh status bar sử dụng colorPrimaryDark (một màu chàm tối hơn), công tắc sử dụng màu colorAccent (là một màu hồng)

![](https://images.viblo.asia/145d0a0b-8b9d-4500-a62e-4a6874f444de.png)

- Contrast Độ tương phản:
Bạn phải luôn đảm bảo rằng các văn bản trong UI phải tương phản với background của UI. Khi background tối thì văn bản có màu sáng và ngược lại.
Nếu bạn sử dụng một theme như Theme.AppCompat, độ tương phản giữa văn bản và background sẽ được xử lý trước cho bạn. Ví dụ:
+ Nếu bạn dùng một theme kế thừa từ Theme.AppCompat, hệ thống giả sử sử dụng một màu nền tối, do đó các văn bản sẽ gần như màu trắng.
+ Nếu dùng một theme kế thừa từ Theme.AppCompat.Light.DarkActionBar, text sẽ gần như đen.
+ Nếu bạn sử dụng Theme.AppCompat.Light.DarkActionBar, thì text ở Action bar sẽ gần như trắng, tương phản với background của Action bar. Phần văn bản còn lại gần như là màu đen để tương phản với background sáng.
- Opacity Độ mờ đục:
Ứng dụng của ta có thể hiện thì độ mờ đục khác nhau của văn bản để truyền đạt tầm quan trọng khác nhau đến người dùng. Để set độ mờ đục ta có thể dụng format "#argb" hoặc "#aarrggbb" trong đó a và aa là độ alpha của color.

## 4. Typrography 
- Typeface:
Roboto là kiểu chữ chuẩn của Material Design trong Android. Nó có sáu loại: Thin, Light, Regular, Medium, Bold, Black.

![](https://images.viblo.asia/d767190e-5073-4518-855b-dda587aa4b41.png)
- Font styles:
Android cung cấp các kiểu và kích thước font chữ được xác định trước mà chúng ta có thể sử dụng, chúng được phát triển để cân bằng mật độ nội dung và sự thoải mái khi đọc trong các điều kiện khác nhau. Kích thước có đơn vị là sp (pixel có thể mở rộng). Không nên sử dụng nhiều style và size cùng nhau trong cùng một layout.

![](https://images.viblo.asia/ea2ca2dc-03f1-4e0a-9239-518a17f7a689.png)
Ta có thể sử dụng thuộc tính android:textAppearance hoặc TextAppearance.AppCompat 
ví dụ để cho TextView hiển thị kiểu chữ loại 3 ta khai báo như đây
```Kotlin
android:textAppearance="@style/TextAppearance.AppCompat.Display3"
```
- Fonts and Resource:
Android 8.0 (API 26) giới thiệu font trong XML, ta có thể đóng gói chúng trong file APK. Ta có thể tạo folder font trong res và muốn gọi đến thì dùng R.font.myfont.
Để sử dụng thì ứng dụng phải chạy ở android 8.0 trở lên, với những phiên bản từ 4.1 trở lên đến 8.0 muốn sử dụng cũng có thể dùng thư viện support
- Download fonts:
Một cách khác để gói fonts với APK là download chúng từ ứng dụng cung cấp. Ứng dụng cung cấp font chữ là ứng dụng truy xuất và lưu trữ fonts cục bộ để các ứng dụng khác có thể yêu cầu và chia sẻ.
Fonts có thể tải xuống cung cấp các lợi ích sau:
+ giảm kích thước file APK
+ tăng tỉ lệ cài đặt thành công ứng dụng
+ tăng sự thống nhất, nhiều APK có thể chia sẻ cùng một fonts chữ thông qua một nhà cung cấp. Điều này giúp tiết kiệm dữ liệu di động , bộ nhớ điện thoại và dung lượng ổ đĩa. Fonts chữ được nạp qua internet khi cần.
## 5. Layouts
Layout được viết bằng XML và được liệt kê trong thư mục res của ứng dụng. Sau đây là một số thiết kế tốt cho layout:
- Metrics

![](https://images.viblo.asia/ea61ed3b-59fc-4aea-9132-ea08bbe83c99.png)
Trong hình trên:
1. Thanh status 3 cao 24dp, tức bằng 3 ô vuông.
2. Thanh Toolbar cao 56dp bằng 7 ô vuông.
3. Cách lề 16dp, bằng chiều rộng của 2 ô vuông
Các icon của toolbar được căn chỉnh với các ô vuông 4dp thay vì 8dp nên kích thước của chúng trên toolbar là bội số của 4.

Các thành phần trong Material Design dành cho Mobile, Tablet, PC được căn chỉnh bởi các lưới vuông có kích thước 8dp. Một dp à một pixel độc lập với mật độ, một đơn vị trìu tượng dựa trên mật độ màn hình. Một dp cũng tương tự như một sp, nhưng sp cũng được thu nhỏ theo mong uốn kích thước fonts chữ của người dùng. Mỗi ô vuông là 8dp x 8dp nên các thành phần trong layout phải có kích thước là bội số của 8dp.
- Keylines

Là những phác thảo trong xác định vị trí của văn bản và biểu tượng. Ví dụ các keylines đánh dấu các cạnh của lề trong bố cục.

![](https://images.viblo.asia/23ba8ff6-5c2b-46da-8fae-7c1bee9b6247.png)
Như hình trên thì:
1. Keyline hiển thị lề trái cho cạnh màn hình, trong trường hợp này là 16dp
2. Thể hiện avatar hoặc icon với các margin là 72dp
3. Thể hiện lề bên phải là 16dp.
Các kiểu chữ trong Material design được căn chỉnh theo lưới đơn vị là 4dp theo chiều ngang.
## 6. Tổng kết.
Qua bài viết này mình đã giới thiệu cơ bản về ***principles*** , ***colors*** cũng như ***layouts*** trong Material Design. Ở bài viết tiếp theo mình sẽ trình bày tiếp về ***components, patterns*** và ***motion*** trong Material Design. Cám ơn bạn đã theo dõi bài viết.
Để viết được bài này mình đã tham khảo từ trang chủ của Google
https://google-developer-training.github.io