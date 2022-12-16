React-Native là một framework mobile đa nền tảng cho phép bạn xây dựng ứng dụng bằng JavaScript, không giống như những công nghệ mobie khác mà bạn chỉ xây dựng một "mobile Web App" (Một app xây dựng bằng web view). Code JavaScript của bạn được biên dịch thành một ứng dụng không khác gì so với việc bạn dùng Objective-C và Java để xây dựng ứng dụng iOS hoặc Android. 


Nhiệm vụ của chúng ta ở đây là kiểm tra xem sự thực có đúng như những gì được mô tả ở bên trên không/ Để làm được điều đó, chúng ta cần phải build cùng một ứng dụng như nhau ở trên cả Swift và React-Native; nó vừa cần phải dễ ở điểm chúng ta phải hoàn thiện được ứng dụng đó trong thời gian cho phép và vừa đủ độ khó để so sánh được CPU, GPU, Memory, và năng lượng dùng cho ứng dụng này. Ứng dụng sẽ có 4 tab. Tab thứ nhất sẽ có tên là "Profile" và sẽ cho phép người dùng đăng nhập vào Facebook để lấy thông tin về ảnh, tên và địa chỉ email sau đó hiển thị chúng trên trang. Tab thứ hai sẽ gọi là  "To-Do List" và nó chỉ đơn giản là hiển thị một danh sách dùng NSUserDefaults. Nó sẽ có cả "thêm item" và "xóa item". Tab thứ ba sẽ tên là "Page Viewer" và nó sẽ chứa một Page View Controller. Page View Controller này sẽ có ba màn hình để người dùng có thể swipe được (màn hình màu "Green", "Red" và "Blue"). Tab cuối sẽ tên là "Maps" và nó sẽ chứa một Map View có thể zoom vào vị trí người dùng hiện tại với một chấm xanh để thể hiện vị trí. 

## Swift Process
Đầu tiên là iOS và Swift. Học Swift khá dễ, nó gần giống với Java và C++. Tuy nhiên việc học về Cocoa Touch sẽ khó nhằn hơn một chút. Đối với IDE thì đó là Xcode, cực kì dễ dùng và dễ phát triển. Bạn có thể sử dụng Storyboard là tạo ra các màn hình mà bạn muốn. Bạn có thể lấy code ở đây để bỏ qua quá trình phát triển : https://github.com/jcalderaio/swift-honors-app
![](https://images.viblo.asia/7aa8eae8-500f-45a9-a9d3-81e084b96f8a.PNG)
![](https://images.viblo.asia/89f23f88-c4db-48c7-b276-3750899e873e.PNG)
![](https://images.viblo.asia/be2dfbf1-d6a6-43a7-9f85-c1b4cb768abf.PNG)
![](https://images.viblo.asia/21434ed7-f25d-4e13-9e3c-60cb0886f73e.PNG)

## React-Natvie Process
Đối với React-Native, JavaScript sẽ khó khăn hơn so với Swift. Nhưng điều thú vị ở React-Native đó là, không giống với iOS, tất cả các dòng code bạn viết ra đều mang ý nghĩa. Thêm nữa, nếu như trong iOS bạn sẽ phải tùy chỉnh sao cho mỗi trang nhìn đẹp đối với Landscape và Portrait cho từng kích cỡ màn hình thì với React-Native bạn không cần phải làm điều đó. Nó sẽ tự điều chỉnh cho bạn. Bạn có thể lấy code ở đây : https://github.com/jcalderaio/react-native-honors-app
![](https://images.viblo.asia/94a4a0a9-0f9c-471c-9e5a-20fb6cb9c338.PNG)
![](https://images.viblo.asia/6b0a558e-18f5-4221-bfdb-0a1891942571.PNG)
![](https://images.viblo.asia/83f7c957-2052-42e3-84d1-0a6d87a28ba0.PNG)
![](https://images.viblo.asia/fc71844e-dec2-4009-bea4-6232c8e988b5.PNG)

## Dữ liệu
Bây giờ đến lúc đưa hai ứng dụng vào để so sánh xem cái nào có performance tốt hơn. Tôi sẽ dùng Apple Instruments để kiểm tra với ba hạng mục sau: CPU ("Time Profiler Tool"), GPU("Core Animation Tool") và Memory Usage ("Allocation Tool"). 
Có 4 tab ở trong mỗi app tương đưới với những nhiệm vụ khác nhau để dùng đo cho những hạng mục trên. Tab đầu tiên sẽ đăng nhập vào Facebook và lấy thông tin từ server của Facebook. Tab thứ hai sẽ thêm và xóa một danh sách dữ liệu. Tab thứ ba sẽ cho phép swipe qua nhiều trang. Tab thứ tư sẽ hiển thị bản đồ và cần tới GPS để zoom vào bản đò đó.

## CPU
![](https://images.viblo.asia/8edb6844-64c5-4da9-9e7d-a7cbe0855ca7.PNG)
Hãy vào từng hạng mục :
* Profile : React-Native chiến thắng với 1.86% hiệu quả hơn với CPU. Trong khi thực hiện nhiệm vụ này và ghi lại kết quả đo lường, CPU được sử dụng tăng lên đúng vào lúc tôi ấn vào button.
* To Do List : Lần này vẫn React-Native thắng với 1.53% hiệu quả hơn. Kết quả được đo vào lúc tôi thêm và xóa item.
* Page View : Tuy nhiên lần này, Swift đã hiệu quả hơn tới 8.82%. Kết quả đo được tôi ghi lại vào lúc tôi swipe qua lại các màn hình. Khi dừng việc swipe lại thì CPU có giảm xuống, nhưng nếu swipe tiếp thì nó lại tăng lên.
* Maps : Swift thắng lớn với 13.68% hiệu quả hơn. Kết quả được ghi lại vào túc tôi ấn vào tab "Maps", cũng là lúc MapView tìm vị trí và highlight vị trí của tôi.

Vâng chúng ta có thể thấy Swift thể hiện sự thắng thế vượt trội về CPU tới 17.58%. Tuy nhiên ở đây tôi chỉ tập trung vào việc xử lý của từng tab chứ không quan tâm đến việc sử dụng qua lại giữa các tab.

## GPU

![](https://images.viblo.asia/6621f9f9-46cc-4b05-a31b-46b8550195cf.PNG)
Hãy vào từng hạng mục :
* Profile : Swift nhỉnh hơn với FPS(frame per second) cao hơn là 1.7 so với React-Native. Kết quả được đo vào lúc tôi ấn vào button.
* To Do List : React-Native hơn hẳn 6.25 FPS so với Swift. Kết quả được đo vào lúc tôi thêm vào xóa item.
* Page View : Swift lại thắng React-Native với 3.6 FPS. Kết quả được đo vào lúc tôi swipe màn hình, tuy nhiên nếu như tôi swipe nhanh thì FPS có thể lên tới 50.
* Maps : React-Native thắng hạng mục này với 3 FPS hơn. Kết quả được đo vào lúc hiển thị bản đồ.

Ở lần này, Swift hòa với React-Native về số tab thắng. Tuy nhiên tổng thể thì React-Native hơn 0.95 FPS so với swift. 

## Memory
![](https://images.viblo.asia/a0def6e4-b17e-4547-9ce2-1e5b0a49c137.PNG)
Hãy vào từng hạng mục :
* Profile : Swift ít hơn với 0.2 MiB so với React-Native. Kết quả được đo vào lúc tôi ấn vào button.
* To Do List : React-Native ít hơn 0.83 MiB so với Swift. Kết quả được đo vào lúc tôi thêm vào xóa item.
* Page View : React-Native tiếp tục thắng với ít hơn 0.04 MiB so với Swift. Kết quả được đo vào lúc tôi swipe màn hình, tuy nhiên nếu như tôi swipe nhanh thì FPS có thể lên tới 50.
* Maps : React-Native thắng hạng mục này với số lượng memory ít hơn kỉ lục với Swift đó là 61.11 MiB. Kết quả được đo vào lúc hiển thị bản đồ.

React-Native thắng 3 còn Swift thắng 1. Tuy nhiên điều đáng nói ở đây là React-Native ít hơn 61.96 MiB so với Swift.

## Kết luận
Ứng dụng tôi làm với cả 2 nền tảng là y hệt nhau và bạn có thể thấy dữ liệu tôi thu thập được đối với CPU, GPU và Memory đối với bốn tab. Swift hơn về CPU nhưng React-Native lại hơn về GPU và Memory. Từ đây có thể lấy được React-Native bằng một cách nào đó sử dụng Memory và GPU rất hiệu quả. Tuy nhiên điều này không đồng nghĩa với Android sẽ hơn. Qua kết quả trên có thể thấy React-Native đúng là một nền tảng cho tương lai với quá nhiều ưu điểm. Cảm ơn các bạn đã đón xem.

REF: https://medium.com/the-react-native-log/comparing-the-performance-between-native-ios-swift-and-react-native-7b5490d363e2