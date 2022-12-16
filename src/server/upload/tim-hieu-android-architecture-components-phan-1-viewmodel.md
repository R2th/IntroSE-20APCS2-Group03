Trong loạt bài này, tôi sẽ cố gắng làm sáng tỏ Android Architecture Components  (AAC) để tận dụng chúng tốt hơn. Hãy cùng bắt đầu với ViewModel.
## Tại sao chúng ta cần hiểu cách  AAC làm việc ?
Tôi luôn cân nhắc việc tách thành phần xử lí logic của ứng dụng ra khỏi nền tảng mà nó chạy, liên quan đến việc tách nói khỏi API, và một số giải pháp lưu trữ (SQLite, Realm, SharePreferences, hệ thống tệp tin) và quan trọng nữa là Android Runtime.
Dưới đây là 1 số lí do chính:
1. Việc phụ thuộc vào nền tảng sẽ cản trở khả năng kiểm thử, khiến cho việc viết unit test trở nên khó khăn, chậm chạp hoặc có thể là k thể viết được
2. Nền tảng mà bạn phụ thuộc vào nó sẽ phát triển theo thời gian, lúc đó sẽ ngoài tầm kiểm soát của bạn. Một sự thay đổi ở những thứ bạn đang phụ thuộc vào thì nó không nên bao hàm những thứ liên quan đến logic xử lí của bạn. 

Với AAC, Google cung cấp 1 bộ thư viện thúc đẩy những quyết định mang tính kiến trúc nhằm hướng đến việc xử lí logic ứng dụng của bạn vaf đồng thời tích hợp nó vào Android SDK

## AAC ViewModels là gì?
Ở tài liệu [Android's document](https://developer.android.com/topic/libraries/architecture/viewmodel) có nói rằng *ViewModels* được sử dựng để :
> “Store UI-related data that isn’t destroyed on app rotations.”
Nhưng cách mà nó quản lí như thế nào. Hãy cùng tiếp tục theo dõi nhé!

## Cách mà AAC ViewModels retain dữ liệu khi rơi vào Configuration changes
Đầu tiên, hãy cùng xem tài liệu Android để xem cách ViewModel làm. Đoạn code dưới đây là ví dụ về cách Fragment  cung cấp 1 ViewModel để retain dữ liệu khi rơi vào  configuration changes :
```
public void onCreate(Bundle savedInstanceState) {
    MyViewModel model = ViewModelProviders.of(this).get(MyViewModel.class);
    model.getUsers().observe(this, users -> {
        // update UI
    });
}
```
Đây là dòng mà ta cần chú ý :
```
ViewModelProviders.of(this).get(MyViewModel.class);
```
Từ đoạn code trên ta thấy lấy 1 *ViewModel* có type là *MyViewModel.* .Hãy cùng xem cách mà từng phương thức này làm việc. Đầu tiên với *ViewModelProviders.of*:
```
public static ViewModelProvider of(@NonNull Fragment fragment) {
    AndroidViewModelFactory factory = AndroidViewModelFactory.getInstance(checkApplication(checkActivity(fragment)));
    return new ViewModelProvider(ViewModelStores.of(fragment), factory);
}
```
Có vẻ *ViewModelProviders.of* chỉ là 1 factory của *ViewModelProvider*, nó bị phụ thuộc vào 1 *ViewModelStore*  và 1 *ViewModelFactory*. Chúng ta sẽ phải tìm hiểu kỹ hơn về cách  ViewModel hoạt động
## The ViewModelStore
Nếu chúng ta nhìn vào các dependencies, ViewModelStore có vẻ như 1 *simple store*  với 1  *HashMap<String, ViewModel>* trong đó key là tên Class và Object là ViewModel của chính nó.
```
final void put(String key, ViewModel viewModel) {
    ViewModel oldViewModel = mMap.get(key);
    if (oldViewModel != null) {
        oldViewModel.onCleared();
    }
    mMap.put(key, viewModel);
}

final ViewModel get(String key) {
    return mMap.get(key);
}
```
## ViewModelFactory
Mặc khác, ViewModelFactory đang sử dụng reflection để khởi tạo ViewModel mà chúng ta cần. AndroidViewModelFactory được sử dụng trong ViewModeProvider.of ghi đè 1 ViewModelFactory chung để cung cấp tham chiếu đến 1 Application Context cho ViewModel
```
NonNull
@Override
public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
    if (AndroidViewModel.class.isAssignableFrom(modelClass)) {
        try {
            return modelClass.getConstructor(Application.class).newInstance(mApplication);
        } catch ... {
            ...
        }
    }
    return super.create(modelClass);
}
```
Nếu ViewModel class là 1 type của AndroidViewModel, thì sau đó nó sẽ tạo 1 instance truyền application như 1 tham số trong hàm khởi tạo, nếu không nó sẽ gọi hàm thực thi của class cha:
```
public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
    try {
        return modelClass.newInstance();
    } catch (InstantiationException e) {
        ...
    }
}
```
Đây là 1 factory đơn giản được thực hiện qua reflection, không cung cấp đối số cho ViewModel
## Mối quan hệ với nhau 
Giờ chúng ta tìm hiểu cách tạo ra ViewModelProvider  và các phụ thuộc của nó, chúng ta sẽ xem xét các nó tạo ra và truy xuất các ViewModel Instance, và giữ chúng trong suốt quá trình configuration changes. Hãy nhìn phương thức get(MyViewModel.class)
```
public <T extends ViewModel> T get(@NonNull Class<T> modelClass) {
    String canonicalName = modelClass.getCanonicalName();
    if (canonicalName == null) {
        throw new IllegalArgumentException("Local and anonymous classes can not be ViewModels");
    }
    return get(DEFAULT_KEY + ":" + canonicalName, modelClass);
}

public <T extends ViewModel> T get(@NonNull String key, @NonNull Class<T> modelClass) {
    ViewModel viewModel = mViewModelStore.get(key);
    if (modelClass.isInstance(viewModel)) {
        return (T) viewModel;
    } else {
        ...
    }
    viewModel = mFactory.create(modelClass);
    mViewModelStore.put(key, viewModel);
    return (T) viewModel;
}
```
Nó hoạt động như ta mong đợi, nó lấy ra 1 ViewModel từ store, nếu không có gì , nó sẽ sử dụng factory để tạo ra và lưu trữ nó vào. Để lấy ra ViewModel đã tạo, nó tạo ra 1 key từ tên của class
## Surviving configuration changes
Đến đây thì t hiểu rẳng ViewModelStore là đối tượng chịu trách nhiệm giữ cho các tham chiếu của ViewModel được tái sử dụng như thế nào, nhưng cấu hình ViewModelStore còn sống sót và thay đổi như thế nào. Hãy trở lại việc triển khai ViewModelProvider.of
```
public static ViewModelProvider of(@NonNull Fragment fragment) {
    AndroidViewModelFactory factory = AndroidViewModelFactory.getInstance(checkApplication(checkActivity(fragment)));
    return new ViewModelProvider(ViewModelStores.of(fragment), factory);
}
```
ViewModelStores.of có vẻ giống như method ViewModeProvider.of, tạo ra 1 instance của ViewModelStore bắt buộc. Các thực hiện:
```
public static ViewModelStore of(@NonNull Fragment fragment) {
    if (fragment instanceof ViewModelStoreOwner) {
        return ((ViewModelStoreOwner) fragment).getViewModelStore();
    }
    return holderFragmentFor(fragment).getViewModelStore();
}

...

public static HolderFragment holderFragmentFor(Fragment fragment) {
    return sHolderFragmentManager.holderFragmentFor(fragment);
}
```
Rõ ràng, chúng ta có thể cung cấp ViewModelStore bằng 3 cách
1. Sử dụng android.support.v4.Fragment để triển khai ViewModelStoreOwner.
2. Triển khai ViewModelOwner trong Fragment của chúng ta và sở hữu trách nhiệm và xử lí store
3. Hãy để AAC tạo ra 1 HolderFragment , nó đã triển khai ViewModelStoreOwner và thư viện AAC và Android SDK sẽ thực hiện việc mất thời gian.

## Cách mà HolderFragment retains state
HolderFragment là gì và cách nó mapping đến Fragment stack ra sao. Cùng xem cách mà HolderFragment làm việc
```
HolderFragment holderFragmentFor(Fragment parentFragment) {
    FragmentManager fm = parentFragment.getChildFragmentManager();
    HolderFragment holder = findHolderFragment(fm);
    if (holder != null) {
        return holder;
    }
    holder = mNotCommittedFragmentHolders.get(parentFragment);
    if (holder != null) {
        return holder;
    }
    parentFragment.getFragmentManager()           .registerFragmentLifecycleCallbacks(mParentDestroyedCallback, false);
    holder = createHolderFragment(fm);
    mNotCommittedFragmentHolders.put(parentFragment, holder);
    return holder;
}

private static HolderFragment createHolderFragment(FragmentManager fragmentManager) {
    HolderFragment holder = new HolderFragment();
    fragmentManager.beginTransaction().add(holder, HOLDER_TAG).commitAllowingStateLoss();
    return holder;
}
```
HolderFragment có một vài cách để tìm HolderFragment được liên kết với Fragment của bạn, và nếu không tìm thấy, nó sẽ tạo ra HolderFragment mới và thêm nó vào FragmentManager của Fragment của riêng chúng ta. Bây giờ, fragment này trong stack của chúng ta tồn tại như thế nào thay đổi luân phiên trong khi phần còn lại của các fragment chết trong Life Cycler i bình thường của chúng? Câu trả lời nằm trong hàm khởi tạo:
```
public HolderFragment() {
    setRetainInstance(true);
}
```
Bằng việc set retaine instance là true và không cung cấp 1 view. HolderFragment sẽ luôn sống nếu Activity còn chưa destroy.
## Cách android.support.v4.app.Fragment retains state
Mặt khác nếu bạn dùng support Fragment thì state sẽ được retain tuy nhiên nó trở nên khác phức tạp để quản lí. Cùng xem cách xử lí của nó.
```
public void onDestroy() {
    mCalled = true;
    // Use mStateSaved instead of isStateSaved() since we're past onStop()
    if (mViewModelStore != null && !mHost.mFragmentManager.mStateSaved) {
        mViewModelStore.clear();
    }
}
```
Điều kiện để gọi clear trên ViewModelStore là :
*mHost.mFragmentManager.mStateSaved* is false.
Bằng cách thêm 1 số  breakpoint trên mStateSaved instance mà chúng ta quản lí 
![](https://images.viblo.asia/ecf2f704-0b5c-4e25-841c-2c535c4e124b.png)

Bằng việc điều hướng theo dõi kết quả của stack trace, chúng ra phát hiện ra rằng FragmentManager.saveAllState được gọi bởi FragmentActivity.onSaveInstanceState.
## Tổng kết
1. 1 ViewModeProvider tạo với reflection 1 ViewModel và ViewModelFactory.
2.  ViewModelProvider retain ViewModel khi cofiguration change với ViewModelStore, được cung cấp bởi ViewModelStoreOwner
3. android.support.v4.app.Fragment sẽ sử dụng FragmentManager.saveAllState như được gọi bởi FragmentActivity.onSaveInstanceState để giữ lại ViewModelStore bằng cách sử dụng tệp mStateSaved trên onDestroy.
4.   HolderFragment là   headless Fragment (without UI) đc thêm vào Fragment stack với setRetainInstance(true).

Tham khảo : [Internals of Android Architecture Components Part I — The ViewModel](https://proandroiddev.com/internals-of-android-architecture-components-part-i-the-viewmodel-d893e362a0d9)