### Trong thế giới rộng lớn Web Development, có rất nhiều cách để phân loại một trang web, trong số đó nếu bạn là người mới có thể sẽ đã nghe qua SSR (SERVER-SIDE RENDERING) và CSR (CLIENT-SIDE RENDERING).
### Để bắt đầu bạn có thể tìm hiểu lợi ích và nhược điểm của chúng qua bài viết sau https://toidicodedao.com/2018/09/11/su-khac-biet-giua-server-side-rendering-va-client-side-rendering/. 

Ở thời điểm hiện nay,  lập trình viên đang dần có xu hướng chuyển dần từ Server-side Rendering sang Client-side Rendering. Vì vậy hàng loạt các công nghệ được ra đời để thúc đẩy điều này, các framework nổi tiếng hàng đầu mà bạn đã có thể đã nghe tới như AngularJS, ReactJS, Vue, BackBoneJS, EmberJS đều là dùng để tạo SPA(Single Page Application) việc render sẽ được code Javascript thực thi. Vậy làm sao Server-side- Rendering sao làm sao mà còn đất sống nữa 😁. Tuy vậy nếu bạn đã biết qua SSR và CSR hoặc đã đọc bài viết mình để ở ngay đầu bài thì bạn cũng đã thấy được tuy SSR là phương pháp cũ nhưng những lợi ích nó mang lại thì CSR không thể mang lại được. Vì đặc thù của mỗi ứng dụng, việc lập trình viên phải học thêm SSR để sử dụng là rất cần thiết với nghiệp vụ của mình. Nếu bạn từng biết về React, có thể bạn cũng sẽ biết tới Next.js, một framework được xây dựng dựa trên React để tạo ra các "server-rendered universal JavaScript webapps". "Lấy cảm hứng" từ React 😅, VueJS cũng sinh ra thêm một framework tương tự. Trong bài viết này mình sẽ cặn kẽ đưa ra các bước bắt đầu nhỏ nhất để sử dụng NuxtJS và giải thích concept framework theo cách beginner cũng có thể hiểu được. 🤣

Bước vào thế giới công nghệ tôi đã quá quen với cụm câu : Tại sao phải sử dụng. Nó sinh ra để làm gì, giải quyết vấn đề gì. Cùng tìm hiểu xem NuxtJS sinh kĩ xem NuxtJS sinh ra để làm gì nhé. 
- Như ở đầu bài viết mình đã đề cập, hoặc có thể bạn đã nghe quá nhiều rằng nó dùng cho SSR, rồi sâu hơn bạn có thể giải thích ra rằng đó là render phía server nhưng bạn đã thật sự tưởng tượng được ra workflow của nó chưa ?
Để bắt đầu mình sẽ lấy ví dụ minh họa của CSR từ một ông lớn Facebook
![image.png](https://images.viblo.asia/3e5065e7-c141-417e-a5d8-e8155899e004.png)
<div align="center">Facebook kết hợp giữa CSR và SSR</div>

Nếu bạn mới bắt đầu với HTML CSS JS điều này có thể lạ với bạn, tại sao script lại nằm trong div, nó có tác dụng gì. Sở dĩ, ở các ứng dụng CSR có cách vài cách tiếp cận khá phổ biến ví dụ ở trong ảnh nếu trình duyệt chạy qua scrypt, thực thi scrypt return ra một chuỗi, chuỗi này nằm trong div nên sẽ được render ra phía trình duyệt và trở thành phần tử của trang. Chúng ta sẽ đi qua một ví dụ đơn giản hơn về CSR :
![image.png](https://images.viblo.asia/8e083186-f933-4a16-8d6d-37bcf0162f5d.png)

Đây là một web mình sử dụng ReactJS để tạo giao diện, dễ thấy nội dung duy nhất của trang web là một cục function được framework Javascript bó lại (thu gọn lại) đặt trong cặp thẻ div có id="root", khi trình duyệt truy cập vào trang này khi đọc đến dòng function đó trình duyệt sẽ thực thi code Javascrypt. Cuối cùng function ấy return ra html thuần và sẽ được trình duyệt render ra. Lúc đó vấn đề hiện ra, một trong số đó là con bot của google không rảnh thể đọc và chạy cái cục Javascript này trên khắp tất cả trang web tồn tại trên internet và vì thế trang web của bạn chỉ sử dụng CSR trong mắt google chỉ là một cái cục div rỗng bạn có thể tham khảo bằng cách truy cập một trang full CSR và vào phần View Page Source của nó 
![image.png](https://images.viblo.asia/f58dc3be-6a68-4abf-920a-b8e8ad86ea64.png)
<div align="center">Phần bôi đen là nội dung của trang web nhưng nó lại không có gì</div>
Như bạn có thể thẻ body nội dung chính của trang nó không có một cái gì cả thì lấy đâu mà kiểm duyệt rồi SEO. Nội dung sẽ thực sự có khi chạy Javascript lúc này khi F12 thì trong trong thẻ div mới hiện ra nội dung

![image.png](https://images.viblo.asia/be181d17-9341-47a0-bbd2-ede8dd2bbd4c.png)
<div align="center">Sau khi trình duyệt chạy Javascript trang web mới bắt đầu được nạp nội dung vào</div>

Với bên SSR thì lại càng dễ hiểu, đơn giản vì đây là phương pháp cổ điển khi web app chỉ mới ra đời. Dễ hiểu nhất chính là file HTML CSS của bạn lúc mới bắt đầu, nếu bạn đã từng post nó lên github thì truy cập vào đường dẫn của page đó, khi bạn public đường dẫn người khác truy cập vào web của bạn sẽ được server github gửi đám html css đó, việc html được gửi từ server github có thể coi là ví dụ điển hình đơn giản nhất của SSR mà có thể nhiều bạn chưa biết. 

Một điều cần lưu ý, JS thuần cũng có thể tạo nên một ứng dụng CSR một cách dễ dàng mà bạn có thể sử dụng nhiều mà không biết đó là DOM
![image.png](https://images.viblo.asia/5220033d-7114-420e-b111-93b0c59a8197.png)
<div align="center">Sử dụng DOM render vào thẻ p</div>

Quay trở về chủ đề chính với NuxtJS, mình sẽ không đi quá sâu về phần cú pháp vì bài viết về cách sử dụng này đã có rất nhiều. Chúng ta đã có một cái nhìn tổng quan về SSR và CSR, giờ hãy tìm hiểu xem NuxtJS đóng vai trò như thế nào 

Sử dụng NuxtJS tạo một server, server này sẽ đảm nhận việc render và fetch API từ một server khác. Như vậy ở mô hình web SSR sử dụng NuxtJS và API Server có tối thiểu 2 server, hoặc bạn có thể gộp chung server NuxtJS với server giao tiếp với DB. Có thể tưởng tượng là một server với rất nhiều file html đã được dựng sẵn khung hoặc thuần html (ở trong NuxtJS phần html ấy sẽ được viết trong file .vue ở trong thư mục pages). Khi người khác gửi HTTP request, server sẽ theo logic code trả lại HTML tương ứng. 

Ở ví dụ dưới mình tạo ra 3 file .vue Nếu bạn là người mới hãy đừng quan tâm về cú pháp. 
![image.png](https://images.viblo.asia/dd1722e8-045c-43c3-b725-906a8218c778.png)

Và đây là kết quả :
![image.png](https://images.viblo.asia/54dab8fb-2cb8-4532-b4b3-2fb4ae5cca5e.png)
> <div align="center">Theo mặc định, đặt tên file index.vue sẽ match với url "/"</div>

![image.png](https://images.viblo.asia/676906eb-3ac2-4268-a9dc-5a2c3bf28ad2.png)
> <div align="center">Theo mặc định, đặt tên file hello.vue sẽ match với url "/hello"</div>

![image.png](https://images.viblo.asia/b1e441ea-0480-4a32-8048-026f086c8240.png)
> <div align="center">Theo mặc định, đặt tên file goodbye.vue sẽ match với url "/goodbye"</div>

Như bạn đã thấy chỉ với vài bước cơ bản, chúng ta đã có thể tạo ra một server return về html
Chúng ta sẽ thử gửi HTTP Get tới server này

![image.png](https://images.viblo.asia/feb158a8-824c-45ea-8778-331702dd695c.png)
> <div align="center">Nội dung trả về là HTML</div>

Qua bài viết trên đã tìm hiểu đầy đủ về khái niệm SSR và NuxtJS dành cho những bạn chưa sử dụng qua bất kỳ framework dựng sẵn nào. Nếu bạn chưa sử dụng framework, việc dựng lên một server để nó trả về html (Được gọi là SSR) là rất tốn thời gian và "chất xám" 🤣. Là một người bình thường, chúng ta hãy nhớ rằng với những vấn đề lớn như thế luôn có framework, thư viện hỗ trợ và chúng ta nên sử dụng các thư viện, framework dựng sẵn này để rút ngắn thời gian code. Đọc xong bài viết chắc hẳn bạn đã tìm được câu trả lời được framework NuxtJS dùng để làm gì và tại sao người ta lại dùng nó rồi. Các bước tiếp theo bạn hãy nghiên cứu thêm sự tiện lợi của nó so với NextJS hoặc các framework khác hỗ trợ SSR,

Một lưu ý nữa, hồi mới tìm hiểu về NuxtJS qua các dòng overview đã dấy lên mình một thắc mắc tại sao người ta không sử dụng luôn NuxtJS mà lại dùng VueJS trong khi NuxtJS được build trên VueJS và thừa hưởng lại tất cả chức năng của VueJS. Nếu bạn không có vấn đề về SEO về SSR thì tốt nhất đừng "dao mổ trâu cắt tiết gà"!! Và cũng lưu ý rằng NuxtJS ở thời điểm hiện tại mình đang viết vẫn chưa support Typescript. Nên học framework hãy nhớ đúng người đúng việc và tìm hiểu đối tượng framework ấy hướng tới bạn nhé 😁