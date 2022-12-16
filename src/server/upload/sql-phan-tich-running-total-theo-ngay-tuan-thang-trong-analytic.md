### Hoàn cảnh.
- Trong analytic của google có 1 chart cho chúng ta thấy chuỗi dữ liệu của user theo ngày, tuần, tháng chỉ trong 1 chart, gọi là chart trending active user 
![](https://images.viblo.asia/57cfb849-a1c3-42f8-80eb-3f2ef96fcdb9.png)
- Bài toán đặt ra là làm thế nào có thể query được 1 lúc ra tất cả các dữ liệu group by theo ngày nhưng cũng phân đoạn theo tuần và tháng.
### Giải quyết
- Chúng ta sẽ nghĩ ngay đến window function, nhưng làm thế nào để reset dữ liệu sau mỗi tuần hay mỗi tháng, đầu tiên chúng ta trích xuất dữ liệu từ dựa trên window function:
````
select date,
				extract('week' from date) as week,
				LAG(extract('week' from date), 1) over (order by date) as prev_week,
				extract('month' from date) as month,
				LAG(extract('month' from date), 1) over (order by date) as prev_month,
				SUM(pageview) OVER (order by date) as pageview_total,
				pageview
				from (select time_bucket_gapfill('1 day', session.time, '2019-04-07', '2019-05-07') AS date,
			                COALESCE(SUM(num_pageview), 0) as pageview
			              from session group by date) s;
````

![](https://images.viblo.asia/a83233a5-0f93-4fb2-b19e-96cfc01831ef.png)

- Việc tiếp theo là tìm các đoạn chênh lệch những đoạn giao tiếp giữa 2 tuần, hay giữa 2 tháng, ngay tại các điểm giao (week != prev_week) mình sẽ COUNT(*) để sinh ra các index mới cho tuần và tháng kế tiếp.
````
select date, week, month,
			COUNT(*) FILTER (WHERE week != prev_week) OVER (ORDER BY date) w,
			COUNT(*) FILTER (WHERE month != prev_month) OVER (ORDER BY date) m,
			pageview_total
				from (select date,
				extract('week' from date) as week,
				LAG(extract('week' from date), 1) over (order by date) as prev_week,
				extract('month' from date) as month,
				LAG(extract('month' from date), 1) over (order by date) as prev_month,
				SUM(pageview) OVER (order by date) as pageview_total,
				pageview
				from (select time_bucket_gapfill('1 day', session.time, '2019-04-07', '2019-05-07') AS date,
			                COALESCE(SUM(num_pageview), 0) as pageview
			              from session group by date) s) s1;
````
![](https://images.viblo.asia/77e7549e-e7ac-4232-8f93-d6f76f133a9c.png)

- Việc cuối cùng là dùng window function để partition các index mà của các tuần mà mình đã lọc ra từ trên, sau đó lấy pageview tại thời điểm đó trừ cho pageview cuối cùng của partition trước:

```
select date, week,
	d,
	sd - COALESCE(first_value(d_prev) OVER (PARTITION BY w ORDER BY date), 0) w,
	sd - COALESCE(first_value(d_prev) OVER (PARTITION BY m ORDER BY date), 0) m
	 from (              
	select date, week, prev_week, d,
			COUNT(*) FILTER (WHERE week != prev_week) OVER (ORDER BY date) w,
			COUNT(*) FILTER (WHERE month != prev_month) OVER (ORDER BY date) m,
			LAG(d) over (order by date) d_prev,
			sd
			from (select date,
				extract('week' from date) as week,
				LAG(extract('week' from date), 1) over (order by date) as prev_week,
				extract('month' from date) as month,
				LAG(extract('month' from date), 1) over (order by date) as prev_month,
				SUM(d) OVER (order by date) as sd,
				d
				from (select time_bucket_gapfill('1 day', session.time, '2019-04-07', '2019-05-07') AS date,
			                COALESCE(SUM(num_pageview), 0) as d
			              from session group by date) s) s1) s2;
```

Tada, và cuối cùng ta đã có kết qủa:

![](https://images.viblo.asia/58c91045-1b76-43bb-b692-f1196318207f.png)

![](https://images.viblo.asia/240064b1-704b-4d95-85c5-1eb756692cf1.png)