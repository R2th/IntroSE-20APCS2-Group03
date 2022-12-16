Ở bài viết này chúng ta sẽ tìm hiểu cách sử dụng chi tiết và những lợi ích mà Gson đem lại cho chúng ta tuyệt vời như thế nào.
Bài viết tuy khá dài nhưng mình đã cố gắng việt hóa rất nhiều từ khóa :joy: hi vọng điều đó sẽ giúp cho các bạn, nhất là các bạn mới tìm hiểu sẽ rất dễ nắm bắt.
Nào hãy cùng mình đi mổ xẻ vấn đề thôi :grinning:
# 1. Tại sao Gson ra đời:
   Trước khi biết đến gson chắc các bạn đã từng Parse Json trong android bằng cách tạo ra các đối tượng JSONObject hoặc JSONArray. Nếu như đối tượng json của chúng ta khá phức tạp thì công việc đó trở nên rất khó khăn, tốn thời gian và nhiều code hơn, khiến dự án ta phình lên một cách không cần thiết.
   
   May mắn cho chúng ta là Google đã biết đến điều đó và tạo ra một thư viện vô cùng mạnh mẽ trong việc chuyển đổi tự động từ 'Object' sang 'json' và ngược lại. Nào chúng ta hãy bắt đầu tìm hiểu chức năng cụ thể của nó nào!
# 2. Cài đặt thư viện Json:
Chúng ta có những cách sau đây để cài đặt nó:

   * Thứ nhất: Cách mình vẫn hay sử dụng nhất là sử dụng grandle đặt vào mục dependencies.
    `implementation 'com.google.code.gson:gson:2.8.5`
    
   Ở đây bạn có thể kiểm tra version mới nhất của nó tại đây: [Github](https://github.com/google/gson)

   * Thứ hai: Sử dụng Maven:
   ```
   <dependencies>  
    <dependency>
        <groupId>com.google.code.gson</groupId>
        <artifactId>gson</artifactId>
        <version>2.8.5</version>
        <scope>compile</scope>
    </dependency>
</dependencies>
   ```
# 3. Gson làm được những gì?
### 3.1 Chuyển đổi qua lại giữa Json và Java Object chưa bao giờ dễ đến thế
Đầu tiên ta xem **cách chuyển đổi từ Object sang Json** trước nhé. Dữ liệu mình đang dùng chỉ là fake dưới local thôi nhé.
```
public class User {  
    String name;
    String email;
    int age;
    boolean isDeveloper;
    
    public User(String name, String email, int age, boolean isDeveloper) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.isDeveloper = isDeveloper;
    }
}
```
Đây là một class đơn giản mình đã tạo ra.

Tiếp theo thực hiện khởi tạo một đối tượng Gson và parse object của chúng ta thành json nào.
```
User user = new User("Sun", "dong.bin@sun-asterisk.com", "4", true)
Gson gson = new Gson(); 
String userJson = gson.toJson(user); 
```

Và đây là kết quả sau khi mình đã format cho các bạn dễ nhìn :
```
{
  "age": 4,
  "email": "dong.bin@sun-asterisk.com",
  "isDeveloper": true,
  "name": "Sun"
}
```
Các bạn có thể thấy phần json kết quả trả về có gì đặc biệt không nào. Nó có `{ key : value }` key là tên thuộc tính và value là phần giá trị mà ta khởi tạo ở trên. 
Ở đây là mình để mặc định nhé các bạn. Mình biết điều bạn đang thắc mắc nhưng để qua phần dưới nhé.

TIếp theo ta tìm hiểu cách **cách chuyển đổi từ Json  sang  Object** như thế nào nhé !
Ta có đoạn json:
```
String json = ""{\"age\":4,\"email\":\"dong.bin@sun-asterisk.com\","
                + "\"isDeveloper\":true,\"name\":\"Sun\"}""
```
Nào tương tự bước trên cùng tạo một đối tượng Gson và sử dụng phương thức fromJson để convert lại đối tượng của ta nào.
```
Gson gson = new Gson();
User user = gson.fromJson(json, User.class);
```
Xem kết quả nào:
![](https://images.viblo.asia/7b32b254-107d-436d-83bd-808f652f5b18.png)
Thật dễ dàng phải không mọi người.
### 3.2 Đối tượng lồng nhau thì làm thế nào ?
Ta có một lớp Address như bên dưới:
```
public class Address {
    private String street;
    
    private String houseNumber;
    
    private String city;
    
    private String country;

    public Address(String street, String houseNumber, String city, String country) {
        this.street = street;
        this.houseNumber = houseNumber;
        this.city = city;
        this.country = country;
    }
 }
```

```
public class NestedObject {

    private String name;
    
    private String email;
    
    private int age;
    
    private boolean isDeveloper;
    
    private Address address;

    public NestedObject(String name, String email, int age, boolean isDeveloper, Address address) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.isDeveloper = isDeveloper;
        this.address = address;
    }
}
```
Bắt đầu thực hiện nào!!!
```
Address address = new Address("ly thuong kiet", "tang 4 FHome", "Da Nang", "Viet Nam");
NestedObject nestedObject = new NestedObject("anh", "anh@gmail.com", 22, true, address);
String result = new Gson().toJson(nestedObject);
```
Bạn khoan hãy nhìn kết quả và hãy tự tưởng tượng thử nào ! :joy: 
Ở phần trên chúng ta đã thấy kết quả là nó sẽ parse nguyên một đối tượng sang json vậy thì bây giờ có thêm một đối tượng bên trong sẽ như thế nào?
Và đây:
```
{
  "userAddress": {
    "city": "Da Nang",
    "country": "Viet Nam",
    "houseNumber": "tang 4 FHome",
    "street": "ly thuong kiet"
  },
  "age": 22,
  "email": "anh@gmail.com",
  "isDeveloper": true,
  "name": "anh"
}
```
Wow. thật tuyệt vời. :blush:
Phần chuyển từ json trờ lại đối tượng không khác gì phần trước các bạn tự kiểm tra nhé :
```
Gson gson = new Gson();
NestedObject nestedObject = new Gson().fromJson(json, NestedObject.class);
```
### 3.3 Chuyển đổi qua lại của Array và List các Object:
Trong java có nhiều cách để lưu trữ kiểu dữ liệu danh sách. Nhưng ở đây chúng ta đề cập đến 2 cách đó là Array và List. Mỗi cái sẽ có sự khác nhau riêng trong việc parse qua json.
Trong định dạng của json thì nó không có khái niệm array và list. Vậy chỉ có sự khác biệt nằm ở phía java. Vậy bây giờ chúng ta hãy đi so sánh chúng qua một vài ví dụ bên dưới nhé.
**Chuyển đổi đối tượng sang json**
Cả array và list  đều tương tự như nhau nhé.
```
public class MenuItem {
    private String description;
    private float price;

    public MenuItem(String description, float price) {
        this.description = description;
        this.price = price;
    }
}
```
Tạo một lớp Restaurant với một List các đối tượng MenuItem
```
public class Restaurant {
    private String name;
    private List<MenuItem> menuItems;

    public Restaurant(String name, List<MenuItem> menuItems) {
        this.name = name;
        this.menuItems = menuItems;
    }
}
```
Xem kết quả nào
```
 List<MenuItem> menuItems = new ArrayList<>();
        menuItems.add(new MenuItem("egg", 12.5f));
        menuItems.add(new MenuItem("chicken", 2.5f));
        menuItems.add(new MenuItem("vegetable", 7.5f));
        menuItems.add(new MenuItem("pig", 11.55f));

 Restaurant menu = new Restaurant("VN Food", menuItems);
 String json = new Gson().toJson(menu, Restaurant.class);
```
Cùng xem kết quả nào:
```
{
  "menu": [
    {
      "description": "egg",
      "price": 12.5
    },
    {
      "description": "chicken",
      "price": 2.5
    },
    {
      "description": "vegetable",
      "price": 7.5
    },
    {
      "description": "pig",
      "price": 11.55
    }
  ],
  "name": "VN Food"
}
```
Thứ tự thuộc tính nó sắp xếp theo thứ tự bảng chữ cái nhé các bạn.

**Chuyển đổi json sang  đối tượng  **  

Ví dụ có một file json như thế này:
```
[
  {
    "name": "Hoa Hong",
    "count": 1
  },
  {
    "name": "Hoa Lan",
    "count": 3
  },
  {
    "name": "Hoa Mai",
    "count": 2
  }
]
```
Ta có một class tương ứng với json như sau:
```
public class Flower {
    @SerializedName("name")
    private String mName;

    @SerializedName("count")
    private int mCount;
}
```

Trường hợp 1: Ta muốn trả về 1 mảng các đối tượng.
```
// file json mình đã để bên trên
Flower[] flowers = new Gson().fromJson(json, (Type) Flower[].class);
```
Trường hợp 2: Ta muốn trả về 1 list các đối tượng
Chúng ta không thể trực tiếp parse ra list các đối tượng từ json. Để cho Gson hiểu cấu trúc List đó bạn phải chỉ ra kiểu của nó. 
Thật là may mắn. Gson có một lớp TypeToken để giúp chúng ta tìm đúng kiểu của dữ liệu.
```
// file json tương tự như trên nhé các bạn.
Gson gson = new Gson();
Type flowerList = new TypeToken<ArrayList<Flower>>(){}.getType();
List<Flower> founderList = gson.fromJson(json, flowerList);  
```
Các bạn hãy tự thử kiểm tra nhé.

`Question: `Mình nghĩ chắc hẳn bây giờ các bạn đang nảy sinh trong đầu một câu hỏi "file json là một đối tượng có chứa một danh sách item thì sao".
Câu trả lời là không thành vấn đề đối với Gson nhé các bạn. Nó có thể parse trực tiếp ra mà không cần TypeToken nào. Thật là tiện dụng phải không các bạn.

### 3.4 Chuyển đổi giá trị null thì sao nhỉ?
```
User user = new User(null, "mva@gmail.com", 22, true);
String json = new Gson().toJson(user); // ??
```
Đối với những thuộc tính có giá trị `null` thì Gson sẽ bỏ qua.
Kết quả:
```
{"age":22,"email":"mva@gmail.com","isDeveloper":true}
```
Thế json nếu như không có thuộc tính giống như đối tượng thì sẽ như thế nào

Câu trả lời là nó sẽ về giá trị mặc định theo từng kiểu dữ liệu. String là null, int là 0... Nếu còn thắc mắc về điều này mình khuyên các bạn nên xem lại các loại biến trong java.
### 3.5 Thay đổi tên các trường cho phù hợp với json
Ở các ví dụ trên mình đã để key của các field trong json là tên biến của lớp luôn. Điều đó thì rất bất tiện
* thứ nhất:  về Code Style sẽ không đúng chuẩn
* thứ hai: khi chúng ta vào dự án thực tế thì json sẽ phụ thuộc từ phía server. Mà chúng ta không thể nào đặt tên giống hoàn toàn theo nó được.
Để thực hiện điều đó ta sử dụng các chú thích @SerializedName để định nghĩa tên trường cho nó.
Quay  lại với ví dụ User, thực hiện một số thay đổi nhé các bạn. 
```
private String name;
//replace by
@SerializedName(value = "name")
private String mName;
```
Wow. Giờ thì đúng chuẩn cơm mẹ nấu rồi nhé. :heart_eyes:

Ở đây mình có một trường hợp phòng hờ cho các bạn, nếu như phía API vì một lý do nào đó cùng trả về đối tượng đó nhưng tên field của thuộc tính có chút thay đổi để phù hợp về mặt ngữ nghĩa của phía Backend. Thì phía chúng ta không thể nào lấy được giá trị đó phải không nào (phần 3.4) mình có đề cập  tới vấn đề này rồi nhé. Nhắc lại là nó sẽ trả về thuộc tính của đối tượng là `null` nếu như không có field trùng tên với @SerializedName() mình đã đặt nhé.

Các giải quyết là `Gson` hỗ trợ cho ta một thuộc tính thay thế alternate
```
@SerializedName(value = "name", alternate = "other_name")
```
Vậy là một việc trở nên đơn giản rồi nhé.
### 3.6 Cách bỏ qua sự chuyển đổi của các field
Lại là một vấn đề hay nữa, chắc chắn một số bạn mới tìm hiểu khi đọc code của người khác sẽ thắc mắc từ khóa `transient` và `@Expose` là gì phải không?
Thì đây chính là từ khóa để giải quyết vấn đề nêu trên 
**transient**
```
private boolean transient mIsDeveloper;
```
Sẽ không thể nào chuyển đổi qua lại giữa đối tượng và json đối với thuộc tính này của User nhé các bạn
**@Expose**
Tương tự như `transient` nhưng nó có sự tùy chỉnh nên rất thuận tiện. Mình sẽ giải thích trong code bên dưới nhé
```
    @Expose() // Đây là kiểu mặc định và cho phép thực hiện cả hai sự chuyển đổi
                        // việc bạn thêm 2 tham số (serialize = true, deserialize = true) thì cũng như vậy
                        // và sẽ có lời nhắc từ IDE là hãy xóa đi
    @SerializedName(value = "name", alternate = "other_name")
    private String mName; 

    @Expose(deserialize = false) // Chỉ cho phép chúng ta chuyển từ đối tượng sang json thôi nhé
    @SerializedName("email")
    private String mEmail;// equals serialize and not deserialize

    @Expose(serialize = false, deserialize = false) // cái này y chang như transient các bạn ạ. :)
    @SerializedName("age")
    private int mAge;  // neither serialize nor deserialize

    @Expose(serialize = false) // đoán xem nào
    @SerializedName("isDeveloper")
    private boolean mIsDeveloper; // not serialize
```
Chưa xong đâu các bạn ạ, nếu đã sử dụng @Expose thì phải nói cho Gson nó biết là mình dùng cái này nữa :sweat_smile:
Y chang như những ví dụ ở trên nhưng việc khởi tạo Gson có khác một chút nhé.
```
 Gson gson = new Gson();
 // thay thế bởi
 Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
 ```
 GsonBuilder là một kiểu [Design Patterns - Builder Pattern](https://www.tutorialspoint.com/design_pattern/builder_pattern.htm). Nó giúp khởi tạo một đối tượng Gson bằng cách gán giá trị cho từng thuộc tính của đối tượng.

Vậy là bây giờ nó đã làm việc rồi đó các bạn!

### 3.7 Tùy chỉnh đối tượng gson của chúng ta.
Có rất nhiều kiểu tùy chỉnh cho gson, khi các bạn kết hợp với `retrofit` thì việc tùy chỉnh sẽ sảy ra rất thường xuyên.
Ở đây mình có một ví dụ nhỏ về tùy chỉnh:
```
Gson gson = new GsonBuilder().serializeNulls().create();
```
Ở đây mình cũng khởi tạo một đối tượng Gson bằng builder như ở trên nhé.
Các bạn đã biết là với những giá trị null thì mặc định Gson sẽ không chuyển đổi nhưng với một đối tượng gson đã chuyển đổi như trên thì việc đó không còn đúng nữa nhé. Nó sẽ tạo ra field tương ứng với value bằng null đấy.

### 3.8 Others 
Kiến thức về `Gson` thì rất là nhiều. Việc chúng ta đang học ở đây nhằm có thể thực hiện những việc thường gặp trong quá trình lập trình mà thôi nhé các bạn.
Nếu trong một vài trường hợp đặc biệt thì mình xin đề xuất các bạn thêm một vài phần nữa về Gson:
* Mappings of Map
* Mappings of Set.
* Gson with Lenient
Vân vân và mây mây nữa nhé các bạn! 
# 4. Summary
Thật là nhiều kiến thức phải không các bạn. Mình cũng rất cảm ơn các bạn đã đọc tới đây. Và mong các bạn sẽ nắm bắt được những điều cần thiết thiết sau :
*       Cách parse object to json và ngược lại.
*       Cách chuyển đổi đối với những đối tượng lồng nhau.
*       Sự khác biệt giữa chuyển đổi dữ liệu sử dụng Array và List.
*       Sử dụng những annoutation để công việc hiệu quả hơn.
*       Tùy chỉnh đối tượng gson cho phù hợp với mong muốn của chúng ta.
Với những kiến thức mình nêu ở trên rất mong sẽ hữu ích với các bạn. Nếu có thắc mắc hoặc bất kì câu hỏi, ý kiến đóng góp nào
xin mọi người hãy để lại bên dưới. Rất mong sự đóng góp của bạn để bài viết được hoàn thiện tốt nhất.
Xin cảm ơn.

**Link mình đã tham khảo:**
 - https://futurestud.io/tutorials/gson-getting-started-with-java-json-serialization-deserialization