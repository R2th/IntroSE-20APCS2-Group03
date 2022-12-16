### Bài toán userflow trong analytic.
- Một vấn đề khá đơn giản là làm thế nào vẽ được đi của user trong trang web của bạn, tất cả dữ liệu mình lưu vào bảng:
````
'time', 
'session_id', // trong session nào 
'page_id', // page di chuyển là page gì 
'page_ord', // page thứ mấy trong session
'start_time', // thời gian bắt đầu vào page
'end_time', // thời gian ra khỏi page
'page_referer_id',
'next_page_id'
````
![](https://images.viblo.asia/9f14c8ef-6617-488b-bd59-bfe5536b60ad.png)

- Câu hỏi đặt ra là làm thế nào để query tạo nên các step pageview như trên :#) 

### Giải quyết:
- Tại mỗi step chúng ta tìm các page có vị trí thứ **n** trong session, bằng cách dùng window function, chúng ta tìm ra được với page hiện tại thì page tiếp theo là gì:
````
select * from (
	select sp.time,
          sp.session_id,
          page.page_url,
          sp.page_ord,
          lead(page_url) over (partition by sp.session_id order by sp.time asc) as next_page,
          lag(page_url) over (partition by sp.session_id order by sp.time asc) as prev_page,
          lead(page_ord) over (partition by sp.session_id order by sp.time asc) as next_ord

   from "session_page" as "sp"
   inner join "page" on "page"."id" = "sp"."page_id"
   and time >= '2019-04-22 00:00:00'
   order by "time" asc
   
 ) as sub where prev_page = '/2019/01/05/go-by-example-range/' and page_ord = 2;
````

![](https://images.viblo.asia/5d9d2525-fe5e-4d4b-a6c5-d25f83e16740.png)

- Với mỗi page tìm ra được, chúng ta query tính toán số lượng các visit tới page tiếp theo:
````
-- query event flow sub 

select count(distinct(session_id)), next_page from (
	select sp.time,
          sp.session_id,
          page.page_url,
          sp.page_ord,
          lead(page_url) over (partition by sp.session_id order by sp.time asc) as next_page,
          lead(page_ord) over (partition by sp.session_id order by sp.time asc) as next_ord

   from "session_page" as "sp"
   inner join "page" on "page"."id" = "sp"."page_id"
   and time >= '2019-04-22 00:00:00'
   order by "time" asc
   
 ) as sub where page_url = '/2019/01/05/go-by-example-range/' and page_ord = 1 group by next_page;
````
- Bằng cách này mình biết được bao nhiêu visit đã đến page tiếp theo :
![](https://images.viblo.asia/33f4c7d1-77b5-43f3-a09b-efe1bf7100b4.png)

### Quá đơn giản và hiệu quả với window function, happy coding :grin::grin::grin: