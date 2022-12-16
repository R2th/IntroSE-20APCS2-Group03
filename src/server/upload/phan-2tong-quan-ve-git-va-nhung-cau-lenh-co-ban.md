Xin chào mọi người, chúc mọi người một ngày cuối tuần vui vẻ. 

Tiếp theo phần 1: https://viblo.asia/p/phan-1tong-quan-ve-git-va-nhung-cau-lenh-co-ban-WAyK8qGnZxX

Hôm nay mình sẽ đi vào phần thực hành giới thiệu qua các lệnh cơ bản trong Git. Không để mọi người chờ lâu, bắt đầu nào.


### 1. Workflow khi làm việc với Git

- Ở trong phần này mình sẽ nói về flow khi làm việc với Git:
    - Clone git repository ở git server về máy local của bạn. (clone remote repository => local repository)
    - Tạo mới local branch như một nơi làm việc (workspace) của riêng bạn.
    - Chỉnh sửa source code (thêm, xóa, sửa files).
    - Kiểm tra các thay đổi source code. Thường ở bước này mình sẽ tạo một pull request từ branch của mình vào branch chính (master) => Review code
    - Sau khi review code ok, không có vấn đề => Commit code (lúc này vẫn ở local branch).
    - Sau đó push code để đẩy code từ local lên remote server git. Lúc này local branch của bạn đã liên kết với remote branch và được lưu ở git server.

![image.png](https://images.viblo.asia/770522cb-eb97-49e3-ad96-3c3d4d979616.png)

### 2. Git Clone là gì?
- Lệnh Git clone để lấy source code từ remote repository ở git server về máy local.


**Ví dụ:** 

Mình có một remote repository đặt ở server github:
https://github.com/LapTrinhThucChien/LearningGit

Để lấy source từ git server về local mình dùng lệnh git clone:
> git clone https://github.com/LapTrinhThucChien/LearningGit.git

### 3. Tạo một branch mới

- Trước khi đi vào thực hành. Mình muốn nhắc lại kiến thức về branch ở phần 1.
> Branch là nhánh của repository, hiểu đơn giản nó như một khu vực làm việc riêng (workspace). Khi tạo ra repository (kho chứa) ở git ta sẽ có 1 branch chính (master/main). Từ branch chính này ta có thể phân chia thành nhiều branch nhỏ. Branch đã phân nhánh này không ảnh hưởng đến branch chính vậy nên ta có thể tiến hành nhiều thay đổi trên cùng 1 repository. Đồng thời ta có thể merge (kết hợp) các branch với nhau.
> 
> Ví dụ:
> 
> Khi ta làm một tính năng (feature) mới ta có thể tạo ra một branch riêng để code cho feature này. Sau khi feature hoàn thành ta có thể merge code vào branch chính (master).
> Hoặc trong team có nhiều team members ta có thể chia repository thành nhiều branch. Với mỗi branch cho một người.
> Việc chia thành các branch riêng biệt rất tiện lợi cho việc làm việc theo nhóm và tách biệt source code, cùng lúc chỉnh sửa trên 1 repository.
> 
> Có 2 loại branch. Tương tự như repository, branch cũng có 2 loại:
> 
> Remote Branch: là branch lưu ở git server. Branch này có thể chia sẻ với người khác được.
> Local branch: là branch lưu ở local máy cảu mình. Nó có thể liên kết với 1 remote branch hoặc không.

- Ở mục số 2 mình đã hướng dẫn lệnh git clone để lấy source code về máy local. Tiếp theo các bạn tạo mới local branch như một nơi làm việc của riêng bạn.
> $ git checkout -b [name_of_your_new_branch]
- Push branch từ local lên server:
> $ git push origin [name_of_your_new_branch]
- Để xem tất cả các branch đã tạo. Ta dùng lệnh:
> $ git branch -a

### 4. Git commit
- Git commit có tác dụng ghi lại sự thay đổi của các files trong source code (add, update, remove) kèm với messages tương ứng. Ta có thể xem lại lịch sử của các lần commit trước đó để biết có sự thay đổi gì trong source code.

![image.png](https://images.viblo.asia/aae8ecdb-c2cd-48fa-bb33-d2735cd61a50.png)

- Cú pháp:
> git commit -m "commit message"

- Xem lịch sử commit:
> $ git log

### 5. Git push

- Lệnh git push sẽ đẩy dữ liệu từ local repository lên remote repository (git server). Dữ liệu ở đây bao gồm các files thay đổi, các branchs mới, các thông tin chung về git.

- Cú pháp:
> git push <remote> <branch>

### 6. Git pull
- Lệnh git pull sẽ tải dữ liệu từ remote repository về local repository.
- Cú pháp: 
>     git pull <remote>
    
### 7. Git merge
- Lệnh git merge cho phép merge các branch lại với nhau.
![image.png](https://images.viblo.asia/b6ec2658-2c28-47bc-b233-05e0354466c0.png)
    
- Git merge sẽ tạo ra một commit mới M kể từ commit chung gần nhất C3. Và commit M này sẽ chứa tất cả những thay đổi. Lịch sử commit sẽ được giữ lại.
    
    
###  8. Git rebase
 - Git rebase sẽ gộp các commit từ branch này vào branch khác. Bằng cách xây dựng lại các commit kế thừa từ commit sẵn có. Lịch sử commit sẽ được viết lại. Cụ thể ở hình dưới là tạo ra commit D1' dựa trên commit D1.

![image.png](https://images.viblo.asia/1ebd6ac1-425f-4d09-a110-3af702d275f1.png)


### Tham khảo:
- https://www.tutorialspoint.com/git/git_life_cycle.htm#
- https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches
- https://backlog.com/git-tutorial/vn/intro/intro1_3.html
- https://www.atlassian.com/git/tutorials/syncing/git-push
- https://xuanthulab.net/lenh-git-merge-va-rebase-gop-va-viet-lai-lich-su-commit.html