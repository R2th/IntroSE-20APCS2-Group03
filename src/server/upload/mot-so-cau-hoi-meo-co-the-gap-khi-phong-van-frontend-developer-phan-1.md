Bạn đã bao giờ vào trang web yêu thích của mình và để ý đến cách mà trang web đó được bố cục như thế nào chưa? Các “button” sẽ “phản ứng” ra sao sau khi bạn click chuột vào đó? Và những điều tương tự như thế.
Tất cả điều này gói gọn trong Frontend Development. Thiết kế web là cách mà trang web đó nhìn như thế nào, bố cục ra sao, còn Frontend Development là làm sao để thực hiện hóa các bố cục đó.
Và dưới đây là một số câu hỏi "mẹo" có thể được nhà tuyển dụng dùng khi bạn đi phỏng vấn vào vị trí Frontend Development ( Mình sẽ gọi là FE Dev cho ngắn gọn nhé)

# 1. Khai báo <!DOCTYPE> trong HTML có tác dụng gì?
Khi code HTML, chúng ta thường khai báo <!DOCTYPE> trên đầu file, phía trước tag HTML. Vậy đã bao giờ bạn đặt câu hỏi là <!DOCTYPE> có tác dụng gì, và nếu không có nó thì code sẽ chạy như thế nào không?

Thực chất, <!DOCTYPE> không phải là một HTML tag. Mục đích là khai báo cho trình duyệt web nhận diện được phiên bản HTML nào đang được sử dụng, để biên dịch nội dung một cách thích nghi và hiển thị chính xác hơn. Nếu bỏ qua khai báo <!DOCTYPE> thì mỗi trình duyệt sẽ mặc định sử dụng phương pháp biên dịch khác nhau, có thể không tương thích với một vài thông số (specifications). Điều đó sẽ dẫn tới trang web của bạn không được hiển thị tối ưu trên máy tính của người dùng.

# 2. Phân biệt Class vs ID như thế nào trong CSS?
**ID là duy nhất**
ID hay index (chỉ số) được dùng để xác định một đối tượng duy nhất nào đó. Mỗi đối tượng chỉ có thể có một ID. Mỗi trang chỉ có thể có một đối tượng với một ID nào đó.

**Class không duy nhất**
Class dùng để chỉ một lớp các đối tượng có chung các thuộc tính. Nhiều đối tượng có thể thuộc trong cùng một class. Nhiều class có thể được áp dụng lên cùng một đối tượng.

# 3. Phân biệt toán tử “==” và “===” trong Javascript?
Hai toán tử này dễ bị nhầm lẫn gây ra bug trong ứng dụng nếu như Developer Javascript không nắm rõ chúng.
**Toán tử “==”:** so sánh một cách gượng ép và trả kết quả về true nếu các biến có giá trị như nhau mà không cần trùng kiểu dữ liệu. Ví dụ:

```
var a = “5”;

var b = 5;

if(a == b){ // Do something }
```

“a == b” như trên sẽ trả về true vì cùng giá trị là 5, do đó block code trong biểu thức điều kiện if sẽ được thực thi.

**Toán tử “===”:** tạm gọi là so sánh bằng tuyệt đối, nghĩa là toán tử này không chỉ so sánh các giá trị mà còn so sánh cả luôn kiểu dữ liệu của biến. Nếu không thỏa mãn cả 2 điều kiện trên thì chắc chắn kết quả trả về là false. Cùng với đoạn code trên, “a === b” chắc chắn sẽ trả về false vì chúng không cùng kiểu dữ liệu (biến a kiểu string, biến b kiểu number) mặc dù giá trị của chúng giống nhau.

# 4. "this" trong Javascript dùng để làm gì?
Khác với các ngôn ngữ lập trình hướng đối tượng khác, “this” trong JS là một từ khoá chứ không phải là một biến nào cả. Bạn không thể gắn giá trị trực tiếp cho this được cũng như chẳng thể nào delete nó đi.

Các đoạn code của JavaScript được xây dựng trong một ngữ cảnh nhất định. Các ngữ cảnh này lại được sắp xếp để thực hiện chương trình một cách tuần tự, vào một ngăn xếp (stack). Sau đó các ngữ cảnh sẽ được gọi ra thực thi dần cho tới hết, bắt đầu từ ngữ cảnh trên đỉnh của ngăn xếp.

Mỗi ngữ cảnh thực thi tương ứng với một ThisBinding có giá trị không đổi đại diện cho ngữ cảnh thực thi đó. Và từ khoá “this” sẽ bằng giá trị ThisBinding trong ngữ cảnh đang thực thi hiện thời. Như vậy this sẽ đại diện cho ngữ cảnh đang thực thi và nó cần được xác định lại tham chiếu khi ngữ cảnh thực thi thay đổi.

# 5. Đánh lừa bằng cách đặt tên function trùng với một function có sẵn của thư viện
Cái này miêu tả có vẻ khó hiểu, nhưng thực ra khi gặp một vài ví dụ sẽ hiểu được ngay nó là như thế nào. Đây cũng là một trong nhưng câu hỏi dùng để "đánh lừa" ứng viên

Ví dụ như trong jQuery chúng ta có một function là .add() - dùng để thêm thành phần vào thành phần đã có để cùng thực hiện một hành động cụ thể. Và câu hỏi mà chúng ta gặp phải sẽ là

```
Bạn sẽ làm thế nào để hàm này hoạt động?

add(2, 5); // 7
add(2)(5); // 7
```

Nó sẽ rất dễ gây nhầm lẫn cho những ứng viên hấp tấp và không bình tĩnh. Có thể bạn sẽ thắc mắc tại sao hàm add() trong jQuery lại được sử dụng như thế này.... Nhưng thực ra đây là một câu hỏi mẹo, và câu trả lời cũng cực kỳ đơn giản

Chúng ta sẽ khai báo một function add để thực thi 2 trường hợp này

```
// Trường hợp 1:
function add(x, y) {
  return x + y;
}

add(2, 5); // 7

// Trường hợp 2: 
function add(x) {
  return function(y) {
    return x + y;
  };
}

add(2)(5); // 7
```

# Lời kết
Trên đây là một số câu hỏi "lắt léo" mà nhà tuyển dụng có thể dùng để "chơi" chúng ta. Hy vọng bạn sẽ chinh chiến thành công với những cơ hội bạn xứng đáng có được!

tham khảo:
https://www.topitworks.com/blogs/interview-front-end/

https://github.com/h5bp/Front-end-Developer-Interview-Questions/tree/master/Translations/Vietnamese

Xem tiếp phần 2 tại [đây](https://viblo.asia/p/mot-so-cau-hoi-meo-co-the-gap-khi-phong-van-frontend-developer-phan-2-07LKXzBrlV4)