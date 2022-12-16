### Phần 4: Regular Expression

Nhiều chương trình Linux sử dụng **Regular Expression** (regex) như là 1 tool mô tả và tìm kiếm các khuôn mẫu trùng khớp trong text file, 2 chương trình phổ biến nhất là **grep** và **sed**. Nội dung của Regular Expression rất rộng ở bài này chúng ta chỉ tìm hiểu ở mức độ căn bản, các bạn nếu yêu thích có thể tìm hiểu sâu hơn để phục vụ cho program của riêng mình nhé.

### 1.1. Các ký tự cơ bản dùng trong Regular Expression:

**Bracket** ([ ]): các ký tự nằm trong **bracket** giúp ta tìm kiếm các text có chứa  1 trong các ký tự đó. Ví dụ b[aeiou]g sẽ khớp với các từ: bag, beg, big, bog, bug.


**Range**: là biến thể của **Bracket** thay vì liệt kê hết tất cả các ký tự, **Range** đưa ra các miền với điểm bắt đầu và điểm kết thúc. Ví dụ: a[2-4]z sẽ khớp với a2z, a3z, và a4z.

**Dot** (.): tượng trưng cho bất kì ký tự nào ngoại trừ ~~newline~~.  Ví dụ a.z sẽ khớp với a2z, a5z, aBz,...... và tất cả các text 3 ký tự nào có chứa a đầu và z ở cuối.

**Carat** (^): tượng trưng cho bắt đầu của 1 dòng. Ví dụ: **^Th** sẽ tìm các từ bắt đầu với Th như: This, That, These, Those,...

**Dollar sign** ($): tượng trưng cho kết thúc 1 dòng. Ví dụ: **$er** sẽ tìm các từ kết thúc với er như: driver, painter, bartender,... 

**Asterisk** (*): tìm các ký tự xuất hiện 0 hoặc nhiều lần.

**Plus** (+): tìm các ký tự xuất hiện ít nhất 1 hoặc nhiều lần.

**Question mark** (?): tìm các ký tự xuất hiện 0 hoặc 1 lần.

**Dot kết hợp với Asterisk** (.*): nghĩa là khớp với bất kỳ chuỗi phụ nào. Ví dụ: **A.*Lincoln** nghĩa là tìm tất cả các chuỗi có chưa A và Lincoln, theo đó Abe Lincoln và Abraham Lincoln là 2 kết quả trùng ( còn nhiều nữa).

**Vertical bar** (|) : phân tách 2 lựa chọn khả thi. Ví dụ: **car |truck** khớp với car hoặc truck

**Parentheses** (()): ví dụ ta có 2 chuỗi regular expression và muốn phân tách 2 chuỗi này thì ta bỏ các chuỗi vào (), khi đó nó sẽ xem chuỗi 1 là 1 nhóm tách biệt hoàn toàn với chuỗi 2. (regex_string1) | (regex_string2)

**Escaping** (\): ví dụ chuỗi mà ta mong muốn có ký tự dot (.) thì ta phải dùng escape character để hệ thống phân biệt với **dot** trong regex. Ví dụ: www\.google\.com sẽ tìm kiếm chuỗi: www.google.com  



-----

### 1.2. GREP:

**Grep** là 1 lệnh hữu ích để ta tìm kiếm các file có chứa chuỗi mong muốn và trả về kết quả là tên file và (nếu là text file) dòng chứa chuỗi mà ta tìm. **Lưu ý** là mặc định grep biên dịch theo basic regex. Công thức cơ bản của grep:

> grep [options] regex [files]

Các option phổ biến của grep:

**-f file** : lấy các chuỗi mong muốn từ 1 file khác thay vì nhập từ dòng lệnh.
    
**-i**: (ingnore case) tức không quan trọng viết in hoa hay chữ thường.

**-r**: (recursive) giúp tìm kiếm trong các thư mục con.

**-F**: (fixed string) dùng khi bạn mún tìm kiếm đơn thuần không dùng đến regex, như vậy các ký tự đặc biệt như $, *, . sẽ được hệ thống xem như 1 ký tự đơn thuần không phải là regex.
 
 **-E**: (extend regex) vì Regular Expression được chia làm 2 loại: basic và extend. Mặc điịnh grep. Trong basic regex các ký tự  **‘?’, ‘+’, ‘{’, ‘|’, ‘(’, và ‘)’** mất đi hiệu lực, để sử dụng ta thêm dấu escaping ở đằng trước:  **‘\?’, ‘\+’, \‘{’, ‘\|’, ‘\(’, và ‘\)’**
 
Lý thuyết đủ rồi, giờ mình sẽ bước vào các ví dụ để dễ hình dung hơn nhé:

Ví dụ 1: Tìm dòng chứa chuỗi "eth" trong lệnh ifconfig:

`$ ifconfig | grep "eth"`

![](https://images.viblo.asia/3705e920-cd10-454b-a226-cae6c682e790.JPG)

Ví dụ 2: Tìm dòng chứa chuỗi "eth" hoặc "wifi" trong lệnh ifconfig:

`$ ifconfig | grep -E "eth|wifi"`

Ở ví dụ này ta dùng option -E để dùng extend regex, nó sẽ thông dịch | là 1 ký tự đặc biệt chứ không phải là 1 text. Cách khác để viết câu lệnh trên:

`$ ifconfig | grep "eth\|wifi"`

![](https://images.viblo.asia/f6381929-d0d3-4746-9f1b-78c6b3809a93.JPG)

Hai câu lệnh trên đều ra cùng 1 kết quả, ở câu lệnh thứ 2 ta dùng ký tự escaping để vertical bar có hiệu lực.

Ví dụ 3: Lọc các dòng IP có chứa 192.168.x.x trong lệnh ifconfig:

$ ifconfig | grep -E "^ *inet addr:192\.168\."

![](https://images.viblo.asia/a327b890-482d-41f4-8e24-a7b302c6b0f4.JPG)

-----

### 1.3. SED:

Lệnh **sed** thay đổi trực tiếp nội dung, gửi những nội dung đã thay đổi ra stdout. Công thức của **sed** có 2 dạng:

> sed [options] -f script-file [input-file]
> sed [options] script-text [input-file]

Trong đó: 

* input-file là tên file bạn muốn chỉnh sửa (Thay đổi chỉ mang tính chất tạm thời)

* script-text (hoặc nội dung trong script-file) là 1 dãy các lệnh mà bạn muốn sed thực hiện

Một số các lệnh trong sed:



| Command | Tham chiếu | Ý nghĩa |
| -------- | -------- | -------- |
| =     | 0 hoặc 1     | thể hiện số thự tự dòng hiện tại    |
| a\text     | 0 hoặc 1      | chèn thêm đoạn text vào cuối file    |
| i\text   | 0 hoặc 1      | thêm đoạn text vào file     |
| r *filename*     | 0 hoặc 1      | chền thêm đoạn text từ *filename* vào file     |
| c\*text*     | phạm vi     | Thay thế phạm vi những dòng được chọn bằng *text*     |
| s/regexp/*replacement*    | phạm vi     | Thay thế các text khớp với regex bằng *replacement*    |
| w filename     | Phạm vi     | Viết khuôn mẫu hiện tại vào file được chỉ định     |
| q     | 0 hoặc 1      | Ngay lập tức thoát khỏi script và in ra khuôn mẫu hiện tại     |
| Q     | 0 hoặc 1     | Ngay lập tức thoát khỏi script   |

Ví dụ: ta có đoạn text cal2018.txt

> 01/01/2018
> 01/02/2018
> 01/03/2018

Giờ ta muốn thay tất cả số 2018 trong đoạn text trên thành 2019 ta làm như sau:

`$ sed 's/2018/2019' cal2018.txt > cal2019.txt`

![](https://images.viblo.asia/fdcd2e5f-2350-4e8d-8a33-c9c01f4f08a4.PNG)

Nếu 1 dòng xuất hiện nhiều hơn 2 chuỗi trùng khớp thì ta phải dùng **global search**  bằng cách thêm option **g** vào câu lệnh

`$ sed 's/2018/2019/g' cal2018.txt > cal2019.txt`

![](https://images.viblo.asia/4eb61e87-b131-4a93-9b2d-356351459df6.JPG)

Vậy là chúng ta đã kết thúc chương 1 của LPI-C1 rồi đấy, không quá khó phải không các bạn, sắp tới mình sẽ không đi theo thứ tự chương mà nhảy ngay tới các chương khác hấp dẫn hơn, tính ứng dụng cao hơn để phục vụ cho công việc các bạn nhớ đón xem nhé.