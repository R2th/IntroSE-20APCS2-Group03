Một ứng dụng iOS được xem là mang lại UI thân thiện cho người dùng nếu nó không chỉ chạy hoàn chỉnh trên iPhone mà còn trên những dòng iPad khác. Trải nghiệm này sẽ giúp cho app của bạn trông chuyên nghiệp hơn. Và thật thuận tiện hơn nữa khi bạn có thể cung cấp cho người dùng những giao diện có thể tuỳ biến trên các thiết bị khác nhau với ít thao tác lập trình nhất có thể với sự hỗ trợ tuyệt vời từ Adaptive layout trong Xcode. 

Bài viết này sẽ giới thiệu những khái niệm liên quan đến adaptive layout bao gồm universal storyboards, size classes, tuỳ biết layout và font. Hãy cùng bắt đầu tìm hiểu nhé.

### Universal storyboard
Đây là loại storyboard được dùng chung cho cả iPhone và iPad, với những tuỳ chỉnh ngay trên storyboard này, bạn có thể tạo ra được những màn hình phù hợp riêng cho từng loại device mà không cần phải tạo riêng.

Tạo mới dự án, chọn ngôn ngữ Swift và đặt tên là BabyPic. Trong demo này ta sẽ hiện thị ảnh của một bạn nhỏ cùng tên của bạn ấy. Giao diện sẽ được tuỳ chỉnh cho cả màn hình iPhone lẫn iPad. 

Trong Main.storyboard, Xcode đã mặc định enable Use Auto Layout và Trait Variations cho adaptive layout.

Để hiển thị ảnh, hãy tạo một image view trong ViewController và gán các giá trị height, cũng như các constraint để xác định vị trí cho nó như bên dưới. Image view này đã được canh top, left, right và height nên sẽ không cần gán width và bottom constraint cho nó.


![](https://images.viblo.asia/0482aabf-96e0-4e34-b1a8-6c2894057980.png)


Trong asset, tạo một set image mới, và đưa vào đó hình ảnh mà bạn muốn hiển thị lên như sau:

![](https://images.viblo.asia/dbec31d0-abd9-48b7-a3a6-74c9ac3be165.png)

Quay trở lại với storyboard, ta sẽ muốn hiển thị hình ảnh mà mình vừa import vào lên viewcontroller. Việc này rất đơn giản, chỉ cần chọn image cho imageView ở trên trong mục Image trong panel File Inspector.

![](https://images.viblo.asia/72755edd-6b01-402e-bbcc-727fff473b4c.png)

**Preview layout**

Xcode hỗ trợ ta xem trước giao diện trên các màn hình khác nhau một cách linh hoạt ngay khi chưa chạy code. Ngay bên dưới storyboard, ta có thể chọn view loại device cũng như orientation của nó.

![](https://images.viblo.asia/32cb8ab2-cc74-42c5-b278-e046dcd08451.png)

Tuy nhiên trên những màn hình nhỏ như iPhone 4, ở mode landscape, hình ảnh sẽ bị tràn. Để khắc phục điều này, ta sẽ chỉnh lại height của imageView:

Xoá height constraint hiện tại, sau đó thêm mới một equal constraint, gán Relationship là Less Than or Equal, Multiplier bằng 0.7. Điều này sẽ báo cho Xcode biết height của image sẽ bằng kích thước thật của image, hoặc bằng 70% height của màn hình, tuỳ vào giá trị nào nhỏ hơn.

![](https://images.viblo.asia/0182868d-5db8-4d1e-b5d7-9ddec1a92fc9.png)

Bây giờ trông em bé đã xinh hơn rất nhiều rồi đấy :) Ở mode portrait:

![](https://images.viblo.asia/70573aa4-bcba-40d1-9a62-6a86b3c1edb3.png)

Và cả landscape:

![](https://images.viblo.asia/af4f993d-ca89-4d59-aa45-2ab304a0dc18.png)

Em bé của chúng ta cần một cái tên để hiển thị, hãy kéo một label vào storyboard ngay bên dưới ảnh của bé. Bạn có thể chọn mode portrait để thực hiện.

Hãy thay text mặc định bằng tên bé, chọn màu và font mà bạn muốn hiển thị. 

![](https://images.viblo.asia/9820af6a-8d04-41c2-af54-75293474f3ba.png)

Trên iPad Pro 12.9” landscape, text hiển thị rất ổn:

![](https://images.viblo.asia/730ab3e0-414f-4496-9d5b-287f83afbbd2.png)

Tuy nhiên nó lại bể font khi chuyển sang iPhone 7 portrait, nhưng không sao, ta sẽ khắc phục điều này ngay sau đây với sự hỗ trợ tuyệt vời từ size classes. 

![](https://images.viblo.asia/201e0061-23d1-4995-b291-53cf195d0e5a.png)


### Size classes

Xcode cung cấp hai loại size classes: Regular và Compact. Mỗi device ở mode tương ứng sẽ có các size class khác nhau:

![](https://images.viblo.asia/de6cbfe7-614e-466a-b78b-149c70c19649.png)

Ở mode portrait, ta sẽ đưa label xuống thấp hơn. Để thực hiện việc này, ta sẽ chọn Preview ở mode portrait, sau đó chọn Vary for Traits, sau khi chọn, layout sẽ được highlight và mọi thay đổi sẽ được ghi nhận chỉ cho mode này.

![](https://images.viblo.asia/d6ead50a-af63-4460-82d2-0f08ea03ab63.png)

Hãy thử thay đổi top constraint của label từ 0 thành 60, nhấn Done để hoàn thành việc thay đổi. Ở File inspector, ta sẽ nhận ra một giá trị constraint mới được thêm vào cho size class height Regular (hR)

![](https://images.viblo.asia/dfd39f9f-b98d-4eb4-acf6-c87adf520330.png)


### Tuỳ biến Font

Font chữ ở màn hình iPhone portrait bị tràn màn hình do quá lớn, ta sẽ chỉnh nó nhỏ lại cho màn hình này bằng cách thêm một giá trị ở mục Font, chọn Compact Width và Any Height.

![](https://images.viblo.asia/fbdcecc8-3986-4d68-9f04-5a9dbaeec293.png)

Set một giá trị nhỏ hơn cho font, khoảng 40. Bây giờ khi chọn preview iPhone portrait, tên của em bé đã không bị tràn ra ngoài nữa, và trông rất dễ nhìn.

![](https://images.viblo.asia/243880fc-6866-4379-ae4f-e3e4d6a21e5f.png)


Bây giờ trên bất kể device nào, landscape hay portrait, app đều hiển thị rất đẹp mắt.

Đến đây, chúng ta đã cùng tìm hiểu được những khái niệm cơ bản về Adaptive Layout. Chúc các bạn tạo ra được những ứng dụng đẹp chạy được trên nhiều giao diện nhé.