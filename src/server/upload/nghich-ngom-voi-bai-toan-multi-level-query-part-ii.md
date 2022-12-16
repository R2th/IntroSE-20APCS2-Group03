Mình sẽ để nguyên bài viết cũ, và làm thêm 1 phần này để follow up. Ngoài việc giữ nguyên hiện trường, thật sự đây cũng là 1 minh chứng rất tuyệt vời cho lợi ích của việc thảo luận và trao đổi kiến thức. Nếu như  không có comment của bạn @Midoriniji , chẳng những mình sẽ không biết được thêm một kiến thức mới, mà nhiều khả năng chắc cũng sẽ không quay lại nhìn để tự nhận ra cái sai của mình được. Spoiler trước như thế cho các bạn nào có hứng thú : **Trong [bài viết trước](https://viblo.asia/p/nghich-ngom-voi-bai-toan-multi-level-query-63vKjbNbK2R), cách làm thứ 2 mà mình đã đưa ra đã cho kết quả không chính xác.**  Giống như đọc truyện trinh thám vậy, một khi đã đọc qua đoạn phá án, cái cảm giác thích thú khi đi tìm câu trả lời sẽ không bao giờ đến với bạn được nữa. Vì thế,  nếu bạn muốn tự mình mày mò 1 chút, xin hãy đừng vội đọc bài viết này. *Spoiler ahead. You've been warned.*


## Recursive Query

Trong MySql thì đây là một tính năng mới, mới được đưa vào chỉ từ phiên bản 8.0.1 trờ đi. Có thể vì còn tương đối mới và cũng không phải để phục vụ cho những use-case phổ biến nhất, nên thật sự có vẻ như cũng không có nhiều bài viết dạng guide hay tutorial giúp ta hiểu tính năng này một cách dễ dàng. Đó là tin xấu, còn tin tốt là, ơn giời, trong ngành lập trình này của chúng ta thì muốn tìm hiểu về cái gì cũng bắt nguồn từ documents của nó mà ra hết, nên cũng không có gì đáng ngại lắm. Và càng may mắn hơn, là chúng ta đang có công cụ sẵn trên tay để nghịch rồi, đọc được điều gì, đem ra thử luôn xem hiểu đúng hay sai, đây là cách học ( đủ để sử dụng ) một cách nhanh nhất. Thế thì cùng bắt tay vào làm nào.

### Vẫn lại là : Cần lao vi tiên thủ

Người bạn bí ẩn để lại cho chúng ta một câu query
```sql
with recursive cte (id, name, sub_id) as (
  select     id,
             name,
             sub_id
  from       users
  where      id = 1
  union all
  select     p.id,
             p.name,
             p.sub_id
  from       users p
  inner join cte
          on p.id = cte.sub_id
)
select * from cte;
```
rất đáng tiếc là cứ thế vứt vào bộ dữ liệu chúng ta đang có thì nó không chạy được. Hơi đen, nhưng thôi, đời có mấy khi được ăn sẵn dễ thế. Nhìn qua một chút thì có thể thấy, trong bộ dữ liệu mình tạo ra, bảng `users` không hề có trường `sub_id` . Tuy nhiên, viết psuedo code ( code để biểu thị suy nghĩ của mình, không phải code để paste vào chạy ) thì chuyện này xảy ra là bình thường. Hình dung của bạn ấy về database đang hơi khác, nếu thích chúng ta có thể sau này quay lại, làm 1 bộ data để áp code trên vào chạy ngon cũng được, cái chính ở đây cần hiểu là ý tứ của người viết. Tuy nhiên thật đáng tiếc, như đã nói mình chưa sử dụng recursive query bao giờ hết, nhưng vẫn còn cái link Wiki ở đó : https://en.wikipedia.org/wiki/Hierarchical_and_recursive_queries_in_SQL#Common_table_expression, ít nhất hiểu được cái khái niệm đang nói đến ở đây đã, rồi mới có thể nói chuyện với nhau được. Thông tin thì chắc chắn từ wiki đi ra, cần thứ gì cũng có rồi, có điều đọc hết mớ tài liệu lí thuyết thì chắc chắn là tốt nhất rồi, nhưng nghe có vẻ không khả thi lắm. Ngôn từ trong đó cũng nhiều, may mắn là họ có sẵn một ví dụ cho ta nghiên cứu. Muốn hiểu một chức năng nó thực hiện cái gì, cứ nhìn cách nó hoạt động là dễ hiểu nhất. Đem câu query mẫu ra chạy thử thì, cảm giác đầu tiên phải nói là "Magic !"

![](https://images.viblo.asia/86d1b2e3-38a7-4c5f-8560-f215c58b1f60.png)

Cũng mất một hồi để nghiền ngẫm, tuy nhiên mình diễn dịch tàm tạm cái ví dụ trên ra thì thế này

```sql
WITH RECURSIVE temp (n, fact) AS 
```
syntax thôi, nhưng ở đây ngoài việc khai báo dùng  `recursive`  thì ngoài ra chúng ta còn thông báo thêm chuyện, ta sẽ dùng tên gọi `temp` để trỏ tới bộ dữ liệu tạm được đem vào thực hiện đệ quy, và bảng dữ liệu tạm ( trong mắt mình thì mọi thứ của SQL đều quy về là bảng hết được, cũng tương tự như mọi thứ trong JavaScript đều là object ) sẽ có 2 trường với tên gọi `n` và `fact`.

```sql
UNION ALL
```
trong Wiki thì không thấy nói đây là yêu cầu bắt buộc, nhưng ngẫm một chút thì : chúng ta sẽ cần một truy vấn để đem đi đệ quy, và chẳng lẽ chỉ có mỗi thế, thường thì cũng sẽ cần một query nào khác đem thông tin đệ quy đó vào sử dụng chứ. Nghe có vẻ hợp hợp với trường hợp chúng ta đang cần, nhiều khả năng query ta cần viết ra cũng sẽ có dạng kiểu này, tạm note lại một điều là muốn sử dụng được `UNION ALL` thì 2 query sẽ phải có số lượng cột bằng nhau. Tiếp
```sql
SELECT n+1, (n+1)*fact FROM temp -- Recursive Subquery 
        WHERE n < 9)
```
Đến đây là hết phần `with_query` được nhắc tới trong wiki. Có vẻ như, ta sẽ thực hiện việc đệ quy ở đây, gọi tới bảng dữ liệu tạm thông qua tên mà ta đặt cho nó, cho tới khi gặp điều kiện thích hợp để có thể kết thúc việc đệ quy.
```sql
SELECT * FROM temp;
```
Và cuối cùng là, có vẻ như chúng ta có thể kiểm soát việc trả về những dữ liệu gì từ trong bảng dữ liệu tạm. Cái này có vẻ không quan trọng lắm. HIểu tàm tạm thế đã, đem đi làm thử.

### Năng cán dĩ đắc thực

Như đã nói, muốn kiểm chứng cách mình hiểu có thể ( không thể khẳng định là chắc chắn ) đúng không, cứ đem ra làm theo thử. Đầu tiên là xác định, chúng ta đang cần đệ quy cái gì. Ở đây chúng ta đang có nhiều user phụ thuộc vào nhau theo từng tầng, muốn lấy ra tất cả thì có thể hình dung ra, trước tiên ta phải tìm ra những user trực thuộc user đó, sau đó tiếp tục đi tìm user trực thuộc của trực thuộc ... Thế thì thứ cần đem ra để đệ quy ở đây sẽ là : "Lấy ra những user trực thuộc của user ".  Như vậy, câu query ban đầu để ta đem đi đệ quy sẽ là
```sql
SELECT sub_id FROM subordinates WHERE user_id = 1
```
Đặt cho nó một cái tên, đồng thời khai báo những trường sẽ có trong bộ dữ liệu tạm của mình.
```sql
WITH RECURSIVE cte (id) AS (
    SELECT sub_id FROM subordinates WHERE user_id = 1
)
```
Tạm thời chưa nghĩ gì đến tên tuổi vội, lấy ra thông tin định danh đã. Tiếp theo là viết xem, mình muốn mỗi lần đệ quy thì làm cái gì. Ở đây như đã xác định từ đầu, chúng ta cần lấy ra những user trưc thuộc của 1 user khác.
```sql
SELECT sub_id FROM subordinates INNER JOIN cte ON subordinates.user_id = cte.id
```
Nhìn qua thì có vẻ như, bảng `subordinates` của chúng ta xuất hiện vài lần trong câu query, tốt nhất là đặt cho nó cái tên để tránh gặp lỗi `Ambiguous` . Và chỉ lấy ra mỗi thông tin `id` thôi, cũng chả có gì khác nữa, cứ SELECT tất đi. Câu query của chúng ta ghép lại sẽ thành :
```sql
WITH RECURSIVE cte (id) AS (
    SELECT s1.sub_id from subordinates s1 WHERE user_id = 1
    UNION ALL
    SELECT s2.sub_id from subordinates s2 INNER JOIN cte ON s2.user_id = cte.id
)
SELECT * FROM cte;
```
Đến đây, mình cũng thật sự bất ngờ là nó chạy được, và có vẻ tương đối ổn luôn

![](https://images.viblo.asia/635dd491-6dcf-4068-92ca-cd6e0699b124.png)

Khá là tuyệt vời. Lấy ra cả thông tin tên tuổi nữa đi cho máu. Thật ra đây là một điều mà mình đã muốn làm từ bài viết trước, lấy ra cả id và tên của user phụ thuộc. Nhưng với cách làm cũ thì ở mỗi tầng lại phải join thêm với bảng `users` để lấy ra tên, nó loằng ngoằng 1 cách đáng sợ. Đây có vẻ đang ngon, đem ra thử làm xem sao
```sql
WITH RECURSIVE cte (id) AS (
    SELECT s1.sub_id from subordinates s1 WHERE user_id = 1
    UNION ALL
    SELECT s2.sub_id from subordinates s2 INNER JOIN cte ON s2.user_id = cte.id
)
SELECT users.id, users.name FROM cte INNER JOIN users ON cte.id = users.id;
```
![](https://images.viblo.asia/e34f0e85-775e-495c-84db-c527476b10b3.png)
Ề tồ, không ổn lắm. Nếu sau khi lấy ra id xong, lại tiếp tục đem id đi join để lấy ra name là không ổn, thì thử lấy ra name ngay từ đầu, liệu có khá hơn không. Tuy nhiên mình đã thử qua 1 vài hướng, nhưng vẫn chưa có câu trả lời thỏa đáng, phần này có lẽ tạm để ngỏ ở đây vậy.

Bới ra thêm 1 chút, thì theo cách query cũ, ta có thể biết được mỗi user phụ thuộc đang đứng ở level nào, ở đây lấy ra được mỗi ID không thôi, nghe có vẻ dễ bị bới móc. Ta thử tìm cách thêm thông tin level nữa, liệu có được không.
```sql
WITH RECURSIVE cte (id, level) AS (
    SELECT s1.sub_id, 1 from subordinates s1 WHERE user_id = 1
    UNION ALL
    SELECT s2.sub_id, cte.level +1 from subordinates s2 INNER JOIN cte ON s2.user_id = cte.id
)
SELECT distinct(level) FROM cte;
```
![](https://images.viblo.asia/45c536b1-c5bd-47d6-96d1-9d4d5812a0ac.png)

Bá vãi, được luôn. Nhưng các kết quả cuối toàn là  `9` (cũng phải thôi, ở level cuối cả mà ), liệu có đảm bảo ?
![](https://images.viblo.asia/c2be4f5d-b0cc-4299-b98c-271f5b39f1f0.png)

Ngon rồi, có vẻ ổn. Theo cách này, ta có thể nhận diện những user đầu tiên, không phụ thuộc vào ai sẽ có level 0. Sau đó, mỗi cấp level phụ thuộc sẽ tương ứng tăng thêm 1. Theo cách này thì người mới vào hoàn toàn không làm đổi thông tin của người cũ luôn, quá ngon.

### Final Verdict

Nói là final thì cũng chưa hẳn đúng lắm, nhưng có thể tạm nói, đây là kết luận cuối cùng chúng ta đưa ra sau khi trải qua quá trình tìm hiểu trên. 

#### Ưu điểm

- Cuối cùng chúng ta đã có một giải pháp thuần sql. Không còn cần phải dựa dẫm vào bất kì thông tin nào bên ngoài, giải pháp hoàn toàn tách biệt khỏi tầng application, đây chính là những gì mà chúng ta nên hướng đến.

#### Nhược điểm

- Có thể một phần do năng lực của bản thân, mình cũng chỉ mới lần đầu biết đến cách làm này, nhưng hiện tại, performance của nó vẫn hơi chậm hơn một chút so với 2 cách làm được giới thiệu lúc trước. Nghiên cứu `EXPLAIN ANALYZE` tạm thời cũng chưa thấy có được hướng đi nào, index thì cũng đã có nhưng kết quả vẫn mất khoảng gần gấp đôi thời gian so với cách cũ. Hi vọng sau này mình có thể optimize cách làm này thêm, khi đó sẽ update lại bài viết.
- Một nhược điểm, có lẽ là thuộc về tình huống cụ thể mà chúng ta đang đặt ra ở đây, hơn là vì cách làm không tốt. Trong query trước, mình có nói có thể lấy được cả phụ thuộc trên lẫn dưới, thậm chí có thể ứng với user ở cấp độ giữa lấy ra cả trên lẫn dưới, vì trong cách này vì tính chất đệ quy, nên sẽ chỉ có thể đi theo một chiều. Muốn lấy ra cả 2 sẽ cần thực hiện đệ quy 2 lần, theo 2 hướng, sau đó tìm cách `UNION` lại với nhau.

Tuy nhiên, cảm nhận cuối cùng của mình vẫn là : Đây là hướng làm đúng đắn nhất về mặt logic, nếu có thể, có lẽ nên tìm cách làm sao để áp dụng một cách tốt nhất hướng giải này cho bài toán của bạn, thay vì chọn các giải pháp "work around" , vì theo cá nhân mình nghĩ, các cách làm "mẹo" luôn có rủi ro tồn tại những nhược điểm mà mình chưa nhìn thấy hết.

## Mở rộng ra một chút.

### Sửa lại cách làm thứ 2.

Nhắc đi nhắc lại mãi, nhưng thật ra vẫn đề cũng không có gì ghê gớm lắm. Đây là kết quả khi mình sử dụng recursive query
![](https://images.viblo.asia/635dd491-6dcf-4068-92ca-cd6e0699b124.png)

Còn trong bài viết trước, kết quả khi mình dùng repeated-self-join lại là 

![](https://images.viblo.asia/57171939-f682-4e43-aefd-8263100115d8.png)

Dễ nhận thấy là 2 kết quả này đang khác nhau rất nhiều. Thế thì cách nào mới là đúng. Cùng nhìn lại một chút, thì ở cách làm thứ 2, khi lấy ví dụ với level 2 (tương đối ít kết quả, dễ kiểm chứng ), ta có kết quar

![](https://images.viblo.asia/416059ea-1f84-492f-af94-38028b997e50.png)

Tất cả các kết quả trả về đều đang có giá trị ở cả 2 trường `1st_sub` và `2nd_sub`, nghĩa là đây là các bản ghi ở cấp độ phụ thuộc thứ 2. Ở cấp độ phụ thuộc thứ nhất, các record của ta lẽ ra phải có giá trị của trường `1st_sub` và `Null` ở trường `2nd_sub` . Lí do là vì ta đã dùng `FULL INNER JOIN` , ta cần chuyển sang dùng cách join khác. Để viết được câu query như mong muốn, thường thì mình sẽ phải xác định xem, kết quả trả về có dạng như thế nào trước đã. Ở đây đang có 1 user thuộc level cao nhất, bên dưới có 2 cấp dưới trực tiếp, và 2 cấp dưới này có tổng cộng là 9 cấp dưới của họ. Kết quả trả về của ta, nếu muốn chứa tất cả các user này, thì sẽ phải có dạng như :



| User | 1st_level_sub | 2nd_level_sub |
| -------- | -------- | -------- |
| 1     | Null     | Null     |
| 1     | 15     | Null     |
| 1     | 19     | Null     |
| 1     | 15     | 30     |
| 1     | 15     | 35     |
| 1     | 15     | 51     |
| 1     | 15     | 59     |
| 1     | 15     | 67     |
| 1     | 19     | 34     |
| 1     | 19     | 56     |
| 1     | 19     | 58     |
| 1     | 19     | 77     |

Có vẻ như không được ổn lắm ở đây. Ở đây chúng ta đang có 12 unique Id, nhưng theo cách biểu diễn này, 12 Id nầy sẽ nằm rải rác trong 3 cột, không có cột nào chứa tất cả 12 kết quả. Có vẻ như ta sẽ chỉ có thể đạt được kết quả này bằng cách `UNION` một vài query lại, chứ không thể thực hiện trong 1 query. Kết quả của ta, nếu muốn thực hiện trong 1 query, sẽ phải có dạng 

| User | 1st_ref | 2nd_level_ref |
| --------| -------- | -------- |
| 1       | Null     | Null     |
| 15     | 1     | Null     |
| 19     | 1     | Null     |
| 30     | 15     | 1     |
| 35     | 15     | 1     |
| 51     | 15     | 1     |
| 59     | 15     | 1     |
| 67     | 15     | 1     |
| 34     | 19     | 1     |
| 56     | 19     | 1     |
| 58     | 19     | 1     |
| 77     | 19     | 1     |


Đến đây có vẻ dễ hình dung hơn rồi đúng không. Hiển thị User và cấp trên của user đó, cấp trên có thể là `Null` , thì ta cần join bảng `users` với bảng `subordinates` theo điều kiện `users.id = subordinates.sub_id` ( để lấy ra cấp trên, thì điều kiện là bảng `users` nối với bảng `subordinates` theo id của cấp dưới ), sử dụng `LEFT JOIN` ( để cho phép trường cấp trên có giá trị `Null` ).  Query của ta có dạng :

```sql
SELECT 
users.id AS User
, users.name AS Name
, s1.user_id AS 1st_level_parent
, s2.user_id AS 2st_level_parent
FROM users
LEFT JOIN subordinates s1 ON users.id = s1.sub_id
LEFT JOIN subordinates s2 ON s1.user_id = s2.sub_id
WHERE 1 IN (s1.user_id, s2.user_id, users.id)
ORDER BY 3, 2, 1;
```

![](https://images.viblo.asia/d874d1ea-fab4-47e1-85c2-1d795c8c6150.png)

Có vẻ đúng là kết quả ta cần rồi. Việc cuối cùng ta cần làm, là mở rộng ra cho tới tất cả các level, khá đơn giản :

```sql
SELECT 
users.id AS User
, users.name AS Name
, s1.user_id AS 1st_level_parent
, s2.user_id AS 2st_level_parent
, s3.user_id AS 34d_level_parent
, s4.user_id AS 4th_level_parent
, s5.user_id AS 5th_level_parent
, s6.user_id AS 6th_level_parent
, s7.user_id AS 7th_level_parent
, s8.user_id AS 8th_level_parent
, s9.user_id AS 9th_level_parent
FROM users
LEFT JOIN subordinates s1 ON users.id = s1.sub_id
LEFT JOIN subordinates s2 ON s1.user_id = s2.sub_id
LEFT JOIN subordinates s3 ON s2.user_id = s3.sub_id
LEFT JOIN subordinates s4 ON s3.user_id = s4.sub_id
LEFT JOIN subordinates s5 ON s4.user_id = s5.sub_id
LEFT JOIN subordinates s6 ON s5.user_id = s6.sub_id
LEFT JOIN subordinates s7 ON s6.user_id = s7.sub_id
LEFT JOIN subordinates s8 ON s7.user_id = s8.sub_id
LEFT JOIN subordinates s9 ON s8.user_id = s9.sub_id
WHERE 1 IN (s1.user_id, s2.user_id, s3.user_id, s4.user_id, s5.user_id, s6.user_id, s7.user_id, s8.user_id, s9.user_id, users.id)
ORDER BY 10, 9, 8, 7, 6, 5, 4, 3, 2, 1;
```


![](https://images.viblo.asia/19c6dedf-1b16-4c8b-a246-908e13557aa2.png)

Thật ra là vẫn còn lệch 1 so với kết quả khi dùng recursive, lí do là ở đây ta đã tính cả bản ghi của chính user đó ( bản ghi có id = 1, tất cả các cấp trên đều là `Null` ) . Muốn loại bỏ nó ra thì sửa câu query trên, bỏ điều kiện `uses.id` khỏi tập giá trị `IN` đi là được.  Một điều cũng dễ nhận thấy ở đây là performance của câu query này quá tệ, lí do là vì ta đã sử dụng `LEFT JOIN` thay vì `INNER JOIN`. Về nguyên tắc thì, [LEFT JOIN thường là chậm hơn so với INNER JOIN](https://stackoverflow.com/questions/27787269/why-is-left-join-slower-than-inner-join), và ở đây chúng ta thực hiện việc `LEFT JOIN` tương đối nhiều lần, trên 1 bộ dữ liệu khá lớn. Well, chí ít thì như vậy, chúng ta cũng không cần phải lăn tăn làm cách nào tốt hơn nữa, câu trả lời tương đối rõ ràng rồi.

### Sử dụng Recursive query để tạo dữ liệu.

Như ở phần trên ta đã đề cập đến, có công cụ mới là recursive query trong tay, ta hãy thử tự hỏi, liệu chúng ta có thể trực tiếp tạo dữ liệu trong database hay không. Bỏ qua trường `name`, vì ta có thể nhận định, việc tạo chuỗi kí tự có nghĩa trong MySQL nghe khá là vọng tưởng, còn nếu chỉ generate một chuỗi random thì cũng không có ý nghĩa, tạm bỏ qua. Ở đây coi như ta chỉ cần tạo ra id cho các user thôi, điều kiện còn lại thì vẫn như cũ. Có tất cả 10 level phụ thuộc, mỗi level sẽ có số lượng user bằng 4 lũy thừa số level, 1 user có thể không có hoặc có nhiều user cấp dưới, nhưng có 1 và chỉ 1 cấp trên. 

#### WARNING : Đoạn dưới đây thật sự nhảm

Thật lòng mà nói thì, mình cũng không thích viết đoạn này lắm, vì có lẽ sẽ không có ai có hứng thú mà đọc phần này đâu. Nó khá là đau mắt. Mà thôi, cái này viết ra chắc chủ yếu để thỏa mãn bản thân, dù sao cũng là 1 quá trình nghịch ngợm chọc ngoáy.

Diễn tả thành lời thì, việc ta cần làm ở đây cũng khá là đơn giản. Ta sẽ có 2 vòng lặp, vòng lặp thứ nhất đi từ 1 đến 10, bậc nhảy 1 đơn vị. Vòng lặp thứ 2, nằm bên trong, tăng từ lũy thừa n-1 của 4 đến lũy thừa n của 4, là số id tương ứng nằm trong 1 level.

Tương đương với vòng lặp thứ nhất, ta có 1 câu query khá đơn giản, tăng dần đều từ 1 đến 10.

```sql
WITH RECURSIVE temp1 ( level) AS
(SELECT 1
UNION ALL
SELECT level + 1 FROM temp1
WHERE level < 10
) SELECT * FROM temp1;
```

Vòng lặp thứ 2, tiếp nối vào với vòng thứ nhất, sẽ cần lấy ra các giá trị như sau :

 - Id : Tăng dần đều, từ lũy thừa n-1 của 4 cộng thêm 1, đến lũy thừa n của 4. Với n ở đây tăng dần đều từ 1 đến 10.
 - Ref_id : Là id của cấp trên, ta lấy ra 1 số random của tập id thuộc level trên.
 - Level : Trường này cho vào cho dễ nhìn thôi, để xác định xem đang ở level nào. Không cần có cũng được.

Việc lấy ra 1 số random trong khoảng định nghĩa sẵn không được hỗ trợ sẵn trong MySQL, tuy nhiên ta cũng có thể lấy nó được bằng cách sử dụng kết hợp một số công cụ khác có sẵn 

```sql
SELECT ROUND(RAND() * (max - min) + min)
```

`RAND()` là hàm trả về cho ta 1 giá trị ngẫu nhiên nằm trong khoảng (0,1) , nên biểu thức trên ta có thể dễ dàng chứng minh nó sẽ trả về cho ta kết quả nằm trong khoảng (min, max). Kết hợp thêm hàm `ROUND()` hoặc `FLOOR()` để cho ta kết quả nguyên trả về. Đến đây ta cũng có thể thấy, việc lấy ra giá trị `ref_id` như ta mong muốn sẽ là 1 biểu thức cực kì loằng ngoằng. Ta có thể giảm độ loằng ngoằng đi 1 chút xíu, thông qua việc tính sẵn các giá trị cần sử dụng đến trong quá trình tính toán. Như vậy, ở đây ta sẽ cần lưu vào bảng tạm các giá trị :

- Level của một user
- Số id bắt đầu của level trước đó
- Số id kết thúc của level trước đó

Như vậy, câu query sử dụng cho vòng lặp thứ nhất sẽ là 

```sql
WITH RECURSIVE cte1 (base, min_id, max_id) AS
(SELECT 1, 0, 0
UNION ALL
SELECT base + 1, max_id +1, POW(4, base) + max_id FROM cte1
WHERE base < 10
) SELECT * FROM cte1;
```

![](https://images.viblo.asia/4033f1a7-b5ed-4f5e-a4e8-2b32a83e5f46.png)

Khá gọn gàng và có vẻ đây chính là thứ chúng ta cần. Đem câu này vào, kết hợp với vòng lặp thứ 2, ta có kết quả cuối cùng

```sql
WITH RECURSIVE cte1 (base, min_id, max_id) AS
(SELECT 1, 0, 0
UNION ALL
SELECT base + 1, max_id +1, POW(4, base) + max_id FROM cte1
WHERE base < 10
), cte2 (seq, id, ref_id, level) as (
    SELECT 1, max_id + 1, ROUND((RAND() * (max_id-min_id))+ min_id), base FROM cte1
    UNION ALL
    SELECT seq + 1, id + 1, ROUND((RAND() * (max_id-min_id))+ min_id), level FROM cte2 INNER JOIN cte1 ON cte2.level = cte1.base
    WHERE seq < POW(4,level)
)
SELECT * from cte2 ORDER BY level, id;
```

![](https://images.viblo.asia/cbf6c586-2b4f-49b1-8647-fbeb7b93da36.png)

Chúng ta có thể kiểm tra lại bộ kết quả này 1 chút, bằng cách dùng `SELECT COUNT(*)` và tính thử số lượng user ở mỗi level, kết quả ra hoàn toàn khớp với mong muốn đặt ra ban đầu.

Vậy là xong, bài toán chúng ta tự đặt ra ban đầu : seed dữ liệu bằng cách sử dụng recursive query cũng đã xong. Nó làm mình nhớ tới 1 câu quote khá nổi tiếng : " You were so preoccupied with whether you could, you didn't stop to think if you should. " . Tốn khá nhiều thời gian cho việc thỏa mãn câu hỏi : Liệu mình có làm được việc này không ? để rồi đến khi nhìn lại, có vẻ chắc sẽ không ai care đến chuyện đó lắm :)) . Nhưng thôi, dù sao thì bản thân mình thỏa mãn, thế là được rồi.


## Kết luận cuối cùng.

Thực ra, như đã nói từ đầu, đây là 1 bài toán khá phổ biến. Và hiển nhiên, như mọi thứ phổ biến khác, tìm 1 hồi thì cũng thấy người ta đã giải nó từ lâu rất lâu rồi : https://stackoverflow.com/questions/20215744/how-to-create-a-mysql-hierarchical-recursive-query . Vào đây xem cũng mới biết, hóa ra lời giải được comment trong bài viết trước của mình cũng có vẻ là lấy nguyên xi từ trong đây ra :-s . Nếu bạn chỉ cần quan tâm đến chuyện làm sao giải quyết tình huống này, câu trả lời trên SO kia đã rất đầy đủ và xúc tích.

Nhìn lại thì thật ra mình cũng thấy cả quá trình ngồi nghịch này, hơi mất thời gian 1 chút nhưng cũng khá vui, mày mò ra được nhiều trò là lạ. Ghi lại đây, để sau này bản thân có thể ngồi xem lại, hoặc không cũng gọi là được chút mua vui cho ae.