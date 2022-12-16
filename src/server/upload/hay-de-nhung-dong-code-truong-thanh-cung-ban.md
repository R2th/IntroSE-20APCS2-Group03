# 1. Thay đổi View của bản thân (Thinking out of box)
Mỗi người trong chúng ta khi gặp một vấn đề hay bài toán đều có cái View nhận thức vấn đề khác nhau. Nếu cái View của bạn thực sự không tốt hoặc đang bị gò bó bởi những sự dập khuôn hay quá bài bản theo sách vở đôi khi sẽ khiến vấn đề trở lên rắc rối và phức tạp hơn.
Ví dụ chúng ta có bài toán như sau:
> Tính tổng các số nguyên từ 1 đến n

Đây là những bài toán kinh điển mà chúng ta ắt hẳn ai cũng đã từng gặp qua. Khi còn ngồi trên giảng đường đại học, chúng ta được hướng dẫn giải bài dạng trên đại loại sẽ có 2 cách cơ bản như sau:
```
// Sử dụng vòng lặp for
  $sum = 0;  
  for ($i = 1;  i <=  $n; $ i++) 
   $sum += $i;
 }

// Sử dụng đệ qui.
function sum($n) 
{
   if ($n === 1) {
      return  1;
   } 
   return  $n + sum($n-1);
}
```
Hầu hết trong chúng ta khi tìm được lời giải cho 1 vấn đề, thì thường chẳng bao giờ tìm tòi thêm cách giải khác cho vấn đề đó. Chính những suy nghĩ như vậy đã làm cho cái VIEW của chúng ta trở nên hẹp lại, khiến chúng ta ngày càng không thể giải quyết vấn đề một cách đơn giản được.
> Triết lý YAGNI. (You Aren’t Gonna Need It -  Bạn sẽ không cần nó nếu bạn chưa thực sự cần nó

Nếu chúng ta nghĩ một vấn đề đơn giản thì vấn đề đó sẽ đơn giản, còn khi chúng ta nghĩ nó phức tạp thì nó sẽ cực kì phức tạp. Ở ví dụ trên, chúng ta đang phức tạp hóa bài toán bằng cách sử dụng đệ qui, đây là điều không thực cần thiết. **Đừng phức tạp mọi thứ lên!**

> Triết lý KISS (Keep it simple, stupid - Giữ cho nó đơn giản, đồ ngốc)

Nếu ta nghĩ vấn đề trên chỉ là bài toán áp dụng công thức cấp số cộng đơn giản và sử dụng công thức cấp số cộng (https://vi.wikipedia.org/wiki/C%E1%BA%A5p_s%E1%BB%91_c%E1%BB%99ng#T%E1%BB%95ng), thì có lẽ bài toán trên đơn giản đi rất nhiều.
```
// Cấp số cộng
$sum = $n*($n+1)/2;
```

# 2. Trở nên giỏi hơn bằng cách không code
Chúng ta sẽ không thể giỏi hơn nếu chỉ cắm mặt vào code. Chúng ta nên dành thời gian phát triển đều các kĩ năng khác. Hãy phát đều các kĩ năng của bản thân bao gồm cả các kĩ năng như tìm kiếm từ khóa, hay các kĩ năng mềm khác. Hãy học cách quan sát mọi thứ xung quanh, việc code tuy khá quan trọng nhưng không phải là tất cả. Nó cũng chỉ là một trong toàn bộ quy trình sản xuất phần mềm.

> “Một lập trình viên giỏi là một người luôn luôn nhìn cả hai phía trước khi băng qua con đường một chiều.” ~ Doug Linder

# 3. Review code nguồn kinh nghiệm vô giá
Một công việc vô cùng nhàm chán đó phài đi review code của người khác. Có lẽ đây là một suy nghĩ sai lầm mà nhiều người mắc phải.
> Muốn code giỏi thì hãy đọc code của người khác

Chúng ta có thể học hỏi kinh nghiệm cũng như những cái View hay hoặc dở của những người xung quanh ta. Chúng ta có thể tiếp thu những cái hay của người khác, và rút ra kinh nghiệm từ những cái dở của họ. Việc reivew code có thể nhàm chán, nhưng kiến thức và kinh nghiệm thu được thì vô cùng quý giá. Việc review code không chỉ thể hiện trách nhiệm mà còn thể hiện tinh thần teamwork giúp đỡ và góp ý cho nhau cùng tiến bộ.

# 4. Đừng bao giờ so sánh mình với những người khác
Mỗi người trong chúng ta có một khả năng lập trình khác nhau và mỗi người đều đặc biệt. Sẽ có những người có những khả năng thiên bẩm hơn những người khác, lại có những người chăm chỉ cần mẫn với công việc. Không ai là không mắc sai lầm bao giờ cả, vì thế hãy cứ cố gắng, hãy cứ đam mê, miễn sao khi code bạn cảm thấy vui. 

>  “Bất kỳ thằng ngốc nào cũng có thể viết code để một chiếc máy tính có thể hiểu được. Nhưng một lập trình viên giỏi thì viết code để những người khác có thể hiểu được.” ~ Martin Fowler

Trên đây là một vài chia sẻ kinh nghiệm để chúng ta có thể tiến bộ hơn trong công việc. Mỗi người rồi sẽ tìm ra được những con đường đi phù hợp cho bản thân mình.

> Lập trình viên cũng như làm tình. Một bước sa chân sẽ khiến bạn chịu trách nhiệm cả đời.