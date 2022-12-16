![](https://images.viblo.asia/63a1d090-57ec-4248-804a-2591372be4be.png)

Bạn là một coder và bạn đang code thì leader báo "code của chú ở pr trước đang có bug production, quay lại hot fix cho anh luôn nhé!". Sau khi nhận gáo nước lạnh từ leader bạn đang ở ngay giữa chừng trong task mới và có khá nhiều files changed. Bạn ngồi vạch hướng giải quyết 
Để bắt đầu giải quyết vấn đề, bạn cần một branch mới với code trên production. Khi nói đến lệnh Git cơ bản, bạn có hai lựa chọn:
* Chạy `git reset --hard` để loại bỏ những thay đổi đã được commit của bạn.
* Ghi lại công việc chưa hoàn tất của bạn như là một commit mới.

Tùy chọn đầu tiên làm mất tất cả công việc của bạn, trong khi cái sau dẫn đến một phần commit không có ý nghĩa. Không có tình huống là được mong đợi cả.

Đây là lúc lệnh `git stash` phát huy tác dụng của nó. Hãy tưởng tượng nó giống như `git reset --hard`, nó cung cấp cho bạn một branch sạch sẽ, nhưng nó cũng ghi lại các thay đổi không đầy đủ bên trong. Sau khi khắc phục xong lỗi nghiêm trọng, bạn có thể tái áp dụng những thay đổi này và bắt đầu lại từ nơi bạn đang dở dang. Bạn có thể xem `git stash` như một nút "tạm dừng" cho tiến trình công việc của bạn.

![](https://images.viblo.asia/82ce364c-11c6-401e-9662-7d072289eecc.png)

Tôi cá chắc là nếu bạn đã từng nghịch hoặc làm việc thực tế với github thì kiểu gì bạn chả gõ vãi lần **git stash** và **git stash pop** rồi. Nó là một tính năng rất hữu ích của **git**. Nhưng như thế thì chưa tường mình lắm, tôi cũng nghịch như bạn nhưng hỏi sao có mỗi thế kia thì cũng chưa bõ bèn gì cho lắm! nên một buổi tối rảnh quá của một ông coder FA, tôi bỏ ra ngồi đọc về thằng **git stash** này! bạn nào biết rồi xin bỏ qua cho thảo dân mới tìm hiểu này nhé!

-----

**Dưới đây là những điều hữu ích mà git stash có mà tôi đã ngó được:**

1. Git stash save
2. Git stash list
3. Git stash apply
4. Git stash pop
5. Git stash show
6. Git stash branch <name>
7. Git stash clear
8. Git stash drop

**Bắt đầu đi vào từng cái một nhé:**
  
1. **Git stash save**
    - Đơn giản thì thằng này cũng giống như khi bạn gõ git stash vậy. Cái khác là lệnh này có những option khác nhau. Có một số option khá hay, tôi sẽ trải ra ở dưới đây.
        *  Git stash cùng mới một message kèm theo
            ```
            git stash save "Toi dang Code cai gi the nay"
            ```
      
             bạn thử đi nhé! tôi sẽ nói ra tác dụng của nó trong lát nữa!
        *   Git stash loại bỏ những files không được theo rõi
            ```
            git stash save -u
            or
            git stash save --include-untracked
            ```
2. **Git stash list**
    - Trước khi thử lệnh này tôi sẽ thì thầm cho bạn chút về **git stash** - cả **git stash** hay **git stash save** thì chúng nó có cùng một cơ chế, thực ra **Git sẽ tạo ra một commit** khi bạn sử dụng 1 trong 2 lệnh trên và nó được lưu trữ lại trong repo của bạn. Bạn có thể xem danh sách stash của bạn bất cứ lúc nào khi bạn dùng lệnh
        ```
        git stash list
        ```
        Chúng ta sẽ được kết quả như sau:
        ```
        stash@{0}: WIP on master: 4e22905 abc 1865891265912
        stash@{1}: On master: Toi dang Code cai gi the nay
        (END)
        ```
        Đây là danh sách các stashes mà bạn tạo ra, và cái gần nhất bạn tạo nó ở trên đầu đó. À còn cái nữa bạn có thấy cái message mà bạn stash save lúc trước không! nó kia đó =)).
1. **Git stash apply**
    - Lệnh này cơ bản là sẽ lấy **stash** cuối cùng (gần nhất) để **apply** nó vào code của bạn. đúng kiểu **stack**, **vào cuối - ra đầu**. Trên ví dụ trên thì bạn biết là nó sẽ lấy thằng nào để apply rồi chứ! **stash@{0}**.
        ```
        git stash apply
        ```
    - Thế nếu giờ mà bạn muốn **apply** một thằng khác thì thế nào nhỉ? đơn giản lắm lấy thằng id của **stash** đó ra thôi chứ sao
        ```
        git stash apply stash@{1}
        ```
1. **Git stash pop**
    - Quả này thì cũng như **git apply** thôi! mỗi tội là thanh niên này rất sạch sẽ rút ra là xoá mọi dấu vết luôn => nó sẽ xoá **stash** đó khỏi đống **stash** của bạn thôi. Dưới dây là ví dụ này:
        ```
        ➜  leuleu git:(master) git stash pop
        On branch master
        Changes not staged for commit:
          (use "git add <file>..." to update what will be committed)
          (use "git checkout -- <file>..." to discard changes in working directory)

            modified:   helloworld.js

        no changes added to commit (use "git add" and/or "git commit -a")
        Dropped refs/stash@{0} (f86f17ccf69028ed447c7b59bae6782d1ff33b24)
        ```
        bạn có thấy nó xoá đi ở cái dòng cuối cùng kia không Dropped ... - chính nó.
    - Tương tự như **apply** nó cũng lôi thằng gần nhất ra, và bạn muốn nó lôi thằng nào ra thì thêm id của nó vào sau nhé
        ```
        git stash pop stash@{1}
        ```
  1. **Git stash show**
        - Lệnh này hiện thị khá ngắn gọn những thay đổi của **stash diff**. tương tự, nó chỉ xem của thằng **stash** cuối cùng thôi. 
            ```
            git stash show
            ```
        - Bạn muốn xem fullHD không che thì thêm -p vào nhé
            ```
            git stash show -p
            ```
        - Còn muốn hiển thị **stash diff** của **stash** khác thì tương tự như mấy lệnh trên, chỉ cần thêm id của nó vào là được
            ```
            git stash show stash@{1}
            ```
  1. **Git stash branch <name>**
        - Tạo một **branch** mới với nhưng thay đổi tương ứng trong **stash** gần nhất của bạn và cũng xoá nó khỏi **stash list** như **git stash pop**. 
            ```
            git stash branch branch-draff
            ```
        - Bạn muốn tạo với một **stash** cụ thể thì thêm id vào sau tên **branch** mới (<name>)
            ```
            git stash branch branch-draff stash@{1}
            ```
        - Nó cực kỳ hữu ích khí **code stash** của bạn **conflict** với code mới nhất bạn kéo về trên nhánh đang làm việc.
  1. **Git stash clear**
        - Xoá toàn bộ **stash** bạn đang lưu trữ trong repo. nó có thể sẽ **không revert** lại được nên chú ý nhé!
            ```
            git stash clear
            ```
  1. **Git stash drop**
        - Xoá đi **stash** gần nhất, có thể **không revert **được đâu nhé!
            ```
            git stash drop
            ```
        - Xoá đi stash củ thể bằng việc thêm id vào, có thể **không revert** được đâu nhé!
            ```
            git stash drop stash@{1}
            ```

        Đó, mong là bạn cũng có thêm chút tip trick cho việc coding của riêng mình! à các bạn hỏi mình tham khảo ở đâu thì ở [đây](https://medium.freecodecamp.org/useful-tricks-you-might-not-know-about-git-stash-e8a9490f0a1a) này! cảm ơn ông tác giả nhé =))