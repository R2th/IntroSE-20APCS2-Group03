# Lưu ý
 - Trước khi đọc tiếp thì các bạn nên đọc 2 bài viết trước của mình về AWS nhé. Vì bài này không nhắc lại các khái niệm. 
   - [AWS-IoT](https://viblo.asia/p/aws-iot-internet-of-thing-xay-he-thong-chi-voi-1-oOVlYyDvl8W)
   - [AWS-Lambda](https://viblo.asia/p/angular4-amazon-web-service-cognito-iam-api-lambda-iot-gGJ59XNrlX2)

# Đặt Vấn Đề

Nông trại nhà mình (ví dụ thôi nhé) bắt đầu ứng dụng hệ thống **AWS-IoT** để quản lý mọi thiếu bị qua Cloud, từ quản lý tưới, đo độ ẩm, hệ thống mai che... Nhưng bởi vì nông trại nhà mình quá lớn (nhà giàu mà) nên sau khi đầu tư thiết bị điều khiển qua Cloud thì mình gặp các vấn đề sau:
 
 - Chi phí hàng tháng lên cả 10.000$
 - Internet ở VN thường xuyên bị cá mập cắn, nên mỗi khi đứt mạng thì hệ thống cả chục tỉ $ của nông trại nhà mình coi như đống sắt vụn.
 - Cái hệ thống quá chuối, giá như mà nó thông minh hơn. Hễ mà độ ẩm quá thấp thì tự tưới, hoặc nhiệt độ quá cao giữa trời nóng thì tự động đóng mái che lại. Chứ mình không thích lâu lâu phải dán mắt lên màn hình để theo dõi mọi thứ (Đừng nghĩ tới AI nhé :D. Chưa cần thiết đâu).
 
# Giải Quyết Vấn Đề

Để giải quyết nhu cầu trên, AWS-IoT có một khái niệm mới để xử lý các thiết bị (Thing) ở local (không biết dịch ra tiếng việt sao). Tức là khi có internet, các thiết bị vẫn hoạt động, vẫn có thể sử dụng các dịch vụ khác trên Cloud, nhưng chẳng may đứt mạng thì các thiết bị vẫn tự vận hành được như mô hình đã được định nghĩa sẵn trước đó - chỉ khác là không thể sử dụng các dịch vụ khác trên Cloud thôi. Đó chính là sức mịnh của **AWS - IoT GreenGrass**

![GreenGrass](https://docs.aws.amazon.com/greengrass/latest/developerguide/images/greengrass.png)

Mô hình trên gồm 3 thứ:
  - Cloud: Đây là AWS-IoT service mà AWS cung cấp 
  - Greengrass Group: Đây là hệ thống(mô hình) dưới nông trại của mình 
    - **Greengrass Core**: **Đây là một phần mềm được cài đặt trên cục Gateway** của hệ thống. Gateway là gì? Google tìm hiểu thêm nhé, nó giống như trung tâm đầu não, vì các thiết bị nhỏ lẻ kia không thể xử lý các tác vụ phức tạp nên thường các thiết bị đó sẽ sẽ gởi dữ liệu về 1 cái máy tính để xử lý ... Nhưng vì máy tính qúa bự... người ta thu nhỏ nó lại như cái cục mô-đum mạng thôi, ngoài ra nó còn được gắn thêm các phần mềm, phần cứng, cổng kết nối..v.v... nên túm lại là giá của nó tương đối cao. Các bạn dev có thể dùng con Pi3 để giả lập nhé (vọc thôi). Bên cạnh đó ... Trong Greengrass còn có chứa **Lambda function**, đây là nơi để mình viết script, điều khiển các **thing** với nhau
    - **Greengrass Device**: **Đây là một phần mềm được cài đặt trên các thiết bị (Thing)**. Các thiết bị này tương đối yếu đuối nên chỉ có việc là lắng nghe dữ liệu từ các sensor độ ẩm, nhiệt độ... rồi publish/subscribe (gởi, nhận) đến trung tâm đầu não (gateway) để xử lý.

Trước khi đi vào sâu hơn, mình sẽ nói sơ qua cách hoạt động của mô hình trên. Trên phía cloud của AWS, sau khi đăng nhập vào cloud, sẽ có phần quản trị bằng giao diện - nếu mình cắt dán hết vào đây thì sẽ loãng bài lắm nên mình không làm vậy, với giao diện này mình có thể tạo ra các gói phần mềm (greengrass core + lambda, greengrass device) để cài đặt vào gateway và các thiết bị (things)

Sau khi khởi tạo xong, Cloud cho phép mình định nghĩa các topic (MQTT) trong Greengrass Group. Với các topic này, các things có thể nói chuyện đơn giản với nhau, hoặc các things cũng có thể nói chuyện trực tiếp với Gateway. Nếu bạn nào từng viết ứng dụng chat thì nó giống như channel, các channel riêng biệt để các client riêng biệt có thể giao tiếp với nhau.

![CreateSoftware](https://docs.aws.amazon.com/greengrass/latest/developerguide/images/gg-get-started-009.png)
Phía trên là giao diện khi tạo ra 1 Greengrass Group. Chúng ta cần download source xuống để install vào Gateway

Sau khi tạo greengrass group và thing xong thì mình sẽ tạo ra mô hình nói chuyện giữa các thing với nhau

![control](https://github.com/minhlong/Angular4-AWS-Cognito-IAM-API-Lambda-IoT/raw/master/readme/controls.png)

Ở hình trên các bạn thấy mình có 2 Thing.
  - Thing 1 sẽ nói chuyện với Thing 2 qua topic gì gì đó để tổng hợp dữ liệu
  - Thing 2 sẽ nói chuyện với Lambda (HMLong:Spark-lib) qua topic gì đó để xử lý dữ liệu
  - Lambda sau khi xử lý dữ liệu sẽ gởi lên Cloud qua topic gì gì đó. Vì trong demo này mình có dùng đến các service khác nên cần Lambda đẩy lại lên Cloud, chứ nếu mô hình nông trại như trên thì mình không cần tạo record này, chỉ cần tạo 2 cái trên nữa là đủ.

Sau khi mình build mô hình xong. Mình sẽ nhấn "Deploy" để Cloud đẩy mô hình này xuống nông trại của mình. Sau khi đẩy thành công (successfully) thì Cloud sẽ báo lại cho mình, các bạn xem kỹ phía hình trên nhé. Lưu ý là có những lần deploy fail nữa nha các bạn - và thời gian nhanh chậm là tùy tốc độ mạng - gói script lambda của bạn có lớn không. Gói scrip của mình khoảng 220Mb với tốc độ 1-2Gb thì mất tầm 20s :D (Test chơi cho vui)

![deploy](https://github.com/minhlong/Angular4-AWS-Cognito-IAM-API-Lambda-IoT/raw/master/readme/deploy.png)

Sau khi deploy thành công, thì hệ thống nông trại sang chảnh nhà mình có thể chạy được rồi đó các bạn.
  - Lúc này nếu đứt net thì mô hình bên dưới không bị hề hấn gì nhé. Lúc này mọi thứ **sẽ vẫn giao tiếp với nhau qua mạng LAN cục bộ**, chỉ khác cái là không có internet thôi
  - Lúc này thì thing 1 và thing 2 không gởi dữ liệu lên Cloud. Vậy nên mình không bị tính tiền ... và thế là mỗi tháng đỡ tốn cả 10.000$ nhé :D
  - Nếu một mai mình muốn Thing 2 gởi dữ liệu cho Thing 1 với một mô hình khác, hoặc mình muốn xử lý lại dữ liệu (update lamda function) thì mình chỉ việc lên Cloud ... điều chỉnh lại mô hình ... rồi cắm dây mạng lại ... rồi Deploy lại ... thế là xong 

Còn nếu như mô hình lớn hơn nữa, xuyên quốc gia, xuyên lục địa ... thì các bạn có thể ứng dụng mô hình sau :D 

![final](https://github.com/minhlong/Angular4-AWS-Cognito-IAM-API-Lambda-IoT/raw/master/readme/final.png)
 
# Tổng kết

Phía trên chỉ là cưỡi ngựa xem hoa. Vì mục đích chỉ là muốn giới thiệu đến các bạn những khái niệm mới. Và AWS thật sự là rất rất rất rất khủng. Thực tế khi đi sâu vào vấn đề trên mình gặp rất nhiều vấn đề ... nhưng nhờ vậy mình cũng học được nhiều thứ.

Khi làm tới đây mình bị rào cản bởi BigData và AI, Machine Learning ... thế là mình phải đào sâu xuống thêm tí nữa (may mà có Python) ... còn về phần cứng thì mình không dám đào sâu xuống, chỉ biết để nắm các khái niệm về điều khiển (may mà có tool Node-Red).

Nhớ lại những ngày đầu đọc Doc của AWS rất muốn nổi điên, nhưng dần ổn rồi các bạn ạ. Mình cũng không giỏi tiếng Anh đâu :) Chỉ là đọc - hiểu và ứng dụng thôi. Nên các bạn cũng chịu khó đọc và tìm hiểu nhé ... rồi share lại kiến thức về các AWS Service cho mọi người cùng biết :D

Hiện tại thì AWS có rất nhiều service ... và mình không thể nắm hết được. Nên mình định tạo ra 1 Group nhỏ để sermina với nhau vào cuối tuần. Mình có thử tìm trên google và facebook nhưng hình như ở VN mình chưa có group nào như vậy thì phải ? Bạn nào biết thì chỉ mình với nhé, còn nếu muốn join vào group thì liên hệ với mình qua Skype nhé (bạn sẽ biết skype của mình là gì thôi ... nếu bạn muốn tìm). Mình ở khu Cư Xá Bắc Hải, nên chắc mình chỉ có thể gặp các bạn ở gần khu đó - tại quán Coffee House đối diện đại học Bách Khoa

Trong quá trình viết bài nếu mình có ghi gì làm phật lòng thì các bạn comment để mình sửa lại nhé. Cảm ơn các bạn