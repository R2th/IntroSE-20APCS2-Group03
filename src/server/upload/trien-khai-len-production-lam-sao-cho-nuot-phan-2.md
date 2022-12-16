# Phần 2: Triển khai
## 1. Chuẩn bị một chiến lược để Rollback hệ thống
Đây là một việc rất quan trọng để bắt đầu quá trình triển khai. Bạn phải vạch ra được cách thức để rollback lại trạng thái của hệ thống nhanh nhất có thể, và ít lỗi nhất trong trường hợp việc deploy code mới gặp vấn đề không thể khắc phục ngay được. Với thói quen dùng git, việc đơn giản là checkout lại version trước của hệ thống trên production. Tuy nhiên, hãy đọc xuống phía dưới và thay đổi cách làm này đi, nó thực sự không phải là một best practice đâu.

## 2. Luôn luôn Backup hệ thống trước khi triển khai.
Bạn không bao giờ có thể dự đoán trước được 100% những điều sẽ xảy ra khi triển khai code lên môi trường production. Rất nhiều công ty mất khách, điêu đứng, bị kiện vì một lập trình viên đã không may làm mất cơ sở dữ liệu của khách hàng trên production. Để giảm thiểu rủi ro tới mức thấp nhất có thể, hãy tạo thói quen backup mọi thứ trước khi triển khai một phiên bản code mới. Đừng quên đưa website của bạn về chế độ maintain trước khi backup, tránh quá trình user phát sinh dữ liệu khi bạn đang backup. Sau khi backup xong, hãy cất nó thật an toàn vì sau này nó có thể sẽ cứu sống cuộc đời của bạn. Ngoài ra, cũng nên tạo thói quen backup hệ thống định kỳ để đề phòng những rủi ro khách quan như cháy nhà, hỏng ổ cứng server, máy chủ bị tấn công…

Nếu không muốn làm phiền user, bạn có thể nghiên cứu về zero-downtime deployment. Cái này phức tạp hơn một chút và tôi không tiện viết chi tiết nó trong bài này.

## 3. Chuẩn bị kỹ lưỡng môi trường.
### 3.1. Hãy hiểu rõ môi trường triển khai hệ thống
Có lẽ bạn quen thuộc với việc phát triển ứng dụng trên MacOS hoặc Window, tuy nhiên môi trường production có thể là một OS khác như BSD hoặc Linux. Chúng có rất nhiều thứ khác nhau, từ Kernel cho tới các Utilities Software. Với việc sử dụng các công nghệ ảo hóa hiện nay, việc tiếp cận và triển khai production đã dễ hơn rất nhiều, tuy nhiên hiểu rõ môi trường cuối giúp chúng ta dễ gỡ lỗi hơn trong quá trình chạy ứng dụng. Nếu bạn đang dùng một máy chủ ảo (VPS) cho việc chạy môi trường production, nó sẽ dễ hơn nếu bạn được cung cấp 1 hosting đã cài đặt sẵn phần mềm. Việc lựa chọn các phiên bản phần mềm, độ tương thích là một bài toán bạn sẽ phải đối mặt. Cách đây vài năm, việc triển khai 1 ứng dụng lên production rất phức tạp. Vì môi trường không được ảo hóa (virtualize) hay container hóa (containerize) nên rất hay xẩy ra vấn đề xung đột hoặc không tương thích phiên bản phần mềm.

Với sự phổ biển hiện nay của Cloud Computing, mỗi nhà cung cấp lại có một đặc thù riêng biệt. Nghiên cứu trước về đặc tính của các Service được cung cấp là điều bắt buộc phải làm. Thông thường các Service phổ thông như Cloud Compute hoặc Storage sẽ có một số khác biệt nhất định khi sử dụng. Bạn cần nắm được cách sử dụng và vận hành chúng trước khi triển khai ứng dụng lên đó. Đấy là lí do vì sao AWS có hẳn 1 bộ chứng chỉ cho việc vận hành hệ thống trên nền tảng của họ.

### 3.2. Đừng bao giờ đặt trứng vào 1 giỏ.
Việc hệ thống của bạn chỉ vận hành trên 1 máy chủ cũng giống như đặt nhiều trứng vào 1 giỏ vậy. Việc này sẽ xảy ra rất nhiều rủi ro nếu hệ thống Backup của bạn bị lỗi, hoặc chính server đó gặp vấn đề khi có quá nhiều người truy cập, bị tấn công hoặc cập nhật có lỗi. Lỗi đó được gọi là Single-point of failure.

Để giải quyết vấn đề này người ta sẽ cố gắng xây dựng hệ thống thành một hệ thống phân tán (distributed system), thuật ngữ được sử dụng là Scale-out (Horizontal scaling) với Load Balancing, Keep alive, Clustering, Replication… Mỗi phần của hệ thống sẽ được tách riêng và scale độc lập. Ví dụ khi bạn sử dụng AWS, bạn có thể mua riêng 1 dịch vụ để chạy MySQL có tên là RDS. Dịch vụ này cho phép bạn chạy MySQL ở một server riêng biệt, có hỗ trợ sẵn backup định kỳ, CDN ở khắp nơi trên thế giới, có thể Scale-up độc lập với hệ thống Application của bạn (PHP, Nodejs, Nginx…). Bạn hoàn toàn có thể mua và cài đặt một dịch vụ tương tự như vậy nhưng sẽ khó khăn một chút nếu bạn muốn Scale MySQL nhanh nhất có thể.

### 3.3. Đồng bộ môi trường phát triển và Production là một sai lầm.
Tôi đã từng nghe nhiều người tin vào lý thuyết “Môi trường phát triển và môi trường thật nên được đồng bộ với nhau”. Bullshit, don’t believe it. Môi trường dev, test và prod luôn luôn khác nhau. Việc đồng bộ chúng chỉ khiến cho bạn khóc vì ăn nhiều hành hơn mà thôi. Tôi lấy ví dụ, nếu bạn triển khai hệ thống bằng Docker, bạn luôn thấy rằng có rất nhiều công cụ và thư viện được cài vào image của bạn. Chúng thực sự không cần thiết khi chạy trên môi trường production, chúng sẽ gây ra tốn dung lượng và làm châm quá trình deploy của bạn thậm chí gây ra lỗi khi bạn cố gắng build chúng. Vậy cần phải làm gì? Hãy thực hiện nguyên lý “Build once deploy anywhere”, bao gồm các bước sau.

**Bước 1: Đóng gói mã nguồn. (Build artifact)**

Với PHP, hãy đóng gói mã nguồn của bạn bằng cách cài đặt sẵn các thư viện, class vào mã nguồn. Hãy đảm bảo thư mục vendor của bạn cũng được đóng gói theo mã nguồn. Chúng ta sẽ không cài bất cứ thứ gì thêm khi code được đẩy lên production server. Việc này sẽ giúp cho bạn tránh update nhầm phiên bản gây ra lỗi, cũng giúp cho việc deploy nhanh hơn vì bạn không phải cài lại thư viện mỗi lần deploy. Nó cũng sẽ giúp ích nếu server của bạn không có kết nối Internet với bên ngoài. Nếu sử dụng CI/CD, bạn hãy cố gắng dùng các build tool như Ant hay Phing để việc đóng gói được tự động và nhanh hơn.

Ngoài mã nguồn, thông tin về cấu hình cũng là một thứ mà chúng ta cần phải đem theo lên production. Bạn có thể cấu hình nó trong các file env hoặc truyền nó trực tiếp vào env của OS. Ngoài ra cũng có rất nhiều tool hỗ trợ lưu config như Vault hay Cloud-config script.

**Bước 2: Chuyển mã nguồn đã đóng gói lên các công cụ lưu trữ. (Ship/transform artifact)**

Với việc sử dụng công nghệ container, bạn có thể đóng gói trực tiếp mã nguồn vào bên trong image và đẩy lên các Registry (lưu ý là nó phải private để bảo vệ mã nguồn của bạn). Vì image cũng hỗ trợ đánh version, cho nên bạn hoàn toàn có thể chọn image mà mình cần triển khai ứng với phiên bản ứng dụng của bạn. Tôi ví dụ WordPress là một mã nguồn PHP đã được Container hóa, bạn có thể sử dụng docker pull wordpress để tải về phiên bản mới nhất của WordPress để chạy ngay mà không cần cài đặt phức tạp.

Sử dụng các image nhỏ, nhẹ (lightweight) để chạy trên production. Ví dụ thay vì dùng ubuntu, hãy dùng Alpine linux. Nó sẽ giảm dung lượng của image từ vài trăm xuống chỉ còn vài chục MB mà thôi. Việc này cũng giúp cho việc triển khai rất nhanh.

Lưu ý rằng, với production image, bạn sẽ chỉ cài những ứng dụng tối thiểu cần có để có thể chạy được mã nguồn. Tôi ví dụ nếu chạy PHP bạn chỉ cần cài php-fpm, bạn không cần cài composer, không cần wget hay apt… Bời vì mỗi 1 bước cài đặt sẽ làm cho dung lượng của image lớn thêm.

**Bước 3: Chạy mã nguồn đã đóng gói. (Run artifact)**

Khi mã nguồn đã được đóng gói và ship cùng với các image, việc của bạn bây giờ là chạy các image đó. Với việc chạy phân tán, bạn có thể sử dụng một công cụ container manager như Docker Swarm, Kubernetes để distributed các container của bạn trong một nốt nhạc.

Còn nếu bạn chỉ muốn deploy cho một server, thì chỉ đơn giản là

```
docker pull <image name>

docker run <image name>
```

### 3.4. Hãy biết rõ giới hạn của hệ thống.
Tôi nghĩ ít bạn để ý tới điều này, có lẽ vì bạn chưa từng làm việc với các hệ thống large-scale hoặc nếu có làm thì bạn cũng thường không quan tâm vì người ta hay nói “Server thì rẻ hơn Coder”. Tuy nhiên, hiểu rõ về giới hạn của hệ thống sẽ giúp bạn tính toán được trước khả năng chịu tải của server khi bạn triển khai một tính năng mới mà chưa kịp nghĩ tới việc sẽ scale up system. Tôi lấy ví dụ, 1 process PHP được tạo ra sử dụng tối đa 25MB RAM của server. Mỗi 1 request được thực hiện trong 200ms, như vậy trong 1 giây, 1 process có thể xử lý được đồng thời 5 requests. Với Server 2GB RAM = 2048MB, tôi giả sử hệ thống dùng hết 512MB cho hệ điều hành và các phần mềm khác, bạn sẽ còn 1536MB, và có thể tạo ra tối đa 62 process. Như vậy trung bình bạn có thể xử lý được 5×62 = 310 requests/giây. Tôi nghĩ nhiều bạn sẽ ngạc nhiên về con số này. Tôi cho là bạn sẽ nghĩ nó hơi ít so với những gì bạn tưởng tượng.

**Từ ví dụ trên bạn cần lưu ý 2 vấn đề:**

* Nếu tốc độ xử lý 1 request càng nhanh thì số lượng request xử lý được sẽ càng nhiều.
* Biết được giới hạn của hệ thống thông qua một vài phép tính đơn giản, bạn có thể đo lường hiệu năng ứng dụng trước khi triển khai nó lên môi trường Production.

Lưu ý rằng: Số lượng process và bộ nhớ chiếm dụng của PHP có thể setting được, cho nên bạn hãy tính toán trước để tránh việc thiếu hoặc thừa tài nguyên sao cho đạt hiệu quả tốt nhất. Ví dụ trên chỉ là 1 cách tính toán dựa trên yếu tố phần cứng là RAM, ngoài ra còn rất nhiều tham số khác như CPU, Network, Disk I/O…. bạn sẽ cần phải tính toán cẩn thận và chi tiết hơn.

## 4. Hãy sử dụng các công cụ Deploy tự động.
Một công cụ deploy tự động tốt cẩn thỏa mãn 1 số yếu tố như

* Hỗ trợ build tool và build process.
* Hỗ trợ automation & manual deploy.
* Hỗ trợ rollback strategy.

Với PHP, có một số công cụ có thể dùng như GitlabCI, Jenskin hoặc Deployer.

## 5. Đảm bảo rằng Team của bạn có mặt đầy đủ khi Deploy.
Sẽ thật nguy hiểm nếu phần Code của ai đó vắng mặt gặp lỗi hay Comtor đang bận đi ị trong lúc hệ thống chuẩn bị deploy. Hãy đảm bảo rằng bạn có đủ người hiểu về dự án cũng như đủ trình độ để xử lý bất cứ sự cố kỹ thuật nào xảy ra trong và sau quá trình deploy.

## 6. Thắp hương và nhấn nút
Chúc mừng, ứng dụng của bạn đã được triển khai thành công lên production.

Vậy là đã kết thúc phần 2/3. Tôi hy vọng nó sẽ hữu ích với bạn.

## Biển Hoàng