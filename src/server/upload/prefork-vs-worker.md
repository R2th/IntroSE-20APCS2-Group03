worker và prefork, vốn là 2 Multi-Processing Modules (MPMs) phổ biến trên Linux. Ngoài ra hiện nay còn có event (cũng Linux), mpm_winnt (cho Windows), mpmt_os2 (cho OS/2), mpm_netware (cho Netware) và beos (cho BeOS). Các bạn có thể tự tìm hiểu các MPMs khác thông qua google và các tài liệu khác, trong khuôn khổ bài này chúng ta chỉ tìm hiểu về worker và prefork. Cụ thể là tìm hiểu về :

- **Cơ chế hoạt động. Sự khác nhau của worker và prefork.**
- **Trường hợp nào nên dùng worker và ngược lại.**


### 1. Cơ chế hoạt động. Sự khác nhau của worker và prefork.

Process là trạng thái tức thời của một chương trình đang chạy trên máy tính. Nó bao gồm bộ nhớ cần thiết để chạy chương trình và khả năng kiểm soát hiện trạng của bộ xử lý trong quá trình thực thi chương trình. Thread tương tự như quá trình nhưng chỉ bao gồm tiến trình điều khiển. Nhiều thread sử dụng không gian địa chỉ của một quá trình. Có thể hiểu là thread tồn tại trong process.

Chắc các bạn cũng từng nghe nhiều đến khái niệm đa nhiệm (multitasking), có nghĩa là đồng thời tại một thời điểm CPU có thể xử lý được nhiều công việc một lúc. Dĩ nhiên thực ra là không phải đồng thời, chỉ là CPU chuyển qua lại việc thực hiện các công việc một cách quá nhanh mà chúng ta dường như không nhận ra được. Multitasking thường có hai kỹ thuật chính đó là dựa vào process và thread, hay còn gọi là multiprocessing và multithreading.

- **Multiprocessing** : tạo ra nhiều process và cùng xử lý một cách riêng lẽ.
- **Multithreading** : tạo ra nhiều thread trong một process để xử lý, dùng chung bộ nhớ với các thread khác.

Multi-Processing Modules (MPMs) là module cho phép apache xử lý theo kiểu multitasking, mà mỗi tasking ở đây các bạn có thể hiểu là những requests mà apache phải xử lý. Lúc này thì prefork có nghĩa là xử lý theo kiểu multiprocessing, còn worker có nghĩa là xử lý theo kiểu vừa multiprocessing vừa multithreading.



### 2. Trường hợp nào nên dùng worker và ngược lại.

#### A. Sử dụng Prefork
Mỗi request mỗi khi tới apache sẽ được apache đón nhận và tạo ra một child process để xử lý cái request này thông qua hàm fork() (như hình minh họa ở trên).

**Ưu điểm của việc này :**
– Các process được xử lý hoàn toàn một cách độc lập không liên quan gì đến nhau, cho nên nếu một process chế thì các process còn lại vẫn sống và vẫn hoàn thành công việc của nó.
– Vì không sử dụng chung vùng nhớ cho nên các process không quậy phá với nhau được.

**Nhược điểm của việc này :**
– Có vẻ nhược điểm lớn nhất chính là việc tạo ra quá nhiều các process sẽ chiếm dụng lượng RAM lớn.

Nếu bạn sử dụng prefork thì các bạn sẽ cần sử dụng các thông số sau đây (trong file httpd.conf) để config cho prefork.

<IfModule prefork.c><br>
**StartServers 8** # Số process được tạo ra lúc apache start up, nó được gọi là server process. <br>
**MinSpareServers 5** # Số server process tối thiểu được chuẩn bị sẵn. <br>
**MaxSpareServers 20** # Số server process tối đa được chuẩn bị sẵn. <br>
**ServerLimit 256** # Giá trị lớn nhất của MaxClients trong thời gian chạy apache. <br>
**MaxClients 256** # Số server process lớn nhất được chạy. <br>
**MaxRequestsPerChild 4000** # Số lượng request tối đa mà một server process có thể phục vụ.<br>
</IfModule><br>

#### B. Sử dụng worker
Mỗi request tới sẽ được một thread xử lý, mỗi process sẽ chứa một số lượng thread nào đó, nếu vượt quá thì một process mới sẽ được tạo ra để tạo ra tiếp thread để đáp ứng request.

**Ưu điểm của việc này:**
– Tận dụng được dung lượng bộ nhớ RAM, vì các thread sẽ sử dụng chung bộ nhớ RAM.

**Nhược điểm :**
– Nếu một thread có vấn đề hoặc là bị crash thì các thread khác trong process cũng có thể bị crash và process sẽ bị crash theo.
– Các thread có thể sử dụng chung vùng nhớ cho nên có thể gây ảnh hưởng lẫn nhau (dĩ nhiên là có cách khắc phục điều này).
Nếu bạn sử dụng prefork thì các bạn sẽ cần sử dụng các thông số sau đây (trong file httpd.conf) để config cho worker.

<IfModule worker.c><br>
**StartServers 4** #Số process được tạo ra lúc apache start up, nó được gọi là server process.<br>
**MaxClients 300** #Tổng số connections đồng thời sẽ được xử lý.<br>
**MinSpareThreads 25** #Số thread tối thiểu được chuẩn bị sẵn.<br>
**MaxSpareThreads 75** #Số thread tối đa được chuẩn bị sẵn.<br>
**ThreadsPerChild 25** #Số thread có trong một process.<br>
**MaxRequestsPerChild 0** #Tổng số connections đồng thời được server process xử lý.<br>
</IfModule><br>
 

### 3. Kết Luận

Vậy nên dùng prefork hay là worker ???

Để trả lời câu hỏi này cần căn cứ vào trong nhiều yếu tố, một vài yếu tố đó bao gồm :
– Phần cứng máy chủ : CPU và RAM. RAM nhiều thì có thể nên sử dụng prefork còn RAM ít thì dùng worker. Nếu muốn performance tuning thì còn tùy thuộc vào trong server có bao nhiêu CPU, bao nhiêu core, …
– Php handler các bạn sẽ sử dụng : DSO, FCGI, CGI, SuPHP. DSO thì chỉ chạy được prefork, mà mặc định thì Apache sử dụng DSO để handler PHP nên prefork cũng được cài đặt mặc định.
– Apache module được sử dụng : Vì có vài module chỉ chạy được trong chế độ worker hay là prefork, đặt biệt là các module cache

Nguồn : https://techzones.me/2019/08/05/prefork-vs-worker-for-apache/