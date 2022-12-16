Nhiều khi chúng ta cần lấy file APK của một ứng dụng có một tính năng gì đó hay ho trên Play Store nhưng nó lại không có sẵn trên các trang tải APK như APKCombo, APKPure ? Trong bài viết này mình sẽ chỉ ra mẹo để lấy các file này nhé.

Các file APK của ứng dụng đã cài nằm ở đâu ?
Tất cả các file APK của các ứng dụng mà bạn cài trên điện thoại của mình, bất kể là từ cửa hàng chính thức của Google, Samsung, Huawei hay từ một nguồn trên internet đều sẽ được lưu trong thư mục /data/app. Thư mục này hoàn toàn có thể truy cập mà không cần quyền root. Các quyền trên thư mục này được chỉ định là rwxrwx--x. Điều này có nghĩa là bạn có thể đọc nội dung từ nó nhưng lại thiếu khả năng xem nó có những thư mục, tệp tin con nào ? Do vậy để truy cập vào nó, bạn cần biết tên của các tệp mà bạn muốn truy cập. Android package manager sẽ giúp bạn lấy được tên của các file APK được lưu tương ứng với từng package.

## Lấy danh sách các package name ?
Các package name này là các package name của ứng dụng. Để lấy danh sách các package name của tất cả các ứng dụng được cài trên thiết bị, bạn chạy lệnh sau
```bash
adb shell pm list packages
```
Lưu ý: Để đơn giản, chỉ được phép có một thiết bị đã kết nối với máy tính và bật debug mode.

Lúc này một danh sách các package name sẽ hiện ra:
```bash
❯ adb shell pm list packages
package:com.google.android.networkstack.tethering
package:com.google.omadm.trigger
package:com.google.android.carriersetup
package:com.android.cts.priv.ctsshim
package:com.google.android.youtube
package:com.vzw.apnlib
package:com.android.internal.display.cutout.emulation.corner
package:com.android.settings.overlay.pixel2018
package:com.google.android.ext.services
package:com.google.android.apps.mediashell
package:com.android.internal.display.cutout.emulation.double
package:com.google.android.overlay.pixelconfig2018
package:com.android.providers.telephony
package:com.android.dynsystem
package:com.android.sdm.plugins.connmo
package:com.google.android.googlequicksearchbox
package:com.google.android.cellbroadcastservice
package:com.verizon.mips.services
package:com.android.providers.calendar
package:com.android.providers.media
package:com.rb.rashanbazzar
...
```
Package name của ứng dụng sẽ hiện trong danh sách package name này.

## Lấy đường dẫn tới file APK ?
Giả sử bạn cần lấy APK của package name `com.google.android.youtube`, khi này bạn có thể gõ lệnh:

```
adb shell pm path com.google.android.youtube
```
Lúc này các APK của ứng dụng sẽ hiện ra. Thường thì bạn chỉ để tâm đến file `base.apk`, chính là file đầu tiên, các file sau liên quan đến config như cấu trúc của SoC, ngôn ngữ, độ phân giải màn hình:

```
❯ adb shell pm path com.google.android.youtube
package:/data/app/~~JZJ7O-128UkMPyO4wEa5Iw==/com.google.android.youtube-S52tY5BXzpAY6gmZRGWKxA==/base.apk
package:/data/app/~~JZJ7O-128UkMPyO4wEa5Iw==/com.google.android.youtube-S52tY5BXzpAY6gmZRGWKxA==/split_config.arm64_v8a.apk
package:/data/app/~~JZJ7O-128UkMPyO4wEa5Iw==/com.google.android.youtube-S52tY5BXzpAY6gmZRGWKxA==/split_config.en.apk
package:/data/app/~~JZJ7O-128UkMPyO4wEa5Iw==/com.google.android.youtube-S52tY5BXzpAY6gmZRGWKxA==/split_config.xxhdpi.apk
```
## Kéo file APK vào máy tính ?

Bây giờ khi đã biết được đường dẫn của APK, bạn có thể đơn giản kéo nó vào thư mục hiện tại của terminal bằng lệnh sau:
```bash
adb pull /data/app/JZJ7O-128UkMPyO4wEa5Iw==/com.google.android.youtube-S52tY5BXzpAY6gmZRGWKxA==/base.apk
```
Ok, giờ thử gõ lệnh `ls base.apk` xem. Tada, nó đã nằm trong máy tính của bạn.

Chúc các bạn thành công và tìm thấy niềm vui trong công việc.

-----

Source: [Mẹo lấy file APK của ứng dụng đã cài trên máy Android ?](https://phucynwa.com/tips/meo-lay-file-apk-cua-ung-dung-da-cai-tren-may-android/)