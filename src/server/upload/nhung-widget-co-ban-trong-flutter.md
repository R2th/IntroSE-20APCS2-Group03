Flutter hiện đang là framework moblie app đang được quan tâm trong thời gian gần đây bởi nó vừa có thể giảm thời gian phát triển và chi phí ( thứ mà native framework không có được ) hay đảm bảo performance ( một điểm yếu của react native). Flutter framework giống như một tập hợp của rất nhiều widget, và widget giống như một loại vật liệu để xây dựng lên app của bạn. Khi bạn xây dựng một màn hình hiển thị trên app bằng Flutter cũng giống như bạn đang chơi một trò chơi xếp hình, công việc của bạn là phải tìm được widget phù hợp để lắp ghép vào chỗ trống cho hoàn hảo nhất.

Để làm được điều đó thì bạn cần nắm được các thuộc tính cơ bản của từng loại widget. Và sau đây thì mình sẽ điểm danh cho các bạn các loại widget hay sử dụng nhất và những thuộc tính của nó mà cần ghi nhớ để có thể sử dụng hiệu quả các widget này. Tất nhiên mỗi loại widget có rất nhiều thuộc tính hay ho nhưng với những bạn mới tiếp cận Flutter thì các bạn nên chỉ cần ghi nhớ những thuộc tính quan trọng nhất của widget đó thôi. Le't go!

## 1.Text
Đây là widget cơ bản giúp bạn format text trong ứng dụng của bạn, và thuộc tính quan trọng nhất của widget này là style
```
Text(
    'Hello world!',
     style: TextStyle(
        color: Colors.black,
        fontSize: 40,
        backgroundColor: Colors.white,
        fontWeight: FontWeight.bold,

    ),
)
```

![](https://images.viblo.asia/71e78668-cd67-432e-9e25-6583946a561a.png)

## 2.Column, Row
Đây là 2 widget giúp định hình 1 tập hợp các widget theo chiều dọc (vertically) hoặc chiều ngang (horizontally). 2 thuộc tính quan trọng nhất của 2 widget này là mainAxisAlignment và                       crossAxisAlignment. 

Khi bạn sử dụng một Row, các widget con của nó được sắp xếp thành một hàng, theo chiều ngang.  Vì vậy,  trục chính của Row là nằm ngang.  Sử dụng mainAxisAlignment trong Row cho phép bạn căn chỉnh các widget con của hàng theo chiều ngang (ví dụ: left, right).  Trục chéo đến trục chính của Row là trục dọc.  Vì vậy, sử dụng crossAxisAlignment trong Row cho phép bạn xác định cách con của nó được căn chỉnh theo chiều dọc.  Trong một Cột thì ngược lại.  Con của một Column được sắp xếp theo chiều dọc, từ trên xuống dưới (theo mặc định).  Vì vậy trục chính của nó là thẳng đứng.  Điều này có nghĩa là, việc sử dụng mainAxisAlignment trong một Column sẽ căn chỉnh các widget con của nó theo chiều dọc (ví dụ: top, bottom) và crossAxisAlignment xác định cách các con được căn chỉnh theo chiều ngang trong Column đó.

```
        Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Text(
              "Hello world!",
              style: TextStyle(
                backgroundColor: Colors.white,
                color: Colors.black,
                fontSize: 40,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              "This is sample app!",
              style: TextStyle(
                backgroundColor: Colors.white,
                color: Colors.grey,
                fontSize: 30,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
```
![](https://images.viblo.asia/ac179c39-8a18-4039-b66d-fe6053deebfe.png)

## 3. Stack
Cũng giống như Column hay Row, Stack cũng là 1 tập hợp các widget, tuy nhiên điểm khác biệt là các widget con trong stack có thể chồng lên nhau. Thường đi kèm với widget này là widget Positioned để căn chỉnh vị trí của từng widget trong Stack, hãy theo dõi ví dụ dưới để hiểu hơn về stack:
```
        Container(
          width: 200,
          height: 350,
          decoration: BoxDecoration(
            border: Border.all(width: 1, color: Colors.black26),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              Positioned(
                top: 20,
                left: 0,
                right: 0,
                bottom: 0,
                child: Container(
                  child: Center(
                    child: Text(
                      'Green widget',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                  color: Colors.green,
                ),
              ),
              Positioned(
                top: 0,
                left: 40,
                right: 40,
                child: Container(
                  child: Center(
                      child: Text(
                    'Red widget',
                    style: TextStyle(color: Colors.white),
                  )),
                  height: 120,
                  color: Colors.red,
                ),
              ),
            ],
          ),
        ),
```

![](https://images.viblo.asia/758b3879-8c25-4f25-845a-f706d855a83f.png)

## 4. Container
Đây là 1 widget được mình thường xuyên được sử dụng vì tính hữu dụng của nó. Nó có các thuộc tính width, height giúp bạn có thể dễ dàng layout những view có kích thước đã xác định và đặc biệt là thuộc tính decoration giúp bạn trang trí lộng lẫy hơn cho view của bạn:
```
        Container(
          width: 200,
          height: 200,
          decoration: BoxDecoration(
            color: Colors.amber,
            border: Border.all(width: 1, color: Colors.black26),
            borderRadius: BorderRadius.circular(10),
          ),
          padding: EdgeInsets.all(50),
          child: FlutterLogo(
            size: 50,
          ),
        ),
```

![](https://images.viblo.asia/2c4216b7-4081-4643-80df-eb78204adb0b.png)


Bạn có thể tham khảo thêm trong đường link này để hiểu hơn về các thuộc tính của container http://flutterdevs.com/blog/know-your-widgets-container-in-flutter/#:~:text=If%20you%20are%20new%20to,to%20add%20some%20styling%20properties.
## 5. SizedBox
Đây là widget mình hay sử dụng để tạo khoảng cách giữa các widget hơn là việc layout một view:
```
        Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            SizedBox(
              height: 20,
            ),
            Text(
              'Hello World!',
              style: TextStyle(
                fontSize: 30,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            SizedBox(
              height: 20,
            ),
            Text(
              'This is sample app',
              style: TextStyle(
                fontSize: 20,
                color: Colors.grey,
              ),
            )
          ],
        ),
```

![](https://images.viblo.asia/ffb00364-6791-46e6-9668-d216c40d5a0a.png)

## 6. SingleChildScrollView

 Khi bạn có 1 Column hoặc 1 Row có height hoặc width vượt qua độ lớn màn hình điện thoại của bạn thì SingleChildScrollView widget xuất hiện giúp bạn giải quyết vấn đề này. Để widget này hoạt động đúng thì bạn cần phải set giá trị cho thuộc tính scrollDirection của nó (Axis.vertical là theo chiều dọc, Axis.horizontal theo chiều ngang): 
 ```
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
                  child: Column(
            children: [
              LogoBox(),
              LogoBox(),
              LogoBox(),
              LogoBox(),
              LogoBox(),
              LogoBox(),
            ],
          ),
        ),
        
        
 class LogoBox extends StatelessWidget {
  const LogoBox({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      height: 200,
      margin: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.amber,
        border: Border.all(width: 1, color: Colors.black26),
        borderRadius: BorderRadius.circular(10),
      ),
      padding: EdgeInsets.all(50),
      child: FlutterLogo(
        size: 50,
      ),
    );
  }
}

 ```
 
 ![](https://images.viblo.asia/fb7d81bf-1654-4f1e-8950-76d1dbdca93b.gif)

## 7. Expanded

Đây là widget hay được xử dụng để chia bố cục của widget cha thành các phần với tỉ lệ tương ứng:
```
        Column(
          children: [
            Expanded(
              flex: 2,
              child: Container(color: Colors.green),
            ),
            Expanded(
              flex: 3,
              child: Container(color: Colors.blue),
            ),
            Expanded(
              child: Container(color: Colors.grey),
            ),
          ],
        ),
```
![](https://images.viblo.asia/80816364-0eed-4cd6-9001-53045d36583a.png)

Như các bạn thấy thì trong ví dụ trên widget cha được chia thành 3 widget con green, blue, grey theo tỉ lệ flex là 2:3:1, mặc định flex = 1. Ngoài ra thì expanded cũng được sử dụng trong trường hợp dynamic height hay width của child widget theo parent widget ví dụ bạn có 1 Column chứa 2 Container trong đó 1 Container có chiều cao là 50, còn Container còn lại có chiều cao bằng phần còn lại của Column bạn hãy wrap Container thứ 2 trong 1 Expanded:
```
        Column(
          children: [
            Container(width: double.infinity, height: 50, color: Colors.green,),
            Expanded(
              child: Container(color: Colors.grey),
            ),
          ],
        ),
```

# Tổng kết
Trên đây mình vừa giới thiệu các Widget cơ bản nhất hay sử dụng trong widget, còn một số widget nữa như Image, IconButton, FlatButton,... mình sẽ đề cập đến trong phần tiếp theo. Đây là bào viết tổng hợp những kiến thức và kinh nghiệm của mình nên chắc sẽ còn nhiều thiếu sót, mong các bạn đóng góp ý kiến ở phần comment bên dưới để mình hoàn thiện hơn về kiến thức của mình. Cảm ơn vì đã theo dõi bài viết, hẹn gặp lại trong bài viết lần sau.