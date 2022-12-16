# 1.  Lập kế hoạch, giám sát và điều khiển kiểm thử

## 1.1  Lập kế hoạch kiểm thử
Đối với mỗi mức độ kiểm thử, việc lập kế hoạch thường bắt đầu ở ngay đầu của mỗi quy trình cho mức độ đó và liên tiếp thông qua dự án cho đến khi hoàn thành hoạt động closure cho mức độ đó. Lập kế hoạch liên quan đến việc xác định các hoạt động và nguồn nhân lực được yêu cầu để gặp được nhiệm vụ và mục tiêu được định nghĩa trong chiến lược test. Lập kế hoạch cũng bao gồm việc xác định các phương thức cho việc thu thập và theo dấu số liệu mà sẽ được sử dụng để hướng dẫn dự án, xác định việc tuân thủ theo kế hoạch và đánh giá được kết quả của các mục tiêu. Bằng việc xác định các số liệu hữu ích trong suốt các giai đoạn lập kế hoạch, các công cụ có thể được lựa chọn, việc đào tạo cũng có thể được lên lịch và các tài liệu hướng dẫn  có thể được thiết lập.
Chiến lược đã được lựa chọn cho dự án kiểm thử giúp xác định các nhiệm vụ cần xảy ra trong suốt giai đoạn lập kế hoạch. Ví dụ như khi sử dụng chiến lược test dựa trên rủi ro, phân tích rủi ro thường được sử dụng để hướng dẫn quy trình lập kế hoạch kiểm thử liên quan đến các hoạt động giảm nhẹ được yêu cầu để làm giảm các rủi ro sản phẩm được xác định và giúp lập kế hoạch dự phòng. Nếu một số khả năng và các lỗi tiềm ẩn nghiêm trọng liên quan tới bảo mật được xác định, số lượng effort nên được sử dụng để phát triển và thực hiện kiểm tra về bảo mật. Tương tự  như vậy, nếu nó được xác định đó là các lỗi nghiêm trọng thường được tìm ra trong tài liệu đặc tả thiết kế, quy trình lập kế hoạch test có thể dẫn đến kết quả là thêm quá trình kiểm thử tĩnh trong quá trình thiết kế tài liệu đặc tả thiết kế.
Thông tin về mức độ rủi ro cũng có thể được sử để xác định độ ưu tiên của các hoạt động test khác nhau. Ví dụ hiệu năng hệ thống là một rủi ro cao, kiểm thử hiệu năng có thể được tiến hành ngay khi code được tích hợp là sẵn sàng. Tương tự như một chiến lược reactive được sử dụng, việc lập kế hoạch cho việc tạo ra các hạn định kiểm tra là các công cụ cho kỹ thuật test động như kiểm thử khám phá có thể được chứng minh.
Thêm vào đó, giai đoạn lập kế hoạch kiểm thử là nơi tiếp cận kiểm thử được định nghĩa rõ ràng bởi người quản lý kiểm thử bao gồm các mức độ kiểm thử được triển khai, các mục đích, mục tiêu của mỗi mức độ và các kỹ thuật kiểm thử nào sẽ được sử dụng ở mỗi mức độ kiểm thử. Ví dụ như kiểm thử của một hệ thống điện dựa trên mức độ rủi ro, một quy định đánh giá rủi ro mức độ của bao phủ code được yêu cầu và do đó các kỹ thuật kiểm thử nào nên được sử dụng.
Các mối quan hệ phức tạp có thể tồn tại giữa test basis, các điều kiện kiểm thử và các kiểm thử mà có thể bao phủ chúng. Mối quan hệ nhiều nhiều thường tồn tại giữa các sản phẩm công việc. Chúng cần được hiểu để có thể làm kế hoạch kiểm thử, giám sát và điều khiển có hiệu quả. Quyết định các công cụ cũng có thể phụ thuộc vào việc hiểu các mỗi quan hệ này.
Mối quan hệ cũng có thể tồn tại giữa các sản phẩm công việc được tạo ra bởi đội phát triển và đội kiểm thử. Ví dụ, ma trận theo dấu có thể cần để theo dấu mối quan hệ giữa các thành phần đặc tả thiết kế chi tiết từ các nhà thiết kế hệ thống, các yêu cầu về business từ các nhà phân tích business và các sản phẩm công việc kiểm thử được xác định bởi đội kiểm thử. Nếu các trường hợp kiểm thử ở mức thấp là được thiết kế và được sử dụng, chúng có thể là một yêu cầu được xác định trong các giai đoạn lập kế hoạch mà chúng là các văn bản thiết kế chi tiết từ đội phát triển được phê duyệt trước khi việc tạo các trường hợp kiểm thử có thể bắt đầu.
Kế hoạch kiểm thử cũng có thể liệt kê các đặc trưng cụ thể của phần mềm nằm trong phạm vi của phần mềm, cũng như các đặc trưng mà không nằm trong phạm vi của phần mềm. Phụ thuộc vào các mức độ của hình thức và các văn bản thích hợp với dự án, mỗi đặc trưng mà nằm trong phạm vi có thể được liên kết với một đặc tả thiết kế kiểm thử tương ứng.
Kế hoạch kiểm thử cũng có thể là một yêu cầu ở giai đoạn này cho các Test Manager làm việc với các nhà kiến trúc dự án để xác định đặc tả môi trường kiểm thử ban đầu, để xác định nguồn tài nguyên hiện có được yêu cầu, để đảm bảo rằng người mà sẽ cài đặt môi trường sẽ chấp nhận làm như vậy, và để hiểu được chi phí hay ước lượng thời gian bàn giao sản phẩm và các công việc cần thiết để hoàn thành và đưa lên môi trường kiểm thử.
Cuối cùng, tất cả các phụ thuộc bên ngoài và các thỏa thuận mức độ dịch vụ được liên kết nên được xác định và nếu được yêu cầu hợp đồng ban đầu nên được làm. Ví dụ sự phụ thuộc là tài nguyên yêu cầu tới một nhóm ở bên ngoài, phụ thuộc ở các dự án khác, các nhà đầu tư bên ngoài hoặc các đối tác phát triển khác, đội triển khai và các nhà quản trị cơ sở dữ liệu.

## 1.2  Giám sát và điều khiển kiểm thử
Để cho một nhà quản lý kiểm thử cung cấp điều khiển kiểm thử có hiệu quả , một lịch kiểm thử và khung làm việc giám sát cần được thiết lập để có khả năng theo dấu của các sản phẩm công việc kiểm thử và các nguồn tài nguyên so với kế hoạch. Khung công việc này nên bao gồm các độ đo chi tiết và các mục tiêu cần thiết liên quan đến trạng thái của các sản phẩm công việc kiểm thử và các hoạt động tới kế hoạch và các mục tiêu chiến lược.
Các dự án ít phức tạp và nhỏ, nó có thể dễ dàng liên kết đến các sản phẩm công việc kiểm thử và các hoạt động để lập kế hoạch và mục tiêu chiến lược, nhưng thông thường các mục tiều chi tiết hơn cần được xác định để đạt được điều này. Nó có thể bao gồm các biện pháp và mục tiều để gặp được các mục tiêu kiểm thử và bao phủ được test basis.
Đặc biệt quan trọng là cần liên quan đến trạng thái của các sản phẩm công việc kiểm thử và các hoạt động tới  test basic theo cách có thể hiểu và  thích hợp với dự án và các bên liên quan.
Xác định mục tiêu và tiến độ đo dựa trên điều kiện kiểm thử và nhóm điều kiện kiểm thử có thể được sử dụng như một phương tiện để đạt được điều này bằng cách liên quan đến các sản phẩm công việc kiểm thử tới test basic thông qua các điều kiện kiểm thử. Việc truy xuất nguồn gốc được cấu hình đúng cách, bao gồm khả năng báo cáo trên các trạng thái theo dấu, tạo mối quan hệ phức tạp mà hiện có giữa phát triển sản phẩm, test basis, và các sản phẩm công việc được minh bạch và dễ hiểu hơn.
Đôi khi, các biện pháp và mục tiêu cụ thể mà các bên liên quan yêu cầu được theo dõi không liên quan trực tiếp đến chức năng của hệ thống hoặc đặc tả kỹ thuật, đặc biệt nếu có ít hoặc không có tài liệu chính thức. Sự tham gia của các nhà đầu tư ở ngay giai đoạn đầu trong một dự án có thể giúp định nghĩa những biện pháp và mục đích không chỉ có thể được sử dụng để cung cấp điều khiển tốt hơn trong suốt dự án mà còn giúp các hoạt động kiểm thử trong dự án dễ dàng hơn. Ví dụ, các biện pháp và mục đích của nhà đầu tư có thể đưa tới kết quả trong cấu trúc của kế hoạch thiết kế kiểm thử, test implementation và thực hiện kiểm thử để tạo thuận lợi cho việc giám sát quá trình kiểm thử chống lại những biện pháp này. Những mục tiêu này cũng giúp cung cấp theo dấu cho một mức độ kiểm thử đặc biệt và có khả năng giúp cung cấp thông tin theo dấu dọc theo các mức độ kiểm thử khác nhau.
Test control là một hoạt động liên tục. Nó liên quan đến việc so sánh quá trình thực tế so với kế hoạch và các hoạt động điều chỉnh khi cần thiết. Test control hướng dẫn việc kiểm thử để hoàn thành nhiệm vụ, các chiến lược và mục tiêu bao gồm cả việc xem lại các hoạt động lập kế hoạch kiểm thử nếu cần thiết. Các phản ứng phù hợp tới việc điều khiển dữ liệu phụ thuộc vào thông tin lập kế hoạch cụ thể.

# 2. Phân tích kiểm thử

Phân tích kiểm thử là hoạt động mà định nghĩa "Cái gì" là được test trong khung của các điều kiện kiểm thử. Các điều kiện kiểm thử có thể được xác định bởi việc phân tích của test basis, các mục tiêu kiểm thử và các rủi ro của sản phẩm. Chúng có thể được xem như các biện pháp chi tiết và mục đích cho sự thành công và chúng nên có khả năng truy xuất ngược tới test basis và các mục tiêu chiến lược cụ thể bao gồm các tiêu kiểm thử và các dự án khác hoặc điều kiện của các bên liên quan cho sự thành công. Các điều kiện kiểm thử nên có khả năng truy xuất ngược lại tới các thiết kế kiểm thử và các sản phẩm kiểm thử như các sản phẩm đã được tạo ra.
Phân tích kiểm thử cho một mức độ kiểm thử được đưa ra có thể được thực hiện ngay khi những cái cơ bản cho kiểm thử được thiết lập cho mức độ đó. Các kỹ thuật kiểm thử thông thường và các kỹ thuật phân tích chung khác ( ví dụ chiến lược phân tích dựa trên rủi ro và chiến lược phân tích dựa trên các yêu cầu) có thể được sử dụng để xác định các điều kiện kiểm thử. Các điều kiện kiểm thử có thể có hoặc không các biến các giá trị đặc biệt phụ thuộc vào mức độ của kiểm thử,  thông tin hiện có ở thời gian đưa ra phân tích và mức độ chi tiết được chọn.
Có một số các yếu tố để cân nhắc khi quyết định mức độ chi tiết cái mà xác định các điều kiện kiểm thử bao gồm:

* Mức độ kiểm thử
* Mức độ chi tiết và chất lượng của test basis
* Độ phức tạp của phần mềm hay hệ thống
* Độ rủi ro của sản phẩm hay dự án
* Mối quan hệ giữa test basis, cái gì sẽ được kiểm thử và nó được kiểm thử như thế nào
* Chu kỳ phát triển phần mềm đang sử dụng
* Công cụ quản lý kiểm thử đang được sử dụng
* Mức độ của thiết kế kiểm thử và các sản phẩm kiểm thử khác được xác định và được ghi lại
* Các kỹ năng và kiến thức của các nhà phân tích kiểm thử
* Khả năng của các bên liên quan đến dự án cho việc tư vấn.

Các điều kiện kiểm thử đặc biệt trong một điều kiện cụ thể sẽ dẫn tới kết quả là số lượng các điều kiện kiểm thử lớn hơn. Ví dụ như bạn có một điều kiện kiểm thử là " Test checkout " cho một ứng dụng thương mại điện tử. Tuy nhiên trong văn bản điều kiện kiểm thử cụ thể, nó có thể được chia nhỏ thành nhiều điều kiện kiểm thử như là điều kiện  mỗi phương pháp thanh toán được hỗ trợ, một điều kiện cho  mỗi quốc gia đích có thể thanh toán...

Một số thuận lợi của các điều kiện kiểm thử đặc biệt ở mức độ chi tiết bao gồm:

* Tạo điều kiện linh hoạt hơn liên quan đến các sản phẩm kiểm thử  tới test basis và các mục tiêu kiểm thử, vì vậy sẽ cung cấp về việc giám sát và điều khiển chi tiết hơn, tốt hơn cho người quản lý kiểm thử.
* Đóng góp ngăn chặn lỗi 
* Các sản phẩm công việc kiểm thử liên quan đến các bên liên quan mà họ có thể hiểu
* Giúp đỡ ảnh hưởng và trực tiếp không chỉ các hoạt động kiểm thử mà còn các hoạt động phát triển
* Khả năng thiết kế kiểm thử, triển khai và thực hiện cùng với kết quả của sản phẩm công việc được tối ưu hóa bởi nhiều bao phủ có hiệu quả hơn của các mục đích và phương pháp chi tiết.
* Cung cấp những cơ sở cho việc theo dấu rõ ràng hơn trong một mức độ kiểm thử

Điểm không thuận lợi của các điều kiện kiểm thử đặc biệt ở mức độ chi tiết bao gồm:

* Có khả năng mất thời gian
* Việc bảo trì có thể trở nên khó khăn khi thay đổi môi trường
* Mức độ của hình thức cần được định nghĩa và thực hiện toàn đội.

Tài liệu đặc tả của các điều kiện kiểm thử có thể có hiệu quả đặc biệt trong các trường hợp dưới đây:

* Phương pháp tài liệu thiết kế kiểm thử, ví dụ như checklist, được sử dụng do phù hợp vòng đời phát triển, các ràng buộc chi phí, thời gian hoặc các yếu tố khác.
* Có ít hoặc không có các yêu cầu chính thức hoặc các sản phẩm công việc phát triển là có sẵn như là test basis.
* Dự án có quy mô lớn, độ phức tạp hoặc rủi ro cao và yêu cầu một mức độ của việc điều khiển và giám sát mà không thể bàn giao bởi các trường hợp kiểm thử đơn giản liên quan tới các sản phẩm công việc phát triển.

Các điều kiện kiểm thử có thể được xác định ít chi tiết khi test basis có thể được liên quan một cách dễ àng và trực tiếp tới các sản phẩm công việc thiết kế kiểm thử. Nó gần giống với các trường hợp dưới đây:

* Kiểm thử mức thành phần.
* Các dự án độ phức tạp ít nơi các mối quan hệ phân cấp tồn tại giữa cái gì được kiểm thử và nó được kiểm thử như thế nào là đơn giản .
* Kiểm thử chấp nhận nơi mà các trường hợp có thể được sử dụng để giúp xác định kiểm thử

# 3. Thiết kế kiểm thử
Thiết kế kiểm thử là hành động định nghĩa một số thứ được kiểm thử như thế nào. Nó liên quan đến việc xác định các trường hợp kiểm thử bằng việc xây dựng từng bước của các điều kiện kiểm thử được xác định hoặc test basis sử dụng các kỹ thuật kiểm thử đã xác định trong chiến lược kiểm thử hoặc kế hoạch kiểm thử.
Phụ thuộc vào hướng tiếp cận đang được sử dụng cho việc giám sát kiểm thử, điều khiển kiểm thử và truy vết, các trường hợp kiểm thử có thể liên quan trực tiếp ( hoặc gián tiếp liên quan thông qua điều kiện kiểm thử) tới các test basis và các mục tiêu được định nghĩa. Những mục tiêu bao gồm mục tiêu về chiến lược, các mục tiêu về kiểm thử và các điều kiện ràng buộc về dự án hoặc các bên có liên quan khác cho sự thành công.
Thiết kế kiểm thử cho một mức độ kiểm thử được đưa ra có thể được thực hiện một khi các điều kiện kiểm thử được xác định và đủ thông tin có sẵn  để có khả năng tạo ra các trường hợp kiểm thử ở mức thấp hoặc cao, theo phương pháp tiếp cận tới thiết kế kiểm thử. Đối với kiểm thử ở những mức cao hơn thiết kế kiểm thử là một hoạt động riêng theo sau phân tích kiểm thử. còn đối mới các mức kiểm thử ở mức thấp hơn thì thiết kế và phân tích kiểm thử sẽ được tạo như một hoạt động tích hợp.

# 4. Test implementation
Test implementation là hoạt động trong đó các kiểm thử được tổ chức và được ưu tiên bởi các nhà phân tích kiểm thử. Test implementation là hoạt động nơi mà các thiết kế kiểm thử được thực hiện như các trường hợp kiểm thử, các thủ tục kiểm thử và các dữ liệu kiểm thử. Một số tổ chức ví dụ như chuẩn IEE829 định nghĩa các đầu vào và các kết quả được mong đợi liên quan trong tài liệu đặc tả trường hợp kiểm thử và các bước thực hiện kiểm thử trong các tài liệu đặc tả thủ tục kiểm thử. Thông thường, các đầu vào kiểm thử, các kết quả mong đợi và các bước thực hiện đều được ghi lại cùng nhau. Test implementation cũng bao gồm việc tạo dữ liệu kiểm thử được lưu trữ.
Test implementation cũng gọi ra việc kiểm tra cuối cùng để đảm bảo cho đội kiểm thử sẵn sàng thực hiện test. Việc kiểm tra cũng bao gồm việc đảm bảo bàn giao môi trường kiểm thử được yêu cầu, dữ liệu kiểm tra và mã code và tất cả các trường hợp kiểm thử đã được viết, được review và sẵn sàng để có thể được chạy. Test implementation cũng có thể liên quan đến phát triển một môi trường kiểm thử miêu tả chi tiết và dữ liệu kiểm thử.
Mức độ chi tiết và độ phức tạp của công việc liên quan được làm trong suốt test implementation có thể bị ảnh hưởng bởi chi tiết của sản phẩm công việc kiểm thử ( ví dụ như các trường hợp kiểm thử và các điều kiện kiểm thử). Trong một số trường hợp, đặc biệt nơi mà các kiểm thử là có thể được lưu trữ để sử dụng lại trong kiểm thử hồi quy, các kiểm thử có thể cung cấp các miêu tả chi tiết các  bước cần thiết để thực hiện kiểm thử nhằm đảm bảo tính nhất quán , độ tin cậy. Nếu áp dụng các luật quy định, kiểm thử nên cung cấp các bằng chứng của việc tuân thủ các chuẩn có thể được áp dụng.
Trong test implementation, trật tự nơi mà kiểm thử tự động hay bằng tay được chạy nên được bao gồm trong một lịch thực hiện kiểm thử. Các nhà quản lý kiểm thử nên kiểm tra một cách cẩn thận cho các ràng buộc, bao gồm mức độ rủi ro và độ ưu tiên, mà có thể yêu cầu các kiểm thử chạy theo trật tự đặc biệt hoặc trên thiết bị cụ thể. Sự phụ thuộc trên môi trường kiểm thử hoặc dữ liệu kiểm thử phải được biết đến và được kiểm tra.
Có một số không thuận lợi ở test implementation sớm như trong mô hình agile, mã nguồn có thể thay đổi, công việc thực hiện trở nên lỗi thời. Thậm chì với một chu trình phát triển ít thay đổi như chu trình phát triển lặp hay tăng dần có thể dẫn đến những thay đổi đáng kế giữa các vòng lặp, tạo ra các kịch bản kiểm thử không đáng tin cậy hoặc bắt buộc yêu cầu bảo trì cao. Điều này cũng đúng với chu trình phát triển tuần tự được quản lý kém, nơi mà các yêu cầu thay đổi thường xuyên, thậm chí vào lúc cuối của dự án. Effort khi tham gia vào một test implementation lớn thì nên nểu về chu trình phát triển của phần mềm và dự đoán được các đặc trưng của phẩn mềm sẽ có cho việc kiểm thử.
Cũng có những thuận lợi trong test implementation sớm ví dụ như các kiểm thử cụ thể cung cấp các ví dụ của phần mềm nên có các hành vi như thế nào đã thực hiện nếu được viết phù hợp với kiểm thử cơ bản. Các chuyên gia ở lĩnh vực kinh doanh thường tìm việc xác minh của các kiểm thử cụ thể thì dễ hơn việc xác minh các quy tắc kinh doanh trừu tượng do đó có thể xác định thêm các yếu kém trong đặc tả phần mềm. Như các kiểm thử được xác minh có thể cung cấp các miêu tả của các hành vi được yêu cầu cho các nhà thiết kế phần mềm và các kỹ thuật viên phát triển phần mềm.

# 5. Thực hiện kiểm thử

Test execution thường bắt đầu khi các mục tiêu kiểm thử được đưa ra và các ràng buộc đầu vào tới thực hiện kiểm thử là thỏa mãn. Kiểm thử nên được thiết kế hoặc ít nhất được xác định trước khi thực hiện kiểm thử. Các công cụ nên có đặc biệt cho quản lý kiểm thử, theo dấu lỗi và tự động thực hiện kiểm thử nếu có thể được áp dụng. Theo dấu kết quả kiểm thử bao gồm theo dấu độ đo nên được làm và dữ liệu được theo dõi nên được hiểu bởi tất cả các thành viên của đội. Chuẩn cho test log và báo cáo lỗi nên sẵn sàng và được công khai. 
Kiểm thử nên được thực hiện theo các trường hợp kiểm thử, mặc dù người quản lý kiểm thử sẽ cân nhắc một số vùng vì vậy các người kiểm thử sẽ bao phủ thêm các kịch bản kiểm thử và các hành vi mà đã quan sát được trong suốt quá trình kiểm thử.
Vai trò chính của Test Manager trong suốt quá trình thực hiện test là giám sát quá trình thực hiện theo kế hoạch kiểm thử. Nếu cần thiết họ sẽ đưa ra các hoạt động điều khiển để hướng dẫn việc kiểm thử tới được kết quả thành công gặp được các giới hạn về nhiệm vụ, mục tiêu và chiến lược. Để làm được như thế, Test Manager có thể sử dụng việc theo dấu từ các kết quả kiểm tra quay ngược lại tới các điều kiện kiểm thử, test basis và cuối cùng là mục tiêu kiểm tra và cũng từ các mục tiêu kiểm tra tới kết quả kiểm tra. 

# 6. Đánh giá Exit Criteria và báo cáo

Từ quan điểm đánh giá quy trình kiểm thử, điều đó là quan trọng để đảm bảo quy trình có hiệu quả để cung cấp các nguồn thông tin cần thiết cho việc đánh giá exit Criteria và báo cáo.
Định nghĩa của các yêu cầu thông tin và phương pháp cho việc thu thập là một phần của kế hoạch kiểm tra, giá sát và điều khiển. Trong suốt quá trình phân tích, thiết kế kiểm thử,  triển khai và thực hiện kiểm thử Test Manager nên đảm bảo các thành viên của đội kiểm thử đều có trách nhiệm cho các hoạt động này cung cấp thông tin được yêu cầu một cách chính xác và kịp thời để tạo thuận lợi cho việc đánh giá và báo cáo có hiệu quả.
Tần suất và mức độ chi tiết được yêu cần cho báo cáo là phụ thuộc vào dự án và tổ chức. Điều này nên được bàn bạc trong suốt giai đoạn lập kế hoạch kiểm thử và nó bao gồm cả kết luận của các thành phần liên quan đến dự án.

# 7. Hoạt động Test Closure

Một khi thực hiện kiểm thử được hoàn thành, các đầu ra chính được ghi lại và hoặc là chuyển tới người thích hợp hoặc là được lưu trữ. Những cái đó được gọi là hoạt động Test closure. Test closure thường nằm trong bốn nhóm sau:
1. Kiểm tra việc hoàn thành kiểm thử: đảm bảo rằng tất cả các công việc kiểm thử đều được kêt luận. Ví dụ như tất cả các kiểm thử theo kế hoạch hoặc là được chạy hoặc là cố ý được bỏ qua. Tát cả các lỗi đã được sửa chữa và được kiểm tra lại, được hoãn lại cho lần chuyển giao khác trong tương lai hoặc được chấp nhận như một hạn chế của hệ thống.
2. Chuyển giao test artifacts: chuyển giao các sản phẩm công việc có giá trị tới những người cần chúng. Ví dụ các lỗi mà được hoãn lại hay được chấp nhận nên được truyền đạt tới người sẽ sử dụng và hỗ trợ sử dụng của hệ thống. Các môi trường kiểm thử và kiểm thử nên được đưa cho các người có trách nhiệm bảo trì hệ thống. Tập các kiểm thử hồi quy nên được ghi lại và đưa cho đội bảo trì.
3. Bài học được rút ra: việc thực hiện và tham gia trong cuộc họp nhìn lại nơi mà các bài học quan trọng có thể được ghi lại. Trong những cuộc họp này, các kế hoạch được đưa ra để đảm bảo rằng các điểm tốt có thể sẽ được lặp lại và các điểm còn yếu sẽ không được lặp lại,  các vấn đề không thể được giải quyết, chúng được ghi lại trong kế hoạch dự án. 
4. Đóng gói các kết quả, logs, báo cáo và các văn bản khác, các sản phẩm công việc trong hệ thống quản lý cấu hình. Ví dụ, kế hoạch kiểm thử và kế hoạch dự án nên cùng được lưu trữ trong kho lưu trữ kế hoạch, với một liên kết rõ ràng tới hệ thống và phiên bản được sử dụng.
Những nhiệm vụ này là quan trọng và thường bị bỏ qua nên được bao gồm một cách rõ ràng như một phần của kế hoạch kiểm thử.

# 8. Kết luận
Như vậy quy trình kiểm thử ở mức độ advanced đã được chia nhỏ hơn so với mức độ foundation cụ thể như ở mức advance giai đoạn lập kế hoạch và điều khiển đã thêm cả giám sát quy trình kiểm thử. Các giai đoạn phân tích , thiết kế , triển khai và thực hiện kiểm thử đều được chi nhỏ thành các giai đoạn riêng. Ở mức độ này chúng ra không chỉ nhớ quy trình, tuân thủ theo quy trình mà phải nắm rõ quy trình,  từng bước của quy trình, cũng như đặc điểm của từng quy trình để xác định được các chiến lược cho từng bước quy trình để có thể hướng dẫn cho các thành viên trong đội kiểm thử cho chúng ta thực hiện theo.

*Tài liệu tham khảo*: https://www.istqb.org/downloads/send/10-advanced-level-syllabus-2012/54-advanced-level-syllabus-2012-test-manager.html