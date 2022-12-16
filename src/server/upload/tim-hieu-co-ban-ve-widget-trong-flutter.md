# **Giới thiệu về Widget**
![](https://images.viblo.asia/1c2073c6-4696-48fd-89df-aed6bff37133.png)

Trong Flutter, mọi thứ xuất hiện trên giao diện người dùng đều được gọi là Widget, bởi về mặt bản chất, chúng đều kế thừa từ lớp Widget. Khi bạn tạo ra giao diện người dùng trong Flutter, bạn sẽ thực hiện bằng cách gắn mỗi Widget nhỏ hơn lên trên màn hình ứng dụng sao cho nó đúng với vị trí bạn mong muốn.
Khi nói về Widget, chúng ta sẽ đề cập tới các buttons, text fields, animations, containers, … và thậm chí cả một page lớn hơn. Mọi thứ xuất hiện trên màn hình hoặc tương tác với nó đều coi là một Widget. “Widget everywhere!”. Khi bạn lồng các Widget lại với nhau, bạn sẽ tạo ra một hệ thống phân cấp được gọi là “Widget tree” trong đó có các Widget cha và các Widget con. Trong một project của Flutter, chúng ta sẽ phải xây dựng ứng dụng giao diện người dùng trên cấu trúc tối thiểu :
```
import 'package:flutter/material.dart';
void main() {
  runApp(MyApp());
}
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {...}
}
```
Như các bạn đã biết, chương trình Dart nào cũng phải có hàm void main(), và Flutter cũng không ngoại lệ, phương thức runApp(…) là một instance của Widget, nó làm cho nó trở thành gốc của “Widget tree”. Khi bắt đầu, bạn sẽ có một cây – một lá, đồng thời là rễ luôn.

![](https://images.viblo.asia/a6e7e565-d124-4ad0-8135-8a6dccd62a24.png)

 
Ví dụ như 
```
void main() => runApp(const MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: const [
        Text('Hello'),
        Text('Mayfest'),
      ],
    );
  }
}
```
Phương thức Widget build(BuildContext context){…} dùng để thêm các lá mới vào trong “Widget tree” theo thứ tự, các Widget “nhỏ hơn” được lông vào bên trong Widget “lớn hơn”, nhằm tạo ra một hệ thống phân cấp như ở trên mình đã nói :
![](https://images.viblo.asia/a1a00c43-7ecb-4b08-a00a-3a84314e3ed2.png)

 
# **Cơ bản về Widget**
Flutter có vô vàn Widget, bạn có thể tìm thấy trong core lib hoặc tại https://pub.dev/ . Ở đây mình sẽ liệt kê ra các Widget phổ biến mà hầu như project nào bạn cũng sẽ sử dụng đến chúng.
Widget trong core lib của Flutter chia làm 3 Widget chính : không có con, có 1 con (1 child), có nhiều con (children).
### **Text**
Đây là Widget cơ bản khi bạn muốn hiển thị một đoạn văn bản về phía người dùng. Nó có khả năng tùy chỉnh rất cao, bạn có thể thay đổi color, font-size, font-weight,… bằng cách sử dụng Google Font package mà Google cung cấp.
```
const Text(
  "Text on the screen",
  style: TextStyle(
    color: Colors.amber,
    fontSize: 16,
    wordSpacing: 3,
  ),
),
```
Như bạn thấy, chỉ cần đọc hiểu tiếng anh là hoàn toàn chúng ta có khả năng tùy chính cái Widget cơ bản nhất của Flutter. 
### **Row**
Widget này sẽ sắp xếp các children của nó theo trục hoành – đúng như cái tên của nó. Nó được sử dụng rộng rãi và rất thường xuyên. Trong Widget này, bạn có thể tùy ý đặt nhiều Widget khác nhau ở trong nó, miễn là bạn vẫn muốn xếp chúng theo hàng dọc. Thứ tự đặt vào trong children sẽ ảnh hưởng tới thứ tự các Widget đó xuất hiện trên màn hình.
```
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: const [
    Text('Hello'),
    Text('Flutter!'),
    Text('!!'),
  ],
)
```
Kết quả các bạn tự kiểm nghiệm nhé :D, tham số children thì khá dễ hình dung rồi, nhuwg còn mainAxisAligment thì sao nhỉ, cùng đi qua một vài hình ảnh minh họa trực tiếp nhé.
•	mainAxisAligment : MainAxisAligment.center . Giá trị truyền vào là center nó sẽ sắp xếp các items ở giữa hàng :
![](https://images.viblo.asia/f478810a-409d-4c4b-8353-b9717788d449.png)

 
•	mainAxisAligment : MainAxisAligment.start. Giá trị truyền vào là start nó sẽ sắp xếp các phần tử con tại vị trí bắt đầu của row đó
![](https://images.viblo.asia/1608f9d2-2313-48e6-aae6-931260a1bcd3.png)

 
•	mainAxisAligment : MainAxisAligment.end. giá trị truyền vào của end-ngược với start, các phần tử sẽ được sắp xếp ở cuối row.
![](https://images.viblo.asia/0a64c9bb-6ae8-4e47-b72e-536ec913efe5.png)

 
•	mainAxisAligment : MainAxisAligment.spaceAround. Các phần tử sẽ được tính toán cách đều nhau, đồng lời cũng cách 2 lề một khoảng bằng như vậy
![](https://images.viblo.asia/c90d7985-265a-444e-a1d7-0c8c0a6e264e.png)

 
•	mainAxisAligment : MainAxisAligment.spaceBetween. Các phần tử cách đều nhau, phần tử đầu và phần tử cuối sẽ ở 2 lề của row đó.
![](https://images.viblo.asia/b10d81a4-d29a-43cd-b578-7e1b129e9547.png)

 
### **Column**
Thay vì sắp xếp các phần tử theo chiều ngang như Row, Column sắp xếp các phần tử theo chiều dọc, và cách sử dụng quá giống với Row, nên mình sẽ không đề cập nữa. Mình sẽ để một vài hình ảnh minh họa cho mainAxisAligment của Column.
![](https://images.viblo.asia/d3d48fd1-a12d-4920-8fa3-359c1968fe0a.png)

 
Một điểm chú ý dành cho cả Column và Row là 2 Widget này không thể scroll được. Chúng sẽ gặp lỗi runtime overflows khi các widget bên trong chúng vượt quá chiều dài-cao mà chúng được cấp.
### **ListView**
Đây là Widget khá giống với Column, nhưng nó cung cấp hành vi cuộn nội dung khi chúng lớn hơn kích thước mà chúng ta cấp cho ListView.
```
child: ListView(
  children: const [
    Text('Hello'),
    Text('Flutter!'),
    Text('!!'),
  ],
),
```
Các Widget bên trong ListView sẽ mặc định scroll theo chiều dọc và tất nhiên, chúng ta có thể tùy biến chiều scroll của ListView với scrollDirection. Ví dụ như bạn muốn scroll nó theo chiều ngang chẳng hạn :
```
ListView(
  scrollDirection: Axis.horizontal,
),
```
Khi nội dung của mỗi phần tử trong ListView đã được xác định trước, ví dụ nó là một Text, Column,… mà các phần tử chỉ khác nhau ở vị trí mỗi phần tử( vị trí của các phần tử trong ListView bắt đầu từ 0). Thì ListView cung cấp cho chúng ta một cách để tạo nên ListView đó, nó là ListView.builder(…). 
```
ListView.builder(
  itemCount: 100,
  itemBuilder: (context, index) {
    return Text('Vị trí thứ $index}');
  },
),
```
Như ví dụ trên, thay vì ngồi mò mẫm viết 100 cái Text thì chúng ta có thể dùng ListView.builder(…) để nó tự động gen ListView cho chúng ta.
### **Container**
Các Widget vừa rồi thật thiếu sót khi chúng ta không thể set chiều cao, chiều rộng tối đa cho chúng. Để bổ xung cho điều này, chúng ta có Container. Widget này giúp chúng ta liên tưởng tới thẻ <div></div> ở trong HTML, Widget này sẽ có tác dụng trang trí, định vị, chỉnh kích cỡ, bo tròn, … cho các Widget khác.

![](https://images.viblo.asia/c2476a4f-3d7e-4464-868e-808f6d6f73fd.png)

 
Đây đồng thời là Widget 1 cha-1 con. Khá là dễ sử dụng khi chúng ta muốn trang trí bên ngoài cho các Widget khác. Mặc dù bên trong có rất nhiều thuộc tính khó sử dụng(nhưng bạn yên tâm, hiếm khi nào chúng ta sử dụng hết được đống thuộc tính này).
```
Container(
    height: 80,
    width: 260,
    color: Colors.blueGrey,
    alignment: Alignment.center,
    child: const Text('Containers!',
        style: TextStyle(color: Colors.white, fontSize: 25))
),
```
Để giải thích cho Widget này, hãy đi qua ví dụ trên. Container này định nghĩa một cái khung, mà cái khung này có chiều cao 80, chiều rộng 260, màu background của nó là màu xám. Bên trong chứa 1 thẻ Text được căn ra giữa Widget nhờ thuốc tính alignment.
### **Stack và Positioned**
Nhờ có Stack, chúng ta có thể xếp chồng Widget này lên Widget khác, và định vị vị trí của các Widget đó bằng Positioned.
![](https://images.viblo.asia/688c67d4-4cfe-47f5-ab38-8a066d25e39f.png)

 
Ví dụ như :
```
Stack(
    children: [
      Container(
          width: 40,
          height: 40,
          decoration: const BoxDecoration(
              color: Colors.red
          )
      ),
      const Text('Hello'),
    ]
),
```
Kết quả của đoạn code này chúng ta sẽ có một đoạn Text nằm xếp lên trên một Container có màu đỏ, đoạn Text này sẽ nằm ở trên cùng, bên trái của Container đó.
Vậy chúng ta muốn thay đổi vị trí của đoạn Text thì sẽ làm thế nào? Câu trả lời là sử dụng Widget Positioned, cách dùng cũng rất đơn giản như sau :
```
Stack(
    children: [
      Container(
          width: 40,
          height: 40,
          decoration: const BoxDecoration(
              color: Colors.red
          )
      ),
      const Positioned(
        top: 20,
        left: 20,
        child: Text('Hello'),
      )
    ]
),
```
Kết quả của đoạn code này thì như trên :D, nhưng thay vì đoạn Text nằm ở vị trí mặc định, nó sẽ di chuyển về phía cách top theo chiều từ trên xuống 1 đoạn 20, và left theo chiều từ trái sang phải 1 đoạn 20. Nếu muốn theo chiều ngược lại, hãy sử dụng giá trị âm.
### **Lời kết**
Do mình muốn gói gọn về cơ bản của Widget, nên bài viết có vẻ hơi dài, đọc đến đây thì hãy thử lại từng đoạn code kia nhé.  Cảm ơn các bạn đã đọc bài =)))