Theo wikipedia thì: 
> Jenkins is a free and open source automation server. It helps automate the parts of software development related to building, testing, and deploying, facilitating continuous integration and continuous delivery.

Jenkins hỗ trợ chúng ta có thể làm việc được với khá nhiều "version control tools" như:  CVS, Subversion, Git, Mercurial. 
Đối với các dự án IOS/MacOS cần deliver cho QA theo từng pull request thì việc dev chờ pull request được merge, sau đó tự vào kéo code để build cho QA đôi khi cũng sẽ khiến dev bị nhàm chán, hoặc có thể dev đang bận một task khác. 
Trong bài viết này mình sẽ cùng tìm hiểu và thiết lập Jenkins server để tự động check sự thay đổi của 1 branch và thực hiện build app và deliver cho QA.

### Cài đặt Jenkins
Đầu tiên, để cài đặt Jenkins thì chúng ta sẽ cần phải cài đặt homebrew.
Tiếp theo, chúng ta cần cài đặt Java
```
brew cask install homebrew/cask-versions/java8
```
Sau khi đã cài đặt homebrew và Java xong thì chúng ta sẽ tiến hành cài đặt Jenkins bằng cú pháp như sau:
```
brew install jenkins-lts
```
Sau khi đã hoàn thành cài đặt Jenkins, để start server thì chúng ta sẽ chạy câu lệnh sau trong terminal:
```
 brew services start jenkins-lts
```
Khi câu lệnh hoàn thành, chúng ta sẽ có thể truy cập vào server jenkins thông qua localhost:
```
http://localhost:8080/
```

### Cài đặt user
Khi lần đầu cài đặt và truy cập vào Jenkins server, chúng ta sẽ cần phải unlock Jenkins. Lúc này sẽ xuất hiện màn hình như dưới đây:
![](https://images.viblo.asia/bb607b8c-aff3-4fd7-b85a-e6b371a3a743.png)
Lúc này chúng ta chỉ cần mở vào đường dẫn hiện trên màn hình, sau đó copy password vào và chúng ta sẽ hoàn thành việc Unlock Jenkins.
Tiếp theo, chúng ta sẽ cần cài đặt các plugin, quá trình này có thể mất một lúc. Ở đây chúng ta sẽ chọn **Install suggested plugins**
![](https://images.viblo.asia/76577c82-1a6e-4dd6-81f0-1eb6d39344fd.png)
Chờ cho tới khi quá trình cài đặt plugin này hoàn tất.
![](https://images.viblo.asia/bf38da43-41f4-4a45-b14e-56f474597240.png)
Sau khi đã hoàn thành cài đặt plugin cho Jenkins server, chúng ta sẽ được chuyển đến một màn hình để tạo ra admin account, chúng ta sẽ tiến hành điền các thông tin như sau:
![](https://images.viblo.asia/400d738a-7ed3-400a-8a46-a9b8c0873e54.png)
Sau khi setup admin account xong, chúng ta sẽ có một UI tương tự như dưới đây:
![](https://images.viblo.asia/edda77b4-c608-4513-9870-eb0a56196afd.png)
### Tạo job
Ở đây, mình sẽ tạo một job cho việc lắng nghe sự thay đổi của một branch.
Để tạo 1 job mới thì hãy nhìn vào menu bên trái, chọn **New Item**
![](https://images.viblo.asia/5792c90e-e08d-46fc-bfcd-6c66141854a0.png)
Tại bươc này, chúng ta sẽ đặt tên cho Job, ở đây mình đặt tên là **IOS** và chọn type cho nó là: **Freestyle project**
Việc chúng ta chọn **Freestyle project** sẽ giúp chúng ta có nhiều tùy chọn hơn trong việc thiết lập job 
### Cài đặt job
#### Step 1: Cài đặt github project
Ở đây, đầu tiên tại phần General, mình sử dụng Github project, nên mình sẽ chọn Github project và setup như dưới đây. Ở đây sẽ có sự thay đổi nếu như bạn cài đặt plugin khác.
![](https://images.viblo.asia/c6a4123d-f7f5-466f-b12f-b397a6fb3f11.png)
Chúng ta sẽ cần nhập Github project url vào đây.
#### Step 2: Cài đặt Source Code Management
Ở phần này chúng ta chọn Git và thêm thông tin như sau:
![](https://images.viblo.asia/218f0db2-6656-402b-b5dd-b8ec6d32d4b3.png)
Lưu ý: ở mục creadentials này chúng ta có thể có nhiều cách để giúp Jenkins có thể kéo code từ github project về. Ở đây mình sử dụng SSH Keys.
![](https://images.viblo.asia/98a788f3-b733-4448-a00a-83f6434f2d0e.png)
Tại **Branches to build**, mình sẽ lắng nghe sự thay đổi code của branch develop, nên mình sẽ sửa mặc định từ "master" sang "develop"
#### Step 3: Cài đặt Build Trigger
Ở bước này mình sẽ chọn **Poll SCM**  và gán value cho Schedule là 5 dấu *:  "* * * * *"
> Poll SCM" polls the SCM periodically for checking if any changes/ new commits were made and shall build the project if any new commits were pushed since the last build

![](https://images.viblo.asia/0bdfc001-04b0-475d-9666-17e6f5f01e7b.png)
* 5 dấu * này được hiểu là nó sẽ kiểm tra sự thay đổi mỗi phút
Các bạn hoàn toàn có thể thay đổi schedule này nếu muốn. Chi tiết các bạn có thể xem phần giải thích trong link này: [Jenkins schedule format](https://stackoverflow.com/questions/12472645/how-do-i-schedule-jobs-in-jenkins#:~:text=By%20setting%20the%20schedule%20period,one%20hour%20(0%2D59))
#### Thiết lập build
Ở bước này, vì là build dưới local server, và với xcode project thì chúng ta có thể sử dụng command line tool hoặc các tool khác hỗ trợ build và deploy project.
Mình sẽ thực hiện Add build step -> Execute shell
![](https://images.viblo.asia/0f7f2adb-3d29-4879-8cf6-0ad112630883.png)
Ở bước này đây chỉ là ví dụ nên mình chỉ thực hiện in ra danh sách các thư mục trong project. Để build Xcode project thì các bạn có thể sử dụng Xcode Command Line Tool hoặc Fastlane.
Sau khi setup xong, bấm Save và chúng ta tiến hành tạo pull request -> merge vào branch mà chúng ta đã setup ở Step 2.
### Kết quả
Sau khi pull request được merge vào branch develop thì Jenkins sẽ tự động kiểm tra và thực hiện các step mà chúng ta config trong mục **Thiết lập build** ở phía trên. Tại console log của Build job detail. Kết quả mình nhận được như sau:
![](https://images.viblo.asia/792d6f97-85a5-4d2c-a72a-a0170a325918.png)

### Kết thúc
Các bạn hoàn toàn có thể thiết lập 1 luồng thực hiện build app -> deliver QA -> gửi thông báo lên chatwork/slack tại mục thiết lập Build -> Execute shell
Mình hiện đang tích hợp Jenkins chạy các câu lệnh của fastlane để thực hiện 1 luồng này được, nếu các bạn muốn thức có thể liên hệ mình hoặc tìm hiểu về Fastlane tool tại [đây](https://docs.fastlane.tools/)