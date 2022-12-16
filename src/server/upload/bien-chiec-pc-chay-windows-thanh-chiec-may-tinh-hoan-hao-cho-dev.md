Chiếc MacBook Pro của mình vừa mới hỏng xong 🙁. Đây là chiếc laptop hỏng nhanh nhất mình từng có, mình mới dùng chưa được 1 năm 😭.
Ừ thì đem sửa hay mua cái mới cũng được, nhưng mà giá nó đắt ghê 😭.
Mình cũng chán laptop của Apple rồi.
Mấy năm gần đây apple cũng k còn quan tâm đến trải nghiệm của developer trên MacBook nữa.
Nhưng thà mỗi năm làm con mới giống hệt như cũ với cấu hình cao hơn thì đã chẳng sao. Đằng này lại thêm vào mấy thứ dở hơi chả ai cần, lại còn cấu hình của 2 năm trước với giá k đổi nữa.

Linux thì mình đang dùng sẵn trên một máy khác rồi.
Rất OK không vấn đề gì, ngoài thiếu vài thứ như office (office của Microsoft vẫn xịn hơn), mấy app Adobe...

Nhìn sang team Microsoft thì Windows, vốn là một hệ điều hành có trải nghiệm cho dev tệ nhất mình từng thấy, đang ngày càng thêm nhiều tính năng mới dành cho dev.
Các project mới của Microsoft cũng là open source và nhận được rất nhiều đóng góp từ cộng đồng, còn được release thường xuyên hơn so với vài ~~chục~~ năm một lần như trước.
Vậy nên mình nghĩ có lẽ cũng đến lúc nên thử đổi phe xem sao. Để xem mình đã làm gì để code trên Windows một cách thật ngầu nhé :3.

## Terminal

Terminal là cái đầu tiên mình tìm kiếm khi chuyển qua Windows.
Dù sao thì đó cũng là công cụ không thể thiếu của dev bọn mình.

### Shell

Dù cũng có rất nhiều shell khác nhau cho macOS và Linux (Bash, Zsh, Fish...) nhưng nói chung tất cả đều khá tương đồng.
Windows thì ngược lại, tồn tại vài loại shell mà chả cái nào giống cái nào cả 🙂.

Windows có sẵn 2 công cụ CLI được phát triển bởi Microsoft là *cmd* và *PowerShell*.
*Cmd* thì khá tệ, lại còn closed source nên sau hàng tỉ năm không có tí tiến bộ nào.
*PowerShell* khá mạnh, open source, càng ngày càng được update xịn hơn.

Nhưng cả hai đều không có những công cụ quen thuộc như trên macOS với Linux.
Vậy nên chúng ta có loại thứ ba là các loại shell giống như Linux với những công cụ quen thuộc (awk, sed...).
Loại này gồm có *Cygwin* và *Git Bash* (được cài cùng với Git for Windows)

Chọn cái nào cũng vẫn không mang lại cảm giác thoải mái như trên macOS hay Linux cho mình 🙁.

### Terminal emulator

Có rất nhiều terminal emulator cho Windows được phát triển trong suốt hàng chục năm (PuTTY, KiTTY, Mintty, Babun...).
Trừ mấy cái mà mục đích chính chỉ để làm SSH client để login vào server Linux ra 🙂.
Một số cái thì lại chỉ để chạy Cygwin shell.

Cuối cùng thì gần đây cũng có một vài cái thực sự đáng được gọi là terminal emulator được phát triển (ConEmu, Cmder, Hyper.js).
Cả ba đều có thể chạy được bất kì shell nào cài trên máy.

Cmder thì dựa trên ConEmu và đặc biệt dùng cho *cmd* với các unix tool được thêm vào để mang lại trải nghiệm gần giống như Linux.

Hyper.js thì là một Electron app nên có thể được sử dụng trên mọi platform (Windows, macOS, Linux).
Nhờ vậy nên việc chuyển đi chuyển lại giữa các platform sẽ mượt hơn vì config được đồng bộ.
Tuy nhiên vì là Electron app nên performance hơi tệ so với các emulator khác trên macOS và Linux.

Cuối cùng thì mình chọn *Windows emulator* 😜, do chính tay Microsoft phát triển.
Từ đầu mình nói Microsoft đang rất cố gắng lấy lòng developer chính là từ những project như thế này đây.
Mặc dù vẫn còn đang trong quá trình phát triển nhưng dùng ổn lắm rồi.

![](https://images.viblo.asia/a5f0b099-d703-46ef-8a1f-7e03071441ce.png)

### Prompt

Mình có thể dành cả tuần để customize prompt của mình mà không chán 😂. Của mình trông như thế này.

![](https://images.viblo.asia/8c7fceb7-9831-47f7-8dc7-1f1555d37698.png)

Mình dùng [Starship](https://starship.rs/) prompt trên cả máy Linux và MacBook, và nó cũng support PowerShell nữa, nên mình chỉ cần bê config sang thôi, không vấn đề gì.

## Package manager

Việc mỗi lần cài app gì lại phải mở trang web, tải installer xong rồi chạy nó khá là mệt.
Cũng khó mà viết được tool tự động cài những app mình cần mỗi khi cài lại máy nữa.
Từ trước đến nay mình vẫn thường nghe nói Windows không có package manager để cài đặt các ứng dụng tiện lợi như macOS và Linux.
Nhưng mà sự thực là không phải không có mà là có quá nhiều, khiến cho mình không biết phải dùng cái nào nữa.
Thậm chí còn có hẳn một cái [package manager manager](https://github.com/OneGet/oneget) (2 chữ manager nhé)
để quản lý package manager nữa 🤣. Tuy nhiên có một vấn đề là hầu hết các package trên đó đều được viết bởi cộng đồng
người dùng chứ không nhiều package được phát hành bởi chính nhà phát triển như đối với macOS hay Linux.
Vậy nên phiên bản mới có thể sẽ được update chậm hơn một chút.

Đây là một vài cái package manager nổi tiếng mà mình có xem qua.

### Chocolatey

[https://chocolatey.org](https://chocolatey.org/)

Đây có lẽ là cái nổi tiếng nhất (hoặc là trông có vẻ nổi tiếng nhất).
Cũng có thể vì đứng sau nó là hẳn một công ty, với mô hình kinh doanh và những dịch vụ thu phí, nên được quảng cáo nhiều hơn.
Các package trên này được phát triển bởi cả người dùng và team Chocolatey.
Có hẳn một trang để mọi người có thể tìm package mà mình muốn cài ở [đây](https://chocolatey.org/packages).
Các package được đưa lên đây đều được kiểm duyệt bởi đội ngũ kiểm duyệt của Chocolatey trước.
Một vài package trên này còn được viết (hoặc recommend) bởi chính nhà phát triển nữa ([Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) chẳng hạn).

Chocolatey cài các ứng dụng theo kiểu truyền thống (cài vào `C:\ProgramFiles`, cần quyền Administrator).
Mỗi package sẽ chứa script để cài đặt nó (tải installer, chạy nó).
Chocolatey cũng phụ thuộc rất nhiều vào các tính năng của Windows, như Nuget chẳng hạn.
Thậm chí Microsoft còn từng làm việc cùng với team Chocolatey để phát triển những tính năng, API của Windows để Chocolatey hoạt động tốt hơn.

### Scoop

[https://scoop.sh](https://scoop.sh)

Scoop có vẻ ít nổi tiếng hơn, nhưng thật ra có nhiều ⭐ trên Github hơn.
Scoop và các package của nó thì được phát triển hoàn toàn bởi cộng đống.
Các package được định nghĩa dưới dạng JSON thay vì script và được host trên Github luôn.
Khác với Chocolatey, Scoop không phụ thuộc vào các API của Windows hay các tiêu chuẩn của Microsoft.
Các package được cài trong folder của người dùng.
Mỗi package cũng được cài trong một folder riêng trong `~/scoop`, gần như là portable, cũng không cần quyền *Administrator*.

### Winget

[https://github.com/microsoft/winget-cli](https://github.com/microsoft/winget-cli)

Package manager chính thức đến từ Microsoft, vẫn còn đang trong quá trình phát triển.
Hướng đi cũng khá giống Scoop nhưng dùng YAML thay vì JSON.
Ứng dụng cũng được cài kiểu truyền thống thay vì kiểu tách biệt như với Scoop.
Mình chưa dùng thử vì đọc qua thấy còn hơi bị nhiều bug nhưng cũng rất đáng mong chờ.

Ngoài mấy cái trên thì cũng còn nhiều package manager khác cũng từng xuất hiện rồi biến đi vì không ai dùng (AppGet chẳng hạn).

Tóm lại thì cuối cùng mình đã chọn Scoop.
Scoop từ đầu cũng được thiết kế là một công cụ hướng đến developer.
Main bucket (default) của Scoop chỉ chứa các công cụ CLI cho developer (Git, PHP, Python...), rất phù hợp với nhu cầu của mình.

![](https://images.viblo.asia/90bd121c-6ebc-415e-b729-a7474f522dda.png)

## WSL

Nếu nhiều năm về trước mà ai hỏi mình làm thế nào để setup Windows cho dev ngon như Linux thì câu trả lời của mình sẽ là "Cài Linux đi" 🙂.
Nhưng mà giờ nó thành hiện thực luôn các bạn ạ 😂.
Giờ bạn có thể cài Linux trên Windows luôn, rất nhiều distro phổ biến được support: Ubuntu, Debian, Fedora, OpenSUSE...

![](https://images.viblo.asia/33441ef2-6a32-4f8a-bfd6-e4418179e47a.png)

Dù vẫn không phải là Linux hoàn chỉnh, không có các process hệ thống nên không thể chạy các dịch vụ như DB, Docker nhưng mà được trở lại với những dòng lệnh quen thuộc là mình vui lắm rồi.

Mới dùng thì bạn có thể thấy tốc độ truy cập file trong WSL khá là chậm.
Nhưng mà đấy là đối với các file trong Windows thôi, với các file trong WSL thì vẫn là tốc độ 🚀 như trên Linux.
Mình dùng VS Code, có hẳn một extension để code ngay bên trong WSL, trải nghiệm không khác gì code trên Linux cả.

## Docker

Các dự án của mình dùng docker khá nhiều nên mình cũng khá băn khoăn khi chuyển sang Windows.
Cũng giống như macOS, Docker trên Windows cũng cần có backend là Linux.
Với macOS thì là Linux chạy trong Virtual Box.
Bạn nào dùng MacBook thì chắc cũng biết nó tệ thế nào rồi.
Nhưng Windows với WSL thì quá xịn luôn. Chỉ cần bạn đừng mount file từ Windows mà hãy dùng file bên trong WSL như trên thôi.
Hơn nữa WSL còn không phải là máy ảo như VirtualBox nên không cần lúc nào cũng phải assign RAM và CPU cho nó nữa.
Mình vừa chạy Docker vừa chơi game thoải mái luôn

![](https://images.viblo.asia/8fa27239-86c2-4773-8aad-2f6f8f26f756.png)

## Browser

Mới đầu mình nghĩ sẽ không có vấn đề gì vì Chrome với Firefox, 2 browser mình dùng thường xuyên, đều có trên cả 3 nền tảng.
Nhưng mà thật ra là có, vì dùng Windows nên mình mới dùng thử *Edge* mặc dù trên macOS cũng có. Và thực sự là Edge ngon
hơn hẳn Chrome. Hơi có chút bỡ ngỡ vì chưa quen với menu thôi, sau đó thì Edge dùng mượt hơn hẳn, tốn ít RAM hơn,
lại vẫn cài được đầy đủ extension của Chrome nữa chứ.

## Netflix

Quan trọng là Edge xem được Netflix ở 1080p các bạn ạ 😱.

![](https://images.viblo.asia/5b61d147-b85f-44ef-af2a-a92793117e08.png)

Chrome và Firefox chỉ xem được 720p.

![](https://images.viblo.asia/9b0b3a0f-da34-433a-833f-3dc0088938f6.png)

Safari cũng xem được 1080p, nhưng mà cả cái browser chỉ để xem Netflix nên mình chẳng mấy khi động vào.
Ngoài ra Windows còn có app Netflix để xem được chất lượng 4K nữa, chỉ cần máy bạn đủ mạnh là được.

Tóm lại là mình đã chuyển nhà sang Windows thành công.
Với trải nghiệm của mình thì Windows chính là sự cân bằng tốt nhất giữa macOS và Linux.
Dev thì ngon hơn macOS còn mấy app giải trí vẽ vời linh tinh thì ngon hơn Linux.
Và nhất là có Netflix ngon hơn cả 2 nữa 😜.

> Đoạn đầu chỉ là chém gió thôi chứ mình làm gì có tiền mua Mac =)).
> Mình phải dev trên Windows là do có thời gian làm remote dùng máy tính cá nhân thôi.
> Còn máy ở công ty thì mình vẫn dùng Linux bình thường.