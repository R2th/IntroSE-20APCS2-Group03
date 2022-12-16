# Mục đích series.
Với series này, mình mong muốn có thể khơi dậy đam mê tìm hiểu thuật toán trong mình và các bạn thông qua:
- Những bài toán gắn liền với thực tế.
- Cách giải quyết các bài toán dựa trên việc áp dụng các thuật toán cơ bản.
-  Từ đó thấy được tầm quan trọng của thuật toán trong lập trình.
# Bài toán.
Cùng nhìn qua một ví dụ đơn giản là hầu hết các developer chúng ta đều phải làm việc với các dấu đóng mở ngoặc như `{},[],()` và hầu hết các text editor hiện nay đều hỗ trợ chúng ta kiểm tra xem chúng ta kiểm tra tính hợp lệ nó. Bạn có bao giờ thử implement lại chúng hoặc đơn giản tìm hiểu xem nó hoạt động như thế nào? Hôm nay chúng ta sẽ nhìn chúng dưới những thuật toán cơ bản đã học ở đại học.

## Giải quyết.
1. Đơn giản hoá vấn đề: Chúng ta loại bỏ các cú pháp và câu lệnh phía trong của từng block code, xem chúng như những string chỉ bao gồm `{[]}()`. Đến đây bài toán đã đơn giản hơn.
2. Ý tưởng:
    -   Phân chia chúng thành 2 loại là **ký tự mở** gồm `{[(` và **ký tự đóng** gồm `]})`
    -   Ngoặc nào được mở **sau cùng** thì sẽ phải đóng **trước tiên**. Chẳng hạn ta có một biểu thức đơn giản như sau: `if (a[i] % 2) == 0` .
    -   **Sau cùng - trước tiên**, nghe quen quen ta🤔.  Chính xác, nó đang hoạt động theo nguyên tắc **Last in - First Out** hay còn gọi là **Stack.**
    -   Ở ví dụ trên chúng ta thấy ngoặc `(` được mở trước tiếp đến là dấu `[` như vậy theo nguyên tắc **LIFO** thì trong chuỗi chúng ta sẽ phải kiểm tra trong chuỗi xem có phải dấu `[` xuất hiện trước dấu `)` hay không? 
    =>  Như vậy với thuật toán stack thì bài toán đã trở nên khá rõ ràng, chúng ta cùng xem qua những case có thể có và giải quyết nó nhé.
## Test case:
-  Trong ví dụ trên, chúng ta vừa mới kiểm tra happy case (hay còn gọi là trường hợp lý tưởng). Bây giờ chúng ta cùng đi liệt kê xem có những trường hợp nào có thể xảy ra nhé.
    1.  stack (chuỗi) cần kiểm tra là một stack lẻ.
        -   Đây là case đầu tiên dễ thấy nhất. Có mở ngoặc thì phải có đóng, do đó một stack với độ dài là lẻ thì đương nhiên là không hợp lệ mà không cần xem xét những phần tử phía trong. 
        - Ví dụ `{ [ }` . Với 3 phần tử thì chắc chắn stack này không hợp lệ mà không cần xem chúng có theo cặp hay không.
    2. Mở đầu stack là một phần tử đóng block. ⇒ đương nhiên là sai 😆
    3.  Stack là một số chẵn nhưng đóng mở không theo thứ tự. 
	- Nếu không có thuật toán thì case này có vẻ sẽ tương đối phức tạp, nhưng vì chúng ta đã chọn stack nên việc còn lại là khá đơn giản. 
	- Ta tạm gọi phần tử cuối stack là `s1`, phần tử tiếp theo trong chuỗi cần xét là `s_next`
        -  Chúng ta kiểm tra xem  `s_next` là phần tử mở (`{,[,(`) hay đóng (`},],)`).
            -   Nếu là mở thì thêm `s_next` vào cuối stack. Lúc này `s_next` sẽ đóng vai trò là `s1`
            -   Nếu `s_next` là ký tự đóng thì kiểm tra xem `s1` có phải là phần tử mở tương ứng với `s_next` không?
                -   Nếu đúng loại bỏ `s1` khỏi stack và tiếp tục với các ký tự tiếp theo trong chuỗi và không quan tâm đến nó nữa.
                -   Nếu sai thì xác định đây là chuỗi không hợp lệ và kết thúc.
    4. Chuỗi hợp lệ:
    - Với với ví dụ trên, rõ ràng chúng ta có thể thấy nếu như kết thúc chuỗi và `stack.empty == true` thì tức là các dấu mở block đã được đóng hết. ⇒ ngon lành.

# Kết.
- Vừa rồi mình vừa trình bày về một ví dụ khá tiêu biểu liên quan đến thuật toán Stack và ứng dụng của nó. Hy vọng qua bài viết có thể khơi dậy lòng ham muốn học thuật toán của các bạn. Ý tưởng giải quyết bài toán đã có, **hãy cùng nhau bắt tay giải quyết bài toán và đừng quên đưa ra code giải quyết bài toán ở phần comment nhé.** 
- To be con tì niu.... 😄