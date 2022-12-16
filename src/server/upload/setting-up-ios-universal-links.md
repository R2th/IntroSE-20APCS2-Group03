## Resources

Dưới đây là 1 vài URL để các bạn tham khảo:

### General Link Resources:
* https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html
* https://developer.apple.com/videos/play/wwdc2015-509/
* https://medium.com/@barsh/my-first-date-with-ios-universal-links-90dfabc88bb8
* https://developer.apple.com/documentation/safariservices/supporting_associated_domains_in_your_app

### Validation tools:
* https://search.developer.apple.com/appsearch-validation-tool/
* https://limitless-sierra-4673.herokuapp.com/

## Server configuration

Thực hiện theo các bước sau để thiết lập liên kết ứng dụng Universal trên máy chủ web. Trong tài liệu này, chúng tôi có các ví dụ cho [Apache2](https://httpd.apache.org/) và [nginx](http://nginx.org/) nhưng các quy tắc tương tự áp dụng cho [IIS](https://www.iis.net/) hoặc bất kỳ máy chủ web nào khác mà bạn chọn.

### Apple JSON Metadata file

Tạo file json tên "apple-app-association"

**Dành cho iOS12 và trước đó:**

Dưới đây bạn sẽ tìm thấy một mẫu với một vài ví dụ:

```
{
    "applinks": {
        "apps": [],
        "details": [
            {
                "appID": "<TEAM_DEVELOPER_ID>.<BUNDLE_IDENTIFIER>",
                "paths": [ "*" ]
            },
            {
                "appID": "<TEAM_DEVELOPER_ID>.<BUNDLE_IDENTIFIER>",
                "paths": [ "/articles/*" ]
            },
            {
                "appID": "<TEAM_DEVELOPER_ID>.<ANOTHER_APP_BUNDLE_IDENTIFIER>",
                "paths": ["/blog/*","/articles/*"]
            }
        ]
    }
}
```

Xin lưu ý:
* "apps": JSON phải được để lại dưới dạng một mảng trống.
* "apple-app-site-association" không được có phần mở rộng tệp .json.

**Dành cho iOS13 trở lên:**

Mẫu này cho phép bạn linh hoạt hơn rất nhiều về cách xử lý các URL nhất định trên trang web của bạn. Chẳng hạn, bạn có thể chỉ định một mục truy vấn URL bắt buộc có tên cụ thể và giá trị x số ký tự. Bạn có thể loại trừ các URL có # phổ biến trong các ứng dụng AngularJS.

```
{
  "applinks": {
      "details": [
           {
             "appIDs": [ "ABCDE12345.com.example.app", "ABCDE12345.com.example.app2" ],
             "components": [
               {
                  "#": "no_universal_links",
                  "exclude": true,
                  "comment": "Matches any URL whose fragment equals no_universal_links and instructs the system not to open it as a universal link"
               },
               {
                  "/": "/buy/*",
                  "comment": "Matches any URL whose path starts with /buy/"
               },
               {
                  "/": "/help/website/*",
                  "exclude": true,
                  "comment": "Matches any URL whose path starts with /help/website/ and instructs the system not to open it as a universal link"
               }
               {
                  "/": "/help/*",
                  "?": { "articleNumber": "????" },
                  "comment": "Matches any URL whose path starts with /help/ and which has a query item with name 'articleNumber' and a value of exactly 4 characters"
               }
             ]
           }
       ]
   },
   "webcredentials": {
      "apps": [ "ABCDE12345.com.example.app" ]
   }
}
```

Xin lưu ý:
* "apple-app-site-association" không được có phần mở rộng tệp .json.

### Mã hoá file apple-app-site-association bằng openssl

Xin lưu ý rằng kể từ iOS9, bạn không còn cần phải mã hoá file json apple-app-site-association. Tuy nhiên nếu bạn vẫn cần hỗ trợ iOS8 hoặc thấp hơn thì điều này vẫn là bắt buộc.

```
openssl smime -sign -nodetach 
-in "unsigned.json"
-out "apple-app-site-association" -outform DER 
-inkey /path/to/server.key 
-signer /path/to/server.crt
```

### Tải lên file mã hoá "apple-app-association"

1. Tải file mã hoá "apple-app-association" lên server:

```
scp /path/to/apple-app-site-association username@example.com:~/
```

2. Đăng nhập

```
ssh username@example.com
```

3. Di chuyển tệp đến thư mục gốc của máy chủ web

```
mv apple-app-site-association /var/www/
```

### Chỉnh sửa Content-type của file apple-app-site-association

| Minimum OS version | Content-Type |
| -------- | -------- |
| iOS9 or later | application/json |
| iOS8 or lower | application/pkcs7-mime |

Dưới đây bạn sẽ tìm thấy hướng dẫn về cách làm điều này cho máy chủ web của bạn.

**Cấu hình Apache**

Sửa /etc/apache2/sites-available/default-ssl (hoặc tương đương) tệp để bao gồm đoạn <Files>:

> <Directory /path/to/root/directory/>
> ...
> <Files apple-app-site-association>
> Header set Content-type "application/json"
> </Files>
> </Directory>

**Cấu hình nginx**

Sửa /etc/nginx/sites-available/ssl.example.com (hoặc tương đương) tệp để bao gồm đoạn location/apple-app-assocation:

```
server {
   ...
   location /apple-app-site-association {
      default_type application/application/json;
   }
}
```

### Các vấn đề chung

Xác thực JSON có thể thất bại nếu:

* Tệp JSON không hợp lệ
* Chuyển hướng đến một cái gì đó ngoài HTTPS
** Từ kinh nghiệm của chúng tôi, bất kỳ chuyển hướng nào cũng sẽ khiến bot không thể phân tích cú pháp tệp JSON, bạn thực sự nên tránh chúng
* Máy chủ trả về mã trạng thái HTTP 400-499
* Máy chủ trả về mã trạng thái HTTP 500-599
** Bot của Apples giả định rằng tệp tạm thời không khả dụng và có thể thử lại lần nữa.

Để biết thêm thông tin, hãy truy cập trang tài liệu của Apple về "Supporting Associated Domains in Your App" và cuộn xuống phần "Validate the Apple App Site Association File".

## Client

### Associated domains

1. Trong Xcode <MyApp>.xcodeproj/<Build target>/Capabilities và bật Associated domains.
![](https://images.viblo.asia/44aab6fa-2567-4461-9f91-97431fe5a14e.jpg)

2. Nhập tên miền bạn muốn ứng dụng iOS phản hồi.
![](https://images.viblo.asia/1a680186-4692-4fd7-9974-56415e2f9521.jpg)



* Điều này sẽ tạo tệp <AppName> .entitlements cần được đưa vào dự án.
* Xin lưu ý rằng bạn cần nhập tên miền phụ cụ thể.

    
###  Thực hiện các phương thức AppDelegate tương ứng

**iOS 9.0 trở về trước**

* Nếu bạn đã có một lược đồ URI tùy chỉnh, tức là myAppScheme: //, phương thức này sẽ được thực hiện.
* Chúng tôi đã nhận thấy rằng các thiết bị chạy iOS 9.0.x đáp ứng phương pháp xử lý liên kết ứng dụng cũ hơn này.
* Nếu bạn muốn hỗ trợ iOS 9.0.x trở về trước như iOS8 / iOS7, bạn sẽ cần triển khai phương pháp này và thêm chuyển hướng iframe JavaScript vào trang web của mình.

```
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation;
```

**iOS 9.1 trở lên**

Các thiết bị chạy iOS 9.1 trở lên hỗ trợ Universal Links của Apple và để xử lý URL đến, bạn cần thực hiện các phương pháp sau:

```
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *))restorationHandler {
    NSURL *url = userActivity.webpageURL;
    // handle url
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
    // handle url
}
```

### Các vấn đề chung

Hãy nhớ rằng khi bạn thay đổi một trong hai:

* File The <AppName>.entitlements có trong project
* File "apple-app-site-association"

Để xóa Ứng dụng khỏi thiết bị thử nghiệm của bạn và biên dịch lại. Sau khi một ứng dụng đã được liên kết thành công với một tên miền cụ thể, nó sẽ vẫn được liên kết cho đến khi ứng dụng được xóa khỏi thiết bị.

Khi kiểm tra các deeplinking của bạn, tôi khuyên bạn nên sử dụng ứng dụng iMessage hoặc ứng dụng Ghi chú. Nếu bạn sử dụng các ứng dụng iOS bên thứ 3 khác như Slack hoặc Facebook Messenger, deeplinking có thể không hoạt động vì điều đó phụ thuộc vào cách các ứng dụng bên thứ 3 đó xử lý các URL bên ngoài.