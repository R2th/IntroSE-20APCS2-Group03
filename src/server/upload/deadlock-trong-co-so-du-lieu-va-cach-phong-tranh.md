Các hệ quản trị cơ sở dữ liệu đảm bảo tài nguyên trong database có tính nhất quán (consistency), có nghĩa là cùng một dữ liệu sẽ không thể đọc ghi tại cùng 1 thời điểm. Điều này sẽ dẫn tới hiện tượng các câu lệnh sẽ lock lẫn nhau. Ví dụ như:
- Lệnh Select sẽ xung đột với các lệnh Update, Insert, Delete. Vì các lệnh Update, Insert, Delete làm thay đổi dữ liệu của một table điều này dẫn đến việc câu lệnh Select sẽ không còn chính xác nữa trong trường hợp đang Select thì cơ sở dữ liệu lại bị thay đổi mất.
- Các câu lệnh Select sẽ không lock nhau
- Các câu lệnh Update, Insert, Delete sẽ chỉ lock trên cùng 1 row dữ liệu chứ không trên cùng 1 bảng. Tức là dù các câu lệnh cùng xảy ra trên 1 bảng nhưng nếu ko tranh chấp 1 row thì sẽ không lock lẫn nhau => vẫn thực hiện bình thường.

### Deadlock

Những sai lệch khi thao tác với database thường để lại những hậu quả rất nghiêm trọng, nên lock là 1 chiến lược rất tốt để giảm ngừa hiện tượng này (dù có ảnh hưởng đôi chút đến performance do các lệnh sẽ chờ nhau để thực hiện tuần tự).
Nhưng Deadlock lại khác, nó dẫn đến không 1 câu lệnh nào được thực hiện.

Dưới chế độ điều hành thông thường, một quá trình có thể sử dụng một tài nguyên chỉ trong thứ tự sau:
- Yêu cầu: nếu yêu cầu không thể được gán tức thì (thí dụ, tài nguyên đang được dùng bởi quá trình khác) thì quá trình đang yêu cầu phải chờ cho tới khi nó có thể nhận được tài nguyên.
- Sử dụng: quá trình có thể điều hành tài nguyên
- Giải phóng: quá trình giải phóng tài nguyên.

Deadlock là hiện tượng tranh chấp tài nguyên giữa hai hay nhiều lệnh trong đó lệnh này giữ tài nguyên mà lệnh kia cần dẫn tới việc không lệnh nào có thể kết thúc để giải phóng tài nguyên. Nếu không được xử lý sẽ dẫn đến hiện tượng các câu lệnh sẽ chờ nhau và không 1 tiến trình nào sẽ được thực hiện tiếp.

Giả sử, Transaction T1 lock một số hàng trong bảng **students** và cần cập nhật một số hàng trong bảng **grades**. Đồng thời, Transaction T2 lock trên chính các bản ghi đó (Mà T1 cần cập nhật) trong bảng **grades** nhưng cần cập nhật các bản ghi trong bảng **students** do Transaction T1 giữ. 
Bây giờ, vấn đề chính phát sinh. Transaction T1 sẽ chờ Transaction T2 giải phóng tài nguyên và tương tự Transaction T2 sẽ chờ Transaction T1 giải phóng. Kết quả là, mọi hoạt động đều dừng lại và tồn tại mãi mãi trừ khi hệ quản trị cơ sở dữ liệu phát hiện ra deadlock và hủy bỏ một trong các Transaction.

![](https://images.viblo.asia/cfad4c40-5d5e-4979-9c94-a1eb7d850568.png)

### Cách giảm thiểu khả năng xảy ra deadlock
Một phương pháp để tránh deadlock là sử dụng logic nhất quán trong cả ứng dụng. Trong ví dụ đã cho ở trên, Transaction truy cập **students**  và **grades** phải luôn truy cập vào các bảng theo cùng một thứ tự.
Theo cách này, trong kịch bản được mô tả ở trên, giả sử như thứ tự truy cập cố định của 2 bảng là **students**  -> **grades**. Trong trường hợp này thì T2 sẽ phải chờ T1 giải phóng tài nguyên tại bảng **students** thì mới bắt đầu (tức là T2 sẽ chưa lock tài nguyên của bảng **grades**) do đó T1 sẽ thực hiện 1 cách bình thường rồi T2 mới thực hiện và deadlock sẽ không xảy ra.


### Cách phát hiện Deadlock
Các hệ cơ sở dữ liệu cần có phương pháp để có thể phát hiện ra khi nào deadlock xảy ra, tránh dẫn đến việc hệ thống bị đình trệ quá lâu. Thậm chí hệ cơ sở dữ liệu cần phải theo dõi tiến trình lock dữ liệu dù nó có dẫn đến deadlock hay không

Wait-for graph là một trong những phương pháp để phát hiện deadlock. Phương pháp này phù hợp với cơ sở dữ liệu nhỏ hơn. Trong phương pháp này, một biểu đồ được vẽ dựa trên Transaction và lock chúng trên tài nguyên. Nếu đồ thị được tạo có một vòng khép kín hoặc một chu kỳ, thì có một deadlock.

Ví dụ về 1 biểu đồ khi xảy ra deadlock dựa trên phương pháp Wait-for graph
![](https://images.viblo.asia/912713fc-d8fd-4394-a6e4-180cddd8a6ba.png)

Nếu là cơ sở dữ liệu lớn thì có 2 phương pháp thường được sử dụng là: Wait-Die Scheme và Wound Wait Scheme.

### Một số lưu ý về sử dụng Transaction
Việc sử dụng transaction cần phải hiểu ý nghĩa và không nên lạm dụng. Yếu tố quan trọng của transaction là để đảm bảo chuỗi câu lệnh trong đó nếu có một câu lệnh không hoàn thình thì toàn bộ transaction sẽ không được hoàn thành. 
Nhưng nếu có một nghiệp vụ cập nhật thông tin hồ sơ cho học sinh khác như sau:

Lệnh 1: cập nhật tuổi bảng **profile**

Lệnh 2: cập nhật điểm bảng **grades**

Rõ ràng để thực hiện nghiệp vụ trên cần phải thực hiện cả hai hành động trên, nhưng không có nghĩa là nếu lệnh 2 không thành công thì lệnh 1 không được thực hiện, vì sau đó ta hoàn toàn có thể kiểm tra là lệnh 1 mà thực thi rồi thì chỉ thực thi lệnh 2, việc không thực thi đồng thời hai lệnh trên không làm sai nghiệp vụ của hệ thống.

- Tránh sử dụng transaction tối đa có thể
- Transaction càng ngắn càng tốt

### Tham khảo:

https://www.geeksforgeeks.org/deadlock-in-dbms/

https://medium.com/@saurav200892/what-is-deadlock-and-how-to-avoid-it-ab5eff4feff1

https://techblog.vn/mot-so-phan-tich-ve-deadlock-trong-co-so-du-lieu

https://voer.edu.vn/m/deadlock/23e8c694