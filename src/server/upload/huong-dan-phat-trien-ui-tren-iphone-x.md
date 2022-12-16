# I. Giới thiệu
Vào tháng 11/2017, Apple đã chính thức mở bán iPhone X. Chúng ta đã biết, iPhone X là chiếc iPhone kỷ niệm 10 năm kể từ khi chiếc iPhone đầu tiên được bán ra, vì vậy nó là một chiếc iPhone rất đặc biệt, đặc biệt về cả mặt ý nghĩa lẫn mặt thiết kế. iPhone X có thiết kế khác hoàn toàn những chiếc iPhone khác, đó là:
* kích thước màn hình 375 x 812 point với tỉ lệ màn hình 9:19,5, so với kích thước iphone 6/7/8 là 375 x 667 point và tỉ lệ 9:16.
* kích thước status bar là 44 point, các iPhone khác chỉ có kích thuước là 20 point.
* độ phân giải màn hình là 3x: 1125 x 2436 pixel
* khi thiết kế chúng ta phải tính đến cho cả phần tai thỏ, phần home ảo bên dưới và phần bo cong các góc màn hình

* Khi máy ở chế độ portrait (xoay dọc màn hình), kích thước status bar + navigation bar là 88 point đối với title bình thường, đối với title lớn là 140 point. kích thước toolbar là 83 point (trên các iPhone khác là 44 point).
* Khi ở chế độ landscape (xoay ngang màn hình), khích thước toolbar lại là 53point, và layout margin là 64 point thay vì 20 point ở chế độ portrait.

# II. Các nguyên tắc thiết kế cho ứng dụng để phù hợp với iPhone X

## 1. Đối với ứng dụng mới
### a. Thiết kế ứng dụng
Khi thiết kế ứng dụng, cần đảm bảo các nguyên tắc sau:

* Các view cần tránh vùng tai thỏ, vùng home ảo
* Tránh đặt các control (button, segmented control,…) tại vùng home ảo và các vùng bo cong ở các góc màn hình
* Không thiết kế gây chú ý cho người dùng ở các vùng đặt cảm biến faceID(tai thỏ), các góc bo tròn và vùng home ảo
* Background image thì lại nên được bao toàn bộ cả những vùng này (tai thỏ, home ảo) để làm ứng dụng có vẻ liền lạc, không bị cắt đứt bởi vùng home, tai thỏ.

![](https://images.viblo.asia/a65831f8-e6ba-4e10-a410-cb7bbfe3ad1d.png)

Hình trên hiển thị background và button đúng và sai cách. Background đúng cách nên hiển thị toàn bộ màn hình, còn button đúng cách không nên nằm ở vị trí home ảo

Khi thiết kế các view, các control,… vào các vùng trên (tai thỏ, home ảo) các view này sẽ bị che khuất, không hiển thị được như ý đồ ban đầu của chúng ta. Đặc biệt là khi thiết kế các control vào vùng home ảo, lúc này thao tác bấm các control này có thể bị lẫn với thao tác vuốt nút home để trở về màn home của điện thoại

### b. Sử dụng Auto layout
Khi sử dụng auto layout cần chú ý các nguyên tắc sau:

* sử dụng safe area layout
* sử dụng margin layout
Trên iPhone X có khá nhiều vùng chúng ta cần tránh, với việc sử dụng safe area layout, chúng ta sẽ đỡ được rất nhiều thời gian và công sức, bởi safe area trên iPhone X đã tự động tránh các vùng này cho chúng ta

![](https://images.viblo.asia/d95b5dc4-0210-4d0a-bd2d-e1c73cf165e0.png)

Hình trên hiển thị khu vực safe area (màu xám) trên iPhone X khi ở chế độ portrait và landscape


Tuy nhiên, trong một số trường hợp chúng ta cần hiển thị các UIView bên ngoài safe area, lúc này các bạn có thể tạo các auto layout ra bên ngoài safe area. Tuy nhiên hãy cẩn thận, bởi như vậy là các bạn đang vẽ các UIView ngoài vùng an toàn.

### c. Sử dụng các giao diện chuẩn của Apple nhiều nhất có thể

Khi viết ứng dụng, nếu các bạn có thể sử dụng các UI chuẩn của iOS, thì các bạn hãy dùng chúng. Chúng ta chỉ custom lại các UIView, các control khi không thể sử dụng UI chuẩn, vì UI chuẩn thì tất nhiên là đã được Apple tính toán kỹ lưỡng cho việc hỗ trợ iPhone X, cả chế độ portrait lẫn landscape.


### d. Status bar
status bar trên iPhone X có chiều cao lớn hơn các iPhone khác (44 so với 20 point), vì vậy nếu muốn thay đổi giao diện tại vùng này, các bạn cần chú ý không fix cứng thiết kế cho chiều cao của status bar là 20 point.

Hãy thiết kế status bar luôn được hiển thị trong app, trừ trường hợp đặc biệt bất khả kháng.

### e. độ phân giải màn hình 3x

Mặc dù có cùng chiều rộng (375) với iPhone 6/7/8, iPhone X lại có độ phân giải 3x. vì vậy iPhone X sẽ sử dụng ảnh 3x trong Assets.xcassets, các bạn nên chú ý đến điều này. 

Một ứng dụng sẽ không sử dụng 3x nếu nó không có file LauchScreen.storyboard

### f. Các trường hợp đặc biệt sử dụng home ảo

Trong trường hợp ứng dụng của các bạn sử dụng thao tác vuốt từ dưới lên tương tự thao tác vuốt để về home của nút home ảo, các bạn có thể sử dụng preferredScreenEdgesDeferringSystemGestures():. Khi sử dụng hàm này, người dùng sẽ vuốt 1 lần để sử dụng thao tác của ứng dụng, và vuốt 2 lần để sử dụng thao tác của home ảo

Trong trường hợp ứng dụng của bạn cần giấu vùng home ảo, các bạn hãy dùng prefersHomeIndicatorAutoHidden():. Khi sử dụng hàm này, vùng home ảo sẽ tự động được giấu đi khi người dùng không chạm vào màn hình trong vài giây, và được hiển thị lại khi người dùng có thao tác bấm vào màn hình.

### g. Sử dụng simulator
Khi dev và test layout, chúng ta có thể sử dụng simulator, khi cần kiểm tra màu sắc của ảnh, hoặc các tính năng chỉ có thể có trên thiết bị thật (gọi điện, dùng camera, faceID,…) chúng ta cần dùng device thật

## 2. Cập nhật ứng dụng chưa hỗ trợ iPhone X

### a. Cập nhật Assets.xcassets
Việc đầu tiên cần làm là cập nhật các ảnh icon cho iPhone X, chúng ta cần ảnh @3x. Hãy chú ý đến ảnh background, vì iPhone X có tỉ lệ màn hình khác với các iPhone khác, vì thế ảnh background cũ có thể bị méo/cắt/thiếu khi sử dụng trên iPhone X

### b. LaunchScreen.storyboard

Hãy chắc chắn rằng ứng dụng của các bạn đã có file này, nếu chưa có, các bạn hãy tạo file LaunchScreen.storyboard mới. Chúng ta bắt buộc phải có file này, bởi vì ứng dụng sẽ không sử dụng ảnh @3x nếu ứng dụng đó không có file LaunchScreen.storyboard. Mà các bạn biết đấy, iPhone X sử dụng ảnh @3x

### c. Sử dụng safe area

Nếu ứng dụng của bạn chưa sử dụng safe area, thì các bạn cần bật chế độ sử dụng safe area. Sử dụng safe area đối với iPhone X là rất quan trọng, nó sẽ giúp các bạn tránh các vùng tai thỏ, home ảo,…

Khi bật chế độ sử dụng safe area, layout các UIView có thể bị lệch đi, hãy check hết các màn hình và sửa lại những chỗ bị lệch để đảm bảo rằng layout các màn không bị lệch. 

Để kiểm tra layout ngay trong file storyboard, các bạn có thể chọn View as: iPhone X trong storyboard. kiểm tra layout ngay trong storyboard sẽ giúp chúng ta kiểm tra nhanh hơn, phát hiện các lỗi layout sớm hơn.

![](https://images.viblo.asia/99e2e8a5-7515-44cd-8df8-cc89f86889fb.png)

### d. Status bar và toolbar

Hãy kiểm tra tất cả các UIView nào đã bị fix giao diện dựa vào chiều cao 20 point của status bar và 44 point của toolbar trong ứng dụng. trên iPhone X, status bar có chiều cao là 44 point và toolbar có chiều cao là 83 point. Hãy chắc chắn rằng các UIView đó sẽ có chiều cao thay đổi tuỳ thuộc vào device đang chạy là iPhone X hay các iPhone khác.

# III. Tổng kết

Trên đây tôi đã giới thiệu đến các bạn những thay đổi về mặt UI trên iPhone X và những việc chúng ta cần làm để giao diện không bị vỡ/lệch trên iPhone X. Hi vọng bài viết này sẽ giúp ích được các bạn trong quá trình phát triển ứng dụng trên iPhone X nói riêng và iOS nói chung.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!