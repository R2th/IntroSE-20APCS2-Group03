# Giới thiệu
 
![](https://i.imgur.com/Mo2CG7l.png)

Android Architecture Components là 1 bộ thư viện giúp bạn thiết kế code mạch lạc, dễ test, và dễ maintain.

Lợi ích của Android Architecture Components:

* Quản lý vòng đời ứng dụng của bạn dễ dàng hơn. Với [LifeCycle](https://developer.android.com/reference/android/arch/lifecycle/Lifecycle) giúp bạn quản lý vòng đời của activity và fragment. Giúp giữ lại trạng thái cấu hình, tránh bị lack bộ nhớ và dễ dàng hiển thị dữ liệu lên giao diện.
* Sử dụng [LiveData](https://developer.android.com/topic/libraries/architecture/livedata) để xây dựng object có thể thông báo cho UI khi database thay đổi
* [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel) để lưu giữ UI khi app quay ngang/dọc màn hình

# 1. [LifeCycle](https://developer.android.com/reference/android/arch/lifecycle/Lifecycle)
[LifeCycle](https://developer.android.com/reference/android/arch/lifecycle/Lifecycle) là 1 abstract class dùng để quản lý vòng đời của ứng dụng Android; Lifecycle có thể theo dõi trạng thái vòng đời của ứng dụng và đưa ra những event phù hợp. Để theo dõi được trạng thái vòng đời ta có 2 biểu diễn kiểu Enum sau:

## a) Event

Khi có bất kỳ vòng đời nào của ứng dụng có thay đổi thì sự kiện của Lifecycle sẽ được gọi đến; thông qua khai báo dạng `Annotation` của method

bạn xem qua ví dụ sau:

```java
@OnLifecycleEvent(ON_STOP)
```
Hoặc có thể khai báo nhiều loại vòng đời cho 1 method
```java
@OnLifecycleEvent({ON_STOP, ON_START})
```
Với kiểu [Lifecycle.Event](https://developer.android.com/reference/android/arch/lifecycle/Lifecycle.Event) thì bạn có 1 param thứ 2 để xác định loại vòng đời nào được gọi đến
```java
class TestObserver implements LifecycleObserver {
   @OnLifecycleEvent(ON_CREATE)
   void onCreated(LifecycleOwner source) {}
   @OnLifecycleEvent(ON_ANY)
   void onAny(LifecycleOwner source, Event event) {}
 }
```

Xét vòng đời của [Activity](https://developer.android.com/guide/components/activities/activity-lifecycle#alc) và [Fragment](https://developer.android.com/guide/components/fragments#Creating)

![](https://images.viblo.asia/d518d23d-4540-4c4d-b34a-150097c3c164.png)

![](https://images.viblo.asia/c40cb7aa-1295-4e34-8e5c-5456285b4db0.png)

Trong khi vòng đời của [Activity](https://developer.android.com/guide/components/activities/activity-lifecycle#alc) và [Fragment](https://developer.android.com/guide/components/fragments#Creating) là khá nhiều nhưng LifeCycle.Event chỉ cung cấp cho chúng ta 7 loại như sau:

(1) ON_ANY

(2) ON_CREATE

(3) ON_DESTROY

(4) ON_PAUSE

(5) ON_RESUME

(6) ON_START

(7) ON_STOP

Với 7 loại này thì cũng đủ để anh em developer có khả năng xử lý vòng đời của views và các thành phần khác dễ dàng và linh hoạt hơn.

## b) State

Trạng thái vòng đời bản chất là thời điểm giữa 2 sự kiện của vòng đời ứng dụng. Nói có vẻ khó hiểu vậy tôi xin phép trình bày dưới dạng hình vẽ để dễ hiểu hơn

![](https://i.imgur.com/SG3RRHQ.png)

Từ hình vẽ ta nêu được khái niệm các trạng thái như sau:

(1) INITIALIZED - là trạng thái khởi tạo; là thời điểm trước khi gọi ON_CREATE

(2) CREATED - là trạng thái sau ON_CREATE - trước ON_START và sau ON_STOP - trước ON_DESTROY

(3) STARTED - là trạng thái sau ON_START - trước ON_RESUME và sau ON_PAUSE - trước ON_STOP

(4) RESUMED - là trạng thái sau ON_RESUME

(5) DESTROYED - là trạng thái sau ON_DESTROY

Sau đây bạn xem hình vẽ dưới đây để hiểu rõ hơn về LifeCycle, State và Event hoạt động và kết hợp với nhau như thế nào

![](https://i.imgur.com/b7wrM3m.png)

Trong hình vẽ này có 2 method chính của LifeCycle cần quan tâm:

* addObserver()  - thêm 1 Observer để thông báo bất kỳ lúc nào khi [LifecycleOwner](https://developer.android.com/reference/android/arch/lifecycle/LifecycleOwner) thay đổi trạng thái. Ví dụ nếu Lifecycle hiện tại là `RESUMED` thì Observer sẽ được nhận sự kiện ON_CREATE, ON_START và ON_RESUME.
* removeObserver()  - khi gọi method này là bạn đã hủy observer khỏi Lifecycle. Từ đây Observer sẽ không nhận bất kỳ sự kiện nào nữa. 

# 2. [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel)
ViewModel là object lưu giữ data cho UI components và luôn được giữ nguyên ngay cả khi thay đổi các cấu hình (như quay màn hình, ...). Điều đó có nghĩa là activity hay fragment không cần phải chịu trách nhiệm cho việc giữ trạng thái nữa; mà thay vào đó ViewModel sẽ chịu trách nhiệm phần này. 

![](https://i.imgur.com/n3bmMCF.png)

Khi ViewModel không còn được sử dụng nữa thì method `onCleared` sẽ được gọi để dọn dẹp trước khi nó bị hủy đi.


Để khai báo ViewModel ta làm như sau:

```java
public class MyViewModel: ViewModel {
    private val users: LiveData<List<String>> =     
        MutableLiveData<List<String>>()

    fun getUsers(): LiveData<List<String>> {
        if (users.value == null) loadUsers()
        return users
    }

    private fun loadUsers() {
        // do async operation to fetch users
    }
}
```
# 3. [LiveData](https://developer.android.com/topic/libraries/architecture/livedata)
LiveData là 1 Observer, nó có thể thông báo ngay lập tức khi có sự thay đổi về data. Do đó bạn có thể update UI hoặc làm 1 số tác vụ khác cần thiết khi dữ liệu thay đổi. Ngoài ra LiveData có thể nhận biết được lifecycle khi nào thay đổi

![](https://i.imgur.com/rVCTJnW.png)

Khai báo LiveData như sau:
```Java
MutableLiveData<String> dayOfWeek = new MutableLiveData<>();
dayOfWeek.observer(this, data -> {
    mTextView.setText(dayOfWeek.getValue() + "is a good day for a hike");
    });
```

Xét trường hợp data ban đầu là "Thursday"
![](https://images.viblo.asia/ce6394fe-3e59-44f9-8a35-9effb9a9d813.png)

Vậy khi thay đổi giá trị thì giao diện sẽ thành

```java
dayOfWeek.setValue("Friday");
```

![](https://images.viblo.asia/c475b996-920c-4c16-9481-4ae9838a1456.png)

# Tài liệu tham khảo
1. https://medium.com/exploring-android/exploring-the-new-android-architecture-components-c33b15d89c23

2. https://developer.android.com/topic/libraries/architecture/