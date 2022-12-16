## 1. RecyclerView Search Filter – getFilter()

Android cung cấp class [Filterable](https://developer.android.com/reference/android/widget/Filterable.html) để lọc dữu liệu theo bộ lọc có điều kiện.
Thông thường, phương thức getFilter () được overwrite trong lớp adapter có điều kiện bộ lọc được cung cấp để tìm kiếm thông qua một danh sách. 

Dưới đây là một ví dụ về phương thức getFilter () để tìm kiếm một danh bạ theo tên hoặc số điện thoại từ danh sách các danh bạ :

```
@Override
    public Filter getFilter() {
        return new Filter() {
            @Override
            protected FilterResults performFiltering(CharSequence charSequence) {
                String charString = charSequence.toString();
                if (charString.isEmpty()) {
                    contactListFiltered = contactList;
                } else {
                    List<Contact> filteredList = new ArrayList<>();
                    for (Contact row : contactList) {
 
                        // name match condition. this might differ depending on your requirement
                        // here we are looking for name or phone number match
                        if (row.getName().toLowerCase().contains(charString.toLowerCase()) || row.getPhone().contains(charSequence)) {
                            filteredList.add(row);
                        }
                    }
 
                    contactListFiltered = filteredList;
                }
 
                FilterResults filterResults = new FilterResults();
                filterResults.values = contactListFiltered;
                return filterResults;
            }
 
            @Override
            protected void publishResults(CharSequence charSequence, FilterResults filterResults) {
                contactListFiltered = (ArrayList<Contact>) filterResults.values;
 
                // refresh the list with filtered data
                notifyDataSetChanged();
            }
        };
    }
```

## 2. Sử dụng JSON

Trong bài viết này, chúng ta sẽ sử dụng Json chứa danh sách các danh bạ, mỗi danh bạ bao gồm tên, số điện thoại và ảnh cá nhân.

https://api.androidhive.info/json/contacts.json

```
[{
        "name": "Tom Hardy",
        "image": "https://api.androidhive.info/json/images/tom_hardy.jpg",
        "phone": "(541) 754-3010"
    },
    {
        "name": "Johnny Depp",
        "image": "https://api.androidhive.info/json/images/johnny.jpg",
        "phone": "(452) 839-1210"
    }
]

```

## 3. Tạo Project

- Mở Android Studio : File ⇒ New Project và chọn Basic Activity.
- Trong app/build.gradle, chúng ta sử dụng các thư viện sau :

```
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    // ...
 
    // recycler view
    implementation 'com.android.support:recyclerview-v7:26.1.0'
 
    // glide image library
    implementation 'com.github.bumptech.glide:glide:4.3.1'
 
    // volley http library
    implementation 'com.android.volley:volley:1.0.0'
    implementation 'com.google.code.gson:gson:2.6.2'
 
}
```

Thêm các resource :  strings.xml, dimens.xml, colors.xml 

**strings.xml**

```
<resources>
    <string name="app_name">RecyclerView Search</string>
    <string name="action_settings">Settings</string>
    <string name="toolbar_title">Contacts</string>
    <string name="action_search">Search</string>
    <string name="search_hint">Type name…</string>
</resources>
```

**dimens.xml**

```
<resources>
    <dimen name="fab_margin">16dp</dimen>
    <dimen name="activity_margin">16dp</dimen>
    <dimen name="thumbnail">40dp</dimen>
    <dimen name="row_padding">10dp</dimen>
    <dimen name="contact_name">15dp</dimen>
    <dimen name="contact_number">12dp</dimen>
</resources>
```

**colors.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#111</color>
    <color name="colorPrimaryDark">#FFF</color>
    <color name="colorAccent">#ea3732</color>
    <color name="contact_name">#333333</color>
    <color name="contact_number">#8c8c8c</color>
</resources>
```

- Download folder sau : [res.zip](https://api.androidhive.info/res/searc/res.zip) và thêm vào folder drawables của Project.
Nó chứa các icon search sử dụng ở toolbar.

- Khởi tạo MyApplication như sau :

```
import android.app.Application;
import android.text.TextUtils;
 
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;
 
public class MyApplication extends Application {
 
    public static final String TAG = MyApplication.class
            .getSimpleName();
 
    private RequestQueue mRequestQueue;
 
    private static MyApplication mInstance;
 
    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;
    }
 
    public static synchronized MyApplication getInstance() {
        return mInstance;
    }
 
    public RequestQueue getRequestQueue() {
        if (mRequestQueue == null) {
            mRequestQueue = Volley.newRequestQueue(getApplicationContext());
        }
 
        return mRequestQueue;
    }
 
    public <T> void addToRequestQueue(Request<T> req, String tag) {
        // set the default tag if tag is empty
        req.setTag(TextUtils.isEmpty(tag) ? TAG : tag);
        getRequestQueue().add(req);
    }
 
    public <T> void addToRequestQueue(Request<T> req) {
        req.setTag(TAG);
        getRequestQueue().add(req);
    }
 
    public void cancelPendingRequests(Object tag) {
        if (mRequestQueue != null) {
            mRequestQueue.cancelAll(tag);
        }
    }
}
```

**AndroidManifest.xml **

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="info.androidhive.recyclerviewsearch">
 
    <uses-permission android:name="android.permission.INTERNET" />
 
    <application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBar">
 
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
 
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
 
</manifest>
```

Chúng ta cần parser file json, tạo model **Contact.java** như sau :

```
public class Contact {
    String name;
    String image;
    String phone;
 
    public Contact() {
    }
 
    public String getName() {
        return name;
    }
 
    public String getImage() {
        return image;
    }
 
    public String getPhone() {
        return phone;
    }
}
```

Tạo class **MyDividerItemDecoration.java** để phân chia các item của RecyclerView :

```
import android.content.Context;
import android.content.res.Resources;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.TypedValue;
import android.view.View;
 
/**
 * Created by ravi on 17/11/17.
 */
 
public class MyDividerItemDecoration  extends RecyclerView.ItemDecoration {
 
    private static final int[] ATTRS = new int[]{
            android.R.attr.listDivider
    };
 
    public static final int HORIZONTAL_LIST = LinearLayoutManager.HORIZONTAL;
 
    public static final int VERTICAL_LIST = LinearLayoutManager.VERTICAL;
 
    private Drawable mDivider;
    private int mOrientation;
    private Context context;
    private int margin;
 
    public MyDividerItemDecoration(Context context, int orientation, int margin) {
        this.context = context;
        this.margin = margin;
        final TypedArray a = context.obtainStyledAttributes(ATTRS);
        mDivider = a.getDrawable(0);
        a.recycle();
        setOrientation(orientation);
    }
 
    public void setOrientation(int orientation) {
        if (orientation != HORIZONTAL_LIST && orientation != VERTICAL_LIST) {
            throw new IllegalArgumentException("invalid orientation");
        }
        mOrientation = orientation;
    }
 
    @Override
    public void onDrawOver(Canvas c, RecyclerView parent, RecyclerView.State state) {
        if (mOrientation == VERTICAL_LIST) {
            drawVertical(c, parent);
        } else {
            drawHorizontal(c, parent);
        }
    }
 
    public void drawVertical(Canvas c, RecyclerView parent) {
        final int left = parent.getPaddingLeft();
        final int right = parent.getWidth() - parent.getPaddingRight();
 
        final int childCount = parent.getChildCount();
        for (int i = 0; i < childCount; i++) {
            final View child = parent.getChildAt(i);
            final RecyclerView.LayoutParams params = (RecyclerView.LayoutParams) child
                    .getLayoutParams();
            final int top = child.getBottom() + params.bottomMargin;
            final int bottom = top + mDivider.getIntrinsicHeight();
            mDivider.setBounds(left + dpToPx(margin), top, right, bottom);
            mDivider.draw(c);
        }
    }
 
    public void drawHorizontal(Canvas c, RecyclerView parent) {
        final int top = parent.getPaddingTop();
        final int bottom = parent.getHeight() - parent.getPaddingBottom();
 
        final int childCount = parent.getChildCount();
        for (int i = 0; i < childCount; i++) {
            final View child = parent.getChildAt(i);
            final RecyclerView.LayoutParams params = (RecyclerView.LayoutParams) child
                    .getLayoutParams();
            final int left = child.getRight() + params.rightMargin;
            final int right = left + mDivider.getIntrinsicHeight();
            mDivider.setBounds(left, top + dpToPx(margin), right, bottom - dpToPx(margin));
            mDivider.draw(c);
        }
    }
 
    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        if (mOrientation == VERTICAL_LIST) {
            outRect.set(0, 0, 0, mDivider.getIntrinsicHeight());
        } else {
            outRect.set(0, 0, mDivider.getIntrinsicWidth(), 0);
        }
    }
 
    private int dpToPx(int dp) {
        Resources r = context.getResources();
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, r.getDisplayMetrics()));
    }
}
```

## 4. Viết lớp Adapter với Filter

**user_row_item.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="?attr/selectableItemBackground"
    android:clickable="true"
    android:paddingBottom="@dimen/row_padding"
    android:paddingLeft="@dimen/activity_margin"
    android:paddingRight="@dimen/activity_margin"
    android:paddingTop="@dimen/row_padding">
 
    <ImageView
        android:id="@+id/thumbnail"
        android:layout_width="@dimen/thumbnail"
        android:layout_height="@dimen/thumbnail"
        android:layout_centerVertical="true"
        android:layout_marginRight="@dimen/row_padding" />
 
    <TextView
        android:id="@+id/name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_toRightOf="@id/thumbnail"
        android:fontFamily="sans-serif-medium"
        android:textColor="@color/contact_name"
        android:textSize="@dimen/contact_name" />
 
    <TextView
        android:id="@+id/phone"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/name"
        android:layout_toRightOf="@id/thumbnail"
        android:textColor="@color/contact_number"
        android:textSize="@dimen/contact_number" />
 
</RelativeLayout>
```

**ContactsAdapter.java**

```
import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;
 
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
 
import java.util.ArrayList;
import java.util.List;
 
/**
 * Created by ravi on 16/11/17.
 */
 
public class ContactsAdapter extends RecyclerView.Adapter<ContactsAdapter.MyViewHolder>
        implements Filterable {
    private Context context;
    private List<Contact> contactList;
    private List<Contact> contactListFiltered;
    private ContactsAdapterListener listener;
 
    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView name, phone;
        public ImageView thumbnail;
 
        public MyViewHolder(View view) {
            super(view);
            name = view.findViewById(R.id.name);
            phone = view.findViewById(R.id.phone);
            thumbnail = view.findViewById(R.id.thumbnail);
 
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    // send selected contact in callback
                    listener.onContactSelected(contactListFiltered.get(getAdapterPosition()));
                }
            });
        }
    }
 
 
    public ContactsAdapter(Context context, List<Contact> contactList, ContactsAdapterListener listener) {
        this.context = context;
        this.listener = listener;
        this.contactList = contactList;
        this.contactListFiltered = contactList;
    }
 
    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.user_row_item, parent, false);
 
        return new MyViewHolder(itemView);
    }
 
    @Override
    public void onBindViewHolder(MyViewHolder holder, final int position) {
        final Contact contact = contactListFiltered.get(position);
        holder.name.setText(contact.getName());
        holder.phone.setText(contact.getPhone());
 
        Glide.with(context)
                .load(contact.getImage())
                .apply(RequestOptions.circleCropTransform())
                .into(holder.thumbnail);
    }
 
    @Override
    public int getItemCount() {
        return contactListFiltered.size();
    }
 
    @Override
    public Filter getFilter() {
        return new Filter() {
            @Override
            protected FilterResults performFiltering(CharSequence charSequence) {
                String charString = charSequence.toString();
                if (charString.isEmpty()) {
                    contactListFiltered = contactList;
                } else {
                    List<Contact> filteredList = new ArrayList<>();
                    for (Contact row : contactList) {
 
                        // name match condition. this might differ depending on your requirement
                        // here we are looking for name or phone number match
                        if (row.getName().toLowerCase().contains(charString.toLowerCase()) || row.getPhone().contains(charSequence)) {
                            filteredList.add(row);
                        }
                    }
 
                    contactListFiltered = filteredList;
                }
 
                FilterResults filterResults = new FilterResults();
                filterResults.values = contactListFiltered;
                return filterResults;
            }
 
            @Override
            protected void publishResults(CharSequence charSequence, FilterResults filterResults) {
                contactListFiltered = (ArrayList<Contact>) filterResults.values;
                notifyDataSetChanged();
            }
        };
    }
 
    public interface ContactsAdapterListener {
        void onContactSelected(Contact contact);
    }
}
```

## 5. Thêm Search Widget and Filtering List

**res ⇒ menu => menu_main.xml**

```
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context="info.androidhive.recyclerviewsearch.MainActivity">
    <item
        android:id="@+id/action_search"
        android:icon="@drawable/ic_search_black_24dp"
        android:orderInCategory="100"
        android:title="@string/action_search"
        app:showAsAction="always"
        app:actionViewClass="android.support.v7.widget.SearchView" />
</menu>
```

**res ⇒ xml => searchable.xml **

```
<?xml version="1.0" encoding="utf-8"?>
<searchable xmlns:android="http://schemas.android.com/apk/res/android"
    android:hint="@string/search_hint"
    android:label="@string/app_name" />
```

**AndroidManifest.xml **

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="info.androidhive.recyclerviewsearch">
 
    <uses-permission android:name="android.permission.INTERNET" />
 
    <application ...>
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBar">
 
            <meta-data
                android:name="android.app.searchable"
                android:resource="@xml/searchable" />
 
            <intent-filter>
                <action android:name="android.intent.action.SEARCH" />
            </intent-filter>
 
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
 
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
 
</manifest>
```

**activity_main.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="info.androidhive.recyclerviewsearch.MainActivity">
 
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
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="info.androidhive.recyclerviewsearch.MainActivity"
    tools:showIn="@layout/activity_main">
 
    <android.support.v7.widget.RecyclerView
        android:id="@+id/recycler_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:scrollbars="vertical" />
 
</RelativeLayout>
```

**MainActivity.java**

```
import android.app.SearchManager;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;
 
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
 
import org.json.JSONArray;
 
import java.util.ArrayList;
import java.util.List;
 
public class MainActivity extends AppCompatActivity implements ContactsAdapter.ContactsAdapterListener {
    private static final String TAG = MainActivity.class.getSimpleName();
    private RecyclerView recyclerView;
    private List<Contact> contactList;
    private ContactsAdapter mAdapter;
    private SearchView searchView;
 
    // url to fetch contacts json
    private static final String URL = "https://api.androidhive.info/json/contacts.json";
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
 
        // toolbar fancy stuff
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(R.string.toolbar_title);
 
        recyclerView = findViewById(R.id.recycler_view);
        contactList = new ArrayList<>();
        mAdapter = new ContactsAdapter(this, contactList, this);
 
        // white background notification bar
        whiteNotificationBar(recyclerView);
 
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(getApplicationContext());
        recyclerView.setLayoutManager(mLayoutManager);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.addItemDecoration(new MyDividerItemDecoration(this, DividerItemDecoration.VERTICAL, 36));
        recyclerView.setAdapter(mAdapter);
 
        fetchContacts();
    }
 
    /**
     * fetches json by making http calls
     */
    private void fetchContacts() {
        JsonArrayRequest request = new JsonArrayRequest(URL,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        if (response == null) {
                            Toast.makeText(getApplicationContext(), "Couldn't fetch the contacts! Pleas try again.", Toast.LENGTH_LONG).show();
                            return;
                        }
 
                        List<Contact> items = new Gson().fromJson(response.toString(), new TypeToken<List<Contact>>() {
                        }.getType());
 
                        // adding contacts to contacts list
                        contactList.clear();
                        contactList.addAll(items);
 
                        // refreshing recycler view
                        mAdapter.notifyDataSetChanged();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                // error in getting json
                Log.e(TAG, "Error: " + error.getMessage());
                Toast.makeText(getApplicationContext(), "Error: " + error.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
 
        MyApplication.getInstance().addToRequestQueue(request);
    }
 
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
 
        // Associate searchable configuration with the SearchView
        SearchManager searchManager = (SearchManager) getSystemService(Context.SEARCH_SERVICE);
        searchView = (SearchView) menu.findItem(R.id.action_search)
                .getActionView();
        searchView.setSearchableInfo(searchManager
                .getSearchableInfo(getComponentName()));
        searchView.setMaxWidth(Integer.MAX_VALUE);
 
        // listening to search query text change
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                // filter recycler view when query submitted
                mAdapter.getFilter().filter(query);
                return false;
            }
 
            @Override
            public boolean onQueryTextChange(String query) {
                // filter recycler view when text is changed
                mAdapter.getFilter().filter(query);
                return false;
            }
        });
        return true;
    }
 
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
 
        //noinspection SimplifiableIfStatement
        if (id == R.id.action_search) {
            return true;
        }
 
        return super.onOptionsItemSelected(item);
    }
 
    @Override
    public void onBackPressed() {
        // close search view on back button pressed
        if (!searchView.isIconified()) {
            searchView.setIconified(true);
            return;
        }
        super.onBackPressed();
    }
 
    private void whiteNotificationBar(View view) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            int flags = view.getSystemUiVisibility();
            flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            view.setSystemUiVisibility(flags);
            getWindow().setStatusBarColor(Color.WHITE);
        }
    }
 
    @Override
    public void onContactSelected(Contact contact) {
        Toast.makeText(getApplicationContext(), "Selected: " + contact.getName() + ", " + contact.getPhone(), Toast.LENGTH_LONG).show();
    }
}
```

![](https://images.viblo.asia/5764cbaa-c9de-42d5-8c74-34d871ec04ef.png)