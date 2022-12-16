<div align="center">
    
# Lời mở đầu
    
</div>

- Nghe cái tên `Vim` chắc nhiều bạn sẽ nghĩ đến sản phầm giúp diệt 99,9% vi khuẩn nhưng mà khoan đã: "**Đây là Viblo- blog chia sẻ kiến thức công nghệ thông tin mà, Vim thì liên quan gì ở đây???????**"
- Câu trả lời là có, nhưng không phải `Vim` mà bạn đang nghĩ đâu :grinning::grinning::grinning::grinning:

![](https://images.viblo.asia/a874f7e2-04e0-49cf-8759-502cced687a6.png)


<div align="center">
    
# Nội dung
    
</div>

<div align="center">
    
## Vim là gì?
    
</div>

- Theo như định nghĩa trên wikipedia thì: 
>>> **Vim** - viết tắt của từ **Vi IMproved** là một bản sao, với một số bổ sung, của trình soạn thảo vi của Bill Joy cho **Unix**. Nó được viết bởi Bram Moolenaar dựa trên mã nguồn của một port của Stevie editor lên Amiga và phát hành lần đầu vào năm 1991.

- Khi bạn sử dụng các hệ điều hành dựa trên Unix (nếu vẫn đang thấy hoang mang giữa các khái niệm Unix/Linux/... thì bạn có thể nghiên cứu bài viết [này](https://viblo.asia/p/become-a-superuser-part-0-unix-vs-linux-nguon-goc-va-su-khac-biet-rNkKxxMAKlm) nhé) thì việc phải thao tác với **CLI** (**command-line interface**) giống như cơm bữa vậy. Và Vim là một công cụ tuyệt vời để làm điều đó.

<div align="center">
    
## Tại sao lại cần sử dụng Vim?
    
</div>

- Nếu chỉ là một editor thì Ubuntu (hay những hệ điều hành dựa trên Unix) đã có sẵn `nano` rồi mà, tại sao lại phải cài đặt thêm `Vim` nữa?
- Ưu điểm của Vim: 
    - Mọi thao tác đều có thể thực hiện thông qua các phím tắt mà không cần dùng tới chuột (nhưng nó cũng dẫn đến khuyết điểm là số lượng phím tắt khổng lồ cần nhớ, nên nếu bạn muốn kiểu mì ăn liền thì chắc Vim không dành cho bạn đâu :laughing::laughing:)
    - Tốc độ khởi động nhanh (cái này sẽ thấy rõ hơn khi ssh vào server thay vì sử dụng ở máy tính cá nhân)
    - ...
- Mỗi ứng dụng đều có những điểm mạnh và điểm yếu riêng của mình, và trong lĩnh vực công nghệ thông tin nói chung thì quan điểm của mình là "***Không có gì là tốt nhất, chỉ có phù hợp nhất mà thôi***", vì vậy việc lựa chọn sử dụng `Vim` hay `nano` là tùy thuộc vào bản thân bạn, chắc sắp tới mình sẽ viết một bài so sánh giữa `Vim` và `nano` để các bạn mới tìm hiểu sẽ dễ dàng đưa ra quyết định hơn.

<div align="center">
    
## Cài đặt
    
</div>

- Chỉ với 2 câu lệnh cơ bản, bạn đã có thể cài đặt và sử dụng Vim: 

    ```bash
    sudo apt update
    sudo apt-get install vim #hình như từ Ubuntu 18.04 là chỉ cần `apt` thôi chứ ko phải `apt-get` nữa
    ```

- Sau khi cài đặt xong, bạn gõ câu lệnh `vim` trên CLI thì sẽ thu được hình ảnh giống như bên dưới.
 
    ![](https://images.viblo.asia/490190c0-32f0-4b29-b5d3-9c74840e66b1.png)


<div align="center">
    
## Những thao tác cơ bản
    
</div>

### 1. Các chế độ của Vim

- Vim mang đến cho người dùng **7 CHẾ ĐỘ**, bao gồm: `normal`, `insert`, `visual`, `replace`, `Ex-mode`, `select`, `command-line`. 
- Sợ chưa? Nhưng đừng từ nản vội, có **3** chế độ thường được sử dụng hơn cả, vì thế cứ tạm gác 4 chế độ còn lại đã.
    - `Normal`: Chế độ này cho phép bạn có thể sử dụng các câu lệnh, được bắt đầu bằng dấu `:` hoặc các phím tắt (đây là chế độ mặc định khi bạn vừa khởi động Vim)
    - `Insert`: Chế độ cho phép bạn chỉnh sửa, thao tác với văn bản tương tự như các trình biên soạn khác bằng cách gõ các kí tự.  Để chuyển sang chế độ này từ chế độ `Normal`, bạn có thể ấn phím `A` hoặc `i`, `I`, `o`, `O`, `a` (vì sao lại có nhiều nút cùng để chuyển sang chế độ Insert thế, câu trả lời sẽ nằm ở đằng sau). Ở chế độ này sẽ có ký hiệu **-- INSERT --** ở góc trái dưới CLI.
    
    ![](https://images.viblo.asia/9fb3b2e7-4a3a-4900-8223-d92b27bb2e9a.png)

    - `Visual`:  Chế độ này tương tự chế độ `Normal` nhưng cho phép bôi đen đoạn văn bản để thao tác. Để chuyển sang chế độ này, bạn có thể gõ phím `v`. Ở chế độ này sẽ có ký hiệu **-- VISUAL --** ở góc trái dưới CLI.
    
    ![](https://images.viblo.asia/3a014ac0-c5ac-4f37-8086-12c7c8544d4b.png)

    
### 2. Mở file
- Bạn có 2 cách để mở 1 file với Vim:
    - Mở file ngay khi khởi động Vim: 
        ```bash
        vim `path-to-file`
        ```
    - Khởi động Vim với câu lệnh `vim`, rồi sử dụng một trong những câu lệnh sau để mở file (khá là cồng kềnh phải không nào): `:edit`, `:open`, `:tabedit`, `:split`, `:vsplit`.

### 3. Các thao tác trong file 
- Từ đây bắt đầu phức tạp rồi này, cứ bình tĩnh bạn nhé:

#### Di chuyển con trỏ: 
- Nếu bạn đã từng sử dụng `vi` thì chắc hẳn bạn cũng biết các phím để di chuyển con trỏ gồm `h (trái)`, `j (dưới)`, `k (trên)`, `l (phải)`. 
- Và `Vim` là Vi IMproved nên thao tác này cũng được thay đổi để trực quan hơn với 4 phím điều hướng (←, ↓, ↑, →).
- Nếu chỉ di chuyển trong 1 dòng hoặc file ngắn thì việc sử dụng phím điều hướng là đủ, nhưng với 1 file lớn hơn thì sao? Chả nhẽ ngồi giữ phím điều hướng à? Rất may câu trả lời là không. 
    - `:<số-dòng>`: để di chuyển con trỏ đến dòng tương ứng
    - `0`: di chuyển con trỏ đến đầu dòng hiện tại
    - `:0`: di chuyển con trỏ đến dòng đầu tiên của file
    - `$`: di chuyển con trỏ đến cuối dòng hiện tại
    - `:$`: di chuyển con trỏ đến dòng cuối cùng của file
    - `:/<từ-cần-tìm>`: để di chuyển con trỏ đến vị trí của từ khóa cần tìm ở trong file. 
    - `v + phím điều hướng`: bôi đen đoạn text.
    - `y`: copy đoạn text đang bôi đen
    - `p`: paste đoạn text đang được copy
    
#### Chèn
- Đây sẽ là câu trả lời cho bạn vì sao lại có tới 6 phím để chuyển từ chế độ `Normal` sang `Insert`, bởi vì mỗi 1 phím khác nhau thì việc thực thi sẽ khác nhau:
    - `i`: con trỏ sẽ ở vị trí hiện tại
    - `I`: con trỏ sẽ ở đầu dòng hiện tại
    - `a`: con trỏ sẽ ở ngay sau vị trí hiện tại 1 kí tự
    - `A`: con trỏ sẽ ở cuối dòng hiện tại
    - `o`: thêm một dòng bên dưới dòng hiện tại và đặt con trỏ tại dòng này
    - `O`: thêm 1 dòng bên trên dòng hiện tại

#### Xóa
- Sau khi thêm thì đến mục bớt nào :D 
    - `x`: xóa một ký tự ở vị trí hiện tại
    - `dw`: xóa một từ tính từ vị trí con trỏ hiện tại (xóa cả các dấu cách)
    - `d` hoặc `dd`: xóa cả dòng hiện tại
    - `d$`: xóa hết dòng tính từ vị trí hiện tại của con trỏ
    - `d{số-dòng}`: xóa số dòng bằng giá trị {số-dòng} tính từ dòng hiện tại.

#### Undo (hoàn tác)
- Bạn không thế đảm bảo tất cả những thay đổi của bạn đều chính xác 100%, vì vậy mọi editor đều cho bạn cơ hội để `đi lại`, và `Vim` cũng không ngoại lệ. Thay vì phím tắt `Ctrl + Z` quen thuộc của nhiều editor thì `Vim` sử dụng `u` hoặc `Ctrl + R`.

#### Lưu file/thoát
- Sau khi thêm/sửa/xóa file xong thì tất nhiên bạn sẽ cần thoát ra để thực hiện tác vụ khác, còn có lưu hay không thì tùy bạn ^^
    - `:w`: lưu file mà ko thoát file
    - `:wq` hoặc `:x`: lưu và thoát file
    - `:q`: thoát file
    - `:q!`: thoát mà không lưu file (nếu bạn sửa file mà chưa `:w` để lưu mà dùng `:q` thì sẽ có thông báo như ảnh bên dưới, hoặc là bạn lưu lại rồi mới thoát, hoặc dùng `:q!` để thoát mà không lưu lại những thay đổi này)
    
    ![](https://images.viblo.asia/96450b8b-a890-4041-a560-527d2096177d.png)
    
    - `:qa`: thoát tất cả các file đang mở

- Trên đây cũng khá là đầy đủ các thao tác để bạn có thể làm việc với một file bằng Vim rồi.
- Nếu như bạn đã thành thạo những thao tác cơ bản này thì có thể tham khảo thêm những phím tắt hay command hữu dụng của `Vim` bằng cách sử dụng câu lệnh `:help` nhé.

<div align="center">
    
# Tổng kết
    
</div>

- Trong phạm vi bài viết này, mình chỉ có thể cung cấp những thao tác cơ bản nhất để các bạn có thể bắt đầu sử dụng được Vim, và cũng giống như việc học một thứ ngoại ngữ mới, "trăm hay không bằng tay quen",  hãy tập luyện thường xuyên để sử dụng thành thạo được công cụ cực kỳ hữu dụng này nhé.
- Cảm ơn các bạn đã dành thời gian theo dõi bài viết, nếu có bất cứ vấn đề gì về nội dung bài viết, hãy comment góp ý xuống dưới bài viết để mình chỉnh sửa hoặc giải đáp cho các bạn nhé.

<div align="center">
    
# Tài liệu tham khảo
    
</div>

- Vim repository: https://github.com/vim/vim
- Viblo: https://viblo.asia/tags/vim
- 1 trang tutorial khá hay để luyện Vim (được 1 bác trên FB chia sẻ): https://www.openvim.com/