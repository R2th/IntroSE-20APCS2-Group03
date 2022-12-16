<div align="center">

# Lời mở đầu
</div>

Chào mọi người, đến hẹn là mình lại ngoi lên đây. Mình xin phép delay series [Laravel](https://viblo.asia/s/nhung-dieu-can-tim-hieu-khi-bat-dau-lam-project-php-laravel-Wj53OmjP56m) và [VueJS](https://viblo.asia/s/cung-hoc-vuejs-tu-con-so-0-L6lAyeBrlek) để đến với một chủ để cực kì hữu dụng nhưng cũng cực kì khoai. Đó chính là [Docker](https://viblo.asia/tags/docker).

Trước kia khi làm project nhỏ để tự học thì mình cũng chỉ "hóng hớt" được là nó `magic` lắm, chỉ cần chạy lệnh lên cái là nó đã xây dựng hết môi trường làm việc cho project của mình rồi, không cần phải lo cài từng dependency lẻ tẻ nữa. Nghe thì vi diệu đấy nhưng mà khi đó làm một mình nên mình cũng chưa có điều kiện để học cũng như sử dụng **Docker**.
<br>
<br>
Còn giờ thì mình đã và đang trực tiếp sử dụng docker rồi nhưng mà cũng chỉ dừng lại ở mức cơ bản. Chính vì thế mà mình muốn tìm hiểu kĩ hơn về nó và cũng là để chia sẻ cho những ai đang có nhu cầu tìm hiểu về công nghệ này!

Chúng ta bắt đầu thôi nào!

<div align="center">
    
# Nội dung
## Docker là gì?
</div>

Từ ngày xưa đi học bất cứ thứ gì, thứ đầu tiên chúng ta phải học chính là định nghĩa. Bạn chắc chắn không thể học những thứ cao siêu khi mà cả định nghĩa mà bạn cũng không nắm được. Vì vậy hãy tìm hiểu xem **Docker** là gì nhé!

- Theo như định nghĩa trên trang chủ thì **Docker** là một nền tảng mở để phát triển và chạy ứng dụng. Docker cho phép người dùng tách rời ứng dụng ra khỏi phần cứng. Giúp giảm thiểu đáng kể thời gian chậm trễ giữa quá trình viết code và chạy nó trên môi trường thật.

> Blockquotes
Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production.

<br>
<br>
   => định nghĩa thì lằng nhằng như thế, nhưng nói 1 cách dễ hiểu thì **Docker** giúp tạo ra 1 môi trường nhất quán cho các developer làm việc khi làm chung một dự án. Từ đó bạn sẽ tránh được trường hợp project chạy trên máy này thì lỗi, nhưng sang máy khác thì không (trường hợp này chắc không xa lạ gì nữa nhỉ).


- Nếu như các bạn đã hiểu rồi thì trong đầu bạn sẽ có một câu hỏi: Thế hóa ra nó giống với máy ảo à? (nỗi ám ảnh với **VMWare** hay **VirtualBox** lại ùa về vì nó nặng kinh khủng khiếp đối với 1 cái laptop sinh viên) 
- Câu trả lời là đúng mà cũng không đúng.
    - **Đúng** ở chỗ **Docker** cũng cho phép bạn ảo hóa một môi trường và cho phép ứng dụng của bạn chạy trên môi trường đó.
    - **Không đúng** ở cách mà nó ảo hóa khác hẳn với 2 ứng dụng kia (gọi chung là **Hypervisors**)
    
<div align="center">
    
### Vậy Docker và Hypervisors khác gì nhau? 
</div>



![](https://images.viblo.asia/310fa741-66d4-452e-b5ca-3753cdbe044f.png)

<div align="center">
    Hình ảnh so sánh sự khác nhau giữa Docker và Hypervisor
</div>

   
- **Docker**: sử dụng chung kernel với HostOS thay vì phải tạo ra các GuestOS khác nhau, vì vậy tốc độ được cải thiện rất nhiều so với **hypervisors** (rõ ràng nhất là khi chạy nhiều containers so với chạy nhiều máy ảo), từ đó mang lại tính khả thi cao cho những dự án cần sự mở rộng nhanh.
<br>
<br>
- **Hypervisors**: thực hiện ảo hỏa nằm ở tầng Hardware (phần cứng), tức là mô phỏng phần cứng và chạy những OS con trên phần cứng đó. Như trong hình ảnh trên, Hypervisors có thêm một Guest OS cho nên sẽ tốn tài nguyên hơn và làm chậm máy thật khi sử dụng. Bạn nào hồi đi học có sử dụng VMWare chắc cũng biết, bật được con máy ảo VMWare lên đã khổ, dùng nó còn khổ hơn.
<hr>

<div align="center">
    
## Một số khái niệm cơ bản
</div>

Mình tin rằng sau những gì đã viết ở trên, mình đã có thể thuyết phục các bạn bắt tay vào sử dụng 
**Docker** rồi phải không (nhiều ưu điểm thế cơ mà).

Muốn sử dụng được Docker thì trước hết các bạn phải cài đặt docker. (hiển nhiên quá mà ^^) **Docker** cung cấp 2 phiên bản là:
- **CE (Community Edition)**: phù hợp cho đối tượng là các developer hay những nhóm nhỏ muốn bắt đầu trải nghiệm **Docker**. Các bạn có thể làm theo các bước ở [**đây**](https://docs.docker.com/install/) để cài đặt. 
- **EE (Enterprise Edition)**: là phiên bản **Docker CE** có chứng nhận đối với một vài hệ thống và được hỗ trợ bởi các doanh nghiệp lớn như IBM, Microsoft, Alibaba, Canonical, Docker Inc, ... Và tất nhiên là nó không miễn phí. Nếu muốn bạn vẫn có thể sử dụng bản dùng thử [**này**](https://docs.docker.com/install/linux/docker-ee/ubuntu/#system-requirements).

Nhưng mà trên đời không có gì là ***ngon, bổ, rẻ*** cả. Phần trên mình đã nêu ra những cái ***ngon, bổ*** cho các bạn rồi, giờ thì sẽ đến phần ***xương*** này. 

<div align="center">
    
### Dockerfile
</div>

- **Dockerfile** là một tài liệu dạng văn bản chứa tất cả các câu lệnh mà người dùng muốn gọi đến ở trong giao diện **command-line**. Và từ **Dockerfile** này, chỉ với 1 câu lệnh `docker build` là Docker sẽ tự động xây dựng nên một **Docker image** (kéo xuống dưới sẽ biết nó là gì).
- Vậy bên trong dockerfile có gì mà nó lại có thể làm được như vậy? Hãy cùng tìm hiểu nhé
    - **FROM**: khai báo xem image sắp khởi tạo sẽ được xây dừng từ image gốc nào. Và bạn thắc mắc không biết image gốc này lấy ở đâu? Làm sao biết image mình khai báo có hay không? Thì [**Docker hub**](https://hub.docker.com/) chính là câu trả lời cho bạn.
        ```bash
        FROM <image>[:<tag>] [AS <name>]
        ```
    - **LABEL**: là một/nhiều cặp key-value để thêm metadata vào cho image ví dụ như là version, description, ... 
        ```bash
        LABEL <key>=<value> <key>=<value> <key>=<value> ...
        ```
    - **RUN**: ở đây sẽ thực thi các câu lệnh được liệt kê ra và kết quả thu được sẽ được dùng cho bước tiếp theo trong Docker file. Có 2 dạng để viết RUN, các bạn có thể tùy chọn.
        - Shell form: 
            ```bash
            RUN <command>
            ```
        - Exec form:
            ```bash
            RUN ["executable", "param1", "param2"]
            ```
    - **CMD**: trong 1 dockerfile chỉ có thể có 1 phần CMD mà thôi. Nếu bạn viết nhiều hơn thì nó sẽ chỉ chạy theo phần CMD cuối cùng. Mục đích của CMD là cung cấp cà thiết lập mặc định để execute **Docker container**(đoạn sau sẽ rõ nó là gì). Có 3 dạng để viết CMD:
        - Shell form: 
            ```bash
            CMD command param1 param2
            ```
        - Exec form (cách này được sử dụng nhiều nhất) 
            ```bash
            CMD ["executable","param1","param2"]
            ```
        - Coi như tham số mặc định cho [ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint)
            ```bash
            CMD ["param1","param2"]
            ```
    - **MAINTAINER**: phần này hiện tại đã được chuyển về như một trường ở trong phần **LABEL**! Nó chứa thông tin của tác gỉa, người đã viết ra image này!
        ```bash
        LABEL maintainer="lovelqd@gmail.com"
        ```
        <br>
        ...

        Còn nhiều options lắm, nếu muốn tìm hiểu thêm thì các bạn vào [**đây**](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) nhé!

<div align="center">
    
### Docker image
</div>

- Theo như định nghĩa trên trang chủ thì: `Docker images là cơ sở của containers. Một Image là một tập hợp các lệnh và các tham số thực thi tương ứng sử dụng trong thời gian container đang chạy. Một Image thường chứa một loạt các tập tin hệ thống xếp lớp chồng lên nhau. Một Image sẽ không bao giờ bị thay đổi.` 

    => (dưới đây là đoạn gốc, mình dịch ra có hơi ngu 1 tí thì mọi người bỏ qua cho nhé)

> Docker images are the basis of containers. An Image is an ordered collection of root filesystem changes and the corresponding execution parameters for use within a container runtime. An image typically contains a union of layered filesystems stacked on top of each other. An image does not have state and it never changes.

- Còn theo mình hiểu đơn giản thì **Image** giống như một bản GHOST khi bạn muốn cài cài lại hệ điều hành vậy. Trong bản GHOST thường chứa hệ điều hành và các app cần thiết thì **Image** cũng vậy, nó cũng có thể chứa hệ điều hành và web app. 
- Đặc biệt, **Image** là file chỉ cho phép đọc, tức là chỉ có thể sử dụng, không thể thay đổi, nếu muốn thay đổi thì phải tạo một **Image** khác.
- Và cũng giống như các bản GHOST có thể download trên mạng của người khác, chúng ta cũng có thể download các Image có sẵn từ [**Docker hub**](https://hub.docker.com/) để sử dụng.


<div align="center">
    
### Docker container
</div>

- Như ở trên mình có nói Docker Image giống như mọt bản GHOST. Khi chạy xong GHOST bạn sẽ thu được hệ điều hành với một số driver, ứng dụng nhất định thì khi bạn chạy Docker Image xong sẽ thu được **Docker Container**.
- Bên trong Docker Container có tất cả những thứ chúng ta cần để chạy một ứng dụng (mà cụ thể là project mà chúng ta đang làm chung với team), gồm có:
    - Docker Image
    - Một môi trường để thực thi ứng dụng
    - Một bộ hướng dẫn tiêu chuẩn (từ gốc của nó là `standard set of instructions`)
    
    => nhờ đó giảm thiểu được thời gian cài đặt môi trường cho một project.
- Một Docker Container có thể có các trạng thái **run**, **started**, **stopped**, **moved**, **deleted**. Và sau đây là 1 số câu lệnh thường xuyên sử dụng khi **DÙNG** container (hãy nhớ đây chỉ là dùng, còn làm thì còn rất nhiều):
    ```bash
    1.    docker container ls	              #liệt kê danh sách container
    2.    docker container restart            #khởi động lại container
    3.    docker container start              #bắt đầu chạy container
    4.    docker container stop               #đóng container đang chạy
    5.    docker container kill	              #'kill' container đang chạy (kiểu ép nó dừng ngay lập tức)
    6.    docker container top	              #hiển thị những quy trình đang chạy của container
    7.    docker container port	              #liệt kê danh sách cổng mà các container đang sử dụng
    ```
- Đặc biệt, đúng như cái tên của nó là container, những yếu tố liên quan đến môi trường máy thật của bạn sẽ không thể làm ảnh hưởng tới bên trong Container, và những gì cài đặt bên trong container cũng không làm ảnh hưởng đến hệ thống trên máy thật của bạn!

    => chính nhờ vậy mà khi làm việc trên docker, môi trường làm việc của mọi người là giống hệt nhau, sẽ không còn trường hợp bug ở trên máy này nhưng lại không tái hiện được ở trên máy kia. 
<hr>

- Bên trên là 3 khái niệm gần như là cơ bản nhất của **Docker**. Bạn phải phân biệt rõ ràng nó để có thể tiếp tục tìm hiểu kĩ hơn về Docker nhé:
    - **Dockerfile** để build ra **Docker Image** bằng câu lệnh `docker image build [OPTIONS] PATH | URL | -`
    - **Docker Image** run để ra **Docker Container** bằng lệnh `docker container start`
         

![](https://images.viblo.asia/1deb5b15-9ecb-4289-8a8d-ceb7668f3760.png)

<div align="center">
    Mối quan hệ giữa Docker file- Docker Image- Docker Container
</div>

    
<div align="center">
    
# Lời kết
</div>

Mong rằng qua bài viết này, nhiều bạn chưa biết đến **Docker** có thể tự tin/mạnh mẽ tìm hiểu về nó. 

Dù chắc chắn ban đầu sẽ cảm thấy rất khó khăn, nhưng tin mình đi, sau khi vượt qua khó khăn ấy, quả ngọt thu về chắc chắn sẽ làm thỏa mãn các bạn.

Docker khá là nhiều kiến thức nên chắc là mình sẽ làm 1 series riêng cho Docker, nhưng mà hiện tại mới chỉ có 1 bài nên để bao giờ viết được nhiều nhiều thì mình tổng hợp thành series sau vậy.

Tạm biệt và hẹn gặp lại các bạn trong các bài viết sau nhé!

<div align="center">
    
# Tài liệu tham khảo
</div>

Document Docker: https://docs.docker.com/ <br>
Docker tags in Viblo: https://viblo.asia/tags/docker