Thông thường, việc cài đặt ứng dụng sẽ được thực hiện thông qua Apple Store, tuy nhiên sẽ có một số trường hợp ta không cần phải đưa app lên Apple Store mà thiết bị vẫn có thể cài đặt được. Đa số sẽ thuộc vào một trong hai trường hợp sau đây:
- Testing: Trước khi release app, ta cần test ứng dụng, vì vậy việc cung cấp bản build để tester có thể test trước khi release là một điều cần thiết
- In-house Applications: Là những ứng dụng chỉ được sử dụng internal trong một công ty hay tổ chức nào đó ( đối với những ứng dụng In-house application, ta cần có tài khoản Apple Developer Enterprise Program)

Dưới đây là bảng liệt kê một số khác biệt giữa account Apple Developer Program và Apple Developer Enterprise Program:


| | Apple Developer Program | Apple Developer Enterprise Program |
| -------- | -------- | -------- |
| Beta OS Releases     | Yes     | Yes     |
| Ad Hoc Distribution     | Yes     | Yes     |
| App Store Distribution     | Yes     | No     |
| In-house Distribution | No     | Yes     |
| TestFlight Beta Testing | Yes     | No     |
| Team Management    | No     | Yes     |
| App Analytics    | Yes     | Yes     |

Có hai cách ta có thể sử dụng để cài đặt bản build của app nhằm mục đích testing:
- Sử dụng App Store Connect: Bằng cách build lên TestFlight, tester có thể cài đặt app một cách dễ dàng lên thiết bị iOS
- Sử dụng Ad Hoc Distribution: Cách này có thể dùng cho cả hai loại account developer và enterprise. Và nó không cần Apple review. 

In-house distribution là một cách an toàn để đưa ứng dụng của bạn đến với các nhân viên của mình. Tuy nhiên nếu bạn muốn người ngoài công ty có thể test ứng dụng của mình hoặc giới hạn bản build cho một số device thì bạn có thể sử dụng Ad Hoc distribution.

Ad Hoc distribution cho phép ứng dụng được register bởi 100 device trong provisioning profile.
Cả hai loại distribution trên đều giống nhau ở cách cài app, chỉ khác nhau về provisioning profile. Bài viết này sẽ liệt kê một số cách ta có thể sử dụng đề cài đặt ứng dụng mà không cần sử dụng Apple Store.

### Sử dụng Apple Configurator 2 
Ứng dụng này chỉ có trên Mac OS. Để cài đặt app thông qua ứng dụng này, ta làm theo các bước sau:
- Cài đặt Apple Configurator 2 trên máy Mac của bạn từ App Store
- Kết nối thiết bị cần cài với máy tính
- Mở Apple Configurator 2, chọn device vừa được kết nối như bên dưới
![](https://images.viblo.asia/e6bef268-766d-411d-8b8d-8b8bd25a3930.png)

- Kích vào nút Add và chọn App
![](https://images.viblo.asia/cd55de37-71f6-4c1b-adbf-0cabaeddb37b.png)

- Sau đó kích vào nút 'Select Choose from my Mac' và chọn đến file .ipa để cài đặt, sau đó quá trình cài đặt sẽ được tiến hành

![](https://images.viblo.asia/cc6b3cf5-f40d-4052-9215-8410028f9e6e.png)

### Sử dụng iTunes

> Từ phiên bản iTunes 12.7 dành cho Mac, Apple đã thiết kế lại iTunes chỉ tập trung vào mục đích bán nhạc, phim ảnh, TV shows, audiobook và podcast. Nó không còn chứa App Store cho việc mua app cho iPhone và iPad, nên ta không còn được sử dụng tính năng cài app thông qua iTunes nữa.

Dưới đây là các bước cài đặt file .ipa thông qua iTunes dành cho các phiên bản nhỏ hơn 12.7:
- Build ứng dụng với chế độ debug hoặc ad-hoc build
- Xuất file .ipa và download nó
- Mở iTunes trên máy Mac, di chuyển đến App library
- Kéo thả file .ipa vào mục App library
- Kết nối thiết bị với iTunes và đi vào mục device apps
- Sau đó chọn Install app và kích vào nút Sync


### Sử dụng OTA Deployment

OTA (Over-The-Air) Deployment cho phép ta cài app thông qua giao thức https thông qua các bước sau:

- Build app với mode debug, ad-hoc hoặc in-house build. 
- Xuất file .ipa và download nó
- Upload file .ipa lên trang web mà bạn muốn cài đặt
- Tạo file .plist cho bản build này, nội dung tương tự như sau:

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>items</key>
    <array>
        <dict>
            <key>assets</key>
            <array>
                <dict>
                    <key>kind</key>
                    <string>software-package</string>
                    <key>url</key>
                    <string>https://www.yoursite.com/application/your_app.ipa</string>
                </dict>
            </array>
            <key>metadata</key>
            <dict>
                <key>bundle-identifier</key>
                <string>com.example.demo</string>
                <key>bundle-version</key>
                <string>1.0.0</string>
                <key>kind</key>
                <string>software</string>
                <key>title</key>
                <string>Demo</string>
            </dict>
        </dict>
    </array>
</dict>
</plist>
```

Lưu ý đối với file .plist:
> .plist file phải được truy cập thông qua giao thức https
> 
> Thay bundle-identifier bằng App ID của ứng dụng đang làm
> 
> Truyền vào đúng đường dẫn dẫn đến file .ipa

- Upload .plist file lên trang web mà ta muốn người dùng tải về (dùng giao thức https)
- Tạo một trang web và nhúng đường link download file .ipa ở trên sử dụng giao thức *itms-services://*

```
<a href="itms-services://?action=download-manifest&amp; 
    url=https://www.yoursite.com/application/your_app.ipa">
    Download
</a>
```

- Sau khi có được đường link, sử dụng device để kết nối đến đó, và ta sẽ được hệ thống thông báo cài app.

Ngoài ra, còn có một số trang web đã tích hợp sẵn việc hỗ trợ cài đặt file .ipa như: [Diawi](https://diawi.com), [Deploygate](https://deploygate.com), [HockeyApp](https://hockeyapp.net/) mà bạn có thể cân nhắc để sử dụng.