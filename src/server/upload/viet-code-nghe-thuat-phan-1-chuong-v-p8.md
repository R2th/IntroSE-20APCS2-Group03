## Chương V: Biết nên comment những gì
![](https://images.viblo.asia/fff131e9-3ee0-41b1-9d4a-4982a5b883e9.png)
<br><br>
Mục tiêu của chương này là giúp bạn nhận ra những gì bạn nên comment. Bạn có thể nghĩ rằng mục đích của việc comment là chỉ để "giải thích những gì code làm", nhưng đó chỉ là một phần nhỏ trong đó.<br>
> ##### KEY IDEA: 
> ##### ***Mục đích của comment là giúp người đọc hiểu những gì mà tác giả viết càng nhiều càng tốt.***
Khi bạn viết code, bạn có rất nhiều thông tin có giá trị trong đầu. Khi người khác đọc code của bạn, thông tin đó sẽ bị mất—và tất cả những gì họ có chỉ là đoạn code mà họ đang đọc.<br>
Trong chương này, chúng tôi sẽ cho bạn thấy nhiều ví dụ về việc khi nào thì nên viết ra thông tin trong đầu của bạn. Chúng tôi đã bỏ qua những điểm nhỏ nhặt về comment mà thay vào đó, chúng tôi đã tập trung vào những khía cạnh thú vị hơn và "không được đánh giá cao" của comment.<br>
Chúng tôi đã sắp xếp chương này thành các chủ đề sau:
* Biết *không* nên comment những gì
* Ghi lại những suy nghĩ của mình như khi bạn viết code
* Đưa mình vào vị trí của người đọc, để tưởng tượng những gì họ sẽ cần phải biết
### Biết *KHÔNG* nên comment những gì
![](https://images.viblo.asia/1dbdd35d-92f2-4251-a2c3-736acaf77568.png)
<br><br>
Đọc một comment sẽ lấy đi thời gian từ việc đọc code, và mỗi comment cũng chiếm không gian trên màn hình. Có nghĩa là, nó đáng giá để chúng ta phải suy nghĩ. Vì vậy, ở đâu thì bạn nghĩ nó là một comment vô giá trị hay là một comment tốt?<br>
Toàn bộ comment ở đoạn code dưới đây là vô giá trị:
```
// The class definition for Account
public class Account {
    // Constructor
    public Account() {}
    
    // Global variable profit
    private double profit;
    
    // Set the profit member to a new value
    public void setProfit(double profit) {
        this.profit = profit;
    }
    
    // Return the profit from this Account
    public double getProfit() {
        return profit;
    }
}
```
Những comment không có giá trị vì chúng không cung cấp thêm bất kì thông tin gì hay giúp người đọc hiểu được code tốt hơn.
> ##### KEY IDEA: 
> ##### ***Không tạo comment về những thứ hiển nhiên mà có thể được dẫn xuất nhanh chóng từ chính đoạn code.***
Tuy nhiên, chúng ta cần phải phân biệt "nhanh chóng" ở đây. Hãy xem xét đoạn comment cho đoạn code Python này:
```
# remove everything after the second '*'
name = '*'.join(line.split('*')[:2])
```
Về mặt kỹ thuật, comment này không cung cấp thêm bất kỳ "thông tin mới" nào. Nếu bạn chỉ nhìn vào bản thân code đó, bạn cũng sẽ biết chức năng của nó là gì. Nhưng đối với hầu hết các lập trình viên, đọc comment code nhanh hơn nhiều so với việc hiểu code mà không có comment.
<br><br>
#### Đừng comment cho có
![](https://images.viblo.asia/3e419c4f-6853-40c4-8b9b-a8de1b66f026.png)
<br><br>
Một số giáo viên yêu cầu các sinh viên của mình phải có một comment cho mỗi function trong code bài tập về nhà của họ. Và kết quả là, một số lập trình viên cảm thấy "tội lỗi" về việc để lại một function "trần truồng" mà không có comment nào, và cuối cùng họ đã viết lại tên của function và tham số theo hình thức câu như này:
```
// Find the Node in the given subtree, with the given name, using the given depth.
Node findNodeInSubtree(Node subtree, String name, int depth);
```
Trường hợp này rơi vào mục “comment vô giá trị”—khai báo của function và comment là hầu như giống nhau. Comment này nên được gỡ bỏ hoặc cải thiện.<br>
Nếu bạn muốn có một comment ở đây, thì nó nên giải thích những thông tin quan trọng hơn:
```
// Find a Node with the given 'name' or return NULL.
// If depth <= 0, only 'subtree' is inspected.
// If depth == N, only 'subtree' and N levels below are inspected.
Node findNodeInSubtree(Node subtree, String name, int depth);
```

<br>

#### Đừng comment trên những cái tên tồi—Thay vào đó hãy sửa những cái tên đó
Một comment không cần phải làm đẹp cho một cái tên xấu. Ví dụ, đây là một comment không ăn nhập với method *CleanReply()*:
```
// Enforce limits on the Reply as stated in the Request,
// such as the number of items returned, or total byte size, etc.
void cleanReply(Request request, Reply reply);
```
Hầu hết các comment chỉ đơn giản là giải thích ý nghĩa của “clean”. Thay vào đó, cụm từ “enforce limits” nên được chuyển vào tên function:
```
// Make sure 'reply' meets the count/byte/etc. limits from the 'request'
void enforceLimitsFromRequest(Request request, Reply reply);
```
Tên function này đính kèm được nhiều thông tin hơn. Một cái tên tốt sẽ tốt hơn là một comment tốt vì nó sẽ được hiểu luôn ở toàn bộ những nơi mà function được sử dụng.<br>
Dưới đây là một ví dụ về một comment cho một function có tên xấu:
```
// Releases the handle for this key. This doesn't modify the actual registry.
void deleteRegistry(RegistryKey key);
```
Cái tên *deleteRegistry()* nghe có vẻ như là một function nguy hiểm (nó *xóa registry*?!). Đoạn comment "“This doesn’t modify the actual registry” là để cố gắng làm sáng tỏ sự nhầm lẫn.<br>
Thay vào đó, chúng ta sẽ sử dụng một cái tên mà đính kèm được nhiều thông tin hơn như là:
```
void releaseRegistryHandle(RegistryKey key);
```
Nói chung, không nên có những “comment như cái nạng” —comment mà đang cố gắng để bù đắp cho sự khó đọc của code. Các lập trình viên thường có quy tắc là **code  tốt > code xấu + comment tốt.**
### Ghi lại những suy nghĩ của mình
Bây giờ bạn đã biết những gì *không nên* comment, còn giờ thì hãy thảo luận về những gì *nên* comment (thường không được thêm).<br>
Rất nhiều comment tốt có thể được đưa ra chỉ đơn giản là "ghi lại những suy nghĩ của bạn"—đó là những suy nghĩ quan trọng mà bạn có khi viết code.
<br><br>
#### Bao gồm “Director Commentary” 
Các bộ phim thường có một “director commentary” track (tạm gọi là chú giải đạo diễn), nơi các nhà làm phim đưa ra những hiểu biết của họ và kể những câu chuyện để giúp bạn hiểu cách bộ phim được thực hiện. Tương tự, bạn nên thêm các comment để ghi lại những hiểu biết có giá trị về code.<br>
Đây là một ví dụ:
```
// Surprisingly, a binary tree was 40% faster than a hash table for this data.
// The cost of computing a hash was more than the left/right comparisons.
```
Comment này dạy cho người đọc một điều gì đó và ngăn chặn việc tối ưu hóa code sẽ làm lãng phí thời gian xử lý (Nếu dùng hash table thay vì binary tree).<br>
Đây là một ví dụ khác:
```
// This heuristic might miss a few words. That's OK; solving this 100% is hard.
```
Nếu không có comment này, người đọc có thể nghĩ rằng có một bug và có thể lãng phí thời gian để cố gắng đưa ra các test case hoặc cố gắng sửa lỗi.<br>
Một comment cũng có thể giải thích tại sao code lại không có bố cục đẹp:
```
// This class is getting messy. Maybe we should create a 'ResourceNode' subclass to
// help organize things.
```
Comment này thừa nhận rằng code này lộn xộn nhưng cũng khuyến khích người code tiếp theo sửa nó (với những chi tiết cụ thể về cách bắt đầu). 
<br><br>
#### Comment những sai sót trong code của mình
Trong quá trình phát triển code chắc chắn sẽ có những sai sót trên đường đi. Đừng ngại khi ghi lại những sai sót. Ví dụ, hãy note lại khi những cải tiến nên được thực hiện:
```
// TODO: use a faster algorithm
```
hoặc khi code đang chưa được hoàn thiện:
```
// TODO(dustin): handle other image formats besides JPEG
```
Có một số marker đã trở nên phổ biến trong lập trình:
| Marker | Ý nghĩa thông thường |
| -------- | -------- |
| TODO:  | Những thứ chưa được giải quyết ở đây |
| FIXME:  | Đoạn code có vấn đề ở đây |
| HACK:  |Code này chỉ là giải pháp tạm thời|
| XXX:  | Nguy hiểm! Vấn đề mấu chốt là ở chỗ này |
Team của bạn có thể có các quy ước cụ thể về việc sử dụng các marker này. Ví dụ: *TODO:* có thể được dành riêng cho các vấn đề lớn. Nếu vậy, đối với các lỗi nhỏ hơn, bạn có thể sử dụng một cái gì đó như *todo:* (chữ thường) hoặc *maybe-later:* để thay vào đó.<br>
Điều quan trọng là bạn phải luôn cảm thấy thoải mái để comment những suy nghĩ của mình về cách mà code sẽ thay đổi trong tương lai. Những comment như thế này cung cấp cho người đọc cái nhìn giá trị về chất lượng và trạng thái của code, và thậm chí có thể cung cấp cho họ một số hướng về cách cải thiện nó.
<br><br>
#### Comment trên các hằng số
Khi định nghĩa một hằng số, thường có một “câu chuyện” về ý nghĩa của hằng số đó hoặc tại sao nó có giá trị đó. Ví dụ: bạn có thể thấy hằng số này trong code của mình:
```
int NUM_THREADS = 8;
```
Có vẻ như dòng này không cần comment, nhưng có vẻ như là người viết code biết vì sao lại đặt giá trị như vậy:
```
int NUM_THREADS = 8; // as long as it's >= 2 * num_processors, that's good enough.
```
Bây giờ thì người đọc đã có thêm hướng dẫn để điều chỉnh lại giá trị (ví dụ, setting nó về 1 thì quá thấp còn setting về 50 thì là quá mức cần thiết.)<br>
Hoặc đôi khi giá trị chính xác của một hằng số là không quan trọng chút nào. Một comment cho việc này vẫn hữu ích:
```
// Impose a reasonable limit - no human can read that much anyway.
int MAX_RSS_SUBSCRIPTIONS = 1000;
```
Đôi khi đó là một giá trị đã được cân nhắc, và có lẽ không nên được điều chỉnh nhiều:
```
float image_quality = 0.72; // users thought 0.72 gave the best size/quality tradeoff
```
Trong tất cả các ví dụ này, bạn có thể không nghĩ tới việc thêm comment, nhưng thực ra là chúng khá hữu ích.<br>
Có một số hằng số mà không cần comment, bởi vì tên của nó là đủ rõ ràng rồi (ví dụ, *SECONDS_PER_DAY*). Nhưng theo kinh nghiệm của chúng tôi, hầu hết các hằng số có thể được cải thiện bằng cách thêm một comment. Nó chỉ là việc ghi lại những gì bạn đã nghĩ khi bạn quyết định về giá trị không đổi đó.
<br><br>
*(còn tiếp)*
#### Kết (P8)
Chương V mình xin phép được tách ra làm 2 topic vì nội dung của nó cũng khá là dài, hẹn gặp lại các bạn ở phần tới 😃 
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*