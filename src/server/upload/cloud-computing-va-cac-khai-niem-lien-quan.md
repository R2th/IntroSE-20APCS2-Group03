Trong khi tìm hiểu và học về Cloud mình nhận ra có rất nhiều khái niệm hay trong đó. Qua bài viết này, mình muốn giúp các bạn hiểu hơn về Cloud và các services thường được biết đến với Cloud, các bạn đã sẵn sàng chưa  :D :D
   # Cloud là gì ? 
   Có một câu nói ngắn gọn và rõ ràng nhất của Cloud : 
      
   ![](https://images.viblo.asia/e6883908-b7e2-4aad-bee5-74fc60a48438.jpg)

   
Tạm dịch là: 
> Chả có cái cloud nào cả, đơn giản chỉ là bạn đang dùng ké máy của người khác thôi ~ 

* Khi nói về Cloud, tức là ta đang nói đến các dịch vụ như Virtual Machine, Storage Service, Network, IP, Cloud Database… Tuy nhiên, thức tế đúng chỉ là bạn đang dùng ké máy của người khác . Như là khi bạn dùng dịch vụ **Cloud Azure**, tức là bạn đang dùng ké máy của Microsoft trong host database, host app. Khi bạn dùng dịch vụ **Cloud AWS** tức là bạn đang dùng máy trong data center của Amazon.

*  Không chỉ có vậy, bạn còn dùng ké infrastructure ( có thể hiểu là cơ sở hạ tầng, như là mạng, kho lưu trữ, thiết bị,...), application, product của họ nữa. 

## Vậy tại sao lại phải đi dùng "ké" ? 
1.  Chắc chắn lí do đầu tiên sẽ là tốc độ
*   Bạn không cần phải triển khai, cấu hình, và duy trì các tính toán, lưu trữ, và cơ sở hạ tầng mạng cơ bản mà trên đó các ứng dụng của bạn sẽ chạy. Thay vào đó, bạn có thể sử dụng các nguồn lực cơ sở hạ tầng được cung cấp cho bạn bởi nhà cung cấp đám mây lưu trữ của bạn. 
> Công nghệ sinh ra là để ta không phải đi lại đoạn đường người khác đã đi 

*  Ngoài ra, việc sử dụng những mô hình mô phỏng và sẵn có còn giúp ích cho các nhà phát triển có thể thử nghiệm ứng dụng của họ . Với clouds, bạn có thể thực hiện phát triển và thử nghiệm của bạn trong cùng một môi trường mà các ứng dụng của bạn sẽ được triển khai trên các máy tính. Điều này có thể làm cho các ứng dụng thử nghiệm đơn giản và đáng tin cậy hơn, do đó làm giảm thời gian triển khai.  

2.  Tính linh hoạt
* Các dịch vụ trên nền điện toán đám mây là lựa chọn lý tưởng cho các doanh nghiệp có nhu cầu về băng thông biến động và tăng trưởng. Sử dụng Cloud giúp bạn dễ dàng mở rộng/ thu hẹp hệ thống phù hợp với nhu cầu sử dụng thực tế trong từng giai đoạn, thông qua các công cụ quản trị từ xa. Mức độ nhanh, linh hoạt có thể mang lại nhiều lợi thế cho doanh nghiệp. Đây là 1 trong những lí do khiến cloud luôn được đánh giá cao.

**Ngoài ra ta cũng còn rất nhiều các lí do khác khiến việc nên áp dụng Cloud Computing vào trong hệ thống của mình như là khả năng khôi phục dữ liệu sau thảm họa, cập nhật phần mềm tự động, giảm chi phí đầu tư ,...** 

## Các services đi kèm Cloud Computing
Nếu muốn sử dụng hiệu quả và giảm chi phí khi sử dụng Cloud Computing, đây là những dịch vụ mà bạn chắc chắn nên biết 
```
IaaS: Infrastructure as a Service
PaaS: Platform as a Service
SaaS: Software as a Service
```
Ngoài những dịch vụ chính này ra, còn có các dịch vụ khác như **FaaS** (Function as a service ) và **CaaS**(Containers as a service). Trong bài viết này, mình sẽ chỉ đi sâu về khái niệm của 3 dịch vụ phổ biến nhất nêu  trên.
![](https://images.viblo.asia/f5a0d9de-9d1a-4ba7-b1e2-fa176c70b99f.png)

* Traditional IT hay còn được biết là mô hình On-Premise, là câu chuyện sơ khai trước khi Cloud xuất hiện trên hành tinh này. Bạn và doanh nghiệp của bạn sẽ quản lí tất tần tật những dịch vụ cần thiết để hệ thống hoạt động trơn tru. Điều này dẫn đến bạn phải tự xây dựng cơ hạ tầng, cũng như server và các cấu hình đi kèm, ngoài ra còn phải thường xuyên bảo trì và nâng cấp ứng dụng. Đây là mô hình basic nhất, và hiệu suất nó đem lại thường không cao trong thời gian ngắn. 
* Hiểu được điều này, Cloud và các dịch vụ đi kèm với nó đã được sinh ra đời. Với mỗi 1 loại dịch vụ, sẽ có 2 thành phần quản lí, là bạn và nhà cung cấp dịch vụ. Điều này sẽ giúp bạn giảm chi phí đầu tư, và tập trung vào những dịch vụ mà bạn quản lí tốt hơn 
1.  **IaaS: Infrastructure as a Service**

 Đối với **IaaS**, có thể hiểu nôm na là cơ sở hạ tầng như một dịch vụ. Ở đây, công ty này sẽ cho bạn thuê cơ sở hạ tầng bao gồm hệ điều hành, máy ảo, server, ổ cứng và mạng.
 Dịch vụ này có thể được biết đến như là EC2 của AWS, ở đây service này cho phép bạn tạo máy ảo trên server của họ và được gọi là instance. Bạn được chọn hệ điều hành, runtime system, region và các ứng dụng ở bên thứ 3 mà mình muốn và cấu hình trên instance đó và ngược lại những gì như data centers, the networking, the virtualization và host server là những gì AWS quản lí, điều này khiến bạn giảm được rất nhiều chi phí  và giúp bạn giảm bớt được trách nhiệm trong việc quản lí application của mình. 
 
 2. **PaaS: Platform as a Service**
 
 Đối với  **nền tảng như một dịch vụ**, ở đây bạn tiếp tục lược bớt trách nhiệm của mình xuống, ở đây bạn chỉ quản lý dữ liệu và ứng dụng. Mọi thứ khác được quản lý bởi nhà cung cấp, vì vậy thời gian chạy, hệ điều hành, mọi thứ bên dưới được AWS xử lý cho bất kỳ sản phẩm PaaS nào. Với PaaS, bạn có thể nói với nhà cung cấp rằng bạn có một ứng dụng, có thể là thứ gì đó được viết bằng ngôn ngữ lập trình node.js và bạn sẽ cung cấp cho họ mã đó và bất kỳ dữ liệu nào, phần còn lại họ sẽ quản lý và thao tác . Vì vậy, bạn có thể mất một số tính linh hoạt vì họ quản lý mọi thứ nhưng bù lại  bạn có ít rủi ro quản trị và chi phí hơn .

Hiểu nôm na là nhà cung cấp sẽ lo cho bạn từ OS (Windows hoặc  Linux) cho tới Runtime (Docker, NodeJS, C#, Java), chỉ cần bỏ code vào mà chạy là được. 

3. **SaaS: Software as a Service**

**Phần mềm như một dịch vụ** - Đây là một mô hình dịch vụ mà hầu hết mọi người đều đã sử dụng. Nếu bạn sử dụng Netflix hoặc sử dụng email của  Hotmail hoặc Google, thì bạn đã sử dụng sản phẩm SaaS. Saas cho chúng ta ít quyền quản lí nhất, thứ duy nhất mà chúng ta cần bận tâm, đó là data . Ví dụ, khi sử dụng email, bạn chỉ cần quản trị những tin nhắn của mình, tất cả những thứ còn lại đều do nhà cung cấp xử lí, bạn không có quyền để làm bất cứ điều gì để có thể nâng hiệu suất sử dụng của bản thân ngoài những gì nhà phát hành cung cấp, khi đó, ví dụ bạn muốn chuyển từ email sang email google, thứ duy nhất bạn cần mang theo, chỉ là data. Cũng giống như vậy, nếu bạn đã sử dụng netflix, thứ duy nhất bản quản trị cũng chỉ là những bộ phim bạn lựa chọn trong danh sách của bản thân . 

  Bạn chỉ cần lo lắng về dữ liệu của mình và cách bạn cấu trúc và định cấu hình dữ liệu đó bên trong ứng dụng. Bây giờ, các sản phẩm SaaS thường bảo trì rất thấp, nhưng sự đánh đổi cho điều đó là chúng cũng khá không linh hoạt. Bạn sẽ dựa vào nhà cung cấp để thêm các tính năng và kiểm soát hiệu suất. Nói chung, bạn không có bất kỳ sự liên quan nào với cơ sở hạ tầng hỗ trợ ứng dụng SaaS, vì vậy bạn thực sự không thể điều chỉnh các thành phần riêng lẻ này để có hiệu suất tốt hơn. Bạn gần như hoàn toàn phụ thuộc vào nhà cung cấp.
  
  ### Chúng ta nên sử dụng dịch vụ nào ?
  
  Đa phần khi các công ty công nghệ/công ty phần mềm dùng Cloud, họ sẽ dùng IaaS, hoặc PaaS để deploy sản phẩm lên.

Còn SaaS tức là sản phẩm phần mềm (software) mà các công ty phần mềm cung cấp dưới dạng dịch vụ. 

![](https://images.viblo.asia/7cae64b2-8004-494b-aa47-98700c77554c.jpg)

* Càng ở cấp thấp thì bạn càng phải quản lí nhiều hơn. Việc này sẽ tốn nhiều công sức và tiền bạc. Tuy nhiên, bạn sẽ control được nhiều hơn, có thể thoải mái chọn phần cứng, chọn hệ điều hành,.
* Và càng lên cao, thì các dịch vụ do Cloud cung cấp sẽ càng nhiều hơn, do đó, bạn cần quan tâm đến việc mô hình của bạn cần quản lí gì và mục đích hướng tới của nó là gì.

Ở Việt Nam, đa phần các công ty lớn dùng dạng On-Premise, tự xây dựng hệ thống hạ tầng vì họ có tiền để nuôi team IT. Ở nước ngoài, các công ty startup, công ty vừa và nhỏ thường dùng IaaS hoặc PaaS do Google, Amazon, Azure cung cấp để đỡ tốn chi phí cho IT.


```
SaaS : Google Apps, Dropbox, Salesforce, Cisco WebEx, Concur, GoToMeeting
PaaS : AWS Elastic Beanstalk, Windows Azure, Heroku, Force.com, Google App Engine, Apache Stratos, OpenShift
IaaS : DigitalOcean, Linode, Rackspace, Amazon Web Services (AWS), Cisco Metapod, Microsoft Azure, Google Compute Engine (GCE)
```



Phần lớn các công ty đều sử dụng SaaS cho các hoạt động thường ngày (thay vì tự phát triển):
* Slack để giao tiếp giữa các thành viên
* Jira để quản lý task
* Confluence hoặc Google Docs để quản lý document
* Skype hoặc Zoom.us để họp online

### Kết 
 Bài viết đến đây là hết, cảm ơn bạn đã dành thời gian quan tâm, hẹn gặp các bạn ở các bài viết tiếp theo trong seri về Cloud của mình :heart_eyes:

### Tham khảo :

* [https://www.computenext.com/blog/when-to-use-saas-paas-and-iaas/](https://www.computenext.com/blog/when-to-use-saas-paas-and-iaas/)
* [https://www.bmc.com/blogs/saas-vs-paas-vs-iaas-whats-the-difference-and-how-to-choose/](https://www.bmc.com/blogs/saas-vs-paas-vs-iaas-whats-the-difference-and-how-to-choose/)
* [https://www.ibm.com/cloud/learn/iaas-paas-saas](https://www.ibm.com/cloud/learn/iaas-paas-saas)