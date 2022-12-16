# Giới thiệu
Sau bài cách cài đặt và chạy một dự án Symfony, chúng ta đã có thể nắm được làm cách nào để cài đặt những phần mềm cần thiết, khởi tạo và chạy một dự án viết bằng Symfony. Tuy nhiên, liệu các bạn có hiểu rõ các phần mềm chúng ta cài là gì và dùng để làm gì không? Trong bài này, chúng ta sẽ tìm hiểu về những phần mềm đó nhé.
# PHP
Phú có một ý tưởng về bán hàng, Phú muốn viết web cho dự án bán hàng đó. Tuy nhiên, làm sao để Phú có thể giao tiếp với máy tính để máy tính thực hiện những điều Phú muốn? Ok, ok, ngôn ngữ lập trình được tạo ra như một cầu nói giúp cho việc giao tiếp giữa người và máy dễ dàng hơn. Và với việc sử dụng ngôn ngữ lập trình kịch bản PHP, Phú đã có thể tạo môt web bán hàng cho riêng mình một cách dễ dàng.

Đầu tiên chúng ta sẽ tìm hiểu ngôn ngữ lập trình là gì? Ngôn ngữ lập trình, nói nôm na là một loại ngôn ngữ để máy tính có thể hiểu và thực hiện những yêu cầu, những thuật toán. Cách hoạt động là khi bạn chạy code bạn viết thì code của bạn sẽ được biên dịch ra thành tệp nhị phân, tức là tệp tin chứa `0101011110101110`. Sau đó máy tính sẽ đọc tệp tin này và thực hiện những lệnh có trong tệp tin đó. Vậy tại sao không để máy đọc trực tiếp `1010101010111101` mà phải cần đến ngôn ngữ lập trình xong rồi còn biên dịch ra, tốn công, tốn thời gian. Câu trả lời là để cho **dễ đọc, dễ hiểu, dễ bảo trì**. Cùng so sánh khi bạn viết code C:
```
printf('Hello Phu'); // C Programming Language
```
Giả sử sẽ dịch ra được binary như sau:
```
0101011011011011010101011010101010101010110
```
Khi nhìn vào code, chúng ta biết ngay là sẽ in ra `Hello Phu`. Nhưng với binary thì yakk, không biết chuyện gì đang diễn ra. 

Thế thì, ngôn ngữ lập trình kịch bản là gì? Ngôn ngữ lập trình kịch bản nói nôm na là sẽ giúp cho quá trình compile nhanh hơn khiến cho ngôn ngữ đó linh hoạt, nhanh chóng hơn. Do đó, đối với những ngôn ngữ lập trình kịch bản như PHP hay Javascript, chúng ta hoàn toàn có thể khỏi tạo biến mà không cần khai báo kiểu dữ liệu, có thể thay đổi kiểu dữ liệu liên tục, không cần phải compile ra một file và rồi mới chạy file đó, mà với PHP, bạn viết code và chạy file vừa mới viết là xong.
# Composer
Sau khi biết được PHP thì bây giờ Phú đang vui vẻ code dự án của mình. Đến phần phân trang, Phú nghĩ mình chỉ cần cài gói phần mềm viết sẵn và dùng, như vậy sẽ nhanh hơn và dễ hơn. Phú hí hửng tải gói phần mềm đó về và thêm vào dự án nhưng đời không như mơ và đời không như thơ, chương trình không chạy nữa. Phú không biết chuyện gì đang xảy ra. Phú bắt đầu đọc code, điên cuồng debug, mất cả ngày trời cuối cùng anh cũng tìm ra được là gói phần mềm Phú vừa cài, không còn phù hợp với phiên bản Symfony 5.3 mà Phú đang dùng. Cần phải nâng cấp từ phiên bản 4.9.9 lên phiên bản 5.0.1 thì gói phần mềm đó mới hoạt động tốt với Symfony 5.3 đang dùng. Ôi trời, Phú tự hỏi liệu có ai đó quản lí mấy cái này giúp mình không. Và Composer xuất hiện như một vị cứu tinh.

Composer là một trình quản lí những gói phần mềm trong dự án của bạn. Khi các bạn cài đặt một gói ứng dụng nào đó, các bạn chạy `composer require package-name`, với lệnh này, composer không chỉ tìm và cài đặt gói phần mềm đó cho chúng ta, mà composer còn check xem đối với version của dự án hiện tại thì gói phần mềm với version nhất định nào đó có phù hợp hay không, nếu không thì cả một gói phần mềm không phù hợp hay những depenpencies của gói phần mềm đó không phù hợp, đưa ra giải pháp cho chúng ta là cần phải nâng cấp dự án lên phiên bản 5 hoặc phải hạ dự án xuống phiên bản 3 để cài gói ứng dụng này chẳng hạn và dùng lệnh nào để làm điều đó, .... 

Như vậy Composer sẽ quản lí những gói phần mềm, giúp những gói phần mềm hoạt động tốt với nhau để giúp cho phần mềm chúng ta có thể chạy tốt. Và đương nhiên, chúng ta, những lập trình viên sẽ vui vẻ hơn khi không phải check thủ công xem version của gói này có phù hợp với dự án mình không, những dependencies nào không phù hợp, cần phải cài phiên bản bao nhiêu, ....

# Symfony CLI 
Giờ thì Phú bắt tay vào code. Nhưng khoan làm sao để khởi tạo dự án đây. Sau khi tạo xong thì làm sao để chạy. Symfony CLI được tạo ra để làm điều đó.

Symfony CLI là những scripts để chạy trong CLI tức là command line của chúng ta. Thay vì phải viết nhiều lệnh lặp đi lặp lại, dài lê thê, thì khi dùng Symfony CLI chúng ta sẽ có những câu lệnh ngắn hơn, không cần phải viết nhiều lệnh lặp lại nhiều lần, và ngoài ra còn có những thông tin rất hữu ích được hiện ra trên Command Line. Lấy ví dụ, để tạo một dự án mới chúng ta chỉ cần chạy: `symfony new project-name --version`, để chạy dự án chúng ta chỉ cần chạy `symfony serve`. Rất dễ phải không nào.
# Git
Sau nhiều ngày viết code, dự án của Phú đã hoàn thành và mọi thứ chạy trơn tru. Trong phút chốc, Phú chợt nghĩ ra một tính năng mới, anh vội vàng code thêm tính năng đó. Sau khi hoàn thành, anh đã quá mệt mỏi và tắt máy đi ngủ sau những ngày dài viết code. Tối hôm sau, Phú bật máy lên, chạy dự án và **BOOM** dự án hoàn toàn không chạy. Phú mỉm cười và thầm nghĩ, chắc lỗi đâu đó trong tính năng mới, tạm thời comment là xong. Sau khi comment, code vẫn không chạy, Phú toát mồ hôi và tự hỏi chuyện gì đang xảy ra. Sau nhiều ngày điên cuồng debug, debug và debug, cuối cùng Phú phát hiện mình thiếu dấu chấm phẩy trong code không liên quan đến tính năng mới :scream::scream::scream:, Phú không biết mình đã vô tình bỏ dấu chấm phẩy này khi nào, khi đang mệt mỏi quá chăng hay một phút giây vô tình nào đó. Phú ước gì có ai đó quản lí những thay đổi của dự án mình, như vậy Phú sẽ dễ dàng biết được sự khác biệt giữa code hôm qua và hôm nay, có thể quay về lúc code vẫn còn hoạt động tốt hoặc tốt hơn là thêm tính năng mới nhưng nếu có bug thì không gây ảnh hướng gì đến dự án. Git xuất hiện và cứu rỗi đời Phú.

Git là một phần mềm để quản những phiên bản code khác nhau trong dự án của chúng ta. Với Git, bạn có thể dễ dàng quay về phiên bản cũ của code, xem sự khác nhau giữa những phiên bản trong code, xem được những thay đổi trong code, xem lịch sử code.

Như vậy, giả sử khi bạn thêm tính năng mới vào dự án của mình và dự án của bạn không hoạt động nữa, thay vì phải dò hết tất cả các file trong dự án, bạn có thể chạy `git diff commit-work-well` để xem sự khác biệt giữa code hiện tại và lúc dự án chạy tốt. Từ đó, công việc tìm ra bug làm dự án bạn không chạy dễ dàng hơn. 

Một tình huống khác là khi bạn thêm tính năng xong, và bạn suy nghĩ lại, không thích tính năng đó nữa, thay vì phải ngồi xóa từng file, check xem mình có lầm lẫn gì không thì bây giờ, bạn chỉ cần chạy `git reset --hard commit-before-add-new-feature` là code của bạn đã quay về thời điểm trước khi thêm tính năng mới vào. Như vậy bạn không cần phải tìm từng file, check xem mình có nhầm lẫn gì không nữa. 

Hoặc là khi thêm tính năng mới hay fix bug, để đảm bảo mọi thứ chạy tốt trước khi đưa sản phẩm tới người dùng, bạn có thể tạo một nhánh mới `git branch new-branch` và bạn có thể thêm bất kì code gì trong nhánh này mà không sợ làm hư nhánh chính (tức nhánh sẽ cho ra sản phẩm cuối cùng). 

# Tổng Kết
Trong bài này chúng ta đã tìm hiểu sơ lược qua những phần mềm mà chúng ta đã cài đặt để tạo và chạy dự án viết bằng Symfony gồm có:
- PHP ngôn ngữ lập trình kịch bản
- Composer trình quản lí gói phần mềm 
- Symfony CLI script chạy trong command line cho Symfony
- Git quản lí phiên bản của code