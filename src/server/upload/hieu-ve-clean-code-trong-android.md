Như [Uncle Bob](https://en.wikipedia.org/wiki/Robert_C._Martin) đã nói trong sách của ông ấy , 
  >### You are reading this “article” for two reasons. First, you are a programmer. Second, you want to be a better programmer. — Robert C. Martin

Hãy tưởng tượng, bạn đang ở trong một thư viện, và bạn đang tìm một vài cuối sách, Nếu thư viện sắp xếp, phân loại rõ ràng, bạn sẽ nhanh chóng tìm thấy cuốn sách bạn mong muốn. Ngoài ra không gian của thư viện (thiết kế và kiến trúc) sẽ khiến bạn cảm thấy thoải mái khi đang tìm kiếm sách. 

Cũng giống như viết sách, nếu bạn muốn "build" thứ gì đó thật "great", bạn cần biết cách viết và tổ chức code như thế nào. Và nếu bạn có team member hoặc ai đó cùng teamwork, họ cần biết  các  variable names hoăc  packages hoặc classes name và hiểu chúng một cách chính xác. Họ cũng sẽ ko cần phải thốt lên "ĐCM - code như cc" và bắt đầu code lại từ zero :)))

## “Clean Code” là gì ?

![](https://images.viblo.asia/ad2b9b4d-cb09-48d7-8e30-8b8fe636fac4.png)

Như mọi người đã biết, sẽ là không đủ tốt khi chỉ code nhanh mà người khác không thể hiểu code của bạn, bởi nó sẽ trở thành một mớ hỗn lộn về sau này (cho người khác và cả chính bạn)

Code được định nghĩa là "Clean" khi nó có thể được hiểu một cách dễ dàng bởi tất cả các thành viên trong team. Code có thể đọc và cải tiến bởi những developer khác (ngoài author). 

Tóm lại "Clean code " là code dễ hiểu. ***Với sự dễ hiểu đi kèm là dễ đọc, dễ thay đổi, mở rộng và bảo trì.***

Vậy nó có cần thiết không ? Câu trả lời là có ! Code của bạn sẽ mô tả quá trình suy nghĩ của bạn cho người khác. Đó là lý do tại sao bạn phải bắt đầu suy nghĩ về việc làm cho code của bạn  đơn giản và dễ đọc hơn.

##  Những tiêu chí của Clean Code 

* Code phải "Thanh thoát"  :
Code của bạn phải sử dụng một cách đơn giản, nhẹ nhàng và đúng theo cách mà nó được sử dụng. Cách viết phải đồng đều, giống như các dòng code khác trong project vậy! 
* Code phải được chăm chút : 
Chăm chút ở đây nghĩa là bạn phải  thật sự chú ý đến từng dòng code. Mỗi dùng code, mỗi ký tự đều phải được tối ưu. 
* Code phải có sự chuyên biệt : 
Mỗi Function, class, module đều thực hiện một nhiệm vụ duy nhất và không bị ảnh hưởng bởi những yếu tố khác. 
* Code ko bị duplication
* Pass các test 
* Sử dụng tối thiểu các classes, methods, functions 

 >### One difference between a smart programmer and a professional programmer is that the professional understands that clarity is king. Professionals use their powers for good and write code that others can understand. — Robert C. Martin
 
##  Tạo Tên biến có ý nghĩa 

Việc đặt một tên tốt thì mất thời gian, nhưng nó sẽ đỡ tốn thời gian hơn rất nhiều khi ta đọc và mở rộng code. Tên của variable, function, hoặc class sẽ trả lời những câu hỏi cho chính nó. Như là tại sao nó cần tồn tại, nó làm gì và nó được sử dụng ra sao. Nếu một biết cần comment để trả lời những câu hỏi trên, thì nó là một "bad name" rồi! 

Ví dụ : 

```
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
class User()
```

**— Class Names** 

Classes  và objects  nên có tên danh từ hoặc cụm danh từ như Customer, WikiPage, Account,  AddressParser. Hãy tránh sử dụng động từ cho các Classes  và objects. 

**— Method Names**

Khác với classes và object, Method nên được đặt tên là các động từ hoặc cụm động từ như  postPayment, deletePage, or save. Accessors, mutators. Các vị từ phải được đặt tên cho giá trị của chúng và được thêm tiền tố với get, set và theo tiêu chuẩn javabean.

**— Use Problem Domain Names**

Hãy sử dụng Domain với ý nghĩa của công việc nó đảm nhiệm. Ít nhất để programmer - người sẽ maintains dự án của bạn ó thể hiểu được nó là gì ! 

## Viết code theo nguyên tắc S.O.L.I.D

SOLID là một tập hợp các nguyên tắc để code một cách Clean nhất . Hãy cùng dạo qua một lượt nhé ! 

**Single Responsibility Principle — SRP**

Đơn giản là mỗi class chỉ đảm nhiệm một nhiệm vụ duy nhất . Không bao giờ nên có nhiều hơn một lý do để một Class thay đổi. Nếu một lớp có nhiều hơn một nhiệm vụ, hãy break nó ra thành các class nhỏ hơn để thực hiện các nhiệm vụ riêng biệt ! 

Ví dụ : 
Bạn có  **RecyclerView.Adapter** với business logic trong **onBindViewHolder**.

```
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

Điều này khiến  RecyclerView.Adapter  không đảm bảo nguyên tắc chỉ có một nhiệm vụ duy nhất bởi  business logic  ở trong  onBindViewHolder. Method này nên chỉ thiết lập dữ liệu cho việc setting data mà thôi . 

**Open-Closed Principle — OCP**

Các entities nên  **open for extension** nhưng  **closed for modification**. Tức là, nếu bạn viết Class A và sau đó một member khác muốn sửa đổi một function trong Class A , thì họ dễ dàng mở rộng Class A ,  thay vì trực tiếp sửa class này. 

Một ví dụ đơn giản là  **RecyclerView.Adapter** class. Bạn có thể dễ dàng extend class và tạo ra custom adapter với custom hành vi mà bạn muốn và không phải sửa đổi Class RecyclerView.Adapter có sẵn. 

```

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

**Liskov Substitutions Principle — LSP**

> Child classes should never break the parent class’ type definitions.

Nghĩa là các subclass sẽ override các methods từ class cha mà không break function từ class cha . Ví dụ, bạn tạo ra interface class có **onClick()** listener,và bạn phải apply nó vào trong **MyActivity** và có thêm action Toast khi onClick 

```
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

** Interface Segregation Principle — ISP**

>The interface-segregation principle (ISP) states that no client should be forced to depend on methods it does not use.


Nếu bạn tạo class A và implement nó vào class khác ( ví dụ là class B) , thì không cần phải override toàn bộ class A methods vào trong class B . 
Ví dụ : 
Trong activity, bạn muốn implement **SearchView.OnQueryTextListener()**  và chỉ cần **onQuerySubmit()** method . 

```
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

Vậy làm thế nào để thực hiện viêc trên ? Đơn giản, bạn chỉ cần thêm callback là được ! 

```
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
```

** Dependency Inversion Principle — DIP**

>Depend on Abstractions. Do not depend on concretions.

Có 2 điểm cần lưu ý : 

* Các mô-đun cấp cao không nên phụ thuộc vào các mô-đun cấp thấp. Cả hai nên phụ thuộc vào Abstractions.
* Abstractions không nên phụ thuộc vào chi tiết. Chi tiết nên phụ thuộc vào Abstractions.

Các mô-đun cấp cao, cung cấp logic phức tạp, có thể dễ dàng sử dụng lại và không bị ảnh hưởng bởi các thay đổi trong các mô-đun cấp thấp, cung cấp các tính năng tiện ích.Để đạt được điều đó, bạn cần đưa ra một sự trừu tượng tách rời các mô-đun cấp cao và cấp thấp với nhau.

Ví dụ dễ hiểu là trong mẫu MVP, bạn có một đối tượng giao diện giúp chúng ta giao tiếp với các lớp cụ thể. Điều đó có nghĩa là gì, các lớp UI (Activity / Fragment) không cần biết cách triển khai thực tế các phương thức trong Presenter. Vì vậy, nếu bạn có bất kỳ thay đổi nào bên trong Presenter, các lớp UI  không  cần biết hoặc quan tâm đến các thay đổi.

Ví dụ :
UserPresenter.kt 

```

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

UserActivity.kt

```
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

## Tạm kết 

Mong rằng qua bài biết này, mọi người có thêm kiến thức và hiểu biết về clean code. Mong rằng trong thời gian tới, code sẽ luôn Clean để mình thật professional hơn ! 

Nguồn : https://medium.com/mindorks/understanding-clean-code-in-android-ebe42ad89a99