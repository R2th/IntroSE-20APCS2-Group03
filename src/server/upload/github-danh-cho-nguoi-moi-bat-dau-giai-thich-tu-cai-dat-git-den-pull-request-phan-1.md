## Kiến thức cơ bản về Git và GitHub
Bạn có thể đã nghe nói về các thuật ngữ như **Git** và **GitHub**. Vậy Git và GitHub khác nhau thế nào có thể nhiều bạn vẫn chưa nắm rõ. Trong bài viết này sẽ chỉ ra những điểm khác nhau để phân biệt được Git và GitHub.

Đầu tiên, hãy giải thích ngắn gọn về Git và GitHub.

**Git** là tên gọi của **hệ thống kiểm soát phiên bản phân tán** (Tiếng Anh: Distributed version control system). 

Git có thể chỉnh sửa các file trên Local PC và quản lý lịch sử chỉnh sửa file. 

Trước đây, CVS và Subversion thường được sử dụng làm hệ thống kiểm soát phiên bản phần mềm, nhưng hiện tại Git được sử dụng phổ biến.

**GitHub** là tên gọi của **dịch vụ web chia sẻ** cho các dự án phát triển phần mềm **sử dụng Git**.

Không chỉ quản lý source code của bạn bằng Git, mà còn review được trên GitHub, hợp tác cùng làm việc với những member khác mới thực sự phát huy được được sức mạnh thực sự của Git.

Như vậy, nói ngắn gọn Git là một hệ thống, còn GitHub là một dịch vụ sử dụng Git. Các bạn đừng nhầm lẫn.

### Có thể phát triển trên local bằng Git

Sau đây là mộtsố tóm tắt ngắn gọn về các tính năng của Git.

* Có thể làm việc trên Local

* Mỗi programer  có thể sở hữu một kho lưu trữ (Repository) chứa cùng thông tin giống nhau (nhóm các file đối tượng được kiểm soát phiên bản).

Với CVS và Subversion, các thay đổi được phản ánh (commit) tới kho lưu trữ đang được chia sẻ cho tất cả mọi người ở mọi thời điểm (phiên bản tập trung). 

Do đó, nếu bạn không cẩn thận lúc commit thì sẽ dẫn đến rủi ro là source code đang phát triển không đầy đủ, hoặc chia sẻ cả source code đang dùng để test thử.

Tuy nhiên với Git là dạng phiên bản phân tán, bạn có thể commit trên PC local của mình. 

Trong lúc tiếp tục commit source, bạn cũng có thể push ở bất cứ lúc nào. Do đó, bạn không cần phải lo lắng rằng source code đang phát triển có ảnh hưởng đến tất cả các thành viên đang cùng chia sẻ nó hay không.

Ví dụ cụ thể, trong trường hợp CVS và Subversion, bạn bắt buộc phải sửa đổi một blog đã public, nhưng nếu bạn dùng Git, bạn có thể sửa đổi nó ở trạng thái draft riêng tư.

### Thuật ngữ cơ bản về Git


| Thuật ngữ  | Nội dung|
| -------- | -------- |
| repository | Nơi lưu trữ dữ liệu. Git quản lý dữ liệu trong đơn vị lưu trữ này. Lịch sử sửa đổi cũng được lưu lại. |
| remote repository | Một kho lưu trữ trên máy chủ. Lưu trên máy chủ và dùng để chia sẻ.|
| local repository | Một kho lưu trữ local.|
| clone | Để nhân đôi một kho lưu trữ từ xa. Lịch sử sửa đổi cũng được nhân đôi.|
| branch | Quản lý một loạt các sửa đổi bằng cách phân nhánh từ dòng chính thành một nhánh riêng. Sửa đổi trên một nhánh này sẽ không bị ảnh hưởng bởi các nhánh khác, vì vậy bạn có thể cùng một lúc phát triển nhiều cái trong cùng một kho lưu trữ.|
| checkout| Di chuyển đến một nhánh khác và đặt thư mục làm việc của bạn ở bất kỳ trạng thái commit nào. |
|commit | Để phản ánh các nội dung sửa đổi trong kho lưu trữ local. |
|push | Để phản ánh nội dung sửa đổi của kho lưu trữ local sang kho lưu trữ từ xa. |
| pull | Để phản ánh nội dung sửa đổi của kho lưu trữ từ xa đến kho lưu trữ local. |
| merge | Kết hợp sửa đổi từ các nhánh khác nhau. Lịch sử thay đổi vẫn còn lưu ở tất cả các nơi. |
| conflict | Tại thời điểm merge, cùng 1 nội dung của cùng một file đã bị sửa đổi ở cả từ xa và local, do đó không thể merge tự động. Bạn sẽ cần phải chỉnh sửa thủ công  ở cả hai nơi cùng nhau. |

### Có thể đề xuất phương án chỉnh sửa cho public software bằng GitHub

Tính năng chủ chốt của GitHub là bạn có thể communication với các programer khác thông qua source code . 

Nhiều source code khác cũng được công khai sẵn trên GitHub. Và bạn hoàn toàn có thể yêu cầu chỉnh sửa cho họ, cũng như đề xuất các source code mà bạn đã sửa đổi.

Nếu bạn điểm gì lưu tâm tới source code được công khai OSS (Open-Source Software), thì bạn có thể xác nhận được flow tới thời điểm hiện tại, 

chỉnh sửa source code rồi đề xuất bằng pull request, như vậy bạn có thể kết hợp phần sửa đổi của bạn vào trong OSS.  

Do đó, GitHub giúp việc tham gia vào OSS dễ dàng hơn.

Ngoài việc xem source code của các programer khác, bạn cũng có thể công khai chính thành quả/sảnphẩm của mình. 

Việc công khai sẽ giúp source code được review và nhận các feedback, đây mới là điều thực sự giá trị.

Ngoài communication, nó cũng có các chức năng hữu ích trong quá trình phát triển, chẳng hạn như quản lý bug, change request, issue, hiển thị trạng thái hoạt động của từng programer.

Để phát huy sức mạnh thực sự của Git, thì không thể thiếu sự tồn tại của GitHub.

### Thuật ngữ cơ bản về GitHub

| Thuật ngữ  | Nội dung|
| -------- | -------- |
| pull request | Chức năng review source code mà GitHub có. Sử dụng tính năng này để yêu cầu các programer  khác xem bản sửa lỗi của bạn là gì khi bạn đưa nó vào kho lưu trữ hoặc nhánh ban đầu. Bạn có thể ngăn chặn lỗi và sửa source code  tốt hơn. |
| Fork | Khả năng sao chép kho lưu trữ của các programer  khác trên GitHub và tự chỉnh sửa chúng. Bằng cách sao chép với chức năng này, kho lưu trữ của nguồn sao chép cũng được hiển thị và có thể làm rõ source code nào là phiên bản gốc hay phiên bản sao chép.|
| issue | Chức năng quản lý được cung cấp trong GitHub. Bạn có thể quản lý các sự cố trong dự án và source code, đồng thời có thể quản lý các sự cố bằng cách liên kết chúng với thông tin trên GitHub như source code , pull request và lịch sử sửa đổi.|
| organization | Một nhóm như một tổ chức, một nhóm hoặc một dự án. Bạn có thể tạo và quản lý kho lưu trữ trong tổ chức.|
| Gist | Một đoạn code ngắn và dịch vụ chia sẻ ghi nhớ được cung cấp bởi GitHub. Không chỉ kiểm soát phiên bản, mà bạn còn có thể sao chép những gì các programer khác đã viết và nhúng nó vào các blog khác ngoài GitHub.|
| Pages| Dịch vụ lưu trữ được cung cấp bởi GitHub. Nếu bạn có tài khoản GitHub, bạn có thể công khai các trang web miễn phí. Dễ dàng để làm và thậm chí bạn có thể sửa đổi một trang web với một kho lưu trữ tùy chỉnh. |

------còn nữa-----