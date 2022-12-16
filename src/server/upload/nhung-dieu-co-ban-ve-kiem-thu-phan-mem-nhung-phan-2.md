Những  đặc điểm riêng biệt của phần mềm nhúng so với phần mềm ứng dụng là:
- Phần mềm nhúng phải chạy đáng tin cậy mà không bị rơi vào vô hạn.
- Phần mềm nhúng thường được sử dụng trong các ứng dụng mà ở đó nếu con người sống sẽ đe dọa.
- Các hệ thống nhúng thường rất nhạy cảm với chi phí, phần mềm có rất ít hoặc không có lợi nhuận nguyên nhân do sự thiếu hiệu quả dưới bất kỳ hình thức nào.
- Phần mềm nhúng thường phải bù đắp cho các vấn đề với phần cứng được nhúng.
- Các sự kiện trong thế giới thực thường không đồng bộ và không xác định, làm cho các thử nghiệm mô phỏng khó khăn và không đáng tin cậy.
- Công ty của bạn có thể bị kiện nếu mã của bạn bị lỗi.

Do những khác biệt này, việc kiểm thử phần mềm nhúng khác với thử nghiệm ứng dụng theo bốn điểm chính:

Thứ nhất, bởi vì thời gian thực và sự đồng thời là rất khó để nhận đúng, rất nhiều thử nghiệm tập trung vào xử lý thời gian thực. 
Thứ hai, bởi vì hầu hết các hệ thống nhúng là các hệ thống thời gian thực bị hạn chế về tài nguyên, nên cần có nhiều kiểm tra về hiệu suất và khả năng hơn. 
Thứ ba, có thể sử dụng một số công cụ theo dõi thời gian thực để đo lường mức độ hiệu quả của các bài kiểm tra. 
Thứ tư, Bạn sẽ thử nghiệm ở mức độ tin cậy cao hơn nếu bạn đang thử nghiệm phần mềm ứng dụng.

### 1. Kích thước của sự tích hợp
Hầu hết các thảo luận về tích hợp hệ thống của chúng ta đều tập trung vào việc tích hợp phần cứng và phần mềm. Tuy nhiên, giai đoạn tích hợp thực sự có ba chiều: phần cứng, phần mềm và thời gian thực.
Phần cứng có thể hoạt động như được thiết kế, phần mềm có thể chạy như được mong muốn, nhưng sản phẩm nói chung vẫn có thể thất bại vì các vấn đề về thời gian thực.

Một số nhà thiết kế đã lập luận rằng việc tích hợp một hệ điều hành thời gian thực (RTOS) với phần cứng và phần mềm ứng dụng là một giai đoạn riêng biệt của chu trình phát triển. Nếu chúng ta chấp nhận quan điểm đó, sau đó chúng ta có thể tiếp tục chia nhỏ giai đoạn tích hợp thành tài khoản cho những nhiệm vụ không quan trọng khi tạo gói bảng hỗ trợ cho phần cứng (BSP) . Không có BSP, RTOS không thể chạy trên nền tảng đích.

Tuy nhiên, nếu bạn đang sử dụng nền tảng phần cứng tiêu chuẩn trong hệ thống của mình, chẳng hạn như một trong nhiều máy tính bảng đơn thương mại có sẵn (SBC), BSP của bạn có thể đã được phát triển cho bạn. Ngay cả với một BSP được thiết kế tốt, có rất nhiều vấn đề tinh tế cần được giải quyết khi chạy theo một RTOS.

Để nói rằng sự tích hợp của RTOS, phần cứng, phần mềm và môi trường thời gian thực đại diện cho bốn thứ nguyên phổ biến nhất của giai đoạn tích hợp của một sản phẩm được nhúng. Vì RTOS là một phần tử trung tâm của một sản phẩm nhúng, nên bất kỳ cuộc thảo luận nào về các công cụ đều yêu cầu chúng ta thảo luận chúng trong bối cảnh của chính RTOS.

Một ví dụ đơn giản sẽ giúp minh họa điểm này. Giả sử bạn đang gỡ lỗi chương trình C trên máy tính của bạn hoặc máy trạm UNIX. Để đơn giản, hãy giả sử rằng bạn đang sử dụng trình biên dịch GNU và trình gỡ lỗi, GCC và GDB, tương ứng. Khi bạn dừng ứng dụng của mình để kiểm tra giá trị của một biến, máy tính của bạn không dừng lại.

Chỉ ứng dụng đang được gỡ lỗi đã ngừng chạy; phần còn lại của máy đang chạy tốt. Nếu chương trình của bạn bị treo trên nền tảng UNIX, bạn có thể nhận được một kết xuất lõi, nhưng bản thân máy tính vẫn tiếp diễn. Bây giờ, hãy tương phản điều này với hệ thống nhúng của chúng tôi.

Nếu không có một RTOS, khi một chương trình chết, hệ thống nhúng sẽ ngừng hoạt động - thời gian để xoay vòng nguồn hoặc nhấn RESET. Nếu RTOS đang chạy trong hệ thống và các công cụ gỡ rối được coi là “RTOS,” thì rất có khả năng bạn có thể tạm dừng một trong các tiến trình đang chạy và thực hiện theo quy trình gỡ lỗi giống như trên máy chủ.

RTOS sẽ giữ cho phần còn lại của hệ thống nhúng hoạt động “chủ yếu là bình thường” ngay cả khi bạn đang vận hành một trong các quy trình dưới sự kiểm soát của trình gỡ rối. Vì đây là một nhiệm vụ khó khăn để làm và làm tốt, nhà cung cấp RTOS có vị trí duy nhất để cung cấp cho khách hàng của mình các công cụ tinh chỉnh hỗ trợ gỡ lỗi trong môi trường RTOS. 

Do đó, chúng ta có thể tóm tắt rằng quyết định sử dụng RTOS có thể có hiệu ứng gợn sóng thông qua toàn bộ quá trình thiết kế và sẽ thể hiện rõ nhất khi RTOS, phần mềm ứng dụng và phần cứng được kết hợp với nhau. Nếu các công cụ được thiết kế tốt, quy trình có thể cực kỳ phức tạp. Nếu các công cụ không hoạt động, sản phẩm có thể không bao giờ được ứng dụng chạy thực tế

### 2. Chế độ lỗi thời gian thực

Bạn biết những gì về cách phần mềm thường lỗi, nó ảnh hưởng như thế nào tới việc bạn chọn các bài thử nghiệm? Vì các hệ thống nhúng xử lý rất nhiều sự kiện không đồng bộ, nên bộ kiểm thử cần tập trung vào các chế độ lỗi thời gian thực điển hình.

Ở mức tối thiểu, bộ thử nghiệm sẽ tạo ra cả trường hợp thời gian thực điển hình và xấu nhất trong thời gian thực. Nếu thiết bị là bộ điều khiển cho ứng dụng ô tô, thiết bị có khóa sau một chuỗi các sự kiện không lường trước được, chẳng hạn như khi radio, cần gạt nước kính chắn gió và đèn pha đều được bật đồng thời không? Liệu nó có khóa khi các vật phẩm đó được bật lên nhanh chóng theo một thứ tự nhất định? Điều gì xảy ra nếu radio được bật và tắt nhanh 100 lần liên tiếp?

Trong mọi hệ thống thời gian thực, sự kết hợp nhất định của các sự kiện (gọi là chuỗi cần thiết) gây ra sự chậm trễ lớn nhất từ một kích hoạt sự kiện cho phản ứng. Bộ thử nghiệm nhúng phải có khả năng tạo ra tất cả các chuỗi cần thiết và đo thời gian phản hồi liên quan.

Đối với một số nhiệm vụ thời gian thực, khái niệm thời hạn quan trọng hơn độ trễ. Có lẽ điều quan trọng là hệ thống của bạn thực hiện một nhiệm vụ nhất định vào đúng 5:00 giờ chiều. mỗi ngày. Điều gì sẽ xảy ra nếu chuỗi sự kiện quan trọng xảy ra ngay lúc 5:00 chiều? Liệu nhiệm vụ có thời hạn sẽ bị trì hoãn quá thời gian yêu cầu?

Các lỗi hệ thống nhúng do không đáp ứng thời hạn được gọi là lỗi thời gian thực. Tương tự như vậy, hiệu suất kém có thể được quy cho các lỗi thời gian thực

Một loại thất bại khác được tạo ra khi hệ thống bị buộc phải chạy, hoặc gần, hoặc đầy đủ công suất trong thời gian dài. Do đó, bạn có thể không bao giờ thấy lỗi malloc () khi hệ thống đang chạy ở mức một nửa tải, nhưng khi nó chạy ở tải ba phần tư, malloc () có thể bị lỗi một lần mỗi ngày.

Nhiều RTOS sử dụng hàng đợi có kích thước cố định để theo dõi các nhiệm vụ đang chờ và bộ đệm I / O. Điều quan trọng là phải kiểm tra điều gì sẽ xảy ra nếu hệ thống nhận được số lượng sự kiện không đồng bộ cao bất thường trong khi nó được tải nhiều. Hàng đợi có lấp đầy không? Hệ thống có thể đáp ứng đúng thời hạn không?

Việc kiểm tra kỹ lưỡng hành vi thời gian thực thường yêu cầu hệ thống nhúng phải được gắn vào một môi trường mô phỏng / phần cứng tùy chỉnh. Môi trường mô phỏng trình bày một mô hình thực tế, nhưng ảo, mô hình phần cứng và thế giới thực.

Đôi khi, phần cứng giả lập có thể đơn giản như một giao diện I / O tương tự mô phỏng một công tắc nhấn của người dùng. Một số dự án có thể yêu cầu trình mô phỏng đầy đủ. Ở mức độ nào đó, việc kiểm tra hồi quy của hành vi thời gian thực sẽ không thể bỏ qua khi các sự kiện thời gian thực có thể được sao chép chính xác.

Tuy nhiên, giới hạn về ngân sách thường cấm xây dựng một mô phỏng. Đối với một số dự án, có thể mất nhiều thời gian để xây dựng một mô hình có ý nghĩa vì nó sẽ sửa tất cả các lỗi trong tất cả các sản phẩm được nhúng mà công ty bạn từng sản xuất.

Trình mô phỏng VHDL có thể được liên kết với trình điều khiển phần mềm thông qua một mô hình chức năng tuyến đường của bộ vi xử lý. Về mặt khái niệm, đây có thể là một môi trường thử nghiệm tốt nếu nhóm phần cứng của bạn đã sử dụng các công cụ thiết kế dựa trên VHDL hoặc Verilog để tạo ASIC tùy chỉnh cho sản phẩm của bạn.

Bởi vì một mô hình ảo của phần cứng đã tồn tại và một mô phỏng có sẵn để thực hiện mô hình này, tại sao không tận dụng lợi thế của nó để cung cấp một cơ sở thử nghiệm cho nhóm phần mềm?

### 3. Đo độ bao phủ
Ngay cả khi bạn sử dụng cả hai phương pháp hộp trắng và hộp đen để tạo các trường hợp thử nghiệm, có khả năng bản nháp đầu tiên của bộ thử nghiệm sẽ kiểm tra tất cả mã. Các tương tác giữa các thành phần của bất kỳ phần mềm nào cũng quá phức tạp để phân tích một cách đầy đủ.

Phần sau đây mô tả một số kỹ thuật để đo độ bao phủ thử nghiệm. Một số là dựa trên phần mềm, và một số khai thác giả lập và thiết bị điện tử tích hợp (IDE) thường có sẵn cho các kỹ sư hệ thống nhúng.

Bởi vì chúng ít liên quan đến phần cứng nhất, tôi sẽ bắt đầu với các phương pháp dựa trên phần mềm. Sau đó, tôi sẽ thảo luận về một số phương pháp dựa trên phần cứng ít xâm phạm, nhưng đôi khi ít đáng tin cậy hơn. Mặc dù thực tế rằng các phương pháp dựa trên phần cứng là hoàn toàn không xâm nhập, việc sử dụng chúng là thiểu số.

**1. Công cụ phần mềm**
Các phương pháp đo lường chỉ dành cho phần mềm đều dựa trên một số hình thức ghi nhật ký thực thi. Có thể xác định mức độ phù hợp của báo cáo bằng cách chèn các lệnh gọi theo dõi vào đầu mỗi "khối cơ bản" của các câu lệnh tuần tự.

Trong bối cảnh này, một khối cơ bản là một tập hợp các câu lệnh với một điểm vào duy nhất ở trên cùng và một hoặc nhiều lần thoát ở dưới cùng. Mỗi cấu trúc điều khiển, chẳng hạn như goto, return hoặc decision, đánh dấu sự kết thúc của một khối cơ bản. Hàm ý là sau khi khối được nhập vào, mỗi câu lệnh trong khối được thực hiện.

Nếu mã ứng dụng đang chạy theo RTOS, RTOS có thể cung cấp dịch vụ ghi nhật ký xâm nhập. Nếu vậy, mã theo dõi có thể gọi RTOS tại điểm đầu vào cho mỗi khối cơ bản. RTOS có thể ghi lại lần gọi trong bộ nhớ đệm tại  hệ thống đích hoặc báo cáo nó cho máy chủ.

Sau khi các bài kiểm tra hoàn tất, phần mềm bên ngoài sẽ tương quan với các dấu này cho các phần mã thích hợp. Ngoài ra, cùng một kiểu ghi nhật ký là có thể ghi vào một ô nhớ duy nhất, và một bộ phân tích logic (hoặc giao diện phần cứng khác) có thể thu thập dữ liệu.

Nếu, khi nhập vào khối cơ bản, nhật ký ghi giá trị hiện tại của bộ đếm chương trình vào vị trí cố định trong bộ nhớ, thì bộ phân tích logic được đặt  chỉ để kích hoạt việc ghi vào địa chỉ đó (có thể ghi lại địa chỉ của mọi lệnh gọi được thực hiện). Sau khi bộ kiểm tra hoàn thành, bộ đệm theo dõi phân tích logic có thể được tải lên máy chủ để phân tích.

Mặc dù đơn giản về mặt khái niệm để thực hiện, việc ghi nhật ký phần mềm có những bất lợi khi bị xâm nhập cao. Việc ghi nhật ký không chỉ làm chậm hệ thống, các lệnh gọi bổ sung thay đổi đáng kể kích thước và bố cục của mã lệnh.

Trong một số trường hợp, sự xâm nhập thiết bị có thể gây ra một sự thất bại trong việc kiểm tra chức năng - hoặc tệ hơn, che giấu một lỗi thực sự mà nếu không sẽ được phát hiện. Việc xâm nhập thiết bị không phải là nhược điểm duy nhất đối với các phép đo phạm vi dựa trên phần mềm.

Nếu hệ thống đang được thử nghiệm là dựa trên ROM và dung lượng ROM gần với giới hạn, hình ảnh mã có thể không phù hợp với ROM hiện có. Bạn cũng phải đối mặt với các công việc bổ sung của việc đặt thiết bị này trong mã lệnh, hoặc với một trình phân tích cú pháp đặc biệt hoặc thông qua trình biên dịch có điều kiện.

Các công cụ bao phủ dựa trên các phương pháp đo mã hóa gây ra một số mức độ xâm nhập mã, nhưng chúng có lợi thế là độc lập với các bộ đệm trên chip. Các thẻ hoặc điểm đánh dấu được phát ra bởi thiết bị đo đạc có thể được mã hóa dưới dạng không thể ghi được để chúng luôn được ghi vào bộ nhớ khi chúng xuất hiện trong luồng mã.

Tuy nhiên, điều quan trọng là phải xem xét tác động của các điểm đánh dấu mã này lên hành vi của hệ thống. Tất cả các phương pháp đo độ bao phủ thử nghiệm này đơn giản bằng cách giả định rằng tất cả các câu lệnh trong khối cơ bản sẽ được bao hàm. Ví dụ, một lệnh gọi chức năng có thể không được coi là một lối ra từ một khối cơ bản.

Nếu một lệnh gọi hàm trong một khối cơ bản không trả về hàm gọi, tất cả các câu lệnh còn lại trong khối cơ bản sẽ được đánh dấu sai khi đã được thực thi.

**2. Thiết bị phần cứng**
Bộ nhớ mô phỏng, phân tích logic và IDE có khả năng hữu ích cho các phép đo kiểm thử. Thông thường, các chức năng phần cứng là một giao diện theo dõi / chụp và dữ liệu được thu thập được phân tích ngoại tuyến trên một máy tính riêng biệt. Ngoài ba công cụ có mục đích chung này, các công cụ có mục đích đặc biệt chỉ được sử dụng cho các phép đo hiệu năng và kiểm tra.

***a. Bộ nhớ mô phỏng.***
Một số nhà cung cấp bao gồm một bit bảo đảm trong số các bit thuộc tính trong bộ nhớ mô phỏng của chúng. Khi một vị trí bộ nhớ được truy cập, bit bảo đảm của nó được thiết lập. Sau đó, bạn có thể xem xét phần nhỏ của “số lần truy cập” và nhận được một phần trăm mức độ phù hợp cho thử nghiệm cụ thể. Bằng cách liên tục "lập biểu đồ" bộ nhớ mô phỏng trên bộ nhớ hệ thống, bạn có thể thu thập số liệu thống kê kiểm thử.

Một vấn đề với kỹ thuật này là nó có thể bị lừa bởi các bộ vi xử lý với hướng dẫn trên chip hoặc bộ đệm dữ liệu. Nếu một phần bộ nhớ, được gọi là một dòng làm đầy, nó được đọc vào bộ nhớ cache nhưng chỉ một phần nhỏ của nó thực sự được truy cập bởi chương trình. Đây là một thử nghiệm giới hạn trên tốt và tương đối dễ thực hiện

***b. Phân tích logic***
Bởi vì một máy phân tích logic cũng có thể ghi lại hoạt động truy cập bộ nhớ trong thời gian thực, đó là một công cụ tiềm năng để đo lường phạm vi kiểm tra. Tuy nhiên, do một bộ phân tích logic được thiết kế để sử dụng trong chế độ "kích hoạt và chụp", rất khó để chuyển đổi dữ liệu theo dõi của nó thành dữ liệu bảo đảm. Thông thường, để sử dụng một máy phân tích logic cho các phép đo bảo hiểm, bạn phải sử dụng để lấy mẫu thống kê.

Đối với loại đo lường này, máy phân tích logic được đưa vào máy chủ. Máy chủ sẽ gửi các lệnh kích hoạt tới bộ phân tích logic tại các khoảng ngẫu nhiên. Trình phân tích logic sau đó điền vào bộ đệm theo dõi của nó mà không cần chờ đợi bất kỳ điều kiện kích hoạt nào khác.

***c. Phân tích hiệu suất phần mềm.***
  Cuối cùng, một công cụ thu thập phần cứng có sẵn trên thị trường, tạo điều kiện cho phương pháp thu thập phần mềm ít xâm nhập hỗ trợ mà không có bất lợi về việc thu thập liên tục một bộ phân tích logic. Nhiều nhà cung cấp ICE sản xuất các công cụ dựa trên phần cứng được thiết kế đặc biệt để phân tích phạm vi kiểm thử và hiệu suất phần mềm.

Đây là những công cụ “Cadillac” vì chúng được thiết kế đặc biệt để thu thập dữ liệu kiểm tra vùng bao phủ và sau đó hiển thị nó theo cách có ý nghĩa. Bằng cách sử dụng thông tin từ bản đồ tải của trình liên kết, các công cụ này có thể hiển thị thông tin trên cơ sở chức năng hoặc mô-đun, thay vì địa chỉ bộ nhớ thô.

Ngoài ra, chúng được thiết kế để thu thập dữ liệu liên tục, do đó không có khoảng trống xuất hiện trong việc thu thập dữ liệu, như với một bộ phân tích logic. Đôi khi những công cụ này đã được đưa vào một ICE, những công cụ khác có thể được mua dưới dạng phần cứng hoặc phần mềm bổ sung cho ICE cơ bản. 

### 4. Kiểm tra năng suất
Loại thử nghiệm cuối cùng để thảo luận trong loạt bài này là kiểm tra hiệu suất. Kiểm tra hiệu suất không chỉ quan trọng như là một phần của thử nghiệm chức năng mà còn là công cụ quan trọng cho giai đoạn bảo trì và nâng cấp của vòng đời hệ thống nhúng.

Thử nghiệm hiệu suất là rất quan trọng đối với thiết kế hệ thống nhúng và, thật không may, nó thường là một loại kiểm tra đặc tính phần mềm thường bị bỏ qua nhất. 

Đo lường hiệu suất được thực hiện với các công cụ thực sự và với đủ nguồn lực có thể có lợi nhuận rất lớn và ngăn chặn các R & D lớn cho các thiết kế lại không cần thiết.

**Cách kiểm tra hiệu suất**
Trong thử nghiệm hiệu suất, bạn quan tâm đến lượng thời gian mà một hàm cần thực hiện. Nói chung, đó là một quá trình không xác định, vì vậy bạn phải đo lường nó từ một quan điểm thống kê. Một số yếu tố có thể thay đổi thời gian thực hiện mỗi khi hàm được thực hiện đó là:
- Nội dung của lệnh và dữ liệu lưu trữ tại thời điểm hàm được nhập
- Việc tải tác vụ RTOS
- Ngắt và các ngoại lệ khác
- Các yêu cầu xử lý dữ liệu trong hàm
Vì vậy, tốt nhất bạn có thể hy vọng là một số biện pháp thống kê về thời gian thực hiện tối thiểu, tối đa, trung bình và tích lũy cho từng chức năng mà bạn quan tâm. 

**Sử dụng bộ nhớ động**
Sử dụng bộ nhớ động là một thử nghiệm có giá trị khác được cung cấp bởi nhiều công cụ thương mại. Như với phạm vi bao phủ, có thể sử dụng toán tử phân bổ bộ nhớ động malloc() và free() trong C và new(), delete() xóa trong C ++ sao cho thẻ thiết bị sẽ giúp phát hiện rò rỉ bộ nhớ và các vấn đề phân mảnh trong khi chúng đang xảy ra. 

Về mặt khái niệm, thử nghiệm hiệu suất rất đơn giản. Bạn sử dụng tệp ánh xạ liên kết để xác định địa chỉ bộ nhớ của các điểm vào và các điểm thoát của các hàm. Sau đó bạn xem bảng danh sách địa chỉ và ghi lại thời gian bất cứ khi nào bạn có địa chỉ phù hợp tại các điểm này.

Cuối cùng, bạn khớp các điểm nhập với các điểm thoát, tính thời gian chênh lệch giữa chúng và đó là thời gian đã trôi qua của trong hàm. Tuy nhiên, giả sử hàm của bạn gọi các hàm khác, hàm này gọi nhiều hàm hơn. Thời gian trôi qua cho hàm bạn đang cố đo là bao nhiêu? Ngoài ra, nếu ngắt đến khi bạn đang ở trong một chức năng, làm thế nào để bạn quản lý thông tin trong phương trình của bạn?

May mắn thay, các nhà phát triển công cụ thương mại đã xây dựng được hàm để làm sáng tỏ ngay cả những phần dôi ra của các hàm đệ quy. Các công cụ dựa trên phần cứng cung cấp một cách để đo lường hiệu suất phần mềm.
Cũng như các phép đo phạm vi, trình phân tích logic có thể được lập trình để ghi lại dấu vết trong khoảng thời gian ngẫu nhiên và dữ liệu theo dõi — bao gồm dấu thời gian — có thể được xử lý sau để thu được thời gian trôi qua giữa các điểm vào và thoát của hàm.

### 5. Bảo trì và thử nghiệm
Một số người thử nghiệm phần mềm nhúng cẩn thận không phải là nhà thiết kế ban đầu, bộ phận Đảm bảo chất lượng phần mềm (SWQA) hay người dùng cuối. Những người thử nghiệm chủ chốt là những kỹ sư được giao nhiệm vụ với các giai đoạn cuối của vòng đời phần mềm nhúng, đó là: bảo trì và nâng cấp.

Nhiều nghiên cứu cho thấy hơn một nửa số kỹ sư tự nhận mình là phần mềm nhúng và kỹ sư phần mềm dành phần lớn thời gian của họ làm việc trên các hệ thống nhúng đã được triển khai cho khách hàng.

Những kỹ sư này không phải là những nhà thiết kế ban đầu, những người đã làm một công việc tồi tệ lần đầu tiên và bận rộn sửa chữa các lỗi còn sót lại; thay vào đó, các kỹ sư này lấy sản phẩm hiện có, tinh chỉnh chúng và duy trì chúng cho đến khi nó không còn lỗi nữa

Một trong những nhiệm vụ quan trọng nhất mà các kỹ sư này phải làm là hiểu được hệ thống mà họ đang làm việc. Trong thực tế, họ thường phải hiểu nó sâu sắc hơn nhiều so với các nhà thiết kế ban đầu đã làm bởi vì họ phải tiếp tục cải thiện

***Tóm lược***

Sự kết thúc của chu kỳ phát triển sản phẩm là nơi thử nghiệm thường xảy ra. Nó sẽ tốt hơn nếu kiểm tra tron quá trình phát triển, thay vì chờ đợi cho đến khi kết thúc, nhưng, vì lý do thực tế, một số thử nghiệm phải chờ đợi.

Lý do chính là bạn phải mang phần cứng và phần mềm lại với nhau trước khi bạn có thể thực hiện bất kỳ thử nghiệm có ý nghĩa nào, và sau đó bạn vẫn cần phải có các sự kiện trong thế giới thực khiến hệ thống kiểm tra nó hoạt động đúng cách. Mặc dù một số phần của thử nghiệm nhất thiết phải bị trì hoãn cho đến khi kết thúc chu kỳ phát triển, nhưng các quyết định quan trọng về những gì cần kiểm tra và cách kiểm tra không được trì hoãn.

Tài liệu tham khảo:
https://www.embedded.com/design/other/4212937/7/The-basics-of-embedded-software-testing