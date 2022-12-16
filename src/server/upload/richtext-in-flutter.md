Hi all, hôm trước mình đã giới thiệu với các bạn về [Text Widget](https://viblo.asia/p/text-and-textstyle-in-flutter-aWj53N6pl6m). Đề tiếp tục với chủ đề này, nay mình sẽ giới thiệu với bạn về [Rich Text](https://api.flutter.dev/flutter/widgets/RichText-class.html). Nghe đến từ `Rich` thì bạn có thể nghĩ ngay đến Rick Kids, tiền, tiền và rất nhiều tiền. Với Rich Text thì tư tưởng nó cũng là vậy đấy.

> Rich Text dùng để hiển thị 1 văn bản text với nhiều style khác nhau. Mỗi text con được biểu diễn bởi 1 [TextSpan](https://api.flutter.dev/flutter/painting/TextSpan-class.html). Văn bản có thể hiển thị trên 1 dòng hoặc nhiều dòng phụ thuộc vào các bạn thiết lập cho nó.
> Mỗi Text hiển thị trong Rich Text phải có 1 style rõ ràng, style của nó sử dụng TextStyle tương tự như [textStyle của Text](https://viblo.asia/p/text-and-textstyle-in-flutter-aWj53N6pl6m#_5-style-4). Style mặc định cho nó sẽ là `DefaultTextStyle.of(context).style`

Nếu bạn đã thành thạo việc sử dụng Text và TextStyle thì với Rich Text thật đơn giản biết nhường nào. Ở đây mình sẽ không đi vào lý thuyết nhiề, mà sẽ làm 3 ví dụ để bạn có thể hình dung rõ hơn về Rich Text.

### Ví dụ 1: Cơ bản
![](https://images.viblo.asia/e8700630-a29d-4242-973c-546fab421c1f.png)
```java
RichText(
  text: TextSpan(
    text: 'Hello ',
    style: DefaultTextStyle.of(context).style,
    children: <TextSpan>[
      TextSpan(text: 'bold', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 40)),
      TextSpan(text: ' world!'),
    ],
  ),
)
```

### Ví dụ 2: Flutter
![](https://images.viblo.asia/070bfd15-0c40-4e06-9012-1af9fbdeec99.png)
```java
Widget _buildFlutter() {
  return Center(
    child: RichText(
      text: TextSpan(
        children: <TextSpan>[
          TextSpan(text: " F ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[300])),
          TextSpan(text: " l ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[400])),
          TextSpan(text: " u ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[500])),
          TextSpan(text: " t ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[600])),
          TextSpan(text: " t ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[700])),
          TextSpan(text: " e ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[800])),
          TextSpan(text: " r ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[900])),
        ]
      ),
    ),
  );
}
```

![](https://images.viblo.asia/dd35acc3-5d0b-4627-83d0-a1ec938a5a68.png)
```java
Widget _buildFlutter() {
  return Stack(
    children: <Widget>[
      _buildHFlutter(),
      _buildVFlutter()
    ],
  );
}

Widget _buildHFlutter() {
  return Center(
    child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        RichText(
          text: TextSpan(text: " F ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[900])),
        ),
        RichText(
          text: TextSpan(text: " l ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[800])),
        ),
        RichText(
          text: TextSpan(text: " u ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[700])),
        ),
        RichText(
          text: TextSpan(text: " t ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[600])),
        ),
        RichText(
          text: TextSpan(text: " t ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[700])),
        ),
        RichText(
          text: TextSpan(text: " e ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[800])),
        ),
        RichText(
          text: TextSpan(text: " r ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[900])),
        ),
      ],
    ),
  );
}

Widget _buildVFlutter() {
  return Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        RichText(
          text: TextSpan(text: " F ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[900])),
        ),
        RichText(
          text: TextSpan(text: " l ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[800])),
        ),
        RichText(
          text: TextSpan(text: " u ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[700])),
        ),
        RichText(
          text: TextSpan(text: " t ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[600])),
        ),
        RichText(
          text: TextSpan(text: " t ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[700])),
        ),
        RichText(
          text: TextSpan(text: " e ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[800])),
        ),
        RichText(
          text: TextSpan(text: " r ", style: TextStyle(color: Colors.white, fontSize: 60, fontWeight: FontWeight.w300, backgroundColor: Colors.blue[900])),
        ),
      ],
    ),
  );
}
```


### Ví dụ 3: Google
![](https://images.viblo.asia/713e431a-85dc-4ac1-b9cf-bed2a87f9432.png)
```java
Widget _buildGoogle() {
  return Center(
    child: RichText(
      text: TextSpan(
          children: <TextSpan>[
            TextSpan(text: "G", style: TextStyle(color: Colors.blue, fontSize: 60, fontWeight: FontWeight.bold,)),
            TextSpan(text: "o", style: TextStyle(color: Colors.red, fontSize: 60, fontWeight: FontWeight.bold, fontFamily: "DancingScript")),
            TextSpan(text: "o", style: TextStyle(color: Colors.yellow, fontSize: 60, fontWeight: FontWeight.bold, fontFamily: "DancingScript")),
            TextSpan(text: "g", style: TextStyle(color: Colors.blue, fontSize: 60, fontWeight: FontWeight.bold,)),
            TextSpan(text: "l", style: TextStyle(color: Colors.green, fontSize: 60, fontWeight: FontWeight.bold)),
            TextSpan(text: "e", style: TextStyle(color: Colors.red, fontSize: 60, fontWeight: FontWeight.bold)),
          ]
      ),
    ),
  );
}
```

Cũng không đến nỗi nào phải không các bạn, ở đây lý thuyết cũng chẳng có mấy, chủ yếu là các bạn thực hành nhiều thì sẽ ngon hết.

To be continue...

Tài liệu tham khảo:
* [Flutter.dev](https://flutter.dev/)
* [RichText](https://api.flutter.dev/flutter/widgets/RichText-class.html)
* [TextSpan](https://api.flutter.dev/flutter/painting/TextSpan-class.html)