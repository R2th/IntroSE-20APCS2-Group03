Chào mừng các bạn đã trở lại với phần 3 của seri về Android Architecture Components và áp dụng nó với Firebase Realtime Database. Trong [Phần 1](https://viblo.asia/p/su-dung-android-architecture-components-ap-dung-vao-firebase-realtime-database-phan-1-63vKjnzRK2R) , chúng ta đã làm quen với 1 Activity đơn giản mà nó sử dụng  database listeners để thực hiện việc cập nhật UI.Chúng ta đã chuyển đổi chúng để sử dụng với LiveData và ViewModel để loại bỏ listener rắc rối không cần thiết. Ở [Phần 2](https://viblo.asia/p/su-dung-android-architecture-components-ap-dung-vao-firebase-realtime-database-phan-2-Qbq5QWQLZD8), chúng ta  đã hoàn thành việc chuyển toàn bộ những thứ làm việc với Realtime Database ra khỏi Activity và nâng cao hiệu suất làm việc của nó. Sự tối ưu này sử dụng *MediatorLiveData* và kết hợp với multi thread.
Có thêm một cách tối ưu mà có thể áp dụng trong code. Nó có thể ảnh hướng lớn đến performent, phụ thuộc vào lượng listener mà database của bạn nhận.  Nó có liên quan đến cách triển khai FirebaseQueryLiveData của chúng tôi xử lý với trình lắng nghe cơ sở dữ liệu trong các phương thức onActive () và onInactive () của nó:
```
public class FirebaseQueryLiveData extends LiveData<DataSnapshot> {
    private static final String LOG_TAG = "FirebaseQueryLiveData";

    private final Query query;
    private final MyValueEventListener listener = new MyValueEventListener();

    public FirebaseQueryLiveData(Query query) {
        this.query = query;
    }

    public FirebaseQueryLiveData(DatabaseReference ref) {
        this.query = ref;
    }

    @Override
    protected void onActive() {
        query.addValueEventListener(listener);
    }

    @Override
    protected void onInactive() {
        query.removeEventListener(listener);
    }

    private class MyValueEventListener implements ValueEventListener {
        @Override
        public void onDataChange(DataSnapshot dataSnapshot) {
            setValue(dataSnapshot);
        }

        @Override
        public void onCancelled(DatabaseError databaseError) {
            Log.e(LOG_TAG, "Can't listen to query " + query, databaseError.toException());
        }
    }
}
```
 Key cần lưu ý ở đây là database listener được thêm khi *onActive()* và remove khi *onInactive()* . Activity sử dụng *FirebaseQueryLiveData*  thực thi mã này tại *onCreate()* :
 ````
 HotStockViewModel viewModel = ViewModelProviders.of(this).get(HotStockViewModel.class);
LiveData<DataSnapshot> liveData = viewModel.getDataSnapshotLiveData();

liveData.observe(this, new Observer<DataSnapshot>() {
    @Override
    public void onChanged(@Nullable DataSnapshot dataSnapshot) {
        if (dataSnapshot != null) {
            // update the UI here with values in the snapshot
        }
    }
});
 ````
Observer ở đây theo dõi vòng đời của Activity. *LiveData*  xem xét Observer ở trạng thái hoạt đồng nếu vòng đời của nó [STARTED](https://developer.android.com/reference/android/arch/lifecycle/Lifecycle.State.html#STARTED) hoặc [RESUMED](https://developer.android.com/reference/android/arch/lifecycle/Lifecycle.State.html#RESUMED). Observer chuyển sang trạng thái inactive nếu vòng đời của nó rơi vào [DESTROYED](https://developer.android.com/reference/android/arch/lifecycle/Lifecycle.State.html#DESTROYED). Hàm *onActive()* được gọi khi  *LiveData* object có ít nhất 1 active observers và *onInactive()* được gọi khi *LiveData* không có 1 observers active nào. Vì vậy điều gì sẽ xảy ra khi Activity chạy sau đó rơi vào [configuration change](https://developer.android.com/guide/topics/resources/runtime-changes.html) (Ví dụ như bạn xoay màn hình)? Thứ tự các sự kiện sẽ giống như sau:
1. Activity started
 2. Live Data được observed và gọi hàm *onActive()*
 3. **Database listener đc thêm**
 4. Nhận data và update UI
 5. Xoay thiết bị , activity rơi vào destroy
 6. LiveData unobserved và hàm *onInactive()* được gọi
 7. **Database listener bị remove**
 8.  Activity mới started
 9.  LiveData lại dc observe , và gọi *onActive()* 
 10.  **Database listener đc add**
 11.  Nhận dữ liệu và cập nhật UI
 
 Tôi đã bôi đậm các bước trên. Như bạn thấy đó, khi configuration change thì listener sẽ vị xóa đi và add lại, điều đó gây ra sự mất chi phí cho việc kéo lại dữ liệu về.
 
###  Làm sao để tránh những truy cấn không cần thiết?
Sẽ không dễ dàng để thay đổi cách mà LiveData trở thành active hay inactive, nhưng chúng ta có thế  đoán một số trạng thái có thể thay đổi nhanh như thế nào khi Activity xảy ra configuration change . Thử giả định 1 configuration change  diễn ra không qua 2s, với việc đó ta có một chiến thuật đó là có thể add delay trước khi FirebaseQueryLiveData remove listener sau khi gọi hàm onInactive(). dưới đây là cách implement đó: 
````
private boolean listenerRemovePending = false;
private final Handler handler = new Handler();
private final Runnable removeListener = new Runnable() {
    @Override
    public void run() {
        query.removeEventListener(listener);
        listenerRemovePending = false;
    }
};

@Override
protected void onActive() {
    if (listenerRemovePending) {
        handler.removeCallbacks(removeListener);
    }
    else {
        query.addValueEventListener(listener);
    }
    listenerRemovePending = false;
}

@Override
protected void onInactive() {
    // Listener removal is schedule on a two second delay
    handler.postDelayed(removeListener, 2000);
    listenerRemovePending = true;
}
````
Ở đây, tối sử dụng **Handler** để delay việc xóa listener sau 2 s, sau khi LiveData inactive. Nếu LiveData rơi vào activive trong khoản thời gian 2s đó thì listener sẽ không bị remove, như vậy sẽ cho phép ta keep đc listener.
Trên đây là những chia sẽ và mẹ để ta làm việc với Firebase Realtime Database hiệu quả hơn. Và tôi cũng xin khép lại seri này ở đây. Hẹn gặp lại các bạn trong một loạt bài khác với nhiều kiến thức bổ ích hơn. Xin chào và hẹn gặp lại

Tham khảo
- [Using Android Architecture Components with Firebase Realtime ](https://firebase.googleblog.com/2017/12/using-android-architecture-components_22.html)

- [Android Architecture Components](https://developer.android.com/topic/libraries/architecture/)