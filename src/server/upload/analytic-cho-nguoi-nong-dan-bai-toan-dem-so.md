**Bao nhiêu người đã online hôm nay?**
**Bao nhiêu người đã đăng ký thành viên?**
**Bao nhiêu người hôm qua đăng ký đã quay trở lại?**
...

Đó là những câu hỏi thường xuyên của rất nhiều các hệ thống online tới offline. Những câu hỏi này thường được dùng để đo lường những chỉ số đánh giá sức khỏe của hệ thống như **DAU** (Daily Active User), **NRU** (New Registered User), **RR** (Retention Rate),... 

Tuy nhiên vấn đề cho những thanh niên cốt đơ chúng ta không phải là **những con số này có ý nghĩa ra sao** mà lại là **tính nó như thế nào**. Và bài viết này sẽ là những cách tiếp cận với bài toán phổ biến này từ một người nông dân chính hiệu.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/nkilqsxuco_%E1%BA%A3nh.png)

## First things first

Đầu tiên xin các bạn cho mình 1 tràng pháo tay vì những nỗ lực quay trở lại viết bài trong chuỗi ngày đông lạnh giá của mình, khi mà cái giường thân thương có sức hấp dẫn nhiều hơn bàn phím mấy lần. 

Điều thứ 2 mong các bạn hiểu được tư tưởng của bài viết này: **Bạn có thể không cần hiểu nó hoạt động ra sao, nhưng bạn phải hiểu được việc sử dụng nó trong hoàn cảnh nào mà mục đích là gì**. Toàn bộ bài viết sẽ không đề cập chi tiết tới bất kỳ cấu trúc thuật toán hay thứ gì đòi hỏi kiến thức toán cao hơn học sinh lớp 12. Vì vậy các bạn sinh viên cũng cứ yên tâm tìm hiểu nhé (mà thật ra là nhỏ hơn vẫn được)

Điều thứ 3 là các bạn cần biết tên và nghề nghiệp của tác giả (đáng lẽ cái này là điều đầu tiên đấy nhưng mình thích số 3 - M3): **Minh Monmen** - Nhà kinh tế, chính trị học, hóa học, thiên văn học, đồng thời cũng là một nhà văn tình cảm, nhà thơ lãng mạng, nhà triết học duy tâm lỗi lạc của thiên niên kỷ. Nói tới đây chắc hẳn các bạn đều thấy run rẩy rồi đúng không? Rất tốt, vì mọi thứ sau đây đều cao siêu như vậy đó.

Bài viết này mong muốn mang tới cho các bạn một số cách tiếp cận gần gũi với những tác vụ analytic **ai cũng biết phải làm** nhưng **không ai biết làm thế nào**. Do đó sẽ hoàn toàn lược bỏ phần profiling và optimizing cho từng query mà chú trọng vào việc đúc kết kết quả. Tin mình đi, đây là kết quả của cả 1 quá trình dài rất dài (tính bằng tháng) ngồi execute, explain, execute, explain.... để chiếc database có thể phản hồi 90% request tính toán dữ liệu hàng ngày, hàng tháng, hàng năm **dưới 3s**

Bài này chỉ cần các bạn có kiến thức SQL là được. Mà kiến thức PostgreSQL thì sẽ càng dễ hiểu hơn.

## Business requirement

Trước tiên mình sẽ xác định cho các bạn yêu cầu và đầu vào đầu ra bài toán:

Yêu cầu: **Tính số người online hàng ngày** và **Tỷ lệ quay trở lại của họ**

### Input 

Data từ hệ thống tracking với format như sau:

**Bảng dữ liệu thời gian đăng ký**

| User ID | Register Time |
|---------|---------------|
|       1 | 2020-02-04    |
|       2 | 2020-02-04    |
|       3 | 2020-02-05    |
|       4 | 2020-02-05    |
|       5 | 2020-02-06    |

**Bảng dữ liệu thời gian online**

| User ID | Online Time |
|---------|-------------|
|       1 | 2020-02-04  |
|       2 | 2020-02-04  |
|       1 | 2020-02-05  |
|       3 | 2020-02-05  |
|       4 | 2020-02-05  |
|       3 | 2020-02-06  |
|       5 | 2020-02-06  |

### Output

Data cần lấy ra sẽ có dạng:

|    Date    | New Register User | Daily Active User | Retention Rate (%) |
|------------|-------------------|-------------------|--------------------|
| 2020-02-04 |                 2 |                 2 |                 50 |
| 2020-02-05 |                 2 |                 3 |                 50 |
| 2020-02-06 |                 1 |                 2 |                  - |


> Ở đây mình đã tạm lấy 1 chỉ số quay lại với công thức: *Retention Rate (ngày 1)* = *Return User (ngày 2)* / *NRU (ngày 1)*. Trong đó *Return User (ngày 2)* là những người đã đăng ký ở ngày 1 và online vào ngày 2

Cho đến đây thì mọi thứ vẫn còn dễ dàng, nhỉ. Chúng ta hãy cùng tính toán 1 cách chi tiết 

## Solution

Dưới đây là 3 cách tính cơ bản được thực hiện hoàn toàn trên Database SQL, mà cụ thể là PostgreSQL.

### Farmer approach

Cách tiếp cận này là cách đơn giản nhất, sử dụng trực tiếp raw data từ input và tính toán. Dễ chơi dễ trúng thưởng.

Với 3 câu query rất rất là đơn giản sau ta đã tính được cả 3 chỉ số mình cần.

```sql
-- calculate NRU
SELECT date_value, COUNT(user_id) AS nru 
FROM register_user 
WHERE date_value >= '2020-02-04'::date 
  AND date_value <  '2020-02-07'::date
GROUP BY date_value;

-- calculate DAU
SELECT date_value, COUNT(DISTINCT user_id) AS dau 
FROM active_user 
WHERE date_value >= '2020-02-04'::date 
  AND date_value <  '2020-02-07'::date
GROUP BY date_value;

-- calculate RR
WITH 
returning_user AS (
    SELECT ru.date_value, ru.user_id AS register, au.user_id AS returning
    FROM register_user ru
    LEFT OUTER JOIN active_user au 
       ON au.user_id = ru.user_id
      AND au.date_value = ru.date_value + interval '1 day'
    WHERE ru.date_value >= '2020-02-04'::date 
      AND ru.date_value <  '2020-02-07'::date
)
SELECT date_value, (COUNT(DISTINCT return_user)::float / COUNT(DISTINCT register)::float)::float AS rr 
FROM returning_user 
GROUP BY date_value
```

Well, it's easy, but... 

- 3 câu query trên **SIÊU CHẬM** trên tập dữ liệu lớn (cỡ vài trăm ngàn row trở lên) do phải xử lý hàng chục ngàn record trong 1 query
- Sau 1 vài tinh chỉnh tối ưu từng câu thì mình có thể giảm thời gian response xuống vài giây, tuy nhiên con postgres của mình thường xuyên cao tải với mức độ sử dụng CPU siêu to khổng lồ.
- Dữ liệu rất lớn (gần như là raw) phải tồn tại thường xuyên trong DB.
- No hope với các scope dữ liệu lớn hơn như weekly, monthly,... hoặc với nhiều khía cạnh nhỏ hơn (như chia theo device, ứng dụng,...)

### Engineer approach

Cách tiếp cận này chúng ta sẽ trừu tượng hóa vấn đề hơn 1 chút. Ta nhóm mỗi ngày thành 1 bản ghi, và những user_id thỏa mãn điều kiện thành 1 tập hợp như sau:

**Register data**

| Register Date |  User IDs |
|------------   |-----------|
| 2020-02-04    | [1, 2]    |
| 2020-02-05    | [3, 4]    |
| 2020-02-06    | [5]       |

**Active data**

| Active Date|  User IDs |
|------------|-----------|
| 2020-02-04 | [1, 2]    |
| 2020-02-05 | [1, 3, 4] |
| 2020-02-06 | [3, 5]    |

Bằng việc nhóm lại như trên, chúng ta đã giảm được kích cỡ dữ liệu hàng trăm lần do data trong bảng sẽ không cần phải chứa những giá trị lặp lại của ngày tháng,... Lúc này bảng dữ liệu chỉ còn vài ngàn record do mỗi ngày chỉ có tối đa 1 record dữ liệu.

> Test thử với 1 dữ liệu sample **3 triệu row** thì dữ liệu ban đầu nặng **320MB**, sau khi chuyển qua kiểu mới này chỉ nặng **10MB**.

Sau đây là các query tính lại dữ liệu đầu ra:

```sql
-- calculate DAU
SELECT date_value, CARDINALITY(user_ids) AS dau
FROM active_data
WHERE date_value >= '2020-02-04'::date 
  AND date_value <  '2020-02-07'::date

-- calculate NRU
SELECT date_value, CARDINALITY(user_ids) AS nru
FROM register_data
WHERE date_value >= '2020-02-04'::date 
  AND date_value <  '2020-02-07'::date

-- calculate RR
SELECT rd.date_value, CARDINALITY(rd.user_ids & ad.user_ids)::float/CARDINALITY(rd.user_ids)::float AS rr
FROM register_data rd
LEFT OUTER JOIN active_data ad 
ON ad.date_value = rd.date_value + interval '1 day'
WHERE rd.date_value >= '2020-02-04'::date 
  AND rd.date_value <  '2020-02-07'::date
  AND ad.date_value >= '2020-02-05'::date
  AND ad.date_value <  '2020-02-08'::date

-- để sử dụng giao 2 tập hợp (`&` operator) cần cài `intarray` extension
```

> Tip: `rd.user_ids & ad.user_ids` là lấy giao (intersection) của 2 tập user_id, từ đó cho ra 1 tập user xuất hiện ở cả 2 tập hợp.

Wao, thật là một bước tiến đáng nể. Giờ đây khi mà bảng dữ liệu `register_data` và `active_data` chỉ còn nặng cỡ vài chục MB đổ lại thì mọi query trên nó đều được tăng tốc một cách bất ngờ. Giờ đây DAU, NRU có thể tính trong **vài trăm ms**, Retention Rate phức tạp thì đã giảm từ **10 giây xuống 1-2s**. Sau đây là 1 số thu hoạch từ phương pháp này:

- **Kết quả ra vẫn chính xác 100%** tương tự cách đầu tiên
- Đối với hệ thống dữ liệu thật với khoảng 4-5 attribute đi kèm với ngày tháng (ví dụ device os, nguồn user, application,...) mà dữ liệu nặng tầm trăm GB thì lượng data giảm được vẫn chưa nhiều (lắm). Table để tính toán vẫn nặng **vài GB**.
- Hỗ trợ array intersection ở mức 1-1 với `intarray`. Với các loại array khác hoặc intersection nhiều array bạn phải tự định nghĩa hàm intersection (do postgres không hỗ trợ sẵn). Dù nó chậm nhưng array intersection vẫn cho kết quả chính xác.
- Có thể tính toán nhiều chỉ số phức tạp đòi hỏi union nhiều record trên scope lớn (weekly, monthly). Tuy nhiên **độ trễ sẽ tăng lên rất nhanh** theo độ lớn scope là độ lớn dữ liệu. Với các scope lớn tính toán vẫn khá chậm và tốn dung lượng lưu trữ.
- Có thể thực hiện các **operation kiểm tra chính xác** (ví dụ check 1 user có online vào ngày này không)

### Man from Mars's approach

Cách tiếp cận này là cách tiếp cận theo hướng gần đúng, cũng chính là cảnh giới cao nhất trong việc đếm số mà mình đã từng thực hiện với dữ liệu lớn. Về cơ bản thì concept của nó hoàn toàn tương tự cách trên, chỉ khác là giờ thay vì lưu data dưới dạng mảng thì chúng ta sẽ lưu tập hợp user_ids dưới 1 dạng dữ liệu gần đúng là **Hyperloglog**.

> **Hyperloglog** là thuật toán tính toán gần đúng các giá trị khác nhau trong tập hợp, thuật toán này có độ chính xác cao mà vẫn giữ được dung lượng dữ liệu nhẹ nhàng, hỗ trợ nhiều operation liên quan tới đếm phần tử trong 1 hoặc nhiều tập hợp. Và quan trọng nhất là nó rất nhanh. Superfast nếu chúng ta tổ chức dữ liệu hợp lý. Thông tin thêm về thuật toán này bạn có thể search google thêm nhé. Link extension cho postgresql: [https://github.com/citusdata/postgresql-hll](https://github.com/citusdata/postgresql-hll)

...

Dấu 3 chấm ở trên là thời gian mình chừa ra cho các bạn đi google về thuật toán này. Data lưu ở dạng hyperloglog sẽ có dạng

**Register Data**

| Register Date |  User IDs |
|------------   |-----------|
| 2020-02-04    | \024\213\1771\...   |
| 2020-02-05    | \024\213\1771\...   |
| 2020-02-06    | \024       |

**Active Data**

| Active Date|  User IDs |
|------------|-----------|
| 2020-02-04    | \024\213\1771\...   |
| 2020-02-05    | \024\213\1771\...   |
| 2020-02-06    | \024       |

**User return after 1 day**

| Return After 1 day |  User IDs |
|------------|-----------|
| 2020-02-04    | \024\213\1771\...   |
| 2020-02-05    | \024\213\1771\...   |

> **Hyperloglog** là kiểu dữ liệu được lưu trữ dưới dạng binary, `\024\213\1771\..` chỉ là biểu diễn dưới dạng string cho chúng ta dễ hình dung.

Tiếp theo mình sẽ biểu diễn cách tính lại các chỉ số dựa trên hyperloglog:

```sql
-- calculate DAU
SELECT date_value, hll_cardinality(user_ids) AS dau
FROM active_data_hll
WHERE date_value >= '2020-02-04'::date 
  AND date_value <  '2020-02-07'::date

-- calculate NRU
SELECT date_value, hll_cardinality(user_ids) AS nru
FROM register_data_hll
WHERE date_value >= '2020-02-04'::date 
  AND date_value <  '2020-02-07'::date

-- calculate RR
SELECT rd.date_value, hll_cardinality(r1.user_ids)::float/hll_cardinality(rd.user_ids)::float AS rr
FROM register_data_hll rd
LEFT OUTER JOIN return1_data_hll r1
ON r1.date_value = rd.date_value
WHERE rd.date_value >= '2020-02-04'::date 
  AND rd.date_value <  '2020-02-07'::date
  AND r1.date_value >= '2020-02-04'::date
  AND r1.date_value <  '2020-02-07'::date
```

Đây là bước tiến to lớn nhất khi thời gian query giảm xuống chỉ còn vài chục mili giây, cho phép dashboard với nhiều chỉ số phức tạp được hiện lên trong nháy mắt. Tuy nhiên mình có 1 số đúc kết khi sử dụng cách tiếp cận này:

- Dung lượng **SIÊU SIÊU BÉ**, đó là lợi thế đầu tiên (ví dụ với active data ở trên từ 320MB giảm xuống 10MB ở cách 2 đã giảm xuống **chỉ còn 40KB**). Thực tế trên hệ thống thật của mình thì từ **vài chục GB dữ liệu** đã giảm xuống chỉ còn **vài chục MB**.
- **Tốc độ tính toán siêu nhanh**. Với các operation dạng kết hợp (union) 2 tập hợp và đếm thì HLL có tốc độ siêu nhanh, chỉ tính bằng mili giây. Do đó tính toán trên các scope lớn như weekly, monthly, hay tính toán trên nhiều sản phẩm, nhiều trạng thái,... cực kỳ xịn sò.
- **Sai số có thể control được** thông qua các option, thường thường mình chấp nhận mức sai số khoảng <2% cho 1 chỉ số
- **Không có khả năng intersection**. Như các bạn đã thấy ở trên, mình phải tạo ra 1 bảng thứ 3 để track lại những Returning User sau 1 ngày riêng biệt bằng hll. Hyperloglog có 1 điểm yếu về sai số khi thực hiện phép giao 2 tập hợp (intersection) nên chúng ta sẽ không tính Retention Rate bằng cách cho giao 2 tập hợp active và register như trên được mà buộc phải tính toán để lưu từ đầu. Tuy nhiên điều này được bù lại bằng dung lượng rất bé của dữ liệu, cho phép chúng ta tính trước và lưu rất nhiều tập hợp khó phát sinh.
- **Không thể thực hiện các operation kiểm tra chính xác** xem 1 phần tử có trong tập hợp không. (HLL chỉ hỗ trợ các operation đếm)

## FAQ

Sau đây là 1 số câu hỏi mà các bạn có thể đặt ra sau khi đọc bài viết này.

***Tại sao phải dùng dữ liệu gần đúng? Sao không tính đúng luôn?***

Khi các chỉ số analytic của bạn đã lên tới cỡ chục ngàn, trăm ngàn hay triệu, thì việc tính chính xác con số sẽ mất dần ý nghĩa. Thay vào đó tầm quan trọng của việc **Tính nhanh chỉ số đó** tăng lên rất nhiều. Và các thuật toán gần đúng sinh ra để phục vụ việc này.

***Tại sao không tính trước toàn bộ các chỉ số và lưu luôn value?***

Thật ra trong 2 phương pháp của mình đều có xuất hiện việc xử lý data trước. Tuy nhiên chúng ta phải quyết định việc xử lý trước data **tới mức nào**. Như mình là tính trước các tập hợp, cho các tập hợp đó giao nhau, kết hợp nhau,... rồi mới đếm số. Như vậy sẽ giữ được tính chất flexible cho người truy vấn. Trên các hệ thống thật thì ngoài field thời gian ra còn rất nhiều các thuộc tính đi kèm với 1 con số như: `device`, `source`, `app`,... Do đó việc bạn tính tới mức độ tập hợp cho phép bạn kết hợp rất nhiều query dựa trên các thuộc tính kia mà vẫn đảm bảo kết quả nhanh chóng. Việc tính trước TOÀN BỘ các cách kết hợp chỉ số là thừa thãi và không hiệu quả.

***Khi nào thì dùng cách 2, khi nào thì cách 3***

Nếu phép toán có xuất hiện intersection, hãy dùng cách 2 để có kết quả chính xác. 
Nếu không có intersection mà chỉ có union thì có thể dùng cách 3.
Lưu ý: Để giữ được sai số của cách 3 nhỏ thì phải hạn chế cộng trừ nhân chia nhiều lần trên kết quả đếm.

Ví dụ: Đếm NRU, AU, ReturnUser1day có sai số thấp là 2%
RR = ReturnUser1day / NRU thì sẽ có sai số lên tới 4%

Nhìn chung, Hyperloglog tính các chỉ số về % có thể dẫn tới các con số rất ảo, bạn nên lưu tâm.

***Nghe thuật toán hyperloglog có vẻ cao siêu nhỉ, xài khó không?***

Thật ra tìm hiểu thì đúng là vậy, nhưng tới lúc dùng mình mới phát hiện ra là nó dễ dàng 1 cách ấn tượng. Tương tự với việc mình thao tác trên các mảng số bình thường. Chỉ có duy nhất 1 thứ phải lưu tâm đó là sai số. Cái này các bạn phải quản trị được và hiểu việc control sai số nó như nào.

Dùng thì cứ dùng thế chứ giờ bên trong hyperloglog là thứ cao siêu gì thì mình cũng chịu, he he.

## Tổng kết

Trên đây mình vừa cùng các bạn xài thử 3 cách tính toán các chỉ số hay gặp mà không chỉ mình mà rất nhiều bạn cũng phải làm. Trong đó:

- Cách 1 là tính trực tiếp trên dữ liệu raw: combo nặng + super slow + chính xác
- Cách 2 là tính trước 1 tập hợp user id và đếm cardinality trên đó: ít nặng + khá nhanh + chính xác
- Cách 3 là tính trước 1 tập hợp user id và lưu dạng hyperloglog: cực nhẹ + nhanh + có sai số

Nếu các bạn tìm hiểu các cách trên mà không rõ chỗ nào thì cứ tự nhiên comment bên dưới nhé.