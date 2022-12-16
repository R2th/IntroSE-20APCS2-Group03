Entity-Component-System (ECS) là một mẫu thiết kế phân phối và thành phần. Nó cho phép tách rời linh hoạt các hành vị theo miền, trong đó khắc phục nhiều nhược điểm của kế thừa hướng đối tượng truyền thống.

## Hạn chế của kế thừa OOP truyền thống

Cách truyền thống để xây dựng một trò chơi là phải có hệ thống phân cấp các đối tượng mô hình hoá thế giới. Ngay cả những đối tượng đơn giản cũng có thể có một khối lượng lớn các phương thức không được sử dụng, hãy cùng xem ví dụ sau:

![](https://images.viblo.asia/9db359d6-5cbe-4d85-9b57-302084a1719f.png)

Chúng ta có thể thấy Animal có 2 lớp con là Bunny, Whale và Killer Whale là lớp con của Whale, với các phương thức khác nhau là hop(), swim(), kill(). Bài toán xuất hiện một đối tượng mới là BunnyKiller gồm 2 phương thức hop() và kill() **vậy nó sẽ kế thừa từ Bunny hay là KillerWhale ???**

Một số ngôn ngữ chỉ cho phép đơn kế thừa, chỉ có thể kế thừa từ 1 class. Có một cách giải quyết khá đơn giản là khởi tạo 2 phương thức hop() và kill() ở lớp cha Animal, vậy là có thể kế thừa BunnyKiller từ Animal. Tuy nhiên, với các lớp con khác của Animal như Bunny thì lại bị dư thừa đi kill() hay ngược lại Whale lại không sử dụng hop().

Đối với việc đa thừa kế, chúng ta có thể kế thừa BunnyKiller từ Bunny và KillerWhale, nhưng BunnyKiller lại sẽ bị dư phương thức swim(), ngoài ra chúng ta còn phải đối mặt với các vấn đề khác như là:

**Mô hình cứng nhắc:**
Chỉ có KillerWhale hay các lớp con của nó như KillerBunny mới có thể sử dụng phương thức kill(), sẽ rất khó khăn để tạo thêm đối tượng mới để có thể kill(). Phương thức này chỉ có sẵn với các class đã được định nghĩa sẳn mới có thể sử dụng nó. Đối với việc mở rộng số lượng các đối tượng trong dự án, chúng ta sẽ gặp rắc rối vì không biết phải các đối tượng mới ở đâu trong cả hệ thống gia phả của trò chơi.

**Kế thừa kim cương:**

![](https://images.viblo.asia/31db0b3a-c218-4db7-b311-485aa05d9fe3.png)

Đây là vấn đề khá phổ biến trong đa kế thừa, class D sẽ là ai? Khi Debug lùi sẽ không biết đi ngã rẽ nào là đúng, vì vậy các ngôn ngữ sau này ưu tiên đơn kế thừa và sử dụng interface để giải quyết vấn đề này.

## Entity Component Systems

Chúng ta sẽ dễ dàng biết được có 3 khái niệm cơ bản ở đây là: entity, component, system.

### Component 

**Các tính chất, đặc điểm của một đối tượng**

Component là các đối tượng dữ liệu tối thiểu, có thể thêm vào các đối tượng để hỗ trợ thực hiện các hành vi. Một component được thêm vào đối tượng nó sẽ thể hiện một tính chất duy nhất, một component tự nó sẽ không có hành vi. Thông thường nó được triển khai như một struct hoặc dictionary.

![](https://images.viblo.asia/6e7ae817-ce57-4e30-92d6-3283d6c17a70.png)

Chúng ta có thể biểu diễn đối tương Bunny với các component thể hiện tích chất của nó như Hopping, Seeing…


### Entity

**Là một nơi để tập hợp, chứa các components**

Entity như là một thể hiện được triển khai dưới dạng liên kết duy nhất của các components. Entity sẽ không có dự liệu hay hành vị thực tế nào, nó chỉ là nơi liên kết các tính chất của component để hỗ trợ một hành vị nào đó.

Một số triển khai của ECS cho phép bạn sửa đổi các component của mỗi entity trong lúc runtime. Ví dú bạn có thể thêm vào một component Poisoned (chất độc) vào entity để thể hiện này sẽ mất máu theo thời gian.

Tại thời điểm này chúng ta đã biết được rằng, các Entity là một tập hơn các components và component chỉ là các thành phần chứa dữ liệu, vậy System mang trong nó thế lực gì đây ???

### System

**Mang các entity và component vào thế giới**

System liệt kê các components và cập nhật trạng thái của chúng theo quy tắc nội bộ hoặc tác động từ các sự kiện bên ngoài để thể hiện một hành vivi hay thay đổi từ trạng thái này sang trạng thái khác.

![](https://images.viblo.asia/a53a4ca4-7b82-4cd9-ac8c-6fe4e87c21a8.png)

Cái gì đây ??? Bunny của chúng ta giờ đã có thêm 2 system

**Gravity System:** thay đổi các trạng thái của Placeable component, thể hiện hành vi đang rơi xuống của bunny.
**Time System:** cập nhật thay đổi của Living component, thể hiện sự sống của bunny

Chúng ta đang có các System dành riêng cho các hành vi cụ thể. Và hãy nhớ rằng System hoạt động trên các Components chứ không phải các Entity.


## Ưu điểm của ECS:

* Đảm bảo nguyên tắc thực hiện một nhiệm vụ duy nhất.
* Khả năng kết hợp hay định nghĩa đối tượng trong lúc runtime.
* Dễ dàng testing, với mỗi component hay system.
* Tính song song, có thể xây dựng nhiều System làm việc cùng một lúc.
* Phân tách dữ liệu và hành vi, có thể mở rộng các hành vi khác nhau trên cùng một dữ liệu.


**Nguồn:** https://yos.io/2016/09/17/entity-component-systems/