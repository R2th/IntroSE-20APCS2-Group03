Một lần tình cờ khi tôi truy cập vào server tắt bớt một vài dịch vụ đang chạy để máy có thêm bộ nhớ một vài ứng dụng khác. Sau khi thực hiện các thao tác dọn dẹp, tôi sử dụng `free -m` để kiểm tra tình trạng sử dụng bộ nhớ hiện tại:

```
$ free -m
              total        used        free      shared  buff/cache   available
Mem:           1504        1491          13           0         855      792
Swap:          2047           6        2041
```
Một điều ngạc nhiên là lượng RAM khả dụng *(free mem)* cũng không giảm được là bao, trong khi *buff/cache* đang chiếm một phần lớn bộ nhớ **(855MB)**.

> Disk caching là cơ chế sử dụng bộ nhớ để lưu tạm một vài giá trị giúp tăng tốc độ tính toán cho tiến trình.
> 

Lúc này tôi chưa hề biết *buff/cache* có vai trò gì trong hệ thống, phản xạ đầu tiên của tôi chỉ đơn giản là làm cách nào để xóa được *buff/cache*, do vậy tôi Google ngay với từ khóa *"how to remove buff/cache linux"*, sau một hồi lọ mọ với [hướng dẫn tại đây ](https://www.tecmint.com/clear-ram-memory-cache-buffer-and-swap-space-on-linux/) tôi cũng xóa được cache thành công. Thông thường, sau khi *"make it work"*, tôi luôn muốn *"make it right"* bằng cách tìm hiểu đầy đủ hơn về *buff/cache*:

* Buff/cache là gì?
* Điều gì xảy ra khi buff/cache cần dùng vượt quá dung lượng khả dụng?
* Có cách nào để giới hạn giá trị này chỉ nằm trong một khoảng xác định hay không?

Rốt cục tôi cũng tìm được trang http://www.linuxatemyram.com, ở đây có tất cả những giải đáp rất cụ thể liên quan tới cách Linux đang sử dụng RAM của máy tính.

## Chuyện gì đang xảy ra vậy?
Linux đang mượn tạm vùng nhớ chưa sử dụng cho chức năng *disk caching* . Việc này làm cho bạn thấy bộ nhớ RAM đang bị ngốn rất nhiều, nhưng sự thực không phải thế. Mọi thứ vẫn ổn!

## Tại sao Linux sử dụng bộ nhớ như vậy?
*Disk caching* là một kỹ thuật giúp cho hệ thống chạy mượt mà hơn, phản hồi nhanh hơn. Nhược điểm duy nhất của kỹ thuật này là làm bối rối những người mới tiếp cận nó. *Disk caching* không bao giờ chiếm vùng nhớ được để dành cho các ứng dụng!

## Nếu tôi muốn chạy nhiều ứng dụng hơn thì sao?
Nếu các ứng dụng của bạn cần thêm bộ nhớ, Linux sẽ lấy lại một phần bộ nhớ đang dùng cho *disk cache* để cấp cho ứng dụng. *Disk cache* luôn luôn trả lại bộ nhớ khi các ứng dụng cần! RAM của bạn chỉ được *disk caching* mượn, chứ không hề bị chiếm mất.

## Liệu dung lượng swap có bị tăng lên không?
Không, *disk caching* chỉ mượn RAM mà các ứng dụng chưa dùng tới. *Disk caching* không sử dụng bộ nhớ swap. Nếu các ứng dụng cần thêm bộ nhớ, Linux sẽ lấy lại phần bộ nhớ cần thiết từ *disk cache*. Linux sẽ không sử dụng bộ nhớ swap cho ứng dụng.

## Làm cách nào để tắt disk caching?
Bạn không thể tắt *disk caching*. Lý do duy nhất khiến mọi người muốn tắt *disk caching* là bởi vì họ nghĩ *disk caching* chiếm mất bộ nhớ dành cho các ứng dụng khác, trong khi thực tế không phải vậy. Cơ chế *disk caching* làm cho các ứng dụng chạy nhanh hơn, mượt hơn nhưng sẽ không bao giờ chiếm bộ nhớ dành để chạy cho các ứng dụng. Các ứng dụng luôn được ưu tiên sử dụng RAM cao nhất. Do vậy, chẳng có lý do gì mà ta lại tắt nó đi!

## Thế tại sao lệnh top và free lại hiển thị là toàn bộ RAM của tôi đang được sử dụng?
Ở đây có một chút sự khác biệt về thuật ngữ. Cả bạn và Linux đều coi vùng nhớ được cấp cho một ứng dụng nào đó là "*used*" - đã sử dụng, vùng nhớ chưa hề được bất cứ chương trình sử dụng được coi là đang "*free*".

Tuy nhiên, đối với vùng nhớ được sử dụng để làm một việc nào đó, nhưng vẫn có thể trả lại cho ứng dụng đang cần thì có một chút khác biệt.

Với cách giải thích của tôi ở trên, chúng ta có thể coi vùng nhớ đó là "*free*" hoặc gần hơn một chút là "*available*" - khả dụng. Tuy nhiên, Linux lại coi đó là "*used*", tuy nhiên vẫn "*available*".

Và loại vùng nhớ này được Linux gán nhãn là "*cached/buffers*".

## Làm cách nào để biết được thực sự tôi còn bao nhiêu RAM?
Bạn sử dụng lệnh `free -m` và quan sát giá trị cột `available`, đây chính là lượng RAM còn khả dụng cho các chương trình.

Ban đầu nếu chỉ để ý tới trường `used` và `free`, bạn sẽ nghĩ ngay là RAM của mình chỉ còn chưa đầy 1%, tuy nhiên thực tế là bạn còn tới 47% RAM khả dụng đó!

```
$ free -m
              total        used        free      shared  buff/cache   available
Mem:           1504        1491          13           0         855      792
Swap:          2047           6        2041
```
Bạn có thể xem nội dung [commit này](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=34e431b0ae398fc54ea69ff85ec700722c9da773) để xem đoạn code in ra các giá trị trên.

## Vậy khi nào tôi mới cần lo lắng?
Một hệ thống Linux với một lượng RAM ổn định là hệ thống sau khi chạy một lúc, hệ thống có các thông số RAM như sau:

* Giá trị `free` đạt gần tới 0
* Giá trị `used` đạt gần tới total
* Giá trị `available` có đủ lượng cần thiết, khoảng 20% so với tổng RAM của máy.
* Giá trị `swap used` không thay đổi

Nếu RAM có các thông số sau, thì bạn cần có hành động thích hợp để xử lý

* Giá trị `available` ("free + buff/cache") đạt gần tới 0
* Giá trị `swap used` tăng lên hoặc có dao động
* Lệnh `dmesg | grep oom-killer` hiển thị [OutOfMemory-killer](https://www.memset.com/docs/additional-information/oom-killer/)

## Làm cách nào để xác nhận toàn bộ những khẳng định trên?
Hi vọng đến đây, bạn đã thấy được Linux không hề ngốn RAM của bạn, rằng chúng vẫn ổn. Bạn có thể thực hiện [các bước được chỉ định trong tài liệu này](https://www.linuxatemyram.com/play.html) để hiểu một cách chính xác những điều tôi vừa trình bày ở trên.

Cám ơn các bạn đã theo dõi. Bài viết đồng thời được lưu tại [blog HungTUT.com](https://hungtut.com/linux-ate-my-ram/)