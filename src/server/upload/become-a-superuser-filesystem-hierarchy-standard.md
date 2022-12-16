![i love linux](https://viblo.asia/uploads/0bfc8566-bb1f-4e8e-8fe0-bd537a86d500.jpeg)

## Lời mở đầu
Xin chào tất cả mọi người. 

Đây là một bài viết khá đặc biệt, khi nó là bài đầu tiên của mình sau gần ... 2 năm "gác bút" trên Viblo. Và động lực khiến mình ngồi xuống viết tiếp bài mới này không có gì khác ngoài sự kiện [Viblo May Fest](https://mayfest.viblo.asia/) :D 

Dù đã có một thời gian dài không trau dồi được mấy về năng lực kỹ thuật, nhưng lần này cũng cố gắng try hard để viết đủ 4 bài trong tháng 5 này xem sao :p Hy vọng cũng sẽ có nhiều bạn giống mình, hãy thử cùng nhau cố gắng  hơn trong việc chia sẻ kiến thức xem sao ;) 

Lần này, nội dung mình muốn chia sẻ là phần tiếp theo trong serie [Become a SuperUser](https://viblo.asia/s/become-a-superuser-24lJDg3WKPM) vốn đang bị ngắt quãng. Ở bài thứ 3 trong series này, chúng ta sẽ cùng đi tìm hiểu về khái niệm **"Filesystem Hierarchy Standard"**, từ đó hiểu được ý nghĩa của các thư mục mặc định trong một distro Linux, cũng như biết được khi mình cần tìm kiếm một file, hay nội dung nào đó, thì mình nên bắt đầu tìm ở đâu ...

## Filesystem Hierarchy Standard là gì

**Filesystem Hierarchy Standard**, viết tắt là **FHS**, là một tiêu chuẩn thiết kế các thư mục trong hệ thống các distributions Linux. Filesystem Hierarchy Standard được tạo ra và maintain bởi [Linux Foundation](https://www.linuxfoundation.org/). Đến nay, FHS cũng đã qua nhiều lần thay đổi. Hiện tại, bản define mới nhất về FHS là phiên bản 3.0, được release vào ngày 3/6/2015.

Nhìn chung thì các Linux Distribution phổ biến đều tuân thủ theo hầu hết các quy tắc của FHS, để giúp người dùng có được những trải nghiệm quen thuộc khi chuyển đổi giữa các họ Distribution. Ngoài ra, những quy tắc của FHS cũng có rất nhiều điểm giống với các hệ điều hành Unix-like khác, chẳng hạn như MacOS, do đó bạn cũng có thể thấy có nhiều điểm tương đồng ở đây. 

Mục đích của việc tạo ra và tuân thủ FHS là để:
- Giúp cho các phần mềm khi cài đặt có thể phán đoán được nơi sẽ lưu trữ các file hay thư mục của mình, hay của phần mềm khác đã được cài đặt từ trước.
- Giúp cho người dùng có thể phán đoán được nơi sẽ lưu trữ các file, hay thư mục của một phần mềm nào đó

Để thực hiện điều đó thì FHS:
- Đưa ra một vài nguyên tắc hướng dẫn chung cho cách phân bổ thư mục trong filesystem
- Chỉ định các file và thư mục tối thiểu cần phải có của một hệ thống
- Đưa ra các ngoại lệ cho từng nguyên tắc 

Để dễ dàng hơn cho việc phân chia các file vào các thư mục khác nhau, thì FHS chia các file trong hệ thống theo 2 thuộc tính: **là shareable hay unshareable** và **là variable hay static**.

- **Shareable** files là những file được lưu ở host này, nhưng có thể được share, hay có thể được access ở hosts khác. **Unshareable** files phải nằm trên hệ thống mà chúng được sử dụng, hay hiểu đơn giản hơn thì tất cả những files không phải là **Sharable** thì sẽ là **Unsharable** :v Ví dụ như những thư mục như `/home` hay `/var/www` hay `/opt` sẽ chứa các files là **Sharable**, còn những thư mục như  `/etc`, `/var/lock`, `boot` sẽ chứa các files là **Unsharable**

- **Static** files bao gồm các binaries, libraries, documentation files hay tất cả các files khác mà không thể bị thay đổi nội dung nếu không có users với quyền Admin can thiệp. **Variable** files là những file mà được tạo ra, và có thể thay đổi bởi users, hoặc system process, ví dụ như  logs file, spool files, databases, user data ... Hay hiểu đơn giản thì tất cả những files không phải là **Static** thì sẽ là **Variables**.

Chúng ta có một bảng đơn giản thể hiện xem một thư mục sẽ chứa các files có thuộc tính gì, như sau:

| | shareable | unshareable |
| -------- | -------- | -------- |
| **static**    | `/usr`, `/opt`   | `/etc`, `/boot`     |
| **variable**    | `/var/mail`, `/var/spool/news`     | `/var/run`, `/var/lock`     |

Việc nắm rõ tính chất của một file, là sharable hay unsharable, là static hay variable sẽ giúp bạn dễ dàng phán đoán được vị trí của nó hơn. Hay việc nắm rõ vai trò của một thư mục, sẽ giúp bạn dễ dàng phán đoán được những dạng file mà nó sẽ lưu trữ bên trong hơn.

## Những quy chuẩn chung về cách phân bổ thư mục trong hệ thống
Giống như các hệ thống Unix-like, thì các distro Linux cũng có các file và thư mục được đặt ở bên trong một **thư mục gốc** có đường dẫn là `/`.  Ngay phía dưới thư mục gốc, sẽ có những thư mục như sau:
- `/bin` là thư mục chứa những file binaries, tức những command, cơ bản và thiết yếu của hệ thống, được sử dụng bởi admin hoặc user bình thường. Đặc biệt, những commands trong thư mục `/bin` này có thể sử dụng được ngay cả khi ở trong Single User Mode, hay Maintenance Mode. Một số commands bạn có thể tìm thấy ở đây như `cat`, `chgrp`, `chmod`, `chown`, `cp`, `date`, `dd`, `df`, `dmesg`, `echo`, `hostname`, `kill`, `ln`, `login`, `ls`, `mkdir`, `mknod`, `more`, `mount`, `mv`, `ps`, `pwd`, `rm`, `rmdir`, `sed`, `sh`, `stty`, `su`, `sync`, `umount`, `uname` ...
- `/boot` chứa tất cả các files cần thiết cho quá trình boot hệ thống. 
- `/dev` chứa các device files. Ví dụ như `/dev/disk0`, `/dev/sda1`, `/dev/tty` ... Có một khái niệm rất hay của Unix/Linux mà có thể các bạn cũng đã làm quen trong lập trình, đó là `/dev/null`, đây chính là **null device**, tức là một *thiết bị* sẽ bỏ qua mọi dữ liệu được ghi vào nó, nhưng vẫn sẽ báo lại là quá trình ghi đã thành công. Tức ví dụ như khi chạy một command, có thể mặc định output sẽ được in ra màn hình terminal (tức stdout), và bạn có thể loại bỏ quá trình in output ra màn hình bằng cách forward nó vào `/dev/null`, tức chương trình vẫn cứ chạy bình thường, và output của nó được in ra một nơi ... không có gì cả.  
- `/etc` là thư mục chứa các "host-specific system-wide configuration files", tức các file config cho những phần mềm thuộc về hệ thống hiện tại. Configuration file có thể hiểu là một file dùng để điều khiển cách thức hoạt động của một chương trình. Configuration file là một **static** file, và không phải là một file binary có thể thực thi. Thông thường, config của các chương trình được đặt trong một thư mục con bên trong `/etc`. Chẳng hạn muốn tìm file config của nginx, bạn nên bắt đầu từ việc check thư mục `/etc/nginx` đầu tiên. Cái tên `etc` này thực sự là một trong những tên thư mục khó hiểu nhất của hệ thống Linux. Lúc đầu nhìn vào, bạn sẽ khó đoán biết được nó có ý nghĩa là gì :v Thực tế nó bắt nguồn từ Unix, và ban đầu có ý nghĩa là `etcetera directory`, tức thư mục và chứa những files không thuộc về những chỗ khác =)) Sau này, với việc định nghĩa lại vai trò của thư mục `/etc` thì bản thân nó cũng được diễn giải theo nhiều cách khác nhau, ví dụ như  "Editable Text Configuration" hay "Extended Tool Chest".
- `/home` là thư mục chứa các file, cũng như personal settings của từng người dùng. Thực tế thì đây chỉ là một thư mục optional của hệ thống Linux. Tức là bạn có thể bắt gặp những hệ thống sẽ không có thư mục `/home`. Ngoài ra các directory con bên trong `/home` thường sẽ là các thư mục có tên theo tên các users của hệ thống, thế nên về cơ bản thì cấu trúc thư mục con bên trong `/home` là không xác định.
- `/lib` là thư mục chứa các file libraries cần thiết cho việc boot hệ thống, cũng như để thực thi các câu lệnh bên trong `/bin/` và `/sbin`
- `/media` là thư mục nơi mount các thiết bị media như `floppy` (ổ đĩa mềm), `cdrom` (ổ đĩa CD) ...
- `/mnt` là thư mục chứa các filesystems được mount tạm thời
- `/opt` là thư mục để cài đặt các packages cho add-on application software. `opt` là viết tắt của từ `optional`, với ý nghĩa là các phần mềm được cài đặt ở đây là `optional`, thường là các phần mềm không cài đặt trực tiếp từ packages management của distro. Có một đặc điểm là các phần mềm được cài đặt vào trong `/opt` sẽ được đặt và quản lý trong 1 thư mục của phần mềm đó. Điều đó đồng nghĩa là, nếu muốn xóa một phần mềm được cài đặt trong `opt` thì bạn chỉ cần ... xóa đúng cái thư mục của phần mềm đó là được (bởi tất cả các file binary, libraries, configuration files ... đều nằm trong đó hết). Điều này tạo ra sự khác biệt giữa `opt` với `/usr/local` là chúng ta sẽ tìm hiểu thêm ở phía dưới.  
- `/proc`, viết tắt của `process`, là thư mục chứa các process đang chạy hay thông tin về kernel ở dạng files.
- `/root`, là thư mục home cho user `root` của hệ thống
- `/run`, là thư mục chứa thông tin về hệ thống đang chạy, kể từ khi nó được boot lần gần nhất, chẳng hạn như những thông tin về người dùng đang log in, hay những background process đang chạy ... Những file ở trong thư mục này được được remove hoặc truncate khi mà hệ thống được boot. Bạn sẽ hay bắt gặp các file `.pid` (lưu thông tin về process id), `.sock` (socket file), hay `.lock` ở trong thư mục `/run` này. Thực tế trước đây thì thư mục được sử dụng cho mục đích này là `/var/run`, và từ phiên bản FHS 3.0, nó được chuyển thành `/run`. Tuy nhiên, để đảm bảo tính backwards compatibility cho các phần mềm cũ (mà vẫn truy vấn đến `/var/run`) thì FHS vẫn đề cập đến `/var/run`, và các distro Linux sẽ tạo ra symbolic link từ `/var/run` đến `/run`. Bạn có thể dùng lệnh `ls -l /var/` để check xem sao :D 
-  `/sbin` về cơ bản cũng giống với `/bin`, tức chứa các file binary command của hệ thống, và có thể được thực thi ở Singer User Mode (Maintenance Mode). Điểm khác biệt nằm ở chỗ `/sbin` là thư mục chứa các command thường là dành cho `superuser`, tức cần đến quyền root để thực thi. 
- `/srv` là thư mục chứa data được cung cấp ra bên ngoài bởi hệ thống. Đó có thể là data hay scripts cho web servers, data được cung cấp bởi FTP server, hay các repositories của các phần mềm version control system... `srv` có lẽ là viết tắt của từ `served` 
- `/sys`là nơi chứa các thông tin về devices, drivers, cũng như một số kernel features. `sys` thì chắc là viết tắt của từ `system` rồi :D
- `/tmp` là thư mục để chứa các file tạm thời, được sinh ra bởi các chương trình đã và đang chạy. `tmp` là viết tắt của từ `temporary`. Ngoài `/tmp` ra thì các chương trình có thể lưu lại các file tạm vào thư mục `/var/tmp` nữa  
- `/usr`là thư mục chứa hầu hết các dữ liệu read-only và sharable user data. Ban đầu nhìn thấy thư mục này, mình đã nghĩ ngay đến việc `usr` là viết tắt cả từ `user`, nhưng thực tế nguồn gốc của nó lại là bắt nguồn từ việc viết tắt của cụm từ `Unix System Resources` :joy: Tuy nhiên ngày nay thì mình cũng thấy nhiều nơi đọc tên thư mục là `user` cho đơn giản =)) FHS không chỉ đưa ra những quy chuẩn cho các thư mục nằm bên dưới thư mục root `/`, ngoài ra nó còn đưa ra quy chuẩn cho các thư mục nằm bên dưới `/usr/` nữa. Cụ thể bên dưới `/usr` chúng ta sẽ có các thư mục như `/usr/bin`, `/usr/include`, `/usr/lib`, `/usr/libexec`, `/usr/local`, `/usr/sbin`, `/usr/share`, `/usr/src`
- `/var`, là thư mục chứa variable files, tức những files mà sẽ liên tục thay đổi trong quá trình vận hành hệ thống, chẳng hạn như những file logs, lock file, email tạm thời ... FHS cũng đưa ra những quy chuẩn cho thư mục bên dưới `/var/`. Cụ thể thì chúng ta sẽ có các thư mục `/var/account` (optional), `/var/cache`, `/var/crash` (optional), `/var/games` (optional), `/var/lib`, `/var/lock` (thường là symbolic link đến `/run/lock`), `/var/log`, `/var/mail`,  `/var/opt` (variable data cho các phần mềm được cài đặt trong `/opt`), `/var/run` (là symbolic link trỏ đến `/run`, được đưa vào để đảm bảo tính backwards compatibility), `/var/spool`, `/var/tmp`, `/var/yp` (optional)

Trên đây là một số giải thích sơ qua về các thư mục quan trọng của một hệ thống Linux bên dưới thư mục gốc, và được quy định rõ trong FHS. Tuy nhiên, chắc hẳn khi đọc qua, rồi đối chiếu với quá trình sử dụng trong thực tế của mình, chắc hẳn bạn vẫn còn có nhiều thắc mắc. Chúng ta hãy cùng tiếp tục đi sâu hơn vào một số vấn đề nhé.

## Phân biệt `/bin`, `/sbin`, `/usr/bin`, `/usr/sbin`, `/usr/local/bin`, `/usr/local/sbin`
Như đã chia sẻ ở trên, thì `/bin/` và `/sbin` là chứa các command cơ bản, và thiết yếu cho người quản trị sử dụng ở chế độ Single User Mode. Ngược lại, những câu lệnh khác (file binary khác), mà không thật sự cần thiết khi cần khắc phục sự cố ở Maintenance Mode chẳng hạn, thì sẽ được lưu bên trong `/usr`. Thông thường các phần mềm được cung cấp bởi chính distribution, được cài đặt qua package manager của hệ thống, thì sẽ xuất hiện trong `/usr/bin` và `/usr/sbin` (điểm khác biệt giữa 2 thư mục này thì cũng tương tự sự khác biệt giữa `/bin/` và `/sbin`, khi mà `/usr/sbin` là dành cho những người quản trị hệ thống).

Ngoài ra thư mục `/usr/local` có thể coi là một phiên bản thu nhỏ của ... chính `/usr`, khi mà bên trong `/usr/local` cũng có những thư mục như `/usr/local/bin`, `/usr/local/sbin`, `/usr/local/etc`, `/usr/local/lib` ... riêng. 

Mục đích của thư mục này là dành cho người dùng cài đặt những phần mềm của họ viết ra, hay những phần mềm tự build, tự cài, mà không phải cài theo đường chính chủ của distribution. `/usr/local` sẽ giúp cho những phiên bản bạn tự cài không bị conflict với những phiên bản khác, hay những file config khác của hệ thống. Từ đó, bạn chắc cũng đã nhận ra được sự khác biệt giữa `/usr/local/bin` và `/usr/bin` rồi nhỉ :D 

## Phân biệt `/tmp` và `/var/tmp`
Cả 2 thư mục này đều sinh ra để chứa các file tạm (temporary files), và điểm khác biệt duy nhất giữa chúng đó là vấn đề thời gian bạn muốn giữ chúng là bao lâu. `/tmp` được thiết kế để lưu các file tạm mà sẽ bị clear sau mỗi lần reboot. Khi hệ thống boot thì sẽ có process chạy để thực hiện việc xóa hết các files ở đây. Ngược lại các files trong `/var/tmp` thì không bị xóa giữa các lần reboot, do đó nó là nơi thích hợp để bạn lưu trữ các file, chẳng hạn như cache, mà bạn không muốn bị mất sau mỗi lần khởi động lại hệ thống. 

## Lời kết
Trên đây là các kiến thức cơ bản về **Filesystem Hierarchy Standard**, hy vọng rằng các bạn sẽ có được cái nhìn tổng thể về cấu trúc thư mục trong một hệ thống Linux sẽ như thế nào. Nhìn chung FHS đưa ra một số quy chuẩn và các Linux distro ngày nay thì follow theo hầu hết các quy chuẩn đó, thế nên nắm được ý nghĩa về cách phân bố thư mục này sẽ giúp bạn cảm thấy đỡ bỡ ngỡ khi chuyển từ distro này sang distro kia hơn. :D Nếu muốn tìm hiểu thêm về FHS, bạn có thể đọc kỹ tài liệu chính thức gồm 50 trang của Linux Foundation. Bản pdf các bạn có thể download tại [đây](https://refspecs.linuxfoundation.org/FHS_3.0/fhs-3.0.pdf) 

Xin cảm ơn các bạn đã theo dõi, và xin hẹn gặp lại trong những bài viết tiếp theo trong serie [Become A SuperUser](https://viblo.asia/s/become-a-superuser-24lJDg3WKPM) này trên Viblo nhé.

## References
- http://wiki.linuxquestions.org/wiki/Filesystem_Hierarchy_Standard
- https://learning.lpi.org/en/learning-materials/101-500/104/104.7/
- https://www.ibm.com/developerworks/linux/library/l-lpic1-v3-104-7/
- https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard
- https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html
- https://www.linuxjournal.com/content/filesystem-hierarchy-standard