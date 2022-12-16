Nguồn bài viết : [New Relic APM: トランザクショントレースとデータベースタブ（有料機能）](https://qiita.com/kumatronik/items/c1ba96d563c0445243a4)

Trong những bài viết trước tôi đã giái thích về chức năng miễn phí của APM để điều transaction. Hôm nay tôi sẽ giải thích về chức năng Pro (mất phí) để có thể điều tra transaction ở mức chi tiết hơn nữa.

# Transaction detail
Phía dưới transaction detail sẽ có list những xử lí chậm trong thời gian chỉ định. 

Ở đây xử lí lúc 16:40 là mất nhiều thời gian nhất nên chúng ta sẽ click vào đây để xem chi tiết.
![](https://images.viblo.asia/07cd7329-8278-4738-b4c0-172e2643f7e8.png)
## Transaction trace (overview)

Khi click vào đây thì pop up transaction trace sẽ được hiển thị nên ta có thể thấy được chi tiết xử lí của transaction đó.

(Ở chức năng miễn phí thì chỉ có thể xem được thông tin transaction summary ở 1 khoảng thời gian nhất định )


Dựa vào việc có thể xem được chi tiết xử lí này ta có thể xác định được chỗ có vấn đề trong hệ thống. 

Có thể nói đây là 1 điểm mạnh của New Relic APM so với các performance tool khác.
Ngoài ra nếu chọn tab Trace details thì sẽ còn xem được những thông tin chi tiết hơn nữa.
![](https://images.viblo.asia/82885462-4477-434a-bba5-b523a03028b8.png)

## Transaction trace (trace detail)

Đây là chi tiết xử lí của 1 transaction, ta có thể xem đến mức rất chi tiết, có thể xem tới mức các câu SQL.

Với những xử lí có SQL thì phía bên phải sẽ có icon DB, khi click vào đó sẽ hiển thị thông tin về SQL (tuy nhiên sẽ không hiển thị cụ thể số)
![](https://images.viblo.asia/73199dc2-7a3d-4f19-bc2d-ed3df272cb8c.png)

## Transaction trace (map)

Khi click vào tab Map (Beta) thì có thể check được quan hệ của 1 xử lí đối với các hệ thống bên ngoài, hay hệ thống bên ngoài xử lí hết bao nhiêu thời gian. 

Tuy nhiên trường hợp hệ thống không có liên kết với các hệ thống bên ngoài thì chức năng này cũng không có ý nghĩa lắm.
![](https://images.viblo.asia/96b45524-9521-4ca9-a200-9226a3c48f0f.png)

## Transaction trace (SQL)
Đây là list tất cả SQL đang được sử dụng.
![](https://images.viblo.asia/9f709288-d177-4cce-a2e5-81ba480809e3.png)

## Databases tab

Đây cũng là chức năng mất phí, Database tab sẽ liên kết với Transaction Traces tab. 
Ở đây chúng ta sẽ check được xử lí nào có performance chậm nhất dựa trên trục DB.

![](https://images.viblo.asia/50cbd4c1-c8b4-41d2-97e4-2bc8107fa44e.png)

## Databases detail

Khi chọn các xử lí tùy chọn ở list thì ta có thể xem được chi tiết của xử lí đó. Từ đó có thể biết được xử lí DB đã ảnh hưởng đến xử lí transaction nào.
![](https://images.viblo.asia/c84847d3-e7fe-4db0-8d69-a663d3829750.png)