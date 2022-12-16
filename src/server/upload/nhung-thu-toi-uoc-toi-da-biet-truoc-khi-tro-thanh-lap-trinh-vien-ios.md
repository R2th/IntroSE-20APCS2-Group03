Designer đã đưa cho tôi luồng tiện lợi hơn để tôi thực hiện nó trước khi ứng dụng ra mắt. Flow đó giống như hình dưới
![](https://images.viblo.asia/39ca7d2d-2ddd-4561-9208-d1008851ff40.gif)

Tôi nhảy thẳng vào code trên Xcode sử dụng page view controllers và scroll view. Tôi hoàn thành nó trong 2 ngày với sự trờ giúp từ Stack OverFlow và Google. Khi tôi show cái flow đó cho một người bạn của tôi cũng là 1 dev iOS, anh ấy nói với tôi rằng tôi đã có thể hoàn thành công việc kia với chỉ một giờ nếu tôi sử dụng [mã nguồn mở này](https://github.com/mamaral/Onboard).
Chính điều này và nhiều kinh nghiệm xương máu khác khiến tôi tốt lên trong 1 năm qua. Tôi muốn chia sẻ kinh nghiệm của tôi để các bạn và những lập trình viên khác không mắc lại lỗi của tôi trên con đường trở thành 1 master iOS

## Tập trung vào các nguyên tắc cơ bản
Khi tôi bắt đầu với iOS, tôi đã học khoá học miễn phí nhưng tuyệt vời [này](https://itunes.apple.com/us/course/developing-ios-11-apps-with-swift/id1309275316) được cung cấp bởi Đại học Stanford. Mặc dù tôi đã học được khá nhiều từ khoá học này. Nó không tập trung nhiều vào việc dạy cho tôi những nguyên tắc cơ bản của ngôn ngữ sử dụng cho phát triển iOS mà chủ yếu là về Objective-C ở thời điểm đó. Khi tôi bắt đầu code ứng dụng của riêng mình, tôi nhận ra rằng tôi đã bỏ lỡ rất nhiều điều cơ bản của ngôn ngữ dẫn đến việc code lỗi
Nếu bạn không có kinh nghiệm với ngôn ngữ hướng đối tượng. Tôi khuyên bạn nên đọc một cuốn sách về ngôn ngữ lập trình trước khi bơi vào lập trình ứng dụng iOS. Những hướng dẫn mà tôi thích đó là [Big Nerd Ranch Guide](https://www.bignerdranch.com/books/) cho Objective-C và [The Apple’s Guide](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/) cho Swift

![](https://images.viblo.asia/258c22e3-7ba7-4c42-863e-13b8f4858819.jpeg)

Chắc chắn bạn sẽ học được nhiều từ việc đọc hướng dẫn từ [Ray Wenderlich](http://www.raywenderlich.com/) hoặc xem những video bài giản trên [Team Treehouse](http://teamtreehouse.com/) nhưng nếu cơ bản của bạn thiếu sót, nó sẽ là sự thiếu sót ở một dòng code nào đó trong tương lai

## Github
Tôi thích các cộng đồng mã nguồn mở iOS. Họ cho thấy sự tuyệt vời minh chứng bằng rất nhiều các dự án lớn như là AFNetworking, Restkit, JSQMessages... Bạn phải học những thứ mang lại từ cộng đồng này đã từng làm
Trước khi tìm ra thư viện hoặc giải pháp của riêng bạn  là tìm kiếm trên Github hoặc Google cho những giải pháp tương tự. Rất có khả năng cộng đồng developer đã open source một project phù hợp với nhu cầu của bạn.
Hãy liên lạc với cộng đồng thông qua Facebook hoặc Slack. Họ sẽ sẵn sàng trả lời các câu hỏi của bạn. Đọc qua các code của một số dự án open source để học các kinh nghiệm từ các dev trong team của họ và bắt đầu thực hiện code theo họ, biến code của họ thành code của bạn.
Một số source code trên Github bạn có thể tham khảo tại đây.
> https://github.com/vsouza/awesome-ios
> https://github.com/matteocrippa/awesome-swift
> https://github.com/cjwirth/awesome-ios-ui
> 
Nếu bạn đang tìm kiếm các cách hay nhất để theo dõi trong project của bạn thì source sau cũng là một gợi ý 
> https://github.com/futurice/ios-good-practices
> 
## Tool
Hầu hết các dev iOS đều sử dụng Xcode là tool chính để code. Xcode có rất nhiều tính năng hữu ích như Storyboards, Auto Layout các công cụ mà giúp bạn rút ngắn thời gian dev. Rất nhiều dev tránh sử dụng Storyboard nhưng cá nhân tôi coi chúng là một cách tuyệt vời để bố trí một cách nhanh nhất các màn hình của bạn
Học điều hướng thông qua Xcode sử dụng phím tắt. Mặc dù nó có vẻ sử dụng rất ít thời gian ở hiện tại nhưng lại rất nhiều thời gian sau này. Dưới đây là một số giải pháp àm tôi sử dụng liên tục đã giúp tôi đẩy nhanh quá trình dev của mình

1. Sử dụng [Cocoapods](https://cocoapods.org/) cho quản lý các package phụ thuộc. Nó sẽ làm công việc của team bạn dễ dàng hơn
2. Tìm hiểu các thiết lập [continous integration](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/xcode_guide-continuous_integration/) sớm trong dự án của bạn để không phải lặp lại các bước thừa.
3. Sử dụng  [Testflight](https://developer.apple.com/testflight/) để phân phối bản beta của ứng dụng. Với việc Apple mua Testflight, những ai có tài khoản iTunes Connect dễ dàng phân phối bản beta bằng Testflight
4. Tích hợp [Crashlytics](https://try.crashlytics.com/) trong app của bạn để nhận báo cáo sự cố khi chúng xảy ra
## Đọc nhiều blog và các bản tin chất lượng (nhiều * và clap :D)
Tôi đã nói cho bạn về các cộng đồng mã nguồn mở iOS. Nhiều blog uy tín đã bắt đầu bởi các iOS dev có kinh nghiệm nơi lưu trữ các nội dung tuyệt vời hàng tuần. Một  blog mà tôi yêu thích là:
> [Cocoa with Love](http://www.cocoawithlove.com/)
> 
Được cho là iOS blog tốt nhất của Matt Gallagher. Cách của Matt làm mọi thứ không có gì thoát khỏi tay ổng. Và rất nhiều các blog khác như Raywenderlich Blog...
Những thông tin cũng như các phương pháp hữu ích có được từ việc đọc các blog do các lập trình viên nhiều kinh nghiệm sẽ làm cho chúng ta trở nên master giống họ :D

## Design
Rất nhiều người trong chúng ta phát triển có xu hướng bỏ xa các khía cạnh thiết kế của iOS. Chúng tôi xử lý thiết kế riêng, tách biệt ra khỏi việc dev. Nhưng với sự cố gắng của bạn có thể tự học thiết kế ứng dụng của riêng bạn.
Ngày nay, sợi dây liên kết dữa designer và dev không còn bền chặt nữa vì rất nhiều các iOS dev có khuynh hướng tự thiết kế, phát triển và marketing ứng dụng của họ một cách thành công. Với tôi, bạn nên tìm hiểu công cụ Sketch, Nó rất dễ để tìm hiểu và và thiết kế ứng dụng và website
Bạn cũng có thể tìm thấy hàng ngàn resource và plugin của Sketch trên mạng sẽ giúp công việc của bạn trở bên ez hơn. Một khi bạn đã sẵn sàng thiết kế. Bạn có thể tích hợp chúng lại với nhau bằng công cụ tuyệt vời [này](https://marvelapp.com/)

Bài viết này tôi cũng đọc và viết theo blog trên Medium Blog. Cảm ơn bạn đã theo dõi bài viết của tôi, bài có nhiều thiếu sót, mong bạn góp ý để hoàn thiện hơn!
> https://medium.com/ios-os-x-development/things-i-wish-i-had-known-before-starting-ios-development-part-1-421a05e8447e