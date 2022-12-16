# Giới thiệu
Ở phần trước mình đã giới thiệu về các kiểu query trong objectbox, ObjectBox thực sự là một thư viện rất mạnh mẽ với hơn 1300 hàm truy vấn, bên cạnh đó ObjextBox còn tích hợp với những library mạnh mẽ khác hôm nay chúng ta sẽ tiếp tục tìm hiểu về các tính năng nâng cao của objectbox đồng thời thực nghiệm so sáng với Room Database xem thử thật sự tốc độ của nó có nhanh hơn 10X so với các cơ sở dữ liệu khác không nhé
# Data Observers and Reactive Extensions
ObjectBox giúp ứng dụng của bạn dễ dàng theo dõi và xử lý các luồng dữ liệu khi có sự thay thông qua các thành phần
* data observers,
* reactive extensions,
* and an optional library to work with RxJava.

**EX**
```
Query<Task> query = taskBox.query().equal(Task_.complete, false).build();
query.subscribe(subscriptions)
     .on(AndroidScheduler.mainThread())
     .observer(data -> updateUi(data));
```
**Observing General Changes**
BoxStore cho phép đăng ký các loại đối tượng. Giả sử bạn muốn quan sát các đối tượng cho một ứng dụng danh sách task phải làm:DataObserverTask
```
DataObserver<Class> taskObserver = ...;
boxStore.subscribe(Task.class).observer(taskObserver);
```
ObjectBox sẽ gọi `taskObserver.onData(Task.class)` để thông báo cho bạn về những thay đổi

**Observing Queries**
```
Query<Task> query = taskBox.query().equal(Task_.completed, false).build();
subscription = query.subscribe().observer(data -> updateUi(data));
```

# LiveData
LiveData là một thư viện mới trong clean android Architecture, cho phép lắng nghe sự thay đổi của luồng dữ liệu, ObjextBox cũng tích hợp với livedata
```
public class NoteViewModel extends ViewModel {
​
    private ObjectBoxLiveData<Note> noteLiveData;
​
    public ObjectBoxLiveData<Note> getNoteLiveData(Box<Note> notesBox) {
        if (noteLiveData == null) {
            // query all notes, sorted a-z by their text
            noteLiveData = new ObjectBoxLiveData<>(notesBox.query().order(Note_.text).build());
        }
        return noteLiveData;
    }
}
```
```
NoteViewModel model = ViewModelProviders.of(this).get(NoteViewModel.class);
model.getNoteLiveData(notesBox).observe(this, new Observer<List<Note>>() {
    @Override
    public void onChanged(@Nullable List<Note>; notes) {
        notesAdapter.setNotes(notes);
    }
});
```
Khi có sự thay đổi về dữ liệu hàm onChanged sẽ được gọi và chúng ta có thể update UI
# Compare with Room
Để so sánh với Room mình sẽ viết một đoạn mã input và get 1.000.000 object ở cả 2 thư viện và so sánh thời gian thực thi của 2 thư hiện như thế nào

**ObjectBox**
```
for(int i =0; i<1000000; i++){
   User user = new User("A",15);
   users.add(user);
}
userBox.put(users);
```
**Room**
```
for(int i =0; i<1000000; i++){
   User user = new User("A",15);
   users.add(user);
}
userDatabase.userDAO().insertUsers(users);
```
**Kết quả**

Có thể thấy tốc độ của objectbox thực sự rất vượt trồi so với room
![](https://images.viblo.asia/20502488-f956-4da3-9cb1-8dab100f4c05.png)