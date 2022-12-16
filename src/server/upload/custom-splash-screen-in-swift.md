**Chào các bạn! Rất vui vì đã có chút thời gian rảnh để vào viblo chia sẻ một skill khá nhỏ nhưng vô cùng thú vị. 
Lần này mình chia sẻ với các bạn về cách custom màn hình Splash screen hay còn gọi là Launch Screen. Để set up UI 
cho Launch Screen chúng ta thường set up trong file LaunchScreen.storyboard. Nhưng khi display thì thực sự mình cảm 
thấy khá cứng nhắc và vô hồn. Rất may mắn khách hàng gần đây của mình có yêu cầu làm cho màn hình này sinh động một chút 
để user có thể cảm thấy thích thú ngay từ lúc mở app.**

Design của Launch Screen app mình như thế này : 
![](https://images.viblo.asia/c8bbc8b9-0d80-4bed-a887-a3cb741a9a8b.png)

Trông có vẻ đẹp nhưng mình cảm thấy rất nhàm chán khi màn hình xuất hiện nó luôn như này dù chỉ vài giây. 
Tôi quyết định sẽ làm cho nó có một chút animation để tối ưu UX cho màn hình này. Nhưng làm sao để làm animation được 
vì đây là file LaunchScreen.storyboard, code ở đâu giờ nhỉ :). Thôi thử làm theo cách này vậy. 
Tôi tạo một ViewController và đặt tên là SplashScreen và layout y hệt Launch Screen.
 ![](https://images.viblo.asia/8991693a-5aa8-4502-8cf1-b990236aa480.png)

Các bạn có thể nhìn thấy background so với ban đầu có vẻ khác. Tôi đàng cố tình để như vậy để thực hiện âm mưu của mình :D. 

Giờ tôi sửa lại chút UI cho Launch Screen đã nhé. Để âm mưu được thực hiện hoàn hảo hơn.
 ![](https://images.viblo.asia/a1ab75ea-304a-491c-8bfc-079826791a8d.png)

Tôi đã sửa lại 2 thứ: 1 là background của screen, 2 là color của bóng đèn kia để user nhìn vào có cảm giác như bóng đèn đó chưa bật. 

Giờ vào code cái SplashScreen các bạn nhỉ. Ở design ban đầu như mình đã chia sẻ thì chắc chắn mình phải để background là gradient rồi. 
Việc set gradient color rất nhiều cách. Nhưng ở đây mình dùng ChameleonFramework để thực. Thư viện này khá hay và hỗ trợ về màu khá tốt 
các bạn có thể tìm hiểu thêm hoặc mình sẽ chia sẻ ở bài tới nhé. 

Đầu tiên mình tạo 1 array 2 màu cần set up gradient color cho background screen. 

![](https://images.viblo.asia/73f8284d-a688-439c-a365-f80c7dc7acca.png)

> import thư viện ChameleonFramework : import ChameleonFramework

Hàm set gradient color của ChameleonFramework rất đơn giản và giờ tôi sẽ thêm nó vào với array color đã tạo bên trên và đặt nó vào viewDidLoad

![](https://images.viblo.asia/46e7a130-16f3-4c37-8f02-6e6d39134974.png)

Giờ việc cần thiết nhất là set up cho Splash screen chạy ngay sau Launch Screen các bạn nhé. Để thực hiện điều này ta chỉ cần vào hàm didFinishLaunchingWithOptions
trong Appdelegate.swift và set rootViewController cho window như này là được.

![](https://images.viblo.asia/b886a42c-1bfc-4fa1-9949-1989f0fb9f9e.png)

Sau đó các bạn set lại rootViewController cho App bằng màn hình bạn cần run đầu tiên ở viewDidAppear trong SplashScreen là được nhé. Ở đây của tôi là màn hình login như bao app khác :D

![](https://images.viblo.asia/396b32df-ed1e-4995-abc3-47a522482661.png)


**Tuỳ theo yêu cầu và design của từng app tôi nghĩ các bạn có thể làm theo mẹo nhỏ này để custom LaunchScreen nhé. Hy vọng bài chia sẻ này sẽ giúp ích đôi chút cho các bạn trong lúc làm việc. 
Rất cảm ơn các bạn!**