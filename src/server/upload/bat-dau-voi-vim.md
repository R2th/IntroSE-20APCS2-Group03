# 1. Mở đầu
Đã nghe tới cái tên Vim từ rất lâu thông qua quảng cáo nước rửa bồn cầu trên tivi. Tuy nhiên trong bài viết không nhằm tới mục đích quảng cáo cho sản phẩm trên :). Nhân vật chính trong bài viết này cũng là VIM nhưng trên cương vị là một Text Editor được nhiều lập trình viên yêu thích và cũng có cả một cộng đồng đông đảo người ghét :D

# 2. Lý do để sử dụng VIM
Như đã đề cập ở trên VIM là một Text Editor, công việc của nó là giúp bạn soạn thảo các văn bản . Nếu chỉ có vậy điều gì làm cho VIM nổi trội trong giới lập trình viên.

* **Tốc độ nhanh:** Vim giữ được ưu điểm của Text Editor so với các IDE đó là nhanh, gọn, nhẹ. Chắc hẳn khi sử dụng các IDE mọi người đều khá khó chịu mỗi khi khởi động chương trình để bắt đầu vào làm việc. Đó là một trong những nguyên nhân chủ yếu khiến cho nhiều lập trình viên chuyển qua sử dụng các Text Editor thay vì các IDE cho công việc của họ.
*  **Chế độ điều khiển đặc biệt:** Điểm mạnh của VIM so với các editor khác ở chỗ nó có thể phát huy được tối đa năng lực của bàn phím, mọi thao tác đều được sử dụng bằng bàn phím mà không cần sử dụng tới chuột giúp bạn tập trung hơn và nâng cao tốc độ thao tác, ngoài ra việc này giúp cho bạn hạn chế được những tình huống loay hoay trong việc tìm kiếm con trỏ chuột trên màn hình mà mình thường gặp phải :). Khi đã quen với việc sử dụng VIM tốc độ thao tác của bạn sẽ được nâng cao một cách tối ưu nhất. Đây là một tính năng độc đáo, mạnh mẽ mà các editor khác đang phải học hỏi. Các editor như SublimeText, ... đã có những plugin giúp người sử dụng soạn thảo dưới chế độ của VIM. 
*  **Khả năng tùy biến cao :** Với VIM bạn hoàn toàn có thể cá nhân hóa editor của mình bằng việc tự config mọi thứ trong file `.vimrc`.
*  **Một cộng đồng sử dụng lớn với nhiều plugin mạnh mẽ:** Vim có một cộng đồng lớn trên toàn thế giới và một kho plugin khổng lồ được phát triển trong một thời gian dài.
*  **Làm màu:** Đây là động lực đầu tiên để giúp mình tìm hiểu VIM. Vì VIM là một editor khó để làm quen nên bạn sẽ có vẻ vô cùng chuyên nghiệp và "nguy hiểm" nếu có thể sử dụng nó thành thạo tới một mức nào đó :P.

# 3. Làm quen với VIM
## 3.1. Cài đặt
Vim được tích hợp sẵn trong các phiên bản của Linux. Tuy nhiên nếu có thể các bạn hãy sử dụng `NeoVim`. NeoVim là một phiên bản mở rộng của VIM, nó hoàn toàn có thể tương thích với các cài đặt cũ mà bạn đã sử dụng với VIM. Điểm đặc biệt của NeoVim là khả năng chạy asynchronous cho các plugins. Điều này cho phép các plugins chạy nhanh hơn vì nó được thực hiện trên 1 thread khác, và nhiều plugins cùng chạy một lúc là điều khả thi. Ngoài ra NeoVim hỗ trợ `true-color` giúp cho code đẹp hơn, dễ nhìn hơn. Việc cài đặt NeoVim bạn có thể thực hiện trên Ubuntu như sau:
> sudo add-apt-repository ppa:neovim-ppa/stable
> 
>sudo apt-get update
>
>sudo apt-get install neovim


## 3.2. Khởi động và làm quen
Để khởi động NeoVim bạn hãy vào Terminal và gõ lệnh:
>nvim ten_file

Một cửa sổ hiện lên như sau:

![](https://images.viblo.asia/285c1bde-84f6-43e6-b61d-7643b07abaf0.png)

**Một số thao tác cơ bản trong VIM:**

Trong VIM có 3 mode thường xuyên được sử dụng là:
* `normal` : là mode mặc định khi khởi động và được quay trở lại khi đang ở mode khác bằng phím `Esc`. Mode này được sử dụng để di chuyển và thao tác trong đoạn văn bản.
* `insert`: được sử dụng để thêm một đoạn văn bản.
* `visual`: là mode sử dụng để bôi đen và thao tác trên đoạn bôi đen đó. 

Di chuyển con trỏ sử dụng các phím:

* `h`: Di chuyển con trỏ sang bên trái
* `l`: Di chuyển con trỏ sang bên phải
* `j` Di chuyển con trỏ xuống dưới
* `k` Di chuyển con trỏ lên trên

-----

* `$`: Di chuyển con trỏ về cuối dòng hiện tại
* `0`: Di chuyển con trỏ về đầu dòng hiện tại

-----
* `gg`: Di chuyển về đầu file
* `G`: Di chuyển về cuối file

Chỉnh sửa nội dung văn bản: 

* `i`: Mở insert mode để thêm văn bản
*  `v`: Mở visual mode và sử dụng các phím di chuyển để bôi đen đoạn văn bản
*  `x`: Xóa ký tự ở vị trí con trỏ

Lệnh lưu và thoát:
* `:q`: Thoát khỏi VIM
* `:q!`: Thoát không cần lưu
* `w`: Lưu văn bản
* `wq`: Lưu và thoát

    
Để bắt đầu làm quen với VIM bạn có thể thực hành với Tutorial được tích hợp sẵn trong VIM bằng cách thực hiện lệnh `:Tutor` trong cửa sổ của VIM

![](https://images.viblo.asia/23bb9bca-fe67-4edb-8172-7826d91d7f51.png)

# 4. Tùy biến VIM
## 4.1. Tùy biến với `.vimrc`
VIM có khả năng tùy biến mạnh mẽ để phù hợp với mục đích sử dụng của người dùng. Ta có thể thay đổi các cài đặt của VIM thông qua qua việc thêm các cài đặt vào trong file `.vimrc` tại đường dẫn `~/.vimrc` nếu không có bạn có thể tự tạo. Có vô số các option cho bạn lựa chọn để biến VIM trở thành một công cụ soạn thảo tuyệt vời. Tuy nhiên bạn cần phải bỏ ra một khoảng thời gian tìm hiểu kha khá để có thể tùy biến VIM theo như những gì mình mong muốn.

Có khá nhiều người chia sẻ các cài đặt của họ trên github. Bạn có thể tìm đọc và chọn lựa sao cho phù hợp với mục đích sử dụng.
## 4.2. Sử dụng các Plugin
Do có một cộng đồng sử dụng lớn nên số lượng các Plugin của VIM là khổng lồ với nhiều những tiện ích. Một cách thủ công để cài đặt các plugin là pull mã nguồn từ repo github của các plugin đó về và chép vào thư mục `~/.vim/bundle`. Ngoài ra có một cách thuận lợi và phổ biến hơn đó là sử dụng các hệ thống quản lý plugin cho VIM như `Vim-Plug`, `Pathegon`, `Vundle`, ... Bạn có thể tham khảo việc cài đặt và sử dụng chúng tại đây:
* [Vim-Plug](https://github.com/junegunn/vim-plug#installation)
*  [Pathengon](https://github.com/tpope/vim-pathogen)
*   [Vundle](https://github.com/VundleVim/Vundle.vim)

Một số các plugin mình sử dụng:

[NERDTree](https://github.com/scrooloose/nerdtree): Cho phép hiển thị cây thư mục trong VIM

[Ctrlp.vim](https://github.com/kien/ctrlp.vim): Đây là một plugin vô cùng hữu ích cho việc tìm kiếm và di chuyển giữa các file một cách nhanh chóng thông qua tên file. Plugin hỗ trợ tìm kiếm bằng thuật toán `FuzzySearch` mang lại sự tiện dụng trong việc tìm kiếm. Việc bạn cần làm là nhấn tổ hợp phím `Ctrl+P` và nhập vào tên file mà bạn muốn đi tới và chọn nó.
![](https://images.viblo.asia/be21a471-3979-4d8a-9ef6-70f8ba74d932.png)

[vim-airline](https://github.com/vim-airline/vim-airline): Plugin này giúp hiển thị thêm nhiều thông tin phía dưới màn hình như định dạng file hiện tại, encoding của file, vị trí hiện tại của con trỏ trong file, ...và quan trọng hơn cả là nó làm cho VIM của mình đẹp hơn :P.


**P/s:** Bonus cho ai muốn làm màu với thư viện [Theme](http://vimcolors.com/) dành cho VIM.

# 5. Tổng kết
Bài viết nhằm mục đích giới thiệu, chia sẻ cơ bản về VIM. Việc làm quen với VIM khá khó đối với người mới bắt đầu, tuy nhiên bạn sẽ cảm thấy thú vị khi đã dần quen với công cụ soạn thảo tuyệt vời này. Thế giới của VIM rất rộng lớn để bạn có thể khám phá, nắm bắt và làm chủ được sức mạnh của nó. Rất mong bài viết có thể giúp đỡ các bạn đang muốn làm quen với VIM. Hãy cùng khám phá các tính năng đặc sắc của VIM trong những bài viết sau. :)