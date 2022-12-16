### 1: Discard local file modifications
 
 Đôi khi cách tốt nhất để giải quyết một vấn đề đó là đi sâu vào trong và tìm hiểu những dòng code. Và những thay đổi được thực hiện trong lúc đó đôi khi không tối ưu và trong trường hợp này, việc hoàn nguyên tệp về trạng thái ban đầu có thể là giải pháp nhanh nhất và dễ nhất.
 
 `git checkout -- Gemfile # reset specified path `
 
`git checkout -- lib bin # also works with multiple arguments`

Trong đó, dấu gạch ngang kép (--) là một cách phổ biến cho các tiện ích dòng lệnh để biểu thị sự kết thúc của các tùy chọn lệnh.

### 2: Undo local commits

Đôi khi chúng ta mất nhiều thời gian hơn để nhận ra rằng chúng ta đang theo dõi sai và vào thời điểm đó, một hoặc nhiều thay đổi có thể đã được commit ở local. Đây là khi git reset có ích:

```
git reset HEAD~2        # undo last two commits, keep changes
git reset --hard HEAD~2 # undo last two commits, discard changes  
```

Hãy cẩn thận với tùy chọn --hard! Nó reset lại tree làm việc của bạn cũng như index, vì vậy tất cả các sửa đổi của bạn sẽ bị mất.

### 3:  Remove a file from git without removing it from your file system

Nếu bạn không cẩn thận trong khi `git add`, bạn có thể sẽ thêm các tệp mà bạn không muốn commit . Tuy nhiên, `git rm` sẽ xóa nó ra khỏi trạng thái staging, cũng như hệ thống tệp của bạn, có thể không phải là thứ bạn muốn. Trong trường hợp đó, hãy đảm bảo bạn chỉ xóa khỏi trạng thái  staged và thêm tệp vào `.gitignore` của bạn để tránh mắc lỗi tương tự lần thứ hai.

```
git reset filename          # or git remove --cached filename
echo filename >> .gitingore # add it to .gitignore to avoid re-adding it
```

### 4: Edit a commit message

khi bạn commit, làm như thế nào để sửa message trong commit của bạn,thật rất dễ dàng để sửa chúng.

```
git commit --amend                  # start $EDITOR to edit the message
git commit --amend -m "New message" # set the new message directly
```

Nhưng đó không phải là tất cả các sửa đổi git có thể làm cho bạn. Bạn đã quên `git add` một tệp chưa? Chỉ cần add nó và amend commit trước đó!

```
git add forgotten_file 
git commit --amend
```

git commit --amend sẽ tạo ra một commit mới sẽ thay thế commit trước đó vì thế  đừng sử dụng nó để thay đổi commit đã được push lên repository. Một ngoại lệ cho quy tắc này có thể được thực hiện nếu bạn hoàn toàn chắc chắn rằng không có developer nào khác đã kiểm tra phiên bản trước và dựa trên công việc của riêng họ trên đó, trong trường hợp đó, việc ép buộc (git push --force) có thể vẫn ổn. Tùy chọn `--force` là cần thiết ở đây vì lịch sử của cây đã được sửa đổi cục bộ có nghĩa là thao push sẽ bị từ chối bởi máy chủ từ xa vì không thể  fast-forward merge trước đó.

### 5: Clean up local commits before pushing

Mặc dù `--amend` rất hữu ích, nó không giúp ích nếu commit bạn muốn reword không phải là cái cuối cùng. Trong trường hợp đó, một rebase tương tác có ích:

```
git rebase --interactive 
# if you didn't specify any tracking information for this branch 
# you will have to add upstream and remote branch information: 
git rebase --interactive origin branch
```

Thao tác này sẽ mở configured editor của bạn và hiển thị cho bạn như sau:

```
pick 8a20121 Upgrade Ruby version to 2.1.3 
pick 22dcc45 Add some fancy library 
# Rebase fcb7d7c..22dcc45 onto fcb7d7c 
# 
# Commands: # p, pick = use commit 
# r, reword = use commit, but edit the commit message 
# e, edit = use commit, but stop for amending 
# s, squash = use commit, but meld into previous commit 
# f, fixup = like "squash", but discard this commit's log message 
# x, exec = run command (the rest of the line) using shell 
# 
# These lines can be re-ordered; they are executed from top to bottom. 
# 
# If you remove a line here THAT COMMIT WILL BE LOST. 
# 
# However, if you remove everything, the rebase will be aborted. 
#
# Note that empty commits are commented out
```

Trên cùng, bạn sẽ thấy danh sách các commit ở local, dưới là giải thích về các lệnh có sẵn. Chỉ cần chọn (các) commit bạn muốn cập nhật, thay đổi chọn để viết lại (hoặc viết tắt là r) và bạn sẽ được đưa đến một chế độ xem mới, nơi bạn có thể chỉnh sửa message của commit đó.


Tuy nhiên, như có thể thấy từ danh sách trên, bạn hoàn toàn có thể xóa các commit bằng cách xóa chúng khỏi danh sách, cũng như chỉnh sửa, sắp xếp lại và đánh dấu chúng. Squashing cho phép bạn kết hợp nhiều commit vào một cái, cái mà tôi thích làm trên các nhánh đặc trưng trước khi push lên remote. Không có thêm "Thêm tập tin bị lãng quên" và "Sửa lỗi đánh máy" cam kết ghi lại cho cõi đời đời!

### 6: Reverting pushed commits

Mặc dù các bản sửa lỗi được minh chứng trong các lời khuyên trước đây, nhưng các commit bị lỗi đôi khi làm cho nó trở thành  central repository. Tuy nhiên,để xử lý vấn đề này git cung cấp một cách dễ dàng để  revert một hoặc nhiều lần commit:

```
 git revert c761f5c              # reverts the commit with the specified id
 git revert HEAD^                # reverts the second to last commit
 git revert develop~4..develop~2 # reverts a whole range of commits
```

Trong trường hợp bạn không muốn revert commit mà chỉ áp dụng những thay đổi cần thiết cho cây làm việc của mình, bạn có thể sử dụng tùy chọn --no-commit / -n.

```
# undo the last commit, but don't create a revert commit 
git revert -n HEAD
```

### 7: Avoid repeated merge conflicts

Như mọi developer đều biết, việc sửa các conflicts có thể tẻ nhạt, nhưng giải quyết cùng một xung đột chính xác nhiều lần thực sự rất khó chịu. Nếu bạn đã từng gặp phải vấn đề này trong quá khứ, bạn sẽ rất vui khi tìm được cách giải quyết vấn đề này. Thêm nó vào global config của bạn để sử dụng nó cho tất cả các dự án:

```
git config --global rerere.enabled true
```

Ngoài ra, bạn có thể bật nó trong từng dự án bằng cách tạo thủ công thư mục .git / rr-cache.

Điều này chắc chắn không phải là một tính năng cho tất cả mọi người, nhưng đối với những người cần nó, nó có thể là tiết kiệm thời gian thực. Hãy tưởng tượng nhóm của bạn đang làm việc trên các nhánh tính năng khác nhau cùng một lúc. Bây giờ bạn muốn merger tất cả chúng lại với nhau thành một nhánh có thể  check trước được. Như mong đợi, có một số  conflict mà bạn cần fix. Thật không may, hóa ra là một trong những branch chưa hoàn toàn ở đó, vì vậy bạn quyết định hủy quá trình merger một lần nữa. Vài ngày (hoặc vài tuần) sau khi branch cuối cùng đã sẵn sàng, bạn merger lại, nhưng nhờ vào các giải pháp đã đưa ra, bạn sẽ không phải giải quyết xung đột hợp nhất lần nữa.

### 8: Find the commit that broke something after a merge

Theo dõi các commit chứa lỗi sau khi merger có thể khá tốn thời gian, git cung cấp một cơ sở tìm kiếm nhị phân dưới dạng git-bisect. Trước tiên, bạn phải thực hiện thiết lập ban đầu:

```
 git bisect start         # starts the bisecting session
 git bisect bad           # marks the current revision as bad
 git bisect good revision # marks the last known good revision
```

Sau khi git này sẽ tự động kiểm tra một nửa sửa đổi giữa các phiên bản "good" và "bad" đã biết. Bây giờ bạn có thể chạy thông số kỹ thuật của bạn một lần nữa và đánh dấu cam kết là "good" hoặc "bad" cho phù hợp.

```
git bisect good # or git bisec bad
```

Quá trình này tiếp tục cho đến khi bạn nhận được commit chứa lỗi.

### 9: Avoid common mistakes with git hooks

Một số lỗi xảy ra nhiều lần, nhưng sẽ dễ dàng tránh được bằng cách checks  hoặc cleanup tasks tại một giai đoạn xác định của quy trình làm việc git. Đây chính xác là kịch bản mà hooks được thiết kế . Để tạo một hook mới, thêm một file thực thi vào .git / hooks

Tên của tập lệnh phải tương ứng với một trong hooks có sẵn. Bạn cũng có thể định nghĩa hooks toàn cục để sử dụng trong tất cả các dự án của bạn bằng cách tạo một thư mục mẫu mà git sẽ sử dụng khi khởi tạo một kho lưu trữ mới. Dưới đây là cách mục nhập có liên quan trong ~ / .gitconfig và thư mục mẫu mẫu giống như sau:
```
[init]
    templatedir = ~/.git_template

  → tree .git_template
  .git_template
  └── hooks
      └── pre-commit
```

Khi bạn khởi tạo một repository mới, các tệp trong thư mục mẫu sẽ được sao chép vào vị trí tương ứng trong thư mục .git của dự án của bạn.

Ví dụ sau đây là một hook hook-msg, nó sẽ đảm bảo rằng commit message đều tham chiếu đến tickets như “# 123”.

```
ruby
  #!/usr/bin/env ruby
  message = File.read(ARGV[0])

  unless message =~ /\s*#\d+/
    puts "[POLICY] Your message did not reference a ticket."
    exit 1
  end

```

### 10: When all else fails

Cho đến nay, chúng tôi đã đề cập đến rất nhiều vấn đề về cách khắc phục các lỗi phổ biến khi làm việc với git. Hầu hết trong số họ có các giải pháp đủ dễ dàng, tuy nhiên có những lúc người ta phải lấy ra big guns rewrite lịch sử của toàn bộ nhánh. Một trường hợp sử dụng phổ biến cho việc này là xóa dữ liệu sensitive (ví dụ: thông tin xác thực đăng nhập cho hệ thống sản xuất) đã được commited lên public repository

```
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch secrets.txt' \
  --prune-empty --tag-name-filter cat -- --all
```

Nó sẽ xóa tệp secrets.txt khỏi mọi branch và tag. Nó cũng sẽ loại bỏ bất kỳ commit nào sẽ trống. Điều này sẽ ghi lại toàn bộ lịch sử của dự án của bạn, nó có thể rất gây rối trong luồng công việc được phân phối. Ngoài ra, trong khi tệp được đề cập bây giờ đã bị xóa, thông tin đăng nhập mà nó chứa vẫn phải được xem là bị xâm phạm!

GitHub có [very good tutorial on removing sensitive data](https://help.github.com/articles/removing-sensitive-data-from-a-repository/) và `man-git-filter-branch` có tất cả các chi tiết về các bộ lọc có sẵn khác nhau và các tùy chọn của chúng.




-----
Nguồn tham khảo: https://dev.to/citizen428/10-common-git-problems-and-how-to-fix-them-234o