Tưởng tượng nè.

Bạn có một ý tưởng tuyệt vời, bạn sẽ là một Elon Musk hoặc Mark Zuckerberg số hai (hoặc ba, hoặc n). Bạn hoàn thành app, bạn viết Dockerfile ( vì bạn quyết định chạy app trong containers -> vì bạn tìm hiểu, thấy nó có ích, hoặc vì bạn thấy mọi người đều làm vậy (ఠ్ఠ ˓̭ ఠ్ఠ) ). App chạy ổn trên máy tính của bạn, tuyệt vời! Giờ bạn quyết định tung ra thị trường, bạn bàng hoàng (Bàn hoàn? Bàng hoàn? XD), rất nhiều sự lựa chọn: docker compose, docker swarm, kubernetes, cloud container services, etc. Vậy bạn sẽ dùng gì?

Mình không biết, bạn là bạn mà? ¯\_(ツ)_/¯

Nhưng bạn có thể đọc qua bài này, rồi quyết định xem thích dùng gì. ¯\_(ツ)_/¯

### Docker compose

Hồi đầu mới học docker, mình hay chạy ```docker run abc --network --join etc ...``` =)). Để kết nối các service thì mình viết một list các câu lệnh ```docker network create, docker volume create, docker run``` rồi nhét nó vô scripts. Xong chạy. Mình thấy mình ngầu. Xong mình biết tới docker-compose. Mình thấy mình cùi. (￢_￢;)

Vì sao nó lại cùi? Vấn đề đầu tiên là nó không repeatable. Đó là trước khi deploy lại. Bạn phải kiểm tra xem ví dụ như network A, volume B đã tồn tại chưa? Rồi xóa nó đi. Chưa nói tới nếu chẳng may script lỗi giữa chừng, xuất hiện tình trạng deploy nửa vời thì sẽ rất ngusi. ¯\_(ツ)_/¯

Vậy nên nếu bạn muốn deploy cả cái **stack** application của bạn trên **một server**. Bạn có thể dùng docker-compose.

Docker compose thường có hai phần. Phần để describe tất cả components của application và phần describe **how they connect together**. Format của file sẽ làm **YAML** (Tất cả các services trên đều dùng yaml). Mình sẽ không nói sâu về cách sử dụng, vì đây không phải turtorial về cách dùng docker-compose ¯\_(ツ)_/¯

Về mô hình chung. Bạn có thể chạy các lệnh ```up``` và ```down``` để tạo services, hủy services, update services. Docker compose cho phép bạn chạy multiple copies của containers trên **1 server**. Ví dụ như bạn có app webA. WebA có hai version 1 và 2. Bạn có thể deploy cả 2 version trên cùng một server. Tất nhiên số port phải khác nhau ¯\_(ツ)/¯  (Ví dụ như 8081:8080 và 8082:8080).

Nhìn mô hình chung thì độ reliability của docker compose rất ổn, nhưng chúng ta cẩn hiểu là nó ổn trên **một server**. Vậy nên nếu server của bạn biến mất, mọi thứ cũng sẽ biến mất. 

### Container Orchestration

Dùng cloud là chúng ta nói tới scale. Khi bạn hướng tới đưa sản phẩn ra thị trường, bạn nên suy nghĩ tới orchestration. Điều đó không có nghĩa là bạn chỉ dùng orchestration khi bạn dùng cloud. Ví dụ bạn dùng on premise đi. Bạn mua vài cái server về, nối chúng với nhau. Bạn muốn quản lí tất cả services trên một server? Bạn dùng orchestration. Nghĩ đơn giản là bạn join tất cả lại thành một cụm cluster lớn. Để manage cluster thì bạn dùng container orchestrator. Về mặt bằng chung thì chúng đều có dạng là: Master node và worker node. 

Bên trong master node thì sẽ là control plane. Control plane sẽ bao gồm database (thường là dạng noSQL), filtering, query node, API... Về phần high level, chúng ta có thể (mặc định) chúng đều giống nhau. ¯\_(ツ)/¯ 

Nếu bạn đã từng nghe về VM sprawl, thì ... ừ, cứ nghĩ đây là một dạng VM sprawl, kiểu siêu to. Container sprawl =)).

### Docker Swarm

Viết tạo swarm giờ đơn giản hơn nhiều. Chỉ cần ```docker swarm init``` là xong. Nếu là ngày xưa thì phải chọn DB nè ( có thể là consul, etcd, zookeeper), sau đó tải swarm image về nè, kết nối nè, xong add node vào cluster nè. Vân vân và vân vân. 

Vậy điểm hay của Swarm là gì? bạn có thể chạy multiple replicas của backend nè, load balancing request được chia đều nè, scale ổn nè. Bạn có thể store secret nè. Nếu có container nào bị lỗi, docker swarm sẽ tự động thay thế nè (auto healing). Khi dùng Docker Swarm's ingress network, bạn thậm chí có thể chạy **multiple containers that are all listening on the same port** nè. **even if multiple containers are running on the same server** nè. Bạn có thể đi theo hướng hybrid, nửa on premise nửa cloud nè. Update container cùng lúc và rolls out cùng lúc nè.

Nói thật thì nếu bạn làm việc ở phần abstract level, bạn thật sự không cần chú tâm tới infrastructure. Bạn chỉ việc gửi command tới cluster API. Chúng sẽ hoàn thành việc còn lại. 

### Kubernetes

Kubernetes là một trong những container orchestration nổi tiếng nhất. Về mặt khái niệm: Pod, node, replicaset, stateful vs stateless, deployment, package manager etc, mình xin phép không nói tới, vì mình không tự tin sẽ đưa ra khái niệm chính xác nhất. Và mình nghĩ các bạn hoàn toàn có thể tìm thấy chúng ở bất cứ đâu. Tuy nhiên, mình có thể nói qua một vài lợi ích của Kubernetes.

Về mô hình chung, Kubernetes model có vô vàn thứ tuyệt vời. Bạn store config và secret và K8s elements nè, isolate app bằng namespace nè, model compute với pod, replicaSets và Deployments nè. Tính chất resilience tuyệt vời nè (Ví dụ bạn rollout một pod không healthy, nó sẽ lập tức pause lại). App có thể stay online với lượng scale nhất định cực ổn định. Loose coupling giữa Pods và services tuyệt vời. Nếu bạn có tìm hiểu hiểu về deployment strategy, thì Kubernetes cũng gần-như-là đưa cho bạn một dạng như canary deployment. Một điều tuyệt vời khác của Kubernetes là độ standardized platform. Tức nếu app của bạn chạy ổn trên laptop của bạn, nó sẽ chạy hoàn toàn như vậy ở bất kì đâu.

Kubernetes rất phức tạp. Nó hoàn toàn xứng đáng để bạn mất một thời gian rất dài để tìm hiểu. Bạn có thể tìm hiểu thêm qua trang chủ, tự tin thì thi KCA. Mình cũng đang học dần dần. 

### Kết ?!

Như mình nói ở đầu bài viết, việc lựa chọn là của bạn. Biển học vô bờ. Mình biết có rất nhiều cloud services offer container orchestration như AKS, Google's Kubernetes Engine,  Elastic Container Service ,etc, nhưng quay đi quẩn lại core vẫn như nhau. Bạn nên chọn cái mình thấy thích, thấy hợp, và đi theo nó. Thực sự ngành IT là một ngành khắc nghiệt, nó sẽ khiến bạn có imposter symstom ( cảm giác mình bị ngusi). Việc update thông tin mới là cần thiết. Và còn phải nhanh nữa. Chúc các bạn vui vẻ. 

À nếu bạn thấy chơi chán mấy cái mình kể rồi. Có thể chơi thêm **Serverless Containers**. Thú vị không kém =)).

Somewhere, xx-xx-20xx

Rice