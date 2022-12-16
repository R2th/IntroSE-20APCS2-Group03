# DevOps thì làm gì?
DevOps là viết tắt của Development & Operation (phát triển và vận hành). DevOps là người làm việc với đội Dev để phối hợp nhằm "improving the software lifecycle", tức là đưa sản phẩm đến tay người dùng nhanh nhất có thể bằng việc định hướng và tự động hoá các công việc tích hợp và deploy. Điều này nhằm thiết lập một nền văn hóa và môi trường nơi mà việc build , test, và deploy phần mềm có thể nhanh chóng, thường xuyên, và đáng tin cậy hơn.

![](https://images.viblo.asia/e60190b9-574c-4144-9eb0-8d3a54d3cd6a.png)

Theo mình hiểu một cách đơn giản thì DevOps là một văn hoá làm việc. Nơi mà các DevOps Engineer đòi hỏi nhiều kĩ năng hơn những Developer thông thường. Ngoài kĩ năng phát triển phần mềm thông thường, còn phải biết dùng kĩ năng coding của mình để phát triển các hệ thống deploy, monitor,… một cách tự động. 

Khi mà bạn có thêm kĩ năng về DevOps thì cùng một vấn đề có thể bạn sẽ có thể có nhiều phương án giải quyết hơn. Từ đó tìm được những phương án tối ưu nhất.

Chúng ta hãy xem lộ trình để trở thành một DevOps Engineer nhé!
# Lộ trình để trở thành một DevOps
## Học một ngôn ngữ lập trình
Học một ngôn ngữ lập trình sẽ giúp bạn nâng cao tư duy lập trình. Giúp đỡ rất nhiều trong việc tạo ra các đoạn script một cách dễ dàng hơn. Chúng ta đều biết rằng các ngôn ngữ phổ biến hiện này là Java, Python, JavaScript, ... Một khi thoải mái với ngôn ngữ lập trình thì bạn sẽ cảm thấy thoải mái hơn nhiều để tiếp tục chặng đường này.
### 1, Java
Java đã thống trị ngành IT đã hơn 2 thập kỉ nay kể từ nó được giới thiệu vào những năm 90. Cũng như Python, Java cũng là một ngôn ngữ biên dịch,  và với những feature của nó như bản chất đa luồng, OOP, ... với sự hỗ trợ của JVM (Java Vitual Machine), và JRE (Java Runtime Environment), chúng ta có thể sử dụng Java để dựng lên những phần mềm nhỏ cho sysadmin cho đến việc tạo ra những hệ thống lớn đa chức năng. 
### 2, JavaScript
Hầu hết các project hiện nay đều sử dụng đến JavaScript framework, hệ sinh thái JavaScript cũng phát triển ở một tốc độ đáng kinh ngạc với cả Front-end JS hay Back-end JS.
### 3, Python
Python được tạo ra vào những năm 80 của thế kỉ trước, và đến nay đã chứng minh được nó là một ngôn ngữ cực kỳ đa dụng. Python cho tới thời điểm này có thể được sử dụng hiệu quả ở hầu hết các lĩnh vực nhưng phát triển GUI, phát triển Web, Software, System Administration, AI, Machine Learning, Khoa học , Toán học, ... 

Một số config của cloud hoặc các tool quản lý OpenStack như Ansible đều được code trên nền Python, và bên cạnh đó Python có một cộng đồng rất lớn mạnh và các khoá học vô cùng đa dạng cho những bạn mới bắt đầu. 

Ngoài 3 ngôn ngữ trên thì mình cũng recommend các bạn học Ruby vì tốc độ phát triển phần mềm nhanh và khả năng dễ làm quen của nó.
## Tìm hiểu về hệ điều hành (OS)
Trứơc đây thì chỉ có những ông Supporter hay SysAdmin mới có trách nhiệm nắm rõ về OS hay phần cứng, nhưng đối với DevOps thì chúng ta cũng nên biết về những khái niệm cơ bản của OS như:
* Process Management
* Socket
* Thread và Concurrency
* I/O Management
* Memory Storage
* Virtualization
* Hệ thống File

![](https://images.viblo.asia/c1c9f1cc-f74c-440b-b299-125874a759fe.png)

Bây giờ hỏi thì 9 trên 10 ông làm việc với Linux nên mình nghĩ chúng ta nên học về Linux OS. DevOps cần nắm rõ được những command ở terminal nên chúng ta cũng cần phải đầu tư thời gian để nắm rõ các sử dụng các Linux shells như Bash hay Zsh cùng với các tool như `find`, `grep`, `sed`, `isof`, và những command networking  như `NSlookup`  và `netstat`.

## Học cách sống trong Terminal

Đây là một điều bắt buộc đối với một DevOps.

CLI đã luôn luôn mạnh mẽ hơn rất nhiều so với GUI, và một khi bạn đã quen với việc gõ lệnh vào Terminal thì bạn sẽ cảm thấy sử dụng GUI chậm chạp hơn rất nhiều. Bạn cũng sẽ hiểu về hệ thống, OS nhiều hơn nếu làm việc với Terminal .

Và để tự động hoá công việc hàng ngày của bạn thì việc sử dụng shell scripting là cực kì quan trọng.

Và như mình nói ở trên, nếu đã học Linux thì bắt buộc phải nắm rõ được những shell như Bash hay Zsh cũng các tool `find`, `grep`, ... hay `netstat`, ... với networking. 

## Networking và bảo mật

Bạn nên nắm được những kiến thức cơ bản về networking và bảo mật như SSL, HTTP, HTTPS, FTP, DNS , ... và cũng cần phải tìm hiểu thêm  về những lỗ hổng bảo mật và cách khắc phục chúng. 

## Setup infrastucture
Bạn cần phải hiểu cũng như biết cách setup một Web Server như Nginx, Apache, Tomcat, IIS, ... mình nghĩ nên bắt đầu với những Web Server thông dụng như Nginx hay Apache để có thể nắm rõ được kiến thức của phần này. Bạn cũng cần phải biết về những khái niệm như:
* Caching Server
* Load balancer
* Reverse proxy
* Firewall
* ...

![](https://images.viblo.asia/68cccf96-c0fb-447d-a89c-8990b76a506c.png)
Đây là việc thiết yếu đối với một DevOps Engineer, và đây cũng là một mảng vô cùng rộng lớn nên cần bỏ ra rất nhiều thời gian để tìm hiểu. Bạn cũng nên biết về các công cụ Configuration Management (CM) như Salt, Puppet, Ansible, Chef, ... cũng như là Terracloud hay Cloud Formation.

## Tích hợp liên tục (Continuous Integration - CI)

Đây là một khái niệm cực kì cần thiết cho một DevOps, khi nó giúp giảm thiểu công sức, sự nhàm chán khi cứ phải lặp đi lặp lại các thao tác mà mình hoàn toàn có thể làm nó một cách tự động.

Một vài CI/CD tool phổ biến như: Jenkins, TeamCity, Drone ... Mình highly recommend tool Jenkin vì nó được sử dụng nhiều, và cũng là 1 tool CI/CD rất mạnh mẽ.

Một số tool cũng thuộc về lĩnh vự CI/CD như sau: 

* Version Control: Apache Subversion, GIT, Perforce, Mercurial, ...
* Containerization: Docker, LXD, ...
* Quản lý container: Mesos, Kubernetes etc
* Build và test: maven, Jenkins etc
* Configuration Management: Puppet, Salt, Chef, Ansible etc.
* Continuous Monitoring: Nagios

## Học cách giám sát ứng dụng và infrastructure

Bên cạnh việc setup và deploy thì việc giám sát, monitor cũng không kém phần quan trọng.

Bạn không thể ngồi 24 giờ/1 ngày, 7 ngày/1 tuần chỉ để biết con server còn sống hay đã chết. Các service có còn hoạt động hay không? Hay là việc Server đang dùng những tài nguyên như thế nào. Có dùng quá mức quy định hay không?

Có rất nhiều tool để thực hiện việc giám sát này như Nagios, Monit, Zabbix, AppDynanic, New Relic, Docker, ... Việc chọn lựa tool nào hoàn toàn dựa vào hệ thống của bạn đang dùng gì.

Khi mà có hệ thống monitoring hoạt động ổn đinh. Bạn có thể dành thời gian để làm những việc khác. Khi có điều gì đó bất thường thì monitoring system sẽ gửi thông báo cho bạn thông qua mail hoặc điện thoại…

## Cloud provider

Có bao giờ bạn tự hỏi là tại sao các doanh nghiệp hiện nay lại dùng Cloud Server cho các ứng dụng mà họ phát triển. Mình điểm qua những ưu điểm vượt trội của Cloud server như sau:

* Dynamic computing resources: Khả năng scaling nhanh, hiệu quả, tiết kiệm, dễ dàng thay đổi config hệ thống.
* Giảm chi phí: Giảm chi phí duy trì lắp đặt cơ sở hạ tầng (on-premises).
* Giảm độ phức tạp trong cơ cấu của doanh nghiệp: Doanh nghiệp có thể đơn giản hoá nhân viên liên quan đến IT, nhất là những cty không phải là chuyên ngành IT.

Nhắc đến Cloud Provides không thể kể đến 3 ông lớn đó là: AWS, Google Cloud và Microsoft Azure. Ngoài ra thì còn Heroku, Cloud Foundry, Digital Ocean ... 

![](https://images.viblo.asia/abce1f67-da40-4da2-be20-f4e6494b3f7c.png)

# Tổng kết
Khi mà 1 Developer có thêm kiến thức về DevOps thì cơ hội nghề nghiệp của bạn cũng sẽ rộng mở hơn rất nhiều. Nhất là đối với những công ty có quy mô nhỏ. Không có những chuyên gia trong lĩnh vực DevOps.

Bạn có thể trở thành một key member của công ty khi có thể vừa tham gia vào quá trình phát triển hệ thống vừa đảm nhiệm thêm phần việc của 1 DevOps Engineer.

Nguồn:

https://github.com/kamranahmedse/developer-roadmap

https://www.techiexpert.com/the-roadmap-to-becoming-a-devops-engineer-in-2020/