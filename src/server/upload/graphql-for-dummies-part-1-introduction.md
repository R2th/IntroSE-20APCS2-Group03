![](https://images.viblo.asia/27c4d57b-fbbd-43ab-8ed5-5c721953e5d4.png)
GraphQL một cái tên được nhắc tới rất nhiều trong thời gian gần đây. Thực sự thì GraphQL không "mới", nó được Facebook tạo ra và sử dụng trong các dự án nội bộ từ năm 2012, đến năm 2015 thì trở thành open-sourced và được phát triển như một standard. Sau  khi ra mắt GraphQL đã ngay lập tức được cộng đồng đón nhận bởi tư tưởng của nó giải quyết đc nhiều vấn đề mà phương pháp xây dựng API hiện tại gặp phải. Vậy GraphQL là gì, điều gì đã khiến nó lớn mạnh ? Chúng ta sẽ cùng nhau tìm hiểu về nó trong bài viết này.

# What GraphQL ?
>>> GraphQL is a query language designed to build client applications by providing an intuitive and flexible syntax and system for describing their data requirements and interactions. - [Working Draft – October 2016](http://facebook.github.io/graphql/October2016/#sec-Overview)

Định nghĩa này dễ dẫn mọi người đến một sự hiểu nhầm về GraphQL. Về cơ bản GraphQL không phải là một ngôn ngữ mới. *Query language*  thực tế là ám chỉ cú pháp mà *client* sử dụng để giao tiếp với *server* mà đáp ứng được các khả năng mà GraphQL quy định.

Trên thực tế GraphQL được phát hành như một đặc tả kỹ thuật (*specification*). Điều này có nghĩa là GraphQL chỉ là một tài liệu dài mô tả chi tiết hành vi của một application server, và dựa vào nó chúng ta sẽ xây dựng nên được một server gọi là GraphQL server.

>>> GraphQL là một đặc tả kỹ thuật dùng để thết kế API
>>> 

Và như các bạn thấy GraphQL cũng  giống như REST chỉ là cách chúng ta thiết kế API, nhưng GraphQL ra đời là để giải quyết những hạn chế mà chúng ta gặp phải khi sử dụng REST. 

# Why GraphQL ?
 
## The Problem
Với REST, mọi thứ đều là *resource*  được định nghĩa bằng các URI và tương tác với động từ tích hợp của HTTP (GET, POST...). Ban đầu REST là một giải pháp tuyệt với, nhưng theo hoàn cảnh thay đổi mobile và client app xuất hiện thì cách tiếp cận của REST bắt đầu xuất hiện những hạn chế.
### Multiple route-trip
REST API thường là tập hợp các endpoints, mỗi endpoint đại diện cho một resource. Khi client cần lấy data từ nhiều resource nó cần thực hiện nhiều request đến nhiều endpoint khác nhau. 
![](https://images.viblo.asia/7c34cf17-e6f8-4d45-8c48-18a007199939.png)
### Over/Under Fetching
Một trong những vấn đề với REST tiếp theo là **Over Fetching**  và **Under Fetching**.
- Over Fetching là khi dữ liệu được fetch về nhiều hơn yêu cầu. Thử tưởng tượng chúng ta có một số màn hình chỉ hiển thị dánh sách user chỉ chứa  `avatar` và `tên` của user, nhưng `/users`  endpoint của chúng ta đang trả về rất nhiều dữ liệu khác như  `address`, `birthday`.... Những dữ liệu không dùng đến ở màn hình này là dư thừa, nhưng không thể loại bỏ do sử dụng ở 1 màn hình khác.
- Under Fetching là ngược lại, khi không đủ dữ liệu yêu cầu. Thử tưởng tượng màn có một màn hình user detail cần hiển thị số `followers` nhưng endpoint `/users/<user-id>` không trả về thông tin này, vậy là chúng ta sẽ phải thực hiện một request khác đến endpoint `/users/<user-id>/followers`.

### Rapid Product Iterations on the Frontend
Một mẫu chung với các REST API là cấu trúc các endpoint theo các khung nhìn mà bạn có bên trong ứng dụng. Điều này rất tiện lợi vì nó cho phép client nhận tất cả thông tin cần thiết cho một khung nhìn cụ thể bằng cách truy cập endpoint tương ứng.

Hạn chế chính của phương pháp này là nó không cho phép sự thay đổi nhanh chóng ở frontend. Với mọi thay đổi được thực hiện cho giao diện người dùng, có nguy cơ cao là có nhiều (hoặc ít hơn) dữ liệu cần thiết hơn trước đây. Do đó, backend cần được điều chỉnh để tính toán các nhu cầu dữ liệu mới. Điều này làm giảm năng suất và đáng chú ý là làm chậm khả năng kết hợp phản hồi của người dùng vào sản phẩm.

## The Solution
Theo hoàn cảnh thay đổi REST API dần trở thành những *"dump" endpoint* thiếu đi sự linh hoạt. Và giải pháp mà Facebook đưa ra là khái niệm rất đơn giản: thay vì có nhiều *"dump" endpoint*, chúng ta sẽ có *một*  *“smart” endpoint* có thể thực hiện các truy vấn phức tạp, sau đó gửi đầu ra dữ liệu thành bất kỳ dạng nào mà client yêu cầu.
![](https://images.viblo.asia/6865c0a4-71e0-4c98-98d7-8e1bb9124be8.png)
Để Client có thể giao tiếp với một endpoint duy nhất, yêu cầu phải có một ngôn ngữ để xử lý một custom request và trả lời dữ liệu cho custom request đó.

Có ngôn ngữ client request nghĩa là client sẽ có quyền kiểm soát. Client có thể yêu cầu chính xác những gì nó cần và server sẽ trả lời chính xác những gì client yêu cầu. Điều này giải quyết vấn Over/Under Fetching.

Khi mà Frontend có thay đổi về UI có thể ngay lập tức thay đổi và ít phụ thuộc vào Backend hơn.

# The Cost of Flexibility
Giải pháp hoàn hảo là một câu chuyện cổ tích. Với sự linh hoạt GraphQL giới thiệu, kèm theo nó là những rủi ro và những mối lo ngại cần phải lưu ý. 

Một mối đe dọa quan trọng mà GraphQL dễ dàng mắc phải đó là tấn công cạn kiệt tài nguyên (DoS - Denial of Service). Một máy chủ GraphQL có thể bị tấn công với các truy vấn quá phức tạp sẽ tiêu thụ tất cả các tài nguyên của máy chủ. Rất đơn giản chỉ bằng một truy vấn có các quan hệ lồng nhau sâu (deep nested relationships) như : `user -> friends -> friends …`, hoặc dùng alias để gọi lại 1 trường nhiều lần... Tất nhiên chúng ta có cách để bảo vệ server nhưng, phải luôn lưu ý đến điều này.

Authentication và authorization là mối quan tâm tiếp theo khi chúng ta làm việc với GraphQL. Chúng ta nên xử lý chúng trước, sau hoặc trong quá trình giải quyết GraphQL không ? Để trả lời cho vấn đề này, chúng ta nên nghĩ GraphQL như một DSL (domain specific language) được thiết kế để nằm trên lớp backend fetching data. Nó chỉ là một layer nằm giữa client và data service thật. Authentication và authorization là một layer hoàn toàn khác. GraphQL sẽ không giúp chúng ta thực hiện Authentication và authorization, nó không được thiết kế để làm việc này. Nhưng nếu chúng ta muốn đặt các lớp này sau GraphQL, chúng ta có thể sử dụng GraphQL để truyền access token giữa client và logic thực thi. Việc này tương tự như chúng ta làm với REST API.

Có thể vấn đề quan trọng nhất mà chúng ta nên quan tâm với GraphQL là vấn đề thường được gọi là truy vấn N + 1. Các field query GraphQL được thiết kế là các hàm độc lập và resolve các field có dữ liệu từ database có thể dẫn đến một request database mới cho mỗi field được resolve. Với REST có thể dễ dàng phát hiện để phân tích, giải quyết các vấn đề N + 1 bằng cách tăng cường xây dựng các truy vấn SQL. Đối với GraphQL các trường được phân tích tự động, mọi chuyện không đơn giản như vậy. May mắn là Facebook đã tiên phong một giải pháp khả thi cho vấn đề này: [DataLoader](https://github.com/facebook/dataloader)

# Kết
Bài viết tạm kết thúc ở đây, mục tiêu của bài viết hôm nay là để chúng ta có một cái nhìn tổng quan cơ bản về GraphQL. Hi vọng nó có ích cho các bạn, hẹn gặp lại ở bài viết tiếp theo về các Core Concept của GraphQL.

# Source
http://facebook.github.io/graphql/October2016/#sec-Overview

https://www.howtographql.com/basics/0-introduction/

https://medium.freecodecamp.org/rest-apis-are-rest-in-peace-apis-long-live-graphql-d412e559d8e4

https://medium.freecodecamp.org/so-whats-this-graphql-thing-i-keep-hearing-about-baf4d36c20cf