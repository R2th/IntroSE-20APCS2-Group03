## Làm thế nào để gộp nhiều commit thành một trong git?
### Đầu tiên ta phải hiểu cấu trúc của git ở local - ở máy tính cá nhân, của chúng ta như nào
![](https://images.viblo.asia/2fb15968-b691-4ab2-af60-18a0514a5e68.jpg)
*  Git ở local nói chung có 3 phần :
    *  working : phần code chúng ta nhìn thấy và làm việc.
    *  staging area : khi chúng ta thực hiện `git add ...` thì code sẽ nằm ở phần này.
    *  local repo : khi thực hiện `git commit ...` thì code sẽ nằm ở phần này.
###  Vào vấn đề chính
* Ví dụ trên local của mình có 3 commit
    * 104c487 (HEAD -> master) commit three
    * ba64718 commit two
    * 6e43b7c commit one
* Bây giờ mình muốn gộp 3 commit này thành 1 (ví dụ thành nội dung commit thứ 1  `commit one`)
    * Step 1: sử dụng lệnh : `git rebase -i HEAD~3` (HEAD~3 là vì số commit bạn muốn gộp là 3 từ HEAD, nếu là n thì là HEAD~n)
    * Step 2: Sau mình dùng `vi` để chỉnh sửa (các bạn có thể dùng `vim` hoặc  ...), nhấn nút `ins` để sửa nội dung, nếu bạn muốn giữ  commit nào, thì sửa `pick` của các commit còn lại thành `f`
        * pick 6e43b7c commit one
        * f ba64718 commit two
        * f 104c487 commit three
    * Step 3 : Nhấn `Esc` -> `:qw` -> `Enter`để thực hiện lưu sửa đổi.
    * Step 4 : Dùng `git log --oneline` để kiểm tra, bây h bạn thấy chỉ còn `commit one`
* Mở rộng : Bây giờ mình muốn sửa nội dung `commit one` thành `commit abc`  thì làm sao?
    * Step 1 : làm tương tự như trên.
    * Step 2 : cũng làm như trên, nhưng `pick` trước commit được giữ lại sẽ sửa như sau :
        * r 6e43b7c commit one **changed**
        * f ba64718 commit two
        * f 104c487 commit three
    * Step 3 : Cũng làm như trên, nhưng sau đó nó ra tiếp tục 1 màn hình khác để chúng ta viết lại nội dung commit, chúng ta sửa  `commit one` thành `commit abc`  rồi lưu lại
    * Step 4 : Dùng `git log --oneline` để kiểm tra, bây h bạn thấy chỉ còn `commit one`
*  Ok, đến đây mình đã hoàn thành xong bài giới thiệt cơ bản 1 phần về git, chúc các bạn thành công!