## 1. Mở đầu
Linux, chắc hẳn đây là cái tên mà nhiều bạn đã biết tới, nhưng xung quanh đó vẫn còn nhiều khái niệm mơ hồ và nhiều điều chưa được tường tận, có phải nó là một hệ điều hành không ?

Đặc biệt, đối với nhiều người dùng phổ thông, đây lại là một cái gì đó huyền bí, nhất là màn hình Terminal với các dòng lệnh chạy vun vút, thật là đáng sợ :D

![](https://images.viblo.asia/304fe7f2-aac5-4408-84ef-8f791133ad96.png)

Ohh không, nó không nguy hiểm tới mức như thế đâu, cứ bình từ (bình tĩnh + từ từ) rồi sẽ rõ.

## 2. Lợi ích

Cái gì cũng vậy, trước khi tìm hiểu thì tự hỏi xem mình bỏ công sức cày cuốc về nó thì mình được gì đã:

> Tuyển dụng

Đối với nghề lập trình nói riêng, các công ty thường sẽ thích tuyển người có kinh nghiệm với Linux hơn. Tuy chưa đến mức "có thì chưa hẳn là thế mạnh, thiếu thì là một điểm trừ" nhưng cũng nên lưu tâm :blush: 

+ Ồ chuẩn rồi, đến nay, Linux được sài rất rộng rãi.

+ Các thiết bị Internet of Things cũng sài Linux nhiều.

+ Môi trường server thì chủ yếu là Linux, cái này ăn đứt các OS khác nhé :D

+ Quen với Linux trong máy tính thường ngày bẳn sẽ dễ dàng thao tác với server hơn sau này.

+ Hệ điều hành di động được sử dụng nhiều nhất thế giới là Android cũng được xây dựng trên Linux.

+ Coder thường thích code trên Linux hơn là Windowws (ngoại trừ game), MacOS thì khỏi bàn.

+ Terminal tuyệt vời cùng với các ngôn ngữ shell scripting như bash, [zsh](https://viblo.asia/p/hieu-ro-hon-toi-uu-va-su-dung-phim-tat-cho-terminal-ORNZqowM50n),... gần như là đặc sản của Linux mà nhà phát triển nào cũng thích.

> Mã nguồn mở

Một cộng đồng hỗ trợ không giới hạn.

+ Chất lượng cao, đồng thời giảm sự lệ thuộc vào những hệ điều hành đóng như Microsoft Windows, cho phép người ta sử dụng nó một cách miễn phí, tự do tham gia phát triển, đóng góp, định hướng hoặc tùy chỉnh nó theo nhu cầu và nguyện vọng của riêng mình. 

+ Đây vốn là những điều không thể thực hiện được đối với những hệ điều hành đóng mà điển hình là Windows. Ngoài ra với mã nguồn mở thì các ông lớn kia ít có cơ hội thực hiện những âm mưu đen tối với người dùng hơn.


> An ninh

Dùng Linux thì ít lo lắng về virus hơn, có thể gần như là yên tâm. Vì sao ?

+ Hệ thống phân quyền user trên Linux rất chặt chẽ nên việc lây lan khó hơn Windows. Mặc định không để bạn đăng nhập với quyền root, một số tác vụ bạn có thể chạy với sudo nhưng có yêu cầu mật khẩu.

+ Với Windows, file thực thi có thể chạy với quyền Admin một cách dễ dàng. Nhưng để thực thi một file trên Linux thì cần phải thay đổi thuộc tính file (với chmod), chạy với quyền user hoặc dùng sudo. Tuy bấy nhiêu là không chắc chắn tránh khỏi virus, nhưng cũng là một bức tường khá lớn.

![](https://images.viblo.asia/0b1a8ed8-7475-428b-abc0-9faa4fe85306.jpg)

+ Với Linux, người dùng được một cộng đồng trên toàn cầu cung cấp các bản sửa lỗi bảo mật mỗi ngày, điều đó có nghĩa là họ sẽ dễ dàng phát hiện và sửa lỗi nhanh hơn, chứ không phải ngồi chờ cấp phát như với các HĐH, ứng dụng sử dụng mã nguồn đóng khác.

+ Trong khi đó hầu như chúng ta tuần nào cũng đọc được những bài báo nói về những lỗ hổng đã tìm thấy trong hệ thống Windows hoặc những ứng dụng dùng trong Windows, và điều đó cũng tương tự xảy ra với Mac OS.

+ Hầu như ai cũng biết đến lỗi autorun nổi tiếng trên win xp, thời kì usb có khắp mọi nơi, cứ cắm usb vào là hẹo luôn. Sau hơn 10 năm lỗi này mới được vá. Windows còn vô số các lỗi bảo mật khác, chậm vá lỗi. Linux được cộng đồng bảo kê hầu hết các lỗi nhỏ hay lớn nếu công bố đều được vá, ai cũng có thể tải bản vá về để cập nhật một cách nhanh chóng.

+ Hiện nay thị trường laptop cá nhân sài Windows và MacOS là lớn hơn rất nhiều so với Linux nên rõ ràng đây là miếng đất màu mỡ cho các hacker tung hoành. Linux thì chủ yếu dành cho server. Đã khó rồi, mà mó vào cũng không ngon.

> Nhanh gọn nhẹ

Đặc biệt là né được cái Windows Update :D

+ Từ dung lượng bộ cài đặt cho tới thời gian cài đặt, dung lượng phân vùng system đều bé hơn Windows nhé.

![](https://images.viblo.asia/91658325-9eec-4dfb-b4c0-eb3193165e3b.jpg)

+ Khởi động, tắt máy cũng bụp phát à xong. Nhiều bạn đã quay sang dùng các hệ điều hành họ Linux (điển hình là Ubuntu) và không muốn trở về Windows nữa ngoại trừ khi chơi game và làm đồ họa.


> Bản quyền

Tình trạng bản quyền ở Việt Nam thì chắc các bạn cũng biết rồi.

+ Giá của những phần mềm, hệ điều hành đóng không hề rẻ và không phải ai cũng đủ khả năng chi trả cho chúng. Điều này đã thúc đẩy con người đi tìm những phiên bản lậu, key lậu. Tuy nhiên đây lại là một điều vô cùng xấu khi bản chất của nó không hề khác việc ăn cắp thành quả, công sức trí tuệ của người khác. Chưa nói đến những nguy cơ tiềm tàng như mã độc, virus, rò rỉ thông tin... khi bạn sử dụng chúng.

+ Một cái miễn phí mà vẫn đáp ứng nhu cầu cơ bản ngon, một cái có phí đắt mà an ninh chưa tốt, bạn chọn cái nào :D


> Khả năng cập nhật

Bạn chán cảnh Windows Update và quay ngòng ngòng.

+ Bạn cũng cảm thấy khó khăn để nâng cấp Windows sau vài năm bởi vì không biết rõ đường dẫn đến nơi chứa bản nâng cấp? 
+ Trong khi đó, Ubuntu Linux cung cấp phiên bản mới mỗi 6 tháng và sự hỗ trợ dài hạn trong vòng 2 năm với mỗi phiên bản. Ngoài ra, các nhà cung cấp HĐH Linux thường xuyên cung cấp các bản sửa lỗi và vá bảo mật trong năm ngay khi cần thiết.


![](https://images.viblo.asia/5eb7650e-f2b5-45bf-8372-c1431c634e55.jpg)

> Một thế giới mới

Và đây là điều quan trọng nhất, bạn có thêm được một cái nhìn hoàn toàn mới lạ về thế giới OS. (Operating System - Hệ điều hành) Hướng bạn tới cộng đồng mã nguồn mở, một điều thật là tốt đẹp.

+ Okie, ngon rồi, trong bài viết đầu tiên này, chúng ta sẽ cùng tìm hiểu nguồn gốc, lịch sử hình thành của chú chim cánh cụt nhé !

+ Còn chờ gì nữa @@ Let go :D

## 3. Nguồn gốc

### 3.1 Unix

+ Trước khi nói tới Linux, t phải kể về Unix & BSD trước đã.

+ Oh, thế nó là gì vậy ?

![](https://images.viblo.asia/4af0e286-dc31-4c9f-a77b-3347f151d2b5.jpg)

+ Ngày xửa ngày xưa, :v: vào năm 1969 :v: hệ điều hành Unix bắt nguồn từ một đề án nghiên cứu tại phòng thì nghiệm `Bell Labs` của công ty `AT&T` và được dẫn dắt bởi  `Ken Thompson, Dennis Ritchie` - hai nhà khoa học máy tính nổi tiếng.

![](https://images.viblo.asia/ea2cbd1b-017b-4641-8ac1-f906c4ba2682.jpg)

                          Chân dung Ken Thompson (bên trái), Dennis Ritchie (bên phải)
 
+ Phiên bản đầu tiên của `Unix` được ra đời vào tháng 3 năm 1971, tiếp đó là phiên bản thứ 2 ra đời năm 1972.

+ Trong 10 năm đầu, việc phát triển `Unix` giới hạn bên trong `Bell Labs` là chính. Những phiên bản trong thời gian này được gọi là Version n (Vn).

+ Unix bắt đầu được viết bằng ngôn ngữ `Assembly` nhưng sau đó `Dennis Ritchie` - cha đẻ của ngôn ngữ lập trình C đã chuyển qua viết lại Unix bằng chính ngôn ngữ C (trừ nhân kernel, I/O). Và rồi:

+ Năm 1973, V4 được viết bằng C. Đây là sự kiện đáng chú ý nhất trong lịch sử hệ điều hành này vì lợi ích của việc viết hệ điều hành bằng ngôn ngữ bậc cao là có khả năng mang mã nguồn của hệ sang các nền máy tính khác và biên dịch lại, chính nhờ điều này mà hệ điều hành sẽ có các bản chạy trên các hệ máy tính khác nhau.

+ Năm 1976, V6 được phát miễn phí cho các trường đại học.

+ Năm 1979, V7 được phát hành rộng rãi với giá `$100$` cho các trường đại học và `$21,000` cho những thành phần khác. V7 là phiên bản căn bản cho các phiên bản sau này của Unix.

(Số liệu này lấy từ Wikipedia - vâng `$21,000` không thể tin được)

### 3.2 [BSD](http://www.bsd.org)

+ Những năm của thập niên 70, AT&T `chia sẻ` Unix cho những tổ chức giáo dục, hay tổ chức thương mại bên ngoài, từ đó dẫn đến sự ra đời của nhiều phiên bản Unix khác nhau. 

+ Từ năm 1977, `Computer Systems Research Group (CSRG)` của trường đại học `California`, Berkeley được quyền sử dụng code của Unix để phát triển ra nhãn hiệu UNIX khác là `BSD (Berkeley Software Distribution)`

+ Có nhiều công ty lớn sử dụng FreeBSD cho hệ thống máy chủ như Yahoo, Sony.

![](https://images.viblo.asia/29931fb1-879d-47cf-a918-7fff2b208b15.png)

                             Màn hình cửa sổ lệnh của FreeBSD

+ Khi AT&T bắt đầu khai thác Unix như sản phẩm `thương mại` thì tiền bản quyền Unix tăng lên nhanh chóng (đoạn `$21,000` ở trên đó) làm cho Berkeley phải đặt kế hoạch thay mã nguồn của AT&T bằng mã riêng. Việc này tốn rất nhiều thời gian và không kịp hoàn thành khi Berkeley bị ngưng tài trợ nghiên cứu hệ điều hành, CSRG `giải tán`. 

![](https://images.viblo.asia/4fe6dc99-5ce1-4fa6-9e6f-e858514839fd.png)

+ BSD Unix và AT&T Unix là hai dòng chính của Unix. 

  BSD giúp cho Unix trở nên phổ biến và có nhiều đóng góp về mặt kỹ thuật như: csh, termcap, curses, vi, TCP/IP socket, long file name, symbolic link.

### 3.3 Unix && BSD

+ Nhánh BSD đi đến hồi kết của quá trình phát triển với sự ra đời và của các open source project như: FreeBSD, NetBSD và OpenBSD. BSD phát triển từ version 1 đến version cuối cùng 4.4 năm 1992.

+ Trong khi đó, phiên bản cuối cùng của Unix được phát triển bởi Bell Laps, phiên bản Unix 10, được ra mắt vào năm 1989.

+ Mặc dù phiên bản chính thức của Unix, BSD đã dừng phát triển từ lâu, thế nhưng những di sản mà chúng để lại là rất lớn cho đến ngày hôm nay. Rất nhiều hệ điều hành, từ close source cho đến open source đều dựa trên 2 nhánh này.

![](https://images.viblo.asia/dbec3972-1da1-48ce-83d5-cc4482bda85e.png)

                         Sự tiến hóa của Unix và các hệ điều hành tương tự Unix
                         
                         
> Hoặc thấy rối mắt quá thì mời bạn xem bức ảnh này

![](https://images.viblo.asia/9fdc05b1-a243-4e72-81d4-ab85a4572263.png)
                         

### 3.4 [GNU](https://www.gnu.org)

+ Năm 1971, `Richard Stallman` bắt đầu làm việc tại MIT trong một nhóm nhân viên kĩ thuật chuyên sử dụng phần mềm tự do. Tuy vậy, đến những năm của thập kỉ 80, hầu hết các phần mềm đều có tính chất sở hữu (bản quyền). Nhận thấy điều này có thể ngăn cản việc hợp tác giữa những người phát triển phần mềm, Stallman và những người khác khởi đầu dự án `GNU` vào năm 1983.

![](https://images.viblo.asia/f9aa3968-3add-4772-a337-af89091390f9.jpg)

                                       Richard Stallman tại đại học Pittsburgh 2010
                                       
+ Mục tiêu của dự án GNU là tạo ra được một hệ điều hành giống Unix nhưng miễn phí, nơi mà mọi người có quyền tự do copy, phát triển, chỉnh sửa và phân phối phần mềm và việc tái phân phối là không bị giới hạn.

+ Sau đó vào năm 1985, `Stallman` bắt đầu thành lập `Tổ chức phần mềm tự do` và viết ra giấy phép chung GNU (GNU General Public License - GNU GPL) vào năm 1989.

+ Khoảng đầu 1990, nhiều chương trình như thư viện, trình biên dịch, trình soạn thảo văn bản, Unix Shell, và một chương trình quản lý cửa sổ đã ra đời, nhưng các thành phần cấp thấp cần thiết như trình điều khiển thiết bị, daemons, và kernel vẫn chưa hoàn thành.

+ Như vậy điều `Richard Stallman` tìm kiếm bây giờ là có phần nhân hệ điều hành để chạy những phần mềm trên.

+ Và thế là định mệnh của cuộc tình đôi ta bắt đầu từ đây: GNU và Linux.


### 3.5 [Minux](https://sourceforge.net/projects/minux)

+ Nhưng trước khi kể về Linux, chúng ta sẽ kể một chút về Minix, đây là một hệ điều hành kiểu Unix, được thiết kế vì mục đích giáo dục bởi giáo sư `Andrew S. Tanenbaum`

![](https://images.viblo.asia/11315d7b-0bc6-408a-ac4a-65db7beec8c2.png)

                                    Chân dung giáo sư Andrew S. Tanenbaum

+ Chính `Minix` đã là nguồn cảm hứng cho `Linus Torvalds` để viết `Linux`. 

+ Vào năm 2005, `Minix` trở thành một phần mềm tự do. Tên `Minix` là viết tắt của `Mini Unix`.



### 3.6 [Linux](https://www.linux.org)

+ Vào năm 1991 trong khi đang học tại `Helsinki` - `Phần Lan`, `Linus Torvalds` bắt đầu có ý tưởng về một hệ điều hành, hơn nữa ông cũng nhận thấy hạn chế trong `giấy phép` của Minix - chỉ cho phép việc sử dụng `Minix` trong giáo dục mà thôi. Ông bắt đầu viết nên hệ điều hành riêng của mình.

![](https://images.viblo.asia/24d02ced-bfc0-4d9f-9d7a-2f10e80b689d.jpg)

                Chân dung Linus Torvalds, tác giả của hệ điều hành mã nguồn mở Linux.

+ `Torvalds` phát triển `Linux kernel` trên môi trường `Minix`, các ứng dụng viết cho `Minix` có thể sử dụng trên `Linux`. Sau này, khi Linux đã "trưởng thành" thì việc phát triển `Linux` diễn ra ngay trên hệ thống `Linux`.

### 3.7 [GNU/Linux](https://www.gnu.org)

+ Thế là bác `Richard Stallman` sở hữu các phần mềm của GNU thì thiếu lõi, nhân kernel, còn bác `Linus Torvalds` thì đã có nhân kernel nhưng để phát triển lên được hệ điều hành hoàn chỉnh là còn nhiếu rất nhiều thứ abc xyz. Cả hai bác đều có chung tư tưởng lớn, muốn xây dựng hệ điều hành mã nguồn mở.

+ Vậy là tư tưởng lớn gặp nhao, ôm hôn thắm thiết, kiểu như này:

![](https://images.viblo.asia/17e60eb8-bfca-4b92-9a10-8467ec057eb1.jpg)

                    Linus Torvalds (trái) và Richard Stallman (phải) - ahihi ^_^

+ `Linus Torvalds` làm việc một cách hăng say trong vòng `3 năm` liên tục và sự kết hợp của `nhân Linux` cùng `các phần mềm` của GNU đã cho ra đời hệ điều hành hoàn toàn miễn phí đầu tiên. Nó được mang tên `GNU/Linux` với phiên bản 1.0 vào năm 1994 - được phát triển và tung ra trên thị trường dưới bản quyền GNU General Public License. Do đó mà bất cứ ai cũng có thể tải và xem mã nguồn của `GNU/Linux`.

![](https://images.viblo.asia/e65e233c-0198-48d1-b3c4-4c866f877340.jpg)

+ Các ứng dụng `GNU` cũng dần thay thế các thành phần của `Minix`.

+ Như vậy, có vài điều lưu ý:

1. Một cách chính xác, thuật ngữ `Linux` được sử dụng để chỉ `nhân hệ điều hành` (kernel), chứ bản thân nó chưa phải là hệ điều hành nhé !

    Còn hệ điều hành được tạo ra bởi việc đóng gói `nhân Linux` cùng với các thư viện và công cụ `GNU` - hệ điều hành bạn đang sử dụng đó, nó có tên là `GNU/Linux`. Nhưng không hiểu sao người ta gọi ngắn ngọn lại là `Linux`. Hẳn là một sự bất công bằng cho `GNU`, nhưng biết làm sao được. Và đành xuôi theo chiều gió, trong series này, mình cũng dùng từ `Linux` để chỉ hệ điều hành này, còn khi nào cần nhắc tới phần nhân thì mình sẽ nói rõ là `kernel Linux`.

    Nếu không tin, bạn thử vào [Terminal](https://viblo.asia/p/hieu-ro-hon-toi-uu-va-su-dung-phim-tat-cho-terminal-ORNZqowM50n) gõ:
    ![](https://images.viblo.asia/91c22f7a-0109-42ed-ade9-e90faca5be91.png)
    
    
2. `Linux` không hề `kế thừa` dòng code nào từ `Unix` cả, nó được xây dựng mới và kết hợp với các phần mềm của GNU để trở thành một `bản clone` của Unix nhưng miễn phí, vì thời điểm đó Unix và Minux đều là close source và mất phí. Gọi là nhìn theo sản phẩm "nhà người ta" và "tự" bắt chước.

## 4. Linux Distribution

+ Do hệ điều hành Linux (ý mình là GNU/Linux ấy :D) cho phép mọi người sao chép, phát triển, chỉnh sửa và phân phối nên kể từ đó đã có `khá nhiều` các bản phân phối của Linux (Linux Distribution) được thị trường ưa chuộng.

![](https://images.viblo.asia/ff0a4729-c465-4408-8ea1-c91f6b8d4986.png)

> Ảnh nhỏ quá phải không, các bạn chịu khó tham khảo ảnh lớn ở [đây](https://upload.wikimedia.org/wikipedia/commons/1/1b/Linux_Distribution_Timeline.svg) nhé !


+ Mỗi bản phân phối Linux thường là `tập hợp` một số lượng lớn các phần mềm như máy chủ web, các ngôn ngữ lập trình, các hệ quản trị cơ sở dữ liệu, các môi trường desktop như GNOME và KDE, và các ứng dụng thích hợp cho công việc văn phòng như OpenOffice, LibreOffice ...

+ Hiện nay có rất nhiều các bản phân phối, từ một bản distro có thể phát triển lên để tạo nên một hay nhiều distro khác nên chúng có thể anh em dây mơ rễ má với nhau phết đấy, trông cái [gia phả](https://upload.wikimedia.org/wikipedia/commons/1/1b/Linux_Distribution_Timeline.svg) dòng họ Linux phát nản ^_^

+ Như các bạn có thể thấy có 3 nhánh distro lớn như sau:

> Debian: 

+ Một bản phân phối `phi thương mại` và là một trong những bản phân phối `ra đời sớm nhất`, duy trì bởi một cộng đồng phát triển `tình nguyện` với một `cam kết` mạnh mẽ cho nguyên tắc phần mềm miễn phí và quản lý dự án dân chủ.

+ Dòng này đẻ ra Ubuntu này, Linux Mint này, Kali Linux này, ...

+ Có vẻ rằng dòng này `to tay` nhất Vịnh Bắc Bộ, khá phổ biến và được cài trên máy tính các nhân khá nhiều. Đặc biệt có Ubuntu cho cả server và desktop khá thịnh hành.

+ `Ubuntu`, một bản phân phối phổ biến cho máy tính để bàn và máy chủ bắt nguồn từ `Debian`,
 ![](https://images.viblo.asia/8a07cb68-ffe5-435e-a35d-c027823b8424.png)
 
                                       Ubuntu
            
            
 duy trì bởi một công ty của Anh, Canonical Ltd.

 
+   `Ubuntu` thường ra phiên bản mới vào tháng 4 và tháng 10 hằng năm.
 
     +  Chính phủ liên bang Brazill nổi tiếng về những hỗ trợ của họ cho Linux.
       
      + Có tin tức là quân đội Nga đang xây dựng một bản phân phối Linux cho riêng họ, điều đó đã trở thành hiện thực như dự án G.H.ost.
    
       + Bang Kerala của Ấn Độ đã buộc tất cả các trường trung học chạy Linux trên máy tính. 
    
       + Trung Quốc sử dụng Linux một cách riêng biệt như một hệ điều hành cho dòng xử lý mang tên Loongson, với mục đích thoát khỏi sự phụ thuộc về công nghệ. 

       + Ở Tây Ban Nha, một vài khu vực đã phát triển các bản phân phối Linux cho riêng họ, và được sử dụng rộng rãi trong trường học và các tổ chức. 
    
       + Bồ Đào Nha sử dụng bảng phân phối Caixa Mágica của họ. 
    
       + Pháp và Đức cũng có những bước thực hiện cho việc chấp nhận Linux.

+ `Kubuntu` - phiên bản KDE của `Ubuntu`
+ `Linux Mint` - một bản phân phối dựa trên và tương thích với `Ubuntu`.

    ![](https://images.viblo.asia/80b2888d-82b7-404a-b29c-66ffbdae52e2.png)
    
                                                      Linux Mint

  
     Có giao diện khá giống với `Windows`, nếu bạn mới bắt đầu chuyển sang và khá bỡ ngỡ với `họ nhà Linux` thì có thể dùng thử HĐH này để làm quen dần.

> RedHat:

   + Dòng này cũng là tên một `công ty` của Mĩ, họ này nổi tiếng có [Fedora](https://getfedora.org).
   + `Fedora` sẽ là nơi mà các phần mềm nguồn mở mới được tạo lập, phát triển và kiểm thử `trong` môi trường cộng đồng trước khi được đưa vào Red Hat Enterprise Linux ( RHEL - một bản thương mại của công ty, ý là chuột bạch).
   ![](https://images.viblo.asia/e64986a1-ff03-4442-9d02-0c4728047147.jpg)
   
                                            Fedora
   
   + Nó tìm cách cung cấp các thử nghiệm, an toàn, ổn định cho các máy chủ và máy trạm Linux hỗ trợ cho các doanh nghiệp.

   + Tuy vậy RHEL vẫn public source rất nhiều, từ đó cộng đồng xây dựng và phát triển khá nhiều distro, trong  đó phải nhắc tới [CenOS](https://www.centos.org).
   ![](https://images.viblo.asia/dbdb6b39-9354-4985-9e07-a53f9a5f1e64.jpg)
   
                                            Centos
           
   + Oracle Linux, cũng phát sinh từ Red Hat Enterprise Linux, duy trì và hỗ trợ thương mại bởi Oracle
Scientific Linux, một bản phân phối phát sinh từ mã nguồn tương tự của Red Hat,duy trì bởi Fermilab.

> Slackware:

 + Mình có tham khảo tài liệu các nơi thì thấy thấy mặc dù nó cũng `to` thật nhưng chưa có gì nổi bật quá. Bài này cũng đã dài quá rồi, các bạn chịu khó tự tìm hiểu phần này nhé !

> Và có một hệ điều hành chỉ kế thừa nhân kernel Linux lên, đó chính là Android.

 
## 4. Nhược điểm

+ Không gì là hoàn hảo.


> Đầu tiên, phải nhắc tới độ thân thiện.

+ So với Windows thì Linux khó dùng hơn.

+ Việc cài một phần mềm cùng giao diện đồ họa trên Windows với người dùng phổ thông đôi khi đã phức tạp rồi, chưa nói cài qua `terminal` và cơ chế phân quyền của Linux. Có phải chăng Window đã đổi độ `bảo mật` lấy tính `dễ sử dụng` và `sự thoải mái` cho người dùng ?

+ Về cơ bản thì Linux có những cách cài phần mềm như sau:
 
  Một là Software Center, kiểu như Play Store của Adroid ấy :D
 
 ![](https://images.viblo.asia/b680dacf-301e-4f4b-9a71-4d9b0024151e.png)
 
   
   Hai là sử dụng cửa sổ dòng lệnh:

   ![](https://images.viblo.asia/a5d3da02-14b3-490e-be2c-fb7e64ed9d7c.png)
   
  Ba là cài đặt từ file:
   
   Có hai định dạng phân phối phần mềm rất phổ biến dành riêng cho Linux đó là `RPM (Redhat package manager)` thường dùng cho Readhat, OpenSure ... và `DEB (Debian software package)` thường dùng cho Debian, Ubuntu ...

   ![](https://images.viblo.asia/551f6ecb-be9f-48ca-89ac-d172e75fe7be.png)

> Các phần mềm đồ họa

 + Các phần mềm mạnh về `thiết kế`, `biên tập` `chỉnh sửa` `ảnh`, `video` như họ nhà `Adobe (AE, AI, PS ..`) hay `Proshow Producer, Camtasia Studio, ...` đều lấy Windows làm nền tảng chính, được support và chạy ngon nghẻ nhất.

 + Bạn có thể cài đặt chúng trên Linux thông Wine và PlayOnLinux nhưng có vẻ chưa trơn tru lắm, và dùng không "sướng" được như trên Windows.
 
 ![](https://images.viblo.asia/b5989257-800b-49c3-926c-09b7fffdb60c.jpg)
 
 + Cũng đã từng làm `video editor`, treo máy cả đêm để `render` video, mình phải công nhận làm trên Windows `thoải mái` hơn, dễ `bay bổng` và ra `ý tưởng` hơn Linux, Linux phù hợp cho `command line` hơn và ngược lại.

> Nhiều người thắc mắc rằng có phải rất khó tìm driver cho Linux ?

+ Oh không phải, bạn có công nhận rằng khi bạn cài `windows 7` xong, đôi lúc phải `mò mẫm` cài `thủ công` driver wifi, mạng ... Phải đợi đến `windows 10`, trong quá trình cài mà `cắm giác mạng` vào là nó mới auto nhận được các driver cần thiết.

+ Nhưng với các `Linux Distro`, rất `ít` khi phải cài thủ công driver, sau khi cài xong hệ điều hành là full `driver` cần thiết rồi.

+ Oh, thế điểm yếu là gì, vâng, driver với `nVidia`

    Linux gặp `rắc rối` với công nghệ `nVidia Optimus` - chuyển đổi tự động giữa card onboard và card rời nVIDIA.
    
    ![](https://images.viblo.asia/ab1a0455-e69c-41a0-9e8b-ff9f164b50ca.jpg)
    
    Hãng này đã ngưng hỗ trợ công nghệ `Optimus` trong các bản driver chính thức cho Linux của mình, dẫn đến nhiều phiền toái cho người dùng, khi cả `card onboard` và `card rời` đều chạy, làm hao pin và thậm chí nhiều trường hợp còn bị dính `Black Screen of Death` (một dạng màn hình khi bị treo của Linux).
    
    Tuy nhiên, đây không phải là lỗi của `Linux`, mà là vấn đề của `driver nVIDIA`. Cộng đồng Linux đã liên tục `yêu cầu` nVIDIA công bố các `thông số` thiết kế về phần cứng của mình để cộng đồng mã nguồn mở có thể bắt tay vào `viết driver` cho Linux. 
    
    `AMD` thì khác, họ không những công bố các thông tin này mà còn `hỗ trợ` tận tình cộng đồng mã nguồn mở để `viết` nên các bản driver cho Linux.
    
    Các máy tính đời mới, có `card rời Nvidia` thì thường sẽ tích hợp công nghệ `Optimus` này, mình cũng đã dính chưởng với [Acer Nitro 5](https://www.acervietnam.com.vn/gaming/nitro-5) mới mua hồi tháng trước, login vào Linux xong là treo máy, không thao tác được gì, bạn có thể tham khảo cách fix tại [đây](https://askubuntu.com/questions/150610/why-are-virtual-terminal-blank-using-nvidia-propietary-drivers/150626#150626) hoặc [đây](https://forums.linuxmint.com/viewtopic.php?t=168108) hoặc search từ khóa `Bumblebee`, `CUBA` và đọc để hiểu thêm sự khác nhua giữa `flash`, `nomodeset`, `quiet` tại [đây](https://askubuntu.com/questions/716957/what-do-the-nomodeset-quiet-and-splash-kernel-parameters-mean/716966).

## 5. Tái phím 

Định viết là `tái bút` mà không thấy bút đâu nên viết `tái phím` các bạn ạ :D

+ Đây là bài "viết" dài nhất mà mình từng "gõ" :D, nếu có ai đang đọc đến dòng này thì thực sự ... cảm ơn bạn.
+ Toàn về `lý thuyết`, khi viết mình mới `tìm hiểu thêm` và `nhận ra` nhiều điều.
+ Bài viết `tham khảo` từ nhiều nguồn, có những đoạn mình đã `dẫn nguyên` cả câu văn dài.
+ `Mục đích` của bài này là `tổng hợp` kiến thức trên mạng và hệ thống hóa lại đỡ mất thời gian tìm, đọc, hiểu.

Xin được trích dẫn nguồn:

1. https://vi.wikipedia.org/wiki/Unix
2. https://vi.wikipedia.org/wiki/Linux
3. https://techmaster.vn/posts/34124/cau-hoi-phong-van-ve-linux
4. https://vi.tiny.ted.com/talks/linus_torvalds_the_mind_behind_linux
5. https://kipalog.com/posts/Gioi-thieu-ve-Linux-va-cac-ban-phan-phoi
6. https://tinhte.vn/threads/nhung-quan-niem-sai-lam-ve-linux.1367606/
7. https://www.dienmayxanh.com/kinh-nghiem-hay/tim-hieu-ve-he-dieu-hanh-linux-596466
8. http://ipmac.vn/technology-corner/tim-hieu-linux-mot-he-dieu-hanh-va-nen-tang-da-nang
9. https://viettimes.vn/phong-van-linus-torvalds-nhan-dip-25-nam-hdh-mo-linux-48669.html
10. https://viblo.asia/p/become-a-superuser-part-0-unix-vs-linux-nguon-goc-va-su-khac-biet-rNkKxxMAKlm