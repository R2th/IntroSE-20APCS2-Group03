Không chỉ khi code mà cả trong cuộc sống chúng ta gặp rất nhiều vấn đề từ nhỏ đến lớn. Vậy chúng ta giải quyết những vấn đề đó có nhanh gọn và hiệu quả không?. Hôm nay tôi muốn chia sẻ cùng các bạn cách tôi học được cách giải quyết vấn đề sau khi đọc được một [bài viết](https://medium.freecodecamp.org/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2) rất hữu ích.

### Tại sao học cách giải quyết vấn đề lại quan trọng
Bình thường khi có một **bug** xuất hiện phản xạ thường gặp là nghĩ ngay cách **hotfix** bug đó  và bằng một điều kì diệu nào đó qua **vài lần** thì **bug** đó đã được fix mà không rõ nguyên do vì sao nó lại xảy ra. Và chúng ta cứ lặp lại 3 bước tuần hoàn:<br>
1. Cố gắng thử một cách giải quyết bật ra đầu tiên trong đầu
2. Nếu không được, tiếp tục nghĩ ra cách mới và thử
3. Nếu vẫn chưa giải quyết được, lặp lại bước 2 cho đến khi bằng một cách **vi diệu** nào đó mà vấn đề được giải quyết.

Đó là cách tôi trước đây thường dùng khi gặp một **bug** hay **task** nào đó. Và hệ quả là mất rất nhiều thời gian để giải quyết bug đó và sau rất nhiều lần fix bug như vậy tôi cảm thấy rất **mệt,  stress và không học thêm được nhiều điều mới**. 

<br>

Và trong một lần khi đang dạo quanh các trang blog, diễn đàn tôi đã tìm được một [topic](https://medium.freecodecamp.org/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2) viết về cách giải quyết vấn đề.

> The biggest mistake I see new programmers make is focusing on learn syntax instead of learning how to solve problem - V.Antol Spraul. 

Vậy làm như thế nào mới là cách giải quyết vấn đề một cách đúng đắn?.
### Làm như thế mới giải quyết vấn đề có hiệu quả

#### Step 1. Hiểu rõ được vấn đề
Hầu hết các vấn đề khó mà chúng ta không giải quyết được là do chúng ta chưa thực sự **hiểu** được nó.<br>
**Hiểu** thực sự ở đây là chúng ta có thể giải thích một cách ngắn gọn vấn đề cho người khác hiểu. Chứ không phải là sau khi nói xong ngẫm chính mình không hiểu mình vừa nói cái gì :sweat_smile::sweat_smile::sweat_smile:.<br>
> If you can't explain something in single term, you don't understand it - Richard Feynman

Hãy viết ra giấy, vẽ hình ảnh để tái hiện lại vấn đề hoặc nói vấn đề với bạn bè (một vài người dùng **rubber duck**). Từ đó chúng ta có thể có cái nhìn đa chiều với vấn đề cần giải quyết.
#### Step 2. Đặt ra một kế hoach cụ thể
Khi nhận được tasks, đừng nhảy ngay vào việc code. Hãy đặt viết ra mindset của mình và liệt kê ra các bước để ra được kết quả mong muốn.<br>
Ví dụ chẳng hạn như khi chúng ta nhận được task xuất thông tin đơn hàng ra file excel. Đầu tiên chúng ta phải xét xem input của chúng ta là gì, sau đó là các bước để tương tác với input đó như thế nào và cuối cùng là trả về output là file excel cần thiết. 
#### Step 3. Chia nhỏ vấn đề
Khi nhận được 1 task nhất là những task lớn, không nên nhảy ngay vào làm luôn mà hãy chia nhỏ task đó ra thành những task con và sau khi làm xong hết các task con đó thì task lớn cũng được làm xong giống như *xếp hình* vậy.:laughing::laughing::laughing:.

Hãy tưởng tượng khi nhận được một task lớn từ sếp và làm mãi không xong thì rất dễ cảm thấy nhanh nản. Nhưng khi chia nhỏ task đó thành các task nhỏ hơn, mỗi khi làm xong một task nhỏ không chỉ tiến gần hơn đến việc hoàn thành xong task lớn mà chúng ta còn cảm thấy mình làm việc có một chút thành tựu nho nhỏ tạo thành động lực giúp làm việc có hiệu quả hơn. Cũng không nên chia task quá nhỏ mà hãy chia task sao cho độ khó của task cao hơn trình độ của mình tại thời điểm đó một ít.

Đây là bước **quan trọng nhât** và cũng là nền tảng để chúng ta giải quyết vấn đề.
#### Step 4. Làm quen với bế tắc
Đời không như mơ, chúng ta thực hiện đủ các bước trên nhưng vẫn không giải quyết được vấn đề thậm chí là những vấn đề con?

Hãy làm quen với điều đó vì nó không chỉ xảy ra với một mình bạn!

Điều làm nên một người lập trình tuyệt vời là tò mò về **bug** như tại sao nó lại xảy ra, xử lí nó như thế nào, xử lí như vậy đã tối ưu chưa có ảnh hưởng đến phần khác không,... chứ không phải cảm thấy việc **fix bug** là một gánh nặng.

Có 3 điều có thể làm khi đôi mặt với 1 **bug**:<br>
 - **Debug:**  Lần lại từng bước để tìm ra nguyên nhân.<br>
  >  The art of debugging is figuring out what you really told your program to do rather than what you thought you told it to do.”” — Andrew Singer.

- **Đánh giá lại:** Hãy thử nhìn lại bug đó với một góc nhìn/cách nhìn khác. Hoặc xóa toàn bộ phần đó đi và *yêu lại từ đầu*.:rofl::rofl::rofl:
- **Hỏi người khác:** Đừng ngại việc hỏi hỏi từ người khác những kinh nghiệm, cách xử lí vấn đề vì ai cũng có lúc bắt đầu. Có rất nhiều cách như lên tra *google, stackoverflow* hay cũng có thế học hỏi từ chính những đồng nghiệp bên cạnh mình. **Hỏi đi đừng ngại =)).**
### Tổng kết 
Qua bài viết trên, tôi muốn chia sẻ với các bạn một trong rất nhiều cách đề các bạn có thể áp dụng khi gặp vấn đề không chỉ khi code mà còn trong cuộc sống.<br>
Và điều quan trong nhất là hãy **luyện tập** thật nhiều làn và không ngừng nghỉ và đến lúc nhìn lại chúng ta không còn thấy khó như lúc ban đầu.

*Good luck and happy coding!*