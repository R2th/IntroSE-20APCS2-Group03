Chú ý:

- Bài viết phù hợp với các bạn đã biết về `React Native`.
- Bài viết dựa trên kinh nghiệm còn hạn chế của bản thân, có cách nào giải quyến vấn đề hay hơn xin các bạn góp ý.

Trong thực tế, tôi đã không dùng `flexbox` trong `React Native`.

## Vậy thì tại sao

### Bối cảnh

Về cách dùng `flexbox` thì theo tôi tài liệu chính thống giải thích khó hiểu hơn là [bài viết này](https://www.freecodecamp.org/news/an-animated-guide-to-flexbox-d280cf6afc35).

Khi mà dev (developer) không vẽ UI kiểu tùy hứng thì thông thường sẽ được team designer đưa cho 1 bản thiết kế App cụ thể chi tiết đến từng pixel (điểm ảnh) :D

À mà khoan, khi làm App thì bạn không thể để size UI là 1 giá trị `const` được mà phải phù hợp với nhiều dòng điện thoại khác nhau đúng không (responsive)?

Điểm khác biệt giữa các dòng điện thoại:

- size của màn hình.
- [mật độ điểm ảnh](https://developer.android.com/training/multiscreen/screendensities#TaskUseDP) ảnh hưởng đến độ sắc nét màn hình.

Tôi đã tham khảo giải pháp của bên Native xem họ làm như thế nào ở trang chủ cho `android-dev` tại [đây](https://developer.android.com/training/multiscreen/screensizes#alternative-layouts).

### Thử nghĩ theo cách làm flexbox

Các bước để làm UI theo `flexbox` thực tế tôi đã làm (:v) :

- xác đinh tỷ lệ 1 cách gần chính xác các `components` trong `component` cha sao cho tổng các hệ số tỷ lệ của `component` con đúng bằng `1`.
- điều chỉnh lại sao cho nhìn giống UI design.

Tưởng chừng như đơn giản nhưng việc điều chỉnh lại tỷ lệ sao cho phù hợp với các loại màn hình tốn khá nhiều thời gian mà còn phải đảm bảo tổng tỷ lệ bằng `1`.

Các bước để làm UI theo `flexbox` lý tưởng khác:

- từ design lấy size của `component` con chia cho size `component` cha được 1 tỷ lệ.
- lấy tỷ lệ đó tính toán ra tỷ lệ của `flexbox` (phải đảm bảo tổng tỷ lệ bằng `1`).

Theo tôi thì cũng mất khá nhiều thời gian đấy nhỉ.

### Nghĩ thuận tự nhiên

Các bước nếu làm theo cách `nghĩ thuận tự nhiên` thay thế `flexbox`:

- từ design lấy size của `component` con chia cho size `component` cha được 1 tỷ lệ.
- phần trong `source code`, lấy tỷ lệ đó nhân với size `component` cha. Để ý rằng size `component` cha là giá trị động phụ thuộc vào màn hình từng điện thoại.

Đánh giá: khá nhanh gọn và dễ hiểu hơn.

Bài viết về cách làm này ở [đây](https://medium.com/react-native-training/build-responsive-react-native-views-for-any-device-and-support-orientation-change-1c8beba5bc23)

#### Các package hữu ích cho cách làm này

Hãy tự trải nghiệm để hiểu hơn nhé.

- [react-native-responsive-screen](https://github.com/marudy/react-native-responsive-screen): đơn giản hóa 1 phần cách làm này.
- [react-native-device-info](https://github.com/react-native-community/react-native-device-info): lấy Device Information.
- [react-native-orientation](https://github.com/yamill/react-native-orientation): lắng nghe sự kiện device thay đổi orientation (hướng màn hình).

## Tóm lại

- đây chỉ là 1 gợi ý khi làm UI cho `React Native`. Thực tế là mình rất ít khi dùng `flexbox`.
- `flexbox` chỉ là 1 trong nhiều API của `React Native`, đừng quá phụ thuộc vào 1 API hay package nào cả trong hệ sinh thái nguồn mở này.

Flow mình trên github tại [đây](https://github.com/loclv) để làm màu nhé :D