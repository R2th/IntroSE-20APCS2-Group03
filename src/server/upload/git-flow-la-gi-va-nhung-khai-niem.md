#### Mục tiêu
Bài viết muốn hướng đến người đọc nhận biết được khái niệm Git Flow và tính cần thiết của nó trong việc phát triển dự án.

#### Git Flow là gì ?
Git flow được hiểu như là 1 chu trình dùng để thực hành cũng như sử dụng Git. Ví dụ như là phương pháp tạo loại branch nào, những branch nào nên merge với nhau...

#### Vì đâu cần cân nhắc sử dụng Git Flow ??
Trường hợp nhiều dev cùng tham gia phát triển dự án trong 1 thời gian dài mà nếu rule hoạt động không được thống nhất và quyết định thì việc xảy ra conflict hay là miss khi merge là chuyện như cơm bữa. Bởi vậy để giảm thiểu miss khi sử dụng Git thì việc xem xét Git Flow là cần thiết.

#### Branch
Phân biệt 5 loại branch sau : master, release, develop, feature, hot-fix.

    * master
        là nhánh ở vị trí trên cùng, nơi chứa toàn bộ dữ liệu source của project. Ở nhành này thì không có quyền thay đổi source code.
        
    * develop
        nhánh phát triển cho mục đích release.
        
    * release
        nhánh tạo ra trước khi release, rất hạn chế chỉnh sửa ở nhánh này.
        
    * feature
        nhánh tạo ra dùng để giải quyết bug cũng như run những function cá biệt.
        
    * hot-fix
        nhánh dùng để fix bug gấp sau khi đã hoàn tất release.
        
##### Life cycle của Branch
    * Branch master, develop một khi đã được khởi tạo thì không được xóa.
    
    * Branch feature, release, hot-fix thì được tạo và xóa tùy theo mục đích sử dụng.
    
#### Merge
Là hành động gộp 2 branch lại với nhau.
##### Case
    
        Tạo branch hot-fix, kiểm tra xem đã fix bug chuẩn chưa rồi sau đó merge hot-fix vào master để release lên product.
        Command của `git merge` như sau:
        ```php
            $ git checkout master // branchのヘッドをmasterへ置く
            $ git merge hotfix     
         ```
     
##### Conflict
    Conflict là hiện tượng phát sinh xung đột code khi merge.
    
#### Pull
Lệnh `git pull` được sử dụng để tìm nạp và tải xuống nội dung từ remote repository và cập nhật local repository sao cho phù hợp với nội dung đó.

#### Pull Request
Được viết tắt là PR, là cái để dev chia sẻ cho member trong team về những thay đổi trong local repository của mình. Ở đó hiển thị nội dung thay đổi của source code, thông báo dự định merge. Hơn nữa có thẻ communication.

##### PR Process
    [Dev] bắt tay vào code function mới.
    [Dev] xong khi code xong thì push lên.
    [Dev] tạo 1 Pull Request.
    [Team Lead] confirm nội dung PR.
    [Team Lead] nếu không có vấn đề gì thì merge.
        Trường hợp khi confirm kết quả mà không cần merge thì có thể close.
        
#### Tổng kết.
Chúng ta đã tìm hiểu những khái niệm cơ bản của Git. Vẫn còn nhiều những khái niệm khác nhưng hẹn ở phần sau. Bài viết theo ý kiến chủ quan của người viết nên có thể có sai sót (bow).
Link tham khảo [Qiita](https://qiita.com/liten623jp/items/d870e13ada7718a442c0)