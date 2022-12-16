Trong quá trình phát triển ứng dụng Android, đôi lúc bạn cần phải lấy Unique Id của thiết bị. Unique ID tạm hiểu là ID định danh để phân biệt thiết bị đó với các thiết bị khác, nó thường là duy nhất đối với từng thiết bị.

Unique ID thường được dùng khi bạn muốn theo dõi lượt cài đặt của ứng dụng, hoặc gửi Push notification cho một số loại thiết bị nhất định. Vì vậy, nó trở nên cần thiết phải có một UDID (unique device identifier) cho mỗi thiết bị.

Trong Android có rất nhiều lựa chọn thay thế để lấy UDID của thiết bị. Một số phương pháp để có được UDID trong ứng dụng Android được liệt kê dưới đây với những ưu điểm và nhược điểm của nó :

1. IMEI: (International Mobile Equipment Identity)
2. Android ID
3. Địa chỉ WLAN MAC
4. Địa chỉ Bluetooth

## 1. The IMEI: (International Mobile Equipment Identity)

IMEI là 1 thông số rất tốt để là ID của thiết bị. Nó là duy nhất cho mỗi và mọi thiết bị. IMEI phụ thuộc vào phần cứng của thiết bị nên nó sẽ tồn tại song song cùng với phần cứng của thiết bị đó.

Để lấy IMEI của thiết bị Android , ta thực hiện đoạn lệnh sau :

```
TelephonyManager TelephonyMgr = (TelephonyManager)getSystemService(TELEPHONY_SERVICE);
String m_deviceId = TelephonyMgr.getDeviceId();
```

Đoạn lệnh trên yêu cầu quyền  “android.permission.READ_PHONE_STATE”  trong AndroidManifest.

### Ưu điểm

- IMEI là duy nhất cho mỗi và mọi thiết bị.
- Nó là duy nhất ngay cả khi ứng dụng bị gỡ đi cài lại hoặc thiết bị bị root hay factory reset.

### Nhược điểm

- IMEI phụ thuộc vào Simcard của thiết bị. Vì vậy, không thể lấy được IMEI của các thiết bị mà không sử dụng Simcard.
- Trong các thiết bị sử dụng 2 Sim, ta sẽ lấy được 2 IMEI khác nhau của thiết bị đó.

## 2. The Android ID

Android ID là một số 64 bit duy nhất được tạo ra và lưu trữ khi thiết bị được khởi động lần đầu tiên. Android ID sẽ bị xóa đi khi thiết bị factory reset và một Android ID mới sẽ được sinh ra.

Ta lấy Android ID như sau :

```
String m_androidId = Secure.getString(getContentResolver(), Secure.ANDROID_ID);
```

### Ưu điểm

- Nó là duy nhất cho tất cả các thể loại thiết bị ( điện thoại và máy tính bảng ).
- Không cần bất cứ permission nào.
- Nó sẽ vẫn duy nhất trong tất cả các thiết bị và hoạt động trên cả những điện thoại ko gắn Sim.

### Nhược điểm 

- Android ID thay đổi trên các điện thoại được root và khi điện thoại factory reset.
- Ngoài ra cón có một vấn đề đối với các thiết bị Android nhãn hiệu Trung Quốc khi mà một số thiết bị có cùng Android ID.
- Trên Android, ID của thiết bị thỉnh thoảng khác nhau đối với ng dùng khác nhau trên Android 4.2 : https://code.google.com/p/android/issues/detail?can=2&start=0&num=100&q=Build.serial&colspec=ID%20Type%20Status%20Owner%20Summary%20Stars&groupby=&sort=&id=42523

## 3. Địa chỉ WLAN MAC

Chúng ta cũng có thể lấy Unique ID cho điện thoại Android sử dụng địa chỉ WLAN MAC. Địa chỉ MAC là duy nhất cho tất cả các thiết bị và nó hoạt động cho tất cả các thể loại thiết bị.

Đoạn lệnh sau sẽ lấy địa chỉ WLAN MAC của thiết bị Android :

```
WifiManager m_wm = (WifiManager)getSystemService(Context.WIFI_SERVICE);
String m_wlanMacAdd = m_wm.getConnectionInfo().getMacAddress();
```

Đoạn lệnh trên sẽ yêu cầu permission  “android.permission.ACCESS_WIFI_STATE” trong Android Manifest.

### Ưu điểm

- Nó là duy nhất cho tất cả các loại thiết bị ( điện thoại và máy tính bảng ).
- Nó là duy nhất ngay cả khi ứng dụng bị gỡ đi rồi cài lại.

### Nhược điểm

- Nếu thiết bị không có phần cứng để dùng Wifi bạn sẽ ko lấy được địa chỉ MAC, nhưng hầu hết các thiết bị Android bây giờ đều có phần cứng để dùng wifi, rất ít các thiết bị ko có phần cứng để dùng wifi.

## 4. Địa chỉ Bluetooth

Chúng ta có thể lấy địa chỉ Bluetooth để làm Unique ID cho thiết bị Android. Địa chỉ Bluetooth là duy nhất cho mỗi thiết bị Android mà có phần cứng phục vụ Bluetooth.

Để lấy địa chỉ Bluetooth thực hiện đoạn code sau :

```
BluetoothAdapter m_BluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
String m_bluetoothAdd = m_BluetoothAdapter.getAddress();
```

Đoạn code trên yêu cầu permission “android.permission.BLUETOOTH” trong Android Manifest.

### Ưu điểm

- Nó duy nhất cho tất cả các loại thiết bị ( điện thoại và máy tính bảng )
  Nói chung chỉ cần thiết bị có phần cứng Bluetooth là sẽ lấy được và nó sẽ ko bị thay đổi.
  
  ### Nhược điểm
  
  - Thiết bị không có phần cứng Bluetooth thì sẽ không lấy được địa chỉ Bluetooth.