![](https://images.viblo.asia/ac439345-235b-48d7-bd09-7d7d8c204bf4.jpg)
Bạn đang học về Laravel Framwork?

Bạn đã biết sử dụng cơ bản về Laravel Framework?

Bạn đã từng đọc lướt qua về khái niệm Service Container trong Documentation của Laravel. Vậy bạn đã thực sự hiểu nó?

Học cách xây dựng một ứng dụng Laravel không chỉ là cách học các lớp và các thành phần khác nhau trong Framwork,không phải là việc nhớ tất cả các Artisan Commands hoặc nhớ tất cả các Helper Function.Mà là tìm hiểu triết lý của Laravel, và các cú pháp tuyệt vời của nó.Một phần quan trọng trong triết lý của Laravel là Service Container. Là 1 Laravel developer việc hiểu về Service Container đúng là rất cần thiết trong việc làm chủ công cụ của bạn, vì nó là cốt lõi của bất kỳ ứng dụng Laravel nào.

# I - Service Container có từ khi nào?
Từ khóa Service Container bắt đầu xuất hiện trong Laravel Documentation từ phiên bản Laravel 5. Vậy thì từ phiên bản 4.2 trở về trước Service Container đã tồn tại chưa? Thực chất nó đã tồn tại nhưng mang 1 cái tên khác là IoC Container (Inversion of Control Container). Vậy trước tiên chúng ta thử tìm hiểu qua về IoC Container, Dependency Injection và Dependency Inversion. 

* **Dependency Inversion**: Đây là một nguyên lý để thiết kế và viết code.
* **IoC Container**: Là một nguyên lý thiết kế trong công nghệ phần mềm với các đoạn code khi đưa vào một framework sẽ nhận được luồng điều khiển từ framework hay nói một cách khác là được framework điều khiển. Kiến trúc phần mềm với thiết kế này sẽ đảo ngược quyền điều khiển so với lập trình hướng thủ tục truyền thống. Trong lập trình truyền thống các đoạn code thêm vào sẽ gọi các thư viện nhưng với IoC, framework sẽ gọi các mã thêm vào. Đây là một design pattern được tạo ra để code có thể tuân thủ nguyên lý Dependency Inversion. Có nhiều cách hiện thực pattern này: ServiceLocator, Event, Delegate, … Dependency Injection là một trong các cách đó.
* **Dependency Injection**: Đây là một cách để hiện thực Inversion of Control Pattern (Có thể coi nó là một design pattern riêng cũng được). Các module phụ thuộc (dependency) sẽ được inject vào module cấp cao. Đưa các dependency vào class thông qua constructor hoặc setter, không khởi tạo trực tiếp bên trong class.

Đã có rất nhiều tài liệu đã trình bày chi tiết về IoC container, nên bài viết này mình chỉ nói qua về 3 khái niệm IoC Container, Dependency Injection và Dependency Inversion. Để hiểu thêm chi tiết vui lòng xem [Tại đây](https://laravel.com/docs/4.2/ioc)

# II - Service Container là gì?
Về cơ bản thì Service Container là 1 lớp PHP bình thường, Nhưng hãy nghĩ về nó như 1 cái nhà kho để đồ, kho này là nới đặt, lưu trữ, liên kết mọi thứ chúng ta cần để chạy ứng dụng Laravel một cách trơn chu, từ giao diện triển khai, đến các đường dẫn thư mục, bạn có thể đặt bất cứ điều gì bạn muốn trong đó. Hay có thể nói 1 cách khác, nó là nơi để quản lý các dependency và thực hiện dependency injection. Và để sử dụng Service Container thì nó đi liên với 2 khái niệm Binding và Resolve.

* Binding: Là thao tác đăng ký một class hay interface với Container.
* Resolve: Là thao tác lấy ra một instance từ trong Container.


## 1.Binding & Resolve
* Hầu hết các việc xử lý service container binding sẽ được thực hiện trong sevice provider.
* Không cần phải bind class vào container nếu như nó không phụ thuộc vào interface nào.
* Trong service provider luôn luôn có quyền truy cập vào container thông qua thuộc tính $this -> app ,và đăng kí liên kết sử dụng phương thức bind.

Chúng ta sẽ đi vào 1 ví dụ cụ thể. Chúng ta có 1 class có tên FooService cung cấp một số dịch vụ cụ thể.

![](https://images.viblo.asia/3da4d587-fd4d-4f20-84c4-645e065b492c.png)

Nếu chúng ta muốn sử dụng phương thức doSomething của class, theo cách thông thường chúng ta phải làm như sau:

![](https://images.viblo.asia/bf4bf906-4ec6-4402-99dc-6298d2299a1e.png)

### **1.1 Vậy làm thế nào để Bind?**

Nó chỉ đơn giản là 1 dòng code như sau:

![](https://images.viblo.asia/7636f8e0-6a11-43b0-8779-5439fb6f1645.png)

Dòng code trên thể hiện việc đăng ký class FooService vào container với cái tên FooService. Tuy nhiên có những cách khác để bind 1 class vào container tùy vào cách sử dụng của từng trường hợp:
* Binding A Singleton:Instance sẽ chỉ được resolve một lần, những lần gọi tiếp theo sẽ không tạo ra instance mới mà chỉ trả về instance đã được resolve từ trước.

![](https://images.viblo.asia/fef9b06e-d500-48d3-a181-c128e8255d32.png)

* Binding Instances: Chúng ta có một instance đang tồn tại và chúng ta bind nó vào Service Container. Mỗi lần lấy ra chúng ta sẽ nhận lại được đúng instance đó. Điều này gần giống với Binding A Singleton.

![](https://images.viblo.asia/a954ce0a-0ac0-45fd-acf1-6217a47cac57.png)

Và hãy nhớ rằng việc binding phải được thực hiện trong hàm register của service provider.


### **1.2 Làm thế nào để Resolve?**

Sau khi Class được đăng kí vào vùng chứa. Chúng ta có thể truy xuất nó từ bất kì vị trí nào trong ứng dụng.

![](https://images.viblo.asia/1b7990cd-a61f-4fc0-9502-fa2d6d0ea877.png)

Dòng code trên thể hiện việc lấy lại các instance của các class đã bind với container. Chúng ta sẽ thấy dùng Service Container làm cho code clear hơn, không phải khởi tạo các hàm, mà chúng ta có thể resolve từ bất cứ vị trí nào trong ứng dụng.

## 2.Interface binding

Chúng ta sẽ đi vào ví dụ cụ thể để có thể hiểu hơn nhé. Ta sẽ tạo một 1 interface PlayerRepository trong thư mục App\Repositories\Interfaces.

![](https://images.viblo.asia/51e0cdb5-9c17-4501-9778-e748ac9cc090.png)

Ta có 1 class DbPlayerRepository implement Interface PlayerRepository.

![](https://images.viblo.asia/c9ec22df-5a2a-405f-88ba-89cbd2e753c2.png)

Service Container hỗ trợ một cách tuyệt với với việc Bind 1 interface với implementation của nó bằng cách:

![](https://images.viblo.asia/e292bc64-036e-4409-ace1-33c934c14202.png)

Ta có PlayerController muốn sử dụng các function trong class DbPlayerRepository thì ta chỉ việc type-hint interface PlayerRepository trong hàm construct, Service Container sẽ tự động inject class DbPlayerRepository.

![](https://images.viblo.asia/1425dcec-e79a-40cf-8e96-4481f60514ea.png)

Chắc các bạn sẽ thắc mắc, tại sao chúng ta phải type-hint interface PlayerRepository mà không gọi trực tiếp class DbPlayerRepository?
Bởi vì 1 interface thì có thể có nhiều impelentation, khi ta type-hint interface thì chúng ta có thể linh hoạt thay đổi được các implementation mà mình mong muốn.
Vậy để xử lý việc này thì đã có Contextual Binding hoặc Tagging

## 3.Contextual Binding
Khi bạn có interface ActionReponsitory mà có 2 implementation cùng lúc là DbPlayerReponsitory và DbTeamReponsitory. Khi PlayerController gọi đến interface ActionReponsitory thì ta muốn inject implementation DbPlayerReponsitory nhưng khi TeamController gọi đến interface ActionReponsitory thì ta lại muốn inject implementation DbTeamReponsitory. Ta xử lý như sau:

![](https://images.viblo.asia/21d5917b-0afd-4e1e-8f68-a28f5431b789.png)

## 4.Tagging
Ngoài contextual binding chúng ta có thể sử dụng tag đê gộp tất cả những implementation của nó vào làm 1, để có thể dễ dàng resolve hơn.

![](https://images.viblo.asia/5eb9af53-2c3e-4bed-b9d8-b9990d2c8c86.png)

## 5.Resolving dependencies
Khi chúng ta có 1 class Action có dependency là class Action1, class Action1 có dependency là class Action2, class Action2 có dependency là Action3... Các class cứ phụ thuộc chồng chất lên nhau. Vậy để khởi tạo class Action chúng ta phải chuẩn bị tất cả các class dependency của nó. Đây cũng là điểm yếu rất lớn của dependency injection.Lúc này Service Container sẽ vỗ ngực và nói mọi thứ cứ để anh l, chúng ta sẽ không phải lo gì hết vì Service Container sẽ tự động inject tất cả những class mà bạn cần.

![](https://images.viblo.asia/3ae84028-fd2e-48ab-8eeb-25d39ef40643.png)

# III - Kết Bài
Có rất nhiều điều thật tuyệt vời để thảo luận về Laravel, mình hy vọng rằng qua bài chia sẻ nhỏ này các bạn có thể hiểu thêm phần nào về Service Container.
Hẹn gặp mọi người trong các bài viết sắp tới. Hy vọng nó có ích với mọi người. 👍👍👍👍👍

👏👏👏👏👏👏👏👏👏👏👏***THANK YOU FOR READDING***👏👏👏👏👏👏👏👏👏👏👏

# VI - Tài Liệu Tham Khảo
[https://laravel.com/docs/4.2/ioc](https://laravel.com/docs/4.2/ioc)

[https://laravel.com/docs/5.6](https://laravel.com/docs/5.6)

[https://allaravel.com/tutorials/inversion-of-control-nguyen-ly-cua-cac-nguyen-ly/](https://allaravel.com/tutorials/inversion-of-control-nguyen-ly-cua-cac-nguyen-ly/)