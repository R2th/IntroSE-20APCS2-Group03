Nếu bạn là một comtor nhưng chưa từng bao giờ chạm tới GitHub, thì có lẽ bài viết này là dành cho bạn.<br>
Dưới đây mình sẽ giới thiệu sơ lược về GitHub cùng một vài thuật ngữ hay dùng để bạn có thể nắm được khái quát về GitHub nhé.

# GitHub là gì?
GitHub là một dịch vụ cung cấp kho lưu trữ mã nguồn Git dựa trên nền web cho các dự án phát triển phần mềm. (nguồn: wikipedia)<br>
Hay nói đơn giản, GitHub chính là nơi quản lý các phiên bản code của dev. <br>
Ngoài những dự án làm theo mô hình freelancer, thì hầu hết các dự án đều có ít nhất từ 2 đến 3 developer trở lên. Vậy source code của những developer này sẽ được quản lý ở đâu để họ cũng như những member khác trong team có thể theo dõi sự thay đổi của code, copy lại để tiếp tục phần công việc của mình, cũng như đảm bảo tính thống nhất về việc quản lý source code cho cả dự án? Những việc này sẽ được thực hiện trên GitHub.

Với khả năng lưu trữ và độ bảo mật cao của mình, GitHub được xem là nguồn lưu dữ liệu mở phổ biến nhất hiện nay. GitHub là sự kết hợp giữa 2 từ:
- Git – hệ thống quản lý dự án và phiên bản code
- Hub – nơi biến những dòng lệnh trên Git thành mạng xã hội cho lập trình viên

![](https://images.viblo.asia/0e760736-0044-4786-b3ed-141e0123eca1.jpg)

# Thuật ngữ hay dùng trong GitHub
Dưới đây là một vài thuật ngữ hay dùng trong GitHub:
- working tree<br>
    Trên Git, những thư mục được đặt trong sự quản lý của Git mà mọi người đang thực hiện công việc trong thực tế được gọi là working tree.
    
- repository<br>
  Hay thường được gọi tắt là "repo". Là một thư viện nơi chứa các file của dự án. Nó có thể đặt trong bộ lưu trữ của GitHub hoặc trong repository của máy tính local.<br>
  Repository của Git được phân thành 2 loại là remote repository và local repository:
  + Remote repository: Là repository dùng để chia sẽ giữa nhiều người và bố trí trên server chuyên dụng.
  + Local repository: Là repository ở trên máy tính của chính bản thân mình, dành cho một người dùng sử dụng.
    
- index<br>
  Giữa repository và working tree tồn tại một nơi gọi là index. Index là nơi để chuẩn bị cho việc commit lên repository.

![](https://images.viblo.asia/3acfa9ea-d5f5-4df0-92e3-67eebca32fa7.png)

- branch<br>
  Branch dịch ra nghĩa là "nhánh" đúng không - và trong git nó cũng đóng vai trò giống như vậy. Branch là cái dùng để phân nhánh và ghi lại luồng của lịch sử. Branch đã phân nhánh sẽ không ảnh hưởng đến branch khác nên có thể tiến hành nhiều thay đổi đồng thời trong cùng 1 repository. 
  
![](https://images.viblo.asia/23fcecd8-ff6e-40ae-841f-c55412e44aa6.png)


- checkout<br>
  Checkout một branch nghĩa là tạo một nhánh mới từ một nhánh nào đó. Đây là khái niệm khi dùng để phân nhánh và những thao tác sẽ được lưu trữ trên nhánh hiện tại, không làm ảnh hưởng đến nhánh cũ.
  
![](https://images.viblo.asia/3ce7312c-729a-4269-bdb9-0263ed62e6e9.png)

  
- add<br>
  Là thao tác đẩy một tệp tin từ working directory vào staging area để chuẩn bị cho việc commit.
  
- commit<br>
  Commit là thao tác để ghi lại lịch sử việc thêm, thay đổi file hay thư mục vào repository.
  
![](https://images.viblo.asia/ddc75a84-fd02-4e9c-a71b-8196ef285de3.png)

  
- pull<br>
  Thao tác lấy mã nguồn từ một hoặc nhiều nhánh cụ thể nào đó ở remote server nào đó về local repository trên máy tính của bạn. Nói đơn giản là hành động cập nhật các thay đổi xuống local repo.
  
- pull request<br>
  Viết tắt là PR.  Khác với pull là lấy code xuống local repo, thì pull request là chức năng cho phép bạn thông báo về những thay đổi mà bạn đã đẩy lên repo của người sở hữu repo đó.<br>
  Ví dụ khi bạn fork một repo về và làm việc trên đó, bạn thêm một vài chức năng và muốn những chức năng này có trong repo chính mà bạn đã fork về, tuy nhiên bạn cần sự đồng ý của chủ sỡ hữu repo đó. Lúc này điều bạn cần làm là thực hiện pull request. Các lập trình viên chính thức sẽ biết được những thứ bạn làm, tiến độ công việc, và cho phép những tính năng đó được add thêm vào project chính thức hay không.
![](https://images.viblo.asia/e07d8bb3-f897-475b-a1f6-a2cc14029d31.png)

  
- push<br>
  Push là thao tác đẩy mã nguồn hiện tại đã được commit của bạn lên remote server.
  
- clone<br>
  Thao tác tải mã nguồn từ một remote server về máy tính của bạn, chỉ tải về máy local repository nhánh master.
  
- conflict<br>
  Conflict là trường hợp ở cùng 1 hay nhiều dòng code trên một file nhưng lại có 2 hoặc nhiều sự thay đổi khác nhau. Nên khi merge, git không biết nên chọn merge mã nguồn nào nên sẽ báo conflict.
  Ví dụ: Trên file A, có member X và Y cùng thao tác nhưng trên 2 nhánh khác nhau. Tại dòng 1 đến 10 của file A, member X thì viết "Hello, cat!", member Y thì viết "Hello, dog!". Khi member X merge code từ nhánh của member Y về, thì Git không biết nên lấy "Hello, cat!" (của member X) hay "Hello, dog!" (của member Y)  là đúng nên dẫn đến việc conflict.
  
![](https://images.viblo.asia/d5d79f0d-8165-4c74-84af-064c89f5071d.png)

  
- merge<br>
  Merge là hành động khi bạn muốn nhập mã nguồn từ một nhánh khác vào nhánh hiện tại.
  Ví dụ, từ một nhánh master bạn tạo ra một nhánh "develop" dùng để phát triển chức năng login. Sau khi hoàn thành xong chức năng, đã test các kiểu, thấy nó hoàn chỉnh và có thể tích hợp được vào phần mềm thì bạn sẽ tiến hành merge. Bạn cần phải mất một vài thao tác khác như commit, push,... để có thể merge được code. Việc merge này sẽ màn chức năng login của nhánh develop vào nhánh master.