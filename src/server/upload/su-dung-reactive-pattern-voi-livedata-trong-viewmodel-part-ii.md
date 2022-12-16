# I, Giới thiệu
* Xin chào mọi người lại là mình đây. Ở bài viết lần trước, mình đã trình bày phần I của việc sử dụng reactive pattern của LiveData trong ViewModel. 
* Tưởng chừng như việc xử dụng LiveData sẽ rất đơn giản nhưng nó cũng sẽ có những bẫy mà chúng ta không ngờ tới. 
* Hiểu rõ và kỹ lưỡng cách sẽ giúp chúng ta implement 1 cách hoàn chỉnh và chính xác nhất.
* Ở phần tiếp theo này, mình sẽ đưa ra các lỗi hay xảy ra khi xử dụng LiveData.

# II. Nội dung
1. **Khi nào không nên sử dụng LiveData ?**
* Việc sử dụng LiveData là rất tốt bởi các thành phần của app được bound với nhau và tận dụng được lợi thế Lifecycle-aware.
* Nhưng hãy cẩn thận không phải trường hợp nào bạn cũng áp dụng LiveData. 
* **Lời khuyên**: Nếu 1 thành phần của app không kết nối với UI, bạn không nên sử dụng LiveData.
* **Ví dụ**: Trong app, bạn có 2 thành phần: **User Manager** và **Token Uploader**. **User Manager** sinh ra 1 token để upload lên server.

![](https://images.viblo.asia/4c7ca98f-b863-4f8c-bd7c-ad23afc66b53.png)
* Câu hỏi đặt ra là nếu **Token Uploader** quan sát (observe) **User Manager** thì **LifecycleOwner** (**LifecycleOwner** được truyền vào **onChange()** method) sẽ là đối tượng nào ?
* Chức năng upload token này không liên qua tới View.
* Hơn thế nữa, nếu bạn cho **LifecycleOwner** trong View, thì khi View không ở trạng thái active, token có thể sẽ không được upload.
* **Giải pháp 1**: Nếu observe không được, bạn có thể sử dụng **observeForever()** (nhận mọi event và sẽ không tự động bị remove) ở **Token Uploader**. Dựa vào Lifecycle trong **User Manager** mà bạn có thể remove việc observe khi token được upload. Giải pháp này có thể là 1 cách giải quyết nhưng chúng ta không cần thiết phải làm như vậy. 
* **Giải pháp 2**: Đơn giản chúng ta chỉ cần để **User Manager** tác động **Token Uploader** upload token 1 cách trưc tiếp.

![](https://images.viblo.asia/b09b679e-d20f-444a-901f-3e91baa69a23.png)

2. **Antipattern: sharing instances of LiveData**

* Khi 1 class hiển thị LiveData cho 1 class khác, hãy suy nghĩ cẩn thận rằng bạn muốn hiển thị cùng 1 instance hay nhiều instance.
* Ví dụ: 

![](https://images.viblo.asia/859adff0-05b3-4fb2-ab07-296ba014e47f.png)
* Nếu **SharedLiveDataSource** là singleton class, có phải luôn luôn chỉ có 1 instance của **result** không ?
* Câu trả lời là không. Có những trường hợp sẽ cho ra nhiều instance của result.

![](https://images.viblo.asia/f13fe4d0-043e-4c25-9818-6285bae035e8.png)
![](https://images.viblo.asia/4bc7a7fc-99c1-4d8b-9b68-dd462ae20c9c.png)
* Gọi 2 phương thức trên bạn sẽ gặp phải lỗi. Observer (userId = 1) có thể nhận update với data thuộc về userId = 2. Do 2 method đều chỉ update cùng 1 instance của result. 
3. **Mediator smell: adding sources outside initialization**

* Sử dụng observer pattern là an toàn hơn việc bạn giữ reference của View ( cái mà MVP vẫn còn trong MVP).
* Tuy nhiên vẫn có trường hợp có thể gây leak:
![](https://images.viblo.asia/92a0c426-a153-4431-8793-9de8abf0e231.png)
* Mỗi lần bạn gọi **addSource()** method, bạn lại thêm 1 **source** vào trong **destination**. 
* Nhưng những source đã không còn được sử dụng không bị remove đi dẫn đến leak bộ nhớ.
* **Chú ý**: Transformation.switchMap sẽ thêm 1 source và tự động remove source cũ khi thêm source mới nên các bạn không phải lo lắng về việc leak bộ nhớ.
4. **Transformation smell: Transformation outside initilization**
![](https://images.viblo.asia/d5f51de6-4fa8-4a46-b46e-85ee583d939b.png)
* **Tranforamtion.map** và **Transformation.switchMap** tạo ra 1 instance của **randomNumber** mỗi lần gọi.
![](https://images.viblo.asia/d653ede3-5624-4332-aa4d-72ec12fa0b08.png)
* Nếu việc theo dõi xảy ra ở **onCreate()** của View, sau đó mỗi lần gọi **onGetNumber()** lại sinh ra 1 instance mới của **randomNumber** thì hàm việc observer ở **onCreate()** sẽ không còn ý nghĩa nữa.
* **Kết luận**: Không khai bào **LiveData** bằng biến **var**. Sử dụng **Transformation** operation ở bước khởi tạo.
6. **Giải pháp: Sử dụng Transformatio ở bước khởi tạo**

![](https://images.viblo.asia/4a4dd5a8-4007-44bd-b3b1-abe74b0abf9c.png)
# III, Kết luận
* Những sai lầm trên chúng ta rất có thể mắc phải mà không để ý. 
* Hi vọng bài viết giúp được mọi người trong việc sử dụng LiveData, ViewModel cùng với mô hình MVVM.
### Happy coding