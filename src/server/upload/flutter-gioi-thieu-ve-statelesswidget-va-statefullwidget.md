![](https://images.viblo.asia/6fe632b5-5bbc-4d45-a45a-922cf40eb8e0.png)

Một ứng dụng Flutter là một sự kết hợp của nhiều widgets.
# 1. Widgets in Flutter
Các Flutter widgets được xây dựng từ framework hiện đại, được lấy ý tưởng từ React. Ý tưởng chính đó là bạn xây dựng UI dựa vào các widget. Các widgets sẽ mô tả khung nhìn của chúng ta trông như thế nào với cấu hình và trạng thái của chúng.  Khi trạng thái của widget thay đổi thì nó sẽ cập nhật cái mô  tả của nó và sẽ chuyển đổi trạng thái khi cần thiết. 

Có hai loại widgets: 

**Stateless Widget** và **Statefull Widget**. Cả hai widget này chỉ khác nhau ở một khía cạnh đó là khả năng reload của widget tại runtime.
Hãy cùng xem cụ thể hai loại này như thế nào nhé: 

# 2. StatelessWidget
Tạo một  Stateless bằng cách extends từ StatelessWidget như sau: 

```java
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Startup Name Generator',
      theme: ThemeData(
        primaryColor: Colors.white,
      ),
      home: RandomWords(),
    );
  }
}
```

Ở đây, khi extends StatelessWidget thì bạn phải override hàm **Widget build(BuildContext context)**, hàm này trả về một hoặc nhiều widget. Khi nào mà MyApp được khởi chạy thì nó sẽ gọi hàm *build()* và vẽ các widget được trả về từ hàm này. 

Lưu ý rằng, hàm *build()*  của StatelessWidget chỉ gọi một lần và không có bất kỳ sự thay đổi nào trong bất kỳ biến, giá trị hay sự kiện nào có thể gọi lại.

Để vẽ được Stateless Widget thì ta cần phải tạo một instance mới của  Widget.

# 3. StatefulWidget

Việc tạo ra StatefulWidget là một quá trình gồm hai bước. 

```java
class RandomwordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    return Scaffold();
  }
}

class RandomWords extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new RandomwordsState();
}
```

Đầu tiên, chúng ta cần tạo class để extends từ **StatefulWidget**.  Tuy nhiên, chúng ta không override lại hàm *build()*, thay vào đó là hàm *createState()*, hàm này trả về một instance của một class extends từ *State<>*. Nhìn vào class **RandomwordsState**, class này extends từ State<> và override hàm *build()*. 

Khi cần vẽ lại widget thì có hai hàm thường được xử lý, đó là *didUpdateWidget()* và *setState()* . Ở hàm thứ nhất, khi configuration bị thay đổi, Widget sẽ được thông báo về sự thay đổi này. Ta override lại phương thức *didUpdateWidget()* để bắt sự kiện trước khi Flutter build lại. Còn để thực hiện yêu cầu Widget thay đổi State, ta sử dụng phương thức *setState()*. Trong phương thức *setState()* có cho phép truyền vào một hàm. Lưu ý rằng chỉ có thể gọi đến hàm *setState()* sau khi Widget đã được gắn vào layout.


Để đáp ứng khả năng tùy biến(Mutability) thì Flutter đưa ra cú pháp này và yêu cầu bạn tạo StatefulWidget như thế này. Stateful Widget có thể được vẽ nhiều lần trong suốt vòng đời của nó. Điều này có nghĩa là hàm *build()* của class RandomwordsState có thể được gọi nhiều lần trong suốt vòng đời của nó, và trả về các widgets mới hoặc khác nhau dựa vào Variable(s), Value(s) hoặc Events(s).


Note một chút chỗ này: hai cách viết sau đây là tương đương nhau: 

```java
class RandomWords extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new RandomwordsState();
}
```
và 

```java
class RandomWords extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new RandomwordsState();
  }
}
```

Trên đây là những gì mình tìm hiểu được về StatelessWidget và StatefulWidget. Mong là sẽ hữu ích cho mọi người, :)
# 4.Tài liệu tham khảo
https://proandroiddev.com/flutter-a-hitchhiker-guide-to-stateless-and-stateful-widgets-cc9f9295253b