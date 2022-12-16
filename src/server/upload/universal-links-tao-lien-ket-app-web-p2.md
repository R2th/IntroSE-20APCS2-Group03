Các bạn có thể theo dõi phần 1 ở [đây](https://viblo.asia/p/universal-links-tao-lien-ket-app-web-p1-1VgZvEW1KAw) 
## Configuring the Web site

Bây giờ, bạn cần tạo một file **apple-app-site-association**. File này không phải là mới lạ đối với lập trình iOS: Nó là một file được sử dụng trong iOS 8 cho thông tin đăng nhập web và Handoff. Tuy định dạng phù hợp với định dạng của file JSON, nhưng nó lại không có phần mở rộng ".json". Không sử dụng bất kỳ phần mở rộng tên file, hãy kiểm tra kỹ xem tên file có chính xác không!

![](https://images.viblo.asia/07337223-eac7-41ce-9fad-ff9d0037f151.png)

Tạo một file mới có tên là **apple-app-site-association** ở bất cứ đâu bạn muốn, miễn là bên ngoài thư mục của app và thêm nội dung sau:

```
{
  "applinks": {
    "apps": [],
    "details": [
    {
      "appID": "KFCNEC27GU.com.razeware.UniveralLinksTutorial",
      "paths": ["*"]
    }
    ]
  }
}
```


Tag **applinks** xác định app nào được liên kết với website. Để giá trị **apps** dưới dạng một mảng trống. Bên trong tag **details** là một loạt các từ điển để liên kết các appID và các đường dẫn URL. Để đơn giản, bạn sử dụng ký tự đại diện * để liên kết tất cả các liên kết của web site này với ứng dụng dùng UniversalLink. Bạn có thể giới hạn giá trị **paths** đến các thư mục hoặc tên file cụ thể.


appID bao gồm team ID của bạn với bundle ID của app. team ID được viết ở trên thuộc về team Ray Wenderlich, nhưng bạn sẽ cần thay thế nó cho mã số tài khoản của riêng bạn.


Apple đã tạo team ID khi bạn tạo Apple developer account của mình. Bạn có thể tìm thấy nó trong [Apple developer center](https://idmsa.apple.com/IDMSWebAuth/login?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2F&rv=1). Đăng nhập vào web site, nhấp vào **Membership**, sau đó tìm kiếm **Team ID** nằm trong phần **Membership Information**.


![](https://images.viblo.asia/5c62375d-104a-4d59-a63d-2e2799f125cf.png)


Bạn có thể tìm bundle IDi của app thông qua tab **Targets ▸ UniversalLinks ▸ General** của Xcode:


![](https://images.viblo.asia/ad595bb0-c7fd-439c-b5d2-db7b5e56d756.png)


Giờ đây, **apple-app-site-association** đã hoàn tất, đã đến lúc upload nó lên web server.


Một lần nữa, bạn phải có quyền "write access" vào trang web để làm điều này. Như trong vd này, bạn có thể tham khảo trang [web đã hoàn thành](https://rw-universal-links-final.herokuapp.com/), đã chứa file này.


Nếu bạn muốn đảm bảo nó ở đó, hãy mở http://rw-universal-links-final.herokuapp.com/apple-app-site-association. Bạn sẽ thấy rằng nó khớp với thông tin được hiển thị ở trên.


Tuyệt quá! Bây giờ app đã biết về trang web và trang web biết về ứng dụng UniversalLink.

Đã đến lúc bước cuối cùng: thêm logic để xử lý khi người dùng chạm vào universal link.


## Handling Universal Links

Bây giờ, ứng dụng và trang web đã chính thức nhận thức được nhau, tất cả nhu cầu ứng dụng là code để xử lý link khi được gọi.


Mở **AppDelegate.swift **và thêm phương thức trợ giúp sau:


```
func presentDetailViewController(_ computer: Computer) {
  let storyboard = UIStoryboard(name: "Main", bundle: nil)
  
  guard 
    let detailVC = storyboard
      .instantiateViewController(withIdentifier: "DetailController")
        as? ComputerDetailController,
    let navigationVC = storyboard
      .instantiateViewController(withIdentifier: "NavigationController")
        as? UINavigationController 
  else { return }
  
  detailVC.item = computer
  navigationVC.modalPresentationStyle = .formSheet
  navigationVC.pushViewController(detailVC, animated: true)
}
```


Method này chỉ mở **ComputerDetailController** và hiển thị thông tin của tham số Computer được truyền vào. 


Ngay sau method trên, thêm method sau:


```
func application(
  _ application: UIApplication,
  continue userActivity: NSUserActivity,
  restorationHandler: @escaping ([UIUserActivityRestoring]?
) -> Void) -> Bool {
  
  // 1
  guard userActivity.activityType == NSUserActivityTypeBrowsingWeb,
    let url = userActivity.webpageURL,
    let components = URLComponents(url: url, resolvingAgainstBaseURL: true) else {
      return false
  }
  
  // 2
  if let computer = ItemHandler.sharedInstance.items
    .filter({ $0.path == components.path}).first {
    presentDetailViewController(computer)
    return true
  }
  
  // 3
  if let webpageUrl = URL(string: "http://rw-universal-links-final.herokuapp.com") {
    application.open(webpageUrl)
    return false
  }
  
  return false
}
```


iOS sẽ gọi method này bất cứ khi nào người dùng chạm vào universal link liên quan đến app. 

Dưới đây là những gì từng bước thực hiện:


1) Đầu tiên, bạn xác nhận rằng **userActivity** được truyền vào có các đặc tính như trong dự kiến. Cuối cùng, bạn muốn lấy components cho hoạt động kiểm tra di universal link. Nếu không, bạn return false để cho biết rằng ứng dụng không thể xử lý hoạt động.


2) Sử dụng path, bạn tìm một computer. Nếu bạn tìm thấy một computer, bạn sẽ present màn hình detail view controller và trả về true.


3) Nếu bạn không thể tìm thấy computer phù hợp với path, bạn sẽ cho phép app mở URL, app sẽ sử dụng ứng dụng hệ thống mặc định để thay thế - rất có thể là Safari. Bạn cũng trả về false ở đây để cho biết rằng app không thể xử lý hoạt động của người dùng này.


### Testing the Links


Như đã nói ở phần 1, không có cách tốt để kiểm tra xem các universal links có hoạt động trong tutorial app hay không, nhưng điều quan trọng là phải hiểu kết quả mong đợi khi bạn triển khai các universal links trong ứng dụng của riêng mình.


Nếu bạn đã làm điều này trong ứng dụng của mình, bạn sẽ có thể gửi được cho chính mình một liên kết (ví dụ: https://rw-universal-links-final.herokuapp.com/arduino.html), nhấn vào nó và xác minh rằng ứng dụng hiển thị đúng tran mong muốn.


Hãy nhớ rằng các universal links có thể được kích hoạt từ những nơi khác, chẳng hạn như trong một **UIWebView**, **WKWebView**, **SFSafariViewController**, Notes hoặc trực tiếp trong Safari.

Các bạn có thể đọc bài viết nguồn ở [đây](https://www.raywenderlich.com/6080-universal-links-make-the-connection)