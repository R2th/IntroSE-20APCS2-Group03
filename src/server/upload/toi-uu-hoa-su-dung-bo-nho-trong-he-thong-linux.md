![](https://images.viblo.asia/89f87195-0940-4a0f-953a-f81bf1b4c77e.png)

# Lời mở đầu
Trong bất cứ một hệ thống máy tính nào, bộ nhớ là một trong những phần rất quan trọng và không thể thiếu được. Bộ nhớ là thiết bị dùng để lưu trữ dữ liệu cho các thiết bị máy tính. Bộ nhớ bao gồm 2 loại: **bộ nhớ điện tĩnh** (lưu trữ dữ liệu lâu dài, dữ liệu không mất khi tắt thiết bị) và 
**bộ nhớ điện động** (lưu trữ dữ liệu tạm thời, sau khi tắt máy là mất). Thông thường lắp đặt các linh kiện cho máy tính thì bộ nhớ điện tĩnh thường có dung lượng lớn nhưng tốc độ lại chậm, còn bộ nhớ điện động thì có dung lượng nhỏ hơn nhưng tốc độ lại cao hơn rất nhiều. Chính vì ưu điểm có tốc độ truy xuất cao như vậy nên bộ nhớ điện động được sử dụng với mức độ rất thường xuyên và liên tục. Tuy nhiên, với hạn chế là bộ nhớ thường có dung lượng không cao nên vấn đề làm sao để tối ưu hóa loại bộ nhớ này, đảm bảo để cho các chương trình có thể cùng nhau chia sẻ việc sử dụng mà không gây tranh chấp cũng như thiếu hụt bộ nhớ khi cần thiết luôn được nghiên cứu và cải thiện.

# Vấn đề bộ nhớ trong các hệ thống Linux
Mặc dù **Linux** là hệ thống được thiết kế để cho mọi người đều có thể sử dụng, tuy nhiên phần lớn người sử dụng **Linux** đều sở hữu những cỗ máy với lượng tài nguyên hạn chế. Đa số người dùng máy tính cá nhân vẫn ưu tiên sử dụng các hệ điều hành như **Windows** hay **macOS**, và **Linux** với họ phần nhiều chỉ là để cài đặt cho các cỗ máy cũ. **Linux** hỗ trợ một hệ thống phần cứng khá đa dạng, hơn nữa lại là phần mềm mã nguồn mở, hoàn toàn có thể tùy biến hệ thống để không gây tốn quá nhiều tài nguyên. Hiện nay, trên **Linux** có một số phương pháp có thể áp dụng để tối ưu hóa bộ nhớ.

# Dung lượng của bộ nhớ và vùng SWAP
Từ đây, tôi sẽ gọi bộ nhớ với cách hiểu là bộ nhớ điện động.

Trong hệ thống **Linux**, thường thì sẽ sử dụng hai loại bộ nhớ: **RAM** và **SWAP**. Trong đó **RAM** là bộ nhớ thực, sử dụng một linh kiện đặc biệt để lưu trữ còn **SWAP** là vùng trao đổi, sử dụng một phần đĩa cứng vật lý (một loại bộ nhớ điện tĩnh) để lưu trữ. Tổng dung lượng của 2 loại bộ nhớ này là bộ nhớ khả dụng của hệ thống. 

Dung lượng bộ nhớ **RAM** sẽ bị giới hạn bởi vi xử lý, bo mạch chủ và các modun bộ nhớ đi kèm. Chẳng hạn với một hệ thống 32 bit, bộ nhớ bị giới hạn tối đa là 4 GB (gigabyte) nhưng trong khi với hệ thống 64 bit, bộ nhớ giới hạn tối đa là 16 EB (exabyte). Để tăng kích thước giới hạn bộ nhớ thì hoặc có thể sử dụng vùng trao đổi **SWAP** hoặc nâng cấp các linh kiện bo mạch chủ, vi xử lý ....

# Sử dụng *ramdisk*
Thông thường khi làm việc, dữ liệu sẽ di chuyển theo một quy trình như sau:
* Bước 1: Dữ liệu được đọc từ đĩa cứng vào bộ nhớ
* Bước 2: Dữ liệu được xử lý trên bộ nhớ
* Bước 3: Dữ liệu được ghi lại vào đĩa cứng

Trong đó, khi làm việc với bước 1 và bước 3, thời gian hoạt động của hệ thống sẽ khá là lâu do đĩa cứng có thời gian truy xuất chậm. Và vô hình chung có thể gây ảnh hưởng tới các chương trình khác do khi chưa đọc ghi xong dữ liệu thì một phần bộ nhớ vẫn bị chiếm dụng. **Ramdisk** ra đời để khắc phục được một phần nhược điểm này. Cụ thể thì **Ramdisk** là một khối bộ nhớ được hệ điều hành xử lý như một đĩa cứng để lưu trữ dữ liệu. Nó sẽ được kích hoạt khi hệ thống khởi động và sẽ bị mất hiệu lực sau khi hệ thống tắt, mọi dữ liệu cũng sẽ bị xóa. Ưu điểm của phương án này là khiến cho việc đọc ghi phần dữ liệu trên đó diễn ra nhanh hơn so với việc đọc ghi từ đĩa cứng. Tuy nhiên, nó kèm theo một nhược điểm là có thể gây chiếm dụng tài nguyên hệ thống. 
Ramdisk là một khối bộ nhớ mà hệ điều hành xử lý như một thiết bị vật lý để lưu trữ dữ liệu trên - một ổ cứng hoàn toàn được giữ trong bộ nhớ. Thiết bị tạm thời này tồn tại ngay khi hệ thống khởi động và kích hoạt ramdisk, và hệ thống sẽ vô hiệu hóa ramdisk hoặc tắt. Hãy nhớ rằng dữ liệu bạn lưu trữ trên một đĩa RAM như vậy sẽ bị mất sau khi tắt máy.

Để có thể tạo ra một **ramdisk**, chúng ta cần sử dụng các file hệ thống đặc biệt của **Linux** là `ramfs` và `tmpfs`. Sự khác biệt của `ramfs` và `tmpfs` là `ramfs` sẽ không có giới hạn dung lượng bộ nhớ sử dụng (có thể coi giới hạn là dung lượng tối đa của bộ nhớ) còn `tmpfs` có thể đặt ra các giới hạn cho bộ nhớ. Mức giới hạn ở đây có nghĩa là mức bộ nhớ tối đa có thể bị sử dụng với **Ramdisk**, còn nếu không sử dụng để lưu trữ dữ liệu trên đó, mức chiếm dụng vẫn sẽ là `0`. Và một khác biệt nữa là về cách xử lý khi bộ nhớ tới giới hạn, nếu dùng `ramfs`, dữ liệu sẽ được chuyển tạm qua đĩa cứng, còn với `tmpfs` thì dữ liệu sẽ bị ghi đè.

## Sử dụng `ramfs`
Ta sẽ cần làm 2 việc:
* Tạo thư mục để gắn **ramdisk** bằng lệnh `mkdir`
* Gắn **ramdisk** vào vùng làm việc của đĩa cứng hệ thống bằng lệnh `mount`

![](https://images.viblo.asia/f32c0131-ce8a-4a44-9186-415e87d1bfd4.png)

Sau đó ta hoàn toàn có thể thao tác thêm sửa xóa file trên vùng gắn này như làm việc với đĩa cứng, tuy nhiên khác biệt là hiện giờ dữ liệu sẽ được lưu trữ trên bộ nhớ, và sẽ mất khi tắt hệ thống.

## Sử dụng `tmpfs`
Giống với cách sử dụng `ramfs`, ta cũng cần sử dụng `mkdir` và `mount`. Tuy nhiên, `tmpfs` có thêm tùy chọn `size` để ta có thể giới hạn lại bộ nhớ tối đa có thể sử dụng.

### Cách sử dụng thông thường, giống `ramfs`

![](https://images.viblo.asia/8692bd85-6f69-4cd9-9296-1224ab6b6f7a.png)

### Cách sử dụng giới hạn bằng đơn vị %

![](https://images.viblo.asia/29fa848d-c5a2-4f95-97c5-00d5b833ada9.png)

Chẳng hạn nếu ta có bộ nhớ **RAM** 4GB, thì dung lượng tối đa mà **ramdisk** có thể sử dụng là 30% của 4GB (tương đương 1228.8MB)

### Cách sử dụng giới hạn với đơn vị lưu trữ

![](https://images.viblo.asia/f0e52871-699e-468f-b12a-213e0e159697.png)

Ở trường hợp này, bộ nhớ **ramdisk** sẽ có thể sử dụng tối đa 1GB dung lượng (tương đương 1024MB)

# Sử dụng zRam
Khi việc sử dụng đạt tới giới hạn và chúng ta không có cách nào để có thêm bộ nhớ sử dụng nữa (thông qua việc nâng cấp phần cứng), thì một giải pháp đã ra đời, đó là **zRAM**. Đây là cách mà hệ thống sẽ nén dữ liệu lưu trữ trên **RAM** lại để tăng khả năng sử dụng bộ nhớ. Cũng giống như việc nén dữ liệu trên đĩa cứng, đây là một phương pháp để giảm lượng dữ liệu lưu trữ trên bộ nhớ.

### Để sử dụng **zRAM**, ta cần cài đặt thêm công cụ `zram` tùy thuộc vào hệ thống bạn sử dụng. Với **Ubuntu**, bạn có thể sử dụng câu lệnh `sudo apt install zram-config`. 
Sau đó sử dụng systemctl để kích hoạt dịch vụ `zram`.

![](https://images.viblo.asia/937be486-9a74-4fb3-9b3a-f5defd7f666c.png)

### Sử dụng lệnh `sudo swapon -s` để xem các đĩa `zram` đang được sử dụng.

![](https://images.viblo.asia/4eebb84c-e8de-46f1-adca-0d6cddefc07b.png)

### Và sử dụng `sudo zramctl [zram_name]` để xem thông tin việc sử dụng `zram`

![](https://images.viblo.asia/873946b2-6a23-4890-95e1-94146cb3ae0b.png)

Như trên hình ta có thể thấy `zram0` sử dụng thuật toán **lzo (Lempel–Ziv–Oberhumer)** để nén dữ liệu, tổng dung lượng tối đa có thể sử dụng là 654MB, và hiện tại đang sử dụng 4KB.
# Kết luận
Mặc dù có một vài phương pháp để chúng ta có thể tối ưu hóa dung lượng bộ nhớ sử dụng nhưng lời khuyên của mình là các bạn chỉ nên sử dụng những chương trình yêu cầu ít bộ nhớ, hạn chế sử dụng các chương trình yêu cầu nhiều bộ nhớ như các trò chơi 3D, các phần mềm sử lý đồ họa, video cùng một lúc. Sử dụng phần mềm một cách hợp lý cũng sẽ giúp chúng ta tối ưu hóa được lượng **RAM** sử dụng, nhất là trên các hệ thống bị giới hạn về tài nguyên.

# Tài liệu tham khảo
* https://linuxhint.com/optimizing-linux-memory-usage/
* https://www.linuxjournal.com/article/2770
* https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Oberhumer
* https://en.wikipedia.org/wiki/Random-access_memory