Trong bài chia sẻ hôm nay, tôi sẽ giới thiệu với các bạn cách sử dụng kỹ thuật Serverless của AWS để lưu trữ và phục vụ các Microfrontends cho các ứng dụng frontend.

Ngày nay, việc phát triển Microfrontends cho các ứng dụng web ngày càng trở nên phổ biến. Như chúng ta đều biết, việc giữ cho frontends nhỏ như Microsfrontends thì nó đã có những thăng trầm. Bên cạnh đó, việc quản lý vòng đời và triển khai chúng quả là một thách thức.

Nhưng bạn đã biết đến công nghệ Serverless chưa ? Nếu đã nghe đến thì bạn đã bao giờ cân nhắc đến việc sử dụng công nghệ Serverless để vượt qua những thách thức này chưa?

Dưới đây là kiến trúc cho giải pháp Serverless:

![](https://images.viblo.asia/1a0537f8-fd86-4fcc-ae11-68962c71f43e.png)

Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách sử dụng công nghệ Serverless của AWS để lưu trữ và phục vụ các Microfrontends của chúng ta.

*Một lưu ý nhỏ*: Để giữ cho giao diện người dùng nhất quán qua các microfrontends khác nhau và để tiết kiệm thời gian phát triển, mình khuyên bạn nên chia sẻ và tái sử dụng lại các UI component người dùng bằng các công cụ như [Bit](https://bit.dev/) ( Github ).

![](https://images.viblo.asia/8a25ceae-3546-4a43-ac41-653b47438923.gif)

## Hosting Microfrontends

![](https://images.viblo.asia/dff68658-c052-4078-b4c5-d04e994a76de.png)

Ngược lại với việc sử dụng container cho Microfrontends, giải pháp thay thế tốt nhất trong AWS là sử dụng Amazon Simple Storage Service (S3). Sử dụng Amazon S3, chúng ta có thể lưu trữ tất cả các assets tĩnh giao diện người dùng của mình, bao gồm HTML, JavaScript, CSS, Fonts &, v.v. Một trong những lợi thế chính của việc sử dụng Amazon S3 là cơ sở hạ tầng bên dưới cung cấp 99,99% cho tính khả dụng cao để phục vụ các Microfrontends của chúng ta bằng cách mặc định.

Nhưng có một hạn chế. Bạn chỉ có thể lưu trữ các chúng (không [SSR](https://medium.com/@baphemot/whats-server-side-rendering-and-do-i-need-it-cb42dc059b38)) trên Amazon S3.

Tuy nhiên, nó lại phù hợp với hầu hết các frontend framework hiện đại như Angular, ReactJS, VueJS, có thể sử dụng chúng để xây dựng các Microfrontends.

### Một vài tips cho việc sử dụng S3 cho Microfrontends

* Sử dụng các buckets riêng biệt cho mỗi Microfrontend - điều này sẽ giúp bạn giữ riêng biệt từng vòng đời của Microfrontend với nhau. Nó cũng sẽ cho phép bạn set quyền truy cập cho từng nhóm đối tượng với mức độ chi tiết cao hơn.
* Không phục vụ trực tiếp các Microfrontends bằng Static Site Hosting - khi phân phối các Microfrontends từ Amazon S3, việc sử dụng Static Site Hosting sẽ public frontend của bạn với mọi người trên thế giới mà không có bất kỳ kiểm soát đi kèm nào như hạn chế địa lý. Bên cạnh đó, nó sẽ buộc bạn sử dụng chia sẻ request cross-origin (CORS) mà không để lộ toàn bộ ứng dụng đang sử dụng bằng một miền duy nhất. 
* Đảm bảo việc upload của các phần mềm độc lập với các bucket Amazon S3 lưu trữ Microfronends - sử dụng các buckets Amazon S3 riêng để tải tệp lên từ ứng dụng web, bên cạnh việc sử dụng các bucket được phân bổ cho Microfrontends.
* Sử dụng các bucket riêng biệt cho từng phiên bản (version) - khi triển khai Microfrontends, hãy sao lưu từng gói triển khai trong một bucket riêng biệt. Giữ phiên bản sao lưu của các thao tác triển khai sẽ cho phép chúng ta khôi phục hoặc triển khai phiên bản trước nếu có bất kỳ sự cố nào. Tuy nhiên, việc sử dụng tính năng tạo phiên bản Amazon S3 có sẵn có thể làm phức tạp mọi thứ cho Microfrontends vì mỗi tệp trong bucket được tạo phiên bản riêng biệt.

## Serve and caching Microfrontends

![](https://images.viblo.asia/5b77c0fe-bbf7-4496-ac37-9ce66f3051d6.png)

Amazon CloudFront là một trong những *core-service* đóng một số vai trò khi phục vụ Microfrotends cho thế giới bên ngoài. Một trong những tính năng rõ ràng mà chúng ta nhận được là khả năng của *Content Delivery Networking ([CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/))* để lưu các Microfrontends vào bộ nhớ cache gần hơn với end-user. Bên cạnh đó, Amazon CloudFront cũng cung cấp cổng định tuyến các yêu cầu đến các Microfrontends khác nhau. Tính năng này khá hữu ích vì chúng ta có thể định tuyến cả yêu cầu Microfrontend và Microservice ở một nơi, loại bỏ nhu cầu về các dịch vụ cổng riêng biệt.

### Các tính năng hữu ích của Amazon CloudFront cho Microfrontends

* Content delivery networking (CDN) - cho phép lưu nội dung tĩnh vào bộ nhớ đệm gần hơn với người dùng cuối, tăng tốc độ tải Microfrontend.
* Gateway and Routing - Định tuyến cấu hình để định tuyến các yêu cầu đến từ trình duyệt tùy thuộc vào URL (Có thể định tuyến nâng cao bằng **[Lambda@Edge](https://aws.amazon.com/lambda/edge/)**)
* Web Security Firewall - Cung cấp khả năng kết nối tường lửa ứng dụng web với cấu hình tối thiểu để bảo mật.
* Tạo HTML động - Cho phép thêm nội dung động cho các Microfrontends bằng Amazon Lambda@Edge. Ví dụ: bạn có thể sửa đổi HTML được phân phối thông qua Amazon CloudFront bằng cách viết một số đoạn code.
* Cung cấp nội dung có tính khả dụng cao — Provides geographical redundancy serving the Microfrontends with high availability.
* SSL Termination - điểm duy nhất để bên ngoài truy cập cho phép thiết lập chứng chỉ SSL miễn phí bằng AWS Certificate Manager (ACM) cũng như kết thúc SSL.

## Deployment Lifecycle of Microfrontends

Khi sử dụng Amazon S3 và CloudFront cùng nhau, bạn cần cân nhắc việc làm mất hiệu lực bộ đệm CloudFront cho mỗi lần deployment, trừ khi bạn tạo tên tệp mới cho mỗi mỗi lần deploy mới.

Nếu cần, có thể làm mất hiệu lực bộ đệm CloudFront bằng cách sử dụng các lệnh CloudFront CLI. Những lệnh này bạn có thể thực thi trong quá trình build cho mỗi lần deployment mới.

Bên cạnh đó, điều cần thiết là phải xem xét quản lý tính khả dụng cao của Microfrontneds trong quá trình deploy. Hãy cùng xem xét các step sau mà chúng tôi có thể sử dụng cho các lần deploy:

1.  Add a new files -> Invalidate CloudFront cache -> Delete the old files
2.  Delete the old files -> Add new files -> Invalidate CloudFront cache

Trong trường hợp cụ thể này, trình tự đầu tiên được ưu tiên hơn trình tự thứ hai, với trình tự thứ hai có khả năng [downtime](https://en.wikipedia.org/wiki/Downtime) nếu một khách hàng truy cập vào Microfrontend  trong khi đang deploy.

Nguồn tài liệu: https://medium.com/@baphemot/whats-server-side-rendering-and-do-i-need-it-cb42dc059b38
https://blog.bitsrc.io/serverless-microfrontends-in-aws-999450ed3795