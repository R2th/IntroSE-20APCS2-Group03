# 1. Mọi thứ  đều là Widgets
Hãy giả vờ rằng bạn là một người mê Lego cực kỳ tài năng và được mời làm một trong số ít công việc đáng mơ ước với tư cách là Người xây dựng bậc thầy của Lego. Chúc mừng! Cũng giả sử rằng nhiệm vụ đầu tiên của bạn là xây dựng Thor được làm từ 26.000 Legos  như hình bên dưới .

![](https://images.viblo.asia/70799cf6-8da1-4ce6-8417-f4f484339199.jpeg)

Bạn sẽ làm điều đó như thế nào? Suy ngẫm điều đó trong một phút. Hãy tiếp tục, chúng tôi sẽ đợi.
Bạn sẽ bắt đầu lấy những viên gạch và xếp chúng lại với nhau? Chắc là không. Bạn có đặt móng của khối trụ và xây dựng từ dưới lên không? Một lần nữa, không. Đây là suy đoán của tôi về chiến lược thông thường của bạn:
1. Bạn sẽ có được tầm nhìn về những gì bạn đang xây dựng. Hình dung toàn bộ sự việc.
2. Nhận ra rằng toàn bộ dự án quá phức tạp để xây dựng cùng một lúc.
3. Phá  trụ thành các phần (móng , các khối màu xen kẽ , khối trụ sẽ nhỏ dần theo từng khúc).
4. Nhận ra rằng mỗi phần trong dự án vẫn còn quá phức tạp.
5. Với mỗi phần, bạn chia nhỏ thành các phần nhỏ.
6. Lặp lại các bước 4 và 5 cho đến khi bạn có đủ các thành phần đơn giản mà mỗi thành phần đều dễ hiểu, dễ xây dựng và bảo trì - cho bạn và cho bất kỳ đồng đội nào mà bạn có thể có.
7. Tạo từng thành phần đơn giản.
8. Kết hợp các thành phần đơn giản để tạo thành các thành phần lớn hơn, phức tạp hơn.
9. Lặp lại các bước 7 và 8 cho đến khi bạn tạo xong toàn bộ dự án.

Quá trình này có tên: **componentization** và chính xác là quá trình suy nghĩ mà chúng tôi sẽ thực hiện với các dự án Flutter của mình. 

**Componentization** không phải là một cái gì đó mới. Trên thực tế, nó đã được đề xuất từ ​​năm 1968. Nhưng kỹ thuật này gần đây đã trở nên phổ biến nhờ các khuôn khổ web như Angular, React, Vue, Polymer và các thành phần web gốc. Ý tưởng chia nhỏ một cách đệ quy các bit phức tạp thành các bit đơn giản hơn được gọi là **phân rã**. Và hành động đặt các phần đã viết lại với nhau thành các thành phần lớn hơn được gọi là **bố cục** . 

Trong thế giới của Flutter, những thành phần này được gọi là widget. Mọi người dùng Flutter thích nói “mọi thứ đều là widget”, nghĩa là bạn và tôi sẽ sử dụng các widget do Google cung cấp - những widget đi kèm với Flutter. Chúng tôi sẽ tổng hợp chúng lại với nhau để tạo ra các tiện ích con tùy chỉnh của riêng chúng tôi. Và các widget tùy chỉnh của chúng ta sẽ được kết hợp với nhau để tạo ra nhiều widget tùy chỉnh phức tạp hơn. Điều này tiếp tục cho đến khi bạn có cho mình một ứng dụng hoàn chỉnh.

Trong thế giới của Flutter, các thành phần được gọi là widget.

Mọi ứng dụng có thể được chia thành hai phần:
1. Behavior (Hành vi) - Những gì phần mềm làm. Tất cả logic nghiệp vụ đều ở đây: đọc, ghi và xử lý dữ liệu.
2. Presentation (Hiển thị) - Phần mềm trông như thế nào. Giao diện người dùng. Các nút, hộp văn bản, nhãn.
Chỉ có Flutter kết hợp chúng thành một ngôn ngữ thay vì hai

# 2. Giao diện người dùng dưới dạng code

Các khuôn khổ phát triển khác đã được chứng minh componentization là con đường để đi. Nhóm Flutter đã công khai tuyên bố rằng họ đã
lấy cảm hứng từ React dựa trên sự componentization. Trên thực tế, tất cả các nhà sản xuất khung dường như đang vay mượn lẫn nhau. Nhưng Flutter là duy nhất trong cách thể hiện giao diện người dùng. Các nhà phát triển sử dụng cùng một ngôn ngữ Dart để thể hiện giao diện người dùng đồ họa của ứng dụng cũng như hành vi . Chúng tôi gọi đây là “**UI as code**.”.

![](https://images.viblo.asia/bf645f3b-9ed8-4f9f-89cf-676c9c115658.png)

Vậy giao diện người dùng này được tạo như thế nào? Giống như nhiều khuôn khổ và ngôn ngữ khác, một ứng dụng bắt đầu bằng một chức năng chính. Trong Flutter, **main** sẽ gọi một hàm có tên là **runApp()**. **RunApp()** này nhận một widget, widget gốc có thể được đặt tên là bất kỳ thứ gì, nhưng nó phải là một lớp mở rộng một Flutter StatelessWidget. Nó trông như thế này:

```dart
// import the Dart package needed for all Flutter apps
import 'package:flutter/material.dart';
// Here is main calling runApp
void main() => runApp(RootWidget());
// And here is your root widget
class RootWidget extends StatelessWidget {
    @override
    
     Widget build(BuildContext context) {
        return Text("Hello world");
    } 
}
```

Và đó là tất cả những gì bạn cần để tạo “Hello world” trong Flutter.

Nhưng chờ đã ... cái Text() này là gì? Đó là một tiện ích Flutter được tích hợp sẵn. Vì các widget tích hợp này rất quan trọng, chúng ta cần xem xét chúng.

# 3. Các tiện ích Flutter tích hợp sẵn
Các widget nền tảng của Flutter là các khối xây dựng của mọi thứ chúng tôi tạo ra và có rất nhiều thứ trong số đó - số lượng lần cuối là khoảng 160. Đây là rất nhiều widget để bạn và tôi theo dõi. Nhưng nếu bạn sắp xếp chúng một cách hợp lý, nó sẽ trở nên dễ quản lý hơn nhiều.
Chúng thuộc các loại chính sau:

 - Value widgets 
 - Layout widgets 
 - Navigation widgets 
 - Other widgets

Chúng ta sẽ xem xét ngắn gọn từng danh mục này với một hoặc hai ví dụ, sau đó chúng ta sẽ đi sâu tìm hiểu trong các chương sau. Hãy bắt đầu với các value widgets.

### a. Value widgets

Các tiện ích con nhất định có một giá trị, có thể là các giá trị đến từ bộ nhớ cục bộ,
một dịch vụ trên Internet, hoặc từ chính người dùng. Chúng được sử dụng để hiển thị giá trị cho người dùng và nhận giá trị từ người dùng vào ứng dụng.
Ví dụ chính là tiện ích Văn bản hiển thị một văn bản. Một tiện ích khác là tiện ích Hình ảnh hiển thị .jpg, .png hoặc một hình ảnh khác.
Dưới đây là một số widget giá trị hơn:

![Ảnh chụp Màn hình 2021-09-20 lúc 10.03.14.png](https://images.viblo.asia/e7590991-2113-4140-9f61-91930b6c1c05.png)

Chúng ta sẽ khám phá các tiện ích con giá trị một cách chi tiết hơn trong chương tiếp theo.

### b. Layout widgets

Các widget bố cục cung cấp cho chúng tôi rất nhiều quyền kiểm soát trong việc sắp xếp đúng cách - đặt các widget cạnh nhau hoặc bên trên và bên dưới, làm cho chúng có thể cuộn được, làm cho chúng bao bọc, xác định không gian xung quanh các widget để chúng không cảm thấy chật chội, v.v.:

![Ảnh chụp Màn hình 2021-09-20 lúc 10.04.51.png](https://images.viblo.asia/2e7387da-874b-4ca3-9012-dedda0b86f26.png)

### c. Navigation widgets

Khi ứng dụng của bạn có nhiều  (“màn hình”, “trang”, bất cứ thứ gì bạn muốn), bạn sẽ cần một số cách để di chuyển giữa chúng. Đó là nơi các tiện ích Điều hướng xuất hiện. Các tiện ích này sẽ kiểm soát cách người dùng của bạn nhìn thấy một màn hình  và sau đó chuyển sang màn hình  tiếp theo. Thông thường điều này được thực hiện khi người dùng chạm vào một nút. Và đôi khi nút điều hướng nằm trên thanh tab hoặc trong ngăn kéo trượt vào từ phía bên trái của màn hình. Dưới đây là một số tiện ích điều hướng:

![Ảnh chụp Màn hình 2021-09-20 lúc 10.07.00.png](https://images.viblo.asia/b66a2825-6a09-4b27-82d4-56e2e842a060.png)

### d. Other widgets

Không phải tất cả các widgets đều rơi vào các danh mục gọn gàng này. Hãy gộp phần còn lại vào một danh mục khác. Dưới đây là một số widgets linh tinh:

![Ảnh chụp Màn hình 2021-09-20 lúc 10.08.20.png](https://images.viblo.asia/495205fe-7d81-44f6-a0c1-3c36495c3451.png)


# 4. Cách tạo các own stateless widgets của riêng bạn
Chúng tôi biết rằng chúng tôi sẽ soạn các widget tích hợp này để tạo thành các widget tùy chỉnh của riêng chúng tôi, sau đó sẽ được tạo với các widget tích hợp khác để cuối cùng tạo thành một ứng dụng.

Các widget được thiết kế tinh vi vì mỗi widget đều dễ hiểu và do đó dễ bảo trì. Các widget là trừu tượng từ bên ngoài trong khi logic và có thể dự đoán được ở bên trong. Họ là một giấc mơ để làm việc cùng.

Mỗi widget là một lớp có thể có các thuộc tính và phương thức. Mọi tiện ích con đều có thể có một hàm tạo không có hoặc nhiều tham số. Và
quan trọng nhất, mọi widget đều có phương thức xây dựng nhận BuildContext và trả về một widget Flutter duy nhất. Nếu bạn đang tự hỏi làm thế nào một tiện ích con có giao diện như vậy, hãy tìm phương pháp xây dựng của nó:


```dart
class RootWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text('Hello world');
  }
}

```

Trong ví dụ hello world mà chúng ta đã lặp lại ở phần trước của chương, chúng ta đang hiển thị tiện ích Văn bản. Một widget bên trong duy nhất hoạt động nhưng các ứng dụng trong thế giới thực sẽ phức tạp hơn rất nhiều. Tiện ích gốc có thể bao gồm nhiều tiện ích con khác:

```dart
class FancyHelloWidget extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text("A fancier app"),
        ),
        body: Container(
          alignment: Alignment.center,
          child: Text("Hello world"),
        ),
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.thumb_up),
          onPressed: () => {},
        ), ),
    ); }
}
```

![Ảnh chụp Màn hình 2021-09-20 lúc 10.14.13.png](https://images.viblo.asia/986201e9-469b-459c-968f-139345fe1ca6.png)

Vì vậy, như bạn có thể thấy, phương thức xây dựng đang trả về một tiện ích duy nhất, MaterialApp, nhưng nó chứa một Scaffold chứa ba tiện ích con: một AppBar, một Container và một FloatingActionButton (Hình trên). Mỗi cái trong số đó lại chứa các tiện ích con phụ của riêng chúng.

![Ảnh chụp Màn hình 2021-09-20 lúc 10.15.53.png](https://images.viblo.asia/aa133fb6-de4b-454d-bb23-91732e3377d0.png)

Đây là cách mà phương pháp xây dựng của bạn sẽ luôn hoạt động. Nó sẽ trả về một biểu thức duy nhất, lớn, lồng nhau. Đó là các widget bên trong các widget bên trong các widget cho phép bạn tạo một widget tùy chỉnh phức tạp của riêng mình.

# 5. Các widget có khóa

Bạn có thể nghe về DOM ảo khi các nhà phát triển khác nói về Flutter. Điều này đến từ thế giới của React. (Hãy nhớ rằng Flutter đã vay mượn rất nhiều từ kiến trúc tuyệt vời của React.) Nói đúng ra, Flutter không có DOM, nhưng nó duy trì một thứ giống với nó - cây phần tử. Cây phần tử là một bản sao nhỏ của tất cả các widget trên màn hình. Flutter duy trì một cây phần tử hiện tại và một cây có các thay đổi hàng loạt được áp dụng.
Bạn thấy đấy, Flutter có thể thực sự chậm nếu nó áp dụng mọi thay đổi nhỏ trên màn hình và sau đó cố gắng kết xuất lại hàng trăm lần mỗi giây. Thay vào đó, Flutter áp dụng tất cả những thay đổi đó vào một bản sao của cây phần tử. Sau đó, nó định kỳ "khác biệt" cây phần tử hiện tại với cây đã sửa đổi và quyết định những gì thực sự cần được hiển thị lại. Nó chỉ kết xuất những phần cần nó. Điều này nhanh hơn nhiều.

Nhưng đôi khi Flutter bị nhầm lẫn khi so khớp các widget trong các cây phần tử. Bạn sẽ biết cách gán các phím theo chương trình nếu dữ liệu của bạn thay đổi và các tiện ích con được vẽ sai vị trí, dữ liệu không được cập nhật trên màn hình hoặc vị trí cuộn của bạn không được giữ nguyên.
Bạn không cần phải lo lắng về chìa khóa hầu hết thời gian. Điều đó hiếm khi cần đến mức chúng tôi sẽ hài lòng nếu bạn hiểu rằng ...

1. Các phím tồn tại và tại sao Flutter có thể cần chúng.
2. Nếu các tiện ích con của bạn không được vẽ lại như bạn mong đợi khi dữ liệu thay đổi, các khóa có thể giải quyết vấn đề.
3. Bạn có cơ hội để gán các khóa cho các vật dụng nhất định.


# 6. Chuyển một giá trị vào wedget của bạn

Bạn có biết công thức này có nghĩa là gì không?

>  y = f(x)

Các chuyên gia toán học sẽ nhận ra điều này khi đọc "Y là một hàm của X." Nó thông báo một cách ngắn gọn rằng khi X (biến độc lập) thay đổi, Y (biến phụ thuộc) sẽ thay đổi theo cách có thể dự đoán được. Flutter sống dựa trên ý tưởng này, nhưng trong Flutter, công thức đọc như thế này:

> Scene = f(Data)

Nói cách khác, khi dữ liệu trong ứng dụng của bạn thay đổi, màn hình sẽ thay đổi theo. Và bạn, nhà phát triển, có thể quyết định cách dữ liệu đó được trình bày khi bạn viết một phương pháp xây dựng trong các widget của mình. Đó là một khái niệm nền tảng của Flutter.

Bây giờ dữ liệu đó có thể thay đổi như thế nào? Có hai cách:

1. Tiện ích có thể được kết xuất lại với dữ liệu mới được truyền từ bên ngoài.
2. Dữ liệu có thể được duy trì trong các wedget nhất định.

Hãy nói về điều đầu tiên. Để chuyển dữ liệu vào một tiện ích con, bạn sẽ gửi nó dưới dạng một tham số phương thức khởi tạo như sau:

```dart
Widget build(BuildContext context) {
  return Person("Sarah"); // Passing "Sarah" into a widget
}
```

Nếu một widget đại diện cho cách hiển thị một Person, thì việc chuyển trong FirstName là một điều hết sức bình thường, giống như chúng ta vừa làm với “Sarah” trước đó. Nếu bạn làm điều đó, bạn sẽ cần phải viết hàm tạo của tiện ích con của mình để nhận giá trị đó:

```dart
class Person extends StatelessWidget {
  final String firstName;
  Person(this.firstName) {}
  Widget build(BuildContext context) {
    return Text('$firstName');
  }
}
```

Đây là cú pháp Dart. Lưu ý ba điều. Đầu tiên, bạn sẽ liệt kê tham số đầu vào trong hàm tạo (“this.firstName” trong ví dụ trước). Thứ hai, hãy chắc chắn rằng bạn đặt “cái này”. trước mặt nó. "Cái này." đối sánh nó với một thuộc tính cấp lớp chứ không phải là một tham số là cục bộ của hàm khởi tạo. Và thứ ba, đánh dấu thuộc tính lớp tương ứng là cuối cùng.
Bạn có thể muốn chuyển hai hoặc nhiều thuộc tính như thế này:

```dart
Widget build(BuildContext context) {
  return Person("Sarah","Ali");
}
```

Tất nhiên, chuyển hai giá trị có nghĩa là tạo hai biến cuối cùng và hai tham số hàm tạo để xử lý chúng:

```dart
class Person extends StatelessWidget {
  final String firstName;
  final String lastName;
  Person(this.firstName, this.lastName) {}
  Widget build(BuildContext context) {
    return Text('$firstName $lastName');
  }
}
```

Như bạn có thể đoán, chúng được khớp theo vị trí có thể dễ bị rối và không linh hoạt lắm. Một thực tiễn tốt hơn là có các tham số được đặt tên:

```dart

Widget build(BuildContext context) {
  return Person(firstName:"Sarah", lastName:"Ali");
}

```

Điều này làm giảm sự nhầm lẫn cho các nhà phát triển khác sử dụng widget của bạn. Đây là cách bạn viết tiện ích con của mình để nhận được giá trị đó:

```dart
class Person extends StatelessWidget {
  final String firstName;
  final String lastName;
  Person({this.firstName, this.lastName}) {}
  Widget build(BuildContext context) {
    return Container(child: Text('$firstName $lastName'));
  }
}

```

Bạn có thấy sự khác biệt? Nó thật tinh tế. Bây giờ có dấu ngoặc nhọn xung quanh các tham số của hàm tạo. Điều này làm cho chúng trở thành tùy chọn và được đặt tên.

> **Tip:**  note that in all three of the preceding examples, we are using a person class that might have been defined in the same dart file where you’re using it. But a better practice is to create each class in a separate dart file and import it into other dart files where it is used.
> 
> ``` dart
> import 'Person.dart';
> ```

# 7. Stateless và Stateful widgets

Cho đến nay, chúng tôi đã cố gắng tạo ra các widgets stateless. Vì vậy, bạn có thể đoán rằng cũng có một widgets trạng thái. Bạn đa đung. widgets stateless là widgets không duy trì trạng thái của chính nó. Một widget trạng thái không.
“Trạng thái” trong ngữ cảnh này đề cập đến dữ liệu trong tiện ích con có thể thay đổi trong suốt thời gian tồn tại của nó. Hãy nghĩ về tiện ích Person của chúng tôi từ trước đó. Nếu đó là một tiện ích chỉ hiển thị thông tin của một người, thì nó phải ở trạng thái stateless. Nhưng nếu đó là tiện ích bảo trì cá nhân, nơi chúng tôi cho phép người dùng thay đổi dữ liệu bằng cách nhập vào TextField, thì chúng tôi cần có StatefulWidget.
Có cả một chương về các tiện ích Stateful ở phần sau. Nếu bạn chỉ nóng lòng muốn biết thêm về chúng, bạn có thể đọc Chương 9, “Trạng thái quản lý”, ở phần sau của cuốn sách này. Sau đó quay lại đây.

# 8. Vậy tôi nên tạo cái nào?

Câu trả lời ngắn gọn là tạo một widget không trạng thái. Không bao giờ sử dụng một widget trạng thái cho đến khi bạn phải. Giả sử tất cả các widgets bạn tạo ra sẽ không có trạng thái và bắt đầu chúng theo cách đó. Cấu trúc lại chúng thành các widget trạng thái khi bạn chắc chắn rằng bạn thực sự cần trạng thái. Nhưng hãy thừa nhận rằng trạng thái có thể tránh được thường xuyên hơn các nhà phát triển nghĩ. Tránh nó khi bạn có thể để làm cho các widget đơn giản hơn và do đó dễ dàng hơn để viết, bảo trì và mở rộng. Các thành viên trong nhóm của bạn sẽ cảm ơn bạn vì điều đó.

# 9. Phần kết luận
Vì vậy, bây giờ chúng ta biết rằng các ứng dụng Flutter đều là về các widget. Bạn sẽ soạn các tiện ích không trạng thái hoặc có trạng thái tùy chỉnh của riêng mình, có phương pháp xây dựng sẽ hiển thị một cây các tiện ích Flutter được tích hợp sẵn. Vì vậy, rõ ràng chúng ta cần biết về các tiện ích Flutter tích hợp sẵn mà chúng ta sẽ tìm hiểu bắt đầu trong chương tiếp theo.

Nguồn : https://www.amazon.com/Beginning-App-Development-Flutter-Cross-Platform/dp/1484251806