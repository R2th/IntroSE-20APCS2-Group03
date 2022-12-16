Từ khoá "const" đã từng là một chủ đề gây tranh cãi trong cộng đồng Flutter.Một số người phàn nàn về  new linting rules bắt họ phải làm quen với nó, một số người thì ca ngợi từ khoá giúp cải thiện và tối ưu hiệu suất.Từ khoá đấy dùng để làm gì ? Nó quan trọng không ? Trong bài viết này mình  và các bạn sẽ cùng tìm hiểu về từ khoá này nhé.

Từ khoá "const" được dùng khi giá trị của biến được biết tại thời điểm compile time và không đổi.Nói cách khác trình biên dịch sẽ biết trước giá trị nào được lưu vào biến đó.
```
const int x = 1;
//Tại thời điểm compile time,  giá trị của biến x là 1 và không đổi.
```

Flutter cũng tự động suy ra kiểu của biến khi bạn chỉ cần khai báo biến và khởi tạo giá trị dưới dạng const.
```
const name = "John Doe";
```

Tại sao từ khoá này gây tranh cãi ? Nếu biến const chỉ có tác dụng để báo rằng biến này không thể thay đổi thì tại sao ko dùng theo cách thường int x = 1.
Đương nhiên bạn có thể khai báo như  bình thường , không vấn đề gì cả. Tuy nhiên việc sử dụng từ khoá này ngoài phục vụ cho việc báo cho trình biên dịch biết biến này sẽ không bao giờ thay đổi trong suốt thời gian tồn tại của  nó mà  còn tác dụng cải thiện hiệu suất bắng cách khi gọi lại biến này trình biên dịch ko cần phải tạo ra 1 bản sao mới mà chỉ cần tham chiếu lại bản sao mà bạn đã tạo trước đó.

Từ khoá này được sử dụng cho compile time  constant, String , number và kể cả Class.
Tầm quan trọng của nó được thể hiện rõ khi chúng ta tạo class và constructor của class đó. Hãy tưởng tượng chúng ta tạo 1 widget ( mỗi widget là một class) thực hiện một việc gì đó và không bao giờ thay đổi như tạo một hình vuông màu xanh và có kích thước cụ thể.
```
class BlueSquare extends StatelessWidget {
 final double size;

 BlueSquare({Key? key, required this.size}) : super(key: key);

 Widget build(BuildContext context) {
   return Container(
     height: size,
     width: size,
     color: Colors.blue,
   );
 }
}
```
Trên app của bạn , bạn tạo ra 100 ô vuông xanh có kích thước 50.Thông thường bạn sẽ tạo ra 100 object  có class BlueSquare.
```
BlueSquare(size:50);
```
Nếu làm theo cách này thì Flutter sẽ cần phải tạo 100 object trong bộ nhớ điều này gây lãng phí bộ nhớ. Có cách nào bạn chỉ cần khởi tạo 1 object và sau đó bất cứ khi nào bạn cố gắng tạo ra một object mới có cùng kích thước, nó chỉ cần tra cứu bộ nhớ cache của nó và cung cấp cho bạn  tham chiếu tới đối tượng đó ? Từ khoá "const" chính là giải pháp bạn cần . 

 Bạn sửa đoạn code trên như sau : 
 `class BlueSquare extends StatelessWidget {
 final double size;

 →→ const BlueSquare({Key? key, required this.size}) : super(key: key);

 Widget build(BuildContext context) {
   return Container(
     height: size,
     width: size,
     color: Colors.blue,
   );
 }
}`
Thêm từ khoá const trước constructor class. Một const constructor là một phương thức khởi tạo với các tham số là hằng số và thường được kí hiệu bằng từ const ở trước các phương thức khởi tạo .

Bạn gọi hàm khởi tạo object như sau : 
```
const BlueSquare(size: 50);
```
Về bản chất thì các hàm  const constructor đều tham chiếu tới 1 ô nhớ : 
```
y = const BlueSquare(size: 50);

x = const BlueSquare(size: 50);

x==y // will be True
```

Nếu bạn nghĩ từ khoá này ko quạn trong  thì các bạn nhầm vì UI của các ứng dụng được viết bằng các widget flutter, nếu bạn có thể sự dụng lại các const widtget bằng cách tham chiếu mà ko cần khởi tạo lại widget mới thì điều đó thật tuyệt vời và cải thiện hiệu suất của ứng dụng biết bao nhiêu.
Nếu bạn nghĩ từ khoá này ko quạn trong thì khi làm ứng dụng  được xậy dựng  bới  các const widget mà ko cần phải tạo mới .

Phần cuối bài viết mình sẽ nói thêm về **final** vì  nhiều lập trình viên hay sử dụng từ khoá final, const để thay thế lẫn nhau.

```
final int x = 50;
const int x = 50;
```
**final** và **const** trên thực tế thì rất giống nhau, đều không thay đổi giá trị của biến, nhưng **final** ít nghiêm ngặt hơn, nó chứa các giá trị không thay đổi nhưng giá trị đó có thể không xác định trong 1 khoảng thời gian ngay cả sau khi biên dịch nhưng một khi đã xác định thì giá trị đó không bao giờ thay đổi.

```
final response =
 await http.get(Uri.parse(‘https://jsonplaceholder.typicode.com/albums/1'));
```

Ở ví dụ trên giá trị của  biến response chưa được biết đến cho đến khi chúng ta call xong api  và api trả về giá trị .
Một điều cần lưu ý nữa là một  instance variables chỉ có thể là **final** không thể là **const** và static variables chỉ có thể là **const**.

```
class BlueSquare extends StatelessWidget {
 final double size;

 static  const info = "I am a blue square";
}
```
 Hy vọng bài viết của mình giúp các bạn hiểu hơn về từ khoá const.
 
 Bài viết tham khảo : 
 https://medium.com/flutter-community/the-flutter-const-keyword-demystified-c8d2a2609a80