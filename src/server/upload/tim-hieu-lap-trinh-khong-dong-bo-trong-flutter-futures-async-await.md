## 1. Tại sao tiến trình bất đồng bộ lại quan trọng 

Các tiến trình bất đồng bộ cho phép chương trình của bạn hoàn thành công việc trong khi đợi một tiến trình khác hoàn thành. Dưới đây chúng ta có một số tiến trình không đồng bộ phổ biến
* Lấy data từ trên mạng
* Ghi file vào database
* Đọc file từ database


Chúng ta hãy cùng xem ví dụ sau đây : 
   ```
    String createOrderMessage() {
      var order = fetchUserOrder();
      return 'Your order is: $order';
    }

    Future<String> fetchUserOrder() =>
        // Imagine that this function is more complex and slow.
        Future.delayed(
          const Duration(seconds: 2),
          () => 'Large Latte',
        );

    void main() {
      print(createOrderMessage());
    }
   ```
Khi chạy chương trình kia điều gì sẽ xảy ra => Your order is: Instance of '_Future<String>'<br>
Chương trình trên chạy fail do các lý do sau đây : <br> 
*   Hàm fetchUserOrder() là một hàm bất đồng bộ sau khi bị delay 2s nó sẽ trả về một chuỗi 'Large Latte'.
*    Bên trong hàm createOrderMessage() gọi đến hàm fetchUserOrder(). Do hàm createOrderMessage() không đợi cho hàm fetchUserOrder() thực hiện xong nên khi  return 'Your order is: $order'; giá trị order bị lỗi.
    
## **2. future là gì?**<br>
  future là ví dụ cho lớp [Future](https://api.dart.dev/stable/2.13.4/dart-async/Future-class.html). Một future là đại diện cho kết quả của một tiến trình bất đồng bộ và có hai trạng thái : chưa hoàn thành hoặc hoàn thành.

- Uncompleted : Khi bạn gọi một hàm bất đồng bộ, nó sẽ trả về một future Uncompleted, future đó đợi cho những hàm bất đồng bộ kết thúc hoặc ném ra lỗi.
- Completed : Nếu tiến trình bất đồng bộ hoàn thành , future sẽ hoàn thành với một giá trị . Nếu không nó hoàn thành với một lỗi.
- Hoàn thành với một giá trị 
    + Future<T> hoàn thành với một giá trị kiểu T. Ví dụ một future với kiểu Future<String> tạo ra một dữ liệu kiểu chuỗi .
    + Nếu future không cung cấp một kiểu dữ liệu nào 
    thì future đó có kiểu là Future<void>
    
    Ví dụ :
     ```
    String createOrderMessage() {
      var order = fetchUserOrder();
      return 'Your order is: $order';
    }

    Future<String> fetchUserOrder() =>
        // Imagine that this function is more complex and slow.
        Future.delayed(
          const Duration(seconds: 2),
          () => 'Large Latte',
        );

    void main() {
      print(createOrderMessage());
    }
    ```
- Hoàn thành với một lỗi 
    + Nếu một tiến trình bất đồng bộ thực hiện bởi một hàm lỗi  bởi lý bất kì lý do nào , thì future sẽ hoàn thành với một lỗi. Ví dụ :  
     ```
      Future<void> fetchUserOrder() {
    // Imagine that this function is fetching user info but encounters a bug
      return Future.delayed(const Duration(seconds: 2),
          () => throw Exception('Logout failed: user ID is invalid'));
    }

    void main() {
      fetchUserOrder();
      print('Fetching user order...');
    }
     ```
    
## **3. async và await**
 async và await là các từ khóa cung cấp cách khai báo cho các hàm bất đồng bộ và sử dụng lấy kết quả từ chúng. Khi sử dụng chúng cần lưu ý: <br>
    -  Để chỉ định một hàm không đồng bộ, thêm async trước thân hàm.<br>
    -  Từ khóa await chỉ thực hiện trong những hàm không đồng bộ.<br>
   Ví dụ ta sửa lại chương trình đầu tiên được nêu ra ở trên sao cho chương trình chạy đúng<br>
  ```
        Future<String> createOrderMessage() async {
          var order = await fetchUserOrder();
          return 'Your order is: $order';
        }

        Future<String> fetchUserOrder() =>
            // Imagine that this function is
            // more complex and slow.
            Future.delayed(
              const Duration(seconds: 2),
              () => 'Large Latte',
            );

        Future<void> main() async {
          print('Fetching user order...');
          print(await createOrderMessage());
        }
   ```
 Kết quả khi chạy chương trình là : Fetching user order...<br>
                                                              Your order is: Large Latte<br>
    Ví dụ trên khác với ví dụ đầu ở 3 điểm :<br>
*  Kiểu trả về của hàm createOrderMessage() từ String thành Future<String>.<br>
* Từ khóa async xuất hiện trong thân hàm createOrderMessage() và main().<br>
* Từ khóa await  xuất hiện khi gọi hàm bất đồng bộ fetchUserOrder() và createOrderMessage().
    
    
##    4. Xử lý lỗi trong các hàm bất đồng bộ <br>
   Để xử lý lỗi trong một hàm xử dụng từ khóa async chúng ta sử dụng try-catch; <br>
 ```
  Future<void> printOrderMessage() async {
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
  var str = Future.delayed(
      const Duration(seconds: 4),
      () => throw 'Cannot locate user order');
  return str;
}

Future<void> main() async {
  await printOrderMessage();
}
   ```
 Các bạn có thể thấy ở ví dụ trên ở hàm fetchUserOrder() sau khi hàm này được gọi và hoàn thành thì nó có bắn ra một exception. Khi gọi đến hàm này ở trong hàm printOrderMessge có sử dụng try catch nên có thể bắt được exception này.
##     **5. Tài liệu tham khảo**
 - https://dart.dev/codelabs/async-await