# Mục lục

- [Giới thiệu](https://www.notion.so/Gi-i-b-i-SQL-tr-n-HackerRank-K-thu-t-Tabibitosan-26a4c1b3a28a47a39a5dc257d57210f6)
- [Challenge](https://www.notion.so/Gi-i-b-i-SQL-tr-n-HackerRank-K-thu-t-Tabibitosan-26a4c1b3a28a47a39a5dc257d57210f6)
    - [Đề bài HackerRank](https://www.notion.so/Gi-i-b-i-SQL-tr-n-HackerRank-K-thu-t-Tabibitosan-26a4c1b3a28a47a39a5dc257d57210f6)
    - [Phân tích câu hỏi](https://www.notion.so/Gi-i-b-i-SQL-tr-n-HackerRank-K-thu-t-Tabibitosan-26a4c1b3a28a47a39a5dc257d57210f6)
    - [Cách giải 1 dùng kỹ thuật Tabibitosan](https://www.notion.so/Gi-i-b-i-SQL-tr-n-HackerRank-K-thu-t-Tabibitosan-26a4c1b3a28a47a39a5dc257d57210f6)
    - [Cách giải 2](https://www.notion.so/Gi-i-b-i-SQL-tr-n-HackerRank-K-thu-t-Tabibitosan-26a4c1b3a28a47a39a5dc257d57210f6)
- [Tham khảo](https://www.notion.so/Gi-i-b-i-SQL-tr-n-HackerRank-K-thu-t-Tabibitosan-26a4c1b3a28a47a39a5dc257d57210f6)

# Giới thiệu

Hôm trước, tôi có giải một câu SQL trên HackerRank và tình cờ phát hiện ra một kỹ thuật hay tên là [Tabibitosan](http://rwijk.blogspot.com/2014/01/tabibitosan.html) (đọc là *ta-bi-bi-tô-san*). Kỹ thuật này được một người Nhật tên Aketi Jyuuzou giới thiệu lần đầu ở cộng đồng Oracle vào năm 2011 dựa trên đề thi đầu vào của một trường trung học Nhật. 

Ý tưởng của kỹ thuật này là thực hiện là so sánh vị trí của các hàng trong nhóm với tập hợp các hàng tổng thể, để tìm ra liệu các hàng trong cùng một nhóm có cạnh nhau hay không.

Hừm, nghe có vẻ rắc rối nhỉ? Tạm bỏ qua cái định nghĩa kia đi. Chúng ta sẽ đi vào một ví dụ đơn giản nhé.

## Bài toán

Giả sử bạn có cột dữ liệu `val` chứa các số như sau:

![Screen Shot 2021-11-12 at 14.09.04.png](https://images.viblo.asia/957d4637-56d3-430b-8679-555140676fa9.png)

Chúng ta dễ thấy có những khoảng số liên tiếp không bị ngắt quãng là `1-3`, `5-7`, `10-12` và `20-21`. Câu hỏi đặt ra là làm sao có thể nhóm chúng với nhau trong SQL?

## Phương pháp

Bây giờ, tôi thêm cột số thứ tự `rn` , rồi thêm cột `grp` là kết quả khi trừ cột `val` cho cột `rn`. Ồ nhìn xem, tôi đã tạo ra một *identical number* cho mỗi chuỗi số.

Tạo bảng mới từ bảng đã cho và thêm cột rn (số thứ tự).

![Tạo bảng mới từ bảng đã cho và thêm cột rn (số thứ tự).](https://images.viblo.asia/3bb007fb-dea5-4178-8822-63e4795ed600.png)

Thêm cột `grp` (= `val` - `rn`)

![Thêm cột `grp` (= `val` - `rn`)](https://images.viblo.asia/1d688ecf-2c84-4562-8894-1148fa1c369b.png)

Để ý là khi dùng `group by` thì giá trị đầu và cuối của chuỗi được xác định là giá trị `val` *nhỏ nhất* và *lớn nhất*. Ví dụ, với `grp = 0` thì chuỗi sẽ là `1-3`. Dễ hiểu phải không nào?

## SQL scripts

Giờ chúng ta sẽ dùng các scripts dưới đây để test trong MySQL.

```sql
create table Tabibitosan as
	  select 1 as val from dual union all
	  select 2 from dual union all
	  select 3 from dual union all
	  select 5 from dual union all
	  select 6 from dual union all
	  select 7 from dual union all
	  select 10 from dual union all
	  select 11 from dual union all
	  select 12 from dual union all
	  select 20 from dual union all
	  select 21 from dual;
```

```sql
select val
      ,row_number() over (order by val) as rn
      ,val - row_number() over (order by val) as grp
from Tabibitosan
order by val;
```

```sql
select min(val) as range_start
      ,max(val) as range_end
      ,count(*) as range_count
from (
			-- Đây là câu query để thêm 2 cột rn và grp ở trên
			-- Start query
      select val
            ,row_number() over (order by val) as rn
            ,val - row_number() over (order by val) as grp
      from Tabibitosan
			-- End query
     ) as t1
group by grp
order by 1;
```

# Challenge

## Đề bài HackerRank

- Link câu hỏi: [https://www.hackerrank.com/challenges/sql-projects/problem](https://www.hackerrank.com/challenges/sql-projects/problem?isFullScreen=true)
- Bạn hãy chú ý vào từ mà tôi gạch chân ở hình dưới. Đây là những keywords của câu hỏi.

![Đây là toàn bộ đề bài HackerRank. Hãy chú ý vào những từ mà tôi gạch chân](https://images.viblo.asia/9b66f7a0-3b4c-4a90-a804-4e7c5c3d7157.png)

Đây là toàn bộ đề bài HackerRank. Hãy chú ý vào những từ mà tôi gạch chân

## Phân tích câu hỏi

- Input: 1 bảng `Projects` có 3 cột `Task_ID` (integer), `Start_Date` (date) và `End_Date` (date).
- Output: Ngày bắt đầu và kết thúc của tất cả project, sắp xếp theo thời gian hoàn thành project tăng dần và ngày bắt đầu project giảm dần. Hay chúng ta có thể hiểu là *ngày bắt đầu và kết thúc của các chuỗi ngày liên tiếp nhau*.
- *"It is guaranteed that the difference between the End_Date and the Start_Date is equal to 1 day for each row in the table."* ⇒ Mỗi dòng sẽ có `Start_Date - End_Date = 1`.

Input là bảng `Projects` có 3 cột.

![Input là bảng `Projects` có 3 cột](https://images.viblo.asia/ed201b58-02b9-49ed-a519-3a50b653cdc5.png)

Kết quả trước khi sắp xếp.

![Kết quả trước khi sắp xếp](https://images.viblo.asia/6e815696-518d-4bf5-955b-88177931e490.png)

Kết quả sau khi sắp xếp theo thời gian hoàn thành project tăng dần và ngày bắt đầu giảm dần.

![Kết qủa sau khi sắp xếp theo  thời gian hoàn thành project tăng dần và ngày bắt đầu giảm dần](https://images.viblo.asia/ced73452-f848-4344-8a53-ac5c0ac0530f.png)

## Lời giải

### Cách giải 1 áp dụng kỹ thuật Tobibitosan

Vì mỗi dòng sẽ có `Start_Date - End_Date = 1` nên chúng ta chỉ cần dùng tới cột `Start_Date` và bỏ qua cột `End_Date`. Chúng ta sẽ lặp lại các bước như ở bài toán ví dụ.

Tạo 1 bảng mới từ bảng Projects có 3 cột là `Start_Date`, `rn` (số thự tự) và cột `grp` (= `Start_Date` - `rn`)

![Tạo 1 bảng mới từ bảng Projects có 3 cột là `Start_Date`, `rn` (số thự tự) và cột `grp` (= `Start_Date` - `rn`)](https://images.viblo.asia/9e17138d-3541-4e0c-9792-d55d77f60ee9.png)

Nhóm các dòng có cùng grp, `Start_Date` là giá trị nhỏ nhất, còn `End_Date` sẽ là giá trị lớn nhất + 1 ngày.

![Nhóm các dòng có cùng grp, Start_Date là giá trị nhỏ nhất, còn End_Date sẽ là giá trị lớn nhất + 1 ngày.](https://images.viblo.asia/214d29a3-e71f-41b1-b65f-437c4db67724.png)

Bỏ cột `range_count`, sắp xếp theo thời gian hoàn thành project tăng dần và ngày bắt đầu project giảm dần.

![Bỏ cột range_count, sắp xếp theo thời gian hoàn thành project tăng dần và ngày bắt đầu project giảm dần.](https://images.viblo.asia/5f6500e7-7c71-46d5-89c7-8fd0f1f7793d.png)

```sql
create table if not exists ProjectS (
    id int not null auto_increment,
    Start_Date date not null,
    End_Date date not null,
    primary key (id)
);

insert into ProjectS (Start_Date, End_Date) values 
		("2015-10-01", "2015-10-02")
		,("2015-10-02", "2015-10-03")
		,("2015-10-03", "2015-10-04")
		,("2015-10-13", "2015-10-14")
		,("2015-10-14", "2015-10-15")
		,("2015-10-28", "2015-10-30")
		,("2015-10-30", "2015-10-31");
```

```sql
select 
   	Start_Date
    ,id as rn -- Chúng ta đã có sẵn cột số thứ tự là id
    ,Start_Date - row_number() over (order by Start_Date) as grp
from Projects;
```

```sql
select 
		min(Start_Date) as range_start
    ,date_add(max(Start_Date), interval 1 day) as range_end
		,count(*) as range_count
from (
		-- Phần query tạo bảng chứa 3 cột (Start_Date, rn và grp)
		-- Start query
    select Start_Date
          ,row_number() over (order by Start_Date) as rn
          ,Start_Date - row_number() over (order by Start_Date) as grp
    from Project
		-- End query
) as t1
group by
    grp;
```

```sql
select 
		min(Start_Date) as range_start
    ,date_add(max(Start_Date), interval 1 day) as range_end
from (
		-- Phần query tạo bảng chứa 3 cột (Start_Date, rn và grp)
		-- Start query
    select Start_Date
          ,row_number() over (order by Start_Date) as rn
          ,Start_Date - row_number() over (order by Start_Date) as grp
    from Project
		-- End query
) as t1
group by
    grp
-- Sắp xếp theo thời gian hoàn thành project tăng dần và ngày bắt đầu project giảm dần
order by 
    count(*)
    ,range_start;
```

### Cách giải 2

Đây là cách lúc đầu tôi tiếp cận, ý tưởng ban đầu là tạo ra 2 bảng `t1` và `t2` từ bảng `Projects` lần lượt chứa các giá trị `Start_Date` và `End_Date` thoả mãn đề bài, rồi tìm cách join 2 bảng đó lại với nhau và lọc ra kết quả đúng.

Các bước thực hiện sẽ như sau:

- Tạo ra bảng `t1` có 1 cột chứa các giá trị `Start_Date` và bảng `t2` có 1 cột chứa các giá trị `End_Date` cần tìm
- Dùng cross join để liên kết 2 bảng này với nhau
- Lọc bỏ các giá trị không thoả mãn bằng `where`
- Nhóm các giá trị trùng với `group by`
- Cuối cùng, sắp xếp data bằng `order by`.

```sql
select
		Start_Date, min(End_Date) as End_Date
from
		-- tạo bảng t1 có 1 cột chứa các giá trị Start_Date
		(select Start_Date from Projects where Start_Date not in (select End_Date from Projects)) t1,
		-- tạo bảng t2 có 1 cột chứa các giá trị End_Date 	
		(select End_Date from Projects where End_Date not in (select Start_Date from Projects)) t2
-- Bỏ các giá trị không hợp lệ
where
		Start_Date < End_Date
-- Nhóm các giá trị trùng bằng group by
group by
		Start_Date
order by
		-- Sắp xếp theo khoảng cách giữa ngày bắt đầu và ngày kết thúc giảm dần
		DATEDIFF(Start_Date, min(End_Date)) desc,
		-- Sắp xếp theo ngày bắt đầu tăng dần
		Start_Date;
```

# Tổng kết

Wow, chỉ với một câu HackerRank tôi nghĩ mình đã học được kha khá kiến thức về SQL từ `select`, `join`, `subquery`, `where`, tới `group by`, `order by` và cả kỹ thuật xác định các phạm vi giá trị tuần tự có cái tên tiếng Nhật rất vui tai là Tabibitosan.

# Tham khảo

- [https://community.oracle.com/tech/developers/discussion/4417554/pl-sql-101-grouping-sequence-ranges-tabibitosan-method](https://community.oracle.com/tech/developers/discussion/4417554/pl-sql-101-grouping-sequence-ranges-tabibitosan-method)