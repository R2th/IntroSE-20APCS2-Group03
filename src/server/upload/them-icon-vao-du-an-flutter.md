![](https://images.viblo.asia/a5d7e010-597d-454d-b9d6-855169ae1e96.png)

Flutter hỗ trợ sẵn một kho icon vô cùng phong phú và đa dạng. Tuy nhiên đôi khi chúng ta lại muốn sử dụng những icon của riêng mình. Vậy làm sao để thêm một icon vào dự án Flutter và cách để sử dụng chúng ? Hãy cùng mình tìm hiểu ở bài viết này nhé !

# 1. Tạo icon
## Bước 1:
Chuẩn bị sẵn icon của bạn, có thể 1 hoặc nhiều icon. Chú ý các icon phải có dạng **.SVG** . Ở đây mình sẽ sử dụng 2 icon là podium.svg và home.svg

## Bước 2:
Tới trang [https://www.fluttericon.com](https://www.fluttericon.com/). Tại đây, bạn chỉ cần kéo thả các icon của mình vào phần **Custom Icons**. Sau khi kéo thả chúng ta sẽ thu được kết quả như sau:

![](https://images.viblo.asia/7345950b-3e34-4e64-9c4a-684921d15388.png)

Có thể thấy 2 icon của mình đã được import lên trang web. Công việc tiếp theo cần làm là click vào các icon mà các bạn muốn sử dụng, sau đó chọn download. Nhìn bên trái nút download, bạn sẽ thấy một EditText cho phép chúng ta nhập vào tên cho bộ icon của chúng ta. Lưu ý rằng đây không phải tên của icon nhé. Tên này chúng ta sẽ dùng để truy cập vào các icons. Ở đây mình sẽ đặt là AppIcons nhé. Khi download về chúng ta sẽ có được 3 file : AppIcons.ttf nằm trong thư mục font, app_icons_icons.dart, config.json. Như vậy là chúng ta đã có được bộ icon của mình rồi. Tiếp theo sẽ là cách dùng chúng trong ứng dụng của mình nhé

# 2. Sử dụng icon

## Bước 1:
- Các bạn copy thư mục font bỏ vào thư mục assets (nếu chưa có thì các bạn có thể tạo thêm thư mục này)
![](https://images.viblo.asia/fbb1c436-c650-4b6b-b6c3-9dbe14ef35c5.png)

- Copy file app_icons_icons.dart vào thư mục icons trong thư mục lib (các bạn có thể đổi tên file này cho gọn, ở đây mình đổi thành app_icons.dart)
![](https://images.viblo.asia/72c6831f-ca8c-489f-a4e4-049a3ce91e43.png)

- Tiếp theo mở file pubspec.yaml thêm đoạn code sau :
```
fonts:
    - family: AppIcons // tên của bộ icons . Nhớ đặt đúng tên đã đặt như trên web nhé
      fonts:
        - asset: assets/fonts/AppIcons.ttf // đường dẫn file .ttf
```

- Cuối cùng chúng ta chỉ cần gọi tới icon để dùng 
```
bottomNavigationBar: BottomNavyBar(
        selectedIndex: _currentIndex,
        onItemSelected: (index) => setState(() {
          _currentIndex = index;
          _controller.animateToPage(index,
              duration: Duration(milliseconds: 300), curve: Curves.ease);
        }),
        items: [
          BottomNavyBarItem(
              textAlign: TextAlign.center,
              title: Text("Rank"),
             ** icon: Icon(AppIcons.podium),
              activeColor: Colors.green,
              inactiveColor: Colors.black)
        ],
      ),
```

Và đây là kết quả :
![](https://images.viblo.asia/1136d899-8fcc-4a4c-bac6-087076e1c6e5.png)

## Note
Chúng ta vẫn còn 1 file nữa chưa dùng là config.json. File này sẽ giúp chúng ta import các icon đã có trong bộ thư viện của chúng ta lên web https://www.fluttericon.com/ . Nó sẽ có ích khi chúng ta muốn add icon mới vào trong bộ icons của chúng ta