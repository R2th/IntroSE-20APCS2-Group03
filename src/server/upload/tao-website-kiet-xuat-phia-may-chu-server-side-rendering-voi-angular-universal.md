# Giới thiệu.
Trong bài viết này, mình muốn chia sẻ với bạn sự khác biệt giữa kết xuất phía máy chủ (SSR) và kết xuất phía máy khách (CSR). biết sự khác biệt giữa hai thứ đó là rất quan trọng, đặc biệt là khi bạn đang phát triển trên web. trước hết, mình sẽ giải thích định nghĩa của SSR và CSR, sau đó mình sẽ forcus thẳng vào tiêu đề khi mình muốn ứng dụng SSR trên Angular sẽ như thế nào. Liệu nó có phức tạp như Next.js như bạn từng nghĩ. Hãy theo dõi tiếp bài viết để hiểu rõ hơn nhé.
# Kiết xuất phía máy khách (CSR) là gì.
CSR là viết tắt của kết xuất phía máy khách. Nó khác hoàn toàn với SSR về tổng thể. Nếu SSR hiển thị trang ở phía máy chủ, thì CSR hiển thị trang ở phía máy khách. Khi yêu cầu được tiếp nhận trên máy chủ, nó sẽ không hiển thị trang, thay vào đó, máy chủ sẽ gửi một trang duy nhất là khung của trang web tới máy người dùng. Phía máy chủ cũng gửi kèm những file js . Từ file js này sẽ được render ra thành những nội dung hoàn chỉnh của trang web.
![CSR.png](https://images.viblo.asia/188b6349-07d6-41a7-9a38-5a498070d00a.png)
Đây là một phương pháp kết xuất hiện đại vì không có nhận toàn bộ trang HTML. Từ góc nhìn quan điểm kỹ thuật thì chế độ tải này giúp quá trình xử lý nhanh hơn, yêu cầu ít hơn từ máy chủ và trình duyệt. Phương pháp CSR luôn là một lựa chọn, chúng ta cũng không thể thần thánh hóa nó được khi chỉ ra ưu điểm và nhượng điểm của CSR.
## Ưu điểm.
* khi SEO không phải là ưu tiên của bạn. Mình từng làm một số project nghiệp vụ nặng của 1 tập đoàn về cntt lớn ở VN, họ dùng react để build front end. Đương nhiên dữ liệu bên trong chương trình đó họ không muốn công khai cho ai. Nên SEO là thứ họ bỏ qua hoặc quan tâm rất ít.
![2.PNG](https://images.viblo.asia/286b0f41-978f-4a16-baec-d829e75701ad.PNG)
Chắc hẳn con bot của một bộ search engine cũng không ưa gì một trang kiểu này rồi 🤣. Hết đất diễn con bot nó dỗi nó quay về thời kỳ dùng máy tính casio mất. Nói vậy hơi quá nhưng dùng CSR vẫn có thể SEO được chỉ là không được mạnh mẽ thôi.
* nếu trang web của bạn có nhiều tương tác hãy sử dụng CSR vì một vài tính năng khi được render bởi js sẽ tốt hơn so với việc bạn phụ thuộc phía máy chủ, network.
* nếu bạn đang xây dựng một ứng dụng web theo xu hướng lũy tiến PWA. Cái này mình sẽ làm 1 bài post về nó
## Nhược điểm.
* Đương nhiên SEO không ngon rồi.
* Thời gian tải ban đầu chậm hơn vì không những tải khung ban đầu gồm HTML mà nó còn tải cả JS của chương trình nữa. Do mạng các bạn dùng LAN hoặc Wifi nên không cảm nhận được độ trễ chứ nếu quay về thời 2G chắc kêu to lắm 😣.
# Kiết xuất phía máy chủ (SSR) là gì.
SSR là viết tắt của kết xuất phía máy chủ. nó là khả năng của một ứng dụng web để hiển thị trang web trên máy chủ thay vì hiển thị nó trong trình duyệt. khi trang đến phía máy khách, nó sẽ được hiển thị đầy đủ.
![SSR.png](https://images.viblo.asia/c5c5913b-1eca-4463-ade3-c66a56bd8b8b.png)
Khi yêu cầu được nhận ở phía máy chủ, nó sẽ biên dịch mọi thứ, nếu nội dung của trang cần dữ liệu từ cơ sở dữ liệu, máy chủ sẽ làm điều đó. sau đó dữ liệu vào trang được kết xuất đầy đủ và gửi đến máy khách như phản hồi.
## Ưu điểm.
* nếu SEO là ưu tiên của bạn, thường là khi bạn đang xây dựng một trang blog và bạn muốn mọi người đang tìm kiếm trên google truy cập vào trang web của bạn, thì SSR là lựa chọn của bạn.
* nếu trang web của bạn cần tải ban đầu nhanh hơn.
* nếu nội dung trang web của bạn không cần nhiều tương tác của người dùng.
## Nhược điểm.
* Điều hướng trang sẽ yêu cầu load lại gây khó chịu
* Nặng server vì server phải xử lý nhiều logic và dữ liệu. Có thể sử dụng caching để giảm tải.
* Tốn băng thông vì server phải gửi nhiều dữ liệu thừa và trùng  (HTML, header, footer). Có thể dùng CDN để giảm tải.
* Tương tác không tốt như Client Side rendering vì trang phải refresh, load lại nhiều lần.
# Tạo website hỗ trợ SSR trên angular với Angular Universal.
Hướng dẫn này mô tả Angular Universal , một công nghệ kết xuất các ứng dụng Angular trên máy chủ. Một ứng dụng Angular bình thường thực thi trong trình duyệt , hiển thị các trang trong DOM để phản hồi lại các hành động của người dùng. Angular Universal thực thi trên máy chủ , giúp tạo ra các trang web tĩnh sau khởi động trên máy khách. Điều này có nghĩa là ứng dụng thường hiển thị nhanh hơn, giúp người dùng có cơ hội xem bố cục ứng dụng trước khi nó tải xong hết toàn bộ tài nguyên và tương tác ổn định hoàn toàn. Bạn cần install một vài thứ với angular cli để có thể giúp trang của chúng ta từ một CSR thành một SSR. Hãy làm theo các bước với mình
## Bước 1: Khởi tạo một workspace mới với dự án angular của mình.
![1.PNG](https://images.viblo.asia/d4de4907-f4c9-46e3-be65-9ebd2c158468.PNG)
Mình dùng nx để create nhé.
```javascript
    npx create-nx-workspace
```
![2.PNG](https://images.viblo.asia/4afd981d-5ef5-47e3-bdb2-dc3f522a6176.PNG)
Các bạn chọn angular và đặt tên cho dự án nhé.
![4.PNG](https://images.viblo.asia/41fde6d5-09b3-43fa-afe5-9b75791333fa.PNG)
Xong rồi nếu như bạn chọn npm start thì chương trình của bạn vẫn chỉ là client side, bạn cần phải install thêm Angular Universal.
## Bước 2: cài đặt Angular Universal.
![5.PNG](https://images.viblo.asia/5ddd97cc-e01b-41f0-94cc-c9795d565a56.PNG)
Cài đặt Angular Universal.
```javascript
    ng add @nguniversal/express-engine
```
![7.PNG](https://images.viblo.asia/a0901fc3-7810-4fdf-b65d-d489adf3747b.PNG)
Như vậy là cài đặt xong rồi nhé các bạn.
## Bước 3: run chương trình SSR của chúng ta trong môi trường phát triển.
![8.PNG](https://images.viblo.asia/39807883-f253-499e-a193-a7d6bdd14c36.PNG)
Mở file package json ta có thể thấy gói Angular Universal đã được cài đặt và câu lệnh để run Angular Universal như vậy là xong
```javascript
    npm run dev:ssr
```
# Kết luận.
Dù sao các bạn cũng đã nắm rõ về Angular Universal và cài đặt nó quá đơn giản nhỉ.
![9.PNG](https://images.viblo.asia/22502978-4f99-47e7-b191-3585341a5678.PNG)
Nhưng các bạn cũng nên xem lại các khía cạnh của Angular Universal khi nhà sản xuất khuyến cáo bạn rằng "Đây là một máy chủ đơn giản để sử dụng trong việc kiểm tra hoặc gỡ lỗi cục bộ các ứng dụng Angular.
Nó chưa được xem xét về các vấn đề bảo mật." và đặc biệt hơn khi họ yêu cầu bạn "DON'T USE IT FOR PRODUCTION!". Bạn cần xem xét kỹ hơn các trường hợp khi chuyển sang môi trường product vì sẽ có những đối tượng mà trên môi trường product không hỗ trợ. Xin cảm ơn bạn đã theo dõi hết bài viết này.

...Còn tiếp
<div align="right">TuanPK</div>