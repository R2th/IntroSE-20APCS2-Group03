***Dịch từ bài viết “【初心者向け】Gitってなに？①まず流れを理解する（コードなし）”. (Link: https://qiita.com/nutsinshell/items/96cb83aecf9d09a7a8bc).***

Bài viết này là những ghi chú giúp cho việc học của người mới bắt đầu.

Hiện nay, GitHub đang trở nên rất phổ biến và được nhiều người sử dụng, tuy nhiên, nếu không hiểu Git là gì, bạn sẽ khó mà sử dụng được nó, do đó dễ dẫn đến chán nản và bỏ cuộc. Tôi cũng đã từng rơi vào hoàn cảnh như thế.

Vì vậy, tôi đã thử tìm hiểu về Git một cách nghiêm túc từ những khái niệm cơ bản nhất.

# 1.Git là gì?
Git là một hệ thống quản lý phiên bản.

Quản lý phiên bản ...?

Quản lý phiên bản là quản lý lịch sử thay đổi của các phiên bản.

Ví dụ, khi bạn lưu đề một file nào đó, để dữ liệu ban đầu không bị mất đi, bạn sẽ làm cách nào? Thường thì ta sẽ copy một phiên bản chuyên dùng để lưu trữ đúng không nào? 

Thế nhưng, chắc hẳn ai cũng từng có trải nghiệm thế này.

 - Việc lưu trữ dữ liệu gốc rất rắc rối
 - Nhiều file có cùng một tên gọi, ví dụ như ‘Meeting_Mar.txt’ hay ‘Meeting_Last.txt’, v.v
 - Có nhiều người trong team cùng chỉnh sửa các file nên không xác định được ai là người thực hiện chỉnh sửa cuối cùng.
- Bạn lỡ tay ấn nhầm nút lưu trong khi đang đồng thời thực hiện việc chỉnh sửa cùng với đồng nghiệp hay cấp trên.
 - Tuy đã được thông báo Đã ghi đè nhưng không xác định được nội dung thay đổi nằm ở đâu.
- Bạn muốn quay lại tình trạng file như đã chỉnh sửa trong một lần lưu nào đó trước đây.
 ...

Đây đều là những tình huống có thể xảy ra! Chúng có thể được giải quyết nhờ hệ thống quản lý phiên bản Git.
# 2.Thuận tiện hơn nhờ việc sử dụng Git
Toàn bộ những tình huống kể trên đều sẽ được giải quyết:

 - Toàn bộ lịch sử thay đổi đều được lưu lại trên Git nên việc tạo file sao chép để lưu trữ không còn cần thiết nữa.
 - Các thông tin về các thay đổi như “ai”, “khi nào”,”thay đổi ở đâu” đều có thể ghi chép lại.
 - Nhờ vào đó, các file đã được chỉnh sửa nhiều lần hoàn toàn có thể khôi phục lại trạng thái trước đó.
- Có thể hiện thị vị trí thay đổi, điểm có sai khác.
 - Sau khi ta mở một file nào đó mà đồng thời có người khác đang tiến hành chỉnh sửa trên file đó, thì khi upload, cảnh báo được đưa ra, việc lỡ tay lưu đè sẽ được phòng trừ.

Quá tuyệt vời đúng không nào?

Còn về GitHub, đây là dịch vụ web sử dụng cơ chế của Git. Nhờ vào dịch vụ này, ta có thể lưu trữ các đoạn code và dữ liệu của mình, công khai nó hoặc cùng những người khác lưu trữ và chính sửa một cách hoàn toàn miễn phí.

## Hệ thống quản lý phiên bản dạng phân tán.
Git sử dụng cơ chế quản lý phiên bản dạng phân tán. 

Cơ chế này sẽ tạo bản phục chế hoàn hảo của repository, bao gồm cả những thay đổi trên môi trường local (máy tính cá nhân, v.v). Nói cách khác, ta sẽ coi mỗi môi trường local là một server của repository.

Vì thế, với Git, có thể lưu trữ được cả lịch sử thay đổi trên cả môi trường local. Nghĩa là, có thể thực hiện thao tác thay đổi ngay cả khi đang ngắt kết nối với network. 

Cho tới nay, hình thức tập trung vẫn thường được sử dụng, nhiều người sẽ cùng nhau sử dụng một repository duy nhất trên server, dẫn đến vấn đề về tính thống nhất của những thay đổi và vấn đề liên quan đến Network. Đối với mô hình phân tán, ta không cần phải lo lắng đến vấn đề này. Những năm gần đây, Git và GitHub đã trở thành công cụ quan trọng đối với các nhà phát triển.
Những nội dung tôi vừa nói trên đây có lẽ sẽ dễ hiểu hơn nếu các bạn chỉ đọc lướt qua, sau đó đọc cho tới hết bài viết này của tôi, rồi quay lại đọc kỹ chúng một lần nữa.

# 3.Repository?
Trong phần này, tôi sẽ nói về repository và cách sử dụng nó

## Repository là gì?
Repository là nơi lưu trữ trạng thái các file và danh bạ (directory) của chúng. Những trạng thái này được lưu trữ dưới dạng Lịch sử thay thổi. Nhờ vào việc đặt các danh bạ muốn quản lý vào repository, ta có thể ghi chép lại lịch sử thay đổi của các file nằm trong danh bạ và chính danh bạ đó.

Repository được chia thành 2 loại: Remote Repository và Local Repository.

- Remote Repository: Được đặt ở server, dùng để chia sẻ giữa nhiều người.

- Local Repository: Sử dụng tại mỗi máy tính cá nhân của từng người.

Thông thường, các thao tác sẽ được tiến hành bằng máy tính cá nhân của từng người thông qua việc sử dụng local repository. Bên cạnh đó, có thể thông qua remote repository để lấy được nội dung thao tác của những người khác.

Điểm mấu chốt là quá trình đem file mà ta đã chỉnh sửa upload lên nơi mà những người khác có thể nhìn thấy.

# 4.Các từ ngữ chuyên ngành
Việc xuất hiện nhiều từ ngữ chuyên ngành dễ dẫn đến khó khăn trong việc hiểu về GIT, nhưng nếu không nắm rõ trước toàn bộ những từ này, chúng ta sẽ không lý giải được những nội dung tiếp sau.

Ngược lại, chỉ cần hiểu rõ các từ ngữ chuyên môn và flow, những cuốn sách và bài viết trên mạng mà trước kia chúng ta cảm thấy khó hiểu cũng sẽ trở nên rõ ràng. Vì thế, tốt hơn hết, hãy sớm nắm chắc những kiến thức này.

Sau đây, tôi sẽ thuyết minh về các từ ngữ chuyên ngành, song song với việc nói về cách sử dụng git.

Tôi đã in nghiêng các từ vựng được nhắc đến trước đó nên nếu không nhớ ra nghĩa của một từ, hãy scroll lên trên để xem lại nhé.

**Working Tree:**

Directory hiện đang thao tác.

**Index:**

Sau khi kết thúc việc chỉnh sửa trên Working Tree, bạn muốn lưu trữ chúng vào local repository đúng không nào? Khi đó, đăng ký tại điểm này. Trường hợp thêm vào repository thì bắt buộc phải gói gọn trong một lớp nền. Tuy điều này rất rắc rối, nhưng bằng việc bó hẹp này, ta có thể đăng ký được chỉ các nội dung sai khác đã được thay đổi và việc quản lý sẽ chính xác, rõ ràng hơn.

Chính vì thế, ở giai đoạn chỉ thêm vào index, chưa lưu vào repository, ta đã duy trì tình trạng “Tiếp theo, tôi muốn lưu nội dung này”.

**Commit:**
File đã thêm vào index sẽ đăng ký vào local repository của bản thân. Sau đó, commit, thứ ghi chép lại những khác biệt giữa lần update trước so với tình trạng hiện tại, sẽ được tạo thành. 

Commit này được lưu trữ tại repository dưới dạng lịch sử thay đổi. Vì thế, ta có thể biết được lịch sử thay đổi trong quá khứ cũng như những nội dung đã được update. Hãy tưởng tượng nó giống như việc ghi đè vậy.

**Push**

Nào, hãy sẵn sàng cho việc upload lịch sử thay đổi của local repository cá nhân lên remote repository để chia sẻ thôi. Để làm được việc đó, ta thực hiện thao tác Push. Khi thực thi Push, lịch sử thay đổi của bản thân được upload lên remote repository, lịch sử thay đổi trong remote repository trở nên đồng nhất với lịch sử thay đổi của local repository.

**Pull**

Khi đồng thời nhiều người cùng nhau chia sẻ và thao tác với remote repository, mọi người đều cùng nhau tiến hành push lên remote repository, do đó, ở local repository cá nhân, ta cũng cần phải lấy và update các nội dung thay đổi mà những người khác đã push lên. Đó chính là việc thực hiện thao tác Pull.

Khi thực hiện Pull, ta download lịch sử thay đổi mới nhất từ remote repository, kéo những nội dung ấy về local repository của bản thân.

**Clone**

Để tạo bản sao của remote repository và thực hiện thao tác ở máy tính của mình, ta thực hiện thao tác clone. Khi clone, toàn bộ nội dung của remote repository được download, lưu dưới dạng local repository ở máy tính cá nhân. 

Ví dụ, khi bạn tham gia vào dự án đã tiến hành, bạn sẽ phải thực hiện thao tác clone.

Repository được clone cũng sẽ sao chép lại toàn bộ lịch sử thay đổi nên ta hoàn toàn có thể commit hay tham chiếu lại lịch sử thay đổi giống như repository nguyên bản.

Tuy có nhiều từ ngữ được đưa ra, nhưng nếu bạn nắm được từng từ một thì cũng không quá phức tạp đúng không nào?

# 5.Ôn tập lại Flow
1.Tạo mới, hoặc clone từ remote repository để tạo thành local repository tại máy tính cá nhân.

2.Tiến hành chỉnh sửa, tạo thành commit trên local repository thông qua index

3.Push lịch sử thay đổi từ local repository lên remote repository. Upload những phần bản thân đã chỉnh sửa.

4.Để cập nhật những thay đổi người khác tạo, pull từ remote repository, download những thay đổi đó, tiếp tục chỉnh sửa trên local repository, quay trở lại bước 1.

Đây là flow của Git.

Tôi cũng đã nhắc đến trong bài viết này, chỉ cần bạn nắm được những điều tôi đã viết ở đây, bạn có thể dễ dàng hiểu được nhiều bài viết khác, cộng với việc tiếp tục cố gắng, bạn có thể đi xa hơn nữa.

Mục tiêu chủ yếu của bài viết lần này là lý giải flow, tuy nhiên, thực tế là còn rất nhiều kiến thức cần thiết khác nữa. Ở bài viết kỳ sau, tôi sẽ viết dưới góc nhìn của việc sử dụng thực tế.