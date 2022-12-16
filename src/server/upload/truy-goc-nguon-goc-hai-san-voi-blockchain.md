![](https://images.viblo.asia/038ed54e-2436-4b49-b936-754cdd4c522f.jpg)

## Đặt vấn đề

Trên toàn cầu, khoảng 3000 tỷ đô la được chi hàng năm cho các hoạt động khai thác tài nguyên ven biển. Nghề cá biển có khoảng hơn 200 triệu người, từ việc đánh bắt, chế biến, vận chuyển và bán hàng.
Nhưng các hoạt động của con người như đánh bắt cá bất hợp pháp đang đe dọa sự phát triển bền vững của ngành công nghiệp này. Mỗi năm, 5 triệu tấn cá ngừ, với giá trị ước tính là 40 tỷ đô la, được tiêu thụ. Đây là một ngành công nghiệp lớn, và một ngành có thể hưởng lợi rất nhiều với sự minh bạch. Mục tiêu bài viết này là đưa ra giải pháp loại bỏ việc đánh bắt bất hợp pháp, không báo cáo và không được kiểm soát bằng cách sử dụng Hyperledger Fabric. Chúng tôi sẽ mô tả cách cải thiện việc đánh bắt cá ngừ, từ đầu chuỗi cung ứng là ngư dân Salah cho đến khi những con cá ngừ nằm trên đĩa tại nhà hàng của Miriam :). Ở giữa chuỗi cung ứng, chúng ta sẽ có các bên khác tham gia, chẳng hạn như cơ quan quản lý xác minh tính hợp lệ của dữ liệu. Có hai ý chính cần lưu ý:
1. Có nhiều bên trong mạng và bạn sẽ thấy các bên này tương tác như thế nào và cách thức giao dịch được thực hiện.
2. Các kênh riêng cho phép Salah và Miriam đồng ý riêng về các điều khoản tương tác của họ, trong khi vẫn duy trì tính minh bạch, do đó các bên khác có thể chứng thực và xác nhận giao dịch của họ. Sử dụng các kênh riêng, cơ quan quản lý và nhà hàng có thể xác nhận xem một lô cá ngừ cụ thể có nguồn gốc rõ ràng và hợp pháp hay không, mà không cần phải xem chi tiết của toàn bộ quá trình. Chỉ có ngư dân và chủ nhà hàng biết chi tiết các thỏa thuận buôn bán. 
3. Làm sao biết được những thông tin đăng lên blockchain là thật? Làm sao để biết được con cá ngừ này là con cá ngừ A chứ không phải con cá ngừ B hay trên bàn ăn là một con cá chép chứ không phải con cá ngừ. Blockchain sẽ cần kết hợp với IoT để giải quyết vấn đề này. Bài viết này chúng ta chỉ đề cập đến khía cạnh sử dụng blockchain mà thôi.

## Các bên tham gia vào mạng

**Salah** là ngư dân đánh bắt cá ngừ một cách hợp pháp và bền vững.

**Cơ quan quản lý**  (Regulator) xác minh rằng cá ngừ đã được đánh bắt hợp pháp và bền vững.

**Miriam** là một chủ nhà hàng hải sản.

**Carlos** là một chủ nhà hàng hải sản khác cũng mua cá ngừ từ Salah.

Bằng việc sử dụng Hyperledger Fabric, chúng ta sẽ xem làm thế nào việc đánh bắt, phân phối cá ngừ có thể được cải thiện.

![](https://images.viblo.asia/13e95753-0202-4858-a3d4-31ca3a3f705e.png)

## Các khái niệm cần biết trong Hyperledger Fabric

**Kênh** (Channels) là cơ chế phân vùng dữ liệu chỉ cho phép hiển thị giao dịch cho các bên được cấp quyền. Các kênh nằm trong một network chung.

**Chaincode** (Hợp đồng thông minh) là chương trình máy tính xử lý các logic giao dịch.

**Sổ cái** (Ledger) chứa trạng thái toàn cục hiện tại của mạng hay nói cách khác là nơi lưu tất cả các block của kênh. 

**Mạng** (Network) là tập hợp các nút tạo thành mạng blockchain. Mạng có trách nhiệm duy trì nhiều sổ cái chung trên các kênh.

**Ordering service** tập hợp các giao dịch trên mạng và thêm vào block.

**Trạng thái toàn cục** (world state) thể trạng thái dữ liệu của mạng (blockchain). Dữ liệu này được lưu trữ trong cơ sở dữ liệu để truy cập hiệu quả. Các cơ sở dữ liệu được hỗ trợ hiện tại là LevelDB và CouchDB.

**Nhà cung cấp dịch vụ thành viên** (membership service provider hay MSP) quản lý danh tính và quyền truy cập.

## Hoạt động đánh bắt

Chúng ta sẽ bắt đầu với Salah, người đánh bắt cá ngừ hợp pháp, anh bán cá ngừ đánh bắt được của mình cho nhiều nhà hàng. Thông qua một ứng dụng client, Salah có thể có được quyền truy cập vào mạng blockchain Hyperledger Fabric bao gồm các ngư dân, cũng như các nhà quản lý và chủ nhà hàng khác. Salah có khả năng thêm và cập nhật thông tin trong sổ cái của mạng blockchain khi cá ngừ đem đi bán, trong khi các nhà quản lý và nhà hàng có quyền đọc khi truy cập vào sổ cái.

Sau mỗi lần đánh bắt, Salah lưu lại thông tin về từng con cá ngừ, bao gồm: số ID duy nhất, địa điểm và thời gian đánh bắt, trọng lượng của nó, loại tàu và người bắt được cá. Để đơn giản, chúng tôi sẽ đưa ra 6 thuộc tính này. Tuy nhiên, trong một ứng dụng thực tế, sẽ có thêm nhiều thông tin khác được quan tâm.


Các thông tin này được lưu dưới dạng key/value. Sau đây là một ví dụ:

```go
var tuna = { id: ‘0001’, holder: ‘Sarah’, location: { latitude: '41.40238', longitude: '2.170328'}, when: '20170630123546', weight: ‘58lbs’, vessel : ‘9548E’ }
```


## Giao dịch giữa người đánh bắt và nhà hàng

Miriam là một chủ nhà hàng đang tìm kiếm nguồn cá ngừ giá rẻ nhưng có chất lượng được đánh bắt hợp pháp. Khi Miriam mua cá ngừ, cô không chắc rằng liệu mình có thể tin cá ngừ mà mình mua được đánh bắt hợp pháp và bền vững hay không, chất lượng của cá có đảm bảo hay không ? 

Thông thường, Salah bán cá ngừ của mình cho các nhà hàng, chẳng hạn như Carlos, với giá 80 đô la mỗi pound. Tuy nhiên, Salah đồng ý cung cấp cho Miriam một mức giá ưu đãi là 50 đô la mỗi pound cá ngừ, thay vì mức giá thông thường. Trong một blockchain công khai truyền thống, một khi Salah và Miriam đã hoàn thành giao dịch của họ, toàn bộ mạng có thể xem chi tiết của thỏa thuận này, đặc biệt là việc Salah đưa cho Miriam một mức giá ưu đãi đặc biệt. Việc các nhà hàng khác, như Carlos, biết được thỏa thuận này không có lợi về cho Salah một chút nào.

![](https://images.viblo.asia/7c382df6-eb4b-48fc-9268-9741c0effc71.png)

Để khắc phục điều này, Salah muốn các chi tiết cụ thể về thỏa thuận giao dịch của anh không hiển thị cho tất cả mọi người trên mạng, nhưng mọi bên vẫn có thể xem chi tiết về những con cá mà anh đang bán. Sử dụng tính năng của các kênh Hyperledger Fabric, Salah có thể thỏa thuận riêng về các điều khoản với Miriam, để chỉ hai người họ có thể nhìn thấy chúng, mà không ai biết chi tiết cụ thể.

Ngoài ra, các ngư dân khác, những người không tham gia giao dịch của Sarah và Miriam, sẽ không thấy giao dịch này trên sổ cái của họ. Điều này đảm bảo rằng một ngư dân khác không thể bán phá giá khi nắm được thông tin về giá bán của Salah cho các nhà hàng.

## Hoạt động quản lý

Các nhà quản lý cũng sẽ tham gia vào mạng blockchain Hyperledger Fabric để xác nhận, xác minh và xem các dữ liệu từ sổ cái. Ứng dụng của họ sẽ cho phép truy vấn sổ cái và xem chi tiết từng sản phẩm của Salah, nhằm xác nhận rằng anh ấy đang bắt cá một cách hợp pháp. Các nhà quản lý chỉ cần truy vấn mà không cần quyền ghi vào sổ cái. Họ có quyền chỉnh ai có thể truy cập vào mạng và có thể loại bỏ ngư dân khỏi mạng, nếu phát hiện họ tham gia vào các hoạt động đánh bắt bất hợp pháp.

## Nhà cung cấp dịch vụ thành viên (MSP)

Hyperledger Fabric là mạng private blockchain, có nghĩa là chỉ những người được cấp phép mới có thể vào được mạng. Để quản lý các thành viên và định danh trên mạng, nhà cung cấp dịch vụ thành viên (MSP) quản lý ID người dùng và xác thực tất cả những người tham gia trong mạng. Hyperledger Fabric có thể được điều chỉnh bởi một hoặc nhiều MSP. Điều này cung cấp tính mô đun, linh hoạt cho các tiêu chuẩn và kiến ​​trúc quản lý thành viên khác nhau.

Trong kịch bản của chúng tôi, cơ quan quản lý, ngư dân được và các nhà hàng được phê duyệt nên là họ những người được phép tham gia mạng. Để làm được điều này, một nhà cung cấp dịch vụ thành viên (MSP) được xác định để xác định tư cách thành viên cho tất cả các thành viên của chuỗi cung ứng này. Khi cấu hình MSP này, chứng chỉ và danh tính các thành viên được tạo. 

Có 2 chaincode riêng biệt, được chạy trên 3 kênh riêng biệt. Hai chaincode là: một cho thỏa thuận giá giữa ngư dân và chủ nhà hàng, và một cho việc vận chuyển cá ngừ. Ba kênh gồm: một cho thỏa thuận giá giữa SaLah và Miriam; một cho thỏa thuận giá giữa Sarah và Carosl; và kênh còn lại cho việc vận chuyển cá ngừ. Mỗi thành viên của mạng biết về những người khác. Các kênh cung cấp sự riêng tư và bảo mật của các giao dịch.

Trong Hyperledger Fabric, MSP cũng cho phép thêm hoặc xóa thành viên để duy trì tính toàn vẹn và hoạt động của chuỗi cung ứng. Ví dụ, nếu Salah bị phát hiện bắt cá bất hợp pháp, anh có thể bị thu hồi tư cách thành viên, điều này hề không ảnh hưởng đến mạng. Tính năng này rất quan trọng, đặc biệt đối với các ứng dụng doanh nghiệp, nơi mối quan hệ kinh doanh thay đổi theo thời gian.

## Tóm tắt

Chúng ta hãy cùng tóm tắt lại quá trình sản phẩm từ cần câu đến bàn ăn như thế nào nhé :D

1. Salah bắt được một con cá ngừ và sử dụng ứng dụng client để ghi lại tất cả các chi tiết về nó vào sổ cái. Trước khi được ghi vào sổ cái, giao dịch được chuyển đến các nút endorsing trên mạng để xác thực. Giao dịch xác thực sẽ được gửi đến ordering service để được thêm vào block. Block này sau đó được gửi đến các nút committing trong mạng rồi cuối cùng được thêm vào blockchain.
2. Khi cá ngừ được vận chuyển theo chuỗi cung ứng, các nhà quản lý có thể sử dụng ứng dụng của riêng họ để truy vấn sổ cái để biết chi tiết về sản lượng khai thác (không bao gồm giá, vì họ không có quyền truy cập vào chaincode liên quan đến giá).
3. Salah có thể  thỏa thuận với chủ nhà hàng Carlos và đồng ý với mức giá 80$ mỗi pound. Họ sử dụng kênh màu xanh cho chaincode quy định giá 80$ mỗi pound. 
4. Trong một thỏa thuận riêng, Salah và Miriam đồng ý về mức giá ưu đã đặc biệt là 50$ mỗi pound. Họ sử dụng chaincode của kênh màu đỏ quy định 50$ mỗi pound. 

![](https://images.viblo.asia/66fbe942-7c78-48a4-be40-e516a5c0e6f6.png)

Hi vọng ở một bài viết trong tương lai gần, chúng ta sẽ nhau thực hiện những dòng code của ứng dụng này. Xin chào và hẹn gặp lại :)

## Reference

Chương 7 [Blockchain for Business - An Introduction to Hyperledger Technologies](https://courses.edx.org/courses/course-v1:LinuxFoundationX+LFS171x+3T2017/course/)