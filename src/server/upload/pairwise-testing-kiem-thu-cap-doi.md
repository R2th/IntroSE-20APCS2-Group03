### Pairwise Testing - Kiểm thử cặp đôi là gì?
Pairwise Testing - Kiểm thử cặp đôi còn được biết đến như là kiểm thử All-pairs, đây là một cách tiếp cận kiểm thử được sử dụng để kiểm thử phần mềm bằng cách sử dụng phương pháp tổ hợp. 

Đó là một phương pháp để kiểm tra tất cả sự kết hợp rời rạc có thể của các tham số liên quan.

Giả sử chúng ta có một phần của phần mềm để kiểm tra có 10 trường đầu vào và chúng nhận 10 giá trị có thể cho mỗi trường đầu vào,
khi đó sẽ có 10 ^ 10 đầu vào có thể được kiểm tra. 

Trong trường hợp này, việc kiểm tra toàn bộ là không thể thực hiện ngay cả khi chúng ta muốn kiểm tra tất cả các sự kết hợp.

**Hãy cùng tìm hiểu khái niệm bằng cách tìm hiểu thông qua ví dụ dưới đây:**
Một ứng dụng gồm có:
- Listbox đơn giản với 10 phần tử (Giả sử 0,1,2,3,4,5,6,7,8,9) 
- Checkbox
- Radio Button
- Textbox có thể nhận những giá trị từ 1 đến 100
-  Và OK button

**Dưới đây là các giá trị mà mỗi một trong các đối tượng trên có thể nhận:**
- Listbox: 0,1,2,3,4,5,6,7,8,9
- Checkbox: Checked/ Unchecked
- Radio: ON/ OFF
- Textbox: từ 1 đến 100

**Kết hợp các trường hợp có thể tính toán như dưới đây:**

Listbox = 10

Checkbox = 2

Radio Button = 2

Textbox = 100

*=> Tổng số lượng test case sử dụng theo phương pháp thông thường = 1022100 = 4000*


Làm sao để giảm số lượng các trường hợp kiểm thử?

Đầu tiên chúng ta sẽ cố gắng tìm ra số trường hợp sử dụng kỹ thuật kiểm thử phần mềm thông thường

Chúng ta có thể xemcác giá trị của Selectbox gồm 0 và các giá trị khác như 0

Check Box và Radio Button không thể giảm, vì vậy mỗi kiểu sẽ có 2 kết hợp (ON hoặc OFF)

Các giá trị của Text Box có thể được giảm thành ba đầu vào (Valid Int, Invalid Int, AlphaSpecialCharacter)

Như vậy, chúng ta sẽ tính toán số trường hợp sử dụng kỹ thuật kiểm thử phần mềm là 2 * 2 * 2 * 3 = 24 (bao gồm cả các trường hợp không hợp lệ)

Nhưng chúng ta vẫn có thể giảm kết hợp bằng kỹ thuật All-pair:

**Bước 1**: Đặt các giá trị trên và bảng với giá trị đầu tiên là đối tượng có nhiều giá trị đầu vào nhất và đối tượng có ít giá trị đầu vào nhất ở vị trí cuối cùng
              (Trong ví dụ này sẽ là Textbox)
              
**Bước 2**: Bắt đầu điền giá trị vào từng cột. Có thể chọn Listbox là đối tượng thứ 2 và nó nhận 2 giá trị 

**Bước 3**: Cột tiếp theo sẽ là Checkbox, Checkbox cũng nhận 2 giá trị đầu vào

**Bước 4**: Chúng ta cần phải đảm bảo rằng chúng ta đã kiểm tra tất cả các kết hợp giữa giữa Listbox và Checkbox

**Bước 5**: Tiếp theo chúng ta sẽ sử dụng cùng một chiến lược để kiểm tra Radio Button, nó cũng nhận 2 giá trị

**Bước 6**: Xác minh xem tất cả các cặp giá trị sẽ được bao phủ như bảng dưới đây
	
    
| Textbox | Listbox | Checkbox | Radio Button | 
| -------- | -------- | -------- |-------- |
| Valid Int | 0 | Cheked | ON |
| Valid Int | Others | Uncheked | OFF |
| Invalid Int | 0 | Cheked | ON |
| Invalid Int | Others | Uncheked | OFF |
| AlphaSpecialCharacter| 0 | Cheked | ON |
| AlphaSpecialCharacter | Others | Uncheked | OFF |

Như vậy, sau khi áp dụng phương pháp này, số lượng test case giảm xuống còn 6 case.

*Bài dịch từ: https://www.tutorialspoint.com/softwaretestingdictionary/pairwisetesting.htm*