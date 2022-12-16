Đó là một vấn đề nan giải phổ biến: Tôi vừa có một cỗ máy Linux hoàn toàn mới, tôi gắn thêm rất nhiều RAM đắt tiền và để nó trong một ngày. Bây giờ, nó hết bộ nhớ, hoặc nó đang sử dụng bộ nhớ Swap! Nó chắc chắn có đủ RAM, vì vậy phải có lỗi gì đó trong Linux! 

Tôi đảm bảo với bạn, trong hầu hết các trường hợp, hệ thống của bạn có rất nhiều RAM. Tuy nhiên, tất cả số RAM đó sẽ đi đâu? Vì đâu mà Linux lại sử dụng tất cả RAM ? Làm thế nào tôi thực sự có thể nói rằng tôi hết RAM? Thật không may, Linux có thể khiến cho những câu hỏi trở nên rất khó trả lời. Bài viết này sẽ giải thích chi tiết nhiều cách mà Linux sử dụng RAM cho những thứ khác ngoài dữ liệu người dùng và cách bạn có thể biết khi nào hệ thống của bạn hoạt động hết RAM.

---

Linux có quy tắc cơ bản như sau: một trang RAM còn trống là một trang RAM bị lãng phí. RAM được sử dụng cho nhiều thứ hơn là dữ liệu ứng dụng của người dùng. Nó cũng lưu trữ dữ liệu cho chính kernel và quan trọng nhất là có thể phản chiếu dữ liệu được lưu trữ trên đĩa để truy cập siêu nhanh. Những chiếc gương trong bộ nhớ này rất quan trọng vì tốc độ truy cập RAM nhanh hơn ổ đĩa cứng. Bạn có bao giờ nhận thấy mất bao lâu để khởi động trình duyệt web lần đầu tiên sau khi hệ thống của bạn khởi động không? Bạn đã bao giờ tải nó lần thứ hai và nó bật lên gần như ngay lập tức chưa? Thời gian bắt đầu giảm đáng kể là do các phần được copy trong bộ nhớ của dữ liệu trên đĩa. Có một số dạng cửa những phần copy này trong Linux, chúng ta hãy kiểm tra từng dạng này. Những dữ liệu này phần lớn được liệt kê trong file /Proc/meminfo và chúng ta sẽ đề cập đến nội dung của nó một cách thường xuyên.

Đây là output từ máy tính xách tay 2GB của tác giả, máy này chạy phiên bản kernel 2.6.20:

```
MemTotal:      2073564 kB
MemFree:       1259628 kB
Buffers:         27924 kB
Cached:         176764 kB
SwapCached:     285188 kB
Active:         562120 kB
Inactive:       145592 kB
HighTotal:     1179008 kB
HighFree:       562948 kB
LowTotal:       894556 kB
LowFree:        696680 kB
SwapTotal:     1992052 kB
SwapFree:      1167632 kB
Dirty:            9052 kB
Writeback:           0 kB
AnonPages:      437520 kB
Mapped:          49800 kB
Slab:            91332 kB
SReclaimable:    64816 kB
SUnreclaim:      26516 kB
PageTables:       4872 kB
NFS_Unstable:        0 kB
Bounce:              0 kB
CommitLimit:   3028832 kB
Committed_AS:  2402708 kB
VmallocTotal:   114680 kB
VmallocUsed:      6112 kB
VmallocChunk:   108044 kB
```

File / Proc / meminfo của bạn có thể chứa các mục khác các loại trên. Các nhà phát triển kernel đã dần dần thêm vào file này trong những năm qua và nó đã phát triển. Một số bản phân phối cũng thêm các mục tùy chỉnh của riêng họ vào file này. Đừng lo lắng nếu file của bạn hơi khác với tập file này.

### Page Cache

Linux Page Cache (mục "Cached:" trong file meminfo) là bộ nhớ RAM lớn nhất trên hầu hết các hệ thống. Bất cứ khi nào bạn thực hiện lệnh read() từ một tệp trên đĩa, dữ liệu đó sẽ được đọc vào bộ nhớ và lưu vào trang cache . Sau khi lệnh read () này hoàn thành, kernel có tùy chọn đơn giản là bỏ trang đi vì nó không được sử dụng. Tuy nhiên, nếu bạn đọc lần thứ hai của cùng một khu vực trong một file, dữ liệu sẽ được đọc trực tiếp từ memory và sẽ không có việc đọc vào đĩa. Đây là một tốc độ đáng kinh ngạc và là lý do tại sao Linux sử dụng trang cache của nó rất nhiều: **nó chắc rằng sau khi bạn truy cập một trang trên đĩa một lần, bạn sẽ sớm truy cập lại trang đó.**

Điều tương tự cũng đúng với các file mmap ()' d (mục "Mapped:" trong file meminfo). Lần đầu tiên khu vực mmap()'d được truy cập, trang sẽ được đưa vào từ đĩa và ánh xạ vào bộ nhớ. Kernel có thể chọn loại bỏ ngay trang đó sau khi yêu cầu truy cập vào trang đã hoàn thành. Tuy nhiên, kernel dám chắc điều tương tự như nó đã làm cho các thực hiện các lệnh read() đơn giản của file. Nó giữ cho trang được ánh xạ vào bộ nhớ và đặt cược rằng bạn sẽ sớm truy cập lại. Hành vi này có thể biểu hiện theo những cách khó hiểu.

Có thể bạn nghĩ rừng rằng bộ nhớ của mmap()'d không được "cached" vì nó đang được sử dụng tích cực và "cached" trong tiếng Anh có nghĩa là "hoàn toàn không được sử dụng ngay bây giờ". Tuy nhiên, Linux không định nghĩa nó theo cách đó. Định nghĩa "cached" của Linux gần với "đây là bản sao dữ liệu từ đĩa mà chúng tôi có ở đây để giúp bạn tiết kiệm thời gian". Nó không ngụ ý gì về cách trang thực sự được sử dụng. Đây là lý do tại sao chúng tôi có cả "Cached:" và "Mapped:" trong file meminfo. Tất cả bộ nhớ "Mapped:" là "Cached:", nhưng không phải tất cả bộ nhớ "Cached:" là "Mapped:".

### dentry/inode caches

Mỗi khi bạn thực hiện một 'ls' (hoặc bất kỳ thao tác nào khác: open(), stat(), v.v.) trên hệ thống tập tin, kernel cần có dữ liệu trên đĩa. Kernel phân tích dữ liệu này trên đĩa và đặt nó vào một số cấu trúc độc lập với hệ thống tệp để có thể xử lý theo cùng một cách trên tất cả các hệ thống tệp khác nhau. Theo cùng kiểu với bộ nhớ Cache trong các ví dụ trên, kernel có tùy chọn loại bỏ các cấu trúc này sau khi hoàn thành 'ls'. Tuy nhiên, nó đặt cược giống như trước: nếu bạn đọc nó một lần, bạn nhất định sẽ đọc lại. Kernel lưu trữ thông tin này trong một số "caches" được gọi là dentry và inode cache. Các Dentry phổ biến trên tất cả các hệ thống tập tin, nhưng mỗi hệ thống tập tin có cache riêng cho các innode. Bạn có thể xem các loại cache khác nhau và kích thước của chúng bằng cách thực hiện lệnh này:

```
head -2 /proc/slabinfo; cat /proc/slabinfo  | egrep dentry\|inode
```

(RAM này là một thành phần của "Slab:" trong meminfo)

Các kernel cũ hơn (khoảng 2.6.9) đã để lại một số cấu trúc trong slab cache hơn các kernel mới. Điều đó có nghĩa là mặc dù chúng có thể không được sử dụng, chúng vẫn được để trong đó  cho đến khi có áp lực bộ nhớ. Điều này xảy ra đặc biệt với Proc_inodes. / Proc inodes cũng xuất hiện để ghim task_structs, điều đó có nghĩa là mỗi cái có thể chiếm trên 2 KByte RAM một cách hiểu quả. RAM này sẽ không hiển thị dưới dạng 'Cache' và có thể hiển thị như phần rò rỉ bộ nhớ của kernel. Trên một hệ thống chỉ có khoảng 100 tác vụ (với áp lực bộ nhớ nhỏ) có thể có hàng trăm ngàn số này nằm xung quanh.

Chúng vô hại. Nhưng, trên bề mặt, có thể biểu hiện như rò rỉ bộ nhớ kernel. Để chắc chắn, hãy thử [quy trình này](https://linux-mm.org/Drop_Caches) cho dentry và inodes. Nếu số lượng của các đối tượng task_struct và Proc_inode_cache giảm, thì nghĩa là không có lỗi thực sự.

### Buffer Cache

Buffer cache (mục "Buffer:" trong meminfo) có liên quan chặt chẽ tới dentry/inode cache. Các dentry và innode trong bộ nhớ đại diện cho các cấu trúc trên đĩa, nhưng được đặt ra rất khác nhau. Điều này có thể là do chúng ta có cấu trúc kernerl giống như một con trỏ trong bản sao trong bộ nhớ, nhưng không phải trên đĩa. Cũng có thể xảy ra khi định dạng trên đĩa là một endianess khác với CPU.

Trong bất kỳ trường hợp nào, khi chúng ta cần lấy một innode hoặc dentry để điền vào cache, trước tiên chúng ta phải đưa một trang từ đĩa nơi các cấu trúc đó được biểu diễn. Đây không thể là một phần của page cache vì nó không thực sự là nội dung của một file, thay vào đó là nội dung thô của đĩa. Một trang trong buffer cache có thể có hàng tá các innode trên đĩa, mặc dù chúng ta chỉ tạo một innode trong memory cho mỗi cái. Buffer cache là, một lần nữa, một vụ đặt cược rằng kernel sẽ cần một cái khác trong cùng một nhóm các innode và sẽ tiết kiệm được một chuyến đi vào đĩa bằng cách giữ trang buffer này trong memory.

### Hết memory

Bây giờ bạn đã biết tất cả những cách sử dụng tuyệt vời này cho phần RAM chưa sử dụng của mình, bạn phải tự hỏi: điều gì xảy ra khi không còn RAM chưa sử dụng nữa? Nếu tôi không có bộ nhớ trống và tôi cần một trang cho page cache, inode cache, hoặc dentry cache,, tôi lấy nó ở đâu?

Trước hết, kernel cố gắng không để bạn có gần 0 byte RAM chưa sử dụng. Điều này là do, để giải phóng RAM, bạn thường cần phân bổ RAM nhiều hơn. Bạn đã bao giờ đi để bắt đầu một dự án lớn tại bàn của bạn, và nhận ra rằng bạn cần phải dọn sạch một khu vực trước khi đi làm? Kernel cần một loại "không gian làm việc" như vậy để thực hiện việc quản lý.

Dựa trên dung lượng RAM (và một vài yếu tố khác), kernel đưa ra giải pháp cho dung lượng bộ nhớ mà nó cảm thấy thoải mái với không gian làm việc của nó (mức giá trị này được hiển thị trong không gian của người dùng trong /Proc/sys/vm/min_free_kbyte). Mức giá trị này này được dịch và lưu lại ở nhiều vùng nhớ khác nhau trên hệ thống. Khi đạt đến mức này này cho bất kỳ một khu vực nào, hạt nhân bắt đầu lấy lại bộ nhớ từ các mục đích sử dụng khác nhau được mô tả ở trên.

### Swapping

Mục trong file meminfo :

```
SwapTotal:     1992052 kB
SwapFree:      1167632 kB
```

Khi kernel quyết định không lấy bộ nhớ từ bất kỳ nguồn nào khác mà chúng tôi đã mô tả cho đến nay, nó bắt đầu hoán đổi. Trong quá trình này, nó lấy dữ liệu ứng dụng của người dùng và ghi nó vào một vị trí đặc biệt (hoặc địa điểm) trên đĩa. Bạn có thể nghĩ rằng đây chỉ là giải pháp cuối cùng một khi chúng ta hoàn toàn không thể giải phóng bất kỳ loại RAM nào khác. Tuy nhiên, kernel không làm theo cách này. Tại sao?

Hãy xem xét một ứng dụng như / sbin / init. Nó có một số nhiệm vụ cực kỳ quan trọng như thiết lập hệ thống khi khởi động và nhắc nhở nhắc nhở đăng nhập nếu chúng chết. Nhưng, bao nhiêu dữ liệu của nó thực sự được sử dụng trong thời gian chạy bình thường của hệ thống? Nếu hệ thống ở giới hạn của nó và sắp hết RAM, chúng ta có nên trao đổi một trang hoàn toàn không sử dụng kể từ trang khởi động dữ liệu / sbin / init và sử dụng trang đó cho bộ đệm trang không? Hoặc chúng ta nên giữ / sbin / init hoàn toàn trong bộ nhớ và buộc người dùng bộ đệm trang tiềm năng đi vào đĩa?

Hạt nhân thường sẽ chọn trao đổi dữ liệu / sbin / init để đáp ứng nhu cầu hiện tại của các ứng dụng hiện đang chạy. Vì lý do này, ngay cả một hệ thống có lượng RAM lớn (ngay cả khi được điều chỉnh đúng cách) cũng có thể trao đổi. Có rất nhiều trang bộ nhớ là dữ liệu ứng dụng người dùng, nhưng hiếm khi được sử dụng. Tất cả những thứ này là mục tiêu để được hoán đổi có lợi cho các mục đích sử dụng khác cho RAM.

Nhưng, nếu sự hiện diện đơn thuần của trao đổi được sử dụng không phải là bằng chứng của một hệ thống có quá ít RAM cho khối lượng công việc của nó, thì đó là gì? Như bạn có thể thấy, trao đổi được sử dụng hiệu quả nhất cho dữ liệu sẽ không được truy cập trong một thời gian dài. Nếu dữ liệu trong trao đổi liên tục được truy cập, thì nó không được sử dụng hiệu quả. Chúng ta có thể theo dõi lượng dữ liệu đi vào và ra khỏi trao đổi bằng lệnh vmstat. Sau đây sẽ tạo ra đầu ra cứ sau 5 giây:

```
$ vmstat 5
procs -----------memory---------- ---swap--- -----io---- -system-- ----cpu----
 r  b   swpd   free   buff  cache   si    so    bi    bo   in   cs us sy id wa
 3  0 833704  54824  25196 328672   10     0   343    18  510 1382 96  4  0  0
 6  0 833704  54556  25092 324584    0     0   333    22  504 1180 93  7  0  0
 4  0 833704  51516  25112 320856   33     0   315    19  508 1234 95  5  0  0
 3  0 833704  54836  24984 314404    6     0   223    27  498 1191 95  5  0  0
 3  0 833704  53072  24944 307844    4     0   216    22  518 1375 96  4  0  0
 5  0 833704  53928  24888 304076    6     0   262    18  548 1665 94  6  0  0
 3  4 843964  50192    184  58064   16  2416    16  2464  570 1451 78 22  0  0
 3  7 908244  48756    224  47760  118 13645   149 13664  730 1245 76 16  0  8
 3  2 922064  54280    340  49228 1470  2838  1817  2865  711 1481 88 12  0  0
 4  2 932644  54068    424  52204 1972  2195  2596  2211  678 1388 90 10  0  0
 2  3 944012  56304    492  52292 2986  2591  3063  2615  735 1562 89 11  0  0
 2  4 957304  54604    572  51964 4042  3414  4096  3438  852 1808 88 12  0  0
...
```

Các cột chúng tôi quan tâm nhất là "si" và "so" là các chữ viết tắt của "hoán đổi trong" và "hoán đổi". Bạn có thể diễn giải chúng theo cách này:

- Một "hoán đổi" nhỏ và "trao đổi" là bình thường và chỉ ra rằng có rất ít nhu cầu về dữ liệu ứng dụng hiện đang trao đổi và bất kỳ nhu cầu bộ nhớ mới nào đang được xử lý bằng các phương tiện khác ngoài trao đổi dữ liệu ứng dụng.
- Một "hoán đổi" lớn với một "hoán đổi" nhỏ thường là dấu hiệu cho thấy một ứng dụng bị tráo đổi hiện đang bắt đầu chạy lại và cần lấy lại dữ liệu từ đĩa.
- Một "hoán đổi" lớn với một "hoán đổi" nhỏ thường cho thấy rằng một ứng dụng đang cần một loại RAM nào đó (có thể là bất kỳ bộ nhớ cache hoặc dữ liệu ứng dụng nào) và đang trao đổi dữ liệu ứng dụng cũ để lấy RAM đó.
- Một "hoán đổi" lớn với một "hoán đổi" lớn nói chung là điều kiện mà bạn muốn tránh. Điều đó có nghĩa là hệ thống đang "đập" hoặc cần RAM mới nhanh như có thể trao đổi dữ liệu ứng dụng. Điều này thường có nghĩa là ứng dụng cần RAM đã loại bỏ tất cả dữ liệu thực sự cũ và đã bắt đầu buộc dữ liệu sử dụng tích cực để trao đổi. Những "dữ liệu sử dụng tích cực" đó sẽ ngay lập tức được đọc lại từ trao đổi, khiến cả "trao đổi trong" và "trao đổi" đều được nâng lên và gần bằng nhau.

Ví dụ vmstat ở trên cho thấy một hệ thống đang chạy bình thường, sau đó có bộ nhớ rất, rất lớn sử dụng ứng dụng khởi động.

### Swap Cache

Khái niệm bộ đệm trao đổi rất giống với khái niệm bộ đệm trang. Một trang dữ liệu ứng dụng người dùng ghi vào đĩa rất giống với trang dữ liệu tệp trên đĩa. Bất cứ khi nào một trang được đọc từ trao đổi ("si" trong vmstat), nó sẽ được đặt trong bộ đệm trao đổi. Giống như bộ đệm của trang, đây là đặt cược vào phần của kernel. Cá cược rằng chúng ta có thể cần phải trao đổi trang này ra _again_. Nếu nhu cầu đó phát sinh, chúng tôi có thể phát hiện ra rằng đã có một bản sao trên đĩa và chỉ cần ném trang vào bộ nhớ ngay lập tức. Điều này giúp chúng tôi tiết kiệm chi phí ghi lại trang vào đĩa.

Bộ đệm trao đổi thực sự chỉ hữu ích khi chúng ta đang đọc dữ liệu từ trao đổi và không bao giờ ghi vào nó. Nếu chúng ta ghi vào trang, bản sao trên đĩa không còn đồng bộ với bản sao trong bộ nhớ. Nếu điều này xảy ra, chúng ta phải ghi vào đĩa để hoán đổi trang một lần nữa, giống như lần đầu tiên chúng ta đã làm. Tuy nhiên, chi phí lưu _any_ ghi vào đĩa là rất lớn và thậm chí chỉ với một phần nhỏ bộ đệm trao đổi từng được ghi vào, hệ thống sẽ hoạt động tốt hơn.

### Dirty Writeout

Một thao tác khác xảy ra khi chúng ta bắt đầu hết bộ nhớ là ghi dữ liệu bẩn ("Bẩn:" từ meminfo) vào đĩa. Dữ liệu bẩn là bộ đệm trang mà việc ghi đã xảy ra. Trước khi chúng tôi có thể giải phóng bộ đệm trang đó, trước tiên chúng tôi phải cập nhật bản sao gốc trên đĩa với dữ liệu từ ghi. Khi hệ thống giảm xuống dưới giá trị min_free_kbytes của nó, hệ thống sẽ cố gắng giải phóng bộ đệm trang. Khi giải phóng bộ đệm trang, rất phổ biến để tìm các trang bẩn như vậy và kernel sẽ khởi tạo các ghi này bất cứ khi nào nó tìm thấy các trang này. Bạn có thể thấy điều này xảy ra khi "Bẩn:" giảm cùng lúc với "bo" (Khối viết ra) từ vmstat tăng lên.

Nhân có thể yêu cầu nhiều trang được ghi vào đĩa song song. Điều này tăng tốc độ hoạt động của đĩa bằng cách gộp chúng lại với nhau hoặc kéo dài chúng qua một số đĩa. Khi kernel đang tích cực cố gắng cập nhật dữ liệu trên đĩa cho một trang, nó sẽ tăng mục nhập "WritBack:" của meminfo cho trang đó.

Lệnh "đồng bộ hóa" sẽ buộc tất cả dữ liệu bẩn được ghi ra và "Bẩn:" giảm xuống giá trị rất thấp trong giây lát.

### Tham khảo 

https://linux-mm.org/Low_On_Memory