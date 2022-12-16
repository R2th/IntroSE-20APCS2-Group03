# Tổng quan
Việc bảo vệ tài khoản github cá nhân, các project trên github và đặc biệt là các project của công ty là một yêu tối quan trọng của mỗi chúng ta. Mỗi công ty sử dụng gihub để quản lý source code chắc hẳn đều có những quy định, quy tắc rất chặt chẽ về việc thiết lập an toàn cho các tài khoản github của nhân viên trong công ty, đặc biệt là những nhân viên làm việc trực tiếp với dự án. Source code là tài nguyên cực kỳ quan trọng của mỗi dự án hoặc các nhân. Việc thiết lập không an toàn có thể dẫn đến các vấn đề về bảo mật nghiêm trọng có thể gây ảnh hưởng tới các tài nguyên này. Bài viết này sẽ chỉ ra một số lời khuyên giúp các bạn bảo vệ tốt github cá nhân cũng như github của công ty.

![](https://images.viblo.asia/0383b981-295c-47c3-88cf-c427ba0d04c9.png)

# 10 GitHub Security Best Practices
## 1. Bảo vệ dữ liệu nhạy cảm
Không bao giờ lưu trữ thông tin nhạy cảm (username/password, database contection string, keys, security important config..) trong source code hoặc tài liệu trên github. Trên github hỗ trợ việc tìm kiếm nên nếu lưu trữ thì rất có thể một ngày nào đó thông tin sẽ bị lộ ra và bị hacker lợi dụng để tấn công
- Ngăn chặn việc đẩy dữ liệu nhạy cảm lên GitHub bằng cách sử dụng `git-secrets`hoặc `git pre-commit hook`. Xem thêm tại [git-secrets](https://github.com/awslabs/git-secrets)
- Sử dụng `ENV variables` cho các dữ liệu quan trọng trong CI/CD và sử dụng [Vault](https://www.vaultproject.io/) để quản lý thông tin nhạy cảm trên môi trường production
## 2. Loại bỏ dữ liệu nhạy cảm
Nếu phát hiện các thông tin nhạy cảm chứa trong source code hay tài liệu trên github, cần thực hiện loại bỏ ngay lập tức một cách an toàn.
- Nếu lộ các thông tin username/password, keys... cần thực hiện disabled ngay lập tức tài khoản hoặc key đó
- Thực hiện loại bỏ toàn bộ thông tin, dữ liệu trên github một cách hoàn toàn. Cần thực hiện theo hướng dẫn [force push rewrite history](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- Thực hiện đánh giá ảnh hưởng và phạm vi ảnh hưởng khi thông tin bị lộ để xử lý một cách hoàn toàn
## 3. Phân quyền chặt chẽ
Phần lớn các vụ rò rỉ thông tin source code hay thông tin đến từ yếu tố con người, chúng ta thường ít để ý tới việc bảo vệ mà thường chỉ phân quyền để truy cập mà quên mất việc phân quyền đầy đủ cho các tài khoản là vô cùng nguy hiểm. Cần thiết chặt quyền truy cập tới github, thực hiện phân quyền tối thiểu các tài khoản truy cập tới github. Thực hiện chia role rõ ràng, phân quyền đúng chức năng
- Thực hiện bật [2FA](https://docs.github.com/en/organizations/keeping-your-organization-secure/requiring-two-factor-authentication-in-your-organization) cho tất cả các tài khoản github công ty
- Không sử dụng chung tài khoản github, chia sẻ mật khẩu hay tài khoản với người khác
- Tất cả các máy tính truy cập tới source code cần được công ty quản lý và kiểm tra đảm bảo an toàn
- Loại bỏ các tài khoản không còn nhiệm vụ trong hệ thống, nhân viên nghỉ việc tránh việc lộ source code.
- Không cho phép tài khoản github cá nhân join vào project công ty hoặc force source code công ty
## 4. Tạo file SECURITY.md
Project cần có file SECURITY.md file và liệt kê đủ các nội dung bảo mật với các chính sách cần tuân thủ
- Disclosure policy: Xác định quy trình khi một ai đó phát hiện ra vấn đề bảo mật cần phải làm để báo cáo lỗ hổng một cách chính xác, an toàn, tránh lộ thông tin. Quy trình bao gồm: Liên hệ với ai, bằng cách nào, theo mẫu nào
- Security Update policy: Thông báo tới người dùng về những cập nhật về bảo mật của project
- Security related configuration: Các yêu cầu liên quan đến việc thiết lập và vận hành hệ thống một cách bảo mật và an toàn
- Known security gaps & future enhancements: Thông báo cho người dùng rằng các biện pháp kiểm soát bảo mật chưa được áp dụng và đề nghị đóng góp từ người dùng!
## 5. Sử dụng Github apps
Cần thực hiện kiểm soát chặt chẽ các app này vì đây là các ứng dụng bên thứ 3 phát triển chứ không phải do github phát triển. Vì vậy việc sử dụng này tiềm tàng các nguy cơ bảo mật và chúng ta cần cẩn thận khi sử dụng
- Kiểm tra kỹ các quyền các ứng dụng yêu cầu, các dữ liệu và ứng dụng yêu cầu cung cấp.
- Kiểm tra kỹ thông tin người, tổ chức tạo ra app có phải là một nhà phát triển tin cậy hay không.
- Kiểm tra kỹ các chức năng, chính sách, cam kết bảo mật mà ứng dụng đưa ra.
## 6. Kiểm tra bảo mật các PRs
Sử dụng các công cụ kiểm tra bảo mật source code khi thực hiện các PRs. Các công cụ này sẽ scan source code để phát hiện các vấn đề bảo mật để lập trình viên có thể sửa sớm, tránh các lỗ hổng bảo mật phát sinh sau này:
- [sonarcloud](https://sonarcloud.io/about): Công cụ scan source code tĩnh có thể tích hơp vào CI/CD phát hiện các lỗi, coding convention, lỗ bảo mật trong source code
- [codeclimate](https://docs.codeclimate.com/docs/installing-code-climates-webhook): Công cụ review source code tự động
## 7. Sử dụng đúng nhu cầu GitHub
Sử dụng github đúng với nhu cầu của mỗi dự án. Đối với những dự án cần yêu cầu về bảo mật cao, khả năng mở rộng tốt, bulid nhanh và được bảo vệ thì [Gihub enterprise](https://github.com/enterprise) là một lựa chọn phù hợp
## 8. Thực hiện rotate SSH keys và Personal Access Tokens
Github có thể được truy cập thông qua ssh keys hoặc token. Các dữ liệu này là dữ liệu bí mật và chỉ chủ nhân tài khoản nắm giữ. Vì một lý do nào đó mà các thông tin này có thể bị lộ hoặc mất. Vì vậy việc rotate các keys, token này định kỳ một khoảng thời gian là cách an toàn để bảo vệ các thông tin trên tránh bị tấn công chiếm tài khoản khi vô tình thông tin bị lộ.
## 9. Luôn suy nghĩ tạo mới project một cách an toàn 
Khi bạn phát triển một project open source, đừng thực hiện các biện pháp bảo mật bằng cách che giấu. Hãy public tất cả để cộng động biết và đóng góp. Luôn sử dụng các biện pháp bảo mật an toàn khi phát triển ứng dụng. Khi bạn public thì cần lưu ý áp dụng các biện pháp bào mật đề cập ở trên và luôn không ngừng cải tiến để ứng dụng trở nên bảo mật hơn.
## 10. Lưu ý khi importing Projects
Import project là một chức năng vô cùng tiện dụng cho phép chúng ta import một project có sẵn. Tuy nhiên cần lưu ý thực hiện kiểm tra toàn bộ source code để đảm bảo luôn loại bỏ các thông tin nhạy cảm tồn tại trong source code
# Tổng kết
Các biện pháp trên là một số các biện pháp giúp đảm bảo github của cá nhân hay công ty sẽ trở nên bảo mật hơn, an toàn hơn khi thực hiện lưu trữ tài liệu hay source code trên github. Nhưng dù có áp dụng các biện pháp tốt mà con người không được đào tạo hay cẩn thận khi sử dụng thì vẫn luôn tiềm ẩn những nguy cơ lộ lọt thông tin gây ảnh hưởng nghiêm trọng tới cá nhân hay tổ chức. Mong các bạn sẽ luôn thực hiện quản lý github một cách an toàn.