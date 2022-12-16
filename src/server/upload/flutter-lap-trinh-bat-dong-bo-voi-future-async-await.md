Vào thẳng chủ đề nhé các bạn, hôm nay mình đọc được một bài viết về lập trình bất đồng bộ trong Dart. Ôi cái chủ đề này nghe quen quen nhợ, ... ờm thì quen mà, java hay android đều có bất đồng bộ, ẻm này cũng có nhé. Trong bài này mình sẽ giới thiệu cho các bạn về futures, từ khóa *async* và *await*. Let's go!!

![](https://images.viblo.asia/ba179c49-fa8b-4d35-972c-88e75d9379bc.jpg)
# 1. Tại sao lập trình không đồng bộ lại quan trọng?
Các hoạt động không đồng bộ giúp cho chương trình của bạn hoàn thành công việc trong khi chờ hoạt động khác kết thúc. Một số ví dụ như là:
- Lấy data từ network.
- Ghi dữ liệu vào database.
- Đọc dữ liệu từ một file.

Dưới đây là một ví dụ không đúng về sử dụng hàm bất đồng bộ (*getUserOrder()*). Sau đó mình sẽ sửa lại ví dụ này sử dụng *async* và *await*. Hãy dự đoán kết quả khi đoạn code này được chạy nhé:
```
String createOrderMessage () {
  var order = getUserOrder(); 
  return 'Your order is: $order';
}

Future<String> getUserOrder() {
  // Imagine that this function is more complex and slow
  return Future.delayed(Duration(seconds: 4), () => 'Large Latte'); 
}

main () {
  print(createOrderMessage());
}
```

Kết quả sau khi chạy đoạn code trên là: 

```
I/flutter ( 5845): Your order is: Instance of 'Future<String>'
```

Và đây là lý do vì sao nó chạy sai:
- *getUserOrder()* là một hàm bất đồng bộ, sau khi delay thì mới lấy được order "Large Latte".
- Để lấy được order, hàm *createOrderMessage()* nên gọi tới *getUserOrder()* và chờ cho nó chạy xong. Nhưng ở đây thì *createOderMessage()* không chờ cho *getUserOder()* kết thúc nên nó lấy  sai giá trị string.
- Ở đây, *createOrderMessage()* nên tạo một thể hiện để chờ một công việc sẽ được hoàn thành trong tương lai. Mình sẽ tìm hiểu trong phần tiếp theo.

Chú ý một chút: 
- Synchoronous operation: một synchoronous operation chặn những hoạt động khác thực hiện cho đến khi nó hoàn tất.
- Synchoronous function: nó chỉ thực hiện các synchoronuos operation.
- Asynchoronous operation: nó cho phép các hoạt động khác được thực hiện trước khi nó hoàn thành.
- Asynchoronous function: nó thực hiện ít nhất một hoạt động không đồng bộ và có thể thực hiện các synchoronous operation.
# 2.  Future là gì?
Một future("f" viết thường) là một thể hiện của class [Future](https://api.dart.dev/stable/2.5.0/dart-async/Future-class.html) . Một future đại diện cho một hoạt động bất đồng bộ, và có thể có hai trạng thái: Uncompleted hoặc Completed.
- Uncompleted: khi bạn gọi một hàm không đồng bộ, nó trả về một uncompleted future. Future  này đang chờ cho các hoạt động không đồng bộ của hàm kết thúc hoặc trả về một error.
- Completed: nếu một hành động không đồng bộ thành công, future sẽ hoàn thành với một giá trị. Nếu không nó hoàn thành với một error.
    - Hoàn thành với một giá trị: một future của kiểu Future<T> hoàn thành với một giá trị thuộc kiểu T. Ví dụ, một future với kiểu Future<String> thì nó sẽ trả về một giá trị string. Nếu một future không cung cấp một kiểu giá trị nào thì kiểu của future là Future<void>.
    - Hoàn thành với một error: nếu một hoạt động bất đồng bộ được thực hiện bởi một hàm thất bại vì bất kỳ lý do gì thì future hoàn thành với một error.

    Ví dụ giới thiệu về future, bạn hãy dự đoán kết quả nhé, nó sẽ in ra dòng nào trước: "Large Latte" hay là "Fetching user order..."?
```
Future<void> getUserOrder() {
  // Imagine that this function is fetching user info from another service or database
  return Future.delayed(Duration(seconds: 3), () => print('Large Latte'));
}

main() {
  getUserOrder();
  print('Fetching user order...');
}
```
    
   Kết quả là: nó sẽ in ra "Fetching user order ... " sau 3 giây nó in ra tiếp "Large Latte"
    
```
Performing hot restart...
Syncing files to device Android SDK built for x86...
I/flutter ( 5845): Fetching user order...
Restarted application in 974ms.
I/flutter ( 5845): Large Latte
```
Tóm lược lại một chút: 
- Một thể hiện Future<T> cung cấp một giá trị kiểu T.
- Nếu một future không cung cấp một giá trị hữu dụng  thì kiểu của future là Future<void>.
- Một future có thể có một trong hai trạng thái: uncompleted hoặc completed.
- Khi một hoạt động của future kết thúc, future hoàn thành với một giá trị hoặc một error.
- future là một thể hiện của Dart Future class.

# 3.  Làm việc với futures: async và await
Hai từ khóa *async* và *await* cung cấp một cách khai báo để định nghĩa hàn bất đồng bộ. Có hai hướng dẫn cơ bản khi sử dụng *async* và *await* như sau:
- Để định nghĩa một hàn bất đồng bộ ta thêm từ khóa *async* trước thân hàm.
- Từ khóa *await* chỉ làm việc trong hàm *async*.
Ví dụ như sau: 
```
main() async {
    // do something
}
```
Hàm trên là không có kiểu trả về, Dart nó sẽ tự suy ra kiểu trả về. Với hàm có kiểu trả về cụ thể thì sao?, hãy xem đâyyyyy:
```
Future<Movie> getMovie(int id) async {
    // do something
}
```
Bây giờ bạn đã có hàm *async*, dùng *await* để chờ nó hoàn thành trong tương lai: `print(await createOrderMessage());`

Xem hai ví dụ dưới đây: 
    

|  |  | 
| -------- | -------- | 
|   ![](https://images.viblo.asia/d5aaa17b-600a-465f-bddb-f0d0f8217ca8.png)    |  ![](https://images.viblo.asia/49f51e7c-77fb-43a3-b112-224719f55988.png)     | 

Tóm lại: 
- **async**: Bạn có thể sử dụng từ khóa *async* trước thân hàm bất đồng bộ.
- **async function**: là một function được đánh dấu bởi từ khóa *async*.
- **await**: bạn có thể sử dụng từ khóa *await* để lấy kết quả từ một việc bất đồng bộ. Từ khóa *await* chỉ được sử dụng với hàm *async*.

Luồng thực thi với *async* và *await*: 
- Một hàm *async* chạy đồng bộ cho đến khi gặp từ khóa *await* đầu tiên. Có nghĩa là với một thân hàm *async*, tất cả code viết trước từ khóa *await* được chạy đồng bộ ngay lập tức.
- Trước Dart 2.0, một hàm *async* được trả về ngay lập tức, mà không thực thi bất kỳ code nào khác trong thân hàm *async*.

Ví dụ luồng thực thi với hàm *async*: 
```
import 'dart:async';

void createOrderMessage () async {
  print('Awaiting user order...');
  var order = await getUserOrder();
  print('Your order is: $order');
}

Future<String> getUserOrder() {
  // Imagine that this function is more complex and slow.
  return Future.delayed(Duration(seconds: 4), () => 'Large Latte');
}

main() async {
  countSeconds(4);
  await createOrderMessage();
}

// You can ignore this function - it's here to visualize delay time in this example.
void countSeconds(s) {
  for( var i = 1 ; i <= s; i++ ) { 
      Future.delayed(Duration(seconds: i), () => print(i));
   }
}
```
Kết quả sẽ là: 
```
Awaiting user order...
1
2
3
4
Your order is: Large Latte
```
Làm thử một bài sau đây nhé, chuẩn bị code nào:
    
- Hàm *reportUserRole()* được cho như dưới đây, thêm code cho hàm theo yêu cầu sau: 
    - Trả về một future thành công với chuỗi "*User role: <user role>*" . Bạn phải sử dụng giá trị thật được trả về từ hàm *getRole()*, hàm này trả về giá trị tùy ý. Ví dụ chuỗi trả về của hàm *reportUserRole()* là: "User role: tester".
    - Lấy user role bằng cách gọi hàm *getRole()*.
```
// Part 1
//You can call the provided async function getRole to return the user role
Future<String> reportUserRole() async {
  // your implementation here
}
```

So sánh kết quả nào: 
    
```
// Part 1
//You can call the provided async function getRole to return the user role
Future<String> reportUserRole() async {
  var name = await getRole();
  return 'User role: $name';
}

String getRolse()  => 'tester';
```
    
# 4.  Xử lý những lỗi xảy ra
Để xử lý lỗi trong hàm *async* ta sử dụng try-catch như sau:
```
try {
    var order = await getUserOrder();
    print('Awaiting user order...');
  } catch (err) {
    print('Caught error: $err');
  }
```
Với một hàm *async* thì bạn có thể viết khối lệnh *try-catch* giống như trong code ở hàm đồng bộ.
Ví dụ *async* và *await* với* try-catch*: 
Chạy thử ví dụ sau để biết được cách xử lý lỗi từ một hàm bất đồng bộ nhé. Đừng quên dự đoán xem kết quả sẽ là gì nhé!
```
void createOrderMessage () async {
  try {
    var order = await getUserOrder();
    print('Awaiting user order...');
    print(order);
  } catch (err) {
    print('Caught error: $err');
  }
}

Future<String> getUserOrder() {
  // Imagine that this function is more complex.
  var str = Future.delayed(Duration(seconds: 4), () => throw 'Cannot locate user order');
  return str;
}

main() async {
  await createOrderMessage();
}
```
Trên đây là những gì mình tìm hiểu được về *future*, *async* và *await*.  Đón chờ phần tiếp theo về Fluter nhé! :D