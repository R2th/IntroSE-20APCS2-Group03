*Ở bài viết trước mình đã có đề cập tới Plugin NerdTree ở cuối bài viết. NerdTree sẽ giúp cho Vim có thể xem được các tập tin, các thư mục trực tiếp mà không phải thoát ra ngoài. Bạn có thể tùy chọn mở các tệp này ra một TAB mới, thay thế với tệp đang mở hiện tại, phân chia theo chiều ngang/dọc với tệp hiện tại một cách nhanh chóng và có thể tạo bookmarks cho các dự án quan trọng của bạn.*

***Xem thêm***: [***Window function, pivot trong Spark SQL***](https://demanejar.github.io/posts/spark-sql-window-function-pivot/)
## Cài đặt NerdTree
Mình đã có đề cập tới việc cài đặt _NerdTree_ tại bài viết trước, bạn có thể tham khảo lại cách cài đặt ở bài viết [Cấu hình và cài đặt Vim từ A-Z](https://viblo.asia/p/cau-hinh-va-cai-dat-vim-tu-a-z-GrLZD1knlk0) nha.

Sau khi xong xuôi nhớ restart lại Vim để mọi thứ đi vào hoạt động.

## Sử dụng NerdTree
Để mở cây thư mục trong _NerdTree_ bạn có thể sử dụng phím `F3` để mở cây thư mục tại thư mục gốc hoặc sử dụng `F2` để mở cây thư mục tại vị trí thư mục hiện tại. Bạn cũng có thể sử dụng command `:NERDTree` để mở cây thư mục tại thư mục gốc ( cũng tương tự giống với phím `F3`)

![](https://i.pinimg.com/564x/f5/6d/a3/f56da3c3132f38c5887a186b51354b7e.jpg)

### Dưới đây là 1 số phím cơ bản khi sử dụng _NerdTree_: 
- Sử dụng các phím `hjkl` để di chuyển lên, xuống, trái, phải như bình thường
- Phím `o` để mở ra 1 file mới thay thế cho file hiện tại 
- Phím `t` mở ra 1 file mới trong 1 tab khác, và bạn có thể di chuyển qua lại giữa các tab bằng phím `TAB`
- Phím `i` chia cửa sổ làm 2 phần trên và dưới, file mới được mở sẽ nằm bên trên
- Phím `s` chia cửa sổ làm 2 phần trái và phải, file mới được mở sẽ nằm ở bên trái
- Phím `p` di chuyển con trỏ tới thư mục cha của thư mục hiện tại 
- Phím `r` để refresh lại thư mục 
- Để di chuyển qua lại giữa cây thư mục và tệp đang sử dụng tổ hợp phím: `Ctrl + W + W`

### Thêm, xóa, chỉnh sửa tên, copy file với _NerdTree_: 
Sử dụng phím `m` khi đó một danh sách các lựa chọn được hiện ra: 

![](https://images.viblo.asia/9f979052-5dfc-4114-8c8c-95ee3341b12c.png)

Bạn chọn `a`  để thêm file, `m` để di chuyển, `d` để xóa,...

Tham khảo: [https://catonmat.net/](https://catonmat.net/vim-plugins-nerdtree-vim), [https://stackoverflow.com/](https://stackoverflow.com/)

Liên kết: [https://www.tailieubkhn.com/](https://tailieu-bkhn.blogspot.com/)