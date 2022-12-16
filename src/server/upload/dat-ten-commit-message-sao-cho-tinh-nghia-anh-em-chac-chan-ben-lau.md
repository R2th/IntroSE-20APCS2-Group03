<div align="center">
    
# Lời mở đầu
    
</div>

- Chắc hẳn anh em coder đã không còn lạ lẫm gì với workflow và các command thông thường trong quá trình làm việc với Git phải không nào (còn nếu bạn mới bắt đầu tìm hiểu và chưa biết gì về git, hãy thử xem qua [bài viết này](https://viblo.asia/p/bat-dau-voi-github-4dbZNogvlYM)).
> CHÚ Ý: Đừng nhầm lẫn 2 khái niệm git và github nhé, nó không phải là 1 đâu, **Git** là **phần mềm quản lý mã nguồn**, còn **Github** là **dịch vụ lưu trữ trực tuyến sử dụng git**. 

- Và trong quá trình sử dụng Git, mình trước đây (và có thể nhiều bạn cũng) thường đặt tên commit một cách tùy hứng và nghĩ rằng nó không ảnh hưởng gì đến project thì hãy nhớ rằng không chỉ có 1 mình bạn làm project đó. Vì vậy, để cho "**tình nghĩa anh em**" được bền lâu thì hãy tập thói quen viết tên commit theo chuẩn, chứ đừng viết mấy cái commit message `first commit`, `last commit` như hình bên dưới nhé.

![](https://images.viblo.asia/f71bdda6-90f3-4c01-b701-3397c270657b.png)

<div align="center">
    
# Nội dung
    
</div>

<div align="center">
    
## Vì sao nên sử dụng Conventional Commits?
    
</div>

- Trước khi bắt đầu sử dụng một kỹ thuật/công cụ mới thì chắc hẳn các bạn sẽ tự hỏi liệu nó có ưu điểm gì nổi bật khiến cho bạn nên sử dụng nó. Và dưới đây là những ưu điểm khi sử dụng conventional commits (quy tắc viết commit, nó cũng giống như coding convention của các ngôn ngữ lập trình thôi),  không chỉ có lợi cho bạn mà cho cả những người khác nữa:
    - Đầu tiên, và quan trọng nhất (đối với mình): là nó giúp cho những người làm cùng dự án có thể dễ dàng nắm bắt được công việc chỉ bằng cách nhìn vào danh sách commit (chức năng nào đã làm rồi, bug nào đã được fix), từ đó có thể contribute một cách chính xác, nhanh chóng.
    - Giúp có thể tự động đánh số phiên bản và sinh CHANGELOGs (có thể sử dụng công cụ [Semantic release](https://github.com/semantic-release/semantic-release))
    - Thông báo giữa các thành viên trong nhóm, các bên liên quan hoặc public cho cộng đồng về thay đổi của commit
    - ...
    
<div align="center">
    
## Cấu trúc của một commit message
    
</div>

- 1 commit message theo chuẩn conventional commits  sẽ có cấu trúc như sau 
    ```bash
    # [] là phần tùy chọn, có thể có hoặc không, <> là phần bắt buộc 
    <type>[optional scope]: <description>

    [optional body]

    [optional footer(s)]
   
    ```

    + `type`: ngoài 2 loại chính là `fix` và `feat` ra thì cũng có thêm một số loại khác
        + **fix**: pull request này thực hiện fix bug của dự án
        + **feat** (feature): pull request này thực hiện một chức năng mới của dự án
        + **refactor**: pull request này thực hiện refactor lại code hiện tại của dự án (refactor hiểu đơn giản là việc "làm sạch" code, loại bỏ code smells, mà không làm thay đổi chức năng hiện có)
        + **docs**: pull request này thực hiện thêm/sửa đổi document của dự án
        + **style**: pull request này thực hiện thay đổi UI của dự án mà không ảnh hưởng đến logic.
        + **perf**: pull request này thực hiện cải thiện hiệu năng của dự án (VD: loại bỏ duplicate query, ...)
        + **vendor**: pull request này thực hiện cập nhật phiên bản cho các packages, dependencies mà dự án đang sử dụng.
        + **chore**: từ này dịch ra tiếng Việt là việc lặt vặt nên mình đoán là nó để chỉ những thay đổi không đáng kể trong code (ví dụ như thay đổi text chẳng hạn), vì mình cũng ít khi sử dụng `type` này.
    + `scope`: 
        + **KHÔNG BẮT BUỘC**
        + thay đổi code trong pull request này sẽ có phạm vi ảnh hưởng đến đâu (là danh từ)
        + đứng ngay sau `<type>` và được đặt trong dấu ngoặc đơn.
        ```bash
        # scope ở đây là lang
        feat(lang): add polish language
        ```

    + `description`: mô tả khá quát, ngắn gọn về những thay đổi được thực hiện trong pull request.
        ```bash
        # mô tả ngắn gọn pull request này sửa lỗi chính tả trong CHANGELOG
        docs: correct spelling of CHANGELOG
        ```
        
    + `body`: 
        + **KHÔNG BẮT BUỘC**
        + NẾU CÓ, bắt buộc phải cách phần `description` 1 dòng trắng (blank line) 
        + mô tả chi tiết bổ sung cho phần description phía trên về những thay đổi được thực hiện trong pull request
        + không giới hạn về số dòng và không nhất thiết phải theo 1 format nhất định (free-form).
    + `footer(s)`: 
        + **KHÔNG BẮT BUỘC** 
        + nằm ở phía sau body (nếu có body) và phân cách bằng một dòng trắng (blank line)
        + chứa các thông tin mở rộng của pull request ví dụ như là danh sách người review, link/id của các pull request có liên quan.
        + nếu có nhiều footer thì mỗi footer phải chứa một word token là `:<space>` hoặc `<space>#`
        + để phân biệt với phần body thì các từ ghép dùng làm token (ngoại trừ **`BREAKING CHANGE`**) sẽ ngăn cách nhau bằng dấu `-` thay vì `<space>` (Reviewed by => Reviewed-by)
        ```bash
        # 1 commit message gồm body(gồm nhiều đoạn) và nhiều footer 
        fix: correct minor typos in code #type: description

        see the issue for details #body paragraph 1

        on typos fixed. #body paragraph 2

        Reviewed-by: Z #footer 1 sử dụng :<space>
        Refs #133 #footer 2 sử dụng <space>#
        ```
    
    + **`BREAKING CHANGE`** (quan trọng nên cần viết IN HOA và **bôi đậm**): 
        + nếu sự thay đổi code trong pull request của bạn làm thay đổi lớn khiến cho nó không còn tương thích với phiên bản trước nữa thì bạn sẽ phải đánh dấu pull request này là **`BREAKING CHANGE`**.
        + có 2 cách để đánh dấu 1 pull request là **`BREAKING CHANGE`**: đó là đặt từ khóa `BREAKING CHANGE:` vào đầu footer hoặc là `!` liền sau `type/scope` hoặc sử dụng cả 2.
        ```bash
        # sử dụng từ khóa `BREAKING CHANGE`
        feat: allow provided config object to extend other configs
        <blank line>
        BREAKING CHANGE:<space>`extends` key in config file is now used for extending other config files
        
        # sử dụng ! liền sau type trong commit
        refactor!: drop support for Node 6
        
        # sử dụng kết hợp cả 2 
        refactor!: drop support for Node 6
        <blank line>
        BREAKING CHANGE:<space>refactor to use JavaScript features not available in Node 6.
        ```
        
<div align="center">
    
# Tổng kết
    
</div>

- Trên đây là những quy tắc cơ bản để viết commit message. Mới đầu các bạn có thể thấy nó gồm quá nhiều gạch đầu dòng lằng nhằng, tuy nhiên nếu sử dụng thường xuyên thì nó sẽ "ăn vào trong máu" của bạn thôi.
- Nếu trước đây bạn chưa biết conventional commits thì không sao, nhưng giờ đã biết rồi mà vẫn còn viết commit kiểu `git commit -m last commit` thì đừng hỏi tại sao tình nghĩa anh em trong team lại không bền lâu nhé.
- Nếu thấy bài viết này có ích, hãy upvote và clip bài viết ủng hộ mình nhé. 
- Còn nếu có điều gì trong bài viết chưa phù hợp hoặc bạn thấy khó hiểu, đừng ngần ngại comment xuống dưới để mình có thể giải thích, hỗ trợ cho các bạn một cách kịp thời nhất nhé.
- Cảm ơn các bạn và hẹn gặp lại các bạn trong những bài viết sau.

<div align="center">
    
# Tài liệu tham khảo
    
</div>

- Homepage: https://www.conventionalcommits.org/en/v1.0.0/
- Github repo: https://github.com/conventional-commits/conventionalcommits.org