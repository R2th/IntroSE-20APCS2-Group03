![](https://images.viblo.asia/9d9e4672-76f1-4561-bd00-938c3ee8bda9.jpeg)
Bạn có bao giờ ngạc nhiên khi thấy ai đó làm việc rất nhanh trong UNIX, thực hiện các lệnh và thực hiện mọi thứ nhanh chóng?

-----
* *Vâng, tôi đã thấy một vài lần và tôi luôn có cảm hứng để học hỏi từ những superstar developer đó.*
-----

Trong bài viết này, hoặc hướng dẫn, hoặc bất cứ điều gì bạn gọi nó, tôi đã chia sẻ một số kinh nghiệm về UNIX command mà tôi làm theo để làm việc nhanh, nhanh hoặc hiệu quả trong Linux.

Tôi làm việc cho ngành dịch vụ tài chính và công việc của tôi liên quan đến việc phát triển và hỗ trợ ứng dụng giao dịch chứng khoán và tương lai trực tuyến trong giao dịch điện tử,Derivatives, FX, Commodity và các loại tài sản khác.

Tất cả các dịch vụ của tôi đều chạy trên các máy chủ Linux, vì vậy, nó rất quan trọng đối với chúng tôi để làm việc hiệu quả và nhanh chóng trong Linux terminal và đó là cách mà tôi đã học được các mẹo này trong Linux.

Bài viết này giống như các bài viết trước đây của tôi về [Top 10 basic networking Commands in UNIX](https://javarevisited.blogspot.com/2010/10/basic-networking-commands-in-linuxunix.html) và [How does nslookup command work in Linux.](https://javarevisited.blogspot.com/2017/04/how-hostname-to-ip-address-conversion-or-name-resolution-works-in-Linux.html).

Nếu bạn chưa đọc những thứ này bạn có thể thấy nếu bạn thấy chúng thú vị và hữu ích. Trong UNIX command tutorial này, tôi sẽ chia sẻ kinh nghiệm của tôi về cách làm việc nhanh, nhanh chóng và hiệu quả trong UNIX.

### 10 UNIX and Linux Productivity Tips

Nếu server của bạn cũng nằm trong một máy Linux và công của bạn liên quan nhiều đến việc tìm kiếm và thực hiện xung quanh các [UNIX command](https://javarevisited.blogspot.com/2016/06/10-example-of-lsof-command-in-unix-linux.html#axzz5CkWP96Nb) thì những mẹo này sẽ tiết kiệm rất nhiều thời gian của bạn.

-----
* *Các mẹo dưới đây là kết quả của kinh nghiệm của tôi với UNIX terminal mà tôi đã tóm tắt chúng trong **10 mẹo để lầm việc nhanh trong UNIX**.*
-----

Tại sao tôi lại chia sẻ nó?

Well, tôi mong muốn có thêm một số lời khuyên từ các bạn để tăng cường kho vũ khí (kiến thức) của tôi, vì vậy hãy chia sẻ cách bạn làm việc trong UNIX, cách bạn tạo ra hầu hết [các câu lệnh Linux mạnh mẽ](https://javarevisited.blogspot.com/2017/03/10-examples-of-curl-command-in-unix-and-Linux.html) và ```shell``` hữu dụng được cung cấp bởi Linux và các hệ điều hành UNIX khác như Fedora, Ubuntu, CentOS, ...

-----
* *Hãy chia sẻ kinh nghiệm của bạn bằng cách đăng bình luận để làm cho bài viết này hữu ích và nhận được thêm lợi ích từ kinh nghiệm của những người khác nữa.*
-----

Dù sao đi nữa, hãy bắt đầu với những tips hữu ích sau:

<br>

**1. Use ! for Executing the Last Command**

Điều này đã tiết kiệm trung bình 30% thời gian của tôi. Nó luôn xảy ra khi bạn bắn cùng một lệnh UNIX nhiều lần trong một phần của giây,

-----
* **Trước khi biết thủ thuật này, tôi thường sử dụng mũi tên lên xuống để tìm lệnh của mình và 
sau đó thực hiện chúng, việc này tốn rất nhiều thời gian của tôi**, nhưng, sau khi biết thủ thuật này, tôi chỉ cần nhớ tên lệnh, ví dụ: `!ls` sẽ thực thi lệnh `ls -lrt` cuối cùng của bạn, `!vim` sẽ mở file cuối cùng mà không cần viết đầy đủ lệnh. 

Sử dụng mẹo này và trải nghiệm nó, Nó chắc chắn giúp tiết kiệm rất nhiều thời gian và nó cũng 
hữu ích trên các bash shell khác (như `csh` hoặc `ksh`) trong đó mũi tên lên và xuống 
thường không cung cấp cho bạn các lệnh trước đó.

-----

Ví dụ: Sau khi thực hiện `ls -l stock.txt` nếu bạn muốn mở stock.txt, bạn có thể sử dụng [Vim editor](https://www.udemy.com/course/vim-commands-cheat-sheet/?LSNPUBID=JVFxdTr9V80&ranEAID=JVFxdTr9V80&ranMID=39197&ranSiteID=JVFxdTr9V80-pgyloSQ0cuWBcEOmGuFd7g) dưới dạng `vi !$` (Đối số cuối cùng).

<br>

**2. Use !! for Executing the Last Command**

Đây là phần mở rộng của mẹo trước được sử dụng để thực thi lệnh cuối cùng mà bạn đã thực hiện. Vì nó chỉ liên quan đến hai tổ hợp phím và nó cũng cho cùng một kết quả, nó rất nhanh.

-----
* Nó cũng sẽ hoạt động trên các shell trong đó mũi tên lên và xuống không hoạt động như K shell và C shell. Điều này cực kỳ hữu ích nếu bạn dừng hoặc khởi động server hoặc ứng dụng Java để debug thường xuyên.

-----

Btw, nếu bạn chưa quen với bash shell, tôi khuyên bạn nên xem [Bash Shell Scripting: Crash Course For Beginners](https://www.udemy.com/course/bash-shell-scripting-crash-course-for-beginners/?LSNPUBID=JVFxdTr9V80&ranEAID=JVFxdTr9V80&ranMID=39197&ranSiteID=JVFxdTr9V80-DSGxXJ2f_3L4m2fFsVIODw), nơi sẽ dạy bạn bash shell từ dòng lệnh đến shell script.

Một khóa học vô cùng hữu ích cho bất cứ ai muốn trở thành người dùng quyền lực trong Linux.

<br>

**3. Use “CTRL+R” for Repeating the Last Matching Command**

Tốt nhất nếu bạn nhớ lệnh cuối cùng của mình được thực thi vào lúc nào đó và chỉ muốn tìm lệnh đó với cùng một đối số và thực thi.

Đây là mẹo bạn cần nhớ.

-----
* Chỉ cần nhấn phím CRTL + R và gõ các từ mà bạn có trong lệnh cuối cùng và UNIX sẽ tìm thấy lệnh đó cho bạn sau đó chỉ cần nhấn enter.

-----

Tất cả ba lời khuyên trên sẽ tiết kiệm rất nhiều thời gian của bạn nếu bạn thực hiện các lệnh thường xuyên và tỷ lệ lặp lại khá cao.

Tôi đã tiết kiệm được gần 50% 60% thời gian bằng cách làm theo ba lời khuyên trên. Hãy cho tôi biết nó hữu ích với các bạn như thế nào.

<br>

**4. Using history Command to Get Some of the Most Frequently Used UNIX Command**

Well, đây là mẹo đầu tiên tôi học được khi bắt đầu làm việc với UNIX. Đây là lệnh hữu ích nhất của bạn trong UNIX và [Shell scripts](https://click.linksynergy.com/fs-bin/click?id=JVFxdTr9V80&subid=0&offerid=323058.1&type=10&tmpid=14538&RD_PARM1=https%3A%2F%2Fwww.udemy.com%2Fshell-scripting-linux%2F).

-----
* Trong hầu hết các trường hợp, có một lệnh nhất định như bắt đầu, dừng, kiểm tra log file, tạo bản build hoặc thực hiện release, ...

-----

Đây là những lệnh bạn thường cần thực hiện và nếu bạn không nhớ lệnh chính xác thì không cần phải lo lắng, chỉ cần thực hiện `history | grep "keyword"` và bạn sẽ nhận được lệnh đó từ lịch sử trên máy Linux của bạn.

-----
* Có một số biến môi trường nhất định, ví dụ: HISTSIZE xác định có bao nhiêu lệnh lịch sử UNIX có thể lưu trữ, vì vậy hãy cho nó lớn lên.

-----

Đủ để tiết kiệm thời gian của bạn và tránh việc tham khảo tập lệnh của bạn mọi lúc mọi nơi. 

Btw, nếu bạn không quen với các lệnh Linux cơ bản thì tôi khuyên bạn nên xem qua [Shell Scripting: Discover How to Automate Command Line Tasks ](https://click.linksynergy.com/fs-bin/click?id=JVFxdTr9V80&subid=0&offerid=323058.1&type=10&tmpid=14538&RD_PARM1=https%3A%2F%2Fwww.udemy.com%2Fshell-scripting-linux%2F) để làm quen với các lệnh như thế này. 

Nó sẽ giúp bạn tiết kiệm hàng tấn thời gian của bạn bằng cách tránh Google mọi lúc và sau đó để tìm kiếm các lệnh Linux phù hợp cho nhiệm vụ của bạn.

![](https://images.viblo.asia/df11f942-b46e-40b1-ac05-2382e8050a72.jpg)

<br>

**5. Using Regular Expression in grep and find**

[Grep](https://www.java67.com/2017/07/grep-command-example-list-only-file-names-matching-string.html) và [find](https://www.java67.com/2017/07/how-to-find-all-files-containing-matching-text-grep-command-example.html) là hai công cụ tốt nhất mà UNIX cung cấp cho chúng ta. hầu như mọi người đều cần tìm kiếm thứ gì đó trong UNIX, ví dụ: một file, một thư mục, một số từ nhất định trong file,... ví dụ: ERROR hoặc Exception và nếu bạn biết cách sử dụng grep và tìm với biểu thức chính quy (regular expression), bạn sẽ tiết kiệm được rất nhiều thời gian của mình bằng cách nhập ít lệnh hơn.

-----
* Ví dụ: bằng cách biết về egrep, bạn có thể dùng egrep “ERROR|Exception” *.xml  thay vì dùng hai lệnh grep để tìm riêng lẻ "ERROR" và "Exception".

-----

Nếu bạn quan tâm đến việc tìm hiểu thêm về lệnh grep và find, thì bạn nên xem các bài viết trước của tôi [10 examples of grep command](https://javarevisited.blogspot.com/2011/06/10-examples-of-grep-command-in-unix-and.html) and [10 examples of find commands in Linux](https://javarevisited.blogspot.com/2018/08/10-example-of-find-command-in-unix-linux.html).

Tôi đã chia sẻ rất nhiều tùy chọn hữu ích cho hai lệnh này trên các bài viết đó, điều này sẽ giúp bạn nhận được nhiều hơn từ hai lệnh Linux mạnh mẽ này.

![](https://images.viblo.asia/e4b70ee5-ed87-4e1b-b744-b440b687e76c.png)

<br>

**6. Using pipe Instead of firing Two Commands**

Như được nói ở trên mẹo nhỏ này tôi đoán mọi người đều biết.

Nếu bạn không giỏi, thì tốt hơn hết là bắt đầu với một khóa học [Linux command line basic](https://www.udemy.com/course/linux-command-line-volume1/?LSNPUBID=JVFxdTr9V80&ranEAID=JVFxdTr9V80&ranMID=39197&ranSiteID=JVFxdTr9V80-MIyoFaW3VndGZwoxAcGJ9A), vì bạn có thể không biết một số nguyên tắc cơ bản khác.

![](https://images.viblo.asia/10d06feb-5dc4-41e8-9aa4-27923eb5d2c7.jpeg)

Từ kinh nghiệm cá nhân của tôi, tham gia một khóa học tốt đẹp hơn là tìm kiếm thông tin cần thiết theo ít một và chắp vá.

Và, nếu bạn không học hỏi từ các nguồn MIỄN PHÍ, bạn cũng có thể xem danh sách [5 khóa học Linux MIỄN PHÍ](https://www.java67.com/2018/02/5-free-linux-unix-courses-for-programmers-learn-online.html) dành cho developer.

<br>

**7. Using Aliases and Defining Them in Bash Profile or bashrc File**

Bạn đã thấy một số lệnh lạ làm việc trong máy của ai đó chứ không phải của bạn, có thể là bí danh (alias) mà anh ta đã thiết lập trong file `.bashrc` hoặc `.profile` của mình?

Luôn luôn thực hiện loại thiết lập như vậy cho những lệnh thường được sử dụng. Có rất nhiều cách sử dụng file `.bashrc` và `.profile` nhưng một trong những cách quan trọng nhất là thiết lập alias, ví dụ: "l" để tìm kiếm tất cả các tập tin ẩn. "ls" để bao gồm tất cả các tùy chọn hữu ích, ví dụ: "-lrtH" để hiển thị tất cả các thông tin có liên quan.

Bạn có thể xem thêm [ Linux Command Line Interface (CLI) Fundamentals](https://www.pluralsight.com/courses/linux-cli-fundamentals?clickid=UFvSaSS34xyJW5zwUx0Mo3QzUkn19GWvLXmm1E0&irgwc=1&mpid=1193463&utm_source=impactradius&utm_medium=digital_affiliate&utm_campaign=1193463&aid=7010a000001xAKZAA2) để tìm hiểu thêm về cách đăng nhập hoạt động trong Linux và vai trò của các tệp `.login`, `.profile` và `.bashrc` trong Linux và bash shell.

![](https://images.viblo.asia/cf74f1ee-ef04-4482-a541-9504ec89273c.jpg)

<br>

**8. Using pushd, popd, cd -, ~ to Move Across a Directory**

Dựa trên kinh nghiệm của tôi, điều hướng (navigation) trong UNIX shell chiếm gần 50% thời gian của mỗi người và nếu bạn định viết đường dẫn thư mục mọi lúc và sau đó hãy quên việc làm việc nhanh.

-----
* Vì vậy, thay vì nhập tên đầy đủ, hãy sử dụng tất cả các mẹo ở trên và sử dụng tốt nhất lệnh `Pushd`, `popd`, `cd -` và `cd ~`. `cd -` là tốt nhất nếu bạn chuyển đổi giữa hai vị trí thư mục trong UNIX.

-----

<br>

**9. Minimize the Keystrokes or Increase the Speed of Typing**

Bạn càng ít gõ, bạn càng làm việc nhanh hơn. 

Để sử dụng lệnh đã gõ cuối cùng của bạn, hãy sử dụng tab trong bash để cho shell bash UNIX hoàn thành lệnh của bạn.

-----
Sử dụng Ctrl + R nếu lệnh cuối cùng bạn đã nhập rất dài và bạn muốn thay đổi chỉ một vài dòng.

-----

<br>

**10. Keep Learning New Linux Commands**

Cố gắng tìm hiểu thêm các lệnh và các tùy chọn của chúng và sử dụng điều này sẽ giảm thời gian suy nghĩ cho một nhiệm vụ cụ thể và sử dụng `ctrl + z` và `fg` và `bg` để tạm dừng một quy trình.

-----
* Nó tiết kiệm gần 10% thời gian nếu bạn đang xem nhiều file hoặc log file, vì vậy thay vì cứ thực hiện các lệnh vim, chỉ cần thực hiện `Ctrl + Z` để tạm dừng nó và `fg 1` hoặc `fg 2` để đưa nó lên nền trước.

-----

Tôi hy vọng những ví dụ này, các mẹo về lệnh UNIX sẽ giúp bạn làm được nhiều việc hơn trong thời gian ngắn hơn và nâng cao năng suất và kinh nghiệm của bạn khi làm việc trong UNIX.

<br>

***Bài viết được dịch từ :*** https://hackernoon.com/10-basic-tips-on-working-fast-in-unix-or-linux-terminal-5746ae42d277