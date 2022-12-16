Đối với mỗi ứng dụng, giao diện là một phần rất quan trọng. Giao diện đẹp, dễ sử dụng sẽ gây được ấn tượng, thiện cảm đối với user, níu kéo user sử dụng app lâu hơn. Trong bài viết này mình sẽ giới thiệu một số animation trong Material Design của Android để mỗi người có thể áp dụng vào trong app mình làm cho app đẹp hơn, dễ sử dụng hơn.

# Understanding motion
Motion (chuyển động) làm cho giao diện sử dụng trở nên rõ ràng và dễ sử dụng hơn.

## Nguyên tắc

### Rõ ràng

Motion cho thấy mối quan hệ không gian và phân cấp giữa các thành phần, hành động nào có thể thực hiện, và điều gì sẽ xảy ra nếu thực hiện hành động đó
![](https://images.viblo.asia/4462fac7-8772-42f1-8234-13dafdc0f77e.gif)

### Tập trung

Motion tập trung sự chú ý vào những gì quan trọng mà không tạo ra sự mất tập trung không cần thiết
![](https://images.viblo.asia/3a987655-fb3f-4d9b-b90f-34cabf7b23d1.gif)

### Rõ ràng

Motion là kỉ niệm những khoảnh khắc trong quá trình sử dụng, thêm những phá cách vào các tương tác chung và thể hiện cá tính, phong cách của một thương hiệu
![](https://images.viblo.asia/ae849a2c-f211-4621-9d9e-5590383a5a52.gif)

## Sử dụng

### Hierarchy

Motion giúp định hướng người dùng bằng cách hiển thị các yếu tố liên quan đến nhau

![](https://images.viblo.asia/4397fa54-8fd0-4247-a1ee-40dcac45b252.gif)
Motion phản ánh phân cấp giữa các thành phần cha (inbox) và các thành phần con (inbox message)

![](https://images.viblo.asia/dda7b179-e273-42b0-a426-60b025742a37.gif)
Motion biểu thị thứ bậc giữa các item đồng dạng

### Feedback & status
Motion cung cấp phản hồi kịp thời cùng với trạng thái hành động của người dùng

![](https://images.viblo.asia/aa5477dd-fb7f-46f4-9b9d-51a08eb8e745.gif)
Motion xác nhận input và cho biết hành động có thành công hay không

![](https://images.viblo.asia/2e9a589d-9886-4ae2-8148-0f47f40fdf7a.gif)
Motion giữ chỗ cho UI hiển thị nội dung đang được tải

![](https://images.viblo.asia/8671832c-4005-4a86-af54-7c1b553a4ab0.gif)
Motion làm rõ các mục được chọn và điều gì sẽ xảy ra nếu thả nó ra

### User education

Motion cho biết cách thực hiện hành động và đưa ra các đề xuất hữu ích

![](https://images.viblo.asia/27206688-2ca6-48bd-8a9a-2aef0b9fcdec.gif)
Motion cho biết cách hoàn thành hành động bằng cử chỉ vuốt

![](https://images.viblo.asia/2d688c88-565c-47be-a738-ba2427a848e0.gif)
Motion hiển thị vị trí của item được chọn

![](https://images.viblo.asia/086b0570-f6b7-4db2-bdaf-c06d0f338c83.gif)
Motion thêm nhân vật và tương tác hấp dẫn

![](https://images.viblo.asia/45d2cdd7-052a-494a-a5a2-30fa5fe895dd.gif)
Hoạt ảnh nhân vật đối với trường hợp lỗi không mong muốn

## Motion chuyển tiếp

Trong quá trình chuyển đổi, các thành phần giao diện người dùng chuyển đổi được phân loại là gửi đi, gửi đến hoặc liên tục. Danh mục một phần tử thuộc về ảnh hưởng đến cách nó biến đổi.
Các yếu tố giao diện người dùng không chuyển đổi được phân loại thành các phần tử tĩnh. Nó không đóng vai trò gì trong quá trình chuyển đổi.

![](https://images.viblo.asia/9a9e3e31-27d2-43de-b83c-563aa942dceb.gif)

**1.  Thành phần liên tục**

Biến đổi của thành phần liên tục, ví dụ như navigation icon, bắt đầu và kết thúc ở trên màn hình

**2.  Thành phần gửi đi**

Thành phần gửi đi, ví dụ như title, biến mất khỏi màn hình 

**3.  THành phần gửi đến**

Thành phần gửi đến, ví dụ như action item, xuất hiện trên màn hình 

**4.  Thành phần tĩnh**

Thành phần tĩnh, ví dụ như overflow menu, không biến đổi

## Expressing continuity 

Motion hướng dẫn người dùng chú ý bằng sự mượt mà, không bị gián đoạn. Khi UI thay đổi, motion cung cấp tính liên tục giữa vị trí và sự xuất hiện của các element trước và sau khi chuyển đổi.

Sự liên tục được thể hiện bằng một hoặc nhiều kĩ thuật sau:
* Tweening
* Fading
* Shared transformation

### Tweening

Tweening hiển thị một sự tiến triển liên tục của các thay đổi được áp dụng cho một thành phần hoặc phần tử theo thời gian. Ví dụ, một chuyển đổi có thể di chuyển trơn tru trên màn hình bằng cách tweening vị trí của nó, hoặc một nút hành động nổi (floating action button - FAB) có thể biến thành một thẻ bằng cách tweening FAB ở kích thước và bán kính góc.

Tweening có thể được áp dụng cho các thuộc tính có một loạt các giá trị trung gian, chẳng hạn như các màu dọc theo một phổ màu sắc. Ví dụ, màu sắc có thể được tweened từ màu đỏ sang màu xanh bằng cách hiển thị màu trung gian, như màu tím.
Không thể áp dụng tính năng tweening cho các khía cạnh của giao diện người dùng không có giá trị hoặc trạng thái trung gian. Ví dụ: số cột trong bố cục có thể là một số nguyên, chẳng hạn như 1 hoặc 2, nhưng không phải là số ở giữa.

![](https://images.viblo.asia/9c97eaa6-3961-4670-98f0-90133e8d2f1a.gif)
FAB biến thành phẳng bằng cách xoắn vị trí, kích thước, độ cao, màu sắc và bán kính góc. Tweening cũng được áp dụng cho độ đục của màu đen.

### Fading

Fading đề cập đến opacity của một thành phần. Ngay cả khi các phần tử có các thuộc tính không có trạng thái trung gian, fading có thể tạo ra các chuyển đổi trơn tru. Ví dụ, một hình ảnh có thể chuyển đổi sang một hình ảnh khác bằng cách làm giảm opacity của hình ảnh để lộ ra hình ảnh khác.

#### Dissolve

Dissolve tạo ra sự chuyển tiếp mượt mà giữa các phần tử chồng chéo hoàn toàn với nhau, chẳng hạn như ảnh bên trong một thẻ hoặc một vật chứa khác. Một phần tử foreground mờ dần (xuất hiện) hoặc ra (biến mất) để hiển thị hoặc ẩn một phần tử đằng sau nó.

![](https://images.viblo.asia/2f6945e0-22bb-49d6-af78-7e9146704c88.gif)
Ảnh mờ dần để hiện ảnh đằng sang nó

#### Cross-dissolve

Cross-dissolve liên quan đến hai yếu tố mờ dần đồng thời: một mất dần trong khi khác mờ dần. Nó mô tả hai yếu tố được hiển thị cùng nhau trong một phần của quá trình chuyển đổi, cùng với bất kỳ yếu tố nào đằng sau chúng. Sự chồng chéo của nhiều bề mặt này có thể gây mất tập trung.

![](https://images.viblo.asia/0cee8f8e-cfe9-43ca-9e98-7a7a9ef1c300.gif)
Trong khi hai phần tử mờ dần cùng một lúc, cả hai có thể được nhìn thấy cùng nhau trong một phần của quá trình chuyển đổi. Background cho phép nhìn xuyên 1 phần.

#### Fade through

Fade through bao gồm một yếu tố mờ dần hoàn toàn trước khi một yếu tố mới biến mất. Những chuyển đổi này có thể được áp dụng cho văn bản, biểu tượng và các yếu tố khác không trùng lặp hoàn toàn. Kỹ thuật này cho phép nền hiển thị trong suốt quá trình chuyển đổi và nó có thể cung cấp tính liên tục giữa các màn hình khi được ghép nối với một phép biến đổi được chia sẻ.

![](https://images.viblo.asia/ebe05eb6-8657-4fbd-a096-dbacc8ca5f09.gif)
Hai phần tử mờ dần theo tuần tự và không hiển thị cùng một lúc tại bất kỳ thời điểm nào.

## Shared transformation

Shared transformation liên quan đến việc đồng bộ hóa các chuyển động của phần tử để tăng cường tính liên tục. Ví dụ, nếu một FAB đột nhiên hiển thị một biểu tượng khác, nó có thể gây mất tập trung. Chuyển đổi được chia sẻ thông suốt thể hiện sự thay đổi trong biểu tượng trong khi các biểu tượng đang chuyển động.

![](https://images.viblo.asia/aac03d6f-eb5d-4acd-a888-d21adf385da1.gif)
1. Các FAB nổi bật đột ngột.
2. Các FAB chuyển đổi mượt mà trong khi đang chuyển động.

Cảm ơn các bạn đã đọc bài của mình :D