Xin chào các bạn, lại là mình đâyyyy, các bạn vẫn còn nhớ mình chứ  🤝🤝

Sau một thời gian thai nghén lâu lắm rồi, thì bây giờ mình mới ra được bài đầu tiên về series Kubernetes, trước giờ muốn viết muốn chia sẻ với các bạn nhiều lắm về 1 tool tuyệt vời như này, nhưng cứ chần chừ lần nữa mãi và cũng khá bận, đợt này tranh thủ rảnh là phải ngồi xuống chia sẻ với các bạn ngay.

Ở bài này mình sẽ giới thiệu tới các bạn tổng quan về kubernetes và các thành phần liên quan, rồi ta sẽ đi sâu vào các thành phần cần thiết ở các bài sau nhé :)

# #0: Tại sao mình làm series này trong khi đã có nhiều ngoài kia?
Trước khi làm series mình đã khá đắn đo, thứ nhất là ngoài kia đã có nhiều series về Kubernetes (mặc dù hầu hết là tiếng anh), thứ nữa là vì nó cũng hơi nâng cao một chút, và để học tập Kubernetes 1 cách tốt nhất thì ta phải có resource để học, resource thật, chạy trên cloud các thứ chứ không phải local, có nhiều node để giống với lúc chạy production nhất. 

Kiến thức về nó thì cũng có vẻ không phải anh em newbie nào cũng dễ nắm bắt vì hiểu biết về container là yêu cầu bắt buộc, [series học Docker](https://viblo.asia/s/jeZ103QgKWz) của mình có rất nhiều nhưng không chắc các bạn có xem được hết. Rồi cần phải thực hành rất nhiều để có kinh nghiệm thực chiến.

...bla blo

Nhưng nhìn đi nhìn lại thì mình thấy các series viết bằng tiếng việt thì mọi người viết nó hơi nâng cao quá, đi thẳng vào những khái niệm khá nâng cao, và đi chuyên sâu về Kubernetes mà mình nghĩ không phải ai cũng dễ tiếp cận.

Và mục đích cả trang blog của mình là giúp anh em dev Việt Nam, có nhiều bạn đọc gợi ý mình làm về chủ đề này nữa, nên kết quả là ta có series này :D.

Mình là người học "thực dụng" nên mình sẽ đi vào những thứ rất cơ bản, đủ để ta có thể deploy và quản lý app trên Kubernetes trước, những thứ mà ta thực sự và thường xuyên sử dụng. Sau đó là tới các phần nâng cao. Còn mấy cái râu ria nếu có thời gian mình sẽ nói thêm, và các bạn cũng tự tìm hiểu nhé.

Hết phần luyên thuyên :D
# Kubernetes says Hi 😊
## Phát âm
Đầu tiên chúng ta cùng học cách phát âm tool này như thế nào nhé :D. Mình thấy có 1 vài cách phát âm:
- Kiu-bơ-nấy-tịt-s
- Kiu-bơ-nà-tịt-s: đây là cách mình thích vì đọc nó khá là mượt, đọc đc nhanh hơn nghe cũng hay và nhẹ nhàng hơn, nếu là tiếng Anh Mỹ thì còn có thể đọc là "Kiu-bơ-nà-địt-s", sorry các bạn mình không cố ý nói tục 🤣🤣, nhưng mà mình hay nói theo kiểu anh mỹ ;)

Kubernetes người ta cũng hay viết tắt là K8S nữa, nên để ngắn gọn thì từ giờ về sau mình sẽ dùng chủ yếu K8S nhé
## Vấn đề hiện tại
Như đã trình bày về những điều tuyệt vời mà Docker mang lại ở bài [Lí do tôi yêu Docker](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n#_docker---hello-beauty-0), việc deploy app bằng Docker đã giúp giải quyết rất nhiều vấn đề tồn đọng theo kiểu deploy truyền thống từ ngày xưa.

Vậy nhưng khi chạy những app được dockerize ở production thì có nhiều vấn đề cần giải quyết:
- như các bạn thấy, mỗi lần muốn có cập nhật mới thì ta phải `docker compose down` xong rồi `up` lại, khoảng thời gian giữa lúc down và up thì app của chúng ta bị shutdown, không hoạt động được
- làm sao để có thể auto scale app lên được theo những thông số cụ thể: traffic nhận vào, CPU/RAM tăng cao,...?
- deploy xong thấy có lỗi thì làm sao ngay lập tức quay lại bản cũ?
- app đang chạy mà gặp lỗi bị down thì làm sao restart lại nó? nếu HEALTHCHECK mà fail thì không nên mở cho traffic đi vào,...
- quản lý volume
- phân quyền, tách biệt các projects với nhau...
- trường hợp tồi tệ hơn đấy là server của chúng ta bị down, lúc đấy thì  "người ơi chẳng còn lại gì" 😂
- ......và còn nhiều nữa
## K8S được sinh ra từ đó
Với những vấn đề trên thì K8S được sinh ra để giải quyết tất cả chúng.

Theo định nghĩa trên trang chủ của K8S thì: K8S là "container orchestration" - hệ thống điều phối container giúp tự động hoá việc triển khai (deploy), scale và quản lý (manage) các ứng dụng chạy trên nền container.

K8S giúp ta giải quyết tất cả những vấn đề bên trên và còn rấttttttt nhiều nữa, nếu các bạn sau này muốn đi sâu hơn (vọc vạch hoặc theo ngạch Devops) :)

K8S thì [free và open source](https://github.com/kubernetes/kubernetes) ngày trước ban đầu được phát triển bởi google nhưng giờ được donate cho tổ chức tên là [Cloud Native Computing Foundation](https://www.cncf.io/) - tổ chức chuyên maintain các project chạy trên cloud

Ta có thể tự khởi tạo, chạy 1 K8S cluster nhưng thường thì mình thấy ít ai làm vậy, trừ khi công ty lớn lắm, cần manage nhiều lắm thì mới tự quản lý, còn lại thì dùng luôn các dịch vụ của các cloud cung cấp (GKE, AKS, EKS,...)
## K8S và Docker Swarm
Có bạn thắc mắc là nom Docker Swarm hình như cũng giải quyết những vấn đề tương tự rồi mà nhỉ? Sẵn đang dùng Docker rồi thì tiện dùng luôn Docker Swarm, âu cũng là Docker dễ tiếp cận.

Theo những gì mình thấy và tìm hiểu thêm, thì với những app và kiến trúc phức tạp thì K8S làm tốt và phù hợp hơn, trong khi Docker Swarm hướng tới sự đơn giản khi sử dụng.

# Những ai đang dùng Kubernetes
Cả thế giới 🤣🤣

.....

Đùa các bạn chút. Nhưng đúng là hiện tại K8S phổ biến và áp đảo thật, gần như nó có mặt khắp mọi nơi, các công ty từ lớn đến bé đều dùng K8S để deploy và quản lý các app của họ vì nó làm rất tốt việc đó.

Phiên bản Enterprise của nó là Openshift cũng được dùng rất nhiều ở các công ty, tập đoàn lớn. Ví dụ ngân hàng chỗ mình làm cũng dùng 100% Openshift

# Để bắt đầu với K8S thì cần gì?
Kiến thức về Container là bắt buộc, cụ thể là những kiến thức mình đã viết ở [Series học Docker](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) - đương nhiên rồi ;). K8S sinh ra để quản lý các app container mà.

Và cần có K8S cluster để thực hành, cái này mình sẽ nói thêm ở bài sau nhé

# Tổng quan những thứ ta sẽ học ở series này
Vì K8S nó bao gồm ti tỉ thứ, vô biên bạt ngàn, mình sẽ gắng cover càng nhiều càng tốt, nhưng chủ yếu sẽ đi vào những thứ thực tế mà ta hay sử dụng.

Và bởi vì làm việc với K8S cần thực hành rất nhiều, nên mình sẽ đưa ra nhiều ví dụ nhất có thể để chúng ta có cái để vọc nhé. Và ta sẽ thực hành trực tiếp trên cluster thật giống như production luôn nhé 😎😎

> Hi vọng các bạn có thể theo được series từ đầu tới cuối, vì mình sẽ đi từ tổng quan vào tới những thứ cơ bản và nâng cao 1 chút, mỗi bài sẽ có thực hành để các bạn làm quen dễ hơn, do vậy đừng bỏ lỡ bài nào nhé ;)
# Liệu rằng có cần học tới tận Kubernetes hay không trong khi không theo nghiệp DevOps?
Câu trả lời là tuỳ vào các bạn có muốn hay không 😂😂

Thực tế là mình thấy học K8S nó cũng hơi nâng cao nếu như các ta chỉ theo nghiệp Frontend, Backend,...không liên quan hẳn đến DevOps.

Vậy nhưng mình thấy những lợi ích nó mang lại thì cựccccc kì nhiều, nếu ta hiểu:
- tự biết cách deploy và quản lý app
- tự biết cách check logs, check deployment, auto scale,...
- kết hợp với CICD để tự động hoá toàn bộ quá trình triển khai app
- biết cấu hình các thứ ABCXYZ

Biết K8S nó cho mình làm việc độc lập hơn rất là nhiều, gần như mình không phải phụ thuộc vào bên team SRE hỗ trợ phần deploy vì mình tự làm được, từ viết Dockerfile, rồi viết file manifest K8S để deploy,...mặc dù công việc chính của mình là làm Frontend :D

Vậy nên các bạn tự đặt câu hỏi liệu có muốn học thêm 1 thứ hơi nâng cao, nhưng hay ho như K8S không nhé ;)
# Good night
Vèo cái đã nửa đêm 🌙🌙

Mình cố gắng viết bài này ngắn ngắn chút để những bài sau mỗi bài giới thiệu thêm một chút về K8S tới các bạn.

Mong rằng qua đây ta có cái nhìn tổng quát ban đầu về K8S và những thứ nó mang lại, hi vọng đủ ngắn để các bạn đọc được tới đây 😂

Hẹn gặp lại các bạn vào những ngày bài sau và ta cùng nhau vọc K8S nhé 💪💪💪