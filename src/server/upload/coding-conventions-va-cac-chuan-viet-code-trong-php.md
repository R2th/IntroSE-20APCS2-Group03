# 1. Convention là gì ?
- `Coding conventions` **là tập hợp những nguyên tắc chung khi lập trình nhằm làm cho code dễ đọc, dễ hiểu, do đó dễ quản lý, bảo trì hơn.**
- Ví dụ: Nếu ta xem code của chúng ta như là một cô gái. Thì chúng ta thích một cô gái xinh đẹp, sạch sẽ hay thích một cô gái xấu xí lại còn lôi thôi ? Và tôi nghĩ chúng ta có câu trả lời rồi đúng không. Còn nếu không phải giống tôi nghĩ thì chúc mừng bạn:)))
- `Coding conventions` có những điểm chung và điểm riêng biệt tuỳ theo ngôn ngữ, tuỳ theo cộng đồng, nhưng được đa số các lập trình viên trên thế giới hầu công nhận và làm theo.

# 2. Quy tắc đặt tên (Naming Convention)
## Các cú pháp thông dụng
### 2.1 Cú pháp lạc đà (camelCase)
- **Cú pháp**: **Ký tự đầu tiên** của **từ đầu tiên** **viết thường**, **những ký tự đầu tiên** của **những từ tiếp theo** **viết hoa**.
- Ví dụ: productName, productPrice, thisIsTheNameFollowTheCamelCase

### 2.2 Cú pháp Pascal (PascalCase)
- **Cú pháp**: **viết hoa chữ cái đầu tiên của mỗi từ.**
- Ví dụ: ProductName, ProductPrice, ThisIsTheNameFollowThePascalCase
### 2.3 Cú pháp con rắn (snake_case)
- **Cú pháp**: **Tất cả các chữ cái** đều **viết thường**, và **các từ** **cách nhau** bởi **dấu gạch dưới**.
- Ví dụ: product_name, product_price, this_is_the_name_follow_the_snake_case

=> `Tuỳ vào mỗi ngôn ngữ lập trình và cộng đồng định nghĩa, ta sẽ lựa chọn cú pháp phù hợp.`

### Một số nguyên tắc:
> – **Tên lớp**: đặt theo **PascalCase**.
> 
> – **Tên biến, tên hàm**: đặt theo **camelCase** hoặc **snake_case**.
> 
> – **Hằng số**: đặt theo **UPPER_CASE**. VD: CLICK_COUNTER.
> 
> – **Tên biến, tên lớp**: thường là **danh từ**, **cụm danh từ** hoặc **tính từ**. VD: UserModel, userName, downloadCounter, isDownloaded.
> 
> – **Tên hàm** thường** bắt đầu bằng động từ**. VD: getUserName, setUserName, increaseDownloadCounter.
> 
> – **Tên phải có nghĩa, không được đặt tên kiểu viết tắt**. VD: uName, pName, idl, a, a1, doFA.
> 
> – **Tránh đặt những tên quá chung chung, tối nghĩa**. VD: top, doIncrease, getAll.

## Quy tắc về số lượng
Trong cuốn sách `[Clean Code]` (https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882): “*if small is good, then smaller must be better”*.
- **Số lượng dòng code trong hàm/lớp, số lượng hàm trong lớp, số lượng lớp trong gói phải giữ ở một giới hạn nhất định, và nên giữ càng ít càng tốt**
- *Ví dụ:*
> – Hàm không nên quá 30 dòng.
> 
> – Lớp không nên vượt quá 500 dòng. (Clean Code).
> 
> – Một hàm không được vượt quá 5 tham số. (nên giữ <=3).
> 
> – Một hàm chỉ làm duy nhất 1 việc, trong trường hợp cần thiết, có thể cho phép làm 2 việc, tuy nhiên tên hàm phải nói rõ điều này. VD: increaseDownloadCounterAndSaveToDatabase.
> 
> – Khi khai báo biến, một dòng chỉ chứa một biến.
> 
> – Một dòng không nên dài quá 80 ký tự (Oracle).
> 
> – Các câu lệnh lồng nhau tối đa 4 cấp.
> 
## Quy tắc xuống hàng
Theo Code Conventions của [Oracle] (http://www.oracle.com/technetwork/java/javase/documentation/codeconventions-136091.html#313).

– Nếu có dấu "," thì xuống hàng sau dấu ",".
```sql
        someMethod(longExpression1, longExpression2, longExpression3, 
                longExpression4, longExpression5);

        var = someMethod1(longExpression1,
                        someMethod2(longExpression2,
                                longExpression3)); 
```

– Xuống hàng trước toán tử + - ...

```markdown
        longName1 = longName2 * (longName3 + longName4 - longName5)
                   + 4 * longname6; // PREFER

        longName1 = longName2 * (longName3 + longName4
                               - longName5) + 4 * longname6; 
```

– Nếu có nhiều cấp lồng nhau, thì xuống hàng theo từng cấp.

– Dòng xuống hàng mới thì được bắt đầu ở cùng cột với đoạn lệnh cùng cấp ở trên.

## Comment
> - Hạn chế dùng comment để giải thích code, thay vào đó hãy cải thiện đoạn code của bạn.
> - Chỉ nên dùng comment khi viết documentation cho thư viện, thông tin đính kèm cho class …

# 3. Chuẩn viết code trong PHP
Ở mỗi ngôn ngữ lập trình sẽ có một quy tắc viết riêng, hôm nay mình sẽ nói về chuẩn code trong PHP.
> - PHP có một chuẩn viết code là PSR. PSR là viết tắt của từ PHP Standards Recommendation. 
> - Hiện tại thì có 5 chuẩn từ PSR-0 đến PSR-4 do các thành viên của nhóm FIG(Framework Interop Group) đề xuất. Nhóm này gồm nhiều các lập trình viên nổi tiếng của các framework như CakePHP, Drupal, Joomla...
## Chuẩn PSR-0, PSR-4: Chuẩn Autoloading
Những mô tả sau bắt buộc phải tuân theo:

> – Từ PHP 5.3 khi khai báo class bạn BUỘC PHẢI khai báo namespace.
> 
> – Một namespace và class đầy đủ điều kiện phải có cấu trúc như sau: \<Vendor Name>\(<Namespace>\)*<Class Name>
> 
> – Mỗi namespace phải có một top-level namespace (“Vendor name”), gọi là namespace gốc.
> 
> – Mỗi namespace có thể có nhiều sub-namespace (namespace con).

## Chuẩn PSR-1 : Các chuẩn cơ bản
Đây là các chuẩn dùng để viết code, có một vài quy tắc đơn giản như sau:

> – Code phải được viết trong cặp thẻ <?php ?> và nên sử dụng cặp thẻ ngắn <?= ?> thay cho echo.
> 
> – Mỗi một file PHP chỉ nên làm 1 nhiệm vụ duy nhất, tránh chồng chéo (gọi là side effect).
> 
> – Code chỉ được sử dụng UTF-8 không có BOM (BOM - Byte Order Mark là các chuỗi EF,BB,BF ở đầu file cho phép phần mềm biết đây là 1 file UTF-8).
> 
> – Namespace phải tuân theo chuẩn PSR “autoloading” (PSR-0, PSR-4).
> 
> – Tên class phải viết theo quy tắc PascalCase( hay tên khác StudlyCaps).
> 
> – Các hẳng số phải viết hoa tất cả các chữ, cách nhau bằng dấu gạch chân.
> 
> – Tên phương thức viết theo quy tắc camelCase.

## Chuẩn PSR-2: Chuẩn viết code
- Code phải tuân thủ PSR-1 & PSR-0.
- Sử dụng 4 khoảng trắng(spaces) để thụt dòng, tuyệt đối không dùng tab (bạn có thể khai báo trong công cụ lập trình để khi ấn tab nó tương đương với việc thụt vào 4 spaces).
- Trên 1 dòng không vượt quá 120 kí tự, tốt nhất nên nhỏ hơn hoặc bằng 80 kí tự, không nên có kí tự trắng ở cuối dòng.
- Phải có 1 dòng trắng sau khi khai báo namespace và phải có 1 dòng trắng sau các khai báo use.
- Thẻ đóng và mở của 1 hàm {} phải nằm riêng biệt trên một dòng.
- Trước thẻ mở và đóng hàm {} thì không được có 1 dòng trắng.
- Phải dùng dấu nháy đơn ‘ để khai báo chuỗi không chứa biến, nếu chuỗi có chứa kí tự ‘ thì dùng dấu nháy kép để bọc bên ngoài (chúng ta rất hay nhầm vấn đề này).
- Dùng dấu . để nối chuỗi, chú ý trước và sau dấu chấm . phải có khoảng trắng. Nếu chuỗi quá dài thì tách làm nhiều dòng và dấu chấm được đặt đầu dòng ngang với dấu bằng.
- Các tham số truyền vào hàm phải có 1 dấu cách trước dấu phẩy, bạn có thể tách thành nhiều dòng nhưng phải thụt lề 1 đơn vị.
- Đối với khối lệnh switch case thì case phải lùi 4 khoảng trắng so với switch, và các lệnh trong case cũng phải lùi 4 khoảng trắng so với case. Phải có từ khóa break hoặc return, trong trường hợp nào không có thì phải comment //no break
- Nếu phải sử dụng abstract và final hay static để khai báo hàm thì bạn phải khai báo theo thứ tự.
- Phải có 1 khoảng trắng trước và sau phép toán, khi ép kiểu thì phải có 1 khoảng trắng ngăn cách giữa kiểu dữ liệu và biến được ép kiểu.