![](https://images.viblo.asia/f25f7162-e00a-4eff-8a6d-9081bc60d01b.png)
## I. Vòng đời
### Lịch sử ra đời

**Angular** là một TypeScript-based Javascript framework. Được phát triển và bảo trì bởi **Google**, nó được mô tả như là một "Superheroic JavaScript MVW Framework". Angular (thường gọi là "Angular 2+", "Angular 2" hoặc "ng2") được phát triển không tương thích từ AngularJS (thường gọi là "Angular.js" hoặc "AngularJS 1.x"). Cũng có thể do sự khác nhau đó nên phiên bản 1.x được gọi là Angularjs còn từ các phiên bản sau có tên Angular 2, Angular4....Trong khi Angularjs (1.x) được phát hành năm 2010 nhưng đến hiện tại vẫn đang trong giai đoạn Bug-fixes thì bản Angular mới được giới thiệu vào tháng 9/2016 là Angular 2. Bản mới nhất được phát hành là Angular 4 (không có Angular 3 :D). 
Angular được sử dụng bởi nhiều tên tuổi lớn như: ***Google, Wix, weather.com, healthcare.gov và Forbes.**

**React** được mô tả là "thư viện JavaScript để xây dựng các giao diện người dùng". Ban đầu được phát hành vào tháng 3 năm 2013. React được phát triển và được duy trì bởi Facebook, sử dụng Components phản hồi trên nhiều pages (không phải single-page).
React được sử dụng ở **Facebook** nhiều hơn Angular ở **Google**. React cũng được sử dụng bởi **Airbnb, Uber, Netflix, Twitter, Pinterest, Reddit, Udemy, Wix, Paypal, Imgur, Feedly, Stripe, Tumblr, Walmart.** 
Facebook đang làm việc để phát hành React Fiber. Facebook đã nói về những thay đổi này tại hội nghị phát triển vào tháng 4 năm 2017 và một bài báo không chính thức về kiến ​​trúc mới đã được phát hành. React Fiber đã được phát hành tháng 9 năm 2017.
**Vue** là một trong những Framework JS đang phát triển nhanh nhất vào năm 2016. Vue tự mô tả chính nó như là một "MVC trực quan, nhanh và có thể được hòa trộn được để xây dựng các giao diện tương tác." Nó lần đầu tiên được phát hành lần đầu vào  2/2014 bởi 1 nhân viên cũ của Google là Evan You. Vue được sử dụng bởi **Alibaba, Baidu, Expedia, Nintendo, GitLab** - một danh sách các dự án nhỏ hơn có thể được tìm thấy trên madewithvuejs.com.

### Sự phát triển cốt lõi
Như đã lưu ý, Angular and React được hỗ trợ và sử dụng bởi các công ty lớn. Facebook, Instagram và Whatsapp đang sử dụng chúng trong các web và ứng dụng của họ. Angular được Google sử dụng trong rất nhiều dự án: ví dụ giao diện người dùng Adwords mới được triển khai bằng cách sử dụng Angular & Dart. Một lần nữa, Vue được thực hiện bởi một nhóm các cá nhân mà công việc của họ được hỗ trợ thông qua Patreon và các phương tiện tài trợ khác. 
Bây giờ hãy có một cái nhìn chi tiết hơn: Angular định danh 36 người trên trang nhóm phát triền của họ, Vue liệt kê 16 người, và React không có trang của đội phát triển. Trên **Github**, Angular có > 25.000 stars và 463 contributors, React có > 70.000 stars và> 1.000 contributors, và Vue có gần 60.000 stars và chỉ có 120 contributors. Bạn cũng có thể kiểm tra lịch sử Github stars của Angular, React và Vue ở [github stars](http://www.timqian.com/star-history/#facebook/react&angular/angular&vuejs/vue)
Thêm 1 lần nữa, Vue dường như đang có xu hướng rất tốt. Theo bestof.js, trong 3 tháng qua Angular 2 đã nhận được trung bình 31 stars một ngày, React 74 stars và Vue.JS là 107 stars.
![](https://images.viblo.asia/5c18316d-6b41-4381-b785-65604f2200d1.png)

Còn dưới đây là lịch sử số lần download các npm package của Angular, React, Vue trong 2 năm qua:
![](https://images.viblo.asia/51955906-02d9-48e0-a242-ea55dd565c03.png)

### Nhu cầu thị trường
Thật khó để so sánh Angular, React và Vue trong Google Trend vì nhiều tên và phiên bản khác nhau. Một cách tương đối là tìm kiếm trong danh mục "Internet & công nghệ". Đây là kết quả:
![](https://images.viblo.asia/efaf39e7-5f22-48ca-b924-485c14ef7693.png)

Theo cuộc khảo sát trên Stackoverflow 2017 gần nhất, React được 67% các deverloper được khảo sát yêu thích và AngularJS  tới 52%. Vue không nằm trên Top 10 nên không có thống kê ở đây :D

## II. Tính năng giữa React, Angular & Vue
### Components
Các Framework được đề cập đều dựa trên component-based. Một component nhận một input và sau khi thực hiện một số hành vi / tính toán nội bộ thông qua các function, nó sẽ trả về một template hiển thị ra UI như đầu ra. Các thành phần được xác định nên dễ dàng sử dụng lại trên trang hoặc trong các components khác. Ví dụ: bạn có thể có một grid component (bao gồm một header component và nhiều row components) với các thuộc tính khác nhau (cột, thông tin tiêu đề, hàng dữ liệu, v.v.) và có thể sử dụng lại thành phần này với các bộ dữ liệu khác trên trang khác.

React và Vue đều xuất sắc trong việc xử lý các dumb components: các chức năng nhỏ, phi trạng thái nhận được các phần tử đầu vào và trả về như là đầu ra.