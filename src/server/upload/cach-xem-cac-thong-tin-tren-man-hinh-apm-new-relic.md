# Cách xem màn hình New Relic APM
Nguồn bài viết : [5: 基礎編 1: New Relic アカウントの作成からAPM 画面の見方 - New Relic を使ったアプリケーションのパフォーマンス監視入門](https://qiita.com/kumatronik/items/395e10406b3522d7f7db)


Sau khi cài đặt xong New Relic APM chúng ta sẽ có được màn hình quản lí performance overview như dưới đây, cơ bản thì nếu muốn biết performance hiện tại của app thì chỉ cần xem màn hình này là đủ. 

Nếu muốn xem kĩ hơn thông tin nào thì sẽ lọc và xem chi tiết thông tin đó.

![](https://images.viblo.asia/48e28446-fc9e-4cbf-8e11-aad4b5f30db7.png)

Màn hình cơ bản chia làm 7 mục chính như sau


1. Main chart :

Default hiển thị thời gian response trung bình của từng layer theo thời gian. 

Con số phía trên bên phải là thời gian response trung bình của khoảng thời gian đã chọn.

Trường hợp có dùng thêm cả New Relic Browser thì có thể view được cả New Relic Browser score.

Chỉ cần click vào label của tùng layer là có thể chọn hiển thị hay ẩn layer đó.

Nếu click vào "Compare with yesterday and last week" thì có thể hiển thị thời gian response trung bình của ngày hôm nay, hôm qua, tuần trước để so sánh.

2. Apdex

Là chỉ số thể hiển độ mãn nguyện của người dùng. 

Trường hợp có dùng thêm cả New Relic Browser thì có thể view được cả New Relic Browser score.

3. Throughput 

Là số lượt request trên 1 phút

4. Top 5 transaction chậm nhất

5. Error rate

6. List server đang sử dụng cho application

Nếu dùng cả New Relic Infrastructure thì có thể xem được cả lỗi của server nữa.

7. Event gần nhất

Mục quan trọng nhất là chart thể hiện response time trung bình, vì từ đó có thể hiểu được performance hiện tại của hệ thống, là thông tin rất có giá trị với việc quản lí performance.

## Cách chỉ định thời gian hiển thị thông tin



### Cách chỉ định timepicker

Default hiển thị là chart thể hiện dữ liệu trong 30 phút gần nhất.

Nếu muốn thay dổi thời gian hiển thị thì nhấn TIME PICKER phía trên bên trái màn hình, lấy Ending now là thời điểm hiện tại thì ta có thể chỉ định được khoảng muốn xem trong quá khứ.

![](https://images.viblo.asia/2921e5f6-f96c-42b9-921c-c45e47d246ec.png)

Ở Custom date thì có thể chỉ định ngày cụ thể trên lịch, để biết được thông tin trong khoảng thời gian nhất định.

Tuy nhiên nếu muốn xem thông tin performance bất thường trong 5 phút trong khoảng thời gian mặc định 30 phút thì dùng cách chỉ định timepicker này khá phiền phức, trong trường hợp đó có thể dùng cách dưới đây.

### Cách chỉ định bằng drag & drop 

Như chúng ta có thể thấy ở hình ảnh dưới đây, chỉ cần drag & drop khoảng thời gian nhất định tùy ý trên chart là có thể focus vào khoảng đó được. Cách chỉ định này có thể dùng cho tất cả chart trong hệ thống. 

![](https://images.viblo.asia/60694348-3638-403b-85be-247427052aed.gif)

Hơn nữa nếu chỉ định timepicker ở đây thì sẽ được link đến màn hiển thị thông tin cụ thể của khoảng thời gian đã chọn.

## Percentiles và Histograms

Ở đây tôi sẽ nói về cách xem chart.

Main chart hiển thị thời gian response trung bình của hệ thống, song ngoài ra ta còn có thể xem được thông tin ở dạng khác thời gian trung bình là percentile và histogram.

Chỉ cần click vào chart title là pop up thay đổi dạng hiển thị sẽ mở ra, từ đó ta có thể chọn dạng mong muốn.

![](https://images.viblo.asia/e9509bb6-91cc-46fa-931b-7dba26f5c6c5.gif)

Khi nhìn vào chart ta thấy thời gian trung bình tăng lên nhưng không rõ đó là tăng 1 cách toàn diện hay chỉ là tăng ở 1 điểm nhỏ.

Trong trường hợp như vậy chỉ cần xem percentile và histogram là có thể biết được.

## Apdex : chỉ số thể hiện độ mãn nguyện của người dùng


New Relic dùng chỉ số Apdex để đo độ mãn nguyện của người dùng.

![](https://images.viblo.asia/d7c41b79-0ee7-4fa7-b6c1-f7c9ae39b5ae.png)

Đây là chỉ số đánh giá performance của application trong 1 khoảng thời gian nhất định dựa vafp response time, thể hiện theo score từ 0 đến 1.

1 có ý nghĩa là trạng thái tất cả người dùng đều mãn nguyện.

Bằng việc xem chỉ số này ta có thể biết được độ mãn nguyện của người dùng. 

Số score lí tưởng là 0.95, để có được số score này cần thiết phải cài đặt threshold phù hợp.