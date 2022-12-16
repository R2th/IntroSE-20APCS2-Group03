## Giới thiệu
Trong thực tế, có nhiều bài toán liên quan đến các trạng thái, ví dụ như trạng thái đơn hàng, trạng thái về playing music, trạng thái của content qua các quy trình xử lý ... Trong những trường hợp như thế này, không thể không nhắc tới State Design Pattern, mẫu thiết kế này sẽ giúp chúng ta thiết kế cấu trúc, xử lý các logic liên quan đến trạng thái một cách dễ dàng và chuyên nghiệp hơn. Hôm nay chúng ta sẽ cùng tìm hiểu về mẫu thiết kế State (State Design Pattern), cụ thể cách hoạt động, cách implement mẫu thiết kế này trong Java.<br>
Đầu tiên, chúng ta sẽ đưa ra một cái nhìn tổng quan về mục đích của nó và giải thích vấn đề mà nó cố gắng giải quyết.  Sau đó, chúng ta sẽ cùng tìm kiểu về biểu đồ UML của nó và triển khai ví dụ thực tế.
## Tổng quan về State Design Pattern
Ý tưởng chính của mẫu thiết kế State là nó cho phép các đối tượng có thể thay đổi hành vi, trạng thái của nó mà không thay đổi class của nó. Ngoài ra, bằng cách thực hiện nó, code sẽ gọn gàng và đẹp hơn mà không cần nhiều câu lệnh if/else.<br>
Hãy tưởng tượng chúng ta có một gói hàng (`package`) được gửi đến bưu điện, chính gói đó có thể được đặt hàng (`order`), sau đó được gửi đến bưu điện và cuối cùng được khách hàng nhận.  Bây giờ, tùy thuộc vào trạng thái thực tế, chúng ta muốn in trạng thái giao hàng của nó.<br>
Cách tiếp cận đơn giản nhất là thêm một số flag boolean và áp dụng các câu lệnh if / other đơn giản trong mỗi phương thức của chúng ta trong lớp.  Điều đó sẽ không làm phức tạp nó nhiều trong một kịch bản đơn giản.  Tuy nhiên, nó có thể làm phức tạp và gây khó hiểu trong code của chúng ta khi chúng ta sẽ xử lý nhiều trạng thái hơn, điều này sẽ dẫn đến nhiều câu lệnh if / other hơn.<br>
Ngoài ra, tất cả logic cho mỗi trạng thái sẽ được trải đều trên tất cả các phương thức.  Bây giờ, đây là nơi mà mẫu thiết kế State có thể được xem xét sử dụng.  Nhờ mẫu thiết kế State, chúng ta có thể gói gọn logic trong các lớp chuyên dụng, áp dụng Nguyên tắc [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) và Nguyên tắc Mở / Đóng ([Open–closed principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)), code sẽ sạch hơn và dễ bảo trì hơn.<br>
## Biểu đồ UML
Hãy cùng nhìn qua biểu đồ UML cho mẫu thiết kế này:<br>
![](https://images.viblo.asia/0e65c510-5c48-42ea-98fe-de3d36db6cdc.png)<br>
Trong sơ đồ UML, chúng ta thấy rằng lớp `Context` có Trạng thái (`State`) liên kết sẽ thay đổi trong khi thực hiện chương trình.<br>
`Context` của chúng ta sẽ ủy nhiệm hành vi thi hành trạng thái. Nói cách khác, tất cả các hành vi sẽ được xử lý bằng cách thực hiện cụ thể (`handle` method) của trạng thái .<br>
Chúng ta thấy rằng logic được tách ra và việc thêm các trạng thái mới là đơn giản - cũng có thể thêm vào việc thực hiện Trạng thái khác nếu cần.<br>
## Implementation
Bây giờ hãy cùng tìm hiểu cách thực thi mẫu thiết kế này, như đã nói ở trên đối tượng của chúng ta là gói hàng (`package`), có các trạng thái như sau: đặt hàng (`order`), giao hàng (`delivered`) và nhận hàng (`received`). Vì thế chúng ta sẽ có 3 trạng thái cho lớp context (ở đây là `package`) <br>
Đầu tiên, định nghĩa context, trong ví dụ cụ thể này nó chính là gói hàng (`Package` class):
```
public class Package {

    private PackageState state = new OrderedState();
 
    // getter, setter
 
    public void previousState() {
        state.prev(this);
    }
    public void nextState() {
        state.next(this);
    }
    public void printStatus() {
        state.printStatus();
    }
}
```
Giái thích một chút về lớp này, `Package` class của chúng ta sẽ chứa một đối tượng state (nó chính là `PackageState`), `PackageState` sẽ là 1 interface đại diện cho 3 trạng thái đã nói ở trên: `OrderedState`, `DeliveredState` và  `ReceivedState`. Lớp `Package` thực thi 3 phương thức liên quan đến trạng thái: `previousState` (chuyển về trạng thái trước đó), `nextState` (chuyển sang trạng thái tiếp theo) và `printStatus` (thông báo trạng thái hiện tại của gói hàng), bắt đầu sẽ từ trạng thái `OrderedState`.<br>
Tiếp theo, chúng ta sẽ có `PackageState` interface có ba phương thức như sau:<br>
```
public interface PackageState {
 
    void next(Package pkg);
    void prev(Package pkg);
    void printStatus();
}
```
Interface này sẽ được implement bới 3 trạng thái tương ứng với 3 class:  `OrderedState`, `DeliveredState` và  `ReceivedState`:<br>
`OrderedState` class:
```
public class OrderedState implements PackageState {
 
    @Override
    public void next(Package pkg) {
        pkg.setState(new DeliveredState());
    }
 
    @Override
    public void prev(Package pkg) {
        System.out.println("The package is in its root state.");
    }
 
    @Override
    public void printStatus() {
        System.out.println("Package ordered, not delivered to the office yet.");
    }
}
```
`OrderedState` là trạng thái đầu tiên của gói hàng, nó không thể chuyển về trạng thái trước đó, nhưng có thể chuyển sang trạng thái tiếp theo đó là `DeliveredState`<br>
`DeliveredState` class:
```
public class DeliveredState implements PackageState {
 
    @Override
    public void next(Package pkg) {
        pkg.setState(new ReceivedState());
    }
 
    @Override
    public void prev(Package pkg) {
        pkg.setState(new OrderedState());
    }
 
    @Override
    public void printStatus() {
        System.out.println("Package delivered to post office, not received yet.");
    }
}
```
`DeliveredState` là trạng thái thứ 2 của gói hàng trong ví dụ trên, nó có thể chuyển về trạng thái trước đó `OrderedState`, và cũng có thể chuyển sang trạng thái tiếp theo `ReceivedState`.<br>
`ReceivedState` class:
```
public class ReceivedState implements PackageState {
 
    @Override
    public void next(Package pkg) {
        System.out.println("This package is already received by a client.");
    }
 
    @Override
    public void prev(Package pkg) {
        pkg.setState(new DeliveredState());
    }
}
```
`ReceivedState` là trạng thái cuối cùng của gói hàng, nó chỉ có thể chuyển về trạng thái trước đó `DeliveredState`.<br>
## Testing
Chúng ta hãy xem cách thực hiện.  Trước tiên, hãy xác minh xem các chuyển tiếp thiết lập có hoạt động như mong đợi không bằng một vài đoạn test nhỏ:
```
@Test
public void givenNewPackage_whenPackageReceived_thenStateReceived() {
    Package pkg = new Package();
 
    assertThat(pkg.getState(), instanceOf(OrderedState.class));
    pkg.nextState();
 
    assertThat(pkg.getState(), instanceOf(DeliveredState.class));
    pkg.nextState();
 
    assertThat(pkg.getState(), instanceOf(ReceivedState.class));
}
```
Tiếp theo, kiểm tra nhanh xem gói hàng của chúng ta có thể quay lại trạng thái không:
```
@Test
public void givenDeliveredPackage_whenPrevState_thenStateOrdered() {
    Package pkg = new Package();
    pkg.setState(new DeliveredState());
    pkg.previousState();
 
    assertThat(pkg.getState(), instanceOf(OrderedState.class));
}
```
Sau đó, hãy xác minh thay đổi trạng thái và xem cách triển khai phương thức `printStatus()` thay đổi cách thực hiện của nó khi chạy:
```
public class StateDemo {
 
    public static void main(String[] args) {
 
        Package pkg = new Package();
        pkg.printStatus();
 
        pkg.nextState();
        pkg.printStatus();
 
        pkg.nextState();
        pkg.printStatus();
 
        pkg.nextState();
        pkg.printStatus();
    }
}
```
Và đây là output:
```
Package ordered, not delivered to the office yet.
Package delivered to post office, not received yet.
Package was received by client.
This package is already received by a client.
Package was received by client.
```
## Hạn chế
Hạn chế mẫu trạng thái là việc thực hiện chuyển đổi giữa các trạng thái.  Điều đó làm cho trạng thái hardcoded, đó là một thực tế xấu nói chung.<br>
Tuy nhiên, tùy thuộc vào nhu cầu và yêu cầu của chúng ta, điều đó có thể hoặc không thể là một vấn đề.
## Kết luận
Mẫu thiết kế State là tuyệt vời khi chúng ta muốn tránh các câu lệnh if/else thông thường.  Thay vào đó, chúng ta trích xuất logic để phân tách các lớp và để đối tượng context của chúng ta ủy thác hành vi cho các phương thức được triển khai trong lớp trạng thái.  Bên cạnh đó, chúng ta có thể tận dụng sự chuyển đổi giữa các trạng thái, trong đó một trạng thái có thể thay đổi trạng thái của context.<br>
## Tham khảo
[State Design Pattern in Java - Baeldung](https://www.baeldung.com/java-state-design-pattern)