# Mở đầu
- Gần đây, mình đã phải làm việc trong một dự án sử dụng ViewModel và Firebase cũng có những bước khá bỡ ngỡ và mất khá nhiều thời gian nên mình làm bài viết này để chia sẻ cùng mọi người về những điều này và hi vọng sẽ giúp các bạn đỡ  được một chút thời gian nào đó khi gặp các vấn đề tương tự mình.
![](https://images.viblo.asia/32d82641-af27-4131-87b3-6c49a030b407.png)

# Setup Firebase
Trong bài viết này, mình muốn nói về việc sử dụng Firebase với Architecture Components.

Ở các úng dụng đơn giản việc chúng ta sẽ quản lí các listeners ở 2 phương thức là onStart () và onStop () .
Nhưng khi phat triển ứng dụng thực tế thì data của chúng ta sẽ thay đổi theo thời  LiveData and ViewModel.
gian thực và việc listeners như ở trên thì sẽ xảy ra hiện tượng dữ liệu không được update => ảnh hưởng tới trải nghiệm người dùng .
Để giải quyết vấn đề này chúng ta sẽ sửa dụng 2 components là  **LiveData** and **ViewModel**.
 
 Trong bài viết này mình sẽ làm 1 ứng dụng để lưu string và ảnh như hình dưới đây .
![](https://images.viblo.asia/061bdd08-89f0-469e-b98d-6119ea0c22a7.png)
### 1. ViewModel

Một thành phần khác là ViewModel, là một lớp được thiết kế để chứa dữ liệu về UI và duy trì tính toàn vẹn trong quá trình thay đổi cấu hình (chẳng hạn như xoay thiết bị).

![](https://images.viblo.asia/edcd40d5-15c5-4692-a1d7-465815f2e9d2.png)

```
public class MessagesViewModel extends ViewModel {
    private List<Entity> mList = new ArrayList<>();
    private static final DatabaseReference dataRef =
         FirebaseDatabase.getInstance().getReference().child("messages");

    @NonNull
    public LiveData<List<Entity>> getMessageListLiveData(){
        FirebaseLiveData mLiveData = new FirebaseLiveData(dataRef);

        LiveData<List<Entity>> mMessageLiveData =
                Transformations.map(mLiveData, new Deserializer());
        return mMessageLiveData;
    }
```

Chúng ta sẽ tạo một view model kế thừa class ViewModel

```

private class Deserializer implements Function<DataSnapshot, List<Entity>>{

    @Override
    public List<Entity> apply(DataSnapshot dataSnapshot) {
        mList.clear();
        for(DataSnapshot snap : dataSnapshot.getChildren()){
            Entity msg = snap.getValue(Entity.class);
            mList.add(msg);
        }
        return mList;
    }
}

```


Bây giờ chúng ta sẽ sử dũng những class và phương thức ở trên trong view

Chúng ta cần gọi 

```
ViewProviders.of(getActivity()).get(MessagesViewModel.class). 
```

Nó là factory method sẽ tạo ra một instance mới của ViewModel hoặc lấy instance đã khởi tạo trước đó .

-  class MessagesListFragment.class
```

mModel = ViewModelProviders.of(getActivity()).get(MessagesViewModel.class);

LiveData<List<Entity>> liveData = mModel.getMessageListLiveData();

liveData.observe(getActivity(), (List<Entity> mEntities) -> {
    mMessageAdapter.setMessageList(mEntities);
});

```
Với cấu trúc này, chúng ta có thể truy cập và quan sát lớp ViewModel.


Một ví dụ khác , Chúng ta sẽ tạo ra 2 MutableLiveData trong  MessagesViewModel

```
private final MutableLiveData<Boolean> pictureUploadIsSuccessful = new MutableLiveData<>();
private final MutableLiveData<Boolean> messageUploadIsSuccessful = new MutableLiveData<>();


public MutableLiveData<Boolean> getPictureUploadIsSuccessful(){
    return pictureUploadIsSuccessful;
}

public MutableLiveData<Boolean> getMessageUploadIsSuccessful(){
    return messageUploadIsSuccessful;
}

```

Khi quá trình tải lên dữ liệu hoàn tất, chúng ta set nó true

```
uploadTask.addOnSuccessListener(o -> messageUploadIsSuccessful.setValue(true));
uploadTask.addOnSuccessListener(o -> pictureUploadIsSuccessful.setValue(true));

```

Quay trở lại view, CHúng ta cần update UI bằng cách quan sát phương thức trước đó theo cách tương tự.

```
mViewModel = ViewModelProviders.of(getActivity()).get(MessagesViewModel.class);

mViewModel.getPictureUploadIsSuccessful().observe(this, isSuccess -> {
    if(isSuccess){

    if(!mViewModel.getPhotoUrl().isEmpty()){
            Glide.with(mBinding.photoView.getContext())
                    .load(mViewModel.getPhotoUrl())
                    .into(mBinding.photoView);
       
 toast.makeText(getContext(),"Picture Upload successful",Toast.LENGTH_SHORT).show();
    }
    } 
      else{
        toast.makeText(getContext(),"Could not fetch the picture!",Toast.LENGTH_LONG).show();
    }
});

mViewModel.getMessageUploadIsSuccessful().observe(this, isSuccessful -> {
    if(isSuccessful && !mViewModel.getPhotoUrl().isEmpty()){
        toast.makeText(getContext(),"Message Upload successful",Toast.LENGTH_SHORT).show();
    }
});
```

### 2. LiveData

LiveData là một lớp dữ liệu dạng observable

```
public class FirebaseLiveData extends LiveData<DataSnapshot> {

private final Runnable removeListener = new Runnable() {
    @Override
    public void run() {
        query.removeEventListener(valueListener);
        listenerRemovePending = false;
    }
};

@Override
protected void onActive() {
    if (listenerRemovePending) {
        handler.removeCallbacks(removeListener);
    }
    else {
        query.addValueEventListener(valueListener);
    }
    listenerRemovePending = false;
}

@Override
protected void onInactive() {
    handler.postDelayed(removeListener, 2000);
    listenerRemovePending = true;
}
private class mValueEventListener implements ValueEventListener{

    @Override
    public void onDataChange(DataSnapshot dataSnapshot) {
        setValue(dataSnapshot);
    }

    @Override
    public void onCancelled(DatabaseError databaseError) {
        
    }
}

}
```

LiveData nhận biết vòng đời, có nghĩa là nó tôn trọng vòng đời của các thành phần ứng dụng khác, chẳng hạn như các Activity, Fragment hay Service. Nhận thức này đảm bảo LiveData chỉ cập nhật các thành phần ứng dụng đang trong trạng thái hoạt động.


Source Code: [Github](https://github.com/SinanYilmaz9/FirebaseArcComp)

Trên đây là cách mình đã áp dụng viewmodel và livedata  để làm việc với firebase . Hi vọng sau khi đọc bài viết này sẽ giúp các bạn hiểu hơn về viewmodel, live data và áp dụng nó vào project của mình dẽ dàng hơn .
# Reference
https://android.jlelse.eu/android-architecture-components-with-firebase-907b7699f6a0