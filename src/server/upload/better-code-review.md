![](https://images.viblo.asia/6f1618ec-38a5-4a0e-8a60-2655bbdd803f.png)

---

**Review code** là một phần quan trọng trong quá trình phát triển phần mềm (**software development**).

Việc review code tốt sẽ đảm bảo chất lượng sản phẩm, cũng như thể hiện khả năng teamwork giữa các member cũng như leader trong team. :four_leaf_clover:

Trong bài post này, mình sẽ nói về những hướng tiếp cận cũng như những điều nên làm để việc review trở nên có hiệu quả.

---

### Coi pull requests (PRs) là những blackbox cần phải khám phá
#### Tại sao PR được tạo ?
Trước khi đọc một cái gì đó (bài viết, cuốn sách, ...) ta cần phải biết nó nói về cái gì. 

Trước khi giải quyết 1 bài toán, ta cần phải biết yêu cầu đề bài và các dữ kiện đã cho là gì.

Trước khi review một PR, ta cần phải biết nó được tạo ra để làm gì, việc này có được khi ta đọc tiêu đề PR (title), mô tả của PR (description) hoặc thảo luận trực tiếp với PR Owner (người tạo PR).

#### Đọc tất cả commit messages trong PR
Trong quá trình review, PR owner sẽ push thêm những commits mới (bổ sung phần thiếu sót, fix comments).

Những commit này cần được đặt tên phù hợp với những gì commit này làm, việc đọc các commit message này giúp reviewer biết được những commit này làm gì, thuận tiện cho việc theo dõi và review code.

---

### Tập trung vào những phần chính trong PR
#### Chia các phần cần review theo thứ tự ưu tiên
Một PR có rất nhiều khía cạnh để review, và sẽ có những khía cạnh cần được đặt độ ưu tiên cao hơn các khía cạnh còn lại  :soccer: .

Ví dụ, việc cứ tập trung vào comment các issue về `code styles`, `typo` hay `indent` trong khi các function hay business logic thậm chí còn chưa chính xác :frowning: .

Mỗi team development cần follow theo cùng một list các khía cạnh cần review theo độ ưu tiên từ cao tới thấp. Ví dụ: 

1. `Business logic`
2. `Functionalities`
3. `Logical correctness`
4. `Performance`
5. `Test Coverage`
6. `Code styles`, `typo`, `indent`

#### Review các phần theo giai đoạn nếu cần

Theo list ở trên, có rất nhiều khía cạnh cần phải review, đồng nghĩa với việc có thể sẽ có rất nhiều thứ cần phải comment :thinking: .

Giải pháp ở đây là nên chia review theo các giai đoạn follow theo list thứ tự ưu tiên đã đề ra từ trước, giảm sự quá tải cho PR owner :grin: . 

Comment các issue liên quan đến những khía cạnh được ưu tiên hàng đầu (`Business logic` chả hạn), PR owner sẽ fix các issue đó trong một commit mới, tiếp đó sẽ tiếp tục các khía cạnh phía sau.

---

### Đưa ra các good comments
#### Đưa ra các suggestions comments
Thay vì phàn nàn code tệ, code xấu thì nên đưa các gợi ý, ý tưởng của mình tới PR owner :grinning:

#### Theo tinh thần thảo luận chứ không phải chỉ đạo
Ta làm việc theo team, mỗi member cũng có cái tôi của riêng mình :grinning: .

Mọi người làm việc vì lợi ích chung của team, mọi member cần có ý kiến, quan điểm của riêng mình, và các member cần lắng nghe, đóng góp để cải thiện vấn đề được tốt hơn.

Khi mong muốn một sự thay đổi nào đó, thay vì chỉ đạo owner phải làm như thế này, cần thuyết phục owner lí do tại sao mình muốn thay đổi như thế này.

#### Phân chia các ý theo dạng danh sách

Các comment (nếu nhiều ý) có thể phân chia rõ ràng, mạch lạc theo từng mục, ví dụ:
```
     - Issue 1
     - Issue 2
     - Issue 3
     ...
```

Giúp owner và những member khác dễ dàng trong việc đọc hiểu ý tưởng của bạn.