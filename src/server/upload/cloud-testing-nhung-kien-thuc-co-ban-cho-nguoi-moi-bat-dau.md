Trong bài viết này, chúng ta sẽ tìm hiểu cách thực hiện "kiểm thử đám mây". Để hiểu được điều này, trước hết chúng ta cần biết khái niệm điện toán đám mây. Bài viết này giải thích về điện toán đám mây, kiểm thử trên đám mây và những thách thức chính khi kiểm thử trên đám mây.
# Giới thiệu về điện toán đám mây

Vài năm trước, ngành công nghiệp đã chứng kiến một từ mới và công nghệ gọi là “ảo hóa”. Với sự ra đời của ảo hóa, hệ tư tưởng chia sẻ tài nguyên máy tính trên nhiều hệ điều hành nhằm tăng khả năng mở rộng, giảm chi phí vốn và cho phép quản trị cơ sở hạ tầng CNTT dễ dàng, nó trở thành xương sống của một số doanh nghiệp.

Trong vài năm qua, CNTT đã chứng kiến một sự tiến hóa của ảo hóa dưới dạng điện toán đám mây. Bất kỳ người mới nào vào đám mây đều phải hình dung điện toán đám mây như một mô hình xem mọi thứ “Là một dịch vụ”. Rõ ràng là xác định điện toán đám mây như một giải pháp tổng thể cung cấp CNTT như một Dịch vụ. Giống như ảo hóa, phương châm của nó là chia sẻ tài nguyên nhờ đó phân bổ và sẵn có theo yêu cầu thông qua Internet.

**Ví dụ thực tế để giải thích điện toán đám mây:**

Chúng ta có thể dễ dàng hiểu được lý thuyết về điện toán đám mây bằng cách lấy một ví dụ đơn giản về việc có một bữa ăn tại một nhà hàng. Ví dụ, xem xét việc sẽ ăn tối ở nhà so với việc sẽ ăn tối ở nhà hàng. Trong khi mục tiêu là ăn một bữa ăn, cách tiếp cận hoặc mô hình được sử dụng trong cả hai trường hợp này khác nhau ở mức độ lớn.

Ở nhà, bạn cần phải chắc chắn rằng bạn có đầy đủ các thành phần cần thiết cho bữa ăn, bạn cần phải chuẩn bị nguyên liệu cần thiết để nấu món ăn. Bạn nấu thức ăn và có trách nhiệm giữ môi trường xung quanh gọn gàng gửi món được nấu chín chỉ thuộc về bạn.

Bây giờ, mặt khác, có một bữa ăn tại một nhà hàng có thể được mô tả như là phục vụ một dịch vụ. Là một khách hàng, bạn chỉ đến nhà hàng, gọi món bạn chọn và trả tiền cho dịch vụ. Nguyên tắc sở hữu nguyên liệu, chuẩn bị món ăn, nấu món ăn, trình bày, phục vụ món ăn cho bạn, dọn dẹp và dọn dẹp bàn một lần, đóng gói bất kỳ thực phẩm dư thừa nào là nhiệm vụ của quản lý của nhà hàng.

# Đám mây chủ yếu có ba loại mô hình phân phối hoặc các thành phần có khả năng cung cấp “như một dịch vụ”:

**Cơ sở hạ tầng như một dịch vụ (IaaS):** Đây là lớp cơ bản nhất tạo thành khối xây dựng của đám mây. Nó chủ yếu bao gồm các nguồn lực vật lý như lưu trữ, thiết bị mạng, máy chủ tính toán,... Tất cả các tài nguyên máy tính này đều có sẵn theo yêu cầu, nơi người dùng trả tiền cho nó theo cách sử dụng của mình.

**Nền tảng dưới dạng Dịch vụ (PaaS):** Lớp trung tâm trong đám mây Là nền tảng. Ở đây không có quyền kiểm soát cơ sở hạ tầng cơ sở, nhưng bạn có thể truy cập các ứng dụng được triển khai. Do đó, điều này cung cấp toàn bộ môi trường chạy theo yêu cầu có thể là một môi trường phát triển hoặc kiểm thử. Do đó trong mô hình này, phổ biến nhất bạn sẽ có một máy ảo có chứa môi trường hoàn chỉnh như hệ điều hành, cần thiết middleware, vv có sẵn khi bạn cần nó.

**Phần mềm dưới dạng Dịch vụ (SaaS):** Lớp trên cùng ở đây là lớp ứng dụng, thường sẽ hiển thị với bất kỳ người dùng nào. Ở đây, các ứng dụng / sản phẩm có sẵn cho người dùng theo yêu cầu thông qua internet. Do đó thay vì phải mua giấy phép cho một người dùng cụ thể, điều này chứng tỏ là cách hiệu quả nhất về chi phí để đảm bảo rằng giấy phép luôn được sử dụng. Ví dụ về đây là Gmail, Google Tài liệu, Photoshop, v.v.

# Các loại đám mây

Có 3 loại hình đám mây là đám mây công cộng, đám mây riêng tư và đám mây lai:

**Các đám mây công cộng** là những đám mây, nơi các dịch vụ có sẵn cho tất cả mọi người, nơi các tài nguyên được phân bổ và cung cấp động theo yêu cầu.

**Các đám mây riêng** thường được quản lý trong các quy tắc tường lửa của một tổ chức cụ thể và chỉ có sẵn cho người dùng trong công ty.

**Đám mây lai** là hỗn hợp của cả đám mây riêng và công cộng. Các tổ chức có thể quyết định dịch vụ nào họ muốn hiển thị với mọi người và dịch vụ nào họ muốn chỉ hiển thị cho người dùng trong tổ chức.

# Kiểm thử đám mây - Sự cần thiết

Kiểm thử trên đám mây đề cập đến việc kiểm tra các tài nguyên như phần cứng, phần mềm, v.v. có sẵn theo yêu cầu. Ngay cả kiểm thử ở đây cũng có thể được xem là “dịch vụ”. Đối với các dịch vụ đám mây, điều cần thiết là đảm bảo rằng dịch vụ (sản phẩm) không chỉ đáp ứng các yêu cầu chức năng của nó mà còn các yêu cầu không phải chức năng. Với một loạt các ứng dụng trong đám mây, điều đó trở nên cần thiết để phát triển chiến lược kiểm thử đám mây.

# Lợi ích của kiểm thử đám mây

Sự cần thiết của kiểm thử đám mây có thể dễ dàng nhìn thấy được với những lợi ích mà chúng ta thu được từ nó, đó là quá nhiều. Dưới đây chúng tôi đã cố gắng để thảo luận về những lợi ích rõ ràng nhất giải thích tại sao Cloud là nhu cầu theo từng giờ:

**1. Tính khả dụng động của môi trường kiểm thử:** 

Phương pháp kiểm thử bình thường trong bất kỳ tổ chức nào là đầu tư vào cơ sở hạ tầng phần cứng / phần mềm cần thiết để kiểm thử. Hầu hết các bạn sẽ đồng ý rằng môi trường cung cấp cho các nhóm kiểm thử rất hiếm khi phù hợp với môi trường của khách hàng dựa trên các yêu cầu thay đổi nhanh chóng, do đó rất khó để các công ty duy trì nó. Cloud là câu trả lời duy nhất cho vấn đề này, theo đó, người dùng có thể dễ dàng tái tạo môi trường khách hàng và tìm lỗi sớm trong quá trình phát triển.

**2. Chi phí thấp:** 

Một góc độ khác với điểm trước đó là khi các công ty đầu tư vào cơ sở hạ tầng, trường hợp thông thường của nó là nhiều máy chủ của họ không được sử dụng mọi lúc. Do đó, họ có thể phải chịu thêm chi phí cho việc gia hạn giấy phép. Việc chuyển đổi sang đám mây cũng giúp ích trong trường hợp này, vì người dùng có thể sử dụng các thiết bị bất cứ khi nào họ muốn, do đó tiết kiệm chi phí rất lớn cho một tổ chức.

**3. Dễ dàng tùy chỉnh:** 

Với việc sử dụng đám mây, đây là một công cụ dễ dàng để các tổ chức mô phỏng môi trường trung tâm của người dùng cuối bằng cách tùy chỉnh nó theo cách sử dụng, tiết kiệm chi phí và thời gian. Các nhóm kiểm thử có thể dễ dàng thực hiện các kịch bản kiểm thử tải và hiệu suất bằng việc thay đổi và kết hợp khác nhau giữa các hệ điều hành, trình duyệt, cấu hình khác nhau,...

**4. Khả năng mở rộng:** 

Đây là một trong những tính năng hấp dẫn nhất của đám mây nhờ đó tài nguyên máy tính có thể được tăng hoặc giảm bất cứ nơi nào cần thiết. Điều này được sử dụng rộng rãi trong các tình huống mà yêu cầu nghiệp vụ thay đổi thường xuyên.

# Kiểm thử sâu trong lĩnh vực kiểm thử đám mây

**1. Biểu mẫu kiểm thử trên đám mây**

Kiểm thử đám mây có thể được chia thành bốn loại khác nhau dựa trên những gì họ muốn làm:

**Kiểm tra toàn bộ đám mây:** Đám mây được xem như một thực thể thống nhất dựa trên các tính năng của nó và kiểm thử được thực hiện dựa trên đó.

**Kiểm thử trong một đám mây:** Đây là kiểm thử được thực hiện bên trong đám mây bằng cách kiểm tra từng tính năng bên trong của nó

**Kiểm thử trên nhiều đám mây:** Dựa trên các thông số kỹ thuật, ở đây kiểm thử được thực hiện trên các loại đám mây công cộng, riêng tư và lai khác nhau của đám mây.

**Kiểm tra SaaS trên đám mây:** Kiểm tra chức năng và phi chức năng được thực hiện dựa trên các yêu cầu.

**2. Môi trường kiểm thử trên đám mây**

Có 3 loại môi trường kiểm thử trên đám mây:

- Một môi trường riêng tư hoặc công cộng nơi chất lượng của các ứng dụng được triển khai trong đó cần phải được xác thực.

- Một môi trường lai, nơi mà chất lượng của các ứng dụng được triển khai trong đó cần phải được xác nhận hợp lệ.

- Một môi trường thử nghiệm dựa trên đám mây, nơi chất lượng của các ứng dụng được triển khai trong đó cần phải được xác thực.

**3. Các loại kiểm thử được thực hiện trong đám mây**

Kiểm thử trên một đám mây không chỉ đảm bảo rằng các yêu cầu chức năng được đáp ứng, nhưng cần phải đặt trọng tâm mạnh vào việc thử nghiệm phi chức năng. Chúng ta hãy xem xét các loại thử nghiệm khác nhau được thực hiện.

**Kiểm thử chức năng:**

Kiểm thử chức năng để đảm bảo rằng các yêu cầu nghiệp vụ đang được đáp ứng.

Một số kiểm thử chức năng được mô tả dưới đây:

- Kiểm thử xác minh hệ thống: Điều này đảm bảo liệu các mô-đun khác nhau có hoạt động khớp với nhau hay không, do đó đảm bảo rằng hành vi của chúng đúng như mong đợi.
- Kiểm thử chấp nhận: Đây là giải pháp dựa trên đám mây được bàn giao cho người dùng để đảm bảo đáp ứng được kỳ vọng của họ.
- Kiểm thử khả năng tương tác: Bất kỳ ứng dụng nào cũng phải có tính linh hoạt để hoạt động mà không có bất kỳ vấn đề nào không chỉ trên các nền tảng khác nhau nhưng nó cũng phải hoạt động trơn tru khi di chuyển từ cơ sở hạ tầng đám mây sang nền tảng khác.

**Kiểm thử phi chức năng:**

Kiểm thử phi chức năng chủ yếu tập trung vào các kiểm thử dựa trên ứng dụng web đảm bảo rằng chúng đáp ứng các yêu cầu mong muốn.

Dưới đây là một vài dạng thử nghiệm phi chức năng:

**1) Kiểm thử tính khả dụng:** nhà cung cấp đám mây phải đảm bảo rằng đám mây có sẵn suốt ngày đêm. Vì có thể có nhiều hoạt động quan trọng trong nhiệm vụ, quản trị viên phải đảm bảo rằng không có tác động tiêu cực đến người tiêu dùng

**2) Kiểm thử việc nhiều người sử dụng:** Ở đây, nhiều người dùng sử dụng dịch vụ đám mây. Kiểm thử phải được thực hiện để đảm bảo rằng có đủ bảo mật và kiểm soát truy cập dữ liệu khi nhiều người dùng đang sử dụng một cá thể duy nhất.

**3) Kiểm thử hiệu suất:** Việc xác minh thời gian phản hồi cần phải được thực hiện để đảm bảo rằng mọi thứ vẫn còn nguyên vẹn ngay cả khi có rất nhiều yêu cầu được đáp ứng. Mạng chậm cũng là một trong những yếu tố quan trọng để đánh giá hiệu suất. Ngoài ra, cân bằng tải là công việc cần phải được thực hiện khi có giảm tải, bằng cách ngừng hoạt động tài nguyên. Do đó việc kiểm tra khả năng chịu tải và quá tải được thực hiện trong việc cung cấp đám mây để đảm bảo các ứng dụng hoạt động tối ưu với việc tăng / giảm tải và quá tải.

**4) Kiểm thử bảo mật:** Vì mọi thứ đều khả dụng bất cứ lúc nào với Cloud, điều cần thiết là đảm bảo rằng tất cả thông tin nhạy cảm của người dùng không có quyền truy cập trái phép và quyền riêng tư của người dùng vẫn còn nguyên vẹn. Khi duy trì các ứng dụng trong đám mây, toàn vẹn dữ liệu người dùng cũng phải được xác minh.

**5) Kiểm thử khôi phục thảm họa:** Như đã nêu trong kiểm tra tính khả dụng, đám mây luôn sẵn sàng và nếu có bất kỳ sự cố nào như mất mạng, hỏng hóc do tải cực đoan, lỗi hệ thống, v.v. thất bại được chỉ ra và nếu có bất kỳ mất mát dữ liệu nào xảy ra trong giai đoạn này.

**6) Kiểm thử khả năng mở rộng:** Kiểm tra để đảm bảo rằng dịch vụ có khả năng cung cấp các tiện ích mở rộng quy mô hoặc giảm kích thước theo nhu cầu.

# Công cụ kiểm thử đám mây
**1. Công cụ kiểm thử hiệu năng:**

Nhiều công cụ cơ bản được sử dụng để thực hiện để kiểm thử tải và quá tải. Một số công cụ dưới đây cũng có thể được sử dụng để kiểm thử chức năng:

SOASTA CloudTest

LoadStorm

CloudTestGo

AppPerfect

Jmeter

Cloudslueth

CloudTestGo

AppPerfect

**2. Công cụ kiểm thử bảo mật đám mây:**

Ngoài ra còn có một số công cụ liên quan đến bảo mật thường được sử dụng:

Nessus
Wireshark
Nmap

# Những thách thức của Kiểm thử đám mây

**Thách thức # 1.** Với mọi thứ có sẵn theo yêu cầu cho bất kỳ người dùng nào, bảo mật là vấn đề chính đối với các doanh nghiệp vì hiện tại vẫn còn rất nhiều thảo luận và nghiên cứu đang diễn ra trong ngành để thiết lập các tiêu chuẩn bảo mật. Bảo vệ quyền riêng tư của người dùng, các tiêu chuẩn bảo mật trên đám mây, bảo mật các ứng dụng chạy trên đám mây, các kỹ thuật kiểm thử bảo mật là một số vấn đề chính cần được giải quyết trong cơ sở hạ tầng đám mây.

**Thách thức # 2.** Một thách thức lớn khác là hiệu suất của một ứng dụng trong một đám mây, đặc biệt là trong các đám mây riêng. Nó sẽ được chia sẻ trên nhiều người dùng và do đó có thể dẫn đến sự chậm trễ. Ngoài ra trong trường hợp một số hoạt động bảo trì hoặc ngừng hoạt động, băng thông có thể là không đủ.

**Thách thức # 3.** Đôi khi nhằm mục đích thử nghiệm, chúng tôi yêu cầu một số cấu hình nhất định đối với máy chủ, bộ nhớ hoặc mạng có thể không được nhà cung cấp dịch vụ đám mây hỗ trợ. Điều này đôi khi gây khó khăn cho việc mô phỏng môi trường của khách hàng.

**Thách thức # 4.** Một thách thức thường gặp khác là đối với kiểm thử tích hợp, mà ở đó kiểm thử viên kiểm tra mạng, cơ sở dữ liệu, máy chủ,... Trong những trường hợp như vậy, kiểm thử viên sẽ không có quyền kiểm soát môi trường cơ bản. Thứ hai, thách thức được tăng gấp đôi khi phải có sự tương tác giữa các thành phần này bởi vì kiểm thử viên sẽ phải lường trước những rủi ro như sự cố, sự cố mạng hoặc máy chủ đang chạy kaput.

# Kết luận
Ngày nay, điện toán đám mây đã trở thành một trong những “tiếng nổ lớn” trong ngành. Hầu hết các tổ chức hiện đang dựa vào việc áp dụng đám mây vì tính linh hoạt, khả năng mở rộng và chi phí thấp hơn.

Sử dụng đám mây để kiểm thử là thực sự hữu ích trong việc giúp các tổ chức có được các công cụ cần thiết, giấy phép phần mềm, cơ sở hạ tầng với chi phí rất thấp mà không phải tự thiết lập và sau đó lo lắng về việc có được sử dụng tối đa.

Về tác giả: Đây là bài viết của Sneha Nadig. Cô đang làm việc trong vai trò test lead với hơn 7 năm kinh nghiệm trong các dự án kiểm thử thủ công và tự động hóa.

Nguồn:
https://www.softwaretestinghelp.com/getting-started-with-cloud-testing/