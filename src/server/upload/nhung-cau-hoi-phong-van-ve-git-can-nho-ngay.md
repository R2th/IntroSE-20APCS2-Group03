## **Q1: Git fork là gì ? Sự khác nhau giữa  git fork, branch và clone?**

* Git fork:  là một bản copy của một repository (Kho chứa source code của bạn trên Github). Việc fork một repository cho phép bạn dễ dàng chỉnh sửa, thay đổi source code mà không ảnh hưởng tới source gốc. 
* Git clone: khác với fork; nó là một bản remote local copy của một số kho lưu trữ. Khi bạn sao chép, bạn đang sao chép toàn bộ repo, bao gồm tất cả lịch sử và các nhánh.
* Git branch: là một cơ chế để xử lý các thay đổi trong một kho lưu trữ duy nhất để cuối cùng merger chúng với phần còn lại của code. Branch là cái gì đó nằm trong một repo. Về mặt khái niệm, nó đại diện cho một luồng phát triển.

## **Q2: Sự khác nhau giữa "pull request" và "branch"?**

* Branch: là một version riêng biệt của code.
* Request: là khi ai đó lấy repo, tạo nhánh riêng của họ, thực hiện một số thay đổi, sau đó merger nhánh đó vào (đặt thay đổi của chúng trong kho lưu trữ code của người khác).

## **Q3: Sự khác nhau giữa "git pull" and "git fetch"?**

Nhìn chung, git pull thực hiện git fetch theo sau là git merge

* Khi bạn sử dụng **pull**, Git sẽ cố gắng tự động thực hiện công việc của bạn cho bạn. Vì vậy Git sẽ merger bất kỳ commit ở trong nhánh bạn đang làm việc. Tự động merger các commit mà không cho phép bạn xem chúng trước. Nếu bạn không quản lý chặt chẽ các branch của mình, bạn có thể gặp phải conflicts thường xuyên.
* Khi bạn **fetch**, Git tập hợp bất kỳ commit nào từ target branch không tồn tại trong nhánh hiện tại của bạn và lưu trữ chúng trong local repository của bạn. Tuy nhiên, nó không merger chúng với nhánh hiện tại của bạn. Điều này đặc biệt hữu ích nếu bạn cần cập nhật kho lưu trữ của bạn, nhưng đang làm việc trên project rất dễ  có thể  bị ảnh hưởng nếu bạn cập nhật các file của mình. Để  merger các commit vào nhánh chính của bạn, bạn sử dụng merger.

## **Q4: Làm thế  nào để revert previous commit trong git?**


Giả sử bạn đang có 2 branch C, F (trong đó C là HEAD của bạn và (F) là trạng thái tệp của bạn)

```
  (F)
A-B-C
    ↑
  master
```
* To nuke changes in the commit:

```
git reset --hard HEAD~1
```

Bây giờ B là HEAD. Bởi vì bạn đã sử dụng --hard, các tệp của bạn được đặt lại về trạng thái của của commit B.

* Để hoàn tác commit nhưng giữ thay đổi của bạn:

```
git reset HEAD~1
```

Bây giờ Git sẽ di chuyển con trỏ HEAD trở lại commit (B) và để lại các tập tin như họ đang có và git status cho thấy những thay đổi bạn đã check vào C.

* Để  undo commit của bạn nhưng không thay đổi tệp và chỉ mục của bạn
```
git reset --soft HEAD~1
```

Khi bạn thực hiện git status, bạn sẽ thấy rằng các tệp giống nhau nằm trong chỉ mục như trước đây.

## **Q5:"git cherry-pick" là gì?**

Lệnh git cherry-pick thường được sử dụng để xem các commit cụ thể từ một nhánh trong một repo trên một nhánh khác. Việc sử dụng phổ biến là commit chuyển tiếp hoặc back-port commits từ maintenance đến branch phát triển.

Điều này trái ngược với các cách khác như merger và rebase mà thường áp dụng nhiều commit vào một nhánh khác.

```
git cherry-pick <commit-hash>
```

## **Q6: Giải thích những ưu điểm of Forking Workflow**

Forking Workflow khác với workflows phổ biến khác của Git. Thay vì sử dụng một server-side repository duy nhất để hoạt động như là cơ sở dữ liệu "trung tâm", nó cung cấp cho mỗi developer kho lưu trữ phía máy chủ của riêng họ. Forking Workflow thường thấy nhất trong các dự án nguồn mở công khai.

Ưu điểm chính của Forking Workflow là các đóng góp có thể được tích hợp mà không cần mọi người đẩy vào một central repository duy nhất dẫn đến một clean project history. Developers đẩy tới kho lưu trữ phía máy chủ của riêng họ và chỉ người project maintainer mới có thể push tới official repository.

Khi developers hoàn thành 1 commit ở local, họ push commit vào local repo của riêng họ — không phải là official repo. Sau đó, họ pull request với main repo, cho phép người project maintainer biết rằng bản cập nhật đã sẵn sàng để được tích hợp.


## **Q7: Sự khác nhau giữa HEAD, working tree and index, in Git?**

* working tree/working directory/workspace là cây thư mục của các tệp (nguồn) mà bạn thấy và chỉnh sửa.
* index/staging area là một file nhị phân lớn, duy nhất trong /.git/index, liệt kê tất cả các file trong nhánh hiện tại.
* HEAD là tham chiếu đến lần commit cuối cùng trong nhánh hiện đã được kiểm tra.

## **Q8: Trình bày quy trình làm việc của the Gitflow workflow?**

Luồng công việc Gitflow sử dụng hai nhánh chạy song song dài để ghi lại lịch sử của dự án, master và develop:

* Master - luôn sẵn sàng để released trên LIVE, với tất cả các branch được kiểm tra và phê duyệt đầy đủ (production-ready).

    - Hotfix - Các nhánh bảo trì hoặc "hotfix" được sử dụng để nhanh chóng vá production releases. Các nhánh Hotfix rất giống các release branches và feature branches trừ khi chúng dựa trên master thay vì develop.

* Develop - là nhánh mà tất cả các nhánh tính năng được merger và nơi tất cả các tests được performed. Chỉ khi mọi thứ được kiểm tra kỹ lưỡng và sửa chữa thì nó có thể được merger với master.

   -  Feature - Mỗi feature mới phải nằm trong nhánh riêng của nó, có thể được đẩy đến nhánh develop làm nhánh phụ của chúng.


![](https://images.viblo.asia/1df6a66a-082a-4dd4-b78c-319660956dc7.png)

## **Q9: Khi nào nên sử dụng "git stash"?**

Lệnh git stash thực hiện uncommitted changes của bạn (both staged and unstaged), lưu chúng lại để sử dụng sau này và sau đó chuyển đổi chúng từ from your working copy.

Consider:

```
$ git status
On branch master
Changes to be committed:
new file: style.css
Changes not staged for commit:
modified: index.html
$ git stash
Saved working directory and index state WIP on master: 5002d47 our new homepage
HEAD is now at 5002d47 our new homepage
$ git status
On branch master
nothing to commit, working tree clean
```

Ta có thể sử dụng stashing là nếu ta phát hiện ra đã quên một gì đó trong lần commit cuối cùng và đã bắt đầu làm việc trên nhánh tiếp theo trong cùng một nhánh:

```
# Assume the latest commit was already done
# start working on the next patch, and discovered I was missing something

# stash away the current mess I made
$ git stash save

# some changes in the working dir

# and now add them to the last commit:
$ git add -u
$ git commit --ammend

# back to work!
$ git stash pop
```

## **Q10: Làm thế nào để loại bỏ một tập tin từ git mà không cần loại bỏ nó khỏi file system của bạn?**

Nếu bạn không cẩn thận trong khi git add, bạn có thể sẽ thêm các tệp mà bạn không muốn commit. Tuy nhiên, git rm sẽ xóa nó khỏi staging area (index) của bạn, cũng như file system (working tree) của bạn, có thể không phải là thứ bạn muốn.

Thay vào đó hãy sử dụng git reset:

```
git reset filename          # or
echo filename >> .gitingore # add it to .gitignore to avoid re-adding it
```

Điều này có nghĩa rằng git reset <paths> khác hoàn toàn với git add <paths>.
    
    
##  **Q11: Khi nào bạn sử dụng "git rebase" thay vì "git merge"?**

Cả hai lệnh này được thiết kế để tích hợp các thay đổi từ một nhánh này sang một nhánh khác.

Consider before merge/rebase:

```
A <- B <- C    [master]
^
 \
  D <- E       [branch]
```
    
after git merge master:

```
A <- B <- C
^         ^
 \         \
  D <- E <- F
```

after git rebase master:

```
A <- B <- C <- D <- E
```

When to use:

- Nếu bạn có bất kỳ nghi ngờ, sử dụng merge.
- Sự lựa chọn cho rebase or merge dựa trên những gì bạn muốn lịch sử của bạn trông như thế nào.

Nhiều yếu tố cần xem xét:

1.Nhánh bạn có đang nhận được những thay đổi từ việc chia sẻ với các developers khác bên ngoài nhóm của bạn (ví dụ: nguồn mở, công khai) không? Nếu vậy, đừng rebase. Rebase phá hủy nhánh và repo của các developers đó sẽ bị ảnh hưởng / không nhất quán trừ khi họ sử dụng lệnh git pull --rebase.

2.Development team có kỹ năng như thế nào? Rebase là một hoạt động phá hoại. Điều đó có nghĩa, nếu bạn không áp dụng nó một cách chính xác, bạn có thể mất commit và / hoặc phá vỡ sự thống nhất repo của developers khác.

3.Bản thân nhánh có đại diện cho thông tin hữu ích không? Một số nhóm sử dụng mô hình nhánh cho mỗi nhánh, trong đó mỗi nhánh đại diện cho một feature (hoặc bugfix, hoặc tính năng phụ, vv) Trong mô hình này nhánh giúp xác định các tập hợp các commit liên quan. Trong trường hợp mô hình nhánh cho mỗi developer, chính nhánh không truyền tải bất kỳ thông tin bổ sung nào. Sẽ không có hại gì khi rebasing.

4.Bạn có muốn revert những pull đã merger vì bất kỳ lý do nào không?Reverting a rebase sẽ hơi khó khăn và / hoặc không thể (nếu rebase có conflict) so với reverting a merge. Nếu bạn nghĩ rằng có thể bạn sẽ muốn revert sau đó sử dụng merge.

-----

Nguồn tham khảo: https://dev.to/aershov24/11-painful-git-interview-questions-you-will-cry-on-1n2g