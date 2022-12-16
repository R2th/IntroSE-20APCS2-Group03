## Introduction
Hôm nay, chúng ta sẽ giải thích sử dụng tính năng tuyệt vời **multibindings** của Dagger2 như thế nào cùng với lớp **ViewModel** mới của Architecture Components.

Rất nhiều người trong chúng ta, khi bắt đầu tìm hiểu về làm thế nào để sử dụng **ViewModel** class đã xem ví dụ **[GithubBrowserSample](https://github.com/googlesamples/android-architecture-components/tree/master/GithubBrowserSample)** trên Github.

Có thể, lớp đầu tiên chúng ta nhìn thấy trong đống code hữu ích đó là lớp gọi là **GithubViewModelFactory**(Đây là [link](https://github.com/googlesamples/android-architecture-components/blob/e33782ba54ebe87f7e21e03542230695bc893818/GithubBrowserSample/app/src/main/java/com/android/example/github/viewmodel/GithubViewModelFactory.java) tới file trên repository). Lớp này là một ví dụ hoàn hảo về **Dagger2 Multibindings** có thể là phao cứu sinh thực sự.

Trước khi đi sâu vào code, tôi sẽ làm một chút giới thiệu. Đối với quá trình binding các lớp **ViewModel** với các tham số được truyền vào constructors(Ví dụ đối với quá trình truyền dữ liệu tùy biến hoặc các constructors được chú thích **@Inject**), chúng ta cần cung cấp một lớp cái kế thừa **ViewModelProvider.Factory**, quá trình trả về các thể hiện của **ViewModels** tùy biến của chúng ta từ phương thức **create()**.

Do đó, vấn đề đầu tiên chúng ta có thể chú ý là constructor của lớp, cái nhìn có vẻ tham số truyền vào không đẹp lắm **Map&lt;Class&lt;? extends ViewModel&gt;, Provider&lt;ViewModel&gt;&gt;**. Điều quái quỷ gì ở đây vậy?

Hãy xem kiểu tham số rất lớn này với sự chú ý nhiều hơn: Nó là một ánh xạ cái có một **Class** kế thừa **ViewModel** như là một key, và một **Provider** của **ViewModel**(Một class được chỉ ra bởi Dagger2 cái để chúng ta cung cấp - và đó là thể hiện của một dependency-injected class) như là một value.

Đồng ý, nhưng chúng ta có thể thực hiện điều gì với đối tượng này?
Chúng ta chỉ nói rằng phương thức **create** của **ViewModelProvider.Factory** tùy biến kì vọng một thể hiện của **ViewModel** như là một value trả về. Phương thức này đưa ra kiểu của ViewModel cái được yêu cầu từ một **Activity** hoặc **Fragment** như là một tham số. Quá trình ghép kiểu này (đối tượng **Class** của chúng ta)với một cái gì đó cái mà tạo ra một ViewModel cùng loại, chúng ta có thể, dĩ nhiên khởi tạo và trả về thể hiện của lớp đó từ system.

Thứ gì đó có thể cung cấp cho **ViewModel** của chúng ta nhằm xác định kiểu của nó chứ? Câu trả lời là **Provider** value trong map cái mà Dagger đã injected cho chúng ta.

Hãy nói về Multibindings.

## Multibindings
Tiêu đề rất rất lớn trên trang [tài liệu chính thức về Multibindings](https://google.github.io/dagger/multibindings).

Dagger2 có thể liên kết với một **Provider** dependency với một key nhận được và inject nó tới một Map.

Điều này được hoàn thành nhờ quá trình sử dụng **@IntoMap** annotation trên một phương thức cái cung cấp value chúng ta cần để liên kết với một key.
Key, nói một cách khác, chỉ rõ quá trình sử dụng một annotation tùy biến cái được đánh dấu chính nó với **@MapKey**. Ở đây, nó là chú thích đã sử dụng cho quá trình tạo một Map với kiểu **key**, một đối tượng **Class&lt;?extends ViewModel&gt;**.

```
@Retention(RetentionPolicy.RUNTIME)
@MapKey
@interface ViewModelKey {
    Class<? extends ViewModel> value();
}
```

Loại value tham số của chúng ta sẽ là loại key của chúng ta trong map.

Do đó phương thưc **Module** như sau:

```
@Binds
@IntoMap
@ViewModelKey(UserViewModel.class)
abstract ViewModel bindUserViewModel(UserViewModel userViewModel);
```

Nói đại khái: "inject đối tượng này vào một **Map**(**@IntoMap** annotation) sử dụng **UserViewModel.class** như là một key, và một **Provider** cái sẽ xây dựng một đối tượng **UserViewModel**(với tham số của **@Bind** annotation) như là một value". Với cách thức này, chúng ta có thể inject vào một đối tượng được quản lý bởi Dagger2, một map của type... đã phỏng đoán là: **Map&lt;Class&lg;? extends ViewModel&gt;, Provider&lt;ViewModel&gt;&gt;**.

Giờ đây chúng ta biết rằng chúng ta có thể sử dụng đối tượng **Class** như là một tham số trong phương thức **ViewModelProvider.Factory.create()** nhằm nhận lại một provider cho ViewModel đó. Đây chính xác là những gì mà người Google đã nói trong phương thức đó. Hãy khám phá từng mảnh code một.

Provider có thể cho ViewModel đã cung cấp được lấy từ Map:

```
Provider<? extends ViewModel> creator = creators.get(modelClass);
```

Nếu map của **Provider** của chúng ta không nhật được key cụ thể, chúng ta sẽ kiểm tra nếu có một lớp con của **ViewModel** chúng ta cần khởi tạo:

```
if (creator == null) {
    for (Map.Entry<Class<? extends ViewModel>, Provider<ViewModel>> entry : creators.entrySet()) {
        if (modelClass.isAssignableFrom(entry.getKey())) {
                creator = entry.getValue();
                break;
        }
    }
}
```

Nếu tất cả các cố gắng trước đây về quá trình lấy môt Provider có hiệu lực từ map bị lỗi, chúng ta ném ra một ngoại lệ:

```
if (creator == null) {
    throw new IllegalArgumentException("unknown model class " + modelClass);
}
```

Cuối cùng, chúng ta có thể để Dagger tạo **ViewModel** của chúng ta bằng cách gọi phương thức **get()** trên đối tượng **Provider** như đã nói từ trước, và ép kiểu nó thành kiểu cuối cùng của mình:

```
try {
    return (T) creator.get();
} catch (Exception e) {
    throw new RuntimeException(e);
}
```

Chúng ta đã inject thành công một **ViewModel** với Dagger2.

## The Kotlin translation and ... a little extra!
Lớp này và các lớp liên quan của nó là một sự cần thiết nấy bạn sử dụng Dagger2 cùng với ViewModel, nhưng cá nhân tôi yêu thích kotlin, do đó hãy chuyển đổi nó thành thứ ngôn ngữ đẹp và ngắn gọn này:

```
@Singleton
class DaggerViewModelFactory
@Inject constructor(
         private val creators: Map<Class<out ViewModel>, @JvmSuppressWildcards Provider<ViewModel>>
) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        val creator = creators[modelClass] ?:
                creators.asIterable().firstOrNull { modelClass.isAssignableFrom(it.key) }?.value
                ?: throw IllegalArgumentException("unknown model class " + modelClass)

        return try {
            creator.get() as T
        } catch (e: Exception) {
            throw RuntimeException(e)
        }

    }
}
```
<div align="center"><b>DaggerViewModelFactory.kt</b></div>

```
@Module
abstract class ViewModelFactoryModule {
    @Binds
    internal abstract fun bindViewModelFactory(factory: GithubViewModelFactory): ViewModelProvider.Factory
}
```
<div align="center"><b>ViewModelFactoryModule.kt</b></div>

```
@Target(AnnotationTarget.FUNCTION, AnnotationTarget.PROPERTY_GETTER, AnnotationTarget.PROPERTY_SETTER)
@MapKey
internal annotation class ViewModelKey(val value: KClass<out ViewModel>)
```
<div align="center"><b>ViewModelKey.kt</b></div>

Như vậy, nếu bạn sử dụng Kotlin trong ứng dụng Android của mình(và nếu không thì bạn thực sự nên sử dụng nó) bạn có thể chỉ copy&paste mã nguồn này vào project của mình.. hoặc sử dụng library tôi đã tạo ở [đây](https://github.com/alexfacciorusso/DaggerViewModel) kèm với hướng dẫn nhằm tạo và sử dụng nó(xem README).

## Source
https://blog.kotlin-academy.com/understanding-dagger-2-multibindings-viewmodel-8418eb372848
## Reference
1. https://viblo.asia/p/how-to-android-dagger-2xx-butterknife-8x-and-mvp-part-1-3P0lP44vlox <br />
2. https://viblo.asia/p/how-to-android-dagger-2xx-butterknife-8x-and-mvp-part-2-yMnKMYNNK7P <br />
3. https://viblo.asia/p/how-to-android-dagger-2xx-butterknife-8x-and-mvp-part-3-Eb85oyw4Z2G <br />