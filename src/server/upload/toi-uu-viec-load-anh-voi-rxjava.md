## 1. Context

Để tạo một ứng dụng với trải nghiệm người dùng tuyệt vời, điều quan trọng là giảm thiểu thời gian người dùng chờ load dữ liệu.Đối với việc hiển thị hình ảnh, trong hầu hết các trường hợp, để tăng UX ta thường tải ảnh có chất lượng thấp (ảnh thumbnail) trước hình ảnh có chất lượng tốt hơn (ảnh original) được hiển thị là để user không phải chờ đợi việc load ảnh gốc với dung lượng lớn

Trong bài này, mình muốn chỉ cho bạn cách triển khai tải hình ảnh lũy tiến trong ứng dụng Android bằng RxJava và Kotlin. 

## 2.Fetching multiple images
Nếu bạn đã sử dụng Picasso, bạn chắc chắn đã biết cách load ảnh và show chúng lên imageview đơn giản như thế này:
```kotlin
Picasso.get().load(url).into(imageView)
```
Thật đáng tiếc rằng, method này không thể sử dụng khi ảnh được lấy từ 2 nguồn URLs để load lên 1 imageview
Khi gọi load(urlOri).into(imageView) lên imageview khiến cho load(urlThumb).into(imageView) đã bị cancel
```kotlin
Picasso.get().load(urlThumb).into(imageView)
Picasso.get().load(urlOri).into(imageView) // cancells the request to load urlThumb :(
```
Đó là lý do tại sao mỗi image phải được tải vào mục riêng biệt,nó là nơi mà bitmap sẽ được đổ vào ImageView khi được fetched. 

```kotlin
Picasso.get().load(url).into(object : Target {
    override fun onPrepareLoad(placeHolderDrawable: Drawable?) {
        //do nothing
    }

    override fun onBitmapLoaded(bitmap: Bitmap, from: Picasso.LoadedFrom) {
        imageView.setImageBitmap(bitmap)
    }

    override fun onBitmapFailed(e: Exception?, errorDrawable: Drawable?) {
        //do nothing
    }
})
```
Tại sao lại như vậy? Bạn có thể vào source code của Picasso và thấy:
![](https://images.viblo.asia/7d3c84d8-9b07-4fc5-b680-06f3bf2af670.png)
Để bảo vệ các target không bị Garbage Collection thu dọn nên cần giữ một tham chiếu đến nó.
Một cách để xử lí việc này là tạo một MutableList<Target> và lưu trữ các target trong đó cho đến khi bitmap được fetch hoàn tất.

```kotlin
private val runningTargets = mutableListOf<Target>()

override fun loadImage(url: String) {
    val target = object : Target {
        // target implementation
    }

    runningTargets.add(target)
    picasso.load(url)
            .into(target)
}
```
## 3.Demo 
Ở đây mình làm ví dụ load ảnh trên trang "https://picsum.photos" với url là https://picsum.photos/{width}/{height}/?image=0 trong đó width, height tương ứng là chiều dài và chiều rộng của bức ảnh.

Ý tưởng là chuyển url với các chất lượng ảnh khác nhau vào phương thức và nhận sự kiện mỗi lần hình ảnh với chất lượng tốt hơn được nhận. Khi đã nhận về bitmap sẽ được lưu trữ trong LiveData được observed ra view để hiển thị
![](https://images.viblo.asia/1dd14c5a-8e17-4ad3-8a55-48eeb25e9dba.png)
ViewModel sẽ gửi các error nếu hoàn tất và không có image nào được load thành công. 
```kotlin
class ImageViewModel {

    companion object {
        private const val BASE_IMAGE_URL = "https://picsum.photos"
    }

    private val disposable = CompositeDisposable()
    private val fetcher = ImageFetcher(Picasso.get())

    val bitmapResult = MutableLiveData<BitmapResult>()

    fun loadImages(qualities: List<Int>) {
        bitmapResult.value = BitmapResult.loading()
        disposable.add(fetcher.loadProgressively(BASE_IMAGE_URL, qualities)
                .filter { getCurrentQuality() < it.quality }
                .subscribeBy(
                        onNext = { applyImage(it) },
                        onComplete = { postErrorIfNotSufficientQuality() }
                ))
    }

    private fun getCurrentQuality(): Int {
        return bitmapResult.value?.quality ?: -1
    }

    private fun applyImage(bitmap: BitmapWithQuality) {
        bitmapResult.value = BitmapResult.success(bitmap)
    }

    private fun postErrorIfNotSufficientQuality() {
        if (getCurrentQuality() < 0) {
            bitmapResult.value = BitmapResult.error()
        }
    }

    fun unSubscribe() {
        disposable.dispose()
    }
}
```
Sau đó view chỉ cần lắng nghe để hiển thị ảnh bằng Bitmap đươc phát ra từ viewmodel nếu thành công, và show error nếu xảy ra lỗi
```kotlin
class MainActivity : AppCompatActivity() {

    private val viewModel = ImageViewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        viewModel.bitmapResult.observe(this, Observer<BitmapResult> { it -> process(it) })
        viewModel.loadImages(listOf(3000, 10, 300))
    }

    private fun process(result: BitmapResult?) {
        result?.let {
            when (it.state) {
                ResponseState.LOADING -> {
                    showProgress()
                }
                ResponseState.ERROR -> {
                    hideProgress()
                    showError()
                }
                ResponseState.SUCCESS -> {
                    hideProgress()
                    it.bitmap?.let { bitmap ->
                        showImage(bitmap)
                    }
                }
            }
        }
    }

    private fun showImage(bitmap: Bitmap) {
        imageView.setImageBitmap(bitmap)
    }

    private fun showProgress() {
        loader.visibility = View.VISIBLE
    }

    private fun hideProgress() {
        loader.visibility = View.GONE
    }

    private fun showError() {
        errorText.visibility = View.VISIBLE
    }

    override fun onDestroy() {
        super.onDestroy()
        viewModel.unSubscribe()
    }
}

```
### 3.1 Use case 2 URLs
```kotlin
private fun createUrl(url: String, size: Int): String = "$url/$size/$size?image=0" //?image=0 added so image wont be random
```
Trong trường hợp đơn giản nhất chỉ tìm nạp hai url cùng lúc, điều duy nhất cần được thực hiện là tạo ra các observable cho mỗi url với mỗi loại ảnh và merge chúng lại với nhau.
```kotlin
fun loadProgressively(baseUrl: String, quality1: Int, quality2: Int): Observable<BitmapWithQuality> {
    return Observable.merge(
            loadImageAndIgnoreError(createUrl(baseUrl, quality1), quality1),
            loadImageAndIgnoreError(createUrl(baseUrl, quality2), quality2)
    )
}
```
Trong method loadImageAndIgnoreError, ta đã tạo duy nhất từ ​​cá thể lớp thực hiện giao diện SingleOnSubscribe <BitmapWithQuality> và sau đó biến nó thành observable 
```kotlin
private fun loadImageAndIgnoreError(url: String, quality: Int): Observable<BitmapWithQuality> {
    return Single
        .create(ImageFetcherSingleSubscribe(picasso, url, quality))
        .toObservable()
        .onErrorResumeNext(Observable.empty<BitmapWithQuality>())
}
```
 Khi có lỗi xảy ra thì sẽ phát ra Observable.empty<BitmapWithQuality>() để hiển thị error lên view khi tất cả các lời gọi hàm được hoàn tất

    
###  3.2Multiple URLs
Vậy làm thế nào để load đồng thời nhiều URLs, đối với trường hợp này , ta sẽ sử dụng kết hợp các toán tử map, merge và reduce. 

Đầu tiên lấy list các url và map chúng thành Pair<url, quality>. Sau đó, sử dụng toán tử map mà ta đã Observalbe được từ cặp đó bằng cách sử dụng loadImageAndIgnoreError(), giống như trên kia. Bước cuối cùng là sử dụng [reduce](http://reactivex.io/documentation/operators/reduce.html) để hợp nhất tất cả các observable với nhau và lấy tất cả các image cùng một lúc.

![](https://images.viblo.asia/2dcfa58f-db23-4150-ac6a-874407f81f59.png)

Việc sử dụng reduce là rất hợp lí trong trường hợp này. Nó áp dụng một hàm cho mỗi mục được phát ra bởi một Observable tuần tự và phát ra giá trị cuối cùng. Trong trường hợp này giá trị cuối cùng là giá trị observable được tạo ra từ việc hợp nhất tất cả các observable thành phần với nhau.
![](https://images.viblo.asia/f7bc32d2-2db8-4445-866b-a0f4f2a2145c.png)

```kotlin
fun loadProgressively(baseUrl: String, qualities: List<Int>): Observable<BitmapWithQuality> {
    return qualities
            .map { quality -> Pair(createUrl(baseUrl, quality), quality) }
            .map { loadImageAndIgnoreError(it) }
            .reduce { o1, o2 -> Observable.merge(o1, o2) }
}
```
### 3.3ImageFetcherSingleSubscribe
ImageFetcherSingleSubscribe là một class implement interface [SingleOnSubscribe](http://reactivex.io/RxJava/javadoc/io/reactivex/SingleOnSubscribe.html) được override method subscribe nhận về một SingleEmitter<BitmapWithQuality> cho phép handler chúng.

Trong subscribe method , tạo class CustomImageLoadTarget như một nguồn phát, sẽ phát ra Bitmap nếu thành công và phát ra exception nếu lỗi, sau đó unsubscribe để cancelRequest và xóa nó ra khỏi list runningTarget

Tiếp theo, thêm các target vào mutable list để ngăn việc bị Garbage Collection thu dọn cho đến khi lời gọi hàm kết thúc. Sau đó, đích đến được chuyển cho Picasso để hiển thị 
```kotlin
class ImageFetcherSingleSubscribe(private val picasso: Picasso,
                                  private val url: String,
                                  private val quality: Int) : SingleOnSubscribe<BitmapWithQuality> {

    private val runningTargets = mutableListOf<Target>()

    override fun subscribe(emitter: SingleEmitter<BitmapWithQuality>) {
        val target = CustomImageLoadTarget(emitter, quality) {
            removeTargetAndCancelRequest(it)
        }

        runningTargets.add(target)
        picasso.load(url)
                .into(target)
    }

    private fun removeTargetAndCancelRequest(target: Target) {
        picasso.cancelRequest(target)
        runningTargets.remove(target)
    }
}

data class BitmapWithQuality(val bitmap: Bitmap,
                             val quality: Int)
```

### 3.4CustomImageLoadTarget
CustomImageLoadTarget là một class  implementing Target interface mà instance đó sẽ được chuyển vào method 

Trong init, gọi emitter.setCancellable {unSubscribe (this)} để unSubscribe và target bị xóa khỏi list sau khi emitter được xử lý. 

Khi bitmap được tìm nạp trong method onBitmapLoaded emitter.onSuccess () được gọi với bitmap đã nạp và chất lượng của nó. Khi tìm nạp bitmap thất bại trong onBitmapFailed emitter.tryOnError() được gọi. Sau khi phát ra một trong hai thành công hoặc một unSubscribe lỗi phải được gọi để loại bỏ target khỏi map và loại bỏ tham chiếu để nó có thể được GC thu dọn
```kotlin
class CustomImageLoadTarget(private val emitter: SingleEmitter<BitmapWithQuality>,
                            private val quality: Int,
                            private val unSubscribe: (Target) -> Unit) : Target {

    init {
        emitter.setCancellable { unSubscribe(this) }
    }

    override fun onPrepareLoad(placeHolderDrawable: Drawable?) {
        //do nothing
    }

    override fun onBitmapLoaded(bitmap: Bitmap, from: Picasso.LoadedFrom) {
        emitter.onSuccess(BitmapWithQuality(bitmap, quality))
        unSubscribe(this)
    }

    override fun onBitmapFailed(e: Exception, errorDrawable: Drawable?) {
        emitter.tryOnError(e)
        unSubscribe(this)
    }
}
```

## 4.Load thumb với Glide 

Glide cũng đã hỗ trợ việc load Thumbnail rất đơn giản :

```kotlin
val thumbnailRequest = Glide.with(this)
        .load("https://picsum.photos/50/50?image=0")

Glide.with(this)
        .load("https://picsum.photos/2000/2000?image=0")
        .thumbnail(thumbnailRequest)
        .into(imageThumbnail)
```
Bạn cũng có thể dùng mới Multi Urls với cách lầy như thế này :))
```kotlin
val thumbnailOfThumbnailRequest = Glide.with(this)
        .load("https://picsum.photos/50/50?image=0")

val thumbnailRequest = Glide.with(this)
        .load("https://picsum.photos/500/500?image=0")
        .thumbnail(thumbnailOfThumbnailRequest)

Glide.with(this)
        .load("https://picsum.photos/2500/2500?image=0")
        .thumbnail(thumbnailRequest)
        .into(imageThumbnail)
```

Nhược điểm của phương pháp này là bạn không thể áp dụng multi Url phức tạp hoặc logic xử lý tiến trình. Phương pháp đầu tiên mà ta thực hiện bằng cách sử dụng RxJava cho phép kiểm soát nhiều hơn trạng thái hơn nhưng nhược điểm của nó là khá phức tạp.
> Bài viết được tham khảo từ nguồn: https://proandroiddev.com/progressive-image-loading-with-rxjava-64bd2b973690