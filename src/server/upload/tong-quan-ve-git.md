# **Nội dung**
- Tổng quan về git
- Các khu vực làm việc
- Một số lệnh cơ bản
- A Succesful Branching Model

## Tổng quan về git
**1 Giới thiệu**
- Git là phần mềm quản lí mã nguồn phân tán.
- Ban đầu git dùng để quản lí mã nguồn cho việc phát triển nhân linux.Nhưng hiện nay git đã trở thành một  trong những phần mềm quản lí mã nguồn phổ biến nhất.
- Git là một hệ thống VCS (Version Control System) đi theo hướng quản lí source code phân tán,khác với SVN và CVS là hệ thống quản lí mã nguồn đi theo hướng quản lí source code tập trung.
- Các hệ thống giúp quản lí dự án hiện nay như: github, gitlap, Jira ticket, Backlog.

![](https://images.viblo.asia/beb9d35c-4d2e-487c-ad50-c2abd5dee8bb.png)

**2. Lịch sử Git**

![](https://images.viblo.asia/8d121c13-8d95-4bb9-819d-1feb2b28c577.png)

**3. Các khải niệm cơ bản**
- Repository(repo)
- Remote repository
- Local repository
- Branch

![](https://images.viblo.asia/effda5a3-6c18-4a90-a412-6d583917011e.png)

**4. Lợi ích khi dùng Git**
- Giúp quy trình làm việc code theo nhóm đơn giản hơn rất nhiều bằng việc kết hợp các phân nhánh (branch).
- Sắp xếp công việc tốt hơn.
- Linh hoạt hơn khi cùng lúc phải làm nhiều task.
- Tự tin thử nghiệm những ý tưởng mới.
- Dễ dàng trong việc phát triển sản phẩm.
- Có thể làm việc bất cứ đâu, chỉ cần clone mã nguồn từ repo về máy.

## CáC Khu vực làm việc
**1 Trạng thái của Git**
- Committed
- Modified
- Staged

**2 . Khu vực tổ chức dự án của GIt**
- Working tree
- Staging Area
- Git direnctory

![](https://images.viblo.asia/b576f0a3-fe8e-4fbf-904d-0744f6866e1d.png)

## Một số lệnh cơ bản
- git init: Khởi tạo git repo, sẽ tạo ra một thư mục .git, thư mục này chứa tất cả các tập tin cần thiết cho repo.
- git clone: Sao chép một remote repo về máy tính mình.
- git status: để kiểm tra trạng thái của tệp tin (staged, modified, committed)
- git add: Cập nhật các file lên Staging Area.
- git commit: Cập nhật file lên local repository.
- git push: Cập nhật file từ local repository lên remote repository.
- git fetch: Cập nhật các thay đổi từ remote repo về local repo,nhưng không tiến hành merge.
- git pull: Cập nhật những thay đổi từ remote repo về local repo,đồng thời tiến  hành merge.
- git merge: Gộp các branch lại với nhau.
- git rebase: Gộp các commit lại với nhau.
- git branch: xem các branch 
- git checkout <name-branch>: checkout sang branch
- git checkout -b <name branch>: vừa tạo ra vừa checkout sang branch mới.
- git commit --amend: sửa code mà không muốn tạo commit mới.
- git stash: lưu những thay đổi hiện tại vào stack.

## A Successful Branching Model 

![](https://images.viblo.asia/77952dd2-bd73-4f3a-8c87-c3c08c289074.png)

Main Branches Master Develop

![](https://images.viblo.asia/8c904a2d-45b1-42a9-95f4-148bb2be71f4.png)

**3 nhóm branches nên sử dụng**
- Feature Branches:
+ Chỉ được checkout từ nhánh develop.
+ Chỉ được merge vào nhánh develop.
+ Đây là nhánh để phát triển các tính năng mới của dự án.

![](https://images.viblo.asia/0e7f7a41-47c7-4b64-96a5-3a773bd7fdbd.png)

- Release Branches

![](https://images.viblo.asia/eedd4e38-6d33-46f0-925b-8685a6511977.png)

- Hotfix Branches
+ Trong quá trình release suất hiện các bug cần phải fix gấp.
+ Hotfix được checkout từ master.
+ Được merge vào cả master và develop.

![](https://images.viblo.asia/5db101e6-7d30-4f1c-96c6-b7a9af54458d.png)