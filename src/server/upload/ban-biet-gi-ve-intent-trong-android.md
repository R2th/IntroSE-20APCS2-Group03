Đây là những kiến thức mà mình đã tổng hợp được về Intent, hy vọng sẽ giúp ích với các bạn
## 1. Intent là gì?
Intent là một đối tượng message bạn có thể sử dụng để request một hành động từ một vài component trong ứng dụng 
## 2. Các loại Intent
Intent có 2 loại chính là Explicit Intent và Implicit Intent
* Explicit Intent (dịch word by word có nghĩa là intent tường minh):  
Hiểu đơn giản explicit intents là intent xác định rõ và cụ thể các thành phần tham gia hành động.  
Example: 
```javascript
Intent intent = new Intent(MainActivity.this, DialerActivity.class);
startActivity(intent);
```
như trong ví dụ trên đã xác định chính xác Activity nhận intent đó là DialerActivity
* Implicit Intent (dịch word by word có nghĩa là Intent không tường minh)    
Loại Intents này chỉ ra hành động cần được thực hiện (action) và dữ liệu cho hành động đó (data). Khi bạn sử dụng implicit intent, hệ thống Android sẽ tìm kiếm tất cả thành phần thích hợp để start bằng cách cách so sánh nội dung của Intent đc gửi  với các Intent filter đc khai báo trong ứng dụng khác. Nếu intent đc gửi đó  khớp với intent filter trong một component hoặc một ứng dụng nào đó, thì ngay lập tức hệ thống sẽ khởi động thành phần đó và cung cấp cho nó intent ban đầu đc gửi . Nếu nhiều intent filter tương thích thì hệ thống sẽ hiển thị hộp thoại để người dùng có thể chọn ứng dụng nào sẽ sử dụng.  
Intent filter (bộ lọc intent) là một thẻ trong minifest nhằm xác định loại intent mà thành phần chứa intent filter đó muốn nhận. ví dụ thế này nhé: khai báo intent filter cho một activity trong manifest điều này có nghĩa là trong số các intent đc gửi đi intent nào có nội dung tương thích vs nội dung trong thẻ intent filter thì nó sẽ nhận intent đó. Và ngược lại nếu bạn không khai báo bất kì intent filter nào cho activity của mình thì activity đó chỉ có thể start bằng một explicit intent (intent tường minh)  
![](https://images.viblo.asia/6e201b78-985b-4d62-98f4-4f10b0181623.png)  
Hình ảnh trên mô tả cách một implicit intent được chuyển thông qua hệ thống android để start một activity khác.   
[1]Activity A tạo ra một intent với một action cụ thể nào đó (chẳng hạn ACTION_VIEW, ACTION_GET_CONTENT,..) rồi startActivity().   
[2] Hệ thống android sẽ tìm kiếm tất cả ứng dụng mà intent filter của ứng dụng đó phù hợp với intent đc gửi đi từ Activity A.  
[3] khi tìm thấy kết quả khớp, hệ thống sẽ start Activity đó (Avtivity B) bằng lời gọi onCreate() và passing qua cho nó intent đc gửi từ activity  A  
Example:  
```javascript
Intent sendIntent = new Intent(Intent.ACTION_VIEW);
sendIntent.setData(Uri.parse(Constant.TYPE_MESSAGE));
startActivity(sendIntent);
```
## 3. Cấu trúc của một Intent
Một đối tượng intent sẽ mang theo thông tin mà hệ thống android cần để quyết định thành phần nào sẽ đc start. Và những thông tin đó bao gồm :     
Component Name   
Action    
Data   
Category  
Extra
Flag
### Component name  
Tên của component được start.
### Action  
Là một chuỗi xác định hành động chung để thực hiện (chẳng hạn như xem hoặc chọn)  
Dưới đây là 2 action  phổ biến để start một activity  
* ACTION_VIEW: như tên gọi của nó activity gửi intent với một action là ACTION_VIEW có nghĩa activity  tương thích với intent này đang có thông tin để hiển thị cho người dùng như xem ảnh trong ứng dụng gallery hay xem địa chỉ trong google map (hay hiểu đơn giản Activity A đang muốn xem thông tin đc hiển thị ở Activity B)  
* ACTION_SEND: 
Còn được gọi là Intent chia sẻ. sử dụng action này trong trường hợp bạn có một số dữ liệu mà người dùng có thể chia sẻ thông qua một ứng dụng khác (chẳng hạn như facebook, email, các ứng dụng mạng xã hội)  
Ngoài các action có sẵn như trên bạn có thể chỉ định action cho một intent với setAction hoặc hàm tạo Intent
![](https://images.viblo.asia/b5984aa3-c99f-4310-bcf8-a59d2ab7ac3f.png)  
![](https://images.viblo.asia/b5aa37d2-5033-479a-9b3c-8dc3966bdbd3.png)  
Nếu bạn xác định action của riêng mình, hãy đảm bảo bao gồm tên gói của ứng dụng làm tiền tố, như trong ví dụ sau:  
```javascript
static final String ACTION_TIMETRAVEL = "com.example.action.TIMETRAVEL";
```
### Data
Sử dụng một đối tượng Uri tham chiếu tới dữ liệu sẽ đc thực hiện một hành động nào đó. Loại dữ liệu cung cấp thường được quyết định bởi action của intent. Ví dụ nếu action là ACTION_EDIT => Uri tham chiếu tới data đang cần edit  
Khi tạo một intent không tường minh điều quan trọng là chỉ định kiểu dữ liệu, điều này sẽ giúp hệ thống android có thể tìm thấy thành phần tốt nhất để nhận intent của bạn

để set data sử dụng method setData()   
để set type sử dụng method setType()
Example: 
```javascript
 Intent sendIntent = new Intent(Intent.ACTION_VIEW);
 sendIntent.setData(Uri.parse(Constant.TYPE_MESSAGE));
 sendIntent.setType("text/plain");
 startActivity(sendIntent);
```
### Category
Một chuỗi chứa thông tin bổ sung về loại thành phần sẽ xử lý intent.   
Để nhận đc các intent không tường minh thì bắt buộc ứng dụng phải khai báo category trong manifest, Và giá trị mạc định là CATEGORY_DEFAULT.  
Ví dụ, khai báo activity với một intent filter để nhận một intent có action là ACTION_SEND khi kiểu dữ liệu là văn bản:
```javascript
<activity android:name="ShareActivity">
    <intent-filter>
        <action android:name="android.intent.action.SEND"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <data android:mimeType="text/plain"/>
    </intent-filter>
</activity>
```
### Extra
Các cặp key-value mang thông tin bổ sung cần thiết để hoàn thành hành động được yêu cầu. 
### Flag 
Cờ được định nghĩa trong lớp Intent có chức năng như siêu dữ liệu cho intent . Cờ có thể ra lệnh hệ thống Android về cách khởi chạy một  (ví dụ, hoạt động sẽ thuộc về tác vụ nào ) và cách xử lý sau khi nó được khởi chạy (ví dụ, nó có thuộc về danh sách hoạt động gần đây hay không).
## 4. Gửi dữ liệu giữa các activity
### Gửi dữ liệu sử dụng explicit intent
Để truyền dữ liệu cho intent, ta dùng phương thức putExtra(). Extra là một cặp key/value. key luôn luôn là kiểu string. value bạn có thể sử dụng kiểu dữ liệu nguyên thủy hoặc đối tượng của String, Bundle, ....  
Thành phần tiếp nhận có thể lấy lại được đối tượng intent thông qua hàm getIntent(). Để lấy ra được dữ liệu, tùy thuộc vào kiểu dữ liệu chúng ta truyền đi, sử dụng các phương thức getStringExtra(), getIntExtra();   
Example:
```javascript
   public void sendByExtra(){
        Intent intent = new Intent(ActivityA.this,ActivityB.class);
        intent.putExtra(TITLE,edtTitle.getText().toString());
        intent.putExtra(DESCRIPTION,edtDescription.getText().toString());
        startActivity(intent);
    }
```
Hoặc sử dụng đối tượng Bundle. Đóng gói tất cả dữ liệu vào trong Bundle, sau đó chèn bundle vào intent bằng method putExtras()  
Example:  
```javascript
public void sendByBundle(){
        Intent intent = new Intent(ActivityA.this,ActivityB.class);
        Bundle bundle = new Bundle();
        bundle.putString(TITLE,edtTitle.getText().toString());
        bundle.putString(DESCRIPTION,edtDescription.getText().toString());
        intent.putExtras(bundle); 
        //intent.putExtra(BUNDLE,bundle);(hoặc) 
        startActivity(intent);
    }
```
### truyền dữ liệu sử dụng Implicit Intent
để gửi một implicit intent bạn cần set cho nó một số thuộc tính như setAction, setType, setData,..  
và dưới đây là một ví dụ sử dụng ACTION_SEND  
Có rất nhiều ứng dụng android cho phép bạn chia sẻ dữ liệu với những người khác, ví dụ: facebook, G+, Gmail... Bạn có thể gửi dữ liệu tới một vài thành phần nào đó. ví dụ dưới đây sẽ mô tả việc sử dụng intent như vậy
```javascript
Intent intent = new Intent(Intent.ACTION_SEND); 
intent.setType("text/plain");
intent.putExtra(android.content.Intent.EXTRA_TEXT,"News for you!"); 
startActivity(intent); 
```
## 5. Intent Result (lấy lại kết quả từ activity)
Một activity có thể được đóng lại thông qua button back trên điện thoại. Trong trường hợp đó, hàm finish() sẽ được thực thi. Nếu activity đã được khởi chạy cùng với hàm startActivity(intent), người gọi không cần thiết phải có kết quả hoặc phản hồi từ activity mà có thể close ngay lập tức.  
Nếu bạn start một activity cùng với hàm startActivityForResult(), như vậy là bạn mong muốn có phản hồi từ sub-activity. Khi một sub-activity kết thúc, hàm onActivityResult() trên activity cha sẽ được gọi và bạn có thể thực hiện hành động dựa trên kết quả.

```javascript
 public void onClick(View view) {
            Intent i = new Intent(this,ActivityTow.class);
            i.putExtra("value1","This value one for activityTow");
            i.putExtra("Value2", "This value two ActivityTwo");
                    // set the request code to any code you like,
                    // you can identify the callback via this code
                    startActivityForResult(i, REQUEST_CODE);
        }
```

Nếu bạn sử dụng hàm startActivityForResult(), thì sau khi start activity sẽ gọi đến sub-activity  
Nếu hàm sub-activity kết thúc, nó sẽ gửi dữ liệu đến activity cha đã gọi nó thông qua intent. điều này được xử lý trên hàm finish(), hoặc bạn có thể setResult ngay trên call back onCreate() sau đó kết thúc sub-actitvity bằng finish()
```javascript
@Override
        public void finish() {
            // Prepare data intent
            Intent data = new Intent();
            data.putExtra("returnKey1", "Swinging on a star. ");
            data.putExtra("returnKey2", "You could be better then you are. ");
            // Activity finished ok, return the data
            setResult(RESULT_OK, data);
            super.finish();
        }
```
Một sub-activity kết thúc, hàm onActivityResult() trong activity cha sẽ được gọi  
```javascript
 @Override
        protected void onActivityResult(int requestCode, int resultCode, Intent data) {
            if (resultCode == RESULT_OK && requestCode == REQUEST_CODE) {
                if (data.hasExtra("returnKey1")) {
                    Toast.makeText(this, data.getExtras().getString("returnKey1"),
                    Toast.LENGTH_SHORT).show();
                }
            }
        }

```
Example   
**MainActivity**
```javascript
public class MainActivity extends Activity {

    /* REQUEST_CODE là một giá trị int dùng để định danh mỗi request. Khi nhận được kết quả, hàm callback sẽ trả về cùng REQUEST_CODE này để ta có thể xác định và xử lý kết quả. */
    private static final int REQUEST_CODE_EXAMPLE = 0x9345;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Tạo một Intent để start DetailActivity
        final Intent intent = new Intent(this, DetailActivity.class);

        // Start DetailActivity với request code vừa được khai báo trước đó
        startActivityForResult(intent, REQUEST_CODE_EXAMPLE);
    }

    // Khi kết quả được trả về từ Activity khác, hàm onActivityResult sẽ được gọi.
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Kiểm tra requestCode có trùng với REQUEST_CODE vừa dùng
        if(requestCode == REQUEST_CODE_EXAMPLE) {

            // resultCode được set bởi DetailActivity
            // RESULT_OK chỉ ra rằng kết quả này đã thành công
            if(resultCode == Activity.RESULT_OK) {
                // Nhận dữ liệu từ Intent trả về
                final String result = data.getStringExtra(DetailActivity.EXTRA_DATA);

                // Sử dụng kết quả result bằng cách hiện Toast
                Toast.makeText(this, "Result: " + result, Toast.LENGTH_LONG).show();
            } else {
                // DetailActivity không thành công, không có data trả về.
            }
        }
    }
}
```

**DetailActivity**
 ```javascript
public class DetailActivity extends Activity {

    // Biến constant được dùng để định danh dữ liệu được truyền giữa các Activity
    public static final String EXTRA_DATA = "EXTRA_DATA";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

        final View button = findViewById(R.id.button);
        // Trả về kết quả sau khi click vào button
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Tạo một Intent mới để chứa dữ liệu trả về
                final Intent data = new Intent();

                // Truyền data vào intent
                data.putExtra(EXTRA_DATA, "Some interesting data!");

                // Đặt resultCode là Activity.RESULT_OK to
                // thể hiện đã thành công và có chứa kết quả trả về
                setResult(Activity.RESULT_OK, data);

                // gọi hàm finish() để đóng Activity hiện tại và trở về MainActivity.
                finish();
            }
        });
    }

    @Override
    public void onBackPressed() {

            // đặt resultCode là Activity.RESULT_CANCELED thể hiện
            // đã thất bại khi người dùng click vào nút Back.
            // Khi này sẽ không trả về data.
        setResult(Activity.RESULT_CANCELED);
        super.onBackPressed();
    }
}
```
## Tài liệu tham khảo
https://developer.android.com/guide/components/intents-filters  
https://www.vogella.com/tutorials/AndroidIntent/article.html  
Thanks for reading and hope to useful for you