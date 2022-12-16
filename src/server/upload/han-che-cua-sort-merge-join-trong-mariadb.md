Src: https://www.spinellis.gr/blog/20180805/
https://www.reddit.com/r/programming/comments/94r6w6/how_i_slashed_a_sql_query_runtime_from_380_hours/


-----


**Tôi đã cắt giảm thời gian truy vấn một câu lệnh SQL từ 380 giờ xuống 12 giờ với chỉ 2 câu lệnh Unix**

Tôi đã cố chạy một câu lệnh JOIN đơn giản trên MariaDB (MySQL) và tốc độ của nó chậm cực kỳ. Dưới đây là cách tôi cắt giảm nó xuống từ 380 giờ xuống còn chỉ 12 giờ bằng cách xử lý từng phần của nó bằng 2 lệnh câu lệnh Unix đơn giản.

Bên dưới là câu truy vấn, cấu trúc của DB tôi sử dụng là 1 phần nhỏ của 1 cái DB phức tạp hơn của [GHTorrent](https://www.dmst.aueb.gr/dds/pubs/conf/2012-MSR-GitHub/html/github-mirror.html)


![](https://www2.dmst.aueb.gr/dds/pubs/conf/2012-MSR-GitHub/html/gtschema.png)

```sql
select distinct
  project_commits.project_id,
  date_format(created_at, '%x%v1') as week_commit
  from project_commits
  left join commits
  on project_commits.commit_id = commits.id;
```

Những trường tham gia vào lệnh JOIN đều được đánh index. Tuy nhiên MariaDB thực hiện phép JOIN bằng cách full scan bảng project_commits và index lookup trên bảng commits. Điều này có thể thấy khi ta nhìn vào output của hàm EXPLAIN

```
+------+-------------+-----------------+--------+---------------+---------+
| id   | select_type | table           | type   | possible_keys | key     |
+------+-------------+-----------------+--------+---------------+---------+
|    1 | SIMPLE      | project_commits | ALL    | NULL          | NULL    |
|    1 | SIMPLE      | commits         | eq_ref | PRIMARY       | PRIMARY |
+------+-------------+-----------------+--------+---------------+---------+

+---------+-------------------------------------+------------+-----------------+
| key_len | ref                                 | rows       | Extra           |
+---------+-------------------------------------+------------+-----------------+
| NULL    | NULL                                | 5417294109 | Using temporary |
| 4       | ghtorrent.project_commits.commit_id |          1 |                 |
+---------+-------------------------------------+------------+-----------------+
```

Kích thước của hai bảng là tương đối lớn: project_commits chứa 5 tỷ rows và commits 847 triệu rows. Kích thước bộ nhớ của server tương đối nhỏ (16GB). Có thể là các công cụ index loopup đã đọc từ đĩa cứng (tệ hơn nữa lại là đĩa từ tính), và do đó hiệu năng rất tệ. Theo output của [pmonitor](https://github.com/dspinellis/pmonitor/) chạy trên bảng tạm thời được tạo ra, truy vấn, mà tại thời điểm đó đã chạy hơn nửa ngày, sẽ mất thêm 373 giờ để hoàn thành.

```
/home/mysql/ghtorrent/project_commits#P#p0.MYD 6.68% ETA 373:38:11 
```

Đối với tôi điều này dường như quá mức, bởi vì các yêu cầu về thời gian I/O cho một [sort-merge join](https://en.wikipedia.org/wiki/Sort-merge_join) là các đơn đặt hàng có độ lớn thấp hơn thời gian thực hiện dự kiến. (Từ một câu trả lời trên [dba.stackexchange.com](https://dba.stackexchange.com/questions/213983/can-i-speed-up-a-large-mysql-mariadb-join-through-partitioning-or-merging), tôi nhận được rất nhiều phương pháp để thử, nhưng tôi chẳng tin cái nào có hiệu quả hết. Tôi đã thử  làm theo đề xuất đầu tiên, nhưng kết quả không hứa hẹn, dễ dàng mất ít nhất nửa ngày. Vì vậy tôi tiến hành theo cách mà tôi tin sẽ hoạt động hiệu quả và đáng tin cậy!

Tôi đã xuất hai bảng này thành các files, nối chúng với lệnh JOIN Unix, rồi UNIQ kết quả để loại bỏ các hàng trùng lặp và nhập kết quả trở lại vào cơ sở dữ liệu. Quá trình bắt đầu lúc 20:41 lúc import (bao gồm cả thời gian build index) đã kết thúc vào 9:53 ngày hôm sau. Dưới đây là chính xác các bước mà tôi đã thực hiện.

# 1. Xuất các bảng cơ sở dữ liệu dưới dạng các text file

Đầu tiên tôi xuất các trường của hai bảng mà tôi muốn JOIN. Để đảm bảo thứ tự sắp xếp tương thích với thứ tự được sử dụng bởi các công cụ Unix, tôi CAST trường này thành kiểu dữ liệu CHAR

Tôi đã lưu đầu ra của truy vấn SQL sau vào tệp commits_week.txt:

```
select cast ( id as char ) as cid, date_format(created_at, '%x%v1' ) as week_commit from commits order by cid; 
```

Tôi cũng đã lưu đầu ra của truy vấn SQL sau vào tệp project_commits.txt:

```
select cast (commit_id as char ) as cid, project_id from project_commits order by cid; 
```

Các tệp sau được tạo ra.

```
-rw-r--r-- 1 dds dds 15G Aug 4 21:09 commits_week.txt 
-rw-r--r-- 1 dds dds 93G Aug 5 00:36 project_commits.txt
``` 

Lưu ý, tôi chạy mysql client với tùy chọn --quick để tránh hết bộ nhớ khi client cố thu thập tất cả các kết quả trước khi xuất ra chúng.

# 2. Xử lý các tệp bằng các công cụ dòng lệnh Unix

Thứ hai, tôi JOIN hai tệp văn bản bằng bằng lệnh JOIN Unix. Lệnh này quét tuyến tính thông qua cả hai tập tin và kết hợp các records có trường đầu tiên phù hợp. Khi các tập tin đã được sắp xếp, điều này có thể được thực hiện rất hiệu quả: với tốc độ I/O. Tôi cũng piped output của lệnh JOIN vào UNIQ để loại bỏ các bản ghi trùng lặp. Điều này tương tự SQL distinct trong truy vấn ban đầu. Một lần nữa, trên đầu ra đã được sắp xếp, lệnh này có thể được thực hiện thông qua quét tuyến tính đơn giản.

join commits_week.txt project_commits.txt | uniq >joined_commits.txt

Sau khi xử lý, chỉ mất một giờ, tôi đã có kết quả mong muốn trong một tập tin.

```
-rw-r--r-- 1 dds dds 133G Aug 5 01:40 joined_commits.txt 
```
# 3. Nhập tệp văn bản trở lại cơ sở dữ liệu
Cuối cùng, tôi nhập tệp văn bản trên trở lại vào cơ sở dữ liệu dưới dạng bảng.
```
create table half_life.week_commits_all ( project_id INT ( 11 ) not null , week_commit CHAR ( 7 )) ENGINE=MyISAM; load data local infile 'joined_commits.txt' into table half_life.week_commits_all fields terminated by ' ' ; 
```
# Kết luận
Lý tưởng nhất, MariaDB nên hỗ trợ sort-merge joins và trình tối ưu hóa của nó nên sử dụng chúng khi thời gian chạy của các phương pháp thay thế được dự báo là quá lâu. Cho đến lúc đó, việc sử dụng các lệnh shell của Unix được thiết kế vào những năm 1970 có thể mang lại hiệu qủa đáng kinh ngạc.

## 4.1 Câu trả lời được nhiều vote nhất trên dba.stackexchange.com

Link: https://dba.stackexchange.com/questions/213983/can-i-speed-up-a-large-mysql-mariadb-join-through-partitioning-or-merging

Từ output của lệnh EXPLAIN bạn đang làm một `full table scan` trên bảng project_commits
Từ truy vấn, tôi phỏng đoán có một quan hệ one-to-many từ commits đến project_commits. Vấn đề là trong truy vấn của bạn lại sử dụng như là many-to-one. Bạn cũng dùng `LEFT JOIN`

Truy vấn của bạn thì nói là:
> Lấy tất cả các project_commits được liên kết hoặc KHÔNG với commits

Thay vào đó, bạn lại muốn:
> Lấy tất cả các project_commits được liên kết với commits
 
**SUGGESTION #1 : Flip Table Order**
```
EXPLAIN select distinct
    project_commits.project_id,
    date_format(created_at, '%x%v1') as week_commit
    from commits
    left join project_commits
    on commits.id = project_commits.commit_id;
```
**SUGGESTION #2 : Use INNER JOIN**
```
EXPLAIN select distinct
    project_commits.project_id,
    date_format(created_at, '%x%v1') as week_commit
    from project_commits
    inner join commits
    on project_commits.commit_id = commits.id;
```
**SUGGESTION #3 : Add created_at index**

Nếu bạn đã đánh index cho created_at rồi, hoặc có một compound index mà first column của nó là created_at thì bỏ quả
```
ALTER TABLE `project_commits` ADD INDEX created_at_ndx (`created_at`);
```
**SUGGESTION #4 : Alter the JOIN behavior**

Thay đổi cách JOIN bằng cách tweek tối ưu hóa
```
mysql> SET optimizer_switch='mrr=on,mrr_cost_based=off,batched_key_access=on';
```

Lưu ý: Tôi không biết nên mong đợi gì từ các đề xuất của tôi. Sau khi tất cả thì, LEFT JOIN của bạn giống như một Cartesian Join với tiềm năng tạo ra một bảng tạm thời như sau:

```
4,573 nghìn tỷ hàng (5,4 tỷ X 0,847 tỷ) đang được tra cứu
```

Thử đi và cho chúng tôi biết những gì bạn tìm thấy.

## 4.2 Thảo luận trên reddit

> Vấn đề chính với SQL của bạn là
> ```
> distinct date_format(created_at, '%x%v1') as week_commit
> ```
> Nó phải tạo ra hàng tỷ tỷ rows trước khi nó có thể tính toán các tuần.

> Tạo một cột có tên là week_commit và một trigger để điền vào nó khi created_at được ghi.

> Hoặc chỉ cần tạo week_commit như một cột ảo và đánh index

> Cunningham's Law states "the best way to get the right answer on the internet is not to ask a question; it's to post the wrong answer."

> Nhiều bạn đang tập trung vào cost của date_format(created_at, '%x%v1') và distinct trong truy vấn. Tớ viết một câu truy vấn khác mà không dùng cả hai
> ```
> select project_commits.project_id, created_at
> from project_commits
> left join commits
> on project_commits.commit_id = commits.id;
> ```
> Tớ chạy nó mấy tiếng trước rồi. Có vẻ sẽ mất hàng trăm tiếng nữa mới xong
> 
> ```
> /home/mysql/ghtorrent/project_commits#P#p0.MYD  0.57% ETA 377:42:41
> /home/mysql/ghtorrent/project_commits#P#p0.MYD  0.58% ETA 341:19:51
> /home/mysql/ghtorrent/project_commits#P#p0.MYD  0.59% ETA 320:10:08
> /home/mysql/ghtorrent/project_commits#P#p0.MYD  0.60% ETA 333:04:10
> /home/mysql/ghtorrent/project_commits#P#p0.MYD  0.61% ETA 324:45:35
> ```

> Đây là một ví dụ hoàn hảo vì sao mà
> 
> Trang DBAs vẫn tồn tại
> OP: Ideally, MariaDB should support sort-merge joins
> 
> Lựa chọn một hệ cơ sở dữ liệu đúng là vô cùng quan trọng
> 
> Cậu lúc nào cũng có thể contribute cách làm sort-merge cho Maria/MySQL.
> 
> Nếu truy vấn này mày thường sử dụng thì, mày có nghĩ đến việc dùng materialized views và đánh index cho week column, sau đó dùng DISTINCT cho cái view đó?