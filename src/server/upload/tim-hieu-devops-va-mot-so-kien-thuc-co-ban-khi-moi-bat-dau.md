![image.png](https://images.viblo.asia/18ff0cd8-2bca-4bf2-b3ed-5a04a5f1356c.png)
# 1. Tổng quan về DevOps
DevOps là sự kết hợp của 2 giai đoạn Phát triển và Vận hành phần mềm sao cho 2 giai đoạn này tiến lại gần nhau hơn. Giai đoạn phát triển (Development) bao gồm các phần việc của Developer, Designer, QA, BrSe. Giai đoạn vận hành (Operations) bao gồm các phần việc của: System Administrator, System Engineer, Network Engineer, Security Engineer,...

DevOps sẽ giúp tối ưu hóa 2 giai đoạn phát triển phần mềm này giúp đẩy cao tốc độ phát triển và cải tiến sản phậm so với các quy trình quản lý và phát triển phần mềm truyền thống. DevOps có thể coi là một phương pháp hoặc văn hóa hoặc chức danh công việc dành cho những người có khả năng kết hợp tốt với kiến thức tốt, khả năng giao tiếp và thực hành quản lý tốt 2 giai đoạn phát triển phần mềm phía trên. 

DevOps Engineer có thể là người trực tiếp tham gia vào code, có thể hướng dẫn cho đội phát triển dự án chạy code trên các môi trường đã chuẩn bị trước.

Những thách thức đối với DevOps:

* Building and maintaining servers: Tốn thời gian và không hiệu quả
* No environment management: Sự khác biệt trong môi trường development và production 
* Deployments are a blocker: Rủi ro trong quá trình deploy do quản lý thủ công nhiều configurations và versions
* Hacking: Fix trực tiếp trên production (thay vì quy trình hotfix truyền thống)

## 1.1 Giải thích sơ đồ luồng DevOps
* Plan: Lên kế hoạch phát triển trong sprint
* Code: developer thực hiện code chức năng theo plan
* Build: có thể buid thông qua Docker Image
* Test: cài bản build lên server test (work, staging,..) để QA và DevOps cùng test
* Relese: Tạo bản release và tham gia quá trình release
* Deploy: deploy code lên các môi trường
* Operate: vận hành app và bổ sung
* Monitor: theo dõi hệ thống xem có vấn đề gì không
* Sau đó qua sprint mới lại quay trở lại Plan và vòng lặp diễn ra liên tục 

## 1.2 Một số Custom Service của DevOps
![image.png](https://images.viblo.asia/89071dd7-b9ef-43eb-ba44-d32a3d5eab1b.png)

* Communication
* Collaboration
* Controlled Process
* Continuous Code Inspection & Integration
* Continuous Deployment
* Continuous Testing
* Continuous Monitoring

# 2. Một số kiến thức cơ bản khi mới bắt đầu
![image.png](https://images.viblo.asia/2f6243da-0599-43c5-afb8-b91bcccaa18c.png)

Đây là ảnh chia sẻ về Roadmap để trở thành DevOps mình tham khảo trên https://github.com/kamranahmedse/developer-roadmap đã bao gồm cả kiến thức basic và advanced trong quá trình học để trở thành DevOps Engineer. 

Ở bài này thì mình sẽ đề cập một số kiến thức cơ bản mà mình cảm thấy cần phải nắm vững và thực hành tốt khi bắt đầu học DevOps.  

## 2.1 Học một hoặc một số ngôn ngữ lập trình
Như mọi người thấy trên ảnh thì đối với 1 developer, để trở thành 1 DevOps Engineer thì cần có kiến thức tương đối tốt về một ngôn ngữ lập trình. Phía Back-end có thể là Python, Ruby, Node.js,... 

Ngôn ngữ hiện tại mình sử dụng trong công việc là Ruby và hiện tại thì mình có theo học NestJs (là một framework của Node.js)

## 2.2 OS concepts
Kiến thức về hệ điều hành - OS Concepts: hiểu được sự khác nhau giữa các hệ điều hành như Linux, Window, Mac,...

Hiểu được những thành phần cấu thành nên hệ điều hành đó như là quản lý bộ nhớ, đa luồng - quản lý tiến trình, networking, socket, virtualization,..

## 2.3 Quản trị server
Quản trị server (Managing Servers): cài đặt được một hệ điều hành lên server, hiểu được các những distro của Linux nếu đi sâu vào Linux (ví dụ distro như Ubuntu, Fedora, LinuxMint, openSUSE, PCLinuxOS, Debian, Mandriva,...) để chọn được hệ điều hành phù hợp. Hiểu được cách quản lý các pagake khi cài đặt ở các hệ điều hành.

* Học cách tương tác với hệ thống như chỉnh sửa file, cấu hình hệ thống  thông qua Terminal (thao tác với dòng lệnh): điểm mạnh là tự động hóa bằng cách viết script,..
* Networking, Security và Protocols: phải hiểu các giao thức, phương thức mà các ứng dụng giao tiếp với nhau. Hiểu về các port, cách kết nối với server và kết nối an toàn. Cần nắm được các giao thức cơ bản như HTTP, HTTPS, FTP,... Từ các kiến thức về mạng, về protocol thì có thể triển khai cụ thể ví dụ như Caching Server (caching server là một server lưu trữ các dữ liệu đã được tính toán từ trước và lần sau sẽ ko cần tính lại nữa, ví dụ điển hình caching server được áp dụng là Redis Server). Ngoài ra thì còn có cài đặt Load Balancer, Forward Proxy,...
* Học về Docker để ap dụng build Docker trên Linux vì Docker có thể hiểu là một Linux kernel.

## 2.4 Web server
Web Server: là một phần mềm để cung cấp dịch vụ như Nginx, Apache,... 

Về Nginx thì đây là một web server mạnh mẽ mã nguồn mở. Nginx sử dụng kiến trúc đơn luồng, hướng sự kiện vì thế nó hiệu quả hơn Apache server. Nó cũng có thể làm những thứ quan trọng khác, chẳng hạn như load balancing, HTTP caching, hay sử dụng như một reverse proxy. Nginx là kiến thức không thể thiếu đối với một web developer, system administrator hay devops. 

Apache phục vụ cho PHP, còn một số ví dụ khác như Tomcat, Caddy phục vụ cho Java, riêng Python thì có WGSI.

## 2.5 Infratructure 
Học các kiến thức về Infrastructure: cách cài đặt hệ thống, build hệ thống bằng code. Có thể không cần dùng AWS console mà sử dụng code để build. Học cách làm sao để deploy app bằng Container (Docker, LXC) thay vì thủ công. 

Ngoài ra thì cần nắm được các kiến thức cơ bản của Infra như là: Configuaration Management, Container Orchestration,,,, Và sau đó cần triển khai được các Tool hỗ trợ CI/CD (continuous integration and delivery - là các file code chạy trên server bao gồm quá trình build code và chạy được chạy auto và liên tục không ngừng), có thể dựa trên các công cụ đang khá mạnh ở thời điểm hiện tại như Travis CI, Circle CI, Jenkins,...Đối với các kiến thức quản lý source code có thể thông qua Gitlab CI, Github, Azure DevOps,...

Học một số Infratructure service như AWS service, Azure Cloud, Google Cloud,...bao gồm cách sử dụng, quản lý chi phí,...

## 2.6 Monitoring
Monitoring server là theo dõi hoạt động của server xem có thấy vấn đề gây nguy hiểm như CPU tăng cao, các service sử dụng đến giới hạn. 

Một số tool hỗ trợ monitoring như Kibana (theo dõi Elastic Search), Datadog, Nagios, Zabbix


# 3. Tổng kết
Trên đây là chia sẻ về một số kiến thức mình đã và đang học để hướng đến việc phát triển trở thành một DevOps Engineer. Để nâng cao kỹ năng bản thân, tích lũy kinh nghiệm, có tư duy về cách xử lý vấn đề và muốn phát triển mạnh mẽ trong công việc thì thực sự những kỹ năng học trong quá trình trở thành DevOps Engineer sẽ mang lại rất nhiều hiệu quả cho bản thân. Tuy nhiên, mình cũng hiểu quá trình này sẽ còn rất dài và còn rất nhiều kiến thức, nhiều các bài thực hành nên sẽ cần tích lũy kinh nghiệm dần dần chứ khó có thể nhảy bậc khi mà các kiến thức phần sau luôn móc nối với phần trước. ^^!

**Cảm ơn các bạn đã theo dõi đến đây. Xin chào và hẹn gặp lại ^^!**

**Link tham khảo:** 
https://www.rapyder.com/blogs/what-is-devops-a-beginners-guide/