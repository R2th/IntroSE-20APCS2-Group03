Song song với series bài viết chia sẻ về Git ([ Mọi người có thể tham khảo tại link này](https://viblo.asia/p/hieu-ro-hon-ve-git-qua-bai-toan-xay-dung-kho-hang-V3m5W1LEZO7) ) mình sẽ tạo thêm một series nữa chia sẻ với mọi người về những kiến thức căn bản, nền tảng, cốt lõi của Linux, được gọi là **LINUX 101**. Với series mới này mình hi vọng sẽ gỡ bỏ được phần nào những khúc mắc của các bạn khi mới tiếp xúc với Linux cũng như có thể nhen nhóm được phần nào đó niềm đam mê, sự hào hứng với nền tảng hệ điều hành mã nguồn mở huyền thoại này. 

![](https://images.viblo.asia/7988347a-92ee-4ef3-8f02-7ae4e305f7c7.jpg)

<br>
Cũng như đại đa số mọi người khi bắt đầu chuyển từ sử dụng Windows sang Linux (cụ thể như ubuntu, arch, mint, centos, ...) sẽ gặp rất nhiều bỡ ngỡ, mình cũng vậy, vô số câu hỏi, thắc mắc phát sinh xoay quanh nền tảng này: tại sao các ông lại phải dùng lệnh để gõ? sao không thao tác bằng giao diện đồ họa cho tiện? tại sao nó không chia thành các ổ đĩa để lưu trữ như windows? Tại sao tôi không có microsoft office, cùi bắp vậy? Shell là cái gì? Kernel là gì?, ... Vâng, tất cả, tất cả các thắc mắc đó, bạn sẽ cùng với tôi, chúng ta cùng làm rõ trong series này nhé.

<br>

### 1. Đặt vấn đề.<br>
Giống như hàng ngàn môn học mà bạn đã trải qua trong suốt quãng đời phổ thông, rồi đại học, bài đầu tiên luôn là bài học tổng quan, mang lại cho bạn cái nhìn toàn diện nhất về thứ chúng ta chuẩn bị đắm chìm trong thời gian sắp tới, và bài chia sẻ hôm nay cũng vậy, sau khi đọc xong các bạn có thể nắm được một số vấn đề sau:<br>
* Linux là gì? Nó từ đâu đến và do ai tạo ra?
* Những thành phần chính cấu tạo nên một hệ thống linux
* Chức năng, nhiệm vụ tổng quan của từng thành phần đó
* Những bản phân phối nổi tiếng ( được sử dụng phổ biến ) của linux

### 2. Linux là gì?
Chắc chắn rồi, bạn cũng như tôi, một người chưa từng dùng, làm việc với linux bao giờ sẽ vô cùng bối rối trước vô vàn những phiên bản, các tên gọi mà ta biết rằng nó chỉ là linux thôi, tại sao phải lắm tên như vậy. Bên cạnh đó tôi cũng chắc rằng bạn còn bối rối hơn trước những khái niệm  như LiveCD, GNU, ... khi lựa chọn một phiên bản linux mà mình muốn sử dụng, thì đây chính là hòn gạch đầu tiên đặt móng cho bạn đây. 

<br>
Dù các tài liệu khác nhau có giải thích như nào chăng nữa thì một hệ thống linux có thể tóm gọn lại bao gồm 4 thành phần chính sau:

* Linux kernel
* GNU utilities
* Môi trường đồ họa desktop
* Phần mềm ứng dụng

Từng thành phần một đều có những nhiệm vụ riêng biệt, nếu bạn tách chúng riêng rẽ nhau thì sẽ không có cái gì hữu dụng cả ( teamwork rất chặt chẽ phải không nào), bạn có thể xem bức hình dưới đây để nhìn được một cách tổng quan về hệ thống Linux

![](https://images.viblo.asia/52116a35-e057-4f04-805d-7d84965b7b12.png)

<br>

#### 2.1. Linux kernel

Lõi ( có thể hiểu là nhân, là xương sống, là tủy, ...) của một hệ thống linux được gọi là kernel. Kernel điều khiển toàn bộ phần cứng cũng như phần mềm của hệ thống máy tính, có thể coi như một vị tướng quân, điều binh khiển tướng. Nó gọi đến các phần cứng khi cần thiết, truy xuất, xử lý đến các phần mềm nếu thích ( ok, tất nhiên không phải là nó thích mà là bạn thích :D )

<br>

Chắc hẳn ít nhiều bạn cũng đã nghe đến Linus Torvalds như là cha đẻ của Linux nhưng thật sự ông ấy không phải là người tạo nên toàn bộ nền tảng này. Linus đã tạo nên kernel Linux đầu tiên khi ông đang học đại học Helsinki. Mục đích của ông là copy lại hệ thống Unix khi đó đang nổi đình nổi đám. Sau khi phát triển xong kernel Linux ông công khai nó trên mạng internet và kêu gọi cộng đồng cùng phát triển nó. **The First Linux Kernel** của Linus được sự đón nhận đông đảo từ sinh viên cho tới các lập trình viên chuyên nghiệp trên toàn thế giới. Cho tới hiện nay thì không còn chỉ riêng Linus phát triển code của kernel mà đã là một nhóm các lập trình viên cùng ông phát triển nó.

<br>
Kernel đảm nhiệm 4 chức năng chính sau:

* Quản lý bộ nhớ hệ thống
* Quản lý các chương trình phần mềm
* Quản lý phần cứng
* Quản lý hệ thống lưu trữ (filesystem)

Nhiệm vụ cụ thể, chi tiết của từng thành phần mình sẽ không nói rõ trong bài viết này nhé, tránh rối loạn thông tin cho một bài khởi đầu.

#### 2.2. GNU utilities
Bên cạnh việc cần có một lõi kernel để kiểm soát các thiết bị phần cứng, một hệ điều hành máy tính cần có các tiện ích, các công cụ để thực hiện các chức năng cơ bản. Vì bản thân kernel không thể tự nó thực hiện được các chức năng, nó cần có người ra lệnh, bạn có thể hiểu kernel mà Linus phát triển rất bá, rất toàn diện, rất trâu, nó làm được nhiều thứ nhưng lại cần có kẻ điều khiển thì mới thi triển được hết sức mạnh của mình, kẻ này chính là GNU.

<br>
GNU organization - một tổ chức ( GNU nghĩa là GNU's Not Unix, nghe hơi ngu si nhỉ) đã phát triển hoàn thiện một set các công cụ hệ thống mã nguồn mở bắt chước gói công cụ của hệ điều hành Unix lúc bấy giờ nhưng không may họ lại không có kernel để chạy. Cùng lúc đó Linus có kernel nhưng không có utilities để trở nên hoàn thiện. Và tất nhiên, chuyện gì đến cũng đã đến, Kernel của Linus cùng với GNU utilites đã kết hợp với nhau tạo nên một hệ điều hành hoàn thiện, mã nguồn mở và vô cùng mạnh mẽ như các bạn thấy ngày nay.

<br>
Những gói công cụ chính của GNU có thể được chia làm 3 nhóm:

* Công cụ để xử lý files
* Công cụ để thao tác với văn bản
* Công cụ để quan lý các tiến trình


Mỗi một nhóm công cụ này lại chứa vô vàn những tiện ích khác nhau mà chúng có thể được coi là vô giá với những admin hệ thống Linux hay với các lập trình viên.

<br>

**Shell** là một tool đặc biệt của GNU, nó cung cấp cho người dùng khả năng khởi chạy một chương trình, quản lý tài nguyên, quản lý tiến trình,... trên hệ thống linux. Thành phần cốt lõi của shell là **command prompt**, **command prompt** là thành phần có nhiệm vụ tương tác của shell, nó cho phép bạn gõ vào đó các lệnh, sau đó biên dịch các lệnh này ra mã máy và truyền đi cho kernel thực hiện. Hay nói một cách dễ hiểu shell chính là giao diện command line interface (CLI) mà các bạn hay sử dụng đó ( vd như terminal trên ubuntu). Bài này mình cũng không đi sâu về shell cũng như các loại shell nhé mọi người.

#### 2.3. The Linux Desktop Environment
Như các bạn đã biết qua mục 2.2 thì vào thời kì sơ khai của linux, mọi thao tác đều được thực hiện qua giao diện nhập text đơn giản, admin quản lý hệ thống điều khiển mọi thứ qua giao diện này. Tuy nhiên song song với Linux là sự phát triển mạnh mẽ của Windows cùng giao diện đồ họa bắt mắt, thân thiện, người sử dụng Linux đã mong đợi nhiều hơn, không chỉ là giao diện nhập lệnh đen trắng này nữa. Chính điều này đã thôi thúc sự phát triển mạnh mẽ trong cộng đồng mã nguồn mở và giao diện đồ họa desktop cho Linux được ra đời.

<br>
Linux nổi tiếng bởi tính mở của nó, bạn có thể làm được cùng 1 việc nhưng theo nhiều cách khác nhau, giao diện đồ họa cũng vậy, cộng đồng rộng lớn của linux đã phát triển ra vô vàn những giao diện đồ họa để phù hợp với các phiên bản của linux.

<br>
Trong đó nổi tiếng nhất có lẽ vẫn là một số cái tên sau:

* X Window system
* KDE Desktop
* GNOME Desktop
* Unity Desktop

Trong đó có thể kể đến GNOME và Unity là những cái tên vô cùng phổ biến, chính là giao diện mà mọi người sử dụng trên ubuntu các phiên bản gần đây.

### 3. Các bản phân phối Linux
Sau khi đọc xong về các thành phần cấu tạo nên một hệ thống linux bạn sẽ nảy sinh câu hỏi vậy làm thế nào để kết hợp được tất cả những thành phần trên lại với nhau. Thật không may cho bạn, đã có người thực hiện điều đó giúp bạn.

![](https://images.viblo.asia/ce5ad3ec-e688-4684-8d95-d9ec6e51323b.jpg)


<br>

Tập hợp các thành phần kể trên trong một package hoàn chỉnh được gọi là một **distribution** hay **distro**. Mỗi distribution được tạo ra cho những mục đích sử dụng khác nhau, người dùng căn cứ vào đó để chọn ra phiên bản phù hợp với công việc, mục đích của mình nhất. Các distro của linux được chia ra thành 3 nhóm sau ( Phần này mình muốn để đung tên tiếng anh của nó để tránh mất đi sự chính xác):

* Full core Linux distribution (Slackware, Red Hat, Fedora, ...)
* Specialized distribution (Centos, Ubuntu, Mint, ...)
* LiveCD test distribution ( Knoppix, PCLinuxOS,...)

Vâng vẫn giống như các phần trên, những gì đi sâu hơn, chi tiết nhất mình xin phép được để dành cho những bài sau vì trong 1 bài này sẽ không thể chia sẻ cụ thể cho mọi người được.

### 4. Lời kết
Hi vọng qua phần đầu của series này mọi người đã nắm được chút gì đó tổng quan về linux và đã đỡ bỡ ngỡ hơn được phần nào về hệ điều hành mã nguồn mở này. Hẹn mọi người ở các bài chia sẻ tiếp theo trong series LINUX 101.
<br>
[Part 2: KERNEL - Bộ xương sống của hệ thống Linux](https://viblo.asia/p/linux-101-kernel-bo-xuong-song-cua-linux-4dbZN8gk5YM)