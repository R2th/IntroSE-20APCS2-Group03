### EventBus : Sự kiện cho Android
EventBus là open-source thử viện cho Android và Java trong việc sử dụng mẫu Publisher/Subscriber. EventBus trung tâm kết nối giữa các lớp độc lập chỉ với một ít dòng code đơn giản, bỏ đi sự phụ thuộc và  cái thiện tốc độ

![](https://images.viblo.asia/11e78ed2-fdcf-48dd-aeba-a17fcfc8992e.png)

**Lợi ích của việc dùng  EventBus:**

* Đơn giản trong việc giao tiếp giữa các Component
* Tách biệt trong việc nhận và gửi
* Chạy tối với UI (Activities , Fragments) và backgound threads
* Tránh phức tạp và lỗi thường gặp về phụ thuộc và các vẫn đề về vòng đời
* Hiệu suất cao
* Được chứng minh với hơn 100,000,000 ứng dụng đã sử dụng
* Có những chức năng nâng cao như phân phối tới thread , và mức độ ưu tiên của  Subscriber

**EventBus**

Bây giờ chúng ta bắt đầu học về EventBus, thêm thư viện vào trong Gradle Dependency

`compile 'org.greenrobot:eventbus:3.0.0'`

**EventBus** là thư viện android bởi **GreenRobot**. Cùng hiểu nó có lợi ích và giúp chúng ta như thế nào. Đây là 3 thứ cơ bản mà bạn nên biết để sử dụng nó.

### 1. Gọi POST
Phương thức POST kích hoạt Event với đối tượng dữ liệu mà bạn muốn chia sẽ . Dưới đây là code ví dụ : 

`EventBus.getDefault().post(new CustomEvent(eventItem));`

Giờ bạn đặt câu hỏi nó chỉ có 1 dòng thôi sao, vậy đã xong hay chưa. Với mình thì đó là đã xong rồi.
Và bạn có thể gọi nó từ bất cứ nơi nào à? Đúng , Như code trên  bạn thông báo rằng getDefault() là  phương thức Static .Ví thế chúng ta không cần bất kì **Context** nào cả. Và giờ mình nghĩ các bạn cũng có thắc mắc CustomEvent và eventItem là gì đúng không. (Bước kế tiếp, Chúng ta sẽ biết về chúng là gì ).


### 2. Lớp CustomEvent.Class
Vì vậy , ở bước trên chúng ta  đã biết làm sao để gọi phương thức POST. Chúng ta đã gặp CustomEvent. Đây là một lớp tùy chỉnh trong đó chúng ta truyền đối tượng đã yêu cầu vào.

```
public class CustomEvent { 
    
    public CustomItem eventItem;
    public CustomEvent(CustomItem eventItem) {      
    this.eventItem = eventItem;   
    }
}
```

Kết quả chúng ta đã tạo ra một lớp mới với tên CustomEvent với đối tự CustomItem và khỏi tạo để truyền giá trị vào
> Chú ý : Bạn có thể tạo nhiều đối tượng khác nhau vào trong một lớp.

### 3. Subscribe
Và tiếp tục chúng ta đã tạo phương thức POST để truyền giá trị vào lớp CustomEvent để chứa tất cả giá trị của chúng ta, nhưng bây giờ chúng ta cần nhận  giá trị đã truyền khi phương phức POST đã kích hoạt. Chúng ta cũng nhìn code phía dưới :

```
@Subscribe   
public void OnCustomEvent(CustomEvent event) {  
CustomItem eventItem = event.eventItem; 
}
```

Và chúng ta có lớp CustomEvent và chúng ta có thể lấy giá trị 1 cách dễ dàng .
Annotation @Subscribe cụ thể ở đây là hàm sẽ thực thi rằng sẽ lấy tham số có kiểu là CustomEvent. và sẽ thực thi ngày khi phương thức Post được kích hoạt

> Chú thích :  Tham số của bạn phải giống với kiểu tham số khi bạn khai báo ở POST.

Bây giờ chúng ta cần đăng kí EventBus cho Activity hiện tại hoặc fragment để có thể nhận sự kiện

```
@Override    
public void onStart() {        
    super.onStart();    
    if (!EventBus.getDefault().isRegistered(this))
         EventBus.getDefault().register(this);    
}     
@Override    
public void onDestroy() {        
    super.onDestroy();
    EventBus.getDefault().unregister(this);    
}
```

Bây giờ bạn có thể tạo một ứng dụng với EventBus một cách đơn giản và nó giúp các nhà phát triển một cách rõ rằng hơn về việc xử lý chia sẽ dữ liệu.
Cám ơn các bạn đã xem qua bài viết này.

Bạn có thể tải source từ đây : https://github.com/haiminhtran810/demoeventbus.git

Tài liệu tham  khảo :  
https://medium.com/@vatsalbajpai/eventbus-for-android-4afa17863884

http://greenrobot.org/eventbus/