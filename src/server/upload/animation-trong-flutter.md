# Animation là gì?

Trong Flutter, Animation là một lớp trừu tượng, chỉ biết giá trị hiện tại và trạng thái của nó. Một đối tượng Animation trong Flutter là tạo ra tuần tự các số được xen vào giữa hai giá trị trong một khoảng thời gian nhất định. Đầu ra của một đối tượng Animation có thể là tuyến tính, đường cong, hàm theo các bước hoặc bất kỳ ánh xạ nào khác mà bạn có thể nghĩ ra. Tuỳ thuộc vào cách đối tượng Animation được điều khiển, nó có thể chạy theo chiều ngược hoặc thậm chí chuyển hướng ở giữa.
## 1. Tween animation 

Đây là hình thức rút gọn của in-betwenning. trong animation tween, bắt buộc phải xác định điểm đầu và điểm cuối của animation. Nó có nghĩa là animation bắ đầu với giá trị bắt đầu sau đó đi qua các giá trị trung gian và cuói cùng đặt đến giá trị kết thúc. Nó cũng cung cấp dòng thời gian và đường cong, xác đinh thời gian và tốc độ của quá trình chuyển đổi. Framework cung cấp tính toán về cách chuyển đổi từ điểm đầu tới điểm cuối.

`TweenColor{begin: color.red, end: color.blue,`

Để sử dụng Tween, ta cần gọi hàm animate() và đặt vào một animationController, 
AnimationController là một đối tượng Animation đặc biệt tạo ra một giá trị mới bắt cứ khi nào phần cứng sẵn sàng cho một khung mới, theo mặc định, một giá trị AnimationController tuyến tính tạo ra các số từ 0.0 tới 1.0 trong một khoảng thời gian nhất định.

`controller = AnimationController(duration: const Duration(second: 2), vsync: this);`

AnimationController hỗ trợ phương thức để điều khiển animation.

* Điều khiển animation forward hoặc reverse, hoặc stop
* Đặt animation thành một value cụ thể.
* Định nghĩa các giá trị upperBound and lowerBound trong một animation.
* Tạo ra một fling animation với hiệu ứng sử dụng một mô phỏng vật lý.

Khi tạo AnimationController, bạn truyền cho nó một đối số vsync, ngăn animations tiêu tốn tài nguyên không cần thiết bên ngoài màn hình. Bạn có thể sử dụng đối tượng trạng thái của mình làm vsync bằng cách thêm SingleTickerProviderStateMixin vào định nghĩa lớp.

## 2. Animation dựa trên vật lý

Đây là một loại animation cho phép bạn tạo ra một tương tác ứng dụng giống như thực tế và tương tác . Nó mô phỏng animation / chuyển động trong thế giới thực, chẳng hạn như bạn muốn tạo animation cho một widget như spring, falling, or swinging with gravity. Do đó, nó là một animation động để đáp ứng với đầu vào / chuyển động của người dùng. Ví dụ đơn giản nhất là thời gian bay, và quãng đường di chuyển được tính theo định luật vật lý.

## 3.  Hero Animation

Hero Animation là một widget giúp chúng ta tạo các hiệu ứng khi chuyển màn. Hero Animation sử dụng một biểu tượng hiện được gọi là “Hero” và khi quá trình chuyển đổi trang được kích hoạt, thường bằng cách nhấp vào biểu tượng, trên màn hình sẽ xuất hiện hoạt ảnh “bay” đến trang tiếp theo. Khi người dùng điều hướng trở lại trang trước đó, hoạt ảnh sẽ đi theo hướng khác và biểu tượng quay trở lại vị trí ban đầu của nó.
Hero Animations là một trong những hiệu ứng dễ làm nhất trong Flutter và không yêu cầu thiết lập nhiều. Nhìn vào ví dụ dưới đây, chúng ta có thể thấy rằng cùng một biểu tượng tồn tại trên cả hai trang. Tất cả những gì chúng ta cần là nói cho Flutter rằng cả hai được liên kết với nhau. Chúng tôi thực hiện việc này bằng cách bao bọc một widget như một biểu tượng trong Hero widget.
```
Hero(
  tag: "DemoTag",
  child: Icon(
    Icons.add,
    size: 70.0,
  ),
),
```

## 4. Animation notifications

Một đối tượng Animation có thể có Listeners và StatusListener, được định nghĩa bằng addListener () và addStatusListener (). Một Listener được gọi bất cứ khi nào giá trị của animation thay đổi. Hành vi phổ biến nhất của Listener là gọi setState () khi ứng dụng rebuild. StatusListener được gọi khi một animation bắt đầu, kết thúc, di chuyển về phía trước hoặc di chuyển ngược lại, như được định nghĩa bởi AnimationStatus.

Chúng ta sử dụng addListener để lắng nghe thay đổi của một animation trong StatefulWidget

```
AnimationController controller = AnimationController(
        duration: const Duration(milliseconds: 2000), vsync: this);
  Animation<double> animation = Tween(begin: 0.0, end: 300.0).animate(controller)
      ..addListener(() {
        setState(() {
          // the state that has changed here is the animation object’s value
        });
      });
controller.forward();
```

Còn với AnimatedWidget, chúng ta cần phải sử dụng phương thức addStatusListener để lắng nghe thay đổi của một animation

```
AnimationController controller = AnimationController(
        duration: const Duration(milliseconds: 2000), vsync: this);
   Animation<double> animation = Tween(begin: 0.0, end: 300.0).animate(controller);
    animation.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        controller.reverse();
      } else if (status == AnimationStatus.dismissed) {
        controller.forward();
      }
    });
controller.forward();
```

tài liệu tham khảo https://flutter.dev/docs/development/ui/animations