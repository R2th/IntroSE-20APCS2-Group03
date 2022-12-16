Mời các bạn đọc **phần 1** tại [link](https://viblo.asia/p/databinding-trong-android-phan-1-3Q75wpxJKWb) này

**Video demo**

{@youtube:https://www.youtube.com/watch?v=n2jHHWCO464}

# 1. Tạo dự án mới
## Bước 1. 
Tạo project mới: File ⇒ New Project và chọn Basic Activity từ templates.

## Bước 2. 
Enable DataBiding trong app/build.gradle. Ngoài ra, thêm dependencies của RecyclerView và Glide sau đó, đồng bộ hóa dự án.

```
android {
    dataBinding {
        enabled = true
    }
}
 
dependencies {
    //...
 
    implementation 'com.github.bumptech.glide:glide:4.6.1'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.6.1'
 
    implementation 'com.android.support:recyclerview-v7:27.1.0'
}
```

## Bước 3. 
Thêm quyền truy cập INTERNET trong AndroidManifest.xml vì hình ảnh cần được tải từ URL.

`<uses-permission android:name="android.permission.INTERNET" />`

## Bước 4. 
Download [res.zip](https://api.androidhive.info/res/data-binding/res.zip) sau đó thêm vào thư mục res dự án của bạn. Các thư mục drawable chứa biểu tượng dấu cộng cần thiết cho FAB.

## Bước 5. 
Thêm các resources bên dưới vào strings.xml, dimens.xml và colors.xml tương ứng

```xml
strings.xml
<resources>
    <string name="app_name">Data Binding</string>
    <string name="action_settings">Settings</string>
    <string name="toolbar_profile">Profile</string>
    <string name="posts">POSTS</string>
    <string name="followers">FOLLOWERS</string>
    <string name="following">FOLLOWING</string>
</resources>
```

```xml
dimens.xml
<resources>
    <dimen name="fab_margin">16dp</dimen>
    <dimen name="activity_margin">16dp</dimen>
    <dimen name="dimen_8dp">8dp</dimen>
    <dimen name="profile_image">100dp</dimen>
    <dimen name="fab_profile">30dp</dimen>
    <dimen name="profile_name">15dp</dimen>
    <dimen name="profile_about">13dp</dimen>
    <dimen name="profile_meta">24dp</dimen>
    <dimen name="profile_meta_label">10dp</dimen>
</resources>
```

```xml
colors.xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#222222</color>
    <color name="colorPrimaryDark">#111111</color>
    <color name="colorAccent">#fecb2f</color>
    <color name="profile_meta">#333</color>
</resources>
```

## Bước 6. 
Tạo ba packages có tên là model, utils và view. Sau khi tạo, di chuyển đến MainActivity để xem packages.

Dưới đây là cấu trúc dự án và các tệp được yêu cầu.

![](https://images.viblo.asia/8c39923d-ed16-4051-b322-b7a22281ad1a.png)

## Bước 7. 
Tạo class User theo model package. Tạo class Observable bằng cách extend từ class BaseObservable.

Để demo, cả Observable và ObservableField đều được sử dụng trong cùng một lớp.

Đối với tên biến email, profileImage và about., Annotation @Bindable được sử dụng và notifyPropertyChanged() được gọi khi thiết lập dữ liệu mới
Biến numberOfPosts, numberOfFollowers, numberOfFollowing được khai báo như ObservableFields
@BindingAdapter được sử dụng để liên kết profileImage với ImageView để tải hình ảnh từ URL bằng cách sử dụng thư viện Glide.

```java
User.java
import android.databinding.BaseObservable;
import android.databinding.Bindable;
import android.databinding.BindingAdapter;
import android.databinding.ObservableField;
import android.widget.ImageView;
 
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
 
import info.androidhive.databinding.BR;
 
public class User extends BaseObservable {
    String name;
    String email;
    String profileImage;
    String about;
 
 
    // profile meta fields are ObservableField, will update the UI
    // whenever a new value is set
    public ObservableField<Long> numberOfFollowers = new ObservableField<>();
    public ObservableField<Long> numberOfPosts = new ObservableField<>();
    public ObservableField<Long> numberOfFollowing = new ObservableField<>();
 
    public User() {
    }
 
    @Bindable
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
        notifyPropertyChanged(BR.name);
    }
 
    @Bindable
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
        notifyPropertyChanged(BR.email);
    }
 
    @BindingAdapter({"profileImage"})
    public static void loadImage(ImageView view, String imageUrl) {
        Glide.with(view.getContext())
                .load(imageUrl)
                .apply(RequestOptions.circleCropTransform())
                .into(view);
 
        // If you consider Picasso, follow the below
        // Picasso.with(view.getContext()).load(imageUrl).placeholder(R.drawable.placeholder).into(view);
    }
 
    @Bindable
    public String getProfileImage() {
        return profileImage;
    }
 
    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
        notifyPropertyChanged(BR.profileImage);
    }
 
    @Bindable
    public String getAbout() {
        return about;
    }
 
    public void setAbout(String about) {
        this.about = about;
        notifyPropertyChanged(BR.about);
    }
 
    public ObservableField<Long> getNumberOfFollowers() {
        return numberOfFollowers;
    }
 
    public ObservableField<Long> getNumberOfPosts() {
        return numberOfPosts;
    }
 
    public ObservableField<Long> getNumberOfFollowing() {
        return numberOfFollowing;
    }
}
```

## Bước 8. 
Tạo một lớp khác có tên là Post.java trong model package. Model class này cung cấp dữ liệu cho RecyclerView.

```java
Post.java
import android.databinding.BindingAdapter;
import android.widget.ImageView;
 
import com.bumptech.glide.Glide;
 
public class Post {
    String imageUrl;
 
    @BindingAdapter("imageUrl")
    public static void loadImage(ImageView view, String imageUrl) {
        Glide.with(view.getContext())
                .load(imageUrl)
                .into(view);
    }
 
    public String getImageUrl() {
        return imageUrl;
    }
 
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
```

## Bước 9. 
Trong gói utils, tạo hai classes có tên là BindingUtils.java và GridSpacingItemDecoration.java

Phương thức convertToSuffix () chuyển đổi một số sang định dạng mà con người có thể đọc được. Ví dụ, 5500L sẽ được chuyển đổi thành 5.5k và 5050890L sẽ được chuyển đổi thành 5.1m.
Chúng ta liên kết chức năng này với TextViews để hiển thị các bài đăng, người theo dõi và theo dõi ở định dạng con người có thể đọc được của con người.

```java
BindingUtils.java
package info.androidhive.databinding.utils;
 
public class BindingUtils {
 
    // https://stackoverflow.com/questions/9769554/how-to-convert-number-into-k-thousands-m-million-and-b-billion-suffix-in-jsp
    // Converts the number to K, M suffix
    // Ex: 5500 will be displayed as 5.5k
    public static String convertToSuffix(long count) {
        if (count < 1000) return "" + count;
        int exp = (int) (Math.log(count) / Math.log(1000));
        return String.format("%.1f%c",
                count / Math.pow(1000, exp),
                "kmgtpe".charAt(exp - 1));
    }
}
```

GridSpacingItemDecoration cung cấp khoảng cách giữa các phần tử lưới RecyclerView.

```java
GridSpacingItemDecoration.java
package info.androidhive.databinding.utils;
 
import android.graphics.Rect;
import android.support.v7.widget.RecyclerView;
import android.view.View;
 
public class GridSpacingItemDecoration extends RecyclerView.ItemDecoration {
 
    private int spanCount;
    private int spacing;
    private boolean includeEdge;
 
    public GridSpacingItemDecoration(int spanCount, int spacing, boolean includeEdge) {
        this.spanCount = spanCount;
        this.spacing = spacing;
        this.includeEdge = includeEdge;
    }
 
    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        int position = parent.getChildAdapterPosition(view);
        int column = position % spanCount;
 
        if (includeEdge) {
            outRect.left = spacing - column * spacing / spanCount;
            outRect.right = (column + 1) * spacing / spanCount;
 
            if (position < spanCount) {
                outRect.top = spacing;
            }
            outRect.bottom = spacing;
        } else {
            outRect.left = column * spacing / spanCount;
            outRect.right = spacing - (column + 1) * spacing / spanCount;
            if (position >= spanCount) {
                outRect.top = spacing;
            }
        }
    }
}
```

# 2. DataBinding trong RecyclerView

Binding layout RecyclerView tương tự như binding bình thường ngoại trừ vài thay đổi trong phương thức onCreateViewHolder và onBindViewHolder.

## Bước 10. 

Tạo layout có tên post_row_item.xml. Layout này chứa một ImageView để hiển thị hình ảnh trong RecyclerView.

Trong layout này, data binding được bật bằng cách giữ nguyên phần tử gốc dưới dạng <layout>. Post mode trong ràng buộc với layout này bằng cách sử dụng thẻ <variable>.

```xml
post_row_item.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:bind="http://schemas.android.com/apk/res/android">
 
    <data>
 
        <variable
            name="post"
            type="info.androidhive.databinding.model.Post" />
    </data>
 
    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
 
        <ImageView
            android:id="@+id/thumbnail"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:scaleType="centerCrop"
            bind:imageUrl="@{post.imageUrl}"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintDimensionRatio="H,1:1"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
 
    </android.support.constraint.ConstraintLayout>
</layout>
```

## Bước 11.
Create a class named PostsAdapter.java under view package.

As the layout name is post_row_item.xml, the generated binding class will be PostRowItemBinding.
In onCreateViewHolder() method, post_row_item layout is inflated with the help of PostRowItemBinding class.
holder.binding.setPost() binds the Post model to each row.

Tạo một class có tên PostsAdapter.java trong view package.

Layout post_row_item.xml, thì class ràng buộc được tạo sẽ là PostRowItemBinding.
Trong phương thức onCreateViewHolder (), layout post_row_item được inflated với sự trợ giúp của class PostRowItemBinding.
holder.binding.setPost () liên kết Post model với mỗi hàng.

```java
PostsAdapter.java
package info.androidhive.databinding.view;
 
import android.databinding.DataBindingUtil;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
 
import java.util.List;
 
import info.androidhive.databinding.R;
import info.androidhive.databinding.databinding.PostRowItemBinding;
import info.androidhive.databinding.model.Post;
 
public class PostsAdapter extends RecyclerView.Adapter<PostsAdapter.MyViewHolder> {
 
    private List<Post> postList;
    private LayoutInflater layoutInflater;
    private PostsAdapterListener listener;
 
    public class MyViewHolder extends RecyclerView.ViewHolder {
 
        private final PostRowItemBinding binding;
 
        public MyViewHolder(final PostRowItemBinding itemBinding) {
            super(itemBinding.getRoot());
            this.binding = itemBinding;
        }
    }
 
 
    public PostsAdapter(List<Post> postList, PostsAdapterListener listener) {
        this.postList = postList;
        this.listener = listener;
    }
 
    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if (layoutInflater == null) {
            layoutInflater = LayoutInflater.from(parent.getContext());
        }
        PostRowItemBinding binding =
                DataBindingUtil.inflate(layoutInflater, R.layout.post_row_item, parent, false);
        return new MyViewHolder(binding);
    }
 
    @Override
    public void onBindViewHolder(MyViewHolder holder, final int position) {
        holder.binding.setPost(postList.get(position));
        holder.binding.thumbnail.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onPostClicked(postList.get(position));
                }
            }
        });
    }
 
    @Override
    public int getItemCount() {
        return postList.size();
    }
 
    public interface PostsAdapterListener {
        void onPostClicked(Post post);
    }
}
```

# 3. Building the Profile Screen

Bây giờ chúng ta có tất cả các files. Bây giờ chúng ta cùng bắt đầu xây dựng giao diện chính.

## Bước 12.
Mở file layout activity_main.xml và  content_main.xml và enable data-binding bằng cách add <layout>, <data> and <variable> tags.

```java
activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:bind="http://schemas.android.com/apk/res/android">
 
    <data>
 
        <variable
            name="user"
            type="info.androidhive.databinding.model.User" />
    </data>
 
    <android.support.design.widget.CoordinatorLayout xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".view.MainActivity">
 
        <android.support.design.widget.AppBarLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:elevation="0dp"
            android:theme="@style/AppTheme.AppBarOverlay">
 
            <android.support.v7.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                android:background="?attr/colorPrimary"
                app:popupTheme="@style/AppTheme.PopupOverlay" />
 
        </android.support.design.widget.AppBarLayout>
 
        <include
            android:id="@+id/content"
            layout="@layout/content_main"
            bind:user="@{user}" />
 
    </android.support.design.widget.CoordinatorLayout>
</layout>
```

```xml
content_main.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:bind="http://schemas.android.com/apk/res/android">
 
    <data>
 
        <import type="info.androidhive.databinding.utils.BindingUtils" />
 
        <variable
            name="user"
            type="info.androidhive.databinding.model.User" />
 
        <variable
            name="handlers"
            type="info.androidhive.databinding.view.MainActivity.MyClickHandlers" />
    </data>
 
    <android.support.v4.widget.NestedScrollView xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">
 
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:focusableInTouchMode="true"
            android:orientation="vertical"
            tools:context=".view.MainActivity"
            tools:showIn="@layout/activity_main">
 
            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:background="@color/colorPrimary"
                android:orientation="vertical"
                android:paddingBottom="@dimen/activity_margin"
                android:paddingTop="@dimen/activity_margin">
 
                <RelativeLayout
                    android:layout_width="@dimen/profile_image"
                    android:layout_height="@dimen/profile_image"
                    android:layout_gravity="center_horizontal">
 
                    <ImageView
                        android:id="@+id/profile_image"
                        android:layout_width="@dimen/profile_image"
                        android:layout_height="@dimen/profile_image"
                        android:layout_centerHorizontal="true"
                        android:onLongClick="@{handlers::onProfileImageLongPressed}"
                        bind:profileImage="@{user.profileImage}" />
 
                    <android.support.design.widget.FloatingActionButton
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_alignParentBottom="true"
                        android:layout_alignParentRight="true"
                        android:onClick="@{handlers::onProfileFabClicked}"
                        android:src="@drawable/ic_add_white_24dp"
                        app:fabCustomSize="@dimen/fab_profile" />
 
                </RelativeLayout>
 
 
                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_gravity="center_horizontal"
                    android:layout_marginTop="@dimen/dimen_8dp"
                    android:fontFamily="sans-serif"
                    android:letterSpacing="0.1"
                    android:text="@{user.name}"
                    android:textColor="@android:color/white"
                    android:textSize="@dimen/profile_name"
                    android:textStyle="bold" />
 
                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_gravity="center_horizontal"
                    android:fontFamily="sans-serif"
                    android:letterSpacing="0.1"
                    android:text="@{user.about}"
                    android:textColor="@android:color/white"
                    android:textSize="@dimen/profile_about" />
 
            </LinearLayout>
 
            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginBottom="@dimen/activity_margin"
                android:layout_marginTop="@dimen/fab_margin"
                android:orientation="horizontal"
                android:weightSum="3">
 
                <LinearLayout
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_weight="1"
                    android:gravity="center_horizontal"
                    android:onClick="@{handlers::onPostsClicked}"
                    android:orientation="vertical">
 
                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:fontFamily="sans-serif-condensed"
                        android:text="@{BindingUtils.convertToSuffix(user.numberOfPosts)}"
                        android:textColor="@color/profile_meta"
                        android:textSize="24dp"
                        android:textStyle="normal" />
 
                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/posts"
                        android:textSize="@dimen/profile_meta_label" />
 
                </LinearLayout>
 
                <LinearLayout
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_weight="1"
                    android:gravity="center_horizontal"
                    android:onClick="@{handlers::onFollowersClicked}"
                    android:orientation="vertical">
 
                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:fontFamily="sans-serif-condensed"
                        android:text="@{BindingUtils.convertToSuffix(user.numberOfFollowers)}"
                        android:textColor="@color/profile_meta"
                        android:textSize="24dp" />
 
                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/followers"
                        android:textSize="@dimen/profile_meta_label" />
 
                </LinearLayout>
 
                <LinearLayout
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_weight="1"
                    android:gravity="center_horizontal"
                    android:onClick="@{handlers::onFollowingClicked}"
                    android:orientation="vertical">
 
                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:fontFamily="sans-serif-condensed"
                        android:text="@{BindingUtils.convertToSuffix(user.numberOfFollowing)}"
                        android:textColor="@color/profile_meta"
                        android:textSize="@dimen/profile_meta" />
 
                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/following"
                        android:textSize="@dimen/profile_meta_label" />
 
                </LinearLayout>
            </LinearLayout>
 
            <android.support.v7.widget.RecyclerView
                android:id="@+id/recycler_view"
                android:layout_width="match_parent"
                android:layout_height="match_parent" />
        </LinearLayout>
 
    </android.support.v4.widget.NestedScrollView>
</layout>
```

## Bước 13.
Finally open MainActivity.java and do the below modifications.

As the main activity layout name is activity_main, the generated binding class will be ActivityMainBinding.
renderProfile() renders the user information such as name, description, posts, followers and following count.
initRecyclerView() initializes the RecyclerView with sample images data.
MyClickHandlers handles the click events of UI elements. Here, all the binding of click events is done via xml layout only. We don’t explicitly assign anything from activity code.

Cuối cùng mở MainActivity.java và thực hiện các thay đổi dưới đây.

Vì tên layout của main activity là activity_main, nên lớp ràng buộc được tạo ra sẽ là ActivityMainBinding.
renderProfile () hiển thị thông tin người dùng như tên, mô tả, bài đăng, người theo dõi và số lượng following.
initRecyclerView () khởi tạo RecyclerView với dữ liệu ảnh mẫu.
MyClickHandlers xử lý các sự kiện nhấp chuột của các phần tử giao diện người dùng. Ở đây, tất cả các ràng buộc của các sự kiện click được thực hiện thông qua layout xml chỉ. Chúng ta không chỉ định rõ ràng bất kỳ điều gì từ code

```java
MainActivity.java
package info.androidhive.databinding.view;
 
import android.content.Context;
import android.content.res.Resources;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.TypedValue;
import android.view.View;
import android.widget.Toast;
 
import java.util.ArrayList;
 
import info.androidhive.databinding.R;
import info.androidhive.databinding.databinding.ActivityMainBinding;
import info.androidhive.databinding.model.Post;
import info.androidhive.databinding.model.User;
import info.androidhive.databinding.utils.GridSpacingItemDecoration;
 
public class MainActivity extends AppCompatActivity implements PostsAdapter.PostsAdapterListener {
 
    private MyClickHandlers handlers;
    private PostsAdapter mAdapter;
    private RecyclerView recyclerView;
    private ActivityMainBinding binding;
    private User user;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
 
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
 
        Toolbar toolbar = binding.toolbar;
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle(R.string.toolbar_profile);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
 
        handlers = new MyClickHandlers(this);
 
        renderProfile();
 
        initRecyclerView();
    }
 
    /**
     * Renders RecyclerView with Grid Images in 3 columns
     */
    private void initRecyclerView() {
        recyclerView = binding.content.recyclerView;
        recyclerView.setLayoutManager(new GridLayoutManager(this, 3));
        recyclerView.addItemDecoration(new GridSpacingItemDecoration(3, dpToPx(4), true));
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setNestedScrollingEnabled(false);
        mAdapter = new PostsAdapter(getPosts(), this);
        recyclerView.setAdapter(mAdapter);
    }
 
    /**
     * Renders user profile data
     */
    private void renderProfile() {
        user = new User();
        user.setName("David Attenborough");
        user.setEmail("david@natgeo.com");
        user.setProfileImage("https://api.androidhive.info/images/nature/david.jpg");
        user.setAbout("Naturalist");
 
        // ObservableField doesn't have setter method, instead will
        // be called using set() method
        user.numberOfPosts.set(3400L);
        user.numberOfFollowers.set(3050890L);
        user.numberOfFollowing.set(150L);
 
 
        // display user
        binding.setUser(user);
 
        // assign click handlers
        binding.content.setHandlers(handlers);
    }
 
    private ArrayList<Post> getPosts() {
        ArrayList<Post> posts = new ArrayList<>();
        for (int i = 1; i < 10; i++) {
            Post post = new Post();
            post.setImageUrl("https://api.androidhive.info/images/nature/" + i + ".jpg");
 
            posts.add(post);
        }
 
        return posts;
    }
 
    @Override
    public void onPostClicked(Post post) {
        Toast.makeText(getApplicationContext(), "Post clicked! " + post.getImageUrl(), Toast.LENGTH_SHORT).show();
    }
 
    public class MyClickHandlers {
 
        Context context;
 
        public MyClickHandlers(Context context) {
            this.context = context;
        }
 
        /**
         * Demonstrating updating bind data
         * Profile name, number of posts and profile image
         * will be updated on Fab click
         */
        public void onProfileFabClicked(View view) {
            user.setName("Sir David Attenborough");
            user.setProfileImage("https://api.androidhive.info/images/nature/david1.jpg");
 
            // updating ObservableField
            user.numberOfPosts.set(5500L);
            user.numberOfFollowers.set(5050890L);
            user.numberOfFollowing.set(180L);
        }
 
        public boolean onProfileImageLongPressed(View view) {
            Toast.makeText(getApplicationContext(), "Profile image long pressed!", Toast.LENGTH_LONG).show();
            return false;
        }
 
 
        public void onFollowersClicked(View view) {
            Toast.makeText(context, "Followers is clicked!", Toast.LENGTH_SHORT).show();
        }
 
        public void onFollowingClicked(View view) {
            Toast.makeText(context, "Following is clicked!", Toast.LENGTH_SHORT).show();
        }
 
        public void onPostsClicked(View view) {
            Toast.makeText(context, "Posts is clicked!", Toast.LENGTH_SHORT).show();
        }
    }
 
    /**
     * Converting dp to pixel
     */
    private int dpToPx(int dp) {
        Resources r = getResources();
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, r.getDisplayMetrics()));
    }
}
```

Chạy và kiểm tra ứng dụng một lần. Để đảm bảo thiết bị có kết nối internet vì hình ảnh sẽ được tải xuống từ mạng.

![](https://images.viblo.asia/9cad518f-3fca-4c02-b160-98c18f2fde4e.png)

[Source](https://www.androidhive.info/android-databinding-in-recyclerview-profile-screen/)