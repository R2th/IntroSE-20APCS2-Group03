Hi all, 

Tiếp nối [phần một](https://viblo.asia/p/cicd-voi-travis-ci-va-fastlane-part-1-bJzKm0ND59N), hôm nay mình sẽ tiếp tục chia sẻ với các bạn về cách cài đặt fastlane và tích hợp để sử dụng với Travis.

# Fastlane
Fastlane là công cụ tự động hoá, giúp việc build và release ứng dụng di động trở nên dễ dàng và đơn giản.
Các bạn có thể tham khảo đầy đủ tài liệu về fastlane [tại đây](https://docs.fastlane.tools/).


Well, nghe định nghĩa có vẻ hay nhỉ, nhưng fastlane cũng chỉ là công cụ, quan trọng nhất vẫn là người sử dụng nó. Để sử dụng fastlane thì mình nghĩ là tốt nhất bạn cũng nên có những hiểu biết nhất định về các nguyên tắc build và release ứng dụng, và nên nhớ rằng đừng quá phụ thuộc vào công cụ mà làm lười biếng bản thân. Bạn nên tự tay build và release trước sau đó hãy sử dụng fastlane, khi đó bạn mới có thể hiểu được fastlane có ý nghĩa như thế nào hay fastlane đã làm những gì và nếu có lỗi xảy ra bạn cũng sẽ nhanh chóng hiểu được nguyên nhân là do đâu.


Okay, lý thuyết thì nên có thực hành song song nó mới bớt nhàm chán, mình sẽ triển khai các bước đồng thời xen kẽ lý thuyết để giải thích ý nghĩa của nó.


Mở terminal lên nào.




##### Bước 1 : Install fastlane

Kiểm tra Xcode command line tools chắc chắn đã được cài đặt.

> xcode-select --install

Tại sao phải cài đặt Xcode command line tools, đơn giản vì fastlane không có khả năng tự build Xcode project, bản thân nó sẽ gọi command line tools trên máy tính của bạn để build.

Khi đã cài Xcode command line tools thì bắt đầu cài fastlane thôi 

> sudo gem install fastlane -NV

Sau khi hoàn thành cài đặt chúng ta sẽ thực hiện bước tiếp theo



##### Bước 2 : Tích hợp fastlane vào project

cd tới thự mục gốc cuả project và gõ lệnh : 

> fastlane init

Bạn sẽ thấy 4 options ở đây 

![](https://images.viblo.asia/918f286d-b81f-4e96-b3d7-91252a368dfc.png)


4 option này cũng khá là clear, chọn 1 nếu bạn muốn tạo screenshots, 2 nếu build bản beta và up to TestFlight, 3 nếu up to store, 4 nếu muốn tuỳ chỉnh. Bạn cứ thử chọn từng option để tìm hiểu thêm, fastlane sẽ hướng dẫn step by step khá là rõ ràng và dễ hiểu. 

Ở đây mình sẽ chọn option 4 để tự viết script và hướng dẫn cho các bạn được cụ thể hơn.
Sau khi fastlane init thành công, bạn hãy mở thư mục gốc để ngắm qua một chút xem có thay đổi gì xảy ra :
- Gemfile
- Gemfile.lock
- fastlane/Appfile
- fastlane/Fastfile

có 4 file đươc tạo ra, trong đó bạn có thấy 2 file khá là quen không: Gemfile và Gemfile.lock.

Oh có cái gì đó giống giống Podfile và Podfile.lock khi chúng ta sử dụng lệnh pod init -> pod install. Gem nó cũng là công cụ quản lý các dependence cho project tương tự như cocoapod, thử mở file gem ra bạn sẽ thấy nó đã khai báo fastlane trong đó.

Tiếp theo là Appfile, Fastfile cứ thử mở lên xem có gì trong đó

- Appfile : Đây là nơi bạn khai báo các thông tin liên quan tới việc build app và nó cũng sẽ tự động sinh ra một số trường nếu bạn chọn 1 trong số 3 option phía trên: app_identifier, apple_id, itc_team_id, team_id
- Fastfile : Đây là file mà bạn sẽ giao tiếp để viết các đoạn script để cấu hình cho fastlane. Đê viết được script cho fastlane thì tốt nhất là bạn nên đọc qua [Fastlane Documentation](https://docs.fastlane.tools/) để hiểu cú pháp, nó rất là dễ và ít thôi nên bạn hãy xem qua nó để tránh việc mất thời gian để dò lỗi cú pháp. Để mở Fastfile thì bạn có thể dùng vim, TextEdit nhưng mình recommend các bạn sử dụng [atom](https://atom.io/) để mở trông sẽ đẹp và dễ nhìn hơn.

Vậy là xong 2 bước quan đầu tiên, tiếp theo chúng ta sẽ học cách viết script và thử chaỵ một cái xem kết qủa thế nào, làm mãi mà không thấy ra được cái gì thì cũng chán đúng không :)



##### Bước 3 : Cấu hình fastlane.

Nào bây giờ chúng ta thử viết một đoạn script để bắt fastlane build thử app xem có lỗi gì không nhé.


```
default_platform(:ios)

platform :ios do
  desc "Try to test app"
  lane :test do
    run_tests(scheme: "PhotoMemories")
  end
end
```

Warning !! Các bạn hết sức cẩn thận với từng ký tự nhé vì bạn có thể mắc lỗi cú pháp bất kỳ lúc nào. Ban đầu thì cứ copy đoạn script trên và chỉ thay scheme (ở đây của mình là PhotoMemories) thành scheme của bạn, ai không nhớ scheme là gì thì xem lại [phần 1](https://viblo.asia/p/cicd-voi-travis-ci-va-fastlane-part-1-bJzKm0ND59N) nhé

Giải thích qua một chút về đoạn script trên :

1. Khai báo default_platform
2. Tạo một thẻ platform là ios và kết thúc bằng end, đây là thẻ chính cho biết là môi trường của chúng ta là ios chứ không phải android. Từ giờ trở đi nếu muốn thêm bất cứ script nào thì chúng ta cứ thêm vào trong thẻ này.
3. Viết test script :
- desc đây là một keyword (để cho dễ hiểu thì bạn cứ tưởng tượng nó là một hàm bình thường như print vậy), sau keyword là một đoạn text, fastlane sẽ hiểu là đoạn mô tả cho script phía bên dưới sẽ làm gì, ý nghĩa của nó thì một là để người đọc đoạn script của bạn hiểu bạn muốn làm gì ở đây, hai là khi bạn đọc log của fastlane bạn cũng biết được nó đang chạy đến dòng script nào.
>  lane :test do
>  
>  #do some things here.
>  
>    end.
-  Bạn thấy nó giống gì không :) cho dễ nhơ thì mình qui chiếu sang ngôn ngữ lập trình một tí:

>     lane = class 
>      
>      test = class_name
>      
>      do = {
>      
>      end = }
     
- run_tests tương tư desc đây là một hàm số của fastlane

ở đây mình chỉ truyền vào 1 tham số duy nhất là scheme, bạn nên đọc thêm các tham số của run_tests [ở đây](https://docs.fastlane.tools/actions/run_tests/#parameters) và thử xem nó chạy thế nào.


Done ! giờ là lúc xem kết quả như thế nào. Bạn cd đến thư mục gốc và gõ lệnh

> fastlane tests

trong đó tests là tên của lane mà chúng ta đã khai báo phía trên.

Nếu kết quả có show ra lỗi thì cũng từ từ giải quyết nhé, có một lỗi thường gặp đó là 
> xcodebuild: error: Scheme PhotoMemories is not currently configured for the test action

Đơn giản thì khi bạn chạy run_tests, nó sẽ tìm phần test mà bạn setup trong project, nếu project cuả bạn chưa viết test-case thì nó sẽ show ra lỗi đó, vậy để fix thì bạn chỉ cần thêm test vào project 
File -> New -> Target -> IOS Unit Testing Bundle / IOS UI Testing Bundle (Việc viết test-case thế nào thì bạn tự tìm hiểu thêm nhé)

![](https://images.viblo.asia/ae28a18e-1859-4e3b-bdd3-4c06f78e0301.png)

Đây là kết quả mà bạn nhận được khi thành công.

# Kêt luận.

Như vậy là trong phần 2 này mình đã hướng dẫn các bạn cách cài đặt và cấu hình hello world đối với fastlane. Phần tiếp theo và cũng là phần cuối cùng mình sẽ hướng dẫn các bạn cách cấu hình nâng cao hơn trong việc tạo ra các file cer, provi và build ra file ipa, đẩy chúng lên hockey và gửi link cài đặt thông qua Slack.

Cảm ơn đã theo dõi .