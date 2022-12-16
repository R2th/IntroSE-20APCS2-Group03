*Bài viết gốc: [An introduction to Git: what it is, and how to use it](https://www.freecodecamp.org/news/what-is-git-and-how-to-use-it-c341b049ae61/)*

Trong bài viết này, chúng ta sẽ cùng tìm hiểu những kiến thức cơ bản nhất về Git: Git là gì? Git được sử dụng như thế nào?

## Git là gì?

Git là hệ thống kiểm soát phiên bản phân tán mã nguồn mở (Open Source Distributed Version Control System). Có rất nhiều cách để định nghĩa Git, ở đây tôi sẽ tách nhỏ ra và giải thích chi tiết ngữ nghĩa.

- Hệ thống kiểm soát (Control System): Về cơ bản, điều này có nghĩa Git là một trình theo dõi nội dung, do đó, Git có thể được sử dụng để lưu trữ nội dung và chủ yếu được sử dụng để lưu trữ source code dựa theo những tính năng mà nó cung cấp.

- Hệ thống kiếm soát phiên bản (Version Control System): Source code lưu trữ trong Git sẽ thay đổi khi có càng nhiều source code mới được thêm vào. Hơn nữa, nhiều developer có thể add thêm source code song song đó. Vì vậy Hệ thống kiểm soát phiên bản giúp xử lý vấn đề này bằng cách duy trì lịch sử những thay đổi đã xảy ra. Thêm vào đó, Git còn cung cấp các tính năng như nhánh (branch) và gộp nhánh (merge) sẽ đề cập ở phần dưới này.

- Hệ thống kiểm soát phiên bản phân tán (Distributed Version Control System): Git có một kho lưu trữ từ xa được lưu trữ trong một máy chủ và một kho lưu trữ cục bộ được lưu trữ trong máy tính của mỗi developer. Điều này có nghĩa là source code không chỉ được lưu trữ trong máy chủ trung tâm mà bản sao đầy đủ của source code đó cũng được lưu trữ trong tất cả các máy tính của developer. Khái niệm kho lưu trữ từ xa và kho lưu trữ cục bộ tôi sẽ giải thích sau trong bài viết này.

Vậy, tại sao cần có Hệ thống kiểm soát phiên bản như Git?

Thực tế dự án thường có nhiều developer làm việc song song. Vì vậy, một hệ thống kiểm soát phiên bản như Git là cần thiết để đảm bảo không có xung đột source code giữa các các developer với nhau.

Ngoài ra, requirement trong dự án thay đổi thường xuyên. Do đó, hệ thống kiểm soát phiên bản cho phép developer có thể quay lại (revert) phiên bản source code cũ hơn.

Cuối cùng, đôi khi cũng có trường hợp nhiều dự án chạy song song cùng liên quan đến một codebase. Trong trường hợp như vậy, khái niệm phân nhánh trong Git là cực kỳ quan trọng.


Tiếp theo, chúng ta cùng nhau tìm hiểu về cách sử dụng Git.

Thay vì đề cập tất cả các khái niệm cùng một lúc, tôi sẽ lần lượt giải thích các khái niệm của Git thông qua ví dụ cụ thể.

## Cách sử dụng Git

### Download Git

Link dưới đây mô tả chi tiết cách cài đặt Git trong các hệ điều hành khác nhau.

https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Verify xem Git đã được cài đặt hay chưa bằng cách sử dụng lệnh sau trong command prompt.
```
git --version
```

### Tạo kho lưu trữ Git cục bộ

Trong máy tính, hãy tạo một thư mục cho dự án của bạn, lấy ví dụ thư mục dự án là `simple-git-demo`.

Sau đó, vào thư mục dự án và add thêm kho lưu trữ Git cục bộ bằng cách sử dụng command sau đây:
```
cd simple-git-demo
git init
```
Lệnh `git init` sẽ thêm kho lưu trữ Git cục bộ vào dự án.

### Thêm source code

Tiếp theo, hãy thêm một đoạn source code nhỏ nhé. Ví dụ ở đây, tôi tạo 1 file tên là `demo.txt` trong thư mục dự án và thêm text sau đây vào file.
```
Initial Content
```
Ở đây tôi đang demo chỉ với văn bản thuần túy thay vì source code thực, vì như đã nói, trọng tâm chính của bài viết này là Git chứ không phải bất kỳ ngôn ngữ lập trình cụ thể nào.

### Staging and Committing

Commit là quá trình trong đó source code được thêm vào kho lưu trữ cục bộ. Trước khi commit, source code phải nằm trong khu vực được chuẩn bị cho quá trình commit. 

Khu vực này theo dõi tất cả các files sẽ được commit, file không được thêm vào khu vực này sẽ không được commit - Điều này cho phép các developer kiểm soát được những tệp file cần commit.

**Staging**

Sử dụng câu lệnh sau để sắp xếp file vào khu vực chuẩn bị cho quá trình commit.
```
git add demo.txt
```
Trường hợp muốn thêm nhiều file, có thể sử dụng câu lệnh sau đây.
```
git add file1 file2 file3
```
Ngoài ra, nếu muốn thêm toàn bộ file trong thư mục dự án vào khu vực Staging này, hãy sử dụng command sau.
```
git add .
```
Cần lưu ý khi sử dụng command này, bởi vì nó sẽ thêm toàn bộ các file, folder trong dự án của bạn vào khu vực Staging.

**Committing**

Sử dụng câu lệnh sau để commit file.
```
git commit -m "Initial Commit"
```
“Initial Commit” ở đây là message, bạn có thể nhập một message tương ứng để biết được thay đổi source code nào đã được thực hiện trong một commit nào đó.

### Git Status and Git Log

Bây giờ, hãy sửa đổi tệp demo.txt và thêm đoạn mã sau:
```
Initial Content Adding more Content
```
**Status**

Sử dụng git status để biết được tệp nào đã được sửa đổi, tệp nào nằm trong khu vực được chuẩn bị cho quá trình commit - ngoài ra còn nhiều thông tin khác nữa mà tôi sẽ bỏ qua trong bài viết này.

Sử dụng câu lệnh sau để xem trạng thái:
```
git status
```
Trạng thái cho thấy demo.txt đã được sửa đổi và chưa nằm trong khu vực được chuẩn bị cho quá trình commit.

Bây giờ, chúng ta hãy thêm demo.txt vào khu vực Staging và thực hiện commit bằng cách sử dụng câu lệnh sau:
```
git add demo.txt git commit -m "demo.txt file is modified"
```
**Log**

Sử dụng git log để show ra tất cả các commit đã được thực hiện cho đến hiện tại bằng command sau.
```
git log
```
Trong đó, tác giả của mỗi commit, datetime của commit, message của commit cũng sẽ được hiển thị.
### Branches
Đến hiện tại, chúng ta chưa tạo một nhánh nào trong Git, và vì vậy mặc định commit đi vào nhánh master (nhánh chính).

**Nhánh là gì?**

Nhánh chính xác một con trỏ đến commit mới nhất trong kho lưu trữ Git. Vì vậy, hiện tại nhánh master của chúng ta trỏ đến commit thứ hai `demo.txt file is modified`.

**Tại sao cần nhiều nhánh?**

Câu trả lời là: Cần nhiều nhánh để hỗ trợ nhiều phát triển song song. Chi tiết hoạt động của các nhánh tham khảo hình sau đây.
![](https://images.viblo.asia/bc4532b7-6083-40b3-9447-230138187846.jpg)
Đầu tiên, commit 1 và commit 2 được thực hiện trong nhánh Master. Sau commit 2, một nhánh mới được gọi là “Test” được tạo ra, commit 3 và commit 4 được thêm vào nhánh Test này.

Đồng thời, commit 3 và commit 4 khác được thêm vào nhánh Master. Ở đây chúng ta có thể thấy rằng sau commit 2, hai phát triển song song đang được đồng thời thực hiện ở 2 nhánh riêng biệt.

Nhánh Test và nhánh Master tách ra ở đây, chứa source code khác nhau - source code từ nhánh Test có thể được gộp vào nhánh Master bằng cách sử dụng git merge mà tôi sẽ đề cập tới sau đây.

**Tạo nhánh mới trên local**

Tạo một nhánh mới tên là "Test" bằng cách sử dụng command sau:
```
git branch test
```
Nhánh test được tạo ra. Chúng ta vẫn đang ở nhánh master; để chuyển sang nhánh test, hãy sử dụng command sau:
```
git checkout test
```
Và giờ chúng ta đã ở nhánh test.

Bạn có thể liệt kê tất cả các nhánh trong local bằng lệnh sau:
```
git branch
```
**Thực hiện một số commit trên nhánh mới**

Sửa đổi `demo.txt` bằng cách thêm đoạn mã sau:
```
Initial Content Adding more Content Adding some Content from test Branch
```
Bây giờ, chúng ta sẽ thực hiện staging và commit bằng cách sử dụng lệnh sau:
```
git add demo.txt git commit -m "Test Branch Commit"
```
Commit này được thực hiện trong nhánh test, và nhánh test hiện đang hơn nhánh master 1 commit - vì nhánh test cũng bao gồm 2 commit từ nhánh chính.

Bạn có thể xác minh lịch sử commit trong nhánh test như sau: 
```
git log
```
### Gộp nhánh (Merging)

Hiện tại, nhánh test đang hơn nhánh master 1 commit. Bây giờ chúng ta muốn đưa toàn bộ source code trong nhánh test trở lại nhánh master. 

Trong trường hợp này, Git merge sẽ cực kỳ hữu ích.

Để hợp nhất mã từ nhánh kiểm tra vào nhánh chính, hãy làm theo các bước sau:

Đầu tiên, chúng ta sẽ  quay lại nhánh chính.
```
git checkout master
```
Sau đó, chạy command `merge` sau đây:
```
git merge test
```
Sau khi chạy 2 lệnh này, việc gộp nhánh - trên lý thuyết - sẽ thành công. Như trong ví dụ này, không có conflict nào xảy ra cả.

Tuy nhiên, trong các dự án thực tế, sẽ có trường hợp xảy ra conflict khi đang gộp nhánh. Việc xử lý các conflict này đòi hỏi nhiều kinh nghiệm, vì vậy khi bạn làm việc nhiều hơn với Git, bạn sẽ biết chính xác phải làm gì để xử lý các conflict đó.

Chạy `git log` ngay bây giờ, bạn sẽ thấy master cũng đã có 3 commit.

## Kho lưu trữ Git từ xa

Hiện tại, chúng ta mới chỉ làm việc trong kho lưu trữ cục bộ. Mỗi developer sẽ làm việc với kho lưu trữ cá nhân của họ nhưng cuối cùng, họ phải đẩy source code vào kho lưu trữ từ xa. 

Khi source code nằm trong kho lưu trữ từ xa, các developer khác có thể xem và sửa đổi source code đó.
![](https://images.viblo.asia/cf69eca8-718e-45ea-8838-ccafc86f2ee4.jpg)
### GitHub

Chúng ta sẽ sử dụng GitHub cho kho lưu trữ từ xa.

Truy cập https://github.com/ và tạo tài khoản.

Sau khi đăng ký trên trang chủ GitHub, hãy nhấp vào "Start a Project" để tạo một kho lưu trữ Git mới. Đặt tên cho kho lưu trữ (lấy ví dụ là `git-blog-demo`) và nhấp vào “Create Repository”.

Thao tác này sẽ tạo ra một kho lưu trữ từ xa trong GitHub và khi bạn mở kho lưu trữ, một trang như dưới đây sẽ hiển thị.
![](https://images.viblo.asia/0fb2186c-afc4-4612-be4c-aaecd32c55b2.png)

URL kho lưu trữ là phần được đánh dấu trong ảnh trên này: `https://github.com/aditya-sridhar/git-blog-demo.git`

Để trỏ kho lưu trữ cục bộ của bạn đến kho lưu trữ từ xa, hãy sử dụng lệnh sau:
```
git remote add origin [repository url]
```
### Git Push

Để đẩy tất cả source code từ kho lưu trữ cục bộ vào kho lưu trữ từ xa, chúng ta sẽ sử dụng câu lệnh sau đây:
```
git push -u origin master
```
Khi đó, source code từ nhánh master trong kho lưu trữ cục bộ sẽ được đẩy đến nhánh master trong kho lưu trữ từ xa.

### Các command bổ sung

**Git Pull**

```git pull``` được sử dụng để kéo những thay đổi mới nhất từ kho lưu trữ từ xa vào kho lưu trữ cục bộ. 

Source code trong kho lưu trữ từ xa được cập nhật liên tục bởi nhiều developer khác nhau, do đó, Git Pull là rất cần thiết.
```
git pull origin master
```
**Git Clone**

```git clone``` được sử dụng để sao chép một kho lưu trữ từ xa vào máy tính của bạn. Command cho việc này là:
```
git clone [repository url]
```
~The end~