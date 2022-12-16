## 1. Hiểu thế nào về Clean Code 

Clean code nếu dịch ra thì có nghĩa là “mã nguồn sạch”, nhưng hiểu một cách đơn giản thì clean code bao gồm: cách tổ chức mã nguồn, cách triển khai mã nguồn sao cho khoa học, dễ hiểu và đem lại hiệu năng cao cho chương trình.
Có thể hiểu Clean Code là Code mà nhiều người có thể làm việc cùng và tuân theo nguyên tắc nhất định mà đội nhóm đó đã thống nhất. 

## 2. Tại sao Clean Code là quan trọng

Nhiều lập trình viên sẽ nghĩ: "Mã của tôi đang hoạt động tốt và khách hàng của tôi hài lòng, vậy tại sao tôi phải quan tâm đến việc viết mã sạch?". Ngay cả khi code của bạn có đang hoạt động hay đúng với mong muốn của khách hàng, bạn vẫn cần nhớ điều này cho việc phát triển và mở rộng trong tương lai. Nếu code không rõ ràng ngay từ đầu, thì việc bảo trì, cập nhật hoặc mở rộng mã đó trong tương lai sẽ khó khăn hơn nhiều

## 3. Cách xác định Clean Code 

Làm sao để có thể tự đánh giá xem Code của bạn đã là Clean Code hay không? bạn có thể tự hỏi các câu hỏi này: 
* Ai sẽ là đối tượng xem code của bạn?
* Việc cập nhật code sẽ dễ dàng như thế nào khi cần các tính năng mới hoặc các phần mềm hợp nhất mới được triển khai?
* Việc duy trì và mở rộng mã này sẽ dễ dàng như thế nào?

## 4. Một số mẹo cần thiết cho Clean Code 

Ý tưởng, phương pháp viết Clean Code là chủ quan của mỗi dev. Cho nên không phải phương pháp nào cũng được các dev nhất quán nhất trí với nhau. Bài viết đưa ra một số mẹo bạn có thể tham khảo và áp dụng.

1. Thống nhất cách làm. Nếu bạn quen với một cách nào đó thì hãy áp dụng cách đó cho những thứ tương tự.
2. Đặt tên biến có nghĩa.
3. Khai báo biến để chứa các giá trị biên. Ví dụ:
    ```
    // ❌
    const arr = [1, 2, 3];
    for (let i = 0; i <= arr.length - 1; i++) { }

    // ✅
    const arr = [1, 2, 3];
    const lastIndex = arr.length - 1;
    for (let i = 0; i <= lastIndex; i++) { }
  4. Nếu có thể, chọn 'value object' thay vì kiểu dữ liệu nguyên thủy.
  5. Tránh sự lệ thuộc về logic. 
  
      Ví dụ khi xây dựng method, không nên cho method đó lệ thuộc một điều kiện nào đó trong cùng một class.
  6. Tránh dùng điều kiện phủ định.

## Quy tắc đặt tên

Nếu team của bạn chọn quy ước đặt tên là camelCase, hãy sử dụng camelCase cho toàn bộ dự án, nếu bạn qua một team khác chuộng snake_case hơn, hãy tuân thủ nghiêm ngặt. Cho dù là quy ước nào thì điều quan trọng nhất chính là tính nhất quán.

1. Đặt tên rõ ràng, mô tả được công dụng.
2. Dễ phân biệt.
3. Dễ đọc.
4. Dễ tìm.
5. Tránh lặp từ, viết tắt
6. Không nên dùng số trực tiếp trong code mà phải đặt tên cho nó. Ví dụ:

    ```
    // ❌
    if (gender === 0) { }
    else if (gender === 1) { }
    else { }

    // ✅
    const MALE = 0;
    const FEMALE = 1;

    if (gender === MALE) { }
    else if (gender === FEMALE) { }
    else { }
6. Không nên chèn tiền tố hay kiểu dữ liệu vào tên. Ví dụ

    ```
    // ❌
    let sName = "Robert C. Martin";
    let roleList = ["User", "Admin", "Mod"];

    // ✅
    let name = "Robert C. Martin";
    let roles = ["User", "Admin", "Mod"];
    
  Chi tiết tham khảo: https://viblo.asia/p/naming-rules-cac-quy-tac-vang-trong-lang-dat-ten-ByEZkMXE5Q0
    
##   Quy tắc đặt tên của hàm
1. Nhỏ.
2. Chỉ làm một việc.
3. Tên dễ hiểu.
4. Chỉ nên có ít đối số.
5. Không có tác dụng phụ.
6. Không được dùng đối số dạng flag mà phải tách nhỏ hàm ra thành nhiều hàm độc lập để dễ gọi cũng như test. Ví dụ:
     ```
     // ❌
    function setConfig(name, value) {
        if (name === "theme") {
            this._theme = value;
        }
        if (name === "font") {
            this._font = value;
        }
    }

    // ✅
    function setTheme(value) { this._theme = value; }
    function setFont(value) { this._font = value; }
    
##  Quy tắc comment
1. Code nên dễ hiểu để không lệ thuộc nhiều vào comment.
2. Không comment dư thừa.
3. Không comment khi đóng thẻ/ngoặc. Ví dụ:
    ```
    <!DOCTYPE html>
    <html lang="en">
    <!-- mở head -->
    <head>
    ...
    </head>
    <!-- kết thúc head -->

    <!-- mở body -->
    <body>
    ...
    </body>
    <!-- kết thúc body -->
    </html>

4. Không comment đoạn code không còn sử dụng, xóa nó luôn.
5. Comment lý do tại sao code được viết như vậy (code lạ, trường hợp bất khả kháng).
6. Comment để làm rõ ý nghĩa của code (logic phức tạp).
7. Comment cảnh báo hậu quả.

## Cấu trúc code
1. Phân chia code theo chiều dọc
2. Những code liên quan nhau nên viết liền nhau (theo chiều dọc).
3. Khai báo biến gần chỗ nó được sử dụng.
4. Các hàm liên quan nhau nên đặt gần nhau.
5. Các hàm giống nhau nên đặt gần nhau.
6. Các hàm nên viết từ trên xuống dưới.
7. Mỗi dòng code nên ngắn.
8. Dùng khoảng trắng một cách hợp lý để liên kết những thứ liên quan và tách những thứ ít liên quan với nhau.
9. Ngắt thụt đầu dòng 
    ```
    // ❌
    if (isUser) loadUserPage();
    else redirectHome();

    // ✅
    if (isUser)
        loadUserPage();
    else
        redirectHome();

## Cấu trúc dữ liệu và object
1. Ẩn cấu trúc nội bộ.
2. Dùng cấu trúc dữ liệu nếu có thể.
3. Tránh cấu trúc hỗn hợp, nửa này nữa kia.
4. Nhỏ.
5. Chỉ làm một việc.
6. Chỉ dùng một ít biến instance.
7. Cha không được nhìn con. (Base class không nên biết các child class trông như thế nào)
8. Tạo nhiều hàm thay vì truyền đối số vào duy nhất một hàm rồi xử lý theo đối số đó.
9. Nên dùng non-static thay vì static method.

## Lời kết  

Clean code thực sự là một trong những kỹ năng quan trọng bậc nhất nếu bạn muốn trở thành một lập trình viên chuyên nghiệp. Vì vậy luôn trau dồi và cải tiến kỹ năng đó mỗi ngày.

Có hai cuốn sách rất hay về chủ đề này bạn có thể tham khảo đó là:

1. Clean Code: A Handbook of Agile Software Craftsmanship
2. The Clean Coder: A Code of Conduct for Professional Programmers