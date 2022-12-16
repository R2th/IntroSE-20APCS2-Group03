![EventBus-Publish-Subscribe.png](/uploads/83eb4196-4095-47f6-aa4a-5d1f7038eedf.png)

Một ứng dụng Android điển hình có xu hướng được tạo thành từ nhiều lớp, mô-đun hoặc các cấu trúc như Fragments, Activities, Presenters, và Services. Giao tiếp hiệu quả giữa các thành phần này có thể trở nên khó khăn nếu chúng được gắn kết chặt chẽ với nhau.

Ở cấp độ thấp của kiến trúc ứng dụng của bạn, chẳng hạn như cơ sở dữ liệu, khi một hành động xảy ra, bạn có thể muốn gửi dữ liệu đến một mức độ cao hơn chẳng hạn như gửi đến view.

Để làm được điều này, bạn có thể muốn tạo ra một listener để lắng nghe, async tasks hoặc callbacks. Tất cả sẽ làm việc, nhưng chúng có một số nhược điểm lớn:

- Đăng ký và hủy bỏ đăng kí phụ thuộc nhiều vào các thành phần riêng lẻ.
- Code lặp lại nhiều lần.
- Khó khăn trong việc testing.
- Tăng nguy cơ gây lỗi.

Sử dụng  publish/subscribe hoặc kiến trúc bus sẽ ngăn chặn tất cả các vấn đề tiềm năng nêu trên.

Đó là một cách rất tốt để thực hiện liên lạc hiệu quả giữa các thành phần trong một ứng dụng. Sử dụng publish/subscribe trong Android, bất cứ thành phần ứng dụng có thể đưa ra các sự kiện mà nó sẽ bàn giao cho event bus, và thành phần liên quan có thể sử dụng hoặc đăng ký với nó.

Để sử dụng greenrobot EventBus, bạn cần thêm vào build.gradle file :

```java
compile 'org.greenrobot:eventbus:3.0.0'
```

![eventbus-for-android-7-638.jpg](/uploads/c8660a07-7d28-412a-9510-869b76f2f441.jpg)

### Event Subscriber

Một subscriber đơn gianr là theo dõi một sự kiện bằng cách đăng kí trong event bus và cũng có thể hủy bỏ đăng kí lắng nghe sự kiện đó. Để trở thành subscriber, bạn phải thực hiện 3 việc chính sau :

1. Đăng kí subscriber trong event bus với hàm register(). Nó sẽ xác nhận với EventBus rằng bạn muốn lắng nghe các sự kiện. Trong một Activity, bạn sẽ gọi trong onStart(), trong khi ở fragment, bạn sẽ gọi nó trong onAttact(Activity activity) :

```java
@Override
public void onStart() {
    super.onStart();
    EventBus.getDefault().register(this);
}
```

2. Hủy đăng kí subcriber, có nghĩa là nói với EventBus ngưng gửi cho mình các sự kiện, gọi hàm unregister(). Trong Activity bạn sẽ gọi trong onStop(), còn trong fragment sẽ gọi trong hàm onDetach() :

```java
@Override
public void onStop() {
    super.onStop();
    EventBus.getDefault().unregister(this);
}
```

3. Implement lại hàm onEvent() để xác định loại event bạn muốn nhận và kiểu action khi nhận được.

```java
@Subscribe
public void onEvent(MessageEvent event) {
     Toast.makeText(this, "Hey, my message" + event.getMessage(), Toast.LENGTH_SHORT).show();.
}
```

### Định nghĩa Event Messages

Các sự kiện trong greenbot EventBus chỉ đơn gianr là các đối tượng do bạn định nghĩa. Bạn có thể định nghĩa các sự kiện khác nhau nếu bạn muốn. Chúng ko cần kế thừa từ lớp nào mà chỉ đơn gianr là POJO (Plain Old Java Objects).

```java
public class MessageEvent {

    public String mMessage;

    public MessageEvent(String message) {
        mMessage = message;
    }

    public String getMessage() {
        return mMessage;
    }
}
```

### Post Event and Post Sticky Event

Sự khác biệt chính giữa post event và post sticky event là cơ chế bộ nhớ đệm sử dụng bên trong EvenBus.

Khi một thành phần nào đó post một sticky event, event này sẽ được lưu lại trong bộ nhớ đệm. Khi một Activity mới hoặc một Fragment mới theo dõi sự kiện, EventBuss sẽ lấy ra sticky event gần đây nhất trong bộ nhớ đệm thay vì thực hiện lại đăng kí một event mới, cho nên event này vẫn nằm trong bộ nhớ đệm sau khi subcriber đã nhận được nó.

Sticky event được gửi đi với phương thức postSticky(MessageEvent) và non-sticky event được gửi đi với phương thức post(MessageEvent) :

```java
EventBus.getDefault().postSticky(new MessageEvent("Hey event subscriber!"));
EventBus.getDefault().post(new MessageEvent("Hey event subscriber!"));
```

Đối với một sự kiện thường xuyên, non-sticky event, nếu không có subriber được tìm thấy, sự kiện này sẽ được bỏ đi. Một sticky event sẽ được lưu trữ, tuy nhiên, trong trường hợp một subcriber đến cùng sau.

Vì vậy, khi nào bạn quyết định sử dụng sticky event? Bạn có thể làm điều này nếu bạn đang theo dõi vị trí của người dùng, hoặc cho bộ nhớ đệm dữ liệu đơn giản, theo dõi mức độ pin, vv ...

```java
EventBus.getDefault().postSticky(new LocationReceivedEvent(6.4531, 3.3958))
```

### Theo dõi một Sticky Event

```java
// UI updates must run on MainThread
@ Subscribe(sticky = true, threadMode = ThreadMode.MAIN)
public void onEvent(MessageEvent event) {
    textField.setText(event.getMessage());
}
```

Để theo dõi một  sticky event, bạn thêm sticky = true bên trong the @Subscribe. Nó chỉ ra rằng bạn muốn nhận một  sticky event  của MessageEvent từ bộ nhớ đệm.

### Xóa bỏ Sticky Events

```java
LocationReceivedEvent locationReceivedStickyEvent = EventBus.getDefault().getStickyEvent(LocationReceived.class);
if(stickyEvent != null) {
    EventBus.getDefault().removeStickyEvent(locationReceivedStickyEvent);
}
```

Hàm removeStickyEvent(Event) sẽ xóa bỏ một sticky event từ bộ nhớ đệm, và hàm removeAllStickyEvents() sẽ xoá bỏ tất cả các sticky event.