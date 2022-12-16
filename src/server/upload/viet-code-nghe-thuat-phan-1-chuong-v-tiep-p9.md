### Đặt mình vào vị trí của người đọc
Một kỹ thuật chung mà chúng tôi sử dụng trong cuốn sách này là tưởng tượng những gì code của bạn được nhìn như thế nào dưới con mắt của một người ngoài cuộc—một người không quen biết với dự án của bạn. Kỹ thuật này đặc biệt hữu ích để giúp bạn nhận ra những gì cần comment.
<br><br>
#### Dự đoán những câu hỏi có khả năng
![](https://images.viblo.asia/bf93b6ed-d8de-4e33-b504-5a91c844b3c6.png)
<br>
Khi người khác đọc code của bạn, có những phần có thể khiến họ nghĩ, *Hở? Việc này là sao?* Công việc của bạn là comment những phần đó.<br>
Ví dụ, hãy nhìn vào định nghĩa của *Clear()*:
```
struct Recorder {
 vector<float> data;
 ...
 void Clear() {
 vector<float>().swap(data); // Huh? Why not just data.clear()?
 }
};
```
Khi hầu hết các lập trình viên C++ nhìn thấy code này, họ nghĩ, *Tại sao anh ta không chỉ việc dùng data.clear() thay vì swap với một empty vector?* Thì ra, đây là cách duy nhất để buộc một *vector* giải phóng nó khỏi bộ cấp phát bộ nhớ. Nó là một chi tiết mà không phải ai cũng biết trong C++. Điểm mấu chốt là nó cần được comment:
```
// Force vector to relinquish its memory (look up "STL swap trick")
vector<float>().swap(data);
```
<br>

#### Nói về việc có thể dính "bẫy"
![](https://images.viblo.asia/e9f66022-a8c2-4c78-ac80-67d8929b18ff.png)
<br>
Khi viết tài liệu cho một function hoặc class, một câu hỏi hay để tự hỏi bản thân là, *Code này có gì ngạc nhiên? Làm thế nào nó có thể bị lạm dụng?* Về cơ bản, bạn phải “nghĩ xa” và dự đoán những vấn đề mà mọi người có thể gặp phải khi sử dụng code của bạn.<br>
Ví dụ: giả sử bạn đã viết một function gửi email đến một người dùng cho trước:
```
void sendEmail(String to, String subject, String body);
```
Việc sử dụng function này liên quan đến việc kết nối với một external email service, mà có thể mất đến cả một giây, hoặc có thể lâu hơn. Một người nào đó đang viết một ứng dụng web có thể không nhận ra điều này và gọi nhầm function này trong khi xử lý yêu cầu HTTP. (Việc làm này làm ứng dụng web của họ bị “treo” nếu external email service bị down).<br>
Để ngăn chặn sự cố này có thể xảy ra, bạn nên comment như này:
```
// Calls an external service to deliver email. (Times out after 1 minute.)
void sendEmail(String to, String subject, String body);
```
Đây là một ví dụ khác: giả sử bạn có một function *FixBrokenHtml()* để viết lại HTML bị lỗi bằng cách chèn các thẻ đóng bị thiếu như sau:
```
def FixBrokenHtml(html): ...
```
Function này hoạt động rất tốt, ngoại trừ cảnh báo rằng thời gian chạy của nó sẽ tăng lên nhiều khi có các thẻ được lồng sâu. Đối với những input HTML phức tạp, function này có thể mất *vài phút* để thực thi.<br>
Thay vì để người dùng tự khám phá điều này, tốt hơn hết là bạn nên thông báo trước:
```
// Runtime is O(number_tags * average_tag_depth), so watch out for badly nested inputs.
def FixBrokenHtml(html): ...
```
<br>

#### Comment "bức tranh toàn cảnh"
![](https://images.viblo.asia/73b4ddc5-84b4-4d8c-8db9-a54743d2c6a9.png)
<br>
Một trong những điều khó khăn nhất đối với một thành viên mới trong team là các "bức tranh toàn cảnh"—cách mà các class tương tác với nhau, cách dữ liệu chảy qua toàn bộ hệ thống, và vị trí của các điểm bắt đầu ở đâu. Người thiết kế hệ thống thường quên comment về nội dung này vì bản thân họ rất mật thiết với nó.<br>
Hãy xem xét thử nghiệm này: **một người mới vừa gia nhập team của bạn, cô ấy ngồi cạnh bạn và bạn cần giúp cô ấy làm quen với codebase.**<br>
Khi bạn giới thiệu codebase cho cô ấy, bạn có thể chỉ ra một số file hoặc class nhất định và nói những câu như:
* "Đây là đoạn code kết dính tầng business logic và database. Code ở tầng application không có gọi đến."
* "Class này có vẻ phức tạp, nhưng nó thực sự chỉ là một bộ nhớ cache. Nó không liên quan gì tới phần còn lại của hệ thống."

Sau một chút thời gian trò chuyện ngẫu nhiên, member mới của bạn sẽ biết nhiều hơn là việc đọc source code một mình.<br>
**Đây chính xác là loại thông tin nên được đưa vào dưới dạng high-level comment (comment bậc cao).**<br>
Đây là một ví dụ đơn giản về file-level comment:
```
// This file contains helper functions that provide a more convenient interface to our
// file system. It handles file permissions and other nitty-gritty details.
```
Đừng choáng ngợp bởi ý nghĩ rằng bạn phải viết một documentation sâu rộng và văn vẻ. **(Hãy nghĩ đơn giản là) một vài câu văn tốt còn hơn là không có gì cả.**
<br>
<br>
#### Những comment tổng quan
Ngay cả khi đang ở sâu bên trong một function, comment về "bức tranh toàn cảnh" cũng là một ý kiến hay. Đây là một ví dụ về một comment tóm tắt gọn gàng về code ở tầng thấp hơn:
```
// Find all the items that customers purchased for themselves.
for (String customerId : allCustomers) {
    for (Sale sale : getSales(customerId)) {
        if (sale.getRecipient().equals(customerId)) {
        ...
        }
    }
}
 ```
Nếu không có comment này, đọc hiểu từng dòng code thì sẽ khá khó khăn. (tôi thấy chúng ta đang duyệt  *allCustomers*, nhưng để làm gì vậy?)<br>
Nó rất hữu ích khi có những comment tổng quan trong các function, nơi có một vài “khối” code lớn bên trong:
```
public class GenerateUserReport() {
     // Acquire a lock for this user
     ...
     // Read user's info from the database
     ...
     // Write info to a file
     ...
     // Release the lock for this user
 }
 ```
Những comment này hoạt động tương tự như những gạch đầu dòng tổng quan để nói về ý nghĩa của function, vì vậy người đọc có thể hiểu được ý chính của function trước khi đi sâu vào chi tiết. (Nếu các khối code có thể dễ dàng tách ra, bạn có thể biến chúng thành các function riêng lẻ. Như chúng tôi đã đề cập trước đây, code tốt sẽ tốt hơn code xấu với comment tốt).
<br><br>
 #### Ví dụ: *Bạn có nên comment WHAT(cái gì), WHY(tại sao) hay HOW(cách nào) không?*
Bạn có thể đã nghe lời khuyên như: "Hãy comment *WHY*, chứ đừng comment *WHAT* hay là *HOW*" (hoặc những lời khuyên tương tự). Mặc dù nghe có vẻ hợp lý, nhưng chúng tôi cảm thấy những lời khuyên này quá đơn giản và những người khác nhau và họ sẽ hiểu theo ý khác nhau.<br>
Lời khuyên của chúng tôi là làm bất cứ điều gì giúp người đọc hiểu code dễ dàng hơn. Điều này có thể liên quan đến việc comment *WHAT, WHY, HOW* hoặc cả ba.
### Những suy nghĩ cuối cùng—Vượt qua sự bí ý tưởng
Rất nhiều lập trình viên không thích để comment vì cảm thấy tốn khá nhiều effort để viết được một cái tốt. Khi bị bí ý tưởng, thì giải pháp tốt nhất là chỉ cần bắt đầu viết. Vì vậy, lần tới khi bạn ngần ngại viết comment, hãy tiếp tục và comment những gì bạn đang nghĩ.<br>
Ví dụ: giả sử bạn làm việc với một chức năng và tự nghĩ *"Oh crap, this stuff will get tricky if there are ever duplicates in this list."* (Vãi, chỗ này sẽ gặp rắc rối nếu có những bản ghi bi trùng trong list này:sweat:). Chỉ cần viết nó ra:
```
// Oh crap, this stuff will get tricky if there are ever duplicates in this list.
```
Đấy, có khó lắm đâu? Mặc dù cách sử dụng từ có một chút mơ hồ. Để sửa nó, chúng ta chỉ cần đi qua từng cụm từ và thay thế nó bằng một cái gì đó cụ thể hơn:
* Khi bạn nghĩ “oh crap,” ý của bạn là “Careful: this is something to watch out for.”
* Khi bạn nghĩ “this stuff,” ý của bạn là “the code that’s handling this input.”
* Khi bạn nghĩ “will get tricky,” ý của bạn là “will be hard to implement.”

Và comment mới sẽ giống như sau:
```
// Careful: this code doesn't handle duplicates in the list (because that's hard to do)
```
Lưu ý rằng chúng tôi đã chia nhỏ nhiệm vụ viết comment thành các bước đơn giản hơn:
1. Viết ra bất kì những gì mà bạn đang suy nghĩ.
2. Đọc comment mà bạn vừa viết, và xem xét (nếu có) những thứ cần cải thiện.
3. Thực hiện cải thiện comment.

Khi bạn comment thường xuyên hơn, bạn sẽ thấy rằng chất lượng comment từ bước 1 ngày càng tốt hơn và cuối cùng có thể không cần sửa gì cả. Và bằng cách comment sớm và thường xuyên, bạn tránh được tình huống khó chịu khi cần phải viết một loạt các comment ở cuối.
### Tổng kết
Mục đích của một comment là giúp người đọc biết những gì người viết đã biết khi viết code. Toàn bộ chương này nói về việc hiện thực hóa tất cả các thông tin không-rõ-ràng-lắm mà bạn có về code và viết chúng ra.<br><br>
Những gì *không nên* comment:
* Những thứ hiển nhiên mà có thể được dẫn xuất nhanh chóng từ chính đoạn code.
* “Những comment như cái nạng” để giải thích cho code tồi (như là tên function tồi)—thay vào đó hãy sửa lại code

Những suy nghĩ bạn nên ghi lại bao gồm:
* Hiểu biết về việc tại sao code lại được viết theo cách này chứ không phải theo cách khác (“director commentary”)
* Lỗi trong code của bạn, bằng cách sử dụng các marker như TODO: hoặc XXX :.
* "Câu chuyện" về việc tại sao các hằng số lại có giá trị như vậy.

Đặt mình vào vị trí của người đọc:
* Dự đoán những phần nào trong code của bạn sẽ khiến người đọc phải thốt lên "hử?:neutral_face:" và comment những phần đó.
* Document lại bất kì những behavior của code mà một người đọc bình thường sẽ không lường trước được.
* Sử dụng những comment "bức tranh toàn cảnh" (big picture comments) taị file/class level để giải thích cách mà các khối code tương tác với nhau.
* Summarize các khối code bằng comment để từ đó người đọc không bị "lạc đường" khi đi sâu vào detail.
<br>
<br>
#### Kết (P9)
Chương V đến đây là kết thúc, ở phần tiếp theo mình sẽ giới thiệu chương VI của cuốn sách, hẹn gặp lại các bạn ở phần sau :)
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*