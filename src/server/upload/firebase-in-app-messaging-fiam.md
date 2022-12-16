### Giới thiệu

Firebase In-App Messaging(FIAM) là một tính năng mới của Firebase đang được giới thiệu và phát triển. Tuy răng mới chỉ có phiên bản Beta được công bố, FIAM vẫn được đánh giá là một tính năng cực kỳ hay và có giứa trị.

FIAM giúp bạn thu hút người dùng đang hoạt động của ứng dụng bằng cách gửi cho họ các tin nhắn có mục tiêu, theo ngữ cảnh cụ thể khuyến khích họ sử dụng các tính năng chính của ứng dụng. Ví dụ: bạn có thể gửi tin nhắn trong ứng dụng để thu hút người dùng đăng ký, xem video, hoàn thành cấp độ hoặc mua một mặt hàng. Bạn có thể tùy chỉnh thông báo dưới dạng **card**, **modal**, **banner** hoặc **image only** và thiết lập trình kích hoạt để chúng xuất hiện chính xác vào thời điểm có lợi nhất cho người dùng của bạn.

Sử dụng FIAM để khuyến khích tìm hiểu và khám phá: đánh dấu một chương trình giảm giá hoặc phiếu giảm giá trong ứng dụng thương mại điện tử của bạn, đưa ra manh mối hoặc mẹo trong trò chơi của bạn hoặc nhắc một lượt thích hoặc chia sẻ trong ứng dụng truyền thông xã hội của bạn.
Bây giờ chúng ta sẽ cùng tìm hiểu các hoạt động của FIAM. Phần hướng dẫn này sẽ thực hiện hoàn toàn trên Android OS, để sử dụng FIAM trên iOS, vui lòng xem thêm hướng dẫn [ở đây](https://firebase.google.com/docs/in-app-messaging/get-started?platform=ios).

### Các bước để sử dụng FIAM trong ứng dụng 

#### 1. Trước khi bắt đầu
Để sử dụng được FIAM, [hãy thêm Firebase vào ứng dụng của bạn](https://firebase.google.com/docs/android/setup).

#### 2. Thêm FIAM SDK vào project
Sử dụng Firebase Android BoM, khai báo module FIAM trong app/build.gradle. Để sử dụng FIAM, enable Firebase Analytics cũng là một yêu cầu bắt buộc.

```
dependencies {
    // Import the BoM for the Firebase platform
    implementation platform('com.google.firebase:firebase-bom:26.5.0')

    // Declare the dependencies for the In-App Messaging and Analytics libraries
    // When using the BoM, you don't specify versions in Firebase library dependencies
    implementation 'com.google.firebase:firebase-inappmessaging-display-ktx'
    implementation 'com.google.firebase:firebase-analytics-ktx'
}
```

#### 3. Thử nghiệm gửi tin nhắn từ FIAM tới ứng dụng
##### 3.1: Lấy thông tin installationID của device test
Vì lý do tiết kiệm pin, FIAM chỉ truy xuất tin nhắn từ máy chủ một lần mỗi ngày. Điều đó có thể gây khó khăn cho việc test, vì vậy Firebase console cho phép bạn chỉ định thiết bị test hiển thị thông báo theo yêu cầu.
Thiết bị test đó được xác định bằng **ID FirebaseInstallations** hoặc **FID**. Tìm FID của ứng dụng thử nghiệm của bạn bằng cách kiểm tra Logcat trong Android Studio:

```
I/FIAM.Headless: Starting InAppMessaging runtime with Installation ID YOUR_INSTALLATION_ID
```

##### 3.2: Gửi message tới device test
Khi bạn đã chạy ứng dụng của mình trên thiết bị test và bạn đã có **FID**, bạn có thể thử thiết lập FIAM bằng cách gửi tin nhắn thử nghiệm:

- Trên Firebase console, mở FIAM.
- Click vào **New Campaign*.
- Nhập **Title**
- Click **Test on your Device**
- Nhập FID từ thiết bị test của bạn vào trường **Add an installation ID**
- Click **Test**

FIAM sẽ gửi message của bạn ngay sau khi bạn nhấp vào **Test**. Để xem nó, hãy đóng, sau đó mở lại ứng dụng trên thiết bị test của bạn.
Để xác nhận xem thiết bị của bạn có phải là thiết bị test hay không, hãy tìm dòng log sau:

```
I/FIAM.Headless: Setting this device as a test device
```

![](https://images.viblo.asia/62ba3cc0-099b-4b7a-a8d6-eca110f14071.png)

Kết quả trên thiết bị test:

![](https://images.viblo.asia/e79cc1f5-41d5-49d8-ad08-efa13f435c88.png)

### Khám phá các trường hợp có thể sử dụng FIAM

#### 1. Tùy chỉnh UI của message gửi từ FIAM tới ứng dụng của bạn
Có 4 loại mẫu được FIAM support sẵn cho bạn sử dụng: **Card**, **Modal**, **Banner** và **Image Only**


| Phân loại | Mô tả |
| -------- | -------- |
| Card | Tin nhắn có cấu trúc với hai nút tác vụ. Cung cấp cho người dùng sự lựa chọn. Button thứ 2 là lựa chọn không bắt buộc.|
| Modal | Hộp thoại tin nhắn linh hoạt với một nút tác vụ. Chỉ tiêu đề thư là bắt buộc.|
| Banner | Tin nhắn giống như notification. Không chiếm nhiều không gian màn hình.|
| Image Only | Tải lên thông điệp truyền tải qua hình ảnh được thiết kế theo tùy chỉnh của bạn.|

Ví dụ: Sử dụng Image Only, tải thông điệp được thiết kế của bạn lên:
- Kết hợp màu sắc, phông chữ và định dạng chính xác phù hợp với thẩm mỹ và thương hiệu ứng dụng của bạn.
- Cung cấp một chương trình khuyến mãi theo chủ đề. Gửi  mã giảm giá Halloween của bạn trong một tin nhắn với phông chữ và hình nền đáng sợ tùy chỉnh. Người dùng có thể nhấp vào toàn bộ thông báo để tìm hiểu thêm hoặc loại bỏ thông báo.

![](https://images.viblo.asia/9e9c2676-9037-458a-ac3d-004159353fd1.png)

Muốn tùy chỉnh hơn nữa, hãy theo dõi tiếp các phần bên dưới.

#### 2. Nhắm mục tiêu vào những người dùng cụ thể
Đối với mỗi campaign, bạn có thể nhắm mục tiêu thông điệp đến các đối tượng nhất định dựa trên hành vi, ngôn ngữ, mức độ tương tác của họ, v.v.

Cân nhắc việc kết hợp **Card** của FIAM với **Firebase Dynamic Links**, hãy cấu hình thông báo để:
- Nhắm mục tiêu người dùng có tương tác với ứng dụng gần đây nhất trong khoảng từ một đến bảy ngày để đảm bảo họ đang hoạt động. Hỏi những người dùng thân thiết của bạn xem họ có thích ứng dụng của bạn không. Tùy thuộc vào câu trả lời của họ, hãy sử dụng deeplink tới Google Play để xem xét hoặc khảo sát phản hồi của họ.
- Cho phép người dùng khám phá ứng dụng truyền thông xã hội của bạn mà không bị áp lực phải đăng ký tài khoản. Nhắm mục tiêu thông báo xác thực của bạn đến những người dùng Mở ứng dụng của bạn lần đầu tiên ít nhất hai ngày trước.

![](https://images.viblo.asia/f435eeeb-49b1-4f84-af70-dcdf5480b39a.png)

#### 3. Lên lịch tin nhắn với  từng ngữ cảnh
Tin nhắn chỉ xuất hiện khi người dùng đang ở trong ứng dụng của bạn và được kích hoạt bởi một số sự kiện nhất định, đảm bảo rằng tin nhắn luôn phù hợp và theo ngữ cảnh cho người dùng của bạn. Bạn không muốn đánh lạc hướng những người dùng có thể đang ở giữa trò chơi thiết lập điểm số cao hoặc một giao dịch quan trọng.

Ví dụ: bạn có thể định cấu hình tin nhắn kiểu **Banner** để:
- Chúc mừng người dùng bất cứ khi nào họ thăng cấp trong ứng dụng trò chơi của bạn bằng cách đặt sự kiện level_up làm kích hoạt.

Tránh gửi spam cho người dùng của bạn bằng cách đặt giới hạn tần suất trên mỗi thiết bị:
- Nhắc người dùng cập nhật ứng dụng của bạn bằng cách đặt số lượng tin nhắn thành không quá một tin nhắn sau mỗi 15 ngày. Người dùng có thể dễ dàng thao tác bằng cách click hoặc loại bỏ bằng cách vuốt lên.

![](https://images.viblo.asia/ebf09df7-4383-4ec8-be6f-7493bb469d7b.png)

#### 4. Theo dõi hiệu suất ứng dụng của bạn
Bạn có thể kết hợp FIAM với Firebase Analytics để thu thập các thông tin về sở thích và mức độ hài lòng của người dùng với ứng dụng của bạn.
Ví dụ: Đưa ra khuyến mại bằng nút hành động của mẫu **Modal** cho các mặt hàng giảm giá. Firebase cho bạn biết có bao nhiêu người dùng đã nhận được tin nhắn, bao nhiêu người đã click vào tin nhắn và bao nhiêu sự kiện chuyển đổi đã hoàn thành, chẳng hạn như mua hàng thương mại điện tử. 

![](https://images.viblo.asia/d53feaf9-7913-4f3d-9e91-317b5d6bd55d.png)

### Tạo một campaign trên FIAM

Trước khi bắt đầu, hãy đảm bảo ứng dụng của bạn đã thêm Firebase In-App Messaging SDK vào với version mới nhất.

#### 1. Tạo một campaign
Trên trang **Firebase In-App Messaging** của **Firebase console**:
- Nếu sử dụng lần đầu, click **Create a new campaign**
- Nếu không phải lần đầu, click **New campaign**

**Step 1: Style and content**
Trong bảng điều khiển, hãy sử dụng các mẫu tin nhắn FIAM (**card, modal, banner, image only**) để kết hợp các tính năng khác nhau nhằm phục vụ các mục đích khác nhau trong ứng dụng của bạn.

![](https://images.viblo.asia/5161f3db-b051-41ca-bfee-34cec22ee40c.png)

![](https://images.viblo.asia/3a204781-8a0b-478d-88c0-e5638d70057e.png)

**Step 2: Nhắm mục tiêu người dùng của bạn**
- Nhập tên cho chiến dịch của bạn: Tên này được sử dụng để báo cáo chiến dịch và không phải là một phần của thông báo hiển thị. 
- (Tùy chọn) Cung cấp mô tả chiến dịch: Mô tả này được sử dụng để báo cáo chiến dịch và không phải là một phần của thông báo hiển thị.
- Click vào menu **Select app** và xác định ứng dụng bạn muốn liên kết với chiến dịch này.
- (Tùy chọn) Click vào nút và để thu hẹp thêm người dùng mục tiêu của bạn.
- Sử dụng menu **Add** để chọn các thông số kỹ thuật bổ sung.
- Xem phần trăm người dùng tiềm năng đủ điều kiện cho chiến dịch này.
- Con số này được ước tính dựa trên những người dùng tích cực đã liên hệ với dịch vụ trong 7 ngày qua. Người dùng đủ điều kiện chỉ thấy thông báo này nếu điều kiện kích hoạt xảy ra.
- (Tùy chọn) Nếu ứng dụng của bạn nhắm mục tiêu người dùng bằng nhiều ngôn ngữ, bạn sẽ được nhắc việc bản địa hóa chiến dịch bằng các ngôn ngữ đó. Sử dụng hộp thoại để thêm bản dịch của riêng bạn hoặc sử dụng Google Dịch để bản địa hóa chiến dịch một cách dễ dàng.

![](https://images.viblo.asia/83f98e28-1f6c-425e-97c3-7d753ce74444.png)

**Step 3: Lên lịch cho thông báo**
- Mô tả ngày và giờ bắt đầu cho chiến dịch của bạn: Chiến dịch của bạn có thể bắt đầu khi ngay khi bạn tạo xong chiến dịch hoặc bắt đầu theo lịch trình.
- Mô tả ngày và giờ kết thúc cho chiến dịch của bạn: Chiến dịch của bạn có thể chạy vô thời hạn hoặc có điểm cuối đã lên lịch.
- Nhấp vào **Add Event +** để thêm ít nhất một sự kiện kích hoạt. Bạn có thể nhập các sự kiện hoặc sự kiện mặc định được ghi lại thông qua Firebase Analytics để kích hoạt thông báo trong ứng dụng của mình. Những sự kiện này có thể là hành động của người dùng, sự kiện hệ thống hoặc lỗi...
Ví dụ: **on_forceground** là sự kiện mặc định của Firebase Analytics logleen khi ứng dụng chuyển về trạng thái forceground. Nếu bạn sử dụng event này để kích hoạt, bất cứ khi nào ứng dụng chuyển lên trạng thái forceground, FIAM sẽ được kích hoạt. Một ví dụ khác cho ứng dụng thương mại điện tử: bạn có thể kích hoạt FIAM bằng sự kiện **purchase**, thì khi người dùng mua hàng thành công, và analytics log lên event **purchase** thì FIAM mới đc kích hoạt. Phần kích hoạt bằng trigger, xin hay theo dõi tiếp phần bên dưới.
- Chỉ định giới hạn tần suất trên mỗi thiết bị của bạn: Giới hạn cho phép bạn kiểm soát tần suất người dùng xem tin nhắn của bạn.
Theo mặc định, một chiến dịch không được hiển thị sau khi nó đã được người dùng xem một lần, hoặc bạn có thể đặt tần suất tin nhắn theo ngày.

![](https://images.viblo.asia/c89e89f8-23d8-4d0c-b207-d705da3672cb.png)

**Step 4: Chuyển đổi các sự kiện (optional)**
Firebase theo dõi số lần hiển thị dẫn đến một sự kiện chuyển đổi hoàn tất.
Ví dụ bạn lựa chọn sự kiện chuyển đổi là **purchase** khi user click vào thông báo từ FIAM, lúc này firebase sẽ đếm số lần chuyển đổi thành công từ thông báo FIAM tới khi user lựa chọn các thao tác để đi tới event **purchase**. Từ đó có thể tính được mức độ thành công (số lượt chuyển đổi trên tổng số thông báo FIAM) của campaign lần này.

#### Public campaign trên firebase
Sau khi sửa đổi chiến dịch của mình, bạn có thể click vào **Save as draft** để có tùy chọn quay lại và chỉnh sửa chiến dịch ở trạng thái bản nháp. Hoặc, bạn có thể click vào **Publish** để phát hành thông điệp của mình cho người dùng được nhắm mục tiêu vào ngày đã lên lịch. Bạn có thể chỉnh sửa chiến dịch của mình sau khi nó đã được publish.
Khi bạn dừng một chiến dịch đã publish, bạn sẽ không thể publish lại. Tuy nhiên, bạn có thể dừng hoặc chỉnh sửa chiến dịch đang chạy bất kỳ lúc nào. Bạn cũng có thể sao chép một chiến dịch hiện có để tạo ra các thay đổi nhỏ và tránh tạo một chiến dịch hoàn toàn mới

![](https://images.viblo.asia/e37dce0f-4035-4c02-965a-1906befdbac1.png)

### Sửa đổi hành vi của thông báo từ FIAM

#### 1. Phản hồi khi người dùng tương tác với thông báo từ FIAM
Trước tiên bạn cần tạo một listener để lắng nghe sự kiện click trên thông báo từ FIAM:
```
public class MyClickListener implements FirebaseInAppMessagingClickListener {

    @Override
    public void messageClicked(InAppMessage inAppMessage, Action action) {
        // Determine which URL the user clicked
        String url = action.getActionUrl();

        // Get general information about the campaign
        CampaignMetadata metadata = inAppMessage.getCampaignMetadata();

        // ...
    }

}
```

Sau đó dăng ký listener đó:
```
MyClickListener listener = new MyClickListener();
FirebaseInAppMessaging.getInstance().addClickListener(listener);
```

Tham khảo thêm các class  FirebaseInAppMessagingImpressionListener, FirebaseInAppMessagingClickListener, hoặc FirebaseInAppMessagingDisplayErrorListener để sử dụng khi cần thiết.

#### 2. Trigger thông báo từ FIAM
**FIAM theo mặc định cho phép bạn kích hoạt thông báo với Firebase Analytics cho các event mà không cần tích hợp thêm**. Ví dụ nếu bạn add event **view_item** trong phần **3.Scheduling** lúc tạo campaign, thì cứ khi nào trong ứng dụng của bạn có log lên event **view_item**, là lúc đó thông báo từ FIAM được kích hoạt. Tuy nhiên có hiển thị hay không còn phụ thuộc vào các setting khác như số lần xuất hiện trên mỗi device, hoặc ứng dụng chặn lại trong bước cuối cùng để hiển thị...
Bạn cũng có thể kích hoạt các sự kiện theo cách thủ công bằng cách 
```
  …
  // somewhere in the app's code
  FirebaseInAppMessaging.getInstance().triggerEvent("exampleTrigger");
```

#### 3. Sử dụng dữ liệu từ campaign metadata
Trong các chiến dịch của mình, bạn có thể chỉ định dữ liệu tùy chỉnh theo các cặp key/value. Khi người dùng tương tác với Thông báo từ FIAM, dữ liệu này sẽ có sẵn để bạn sử dụng:

```
public class MyClickListenerBundles implements FirebaseInAppMessagingClickListener {

    @Override
    public void messageClicked(InAppMessage inAppMessage, Action action) {
        // Determine which URL the user clicked
        String url = action.getActionUrl();

        // Get data bundle for the inapp message
        Map dataBundle = inAppMessage.getData();

        // ...
    }

}
```

#### 4. Tạm thời tắt thông báo từ FIAM
Theo mặc định, FIAM hiển thị tin nhắn bất cứ khi nào điều kiện kích hoạt được thỏa mãn, bất kể trạng thái hiện tại của ứng dụng. Nếu bạn muốn chặn hiển thị thông báo vì bất kỳ lý do gì, chẳng hạn như để tránh làm gián đoạn chuỗi màn hình xử lý thanh toán, bạn có thể làm điều đó bằng phương pháp setMessagesSuppressed của SDK:
```
FirebaseInAppMessaging.getInstance().setMessagesSuppressed(true);
```

SetMessagesSuppressed(true) ngăn FIAM hiển thị thông báo, trong khi false hiển thị lại thông báo. SDK sẽ tắt tính năng chặn thông báo khi khởi động lại ứng dụng và sẽ bỏ qua các thông báo bị chặn trước đó.

### Tùy chỉnh thông báo từ FIAM

#### 1. Thêm action cho thông báo từ FIAM
Bạn có thể thêm action bằng deeplink khi tạo campaign, trong phần 1.Style and content.  Trong campaign, cung cấp các thông tin chính xác trong **Button text** và **Button action**,  **Image action**, hoặc **Banner action** bằng các deeplink đã định nghĩa sẵn. Khi user click trên thông báo từ FIAM, ứng dụng sẽ chuyển hướng user tới màn hình đích mà bạn mong muốn.

#### 2. Chỉnh sửa giao diện của thông báo từ FIAM
Để chỉnh sửa được UI thông báo của FIAM, bạn cần làm như sau:
- Tạo 1 class **FirebaseInAppMessagingDisplayImpl** implement từ **FirebaseInAppMessagingDisplay**
```
private val firebaseInAppMessagingDisplayImpl =
        FirebaseInAppMessagingDisplay { inAppMessage, _ ->
            when (inAppMessage) {
                is CardMessage -> {
                    // do something
                }
                is ModalMessage -> {
                    // do something
                }
                is BannerMessage -> {
                    // do something
                }
                is ImageOnlyMessage -> {
                    // do something
                }
            }
        }
```

- Đăng ký **FirebaseInAppMessagingDisplayImpl** với SDK ngay khi khởi động ứng dụng (thường trong onCreate() của activity)
```
Firebase.inAppMessaging.apply {
            setMessageDisplayComponent(firebaseInAppMessagingDisplayImpl)
        }
```