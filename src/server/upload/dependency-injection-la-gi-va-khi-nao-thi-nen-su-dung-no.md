Bài viết đc dịch từ: https://medium.freecodecamp.org/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f
### Giới thiệu
Theo như định nghĩa của Wikipedia
> Dependency injection là một kĩ thuật trong đó một object (hoặc một static method) cung cấp các dependencies của một object khác. Một dependency là một object mà có thể sử dụng (một service).
Tuy nhiên định nghĩa trên vẫn khá là khó hiểu, vậy nên hãy cùng tìm hiểu để hiểu rõ hơn về nó nào.

Dependency hay dependent nghĩa là phụ thuộc vào hỗ trợ của một cái gì, việc gì đó. Ví dụ như nếu chúng ta phụ thuộc quá nhiều vào smartphone, thì có thể hiểu là chúng ta đã dependent lên smartphone.

Trc' khi nói về dependency injection, hãy hiểu xem  dependency trong lập trình nghĩa là gì trc'.

Khi mà class A sử dụng một số chức năng của class class B, thì có thể nói là class A có quan hệ phụ thuộc với class B.
![](https://images.viblo.asia/dd6d54c4-7fd4-48a0-a2ba-ec7ee0651949.jpeg)

Trong java, trc' khi ta có thể sử dụng method của class khác, ta phải khởi tạo một object của class đấy (hay A cần phải tạo 1 thực thể của B).

Vậy ta có thể hiểu, việc chuyển giao nhiệm vụ khởi tạo object đó cho một ai khác và trực tiếp sử dụng các dependency đó được gọi là dependency injection.
![](https://images.viblo.asia/1057e16d-643e-4512-a6cc-2b6ce9cb9898.png)

### Tại sao chúng ta cần sử dụng dependency injection?

Ví dụ chúng ta có một class Car, trong đó có chứa một vài object khác như Wheel, Battery...

```java
class Car{
  private Wheels wheel = new MRFWheels();
  private Battery battery = new ExcideBattery();
  ...
  ...
}
```

Ở đây, class Car chịu trách nhiệm khởi tạo tất cả các dependency object. Nhưng chuyện gì sẽ xảy ra nếu chúng ta muốn bỏ MRFWheel và thay thế bằng YokohamaWheel.

Chúng ta sẽ cần tạo một class Car mới với YokohamaWheel, tuy nhiên khi sử dụng dependency injection, chúng ta có thể đổi Wheel ở runtime vì dependency có thể đc đẩy vào (inject) ở runtime thay vì complile time.

Bạn có thể hiểu là dependency injection là một người trung gian chịu trách nhiệm tạo ra các loại wheel khác nhau, rồi cung cấp chúng cho class Car. Việc đó làm cho class Car ko phải phụ thuộc vào Wheel cụ thể nào hay Battery cụ thể nào nữa.

### Về cơ bản có 3 loại dependency injection:
1. **Constructor injection**: các dependency đc cung cấp thông qua constructor của class.
2. **Setter injection**: client tạo ra một setter method để các class khác có thể sử dụng chúng để cấp dependency.
3. **Interface injection**: dependency sẽ cung cấp một hàm injector để inject nó vào bất kì client nào đc truyền vào. Các client phải implement một interface mà có một setter method dành cho việc nhận dependency.

```java
class Car{
  private Wheels wheel;
  private Battery battery;
  
  /*Ở đâu đó trong project, ta khởi tạo những objects mà đc yêu cầu bởi class này
    Có 2 cách để implement dependency injection
    1. Dựa vào constructor
    2. Dựa vào Setter method
  */
  
  // Dựa vào constructor
  Car(Wheel wh, Battery bt) {
    this.wh = wh;
    this.bt = bt;
  }
  
  // Dựa vào Setter method
  void setWheel(Batter bt){
    this.bt = bt;
  }
  ...  
  ...
}
```

Vậy trách nhiệm của dependency injection là: 
1. Tạo ra các object.
2. Biết được class nào cần những object đấy.
3. Cung cấp cho những class đó những object chúng cần.

Bằng cách này, nếu trong tương lai object đó có sự thay đổi thì dependency injection có nhiệm vụ cấp lại những object cần thiết cho class.

### Lợi ích của dependency injection.
1. Giúp viết Unit test dễ dàng hơn.
2. Giảm thiểu đc boilerplate code vì việc khởi tạo dependency đc làm bởi một component khác.
3. Mở dụng dự án dễ dàng hơn.
4. Giúp ích trong việc liên kết lỏng (loose coupling) giữa các thành phần trong dự án.

### Bất lợi khi dùng dependency injection.
1. Nó khá là phức tạp để học, và nếu dùng quá đà thì có thể dẫn tới một số vấn đề khác.
2. Rất nhiều các lỗi ở compile time có thể bị đẩy sang runtime.
3. Có thể làm ảnh hưởng tới chức năng auto-complete hay Find references của một số IDE

Hy vọng bài viết giúp bạn hiểu thêm đc về dependency injection!