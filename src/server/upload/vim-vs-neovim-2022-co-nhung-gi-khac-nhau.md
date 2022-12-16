![](https://images.viblo.asia/cc7c4ca3-7f22-4767-a77e-c13b9d7c25e3.png)


Ở bài đầu tiên khi làm quen với **Vim**, mình đã hướng dẫn các bạn trực tiếp với **Vim** hàng thật giá thật. Tuy nhiên, nếu các bạn muốn nghiên cứu **Vim** nâng cao và hay thậm chí sử dụng **Vim** cho daily workflow, thì mình sẽ khuyên các bạn sử dụng **Neovim** thay thế. Và trong bài viết này, chúng ta sẽ tìm hiểu **Neovim** là gì, nó có gì đặc biệt so với **Vim** và lý do nó đáng được nhắc tới ở đây.

# Giới thiệu về Neovim
[Neovim](https://neovim.io/) là một bản fork ra từ **Vim** nhắm hướng đến khả năng mở rộng và tính dễ sử dụng (ý mình là cả dễ config cho bản thân, lẫn dễ dàng phát triển cho chính **Neovim** và hệ sinh thái plugins xung quanh nó). Nói vậy có thể thấy **Neovim** hướng đến trở thành một phiên bản **Vim** tốt hơn, cho cả người dùng và nhà phát triển. Và quả thật hiện tại **Neovim** đang bám rất sát mục đích ban đầu của mình.

Dưới đây là tổng quan so sánh ở thời điểm mình viết bài:


|  | Neovim | Vim |
| -------- | -------- | -------- |
| Version     | v0.7     | v8.2     |
| Hỗ trợ LSP| Có sẵn | Phụ thuộc vào plugins ngoài |
| Khả năng mở rộng | Hỗ trợ config VimScript và Lua | Chỉ hỗ trợ VimScript|

## Giải thích về LSP

Trước tiên, cần nhắc tới Language Server, là chỉ tiện ích mở rộng cung cấp trải nghiệm chỉnh sửa cho nhiều ngôn ngữ lập trình. Với Language Server, bạn có thể triển khai tính năng tự động hoàn thành (autocomplete), kiểm tra lỗi (diagnostics), tìm tới định nghĩa (jump-to-definition), vân vân và mây mây. Ví dụ mình sử dụng PHP, thì Language Server của PHP có thể đủ thông minh mà tìm ra lỗi cú pháp, chỉ ra cái function của mình nó đang nằm ở đâu,...
Các vấn đề về Language Server được team phát triển của Visual Studio Code gặp phải và nhắc tới với 3 khó khăn chủ yếu:
* Đầu tiên, Languague Server thường được triển khai tại ngôn ngữ lập trình gốc của chính nó. Thế nên khá khó cho VSCode trong việc tích hợp từng ngôn ngữ vào một editor sử dụng NodeJS runtime, trong khi điều mà VSCode nhắm tới chính là khả năng mở rộng và tính tùy biến phù hợp mọi ngôn ngữ lập trình.
* Thêm vào đó, các tính năng của ngôn ngữ cụ thể có thể tiêu tốn nhiều, rất nhiều tài nguyên trên máy tính.
* Cuối cùng, tích hợp nhiều công cụ ngôn ngữ với nhiều trình soạn thảo code riêng biệt đòi hỏi lượng công việc đáng kể. Từ quan điểm trên, về việc cần phải tích hợp các editor khác nhau với các API của language khác nhau, ta có thể nhìn thấy rằng giả sử có M ngôn ngữ lập trình và N editor riêng biệt => lượng công việc là M x N 😂 Quả là sự lãng phí về thời gian và nhân lực.


Để giải quyết vấn đề trên, Microsoft đã xây dựng một giao thức nằm giữa, nhằm chuẩn hóa giao tiếp giữa ngôn ngữ lập trình và trình soạn thảo code, hay chính là Language Server Protocal (LSP). Bằng cách này, Language Server có thể triển khai bằng bất kỳ ngôn ngữ nào và chạy trong quy trình riêng của nó, thay vì bắt NodeJS phải thực thi các file PHP chẳng hạn, vì chúng chỉ giao tiếp với Language Server Protocol. Và ở phía editor của chúng ta, chỉ cần nó tuân thủ LSP thì cũng có thể dễ dàng triển khai thực hiện các tiện ích của Language Server.

![image.png](https://images.viblo.asia/6bdf819b-36d2-41fd-bf24-804d33da8142.png)

Giải thích như vậy bạn cũng đã thấy, với việc **Neovim** hỗ trợ LSP cũng đồng nghĩa với tiếp cận Language Server của gần như toàn bộ ngôn ngữ lập trình hiện nay! Thật ra trước khi **Neovim** hỗ trợ chính thức LSP, thì cũng có một bên thứ 3 phát triển plugins (mà mình cũng đã từng sử dụng trong một khoảng thời gian), là [Conquer of Completion](https://github.com/neoclide/coc.nvim). Phải nói công tâm là nó cũng không tệ, nhưng nếu trong một project lớn, nhiều index thì nó vẫn có độ trễ nhất định khi hiện gợi ý, không thể so được với built-in LSP do **Neovim** cung cấp.

## VimScript vs Lua
Cả **Vim** và **Neovim** đều hỗ trợ **VimScript** như một cách để cài đặt, cá nhân hóa môi trường code của bạn. Tuy nhiên, **Neovim** có thêm lựa chọn phép sử dụng **Lua**, một ngôn ngữ lập trình tương đối mạnh mẽ và phổ biến, để giải quyết vấn đề tương tự. Và quả thật mình cảm thấy **VimScript** vẫn còn khá đơn sơ so với một ngôn ngữ lập trình chuyên dành cho viết script như **Lua** (mấy cái hack game toàn viết bằng **Lua** đó, fyi). Về tốc độ thì **Lua** cũng bỏ xa **VimScript** luôn. Nhưng cũng cần nói thêm rằng **VimScript** vẫn đang tiếp tục phát triển, [bản benchmark cho thấy VimScript v9 đã nhanh hơn đáng kể](https://github.com/vim/vim/blob/master/README_VIM9.md), cũng như bổ sung nhiều tính năng hơn. Cơ mà thời điểm hiện tại thì v9 vẫn chưa được phát hành chính thức và sử dụng rộng rãi, nên sự hỗ trợ **Lua** trên **Neovim** quả thật là một lợi thế lớn so với **Vim**.

## Treesitter
Về cơ bản thì [Neovim Treesitter](https://github.com/nvim-treesitter/nvim-treesitter) là một bộ nhúng vào **Neovim** giúp chuyển ngôn ngữ lập trình vào cây cú pháp cụ thể một cách hiệu quả và cung cấp thông tin đó cho trình soạn thảo. Trong những ngày đầu của nỗ lực highlight text, thì phần lớn dựa vào phân tích regex. Và regex thì chưa đủ để có thể biết được một từ nào đó liệu có phải là class hay function hay không. **Treesitter** cũng hỗ trợ trong việc thò thụt căn lề hiệu quả vì nó biết những thứ này thực sự là gì về mặt ngữ nghĩa chứ không chỉ về mặt cú pháp.

![image.png](https://images.viblo.asia/a818c235-ab85-455f-8e20-20fc4c543a9e.png)

# Những lý do chúng ta nên cân nhắc sử dụng Neovim

* **Hiệu suất**: nhắc tới Performance thì gần như vô địch khi đem đặt cạnh các editor hiện tại như các [Jet Brain tools](https://www.jetbrains.com/), [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/), [Kate](https://kate-editor.org/en-gb/), [Nova](https://nova.app/), [Sublime Text](https://www.sublimetext.com/),.. dù cái cấu hình mặc định của **Neovim** quả thật rất tệ. Cần có sự cân bằng thực dụng giữa hiệu suất và chức năng, và trải nghiệm. Nếu mất thêm vài giây để tải mọi thứ nhưng hiệu suất sau đó vẫn hoạt động nhanh chóng ngay cả với syntax highlight, code autocomplete và diagnostics, thì đó có thể là một sự cân bằng hợp lý. Tuy nhiên load xong hết mọi thứ mà giao diện người dùng vẫn chậm là dở rồi. Và cũng tiện nhắc tới hiệu suất, **Neovim** sẽ ngốn ít tài nguyên hơn rất nhiều so với phần đông editor hiện nay.
* **Cá nhân hóa**: mỗi người có một khẩu vị riêng, vì vậy dù không quan trọng bằng hiệu suất nhưng khả năng cá nhân hóa tốt vẫn được đánh giá cao. Và **Neovim** với sự hỗ trợ của **Lua** chắc chắn sẽ tốt hơn **Vim**, tuy rằng so với các editor có GUI thì vẫn là còn kém nhiều lắm.
* **LSP + Treesitter support**: với sự kết hợp của bộ đôi này, thì chúng ta có thể dễ dàng dùng nó cho hầu hết ngôn ngữ lập trình phổ biến hiện này
* **System requirement**: dù rằng có tồn tại các GUI cho **Neovim** như [Neovide](https://github.com/neovide/neovide), [Gnvim](https://github.com/vhakulinen/gnvim) nhưng thực tế là bạn có thể tải và chạy **Neovim** ở ngày trên terminal, của bất kỳ thứ gì, thậm chí còn có thể nhúng lên browser như Firefox để gõ văn bản 🤣

# Tổng kết
Như các bạn đã thấy, **Vim** rất hay và để sử dụng thì **Neovim** có vẻ là một sự lựa chọn ổn. Vậy thì ở bài sau, chúng ta sẽ cùng thử tùy biến **Neovim** để đem lại trải nghiệm như sử dụng một IDE nhé. Tạm biệt và hẹn gặp lại!