### I. Mở đầu
Câu hỏi tưởng đơn giản nhưng không phải ai cũng để ý và biết, và là bug hay incident tiềm tàng nếu không hiểu rõ
### II. Vấn đề
- Nếu kiểm tra các điều kiện trên sau: `null > 0; null < 0; null == 0; null >= 0; null <= 0`, ta sẽ có các giá trị tương ứng


    | Điều kiện | Giá trị | 
    | -------- | -------- | -------- |
    | null > 0     | false     |
    | null < 0     | false    |
    | null == 0     | false    |
    | null >= 0     | true     |
    | null <= 0     | true     |

- Khi nhìn vào giá trị trên ta sẽ cảm thấy khó hiểu vì sao lại như vậy?
- Vì sao nếu null >= 0 thì có nghĩa là null phải lớn hoặc bằng 0, thế tại sao null > 0 lại không đúng, null == 0 cũng chẳng đúng nốt @@
- Yeah, bug sẽ phát sinh nếu ta dùng câu lệnh như này trong dự án `itemsLength >= 0`, nếu itemsLength là null thì toang rồi :v
### III. Vì sao lại như vậy
- Không chỉ mỗi null, mà những giá trị như: `false`, `''`, `'0'`, `[]`
- Khi những giá trị này sử dụng toán tử `>` hoặc `<` thì javascript sẽ ép buộc tất cả về kiểu nguyên thủy của nó là 0, nên 0 thì không thể `>0` hoặc `<0`
- Còn về khi so sánh `==` thì javascript lại không ép về 0, mà so sánh giá trị, nên việc giá trị null == 0 thì cũng không đúng
- Đối với việc `null >= 0` hay `null <= 0` thì như mình nói ở trên, khi sử dụng toán tử `>` hoặc `<` thì sẽ bị ép về 0, nên bây giờ null giá trị của nó là 0, mà 0 thì tất nhiên bằng 0, vì vậy 2 điều kiện này đúng :v 
- Có nhiều bạn sẽ thử điều kiện như sau `(null==0)||(null>0)` và nó trả về `false`, bạn ấy nói vì sao cùng một câu nhưng lại vẫn trả về `false`,  đơn giản vì bạn chỉ dùng nó ở vế `sau hoặc` nên nó chỉ ép về 0 ở vế sau thôi, còn vế trước vẫn là dùng toán tử `==`, và ngược lại kể cả bạn để toán tử `>` `trước hoặc`
### IV. Chuyên sâu:
- Trước khi vào thuật toán, ta nên biết về khái niệm `ToNumber`, như cái tên nó sẽ chuyển thành kiểu số theo [9.3](https://262.ecma-international.org/5.1/#sec-9.3)


    | Argument Type | Result |
    | -------- | -------- | 
    | Undefined	     | NaN     |
    | Null	     | +0     |
    | Boolean	     | Kết quả là 1 nếu đối số là đúng. Kết quả là +0 nếu đối số là sai     |
    | Number	     | Kết quả bằng với đối số đầu vào (không có chuyển đổi)     |
    | String		     | [Xem tại đây](https://262.ecma-international.org/5.1/#sec-9.3.1) (lười quá =)))     |
    | Object		     | true     |
- Khái niệm về `ToPrimitive` [9.1](https://262.ecma-international.org/5.1/#sec-9.1)
    | Argument Type | Result |
    | -------- | -------- | 
    | Undefined	     | Kết quả bằng với đối số đầu vào (không có chuyển đổi)      |
    | Null	     | Kết quả bằng với đối số đầu vào (không có chuyển đổi)     |
    | Boolean	     | Kết quả bằng với đối số đầu vào (không có chuyển đổi)      |
    | Number	     | Kết quả bằng với đối số đầu vào (không có chuyển đổi)     |
    | String		     | Kết quả bằng với đối số đầu vào (không có chuyển đổi)     |
    | Object		     | Trả lại giá trị mặc định cho Đối tượng, được truy xuất bằng cách gọi phương thức bên trong [[DefaultValue]] ([8.12.8](https://262.ecma-international.org/5.1/#sec-8.12.8))   |

- Trong phần [11.9.3](https://262.ecma-international.org/5.1/#sec-11.9.3) So sánh về thuật toán bằng
    - Thì khi x == y, với x và y là giá trị, thì nó sẽ thực hiện như sau
        - Nếu Type(x) là giống Type(y), thì
            -  Với kiểu là Undefined, trả về true
            -  Kiểu là Null, trả về true
            -  Kiểu là Number, thì
                -  x là NaN => false
                -  y là NaN => false
                -  x và y là NaN => false
            -  Nếu Type là String, thì true khi x và y cùng độ dài (length), cùng ký tự và cùng vị trí đứng của ký tự đó. Ngược lại thì false
            -  Nếu Type là Boolean, thì true khi cả 2 đều có giá trị là true hoặc false. Ngược lại thì trả về false
            -  Trả về false khi x và y cùng trỏ tới một object. Ngược lại, thì là false. Ví dụ:
                ```
                a = { a: 1 }
                b = { a: 1 }
                a == b // false
                // cho trỏ cùng 1 object
                c = { a: 1 }
                a = c
                b = c
                a == b // true
                ```
        - Nếu x là null and y là undefined => true
        - Nếu x là undefined and y là null => true
        - Nếu Loại (x) là Số và Loại (y) là Chuỗi, trả về kết quả của phép so sánh x == ToNumber (y)
        - Nếu Loại (x) là Chuỗi và Loại (y) là Số, trả về kết quả của phép so sánh ToNumber (x) == y
        - Nếu Kiểu (x) là Boolean, trả về kết quả của phép so sánh ToNumber (x) == y
        - Nếu Kiểu (y) là Boolean, trả về kết quả của phép so sánh x == ToNumber (y)
        - Nếu Loại (x) là Chuỗi hoặc Số và Loại (y) là Đối tượng, trả về kết quả của phép so sánh x == ToPrimitive (y)
        - Mặc định false
- Trong phần [11.8.5](https://262.ecma-international.org/5.1/#sec-11.8.5) So sánh về thuật toán quan hệ Abstract
    - So sánh x < y, trong đó x và y là giá trị, trả về true, false hoặc undefined (chỉ ra rằng có ít nhất một toán hạng là NaN).
    - Ngoài x và y, thuật toán còn lấy một cờ Boolean với tên là `LeftFirst` làm tham số, để kiểm soát thứ tự hoạt động của x và y, nó là cần thiết vì ECMAScript chỉ đánh giá từ trái sang phải của một biểu thức
    - Mặc định của LeftFirst là true và cho biết rằng tham số x tương ứng với một biểu thức xuất hiện ở bên trái của biểu thức tương ứng với tham số y
    - Nếu LeftFirst là false thì trường hợp ngược sẽ xảy ra và các phép toán phải được thực hiện trước x
        - Nếu LeftFirst là true, thì
            - Gọi px là kết quả của ToPrimitive(x, hint Number)
            - Gọi py là kết quả của ToPrimitive(y, hint Number)
        - Nếu không, thứ tự đánh giá cần được đảo ngược để bảo toàn đánh giá từ trái sang phải
            - Gọi py là kết quả của ToPrimitive (y, hint Number)
            - Gọi px là kết quả của ToPrimitive (x, hint Number)
        - Nếu không phải trường hợp cả 2 Type(px) là String và Type(py) là String, thì
            - Gọi nx là kết quả của ToNumber(px). Vì px và py đều là giá trị nguyên thủy nên thứ tự đánh giá không quan trọng
            - Gọi ny là kết quả của ToNumber(py)
            - Nếu nx là NaN => undefined
            - Nếu ny là NaN => undefined
            - Nếu nx và ny có cùng giá trị Number, trả về false
            - Nếu nx là +0, ny là -0 => false
            - Nếu nx là -0, ny là +0 => false
            - Nếu nx là +∞ => false
            - Nếu ny là +∞ => true
            - Nếu ny là −∞ => false
            - Nếu nx là −∞ => true
            - Nếu giá trị toán học của nx nhỏ hơn giá trị toán học của ny (lưu ý rằng các giá trị toán học này đều hữu hạn và không phải bằng không) trả về true. Nếu không, trả về false
        - Cả px và py là chuỗi
            - Nếu py là tiền tố của px, trả về false. (Giá trị chuỗi p là tiền tố của giá trị Chuỗi q nếu q có thể là kết quả của việc nối p và một số Chuỗi khác r. Lưu ý rằng bất kỳ Chuỗi nào cũng là tiền tố của chính nó, vì r có thể là Chuỗi trống.) 
            - Nếu px là tiền tố của py, trả về true
            - Gọi k là số nguyên không âm nhỏ nhất sao cho ký tự ở vị trí k trong px khác ký tự ở vị trí k trong py. (Phải có k như vậy, vì không Chuỗi nào là tiền tố của chuỗi kia.)
            - Gọi m là số nguyên là giá trị đơn vị code của ký tự ở vị trí k trong px
            - Gọi n là số nguyên là giá trị đơn vị code của ký tự ở vị trí k trong py
            - Nếu m <n, trả về true. Nếu không, trả về false
    - Rối đúng không, từ rồi sẽ hiểu =))
    - À với LeftFirst thì mình hiểu nó như này
        - Khi so sánh x < y thì LeftFirst là true
        - Khi so sánh x > y thì LeftFirst là false
        - Hay y < x thì LeftFirst là true
        - Nó sẽ set theo dấu < làm chuẩn để LeftFirst là true hay false
### V. Kết
- Relational Comparison (>, <): Nếu cả hai giá trị không phải là kiểu String, thì ToNumber được gọi trên cả hai. Điều này cũng giống như thêm dấu + ở phía trước, thế nên null thành 0
- Equality Comparison (==): chỉ gọi ToNumber trên Strings, Numbers và Boolean.
- À và việc null >= 0 thì khi null đã cưỡng chế thành 0 thì 0 sẽ só sánh > trước, rồi lấy tiếp 0 là giá trị tiếp theo để so sánh bằng, cũng giống như việc bạn qua nhà hàng xóm A xin đĩa game mario ozawa A mà A gần hàng xóm B, bạn chạy qua B mượn tiếp đĩa B :v
- Còn với null > 0 || null == 0 thì nó tương tự như việc bạn qua nhà A lấy đĩa, đem về nhà rồi từ nhà lại đi tới nhà B lấy đĩa :v
- Hiểu cơ bản thì dễ nhưng để hiểu chuyên sâu thì căng quá, vì nó trừu tượng kinh khủng :v 
- Cái này chẳng biết có nên gọi nó là bug của javascript không nữa, vì nếu ai cũng chấp nhận thì thành ra nó lại là một tính năng =))
- Chúc các bạn không gặp lỗi này :v