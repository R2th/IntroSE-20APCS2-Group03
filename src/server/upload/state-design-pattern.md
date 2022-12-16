## State Pattern là gì? 
`State Pattern` là một trong những mẫu thiết kế thuộc nhóm behavioral cho phép một object có thể biến đổi hành vi của nó khi có những sự thay đổi trạng thái nội bộ. 

Mẫu thiết kế này có thể được hiểu gần giống như `Strategy`, nó có thể chuyển đổi các chiến lược thông qua các phương thức được định nghĩa trong interface

## Bài toán
Hãy xem xét một lớp `TCPConnection` đại diện cho một kết nối mạng. Đối tượng kết nối `TCPConnection` có thể ở một trong một số trạng thái khác nhau: `Established`, `Listening`, `Closed`. Khi một đối tượng `TCPConnection` nhận được yêu cầu từ các đối tượng khác, nó sẽ thực hiện hành vi khác nhau tùy thuộc vào trạng thái hiện tại của nó. 

Ví dụ: Kết quả đạt được của một Open request phụ thuộc vào việc kết nối ở trạng thái `Closed` hay `Established`. State pattern mô tả cách `TCPConnection` thể hiện hành vi khác nhau tùy vào mỗi trạng thái

Ý tưởng chính trong mẫu này là giới thiệu một lớp trừu tượng gọi là `TCPState` để đại diện cho các trạng thái của kết nối mạng. Lớp `TCPState` khai báo một interface chung cho tất cả các lớp thể hiện các trạng thái hoạt động khác nhau. Các lớp con của `TCPState` sẽ được cài đặt những hành vi cụ thể.

Ví dụ:  lớp `TCPEstablished` và `TCPClosed` sẽ triển khai hành động cụ thể cho trạng thái Established và Closed của TCPConnection
![](https://images.viblo.asia/b0fb446c-0458-4bf8-a7d1-80d8ad376a32.png)


## Ứng dụng của State Pattern
Chúng ta sẽ áp dụng State Pattern trong các trường hợp như sau: 
* Hành vi của một đội tượng phụ thuộc vào trạng thái của nó. Tại thời điểm runtime, khi đối tượng thực hiện hành vi, trạng thái của nó sẽ thay đổi theo. 
* Đối tượng có nhiều trường hợp sử dụng với các hành vi của nó, nhiều hành vi phụ thuộc vào trạng thái của đối tượng. Hay nói cách khác, đối tượng có nhiều trạng thái, mỗi trạng thái có những hành vi khác nhau.

## Cấu trúc của State Pattern

![](https://images.viblo.asia/7f7ac324-5f96-461a-9c6d-95224ddb3f21.jpg)


![](https://images.viblo.asia/9269113b-515c-4bad-9a94-09c2932cb980.png)

## Thành phần chính

**Context**

* Định nghĩa giao diện chính để giao tiếp với clients.
* Chứa một thể hiện của `ConcreateState` tương ứng với trạng thái hiện tại của đối tượng.

**State**

* Định nghĩa giao diện để đóng gói những hành vi giao tiếp với từng trạng thái của `Context` 

**ConcreateState subclasses** 

* Mỗi một class con implements một hành vi giao tiếp với một trạng thái của `Context` 

## Luồng hoạt động 

* `Context` sẽ định nghĩa những hành vi có thể giao tiếp với Clients, vì thế clients sẽ yêu cầu các hành vi thông qua Context 
* `Context` sẽ chứa một thể hiện của `State`, `State` ban đầu có thể được cài đặt từ Client, nhưng khi đã cài đặt rồi thì clients không được sửa đổi nó nữa. 
* `Context` có thể gửi chính nó như một arguments tới `State`, vì thế `State` có thể truy cập vào `Context` để thay đổi trạng thái nếu cần thiết. 
* Khi `Context` thực hiện hành vi, nó sẽ gọi `State` hiện tại để thực hiện hành vi đó, thực hiện xong, `State` có thể sẽ thay đổi trạng thái từ Context nếu cần
## Kết quả 

Phân vùng hành vi của đối tượng với những trạng thái khác nhau.

Đối tượng được thay đổi trạng thái một cách rõ ràng.

Trạng thái của những đối tượng có thể chia sẻ lẫn nhau.

## Ví dụ mẫu 

Chúng ta sẽ định nghĩa một interface `State` và có 2 trạng thái riêng của nó là `LowerCaseState` và `MultipleUpperCaseState` 


``` Java
interface State {
    void writeName(StateContext context, String name);
}

class LowerCaseState implements State {
    @Override
    public void writeName(StateContext context, String name) {
        System.out.println(name.toLowerCase());
        context.setState(new MultipleUpperCaseState());
    }
}

class MultipleUpperCaseState implements State {
    /* Counter local to this state */
    private int count = 0;

    @Override
    public void writeName(StateContext context, String name) {
        System.out.println(name.toUpperCase());
        /* Change state after StateMultipleUpperCase's writeName() gets invoked twice */
        if(++count > 1) {
            context.setState(new LowerCaseState());
        }
    }
}
```

Lớp `Context` sẽ chứa một biến state, đặc trưng là trạng thái hiện tại của `Context`, trong hàm khởi tạo, `state` sẽ được gán trạng thái mặc định. 

Bên cạnh đó, lớp `Context` sẽ định nghĩa hàm setter cho `state` để thay đổi trạng thái mỗi khi thực hiện hành vi 

Hành vi được thực hiện ở đây là `writeName`
``` Java
class StateContext {
    private State state;
    
    public StateContext() {
        state = new LowerCaseState();
    }

    /**
     * Set the current state.
     * Normally only called by classes implementing the State interface.
     * @param newState the new state of this context
     */
    void setState(State newState) {
        state = newState;
    }

    public void writeName(String name) {
        state.writeName(this, name);
    }
}
```

Khi đó, tại hàm main (client), chúng ta sẽ khởi tạo Context và thực hiện hành vi của chúng: 

``` Java
public class StateDemo {
    public static void main(String[] args) {
        StateContext context = new StateContext();

        context.writeName("Monday");
        context.writeName("Tuesday");
        context.writeName("Wednesday");
        context.writeName("Thursday");
        context.writeName("Friday");
        context.writeName("Saturday");
        context.writeName("Sunday");
    }
}
```

Kết quả sẽ được in ra như sau: 
``` Java
 monday
 TUESDAY
 WEDNESDAY
 thursday
 FRIDAY
 SATURDAY
 sunday
```

Các bạn có thể thấy, mỗi khi thực hiện hàm writeName, state lại được chuyển đổi một lần dẫn tới output của chúng ta cũng khác nhau trong mỗi lần thực hiện

## Design Pattern liên quan 

Nếu ở bên phần trên, một trong những kết quả của design pattern này là các trạng thái của objects có thể chia sẻ lẫn nhau, mẫu thiết kế Flyweight sẽ chỉ rõ khi nào cần chia sẻ những trạng thái và thực hiện như nào để chia sẻ được 

Thông thường, những đối tượng State được thiết kế theo mẫu Singleton, vì bản thân các state chúng ta chỉ cần một thể hiện duy nhất 
## Tham khảo 
[1] Erich Gamma, Richard Helm, Ralph Johnson, John M. Vlissides (1995). Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley. ISBN 0-201-63361-2.

[2] http://www.w3sdesign.com/GoF_Design_Patterns_Reference0100.pdf