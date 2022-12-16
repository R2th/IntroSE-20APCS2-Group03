Để thiết lập trình giả lập Android với thiết bị ảo Android Virtual Device (AVD):

**Bước 1**: Tải xuống và cài đặt SDK Android đi kèm vớihttps://developer.android.com/studio/[](https://developer.android.com/studio/)
(Nếu bạn thực sự muốn sử dụng Command Prompt cho việc này, hãy xem bài này: https://superuser.com/questions/25538/how-to-download-files-from-command-line-in-windows-like-wget-or-curl

**Bước 2**: Sau khi tải xuống và cài đặt, SDK Android thường có thể được tìm thấy tại **C:\Users\User\AppData\Local\Android\Sdk\**

Sau đó " Thì Bạn sẽ phải thêm một vài thư mục con vào biến PATH của bạn .

![giả lập android gameloop.mobi](https://images.viblo.asia/2200b7fe-4b31-4703-9872-682a916755a1.png)

Hình ảnh: Nội dung thư mục SDK Android

**Bước 3**: Khởi chạy Command Prompt và thêm các thư mục này vào biến PATH của bạn với các lệnh sau:

```
> PATH = %PATH%;C:\Users\User\AppData\Local\Android\Sdk\platform-tools
> PATH= %PATH%;C:\Users\User\AppData\Local\Android\Sdk\emulator
> PATH= %PATH%;C:\Users\User\AppData\Local\Android\Sdk\tools\bin
```

**Bước 4**: Cài đặt các công cụ SDK và hình ảnh hệ thống mới nhất cho API cấp 28:

```
>sdkmanager "platform-tools" "platforms;android-28"
>sdkmanager "system-images;android-28;google_apis;x86"
>sdkmanager --licenses
```

sdkmanager phụ thuộc vào thư mục. \ tools \ bin \

**Bước 5**: Tạo thiết bị ảo Android (AVD) bằng lệnh sau:
```
> avdmanager create avd -n Android28 -k "system-images;android-28;google_apis;x86"
```

Thông tin thêm về lệnh trên và các tham số của nó tại https://developer.android.com/studio/command-line/avdmanager

**Bước 6**: Để chạy trình giả lập của bạn, bạn sẽ cần cài đặt phần mềm Bộ tăng tốc phần cứng của Intel, HAXM, có sẵn tại https://software.intel.com/en-us/articles/intel-hardware-accelerated-execution-manager-intel-haxm

Nếu bạn đã bật Hyper-V, bạn sẽ được yêu cầu tắt nó để chạy HAXM. Điều này có thể đạt được bằng cách làm theo các hướng dẫn có sẵn tại https://www.nextofwindows.com/how-to-enable-configure-and-use-hyper-v-on-windows-10 . 
LƯU Ý: Bạn cũng có thể cần phải khởi động lại máy tính của mình, có thể yêu cầu lặp lại các bước liên quan đến biến PATH . Bạn cũng có thể đặt PATH thông qua Bảng điều khiển [Control Panel](https://superuser.com/questions/994573/changing-the-system-path-variable-is-not-saving-the-new-path) . .

**Bước7:** Chạy các lệnh sau trong Command Prompt để khởi động trình giả lập của bạn.
```
>emulator -avd Android28
```
Sau đó nó sẽ khởi chạy trình giả lập Android của bạn trong một cửa sổ mới.

**Bước 8:** Để xem danh sách các thiết bị Android đang hoạt động, hãy chạy

```
>adb devices
```

(phụ thuộc vào ./pl platform-tools )

> Tin được viết bởi: **[Emulator Gameloop.mobi](https://gamehoy.com)**