# 1. Giới thiệu
Regex (regular expressions ) là một mẫu kết hợp giữa các kí tự đánh dấu hoặc có cả kí tự thông thường.

Regex dùng để tìm kiếm, kiểm tra việc so khớp - match với một chuỗi kí tự xác định dựa vào dạng thức cuả nó.

Với những trường hợp đơn giản, chúng ta có thể sử dụng các function xử lí chuỗi thông thường của ngôn ngữ lập trình kiểu như split, indexOf, include ,.... Thế nhưng với chuỗi phức tạp và đặc biệt có tính tùy biến cao thì có lẽ sử dụng Regex là lựa chọn cực kì thỏa mãn :v: 

Có điều sẽ khó khăn với những người chưa biết và không có đủ kiên nhẫn để học về nó trước khi sử dụng, nhìn hơi loạn thị nữa. Theo cá nhân mình thì để sử dụng được mà không cần trợ giúp của người khác thì cần đọc + hiểu + nhớ cỡ 7 -> 8 phần tài liệu về nó, rồi những thứ rắc rối sẽ ít va phải chúng ta hơn :)

# 2. Thành phần của Regex
Như đã nói ở trên thì regex có chứa 2 loại là kí tự đặc biệt (kí tự được quy định dùng để tạo ra các luật cần tuân theo) và kí tự thông thường. Có thể tạo ra nó với chỉ 1 trong 2 loại này hoặc kế hợp cả 2.
Định nghĩa nó như sau:
```
/regex_parttern/
```
Ví dụ: /^anhyeuem[Hoa|Anh|Hang|Diep|NgocTrinh|ThanhThanh].*/

Chú ý là không cần dấu nháy string 2 đầu đâu nhé !
# 3. Một vài kí tự đặc biệt và ý nghĩa của chúng

Nói thêm 1 chút là trong đây, khái niệm kí tự và cụm kí tự là tương đối. Khi lồng ghép biểu thức tạo thành nhiều phân lớp thì 1 cụm cụ thể nào đấy cũng có thể coi như 1 đơn vị để những kí tự đặc biệt nằm bên ngoài khối đó sử dụng.
| Kí tự/Cụm kí tự | Ý nghĩa |
| -------- | -------- |
| \   | Với nó, mọi kí tự theo ngay sau đều được coi là kí tự thường cho dù kí tự đó có đặc biệt hay không.  Ví với những kí tự đặc biệt như  +, ?, * hay thậm chí cả chính nó đều bị coi là thường nếu viết thành thế này \\+, \\?, \\*, \\\|
| ^   | Với nó, luật yêu cầu tại ngay vị trí đó phải bắt đầu bằng cụm kí tự tương ứng (cụm này tính từ ^ cho đến kí tự đặc biệt tiếp theo). Ví như /^anhyeuem3000(0,?){0,}/   sẽ yêu cầu 1 chuỗi bắt đầu với "anhyeuem3000" và tùy ý rất nhiều số 0 phía sau  |
|[xyz]|Đây là 1 lớp kí tự, có thể dùng dấu - bên trong để biểu thị 1 dãy các kĩ tự kiểu số liên tiếp hoặc bảng chữ cái la tinh, nó chấp nhận mọi kí tự phù hợp theo mọi thứ tự. Ví dụ /[1-9]/ khớp "12456335" hay /[a-zA-Z1-9]/ khớp "bsw3r78ẠKHFs9hvs".|
| [^xyz]    | Ngược với bên trên thì ^ ở đây sẽ mang ý nghĩa phủ định khi nằm trong cặp ngoặc vuông. Nhóm phía sau không được phép xuất hiện, có thể là x hay y hay z nhưng không thể là xyz    |
| $    | So khớp cuối chuỗi, ngay trước kí tự xuống dòng. Băt buộc chuỗi phải kết thúc bằng cụm kí tự ngay phía trước $. Ví dụ /.*end$/ sẽ khớp với "backend"   |
|*    | Cho phép kí tự ngay phía trước nó lặp lại tùy thích. Ví dụ /yeu*/  có thể khớp "yeu" hoặc "yeuuuuuuuu". Dấu * tương đương viết {0,}  |
|+|Bắt buộc kí tự ngay phía trước nó lặp lại ít nhất 1 lần. Ví dụ /yeu+/ có thể khớp "yeuuuu" nhưng "yeu" thì không. Dấu + tương đương viết {1,}|
|?|Cho phép kí tự ngay trước đó lặp lại đúng 1 lần hoặc không lần nào, tương đương viết {0,1}. Các kí tự đặc biệt  *,+,? hay {} nếu bị theo sau bởi ? thì sẽ bị luật của ? đè lên|
|.|Khớp với bất kì kí tự đơn nào ngoại trừ kí tự xuống dòng|
|(x)|Ngoặc nhớ, cụm kí tự bên trong sẽ được ghi nhớ để dùng lại ở phần còn lại phía sau nó. Ví dụ /(anh)va(em)\1\2/ khớp với "anhvaemanhem, \1 lấy phần nhớ của (anh), \2 lấy phần nhớ của (em)|
|x(?=y)|Chỉ khớp với x nếu theo sau nó là y. Ví dụ \Naruto(?=Hinata)\ khớp với "NarutoHinata" chứ không khớp "Naruto" hay "NarutoSasuke"|
|x\|y|Khớp với chỉ x hoặc y mà thôi|
|{n}|Kí tự liền trước phải lặp lại n lần|
|{n,m}|Kí tự liền trước phải xuất hiện trong khoảng n đến m lần. nếu n khuyết thì hiểu là {0,m}, nếu m khuyết thì hiểu là {n, ∞}|
|\b|Kí tự biên. Nếu đặt kí tự này ngay đầu tiên như /\bo/ thì chuỗi phải bắt đầu với "o". Ngược lại để cuối biểu thức như /oo\b/ thì chuỗi phải kết thức là "oo"|
|\B|Khớp với kí tự theo ngay sau không phải là biên và đồng thời 2 bên của nó đều là kí tự hoặc không, bắt đầu và kết thức chuỗi không được xem là kí tự. Ví dụ, /\B../ khớp với 'oo' trong "moon", và /y\B./ khớp với 'yu' trong "yummy."|

# Kết
Hi vọng bài viết sẽ có ích vì mình đã cố gắng viết ngắn gọn và đầy đủ nhất có thể :v