*Gợi ý hay là tự động hoàn thành code chắc chắn sẽ giúp cho lập trình viên viết code nhanh hơn và tránh việc phải nhớ chi li tên từng biến, hàm, thuộc tính để có thể tập chung vào các vấn đề khác nhiều hơn. Khi chọn IDE hay các Text Editor thì việc IDE có hỗ trợ gợi ý code hay Text Editor có các Plugin hỗ trợ gợi ý code hay không chắc chắn luôn là lựa chọn hàng đầu của các bạn. Vim cũng vậy, đối với mỗi ngôn ngữ thì sẽ có những Plugin khác nhau để giúp gợi ý code trên Vim nhưng Coc.nvim là một công cụ tuyệt vời và hỗ trợ nhiều ngôn ngữ.*

***Xem thêm***: [***Window function, pivot trong Spark SQL***](https://demanejar.github.io/posts/spark-sql-window-function-pivot-part-2/)
## Cài đặt
**Github coc.nvim: [https://github.com/neoclide/coc.nvim](https://github.com/neoclide/coc.nvim)**

Tại file _init.vim_ thêm dòng sau: 
```
" Use release branch (recommend)
Plug 'neoclide/coc.nvim', {'branch': 'release'}
```
Sau đó mở vim lên chạy `:PlugInstall` để vim tải lại các Plugin được định nghĩa trong file _init.nvim_

Cài đặt phần mở rộng  _coc_ để hỗ trợ LSP: 
```
:CocInstall coc-json coc-tsserver
```

_Lưu ý_: Nếu các bạn chưa biết file _init.nvim_ là gì và sao có được nó thì xem lại bài viết [Cấu hình và cài đặt Vim từ A-Z](https://viblo.asia/p/cau-hinh-va-cai-dat-vim-tu-a-z-GrLZD1knlk0) nha.

## Sử dụng Coc.nvim
Bây giờ đối với từng ngôn ngữ bạn sử dụng bạn chỉ cần cài thêm các extension tương ứng để _Coc_ hỗ trợ gợi ý code cho bạn. Ví dụ nếu bạn muốn cài bộ gợi ý code cho ngôn ngữ python thì bạn chạy lệnh:
```
:CocInstall coc-python
```

Khởi động lại _vim_, tạo 1 file _demo.py_ và kiểm tra thử bạn sẽ có được kết quả: 

![Screenshot from 2021-08-08 23-55-05.png](https://images.viblo.asia/e2145a2f-6752-43df-ad5d-abeba78787ee.png)

Để xem thêm extension tương ứng với từng ngôn ngữ bạn có thể tham khảo tại [https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions) (ở phần cuối của trang web nha):

![Screenshot from 2021-08-09 00-01-22.png](https://images.viblo.asia/900d804e-8e3d-4db6-9ea9-c08c80a96e78.png)

_Lưu ý_: Khi bạn cài coc.nvim có thể sẽ bị xung đột với những bộ gợi ý khác được định nghĩa sẵn trong _init.vim_. Lúc đó Vim sẽ báo lỗi này cho bạn biết và hãy tìm tới nơi định nghĩa các Plugin này trong _init.nvim_ và xóa chúng đi nha.

Tham khảo: [https://vimawesome.com/](https://vimawesome.com/plugin/coc-nvim), [https://github.com/](https://github.com/neoclide/coc.nvim)

Liên kết: [https://www.tailieubkhn.com/](https://tailieu-bkhn.blogspot.com/)