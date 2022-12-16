# **1. Định nghĩa**
Hệ phân tán bao gồm các máy tính độc lập không phụ thuộc lẫn nhau, có thể là các máy tính có kiến trúc khác nhau, (có thể là các máy tính có phần mềm hệ thống khác nhau) được kết nối với nhau bằng mạng máy tính. Các phần mềm trên các máy này có khả năng phối hợp với nhau, chia sẻ tài nguyên hoặc thực hiệ một nhiệm vụ chung. Hệ phân tán cung cấp dịch vụ một cách thông nhất, người sử dụng khôgn cần quan tâm tới chi tiết của hệ thống. 
Ví dụ hệ phân tán như hệ thống world wide web hay hệ thống email, mạng xã hội , v.v....
# **2. Đặc điểm của hệ phân tán**
4 đặc trưng của hệ phân tán bao gồm: 
* tính chia sẻ tài nguyên
* tính mở
* tính trong suốt
* tính co giãn
Ta sẽ tìm hiểu các tính chất này.
## **2.1. Tính chia sẻ tài nguyên**
Thuật ngữ tài nguyên được dùng để chỉ tất cả mọi thứ có thể được chia xẻ trong hệ phân tán, bao gồm từ các thiết bị phần cứng (Đĩa, máy in ...) tới các đối tượng (file, các cửa sổ, CSDL và các đối tượng dữ liệu khác).

Trong hệ phân tán, chia xẻ tài nguyên được hiểu là tài nguyên của hệ thống được các QT chia xẻ (sử dụng chung) mà không bị hạn chế bởi tình trạng phân tán tài nguyên theo vị trí địa lý.

Việc chia xẻ tài nguyên trên hệ phân tán - trong đó tài nguyên bị lệ thuộc về mặt vật lý với một máy tính nào đó - được thực hiện thông qua truyền thông. Để chia xẻ tài nguyên một cách hiệu quả thì mỗi tài nguyên cần phải được quản lý bởi một chương trình có giao diện truyền thông, các tài nguyên có thể truy nhập, cập nhật được một cách tin cậy và nhất quán. Quản lý tài nguyên ở đây bao gồm lập kế hoạch và dự phòng, đặt tên các lớp tài nguyên, cho phép tài nguyên được truy cập từ nơi khác, ánh xạ tên tài nguyên vào địa chỉ truyền thông ..

## **2.2. Tính mở**
Tính mở của một hệ thống máy tính là tính dễ dàng mở rộng phần cứng (thiết bị ngoại vi, bộ nhớ, các giao diện truyền thông ...) và phần mềm (các mô hình HĐH, các giao thức truyền thông, các dịch vụ chia xẻ tài nguyên ...) của nó. Nói một cách khác, tính mở của hệ thống phân tán mang ý nghĩa bao hàm tính dễ dàng cấu hình cả phần cứng lẫn phần mềm của nó.

Tính mở của hệ phân tán được thể hiện là hệ thống có thể được tạo nên từ nhiều loại phần cứng và phần mềm của nhiều nhà cung cấp khác nhau với điều kiện các thành phần này phải theo một tiêu chuẩn chung (liên quan đến HĐH là tính đa dạng tài nguyên; liên quan đến nhà cung cấp tài nguyên là tính chuẩn). Vai trò của ASP và SPI trong HĐH đã được trình bày trong chương 1.

Tính mở của Hệ phân tán được xem xét theo mức độ bổ sung thêm các dịch vụ chia xẻ tài nguyên mà không phá hỏng hay nhân đôi các dịch vụ đang tồn tại. Tính mở được hoàn thiện bằng cách xác định hay phân định rõ các giao diện chính của hệ phân tán và làm cho nó tương thích với các nhà phát triển phần mềm (tức là các giao diện chính của HĐH phân tán cần phổ dụng).

Tính mở của HĐH phân tán được thi hành dựa trên việc cung cấp cơ chế truyền thông giữa các QT và công khai các giao diện được dùng để truy cập tài nguyên chung.
## **2.3. Tính trong suốt**
Như đã được trình bày trong chương 1, tính trong suốt là tính chất căn bản của hệ phân tán. Tính trong suốt của hệ phân tán được hiểu như là sự che khuất đi các thành phần riêng biệt của hệ thống máy tính (phần cứng và phần mềm) đối với người sử dụng và những người lập trình ứng dụng. Người sử dụng có quyền truy cập đến dữ liệu đặt tại một điểm dữ liệu ở xa một cách tự động nhờ hệ thống mà không cần biết đến sự phân tán của tất cả dữ liệu trên mạng. Hệ thống tạo cho người dùng cảm giác là dữ liệu được coi như đặt tại máy tính cục bộ của mình.
Tính trong suốt thể hiện trong nhiều khía cạnh, dưới đây là một số khía cạnh điển hình nhất:
*  Trong suốt truy nhập: Truy nhập đối tượng địa phương/toàn cục theo cùng một cách thức. Sự tách rời vật lý của các đối tượng hệ thống được che khuất tới người dùng.
* Trong suốt định vị (còn được gọi là trong suốt tên): Người dùng không nhận biết được vị trí của đối tượng. Đối tượng được định vị và chỉ dẫn theo tên lôgic trong một hệ thống thống nhất.
* Trong suốt di trú (còn được gọi là độc lập định vị): là tính chất bổ sung vào trong suốt định vị theo nghĩa không những đối tượng được chỉ dẫn bằng tên lôgic mà đối tượng còn được di chuyển tới định vị vật lý khác mà không cần đổi tên.
* Trong suốt đồng thời: cho phép chia xẻ đối tượng dùng chung không gặp tranh chấp. Nó tương tự như khái niệm phân chia thời gian theo nghĩa khái quát.
* Trong suốt nhân bản: đưa ra tính nhất quán của đa thể hiện (hoặc vùng) của file và dữ liệu. Tính chất này quan hệ mật thiết với trong suốt đồng thời song được cụ thể hơn vì file và dữ liệu là loại đối tượng đặc biệt,
* Trong suốt song song: cho phép các hoạt động song song mà người dùng không cần biết hoạt động song song đó xẩy ra như thế nào, ở đâu và khi nào. Tính song song có thể không được người dùng đặc tả.
* Trong suốt lỗi: cung cấp khả năng thứ lỗi của hệ thống được hiểu là lỗi trong hệ thống có thể được biến đổi thành sự giảm hiệu năng hệ thống một cách mềm dẻo hơn chứ không phải chỉ là làm cực tiểu sự đổ vỡ và nguy hiểm đối với người dùng,
* Trong suốt hiệu năng: cố gắng giành được tính nhất quán và khẳng định (không cần thiết ngang bằng) mức độ hiệu năng thậm chí khi thay đổi cấu trúc hệ thống hoặc phân bố tải. Hơn nữa, người dùng không phải chịu sự chậm trễ hoặc thay đổi quá mức khi thao tác từ xa. Trong suốt hiệu năng còn được thể hiện là hiệu năng hệ thống không bị giảm theo thời gian.
* Trong suốt kích thước: liên quan đến tính mềm dẻo và tiềm tàng. Nó cho phép sự tăng trưởng của hệ thống được che khuất đối với người sử dụng. Kích thước hệ thống không tạo ra tác động đối với nhận thức của người dùng.
* Trong suốt duyệt lại chỉ dẫn rằng sự tăng trưởng hệ thống theo chiều dọc là tỷ lệ nghịch với sự tăng trưởng hệ thống theo chiều ngang. Sự duyệt lại phần mềm bị che khuất đối với người dùng. Trong suốt duyệt lại cũng được hiểu như trong suốt phân đoạn.
## **2.4. Tính co giãn**
Tính co giãn của hệ phán tán được thể hiện qua :
* Qui mô: Khi số lượng người dùng và tài nguyên thay đổi hệ phân tán phải thích nghi được.
* Không gian địa lý: Khi  vùng địa lý có tài nguyên và người sử dụng thay đổi.
* Tổ chức:  Khi tổ chức kết cấu của hệ thay đổi
# **3. Các thành phần hệ phân tán**
## **3.1. Phần cứng hệ phân tán**
Bao gồm máy chủ và các hệ thống máy con được đặt ở những vị trí khác nhau và kết nối với nhau qua mạng máy tính. 
Khái niệm cơ bản này đã nêu ở phần 1.
## **3.2. Phần mềm hệ phân tán**
Gồm 3 hệ thống sau:
* DOS hay Distributed Operating Systems - Hệ điều hành phân tán: Hệ điều hành gắn chặt với hệ thống phần cứng (máy đa vi xử lý hoặc máy tính đồng bộ), qu
* NOS hay Network Operating Systems - Hệ điều hành mạng: cài đặt trên máy tính cục bộ. Cung cấp dịch vụ cục bộ cho các máy tính khác.
* Middleware: Cài đặt các dịch vụ cơ bản để thực hiên, phát triển các ứng dụng. 

Bài viết còn sơ sài đúng không ạ. Các bạn theo dõi tiếp tục serie mình sẽ làm sáng tỏ ở các phần sau :D 
Tham khảo: 
1, Slide bài giảng Hệ phân tán - Đại học bách khoa Hà Nội.
2, http://voer.edu.vn/m/khai-niem-va-kien-truc-he-phan-tan/0dcdd6a3