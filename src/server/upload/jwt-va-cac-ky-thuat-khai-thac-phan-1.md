Những tiến bộ về công nghệ, số hóa và sự gia tăng trong việc sử dụng công nghệ đã tạo nên một sự tiến hóa đáng kể. Khi mức độ phức tạp của các ứng dụng web tăng lên, sự phụ thuộc của chúng vào các microservice (hiểu đơn giản là 1 kiểu kiến trúc phần mềm) khác cũng tăng lên. Kết quả là, trong kiến trúc microservice mới, JSON Web Token có ưu thế hơn các phương pháp xác thực dựa trên session truyền thống (cơ chế đăng nhập người dùng dựa trên việc tạo ra session của người dùng ở phía server). JWTs đang nhanh chóng trở thành lựa chọn ưa thích để trao đổi dữ liệu an toàn giữa khách hàng và các bên trung gian vì chúng có độ trễ xác thực thấp, không cần cơ sở dữ liệu tập trung, không có trạng thái và cung cấp sự ứng dụng thực tiễn theo quy chuẩn để ngăn chặn các hoạt động bất chính.
 
![image.png](https://images.viblo.asia/36be6919-9f11-45d7-a9e5-7371ac4efe9a.png)
# 1. GIỚI THIỆU
JSON Web Token (JWT) là một tiêu chuẩn để tạo chữ ký số xác nhận một tập hợp các yêu cầy. Những xác nhận này đại diện cho danh tính của người dùng và từ đó xác định các hoạt động mà họ được phép thực hiện. JWT chứa các xác nhận về quyền sở hữu dưới dạng JavaScript Object Notation (JSON), được ký điện tử bởi nhà phát hành token. Sau khi xác thực thành công, người dùng được chỉ định JSON Web Token, đóng vai trò như một huy hiệu nhận dạng người dùng và phải được gửi cùng với mỗi request sau đó.

JWT là một cách truyền thông tin an toàn giữa các bên. Vì JWT chứa tất cả thông tin cần thiết, nên ứng dụng không cần truy vấn cơ sở dữ liệu nhiều lần.

Dưới đây là một số tình huống mà token web JSON hữu ích:

**Ủy quyền (Authorization):** Đây là tình huống phổ biến nhất để sử dụng JWT. Khi người dùng đã đăng nhập, mỗi yêu cầu tiếp theo sẽ bao gồm JWT, cho phép người dùng truy cập các tuyến đường, dịch vụ và tài nguyên được phép với token đó. Đăng nhập một lần là một tính năng sử dụng rộng rãi JWT ngày nay, vì chi phí nhỏ và khả năng dễ dàng sử dụng trên các miền khác nhau.

**Trao đổi thông tin (Information exchange):** token web JSON là một cách tốt để truyền thông tin giữa các bên một cách an toàn. Bởi vì JWT có thể được ký — ví dụ: sử dụng cặp khóa công khai / riêng tư — bạn có thể chắc chắn rằng người gửi là những người họ nói. Ngoài ra, vì chữ ký được tính bằng cách sử dụng header và payload, bạn cũng có thể xác minh rằng nội dung không bị giả mạo.

# 2.	CẤU TRÚC CỦA JWT TOKENS
JWT bao gồm 3 phần mã hóa Base64-URL: header, payload và chữ ký

> **eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.** eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBodW9uZyIsImFkbWluIjp0cnVlfQ.**AoV6hdQHv66zmDIoNHDsZqeD60YjyE--kQsFlmm1-A**

![image.png](https://images.viblo.asia/69344c58-79ed-471f-b093-0e57f6e14442.png)

## Header

Header thường là phần đầu tiên của JWT, chứa siêu dữ liệu về token. Thông thường, nó xác định token loại ("typ") và thuật toán băm ("alg") được sử dụng để mã hóa định dạng JSON.

## Payload

Phần tiếp theo của JWT là phần payload chứa các xác nhận. Những xác nhận này cung cấp thông tin nhận dạng về người dùng đã đăng nhập. Một xác nhận quyền sở hữu có thể được coi là sự định danh về một thực thể, thông tin bổ sung, mà máy chủ sẽ xác minh. Không có hạn chế về kích thước của payload; tuy nhiên, chúng ta nên cố gắng giữ nó càng ngắn càng tốt.

Để duy trì khả năng tương tác giữa các dịch vụ khác nhau, một số tiêu chuẩn đã được thiết lập để xác định dữ liệu nào và sẽ được giao tiếp như thế nào. Có ba loại xác nhận quyền sở hữu được xác định bởi JWT:

* Xác nhận đã Đăng ký

Dù không nhằm mục đích bắt buộc, nhưng các xác nhận JWT này có thể đóng vai trò là cơ sở ban đầu để tạo ra các xác nhận quyền sở hữu hiệu quả.

* Xác nhận công khai

Đây là những xác nhận quyền sở hữu tùy chỉnh mà chúng tôi có thể xác định bằng cách sử dụng tất cả các ký tự chữ và số. Tên của các xác nhận công khai phải không va chạm lẫn nhau(không bị trùng). Chúng tôi có thể đăng ký chúng với cơ quan đăng ký IANA JSON web token claims hoặc sử dụng tên chống va chạm để ngăn va chạm. Ví dụ: Mã nhận dạng duy nhất phổ biến (UUID) hoặc Mã nhận dạng đối tượng (OID).

* Xác nhận riêng tư

Các xác nhận quyền sở hữu này là một tập hợp các xác nhận quyền sở hữu tùy chỉnh cụ thể hơn cho tổ chức hoặc ứng dụng. Tên xác nhận quyền sở hữu cá nhân có thể được sử dụng bên trong một công ty, nơi JWTS chỉ được chuyển giao giữa các hệ thống đã được xác minh. Ngoài ra, ID người dùng, quyền người dùng và bất kỳ thông tin nào khác đều có thể được xác định. Những phần này có khả năng bị va chạm, vì vậy hãy sử dụng chúng một cách thận trọng.

## Chữ ký

Phần thứ ba và phần cuối cùng của JWT là phần chữ ký. Tiêu chuẩn JWT tuân theo quy định về Chữ ký Web JSON (JWS) để tạo token đã ký cuối cùng. Đầu tiên, chữ ký được xác định bằng cách mã hóa Bas64-URL phần header và phần payload. và nối chúng bằng dấu chấm (.). Đầu ra này sau đó được đưa đến một thuật toán mã hóa như HAMC hoặc RSA để tạo phần Chữ ký JWT.

Mặc dù điều quan trọng cần lưu ý là JWT không được mã hóa; do đó, bất kỳ thông tin nhạy cảm nào được chèn vào token sẽ có thể xem được bởi bất kỳ ai chặn nó. Do đó, chúng ta phải tránh đưa thông tin nhạy cảm vào phần payload.

# 3.	HOẠT ĐỘNG

Token web JSON thường được sử dụng để xác thực dựa trên token. Sau khi người dùng xác thực và cấp quyền truy cập thành công, tất cả các yêu cầu tiếp theo đều chứa token truy cập, mà ứng dụng sử dụng làm thông tin xác thực khi gọi API mục tiêu.Token đã được xác thực sẽ thông báo cho API rằng người mang token này đã được cấp quyền truy cập vào API và thực hiện các hành động được chỉ định trong phạm vi được cấp trong quá trình ủy quyền.

Quá trình này có thể được chia thành 2 phần:
 
![image.png](https://images.viblo.asia/5e8c8301-8e90-4546-a63b-e7e200a34641.png)

## Lấy token JWT

1. Đầu tiên, người dùng gửi yêu cầu xác thực với thông tin đăng nhập đến máy chủ.

2. Máy chủ xác thực thông tin của người dùng và tạo token JWT với phần payload chứa thông tin nhận dạng duy nhất người dùng.

3. Máy chủ xác thực sau đó lấy khóa bí mật và sử dụng nó để ký phần header và phần payload. Điều này tạo thành một token web JSON hoàn chỉnh.

4. Token được gửi lại cho người dùng, nằm trong header được Ủy quyền bằng cách sử dụng bearer schema.

Nội dung của header phải giống như sau: 

> Authorization: bearer <token>  

5. Tất cả các yêu cầu tiếp theo được thực hiện cho máy chủ từ bây giờ trở đi phải bao gồm JWT token này. JWT bây giờ hoạt động như thông tin đăng nhập tạm thời của người dùng.

## Truy cập tài nguyên bằng token JWT

6. Khi ứng dụng/máy chủ tài nguyên nhận được yêu cầu chứa JWT, token JWT được giải mã Base64-URL đầu tiên.

7. Sau đó nó lấy thuật toán từ phần header. Bằng cách sử dụng phần header và phần payload đã nhận, giờ đây nó tạo hàm băm của riêng mình và mã hóa bằng khóa bí mật.

8. Nếu chữ ký mới khớp với chữ ký nhận được thì máy chủ coi JWT là một chữ ký hợp lệ.

9. Hơn nữa, vì phần payload bao gồm thông tin nhận dạng của người dùng, giờ đây chúng tôi có thể thực hiện quyền truy cập được phép vào các tài nguyên cần thiết.

# 4.	THUẬT TOÁN KÝ:

Mục đích của phần chữ ký là cho phép bên trung gian xác minh tính xác thực của token JWT, đảm bảo rằng nó không bị giả mạo. Quá trình kiểm tra chữ ký của JWT được gọi là quá trình xác thực hoặc xác thực token, Các thuật toán ký khác nhau được sử dụng để ký phần header và phần payload. Các thuật toán này được chia thành hai loại:

## Các thuật toán khóa đối xứng

Trong thuật toán khóa đối xứng, một khóa bí mật duy nhất được sử dụng để mã hóa và giải mã dữ liệu. Một trong những thuật toán khóa đối xứng thường được sử dụng là HMAC.

* HMAC

Mã xác thực tin nhắn dựa trên băm (HMAC) nhận hàm băm, tin nhắn và khóa bí mật làm đầu vào và tạo ra đầu ra. Sử dụng 1 hàm băm mạnh có thể đảm bảo rằng thông điệp không thể bị thay đổi nếu không có khóa bí mật. Việc sử dụng một hàm băm yếu có thể cho phép những người dùng độc hại làm ảnh hưởng đến tính hợp lệ của đầu ra. Do đó, các hàm băm mạnh phải được sử dụng cùng với HMAC.

* HMAC + SHA256 (HS256)

Những chức năng hàm băm thuộc dòng SHA2 vẫn đủ mạnh cho những tiêu chuẩn ngày nay. Các băm của phần header và các payload được tạo ra bởi thuật toán băm sha256. Thuật toán ký tạo điều kiện để dễ dàng khởi tạo và xác minh token và nên được sử dụng khi mà tất cả các bên trung gian đủ tin cậy để bảo mật khóa.

## Các thuật toán khóa không đối xứng

Trong thuật toán khóa bất đối xứng, 2 khóa khác nhau được sử dụng để mã hóa và giải mã dữ liệu. Khóa riêng tư là một bí mật được sử dụng để mã hóa dữ liệu, trong khi khóa công khai được sử dụng công khai để giải mã dữ liệu.

* RSA + SHA256 (RS256)

Nhà cung cấp danh tính có khóa riêng tư, được sử dụng để tạo chữ ký, trong khi người dùng token JWT lấy khóa công khai để xác thực chữ ký. Các thuật toán RSA thường được chỉnh sửa trong các kiến trúc microservice mà bạn không thể tin tưởng bên đối phương để phân phối khóa cá nhân của mình. Làm như vậy sẽ cung cấp cho bên đó khả năng để tạo ra các token tùy ý và có thể có khả năng tạo token tùy ý của riêng mình. Do đó, đây sẽ là một mối đe dọa nghiêm trọng.

# 5. CÁC LOẠI TOKEN

Có nhiều loại token, nhưng phổ biến nhất trong xác thực JWT là access token và refresh token.
    
 ![image.png](https://images.viblo.asia/968409b2-05af-4ba2-b30e-c199ad4fc2ae.png)
    
## Access token

Khi người dùng xác thực, người dùng được chỉ định một token truy cập để thực hiện các cuộc gọi được ủy quyền đến máy chủ API. Nó chứa tất cả thông tin mà máy chủ yêu cầu để xác định xem người dùng hoặc thiết bị có thể truy cập tài nguyên bạn đang yêu cầu hay không. Tuy nhiên, các token truy cập này có thời gian tồn tại ngắn, sau đó người dùng sẽ không còn được phép thực hiện các yêu cầu được ủy quyền đối với máy chủ ứng dụng. Bên phát hành có thể kiểm soát tuổi thọ của token truy cập.

Các token truy cập này chứa các yêu cầu như là "Được cấp vào lúc", exp: nghĩa là "Thời gian hết hạn" cho chúng ta biết về thời điểm chúng sẽ hết hạn.

## Refresh token

token làm mới là một loại token đặc biệt được sử dụng để nhận token truy cập mới. Nếu token truy cập hết hạn, người dùng sẽ phải tự xác thực lại. Vấn đề này có thể được bỏ qua nếu chúng tôi triển khai việc sử dụng token làm mới. Khi token truy cập đến thời gian hết hạn, mã làm mới thực hiện lệnh gọi API và nhận token truy cập mới từ máy chủ.

Làm mới token cải thiện đáng kể quy trình xác thực vì giờ đây người dùng chỉ phải xác thực một lần và quá trình xác thực tiếp theo có thể diễn ra bằng cách sử dụng mã làm mới.
    
*Ở phần sau chúng ta sẽ tìm hiểu về các cách bypass giả mạo JWT.*