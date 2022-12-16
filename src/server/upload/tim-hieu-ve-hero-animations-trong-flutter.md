![](https://images.viblo.asia/93e8710c-8223-4599-86a7-9fe44ab5945f.png)

# 1. Giới thiệu về Hero animations
Hero Animation là một widget giúp chúng ta tạo các hiệu ứng khi chuyển màn. Dưới đây là một ví dụ về Hero Animations.

![](https://images.viblo.asia/03133b00-db9a-406d-8c6d-038294ba2e55.gif)

Hero Animation sử dụng một biểu tượng hiện được gọi là “Hero” và khi quá trình chuyển đổi trang được kích hoạt, thường bằng cách nhấp vào biểu tượng, trên màn hình sẽ xuất hiện hoạt ảnh “bay” đến trang tiếp theo. Khi người dùng điều hướng trở lại trang trước đó, hoạt ảnh sẽ đi theo hướng khác và biểu tượng quay trở lại vị trí ban đầu của nó.

Chúng ta sẽ thảo luận không chỉ về các Hero Animations cơ bản mà còn những thứ chúng ta có thể tùy chỉnh về nó. Trước tiên, hãy xem những hiệu ứng cơ bản.

# 2. Tạo Hero Animation cơ bản 
Hero Animations là một trong những hiệu ứng dễ làm nhất trong Flutter và không yêu cầu thiết lập nhiều. Nhìn vào ví dụ dưới đây, chúng ta có thể thấy rằng cùng một biểu tượng tồn tại trên cả hai trang. Tất cả những gì chúng ta cần là nói cho Flutter rằng cả hai được liên kết với nhau.
Chúng tôi thực hiện việc này bằng cách bao bọc một widget như một biểu tượng trong Hero widget.
```
Hero(
  tag: "DemoTag",
  child: Icon(
    Icons.add,
    size: 70.0,
  ),
),

```

Chúng tôi cung cấp cho mỗi Hero widget một tên cụ thể. Điều này là cần thiết vì nếu chúng ta có thể có nhiều Hero trên cùng một màn hình và mỗi Hero wigdet sẽ có những điểm đến khác nhau

Bây giờ ứng dụng biết rằng có một Hero widget muốn chuyển đến trang tiếp theo. Bây giờ tất cả những gì chúng ta cần làm là xác định nơi mà Hero Widget sẽ bay tới.

Tất cả những gì chúng ta cần là tạo một Hero Widget ở màn hình thứ hai với tên giống với tên hero widget ở màn hình thứ nhất.
```
Hero(
  tag: "DemoTag",
  child: Icon(
    Icons.add,
    size: 150.0,
  ),
),
```

Và đây là kết quả chúng ta thu được
![](https://images.viblo.asia/4b8d7d4c-6d1b-40b7-a7b7-06289ac5c5ce.gif)
# 3. Customizing Hero Animations
Hero Animations cho phép chúng ta tùy chỉnh các thông số để tạo ra các hoạt ảnh mà chúng ta mong muốn. Cùng xem cách làm như nào nhé.
## 3.1 Thêm placeholders
Trong khi tiện ích con bay từ màn hình này qua màn hình khác, sẽ có không gian trống ở điểm đến. Chúng tôi có thể placeholder vào vị trí này.
Bây giờ chúng ta hãy sử dụng CircularProgressIndicator để làm placeholder.
```
Hero(
    tag: "DemoTag",
    child: Icon(
      Icons.add,
      size: 150.0,
    ),
    placeholderBuilder: (context, widget) {
      return Container(
        height: 150.0,
        width: 150.0,
        child: CircularProgressIndicator(),
      );
    },
  ),
```

Và kết  quả thu được 
![](https://images.viblo.asia/f47e7516-e710-4a98-883e-62f2938dc232.gif)

## 3.2 Thay đổi hero widget
Flutter cho phép chúng ta thay đổi widget thực sự di chuyển từ màn hình này sang màn hình khác mà không thay đổi các widget mà chúng ta setup từ đầu trên cả hai màn hình.
Dưới đây chúng tôi sẽ dùng biểu tượng tên lửa trong lúc di chuyển từ màn hình này sang màn hình khác thay cho icon "+"
![](https://images.viblo.asia/332b2560-1f5e-4bd8-a9c3-f01b5e620e40.gif)

Chúng tôi sử dụng thuộc tính **flightShuttleBuilder ** của hero animation để làm điều đó.
```
Hero(
  tag: "DemoTag",
  child: Icon(
    Icons.add,
    size: 150.0,
  ),
  flightShuttleBuilder: (flightContext, animation, direction,
      fromContext, toContext) {
    return Icon(FontAwesomeIcons.rocket, size: 150.0,);
  },
),
```

Phương thức flightShuttleBuilder có 5 tham số và cho chúng ta hoạt ảnh cũng như hướng của hoạt ảnh .
Hiện tại, kích thước biểu tượng tên lửa vẫn ở mức 150,0 cho cả hai hướng. Chúng ta có thể có các cấu hình khác nhau cho mỗi hướng bằng cách sử dụng tham số **direction** của phương thức.
```
// push : từ màn hình thứ nhất về màn hình thứ hai.
// pop: từ màn hình thứ hai quay lại màn hình thứ nhất.
if(direction == HeroFlightDirection.push) {
  return Icon(
    FontAwesomeIcons.rocket,
    size: 150.0,
  );
} else if (direction == HeroFlightDirection.pop){
  return Icon(
    FontAwesomeIcons.rocket,
    size: 70.0,
  );
}
```

![](https://images.viblo.asia/a7b15fa0-8d6a-4d58-bada-b29f59bc862c.gif)
## 3.3 Tạo hiệu ứng vuốt ngược giống với IOS bằng Hero Animation
Mặc định, Hero Animation hoạt động khi người dùng sử dụng phím **back** chứ không hoạt động với hành động back swipe. Tuy nhiên chúng ta có thể tạo ra hiệu ứng này một cách dễ dàng với Hero Animations

Sử dụng back button:
![](https://images.viblo.asia/07889768-c231-46f6-8399-55b2687244a2.gif)

Sử dụng back swipe :
![](https://images.viblo.asia/a6be7a70-21d2-4733-96ef-ed1af607c3e9.gif)

Để làm việc này chúng ta sử dụng tham số **transitionOnUserGestures** của Hero Widget ở cả 2 màn hình:
```
Hero(
  tag: "DemoTag",
  child: Icon(
    Icons.add,
  ),
  transitionOnUserGestures: true,
),
```

# Tham khảo
https://medium.com/flutter-community/a-deep-dive-into-hero-widgets-in-flutter-d34f441eb026