## **Lời ngỏ**
Bài viết này được viết dựa theo nội dung đã giải thích trong 1 giờ đồng hồ với chủ đề Git cho các bạn nhan viên mới vào làm tại công ty chưa có kinh nghiệm về nghiệp vụ, cũng như lập trình. 
Nội dung bài viết với mục đích là "dự án 1 thành viên" có thể biết và sử dụng Git  một cách cơ bản "trong 1 giờ đồng hồ". Tuy chưa thể đạt đến mức chuẩn cho team phát triển trong thực tế nhưng qua bài viết này tôi hi vọng bài viết này sẽ là điểm khởi đầu cho việc học đối với những người cần sử dụng Git trong tương lai.
Ngoài ra,để thuận tiện cho việc dạy nhân viên mới nên có những chỗ trình bày có thể qua loa và không chính xác cho lắm nhưng cũng mong các bạn thông cảm và bỏ qua nếu đó không phải nhưng lỗi sai gây ra sự hiểu lầm.

#### **Hình dung tổng quan**
Trước hết, sau khi đã hiểu quan được Git là gì, các bạn sẽ thực hiện thao tác trên VSCode.
Tôi sẽ giải thích với hệ điều hành Window nhưng bạn nào dùng Mac thì cũng có thể làm tương tự.

####  **Đối tượng người đọc**
Bài viết được dành cho các đối tượng có những đặc điểm sau:
- Có thể cài đặt được application
- Đã từng gõ câu lệnh (command) bằng Command Prompt (dấu nhắc lệnh)
- Chưa từng tiếp xúc với VSCode
- Chưa từng tiếp xúc với Git
- Không hiểu sự khác nhau giữa Git và GitHub

#### **Các chuẩn bị cần thiết trước khi bắt đầu buổi học**
Trước khi bắt đầu, những nhân viên mới đã cài đặt sẵn những công cụ để phục vụ cho buổi chia sẻ. Vì vậy các bạn cũng hãy làm trước 3 việc dưới đây trước khi bước vào công việc tiếp theo nhé. Bởi phần này sẽ không nằm trong 1 giờ học đâu nhé.
- Cài đặt Visual Studio Code
- Cài đặt tiếng Nhật cho Visual Studio Code (Cái này đơn giản mà)
- Cài đặt Git
Visual Studio Code (dưới đấy viết tắt là VSCode) là công cụ Editor miễn phí do Microsoft cung cấp. Các bạn hãy cứ coi đây là một cuốn sổ tay với những tính năng cao cấp. Với Editor, chúng ta có thể thực hiện được các thao tác với Git.

## **Vậy Git là gì?**
Ai đã từng nghe đến cụm từ GitHub thì hãy tạm quên đi nhớ. Git là Git, không phải Github đâu nhé.

#### **Bạn có thể làm gì với Git?**
Git thường được gọi là phần mềm dùng để quản lý vesion chẳng hạn như file text....Quản lý version là chức năng giúp cho chúng ta có thể lưu giữ nội dung thay đổi, lịch sử thay đổi của file, và có thể cho quay lại trạng thái ở những version trước đó. Tức là nó giúp chúng ta có thể khôi phục được một file nào đó về trạng thái cũ trước đó.
![](https://images.viblo.asia/751bd407-79d7-49df-a4e5-2063c025a027.png)
Ảnh này là một ví dụ hiển thị những điểm khác nhau về sự thay đổi trên VSCode. Nếu sử dụng Git, bạn có thể ghi lại nội dung thay đổi như thế này. File bên trái là file cũ, file bên phải là file mới. Nhìn vào đây, bạn có thể hiểu được là những dòng nào đã bị xoá (dòng màu đỏ), dòng nào được thêm vào ( dòng màu xanh).
Nhân tiện đây thì hình ảnh trên là đang dùng chức năng mở rộng của VSCode gọi là GitLens để hiển thị.

#### **Thao tác với Git như thế nào?**
Như đã giới thiệu trong bài viết này, chúng ta có thể thao tác với Git ở mức độ nào đó trên VSCode. Tuy nhiên, vẫn còn có những cách khác mà hoàn toàn không dùng đến VSCode, chẳng hạn như thao tác trực tiếp bằng Git command, sử dụng Git Client soft khác (Sourcetree chẳng hạn).

#### **Ứng dụng Git**
Git là ứng dụng hoạt động bằng console.
Khi xem folder mà bạn đã install Git thì sẽ thấy ở đó có file có tên là git.
Ví dụ như trường hợp của tôi thì ở folder C:\Program Files\Git\bin đang tồn tại các file như hình bên dưới.

![](https://images.viblo.asia/0be72570-92b6-48c7-817c-a211d198e6b7.png)

Chúng ta hãy cùng thử mở thư mục này trên console và gõ thử câu lệnh xem sao.
Nhập cmd  trên thanh bar phía trên rồi Enter, bạn có thể mở thư mục này bằng command prompt.
![](https://images.viblo.asia/ef3038a2-dd5a-41b4-9ecb-1a76758ca77e.png)
Sau khi khởi động Command Prompt , hãy gõ câu lệnh bên dưới.
git --version
Như vậy chắc chắn sẽ hiển thị số version của Git mà bạn đã install.
File git.exe này chính là thực thể app của Git.
Nếu nhập command (câu lệnh) chẳng hạn như git init hay git commit là bạn đã có thể thao tác quản lý file giống như làm với git --versionvới
Nếu Git được install đúng thì dù có ở chỗ nào thì bạn vẫn có thể dùng được git command.

## Sự khác nhau về cách quản lý Repository trong hệ thống quản lý version
Bản thân hệ thống quản lý version cũng có rất nhiều, ngoài Git còn có Subversion cũng nổi tiếng. Tuy nhiên Subversion và Git khác nhau khá nhiều trong cách quản lý.

#### **Reporsitory và Quản lý trong Subversion**
Có thể hơi bị dài dòng nhưng tôi nghĩ nên giải thích qua về Subversion trước thì sẽ dễ hiểu hơn nên tôi sẽ giải thích từ Subversion.

Subversion là Subversion, đây là **hệ thống quan lý version khác hoàn toàn với Git**.
Subversion giống với Git ở chỗ cả hai đều là để quản lý version của file text. Với tính chất đó thì cũng có trường hợp được dùng để quản lý file binary. Subversion được sử dụng nhiều để quản lý các file khác ngoài file text ví dụ như Excel, Word, file run, ảnh...Các bạn hãy nhớ file mở và đọc được bằng notepad thì là file text, file không đọc được là binary file.
Ngược lại, với GIt thì không quản lý binary file(đúng hơn là file mà 1 file dung lượng lớn) lắm. Lý do tôi sẽ trình bày sau đây.
![](https://images.viblo.asia/d234eafc-f16b-437b-941d-c2a3c38e1f18.jpg)
Nhìn vào hình trên các bạn có thể thấy, Git khác với Subversion, không chỉ có server mà còn có Repository trên Local (**Local Repository**).Thêm nữa, mọi sự thay đổi với file không phải là commit lên Repository trên server mà là commit lên Repository ở local và chuyển tiếp thông tin, get thông tin thì sẽ thực hiện giữa Local repository và repository trên server. Đây là việc quan trọng nên tôi xin nhắc lại là không thực hiện commit trực tiếp lên server repository.Nội dung commit từ Local repository lên Repository trên server (gọi là **remote repository**) tôi sẽ trình bày sau.

#### **Phân biệt cách dùng của Git và Subversion**
Có thể sẽ có người có câu hỏi trong đầu là “Subversion? Tất cả dùng Git có phải tốt không? Tại sao lại phải dùng hệ thống quản lý version khác?….”
Git (nếu không dùng chức năng mở rộng chẳng hạn như Git LFS) được cho là không dành cho quản lý binary file lớn.
Tại sao lại như vậy? Chúng ta cùng nhau tìm hiểu nhé.

Git có cả Repository ở Local, và trong Repository đó sẽ chứa toàn bộ từ file mới đến file cũ. Nếu như file có dung lượng lớn được chứa tất cả từ version cũ đến version mới thì dung lượng của repository đó sẽ lên đến vài GB thậm chí có thể mở rộng nhiều hơn nữa. Còn với Subversion thì do Repository chỉ có trên server nên ở local chỉ cần có file mới nhất là được.

Khi không có Repository ở local mà chỉ có có ở trên server và bạn muốn copy Repository trên server về local, nếu Repository đã mở rộng thì bạn sẽ phải download vài GB. Thật phiền phức đúng không. Với Git, việc clone sang Local cho repository diễn ra thường xuyên nên bạn sẽ thể bỏ qua việc tăng lưu lượng network.
Chính vì lý do này mà mới có lời khuyên là không nên quản lý binary file lớn bằng Git.

Để Git cũng có thể quản lý file lớn như thế thì có mở rộng là Git LFS, nếu quản lý là không dùng những ứng dụng mở rộng như này thì sau sẽ phải xoá những file nặng không cần thiết ra khỏi lịch sử của Git. Việc này vô cùng phiền phức.

#### **Hình dung về việc commit lên Local repository**
Sau khi chỉnh sửa, thay đổi xong file bạn sẽ thực hiện thao tác “commit” lên Local repository, sau đó sẽ chuỷen tiếp nội dung thay đổi có ở Local repository lên Remote repository ở server.

Tuy nhiên , dù nói là commit nhưng **không phải có thể commit ngay sau khi lưu vào file**. Để commit thì sẽ cần thêm **1 công đoạn** nữa.
Hãy xem ảnh dưới đây.
![](https://images.viblo.asia/e69aaca7-2118-4635-af4c-986c14cc8f76.jpg)

Đầu tiên sẽ lưu nội dung thay đổi vào file. Sau đó sẽ add file đó vào “Vùng dự định commit”. Cuối cùng sẽ viết comment (commit message) rồi commit nội dung đã add vào cùng dự định commit, lên local repository.
Để dễ hiểu thì tôi đang nói là “Vùng dự định commit” nhưng nói chính xác thì sẽ là “Staging area”, và việc add vào area này gọi là “Stage” hoặc “Staging”.

Trên đây là phần khái niệm, lý thuyết cơ bản về Git. Phần sau tôi sẽ giới thiệu phần thực hành để các bạn hiểu rõ hơn nhé.

(Còn tiếp)

(Nguồn dịch: https://qiita.com/jesus_isao/items/63557eba36819faa4ad9)