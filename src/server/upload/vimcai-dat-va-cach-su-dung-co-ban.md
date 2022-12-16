## Lời nói đầu
- Mình đang định viết thêm bài để bổ sung thêm vào [loạt bài viết về PHP và Laravel 5.5](https://viblo.asia/s/hoc-php-va-laravel-55-WrZngQVnlxw), nhưng không biết là do có quá nhiều thứ cần viết hay do nó quá nhiều thứ gây hứng thú với mình nên mình không biết bắt đầu từ viết từ đâu. Nên mình quyết định sẽ viết thêm sau về PHP và Laravel 5.5,  và tạo một loạt bài viết mới về Vim .
- Mình còn hứng thú về regex và định viết thêm một loạt bài về regex.
- Dự định thì có rất nhiều, nhưng làm được bao nhiêu. 

## Tại sao NÊN dùng Vim 
- Vì vim *KHÓ SỬ DỤNG*
- Vì vim có *GIAO DIỆN KHÔNG THÂN THIỆN VỚI NGƯỜI DÙNG*
- Vì vim *KHÔNG HỖ TRỢ NGÔN NGỮ LẬP TRÌNH* 
- Vì vim , à *Vim là cái gì nhỉ* :question:

## Vim là gì?
-  Vim là một text-editor được dùng khá phổ biến. 
-  Vim có khả năng tùy biến cao, có rất nhiều hiệu ứng tốt. Trong vim, bao gôm "vi" là một text-editor của hầu hết các hệ thống UNIX và Apple OS X. Nghĩa là nếu bạn đã dùng Vi trước đó, hãy ôm tất cả những thứ bạn sử dụng ở vi lôi ra sử dụng khi dùng Vim vẫn rất :ok: 
-  Vim vẫn đang được phát triển để ngày một tốt hơn. Ngoài ra, một số tính năng đáng chú ý của Vim được biết đến và công nhận như:
    + Hoạt động kiên trì, bền bỉ, liên tục. Có khả năng *hoàn tác* ở nhiều cấp độ khác nhau. 

    + Có hệ thống plugin nhiều và hữu ích

    + Hỗ trợ hàng trăm ngôn ngữ lập trình khác với với những định dang file format khác nhau. 

    + Hỗ trợ tìm kiếm và thay thế rất *mạnh mẽ* 

    + Có rất nhiều tools hỗ trợ. 

Vậy, chúng ta có rất nhiều lý do **NÊN** dùng Vim. Việc không nên dùng Vim là do sự thiếu hiểu biết của chúng ta về Vim, và cũng do sự khó khăn của chúng ta khi bắt đầu sử dụng Vim. 
Thực tế, tại sao chúng ta nên dùng VIM? 

## Lý do thực tế chúng ta nên dùng Vim 
- Lý do đầu tiên, có lẽ là khi chúng ta ngầu hơn trong mắt những người khác, kể cả những người đồng nghiệp. Trông chúng ta có vẻ nguy hiểm hơn. Nghe có vẻ giống **hách cơ** hơn. 
- Nếu sử dụng Vim tốt, chúng ta sẽ sử dụng được tối đa thời gian trên bàn phím, không mất tay vào việc di chuyển bàn tay từ bàn phím sang chuột và ngược lại. 
- Các tùy chọn của Vim rất linh hoạt, khi có sự hiểu biết về Vim, chúng ta có rất nhiều, rất nhiều điều có thể làm với Vim. 
## Khó khăn khi bắt đầu sử dụng Vim. 
- Chúng ta sẽ không đề cập những kiến thức cao siêu như cài đặt các tùy chọn của Vim như thế nào, hay tùy biến Vim như nào cho đẹp, hoặc cách cài Plugin hay linh tinh khác. Những cái đó dường như quá xa vời với người bắt đầu với Vim. 
- Việc khó khăn khi bắt đầu sử dụng Vim là chúng ta sẽ không có khái niệm dùng chuột khi soạn thảo văn bản với Vim. Mục đích sử dụng của Vim là tăng hiệu xuất sử dụng bàn phím , và không mất thời gian để di chuyển từ bàn phím ra chuột và ngược lại, như vậy, Vim được thiết kế để làm sao mọi việc chúng ta có thể sử dụng bàn phím để thực hiện. **HÃY QUÊN VIỆC SỬ DỤNG CHUỘT KHI BẮT ĐÀU HỌC SỬ DỤNG VIM**. 
- Có quá nhiều thứ cần phải nhớ khi bắt đầu sử dụng Vim. Các bộ tổ hợp phím, các lệnh...etc. Nếu không thực hành thường xuyên, đôi khi chúng ta cũng quên mất. 
- Bài viết này chúng ta không cần hiểu cái gì cả, không cần nhớ cái gì cả. Chúng ta bắt đầu với xuất phát điểm là thực hành một số các thao tác cơ bản của Vim để khơi lên lòng tò mò của chúng ta về Vim, để chúng ta có hứng thú với Vim. Chỉ vậy thôi.

## Cài đặt Vim 
### Cài đặt Vim trên Ubuntu (UNIX)
```
    sudo apt-get update
    sudo apt-get install vim
```
Kiểm tra vim đã được cài đặt thành công hay chưa
```
vim -v
```
  ### Cài đặt Vim trên Apple OS X
- Trên mac, chúng ta có macVim. Hãy coi đó là vim, vì chúng ta chỉ cần một thứ mà chúng ta có thể thực hành những thứ cơ bản thôi. Thập chí chúng ta có thể sử dụng vi cũng được. 
- Bước 1 : cài đặt homebrew theo [hướng dẫn](https://brew.sh/)
- Bước 2: Chạy trên terminal
    ```
    brew update 
    ```
- Bước 3: Cài đặt vim và macvim 
    ```
    brew install vim && brew instal macvim
    ```
- Bước 4:  
    ```
    brew link macvim
    ```
### Cài đặt trên Windows 
-  Để thực hành vim trên Windows, chúng ta hãy cài neoVim. Chỉ là thực tập các thao các bản với Vim thì Neo vim là một lựa chọn không tồi. 
-  Bước 1: Chọn package neovim [nvim-win32.zip](https://github.com/neovim/neovim/releases/download/v0.2.2/nvim-win32.zip) hoặc [nvim-win64.zip ](https://github.com/neovim/neovim/releases/download/v0.2.2/nvim-win64.zip)
-  Bước 2: Giản nén unzip ở bất cứ đâu
-   Bước 3: Mở thư mục và double-click vào nvim-qt.exe 


## Thực hành các thao tác Vim 
- Vì để sử dụng vim thành thạo, sử dụng ở đây là ở mức cơ bản, chúng ta cũng phải mất thời gian cho việc thao tác từng phím và từng bộ tổ hợp phím nhiều lần mới có thể sử dụng quen thuộc được. 
- Giờ chúng ta hãy coi vim là một text editor như microsoft word, hay notepad để viết text vào mà thôi, chứ nó chưa được coi là một IDE. 
- Để bắt đầu, chúng ta có thể tìm tới các[ cheat sheet](http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html) về vim để thực hành và ghi nhớ dần dần.

![vi/vim lession 1](https://images.viblo.asia/46a0aecf-ab2c-43f2-af63-37d519e6434c.jpg)

### Basic
- h, j, k , l là những phím di chuyển của vi. sử dụng nó để di chuyển con trỏ
  chuột trên file. hãy thực hành để biết rằng, h là sang trái một ký tự, l là
sang phải một ký tự, j là xuống 1 dòng, k là lên một dòng. 
- ấn i để vào insert mode, tại vị trí con trỏ đang để, bạn có thể nhập text từ
  vị trí đó. Ấn ESC để trở lại normal mode. 
- Ấn x để delete một ký tự tại vị trí con trỏ chuột, ân X để delete một ký tự
  bên trái con trỏ chuột.
- Ấn A để chèn text vào cuối của dòng. 
### Extras:
- Ấn u để hoàn tác action trước đó. Vi truyền thống thì chỉ có một cấp độ hoàn
  tác mà thôi, trong khi Vim hỗ trợ không giới hạn mức độ hoàn tác. Thường để
là 10 level, tức là hoàn tác được 10 hành động trước đó. Ấn Ctrl-R để thực
hiện việc re-do
- 0 để di chuyển con trỏ chuột đến bắt đầu một dòng. Ấn  *$*  để di chuyển con trỏ
  đến cuối dòng, và ^  đến ký tự không phải blank đầu tiên.
- Sử dụng w để đến kỳ tự đầu tiên của từ tiếp theo. sử dụng W để đến ký tự
  đầu tiên của từ tiếp theo(một từ trong W là ký tự không phải blank)
- sử dụng b để di chuyển con trỏ chuột đến từ ký tự đầu tiên của từ trước đó,
  sử dung B để làm điều tương tự với những ký tự kiểu foo($x).
- Sử dụng e để di chuyển đến ký tự cuối cùng của từ tiếp theo. Sử dụng E với
  nội dung tương tự B. 
- Sử dụng R để vào insert mode overwrite.
- Sử dung lệnh :w để lưu và :q để thoát (trong chế độ normal mode)

## Kết thúc. 
- Ở bài viết này, chúng ta tập làm quen với Vim, những khái niệm ban đầu và sử dụng vim như một text-editor thông thường. 
- Ở bài viết tiếp, mình sẽ giới thiệu các phần khác, để sử dụng vim một cách hiệu quả hơn.