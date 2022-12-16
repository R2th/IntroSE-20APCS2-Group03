Cũng như tiêu đề, trong bài viết này, chúng ta sẽ đề cập đến dịch vụ build docker container tự động của Docker Hub
*The Docker Hub provides an auto-build mechanism which can build your images as soon as you commit code to a Github or Bitbucket repo.*

Docker hiện tại đang nhận được rất nhiều sự chú ý, và hiện tại đa số cá dự án mà mình đã tham gia đều chuyển qua dùng docker
Trong quá trình làm việc thì cũng phát sinh một số vấn đề về việc deploy từ docker image, toàn phải tự build bằng tay, cho nên hôm nay mình sẽ giới thiệu đến các bạn 1 dịch vụ rất hữu ích của Docker Hub đó là Automated Build service

Chúng ta cùng bắt đầu luôn :D

Bước 1
Đầu tiên thì chúng ta cần chọn menu create automated build
![](https://images.viblo.asia/9f07d7af-15b4-44c8-ac62-b6489d0a6116.png)

Bước 2
Bạn cần chọn repository trên account của mình, ở đây thì chúng ta sẽ chọn Github
![](https://images.viblo.asia/70e92064-b737-44ee-a92a-541aa02041b6.png)

Bước 3
Chọn repository cần để build image
![](https://images.viblo.asia/03fdd784-1b7b-4003-b167-5be7fde92787.png)

Bước 4
Cập nhật description, càng chi tiết càng tốt :D
![](https://images.viblo.asia/7ff9132e-032f-405f-85b6-341ad2156225.png)

Bước 5
Sau khi cập nhật thành công
![](https://images.viblo.asia/c35d08c3-87ed-49d2-8647-8066599e4609.png)

Bước 6
Ở đây thì chúng ta cần config location của Dockerfile để service biết ở đâu mà tìm đến để build, mặc định thì là root folder của dự án
Bạn có thể chọn deploy theo brand hay tag tùy thuộc vào flows của dự án
![](https://images.viblo.asia/9610016e-0cf5-4072-ad56-fd40934e6aa5.png)

Kết quả
Và đây là kết quả
![](https://images.viblo.asia/93b3fe4e-3f16-4a1b-8bc8-a10ce6c76380.png)

Ngoài ra thì các bạn có thể  thêm web hooks để
![](https://images.viblo.asia/4886372c-06f6-4ccc-892a-4ed03d534035.png)
* Đẩy thông báo đến slack
* Deploy với image mới
* ...

Cảm ơn các bạn đã đọc bài viết của mình, happy coding!