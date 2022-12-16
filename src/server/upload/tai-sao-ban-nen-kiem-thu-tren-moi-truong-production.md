**Kiểm thử trên môi trường production** là 1 việc cần thiết nếu bạn muốn kiểm thử phần mềm một cách chặt chẽ nhất có thể.

![](https://images.viblo.asia/4d5f1530-0326-4fe9-9d99-2641b849d93f.jpg)


Tại sao vậy? Mặc dù kiểm thử sớm trong đường ống (nghĩa là kiểm thử shift-left) là cần thiết và được khuyến khích mạnh mẽ, nhưng đơn giản là nó vẫn không thực sự đủ để đảm bảo được chất lượng phần mềm là hoàn hảo. Các công ty thực hiện các phương pháp kiểm thử agile và xây dựng nên 1 cơ sở hạ tầng dùng một lần đã sẵn sàng để thực hiện kiểm thử trong môi trường production, nó đôi khi được gọi là kiểm thử **shift-right.**

Bằng việc kiểm thử trong môi trường production, bạn sẽ tạo nên một mức độ tự tin khác trong các bản release sau khi thực hiện các kiểm tra khác nhau trong một môi trường live production. **Kiểm thử trong môi trường production** cho phép công ty thấy được một ứng dụng phản ứng thế nào với khi mà có code mới được đẩy vào trong thế giới người dùng thực. Nó sẽ trở thành một thành phần quan trọng của chiến lược chất lượng ứng dụng tương lai của bạn trong tương lai.

Dưới đây, tôi sẽ giải thích vì sao việc kiểm thử trên môi trường production là quan trọng, sau đó sẽ đưa ra các mẹo để phát triển 1 chiến lược kiểm thử **shift-right.**

### **Hãy tự hỏi: Ưu điểm của việc kiểm thử trên môi trường production là gì?**

Một sự khác biệt lớn ở đây là thay đổi các chỉ tiêu bằng cách mở rộng vòng phản hồi kiểm thử nghiệm liên tục từ dữ liệu live production và lưu lượng người dùng thực trong khi thực hiện kiểm thử trên môi trường production. Bạn sẽ tìm thấy một tập hợp các lỗi mà bạn không tìm thấy khi kiểm thử trong các môi trường kiểm thử khác (dev, staging, hoặc pre-prod). Các lỗi được thu thập ở trong môi trường production sẽ giúp nhóm phát triển cô lập các lỗi để cải thiện chất lượng ứng dụng, từ đó cung cấp một trải nghiệm khách hàng tốt hơn. 

Nó khuyến khích và trao quyền cho các Dev và SDET (software developers in test) kiểm thử sớm hơn trên môi trường production. Mục tiêu là nâng cao chất lượng bằng cách xây dựng các bản build chất lượng khác nhau xung quanh ứng dụng. 

**Dưới đây là các ưu điểm của việc kiểm thử trong môi trường production:**

* Các chương trình Beta nơi mà khách hàng cung cấp các phản hồi sớm về các tính năng mới và trải nghiệm người dùng.
* Ngăn chặn các thảm họa với kiểm thử phục hồi và khả năng phục hồi tốt hơn.  Ứng dụng có thể phục hồi từ các sự kiện mong đợi (hỗn loạn) hoặc không mong đợi mà không mất chức năng và dữ liệu.
* Thiết kế và xây dựng 1 quy trình khắc phục thảm họa sẽ giúp giải phóng các hỗn loạn trong môi trường pre-production trước khi thực hiện trong môi trường live production. 
* Bạn đang kiểm thử với dữ liệu production. (thật khó để mô phỏng theo lưu lượng và dữ liệu trên môi trường production, dẫn tới khó có thể phát hiện ra mọi tình huống có thể xảy ra để kiểm thử).
* Nó sẽ loại bỏ rủi ro của việc phát triển thường xuyên trên môi trường production khi được thực hiện hàng ngày, trong khi bạn giám sát hiệu suất ứng dụng trong thời gian thực với các công cụ như New Relic. (đại loại là nếu như có sự kiểm thử thường xuyên trên môi trường product thì việc phát hiện ra lỗi trước khi mà khách hàng báo lỗi là cao hơn)

### Các rủi ro khi kiểm thử trên môi trường production là gì?
![](https://images.viblo.asia/b23bc6a2-97dd-40f0-bbdc-464e41a6e71f.jpg)


Tuy kiểm thử trên môi trường production có nhiều ưu điểm thế nhưng nó cũng có cả những rủi ro nữa. Rủi ro cuối cùng là việc thiết kế cơ sở hạ tầng. Nó có được xem xét kỹ không? Nó có lặp lại và dùng một lần không? Nếu không thì bất kỳ kết quả dưới đây có thể xảy ra khi có hoặc không có sự kiểm thử trong môi trường production:

* Không có kế hoạch dự phòng cho trường hợp ứng dụng có nguy cơ mất dữ liệu
* Không có kế hoạch rollback khi release 1 bản mới.
* Để lộ ra những lỗ hổng tiềm năng
* Không thể phục hồi sau những sự hỗn loạn bất ngờ
* Thời gian kiểm thử gây ra trải nghiệm không tốt cho người dùng

Hãy dành chút thời gian để hiểu về thuật ngữ Devops sau đây: Thú cưng với động vật hoang dã. Để giảm thiểu rủi ro có thể xảy ra khi kiểm thử trên môi trường production thì ứng cơ sở hạ tầng của ứng dụng của bạn cần phải là 1 động vật hoang dã chứ không phải là thú cưng. Điều quan trọng là phải có 1 cơ sở hạ tầng lặp lại và dùng một lần (sử dụng Chef, Ansible, Puppet hoặc Docker) để xử lý bất kỳ tình huống nào có thể xảy ra ở trên.

### Các chiến thuật tiềm năng để kiểm thử trên môi trường production 

Mục đích của kiểm thử là ngăn chặn lỗi xuất hiện trên production. Việc tìm ra một issue sau khi ứng dụng đã được triển khai cho người dùng là quá muộn. Chúng ta nên tiếp tục kiểm thử shift left ở mọi giai đoạn của pipeline cho phép phản hồi nhanh hơn việc kiểm thử và tích hợp code. Nó cho phép các nhóm tìm ra các vấn đề càng sớm càng tốt. 

Kiểm thử trên môi trường production chỉ là một người bảo vệ chất lượng xung quanh ứng dụng của bạn. Chiến thuật mới của kiểm thử trong môi trường production là một phần quan trọng trong chiến lược kiểm thử của nhằm cung cấp các ứng dụng chất lượng cho các khách hàng. 

Tôi sẽ chia nó thành ba phần: các chiến lược triển khai, các phương pháp kiểm thử trong môi trường production và sự giám sát: 

**Các chiến lược triển khai:**
* Blue-Green Deployment (https://www.sumologic.com/glossary/blue-green-deployment/)
* Kiểm thử Canary
* Kiểm thử A/B
* Chiến lược rollback tự động

**Các phương pháp kiểm thử trên môi trường production:**
* Kiểm thử người dùng New Relic Synthetic (https://techblog.vn/gioi-thieu-ve-cac-san-pham-application-performance-monitoring-cua-new-relic)
* Kiểm thử chấp nhận Lightweight
* Kiểm thử tích hợp cơ sở hạ tầng
* Kiểm thử trực quan với Applitools
* Kiểm thử phục hồi thảm họa

**Sự giám sát**
* Hiệu năng ứng dụng trong thời gian thực với New Relic
* Alerts Policies (https://docs.microsoft.com/en-us/microsoft-365/compliance/alert-policies?view=o365-worldwide)

### 5 mẹo khi kiểm thử trong môi trường Production
1. Chia kiểm thử trên production thành các tầng:

    Trong khi chúng ta nói về ý tưởng 'kiểm thử trên môi trường production', nó bao gồm việc kiểm thử các ứng dụng chạy riêng trên nền tảng production, chạy trực tiếp các thử nghiệm với mã được triển khai 100% và kiểm thử toàn bộ danh sách test server trong trung tâm dữ liệu production. 
    
    Do đó, việc kiểm tra trên môi trường production nên được chia thành các tầng để kiểm tra các khía cạnh khác nhau của môi trường production sản xuất theo những cách khác nhau.

2. Lên kế hoạch kiểm thử ở thời điểm mà người dùng ít sử dụng: 

   Kiểm thử hiệu năng có thể có gây ra tác động lớn đến toàn bộ cơ sở người dùng. Nó có thể làm cho môi trường máy chủ không hoạt động, đó là điều không ai muốn. Chúng ta nên nghiên cứu các phân tích và xác định khi nào là thời điểm tốt nhất để lên lịch kiểm thử trên môi trường production. 

5. Thu thập dữ liệu lưu lượng truy cập gốc cho việc kiểm thử: 
      
      Chúng ta nên thu thập và sử dụng dữ liệu lưu lượng truy cập thực tế trong môi trường production (như các quy trình làm việc của người dùng, các tài nguyên và hành vi người dùng) để thúc đẩy việc tạo tải cho các testcase. Khi bạn thực hiện các kiểm thử trong môi trường production, bạn sẽ có 1 sự tự tin là hành vi mô phỏng đó là thật.

7. Tập trung giám sát: 

    Trong khi chạy 1 thử nghiệm trên production, hãy luôn luôn để mắt tới các số liệu về hiệu năng của người dùng để biết được rằng liệu việc thử nghiệm có gây ra những ảnh hưởng không thể chấp nhận đến trải nghiệm người dùng hay không. Chuẩn bị tinh thần để ngừng việc kiểm thử nếu điều đó xảy ra.
 
 
5. Tạo 1 trải nghiệm “Opt-in”: 
    
    Một cách tuyệt vời để kiểm tra ứng dụng sẽ hoạt động như thế nào với người dùng thực tế là có một số “opt-in” ở trong các bản phát hành tính năng mới. Điều này sẽ cho phép người dùng theo dõi và thu thập dữ liệu từ người dùng trong thời gian thực và thực hiện các điều chỉnh phù hợp với chiến lược kiểm thử nghiệm mà không lo ảnh hưởng tới trải nghiệm của họ.

### Kết luận
Kiểm thử ứng dụng là luôn là 1 sự ưu tiên cao đối với bất kỳ tổ chức phát triển phần mềm nào. Hầu hết các tổ chức đều ưu tiên việc kiểm thử càng nhiều càng tốt trước khi triển khai lên môi trường production để chắc chắn rằng quá trình chuyển đổi sau triển khai là trơn tru nhất có thể. 

Nhưng mà việc kiểm thử trên môi trường production có thể cung cấp một số lợi ích duy nhất cho một tổ chức DevOps mà không nên bỏ qua. Từ việc chuẩn bị đội ngũ để đối phó với các tình huống tai hại trong môi trường production đến việc cung cấp một trải nghiệm người dùng tốt hơn cho khách hàng, theo thời gian kiểm thử trên môi trường ngày càng trở thành một phần thiết yếu của thử nghiệm ứng dụng. 

Kiểm thử trên môi trường production nên là một phần của thói quen kiểm thử, có thể mở rộng và có khả năng phục hồi cao. Chúng ta cũng nên tiếp tục kiểm thử sớm và thường xuyên, và cân nhắc về việc kiểm thử trên môi trường production (hay kiểm thử shift-right) là một phần của chiến lược kiểm thử của chúng ta.

Và dù kiểm thử trên môi trường có thể sẽ gặp không ít những rủi ro vì vậy nếu bạn buộc phải kiểm thử trên môi trường production thì hãy hết sức cẩn thận. 

Chúc các bạn may mắn!
 
Bài viết tham khảo từ link:

1. https://saucelabs.com/blog/why-you-should-be-testing-in-production
1. https://saucelabs.com/blog/the-what-and-why-of-testing-in-production
1. https://techbeacon.com/app-dev-testing/test-production-yes-you-can-you-should
2. https://www.bugraptors.com/introduction-testing-production-tips-right-way/