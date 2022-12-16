# Lời mở đầu:
Nếu đã là một lập trình viên hay mới chỉ là một sinh viên CNTT thì việc phải tham khảo, đọc code của người khác là một công việc không quá xa lạ. Và việc này trở nên khó khăn khi mỗi người lại có một thói quen, một cách viết code riêng biệt, gây khó khăn cho việc đọc hiểu, cũng như là sửa đổi, phát triển về sau. Vì vậy, một bộ quy tắc viết code chung được sinh ra để các lập trình viên tuân theo gọi là **coding convention**.
# 1. Khái niệm Coding Convention:
 - Là tập hợp những nguyên tắc chung khi lập trình (được công nhận và đi theo bởi đa số các lập trình viên trên thế giới) nhằm làm cho code dễ đọc, dễ hiểu, từ đó dễ quản lý, phát triển hơn. 
 - **Coding conventions** có những cái chung và cái riêng tuỳ ngôn ngữ, tuỳ cộng đồng, bao gồm các quy tắc:
     - **Quy tắc đặt tên** : 
          - (**camelCase**) ký tự đầu tiên của từ đầu tiên viết thường những ký tự đầu tiên của những từ tiếp theo được viết hoa
          --> áp dụng cho:  tên biến, tên hàm
          - (**PascalCase**) cú pháp Pascal viết hoa chữ cái đầu tiên của mỗi từ
           --> áp dụng cho:  tên lớp
          - (**snake_case**) cú pháp con rắn, tất cả các chữ cái đều viết thường, và các từ cách nhau bởi dấu gạch dưới --> áp dụng cho:  tên biến, tên hàm
          - Tên biến, tên lớp thường là danh từ, cụm danh từ.
          - Tên hàm thường bắt đầu bằng động từ (thực hiện việc gì)
   
     - **Quy tắc số lượng**:
         -  Hàm không nên quá 30 dòng
         -  Lớp không nên vượt quá 500 dòng
         -  Một hàm không được vượt quá 5 tham số, nên giữ <=3
         -  Một hàm chỉ nên làm duy nhất 1 việc
         -  Khi khai báo biến, một dòng chỉ chứa một biến
         -  Một dòng không nên dài quá 80 ký tự
         -  Các câu lệnh lồng nhau tối đa 4 cấp
   - **Quy tắc xuống dòng**:
        - Nếu có dấu phẩy thì xuống hàng sau dấu phẩy
        - Nếu có nhiều cấp lồng nhau, thì xuống hàng theo từng cấp
        - Dòng xuống hàng mới thì nên bắt đầu ở cùng cột với đoạn lệnh cùng cấp ở trên.
        
# 2. PSR là gì? Tại sao lại cần tới PSR?
- **PSR (PHP Standards Recommendation)** là tập hợp các quy tắc khi lập trình với ngôn ngữ PHP. Chuẩn này có các mức khác nhau, tùy vào từng môi trường làm việc sẽ yêu cầu những mức PSR khác nhau, nhưng phổ biến nhất thường là PSR-2 (và Framgia cũng yêu cầu chuẩn PSR-2).

### Chuẩn PSR-1: Các chuẩn cơ bản
- Code phải được viết trong cặp thẻ <?php ?>.
- Code chỉ được sử dụng UTF-8 không có BOM (Byte Order Mark là các chuỗi .EF,BB,BF ở đầu file cho phép phần mềm biết đây là 1 file UTF-8).
- Mỗi một file PHP chỉ nên làm 1 nhiệm vụ duy nhất, tránh chồng chéo (gọi là **side effect**).
- Các hẳng số phải viết hoa tất cả và phân cách nhau bằng dấu gạch chân (**UPPER_CASE**).

### Chuẩn PSR-2: Chuẩn viết code
- Đầu tiên là phải đạt chuẩn **PSR-1**.
- Sử dụng 4 khoảng trắng(spaces) để thụt dòng thay vì dùng tab.
- Phải có 1 dòng trắng sau khi khai báo namespace và phải có 1 dòng trắng sau các khai báo use.
- Thẻ đóng và mở của 1 hàm {} phải nằm riêng biệt trên một dòng.
- Trước thẻ mở & đóng hàm {} thì không được có 1 dòng trắng.
- Phải dùng dấu nháy đơn ‘ để khai báo chuỗi không chứa biến, nếu chuỗi có chứa kí tự ‘ thì có thể dùng dấu nháy kép "" để bọc bên ngoài.
- Đối với khối lệnh **switch case** thì phải có từ khóa **break** hoặc **return**, trong trường hợp nào không có thì phải comment **//no break**

### Chuẩn PSR-0: 
Chuẩn PSR-0 là một chuẩn cho[ autoloading classes](http://php.net/autoload). Tuy nhiên từ tháng 10/2014 PSR-0 đã được đề suất không sử dụng nữa và **PSR-4** được đề xuất thay thế. Tuy nhiên, chúng ta cũng nên tìm hiểu xem **PSR-0** có gì đặc biệt, biết đâu vẫn có lúc sử dụng thì sao.

- Một namespace và class chuẩn phải tuân theo cấu trúc: **\<Vendor Name>\(<Namespace>\)<Class Name>**
- Mỗi namespace có namespace gốc **<Vendor Name>**
- Một namespace có thể chứa bao nhiêu namespace con (**sub-namespace**) cũng được.
- Mỗi kí tự _ trong tên class sẽ được chuyển đổi thành **DIRECTORY_SEPARATOR** . Kí tự _ không có ý nghĩa đặc biệt gì trong namespace. 
- Khi được tải từ file hệ thống, namespace và class sẽ có chứa hậu tố **.php**.
- Đối với **vendor names**, **namespace** và **class names**, có thể kết hợp giữa chữ hoa và chữ thường.

### Chuẩn PSR-4: Autoloader
Về cơ bản, chuẩn PSR-4 cũng tương tự như PSR-0, tuy nhiên, PSR-4 sẽ đưa ra những yêu cầu nghiêm ngặt hơn. Ví dụ như: 
- Tên đầy đủ nó **PHẢI** có một '*tên lớp kết thúc*' (**terminating class name**)
- Tên xác định đầy đủ **PHẢI** có một namespace gốc.
- Tên xác định đầy đủ **CÓ THỂ** có một hoặc nhiều namespace con.

- ...

### Ngoài ra còn một số các quy tắc khác, không được quy định cụ thể trong các bộ PSR.

- Sử dụng phiên bản PHP mới nhất nếu có thể.
- Khi khai báo mảng, các phần tử của mảng có thể được tách thành nhiều dòng. Khi làm vậy thì cần phải tuân thủ các quy tắc sau:
    - Phần từ đầu tiên của mảng phải được đặt trên một dòng mới.
    - Mỗi dòng chỉ được phép có một phần tử, các phần tử được indent một lần.
    - Cần phải có dấu phẩy ở cuối phần tử cuối cùng.
    - Dấu kết thúc khai báo mảng (ngoặc vuông) phải được đặt trên một dòng mới.
- Với phiên bản PHP >= 5.4, hãy sử dụng [ ] để khai báo array, thay vì dùng array().
- Tên biến được viết dưới dạng camelCase. Đối với tên property bên trong Model thì có thể viết dưới dạng snake_case cho phù hợp với tên của các cột trong các bảng của Database.
- Sử dụng dấu ' đối với một string bình thường. Chỉ dùng " khi bên trong có khai triển biến PHP.
- Cần có 1 space trước và sau các toán tử như *+, -, , /, ., >, <, ==*
# 3. Kết luận:
- Nếu tuân theo những quy tắc viết code như trên, mình tin rằng teamwork để bảo trì và phát triển ứng dụng sẽ đơn giản hơn nhiều (tránh trường hợp xem code của người khác không hiểu hay thậm chí là xem code của chính mình cũng không hiểu :D)

- Mong rằng bài viết này sẽ giúp ích cho các bạn.

- Hẹn gặp lại các bạn trong những bài viết tiếp theo trong series "xây nhà" của mình!

# 4. Nguồn tham khảo:
https://www.php-fig.org/psr/

https://github.com/framgia/coding-standards/tree/master/vn/php

https://viblo.asia/p/psr-va-coding-standard-in-framgia-djeZ1amQZWz