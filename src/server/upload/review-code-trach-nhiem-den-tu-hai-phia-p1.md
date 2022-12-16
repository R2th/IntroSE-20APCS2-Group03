![](https://images.viblo.asia/21d2fcc6-849c-4a6c-9bcb-cac479a2ef68.png)

Hi các bạn, cũng lâu rồi mới ngoi lên đây viết vài dòng tâm sự chia sẻ chuyện đời, chuyện dev. Không biết bác nào giống mình không, càng già càng ngại viết lách :smiley: 

Đây ra seri bài viết xung quanh vấn đề review code, rất mong các bạn đón đọc. Nói là seri, nhưng cũng chẳng có thứ tự, hãy tận hưởng nhé

- Phần 1: Trách nhiệm đến từ hai phía (P1)
- Phần 2: Trách nhiệm đến từ hai phía (P2)

Xuất phát từ tâm lý chung, mà phần lớn các dev đều có suy nghĩ là, thôi cứ code xong, đẩy PR cho ông senior nào đấy review, ổng comment, mình sửa, ezz game. Miễn sao mà code cho chạy đúng là được.

Chuẩn không cần chỉnh, mà chỉnh càng chuẩn. Nói chứ mình cũng 1 thời mang suy nghĩ như thế, chắc do là dev lâu nên tính xấu tích tụ, suy bụng ta ra bụng người. Không biết có bác nào như mình không? :sweat_smile: 

Thực tế thì, trách nhiệm cần đến từ 2 phía, cả từ tạo PR, và cả người review. Tại sao lại thế? Trước khi đi vào câu hỏi trên, hãy cũng mình ôn lại 1 số khái niệm cơ bản nhé.

## Tổng quan về review code

Đầu tiên, các bạn cũng mình lướt qua 1 vài khái niệm chính nhé

### Review code là gì?
![meme1.jpg](https://images.viblo.asia/ef0f10f6-b1d2-4cc1-950f-18f0f9719356.jpg)

- Là quá trình mà các lập trình viên xem xét và đánh giá code của một thành viên khác trong nhóm
- Đồng thời cũng là quá trình thảo luận, đưa ra những góp ý nhằm giúp các đoạn code thêm chất lượng hơn.

Đương nhiên rồi, qua 2 gạch đầu dòng nhỏ bên trên (hoặc chẳng cần :cry: ) Chúng ta có thể hiểu rằng, review code là 1 bước trong quá trình phát triển phần mềm, mà ở đó, chúng ta cùng xem xét 1 đoạn code, và làm cho nó tốt lên.

Vậy câu hỏi đặt ra ở đây, tại sao chúng ta lại thường xuyên mất thời gian vào đó?

### Lợi ích của review code
Review code có rất nhiều lợi ích, mình chỉ tóm gọn lại vài ý chính như sau:

**Về cá nhân:**
1. Nâng cao trình độ bản thân của mỗi cá nhân
2. Học cách truyền đạt và góp ý cho người khác, cũng như kiểm chứng lại kiến thức của chính mình.

**Về dự án:**
1. Các member nắm bắt được những gì diễn ra trong dự án
2. Là một bước quan trọng để giảm thiểu lỗi phát sinh
3. Đương nhiên, giúp cho **chất lượng của code** tốt lên => làm cho codebase tốt lên, chất lương dự án tốt hơn

## Trách nhiệm của PR author’s
Như đã trình bày ở trên với các bạn, trách nhiệm đến từ 2 phía, vậy PR author's cần làm điều gì để giúp ích cho việc review code diễn ra thuận lợi hơn.
 
### Cần có một description tốt
Đầu tiên, chúng ta cần hiểu rằng, PR cần được mô tả về những gì nó làm, và tại sao nó lại làm như thế. Nó sẽ được lưu lại, và sẽ được hàng trăm developer khác xem sau đó.

Các bạn nên nhớ và có ý niệm về việc mình không chỉ code cho 1 mình mình, không chỉ code cho 1 mình ông reviewer, mà là code cho các developer sau đó nữa - người mà có khi bạn còn chẳng biết là ai. Nên hãy hiểu rằng, từng PR, từng description sẽ là thông tin rất quan trọng để thông báo cho họ rằng, PR của mình làm cho spec A, B, C, ...

#### First Line
- Tóm tắt ngắn gọn về những gì đang thực hiện
- Câu hoàn chỉnh, được viết như một khẳng định
- Dưới nó nên là một break line

Dòng đầu tiên của PR nên là một bản tóm gọn lại những gì PR đnag thực hiện, nên có một break line ngay sau đó, giúp cho người đọc có thể nắm được ý chính nhanh nhất có thể

Cố gắng giữ cho dòng đầu tiên ngắn gọn, tập trung đi vào trọng tâm. Tránh dài dòng, vòng vo, hoặc quá tối nghĩa.

Ví du:
```
# Bad
Deleting filter in users

# Good
Delete filter in users
```

#### Body is Informative
Trái ngược với **first line** - ngắn gọn súc tích. Thì phần nội dung còn lại của description cần phải mô tả thông tin chi tiết và bao gồm bất ký thông tin bổ sung nào mà người đọc cần để hiểu tổng thể về PR.

Nó có thể bao gồm một mô tả ngắn gọn về vấn đề đang được giải quyết và lý do tại sao đây là cách tiếp cận tốt nhất. Nếu có bất ký thiếu sót vào đối với cách tiếp cận của bạn thì chúng cần được đề cập tới. Nếu được hãy note thêm các trạng thái trước đó như số bugs, kết quả benchmark, và link đến design documents.

Nếu bạn có đính kèm các link bên ngoài, hãy cân nhắc rằng chúng có thể không hiển thị với người đọc trong tương lai do nhiều lý do. Nếu có thể hãy cố gắng trình bày sao cho người đọc sau có thể hiểu được.

Cần chú trọng điều này ngay cả cho các PR nhỏ

#### Bad PR Descriptions
Dưới đây là một vài ví dụ về bad descriptions

> “Fix build.”
> 
> “Add patch.”
> 
> “Moving code from A to B."
> 
> “Phase 1.”
> 
> “Add convenience functions.”
> 
> “kill weird URLs.”
#### Good PR Descriptions
Dưới đây là một vài ví dụ về good descriptions

**Functionality change**
> rpc: remove size limit on RPC server message freelist.
> 
> Servers like FizzBuzz have very large messages and would benefit from reuse. Make the freelist larger, and add a goroutine that frees the freelist entries slowly over time, so that idle servers eventually release all freelist entries.

**Refactoring**

> Construct a Task with a TimeKeeper to use its TimeStr and Now methods.
> 
> Add a Now method to Task, so the borglet() getter method can be removed (which was only used by OOMCandidate to call borglet’s Now method). This replaces the methods on Borglet that delegate to a TimeKeeper.
> 
> Allowing Tasks to supply Now is a step toward eliminating the dependency on Borglet. Eventually, collaborators that depend on getting Now from the Task should be changed to use a TimeKeeper directly, but this has been an accommodation to refactoring in small steps.
> 
> Continuing the long-range goal of refactoring the Borglet Hierarchy.

**Small PR cũng cần có description hoàn chỉnh**

> Create a Python3 build rule for status.py.
> 
> This allows consumers who are already using this as in Python3 to depend on a rule that is next to the original status build rule instead of somewhere in their own tree. It encourages new consumers to use Python3 if they can, instead of Python2, and significantly simplifies some automated build file refactoring tools being worked on currently.


#### Generated PR descriptions
Hẫy cân nhắc đến việc generate tự động các description bằng cách sử dụng các tools. Bằng cách nào cũng nên tuân thủ các quy tắc ở bên trên.

#### Review the description before submitting the PR
Các PR có thể thay đổi đáng kể qua quá trình review, fix bug, ... Vì vậy, bạn nên xem lại description một lần trước khi submit PR, hoặc có bất kì commit gì đó thay đổi. Mục đích để đảm bảo rằng description mô tả đúng những gì PR thực hiện

### Tổng kết
Qua bài viết này chúng ta rút ra được những điều gì?
1. Trách nhiệm của PR đến từ cả 2 phía, đừng phụ thuộc, ỉ lại quá nhiều vào reviewer.
2. Mục đích chung của Review code là giúp cho codebase tốt hơn (đương nhiên là sẽ đi theo PR phải thực hiện đúng chức năng mong muốn)
3. Hãy có một description tốt.

Hãy chờ đón phần tiếp theo nhé. Nêu có bất kì thắc mắc gì cần giải đáp, hoặc góp ý cho mình, thì hãy comment ở dưới nhé. Cảm ơn các bạn đã đọc bài viết đến đây.
___
[@hoangpn - Better every day!](https://hoangpn.com)