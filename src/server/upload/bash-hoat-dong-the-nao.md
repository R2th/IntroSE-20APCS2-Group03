Cùng tìm hiểu cách shell script hoạt động để tiết kiệm thời gian của bạn và giảm lỗi
# 1. Giới thiệu 
Bash được tạo ra bởi Brian Fox và phát hành vào năm 1989 như là một mã nguồn mở thay thế cho Bourne Shell xuất hiện vào năm 1976. Tên của nó là từ viết tắt của Bourne Again SHell. Nếu bạn đã sử dụng khá nhiều ngôn ngữ lập trình khác, Bash (và shell script nói chung) có thể không trực quan lắm. Cú pháp là không lưu, các biến là lạ, phạm vi là một scop rộng và control flow dường như không bao giờ làm những gì bạn nghĩ nó làm.

shell scripting hầu hết chúng ta viết hiện nay là phiên bản Bash Mac và Linux sử dụng cho trình giả lập terminal trong /bin/bash.
Nên đặt #!/Bin/bash ở đầu tệp để xác định rằng tập lệnh shell nên sử dụng tập lệnh đó chứ không phải bất cứ điều gì khác.

# 2 . Cú pháp
Cú pháp được nới lỏng như trong một số ngôn ngữ mà cú pháp không nghiêm ngặt: bạn có thể sử dụng dấu chấm phẩy ở cuối dòng nếu bạn muốn và thụt lề là không vấn đề. Nhưng cú pháp rất quan trọng và rất cụ thể. Ngoài ra, lỗi cú pháp Bash là tồi tệ nhất.
Nó đặc biệt quan trọng để sử dụng chính xác space và dấu chấm phẩy.

Những lỗi này có thể gây ra các lỗi khó hiểu như "[grep isn’t a valid command]" khi bạn quênspace trong một trong những [] hoặc "[Unexpected end of file]" khi bạn quên dấu chấm phẩy trong một trong những {}.

Khi khai báo một biến, đặt một khoảng trắng giữa biến, dấu bằng và giá trị sẽ có nghĩa là một cái gì đó hoàn toàn khác nhau. Có một sự khác biệt rất quan trọng giữa dấu ngoặc đơn và dấu ngoặc kép.
# 3. Cấu trúc
Shell scripting cũng có có luồng điều khiển cơ bản: if...else, while loop, for loop, case,...
Những gì khác nhau trong điều kiện và phạm vi. Tuy nhiên, vì nó thiên về các dòng đơn và tập lệnh một lần, nên các cấu trúc này không được sử dụng thường xuyên như trong các ngôn ngữ khác. Dưới đây, một ví dụ về một line sử dụng luồng điều khiển mà không có bất kỳ câu lệnh if nào:
```
tac ~/error.log \
| grep -m1 -E "Error|Running restart" \
| grep -q "Error" \
&& echo "Found error since last restart"
```
(\ Là các phần tiếp theo dòng, tac giống như cat nhưng xuất ra tệp ngược.)
Nó không được đẹp lắm nhưng hiệu quả và minh họa những điểm mạnh và điểm yếu của shell script.
# 4. Một luồng là gì? Lệnh là gì?
Mỗi lệnh là một chương trình làm một việc. Grep, ví dụ, tìm kiếm mọi thứ và trả về dòng. Một truy vấn đi vào, tập tin đi vào, dòng đi ra.
Các đầu vào và đầu ra này được chuyển từ lệnh này sang lệnh khác dưới dạng luồng văn bản. Có ba nơi những dòng này đi và đến từ:
* stdin: Đầu vào tiêu chuẩn. 
* stdout: Đầu ra tiêu chuẩn. 
* stderr: Đầu ra lỗi tiêu chuẩn.
Nó là một luồng vì nó là đầu ra tại các điểm khác nhau trong quá trình thực thi lệnh / chức năng, thay vì tất cả ở cuối như bạn nghĩ.
Bạn gửi văn bản đến đầu ra chuẩn bằng các lệnh như printf và echo. Một trình biên dịch shell thiếu kinh nghiệm có thể nghĩ về chúng như các công cụ ghi nhật ký đơn giản để gỡ lỗi như với Python hoặc JavaScript. Các luồng cho phép các lệnh và hàm được nối với nhau thành một chuỗi mã. 
# 5. Chuyển hướng luồng
Về cơ bản 
* | được gọi là pipe và bạn sử dụng nó để gửi đầu ra cho các lệnh khác. Ví dụ: chúng ta có thể thử hello | grep 'Hello'. Điều đó sẽ gửi tất cả đầu ra của hello đến grep, nó sẽ trả về các dòng có chứa "Hello" . Lệnh sử dụng hàng ngày yêu thích của tôi cho pipe là history | grep "comnad" khi tôi quên lệnh chính xác mà tôi đã gõ trước đó nhưng tôi biết nó có một từ nào đó trong đó.
* > với một tệp ở bên phải sẽ chuyển hướng đầu ra và in nó thành một tệp thay vì đến console. Các tập tin sẽ được ghi đè hoàn toàn bởi>. Ví dụ, logging_function > tmp_error.log. Nếu bạn thích Python, bạn có thể đã sử dụng pip freeze> requirements.txt.
* >> giống như> nhưng gắn vào một tệp thay vì thay thế hoàn toàn nội dung của nó
* <là ngược của>. Nó sẽ gửi nội dung của một tập tin bên phải tới một lệnh bên trái.  grep foo < foo.txt.

Pipe  chạy song song. Ví dụ: các mục sau sẽ chỉ chạy trong một giây:
```
sleep 1 | sleep 1 | sleep 1 | sleep 1 | sleep 1
```
Các thành viên của một pipe sẽ thực hiện lệnh tiếp theo trong hàng chờ khi trước đó hoàn thành.
# 6 Câu lệnh
```
if [ <expression> ]; then
<commands>
fi
```
Chú ý cách bạn kết thúc câu lệnh if với fi?
Nó giống như vậy cho câu lệnh trường hợp là tốt; trường hợp case.. .esac. Khi tôi học được điều này, tôi thực sự hy vọng rằng while sẽ  kết thúc với elihw và until với litnu nhưng những điều này, chỉ kết thúc với việc done.

[ là một lệnh và ] là một đối số cho biết nó ngừng chấp nhận các đối số khác. Then, else, elif và fi đều là từ khóa.
```
/bin/sh: 1: [: true: unexpected operator
```
Điều mà thực sự xảy ra là lệnh [ có một đối số không mong muốn: true. Lỗi thực sự là do  đã sử dụng == thay vì = được ước tính 
true 

nguồn: https://medium.com/better-programming/how-bash-works-8424becc12f3