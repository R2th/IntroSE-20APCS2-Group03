Đây là bài viết đầu tiên của mình. Mục đích chính là lưu lại kiến thức của riêng mình

## I. SESSION
- Session theo định nghĩa là một phiên làm việc khi làm Browser request với Server.
- Khi bạn đăng nhập vào tài khoản của mình vào một trang web với username và password thì server web sẽ kiểm tra nêu thông tin trính xác thì server tạo sessionId trong DB để theo dõi và trả về cho Browser cookie với sessionId để lưu lại. Mỗi khi client gửi request thì kèm theo cả cookie tới service sai đó service sẽ nhảy vào DB để tìm và kiểm tra session trong DB xem có matching không nếu mà có thì trả về respone cho client
- Mỗi session kết thúc khi bị timeout hoặc đóng ứng dụng
- Cookie được tạo khi người dùng truy cập 1 website, cookie sẽ nhỡ nhưng thông tin đăng nhập, các tùy trong người dùng và nó được lưu trên client

## II. JWT (JSON WEB TOKEN)
- Là dữ liệu dang JSON dùng để xác thực người dùng.
- JWT phù hợp để phát triển 1 service RESTFULL đúng nghĩa đó là không sử dụng session. Bời vì RESTFULL được định nghĩa phải là stateless( là không lưu dữ liệu ở client).
- Bên trong  JWT 
    + Header: Thông tin về thuật toán signing , type của payload và format JSON
    + PayLoad: Các dữ liệu thực tế trong JSON (name , role)
    + Signature: Chữ ký