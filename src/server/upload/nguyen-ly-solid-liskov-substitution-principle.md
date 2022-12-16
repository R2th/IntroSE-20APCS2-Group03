Đây là phần thứ 3 trong loạt bài viết của mình về nguyên lý SOLID. Nếu bạn chưa đọc phần 1 hoặc không quen thuộc với nguyên lý SOLID, xem [Phần1](https://viblo.asia/p/nguyen-ly-solid-single-responsibility-principle-E375z8qWZGW), ở đó mình đã giới thiệu về SOLID và nói về Single Repository Principle, và [Phần 2](https://viblo.asia/p/nguyen-ly-solid-o-la-openclosed-principle-3P0lPadp5ox) ở đó tôi đã nói về Open/Closed principle.
# Liskov Substitution Principle
Chữ cái thứ 3 trong SOLID là L tương ứng với Liskov Substitution Principle (LSP). Liskov Substitution Principle được giới thiệu bởi Barbara Liskov năm 1987. Liskov Substitution principle phát biểu như sau.

> Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.
> 

Vậy nó có nghĩa là gì?

Mình chắc rằng các bạn cũng như mình hầu như đọc đi đọc lại nó nhiều lần và cố gắng hiểu ý nghĩa của nó nhưng rồi càng ngày ngày càng thấy nó trở nên rối rắm hơn và nếu bạn định nghĩa ở trên Wikipedia về Liskov Substitution Principle bạn sẽ thấy bài viết khác sâu về khoa học máy tính và nó khá là khó hiểu

Hôm nay mình sẽ cùng các bạn tìm hiểu về nó để thấy rằng nó không hề khó hiểu như cách nó phát biểu và hầu như bạn đã từng viết những dòng code tôn trọng quy tắc này nhưng chỉ là bạn không biêt mf thôi

# Một ví dụ về việc thay thế đối tượng bằng đối tượng của lớp con

Java là một static langugue. Compiler làm rất tốt công việt bắt lỗi và thông báo với chúng ta về những lỗi mà nó phát hiện ra. Chúng ta đã làm việc này rất nhiều lần. Bạn cố gắng chỉ định `String` cho một `Long` đại loại thế, và compiler sẽ thông báo cho chúng ta một lỗi sai. Compiler cũng làm rất tốt trong việc hỗ trơ chúng ta viết code mà tôn trọng Liskov Substitution Principle.

Hãy tưởng tượng rằng bạn đang viết một vài đoạn code Android cho phép bạn làm việt với kiểu `List` trong Java. Tôi chắc chuawns rằng bạn đã từng ít nhất vài lần trong đời viết đoạn code giống như dưới đây:

```Java
// Get the ids somehow (loop, lookup, etc)
ArrayList<Integer> ids = getCustomerIds(); 
List<Customer> customers = customerRepository.getCustomersWithIds(ids); 
```
Tại thời điểm này, bạn chỉ quan tâm rằng `customerRepository` trả ra một `List<Customers>`. Có lẽ bạn đã từng viết `CustomerRepository`, nhưng bởi vì backend chưa hoàn thành, bạn quyết định tách interface của bạn ra từ implementation (Hmmm, "Interfce" có thể liên quan tưới chữ "I" trong SOLID không nhỉ? =)) ).

Giả sử code sẽ như thế này:

```Java
public interface CustomerRepository {
   List<Customer> getCustomersWithIds(List<Integer> ids); 
} 

public class CustomerRepositoryImpl implements CustomerRepository {
   @Override
   public List<Customer> getCustomersWithIds(List<Integer> ids) {
        // Go to API, DB, etc and get the customers. 
        ArrayList<Customer> customers = api.getWholeLottaCustomers(ids); 
        return customers;
   }
}
```
Trong đoạn code trên, customer repository cần một list customer ID để có thể có được những customer đó. Customer repositort chỉ yêu cầu list customer IDs với kiểu `List<Integer>`. Khi chúng ta gọi repository chúng ta cung cấp một `ArrayList` như sau:

```Java
// Get the ids somehow (loop, lookup, etc)
ArrayList<Integer> ids = getCustomerIds(); 
List<Customer> customers = customerRepository.getCustomersWithIds(ids);
```

Đợi một giây,.. customer repository cần một `List<Integer>`, không phải một `ArrayList<Integer>`. Làm cahcs nào mà nó vẫn làm việc.

Đây chính là Liskov Substitution Principle đã được tôn trọng. Bởi vì `ArrayList<Integer>` là subtype của `List<Integer>`, chương trình sẽ không hề bị chạy sai: Chúng ta thay thế instance của kiểu được yêu cầu (`List<Integer>`) với một instance của lớp con của nó (`ArrayList<Integer>`).

Nói cách khác, trong code ở trên, chúng ta đã phụ thuộc vào một abstraction (`List<Integer>`), và bởi vì chúng ta có thể cung cấp một subsype (`ArrayList<Integer>`) , mà chương trình vẫn chạy không hề có lỗi. Tại sao lại có thể như thế?

Lý do là kho lưu trữ customer repository phụ thuộc vào contract được cung cấp bởi interface `List`. `ArrayList` là một implementation của inteface `List` do đó, khi chương trình chạy, customer repository sẽ không thấy rằng kiểu đó là của `ArrayList`, mà là một thể hiện của `List`. Phần Nguyên tắc của bài viết LSP Wikipedia giải thích điều này rất tốt, vì vậy mình sẽ trích dẫn nó ở đây:

>Liskov’s notion of a behavioral subtype defines a notion of substitutability for mutable […] objects; that is, if S is a subtype of T, then objects of type T in a program may be replaced with objects of type S without altering any of the desirable properties of that program (e.g., correctness).

 Nói tóm lại, chúng tôi có thể thay thế bất cứ điều gì mở rộng `List` và chúng tôi sẽ không phá vỡ chương trình (nhưng chúng ta vẫn nên vẫn viết một test để chắc chắn).
 
 I’m sure you’ve seen code like this written all over the place in your app, in sample code, etc. This is very common. If you’ve written code like this, you’ve been following the Liskov Substitution Principle. It’s easy, right? 👍

Tôi chắc chắn rằng bạn đã thấy mã như thế này được viết ở khắp nơi trong ứng dụng của bạn, trong mã mẫu, v.v ... Điều này rất phổ biến. Nếu bạn đã viết mã như thế này, thì bạn đã tuân theo Liskov Substitution Principle . Thật dễ dàng phải không? 👍

Chúng ta có thể lấy điều này hơn nữa trong ví dụ của chúng tôi từ phía trên quá! Vì CustomerRepositoryImpl implement interface CustomerRep repository, chúng ta biết rằng bất kỳ ai dựa vào interface CustomerRep repository sẽ được hưởng lợi từ Liskov Substitution Principle.

# Kết luận
Ở trên chúng ta đã thảo luận và lấy ví dụ về Liskov Substitution Principle và chúng ta đã hiểu hơn về nó. Cảm ơn các bạn đã theo dõi bài viết của mình. Ở phần tới chúng ta sẽ cùng bàn luận về nguyên tắc thứ 4 `I` trong SOLID, hãy chờ nhé.

# Tham khảo
Bài viết có tham khảo từ
https://academy.realm.io/posts/donn-felker-solid-part-3/