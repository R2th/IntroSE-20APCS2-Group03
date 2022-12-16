Chào mọi người, như mọi người đã biết, có rất nhiều cách deploy ứng dụng trên server, tuy nhiên việc deploy còn thủ công.

Để việc deploy được diễn ra tự động khi có thay đổi trên github, hôm nay mình muốn hướng dẫn các bạn sử dụng Jenkins để deploy source github 1 cách nhanh chóng nhất.

Let's go!.
## 1. Install Jenkin on window
Các bước cài đặt jenkins khá đơn giản, bạn vào web [Download Jenkins](https://jenkins.io/download/) và tải về máy tùy theo hệ điều hành. Ở đây mình sử dụng window thì download file .exe cho window và cài đặt.

Chạy file cài đặt và chọn 1 số plubin được đề xuất và Jenkins sẽ tự cài đặt
![Install Jenkin](https://images.viblo.asia/02b272ec-686c-4e82-b3a2-cfbb14b87b06.PNG)

Nếu bạn dùng ubuntu có thể tham khảo tại đây: [Install jenkins on ubuntu](https://medium.com/@narenchejara/jenkins-installation-on-ubuntu-18-04-a18a7d925cf1)
## 2. Create user
Tiếp theo hãy tạo 1 người dùng với role quản trị để đăng nhập và sử dụng Jenkins
![Creae User](https://images.viblo.asia/42a4e477-ad17-4e41-89bb-730de3738c43.PNG)

Sau khi cài đặt xong mình sẽ đi vào công việc chính là tạo job build project.
## 4. Create new Job
Đầu tiên, bạn click vào nút New Item để tạo new job
![Create new job](https://images.viblo.asia/913c3c86-111d-43dd-873a-7f66b43cddd0.PNG)

Sau đó nhập tên job mà bạn muốn khởi tạo và chọn freestyle project, đây là kiểu linh hoạt nhất 
![Create new job](https://images.viblo.asia/981bc6c2-b635-4369-9131-7054ba076bc8.PNG)

## 5. Config source github
Kế tiếp, đến phần config source github cho job.
![Config repository](https://images.viblo.asia/34d169f9-5ca7-4c78-bfbb-5615c7c9edbd.PNG)

Và config credentials để pull code.
![Config source and authority](https://images.viblo.asia/070f7451-c0e3-496e-96bd-8d0d073b04cc.PNG)

Config thời điểm job của bạn sẽ được kích hoạt. 

Ví dụ: Tạo schedule cứ 15 phút sẽ thăm dò git repo, nếu có gì thay đổi sẽ tự động build tạo 1 bản build.
![Build Trigger](https://images.viblo.asia/6cc804a8-fdd0-405c-bca5-74081aa6aa5b.PNG)

## 7. Build source
Để build job cùng source git vừa config, bạn click vào nút Build Now để job bắt đầu chạy. Khi build xong, job sẽ được liệt kê tại mục Build History.
![Build source](https://images.viblo.asia/d7e5d828-6437-4c8e-8688-2b0c9ffcbdda.PNG)

## 9. View Log
Để view log run job, bạn click vào Console Output để xem.
![View log](https://images.viblo.asia/ded4a4f3-1434-4caa-83c3-c4c7328b406e.PNG)

## 10. Kết
Như vậy mình đã hướng dẫn xong cách cài đặt jenkin và tạo job clone repository từ github, bài viết mình đã đính kèm hình ảnh các bước làm khá chi tiết, hy vọng các bạn sẽ làm thành công nhé!
Cảm ơn các bạn đã theo dõi bài viết của mình.

See you!

### Tham khảo
1. [https://www.vogella.com/tutorials/Jenkins/article.html](https://www.vogella.com/tutorials/Jenkins/article.html)
2. [https://mohitgoyal.co/2017/02/22/build-github-project-using-jenkins/](https://mohitgoyal.co/2017/02/22/build-github-project-using-jenkins/)
3. [https://subscription.packtpub.com/book/application_development/9781783553471/2/ch02lvl1sec23/creating-a-new-build-job-in-jenkins-with-git](https://subscription.packtpub.com/book/application_development/9781783553471/2/ch02lvl1sec23/creating-a-new-build-job-in-jenkins-with-git)