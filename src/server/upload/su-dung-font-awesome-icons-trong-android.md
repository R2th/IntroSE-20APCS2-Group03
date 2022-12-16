[Font Awesome](https://fontawesome.com/icons?d=gallery&m=free) là bộ công cụ icons rất phổ biến được sử dụng trên nhiều trang web.

Nó có cả bộ sưu tập biểu tượng miễn phí và pro, nhưng bạn có thể tìm thấy hầu hết các biểu tượng trong bộ sưu tập miễn phí.

Mỗi icon sẽ được đại diện bởi mã **unicode (& # xf17b;)**. Chúng ta sử dụng mã unicode này để hiển thị icon trong TextView. 
Vì nó là một TextView bình thường, tất cả các thuộc tính kiểu dáng văn bản (màu sắc, kích thước, padding, v.v.) có thể được áp dụng.

Ví dụ: nếu bạn muốn hiển thị logo **Robot Android**, bạn có thể sử dụng mã unicode **&#xf17b** là giá trị TextView.

## 1. Thư viện Font Awesome

Để sử dụng font awesome icon, bạn phải thêm trực tiếp các file font awesome vào thư mục assets và apply font chữ phù hợp trên TextView.
Đây là cách làm đơn giản nhất.

Nhưng chúng ta muốn các icon được hiển thị trong các widget khác cũng như trong Buttons, Menus, Bottom Navigation và Navigation Drawer ...

Để bắt đầu, hãy thêm thư viện **fontawesome** vào file **build.gradle** và sync project :

```
dependencies {
    // font awesome
    implementation 'info.androidhive:fontawesome:0.0.5'
}
```

## 2. Sử dụng như thế nào

### 2.1 Hiển thị Icon trong TextView

Cách dễ nhất để hiển thị font icon là, sử dụng **FontTextView**.
Widget này extends từ **AppCompatTextView**, vì vậy tất cả các thuộc tính text sẽ được áp dụng cho widget này :

```
import android.content.Context;
import android.content.res.TypedArray;
import android.support.v7.widget.AppCompatTextView;
import android.util.AttributeSet;

public class FontTextView extends AppCompatTextView {
    private boolean isBrandingIcon, isSolidIcon;

    public FontTextView(Context context) {
        super(context);
    }

    public FontTextView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public FontTextView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        TypedArray a = context.getTheme().obtainStyledAttributes(attrs, R.styleable.FontTextView,
                0, 0);
        isSolidIcon = a.getBoolean(R.styleable.FontTextView_solid_icon, false);
        isBrandingIcon = a.getBoolean(R.styleable.FontTextView_brand_icon, false);
        init();
    }

    private void init() {
        if (isBrandingIcon)
            setTypeface(FontCache.get(getContext(), "fa-brands-400.ttf"));
        else if (isSolidIcon)
            setTypeface(FontCache.get(getContext(), "fa-solid-900.ttf"));
        else
            setTypeface(FontCache.get(getContext(), "fa-regular-400.ttf"));
    }
}
```

```
<info.androidhive.fontawesome.FontTextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/fa_calendar_check_solid"
            android:textColor="@color/icon_color"
            android:textSize="@dimen/icon_size"
            app:solid_icon="true" />
```

Chú ý các thuộc tính sau :

- solid_icon : Để hiển thị solid icon, set giá trị là true.
- brand_icon : Để hiển thị brand icon, set giá trị là true.

![](https://images.viblo.asia/a55342bc-daca-47c1-8ecc-ed29e6fe8aae.png)

### 2.2 Sử dụng FontDrawable

- Sử dụng icon trong layout xml thì đơn giản, nhưng nếu bạn muốn sử dụng icon cho các widget khác như button hoặc menu, bạn có thể sử dụng FontDrawable.

Ví dụ, nếu bạn muốn sử dụng font awesome cho Floating Action Button, bạn có thể sử dụng FontDrawable như sau :

```
FloatingActionButton fab = findViewById(R.id.fab);
 
// using paper plane icon for FAB
FontDrawable drawable = new FontDrawable(this, R.string.fa_paper_plane_solid, true, false);
 
// white color to icon
drawable.setTextColor(ContextCompat.getColor(this, android.R.color.white));
fab.setImageDrawable(drawable);
```

![](https://images.viblo.asia/90c3281b-c1eb-4880-ab71-4297fdb03065.png)

### 2.3 Sử dụng trong Menus 

```
public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        intDrawerLayout();
    }
 
    /**
     * Changing navigation drawer icons
     * This involves looping through menu items and applying icons
     */
    private void intDrawerLayout() {
        NavigationView navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
 
        ImageView iconHeader = navigationView.getHeaderView(0).findViewById(R.id.nav_header_icon);
        FontDrawable drawable = new FontDrawable(this, R.string.fa_font_awesome, false, true);
        drawable.setTextColor(ContextCompat.getColor(this, android.R.color.white));
        drawable.setTextSize(50);
        iconHeader.setImageDrawable(drawable);
 
        int[] icons = {
                R.string.fa_home_solid, R.string.fa_calendar_alt_solid, R.string.fa_user_solid,
                R.string.fa_heart_solid, R.string.fa_comment_solid, R.string.fa_dollar_sign_solid, R.string.fa_gift_solid
        };
        renderMenuIcons(navigationView.getMenu(), icons, true, false);
 
        int[] iconsSubmenu = {R.string.fa_cog_solid, R.string.fa_sign_out_alt_solid};
 
        renderMenuIcons(navigationView.getMenu().getItem(7).getSubMenu(), iconsSubmenu, true, false);
    }
 
    /**
     * Looping through menu icons are applying font drawable
     */
    private void renderMenuIcons(Menu menu, int[] icons, boolean isSolid, boolean isBrand) {
        for (int i = 0; i < menu.size(); i++) {
            MenuItem menuItem = menu.getItem(i);
            if (!menuItem.hasSubMenu()) {
                FontDrawable drawable = new FontDrawable(this, icons[i], isSolid, isBrand);
                drawable.setTextColor(ContextCompat.getColor(this, R.color.icon_nav_drawer));
                drawable.setTextSize(22);
                menu.getItem(i).setIcon(drawable);
            }
        }
    }
}
```

![](https://images.viblo.asia/d73fbe46-e0f4-4640-829b-7177da10f068.png)