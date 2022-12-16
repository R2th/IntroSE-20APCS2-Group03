## Giới thiệu 
Ở thế giới quản lý phần mềm tồn tại một hố sâu tuyệt vọng gọi là "dependency hell".  Đó là khi hệ thống của bạn phát triển ngày một lớn, và có một loạt các gói (packages) được thêm vào trong phần mềm của bạn, rồi đến một ngày, bạn sẽ bị lẫn vào trong đó và không thể tìm thấy chính bản thân mình trọng hố sâu tuyệt vọng đó. 

Ở trong một hệ thống, sẽ có rất nhiều dependency,  sự thay đổi các version release một cách nhanh chóng thật như một ác mộng vậy. Nếu để dependency một cách chặt chẽ (ví dụ như cài gói A version 2.2.2 )  bạn  có nguy cơ gặp phải "version lock". Nghĩa là  không thể nâng cấp phiên bản của gói mà nếu không có bản release của version mới của các package được dependency.  Nếu để dependency một cách lỏng lẻo (ví dụ chỉ dependency 1 gói A và không quy định phiên bản).  Thì có thể các version mới của package dependency không còn hỗ trợ những hàm được gọi đến nữa. Việc xảy ra hiện tượng "lock version" hay sự không tương thích ở các bản dependency khác nhau gây khó khăn trong việc phát triển dự án, mở rộng dự án, hoặc phát triển ở các môi trường không giống nhau. Điều đó gọi chung là "dependency hell", hay hiểu nôm na là hố sâu tuyệt vọng dependency. 

Để giải quyết vấn đề này,  có một vòng lặp với các rule cơ bản, về việc đặt tên version, giao cho ai, và tăng tiến như thế nào. Những rule này có thể là cơ sở, nhưng không hạn chế các biến thể khác, phụ thuộc vào tình hình thực thế, và có thể áp dụng vào cả mô hình closed/open source.  Để hệ thống này hoạt động, đầu tiên bạn cần khai báo 1 public API. Nó có thể là tồn tại các tài liệu hoặc có thể chính là code của chúng.  Một điều quan trọng là API này phải thật rõ ràng và tóm lược. Một khi bạn có được public API của mình, bạn có thể trao đổi về một số thay đổi cụ thể bởi version number.  Version number có định dạng X.Y.Z(Major.Minor.Patch).  Quy tắc là các bug được fix sẽ tăng các Patch version, nhưng nếu thay đổi nhỏ về API thì tăng minor version, nếu thay đổi lớn về API thì tăng major version. 

Và nó được gọi là hệ thống "Sematic version". Bên dưới chính là cấu trúc của nó,  number version (số phiên bản) sẽ là con đường để mô tả về code từ version này sang version sau. 

Cái này hiểu như này. 
Ta có 9 là Major 
1 là Minor
8 là Patch 
Giả sử có phiên bản lol 9.17
Khi fix một hoặc một số bug nào đó, ta có phiên bản 9.17, 9.18,  9.19. 
Khi ta bổ sung hoặc thực hiện thay đổi nhỏ nào đó của API thì nó sẽ là 9.20. Các phiên bản fix bug tương tự sẽ là 9.21, 9.22..etc 
Khi thay đổi hẳn, hoặc thay đổi lớn, và nó không còn tương thích với những cái khác ở phía API, thì nó được gọi là version 10.0.0

## Nội dung Chính mô tả về Sematic versioning 

- Những từ khóa được dùng là "MUST", "MUST NOT" "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY" và "OPTIONAL" trong tài liệu theo mô tả ở [RFC 2119 ](http://tools.ietf.org/html/rfc2119)
1. Phần mềm sử dụng "Semantic versioning" **PHẢI** khai báo 1 public API. API này có thể được khai báo bởi chính code của nó, hay là một tài liệu. Tuy nhiên, nếu nó hoàn thành, nó **NÊN** tóm lược và toàn diện. 

2. Một version number thông thường **PHẢI** có định dạng X.Y.Z, trong đó X, Y, Z là những số nguyên dương, và **PHẢI KHÔNG**, được bắt đầu với số 0.  X là major version, Y là minor version và Z là patch version. Với mỗi cài đặt **PHẢI** tăng số của phiên bản và theo thứ tự tăng dần. 

3. Một version khi được đánh dấu, thì nội dung của version **PHẢI KHÔNG** được thay đổi, mọi sự thay đổi **PHẢI** được released ở version tiếp theo. (Chỗ này quen thuộc hơn là 1 scope 1 bản release là kịch bản đã được định sẵn và không thay đổi, nếu cần bổ sung gì đó, thì nó phải được thêm vào ở bản release tiếp theo)

4. Major version 0 (0.y.z) được dùng để init nội dung phát triển, mọi thứ **CÓ THỂ** thay đổi ở bất cứ thời gian nào. Những public API **KHÔNG NÊN** được coi là bản ổn định. 

5. Version 1.0.0 định nghĩa public API.  Từ bây giờ, thì các version number sẽ tăng dần sau khi release, phụ thuộc vào public API, và việc nó sẽ thay đổi thế nào. 

6. Patch version Z (x.y.Z| x> 0) **PHẢI** được tăng dần dựa vào những bản fix bug tăng dần. Một bug được định nghĩa là một sự thay đổi tạm thời để thay đổi những hành vi không đúng. 

7. Minor version Y (x.Y.z | x > 0) **PHẢI** tăng dần, nếu có sự thay đổi về chức năng của public API. Nó phải tăng dần nếu bất cứ một chức năng (function) nào của public API được cho lkaf không dùng nữa. Nó **CÓ THỂ** tăng nếu có sự cải thiện chức năng, function mà không thực hiện đến các private code. Nó có thể bao gồm các sự thay đổi của các patch. Patch version **PHẢI** được reset về 0 nếu minor version đã tăng lên.  

8. Major version X (X.y.z | X > 0) **PHẢI** tăng dần nếu có sự thay đổi không tương thích với những gì đã được giới thiệu ở public API. nó **CÓ THỂ** bao gồm các minor và patch. Patch và Minor version sẽ phải reset về 0 khi major version tăng lên.

9. Một bản pre-release version (tiền phát hành, hoặc hiểu là, một bản thử nghiệm) **CÓ THỂ** được biểu thị bởi dấu gạch nối và một loạt các số, hoặc chứ ngay sau *patch version*.  Các định danh (indetifiers) **PHẢI**  bao gồm các chứ và số và dấu gạch nối (các ký tự trong bảng ASCII). Các định danh **PHẢI KHÔNG** được để trống. Các định dạng **PHẢI KHÔNG** bao gồm các số 0 đứng đầu.
Các phiên bản tiền phát hành (bản thử nghiệm) có độ ưu tiên thấp hơn phiên bản bình thường đi kèm.
Phiên bản tiền phát hành (pre-release version, bản thử nghiệm) cho biết phiên bản không ổn định và có thể không đáp ứng các yêu cầu tương thích dự định như biểu thị bằng phiên bản thông thường. Ví dụ 1.0.0-alpha, 1.0.1-alpha. ..vân vân 

10. Xây dựng metadata **CÓ THỂ** được biểu thị bởi một dấu **+** và hàng loạt các ký tự định danh ngay sau *patch* hoặc *pre-release version*. Các định dang **PHẢI** bao gồm những ký tự ASCii và dấu gạch nối. Các định danh phải không được để trống. Build metadata, phải được bỏ qua trong việc xác định độ ưu tiên của các phiên bản. Như vậy, 2 version chỉ khác nhau ở meta data, thì chúng có cùng độ ưu tiên. Ví dụ: 1.0.0-alpha+001, 1.0.0+20130313144700, 1.0.0-beta+exp.sha.5114f85.

11. Độ ưu tiên của các version sẽ được so sánh với nhau khi chúng được sắp xếp. Độ ưu tiên **PHẢI** đưuọc tính toán và chia nhỏ thành các major, minor, patch và các bảnh pre-release (bản thử nghiệm) cũng sẽ phải được sắp xếp (các phiên bản build metadata không có độ ưu tiên).  Mức độ ưu tiên của các phiên bản khác nhau, sẽ được xác định bởi các định dang của chúng từ trái qua phải, bao gồm: so sánh Major, minor và ptch version luôn luôn là so sánh giữa các số. Do đó ta sẽ có 1.0.0 < 2.0.0 < 2.1.0 < 2.1.1. Khi major, minor và patch là giống nhau, thì chúng ta sẽ so sánh các pre-release version ở mức độ thấp hơn những phiên bản thông thường. Ví dụ: 1.0.0-alpha < 1.0.0.
Mức độ ưu tiên của 2 bản pre-release version cùng phiên bản (major, minor, patch)  sẽ là so sánh các ký tự khác nhau đầu tiên khác nhau từ trái qua phải sau dấu *.*. Các phiên bản chỉ bao gồm các số, sẽ được so sánh như thông thường, các phiên bản có các ký tự trong bảng mã ASCII, sẽ được so sánh theo thứ tự trong bảng mã ASCII.  Các phiên bản chỉ bao gồm số, sẽ luôn có phiên bản thấp hơn những bản có chứa ký tự. Ví dụ: 1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0.
## Tại sao lại sử dụng Sematic versioning?
Sử dụng Sematic versioning không phải là một ý tưởng mới hay cách mạng. Trong thực tế, bạn có thể làm một cái gì đó gần với điều này đã. Vấn đề có thể đóng lại khi chưa tốt. Tuy vậy không tuân thủ một số loại đặc điểm kỹ thuật chính thức, số phiên bản về cơ bản là vô dụng đối với quản lý phụ thuộc. Bằng cách đặt tên và định nghĩa rõ ràng cho các ý tưởng trên, việc truyền đạt ý định của bạn đến người dùng phần mềm của bạn trở nên dễ dàng.
 
Một khi những ý định này là rõ ràng, linh hoạt (nhưng không quá linh hoạt) cuối cùng có thể được thực hiện. Một ví dụ đơn giản sẽ chứng minh làm thế nào "dependency hell" trở thành quá khứ. Hãy xem xét một thư viện có tên là Firetruck. Nó yêu cầu một gói Phiên bản ngữ nghĩa có tên là Lad Ladder. Lúc đó, Firetruck được tạo ra, Ladder đang ở phiên bản 3.1.0. 
Do Firetruck sử dụng một số chức năng được giới thiệu lần đầu tiên trong 3.1.0, bạn có thể chỉ định một cách an toàn phụ thuộc Ladder lớn hơn hoặc bằng 3.1.0 nhưng nhỏ hơn 4.0.0. Bây giờ, khi Ladder phiên bản 3.1.1 và 3.2.0 trở nên khả dụng, bạn có thể phát hành chúng cho hệ thống quản lý gói của mình và biết rằng chúng sẽ tương thích với phần mềm phụ thuộc hiện có. Là một nhà phát triển có trách nhiệm, tất nhiên, bạn sẽ muốn xác minh rằng mọi gói nâng cấp đều hoạt động như quảng cáo. Thế giới thực là một nơi lộn xộn; Không có gì chúng ta có thể làm về điều đó nhưng hãy cảnh giác. 

Những gì bạn có thể làm là để Semantic Versioning cung cấp cho bạn một cách lành mạnh để phát hành và nâng cấp các gói mà không phải cuộn các phiên bản mới của các gói phụ thuộc, tiết kiệm thời gian và rắc rối. Nếu tất cả điều này nghe có vẻ mong muốn, tất cả những gì bạn cần làm để bắt đầu sử dụng Phiên bản ngữ nghĩa là tuyên bố rằng bạn đang làm như vậy và sau đó tuân theo các quy tắc. Liên kết đến trang web này từ README của bạn để những người khác biết các quy tắc và có thể hưởng lợi từ chúng.
  [Link bài viết gốc ở đây](https://semver.org/)