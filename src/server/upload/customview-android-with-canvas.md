Xin chào các bạn, hôm nay mình sẽ cùng các bạn tìm hiểu về một chủ đề rất thú vị trong Android đó là `CustomView` với `Canvas`. 
Như các bạn đã biết, để xây dựng được một ứng dụng mobile thu hút được nhiều người dùng, bắt buộc ứng dụng của chúng ta phải mang được đến cho người dùng những trải nghiệm bổ ích và hấp dẫn. Trong đó, góp phần làm nên thành công không nhỏ của ứng dụng đấy chính là giao diện người dùng. Chẳng phải tự nhiên là giang hồ đồn đại *"Người đẹp vì lụa, app hấp dẫn nhờ giao diện"*, thử hỏi giữa 2 ứng dụng, một bên giao diện sinh động, lung linh, bắt mắt, còn một bên đơn điệu, giản dị thì liệu chúng ta sẽ bị hấp dẫn bởi cái nào hơn? Câu trả lời đã có rồi phải không nào ^^. Là một lập trình viên Android. bạn đã bao giờ băn khoăn tự hỏi làm sao để ứng dụng của chúng ta có cho mình một bộ cánh thật hấp dẫn, thật khác biệt để có thể nổi bật lên giữa cả ngàn ứng dụng ngoài kia? Hay làm sao mà các ông lớn như Facebook, Instagram hay hàng loạt các tên tuổi khác họ đều có cho mình những nét rất độc đáo, rất riêng, để mỗi khi nhắc tới là ta có thể lập tức hình dung ngay về họ. Làm cách nào vậy? Tìm kiếm trong bộ công cụ hỗ trợ thiết kế giao diện của Android ta cũng sẽ thấy rất nhiều, nhưng chưa đủ. Không có một thành phần mặc định nào cung cấp cho ta khả năng tạo ra một list reaction đẹp như của Facebook, hay những hiệu ứng rất cute vô tình bắt gặp khi đang lượn lờ instagram của các hot girl. Hmm.. câu trả lời sẽ có trong bài viết này, đó chính là sức mạnh của kỹ thuật `CustomView`.
Thôi không lan man nữa, chúng ta cùng nhau đi vào chủ để chính luôn nhé!
    Trước tiên, mình muốn cùng các bạn lướt qua về các khái niệm: `View`, `CustomView`, `Canvas`. Chúng là gì? Và kết hợp sử dụng chúng ra làm sao?
    Đầu tiên là khái niệm về `View`. Các bạn hẳn đã bắt gặp rất nhiều những thành phần như `TextView`, `Button`, `ImageView`... trong quá trình học Android, và bất ngờ không khi tất cả chúng đều là con cháu được đẻ ra từ một lớp `View` trong thư viện `android.view.View` =)). `View` cho phép chúng ta định nghĩa các thành phần có mặt trên giao diện người dùng. Và để có thể làm việc thật tốt với View thì chúng ta cần nắm vững được cơ chế hoạt động của nó ra sao. Cũng giống như `Activity` hay `Fragment`... `View` trong Android cũng sở hữu cho mình một life cycle riêng. Dưới đây là hình ảnh mô tả về vòng đời của một `View` trong Android mà mình sưu tầm được trong quá trình tìm hiểu: 
![](https://images.viblo.asia/ab1fbd82-1395-47f8-b58e-17db5b71370d.png)
Trong phạm vi bài viết này của mình sẽ không đi tìm hiểu quá sâu vào phần này nên mình chỉ cung cấp hình ảnh mô tả về `ViewLifeCycle` như vậy. Nếu muốn tìm hiểu kỹ hơn về nó thì các bạn có thể xem thêm [tại đây](https://viblo.asia/p/vong-doi-cua-mot-view-trong-android-07LKXjQ4lV4) hoặc [tại đây](https://developer.android.com/reference/android/view/View)
    Về `CustomView`. Hiểu một cách đơn giản đây là kỹ thuật giúp cúng ta tạo ra những UI riêng, thứ mà nếu chỉ sử dụng các `View` có sẵn của Android SDK thì ta khó có thể làm được. 
    Còn về `Canvas`, nó được xem như là một bền mặt 2D cho phép chúng ta có thể vẽ bất cứ thứ gì lên đó. Ví dụ như một điểm, một đường thẳng, một hình tròn... hay là phức tạp như chân dung crush bạn chẳng hạn :heart_eyes: . 
Canvas trong Android có cung cấp cho chúng ta các method để vẽ tất cả các đối tượng như sau:
- Các đối tượng hình học cơ bản (point, line, oval, rect..)
- Vẽ hình ảnh (bitmap, drawable)
- Vẽ Path (Tập hợp các điểm)
- Vẽ Text
Và để tìm hiểu kỹ hơn về nó thì các bạn có thể xem [tại đây](https://developer.android.com/reference/android/graphics/Canvas)
Một đối tượng cũng không kém phần quan trọng khi sử dụng `Canvas` để CustomView đó là `Paint`. `Paint` hỗ trợ cho việc xác định kích thước, tô màu, đổ bóng... cho đối tượng được vẽ bởi Canvas. Hay nói một cách ngắn gọn hơn: **Canvas thể hiện cách bạn vẽ cái gì, còn Paint thể hiện bạn vẽ như thế nào**.
*"Trăm nghe không bằng một thấy, mà trăm thấy không bằng một thử"*. Bây giờ mình sẽ cùng các bạn thử làm một demo nho nhỏ nhé. Mình sẽ thử vẽ một chú Pacman :v , còn các bạn hãy thử vẽ chân dung crush xem sao :wink: :wink:
Ok bắt đầu nào.
Đây là phiên bản demo mình muốn vẽ:
![](https://images.viblo.asia/f18b6431-626e-4206-ac45-9c84ee19d3c0.jpg)
Phân tích một chút, ta có thể dễ dàng nhận thấy đây là một hình cánh quạt với một góc quét khoảng tầm 300 độ và góc khuyết cái miệng chiếm khoảng 60 độ.
Vậy để vẽ được một hình như thế kia thì mình cần sử dụng hàm **drawArc()** của Canvas. Hàm **drawArc()** cho phép ta vẽ hình quạt. Ngoài ra còn có các hàm khác để bạn tùy biến sử dụng như:
- **drawText()**: vẽ một text
- **drawRect()**: vẽ một hình chữ nhật
- **drawOval()**: vẽ một hình oval
- **drawBitmap()**: vẽ một ảnh bitmap
*Lưu ý:* View của chúng ta sẽ nằm trong một trục tọa độ Oxy tính từ điểm trên cùng góc trái màn hình. Khi ấy bố cục View cần vẽ của chúng ta sẽ trông như thế này:
![](https://images.viblo.asia/d177541e-aeea-404f-b79e-d69836fdec61.png)
Trong đó:
- **top** là khoảng cánh tính từ cạnh top của màn hình tới đỉnh View của bạn (giống marginTop)
- **left** là khoảng cách tính từ cạnh trái của màn hình tới lề trái View của bạn (giống marginStart)
- **right** = left + your_view_width
- **bottom** = top + your_view_height
Giả sử pacman của mình có kích thước là 300, cách lề trên 300, cách lề trái 300, phần đầu của nó sẽ quay từ góc 30 độ đến góc 330 độ thì mình sẽ định nghĩa các giá trị như sau:
```
        // Kích thước của View
        int square = 300;
        // Cách lề trên
        float top = 300;
        // Cách lề trái
        float left = 300;
        float right = left + square;
        float bottom = top + square;
        // Giá trị bắt đầu quét (tính bằng độ)
        float startAngle = 30;
        // Giá trị quét (Ở đây mình quét từ góc 30 độ đến góc 330 độ)
        // sẽ được hình cái đầu của pacman
        float sweepAngle = 300;
        canvas.drawArc(left, top, right, bottom, startAngle, sweepAngle, true, pacmanPaint);
```
Tiếp theo chúng ta sẽ vẽ thêm mắt cho Pacman. Dùng hàm drawCircle() để vẽ một hình tròn. Trong đó:
- **cx**, **cy** là tâm của hình tròn
- **radius** là bán kinh của hình tròn
```
        // cx, cy: tâm của hình tròn
        float cx = left + 180;
        float cy = top + 70;
        // Bán kinh của hình tròn
        float radius = 25;
        canvas.drawCircle(cx, cy, radius, eyeOfPacmanPaint);
```
Cuối cùng ta định nghĩa View vừa custom vào trong file XML
```
    <com.ptit.pacmancustomjava.PacmanCanvas
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>
```
Run app và được kết quả như hình:
![](https://images.viblo.asia/1b67669e-dd4f-4586-83c9-942f3586af89.jpg)
Các bạn có thể tham khảo full code demo ở [đây](https://github.com/Anony1412/pacman_canvas_demo)
Vậy là chúng ta đã cùng nhau tìm hiểu qua về CustomView sử dụng Canvas. Hy vọng qua bài viết này sẽ giúp các bạn có thêm một chút kiến thức và có thể đào sâu hơn về chủ đề này để có thể trở thành một developer kiêm luôn designer đa tài ^^.
Cảm ơn bạn đã theo dõi, chúc bạn thành công!