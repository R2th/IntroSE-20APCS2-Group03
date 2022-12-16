# Bảo mật dữ liệu là vô cùng quan trọng, không chỉ đúng với các ứng dụng về tài chính, ngân hàng mà là với tất cả các ứng dụng iOS nói chung. Là một lập trình viên, hãy luôn ghi nhớ điều đó. Qua bài viết này tôi muốn giới thiệu đến các bạn 5 bước rất dễ dàng để áp dụng nhưng lại giúp ứng dụng của bạn an toàn hơn.

## 1. Lưu trữ dữ liệu cần bảo mật vào một nơi nào đó an toàn.
Nói về việc lưu trữ các dữ liệu cần bảo mật, [Keychain](https://developer.apple.com/library/content/documentation/Security/Conceptual/keychainServConcepts/01introduction/introduction.html) chính là câu trả lời mà chúng ta cần. Sử dụng User Default trong việc lưu trữ dữ liệu nhỏ về cơ bản là ổn, nhưng bạn không bao giờ nên lưu các dữ liệu cần bảo mật hoặc dữ liệu cá nhân của người dùng tại đó. Lý do vì các giá trị được lưu bằng User Default sẽ dễ dàng được tìm thấy tại thư mục Library - Preferences -> bundleId.plist trong ứng dụng. Keychain xem ra có vẻ khó hơn một chút, nhưng sử dụng một thư viện wrapper giúp cho việc áp dụng Keychain trở lên dễ dàng hơn. Theo quan điểm cá nhân tôi thì [Locksmith](https://github.com/matthewpalmer/Locksmith) có thể giúp chúng ta làm điều đó.
Hãy nhớ rằng việc sử dụng Keychain là bảo mật hơn với cách thức sử dụng một database được lưu trữ trong file hệ thống với những thuật toán mã hoá được hỗ trợ tương ứng với dòng máy, chip A7 hoặc các dòng chip về sau này(các bạn có thể đọc thêm ở [đây](https://developer.apple.com/library/content/documentation/Security/Conceptual/keychainServConcepts/02concepts/concepts.html#//apple_ref/doc/uid/TP30000897-CH204-TP9)) và được sao lưu lên iCloud(một điều khá ngầu)
Nếu bạn muốn mã hoá database của bạn, điều đó cũng có thể thực hiện được. Có một chút khó khăn cho CoreData nhưng lại khá dễ dàng với Realm.
Bạn cũng có thể ghi các file của bạn sử dụng 4 cấp độ bảo mật khác nhau. Cấp độ mặc định là tương đối ổn, nhưng bạn có thể làm các file của bạn bảo mật hơn. Bạn có thể đọc thêm tại [đây](https://developer.apple.com/documentation/uikit/core_app/protecting_the_user_s_privacy/encrypting_your_app_s_files).

## 2.  Tạo ra một tầng networking bất khả xâm phạm
Sử dụng HTTP không hề được khuyến cáo. Từ iOS 9.0 đến version hiện tại, App Transport Security (ATS) được mặc định sử dụng, vậy nên bạn phải sử dụng HTTPS thay vì HTTP. Tiếc rằng ATS có thể dễ dàng bị vô hiệu hoá. Điều này là bình thường nếu ứng dụng của bạn đang trong quá trình phát triển và phía backend chưa cần quan tân đến SSL, tuy nhiên một ứng dụng được đưa lên AppStore không nên gửi các request đến một backend sử dụng HTTP và ATS nên được thiết lập ở dưới tầng app.
Theo [NowSecure](https://www.nowsecure.com/blog/2016/12/29/enable-ios-app-transport-security-ats/) 80% trên tổng số 201 ứng dụng iOS miễn phí có lượt tải nhiều nhất đã không sử dụng ATS trong tháng 12/2016. Tôi mong rằng điều này đã được khắc phục vào thời điểm hiện tại.
HTTPS là một lựa chọn tốt nhưng không đủ mạnh để bảo vệ bạn từ một loại tấn công mạng có tên gọi *Man in the Middle* nhưng **SSL Pinning** thì làm được điều đó. Nó thực sự là một kỹ thuật không quá khó, đặc biệt là nếu bạn đang sử dụng một thư viện thứ ba để làm việc networking như [Alamofire](https://github.com/Alamofire/Alamofire/blob/master/Documentation/AdvancedUsage.md#security). Chỉ có một điểm bất lời là ứng dụng phải được update bất cứ khi nào SSL key trên backend bị thay đổi.

## 3.  Nghĩ về các secret keys
Chúng không nên được lưu trữ trên một repo, đặc biệt là public repo. Thay vào đó bạn có thể sử dụng [cocoapods-keys](https://github.com/orta/cocoapods-keys) để làm xáo trộn chúng. Một secret key được làm xáo trộn có thể chưa phải là một lựa chọn đủ tốt cho một ứng dụng cá nhân nhưng chí ít các secret key không phải là một phần của lịch sử lưu trữ trên Git.
Một nghiên cứu về [client_secret](https://github.com/search?q=client_secret&type=Commits) chỉ ra rằng có đến hơn 40k commit có khả năng để lộ các API key và secret. Vậy nên đừng đưa những thứ này lên repo.
Bây giờ bạn biết rằng nó cực kỳ quan trọng đối với các public repos, nhưng điều này cũng áp dụng cho các private repos.

## 4.  Cẩn thận với việc sử dụng thư viện
Điều này là vô cùng khó nhưng bạn nên làm điều gì đó để chắc chắn rằng các thư viện thứ ba bạn đang dùng trong project không dễ bị hack. Việc dễ dàng nhất, nhưng không phải 100% hiệu quả là luôn cập nhật các version mới của các thư viện đó. Bạn cần chắc chắn rằng các thư viện bạn đang sử dụng là an toàn. Đừng vô hiệu hoá ATS ngay cả khi được đề nghị từ các thư viện trên.

## 5.  Tiếp tục học hỏi, tìm tòi
Tất nhiên không phải tất cả nhưng bạn nên học về các lỗ hổng bảo mật mới để luôn nắm được và tìm cách khắc phục. Repo [này](https://github.com/felixgr/secure-ios-app-dev) có thể hữu ích với bạn vì nó chứa đựng một danh sách các lỗi bảo mật thường gặp trong các ứng dụng iOS.
Trước khi tổng kết lại bài việc, tôi muốn chia sẻ cho các bạn 2 mẹo nhỏ.
1. Tôi đặc biệt tin rằng một ứng dụng iOS khi đưa ra bản production không nên print(hay log trong obj-c) những thứ quan trọng và cần bảo mật. Print và Log chỉ nên được sử dụng cho debug, nhưng hacker/cracker có thể dễ dàng tìm ra chúng.
2. Và bạn cũng đừng nên quên một công cụ hữu ích mà XCode IDE cung cấp, đó là Xcode's static analysis report, bạn có thể sử dụng nó với tổ hợp phím ⇧⌘B, công cụ này giúp bạn phát hiện ra các lỗ hổng logic, memory leak, các biện chưa được sử dụng và các bug khác.

## Tổng kết
Thậm chí làm theo các bước kể trên cũng không hoàn toàn đảm bảo được ứng dụng của bạn 100% an toàn. Vẫn tồn tại một cuộc chiến đấu dai dẳng giữ các developer và cracker. Tôi hy vọng những chia sẻ trên có thể là một vũ khí hữu ích.


Bài viết này được dịch từ blog [netguru.co](https://www.netguru.co/codestories/5-steps-to-make-your-ios-app-more-secure) của tác giả Piotr Sochalewski.