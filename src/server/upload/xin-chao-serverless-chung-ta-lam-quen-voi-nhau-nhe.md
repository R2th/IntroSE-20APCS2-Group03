![](https://images.viblo.asia/c110b1b8-3d73-4f98-9bd1-7bb1b4e59979.png)

**Xin chào tất cả các bạn, hôm nay chúng ta sẽ cùng nhau đi tìm hiểu về khái niệm "Không Máy Chủ" Serverless là gì nhé.**

-----

***Những nội dung có trong bài này:***

*1. Giới thiệu Serverless Computing và Serverless Architectures.*

*2. Ưu - Nhược điểm của Serverless.*

*3. Những nhà cung cấp dịch vụ Serverless Cloud Computing nổi tiếng.*

– Bài viết cũng đồng thời được Post trên trang blog cá nhân: [Series Amazon AWS](https://trungquandev.com/xay-dung-cac-ung-dung-khong-may-chu-voi-nodejs-aws-lambda-api-gateway-serverless-framework-va-dynamodb/)

-----

### 1. Giới thiệu Serverless Computing và Serverless Architectures

*" **Serverless Computing** là một mô hình thực thi điện toán đám mây mà trong đó các nhà cung cấp đám mây sẽ quản lý động việc phân bổ tài nguyên máy, giá cả của mô hình này dựa trên số lượng tài nguyên thực tế mà ứng dụng sử dụng thay vì phải trả trước một khoản nhất định trong một khoảng thời gian. Đoạn này mình đọc hiểu từ [Wikipedia](https://en.wikipedia.org/wiki/Serverless_computing)."*

Ngoài ra, **một Serverless Computing** cũng có thể được hiểu là cách mà chúng ta xây dựng lên các ứng dụng khả dụng, sẵn sàng lắng nghe và phản ứng lại với các sự kiện được đưa ra bởi các dịch vụ (services).

*"Còn **Serverless Architectures** là một kiến trúc được xây dựng dựa trên ý tưởng của **Serverless Computing**, nói chung 2 thằng này chúng ta có thể và nên gộp lại là một cho đỡ hại não, chỉ một từ thôi: **Serverless**."*

Đi vào ví dụ thực tế: **Serverless** được dùng để chỉ hai khái niệm mô hình dịch vụ khác nhau đó là:

* **BaaS - Backend as a Service:**

*"Ở mô hình này, phần lớn code logic của chúng ta sẽ chuyển về xử lý ở phía Frontend. Còn Backend thì sử dụng các API có sẵn của bên thứ ba."*

Ví dụ như bạn muốn viết một ứng dụng dự báo thời tiết, nhưng bạn lại không có những dụng cụ cần thiết như là máy đo đạc, vệ tinh...để lấy dữ liệu rồi viết code xử lý chúng. Lúc này bạn sẽ cần lấy dữ liệu thời tiết từ các **API** được Public bởi các nhà cung cấp bên thứ ba như **Google Weather API** chẳng hạn. Và từ những dữ liệu đó, bạn sẽ xử lý logic hiển thị...vv ở phía Frontend.

![](https://images.viblo.asia/a27e18f0-23df-40aa-86bc-7d41965acce3.jpg)

* **FaaS - Function as a Service:**

Mô hình này thì chúng ta lại **không sử dụng các API có sẵn từ bên thứ ba như ở BaaS**, mà chúng ta sẽ **tự viết các API** cho mục đích của mình, và triển khai chúng lên Server. Nhưng thay vì triển khai theo mô hình client-server thông thường là phải thuê Server rồi deploy code lên đó, thì chúng ta lại **deploy code dưới dạng các Function (Function as a Service)** và các function này có thể gọi dưới dạng **RestAPI**.

Với mô hình **FaaS** này, chúng ta sẽ chỉ cần viết code thôi, không cần quan tâm việc server và code được lưu trữ ở đâu, các nhà cung cấp Cloud Computing bên thứ ba sẽ tự quản lý phần này.

Một điểm nữa là chúng ta **chỉ phải trả tiền dựa trên tài nguyên thực tế sử dụng**, chứ không phải trả trước một khoản tiền cố định cho một khoảng thời gian cụ thể như việc thuê server ở mô hình **client-server** mà mình nói ở trên.

Đến đây chắc các bạn cũng có thể hình dung ra được rồi, **Serverless** - dịch ra tiếng Việt là **"Không có máy chủ"**, nhưng thực chất thì nó không đúng theo nghĩa đen đâu nhé, không có máy chủ thì làm sao mà chạy được ứng dụng :D.
Mà ở đây, không máy chủ nghĩa là bạn làm lập trình viên, **bạn chỉ cần viết code**, và **không cần quan tâm nhiều về máy chủ**, phần đó để cho các nhà cung cấp điện toán đám mây quản lý.

---

### 2. Ưu - Nhược điểm của Serverless.

**Ưu điểm:**

* **Đầu tiên là chi phí:** so với việc thuê server và trả tiền theo tháng hoặc theo năm thì Serverless lại tính phí theo thời gian và số lần gọi Function nên chi phí sẽ rẻ hơn, bạn không cần phải trả thêm phí khi mà Server không hoạt động.
Ngoài ra so với việc tự xây dựng server, thì Serverless còn giảm rất nhiều các chi phí đi kèm như bảo trì máy móc trang thiết bị...vv..

* **Dễ dàng mở rộng quy mô:** Khi số lượng request tới ứng dụng của bạn tăng cao, nếu thuê hoặc tự xây dựng server thì bạn sẽ phải nâng cấp chúng để đảm bảo tốc độ cho ứng dụng, điều này sẽ tốn nhiều thời gian và nhân lực. Ngược lại, trong mô hình Serverless, các nhà cung cấp bên thứ ba sẽ tự lo liệu hết, họ sẽ tự mở rộng thêm các tiến trình và tài nguyên để cân bằng tải khi có nhiều request.

* **Deploy code đơn giản hơn:** Bạn sẽ cần có kiến thức xây dựng, triển khai, cấu hình code lên server và bảo trì chúng trong mô hình client-server. Còn với Serverless, chỉ cần đẩy code lên, mọi việc còn lại đã có nhà cung cấp dịch vụ xử lý.

* *"Bây giờ mới nghĩ đến, nếu mà mấy cái trang đăng ký tín chỉ của trường mình nó dùng mô hình **Serverless** này thì có phải đỡ bị chết những đợt cao điểm không =))"*

* À còn cái nữa, **Serverless** cho phép chúng ta xây dựng các ứng dụng khác nhau tùy mục đích, như các ứng dụng chuyên xử lý request/response hoặc các ứng dụng xử lý hàng loạt (batch processing).

**Nhược điểm:**

Rõ ràng không có gì là hoàn hảo cả, đi kèm với ưu điểm thì Serverless vẫn còn những nhược điểm như:

* Khó khăn cho việc phát triển code ứng dụng ở máy local.

* Nếu không làm việc ở máy local, thì khi cần 1 thay đổi nhỏ, bạn cũng sẽ phải đẩy code lên máy chủ để chạy thử code, như vậy sẽ tốn thời gian phát triển hơn vì phải đợi và chính việc phát triển code như vậy cũng sẽ làm bạn mất đi một khoản chi phí lúc phát triển nữa.

* Khi phát triển ứng dụng, bạn cần để ý tới các dependencies, càng nhiều dependencies thì việc upload ứng dụng của bạn lên càng mất nhiều thời gian.

* Không biết được code của bạn nằm ở đâu cả, tạo cảm giác không an toàn, biết đâu có hacker nào tấn công được vào các máy chủ, thì việc code của bạn bị lấy hoặc sao chép là điều có thể xảy ra.

* Về hiệu năng có thể không nhanh được bằng server riêng bởi code được chạy mỗi khi có yêu cầu, sẽ mất khoảng 20-50 millisecond để start request.

* Về việc Debug code nữa, những tài nguyên như CPU hay RAM chỉ được quản lý ở bên phía nhà cung cấp dịch vụ cloud nên chúng ta khó tái tạo lại môi trường ở máy local để debug ứng dụng.

---

### 3. Những nhà cung cấp dịch vụ Serverless Cloud Computing nổi tiếng.

**[AWS Lambda:](https://aws.amazon.com/lambda/)** Đây là dịch vụ cloud computing thứ ba của Amazon, nó khác so với 2 dịch vụ còn lại là EC2 (Elastic Compute Cloud) và ECS (Elastic Container Service).

**AWS Lambda** là một mô hình **event-driven**, nền tảng **Serverless** trên **AWS** này sẽ thực thi mã của bạn rồi phản hồi lại các sự kiện. Nó sẽ quản lý cơ sở hạ tầng cơ bản và tăng hoặc giảm chúng tùy theo lượng yêu cầu xử lý sự kiện của ứng dụng.

Hiện tại, **AWS** hỗ trợ các ngôn ngữ là: **Node.js** (JavaScript), **Python**, **Java** (Java 8 compatible), **C#** (.NET Core) và **Go**.

Ngoài ra còn 2 thằng nữa khá lớn và nổi tiếng đó là **[Azure Functions](https://azure.microsoft.com/en-in/services/functions/)** của **MicroSoft** và **[Cloud Functions](https://cloud.google.com/functions/)** của **Google**. Hai dịch vụ này thì mình chỉ giới thiệu qua vậy thôi vì mình cũng chưa dùng qua :D

---

Như vậy là chúng ta đã xong phần làm quen với **Serverless** rồi, hẹn gặp lại các bạn ở bài tiếp theo chúng ta sẽ đi [xây dựng một **REST API** trên giao diện **web console** của **Amazon AWS**](https://trungquandev.com/xay-dung-mot-rest-api-voi-nodejs-lambda-va-api-gateway-su-dung-aws-web-console/) nhé.

Cảm ơn các bạn đã dành chút thời gian xem bài viết của mình!

**[Best Regards – Trung Quân – Green Cat](https://trungquandev.com)**

---

Tài liệu tham khảo:

https://aws.amazon.com/lambda/faqs/

https://en.wikipedia.org/wiki/Serverless_computing

https://github.com/shekhargulati/hands-on-serverless-guide/blob/master/01-aws-lambda-serverless-framework/01-introduction-to-serverless.md

**“Thanks for awesome knowledges.“**