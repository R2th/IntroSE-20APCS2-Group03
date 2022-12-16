Khi phát triển một ứng dụng mới hoặc chỉnh sửa giao diện người dùng của một ứng dụng hiện có, tôi nghĩ sẽ có lúc bạn phải tìm hiểu và cân nhắc việc lựa chọn framework js.

Vài năm trước đây, Vue, React, Angular là ba framework js được sử dụng phổ biến. Tuy nhiên gần đây, xét về tài liệu tham khảo và hoạt động của cộng đồng thì Vue và React đang trở thành hai đại diện framework js mạnh nhất. Hơn nữa chi phí học tập của Angular cao và nhiều người cảm thấy rằng họ không có nhiều thời gian để học nó và đã bỏ học sớm.  

Trong bài viết này tôi sẽ cố gắng tóm tắt sự khác biệt giữa Vue và React 

## [Vue là gì](https://vuejs.org/guide/introduction.html#what-is-vue) 
Vue là một framework JavaScript để xây dựng giao diện người dùng. Nó được xây dựng dựa trên HTML, CSS và JavaScript tiêu chuẩn, đồng thời cung cấp mô hình dựa trên thành phần và khai báo giúp bạn phát triển hiệu quả các giao diện người dùng đơn giản hay phức tạp.

Vue được phát hành tại Nhật Bản vào năm 2014. Nó được phát hành theo giấy phép MIT và có thể được sử dụng cho các mục đích thương mại. Nó có rất nhiều tài liệu và một cộng đồng các nhà phát triển sống động.

Người ta nói rằng chi phí học tập thấp hơn React vì có ít điều kỳ quặc trong phương pháp mô tả không giống như các framework JavaScript khác. Bằng việc kết hợp với các thư viện hiện đại, bạn cũng có thể phát triển các ứng dụng phức tạp.

Các công ty sử dụng Vue 
- Euronews
- Behance
- Alibaba
- Trustpilot
- Vice
- ...
## Tính năng của Vue  
- Directives
   - Vue Directives là các thuộc tính đặc biệt bắt đầu bằng v-. Directives cho phép bạn thêm các thuộc tính duy nhất vào HTML và thực hiện thao tác DOM. 
   - Có rất nhiều loại  Vue Directives có sẵn, vì vậy nếu bạn có thể tận dụng chúng bạn sẽ không phải viết code để thao tác trực tiếp với các phần tử DOM.
- Component
    - Trong Vue những gì được sử dụng lại trong một ứng dụng được gọi là một thành phần (component)
    - Mô tả có thể được đơn giản hóa bằng cách thành phần hóa và ngay cả khi xảy ra lỗi, nó có thể được sửa chữa dễ dàng.
## [React là gì](https://reactjs.org/docs/getting-started.html) 
React là một thư viện được tạo ra để xây dựng giao diện người dùng và được sử dụng để phát triển SPA (ứng dụng trang đơn). Nó được Facebook phát triển vào năm 2013.

Tính đến năm 2021, nó đã trở thành công nghệ front-end phổ biến nhất trên toàn thế giới.

Các công ty sử dụng React 
- Airbnb
- Disqus
- PayPal
- The New York Times
- Netflix
- GitLab
- Trivago 
- ...

## Tính năng của React
 - Declarative
    - Declarative trong React có nghĩa là bạn có thể triển khai một thành phần UI để khai báo nó.
    - Mã nguồn dễ hiểu mà ai cũng có thể xem và hiểu được, giúp bạn dễ dàng gỡ lỗi. Nó cũng có thể phát hiện các thay đổi trong dữ liệu và tự động cập nhật trên giao diện
- Component
    - React cũng giống như Vue, React là hướng thành phần (component). 
    - Bằng cách biến nó thành một thành phần, bạn không phải viết đi viết lại cùng một đoạn mã, giúp dễ nhìn và dễ bảo trì hơn.

## So sánh React và Vue
|| [React](https://github.com/facebook/react) | [Vue](https://github.com/vuejs/vue) | 
|---|---|---|
| Đối tượng | Web | Tập trung vào web nhưng được phát triển để sử dụng trong tương lai trên các nền tảng khác |
|Ứng dụng Bootstrap | CRA | Vue-cli |
|Model | DOM ảo |  DOM ảo |
|Chi phí học tập | Yêu cầu kiến thức sâu | Phương pháp mô tả ngắn gọn và có nhiều tài liệu . Bạn có thể sử dụng thư viện |
|Mục đích | Được sử dụng làm cơ sở để phát triển một page hoặc ứng dụng | Cũng có thể xây dựng ứng dụng của một page với độ phức tạp cao hơn |
| Năm phát hành | 3/2013 | 2/2014 |
| Bản quyền | MIT | MIT |
| Nhà phát triển | Facebook | Evan You (kỹ sư tại công ty Google)|
| Đánh giá star trên github | 185k | 194k |
| Weekly Downloads trên npm| 15,558,730 | 3,192,370 |


### Những dự án phù hợp với React 
- Người phát triển có kiến thức về JavaScript
- Có thể thiết lập linh hoạt theo dự án
- Có thể mở rộng ở một mức độ nào đó
- Phát triển ứng dụng phức tạp 

### Những dự án phù hợp với Vue 
- Vue là một giải pháp tiết kiệm chi phí cho các ứng dụng vừa và nhỏ. Tuy nhiên Vue cũng có một hệ sinh thái rộng lớn cho phép nó đáp ứng các nhu cầu phức tạp của các ứng dụng của doanh nghiệp.
- Phát triển nhanh chóng một ứng dụng
- Người phát triển ứng dụng ít kinh nghiệm về Javascript
 
## Tài liệu tham khảo
- https://v2.vuejs.org/v2/guide/?redirect=true
- https://reactjs.org/
- https://mentormate.com/blog/react-vs-vue-the-core-differences