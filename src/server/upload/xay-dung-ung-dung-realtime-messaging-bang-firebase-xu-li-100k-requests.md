Hiện nay các ứng dụng live stream mọc lên như nấm, một trong số đó có thể được kể đến như Bigo, Facebook live, Tiktok, Youtube …

Trong khi live stream thì người dùng có thể thả tim, like, comment … Và tất cả những chức năng đó hoàn toàn là realtime.

Vậy làm thế nào có thể làm được tính năng realtime như thế? Và có thể xử lí được hàng triệu, hàng tỉ request/s như vậy chắc cũng nhiều người quan tâm, và bản thân mình cũng thế. Cũng muốn vọc vạch xem công nghệ đằng sau những ứng dụng đó như thế nào.

Trong lúc tìm hiểu thì đọc thấy 1 bài rất hay mà kĩ sư Mercari đã chia sẻ. Và bên họ sử dụng [Firebase Realtime Database](https://firebase.google.com/docs/database/) để giải quyết bài toán này.

Cùng nhau tìm hiểu xem cụ thể sẽ làm như thế nào để có thể xây dựng được ứng dụng realtime messaging xử lí được hàng tỉ request/s như vậy.

## Phạm vi bài toán

![](https://images.viblo.asia/f09b0fdf-2cb4-49e0-a412-ad00bdd4621a.PNG)

Hình ảnh bên trên mình chụp được thông qua ứng dụng Bigo (thi thoảng ngắm gái :D).

Ai dùng Bigo hay Facebook live rồi cũng đều biết ngoài tính năng live stream ra thì còn 1 vài tính năng khác nữa như gửi comment, like, gửi tim, tặng coin … Và tất cả những thứ này đều realtime.

Nên hôm nay mình chỉ tập trung vào những tính năng realtime như comment, like, gửi tim …

## Firebase Realtime Database là gì?

* Là sản phẩm của Google (chính xác là được Google mua lại)
* Là cơ sở dữ liệu NoSQL được lưu trữ và quản lí trên đám mây.
* Dữ liệu được lưu đưới dạng JSON.
* Client có thể subscribe dữ liệu 1 cách realtime.
* Tại thời điểm hiện tại (2019/07/06) thì firebase realtime database xử lí được 1 triệu request đồng thời và 10k write/s. Tương lai số lượng này có thể tăng lên. Số liệu tham khảo ở đây.

Ngoài tính năng của 1 database ra thì nó còn có 1 số tính năng khác nữa như:

* Tính năng Authentication thông qua Facebook, Google, Twitter …
* Có thể cài đặt rule để phân quyền xem ai được read, write đến resource của database. Ví dụ như ai login mới có quyền read, write chẳng hạn.
* Bởi vì Firebase được dùng ở phía client (web, mobile) nên việc decode để lấy ra key của firebase là điều hoàn toàn dễ dàng. Do đó nếu không cài đặt rule 1 cách cẩn thận thì có thể sẽ bị bên thứ 3 read, write tài nguyên 1 cách dễ dàng.

## Kiến trúc hệ thống

![](https://images.viblo.asia/27026437-1555-40dd-98f5-0605902a678d.png)

Kiến trúc khá là simple phải không nào. Bây giờ mình sẽ đi giải thích từng bộ phận trong kiến trúc này.

Đầu tiên khi người dùng thực hiện comment, like thì khi đó sẽ gửi request đến API Server để xử lí. Tại sao ở bước này không gửi trực tiếp đến Firebase mà phải thông qua API Server để làm gì? Bởi vì ngoài mục đích insert data đến firebase database còn có 1 số nhiệm vụ khá quan trọng khác nữa như authentication người dùng, detect tấn công xâm nhập … Nên việc xử lí những logic phức tạp đó bắt buộc phải thông qua API Server.

Sau khi API Server nhận được request từ phía người dùng. Khi đó nó sẽ thực hiện việc chuyển data đó vào queue để xử lí thông qua worker.

Worker sẽ lấy dữ liệu từ queue ra và thực hiện insert data đến Firebase thông qua REST API của Firebase.

**Tại sao từ API Server không gửi data trực tiếp đến Firebase?**

Chúng ta hãy luôn luôn nhớ 1 điều là ngoài mình ra không bao giờ được tin tưởng bất kì thằng nào cả (Don’t trust each other).

Nếu API Server gửi request trực tiếp đến Firebase thì có vấn đề gì xảy ra ở đây? Chẳng may lúc này firebase database bị down. Khi đó API Server sẽ không thể gửi request được nữa và có thể gây ra lỗi. Khi đó phía client cũng bị lỗi theo. Và làm cho trải nghiệm người dùng bị gián đoạn.

Do đó mới thông qua queue để xử lí. Nếu mà Firebase Database có bị down đi chăng nữa thì job đó sẽ bị failed và sẽ được retries lại ngay sau đó. Hơn nữa nhờ cơ chế work-queue này giúp chúng ta scalable khá tốt ở chỗ này.

Về Queue thì hiện nay có rất nhiều như [Kafka](https://kafka.apache.org/), [Q4M](https://q4m.github.io/) … Về cá nhân mình thích nhất thằng Kafka vì nó luôn luôn đảm bảo đúng thứ tự xử lí. Và hơn nữa nó lại phân tán nữa nên tính mở rộng của nó khá là cao.

Và cuối cùng phía Client chỉ cần Subscribe event từ Firebase Realtime Database là có thể nhận dữ liệu 1 cách realtime rồi.

Ở bước này chúng ta sẽ không xử lí gì cả và chỉ cho hiển thị dữ liệu thôi. Như thế tốc độ sẽ khá là nhanh.

## Về tính mở rộng của Firebase Realtime Database

Đầu tiên mình muốn nhấn mạnh 1 điều là Firebase Realtime Database không thể scale up với scale out được nhé.

Do đó trước khi đưa nó vào hệ thống thì chúng ta cần [test tải](https://nghethuatcoding.com/2019/05/18/test-tai-he-thong-thuc-su-can-thiet/) kĩ càng trước xem cần bao nhiêu con database thì hợp lí, dựa vào tuỳ tình hình mà sẽ tiến hành [sharding](https://nghethuatcoding.com/2019/05/19/instagram-da-sinh-ra-id-trong-database-cua-ho-nhu-the-nao/) để đáp ứng được số lượng request đề ra.

Như phần trên mình có nói, firebase realtime database hiện tại chỉ cho phép 1 triệu request đồng thời và 10k write/s. Do đó để không vượt quá ngưỡng này thì sharding là điều hoàn toàn cần thiết.

![](https://images.viblo.asia/d2b461da-d46f-4d02-825b-5d7df4b6d6ff.png)

Chúng ta sẽ sharding database theo liveID. Như trong ví dụ trên thì với live_id=1 và 4 sẽ cho trong db1, live_id = 2 và 5 sẽ cho trong db2, và live_id=3 và 6 sẽ cho trong db3

Nếu chia như thế thì chúng ta có thể xử lí được 3 triệu request đồng thời và 30k write/s.

Ở đây có 1 điểm chắc nhiều người cũng đang thắc mắc. Ví dụ live_id=1 (của 1 em gái xinh xắn nào đó) có tới hàng triệu anh vào xem live và comment. Nếu số lượng request đó vượt quá 1 triệu thì sẽ bị block lại và không gửi đc nữa. Ví dụ như ai đó thả tim liên tục chăng hạn …

**Vậy ở chỗ này nên làm thế nào để có thể hạn chế được điều đó?**

Có 1 solution khá đơn giản. Ví dụ như chức năng like chẳng hạn. Khi ấn like chúng ta sẽ không send ngay đến firebase mà sẽ đợi khoảng 10s sau đó mới send chẳng hạn. (Cứ miễn làm sao mà không làm giảm trải nghiệm của người dùng là được).

Để thực hiện được logic này chúng ta có thể sử dụng Redis hoặc memcached để lưu lại live_id với timestamp tương ứng. Sau khoảng 10s từ lúc insert vào redis thì sẽ không làm gì cả, sau 10s thì sẽ insert data đến firebase.

```
$memcachd = new \Sample\MemcachedClient();
$firebase_client = new \Sample\FirebaseClient();
$like_counter = new \Sample\LikeCounter();
$live_id = \HttpParameter::get('live_id');
 
$like_count = $like_counter->increment($live_id);
 
if ($memcached->get('key-prefix-like-' . $live_id)) {
    // Skip
} else {
    $firebase_client->updateLikeCount($like_count);
    $memcached->add('key-prefix-like-' . $live_id, true, 10); // 10s
}
```

Ngoài ra mình nhấn mạnh 1 điều là do Firebase được dùng phía client (như web, mobile) nên việc lộ key của firebase là điều không thể tránh khỏi. Do đó việc cài đặt rule để phân quyền người dùng access đến resource là điều vô cùng cần thiết và ở bài này mình sẽ không đi sâu vào nữa. Mọi người có thể tìm hiểu thêm về [Firebase Realtime Database Rule](https://firebase.google.com/docs/database/security) ở đây nhé.

![](https://images.viblo.asia/845ab506-9b30-4a98-aaf9-9104db13ba7d.png)

Như hình ảnh bên trên là 1 ví dụ về lộ key firebase ở phía javascript.

## Kết luận

Theo như các anh Mercari chia sẻ thì sau khi release tính năng live stream đó thì đến bây giờ cũng được 2 năm rồi mà **chưa lần nào Firebase bị down** cả.

Firebase quả thực rất mạnh. Nếu ai muốn dev thật nhanh hoặc muốn làm bản prototype thì có lẽ Firebase là 1 sự lựa chọn đúng đắn.

Với loại truyền thống thì chúng ta sẽ cần phải có DB, và chuẩn bị API phía backend để thao tác với dữ liệu trong DB. Nhưng Firebase thì khác, nó cung cấp cho ta DB và API để thao tác đến DB rồi. Do đó không cần phải dev API làm gì cho mệt. Cứ dùng Firebase SDK là xong.

Ngoài ra mình nhấn mạnh 1 điều là do Firebase được dùng phía client (như web, mobile) nên việc lộ key của firebase là điều không thể tránh khỏi. Do đó việc cài đặt rule để phân quyền người dùng access đến resource là điều vô cùng cần thiết và ở bài này mình sẽ không đi sâu vào nữa. Mọi người có thể tìm hiểu thêm về [Firebase Realtime Database Rule](https://firebase.google.com/docs/database/security) ở đây nhé.

Hiện tại sắp tới công ty mình cũng đang chuẩn bị làm 1 service mới và sếp yêu cầu 2 tháng phải xong. Team mình cũng quyết định chọn Firebase cho giải pháp lần này.

**Nguồn: [https://nghethuatcoding.com/2019/07/07/xay-dung-ung-dung-realtime-messaging-bang-firebase-xu-li-100k-request-s/](https://nghethuatcoding.com/2019/07/07/xay-dung-ung-dung-realtime-messaging-bang-firebase-xu-li-100k-request-s/)**

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

→→→ [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)