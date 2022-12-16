Đối với lập trình viên, việc đọc code (readable code là gì) là việc cực kỳ quan trọng. Chúng ta thường có rất nhiều quy tắc cũng như các luật lệ bất thành văn cho việc sử dụng tên variable có nghĩa. Khi một function trở nên lớn hơn thì chia nó thành các function nhỏ hơn. Sử dụng các design pattern tiêu chuẩn. Nhưng dù cho tất cả mọi thứ có tuân thủ đúng theo những quy tắc trên thì chúng vẫn là một mớ hỗn độn.

Chúng ta có thể giải quyết vấn đề này bằng cách đặt thêm nhiều quy tắc hơn: Nếu tên variable quá dài thì hãy tái cấu trúc logic cơ bản lại. Khi một class tích lũy quá nhiều method hỗ trợ thì có lẽ nên cần hai class. Đừng sử dụng các design pattern trong những context không phù hợp.

Những hướng dẫn như vậy không có đúng hay sai và bạn phải tự đưa ra quyết định cái nào là tốt nhất, vì vậy chúng đòi hỏi các developer phải viết cách chọn lọc. Hay nói một cách khác, các developer phải biết viết code dễ đọc.

Đây là một bài toán khó. Và để giải quyết bài toán này chúng ta cần xây dựng một bức tranh rộng hơn về khả năng đọc.

## Vậy “dễ đọc” để làm gì?

Trong thực tế, việc code có dễ đọc hay không thường tương tự như “Tôi thích đọc nó”. Đây không phải là một điều tự nhận ra được. Bên cạnh tính chủ quan thì tính dễ đọc còn bị ảnh hưởng bởi kinh nghiệm trước đây của chúng ta về việc đọc.

Code khó đọc giống như một cuốn tiểu thuyết khó hiểu vậy: Đầy những comment tường thuật dài; các file thì đầy chữ và phải đọc theo thứ tự tuần tự; thiếu sử dụng lại từ. Chúng ta cố gắng khiến code dễ đọc, nhưng thường nhắm sai độc giả mục tiêu.

Có một sự khác biệt giữa tính dễ đọc và code dễ đọc. Trước khi xem cái đó, bạn có thể xem thêm cách [viết code thông minh tại đây](https://topdev.vn/blog/cach-hoc-code-thong-minh-nhat-2/)

“Code tạo ra giao diện. Nhưng chính nó cũng là một giao diện.”

Có phải code đẹp thì dễ đọc hơn không? Đẹp là một phần phụ của việc dễ đọc, nhưng nó không khiến code dễ đọc. Bên cạnh đó, mỗi người đều có quan niệm riêng về “cái đẹp”. Thế nên sớm muộn gì định nghĩa của việc dễ đọc cũng sẽ tăng dần lên thành một đống tab, space, dấu ngoặc nhọn, camelCase và nhiều format khác.

Có phải code dễ đọc khi nó có ít bug hơn không? Có “ít bug hơn” đương nhiên tốt nhưng cơ cấu ở đây là gì? Cảm giác tuyệt vời mà ai đó có được khi họ nhìn thấy code dễ đọc? Đọc code không thể triệu tập bug bất kể học có đọc đi đọc lại bao nhiều lần đi chăng nữa.

Có phải code dễ đọc khi nó dễ chỉnh sửa hơn không? Đây có vẻ như là lý do tốt nhất trong tất cả những lý do trên. Khi các requirement thay đổi, các tính năng được thêm vào, bug xuất hiện thì cuối cùng cũng sẽ cần một người để sửa code đó. Để chỉnh sửa mà không gây ra sự cố gì, họ cần phải hiểu họ đang chỉnh cái gì và cách chỉnh sửa của họ sẽ thay đổi hành vi như thế nào. Điều này khiến chúng ta nhận ra một điều mới: Code dễ đọc nên được chỉnh sửa một cách dễ dàng và an toàn.

## Điều gì làm cho code dễ sửa hơn?## 
Lúc này, chúng ta phải nhìn lại các quy tắc một lần nữa: “Code dễ chỉnh sửa hơn khi tên variable có ý nghĩa”. Nhưng chúng ta đã thay thế “dễ đọc” thành “dễ sửa”. Chúng ta đang tìm một insight mới chứ không phải một đống ghi nhớ theo quy tắc cũ.

Hãy bắt đầu bằng cách đặt thực tế là chúng ta đang nói về code sang một bên. Lập trình đã xuất hiện từ vài thập kỷ trước nhưng chỉ là dấu chấm nhỏ trong lịch sử loài người. Nếu chúng ta tự giới hạn bản thân trong dấu chấm đó, chúng ta sẽ giới hạn ý tưởng của mình.

Thay vào đó, hãy nhìn về khả năng dễ đọc thông qua lăng kính của thiết kế giao diện. Cuộc sống của chúng ta chứa đầy các giao diện, digital và nhiều thứ khác. Một món đồ chơi luôn có thêm tính năng cuộn lại hoặc kêu chút chít. Một cánh cửa luôn có giao diện để người dùng mở, đóng và khóa nó. Một cuốn sách sắp xếp dữ liệu theo các trang để dễ lật hơn thay vì cuộn lên xuống. Bạn có thể tìm hiểu thêm về những giao diện như vậy thông qua các khóa học design hoặc hỏi design team trong công ty. Chúng ta đều đang sử dụng những giao diện tốt ngay cả khi không biết điều gì làm cho chúng tốt như vậy.

Code tạo ra giao diện. Nhưng bản thân code, cùng với IDE của nó, cũng là một giao diện. Giao diện người dùng mà chúng ta đang tìm hiểu nhắm tới một nhóm đối tượng rất nhỏ: teammate của chúng ta. Từ phần này trở đi, chúng ta sẽ thay thế “teammate” thành “user” và đề cập tới UI design.

Với thay đổi này, hãy xem xét một số user flow mẫu như sau:

User muốn thêm một tính năng mới. Để làm được điều này, họ phải tìm đúng vị trí và thêm tính năng mà không tạo ra thêm bug.
User muốn fix bug. Họ cần tìm thấy nguồn bug và sửa bug để nó dừng hoạt động mà không tạo ra những bug khác.
User muốn xác định một trường hợp cụ thể diễn ra theo cách nào. Họ muốn tìm code đúng rồi từ đó dò theo tính logic để mô phỏng những gì sẽ xảy ra.
Và còn nhiều flow khác nữa. Đa số các flow đều theo một mô hình tương tự nhau. Chúng ta sẽ xem qua các ví dụ cụ thể, nhưng lưu ý rằng, hãy nhớ các quy tắc chung thay vì danh sách các quy tắc như cũ.

Ngoài ra viết code dễ đọc cũng có nhiều lợi ích lắm, như mình [có nói lần trước ở bài này](https://topdev.vn/blog/viet-code-sach-clean-code-duoc-gi/)

Chúng ta có thể giả định rằng user của chúng ta không thể đi thẳng tới dòng code đúng. Điều này đúng cho cả những hobby project; chúng ta rất dễ quên vị trí của feature dù cho chính chúng ta là người viết nó. Vì vậy, code nên dễ tìm kiếm.

Nếu chúng ta muốn nâng cao khả năng tìm kiếm thì chúng ta sẽ cần công cụ SEO. Và tên variable có nghĩa có tác dụng rất lớn ở đây. Nếu user không thể tìm thấy feature bằng cách chuyển lên callstack từ một điểm đã biết, họ có thể bắt đầu gõ keyword vào khung tìm kiếm. Khi user của chúng ta tìm code, họ chỉ cần một điểm nhập duy nhất và làm việc từ đó. Chúng ta cần đáp ứng nhu cầu của user tốt nhất có thể. Nếu có quá nhiều keyword, họ sẽ cảm thấy không hài lòng.

“Nếu user thấy rằng “mức logic này chính xác” ngay lập tức thì họ có thể quên tất cả các lớp trừu tượng trước đó và cảm thấy thoải mái và sẵn sàng hơn để thực hiện các lớp tiếp theo.”

User cũng có thể tìm kiếm thông qua autocompletion. Họ biết họ cần call function nào hay muốn sử dụng enum case nào, vì vậy họ sẽ bắt đầu nhập và chọn autocomplete phù hợp. Nếu một function chỉ được sử dụng trong các trường hợp cụ thể hoặc xuất hiện cảnh báo yêu cầu đọc cẩn thận, chúng ta có thể cần một tên dài hơn. Khi user đọc danh sách autocomplete, họ có xu hướng tránh những tùy chọn trông có vẻ phức tạp trừ khi họ biết họ đang làm gì.

Tương tự, những tên ngắn và chung chung thường được xem là tùy chọn mặc định và phù hợp với user bình thường. Hãy chắc rằng họ không làm bất cứ điều gì kì lạ. Chúng ta không nên đặt các setter vào những getter-trông-đơn-giản, cũng giống như một UI cho khách hàng không nên hiển thị nút “View” mà làm thay đổi data của họ.

Và user muốn tìm thông tin một cách nhanh chóng. Trong hầu hết các trường hợp, compile tốn khá nhiều thời gian và run có thể yêu cầu visit rất nhiều các trường hợp khác nhau một cách thủ công. Nếu có thể, user sẽ thích đọc hành vi code hơn là ném vào các breakpoint và chạy code.

Để bỏ qua việc chạy code, họ cần thỏa mãn hai điều kiện sau:

Họ hiểu code đang làm gì.
Họ biết chắc code đang làm những gì được đưa ra.
Sự trừu tượng giúp thỏa mãn điều kiện đầu tiên. User nên lột lớp trừu tượng cho đến khi đạt được mức độ chi tiết mong muốn. Hãy suy nghĩ theo các dòng của UI phân cấp. Chúng ta cho phép người dùng thực hiện các điều hướng rộng trước, sau đó là điều hướng chính xác hơn khi họ muốn đọc logic chi tiết hơn.

Đọc một file hoặc method tuần tự mất linear time. Ngay khi user click lên xuống thông qua các callstack, họ sẽ chuyển sang thực hiện tree search. Đưa ra một hệ thống phân cấp cân bằng chỉ làm mất logarithmic time. Trong UI luôn có một danh sách nhưng hãy xem xét một cách cẩn thận liệu một context đơn có cần chứa nhiều hơn một vài method call không.

Đối với điều kiện thứ hai, user khác nhau sẽ có chiến lược khác nhau. Trong các tình huống rủi ro thấp, chúng ta có thể chỉ cần các comment hoặc tên method. Đối với các tình huống rủi ro và phức tạp hơn, hoặc khi user thấy khó chịu bởi các comment cũ, họ có thể bỏ qua chúng luôn. Đôi khi, ngay cả tên method và variable cũng tạo ra sự khó hiểu. Khi điều này xảy ra, user phải đọc code nhiều hơn và xây dựng một mô hình logic lớn hơn. Để giải quyết điều này thì ta cần những context nhỏ và dễ hiểu. Nếu user thấy rằng “mức logic này chính xác” ngay lập tức thì họ có thể quên tất cả các lớp trừu tượng trước đó và cảm thấy thoải mái và sẵn sàng hơn để thực hiện các lớp tiếp theo.

Khi user ở mode này, các token riêng lẻ bắt đầu trở nên quan trọng hơn. Một bool flag element.visible = true / false rất dễ phân tích trong sự cô lập, nhưng nó đòi hỏi phải kết hợp

hai token khác nhau. Nếu thay vào đó, flag là element.visibility = .visible / .hidden, các context liên quan đến flag có thể được lướt qua, mà không cần phải đọc tên của variable để tìm hiểu về khả năng hiển thị. Chúng ta có thể thấy những sự cải tiến về design trong customer-facing UIs. Trong vài thập kỷ qua, các nút xác nhận đã phát triển từ OK / Cancel sang các option cụ thể hơn như Save / Discard hoặc Save / Keep editing. User có thể tìm xem những gì đang diễn ra bằng cách nhìn vào các option thay vì phải đọc toàn bộ context.

Các unit test cũng có thể giúp chúng ta vượt qua tình trạng proof-of-behavior. Chúng hành động như những comment đáng tin cậy hơn vì chúng ít bị tổn thương. Điều này vẫn liên quan đến việc build. Tuy nhiên, bất kỳ team nào có pipeline CI tốt cũng đã run test, vì vậy user có thể bỏ qua bước này cho code hiện có.

Về lý thuyết, sự an toàn đến từ sự hiểu biết. Khi user của chúng ta hiểu hành vi hiện tại của code, họ sẽ có thể chỉnh sửa nó một cách an toàn. Trong thực tế, các kỹ sư cũng là con người thôi. Bộ não của chúng ta cũng giống như bất kỳ ai khác. Chúng ta hiểu càng ít thì các hành động mà chúng ta thực hiện càng an toàn hơn.

Code dễ đọc sẽ giảm tải phần lớn việc kiểm tra lỗi cho máy. Các debug assert là một cách để làm điều này, mặc dù chúng đòi hỏi building và running. Tệ hơn là chúng có thể không bắt các trường hợp như user quên path đó. Các unit test có thể thực hiện các trường hợp lãng quên như vậy tốt hơn, nhưng một khi user đã thực hiện các thay đổi, họ cần có thời gian để run.

### “Tóm lại, code dễ đọc cũng phải dùng được. Và nếu được thì nó cũng nên đẹp đẹp chút”

Để có turnaround time nhanh nhất, chúng ta sử dụng các compiler error. Chúng hiếm khi yêu cầu full build và thậm chí có thể xuất hiện trong real time. Vậy chúng ta có thể tận dụng lợi thế của chúng như thế nào? Nhìn rộng ra là chúng ta muốn tìm kiếm các tình huống khi compiler trở nên nghiêm ngặt hơn. Ví dụ như đa số các compiler không quan tâm nếu câu lệnh “if” có đầy đủ không nhưng sẽ kiểm tra câu lệnh “switch” cho bất kỳ case thiếu sót nào một cách cẩn thận. Nếu user cố gắng thêm hoặc chỉnh sửa một case, thì tất cả các điều kiện trước đó nên là các exhaustive switch để an toàn hơn. Vào thời điểm họ thay đổi các case, compiler sẽ gắn cờ tất cả các điều kiện cần được kiểm tra lại.

Một vấn đề liên quan tới tính dễ đọc của code là dùng những hàm đơn giản trong các lệnh điều kiện. Đặc biệt là khi một ứng dụng được viết theo ngôn ngữ JSON, sẽ rất dễ mắc phải lỗi viết quá nhiều câu điều kiện if xung quanh với các tham chiếu là toán tử dạng chuỗi string hoặc dạng số nguyên. Điều này không chỉ làm cho việc gõ code dễ sai, mà còn làm cho user không biết được giá trị nào khả thi. Có một sự khác biệt rất lớn giữa việc phải kiểm tra tính khả thi của từng string với việc chỉ cần kiểm tra 2 phần 3 của chúng. Kể cả khi các hàm đơn giản được chuyển thành constant, user cũng là người sẽ tự gán các giá trị khác một cách tùy ý. Nếu chúng ta sử dụng custom objects hoặc enums, compiler sẽ chặn những giá trị không thỏa và đưa ra một danh sách những giá trị thỏa điều kiện khác.

Tương tự như vậy, chúng ta nên tập trung chỉ dùng một enum hơn là nhiều boolean flags nếu một vài kết hợp của flags không thỏa điều kiện. Ví dụ, tưởng tượng như một bài nhạc đang chờ tải về hoặc đang chơi. Nếu chúng ta đại diện 2 bool flags là (loaded, playing), compiler sẽ cho phép những giá trị không thỏa (loaded: false, playing: true). Tuy nhiên, nếu dùng enum, .buffering/.loaded/.playing, các trạng thái không thỏa sẽ không xảy ra. “Vô hiệu hóa các kết hợp không thỏa trong phần cài đặt” nên là một tính năng cơ bản trong việc thiết kế customer-facing UI. Nhưng khi chúng ta đã viết những dòng code bên trong một app, chúng ta thường quên mất đặt mình vào trường hợp này.

Sau khóa học về user flow này, chúng ta đã đạt được những nguyên tắc đã đề cập lúc ban đầu. Nhưng giờ thì ta sẽ có một quy trình cho việc tạo ra và tùy chỉnh chúng. Chúng ta cần tự hỏi rằng:
• Những dòng code này có thể dễ cho user tìm thấy không? Liệu nó có thể làm lộn xộn và hiện ra những kết quả tìm kiếm không liên quan?
• Một khi tìm thấy dòng code, user có thể xác định được behavior hiện tại của dòng code không?
• Liệu user có thể dựa vào xác minh máy tính để chỉnh sửa và sử dụng lại code này một cách an toàn?

Tóm lại, code dễ đọc cũng phải dùng được. Và nếu được thì nó cũng nên đẹp đẹp chút.