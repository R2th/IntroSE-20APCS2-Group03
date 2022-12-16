![](https://images.viblo.asia/f1070d95-ffb9-4e05-8f0a-19a993c30739.png)

Này bạn? Có phải bạn làm một dev mới, còn lạ nước lạ cái và một ngày đẹp trời teamlead hoặc khách hàng yêu cầu bạn "cài app trên docker nhé em", what? docker là cái quái gì thế này? thì bạn đã đến đúng địa chỉ rồi.
Trong bài viết này mình sẽ giải thích một cách dễ hiểu nhất Docker là gì nhé :)

Let's go

Nếu buộc phải giải thích Docker trong một câu ngắn gọn, ta có thể nói Docker là một nền tảng giúp đơn giản hoá quá trình build, run, quản lý, và phân phối app của bạn. Docker làm được điều này vì nó mô phỏng/ ảo hoá hệ điều hành mà nó đang chạy trên.

Phiên bản đầu tiên của docker được phát hành vào năm 2013.

Docker được phát triển sử dụng ngôn ngữ GO.

Bất kì một phát minh nào được sinh ra cũng hướng đến việc giải quyết một vấn đề nào đó.
Vậy chúng ta hãy cùng xem vấn đề, và cách mà Docker giải quyết như thế nào nhé! 

### Vấn đề
Đặt trường hợp, bạn có 3 app khác nhau viết bằng Python, và bạn dự định sẽ cài nó trên một server duy nhất.

Có điều, mỗi app lại sử dụng một version khác nhau của Python, đồng thời các dependencies (là các thư viện, package mà app ứng dụng) giữa các app cũng khác nhau.

Rõ ràng, chúng ta không thể cài nhiều version của Python trên cùng một máy tính (ở đây là server), điều này ngăn cản chúng ta đạt được mục tiêu ban đầu, đó là: cài cả 3 app trên trên cùng một server.

### Hướng giải quyết
#### Phương án 1: Không dùng Docker
Với phương án này, ta có thể setup 3 server - mỗi server sẽ run một app Python kia; hoặc setup 1 server đủ khoẻ để host và run 1 lúc 3 virtual machine (máy ảo) - mỗi máy áo sẽ run một app Python kia.
Như vậy ta có thể cài các version nhau của Python - mỗi máy một version cùng với các package và thư viện đi cùng với các version đó. 

Với phương án này, giá thành để sắm sửa thiết bị và maintain (duy trì, bảo dưỡng) có thể sẽ khá cao.

#### Phương án 2: Sử dụng Docker
Cùng xem Docker giải quyết bài toán này triệt để và lợi chi phí như thế nào nhé. 

Để hiểu được điều này, trước tiên chúng ta cần nắm nguyên lý hoạt động của Docker.

Server hay máy tính mà Docker được install và running trên nó, ta gọi nó là Docker Host, hay đơn giản là Host.

Mỗi khi bạn deploy một app nào đó lên host, host sẽ tạo một logical entity (một thực thể logic) trên host để run chứa app của bạn.
Trong Docker, ta gọi *logical entity* này là Docker Container, hay có thể gọi tắt là Container.

![](https://images.viblo.asia/86eddca4-b661-4bb4-8cb8-6cf4a9d907a1.png)

Khác với VMWare (một virtual machine), Docker Container không có một hệ điều hành nào chạy trong nó cả. Nhưng nó kế thừa từ hệ điều hành (HĐH của host) các process table, network interfaces và file system mount points.
Trong khi tài nguyên kernel (lõi) của hệ điều hành được chia đến tất cả các Container theo nhu cầu sử dụng.

Điều này cho phép các Container độc lập với nhau khi ở trên cùng một Host. Chính vì thế mà các Container với các app khác nhau có yêu cầu, dependencies khác nhau có thể cùng chạy song song trên một host duy nhất với điều kiện các app này yêu cầu cùng một loại hệ điều hành. 

Tóm gọn, khác với Virtual machine, Docker mô phỏng/ ảo hoá hệ điều hành của host, hơn là ảo hoá phần cứng của host - cách mà Virtual machine làm

## Ưu và nhược khi sử dụng Docker
### Ưu điểm
* Docker hỗ trợ rất nhiều app khác nhau với các yêu cầu và dependencies khác nhau, cho phép chúng cùng chạy trên một host, với điều kiện là các app yêu cầu cùng 1 hệ điều hành 
* Tối ưu hoá lưu trữ. Rất nhiều app có thể cùng được chứa tại cùng một host, và size của Container cũng rất nhỏ, chỉ vài MB.
* Container không chứa cả 1 hệ điều hành trong nó, đồng nghĩa với việc nó chỉ tiêu tốn rất ít bộ nhớ so với Virtual Machine. và do đó cũng sẽ sẽ giảm được thời gian khởi động container đi rõ rệt, chỉ tiêu tôns vài so với vài phút như trên Virtual Machine.
* Tiết kiệm chi phí. Docker chỉ yêu cầu tài nguyên chạy chính app đó và rất ít tài nguyên cho bản thân Docker, nên bạn sẽ tiết kiệm rất nhiều chi phí setup phần cứng server.

### Nhược điểm
Nếu mỗi app yêu cầu một hệ điều hành khác nhau thì chúng không thể cùng được host trên một Docker Host. Lấy ví dụ ta có 4 apps, 3 app chạy trên nền Linux, 1 app Windows, lúc này 3 apps Linux có thể đươc host trên chung một Docker Host, trong khi cậu WIndows app kia sẽ cần phải được cài trên một Docker Host khác. 

## Cấu tạo của Docker
Docker Engine là phần cốt lõi của Docker, chịu trách nhiệm cho toàn bộ chức năng của nền tảng Docker.

Docker Engine cũng là một phần mềm phát triển trên mô hình client-server, nó gồm có 3 phần

* Server
* REST API
* Client

![](https://images.viblo.asia/c3382564-1e2c-487c-ad84-6a5759a529a8.png)

Server chạy một  daemon (ta có thể hiểu như một service) tên là dockerd. Dockerd phụ trách việc tạo và quản lý *Docker Images*, *Containers*, *Networks* và *Volumes* của nền tảng Docker. 

REST API chỉ ra cách thức mà app giao tiếp với Servers

The Client đơn giản là một giao diện cho phép chúng ta giao tiếp với Docker thông qua dòng lệnh.

### Một vài thuật ngữ trong Docker

Ngoài Docker Containers, **Docker Image** cũng là một khái niệm quan trọng các bạn sẽ tiếp xúc thường xuyên khi làm việc với Docker.

**Docker Image** là một bộ template chứa app của bạn và tất cả các dependencies/ packages mà app yêu cầu.

Còn **Docker Container**, như đã nói ở phần đầu, là một thực thể logic, nói chính xác hơn thì nó thực chất là một thú chạy Docker Image.

Còn **Docker Hub**?
Docker Hub là một kho chứa chính thống, nơi bạn có thể tìm thấy các Docker Images được chia sẻ ở đây.

Docker Hub cũng là một nơi cho phép bạn lưu trữ Docker images của ứng dụng của bạn (nếu bạn muốn). Bạn có thể set nó là public để mọi người có thể tìm kiếm hay private tùy vào mục đích sử dụng.

*Lưu ý*: Free Account trên Dcoker Hub giới hạn chỉ 1 Docker Image set private, nếu bạn có nhiều Image và muốn set chúng private thì phải đăng kí các gói Account trả phí khác.

**Docker Editions**
Docker có 2 phiên bản gồm:
* Community Edition (CE)
* Enterprise Edition (EE)

Community Edition phù hợp cho các cá nhân hay team nhỏ. 

Khi bạn là một team lớn hay một doanh nghiệp cần sự hỗ lâu dài và đảm bảo khi có sự cố xảy ra thì Enterprise Edition chính là sự lưa chọn của bạn.

*Reference: https://medium.freecodecamp.org/docker-simplified-96639a35ff36*