Một trong những cách mà Swift giúp cho chúng ta viết ra những dòng code tuyệt vời đó là thông quan khái niệm về kiểu giá trị, điều mà bị giới hạn bởi các trạng thái được chia sẻ thông qua các API. Bởi vì khi sử dụng kiểu dữ liệu giá trị, tất cả các mutation mặc đinh là được sẽ tạo ra giá trị được sao chép ở local và API mà chúng được mutation được đánh dấu là **mutating**.

### Hàm mutating có nhiệm vụ gì ?
Một hàm được đánh dấu là **mutating** có thể thay đổi bất kỳ thuộc tính nào nằm trong giá trị của nó. Cụm từ "giá trị" thực chất là chìa khóa ở đây, kể từ khi định nghĩa về mutation của Swift chỉ áp dụng cho kiểu giá trị chứ không phải kiểu tham chiếu như class hoặc actor.

Ví dụ như hàm **cancel** nằm trong **Meeting** là mutating, vì nó thay đổi được giá trị của thuộc tính **state** và **reminderDate**


![](https://images.viblo.asia/2f849176-1467-4157-b9a8-6e5faf16eabe.PNG)

Ngoài việc thay đổi được thuộc tính, định nghĩa về mutating còn có thể gán được giá trị mới cho **self**, điều mà rất hữu ích cho việc thêm một hàm vào một enum.


![](https://images.viblo.asia/6cdbb9a5-3d4d-425e-ad14-aceee38d9ade.PNG)

Kỹ thuật trên còn hữu ích cho các kiểu giá trị khác, ví dụ như là struct, có thể thực sự hữu ích nếu chúng ta muốn khởi tạo lại giá trị của nó về mặc đinh. hoặc chúng ta muốn biến đổi nó thành một kiểu giá trị phức tạp khác.

![](https://images.viblo.asia/dfb9f8fe-3337-4075-9435-fa44d8fe9951.PNG)


### Tạo mutation trong khởi 
Trong khi các chức năng luôn luôn được đánh dấu công khai là mutating mỗi khi chúng ta muốn thay đổi giá trị của trạng thái nội tại của chúng, hàm khởi tạo luôn được biến đổi mặc định. Điều đó có nghĩa là thay vì gán giá trị khởi tạo giá trị của thuộc tính, thì chúng ta có thể biến đổi hàm này để tạo ra một giá trị khác tuy nhiên **self** vẫn phải được khởi tạo trước tiên.

Ví dụ, **ProductGroup** sẽ gọi hàm **add** của nó để thêm các product vào trong hàm khởi tạo của nó.

![](https://images.viblo.asia/36190458-41e6-4fb2-887f-02469b3e5e3f.PNG)

### Thuộc tính Non-mutating
Cho đến giờ, chúng ta chỉ nói về định nghĩa mutating, nhưng Swift cũng đưa ra cho chúng ta cách để đánh dấu các thuộc tính **non-mutating**. Khi mà các ứng dụng của nó khá giới hạn so với mutating nhưng trong một số trường hợp nó vẫn khá hữu dụng.

Để ví dụ cho việc này, hãy nhìn vào một view code bằng SwiftUI, mà sẽ tăng giá trị của biến **value** mỗi khi nó được bấm.

![](https://images.viblo.asia/8b83e247-c1df-4269-986b-6c232e7d7444.PNG)

Bây giờ, nếu như chúng ta nhìn vào phía trên nó không chỉ là một view SwiftUI, mà nó còn là một struct bình thường. Làm sao mà chúng ta có thể thay đổi thuộc tính **value** nằm trong closure như vậy mà không gọi đến mutating hoặc synchronous.

Câu trả lờ nằm trong phần khởi tạo State của wrappedValue, điều mà đã được đánh dấu là nonmuating keyword :

![](https://images.viblo.asia/2bca8ea9-e312-4376-9349-f0b295605c10.PNG)

Ngoài ra chúng ta có thể sử dụng cách sau để tránh việc giá trị của thuộc tính bị thay đổi ở bên ngoài mà chỉ thay đổi giá trị thuộc tính trong code mà chúng ta xây dựng sẵn cho nó.

![](https://images.viblo.asia/aa0aa3a8-7070-46bd-b198-0e0015f8181d.PNG)

Đến đây là hết bài viết, cảm ơn các bạn đã đón xem.

REF : https://www.swiftbysundell.com/articles/mutating-and-nonmutating-swift-contexts/