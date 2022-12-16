CACHE , phát âm là CASH (không phải là ca che đâu nhé =)))) ) là một technical hardware hoặc  software solutions để lưu trữ thông tin, thường thì là data với mục đích lưu tạm thời ở môi trường máy tính. 
Cache được sử dụng như một cách thức để truy cập nhanh data (bộ nhớ đệm), và nhanh hơn nhiều so với truy cập từ các cách thức lưu trữ khác (truy  cập từ ổ cứng , vv )
Cache thường được sử dụng ở Client, như CPU, applications, web browsers hoặc operating systems (OSes).
## 1 - Cách thức Cache hoạt động 

Khi cache client cần truy cập data, việc đầu tiên là check cache. Khi request data tìm thấy dữ liệu cần thiết trong Cache, nó được gọi là ***Cache hit***. Tỉ lệ của kết quả tìm kiếm cache hit được biết đến như là  *cache hit rate* hay *ratio*.

Nếu việc tìm kiếm data không thành công, nó gọi là ***Cache miss*** - từ đây dữ liệu sẽ được kéo từ bộ nhớ chính sang bộ nhớ cache. Việc giữ dữ liệu nào cần, hay xoá khỏi bộ nhớ điệm để nhường chỗ cho dữ liệu mới sẽ tùy thuộc vào thuật toán mà system sử dụng. 

![](https://images.viblo.asia/a7620017-c8a7-4778-a102-d31b97d05e50.png)

Web browsers như là Internet Explorer, Firefox, Safari  và  Chrome, sử dụng browser cache để tăng hiệu suất các trang web thường xuyên truy nhập. Khi bạn truy cập một webpage, hệ thống sẽ lưu trữ các file cần thiết vào browser cache trong máy tính. Khi bạn quay lại trang web đó, browser sẽ chỉ cần lấy các thông tin quan trọng và update các thông tin cần thiết mà thôi, và không cần tải lại toàn bộ các nội dung từ web server - điều này làm cải thiện hiệu suất web. Đó được gọi là [read cache ](https://searchstorage.techtarget.com/definition/read-cache). Trình duyệt có thể đọc dữ liệu từ browser cache nhanh hơn nhiều so với việc đọc lại các tệp từ trang web.

Cache rất quan trọng vì một số lý do như sau : 
* Việc sử dụng bộ đệm làm giảm độ trễ cho dữ liệu hoạt động. Điều này dẫn đến hiệu suất cao hơn cho một hệ thống hoặc ứng dụng.
* Nó cũng chuyển hướng I/O sang bộ đệm, giảm hoạt động I/O sang bộ nhớ ngoài và mức lưu lượng SAN thấp hơn.
* Dữ liệu có thể lưu lại vĩnh viễn trên bộ lưu trữ truyền thống hoặc  lưu trữ bên ngoài. Điều này duy trì tính nhất quán và toàn vẹn của dữ liệu bằng các tính năng được cung cấp bởi mảng, chẳng hạn như ảnh chụp nhanh hoặc replication.

[Cache memory](https://searchstorage.techtarget.com/definition/cache-memory) được bao gồm trong CPU hoặc được nhúng trong chip trên bo mạch hệ thống.

## 2 - Các thuật toán điều khiển Cache 

Có rất nhiều thuật toán Cache, nhưng sau đây là các thuật toán cơ bản nhất : 

* **Least Frequently Used (LFU)** : theo dõi tần suất truy cập một dữ liệu. Các dữ liệu có số lần truy cập thấp nhất được loại bỏ đầu tiên.
* **Least Recently Used (LRU)** : lưu trữ các dữ liệu được truy cập gần đây gần đầu bộ đệm. Khi bộ đệm đạt đến giới hạn của nó, các liệu được truy cập gần đây nhất sẽ bị xóa.
* **Most Recently Used (MRU)** : loại bỏ các dữ liệu truy cập gần đây nhất đầu tiên. Cách tiếp cận này là tốt nhất khi các data cũ có nhiều khả năng được sử dụng.

## 3 - Các loại Cache hay được sử dụng nhất 

* **cache server** : Một  dedicated network server hoặc dịch vụ chuyên dụng hoạt động như một máy chủ  lưu các trang web hoặc nội dung internet khác cục bộ. Một  cache server đôi khi được gọi là proxy cache.
* **Cache memory**:  Random access memory, hay còn được gọi là  **RAM**, Cache memory thường được gắn trực tiếp vào CPU và được sử dụng để  cập nhanh các dữ liệu trong CPU. 
* **Flash cache**: Temporary storage of data on NAND flash memory chips --  thường được sử dụng ở  **solid-state drives (SSDs) **  ,   thực hiện các request dữ liệu nhanh hơn có thể nếu bộ đệm nằm trên ổ đĩa cứng truyền thống (HDD) 

## 4 - Cache vs. RAM

Cache memory và RAM đều đặt dữ liệu gần processor để giảm độ trễ thời gian response. Cache memory thường là một phần của CPU hoặc một phần của phức hợp bao gồm CPU và chipset liền kề nơi bộ nhớ được sử dụng để chứa các dữ liệu thường xuyên truy cập.

Mặt khác, bộ nhớ cache RAM thường bao gồm bộ nhớ vĩnh viễn được nhúng trên bo mạch chủ và các mô-đun bộ nhớ có thể được cài đặt trong các khe cắm chuyên dụng hoặc vị trí đính kèm.  Mainboard bus cung cấp quyền truy cập vào những memories.

Bộ nhớ cache của CPU nhanh hơn từ 10 đến 100 lần so với RAM, chỉ cần vài nano giây để đáp ứng yêu cầu của CPU. Tuy nhiên, bộ nhớ cache RAM nhanh hơn thời gian đáp ứng so với các thiết bị nhớ cổ điển (đĩa từ), cung cấp I/O với tốc độ tính bằng mili giây.

## 5 - Cache vs. buffer

Buffer là khu vực dùng chung nơi các thiết bị phần cứng hoặc chương trình hoạt động ở tốc độ khác nhau  với các ưu tiên khác nhau có thể tạm thời lưu trữ dữ liệu. Buffer cho phép mỗi thiết bị hoặc quá trình hoạt động mà không bị trì hoãn bởi các thiết bị khác.

Buffer và Cache đều cung cấp một vị trí tạm thời cho dữ liệu. Cả hai cũng sử dụng các thuật toán để kiểm soát sự di chuyển của dữ liệu vào và ra khỏi khu vực giữ dữ liệu.

Tuy nhiên, Buffer và Cache khác nhau về lý do tạm thời giữ dữ liệu. Cache làm như vậy để tăng tốc quá trình và hoạt động. Buffer nhằm mục đích cho phép các thiết bị và quy trình hoạt động tách biệt với nhau.

Nguồn: https://searchstorage.techtarget.com/definition/cache