**Thứ tự thưc hiện các mệnh đề của 1 câu truy vấn SQL** xác định thứ tự mệnh đề sẽ được thực hiện của câu SQL đó. Một số vấn đề phổ biến nhất khi truy vấn có thể dễ dàng tránh được với sự hiểu biết rõ ràng hơn về thứ tự thực thi SQL, đôi khi được gọi là thứ tự các hoạt động. Hiểu thứ tự truy vấn có thể giúp bạn chuẩn đoán tại sao một truy vấn sẽ không chạy và thậm chí thường xuyên giúp bạn tối ưu hóa các truy vấn của mình và khiến các câu truy vấn chạy nhanh hơn.

Trong thế giới hiện đại ngày nay, các chuyên gia truy vấn SQL có thể thực hiện tất cả các loại thủ thuật để làm cho các truy vấn chạy hiệu quả hơn, nhưng chúng phải luôn đạt được cùng một câu trả lời cuối cùng như một truy vấn được thực hiện theo thứ tự thực hiện tiêu chuẩn. Thứ tự này là:

![](https://images.viblo.asia/2b027423-b73f-4c73-9bb7-4d741bda7672.png)


### Mệnh đề FROM

Mệnh đề FROM có nhiệm vụ chọn và `joins` các bảng và là phần được thực hiện đầu tiên của truy vấn. Điều này có nghĩa là trong các truy vấn với `FROM` thì  `FROM` là mệnh đề đầu tiên được thực hiện.

Đây là một cách tốt để giới hạn hoặc tổng hợp các bảng, điều này có thể rất tốn bộ nhớ. Nhiều lập trình viên sử dụng logic và các loại liên kết khác nhau để giúp tối ưu hóa cho các truy vấn khác nhau, điều này có thể hữu ích nhưng không nên quá phụ thuộc vào.

Trong một trường hợp như dưới đây, người dùng SQL có thể biết để lọc `pings` trước. Điều đó về mặt kỹ thuật sẽ vi phạm trật tự, nhưng sẽ trả về kết quả chính xác.

```
select
 count(*)
from
 pings
join
 signups
on
 pings.cookie = signups.cookie
where
 pings.url ilike '%/blog%'
```

Tuy nhiên, nếu bạn định sử dụng các cột theo cách ngăn lọc trước, cơ sở dữ liệu sẽ phải sắp xếp và `joins` cả hai bảng đầy đủ. Ví dụ: truy vấn sau đây yêu cầu một cột từ mỗi bảng và sẽ bị buộc phải `joins` trước khi bất kỳ quá trình lọc nào diễn ra.

```
select
 count(*)
from
 first_names
join last_names
 on first_names.id = last_names.id
where
 first_names.name || last_names.name ilike '%a%'
```

Để tăng tốc truy vấn, bạn có thể lọc trước các tên có "a" trong đó:

```
with limited_first_names as (
 select
   *
 from
   first_names
 where
   name ilike '%a%'
)
, limited_last_names as (
  select
    *
  from
    last_names
  where
     name ilike '%a%'
)
select
 count(*)
from
 limited_first_names
join
 limited_last_names
on
 limited_last_names.id = limited_first_names.id
```

### Mệnh đề WHERE

`Mệnh đề WHERE` được sử dụng để giới hạn dữ liệu được nối bởi các giá trị trong các cột trong bảng. Điều này có thể được sử dụng với bất kỳ loại dữ liệu, bao gồm số, chuỗi hoặc ngày.

```
where nmbr > 5;
where strng = 'Skywalker';
where dte = '2017-01-01';
```

Một sai lầm thường xuyên mắc phải khi mới tiếp xúc với SQL là cố gắng sử dụng mệnh đề WHERE để lọc các tập hợp, điều này sẽ vi phạm các quy tắc về thứ tự thực hiện của SQL. Điều này là bởi vì khi mệnh đề WHERE được thực hiện, thì mệnh đề GROUP BY vẫn chưa được thực hiện và các giá trị tổng hợp không xác định. Do đó, truy vấn sau sẽ thất bại:

```
select
 country
, sum(area)
from
 countries
where
 sum(area) > 1000
group by
 1
```

Nhưng nó có thể được giải quyết bằng cách sử dụng `HAVING`

### Mệnh đề GROUP BY

`Mệnh đề GROUP BY` thu gọn các trường của kết quả được đặt thành các giá trị riêng biệt của chúng. Điều khoản này được sử dụng với các tập hợp như `sum()` hoặc `count()` để hiển thị một giá trị cho mỗi trường được nhóm hoặc kết hợp các trường. 

Khi sử dụng GROUP BY X có nghĩa là đặt tất cả những bản ghi có cùng giá trị cho X vào cùng một row. 

GROUP BY X Y có nghĩa là đặt tất cả những bản ghi có cùng giá trị cho X và Y vào cùng một row. 

### Mệnh đề HAVING

`Mệnh đề HAVING` được sử dụng trong SQL để thực hiện chức năng tương tự như mệnh đề WHERE, nhưng với các giá trị tổng hợp. Vì vậy, trong khi truy vấn cuối cùng ở trên khi sử dụng WHERE thì thất bại nhưng với HAVING thì perfect:

```
select
  country
  , sum(area)
from
  countries
group by
  1
having
  sum(area) > 100000
```

### Mệnh đề SELECT

`Mệnh đề SELECT` là nơi cuối cùng bạn chỉ định các giá trị và tập hợp còn lại trong tập dữ liệu sau khi nhóm và cắt tỉa đã xảy ra. Việc thực thi sẽ gần như hoàn tất tại thời điểm này, chỉ còn lại các lệnh và giới hạn để chỉ định.

### Mệnh đề ORDER BY

`Mệnh đề ORDER BY` được sử dụng để trả về bảng được sắp xếp theo một cột hoặc lựa chọn các cột. Bạn có thể dùng mệnh đề `asc` và `desc` để xác định xem bạn muốn một thứ tự từ thấp đến cao hay cao đến thấp. Các truy vấn sau đây sẽ liệt kê các quốc gia từ lớn nhất đến nhỏ nhất.

```
select
  country  
  , area
from  
  country_data
order by 
  2 desc
```

### Mệnh đề LIMIT

`Mệnh đề LIMIT` sẽ cho phép bạn chỉ định số lượng hàng bạn muốn trả lại. Điều này thường được sử dụng để tăng tốc công việc và tránh trả lại một lượng lớn dữ liệu. Nó cũng có thể được sử dụng kết hợp với mệnh đề ORDER BY để tìm "N hàng đầu" của một cột. Chẳng hạn, chúng ta có thể tìm thấy 10 quốc gia lớn nhất với truy vấn như:

```
select
  country
  , area
from
  country_data
order by
  2 desc
limit 
  10
```