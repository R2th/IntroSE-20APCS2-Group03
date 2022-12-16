Kotlin là một ngôn ngữ lập trình được tạo ra bởi JetBrains và được giới thiệu vào nằm 2011, từ khi ra đời nó đã dấy lên một làn sóng mạnh mẽ trong giới lập trình Android bởi tính linh hoạt của nó như tương thích hoàn toàn với java, giải quyết các vấn đề liên quan đến NPE, tối ưu hóa code, hiệu suất cao, hỗ trợ convert file java -> kotlin...Đặc biệt hơn đây là một ngôn ngữ lập trình dễ học và rất là khó bỏ khi mà đã làm quen được với nó. Lý do tại sao thì mình sẽ liệt kệ một vài công dụng tuyệt vời mà nó đem lại dưới đây.
![](https://images.viblo.asia/467b9a05-512c-426a-a261-128259d6ff27.png)

#### I.Null Safety
Một trong những cạm bẫy phổ biến nhất trong nhiều ngôn ngữ lập trình, bao gồm Java, là việc truy cập vào một thành viên của tham chiếu null sẽ dẫn đến một ngoại lệ tham chiếu null. Trong Java, điều này tương đương với một NullPointerException.

Kotlin giải quyết vấn đề này bằng cách ngay khi khai báo biến chúng ta có thể chỉ rõ biến đó có thể null hay không, nếu muốn biến có thể null thì chúng ta chỉ việc thêm ? phía sau kiểu của biến, điều này dẫn đến việc hệ thống sẽ không báo lỗi ngay cả khi biến chúng ta gán giá trị null
```javascript
    var a: String = "asd"    //variable must be not null
    a = null                // compile error
    
    var b: String? = "bcs"   //variable can null
    b = null                // no problem
   ```
    
#### II.Properties and Fields
Kotlin còn giúp chúng ta có thể custom getter và setter cho các field, và điều này cực kỳ hữu ích cho chúng ta trong việc custom 1 view nào đó, bởi vì khi dùng kotlin chúng ta không cần phải gọi hàm findViewById() như bên java hay dùng các thư viện bên ngoài như ButterKnife mà có thể gọi trực tiếp từ xml
```javascript
    //vd1
    val isEmpty: Boolean
        get() = this.size == 0
     
     //vd2
    val number: Int
        get() = value * value
        set(value) {
         changeColor()
         txt_number.text = value.toString
        }
  ```      
#### III.Data class    
Thông thường chúng ta thường tạo ra các class với mục đích chính là lưu giữ data. Trong kotlin các class này được gọi là data class.
    
   ```javascript
    data class User(val name: String, val age: Int)
  ```
    
Điều này sẽ tương đương với code trong java như sau:
```javascript
    public class User {

        private String name;
        private int age;

        public User(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            User user = (User) o;
            if (name != null ? !name.equals(user.name) :
                    user.name != null) {
                return false;
            }
            return age != null ?
                    age.equals(user.age) :
                    user.age == null;
        }

        @Override
        public int hashCode() {
            int result = name != null ? name.hashCode() : 0;
            result = 31 * result + age;
            return result;
        }

        @Override
        public String toString() {
            return "User{" +
                    "name='" + name + '\'' +
                    ", age=" + age +
                    '}';
        }
    }
  ```  
Điều đó có nghĩa là trong kotlin, việc khai báo data class thì nó sẽ tự động gen ra cho chúng ta 4 hàm như equal(), hashcode(), toString(), copy() mà không cần phải viếc code dài dòng như bên java.
Lưu ý rằng data class cần ít nhất 1 primary constructor, nghĩa là ngay khi khởi tạo instance của class này thì đồng thời chúng ta phải đổ dữ liệu cho nó thông qua constructor.

#### IV.Parcelize
Trong java, nếu chúng ta muốn truyền một List<Object> từ activity này sang activity khác thì model class chúng ta phải implement Parcelable, nhưng trong Kotlin chúng ta sẽ làm như sau:
    
   ```javascript
    
    @Parcelize
    class Model(val title: String) : Parcelable
   ```

Điều này khác ở java một chỗ là chỉ cần thêm anotation @Parcelize là đủ giúp chúng ta không cần phải override lại các hàm như: writeToParcel(), Creator(), làm giảm thiểu rất nhiều code giúp model class chúng ta dễ nhìn và gọn code hơn

#### V.Default Arguments
 Trong kotlin chúng ta hoàn toàn có thể định nghĩa giá trị mặc định cho các đối số trong các function hay constructor:   
    
   Ví dụ 
   ```javascript
    fun build(width: Int = 400, height: Int = 400) {
        this.width = width
        this.height = height
    }
 ```
    
 Việc gọi hàm sẽ như sau:
    
   ```javascript
        build() // no error
        build(100) //no error
        build(height = 100) // no error
  ```
 
 #### VI.Lambdas
 Việc sử dụng lambdas trong kotlin hầu như rất thường xuyên, bởi vì nó giúp giảm thiểu code, gọn hơn:
 
 Trong java:
   ```javascript
     view.setOnClickListener(new OnClickListener() {
                public void onClick(View v) {
                }
            });
     view.setOnFocusChangeListener(new OnFocusChangeListener() {
        @Override
        public void onFocusChange(View view, boolean hasFocus) {

        }
    });    
    
   Trong kotlin:
   
       view.setOnClickListener{     
        }

       view.setOnFocusChangeListener{ view, hasFocus -> {
        }
   ```     
#### VII.Higher-Order Functions
Có nghĩa là function có thể nhận một function khác như một param hoặc trả về một function
  ```javascript
    fun itemCallback(val itemClick:(item:String) -> Unit){}

    val sum: (Int, Int) -> Int = { x, y -> x + y }

    doSomething(1000, { result: String? ->
                // do something with result
            }
   ```         
#### VIII.Extensions
Extensions trong kotlin cho phép chúng ta chèn thêm phương thức mới vào class có sẵn mà không cần phải sửa mã nguồn

Ví dụ:
```javascript
    fun Int.minus(b:Int) {
        return this - b
    }

    fun String.toTimeLong(format: String, locale: Locale = Locale.getDefault()): Long? {
        return this.toDate(format, locale)?.time
    }
    
    Gọi hàm
    10.minus(5)
    "12/08/2018".toTimeLong("dd/MM/yyyy")
    
 ````

   
### Tổng Kết
Trên đây mình đã giới thiệu cho các bạn về một số tính năng tuyệt vời có trong Kotlin, nếu có gì sai xót mong các bạn góp ý thêm.