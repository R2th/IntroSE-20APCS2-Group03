Admob là nền một trong những tảng kiếm tiền thông qua quảng cáo lớn nhất, tốt nhất hiện nay dành cho ứng dụng di động hoặc game dành cho các thiết bị di động. Hôm nay mình sẽ hướng dẫn cách tích hợp Admob vào trong game Unity và hiển thị 1 banner trên 1 Scene.

Để có thể tích hợp và hiển thị quảng cáo Admob bạn cần download và import Mobile Ads Unity plugin vào project game của bạn.
Hãy tải bản mới nhất [tại đây ](https://github.com/googleads/googleads-mobile-plugins/releases/latest) sau đó import vào project của bạn bằng cách mở Unity Editor, chọn Assets -> Import Package -> Custom Package và tìm đến file `GoogleMobileAdsPlugin.unitypackage`
![](https://images.viblo.asia/e3324320-95b7-464c-b3b8-c12bd5e7da16.png)

Hoặc bạn cũng có thể mở project trong Unity Editor và sau đó tìm đến file `GoogleMobileAdsPlugin.unitypackage`, nhấp đúp để mở package và import.

Chọn tất cả các files để import sau đó nhấn Import
![](https://images.viblo.asia/3cf3614e-1fcb-4954-aae8-6a7a732be2fc.png)


### Include the Mobile Ads SDK
Google Mobile Ads Unity được phân phối cùng với Unity Play Services Resolver library. Nó cung cấp khả anwng khai báo các dependencies, sau đó sẽ tự động resolved và copy vào trong Unity project.

Quay trở lại với Admob, bạn hãy thực hiện các bước dưới đây để đảm bảo project của bạn sẽ bao gồm Mobile Ads SDK

Với Android: Assets -> Play Services Resolver -> Android Resolver -> Resolve. Unity Play Services Resolver sẽ copy các dependencies vào trong thư mục `Assets/Plugins/Android` của project.
Google Mobile Ads Unity plugin dependencies nằm trong file `Assets/GoogleMobileAds/Editor/GoogleMobileAdsDependencies.xml` bạn có thể chỉnh sửa version, thêm bớt dependencies.

Với iOS: Không cần làm gì thêm

### Set your AdMob App ID
Android: Thêm Admob App Id vào file `AndroidManifest.xml` nằm trong thư mục `Assets/Plugins/Android/GoogleMobileAdsPlugin` như bên dưới.
Từ phiên bản Google Mobile Ads SDK 17.0.0 bước này là bắt buộc nếu không sẽ dẫn đến crash.
```XML
<manifest>
    <application>
        <!-- Your AdMob App ID will look similar to this
        sample ID: ca-app-pub-3940256099942544~3347511713 -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="[ADMOB_APP_ID]"/>
    </application>
</manifest>
```
iOS: Không yêu cầu bước này

### Initialize MobileAds

Trước khi tải quảng cáo, bạn cần khởi tạo Mobile Ads SDK bằng cách gọi `MobileAds.Initialize()` với Admob App Id của bạn. Lệnh này chỉ chạy 1 lần, tốt nhất là lúc ứng dụng bắt đầu chạy.
Dưới đây là ví dụ cách gọi method `MobileAds.Initialize()` trong method `Start()` của script gắn vào một `GameObject`:
```
...
using GoogleMobileAds.Api;
...
public class GoogleMobileAdsDemoScript : MonoBehaviour
{
    public void Start()
    {
        #if UNITY_ANDROID
            string appId = "ca-app-pub-3940256099942544~3347511713";
        #elif UNITY_IPHONE
            string appId = "ca-app-pub-3940256099942544~1458002511";
        #else
            string appId = "unexpected_platform";
        #endif

        // Initialize the Google Mobile Ads SDK.
        MobileAds.Initialize(appId);
    }
}
```

### Create a BannerView
Bước đầu tiên tạo một object BannerView trong C# script gắn vào một GameObject trong scene
```
...
using GoogleMobileAds.Api;
...
public class GoogleMobileAdsDemoScript : MonoBehaviour
{
    private BannerView bannerView;
    …
    public void Start()
    {
        #if UNITY_ANDROID
            string appId = "ca-app-pub-3940256099942544~3347511713";
        #elif UNITY_IPHONE
            string appId = "ca-app-pub-3940256099942544~1458002511";
        #else
            string appId = "unexpected_platform";
        #endif

        // Initialize the Google Mobile Ads SDK.
        MobileAds.Initialize(appId);

        this.RequestBanner();
    }

    private void RequestBanner()
    {
        #if UNITY_ANDROID
            string adUnitId = "ca-app-pub-3940256099942544/6300978111";
        #elif UNITY_IPHONE
            string adUnitId = "ca-app-pub-3940256099942544/2934735716";
        #else
            string adUnitId = "unexpected_platform";
        #endif

        // Create a 320x50 banner at the top of the screen.
        bannerView = new BannerView(adUnitId, AdSize.Banner, AdPosition.Top);
    }
}
```

Hàm tạo cho BannerView có các parameters:

adUnitId - Banner Id mà bạn tạo trên Admob
AdSize - Kích thước của banner
AdPosition - Vị trí hiển thị Banner trên màn hình scene

### Load an ad
Sau khi tạo object BannerView bạn cần tạo AdRequest và load banner
```
// Create a 320x50 banner at the top of the screen.
        bannerView = new BannerView(adUnitId, AdSize.Banner, AdPosition.Top);

        // Create an empty ad request.
        AdRequest request = new AdRequest.Builder().Build();

        // Load the banner with the request.
        bannerView.LoadAd(request);
```
Vậy là xong, bạn hãy chạy game trên thiết bị test để thấy banner hiển thị.

[Tham khảo ](https://developers.google.com/admob/unity/start)