*Bài viết được dịch từ [**Gist của wojteklu**](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29).*

Code sạch khi nó có thể được hiểu bởi tất cả mọi người trong team. Code sạch có thể được một lập trình viên khác ngoài chính tác giả đọc và cải tiến. Code dễ hiểu sẽ dễ đọc, dễ sửa, dễ cải tiến và dễ bảo trì.

-----

## Quy tắc chung

1. Tuân theo các quy ước chuẩn.
2. Suy nghĩ đơn giản thôi, viết code cũng đơn giản thôi.
3. Luôn dọn code sạch sẽ hơn lúc bạn nhận nó, dù là code của mình hay người khác.
4. Luôn tìm nguyên nhân cốt lõi của vấn đề.

## Quy tắc thiết kế

1. Dữ liệu tùy chỉnh/cấu hình thì nên đặt ở level cao.
2. Thay vì dùng if/else hoặc switch/case, nên vận dụng [tính đa hình](https://viblo.asia/p/4-dac-tinh-cua-lap-trinh-huong-doi-tuong-object-oriented-program-XL6lAA7Nlek#_tinh-da-hinh-polymorphism--2).
3. Tách code đa luồng.
4. Đừng lạm dụng *configurability*?
5. Sử dụng [dependency injection](https://viblo.asia/p/dependency-injection-la-gi-va-khi-nao-thi-nen-su-dung-no-LzD5d0d05jY).
6. Tuân theo [Định luật Demeter](https://viblo.asia/p/code-tom-2-biet-qua-nhieu-63vKjR2RK2R)

## Mẹo để code dễ hiểu

1. Thống nhất cách làm. Nếu bạn quen với một cách nào đó thì hãy áp dụng cách đó cho những thứ tương tự.
2. Đặt tên biến có nghĩa.
3. Khai báo biến để chứa các giá trị biên. Ví dụ:
    ```js
    // ❌
    const arr = [1, 2, 3];
    for (let i = 0; i <= arr.length - 1; i++) { }
    
    // ✅
    const arr = [1, 2, 3];
    const lastIndex = arr.length - 1;
    for (let i = 0; i <= lastIndex; i++) { }
    ```
4. Nếu có thể, chọn 'value object' thay vì kiểu dữ liệu nguyên thủy.
5. Tránh sự lệ thuộc về logic. Ví dụ khi xây dựng method, không nên cho method đó lệ thuộc một điều kiện nào đó trong cùng một class.
6. Tránh dùng điều kiện phủ định.

## Quy tắc đặt tên

1. Đặt tên rõ ràng, mô tả được công dụng.
2. Dễ phân biệt.
3. Dễ đọc.
4. Dễ tìm.
5. Không nên dùng số trực tiếp trong code mà phải đặt tên cho nó. Ví dụ:
    ```js
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
    ```
6. Không nên chèn tiền tố hay kiểu dữ liệu vào tên. Ví dụ:
    ```js
    // ❌
    let sName = "Robert C. Martin";
    let roleList = ["User", "Admin", "Mod"];

    // ✅
    let name = "Robert C. Martin";
    let roles = ["User", "Admin", "Mod"];
    ```
    
*Tham khảo thêm: [Naming rules - Các quy tắc vàng trong làng đặt tên](https://viblo.asia/p/naming-rules-cac-quy-tac-vang-trong-lang-dat-ten-ByEZkMXE5Q0)*

## Quy tắc của hàm

1. Nhỏ.
2. Chỉ làm một việc.
3. Tên dễ hiểu.
4. Chỉ nên có ít đối số.
5. Không có tác dụng phụ.
6. Không được dùng đối số dạng flag mà phải tách nhỏ hàm ra thành nhiều hàm độc lập để dễ gọi cũng như test. Ví dụ:
    ```js
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
    ```

## Quy tắc comment

1. Code nên dễ hiểu để không lệ thuộc nhiều vào comment.
2. Không comment dư thừa.
3. Không comment những điều quá rõ ràng, dễ nhận biết. Ví dụ:
    ```js
    /**
     * Hàm thêm role vào database.
     */
    function addRole(role) {
        db.roles.add(role);
    }
    ```
4. Không comment khi đóng thẻ/ngoặc. Ví dụ:
    ```html
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
    ```
5. Không comment đoạn code không còn sử dụng, xóa nó luôn.
6. Comment lý do tại sao code được viết như vậy (code lạ, trường hợp bất khả kháng).
7. Comment để làm rõ ý nghĩa của code (logic phức tạp).
8. Comment cảnh báo hậu quả.

## Cấu trúc code

1. Phân chia code theo chiều dọc.
2. Những code liên quan nhau nên viết liền nhau (theo chiều dọc).
3. Khai báo biến gần chỗ nó được sử dụng.
4. Các hàm liên quan nhau nên đặt gần nhau.
5. Các hàm giống nhau nên đặt gần nhau.
6. Các hàm nên viết từ trên xuống dưới.
7. Mỗi dòng code nên ngắn.
8. Không cân chỉnh code theo chiều ngang. Ví dụ:
    ```ts
    // ❌
    const PI:     number = 3.14;
    let   radius: number = 10;
    let   area:   number = 2 * PI * radius;
    
    // ✅
    const PI: number = 3.14;
    let radius: number = 10;
    let area: number = 2 * PI * radius;
    ```
9. Dùng khoảng trắng một cách hợp lý để liên kết những thứ liên quan và tách những thứ ít liên quan với nhau.
10. Đừng ngắt thụt đầu dòng. Ví dụ:
    ```js
    // ❌
    if (isUser) loadUserPage();
    else redirectHome();
    
    // ✅
    if (isUser)
        loadUserPage();
    else
        redirectHome();
    ```

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

## Kiểm thử (test)

1. Mỗi test chỉ nên kiểm tra một thứ.
2. Dễ đọc.
3. Nhanh.
4. Độc lập.
5. Có thể lặp đi lặp lại.

## Code thúi

1. Quá cứng nhắc, khó thay đổi. Một thay đổi nhỏ mà dẫn tới một loạt những thay đổi khác.
2. Mong manh, dễ vỡ. Chỉ sửa một chỗ mà gây ra lỗi một đống chỗ.
3. Bất động. Code không thể được tái sử dụng trong những dự án khác, vì quá nhiều rủi ro và tốn effort.
4. Phức tạp hóa không cần thiết.
5. Lặp lại không cần thiết.
6. Code khó hiểu.

----
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)