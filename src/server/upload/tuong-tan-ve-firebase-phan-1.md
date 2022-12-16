![img](https://miro.medium.com/max/600/1*R4c8lHBHuH5qyqOtZb3h-w.png)

Trong thời đại này, gần như mọi thứ đều có riêng cho nó một app, từ vật dụng gia đình, các dịch vụ, cho đến, doanh nghiệp, quá trình sản xuất, hay thậm chí một app cho chính bạn. 

Nhu cầu phát triển app một cách nhanh chóng, có thể là để giải quyết một vấn đề cấp thiết đặt ra cho chúng ta bài toán rút ngắn quá trình phát triển sản phẩm. Lúc này các bạn có thể sẽ cần phải biết đến [Firebase](https://firebase.google.com/) - một nền tảng của Google giúp ta **xây dựng**, **hoàn thiện**, và **phát triển hơn nữa** app của mình.

Chỉ một dòng định nghĩa ngắn ngủi đó chắc hẳn không thể làm các bạn đang muốn tìm hiểu về Firebase có thể thõa mãn. Vì vậy hãy theo dõi tiếp những nội dung tiếp theo nhé. 

# Một định nghĩa chi tiết hơn

Firebase là một **bộ công cụ** để "xây dựng, hoàn thiện và phát triển app hơn nữa". Bộ công cụ này cho bạn tiếp cận đến nhiều cấu phần khác nhau - những thành phần mà developer (dev) thường sẽ phải làm - nhưng không muốn làm khi xây dựng một product - vì chúng ta đơn giải thích tập trung vào phát triển chức năng chính của app, về trải nghiệm người dùng. 

Những thành phần (mà cụ thể là các services) mà Firebase cung cấp  bao gồm: phân tích, chứng thực (authenticattion), databases, storage, push messaging và vân vân và vân vân ... Những services này tất cả đều được vận hành (host) trên cloud và được tự động mở rộng (scale) mà developer sẽ thậm chí không mất tí effort nào để làm.

Nói một cách khác, các services trên (mà nếu developer tự làm sẽ được gọi là backend) được vận hành và bảo trì bởi Google. Những SDKs dành cho client sẽ tương tác *trực tiếp* tới các service này. Vì vậy nó khác mô hình truyền thống rất quen thuộc, yêu cầu chúng ta phải viết code cả Frontend và Backend. Ở mô hình truyền thống, Frontend tương tác với Backend qua API, Backend sẽ làm các phần việc xử lý data. Tuy nhiên với các app sử dụng Firebase, ta sẽ không cần Backend nữa, phần việc xử lý sẽ đưa về Client - có nghĩa client sẽ chứa các code query trực tiếp Database (được cung cấp bởi Firebase)

![img](https://miro.medium.com/max/600/0*DylbZPWyXT7S0Fn5?q=20)

Vậy là ta đã có thế búng tay bay màu **Backend**!

Nói đến đây Các bạn dev Backend đừng lo lắng nha, vì có rất nhiều lý do để trong các trường hợp ta vẫn cần phải có một Backend server. :laughing: Chính vì thế mà Firebase cũng cung cấp các dịch vụ giữ vai trò như Backend. Các phần sau của bài viết sẽ nhắc đến điều này nhé.

![img](https://miro.medium.com/max/300/0*0YNOhqgNYL48PoZj?q=20)

Tổng cộng, có 17 dịch vụ khác nhau trong đại gia đình Firebase:

![img](https://miro.medium.com/max/600/0*HORJhBhTELtW9qQw?q=20)

# Firebase thích hợp với những app kiểu nào?

Thật ra không có giới hạn các *kiểu app* có thể ứng dụng Firebase, mà nói đúng hơn là có giới hạn những platform mà Firebase có thể được sử dụng. [iOS](https://firebase.google.com/docs/ios/setup) và [Android](https://firebase.google.com/docs/android/setup) là 2 đối tượng chính của Firebase SDKs, ngoài ra Firebase đang tích cực để support nhiều hơn cho [web](https://firebase.google.com/docs/web/setup), [Flutter](https://firebase.google.com/docs/flutter/setup), [Unity](https://firebase.google.com/docs/unity/setup), và [C++](https://firebase.google.com/docs/cpp/setup). Bạn có thể đã biết - [Admin SDK](https://firebase.google.com/docs/admin/setup) tương thích với nhiều language và nhiều **chủng** backend mà bạn yêu cầu.

Dưới lớp SDKs còn có các library được gọ FirebaseUI ([Android](https://github.com/firebase/FirebaseUI-Android), [iOS](https://github.com/firebase/firebaseui-ios), [web](https://github.com/firebase/firebaseui-web)) hỗ trợ các dev làm việc với Firebase thuận tiện hơn nữa.

Dưới đây là ví dụ các dev đang sử dụng Firebase

Bạn Greta xây dựng mobile games với Unity:

![img](https://miro.medium.com/max/600/1*Uk5XNs-sf2AMC6rtWyj9GA.jpeg?q=20)

Bạn Shawn thì phát triển một app social network:

![img](https://miro.medium.com/max/600/1*EGuo7gHsMf7rPoq2gHYwjg.jpeg?q=20)

*Các hình ảnh về các developer trên đều là người thật - việc thật*
# Xây dựng phần cốt lõi của app

Trong đại gia đình Firebase, thì các dịch vụ sau là để phục vụ phần **xây dựng** 

**Authentication** — user login và định danh 
**Realtime Database** — realtime, host trên cloud, NoSQL 
**Cloud Firestore** —  realtime, host trên cloud, NoSQL
**Cloud Storage** — storage có thể tự scale
**Cloud Functions** — “serverless”, là một backend hướng sự kiện
**Firebase Hosting** — dịch vụ web hosting
**ML Kit** — SDK cho các task Machine Learning phổ biến 

[**Firebase Authentication**](https://firebase.google.com/products/auth/) sẽ lo phần login và định danh cho app của bạn. Một services khác của Firebase cần bạn phải hoàn thiện phần Authentication này để có thể thiết lập chuẩn chỉnh.

Điểm đặc biệt về services này là dev có thể dễ dàng bảo mật phần login, mà nếu bình thường phải "code chay" thì sẽ rất khó nhằn :laughing: 

[**Firebase Realtime Database**](https://firebase.google.com/products/realtime-database/) và [**Cloud Firestore**](https://firebase.google.com/products/firestore/) cung cấp những dịch vụ về Database (DB) - là những database "realtime, host trên cloud, NoSQL ". Những DB loại này có những điểm mạnh và điểm yếu riêng. Các bạn có thể tìm hiểu thêm về điều này qua [bài viết](https://firebase.google.com/docs/firestore/rtdb-vs-firestore) để xem loại DB nào phù hợp với nhu cầu của bạn nhé.

*Bật mí*: kinh nghiệm (của tác gỉa bài viết gốc này) là hãy bắt đầu với Firestore - vì dịch vụ này sinh sau - nắm rõ nhu cầu tâm lý anh em dev - biết chúng ta cần gì rồi :laughing: 

Một số bạn có thể nhầm lẫn giữa Firebase và Firestore, giờ thì chúng ta đã hiểu Firestore chỉ là một services realtime Databse trong Firebase mà thôi nhé! 
Điều nữa là Firestore là một sản phẩm chính xác là của [Google Cloud](https://cloud.google.com/firestore/). Nhưng tại sao lại list trong Firebase? Vì Firebase bổ sung SDKs để mobile client có thể sử dụng trực tiếp Firestore.

Điều tuyệt vời ở những Database này là chúng cho phép "update realtime" các data mỗi khi data này có sự thay đổi trong DB. Cách thức thực hiện, là ở các SDK (phía client) sẽ setup "listener" liên tục lắng nghe các sự kiện liên quan đến data này và sẽ phản ứng khi có sự thay đổi trong data. Điều này khiến app chúng ta ko cần **F5** cũng tự động được cập nhật! 

![img](https://miro.medium.com/max/600/0*pigb9EpYRdzTuMIX?q=20)

Với realtime data mà Firestore hay Realtime Database cung cấp, 2 bạn dev Greta thì có thể cập nhật liên tục điểm trong game để người chơi theo dõi, hay dev Shawn thì có thể cung cấp tính năng chat trong app của anh ấy!

*Ngược dòng lịch sử*: Realtime Database vốn dĩ chính là Firebase trước khi mà Firebase được mua lại bởi Google vào năm 2014. Ngày nay mọi vẫn còn nhầm lẫn hiểu Firebase là Realtime Database. Nhưng chúng ta ở đây sau bài viết này đã hiểu đó là sai rồi đúng ko!

![img](https://miro.medium.com/max/540/0*lsrpDWHdRP3Jle6b?q=20)

[**Cloud Storage**](https://firebase.google.com/products/storage/)  là một file storage có thể tự động scale với quy mô rất lớn. Nó cũng là sản phẩm của  [Google Cloud](https://cloud.google.com/storage/), không phải của Firebase. 

Với Cloud Storage *dành cho Firebase*, bạn sẽ có client SDKs để app client có thể upload và download files trực tiếp đến Cloud Storage “[bucket](https://cloud.google.com/storage/docs/key-terms#buckets)”.

![img](https://miro.medium.com/max/600/1*Oi_o9J2iZ8omfis1TLTUmA.jpeg?q=20)

Với Cloud Storage, ta không cần phải lo đến chuyện thiếu dung lượng lưu trữ? Bạn đã bao giờ nghĩ đến phương án thiết kế hệ thống để lưu đến *exabytes* dung lượng data? Nhưng Cloud Storage thì có thể mở rộng để lưu từng đấy đấy!

**Authentication làm việc rất tốt với 3 services này** (kết hợp với **security rules**) đó là [Realtime Database](https://firebase.google.com/docs/database/security/), [Firestore](https://firebase.google.com/docs/firestore/security/overview), và [Cloud Storage](https://firebase.google.com/docs/storage/security/)) từ đó chúng ta có thể quản lý access với data lưu ở Storage, điều này đảm bảo rằng clients chỉ có thể access data *chỉ* bằng cách mà bạn đã quy định.

User sau khi login vào App với **Authentication** sẽ được cung cấp token, token này đã được set những **security rules** quy định rõ có thể làm được gì với data nào.

![img](https://miro.medium.com/max/600/0*piNaOr475_vHrk7O?q=20)

**Đừng bao giờ mặc kệ vấn đề thông tin cá nhân "persional data".** *Có nghĩa là bạn có thể, nhưng chuyện này không thể chấp nhận được. Hãy sử dụng Firebase Security Rules! (*[*Xem comic này trên XKCD*](https://xkcd.com/1971/)*)*

[**Cloud Functions**](https://firebase.google.com/products/functions/) lại là một [Google Cloud service](https://cloud.google.com/functions/) khác. Nó phối hợp ăn ý với Firebase và các dịch vụ Cloud khác của Google. Sử dụng Firebase SDKs cho Cloud Functions, các bạn có thể viết và deploy code, run nó trên nền tảng "serverless". Các cloud functions sẽ được "kích hoạt" hay phản hồi lại với các sự kiện (events) mà xuất phát từ các services khác của bạn trên Firebase hoặc Google Cloud.

![img](https://miro.medium.com/max/600/1*OAJmOpmApIcx5WDcJ-OFRA.jpeg?q=20)

Khi nhắc đến "serverless", ta không nên nghĩ đó là "không có server". Với kiến trúc backend dạng "serverless", vẫn có sự tham gia của server ở đó, chỉ là chúng ta không cần phải biết/ hiểu quá nhiều về nó. Nói các khác, chúng ta không phải quản lý, bảo trì, scale hay bất kì các nghiệp vụ devOps nào khác (như mô hình kiến trúc Server truyền thống yêu cầu). Dev chỉ cần viết và deploy code, phần còn lại để Google lo (thật ra là dev phải trả thêm tiền nữa - chắc chắn rồi :laughing: )

Có rất nhiều thứ bạn có thể làm với Cloud Functions — [xem thêm ví dụ](https://github.com/firebase/functions-samples/)! Nhưng có một concept về cách ứng dụng Functions đó là: Những Firebase services Firebase products (database, storage, auth ..) phát đi các event khi mà data trong các services đó thay đổi, và code của bạn mà deploy trên Cloud Functions sẽ được "kích hoạt" để phản ứng lại các sự kiện đó.

Bạn dev Shawn của chúng ta sử dụng Cloud Functions để tự động delete data từ database và storage khi user xóa acocunt của họ.

![img](https://miro.medium.com/max/600/1*qfQIiOG0h816V8WJlkqIcQ.jpeg?q=20)

[**Firebase Hosting**](https://firebase.google.com/products/hosting/) là một global web hosting CDN (Content Delivery Network) được bảo mật. Dịch vụ này cực kì tốt cho các nội dung tĩnh (HTML, CSS, JS, images) sử dụng server tương tác trự tiếp với users. Bạn có thể setup website nhanh chóng với domain mặc định (hoặc domain bạn tự mua) với SSL được thiết lập sẵn mà không phải mất thêm phí

Firebase Hosting có một mắt xích quan trọng trong việc kết hợp với các dịch vụ khác trong hệ sinh thái Firebase, đó là [Cloud Functions](https://firebase.google.com/docs/hosting/functions). Firebase Hosting cho ta tùy chính request và response đi và đến các Cloud Functions khi viết các functions kiểu HTTP, và nó còn cho phép ta cache các response từ functions. Ta có thể ứng dụng điều này để build các “RESTful” API!

![img](https://miro.medium.com/max/600/0*ZlcMUyzvn6uCzH0Z?q=20)

[**ML Kit for Firebase**](https://firebase.google.com/products/ml-kit/)  cho phép bạn sử dụng tinh hoa Machine Learning (ML) từ các chuyên gia hàng đầu của Google mà không cần phải biết gì về ML. Một ví dụ, ML Kit có thể nhận diện được nội dung photo mà ảnh bạn đã chụp: là text, khuôn mặt hay phong cảnh. Và ML Kit có thể chạy trên mobile mà tiêu tốn một lượng điện rất ít. 

Đối với các bạn có kiến thức về ML, bạn có thể upload TensorFlow model cho những trường hợp tinh vi hơn. 

![img](https://miro.medium.com/max/600/0*dUagSFC-GnExoasL?q=20)

Và Phần 1 trong chuyên mục "Tường Tận về Firebase" chia sẻ về Firebase làm thế nào để giúp developer "xây dựng" (build)  sản phẩm của mình. 

Phần 2 ta sẽ cùng nhau đi tiếp về cách mà Firebase giúp ta "hoàn thiện"(improve) và "phát triển hơn nữa"(grow) sản phẩm của mình nhé.

![img](https://miro.medium.com/max/600/1*PMBwoU5bWkso8M2A1ocS9Q.png?q=20)

*Bài viết gốc:* https://medium.com/firebase-developers/what-is-firebase-the-complete-story-abridged-bcc730c5f2c0