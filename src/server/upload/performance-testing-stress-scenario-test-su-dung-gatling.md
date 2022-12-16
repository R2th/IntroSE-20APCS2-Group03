### Giới thiệu
Gatling là gì
Gatling là hệ thống stress test sử dụng ngôn ngữ scala, dựa trên nền tảng là akka, netty. Mặc dù viết bằng scala, nhưng các bạn đừng hoảng sợ vội :D

### Chức năng của gatling:
Test theo scenario sử dụng scenario script viết bằng scala ( gatling script cực kì dễ viết ;) )
Report kết quả bằng html file với giao diện đẹp và rất dễ nhìn
Trang bị sẵn "recorder" giúp các bạn có thể tạo scenario bằng việc "record" lại các thao tác trên browser

### Cài đặt và sử dụng
Các bạn download Gatling bundle tại đường link sau: http://gatling.io/#/download.
Sau đó giải nén vào một thư mục nào đó,

**Record**
***Step 1***
Đầu tiên để làm quen chúng ta sẽ tạo thử một scenario script bằng cách record lại thao tác trên màn hình.
Cách record vô cùng đơn giản, chỉ cần bạn vào thư mục vừa giải nén ở trên, sau đó chạy dòng lệnh tương ứng dưới đây:

bin/recorder.sh #linux
bin/recorder.bat #windows
Chú ý là gatling sử dụng scala, tức là yêu cầu máy của bạn phải cài sẵn java.
Sau khi chạy thì sẽ hiện lên màn hình
![](https://images.viblo.asia/18f707ce-4319-406e-85ee-f847782d997d.png)
Có khá nhiều mục để điền, cơ mà bạn đừng lo, ở step này thì bạn chả phải làm gì cả.

***Step 2***
Việc tiếp theo bạn phải làm là setting proxy cho browser.
Tại sao lại cần làm việc này? Lý do là vì gatling sẽ record lại thao tác của bạn nhờ http request thông qua proxy server mà chính nó dựng lên, rất thú vị phải không. Gatling về cơ bản sẽ dựng 1 proxy server bên trong chính nó, với port là Listening port trong hình ở trên. Khi bạn config browser của bạn sử dụng proxy này, mọi thao tác http request sẽ được gatling bắt lại, sau đó dựa vào đó để tạo nên scenario script :).
![](https://images.viblo.asia/e20488cd-6d19-484f-88dd-d268a70fb3a5.png)

***Step 3***
Bạn click nút start trên gatling, và sau đó thao tác một số thao tác bất kì trên firefox. Để test thì mình sẽ làm thử các thao tác sau:
* Vào viblo.asia
* Search từ khóa "Tester"
* Vào 1 bài trong list kết quả vừa tìm được để xem

Bạn sẽ thấy trên màn hình gatling hiện ra tất cả các thao tác bạn vừa làm, cả thời gian chờ giữa các thao tác.
![](https://images.viblo.asia/673c2cb1-9215-4a98-8868-e818fde9b007.png)
Sau khi hoàn thành xong thì bạn ấn nút Stop & Save, những thao tác bạn vừa làm sẽ được lưu tại thư mục
~/GATLING/user-files/simulations/RecordedSimulation.scala
![](https://images.viblo.asia/22ebbeaf-635f-40cc-82d1-4896988bc72b.png)

### Run Scenario
Bước tiếp theo sẽ là, bạn sử dụng file scenario vừa tạo ở trên để chạy stress test. Cách chạy cũng rất đơn giản, bạn chỉ cần chạy file bash:

~/GATLING/bin/gatling.bat

![](https://images.viblo.asia/f681875f-5013-45c9-868b-7355e9c80c37.png)
Lưu ý: [0] [1] [2] [3] [4] là các file scenario bạn vừa tạo.
Muốn chạy cái nào thì ấn số ấy. Mình sẽ chạy file Test03 nên mình sẽ ấn (3)
Sau đó chỉ cần enter cho đến khi script chạy xong.
![](https://images.viblo.asia/2e891988-bede-46d6-9e78-3c8282dbb761.png)

Kết quả chạy sẽ được report vào một file html nằm ở cuối cùng
Please open the following file: results\test03-20191015094510689/index.html

Mở file html ra bạn sẽ thấy một report rất chi tiết bao gồm:　Số lượng request gửi, số lượng request thất bại, tỉ lệ
![](https://images.viblo.asia/c99b00c4-8350-4008-8778-ee684a4bdd24.png)

### Kết luận
Với gatling các bạn có thể tạo stress test scenario vô cùng dễ dàng.