Khi phát triển các dịch vụ web (web services), các lập trình viên cần có một quy ước chuẩn để các thành phần trong hệ thống có thể giao tiếp với nhau một cách rõ ràng hơn. `REST` ra đời để giải quyết vấn đề đó, dù không phải một giao thức, cũng không hẳn là một kiến trúc nhưng nhờ `REST` mà việc lập trình (nhất là các API) trở nên đơn giản hơn rất nhiều.

# Vậy REST hay RESTful là gì?

![](https://i.imgur.com/nnC3AVt.png)

`REST`(**RE**presentational **S**tate **T**ransfer) lần đầu tiên được giới thiệu vào năm 2000 trong luận văn tiến sĩ của Roy Thomas Fielding (đồng sáng lập giao thức `HTTP`). Trong luận văn ông giới thiệu khá chi tiết về các ràng buộc, quy ước cũng như cách thức thực hiện với hệ thống để có được một hệ thống `REST` (`RESTful` system). Hiểu một cách đơn giản, **`REST` là một hệ thống các ràng buộc (constraints), chỉ cần đảm bảo  những điều đó hệ thống của bạn có thể được coi là `RESTful`**. Vậy những constraints đó là gì và làm thế nào để thực hiện được chúng?

# REST constraints

![](https://i.imgur.com/jp6qhr4.png)

Để được coi là một hế thống `REST`, hệ thống cần đảm bảo được 5 ràng buộc sau:

**1. Kiến trúc client-server:** Server sẽ là tập hợp các services nhỏ xử lý các request từ client, việc tách biệt giúp tăng tính linh hoạt của client cũng như khả năng mở rộng của server mà vẫn đảm bảo được giao tiếp.

**2. Stateless(phi trạng thái):** Server và client sẽ không lưu trạng thái của nhau, mỗi request và response sẽ chứa đầy đủ thông tin, tách biệt với nhau, điều này giúp hệ thống dễ phát triển và mở rộng.

**3. Cacheability (có khả năng cache):** Các response có thể được lấy ra từ cache của server giúp giảm thiểu thời gian xử lý, các request phải đảm bảo tính duy nhất để response không bị nhầm lẫn với các request khác.

**4. Layered system (phân lớp hệ thống):** Hệ thống được chia làm nhiều lớp, việc giao tiếp của 1 lớp chỉ được tiến hành với lớp ở trên và lớp ở dưới của nó, khả năng cân bằng tải (load balancing) và cache dữ liệu trong hệ thống cũng sẽ được cải thiện.

![](https://i.imgur.com/pcC0Alb.png)

**5. Uniform interface (chuẩn hoá các interface):** Đây là ràng buộc **quan trọng nhất** của hệ thống `REST` và mình nghĩ các bạn cũng chỉ để ý đến ràng buộc này (giống mình cách đây 1 năm =))).

Để đảm bảo ràng buộc này, hệ thống tập trung vào việc xử lý các tài nguyên (resource). Mỗi một resource sẽ được xác định (định danh) bằng một URI (**U**niform **R**esource **I**dentifier) riêng biệt. Mình sẽ đi sâu vào phần này vì nếu thực hiện được việc này thì các ràng buộc khác (chia nhỏ hệ thống cũng như cache các tài nguyên) trở nên đơn giản hơn rất nhiều.

Việc tạo ra quy ước chuẩn để giao tiếp giữa các thành phần trong hệ thống giúp tất cả các thiết bị `REST` đều có thể truy cập đến tài nguyên trên server, điều này lý giải vì sao rất nhiều API sử dụng `REST`.

# REST language

**Hệ thống `REST` giao tiếp với nhau bằng giao thức `HTTP`** và chỉ hoạt động trên nền giao thức này, `HTTP` (một giao thức `TCP/IP`), theo tìm hiểu của mình thì `REST` không thể hoạt động trên giao thức `UDP`.

Một `HTTP` request sẽ gồm 2 phần:
- Giao thức dùng để xác định hàng động muốn thực hiện

![](https://i.imgur.com/KXbipSD.png)

-  Endpoint - trong hệ thống `REST` thì chính là URI của resource cần tác động vào

![](https://i.imgur.com/4Ttj1xK.png)

- Một `HTTP` request đầy đủ để server có thể hiểu sau đó thực hiện request từ client sẽ gồm 2 phần trên.

![](https://i.imgur.com/hlQtfrk.png)
# Ưu điểm của hệ thống REST?

![](https://i.imgur.com/EsA7v03.jpg)

1. **Hiệu năng:** các thành phần đảm bảo được việc giao tiếp theo đúng một quy ước giúp hệ thống có thể vận hành tốt hơn.
2. **Tính khả biến:** với các hệ thống cần thay đổi các tài nguyên liên tục, sử dụng `REST` với việc tạo request đơn giản sẽ giúp mọi chuyển trở nên đơn giản hơn.
3. **Tính mở rộng:** các hệ thống `REST` có khả năng mở rộng rất cao nhờ sự tách biệt giữa các thành phần và các quy ước giao tiếp được quy định sẵn.
4. **Tính linh hoạt:** việc chuẩn hoá interface giúp hệ thống trở nên linh hoạt hơn, có thể sử dụng cho cho nhiều nền tảng khác nhau, mobile, web,...
5. **Trong sáng:** trong giao tiếp giữa các thành phần, các request trở nên rất rõ ràng, dễ hiểu.
6. **Đơn giản:** xây dựng rất đơn giản, ví dụ như việc [khai báo resource trong rails](http://guides.rubyonrails.org/routing.html) đã giúp xây dựng các uri cho resource.
7. **Tính tin cậy:** khó để xảy ra lỗi trong giao tiếp giữa các thành phần gây sụp đổ hệ thống.

![](https://i.imgur.com/guPqqHw.jpg)

**Vậy việc xây dựng web service theo chuẩn `RESTful` có đúng là giải pháp tốt nhất cho các hệ thống?**
Câu trả lời sẽ có trong phần tiếp theo của loạt [bài viết về REST và APIs](https://qmau.me/tag/rest).

# Bài viết gốc được đăng trên VNTechies Dev blog
https://dev.vntechies.com/blog/apis/api-101-rest-restful-api