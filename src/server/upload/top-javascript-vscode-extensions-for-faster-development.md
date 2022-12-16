VSCode là một editor rất phổ biến trong giới lập trình viên, đặc biệt là các lập trình viên web. Nó không chỉ nhanh, khả năng mở rộng và custom mạnh mà còn đi kèm với rất nhiều feature thú vị khác. Ngoài ra, nếu ai đã từng dùng Atom hay sublime text thì sẽ rất dễ dàng làm quen với VSCode, bới chúng có giao diện, phím tắt, chức năng ... gần như nhau. Sau đây là các extension mà mình hay dùng cho công việc (đặc biệt khi code javascript).

### [Quokka.js](https://quokkajs.com/)
Quokka.js là một prototyping playground cho Javascript và TypeScript. Nó có thể chạy code JS và TypeScript ngay lập tức khi bạn gõ và hiển thị kết quả quay trong code editor. 
Sau khi cài đặt extension này, bạn nhấn Ctrl/Cmd(⌘) + Shift + P rồi gõ Quokka để xem danh sách các lệnh mà Quokka.js cung cấp. Tạo một file javascript mới. Bạn cũng có thể nhấn (⌘ + K + J) để mở file trực tiếp. Bất cứ thứ gì bạn gõ đều sẽ chạy ngay lập tức.

![](https://images.viblo.asia/f416b6df-4b75-40f5-bef6-638f5d7df4a6.gif)

Extensions tương tự:
    * Code Runner : hỗ trợ nhiều ngôn ngữ như C, C++, Java, JavaScript, PHP, Python, Perl, Perl 6, ....
    * Runner

### Bracket Pair Colorizer và Indent Rainbow
Dấu ngoặc tròn và ngoặc nhọn là các phần không thể tách với với rất nhiều ngôn ngữ. Và đặc biệt trong javascript với những callback hell thì càng không phải bàn cãi, thật khó để nhận ra đâu là cặp đóng mở ngoặc nhọn, hoặc ngoặc tròn. Vậy thì chào mừng bạn đến với Bracket Pair Colorizer and Indent Rainbow. Đây là 2 extensions riêng biệt. Nhưng chúng phục vụ cùng 1 mục đích là hỗ trợ editor (hoặc IDE) của bạn hiển thị các dấu ngoặc bằng hàng tá màu sắc để phân biệt.

![](https://images.viblo.asia/c5a13fa0-bfe8-44f7-8237-47985f482e44.png)

Without Indent Rainbow and Bracket Pair Colouriser


![](https://images.viblo.asia/38f8a637-4714-4658-8b35-a65ae117499b.png)

With Indent Rainbow and Bracket Pair Colorizer 

### Snippets
Snippets đã quá quen thuộc với programmer. Thay vì viết `import React from 'react';` bạn có thể gõ `imr` và nhấn **Tab** để expand snippet này. Tương tự: `clb` sẽ thành `console.log`

Có rất nhiều **snippets** cho các ngôn ngữ khác nhau: *Javascript(or any other language), React, Redux, Angular, Vue, Jest*. Cá nhân tôi thấy **Snippets** cho javascript rất hữu ích khi làm việc với JS. Ngoài ra bạn cũng có thể thử những cái khác như:
* JavaScript (ES6) code snippets
* React-Native/React/Redux snippets for es6/es7
* React Standard Style code snippets

### Todo Highlighter
Như tên của package, mục tiêu là hiển thị phần comment `// TO DO` sáng màu để ta có thể nhận ra

![](https://images.viblo.asia/7c37a98f-4a90-42bb-a296-50c87478bb07.png)

### Import Cost
Extension này cho phép bạn thấy được kích cỡ của module được import. Nó rất có ích với những bundlers như webpack. Bạn có xem là bạn đang import toàn bộ library hay chỉ 1 phần của nó.
Có một vấn đề nho nhỏ là nó không cho thấy được **cost** của các custome file hoặc các custome module.

Lưu ý một chút nữa, trước mình có đọc một bài post cũng trên medium về vấn đề này. Thì lại chứng minh một vấn đề ngược lại, đó là dù bạn import cả package, hay một phần của nó, một variable hay một function trong đó, thì kích cỡ file, thời gian chạy đều không hề thay đổi. Nên mình cũng không biết cái extension này chính xác không nữa. (Đây là lời người dịch)

![](https://cdn-images-1.medium.com/max/800/1*LbfI4D9XXiZYS1Slwsys5g.gif)

### REST Client
Là một web developer, chúng tôi thường phải làm việc với REST APIs. Chạy một URL và check responses, thường thì Postman được sử dụng. Nhưng có một extension có thể tích hợp vào trong editor có chức năng y hệt. Đó là REST Client. Nó cho phép bạn gửi HTTP request và check response ngay trong Visual Studio Code.

![](https://cdn-images-1.medium.com/max/800/1*Nsl7NFn1PPAcbJa4TApBhw.gif)

### Auto Close Tag and Auto Rename Tag
JSX và HTML mơ đầu bằng một thẻ mở, kết thúc bằng một thẻ đóng (hầu hết là vậy), điều này khiến việc code trở nên dài dòng và tẻ nhạt. Vì vậy chúng ta cần một tool có thể nhanh chóng, dễ dàng sinh thẻ và cón element con của chúng. Emmet là một ví dụ tiêu biểu cho các tool như vậy và cũng có thể tích hợp vào trong VSCode. Tuy vậy, tôi cá là nhiều người sẽ thích thứ gì đơn giản, không phải nghĩ ngợi nhiều. Đó chính là **Auto Close Tag and Auto Rename Tag**. Chúng sẽ tự sinh ra thẻ đóng khi bạn gõ thẻ mở, và tự động update thẻ đóng (hoặc mở) nếu bạn sửa thẻ mở (hoặc đóng).

![](https://cdn-images-1.medium.com/max/800/1*ME0oAmIJdO6zaaYwL1DPwA.gif)

Auto rename tag

![](https://cdn-images-1.medium.com/max/800/1*EbGIozYQA3qS3nXpNtSDeg.gif)

Auto close tag

### GitLens
Gitlens giống như một GUI tool cho git được tích hợp vào VSCode. Nó bao gồm hàng tá features như commit, add, commit search, history, Gitlens explorer. Bạn có thể đọc bản full không che docs của GitLens [tại đây](https://github.com/eamodio/vscode-gitlens)

![](https://cdn-images-1.medium.com/max/800/1*DS2aWPI70ydDx4WHkkiJVQ.gif)

Similar Extensions
* Git History — Displays a beautiful graph of the commit history and much more. Recommend.
* Git Blame — It lets you see Git Blame information in the status bar for the currently selected line. A similar feature is also provided by GitLens.
* Git Indicators — It lets you see the affected files and how many lines have been added or deleted in the status bar.
* Open in GitHub / Bitbucket / Gitlab / VisualStudio.com ! — It lets you open the repo in the browser with a single command.

### Indenticator
Highlight indent, giúp nhận biết các code block dễ dàng hơn.

![](https://cdn-images-1.medium.com/max/800/1*ZY3eFPZ1-PmBhS5cQAZHAg.gif)

### Dracula (Theme) (My favorite choice)

![](https://cdn-images-1.medium.com/max/800/1*VXgT4EFpAKtPfXTgi00BqA.png)

Đây đều là các VSCode extensions mà tôi hay dùng. Bạn thì sao, hãy comment ý kiến của mình bên dưới nhé.
Bài viết được dịch từ nguồn:
https://codeburst.io/top-javascript-vscode-extensions-for-faster-development-c687c39596f5