## Event Bus là gì ?  
Event Bus là một thư viện mã nguồn mở cho Android và Java sử dụng mô hình Publisher/subscriber pattern. Event Bus là trung tâm kết nối giữa các lớp độc lập chỉ với những dòng code ngắn gọn và đơn giản bỏ đi sự phụ thuộc và tăng tốc độ phát triển ứng dụng   
![](https://images.viblo.asia/885c0675-ec03-42eb-8dbe-1b1fcf5bbf4e.png)  
Những lợi ích khi sử dụng event bus
- đơn giản hóa việc giao tiếp giữa các thành phần
- tách biệt trong việc nhận và gửi
- chạy tốt với giao diện người dùng (Actvity, Fragment,..) và background thread
- Tránh phức tạp và lỗi thường gặp về phụ thuộc và các vẫn đề về vòng đời
- HIệu suât cao
- Được chứng minh với hơn 100,000,000 ứng dụng đã sử dụng
- Có những chức năng nâng cao như phân phối tới thread , và mức độ ưu tiên của Subscriber
## Chi tiết hơn về eventBus
các bước làm việc với EventBus  
Bước 1: thêm thư viện của event bus vào file BuildGradle
```javascript
compile 'org.greenrobot:eventbus:3.0.0'
```
hiện tại event bus đang support vs version mới nhất là 3.0.3  
Bước 2 : Tạo phương thức để lắng nghe sự kiện 
```javascript
public void onEvent(AnyEventType event) {}
```
Bước 3 : đăng kí lắng nghe sự kiện 
eventBus.register(this);
Bước 4: Gửi sự kiện eventBus.post(event);
Phương thức POST kích hoạt Event với đối tượng dữ liệu mà bạn muốn chia sẽ . Ví dụ :
```javascript
EventBus.getDefault().post(new CustomEvent(eventItem));
```
getDefault() trả về một instance của EventBus
chuyển event đến đối tượng đã đăng kí (subscriber) một đối tượn CustomEvent
Bước 5: Hủy lắng nghe sự kiện eventBus.unregister(this);

###  Subscriber
 đc thể hiện thông qua annotation @subscribe
```javascript
 @Subscribe 
public void OnCustomEvent(CustomEvent event) {
 CustomItem eventItem = event.eventItem; 
}
```
  
Một subscriber đơn gianr là theo dõi một sự kiện bằng cách đăng kí với event bus và nó cũng có thể hủy bỏ đăng kí lắng nghe sự kiện đó. Để trở thành subscriber, bạn phải thực hiện 3 việc chính sau :
Đăng kí subscriber trong event bus với hàm register(). Nó sẽ xác nhận với EventBus rằng bạn muốn lắng nghe các sự kiện. Trong một Activity, bạn sẽ gọi trong onStart(), trong khi ở fragment, bạn sẽ gọi nó trong onAttact(Activity activity) : 
```javascript
@Override
public void onStart() {
    super.onStart();
    EventBus.getDefault().register(this);
}
```
Hủy đăng kí subcriber, có nghĩa là nói với EventBus ngưng gửi cho mình các sự kiện bằng cách gọi hàm unregister(). Trong Activity bạn sẽ gọi trong onStop(), còn trong fragment sẽ gọi trong hàm onDetach() :  
```javascript
@Override
public void onStop() {
    super.onStop();
    EventBus.getDefault().unregister(this);
}
```
Implement lại hàm onEvent() để xác định loại event bạn muốn nhận và kiểu action khi nhận được.
```javascript
@Subscribe
public void onEvent(MessageEvent event) {
     Toast.makeText(this, "Hey, my message" + event.getMessage(), Toast.LENGTH_SHORT).show();.
}
```  

### Event Messages
Các sự kiện trong greenbot EventBus chỉ đơn gianr là các đối tượng do bạn định nghĩa. Bạn có thể định nghĩa các sự kiện khác nhau nếu bạn muốn. Chúng ko cần kế thừa từ lớp nào mà chỉ đơn gianr là POJO (Plain Old Java Objects).  
```javascript
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
###  Post Event and Post Sticky Event
Sự khác biệt chính giữa PostEvent và PostStickyEvent là cơ chế bộ nhớ đệm sử dụng bên trong EvenBus.

Khi một thành phần nào đó post một sticky event, event này sẽ được lưu lại trong bộ nhớ đệm. Khi một Activity mới hoặc một Fragment mới theo dõi sự kiện, EventBus sẽ lấy ra sticky event gần đây nhất trong bộ nhớ đệm thay vì thực hiện lại đăng kí một event mới, cho nên event này vẫn nằm trong bộ nhớ đệm sau khi subcriber đã nhận được nó.

Sticky event được gửi đi với phương thức postSticky(MessageEvent) và non-sticky event được gửi đi với phương thức post(MessageEvent) :  
```javascript
EventBus.getDefault().postSticky(new MessageEvent("Hey event subscriber!"));
EventBus.getDefault().post(new MessageEvent("Hey event subscriber!"));
```
  Đối với một sự kiện thường xuyên, non-sticky event, nếu không có subriber được tìm thấy, sự kiện này sẽ được bỏ đi. Một sticky event sẽ được lưu trữ, tuy nhiên, trong trường hợp một subcriber đến cùng sau.

Vì vậy, khi nào bạn quyết định sử dụng sticky event? Bạn có thể làm điều này nếu bạn đang theo dõi vị trí của người dùng, hoặc cho bộ nhớ đệm dữ liệu đơn giản, theo dõi mức độ pin, vv ...
```javascript
EventBus.getDefault().postSticky(new LocationReceivedEvent(6.4531, 3.3958))
```
  
###  Theo dõi một Sticky Event 
  ```javascript
// UI updates must run on MainThread
@ Subscribe(sticky = true, threadMode = ThreadMode.MAIN)
public void onEvent(MessageEvent event) {
    textField.setText(event.getMessage());
}
```
 Để theo dõi một sticky event, bạn thêm sticky = true bên trong the @Subscribe. Nó chỉ ra rằng bạn muốn nhận một sticky event của MessageEvent từ bộ nhớ đệm.

### Xóa bỏ một Sticky Event
```javascript
LocationReceivedEvent locationReceivedStickyEvent = EventBus.getDefault().getStickyEvent(LocationReceived.class);
if(stickyEvent != null) {
    EventBus.getDefault().removeStickyEvent(locationReceivedStickyEvent);
}
```

## Tài liệu tham khảo 
http://greenrobot.org/eventbus/  
https://medium.com/@vatsalbajpai/eventbus-for-android-4afa17863884