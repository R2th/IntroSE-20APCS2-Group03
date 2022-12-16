Ví dụ khi bạn có 1 `View` nằm trong 1 `RelativeLayout`, bạn có thể sử dụng các thuộc tính như `layout_toEndOf` hay `layout_alignParentBottom`.  
Vậy làm sao để tạo một `CustomLayout` tương tự như `RelativeLayout` với 1 số thuộc tính mà child của `CustomLayout` có thể dùng được?

Để làm được việc đó chúng ta sẽ tạo ra một custom `LayoutParams` thay vì `LayoutParam` mặc định và set nó vào `generateLayoutParams` như sau

```java
public class CustomRelativeLayout extends RelativeLayout {

    public CustomRelativeLayout(Context context) {
        super(context);
    }

    public CustomRelativeLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public CustomRelativeLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    public LayoutParams generateLayoutParams(AttributeSet attrs) {
        return new LayoutParams(getContext(), attrs);
    }

    @Override
    protected ViewGroup.LayoutParams generateDefaultLayoutParams() {
        return super.generateDefaultLayoutParams();
    }

    @Override
    protected ViewGroup.LayoutParams generateLayoutParams(ViewGroup.LayoutParams lp) {
        return super.generateLayoutParams(lp);
    }

    @Override
    public void onViewAdded(View child) {
        super.onViewAdded(child);
        LayoutParams layoutParams = (LayoutParams) child.getLayoutParams();
        Log.i("TAG", "title = " + layoutParams.title);
    }

    class LayoutParams extends RelativeLayout.LayoutParams {
        String title;

        LayoutParams(Context c, AttributeSet attrs) {
            super(c, attrs);
            TypedArray ta =
                    c.obtainStyledAttributes(attrs, R.styleable.CustomRelativeLayout_Layout);
            title = ta.getString(R.styleable.CustomRelativeLayout_Layout_layout_title);
            ta.recycle();
        }
    }
}
```

**attrs.xml**
```xml
<declare-styleable name="CustomRelativeLayout_Layout">
    <attr name="layout_title" format="string" />
</declare-styleable>
```

Một lưu ý khi đặt tên attribute là bạn nên đặt tên có prefix là `layout_`. Với bản AndroidStudio hiện tại nếu bạn ko đặt với prefix là `layout_` thì AndroidStudio sẽ báo lỗi nhưng vẫn build chạy bình thường

**Sử dụng**

```xml
    <vn.linh.androidpassattributetochildview.CustomRelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        >

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            app:layout_title="Hello" // I can use layout_title here
            />

    </vn.linh.androidpassattributetochildview.CustomRelativeLayout>
```
Demo: https://github.com/PhanVanLinh/AndroidPassAttributeToChildVIew