# 1. Intent là gì ?
- Intent là một mô tả trừu tượng của 1 hoạt động sẽ được thực hiện. Nó có thể sử dụng để khởi chạy 1 Activity, Service, hoặc đăng ký Broadcast Receiver 

**Khởi chạy 1 Activity**
- Ví dụ từ màn hình A ta chuyển qua màn hình B 
```
val intent = Intent(this, BActivity::class.java)
startActivity(intent)
```

**Khởi chạy 1 Service**
- Ví dụ từ màn hình A ta khởi chạy service C
```
val intent = Intent(this, CService::class.java)
startService(intent)
```

**Đăng ký 1 Broadcast Receiver**
- Ví dụ lắng nghe khi tắt bật chế độ máy bay 
```
val broadcast = Broadcast() // Tạo 1 lớp Broadcast kế thừa từ BroadcastReceiver
IntentFilter filter = IntentFilter("android.intent.action.AIRPLANE_MODE")
registerReceiver(broadcast, filter)
```

# 2. Các loại Intent 
- Có 2 loại Intent: Explicit intents (tường minh) và Implicit intents ( không tường minh)

### Explicit intents (tường minh)
Intent tường mình tức là khi tạo một đối tượng Intent, chúng ta chỉ định rõ và truyền trực tiếp tên thành phần đích vào intent. Ví dụ: như đoạn code bên dưới, intent được chỉ định rõ OtherActivity sẽ là thành phần nhận và xử lý intent này.
```
val intent = Intent(this, MainActivity::class.java)
                    startActivity(intent)
```
### Implicit intents ( không tường minh)
Thay vì trong Intent Android được chỉ định sẵn một Activity nào đó thực hiện, thì sẽ chỉ truyền vào action và gửi cho Android. Android sẽ dựa vào action đó mà lọc những thành phần nào đã đăng kí action đó gọi ra.

Vì vậy, Android có thể tự động kích hoạt thành phần từ cùng một ứng dụng hoặc một số ứng dụng khác để xử lý intent đó.

Ví dụ ứng dụng chúng ta có 1 danh sách số điện thoại lấy từ api trả về. Thay vì chúng ta phải copy rồi vào cuộc gọi paste vào để gọi chúng ta có thể gửi số điện thoại đó thông qua Intent để mở cuộc gọi lên và gọi luôn nhé.

```
val intentCall = Intent(Intent.ACTION_CALL).apply {
                data = Uri.parse("tel: 0379692508")
            }
startActivity(intentCall)
```

# 3. Truyền dữ liệu bằng Intent
Để truyền dữ liệu sang cho activity, service,... mới chúng ta sử dụng các cặp **key-value** trong hàm `putExtra`, `putExtras`,....
- `putExtra` chỉ truyền được dữ liệu kiểu cơ bản: `Int, Float, Char, Double, Boolean, String`
```
val intent = Intent(this, OtherActivity::class.java)
intent.putExtra("key", 1234567)
startActivity(intent)

// Nhận giá trị được gửi qua 
intent.getIntExtra("key", 0) 
//phần trong ngoặc " " là key 0 là giá trị defaul nếu nhận qua k có giá trị thị mặc định nó nhận là 0 
```
![](https://images.viblo.asia/2114f738-8c38-49ef-a60d-acdef7e8dedd.png)

- `putExtras` dùng để truyền 1 gói `Bundle` đi 
```
val intent = Intent(this, OtherActivity::class.java)
val bundle = Bundle()
bundle.putString("key_1", "Hello! I am Saitaman")
startActivity(intent)
```

Ngoài ra chúng ta còn hay sử dụng Intent để gửi đi 1 object theo kiểu Parcelable, Serializable

Như vậy là mình đã chia sẽ những kiến thức cơ bản về Intent trong android cũng như cách sử dụng. Cảm ơn các bạn đã đọc bài này <3.

Tài liệu tham khảo: 
- https://developer.android.com/guide/components/intents-filters
- https://vntalking.com/intent-trong-android-va-cach-su-dung.html