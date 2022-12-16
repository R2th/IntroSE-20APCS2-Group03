Như [chú Bob](https://en.wikipedia.org/wiki/Robert_C._Martin) đã nói trong cuốn sách của mình,
> **Bạn đang đọc bài viết này với hai lý do. Thứ nhất, bạn là lập trình viên. Hai là bạn muốn trở thành một lập trình viên tốt hơn. — Robert C. Martin**
> 
Giống như chú ấy đã nói, hãy tưởng tượng rằng bạn đang ở trong thư viện, và bạn đang tìm kiếm vài quyển sách. Nếu thư viện sắp xếp và phân loại từng loại sách, bạn sẽ tìm thấy những cuốn sách của bạn nhanh hơn. Ngoài ra, thiết kế nội thất thoáng mát và đẹp mặt sẽ tạo cho bạn cảm giác thoải mái bên trong thư viện trong khi bạn tìm kiếm những cuốn sách của bạn.

Giống như khi viết sách, nếu bạn muốn viết một cái gì đó tuyệt vời, bạn phải biết viết như nào và tổ chức gọn gàng ra sao. Nếu các thành viên khác trong team bạn, hoặc ai đó đọc code của bạn, họ chỉ đọc tên biến hoặc packageName hoặc class và họ hiểu đúng những gì bạn viết, họ sẽ không thét lên rằng: "F***", đống "MỨT" này là thằng nào viết (yaoming)

#### Vậy Clean code là cái khỉ gì?

![](https://images.viblo.asia/0d8f419d-1459-4df3-b225-c79443ec70ad.png)https://images.viblo.asia/0d8f419d-1459-4df3-b225-c79443ec70ad.png

Như bạn thấy đấy, sẽ chẳng tốt đẹp gì nếu như bạn viết code nhanh chóng nhưng chỉ mình bạn hiểu, thằng khác join vào thì lại chả hiểu cái m* gì đang xảy ra, mày viết như thế này có ý nghĩa gì, chạy nó ra làm sao ....

Code của bạn được coi là "Clean" nếu có thể được hiểu một cách rõ ràng bởi các thành viên trong team. Clean code  có thể đọc và phát triển bởi developer khác, với sự dễ hiểu, dễ thay đổi, dễ bảo trì, dễ mở rộng.


#### Sao tao phải quan tâm đến Clean code?

Lý do tại sao bạn phải quan tâm đến code của mình là code của bạn sẽ mô tả quá trình suy nghĩ của bạn cho người khác. Đó là lý do tại sao bạn phải bắt đầu suy nghĩ về việc làm cho code của bạn thanh lịch hơn, đơn giản và dễ đọc hơn.


#### Các đặc điểm của Clean code?

1. **Code của bạn phải thật thanh lịch:** Code của bạn sẽ khiến bạn mỉm cười theo cách một hộp nhạc được chế tạo tốt hoặc chiếc xe được thiết kế tốt.
2. **Code của bạn đã được chăm sóc**: Ai đó đã dành thời gian để giữ cho nó đơn giản và có trật tự. Họ đã chú ý đến chi tiết thích hợp. Họ đã quan tâm.
3. **Mã của bạn phải được tập trung**: Mỗi chức năng, mỗi lớp, mỗi mô-đun thể hiện một thái độ duy nhất không bị phân tán và không bị ô nhiễm bởi các chi tiết xung quanh.
4. **Không chứa sự trùng lặp**
5. **Chạy tất cả các test case**
6. **Giảm thiểu số lượng entity như các class, phương thức, hàm và tương tự.**

###
> **Một điểm khác biệt giữa lập trình viên thông minh và lập trình viên chuyên nghiệp là chuyên gia hiểu rằng sự rõ ràng là vua. Chuyên gia sử dụng quyền hạn của họ cho tốt và viết code mà những người khác có thể hiểu. - Robert C. Martin**
> 


### Create Meaningful Names

Chọn tên tốt mất thời gian nhưng tiết kiệm nhiều hơn nó. Tên của một biến, hàm hoặc lớp, sẽ trả lời tất cả các câu hỏi lớn. Nó sẽ cho bạn biết tại sao nó tồn tại, nó làm gì và sử dụng nó như thế nào. Nếu một cái tên yêu cầu một bình luận, thì cái tên đó không tiết lộ ý định của nó.

```kotlin
// Bad variables naming
var a = 0 // user ages
var w = 0 // user weight
var h = 0 // user height


// Bad functions naming
fun age()
fun weight()
fun height()


// Bad classes naming to get user data
class UserInfo()


// Best practices varibales naming
var userAge = 0
var userWeight = 0
var userHeight = 0


// Best practices functions naming
fun setUserAge()
fun setUserWeight()
fun setUserHeight()


// Best practices classes naming to get user data
class Users()
```


### — Class Names

Các class  và Object nên có tên danh từ hoặc cụm danh từ như Customer, WikiPage, Account và Address. Tránh các từ như Manager, Processor, Data, or Info trong tên của một Class. Một tên class không nên là một động từ.


### — Method Names

Các phương thức nên có tên động từ hoặc cụm động từ như postPayment, deletePage hoặc save. Các Accessors, mutators, và predicates phải được đặt tên theo giá trị của chúng và được thêm tiền tố với get, set và theo tiêu chuẩn javabean.


### — Use Problem Domain Names
Khi không có lập trình viên khác cho những gì bạn làm, hãy sử dụng tên từ miền vấn đề. Ít nhất là lập trình viên maintain code của bạn có thể hỏi một chuyên gia tên miền về ý nghĩa của nó.

### Writing your code using S.O.L.I.D Principles

Nguyên tắc này được phát minh bởi Robert C. Martin (Chú Bob), S.O.L.I.D là một thuật ngữ mô tả một tập hợp các nguyên tắc thiết kế cho mã tốt.

#### Single Responsibility Principle — SRP
Nó có nghĩa là mỗi lớp nên có một trách nhiệm duy nhất. Không bao giờ nên có nhiều hơn một lý do để một lớp thay đổi. Chỉ vì bạn có thể thêm mọi thứ bạn muốn vào lớp của bạn không có nghĩa là bạn nên. Chia các lớp lớn thành các lớp nhỏ hơn và tránh các Lớp Cha.

Hãy lấy một ví dụ: Chúng tôi có một RecyclerView.Adadapter với logic nghiệp vụ bên trong onBindViewHolder.

```kotlin
class MyAdapter(val friendList: List<FriendListData.Friend>) :
    RecyclerView.Adapter<CountryAdapter.MyViewHolder>() {

    inner class MyViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var name: TextView = view.findViewById(R.id.text1)
        var popText: TextView = view.findViewById(R.id.text2)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val friend = friendList[position]
        
        val status = if(friend.maritalStatus == "Married") {
            "Sold out"
        } else {
            "Available"
        }
        
        holder.name.text = friend.name
        holder.popText.text = friend.email
        holder.status.text = status
    }

    override fun getItemCount(): Int {
        return friendList.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_friendlist, parent, false)
        return MyViewHolder(view)
    }
}
```

Nó làm cho RecyclerView.Adapter không có một Trách nhiệm duy nhất vì nó có logic nghiệp vụ bên trong onBindViewHolder. Method này chỉ chịu trách nhiệm thiết lập dữ liệu vào biểu diễn khung nhìn của nó.

#### Open-Closed Principle — OCP

Các thực thể phần mềm nên open for extension nhưng closed for modification
Điều đó có nghĩa là nếu bạn viết Lớp A, và sau đó đồng đội của bạn muốn thực hiện sửa đổi trong một chức năng bên trong Lớp A, Họ có thể dễ dàng làm điều đó bằng cách mở rộng Lớp A, thay vì thực hiện sửa đổi bên trong Lớp A.


Ví dụ dễ dàng sẽ là lớp RecyclerView.Adapter. Bạn có thể dễ dàng mở rộng class này và CustomAdapter của riêng bạn với hành vi tùy chỉnh mà không cần sửa đổi lớp RecyclerView.Adapter hiện có.


```kotlin
class FriendListAdapter(val friendList: List<FriendListData.Friend>) :
    RecyclerView.Adapter<CountryAdapter.MyViewHolder>() {

    inner class MyViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var name: TextView = view.findViewById(R.id.text1)
        var popText: TextView = view.findViewById(R.id.text2)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val friend = friendList[position]
        holder.name.text = friend.name
        holder.popText.text = friend.email
    }

    override fun getItemCount(): Int {
        return friendList.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_friendlist, parent, false)
        return MyViewHolder(view)
    }
}
```


#### Liskov Substitutions Principle — LSP

> Các lớp con không bao giờ nên phá vỡ các định nghĩa kiểu của lớp cha.
> 

Điều đó có nghĩa là một lớp con sẽ ghi đè các phương thức từ một lớp cha không phá vỡ chức năng của lớp cha. Ví dụ: bạn tạo một lớp giao diện có trình nghe onClick () và sau đó bạn áp dụng trình nghe trong MyActivity và cung cấp cho nó một hành động nướng bánh mì khi gọi onClick ()

```kotlin
interface ClickListener {
    fun onClick()
}

class MyActivity: AppCompatActivity(), ClickListener {

    //........
    override fun onClick() {
        // Do the magic here
        toast("OK button clicked")
    }

}
```


#### Interface Segregation Principle — ISP

Nguyên tắc phân tách giao diện (ISP) nói rằng không có máy khách nào bị buộc phải phụ thuộc vào các phương thức mà nó không sử dụng. Điều đó có nghĩa là nếu bạn muốn tạo Lớp A và triển khai nó trong một lớp khác ((Lớp B), thì không nên ghi đè tất cả các phương thức Lớp A bên trong lớp B. Để làm cho nó rõ ràng và dễ hiểu,

Hãy để lấy một mẫu: bên trong hoạt động của bạn, bạn cần triển khai SearchView.OnQueryTextListener () và chỉ cần phương thức onQuerySubmit ().

```kotlin
mSearchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener{
    override fun onQueryTextSubmit(query: String?): Boolean {
        // Only need this method
        return true
    }

    override fun onQueryTextChange(query: String?): Boolean {
        // We don't need to implement this method
        return false
    }
})
```

Làm thế nào để đạt được điều đó? đơn giản, bạn chỉ cần tạo một cuộc gọi lại và một lớp mở rộng đến SearchView.OnQueryTextListener ().

```kotlin
interface SearchViewQueryTextCallback {
    fun onQueryTextSubmit(query: String?)
}

class SearchViewQueryTextListener(val callback: SearchViewQueryTextCallback): SearchView.OnQueryTextListener {
    override fun onQueryTextSubmit(query: String?): Boolean {
        callback.onQueryTextSubmit(query)
        return true
    }

    override fun onQueryTextChange(query: String?): Boolean {
        return false
    }
}
```

Và đây là cách thực hiện trong khung nhìn:

```kotlin
val listener = SearchViewQueryTextListener(
    object : SearchViewQueryTextCallback {
        override fun onQueryTextSubmit(query: String?) {
             // Do the magic here
        } 
    }
)
mSearchView.setOnQueryTextListener(listener)
```


Hoặc, nếu bạn đang sử dụng Kotlin, bạn có thể sử dụng Chức năng mở rộng:


```kotlin
interface SearchViewQueryTextCallback {
    fun onQueryTextSubmit(query: String?)
}

fun SearchView.setupQueryTextSubmit (callback: SearchViewQueryTextCallback) {
    setOnQueryTextListener(object : SearchView.OnQueryTextListener{
        override fun onQueryTextSubmit(query: String?): Boolean {
            callback.onQueryTextSubmit(query)
            return true
        }

        override fun onQueryTextChange(query: String?): Boolean {
            return false
        }
    })
}
```

Và cuối cùng, đây là cách thực hiện trong khung nhìn:

#### Dependency Inversion Principle — DIP
> Phụ thuộc vào Trừu tượng. Đừng phụ thuộc vào bê tông hóa.
> 
Chú Bob Định nghĩa của Nguyên tắc đảo ngược phụ thuộc bao gồm hai điểm:
1. Các mô-đun cấp cao không nên phụ thuộc vào các mô-đun cấp thấp. Cả hai nên phụ thuộc vào trừu tượng.
2. Trừu tượng không nên phụ thuộc vào chi tiết. Chi tiết nên phụ thuộc vào trừu tượng.


Các mô-đun cấp cao, cung cấp logic phức tạp, có thể dễ dàng sử dụng lại và không bị ảnh hưởng bởi các thay đổi trong các mô-đun cấp thấp, cung cấp các tính năng tiện ích. Để đạt được điều đó, bạn cần đưa ra một sự trừu tượng tách rời các mô-đun cấp cao và cấp thấp với nhau.


Ví dụ dễ hiểu là trong mẫu MVP, bạn có một đối tượng giao diện giúp chúng ta giao tiếp với các lớp cụ thể. Điều đó có nghĩa là gì, các lớp UI (Activity / Fragment) không cần biết cách triển khai thực tế của các phương thức trong Presenter. Vì vậy, nếu bạn có bất kỳ thay đổi nào bên trong người thuyết trình, các lớp UI don don cần biết hoặc quan tâm đến các thay đổi.


Hãy để xem nó trong ví dụ mã này:

```kotlin
interface UserActionListener {
    fun getUserData()
}

class UserPresenter : UserActionListener() {
    // .....
  
    override fun getUserData() {
        val userLoginData = gson.fromJson(session.getUserLogin(), DataLogin::class.java)
    }
  
    // .....
}
```

Bây giờ hãy để Lừa thấy nó trong UserActivity:

```kotlin
class UserActivity : AppCompatActivity() {
   
   //.....
   val presenter = UserPresenter()
   
   override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(savedInstanceState)
      
      // Activity doesn't need to know how presenter works
      // for fetching data, it just know how to call the functions
      // So, if you add method inside presenter, it won't break the UI.
      // even the UI doesn't call the method.
      
      presenter.getUserData()
   }
   
   //....
}
```

Vì vậy, những gì chúng tôi làm là chúng tôi tạo ra một giao diện trừu tượng hóa việc triển khai của người thuyết trình và lớp khung nhìn của chúng tôi giữ tham chiếu của PresenterInterface

### Tổng kết

Các lập trình viên trưởng thành biết rằng ý tưởng rằng mọi thứ là một đối tượng là một huyền thoại. Đôi khi bạn thực sự muốn cấu trúc dữ liệu đơn giản với các thủ tục hoạt động trên chúng. Từ bây giờ, bạn phải bắt đầu suy nghĩ về những gì cần thực hiện và về viễn cảnh trong tương lai sẽ dễ dàng cập nhật. Tôi biết rằng nếu bạn đã tạo một ứng dụng trước đây với cách đặt tên vô nghĩa, các lớp Chúa, mã Spaghetti, hãy tin tôi, tôi đã làm điều tương tự. Đó là lý do tại sao tôi chia sẻ kiến ​​thức của mình về Bộ luật sạch từ chú Bob cho bạn và đó cũng là một lời nhắc nhở cho tôi và tôi hy vọng tôi có thể giúp bạn hiểu nó. Cuối cùng nhưng không kém phần quan trọng, Bình luận / Gợi ý luôn được chào đón. Hãy tiếp tục học hỏi và tiếp tục chia sẻ.  Happy coding :)