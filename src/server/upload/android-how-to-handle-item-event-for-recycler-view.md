Việc setup sự kiện onClick cho item của RecyclerView trong Android đã ko còn quá xa lạ với nhiều lập trình viên, nhưng trong bài viết này chúng ta sẽ cùng nhau xây dựng một thư viện để bắt các sự kiện như `onTap`, `onDoubleTap` và `onLongPress` để có thể sử dụng lại một cách nhanh chóng và đơn giản :D

Chúng ta sẽ tạo một project là `item-handle`, sau đó tạo một android module là `handling`

![](https://images.viblo.asia/60cb94b8-d6a7-4de8-81cb-11f06d769d25.png)

Trước hết chúng ta sẽ xây dựng module trước nhé :D

### Xây dựng module
#### Thêm dependence
Vì chúng ta đang xây dựng thư viện cho RecyclerView nên chúng ta cần add vào trong module
```groovy
compile 'com.android.support:recyclerview-v7:26.0.0-alpha1'
```

#### Tạo các class và interface cần thiết

![](https://images.viblo.asia/2dcaa60d-dd5c-47c4-b1e6-659b167497da.png)

1. OnItemActionListener

Chungs ta sẽ tạo interface này để định nghĩa các action mà mình cần handle
```java
public interface OnItemActionListener {
    void onTap(View view, int position);
    void onLongTap(View view, int position);
    void onDoubleTap(View view, int position);
}
```
2. ItemAction

Chúng ta sẽ dùng abstract class này để handle action của interface trên. Điều này giúp người sử dụng thư viện có thể handle action mà họ muốn mà ko cần phải handle cả 3 action trên.
```java
public abstract class ItemAction implements OnItemActionListener{

    @Override
    public void onTap(View view, int position) {

    }

    @Override
    public void onLongTap(View view, int position) {

    }

    @Override
    public void onDoubleTap(View view, int position) {

    }
}
```
3. SimpleViewHolder

Xử lý các event với ViewHolder và GestureDetector
```java
public class SimpleViewHolder extends RecyclerView.ViewHolder {

    private OnItemActionListener mOnItemActionListener;

    private View mView;

    public SimpleViewHolder(View itemView) {
        super(itemView);
        mView = itemView;
        mView.setOnTouchListener(new View.OnTouchListener() {
            private GestureDetector gestureDetector =
                    new GestureDetector(mView.getContext(), new GestureDetector.SimpleOnGestureListener() {
                        @Override
                        public boolean onDoubleTap(MotionEvent e) {
                            if (mOnItemActionListener != null) {
                                mOnItemActionListener.onDoubleTap(mView, getAdapterPosition());
                            }
                            return true;
                        }

                        @Override
                        public boolean onSingleTapConfirmed(MotionEvent e) {
                            if (mOnItemActionListener != null) {
                                mOnItemActionListener.onTap(mView, getAdapterPosition());
                            }
                            return true;
                        }

                        @Override
                        public void onLongPress(MotionEvent e) {
                            if (mOnItemActionListener != null) {
                                mOnItemActionListener.onLongTap(mView, getAdapterPosition());
                            }
                        }
                    });

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                gestureDetector.onTouchEvent(event);
                return true;
            }
        });
    }

    void setHandler(OnItemActionListener onItemActionListener) {
        mOnItemActionListener = onItemActionListener;
    }
}
```

4. SimpleAdapter

Cái này đơn giản rồi các bạn nhỉ, tạo ra để set listener cho holder thoai :D

```java
public abstract class SimpleAdapter extends RecyclerView.Adapter<SimpleViewHolder> {

    private OnItemActionListener mOnItemActionListener;
    
    @Override
    public void onBindViewHolder(SimpleViewHolder holder, int position) {
        holder.setHandler(mOnItemActionListener);
    }

    void setHandler(OnItemActionListener onItemClickListener) {
        mOnItemActionListener = onItemClickListener;
    }
}
```
5. SimpleRecyclerView

Cuối cùng là tạo một recyclerView để nhận ItemAction. Khi Dev khác sử dụng sẽ extends class này :D
```java
public class SimpleRecyclerView extends RecyclerView {

    public SimpleRecyclerView(Context context) {
        super(context);
    }

    public SimpleRecyclerView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public SimpleRecyclerView(Context context, @Nullable AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public void setOnItemAction(OnItemActionListener onItemAction) {
        if (this.getAdapter() != null && this.getAdapter() instanceof SimpleAdapter) {
            SimpleAdapter adapter = ((SimpleAdapter) this.getAdapter());
            adapter.setHandler(onItemAction);
        }
    }
}
```

### Sử dụng module

Chúng ta sẽ làm trong module `app` mà đã tạo ban đầu nhé. Để đơn giản list của chúng ta là một danh sách các số kiểu nguyên, mỗi item là một `TextView`

#### Thêm module vào gradle của project
```groovy
implementation project(':handling')
```

#### Tạo resource
1. activity_main.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.simple.empty.MainActivity"
    >

    <com.simple.handling.SimpleRecyclerView
        android:id="@+id/simple_recycler_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

</RelativeLayout>
```
2. item.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="10dp"
    android:gravity="center">

    <TextView
        android:id="@+id/text_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        />

</LinearLayout>
```

#### Tạo các class cần thiết
1. Adapter

Trong này chúng ta sẽ extends adapter và viewholder. Code cũng khá đơn giản thôi D:

```java
public class SampleAdapter extends SimpleAdapter {

    private List<String> mList;

    public SampleAdapter(List<String> list) {
        mList = list;
    }

    @Override
    public SimpleViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(SimpleViewHolder holder, int position) {
        super.onBindViewHolder(holder, position);
        TextView textView = holder.itemView.findViewById(R.id.text_view);
        textView.setText(mList.get(position));
    }

    @Override
    public int getItemCount() {
        return mList == null ? 0 : mList.size();
    }

    private class ViewHolder extends SimpleViewHolder {
        ViewHolder(View itemView) {
            super(itemView);
        }
    }
}
```

2. MainActivity

Cuối cùng là tạo dữ liệu giả và set các sự kiện cho RecyclerView của mình thôi :D

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        List<String> list = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            list.add("" + i);
        }

        SimpleRecyclerView simpleRecyclerView =
                (SimpleRecyclerView) findViewById(R.id.simple_recycler_view);
        simpleRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        simpleRecyclerView.setHasFixedSize(true);
        simpleRecyclerView.setAdapter(new SampleAdapter(list));
        simpleRecyclerView.setOnItemAction(new ItemAction() {
            @Override
            public void onTap(View view, int position) {
                Log.i("tap", position + "");
            }

            @Override
            public void onLongTap(View view, int position) {
                Log.i("long", position + "");
            }

            @Override
            public void onDoubleTap(View view, int position) {
                Log.i("double", position + "");
            }
        });

    }
}
```

* Chú ý: Chúng ta chỉ cần `Override` action mà chúng ta muốn thôi .


### Public module

Cách đơn giản nhất chính là sử dụng github :D Chi tiết các bạn có thể tham khảo ở bài viết của mình ở đây nhé [here](https://viblo.asia/p/how-to-publish-an-android-library-module-on-jitpack-924lJMe6ZPM)



#### Cảm ơn các bạn đã đọc bài viết. Happy coding!