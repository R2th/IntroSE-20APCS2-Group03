Kể từ khi Android Marketplace ra mắt vào tháng 3 năm 2012, kích thước trung bình của ứng dụng Android đã tăng gấp đôi so với trước.

Việc bộ nhớ khả dụng cho các thiết bị Android ngày càng tăng khiến cho các ứng dụng có kích thước lớn không còn là vấn đề trở ngại quá lớn, vậy tại sao không sử dụng bộ nhớ bổ sung này để mang lại trải nghiệm tốt hơn cho người dùng?

Tuy nhiên, có một điểm mà tất cả các ứng dụng có đồ họa có độ nét cao, các tính năng sáng tạo và nội dung đa phương tiện phong phú đều có tác động tiêu cực đến trải nghiệm người dùng. Không ai muốn một ứng dụng phải tải xuống mãi mãi và sau đó loại bỏ chúng ra khỏi bộ nhớ của thiết bị!

Thậm chí còn có bằng chứng cho thấy rằng có một mối tương quan nghịch giữa kích thước ứng dụng của bạn và số người dùng tải xuống ứng dụng của bạn. Theo một nghiên cứu gần đây, cứ tăng 6 MB kích thước ứng dụng thì ứng dụng của bạn sẽ mất đi 1% người dùng.

Mọi thứ bạn có thể làm là giảm kích thước của ứng dụng để khuyến khích nhiều người dùng tải xuống ứng dụng của bạn, vì vậy trong bài viết này, tôi sẽ chỉ cho bạn cách tạo một ứng dụng có kích thước nhỏ nhất có thể và đảm bảo ứng dụng của bạn kết nối được càng nhiều thiết bị càng tốt.

# 1. Sử dụng Android App Bundles
Khi phát triển một ứng dụng android, chúng ta luôn muốn tạo ra các ứng dụng tương thích với nhiều loại thiết bị khác nhau bằng cách cung cấp các đoạn mã và tài nguyện được thiết kê cho các loại màn hình khác nhau, kiến trúc CPU, ngôn ngữ và nhiều yếu tố khác. Thật không ma , điều này cũng có nghĩa là mỗi người tải xuống ứng dụng của bạn sẽ nhận được rất nhiều mã và tài nguyên mà họ không bao giờ sử dụng.

Ứng dụng tương thích với càng nhiều thiết bị càng tốt mà không làm tăng đáng kể kích thước ứng dụng từ lâu đã là một vấn đề đặc biệt được quan tâm đối với các nhà phát triển ứng dụng Android. Tuy nhiên, các nhà phát triển đang nhắm đến việc thay đổi tất cả, với định dạng xuất bản mới được thiết kế để giúp bạn hỗ trợ toàn bộ các thiết bị Android, đồng thời giảm kích thước APK của bạn. Theo blog chính thức của [Android Developers](https://android-developers.googleblog.com/2018/11/unfolding-right-now-at-androiddevsummit.html), bằng cách xuất bản ứng dụng của bạn ở định dạng Android App Bundle (.aab), bạn sẽ giảm kích thước ứng dụng của mình khoảng 35%
Khi bạn đã tải lên ứng dụng của mình dưới dạng tệp .aab, Google Play sẽ sử dụng tệp duy nhất này để tạo:

* Một APK cơ sở chứa tất cả các mã nguồn và tài nguyên cần thiết cho các chức năng của ứng dụng của bạn. Mọi người tải xuống ứng dụng của bạn sẽ nhận được APK cơ bản giống nhau.

* Nhiều APK cấu hình, được điều chỉnh theo các cấu hình thiết bị khác nhau. Mỗi khi ai đó tải xuống ứng dụng của bạn, họ sẽ nhận được một APK cấu hình mà phù hợp với thiết bị cụ thể của họ và chỉ chứa mã nguồn và tài nguyên họ thực sự cần.

Để xây dựng ứng dụng của bạn dưới dạng Android App Bundle , trước tiên, hãy chọn  Build > Generate Signed Bundle/APK từ thanh công cụ của Android Studio. Sau đó chọn Android App Bundle, rồi chọn Next. Bây giờ, mở trình đơn thả xuống và chọn ứng dụng làm mô-đun cơ sở của bạn.

Thực hiện theo các hướng dẫn trên màn hình để hoàn thành quá trình xây dựng. Android Studio hiện sẽ tạo một tệp .aab và lưu trữ nó trong máy tính của bạn. Thư mục **AndroidAppBundle / app / release.**

Khi bạn đã sẵn sàng tải tệp .aab của mình lên Google Play, chỉ cần truy cập **Google Play Console**  và chọn **Create Application**.

Bạn sẽ được yêu cầu nhập một số thông tin cơ bản về ứng dụng của bạn và sau đó chọn Create, sau đó là Save. Trong menu bên trái **Console**, chọn **App release**. Quyết định bản mà bạn muốn tải lên, sau đó chọn nút **Manager** và chọn **Create release**.

Khi được nhắc, hãy đăng ký Đăng ký ứng dụng bằng Google Play, đây là điều bắt buộc để sử dụng định dạng Gói ứng dụng. Chọn Browse files và sau đó chọn tệp .aab mà bạn muốn tải lên.
![](https://images.viblo.asia/974a33d3-b096-47f2-9144-2a2ed0db64d6.jpg)

Cuối cùng, chọn Save để lưu lại các cấu hình cho ứng dụng của bạn
# 2. Cung cấp các tính năng theo yêu cầu, với các modules tính năng động
Nó không phải là một điều gì đó bất thường đối với một dự án có một hoặc nhiều tính năng cần thiết để thực thi các chức năng cốt lõi của ứng dụng đó. Bạn thường có thể giảm kích thước APK của mình bằng cách tách các tính năng này thành APK tính năng động tùy chọn, sau đó người dùng có thể tải xuống theo yêu cầu, khi cần.
Để tạo module tính năng động, select File -> New -> New Module... từ thanh công cụ của Android studio. Ssau đó bạn chọn Dynamic Feature Module, tiếp theo chọn Next.
Tại đây, bạn có thể tạo các module cơ sở cho ứng dụng của bạn. Nếu ứng dụng của bạn hỗ trợ Android 4.4 trở về trước thị bạn cũng cần bật Fusing, vì điều này sẽ làm cho module tính năng động của bạn có sẵn cho các thiết bị này dưới dạng nhiều APK.
![](https://images.viblo.asia/017d2ac0-8094-4d2f-91e3-76282b84f149.jpg)

Cuối cùng, cung cấp cho module của bạn một tên công khai. Và chọn **Finish**
## Cho phép truy cập tới các module tính năng động
Khi bạn đã tạo một module tính năng động, bạn sẽ cần cung cấp một cách để yêu cầu nó khi chạy. Mở tệp build.gradle cấp module của bạn và thêm thư viện Google Play Core :
```
implementation 'com.google.android.play:core:1.3.6'
```
Mở **Activity** hoặc **Fragment** nơi mà bạn muốn tải các module, và thêm đoạn mã sau :
```
private void loadDyanmicFeatureOne() {
 
//Create an instance of SplitInstallManager//
 
        SplitInstallManager splitInstallManager =
                SplitInstallManagerFactory.create(this);
 
//Create the request//
 
        SplitInstallRequest request =
                SplitInstallRequest
                        .newBuilder()
 
//Specify the module that you want to download//
 
                        .addModule("dynamic-module")
                        .build();
 
        SplitInstallStateUpdatedListener listener = new SplitInstallStateUpdatedListener() {
            @Override
            public void onStateUpdate(SplitInstallSessionState splitInstallSessionState) {
                if(splitInstallSessionState.sessionId() == mySessionId) {
                    switch (splitInstallSessionState.status()) {
                        case SplitInstallSessionStatus.INSTALLED:
                            Toast.makeText(MainActivity.this, "The dynamic module was downloaded”, Toast.LENGTH_SHORT).show();
                            break;
                    }
                }
            }
        };
 
        splitInstallManager.registerListener(listener);
 
//Submit the request via the asynchronous startInstall//
 
        splitInstallManager.startInstall(request)
                .addOnFailureListener(new OnFailureListener() {
                    @Override
 
//If the download fails with an exception….//
 
                    public void onFailure(Exception e) {
 
//...then do something//
 
                    }
                })
                .addOnSuccessListener(new OnSuccessListener<Integer>() {
                    @Override
 
//If the module was downloaded successfully...//
 
                    public void onSuccess(Integer sessionId) {
 
//...then do something//
 
                        mySessionId = sessionId;
                    }
                });
    }
}
```
Bây giờ bạn có thể thêm mã và tài nguyên vào module của mình và người dùng sẽ được yêu cầu tải module này khi chạy.
# 3. Cho phép người dùng dùng thử trước bằng cách cung cấp Instant Apps
Nó có thể không phải là APK theo nghĩa truyền thống, có thể cài đặt, nhưng bạn có thể cung cấp một phần ứng dụng của mình dưới dạng Instant Apps độc lập, với kích thước nhẹ mà người dùng có thể tải theo yêu cầu. Đối với bất kỳ ai, người đang vật lộn với bộ nhớ cực kỳ hạn chế hoặc gói dữ liệu hạn chế, Instant Apps có thể là cách khả thi duy nhất để họ trải nghiệm ứng dụng của bạn.

Trong loạt bài về [Instant Apps](https://code.tutsplus.com/tutorials/what-are-android-instant-apps--cms-29283) gồm ba phần của chúng tôi, chúng tôi đã tạo Instant Apps đa tính năng được ánh xạ tới một URL duy nhất. Ánh xạ URL giúp Instant Apps của bạn có thể truy cập từ bất kỳ vị trí nào trên web có hỗ trợ siêu liên kết, bao gồm diễn đàn, tweet, bài đăng trên Facebook và blog. Tuy nhiên, ánh xạ URL yêu cầu bạn phải sở hữu một tên miền web nơi bạn có thể lưu trữ dự án của bạn.

Trong các phiên bản mới nhất của Android Studio, việc tạoInstant Apps trở nên dễ dàng hơn, vì giờ đây, có thể tạo một Instant Apps được ánh xạ tới bất kỳ URL nào, loại bỏ tất cả sự phức tạp liên quan đến ánh xạ URL.

Khi bạn đã xuất bản Instant Appsì không có URL, người dùng sẽ có thể truy cập ứng dụng đó thông qua nút Thử ngay trên Google Play.
![](https://images.viblo.asia/a5dc515e-04df-49ab-a770-2da7909a1b44.jpg)

Để tạo các Instant APK không có URL, bạn sẽ cần:

*  Android Studio 3.2 trở lên.
*  Instant Apps Development SDK 1.3.0 or higher.
*  Các phiên bản mới nhất của Android SDK Build and Platform tools. 

Các dự án hỗ trợ Instant Apps có cấu trúc độc đáo. Nếu bạn thực hành mô đun hóa như là một phần của quy trình phát triển ứng dụng tiêu chuẩn của mình, thì bạn có thể chỉ cần thực hiện một số điều chỉnh cho dự án của mình, nhưng nếu dự án của bạn không được mô đun hóa, thì hãy chuẩn bị dành thời gian để cơ cấu lại nó.

Để hỗ trợ Instant Apps, bạn sẽ cần tạo các mô-đun sau:
* **App module:** Đây là mô-đun tiêu chuẩn của ứng dụng.
* **Base module:** Phần này chứa mã và tài nguyên sẽ được sử dụng trên tất cả các mô-đun dự án của bạn, chẳng hạn như các biểu tượng,... cho ứng dụng của bạn.
* **Feature module:** Phần này chứa mã và tài nguyên cung cấp cho một tính năng độc lập.
* **Instantapp module:** Đây là một thùng chứa mà cuối cùng sẽ đưa từng mô-đun của dự án của bạn và chuyển đổi chúng thành **Instant Apps**.
![](https://images.viblo.asia/c804cbf8-ed8b-4d4a-bd86-b4e24bc04f8f.jpg)

Nếu bạn đang bắt đầu một dự án mới, thì bạn sẽ gặp may mắn: bạn có thể tạo một dự án trống đã có cấu trúc **Instant Apps**. Chỉ cần tạo một dự án mới như bình thường, nhưng khi được nhắc, hãy chọn **Dự án này sẽ hỗ trợ các ứng dụng tức thì.**
![](https://images.viblo.asia/8cae6c07-aaab-4916-b870-1441c86d56f9.jpg)

Sau đó, bạn có thể thêm mã và tài nguyên cho mỗi mô-đun, như bình thường.

Để kiểm tra **Instant Apps** không có URL của bạn, bạn sẽ cần một thiết bị tương thích (Android 5.1 trở lên). Nếu bạn sử dụng trình giả lập, thì bạn sẽ cần một AVD (Thiết bị ảo Android) mà sử dụng Android 8.1 trở lên, kiến ​​trúc x86 và bao gồm các API của Google. Bạn cũng cần phải đăng nhập vào tài khoản Google hợp lệ trên thiết bị thử nghiệm hoặc AVD của bạn.

Để kiểm tra **Instant Apps** của bạn, hãy chọn Run> Run...  'từ thanh công cụ Android Studio, sau đó chọn Edit Configurations…

Trong menu bên trái, chọn **Instantapp**. Vì chúng tôi đang kiểm tra **Instant Apps** không có URL, hãy tìm trường URL và xóa tất cả văn bản bên trong nó. Bây giờ chọn **Run**. Nếu thiết bị nhắc bạn chọn tham gia chương trình **Instant Apps**, hãy nhấn **Yes, I’m in. **

**Instant Apps** sẽ xuất hiện trên màn hình, không cần cài đặt và không cần URL!

Trong thời gian phát hành ứng dụng của bạn, bạn có thể hoàn thành quá trình ký hai lần để tạo Instant App APKs và có thể cấu hình riêng cho nó hoặc bạn có thể xây dựng dự án của mình dưới dạng **App Bundle**.

# Tài liệu tham khảo
https://code.tutsplus.com/articles/8-ways-to-reduce-your-android-app-apk-size--cms-32508