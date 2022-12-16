**UPDATE**: Mã nguồn cho Kotlin các bạn có thể tìm thấy ở [**đây**](https://github.com/DanhDue/AndroidGenericAdapter)
<br />

Trong một ứng dụng Android nói chung hay một ứng dụng Android Java nói riêng, việc truyền thông(passing data, events) giữa các đối tượng, các components là một điều hết sức quan trọng.
Khi đề cập đến vấn đề trên chắc hẳn các bạn sẽ nghĩ ngay đến những công cụ thần thánh sẵn có như: **EventBus**, **Otto**, **ViewModel**, **Lambda**, hay **RxJava, RxAndroid**.

Tuy nhiên, để tránh sự cồng kềnh, phức tạp, đôi khi là thừa thãi(vì không sử dụng hết), hoặc thậm chí là khó kiểm soát thì chúng ta hoàn toàn có thể sử dụng công cụ sẵn có trong các ngôn ngữ lập trình là callbacks(sử dụng interface) và delegate cùng một số kĩ thuật nhỏ giúp cho quá trình giao tiếp giữa các đối tượng, components trong một ứng dụng trở nên dễ dàng và đơn giản.

Bài viết dưới đây mình xin được trình bày việc sử dụng callbacks với một sample nho nhỏ về việc sử dụng nó để giao tiếp giữa các objects, components trong một ứng dụng Android Java.

Để mọi người tiện theo dõi cũng như dễ dàng nắm bắt, hiểu được nội dung truyền tải trong bài viết mình xin chia nội dung ra thành 3 phần:
1. Sử dụng callbacks cơ bản nhằm giao tiếp giữa activity với fragments, và giữa các fragments.
2. Tăng tính tái sử dụng với General Type.
3. Callback everywhere với Observer Pattern.

**UPDATE**: Mã nguồn cho Kotlin các bạn có thể tìm thấy ở [**đây**](https://github.com/DanhDue/AndroidGenericAdapter)
<br />

Không để các bạn đợi lâu mình xin đi ngay vào phần thứ nhất.
## 1. Sử dụng callbacks cơ bản nhằm giao tiếp giữa activity với fragments, và giữa các fragments.

Quá trình giao tiếp giữa Activity và Fragments được thiết lập hết sức đơn giản thông qua Context. Mỗi khi Activity implement Callback của Fragment, chúng ta hoàn toàn có thể lấy Context này trong Fragment và ép kiểu về loại Callback tương ứng và gọi các method.
Điểm qua trọng cần chú ý ở đây là chúng ta phải xử lý ép kiểu context thành Callback cũng như hủy reference của nó đúng thời điểm(Thời điểm trong vòng đời của Fragment)ư

Để lấy được thể hiện của Callback từ context của Activity, chúng ta cần xử lý trong phương thức onAttach(Context context) của Fragment như sau:
```java
public class CFragment extends Fragment {

    private CFragmentListener mListener;

    @OnClick(R.id.tvChangeToViewPager)
    void changeToViewPager() {
        mListener.changeToViewPager();
    }

    public CFragment() {
        // Required empty public constructor
    }

    public static CFragment newInstance() {

        Bundle args = new Bundle();

        CFragment fragment = new CFragment();
        fragment.setArguments(args);
        return fragment;
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_c, container, false);
        ButterKnife.bind(this, view);
        return view;
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof CFragmentListener) {
            mListener = (CFragmentListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface CFragmentListener {
        // TODO: Update argument type and name
        void changeToViewPager();
    }
}

```
Trong ví dụ trên, chúng ta đã ép kiểu context thành CFragmentListener callback của CFragment, đồng thời hủy reference của nó trong method onDetach() nhằm tránh null point exception và memory leak.
Về phía Activity, chúng ta chỉ việc implement CFragmentListener của CFragment như sau:
```java
public class MainActivity extends BaseActivity implements CFragment.CFragmentListener {

    private CarouselFragment mCarouselFragment;
    private CFragment mCFragment;

    @Inject
    AppUtils appUtils;

    @Override
    protected int bindViews() {
        return R.layout.activity_main;
    }

    @Override
    protected void initView() {
        // Creating the ViewPager container fragment once
        mCFragment = CFragment.newInstance();
        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
        transaction.addToBackStack(CarouselFragment.class.getName());
        transaction.replace(R.id.container, mCFragment).commit();
    }

    @Override
    public void changeToViewPager() {
        Timber.d("changeToViewPager()");
        mCarouselFragment = CarouselFragment.newInstance();
        changeFragment(R.id.container, mCarouselFragment, true, CarouselFragment.class.getSimpleName());
    }
}

```

Đến đây, chúng ta đã có thể communicate giữa fragment và Activity thông qua callback này. Mỗi khi Fragment muốn MainActivity chuyển qua screen chứa ViewPager, chúng ta chỉ cần gọi method của callback.
Ở CFragment bên trên, chúng ta xử lý sự kiện OnClick của text view trong CFragment, thông qua CFragmentListener callback, chúng ta có thể thực hiện được đoạn mã(cái đã được implement ở MainActivity).

Với cách thức sử dụng callbacks như ở phần 1, có lẽ ai trong số chúng ta cũng cảm thấy mệt mỏi khi phải lặp đi lặp lại việc khai báo các callbacks quá nhiều lần(Mỗi Fragment lại phải define một callback và n methods cho nó). Vậy làm thế nào để tái sử dụng lại các callbacks nhằm giảm bớt việc khai báo trên?
Generic Types chính là câu trả lời. Để có câu trả lời chi tiết mời các bạn đọc tiếp phần 2.

## 2. Tăng tính tái sử dụng với Generic Types.

Bạn chỉ cần khai báo một interface duy nhất nhằm định nghĩa events cùng với type của chúng. Cũng như tạo một lớp Abstract implement callback này nhằm code những thao tác xử lý chung như việc xử lý ép kiểu callback nhằm tránh null point exception và hủy reference của nó nhằm tránh memory leak theo đúng vòng đời của Fragment.
Việc định nghĩa interface này được thực hiện như sau:
```java
public interface OnEventController {

    int PROVIDE_DATA = 999999;

    /**
     * Send data and Handle Event in App
     *
     * @param eventType
     * @param view
     * @param data
     */
    void onEvent(int eventType, View view, Object data);

    /**
     * Send data and Handle Event in App
     *
     * @param eventType
     * @param view
     * @param data
     */
    void onEvent(int eventType, View view, Object data, OnEventController eventController);

    /**
     * Send data and Handle Event in App
     * @param eventType
     * @param view
     * @param data
     * @param <T>
     */
//    <T> void  onEvent(int eventType, View view, T data);
}
```

Trong interface này việc định nghĩa **int PROVIDE_DATA = 999999;** chính là việc chúng ta định nghĩa một hằng số nhằm định danh cho một eventType.
Giả sử ở đây bạn muốn truyền một event có nội dụng nhằm cung cấp dữ liệu từ Fragment A sang Fragment B, hoặc truyền event này từ một Fragment bất kì về Activity.

Với OnEventController ở bên trên, chúng ta cần chú ý tới 2 methods: **void onEvent(int eventType, View view, Object data);** và **void onEvent(int eventType, View view, Object data, OnEventController eventController);**.
Ở đây chúng ta có sử dụng generic types nhằm tăng cường khả năng truyền data giữa các sự kiện. Phương thức thứ hai, với một đầu vào chính là một thể hiện của chính OnEventController cho phép chúng ta thiết lập callback hai chiều giữa hai đối tượng trong ứng dụng. Giả sử khi bạn truyền thể hiện của OnEventController từ Fragment A cho Fragment B, sau khi thể Fragment B khởi tạo xong, chúng ta có thể bắn callback trở lại cho Fragment A để Fragment A có thể thiết lập lại callback cho Fragment B, hoặc có thể truyền đi n Fragment khác(Cái có ý định truyền thông với B).

```java
public class BFragment extends BaseFragment {

    private OnEventController eventController;

    public BFragment() {
        // Required empty public constructor
    }


    @Override
    protected int bindLayout() {
        return R.layout.fragment_b;
    }

    public static BFragment newInstance(OnEventController eventController) {
        Bundle args = new Bundle();
        BFragment fragment = new BFragment();
        fragment.eventController = eventController;
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    protected void initViews(View inflatedView, Bundle savedInstanceState) {
        eventController.onEvent(SETUP_CALLBACK, null, null, this);
    }

}

```
Ở BFragment bên trên, sau khi khởi tạo thành công, chúng ta lập tức truyền event với type: **SETUP_CALLBACK** lại cho cái khởi tạo nó nhằm thiết lập callback hai chiều.

Việc handle để Activity nhằm lắng nghe các sự kiện từ callback và thực hiện những thao tác tương cũng đơn giản với một abstract class là BaseActivity như bên dưới.

```java
public abstract class BaseActivity extends AppCompatActivity
        implements MvpView, OnEventController {

    protected abstract int bindViews();

    protected abstract void initView();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(bindViews());
//        Window window = getWindow();
////        // clear FLAG_TRANSLUCENT_STATUS flag:
//        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
//        window.setStatusBarColor(Color.TRANSPARENT);

        mUnBinder = ButterKnife.bind(this);
        mActivityComponent = DaggerActivityComponent.builder()
                .activityModule(new ActivityModule(this))
                .applicationComponent(((AppController) getApplication()).getComponent())
                .build();
        initView();
    }

    public void changeFragment(int containerId, Fragment fragment, boolean canBack, String tag) {
        Timber.d("changeFragment(int containerId, Fragment fragment, boolean canBack, String tag)");
        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
        if (canBack) {
            transaction.addToBackStack(null);
        }
        transaction.replace(containerId, fragment);
        transaction.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN);
        transaction.commit();
        getSupportFragmentManager().executePendingTransactions();
    }

    @Override
    public void onEvent(int eventType, View view, Object data) {
        Timber.d("onEvent(int eventType, View view, Object data)");
    }

    @Override
    public void onEvent(int eventType, View view, Object data, OnEventController eventController) {
        Timber.d("onEvent(int eventType, View view, Object data, OnEventController eventController)");
    }
}

```

## 3. Callbacks everywhere với Observer Pattern.
Với những ứng dụng có độ phức tạp lớn hơn chút xíu, khi phải sử dụng nhiều Fragments thì việc truyền qua, truyền lại các thể hiện của callbacks từ Fragment này qua Fragment kia, rồi qua các Apdaters(Adapter của ViewPagers, của RecyclerViews,...) sẽ làm việc quản lý các callbacks trở nên phức tạp. Ví dụ từ Fragment A chứa ViewPager có Fragment B + C. Việc phải truyền callbacks thể hiện của A cho B, C sẽ phải truyền thông qua Adapter của ViewPager là một điều hiển nhiên. Hoặc nếu bạn muốn truyền thể hiện của B cho C thì sao? Câu hỏi lại khó nên thêm một chút nữa có đúng không?

Nhưng bạn yên tâm, chỉ với một kĩ thuật nhỏ sau là bạn có thể giải quyết vấn đề này một cách dễ dàng.

Để truyền callback từ những đối tượng bất kì cho nhau mà không phải truyền thể hiện của nó đi qua rất nhiều đối tượng khác nữa trước khi đến đích, chúng ta có thể sử dụng Observer Pattern(cái đóng vai trò là một segue cái xử lý việc tranfer event tới các đối tượng observer(implement callback).

Bên dưới, mình tạo một thể hiện Singleton đóng vai trò là một Observable nhằm xử lý, điều phối các sự kiện như bên dưới.

```java
public interface Observable {

    //methods to register and unregister observers
    void register(OnEventController obj);
    void unregister(OnEventController obj);

    //method to notify observers of change
    void notifyObservers(int eventType, View view, Object data);

    //method to get updates from subject
    Object getUpdate(OnEventController obj);

    // post message to observer
    void postMessage(int eventType, Object msg);

}

```

```java
public enum ObservableImpl implements Observable {
    INSTANCE;

    private Context mContext;

    private List<OnEventController> lstObservers = new ArrayList<>();
    private Object message;
    private boolean changed;
    private final Object MUTEX= new Object();

    public static ObservableImpl newInstance(Context context) {
        INSTANCE.mContext = context;
        return INSTANCE;
    }

    @Override
    public void register(OnEventController obj) {
        Timber.d("register(OnEventController obj)");
        if(obj == null) throw new NullPointerException("Observer is null.");
        synchronized (MUTEX) {
            if(!lstObservers.contains(obj)) lstObservers.add(obj);
        }
    }

    @Override
    public void unregister(OnEventController obj) {
        synchronized (MUTEX) {
            lstObservers.remove(obj);
        }
    }

    @Override
    public void notifyObservers(int eventType, View view, Object data) {
        List<OnEventController> observersLocal = null;
        //synchronization is used to make sure any observer registered after message is received is not notified
        synchronized (MUTEX) {
            if (!changed) return;
            observersLocal = new ArrayList<>(this.lstObservers);
            this.changed=false;
        }
        for (OnEventController obj : observersLocal) {
            obj.onEvent(eventType, null, data);
        }
    }

    @Override
    public Object getUpdate(OnEventController obj) {
        return message;
    }

    @Override
    public void postMessage(int eventType, Object msg) {
        this.message = msg;
        this.changed = true;
        notifyObservers(eventType, null, msg);
    }
}

```

Như vậy, ở bất cứ nơi đâu chúng ta cần truyền sự kiện + data cho một đối tượng observer khác, chúng ta chỉ cần gọi thể hiện ObservableImpl Singleton, đăng kí listener với câu lệnh **ObservableImpl.INSTANCE.register(this);**, rồi gọi postMessage(int eventType, Object msg) method.
Điều quan trọng là các bạn phải xử lý việc hủy đăng kí callback mỗi khi object của mình bị hủy nhằm tránh memory leak với câu lệnh **ObservableImpl.INSTANCE.unregister(this);**.

Ngoài ra, với mỗi component riêng biệt, chúng ta hoàn toàn có thể tạo những đối tượng Observable riêng nhằm xử lý tập trung việc truyền calbacks qua lại giữa các đối tượng trong đó.


## Kết luận.
Việc xử lý truyền thông giữa các đối tượng, components trong một ứng dụng Android nói riêng, hay một ứng dụng phần mềm nói chung là một việc rất quan trọng(Trong thế giới thực, không gì có thể tồn tại một mình mà không trao đổi, giao tiếp qua lại với thứ khác).
Chính vì vậy, việc thành thạo một công cụ nhằm xử lý quá trình giao tiếp giữa các đối tượng, components trong ứng dụng cũng có tầm quan trọng không kém.
Trên đây là những chia sẻ về ý tưởng của mình trong việc sử dụng callbacks, hy vọng nó sẽ cung cấp thêm cho các bạn những ý tưởng, cách thức tuy không phải là mới nhưng khá hữu ích về việc xử lý truyền thông trong một ứng dụng Android.

Một version được viết cho Kotlin các bạn có thể tìm thấy ở đây:<br />
https://github.com/DanhDue/AndroidGenericAdapter

{>;} Happy Coding !!!