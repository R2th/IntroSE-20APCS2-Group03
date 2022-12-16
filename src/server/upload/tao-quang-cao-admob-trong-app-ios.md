1. **Tạo account admob**
    
    - Để tạo được quảng cáo admod, việc đầu tiên cần làm đó là đăng ký tai khoản, các bạn có thể vào [đây](https://apps.admob.com/signup/resubmission) để đăng ký

2. **Tạo các loại quảng cáo thích hợp**

    - Trên giao diện console của admob, các bạn chọn Apps trong thanh menu bên trái và click Add app để tạo 1 project mới
    - Điền thông tin app, chọn nền tảng 
    
     ![](https://images.viblo.asia/6eb39494-a857-4815-be63-dc19a26635b9.png)
     
    - Chọn loại quảng cáo: Banner, Interstitial, video Rewarded
    - Điền các thông tin cần thiết cho quảng cáo: name, adtype ...
    - Click hoàn tất để tạo quảng cáo

3. **Thiết lập trên xcode**
    - Import the Mobile Ads SDK
    Có 2 cách để import sdk:
    Cách1 : Dùng CocoaPod
    
        ```
        pod 'Google-Mobile-Ads-SDK'
        pod install --repo-update
        ```
     
    Cách 2: Download sdk tại [đây](https://developers.google.com/admob/ios/download)
    
    - Để lấy AppId và AdUnitId các bạn vào mục Ad unit trong thanh menu trên console cảu admob
    
    ![](https://images.viblo.asia/16381897-5f9e-4f74-86a7-bed73b778798.png)
    
    - Configure trong Appdelegate

        ```
        import GoogleMobileAds
        …

        @UIApplicationMain
        class AppDelegate: UIResponder, UIApplicationDelegate {
          var window: UIWindow?
          func application(_ application: UIApplication,
              didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
            // Initialize the Google Mobile Ads SDK.
            // Sample AdMob app ID: ca-app-pub-3940256099942544~1458002511
            GADMobileAds.configure(withApplicationID: "YOUR_ADMOB_APP_ID")
            return true
          }
        }
        ```

        - Chèn quảng cáo banner vào app
            - Trong viewDidLoad, khởi tạo banberView
           
        ```
            import GoogleMobileAds
            import UIKit

            class ViewController: UIViewController {
              var bannerView: GADBannerView!
              override func viewDidLoad() {
                super.viewDidLoad()

                // In this case, we instantiate the banner with desired ad size.
                bannerView = GADBannerView(adSize: kGADAdSizeBanner)
                bannerView.adUnitID = "ca-app-pub-3940256099942544/2934735716"
                bannerView.rootViewController = self
                addBannerViewToView(bannerView)
              }

              func addBannerViewToView(_ bannerView: GADBannerView) {
                bannerView.translatesAutoresizingMaskIntoConstraints = false
                view.addSubview(bannerView)
               }
              }
        ```

      - Để thực hiện loadBanner:

      `  bannerView.load(GADRequest())`
      
      - Banner delegate:
      
      ```
        /// Tells the delegate an ad request loaded an ad.
        func adViewDidReceiveAd(_ bannerView: GADBannerView) {
 
        }

        /// Tells the delegate an ad request failed.
        func adView(_ bannerView: GADBannerView,
            didFailToReceiveAdWithError error: GADRequestError) {
        }

        /// Tells the delegate that a full-screen view will be presented in response
        /// to the user clicking on an ad.
        func adViewWillPresentScreen(_ bannerView: GADBannerView) {
        }

        /// Tells the delegate that the full-screen view will be dismissed.
        func adViewWillDismissScreen(_ bannerView: GADBannerView) {
        }

        /// Tells the delegate that the full-screen view has been dismissed.
        func adViewDidDismissScreen(_ bannerView: GADBannerView) {
        }

        /// Tells the delegate that a user click will open another app (such as the App Store), backgrounding the current app.
        func adViewWillLeaveApplication(_ bannerView: GADBannerView) {
        }
      ```


**5. Kêt quả**
 Sau khi chay app bạn sẽ thấy quảng cáo hiển thị như trong ảnh
 
 ![](https://images.viblo.asia/cb3c49a4-456c-4a76-a690-5ff47b62b72e.png)
 
 Ngoài ra admob còn cung cấp các loại qc khác như Interstitial, video Rewarded, native. Hi vọng các bạn có thể tận dụng quảng cáo 1 cách hiệu quả để  đem lại doanh thu tốt nhất!
 
 Nguồn: [admob](https://apps.admob.com/)