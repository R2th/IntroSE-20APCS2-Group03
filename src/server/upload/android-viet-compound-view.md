Trong bài viết này, tôi sẽ nói về compound view trong Android.

* **What is a compound view?**
* **What are the advantages of using it?**
* **How to write one?**

Tôi sẽ trả lời câu hỏi này bằng cách viết một compound view đơn giản hiển thị xếp hạng từ các mạng xã hội.

![](https://images.viblo.asia/238042c1-20d6-4c0e-a958-7c7a15eda3b7.png)

## What is a compound view ?

Compound view về cơ bản là một ViewGround có các hành động được xác định trước và một tập hợp các View bên trong nó. Trong ví dụ này, compound view là một LinearLayout cùng với 3 TextView bên trong, animation và hiệu ứng *fadeIn*.

## What are the advantages of a compound view?

* Đóng gói và tập trung xử lý logic.
* Tránh code duplicate.
* Dễ dàng maintain và modify trong tương lai.

## Writing a compound view

Hãy tưởng tượng ứng dụng của mình hiển thị các số điểm ưa thích của ứng dụng và những POI đó có các rating được liên kết từ nhiều nguồn khác nhau, bạn sẽ hiển thị rating ở nhiều nơi, POI có thể có xếp hạng Facebook nhưng không phải là Foursquare và trong tương lai chúng ta có thể có nguồn xếp hạng mới.

Sử dụng compound view, Tôi có thể gói gọn tất cả logic này và có thể dễ dàng thay đổi nó trong tương lai nếu cần thiết.

### XML Layout

```java
<merge xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">

    <TextView
        android:id="@+id/facebookTv"
        android:textColor="@android:color/black"
        android:textSize="16sp"
        android:drawableStart="@drawable/ic_facebook"
        android:drawableLeft="@drawable/ic_facebook"
        android:drawablePadding="4dp"
        android:gravity="center_vertical"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/yelpTv"
        android:textColor="@android:color/black"
        android:textSize="16sp"
        android:drawableStart="@drawable/ic_yelp"
        android:drawableLeft="@drawable/ic_yelp"
        android:drawablePadding="4dp"
        android:gravity="center_vertical"
        android:layout_centerVertical="true"
        android:layout_marginStart="12dp"
        android:layout_marginLeft="12dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/foursquareTv"
        android:textColor="@android:color/black"
        android:textSize="16sp"
        android:drawableStart="@drawable/ic_foursquare"
        android:drawableLeft="@drawable/ic_foursquare"
        android:layout_centerVertical="true"
        android:gravity="center_vertical"
        android:drawablePadding="4dp"
        android:layout_marginStart="12dp"
        android:layout_marginLeft="12dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

</merge>
```

Đây là file XML layout tôi đang sử dụng để inflate vào LinearLayout, chú ý **merge** Đây là một thành phần quan trọng, thẻ merge là một cách để tránh ViewGroup dư thừa, nói cách khác, nếu chúng ta inflate này vào LinearLayout, chúng ta sẽ không nên sử dụng LinearLayout parent trong XML, nếu không cuối cùng chúng ta sẽ có 2 LinearLayout, 1 trong số đó không cần thiết.

**Không dùng merge**
   
* LinearLayout -> LinearLayout -> 3 TextViews
    
**Sử dụng merge**
    
* LinearLayout -> 3 TextViews
    
### RatingsView

```java
public class RatingsView extends LinearLayout {

    //Text views
    private TextView mFacebookTv,mYelpTv,mFoursquareTv;
    private POI mPOI;

    public RatingsView(Context context) {
        this(context,null);
    }

    public RatingsView(Context context, AttributeSet attrs) {
        this(context, attrs,0);
    }

    public RatingsView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public RatingsView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init();
    }


    /**
     * Initialize view
     */
    private void init(){

        //Inflate xml resource, pass "this" as the parent, we use <merge> tag in xml to avoid
        //redundant parent, otherwise a LinearLayout will be added to this LinearLayout ending up
        //with two view groups
        inflate(getContext(),R.layout.ratings_layout,this);

        //Get references to text views
        mFacebookTv  = (TextView)findViewById(R.id.facebookTv);
        mYelpTv      = (TextView)findViewById(R.id.yelpTv);
        mFoursquareTv = (TextView)findViewById(R.id.foursquareTv);

        //Initially all views are gone
        mFacebookTv.setVisibility(GONE);
        mYelpTv.setVisibility(GONE);
        mFoursquareTv.setVisibility(GONE);

        //Reset alpha
        mFacebookTv.setAlpha(0);
        mYelpTv.setAlpha(0);
        mFoursquareTv.setAlpha(0);

        //Animate views with a nice fadeIn effect before drawing
        getViewTreeObserver().addOnPreDrawListener(new ViewTreeObserver.OnPreDrawListener() {
            @Override
            public boolean onPreDraw() {

                getViewTreeObserver().removeOnPreDrawListener(this);

                if(mPOI.hasFacebookRating())
                    ViewCompat.animate(mFacebookTv).alpha(1).setDuration(500);

                if(mPOI.hasYelpRating())
                    ViewCompat.animate(mYelpTv).alpha(1).setStartDelay(120).setDuration(500);

                if(mPOI.hasFoursquareRating())
                    ViewCompat.animate(mFoursquareTv).alpha(1).setStartDelay(240).setDuration(500);

                return false;
            }
        });
    }

    public void setPOI(POI poi) {
        mPOI = poi;
        setupView();
    }

    //This method is called to show the ratings
    private void setupView(){

        if(mPOI.hasFacebookRating()){
            mFacebookTv.setVisibility(VISIBLE);
            mFacebookTv.setText(String.valueOf(mPOI.getFacebookRating()));
        }

        if(mPOI.hasFoursquareRating()) {
            mFoursquareTv.setVisibility(VISIBLE);
            mFoursquareTv.setText(String.valueOf(mPOI.getFoursquareRating()));
        }

        if(mPOI.hasYelpRating()){
            mYelpTv.setVisibility(VISIBLE);
            mYelpTv.setText(String.valueOf(mPOI.getYelpRating()));
        }

    }

}
```

Method init() là nơi logic xảy ra, chúng inflate vào XML layout và truyền "this"  vào parameter thứ 3, các View inflate sẽ được thêm vào như là children của LinearLayout. Sau đó, tôi set visibility cho views là gone và thêm animation đơn giản *fadeIn*.

setPOI() nhận một đối tượng POI và thiết lập chế độ xem để hiện thị xếp hạng khả dụng cho POI đó. Và điều đó, tôi biết có một compound view mà tôi có thể sử dụng ở mọi nơi trong ứng dụng của mình.

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        //Get rating view
        RatingsView ratingsView = (RatingsView)findViewById(R.id.ratingsView);

        //Create a dummy POI with some values for ratings
        POI poi = new POI();
        poi.setFacebookRating(8.8f);
        poi.setYelpRating(7f);
        poi.setFoursquareRating(6.3f);

        //Pass the POI to rating view
        ratingsView.setPOI(poi);

    }
}
```

```java
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent" android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin" tools:context=".MainActivity">

    <sserra.compoundview.RatingsView
        android:id="@+id/ratingsView"
        android:layout_centerInParent="true"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

</RelativeLayout>
```

Bạn có thể thấy rằng điều này tránh duplicate logic mỗi lần tôi muốn hiển thị rating, nếu tôi cần thêm rating mới, tôi chỉ cần thay đổi nó trong class RatingsView để tránh code duplicate.

## Tài liệu tham khảo
https://medium.com/@Sserra90/android-writing-a-compound-view-1eacbf1957fc