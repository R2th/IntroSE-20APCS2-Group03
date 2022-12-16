Hello, hôm nay mình trở lại với loạt bài về chủ đê "CI/CD với Travis-ci và Fastlane" và cũng là bài cuối cùng trong chuỗi chủ đề này, trong part này mình sẽ hướng dẫn các bạn tạo file certificate, provisioning profile, build ra ipa và share install link qua slack để hoàn thiện một qui trình từ khi phát triển tới tay cuả khác hàng một cách tự động.

Okay, nếu bạn chưa theo dõi 2 phần trước hoặc quên thì có thể xem lại [ở đây](https://viblo.asia/p/cicd-voi-travis-ci-va-fastlane-part-2-OeVKByDd5kW) , giờ chúng ta bắt đầu thôi.

## 1. Tạo certificate, provisioning profile

Có hai bước quen thuộc để build được app trên máy thật, hay build ra file ipa mà chắc hẳn ai cũng biết đó là :
- install file .cer trên máy MacOS
- import file provisioning profile vào Xcode

Fastlane cũng không nằm ngoài ngoại lệ này, vì thế để fastlane có thể làm việc được thì bạn cũng cần phải cung cấp 2 file này. Thông thường để tạo 2 file này chúng ta thường làm 2 bước :
- Đầu tiên là tạo file .certSigningRequest trên máy MAC
- Tiếp theo, vào trang developer tạo certificate và provisioning profile

Tuy nhiên có một cách khác mà bây giờ mình sẽ giới thiệu cho các bạn, cách này không những rất đơn giản mà còn giải quyết cực tốt vấn đề "Code Signing with Teams" bằng cách tự động generate và lưu trữ file trên git. 

#### Bước 1 : Tạo repo để lưu trữ file.
 
Vấn đề phân phối Code Signing file giúp cho các thành viên của team dễ dàng fetch về mà không cần phải qui định người này giữ, ai muốn dùng cũng phải hỏi hay nếu mất thì lại phải xin lại rất lằng nhằng. Còn đối với Travis thì chỉ cần bạn cung cấp cho nó git url nó cũng có thể tự download về để sử dụng. Tuy nhiên vấn đề là public cho các thành viên trong team nhưng lại cần private với người khác, vì thế chúng ta cần một private repo, việc sử dụng private repo này là hiển nhiên với doanh nghiệp, nhưng với team cá nhân thì chắc không nhiều bạn bỏ tiền ra để mua tính năng này. May mắn là không sử dụng github thì bạn vẫn còn một sự lựa chọn free khác đó là bitbucket.

Sau khi tạo xong repo, bạn sẽ có một git url như thế này 
>  https://github.com/xxxx/Certificates.git

#### Bước 2 : Tạo và lưu trữ Code Signing file

Cd đến fastlane folder trong project và gõ lệnh :
> fastlane match init

Sau đó trên terminal sẽ yê cầu bạn nhập URL của git repo, nhập cái url đã tạo ở bước 1 vào và được kết quả như sau :

![](https://images.viblo.asia/91742a0a-8598-45b6-9101-04589b681af7.png)

Nhìn vào fastlane folder,bạn sẽ thấy môt file mới được sinh ra một file mới tên là **match**, tiếp theo có 4 lựa chọn để tạo Code Signing : development, adhoc, appstore, enterprise. Ở đây mình chọn bừa development, và gõ tiếp lệnh sau :

> fastlane match development

Okay, giờ thì bạn có đang thắc mắc tại sao một  việc step by step này chúng ta không khai báo biến và viết script tự động thay vì cứ ngồi gõ lệnh chờ và gõ không. 

Vấn đề là có những thứ mà máy móc không thể thay thế con người ở đây, đó là việc nhập apple development account. 

![](https://images.viblo.asia/59d33f64-fbba-4cc9-89ff-9f580a67a186.jpeg)

Có bạn bảo account thì vẫn có thể khai báo được mà ??? Đúng là account thì vẫn có thể fill vào thành variable, tuy nhiên thì vấn đề là bạn cần sự bảo mật nên không thể mang để acount cuả mình cho người khác biết được, thứ 2 là các acount bây giờ đều đòi hỏi bảo mật nhiều bước và chúng ta không thể nào pass được bước xác thực mã qua tin nhắn được.

![](https://images.viblo.asia/ef7fcba3-08c8-4f3d-9277-12f91e006cc5.jpg)

Sau khi nhập xong account, fastlane sẽ đăng nhập và yêu cầu bạn nhập mật khẩu hoặc mã xác thực.
Tiếp theo bạn sẽ nhập bundle identifier, hãy chắc chắn là bạn đã tạo app với bundle identifier trong developer page rồi nhé, nếu chưa tạo thì bạn biết phải làm gì rồi đấy.

Sau khi cung cấp đâỳ đủ thông tin thì fastlane sẽ tạo cho bạn được hết Code Signing file, tuy nhiên vẫn chưa xong đâu vì cần phải đẩy chúng lên git repo nữa.

Bạn sẽ phải tiếp tục cung cấp password của git repo trong command line.
Mọi việc diễn ra step by step rất dễ hiểu, và cuối cùng thì chúng ta cũng gặt hái được thành quả :


![](https://images.viblo.asia/a00ad853-e38a-4ec9-b64a-6906b66ec2fc.png)

Để check lại mọi thứ một lần nữa chúng ta thử vào git repo xem sao

![](https://images.viblo.asia/08b80ab7-16c6-43e6-b26b-7203f336d23f.png)

Xong rồi mọi chuyện với bạn vẫn ổn chứ :]

#### Bước 3 : Download Code Signing file

Mở file Fastfile lên và code thôi nào.

```

desc "Download certificates and provisioning profiles"
lane :download_certs do
  match(
    app_identifier: "com.tutorial.PhotoMemories",
    git_url: "https://github.com/tuanhut/Certificates.git",
    type: "development"
    )
end

```

Phía trên mình tạo một lane tên là download_certs, mục đích của nó là download file cer certificate và provisioning profile ở chế độ development. Có 3 tham số mà mình truyền vào :
- app_identifier : bunddle identofier
- git_url : thư muc git để lưu trữ các file
- type : bạn có thể chọn development, adhoc, appstore, enterprise tuỳ thuộc vào chế độ bạn muốn build, ở bước 2 mình chỉ tạo file development vì thế ở đây mình cũng chỉ có file development để download thôi.

Done, như vậy sau này bạn không cần quan tâm tới việc cấu hình làm sao để build real device nữa, chỉ cần clone project về và cd tới fastlane folder và gõ lệnh :

> fastlane download_certs


## 2. Build Ipa và share link qua slack.

#### Bước 1 : Get hockey token

- Đăng nhập hoặc đăng ký hockey account [tại đây](https://rink.hockeyapp.net/users/sign_in)
- Sau khi đăng nhập thành công bạn cần [tạo token API](https://rink.hockeyapp.net/manage/auth_tokens)

Token API là key để giúp fastlane có thể gọi các API mà hockey cung cấp, từ đó có thể đẩy upload ipa và xuất ra download link cho các bạn.

![](https://images.viblo.asia/bf467b87-bac3-42a0-b5f0-173c19e645b5.png)

- Tiếp theo bạn cần tạo tài khoản slack và invite tất cả mọi người vào group đó,nơi mà CI sẽ đấy thông báo mỗi khi nó build, mọi người sẽ thấy đươc install link.

#### Bước 1 : Tạo Slack url

Ở bước này mục đích của chúng ta là tạo ra môt slack url, đây chính là mấu chốt giúp fastlane có thể gửi tin nhắn tới slack. Rất may mắn là slack cung cấp cho chúng ta một cơ chế gọi là webhooks giúp chúng ta có thể làm được điều này.

- Giả vờ là mọi người đã có slack account và trong slack mọi người đã tạo một channel tên là IOS_CI, tiếp đó mọi người truy cập [vào đây](https://my.slack.com/services/new/incoming-webhook/) để tạo ra url.

![](https://images.viblo.asia/5b0fa716-9a46-4e34-a7dc-2af823ce3131.png)

Chọn option và chọn channel mà bạn muốn để gửi tin nhắn vào đó, ở đây mình đã tạo sẵn ios_ci kia rồi.
Done, ấn chọn xong thì next và bạn có webhook URL :

![](https://images.viblo.asia/81ee5626-e091-44ec-9cc6-12d65ff0146c.png)

#### Bước 3 : Build ipa và share url.

Làm vài dòng code nữa nhé, mở Fastfile lên nào.

```

desc "Create a Beta build"
lane :build_dev do
  gym(
  configuration: "Debug",
  export_method: "development",
  )
end

desc "Submit to Hockey"
lane :submit_hockey do
  hockey(api_token: "xxxxxxxxxxxxxxxxxxxxxxx")
  message = last_git_commit[:message]
  commit_hash = last_git_commit[:commit_hash]
  version = get_ipa_info_plist_value(key: "CFBundleShortVersionString")
  build_number = get_ipa_info_plist_value(key: "CFBundleVersion")
  slack(
    channel: "#ios_ci",
    slack_url: "https://hooks.slack.com/services/xxxxxxxxxxxx",
    default_payloads: [],
    payload: {
      'Commit Message' => message,
      'Commit Hash' => commit_hash,
      'Version' => "#{version} (#{build_number})",
      'Download'=> lane_context[SharedValues::HOCKEY_DOWNLOAD_LINK],
    }
  )
end

desc "Build beta"
lane :beta do
  download_certs
  build_dev
  submit_hockey
end
```


Xong rồi, phái trên mình có viết 3 lane : 
> build_dev : lane này sử dụng gym để thông báo cho fastlane biết chúng ta muốn build ở chế độ development

> submit_hockey : lane này sẽ sử dụng hockey token và slack url mà chúng ta đã tạo ra ở 2 bước trên.

Công việc của nó là chúng ta khai báo một loạt các thông tin từ 
- hockey token
- message : là commit log
- version : là version của bản ipa
- build_number : build number của bản ipa

Tóm lại là chúng ta dùng func slack với đầu vào là url, tên channel, và payload bao gồm commit log, version, link download

> beta : đây là lane kết hợp tất cả các lane trước đó để thực hiện tất cả các func cần thiết.

Cuối cùng mở terminal lên, cd và fastlane folder và gõ thôi nào :

> fastlane beta

Ngồi chờ, fastlane build và đợi kết quả thôi :]]


## 3 . Tổng kết

Như vậy qua part mình đã hướng dẫn các bạn từ cách thiết lập travis-CI, tích hợp với Git để và sử dụng fastlane để có thể run test cũng như build ra ipa.

Có thể ban đầu mọi thứ hơi phức tạp và khó khăn, tuy nhiên nếu đã làm một lần thì những lần sau công việc của chúng ta sẽ được giảm bớt đi rất nhiều, và mọi thứ trở nên chuyên nghiệp hơn :]]

Những thứ mình viết ra đã khá là chi tiết nhưng nó chỉ dừng ở mức basic, còn nhiều điều mà bạn cần tìm tòi thêm, và cũng còn nhiều vấn đề mà bạn gặp phải khi làm thực tế. 

Hi vọng qua loạt bài này các bạn sẽ có những hiểu biết nhất định, và có thể ứng dụng thực tế và dự án sắp tới. 

====