1. Return to a previous commit

    - Để nhảy về một commit trước đó thì chúng ta phải biết commit hash của no bằng cách sử dụng lệnh:
        ```
        git log
        ```
        Lệnh trên sẽ hiển thị tất cả các commit trước đó và chúng ta sẽ copy lại hash của commit mà chúng ta cần nhảy tới và dùng lệnh:
        ```
        git checkout hash_commit
        ```
        Khi nhảy tới nhánh này bạn có thể thay đổi, xem lại code, làm đủ thứ mà bạn cần.
       
     -  Để quay lại commit trước đó mà vẫn giữ những thay đổi:
         ```
         git reset --soft hash_commit
         ```
      - Để quay lại commit cuối cùng:

            ```
            git reset --soft HEAD~
            ```
        
      - Để loại bỏ vĩnh viên mọi thứ sau một commit cụ thế nảo đó:

            ```
            git reset --hard hash_commit
            ```
       - Tương tự như ở trên, để xóa bỏ vĩnh viễn thay đổi sau commit cuối cùng:

            ```
            git reset --hard HEAD~
            ```
    Chú ý: Để tránh nguy hiểm dẫn tới tình trạng mất code thì nên sử dụng git stash; git reset --soft thay vif git reset --hard sẽ an toàn hơn.
2. Undoing changes
    
    - Để loại bỏ thay đổi của một file:
        ```
        git checkout filename
        # hoặc
        git checkout -- filename
        ```
     - Để loại bỏ tất cả nhưng file đang thay đổi với commit trước đó:

        ```
        git checkout .
        hoặc
        git checkout -- .
        ```
      - Để loại bỏ một phần của thay đổi với commit trước đó thì ta có thể dùng:

        ```
        git checkout --patch -- [list_file_change]
        ```
        *listfilechange* ở đây có thể là một list các file đang bị thay đổi. Với câu lệnh này thì với mỗi lần hoàn tác file thì nó sẽ hỏi 1 lần xem có chắc chắn muốn hoàn tác hay không.
      - Đưa file trở về thời điểm của một commit nào đó:

        ```
            git checkout hash_commit filename
        ```
    
3. Using reflog

    Trong trường hợp nêu rebase của bạn bị hỏng, thì bạn có thể quay lại commit trươc thời điểm rebase bằng cách sử dụng **reflog**.
    Có lịch sử tất cả những gì bạn làm trong vòng 90 ngày qua.
    Nó có dạng:
    ```
        $ git reflog
        4a5cbb3 HEAD@{0}: rebase finished: returning to refs/heads/foo
        4a5cbb3 HEAD@{1}: rebase: fixed such and such
        904f7f0 HEAD@{2}: rebase: checkout upstream/master
        3cbe20a HEAD@{3}: commit: fixed such and such
        ...
    ```
    Có thẻ quay lại commit trước khi rebase:
    ```
    git checkout HEAD@{3}
    ```
    Cũng có thể reset tới một điểm nào đó trong reflog nhưng hãy chắc chắn 100% điều đó là đúng.
    ```
    git reset --hard HEAD@{3}
    ```

4. Revert some existing commits

    Sử dụng git revert để revert một commit đã tồn tại, đặc biệt là khi commit đó đã được đẩy lên một remote repository. Nó ghi lại một số commit mới và đảo ngược tác dụng của commit trước đó, cái mà có thể đây một cách an toàn mà không cần ghi lại lịch sử.
    Ví dụ: Nếu bạn push một commit trong đó có bug, và bạn muốn back nó lại:
    ```
    git revert HEAD~1
    git push
    ```
    Bây giờ có thể revert ở local, sửa code và push lại:
    ```
    git revert HEAD~1
    work .. work .. work ..
    git add -A .
    git commit -m "Update error code"
    git push
    ```
    
5. Undo git commit --amend.
    Đôi khi chúng ta làm việc ngay trên nhánh master hoặc develop. Rồi chúng ta quên mất, sau khi thay đổi code và commit luôn vào commit mới nhất của develop. (boiroi). Hãy thực hiện như sau:
    ```
    git reset --soft HEAD@{1}
    ```
    Lúc này ta có thể checkout sang branch mới, commit và đẩy code bình thường.
    
Bài viết này mình tham khảo và tổng hợp lại một số trick trước tiên là để nhắc nhở mình, vì mình rất hay quên. Hi vọng nó sẽ có ích cho công việc của các bạn. Bài viết còn sơ xài, có điều gì sai xót mong các bạn góp ý. Cảm ơn đã đọc bài.

Nguồn: Tham khảo.