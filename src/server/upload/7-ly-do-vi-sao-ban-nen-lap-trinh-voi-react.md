React là một thư viện UI phát triển tại Facebook để hỗ trợ việc xây dựng những thành phần (components) UI có tính tương tác cao, có trạng thái và có thể sử dụng lại được. React được sử dụng tại Facebook trong production, và www.instagram.com được viết hoàn toàn trên React. Sau đây sẽ là những lý do vì sao mà bạn nên bắt đầu làm quen với React:

# 1. Học nhanh.
React là một thư viện rất đơn giản và nhẹ, chỉ thao tác với lớp view. Nó không dữ dằn, phức tạp như các khuôn khổ MV * khác như Angular hay Ember. Bất kỳ lập trình viên Javascript nào cũng có thể hiểu những điều cơ bản và bắt đầu phát triển một ứng dụng web tuyệt vời chỉ sau vài ngày đọc hướng dẫn React.

Như trong hướng dẫn React có nói ‘Suy nghĩ trong React, có thể hơi khác so với trước đây vì nó mang đến một cách tiếp cận mới, nhưng nó sẽ trở nên dễ dàng và tự nhiên hơn khi bạn thực sự có được trải nghiệm với nó.

# 2. Có thể tái sử dụng Components.
React cung cấp một cấu trúc dựa trên component . Các component  là những mảnh lego của bạn. Bạn bắt đầu với các component  nhỏ như nút,checkbox, dropdown, v.v. và bạn tạo các component lớn hơn bao gồm các component  nhỏ hơn đó. Và sau đó bạn viết cáccomponent  bao bọc cấp cao hơn. Và, nó cứ tiếp tục như vậy cho đến khi bạn có một component gốc này và component  đó là ứng dụng của bạn.

Mỗi component sẽ tự quyết định làm thế nào mà nó sẽ được render ra. Mỗi component có logic riêng bên trong nó. Bạn có thể sử dụng lại cáccomponent này tại bất cứ nơi nào bạn cần. Do đó, ứng dụng của bạn sẽ có giao diện nhất quán, sử dụng lại code giúp cho việc duy trì và phát triển base-code của bạn dễ dàng hơn và việc phát triển ứng dụng của bạn cũng đơn giản hơn.

# 3. Render nhanh với Virtual DOM
Khi bạn sắp phát triển một ứng dụng web có sự tương tác của người dùng và xem các bản cập nhật cao, như trình tạo form mới trên[ JotForm 4.0](https://www.jotform.com/), bạn phải xem xét các vấn đề về hiệu suất có thể xảy ra. Mặc dù ngày nay các công cụ javascript cũng đủ nhanh để xử lý các ứng dụng phức tạp, nhưng các thao tác DOM vẫn không nhanh như vậy. Cập nhật DOM thường gây ra nút cổ chai khi nói đến hiệu suất web. React đang cố gắng giải quyết vấn đề này bằng cách sử dụng một thứ gọi là DOM ảo; một DOM được giữ trong bộ nhớ. Bất kỳ thay đổi chế độ xem nào trước tiên được phản ánh tới DOM ảo, sau đó thuật toán tìm hiệu quả so sánh trạng thái trước và hiện tại của DOM ảo và tính toán cách tốt nhất (số lượng cập nhật tối thiểu cần thiết) để áp dụng các thay đổi này. Cuối cùng, các cập nhật đó được áp dụng cho DOM để đảm bảo thời gian đọc / ghi tối thiểu. Đây là lý do chính đằng sau hiệu suất cao React.

# 4. Clean Abstraction*
Một trong những khía cạnh mạnh mẽ của React là nó cung cấp một sự trừu tượng hóa tốt, điều đó có nghĩa là nó không gây ra bất kỳ sự khó hiểu nào cho người dùng.

So sánh điều này với Angular: Tại sao trên trái đất bạn phải học một quy trình  như **digest cycles**? Những loại chi tiết như thế tốt hơn nên được giữ kín bên trong để cung cấp cho người dùng một khái niệm hoàn toàn sạch sẽ, dễ hiểu. Bạn chỉ cần hiểu một chu kỳ hoạt động, state và props  của component để thành thạo React trong khi hoàn thiện mọi thứ bạn cần. React không ra lệnh cho mô hình hay kiến trúc nào như MVC / MVVM, sau tất cả chỉ là thao tác với view và bạn có thể tự do thiết kế kiến trúc ứng dụng của bạn theo bất kỳ cách nào bạn thấy phù hợp.

Tuy nhiên, có một kiến trúc thực sự tốt và phù hợp với React là Flux.

(*)  abstraction giúp developer giấu đi cách cài đặt phức tạp ở các tầng thấp hơn và cung cấp một interface (giao diện) đơn giản hơn cho người dùng ở tầng hiện tại.

# 5. Flux và Redux.
Flux được Facebook giới thiệu, duy trì và sử dụng cho các ứng dụng web của họ. Nó bổ sung cho các component của React bằng luồng dữ liệu đơn hướng. Cấu trúc tổng thể như sau.

![](https://images.viblo.asia/ecd5cab3-1844-4c14-88ab-ac9970976cca.png)

Ý tưởng chính là tạo ra các hành động được điều phối bởi một trung tâm để cập nhật các stores. Sau đó, views được cập nhật liên quan đến những thay đổi trong stores đó. Tất cả dữ liệu được hiển thị bởi các thành phần được lưu giữ trong các stores và không bị trùng lặp dưới dạng mô hình trong cấu trúc MVC giúp bạn không phải cố gắng giữ dữ liệu mô hình của mình đồng bộ trong suốt ứng dụng.

Thật không may, Flux không phải là một thư viện sẵn sàng để sử dụng như vậy. Một trong những thư viện phổ biến nhất là Redux - một thư viẹn hỗ trợ diễn giải lại Flux. Nó cung cấp một stores, thứ mà không được yêu cầu trong Flux. Theo mình, đây là một quyết định tuyệt vời, vì lợi ích của việc có một nguồn duy nhất. Chỉ có một đối tượng duy nhất mà bạn giữ tất cả dữ liệu ứng dụng. Điều này làm cho nó dễ dàng hơn để quan sát và thao tác. Mọi thay đổi trên stores (dữ liệu) sẽ kích hoạt render cho các component liên quan và view luôn được giữ đồng bộ với dữ liệu.

Một tính năng tuyệt vời khác của Redux là bạn có thể xác định một phần mềm trung gian để chặn các hành động được gửi đi. Nói chung, nó được sử dụng để ghi nhật ký, xử lý ngoại lệ và các cuộc gọi API không đồng bộ nhưng bạn cũng có thể dễ dàng viết một phần mềm trung gian để giải quyết tất cả các loại vấn đề khác.

Nếu bạn chọn sử dụng redux, nó đi kèm với một công cụ dev tuyệt vời. Điều đó sẽ làm cho mọi thứ dễ dàng hơn nhiều cho bạn.

# 6. Công cụ phát triển tuyệt vời.
Bộ công cụ dành cho dev là một yếu tố quan trọng khác khi bạn chọn nền tảng phát triển. Có hai công cụ tuyệt vời mà bạn nên biết: React Developer Tools và Redux Developer Tools. Cả hai có thể được cài đặt dưới dạng tiện ích mở rộng của Chrome.

React Developer Tools rất tốt cho việc kiểm tra các thành phần phản ứng trong hệ thống phân cấp của chúng và cũng tuyệt vời để quan sát các state và props. Bạn có thể thấy một ảnh chụp nhanh bên dưới. Ở đây chúng ta đang kiểm tra các thành phần của JotForm 4.0. Thành phần được chọn được tô sáng ở phía bên trái, vị trí của nó trong hệ thống phân cấp và props của nó được hiển thị trong khung ngoài cùng bên phải.

![](https://images.viblo.asia/28e2466d-ad60-41da-aee8-af67f962739b.png)

Nếu bạn đang sử dụng thư viện Redux, bạn chắc chắn nên xem qua Redux Developer Tools cho Chrome. Bạn có thể quan sát các hành động được gửi đi, stores state hiện tại và theo dõi các thay đổi trên các stores. Bạn cũng có thể gửi hành động hoặc sửa đổi các stores và xem các thay đổi được phản ánh trên views của bạn ngay lập tức. Vì tất cả các bản cập nhật được giữ trong phần mở rộng, việc quay ngược lại trạng thái trong quá khứ là hoàn toàn khả thi. Bạn có thể ghi lại và quay lại bất kỳ state nào của ứng dụng của mình cho mục đích fix bugs.

![](https://images.viblo.asia/382306d4-7787-4684-8969-fdb535a15ce9.png)

# 7. React Native
Học React đi kèm với một phần thưởng: React Native. React không phải là loại thư viện 'Viết một lần và chạy ở bất cứ đâu", mà như những người sáng tạo ra nó nói, đó là **"Học một lần và viết ở bất kỳ đâu"**. Điều đó hoàn toàn chính xác, bạn có thể viết ứng dụng gốc cho Android và iOS bằng React Native. Mặc dù bạn sẽ không thể sử dụng chính xác code bạn đã viết cho web, nhưng bạn sẽ có thể sử dụng cùng một phương pháp và cùng một kiến trúc.

Trên đây là những lý do mà chủ quan của mình cho việc vì sao bạn nên sử dụng React. Hay để lại nhận xét, góp ý bên dưới cho mình nhé, cảm ơn các bạn đã ghé qua!!