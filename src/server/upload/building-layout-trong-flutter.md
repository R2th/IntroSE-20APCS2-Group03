Bài viết sẽ hướng dẫn các bạn mới học Flutter hiểu về:
* Cách thức bố trí layout trong Flutter.
* Làm thế nào để bố trí layout theo chiều dọc và ngang.
* Làm thế nào để build layout trong Flutter.

Chúng ta sẽ build layout theo app này:

![](https://images.viblo.asia/e59e608a-3580-4f1f-bdf6-4e396d121529.jpg)

Bài này mình sẽ giải thích cách tiếp cận Flutter, về cách bố trí và chỉ ra cách đặt một widget trên màn hình. Sau đó sẽ giới thiệu một số widget layout thường dùng.

## Step 0: Tạo app base

Nếu bạn chưa [set up](https://flutter.dev/docs/get-started/install) môi trường, hãy làm theo bài hướng dẫn này:

1. [Tạo app Flutter "Hello World" cơ bản.](https://viblo.asia/p/viet-ung-dung-flutter-dau-tien-phan-1-LzD5drLdZjY)
2. Thay đổi app bar title và app title thành:

![](https://images.viblo.asia/f7350d64-3a16-4c17-a98b-5c4f9d4c9433.png)

## Step 1: Sơ đồ bố trí layout

Bước đầu tiên là break layout ra thành các thành phần cơ bản:

* Xác định các rows và columns.
* Layout có bao gốm grid không?
* Có các thành phần nằm chồng lên nhau không?
* Có tabs không?
* Chú ý các khu vực có alugnment, padding hoặc border.

Đầu tiên, xác định các thành phần to trước. Trong ví dụ dưới đây, 4 thành phần được xếp vào một column: 1 image, 2 rows, và 1 khối text.

![](https://images.viblo.asia/ff536660-d033-4b87-8263-5b1e44ff3819.png)

Tiếp theo, sơ đồ mỗi row. Row đầu tiên - Title - có 3 children: 1 text column, một icon sao, và một số. Thành phần con đầu tiên của nó là một column bao gồm 2 dòng text. Column đầu tiên chiếm rất nhiều không gian nên nó sẽ phải được bao trong widget Expanded.

![](https://images.viblo.asia/e625248c-b981-4f65-a124-480c2cc38ec3.png)

Row thứ 2 - Button - cũng có 3 children: Mỗi thành phần con là một column bao gồm icon và text.

![](https://images.viblo.asia/263eb47e-81f5-4614-a23d-e2c0d616b6b7.png)

Một khi layout đã được xác định, cách dễ nhất để implement là làm viết UI từ dưới lên trên. Để cho dễ nhìn và đỡ bị nhầm lẫn do lồng nhiều code, hãy đặt một số code trong các biến và function khác nhau.

## Step 2: Implement title row

Đầu tiên, bạn sẽ build column bên trái của khu vực title. Thêm đoạn code dưới đây ở trên cùng của hàm **build()** trong class **MyApp**:

```dart
Widget titleSection = Container(
  padding: const EdgeInsets.all(32),
  child: Row(
    children: [
      Expanded(
        /*1*/
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            /*2*/
            Container(
              padding: const EdgeInsets.only(bottom: 8),
              child: Text(
                'Oeschinen Lake Campground',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Text(
              'Kandersteg, Switzerland',
              style: TextStyle(
                color: Colors.grey[500],
              ),
            ),
          ],
        ),
      ),
      /*3*/
      Icon(
        Icons.star,
        color: Colors.red[500],
      ),
      Text('41'),
    ],
  ),
);
```
<br/>

**/*1*/** Đặt Column bên trong Expanded widget để column trải dài hết khoảng trống của row. Set thuộc tính **crossAxisAlignment** là **CrossAxisAlignment.start** để đặt column vào vị trí bắt đầu của row.

**/*2*/** Đặt row đầu tiên của text bên trong một Container cho bạn có khả năng padding. Child thứ 2 trong column cũng là text, hiển thị màu grey.

**/*3*/** 2 items cuối trong title row là star icon, màu đỏ và text "41". Cả row nằm trong một Container và cách mỗi cạnh 32 pixels.

![](https://images.viblo.asia/136b1150-34f4-4971-ad44-7064fd6af4ff.png)

## Step 3: Implement button row

Khu vực button row gồm 3 columns sử dụng chung layout - một icon nằm phía trên một row text. Columns trong row này cách đều nhau, text và icon chung màu primary color.

Code mỗi column giống hệt nhau, vì thế ta tạo một private method helper tên **buildButtonColumn**, nhận color, Icon và Text, return một column với những widget có màu là màu nhận được.

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // ···
  }

  Column _buildButtonColumn(Color color, IconData icon, String label) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(icon, color: color),
        Container(
          margin: const EdgeInsets.only(top: 8),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w400,
              color: color,
            ),
          ),
        ),
      ],
    );
  }
}
```

Hàm này thêm các icon trực tiếp vào column. Text nằm trong Container với margin top-only, chia cắt text với icon.

Đặt một row chứa những column bằng cách gọi function và truyền vào color, **Icon** và text xác định column đó. Căn chính columns theo main axis sử dụng **MainAxisAlignment.spaceEvenly** để sắp xếp khoảng trống đều nhau trước, trong và sau mỗi column. Thêm đoạn code dưới **titleSection** trong hàm **build()**:

```dart
Color color = Theme.of(context).primaryColor;

Widget buttonSection = Container(
  child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      _buildButtonColumn(color, Icons.call, 'CALL'),
      _buildButtonColumn(color, Icons.near_me, 'ROUTE'),
      _buildButtonColumn(color, Icons.share, 'SHARE'),
    ],
  ),
);
```

Thêm button section vào body:

![](https://images.viblo.asia/ea9ad2af-0d2a-43d7-8569-3fba68f28c74.png)

## Step 4: Implement text section

Chỉ định text section như là 1 biến. Đặt text trong Container và thêm padding mỗi cạnh. Thêm đoạn code dưới **buttonSection**:

```dart
Widget textSection = Container(
  padding: const EdgeInsets.all(32),
  child: Text(
    'Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese '
        'Alps. Situated 1,578 meters above sea level, it is one of the '
        'larger Alpine Lakes. A gondola ride from Kandersteg, followed by a '
        'half-hour walk through pastures and pine forest, leads you to the '
        'lake, which warms to 20 degrees Celsius in the summer. Activities '
        'enjoyed here include rowing, and riding the summer toboggan run.',
    softWrap: true,
  ),
);
```

Setting **softwrap = true**, text line sẽ fill chiều rộng column trước khi wrap ở ranh giới từ.
Thêm section text vào body:

![](https://images.viblo.asia/52aa0776-ea3a-41c6-ae1c-1d9463949a4e.png)

## Step 5: Implement image section

3 trong số 4 thành phần đã hoàn thành, chỉ còn lại image. Thêm image file vào ví dụ như sau:

* Tạo thư mục **images** trong top folder của project.
* Thêm [lake.jpg](https://raw.githubusercontent.com/flutter/website/master/examples/layout/lakes/step5/images/lake.jpg).
* Update **pubspec.yaml** file để bao gốm **assets** tag. Điều này sẽ làm image tồn tại sẵn trong code.

![](https://images.viblo.asia/6233ccb3-4b92-470f-b42d-60ce65852530.png)

Giờ thì bạn đã có thể tham chiếu đến image trong code:

![](https://images.viblo.asia/14bb30db-9590-44b6-80e1-f0e5647bd54a.png)

**BoxFit.cover** thể hiện rằng image sẽ nhỏ nhất có thể nhưng sẽ lấp đầy khoảng trống bao lấy nó.

## Step 6: Hoàn thành

Đây là bước cuối cùng, xếp tất cả các thành phần vào một **ListView** chứ không phải **Column** vì **ListView** hỗ trợ scroll khi app chayk trên các device có màn hình nhỏ.

![](https://images.viblo.asia/114e579c-3dad-4ee7-9ef5-58f580aa1eb2.png)

Đến đây là đã hoàn thành. Bạn có thể check code xem mình đã làm đúng chưa tại đây:

**Dart code**: [main.dart](https://github.com/flutter/website/tree/master/examples/layout/lakes/step6/lib/main.dart)

**Image**: [images](https://github.com/flutter/website/tree/master/examples/layout/lakes/step6/images)

**Pubspec**: [pubspec.yaml](https://github.com/flutter/website/tree/master/examples/layout/lakes/step6/pubspec.yaml)

Hot reload và bạn sẽ thấy app layout sẽ giống như ảnh ở đầu bài viết này.

Cảm ơn mọi người đã đọc bài của mình :D