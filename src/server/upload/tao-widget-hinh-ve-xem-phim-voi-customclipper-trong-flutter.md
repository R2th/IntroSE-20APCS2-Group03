Gần đây mình có dạo qua các group lập trình React Native thì gặp khá nhiều bạn có thắc mắc về làm sao để tạo view hình ticket (vé xem phim) tương tự như thế này:

<div align="center">
    
![](https://images.viblo.asia/a30ca757-4891-49db-bce3-84be3b388519.png)

*Screenshot được lấy từ template [này](https://www.uplabs.com/posts/movie-booking-app-template) của bạn [Ayush Jangra](https://www.uplabs.com/ayushjangra)*

</div>

Các giải pháp của mọi người đưa ra cũng khá nhiều: Dùng ảnh làm background, tạo card như bình thường rồi dùng view có màu trùng với màu nền, để absolute để tạo các vết cắt,... Nhưng những phương pháp này không giải quyết được tất cả vấn đề như hiển thị shadow, responsive, dễ chỉnh sửa phía dev mà không qua designer,... 

React Native thì như vậy, thế còn Flutter liệu có giải quyết được vấn đề này không? Sau một thời gian tìm hiểu, mình nhận thấy Flutter có một thứ gọi là `CustomClipper` và `ClipPath`. Vậy tại sao không thử làm xem sao nhỉ :D

## Chuẩn bị nào

- Một project mới toanh tạo bằng lệnh: `flutter create ticketbox`
- Design: https://www.uplabs.com/posts/movie-booking-app-template
- Một chút toán học tọa độ đơn giản

Do không muốn chủ đề bị lạc trôi đi, mình chỉ demo phần ticket ở `Dropdown Screen` (như ảnh bên trên) thay vì cả màn hình nhé

## Bắt tay nghiên cứu thôi

Mình sẽ bỏ toàn bộ các widget không cần thiết của project mà Flutter đã tạo, chỉ giữ lại `Scaffold` và `Center` để cho gọn gàng nhé

```dart
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text("Đây sẽ là nơi hiển thị ticket")
      ),
    );
  }
}
```

Quay trở lại với design, hãy cùng phân tích view một chút nào

![](https://images.viblo.asia/e7fd8173-63c5-463b-9186-fb460e3d3948.png)


Đây là một số thông số mình đã đo, với `r` là bán kính. Vậy là border radius của 4 góc là 10, bán kính của 2 vết cắt 2 bên là 12.5, các đường tròn nhỏ là 5, khoảng cách giữa vết cắt và đường tròn nhỏ gần nhất là 18, cuối cùng là khoảng cách từ đỉnh trên đến vết cắt là 108 (tương đương 30% so với chiều dài ticket). Chúng ta chỉ dùng số 30% (0.3) này vì độ dài của ticket phụ thuộc vào parent nên chúng ta dùng tỉ lệ thay vì fix cứng để trông đẹp nhất.

Chúng ta có 2 hướng vẽ: Một là vẽ hình chữ nhật đỏ là path thứ nhất, các hình tròn xanh là path thứ 2 và sau đó dùng path thứ 2 để "đục lỗ" path thứ nhất; Hai là vẽ cả ticket trong 1 path và các hình tròn nhỏ là 1 path và "đục lỗ" như cách 1. Mình sẽ chọn cách 1 vì view này khá đơn giản, không cần thiết phải dùng path để vẽ từng đường mất thời gian và cần nhiều tính toán.

**Tạo painter**

Đầu tiên chúng ta sẽ phải tạo một Painter kế thừa `CustomClipper` để vẽ Ticket. Mình đặt tên nó là `TicketClipper`.
Hai hàm chúng ta bắt buộc phải override đó là `paint` và `shouldRepaint`. `shouldRepaint` sẽ quyết định xem khi nào nên vẽ lại ticket. Nếu bạn cần truyền vào params như màu sắc ticket, màu shadow, radius thì bạn sẽ phải check ở đây. Vì mình không có param nào nên mình sẽ tạm trả về `true`. Nơi chúng ta cần quan tâm nhất đó chính là hàm `paint`.

```dart
class TicketClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    var path = Path();

    return path;
  }

  @override
  bool shouldReclip(TicketClipper oldClipper) => false;
}
```

Cơ bản việc vẽ ticket này khá giống với SVG. Để vẽ ticket ta cần `Path`. Muốn vẽ được thì ta phải học vẽ những hình thù cơ bản, vì vậy chúng ta nên quan tâm: 
- class `Rect`: Chứa các thông số của một hình chữ nhật như chiều dài và chiều rộng. `Rect` cung cấp cho chúng ta rất nhiều phương thức để tạo hình chữ nhật như `Rect.fromLTWH` tạo hình chữ nhật theo tọa độ các cạnh top, left và chiều dài, chiều rộng; `Rect.fromCircle` để tạo hình chữ nhật bọc trong hình tròn cho trước,....
- class `RRect` Chứa các thông tin của một hình chữ nhật nhưng có thêm bo góc. Trong bài này để dễ nhất chúng ta sẽ dùng `RRect.fromRectAndRadius`
- `path.addRRect`: Vẽ một hình chữ nhật có bo góc, và border radius là `radius`
- `path.addOval`:  Vẽ một hình oval (hình elip) nằm trong hình chữ nhật cho trước
- `Path.combine`: Dùng để gộp 2 path thành một (gộp ở đây có thể là gộp 2 path thành một path liền mạch, dùng path này để bỏ một phần tương ứng ở path kia,...). Bạn nào có sử dụng các phần mềm design như Photoshop, Sketch sẽ biết rõ cái này :D 
- `size` truyền từ `getClip`: Chính là size của ticket gồm có 2 phần chúng ta quan tâm là `size.width` và `size.height`, size này phụ thuộc vào widget chứa nó

Ngoài ra còn có `moveTo`, `arcTo`, `lineTo`, `quadraticBezierTo`,... mà giới thiệu hết ở đây sẽ làm loãng bài mất nên các bạn chịu khó ngó qua doc nếu muốn tìm hiểu thêm nhé.

Trước tiên mình sẽ tạo biến chứa tọa độ Y của tâm đường tròn của vết cắt vì mình nghĩ nó sẽ dùng lại nhiều, đỡ phải tính toán lại :D
```dart
  ...
  Path getClip(Size size) {
    var path = Path();

    final clipCenterY = size.height * 0.3 + clipRadius;
    
    return path;
  }
  ...
```

Giờ hãy vẽ khung của cái ticket nào. Sử dụng `Rect.fromLTWH` để tạo một class chứa thông tin hình chữ nhật, dùng `Radius.circular` để tạo thông tin về radius (class `Radius` này có thể tạo được border tròn, cắt góc, ellipse,..., như design là tròn). Sau đó dùng `path.addRRect` để vẽ dựa trên các thông số đã tạo

```dart
    ...
    path.addRRect(RRect.fromRectAndRadius(
        Rect.fromLTWH(0, 0, size.width, size.height),
        Radius.circular(borderRadius),
    ));
    ...
```

Tiếp theo đó chúng ta sẽ tạo một path mới chứa thông tin của các vết cắt, trước tiên chúng ta sẽ tạo vết cắt lớn ở 2 bên trước nhé. Ở đây chúng ta dùng `Rect.fromCircle` để tạo khung cho hình tròn mình chuẩn bị tạo từ tọa độ tâm và bán kính hình tròn, dùng `fromCircle` sẽ dễ dàng hơn vì chúng ta có thông tin của tâm hình tròn và bán kính của nó. Đồng thời nhìn nó cũng hợp lí vì mình đang định vẽ hình tròn mà :D

```dart
    ...
    final clipPath = Path();

    // circle on the left
    clipPath.addOval(Rect.fromCircle(
      center: Offset(0, clipCenterY),
      radius: clipRadius,
    ));

    // circle on the right
    clipPath.addOval(Rect.fromCircle(
      center: Offset(size.width, clipCenterY),
      radius: clipRadius,
    ));
    ...
```

Bạn có thể dễ dàng nhìn ra được tọa độ của 2 vết cắt lớn này vì nó đều nằm ở sát 2 bên mép nên bên trái X sẽ là 0, bên phải X sẽ là width của ticket, Y đều là `clipCenterY` chúng ta đã tính từ trước.

Giờ đến các vết cắt tròn nhỏ ở giữa. Chúng ta có thể đo tọa độ từng đường tròn một rồi vẽ như trên. NHƯNG mình muốn số lượng đường tròn có thể dễ dàng thay đổi bằng cách truyền từ props vào thay vì ngồi đo lại và sửa code, nên chúng ta sẽ quay lại với cái ảnh ở trên

![](https://images.viblo.asia/e7fd8173-63c5-463b-9186-fb460e3d3948.png)

Đầu tiên mình khai báo tham số cho TicketClipper có thể nhận số lượng vết cắt nhỏ, và nhớ update `shouldReclip` để rerender lại khi tham số này thay đổi nhé.

```dart
    ...
    class TicketClipper extends CustomClipper<Path> {
      final int numberOfSmallClips;

      const TicketClipper({this.numberOfSmallClips});
        
      ...
      
      @override
      bool shouldReclip(TicketClipper old) => old.numberOfSmallClips != numberOfSmallClips;
    }
    ...
```

Nhìn lên trên hình mình có thể tính được lần lượt 
- Khoảng cách có thể render các vết cắt
- Khoảng trống mà một vết cắt có thể hiển thị (trên hình mình gọi là clipbox)
- Khoảng trống thừa (padding) của clipbox với vết cắt 

```dart
    ...
    // Khoảng cách từ vết cắt lớn đến các vết cắt nhỏ
    final clipPadding = 18
    
    // Bán kính của vết cắt
    final smallClipRadius = 5

    // Khoảng cách có thể render các vết cắt
    final clipContainerSize = size.width - clipRadius * 2 - clipPadding * 2;
    
    // Khoảng trống mà một vết cắt có thể hiển thị (trên hình mình gọi là clipbox)
    final smallClipBoxSize = clipContainerSize / numberOfSmallClips;
    
    // Khoảng trống thừa (padding) của clipbox với vết cắt 
    final smallClipPadding = (smallClipBoxSize - smallClipRadius * 2) / 2;
    ...
```

Tiếp sau đó mình sẽ tạo một array chứa thông tin của tọa độ các tâm của các vết cắt. Các bạn nhìn comment trong code và đối ứng với ảnh phía trên để hiểu rõ nhé.

```dart
    ...
    final smallClipCenterOffsets = List.generate(numberOfSmallClips, (index) {
      // tọa độ mép bên trái của clipbox
      // Vd như clipbox thứ 2 sẽ tính bằng cách: 
      // bán kính của vết cắt lớn + padding giữa vết cắt lớn và clipbox + width của clipbox thứ nhất
      final boxX = clipRadius + clipPadding + smallClipBoxSize * index;
        
      // Tọa độ tâm của clipbox (và cũng là tâm của vết cắt nhỏ, tính bằng cách:
      // tọa độ của box hiện tại + padding + radius của vết cắt nhỏ
      final centerX = boxX + smallClipPadding + smallClipRadius;

      return Offset(centerX, clipCenterY);
    });
    ...
```

Sau khi có tọa độ tâm rồi, chúng ta sẽ vẽ các vết cắt nhỏ này dựa vào tâm, cách vẽ thì tương tự với cách vẽ vết cắt lớn

```dart
    ...
    smallClipCenterOffsets.forEach((centerOffset) {
      clipPath.addOval(Rect.fromCircle(
        center: centerOffset,
        radius: smallClipRadius,
      ));
    });
    ...
```

Vậy là chúng ta đã có 2 path, `path` là hình sơ khai của ticket và `clipPath` là các vết cắt. Giờ chúng ta sẽ kết hợp 2 path này với nhau sử dụng `Path.combine`, với operation là `PathOperation.reverseDifference` để dùng `clipPath` "đục lỗ" `path`. Và cuối cùng dùng path kết quả này trả về để sử dụng

```dart
    ...
    final ticketPath = Path.combine(
      PathOperation.reverseDifference,
      clipPath,
      path,
    );
    
    return ticketPath;
    ...
```

Vậy là xong phần khó nhất rồi, giờ chúng ta sẽ sử dụng clipper này bằng `ClipPath` kết hợp `SizedBox`

```dart
    ...
    @override
    Widget build(BuildContext context) {
      final screenSize = MediaQuery.of(context).size;
      final ticketWidth = screenSize.width - margin * 2;
      final ticketHeight = ticketWidth * 1.02;

      return Scaffold(
        body: Center(
          child: ClipPath(
            clipper: TicketClipper(numberOfSmallClips: 13),
            child: Container(
              width: ticketWidth, 
              height: ticketHeight, 
              color: Colors.white,
              child: Center(child: Text('Hello')),
            ),
          ),
        ),
      );
    }
    ...
```

Vậy còn shadow thì sao nhỉ. Để có thêm shadow thì bạn sẽ phải sửa lại như này:

```dart
    return Scaffold(
      body: Center(
        child: Container(
          width: ticketWidth,
          height: ticketHeight,
          decoration: BoxDecoration(
            boxShadow: [
              BoxShadow(
                offset: Offset(0, 8),
                color: Colors.black.withOpacity(0.1),
                blurRadius: 37,
                spreadRadius: 0,
              ),
            ],
          ),
          child: ClipPath(
            clipper: TicketClipper(numberOfSmallClips: 13),
            child: Container(
              color: Colors.white, 
              child: Center(child: Text('Hello')),
            ),
          ),
        ),
      ),
    );
```

Vậy là xong rồi, bạn có thể làm gọn hơn bằng cách tách cả view ra một widget riêng để dùng lại dễ dàng hơn, hơn nữa các thông số như radius, padding, kích cỡ các vết cắt bạn có thể đẩy vào dưới dạng props như `numberOfSmallClips` để widget này dynamic hơn nữa nhé :D

## Kết quả

![](https://images.viblo.asia/654c4d7a-31a9-40cf-bcbe-f06f0cd05263.png)

Source code: https://github.com/scitbiz/flutter_demo_ticket_custom_clipper