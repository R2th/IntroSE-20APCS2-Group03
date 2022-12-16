Xin chào mọi người, chúc mọi người một ngày cuối tuần vui vẻ.
Hôm này mình sẽ chia sẻ về Git một công cụ khá quen thuộc với anh em developer. Không để mọi người chờ lâu, bắt đầu nào.

### 1. Git là gì?

> Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.


- Định nghĩa ở trên mình lấy ở trang git-scm.com. Hiểu nôm na Git là một phần mềm quản lý mã nguồn (source code) phân tán. 

![image.png](https://images.viblo.asia/79574a65-b3c9-4009-afdd-209a0790de22.png)

### 2.  Ưu điểm của git
- Giúp quản lý mã nguồn đơn giản, an toàn và dễ sử dụng.
- Tối ưu hóa việc quản lý source code khi làm việc theo nhóm bằng cách chia và kết hợp ra các nhánh (branch).
- Dễ dàng tích hợp CI/CD trong việc deployment với git.
- Có thể dễ dàng lấy source code ở bất kỳ đâu chỉ cần clone từ git server về máy của bạn.

### 3. Git server là gì?
- Git server là máy chủ (server) có cài đặt dịch vụ git. Source code sẽ được lưu trữ ở máy server này.
- Một số git server phổ biến: Github, Bitbucket, GitLab, Microsoft Azure DevOps, Amazon AWS CodeCommit...


**Note:** Các bạn mới cần phân biệt giữa git và git server. 

Ví dụ: Github là một git server. Bạn có thể tạo một respository trên github. Repository trên git server này gọi là **remote repository**. Bạn có thể **Clone Remote Repository** về máy bạn thành **Local Repository**
![image.png](https://images.viblo.asia/d0042142-fc36-4561-a92a-1b36067eec8c.png)

### 4. Repository là gì?

![image.png](https://images.viblo.asia/dc10941a-2484-4366-9106-4fcc199f7c7d.png)
- Repostiory được hiểu như là một nơi lưu trữ chứa mã nguồn (source code) và tất cả thông tin liên quan đến việc sửa đổi và lịch sử của toàn bộ project (dự án).
- Dữ liệu của repository git có thể xem ở folder .git:
![image.png](https://images.viblo.asia/3489dc41-282f-4c37-8dfb-1829f910a5ab.png)


- Respository có 2 loại: 
    - **Remote Repository**: đặt ở git server và có thể chia sẻ tới nhiều người.
    - **Local Repository**: đặt ở máy local chỉ cho bản thân mình dùng. Bạn có thể **Clone Remote Repository** về máy bạn thành **Local Repository**. Và sau khi có thay đổi ở Local Repository có thể push code lên Remote Repository.

### 5. Branch là gì?
![image.png](https://images.viblo.asia/a30946b5-5161-416f-bbe3-c2bdfe6c91b7.png)

- Branch là nhánh của repository, hiểu đơn giản nó như một khu vực làm việc riêng (workspace). Khi tạo ra repository (kho chứa) ở git ta sẽ có 1 branch chính (master/main). Từ branch chính này ta có thể phân chia thành nhiều branch nhỏ. Branch đã phân nhánh này không ảnh hưởng đến branch chính vậy nên ta có thể tiến hành nhiều thay đổi trên cùng 1 repository. Đồng thời ta có thể merge (kết hợp) các branch với nhau.

    **Ví dụ**: 
    - Khi ta làm một tính năng (feature) mới ta có thể tạo ra một branch riêng để code cho feature này. Sau khi feature hoàn thành ta có thể merge code vào branch chính (master).
    - Hoặc trong team có nhiều team members ta có thể chia repository thành nhiều branch. Với mỗi branch cho một người. 


- Việc chia thành các branch riêng biệt rất tiện lợi cho việc làm việc theo nhóm và tách biệt source code, cùng lúc chỉnh sửa trên 1 repository.

- Có 2 loại branch. Tương tự như repository, branch cũng có 2 loại:
    - **Remote Branch**: là branch lưu ở git server. Branch này có thể chia sẻ với người khác được.
    - **Local branch**: là branch lưu ở local máy cảu mình. Nó có thể liên kết với 1 remote branch hoặc không.

### 6. Cài đặt git:
- Download git và install cho window: https://git-scm.com/downloads
- Chi tiết cài đặt các bạn có thể tham khảo: https://phoenixnap.com/kb/how-to-install-git-windows

### 7. Đăng ký tài khoản github (git server) và tạo một remote repository
- Đăng ký tài khoản github: https://github.com/signup?user_email=&source=form-home-signup
- Tạo mới một remote repository trên github: https://docs.github.com/en/get-started/quickstart/create-a-repo

Ví dụ: Một repository sau khi mình tạo mới:
![image.png](https://images.viblo.asia/93569e9f-6e45-472a-849e-175c2750b223.png)





### Tham khảo:
- https://git-scm.com/
- https://www.ilook.asia/thu-thuat/download/kien-thuc-ve-git-phan-1-nhung-khai-niem-va-thuat-ngu-co-ban-ve-git-90.html
- https://backlog.com/git-tutorial/creating-a-repository/
- https://vn.got-it.ai/blog/huong-dan-cach-tao-branch-trong-git