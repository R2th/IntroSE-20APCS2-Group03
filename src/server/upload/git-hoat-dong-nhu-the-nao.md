Chào các bạn,

Lại đến tháng rồi :v

Sau series Ruby on Rails của mình, chắc nếu ai có chịu khó đọc hết từ đầu đến cuối thì cũng đã có kha khá kiến thức về  Ruby on Rails rồi nhỉ :))

Ngoài các kiến thức cơ bản trên để nâng cao và nắm vững kiến thức các bạn cần đào sâu tìm hiểu thêm khi làm các dự án thực tế.
Ngoài ra các bạn có thể tìm hiểu thêm một số kỹ thuật nâng cao trong rails như:
- Metaprogramming Rails: http://ruby-metaprogramming.rubylearning.com/
- Design Patterns:
https://en.wikipedia.org/wiki/Software_design_pattern
https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)
- Rails caching
- Rails indexing
- ...

Sắp tới mình có việc cá nhân nên tạm thời chắc sẽ pending `Series hướng dẫn lập trình Ruby on Rails` và không biết sau này có còn quay lại tiếp với Series này nữa không :v

Nhưng hy vọng là qua series này có thể giúp một số bạn dễ dàng hơn trên con đường trở thành một Ruby on Rails Developer lol.

Lan mang thế đủ rồi :v

Ta vào vấn đề chính của bài hôm nay:

# Mục đích
Đa số các công ty phần mềm hiện nay đều sử dụng Git trong quản lý source code của dự án.
Nên bên cạnh việc nắm vững technical của NNLT đang làm,
việc nắm vững các kiến thức về Git cũng rất quan trọng trong khi làm việc.
Khi đi phỏng vấn đôi lúc nhà tuyển dụng cũng hỏi qua kiến thức về Git của các bạn như thế nào, nên việc nắm rõ Git sẽ giúp các bạn rất nhiều.

# Git hoạt động như thế nào ?

Để có cái nhìn tổng quan mời các bạn xem hình minh họa sơ đồ hoạt động của Git như bên dưới:


![](https://images.viblo.asia/cee483ee-9b49-40da-8775-9da90a12caa1.jpg)

                               sơ đồ hoạt dộng của Git

Ở hình trên chúng ta sẽ chia làm hai phần chính:
- Git structures: workspace, index, local repository
- Remote repository

#### Remote repository
Đây các bạn có thể hiểu đơn giản là một nơi để lưu cái `local repository` lên internet - nhưng nó không lưu tất cả mà chỉ lưu những cái mà chúng ta push lên mà thôi.

Mục đích là để chúng ta có thể dễ dàng lấy nó về để sử dụng bất cứ lúc nào, và bất cứ ở đâu.

Và có thể share cho những người khác cùng vào sử dụng.

Nó có thể là một dịch vụ máy chủ Repository bất kỳ như: [Github](https://github.com/), [Bitbucket](http://bitbucket.org/),...

#### Git structures

Trong các hệ thống quản lý phiên bản Version Control System thì dữ liệu sẽ được lưu trữ ở hai nơi:
- Workspace hay working tree
- local repository

Nhưng với Git thì có thêm một lựa chọn nữa đó là khu vực trung gian gọi là `Staging Area` hay `Index` - hai cách gọi đều tương đương nhau - và đây chính là lợi thế lớn của Git.

`Staging Area` là khu vực sẽ lưu trữ những thay đổi của bạn trên tập tin để nó có thể `commit`, vì đối với git muốn `commit` tập tin nào thì tập tin ấy phải nằm trong `Staging Area`. Một tập tin khi nằm trong `Staging Area` thì sẽ có trạng thái là `Staged`

Như vậy Git structures sẽ có 3 phần
1. Workspace/working tree
2. Staging Area/index
3. Local repository

Tương ứng với sự thay đổi từng trạng thái của 1 tập tin từ trên xuống dưới.

Khi làm việc với Git thì các file của chúng ta sẽ có 2 trạng thái chính đó là `Tracked` và `Untracked`:

- `Tracked`: là tập tin đã được đánh dấu theo dõi trong Git để bạn làm việc với nó. Trong `Tracked` sẽ có thêm các trạng thái phụ khác là:
`Unmodified`: chưa chỉnh sửa
`Modified`: đã chỉnh sửa nhưng chưa đưa vào `StagingArea`
`Staged`: đã nằm trong `StagingArea` sẵn sàng commit

- `Untracked`: là các tập tin mới được tạo ra và chưa được `Git` đánh dấu theo dõi.


![](https://images.viblo.asia/7ba74b45-bd4b-4750-9df1-45cf776ef9b4.png)

                       sơ đồ chuyển trạng thái của tập tin trong Git

Tiếp theo:
để theo dõi sự thay đổi trong những lần commit, hay giữa commit hiện tại và workingtree ta thường hay sử dụng lệnh `git diff` nhưng nó sẽ hoạt động thế nào đối với 3 phần khác nhau của Git strucstures ở trên ?

Để hiểu rõ mời các bạn xem hình minh họa bên dưới

![](https://images.viblo.asia/cab6fd49-c11a-41aa-8fc9-a278a85a3596.jpg)

Ở đây có khái niệm `HEAD`
- `HEAD` nó sẽ trỏ đến commit cuối cùng của branch bạn đang thực hiện nằm ở vùng `local repository`
- Nếu có thêm `~` ở cuối nghĩa là commit trước commit cuối cùng.
- `^` tương đương với `~`

vd: Mình có như này
```
minhduc@minhduc:~/Documents/git_master$ git log --oneline
2e5316d commit 4                      \\ 0

2d9860a commit 3                      \\ 1

20edc99 commit_2                      \\ 2

b9ca4c6 init_git_master               \\ 3
```
Thì

`HEAD` sẽ là commit `2e5316d commit 4`

`HEAD~` = `HEAD~1`\ `HEAD^` sẽ là commit `2d9860a commit 3`

`HEAD~2` sẽ là commit `20edc99 commit_2`

# Ví dụ
Để dễ hiểu thì mình có 1 repository và sẽ thao tác trên đấy
repo mình như sau:

![](https://images.viblo.asia/a1f078f0-32ab-47c2-948d-7e4eda1c7093.png)

Thông tin local như này:

```
minhduc@minhduc:~/Documents/git_master$ git branch
* master
minhduc@minhduc:~/Documents/git_master$ git log --oneline
54a8d68 commit_3
20edc99 commit_2
b9ca4c6 init_git_master
minhduc@minhduc:~/Documents/git_master$
```

### git show
Xem thông tin commit

`git show HEAD` = `git show 54a8d68`

```
minhduc@minhduc:~/Documents/git_master$ git show HEAD
commit 54a8d68a97bdd79acd183d3a77e1cc737b48b5ba
Author: Minh Duc <duc11t3bk@gmail.com>
Date:   Sun Apr 8 21:54:25 2018 +0700

    commit_3

diff --git a/faker_harry_potter.txt b/faker_harry_potter.txt
new file mode 100644
index 0000000..7e0d027
--- /dev/null
+++ b/faker_harry_potter.txt
@@ -0,0 +1,5 @@
+Harry Potter
+Hogwarts
+I solemnly swear that I am up to no good.
+Harry Potter and the Chamber of Secrets
+Gryffindor
```

### git diff / git diff HEAD / git diff --cached
Xem thôg tin tập tin thay đổi

Mình sẽ thêm dòng này vào cuối file `faker_harry_potter.txt`
`Hermione Granger`

![](https://images.viblo.asia/666ea915-4189-477b-baa5-291cdc0a0756.png)

So sánh sự thay đổi giữa
1. `Workingspace` - `StagingArea`: `git diff`
2. `Workingspace` - `Local repository`: `git diff HEAD`
3. `StagingArea`  - `Local repository`: `git diff --cached`

Ta thấy giữa 1 và 2 giống nhau, vì hiện tại ở `StagingArea` và `Local repository` chứa code giống nhau
Và do đó khi thực hiện lệnh 3 thì không có thay đổi nào xảy ra.

Kiểm tra status của file `faker_harry_potter.txt`

```
minhduc@minhduc:~/Documents/git_master$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   faker_harry_potter.txt

no changes added to commit (use "git add" and/or "git commit -a")
minhduc@minhduc:~/Documents/git_master$
```
Vì file `faker_harry_potter.txt` đã được thêm vào trước đó ở `commit_3` các bạn có thể check thông qua lệnh `git log faker_harry_potter.txt`

```
minhduc@minhduc:~/Documents/git_master$ git log faker_harry_potter.txt
commit 54a8d68a97bdd79acd183d3a77e1cc737b48b5ba
Author: Minh Duc <duc11t3bk@gmail.com>
Date:   Sun Apr 8 21:54:25 2018 +0700

    commit_3
minhduc@minhduc:~/Documents/git_master$
```
nếu muốn biết chi tiết hơn từng file đấy được thay đổi như nào qua từng commit thì có thể thêm tham số `-p` vd: `git log -p faker_harry_potter.txt`

Như vậy file `faker_harry_potter.txt` của chúng ta
đang ở trạng thái đã `Tracked` và `Modified`
Đưa file này sang `StagingArea` và kiểm tra `git diff `

```
minhduc@minhduc:~/Documents/git_master$ git add faker_harry_potter.txt
minhduc@minhduc:~/Documents/git_master$ git diff
minhduc@minhduc:~/Documents/git_master$ git diff HEAD
diff --git a/faker_harry_potter.txt b/faker_harry_potter.txt
index 7e0d027..651a277 100644
--- a/faker_harry_potter.txt
+++ b/faker_harry_potter.txt
@@ -3,3 +3,4 @@ Hogwarts
 I solemnly swear that I am up to no good.
 Harry Potter and the Chamber of Secrets
 Gryffindor
+Hermione Granger
minhduc@minhduc:~/Documents/git_master$ git diff --cached
diff --git a/faker_harry_potter.txt b/faker_harry_potter.txt
index 7e0d027..651a277 100644
--- a/faker_harry_potter.txt
+++ b/faker_harry_potter.txt
@@ -3,3 +3,4 @@ Hogwarts
 I solemnly swear that I am up to no good.
 Harry Potter and the Chamber of Secrets
 Gryffindor
+Hermione Granger
minhduc@minhduc:~/Documents/git_master$
```
Như vậy phần `StagingArea` đã chứa file `faker_harry_potter.txt` có thay đổi.
File `faker_harry_potter.txt` đang có trạng thái là `Tracked` và `Staged`

Giờ ta thực hiện `commit` để đưa sự thay đổi ấy lên `Local repository`
```
minhduc@minhduc:~/Documents/git_master$ git commit -m "commit_4"
[master 53db674] commit_4
 1 file changed, 1 insertion(+)
minhduc@minhduc:~/Documents/git_master$ git diff
minhduc@minhduc:~/Documents/git_master$ git diff HEAD
minhduc@minhduc:~/Documents/git_master$ git diff --cached
```
3 phần đã được đồng bộ với nhau. Như vậy là đã hoàn thành việc commit. Nếu muốn các bạn có thể push lên `Remote repository`

### git reset --soft/ --mixed/ --hard
Ta vừa thực hiện theo chiều thuận có nghĩa là:
thay đổi 1 file -> commit nó lên local repository.

Vấn đề đặt ra ở đây là giờ sau khi commit chúng ta thấy có một số file không ổn, và không muốn commit nó lên, hoặc chúng ta thực hiện nhầm branch (branch khác base) và muốn move hết sự thay đổi sang branch khác nhưng lỡ commit mất rồi thì phải làm thế nào ?

Đơn giản thôi
Giờ ta sẽ thực hiện theo chiều ngược lại: đưa status các file về đúng vùng mà chúng ta mong muốn.
Git hỗ trợ việc này bằng lệnh `git reset`

- `git reset --soft`: đưa sự thay đổi về vùng `StagingArea`
- `git reset --mixed`: đưa sự thay đổi về vùng `Workingspace`. Nếu không thêm mode thì nó default sẽ là `--mixed`
- `git reset --hard`: xóa luôn sự thay đổi ở vùng `Workingspace` và `StagingArea`

![](https://images.viblo.asia/eb16ee0f-acfc-466a-a9f6-dad983f0a273.jpg)

                      git reset --mode
vd:
Chúng ta muốn đưa sự thay đổi ở `commit_4` về vùng `StagingArea`

```
minhduc@minhduc:~/Documents/git_master$ git reset --soft HEAD~1
minhduc@minhduc:~/Documents/git_master$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   faker_harry_potter.txt

minhduc@minhduc:~/Documents/git_master$ git log --oneline
54a8d68 commit_3
20edc99 commit_2
b9ca4c6 init_git_master
minhduc@minhduc:~/Documents/git_master$
```
Sau đó các bạn muốn thay đổi hay thêm gì vào commit thì làm thao tác các bước như cũ, rồi commit lên lại.

Tương tự đối với các vùng khác.

Hôm nay chắc dừng ở đây, hy vọng qua bài viết giúp các bạn phần nào hiểu hơn về Git để có thể làm chủ được nó sau này.

Chào thân ái,
và hẹn gặp lại chắc vào một ngày sẽ rất lâu nữa :))

Nguồn:
https://www.slideshare.net/saharabeara/advanced-git-tutorial?from_action=save
https://stosb.com/static/talks/sruk_advance_git_16.pdf
https://thachpham.com/series/git-co-ban