# Giới thiệu tổng quan
Software architecture hiện được chia làm 2 dạng:
1.  Monolithic architecture: kiểu  truyền thống
2.  Microservices: những năm gần đây dạng này đang dần trở nên phổ biến hơn.  
    "Netflix, Google, Amazon, and other tech leaders have successfully switched from monolithic architecture to microservices".

Nhưng quan trọng không phải cái gì google, amazon làm đều là tốt nhất với dự án, với application của bạn. Vì vậy chúng ta nên nắm rõ những yếu tố cơ bản, phân tích điểm mạnh điểm yếu để chọn lựa hướng đi cho phù hợp nhất.  Bài viết của mình sẽ được chia làm 2 phần chính. 
1. Lựa chọn microservice hay monolithic cho dự án của bạn.
2. Phân tích chi tiết hơn điểm mạnh yếu của từng architecture
## 1. Lựa chọn microservice hay monolithic cho dự án của bạn?
![](https://images.viblo.asia/84bdf455-75fa-426c-8bc5-e29c024d51af.png)

### Monolithic architecture:
1. Team nhỏ
2. Quick launch - khi bạn muốn prototype hay PoC (proof of concepts), ra sản phẩm nhanh nhất có thể để kiểm chứng cái "business idea"
3. Ứng dụng, dự án của bạn khá đơn giản và ko cần yêu cầu quá nhiều về mặt business logic, khả năng mở rộng, và flexibility.
4. Team hiện tại không có microservices expertise: Cái này sẽ làm một thách thức nếu các bạn hoặc team bạn muốn tự tìm hiểu. Cần set timeline cho phù hợp.
### Micro services architecture:
1. Ứng dụng, dự án của bạn khá lớn, tương lai cần có khả năng mở rộng.
2. Có đủ engineering skills, human power.
3. Có sẵn microservices expertise: DevOps and Containers experts là một lợi thế :)

## 2. Phân tích chi tiết hơn điểm mạnh yếu của từng architecture
![](https://images.viblo.asia/ebb83f5e-284c-482e-b5de-989aa7356372.png)
**Monolithic**

| Monolithic | Ưu điểm | Nhược điểm|
| -------- | -------- | -------- |
| Đây là kiểu phát triển truyền thống|Tất cả chỉ nằm trên 1 project, centralized management, dễ dev | Khi monolithic scale up lên, code base sẽ rất bự, một member mới sẽ khó biết bắt đầu từ đâu     |
 Phù hợp với các dự án nhỏ|   Dễ debugging and testing | Tính ổn định không cao, vì 1 cái crash sẽ ảnh hưởng tới toàn bộ hệ thống, có thể hiểu như mọi thứ là 1 cỗ máy thống nhất mọi thứ cần phải nhịp nhàng     |
 || Dễ để deployment, và dễ phát triển, vì đó là kiểu truyền thống các kĩ sư cơ bản đều được trang bị đủ kiến thức cần thiết | Thay đổi sẽ khó vì các component sẽ có ràng buộc liên quan với nhau      |
 ||  | Một component muốn chuyển đổi ngôn ngữ chẳng hạn, thì sẽ khó khăn vì nó cần kết nối tới những thằng component khác nữa     |
  
  
  

**Microservices:**

Nhìn chung mục tiêu của microservices là để giảm thiểu sự phụ thuộc giữa các component với nhau. Để có thể dễ dàng quản lý, scale up, tuy nhiên vấn để sẽ thêm vào nhiều thứ phức tạp khác.
"Small, and Focused on Doing One Thing Well"

| Microservices | Ưu điểm |Nhược điểm |
| -------- | -------- | -------- |
| Các services liên hệ với nhau thông qua (http request, streaming, socker, rpc...)     | Chia nhỏ hệ thống thành nhiều component(service) độc lập. Một team sẽ có trách nhiệm toàn bộ với life-cycle của một hay nhiều service. Mỗi micro-service độc lập có thể sử dụng database riêng     | Tăng độ phức tạp: nó giống như là 1 distributed system, 1 hệ thống lớn chính vì vậy tât cả sự liên kết cần phải dc tính toán cẩn thận.     |
|Microservice chia nhỏ bao nhiêu là phù hợp: lựa chọn dựa trên kinh nghiệm của bạn     | Giảm thiểu sự phụ thuộc lẫn nhau ở tầng code. Developers làm việc trên một code base nhỏ hơn, dễ dàng làm việc hơn giảm thiểu sự phụ thuộc vào các function     | Vấn đề về testing: vì các compient deployable độc lập, nên khi test toàn bộ hệ thống sẽ khó hơn rất nhiều.     |
|     |Mỗi microservices có thể sd các ngôn ngữ khác nhau(dễ dàng trong việc lựa chọn technology)     | Cách xử lý giao tiếp giữa các microservices, xử lý lỗi để tránh làm gián đoạn các microservices khác, test cho từng micro services     |
|     | Sau khi deploy, khi muốn cải thiện 1 phần, thì ko cần update toàn bộ hệ thống mà chỉ cần rebuild và deploy cai micro service.    | Với các projects nhỏ khi chuyển qua Microservices có thể bị chậm hơn, dò cần thêm thời gian giao tiếp giữa các microservices     |
|     |     | Số lượng service càng lốn thì vấn đề về management complexity cũng tăng theo     |
|     |     |Có thể sẽ tốn nhiều tài nguyên hơn dó mỗi thành phần cần instances riêng và container riêng của nó    |

# Kết luận
Nhìn chung để thực hiện những dự án lớn, thì microservices sẽ là 1 lựa chọn tốt, và cho hướng đi xa hơn. Tuy nhiên những dự án gấp rúp, prototype thì chúng ta có thể không cần dùng tới "dao mổ trâu để cắ tiết gà". 
Để chuyển architecture từ hệ thống sang kiểu microservices thì cần có sự chuẩn bị thêm về các kiến thức liên quan tới container (docker, kubernetes..) mình sẽ update trong thời gian tới

## References:
https://www.n-ix.com/microservices-vs-monolith-which-architecture-best-choice-your-business/

https://viblo.asia/p/trien-khai-microservice-nhu-the-nao-de-tang-do-hieu-qua-4dbZN1AmKYM

https://viblo.asia/p/doi-net-ve-microservice-architecture-va-monolithic-architecture-XL6lAAvrlek

https://viblo.asia/p/tai-sao-nen-dung-microservices-va-containers-E375zwndKGW
https://developer.ibm.com/technologies/devops/articles/why-should-we-use-microservices-and-containers