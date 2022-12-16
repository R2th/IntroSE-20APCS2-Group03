MVC, MVP, và MVVM là 3 mô hình thông dụng khi phát triển phần mềm. Chắc hẳn các bạn đã quen với mô hình MVC, MVP, trong bài viết này, mình sẽ giới thiệu với các bạn mô hình Model View View-model (MVVM). Nhìn chung thì tất cả những mô hình trên đều giúp đỡ chúng ta rất nhiều trong việc phát triển một ứng dụng dễ kết hợp, dễ kiểm thử và dễ duy trì. Bài viết này mình sẽ viết trong mô hình MVVM trong Vue Js.

### 1: Nhìn tổng quan về các mô hình MVC, MVP, MVVM 
![](https://images.viblo.asia/271aa93b-3017-4d87-9981-408e1116086f.png)

Như ta thấy trong 3 mô hình trên, sự giống nhau của các mô hình đều là phần View và Model, sự khác nhau là ở phần controller, presenter, view model. Vậy chức năng hay nhiệm vụ mỗi phần này ở từng mô hình là gì ? 


-  Controller (MVC) : Controller có trách nhiệm xử lý các yêu cầu (request) được gửi đến. Nó sẽ xử lý các dữ liệu của người dùng qua Model và trả về kết quả ở View.
-  Presenter (MVP) : Presenter sẽ nhận input của người dùng thông qua View, rồi xử lý dữ liệu của người dùng với sự trợ giúp của Model và trả kết quả về View. Presenter giao tiếp với View qua interface. Interface được định nghĩa trong lớp Presenter(với cái nó cần truyền dữ liệu). Activity/fragment hoặc các view component khác implement interface này và render dữ liệu.
-  View Model (MVVM) : Nó có các phương thức, lệnh, và các properties khác giúp duy trì state của view, vận dụng model như là kết quả của các hành động ở view, và trigger các sự kiện ở chính bản thân view. View có reference đến View-Model nhưng View-Model không có thông tin gì về View. Có mối quan hệ many-to-one giữa View và View-Model nghĩa là nhiều View có thể được map với một View-Model. View hoàn toàn độc lập.

### 2: MVVM trong Vue js

Một mô hình trung tâm để phát triển các ứng dụng web JS có thể mở rộng và có thể bảo trì là việc áp dụng một số dạng mẫu kiến trúc để phát triển UI. Họ các mẫu phổ biến nhất là MVC / MVP / MVVM.

Khái niệm cơ bản là có một Model đại diện cho  lớp truy cập dữ liệu tách biệt với UI. View thì cung cấp biểu diễn trực quan về trạng thái hiện tại của Model ở bên phía người dùng, trong khi Controller tồn tại để phối hợp hành động của người dùng, Sửa đổi Model để đáp ứng với hành động của người dùng và View để đáp lại các thay đổi trong Model. Mặc dù MVC rất tốt, nhưng MVVM sẽ phù hợp với yêu cầu của vue hơn các kiến trúc khác của MV *. 

MVVM là viết tắt của Model-View-View Model. Sự khác biệt chính là sự tồn tại của VM, một cấu trúc cung cấp liên kết / giao diện giữa Model và View.

Trong MVVM, Model chỉ đơn giản là đại diện cho lớp truy cập dữ liệu của ứng dụng. Nó chứa dữ liệu / thông tin sẽ được show ra cho người dùng để thao tác hoặc tương tác. Mô hình không có hành vi hoặc logic được xác định trên bất kỳ cách nào ngoài việc xác thực dữ liệu. Mô hình cũng không có cách nào để truy cập API phụ trợ hoặc bên thứ 3 để tạo hoặc lưu dữ liệu - nó chỉ đơn giản là một bộ chứa để chứa thông tin / dữ liệu mà VM lấy và sử dụng.

**MVVM Trong Vue.js** 

Vue.js là một thư viện để xây dựng các giao diện web tương tác.

Về mặt kỹ thuật, Vue.js tập trung vào lớp ViewModel của mẫu MVVM. Nó kết nối View và Model thông qua các ràng buộc dữ liệu hai chiều. Các thao tác DOM thực tế và định dạng đầu ra được abstracted thành  Directives và Filters.
 
 Mục tiêu là cung cấp các lợi ích của reactive ràng buộc dữ liệu và các composable có thể kết hợp với một API đơn giản nhất có thể. Nó không phải là một khung famework đầy đủ - nó được thiết kế để trở thành một lớp view đơn giản và linh hoạt. Bạn có thể sử dụng nó một mình để tạo mẫu nhanh, hoặc kết hợp với các thư viện khác để custom front-end stack. Nó cũng phù hợp cho các dịch vụ không phụ trợ như Firebase.

API Vue.js bị ảnh hưởng nặng nề bởi AngularJS, KnockoutJS, Ractive.js và Rivets.js. Mặc dù có những điểm tương đồng, tôi tin rằng Vue.js cung cấp một sự thay thế có giá trị cho các thư viện hiện có bằng cách tìm một sweetspot giữa sự đơn giản và chức năng.

Ngay cả khi bạn đã quen thuộc với một số thuật ngữ này, bạn nên tìm hiểu tổng quan về các khái niệm sau bởi vì khái niệm của bạn về các thuật ngữ này có thể khác với ý nghĩa của chúng trong ngữ cảnh Vue.js.

![](https://images.viblo.asia/ee1d6b6f-61e2-449d-a1b8-3e61451e18d1.png)

**ViewModel :**

Một đối tượng đồng bộ Model và View. Trong Vue.js, mọi phiên bản Vue là một ViewModel. Chúng được khởi tạo với hàm tạo Vue hoặc các lớp con của nó:
```
var vm = new Vue({ /* options */ })
```
Đây là đối tượng chính mà bạn sẽ tương tác  khi sử dụng Vue.js.

**View: **

DOM thực tế được quản lý bởi các phiên bản Vue.
```
vm.$el // The View
```


Vue.js sử dụng khuôn mẫu dựa trên DOM. Mỗi phiên bản Vue được liên kết với một phần tử DOM tương ứng. Khi một instance Vue được tạo, nó sẽ đệ quy tất cả các nút con của phần tử gốc của nó trong khi thiết lập các ràng buộc dữ liệu cần thiết. Sau khi view được biên dịch, nó sẽ reactive với các thay đổi dữ liệu.

Khi sử dụng Vue.js, bạn hiếm khi phải tự sửa vào DOM ngoại trừ trong các chỉ thị tùy chỉnh (sẽ giải thích sau). Xem cập nhật sẽ được tự động kích hoạt khi dữ liệu thay đổi. Các cập nhật view này có độ chi tiết cao với độ chính xác xuống tới textNode. Chúng cũng được bó và thực hiện không đồng bộ để có hiệu suất cao hơn.

**Model:**

Một đối tượng JavaScript đơn giản được sửa đổi một chút.

```
vm.$data // The Model
```

Trong Vue.js, các mô hình chỉ đơn giản là các đối tượng JavaScript đơn giản hoặc các đối tượng dữ liệu. Khi một đối tượng được sử dụng làm dữ liệu bên trong một đối tượng Vue, nó sẽ trở thành reactive. Bạn có thể thao tác các thuộc tính của chúng và instances Vue đang quan sát chúng sẽ được thông báo về các thay đổi. 

Vue lấy proxy tất cả các thuộc tính trên các đối tượng dữ liệu mà chúng quan sát. Vì vậy, một khi một đối tượng {a: 1} đã được observed, cả vm. $ Data.a và vm.a sẽ trả về cùng một giá trị và đặt vm.a = 2 sẽ sửa đổi dữ liệu vm. $.

Các đối tượng dữ liệu được thay đổi tại chỗ, do đó sửa đổi nó bằng tham chiếu có tác dụng tương tự như sửa đổi dữ liệu vm. $. Điều này giúp nhiều trường hợp Vue có thể observe cùng một phần dữ liệu. Trong các ứng dụng lớn hơn, cũng nên coi các trường hợp Vue là view và đưa logic xử lý dữ liệu vào một lớp lưu trữ riêng biệt hơn.

Một lưu ý ở đây là một khi observation đã được bắt đầu, Vue.js sẽ không thể phát hiện các thuộc tính mới được thêm hoặc xóa. Để giải quyết vấn đề đó, các đối tượng quan sát được tăng cường bằng các phương thức $ add, $ set và $ delete.

Dưới đây là tổng quan về reactive updates được triển khai trong Vue.js:

![](https://images.viblo.asia/7a738f8e-6ec8-4cc8-b7bb-11af56119695.png)

### 3: Tổng kết

Cả MVP và MVVM đều tốt hơn MVC trong việc chia nhỏ ứng dụng thành các modular, các component đơn mục đích, nhưng chúng cũng làm ứng dụng của bạn phức tạp hơn. Với một ứng dụng đơn giản với chỉ một hoặc hai screens, MVC sẽ ổn. MVVM với data binding sẽ ít code hơn.

Tài liệu tham khảo:
https://medium.com/@nohkachi/my-vue-on-mvvm-c3ffb4f0678f
https://012.vuejs.org/guide