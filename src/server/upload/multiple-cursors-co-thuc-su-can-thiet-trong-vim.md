Với những người từng sử dụng các editor như Sublime Text, Atom hoặc Visual Studio Code,... chuyển sang  sử dụng Vim như mình có lẽ đều từng thắc mắc rằng, trong Vim có cách nào có thể sử dụng `multiple cursors` (nhiều con trỏ cùng một lúc) được không. Điều đó là có thể, có một plugin cho Vim là [vim-multiple-cursors](https://github.com/terryma/vim-multiple-cursors) cho phép bạn bắt chước hành vi đó, tuy nhiên plugin này lại gặp một số vấn đề với Autocomplete. Autocomplete không hoạt động,  chúng không hiển thị danh sách các từ gợi ý khi sử dụng `vim-multiple-cursors`. Bài viết hôm nay sẽ mình sẽ trình bày cách sử dụng các chức năng tương tự với `multiple cursors` nhưng theo hướng **native** Vim nghĩa là chỉ sử dụng các key có sẵn của Vim, không cần phải cài thêm bất cứ plugin nào nữa.
|![](https://images.viblo.asia/c54511ca-475c-4ec0-988e-2cb9e35a83ff.gif)|
|:--:|
|`vim-multiple-cursors` không hoạt động với Autocomplete|

### Thay đổi một từ tại vị trí n
Đây là cách đơn giản nhất mà mọi người thường làm với `multiple cursors` trong Sublime Text hoặc Atom. Chúng ta tìm kiếm một từ, chọn từng từ muốn thay đổi theo cách thủ công và sau đó chỉnh sửa từng vị trí cùng một lúc.
Trong Vim chọn và chỉnh sửa được thực hiện trong cùng một bước với lệnh `gn`. Câu lệnh `gn` giúp tìm kiếm search pattern được sử dụng gần đây nhất. Các bước thực hiện sẽ được diễn ra như sau:
1. Tìm kiếm từ muốn thay đổi, vi dụ nếu ta muốn tìm `var` thì gõ `/var`
2. Thay đổi kết quả tìm kiếm đầu tiên bằng lệnh `cgn`
3. Di chuyển đến kết quả tìm kiếm tiếp theo lệnh `n` rồi dùng lệnh `.` để lặp lại thay đổi
![](https://images.viblo.asia/99e02241-f646-4117-a6ee-7206d1e90ebd.gif)

### Thay đổi một nhiều dòng liền nhau
Sẽ có nhiều trường hợp mà bạn muốn thay đổi một khối gồm các dòng trông giống nhau nằm liền nhau. Trong Vim, `visual-block` có thể được sử dụng cho các loại sửa đổi như thế này. Điểm đặc biệt của `visual-block` đó là, nếu bạn thực hiện thay đổi thì trước tiên các thay đổi chỉ được thực hiện cho dòng đầu, nhưng sau đó sẽ áp dụng cho tất cả các dòng sau khi bạn hoàn thành việc sửa đổi.
![](https://images.viblo.asia/b564dca6-caca-4ca2-9185-6e7aac3d5993.gif)

### Thực hiện các thay đổi phức tạp trên nhiều dòng
Khi bạn muốn thực hiện các thay đổi gồm nhiều bước và được lặp lại tương tự trên các dòng thì sử dụng  `macro` của Vim là một lựa chọn tuyệt vời. Bằng cách dùng `macro` ghi lại những thay đổi trên một dòng rồi sau đó chỉ cần gọi lại `macro` trên các dòng khác là bạn đã thực hiện các thay đổi tương tự trên nhiều dòng. Ban đầu, bạn có thể cảm thấy khó khăn khi tạo ra một `macro `chung phù hợp với từng dòng, nhưng có một vài lời khuyên giúp bạn dùng `macro` dễ dàng hơn:

* Đi đến đầu dòng là bước đầu tiên khi tạo `macro`, ví dụ như dùng lệnh `I` để về đầu dòng
* Điều hướng đến vị trí bạn muốn thay đổi bằng lệnh `f` hoặc `t`.
* Tránh sử dụng các phím mũi tên hoặc `h`, `j`, `k`, `l` vì không phải tất cả các hàng đều có cùng độ dài do vậy sẽ khiến `macro` chạy không như ý. Sử dụng `w`, `e`, `b` sẽ chính xác hơn.

![](https://images.viblo.asia/8f70f9a6-683d-4ea5-83b5-5042e158e65a.gif)

> Để gọi lại `macro` vừa được thực hiện lần cuổi bạn có thể gõ lệnh `@@`

### Thực thi `macro` trên toàn bộ file
Bạn có thể chạy `macro` cho tất cả các dòng mà chúng giống với regex pattern mà bạn đưa ra trong phạm vi toàn bộ file. Bạn cần phải vào chế độ lệnh của Vim bằng cách nhập `:` và sau đó sử dụng lệnh `global` (hoặc `g`).
![](https://images.viblo.asia/d08f2ddc-d2d1-4902-a815-323b93144dde.gif)
### Kết luận
Bài viết này đã cho thấy cách bạn có thể giải quyết các vấn đề với **native** Vim, không cần phải sử dụng thêm plugin nào cả. Lệnh `gn` giúp chúng ta trong các tình huống đơn giản. Nhưng để tăng tốc đáng kể năng suất của bạn, bạn nên học cách sử dụng `macro`, `macro` thực sự hữu dụng trong nhiều trường hợp 

Hi vọng bài viết sẽ giúp các bạn bổ sung thêm một số kỹ năng cần hữu ích khi làm việc Vim

### Tham khảo
https://medium.com/@schtoeffel/you-don-t-need-more-than-one-cursor-in-vim-2c44117d51db

http://vim.wikia.com/wiki/Copy_or_change_search_hit

http://vim.wikia.com/wiki/Macros