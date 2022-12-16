Mặc dù có rất nhiều bài viết về việc sử dụng trình giả lập Genymotion, nhưng có rất ít bài viết về trình giả lập Android Studio. Bài viết ngắn này chỉ ra các bước cách cài đặt Dịch vụ Google Play trên trình giả lập Android Studio.

## Bước 1

Cài đặt hình ảnh hệ thống.
![](https://images.viblo.asia/befe3ea0-bb17-4834-8120-d1230736eb76.png)


## Bước 2

Mở Trình quản lý thiết bị ảo Android (AVD).

`$ANDROID_HOME/tools/android avd &`


Tạo một thiết bị ảo.![](https://images.viblo.asia/17a2b3ae-d10a-4374-8cfd-ab0c6c723c9d.png)


## Bước 3

Tải tệp zip Mở GApps từ trang web . http://opengapps.org/
![](https://images.viblo.asia/2440b8e2-7e13-4e94-a0ec-819b1501c98e.png)


Khi viết, tệp zip đã tải là: open_gapps-x86_64 Word6.0-pico-20170304.zip
Giari nén các gói.
giải nén open_gapps-x86_64-6.0-pico-20170304.zip 'Core / *' 

```
unzip open_gapps-x86_64-6.0-pico-20170304.zip 'Core/*'
rm Core/setup*
lzip -d Core/*.lz
for f in $(ls Core/*.tar); do
  tar -x --strip-components 2 -f $f
done
```

## Bước 4

Bắt đầu một trình giả lập.
```
$ANDROID_HOME/tools/emulator @android6 -writable-system &
```

## Bước 5

Install packages.

```
$ANDROID_HOME/platform-tools/adb remount
$ANDROID_HOME/platform-tools/adb push etc /system
$ANDROID_HOME/platform-tools/adb push framework /system
$ANDROID_HOME/platform-tools/adb push app /system
$ANDROID_HOME/platform-tools/adb push priv-app /system
```

## Bước 6
![](https://images.viblo.asia/7010faf7-e387-4a9f-9e5e-f7d61916f2f7.png)

Khởi động lại.
```

$ANDROID_HOME/platform-tools/adb shell stop
$ANDROID_HOME/platform-tools/adb shell start
```

Bạn có thể thấy rất tiếc, các dịch vụ của Google Play đã dừng của Google.

## Bước 7

Mở Play Store và đăng nhập.

## Bước 8

Dừng trình giả lập và bắt đầu lại.
```
$ANDROID_HOME/tools/emulator @android6 -writable-system &
```


Sau đó, dừng lại và bắt đầu lại bình thường.

```
$ANDROID_HOME/tools/emulator @android6 &
```

## Kết luận
Các bước này bạn có thể cài được Google play dịch vụ trên giả lập từ Google rồi