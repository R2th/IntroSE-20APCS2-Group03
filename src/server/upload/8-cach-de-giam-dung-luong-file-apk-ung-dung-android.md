Kể từ khi Android Marketplace ra mắt vào tháng 3 năm 2012, kích thước của ứng dụng Android trung bình đã tăng gấp đôi.

Một số sự gia tăng này có ý nghĩa: bộ nhớ khả dụng cho thiết bị Android thông thường đã tăng lên, vậy tại sao không sử dụng bộ nhớ bổ sung này để mang lại trải nghiệm tốt hơn cho người dùng?

Tuy nhiên, có một điểm mà tất cả các đồ họa độ nét cao, các tính năng sáng tạo và nội dung đa phương tiện phong phú này đều có tác động tiêu cực đến trải nghiệm người dùng. 
Không ai muốn một ứng dụng phải tải xuống mãi mãi và sau đó loại bỏ chúng bộ nhớ của thiết bị!

Thậm chí còn có bằng chứng cho thấy rằng có một mối tương quan nghịch giữa kích thước APK của bạn và số người tải xuống ứng dụng của bạn. 
Theo một nghiên cứu gần đây, cứ tăng 6 MB kích thước APK, bạn có thể mong đợi giảm 1% số người cài đặt ứng dụng của bạn sau khi truy cập trang Google Play của nó.

## Android App Bundles: Hỗ trợ nhiều thiết bị hơn trong khi giảm kích thước APK

Bất cứ khi nào bạn phát triển ứng dụng Android, bạn sẽ muốn đảm bảo ứng dụng đó tương thích với càng nhiều thiết bị khác nhau càng tốt, bằng cách cung cấp code và tài nguyên được tối ưu hóa cho mật độ màn hình khác nhau, kiến trúc CPU, ngôn ngữ và nhiều yếu tố khác. Thật không may, điều này cũng có nghĩa là mỗi người tải xuống ứng dụng của bạn sẽ nhận được rất nhiều code và tài nguyên mà họ sẽ không bao giờ sử dụng.

Hỗ trợ càng nhiều thiết bị càng tốt mà không làm tăng đáng kể kích thước APK của bạn từ lâu đã là một vấn đề đối với các nhà phát triển Android. 

Tuy nhiên, nhóm Android đang nhắm đến việc thay đổi tất cả, với định dạng xuất bản mới được thiết kế để giúp bạn hỗ trợ toàn bộ các thiết bị Android, đồng thời giảm kích thước APK của bạn. 
Theo blog chính thức của Nhà phát triển Android, bằng cách xuất bản ứng dụng của bạn ở định dạng **Android App Bundle (.aab)** mới này, bạn sẽ có thể giảm kích thước APK của mình trung bình khoảng 35%.

Khi bạn đã tải lên ứng dụng của mình dưới dạng tệp **.aab**, Google Play sẽ sử dụng tệp duy nhất này để tạo:


* APK cơ sở chứa tất cả mã và tài nguyên cần có để cung cấp chức năng cơ sở cho ứng dụng của bạn. Mọi người tải xuống ứng dụng của bạn sẽ nhận được cùng một APK cơ sở.
* 
* Nhiều APK cấu hình, được điều chỉnh theo các cấu hình thiết bị khác nhau. Mỗi khi ai đó tải xuống ứng dụng của bạn, họ sẽ nhận được một APK cấu hình phù hợp với thiết bị cụ thể của họ và chỉ chứa mã và tài nguyên họ thực sự cần.


Để build ứng dụng của bạn dưới dạng **Android App Bundle**, trước tiên, hãy chọn **Build > Generate Signed Bundle/APK** từ thanh công cụ Android Studio. 
Sau đó chọn **Android App Bundle**, rồi bấm vào **Next**. Bây giờ, chọn module cơ sở của bạn.

Thực hiện theo các hướng dẫn trên màn hình để hoàn thành quá trình xây dựng. Android Studio hiện sẽ tạo một tệp **.aab** và lưu trữ nó trong máy tính của bạn. Thư mục **AndroidAppBundle / app / release**.

## Cung cấp các tính năng theo yêu cầu, với các mô-đun tính năng động

Nó không phải là bất thường đối với một dự án có một hoặc nhiều tính năng cần thiết để cung cấp chức năng cốt lõi của ứng dụng đó. 
Bạn có thể giảm kích thước APK của mình bằng cách tách các tính năng này thành các APK tính năng động tùy chọn, sau đó người dùng có thể tải xuống theo yêu cầu, và khi được yêu cầu.

Để tạo mô-đun tính năng động, chọn **File > New > New Module…**  từ thanh công cụ Android Studio. Chọn **Dynamic Feature Module**, rồi chọn **Next.**

Từ đây, bạn chọn module của mình. Đặt tên cho module của bạn, rồi bấm vào **Next**. 
Chọn **Enable on-demand**. 
Nếu dự án của bạn hỗ trợ Android 4.4 trở về trước, thì bạn cũng sẽ cần bật **Fusing**, vì điều này sẽ làm cho module tính năng động của bạn có sẵn cho các thiết bị này dưới dạng nhiều APK.

![](https://images.viblo.asia/c43baa37-7c6c-41ab-89ef-b49b0c7a7548.jpg)

### Cho phép truy cập Dynamic Feature Module

Khi bạn đã tạo ra một mô-đun tính năng động, bạn sẽ cần cung cấp cho người dùng một cách để yêu cầu nó khi chạy. 
Mở tệp **build.gradle** và thêm thư viện Google Play Core :

```
dependencies {
 
//Add the following//
 
implementation 'com.google.android.play:core:1.3.6'
```

Mở Activity hoặc Fragment nơi bạn muốn tải module tính năng động của mình, rồi thêm vào như sau:

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

Bây giờ bạn có thể thêm code và tài nguyên vào module tính năng động của mình và người dùng sẽ có thể yêu cầu mô-đun khi chạy.