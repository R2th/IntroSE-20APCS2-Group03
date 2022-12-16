Comment là một điều cần thiết khi viết code nhưng lại thường không được coi trọng và hiểu sai. Trong cuốn sách Clean Code của Robert C.Martin có nói rằng: comment là không cần thiết bởi bản thân code đã tự mô tả chính nó rồi. Tuy nhiên, có một lý do để không đồng tình với ý kiến trên là: Code có thể trả lời câu hỏi như thế nào nhưng nó không thể trả lời câu hỏi tại sao. Khả năng truyền tải giao tiếp của code là không thể hoặc không chính xác. Bài viết dưới đây sẽ trình bày về những điều nên và không nên khi viết comment.
# Good comments
##  Là những comment trả lời cho câu hỏi tại sao
```
/*
  We had to write this function because the browser 
  interprets that everything is a box
*/
```
Đoạn comment trên không mô tả code sẽ làm gì và những tác vụ diễn ra làm sao. Nhưng nếu có một phương án tốt hơn để viết lại hàm hiện tại thì chúng ta có thể tự tin rằng đoạn code mới sẽ là một giải pháp cho cùng một vấn đề theo một phương thức khác.

Bởi vậy, việc bảo trì sẽ được giảm thiểu đáng kể. Khi viết code mới, comment cũng không nhất thiết phải cập nhật lại. Chúng ta cũng có thể nhanh chóng xác định việc viết lại code có cần thiết hay không thay vì mất thời gian phân tích lại toàn bộ trên mỗi bước.
## Khai báo cụ thể những thứ không dễ hiểu đối với người đọc bình thường
Nếu nhìn vào một đoạn regex rất dài, bạn có thể mường tượng ra nó đang làm gì không? Nếu có, bạn đang thuộc vào một bộ phận thiểu số và điều đó có thể đúng với thời điểm hiện tại nhưng chưa chắc bạn có thể hiểu ở vài năm sau đó.
Bạn đã bao giờ gặp những đoạn browser hack như này chưa?
```css
.selector { [;property: value;]; }
```
```javascript
var isFF = /a/[-1]=='a';
```
Đoạn code đầu tiên nhắm tới các phiên bản Chrome ≤ 28, Safari ≤ 7, Opera ≥ 14. Đoạn code thứ 2 dành cho Firefox phiên bản từ 2-3. Để tránh việc những người bảo trì về sau hiểu sai thì việc comment những đoạn code trên là cần thiết hơn bao giờ hết. Đặc biệt chúng ta có thể loại bỏ những đoạn code này khi không phải hỗ trợ các trình duyệt đó nữa hoặc lỗi của trình duyệt đã được sửa.
## Những thứ rõ ràng và dễ hiểu với người này không phải lúc nào cũng tương tự với người khác
“Ai thông minh? Chúng ta! Ai viết code gọn gàng? Chúng ta! Chúng ta không phải viết comment, nhìn code mới rõ ràng và dễ hiểu làm sao”. Vấn đề của lối suy nghĩ này là mặc định chúng ta đều phải có kiến thức sâu rộng về những lĩnh vực khác nhau. Trong một nhóm mà trình độ của mỗi người là ngang hàng nhau thì nó sẽ không phải là vấn đề quá to tát. Nhưng trên thực tế không phải vậy. Quy mô của nhóm tỉ lệ thuận với sự chênh lệnh về trình độ cũng như lĩnh vực nền tảng giữa các thành viên.
## Comments cũng giống như những chương sách
Sẽ rất khó để đọc lướt qua một cuốn sách được viết theo kiểu cộng dồn thay vì chia nhỏ thành từng phần. Những đoạn comment sẽ giúp chúng ta lướt qua nhanh tới những phần tương ứng và quan trọng nhất.

Càng chia nhỏ bao nhiêu, quản lý càng dễ dàng bấy nhiêu. Việc nhanh chóng nắm bắt được những phần quan trọng có thể làm tăng năng suất công việc.

## Tránh những comment chỉ phù hợp trong lúc đang viết code
Khi muốn tập trung vào một logic nào đó, bạn có thể viết comment như sau:
```javascript
// get the request from the server and give an error if it failed
// do x thing with that request
// format the data like so
```
Tuy nhiên, điều này sẽ gây ra một vấn đề đối với người đọc sau này. Đoạn comment trên dường như lặp lại những gì đoạn code đang làm, buộc người xem phải đọc cùng một nội dung theo hai cách khác nhau. Do đó, chúng ta nên xem lại những comment như này sau khi đã hoàn thành việc viết code và thay thế bởi những comment giải thích tại sao đoạn code này là cần thiết.
## Comment những đoạn code cần refactor
Có những tình huống bạn cần viết những đoạn code tạm thời hoặc đoạn code test không quan trọng (cho kịp deadline chẳng hạn) thì những việc comment kiểu như sau lại trở nên hữu ích:
```javascript
// this isn't my best work, we had to get it in by the deadline
```
Người bảo trì về sau sẽ không mất quá nhiều thời gian để tìm hiểu tại sao lại viết code tạm bợ đến như vậy. Thay vào đó, sẽ ngay lập tức tập trung vào việc refactor ra làm sao. Tuy nhiên comment kiểu này không nên bị lạm dụng như một phương án dự phòng.

## Comment như một công cụ để học hỏi
Thay vì phải hỏi trực tiếp người viết code, comment sẽ cung cấp những thông tin cần thiết đối với những người đang mới tìm hiểu về lĩnh vực hiện tại.
## Comment những đoạn code tham khảo từ bên ngoài
Bạn đã bao giờ copy paste một đoạn code từ Stack Overflow và chỉnh sửa theo nhu cầu của riêng mình chưa? Đó không phải là một điều nên làm nhưng hầu như chúng ta đã từng như vậy. Việc đặt đường link của bài post vào phần comment sẽ có những lợi ích nhất định.

Mỗi người đều có phong cách viết code và giải quyết vấn đề khác nhau. Về sau này, bạn có thể sẽ muốn thay đổi hướng tiếp cận vấn đề khác so với những gì bạn đã tham khảo. Đồng thời, bạn cũng có thể dễ dàng quay trở lại bài post để xem những phản hồi mới về đoạn code và thậm chí sẽ tìm được một phương án tốt hơn.
# Bad comments
Xem xét ví dụ dưới đây:
```javascript
// if foo equals bar ...
if (foo === bar) { 

} // end if
```
Đoạn comment trên là thừa thãi. Bởi nó không cung cấp thêm thông tin gì, mà thực tế lại khiến người đọc phải xử lý một nội dung theo hai cách khác nhau. Điều này xảy ra khi chúng ta không hiểu hoàn toàn những việc mình đang làm hoặc lo lắng thái quá về việc đọc lại code sau này. Vì bất cứ lý do gì, chúng ta cũng cố gắng nên nhìn lại code và comment dưới góc độ của một người đọc thay vì của chính tác giả.
## Comment không được cập nhật khi bảo trì
Comment sai còn tệ hơn không có comment. Việc comment mô tả sai nội dung của đoạn code bên dưới sẽ gây ra những tác hại khó lường. Do đó, mỗi khi có thay đổi trong các lần bảo trì, comment cũng nên được cập nhật theo.
Vấn đề sẽ có thể đơn giản hơn nếu comment chỉ tập trung vào câu hỏi tại sao thay vì câu hỏi làm như thế nào. Xem xét ví dụ sau:
```javascript
// we need to FLIP this animation to be more performant in every browser
```
Dù sau này có đổi tên hàm từ `getBoundingClientRect` sang `getBBox()` thì đoạn comment trên vẫn áp dụng được. Hàm mới có cùng một mục đích nhưng phần chi tiết như nào đã được thay đổi.
## Sử dụng tên hợp lý thay vì comment
Có trường hợp tên biến chỉ có một chữ cái và được giải thích bằng comment. Điều này là không nên. Bởi việc sử dụng biến hoặc tên hàm có thể lặp lại ở nhiều nơi. Do đó bản thân tên biến/hàm nên đặt rõ ràng và ý nghĩa thay vì lạm dụng comment.
## Comment được sử dụng như cái cớ cho việc viết code không hợp lý ngay từ đầu
Khi đoạn code trở nên khó hiểu và comment là cách để làm rõ và giải thích vấn đề thì chương trình bạn đang viết cần xem xét lại. Việc không comment hay ỷ lại vào comment đều là những điều nên tránh khi viết code. Luôn đặt mình vào cả vị trí người viết lẫn người đọc khi viết code sẽ giúp chúng ta xác định được những thông tin nào là cần thiết để mang lại năng suất làm việc cao nhất.
### *Lược dịch*
**SARAH DRASNER**, *The Art of Comments*, https://css-tricks.com/the-art-of-comments/