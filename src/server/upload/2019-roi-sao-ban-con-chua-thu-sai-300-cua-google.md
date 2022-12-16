Bạn đang tìm một nơi để lưu trữ và chạy thử trang web mình vừa tạo ?, bạn đang tìm một nơi có thể quăng cái demo trang web của mình cho khách hàng ở xa xem ?, bạn code một ứng dụng web thật xịn mà lại không có tiền mua server, vps để chạy ?,  bạn có 1 trang web tỏ tình, 1 web chơi game online nhưng lại không tìm được chỗ nào free để lưu code ?, hay đơn giản bạn đang tìm kiếm 1 con vps xịn mà free để thay thế cái heroku cùi bắp 15p sập 1 lần ?
![](https://images.viblo.asia/c757bdb9-14ca-43dd-b1e6-7b06b87f1156.png)
Nếu bạn là một trong những đối tượng trên, đã đến lúc bạn nghĩ tới việc sài thử hàng Mĩ chất lượng cao của bác Google :v.
Bài viết này hướng tới đối tượng:
1.	Các bạn dự định theo hướng DevOps
2.	Các bạn front-end, Back-end, full-stack web
3.	Các bạn đang tìm một nơi để show trang web của mình lên cho mọi người trầm trồ
4.	Các bạn đơn giản muốn tìm hiểu thêm về Google Cloud Platform

Bài viết này mình sẽ chia làm 2 phần:
1.	Giới thiệu
2.	Thực hành
### Giới thiệu:
Có thể bạn đã biết năm 2008 Google cho ra mắt một dịch vụ mới đó là Google Cloud Platform (GCP), trong phạm vi bài biết mình sẽ không giải thích GCP là gì mà chỉ tập chung vào 1 sản phẩm nhỏ trong GCP đó là Google App Engine (GAE) nơi mà chúngt ta có thể deloy ứng dụng web của mình lên một cách dễ dàng và hoàn toàn FREE.
 ![](https://images.viblo.asia/084038d2-1c2d-4bb7-b4a7-74d87674dbc4.png)
“Google App Engine (gọi tắt là GAE hay App Engine) là một môi trường phát triển ứng dụng dựa trên công nghệ điện toán đám mây. Ở đó Google cung cấp một hệ thống gồm: ngôn ngữ lập trình, hệ cơ sở dữ liệu, các thư viện lập trình, người lập trình sẽ viết ứng dụng và ứng dụng này sẽ chạy trên các máy chủ của Google.”__Wikipedia nói vậy.

Chúng ta có thể hiểu đơn giản là nó giống như một cái máy chủ ảo được đặt ở trụ sở của google và bạn có thể quản lí nó. Ta có thể làm gì tùy thích với nó, ở đây chúng ta sẽ cùng đưa Web App của mình lên GAE. Và mọi người có thể truy cập và chiêm ngưỡng trang web của mình.

Question: Vì sao tôi phải sử dụng nó thay vì các dịch vụ khác như heroku, azure, aws,.. ??
Answer: Đơn giản vì GAE giải quyết được 3 vấn đề mà 1 lập trình viên web thường gặp:

**FREE:**

 ![](https://images.viblo.asia/7a51aa3c-ab3e-428c-9f7b-a8d698adae89.jpg)
 
- Khi bạn đăng kí tài khoản Google bạn sẽ được tặng 300$ trong 1 năm để sử dụng tất cả các dịch vụ mà GCP cung cấp như Big Data, Compute, Networking, Cloud AI, ….
- Với 300$ được cấp bạn có thể tạo cho mình cả chục trang web mà lại có tên miền đẹp với đuôi .appspot.com
- Với bất cứ web app nào được deploy lên GAE sẽ đều được cấp SSL miễn phí
- Một vấn đề với các bạn muốn sử dụng GCP lâu dài là các sản phẩm của GCP áp dụng cơ chế càng sài càng rẻ, nghĩa là số tiền bạn phải chi trả cho 1 sản phẩm tháng này chắc chắn sẽ thấp hơn tháng trước. 

**PERFORMANCE:**

- Bạn sẽ được sử dụng cơ cở hạ tầng của chính Google, nghĩa là trang web của bạn sẽ được lưu trữ cùng một chỗ với Youtube, Gmail, Drive,…
- Tốc độ nhanh: Google cung cấp 1 đường truyền riêng cho các sản phẩm của mình, nghĩa là khi bạn truy cập bất cứ dịch vụ nào của Google thì tốc độ đường truyền sẽ nhanh hơn hẳn so với các dịch vụ khác
- GAE được tạo ra để đơn giản hóa việc triển khai dự án Web App, nhờ vậy công việc của bạn chỉ cần tập chung vào việc xây dựng chức năng mà không cần bận tâm đến vấn đề config server hay deploy khó khăn nữa.

**SECURITY:**

- Vì là hàng Mĩ và dùng chung cơ sở hạ tầng với các sản phẩm khác của Google nên vấn đề bảo mật có thể yên tâm mà tin tưởng vào GCP nhá.

 ![](https://images.viblo.asia/614ec94a-2de8-4fdc-b50a-79a22c26fe97.jpg)
 
- Question: Làm cái này có phức tạp, lâu la không ?
- Answer: Nó sẽ hơi khó khăn với một số bạn mới bắt đầu tìm hiểu nhưng qua bài viết này các bạn sẽ tiếp cận dễ hơn thôi, nếu bạn từng sử dụng Git thì sẽ thấy nó cũng na ná việc push code lên hub thôi hehe.
- Question: Vì sao không sử dụng Compute Engine đa chức năng hơn ?
- Answer: Vì 3 lí do chính: 

1.	Nó rẻ, GAE rẻ hơn rất nhiều so với GCE
2.	GAE được cấu hình sẵn, công việc của bạn chỉ việc deploy sản phẩm lên là nó sẽ chạy được chứ không phải cấu hình phức tạp như GCE
3.	Chúng ta không dùng dao mổ trâu để giết gà, vì GCE vốn là một máy ảo (Virtual Machine) nên việc deploy một dự án nhỏ lên là không cần thiết và rất phí phạm.

- Question: Vậy GAE hỗ trợ những ngôn ngữ lập trình nào ?
- Answer: GAE hỗ trợ hầu hết các ngôn ngữ lập trình Back-End hiện nay như Python, Nodejs, .Net, Java, PHP, Go, Ruby.

 ![](https://images.viblo.asia/06caa7e0-30c6-461d-89fc-9775d1ed9cdb.png)
 
- Question: Vậy GAE hỗ trợ CSDL không ?
- Answer: có, các bạn có thể sử dụng các sản phẩm khác để tạo CSDL như BigQuery – bạn sẽ được cung cấp tất cả các công cụ để lọc và sử lí dữ liệu của hệ thống một cách tốt nhất.

Ở [phần tiếp theo](https://viblo.asia/p/2019-roi-sao-ban-con-chua-xai-thu-300-cua-google-phan-2-ByEZkyyY5Q0) mình sẽ hướng dẫn các bạn thực hành đưa ứng dụng web lên GAE một cách đơn giản nhất.

![](https://images.viblo.asia/e5cfb1bc-b861-4521-a870-f225ad5c7837.jpg)