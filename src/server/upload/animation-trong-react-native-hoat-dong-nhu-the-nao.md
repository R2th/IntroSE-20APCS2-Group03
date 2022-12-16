![](https://images.viblo.asia/d4b2e70d-8bad-4894-8157-771ccfe87eae.jpg)

***Animation*** là một phần không thể thiếu của bất kỳ ứng dụng nào. Khả năng hoạt động mượt mà, trơn tru sẽ ảnh hưởng rất tốt đến trải nghiệm của người dùng. Trong bài viết này chúng ta cùng tìm hiểu xem cách ***Animation*** hoạt động trong *React Native* và khác gì so với *Native* như thế nào nhé.
## Animated API

React Native cung cấp một API gọi là **Animated**. Trong đó bao gồm nhiều những animation thú vị, hay ho như *Animated values*, *spring/timing animations*, ... Nhưng bài viết này sẽ không đi sâu vào những thứ mà **Animated API** có mà sẽ tìm hiểu cách *React Native* tạo *Animation* cho những nội dung hiển thị trên màn hình và cách chúng diễn ra như thế nào.

## Có 2 cách để chạy animation
Trước tiên thì bạn nên biết qua cách hoạt động của *React Native*, mình có dịch một bài viết về cách hoạt đông và sự thay đổi cấu trúc của *React Native* tại [đây](https://viblo.asia/p/tai-kien-truc-react-native-trong-nam-2020-RQqKLLD0K7z).

Cần phải nắm rõ điều này đó là tất cả các giao diện trên *React Native* đều là **Native View** không phải nhúng trình duyệt web giống như *Ionic*. Chính vì thế, các *Animation* cũng sẽ được thực hiện trên **Native View**.

### Hoạt động trên JS rồi update Native View

Luồng hoạt động sẽ giống như sau:

1. Bắt đầu *Animation* 
2. JS chạy hàm ***requestAnimationFrame*** - một hàm sẽ chạy 60 lần/giây (60 FPS).
3. JS sẽ tính toán position/opacity/transform hay bất kỳ thứ gì cần tạo chuyển động trên view.
4. JS sẽ gửi các giá trị này đến **Bridge**.
5. Ở bên kia **Bridge**, Java (Android) hoặc Objective C (iOS) nhận và xử lý.
6. Cuối cùng **Native View** sẽ được update.

Sẽ không có re-render component *React* ở đây nên sẽ không có chuyện component sẽ được render 60 lần trong một giây.
Vậy cách này sẽ có những ưu nhược điểm gì?

#### Ưu điểm:

* Viết được những *Animation* phức tạp bằng JS và hiển thị dưới dạng *Native Animation*
* Có thể kiểm soát được các trạng thái của *Animation*

#### Nhược điểm:

* Ảnh hưởng hiệu năng nếu **JS thread**  đang thực hiện các tác vụ khác.
* Nếu **Bridge** cũng đang bận thì hiệu năng sẽ giảm khi OS và JS muốn giao tiếp với nhau.

### Native Driver Animation

*React Native* hoàn toàn có thể cho phép bạn dùng *Native Driver* để thực hiện các *Animation*. Điều này có nghĩa là *React Native* sẽ giảm tải hoạt động của *JS thread* và chuyển sang *UI thread (của từng OS)*. Nó sẽ có những lợi ích như:

* **JS thread** (**và Bridge**) sẽ rảnh rang hơn để xử lý các tác vụ chuyên sâu như những thao tác lặp đi lặp lại từ người dùng.
* *Animation* sẽ có phần mượt mà hơn.

{@embed: https://www.youtube.com/watch?v=lsRf_PspjSs&feature=youtu.be}

Để là được điều này thì *React Native* có cung cấp một thuộc tính gọi là ***useNativeDriver***. Thuộc tính này có các giá trị kiểu *boolean*. Nếu set `useNativeDriver: true` thì luồng hoạt động sẽ như thế này:

1. Bắt đầu *Animation*.
2. JS sẽ xử lý các thông tin của *Animation* và gửi qua **Bridge**.
3. Ở bên kia **Bridge**, Java (Android) hoặc Objective C (iOS) sẽ nhận các thông tin và chạy *Animation*.

Cách này sẽ nhẹ nhàng hơn cho **JS thread** vì không cần phải chạy ***requestAnimationFrame*** liên tục. Nhưng vẫn có những ưu, nhược điểm sau:

#### Ưu điểm:
* *Animation* nhanh hơn.
* Giảm bớt tác vụ cho **JS thread**.
* Tối ưu hiệu năng cho các thiết bị đời thấp

#### Nhược điểm:
* Ít khả năng kiểm soát các trạng thái của *Animation*.
* Ít thuộc tính để thao tác hơn

Đội ngũ phát triển của *React Native* vẫn đang tiếp tục làm việc để có thể hỗ trợ nhiều thuộc tính hơn.

Bài viết đến đây là hết. Cảm ơn mọi người vì đã đọc!