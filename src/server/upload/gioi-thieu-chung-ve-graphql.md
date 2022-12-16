# 1. Nhắc lại về REST
* REST (**Re**presentational **S**tate **T**ransfer): được sáng lập bởi người sáng lập ra phương thức HTTP. 
* Là một tiêu chuẩn để viết API, sử dụng  phương thức HTTP đơn giản để giao tiếp giữa các máy.
* REST gửi một yêu cầu HTTP như GET, POST, UPDATE, DELETE  đến một URL để xử lý dữ liệu
![](https://images.viblo.asia/8c2bb2af-5a9f-4275-bbf6-f6217222bf23.jpeg)
* REST mang lại rất nhiều ưu điểm (ứng dụng rõ ràng, code dễ dàng đơn giản hơn, dữ liêu trả về dưới nhiều định dạng...). Ttrải qua rất nhiều năm, REST là cách phổ biến nhất để client giao tiếp server. REST cũng là giải pháp phù hợp với rất nhiều ứng dụng đặc biệt là các ứng dụng đơn giản, tốc độ phát triển chậm.
* Tuy nhiên ngày nay, nhiều ứng dụng lại có tốc độ phát triển nhanh, thay đổi cập nhật liên tục, dẫn đến các API cũng phải thay đổi dữ liêu trả về tương ứng... Điều này dẫn đến ra đời **GraphQL**
# 2. GraphQL là gì?
* Là một tiêu chuẩn API mới cung cấp một giải pháp thay thế hiệu quả, mạnh mẽ, linh hoạt hơn so với REST.
* Cho phép Client có thể chỉ định chính xác những data nào mà Client thật sự cần từ một API.
* Thay vì multiple endpoints trả về cấu trúc data cố định, GraphQL chỉ sử dụng Một endpoint, và trả về chính xác dữ liệu mà client yêu cầu.
* GraphQL thường bị nhầm tưởng là một công nghệ Database. Điều đó là quan niệm sai lầm. GraphQL là một **query language cho API**, không phải cho database. Điều đó có nghĩa là chúng ta có thể sử dụng GraphQL mà không cần quan tâm database là gì.

# 3. Tại sao lại phát triển GraphQL
* Sự ra tăng của các việc sử dụng các thiết bị mobile, nhiều thiết bị mobile công suất thấp, mạng yếu,  đòi hỏi cần phải load dữ liệu một cách hiệu quả.
Đây là lý do Facebook sáng chế ra GraphQL. GraphQL giảm thiểu số lượng data transfer qua mạng.
* Có nhiều các framework và platform frontend  khác nhau.
    
    Gây khó khăn cho việc xây dựng và bảo trì **một API** mà đáp ứng yêu cầu của **các** framework và platform. Với GraphQL, mỗi client có thể truy cập chính xác đc dữ liệu nó cần.
* Đáp ứng sự triển khai nhanh chóng liên tục và cập nhật product thường xuyên.
    
    Với Rest API, phía máy chủ cần được sửa đổi để giải quyết các yêu cầu cụ thể và thay đổi design phía clients. Điều này cản trở yêu cầu triển khai nhanh chóng và liên tục.
# 4. Câu chuyện về GraphQL
* GraphQL được sáng chế bởi Facebook.  Facebook bắt đầu sử dụng GraphQL vào năm 2012 trong các ứng dụng mobile native của họ.
* Lần đầu tiên Facebook phát ngôn chính thức về nó là ở React.js Conf 2015 và ngay sau đó họ đã open source nó.
* Tại vì Facebook luôn nói về GraphQL trong bối cảnh của ReactJS nên tại thời điểm đó nhiều người chỉ nghĩ rằng GraphQL chỉ giới hạn sử dụng cho React, nhưng không phải vậy, thực tế GraphQL là một công nghệ mà có thể sử dụng **mọi nơi Client giao tiếp với API.**


![](https://images.viblo.asia/c964e2b1-f515-4ffd-889b-0f57c354fcf7.png)

* GraphQL có một cộng đồng phát triển nhanh chóng:

    Trước khi Facebook công bố GraphQL, thì các công ty khác như **Netflix** hay **Coursera** cũng đang phát triển những ý tưởng tương đồng với mục đích làm cho tương tác với API hiệu quả hơn. Coursera cũng đã hình dung ra một công nghệ tương tự cho phép client chỉ định những yêu cầu về dữ liệu trả về. Còn Netflix thì thậm chí cũng đã open-source giải pháp của họ gọi là **[Falcor](https://github.com/Netflix/falcor)**.
Tuy nhiên sau khi GraphQL đc open-source, Coursera đã từ bỏ nỗ lực của họ và nhảy sang dùng GraphQL.
* Ngày nay GraphQL được sử dụng bởi nhiều công ty khác nhau như GitHub, Twitter, Shopify, Yelp...
![](https://images.viblo.asia/9575e73e-d831-4e91-a09d-a8ce8f765fd6.png)
# 5. Kết luận 
* Bài viết này mình đã giới thiệu chung về GraphQL, với mong muốn mọi người hiểu được GraphQL là gì, Tại sao nó lại ra đời. Mình cũng muốn nhấn mạnh là GraphQL là **một query language cho API**, nó ra đời để khắc phục những thiếu sót và nhược điểm của REST.
* Bài viết sau mình sẽ đi vào so sánh GraphQL và REST để làm rõ hơn sự khác nhau giữa GraphQL và REST cũng như những ưu điểm của GraphQL.
* Link Gốc của bài viết https://huongvnq.github.io/2020/10/18/introduction-graphql/
* Nguồn tham khảo: https://www.howtographql.com/basics/0-introduction/