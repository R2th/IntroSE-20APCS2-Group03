**1. Cài đặt môi trường**

 - Đảm bảo bạn đã cài đặt Xcode mới nhất.
 - Tải xuống SDK Audience Network
     -Sử dụng Cocoapods
     
```
pod 'FBAudienceNetwork'
pod install.
```

- Bạn có thể tại trực tiếp sdk mà Không sử dụng cocoapods:
Tải [SDK Facebook dành cho iOS](https://developers.facebook.com/docs/ios): 

**2. Thêm Facebook ads vào ứng dụng**

- Tạo project, kéo FBAudienceNetwork.framework mà bạn vừa tải vào project hoặc chạy lệnh cocoapods bên trên
- Tạo giao diện cho Facebook ads

    ![](https://images.viblo.asia/0b920cf7-0564-4cc5-a246-a78d9c75d5dc.png)

Các thành phần của Facebook native ads: 

* adIconImageView (FBAdIconView)
* adTitleLable (UILabel)
* adCoverMediaView (FBMediaView)
* adSocialContext (UILabel)
* adCallToActionButton (UIButton)
* adChoiceView (FBAdChoicesView)
* adBodyLabel (UILabel)
* sponsoredLabel (UILabel)
* under adUIView

**3 Thực hiện load và show Native Ad**

Tạo FacebookvView.xib

```

class FbAdsView: UIView, NibLoadableViewType {

    @IBOutlet var contentView: UIView!
    @IBOutlet weak var adLogo: UIImageView!
    @IBOutlet weak var adTitle: UILabel!
    @IBOutlet weak var adCoverMedia: FBMediaView!
    @IBOutlet weak var adSponsoed: UILabel!
    @IBOutlet weak var adBody: UILabel!
    @IBOutlet weak var adSocialContext: UILabel!
    @IBOutlet weak var callToActionButton: UIButton!
    @IBOutlet weak var adChoicesView: FBAdChoicesView!
   
    override init(frame: CGRect) {
        super.init(frame: frame)
        // Load from xib
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        // Load from xib
    }
}
```

Tạo FacebookViewController: (Để lấy được placementID facebook bạn cần đăng ký tài khoản developer Facebook )
```

import FBAudienceNetwork

class FbAdsViewController: UIViewController,FBNativeAdDelegate, FBAdViewDelegate {

    @IBOutlet weak var adUIView: FbAdsView!
    
    var nativeAd: FBNativeAd?

    override func viewDidLoad() {
        super.viewDidLoad()
        nativeAd = FBNativeAd.init(placementID: "YOUR - PLACEMENT - ID ")
        nativeAd?.delegate = self
        nativeAd?.load()
    }

    func nativeAdDidLoad(_ nativeAd: FBNativeAd) {
       if self.nativeAd == nil {
            self.nativeAd?.unregisterView()
        }
        self.nativeAd = nativeAd
        nativeAd.registerView(forInteraction: adUIView, with: self, withClickableViews: [adUIView.callToActionButton, adUIView.adCoverMedia])
        nativeAd.icon?.loadAsync(block: { image in
            self.adUIView.adLogo.image = image
        })
        adUIView.adCoverMedia.nativeAd = nativeAd
        adUIView.adTitle.text = nativeAd.title
        adUIView.adBody.text = nativeAd.body
        adUIView.adChoicesView.nativeAd = nativeAd
        adUIView.adChoicesView.corner = UIRectCorner.topRight
    }

}
```

Show Ads tại màn hình bạn mong muốn: 

```
func openFbAds() {
        guard let fbAdsController = self.storyboard?.instantiateViewController(withIdentifier: "FbAdsViewController") as? FbAdsViewController else {return}
        fbAdsController.providesPresentationContextTransitionStyle = true
        fbAdsController.definesPresentationContext = true
        fbAdsController.modalPresentationStyle = .overCurrentContext
        fbAdsController.modalTransitionStyle = .crossDissolve
        self.present(fbAdsController, animated: true, completion: nil)
    }
```

4 Kết quả: 
Quảng cáo của bạn sẽ đc hiển thị như hình: 

![](https://images.viblo.asia/5ace0258-87c0-4d13-a9f1-76abfa1b32ff.png)

Ngoài ra Facebook có cung cấp một số loại quảng cáo khác như: Banner, Interstitial Ads, bạn có thể tham khảo [tại đây](https://developers.facebook.com/docs/)

Nguồn: https://developers.facebook.com/docs/audience-network/ios-native