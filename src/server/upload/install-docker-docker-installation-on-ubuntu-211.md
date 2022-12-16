Trong blog này, tôi sẽ hướng dẫn bạn quá trình cài đặt Docker theo các bước đơn giản. Trong trường hợp bạn chưa quen với Docker, bạn có thể đọc lại [bài viết này](https://viblo.asia/p/docker-explained-an-introductory-guide-to-docker-19-RQqKLbJbl7z). Cài đặt docker khá đơn giản, bạn chỉ cần chạy một vài lệnh là xong! 

### 1. Cài đặt Docker trên Ubuntu
**Bước 1**: Để cài đặt docker trên Ubuntu, trước tiên hãy cập nhật các gói.
> sudo apt-get update

Điều này sẽ yêu cầu mật khẩu. Tham khảo ảnh chụp màn hình bên dưới để hiểu rõ hơn.
![](https://images.viblo.asia/5c032c75-cbe7-47f5-902f-67f5479ed684.png)

**Bước 2:** Bây giờ trước khi cài đặt docker, tôi cần cài đặt các gói được đề xuất. Đối với điều đó, chỉ cần nhập lệnh dưới đây:
> sudo apt-get install linux-image-extra-$(uname -r) linux-image-extra-virtual

Nhấn “y” để tiếp tục. 
![](https://images.viblo.asia/b3599f51-d086-4809-a0ef-2d35ab0919de.png)
Sau bước này, chúng ta đã hoàn thành các điều kiện tiên quyết! Bây giờ, hãy tiếp tục và cài đặt Docker.

**Bước 3:**  Nhập lệnh dưới đây để cài đặt công cụ docker:
> sudo apt-get install docker-engine

Đôi khi nó sẽ hỏi lại mật khẩu. Nhấn enter và quá trình cài đặt sẽ bắt đầu.
![](https://images.viblo.asia/734d2930-ff5f-4da6-a9d3-a96dcecdff95.png)

Một trong những điều này được thực hiện, nhiệm vụ của bạn để cài đặt docker sẽ hoàn thành!

**Bước 4:** Vì vậy, chúng ta chỉ cần bắt đầu dịch vụ docker. Đối với điều đó, chỉ cần nhập lệnh dưới đây:
> sudo service docker start

![](https://images.viblo.asia/1575f69a-f2f5-45d5-b146-f427d8671d90.png)

Nó cho biết công việc của bạn đang chạy. Xin chúc mừng! docker đã được cài đặt thành công.

**Bước 5:** Bây giờ chỉ để xác minh rằng docker đang chạy thành công, hãy để tôi chỉ cho bạn cách kéo image CentOS từ docker hub và chạy container CentOS. Đối với điều đó, chỉ cần nhập lệnh dưới đây:
> sudo docker pull centos

Đầu tiên, nó sẽ kiểm tra sổ đăng ký cục bộ cho image CentOS. Nếu nó không tìm thấy ở đó, thì nó sẽ đi đến docker hub và kéo image. Tham khảo ảnh chụp màn hình dưới đây để hiểu rõ hơn:
![](https://images.viblo.asia/e28ca2af-9cc6-452b-b280-6637d3122e20.png)

Vậy là chúng ta đã kéo thành công một image centOS từ docker hub. Tiếp theo, chúng ta hãy chạy container CentOS. Đối với điều đó, chỉ cần nhập lệnh dưới đây:
> sudo docker run -it centos

![](https://images.viblo.asia/75b16ec8-45e6-4a01-bf6f-db6cadd37c9a.png)

Như bạn có thể thấy trong ảnh chụp màn hình ở trên, chúng ta hiện đang ở trong container CentOS!

Tóm lại, chúng tôi đã cài đặt docker đầu tiên trên Ubuntu, sau đó chúng tôi đã kéo một image CentOS từ docker hub và sử dụng image đó, chúng tôi đã tạo thành công một container CentOS. Để biết thêm về các container docker và cách nó hoạt động, bạn có thể tham khảo blog này trên [Docker Container](https://www.edureka.co/blog/docker-container/).

Nguồn: [Edureka](https://www.edureka.co/blog/install-docker/)