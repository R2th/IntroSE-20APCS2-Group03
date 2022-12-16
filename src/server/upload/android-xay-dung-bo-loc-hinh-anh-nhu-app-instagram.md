Ngày nay các bộ lọc hình ảnh khá phổ biến trong nhiều ứng dụng Android. Instagram nổi tiếng với tính năng bộ lọc phổ biến và có lẽ là ứng dụng đầu tiên giới thiệu bộ lọc hình ảnh cho thế giới Android. 
Có rất nhiều ứng dụng chỉnh sửa hình ảnh khác cung cấp các bộ lọc hình ảnh và các tính năng chỉnh sửa hình ảnh.

Trong bài viết này, chúng ta sẽ tìm hiểu cách xây dựng một ứng dụng bộ lọc hình ảnh như Instagram. 
Chúng ta không phát triển chính xác các bộ lọc hình ảnh trong Instagram mà chúng ta sẽ sử dụng các bộ lọc ma fthuw viện cung cấp.

## 1. Bộ lọc hình ảnh được xây dựng như thế nào

Thông thường các thao tác xử lý ảnh sẽ được thực hiện bằng ngôn ngữ native C / C ++ bản địa. 
Trong Android, bạn có thể viết thư viện của mình bằng C hoặc C ++ và sử dụng **JNI** (Java Native Interface) để làm cho các hàm có thể truy cập thông qua code java. 
Bạn cũng có thể xem xét sử dụng các thư viện xử lý ảnh phổ biến như [openCV](https://opencv.org/) để tạo thư viện bộ lọc của riêng bạn.

Chúng tã sẽ sử dụng thư viện bộ lọc hình ảnh hiện có trong bài viết này.

## 2. Sử dụng thư viện AndroidPhotoFilters

Trong bài viết này, chúng ta sẽ sử dụng thư viện bộ lọc hình ảnh [AndroidPhotoFilters](https://github.com/Zomato/AndroidPhotoFilters) được phát triển bởi Zomato. 
Thư viện này cung cấp các thao tác chỉnh sửa hình ảnh cơ bản như kiểm soát Độ sáng, Độ bão hòa, Độ tương phản và một vài bộ lọc hình ảnh. 

Kết hợp tất cả các tính năng này với nhau, bạn có thể tạo ra một app chỉnh sửa hình ảnh cơ bản.

Cũng cần nhớ rằng thư viện rất cơ bản, bạn không thể đạt được các bộ lọc tuyệt vời như Instagram bằng cách này. 
Để xây dựng bộ lọc chính xác như Instagram, rất nhiều code Native C/C++ phải được thực hiện.

Nhưng chúng ta sẽ cố gắng đạt được các bộ lọc giống như Instagram.

Sử dụng thư viện như sau :

```
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    // ...
 
    implementation 'info.androidhive:imagefilters:1.0.7'
}
```

## 3. Xây dựng ứng dụng

![](https://images.viblo.asia/a7208cad-de81-41d9-9420-3bc0c448a67b.png)

1. Tạo project mới **File ⇒ New Project => Basic Activity**
2. Sử dụng các thư viện cần thiết sau trong app/build.gradle :

```
dependencies {
    // ...
 
    // image filters
    implementation 'info.androidhive:imagefilters:1.0.7'
 
    // butter knife
    compile 'com.jakewharton:butterknife:8.8.1'
    annotationProcessor 'com.jakewharton:butterknife-compiler:8.8.1'
 
    // dexter M permissions
    compile 'com.karumi:dexter:4.1.0'
 
    compile 'com.android.support:recyclerview-v7:26.1.0'
}
```

3. Thêm các resource trong **strings.xml**, **colors.xml**, **dimens.xml**, **styles.xml** :

```
<resources>
    <string name="app_name">Image Filters</string>
    <string name="activity_title_main">Filters</string>
    <string name="action_settings">Settings</string>
    <string name="filters">FILTERS</string>
    <string name="edit">EDIT</string>
 
    <string name="lbl_brightness">BRIGHTNESS</string>
    <string name="lbl_contrast">CONTRAST</string>
    <string name="lbl_saturation">SATURATION</string>
    <string name="tab_filters">FILTERS</string>
    <string name="tab_edit">EDIT</string>
 
 
    <string name="roboto_medium">sans-serif-medium</string>
    <string name="filter_normal">Normal</string>
    <string name="action_save">SAVE</string>
    <string name="action_open">OPEN</string>
</resources>
```

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#3F51B5</color>
    <color name="colorPrimaryDark">#303F9F</color>
    <color name="colorAccent">#009688</color>
    <color name="color_option_menu">#FF3990</color>
    <color name="filter_label_normal">#8A8889</color>
    <color name="filter_label_selected">#221F20</color>
</resources>
```

```
dimens.xml
<resources>
    <dimen name="fab_margin">16dp</dimen>
    <dimen name="thumbnail_size">80dp</dimen>
    <dimen name="recycler_size">100dp</dimen>
    <dimen name="thumbnail_horizontal_padding">8dp</dimen>
    <dimen name="thumbnail_vertical_padding">10dp</dimen>
    <dimen name="padding_10">10dp</dimen>
    <dimen name="margin_horizontal">16dp</dimen>
    <dimen name="lbl_edit_image_control">100dp</dimen>
</resources>
```

```
<resources>
 
    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>
 
    <style name="AppTheme.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
    </style>
 
    <style name="AppTheme.NoActionBar.Fullscreen">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="android:windowFullscreen">true</item>
        <item name="android:actionMenuTextColor">@color/color_option_menu</item>
    </style>
 
    <style name="AppTheme.AppBarOverlay" parent="ThemeOverlay.AppCompat.Light" />
 
    <style name="AppTheme.PopupOverlay" parent="ThemeOverlay.AppCompat.Light" />
 
</resources>
```

4. Thêm các Permission sau :

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="info.androidhive.imagefilters">
 
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
 
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBar.Fullscreen">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
 
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
 
</manifest>
```

5. Thêm **menu res => menu => menu_main.xml** :

```
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context="info.androidhive.imagefilters.MainActivity">
    <item
        android:id="@+id/action_open"
        android:orderInCategory="100"
        android:title="@string/action_open"
        app:showAsAction="always" />
 
    <item
        android:id="@+id/action_save"
        android:orderInCategory="101"
        android:title="@string/action_save"
        app:showAsAction="always" />
</menu>
```

6. Tạo package uitls => BitmapUtils.java :

```
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.content.res.AssetManager;
import android.content.res.Resources;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;
 
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
 
/**
 * Created by ravi on 06/11/17.
 */
 
public class BitmapUtils {
 
    private static final String TAG = BitmapUtils.class.getSimpleName();
 
    /**
     * Getting bitmap from Assets folder
     *
     * @return
     */
    public static Bitmap getBitmapFromAssets(Context context, String fileName, int width, int height) {
        AssetManager assetManager = context.getAssets();
 
        InputStream istr;
        Bitmap bitmap = null;
        try {
            final BitmapFactory.Options options = new BitmapFactory.Options();
            options.inJustDecodeBounds = true;
 
            istr = assetManager.open(fileName);
 
            // Calculate inSampleSize
            options.inSampleSize = calculateInSampleSize(options, width, height);
 
            // Decode bitmap with inSampleSize set
            options.inJustDecodeBounds = false;
            return BitmapFactory.decodeStream(istr, null, options);
        } catch (IOException e) {
            Log.e(TAG, "Exception: " + e.getMessage());
        }
 
        return null;
    }
 
    /**
     * Getting bitmap from Gallery
     *
     * @return
     */
    public static Bitmap getBitmapFromGallery(Context context, Uri path, int width, int height) {
        String[] filePathColumn = {MediaStore.Images.Media.DATA};
        Cursor cursor = context.getContentResolver().query(path, filePathColumn, null, null, null);
        cursor.moveToFirst();
        int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
        String picturePath = cursor.getString(columnIndex);
        cursor.close();
 
        final BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(picturePath, options);
 
        // Calculate inSampleSize
        options.inSampleSize = calculateInSampleSize(options, width, height);
 
        // Decode bitmap with inSampleSize set
        options.inJustDecodeBounds = false;
        return BitmapFactory.decodeFile(picturePath, options);
    }
 
    private static int calculateInSampleSize(
            BitmapFactory.Options options, int reqWidth, int reqHeight) {
        // Raw height and width of image
        final int height = options.outHeight;
        final int width = options.outWidth;
        int inSampleSize = 1;
 
        if (height > reqHeight || width > reqWidth) {
 
            final int halfHeight = height / 2;
            final int halfWidth = width / 2;
 
            // Calculate the largest inSampleSize value that is a power of 2 and keeps both
            // height and width larger than the requested height and width.
            while ((halfHeight / inSampleSize) >= reqHeight
                    && (halfWidth / inSampleSize) >= reqWidth) {
                inSampleSize *= 2;
            }
        }
 
        return inSampleSize;
    }
 
    public static Bitmap decodeSampledBitmapFromResource(Resources res, int resId,
                                                         int reqWidth, int reqHeight) {
 
        // First decode with inJustDecodeBounds=true to check dimensions
        final BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;
        BitmapFactory.decodeResource(res, resId, options);
 
        // Calculate inSampleSize
        options.inSampleSize = calculateInSampleSize(options, reqWidth, reqHeight);
 
        // Decode bitmap with inSampleSize set
        options.inJustDecodeBounds = false;
        return BitmapFactory.decodeResource(res, resId, options);
    }
 
    /**
     * Storing image to device gallery
     * @param cr
     * @param source
     * @param title
     * @param description
     * @return
     */
    public static final String insertImage(ContentResolver cr,
                                           Bitmap source,
                                           String title,
                                           String description) {
 
        ContentValues values = new ContentValues();
        values.put(MediaStore.Images.Media.TITLE, title);
        values.put(MediaStore.Images.Media.DISPLAY_NAME, title);
        values.put(MediaStore.Images.Media.DESCRIPTION, description);
        values.put(MediaStore.Images.Media.MIME_TYPE, "image/jpeg");
        // Add the date meta data to ensure the image is added at the front of the gallery
        values.put(MediaStore.Images.Media.DATE_ADDED, System.currentTimeMillis());
        values.put(MediaStore.Images.Media.DATE_TAKEN, System.currentTimeMillis());
 
        Uri url = null;
        String stringUrl = null;    /* value to be returned */
 
        try {
            url = cr.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
 
            if (source != null) {
                OutputStream imageOut = cr.openOutputStream(url);
                try {
                    source.compress(Bitmap.CompressFormat.JPEG, 50, imageOut);
                } finally {
                    imageOut.close();
                }
 
                long id = ContentUris.parseId(url);
                // Wait until MINI_KIND thumbnail is generated.
                Bitmap miniThumb = MediaStore.Images.Thumbnails.getThumbnail(cr, id, MediaStore.Images.Thumbnails.MINI_KIND, null);
                // This is for backward compatibility.
                storeThumbnail(cr, miniThumb, id, 50F, 50F, MediaStore.Images.Thumbnails.MICRO_KIND);
            } else {
                cr.delete(url, null, null);
                url = null;
            }
        } catch (Exception e) {
            if (url != null) {
                cr.delete(url, null, null);
                url = null;
            }
        }
 
        if (url != null) {
            stringUrl = url.toString();
        }
 
        return stringUrl;
    }
 
    /**
     * A copy of the Android internals StoreThumbnail method, it used with the insertImage to
     * populate the android.provider.MediaStore.Images.Media#insertImage with all the correct
     * meta data. The StoreThumbnail method is private so it must be duplicated here.
     *
     * @see android.provider.MediaStore.Images.Media (StoreThumbnail private method)
     */
    private static final Bitmap storeThumbnail(
            ContentResolver cr,
            Bitmap source,
            long id,
            float width,
            float height,
            int kind) {
 
        // create the matrix to scale it
        Matrix matrix = new Matrix();
 
        float scaleX = width / source.getWidth();
        float scaleY = height / source.getHeight();
 
        matrix.setScale(scaleX, scaleY);
 
        Bitmap thumb = Bitmap.createBitmap(source, 0, 0,
                source.getWidth(),
                source.getHeight(), matrix,
                true
        );
 
        ContentValues values = new ContentValues(4);
        values.put(MediaStore.Images.Thumbnails.KIND, kind);
        values.put(MediaStore.Images.Thumbnails.IMAGE_ID, (int) id);
        values.put(MediaStore.Images.Thumbnails.HEIGHT, thumb.getHeight());
        values.put(MediaStore.Images.Thumbnails.WIDTH, thumb.getWidth());
 
        Uri url = cr.insert(MediaStore.Images.Thumbnails.EXTERNAL_CONTENT_URI, values);
 
        try {
            OutputStream thumbOut = cr.openOutputStream(url);
            thumb.compress(Bitmap.CompressFormat.JPEG, 100, thumbOut);
            thumbOut.close();
            return thumb;
        } catch (FileNotFoundException ex) {
            return null;
        } catch (IOException ex) {
            return null;
        }
    }
}
```

Trong pạkeage utiles , tạo **NonSwipeableViewPager.java **

```
import android.content.Context;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.animation.DecelerateInterpolator;
import android.widget.Scroller;
 
import java.lang.reflect.Field;
 
/**
 * Created by ravi on 24/10/17.
 * Custom viewpager disabling the swipe
 * https://stackoverflow.com/questions/9650265/how-do-disable-paging-by-swiping-with-finger-in-viewpager-but-still-be-able-to-s
 */
 
public class NonSwipeableViewPager extends ViewPager {
 
    public NonSwipeableViewPager(Context context) {
        super(context);
        setMyScroller();
    }
 
    public NonSwipeableViewPager(Context context, AttributeSet attrs) {
        super(context, attrs);
        setMyScroller();
    }
 
    @Override
    public boolean onInterceptTouchEvent(MotionEvent event) {
        // Never allow swiping to switch between pages
        return false;
    }
 
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        // Never allow swiping to switch between pages
        return false;
    }
 
    //down one is added for smooth scrolling
 
    private void setMyScroller() {
        try {
            Class<?> viewpager = ViewPager.class;
            Field scroller = viewpager.getDeclaredField("mScroller");
            scroller.setAccessible(true);
            scroller.set(this, new MyScroller(getContext()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
 
    public class MyScroller extends Scroller {
        public MyScroller(Context context) {
            super(context, new DecelerateInterpolator());
        }
 
        @Override
        public void startScroll(int startX, int startY, int dx, int dy, int duration) {
            super.startScroll(startX, startY, dx, dy, 350 /*1 secs*/);
        }
    }
}
```

Tạo thêm class **SpacesItemDecoration.java** :

```
import android.graphics.Rect;
import android.support.v7.widget.RecyclerView;
import android.view.View;
 
/**
 * Created by ravi on 23/10/17.
 */
 
public class SpacesItemDecoration extends RecyclerView.ItemDecoration {
    private int space;
 
    public SpacesItemDecoration(int space) {
        this.space = space;
    }
 
    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        if (parent.getChildAdapterPosition(view) == state.getItemCount() - 1) {
            outRect.left = space;
            outRect.right = 0;
        }else{
            outRect.right = space;
            outRect.left = 0;
        }
    }
}
```

Xây dựng layout cho item của RecyclerView : **res => layout => thumbnail_list_item.xml** :

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="match_parent"
    android:orientation="vertical">
 
    <TextView
        android:id="@+id/filter_name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginBottom="5dp"
        android:layout_marginTop="5dp"
        android:fontFamily="@string/roboto_medium" />
 
    <ImageView
        android:id="@+id/thumbnail"
        android:layout_width="@dimen/thumbnail_size"
        android:layout_height="@dimen/thumbnail_size"
        android:src="@mipmap/ic_launcher" />
 
</LinearLayout>
```

**ThumbnailsAdapter.java** :

```
import android.content.Context;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
 
import com.zomato.photofilters.imageprocessors.Filter;
import com.zomato.photofilters.utils.ThumbnailItem;
 
import java.util.List;
 
import butterknife.BindView;
import butterknife.ButterKnife;
 
/**
 * Created by ravi on 23/10/17.
 */
 
public class ThumbnailsAdapter extends RecyclerView.Adapter<ThumbnailsAdapter.MyViewHolder> {
 
    private List<ThumbnailItem> thumbnailItemList;
    private ThumbnailsAdapterListener listener;
    private Context mContext;
    private int selectedIndex = 0;
 
    public class MyViewHolder extends RecyclerView.ViewHolder {
        @BindView(R.id.thumbnail)
        ImageView thumbnail;
 
        @BindView(R.id.filter_name)
        TextView filterName;
 
        public MyViewHolder(View view) {
            super(view);
 
            ButterKnife.bind(this, view);
        }
    }
 
 
    public ThumbnailsAdapter(Context context, List<ThumbnailItem> thumbnailItemList, ThumbnailsAdapterListener listener) {
        mContext = context;
        this.thumbnailItemList = thumbnailItemList;
        this.listener = listener;
    }
 
    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.thumbnail_list_item, parent, false);
 
        return new MyViewHolder(itemView);
    }
 
    @Override
    public void onBindViewHolder(MyViewHolder holder, final int position) {
        final ThumbnailItem thumbnailItem = thumbnailItemList.get(position);
 
        holder.thumbnail.setImageBitmap(thumbnailItem.image);
 
        holder.thumbnail.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                listener.onFilterSelected(thumbnailItem.filter);
                selectedIndex = position;
                notifyDataSetChanged();
            }
        });
 
        holder.filterName.setText(thumbnailItem.filterName);
 
        if (selectedIndex == position) {
            holder.filterName.setTextColor(ContextCompat.getColor(mContext, R.color.filter_label_selected));
        } else {
            holder.filterName.setTextColor(ContextCompat.getColor(mContext, R.color.filter_label_normal));
        }
    }
 
    @Override
    public int getItemCount() {
        return thumbnailItemList.size();
    }
 
    public interface ThumbnailsAdapterListener {
        void onFilterSelected(Filter filter);
    }
}
```

Thêm Image Filters List Fragment như sau :
+ Tạp fragment mới : **File ⇒ New ⇒ Fragment ⇒ Fragment (Blank) => FiltersListFragment.java. **
+ Mở layout của fragment **fragment_filters_list.xml ** :

```
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="info.androidhive.imagefilters.FiltersListFragment">
 
    <android.support.v7.widget.RecyclerView
        android:id="@+id/recycler_view"
        android:layout_gravity="center_vertical"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:clipChildren="false"
        android:padding="4dp"
        android:scrollbars="none" />
</FrameLayout>
```

**FiltersListFragment.java** :

```
import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
 
import com.zomato.photofilters.FilterPack;
import com.zomato.photofilters.imageprocessors.Filter;
import com.zomato.photofilters.utils.ThumbnailItem;
import com.zomato.photofilters.utils.ThumbnailsManager;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
import butterknife.BindView;
import butterknife.ButterKnife;
import info.androidhive.imagefilters.utils.BitmapUtils;
import info.androidhive.imagefilters.utils.SpacesItemDecoration;
 
 
public class FiltersListFragment extends Fragment implements ThumbnailsAdapter.ThumbnailsAdapterListener {
    @BindView(R.id.recycler_view)
    RecyclerView recyclerView;
 
    ThumbnailsAdapter mAdapter;
 
    List<ThumbnailItem> thumbnailItemList;
 
    FiltersListFragmentListener listener;
 
    public void setListener(FiltersListFragmentListener listener) {
        this.listener = listener;
    }
 
    public FiltersListFragment() {
        // Required empty public constructor
    }
 
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
 
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_filters_list, container, false);
 
        ButterKnife.bind(this, view);
 
        thumbnailItemList = new ArrayList<>();
        mAdapter = new ThumbnailsAdapter(getActivity(), thumbnailItemList, this);
 
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
        recyclerView.setLayoutManager(mLayoutManager);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        int space = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 8,
                getResources().getDisplayMetrics());
        recyclerView.addItemDecoration(new SpacesItemDecoration(space));
        recyclerView.setAdapter(mAdapter);
 
        prepareThumbnail(null);
 
        return view;
    }
 
    /**
     * Renders thumbnails in horizontal list
     * loads default image from Assets if passed param is null
     *
     * @param bitmap
     */
    public void prepareThumbnail(final Bitmap bitmap) {
        Runnable r = new Runnable() {
            public void run() {
                Bitmap thumbImage;
 
                if (bitmap == null) {
                    thumbImage = BitmapUtils.getBitmapFromAssets(getActivity(), MainActivity.IMAGE_NAME, 100, 100);
                } else {
                    thumbImage = Bitmap.createScaledBitmap(bitmap, 100, 100, false);
                }
 
                if (thumbImage == null)
                    return;
 
                ThumbnailsManager.clearThumbs();
                thumbnailItemList.clear();
 
                // add normal bitmap first
                ThumbnailItem thumbnailItem = new ThumbnailItem();
                thumbnailItem.image = thumbImage;
                thumbnailItem.filterName = getString(R.string.filter_normal);
                ThumbnailsManager.addThumb(thumbnailItem);
 
                List<Filter> filters = FilterPack.getFilterPack(getActivity());
 
                for (Filter filter : filters) {
                    ThumbnailItem tI = new ThumbnailItem();
                    tI.image = thumbImage;
                    tI.filter = filter;
                    tI.filterName = filter.getName();
                    ThumbnailsManager.addThumb(tI);
                }
 
                thumbnailItemList.addAll(ThumbnailsManager.processThumbs(getActivity()));
 
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        mAdapter.notifyDataSetChanged();
                    }
                });
            }
        };
 
        new Thread(r).start();
    }
 
    @Override
    public void onFilterSelected(Filter filter) {
        if (listener != null)
            listener.onFilterSelected(filter);
    }
 
    public interface FiltersListFragmentListener {
        void onFilterSelected(Filter filter);
    }
}
```

Bây giờ chúng ta sẽ thêm fragment cung cấp thao tác chỉnh sửa hình ảnh cơ bản như kiểm soát Độ sáng, Độ bão hòa, Độ tương phản.
Tạo **EditImageFragment.java** và layout của fragment này là **fragment_edit_image.xml** :

**fragment_edit_image.xml**

```
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center_vertical"
    android:orientation="vertical"
    android:paddingLeft="@dimen/margin_horizontal"
    android:paddingRight="@dimen/margin_horizontal"
    tools:context="info.androidhive.imagefilters.EditImageFragment">
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:paddingBottom="@dimen/padding_10"
        android:paddingTop="@dimen/padding_10">
 
 
        <TextView
            android:layout_width="@dimen/lbl_edit_image_control"
            android:layout_height="wrap_content"
            android:text="@string/lbl_brightness" />
 
        <SeekBar
            android:id="@+id/seekbar_brightness"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1" />
    </LinearLayout>
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:paddingBottom="@dimen/padding_10"
        android:paddingTop="@dimen/padding_10">
 
 
        <TextView
            android:layout_width="@dimen/lbl_edit_image_control"
            android:layout_height="wrap_content"
            android:text="@string/lbl_contrast" />
 
        <SeekBar
            android:id="@+id/seekbar_contrast"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1" />
    </LinearLayout>
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:paddingBottom="@dimen/padding_10"
        android:paddingTop="@dimen/padding_10">
 
        <TextView
            android:layout_width="@dimen/lbl_edit_image_control"
            android:layout_height="wrap_content"
            android:text="@string/lbl_saturation" />
 
        <SeekBar
            android:id="@+id/seekbar_saturation"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1" />
    </LinearLayout>
 
</LinearLayout>
```

**EditImageFragment.java **

```
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.SeekBar;
 
import butterknife.BindView;
import butterknife.ButterKnife;
 
 
public class EditImageFragment extends Fragment implements SeekBar.OnSeekBarChangeListener {
 
    private EditImageFragmentListener listener;
 
    @BindView(R.id.seekbar_brightness)
    SeekBar seekBarBrightness;
 
    @BindView(R.id.seekbar_contrast)
    SeekBar seekBarContrast;
 
    @BindView(R.id.seekbar_saturation)
    SeekBar seekBarSaturation;
 
    public void setListener(EditImageFragmentListener listener) {
        this.listener = listener;
    }
 
    public EditImageFragment() {
        // Required empty public constructor
    }
 
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
 
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_edit_image, container, false);
 
        ButterKnife.bind(this, view);
 
        // keeping brightness value b/w -100 / +100
        seekBarBrightness.setMax(200);
        seekBarBrightness.setProgress(100);
 
        // keeping contrast value b/w 1.0 - 3.0
        seekBarContrast.setMax(20);
        seekBarContrast.setProgress(0);
 
        // keeping saturation value b/w 0.0 - 3.0
        seekBarSaturation.setMax(30);
        seekBarSaturation.setProgress(10);
 
        seekBarBrightness.setOnSeekBarChangeListener(this);
        seekBarContrast.setOnSeekBarChangeListener(this);
        seekBarSaturation.setOnSeekBarChangeListener(this);
 
        return view;
    }
 
    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean b) {
        if (listener != null) {
 
            if (seekBar.getId() == R.id.seekbar_brightness) {
                // brightness values are b/w -100 to +100
                listener.onBrightnessChanged(progress - 100);
            }
 
            if (seekBar.getId() == R.id.seekbar_contrast) {
                // converting int value to float
                // contrast values are b/w 1.0f - 3.0f
                // progress = progress > 10 ? progress : 10;
                progress += 10;
                float floatVal = .10f * progress;
                listener.onContrastChanged(floatVal);
            }
 
            if (seekBar.getId() == R.id.seekbar_saturation) {
                // converting int value to float
                // saturation values are b/w 0.0f - 3.0f
                float floatVal = .10f * progress;
                listener.onSaturationChanged(floatVal);
            }
        }
    }
 
    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {
        if (listener != null)
            listener.onEditStarted();
    }
 
    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
        if (listener != null)
            listener.onEditCompleted();
    }
 
    public void resetControls() {
        seekBarBrightness.setProgress(100);
        seekBarContrast.setProgress(0);
        seekBarSaturation.setProgress(10);
    }
 
    public interface EditImageFragmentListener {
        void onBrightnessChanged(int brightness);
 
        void onSaturationChanged(float saturation);
 
        void onContrastChanged(float contrast);
 
        void onEditStarted();
 
        void onEditCompleted();
    }
}
```

Hãy tạo các layout sau :

**activity_main.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="info.androidhive.imagefilters.MainActivity">
 
    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">
 
        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="@android:color/white"
            app:popupTheme="@style/AppTheme.PopupOverlay" />
 
    </android.support.design.widget.AppBarLayout>
 
    <include layout="@layout/content_main" />
 
</android.support.design.widget.CoordinatorLayout>
```

**content_main.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/white"
    android:orientation="vertical"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="info.androidhive.imagefilters.MainActivity"
    tools:showIn="@layout/activity_main">
 
    <ImageView
        android:id="@+id/image_preview"
        android:layout_width="match_parent"
        android:layout_height="360dp"
        android:scaleType="centerCrop" />
 
    <info.androidhive.imagefilters.utils.NonSwipeableViewPager
        android:id="@+id/viewpager"
        android:layout_width="match_parent"
        android:layout_height="120dp"
        android:layout_above="@+id/tabs"
        android:layout_below="@+id/image_preview"
        app:layout_behavior="@string/appbar_scrolling_view_behavior" />
 
    <android.support.design.widget.TabLayout
        android:id="@+id/tabs"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        app:tabGravity="fill"
        app:tabMode="fixed" />
 
</RelativeLayout>
```

Quay trở lại với **MainActivity.java** :

```
import android.Manifest;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.CoordinatorLayout;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;
 
import com.karumi.dexter.Dexter;
import com.karumi.dexter.MultiplePermissionsReport;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionRequest;
import com.karumi.dexter.listener.multi.MultiplePermissionsListener;
import com.zomato.photofilters.imageprocessors.Filter;
import com.zomato.photofilters.imageprocessors.subfilters.BrightnessSubFilter;
import com.zomato.photofilters.imageprocessors.subfilters.ContrastSubFilter;
import com.zomato.photofilters.imageprocessors.subfilters.SaturationSubfilter;
 
import java.util.ArrayList;
import java.util.List;
 
import butterknife.BindView;
import butterknife.ButterKnife;
import info.androidhive.imagefilters.utils.BitmapUtils;
 
public class MainActivity extends AppCompatActivity implements FiltersListFragment.FiltersListFragmentListener, EditImageFragment.EditImageFragmentListener {
 
    private static final String TAG = MainActivity.class.getSimpleName();
 
    public static final String IMAGE_NAME = "dog.jpg";
 
    public static final int SELECT_GALLERY_IMAGE = 101;
 
    @BindView(R.id.image_preview)
    ImageView imagePreview;
 
    @BindView(R.id.tabs)
    TabLayout tabLayout;
 
    @BindView(R.id.viewpager)
    ViewPager viewPager;
 
    @BindView(R.id.coordinator_layout)
    CoordinatorLayout coordinatorLayout;
 
    Bitmap originalImage;
    // to backup image with filter applied
    Bitmap filteredImage;
 
    // the final image after applying
    // brightness, saturation, contrast
    Bitmap finalImage;
 
    FiltersListFragment filtersListFragment;
    EditImageFragment editImageFragment;
 
    // modified image values
    int brightnessFinal = 0;
    float saturationFinal = 1.0f;
    float contrastFinal = 1.0f;
 
    // load native image filters library
    static {
        System.loadLibrary("NativeImageProcessor");
    }
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);
 
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(getString(R.string.activity_title_main));
 
        loadImage();
 
        setupViewPager(viewPager);
        tabLayout.setupWithViewPager(viewPager);
    }
 
    private void setupViewPager(ViewPager viewPager) {
        ViewPagerAdapter adapter = new ViewPagerAdapter(getSupportFragmentManager());
 
        // adding filter list fragment
        filtersListFragment = new FiltersListFragment();
        filtersListFragment.setListener(this);
 
        // adding edit image fragment
        editImageFragment = new EditImageFragment();
        editImageFragment.setListener(this);
 
        adapter.addFragment(filtersListFragment, getString(R.string.tab_filters));
        adapter.addFragment(editImageFragment, getString(R.string.tab_edit));
 
        viewPager.setAdapter(adapter);
    }
 
    @Override
    public void onFilterSelected(Filter filter) {
        // reset image controls
        resetControls();
 
        // applying the selected filter
        filteredImage = originalImage.copy(Bitmap.Config.ARGB_8888, true);
        // preview filtered image
        imagePreview.setImageBitmap(filter.processFilter(filteredImage));
 
        finalImage = filteredImage.copy(Bitmap.Config.ARGB_8888, true);
    }
 
    @Override
    public void onBrightnessChanged(final int brightness) {
        brightnessFinal = brightness;
        Filter myFilter = new Filter();
        myFilter.addSubFilter(new BrightnessSubFilter(brightness));
        imagePreview.setImageBitmap(myFilter.processFilter(finalImage.copy(Bitmap.Config.ARGB_8888, true)));
    }
 
    @Override
    public void onSaturationChanged(final float saturation) {
        saturationFinal = saturation;
        Filter myFilter = new Filter();
        myFilter.addSubFilter(new SaturationSubfilter(saturation));
        imagePreview.setImageBitmap(myFilter.processFilter(finalImage.copy(Bitmap.Config.ARGB_8888, true)));
    }
 
    @Override
    public void onContrastChanged(final float contrast) {
        contrastFinal = contrast;
        Filter myFilter = new Filter();
        myFilter.addSubFilter(new ContrastSubFilter(contrast));
        imagePreview.setImageBitmap(myFilter.processFilter(finalImage.copy(Bitmap.Config.ARGB_8888, true)));
    }
 
    @Override
    public void onEditStarted() {
 
    }
 
    @Override
    public void onEditCompleted() {
        // once the editing is done i.e seekbar is drag is completed,
        // apply the values on to filtered image
        final Bitmap bitmap = filteredImage.copy(Bitmap.Config.ARGB_8888, true);
 
        Filter myFilter = new Filter();
        myFilter.addSubFilter(new BrightnessSubFilter(brightnessFinal));
        myFilter.addSubFilter(new ContrastSubFilter(contrastFinal));
        myFilter.addSubFilter(new SaturationSubfilter(saturationFinal));
        finalImage = myFilter.processFilter(bitmap);
    }
 
    /**
     * Resets image edit controls to normal when new filter
     * is selected
     */
    private void resetControls() {
        if (editImageFragment != null) {
            editImageFragment.resetControls();
        }
        brightnessFinal = 0;
        saturationFinal = 1.0f;
        contrastFinal = 1.0f;
    }
 
    class ViewPagerAdapter extends FragmentPagerAdapter {
        private final List<Fragment> mFragmentList = new ArrayList<>();
        private final List<String> mFragmentTitleList = new ArrayList<>();
 
        public ViewPagerAdapter(FragmentManager manager) {
            super(manager);
        }
 
        @Override
        public Fragment getItem(int position) {
            return mFragmentList.get(position);
        }
 
        @Override
        public int getCount() {
            return mFragmentList.size();
        }
 
        public void addFragment(Fragment fragment, String title) {
            mFragmentList.add(fragment);
            mFragmentTitleList.add(title);
        }
 
        @Override
        public CharSequence getPageTitle(int position) {
            return mFragmentTitleList.get(position);
        }
    }
 
    // load the default image from assets on app launch
    private void loadImage() {
        originalImage = BitmapUtils.getBitmapFromAssets(this, IMAGE_NAME, 300, 300);
        filteredImage = originalImage.copy(Bitmap.Config.ARGB_8888, true);
        finalImage = originalImage.copy(Bitmap.Config.ARGB_8888, true);
        imagePreview.setImageBitmap(originalImage);
    }
 
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }
 
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
 
        if (id == R.id.action_open) {
            openImageFromGallery();
            return true;
        }
 
        if (id == R.id.action_save) {
            saveImageToGallery();
            return true;
        }
 
        return super.onOptionsItemSelected(item);
    }
 
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_OK && requestCode == SELECT_GALLERY_IMAGE) {
            Bitmap bitmap = BitmapUtils.getBitmapFromGallery(this, data.getData(), 800, 800);
 
            // clear bitmap memory
            originalImage.recycle();
            finalImage.recycle();
            finalImage.recycle();
 
            originalImage = bitmap.copy(Bitmap.Config.ARGB_8888, true);
            filteredImage = originalImage.copy(Bitmap.Config.ARGB_8888, true);
            finalImage = originalImage.copy(Bitmap.Config.ARGB_8888, true);
            imagePreview.setImageBitmap(originalImage);
            bitmap.recycle();
 
            // render selected image thumbnails
            filtersListFragment.prepareThumbnail(originalImage);
        }
    }
 
    private void openImageFromGallery() {
        Dexter.withActivity(this).withPermissions(Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                .withListener(new MultiplePermissionsListener() {
                    @Override
                    public void onPermissionsChecked(MultiplePermissionsReport report) {
                        if (report.areAllPermissionsGranted()) {
                            Intent intent = new Intent(Intent.ACTION_PICK);
                            intent.setType("image/*");
                            startActivityForResult(intent, SELECT_GALLERY_IMAGE);
                        } else {
                            Toast.makeText(getApplicationContext(), "Permissions are not granted!", Toast.LENGTH_SHORT).show();
                        }
                    }
 
                    @Override
                    public void onPermissionRationaleShouldBeShown(List<PermissionRequest> permissions, PermissionToken token) {
                        token.continuePermissionRequest();
                    }
                }).check();
    }
 
    /*
    * saves image to camera gallery
    * */
    private void saveImageToGallery() {
        Dexter.withActivity(this).withPermissions(Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                .withListener(new MultiplePermissionsListener() {
                    @Override
                    public void onPermissionsChecked(MultiplePermissionsReport report) {
                        if (report.areAllPermissionsGranted()) {
                            final String path = BitmapUtils.insertImage(getContentResolver(), finalImage, System.currentTimeMillis() + "_profile.jpg", null);
                            if (!TextUtils.isEmpty(path)) {
                                Snackbar snackbar = Snackbar
                                        .make(coordinatorLayout, "Image saved to gallery!", Snackbar.LENGTH_LONG)
                                        .setAction("OPEN", new View.OnClickListener() {
                                            @Override
                                            public void onClick(View view) {
                                                openImage(path);
                                            }
                                        });
 
                                snackbar.show();
                            } else {
                                Snackbar snackbar = Snackbar
                                        .make(coordinatorLayout, "Unable to save image!", Snackbar.LENGTH_LONG);
 
                                snackbar.show();
                            }
                        } else {
                            Toast.makeText(getApplicationContext(), "Permissions are not granted!", Toast.LENGTH_SHORT).show();
                        }
                    }
 
                    @Override
                    public void onPermissionRationaleShouldBeShown(List<PermissionRequest> permissions, PermissionToken token) {
                        token.continuePermissionRequest();
                    }
                }).check();
 
    }
 
    // opening image in default image viewer app
    private void openImage(String path) {
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_VIEW);
        intent.setDataAndType(Uri.parse(path), "image/*");
        startActivity(intent);
    }
}
```

Chạy ứng dụng và kiểm tra một lần. Bạn sẽ thấy giao diện đẹp như trong bài viết. Bạn có thể áp dụng các bộ lọc khác nhau từ danh sách và có thể kiểm soát độ sáng, độ bão hòa và độ tương phản.

![](https://images.viblo.asia/3bb5602b-d20a-474a-8371-142792ff2be5.jpg)