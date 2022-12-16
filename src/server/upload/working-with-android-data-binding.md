Trong I / O 2015, Google đã công bố một thư viện ràng buộc dữ liệu cho Android có tên là Data Binding. Nếu như bạn đã chán với việc phải viết findViewById  hay setText  thì data binding sẽ giải quyết vấn đề này.
Chúng ta hãy xét một ví dụ dưới đây:
Với cách làm quen thuộc trước kia, để set một giá trị cho textview:
```
TextView textView = findViewById(R.id.sample_text);
textView.setText(viewModel.getUserName());
```
Vậy khi sử dụng data binding thì sao? khá đơn giản sẽ giúp code của chúng ta đơn giản hơn, dễ bảo trì hơn và đặc biệt là giúp ngăn chặn rò rỉ bộ nhớ và NullPointerException (theo như google giới thiệu):
```
<TextView
    android:text="@{viewmodel.userName}" />
```
Các bạn có thể tìm hiểu thêm thông qua ví dụ mà google giới thiệu cho chúng ta tại địa chỉ: https://github.com/googlesamples/android-databinding
## Enable data binding trong app
```
android {   
   ...   
   dataBinding{   
      enabled=true   
   }   
}
```
Chỉ cần 1 câu lệnh cực kỳ đơn giản chúng ta đã enable được data binding lên để sử dụng.
Xét 1 ví dụ dưới đây, mình sẽ tạo ra 1 object , gán dữ liệu của object đó vào view
## Ví dụ
### Tạo một lớp POJO có tên là Person.
```
public class Person  
{  
    private String firstName;  
    private String lastName;  
    public Person(String firstName, String lastName)  
    {  
        this.firstName = firstName;  
        this.lastName = lastName;  
    }  
    public String getFirstName()  
    {  
        return this.firstName;  
    }  
    public String getLastName()  
    {  
        return this.lastName;  
    }  
    public void setFirstName(String firstName)  
    {  
        this.firstName = firstName;  
    }  
    public void setLastName(String lastName)  
    {  
        this.lastName = lastName;  
    }  
}  
```
###  Bind data vào trong layout 
Để bind data vào layout, chúng ta chỉ cần làm 1 cách khá đơn giản:
Tạo ra 1 thẻ <data></data> bao gồm variable như bên dưới. Ta thấy rằng giá trị của các text đều được bind dưới dạng : android:text="@{person.firstName}".
Có một điều cần lưu ý đó là: type="com.databindingdemo.Person" đây chính là tên gói của bạn.
```
<?xml version="1.0" encoding="utf-8"?>    
<layout xmlns:android="http://schemas.android.com/apk/res/android">    
    <data>    
        <variable    
            name="person"    
            type="com.databindingdemo.Person" />    
    </data>    
    
    <RelativeLayout    
        android:layout_width="match_parent"    
        android:layout_height="match_parent"    
        android:orientation="vertical">    
    
        <LinearLayout    
            android:layout_width="wrap_content"    
            android:layout_height="wrap_content"    
            android:layout_centerInParent="true"    
            android:orientation="vertical">    
    
            <TextView    
                android:layout_width="wrap_content"    
                android:layout_height="wrap_content"    
                android:text="DataBinding"    
                android:textAppearance="?android:attr/textAppearanceLarge" />    
    
            <LinearLayout    
                android:layout_width="wrap_content"    
                android:layout_height="wrap_content"    
                android:layout_marginTop="30dp"    
                android:layout_gravity="center_horizontal"    
                android:orientation="horizontal">    
    
                <TextView    
                    android:layout_width="wrap_content"    
                    android:layout_height="wrap_content"    
                    android:text="First Name : " />    
    
                <TextView    
                    android:layout_width="wrap_content"    
                    android:layout_height="wrap_content"    
                    android:text="@{person.firstName}"    
                    android:textStyle="bold" />    
            </LinearLayout>    
    
            <LinearLayout    
                android:layout_width="wrap_content"    
                android:layout_height="wrap_content"    
                android:layout_gravity="center_horizontal"    
                android:orientation="horizontal">    
    
                <TextView    
                    android:layout_width="wrap_content"    
                    android:layout_height="wrap_content"    
                    android:text="Last Name : " />    
    
                <TextView    
                    android:layout_width="wrap_content"    
                    android:layout_height="wrap_content"    
                    android:text="@{person.lastName}"    
                    android:textStyle="bold" />    
            </LinearLayout>    
        </LinearLayout>    
    </RelativeLayout>    
</layout>
```
###  Thiết lập DataBinding với việc sử dụng mã Java.
Khá đơn giản, chúng ta chỉ cần bind data với java code để sử dụng:
```
public class MainActivity extends AppCompatActivity  
{  
    Person person;  
    @Override  
    protected void onCreate(Bundle savedInstanceState)  
    {  
        super.onCreate(savedInstanceState);  
        ActivityMainBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_main);  
        person = new Person("Ravi", "Rupareliya");  
        binding.setPerson(person);  
    }  
}  
```
Lưu ý rằng, ActivityMainBinding  sẽ tự động sinh ra theo tên của layout mà chúng ta đặt. Ví dụ: 
nếu tên của bạn là activity_login.xml, thì tên lớp Binding sẽ là ActivityLoginBinding.
Bên trên mình chỉ giới thiệu cơ bản về data binding,
nếu như bạn muốn tìm hiểu thêm về các chức năng và phương thức của data binding , bạn có thể tham khảo thêm tại: https://developer.android.com/topic/libraries/data-binding/
code bạn có thể tham khảo tại: https://github.com/googlesamples/android-databinding
Bài viết của mình được tham khảo từ: https://www.codementor.io/ravir/working-with-android-data-binding-4rqo3593h,https://developer.android.com/topic/libraries/data-binding/.
Cảm ơn các bạn đã theo dõi, rất mong ý kiến đóng góp để bài viết được hoàn thiện hơn !