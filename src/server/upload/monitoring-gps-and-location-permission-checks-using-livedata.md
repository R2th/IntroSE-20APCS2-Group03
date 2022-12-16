## Introduction

Trong dự án gần đây, chúng tôi làm việc trên một ứng dụng di động nhằm chiến đấu với lỗi lo sợ những chiếc xe điện bởi quá trình tìm hiểu sự cần thiết của người dùng, quá trình cung cấp cho chủ sở hữu dữ liệu thời gian thực về phương tiện của họ đồng thời cung cấp một mô hình nhằm đánh giá sự phù hợp của phương tiện xe điện. Để làm cho những thứ đó xảy ra, quá trình theo dõi hành vi lái xe thông qua ứng dụng là một khía cạnh cần thiết của project. Nó có nghĩ là ứng dụng nên có khả năng luôn luôn lắng nghe tọa độ vị trí trong một luồng thực thi ngầm trong suốt hành trình của người dùng trong khi lái xe.

Chúng tôi phải thực hiện kiểm tra nhằm đảm bảo GPS được kích hoạt trên thiết bị và Location Permission được cấp bởi người dùng. Nó là điểm quan trọng nổi bật đồng thời là cần thiết để đảm bảo ứng dụng có thể thực hiện Location Tracking trong suốt quá trình lái xe.

## Use Case

Hình dung một kịch bản khi người dùng cài đặt ứng dụng, đi qua hành trình và có thể cấp phép Location Permission nhưng bỏ qua dialog cái thúc đẩy quá trình kích hoạt GPS. Hoặc tồi tệ hơn, người dùng không cấp phép quyền truy cập hoặc hủy bỏ sau đó vì bất cứ lý do gì. Giờ đây nó là an toàn nhằm đảm bảo rằng người dùng ngay cả sẽ quên về ứng dụng mới được cài đặt và mục tiêu dự định không đạt được.

Ván cược tốt nhất của chúng ta đó là cho biết bằng mắt khi ứng dụng đang trong cận cảnh để mà khuyến khích người dùng thực hiện một hoặc đồng thời các yếu tố cần thiết. Điều này chỉ có thể khi UI(Activity/Fragment) có thể lắng nghe sự thay đổi GPS và Runtime Permission cũng như tương tác lại một cách chính xác.

Tôi đã đối mặt với một vài thách thức trong khi đang thực hiện điều đó và xác định phải chia sẻ quá trình tìm hiểu cũng như giải pháp của mình. Nó không phải là giải pháp tốt nhất từ trước tới nay nhưng là cái làm việc tốt cho tới giờ và tôi sẽ trở nên hạnh phúc và biết ơn hơn khi nghe thấy những phản hồi về việc làm cho nó trở nên tốt hơn.

Trước khi di chuyển tới phần thực hiện, tôi muốn đề cập rằng team của chúng tôi đã quyết định sử dụng Architecture Components do đó nó là lựa chọn tự nhiên nhằm đáp ứng với LiveData trong quá trình thực hiện những lắng nghe GPS và Permission.

***LiveData là một Observable data holder and lifecycle-aware. Nó cho phép các thành phần trong ứng dụng của bạn thường là UI lắng nghe các thay đổi của các đối tượng dữ liệu***.

## Listening to GPS Status

Người dùng có thể thường xuyên enable hoặc disable GPS trên thiết bị của họ.

### Implementing GPS LiveData

Chúng ta phải kế thừa LiveData nhằm tạo cho mình một LiveData tùy biến.
```
class GpsStatusListener(private val context: Context) : LiveData<GpsStatus>() {}
```

**GpsStatus** là một sealed class và phản ánh các trạng thái enable hoặc disable.

***Sealed classes là thích hợp khi một giá trị có thể có một hoặc nhiều loại từ một bộ giới hạn, nhưng không thể có bất cứ loại khác***.

Tôi đọc ở một số nơi rằng [sealed classes ](https://kotlinlang.org/docs/reference/sealed-classes.html)là enums với một vài thứ bị đánh cắp và không thể không đồng ý. Tôi cũng nhận được một vài cảm hứng từ [bài viết](https://articles.caster.io/android/handling-optional-errors-using-kotlin-sealed-classes/) của Craig cái trình bày rằng sealed classes là hoàn hảo khi bạn muốn gửi những mệnh lệnh cho thực thể lắng nghe buộc phải tuân lệnh.

```
sealed class GpsStatus {  
  data class Enabled(val message: Int = R.string.gps_status_enabled) : GpsStatus()
  data class Disabled(val message: Int = R.string.gps_status_disabled) : GpsStatus()
}
```

Hai phương thức rất quan trọng của LiveData đó là **onActive()** và **onInactive()**. Chúng cho phép việc lắng nghe các thay đổi chỉ khi Activity (hoặc bất cứ LifecycleOwner khác) trong trạng thái started hoặc resumed và chỉ khi đó LiveData sẽ phát ra bất cứ items. Nó có nghĩa là không xuất hiện memory leaks và NullPoiterExceptions gây ra bởi vì view không tồn tại.

```
override fun onInactive() = unregisterReceiver()
override fun onActive() {        
    registerReceiver()        
    checkGpsAndReact()    
}
```

Mỗi khi một thay đổi xảy ra trên GPS Provider, **onReceiver()** của Broadcast Receiver sẽ được gọi và trạng thai GpsStatus liên quan sẽ được phát ra cho observer.

```
private val gpsSwitchStateReceiver = object : BroadcastReceiver() {               
   
   override fun onReceive(context: Context, intent: Intent) = checkGpsAndReact()   }
   private fun checkGpsAndReact() = if (isLocationEnabled()) {              
        postValue(GpsStatus.Enabled())    
   } else {        
        postValue(GpsStatus.Disabled())    
   }
}
```

Nếu bạn chú ý, [postValue](https://developer.android.com/reference/android/arch/lifecycle/LiveData.html#postValue(T)) được sử dụng ở đây bởi vì chúng ta cần thiết lập một giá trị từ background thread cũng như một cái thay thế khác sử dụng là [setValue](https://developer.android.com/reference/android/arch/lifecycle/LiveData.html#setValue(T)) khi phương thức cần được gọi từ main thread.

### Observing GPS Status LiveData

Vì mục đích giưới thiệu, một ứng dụng ví dụ trình diễn trạng thái của GPS thông qua title của TextView có thể click và cũng như thông qua một custom dialog.

<div align="center">
    
![Example UI reacting to the disabled state of GPS](https://images.viblo.asia/e78275fc-5c4f-439d-a430-ddc1b801b31d.png)<p>Example UI reacting to the disabled state of GPS</p>
    
</div>

Custom LiveData để phô ra thông qua ViewModel

```
val gpsStatusLiveData = GpsStatusListener(application)
```

Nhưng có một lỗ hổng ở đây.

***Suy nghĩ cẩn thận trước khi chia sẻ một thể hiện của LiveData thông qua các consumers***.

Nhớ rằng LiveData gửi đi giá trị cuối cùng cho một observer mới. Do đó tố hơn là phải chăm sóc đặc biệt bạn đang sử dụng Dagger cho Dependency injection bởi vì tôi đã gặp một sai lầm về việc sử dụng @Singleton scope và phải mất một thời gian gỡ rối cho một hành vi kì lạ.

Để bắt đầu lắng nghe các thay đổi trong activity ví dụ trong trường hợp của tôi, bạn phải lắng nghe nó. Cũng như truyền tới **observer()** nhằm chỉ rõ rằng activity của chúng ta là LificycleOwnser và là observer ở đây. Chúng ta không phải quan tâm về việc  hủy đăng kí bởi vì nó được xử lý bởi Android.

```
private fun subscribeToGpsListener() = viewModel.gpsStatusLiveData.observe(this, gpsObserver)
```

gpsObserver là nơi bạn sẽ chỉ ra làm thế nào UI sẽ phản ứng lại với những thay đổi trạng thái của GPS. Tôi muốn làm nổi bật rằng Sealed classes kết hợp rất tuyệt vời với biểu thức when.

```
private val gpsObserver = Observer<GpsStatus> { 
    status -> status?.let {
        when (status) {
            is GpsStatus.Enabled -> { 
                //Update UI Accordingly 
            }            is GpsStatus.Disabled -> { 
                //Update UI Accordingly 
            }
        }
    }    
}
```

## Listening to Runtime Permission Status

Bắt đầu từ Android 6.0 và cao hơn, mọi ứng dụng bị yêu cầu hỏi người dùng về việc cấp phép quyền truy cập tới một hoặc nhiều cái được gọi là [dangeous permission](https://developer.android.com/guide/topics/permissions/overview#permission-groups). Nó là lẽ tường để gợi ý người dùng trong suốt hành trình và cũng nhắc lại nó mỗi lần một hoạt động được thực hiện cái đòi hỏi permission.

***Bắt đầu từ Android 6.0 (API level 23), người dùng có thể hủy bỏ các permission từ bất cứ ứng dụng nào tại bất cứ thời điểm nào ngay cả với những ứng dụng có target thấp hơn API level này***.

<div align="center">

![Android request permission](https://images.viblo.asia/e78275fc-5c4f-439d-a430-ddc1b801b31d.png)<p>Android request permission</p>

</div>


### Implementing Runtime Permission LiveData

Tương tự, chúng ta phải kế thừa LiveData nhằm tạo cho mình một LiveData tùy biến. Ý tưởng của tôi là tạo một đối tượng generic cái có thể được sử dụng cho bất cứ runtime permission đặc thù nào.

```
class PermissionStatusListener(
     private val context: Context,                                   
     private val permissionToListen: String) : LiveData<PermissionStatus>() {}
```

**PermissionStatus** là một sealed class và phản ánh các trạng thái granted, denied, và blocked.

```
sealed class PermissionStatus {
    data class Granted(val message: Int = R.string.permission_status_granted) : PermissionStatus()
    data class Denied(val message: Int = R.string.permission_status_denied) : PermissionStatus()
    data class Blocked(val message: Int = R.string.permission_status_blocked) : PermissionStatus()
}
```

Mỗi khi **PermissionStatusListener** được gọi, nó kiểm tra trạng thái hiện tại của runtime permission được truyền tới LiveData

```
override fun onActive() = handlePermissionCheck()private fun handlePermissionCheck() {
    val isPermissionGranted = ActivityCompat.checkSelfPermission(context, permissionToListen) == PackageManager.PERMISSION_GRANTED
    
if (isPermissionGranted)
     postValue(PermissionStatus.Granted())
else
     postValue(PermissionStatus.Denied())
}
```

### Observing Runtime Permission LiveData

Đối với trường hợp của chúng ta, chúng ta chỉ quan tâm đến [Location Permission](https://developer.android.com/reference/android/Manifest.permission#ACCESS_FINE_LOCATION). Chúng ta cố tình tạo một optional(không bắt buộc) cho người dùng trong khi tham gia hành trình điều đó có nghĩa là chúng ta sẽ cần luôn luôn kiểm tra nó trước khi thực hiện location tracking. Chi tiết hơn cho vấn đề này sẽ được giới thiệu ở phần tiếp theo.

Cũng như, Location Permission được kiểm tra trước và sau khi GPS và dialog được giữ cho xuất hiện mỗi khi người dùng đưa ứng dụng vào trạng thái foreground. Điều này là hiển nhiên chỉ để trình bày làm thế nào UI có thể phản ứng lại với nó.
<br />

<div align="center">
    
![](https://images.viblo.asia/3f209136-f1e5-4531-8539-99abe04bbb2b.png)
    
</div>

Custom LiveData được phát hành thông qua ViewModel

```
val locationPermissionStatusLiveData = PermissionStatusListener(application,      Manifest.permission.ACCESS_FINE_LOCATION)
```

Permission đã được truyền tới PermissionStatusListener nên tương ứng với cái được định nghĩa trong AndroidManifest.xml.

```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

Để bắt đầu lắng nghe sự thay đổi trong Activity ví dụ, bạn phải observer nó. *permissionObserver* trình bày làm thế nào để phản ứng lại với các trạng thái khác.

```
private val permissionObserver = Observer<PermissionStatus> { 
status ->
    status?.let {
        updatePermissionCheckUI(status)
        when (status) {
            is PermissionStatus.Granted -> handleGpsAlertDialog()
            is PermissionStatus.Denied -> showLocationPermissionNeededDialog()
        }
    }
}private fun subscribeToLocationPermissionListener() =            viewModel.locationPermissionStatusLiveData.observe(this, permissionObserver
```

Tôi đang sử dụng [Permission](https://github.com/nabinbhandari/Android-Permissions) library để xử lý quá trình yêu cầu permission trong ứng dụng, quá trình gọi native dialog và phản ứng lại với những callbacks dựa trên input của người dùng. Tôi thấy nó nhẹ, dễ sử dụng và có thể tùy biến và tôi đã thích nó trong lúc thực hiện những business logic của mình.

```
Permissions.check(this,
        Manifest.permission.ACCESS_FINE_LOCATION,
        null,
        permissionHandler)//Permission callbacks 
private val permissionHandler = object : PermissionHandler() {
    override fun onGranted() {
    }override fun onDenied(context: Context?, deniedPermissions: ArrayList<String>?) {
    }override fun onJustBlocked(
        context: Context?,
        justBlockedList: ArrayList<String>?,
        deniedPermissions: ArrayList<String>?
    ) { 
    }
}
```

Mã nguồn đầy đủ có trên [github repo](https://github.com/ki-labs/gps-permission-checks-livedata/).

## Updated Use Case

Ở bên trên, chúng ta đã học cách làm thế nào để thực hiện các kiểm tra sử dụng LiveData và lắng nghe chúng ở phía UI.
Tiếp theo, chúng ta sẽ cố gắng khám phá làm thế nào có thể sử dụng nó khi mà ứng dụng của chúng ta ở trạng thái background.

Hình dung một ngữ cảnh khi người dùng cái đặt ứng dụng, đi qua các tính năng chính, cấp phép Location Permission và bật GPS khi được yêu cầu. Vẫn có rủi ro xảy ra khi người dung có thể thu hồi lại quyền bất cứ khi nào trong tương lai vì bất cứ lý do nào đó. Thậm chí tệ hơn, người dung bắt đầu lái xe mà không bật GPS. Những hành trình đó sẽ không bao giờ có thể được theo dõi và ứng dụng sẽ không thể thực hiện theo đúng mục tiêu dự định của nó.

## Listening to GPS and Location Permission Status

**Location Tracking** được thực hiện như là một LocationService bởi vì điều này đáng lẽ ra phải được chạy ngầm và lắng nghe những cập nhật vị trí từ **FusedLocationProviderClient**.

***Nếu service được khởi chạy và chạy trong một thời gian dài, hệ thống sẽ giảm vị trí của nó trong danh sách các background tasks theo thời gian, và khả năng cao service sẽ bị kill***.

Chỉ có giải pháp là tạo một server chạy ngầm và nó cần show ra một thống báo đang thực thi trên [status bar](https://developer.android.com/guide/topics/ui/notifiers/notifications.html). Nếu ứng dụng của bạn có target API level 26 hoặc cao hơn, đọc thêm về những quy tắc được cập nhật để start một service. Ngoài ra, các ứng dụng có target là Android 9(API level 28) hoặc cao hơn, sử dụng foreground services cần yêu cầu quyền [FOREGROUND_SERVICE](https://developer.android.com/reference/android/Manifest.permission.html#FOREGROUND_SERVICE) permission.

<div align="center">
    
![Foreground Notification nhằm thông báo tới người dùng khi quá trình theo dõi vị trí đang được thực hiện.](https://images.viblo.asia/ee2c0666-636e-4621-96f7-96ecdc69b858.jpeg)<p>Foreground Notification nhằm thông báo tới người dùng khi quá trình theo dõi vị trí đang được thực hiện.</p>
    
</div>

Như lúc trước, chúng ta có thể lắng nghe LiveData trong Activity bởi vì nó triển khai [LifecycleOwner](https://developer.android.com/reference/android/arch/lifecycle/LifecycleOwner) interface.

<div align="center">
    
![](https://images.viblo.asia/9c506fb6-38c4-4376-a7bd-fd8504931c21.png)
    
</div>

Trong trường hợp của chúng ta, chúng ta cần lắng nghe những thay đổi từ GPS và Runtime Permission LiveData bên trong LocationService. Nếu bạn đọc comments trong lớp LifecycleOwner bạn sẽ để ý thấy rằng nó không đề cập tới Service như là một ứng cử viên. Bây giờ phải làm ntn?

<div align="center">
    
![](https://images.viblo.asia/17b8ea40-dbe8-48ed-a1c3-7de039e2c57a.jpeg)
    
</div>

Theo chủ kiến cá nhân, có sự rắc rối khi mà Android không làm nó đủ nổi bật về mã nguồn và tài liệu cũng như xem nhẹ nó điều sẽ giúp các nhà phát triển tiết kiệm được thời gian.

```
class LocationService : LifecycleService() {}
```

Trên thực tế, Service này nên bắt đầu mỗi khi một hành động lái xe được xác định nhưng phần đó được thực hiện nằm ngoài phạm vị của việc làm thế nào để lắng nghe các tọa độ vị trí. Chúng ta cố gắng giả lập rằng phần này sử dụng các button trong một ứng dụng ví dụ cho mục đích demo.

Nếu tại thời điểm sự kiện start service bắt đầu, một hoặc nhiều yêu cầu là không đầy đủ thì các thông báo tương ứng được tạo và service bị dừng lại. Điều tương tự cũng xảy ra khi service đã sẵn sàng chạy trong khi GPS bị tắt hoặc Location permission bị thu hồi.

<div align="center">
    
![](https://images.viblo.asia/b9ba3107-b734-41a8-8b4e-3764b20d39f7.png)
    
</div>

## Observing both LiveData

Trong giai đoạn khởi tạo, chúng ta cần làm một số điều gì đó giống như điều này khi ứng dụng có thể phản ứng dựa trên đồng thời các luồng. Mục tiêu dự định là cập nhật text nếu cả hai không được cung cấp. Để demo, Tôi đang tạo hai thông báo riêng biệt. Ngoài ra, quá trình hủy đăng kí việc lắng nghe cập nhật vị trí cũng là quan trọng ngay cả nếu một trong số chúng không được cung cấp bởi vì nó không phục vụ bất cứ mục đích nào.

```
private val gpsObserver = Observer<GpsStatus> {
    status -> status?.let { handleGpsStatus(status) }
}private val permissionObserver = Observer<PermissionStatus> { 
    status -> status?.let { handlePermissionStatus(status) }
}
```

Vấn đề với cách thức này đó là nó thêm vào sự phức tạp không cần thiết khi cố gắng xử lý đồng thời các luồng riêng biệt cái có thể xảy ra một các độc lập với mỗi cái khác. Trong thực tế, một tình huống lý tưởng sẽ là nếu chúng ta có thể tương tác với cả hai luồng cùng lúc như là nếu nó làm một [Pair](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-pair/index.html) của đồng thời các trạng thái.

```
private val pairObserver = Observer<Pair<PermissionStatus, GpsStatus>> { 
    pair -> pair?.let {
        handlePermissionStatus(pair.first)
        handleGpsStatus(pair.second)
    }
}
```

Để làm cho điều này xảy ra, chúng ta sẽ thực hiện điều này mới một cách thức khác và may thay Architecture Components có một số thức cho chúng ta.

***MediatorLiveData là một lớp con của LiveData cái có thể lắng nghe các đối tượng LiveData khác và tương tác dựa trên các sự kiện thay đổi từ chúng.***

Với một MediatorLiveData, chúng ta có thể tương tác với ***GpsStatus*** phát ra bởi ***GpsStatusListener*** và ***PermissionStatus*** phát ra bởi ***PermissionStatusListener***. Tôi đã tìm ra một cách thức rất phù hợp ở [đây](https://gist.github.com/magneticflux-/044c9d7a3cea431aa0e4f4f4950a2898) và đã xác định sử dụng nó. Đây là mã nguồn thực hiện điều đó như thế nào:

```
fun <A, B> combineLatest(a: LiveData<A>, b: LiveData<B>): MutableLiveData<Pair<A, B>> {
    return MediatorLiveData<Pair<A, B>>().apply {
        //Code to update values
        var lastA: A? = null
        var lastB: B? = null        fun update() {
            val localLastA = lastA
            val localLastB = lastB
            if (localLastA != null && localLastB != null)
            this.value = Pair(localLastA, localLastB)
        }        addSource(a) {
            lastA = it
            update()
        }
        addSource(b) {
            lastB = it
            update()
        }
    }
}
```

LiveData kết quả được cập nhật mỗi khi một trong các luồng đầu vào(input streams) được cập nhật và MediatorLiveData thực hiện quá trình hợp nhất các phần này lại cho chúng ta. Đối với những người quen thuộc với RxJava, hành vi này giống như [CombineLastest](http://reactivex.io/documentation/operators/combinelatest.html) function một cách chính xác.

Để lắng nghe LiveData này bên trong LocationService, mã nguồn sẽ trông như thế này với sự trợ giúp của một [extension function](https://kotlin.guide/extension-functions).

```
private lateinit var gpsAndPermissionStatusLiveData: LiveData<Pair<PermissionStatus, GpsStatus>>//onCreate()
gpsAndPermissionStatusLiveData = with(application) {
    PermissionStatusListener(this, Manifest.permission.ACCESS_FINE_LOCATION)
   .combineLatestWith(GpsStatusListener(this))
}//onStartCommand()
gpsAndPermissionStatusLiveData.observe(this, pairObserver)
```

Bạn có thể xem toàn bộ mã nguồn trên [Github](https://github.com/ki-labs/gps-permission-checks-livedata/).

Hy vọng bài viết này sẽ hữu ích cho bạn. Hãy xem các bài viết thú vị khác ở [đây](https://medium.com/ki-labs-engineering).

## Source
https://medium.com/ki-labs-engineering/monitoring-gps-and-location-permission-checks-livedata-part-1-278907344b77?source=post_page-----d8822ab951a6----------------------
https://medium.com/ki-labs-engineering/monitoring-gps-and-location-permission-checks-livedata-part-2-d8822ab951a6

## Reference