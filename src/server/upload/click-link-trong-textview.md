Trong lập trình sự kiện trong Android chắc các bạn gặp nhiều đoạn TextView mà có chưa link trang web hay là số điện thoại trong đó mà người dùng có thể click vào được, hay phức tạp hơn là 1 `hashtag` như kiểu facebook. Các bạn đều biết các kỹ sư lập trình đều sử dụng `Spannable` để gắn thuộc tính cho đoạn `TextView ` đó. Nhưng họ sử dụng `Spannable`  như thế nào để có thể tùy biến mọi thứ đẹp và đơn giản như vậy. 

Có rất nhiều cách để thực hiện việc đó. Trên đây mình sẽ giới thiệu với các bạn 2 cách đơn giản nhất.
# 1. Sử dụng Linkify
`Linkify` là 1 thư viện do các lập trình viên của Google cung cấp sẵn đơn giản hóa việc tạo `Click Link` trong TextView.
```Java
    TextView myWebSite = new TextView(this);
    myWebSite .setText("http://www.google.com");
    Linkify.addLinks(myWebSite , Linkify.WEB_URLS);
```

`Linkify` cung cấp cho lập trình viên các trường hợp link cơ bản nhất sẽ có trong TextView như `Linkify.WEB_URLS`, `Linkify.EMAIL_ADDRESSES`, `Linkify.MAP_ADDRESSES`, `Linkify.PHONE_NUMBERS` khi người dùng click vào link tương ứng với các sự kiện trên thì tự động hệ thống sẽ chuyển hướng tương ứng đến các ứng dụng được cài đặt sẵn như `Web Browsers`, `Email`,`Map`, `Call`.

Thật là tiện dụng phải không nào.  Nhưng sự tiện dụng này lại không đem đến nhiều tùy biến cho lập trình viên. VD như khi người dùng click vào link của 1 trang web thì bạn muốn hiện lên 1 thông báo xác nhận xem người dùng có muốn đi đến trong web đó không, hay bạn muốn thay đổi màu của link text hiển thị từ màu xanh mặc định sang màu tím mộng mơ chả hạn vvv.

Dưới đây mình sẽ hướng dẫn các bạn viết 1 `CustomTextView` để bạn có thể tùy biến với tất cả những gì bạn muốn.

# 2. Sử dụng Custom TextView
Để viết Custom TextView chúng ta cần định nghĩa ra các class sau:
- AutoLinkMode
- AutoLinkItem
- TouchableSpan
- LinkTouchMovementMethod
- CustomTextViewLink

## 2.1 AutoLinkMode
Đầu tiên các bạn cần tạo 1 `Object` để chứa các định nghĩa về đoạn link mà bạn muốn khởi tạo.

```Java
public class AutoLinkMode {
    public static final int DEFAULT_COLOR = Color.BLUE;
    public static final int DEFAULT_COLOR_SELECT = Color.LTGRAY;

    public static final String MODE_URL = "Url";
    public static final String MODE_PHONE = "Phone";
    public static final String MODE_EMAIL = "Email";

    public static AutoLinkMode URL = new AutoLinkMode(MODE_URL, Patterns.WEB_URL, DEFAULT_COLOR, DEFAULT_COLOR_SELECT);

    public static AutoLinkMode PHONE =
            new AutoLinkMode(MODE_PHONE, Patterns.PHONE, DEFAULT_COLOR, DEFAULT_COLOR_SELECT);

    public static AutoLinkMode EMAIL =
            new AutoLinkMode(MODE_EMAIL, Patterns.EMAIL_ADDRESS, DEFAULT_COLOR, DEFAULT_COLOR_SELECT);

    private String name;

    private Pattern pattern;

    private int color = DEFAULT_COLOR;

    private int colorSelect = DEFAULT_COLOR_SELECT;

    public AutoLinkMode(@NonNull String name, @NonNull Pattern pattern, int color, int colorSelect) {
        this.name = name;
        this.pattern = pattern;
        this.color = color;
        this.colorSelect = colorSelect;
    }

    public AutoLinkMode(String name, Pattern pattern) {
        this.name = name;
        this.pattern = pattern;
        this.color = DEFAULT_COLOR;
        this.colorSelect = DEFAULT_COLOR_SELECT;
    }

    // Write method setter, getter 
}
```

ở đây mình có tạo ra 3 loại link hay sử dụng nhất là `URL`,`PHONE`,`EMAIL` sử dụng lại hầu hết các định nghĩa mặc định của hệ thống.

## 2.2 AutoLinkItem
Tiếp đến là tạo Object để chứa thuộc tính của đoạn text bạn muốn khởi tạo link
```Java
public class AutoLinkItem {
    // Properties of Link
    private AutoLinkMode autoLinkMode;
    // String link text
    private String matchedText;
    // Position start and end of string in TextView.
    private int startPoint,endPoint;

    AutoLinkItem(int startPoint, int endPoint, String matchedText, AutoLinkMode autoLinkMode) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.matchedText = matchedText;
        this.autoLinkMode = autoLinkMode;
    }
    
    // Write method setter, getter 
}
```

## 2.3 TouchableSpan
Tạo class `TouchableSpan` kế thừa từ `ClickableSpan` để gắn các thuộc tính màu, gạch dưới cho đoạn `Text` chứa link.
```Java
abstract class TouchableSpan extends ClickableSpan {
    
    // Status link
    private boolean isPressed;
    // Color of link 
    private int normalTextColor;
    // Color of link when user click
    private int pressedTextColor;
    private boolean isUnderLineEnabled;

    TouchableSpan(int normalTextColor, int pressedTextColor, boolean isUnderLineEnabled) {
        this.normalTextColor = normalTextColor;
        this.pressedTextColor = pressedTextColor;
        this.isUnderLineEnabled = isUnderLineEnabled;
    }

    void setPressed(boolean isSelected) {
        isPressed = isSelected;
    }

    @Override
    public void updateDrawState(TextPaint textPaint) {
        super.updateDrawState(textPaint);
        int textColor = isPressed ? pressedTextColor : normalTextColor;
        textPaint.setColor(textColor);
        textPaint.bgColor = Color.TRANSPARENT;
        textPaint.setUnderlineText(isUnderLineEnabled);
    }
}
```

## 2.4 LinkTouchMovementMethod
class `LinkTouchMovementMethod` để bắt các sự kiện khi người dùng click vào link.
```Java
public class LinkTouchMovementMethod extends LinkMovementMethod {

    private TouchableSpan pressedSpan;

    @Override
    public boolean onTouchEvent(TextView textView, final Spannable spannable, MotionEvent event) {
        int action  = event.getAction();
        if (action == MotionEvent.ACTION_DOWN) {
            pressedSpan = getPressedSpan(textView, spannable, event);
            if (pressedSpan != null) {
                pressedSpan.setPressed(true);
                Selection.setSelection(spannable, spannable.getSpanStart(pressedSpan),
                        spannable.getSpanEnd(pressedSpan));
            }
        } else if (action == MotionEvent.ACTION_MOVE) {
            TouchableSpan touchedSpan = getPressedSpan(textView, spannable, event);
            if (pressedSpan != null && touchedSpan != pressedSpan) {
                pressedSpan.setPressed(false);
                pressedSpan = null;
                Selection.removeSelection(spannable);
            }
        } else {
            if (pressedSpan != null) {
                pressedSpan.setPressed(false);
                super.onTouchEvent(textView, spannable, event);
            }
            pressedSpan = null;
            Selection.removeSelection(spannable);
        }
        return true;
    }

    private TouchableSpan getPressedSpan(TextView textView, Spannable spannable, MotionEvent event) {

        int x = (int) event.getX();
        int y = (int) event.getY();

        x -= textView.getTotalPaddingLeft();
        y -= textView.getTotalPaddingTop();

        x += textView.getScrollX();
        y += textView.getScrollY();

        Layout layout = textView.getLayout();
        int verticalLine = layout.getLineForVertical(y);
        int horizontalOffset = layout.getOffsetForHorizontal(verticalLine, x);

        TouchableSpan[] link = spannable.getSpans(horizontalOffset, horizontalOffset, TouchableSpan.class);
        TouchableSpan touchedSpan = null;
        if (link.length > 0) {
            touchedSpan = link[0];
        }
        return touchedSpan;
    }
}
```

## 2.5 CustomTextViewLink
Đây sẽ là Class chính để chúng ta kết nối các đoạn code ở trên lại với nhau.
```Java
public class CustomTextViewLink extends AppCompatTextView {
    private static final int MIN_PHONE_NUMBER_LENGTH = 8;

    private AutoLinkOnClickListener autoLinkOnClickListener;

    private AutoLinkMode[] autoLinkModes;

    private boolean isUnderLineEnabled = false;

    public CustomTextViewLink(Context context) {
        super(context);
    }

    public CustomTextViewLink(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    public void setHighlightColor(int color) {
        super.setHighlightColor(Color.TRANSPARENT);
    }

    public void setAutoLinkText(String text) {
        SpannableString spannableString = makeSpannableString(text);
        setText(spannableString);
        setMovementMethod(new LinkTouchMovementMethod());
    }

    private SpannableString makeSpannableString(String text) {

        final SpannableString spannableString = new SpannableString(text);

        List<AutoLinkItem> autoLinkItems = matchedRanges(text);

        for (final AutoLinkItem autoLinkItem : autoLinkItems) {
            int currentColor = autoLinkItem.getAutoLinkMode().getColor();
            int currentColorSelect = autoLinkItem.getAutoLinkMode().getColorSelect();

            TouchableSpan clickableSpan = new TouchableSpan(currentColor, currentColorSelect, isUnderLineEnabled) {
                @Override
                public void onClick(View widget) {
                    if (autoLinkOnClickListener != null) {
                        autoLinkOnClickListener.onAutoLinkTextClick(autoLinkItem.getAutoLinkMode(),
                                autoLinkItem.getMatchedText());
                    }
                }
            };

            spannableString.setSpan(clickableSpan, autoLinkItem.getStartPoint(), autoLinkItem.getEndPoint(),
                    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        }

        return spannableString;
    }

    private List<AutoLinkItem> matchedRanges(String text) {

        List<AutoLinkItem> autoLinkItems = new LinkedList<>();

        if (autoLinkModes == null) {
            throw new NullPointerException("Please add at least one mode");
        }

        for (AutoLinkMode anAutoLinkMode : autoLinkModes) {
            Pattern pattern = anAutoLinkMode.getPattern();
            Matcher matcher = pattern.matcher(text);

            if (anAutoLinkMode.getName().equals(AutoLinkMode.MODE_PHONE)) {
                while (matcher.find()) {
                    if (matcher.group().length() > MIN_PHONE_NUMBER_LENGTH) {
                        autoLinkItems.add(
                                new AutoLinkItem(matcher.start(), matcher.end(), matcher.group(), anAutoLinkMode));
                    }
                }
            } else {
                while (matcher.find()) {
                    autoLinkItems.add(
                            new AutoLinkItem(matcher.start(), matcher.end(), matcher.group(), anAutoLinkMode));
                }
            }
        }

        return autoLinkItems;
    }

    public void addAutoLinkMode(AutoLinkMode... autoLinkModes) {
        this.autoLinkModes = autoLinkModes;
    }

    public void enableUnderLine() {
        isUnderLineEnabled = true;
    }

    public void setAutoLinkOnClickListener(AutoLinkOnClickListener autoLinkOnClickListener) {
        this.autoLinkOnClickListener = autoLinkOnClickListener;
    }

    public interface AutoLinkOnClickListener {
        void onAutoLinkTextClick(AutoLinkMode autoLinkMode, String matchedText);
    }
}
```

## 2.6 Sử dụng CustomTextViewLink
```Java
AutoLinkMode autoLinkModePhone =
      new AutoLinkMode(AutoLinkMode.MODE_PHONE, Pattern.compile(ValidateUtils.PATTERN_PHONE_NUMBER),
                            R.color.urlLinkText, AutoLinkMode.DEFAULT_COLOR_SELECT);

AutoLinkMode autoLinkModeUrl =
      new AutoLinkMode(AutoLinkMode.MODE_URL, Patterns.WEB_URL, R.color.urlLinkText,
                            AutoLinkMode.DEFAULT_COLOR_SELECT);
                            
CustomTextViewLink customTextView = new CustomTextViewLink(this);
// Or
CustomTextViewLink customTextView = findViewById(R.id....);

customTextView.addAutoLinkMode(autoLinkModePhone, autoLinkModeUrl, AutoLinkMode.EMAIL);
customTextView.enableUnderLine();
customTextView.setAutoLinkText(messageCurrent.getMessage());
customTextView.setAutoLinkOnClickListener((autoLinkMode, matchedText) -> {
                // Write code click here
   });
```

Trông cũng không quá phức tạp đúng không nào.

Hiện tại mình đang viết nó thành 1 thư viện public trên github hi vọng sẽ sớm đến được với các bạn.