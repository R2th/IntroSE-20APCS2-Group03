## Mở đầu

UNIX, Linux, Kernel, GNU, Linux Torvalds, ... 

## The Linux Programming Interface - Phần 1: Lịch sử và các chuẩn

Linux là một thành viên trong họ hệ điều hành UNIX. UNIX có một lịch sử lâu dài. Phần đầu tiên của chương nói về tổng quan về lịch sử. Chúng ta sẽ mô tả các sự kiện chính của hệ thống UNIX và ngôn ngữ lập trình C, sau đó sẽ xem 2 điều dẫn hệ thống Linux vẫn tồn tại cho đến ngày nay: dự án GNU và sự phát triển của Linux kernel.

Một trong những tính năng đáng chú ý của hệ thống UNIX là không bị điều khiển mở một nhà cung cấp hay một tổ chức duy nhất. Hơn thế, rất nhiều nhóm, cả thương mại và phi thương mại, đều đóng góp vào sự phát triển của nó. Kết quả là có rất nhiều tính năng được thêm vào UNIX, nhưng cũng gây ra những hậu quả là các bản UNIX implementations đã khác nhau quá nhiều, vì thế việc viết ứng dụng để có thể chạy trên tất cả các bản UNIX implementations trở nên ngày càng khó khăn hơn. Điều này dẫn đến việc phải đưa ra các chuẩn cho UNIX, cái mà chúng ta đã thảo luận trong phần 1 của chương này.

Có hai định nghĩa về UNIX thường được sử dụng. Một là nói đến những hệ điều hành mà đã đạt được chuẩn Single UNIX Specification. Tại thời điểm hiện tại, không có phiên bản free UNIX implementations (ví dụ Linux và Free BSD đạt được branding này)

Hai là hệ điều hành có chức năng và giao diện giống với hệ điều hành UNIX cổ điển (ví dụ Bell Laboratories UNIX, System V và BSD). Bởi định nghĩa Linux cũng được xếp vào UNIX. Mặc dù chúng ta sẽ tập chung vào Single UNIX Specifications trong cuốn sách này, chúng sẽ theo định nghĩa thứ 2 về UNIX. Vì thế chúng tôi sẽ thường xuyên nói "Linux, cũng như các bản UNIX implementations khác..."

### Tóm tắt lịch sử về UNIX và C

Phiên bản đầu tiên UNIX được phát triển vào năm 1969 (cùng năm Linus Torvalds sinh ra) bởi Ken Thompson tại phòng thí nghiệm Bell, một bộ phận của telephone corporation AT&T. Nó được viết bằng hợp ngữ cho máy Digital PDP-7 mini-computer. Tên UNIX như là một kiểu chơi chữ MULTICS (Multiplexed Information and Computer Service), tên của dự án hệ điều hành sớm hơn của AT&T kết hợp với MIT và General Electric. Thompson đã vẽ ra một vài ý tưởng cho hệ điều hành mới từ MULTICS, bao gồm cấu trúc cây thư mục, các chương trình độc lập và các trình thông dịch (the shell), và các khái niệm về tập tin như là một unstructured streams of bytes.

Năm 1970, UNIX được viết lại bằng hợp ngữ cho máy Digital PDP-11 minicomputer.

Một thời gian ngắn sau đó, Dennis Ritchie, một đồng nghiệp của Thompson tại Bell đã thiết kế và phát triển ngôn ngữ lập trình C. Đây là một bước tiến lớn. C kế thừa từ một số trình thông dịch, B. B bắt đầu được implement bởi Thompson và được kế thừa từ các ngôn ngữ lập trình trước đó có tên là BCPL. Năm 1973, C đã phát triển đến độ hầu hết UNIX kernel được viết lại bằng C. UNIX trở thành một hệ điều hành đầu tiên được viết bằng ngôn ngữ bậc cao, sự thật là vẫn phải có các chuyển đổi qua lại giữa các kiến trúc phần cứng.

Nguồn gốc của C giải thích tại sao, hậu duệ của nó C++, lại được sử dụng rộng rãi như một ngôn ngữ lập trình hệ thống ngày nay. Các ngôn ngữ khác: FORTRAN cho việc làm toán bởi các kĩ sư và nhà khoa học. COBOL cho các hệ thống thương mại và xử lý dữ liệu. C vẫn được phát triển cho đến nay, và không giống FORTRAN hay COBOL (được phát triển bởi nhiều committees), C được thiết kế bởi cá nhân cho tới khi đạt được duy nhất một mục đích: phát triển một ngôn ngữ bậc cao cho việc implement UNIX kernel và các phần mềm liên quan. Giống như chính hệ điều hành UNIX, C được phát triển bởi các chuyên gia lập trình cho mục đích sử dụng của họ. Kết quả là một ngôn ngữ nhỏ gọn, hiệu quả, mạnh mẽ, ngắn gọn, mô đun hóa, và mạch lạc trong thiết kế.

#### 6 phiên bản đầu tiên của UNIX

Giữa những năm 1969 và 1979, UNIX đã phát hành vài phiên bản, gọi là "editions". Bản chất là các bản snapshots được phát triển bởi AT&T.

 - Phiên bản đầum 11/1971: thời điểm này, UNIX chạy trên PDP-11 và có trình biên dịch FORTRAN và rất nhiều chương trình hữu dụng cho tới ngày nay, bao gồm ar, cat, chmod, chown, cp, dc, ed, find, ln, ls, mkdir, mv, rm, sh, su và who
 - Bản thứ 2, 6/1972, UNIX có thể cài đặt trên 10 máy của AT&T
 - Bản thứ 3, 2/1973, bao gồm trình biên dịch C và bản implementation đầu tiên về pipes
 - Bản thứ 4, 11/1973, hầu hết UNIX được viết bằng C
 - Bản thứ 5,  6/1974 UNIX được cài đặt cho hơn 50 hệ thống
 - Bản thứ 6, 5/1975: được sử dụng rộng rãi ngoài AT&T

```
Over the period of these releases, the use and reputation of UNIX began to spread,
first within AT&T, and then beyond. An important contribution to this growing
awareness was the publication of a paper on UNIX in the widely read journal
Communications of the ACM ([Ritchie & Thompson, 1974]).
At this time, AT&T held a government-sanctioned monopoly on the US telephone system. The terms of AT&T’s agreement with the US government prevented
it from selling software, which meant that it could not sell UNIX as a product.
Instead, beginning in 1974 with Fifth Edition, and especially with Sixth Edition,
AT&T licensed UNIX for use in universities for a nominal distribution fee. The
university distributions included documentation and the kernel source code (about
10,000 lines at the time).
AT&T’s release of UNIX into universities greatly contributed to the popularity
and use of the operating system, and by 1977, UNIX was running at some 500 sites,
including 125 universities in the United States and several other countries. UNIX
offered universities an interactive multiuser operating system that was cheap yet
powerful, at a time when commercial operating systems were very expensive. It also
gave university computer science departments the source code of a real operating
system, which they could modify and offer to their students to learn from and
experiment with. Some of these students, armed with UNIX knowledge, became
UNIX evangelists. Others went on to found or join the multitude of startup companies selling inexpensive computer workstations running the easily ported UNIX
operating system.
```

#### Lịch sử của BSD và System V

Tháng 1/1979, phiên bản 7 của UNIX, được nâng cấp và cung cấp hệ thống file system. Bản phát hành này bao gồm rất nhiều công cụ mới bao gồm awk, sed, tar, uucp. Bourne shell và một FORTRAN 77 compiler. Bản phát hành thứ 7 rất có ý nghĩa bởi vì UNIX đã được chuyển hướng thành 2 biến thể: BSD và System V.

Thompson dành năm 1975/1976 để thăm các giáo sư ở trường đại học University of California  ở Berkeley, là trường đại học cũ của ông. Tại đó, ông đã làm việc với rất nhiều học sinh và thêm rất nhiều tính năng cho UNIX. (Trong số các học sinh này, Bill Joy sau đó đã trở thành nhà đồng sáng lập Sun Microsystems). Qua thời gian rất nhiều công cụ và tính năng được phát triển tại Berkeley, bao gồm C shell, vi editor, một bản nâng cấp file system (the Berkeley Fast File System), sendmail, một Pascal compiler, và trình quản lý bộ nhớ ảo trên kiến trúc mới Digital VAX

Dưới tên Berkeley Software Distribution (BSD), phiên bản này của UNIX, bao gồm mã nguồn, được phân phối rộng rãi. Phiên bản được phân phối đầy đủ là 3BSD trong tháng 12/1979. (Sớm hơn là Berkeley-BSD và 2BSD).

Trong năm 1983, the Computer Systems Research Group tại University of California ở Berkeley phát hành 4.2BSD. Bản phát hành này rất có ý nghĩa bởi vì nó bao gồm các bản cài đặt hoàn tất của TCP/IP, bao gồm lập trình socket, và rất nhiều networking tools. Phiên bản trước đó 4.1BSD được phân phối rộng rãi cho các trường đại học trên khắp thế giới. Học cũng là những người tạo nên nền tảng cho SunOS (phát hành năm 1983), bản UNIX được bán bởi Sun. 

Một số bản BSD khác như 4.3BSD năm 1986, và bán cuốn 4.4BSD năm 1993

```
The very first ports of the UNIX system to hardware other than the PDP-11
occurred during 1977 and 1978, when Dennis Ritchie and Steve Johnson
ported it to the Interdata 8/32 and Richard Miller at the University of Wollongong in Australia simultaneously ported it to the Interdata 7/32. The Berkeley
Digital VAX port was based on an earlier (1978) port by John Reiser and Tom
London. Known as 32V, this port was essentially the same as Seventh Edition
for the PDP-11, except for the larger address space and wider data types.
```
Trong khi đó, luật chống độc quyền tại mỹ, ép việc chia AT&T (bắt đầu từ giữa năm 1970, tới 1982). Kết quả là trong bản System III được phát hành năm 1981. System III được phát triển bởi AT&T's UNIX Support Group (USG), có vài trăm nhân viên phát triển và nâng cấp UNIX và các ứng dụng. Phiên bản đầu tiên của System V vào năm 1983, và có hàng loạt các phiên bản được phát triển sau đó, năm 1989 System V Release 4 (SVR4), thời gian này System V kết hợp nhiều tính năng từ BSD bao gồm các tiện ích mạng. 

Do vậy, rất nhiều BSD distributions sau nhưng năm 80s. UNIX có sẵn rất nhiều implementation chạy trên nhiều phần cứng. Các implementations này bao gồm SunOS và sau đó là Solaris, Digitals Ultrix và OSF/1 (sau được đổi tên HP Tru64 YNIX), IBM AIX, Hewlett-Parkard's (HP's) HP-UX, NeXT's NeXTStep, A/UX cho Apple Macintosh, và Microsoft và SCO's XENIX cho kiến trúc 32 bit Intel. Mỗi nhà cung cấp sản xuất một hoặc một vài chip architectures độc quyền, họ bán các hệ điều hành độc quyền. 


### Tóm tắt lịch sử Linux

Thuật ngữ Linux thường được nói đến là hệ điều hành UNIX-like với Linux kernel là một phần của nó. Tuy nhiên, điều này là không chính xác kể tử khi rất nhiều thành phần quan trọng được bao gồm các trong các bản phân phối Linux thương mại. Nguồn gốc thực sự của Linux là từ một dự án.

#### The GNU Project

Trong năm 1984, Richard Stallman, là một lập trình viên tài năng đặc biệt, người mà đã làm việc ở MIT, đã tạo ra một phiên bản miễn phí của UNIX. Stallman đã chống lại giới hạn về sự hợp pháp của việc độc quyền về hệ điều hành của các nhà cung cấp máy tính. Các giới hạn này nghĩa là việc mua máy tính mà không nhìn thấy mã nguồn của các phần mềm, chúng đang mua và họ chắc chắn không thể sao chép thay đổi và phân phối lại nó. Anh ấy cũng khuyến khích các lập trình viên để cạnh tranh với những người khác và tích hợp vào công việc của họ. 

```
Stallman militated against the legal restrictions placed on proprietary operating systems by computer vendors. These restrictions meant that purchasers of computer software in general could not see the source code of the software they were
buying, and they certainly could not copy, change, or redistribute it. He pointed
out that such a framework encouraged programmers to compete with each other
and hoard their work, rather than to cooperate and share it.
In response, Stallman started the GNU project (a recursively defined acronym
for “GNU’s not UNIX”) to develop an entire, freely available, UNIX-like system,
consisting of a kernel and all associated software packages, and encouraged others
to join him. In 1985, Stallman founded the Free Software Foundation (FSF), a nonprofit organization to support the GNU project as well as the development of free
software in general.
When the GNU project was started, BSD was not free in the sense that Stallman meant. Use of BSD still required a license from AT&T, and users could
not freely modify and redistribute the AT&T code that formed part of BSD.
One of the important results of the GNU project was the development of the GNU
General Public License (GPL), the legal embodiment of Stallman’s notion of free
6 Chapter 1
software. Much of the software in a Linux distribution, including the kernel, is
licensed under the GPL or one of a number of similar licenses. Software licensed
under the GPL must be made available in source code form, and must be freely
redistributable under the terms of the GPL. Modifications to GPL-licensed software are freely permitted, but any distribution of such modified software must also
be under the terms of the GPL. If the modified software is distributed in executable form, the author must also allow any recipients the option of obtaining the
modified source for no more than the cost of distribution. The first version of the
GPL was released in 1989. The current version of the license, version 3, was
released in 2007. Version 2 of the license, released in 1991, remains in wide use,
and is the license used for the Linux kernel. (Discussions of various free software
licenses can be found in [St. Laurent, 2004] and [Rosen, 2005].)
The GNU project did not initially produce a working UNIX kernel, but did
produce a wide range of other programs. Since these programs were designed to
run on a UNIX-like operating system, they could be, and were, used on existing
UNIX implementations and, in some cases, even ported to other operating systems. Among the more well-known programs produced by the GNU project are the
Emacs text editor, GCC (originally the GNU C compiler, but now renamed the
GNU compiler collection, comprising compilers for C, C++, and other languages),
the bash shell, and glibc (the GNU C library).
By the early 1990s, the GNU project had produced a system that was virtually
complete, except for one important component: a working UNIX kernel. The GNU
project had started work on an ambitious kernel design, known as the GNU/HURD,
based on the Mach microkernel. However, the HURD was far from being in a form
that could be released. (At the time of writing, work continues on the HURD,
which currently runs only on the x86-32 architecture.)
Because a significant part of the program code that constitutes what is commonly known as the Linux system actually derives from the GNU project, Stallman prefers to use the term GNU/Linux to refer to the entire system. The
question of naming (Linux versus GNU/Linux) is the source of some debate
in the free software community. Since this book is primarily concerned with
the API of the Linux kernel, we’ll generally use the term Linux.
The stage was set. All that was required was a working kernel to go with the otherwise complete UNIX system already produced by the GNU project.
```

#### Linux Kernel

Trong năm 1991, Linus Torvalds, một học sinh Phần Lan tại trường Đại học của Helsinki, đã viết một hệ điều hành cho máy tính Intel 80386 của ông. Trong một khóa học, ông phải sử dụng Minix, một hệ điều hành nhỏ UNIX-like được phát triển vào giữa năm 80 của thế kỷ trước bởi Andrew Tanenbaum, một giáo sư Đại học tại Holland. Tanenbaum tạo ra Minix. The Minix kernel có thể build và chạy trên hệ thống 386, Tuy nhiên, nó được sử dụng như là một công cụ dạy học, nó được thiết kế phụ thuộc vào kiến trúc phần cứng, và nó không sử dụng được hết khả năng của vi xử lý 386.

Torvalds bắt đầu dự án tạo ra một kernel có đầy đủ tính năng của UNIX kernel chạy trên 386. Vài tháng sau, Torvalds phát triển một kernel cho phép ông có thể biên dịch và chạy được rất nhiều GNU programs. Sau đó 5-10-1991, Torvalds yêu cầu sự giúp đỡ của các lập trình viên khác.

```
Do you pine for the nice days of Minix-1.1, when men were men
and wrote their own device drivers? Are you without a nice
project and just dying to cut your teeth on a OS you can try to
modify for your needs? Are you finding it frustrating when
everything works on Minix? No more all-nighters to get a nifty
program working? Then this post might be just for you. As I
mentioned a month ago, I’m working on a free version of a
Minix-look-alike for AT-386 computers. It has finally reached the
stage where it’s even usable (though may not be depending on
what you want), and I am willing to put out the sources for wider
distribution. It is just version 0.02 . . . but I’ve successfully run
bash, gcc, gnu-make, gnu-sed, compress, etc. under it.
```
Theo sau truyền thống của UNIX đều kết thúc với chữ X, kernel này được gọi là Linux. Ban đầu Linux được đặt dưới rất nhiều giấy phép giới hạn, nhưng Torvalds sớm tạo nó có sẵn dưới giấy phép GNU GPL.

Rất nhiều lập trình viên khác tham gia với Torvalds trong quá trình phát triển của Linux, thêm rất nhiều tính năng như nâng cấp file system, hỗ trợ networking, thiết bị in, hỗ trợ đa vi xử lý. Tháng 4 1994, các lập trình viên đã phát hành phiên bản 1.0. Linux 1.2 vào tháng 3/1995. phiên bản 2.0 vào tháng 6/1996, Linux 2.2 vào 1/1999, Linux 2.4 vào 1/2991. 2.5 tháng 11/2001, 2.6 vào tháng 12/2003

#### An aside: the BSDs
#### Linux kernel version numbers
#### Ports to other hardware architectures
#### Linux distributions


### Các chuẩn

### Tổng kết

Hệ thống UNIX được phát triển đầu tiên 1969 trên máy tính Digital PDP-7 minicomputer bởi Ken Thompson tại Bell Laboratories (của AT&T). hệ điều hành lấy nhiều ý tưởng và được chơi chữ theo tên MULTICS system. Năm 1973, UNIX được viết cho PDP-11 và được viết lại bằng C, một ngôn ngữ được thiết kế và cài đặt tại phòng thí nghiệm Bell bởi Dennis Ritchie. Để hợp pháp hóa việc bán UNIX, AT&T đã phân phối các hệ thống tới các trường đại học trên danh nghĩa. Các phân phối này bao gồm cả mã nguồn, và trở nên rất nổi tiếng trong trường đại học, từ đó nó cung cấp một hệ điều hành rẻ hơn  mà mã nguồn được học và chỉnh sửa bởi các nhà khoa học máy tính và các học sinh.

Trường đại học California tại Berkeley đóng vai trò như nhà phát triển hệ thống UNIX. tại đây Ken Thompson và một số học sinh đã tốt nghiệp tại đây mở rộng hệ điều này. Năm 1979, trường đại học đã sản xuất các bản phân phối UNIX của họ, BSD, Các phân phối này được sử dụng rộng rãi và là nền tảng của rất nhiều bản UNIX thương mại.

Cùng với BSD là hệ thống System V.

Hai thứ khác nhau cùng dẫn tới việc phát triển hệ hống (GNU/) Linux. Một trong số đó là GNU Project được sáng lập bởi Richard Stallman. Những năm cuối thập niên 80. GNU Project đã hầu như hoàn tất, có thể phân phối miễn phí. Năm 1991 lấy cảm hứng bởi Minix kernel viết bởi Andrew Tanenbaum, Linux Torvalds đã xây dựng UNIX kernel cho kiến trúc Intel x86-32. Torvalds mời các lập trình viên khác tham gia với ông để phát triển kernel này. Nhiều lập trình viên khác đã làm vậy, qua thời gian, Linux đã mở rộng và chạy được trên rất nhiều kiến trúc phần cứng

Vấn đề portability problems (Người dịch: portability problems/ porting/ portability issues mình hiểu là để chạy trên nhiều phần cứng, đa nền tảng, ...) trong UNIX và C implementations tồn tại từ những năm 80s. Ngôn ngữ C có chuẩn năm 1989 (C89), và được sửa đổi năm 1999 (C99). Lần đầu đọc chuẩn hóa operating system interface POSIX.1, phê chuẩn bởi tổ chức IEEE năm 1988, và như ISO standard năm 1990. Trong suốt những năm 1990, các chuẩn khác đề u được phác thảo bao gồm rất nhiều chuẩn của Single UNIX Specification. Năm 2001, gộp POSIX 1003.1-2001 và SUSv3 được phê duyệt. Chuẩn này được hợp nhất và mở rộng từ rất nhiều bản POSIX trước đó và Single UNIX Specifications trước đó. Trong năm 2008, sửa đổi và hoàn thiện gộp POSIX 1003.1-2008 và SUSv4.

Không giống như các bản thương mại UNIX implementations, Linux chia ra rất nhiều phân phối. Hậu quả là không có một bản "official" Linux distribution. Mỗi nhà phân phối Linux lại tạo ra các bản snapshot từ bản kernel hiện tại, với rất nhiều các bản vá được áp dụng. LSB phát triển và quảng cáo một tập các hệ thống Linux nhắm đén sử bảo đảm các ứng dụng có thể tương thích giữa các bản phân phối Linux, vì thế các ứng dụng đã được biên dịch và chạy ổn định trên các hệ thống Linux khác nhau.

## Kết thúc

Không biết các bạn đã cài Linux như bài tập phần trước của mình chưa. Nếu chưa thì hãy làm ngay đi.

Bài tập là bạn hãy xem 5 video đầu tiên: https://www.youtube.com/playlist?list=PL7B2bn3G_wfBuJ_WtHADcXC44piWLRzr8.

> Không cần phải vượt trội hơn đồng bào của mình, hãy vượt trội hơn bạn trong quá khứ

Trong bài tiếp theo mình sẽ dịch tiếp Phần 2: Các khái niệm cơ bản.