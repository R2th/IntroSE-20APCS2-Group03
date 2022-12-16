# Giới thiệu
Trong phần trước mình đã giới thiệu các bạn về URL scheme trong deep link. Tiếp tục mình sẽ giới thiệu về Universal link

Universal link phức tạp hơn URL scheme một chút. Về cơ bản, chúng ta muốn App IOS liên kết URL trang web với ứng dụng của mình. Cơ chế của deep link này sẽ cho phép server kiểm tra xem đường link đó có thuộc sở hữu của mình không và cho phép điều hướng tới ứng dụng. IOS sẽ yêu cầu thông qua định dạng JSON như sau:

```
{
    “applinks”: {
        “apps”: [],
        “details”: [
            {
                “appID”: “T5TQ36Q2SQ.com.reddit.production”,
                “paths”: [“*”],
            }
        ]
    }
}
```

Trong đó

- Applinks: cho biết nó thực sự dành cho khai Universial link
- Apps: Trường này sẽ là một mảng rỗng. (Theo Apple: “The apps’s key in an apple-app-site-association file must be present and its value must be an empty array)
- Detail: sẽ chứa một loạt các ứng dụng của bạn và ánh xạ của từng đường dẫn con tới ứng dụng tương ứng. 
 
  Đối với mỗi ứng dụng, bạn nên thêm một trường có tên là appID, trường này có được kết hợp giữa ID nhóm và ID gói của ứng dụng. Ví dụ: nếu TeamID của bạn là 123456 và AppID của bạn là com.myApp, thì kết quả là 123456.com.myApp. 
  
 - Trong trường paths, một mảng các chuỗi biểu thị bằng các biểu thức của đường dẫn tương ứng với ứng dụng này 

- Sơ đồ luồng: 
 ![](https://images.viblo.asia/520215bd-b67c-4ef2-b1d2-9ed90b124b85.png)


## Cài đặt

- Mở Xcode
- Đi đến Project settings -> capabilities. Chọn mục Associated Domains và set sang on. Khi nó được bật, chúng ta thêm bất kì URL vào để implement  apple-app-site-association resource. Domains section, thêm link applinks:myApp.com. 

- Đến đây chúng ta có thể xử lí giá trị trả về của server trong AppDelegate:

```
public func application(_ application: UIApplication,
                        continue userActivity: NSUserActivity,
                        restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
    if let url = userActivity.webpageURL {
        var view = url.lastPathComponent
        var parameters: [String: String] = [:]
        URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems?.forEach {
            parameters[$0.name] = $0.value
        }
        
        redirect(to: view, with: parameters)
    }
    return true
}
```

# Tóm tắt

Những  universal links cho phép chúng ta không chỉ có một URL duy nhất cho trang web, ứng dụng IOS và thậm chí có thể là Ứng dụng Android. Nhưng hơn thế nữa,  universal links cho phép chúng ta có trang web dự phòng nếu người dùng chưa cài đặt ứng dụng. Nếu bạn gửi email cho người dùng, với liên kết www.myApp.com/app/profile, bạn có thể lưu trữ ở đó một trang web tĩnh thông báo cho người dùng truy cập App Store hoặc thậm chí chỉ tự động chuyển hướng nó, vì nếu người dùng có ứng dụng, liên kết sẽ mở nó, và nếu không, nó sẽ nằm dưới trang web.