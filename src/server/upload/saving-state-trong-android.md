# I, Lời nói đầu
* Xin chào mọi người, hôm nay mình xin chia sẻ 1 vấn đề mà mọi người rất quen thuộc: *saving state* trong Android.
* Android architecture compoent ra đời cùng với Lifecycle (ViewModel, LiveData), mọi người sẽ thường store data và restore data trong hầu hết các case xảy ra với app của mình. 
* Nhưng liệu quan điểm có thực sự đúng ? Còn những nguy cơ nào còn có thể xảy để chúng ta có thể handle tất cả các trường hợp ?

# 2, Saving state
* Có thể mọi người đã biết rằng Activity và Fragment sẽ bị destroy bởi 1 trong 3 cách sau:
* **1, User điều hướng để kết thúc vĩnh viễn**: user nhấn back button hoặc có 1 lời gọi *finish()*. Trong trường hợp này, Activity và Fragment sẽ bị finish và không được recreate lại bởi Android system.
* **2, Configuration change**: Hay xảy ra nhất đó chính là khi *rotate screen*. Ngoài ra, *change language* hay *keyboard* cũng là những nguyên nhân tạo ra configuration change. Trong trường hợp này, Android system sẽ tự động recreate lại Activity hay Fragment đó.
* **3, App của bạn bị put xuống dưới background và process của App bị kill**: Trường hợp này thường chúng ta không để ý tới nhưng nó luôn là 1 nguy cơ tiềm tàng. Khi device cần thêm memory thì nó sẽ cần giải phóng memory hiện đang không dùng tới, nếu app đang ở trong background (*onStop()*) thì priority của Process của app sẽ bị giảm xuống. Activity và Fragment trong trường hợp này cũng sẽ bị finish nhưng khi bạn back lại app thì activity sẽ được recreate lại. Thường trong trường hợp này người dùng cũng như newbie sẽ không chú ý tới nhưng sau phía dưới thực sự đã diễn ra 1 quá trình finish và recreate lại Activity và Fragment của bạn.
![](https://images.viblo.asia/8c96e6d3-d445-4424-b17f-e3db6d184c5c.png)
* Trong trường hợp thứ 2 và thứ 3, Android system sẽ recreate lại Activity. 
* Trong  trường hợp thứ 2, ViewModel sẽ chỉ giúp cho bạn saving state trong mà thôi bởi vì trong trường hợp này Activity sẽ chỉ bị chạy onDestroy() chứ không bị finish. Nghĩa là ViewModel trong trường hợp này vẫn sống nhăn răng :sweat_smile:.
* Trong trường hợp thứ 3, Activity chạy vào *onDestroy()* và đồng thời nó cũng sẽ bị finish do đó ViewModel cũng sẽ bị clear luôn :joy:. Tức là trong trường hợp này chúng ta sẽ không thể sử dụng được ViewModel. Giải pháp của chúng ta sẽ là sử dụng *onSaveInstanceState()* hoặc mới hơn sẽ là [ViewModel Saved State module](https://developer.android.com/topic/libraries/architecture/viewmodel-savedstate).
![](https://images.viblo.asia/f3a99c7b-0fd0-43a7-a939-8812ea6c9d0c.png)
* Bảng bên dưới sẽ giải thích những gì mình nói phía trên:
![](https://images.viblo.asia/124684e0-9d2f-4b3e-b675-3118715f4bbd.png)
# 3, ViewModel Saved State module vs onSaveInstanceState()
* **onSaveInstanceState()** là callback để lưu trữ UI data được sử dụng trong 2 trường hợp:
* 1, App ở trong background làm cho process của app bị giảm mức priority: process death.
* 2, Configuration change.
* onSaveInstanceState() được gọi trong trường hợp Activity chạy *onStop()* không phải là *finish()*.
* Hơn nữa, onSaveInstanceState() chỉ được design để store data nhỏ như String, Int chứ không phải là những data phức tạp  như: Bitmap... bởi vì nó yêu cầu serialization và deserialization và 2 quá trình này rất tốn memory và cũng rất chậm.
* **ViewModel Saved State Module** cũng giúp chúng ta giải quyết vấn đề: process death. Với công cụ này tất cả sẽ được sử lý chỉ ở trong ViewModel và không còn phải liên quan tới Activity nữa. Và giờ ViewModel đã thực sự xử lý và lưu trữ tất cả các data liên quan tới UI.
* ViewModel Saved State Module sử dụng *SavedStateHandle*. Bất kể data nào bạn phải store ở trong onSaveInstanceState() giờ có thể hoàn toàn chuyển sang SavedStateHandle.

# 4, Tổng kết
* Hi vọng bài viết có thể giúp mọi người xử lý tốt hơn trong trường hợp yêu cầu saving state.
* Một số link tham khảo cho mọi người:
* [Android developer: Proccess and Application Lifecycle](https://developer.android.com/guide/components/activities/process-lifecycle).
* [Android developer: Saving Sates](https://developer.android.com/topic/libraries/architecture/saving-states).
* [Android developer: Saved State module for ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel-savedstate).
* [Medium: VIewModels with Saved State, Jetpack Navigation, Data Binding and Coroutines](https://medium.com/androiddevelopers/viewmodels-with-saved-state-jetpack-navigation-data-binding-and-coroutines-df476b78144e).
* Happy coding :ok_hand:.