Codelab này dạy cho bạn cách viết mã bất đồng bộ bằng cách sử dụng Future, từ khóa async và await. Sử dụng các trình soạn thảo DartPad, bạn có thể kiểm tra kiến thức của mình bằng cách chạy mã ví dụ và hoàn thành các bài tập.

Codelab này bao gồm các tài liệu sau đây:

- Cách thức và thời điểm sử dụng async và await từ khóa.
- Cách sử dụng async và await ảnh hưởng đến thứ tự thực hiện.
- Cách xử lý lỗi từ cuộc gọi bất đồng bộ bằng cách sử dụng biểu thức try-catch trong các hàm bất đồng bộ.

## Tại sao mã bất đồng bộ lại quan trọng
Các tác vụ bất đồng bộ cho phép chương trình của bạn hoàn thành công việc trong khi chờ một tác vụ khác kết thúc. Dưới đây là một số tác vụ bất đồng bộ phổ biến:

* Lấy dữ liệu qua mạng.
* Viết vào cơ sở dữ liệu.
* Đọc dữ liệu từ một tập tin.
Để thực hiện các tác vụ bất đồng bộ trong Dart, bạn có thể sử dụng lớp Future và từ khóa async và await.

### Ví dụ: Sử dụng hàm bất đồng bộ sai cách
Ví dụ sau đây cho thấy cách sử dụng hàm bất đồng bộ ( fetchUserOrder() ) sai. Sau đó, bạn sẽ sửa ví dụ bằng cách sử dụng async và await . Trước khi chạy ví dụ này, hãy thử phát hiện vấn đề - bạn nghĩ output sẽ là gì?
```
// This example shows how *not* to write asynchronous Dart code.

String createOrderMessage () {
  var order = fetchUserOrder();
  return 'Your order is: $order';
}

Future<String> fetchUserOrder() {
  // Imagine that this function is more complex and slow
  return Future.delayed(Duration(seconds: 4), () => 'Large Latte');
}

void main () {
  print(createOrderMessage());
}
```

Đây là lý do tại sao ví dụ trên không thể in giá trị mà fetchUserOrder() cuối cùng tạo ra:

* fetchUserOrder() là một hàm bất đồng bộ, sau một khoảng thời gian sẽ trả về một chuỗi mô tả thứ tự của người dùng.
* Để nhận đơn đặt hàng của người dùng, createOrderMessage() nên gọi fetchUserOrder() và đợi cho đến khi kết thúc. Bởi vì createOrderMessage() không đợi fetchUserOrder() kết thúc, createOrderMessage() không nhận được giá trị chuỗi mà cuối cùng fetchUserOrder() cung cấp.
* Thay vào đó, createOrderMessage() sẽ thể hiện công việc đang chờ xử lý: một Future chưa hoàn thành.
* Vì createOrderMessage() không nhận được giá trị mô tả đơn đặt hàng của người dùng, nên ví dụ này không thể in ra kết quả và thay vào đó in ra “Your order is: Instance of ‘_Future'"

Những điều cần nhớ:

>* **Tác vụ đồng bộ** : Một tác vụ đồng bộ ngăn chặn các tác vụ khác thực hiện cho đến khi hoàn thành.
>* **Hàm đồng bộ** : Một hàm đồng bộ chỉ thực hiện các tác vụ đồng bộ.
>* **Tác vụ bất đồng bộ** : Sau khi được bắt đầu, một tác vụ bất đồng bộ cho phép các tác vụ khác thực hiện trước khi hoàn thành.
>* **Hàm bất đồng bộ** : Hàm bất đồng bộ thực hiện ít nhất một tác vụ bất đồng bộ và cũng có thể thực hiện các tác vụ đồng bộ .

## Future
Future đại diện cho kết quả của một tác vụ bất đồng bộ và có thể có hai trạng thái: chưa hoàn thành hoặc hoàn thành.

> Lưu ý: Chưa hoàn thành là một thuật ngữ Dart đề cập đến trạng thái của một Future trước khi nó tạo ra một giá trị.

### Chưa hoàn thành
Khi bạn gọi một hàm bất đồng bộ, nó sẽ trả về một Future chưa hoàn thành. Future đó đang chờ tác vụ bất đồng bộ của hàm kết thúc hoặc đưa ra lỗi.

### Đã hoàn thành
Nếu tác vụ bất đồng bộ thành công, Future hoàn thành với một giá trị. Nếu không, nó hoàn thành với một lỗi.

### Hoàn thành với một giá trị
Future của loại Future<T> hoàn thành với giá trị của loại T. Ví dụ: một Future với loại Future<String> tạo ra một giá trị String. Nếu một Future không tạo ra giá trị có thể sử dụng, thì loại Future<void> là Future<void> .

### Hoàn thành với một lỗi
Nếu tác vụ bất đồng bộ được thực hiện bởi hàm không thành công vì bất kỳ lý do gì, Future sẽ hoàn thành với một lỗi.

### Ví dụ: Giới thiệu Future
Trong ví dụ sau, fetchUserOrder() trả về một Future hoàn thành sau khi in ra console. Vì nó không trả về giá trị có thể sử dụng, fetchUserOrder() có loại Future<void> . Trước khi bạn chạy ví dụ, hãy thử dự đoán cái nào sẽ in ra trước:
```
Future<void> fetchUserOrder() {
  // Imagine that this function is fetching user info from another service or database
  return Future.delayed(Duration(seconds: 3), () => print('Large Latte'));
}

void main() {
  fetchUserOrder();
  print('Fetching user order...');
}
```

Trong ví dụ trước, mặc dù fetchUserOrder() thực thi trước print() ở dòng 8, console hiển thị đầu ra từ dòng 8 (“Fetching user order…”) trước kết quả của fetchUserOrder() (“Large Latte”) . Điều này là do fetchUserOrder() bị trì hoãn.

### Ví dụ: Hoàn thành với một lỗi
Chạy ví dụ sau để xem Future hoàn thành như thế nào với một lỗi.
```
Future<void> fetchUserOrder() {
// Imagine that this function is fetching user info but encounters a bug
  return Future.delayed(Duration(seconds: 3), () => throw Exception('Logout failed: user ID is invalid'));
}

void main() {
  fetchUserOrder();
  print('Fetching user order...');
}
```

Trong ví dụ này, fetchUserOrder() hoàn thành với một lỗi cho biết ID người dùng không hợp lệ.

Ta đã tìm hiểu về Future và cách chúng hoàn thành, nhưng sử dụng kết quả của các hàm bất đồng bộ như thế nào? Trong phần tiếp theo, ta sẽ tìm hiểu cách nhận kết quả với từ khóa async và await.

Đánh giá nhanh:

> * Future<T> tạo ra giá trị của kiểu T
> * Nếu một Future không tạo ra giá trị có thể sử dụng, thì dùng kiểu Future<void>.
> * Một Future có thể ở một trong hai trạng thái: chưa hoàn thành hoặc đã hoàn thành.
> * Khi bạn gọi một hàm trả về một Future, hàm sẽ xếp hàng công việc sẽ được thực hiện và trả về một Future chưa hoàn thành.
> * Khi tác vụ của một Future kết thúc, Future hoàn thành với một giá trị hoặc có lỗi.

## Làm việc với Future: async và await
Các từ khóa async và await cung cấp một cách khai báo để xác định các hàm bất đồng bộ và sử dụng các kết quả của chúng. Hãy nhớ hai nguyên tắc cơ bản này khi sử dụng async và await :

* Để định nghĩa một hàm là async, hãy thêm async trước thân hàm
* Từ khóa await chỉ hoạt động trong các hàm async .
Dưới đây là một ví dụ chuyển đổi hàm main() từ hàm đồng bộ sang hàm bất đồng bộ.

Đầu tiên, thêm từ khóa async trước thân hàm:

```
void main() async { ··· }
```
Nếu hàm có kiểu trả về được khai báo, thì hãy cập nhật loại thành Future<T> , trong đó T là loại giá trị mà hàm trả về. Nếu hàm không trả về giá trị một cách rõ ràng, thì kiểu trả về là Future<void> :

```
Future<void> main() async { ··· }
```
Bây giờ bạn có chức năng bất đồng bộ, bạn có thể sử dụng từ khóa await để chờ Future hoàn tất:

```
print(await createOrderMessage());
```
Như hai ví dụ sau đây cho thấy, từ khóa async và await dẫn đến mã bất đồng bộ trông rất giống mã đồng bộ. Sự khác biệt duy nhất được làm nổi bật trong ví dụ sau:

**Ví dụ: các hàm đồng bộ**
```
String createOrderMessage() {
  var order = fetchUserOrder();
  return 'Your order is: $order';
}

Future<String> fetchUserOrder() =>
    // Imagine that this function is
    // more complex and slow.
    Future.delayed(
      Duration(seconds: 2),
      () => 'Large Latte',
    );

void main() {
  print('Fetching user order...');
  print(createOrderMessage());
}
```
Kết quả
```
Fetching user order...
Your order is: Instance of _Future<String>
```
    
**Ví dụ: các hàm bất đồng bộ**
```
Future<String>  createOrderMessage() async {
  var order = await fetchUserOrder();
  return 'Your order is: $order';
}

Future<String>  fetchUserOrder() =>
    // Imagine that this function is
    // more complex and slow.
    Future.delayed(
      Duration(seconds: 2),
      () => 'Large Latte',
    );

Future<void>  main() async {
  print('Fetching user order...');
  print(await createOrderMessage());
}
```
Kết quả
```
Fetching user order...
Your order is: Large Latte
```
    
Ví dụ bất đồng bộ khác nhau theo ba cách:

* Kiểu trả về cho createOrderMessage() thay đổi từ String thành Future<String> .
* Từ khóa async xuất hiện trước thân hàm của createOrderMessage() và main() .
* Từ khóa await xuất hiện trước khi gọi các hàm bất đồng bộ fetchUserOrder() và createOrderMessage() .

    
**Những điều cần nhớ:**

> * async : Bạn có thể sử dụng từ khóa async trước phần thân của hàm để đánh dấu nó là bất đồng bộ.
> * Hàm async : Hàm async là một hàm được gắn nhãn với từ khóa async .
> * await : Bạn có thể sử dụng từ khóa await để có được kết quả hoàn thành của một biểu thức bất đồng bộ. Từ khóa await chỉ tác vụ trong một chức năng async .
    
### Luồng thực thi với async và await
Hàm async chạy đồng bộ cho đến khi gặp từ khóa await đầu tiên. Điều này có nghĩa là trong một thân hàm async , tất cả mã đồng bộ trước khi từ khóa await đầu tiên thực thi ngay lập tức.

> Ghi chú phiên bản: Trước Dart 2.0, một hàm async trả về ngay lập tức mà không thực thi bất kỳ mã nào trong thân hàm async .

### Ví dụ: Thực thi trong các hàm async
Chạy ví dụ sau để xem cách tiến hành thực hiện trong thân hàm async . Bạn nghĩ output sẽ là gì?
```
void printOrderMessage () async {
  print('Awaiting user order...');
  var order = await fetchUserOrder();
  print('Your order is: $order');
}

Future<String> fetchUserOrder() {
  // Imagine that this function is more complex and slow.
  return Future.delayed(Duration(seconds: 4), () => 'Large Latte');
}

Future<void>main() async {
  countSeconds(4);
  await printOrderMessage();
}

// You can ignore this function - it's here to visualize delay time in this example.
void countSeconds(s) {
  for( var i = 1 ; i <= s; i++ ) {
      Future.delayed(Duration(seconds: i), () => print(i));
   }
}
```

Sau khi chạy mã trong ví dụ trước, hãy thử đảo ngược dòng 2 và 3:

```
var order = await fetchUserOrder();
print('Awaiting user order...');
```
Lưu ý rằng thời gian của các output thay đổi, bây giờ, `print('Awaiting user order')` xuất hiện sau từ khóa await đầu tiên trong `printOrderMessage()` .

## Xử lý lỗi
Để xử lý lỗi trong hàm bất đồng bộ, hãy sử dụng try-catch:

```
try {
  var order = await fetchUserOrder();
  print('Awaiting user order...');
} catch (err) {
  print('Caught error: $err');
}
```
Trong hàm async , bạn có thể viết các câu lệnh catch giống như cách bạn làm trong mã đồng bộ.

Ví dụ: async và await với try-catch
Chạy ví dụ sau để xem cách xử lý lỗi từ hàm bất đồng bộ. Bạn nghĩ output sẽ là gì?
```
void printOrderMessage () async {
  try {
    var order = await fetchUserOrder();
    print('Awaiting user order...');
    print(order);
  } catch (err) {
    print('Caught error: $err');
  }
}

Future<String> fetchUserOrder() {
  // Imagine that this function is more complex.
  var str = Future.delayed(Duration(seconds: 4), () => throw 'Cannot locate user order');
  return str;
}

Future<void> main() async {
  await printOrderMessage();
}
```

Nguồn: https://dart.dev/codelabs/async-await