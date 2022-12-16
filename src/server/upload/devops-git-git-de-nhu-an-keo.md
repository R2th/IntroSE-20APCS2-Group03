# Xin chào các mọi người. Trong bài viết này mình sẽ làm về GIT. Với mục tiêu là người mới cũng sẽ thành master sau bài viết này
Hiện nay lĩnh việc CNTT ngày càng phát triển mạnh mẽ. Các ứng dụng mới được phát triển và ra đời hàng giờ hàng phút. Hầu như các công ty lớn nhỏ đều có bộ phận developer để thực hiện code các ứng dụng phục vụ cho chính doanh nghiệp hoặc phục vụ mục đích thương mại. Một ứng dụng thường được phát triển bởi một team có nhiều người, cũng như một ứng dụng sẽ có hàng ngàn version trong quá trình phát triển. Điều đó đem đến một thách thức lớn trong vấn đề quản lý hiệu quả toàn bộ quá trình code ứng dụng, test ứng dụng và release ứng dụng. Từ đó ra đời hệ thống quản lý phiên bản phân tán -Distributed Version Control System đã giải quyết hoàn toàn được vấn đề này. Đặc biệt là git – một phần mềm miễn phí được hầu hết các developer sử dụng.

Tài liệu hướng dẫn sử dụng git nhằm đem đến một cái nhìn cơ bản về git cũng như có các lệnh ví dụ thực tế để người đọc dễ hình dung trong quá trình sử dụng.

Git là phần mềm quản lý mã nguồn phân tán được phát triển bởi Linus Torvalds vào năm 2005, ban đầu dành cho việc phát triển nhân Linux. Hiện nay, Git trở thành một trong các phần mềm quản lý mã nguồn phổ biến nhất. Git là phần mềm mã nguồn mở được phân phối theo giấy phép công cộng GPL2.

Git là một hệ thống quản lý phiên bản phân tán (Distributed Version Control System). Nhờ Git, việc quản lý code và làm việc nhóm của developer trở nên đơn giản, thuận tiện hơn.
## I. Các lệnh làm việc với Repo local trên một branch mặc định
![1-git.drawio (1).png](https://images.viblo.asia/c52906ff-01af-4d3e-b986-46b1382abe0d.png)
### 1.1. Lệnh git init
Lệnh git init thực hiện việc khởi tạo một kho chứa thông tin Git mới (Git Repo) ở local. Tại một thư mục của một project bất kỳ thực thi lệnh git init sẽ tạo ra một thư mục ẩn .git và thư mục này chưa các thông tin của repo local như branches, config, HEAD, objects, refs, …\
`git init`\
![image.png](https://images.viblo.asia/c090d75d-18bc-489a-8f71-4814232a3e15.png)
 
Toàn bộ các lệnh git khác để có thể thực hiện được đầu tiên đều phải khởi tạo kho chứa chứa thông tin git.\
`git init –bare`\
Lệnh thêm cờ --bare tạo ra một repo mà bạn chỉ có thể truy cập, lưu trữ nhưng không thể soạn thảo, sửa file cũng như commit trực tiếp trong repo này. Thường nó tạo với mục đích để lưu trữ như là một Remote repo (Server repo), từ đó clone về repo khác và từ repo khác push dữ liệu lên repo đó.
### 1.2. Lệnh git add
Lệnh git add thực hiện lưu thông tin thay đổi vào Stagging area. Có thể hiểu git add như việc bạn nhấn Ctrl + S để lưu lại một trạng thái lúc bạn gõ word, và bạn có thể undo lại trạng thái trước đó với lệnh git reset hoặc tiến đến trạng thái hoàn thành bằng lệnh git commit.\
`git add ebook.txt`\
Lệnh git add sẽ thêm file ebook.txt vào Stagging area. Nếu file ebook.txt được git add lần đầu thì sẽ được tạo snapshot toàn bộ file ebook.txt những lần tiếp theo snapshot được tạo là nội dung thay đổi so với commit trước.
 
Lệnh add toàn bộ file và các folder có trong thư mục hiện tại thực hiện lệnh.\
`git add --all`\
`git add .`

### 1.3. Lệnh git status
Lệnh git status hiện thị thông tin khác nhau (do thêm mới, xóa đi, sửa đổi các file) của  file. Và một file có thể có 4 trạng thái: untracked, unmodified, modified, staged.
1.	Untracked
Khi tạo mới file và chưa thực hiện git add lần đầu. File sẽ ở trạng thái này nếu bạn kiểm tra
2.	Unmodified
Ngay sau khi workspace đã thực hiện commit cuối cùng sẽ ở trạng thái này và bạn thực hiện git status
3.	Modified
Với modified là trạng thái bạn có thay đổi mà chưa thực hiện git add.
4.	Staged
Với modified hiển thị khi bạn có thay đổi mới và đã thực hiện git add.

`git status -s`\
Lệnh thêm cờ -s để hiện thị ngắn gọn các trạng thái của file. Hữu ích khi bạn làm việc với rất nhiều file cùng lúc.
Lúc này trước các file có sự thay đổi có thể có các ký tự tương ứng với các thông tin gồm:
* ' ' = unmodified (không đổi)\
* M = modified (có sửa đổi)\
* A = added (file mới thêm)\
* D = deleted (file bị xóa)\
* R = renamed (đổi tên file)\
* C = copied (file copy từ file khác)\
* U = updated but unmerged (đã cập nhật, nhưng chưa merge)\
### 1.4.	Lệnh git commit
Lệnh git commit thực hiện lưu vào CSDL Git toàn bộ nội dung chứa trong Stagging area (.index) và kèm theo nó là một đoạn text thông tin (log) mô tả sự thay đổi của của commit này so với commit trước. Sau khi commit con trỏ HEAD tự động dịch chuyển đến commit này.\
`git commit -m "commit lan 1"`\
Lệnh có cờ -m để thêm comment cho các lần commit.

`git commit -a -m "commit lan 2"`\
Lệnh sử dụng cờ -a thì nó tương đương thực hiện lệnh git add để đưa các file đang được giám sát có sự thay đổi vào staging rồi tự động chạy git commit
### 1.5. Lệnh git reset
Khi muốn quay lại các trạng thái trước đó bạn có thể sử dụng lệnh git reset.

Có thể undo từ Stagging area về Workspace bằng lệnh git reset.\
`git reset`

Có thể undo từ Repo local về Stagging bằng lệnh git reset --soft HEAD~1. Thường dùng để quay lại vùng Stagging để commit lại. Sẽ xóa 1 commit mới nhất. Có thay tham số ~1 thành số khác nếu muốn xóa số lượng lớn commit.\
`git reset --soft HEAD~1`

Có thể undo từ Repo local về Workspace bằng lệnh git reset --hard HEAD~1. Lệnh này sẽ xóa luôn trạng thái ở vùng Stagging area. Đồng nghĩa với việc bạn sẽ xóa bỏ hoàn toàn 1 commit.\
`git reset --hard HEAD~1`
### 1.6.	Lệnh git log
Lệnh git log giúp xem lại thông tin lịch sự commit, nhằm giám sát sự thay đổi của dự án. Lệnh git log có nhiều tham số để xuất ra, định dạng các thông tin hiện thị theo cách mong muốn. Bạn có thể định dạng cách các thông tin mỗi commit được in ra khi xem, cũng như có thể lọc thông tin nào đó.

Git log nó liệt kê các commit theo thứ tự từ mới nhất đến cũ nhất, mỗi commit có các thông tin gồm: mã hash của commit, dòng thông báo, người tạo commit và ngày tạo commit.\
`git log`\
`git log –oneline`\
`git log -2`\
`git log -p -2`
### 1.7.	Lệnh git diff
Lệnh git diff có thể kiểm tra thay đổi của file giữa các vùng, các lần commit hay các branch khác nhau.

Kiểm tra sự khác nhau của file giữa workspace và Stagging area\
`git diff`

Kiểm tra sự khác nhau của file giữa Stagging area và kho lưu thông tin.\
`git diff –staged`

Kiểm tra sự khác nhau của file giữa hai lần commit ( giả sử có 2 id hash như bên dưới )\
`git diff 1d2f924 367d9c0`

Kiểm tra sự khác nhau của file giữa hai branch\
`git diff master dev`

## II.	Các lệnh làm việc với Repo local với nhiều branch
### 2.1.	Lệnh git branch
Trong thực tế với một dự án sẽ sử dụng nhiều nhánh để phát triển một phần mềm như nhánh dev, sit, ida, prod.

Kiểm tra nhánh hiện tại.\
`git branch `

Tạo thêm nhánh dev mới\
`git branch dev`

Đổi tên nhánh hiện tại thành rename\
`git branch -M rename`

Xem danh sách tất cả các branch local và remote
`git branch -a`
### 2.2.	Lệnh git checkout
Lệnh git checkout thường được dùng để chuyển nhánh, nó cũng có thể để phục hồi file trong thư mục làm việc từ một commit trước đây.\
`git checkout dev`

Lệnh git reset sẽ thực hiện undo về một commit nào đó thì git checkout giúp user có thể undo file về về trạng thái commit trước đó. Đồng thời git sẽ tạo ra một nhánh tạm thời cho các lệnh checkout này. Có thể tạo nhánh làm việc mới từ nhánh tạm thời bằng lệnh git switch -c.\
Undo nội dung file về lúc commit xác định và vẫn lưu log để có thể undo ngược lại\
`git checkout HASH ebook.txt`

Undo nội dung file về lúc commit xác định và xóa luôn log commit, đồng nghĩa bạn sẽ không thể quay lại trạng thái file ở commit đã bị xóa\
`git checkout HASH`
### 2.3.	Lệnh git switch
Lệnh git switch thực hiện chuyển branch tương tự như checkout và có thể tạo nhánh mới.

Chuyển sang branch\
`git switch dev`

Tạo nhánh mới, kích hoạt nhánh bắt đầu từ một commit có mã HASH\
`git switch -c sit HASH`

Tạo nhanh từ commit cuối\
`git switch -c sit`
### 2.4.	Lệnh git restore
Lệnh git restore để phục hồi các file của thư mục làm việc.\
`git restore ebook.txt`

Cách sử dụng giống như git checkout cho trường hợp phục hồi.
### 2.5.	Lệnh git merge
Lệnh git merge thực hiện gộp hai nhánh lại với nhau, lệnh sẽ thực hiện gộp thông tin của cả file và thông tin bộ lưu trữ .git lại.

Thực hiện gộp branch local dev vào branch master\
`git checkout master`\
`git merge dev`

Về cơ bản các lệnh merge sẽ dễ dẫn đến các trường hợp conflict. Vì vậy trước khi merge bạn cần nắm rõ và thực hiện các lệnh kiểm tra trước như git status, git log, git fetch,...
### 2.6.	Xử lý conflict trong branch
**2.6.1.	Confict khi merge hai branch khác gốc**\
Khi bạn muốn hợp nhất hai nhánh và phần giống nhau của cùng một tệp bị thay đổi, xung đột hợp nhất xảy ra. Nguyên nhân là do Git không tìm ra phiên bản nào sẽ sử dụng. Khi điều này xảy ra, nó sẽ dừng trước khi cam kết hợp nhất để giải quyết xung đột đó.

Việc chạy lệnh git status sẽ hiển thị các tệp cần được giải quyết. Trong trường hợp có xung đột, Git sẽ chỉnh sửa nội dung của các tệp bị ảnh hưởng bằng các chỉ báo trực quan đánh dấu cả hai mặt của nội dung xung đột. Các điểm đánh dấu trực quan này là:\
<<<<<<< Đánh dấu xung đột , xung đột bắt đầu sau dòng này.\
======= Phân chia những thay đổi của bạn với những thay đổi trong nhánh khác.\
         >>>>>>> Kết thúc các dòng mâu thuẫn.\

Lỗi này sẽ ra sẽ khiến không thể checkout, switch sang branch khác và báo\
![image.png](https://images.viblo.asia/f830f7ea-756c-4939-98c5-c95171bb424e.png)

Cách khắc phục sẽ là thực hiện git add file đang báo lỗi và git commit lại. Sau đó bạn có thể làm việc lại như bình thường, có thể checkout, switch branch.

**2.6.2.	Confict khi push lên repo remote khi thực hiện trên cùng một branch**\
Nguyên nhân do có nhiều user thao tác trên cùng một file. Dẫn đến có sự khác nhau giữa trạng thái commit. Khi push hệ thống sẽ báo dữ liệu khác nhau.

Cách xử lý là thực hiện git pull để lấy toàn bộ dữ liệu, edit dữ liệu theo mong muốn, git add lại, thực hiện commit và git push lại.
## III.	Các lệnh làm việc với Repo remote (Github)
Để thực hiện được bạn phải có tài khoản Github và tạo trước một repo. Tôi đã tạo repo cache trên github.
### 3.1.	Lệnh git remote
Trong thực tế sẽ có hai loại repo là Repo local thường được hiểu là kho máy tính cá nhân bao gồm thư mục dự án và thư mục .git kho lưu trữ thông tin. Và loại thứ hai là Repo remote thường là các kho lưu trữ public như Github, Gitlab, …

Lệnh git remote cho phép tạo, xem và xóa một kết nối tới các repo khác ( thường là Repo public – Github ).

Tạo một liên kết\
`git remote add origin https://github.com/daihoangg/cache.git`\
Lệnh tạo ra một kết nối tới github với một shortname là origin. Vì link liên kết thường khá dài nên việc gõ và ghi nhớ là rất khó, việc tạo ra shortname thay thế là cần thiết để sử dụng lại nhiều lần trong các lệnh push hay fetch.

Hiển thị thông các remote đã tạo bao gồm shortname và link tương ứng các remote\
`git remote -v`

Lệnh hiển thị thông tin của link origin\
`git remote show origin`

Xóa một liên kết với shortname origin được tạo phía trên\
`git remote rm origin`
### 3.2.	Lệnh git clone
Lệnh git clone cho phép sao chép một Repo remote về Repo local. 

Lệnh clone qua ssh\
`git clone git@github.com:daihoangg/cache.git`

Lệnh clone qua https\
`git clone https://github.com/daihoangg/cache.git`
### 3.3.	Lệnh git fetch
![image.png](https://images.viblo.asia/ed970e15-d729-4cd3-89cd-f74b85f765c8.png)
Lệnh git fetch git pull cập nhật dữ liệu từ Repo remote. Git fetch sẽ chỉ tải repository trên Repo remote mà không tải file hay thư mục làm việc về local. Lệnh này nhằm mục đích kiểm tra theo dõi các commit cập nhật trên server từ các nhánh mà không làm thay đổi luồng làm việc trên máy local.

Kho chứa của bạn tên origin, tải về tất cả thông tin của nó từ remote:\
`git fetch origin master`\
`git fetch --all`
### 3.4.	Lệnh git pull
Lệnh git pull lấy toàn bộ thông tin trên Repo remote bao gồm dữ liệu file, folder và kho lưu trữ thông tin .git.\
`git pull`\
`git pull origin`\
`git pull origin/dev`\
`git merge origin/master`

Bạn có thể viết lại lịch sử commit của nhánh đang làm việc, cập nhật toàn bộ nhánh remote là base của nó thì thực hiện.\
`git pull --rebase origin`
### 3.5.	Lệnh git push
Lệnh git push thực hiện đẩy các commit mới ở Repo local lên Repo remote. Khi push lên có thể chỉ định push lên các nhánh cụ thể với các cờ:
* --all đẩy tất cả các nhánh ở local lên repo remote
* --tags đẩy tất cả các tag ở local lên repo remote
* --delete xóa một nhánh ở trên repo remote
* -u đẩy và tạo một upstream (luồng upload tương ứng với nhánh của local), hay sử dụng cho lần đầu đẩy lên repo remote.

`git push -u origin dev`\
`git push origin dev`\
`git push origin –all`\
`git push origin --delete beta`

Để thực hiện được lệnh git push bạn sẽ được yêu cầu nhập user và pass. Từ ngày 13 tháng 8 năm 2021, Github đã đổi xác thực mật khẩu thành token.\
VÌ vậy bạn cần tạo một token và cấp quyền hợp lý\
![image.png](https://images.viblo.asia/458ad5a4-08f3-4c49-913a-814013a3bc74.png)\
Sau đó bạn sẽ có một mã token dạng ghp_*** dùng để nhập khi có yêu cầu nhập pass từ lệnh git push.
### 3.6.	Lệnh git tag
Git tag là một cái tên dùng để đánh dấu một điểm nào đó trong lịch sử quá trình commit khi cho rằng điểm đó là quan trọng hoặc cần chú ý.

Hiển thị các tag\
`git tag`\
`git tag -l`\
Lệnh thực hiện sử dụng cờ -l hoặc --list để hiển thị thông tin.

Tạo ra một Tag mới đánh dấu vào commit cuối\
`git tag -a tag1 -m "tao tag lan 1"`

Có thể tạo tag cho các commit bất kỳ bằng cách lấy mã hash của commit đó\
`git tag -a tag2 -m "tao tag lan 2 cho commit 9f" 9fceb02`

Xem thông tin về commit được gắn tag1\
`git show tag1`

Cập nhật tag lên repo remote\
`git push origin tag1`

Cập nhật tất cả các tag\
`git push origin --tags`

Xóa một tag thì cần thực hiện xóa cả ở Local và ở Remote (nếu đã push tag)\
`git tag -d tag1`\
`git push --delete origin tag1`

***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Nếu thấy bài viết có ích thì cho mình 1 upvote. Mình xin cám ơn.***