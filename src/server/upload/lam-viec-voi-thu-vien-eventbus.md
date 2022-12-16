# 1. EventBus là gì
![Screen Shot 2021-07-18 at 9.40.40 PM.png](https://images.viblo.asia/99dcc407-2dcc-4598-b0e6-b6eb0ef3b275.png)
EventBus là một thư viện mã nguồn mở của Android giúp đơn giản hóa việc giao tiếp giữa các Activity, Fragment, Thread, Services, với ít code hơn. Khi muốn phát triển một ứng dụng Android, chúng ta cần quản lý rất nhiều thông tin liên lạc giữa các thành phần Android, điều này đôi khi trở nên rất khó quản lý. Thư viện EventBus làm cho nhiệm vụ này trở nên dễ dàng.

# 2. Lý do chọn Event Bus
*  Đơn giản hóa giao tiếp giữa các thành phần.
    *  Tách publisher và scripber
    *  Hoạt động tốt với Hoạt động, Phân đoạn và chuỗi nền
* Tránh sự phụ thuộc phức tạp và dễ xảy ra lỗi cũng như các vấn đề về vòng đời.
* Làm cho code đơn giản hơn.
* Nhanh.
* Được chứng minh trong thực tế bởi các ứng dụng có hơn 1.000.000.000 lượt cài đặt
* Có các tính năng nâng cao như chuỗi phân phối, mức độ ưu tiên của người đăng ký, v.v.

# 3. Các bước cài đặt 
## Thêm thư viện eventbus
```
 implementation 'org.greenrobot:eventbus:3.2.0'
```
## Định nghĩa Event:
```
public static class MessageEvent {  }
```
## Xác định Subscriber: 
Ở đây mình sẽ tạo một data class Person để truyền data từ publisher đến subcriber
```
data class Person(var name: String)
```
Sau đó chọn một Activity hoặc Fragment để khai annotation Subscriber.
```
@Subscribe(threadMode = ThreadMode.MAIN)
    fun OnCustomEvent(person: Person) {
        tvName.text = person.name
    }
```

Một Subscriber đơn giản chỉ là nơi lắng nghe sự bằng cách đăng ký với EventBus.

## Register và unregister nơi mà bạn subscriber (Activity, Fragment).
 Việc xử lý này thường đi theo vòng đời của Activity hoặc Fragment. Lưu ý quan trọng là @Subscribe ở đâu thì sẽ Register và Unregister ở đó nhé.
 ```
  @Override
 public void onStart() {
     super.onStart();
     EventBus.getDefault().register(this);
 }

 @Override
 public void onStop() {
     super.onStop();
     EventBus.getDefault().unregister(this);
 }
 ```
 
##  Truyền dữ liệu từ Publisher
Ở một Activity/Fragment khác sẽ đảm nhiệm là một Publisher post một data thông qua EventBus, khi đó những Activity/Fragment đã đăng ký sự kiện sẽ lắng nghe và xử lý data ở đó.
```
EventBus.getDefault().post(Person("Army"));
```
getDefault() trả về một instance của EventBus chuyển event đến đối tượng đã đăng kí (subscriber) một đối tượng Person("Army").

# 4. Phân biệt Event Post và Event Post Sticky
###  Đối với Post:
Bạn có thể gửi một event từ bất kì trong code của bạn và có thể nhận thông báo ở những nơi đã đăng ký nhận event trước khi một Activity/Fragment truyền data từ Post.

### Đối với Post Sticky
Cũng giống như Post là bạn cũng có thể gửi event đến bất kì đâu nhưng khác ở chỗ là loại event này được lưu trong cache nên đối với những Activity/Fragment chưa đăng ký nhận thông báo trước đó vẫn có thể nhận được giá trị.

### Cách sử dụng Post Sticky:
Đối với publisher:
```
EventBus.getDefault().postSticky(Person("Army"))
```

Đối với Subscriber:
```
@Subscribe(sticky = true)
public void OnUser(person : Person){
    //Xử lý data ở đây.
}
```

Cảm ơn các bạn đã theo dõi bài viết :heart_eyes::heart_eyes:

# Tham khảo

> https://greenrobot.org/eventbus/