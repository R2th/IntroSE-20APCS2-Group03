Chào mọi người, trong bài viết trước mình đã giới thiệu 2/5 tính chất của SOLID, ở bài viết này mình sẽ giới thiệu 3 tính chất còn lại. Mọi người hãy chuẩn bị 1 tách cafe, 1 tâm hồn đẹp để đọc và thấm nhuần bài viết này nhé :D

# I. Liskov Substitution Principle
Tính chất này chỉ ra rằng các lớp con nên được thay thế cho các lớp cơ sở của chúng. Điều này có nghĩa là, cho class B là lớp con của class A, chúng ta có thể chuyển một object của class B cho bất kỳ method nào cần object của class A và method sẽ không đưa ra bất kỳ đầu ra nào trong trường hợp đó. Bởi vì khi chúng ta sử dụng kế thừa, chúng ta giả định rằng lớp con kế thừa mọi thứ mà lớp cha có, lớp con mở rộng hành vi nhưng không bao giờ thu hẹp nó. Vì vậy, khi một lớp không tuân theo nguyên tắc này sẽ dẫn đến một số lỗi khó phát hiện

Nguyên tắc của Liskov rất dễ hiểu nhưng rất khó bị phát hiện trong code. Vì vậy, hãy xem một ví dụ:

```Java
class Rectangle {
	protected int width, height;

	public Rectangle() {
	}

	public Rectangle(int width, int height) {
		this.width = width;
		this.height = height;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getArea() {
		return width * height;
	}
}
```

Chúng ta có 1 class Rectangle đơn giản, bên trong class có hàm getArea() trả về diện tích của hình chữ nhật. Tiếp theo, chúng ta sẽ tạo 1 class cho hình vuông và đặt tên là Square. Như các bạn đã biết, hình vuông là một loại hình chữ nhật đặc biệt có chiều dài và chiều rộng bằng nhau.

```Java
class Square extends Rectangle {
	public Square() {}

	public Square(int size) {
		width = height = size;
	}

	@Override
	public void setWidth(int width) {
		super.setWidth(width);
		super.setHeight(width);
	}

	@Override
	public void setHeight(int height) {
		super.setHeight(height);
		super.setWidth(height);
	}
}
```

Class square kế thừa class Rectangle. Chúng ta set giá trị cho height và width bằng nhau trong constructor, nhưng chúng ta không muốn bất cứ ai sử dụng class này trong code của họ sẽ thay đổi giá trị height và width theo cái cách mà ảnh hưởng đến tính chất của hình vuông. Do đó, mình đã ghi đè các hàm thay đổi giá trị width - height để đặt lại cả hai thuộc tính bất cứ khi nào một trong số chúng bị thay đổi. Nhưng làm như vậy chúng ta vừa vi phạm nguyên tắc Liskov substitution principle. 

Hãy tạo class main và kiểm tra hàm getArea()

```Java
class Test {

   static void getAreaTest(Rectangle r) {
      int width = r.getWidth();
      r.setHeight(10);
      System.out.println("Expected area of " + (width * 10) + ", got " + r.getArea());
   }

   public static void main(String[] args) {
      Rectangle rc = new Rectangle(2, 3);
      getAreaTest(rc);

      Rectangle sq = new Square();
      sq.setWidth(5);
      getAreaTest(sq);
   }
}
```

Đội tester đưa ra hàm thử nghiệm getAreaTest và cho bạn biết rằng hàm getArea của bạn không vượt qua được test case khi object là Square.

Trong thử nghiệm đầu tiên, chúng ta tạo một hình chữ nhật với chiều rộng là 2 và chiều dài là 3 và gọi getAreaTest. Kết quả đầu ra là 20 như mong đợi, nhưng mọi thứ đã không còn đúng khi chúng ta truyền vào tham số của hàm một hình vuông. Điều này là do gọi hàm setHeight trong hàm getAreaTest cũng đang thiết lập độ rộng và dẫn đến kết quả đầu ra không như mong muốn.

# II. Interface Segregation Principle
Interface Segregation Principle nói về việc tách các interfaces. Nguyên tắc này chỉ ra rằng nhiều interfaces dành riêng cho mỗi client tốt hơn một interface có mục đích chung. Client không nên bị buộc phải thực hiện một chức năng mà họ không cần. 

Đây là một nguyên tắc đơn giản, dễ hiểu và dễ áp dụng, hãy cùng mình xem ví dụ dưới đây.

```Java
public interface ParkingLot {

	void parkCar();	// Decrease empty spot count by 1
	void unparkCar(); // Increase empty spots by 1
	void getCapacity();	// Returns car capacity
	double calculateFee(Car car); // Returns the price based on number of hours
	void doPayment(Car car);
}

class Car {

}
```

Đoạn code trên để mô hình hóa một cách đơn giản một bãi đậu xe. Đây là loại bãi đậu xe mà bạn sẽ phải trả phí theo giờ. Bây giờ hãy xem xét case chúng ta muốn triển khai một bãi đậu xe miễn phí.

```Java
public class FreeParking implements ParkingLot {

	@Override
	public void parkCar() {
		
	}

	@Override
	public void unparkCar() {

	}

	@Override
	public void getCapacity() {

	}

	@Override
	public double calculateFee(Car car) {
		return 0;
	}

	@Override
	public void doPayment(Car car) {
		throw new Exception("Parking lot is free");
	}
}
```

Interface ParkingLot của chúng ta bao gồm 2 thứ: Logic liên quan đến bãi đậu xe (đậu xe, bỏ đậu xe, sức chứa) và logic liên quan đến thanh toán. Nhưng nó quá cụ thể, class FreeParking đã buộc phải triển khai các phương thức liên quan đến thanh toán mặc dù không liên quan. Giờ thì chúng ta thực hiện tách interface.

![](https://images.viblo.asia/737f8f67-f845-442f-bc37-879d6ac35b04.png)

Mình vừa thực hiện tách interface ParkingLot. Với mô hình mới này, chúng ta thậm chí có thể tiến xa hơn và chia PaidParkingLot để hỗ trợ các loại hình thanh toán khác nhau, cực kỳ linh hoạt, dễ dàng kế thừa và các clients không cần phải implement bất cứ logic không liên quan nào.

# III. Dependency Inversion Principle
Ý tưởng chung của nguyên tắc này rất đơn giản, điều quan trọng nhất là: Các mô-đun cấp cao cung cấp logic phức tạp nên dễ dàng sử dụng lại và không bị ảnh hưởng bởi những thay đổi trong các mô-đun cấp thấp, vốn cung cấp các tính năng tiện ích.

# IV. Tổng kết
Kết thúc 2 phần bài viết SOLID trong lập trình hướng đối tượng, chúng ta đã nắm được lịch sử ra đời của các nguyên tắc SOLID, nắm được tư tưởng và cách sử dụng của mỗi tính chất. Mình muốn gửi lời cảm ơn mọi người đã dành thời gian để đọc toàn bộ 2 phần bài viết và mình hy vọng rằng các khái niệm trên là rõ ràng, dễ hiểu.

Hãy ghi nhớ những nguyên tắc này trong khi thiết kế, viết và cấu trúc lại code của bạn để code của bạn sạch hơn, dễ dàng mở rộng và có thể test được.