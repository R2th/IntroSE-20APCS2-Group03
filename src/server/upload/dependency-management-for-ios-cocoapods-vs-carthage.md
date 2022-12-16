## **Giới thiệu.**
Đối với các lập trình viên việc tái sử dụng code không chỉ giúp tiết kiệm được thời gian, chi phí cho công việc phát triển phần mềm, tập trung vào phát triển các tính năng chính mà còn góp phần giảm bớt sự nhàm chán khi phải làm đi làm lại các công việc lặp lại trong các dự án khác nhau. 

Có hàng ngàn thư viện trên Github sẵn sàng để cho các lập trình viên tích hợp vào dự án của mình, và bạn hoàn toàn có thể thêm chúng một cách rất thủ công đó là lên github tải về và thêm vào dự án.

Tuy nhiên tại sao bạn lại phải vất vả như thế trong khi chúng ta đã có những công cụ làm việc đó giúp chúng ta một cách tự động. Chúng không chỉ giúp công việc của bạn trở nên đơn giản hơn mà những người khác khi phát triển code của bạn cũng dễ dàng cài đặt hơn. 

Hãy lấy ví dụ thế này nhé, một cách rất thủ công, bạn lên github, tải hết các mã, thêm vào dự án của mình, sau đó bạn code và lại đẩy dự án của bạn lên github để người khác có thể clone chúng về 

![](https://images.viblo.asia/26e68d2b-7960-4a87-80c3-3dbacb408c71.png)

**Vấn đề ở đây là gì ?**
- Thứ nhất bạn đang không chỉ push lên code của bạn mà bạn cũng đang push luôn những code có sẵn trên git thêm một lần nữa, việc này rất mất thời gian đúng không.
- Thứ hai đó là khi bạn muốn cập nhật phiên bản, thêm một lần nữa bạn lại phải lên git tải bản mới và ghi đè lên thư viện cũ.
- Thứ ba, tôi cá rằng chỉ một thời gian ngắn bạn sẽ chẳng nhớ mình đang sử dụng version nào :]], việc này không chỉ gây khó khăn cho bạn mà còn gây khó khăn cho người khác khi phải maintain code của bạn vì họ cũng chẳng biết version của thư viện bạn đang sử dụng.

##  Hãy để CocoaPods và Carthage giúp bạn xử lý vụ này okay.

* ***Cài đặt dễ dàng chỉ bằng vài dòng lệnh.***
* ***Chỉ cần thêm đường dẫn của thư viện, bạn không cần quan tâm với việc tải về và thêm chúng vào project.***
* ***Hỗ trợ bạn các tuỳ chọn quản lý version của thư viện.***
* ***Dễ dàng cập nhật các phiên bản mới nhất chỉ bằng một dòng lệnh***

| Command | CocoaPods | Carthage |
| -------- | -------- | -------- |
| Setup     | sudo gem install cocoapods     | brew install carthage     |
| Create management file     | pod init     | touch Cartfile    |
| Install     | pod install    | carthage update     |

(Các bạn có thể tham khảo thêm về các lệnh quản lý trong [CocoaPods](https://guides.cocoapods.org/) và [Carthage](https://github.com/Carthage/Carthage/blob/master/README.md))

## Câu hỏi đặt ra là bạn nên sử dụng cái nào CocoaPods hay Carthage ?

![](https://images.viblo.asia/a7525986-9c68-4ba8-853e-7d84bb42bf9c.png) 

Hừm, bạn sẽ có câu trả lời ngay sau đây thôi.

**Hãy xem các bước để thêm thư viện alamofire vào CocoaPods nhé :**
 
 - *Bước 1 : Mở terminal lên, trỏ đến thư mục gốc project của bạn và gõ lệnh:*
```
pod init
```
Done, một file pod được tạo ra. Bạn có thể mở project ra để xem (hoặc là gõ lệnh `ls` để kiểm tra.)
- *Bước 2 : Mở file pod bạn tạo lên bằng lệnh:*
```
open -a Xcode Podfile
```
> bây giờ pod file đã được mở lên và bạn chỉ cần thêm đoạn text sau vào file để cocoaPods hiểu được là bạn muốn thêm alamofire vào project của mình : `pod 'Alamofire'`. Sau khi thêm xong trông nó sẽ như thế này :

```
target 'Example' do
  use_frameworks!
  pod 'Alamofire'
end
```
> trong đó `Example` là tên target project của bạn, `use_frameworks!` sẽ giúp CocoaPod hiểu rằng nếu thư viện bạn muốn thêm được viết bằng objectiveC nó sẽ convert sang swift cho bạn.

- *Bước 3: Gần xong rồi giờ thì đến bước tải thư viện về và thêm vào project, chỉ cần 1 dòng lệnh là đủ :*
```
pod install
```
> và giờ thì làm ngụm nước và chờ cho CocoaPods giúp bạn làm các công việc còn lại, sau khi hoàn thành bạn sẽ thấy trong thư mục gốc có một file có đuôi `.xcworkspace` được sinh ra, và từ giờ trở đi thay vì click vào file `.xcodeproj` để mở project như bạn vẫn thường làm thì hãy click vào file  `.xcworkspace`

Woww!! rất đơn giản phải không.

**Và giờ thì xem Carthage làm như thế nào nhé.**
 - *Bước 1 : Bạn cũng mở terminal lên, trỏ đến thư mục gốc project của bạn và gõ lệnh:*
```
touch Cartfile
```
> y hệt như CocoaPods một file được sinh ra khác mỗi cái tên `cartfile`

 - *Bước 2 : Cũng giống CocoaPod bạn cũng phải mở  `cartfile` và khai báo để  Carthage có thể hiểu thứ bạn muốn*
```
open -a Xcode Cartfile
```
> Có một chút khác biệt ở đây, nếu như CocoaPods quản lý theo tên thư viện thì Carthage lại quản lý theo đường dẫn trong github `Username/ProjectName` vì thế ở đây chúng ta sẽ khai báo như sau : `github "Alamofire/Alamofire"`

- *Bước 3: CocoaPods làm sao thì Carthage cũng làm vậy thôi =)), chỉ cần 1 dòng lệnh là đủ :*
```
carthage update
```
> Xong, giờ bạn cũng ngồi uống nước và chờ thôi. Tuy nhiên công việc tiếp theo của bạn vẫn còn đang chờ phía trước bởi vì không giống CocoaPods, chả có cái file mới nào được sinh ra ở đây cả.

![](https://images.viblo.asia/260eb2c9-e57f-458d-8549-2d5de0a37208.png)

##### Có bạn nào quyết đinh dừng ở đây và sử dụng CocoaPods không :)
##### Hãy kiên nhẫn thêm chút nữa nhé :] 

- *Bước 4:  Thêm framework vào project*

> Mở thư mục gốc của bạn lên, có một số folder mới được tạo ra, mở chúng lên Carthage --> Build -->  iOS bạn sẽ thấy Alamofire.framework, công việc tiếp theo của bạn là kéo framework này vào project.
> 
> Tiếp theo, trong target --> Build phases bạn cần click nút + phía trên bên trái giao diên để thêm đoạn Script sau :
> `/usr/local/bin/carthage copy-frameworks`
> 
> Sau đó ở mục Input Files bạn khai báo đường dẫn sau : 
> 
> `$(SRCROOT)/Carthage/Build/iOS/Alamofire.framework`
> Done, kết quả sẽ như sau :

![](https://images.viblo.asia/2e8dab2c-1d8d-4f41-862a-2170b32544ab.png)

# Kết luận.

Nhìn thoáng qua chắc chắn các bạn đều thấy CocoaPods thực hiện đơn giản và nhanh hơn Carthage, đó cũng chính là ưu điểm của CocoaPods :
- Dễ dàng cài đặt.
- Tự động thiết lập các cài đặt cho project, bạn không cần hiểu và cũng không cần quan tâm nó được thiết lập thế nào.
- Nó cũng là một công cụ ra đời trước, rất phổ biến, được hỗ trợ bởi một cộng đồng lớn nhất và bao gồm hầu hết các thư viện IOS mã nguồn mở.

Tuy nhiên có những ưu điểm cũng chính là nhược điểm của nó :
- Việc đầu tiên đó là bạn buộc phải cài đặt các công cụ Ruby dependencies như gem,..
- Chính vì CocoaPods tự động cấu hình và cài đặt thế nên bạn không thể hiểu nó làm gì và nếu xảy ra lỗi thì rất khó để sửa, ví dụ như khi bạn muốn xoá  nó đi thì sẽ mất công tìm hiểu không chỉ xoá file mà còn phải xoá một số chỗ mà CocoaPods đã cài cắm cấu hình ở đó.
- Thêm một điểm nữa là khi sử dụng CocoaPods bạn phải liên tục update repo vì có thể bạn sẽ không update được version nếu chúng khác repo
- Cuối cùng vì không làm việc trực tiếp với github mà phân phối bơi Podspecs nên có thể nếu project bị xoá khỏi pod list thì bạn sẽ không có cách nào sử dụng CocoaPods để tích hợp chúng vào project.

Trở lại với Carthage, rõ ràng nhược điểm của nó so với CocoaPods đó là việc cài đặt có thêm một bước phức tạp hơn chút, tuy nhiên nếu quen rồi thì bạn cũng sẽ thấy nó rất đơn giản và hơn hết những công việc mà CocoaPods dấu bạn thì với Carthage bạn sẽ tự tay làm hết, và khi đó bạn cũng sẽ hiểu hơn và dễ dàng chỉnh sửa nếu muốn.

Hãy quan sát trong thư mục gốc project của bạn, Carthage sinh ra hai folder con trong foler Carthage. 
> Build : chứa các framework được build từ mỗi dependency, có thể là download trên git nếu có sẵn hoặc build từ chính source code, đây chính là điểm mới mà CocoaPods không có
> 

> Checkouts : Đây là thư mục chứa code từ github, ở đây cũng có một điểm mới đó chính là với CocoaPod bạn không thể sửa thư viện dependency vì nếu sau đó bạn chạy lện update nó sẽ xoá hết những gì bạn muốn sửa,  Carthage cung cấp khả năng update với` --use-submodules `option, nghĩa là bạn có thể khai báo những gì bạn không muốn bị ghi đè khi update.

Thêm một điểm nữa mà mình đánh giá cao Carthage hơn đó là bởi vì Carthage được phát triển chính bởi các nhà phát triển git nên chúng ta không cần phụ thuộc vào một bên thứ 3 như CocoaPods.

Mặc dù hiện tại Carthage chỉ được hỗ trợ bởi một cộng đồng nhỏ và còn nhiều thư viện cũ không hỗ trợ Carthage cũng như bị đánh giá là còn chậm và chưa được ổn định, tuy nhiên với những ưu điểm mà chúng ta vừa cùng nhau phân tích ở trên thì theo mình Carthage chắc chắn sẽ lơn mạnh hơn trong tương lai.

Và chúng ta, với vai trò là những lập trình viên hãy suy nghĩ và lựa chọn cho mình công cụ phù hợp với mục đích phát triển của mình.

Cảm ơn các bạn đã theo dõi ~.