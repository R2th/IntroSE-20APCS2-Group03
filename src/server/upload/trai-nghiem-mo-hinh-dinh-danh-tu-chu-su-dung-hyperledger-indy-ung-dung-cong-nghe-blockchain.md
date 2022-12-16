> Xin chào mọi người, mình đang là sinh viên năm cuối ngành công nghệ thông tin, có tìm hiểu đôi nét về blockchain mà đặc biệt là về mảng định danh phân tán, định danh tự chủ. Nên xin chia sẻ lại những gì mình biết.

# 1. Giới thiệu:
## 1.1. Định danh tự chủ là gì?
 
 Trước khi nói về nói về định danh tự chủ (self sovereign identity - ssi) thì chúng ta nên hiểu định danh là gì? Và liệu rằng định danh trên Internet có khác với định danh ngoài đời thật thật không? Định danh có thể hiểu là một loại thông tin được xác minh, mang tính chứng thực cho một cá nhân về một vấn đề nào đó và tương ứng với các mối quan hệ khác nhau và có thể mang tính phân biệt nhân dạng. Hay hiểu đơn giản như căn cước công dân (hoặc thẻ chứng minh là một loại định danh), khi tham gia các hoạt động xã hội cần xác minh mình là ai thì sẽ sử dụng thẻ chứng minh, thẻ chứng minh được xem là có giá trị do cơ quan có thẩm quyền (công an) cấp và có thể sử dụng để phân biệt các cá nhân khác nhau. 
 
 
 ![](https://images.viblo.asia/de1b7d7b-5d50-4bf3-a114-7f24b3d4e443.jpg)


Tương tự, định danh trên Internet cũng như vậy, tên đăng nhập, mật khẩu, email,... là các loại định danh phổ biến trên internet. Bạn sử dụng Facebook, bạn bè tìm được và biết bạn là ai thông qua tên đăng nhập, tên hiển thị,... nhưng do Facebook không mang tính xác thực chính xác như thẻ căn cước công dân nên trên internet có thể bị giả mạo, đánh cắp thông tin mà tiêu biểu như những vụ Facebook người nổi tiếng bị đánh cắp để sử dụng cho mục đích khác. Và có một kiểu xác thực định danh trên internet dựa vào định danh có thật (căn cước công dân) là sử dụng công nghệ thị giác máy tính, trí tuệ nhân tạo để chụp ảnh thẻ chứng minh, quét danh bạ, lập sơ đồ các mối quan hệ để xác minh cá thể nhưng vẫn còn nhiều hạn chế. Đây là một mảng rất lớn và là thiết yếu trong thời đại số và toàn cầu hóa như hiện nay, hay được biết với cái tên eKYC.


**Bảng: Các vi phạm về định danh và thiệt hại của chúng.**
 
| Thời gian | Nội dung                                                                                                                                                      | 
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| 2017      | Cơ sở dữ liệu người dùng của OneLogin đã bị vi phạm với ước tính hàng triệu dữ liệu nhân viên.                                                                | 
| 2016      | "Gian lận nhận dạng năm 2016 có trụ sở tại Hoa Kỳ trong lĩnh vực tài chính đã tăng từ 13,1M năm 2015 lên 15,4 triệu vào năm 2016."                            | 
| 2016      | Hơn 600 vi phạm dữ liệu đã xâm phạm danh tính trên 21 triệu.                                                                                                  | 
| 2016      | "Vi phạm hơn 1 tỷ hồ sơ người dùng trong hệ thống của Yahoo!, Vẫn bị lộ trong 3 năm từ 2013-2016."                                                            | 
| 2016      | "Một vi phạm khác tại Yahoo! trong số hơn 500 triệu hồ sơ người dùng trong năm 2014, vẫn tiếp xúc trong 2 năm."                                               | 
| 2015      | Hơn 175 triệu người dùng Hồ sơ cá nhân đã bị lộ trong hơn 780 vụ vi phạm.                                                                                     | 
| 2015      | "33 triệu tài khoản người dùng bị lộ trong vụ vi phạm dữ liệu Ashley Madison, với chi phí ước tính là $ 850M."                                                | 
| 2015      | "Vi phạm đã ảnh hưởng đến hơn 80 triệu hồ sơ bảo hiểm của người dùng tại Công ty Bảo hiểm Sức khỏe Anthem, với chi phí ước tính dao động từ $ 100M đến $ 8B." | 
| 2014      | 145 tài khoản khách hàng đã bị xâm phạm trong một vụ vi phạm dữ liệu tại eBay trị giá 200 triệu đô la.                                                        | 
| 2014      | "Hồ sơ của hơn 50 triệu người dùng đã bị xâm phạm, vi phạm dữ liệu của Home Depot."                                                                           | 
| 2014      | "Hồ sơ của hơn 40 triệu người dùng đã bị xâm phạm, do vi phạm dữ liệu Target."                                                                                | 
| 2014      | "Hồ sơ của 76 triệu người dùng và doanh nghiệp 7 triệu đã bị xâm phạm, do vi phạm dữ liệu tại JP Morgan có giá hơn 1 tỷ USD."                                 | 

Nhưng câu hỏi đặt ra là chúng ta có đang nắm giữ thông tin định danh của bản thân? Không, chúng ta đang được người khác nắm giữ thông tin định danh, thậm chí bị quyết định ta là ai. Facebook, Google hay các dịch vụ khác lưu trữ và xác minh chúng ta là ai dựa vào dữ liệu, chúng ta không thể tự chứng minh điều đó. Điều này thực sự không mấy đúng đăn, vì bản chất định danh là một loại tài sản của chúng ta. Chính vì vậy mà định danh tự chủ ra đời và phát triển. Định danh tự chủ là thông tin định danh do người dùng sở hữu, quản lý và quyết định cung cấp những thông tin gì.

Để hiểu kỹ hơn về quá trình phát triển của định danh số bạn nên tham khảo thêm bài [này](http://www.lifewithalacrity.com/2016/04/the-path-to-self-soverereign-identity.html)

## 1.2. Vì sao phải sử dụng định danh tự chủ?

Hãy thử tưởng tượng bạn là công dân thành phố Z, nơi mà mỗi công dân được cấp một thẻ căn cước riêng, và các hoạt động xã hội sẽ dựa vào đó để sử dụng. Bạn đi mở tài khoản ngân hàng, mua bán dân sự,... Và để xác minh bạn là ai, người ta sẽ phải xác minh thông tin trên căn cước có đúng không. Bằng cách nào, bằng mắt thường hoặc một trang web cho phép truy cập vào hệ thống dữ liệu công dân của thành phố. Bằng mắt thường thì có vẻ ổn đó, vì nó đã được áp dụng lâu này rồi, nhưng liệu có chính xác 100%, liệu có cần kỹ năng hay kỹ xảo thiết bị gì không? Liệu có sai sót. Chắc chắn là có rồi. Đồng thời, nếu giao dịch qua internet chẳng lẽ là chụp ảnh cái thẻ căn cước rồi gởi qua cho đối tác (Vấn đề 1). Còn nếu truy cập vào dữ liệu của thành phố thì nếu một ngày hệ thống sập, dữ liệu bị sửa đổi, tấn công bởi hacker, nghĩa là bạn không thể chứng minh bạn là ai (Vấn đề 2).

![](https://images.viblo.asia/339d3b40-d6df-41cb-8944-ad1b1c78e210.jpg)


Định danh tự chủ giải quyết vấn đề đó. Bằng cách bạn sẽ nhận một phiên bản số hóa định danh của mình và được ký bằng chữ ký của cơ quan chức năng. Và có thể tự chứng minh tính đúng đắn của thông tin. Như vậy thì bạn đâu cần cơ quan chức năng tái chứng minh thông tin nữa đâu. Và đặc biệt hơn nó có thể tồn tại độc lập với cơ quan cấp phát. Đồng thời, bạn có thể chọn những thông tin cần chứng minh như nơi ở thay vì toàn bộ thông tin từ ngày tháng năm sinh cho đến dân tộc.  Và bí thuật ở đây là thuật toán chữ ký số theo lược đồ Camenisch Lysyanskaya mà sẽ được tôi làm rõ trong bài sau.

# 2. Thử nghiệm
## 2.1. Chuẩn bị:
- Máy tính và điện thoại Android hoặc iOS
- Kết nối internet
- Trình duyệt web.

## 2.2. Thực hiện:
### 2.2.1. Tải ứng dụng quản lý định danh

[Trinsic Wallet](https://trinsic.id/trinsic-wallet/) là một ứng dụng quản lý định danh, hoặc có thể gọi là ví định danh. Nghĩa là đây sẽ là nơi lưu trữ các định danh số của bạn như một chiếc ví lưu trữ các loại giấy tờ. Trinsic nằm trong hệ sinh thái các sản phẩm sử dụng nền tảng [Hyperledger Indy](https://www.hyperledger.org/use/hyperledger-indy).  

![](https://images.viblo.asia/b2ae3cb0-623f-4ef5-8e89-274a7f124c39.png)


### 2.2.1. Cấp định danh số:

Mình có xây dựng thử nghiệm một site để cấp định danh sử dụng Sorvin Buildernet.

> Bước 1: Truy cập https://quanlydinhdanh.191lab.tech/thu-nghiem bằng máy tính.

![](https://images.viblo.asia/10f6d761-38ee-46dc-b97b-c1c16970983b.png)

> Bước 2: Kéo xuống phần "Thông tin định danh" và điền thông tin theo ý thích

![](https://images.viblo.asia/80b4ffb8-1833-4011-bf20-70179a0dac35.png)

* Chú ý: dữ liệu này tôi không lưu bất cứ thứ gì của bạn cả. Nhưng vẫn khuyến khích không nên nhập thông tin chính xác của bạn. 

> Bước 3: Nhấn "Gởi yêu cầu" để khởi tạo kết nối và chứng chỉ số uID

![](https://images.viblo.asia/76a93a4a-effe-4015-961d-a441270a7dba.png)

 > Bước 4: Sử dụng ứng dụng Trinsic vừa tải ở bước trên và chọn `SCAN CODE` để quét mã được sinh ra ở quét trên. 


![](https://images.viblo.asia/1dcb5ea6-b21d-4664-b3fb-a4e974ea317a.png)


![](https://images.viblo.asia/f0842a7a-9c33-4bfd-931f-9abee706ad55.png)

- Hệ thống sẽ gởi yêu cầu kết nối tới ứng dụng

![](https://images.viblo.asia/b6cb4577-5dbc-42d7-8890-a118fd751cf2.png)

- Người dùng đồng ý kết nối, hệ thống sẽ gởi đề nghị nhận chứng chỉ cho người dùng. 

![](https://images.viblo.asia/59441df1-8307-419c-803b-6e406a303529.png)



![](https://images.viblo.asia/1096e063-aa9a-41ec-8124-534d6b7b77e1.png)

- Người dùng xem chi tiết và chấp nhận lưu chứng chỉ, chứng chỉ này sẽ được sử dụng ở bước sau.

![](https://images.viblo.asia/e8bd8eb9-5b26-443a-beec-33634955c67a.png)



  * Có thể sẽ thông báo sai mạng, thì bạn vào phần `Settings` -> `Network` -> `Sorvin Builder`

![](https://images.viblo.asia/bfb4b997-5b82-434f-bc8e-801a3947de93.png)


- Sau khi quét mã và chấp nhận kết nối, website sẽ hiển thị như sau: 

![](https://images.viblo.asia/b0b858dc-c4b7-40d1-b2ae-aacd5343f9d7.png)

- Sau khi chấp nhận nhận định danh trên điện thoại, website sẽ hiển thị như sau: 

![](https://images.viblo.asia/860c06a7-5ab4-4e4c-881f-a52e4a9ecca8.png)

- Người dùng có thể xem thông định danh được cấp.

### 2.2.2. Sử dụng định danh số:

> Bước 1: Truy cập website [Trưng cầu ý kiến sử dụng định danh số](https://trungcauykien.191lab.tech/khao-sat/tong-quan/tru-tien-luong-cho-cac-quy-an-sinh-xa-hoi-tu-dong) bằng máy tính

![](https://images.viblo.asia/dd93e0ba-0d1b-4e02-be90-4ec3b9aaf1be.png)

- Chọn `Tham gia khảo sát` 

![](https://images.viblo.asia/3cfe49a9-8fde-45ec-b255-98d45f5e10d4.png)

- Sau khi chọn câu trả lời cho các câu hỏi, sẽ thấy phần kết nối như sau

![](https://images.viblo.asia/9609a051-4ed4-48aa-a76b-0432bcbab6c4.png)

- Mở ứng dụng Trinsic và thực hiện quét mã

- Người dùng nhận được yêu cầu kết nối đến với hệ thống "Trưng cầu ý kiến" tương tự như hệ thống "Cấp định danh số ở trên"

- Người dùng nhận được yêu cầu cung cấp thông tin 

![](https://images.viblo.asia/d931eeef-0ba9-4640-a355-4c590c394da0.png)

- Chi tiết yêu cầu cung cấp thông tin

![](https://images.viblo.asia/d931eeef-0ba9-4640-a355-4c590c394da0.png)

- Người dùng chấp nhận cung cấp thông tin.

![](https://images.viblo.asia/6832cb0f-cf4f-4573-83c0-2f0091f8e15f.png)


- Sau khi chấp nhận kết nối, website sẽ thông báo

![](https://images.viblo.asia/a7717a60-4e9a-48cb-8395-b47c9ee0d34e.png)

- Sau khi người dùng chấp nhận cung cấp thông tin, website sẽ thông báo

![](https://images.viblo.asia/e438378b-9196-4c0e-8f37-d3449cdba26e.png)

- Bạn hãy chú ý phần `Địa chỉ thường trú` đấy là thông tin được chọn và gởi từ ví định danh

- Sau đó bạn kéo xuống phía dưới và nếu bạn muốn tôi ghi nhận ý kiến bạn đã chọn thì chọn  `Gởi ý kiến` sẽ được thông báo thành công như sau

![](https://images.viblo.asia/7e87f6f1-fe90-45fb-8b62-f3d4aa11f1ff.png)


## 2.3. Giải thích:

Trong mô hình trên, sau khi tổ chức cấp định danh cho người dùng, thì người dùng có thể tự chủ sử dụng định danh đó một các độc lập theo nguyên tắc của định danh tự chủ. Ứng dụng trên được xây dựng dựa trên testnet Sorvin Buildernet và sử dụng ví Trinsic. Chi tiết công nghệ và hướng dẫn xây dựng sẽ được đề cập dần ở những bài viết sau. 

Tôi cam kết không sử dụng và ghi nhận lại thông tin định danh của bạn điền ở trang web cấp định danh. Chúng ta luôn lo lắng không biết thông tin chúng ta có bị sử dụng trái phép hay không, liệu có nằm ngoài sự kiểm soát của chúng ta không. Thì xin chúc mừng, bạn là một người quan tâm đến dữ liệu cá nhân và quyền riêng tư. Và ứng dụng cũng như công nghệ này dành cho bạn.

# 3. Kết luận:

Đây không phải là một bài viết hướng dẫn xây dựng cũng như nêu chi tiết kỹ thuật những gì đang diễn ra, mà mang mục đích truyền cảm hứng cho người dùng cũng như làm quen với những khái niệm mới. Chính vị vậy nó sẽ khá nhàm chán và không bổ ích mấy cho những ai quan tâm đến một bài viết về kỹ thuật hơn là một bài về trải nghiệm. Có thể bạn đang nghĩ tôi đang lợi dụng bạn để thử nghiệm website, nhưng không. Đúng là tôi có mong muốn mọi người trải nghiệm nhưng tôi hoàn toàn không chủ đích lợi dụng vào công việc cá nhân nào cả. Mục đích chính của bài viết này là lan tỏa hơn nữa về vấn đề định danh tự chủ. 

Nếu bạn thấy tôi đang lợi dụng bạn để thực hiện khảo sát, thì bạn có thể không chọn gởi ý kiến ở trang `Trưng cầu ý kiến` vì đó là tác vụ duy nhất có ghi vào database. 

Trong các bài viết sau tôi sẽ đề cập chi tiết hơn mọi thứ. 

Xin chân thành cảm ơn mọi người đã đọc và chú ý.

P/s: lần đầu viết bài trên Viblo nên mình không biết chỉnh ảnh phần chụp ảnh màn hình điện thoại hiển thị nhỏ hơn để dễ nhìn.