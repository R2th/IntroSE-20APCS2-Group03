# Phân biệt một số câu lệnh cơ bản trong git
Khi mới tìm hiểu về git, bạn có nhận thấy một số câu lệnh trong git có chức năng kha khá giống nhau và bạn đã bao giờ thắc mắc về sự khác biệt giữa chúng là gì chưa? Từ kiến thức của bản thân cũng như nhặt nhạnh một số tài liệu trên mạng, hôm nay mình sẽ viết một bài viết để giúp các bạn phân biệt một số câu lệnh thông dụng trong git.

-----


## **Git pull vs git fetch**<br/>
Trước khi chúng ta nói về sự khác biệt giữa hai lệnh này, chúng ta hãy nhấn mạnh sự tương đồng của chúng đó là: **cả hai đều được sử dụng để tải xuống dữ liệu mới từ một kho lưu trữ từ xa (remote repository)**. 
Việc tải xuống các dữ liệu mới về máy của bạn là vô cùng cần thiết, bởi vì khi thực hiện clone một dự án từ remote repository, thì các dữ liệu đó chỉ là một “**snapshot**” tại thời điểm bạn clone dự án mà thôi. Do vậy, khi có các thay đổi trên remote repository thì chúng cần được tải về trong local repository của bạn. Lúc này chúng ta có thể sử dụng** git fetch** hoặc **git pull** để thực hiện việc này.
Vậy sự khác biệt của hai câu lệnh này là gì ?
* **Git fetch :**<br/>
 Khi chạy câu lệnh <b>git fetch <remote_origin></b>, Git sẽ **tải về dữ liệu của tất cả các branch của repository trên remote server** nằm tại địa chỉ quy định bởi <b><remote_origin></b> và cập nhật dữ liệu này với dữ liệu của cách branch phía dưới máy local. Tuy nhiên **git fetch không cập nhật dữ liệu của working directory** .Điều này có nghĩa là nếu như có bất cứ thay đổi (commit) nào trên remote server thì chúng cũng **không ảnh hưởng tới các tập tin**, thư mục của bạn
* **Git pull :**<br/>
Khi chạy câu lệnh git pull **<remote_origin> <branch_name>**, Git sẽ thực hiện việc **fetch dữ liệu của remote repository** tại nhánh **<branch_name>** từ server nằm tại địa chỉ quy định bởi **<remote_origin>** và **áp dụng (merge) các thay đổi** này vào thư mục và tập tin ở **working directory**.<br>
Git pull luôn cố gắng tự động trộn các thay đổi (**auto merge**) vì thế việc này có thể dẫn đến **conflict**.


-----

## **Git reset vs git revert**
Trong quá trình phát triền phần mềm, thì chúng ta thường không thể tránh khỏi việc sử dụng phải rollback một số commit bị lỗi. Trong trường hợp này, chúng ta sẽ có 2 phương pháp chính để giải quyết, đó là :	 **git reset** và **git revert**<br/>
* **Git reset**: <br/>
Git reset được dùng để quay về một điểm commit nào đó, đồng thời **xóa lịch sử** của các commit trước nó.<br/>
Cùng xét  ví dụ dưới đây để hiểu rõ hơn về git reset:<br/><br>
![](https://images.viblo.asia/e5e16e3d-5509-4dcc-82fd-b070893e2f4c.jpg)
<br/>*Giả sử, lịch sử commit của bạn có các điểm commit như trên (A, B, C ,D) tương ứng với các commit_id phía trên . A , B là các commi đang hoạt động bình thường, và C, D là các commit gặp vấn đề. Lúc này bạn có thể quay trở về commit B bằng câu lệnh*<br/>
    ```
    Git reset --hard a0fvf8
    ```
    Sau khi chạy xong câu lệnh trên , ta có kết quả :<br/><br/>
    ![](https://images.viblo.asia/b5834520-43c9-4850-8503-66f51ab2435a.jpg)<br/><br/>
    Bạn có thể thấy , con trỏ **HEAD** đang trỏ đến vị trí của commit B, đồng thời **lịch sử commit C và D cũng biến mất**, giống như bạn chưa từng thực hiện commit bị lỗi nào vậy. Lịch sử commit cũng trông gọn gàng hơn.<br/>
    Tuy nhiên, các thay đổi này mới chỉ diễn ra trên **local repository**, để cập nhật thay đổi này lên **remote repository** bạn cần phải thực hiện lệnh:<br> 
    ```
    Git push -f
    ```
    <br/>
* **Git revert**<br/>
        Đó là với** git reset**, vậy còn **git revert** thì sao ?<br/> **Git revert** không làm mất các commit , thay vào đó sẽ tạo thêm commit mới, có nội dung giống hệt với commit bạn muốn quay trở về.<br/><br/>
    ![](https://images.viblo.asia/e5e16e3d-5509-4dcc-82fd-b070893e2f4c.jpg)<br/><br/>
    Vẫn với trường hợp như với **git reset**, điều chúng ta cần thực hiện là **revert về commit D**, rồi tiếp tục **revert về commit C**.<br>
    ```
    git revert 5lk4er
    git revert 76sdeb
    ```
     Kết quả sau khi lần lượt chạy 2 lệnh trên:<br/><br/>
        ![](https://images.viblo.asia/a563a9cb-1a9d-44a9-aeca-5235a5012a76.jpg)<br/><br/>
    Ở đây, chúng ta có thể thấy rằng đã có thêm **2 commit mới D’ và C’ được tạo ra**.<br/>
    Như vậy, **git reset thì xóa lịch sử commit** giúp lịch sử trông gọn gàng hơn, còn **git revert sẽ tạo ra thêm commit mới** đồng thời giữ lại lịch sử commit trước đó.

-----

## **Git reset, git reset –soft, git reset --hard**<br>
Như đã phân biệt giữa **git reset** và **git revert** ở trên thì chúng ta đã biết tác dụng **git reset**. Tuy nhiên, tùy thuộc vào hoàn cảnh cũng như mục đích mà chúng ta lại cần reset với các chế độ khác nhau ( ví dụ như có giữ lại các thay đổi trước đó hay không), do vậy git cung cấp cho ta 3 lựa chọn đi kèm là : **--soft, --hard, --mixed**<br>
* **Git reset <commit_id>**: Di chuyển con trỏ **HEAD** về vị trí commmit reset và vẫn** giữ nguyên tất cả các thay đổi của file**, nhưng **loại bỏ các thay đổi khỏi stage**. <br>
* **Git reset --soft <commit_id>** : Lệnh này chỉ di chuyển **HEAD** về vị trí commit. **Trạng thái của stage và tất cả sự thay đổi của file sẽ được giữ nguyên**.<br>
* **Git reset --hard <commit_id>** : Di chuyển con trỏ **HEAD** về vị trí commmit reset và **loại bỏ tất cả sự thay đổi của file**.<br>


-----

## Kết
Cảm ơn các bạn đã theo dõi bài viết của mình! Hy vọng thông qua bài hướng dẫn này bạn có thể phân được một số lệnh cơ bản trong git và biết cách sử dụng chúng linh hoạt trong từng trường hợp! Nếu như có thắc mắc hay cần giải đáp, các bạn hãy để lại bình luận bên dưới cho mình nhé!<br><br>
**Tài liệu tham khảo:**
* [https://www.pixelstech.net/article/1549115148-git-reset-vs-git-revert](https://www.pixelstech.net/article/1549115148-git-reset-vs-git-revert) <br>
* [https://www.codehub.vn/Khac-Biet-Giua-git-fetch-va-git-pull](https://www.codehub.vn/Khac-Biet-Giua-git-fetch-va-git-pull)