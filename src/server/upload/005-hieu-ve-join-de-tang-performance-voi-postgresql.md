© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Performance optimization với PostgreSQL](https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W).

Theo con số thống kê không tin cậy :joy: có trên 70% các query sử dụng join table để check điều kiện hoặc lấy thêm thông tin. Ngoài ra, các **Senior** cũng tâm sự join ảnh hưởng nhiều đến performance, làm  chậm hệ thống. Cụ thể nó chậm thế nào, mình thiết kế kém hay do viết query lởm, cùng đi tìm hiểu để có câu trả lời cụ thể nhất.

Chúng ta biết có 4 loại join cơ bản sau:
> - **Join ~ Inner join.**
> - **Left join ~ Left outer join.**
> - **Right join ~ Right outer join.**
> - **Full join ~ Full outer join.**

Ngoài ra còn **Cross join** tuy nhiên khá đặc thù và ít sử dụng. Các loại join này đã rất quen thuộc nên mình không đi chi tiết vào phần này. Với performance tuning, chúng ta sẽ quan tâm đến cách mà các bảng được join với nhau như thế nào. Cụ thể gồm có:
> - Nested loop join.
> - Hash join.
> - Merge join.

Let's begin.

## 1) Nested loop join

Có thể hình dung đơn giản rằng nó là hai vòng lặp lồng nhau. Lần lượt các record ở table A được so sánh với các record ở table B. Độ phức tạp của Nested loop join là O(n2).
> - 2 vòng lặp.
> - Vòng lặp bên ngoài duyệt qua các record ở table bên trái, hay còn gọi là drive table.
> - Vòng lặp bên trong duyệt qua các record ở table bên phải, gọi là join table.

Ví dụ có 2 table là **Customer** và **Level**.

![](https://i.imgur.com/ABBYD41.png)


Thực hiện join 2 table trên column **level**, áp dụng các bước ở trên khi thực hiện **nested loop join**, quá trình diễn ra như sau:
> - Thực hiện lặp ở **drive table** (CUSTOMER), lấy record đầu tiên có **LEVEL = Gold**.
> - Thực hiện lặp ở **join table** (LEVEL), so sánh từng record của LEVEL trong table LEVEL với giá trị **Gold**. 
> - Đến record thứ 3, kiểm tra trùng khớp, trả về kết quả và kết thúc vòng lặp của **join table**.
> - Lặp lại các bước trên với record tiếp theo của drive table cho đến hết.

Quick question, trong trường hợp join table có join key trùng lặp thì chuyện gì sẽ xảy ra?

> Vòng lặp thứ 2 khi thực hiện scan join table, chỉ dừng lại khi column đó chứa giá trị unique. Nếu không nó sẽ không dừng lại khi tìm thấy kết quả mà sẽ scan toàn bộ join table.

Như vậy với **nested loop join**, dễ dàng nhận thấy ưu điểm của nó:
> - Có thể work với tất cả các điều kiện join. Vì bản chất là 2 vòng lặp, so sánh từng record với nhau dựa trên điều kiện đã cho.
> - Low overhead (không tốn chi phí phát sinh). Đơn giản chỉ cần tạo ra 2 vòng lặp, không tạo ra các data structure nào khác để lưu trữ dữ liệu trong quá trình join.
> - Complexity O(n2), phù hợp với các table có số lượng record nhỏ đến vừa.

Ngoài ra, nó có nhược điểm:
> - Độ phức tạp O(n2) nên table join càng lớn thì tốc độ càng chậm.
> - Nếu table quá lớn, trong khi dung lượng RAM nhỏ không lưu trữ được toàn bộ table, ta cần sử dụng đến SSD hoặc HDD, tốc độ đọc ghi chậm hơn RAM khá nhiều lần.

Vậy, làm thế nào để cải thiện **nested loop join**? Việc join 2 table bắt buộc phải thực hiện tuần tự trên **drive table**, sau đó compare với các record của **join table**. Bản chất của quá trình compare chính là tìm kiếm record thỏa mãn yêu cầu, giống quá trình scan table. Do đó, để cải thiện **nested loop join**, rất đơn giản là sử dụng **index**. Tuy nhiên, sử dụng loại index nào sẽ phụ thuộc vào điều kiện join table và kĩ thuật này được gọi là **covered indexes**.

Đến giờ thực hành để kiểm chứng mớ lý thuyết trên, data mình vẫn sử dụng từ [bài trước](https://viblo.asia/p/002-hieu-ve-index-de-tang-performance-voi-postgresql-p1-3Q75wV3elWb). Tiến hành phân tích query sau:

```sql
EXPLAIN ANALYZE SELECT e.id, e.first_name || ' ' || e.last_name, c.country_name 
FROM ENGINEER e JOIN COUNTRY c ON e.country_id = c.id;
```

![](https://i.imgur.com/ojAJFPz.png)

Khoan đã, sau lại **Hash join**? Tất nhiên PostgreSQL đủ thông minh để biết nên sử dụng loại join nào là tối ưu với query này. Nếu muốn query sử dụng **nested loop join**, ta cần explicit enable nó. Chạy lại với các query sau:

```sql
SET enable_nestloop = true;
SET enable_hashjoin = false;
set enable_mergejoin = false;

EXPLAIN ANALYZE SELECT e.id, e.first_name || ' ' || e.last_name, c.country_name 
FROM ENGINEER e JOIN COUNTRY c ON e.country_id = c.id;
```

![](https://i.imgur.com/IE5ORhR.png)

Ok, query hiện tại đã sử dụng **nest loop join**. So sánh nhanh về **cost** và **actual time** đều lớn hơn **hash join**. Đúng là PostgreSQL thông minh thật. Để ý một chút, ta sẽ thấy query chạy sequence scan trên table ENGINEER, nhưng sau đó sử dụng index scan trên table country mà không phải là sequence scan? Đơn giản thôi, PostgreSQL sẽ tự động thêm index cho PK. Ở đây ta đang join trên column PK nên nó sử dụng index scan là điều dễ hiểu. 

Thử remove constraint PK và chạy lại nhé.

```sql
ALTER TABLE country DROP CONSTRAINT country_pkey;

SET enable_nestloop = true;
SET enable_hashjoin = false;
set enable_mergejoin = false;

EXPLAIN ANALYZE SELECT e.id, e.first_name || ' ' || e.last_name, c.country_name 
FROM ENGINEER e JOIN COUNTRY c ON e.country_id = c.id;
```

![](https://i.imgur.com/zDxh9dH.png)

Thời gian xử lý tăng từ 89 ms lên 1970 ms, khoảng 22 lần, khủng khiếp :joy:. Rút ra thêm một kết luận, nếu có ý định sử dụng join, hãy kiểm tra xem column điều kiện đã được index chưa nhé.

## 2) Hash join
Phần trước, chúng ta đã biết về **hash index** sử dụng **hash function** với các tính chất:
> - Biến một chuỗi có độ dài bất kì về độ dài cố định.
> - Đảm bảo tính unique.
> - Một thay đổi nhỏ cũng dẫn đến thay đổi giá trị hash.

Ý tưởng và các bước thực hiện **hash join** bao gồm 2 phase:
> - **Hash phase**: build hash table với table có số lượng records nhỏ hơn. Với mỗi join FK, hash ra giá trị và lưu vào hash table. Từng giá trị đó sẽ mapping với các record trong table chính.

Tiếp theo là **probe phase**, với các bước sau:
> - Duyệt qua từng record của table lớn hơn.
> - Với mỗi record, tính toán hash value của FK.
> - Tìm kiếm hash value vừa tính toán trong hash table của table nhỏ hơn đã build ở **hash phase**.

Việc look up key trong hash table có tốc độ nhanh hơn so với sequence scan. Time complexity O(1), trong trường hợp tệ nhất là O(logn). Tuy nhiên, lưu ý rằng chúng ta phải build hash table nên time complexity trung bình là O(nlogn).

Thực hành để kiểm chứng, tạo lại PK cho COUNTRY(id):
```sql
ALTER TABLE COUNTRY ADD CONSTRAINT pk_country PRIMARY KEY (id);

SET enable_nestloop = false;
SET enable_hashjoin = true;
set enable_mergejoin = false;

EXPLAIN ANALYZE SELECT e.id, e.first_name || ' ' || e.last_name, c.country_name
FROM ENGINEER e JOIN COUNTRY c ON e.country_id = c.id;
```

![](https://i.imgur.com/0dTpOAS.png)

```sql
SET enable_nestloop = true;
SET enable_hashjoin = false;
set enable_mergejoin = false;

EXPLAIN ANALYZE SELECT e.id, e.first_name || ' ' || e.last_name, c.country_name
FROM ENGINEER e JOIN COUNTRY c ON e.country_id = c.id;
```

![](https://i.imgur.com/9lI5gs8.png)

Computation cost khi sử dụng **hash join** tốt hơn khoảng 6 lần so với **nested loop**. Execution time cũng nhanh hơn khoảng 3 lần. Thực ra đã có thể kết luận điều này từ ví dụ trên với **nested loop join** :joy:.

Kết luận, **hash join** có những tính chất sau:
> - Giống với **hash index**, **hash join** chỉ thực sự hữu dụng khi sử dụng với điều kiện so sánh bằng (=).
> - Time complexity trung bình là O(nlogn). Phụ thuộc vào độ lớn của table nhỏ hơn vì phải build hash table, và độ lớn của table lớn hơn vì phải sequence scan.

**Note**:  với MySQL version 5.7 trở về trước, toàn bộ join đều sử dụng nested loop join. Hash join mới chỉ xuất hiện từ MySQL version 8.0. Lý do được cho là vì MySQL muốn làm mọi thứ đơn giản và nhanh gọn nhất nhất nên không cung cấp hash join ngay từ thời điểm đầu.

--- 

**NOTE**: tranh thủ kiếm tìm talent về với team mình. Nếu bạn đang cân nhắc một cơ hội mới với 2 mục tiêu:
- Job remote full time, không quản thúc thời gian hay địa điểm. Bạn hoàn toàn có thể vừa nhâm nhi li cocktail bên bãi biễn, vừa fix bug và trò chuyện với crush.
- Package hàng năm lên tới 50k USD (chưa tính thưởng + bonus), tất nhiên nó còn tùy thuộc vào sự chai lì của bạn.

Đừng ngại ngần [contact](mailto:datbv.other@gmail.com) với mình nếu có nhu cầu nhé. Mà thời buổi này ngại chỉ có thiệt thân thôi, good luck!

---

## 3) Merge join
**Merge join** còn được biết với tên gọi khác là **Sort-merge join**. Nghe đến **sort** là đã biết chắc chắn phải **sort** table. Concept của **merge join** là:
> - Sắp xếp cả 2 table theo FK.
> - Tận dụng lợi thế của việc sắp xếp table để giảm số lượng row sequence scan trên join table.

Lợi thế đó là gì, hơi khó hình dung... Đọc tiếp đã, ví dụ với query sau: 

```sql
SELECT * FROM engineer e JOIN country c ON e.country_id = c.id;
```

Sau khi sắp xếp 2 tables EMPLOYEE và COUNTRY với FK là **country_id**, chúng ta có 2 table như bên dưới:

![](https://i.imgur.com/eBtmPOC.png)


Bắt đầu thực hiện merge join 2 tables với các bước:
> - Seq scan trên drive table ENGINEER, record thứ nhất có FK = 1, so sánh với join table COUNTRY. Record thứ nhất của ENGINEER FK = 1 trùng với record thứ nhất của COUNTRY. 
> - Tiếp tục record thứ hai của ENGINEER có FK = 1, giống với record thứ nhất. Do đó, việc look up trên join table sẽ bắt đầu từ record đầu tiên trùng với record trước đó của drive table. Hơi khó hiểu nhỉ, đọc tiếp đã nhé.
> - Đến record thứ ba của ENGINEER có FK = 2, lúc này đã khác với record trước đó có FK = 1. Do vậy, việc look up trên join table sẽ bắt đầu từ sau record cuối cùng trùng với record trước đó của drive table. Tức là lúc này sẽ look up từ record thứ hai của COUNTRY, bỏ qua luôn record đầu tiên.
> - Tiếp theo là record thứ tư của ENGINEER có FK = 5. Tương tự cách thức trên, sẽ look up từ record thứ ba của COUNTRY có FK = 3. Không thỏa mãn điều kiện, tiếp tục look up đến record tiếp theo có FK = 4, vẫn chưa thỏa mãn. Cứ tiếp tục như vậy cho đến khi tìm được record đúng với yêu cầu có FK = 5.
> - Record thứ năm của ENGINEER có FK = 5. Vì trùng với record trước đó nên việc look up trên join table sẽ bắt đầu luôn từ record đầu tiên trùng với record trước đó của drive table. Như vậy sẽ start luôn từ FK = 5 bên join table mà không cần duyệt lại từ đầu.

Về bản chất **merge join** khá giống **nested loop join**, tuy nhiên việc sắp xếp table giúp chúng ta hạn chế scan join table từ record đầu tiên. Dẫn tới giảm số lượng record phải scan trên join table.

Idea của **merge join** khá hay, cùng điểm qua một vài tính chất của nó nhé:
> - Giống **hash join**, nó chỉ phù hợp khi join với điều kiện so sánh bằng (=).
> - Độ phức tạp và thời gian thực thi dựa trên độ lớn của 2 tables vì nó cần tốn công cho việc sắp xếp.
> - Phù hợp join với các table cực kì lớn, không thể load toàn bộ table vào memory.

Ok, thực hành thôi:
```sql
SET enable_nestloop = false;
SET enable_hashjoin = false;
set enable_mergejoin = true;

EXPLAIN ANALYZE SELECT e.id, e.first_name || ' ' || e.last_name, c.country_name
FROM ENGINEER e JOIN COUNTRY c ON e.country_id = c.id;
```

![](https://i.imgur.com/MWWOVaY.png)

**Computation cost** và **execution time** khá lớn, thậm chí lớn hơn cả **nested loop join** vì lý do phải sắp xếp các tables. Trên thực tế, **merge join** chỉ phù hợp khi join các table có lượng data rất lớn vượt quá size của memory.

Về cơ bản, PostgreSQL khá thông minh để quyết định xem nên sử dụng loại join nào cho phù hợp. Tuy nhiên trong một vài trường hợp ta thấy các table nhỏ dùng **merge join** trong khi table lớn hơn lại dùng **nested loop join**. Có thể có một vài vấn đề, lúc này ta cần một vài cách thức khác để kiểm tra kĩ hơn, mình sẽ giới thiệu trong bài tiếp theo nhé.

### Reference
Reference in series https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W

### After credit

Bạn có thắc mắc vì sao **merge join** chỉ phù hợp với điều kiện so sánh bằng (=) không? Đơn giản thôi, nếu là so sánh nhỏ hơn (<), ta không thể biết scan join table phải bắt đầu từ record nào, do đó nó sẽ bắt đầu từ record đầu tiên. Khi ấy không khác gì **nested loop join**.

**Sub-query** vs **Join**. Hai câu query sau cho ra cùng một kết quả:
```sql
SELECT 
    e.id, 
    e.first_name || ' ' || e.last_name, 
    (SELECT c.country_name FROM COUNTRY c WHERE c.id = e.country_id)
FROM ENGINEER e;


SELECT 
    e.id, 
    e.first_name || ' ' || e.last_name, 
    c.country_name
FROM ENGINEER e JOIN COUNTRY c ON e.country_id = c.id;
```

Cả hai cách trên đều cho ra một kết quả chung. Theo bạn cách nào tốt hơn? Trường hợp nào nên dùng JOIN, trường hợp nào dùng SUB-QUERY? Để lại comment bên dưới nhé.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)