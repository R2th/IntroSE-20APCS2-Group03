Theo trang Indeed, một trang web việc làm trên toàn thế giới của Mỹ về danh sách việc làm, kỹ năng giải quyết vấn đề là kỹ năng quan trọng thứ 4 cần có đối với một lập trình viên trên con đường tiến tới trở thành 1 lập trình viên giỏi.
Code thường được viết để giải quyết cho một vấn đề hoặc những vấn đề, Tôi muốn nói đến những vấn đề trong thế giới thực yêu cầu cần có những giải pháp, Trong phạm vi bài viết này Tôi không muốn nói đến những sai lầm trong code của bạn. Chắc hẳn tại một lúc nào đó, bạn đã gặp phải các vấn đề trong code của bạn, cách bạn giải quyết những vấn đề này không chỉ cho thấy mức độ kinh nghiệm của bạn với tư cách là một nhà phát triển (developer) mà còn nói lên định lượng về mức độ hiểu biết vấn đề đó của bạn.
Trong bài viết này, qua 4 bước tôi chia sẻ tiếp theo sẽ giúp bạn có được những cách giải quyết vấn đề giống như một chuyên gia thực thụ, bên cạnh đó cũng giúp chúng ta củng cố cho sự hiểu biết của mình bằng cách giải quyết một vấn đề trong thực tế.

# Hiểu vấn đề
> “If I had an hour to solve a problem I'd spend 55 minutes thinking about the problem and five minutes thinking about solutions.” -- Albert Einstein

![image.png](https://images.viblo.asia/718ecae3-5071-429a-9ab2-5cc2967effc4.png)
Đại ý kiểu như là: *Nếu tôi có một giờ để giải quyết một vấn đề, tôi sẽ dành 55 phút để suy nghĩ về vấn đề đó và năm phút để suy nghĩ về các giải pháp*

Hầu hết các vấn đề khó chúng ta gặp phải thực tế chỉ là khó vì chúng ta không hiểu chúng, hiểu một vấn đề chỉ đơn giản là bạn biết điều gì sai và cần phải sửa gì để cho nó đúng, một trong những cách để biết bạn có hiểu một vấn đề hay không là thử giải thích nó bằng những thuật ngữ đơn giản cho chính bạn hay nói 1 cách khác là nói theo cách dễ hiểu nhất mà bạn, đồng nghiệp có thể hiểu được.

Nếu bạn không thể giải thích vấn đề bằng những thuật ngữ đơn giản thì bạn chỉ đơn giản là đang không hiểu nó, để hiểu một vấn đề, hãy thử điều này;

* Đọc lại câu hỏi.
* Thử tìm kiếm các câu trả lời trên các công cụ tìm kiếm, diễn đàn, group,...
* Đặt câu hỏi liên quan.

Thử giải quyết vấn đề đơn giản dưới đây.

### Viết code với JavaScript cho bài toán sau:

> Nếu tuổi của bạn thì >= 18, sau đó in ra màn hình 1 chuỗi ''Tôi đủ tư cách bỏ phiếu"", (có thể sử dụng phương thức console.log()). Nếu không thì in ra 1 chuỗi "Tôi chưa đủ tư cách bỏ phiếu bởi vì tôi mới 2 tuổi, dưới mức điều kiện được bỏ phiếu". Thay thế "2" bằng tuổi hiện tại của bạn xem bạn có đủ tuổi bỏ phiếu?)

Chúng tôi thực hiện các nhận xét sau:
* Sử dụng "If" biểu thị một câu lệnh điều kiện.
* Lớn hơn hoặc bằng để biểu thị một toán tử logic.
* Chúng tôi được yêu cầu đăng nhập vào bảng điều khiển dành cho nhà phát triển.
* Khác nghĩa là gì ?; Trả lời - vì có một câu lệnh if nếu không có nghĩa là một câu lệnh khác.
* Chúng tôi được yêu cầu thay thế ''2 '' tuổi bằng tuổi hiện tại của bạn. 

Biểu diễn dưới dạng code có thể như sau với JavaScript:
```
/**
* age tuổi của bạn,
* ageAccept độ tuổi có thể bỏ phiếu
*/
function checkAgeCouldVote(age, ageAccept = 18) {
    let result = '';
    if (age >= 18) {
        result = 'Tôi đủ tư cách bỏ phiếu';
    } else {
        result = `Tôi chưa đủ tư cách bỏ phiếu bởi vì tôi mới ${age} tuổi, dưới mức điều kiện đủ ${ageAccept} được bỏ phiếu`;
    }
    return result;
} 

// check 2 tuổi
checkAgeCouldVote(2, 18);
// check tuổi của bạn
checkAgeCouldVote(20, 18)
```

# Phân chia và chinh phục

> A problem well stated is a problem half solved. -- John Dewey

![image.png](https://images.viblo.asia/f12f524f-b643-4783-902f-087f6470c755.png)

Một vấn đề được sáng tỏ là một vấn đề đã được giải quyết một nửa.

Đừng cố gắng giải quyết một vấn đề lớn cùng một lúc, hãy luôn chia nó thành các vấn đề con thay vào đó, bạn sẽ tiết kiệm được thời gian và sự căng thẳng và điều đó giúp vấn đề dễ giải quyết hơn rất nhiều. Điều này có vẻ giống với [nguyên lý SOLID ](https://toidicodedao.com/2015/03/24/solid-la-gi-ap-dung-cac-nguyen-ly-solid-de-tro-thanh-lap-trinh-vien-code-cung/)

Tiếp tục bài toán ở trên, ta có những suy nghĩ sau trong đầu:

* Xác định tuổi hiện tại của ta
* Xác định tuổi đủ điều kiện bỏ phiếu.
* Sử dụng các câu lệnh điều kiện if và else và ghi các chuỗi vào 1 biến kết quả.
* Sau đó thực hiện thay thế nếu tuổi của chúng ta vô hàm giống như này:

```
// check 1 người với 2 tuổi
checkAgeCouldVote(2, 18); cho ra kết quả là **Tôi chưa đủ tư cách bỏ phiếu bởi vì tôi mới 2 tuổi, dưới mức điều kiện đủ 18 được bỏ phiếu**
// check tuổi của bạn (ở đây tuổi của tôi là 20 tuổi)
checkAgeCouldVote(20, 18) -> cho ra kết quả là **'Tôi đủ tư cách bỏ phiếu'**
```

# Research

"Research is what I'm doing when I don't know what I'm doing." -- Wernher von Braun

![image.png](https://images.viblo.asia/200a11ba-939c-4626-aa70-8c2c2fe2527c.png)

Dù bạn có thừa nhận hay không, bạn không thể biết hết mọi thứ, và khi bạn thấy mình liên tục va phải một bức tường khó khăn, đó là lúc bạn nên nghỉ ngơi và nghiên cứu. Không có vấn đề gì bạn gặp phải mà người khác chưa gặp phải hoặc chưa giải quyết được.
Bạn sẽ quan tâm khi biết rằng một số lập trình viên mà bạn tìm kiếm là những nhà nghiên cứu giỏi. Phần lớn công việc bạn sẽ làm với tư cách là một lập trình viên là nghiên cứu, điều này không thể được nhấn mạnh quá mức.
Một điều bạn cần lưu ý khi nghiên cứu là bạn không tìm ra giải pháp cho một vấn đề ngay lập tức, đặc biệt khi giải quyết các vấn đề lớn hơn, hãy chia vấn đề thành các vấn đề phụ sau đó thực hiện nghiên cứu thử nghiệm của bạn. Ý tôi muốn nói là, khi chúng ta muốn nghiên cứu vấn đề mà chúng ta đã đưa ra trong bài này, nó sẽ như thế này;

* Làm thế nào định nghĩa biến trong câu lệnh javascript
* Làm thế nào viết cú pháp điều kiện trong javascript
* Làm thế nào để in ra 1 chuỗi ra màn hình console.log() 

# Thử nghiệm với mã giả (Write Pseudocode)

Pseudocode is the informal description of the actual code.

![image.png](https://images.viblo.asia/65803cdb-680b-4fee-b818-1b44a9212fb2.png)

# Kết

Bạn có thể xem thêm bài viết với phiên bản tiếng anh tại đây: https://therevealer.hashnode.dev/how-to-solve-coding-problems-like-a-pro#comments-list
và cài đặt tiện ích từ ** [daily.dev](https://daily.dev)** để cập nhật những bài viết mới nhất trong ngành. 
Cảm ơn sự quan tâm từ các bạn.