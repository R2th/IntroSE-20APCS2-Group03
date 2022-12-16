Tiếp theo [phần 2](https://viblo.asia/p/tai-sao-lai-can-https-nhung-dieu-engineer-can-biet-ve-lich-su-va-ky-thuat-phia-sau-cua-tls-phan-2-Az45bgVwKxY) tôi sẽ hoàn thành nội dung phần cuối về HTTPS trong bài viết này.

## Sau này sẽ thế nào？ Tiến tới TLS1.3 hay QUIC

IETF đang tiến hành phát triển kỹ thuật sau khi mà đã thực hiện HTTPS hoá toàn bộ. Tôi sẽ trình bày khái lược TLS1.3 và QUIC của phương thức mới đang được châm cứu hoàn thiện spec.

### Với TLS1.3 thì không chỉ là an toàn mà còn tăng cả tính năng kết nối

Để mà tiến tới HTTPS hoá toàn bộ thì cần đến phương thức TLS mà đã trải qua một thời gian dài cho chúng ta an tâm sử dụng. Giống như là TLS1.2 đã được cải thiện tính an toàn bởi các đối ứng sau đó thì nó cũng cần phải kiểm tra lỗ hổng thường xuyên, không chỉ xunh quanh những ứng dụng thông thường mà cần tính cả về tương lai sau này.

Ở một hướng khác thì với sự phổ cập của các thiết bị di động gần đây, thì cách mà mạng được sử dụng cũng đã thay đổi. Do thiết bị di động kết nối internet thông qua các trạm mặt đất nên thời gian một vòng của tín hiệu truyền tin (RTT：Round Trip Time）khá là lớn. Tốc độ đường truyền của mobile tuy cũng đang trở nên nhanh hơn nhưng để mà giảm thiểu rút ngắn RTT phụ thuộc vào khoảng cách vật lý thì không hề đơn giản. Và các thiết bị di động vì thường xuyên chuyển qua lại giữa Wi-Fi và đường truyền di động nên sự tái kết nối mạng phát sinh cũng không phải là ít. Khi mà tái kết nối thì handshake TLS trao đổi giữa client và server cũng bị ảnh hưởng khá lớn với RTT này.

Để mà giải quyết những vấn đề như thế thì TLS1.3 được bắt đầu nghiên cứu nửa cuối năm 2013, và mục tiêu là sẽ loại bỏ triệt để những vấn đề bảo mật còn tồn đọng cho đến hiện tại, và cũng sẽ tăng tốc độ kết nối lên. Việc như thế thì trong lịch sử version up của TLS là chưa từng có.

Vậy làm sao để TLS1.3 có thể đạt được cả bảo mật và tính năng kết nối? Tôi sẽ trình bày ngắn gọn về 2 loại handshake của TLS1.3.

#### Handshake tiêu biểu của TLS1.3（1-RTT）

Handshake được sử dụng tiêu biểu của TLS1.3 chính là kết nối mới 1-RTT của server certificate.

![](https://images.viblo.asia/7aa589b1-3429-498b-a3bc-371f61fa544b.png)

##### 1. Truyền tham số client và trao đổi key

Trong handshake của TLS1.3 thì ServerKeyExchange và ClientKeyExchange đảm nhận vai trò trao đổi key cho đến nay đã bị loại bỏ. Thay thế vào đó sẽ sử dụng vùng mở rộng của ClientHello và ServerHello trong việc trao đổi key. Nó hoãn lại việc hợp ý của tham số tiến hành đầu tiên trong TLS1.2, đầu tiên sẽ tiến hành trao đổi key trước.

Server mà nhận được ClientHello thì sẽ sinh ra public key tạm thời, và response lại client bằng ServerHello chỉ chứa tham số cần thiết cho việc trao đổi key. Việc có thể trao đổi key mà không có hợp ý trước về tham số là vì client đang có sẵn vài thuật toán trao đổi key. Trường hợp xấu nhất mà server không support thuật toán nào đó thì sẽ hiển thị reject đối với client và thực hiện handshake lại.

Trong handshake của TLS1.3 thì chỉ có phần trao đổi key này là plaintext（ClientHelloとServerHello）.

##### 2. Truyền tham số server

Server ở tại thời điểm nhận được ClientHello có thể tạo ra key chung tạm thời. Sau khi mà gửi đi ServerHello, sẽ bắt đầu truyền tin mã hoá ngay. Và nó không cần ChangeCipherSpec như trong TLS1.2 lúc bắt đầu mã hoá. Ngoài tham số để hợp ý trong trao đổi key thì tất cả đều được gửi tới client sau khi đã mã hoá（EncryptedExtension）. Do đó mà với TLS1.3 thì từ vị trí kẻ thứ 3 sẽ không biết được là giữa client và server đã hợp ý những thiết lập gì ngoài trao đổi key.

##### 3.  Server certificate, kiểm tra fake handshake và nhận gửi dữ liệu ứng dụng

Tiếp theo thì server certifcate sẽ được tiến hành. Về loại Certificate của server gửi hay cách kiểm tra nó thì giống với của TLS1.2. Nhưng vì được gửi mã hoá nên bên ngoài sẽ không biết được là đang sử dụng loại Certificate nào.

Giai đoạn thứ 2 của server certificate thì khác với TLS1.2. Do ServerKeyExchange đã bị loại bỏ nên thay đó server sẽ ký lên dữ liệu handshake đã trao đổi cho tới thời điểm đó và gửi dữ liệu chữ ký đó đi（CertificateVerify）. Client mà nhận được sẽ kiểm tra chữ kí, và xác nhận là server đang có secret key đối với certificate. Đến đây thì Server Certificate hoàn thành.

Cuối cùng cũng như TLS1.2 sẽ trao đổi Finished để xác nhận xem handshake có phải là fake hay không. Nếu ok thì tới đây là handshake của TLS1.3 hoàn thành. Khác với TLS1.2 thì server sẽ không cần đợi Finished từ client. Server ngay sau khi mà gửi Finished đi thì có thể gửi dữ liệu ứng dụng. 

Còn client có thể gửi dữ liệu ứng dụng tới server là sau khi nhận 1 lần Finished từ server. So với TLS1.2 phải tới 2 lần cho kết nối ban đầu thì TLS1.3 chỉ còn lại 1 nên ảnh hưởng của RTT đã giảm đi một nửa trong kết nối ban đầu.

##### 4. Gửi ticket dùng cho tái kết nối

Server đã hoàn thành handshale của TLS1.3 sẽ đưa cho client ticket khi cần tái kết nối lần tiếp theo（NewSessionTicket）. Thông tin của ticket này, và key chung tạm thời đã được sinh ra lúc trao đổi key của handshake sẽ được dùng để sinh ra key chung dùng cho tái kết nối giữa client và server gọi là PSK：Pre-Shared Key. Nếu mà sử dụng PSK thì sẽ hiệu quả hơn và tốc độ tốt hơn.

#### Mã hoá dữ liệu ứng dụng ngay để gửi (0-RTT)

Trong lúc tái kết nối của TLS1.3 thì đồng thời với gửi ClientHello sẽ có thể kết nối 0-RTT để gửi dữ liệu đã mã hoá ngay tới server. Có thể nói là tận cùng của tốc độ hoá.

![](https://images.viblo.asia/f698e08a-4d1e-4acc-a0cc-fd61451f33cf.png)

##### 0. Điều kiện tiền định

Khi mà tái kết nối của 0-RTT của TLS1.3, sẽ cần chia sẻ giữa server và client PSK đã sinh ra khi mà thực hiện handshake lần trước. Nếu mà vẫn còn trong thời gian hiệu liệu được ticket quy định thì client lúc nào cũng có thể dùng PSK để tái kết nối được. Nhưng mà thời hạn hiệu lực của ticket không được vượt quá 1 tuần.

##### 1. Truyền tham số client, trao đổi key, truyền dữ liệu ứng dụng của 0-RTT

Client khi mà bắt đầu tái kết nối server, kế tiếp theo gửi ClientHello thì sẽ gửi dữ liệu ứng dụng. Khi này dữ liệu ứng dụng sẽ được mã hoá bằng cách dùng PSK. PSK đã được chia sẻ trước với server nên server dùng key đó để giả mã dữ liệu 0-RTT đã được mã hoá. Khi mà nhận gửi dữ liệu ứng dụng 0-RTT thì có thể tiếp túc handshake, sau khi gửi xong client sẽ gửi hợp ý là kết thúc gửi cho server, gọi là EndOfEarlyData.

Server nhận được ClientHello sẽ kết hợp PSK và public key tạm thời của client, sinh ra key chung tạm thời mới. Dựa vào điều này thì vấn đề Forward Secrecy sẽ được giải quyết. 

##### 2. Truyền tham số server

Giống với kết nối ban đầu của 1-RTT.

##### 3. Kiểm tra fake handshake, nhận gửi dữ liệu ứng dụng

Nếu mà truyền tin mã hoá thành công thì đã có thể xác nhận việc giữa server và client có chia sẻ PSK. Ở thời điểm sinh ra PSK ở lần handshake trước, server certificate đang thành công. Dựa vào việc server có PSK thì server certificate đã coi như kết thúc, nên việc gửi Certificate là không cần thiết. Nếu mà kiểm tra fake dự vào trao đổi Finished mà xong là hoàn thành handshake. Chính vì thế mà dựa vào việc dùng tái kết nối 0-RTT thì ảnh hưởng của RTT khi handshake TLS căn bản là không còn mấy nữa.

#### RỦi ro bảo mật của 0-RTT

Nhận gửi dữ liệu ứng dụng của 0-RTT là cũng có rủi ro bảo mật. Về dữ liệu ứng dụng của 0-RTT thì key mã hoá chỉ phụ thuộc vào PSK nên không có Forward Secrecy trong dữ liệu ứng dụng của 0-RTT. Chính vì thế sẽ có nguy cơ là nếu như PSK bị trộm mất do truy cập bất chính nào đó thì những dữ liệu ứng dụng về sau sẽ bị đọc được mất.

Những kẻ tấn công, đối với site đang clustering, có thể thực hiện gửi đến nhiều server sau khi nhân bản dữ liệu 0-RTT của tái kết nối (gọi là 0-RTT Reply Attack）. Cái này thì không thể chống được hoàn toàn. Do vậy, dữ liệu ứng dụng trao đổi trên 0-RTT được giới hạn để dù có nhận được nhiều cái cùng lúc thì cũng không gây ra vấn đề cho xử lý phía server.

### IETF QUIC

QUIC là phương thức thực hiện chức nnawg của HTTP/2, TCP và TLS trên UDP, vốn dĩ được Google phát triển riêng từ năm 2013（gọi là Google QUIC）. Hiện này thì hầu như các service của Google đều đang sử dụng QUIC. Nhận thấy kết quả cải thiện tính năng các service của Google như Google Search, Youtube thì IETF cũng bắt đầu chuẩn hoá phương thức UIC từ mùa thu năm 2016（gọi là IETF QUIC）.

IETF QUIC dựa trên Google QUIC nhưng có những cải thiến toàn diện như các chức năng cần thiết, định dạng dữ liệu ... Ví dụ Google QUIC đang dùng cách thức handshake mã hoá riêng của Google còn IETF QUIC sử dụng cách thức của TLS1.3 mà đang được các chuyên gia kiểm tra bảo mật một cách toàn diện.

TLS1.3 được dùng trên TCP nên khi mà dùng kết nối 0-RTT cũng có overhead của TCP handshake. Mặt khác, QUIC là truyền tin UDP nên khi tái kết nối hoàn toàn không có overhead. QUIC hoàn toàn không phụ thuộc vào RTT mà có thể thực hiện kết nối 0-RTT thực sự. 

Phạm vi của mã hoá của QUIC khác với TLS1.3. QUIC IETF đang được châm cứu để có thể sử dụng key có phiên bản cố hữu, mà tiến hành mã hoá ngay cả khi lần đầu handshake lúc mới gửi ClientHello/ServerHello. Dựa vào đó thì có thể loại bỏ đi phần header, và tổng thể handshake QUIC sẽ được mã hoá hết. 

Việc trao đổi dữ liệu HTTP, hay handshake của TLS1.3 và QUIC có thể thấy được sự so sánh qua hình sau :

![](https://images.viblo.asia/4ec44e1d-381c-4d16-8024-1f1a2e1da6dd.png)

Ngoài những đặc trưng tiêu biểu này thì các chức năng điều khiển truyền tin cũng đang được đưa vào IETF QUIC, mục tiêu để cải thiện truyền tin trên đường truyền mà RTT nhiều hay đường truyền mobile có nhiều packet bị mất.

Ở thời điểm này thì IETF QUIC mới chỉ đang trong giai đoạn tài liệu hoá và giới hạn trong trao đổi HTTP. Nhưng tương lại thì cũng sẽ ứng dụng trong cả DNS hay WebRTC nữa. Nó thực sự là phương thức được kỳ vọng rất lớn để trở thành platform truyền tin của nhiều ứng dụng.

Nguồn : [Employment](https://employment.en-japan.com)