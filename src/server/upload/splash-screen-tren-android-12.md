Chào các bạn lại là mình đây :grinning::laughing:. Vậy là đã sắp tới ngày Android 12 release bản chính thức rồi, bản beta 5 đã có thể cho chúng ta tải về và test các chức năng mới có thể ảnh hưởng đến app của mình hay không.

Trong số những tính năng mới thì về UI mình thấy có một phần mới là về phần màn hình Splash. Bình thường mỗi app chúng ta phát triển đều phải tự làm một màn Splash riêng do mình custom. Nay Google lại cấp sẵn cho ta một Splash luôn :thinking: :thinking: . Vậy hãy cùng mình xem thử có gì hay ở màn splash này nhé.

![](https://images.viblo.asia/d1af8c75-2f87-47ff-b554-a96f6bcb65f1.jpg)

# 1. Màn Splash mới hoạt động như thế nào ?
Khi một app khởi chạy thì có thể rơi vào 1 trong các giai đoạn sau: `Cold Start`(app chạy lần đầu), `Warm Start`(Khởi chạy các tiến trình nhưng chưa tạo Activity), màn Splash này sẽ không chạy khi ở giai đoạn `Hot start.`

Khi ứng dụng của chúng ta khởi chạy, cửa sổ bắt đầu trống vẫn còn trên màn hình cho đến khi hệ thống hoàn thành việc vẽ ứng dụng lần đầu tiên.
Ở đây thay vì để một màn hình trống trông khá giống như bug thì Google đã custom nó bằng việc hiển thị icon app giống như một màn hình Splash của chúng ta trước đó.

## Cold Start
Quá trình này xảy ra trong các trường hợp chẳng hạn như ứng dụng của bạn được khởi chạy lần đầu tiên kể từ khi thiết bị khởi động hoặc kể từ khi hệ thống kill app. 
Ở thời điểm này hệ thống và ứng dụng phải khởi động nhiều tác vụ bao gồm các task chính sau:
* Loading và khởi động app.
*  Hiển thị 1 cửa sổ trống cho ứng dụng ngay sau khi khởi chạy.
* Khởi tạo và chạy các process liên quan cho app.

Ngay sau khi hệ thống tạo các process cho app, các process này sẽ chịu trách nhiệm cho các giai đoạn tiếp theo:

*  Tạo đối tượng.
* Khởi chạy MainApplication.
* Khởi chạy MainActivity.
* Khởi chạy các view.
* Bố trí view trong các layout.
* Và chạy các fragment theo thứ tự từ app.

![](https://images.viblo.asia/3f1ae53b-87b2-4ce7-9fc0-632e75f0b11c.png)

## Hot start
Hoạt động này thì đơn giản hơn và ít tốn tài nguyên hơn so với `Cold start`. Khi mới bắt đầu, tất cả những gì hệ thống làm là đưa `Activity` của chúng ta lên hàng đầu của `Stack`. Nếu tất cả các `Activity` của ứng dụng vẫn nằm trong bộ nhớ, thì ứng dụng có thể tránh phải lặp lại quá trình khởi tạo đối tượng, lạm phát bố cục và hiển thị.

`Hot start` hiển thị hành vi trên màn hình giống như `Cold start`: Quy trình hệ thống hiển thị màn hình trống cho đến khi ứng dụng hoàn tất hiển thị hoạt động.

## Warm start
Khởi động này bao gồm một số tập hợp con các hoạt động diễn ra trong thời gian của quá trình `Cold start `nhưng ít tài nguyên hơn so với` Cold start `và nhiều hơn so với `Hot start`.
Ví dụ: Khi đưa app xuống background một thời gian dài, hệ thống tự loại bỏ ứng dụng ra khỏi bộ nhớ Stack hiện tại, khi đó các tác vụ và process cần khởi động lại.

# 2. Customize màn Splash screen.
##  Những thứ có thể customize
Theo như tài liệu gốc của Google thì chúng ta có thể custom màn Splash này với 4 thuộc như sau:
![](https://images.viblo.asia/0dc0e728-d862-4e9b-813a-92b8612f060f.png)

*  Ở mục (1) là icon của app, có thể tĩnh hoặc động, và mà hình này chỉ hiển thị cho chúng ta tối đa là 1000 miliseconds.
*  Mục (2) là Background của icon.
* Mục (3) là Background thứ 2 của icon, nhưng phần này thường không hiển thị lên.
* Mục (4) là Background cúa cả màn Splash. Ở đây, Theme của app là màu nào thì màn Splash này sẽ có background tương ứng, nếu màn này không set màu nào.
* Animation cúa màn Splash.
## Customize demo
Để chỉ ra một màu mà mình mong muốn sử dụng thuộc tính sau và set trong file `style.xml` :
```Kotlin
<item name="android:windowSplashScreenBackground">@color/white</item>
```

Để thay đổi icon tĩnh hoặc động ta dùng thuộc tính:
```Kotlin
<item name="android:windowSplashScreenAnimatedIcon">@drawable/ic_launcher_foreground</item>
```

Và nếu icon này có animation thì ta sẽ có thể một thuộc tính nữa để set duration cho icon này:

```Kotlin
<item name="android:windowSplashScreenAnimationDuration">1000</item>
```

Muốn set màu cho background của icon tức là mục số (2) thì dùng thuộc tính:

```Kotlin
<item name="android:windowSplashScreenIconBackground">@color/black</item>
```

Ngoài ra còn một thuộc tính đó là khi muốn hiển thị một icon phụ bên dưới icon chính, hoặc một ảnh chứa tên một brand nào đó, ta có thể dùng thuộc tính sau:

```Kotlin
<item name="android:windowSplashScreenBrandingImage">@drawable/ic</item>
```

Nếu bạn muốn hiển thị màn Splash lâu hơn và còn muốn có cả animation nữa thì sao, yên tâm là Google đã support hết rồi nhé.

```Kotlin
       splashScreen.setOnExitAnimationListener{ splashScreen ->
            // Tạo animaiton cho màn.
            val slideUp = ObjectAnimator.ofFloat(
                splashScreen,
                View.TRANSLATION_Y,
                0f,
                -splashScreen.width.toFloat()
            )
            slideUp.interpolator = AnticipateInterpolator()
            slideUp.duration = 10000L

            //Khi kết thúc animation thì gỡ bỏ màn Splash.
            slideUp.doOnEnd { splashScreen.remove() }

            // Chaỵh animation.
            slideUp.start()
        }
```

Thành quả thu được.

![200x300](https://images.viblo.asia/ae9efb48-c987-4e66-9513-a86edd59bd20.png)

Cảm ơn các bạn đã đọc bài viết này :heart_eyes: , chúc các bạn ngày mới tốt lành :hugs: 

# 3. Tham khảo

> https://developer.android.com/about/versions/12/features/splash-screen