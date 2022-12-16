Trong một ngày đẹp trời, dự án khách hàng sau khi nằm im mấy tháng trời thì cuối cùng cũng được deploy lên production. Sau khi deploy thành công, gặp phải một issue khá nghiêm trọng đó là trang chủ trên production load dữ liệu rất lâu, mất khoảng 20s. Thế là mình được giao ngay task tìm ra nguyên nhân gây ra issue đó và cách giải quyết ra làm sao. Khi đó mình nghĩ ngay đến đánh `index` cho `DB`. Vậy làm thế nào để đánh **index** hợp lí ? Làm sao để biết câu **query** đó đã được **optimize** chưa ? Nào cùng mình tìm hiểu cách giải quyết bài toán **slow query**.

### Back to Basic
* Gợi nhớ lại kiến thức một chút. Vậy **Index** là gì? Và tại sao nó lại quan trọng trong việc giải quyết bài toán **slow query**.

* **Chỉ mục** (**Index**) là bảng tra cứu đặc biệt mà **Database Search Engine** có thể sử dụng để tăng nhanh thời gian và hiệu suất thu thập dữ liệu. Hiểu đơn giản, một chỉ mục là một con trỏ tới dữ liệu trong một bảng. Một **chỉ mục** trong một **Database** là tương tự như một **chỉ mục** **trong Mục lục của cuốn sách**.

* **Chỉ mục (Index)** được sử dụng để tìm ra những **bản ghi (record)** thỏa mãn điều kiện trong mệnh đề **WHERE**. Nếu không có chỉ mục **(index)**, **MySQL** sẽ phải đọc toàn bộ **bản ghi (record)** từ đầu đến cuối của **bảng (table)** và tìm ra những **bản ghi (record)** thỏa mãn điều kiện trong mệnh đề **WHERE**. Khi **record** trong **table** càng tăng, thì càng mất thời gian để thực hiện câu **query**. Trong trường hợp còn lại, nếu tồn tại **index**, **MySQL** có thể nhanh chóng xác định được vị trí **record** cần tìm trong **table** thay vì phải đọc **record** tuần tự từ đầu đến cuối. Mọi người có thể đọc thêm về **index** tại đây:  https://link.sun-asterisk.vn/4YKIH4

* Vì vậy để giải quyết bài toán **slow query**, sử dụng **index** là ưu tiên hàng đâu.

### Study case

* Ở đấy, mình có chuẩn bị một DB gồm có 2 bảng là `service` và `service_event`. Ở bảng `service` có **42** **record**, và bảng `service_event` có **781479 record**. Mọi người có thể download DB mẫu tại đây: https://link.sun-asterisk.vn/eVl8Hm. Khi download xong, mọi người import vào là có thể sử dụng luôn.

![](https://images.viblo.asia/3d42927b-189e-4b2f-92aa-cb611f5200a2.png)

* Trong DB trên, ở 2 bảng `service` và `service_event` có cột ID là `primary key` và đây là **index** mặc định cho 2 bảng này. Ngoài ra trong bảng `service_event`, còn có `foreign key` là **service_id**, cũng là **index** cho bảng này. Trong quá trình tạo khóa ngoại, **MySQL sẽ không tự tạo index cho khóa ngoại.  Vì vậy, nếu foreign key trong các bảng không được đánh index thì mọi người nên đánh index cho trường này.**

### Explain query to optimize

* Mình có câu **query** sau: 
```
SELECT service_id, COUNT(*)
  FROM service_event
  WHERE status = 'error' AND created_at >= DATE(NOW()) - INTERVAL 2 YEAR GROUP BY service_id;
```

* Thời gian chạy và tổng số **record** trả về câu **query** trên là:

![](https://images.viblo.asia/6be749c2-13e1-4d9f-a179-8594aea8b688.png)

* Để phân tích rõ hơn xem câu **query** trên hoạt động như thế nào, mình sẽ sử dụng **EXPLAIN** 

```
EXPLAIN SELECT service_id, COUNT(*)
          FROM service_event
          WHERE status = 'error' AND created_at >= DATE(NOW()) - INTERVAL 2 YEAR GROUP BY service_id;
```
* Kết quả nhận được như sau: 

![](https://images.viblo.asia/b2cc0d71-a8f3-46b3-b8a8-1125022699b7.png)

* Nhìn vào kết quả trên, mọi người cần chú ý vào các trường sau:
    * **type**: Mô tả cách các bảng được **join** trong câu truy vấn. Mọi người có thể đọc thêm về type tại đây: https://dev.mysql.com/doc/refman/8.0/en/explain-output.html#explain-join-types. Ở trong trường hợp này, **type** của **query** đầu tiên là **index**, có nghĩa là ở câu truy vấn này có sử dụng **index** để tìm ra những bản ghi thoả mãn điều kiện trong bảng `service_event`.
    * **possible_keys**: Các **index** có thể được dùng để tìm ra những bản ghi thoả mãn điều kiện. Ở trong trường hợp này, **index** **có thể** **được sử dụng** là` service_events_service_id_fk`.
    * **key**: **Index** được sử dụng để tìm ra những bản ghi thỏa mãn điều kiện. Trong trường hợp này, thì **index** được sử dụng là **service_events_service_id_fk**.
    * **rows**: Số bản ghi mà **MySQL** đã đọc để tìm ra những bản ghi thỏa mãn. Trong trường hợp này, số bản ghi **MySQL** đã đọc là **77896** bản ghi.

* Có thể thấy rằng, khi sử dụng **index** **service_events_service_id_fk**, số lượng bản ghi cần đọc để tìm ra số bản ghi thỏa mãn điều kiện vẫn còn quá nhiều, bởi vì **output** của **query** trên là **31** bản ghi. Cần phải đọc **777896** bản ghi mới có thể tìm ra **31** bản ghi thỏa mãn. Có nghĩa là đánh **index** như này chưa phải là tối ưu. Vậy đánh **index** như thế nào mới là tối ưu?

* Thông thường, chúng ta thường đánh **index** cho những trường mà sử dụng trường đó để **search** **dữ** **liệu** (name, mail, ...). Những **index** tối ưu là những **index** được dùng để phục vụ cho việc chạy **query**. Dĩ nhiên, khi mà khởi tạo các **bảng**, chúng ta không thể biết sẽ phải viết những **query** nào, và nên đánh **index** vào trường nào. Không nên đánh **index** cho toàn các trường trong bảng, bởi vì khi làm như vậy sẽ dẫn tới ảnh hưởng **performance** những câu query **insert/update/delete**. Khi **insert/update/delete** thì sẽ phải đánh **index** lại từ đầu dẫn tới **performance** của những câu query đó sẽ bị chậm. Vì vậy, chỉ đánh index cho các trường phục vụ việc chạy **query**, không nên gây dư thừa **index**.

* Quay lại câu **query** trên, vậy sẽ phải đánh **index** cho những trường nào trong bảng? Trong mệnh đề **WHERE** câu query trên, có sử dụng 2 trường là **status** và **created_at**. Thử đánh index cho 2 trường này xem sao?

```
create index idx_status on service_event(status);
create index idx_created_at on service_event(created_at);
```

* Sau khi đánh index, chạy thử câu query, kết quả trả về như sau: 

![](https://images.viblo.asia/8dbd4409-027f-44a1-92c6-bcedca10e2a7.png)

* Vậy là **performance** của câu query đã cải thiện đáng kể, từ 1.38 giây còn 0.09 giây.  Mình thử **EXPLAIN** câu query, xem số lượng bản ghi MySQL đã đọc để tìm ra số bản ghi thỏa mãn điều kiện trong mệnh đề where là bao nhiêu:

```
EXPLAIN SELECT service_id, COUNT(*)
          FROM service_event
          WHERE status = 'error' AND created_at >= DATE(NOW()) - INTERVAL 2 YEAR GROUP BY service_id \G;
```

![](https://images.viblo.asia/e05cbfa8-3d1d-4624-9cc0-7ef2e8772001.png)

 * Có thể thấy, trường **possible_key** đã có thêm những index mình vừa mới tạo đó là: **idx_status** và **idx_created_at**, trường key đã có sự thay đổi đó là sử dụng index **idx_status** thay vì sử dụng index **service_events_service_id_fk**. Và số lượng record mà MySQL đã đọc giảm từ **777896** xuống **83474**, một con số khá ấn tượng. Nhưng vẫn còn có khá nhiều so với output của câu query là **31** record. Vậy tại sao lại như vậy ?
 * Sự thật, không phải tất cả các trường trong mệnh đề **WHERE** được đánh **index** thì có nghĩa là câu query đó sẽ đạt **performance** tốt nhất. Trong trường hợp này,  **MySQL** sẽ xem các **index** trong trường **possible_keys** và tự chọn ra index phù hợp cho câu query đó là **idx_status**.  Điều đó có nghĩa rằng là, MySQL sẽ tìm những bản ghi thỏa mãn điều kiện `status = 'error'` theo index idx_status, từ những bản ghi đó sẽ lọc ra những bản ghi thỏa mãn điều kiện `created_at >= DATE(NOW()) - INTERVAL 2 YEAR GROUP BY service_id`. Vì vậy **83474** là số bản ghi thoả mãn điều kiện `status = 'error'`, MySQL phải đọc hết số bản ghi này để tìm ra những bản ghi thoả mãn điều kiện còn lại. Vậy có thể làm giảm số lượng bản ghi này xuống nữa không ? Mình nghĩ tới  `Multiple-Column Indexes`.
 *  **Multiple-Column Indexes**: MySQL có thể tạo 1 **index** cho nhiều trường trong bảng. Một index có thể bao gồm tối đa 16 trường. MySQL có thể dùng  multiple-column indexes cho các câu truy vấn mà các trường trong  `multiple-column indexes` xuất hiện trong mệnh đề where của câu truy vấn đó. Trong trường hợp trên, ở mệnh đề where có 2 trường là `status` và `created_at`. Mình sẽ đánh  `multiple-column indexes` cho 2 trường này: 

```
 create index idx_status_created_at on service_event(status, created_at);
```

* Explain câu query để xem có sự thay đổi nào không ?

![](https://images.viblo.asia/975c81d3-d816-4a26-bd83-8ceca29e27b7.png)

![](https://images.viblo.asia/a0469b9a-59bb-41ed-8ce5-a25178607c7e.png)

* Có thể thấy được rằng **index** được sử cho câu query này vẫn là **idx_status** và tốc độ câu truy vấn vẫn không thay đổi. Rõ ràng mình đã đánh thêm index cho cả 2 trường là `status` và `created_at`. Vậy tại sao MySQL lại không sử dụng index này ?
* Mặc định MySQL sẽ sử dụng index mà nó cho rằng có tốc độ truy vấn tốt nhất. Nó sẽ không biết những index có cho tốc độ tốt hơn nữa không. Ở trong case này, mình nghĩ `multiple-column index` sẽ cho tốc độ truy vấn tốt hơn. Vì vậy để chỉ định MySQL sẽ sử dụng index nào cho câu truy vấn, mình sẽ sử dụng **FORCE INDEX (index_name)**. Cụ thể mình sẽ có câu truy vấn như sau:

```
SELECT
    service_id, COUNT(*)
FROM
    service_event FORCE INDEX (idx_status_created_at)
WHERE
    status = 'error' AND created_at >= DATE(NOW()) - INTERVAL 2 YEAR
GROUP BY
    service_id;
```
* Kết quả là:

![](https://images.viblo.asia/186277c8-a92d-4086-9283-9753e73d52bb.png)

 * Có thể thấy rằng, kết quả đã cải thiện hơn. Mình sẽ **explain** xem số lượng bản ghi mà **MySQL** phải đọc để tìm ra số bản ghi thỏa mãn điều kiện trong mệnh đề **`where`** là bao nhiêu:

![](https://images.viblo.asia/64089119-3f91-4151-aada-d90b2a95ce4f.png)

* Số lượng bản ghi **MySQL** phải đọc là **36252**, đã giảm đáng kể. Vậy là câu truy vấn này đã được tối ưu nhất. :100:
 
 
### Conclusion

* **Nên đánh index cho foreign key trong các bảng.**
* **Không nên đánh index cho tất cả các trường trong bảng. Chỉ nên đánh index cho các trường phục vụ cho việc truy vấn. Những trường trong mệnh đề WHERE thì nên đánh index.**
* **Khi cảm thấy index nào có hiệu quả mà MySQL không sử dụng đến nó hãy sử dụng `FORCE INDEX` để chỉ định index cho câu truy vấn.**
* **Nếu đánh index rồi mà performance câu truy vấn không thể cải thiện thì hãy viết một câu truy vấn mới.** :sweat_smile:

### References 

* Making slow queries fast using composite indexes in MySQL: https://link.sun-asterisk.vn/qzzChK
* Multiple-Column Indexes: https://link.sun-asterisk.vn/8kvQaR
* EXPLAIN Output Format: https://link.sun-asterisk.vn/VLhATL