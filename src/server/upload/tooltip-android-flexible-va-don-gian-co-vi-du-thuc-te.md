![](https://images.viblo.asia/c9dccec0-9948-42bc-aa94-7904b688cdf1.gif)

Khi chúng ta nhận được yêu cầu phải hiển thị một view với nhiều action như ( xóa, thêm, edit, share ...) và view đó lại lệ thuộc vào vị trí của một đối tượng khác đã xuất hiện trước đó trên màn hình. (Hình ảnh) các bạn thấy đó, action (copy & delete) chỉ hiển thị ngay phía dưới hoặc trên message text và thao tác share (chia sẻ) cũng chỉ hiển thị ngay phía dưới image cần share tùy vào độ rộng của màn hình. Hôm nay mình sẽ chia sẻ cách để thực hiện được công việc này, nhìn vậy thôi chứ chúng ta sẽ có khá nhiều việc cần phải xử lý đó :D 

Nội dung bài viết :

> 1. Tác dụng của tooltip
> 
> 2. Thực hiện yêu cầu
> 
> 3. Tổng kết 
> 

### 1. Tác dụng của tooltip

Với tính năng như này bạn sẽ thường xuyên gặp khi gửi Message, Email hay Messenger hoặc Zalo ... đại đa số dùng nhiều trong các ứng dụng có tính năng chat, social media. Đáp ứng thao tác nhanh cho người dùng, tạo sự chuyên nghiệp của ứng dụng.
Ngoài ra các bạn có thể thấy mặc dù tần xuất Tooltip này xuất hiện rất nhiều vì chẳng ai tải Zalo, Messenger về chỉ để nhắn tin 1-2 tin nhắn cả. Và tất nhiên có việc nhập thông tin nhiều thì thỉnh thoảng có sai xót và phải xóa bỏ, hủy tin nhắn vì gửi nhầm chẳng hạn ...
**Không làm ảnh hưởng tới design của app**: Mặc dù với thiết kế khá đơn giản

### 2. Thực hiện yêu cầu 

Sau khi để ý hơn về tác dụng của Tooltip rồi, giờ chúng ta có thể bắt tay vào phần thực hành. Mình sẽ đi từ phần việc đơn giản nhất chính là tạo một UI custom nhé, điều này ai cũng có thể nhìn ra ngay từ đầu phải không nào.

`tooltip_custom.xml`


```
<?xml version="1.0" encoding="utf-8"?>

<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    tools:ignore="NegativeMargin">

    <HorizontalScrollView
        android:id="@+id/scroller"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/arrow_up"
        android:fadingEdgeLength="@dimen/_5sdp"
        android:padding="@dimen/_5sdp"
        android:overScrollMode="never"
        android:scrollbars="none">

        <LinearLayout
            android:id="@+id/tracks"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:orientation="horizontal" />

    </HorizontalScrollView>
    <View
        android:id="@+id/arrow_up"
        android:layout_width="@dimen/_25sdp"
        android:layout_height="@dimen/_15sdp" />
    <View
        android:id="@+id/arrow_down"
        android:layout_width="@dimen/_25sdp"
        android:layout_height="@dimen/_15sdp"
        android:layout_below="@id/scroller"
        android:layout_marginTop="@dimen/_minus2sdp" />

</RelativeLayout>
```

`tooltip_item.xml`

```
<?xml version="1.0" encoding="utf-8"?>
<TextView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:background="?android:attr/selectableItemBackground"
    android:clickable="true"
    android:drawablePadding="@dimen/_4sdp"
    android:focusable="true"
    android:gravity="center"
    android:minWidth="@dimen/_48sdp"
    android:minHeight="@dimen/_30sdp"
    android:orientation="horizontal"
    android:textIsSelectable="false"
    android:textSize="15sp" />
```

Tooltip item chính là những action mà bạn muốn thêm vào để người dùng có thể thao tác (ví dụ đang có copy và delete, nhưng muốn thêm edit nữa đó)

**Tiếp theo** mình sẽ custom Tooltip view, đây là phần việc quan trọng nhất! Chúng ta sẽ sử dụng **PopupWindow** thiết lập sẵn việc user click ngoài view nó sẽ close, điều này nó gần giống với việc show dialog phải không nào.

`BaseTooltipView.java`

```
public class BaseTooltipView {
  PopupWindow mWindow;
  private View mRootView;
  private Context mContext;

  public BaseTooltipView(Context context) {
    mContext = context;
    mWindow = new PopupWindow(context);
    mWindow.setTouchInterceptor((view, event) -> {
      if (event.getAction() == MotionEvent.ACTION_OUTSIDE) {
        mWindow.dismiss();
        return true;
      } else if (event.getAction() == MotionEvent.ACTION_BUTTON_PRESS) {
        view.performClick();
        return true;
      }
      return false;
    });
  }

  public Context getContext() {
    return mContext;
  }

  protected void preShow() {
    if (mRootView == null)
      throw new IllegalStateException("setContentView was not called with a view to display.");

    mWindow.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
    mWindow.setWidth(WindowManager.LayoutParams.WRAP_CONTENT);
    mWindow.setHeight(WindowManager.LayoutParams.WRAP_CONTENT);
    mWindow.setTouchable(true);
    mWindow.setFocusable(true);
    mWindow.setOutsideTouchable(true);
    mWindow.setContentView(mRootView);
    setShadows();
  }

  @TargetApi(Build.VERSION_CODES.LOLLIPOP) private void setShadows() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP)
      mWindow.setElevation(10);
  }

  protected void setContentView(View root) {
    mRootView = root;
    mWindow.setContentView(root);
  }

  protected void setOnDismissListener(PopupWindow.OnDismissListener listener) {
    mWindow.setOnDismissListener(listener);
  }

  public void dismiss() {
    mWindow.dismiss();
  }
}
```

Tiếp theo bạn sẽ tạo một Tooltip view hoàn thiện bằng việc extends lại BaseTooltipView nhé

`TooltipAction.java`

```
public class TooltipAction extends BaseTooltipView implements OnDismissListener {

    public static final int HORIZONTAL = LinearLayout.HORIZONTAL;
    public static final int VERTICAL = LinearLayout.VERTICAL;

    private static int defaultColor = Color.WHITE;
    private static int defaultTextColor = Color.BLACK;
    private static int defaultDividerColor = Color.argb(32, 0, 0, 0);
    private final int shadowSize;
    private final int shadowColor;
    private boolean enabledDivider;
    private WindowManager windowManager;
    private View rootView;
    private View arrowUp;
    private View arrowDown;
    private LayoutInflater inflater;
    private Resources resource;
    private LinearLayout track;
    private ViewGroup scroller;
    private OnActionItemClickListener mItemClickListener;
    private OnDismissListener dismissListener;
    private List<ActionItem> actionItems = new ArrayList<>();
    private Animation animation = Animation.AUTO;
    private boolean didAction;
    private int orientation;
    private int rootWidth = 0;
    private int dividerColor = defaultDividerColor;
    private int textColor = defaultTextColor;

    /**
     * Constructor for default vertical layout
     *
     * @param context Context
     */
    public TooltipAction(@NonNull Context context) {
        this(context, HORIZONTAL);
    }

    /**
     * Constructor allowing orientation override QuickAction.HORIZONTAL or QuickAction.VERTICAL
     *
     * @param context     Context
     * @param orientation Layout orientation, can be vartical or horizontal
     */
    public TooltipAction(@NonNull Context context, int orientation) {
        super(context);
        this.orientation = orientation;
        inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        windowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        resource = context.getResources();

        shadowSize = resource.getDimensionPixelSize(R.dimen._2sdp);
        shadowColor = resource.getColor(R.color.grey);

        setRootView(R.layout.tooltip_action_custom);
    }

    private void setRootView(@LayoutRes int id) {
        rootView = inflater.inflate(id, null);
        rootView.setLayoutParams(new LayoutParams(WRAP_CONTENT, WRAP_CONTENT));

        track = (LinearLayout) rootView.findViewById(R.id.tracks);
        track.setOrientation(orientation);

        arrowDown = rootView.findViewById(R.id.arrow_down);
        arrowUp = rootView.findViewById(R.id.arrow_up);

        scroller = (ViewGroup) rootView.findViewById(R.id.scroller);

        setContentView(rootView);
        setColor(defaultColor);
    }

    /**
     * Set color of QuickAction
     *
     * @param popupColor Color to fill QuickAction
     * @see Color
     */
    public void setColor(@ColorInt int popupColor) {
        GradientDrawable drawable = new GradientDrawable();
        drawable.setColor(popupColor);
        drawable.setStroke(shadowSize, shadowColor);
        drawable.setCornerRadius(resource.getDimension(R.dimen._6sdp));

        arrowDown.setBackground(new ArrowDrawable(ARROW_DOWN, popupColor, shadowSize, shadowColor));
        arrowUp.setBackground(new ArrowDrawable(ARROW_UP, popupColor, shadowSize, shadowColor));
        scroller.setBackground(drawable);
    }

    public static void setDefaultTextColor(int defaultTextColor) {
        TooltipAction.defaultTextColor = defaultTextColor;
    }

    public static void setDefaultTextColor(Context context, @ColorRes int defaultTextColor) {
        TooltipAction.defaultTextColor = context.getResources().getColor(defaultTextColor);
    }

    public static void setDefaultDividerColor(int defaultDividerColor) {
        TooltipAction.defaultDividerColor = defaultDividerColor;
    }

    public static void setDefaultDividerColor(Context context, @ColorRes int defaultDividerColor) {
        TooltipAction.defaultDividerColor = context.getResources().getColor(defaultDividerColor);
    }

    public static void setDefaultColor(int defaultColor) {
        TooltipAction.defaultColor = defaultColor;
    }

    public static void setDefaultColor(Context context, @ColorRes int setDefaultColor) {
        TooltipAction.defaultColor = context.getResources().getColor(setDefaultColor);
    }

    /**
     * Set color of QuickAction by color define in xml resource
     *
     * @param popupColor Color resource id to fill QuickAction
     */
    public void setColorRes(@ColorRes int popupColor) {
        setColor(resource.getColor(popupColor));
    }

    /**
     * Set color for text of each action item. MUST call this before add {@link ActionItem},
     * sorry I'm just too lazy.
     *
     * @param textColorRes Color resource id to use
     */
    public void setTextColorRes(@ColorRes int textColorRes) {
        setTextColor(resource.getColor(textColorRes));
    }

    /**
     * Set color for text of each action item. MUST call this before add {@link ActionItem}, sorry
     * I'm just too lazy.
     *
     * @param textColor Color to use
     */
    public void setTextColor(@ColorInt int textColor) {
        this.textColor = textColor;
    }

    /**
     * Set color for divider. MUST call this before add {@link ActionItem}, sorry I'm just
     * too lazy.
     *
     * @param color use with divider
     */
    public void setDividerColor(int color) {
        this.dividerColor = color;
    }

    /**
     * Set color for text of each action item. MUST call this before add {@link ActionItem}, sorry I'm
     * just too lazy
     *
     * @param colorRes android color resource use with divider
     */
    public void setDividerColorRes(@ColorRes int colorRes) {
        this.dividerColor = resource.getColor(colorRes);
    }

    /**
     * to Enable or Disable divider this must be called before add {@link ActionItem}
     *
     * @param enabled default is true for Horizontal and false Vertical
     */
    public void setEnabledDivider(boolean enabled) {
        this.enabledDivider = enabled;
    }

    /**
     * Set animation style
     *
     * @param mAnimStyle animation style, default is set to ANIM_AUTO
     */
    public void setAnimStyle(Animation mAnimStyle) {
        this.animation = mAnimStyle;
    }

    /**
     * Set listener for action item clicked.
     *
     * @param listener Listener
     */
    public void setOnActionItemClickListener(OnActionItemClickListener listener) {
        mItemClickListener = listener;
    }

    public void addActionItem(final ActionItem... actions) {
        for (ActionItem item : actions) {
            addActionItem(item);
        }
    }

    /**
     * Add action item
     *
     * @param action {@link ActionItem}
     */
    public void addActionItem(final ActionItem action) {
        int position = actionItems.size();
        actionItems.add(action);
        addActionView(position, createViewFrom(action));
    }

    private void addActionView(int position, View actionView) {
        if (enabledDivider && position != 0) {
            position *= 2;
            int separatorPos = position - 1;
            View separator = new View(getContext());
            separator.setBackgroundColor(dividerColor);
            int width = resource.getDimensionPixelOffset(R.dimen._1sdp);
            LayoutParams layoutParams = null;
            switch (orientation) {
                case VERTICAL:
                    layoutParams = new LayoutParams(MATCH_PARENT, width);
                    break;
                case HORIZONTAL:
                    layoutParams = new LayoutParams(width, MATCH_PARENT);
                    break;
            }
            track.addView(separator, separatorPos, layoutParams);
        }
        track.addView(actionView, position);
    }

    @NonNull
    private View createViewFrom(final ActionItem action) {
        TextView textView = (TextView) inflater.inflate(R.layout.tooltip_item, track, false);
        if (action.haveTitle()) {
            textView.setTextColor(textColor);
            textView.setText(action.getTitle());
            if (action.haveIcon()) {
                int iconSize = resource.getDimensionPixelOffset(R.dimen._24sdp);
                Drawable icon = action.getIconDrawable(getContext());
                icon.setBounds(0, 0, iconSize, iconSize);
                if (orientation == HORIZONTAL) {
                    textView.setCompoundDrawables(null, icon, null, null);
                } else {
                    textView.setCompoundDrawables(icon, null, null, null);
                }
            }
        }
        View actionView = textView;

        actionView.setId(action.getActionId());
        actionView.setOnClickListener(v -> {
            action.setSelected(true);
            if (mItemClickListener != null) {
                mItemClickListener.onItemClick(action);
            }
            if (!action.isSticky()) {
                didAction = true;
                dismiss();
            }
        });
        actionView.setFocusable(true);
        actionView.setClickable(true);
        return actionView;
    }

    /**
     * Add action item at specify position
     *
     * @param position to add ActionItem (zero-base)
     * @param action   {@link ActionItem}
     */
    public void addActionItem(int position, final ActionItem action) {
        actionItems.add(position, action);
        addActionView(position, createViewFrom(action));
    }

    /**
     * Get action item at an index
     *
     * @param index Index of item (position from callback)
     * @return Action Item at the position
     */
    public ActionItem getActionItem(int index) {
        return actionItems.get(index);
    }

    /**
     * remove action item
     *
     * @param actionId Id of action to remove
     * @return removed item
     */
    public ActionItem remove(int actionId) {
        return remove(getActionItemById(actionId));
    }

    /**
     * remove action item
     *
     * @param action action to remove
     * @return removed item
     */
    public ActionItem remove(ActionItem action) {
        int index = actionItems.indexOf(action);
        if (index == -1)
            throw new RuntimeException("Not found action");

        if (!enabledDivider) {
            track.removeViewAt(index);
        } else {
            int viewPos = index * 2;
            track.removeViewAt(viewPos);
            track.removeViewAt(index == 0 ? 0 : viewPos - 1); //remove divider
        }
        return actionItems.remove(index);
    }

    /**
     * Get action item by Action's ID
     *
     * @param actionId Id of item
     * @return Action Item with same id
     */
    @Nullable
    public ActionItem getActionItemById(int actionId) {
        for (ActionItem action : actionItems) {
            if (action.getActionId() == actionId)
                return action;
        }
        return null;
    }

    /**
     * Show quickaction popup. Popup is automatically positioned, on top or bottom of anchor view.
     *
     * @param activity contain view to be anchor
     * @param anchorId id of view to use as anchor of QuickAction's popup
     */
    public void show(@NonNull Activity activity, @IdRes int anchorId) {
        show(activity.findViewById(anchorId));
    }

    /**
     * Show quickaction popup. Popup is automatically positioned, on top or bottom of anchor view.
     *
     * @param anchor view to use as anchor of QuickAction's popup
     */
    public void show(@NonNull View anchor) {
        if (getContext() == null)
            throw new IllegalStateException("Why context is null? It shouldn't be.");

        preShow();

        int xPos, yPos, arrowPos;

        didAction = false;

        int[] location = new int[2];
        anchor.getLocationOnScreen(location);
        Rect anchorRect = new Rect(location[0], location[1], location[0] + anchor.getWidth(),
                location[1] + anchor.getHeight());

        rootView.measure(WRAP_CONTENT, WRAP_CONTENT);

        int rootHeight = rootView.getMeasuredHeight();

        if (rootWidth == 0) {
            rootWidth = rootView.getMeasuredWidth();
        }

        DisplayMetrics displaymetrics = new DisplayMetrics();
        windowManager.getDefaultDisplay().getMetrics(displaymetrics);
        int screenWidth = displaymetrics.widthPixels;
        int screenHeight = displaymetrics.heightPixels;

        // automatically get X coord of quick_action_vertical (top left)
        if ((anchorRect.left + rootWidth) > screenWidth) {
            xPos = anchorRect.left - (rootWidth - anchor.getWidth());
            xPos = (xPos < 0) ? 0 : xPos;

            arrowPos = anchorRect.centerX() - xPos;
        } else {
            if (anchor.getWidth() > rootWidth) {
                xPos = anchorRect.centerX() - (rootWidth / 2);
            } else {
                xPos = anchorRect.left;
            }

            arrowPos = anchorRect.centerX() - xPos;
        }

        int dyTop = anchorRect.top;
        int dyBottom = screenHeight - anchorRect.bottom;

        boolean onTop = dyTop > dyBottom;

        if (onTop) {
            if (rootHeight > dyTop) {
                yPos = 15;
                LayoutParams l = scroller.getLayoutParams();
                l.height = dyTop - anchor.getHeight();
            } else {
                yPos = anchorRect.top - rootHeight;
            }
        } else {
            yPos = anchorRect.bottom;

            if (rootHeight > dyBottom) {
                LayoutParams l = scroller.getLayoutParams();
                l.height = dyBottom;
            }
        }

        showArrow(((onTop) ? R.id.arrow_down : R.id.arrow_up), arrowPos);

        setAnimationStyle(screenWidth, anchorRect.centerX(), onTop);

        mWindow.showAtLocation(anchor, Gravity.NO_GRAVITY, xPos, yPos);
    }

    /**
     * Show arrow
     *
     * @param whichArrow arrow type resource id
     * @param requestedX distance from left screen
     */
    private void showArrow(@IdRes int whichArrow, int requestedX) {
        final View showArrow = (whichArrow == R.id.arrow_up) ? arrowUp : arrowDown;
        final View hideArrow = (whichArrow == R.id.arrow_up) ? arrowDown : arrowUp;

        final int arrowWidth = arrowUp.getMeasuredWidth();

        showArrow.setVisibility(View.VISIBLE);

        ViewGroup.MarginLayoutParams param = (ViewGroup.MarginLayoutParams) showArrow.getLayoutParams();

        param.leftMargin = requestedX - arrowWidth / 2;

        hideArrow.setVisibility(View.INVISIBLE);
    }

    /**
     * Set animation style
     *
     * @param screenWidth screen width
     * @param requestedX  distance from left edge
     * @param onTop       flag to indicate where the popup should be displayed. Set TRUE if displayed on top
     *                    of anchor view and vice versa
     */
    private void setAnimationStyle(int screenWidth, int requestedX, boolean onTop) {
        int arrowPos = requestedX - arrowUp.getMeasuredWidth() / 2;
        switch (animation) {
            case AUTO:
                if (arrowPos <= screenWidth / 4)
                    mWindow.setAnimationStyle(Animation.GROW_FROM_LEFT.get(onTop));
                else if (arrowPos > screenWidth / 4 && arrowPos < 3 * (screenWidth / 4))
                    mWindow.setAnimationStyle(Animation.GROW_FROM_CENTER.get(onTop));
                else
                    mWindow.setAnimationStyle(Animation.GROW_FROM_RIGHT.get(onTop));
                break;
            default:
                mWindow.setAnimationStyle(animation.get(onTop));
        }
    }

    public void setOnDismissListener(OnDismissListener listener) {
        setOnDismissListener(this);

        dismissListener = listener;
    }

    @Override
    public void onDismiss() {
        if (!didAction && dismissListener != null) {
            dismissListener.onDismiss();
        }
    }

    public enum Animation {
        GROW_FROM_LEFT {
            @Override
            int get(boolean onTop) {
                return (onTop) ? R.style.PopDownMenuLeft : R.style.PopDownMenuLeft;
            }
        }, GROW_FROM_RIGHT {
            @Override
            int get(boolean onTop) {
                return (onTop) ? R.style.PopUpMenuRight : R.style.PopDownMenuRight;
            }
        }, GROW_FROM_CENTER {
            @Override
            int get(boolean onTop) {
                return (onTop) ? R.style.PopUpMenuCenter : R.style.PopDownMenuCenter;
            }
        }, REFLECT {
            @Override
            int get(boolean onTop) {
                return (onTop) ? R.style.PopUpMenuReflect
                        : R.style.PopDownMenuReflect;
            }
        }, AUTO {
            @Override
            int get(boolean onTop) {
                throw new UnsupportedOperationException("Can't use this");
            }
        };

        @StyleRes
        abstract int get(boolean onTop);
    }

    /**
     * Listener for item click
     */
    public interface OnActionItemClickListener {
        void onItemClick(ActionItem item);
    }

    /**
     * Listener for window dismiss
     */
    public interface OnDismissListener {
        void onDismiss();
    }
}
```

Như vậy chúng ta đã có 1 Tooltip view custom hoàn thiện rồi đó, còn có cả animation hiển thị nhìn cho bắt mắt hơn. 

À còn một điều mình quên chưa nói, muốn flexible chúng ta tạo ra class Actionitem nơi chứa title và icon khi bạn muốn thêm một action mới bất kì. Khi đó nếu như bạn có 1 list dài các action cũng không vấn đề gì cả.

`ActionItem.java`

```
public class ActionItem {
  private Bitmap thumb;
  private String title;
  private int icon = -1;
  private Drawable iconDrawable;
  private int actionId = -1;
  private boolean selected;
  private boolean sticky;

  /**
   * Create Action Item without Icon
   *
   * @param actionId Action id of the item
   * @param title Text to show for the item
   */
  public ActionItem(int actionId, String title) {
    this(actionId, title, -1);
  }

  /**
   * Create Action Item with all attribute
   *
   * @param actionId Action id for case statements
   * @param title Title
   * @param icon Icon to use
   */
  public ActionItem(int actionId, String title, @DrawableRes int icon) {
    this.actionId = actionId;
    this.title = title;
    this.icon = icon;
  }

  /**
   * Create Action Item  with only Icon
   *
   * @param icon {@link Drawable} action icon
   */
  public ActionItem(@DrawableRes int icon) {
    this(-1, null, icon);
  }

  /**
   * Create Action Item with only Icon
   *
   * @param actionId Action ID of item
   * @param icon {@link Drawable} action icon
   */
  public ActionItem(int actionId, @DrawableRes int icon) {
    this(actionId, null, icon);
  }

  /**
   * Set action title
   *
   * @param title action title
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * Get action title
   *
   * @return action title
   */
  public String getTitle() {
    return this.title;
  }

  /**
   * @return true if title have been set
   */
  public boolean haveTitle() {
    return !TextUtils.isEmpty(title);
  }

  /**
   * Set action icon
   *
   * @param icon {@link Drawable} action icon
   */
  public void setIcon(@DrawableRes int icon) {
    this.icon = icon;
  }

  /**
   * Get action icon
   *
   * @return {@link Drawable} action icon
   */
  @DrawableRes
  public int getIcon() {
    return this.icon;
  }

  public boolean haveIcon() {
    return icon > 0 || iconDrawable != null;
  }

  /**
   * Set action id
   *
   * @param actionId Action id for this action
   */
  public void setActionId(int actionId) {
    this.actionId = actionId;
  }

  /**
   * @return Our action id
   */
  public int getActionId() {
    return actionId;
  }

  /**
   * Set sticky status of button
   *
   * @param sticky true for sticky, pop up sends event but does not disappear
   */
  public void setSticky(boolean sticky) {
    this.sticky = sticky;
  }

  /**
   * @return true if button is sticky, menu stays visible after press
   */
  public boolean isSticky() {
    return sticky;
  }

  /**
   * Set selected flag;
   *
   * @param selected Flag to indicate the item is selected
   */
  public void setSelected(boolean selected) {
    this.selected = selected;
  }

  /**
   * Check if item is selected
   *
   * @return true or false
   */
  public boolean isSelected() {
    return this.selected;
  }

  /**
   * Set thumb
   *
   * @param thumb Thumb image
   */
  public void setThumb(Bitmap thumb) {
    this.thumb = thumb;
  }

  /**
   * Get thumb image
   *
   * @return Thumb image
   */
  public Bitmap getThumb() {
    return this.thumb;
  }

  public Drawable getIconDrawable(Context context) {
    if (iconDrawable == null) iconDrawable = context.getResources().getDrawable(icon);
    return iconDrawable;
  }

  public void setIconDrawable(Drawable iconDrawable) {
    this.iconDrawable = iconDrawable;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    ActionItem that = (ActionItem) o;
    return actionId == that.actionId;
  }

  @Override
  public int hashCode() {
    return actionId;
  }
}

```

### Sử dụng Tooltip trong thực tiễn

Bước này chúng ta sẽ implement những gì đã làm để có kết quả như hình ảnh lúc đầu nhé!

`MainActivity.kt`

```
class MainActivity : AppCompatActivity() {
    private var tooltipAction: TooltipAction? = null
    private var copyItem: ActionItem? = null
    private var deleteItem: ActionItem? = null
    private var shareMessage: ActionItem? = null
    private var share_Fb: ActionItem? = null
    private var shareGmail: ActionItem? = null

    private val ID_TOOLTIP_COPY = 1
    private val ID_TOOLTIP_DELETE = 2
    private val ID_TOOLTIP_SHARE_FB = 3
    private val ID_TOOLTIP_SHARE_GMAIL = 4
    private val ID_TOOLTIP_SHARE_MESSAGE = 5

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        copyItem = ActionItem(ID_TOOLTIP_COPY, "Copy")
        deleteItem = ActionItem(ID_TOOLTIP_DELETE, "Delete")

        /*Share social media*/
        shareMessage = ActionItem(ID_TOOLTIP_SHARE_MESSAGE, "Message", R.drawable.chatting)
        share_Fb = ActionItem(ID_TOOLTIP_SHARE_FB, "Facebook", R.drawable.facebook)
        shareGmail = ActionItem(ID_TOOLTIP_SHARE_GMAIL, "Gmail", R.drawable.gmail)

        tv_delete.setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View?) {
                tooltipAction = TooltipAction(this@MainActivity, TooltipAction.HORIZONTAL).apply {
                    setColorRes(R.color.grey)
                    setTextColorRes(R.color.white)
                    addActionItem(copyItem, deleteItem)
                    setOnActionItemClickListener { item ->
                        if (item.actionId === ID_TOOLTIP_COPY) {
                            Toast.makeText(this@MainActivity, "Copied", Toast.LENGTH_SHORT).show()
                        } else {
                            Toast.makeText(this@MainActivity, "Deleted!!!", Toast.LENGTH_SHORT).show()
                        }
                    }
                }
                v?.let {
                    tooltipAction?.show(it)
                }
            }

        })

        img_share.setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View?) {
                tooltipAction = TooltipAction(this@MainActivity, TooltipAction.VERTICAL).apply {
                    setColorRes(R.color.grey)
                    setTextColorRes(R.color.white)
                    addActionItem(shareMessage, share_Fb, shareGmail)
                    setOnActionItemClickListener { item ->
                        when(item.actionId) {
                            ID_TOOLTIP_SHARE_FB -> Toast.makeText(this@MainActivity, "Share to Facebook", Toast.LENGTH_SHORT).show()
                            ID_TOOLTIP_SHARE_MESSAGE -> Toast.makeText(this@MainActivity, "Start to send via message", Toast.LENGTH_SHORT).show()
                            else -> Toast.makeText(this@MainActivity, "You want to share via Gmail", Toast.LENGTH_SHORT).show()
                        }
                    }
                }
                v?.let {
                    tooltipAction?.show(it)
                }
            }

        })

    }
}
```

Và bây giờ bạn hãy chạy thử project lên để xem kết quả đạt được nha :D

### 3. Tổng kết

Với những gì trình bày ở trên hy vọng rằng các bạn đã tạo cho mình 1 tooltip gần giống như 1 menu nhưng nó flexible hơn, mong rằng bài viết sẽ hữu ích cho các bạn đang tìm kiếm cách custom 1 tooltip phù hợp cho project của mình. Nếu như các bạn có thắc mắc hay khó khăn gì trong việc implement hãy để lại lời nhắn cho mình. Happy coding ...