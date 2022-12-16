## Giới thiệu
Chào các bạn tới với series về Serverless, ở [bài trước](https://viblo.asia/p/serverless-series-golang-bai-6-using-cloudfront-and-lambdaedge-for-static-caching-bJzKmdeD59N) chúng ta đã nói về cách sử dụng CloudFront để tăng tốc độ tải trang cho một trang Single Page Application, thì có bạn nhắn hỏi mình làm sao để thêm một domain có sẵn thay vì xài domain của CloudFront. Thì mình sẽ viết bổ sung thêm phần này để hướng dẫn cách thêm một custom domain vào CloudFront, nên bài này cũng sẽ ngắn thôi.

Trước khi tiến hành thêm custom domain vào CloudFront, thì yêu cầu ta có những thứ sau:
+ Một domain thuộc quyền quản lý của bạn (ở bài này mình sẽ dùng hostinger).
+ SSL/TLS certificates được quản lý bằng AWS Certificate Manager.

## AWS Certificate Manager
Là một dịch vụ của AWS cho phép ta dễ dàng cung cấp, quản lý và triển khai public and private Secure Sockets Layer/Transport Layer Security (SSL/TLS) certificates mà sẽ được các dịch vụ khác của AWS sử dụng, như là Application Load Balancer, CloudFront, v...v...

![image.png](https://images.viblo.asia/0607b86b-27dc-49c3-9684-1e1d4db494ad.png)

Ở bài này thì khi ta sử dụng custom domain, thì CloudFront bắt buộc SSL phải được quản lý bằng ACM Certificate hoặc IAM Certificate thì nó mới chịu. Vì vậy ta cần phải sử dụng ACM để tạo ra một SSL cho domain của ta.

## Add custom domain
Oke, để thêm domain vào CloudFront, ta thực hiện các bước sau.
1. Truy cập vào CloudFront https://console.aws.amazon.com/cloudfront.
2. Bấm vào CloudFront có sẵn của bạn.
3. Ở Tab **General**, phần **Settings**, bấm vào nút **Edit**.
4. Ở form Settings, bạn điền vào ô **Alternate domain name (CNAME)** là tên domain của bạn, sau đó nhấn vào **Request certificate**, nó sẽ dẫn ta qua phần quản lý SSL của ACM.

![image.png](https://images.viblo.asia/26310e28-060e-40a7-8d4c-3d9012e52c1c.png)

5. Ở phần ACM, chọn **Request a public certificate**, bấm **Next**.

![image.png](https://images.viblo.asia/2de9609c-a7a0-4672-a9fa-d9aee9f92d27.png)

6. Ở phần Fully qualified domain name, nhập vào tên domain của bạn. Mình sẽ nhập là `*.webk8s.com`.

> Đây là kiểu wildcard domain, khi bạn nhập như vậy thì nó sẽ request SSL cho tất cả các domain mà được suffix bằng `.webk8s.com`. Ví dụ: `dev.webk8s.com, testing.webk8s.com, staging.webk8s.com, api.webk8s.com` tất cả đều hợp lệ. Còn nếu bạn muốn chỉ request SSL cho `webk8s.com` thì nhập vào là `webk8s.com`.

Lúc này thì request của bạn sẽ ở trạng thái **Pending validation**.

![image.png](https://images.viblo.asia/860e4943-4c52-491d-8063-5a2df01d0416.png)

Bấm vào SSL ta vừa request, ở mục domain, ta sẽ thấy có hai giá trị là **CNAME name,
CNAME value**. Ta sẽ sử dụng hai giá trị này.

![image.png](https://images.viblo.asia/465c2a2f-b1d7-4871-8252-67d354c2ee70.png)

7. Truy cập vào trang quản lý domain của ta. Ở chỗ thêm DNS records, ta sẽ thêm vào hai record.

Thứ nhất là CAA record, ta nhập như sau, Type chọn CAA, Name để là @, Flag là 0, Tag chọn issuewild, CA domain nhập vào `amazon.com`. Sau đó bấm Add Record.

![image.png](https://images.viblo.asia/035fd901-45da-4819-a33d-d5673bc92685.png)

Thứ hai là CNAME record. Type chọn CNAME, Name ta copy mục CNAME name của ACM với giá trị là `_07cf0e1f2abcbe8bdbccd547463494c7.webk8s.com.` và dán vào, Target là CNAME value của ACM với giá trị là `_88222a8dfc64eece922d45cf092d5180.cnsgthfrdk.acm-validations.aws.`. Bấm Add Record.

![image.png](https://images.viblo.asia/8bd86d2f-083f-4080-b4d8-a775e40e7519.png)

Chắc chắn là bạn thấy có hai record này sau khi tạo xong.

![image.png](https://images.viblo.asia/d8744bfd-8879-4d7d-8a4d-675d304242c9.png)

Đợi một chút và ta sẽ thấy mục Status của Request SSL thành Success, lúc này ta đã có thể sử dụng được.

![image.png](https://images.viblo.asia/a3dc805b-0843-4f93-8855-6fe965f56700.png)

8. Trở lại Console của CloudFront. Ở phần Custom SSL certificate, bấm nút refresh, mở select ra ta sẽ thấy SSL ta vừa request ở mục ACM. Chọn nó.
9. Xong ở mục Security policym chọn TLSv1.2_2021, và kéo xuống cuối bấm **Save changes**.

![image.png](https://images.viblo.asia/4d736cff-1cad-45db-bbe4-2820049280dd.png)

10. Lúc này ở Tab **General**, mục **Settings**, phần **Custom SSL certificate**, ta sẽ thấy custom domain của ta đã được thêm vào.

Vậy là ta đã thêm custom domain vào CloudFront thành công. Bước cuối, để khi user truy cập vào domain của ta, nó sẽ dẫn tới CloudFront được, ta sẽ thêm vào 1 record ở bên trang quản lý domain của ta.

11. Ở mục Tab **General**, mục **Details**, phần **Distribution domain name**, copy tên domain của CloudFront. Truy cập vào trang quản lý domain, Type chọn CNAME, Name nhập vào domain của bạn, Target là domain của CloudFront, bấm Add Record.

![image.png](https://images.viblo.asia/5b5c5ca4-fb35-4a65-91d5-3a615042ace4.png)

Oke, giờ thì ta đã hoàn thành công việc thêm custom domain vào CloudFront 😁. Truy cập vào domain của bạn thì ta sẽ thấy nó sẽ dẫn tới trang SPA của ta.

## Kết luận
Để thêm custom domain cho CloudFront, cần phải có SSL được quản lý từ ACM, ACM là một dịch vụ của AWS giúp ta quản lý và tự động renew SSL một cách rất dễ dàng. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo.

## Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.