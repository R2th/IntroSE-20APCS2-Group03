Singleton pattern là 1 mẫu thiết kế phần mềm (software design pattern) để đảm bảo rằng 1 class sẽ chỉ có duy nhất 1 thực thể được tạo ra với phạm vi truy cập toàn cục. Tại bất kì thời điểm nào kể cả khi có nhiều class cùng truy cập vào class đó, sẽ chỉ nhận được 1 thực thể duy nhất của class. Lớp Singleton này sẽ được khởi tạo trong chính nó, hoặc bạn có thể giao phó việc khởi tạo class cho 1 factory class.


## Lợi ích của việc sử dụng 
Trong 1 ứng ụng Android, có nhiều đối tượng mà chúng ta chỉ cần một thực thể với phạm vi truy cập toàn cục. Ví dụ sử dụng Singleton với Retrofit, OKHttpClient, Gson, SharedPrefences, các repository class,..Nếu chúng ta khởi tạo nhiều hơn một trong các loại đối tượng này, chúng ta sẽ gặp phải các vấn đề như tốn kém tài nguyên hoặc khó trong việc kiểm soát các đối tượng. 

### Cách để Implement Singleton

Cách thực hiện khá đơn giản, các bạn có thể theo dõi đoạn code ở dưới để hiểu cách tạo 1 Singleton

```
public class Singleton  {
 
   private static Singleton INSTANCE = null;
 
   // other instance variables can be here
     
   private Singleton() {};
 
   public static synchronized Singleton getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new Singleton();
        }
        return(INSTANCE);
    }
     
   // other instance methods can follow 
}
```

Ở đoạn code ở trên, chúng ta có biến static INSTANCE là 1 thực thể của class, Tiếp theo là tạo 1 private contructor.

Ở đây bạn sẽ khởi tạo thực thể của class ngay trong chính phương thức getInstance() của class. Phương thức này sẽ kiểm tra đã có bất kì thực thể nào của class đã được khởi tạo hay chưa, nếu có rồi thì sẽ trả về thực thể đã được tạo trước đó, còn nếu chưa, sẽ tạo 1 thực thể mới và trả về giá trị mới đó. 

Ví dụ: tạo instance duy nhất của Retrofit

Retrofit là thư viện phổ biến để kết  nối REST web service bằng cách chuyển API sang Java interface. Trong android app, bạn sẽ cần 1 biến toàn cục duy nhất của Retrofit để các thành phần khác của app có thể sử dụng nó để thực thi các request liên quan đến network mà không cần tạo mỗi thực thể của Retrofit mỗi khi cần. Việc tạo nhiều đối tượng sẽ dẫn đến việc nặng ứng dụng, tốn tài nguyên trong khi một số đối tượng được tạo thêm có thể không được sử dụng. 

```
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
public class RetrofitClient {
  
   private static Retrofit retrofit = null;
  
   public static Retrofit getClient(String baseUrl) {
        if (retrofit==null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(baseUrl)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }
}
```


Mỗi lần Client A gọi RetrofitClient.getClient(), nó sẽ tạo 1 thực thể nếu trước đó chưa có thực thể nào được tạo ra, sau đó khi client B gọi method đó, nó sẽ kiểm tra nếu thực thể Retrofit đã tồn tại hay chưa, nếu rồi sẽ trả lại thực thể đó, còn không sẽ tạo mới.

### Xử lý với Multithreading

Trong hệ thống Android, bạn có thể có nhiều thread chạy song song tại cùng 1 thời điểm. Những thread này có thể thực hiện cùng 1 đoạn code. Class Singleton bên trên trong trường hợp cùng 1 thời điểm có 2 hay nhiều luồng cùng chạy và cùng gọi hàm getInstance() thì lại có ít nhất 2 thể hiện của instance. Vậy phải làm sao với trường hợp đa luồng? 


Một trong  những cách để Singleton của bạn tuân thủ đúng thread safe là gọi phương thức **synchronized** của hàm getInstance(). Điều này đảm bảo rằng tại 1 thời điểm chỉ có duy nhất 1 thead được gọi phương thức getInstance(), các thread khác sẽ phải đợi cho đến khi thead đang sử dụng hàm đó thực hiện xong mới được sử dụng.

```
public class Singleton  {
 
   private static Singleton INSTANCE = null;
 
   // other instance variables can be here
     
   private Singleton() {};
 
   public static synchronized Singleton getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new Singleton();
        }
        return(INSTANCE);
    }
     
   // other instance methods can follow
}
```

Phương pháp náy sẽ khiến cho đoạn code của chúng ta đảm bảo về thread safe, nhưng khi sử dụng **synchronized** như vậy sẽ chạy chậm và giảm hiệu năng của ứng dụng. Vì vậy khi sử dụng thì bạn cần phải xem xét performance có thật sự quan trọng với ứng ụng của bạn không.

### Eagerly Create an Instance
Có 1 phương pháp khác để giải quyết vấn đề nhiều thread cùng truy cập đến 1 Singleton là khởi tạo Singleton ngay khi class được khởi tạo. Điều này sẽ giúp đảm bảo thead safe. Sau đó thực thể Singleton sẽ sẵn sàng trước khi có bất kì truy cập đến biến INSTANCE

```
public class Singleton  {
 
   private static Singleton INSTANCE = new Singleton();
 
   // other instance variables can be here
     
   private Singleton() {};
 
   public static Singleton getInstance() {
       return(INSTANCE);
    }
     
   // other instance methods can follow
}
```

Tuy nhiên điều này lại có thể tạo ra những đối tượng không bao giờ được sử dụng, do đó chiếm bộ nhớ không cần thiết. Vì vậy, cách này thường được sử dụng khi bạn đã chắc chắn rằng Singleton sẽ được truy cập.

Bài viết được dịch từ https://code.tutsplus.com/tutorials/android-design-patterns-the-singleton-pattern--cms-29153