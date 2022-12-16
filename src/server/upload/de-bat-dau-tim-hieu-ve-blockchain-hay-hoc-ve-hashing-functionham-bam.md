# Mở đầu
## Blockchain là gì
Blockchain (hay cuốn sổ cái) là hệ thống cơ sở dữ liệu cho phép lưu trữ và truyền tải các khối thông tin (block). Chúng được liên kết với nhau nhờ mã hóa.

Các khối thông tin này hoạt động độc lập và có thể mở rộng theo thời gian. Chúng được quản lý bởi những người tham gia hệ thống chứ không thông qua đơn vị trung gian.

Nghĩa là khi một khối thông tin được ghi vào hệ thống Blockchain thì không có cách nào thay đổi được. Chỉ có thể bổ sung thêm khi đạt được sự đồng thuận của tất cả mọi người.

Khối thông tin mà chúng ta đang nhắc đến là những cuộc trao đổi, giao dịch trong thực tế.
## Công nghệ Blockchain hoạt động như thế nào?
Để một block – khối thông tin được thêm vào Blockchain, phải có 4 yếu tố:

* Phải có giao dịch: nghĩa là phải có hoạt động mua bán, trao đổi diễn ra. Ví dụ: bạn thực hiện mua hàng trên Amazon
* Giao dịch đó phải được xác minh: mọi thông tin liên quan đến giao dịch như thời gian, địa điểm, số tiền giao dịch, người tham gia… đều phải được ghi lại. Ví dụ: khi xem tình trạng đơn hàng, bạn sẽ biết được mình đã order những gì, tổng tiền là bao nhiêu, khi nào thì nhận được hàng…
* Giao dịch đó phải được lưu trữ trong block: bất cứ lúc nào bạn cũng xem lại được thông tin đơn hàng mà mình đã thực hiện. Chúng được lưu trữ trong mục “Quản lý đơn hàng”.
* Block đó phải nhận được hash (hàm chuyển đổi một giá trị sang giá trị khác): chỉ khi nhận được hash thì một block mới có thể được thêm vào blockchain.

=> Công nghệ Blockchain cho phép trao đổi tài sản/thực hiện giao dịch mà không cần có sự chứng kiến của người thứ ba hoặc không cần dựa trên sự tin tưởng. Hay nói cách khác, Blockchain là nền tảng cho sự ra đời của các hợp đồng thông minh.
# Hashing trong Blockchain
## Hashing là gì
Hashing là quá trình biến đầu vào là một nội dung có kích thước, độ dài bất kỳ rồi sử dụng những thuật toán, công thức toán học để biến thành đầu ra tiêu chuẩn có độ dài nhất định. Quá trình đó sử dụng những Hàm băm.

Ví dụ: trong bitcoin, các transactions lưu thông tin giao dịch được coi như dữ liệu đầu vào. Dữ liệu này được đưa qua thuật toán xử lý, cụ thể là sha-256 sẽ trả về đầu ra là một chuỗi với độ dài nhất định là 256 kí tự. Tức là việc dữ liệu đầu vào có to hay nhỏ thế nào, một đoạn text "Hello World!" hay dữ liệu là 1 file, 1 ảnh thì kết quả cuối cùng ta nhận được là 1 chuỗi với 256 kí tự

## Cryptographic hash function

Cryptographic hash function là một hàm băm với một số tính chất bảo mật nhất định để phù hợp việc sử dụng trong nhiều ứng dụng bảo mật thông tin đa dạng, chẳng hạn như chứng thực và kiểm tra tính nguyên vẹn của dữ liệu đưa vào. Đó là một hàm băm nhận đầu vào là một xâu ký tự dài có độ dài tùy ý và tạo ra kết quả là một xâu ký tự có độ dài cố định.

Và để 1 hàm hash được coi là 1 hàm cryptographic hash, nó cần đạt ít nhất 5 tiêu chí sau đây:
### Deterministic

Nó có nghĩa là khi bạn đưa 1 dữ liệu đầu vào đi qua hàm hash, bạn sẽ luôn luôn nhận về 1 chuổi đầu ra giống nhau

![](https://images.viblo.asia/9c417171-2b4c-4009-b5e4-8b707f1812c7.png)


Điều này rất quan trọng vì nếu với mỗi lần chạy hàm hash ta nhận được 1 output khác nhau thì sẽ là bất khả thi để ta có thể theo dõi giá trị đầu vào 

### Quick Computation

Hàm hash phải có khả năng trả về kết quả với tốc độ nhanh nhất có thể. Bởi vì trong thực tế, dữ liệu đầu vào không phải lúc nào cũng là một chuỗi string, 1 giá trị int mà có thể là 1 file ảnh rất lớn và ta cần chạy hàm hash cho mỗi dữ liệu ta đưa vào. Vì vậy nếu quá trình băm chậm sẽ dẫn đến hệ thống sẽ không thể vận hành tốt được.

### Pre-Image Resistance

Pre-Image Resistance hiểu đơn giản nghĩa là việc ta biết 1 hàm hash và 1 output, và ta khó có thể quay ngược lại xác định đầu vào là gì. Tuy nhiên, việc tìm ra input không phải là 1 điều bất khả thi. Xét 1 ví dụ sau.

Giả sử bạn tung 1 con xúc xắc và ta sẽ có output là giá trị băm của con số xuất hiện từ xúc xắc. Làm thể nào để xác định được con số xuất hiện là số nào? Tất cả những gì chúng ta cần làm đơn giản đó là tìm ra giá trị băm của các số từ 1 đến 6 và so sánh, giá trị đầu vào giống nhau với cùng 1 thuật toán sẽ cho ra kết quả giống nhau. Và ta chỉ cần so sánh kết quả để biết được con số xuất hiện trên xúc xắc

Tuy nhiên điều này chỉ hoạt động khi lượng dữ liệu đã cho là rất ít và trong các trường hợp thực tế thì dữ liệu sẽ lớn hơn rất nhiều. Giả sử ta có giá trị băm có độ dài 128 bit. Các được sử dụng để ta có thể xác định giá trị đầu vào đó là sử dụng 1 phương pháp gọi là  “brute-force". Phương pháp này có nghĩa là bạn sẽ chọn 1 đầu vào ngẫu nhiên, cho nó đi qua hàm hash và so sánh đầu ra với giá trị băm cho trước và lặp lại cho đến khi tìm ra đầu vào của dữ liệu.

* Tình huống tốt nhất: Bạn nhận được chính xác output trùng với giá trị băm ngay trong những lần thử đầu. Tuy nhiên ta sẽ không dựa vào may mắn để thực hiện giải bài toán ở đây
* Tình huống xấu nhất: Bạn phải thực hiện việc lặp bài toán 2^128 lần. Nghĩa là để tìm ra được đáp án ở lần cuối cùng của quá trình lặp lại
* Tình huống trung bình: Bạn sẽ tìm được đáp án đâu đó ở giữa trước khi đến lần lặp thứ  2^128. 

-> Tuy nhiên, đây là 1 con số khổng lồ và nếu bạn muốn tìm ra input của bài toán này, bạn sẽ mất rất nhiều thời gian để lặp đi lặp lại quá trình hash. Giả sử như thời gian bạn thực hiện 1 lần so sánh là 1s và bạn không ngủ thì bạn có thể sẽ mất cả đời để tìm ra được input và đôi khi là không tìm thấy

### Small Changes In The Input Changes the Hash.

Ngay cả khi bạn thực hiện 1 thay đổi nhỏ trong dữ liệu đầu vào, sự thay đổi này sẽ ảnh hưởng rất lớn đến giá trị băm. Ví dụ kiểm tra điều này với hàm băm SHA-256

![](https://images.viblo.asia/29e6c5b2-a63a-425c-a0c8-b21d075b2fcd.png)

Ngay cả khi trong trường hợp bạn chỉ thay đổi chữ cái đầu tiên của input như là chuyển chữ cái in hoa thành chữ cái in thường, toàn bộ các kí tự trong giá trị băm thay đổi

### Collision Resistant

Collision Resistant có nghĩa là trong trường hợp ta có 2 input là A và B, với hàm hash A và hàm hash B tương ứng. Sẽ rất khó để giá trị output của hai hàm hash trên sẽ trùng nhau. Điều đó nghĩa là đối với hầu hết các khả năng, mỗi đầu vào sẽ có 1 hàm băm duy nhất của riêng nó. Để làm rõ hơn điều này, ta sẽ ví dụ bằng Birthday Paradox

Birthday Paradox là gì ? Nếu bạn gặp bất kì người lạ ngẫu nhiên nào trên đường phố thì khả năng cả hai có cùng ngày sinh là rất thấp. Trên thực tế, giả sử rằng tất cả các ngày trong năm đều có số người có ngày sinh nhật vào ngày đó là như nhau, thì khả năng 1 người khác ngày sinh với bạn là 1/356 khoảng 0.27%. Nói cách khác, nó thực sự thấp

![](https://images.viblo.asia/cc44703c-e641-41ab-b422-bf4b9ace4c6f.png)


Tuy nhiên, nghịch lý ở đây là, nếu bạn tập hợp 20-30 người trong 1 phòng thì tỉ lệ hai người có cùng ngày sinh nhật sẽ tăng lên nhanh chóng. Trên thực tế thì có cơ hội 50-50 cho 2 người có cùng ngày sinh trong kịch bản này!

Tại sao lại xảy ra nghịch lý như vậy, bởi vì đó là 1 quy tắc đơn giản trong xác suất diễn ra như sau. Giả sử bạn có N khả năng khác nhau của 1 sự kiện xảy ra, thì bạn sẽ cần căn bậc hai của N các vật được chọn ngẫu nhiên của chúng để có 50% xảy ra va chạm

Áp dụng lí thuyết trong trường hợp này, bạn có 365 khả năng khác nhau về ngày sinh nhật, vì vậy bạn chỉ cần căn bậc 2 của 365 tức là khoảng 23 người được chọn ngẫu nhiên để có 50% cơ hội cho 2 người có cùng ngày sinh nhật

Ứng dụng điều này trong hàm băm như thế nào? Giả sử bạn có 1 giá trị băm 128 bit thì có 2^128 khả năng khác nhau. Bằng cách sử dụng nghịch lý trên, bạn có 50% cơ hội xảy ra sự trùng lặp ở lần thứ 2^64

![](https://images.viblo.asia/674ec4a3-820b-4832-96da-19f750ec5e5d.png)


Vì vậy, không có hàm băm nào có thể đảm bảo rằng việc giá trị output của nó sẽ không bị trùng với giá trị băm của 1 hàm bằng khác, tuy nhiên tốn rất nhiều thời gian để sự va chạm này xảy ra. Và nếu bạn sử dụng một hàm như SHA-256 thì thời gian này còn kéo dài hơn rất nhiều, và ta có thể đảm bằng nếu giá trị băm của A và B trùng nhau, tức là A trùng với B

# Kết luận 
Hashing đã thực sự là nền tảng trong việc tạo ra công nghệ blockchain. Nếu một người muốn hiểu blockchain là gì, họ chắc chắn phải hiểu băm nghĩa là gì. Và ngoài ra còn 1 tiêu chí nữa cho Cryptographic hash function nó gọi là 'Puzzle Friendly', bạn có thể tìm hiểu thêm về nó trong đường link ở phần tham khảo. 

Xin cảm ơn bạn đã quan tâm đến bài viết này, chúc bạn sẽ có được những kiến thức cơ bản về hasing trong blockchain là gì? có những đặc điểm như thế nào. Phần tiếp theo, tôi có thể viết thêm về Public key cryptography và Digital signatures, mời các bạn đón đọc!

* Nguồn tham khảo
https://blockgeeks.com/guides/what-is-hashing/