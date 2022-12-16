Tính đến năm 2019, có 3 công nghệ chiếm ưu thế trong chiến trường Front End - React, Vue và Angular. Theo Bang State of JavaScript 2018, thì Reac React và Vue có tỷ lệ hài lòng cao nhất. React được hỗ trợ bởi Facebook và hiện đang được Netflix, Airbnb, Instagram và nhiều người khác sử dụng. Vue được tạo và hỗ trợ bởi Evan You và một nhóm nhỏ cốt lõi và được sử dụng bởi Alibaba, Wizzair GitLab... Ở bài viết này mình sẽ cùng tìm hiểu sự khác nhau căn bản giữa 2 công nghệ này nhé.

## Điểm Tương Đồng
Điểm tương đồng lớn nhất của 2 công nghệ React và Vue là đều tương tác với Virtual DOM (DOM là tên gọi tắt của Document Object Model (Mô hình Đối tượng Tài liệu), là một chuẩn được định nghĩa bởi W3C dùng để truy xuất và thao tác trên code HTML hay XML bằng các ngôn ngữ lập trình thông dịch (scripting language) như Javascript.). Ngoài ra cả React lẫn Vue đều rất nhẹ, sử dụng kiến trúc xoay quanh các components và lifecycle.Bên cạnh đó, cả 2 đều có một cộng đồng hỗ trợ to lớn, sẵn sàng hỗ trợ giúp đỡ.

## Sự Khác Biệt
Hãy bắt đầu với sự khác biệt rõ ràng nhất: **React** là một thư viện, trong khi **Vue** là một framework.

**React** cho phép thao tác DOM, kiến trúc thành phần và quản lý trạng thái. Tất cả phần còn lại là tùy thuộc vào cộng đồng. Cách tiếp cận này cung cấp rất nhiều tự do cho các nhà phát triển. Nhiều ứng dụng React dựa vào các thư viện của bên thứ ba, được xây dựng và hỗ trợ bởi cộng đồng và sự lựa chọn cho một ứng dụng phù hợp có thể là thách thức cho người mới bắt đầu.

**Vue**, mặt khác, được quan tâm nhiều hơn và đi kèm với rất nhiều đường cú pháp, hệ thống plugin, chỉ thị tích hợp, chuyển tiếp, v.v. Ngoài ra, đội ngũ phát triển đã tạo ra các thư viện đồng hành để định tuyến và quản lý trạng thái cùng với các công cụ hữu ích khác. Một số ví dụ về các thư viện đồng hành như vậy là Vue-router, Vuex cho quản lý nhà nước và Vue CLI. Tất nhiên, người dùng không bắt buộc phải sử dụng các công cụ này vì có một số lựa chọn thay thế. Lợi ích chính là những thứ này được xây dựng và hỗ trợ bởi đội ngũ nòng cốt. Trọng tâm chính của Vue, là sự đơn giản và nhóm đã quan tâm đến những mối quan tâm chung này, cho phép thiết lập và phát triển nhanh hơn. Vue đang nhanh chóng bắt kịp React và cộng đồng đã xây dựng rất nhiều thư viện của bên thứ ba, làm phong phú hệ sinh thái của nó.

**1. Quản lý dữ liệu**

  Để ứng dụng web có tính tương tác cao, UI phải liên tục phản ứng với các thay đổi dữ liệu và dữ liệu này được gọi là **state**. Một trong những điểm tương phản lớn nhất giữa React và Vue là cách họ xử lý sự thay đổi **state**. Điều này ảnh hưởng lớn đến cơ chế đằng sau các bản cập nhật UI, còn được gọi là **re-rendering**. 
  
  **React** được biết đến với việc sử dụng Functional Programming  (FP). Nó thực hiện các nguyên tắc FP, chẳng hạn như các hàm bậc cao hơn, bất biến, các hàm thuần túy, v.v ... Triết lý đằng sau React là **state** thường là dữ liệu không thay đổi. Khi cố gắng thay đổi đối **state**, UI sẽ không được **re-rendering**. Để kích hoạt **re-rendering**, nên sử dụng phương thức **setState**.
  
Trong **Vue**, **state** được thể hiện trong đối tượng dữ liệu. Không giống như React, việc thay đổi đối tượng dữ liệu sẽ kích hoạt UI **re-rendering**.

**2. Template && Styling**

**React** sử dụng JSX (một phần mở rộng cú pháp cho JavaScript). Cú pháp của nó giống với HTML với một số khác biệt đáng kể. Nó cung cấp trải nghiệm nhà phát triển mượt mà hơn, gỡ lỗi và khả năng đọc mã tốt hơn.

**Vue** có một cách tiếp cận thận trọng hơn đối với **template & styling** - một cách tách biệt khỏi logic. Đánh dấu được thể hiện dưới dạng các mẫu trông giống như HTML. Trên thực tế, mọi HTML hợp lệ cũng là một mẫu Vue hợp lệ. Bên trong **template**, **Vue** cung cấp rất nhiều đường cú pháp như điều kiện, lặp, v.v.

**3. Khả năng mở rộng**

Mở rộng ứng dụng **Vue** hoặc **React** với các thư viện của bên thứ ba khá đơn giản. Hầu hết các thư viện nhà cung cấp cho **React** chỉ đơn giản là các thành phần nâng cao những cái hiện có. Chẳng hạn, thư viện React-Redux đang sử dụng API bối cảnh và hiển thị một thành phần bậc cao hơn giúp trạng thái có thể truy cập được từ mọi thành phần lựa chọn. Trong **Vue**, nhiều thư viện của bên thứ ba ở dạng plugin, tận dụng hệ thống plugin tích hợp. Các plugin có thể được thêm bằng cách sử dụng phương thức Vue.use.

Trên là sự tương đồng và khác biệt cơ bản giữa React và Vue. Nếu bài viết có gì thiếu sót, hy vọng mọi người góp ý thêm cho mình. 

Bài viết được dịch từ https://mentormate.com/blog/react-vs-vue-the-core-differences/