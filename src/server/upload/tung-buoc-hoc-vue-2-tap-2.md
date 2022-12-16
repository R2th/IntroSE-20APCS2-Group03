**Giới thiệu cơ bản về Vue 2**

Ở tập trước chúng ta đã được xem 1 ví dụ đơn giản về Vue2. Hôm nay tôi sẽ giới thiệu đến vs các bạn 1 công cụ hỗ trợ hữu ích khi làm việc với VueJS. Quay trở lại với ví dụ ở tập 1 chúng ta sẽ chuột phải và Inspect lên. Chúng ta sẽ có được giao diện như sau
![](https://images.viblo.asia/9f56b851-4505-41c9-a225-ee9975c37464.png)

Click vào link được github được suggest trên giao diện
![](https://images.viblo.asia/e3e843a5-47d2-42b6-aa2d-f01b3010714b.png)

Chúng ta sẽ có 1 extension trên chorme được cung cấp để phục vụ việc code Vue và sẽ giúp ích khá nhiều cho chúng ta trong quá trình làm việc cùng Vue. Có thể nhiều người cũng đã biết đến nhưng tôi vẫn cung cấp lại cho những bạn chưa làm việc vs Vue cũng có thể hiểu được.
![](https://images.viblo.asia/19cba172-f655-450b-9169-759bb7a31259.png)

Tiếp đến chúng ta sẽ thực hiện việc add extension vào chorme và lưu ý bật lên với những Url mà bạn mong muốn. Lưu ý lúc đầu thì extension này luôn được tắt nên chúng ta sẽ chưa thấy có gì khác biệt ở phần Inspect cả
![](https://images.viblo.asia/0331620d-c7a3-404e-8595-275289bd97e9.png)
Okie, sau khi đã bật extension và bật lại Inspect chúng ta đã có thêm 1 tab Vue hiển thị như dưới.
![](https://images.viblo.asia/aeec3bb9-81db-4200-ba99-8c4ffc36603d.png)
![](https://images.viblo.asia/029ceaab-3bfd-4ac7-89f9-dd9c83d69ca0.png)
Như 2 ảnh trên tôi đã thay đổi message trong view và nhận được ở phía dưới extension dữ liệu cũng đã được thay đổi, điều này giúp chúng ta hiểu được là Vue luôn được thực hiện gần như là ngay lập tức với việc thay đổi dữ liệu của biến ở trên view.Đây cũng là 1 đặc điểm giúp các view của Vue có tốc độ rất nhanh do không phải reload lại trang web sau mỗi lần thay đổi mà việc này đã được javascript xử lý vô cùng mượt mà.

Để ý thì phần bên trái của ảnh thứ 2 có biến $vm0. Chúng ta cùng thử xem nó là gì nhé
![](https://images.viblo.asia/5129c147-8949-41b2-9f13-6e7c91d9f085.png)

Chuyển sang tab Console, gõ $vm0 và enter. Chúng ta sẽ có được kết quả như sau, vậy $vm0 ở đây chính là tên biến của Root chứa toàn bộ dữ liệu của Vue đã được chúng ta đề cập ở trong phần code. Tiếp theo thử $vm0.mesage kết quả sẽ chính là text Like this chúng ta đã thay đổi ở những bước trên. 

![](https://images.viblo.asia/57c2ae07-7294-424e-8c88-eda8276a51bf.png)
Tiếp theo chúng ta sẽ thử xét message như sau : $vm0.message = 'I have been changed.'
Và text ở trên view cũng được thay đổi cùng lúc như trên. Vậy là chúng ta có thể code đơn giản những gì mình muốn thử ở ngay trên giao diện console này cũng là vô cùng tiện lợi trước khi copy vào code đúng không nào.

Chúng ta cùng chờ sang bài 3 để xem có gì hay ho không nhé.