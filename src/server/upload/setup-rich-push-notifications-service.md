Hôm nay mình sẽ giúp các bạn cách thiết lập để notification có thể load ảnh hay video, thay đổi nội dụng thông báo trước khi hiển thị ... và rất nhiều thứ khác liên quan đến push notification.
- Ngày trước, khi mà iOS 10 chưa ra. Mình cũng gặp rất nhiều câu hỏi về push như app đang mở có hiển thị push như bên android được không, nội dung của thông báo có thay đổi trước khi hiển thị được không, làm sao hiển thị ảnh ở thông báo, hay play video, rồi các action của thông báo có custom được hay không, hay chỉ đơn giản là touch và mở ứng dụng xong navigate trong app thôi.
- Khi iOS 10 ra mắt thì tất cả các vấn đề đó đều được giải quyết. iOS 10 mang tới cho chúng ta rất nhiều điều mới với notification như view photo, audio, video, gifs. Bằng cách sử dụng **Notification Service Extension**

### 1. Cơ chế của remote push notification service hoạt động như thế nào?
- Các bạn hãy nhìn vào hình ảnh phía dưới sau đây.

![alt](https://cdn-images-1.medium.com/max/1600/1*6sqVk4MLLtYAd0cg8tzOvg.png)

- Một thông báo và device token sẽ được gửi tới apple push notification service từ phía server. Và từ đó, thông báo đó sẽ được service của apple gửi tới thiết bị của người dùng.
- Hôm nay giới hạn bài viết này sẽ bắt đầu từ việc setup device làm sao nhận push, custom push, và handle nó trong ứng dụng của bạn.
- Dữ liệu bạn gửi tới service của apple hay dữ liệu thiết bị iOS của bạn nhận được được gọi là payload. Giới hạn của mỗi payload là 4KB, trước đây là thế, bây giờ mình cũng không rõ Apple có tăng lên không.
- Trước khi đi tới phần tiếp theo là setup APNS thì chúng ta cùng xem xét một chút về payload nhé
```ObjectiveC
{
    "aps": {
        "alert": {
            "body": "Push notification body",
            "title": "Push notification title"
        },
        "mutable-content": 1
        category: "rich-apns"
    },
    "media-url": "https://i.imgur.com/t4WGJQx.jpg"
}
```
- Giải thích: một thông báo bao gồm phần body và title, việc custom thông báo từ iOS 10 trở đi sẽ cần tới key **"mutable-content": 1** để phía thiết bị hiểu là cho phép custom thông báo. Đây cũng là phần chung cho một version của hệ điều hành (tính từ khi support APNS)
- Từ iOS 10 trở đi bạn có thể load image, video, ... Ví dụ ở đây bạn cung cấp một link để load media.

Có lẽ khái quát thế thôi, dài dòng quá. Tiếp theo chúng ta đi vào setup thôi 

### 2. Setup Push Notification Service

- Trước khi thực hiện setup push, bạn hãy tự tạo một demo project nhé.

##### Step 1 Tạo certificate
- Hãy mở keychain access lên và thực hiện như sau:
**Keychain Access > Certificate Assistant > Request a Certificate From a Certificate Authority**

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_1_certificate_assistant_menu.png)

- Một cửa sổ hiện ra, bạn cần phải fill **User Email Address** và **common name** và tiếp theo hãy chọn **save to disk**

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_2_certificate_information.png)

- Click continue và chọn nơi lưu trữ file sẽ được tạo ra 

##### Step 2 Tạo App ID
- Bước này sẽ giúp bạn tạo ra được một app id trong account Apple Developer của bạn. Hãy bắt đầu bằng cách đăng nhập account Apple Developer của bạn. Truy cập [Apple Developer Member Center](https://developer.apple.com/membercenter/) và nhập tài khoản của bạn.
- Click vào **Certificates, Identifiers & Profiles**

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_3_member_center_options.png)

- Chọn App ID và nhập các thông tin được yêu cầu.

    * Một mô tả về app id mới đó: có thể nó không quan trọng lắm. Nhưng hãy viết mô tả đúng về nó nhé.
    *  Một bundle id: cái này trùng với bundle identifier nhé. Khi bạn nhập, hệ thống sẽ tự động check xem bundle id của bạn đã tồn tại chưa, nếu tồn tại rồi thì nó sẽ báo cho bạn biết và bạn cần phải thay đổi nó. Còn không thì cứ thế là ok

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_6_app_id_setup_1.png)

- Check vào checkbox Push Notifications, continue và đợi confirm hiển thị ra.

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_7_app_id_setup_2.png)

- Cuối cùng bạn sẽ thấy màn hình complete

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_9_listed_app_id.png)

##### Step 3 Cấu hình App ID cho Push Notification
- Ở bước trước bạn mới chỉ là cho nó biết là bạn sẽ sử dụng push notifications. Bạn cần phải enable nó lên trước khi sử dụng.
- Dưới đây là trạng thái chưa được enable. Nó có màu vàng cam và bạn cần phải cấu hình để enable nó lên màu xanh.

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_10_configurable_state.png)

- Nhiệm vụ của bạn là hãy chọn **Edit** và tìm bằng được hai button như hình vẽ. Một button cho phép bạn sử dụng với trạng thái development và một button với trạng thái là production. Ở đây chúng ta làm demo nên chỉ cần setup cho cái thứ nhất thôi. Click vào button thứ nhất (development) và chọn **Continue**

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_11_create_ssl_certificates.png)

- Một cửa sổ hiện ra và yêu cầu bạn chọn file cer, bạn hãy tìm tới thư mục chưa file cer (bên trên bạn đã tạo), upload nó và chọn **Generate**. Và tất nhiên tới bước này bạn mới thực hiện tạo cer cũng được, không vấn đề gì.
- Sau khi hoàn thành, bạn hãy nhấn vào **Download**

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_14_download_apn_certificate.png)

-  Click để import file vừa download xong, nó sẽ tự động đẩy vào keychain access

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_15_certificate_in_keychain.png)

- Tìm nó, chuột phải và chọn **Export...** để tạo file .p12

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_16_export_p12.png)

- Check lại kiểu file format và có thể đặt password hoặc không

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_17_save_p12.png)

##### Step 4 Đăng ký Devices
- Bước này rất đơn giản, hãy sử dụng **XCode** hoặc **itunes** để lấy **UUID** của device
- Vào mục Device và add nó thôi. Mình không hướng dẫn kĩ bước này nữa.

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_20_register_device.png)

##### Step 5 Tạo provisioning profile
- Công việc cuối cùng trên trang Apple Developer là tạo provisioning profile. Click **Development** > **Provisioning Profile**
- Để tạo provisioning profile, click vào + và một cửa sổ mới tạo ra

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_21_create_provisioning_1.png)

- Click Continue > chọn App ID đã tạo bên trên > Chọn cer đã tạo bên trên > Chọn devices bạn muốn build để test (chính là devices bạn đã add thêm bên trên) > Generate > Download.

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_26_download_provisioning.png)

##### Step 6 Cấu hình project
Giờ là lúc chúng ta tập trung vào project demo nhé. Công việc sẽ gồm một vài phần sau:

- Enable Push Notifications trong tab câpbility của project 

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_29_enable_pn_xcode.png)

- Chọn code sign

![alt](https://www.appcoda.com/wp-content/uploads/2016/01/t48_30_select_provisioning_profile.png)

##### Step 7 Đăng ký Push notifications
- Hiện tại đang là ios 11.* và từ iOS 10 trở đi Apple có cung cấp cách đăng ký xin cấp quyền push notification khác nên khi đăng ký bạn có thể đăng ký theo cách check version. Ở đây mình chỉ đề cập tới iOS 10 trở đi nhé.

```ObjectiveC
if (@available(iOS 10, *)) {
	UNUserNotificationCenter *notificationCenter = [UNUserNotificationCenter currentNotificationCenter];
	notificationCenter.delegate = self;
	[notificationCenter requestAuthorizationWithOptions:UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionAlert completionHandler:^(BOOL granted, NSError * _Nullable error) {
		if (!error) {
			ac_performBlockOnMainThread(^{
				[[UIApplication sharedApplication] registerForRemoteNotifications];
			});
		}
	}];
}
```

### 3. Enable Rich Notification & Pusher
- Chúng ta cùng xem một vài feature mới phần notifications nhé 

![alt](https://images.viblo.asia/f8353569-dd9e-4fd8-bb4a-04fa20734ca1.png)

![alt](https://images.viblo.asia/ef7571cd-665b-430b-ac69-a8431292b461.png)

![alt](https://images.viblo.asia/8d3f489e-315e-4e54-aac2-446766c31865.png)

- Chúng ta nói lại một chút về payload nhé

```ObjectiveC
{
    "aps": {
        "alert": {
            "body": "Push notification body",
            "title": "Push notification title"
        },
        "mutable-content": 1
        category: "rich-apns"
    },
    "media-url": "https://i.imgur.com/t4WGJQx.jpg"
}
```

- Phần media-url sẽ chính là url để chúng ta load ảnh, video trong phần notification extension. Vậy extension này là gì và làm thế nào để tạo ra nó? Đây chính là nội dung của phần này.

- Trước khi bước vào phần thiết lập notification extension này chúng ta hãy tìm hiểu một công cụ để test phần push này nhé, nó có tên là [Pusher](https://github.com/noodlewerk/NWPusher) - các bạn có thể click vào link và tải source về để tiến hành push. Sau khi tải về, tạm thời để đó để lát nữa sử dụng nhé. Bây giờ cần phải setup trước đã.

- Tạo một target mới và chọn **Notification Service Extension** như hình vẽ và chọn **Active** khi được hỏi.

![alt](https://cdn-images-1.medium.com/max/1600/1*gblLLQWCfdoNbtkQA3gn_A.png)

- Chúng ta cần lấy device token để có thể bắn notification về. Hãy implement như sau:

```ObjectiveC
- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
	self.contentHandler = contentHandler;
	self.bestAttemptContent = [request.content mutableCopy];
    
	NSString *largeIconUrlString = self.bestAttemptContent.userInfo[@"large_icon_url"];
	if (!largeIconUrlString) {
		self.contentHandler(self.bestAttemptContent);
		return;
	}
	NSURL *url = [NSURL URLWithString:largeIconUrlString];
	[[[NSURLSession sharedSession] downloadTaskWithURL:url completionHandler:^(NSURL * _Nullable location, NSURLResponse * _Nullable response, NSError * _Nullable error) {
		if (error) {
			contentHandler(self.bestAttemptContent);
			return;
		}
		NSString *fileName = [NSString stringWithFormat:@"%@.png", [[NSUUID UUID] UUIDString]];
		NSURL *fileURL = [NSURL fileURLWithPath:[NSTemporaryDirectory() stringByAppendingPathComponent:fileName]];
		[[NSFileManager defaultManager] moveItemAtURL:location toURL:fileURL error:nil];

		NSError *attachError;
		UNNotificationAttachment *attachment = [UNNotificationAttachment attachmentWithIdentifier:@"IDENTIFIER" URL:fileURL options:nil error:&attachError];
		if (!attachError) {
			self.bestAttemptContent.attachments = @[attachment];
		}

		contentHandler(self.bestAttemptContent);
	 }] resume];
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    self.contentHandler(self.bestAttemptContent);
}
```
Giải thích: Trong đoạn code trên mình có parse user default ra để lấu url và sử dụng NSURLSession để tải ảnh, sau khi tải về mình có attach vào notification. Công việc chỉ đơn giản thế thôi.

Chú ý: Có một vài chú ý nếu như bạn setup rich notification rồi mà khi push không tải được ảnh, video...

-  Version của hệ điều hành của máy mà bạn test bao giờ cũng phải cao hơn version của notification extension target. Ví dụ như ảnh dưới mình có để là 10.0, version thấp nhất hỗ trợ rich notification, thì đồng nghĩa với việc device của bạn phải từ 10 trở lên nhé. Khi bạn tạo target mới thì nó mặc định khác 10.0 vì vậy rất nhiều trường hợp không để ý và không biết tại sao nhận được push mà không download được ảnh.

![alt](https://images.viblo.asia/c62bca50-4c42-4397-b62e-4b12516cdf3f.png)

- Để nhận biết được là rich push notification thì bạn cần phải thêm **"mutable-content": 1** vào payload nhé.

### 4. Handle khi nhận được thông báo và khi click vào thông báo.

Trong phần này mình nói qua về cách xử lý khi click vào thông báo. Còn chi tiết hay các bạn muốn thêm xử lý thế nào thì các bạn tìm hiểu thêm, còn về cơ bản thì các bạn cần biết một số chỗ như thế này:

- Từ iOS 10 trở đi bạn sẽ thấy có thêm delegate sau giúp bạn có thể hiển thị thông báo ngay cả khi app của bạn đang mở (active). Nếu bạn không implement thì đồng nghĩa với việc nếu app đang active thì không hiển thị thông báo.

```ObjectiveC
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
	completionHandler(UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionSound);
}
```

- Với trường hợp app của bạn đang ở chế độ foreground hoặc background mà nhận được thông báo thì các bạn có thể sử dụng phương thức sau để handle thông báo

```ObjectiveC
// iOS < 10
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{

}

// iOS >= 10
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler
{

}
```

- Với trường hợp ứng dụng của bạn ở trạng thái not running và người dùng click vào thông báo, app của bạn mở ra, bạn cần phải xử lý thông báo tại **didFinishLaunchingWithOptions**. Mình lấy ví dụ:

```ObjectiveC
NSDictionary *notification = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
if (!notification) {
	return;
}
if (@available(iOS 10, *)) {
	[UNUserNotificationCenter currentNotificationCenter].delegate = self;
} else {
	[self application:application didReceiveRemoteNotification:notification];
}
```
Giải thích trường hợp này: sở dĩ vì sao bạn phải xử lý như thế này, vì tại **didFinishLaunchingWithOptions** thì lúc đó ứng dụng của bạn mới được mở, với iOS >= 10 thì bạn chỉ cần **setDelegate** cho **UNUserNotificationCenter** thì phương thức **didReceiveNotificationResponse** sẽ tự động được gọi, còn với iOS < 10 thì bạn phải call lại phương thức **didReceiveRemoteNotification**

- Cuối cùng là push và tận hưởng thôi: Chúng ta đề cập một chút về Pusher nhé. Sau khi bạn download về và chạy với bản Mac nhé, giao diện sẽ hiện ra như dưới ảnh, bạn cần chọn cer (phần mình hướng dẫn bên trên) để connect và nhập device token đã lấy bên trên. Bạn chỉ việc nhập payload vào và nhấn push. Đơn giản mà không cần setup gì liên quan tới server. Rất tiện khi bạn đang cần chờ server, bạn có thể làm trước và ghép với server sau.

![alt](https://raw.githubusercontent.com/noodlewerk/NWPusher/master/Docs/osx1.png)

Tổng kết: Trên đây là những gì các bạn cần biết để làm việc với **Push Notification Service**. Các bạn có thể vừa đọc vừa làm, thú vị lắm. Cuối cùng là chúc các bạn setup xong nhận được push luôn nhé.