Chào mọi người, lại là mình và cái serie "Something thú vị" của mình đây, serie tổng hợp những kiến thức mình cảm thấy thú vị ở trên google, github, bla bla... Qua đó chia sẻ những project nho nhỏ, thích hợp để mọi người làm cho vui hoặc relax hoặc giải trí.<br>
Đôi chút về project mình chia sẻ với các bạn lần này, nên demo trước chút nhỉ:<br>
https://github.com/weebNeedWeed/custom-badge <br>
Các bạn truy cập link trên sau đó kéo xuống phần README để thấy thành phẩm chúng ta sẽ làm sau này. Nếu không thấy hình thì chỉ việc truy cập http://badg9.herokuapp.com/ và chờ một tí để heroku start server, sau đó reload lại trang github là được.<br><br>
![](https://images.viblo.asia/32ea3148-3c8c-4868-a4ee-4475071f6692.png)<br><br>
Một demo khác:
![](https://images.viblo.asia/3a970cb0-69cb-4d2b-bde0-beb3d62cc0a0.png)
Vì nếu tóm hết vào một bài viết có thể sẽ rất dài nên mình xin tách thành nhiều phần, mong các bạn theo dõi.
## 1. Tản mạn về các định nghĩa và nguyên lý hoạt động
### 1.1 Github là gì, Badge là gì ?
Theo wiki, GitHub là một dịch vụ cung cấp kho lưu trữ mã nguồn Git dựa trên nền web cho các dự án phát triển phần mềm. GitHub cung cấp cả phiên bản trả tiền lẫn miễn phí cho các tài khoản. Các dự án mã nguồn mở sẽ được cung cấp kho lưu trữ miễn phí.<br>
Github trở thành một yếu tố có sức ảnh hưởng lớn trong cộng động nguồn mở. Cùng với Linkedin, Github được coi là một sự thay thế cho CV của bạn. Các nhà tuyển dụng cũng rất hay tham khảo Github profile để hiểu về năng lực coding của ứng viên.<br><br>
Badge về cơ bản là những cái "huy hiệu", những hình ảnh(png, jpg các thứ), giúp markdown file của chúng ta trông xịn xò, bắt mắt hơn(giống như ta dùng viết đỏ note vào trang vở chứa toàn viết xanh ấy). Ngoài ra Badge cũng giúp cho markdown file của chúng ta cung cấp thông tin một cách nhanh hơn cho người xem( version, language được dùng, trạng thái hoạt động,...).
### 1.2 Thế mấy cái Badge nó hoạt động như thế nào ?
Về cơ bản các Badge trước khi Convert thành PNG thì nó là SVG.Ơ lạ nhỉ, tại sao lại là SVG mà không phải thứ gì đó khác. Câu trả lời cũng đơn giản thôi, chúng ta cần ẢNH ĐỘNG, không phải .GIF nha mà là ảnh có thể tùy biến các thuộc tính cũng như nội dung một các dễ dàng, nếu dùng PNG ban đầu thì ta sẽ phải dùng thư viện nào đấy để vẽ từng nét từng nét các thông tin ta muốn, rất mất thời gian.
### 1.3 Cách project chúng ta "chạy được"
1. Vẽ một cái SVG ưng ý
2. Cấu hình file SVG sao cho phù hợp để compile với Handlebars
3. Get thông tin về ngôn ngữ được dùng của các repo github( qua api )
4. Tính % từng ngôn ngữ, đồng thời tính giá trị của các tham số SVG( x, y, width....)
5. Compile và hiển thị cho người dùng<br><br>


Các công nghệ, kĩ thuật mình sẽ dùng để build, các bạn có thể tham khảo để chuẩn bị cho phần kế tiếp:<br>
* [Handlebars](https://handlebarsjs.com/)
* SVG ( ở đây mình dùng [Boxy-svg](https://boxy-svg.com/) để vẽ)
* [Sharp](https://www.npmjs.com/package/sharp) ( Thư viện xử lý định dạng ảnh )
* [Express](https://expressjs.com/) ( Tạo API )

Mình cũng init rồi cấu hình sẵn những phần cơ bản, bạn nào cần thì có thể clone về [tại đây](https://github.com/weebNeedWeed/custom-badge/tree/init) (branch init), trong đó:
* Ta sẽ code chính trong file src/controller/index.js
* Các file Middleware hoặc Call api ta sẽ để trong folder src/helper
* Tải các thư viện( bao gồm dev package ) về bằng `npm install --only=dev` hoặc `yarn install --prod=false`
* Run project ở dev mode bằng `yarn dev` hoặc `npm run dev`