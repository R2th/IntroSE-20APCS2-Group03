### 1. Google Firebase là gì?

 ![](https://images.viblo.asia/0dc9e59e-3ac1-4b4f-a964-32a5de50b54a.jpg)

#### 1.1 Định nghĩa Firebase

Có nhiều cách hiểu về Firebase khi đứng trên các quan điểm khác nhau, sau đây là 2 định nghĩa cơ bản.

- [Firebase](https://firebase.google.com/) là một nền tảng di động giúp bạn nhanh chóng phát triển các ứng dụng chất lượng cao, phát triển ứng dụng cho người dùng quy mô lớn và kiếm được nhiều tiền hơn.
(Firebase gives you the tools to develop high-quality apps, grow your user base, and earn more money. We cover the essentials so you can monetize your business and focus on your users.)

- Firebase là một dịch vụ hệ thống backend được Google cung cấp sẵn cho ứng dụng Mobile của bạn, với Firebase bạn có thể rút ngắn thời gian phát triển, triển khai và thời gian mở rộng quy mô của ứng dụng mobile mình đang phát triển. Hỗ trợ cả 2 nền tảng Android và IOS, Firebase mạnh mẽ, đa năng, bảo mật và là dịch vụ cần thiết đầu tiên để xây dưng ứng dụng với hàng triệu người sử dụng.

#### 1.2 Lợi ích khi sử dụng Firebase

-	Xây dựng ứng dụng nhanh chóng mà không tốn thời gian, nhân lực để quản lý hệ thống và cơ sơ sở hạ tầng phía sau: Firebase cung cấp cho bạn chức năng như phân tích, cơ sở dữ liệu, báo cáo hoạt động và báo cáo các sự cố lỗi để bạn có thể dễ dàng phát triển, định hướng ứng dụng của mình vào người sử dụng nhằm đem lại các trải nghiệm tốt nhất cho họ.
-	Uy tín chất lượng đảm bảo từ Google: Firebase được google hỗ trợ và cung cấp trên nền tảng phần cứng với quy mô rộng khắp thế giới, được các tập đoàn lớn và các ưng dụng với triệu lượt sử dụng từ người dùng.
-	Quản lý cấu hình và trải nghiệm các ứng dụng của Firebase tập trung trong một giao diện website đơn giản, các ứng dụng này hoạt động độc lập nhưng liên kết dữ liệu phân tích chặt chẽ.

#### 1.3 Điểm yếu của Firebase

Điểm yếu duy nhất của “Firebase” chính là phần Realtime Database, mà đúng hơn chỉ là phần Database. Cơ sở dữ liệu của họ được tổ chức theo kiểu trees, parent-children, không phải là kiểu Table nên những ai đang quen với SQL có thể sẽ gặp khó khăn từ mức đôi chút tới khá nhiều. 

### 2. Tổng quan các dịch vụ mà Firebase cung cấp

Firebase cung cấp cho chúng ta công cụ Firebase Analytics và 2 nhóm sản phẩm chính tập trung vào 2 đối tượng là:
-	Develop & test your app: phát triển và kiểm thử các ứng dụng được thiết kế.
-	Grow & engage your audience: Phân tích dữ liệu và tối ưu hóa trải nghiệm đối với người dùng.

![](https://images.viblo.asia/c09ef707-d4d6-4a88-8412-5c7279a29cf5.png)

#### 2.1 Firebase Analytics

Là một giải pháp miễn phí và phân tích không giới hạn. Quản lý hành vi người dùng và các biện pháp từ một bảng điều khiển duy nhất.
Phân tích thuộc tính và hành vi của người dùng trong một bảng điều khiển đơn để đưa ra các quyết định sáng suốt về lộ trình sản phẩm của bạn. Nhận thông tin chi tiết về thời gian thực từ báo cáo hoặc xuất dữ liệu thô sự kiện của bạn tới Google BigQuery để phân tích tùy chỉnh.

![](https://images.viblo.asia/059d31de-b60b-4da4-b985-b7c69f314ec5.png)

### 2.2 Nhóm công cụ Develop & test your app
- [**Realtime Database**](https://firebase.google.com/products/realtime-database/): Lưu trữ và đồng bộ dữ liệu người dùng thời gian thực, các ứng dụng hỗ trợ tính năng này có thể lưu trữ và lấy dữ liệu từ máy chủ trong tích tắc. Các dữ liệu được lưu trữ trong hệ thống cơ sở dữ liệu hỗ trợ NoSQL và được đặt trên nền tảng máy chủ Cloud, dữ liệu được ghi và đọc với thời gian thấp nhất tính bằng mili giây. Nền tảng này hỗ trợ đồng bộ hóa dữ liệu của người dùng kể cả khi không có kết nối mạng, tạo nên trải nghiệm xuyên suốt bất chấp tình trạng kết nối internet của người sử dụng. Reatime Database của Firebase hỗ trợ: android, ios, web, c++, unity, và cả xamarin.

- **Crashlytics**: Hệ thống theo dõi và lưu trữ thông tin lỗi của ứng dụng đang chạy trên máy người dùng. Các thông tin lỗi này được thu thập một các toàn diện và ngay tức thời. Cách trình bày hợp lý với từng chu trình hoạt động đến khi xảy ra lỗi, các báo cáo trực quan giúp người phát triển có thể nắm bắt và xử lý kịp thời các lỗi chính của ứng dụng.

- **Cloud Firestore**: Lưu trữ và đồng bộ dữ liệu giữa người dùng và thiết bị – ở quy mô toàn cầu – sử dụng cơ sở dữ liệu noSQL được lưu trữ trên hạ tầng cloud. Cloud Firestore cung cấp cho bạn tính năng đồng bộ hóa trực tuyến và ngoại tuyến cùng với các truy vấn dữ liệu hiệu quả. Tích hợp với các sản phẩm Firebase khác cho phép bạn xây dựng các ứng dụng thực sự ngay cả khi kết nối internet bị gián đoạn.

- **Authentication**: Quản lý người dùng một cách đơn giản và an toàn. Firebase Auth cung cấp nhiều phương pháp để xác thực, bao gồm email và mật khẩu, các nhà cung cấp bên thứ ba như Google hay Facebook, và sử dụng trực tiếp hệ thống tài khoản hiện tại của bạn. Xây dựng giao diện của riêng bạn hoặc tận dụng lợi thế của mã nguồn mở, giao diện người dùng tùy biến hoàn toàn.

- **Cloud Functions**: Mở rộng ứng dụng của bạn bằng mã phụ trợ tùy chỉnh mà không cần quản lý và quy mô các máy chủ của riêng bạn. Các chức năng có thể được kích hoạt bởi các sự kiện, được phát sinh ra bởi các sản phẩm Firebase, dịch vụ Google Cloud hoặc các bên thứ ba có sử dụng webhooks.

- **Cloud Storage**: Lưu trữ và chia sẻ nội dung do người dùng tạo ra như hình ảnh, âm thanh và video với bộ nhớ đối tượng mạnh mẽ, đơn giản và tiết kiệm chi phí được xây dựng cho quy mô của Google. Các Firebase SDK cho Cloud Storage thêm tính năng bảo mật của Google để tải lên và tải tệp cho các ứng dụng Firebase của bạn, bất kể chất lượng mạng.

- **Hosting**: Đơn giản hóa lưu trữ web của bạn với các công cụ được thực hiện cụ thể cho các ứng dụng web hiện đại. Khi bạn tải lên nội dung web, chúng tôi sẽ tự động đẩy chúng đến CDN toàn cầu của chúng tôi và cung cấp cho họ chứng chỉ SSL miễn phí để người dùng của bạn có được trải nghiệm an toàn, đáng tin cậy, độ trễ thấp, dù họ ở đâu.

- **Test Lab**: Chạy thử nghiệm tự động và tùy chỉnh cho ứng dụng của bạn trên các thiết bị ảo và vật lý do Google cung cấp. Sử dụng Firebase Test Lab trong suốt vòng đời phát triển của bạn để khám phá lỗi và sự không nhất quán để bạn có thể cung cấp một trải nghiệm tuyệt vời trên nhiều thiết bị.

- **Performance Monitoring**: Chẩn đoán các vấn đề về hiệu suất ứng dụng xảy ra trên thiết bị của người dùng của bạn. Sử dụng dấu vết để theo dõi hiệu suất của các phần cụ thể trong ứng dụng của bạn và xem chế độ xem tổng hợp trong bảng điều khiển Firebase. Luôn cập nhật thời gian khởi động của ứng dụng và theo dõi các yêu cầu HTTP mà không cần viết bất kỳ mã nào.

#### 2.3 Nhóm công cụ Grow & engage your audience
- **Google Analytics**: Phân tích thuộc tính và hành vi của người dùng trong một bảng điều khiển đơn để đưa ra các quyết định sáng suốt về lộ trình sản phẩm của bạn. Nhận thông tin chi tiết về thời gian thực từ báo cáo hoặc xuất dữ liệu sự kiện thô của bạn tới Google BigQuery để phân tích tùy chỉnh.

- **Cloud Messaging**: Gửi tin nhắn và thông báo cho người dùng qua các nền tảng Android, iOS và web một cách miễn phí. Bạn có thể gửi tin nhắn đến các thiết bị, nhóm thiết bị hoặc các chủ đề hoặc phân đoạn người dùng cụ thể. Nhắn tin đám mây Firebase (FCM) thậm chí là các ứng dụng lớn nhất, cung cấp hàng trăm tỷ thư mỗi ngày.

- **Predictions**: Firebase Predictions áp dụng deep learning máy học với dữ liệu phân tích của bạn để tạo các nhóm người dùng năng động dựa trên hành vi dự đoán. Các nhóm người dùng này có thể được sử dụng để nhắm mục tiêu trong các sản phẩm khác như thông báo, Cấu hình từ xa và nhiều hơn nữa.

- **Dynamic Links**: Sử dụng Liên kết động để cung cấp trải nghiệm người dùng tùy chỉnh cho iOS, Android và web. Bạn có thể sử dụng chúng để hỗ trợ web di động để thúc đẩy chuyển đổi ứng dụng gốc, người dùng chia sẻ người dùng, các chiến dịch xã hội và tiếp thị và hơn thế nữa. Dynamic Links cung cấp cho bạn các thuộc tính bạn cần để hiểu rõ hơn về tăng trưởng di động của bạn. Đây là dịch vụ thay thế goo.gl của Google.

- **Remote Config**: Tùy chỉnh cách ứng dụng của bạn hiển thị cho mỗi người dùng. Thay đổi giao diện, triển khai các tính năng dần dần, chạy thử nghiệm A / B, cung cấp nội dung tùy chỉnh cho người dùng nhất định hoặc thực hiện các cập nhật khác mà không cần triển khai một phiên bản mới-tất cả từ bảng điều khiển Firebase. Giám sát tác động của những thay đổi của bạn và thực hiện các điều chỉnh chỉ trong vài phút.

- **Invites**: Cho phép người dùng chia sẻ tất cả các khía cạnh của ứng dụng của bạn, từ mã giới thiệu đến nội dung yêu thích, qua email hoặc SMS. Giải pháp out-of-the-box này hoạt động với Google Analytics for Firebase, để bạn biết khi người dùng mở hoặc cài đặt một ứng dụng qua lời mời.

- **App Indexing**: Thu hút lại người dùng bằng các ứng dụng đã cài đặt của họ với tích hợp Google Tìm kiếm này. Nếu người dùng có ứng dụng của bạn và họ tìm kiếm nội dung có liên quan, họ có thể khởi chạy nó trực tiếp từ kết quả. Nếu người dùng chưa có ứng dụng của bạn, một thẻ cài đặt sẽ xuất hiện khi họ tìm kiếm các ứng dụng tương tự.

- **AdMob**: Kiếm tiền bằng cách hiển thị quảng cáo hấp dẫn cho khán giả toàn cầu. AdMob có tất cả những gì bạn cần để thực hiện chiến lược kiếm tiền trên lớp bậc nhất và để tối đa hóa doanh thu do mỗi người dùng tạo ra. Nó có thể được điều chỉnh cho ứng dụng của bạn, và API của nó được xây dựng để tích hợp các định dạng quảng cáo phong phú một cách dễ dàng.

- **AdWords**: Có được thông tin và níu kéo lại người dùng với khả năng của Google. Bạn có thể chạy quảng cáo trên Tìm kiếm, hiển thị và video cũng như nhắm mục tiêu phân khúc người dùng cụ thể mà bạn xác định trong Google Analytics for Firebase. Cải thiện nhắm mục tiêu quảng cáo và tối ưu hóa hiệu suất chiến dịch của bạn.
Tóm lại: Hiện project của mình chỉ tích hợp tính năng Cloud Messaging gửi tin nhắn và thông báo cho người dùng qua các nền tảng Android, iOS. Nên chúng ta sẽ tìm hiểu cách tích hợp Firebase vào project của mình.

### 3. Tích hợp Firebase vào project ứng dụng
Tích hợp Firebase vào Project Android, iOS và Web, cần trải qua các step sau:
- Step 1: Login vào Firebase console với tài khoản Google của mình.
- Step 2: Create new project
- Step 3: Xem các thông số config
- Step 4: Setting và tích hợp vào Android và iOS

#### 3.1 Login vào Firebase
-	Truy cập vào địa chỉ https://console.firebase.google.com/ hoặc https://console.firebase.google.com/?hl=ja
-	Login với tài khoản Google.

#### 3.2 Create new project
Trên màn hình click vào Add project, sau đó nhập thông tin project mà mình muốn thêm vào. Rồi nhấn button Create project.
 ![](https://images.viblo.asia/9abe6702-3f45-40e1-8dd6-e9c96565e319.png)
 
#### 3.3 Các thông số config
Vào phần project setting chúng ta sẽ thấy được các thông số config do Firebase cũng cấp sẵn cho mình. Một số thông số chúng ta có thể thay đổi được, một số thì sẽ không.

Vào phần setting bằng cách, click vào link project settings như hình dưới.
 ![](https://images.viblo.asia/2ad68222-3200-4f3a-af04-d1253bb37c24.png)

Sau đó màn hình thông tin có các thông số sẽ như sau:
Ở tab “General” sẽ có các thông số:
-	Project name: Tên của project
-	Project ID
-	Web API Key

![](https://images.viblo.asia/1c8b0144-c966-4d9d-af32-ee80373b8ca7.png)

Ở tab “Cloud Messaging” sẽ có các thông số.
-	Server key: thông số này rất quan trọng, nó chính là API_KEY khi ta gọi API của Firebase để đăng ký tokens và gửi message cho tokens.
-	Legacy server key
-	Sender ID

![](https://images.viblo.asia/1274c075-d9de-4fed-8478-70bf2724c31d.png)

Ở tab “Users and permissions”, tab này sẽ add thêm các member để có thể thao tác trên Firebase project.
Bạn chỉ cần click vào button “Add member”, nhập các thông số: email, role. Là sẽ chia sẻ cho member nào đó về Firebase project của bạn.

![](https://images.viblo.asia/569d1dd8-4ef9-47ea-bd7e-2d5b23a80cc4.png)

#### 3.4 Setting và tích hợp vào Android và iOS
Bên dưới tab “General” sẽ có phần để thêm Firebase vào ứng dụng của bạn trên Android, iOS và Web. 

- Với Android cần thêm các config:

![](https://images.viblo.asia/b2dab86c-b7d7-4647-8042-1d527f9db3df.png)

- Với iOS cần thêm các config
 
 ![](https://images.viblo.asia/4b7b77af-b32b-4484-a245-8da2f46c15c4.png)
 
 - Với bản web sẽ có các tham số đã đc gen ra sẵn.

![](https://images.viblo.asia/60d2baa7-f39c-4b2f-8f1d-d0068436bbb2.png)

### 4. API server cần thiết để push notification về các ứng dụng của bạn.

Note: **API_KEY** sẽ được lấy ở tab “**Cloud Messaging**” trong settings của project.

![](https://images.viblo.asia/419a9b4b-41f4-4ec7-ac26-51f527ecb12a.png)

Firebase hỗ trợ rất nhiều API để thao tác với ứng dụng của bạn.
Firebase hỗ trợ gửi notification theo từng Token, theo nhiều token cùng lúc. Gửi notification theo topic (group các token vào 1 nhóm) hoặc có thể gửi nhiều topic cùng một lúc.
 
#### 4.1 API đăng ký token vào topic

**URL**: https://iid.googleapis.com/iid/v1:batchAdd

**Method**: POST

**Header**:

```
Content-Type:application/json
Authorization:key=API_KEY
```

**Parameter**:
```
{
   "to": "/topics/FCMTopic",
   "registration_tokens": ["FCMtoken1", "FCMtoken2",..., "FCMtokenX"]
}
```

#### 4.2 API xóa token khỏi topic

**URL**: https://iid.googleapis.com/iid/v1:batchRemove

**Method**: POST

**Header**:
```
Content-Type:application/json
Authorization:key=API_KEY
```

```
**Parameter**:
{
   "to": "/topics/FCMTopic",
   "registration_tokens": ["FCMtoken1", "FCMtoken2",..., "FCMtokenX"]
}
```

#### 4.3 API lấy thông tin của một token

**URL**: https://iid.googleapis.com/iid/info/<FCMToken>?details=true

**Method**: GET

**Header**:

```
Content-Type:application/json
Authorization:key=API_KEY
```

**Result**: 
```
{
  "application":"com.iid.example",
  "authorizedEntity":"123456782354",
  "platform":"Android",
  "attestStatus":"ROOTED",
  "appSigner":"1a2bc3d4e5",
  "connectionType":"WIFI",
  "connectDate":"2015-05-12
  "rel":{
    "topics":{
      "topicname1":{"addDate":"2015-07-30"},
      "topicname2":{"addDate":"2015-07-30"},
      "topicname3":{"addDate":"2015-07-30"},
      "topicname4":{"addDate":"2015-07-30"}
    }
  }
}
```


#### 4.4 API gửi message notification cho một token

**URL**: https://fcm.googleapis.com/fcm/send

**Method**: POST

**Header**:

```
Content-Type:application/json
Authorization:key=API_KEY
```

**Parameter**:
```
{
  "registration_ids" : ["FCMtoken"],
  "notification" : {
    "body" : "This is a Firebase Cloud Messaging Topic Message!",
    "title" : "FCM Message",
  },
   "data" : {
            "type" : "news", // news or project or calendar
            "notificationId": "notiIdXXX",
            "projectId": "projectIdXXX",
            "date" : "YYYY/mm/dd"
   }
}
```

#### 4.5 API gửi message notification cho nhiều tokens

**URL**: https://fcm.googleapis.com/fcm/send

**Method**: POST

**Header**:

```
Content-Type:application/json
Authorization:key=API_KEY
```

**Parameter**:
```
{
  "registration_ids" : ["FCMtoken1", "FCMtoken2", ..., "FCMtokenX" ],
  "notification" : {
    "body" : "This is a Firebase Cloud Messaging Topic Message!",
    "title" : "FCM Message",
  },
   "data" : {
            "type" : "news", // news or project or calendar
            "notificationId": "notiIdXXX",
            "projectId": "projectIdXXX",
            "date" : "YYYY/mm/dd"
   }
}
```

#### 4.6 API gửi message notification cho topic

**URL**: https://fcm.googleapis.com/fcm/send

**Method**: POST

**Header**:

```
Content-Type:application/json
Authorization:key=API_KEY
```

**Parameter**:
```
{
  "to" : "/topics/FCMTopic,
  "notification" : {
    "body" : "This is a Firebase Cloud Messaging Topic Message!",
    "title" : "FCM Message",
  },
   "data" : {
            "type" : "news", // news or project or calendar
            "notificationId": "notiIdXXX",
            "projectId": "projectIdXXX",
            "date" : "YYYY/mm/dd"
   }
}
```




#### Tài liệu tham khảo

https://firebase.google.com/docs/

https://firebase.google.com/products/?authuser=0

https://firebase.google.com/docs/cloud-messaging/

https://firebase.google.com/docs/cloud-messaging/js/topic-messaging

https://developers.google.com/instance-id/reference/server

https://firebase.google.com/docs/cloud-messaging/http-server-ref

https://console.firebase.google.com/