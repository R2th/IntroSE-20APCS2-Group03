# Giới thiệu:
Chào các bạn. Hôm nay mình sẽ tạm không viết những kiến thức Android nữa mà sẽ viết rộng hơn một chút, đó là về lập trình. Đừng vội rời đi, có 2 lý do để bạn đọc bài viết này : Thứ nhất bạn là một lập trình viên, thứ 2 là bạn muốn trở thành một lập trình viên tốt hơn. Và như vậy, chúng ta đã có chung mục tiêu :D

Công việc chính của một lập trình viên chính là code, là lập trình. Vậy muốn trở thành một lập trình viên tốt hơn thì đơn giản chỉ là code tốt hơn, phải vậy không?

Khi viết một chương trình hay một function,  đầu tiên là lên ý tưởng, và tiếp theo là code và code cho đến khi nó chạy được, và sau đó ... à không có sau đó nữa.  Đa số chúng ta khi bắt đầu theo nghề đều như vậy, và đôi khi việc "làm cho xong" trở thành một thói quen khó bỏ. Và hậu quả để lại là một nùi code smell, gây khó khăn cho những người maintain, hay tiếp tục phần việc của bạn, và đôi khi người đó lại chính là bạn. Hãy thử nghĩ đến cảm giác khi vừa code vừa "nguyền rủa" người để lại những dòng code smell này, và người đó lại chính là bạn. Mình tin là đa số trong chung ta đã trải qua cảm giác này, không dễ chịu chút nào phải không?

Và đây là lúc để thay đổi lối code, hãy code clean hơn, trở nên chuyên nghiệp hơn.

# Nội dung:

![](https://images.viblo.asia/f198e061-8645-4f71-a13f-8f5494593d53.png)

Điều đầu tiên mà chúng ta cần phải biết những đặc điểm của Clean code:
1. Source Code phải thanh lịch: Hãy hình dung đến 2 chữ "thanh lịch", nó phải sạch sẽ, cảm thấy hứng thú khi đọc. Giống như khi bạn chăm chú đọc một bài văn hay vậy :relieved:
2. Code phải có tâm điểm (focus) : Mỗi fucntion, mỗi class, mỗi module chỉ thực hiện một chức năng duy nhất, không bị phân tán, bởi các context xung quanh.
3. Clean code thì được trau chuốt, người code ra nó đã dành thời gian đển giữ cho nó đơn giản và có trật tự nhất có thể. 
4. Chạy tốt trên tất cả các case : Đôi khi các function được tạo ra chỉ chạy tốt trên các case bình thường, còn các case "quái dị" thì xảy ra lỗi.
5. Tối ưu số lượng các class, method, function ...

Trên đây là những đặc điểm tiêu biểu của Clean code, vậy code thể nào để được những điều này?

## Đặt tên có ý nghĩa
Chọn một cái tên tốt cho source code có lẽ sẽ tốn thời gian, nhưng nó còn đỡ hơn nhiều so với việc phải đọc toàn bộ code mới có thể hiểu được nó có chức năng gì phải không nào ? Tên của một biến, hàm, class sẽ trả lời được các câu hỏi quan trọng như "nó làm gì? ", "tại sao nó tồn tại? " và "cách nó được sử dụng? ".

![](https://images.viblo.asia/e6ad5d37-5d05-45a8-8a7e-98b574c7ca46.jpg)


- **Class name**: các class và các object nên có tên là danh từ hoặc cụm danh từ như Customer, Account, Client,... Tránh cách từ như Manager, Processor, Data hoặc chứa thông tin trong tên của một class. Một tên class không nên là một động từ.
- **Method name**: nên được bắt đầu bằng một động từ hoặc một cụm động từ như postPayment(), deleteUser() , hoặc  saveScore(). Các method dùng để access vào các trường trong class thì nên được tên theo tên trường đó và đước trước là set/get. Ví dụ Class User có trường là name. Thì các method để đọc và ghi dữ liệu cho 2 trường này sẽ là setName(...) , getName().

Cùng xem đoạn code sau để thấy sự quan trọng của việc đặt tên biến : 

```
public List<Customer> getData()
    {
        var list1 = new List<Customer>();
        var data = ServiceRepository.GetPlainCustomers();
        foreach(var item in data)
        {
            if (item != null && item.IsValid)
                list1.Add(item);
        }
        return list1;
    }
```
Viết thế này 1 tháng sau đảm bảo nhìn lại chẳng hiểu gì =)) .
Cũng là một function nhưng được đặt tên biến, fucntion một cách đàng hoàng :

```
public List<Customer> getValidCustomers()
    {
        var validCustomers = new List<Customer>();
        var plainCustomers = ServiceRepository.GetPlainCustomers();
        foreach(var customer in plainCustomers)
        {
            if (customer != null && customer.IsValid)
                validCustomers.Add(customer);
        }
        return validCustomers;
    }
```
Các bạn có thể thấy rõ sự khác nhau khi đọc hiểu phải không nào. 
- **Pick one word per concept** : Chọn một từ cho một function trừu tượng gắn với nó (abstract funtion). Hơi khó hiểu một chút. Chẳng hạn khi một class kế thường nhiều các interface, mà trong các interface đó lại có nhiều các abstract funtion thì làm sao mà chúng ta có thể biết được method nào là của interface nào mà triển khai cho đúng logic.  Và giải pháp ở đây là chọn một từ (danh từ) giống với class/interface chứa abstract funtion đó. Ví dụ interface : ActionPostListener thì abstract fun của nó là savePost(), sharePost, deletePost()...
## Function:
Nguyên tắc đầu tiên cho một function là nó phải nhỏ nhất có thể, giải quyết một vấn đề duy nhất, khi nào cần thì gọi. Điều này giúp cho việc đọc code và tái sử dụng của nó trở nên dễ dàng hơn rất nhiều. 
### Function arguments:
* Một  function không nên có nhiều hơn 3 tham số truyền vào.  Khi một function dường như cần nhiều hơn 2 hoặc 3 argument, chúng ta nên gói nó vào trong một class hoặc struct của riêng nó. Việc giảm số lượng argument truyền vào có vẻ như là "ăn gian" nhưng không phải. Điều này sẽ giúp cho class ngắn gọn và dễ hiểu hơn. Ví dụ như chúng ta có một function là *ăn()* các tham số truyền vào có lẽ là "món chính", "món phụ", "canh", "nước chấm", "món tráng miệng"... dài quá, chỉ cần đơn giản gói nó vào class là Food, trong Food này sẽ định nghĩa các trường trên và truyền vào. Xong!

 
### Tránh hard code
* Hãy đặt tên cho các giá trị là số, string một cách ý nghĩa, điều này có thể tránh được cảm giác khó hiểu cho người đọc code như "giá trị này là gì?", "nó chui từ đâu ra" ?... Ví dụ:

```
fun getDiscountPrice(productCode: Int): Int {
    if (productCode in 5..10) {
        return 75
    } else {
        return 100
    }
}
```
* Nhìn vào chả hiểu gì phải không nào. giá trị 5, 10 là gì? 75 ?...
Và sau khi "làm đẹp"

```
fun getDiscountPrice(productCode: Int): Int {
    if (productCode in DISCOUNTED_PRODUCT_CODES) {
        return DISCOUNT_PRICE
    } else {
        return ORIGINAL_PRICE
    }
}
val DISCOUNTED_PRODUCT_CODES = 5..10
const val DISCOUNT_PRICE = 75
const val ORIGINAL_PRICE = 100
```
* Có thể cần phải code dài hơn, nhưng rõ ràng là dễ hiểu hơn nhều đúng không, vì thế nên hãy định nghĩa mọi thứ.

### Tái sử dụng:
![](https://images.viblo.asia/d2651f64-b5a4-4626-8183-cd32e8453890.jpg)

* Trong một dự án thực tế, đôi khi có rất nhiều các sự trung lặp về logic, các instance. Cứ mỗi lần sử dụng những thứ này lại phải đi định nghĩa lại chúng sẽ tốn rất nhiều thời gian, lãng phí efford và duplicate code. Hãy tối ưu những fucntion, logic để có thể tái sử dụng lại ở nhiều nơi. Nếu trong một class sử dụng nhiều đoạn logic giống nhau, hãy tách logic đó ra thành một method và ở đâu cần sử dụng chỉ cần gọi method đó. Còn trong một dự án tái sử dụng một method nhiều lần hãy tạo ra một public constant, đưa method đó vào. Nơi nào cần nơi đó gọi.

# Kết luận:
* Trên đây là một vài kinh nghiệm về Clean code của mình sau một thời gian làm việc thực tế. Hi vọng nó có thể giúp bạn tốt hơn trong quá trình coding.
* Nếu có bất cứ gì chưa ổn, hãy để nó dưới phần bình luận nhé.

**Best regard, Bye!**