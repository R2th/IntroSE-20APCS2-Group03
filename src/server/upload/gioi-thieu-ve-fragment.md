Ở bài viết này mình chia sẻ 1 chút kiến thức cơ bản về fragment mà mình tổng kết được. Nội dung kiến thức trong bài viết này phù hợp với những **bạn chưa biết hoặc chưa hiểu rõ về fragment.**
## I. Tổng quan
### 1. Lý do ra đời của fragment
Có thể một số bạn sẽ thắc mắc là, fragment khá là giống activity (cũng cần phải có file view xml, cũng có các callback quản lý vòng đời). Vậy tại sao lại cần phải tạo ra fragment? 
-	Một thời gian trước trên Honeycomb, Android giới thiệu khái niệm Fragments. Bạn có thể xem nó như là các khối được xây dựng riêng biệt với vòng đời riêng trong một Activity. Nó hỗ trợ rất nhiều trong việc **tối ưu cho các loại màn hình**, đồng thời dễ dàng được quản lý bởi activity cha, có thể **sử dụng lại, kết hợp và bố trí theo ý muốn**.
-	Chạy từng activity riêng cho mỗi màn hình ứng dụng sẽ có hiệu quả rất tệ khi hệ thống phải cố lưu trữ chúng trong bộ nhớ lâu hết mức có thể. Tắt một cái trong số đó cũng không giải phóng các tài nguyên được sử dụng bởi những cái còn lại.

![](https://images.viblo.asia/c9a298f2-ab19-47ed-8393-c18875b8bf44.PNG)

### 2. Vòng đời của fragment
- Fragment là một thành phần android độc lập có vòng đời và giao diện riêng được quản lý bởi một activity và hoạt động giống như một sub-activity
- Vòng đời của fragment bị ảnh hưởng trực tiếp bởi vòng đời của activity chứa nó. Tức là, khi activity bị tạm dừng thì tất cả các fragment được chứa bởi activity đó cũng tạm dừng, và khi activity bị hủy thì tất cả các fragment bên trong cũng bị hủy theo.

![](https://images.viblo.asia/e36c5ec3-4124-490c-9ccf-7735e12f7ca9.png)

- Khi Fragment được gắn vào Activity, các callback **onAttach(), onCreate(), onCreateView(), onActivityCreated(), onStart(), onResume()**  lần lượt được gọi.
- Sau khi các callback trên được gọi, fragment lúc đó mới chính thức được xem là đang chạy.
- Sau đó, nếu người dùng bấm nút **Back** hay có bất kì thao tác gỡ/ thay thế fragment ra khỏi activity nào thì các callback **onPause(), onStop(), onDestroyView(), onDestroy(), onDetach()** sẽ được gọi. (Đây là trường hợp fragment chưa được thêm vào back stack. Ở phía dưới mình sẽ nói về trường hợp fragment được thêm vào back stack sau)

Như vậy, việc quản lý vòng đời của một fragment rất giống với quản lý vòng đời của một activity. Giống như activity, fragment có thể tồn tại ở **3 trạng thái**:
- Hoạt động (Resume)
<br> Khi fragment được gắn vào activity, có thể nhìn thấy và có thể tương tác được.
- Tạm dừng (Pause)
<br> Nếu activity chứa fragment bị che lấp bởi 1 activity khác nhưng không bị che hoàn toàn, người dùng vẫn nhìn thấy được activity bị che lấp, chỉ là không tương tác được thì cả activity và fragment đều đi vào trạng thái tạm dừng.
- Dừng (Stop)
<br> Cũng giống như activity, fragment bị dừng khi bị thành phần nào đó che mất hoàn toàn. Ở trạng giai đoạn, các trạng thái của của fragment vẫn được giữ lại phòng trường hợp fragment được hiển thị trở lại. Và nếu nó không còn được hiển thị với người dùng thì fragment sẽ bị gỡ bỏ nếu activity bị hủy.

**Các callback trong đời của fragment**
- **onAttach()**
<br>Callback này được gọi ngay khi fragment được gắn vào activity và được gọi **1 lần duy nhất** trong vòng đời của Fragment. Và ở giai đoạn này fragment đã biết được activity chứa nó rồi nên bạn có thể tận dụng callback này để kiểm tra sớm một số điều kiện nào đó.
```JAVA
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        try {
            mListener = (OnSendMessageListener) context;
        }catch (ClassCastException e){
            throw new ClassCastException(context.toString() + " must implement OnSendMessageListener");
        }
    }
```
- **onCreate()**
<br>Callback này được gọi khi fragment bắt đầu khởi dữ liệu đầu vào. Khác với activity, ở callback này fragment chưa thể khởi tạo giao diện cho màn hình, chúng ta cần phải đợi đến callback tiếp theo mới có thể khởi tạo giao diện. Callback này cũng được gọi một lần trong vòng đời fragment nên thường tận dụng để lấy dữ liệu từ bên ngoài truyền vào.
- **onCreateView()**
<br>Khi fragment bắt đầu vẽ UI lên màn hình, callback này được gọi nên chúng ta sẽ tận dụng callback này cho các thiết lập về giao diện. 
Theo như sơ đồ trên, thì callback này sẽ được gọi lại khi fragment được gỡ ra khỏi activity nhưng được đưa vào back stack, và được gọi lại hiển thị sau đó. Khi kết thúc callback này, hãy nhớ return một View. Lưu ý là chúng ta hoàn toàn có thể **return null nếu fragment không có UI.**
```JAVA
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup parent, @Nullable Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_first, container, false);
        initComponents(rootView);
        return rootView;
    }

    private void initComponents(View rootView) {
        mTextMessage = rootView.findViewById(R.id.text_message);
        mButtonSend = rootView.findViewById(R.id.button_send);
    }
```

<br>LayoutInflater là 1 component giúp bạn chuyển layout file(Xml) thành View(Java code) trong Android. Bạn thường sử dụng nó trong phương thức onCreateView() của fragment hoặc phương thức getView() khi custom adapter.
    <br>- **Tham số thứ nhất là**: `int resource`, nó chính là xml layout file mà chúng ta muốn chuyển đổi thành View.
    <br>- **Tham số thứ hai là**: `ViewGroup parent`, nó là ViewGroup nơi mà xml layout file(tham số thứ nhất) có thể được nhúng vào, LayoutInflater sẽ chuyển đổi xml layout file thành View và sử dụng các thuộc tính phù hợp với ViewGroup parrent.
    <br>- **Tham số thứ ba là**: `attachToRoot`, khi mà attachToRoot=true thì ngay sau khi quá trình chuyển đổi xml file(resource) thành View hoàn thành thì nó sẽ nhúng View đó vào ViewGroup parent (RIGHT NOW) , khi attachToRoot = false thì nó chỉ chuyển đổi xml file(resource) thành View trong java mà không thêm ngay vào ViewGroup(NOT NOW)
- **onActivityCreated()**
<br>Ở callback này thì activity đã được khởi tạo hoàn toàn. 
- **onStart()**
<br>Khi fragment bắt đầu được nhìn thấy bởi người dùng và chuẩn bị nhận tương tác.
- **onResume()**
<br>Người dùng hoàn toàn nhìn thấy và tương tác được với fragment
- **onPause()**
<br>Như đã nói ở trên, khi activity đi vào **onPause()** (bị che mất 1 phần UI) thì fragment cũng đi vào **onPause()**. Chúng ta nên thực hiện việc sao lưu dữ liệu nếu cần thiết vì có thể người dùng sẽ rời khỏi fragment này. (ví dụ: App có thể là do bị kill ở hệ thống khi người dùng đang sử dụng thì nó cũng sẽ nhảy vào onPause trước đã)
 - **onStop()**
 <br>Fragment chính thức không còn được nhìn thấy nữa.
  - **onDestroyView()**
 <br>View sẽ bị hủy ở callback này. Nếu như fragment được add vào back stack thì khi được lấy lại sau đó, callback **onCreateView()** sẽ được gọi lại.
  - **onDestroy()**
 <br>Fragment sắp bị gỡ bỏ khỏi activity chứa. Khác với activity, fragment còn 1 callback cuối cùng để chính thức được xem như là đã chết **onDetach()**
  - **onDetach()**
 <br>Callback này gọi đến báo hiệu fragment sẽ được gỡ khỏi activity chứa nó và kết thúc vòng đời của fragment.
 ## II. Sử dụng
 ### 1. Tạo và hiển thị fragment
 #### 1.1. Hiển thị kiểu tĩnh
Cách này rất nhanh chóng. Bạn chỉ cần sử dụng một layout có tên là fragment để hiển thị một fragment mà bạn mong muốn.
Layout fragment này cũng cần bạn chỉ định các thuộc tính android:layout_width và android:layout_height như các layout khác. Chính vì vậy bạn có thể thiết kế bao nhiêu fragment vào trong giao diện của Activity đều được, và đặt chúng vào vào bất cứ vị trí nào bạn muốn. Chính thuộc tính android:name của thẻ fragment này sẽ giúp bạn chỉ định fragment nào cần hiển thị.
```XML
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <fragment
        android:id="@+id/fragment_first"
        android:name="com.example.fragmentcommucation.FirstFragment"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="2" />

    <fragment
        android:id="@+id/fragment_second"
        android:name="com.example.fragmentcommucation.SecondFragment"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

</LinearLayout>
```
Và đây là thành quả:
![](https://images.viblo.asia/de1e74a2-a2d1-4c84-9ce6-2c4c72e3faae.png)

#### 1.2. Hiển thị theo kiểu động
Nếu như với cách hiển thị tĩnh trên kia, bạn phải chỉ định thẻ fragment nào sẽ chứa đựng Fragment nào một cách cố định. Thì với cách hiển thị động này, bạn chỉ cần khai báo một vùng không gian nào đó sẽ chứa đựng fragment, vùng không gian đó được khai báo bằng một FrameLayout.
```XML
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <FrameLayout
        android:id="@+id/frame_container"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_weight="2" />

</LinearLayout>

```
Trước khi tiến hành add fragment vào FrameLayout mà bạn đã xây dựng sẵn, chúng ta cần làm quen 1 số lớp liên quan sau:
- **FragmentManager** 
    - Đây là một lớp dùng để quản lý các Fragment, lớp này được tích hợp vào trong mỗi activity để giúp các activity có thể dễ dàng để thêm (add), xóa (remove) hoặc thay thế (replace) các fragment ra khỏi một vùng không gian một cách linh động.
    - Nếu bạn có đọc kỹ về **sự tương thích ngược** của fragment, thì có thể thấy có hai lớp `FragmentManager` mà bạn có thể cân nhắc sử dụng.
        - FragmentManager ở gói **android.app** – Được gọi thông qua phương thức getFragmentManager() của activity. Nếu project của bạn khai báo **minSdkVersion từ 11 trở lên** thì cứ thoải mái sử dụng em này.
        - `FragmentManager` ở gói `android.support.v4.app` – Được gọi thông qua phương thức `getSupportFragmentManager()` của activity. Nếu project của bạn khai báo minSdkVersion nhỏ hơn 11 thì bạn buộc phải dùng lớp quản lý này để có thể mang Fragment đến với các hệ điều hành trước Android 3.0 và đây cũng là lớp thường được sử dụng. Tuy nhiên nếu bạn đang sử dụng thư viện androidx thì nó sẽ k còn `android.support.v4.app` nữa, và nó đã được tích hợp vào thư viện của `androidx` luôn rồi.
       - Lớp này có một phương thức rất hữu dụng: findFragmentById() – Khi dùng phương thức này bạn sẽ truyền vào cho nó một id, id này có thể là id của thẻ fragment như với mục hiển thị tĩnh trên kia. Hoặc id của FrameLayout như bạn mới vừa làm quen ở code trên đây. Kết quả của phương thức này sẽ trả về cho bạn một fragment được chứa trong layout có id mà bạn vừa cung cấp
FragmentTransaction
        - Khi đã có `FragmentManager`, bạn bắt đầu thực hiện việc thêm, xóa, thay đổi thoải mái các fragment dựa vào `FragmentTransaction` này. Bạn có thể “triệu hồi” `FragmentTransaction` thông qua phương thức `beginTransaction()` từ `FragmentManager`.
- **FragmentTransaction** 
    - `add()` – Khi FrameLayout còn rỗng, tức chưa chứa đựng bất kỳ fragment nào, thì bạn có thể dùng phương thức này để add fragment vào cho FrameLayout đó. Nếu bạn tiếp tục thêm fragment khi đã tồn tại thì các fragment sẽ chạy song song nhưng fragment sau sẽ che mất view của fragment trước.
    - `replace()` – Khi bạn muốn thay thế một fragment đang có sẵn ở FrameLayout bằng một fragment nào đó khác.
    - `remove()` – Khi bạn muốn gỡ bỏ fragment ra khỏi một FrameLayout nào đó.
    - `addToBackStack()` – Khi bạn quản lý fragment bởi các phương thức replace() hay remove() trên đây, bạn có thể sử dụng thêm phương thức addToBackStack() này. Nếu bạn gọi đến phương thức này trước khi gọi commit() sẽ được nói ở dưới, thì hệ thống sẽ đưa fragment ở transaction hiện tại vào Back Stack. Điều này có ý nghĩa là, fragment bị thay thế hay bị gỡ ra khỏi FrameLayout ở transaction này sẽ không bị xóa khỏi hệ thống mà vẫn còn được quản lý bên trong Back Stack.
Và do fragment không bị hủy khỏi back stack, nên nếu user nhấn nút back sau đó, họ hoàn toàn có thể quay trở lại với fragment trước đó đã bị gỡ ra.
    - `commit()` – Cho dù bạn có quản lý hiển thị fragment bằng add(), replace() hay remove() thì bạn cũng phải gọi commit() cuối cùng, để FragmentTransaction biết sẽ bắt đầu thực hiện các transaction mà bạn đã ra lệnh đó.
    ```JAVA   
    /**
     * R.id.frame_container - id của frame chứa fragment
     * @param fragment - Fragment được thêm vào.
     */
    private void addFragment(Fragment fragment) {
        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
        transaction.add(R.id.frame_container, fragment);
        transaction.commit();
    }
    ```
Và đây là thành quả:
![](https://images.viblo.asia/409507ba-7789-4242-8e6b-e6f8d581acbf.png)

### 2. Giao tiếp giữa các fragments
Ở đây mình sẽ hướng dân các bạn sử dụng interface để giao tiếp giữa các fragment thông qua activity chứa chúng.
<br>Bài toán của mình sẽ là: Mình cần gửi 1 đoạn tin nhắn từ FirstFragment sang SecondFragment.
- **Bước 1**: Trước hết trong FirstFragment chúng ta định nghĩa 1 Interface như sau:
```JAVA
    public interface OnSendMessageListener{
        void onSend(String msg);
    }
```
Khai báo và kiểm tra môi trường:
```JAVA
    private OnSendMessageListener mListener;
    private EditText mTextMessage;
    private Button mButtonSend;

    public static FirstFragment newInstance(){
        return new FirstFragment();
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        try {
            mListener = (OnSendMessageListener) context;
        }catch (ClassCastException e){
            throw new ClassCastException(context.toString() + " must implement OnSendMessageListener");
        }
    }
```
Gửi message khi click
```JAVA
  @Override
    public void onClick(View view) {
        mListener.onSend(mTextMessage.getText().toString());
    }
```
- **Bước 2**: Activity Implement Interface - Activity sẽ nhận data được gửi từ fragment sang và chuyển tiếp sang SecondFragment.
```JAVA
public class MainActivity extends AppCompatActivity implements FirstFragment.OnSendMessageListener {
    ....
    @Override
    public void onSend(String msg) {
        replaceFragment(SecondFragment.newInstance(msg));
    }
 }
```
- **Bước 3**: SecondFragment nhận dữ liệu được gửi thông qua đối tượng Bundle - dùng để đóng gói dữ liệu
```JAVA
    public static SecondFragment newInstance(String msg){
        SecondFragment fragment = new SecondFragment();
        Bundle args = new Bundle();
        args.putString(ARGUMENT_MSG,msg);
        fragment.setArguments(args);
        return fragment;
    }
    
    ....
    
    private void initData() {
        if (getArguments()!=null){
            String msg = getArguments().getString(ARGUMENT_MSG);
            mTextMessage.setText(msg);
        }
    }
```
Như vậy chỉ với 3 bước đơn giản chúng ta đã có thể thực hiện giao tiếp giữa các fragment với nhau rồi :)

 ## III. Tổng kết
 Vậy thông qua những gì mình tổng hợp ở trên. Mình hi vọng các bạn sẽ có cái nhìn rõ ràng hơn về fragment và có thể trả lời 1 số câu hỏi sau:
 - Sự khác nhau của FragmentManager trong android.app và android.support.v4.app?
 - Add fragment và replace fragment khác nhau như nào?
 - Trong trường hợp addToBackStack(), và không addToBackStack() thì khi thực hiện add() và replace(), những callback nào trong vòng đời của fragment sẽ được gọi đến? Nếu addToBackStack() mà chưa commit() thì điều gì sẽ xảy ra?
 - Có phương thức nào mà có thể lấy được view của Fragment hiện tại hay không?
 - Làm thế nào để các fragment giao tiếp với nhau?
 <p>Mình nghĩ cơ bản như vậy chắc là đủ rồi đó.
 Cảm ơn các bạn đã dành thời gian cho bài viết của mình ^^