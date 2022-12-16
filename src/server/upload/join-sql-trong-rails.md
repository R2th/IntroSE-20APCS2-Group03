Khi làm việc với rails chắc hẳn các bạn không ít lần gặp các trường hợp phải xử các câu SQL phức tạp đòi hỏi phải join nhiều bảng. Hôm nay mình xin chia sẻ một số kinh nghiệm khi gặp những trường hợp này.

  SQL có 4 loại JOIN chính là : JOIN (INNER JOIN), LEFT JOIN, RIGHT JOIN và FULL OUTER JOIN. Ngoài ra còn có loại CROSS JOIN ( tự join với chính mình, ít gặp). Tuy nhiên trong rails hiện tại chỉ mới hỗ trợ method cho JOIN và LEFT JOIN, nếu cần dùng 3 loại kia các bạn phải viết hàm JOIN trong SQL bằng tay mà k có method hỗ trợ từ rails, chính vì vậy trong phần này mình gom RIGHT JOIN , FULL OUTER JOIN và CROSS JOIN vào chung 1 mục là vì lý do đó.

#    1. Các loại JOIN
## 1.1 JOIN (INNER  JOIN)
 Trong SQL khi viết JOIN hay INNER JOIN đều tương tự nhau chính vì thế để rút gọn, từ bây giờ mình chỉ gọi tắt là JOIN. Kết quả từ join 2 bảng trong SQL là tập hợp dữ liệu đều có ở cả hai bảng, nghĩa là kết quả là GIAO của hai tập hợp dữ liệu.Các bản ghi chỉ xuất hiện ở một trong hai bảng sẽ bị loại. 
![](https://images.viblo.asia/0244a401-894a-47a6-b9c7-f547777a550f.png)

*Hình ảnh minh họa về Inner join*

Như hình minh họa ở trên, khi join 2 bảng A và B với nhau ta sẽ được tập hợp giao của 2 bảng , chính là phần được tô màu xanh.

Ví dụ về JOIN trong SQL:
``SELECT * FROM members JOIN products ON members.id = products.member_id`` 

Kết quả của câu SQL trên sẽ được 1 bảng members mới mà mỗi member sẽ đi kèm với 1 record bên bảng product sao cho `member.id = product.member_id` 

Đó là khái niệm trong SQL, vậy cách dùng trong rails thì như thế nào ? 

Trong SQL chúng ta viết rất đơn giản `Member.joins(:products)`

Nếu chỉ đơn giản vậy thì điều kiện JOIN `members.id = products.member_id` làm sao rails hiểu được ? 

**Trả lời :** Điều kiện JOIN của 2 bảng sẽ dựa vào association của 2 bảng thông qua foreign key. Như trong ví dụ trên chúng ta phải thiết lập mối quan hệ của 2 bảng Members và Products . Cụ thể trong model Members cần có `has_many: :products` và trong model Products cần có : `belongs_to: :member`

Tương tự đối với trường hợp join 2 bảng liên kết thông qua 1 bảng phụ. Ví dụ bảng member và book được liên kết thông qua bảng book_members ghi lại danh sách người mượn sách. Để thiết lập association, bên trong model Members cần có  `has_many: :book_members` và `has_many :book, through: :book_members` , bên trong model BookMembers cần có `belongs_to: :member` và `belongs_to: :book` và bên trong model Book cần có `has_many: :book_members` `has_many :members, through: :book_members`  (Các bạn có thể tìm đọc về Association trong rails để hiểu thêm )

Như vậy ta có thể join 2 bảng với nhau bằng cách gọi : `Members.joins(:books)` (hoặc join từ phía books `Books.joins(:members)` )

Câu lệnh ngắn gọn trên tương đương với câu SQL join 3 bảng:

``SELECT * FROM members JOIN book_members ON members.id = book_members.member_id JOIN books ON book_members.book_id = book.id``

Vậy nếu gặp trường hợp cần join 2 bảng không có association hoặc association không đủ điều kiện cần thiết với yêu cầu join thực tế thì chúng ta sẽ làm gì ?

Lúc đó chỉ còn cách viết câu lệnh SQL bằng tay như ví dụ dưới đây thôi nhé:

Trong trường hợp ví dụ books - members ở trên, nếu điều kiện join còn yêu cầu books.price <= members.money (giá sách nhỏ hơn số tiền members có). Lúc đó chúng ta phải viết 1 cách dài dòng :

``Members.joins("JOIN book_members ON members.id = book_members.member_id JOIN books ON book_members.book_id = book.id AND books.price <= members.money") ``

##     1.2 LEFT JOIN (LEFT OUTER JOIN)
   Trong SQL, LEFT OUTER JOIN còn được gọi tắt là LEFT JOIN, vì vậy từ bây giờ mình sẽ gọi là LEFT JOIN cho gọn.
   Khi LEFT JOIN  2 bảng sẽ trả về tất cả các record từ bảng bên trái (bảng 1) và các record phù hợp từ bảng bên phải (bảng 2). Nếu không có kết quả phù hợp, bảng 2 sẽ trả về NULL.
   ![](https://images.viblo.asia/7de9eb4f-8783-4160-951b-edfdee6bef94.png)
   
  *Hình ảnh minh họa về left join*
  
  Như hình minh họa ở trên, khi join 2 bảng A và B với nhau ta sẽ được tập hợp toàn bộ bảng A + một phần bảng B thỏa mãn điều kiện JOIN , chính là phần được tô màu xanh. 
  
  Về cách sử dụng thì tương tự với cách dùng của joins chúng ta dùng A.left_joins(B) hoặc A.left_outer_joins(B) 
  
  Nguyên nhân có 2 cách dùng này là vì phiên bản mới cập nhật left_joins thay left_outer_joins cho ngắn gọn hơn, tuy nhiên left_outer_joins vẫn được giữ lại. Vậy các bạn biết dùng cái nào tiện lợi hơn rồi đấy. 

Về cơ chế, left_joins cũng join thông qua  foreign key của 2 bảng dựa vào association y hệt như join. Chỉ khác nhau ở kết quả trả về dựa theo khái niệm của chúng mà thôi.

**Về ứng dụng**, LEFT JOIN mình thấy thường được sử dụng nhiều nhất để query ra những thằng ở bảng A mà k có ở bảng B.

Ví dụ :  Ta có 2 bảng members và products. Chúng ta cần query ra những thằng members không có products nào. Lúc đó ta viết như sau:
``Member.left_joins(:products).where(product: {id: nil})``

Câu lệnh trên tương đương với :
``SELECT * FROM members JOIN products ON members.id = products.member_id WHERE product.id IS NULL``


## 1.3. RIGHT JOINS (RIGHT OUTER JOINS) - FULL OUTER JOINS - CROSS JOINS
 3 thằng này hiện chưa được rails hỗ trợ hàm gọi như joins và left_joins nên nếu cần sử dụ các bạn phải gọi trực tiếp trong SQL. Ví dụ :
` Member.joins("RIGHT JOIN products ON members.id = products.member_id")`
 
 Cũng chính vì thế mà mình sẽ không đề cập nhiều về 3 thằng này ( vì trong rails không có gì để nói, nếu các bạn muốn tìm hiểu kĩ thì nên tìm hiểu bên mảng SQL). Mình xin tóm gọn khái niệm thông qua một số hình ảnh minh họa trực quan về các loại join này.
 
 ![](https://images.viblo.asia/2cb0853f-feac-4ffc-aafa-54d2d450fa27.png)
 
 *Hình ảnh minh họa về right join*
 
 RIGHT JOIN trả về toàn bộ bảng  2 kết hợp với một phần bảng 1 thỏa mãn điều kiện JOIN. Nếu không có kết quả phù hợp, bảng 1 sẽ trả về NULL.
 Ứng dụ thực tế của RIGHT JOIN khá giống với LEFT JOIN , chỉ khác là gọi từ model ngược lại.
 
 `Product.select("members.*").joins("RIGHT JOIN members ON members.id = product.member_id).where(product: {id: nil})` 
sẽ tương đương với ví dụ ``Member.left_joins(:products).where(product: {id: nil})`` ở trên

![](https://images.viblo.asia/bfde5d1b-c24d-4248-a887-e5e37f463045.png)

*Hình ảnh minh họa về full outer join*

![](https://images.viblo.asia/55e77310-2291-48b9-893d-eebc176e3e31.jpg)

*Ví dụ minh họa về cross join*


 Các bạn có thể tham khảo về lý thuyết về Full outer join và Cross join ở bài viết khác nhé ! ( chỗ này ko liên quan tới rails mà chỉ thuần SQL nên lười viết quá )
 
#   2. Một số lưu ý khi JOIN
  ## 2.1 JOIN nhiều bảng 
-JOIN nhiều bảng từ 1 bảng chung:
 Ví dụ bạn có bảng Member cần join với 2 bảng Products và Project mà mỗi bảng đều có association trực tiếp với Members, bạn có thể viết:
 `Member.joins(:prouducts, :projects)`
 
 -JOIN của Nested :
 Ví dụ bạn cần join với 2 bảng Products và Sales trong đó Sales lại có association với Products thông qua product_id, bạn có thể viết:
 `Member.joins(prouducts: [:sales])`
     
   ## 2.2 JOIN và merge
    
   Khi gặp những câu SQL rắc rối bắt buộc phải phối giữa join nhiều bảng và nhiều điều kiện SQL phức tạp. Bạn sẽ có 2 cách giải quyết :
   
**a .  Join giữa những bảng đó và dùng các điều kiện where phù hợp**

  Ưu điểm của cách này là chỉ dùng 1 câu SQL duy nhất bằng join nên performance nói về tính "tương đối" thì khá là ngon lành. ( Nói là "tương đối" là bởi vì trong hầu hết các trường hợp thông thường thì join phát huy hiệu suất hơn Subquery, tuy nhiên điều đó ko phải lúc nào cũng đúng , cái này nếu có điều kiện mình sẽ so sánh ở bài viết khác nhé )
  Thường thì hiệu suất vẫn phải đặt lên hàng đầu tuy nhiên cách này nó có 1 cơ số nhược điểm sau :
  - Code cực kỳ phực tạp, câu SQL sẽ cực kỳ rắc rối
  - Khó review 
  - Dễ xảy ra bug, khó fix bug 
  - Khó test
  
  **b. Dùng Join và merge. **

  Ở cách 1 chúng ta join các bảng và lúc đó mới xét tới điều kiện where, nhưng ở trong cách này chúng ta xử lý Where riêng giữa các cặp model sau đó merge chúng lại với nhau.
   Ví dụ cần join 3 Model A, B, C với nhiều điều kiện where chồng chéo. Thì chúng ta viết scope ở Model A trước :
      `scope: model_a_join_model_b_valid, ->{join(b).where(...)}`
      Ta được tập kết quả từ model A JOIN với B và thỏa mãn 1 số điều kiện giữa 2 bảng.
      Tiếp tục ở model C ta join và lấy kết quả cần thiết:
      `scope: get_model_c_valid, ->{join(a).merge(A.model_a_join_model_b_valid).where(...)}`

  Như vậy ta đã giải quyết xong, tuy nhiên khó của cách này đó là các bạn cần phân tích, mổ xẻ xem nên join giữa bảng nào với bảng nào. Cách này cũng sẽ có 1 số ưu, nhược điểm.
  
  Nhược điểm:
  
- Như đã nói ở trên, cách này dùng Subquery ( Mỗi scope tách nhỏ dùng để merge đều là 1 câu query truy vấn ), nên performance k cao bằng join trực tiếp
    
 Ưu điểm: 
  
- Code ngắn đi rất nhiều, k có câu SQL dài.
- Dễ test, dễ fix bug ( Các bạn có thể test từng scope trước , biết đường từng giai đoạn đúng sai thế nào để chỉnh sửa cho phù hợp)
- Dễ review ( người đọc nhìn vào cũng dễ hiểu code hơn vì viết tách scope rất rõ ràng )
- Cần phân tích kĩ càng

Như mình phân tích ở trên các bạn hãy tùy vào từng trường hợp để biết lúc nào nên dùng join, lúc nào nên dùng subquery nhé.
  
## 2.2 Cẩn thận khi left_joins và merge

 Dùng join thì merge dễ, nhưng left_join thì k phải lúc nào cũng merge đc đâu nhé. Ví dụ ở trên ở model C nếu các bạn viết 
 `scope: get_model_c_valid, ->{left_joins(a).merge(A.model_a_join_model_b_valid).where(...)}`
 thì khi left joins giữa C và A sẽ có những record của C mà k tham chiếu tới record nào của A hết ( ko thỏa mãn điều kiện Join ), vậy thì ko thể gọi scope trong merge  đc, dẫn tới lỗi SQL.
 
## 2.3 Cơ chế join theo association

Khi Join giữa 2 Model thì cách viết số nhiều số ít phụ thuộc vào mối quan hệ của chúng nhé

Quan hệ 1 - n hoặc n- n : `Member.join(:products)` (product số nhiều ), `Member.joins(:groups)` ( groups số nhiều )

Quan hệ 1 -1 hoặc n -1 :` Member.join(:acount)` (acount số ít ), `Product.joins(:member)` ( member số ít )

Join nested cũng tương tự nhé !

Điều kiện where thì luôn luôn số nhiều rồi.

## 2.4 Truyền biến vào điều kiện JOIN

Khi làm việc SQL với bất kỳ ngôn ngữ nào chúng ta cũng không được phép truyền biến trực tiếp vào câu lệnh SQL vì điều này có thể khiến hacker lợi dụng và tấn công SQL Injecttion (Cụ thể các bạn có thể tìm hiểu thêm ).

Đối với where thì chúng ta truyền gián tiếp khá đơn giản, ví dụ : `Member.where("age > ? AND age < ? ", age_min, age_max)`
hoặc `Member.where("age > :min AND age < :max ", min: age_min, max: age_max)`
Tuy nhiên với join thì chúng ta không thể truyền kiểu này. Lúc đó các bạn phải sử dụng method sanitize_sql. Cách dùng như sau:
```
condition_joins = sanitize_sql(["JOIN product ON member.id = product.member_id AND product.sales > ? AND product.sales < ?", min_sales , max_sales ])
Member.joins(condition_joins)
```
Lưu ý : tham số của sanitize_sql phải là 1 array, sanitize sẽ chuyển array này thành câu lệnh SQL. 

sanitize_sql có thể dùng cho cả điều kiện WHERE
# 3. Kết
  Bài viết khá dài nên mình thật lòng cảm ơn những ai đã bỏ sức đọc tới đây!