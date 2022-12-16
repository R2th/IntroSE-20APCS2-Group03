**Giới thiệu cơ bản về Vue 2**

Chào mừng các bạn đã quay trở lại với series Từng bước học Vue2 tập 8.

Tiếp tục bài học về component ở những tập trước, thì hôm nay mình sẽ thực hành 1 ví dụ thực tế hơn để sử dụng sao cho hợp lý và hiệu quả hơn trong chính dự án của mọi người

Mình sẽ sử dụng thư viện css là Bulma và thư viện này cũng tương tự Bootstrap mà bình thường chúng ta vẫn sử dụng
![](https://images.viblo.asia/110bbddd-1f8c-4726-bf36-c8858442730b.png)

Trong Bulma thì cũng có sẵn những Components cho chúng ta sử dụng và hôm nay mình sẽ sử dụng Message Components để làm demo
![](https://images.viblo.asia/8e978bc4-d9e6-4bee-8213-43eef870996d.png)

Quay lại code chúng ta sẽ include bulma css vào
![](https://images.viblo.asia/2aa7d72f-4919-4b25-9e50-1585dc2e3cd8.png)

Sau đó chúng ta sẽ copy Message Components vào <div id="root">
![](https://images.viblo.asia/4e1edb9f-4a24-40bf-98c5-7f8ffc832cf8.png)

Và kết quả hiển thị trên trình duyệt sẽ là
![](https://images.viblo.asia/9f0d83a4-4d44-4480-b081-9c26a301345d.png)

 Okie và giờ chúng ta sẽ bắt tay vào thay đổi code để phần Message Components này có thể sử dụng lại 1 cách đơn giản và không phải viết quá lặp lại quá nhiều cái cặp thẻ cũng như class. Đầu tiên chúng ta sẽ thay đổi bằng 1 cặp thẻ để tự định nghĩa mình sẽ chọn là <message>
![](https://images.viblo.asia/0ccaff84-8f32-4188-bb96-65cc283c9af0.png)
 
Phía main.js chúng ta sẽ paste đoạn html của Message Component vào và thay đổi các phần text bằng biến title và body như sau    
![](https://images.viblo.asia/590467b9-2cfa-44c8-b7bf-f4ae931f41b3.png)

Trở lại trình duyệt và refresh
![](https://images.viblo.asia/c2956fcf-e6ad-4432-8317-37f78cde4c93.png)

Đã xảy ra lỗi và hãy cùng nhau Inspect và check.Vậy là property chưa được khai báo 
![](https://images.viblo.asia/f2823027-1701-48d1-aaf5-c77630226d11.png)
     
Quay trở lại file main.js. Chúng ta sẽ khai báo thêm props
![](https://images.viblo.asia/0c5f7650-0887-4031-8d41-2d09a50e8956.png)
    
Trở lại trình duyệt và refresh và kết quả đã là
![](https://images.viblo.asia/ad60acc0-8958-456e-901d-b6a6b807da91.png)

Giờ hãy add thêm 1 cặp thẻ nữa vào. Và đơn giản chúng ta chỉ cần thay đổi nội dung bên trong title và body
![](https://images.viblo.asia/2c0e093b-9bc4-456c-8106-41b8281607ee.png)

Kết quả nhận được sẽ là
![](https://images.viblo.asia/e529d7dc-1884-4352-8731-30aa62f56948.png)

Okie giờ cũng nâng cao hơn 1 chút đề bài chúng ta sẽ làm thêm nút X để Close Modal khi click vào nhé
 ![](https://images.viblo.asia/7a9ab5b4-b3ea-4dd3-805d-12f949b0f046.png)

 Chúng ta sẽ gắn thêm thẻ button và sự kiện click bằng method hideModal như trên. Và bình thường xử lý bằng javascript chúng ta sẽ làm như sau :
    ![](https://images.viblo.asia/2d97fe72-34e6-4c4d-b70c-34e2e56b72b3.png)
Nhưng chúng ta đang sử dụng VueJs mà nên hãy làm theo cách đơn giản hơn
    ![](https://images.viblo.asia/b289a5dc-2fea-4005-801f-b695ea48ee48.png)
Đặt data là isVisible : true. Và đơn giản ở cặp thẻ đầu tiên của Message Component chúng ta sẽ thêm v-show="isVisible" sẽ tương ứng với isVisible = true thì hiển thị và isVisible = false thì sẽ bị hide đi
    ![](https://images.viblo.asia/891aa2fd-39fe-47a8-88fd-40df8f065c8f.png)
   
 Và khi đó methods hideModal sẽ chỉ cần xét IsVisible = false   
![](https://images.viblo.asia/1d43fe54-49cc-4419-8595-ad5f6fcf9d59.png)


Cùng kiểm tra với trình duyệt nhé. Ở ảnh dưới là mình click vào button của đoạn <message> thứ 2.
    ![](https://images.viblo.asia/465420b4-bd88-435a-914a-1126020c972f.png)

Vậy là việc thêm button để hide đã hoàn thành
    Cách mình hay viết hơn sẽ là copy phần xét isVisible vào thẳng luôn acion click ở button. Vô cùng đơn giản và gọn gàng đúng không nào
    ![](https://images.viblo.asia/022964ef-875e-418f-a6c0-2ce2523a7ced.png)

Okie, bài học hôm nay cũng dừng lại ở đây, vào tập tiếp theo mình sẽ giới thiệu đến các bạn những phần khác của Vue2, cùng đón chờ nhé

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!