# Mở bài:
* Chào các bạn! Khi đến với bài viết này, hẳn là các bạn đã nghe đến Kotlin hoặc đang sử dụng nó. Kotlin và Java hiện là 2 ngôn ngữ native chính trong Android app. Nói về ngôn ngữ nào tốt hơn thì khá là dài dòng và cũng có nhiều tranh cãi. Tuy nhiên khi đề cập đến tốc độ viết code, sự hỗ trợ của SDK, số lượng code thì mình có thể chắc chắn rằng Kotlin hỗ trợ developer tốt hơn, ít rủi ro hơn (cơ chế Null safety giúp developer có thể hạn chế được nhiều lỗi crash do NullPointerExceptions). Với cùng một output trả về Kotlin đưa ra số lượng code ngắn hơn đáng kể so với Java trong hầu hết trường hợp... Mà như "giang hồ" vẫn hay đồn thì "Code càng ngắn, bug càng ít" =))
* HÌnh như mình lang mang hơn nhiều. Trong bài viết này chúng ta sẽ nói về một vài lambda functions mà Kotlin đã cung cấp để thao tác với collection. Những function này có thể giúp chúng ta giải quyết với những cấu trúc data phức tạp một cách dễ dàng và gọn gàng hơn.  

![](https://images.viblo.asia/22b1119f-c047-4276-9bfe-524314abce2b.png)


# Thân bài
* Một trong những tính năng hay ho mà Kotlin đã cung cấp cho chúng ta là việc truyền một method vào một method khác như là truyền parameter hoặc chứa giá trị trả về của method đó bằng cách gán vào một variable. Điều này làm cho chúng ta có thể tận dụng tối đa các collection function mà kotlin đã cung cấp để giải quyết vấn đề nhanh và ngắn hơn.
* Bây giờ chúng ta sẽ định nghĩa một tập dữ liệu mẫu sử dụng trong bài viết này như sau:

```
data class User(val name:String,val age:Int)
val list = listOf<User>(
    User("Bao",24),
    User("Phuc",22),
    User("Nhat",24),
    User("Hoang",21),  
    User("Long",19),  
    User("Ngan",18)
)
```

### Q1. Kiểm tra xem có bất kỳ User có age lớn hơn 22 không?
* Như một phản xạ của developer là chúng ta sẽ dùng vòng lặp duyệt hết toàn bộ users và dùng dùng `If` để check xem có user nào có độ tuổi lớn hơn 22. Nhưng thay vì phải viết nhiều code như vậy Kotlin đã cung cấp cho chúng ta cách để làm điều này ngắn gọn hơn rất nhiều:
    * `any()` : trả về **true** nếu có **ít nhất 1 phần tử** nào thỏa điều kiện cho trước.

```
val result = list.any{item->item.age>22} // result = True
```
* Một case khác cũng tương tự trong trường hợp này là Yêu cần kiểm tra xem tất cả user có lớn hơn 22 tuổi hay không.

    * **all()** : trả về **true** nếu **tất cả phần tử** đều thoản mãn điều kiện cho trước

```
val result = list.all{item->item.age>22} // result = False
```

* Một case nữa là Không có ai lớn hơn 22 tuổi.
    * `none()` : trả về **true** nếu **không có phần tử** nào thoản mãn điều kiện cho trước

```
val result = list.none{item->item.age>22} // result = False
```
Chúng ta có thể thấy rằng nó rất ngắn gọn và xúc tích phải không nào. Cùng tìm hiểu thêm những function thú vị khác nữa nào.
### Q2. Lọc những User có age lớn hơn 22?
* `filter()` :  Nó sử dụng một lambda như một func và apply lambda này vào để lọc ra tất cả các element thỏa mãn điều kiện:

```
val result1 = list.filter{item->item.age>22}
//output result = [User(name=Bao, age=24), User(name=Nhat, age=24)]
```
*  Một case khác cũng tương tự trong trường hợp này là Đếm xem có bao nhiều người trên độ tuổi 22

    * `count()` :  trả về số lượng element trong collection thỏa mãn điều kiện cho trước.

```
val result = list.count{user -> user.age > 22} //result = 2
```

### Q3. Tìm những User có tên là Nhat ?
* `find()` trả về phần tử **đầu tiên** thỏa điều kiện, nếu không có phần tử nào thì trả về null.

```
val result = list.find{user -> user.name == "Nhat"}
//output result = User(name=Nhat, age=24)
val result = list.find{user -> user.name == "Nht"}
//output result = null
```
* Một case tương tự có thể gặp là: 
    * `findLast()` : trả về phần tử **cuối cùng** thỏa điều kiện, nếu không có phần tử nào thì trả về null. 

```
val result = list.findLast{user -> user.age >= 24}
//output result = User(name=Nhat, age=24)
val result = list.findLast{user -> user.age > 24}
//output result = null
```
* Cũng có các func trả về kết quả tương tự như trên là 
    * `first()` trả vể element đầu tiên tìm được thỏa điều kiện hoặc ném về một NullPointerException nếu không có phần tử nào thỏa mãn.
    * `firstOrNull()` đây là một phiên bản an toàn hơn là trả về null nếu tìm không thấy thay vì ném về exception như `first()` .

```
val result = list.first{user -> user.age > 24}
//output NoSuchElementException
val result = list.first{user -> user.age >= 24}
//output User(name=Bao, age=24)
val result = list.firstOrNull{user -> user.age > 24}
//output null
```

*  Và ở đây còn có `last()` , `lastOrNull()` tương tự nhưng sẽ trả về **phần tử cuối cùng**  thay vì đầu tiên như `first` và `firstOrNull()` .

```
val result = list.last{user -> user.age >= 24}
//output User(name=Nhat, age=24)
val result = list.last{user -> user.age > 24}
//output
NoSuchElementException
val result = list.lastOrNull{user -> user.age > 24}
//output null
```
### Q4. Nhóm những User dựa trên độ tuổi ?
*  Kotlin có một method giúp chúng ta làm điều này một cách nhanh chóng đó là :
    *  `groupBy()` : tạo ra một map các element trong collection  sử dụng thuộc tính của function như một parameter. Trong ví dụ dưới đây, chúng ta muốn nhóm các users theo độ tuổi vì thế nên chúng ta chỉ cần truyền `use.age` như một parameter đóng vai trò như là *key* của map.

```
val result = list.groupBy{user -> user.age}

//result
24=[User(name=Bao, age=24), User(name=Nhat, age=24)] 
22=[User(name=Phuc, age=22)] 
21=[User(name=Hoang, age=21)] 
19=[User(name=Long, age=19)]
18=[User(name=Ngan, age=18)]
```
*  Có một function trả về kết quả tưởng tự đó là `associateBy()`. Và sự **khác biệt** giữa  `groupBy()` và `associateBy()` là : Nếu có nhiều giá trị trong một key, `associateBy()` sẽ trả về giá trị cuối cùng ứng với key đó thay vì trả về các list ứng với key như `groupBy()`.

```
val result = list.associateBy{user -> user.age}
//result
24=User(name=Nhat, age=24) 
22=User(name=Phuc, age=22) 
21=User(name=Hoang, age=21) 
19=User(name=Long, age=19)
18=User(name=Ngan, age=18)
```


-----

Đến với những function tiếp theo mình sẽ làm cho bộ data mẫu phức tạp hơn một chút như sau:

```
data class User(val name:String,val age:Int)
data class UserSection(
    val sectionName:String,
    val users:ArrayList<User>)
    
sectionName=A 
    users=[User(name=A0, age=20), 
    User(name=A1, age=21), 
    User(name=A2, age=22), 
    User(name=A3, age=23), 
    User(name=A4, age=24)]
sectionName=B 
    users=[User(name=B0, age=20), 
    User(name=B1, age=21), 
    User(name=B2, age=22), 
    User(name=B3, age=23), 
    User(name=B4, age=24)]
sectionName=C 
    users=[User(name=C0, age=20), 
    User(name=C1, age=21), 
    User(name=C2, age=22), 
    User(name=C3, age=23), 
    User(name=C4, age=24)]
```

### Q5. Trả về list tất cả các user ?
* `flatMap()` : Duyệt qua từng phần tử trong collection, sử dụng function biến đổi trên nó và sau đó trả về một danh sách kết quả duy nhất như sau:

```
val result = sectionList.flatMap{it.users}
//output
[User(name=A0, age=20),User(name=A1, age=21),User(name=A2, age=22),
User(name=A3, age=23),User(name=A4, age=24),User(name=B0, age=20),
User(name=B1, age=21),User(name=B2, age=22),User(name=B3, age=23),
User(name=B4, age=24),User(name=C0, age=20),User(name=C1, age=21),
User(name=C2, age=22),User(name=C3, age=23),User(name=C4, age=24)]
```
### Q6. Trả về list tất cả các user có tuổi lớn hơn 21 ?
* Và bây giờ chúng ta cần phải sử dụng nhiều hơn 1 function để giải quyết bài toán này

```
val result1 = sectionList.flatMap{it.users}.filter{it.age>21}
//output
[User(name=A2, age=22),User(name=A3, age=23),User(name=A4, age=24) User(name=B2, age=22),User(name=B3, age=23),User(name=B4, age=24) User(name=C2, age=22),User(name=C3, age=23),User(name=C4, age=24)]
```

### Q7. Trả về list tên của tất cả các user có tuổi lớn hơn 21 ?

```
val result2 = sectionList
        .flatMap{it.users}
        .filter{it.age>21}
        .map{it.name}
//output [A2,A3,A4,B2,B3,B4,C2,C3,C4]
```

# Kết bài
* Qua bài viết trên, chúng ta đã có thể biết thêm được một vài các function giúp giải quyết các bài toán dễ dàng và nhanh chóng hơn rồi phải không nào. Và có thể nói đây là một trong những lý do  tại sao mình nói sử dụng Kotlin lại cần ít code hơn Java (:D). Mình sẽ tiếp tục tìm kiếm các function hay hơn trong tương lai nếu như được nhiều người ủng hộ.
* Hi vọng bài viết hữu ích với các bạn trong quá trình sử dụng Kotlin. Nếu có gì bổ sung thì hãy để nó lại dưới phần comment nhé.
* Còn bây giờ thì Happy new year! :grin::grin:

## Tham khảo :
* https://kotlinlang.org/docs/reference/collections-overview.html
* https://medium.com/techshots/kotlin-collection-function-12fc3c16f579