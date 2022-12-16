Liên quan đến chủ đề về clean code tôi đã có 2 bài viết về meaningful name và function. Các bạn có thể theo dõi thêm ở link bên dưới:
- https://viblo.asia/p/clean-code-meaningful-name-XL6lA9Vmlek
- https://viblo.asia/p/clean-code-functions-RQqKLexbZ7z

Tiếp tục chủ đề này, hôm nay tôi sẽ giới thiệu tới các bạn chủ đề về "Làm cho biểu thức điều kiện dễ đọc". Những nội dung trong bài viết tôi tham khảo chủ yếu trong cuốn sách "The art of readable code" của các tác giả **Dustin Boswell** và **Trevor Foucher** đồng thời kết hợp với những kinh nghiệm trong các dự án mà tôi đã làm. Như các bạn đã biết việc sử dụng biểu thức điều kiện if/else, vòng lặp là những điều rất cơ bản đối với một lập trình viên. Tuy nhiên, chính vì điều đó đôi khi chúng ta ít quan tâm đến việc làm sao đơn giản những phần code này. Dẫn đến, việc sử dụng chúng một cách tùy tiện, gây khó hiểu, khó bảo trì code, khó để unit test. Trong những nội dung sau đây tôi muốn đề cập những điểm cần chú ý khi các bạn dùng biểu thức điều kiện, vòng lặp và làm sao để đơn giản các logic của nó.

### Thứ tự đối số trong biểu thức điều kiện
Theo các bạn 2 biểu thức sau, cái nào dễ hiểu hơn ?

```csharp
if (maxFailedTimes > 5)
```

hay

```csharp
if (5 < maxFailedTimes)
```

Với tôi, biểu thức đầu tiên sẽ dễ hiểu hơn. Theo đó có một quy tắc bất thành văn và được đa số mọi người thừa nhận là. Biểu thức bên trái thường là các giá trị thường xuyên thay đổi, biểu thức bên trái thường là các hằng số hoặc các giá trị cố định. Theo thói quen thông thường con người thường đọc từ trái qua phải. Giá trị thay đổi thường sẽ khiến người đọc khó định hình hơn là giá trị cố định, do đó đặt nó bên trái để để người đọc hiểu nó đang so sánh với giá trị nào sẽ thuận với các đọc tự nhiên của con người và giúp dễ hiểu hơn.

| Biểu thức bên trái | Biểu thức bên phải |
| -------- | -------- |
| Các gí trị thường xuyên thay đổi     |   Các giá trị cố định   |

###
Ở đây, các giá trị cố định không có nghĩa chỉ là các hằng số. Nó vẫn có thể là biến, nhưng biến này thường là các giá trị ta có thể định hình hoặc xác định được trước khi biểu thức được thực thi trên thực tế. Ví dụ:

Nên:
```csharp
if (receivedBytes < expectedBytes)
```
 thay vì:
 
 ```csharp
if (expectedBytes > receivedBytes)
```

### Thứ tự của if/elese block
Có thể nhiều ít bạn chú ý đến thứ tự của các khối if/else. Vậy trong 2 cách dùng sau cái nào là tốt hơn.
```csharp
if (user == null) {
    // Case One ...
} else {
    // Case Two ...
}
```

Hoặc:
```csharp
if (user != null) {
    // Case Two ...
} else {
    // Case One ...
}
```

Theo như phân tích của các tác giả trí óc con người sẽ hiểu biểu thức điều kiện theo chiều thuận tốt hơn là điều kiện phủ định. Có nghĩa là thứ tự if/elese như khối code trên sẽ dễ hiểu hơn khối dưới. Hay nói cách khác là nên xử lý trường hợp positive trước, navigative sau. Tôi tóm tắt một số rule chúng ta nên tuân theo.

- Giải quyết với trường hợp positive trước, trường hợp negative sau. Ví dụ: nên dùng ```if (debug)``` hơn là ```if(!debug)```
- Giả quyết trường hợp đơn giản trước và return sớm tiếp đó mới đến xử lý logic chính, phức tạp. Các tiếp cận này trách được một một khối else.

### Chỉ sử dụng biểu thức 3 ngôi cho những điều kiện đơn giản

Trong rất nhiều ngôn ngữ kiểu C-like giống như Java, C#, PHP,... chúng ta có thể sử dụng biểu thức 3 ngôi để giảm thiểu số code phải viết. Giống như thế này: ```var isLogin = user ? true : false```. Rõ ràng, việc dùng biểu thức 3 ngôi sẽ làm số line code phải viết giảm xuống. Các bạn có thể xem ví dụ sau:

```csharp
var errorCode = timeOutInMinutes > 10 ? 500 : null;
```

Nếu không biểu thức 3 ngôi, ta phải viết if/else

```csharp
if (timeOutInMinutes > 10) {
    return 500;
} else {
    return null;
}
```

Tuy nhiên, chúng ta không nên lạm dụng biểu thức 3 ngôi, chỉ dùng nó trong những trường hợp đơn giản và dễ hiểu. Ví dụ sau chỉ rằng rằng việc line code giảm xuống lại không phải điều tốt vì nó làm code trở nên khó đọc và khó hiểu:

```c
return exponent >= 0 ? mantissa * (1 << exponent) : mantissa / (1 << -exponent);
```

Sẽ tốt hơn nếu chúng ta break down thành các biểu thức if/else
```c
if (exponent >= 0) {
    return mantissa * (1 << exponent);
} else {
    return mantissa / (1 << -exponent);
}
```

Vậy key idea ở đây là việc giảm thời gian đọc, hiểu code quan trọng hơn việc giảm số dòng code

>**Instead of minimizing the number of lines, a better metric is to minimize the time
needed for someone to understand it.**

### Tránh sử dụng vòng lặp do/while
Rất nhiều ngôn ngữ lập trình hỗ trợ vòng lặp do/while. Lý do vì sao chúng ta không nên dùng vòng lặp do/while ? Theo những gì tôi tham khảo được thì thấy rằng vòng lặp do/while có biểu thức điều kiện đặt bên dưới. Theo tự nhiên chúng ta sẽ đọc code từ trên xuống dưới, do vậy khi điều kiện ở cuối vòng lặp sẽ khiến chúng ta khó khăn để hiểu được khối code bên trong, buộc chúng ta phải nhảy xuống cuối để xem điều kiện trước khi đọc khối code. Điều này rõ ràng là mất thời gian hơn, cũng như khó hiểu hơn cho người đọc.

Để tránh dùng do/while chúng ta có thể thay thế bằng vòng lặp while. Ví dụ:

```java
// Search through the list, starting at 'node', for the given 'name'.
// Don't consider more than 'max_length' nodes.
public boolean ListHasNode(Node node, String name, int max_length) {
    do {
        if (node.name().equals(name))
            return true;
        node = node.next();
    } while (node != null && --max_length > 0);
    
    return false;
}
```

Thay bằng vòng lặp while:

```java
public boolean ListHasNode(Node node, String name, int max_length) {
    while (node != null && max_length-- > 0) {
        if (node.name().equals(name)) return true;
        node = node.next();
    }
 
    return false;
}
```

### Return sớm

Trong một function cần trả về giá trị. Chúng ta nên tìm ra các điều kiện đặc biệt hoặc đơn giản để xử lý trước sau đó return sớm. Những logic phức tạp sẽ sử lý sau. Điều này có lợi là giúp chúng ta bới được điều kiện else, bớt được các điều kiện if/else lồng nhau giúp code dễ hiểu hơn. Tại sao lại dễ hiểu hơn ? Chúng ta thấy rằng trong code càng có nhiều điều kiện if/else thì sẽ càng khó hiểu. Dưới đây là cách để chúng ta có thể return sớm.

Nếu một function có logic thế này:

```csharp
public function doSomeThings()
{
    if(condition1) {
        // Do some things
     
        return true;
    } 
    
    return false;
}
```

Ta chuyển về return sớm như sau:

```csharp
public function doSomeThings()
{
    if(!condition1) {
        return false;
    }
    
     // Do some things
}
```

### Giảm tối thiểu việc if/else lồng nhau
Như tôi đã nói ở phẩn trên. Việc code có điều kiện lồng nhau khiến code trở nên phức tạp và làm cho người đọc rất khó hiểu. Vì vậy, nếu trong điều kiện có thể ta nên tránh việc sử dụng if/else lồng. Ví dụ:

```java
if (user_result == SUCCESS) {
    if (permission_result != SUCCESS) {
        reply.WriteErrors("error reading permissions");
        reply.Done();
        return;
    }
    reply.WriteErrors("");
} else {
    reply.WriteErrors(user_result);
}

reply.Done();
```

Chúng ta nên refactor như sau:
```java
if (user_result == SUCCESS) {
    reply.WriteErrors("");
} else {
    reply.WriteErrors(user_result);
}
reply.Done();
```

Hoặc dùng return sớm để loại bỏ if/else lồng:

```java
if (user_result != SUCCESS) {
    reply.WriteErrors(user_result);
    reply.Done();
    return;
}
if (permission_result != SUCCESS) {
    reply.WriteErrors(permission_result);
    reply.Done();
    return;
}
reply.WriteErrors("");
reply.Done();
```

# Tổng kết
Bài viết tôi đã tổng hợp một số rule trong việc sử dụng biểu thức điều kiện trong khối if/else và vòng lợp. Đây có lẽ là những vấn đề cơ bản nhiều bạn đã nắm được. Tuy nhiên, dù là cơ bản nhưng nó cũng là những đúc rút từ những người có rất nhiều kinh nghiệm trong lập trình vì vậy mình cho rằng nó đáng để chúng ta tuân theo. Những rule đó bao gồm:

- Sắp xếp thứ tự đối số trong biểu thức điều kiện cho hoepj lý
- Thứ tự if/else (case positive xử lý trước, case negative xử lý sau)
- Chỉ sử dụng biểu thức 3 ngôi khi điều kiện là đơn giản, dễ hiểu
- Hạn chế dùng vòng lặp do/while
- Sử dụng return sớm để loại bỏ nhiều if/else và if/else lồng nhau.
- Hạn chế if/else lồng nếu có thể

Cảm ơn các bạn đã theo dõi.

**Tham Khảo:** Book The art of readable code - Dustin Boswell and Trevor Foucher