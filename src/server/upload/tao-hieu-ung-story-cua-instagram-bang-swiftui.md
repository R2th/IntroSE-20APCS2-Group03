{@embed: https://www.youtube.com/watch?v=Fs-nKKJtFfk}
Có lẽ chúng ta đã quá quen thuộc với Story ở trên Instagram hoặc trên Facebook. Nó là những video và hình ảnh được liên kết với nhau như một thư viện hình ảnh để kể câu truyện nào đó. Bên cạnh đó, bạn cũng có thể dùng những hình ảnh đã lưu trước đó bên Snapchat để tạo câu truyện bên Instagram. 

Chính vì thế hôm nay mình sẽ hướng dẫn các bạn tạo hiệu ứng giống như trong Story của mạng xã hội với animation trong IOS bằng SwiftUI.

![](https://images.viblo.asia/6df9c327-1708-42b6-a7ee-b8f7e70b36e3.png)

Vì sao ở đây mình lại lựa chọn SwiftUI mà không lựa chọn thằng UIKit.Sau khi nghiên cứu SwiftUI, mình đã nhận ra logic khác biệt như thế nào và học cách tạo ra các hình ảnh động phức tạp hơn. Đáng mừng là các hoạt ảnh được sử dụng nhiều nhất được triển khai nhanh chóng và SwiftUI thậm chí còn tạo ra một số hiệu ứng chuyển đổi đẹp mắt hơn.

Các khung nhìn SwiftUI được điều khiển theo trạng thái, có nghĩa là các chuyển đổi chế độ xem giữa các trạng thái khác nhau là các hoạt ảnh được sử dụng nhiều nhất. Các thông số hoạt ảnh phổ biến nhất, chẳng hạn như độ mờ, tỷ lệ, xoay, màu sắc và vị trí rất may là thực sự dễ tạo hoạt ảnh trong SwiftUI.

Đầu tiên ta phải tạo Model để lưu trữ data các Story trong Demo này của ta. 
Ở đây hình ảnh mình tải ở trên mạng bỏ vào các bạn có thể tải bất cứ hình ảnh nào các bạn muốn.

![](https://images.viblo.asia/1efe416c-b62a-4a18-832f-8742221ba86b.png)

Sau đó ở bên View của ta sẽ sử dụng Zstack (Tạo Stack lưu trữ đè lên nhau phần tử sau đè lên phần tử trước) . Để khi ta chọn vào một cái Story thì nó sẽ đè cái view hiển thị ảnh lên. Để ta thấy giống như nó chuyển qua view khác để hiển thị.
![](https://images.viblo.asia/d316bcd4-6628-4691-a5a8-161429ccf78f.png)



Ở thằng SwiftUI này để hiển thị ra một cái list thì ta sẽ sử dụng hai thằng là ScrollView và Hstack
-	ScrollView : Tạo ta một cái UI có khả năng scroll cuộn theo hướng của những thằng con nằm trong nó.
-	Hstack thì nó sẽ tạo một cái Stack để chứa những phần tử được xắp xếp theo chiều ngang.
Và trong demo này mình sẽ sử dụng hai thằng @PropertyWrapper đó chính là State và Binding
- @State : SwiftUI quản lý việc lưu trữ bất kỳ thuộc tính nào mà bạn khai báo dưới dạng @State. Khi giá trị trạng thái thay đổi, chế độ xem sẽ vô hiệu hóa giao diện của nó và tính toán lại nội dung. Sử dụng @State làm nguồn dữ liệu duy nhất cho một UI nhất định.Bạn chỉ nên truy cập một thuộc tính @State từ bên trong phần Body hoặc từ các phương thức được gọi bởi nó. 
- @Binding: Sử dụng Binding để tạo kết nối hai chiều giữa thuộc tính lưu trữ dữ liệu và dạng xem hiển thị và thay đổi dữ liệu. Một ràng buộc kết nối một thuộc tính với một nguồn sự thật được lưu trữ ở nơi khác, thay vì lưu trữ dữ liệu trực tiếp. 
Ví dụ: một nút chuyển đổi giữa phát và tạm dừng có thể tạo ràng buộc với một thuộc tính của chế độ xem gốc bằng cách sử dụng Binding.

Một Statephiên bản không phải là giá trị của chính nó; nó là một phương tiện để đọc và ghi giá trị. Để truy cập giá trị cơ bản của một trạng thái, hãy sử dụng tên biến của nó, tên này sẽ trả về giá trị thuộc tính.wrappedValue

Tiếp tục ta sẽ chạy một vòng For để hiển thị các Story của ta hiển thị liên tiếp các Vstack để hiển thị hai thằng là avatar và tên của người đăng . Chú ý ở đây ta sẽ để avatar image vào trong một thằng Zstack. Mục đích để xí ta để một cái circle ngoài nó để tạo hiệu ứng animation.
Khi run ta sẽ được như này
![](https://images.viblo.asia/0b8848a2-67f7-4b3b-8884-23f59306676a.png)

 Nhưng mà nếu như thế thì không giống Story một chút nào cả nên ở đây ta sẽ thêm vào những hình ảnh các Circle ở ngoài hình. Và những cái vòng tròn này sẽ có event là khi ta thay đổi thằng select story thì nó sẽ thay đổi số cạnh hình tròn từ 1 thành 360 và rotation effect thì nó sẽ quay tròn caí hình tròn của ta. Circle trong Swift UI sẽ được tạo như sau.Ta có thể tham khảo link sau : https://www.ioscreator.com/tutorials/swiftui-basic-shapes-tutorial
 

Và ta thêm gesture vào VStack mỗi khi ta click thì nó sẽ cập nhật lại select story và show ra cái ảnh story cho ta thấy.

![](https://images.viblo.asia/8efd156d-cd55-499d-842e-b881c352b2ee.png)

![](https://images.viblo.asia/43566210-ee46-43ac-9fd9-e7b8603b1897.png)

Rồi ở đây thì đã Ok hơn rồi tiếp tục ta sẽ tạo cái view hiển thị ảnh trong story

Như ở trên mình đã nói thì thằng Zstack theo cơ chế "vào sau ra trước" nên khi điều kiện show là true thì nó sẽ đè cái view hiển thị hình ảnh lên mấy cái StoryBoard của ta. Và Ở trong này thì cũng là một Zstack luôn nó có hai thành phần chính :
-	Cái ImageView để hiển thị ảnh trong Story
-	Một cái TimeLoader để hiển thị thời lượng của Story

![](https://images.viblo.asia/8340233d-3f74-42ac-8be9-8ba624e0ceac.png)

Ở đây ở phần load data ta phải lồng nó vào trong thằng GeometryReader. Vì nó sẽ cung cấp cho ta một giá trị đầu vào cho chúng tôi biết chiều rộng và chiều cao mà chúng ta có sẵn và sau đó chúng tôi có thể sử dụng giá trị đó với bất kỳ phép tính nào chúng ta cần.

![](https://images.viblo.asia/c024d7af-0446-4fdd-8321-ba32277a4568.png)


Ta sẽ tạo một cái class Loader để hiển thị cái view Time Load của ta. Trong này ta sẽ có một cái biến là show đó là một cái @Binding( sẽ binding hai chiều lại dữ liệu cho thằng cha chuyền vào trong nó ).

Cái thanh Loader thì ta sẽ tạo hai cái hình chữ nhật một hình chữ nhật sẽ biểu thị tiến trình hiện tại cái còn lại sẽ là tiến trình chưa hoàn thành.

Và ở trong này ta sẽ có thằng Timer thì nó sẽ tăng cái timer lên 0.1 mỗi lần và khi đến thời gian giới hạn (ở đây mình cho nó là 6s)  thì nó sẽ binding cái biến show ở thằng cha lại thành false . Nó sẽ ẩn đi cái view hiển thị ảnh lại.

Nếu bạn đã đọc đến đây thì chúc mừng bạn đã thành công tạo một cái Story Mạng Xã Hội đơn giản rồi đó. Cảm ơn các bạn đã đọc bài viết của mình :wink::wink::wink: