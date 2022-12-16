Context trong Android là một trong những đối tượng được sử dụng và lạm dụng nhiều nhất. Nhưng hầu hết các bài viết trên web tập trung định nghĩa nó là gì. Có rất ít nguồn tài liệu tham khảo để có được cái nhìn sâu sắc và giúp chúng ta hiểu được bức tranh toàn thể lớn hơn. Bài viết này sẽ đơn giản mọi thứ để trở nên dễ hiểu hơn.

## Lời nói đầu
Nhiệm vụ của bài viết này là giúp chúng ta nắm vững về Android Context. Đây là một trong những chủ đề cốt lõi của phát triển Android, và hầu như không có bất kỳ Developer nào sử dụng context hoàn toàn và theo cách nó được thiết kế. Trong bài viết này, chúng ta sẽ tìm hiểu sâu về nó.

## Bắt đầu
Bạn đã bao giờ đặt câu hỏi: Sự khác biệt giữa `getContext()`, `this`, `getBaseContext()` và `getApplicationContext()`? Nếu có, bài viết này sẽ giúp làm rõ phần lớn sự nhầm lẫn của bạn.
**Lưu ý:** Bạn phải biết cơ bản về phát triển Android, như `Activity`, `Fragments`, `BroadcastReceiver` và các thành phần khác. Nếu bạn là một new dev mới bắt đầu hành trình vào thế giới Android, đây có thể không phải là nơi tốt nhất để bắt đầu.

##  Context là gì?
Hãy đối mặt với nó, context là một trong những tính năng được thiết kế kém nhất của Android API. Bạn có thể gọi nó là *God* Object.

Một ứng dụng Android hay application package kit (APK) là một đóng gói các thành phần. Các thành phần này được định nghĩa trong tệp Manifest, nó bao gồm phần chính là Activity (UI), Service (Background), BroadcastReceiver (Action), ContentProvider (Data), và các Resources (images, strings...).

Developer có thể chọn để expose các thành phần với hệ thống bằng cách sử dụng intent-filter. Chẳng hạn: gửi email hoặc chia sẻ ảnh... Hoặc có thể lựa chọn chỉ expose các thành phần với các thành phần khác trong ứng dụng của họ.

Tương tự, Android OS cũng được thiết kế để expose các thành phần. Một số ít được biết đến như WifiManager, Vibrator, và PackageManager.

Context là cầu nối giữa các thành phần. Bạn sử dụng nó để giao tiếp giữa các thành phần, khởi tạo các thành phần và truy cập các thành phần.

**Các thành phần của chúng ta:**
Chúng ta sử dụng context để khởi tạo các thành phần như Activity, Content Provider, BroadcastReceiver. Chúng ta cũng sử dụng nó để truy cập vào các resources và filesystems.

**Thành phần của chúng ta và thành phần hệ thống:**
Context hoạt động như một entry point cho hệ thống Android. Một số thành phần hệ thống được sử dụng tốt như là WifiManager, Vibrator, và PackageManager. Bạn có thể truy cập WifiManager bằng cách sử dụng `context.getSystemService(Context.WIFI_SERVICE)`.

Theo cách tương tự, bạn có thể sử dụng context để truy cập vào filesystem dành riêng cho ứng dụng của bạn như một user trong OS.

**Các thành phần của chúng ta và một số thành phần của ứng dụng khác:**
Giao tiếp giữa các thành phần của riêng bạn và các thành phần của ứng dụng khác gần như giống nhau nếu bạn sử dụng phương pháp intent-filter. Sau tất cả, mọi thành phần là ngang nhau trong Android.

Ví dụ về sử dụng intent để gửi email như sau: 
```java
Intent emailIntent = new Intent(android.content.Intent.ACTION_SEND);
```

**Tóm lại:**
Hãy đồng ý rằng mọi thứ trong Android là một thành phần. Context là cầu nối giữa các thành phần. Bạn sử dụng nó để giao tiếp giữa các thành phần, khởi tạo và truy cập các thành phần. 

## Các loại Context khác nhau
Chúng ta cần context trong các trường hợp sau:
```
* Instance của Application như một context
* Activity
    * Instance của activity (this)
    * getApplicationContext() trong Activity
    * getBaseContext() trong Activity
* Fragment
    * getContext() trong Fragment
* View
    * getContext() trong View
* Broadcast Receiver
    * Context received trong broadcast receiver
* Service
    * Instance của service (this)
    * getApplicationContext() trong Service
* Context
    * getApplicationContext() trong Context instance
```

Chúng ta chia các loại context thành 2 loại: **UI Context** và **Non-UI Context**. 

### UI Context
Trong thực tế, chỉ có [ContextThemeWrapper](https://developer.android.com/reference/android/view/ContextThemeWrapper) là UI Context - có nghĩa là **Context + theme của bạn**.

Activity extend từ `ContextThemeWrapper`. Đây là lý do, khi bạn inflate bất kỳ XML nào, view của bạn được áp dụng theme. Nếu bạn inflate layout với Non-UI context, layout đó của bạn sẽ không được áp dụng theme.

Khi bạn sử dụng Activity như là nơi giữ context, bạn được đảm bảo đang sử dụng UI Context. Nếu bạn sử dụng phương thức `getContext()` trong fragment, bạn đang gián tiếp sử dụng Activity (nếu bạn đã attach Fragment thông qua fragmentManager trong Activity).

Nhưng, `view.getContext()` không đảm bảo là UI Context.

Nếu view được khởi tạo bằng cách sử dụng Layout Inflater và truyền vào UI Context, bạn sẽ nhận lại UI Context. Nhưng nếu nó được khởi tạo mà không truyền vào UI Context, bạn sẽ nhận được một context khác.

```
UI Context

- Activity
	- Instance của activity (this)
- Fragment
	- getContext() trong Fragment
- View
	- getContext() trong View (nếu View được khởi tạo sử dụng UI-Context)
```

### Non-UI Context
Bất cứ context nào ngoại trừ UI Context thì còn lại đều là Non-UI Context. Về mặt kỹ thuật, bất cứ context nào mà không phải là ContextThemeWrapper thì đều là Non-UI Context. 

Non-UI Context được phép làm hầu hết những điều UI-Context có thể làm. Nhưng như chúng ta đã chỉ ra ở trên, bạn sẽ không được áp dụng theme vào.

```
Non-UI Context

- Application instance as context
- Activity
	- getApplicationContext() in Activity
- Broadcast Receiver
	- Context received in broadcast receiver
- Service
	- Instance of your service (this)
	- getApplicationContext() in Service
- Context
	- getApplicationContext() in Context instance
```

**Tip:** Tất cả các loại context đều có vòng đời sống ngắn, ngoại trừ Application context. Đây là context bạn get được từ lớp Application hoặc phương thức `getApplicationContext()` khi bạn có context để truy cập.

## Nên sử dụng context nào?
Câu hỏi đặt ra: Điều gì xảy ra khi bạn sử dụng context sai chỗ? Sau đây là một vài tình huống:
**Tình huống 1:**
Bạn đang inflate một layout và sử dụng Non-UI Context. Điều gì có thể xảy ra? Có thể đoán được trong trường hợp này: bạn sẽ không nhận được layout theo theme.

**Tình huống 2:**
Bạn truyền UI-Context vào nơi mà tất cả những gì nó thực hiện là truy cập tài nguyên hoặc truy cập hệ thống file. Điều này có gì sai? Câu trả lời: Không có gì sai. Hãy nhớ rằng, UI-Context = Context + Theme. Nó sẽ sẵn sàng thực hiện như context cho bạn.

**Tình huống 3:**
Bạn truyền UI-Context vào nơi mà tất cả những gì nó thực hiện là truy cập tài nguyên hoặc truy cập hệ thống file, **nhưng** nó là một hoạt động dài ở background. Chẳng hạn download file. Bây giờ, Có điều gì xảy ra? Câu trả lời là: Memory leak.

**Tóm lại:**
* Bạn cần truy cập liên quan đến UI? Sử dụng UI-Context. Inflate View và show dialogue là 2 trường hợp cụ thể.
* Nếu không, hãy sử dụng Non UI Context.