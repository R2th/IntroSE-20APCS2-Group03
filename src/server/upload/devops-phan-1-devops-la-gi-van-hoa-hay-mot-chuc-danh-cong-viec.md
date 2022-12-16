# Định nghĩa về DevOps
**DevOps** (kết hợp của cụm từ tiếng Anh "software DEVelopment" và "information technology OPerationS") là một thuật ngữ để chỉ một tập hợp các hành động trong đó nhấn mạnh sự hợp tác và trao đổi thông tin của các lập trình viên và chuyên viên tin học khi cùng làm việc để tự động hóa quá trình chuyển giao sản phẩm phần mềm và thay đổi kiến trúc hệ thống. Điều này nhằm thiết lập một nền văn hóa và môi trường nơi mà việc build (biên dịch phần mềm), kiểm tra, và phát hành phần mềm có thể xảy ra nhanh chóng, thường xuyên, và đáng tin cậy hơn. -  *theo Wikpedia*

*Còn nói 1 cách nôm na dễ hiểu*  **DevOps** là một sự kết hợp của các nguyên lý, biện pháp thực hành, quy trình và các tool giúp tự động hóa quá trình lập trình và chuyển giao phần mềm.

**DevOps** nhấn mạnh vào con người (và văn hóa), đồng thời tìm cách cải thiện sự hợp tác giữa các nhóm vận hành và phát triển.

![](https://images.viblo.asia/9df523a8-29c6-4d07-baa0-2658769ec099.png)

# Nguồn gốc của Devops ?
Có nhiều sự tích li kỳ về sự ra đời của DevOps nhưng thực tế thì nó không được tạo mới hoàn toàn mà thay vào đó, những hạt giống của DevOps đã được gieo trồng từ lâu và đã được nuôi dưỡng bởi các chuyên gia CNTT có tư duy tiến bộ trong một số lĩnh vực. Hai tiền thân chính của DevOps là:

**Quản lý hệ thống doanh nghiệp (ESM) :** Nhiều người tham gia vào định nghĩa ban đầu về DevOps là quản trị viên hệ thống (system administrators) . Các chuyên gia này đã đưa các phương pháp hay nhất của ESM đến DevOps, bao gồm quản lý cấu hình, giám sát hệ thống, cung cấp tự động và phương pháp chuỗi công cụ.

**Agile development** : Một người quan sát đã note  “DevOps có thể được hiểu là sự phát triển vượt bậc của Agile — phát triển phần mềm agile quy định sự hợp tác chặt chẽ của khách hàng, quản lý sản phẩm, nhà phát triển và (đôi khi) QA để lấp đầy khoảng trống và nhanh chóng lặp lại để hướng tới một sản phẩm tốt hơn ... Devops thừa nhận răng  việc cung cấp dịch vụ và cách ứng dụng và hệ thống tương tác cũng là một phần cơ bản của đề xuất giá trị đối với khách hàng và do đó, nhóm sản phẩm cần đưa những mối quan tâm đó vào như một mục cấp cao nhất. Từ quan điểm này, DevOps chỉ đơn giản là mở rộng các nguyên tắc Agile vượt ra ngoài ranh giới của mã cho toàn bộ dịch vụ được cung cấp ”.
# Nguyên nhân nào dẫn đến sự ra đời của DevOps ?
Không phải lúc nào dev và quản trị viên hệ thống cũng có thể cover, để ý đến mọi thứ. Nhưng về phía người dùng lại thường xuyên change request. 

+  Một mặt người dùng yêu cầu thay đổi - các tính năng, dịch vụ mới, luồng doanh thu mới - càng nhanh càng tốt
+   Đồng thời khách hàng cũng muốn có một hệ thống hoạt động ổn định không bị ngừng hay gián đoạn gì.

    =>  Điều đó tạo ra một vấn đề mà các công ty cảm thấy như họ phải lựa chọn giữa 2 phương án cung cấp các thay đổi một cách nhanh chóng và đối mặt với hệ thống hoạt động không ổn định. hoặc phương án duy trì hệ thống hoạt động ổn định nhưng cũ kỹ.

**DevOps** được tạo ra để giải quyết tình trạng khó xử này bằng cách tích hợp tất cả những người có liên quan đến việc khai thác và phát triển phần mềm -  *user, dev, tester, security , system administrators đôi khi có cả những người khác* - vào một quy trình làm việc duy nhất, tự đông hóa cao với trọng tâm chung là : *phân phối nhanh phần mềm chất lượng cao đáp ừng yêu cầu của người dùng trong khi vẫn duy trì được tính toàn vẹn và ổn định của toàn bộ hệ thống.*
# DevOps “Hoạt động” như thế nào?
**DevOps** là hoạt động thực hành của các kỹ sư phát triển và vận hành làm việc cùng nhau trong toàn bộ vòng đời của dự án, từ quá trình thiết kế và phát triển đến phát hành và hỗ trợ sản xuất

![](https://images.viblo.asia/73fea7d3-19b7-46ed-8e2c-479add3c8cf9.png)

Bắt đầu từ thiết kế và phát triển đến tự động hóa thử nghiệm và từ tích hợp liên tục đến phân phối liên tục, nhóm làm việc cùng nhau để đạt được mục tiêu mong muốn. Những người có cả bộ kỹ năng phát triển và vận hành làm việc cùng nhau và sử dụng các công cụ khác nhau cho CI-CD và Giám sát để đáp ứng nhanh chóng nhu cầu của khách hàng và khắc phục các sự cố và lỗi.
# DevOps Tools
**Planning** : Sử dụng Jira hoặc Azure DevOps Board để quản lý và lập kế hoạch thực hiện task của mình theo mô hình Agile.

**Development**: Để quản lý code, Git là công cụ số 1 để quản lý  Code version History, branches, Push and Pull. 

**Testing**: Để kiểm thử tự động, chúng ta có thể dựa vào Selenium, JUnit và Apache JMeter.

**Build, Deploy and Integration** :   Jenkins, Travis CI hoặc Bamboo, Docker để quản lý các version build app của bạn và dựa trên nhu cầu ứng dụng của bạn, cũng có thể sử dụng Maven hoặc Gradle để Xây dựng và tăng tốc phát triển.

**Operating and Monitoring** : Khi ứng dụng của bạn đã hoạt động đúng việc vận hàng và điểu khiển đóng vai trò vô cùng quan trọng nhằm đảm bảo sự ổn định của hệ thống . một số toll hỗ trợ  bạn có thể sử dụng như Nagios, Spluink hoặc New Relics.
![](https://images.viblo.asia/a898233c-f7ba-4283-85ba-142f1589628b.png)

# Lợi ích của devOps mang lại là gì ? 
**Tốc độ**

 Đây là lý do chính mà DevOps ra đời. Sử dụng DevOps cho phép các công ty có thể phát triển và triển khai các chức năng nhanh hơn nhiều, thích ứng tốt hơn với thị trường liên tục thay đổi và tăng trưởng hiệu quả hơn với kết quả kinh doanh ấn tượng. 

**Độ tin cậy** 

Đảm bảo chất lượng cho các bản cập nhật ứng dụng và nội dung thay đổi cơ sở hạ tầng để bạn có thể phân phối một cách đáng tin cậy ở nhịp độ nhanh hơn mà vẫn duy trì được trải nghiệm tích cực cho người dùng cuối. Sử dụng các biện pháp thực hành như tích hợp liên tục và phân phối liên tục để kiểm tra rằng từng thay đổi đều hoạt động chính xác và an toàn. Biện pháp thực hành giám sát và ghi nhật ký giúp bạn luôn nhận được thông tin về hiệu năng trong thời gian thực.

**Quy mô**

Vận hành và quản lý cơ sở hạ tầng cũng như các quy trình phát triển ở quy mô phù hợp. Sự tự động hóa và tính nhất quán giúp bạn quản lý hiệu quả những hệ thống phức tạp hoặc luôn thay đổi ở mức rủi ro được giảm thiểu. Ví dụ: Cơ sở hạ tầng dưới dạng mã giúp bạn quản lý các môi trường phát triển, kiểm thử và sản xuất theo cách thức hiệu quả hơn và có thể lặp lại.
                           
                        
**Cải thiện khả năng cộng tác** 

Xây dựng các team hiệu quả hơn theo mô hình văn hóa DevOps, giúp nhấn mạnh các giá trị như tinh thần làm chủ và trách nhiệm giải trình. Các nhà phát triển và các nhóm nghiệp vụ cộng tác chặt chẽ với nhau, cùng gánh vác chung nhiều trách nhiệm và phối hợp các quy trình công việc. Điều này giúp giảm thiểu tình trạng kém hiệu quả và tiết kiệm thời gian (ví dụ: giảm thời gian bàn giao giữa nhà phát triển và nhóm nghiệp vụ, viết code có xem xét tới môi trường hoạt động).

**Bảo mật** 

Nếu không có DevOps, bạn thường phải cân bằng giữa tốc độ và bảo mật, dẫn đến thời gian delivery trở nên nhiều hơn. Với DevOps, bạn có thể sử dụng các chính sách tuân thủ tự động hóacác công cụ kiểm soát được tinh chỉnh và các kỹ thuật quản lý cấu hình để duy trì tốc độ mà không ảnh hưởng đến bảo mật.

**Quản lý rủi ro**

Sử dụng phương pháp này, chúng ta có thể xác định sớm yếu tố rủi ro trong các giai đoạn của vòng đời ứng dụng. Việc phát hiện sớm bất kỳ vấn đề hoặc lỗi nào và sửa chữa hoặc khắc phục nhanh chóng giúp luôn dẫn đầu trong cuộc đua.
# Khó khăn của DevOps
Đối với những cá nhân , tổ chức lần đầu làm DevOps sẽ cần thay đổi về văn hóa và tư duy. Cũng giống như đến phòng tập gym, lúc đầu áp dụng các phương pháp mới có thể gây hại cho sức khỏe nhưng sau khi đã có thời gian làm quen với phương pháp mới . Bạn càng thực hiện các phương pháp mới thường xuyên, chúng sẽ trở nên dễ dàng hơn. Và cũng giống như luyện tập tại phòng tập, nơi bạn tập luyện cơ lớn trước cơ nhỏ, hãy áp dụng các bài tập có tác động lớn nhất trước và luyện tập chéo để phát triển sức mạnh tổng hợp
![](https://images.viblo.asia/4d333c83-2656-4a4a-8921-ba1792352598.png)

# DevOps yêu cầu thay đổi văn hóa ? 
**Về bản chất, DevOps là một nền văn hóa, một phong trào, một triết lý.**

**DevOps** không phải là một công cụ cũng không phải là một kỹ thuật. Đó thực sự là ***một sự thay đổi văn hóa về cách phát triển phần mềm***.Và, một phần chính của văn hóa **DevOps** là sự cộng tác. 

**Devops** không phải là công việc của riêng ai. Đó là công việc của mọi người. Văn hóa DevOps chỉ có thể tồn tại trong môi trường mà tất cả mọi người đều tuân theo triết lý.

Trong một tổ chức DevOps, các team làm việc cộng tác giữa các bộ phận Dev, QA và Ops với trách nhiệm được chia sẻ. Văn hóa DevOps trải rộng khắp các team làm việc trong các dự án phát triển cũng như toàn bộ tổ chức. Các team được yêu cầu tập trung vào chất lượng sản phẩm và tốc độ phân phối thông qua nỗ lực hợp tác, tự động hóa và phản hồi phản hồi từ tất cả các bên liên quan. Tổ chức được yêu cầu loại bỏ các lỗ hổng giữa các phòng ban và cho phép các team hoạt động một cách tự chủ, đồng thời áp dụng các biện pháp và chính sách quản trị tạo điều kiện cho các quy trình SDLC tự động hóa.

# So sánh giữa DevOps, Agile và phương pháp truyền thống
DevOps có mối liên quan đến các phương pháp hay mô hình khác trong lĩnh vực IT, đặc biệt là Agile và Waterfall.

Phương pháp Agile là tập hợp các nguyên tắc, giá trị và phương pháp dành cho quy phát triển ra phần mềm. Ví dụ: Nếu như bạn có ý tưởng và muốn chuyển đổi ý tưởng thành phần mềm, bạn có thể tận dụng các nguyên tắc và giá trị Agile. Nhưng phần mềm đó chỉ có thể hoạt động trong trong một phạm vi nhỏ hoăc trong môi trường testing. Bạn cần một cách thức để triển khai phần mềm vào môi trường production một cách đơn giản, nhanh chóng và an toàn. Khi đó các công cụ và kỹ thuật DevOps được phát huy tác dụng. Phương pháp phát triển phần mềm Agile tập trung vào các quy trình phát triển, nhưng DevOps sẽ giúp phát triển và triển khai theo cách thức an toàn và đáng tin cậy nhất.
![](https://images.viblo.asia/03ccfb8c-2308-4e43-99ef-989a90547cf0.png)

So sánh mô hình waterfall truyền thống với DevOps là cách để hiểu được những lợi ích mà DevOps mang lại. Trong ví dụ sau đây, giả định rằng ứng dụng ​​sẽ hoạt động sau bốn tuần và coding đã hoàn thành được 85%. Đây là lần đầu tiên ứng dụng này được launch và quy trình mua server để triển khai code vừa được bắt đầu.


| Quy trình truyền thống| DevOps
| -------- | -------- |
| Sau khi đặt hàng các server, đội ngũ phát triển sẽ tiến hành quá trình kiểm thử. Team điều hành làm các công việc giấy tờ thủ tục cần thiết để triển khai cơ sở hạ tầng.     | Sau khi đặt hàng các server, team phát triển và điều hành cùng làm việc với nhau để hoàn tất các thủ tục cần thiết để có thể setup các server.  Điều này giúp cho yêu cầu về hạ tầng được hiểu một cách cặn kẽ nhất.     |
| Chi tiết về failover, dự phòng, các vị trí trung tâm dữ liệu và các yêu cầu về lưu trữ bị sai lệch, vì không có input nào có sẵn từ team phát triển có kiến ​​thức chuyên sâu về ứng dụng.     | Chi tiết về failover, dự phòng, khắc phục thảm họa, các vị trí trung tâm dữ liệu và yêu cầu lưu trữ được hiểu một cách chính xác do các input từ team phát triển.     |
 Team điều hành không biết về hoạt động của team phát triển. Team điều hành phát triển kế hoạch giám sát dựa trên sự hiểu biết của họ     | Team điều hành biết rõ hoạt động mà nhóm phát triển đang thực hiện. Cả hai team tương tác lẫn nhau và cùng nhau phát triển một kế hoạch giám sát phục vụ cho cả IT và kinh doanh. Họ cũng chia sẻ các công cụ giám sát hiệu suất ứng dụng (Application Performance Monitoring – APM)     |
 Trước khi go-live, kiểm tải (load test) làm hỏng ứng dụng, làm chậm quá trình release.     | Trước khi go-live, kiểm tải (load test) làm chậm ứng dụng. Team phát triển nhanh chóng sửa lỗi và ứng dụng được release đúng hạn.     |

![](https://images.viblo.asia/23005b1d-4cda-4293-a3f9-834993572750.png)


# Kết Luận 
**DevOps là một văn hóa** thúc đẩy sự hợp tác giữa team phát triển và vận hành để deploy code cho production nhanh hơn theo cách tự động và có thể lặp lại

Trước DevOps vận hành và team phát triển làm việc trong tình trạng cô lập hoàn toàn.

Deploy code một cách thủ công dẫn đến việc nhiều lỗi từ phía con người .

Trong quy trình cũ, team Vận hành không biết gì về  về tiến độ của team phát triển. Vì vậy, team vận hành đã phát triển một kế hoạch mua và giám sát cơ sở hạ tầng CNTT theo hiểu biết của họ.

Trong nhóm vận hành quy trình DevOps hoàn toàn nhận thức được tiến độ của nhà phát triển. Việc lập kế hoạch và giám sát là chính xác.

DevOps cung cấp Khả năng duy trì, Khả năng dự đoán, Hiệu quả chi phí chất lượng cao hơn và thời gian đưa ra thị trường.

Quy trình Agile tập trung vào sự sẵn sàng của chức năng và phi chức năng trong khi DevOps tập trung vào khía cạnh cơ sở hạ tầng CNTT đó.

Vòng đời DevOps bao gồm Phát triển, Kiểm tra, Tích hợp, Triển khai và Giám sát.

Kỹ sư DevOps sẽ làm việc với nhân viên nhóm phát triển để giải quyết các nhu cầu về viết code và scripting.

Kỹ sư DevOps nên có kỹ năng mềm của một người giải quyết vấn đề và là một người học hỏi nhanh.

Chứng chỉ DevOps có sẵn từ các dịch vụ web của Amazon, Red Hat, Microsoft Academy, DevOps Institute.

DevOps giúp các tổ chức chuyển chu kỳ deployment code từ hàng tuần hay tháng thay vì năm.

# Nguồn tham khảo
https://aws.amazon.com/vi/devops/what-is-devops/

https://www.atlassian.com/devops

https://medium.com/cuelogic-technologies/what-is-devops-the-complete-guide-to-devops-with-examples-13db789dd1c