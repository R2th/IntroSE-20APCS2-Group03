Chức năng chính của Git mà chúng ta hay dùng là lưu trữ code. Đối với project cá nhân bạn có thể lười bằng cách bỏ hết code vào 1 nhánh (master hoặc main) và không có vấn đề gì xảy ra cả. Nhưng khi làm nhóm, mọi chuyện không dễ như thế nữa, nếu bạn là Leader trong nhóm, trách nhiệm của bạn chính là làm mọi thứ dễ dàng cho thành viên "múa" code chứ không phải tham gia vào cãi nhau kiểu "đứa nào sửa code này? tính năng này sao lỗi rồi?".

Trong bài này mình sẽ giới thiệu cho các bạn (đặc biệt khi bạn có trách nhiệm quản lí nhóm) cách tổ chức code hiệu quả sử dụng Gitflow. Let's started!

# Khái niệm Gitflow

Nếu bạn đã search khái niệm của Gitflow, bạn sẽ thấy nó có 2 nghĩa khác nhau:

1. Gitflow là 1 **tool** hỗ trợ các lệnh để thao tác/ chia nhánh cho repository.
2. Gitflow là 1 quy trình làm việc với Git giúp phát triển phần mềm liên tục (continuous development) và sử dụng các best practice của Devops.

Cả 2 đều là Gitflow, chỉ là 1 thứ là tool mà Git hỗ trợ để tạo quy trình và 1 thứ là khái niệm cái quy trình đó là gì 😀 Các bạn hoàn toàn có thể implement Gitflow mà không cần tool hỗ trợ và đây là cách mình sẽ giới thiệu phía dưới.

# Tích hợp Gitflow vào project

Okay, để tích hợp Gitflow, bạn sẽ cần follow theo 1 số rules có liên quan tới nhánh (branch) của git, đầu tiên bạn cần tạo ra những nhánh sau:

1. Nhánh master (hoặc main)
2. Nhánh develop
3. Nhánh features 
4. Nhánh releases
5. Nhánh hotfix

![](https://images.viblo.asia/6c5067c4-3c6c-4e24-ad72-b0690897bb5b.png)

Tiếp theo, mình sẽ giải thích ý nghĩa và cách dùng từng nhánh.

## Nhánh Master (main)

Nhánh master là nơi chứa phiên bản release (bản cuối cùng chạy ổn nhất) chính thức mới nhất. Khi tạo repository trên Git, bạn sẽ được tạo nhánh này đầu tiên (gần đây Git đã đổi tên mặc định là nhánh main và bạn có thể đổi lại tên) và thường mình sẽ up init code (chỉ có structure) của project lên để tạo ra nhánh develop.

## Nhánh Develop

Đây là nhánh chúng ta tương tác nhiều nhất, nhánh develop là nhánh tổng hợp các feature của project. Cơ bản là khi 1 feature hoàn tất, nhánh feature đó sẽ merge vào nhánh develop.

## Nhánh Feature

Mình hay gọi là abstract branch, vì chúng ta không tạo 1 nhánh thực thụ nào tên là feature cả. Feature dùng để thực hiện 1 tính năng nào đó của project, được tạo bằng cách tách nhánh từ develop.

**Gợi ý**: mình có feature **tạo crud để quản lí sách** thì sẽ đặt tên nhánh là: feature/create-crud-for-book-management

## Nhánh Release 
 
Sau khi nhánh dev đã có đủ các chức năng để cho project có thể "release" được, chúng ta sẽ tách nhánh develop hiện tại ra thành 1 nhánh release. Nếu chạy ổn bạn nên merge vào nhánh master, ngược lại tạo nhánh hotfix để sửa lỗi.

**Gợi ý**: không nên làm 1 mạch đến cuối cùng mới có được sản phẩm, bạn có thể đặt ra vài goals, ở mỗi goal sẽ yêu cầu project phải có 1 số tính năng abc nào đó, khi xong goal cũng là lúc tạo nhánh release -> nếu quá trình làm bị tạch ở goal nào thì dùng lại nhánh release goal trước đó để làm tiếp.

**Ví dụ**: project Quản lý thư viện đặt 2 goal: Quản lí thông tin người dùng (cùng tính năng đăng nhập, phân quyền) và Quản lí các thực thể có trong thư viện (sách, thông tin mượn trả,...) -> bạn có thể chia nhỏ hơn nữa để dễ dùng lại code khi có sự cố.

## Nhánh Hotfix

Được tạo ra để fix bug từ nhánh release, sau khi fix xong merge lại vào nhánh release. không nên lười mà fix luôn ở nhánh release, quá trình fix có thể ảnh hưởng đến các feature khác, nếu xui bạn fix 1 feature và fail luôn toàn bộ feature có trong nhánh 😐

Gitflow xoay quanh việc phát triển trên 5 loại nhánh này, follow theo nó khá đơn giản nhưng sẽ giúp nhóm tiết kiệm rất nhiều thời gian. Ở các dự án có áp dụng Agile/Scrum, Gitflow cũng được triển nên việc bạn tự triển khai trước ở các project trong trường sẽ rất có lợi khi vào công ty làm.

# Tổng kết

Để sử dụng Gitflow mượt mà, bạn phải có 1 vài quy trình phát triển phần mềm nho nhỏ trong project, có thể không rườm rà như Agile nhưng nếu mạnh ai nấy làm thì lại kiểu "1 thằng gánh team 1 thằng ngồi chơi". Series này sẽ tập trung vào những vấn đề với Git mà bạn gặp ở project trường học, có thể ở series khác mình sẽ chia sẻ quy trình Agile Lite cũng như cách quản lí resource/ time cho dự án (áp dụng tốt ở trường) để các bạn tham khảo. 

# Nguồn tham khảo
https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

Ảnh: internet