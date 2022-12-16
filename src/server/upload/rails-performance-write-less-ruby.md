***"Đoạn code tốt nhất là đoạn code không tồn tại"***

Thế nên muốn tối ưu Rails app của bạn thì cách tốt nhất là đừng có code. =)))
Có nghĩa là hãy thử tiếp cận vấn đề theo 1 cách khác. Để cho ra cùng một kết quả, đôi khi có rất nhiều cách khác tốt hơn, 1 trong số đó là sử dụng database.

### **Why?**

Bởi vì Ruby rất tệ trong việc xử lí dữ liệu với số lượng lớn. Phải nói là cực kì tệ. Ruby chưa bao giờ được đánh giá cao về mặt hiệu năng của nó.
Có 1 điều nên nhớ rằng. Ruby cực kì tốn bộ nhớ. 

Ví dụ để làm việc với 1GB dữ liệu, bạn cần tới 3GB  bộ nhớ hoặc thậm chí là nhiều hơn. Sẽ mất tới vài chục giây để xử lí dữ liệu rác. Trong khi một database tốt có thể xử lí tương tự trong vòng 1 giây.

Chúng ta sẽ cùng đi qua một vài ví dụ để chứng minh điều này

### **1. Attribute Preloading**

Giả sử chúng ta đang xây dựng một ứng dụng **TODO** bao gồm các **tasks**.
Mỗi task có thể được gắn thẻ bằng 1 hoặc 1 số **tags**. 

```
Tasks
 :id
 :name

Tags
 :id
 :name

Tasks_Tags
 :tag_id
 :task_id
```

Để lấy ra các **tasks** và các **tags** của nó, chúng ta sẽ cần:

```
tasks = Task.include(:tags).all
    > 0.058 sec
```

Trông rất đẹp phải không? Nhưng vấn đề ở đây là đoạn code này sẽ thực hiện tạo ra một đối tượng cho mỗi **tag**. Điều này gây ra tốn bộ nhớ. Giải pháp thay thế là preload trong database

```
tasks = Task.select <<-SQL
      *,
      array(
        select tags.name from tags inner join tasks_tags on (tags.id = tasks_tags.tag_id)
        where tasks_tags.task_id=tasks.id
      ) as tag_names
    SQL
    > 0.018 sec
```
Đoạn query này chỉ yêu cầu bộ nhớ để lưu thêm 1 cột bao gồm các 1 mảng các **tags**. Và không có gì ngạc nhiên khi nó nhanh hơn 3 lần. :D

### **2. Data Aggregation**

Giả sử chúng ta có một bộ dữ liệu với nhân viên (**employees**), bộ phận (**departments**)  và tiền lương (**salaries**) và muốn tính thứ hạng của nhân viên trong một bộ phận theo mức lương.
```
SELECT * FROM empsalary;

  depname  | empno | salary
-----------+-------+-------
 develop   |     6 |   6000
 develop   |     7 |   4500
 develop   |     5 |   4200
 personnel |     2 |   3900
 personnel |     4 |   3500
 sales     |     1 |   5000
 sales     |     3 |   4800
```

Với ruby; 
```
salaries = Empsalary.all
salaries.sort_by! { |s| [s.depname, s.salary] }
key, counter = nil, nil
salaries.each do |s|
 if s.depname != key
  key, counter = s.depname, 0
 end
 counter += 1
 s.rank = counter
end
```

Với 100k records, kết quả được trả về sau 4.05 giây.

Truy vấn mysql thực hiện nhanh gấp 4 lần:
```
SELECT depname, empno, salary, rank()
OVER (PARTITION BY depname ORDER BY salary DESC)
FROM empsalary;

  depname  | empno | salary | rank 
-----------+-------+--------+------
 develop   |     6 |   6000 |    1
 develop   |     7 |   4500 |    2
 develop   |     5 |   4200 |    3
 personnel |     2 |   3900 |    1
 personnel |     4 |   3500 |    2
 sales     |     1 |   5000 |    1
 sales     |     3 |   4800 |    2
```

Con số sẽ không chỉ dừng lại ở 4 lần. Mình từng test với 600k dữ liệu, ruby tốn 1GB bộ nhớ và trả về kết quả sau 90s. Truy vấn SQL tương đương hoàn thành trong 5s.

Ruby là 1 ngôn ngữ tuyệt vời và cực kì dễ sử dụng, Tuy nhiên hãy sử dụng một cách khôn khéo nhé, đôi khi chính nó sẽ làm giảm performance ứng dụng của bạn đi rất nhiều :D