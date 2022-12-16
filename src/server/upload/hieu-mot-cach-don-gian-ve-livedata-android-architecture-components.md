Android Architecture Components là một điều mà bất kì một nhà phát triển Android nên biết. Trong bài viết này chúng ta sẽ tìm hiểu về một trong những thành phần chính của nó : LiveData

# LiveData là gì ?
LiveData được định nghĩa một cách chính thức là :
> LiveData là một lớp giữ dữ liệu quan sát được. Không giống như một thiết bị quan sát thông thường, LiveData nhận biết vòng đời, có nghĩa là nó tôn trọng vòng đời của các thành phần ứng dụng khác, chẳng hạn như các activities, fragments hoặc services. Nhận thức này đảm bảo LiveData chỉ cập nhật các thành phần ứng dụng quan sát nó khi những thành phần này đang ở trạng thái hoạt động
> 
Khá là trừu tượng phải không. Để hiểu hơn về LiveData hãy đọc một chút về lịch sử của nó nào:wink:
## Ở thời điểm bắt đầu…
Khi Android lần đầu tiên được giới thiệu, hầu hết các nhà phát triển đã bắt đầu viết tất cả mọi thứ trong một activity duy nhất.
![](https://images.viblo.asia/5bdce353-c5b6-4803-a925-5e168643befc.png)
Tuy nhiên, không lý tưởng khi mọi thứ gộp vào một class activity duy nhất . Android Activity cũng khó để unit test.

Do đó, mọi người đã đưa ra mô hình kiến trúc khác nhau như MVP, MVC, MVVM, v.v., trong đó phía logic được thực hiện bởi một phần khác, ví dụ như Presenter, ViewModel, Controller,..
![](https://images.viblo.asia/3e725609-4116-4126-8f31-c1952fc7d723.png)

Điều này tốt hơn vì nó tách logic khỏi view . Tuy nhiên, nó cũng có vấn đề : Presenter, ViewModel, Controller, ... không nhận thức được Activity Lifecycle. Nó phải được thông báo về vòng đời của Activity.

Thay vì để mọi người tự xác định phải làm gì, hiện nay Google đã đưa ra bộ Architecture Componentse.

Các thành phần, ví dụ: ViewModels có khả năng đặc biệt. Chúng có thể nhận thức được Activity LiveCycle mà không cần Activity nói với chúng (ít nhất là một cách rõ ràng).
![](https://images.viblo.asia/f2338227-d39b-4203-a958-0266b0a12986.png)
Khác với ViewModel, nghĩa là được sử dụng để truyền thông tin trở lại từ ViewModel sang Activity, dữ liệu từ một nơi khác, cũng có khả năng nhận biết về vòng đời của Activity.

Đó là lý do mà gọi nó là LiveData, dữ liệu nhận biết về LiveCycle của người quan sát nó(ví dụ: Activity).

## Minh họa về LiveData
Để minh họa rõ hơn, hãy để LiveData vào trung tâm như sơ đồ dưới đây.
![](https://images.viblo.asia/0b1a45ef-468d-46b6-bcf7-12b7d4f8fa2d.png)
Từ sơ đồ, bạn có thể thấy LiveData có thể được sửa đổi bởi ViewModels (hoặc bất cứ điều gì bạn muốn sử dụng để sửa đổi liveData).

Sau khi cập nhật, nó sẽ thông báo cho tất cả những người quan sát nó (activities, fragment, service v.v.). Tuy nhiên, không giống như bất kỳ cách tiếp cận nào khác (ví dụ: Rxjava), nó không thông báo mù quáng cho tất cả bọn chúng, thay vào đó nó kiểm tra 'trạng thái sống' của bọn chúng trước.

Nếu người quan sát đang hoạt động, thì nó có thể được thông báo về sự thay đổi dữ liệu trong LiveData. Tuy nhiên, nếu Người quan sát bị Tạm dừng hoặc Bị hủy, thì nó sẽ không được thông báo.

Điều này thật tuyệt, vì chúng ta không còn phải lo lắng về việc hủy đăng ký nó trên onPause hoặc onDestroy.

Ngoài ra, một khi Observer được nối lại, nó sẽ được thông báo ngay lập tức về dữ liệu mới nhất từ LiveData.

# Các loại LiveData
LiveData thực tế chỉ là một Abstract Class. Vì vậy, nó không thể được sử dụng như chính nó.May mắn thay, Google đã triển khai một số lớp cụ thể đơn giản mà chúng ta có thể sử dụng.

## MutableLiveData
Đây là LiveData đơn giản nhất, nó sẽ được cập nhật và thông báo cho người quan sát của nó.

Các khai báo đơn giản như sau :
```kotlin
// Declaring it
val liveDataA = MutableLiveData<String>()
// Trigger the value change
liveDataA.value = someValue
// Optionally, one could use liveDataA.postValue(value) 
// to get it set on the UI thread
```
Để quan sát LiveData cũng đơn giản không kém.
```kotlin
class MutableLiveDataFragment : Fragment() {

    private val changeObserver = Observer<String> { value ->
        value?.let { txt_fragment.text = it }
    }

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        getLiveDataA().observe(this, changeObserver)
    }
    // .. some other Fragment specific code ..
}
```

Kết quả như bên dưới, khi dữ liệu được đặt trên LiveDataA là 7567 hoặc 6269, nó được phát hiện bởi Fragment
![](https://images.viblo.asia/6aad80f3-7983-4eb5-8022-0a8cb9b26fe3.gif)
Từ đoạn code bạn có thể thấy Livedata được đăng ký bởi
```kotlin
getLiveDataA().observe(this, changeObserver)
```
nhưng không có code nào để hủy đăng ký khi Fragment đang tạm dừng hoặc chấm dứt.

Ngay cả khi không hủy đăng ký, nó sẽ không gây ra bất kỳ vấn đề gì.

Ví dụ sau cho thấy ngay cả khi Fragment chết, giá trị LiveData tạo ra, tức là 1428 không gây ra sự cố nào do cài đặt trên một Fragment không hoạt động.
![](https://images.viblo.asia/b92203be-f75a-4259-9ac6-efe1352b14b4.gif)

Bạn cũng sẽ nhận thấy khi Fragment trở lại, nó sẽ lấy dữ liệu mới nhất, tức là 1428 từ LiveData.

## Transformations.Map

Hãy tưởng tượng nếu bạn đang load dữ liệu từ một repository. Trước khi bạn chuyển dữ liệu đó đến view, bạn muốn sửa đổi nó.

Chúng ta vẫn có thể sử dụng LiveData để truyền dữ liệu qua các thực thể khác nhau như dưới đây.
![](https://images.viblo.asia/9926ac27-73ed-4e42-8419-0f3c15909f67.png)

Chúng ta có thể chuyển đổi dữ liệu từ một LiveData và chuyển sang dữ liệu khác bằng hàm Transformations.map ().
```kotlin
class TransformationMapFragment : Fragment() {

    private val changeObserver = Observer<String> { value ->
        value?.let { txt_fragment.text = it }
    }

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        val transformedLiveData = Transformations.map(
                getLiveDataA()) { "A:$it" }
        transformedLiveData.observe(this, changeObserver)
    }
    // .. some other Fragment specific code ..
}
```
Ví dụ như 5116 được chuyển đổi sang dạng mới là A: 5116, trước khi chuyển qua Fragment
![](https://images.viblo.asia/309953a8-e771-40fb-87d3-082e2da83fd2.gif)

Sử dụng Transformations.map rất hữu ích để đảm bảo LiveData không truyền thông tin khi đến đích, ví dụ: ViewModel và View khi nó đã chết.
![](https://images.viblo.asia/2e439746-06e1-4c80-8d44-4b853c8e076e.png)

Điều này thật tuyệt, vì chúng ta cũng không cần phải lo lắng về việc hủy đăng ký.
Cách mà Trasnformation.map thực hiện
```kotlin
@MainThread
public static <X, Y> LiveData<Y> map(@NonNull LiveData<X> source,
        @NonNull final Function<X, Y> func) {
    final MediatorLiveData<Y> result = new MediatorLiveData<>();
    result.addSource(source, new Observer<X>() {
        @Override
        public void onChanged(@Nullable X x) {
            result.setValue(func.apply(x));
        }
    });
    return result;
}
```
Ồ, nó là sử dụng một loại LiveData khác có tên MediatorLiveData. Hãy tìm hiểu về nó nào...
## MediatorLiveData
Nếu bạn quan sát đoạn code trên, phần thú vị chính của MediatorLiveData là khả năng thêm source vào code và mã thay đổi nội dung của dữ liệu.

Điều này có nghĩa là chúng ta có thể có nhiều nguồn cấp dữ liệu LiveData cho một điểm đến thông qua MediatorLiveData như dưới đây.

![](https://images.viblo.asia/292199b6-e1ed-4899-b000-222b4f3ab5c1.png)
Chúng ta có thể sử dụng MediatorLiveData trực tiếp như dưới đây
```kotlin
class MediatorLiveDataFragment : Fragment() {

    private val changeObserver = Observer<String> { value ->
        value?.let { txt_fragment.text = it }
    }

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        val mediatorLiveData = MediatorLiveData<String>()
        mediatorLiveData.addSource(getliveDataA())
              { mediatorLiveData.value = "A:$it" }
        mediatorLiveData.addSource(getliveDataB()) 
              { mediatorLiveData.value = "B:$it" }
        mediatorLiveData.observe(this, changeObserver)
    }
    // .. some other Fragment specific code ..
}
```
Với điều này, bạn có thể thấy bên dưới, Fragment có thể nhận được từ cả LiveDataA và LiveDataB khi nó thay đổi.

![](https://images.viblo.asia/de1e542c-8529-411f-96fd-aef4d89cecf8.gif)

**Lưu ý**

Nếu Fragment không còn tồn tại và dữ liệu thay đổi cả trên LiveDataA và LiveDataB, khi Fragment "sống lại", MediatorLiveData sẽ lấy LiveData được thêm lần cuối  ví dụ LiveDataB.
![](https://images.viblo.asia/554324e5-a4ec-45ad-bd2a-7d3b30c94d4f.gif)
Ở trên, bạn có thể thấy rằng Fragment khi được khôi phục, sẽ luôn lấy từ LiveDataB, bất kể LiveDataB có thay đổi sau so với LiveDataA hay không. Điều này là do trong code, bạn có thể thấy LiveDataB là nguồn được thêm lần cuối vào MediatorLiveData.
## Transformations.SwitchMap

Có khả năng nghe từ 2 nguồn LiveData là tốt. Nhưng điều gì sẽ xảy ra nếu chúng ta muốn kiểm soát chỉ lắng nghe một cái, không phải cái còn lại và chuyển đổi giữa chúng khi cần, chúng ta có nên viết logic của mình để làm như vậy không?

Chúng ta có thể, nhưng chúng ta không cần phải làm thế. Google đã cung cấp cho chúng ta một chức năng hay khác là Transformations.switchMap ().

```kotlin
@MainThread
public static <X, Y> LiveData<Y> switchMap(@NonNull LiveData<X> trigger,
        @NonNull final Function<X, LiveData<Y>> func) {
    final MediatorLiveData<Y> result = new MediatorLiveData<>();
    result.addSource(trigger, new Observer<X>() {
        LiveData<Y> mSource;

        @Override
        public void onChanged(@Nullable X x) {
            LiveData<Y> newLiveData = func.apply(x);
            if (mSource == newLiveData) {
                return;
            }
            if (mSource != null) {
                result.removeSource(mSource);
            }
            mSource = newLiveData;
            if (mSource != null) {
                result.addSource(mSource, new Observer<Y>() {
                    @Override
                    public void onChanged(@Nullable Y y) {
                        result.setValue(y);
                    }
                });
            }
        }
    });
    return result;
}
```

Chức năng chỉ đơn giản là thêm nguồn và loại bỏ nguồn trước đó cho phù hợp. Vì vậy, chỉ có một nguồn duy nhất luôn cung cấp cho MediatorLiveData.
![](https://images.viblo.asia/920160f8-d38f-4b8d-a2db-a24ba222a43c.png)

Để sử dụng nó, sẽ chỉ đơn giản như dưới đây
```kotlin
class TransformationSwitchMapFragment : Fragment() {

    private val changeObserver = Observer<String> { value ->
        value?.let { txt_fragment.text = it }
    }

    override fun onAttach(context: Context?) {
        super.onAttach(context)

        val transformSwitchedLiveData =
            Transformations.switchMap(getLiveDataSwitch()) { 
                switchToB ->
                if (switchToB) {
                     getLiveDataB()
                } else {
                     getLiveDataA()
                }
        }

        transformSwitchedLiveData.observe(this, changeObserver)
    }
    // .. some other Fragment specific code ..
}
```

Với điều này, chúng tôi có thể dễ dàng kiểm soát dữ liệu nào sẽ cung cấp cho chế độ xem của chúng tôi như dưới đây. Dữ liệu được cập nhật vào Fragment là khi nguồn dữ liệu được kết nối thay đổi hoặc khi công tắc thay đổi.
![](https://images.viblo.asia/ac4878e8-5cb2-40a7-b3ae-e1c69201b6aa.gif)

Điều này rất thuận tiện để kiểm soát ứng dụng có nguồn cấp dữ liệu từ các nguồn khác nhau được kiểm soát bởi cài đặt nhất định (ví dụ: phiên đăng nhập của người dùng).

# Tài liệu tham khảo
Code :

https://github.com/elye/demo_android_livedata_illustration

Tài liệu : 

[LiveData Overview | Android Developers](https://developer.android.com/topic/libraries/architecture/livedata)

[Medium](https://medium.com/@elye.project/understanding-live-data-made-simple-a820fcd7b4d0)