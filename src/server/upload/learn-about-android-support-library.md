> **Chú ý:** Với sự ra đời của Android 9(API 28), một phiên bản mới của Support Library xuất hiện, đó là [AndroidX](https://developer.android.com/jetpack/androidx) - là một phần của [Jetpack](https://developer.android.com/jetpack) . Thư viện AndroidX bao gồm cả thư viện Support Library và các Component mới thuộc Jetpack.
> 
>Bạn vẫn có thể sử dụng thư viện Support Library, hoặc chuyển sang sử dụng AndroidX. Các phiên bản cũ(được thêm từ phiên bản API 27 trở về trước, và được đóng gói trong android.support.*) sẽ vẫn có sẵn trên Google Maven. Tuy nhiên, tất cả các thư viện mới sẽ được thêm vào AndroidX.
>
> AndroidX được khuyến khích sử dụng khi bắt đầu một dự án mới, hoặc nểu muốn bạn có thể migrate ứng dụng hiện tại sang sử dụng AndroidX.

Thế nhưng thư viện AndroidX bản chất vẫn chứa Support Library. Hãy cùng tìm hiểu xem nó là gì và tác dụng của nó.


-----

### Support Library là gì
Khi tạo một ứng dụng hỗ trợ nhiều phiên bản API, bạn có thể sẽ muốn một cách tiêu chuẩn để sử các tính năng của API  mới trên các phiên bản API cũ hơn. Thay vì viết code để xử lý đối với các API thấp, bạn có thể sử dụng các tính năng tương thích đó với support library. Ngoài ra, nó còn cung cấp các lớp tiện ích và các tính năng không có sẵn trong các API tiêu chuẩn để phát triển và hỗ trợ dễ dàng trên nhiều thiết bị hơn.
> **Chú ý:** Bắt đầu từ Support Library phiên bản 26.0.0, mức API tối thiểu được hỗ trợ trên hầu hết các thiết bị được tăng lên thành API 14(Android 4.0), để biết thêm thông tin bạn có thể đọc [Version Support and Package Names](https://developer.android.com/topic/libraries/support-library/#api-versions).
 
 Tóm lại thì Support Library là gói thư viện có thể được thêm vào ứng dụng Android nhằm mục đích giúp các thiết bị có phiên bản Android thấp có thể sử dụng các API được thiết kế ở phiên bản cao hơn, ngoài ra còn cung cấp các tiện ích hỗ trợ phát triển ứng dụng.
 
### Sử dụng Support Library 
Có nhiều cách để sử dụng Support Library khác nhau, việc tương thích cho các API trên các phiên bản cũ chỉ là một trong số đó. Dưới đây là tất cả:
* Khả năng tương thích ngược: các thư viện cung cấp khả năng tương thích ngược cho các API. Ví dụ: support Fragment hỗ trợ cho các thiết bị dưới Android 3(API 11).
* Các lớp trợ giúp và tiện ích: cung cấp các lớp tiện ích,  mục đích cho việc phát triển giao diện người dùng.
* Debug và tiện ích: cung cấp các tiện ích cho việc viết code như các annotation dùng trong Lint hay hỗ trợ multidex

Ví dụ: support-v4, support-appcompat-v7
- support-v4:  bao gồm gói API lớn, bao gồm hỗ trợ các thành phần:
     + Application Components: Activity, Fragment
     + UI Components
     + Khả năng truy cập
     + Xử lý dữ liệu
     + Kết nối internet....
     
* v7 libraries: Các thư viện này cung cấp các bộ tính năng cụ thể và có thể được implement trong ứng dụng của bạn một cách độc lập với nhau.

### Sử dụng Support API hay Framework
Support Library cung cấp khá nhiều lớp và phương thức giống với các API có sẵn của Framework Android. Khi biết điều này, hẳn là bạn sẽ phân vân không biết nên dùng các API có sẵn hay các API từ Support Library. Dưới đây là hướng dẫn khi nào bạn nên sử dụng API từ Support Library thay vì API từ Framework: 
* Khả năng tương thích cho một tính năng cụ thể: Nếu bạn muốn sử dụng các tính năng mới được phát triển gần đây cho các thiết bị chạy API cũ, bạn phải sử dụng các lớp và phương thức từ Support Library
* Khả năng tương thích cho các tính năng thư viện liên quan: Khi bạn đã sử dụng các lớp trong Support Library, thì các lớp đó có thể phụ thuộc vào một hoặc nhiều lớp khác trong Support Library. Bạn nên dùng các lớp Support Library cho các phụ thuộc đó. 

    Ví dụ: nếu bạn đã sử dụng ViewPager từ Support Library thì bạn nên sử dụng FragmentPagerAdapter hoặc FragmentStatePagerAdapter
* Tương thích thiết bị: Nếu bạn không có tính năng cụ thể nào trong ứng dụng cần tương thích ngược, bạn vẫn nên sử dụng các lớp trong Support Library.
 
    Ví dụ: Bạn nên sử dụng AppCompatActivity thay cho Activity, để bạn có thể sử dụng các tính năng mới hơn về sau, ví dụ như tính năng  liên quan đến Permission mới từ Android 6.0
    
    
 Các lớp Support Library cung cấp triển khai tương thích các lớp API nền tảng có thể không thể cung cấp bộ chức năng đầy đủ có sẵn trong bản phát hành mới nhất, do những hạn chế của phiên bản nền tảng thiết. Vì lý do này, bạn nên xem lại tài liệu tham khảo cho các lớp và phương thức thư viện bạn sử dụng và kiểm tra kỹ lưỡng trên các thiết bị chạy phiên bản mới nhất của nền tảng được ứng dụng của bạn hỗ trợ.
 
###  Version Support and Package Names
Một số gói Support Library có tên gói để chỉ mức API tối thiểu mà chúng hỗ trợ ban đầu, sử dụng ký hiệu v#, chẳng hạn như gói support-v4. Bắt đầu với Support Library phiên bản 26.0.0 (phát hành vào tháng 7 năm 2017), mức API được hỗ trợ tối thiểu đã thay đổi thành Android 4.0 (API 14) cho tất cả các gói Support Library. Vì lý do này, khi làm việc với bất kỳ bản phát hành gần đây nào của Support Library, bạn không nên cho rằng ký hiệu gói v# chỉ ra mức hỗ trợ API tối thiểu. Thay đổi này trong các bản phát hành gần đây cũng có nghĩa là các gói thư viện với v4 và v7 về cơ bản là tương đương ở mức API tối thiểu mà chúng hỗ trợ. Ví dụ: gói hỗ trợ-v4 và gói hỗ trợ-v7 đều hỗ trợ mức API tối thiểu là 14, cho các bản phát hành của Thư viện hỗ trợ từ 26.0.0 trở lên.
#### Phiên bản phát hành Support Library
Phiên bản phát hành của  Support Library, chẳng hạn như 24.2.0 hoặc 25.0.1, khác với cấp API tối thiểu được hỗ trợ bởi bất kỳ thư viện nào trong bản phát hành đó. Số phiên bản phát hành cho biết phiên bản API nền tảng nào được xây dựng và do đó, những API gần đây nhất có thể được bao gồm trong phiên bản thư viện này. Cụ thể, phần đầu tiên của số phiên bản phát hành, ví dụ 24 trong phiên bản 24.2.0, thường tương ứng với phiên bản API nền tảng có sẵn khi phát hành.  Phiên bản phát hành của thư viện hỗ trợ cho biết nó kết hợp một số tính năng của cấp API đó, nhưng bạn không nên cho rằng nó cung cấp khả năng tương thích với tất cả các tính năng được phát hành trong phiên bản API nền tảng mới.
### Thư viện phụ thuộc
Hầu hết các thư viện trong bộ Support Library Android có một số phụ thuộc vào một hoặc nhiều thư viện. Ví dụ, gần như tất cả các Support Library đều phụ thuộc vào gói support compat. Nói chung, bạn không cần phải lo lắng về các phụ thuộc thư viện hỗ trợ, bởi vì công cụ xây dựng lớp quản lý các phụ thuộc thư viện cho bạn, bằng cách tự động bao gồm các thư viện phụ thuộc. Nếu bạn muốn xem thư viện và phụ thuộc thư viện nào được bao gồm trong ứng dụng của mình, hãy chạy lệnh sau tại thư mục gốc của dự án phát triển ứng dụng của bạn để nhận báo cáo về các phụ thuộc cho dự án đó, bao gồm Support Library Android và các thư viện khác:
```
gradle -q dependencies your-app-project:dependencies
```
Để biết thêm thông tin về việc thêm Support Library vào dự án phát triển của bạn bằng Gradle, hãy xem [Thiết lập Support Library](https://developer.android.com/topic/libraries/support-library/setup.html). Để biết thêm thông tin về cách làm việc với Gradle, hãy xem [Cấu hình ứng dụng của bạn](https://developer.android.com/studio/build/index.html). Lưu ý rằng tất cả các Support Library của Android cũng phụ thuộc vào một số cấp độ cơ sở của nền tảng, đối với các bản phát hành gần đây, đó là Android 4.0 (API cấp 14) trở lên.



-----
Bài viết được dịch từ: [Support Library](https://developer.android.com/topic/libraries/support-library/#api-versions)
(thankyou)