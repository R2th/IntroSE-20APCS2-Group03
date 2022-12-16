Theo một thống kê nghề nghiệp của Mỹ, DevOps Engineer được xếp hạng thứ 2 trong top 50 công việc tốt nhất. Ngày càng có nhiều kỹ sư công nghệ thông tin đi theo con đường này vì mức đãi ngộ cao cũng như con đường công việc rộng mở. Để có thể bước đâu trở thành DevOps Engineer, chúng ta cần hiểu một số vấn đề sau: 

## 1. DevOps Engineer là ai?
DevOps hiểu đơn giản là Dev và Ops, đó chính là vừa phát triển vừa vận hành.
Một DevOps Engineer  là người có kiến thức về Vòng đời phát triển của phần mềm, đầy đủ kiến thức để tham gia và quá trình phát triển và vận dụng thành thạo các công cụ tự động khác nhau để áp dụng vào các quá trình phát triển và vận hành. (CI/CD pipelines)

## 2. Vai trò và trách nhiệm của DevOps Engineer
   1. **DevOps Evangelist** – Là người đứng đầu chịu trách nhiệm triển khai DevOps
   2. **Release Manager** – Release tính năng mới và đảm bảo sự vận hành ổn định của sản phẩm.
   3. **Automation Expert** – chịu trách nhiệm tự động hóa và orchestration của các công cụ.
   4. **Software Developer/ Tester** – Phát triển và kiểm tra sản phẩm.
   5.  **Quality Assurance** – Đảm bảo chất lượng sản phẩm phù hợp với requirement.
   6.  **Security Engineer** – là người theo dõi, đảm bảo an toàn sản phẩm cũng như hiệu năng hoạt động.

![](https://images.viblo.asia/84e4906f-8182-4597-96fc-0df9d3d3827f.png)


## 3. Những ai có thể trở thành một DevOps Engineer?

Nếu bạn đang là một Dev, một Ops, một QA hay thậm chí bạn chỉ là 1 fresher chỉ cần có đam mê là bạn có thể trở thành một DevOps Engineer. 

Một kỹ sư DevOps không chỉ hiểu các công cụ khác nhau mà đó còn là hiểu về cách thức cũng như vận dụng nó đúng lúc.

## 4. Làm sao có thể trở thành một DevOps Engineer? và con đường DevOps
Để trở thành một DevOps các bạn cần có một số kiến thức nền tảng sau đây:

* Các kiến thức cơ bản về Linux
* Có kiến thức  thực hành tốt trên các công cụ phát triển, kiểm thử và triển khai, như (Git, Jenkins, Docker, Kubernetes, Puppet, Chef, Ansible, Nagios, Splunk, ...)
* Có kinh nghiệm CI/CD
* Hiểu biết về kiến thức hạ tầng, kiến trúc hệ thống và kiến thức mạng.
* Kiến thức về  các nền tàng cloud AWS, GCP, Azure,...


![](https://images.viblo.asia/3d3cddad-7a01-4b2b-a48e-195b0b62cda8.jpg)


### 1.  Kỹ năng quản lý source code (VCS)

Thành thạo với ít nhất một công cụ quản lý mã nguồn / kiểm soát phiên bản, tốt nhất là Git, bạn nên có kiến thức thực hành tốt về quy trình công việc Git.

![](https://images.viblo.asia/0f0bc619-7dad-48ad-9d6e-fe31092b6685.png)


### 2.  Tìm hiểu cách tích hợp các Builld Tools và Source Code Manager để Build/Ingegration(xây dựng/tích hợp) liên tục

Khi bạn biết Git, bước tiếp theo là hiểu cách bạn có thể tự động hóa quy trình xây dựng, cách bạn có thể liên tục xây dựng cam kết mới nhất vào kho lưu trữ mã nguồn. Vì thế, bạn nên hiểu cách các máy chủ tự động hóa như Jenkins hoạt động. Về cơ bản, làm thế nào bạn có thể tích hợp các công cụ Xây dựng như Maven với các công cụ Quản lý mã nguồn như Git. Quá trình này được gọi là tích hợp liên tục (**CI**). đó chính là việc phát triển với CI.

Ví dụ: Mô hình hoạt động Jenkins

![](https://images.viblo.asia/619bef0c-80e5-4432-998a-87a969f3db03.png)


### 3.  Tìm hiểu cách thực hiệcch hợp liên tục sang bước tiếp theo là  Continuous Delivery (phân phối liên tục) để Test liên tục

Bước tiếp theo là tìm hiểu cách có thể tự động hóa giai đoạn **Test**, cũng như cách có thể làm cho nó bớt phức tạp hơn vì hầu hết chúng ta đã phải đối mặt với các vấn đề như Code hoạt động tốt trong môi trường dev nhưng lại toang trong môi trường Test.

Vì vậy chúng ta phải hiểu cách triển khai Code trong môi trường  Dev lên server Test. Trong trường hợp này cần hiểu cách các công cụ như Puppet, Chef, v.v., bạn cũng có thể sử dụng các Docker container cho mục đích này, vì vậy kiến thức Docker là bắt buộc để phục vụ tốt cho giai đoạn này.
Ngoài ra, bạn phải tìm hiểu cách có thể liên tục test code của mình sau mỗi lầncommit. 

Cần tích hợp thêm  các công cụ kiểm tra Tự động hóa như Selenium với Jenkins. Cái này được gọi là CD (Continuous Delivery).

![](https://images.viblo.asia/6ef21927-b73c-46b7-b170-5e0cd5cc3ab6.png)


### 4.  Học cách triển khai và cấu hình các môi trường Dev, Test và Product

Để đảm bào an toàn khi phát triển, test hay triển khai chính thức. Chúng ta cần học cách triển khai các môi trường khác nhau để phục vụ mục đích khác nhau. Có thể sử dụng các công cụ như Puppet hay Docker để cấu hình và triển khai.


![](https://images.viblo.asia/6cb0f9a7-81ac-4f0a-a51b-0486608ab60c.png)

### 5.  Tìm hiểu các sử dụng các công cụ giám sát để trích xuất các thông tin hữu ích
Ngoài ra, điều rất quan trọng đối với Kỹ sư DevOps là thu thập phản hồi và thực hiện các thay đổi nhanh chóng, vì bạn nên có kiến ​​thức về các công cụ giám sát như Nagios, Splunk, v.v.

![](https://images.viblo.asia/b98a9201-2d3e-4131-b378-fdf9ab084e72.png)

Tham khảo thêm tại: 
[https://ifritltd.com/2017/08/22/dockerizing-jenkins-build-logs-with-elk-stack-filebeat-elasticsearch-logstash-and-kibana/](https://ifritltd.com/2017/08/22/dockerizing-jenkins-build-logs-with-elk-stack-filebeat-elasticsearch-logstash-and-kibana/)


### 6.  Tìm hiểu về các nền tảng Cloud và Cloud Computer.
Ngoài các kiến thức cơ bản trên, chúng ta cần tìm hiểu và có kiến thức về Cloud. Hầu hết các tổ chức hiện này đều sử dụng các nền tảng cloud nên học về nó là không hề thừa đâu.

![](https://images.viblo.asia/e620a5dd-da87-49bc-a19a-1061be010e72.png)



## 5. Tổng kết

Trên đây là một số kiến thức cơ bản để bạn có thể bước vào con đường DevOps.

Tham khảo thêm tại: [https://www.edureka.co/blog/how-to-become-a-devops-engineer/](https://www.edureka.co/blog/how-to-become-a-devops-engineer/)

Link khóa học: [https://www.freetutorialseu.com/devops-with-aws-codepipeline-jenkins-and-aws-codedeploy-udemy-course-free-download/](https://www.freetutorialseu.com/devops-with-aws-codepipeline-jenkins-and-aws-codedeploy-udemy-course-free-download/)