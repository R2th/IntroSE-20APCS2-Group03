# 1. Giới thiệu
Như các bạn đã làm quen với android, hiện nay có một số cách để giao tiếp giữa các fragment với nhau như sử dụng interface thông qua Activity, dùng ViewModel, Rx, hay thư viện ngoài như Eventbus và mới đây nhất Google đã cho ra mắt một cách giao tiếp mới sử dụng Fragment Result API thuộc thư viện [*androidx.fragment*](https://developer.android.com/jetpack/androidx/releases/fragment) nơi việc truyền dữ liệu được xử lí bởi FragmentManager triển khai *[FragmentResultOwner](https://developer.android.com/reference/androidx/fragment/app/FragmentResultOwner)* và các Fragment có thể gửi và nhận dữ liệu.
# 2. Truyền dữ liệu giữa các Fragment 

Để truyền dữ liệu giữa các fragment mà chúng không có tham chiếu đến nhau chúng ta có thể sử dụng FragmentManager chung của chúng, nó hoạt động như một kho lưu trữ trung tâm cho dữ liệu được truyền giữa các Fragment.

Bình thường mọi người cảm thấy rất dễ dàng cho việc truyền dữ liệu xuôi hay còn được hiểu là truyền đi vậy thì còn truyền ngược lại thì sao, chắc hẳn là một số bạn mới làm quen với Android cũng gặp khúc mắc ở vấn đề này. Ta có một ví dụ cho mọi người dễ hình dung: từ FragmentA chuyển hướng sang FragmentB và từ FragmentB điều hướng quay lại FragmentA và truyền kèm theo một giá trị nào đó.

![](https://images.viblo.asia/50528bc3-3d29-41a2-ba1f-b9565103ecee.png)

Trong FragmentB chúng ta tạo ra các giá trị cần truyền lại và phải đặt trên cùng một FragmentManager bằng cách sử dụng cùng một *requestKey*, chúng ta làm việc này bằng cách sử dụng **setFragmentResult()** :
```kotlin
class FragmentB : Fragment(R.layout.fragment_b) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        buttonDone.setOnClickListener {
            try {
                val number = editTextResultNumber.text.toString().toInt()
                parentFragmentManager.apply {
                    setFragmentResult(
                        FragmentA.REQUEST_KEY,
                        bundleOf(FragmentA.KEY_NUMBER to number)
                    )
                    popBackStack()
                }
            } catch (exception: NumberFormatException) {
                Toast.makeText(requireContext(), exception.message, Toast.LENGTH_SHORT).show()
            }
        }
    }
}   
```
Ở đây FragmentA thực hiện việc lắng nghe kết quả trả về từ FragmetB bằng việc gọi phương thức setFragmentResultListener() ở hàm khởi tạo, tham số truyền vào lifecycleOwner chỉ cho phép nhận dữ liệu nếu nó ít nhất ở trạng thái STARTED. Nếu chính LifecycleOwner là Fragment thì bạn có thể cập nhật giao diện một cách an toàn khi dữ liệu mới được cập nhật, vì view sẽ được tạo tại thời điểm đó (onViewCreated() được gọi trước onStart()):
```kotlin
class FragmentA : Fragment(R.layout.fragment_a) {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        parentFragmentManager.setFragmentResultListener(
            REQUEST_KEY,
            this,
            FragmentResultListener { _, result ->
                val number = result.getInt(KEY_NUMBER)
                textResultListenerNumber.text =
                    getString(R.string.result_listener_number_message, number)
            })
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        buttonResultListenerEnterNumber.setOnClickListener {
            parentFragmentManager.beginTransaction()
                .replace(R.id.container, ResultFragment::class.java, null)
                .addToBackStack(null)
                .commit()
        }
    }
    
companion object {
        const val REQUEST_KEY = "result-listener-request-key"
        const val KEY_NUMBER = "key-number"
    }
}
```
Sau đó, FragmentA sẽ nhận được kết quả nếu nó ở trạng thái STARTED. Nếu có nhiều dữ liệu được chuyển đến FragmentA trước khi nó đạt đến trạng thái STARTED thì nó sẽ chỉ nhận được giá trị mới nhất nếu cuối cùng nó đạt đến trạng thái STARTED. 

![](https://images.viblo.asia/a3616b58-9376-49ac-b2f4-cebde537e5dd.png)

Khi mà đến trạng thái DESTROYED nó sẽ tự hủy đi listener, để đăng kí hủy thủ công thì hãy gọi lại **FragmentManager.setFragmentResultListener()** với cùng một khóa và chuyển vào **FragmentResultListener** rỗng.

![](https://images.viblo.asia/a33f02c0-02f5-46a8-8d0a-9748f16b16af.png)

# **3. Truyền dữ liệu giữa Fragment cha và Fragment con**

Nếu FragmentA muốn nhận dữ liệu từ FragmentB mà cả hai đều ở cùng một mức thì cả hai đều có thể giao tiếp thông qua FragmentManager cha của chúng và FragmentA phải đăng kí listener bằng FragmentManager cha của nó.
```kotlin
parentFragmentManager.setFragmentResultListener(...)
```

Nếu FragmentA muốn nhận dữ liệu từ FragmentB mà FragmentA lại là cha của FragmentB thfi cả hai cũng có thể giao tiếp qua FragmentManager con của FragmentA.
```kotlin
childFragmentManager.setFragmentResultListener(...)
```
Dưới đây có một ví dụ cụ thể như sau: FragmetB nằm trong FragmentA
![](https://images.viblo.asia/110c5bf8-b736-47e3-acea-7a055d1f0f4e.png)

Từ FragmentB(ChildFragment) gửi dữ liệu cho fragment cha của nó là FragmentA(ParentFragment). Fragment cha đăng kí một listener để lắng nghe kết quả trả về: 
```kotlin
class ParentFragment : Fragment(R.layout.fragment_parent) {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        childFragmentManager.setFragmentResultListener(
            REQUEST_KEY,
            this,
            FragmentResultListener { requestKey, result ->
                val number = result.getInt(KEY_NUMBER)
                textParentNumber.text =
                    getString(R.string.result_listener_number_message, number)
            })
        childFragmentManager.beginTransaction()
            .add(R.id.childFragment, ChildFragment::class.java, null)
            .commit()
    }

    companion object {
        const val REQUEST_KEY = "parent-request-key"
        const val KEY_NUMBER = "key-number"
    }
}
```

Fragment con gửi kết quả : 
```kotlin
class ChildFragment : Fragment(R.layout.fragment_child) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        buttonChildDone.setOnClickListener {
            try {
                val number = editTextChildNumber.text.toString().toInt()
                setFragmentResult(
                    ParentFragment.REQUEST_KEY,
                    bundleOf(ParentFragment.KEY_NUMBER to number)
                )
            } catch (exception: NumberFormatException) {
                Toast.makeText(
                    requireContext(),
                    R.string.invalid_number_error,
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }
}
```

# 4. Cơ chế hoạt động của *setFragmentResult()* và *setFragmentResultListener()*
Nói về ***setFragmentResult()*** 
```kotlin
    public final void setFragmentResult(@NonNull String requestKey, @Nullable Bundle result) {
        if (result == null) {
            // Nếu kết quả result truyền vào là rỗng thì ta sẽ xoá nó
            mResults.remove(requestKey);
            return;
        }
        
        // Kiểm tra xem có ai đang lắng nghe nó không với key được truyền vào
        LifecycleAwareResultListener resultListener = mResultListeners.get(requestKey);
        // Nếu nó đã vào trạng thái STARTED thì tiến hành callback
        if (resultListener != null && resultListener.isAtLeast(Lifecycle.State.STARTED)) {
            resultListener.onFragmentResult(requestKey, result);
        } else {
            // Nếu không có ai lắng nghe và gọi nó ra thì nó sẽ lưu lại vào FragmentManager đợi khi nào được gọi đến với cùng một requestKey
            mResults.put(requestKey, result);
        }
    }
```
Cơ chế của ***setFragmentResultListener()***
```kotlin
public final void setFragmentResultListener(@NonNull final String requestKey,
            @NonNull final LifecycleOwner lifecycleOwner,
            @Nullable final FragmentResultListener listener) {
        if (listener == null) {
            mResultListeners.remove(requestKey);
            return;
        }

        final Lifecycle lifecycle = lifecycleOwner.getLifecycle();
        if (lifecycle.getCurrentState() == Lifecycle.State.DESTROYED) {
            return;
        }

        LifecycleEventObserver observer = new LifecycleEventObserver() {
            @Override
            public void onStateChanged(@NonNull LifecycleOwner source,
                    @NonNull Lifecycle.Event event) {
                if (event == Lifecycle.Event.ON_START) {
                    // khi vòng đời được started , kiểm tra xem có bất kì results nào đã được lưu
                    Bundle storedResult = mResults.get(requestKey);
                    if (storedResult != null) {
                        // nếu có kết quả thì callback
                        listener.onFragmentResult(requestKey, storedResult);
                        // và xoá kết quả
                        setFragmentResult(requestKey, null);
                    }
                }

                if (event == Lifecycle.Event.ON_DESTROY) {
                    lifecycle.removeObserver(this);
                    mResultListeners.remove(requestKey);
                }
            }
        };
        lifecycle.addObserver(observer);
        mResultListeners.put(requestKey, new LifecycleAwareResultListener(lifecycle, listener));
    }
```
# **5. Kết luận**
Với cách làm như này thì việc truyền dữ liệu giữa các fragment trở nên đơn giản hơn phải không nào, hi vọng các bạn có thể hiểu và áp dụng được vào dự án của mình.

Nguồn tham khảo:

https://developer.android.com/guide/fragments/communicate

https://proandroiddev.com/android-fragments-fragment-result-805a6b2522ea