![](https://images.viblo.asia/25791ff1-c6b7-4dd3-ad93-d20361dc8c11.png)

Trong lĩnh vực an toàn thông tin cũng như trong lĩnh vực công nghệ, và kể cả trong đời sống thì **Kiểm soát truy cập** đều có tầm quan trọng cao. Nhưng đã bao giờ bạn tự hỏi rằng: tại sao hệ thống kiểm soát truy cập lại đưa ra các yêu cầu như vậy? Cơ sở nào để đưa ra các quy định? Cơ chế kiểm soát truy cập này có thực sự hiệu quả? Ưu điểm và nhược điểm cùa chúng là gì?

Bài viết này sẽ làm rõ hơn các vấn đề phía sau một hệ thống kiểm soát truy cập. Đi cùng mình qua hết các nội dung dưới đây để tìm đáp án cho những câu hỏi bên trên nhé.

# 1. Kiểm soát truy cập
Kiểm soát truy cập được hình thành từ hai bộ phận chính:
- Xác thực (Authentication)
- Cấp quyền (Authorization)

## 1.1. Quá trình xác thực
Quá trình xác thực (authentication) nhằm kiểm tra danh tính của đối tượng, hay nói cách khác là trả lời cho câu hỏi: bạn là ai?. Quá trình xác thực hiện hữu thường xuyên, ví dụ như: 
- Khi chúng ta mở khoá điện thoại cần nhập vào mật khẩu, quét vân tay, hoặc xịn hơn thì mở khoá với face id.
- Khi gửi xe chúng ta được nhân viên bảo vệ đưa cho vé xe, và khi muốn lấy được xe thì phải trả vé tương ứng.
- Ở các chung cư cao cấp thì cần quẹt thẻ từ để sử dụng thang máy.
- Sử dụng chìa khoá để mở ổ khoá nhà, khoá tủ.

Các hệ thống đơn giản thường chỉ yêu cầu một yếu tố để xác thực. Tức là chúng ta chỉ cần cung cấp 1 trong số các thông tin như: 
- Tài khoản và mật khẩu.
- Mã pin
- Vân tay
- Khuôn mặt  

Và nhiều yếu tố khác nữa cũng có thể được sử dụng để xác thực. Tuy nhiên việc chỉ sử dụng một yếu tố không đủ độ an toàn và đáng tin cậy nữa. Do đó ngày nay nhiều nơi đã sử dụng hệ thống xác thực đa yếu tố.

Đa yếu tố tức là yêu cầu 2, 3, thậm chí là nhiều hơn nữa các yếu tố mà mình đã kể trên. Giống như kiểu một cánh cửa có tận 3 ổ khoá vậy, chúng ta phải có 3 chiếc chìa khoá khác nhau để mở hết 3 cái ổ khoá ra, sau đó mới có thể mở cửa được.

![](https://images.viblo.asia/4d0a90fb-6174-4270-b7d5-e4fcb8d23d51.png)

Nhìn chung thì xác thực đa yếu tố sử dụng nhiều hơn 1 yếu tố thuộc 3 nhóm sau:
- **Bạn là ai?** dựa trên các thông tin về khuôn mặt, võng mạc, vân tay, giọng nói,...
- **Bạn biết điều gì?** dựa trên các thông tin bí mật mà chỉ mình bạn biết như mã pin, mật khẩu, đáp án cho câu hỏi bí mật,...
- **Bạn có gì?** dựa trên những gì bạn đang sở hữu như chìa khoá, usb giải mã, chữ ký, thẻ từ, chíp nhớ, điện thoại di động,...

Sau khi quá trình xác thực diễn ra thành công, hệ thống sẽ cho phép bạn truy cập. Nhưng lúc này bạn mới chỉ có quyền hạn thấp nhất mà thôi, thậm chí có thể không làm được gì.

Việc **"bạn có thể làm những gì?"** sẽ là câu hỏi mà hệ thống cấp quyền trả lời.

## 1.2. Quá trình cấp quyền
Quá trình cấp quyền được thực hiện sau khi quá trình xác thực được hoàn thành. Dựa trên kết quả xác thực, dựa trên việc **"bạn là ai"** thì hệ thống sẽ kiểm tra xem bạn được quyền làm những gì.

![](https://images.viblo.asia/5304d325-129b-430c-a6d4-dc83cd50d4c4.jpeg)

Thường thì các hệ thống sẽ gồm nhiều tài nguyên, nhiều chức năng được phân chia rõ ràng. Quá trình cấp quyền sẽ đảm bảo bạn chỉ được sử dụng những tài nguyên, những chức năng tương ứng với mức quyền hạn của mình. Một số hệ thống đảm bảo nguyên tắc quyền hạn tối thiểu sẽ có một mức quyền hạn thấp nhất, chỉ được sử dụng tài nguyên tối thiểu nhất, và mức quyền hạn tối thiểu sẽ mặc định được cấp cho mọi đối tượng trong hệ thống. Các mức quyền hạn cao hơn thì cần được quản trị viên phê duyệt và cấp cho.

Chúng ta có thể thấy trong thực tế ở các khu chung như cao cấp, khi có thẻ cư dân thì người ta mới có thể sử dụng thang máy. Nhưng cái thẻ cư dân này chỉ mở được duy nhất một căn hộ mà chủ thẻ trả tiền thuê thôi. Việc dùng thẻ của căn hộ này mở cửa căn hộ khác là không thể được.

Một ví dụ khác là trong ứng dụng discord, người tạo server có thể tạo và cài đặt quyền truy cập kênh trong server cho các vai trò cụ thể. Và ngoài các vai trò tạo thêm ra thì luôn có một vai trò mặc định được cấp cho bất cứ thành viên nào tham gia server, là vai trò every one.

![](https://images.viblo.asia/abc4242e-d931-47a2-aa02-548f3adbb5ed.png)

## 1.3. Hệ thống Kiểm soát truy cập
Sự tham gia của cả hai quá trình xác thực và cấp quyền mới tạo thành một hệ thống Kiểm soát truy cập hoàn thiện. Hệ thống Kiểm soát truy cập sẽ kiểm soát khả năng truy cập tài nguyên hệ thống sau khi một đối tượng hoàn thành xác thực và được cấp quyền truy cập. Hệ thống cần:
- Bảo vệ các tài nguyên hệ thống trước những truy cập trái phép.
- Đảm bảo tài nguyên hệ thống chỉ có thể truy cập qua các phương pháp được cho phép.

Các hệ thống kiểm soát truy cập có thể được chia thành hai loại:
- Kiểm soát truy cập vật lý: là các rào chắn, cửa, nhân viên kiểm tra thẻ,... bảo vệ trước các truy cập vật lý.
- Kiểm soát truy cập thông tin: bảo vệ cho các nội dung số.

![](https://images.viblo.asia/438dcca8-b4f3-4922-9348-e2040746c4ce.png)

# 2. Các mô hình kiểm soát truy cập
Việc triển khai một hệ thống kiểm soát truy cập không hề đơn giản. Nếu như quản trị viên chỉ đơn thuần cài đặt các quy định dựa trên thực tế, logic, hoặc triển khai tuỳ ý không theo các nguyên tắc có tổ chức thì hệ thống chắc chắn sẽ không thể kiểm soát chính xác được với mọi trường hợp, sự xung đột giữa các quy định hoàn toàn có thể xảy ra. Kể cả khi hệ thống may mắn hoạt động tốt, thì vấn đề cũng sẽ xuất hiện khi cần thay đổi quy định về kiểm soát truy cập.

Rất may là đã có những người nghiên cứu sâu về bảo mật đã thử nghiệm và đưa ra các mô hình kiểm soát truy cập. Mỗi mô hình đều có ưu/nhược điểm riêng, và chúng sẽ phát huy được tác dụng tốt nhất trong từng trường hợp riêng.

Trước khi đi vào các nội dung chi tiết hơn, mình cần nói trước là một số phần dưới đây mình sẽ sử dụng tiếng anh để dễ trình bày hơn. Có hai từ riếng anh cần chú ý là:
- **Subject**: chủ thể, người dùng, tài khoản người dùng
- **Object**: đối tượng, dữ liệu, tài nguyên hệ thống.

Sau đây, chúng ta sẽ cùng tìm hiểu về 3 mô hình kiểm soát truy cập cơ bản: DAC, RBAC và MAC.

## 2.1. DAC - Kiểm soát truy cập tuỳ chọn
DAC là viết tắt của Discretionary Access Control, đây là mô hình kiểm soát truy cập đơn giản nhất trong ba mô hình mình đề cập trong bài viết này.

DAC được xây dựng và triển khai dựa trên một nguyên lý:  

> Chủ sở hữu sẽ quyết định quyền truy cập đối với tài nguyên.

Nguyên lý này có thể được hiểu như sau:
- Trong hệ thống thì quản trị viên là người có quyền hạn cao nhất => Quản trị viên có thể truy cập không giới hạn, toàn bộ tài nguyên hệ thống, có thể thêm/sửa/xoá các chủ thể và đối tượng.
- Tài nguyên do chủ thể tạo ra thì sẽ thuộc quyền sở hữu của chủ thể đó.
- Chủ thể có thể cấp quyền truy cập tới tài nguyên mà mình sở hữu cho một chủ thể khác.
- Quyền truy cập tối đa mà chủ sở hữu có thể cấp cho chủ thể khác là bằng với quyền hạn của chủ sở hữu.

Để hình dung rõ hơn chúng ta sẽ xem và phân tích hình minh hoạ sau đây:

![](https://images.viblo.asia/1f00640f-5ba0-488f-b575-bd7c810faf5a.png)

- Admin có thể đi vào được cả 2 cổng kiểm soát.
- User chỉ đi vào được cổng kiểm soát bên dưới.
- Visitors do được User cấp quyền cho nên cũng chỉ có thể vào được cổng kiểm soát bên dưới.

Rất đơn giản và dễ hiểu đúng không 😁 Hiện nay mô hình DAC vẫn được sử dụng, ví dụ như ở bảng ACL (Access Control Lists) trên hệ điều hành Windows, hoặc ở hệ thống quản lý tệp tin trên các hệ điều hành nhân Linux.

![](https://images.viblo.asia/709303da-6588-40f8-b1b7-66adcf6cc8af.png)

Mô hình DAC có những ưu/nhược điểm sau:
- Ưu điểm:
  - Thân thiện với người dùng.
  - Chủ sở hữu đối với tài nguyên có thể linh hoạt thu hồi, hoặc cung cấp một phần quyền hạn của mình.
  - Đơn giản, dễ cài đặt.
- Nhược điểm:
  - Khó quản lý: quản trị viên khó có thể theo dõi được những ai có thể truy cập một tài nguyên cụ thể.
  - Không đảm bảo được tính bí mật: một dữ liệu bí mật có thể được xem bởi những chủ thể đáng ra không đủ quyền xem.

Có một biện pháp để hạn chế việc lộ thông tin bí mật khi sử dụng mô hình DAC, đó là quản trị viên sẽ giới hạn quyền của chủ sở hữu tài nguyên ngay từ đầu. Thay vì cho phép chủ sở hữu có toàn quyền với dữ liệu thì chúng ta chỉ cấp cho chủ sở hữu một phần quyền hạn thôi. Trên Windows và Linux đều đang sử dụng biện pháp này, với Linux là [umask](https://www.cyberciti.biz/tips/understanding-linux-unix-umask-value-usage.html) còn với Windows là [CREATOR_OWNER group ](https://activedirectoryfaq.com/2016/11/ntfs-authorization-creator-owner/).

## 2.2. RBAC - Kiểm soát truy cập dựa trên vai trò
RBAC là viết tắt của Role Based Access Control, đây là mô hình kiểm soát truy cập được sử dụng rộng rãi nhờ có những ưu điểm vượt trội hơn DAC, cũng khắc phục được một số điểm yếu của DAC.

RBAC được xây dựng và triển khai dựa trên nguyên lý:

> Các chủ thể sẽ được phân chia và quản lý theo các nhóm/vai trò. Một chủ thể chỉ có thể truy cập những tài nguyên mà các nhóm/vai trò của chủ thể đó được quyền truy cập.

![](https://images.viblo.asia/bff94f03-cfec-4d98-807b-6719822f0f54.png)

Như vậy với RBAC thì quyền truy cập tài nguyên sẽ không được gán trực tiếp cho chủ thể nữa. Bản thân mỗi chủ thể cũng không có quyền thay đổi nhóm/vai trò của mình, mà chỉ có quản trị viên được quyền làm điều này. Thường thì các công ty, tổ chức sẽ quản lý tài nguyên theo mô hình này, Active Directory trên Windows cũng sử dụng mô hình RBAC.

![](https://images.viblo.asia/df3d2aad-42b3-4554-a088-4159e3571746.png)

Mô hình RBAC có những ưu/nhược điểm sau:
- Ưu điểm:
  - Quản lý dễ dàng.
  - Các thực thể không thể thay đổi nhóm/vai trò của mình, cũng không thể thay đổi quyền truy cập của các nhóm/vai trò.
  - Thuận tiện cho việc tuân thủ nguyên tắc đặc quyền tối thiểu.
- Nhược điểm:
  - Việc cài đặt và quản lý phức tạp khi có quá nhiều nhóm/vai trò trong hệ thống.
  - Các nhóm/vai trò chưa có sự phân cấp rõ ràng.

## 2.3. MAC - Kiểm soát truy cập bắt buộc
MAC là viết tắt của Mandatory Access Control, đây là mô hình kiểm soát truy cập tốt nhất trong ba mô hình được đề cập trong bài viết này.

MAC được xây dựng và triển khai dựa trên nguyên lý:

> Các chủ thể và đối tượng đều được đánh nhãn bảo mật. Mỗi nhãn bảo mật gồm hai thuộc tính: phân loại và danh mục. Chủ thể có nhãn bảo mật đáp ứng đủ yêu cầu mới có thể truy cập tài nguyên hệ thống.

Một nhãn bảo mật có thể trông như sau:

![](https://images.viblo.asia/1583d0f7-f502-4153-8cd6-cc940a9b93f8.png)

- Phần màu đỏ: phân loại. Hệ thống sẽ sắp xếp phân loại theo mức độ, ví dụ trong quân đội có thể chia thành: Top Secret > Secret > Confidential > Unclassified.
- Phần màu xanh: danh mục. Xác định các thông tin thêm, ví dụ như: tài liệu này thuộc dự án nào? tài liệu này liên quan đến những nội dung gì?...

Khi một chủ thể muốn truy cập mội đối tượng, hệ thống sẽ kiểm tra và tiến hành so sánh nhãn bảo mật của cả hai: đối tượng và chủ thể. Một số trường hợp có thể xảy ra như sau:
- Phân loại của chủ thể có cấp độ lớn hơn hoặc bằng với cấp độ phân loại của đối tượng, và nhãn danh mục thoả mãn => được phép truy cập.
- Phân loại của chủ thể có cấp độ thấp hơn cấp độ phân loại của đối tượng => không được phép truy cập.
- Nhãn danh mục của chủ thể không khớp với nhãn danh mục của đối tượng => không được phép truy cập.

![](https://images.viblo.asia/11b94408-e8b8-4ab2-8ede-86d81acdd7a0.jpg)

![](https://images.viblo.asia/4f2baf91-b8e6-4ec2-a969-a12618e5f2fc.png)

Chỉ khi nhãn bảo mật thoả mãn cả về phân loại và danh mục thì chủ thể mới được truy cập tới tài nguyên. Nhờ điều kiện nghiêm ngặt như vậy nên MAC đảm bảo được tính bí mật của dữ liệu rất tốt. Tất nhiên, chẳng có thứ gì là hoàn hảo 100% được, mô hình MAC cũng vẫn có những nhược điểm của mình.

Mô hình MAC có những ưu/nhược điểm sau:
- Ưu điểm:
  - Đảm bảo tối đa tính bí mật của tài nguyên.
  - Chỉ quản trị viên mới có thể gán và thay đổi nhãn bảo mật của chủ thể/đối tượng.
- Khuyết điểm:
  - Người dùng cần gửi yêu cầu cho quản trị viên mỗi khi nhãn bảo mật thiếu dù chỉ một chút.

Tuy còn nhiều mô hình kiểm soát truy cập nữa mà mình chưa thể nói đến trong bài viết này, nhưng chúng ta đã hiểu hơn về hoạt động của một hệ thống kiểm soát truy cập rồi. Bạn thấy thông tin trong bài viết có hữu ích hay không? Bạn đã gặp những mô hình nào rồi?

Nếu có bất cứ ý kiến gì, hãy nhắn dưới phần bình luận của bài viết này, và chúng ta sẽ cùng thảo luận.