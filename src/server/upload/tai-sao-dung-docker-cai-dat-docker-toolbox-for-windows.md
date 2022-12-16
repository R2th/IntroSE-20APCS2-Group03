Trước đây Docker chỉ dành riêng cho Linux nhưng vài năm trở lại đây Docker cho Windows dần phổ biến hơn do cộng đồng developers phát triển ngày càng mạnh. Từ đó việc develop trên các hệ điều hành khác nhau trở nên là một chuyện quá bình thường.
Vì vậy để đáp ứng nhu cầu sử dụng của đông đảo nhân dân lập trình viên thì không chỉ riêng Linux mà Windows cũng dần đang có nhiều nền tảng, công cụ để hỗ trợ các anh em phát triển lập trình.

## Tại sao phải dùng Docker?
Mình nói ngắn gọn, dễ hiểu thôi nhé. Nếu bạn muốn setup và deploy một app lên server thì bạn cần phải cài đặt các môi trường cho ứng dụng của bạn, vd: bạn đang viết ứng dụng bằng Laravel thì muốn deploy bạn phải cài PHP, Laravel, MySQL, composer... các kiểu. Và nếu muốn deploy lên các server khác nhau (server chạy Linux, Centos, ARM..) thì mỗi server bạn phải cài đặt các môi tường một cách khác nhau, các version khác nhau cũng có thể phải cài đặt môi trường để hỗ trợ một cách riêng biệt, không có cái nào giống cái nào và đôi khi lỗi tè le, từa lưa nữa.

Thì khi đó việc sử dụng Docker sẽ cứu rỗi cuộc đời bạn. Việc của bạn chỉ cần cài Docker và đúng là mỗi server sẽ phù hợp với một phiên bản Docker nhưng không vấn đề, bạn chỉ cần cài Docker tương thích với server đó và chỉ mỗi Docker mà thôi, ví dụ một ứng dụng chạy trên Windows chúng ta sẽ có Docker trên Windows và chạy trên Linux sẽ có Docker cho Linux.

Và tiếp theo là bạn cần cài các môi tường phát triển ứng dụng của bạn trong Docker, mô hình hoạt động của nó tương tự một máy ảo nhưng không giống như máy ảo Docker start và stop chỉ trong vài giây.
Docker cho phép chúng ta deploy và run application với container. Chúng ta có thể tạo các môi trường độc lập và tách biệt để khởi chạy và phát triển ứng dụng, môi trường này được gọi là container. Khi cần deploy lên bất kỳ server nào chỉ cần run container của Docker thì application của bạn sẽ được khởi chạy ngay lập tức. Quá sướng ròi còn gì :smile:

Tóm lại là ủy quyền việc thích nghi môi trường cho Docker lo còn lại chúng ta chỉ cần đóng gói toàn bộ đồ đạc lại thành 1 bộ duy nhất và mang đi bất cứ đâu mà chúng ta muốn.

## Cài đặt Docker Toolbox
Đầu tiên muốn cài docker trên windows ta phải sử dụng máy ảo hoặc dùng docker toolbox để cài đặt docker.

Tuy nhiên kể từ phiên bản Windows 10 64bit Pro, **Enterprise** and Education (1607 Anniversary Update, Build 14393 or later) chúng ta có thể cài đặt docker một cách dễ dàng như các phần mềm khác. Nhưng mà ở đây mình đang nói đên Docker Toolbox, Windows 10 64bit Pro Enterprise không có tiền xài :))

Cài đặt Docker ToolBox sẽ bào gồm:
* Docker Client for Windows
* Docker Toolbox management tool and ISO
* Oracle VM VirtualBox
* Git MSYS-git UNIX tools

Nếu bạn đã cài đặt sẵn Oracle VM VirtualBox thì bạn có thể bỏ chọn khi được hỏi trong quá trình cài đặt. Và nếu VM VirtualBox của bạn đang chạy thì bạn phải Shutdown trước khi cài đặt nhé. Docker sau khi cài đặt nó mặc định lưu data của Docker trong ổ đĩa C. Có một số bài hướng dẫn không nên chạy Docker Toolbox ngay sau khi cài đặt xong mà phải thiết lập biến môi trường để lưu data Docker sang ổ đĩa khác cho nhẹ nhàng hơn nhưng mình chưa thay đổi được nên không giới thiệu ở đây nhé.

*Link dowload:*  [Install Docker Toolbox](https://github.com/docker/toolbox/releases)  kéo xuống và dowload file **.exe** như hình dưới nhé

![](https://images.viblo.asia/6a4b386e-2cc3-432f-b6d7-d4f62102341c.png)

## Start with Docker
*Windows -> Docker Quickstart Terminal*

![](https://images.viblo.asia/b4baf685-ebef-49dc-89b7-a4ccaa6a2008.png)
Nếu hiển thị kết quả như thế này là ok rồi nhé!!!

**Kiểm tra máy ảo đã chạy chưa:**

`docker-machine status` -> Running

**List các images có sẵn ở local**

`docker images` vì chúng ta mới cài đặt docker nên hiện tai chưa có image nào cả

**Docker image** là một bộ các mã nguồn đã đóng gói, các depedencies (ví dụ là các packages chúng ta sử dụng khi lập trình) và đóng gói luôn cả các cấu hình cũng như môi trường chạy. Chúng ta đó thể tự đóng gói mã nguồn của mình và tạo ra 1 image hoặc sử dụng lại các images đã có sẵn trên [Dockerhub](https://hub.docker.com/) (nơi lưu trữ những images của cộng đồng các developers tài phiệt :grinning: )

**List các containers**

```
docker ps
docker ps -a #Liệt kê các container đã tắt
```
Tương tự cũng chưa có container nào

**Docker Container** giống như là môi trường bao bọc bên ngoài để ta chạy các docker images, mỗi docker container là một gói bao bọc 1 docker image để đảm bảo image chạy độc lập cới môi trường xung quanh. Bởi vậy khi ta run 1 image sẽ thấy sinh ra 1 docker container.

**Chạy 1 container từ image**

Bây giờ ta tiến hành chạy 1 container từ images hello-world. Đây là images cơ bản và huyền thoại trong tất cả các ngôn ngữ lập trình. được dùng để chạy kiểm tra sau khi cài đặt docker:

`docker run -it hello-world`

Vì ở trong local của mình chưa có images hello-world nên nó sẽ pull images này từ registry của docker về trước rồi sau đó mới tạo một container từ image này để chạy.

![](https://images.viblo.asia/d6f44799-6af1-4533-8dc2-d9df7b800a3a.png)

Thành công với helloworld rồi nhé :)

Sau khi pull image về các bạn thể chạy lại lệnh docker images và docker ps -a để kiểm tra các bản images và container (vì cointainer chưa được start nên phải dùng -a vào nhé).
Kết quả như sau:

![](https://images.viblo.asia/e6b4b145-d32d-4fe0-9c1f-3a2b90983152.png)

To be continue...