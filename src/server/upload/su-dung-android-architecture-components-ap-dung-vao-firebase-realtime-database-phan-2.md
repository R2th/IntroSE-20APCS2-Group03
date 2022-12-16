Chào mừng các bạn đã quay trở lại với loạt bài về Android Architecture Components cụ thể là áp dụng nó vào Firebase Realtime Database ( [LiveData](https://developer.android.com/topic/libraries/architecture/livedata.html)  và [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel.html)) giúp cho ứng dụng code đơn giản và dễ dàng test. Ở [phần trước](https://viblo.asia/p/su-dung-android-architecture-components-ap-dung-vao-firebase-realtime-database-phan-1-63vKjnzRK2R) chúng ta  đã thấy rằng *LiveData* và *ViewModel* đã đơn giản hóa code trong Activity như thế nào, nó thay đổi khá nhiều so với cách implement Realtime Database 1 cách thông thường. Tuy nhiên còn 1 yếu điểm mà phần trước tôi có nói đó là Activity vẫn phải làm với thằng **DataSnapshot** ( Nó chứa stock price). Tôi muốn xóa mọi dấu vết của Realtime Database SDK trong Activity có như vậy thì code mới dễ đọc và dễ test. Và cuồi cùng là nếu tôi có sử dụng [FileStore](https://firebase.google.com/products/firestore/) thay vì RealTime DB thì tôi cũng sẽ không cần phải thay đổi code trong Activity, điều đó thật tuyệt phải không nào?
Dưới đây là hình ảnh về cấu trúc data của database sử dụng trong bài viết này :

![](https://images.viblo.asia/0529ff67-7d94-4627-a586-f4d73d87119c.png)

và đây là code đọc dữ liệu từ *DataSnapshot*  sau đó hiển thị lên *TextView*

```
// update the UI with values from the snapshot
String ticker = dataSnapshot.child("ticker").getValue(String.class);
tvTicker.setText(ticker);
Float price = dataSnapshot.child("price").getValue(Float.class);
tvPrice.setText(String.format(Locale.getDefault(), "%.2f", price));
```
*Realtime Database SDK*  cho phép chúng ta chuyển đổi từ DataSnapshot sang 1 JavaBean object. Điều đầu tiên cần làm là định nghĩa 1 class có chứa getter setter match vs thêm của thuộc tính snapshot:

```
public class HotStock {
    private String ticker;
    private float price;

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String toString() {
        return "{HotStock ticker=" + ticker + " price=" + price + "}";
    }
}
```
Sau đó sử dụng đoạn code sau để tự động mapping object
```
HotStock stock = dataSnapshot.getValue(HotStock.class)
```
Sau khi đoạn code trên được thực thi thì 1 instance của *HostStock*  được tạo ra và có các giá trị cho ticker và price. Sử dụng đoạn code dưới đây, tôi có thể update *HotStockViewModel*  bằng việc chuyển đổi bằng [transformation](https://developer.android.com/topic/libraries/architecture/livedata.html#transform_livedata). Điều này cho phép tôi có thể tạo ra 1 *LiveData* 1 mà *DataSnapshot* sẽ chuyển đổi thành *HotStock*.
```
// This is a LiveData<DataSnapshot> from part 1
private final FirebaseQueryLiveData liveData = new FirebaseQueryLiveData(HOT_STOCK_REF);

private final LiveData<HotStock> hotStockLiveData =
    Transformations.map(liveData, new Deserializer());

private class Deserializer implements Function<DataSnapshot, HotStock> {
    @Override
    public HotStock apply(DataSnapshot dataSnapshot) {
        return dataSnapshot.getValue(HotStock.class);
    }
}

@NonNull
public LiveData<HotStock> getHotStockLiveData() {
    return hotStockLiveData;
}
```
Class tiện tích [Transformations](https://developer.android.com/reference/android/arch/lifecycle/Transformations.html) cung cấp 1 hàm static [map()](https://developer.android.com/reference/android/arch/lifecycle/Transformations.html#map(android.arch.lifecycle.LiveData%3CX%3E,%20android.arch.core.util.Function%3CX,%20Y%3E)) trả về 1 *LiveData* , tham số truyền vào là 1 *LiveData* và 1 Function cần được implement ở đây là 1 function của *Deserializer*, ta cần định nghĩa là method *apply*...
Như vậy ta có thêm tùy chọn về việc nhận dữ liệu có thể là DataSnapShot hoặc HotStock, nhưng theo tôi ViewModel nên bắn  ra dữ liệu mà nó đã hoàn toàn sẵn sàng để UI hiển thị. Như vậy ta cần phải xử lí dữ liệu ở ViewModel trước khi đẩy nó ra ngoài UI, cùng xem ví dụ dưới đây:
```
public class MainActivity extends
AppCompatActivity {
    private TextView tvTicker;
    private TextView tvPrice;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState)
{
        super.onCreate(savedInstanceState);
setContentView(R.layout.activity_main);
        tvTicker =
findViewById(R.id.ticker);
        tvPrice = findViewById(R.id.price);
HotStockViewModel hotStockViewModel =
ViewModelProviders.of(this).get(HotStockViewModel.class);


        LiveData<HotStock> hotStockLiveData = hotStockViewModel.getHotStockLiveData();


        hotStockLiveData.observe(this, new Observer() {
   @Override
            public void onChanged(@Nullable HotStock hotStock) {
             if (hotStock != null) {
                    // update the UI here
with values in the snapshot
tvTicker.setText(hotStock.getTicker());
tvPrice.setText(String.format(Locale.getDefault(), "%.2f",
hotStock.getPrice()));
                }
            }
        });
    }
}
```

Tất cả tham chiếu của Realtime Database bạn sẽ không còn thấy nữa phải không nào, nó được xử lí ở HotStockViewModel và LiveData, nhưng nó vẫn có 1 vấn đề ở đây.
## Điều gì xảy ra nếu LiveData transformation xử lí tác vụ nặng
Tất cả Livedata callback tại *onChanged()*  và chạy ở main thread cũng như transformations. ví dụ bên trên đưa ra là 1 ví dụ nhỏ và cực kì đơn giản và tôi nghĩ nó sẽ không có vấn đề gì về hiệu suất đâu. Nhưng khi Realtime Database SDK deserializes  DataSnapshot thành a JavaBean  object, nó sử dụng reflection để tìm và gọi các settet method thì sẽ gặp vấn đề khi số lượng object tăng lên. Nếu tổng thời gian nó chiếm hơm 16ms (Chi phí cho 1 đơn vị làm việc trên main thread), Android sẽ bắt đầu drop frame, khi drop thì nó sẽ không còn render 60fps nữa, ứng dụng ở lên giật lag khi thực thi công việc của ta, ngoài ra còn thể dần đến lỗi [ARN](https://developer.android.com/topic/performance/vitals/anr.html) nếu transformation làm việc liên quan đến I/O.
Như vậy bạn biết cần phải làm gì rồi đấy, ta cần phải move việc tính toán vào 1 thread khác. Điều đó không thể hoàn thành trong 1 transformation (Từ khi nó chạy synchronously), nhưng chúng ta có thể dùng [MediatorLiveData](https://developer.android.com/topic/libraries/architecture/livedata.html#merge_livedata) thay thế. *MediatorLiveData* được xây dựng trên cũng của map transform, và cho phép chúng ta lắng nghe thay đổi các nguồn LiveData khác, quyết định nên làm gì đối với mỗi event. Vì vậy tối sẽ thay đổi transformation hiện tại với 1 hàm khỏi tạo không tham số cho *HotStockViewModel*  từ part 1 như sau:
```
private final FirebaseQueryLiveData liveData = new FirebaseQueryLiveData(HOT_STOCK_REF);
private final MediatorLiveData<HotStock> hotStockLiveData = new MediatorLiveData<>();

public HotStockViewModel() {
    // Set up the MediatorLiveData to convert DataSnapshot objects into HotStock objects
    hotStockLiveData.addSource(liveData, new Observer<DataSnapshot>() {
        @Override
        public void onChanged(@Nullable final DataSnapshot dataSnapshot) {
            if (dataSnapshot != null) {
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        hotStockLiveData.postValue(dataSnapshot.getValue(HotStock.class));
                    }
                }).start();
            } else {
                hotStockLiveData.setValue(null);
            }
        }
    });
}
```
ở đây chúng ta thấy *addSource()* được gọi ở *MediatorLiveData* instance với source *LiveData* và 1 *Observer* được gọi bất cứ khi nào source pushlish change. Trong khi *onChanged()*  thì việc deserialization được thực thi ở 1 thread khác, thread này làm việc sử dụng *postValue()* để cập nhật đển MediatorLiveData object trái lại thì non-thread làm việc khi datasnapshot = null nó sử dụng *setValue()*, Điều này là đặc thù quan trọng vì postValue chạy ở 1 thead , an toàn cho việc update trong khi setValue() chi được gọi ở Main thread
## Vẫn còn 1 thứ mà có thể nâng cao hiệu suất được nữa
Như trước đã đề cập đó là việc xoay màn hình thì FirebaseQueryLiveData sẽ gọi hàm onInactivce() sau đó lại gọi onActive() và nơi lăng nghe dữ liệu đó cũng thay đổi thay 2 trạng thái . Trong khi có vẻ nó không phải là vấn đề nhưng điều quan trọng là phải nhận ra rằng điều này sẽ làm cho một chuyến đi vòng lặp lại (không cần thiết) */hotstock* . Tôi muốn để listener add và lưu dữ data theo kế hoạch trong trường hợp xoay màn hình. Trong phần tiếp theo của loạt bài này tôi sẽ tái hiện nó. Hãy cũng theo dõi phần tiếp theo của bài viết nhé !
Tham khảo :
https://firebase.google.com/products/realtime-database/
https://developer.android.com/topic/libraries/architecture/livedata.html
https://developer.android.com/topic/libraries/architecture/viewmodel.htmlhttps://developer.android.com/reference/android/arch/lifecycle/Transformations.html