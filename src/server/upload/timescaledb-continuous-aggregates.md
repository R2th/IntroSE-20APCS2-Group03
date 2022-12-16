### Mở đầu.
- Dữ liệu theo thời gian là 1 loại dữ liệu đang ngày càng phổ biến, mỗi ngày có thể sinh ra hàng GB dữ liệu, thách thức tổ chức dữ liệu càng tăng.
- Một trong những cách giảm bớt việc query raw là  aggregates dữ liệu, ví dụ như tính trung bình, AVG, max, min, GROUP BY.
- TimescaleDB từ việc bản v1.3 đã hỗ trợ tính năng Continuous aggregates giúp cho việc đó dễ dàng chưa từng có.
### Continuous Aggregates
- Nó là gì vậy ?
- Continuous aggregates giống như  **materialized views**, nhưng không cần phải tính toán bằng tay mà view này sẽ tự động refresh trong background ngay khi dữ liệu mới được thêm vào hoặc dữ liệu cũ được update.
- Cấu trúc ?

1) A materialization hypertable: dùng để lưu trữ aggregated data.
2) materialization engine: aggregate data từ raw dữ liệu tới materialization table.
3) An invalidation engine: xác định khi nào cần tính toán để chạy aggregate nhờ vào INSERTs, UPDATEs, or DELETEs.
4) A query engine: dùng để query aggregated data.

- Cú pháp ư, very easy :#):
*Tạo bảng*
```
CREATE TABLE device_readings (
      observation_time  TIMESTAMPTZ       NOT NULL,
      device_id         TEXT              NOT NULL,
      metric            DOUBLE PRECISION  NOT NULL,
      PRIMARY KEY(observation_time, device_id)
);
SELECT create_hypertable('device_readings', 'observation_time');
```
*Create Aggre*:
```
CREATE VIEW device_summary
WITH (timescaledb.continuous) --This flag is what makes the view continuous
AS
SELECT
  time_bucket('1 hour', observation_time) as bucket, --time_bucket is required
  device_id,
  avg(metric) as metric_avg, --We can use any parallelizable aggregate
  max(metric)-min(metric) as metric_spread --We can also use expressions on aggregates and constants
FROM
  device_readings
GROUP BY bucket, device_id; --We have to group by the bucket column, but can also add other group-by columns
```
- Vậy làm sao nó tự động chạy background được vậy ta, để ý hàm time_bucket với tham số thứ 1, view này sẽ tự động refresh 1h 1 lần, very impressive, quá đơn giản.
- Muốn dùng view này ư, chẳng có gì khác việc query bình thường 1 view của postgres cả:
```
SELECT * FROM device_summary
WHERE device_id = 'D132'
  AND bucket >= '2018-01-01' AND bucket < '2018-04-01';
```
hoặc
```
SELECT * FROM device_summary
WHERE metric_spread > 1800
  AND bucket >= '2018-01-01' AND bucket < '2018-04-01'
ORDER BY bucket DESC, device_id DESC LIMIT 20;
```

- Một câu hỏi đặt ra, nó tính thời gian thế nào ??? ,  tất cả là dựa vào cặp `refresh_lag + bucket_width`
- Ví dụ nếu refresh_lag là 1 hour, bucket_width là 1 hour, materialization thông thường sẽ là 2 hour trước giá trị insert mới nhất.

![](https://images.viblo.asia/3d2d2316-4ddf-4d54-8fbd-64dc36694a28.png)

- Thay thế và hoặc drop view đi thì thế nào nhỉ:
```
ALTER VIEW device_summary SET (timescaledb.refresh_interval = '10 min');
```
```
DROP VIEW device_summary CASCADE;
```

- Continuous aggregates làm việc với các hàm nào nhỉ, list phát nào:
```
avg, 
bit_and,
bit_or, 
bool_and,
bool_or,
corr,
count,
covar_pop,
covar_samp,
every,
first,
histogram
last,
max,
min,
regr_avgx,
regr_avgy,
regr_count,
regr_intercept,
regr_r2,
regr_slope,
regr_sxx,
regr_sxy,
regr_syy,
stddev,
stddev_pop,
stddev_samp,
sum,
variance,
var_pop,
var_samp,
```

Còn chần chừ gì mà không thử 1 phát các bạn nhỉ :D