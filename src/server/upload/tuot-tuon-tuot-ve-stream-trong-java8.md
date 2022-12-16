**Hi. Cảm ơn vì đã click đọc bài của mình - mình sẽ không làm bạn thất vọng** :heart_eyes::heart_eyes:. 

-----
Quay trở lại với series **Tuốt tuồn tuột**, hôm nay do đang không có task nên mình tranh thủ viết bài (kẻo nhàn cư vi bất thiện :grin:). 

Lúc đầu thì tính là không viết dài, nhưng vì giật tít bài viết ghê quá, nên mình sẽ cố gắng viết hết tất cả, từ khái quát, bản chất cho tới hiệu năng, .... 

Tuy hơi dài nhưng chắc là cũng đáng để đọc, mục tiêu của mình khi viết bài này là mong rằng chỉ đọc only bài này, các bạn đã thật sự hiểu sâu, nắm chắc về mặt bản chất của **stream**, qua đó từ từ trở thành **Senior Java Developer**.

Viết có hay ho gì không mà **PR** ghê thế?. Bố đọc mà không hiểu lại **down vote** cho bây giờ! :joy::joy:

Úi, đừng **down vote** mà tội nghiệp em nó, vào bài ngay đây.

-----

### 1. Stream là gì?
#### 1.1 Một câu chuyện nhỏ và định nghĩa.
Chuyện rằng ngày nảy ngày nay, ở **phường 3,** quận **Tân Bình** có thằng **Tèo**, nhà giàu tổ bố, nhà cực nhiều xe, nó có một List **10** chiếc xe với thông tin ngày bảo hành gần nhất. 

Đến hạn bảo dưỡng,  vì **đ\*o** lành nghề IT nên **Tèo** nhờ  **Tồ (kỹ sư công nghệ thông tắc hệ thống thoát nước)** kiểm tra xem xe nào đến hạn bảo hành. 

Với số lượng 10 chiếc, Tồ nhanh trí sử dụng **Iterator next()** kiểm tra trên từng chiếc xe, mọi việc đơn giản, Tồ lụm 2 củ.

-----
Qua hôm sau, thằng **Tí** kế bên kêu thằng **Tồ** tới làm vố này to, Tồ nhanh chân đề máy tới nhà Tí, vừa mới xem cái List thằng Tí đưa ra, nó loạng quạng, chân đứng không vững (**10.000.000 xe**). Hóa ra, bố thằng Tí làm chủ bãi xe phế liệu, bố nó không bảo trì mà muốn kiếm xe chưa hết hạn lưu thông.

-----
Máy yếu, sử dụng **Iterator next()** thì chắc là không ổn. Đang ngồi suy nghĩ miên man, sực một giọng nói vang lên phía sau lưng Tồ, "lẹ đi mày, tao còn có việc đi nữa". 

Bí quá, làm sao nhanh được?, Tồ tự hỏi. Bỗng nhiên sực nhớ **Viblo** có chuỗi bài **Tuốt tuồn tuột**, Tồ nhanh trí đọc bài **"Tuốt tuồn tuột về Java Stream"**, bật máy lên dùng ngay **Parallel Stream**. Vụt, kết quả xuất hiện rồi sao?, sao nhanh vậy được?, Tồ tự hỏi. 

Kết quả có thật, nhưng xui vl, không còn chiếc nào còn hạn bảo hành, Tí đưa Tồ 20k rồi nói **"CÚTTTTTT"**

Tồ thật không may, tuy nhiên tồ cũng đã hiểu và biết cách sử dụng stream, tối đó Tồ ngủ ngon lắm. **HÃY NHƯ TỒ.**

![](https://images.viblo.asia/4287b849-34fa-41ab-a0b5-617738765507.png)

-----
Vậy stream là gì?. Định nghĩa đơn giản như sau:

> Stream represents a sequence of objects from a source, which supports aggregate operations. 

> Stream là đại diện cho mỗi chuỗi các đối tượng từ một nguồn, hỗ trợ các hoạt động tổng hợp. 

**"Nguồn"** ở đây là danh sách xe của Tèo và Tí. còn các **"hoạt động tổng hợp"** ở đây là phương thức filter (hôm này - ngày bảo hành gần nhất > 10) giúp tìm ra các xe hết hạn lưu thông. 

-----
#### 1.2 Các đặc điểm của stream.
* Source: dữ liệu nguồn có thể là từ Array, List, I/O 
* Tự động **lặp lại phương thức** đối với các phần tử có được từ collection. 
* Hỗ trợ các phương thức như **filter, map, limit, reduce, find, match, ...**
-----
#### 1.3 Có gì hơn collection?

##### 1. No Storage - không lưu trữ
> A stream is not a data structure that stores elements; instead, it conveys elements from a source such as a data structure, an array, a generator function, or an I/O channel, through a pipeline of computational operations.

> Stream **không phải là cấu trúc dữ liệu lưu trữ các phần tử**, thay vào đó, nó truyền tải các phần tử này thành các kiểu dữ liệu khác như mảng, hàm hoặc kênh I/O, thông qua một hệ thống luồng tính toán.

-----
**Giải nghĩa**: 
Collection là một cấu trúc dữ liệu (có thể là ArrayList, LinekedList), còn stream thì chỉ như là công cụ xử lí. Nếu ta có danh sách 10 tên tội phạm thì collection sẽ trực tiếp lưu các phần tử vào ArrayList, còn stream chỉ giúp ta filter() những tên tội phạm ma túy, sort() theo thứ tự ngày phạm tội, ... 

Stream không trực tiếp lưu trữ những phần tử này, nó luôn cần source (dữ liệu đầu vào) để xử lí.

-----
##### 2. Functional in nature.
> An operation on a stream produces a result, but does not modify its source.

> Stream luôn cho ra kết quả, nhưng **không sửa đổi đầu vào**. 

-----
**Giải nghĩa**: 
    
Giả sử ta có một colection 10 pornstar name, vì thích hàng còn mới nên ta sử dụng stream để lọc bớt các cô có số lượng phim đóng lớn hơn 5, kết quả stream cho ra 3 cô. Mặc dù kết quả stream là 3, nhưng nó không tác động tới dữ liệu collection, dữ liệu ở trong collection vẫn **bất biến là 10**. Đây chính là ý muốn nói của functional in nature.

Kể sơ thì 10 cái tên này gồm: R*** takizawa, S*** aoi .... Ẹc, đang nói về **stream**, lạc cmn đề :joy:.

-----
##### 3. Lazy seeking - hoạt động trung gian luôn lười biếng
> Many stream operations, such as filtering, mapping, or duplicate removal, can be implemented lazily, exposing opportunities for optimization. 

> Nhiều hoạt động trên stream, chẳng hạn như filtering, mapping hoặc loại bỏ trùng lặp, có thể được **triển khai một cách lười biếng**, cho thấy cơ hội tối ưu hóa.

**Giải nghĩa**: 

> Streams are lazy because intermediate operations are not evaluated unless terminal operation is invoked.

> Stream là lười biếng vì các hoạt động trung gian không được xác định **cho tới khi hoạt động cuối được gọi**.

![](https://images.viblo.asia/dd3c1fd2-fed0-4ebc-9b8a-96dae066b768.png)
<div align="center">
    Nguồn ảnh/ Source: logicbig.com
 </div>

Ví dụ: 
```java
List<xe> xeSang = DanhSáchXe.stream()
                            .filter(xe : làXeSang())
                            .collect(toList());
```

Sở dĩ ta dùng từ lười biếng vì stream filter lọc ra xe sang chỉ tuần tự gọi ra khi terminal operation (collect()) được gọi. Nếu terminal chưa gọi, các bước như filter chỉ là những bước riêng lẻ, thực hiện trên từng thể hiện của stream.

Nếu vẫn chưa hiểu, các bạn đọc tiếp tới mục 4, tham khảo thêm câu hỏi [này](https://stackoverflow.com/questions/21219667/stream-and-lazy-evaluation).

-----
##### 4. Possibly unbounded - có thể không giới hạn. 
> While collections have a finite size, streams need not. Short-circuiting operations such as limit(n) or findFirst() can allow computations on infinite streams to complete in finite time.

> Collections thì có giới hạn, nhưng stream thì không. Các hoạt động xoay vòng như limit(n) hoặc findFirst() **có thể tính toán trên luồng vô hạn trong thời gian hữu hạn**.

-----
##### 5. Consumable -  Bị hủy sau một lần sử dụng. 
>The elements of a stream are only visited once during the life of a stream. Like an Iterator, a new stream must be generated to revisit the same elements of the source. 

>Các elements của stream chỉ được ghé qua một lần duy nhất. Giống như Iterator, một stream mới sẽ cần khởi tạo lại để truy cập lại elemets đó.

-----
### 2. Khởi tạo stream như thế nào?
Một số cách để khởi tạo một đối tượng stream:

1. Khởi tạo từ một Collections với số lượng phần tử giới hạn (thông qua stream() và parallelStream()).
2. Thông qua Array, phương thức Arrays.stream(Object[]);
3. Thông qua Factory Init như,  Stream.of(Object[]), IntStream.range(int, int) or Stream.iterate(Object, UnaryOperator);
4. Bằng BufferedReader.lines();
5. Qua Files.
6. Bằng cách sử dụng phương thức Random.ints();, khởi tạo dãy số ngẫu nhiên.
 -----
#### 2.1 Chuyển từ collections sang stream như thế nào?

Ở Java 8, phương thức stream() đã được thêm sẵn vào interface của collection, vì vậy rất dễ dàng để chuyển đổi từ collection sang stream. 

Có 2 phương thức chuyển đổi là:
* **stream()**  : trả về một **luồng tuần tự** với source là collection.
* **parallelStream()** : trả về một **luồng song song** với source là collection.

Collection sẽ có thêm 2 phương thức này trong interface.

Hình dưới: stream và parallel stream chạy trên 4 cores, thời gian khi sử dụng parallel là ít hơn hẳn.

![](https://images.viblo.asia/62cd84dd-dc05-43c1-8c9c-481d36f79837.png)
<div align="center">
    Nguồn ảnh/ Source: logicbig.com
 </div>

Tuy nhiên, có một điểm lưu ý để không nhầm lẫn trong việc chuyển đổi này là: 
> When a collection is transformed into a stream, the original collection is not modified in any ways. Only the memory addresses of each item is acquired, the object is cloned and streamed into the stream one by one.

Được hiểu rằng:
> Khi một collections được chuyển thành stream, collections gốc thực sự không thay đổi. Chỉ có địa chỉ nhớ của từng đối tượng được lấy ra, các đối tượng được sao chép, và đưa vào stream từng phần tử một.

-----
### 3. Một số phương thức chính.
-----
#### 3.1 Intermediate operation (phương thức trung gian).
Stream có 5 phương thức trung gian chính là: **filter()**, **map()**, **limit()**, **sorted()**, **distinct()**



-----
#### 3.2 Terminal operations (phương thức đầu cuối).
Có 3 phương thức trung gian là: **forEach()**, **count()** và **collect()**

![](https://images.viblo.asia/07158eff-53c8-40de-9602-9c824190f77f.jpg)
<div align="center">
    Nguồn ảnh/ Source: oracle.com
 </div>
Tại sao lại có 2 nhóm phương thức này?, có phải sẽ thực hiện hết tất cả các phương thức trung gian rồi mới thực hiện phương thức cuối hay không?. Chi tiết sẽ được giải thích ở mục 4.

-----
### 4. Bản chất stream có gì?
Vì hoạt động theo phương thức **pipelined (ống)**. Stream trong Java chia thành **3 công việc (operations) chính**, cũng có thể nói rằng 3 thành phần (components) này giúp stream hoạt động. Ngoài ra, thứ tự thực hiện trong stream cũng cụ thể, rõ ràng và theo tuần tự (**sequence**). 

Ở mỗi (**operations**) sẽ có một công việc nhất định phải làm, sau khi đã xong ở công đoạn này, sẽ tiếp tục tới công đoạn khác cho tới khi hoàn tất.

-----
#### 4.1 Ba thành phần của stream.
Bất kì công việc nào có liên quan với **Java API Stream** đều phải có ba thành phần sau:
* **Source (thành phần nguồn - có thể linh động)**
* **Intermediate operation (thành phần trung gian - có thể có 1 hoặc nhiều)**
* **Terminal operation (thành phần cuối - thường chỉ có một mà thôi)**

Ba thành phần này sắp xếp với nhau theo thứ tự để tạo thành một luồng stream. 

![](https://images.viblo.asia/beffbd1b-0bbc-4da7-95e1-6e67bea614dc.png)
<div align="center">
    Nguồn ảnh/ Source: JavaBrahman.com
 </div>
 
Với các thành phần như vậy, ta sẽ đi sâu tìm hiểu xem chức năng của từng thành phần như thế nào, thứ tự thực hiện ra sao ở **mục kế sau đây**.

------
#### 4.2 Chức năng của từng thành phần là gì?

1. **Source**: được hiểu là dữ liệu đầu vào: có thể là một mảng (array), một danh sách (list) hoặc một stream được tạo ra bằng phương thức generate() , đầu vào ở đây có thể linh động theo yêu cầu cụ thể.
2. **Intermediate operation** là một hoạt động trung gian, hoạt động này gọi trên từng items của Stream. Như đã nêu ở mục số 3, stream có 5 phương thức trung gian là: Stream.map(), Stream.filter() , Stream.limit(). Sở dĩ gọi là trung gian vì sau bước này, ta chưa thể có stream output, các phương thức này chỉ là phương thức hỗ trợ xử lí để có stream output. Ví dụ như 2 method **filter()** và **sorted()** chỉ giúp lọc và sắp xếp chuỗi stream đầu vào, nếu không có bước cuối cùng (**terminal**), ta chưa thể có một stream hoàn chỉnh.
1. **Terminal operation**, là hoạt động cuối cùng của đường ống (pipelined). Sở dĩ gọi nó là terminal vì sau khi thực hiện, ta không thể sử dụng lại stream.  Bước cuối cùng này có trách nhiệm trả về 'output' cho stream. Bước cuối cùng này có thể trả về **từng đối tượng (forEach())**, **độ dài stream (count())** hoặc một **collections (collect())**.


Một khi đã thực hiện tới bước cuối cùng (terminal), **không thể quay trở lại thực hiện một hoạt động trung gian nào khác**. 

Tiện đây trích luôn câu nói nổi tiếng của thanh niên **Heraclitus**:
> You never step into the same river twice.
> 
> Bạn không thể **tắm tiên** hai lần trên một dòng sông :joy:.

-----

Tới giờ mình vẫn chưa hiểu được ý nghĩa thâm sâu của câu nói này. Mình nghĩ có 3 khả năng:

* **Thứ nhất**: Có thể là cha này viết cho tương lai (hiện tại ô nhiễm môi trường bây giờ - tắm lần 1 là ghẻ đầy người vào da liễu).
* **Thứ hai**: Cũng có khi là lời dặn dò cho các chị em thích tắm tiên (lần thứ 2 có thể bị hiếp).
* **Cuối cùng**: Cha này lần đầu tiên tắm sông bị đuối nước tưởng đâu chết, may nhờ có người cứu, từ đó ai rủ đi tắm sông cũng không dám nữa. Để che mắt thiên hạ thì viết ra câu này.

Thôi chết, lại lạc cmn đề :joy:. Quay trở lại, sau đây sẽ là ví dụ minh họa dễ hiểu về **stream**.

------
#### 4.3 Ví dụ minh họa.
Lý thuyết là vậy, đọc buồn ngủ quá, vì vậy, để có cái nhìn khách quan và thực tiễn, ta sẽ thử xem xét ví dụ:

Hình dung Stream như một dây chuyền lắp ráp ô tô, với đầu vào là 10 khung xe, nếu ta viết Stream:
```java
       List<String> danhsachXe = Arrays.asList("Lamborghini reventon", 
                                               "Toyota mazda cx 5", 
                                               "Roll royce phantom drophead coupe", 
                                               "Hyundai grand i 10",
                                               "SLR McLaren Mansory Renovatio");
  
       // Convert list to stream
       List<String> xeSang = danhsachXe.stream()                                
                                       // Chỉ lấy siêu xe
                                       .filter(xe -> isXeSang(xe))
                                       // Lấy 2 xe
                                       .limit(2)
                                       // Convert streams to a List
                                       .collect(Collectors.toList());              

        xeSang.forEach(System.out::println);  // Lamborghini reventon, Roll royce phantom drophead coupe
```

**Intermediate operation** có 2 bước:
* Bước 1: Lọc ra các xe là xe sang, thông qua Stream.filter() và function isXeSang, hàm này có thể kiểm tra giá tiền > 3 tỷ chẳng hạn.  
* Bước 2: Giới hạn số xe lấy ra là 2.
**Terminal operation** trường hợp này lại trả về từng đối tượng (item) trong Stream (Stream.forEach()), in ra danh sách 2 xe (Lamborghini reventon và Roll royce phantom drophead coupe).

### 5. Parallel stream là gì?. Nghe đồn xử lí đa luồng ghê lắm!

#### 5.1 Parallel stream là gì?

Mình sẽ trích dẫn một đoạn nhỏ từ cuốn Java 8 in Action
> A parallel stream is a stream that splits its elements into multiple chunks, processing each chunk with a different thread. 

> Parallel stream là stream chia các phần tử của nó vào các chunks (solid piece of something), xử lí từng chunk với các thread khác nhau.

**Giải nghĩa:**

Lấy ví dụ khi thực hiện phép cộng: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8. Khi sử dụng parrallel stream sẽ chia thành 2 chunks, mỗi chunk sẽ chạy trên một thread riêng biệt. Thứ tự thực hiện như sau:

![](https://images.viblo.asia/922281ca-83b0-4671-b9e6-fcd9cb66ea88.png)
<div align="center">
    Nguồn ảnh/ Source: Java 8 in Action - page 205
 </div>

-----
#### 5.2 Có gì hơn sequential stream và iterator?

Cùng xem hình sau:
![](https://images.viblo.asia/6a0cb986-4805-451b-9a28-05d993fca67d.png)
<div align="center">
    Bảng thời gian xử lí, so sánh giữa Parralel Stream, Sequential Stream, Iterator
 </div>

Đầu tiên, khi xử lí dữ liệu không quá lớn (**<15000 elements**), sự khác biệt giữa **Iterator, Sequential Stream** và **Parrelel Stream** là quá ít (chỉ chừng **0.1s**), quá nhanh để có thể cảm nhận. Tuy nhiên, khi  dữ liệu (**>40000 elements**), sự khác biệt về thời gian xử lí có thể thấy rõ (chênh nhau **0.5s**).

Vì vậy, khi xử lí với dữ liệu lớn, sử dụng **Parrelel Stream** sẽ tăng hiệu năng đáng kể.

### 6. Một số câu hỏi mở

* Có thật sự có khác biệt về peformance giữa **Sequential Stream** và **Iterator** hay không?
* Luôn dùng **Parralel Stream** có phải là phương án tốt?
* Tại sao Stream lại là **lazy**, không **lazy** thì ảnh hường gì?
* Nếu xử lí đã luồng ở  **Parralel Stream** có hiệu năng tốt, có thể ứng dụng nó vào đâu? - có thể là dùng khi [JDBC ](https://kieblog.vn/jdbc-nguoi-tien-su-trong-ky-java/)  query dữ liệu 

### Lời kết.
Đã đọc tới đây thì chân thành cảm ơn các bạn đã bỏ vài phút cuộc đời để đọc bài của mình. 

Nếu không thất vọng thì **còn ngại ngần chi** mà không **up vote** ngay (-> cha này sống ảo thiệt).
Bất cứ thắc mắc hay góp ý gì về bài viết xin vui lòng cmt ở phía dưới (sẽ reply). 

Mình có chỗ nào dịch sai hoặc chưa sát nghĩa nhờ các bạn chỉ giúp mình.

**Again, thanks for reading, love u so much!** :heart_eyes::heart_eyes: