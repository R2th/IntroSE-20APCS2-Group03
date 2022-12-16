## I. Introduction.
Với việc sử dụng barcode([Serial Number](https://en.wikipedia.org/wiki/Serial_number), [QR](https://en.wikipedia.org/wiki/QR_code) ,...) trong các hệ thống ứng dụng nhằm hỗ trợ việc quản lý, xác thực, truy cập đến các tính năng, tiện ích,... một cách dễ dàng, nhanh chóng, tiện lợi ngày càng được phổ biến rộng rãi.
Hình ảnh người dùng cầm smart phone để quét QR giảm giá, thanh toán, truy cập các dịch vụ trực tuyến, checkin/checkout tham gia các sự kiện xã hội,... đã không còn xa lạ. Đặc biệt, nhu cầu ngày càng tăng cao trong mùa dịch Covid-19 nhằm hỗ trợ mọi người checkin/checkout tại các địa điểm phải lui tới(phục vụ quản lý, theo dõi hành trình di chuyển) hay thanh toán thay tiền mặt cho các dịch vụ cá nhân,... nhằm hạn chế việc lây lan, bùng phát dịch bệnh.

<br /><div align="center"><img src="https://images.viblo.asia/be7adeb9-c59b-4122-9f60-a7f437175f03.png" /></div><br />
Các ứng dụng trên mobile nói chung, và Android nói riêng luôn phải tăng cường độ sáng cho các màn hình sử dụng barcode này nhằm hỗ trợ việc quét Barcode một cách dễ dàng và chính xác.
Vì tần suất sử dụng cao, lại là tính năng dễ gây ảnh hưởng tới thói quen sử dụng thiết bị của người dùng(Người dùng thường để độ sáng màn hình thấp nhằm bảo vệ mắt, hoặc tiết kiệm năng lượng) mà việc tăng giảm độ sáng của ứng dụng trong các trường hợp này cần đặc biệt lưu tâm. Tránh sự bực bội, khó chịu cho người dùng.

Việc quét barcode xong, thoát khỏi khỏi ứng dụng mà màn hình vẫn sáng trưng(100%), hoặc mỗi khi truy cập/thoát khỏi tính năng mà độ sáng tăng/giảm đột ngột sẽ là một điểm trừ rất lớn cho ứng dụng của bạn trong mắt người dùng.
Không những vậy, một số ứng dụng còn đòi hỏi một số quyền trời ơi đất hỡi, gây khó hiểu mỗi khi màn hình này được bật lên.

Chính vì vậy, hôm nay mình sẽ trình bày với các bạn về cách thức tăng/giảm độ sáng màn hình ứng dụng hợp lý nhằm tránh khỏi những hiện tượng người dùng quay lưng với ứng dụng như trên.

## II. Create Utility Classes(Chuẩn bị source code).
Đầu tiên, mình xin giải thích qua về cơ chế và một số lưu ý khi tăng giảm độ sáng của màn hình ứng dụng trên thiết bị Android.
1. Để đảm bảo không phải request bất cứ quyền nào từ người dùng, cũng như không ảnh hưởng đến thiết bị của người dùng mỗi khi thoát khỏi ứng dụng chúng ta sẽ chỉ thay đổi độ sáng trên ứng dụng(cụ thể là window của Activity, cái host các chức năng khác, trong đó có chức năng show barcode). Điều đó đồng nghĩa với việc: **tăng giảm độ sáng của màn hình ứng dụng** nghĩa là mình đang đề đến việc chỉ tăng giảm trong ứng dụng chứ không thay đổi độ sáng trong System Settings. Các bạn chú ý về sau mỗi lần đề cập tăng giảm độ sáng tức là mình đang đề cập tới cái này cho tiện nhé.
2. Các thiết bị Android thường cho phép enable/disable chế độ tự động tăng/giảm độ sáng nhằm thích nghi với môi trường sử dụng điện thoại => Chúng ta sẽ cần phải xử lý theo cả hai trường hợp trên.

Để đáp ứng được những đòi hỏi trên, mình đã tạo ra một file **BrightnessUtils** với nội dung như sau:

```
enum class BrightnessUtils : BrightnessHelper {
    /**
     * This one just keep BrightnessUtils/BrightnessHelper is a singleton instance.
     * A singleton instance without members. Notice:
     * Call {@link jp.co.shiseido.cledepeaubeaute.utils.brightness.BrightnessUtils.Companion.init(context: Context) } method instead.
     */
    INSTANCE;

    private var context: Context? = null

    /**
     * @return true if Device's auto brightness mode is on otherwise @return false.
     */
    override fun isAutoBrightnessMode(): Boolean {
        var brightness = 0
        context?.let {
            try {
                brightness = Settings.System.getInt(
                    it.contentResolver,
                    Settings.System.SCREEN_BRIGHTNESS_MODE,
                    Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC
                )
            } catch (e: SettingNotFoundException) {
                e.printStackTrace()
            }
        }
        return brightness != 0
    }

    /**
     * retrieve Device's system brightness value
     * @return sysBrightnessValue : The brightness value in the device's system setting.
     */
    override fun retrieveSystemBrightnessValue(): Float {
        var brightness = 0
        context?.let {
            try {
                brightness =
                    Settings.System.getInt(it.contentResolver, Settings.System.SCREEN_BRIGHTNESS)
            } catch (e: SettingNotFoundException) {
                e.printStackTrace()
            }
        }
        sysBrightnessValue = brightness / 255F
        return sysBrightnessValue
    }

    companion object {
        var sysBrightnessValue = 0F
        var currentAppBrightnessValue = 0F
        var isMaxBrightness = false
        var brightnessUpIsChanging = false
        var brightnessIsRestoring = false

        /**
         * initialize members and retrieve singleton instance.
         */
        fun init(context: Context): BrightnessUtils {
            INSTANCE.context = context
            sysBrightnessValue = INSTANCE.retrieveSystemBrightnessValue()
            currentAppBrightnessValue = INSTANCE.retrieveSystemBrightnessValue()
            if (INSTANCE.retrieveSystemBrightnessValue() == 1F) isMaxBrightness = true
            return INSTANCE
        }
    }
}

/**
 * change brightness value for App's window
 * @param brightnessValue: the brightness value wanted to set for the App.
 */
fun Window.changeAppScreenBrightnessValue(brightnessValue: Float) {
    isMaxBrightness = brightnessValue == 1.0F
    currentAppBrightnessValue = brightnessValue
    val layoutParams = this.attributes
    layoutParams.screenBrightness = brightnessValue
    this.attributes = layoutParams
}

/**
 * restore brightness while the Auto Brightness Mode is on
 */
private fun Window.restoreBrightnessOverrideMode() {
    val layoutParams = this.attributes
    layoutParams.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE
    this.attributes = layoutParams
}

/**
 * set full brightness while the Auto Brightness Mode is on
 */
private fun Window.overrideFullBrightness() {
    val layoutParams = this.attributes
    layoutParams.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_FULL
    this.attributes = layoutParams
}

val changeBrightnessHandler = Handler()
var changeToMaxRunnable = Runnable { }
var changeToDefaultRunnable = Runnable { }

/**
 *  setup max brightness for the App.
 */
fun Window.changeMaxBrightness() {
    if (isMaxBrightness) return
    if (brightnessUpIsChanging) return

    // Change screen brightness while the Auto Brightness Mode is on
    if (BrightnessUtils.init(context).isAutoBrightnessMode()) {
        overrideFullBrightness()
        isMaxBrightness = true
        return
    }

    // cancel brightness restoring before change it.
    if (brightnessIsRestoring) {
        brightnessIsRestoring = false
        changeBrightnessHandler.removeCallbacks(changeToDefaultRunnable)
    }

    // Otherwise change screen brightness while the Auto Brightness Mode is off
    changeToMaxRunnable = object : Runnable {
        override fun run() {
            currentAppBrightnessValue += 0.07f
            changeAppScreenBrightnessValue(currentAppBrightnessValue)
            if (currentAppBrightnessValue < 1.0f) {
                brightnessUpIsChanging = true
                changeBrightnessHandler.postDelayed(this, 100)
            } else {
                changeAppScreenBrightnessValue(1.0f)
                currentAppBrightnessValue = sysBrightnessValue
                isMaxBrightness = true
                brightnessUpIsChanging = false
                changeBrightnessHandler.removeCallbacks(this)
            }
        }
    }
    changeBrightnessHandler.postDelayed(changeToMaxRunnable, 0)
}

/**
 * restore brightness follow system settings.
 */
fun Window.changeBrightnessToDefault() {
    if (brightnessIsRestoring) return

    // Change screen brightness while the Auto Brightness Mode is on
    if (BrightnessUtils.init(context).isAutoBrightnessMode()) {
        restoreBrightnessOverrideMode()
        isMaxBrightness = false
        return
    }

    // cancel brightness up before restore it.
    if (brightnessUpIsChanging) {
        brightnessUpIsChanging = false
        changeBrightnessHandler.removeCallbacks(changeToMaxRunnable)
    }

    // Otherwise change screen brightness while the Auto Brightness Mode is off
    changeToDefaultRunnable = object : Runnable {
        override fun run() {
            currentAppBrightnessValue -= 0.07f
            changeAppScreenBrightnessValue(currentAppBrightnessValue)
            if (currentAppBrightnessValue > sysBrightnessValue) {
                brightnessIsRestoring = true
                changeBrightnessHandler.postDelayed(this, 100)
            } else {
                changeAppScreenBrightnessValue(sysBrightnessValue)
                currentAppBrightnessValue = sysBrightnessValue
                brightnessIsRestoring = false
                isMaxBrightness = false
                changeBrightnessHandler.removeCallbacks(this)
            }
        }
    }
    changeBrightnessHandler.postDelayed(changeToDefaultRunnable, 0)
    changeAppScreenBrightnessValue(sysBrightnessValue)
}
```

File này là một enum singleton, tuy nhiên các bạn sẽ cần phải gọi tới init() method trong companion object nhằm khởi tạo + thiết lập các giá trị mặc định.
Note: Các bạn hoàn toàn có thể dễ dàng inject class này vào bất cứ nơi nào cần sử dụng thông qua DI(Dagger hoặc Koin).

Mình xin giải thích qua về nội dung của lớp BrightnessUtils theo từng thành phần nội dung bên dưới.

### 1. Các phương thức nội tại của lớp
Các bạn có thể để ý trong code bên trên chúng ta sẽ có hai phương thức nội tại của lớp là: **isAutoBrightnessMode()** và **retrieveSystemBrightnessValue()**.

Phương thức thứ nhất(**isAutoBrightnessMode()**) nhằm xác định xem thiết bị có đang ở chế độ tự động điều chỉnh độ sáng màn hình hay ko?
Điều này là đặc biệt quan trọng vì nó sẽ ảnh hưởng đến cơ chế mà chúng ta sẽ thay đổi độ sáng màn hình ứng dụng về sau.

Phương thức thứ hai(**retrieveSystemBrightnessValue() : Float**) nhằm lấy được giá trị độ sáng đang được thiết lập trong system setting của thiết bị. Giá trị này là một Float value nằm trong khoảng [0,1] và cần cho việc phục hồi lại độ sáng mặc định mỗi khi người dùng thoát khỏi màn hình barcode để di chuyển tới một tính năng khác.

### 2. Các extension functions viết cho Window
Như đã trình bày ở trên, việc thay đổi độ sáng sẽ phụ thuộc vào việc thiết bị có enable tính năng tự động điều chỉnh độ sáng hay không do đó chúng ta cũng có những method riêng để thực hiện điều này.
Mình sẽ giải thích chi tiết từng phần như sau:

#### Thay đổi độ sáng màn hình khi enable chế độ tự động điều chỉnh độ sáng của thiết bị
Khi chế độ tự động điểu chỉnh độ sáng của thiết bị được kích hoạt thì công việc của chúng ta sẽ đơn giản hơn rất nhiều vì ở chế độ này, Android system đã hỗ trợ chúng ta trong việc tăng max độ sáng hoặc phục hồi lại độ sáng tối ưu nhất với môi trường mà người dùng đang sử dụng thiết bị thông qua các cảm biến.

Các bạn có thể kiểm tra trạng thái thiết lập này thông qua thiết lập độ sáng trên status bar.
Hoặc có thể kiểm tra trực tiếp(kiểm chứng thực tế) bằng cách như sau:
1. Giảm độ sáng màn hình xuống rồi đưa màn hình thiết bị vào một nguồn sáng mạnh(Dưới ánh sáng đèn học, ánh sáng mạnh từ ánh sáng mặt trời phía cửa sổ,...). Khi đó độ sáng màn hình sẽ tự động được Android system tăng lên để bạn có thể nhìn rõ hơn.
2. Ngược lại, bạn đưa màn hình này vào dưới nguồn sáng thấp hơn, Android System sẽ tự động giảm độ sáng màn hình xuống để bạn đỡ chói mắt.

Note: Nếu màn hình của bạn đang được bật chế độ auto adjust brightness(Tự động điều chỉnh độ sáng màn hình) mà độ sáng không thay đổi khi thực hiện các bước trên thì xin chia buồn với bạn: Thiết bị của bạn đã bị lỗi cảm biến, hoặc .... :D (cwl)

Trở lại với code.
Để tăng max độ sáng màn hình ứng dụng chúng ta sử dụng extension function cho Android Window như sau:

```
/**
 * set full brightness while the Auto Brightness Mode is on
 */
private fun Window.overrideFullBrightness() {
    val layoutParams = this.attributes
    layoutParams.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_FULL
    this.attributes = layoutParams
}
```

Để restore lại độ sáng ban đầu các bạn đơn giản chỉ cần sử dụng method:

```
/**
 * restore brightness while the Auto Brightness Mode is on
 */
private fun Window.restoreBrightnessOverrideMode() {
    val layoutParams = this.attributes
    layoutParams.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE
    this.attributes = layoutParams
}
```

Okay. Fine! Công việc khá là đơn giản có phải không? :D

#### Thay đổi độ sáng màn hình khi disable chế độ tự động điều chỉnh độ sáng của thiết bị.
Ở đây chúng ta sẽ phải xử lý nhọc hơn một xíu do không có sự hỗ trợ từ hệ điều hành, hay có thể nói là tất cả đều phải xử lý bằng cơm.

Để thay đổi độ sáng về cơ bản ta sẽ thay đổi độ sáng của Window(window của Activity, cái host các features khác) bằng phương thức sau:

```
/**
 * change brightness value for App's window
 * @param brightnessValue: the brightness value wanted to set for the App.
 */
fun Window.changeAppScreenBrightnessValue(brightnessValue: Float) {
    isMaxBrightness = brightnessValue == 1.0F
    currentAppBrightnessValue = brightnessValue
    val layoutParams = this.attributes
    layoutParams.screenBrightness = brightnessValue
    this.attributes = layoutParams
}
```

Giá trị của độ sáng sẽ nằm trong khoảng [0,1] tương ứng với 1.0 là max và 0.0 là min.

Tuy nhiên chúng ta không thể chỉ sử dụng trực tiếp function này để mà cập nhật độ sáng được, vì nó sẽ làm cho độ sáng bị tăng/giảm đột ngột => Làm giảm trải nghiệm tích cực của người dùng.
Chính vì thế mà chúng ta phải xử lý cho độ sáng tăng dần cũng như kết hợp với auto brightness adjust mode bằng hai extension functions: **Window.changeMaxBrightness()** và **Window.changeBrightnessToDefault()**.

Mã nguồn cụ thể như sau:

```
/**
 *  setup max brightness for the App.
 */
fun Window.changeMaxBrightness() {
    if (isMaxBrightness) return
    if (brightnessUpIsChanging) return

    // Change screen brightness while the Auto Brightness Mode is on
    if (BrightnessUtils.init(context).isAutoBrightnessMode()) {
        overrideFullBrightness()
        isMaxBrightness = true
        return
    }

    // cancel brightness restoring before change it.
    if (brightnessIsRestoring) {
        brightnessIsRestoring = false
        changeBrightnessHandler.removeCallbacks(changeToDefaultRunnable)
    }

    // Otherwise change screen brightness while the Auto Brightness Mode is off
    changeToMaxRunnable = object : Runnable {
        override fun run() {
            currentAppBrightnessValue += 0.07f
            changeAppScreenBrightnessValue(currentAppBrightnessValue)
            if (currentAppBrightnessValue < 1.0f) {
                brightnessUpIsChanging = true
                changeBrightnessHandler.postDelayed(this, 100)
            } else {
                changeAppScreenBrightnessValue(1.0f)
                currentAppBrightnessValue = sysBrightnessValue
                isMaxBrightness = true
                brightnessUpIsChanging = false
                changeBrightnessHandler.removeCallbacks(this)
            }
        }
    }
    changeBrightnessHandler.postDelayed(changeToMaxRunnable, 0)
}
```

Ở đây các bạn cần chú ý tới:
1. Thay đổi độ sáng trong trường hợp tính năng tự động điều chỉnh độ sáng của thiết bị được bật.
2. Hủy quá trình tăng/giảm độ sáng trong trường hợp đang xử lý mà có hành động ngược lại xảy ra. VD: Vừa vào màn barcode, chưa thay đổi độ sáng max đã bị đóng lại ngay lập tức.
3. Xử lý tăng/giảm độ sáng bằng Handler.

Điều này là tương tự đối với quá trình phục hồi độ sáng ban đầu. Các bạn có thể xem thêm trong source code.

## III. Change App Brightness everywhere(Các bước triển khai trong ứng dụng).
Okay. Qua bước chuẩn bị bên trên là chúng ta đã có đủ các thứ cần thiết + cơ sở lý thuyết để thay đổi độ sáng màn hình ứng dụng rồi. Bây giờ đến lúc triển khai thực tế cho ứng dụng thôi. :)

### 1. Adapt với sự thay đổi độ sáng màn hình trong System Settings.
Bước này là một bước rất quan trọng, nhằm đảm bảo ứng dụng của chúng ta có thể thích nghi + cập nhật chính xác độ sáng cho ứng dụng mỗi khi người dùng/hệ thống(một cách tự đông) thay đổi giá trị độ sáng trong system settings.

Để thực hiện điều này, chúng ta cần đăng kí lắng nghe sự thay đổi giá trị độ sáng trong system settings và thiết lập lại cho ứng dụng thôi. Quá trình thực hiện như sau:

#### 1. Tạo observer để lắng nghe sự thay đổi độ sáng từ System Settings.
Bước đầu tiên, chúng ta tạo một observer để lắng nghe sự thay đổi giá trị độ sáng từ system settings rồi cập nhật cho ứng dụng của mình như sau:

```
/**
 * This observer listens for changes in system brightness settings and then sets its value for the Application's window.
 */
private val brightnessObserver: ContentObserver =
    object : ContentObserver(Handler()) {
        override fun onChange(selfChange: Boolean) {
            super.onChange(selfChange)
            Timber.i("mBrightnessObserver")
            // TODO: change application brightness follow the system brightness value
            window.changeAppScreenBrightnessValue(brightnessUtils.retrieveSystemBrightnessValue())
        }

        override fun deliverSelfNotifications(): Boolean {
            return true
        }
    }
```


#### 2. Đăng kí/Hủy việc theo dõi giá trị độ sáng màn hình từ System Settings.
Ở đây chúng ta chỉ cần đăng kí/hủy việc theo dõi  giá trị độ sáng màn hình trong system settings theo các phương thức vòng đời tương ứng.

```
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        observerBrightnessChange()
    }

/**
 * observer the system brightness change.
 */
private fun observerBrightnessChange() {
    // setup current App brightness value = brightness value from system settings.
    brightnessUtils.retrieveSystemBrightnessValue()
    // register brightness change from system settings.
    contentResolver?.registerContentObserver(
        Settings.System.getUriFor(SCREEN_BRIGHTNESS),
        false,
        brightnessObserver
    )
}

override fun onDestroy() {
    // unregister brightness change from system settings.
    contentResolver?.unregisterContentObserver(brightnessObserver)
    super.onDestroy()
}
```

### 2. Thiết lập/phục hồi độ sáng màn hình.
Okay. Đến đây thì mọi thiết lập đã xong. Nếu muốn tăng max/phục hồi lại độ sáng màn hình thì đơn giản chúng ta chỉ cần lấy window ra, và phang giá trị cho nó thôi là ok. :D
Example: Trong Fragment cái show barcode:

```
override fun onResume() {
    super.onResume()
    // set max brightness
    requireActivity().window.changeMaxBrightness()
}
```

Còn đây là phục hồi lại độ sáng ban đầu khi rời khỏi màn hình này:

```
override fun onDestroyView() {
    // restore brightness to default
    requireActivity().window.changeBrightnessToDefault()
    super.onDestroyView()
}
```

## IV. Conclusion
Như vậy đến đây mình đã trình bày một cách chi tiết về quá trình thay đổi độ sáng màn hình ứng dụng mang nhiều thiện cảm nhất tới cho người dùng của bạn. <br />
Mã nguồn bạn có thể đục khoét ở đây: [Github](https://github.com/DanhDue/AndroidGenericAdapter) <br />
Clip, upvote, leave a comment nếu bài viết có ích đối với bạn.

{>;} Happy coding!