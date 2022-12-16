## I. Overview
Như các bạn đã biết, hàng năm Google sẽ tung ra những cập nhật mới nhất cho hệ điều hành Android, hay còn gọi là nâng cấp phiên bản Android OS lên version cao hơn, năm vừa rồi 2018 Google đã ra mắt Android P (API 28), và như thường lệ chỉ cách đây vài hôm, Google đã chính thức giới thiệu phiên bản **Android Q beta** mới nhất đến các nhà phát triển. 

Ở phiên bản mới này, **Android Q** chủ yếu đề cập đến việc thay đổi, cập nhật, bổ sung quyền riêng tư liên quan đến dữ liệu, bộ nhớ, vị trí của người dùng (còn gọi là privacy). Bây giờ, chúng ta sẽ cùng điểm qua những chú ý hàng đầu liên quan đến việc thay đổi privacy này nhé.

## II. Top privacy changes
### 1. Scoped storage
Kể từ phiên bản Android Q Beta 1 này, sẽ thay đổi các thuộc tính sau:

- Để cung cấp cho người dùng quyền kiểm soát nhiều hơn đối với các file (tệp) của họ và để hạn chế sự lộn xộn của file, Android Q thay đổi cách các ứng dụng có thể truy cập các tệp trên bộ nhớ ngoài (external storage) của thiết bị. Android Q thay thế các quyền (permission) ***READ_EXTERNAL_STORAGE*** và ***WRITE_EXTERNAL_STORAGE*** bằng các quyền cụ thể hơn, cụ thể hơn về các permission riêng biệt liên quan đến media và các ứng dụng truy cập các tệp trên external storage sẽ không yêu cầu quyền cụ thể.

- Android Q cung cấp cho mỗi ứng dụng một ***isolated storage sandbox***  (1 bộ nhớ đặc biệt của ứng dụng) được  lưu trữ riêng biệt vào external storage, chẳng hạn như / sdcard. Sẽ không có ứng dụng nào khác có thể truy cập trực tiếp vào các tập tin trong ***isolated storage sandbox*** của ứng dụng của bạn. Vì các tệp là riêng tư đối với ứng dụng của bạn, và bạn không còn cần bất kỳ quyền nào để truy cập và lưu các tệp của riêng bạn trong bộ nhớ ngoài. Thay đổi này giúp dễ dàng duy trì quyền riêng tư của các tệp của người dùng và giúp giảm số lượng quyền mà ứng dụng của bạn cần. Rất hữu ích đúng k nào :D

*Lưu ý*: Nếu người dùng gỡ cài đặt ứng dụng của bạn, các tệp trong ***isolated storage sandbox***  của bạn sẽ được dọn sạch.

- Và nơi tốt nhất để lưu trữ tệp trên bộ nhớ ngoài chính là  Context.getExternalFilesDir (), nó hoạt động nhất quán trên tất cả các phiên bản Android. Khi sử dụng phương pháp này, truyền vào media environment tương ứng với loại tệp bạn muốn tạo hoặc mở. <br>
Ví dụ: để truy cập hoặc lưu hình ảnh riêng tư của ứng dụng, hãy gọi:
```java
 Context.getExternalFilesDir(Environment.DIRECTORY_PICTOUND)
```

- Nếu ứng dụng của bạn tạo các tệp thuộc về người dùng và người dùng đó sẽ được giữ lại khi gỡ cài đặt ứng dụng của bạn, thì  hãy lưu chúng vào một trong các bộ sưu tập phương tiện phổ biến (media collections), hay còn được gọi là ***shared collections*** (bộ sưu tập chia sẻ). Bộ sưu tập được chia sẻ bao gồm: Ảnh & Video, Âm nhạc và Tải xuống.  Ứng dụng của bạn không cần yêu cầu bất kỳ quyền nào để tạo và sửa đổi các tệp trong các bộ sưu tập được chia sẻ này. Tuy nhiên, nếu ứng dụng của bạn cần tạo và sửa đổi các tệp mà các ứng dụng khác đã tạo, trước tiên, ứng dụng đó phải yêu cầu quyền thích hợp:
Truy cập vào các tệp của ứng dụng khác trong ***shared collections*** (bộ sưu tập chia sẻ) Photo & Video các bạn cần yêu cầu quyền READ_MEDIA_IMAGES hoặc READ_MEDIA_VIDEO, tùy thuộc vào loại tệp mà ứng dụng của bạn cần truy cập.
Để truy cập vào các tệp của ứng dụng khác trong ***shared collections*** (bộ sưu tập chia sẻ) Music yêu cầu quyền READ_MEDIA_AUDIO.
*Lưu ý:* Các bạn không có quyền truy cập vào ***shared collections*** Donwload . Ứng dụng của bạn có thể truy cập các tập tin riêng của mình trong bộ sưu tập này. Tuy nhiên, để truy cập các tệp của ứng dụng khác trong bộ sưu tập này, bạn phải cho phép người dùng chọn tệp bằng ứng dụng chọn tệp của hệ thống.

Sau khi yêu cầu các quyền cần thiết, ứng dụng của bạn sẽ truy cập các bộ sưu tập này bằng API MediaStore:

Đối với ***shared collections*** Photo & Video, sử dụng MediaStore.Images hoặc MediaStore.Video.
Đối với ***shared collections*** Music, hãy sử dụng MediaStore.Audio.
Đối với ***shared collections*** Download, hãy sử dụng MediaStore.Downloads.

*Thận trọng:* Đối với các ứng dụng mới được cài đặt trên Android Q, khi gọi getExternalStoragePublicDirectory () chỉ cung cấp quyền truy cập vào các tệp mà ứng dụng của bạn đã lưu trữ trong ***isolated storage sandbox***. Để duy trì quyền truy cập vào các tệp của ứng dụng khác, hãy cập nhật logic của ứng dụng để sử dụng MediaStore.

### 2. Device Location
**Android Q** cung cấp cho người dùng quyền kiểm soát nhiều hơn khi các ứng dụng có thể truy cập vào Location Device (vị trí thiết bị). Khi một ứng dụng chạy trên Android Q yêu cầu quyền truy cập vị trí, người dùng sẽ thấy hộp thoại hiển thị dưới đây. 
![](https://images.viblo.asia/5f9dfd0f-562f-47f5-a46f-081b0e9d3686.png)

Hộp thoại này cho phép người dùng cấp quyền truy cập vị trí cho hai phạm vi khác nhau: khi sử dụng (foreground only) hoặc mọi lúc (foreground and background).
Để hỗ trợ kiểm soát mà người dùng có quyền truy cập vào thông tin vị trí của ứng dụng, Android Q giới thiệu quyền truy cập vị trí mới, **ACCESS_BACKGROUND_LOCATION**. Không giống như các quyền **ACCESS_FINE_LOCATION** và **ACCESS_COARSE_LOCATION** hiện có, quyền mới chỉ ảnh hưởng đến quyền truy cập của ứng dụng vào vị trí khi nó chạy ở chế độ background. Một ứng dụng được coi là ở chế độ background trừ khi một trong các hoạt động của nó *visible* hoặc ứng dụng đang chạy *foreground service*.

### 3. Restrictions background activity starts
Android Q đặt ra các hạn chế khi ứng dụng start Activities. Thay đổi hành vi này giúp giảm thiểu gián đoạn cho người dùng và giúp người dùng kiểm soát nhiều hơn những gì hiển thị trên màn hình của họ. Cụ thể, các ứng dụng chạy trên **Android Q** chỉ có thể start Activities khi một hoặc nhiều điều kiện sau được đáp ứng:
- Ứng dụng này có một window visible, chẳng hạn như một Activity đang ở trạng thái foreground.
- Một ứng dụng khác ở trạng thái foreground sẽ gửi PendingIntent thuộc về ứng dụng. 
- Hệ thống sẽ gửi PendingIntent thuộc về ứng dụng, chẳng hạn như nhấn vào thông báo. Chỉ những Pending intent mà ứng dụng dự kiến sẽ khởi chạy UI mới được miễn.
- Hệ thống sẽ gửi một broadcast, chẳng hạn như SECRET_CODE_ACTION, đến ứng dụng. Chỉ những broadcast đặc biệt nơi mà ứng dụng mong muốn là launcher UI mới được miễn.

*Lưu ý:* Đối với mục đích start Activities, foreground services không đủ điều kiện để ứng dụng được coi là trạng thái foreground.

Với các thay đổi trên thì mình thấy, phần lớn các ứng dụng không bị ảnh hưởng bởi sự thay đổi này.
### 4. Hardware identifiers
Ở phần này, sẽ mô tả một số hạn chế khi truy cập dữ liệu và định danh hệ thống (system identifiers). Những thay đổi này giúp bảo vệ quyền riêng tư của người dùng.
*Thay đổi ảnh hưởng đến tất cả các ứng dụng*
Các thay đổi sau ảnh hưởng đến tất cả các ứng dụng chạy trên Android Q, ngay cả khi chúng nhắm mục tiêu Android 9 (API 28) hoặc thấp hơn.

- Contacts affinity:
Bắt đầu từ Android Q, platform không còn theo dõi thông tin về Contacts affinity (mối liên hệ giữa các Contact). Do đó, nếu ứng dụng của bạn tiến hành tìm kiếm trên Contact (danh bạ) của người dùng, kết quả sẽ không còn được sắp xếp theo tần suất tương tác.
- Randomized MAC addresses:
Các thiết bị chạy trên Android Q sẽ truyền địa chỉ MAC ngẫu nhiên theo mặc định.
- Access to /proc/net filesystem:
Android Q xóa quyền truy cập vào / Proc / net, bao gồm thông tin về trạng thái mạng của thiết bị. Các ứng dụng cần truy cập vào thông tin này, chẳng hạn như VPN, nên tham khảo các lớp NetworkStatsManager và ConnectivityManager.
- Non-resettable device identifiers:
Bắt đầu từ Android Q, các ứng dụng phải có quyền READ_PRIVILEGED_PHONE_STATE để truy cập  non-resettable identifiers của thiết bị, bao gồm cả IMEI và số sê-ri. Nhiều trường hợp sử dụng không cần  non-resettable identifiers. Nếu ứng dụng của bạn không có quyền và bạn muốn thử get thông tin về identifiers, phản hồi của platform sẽ thay đổi dựa trên phiên bản SDK:
* Từ Android Q, xảy ra exeption SecurityException.
* Android P hoặc thấp hơn: phương thức sẽ trả về dữ liệu null hoặc placeholder data nếu ứng dụng có quyền READ_PHONE_STATE. Nếu không, một SecurityException xảy ra.
- Access to clipboard data:
Trừ khi ứng dụng của bạn là trình chỉnh sửa phương thức nhập mặc định (IME - input method edittor) hoặc là ứng dụng đang được focus, ứng dụng của bạn không thể truy cập dữ liệu clipboard.

### 5. Location and Network
Tương tự như các phần trên, chú ý này mô tả một số hạn chế về việc truy cập thông tin vị trí và mạng (Location and Network). Những thay đổi này giúp bảo vệ quyền riêng tư của người dùng.
*Thay đổi ảnh hưởng đến tất cả các ứng dụng*
Các thay đổi sau ảnh hưởng đến tất cả các ứng dụng chạy trên Android Q, ngay cả khi chúng nhắm mục tiêu Android 9 (API cấp 28) hoặc thấp hơn.
- Access to all camera information requires permission:
Android Q thay đổi độ rộng thông tin mà phương thức getCameraCharacteristic () trả về theo mặc định. Đặc biệt, ứng dụng của bạn phải có quyền CAMERA để truy cập dữ liệu riêng biệt của thiết bị mà có trong giá trị trả về của phương thức này. Nếu ứng dụng của bạn không có quyền CAMERA, nó không thể truy cập vào các trường sau:<br>
```
ANDROID_LENS_POSE_ROTATION
ANDROID_LENS_POSE_TRANSLATION
ANDROID_LENS_INTRINSIC_CALIBRATION
ANDROID_LENS_RADIAL_DISTORTION
ANDROID_LENS_POSE_REFERENCE
ANDROID_LENS_DISTORTION
ANDROID_LENS_INFO_HYPERFOCAL_DISTANCE
ANDROID_LENS_INFO_MINIMUM_FOCUS_DISTANCE
ANDROID_SENSOR_REFERENCE_ILLUMINANT1
ANDROID_SENSOR_REFERENCE_ILLUMINANT2
ANDROID_SENSOR_CALIBRATION_TRANSFORM1
ANDROID_SENSOR_CALIBRATION_TRANSFORM2
ANDROID_SENSOR_COLOR_TRANSFORM1
ANDROID_SENSOR_COLOR_TRANSFORM2
ANDROID_SENSOR_FORWARD_MATRIX1
ANDROID_SENSOR_FORWARD_MATRIX2
```
- Hạn chế  enabling và disabling Wi-Fi:
Các ứng dụng chạy trên Android Q không thể bật hoặc tắt Wi-Fi. Phương thức WifiManager.setWifiEnabled () luôn trả về false.
Vậy là app sẽ k thể bật hoặc tắt Wifi từ Android Q nữa rồi (yaoming). Từ giờ chỉ còn cách là sử dụng bảng cài đặt để nhắc người dùng tự bật và tắt Wi-Fi thôi :D
- Cần có location permission cho telephony, Wi-Fi, Bluetooth APIs
Trừ khi ứng dụng của bạn có quyền ACCESS_FINE_LOCATION, nếu k ứng dụng của bạn không thể sử dụng một số phương thức trong Wi-Fi, Wi-Fi Aware hoặc Bluetooth API khi chạy trên Android Q.<br> Để xem danh sách các phương thức bị ảnh hưởng, [click here](https://developer.android.com/preview/privacy/appendix)
- Hạn chế cấu hình mạng Wi-Fi:
Để bảo vệ quyền riêng tư của người dùng, cấu hình thủ công của danh sách các mạng Wi-Fi hiện bị giới hạn ở các ứng dụng hệ thống. Nếu ứng dụng của bạn chạy trên Android Q thì các phương thức sau không còn trả về dữ liệu:
- Phương thức getConfiguredNetworks () luôn trả về một empty list.
- Mỗi phương thức hoạt động của mạng trả về một giá trị số nguyên là addNetwork () và updateNetwork () - luôn trả về giá trị -1.
- Mỗi hoạt động mạng trả về giá trị boolean, removeNetwork(), reassociate(), enableNetwork(), disableNetwork(), reconnect(), and disconnect() - luôn trả về ***false***.

Nếu ứng dụng của bạn cần kết nối với mạng Wi-Fi, hãy sử dụng các phương pháp thay thế sau:
- Để kích hoạt kết nối với mạng Wi-Fi nội bộ, sử dụng WifiNetworkSpecifier trong một đối tượng NetworkRequest.
- Để thêm mạng Wi-Fi để xem xét cung cấp quyền truy cập internet cho người dùng, các bạn sử dụng các đối tượng WifiNetworkSuggestion. Bạn có thể thêm và xóa các mạng xuất hiện trong hộp thoại chọn mạng tự động kết nối bằng cách gọi WifiManager.addNetworkSuggestions () và WifiManager.removeNetworkSuggestions (). Các phương pháp này không yêu cầu bất kỳ quyền vị trí.

## Summary
Qua bài viết này, mình đã điểm qua 1 số chú ý hàng đầu của những thay đổi, hay là hạn chế trong phiên bản mới nhất mà Google vừa ra mắt là **Android Q**. Sẽ còn rất nhiều những thay đổi khác nữa, và sẽ còn nhiều những phiên bản update của **Android Q** này, hiện giờ ms chỉ là bản beta 1 mà thôi. :D
Cảm ơn các bạn đã dành thời gian theo dõi.