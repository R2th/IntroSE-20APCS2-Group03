# Giới thiệu

Container là một trong số những widget hay được sử dụng nhất khi code UI trong flutter nên mình sẽ giới thiệu về các thuộc tính của nó mà chúng ta hay sử dụng.

Container widget chứa một child widget và một số thuộc tính tiện ích khác, các bạn có thể xem chi tiết doc tại link dưới

https://api.flutter.dev/flutter/widgets/Container-class.html

Giờ chúng ta cùng đi vào xem container có gì nhé

# Container

Trước tiên là khởi tạo một container. 

```dart
main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        color: Colors.green,
      ),
    );
  }
}
```

## width & height

Định nghĩa kích thước của container

```dart
      child: Container(
        color: Colors.green,
        width: 200,
        height: 300,
      )
```

## child

Nếu không có child thì container sẽ có kích thước lớn nhất có thể. Nếu có child thì container sẽ theo kích thước child của nó.

### Container không có child

```dart
      child: Container(
        color: Colors.green,
      ),
```

![](https://images.viblo.asia/771edfdd-921f-489d-a637-7db28b2e701e.png)

### Container có child

```dart
    return Center(
      child: Container(
        color: Colors.green,
        child: Text(
          'Hello container',
          textDirection: TextDirection.ltr,
        ),
      ),
    );
```

![](https://images.viblo.asia/73921935-a2df-46d8-9376-6311c592cd1b.png)

một ví dụ khác nhé

```dart
    return Center(
      child: Container(
        color: Colors.green,
        child: SizedBox(
          width: 200,
          height: 300,
        ),
      ),
    );
```

![](https://images.viblo.asia/49e94322-4c11-433e-b802-96d992f4b87b.png)

## color

Sử dụng [Color class](https://api.flutter.dev/flutter/dart-ui/Color-class.html) hoặc [Colors class](https://api.flutter.dev/flutter/material/Colors-class.html) để thêm **background color** cho container.

```dart
      child: Container(
        color: Colors.green,
        child: SizedBox(
          width: 200,
          height: 300,
        ),
      )
```

hoặc
```dart
      child: Container(
        color: Color.fromARGB(255, 0, 0, 255),
        child: SizedBox(
          width: 200,
          height: 300,
        ),
      )
```

## aligment

Sử dụng thuộc tính aligment để đặt vị trí cho child widget của container

Các class có thể dùng làm giá trị của aligment là:

- [Aligment](https://api.flutter.dev/flutter/painting/Alignment-class.html) sử dụng hệ tọa độ với điểm gốc (0, 0) là center của container
- [AlignmentDirectional](https://api.flutter.dev/flutter/painting/AlignmentDirectional-class.html) sử dụng hệ tọa độ với điểm gốc (0, 0) là center của container, tuy nhiên phụ thuộc vàochiều viết, ví dụ ltr thì start ở bên trái và end bên phải, rtl thì start ở bên phải và end ở bên trái
- [FractionalOffset](https://api.flutter.dev/flutter/painting/FractionalOffset-class.html) sử dụng hệ tọa độ với điểm gốc (0, 0) là top left của container

### Aligment

Bạn có thể tạo mới Aligment với giá trị x, y mong muốn hoặc sử dụng các hằng số có sẵn.

```dart
      child: Container(
        color: Colors.green,
        child: Text(
          'Hello container',
          textDirection: TextDirection.ltr,
        ),
        alignment: Alignment(-1, -1),
      )
```

```dart
      child: Container(
        color: Colors.green,
        child: Text(
          'Hello container',
          textDirection: TextDirection.ltr,
        ),
        alignment: Alignment.centerLeft,
      )
```

Chi tiết về giá trị x, y của `Aligment` các bạn có thể xem tương ứng như trong hình bên dưới

![](https://images.viblo.asia/6e5dfccc-d296-472a-a222-ca132445a271.jpg)

### AlignmentDirectional

Tương tự aligment chúng ta cũng có 2 cách là tạo mới AlignmentDirectional với giá trị x, y mong muốn hoặc sử dụng các hằng số có sẵn.

```dart
      child: Container(
        color: Colors.green,
        child: Text(
          'Hello container',
          textDirection: TextDirection.ltr,
        ),
        alignment: AlignmentDirectional(-1, -1).resolve(TextDirection.ltr),
      )
```

```dart
      child: Container(
        color: Colors.green,
        child: Text(
          'Hello container',
          textDirection: TextDirection.ltr,
        ),
        alignment: AlignmentDirectional.centerStart.resolve(TextDirection.ltr),
      )
```

Chi tiết về giá trị x, y của `AlignmentDirectional` với `TextDirection.ltr` và `TextDirection.ltr`  các bạn có thể xem tương ứng như trong hình bên dưới

![](https://images.viblo.asia/53d17e24-55b8-4d98-a666-5b9f3ff50cfb.jpg)

### FractionalOffset

Tương tự aligment chúng ta cũng có 2 cách là tạo mới FractionalOffset với giá trị x, y mong muốn hoặc sử dụng các hằng số có sẵn.

```dart
      child: Container(
        color: Colors.green,
        child: Text(
          'Hello container',
          textDirection: TextDirection.ltr,
        ),
        alignment: FractionalOffset(0.5, 0),
      )
```

```dart
      child: Container(
        color: Colors.green,
        child: Text(
          'Hello container',
          textDirection: TextDirection.ltr,
        ),
        alignment: FractionalOffset.bottomCenter,
      )
```

Chi tiết về giá trị x, y của `FractionalOffset` các bạn có thể xem tương ứng như trong hình bên dưới

![](https://images.viblo.asia/d22737c5-0325-429f-a700-7e9adc3aac8e.jpg)

## constraints

Thuộc tính `constraints` định nghĩa ràng buộc về kích thước của `container`. Thường chúng ta sẽ sử dụng `BoxConstraints`.

Như phần trên chúng ta đã nói thì khi không có child thì container sẽ có kích thước lớn nhất có thể, tuy nhiên khi thêm thuộc tính maxHeight và maxWidth thì nó sẽ bị giới hạn lại.

```dart
      child: Container(
        color: Colors.green,
        alignment: AlignmentDirectional.centerStart.resolve(TextDirection.ltr),
        constraints: BoxConstraints(
          maxHeight: 400,
          maxWidth: 300,
        ),
      )
```

![](https://images.viblo.asia/1bf2479e-b32b-48ed-bc51-337f7564bf4b.png)

Giờ tạo child widget thì child sẽ không thể vượt quá size của container và bị cắt

```dart
      child: Container(
        color: Colors.green,
        child: Text(
          'Hello container',
          style: TextStyle(fontSize: 140),
          textDirection: TextDirection.ltr,
        ),
        alignment: AlignmentDirectional.centerStart.resolve(TextDirection.ltr),
        constraints: BoxConstraints(
          maxHeight: 400,
          maxWidth: 300,
        ),
      )
```

![](https://images.viblo.asia/ed684a67-2b4d-45ba-9b3c-b061c0a7a519.png)

## margin & padding

Định nghĩa khoảng cách giữa biên của container với parent bằng margin và với child bằng padding

![](https://images.viblo.asia/ce6e000b-a4de-4385-8447-2d5d7c3490a5.png)


Có nhiều cách để định nghĩa margin và padding với EdgeInsets nên mình sẽ nêu ví dụ một số case hay dùng

```dart
        margin: EdgeInsets.symmetric( // margin theo direction
          vertical: 20,
          horizontal: 30,
        ),
        margin: EdgeInsets.fromLTRB(left, top, right, bottom) // margin cả 4 biên với giá trị chỉ định
        padding: EdgeInsets.all(20), // padding tất cả các biên
        padding: EdgeInsets.only(left: 20) // padding biên chỉ định
```

![](https://images.viblo.asia/cf1b322f-c498-4f25-b0af-0cc4fa189ffc.png)

## decoration & foregroundDecoration

Gán một số thuộc tính về UI cho container, thứ tự ưu tiên của decoration và child được mô tả như hình vẽ dưới.

![](https://images.viblo.asia/e107a876-bfea-4a97-92ac-135ae7d0f654.png)

Thông thường chúng ta sẽ dùng `BoxDecoration` ở đây nên mình sẽ giới thiệu các bạn một số thuộc tính của `BoxDecoration` mà chúng ta sẽ hay sử dụng đến.

### BoxDecoration

#### color

Sử dụng để set color cho box, dùng Color class hoặc Colors class giống như container

```dart
        decoration: BoxDecoration(
            color: Colors.blue,
        )
```

#### image

Dùng image để làm background cho box, image sẽ nằm trên color

```dart
      child: Container(
        width: 200,
        height: 300,
        decoration: BoxDecoration(
          color: Colors.blue,
          image: DecorationImage(
            fit: BoxFit.fitWidth,
            image: NetworkImage(
              'https://flutter.io/images/catalog-widget-placeholder.png',
            ),
          ),
        ),
      )
```

![](https://images.viblo.asia/86d2c9cc-d8e7-4eb9-af3e-27217adfdc73.png)


#### border

Set border cho box

```dart
      child: Container(
        width: 200,
        height: 300,
        decoration: BoxDecoration(
          color: Colors.blue,
          image: DecorationImage(
            fit: BoxFit.fitWidth,
            image: NetworkImage(
              'https://flutter.io/images/catalog-widget-placeholder.png',
            ),
          ),
          border: Border.all(
            width: 10,
            color: Colors.green,
          ),
        ),
      )
```

![](https://images.viblo.asia/82dc73eb-efbe-43bd-8f51-b2e8f29c4d87.png)

#### borderRadius

Set radius cho border của box

```dart
      child: Container(
        width: 200,
        height: 300,
        decoration: BoxDecoration(
          color: Colors.blue,
          image: DecorationImage(
            fit: BoxFit.fitWidth,
            image: NetworkImage(
              'https://flutter.io/images/catalog-widget-placeholder.png',
            ),
          ),
          border: Border.all(
            width: 10,
            color: Colors.green,
          ),
          borderRadius: BorderRadius.all(
            Radius.circular(20),
          ),
        ),
      )
```

#### shape

Set shape cho box, nhận giá trị `BoxShape.rectangle` hoặc `BoxShape.circle`

![](https://images.viblo.asia/4e7610d0-a9e7-4c8c-8ef4-1d2ebab6dc82.png)

#### boxShadow

Set shadow cho box

#### gradient

Set gradient background cho box

#### backgroundBlendMode

Chế độ trộng background ảnh hưởng tới decoration, foregroundDecoration, child của Container đó

## transform

Sử dụng thuộc tính này để thực hiện chuyển đổi container, truyền vào là Matrux class

```dart
      child: Container(
        width: 200,
        height: 300,
        decoration: BoxDecoration(
            color: Colors.blue,
        ),
        transform: Matrix4.rotationX(pi/4),
      )
```

![](https://images.viblo.asia/8a60db1a-974f-4b59-a5d0-6f4a9a6c9e62.png)


# Nguồn

https://medium.com/flutter-community/flutter-layout-cheat-sheet-5363348d037e

https://medium.com/jlouage/container-de5b0d3ad184

https://viziondary.com/flutter/ui/widgets/layout/multi-child/lam-quen-voi-container/