Đầu tiên bạn cần đăng ký tài khoản Google Admob [https://www.google.com/admob/](https://www.google.com/admob/) để sử dụng.
Tạo mới 1 App trên tài khoản Admob, ở app này bạn có thể lựa chọn các loại quảng cáo để dùng trong app của mình (Banner Ads, Interstitial Ads, Native Ads)
![](https://images.viblo.asia/1c58c2b5-093f-422b-9489-e2e6232639c3.png)

### Project 3: Banner Ads
Add ad unit: Thêm 1 Ad unit, và chọn Banner 

![](https://images.viblo.asia/a428516f-79c3-4305-a5d3-4d083d4d60b2.png)

lưu lại App ID, và ad unit ID

![](https://images.viblo.asia/3e5fcab0-eeea-4b00-a940-626cbce95eb2.png)

Tạo mới 1 project và dùng cocoa pod để install Mobile Ads SDK
ở trong AppDelegate.swift 
import thư viện 
```
import GoogleMobileAds
```
Tiếp theo ở  application**(_:didFinishLaunchingWithOptions:)** 
```
        GADMobileAds.configure(withApplicationID: "ca-app-pub-2309631356952308~9523587078")

```

Tiếp theo trên giao diện của app, add thêm 1 view: nơi banner quảng cáo xuất hiện

![](https://images.viblo.asia/c9e86e0a-212b-436d-86dd-b67189368868.png)

Lưu ý: 
1. Tạo BannerView có heigh  = 50 px, add constraints để nó ở nơi bạn muốn (mình để ở Bottom)
2. Chọn Class GADBannerView
3. Khi kéo Outlet vào cũng để thay UIView thành GADBannerView

Tiếp theo trong ViewDidLoad()
```
 bannerView.adUnitID = "ca-app-pub-2309631356952308/7312378735"
        bannerView.rootViewController = self
        let request = GADRequest()
        bannerView.load(request)
```

OK. Vậy là đủ, bây giờ bạn chạy ứng dụng của mình để xem kết quả nhé

![](https://images.viblo.asia/3c433d71-5ac9-48fc-b43f-9409a175a2f1.png)


### Project 4: Interstitial Ads
Tạo 1 project và install Mobile Ads SDK như với Banner Ads

Add ad unit Interstitial trên Google Admob
![](https://images.viblo.asia/6ba022c3-7238-4ecb-b633-7db300473f44.png)


ở trong AppDelegate.swift vẫn import thư viện và configure cho Admob
import thư viện 
```
import GoogleMobileAds
```
Tiếp theo ở  application**(_:didFinishLaunchingWithOptions:)** 
```
        GADMobileAds.configure(withApplicationID: "ca-app-pub-2309631356952308~9523587078")

```


Tạo giao diện gồm có button, khi tap vào thì sẽ hiển thị quảng cáo

![](https://images.viblo.asia/b952c528-a739-438e-97cf-b0c5929c3f4d.png)

Tạo biến interstital
```
    var interstitial: GADInterstitial!

```


Viết action cho button
```
        if interstitial.isReady {
            interstitial.present(fromRootViewController: self)
        } else {
            print("Ad wasn't ready!")
        }
```

Viết hàm tạo và load interstitial

```
    func createAndLoadInterstitialAdmob() {
        self.interstitial = GADInterstitial(adUnitID: "ca-app-pub-2309631356952308/2038449872")
        let request = GADRequest()
        request.testDevices = [kGADSimulatorID, "08fc5f0b45a13049a73bb4dff363b9b4"]
        interstitial.load(request)
    }
```

Gọi đến hàm tạo là load Interstitial
```
        createAndLoadInterstitialAdmob()
```

OK. Bây giờ hãy chạy app để xem thành quả của mình nào

![](https://images.viblo.asia/55771fdb-ec2f-43df-ba0c-381d36c2f6a6.gif)


Peaceeee!