Khi chúng ta thiết kế style cho text trong một ứng ụng Android thì ```TextView``` cung cấp cho chúng ta rất nhiều thuộc tính để thực hiện điều đó: Chúng ta có thể set các thuộc tính trực tiếp trong layout, apply một style cho 1 view hay 1 theme cho 1 layout hoặc có thể set 1 text appearance. Vấn đề đặt ra ở đây là chúng ta nên dùng khi nào và điều gì xảy ra khi chúng ta combine chúng lại với nhau. Ở bài này mình sẽ nói về các cách tiếp cận khác nhau khi khai báo các style cho text và thứ tự ưu tiên của chúng.
                                        ![](https://images.viblo.asia/3d3b4438-9396-44a8-b3d3-b09fed72abcc.png)
                                        
  
###   I) tl;dr;
  Đầu tiên chúng ta phải nhận biết được thứ tự ưu tiên của từng kỹ thuật style khác nhau. Trường hợp nếu bạn tạo 1 style cho 1 text và không thấy kết quả đúng như bạn mong đợi thì những thay đổi đó có thể bị ghi đè bởi một thứ gì đó cao hơn trong hệ thống cấp bậc dưới đây.
  ![](https://images.viblo.asia/26a6b0dc-f94d-42c8-bde8-09c4554856c9.png)
  
###   II) Show some style
 - Mặc dù bạn có thể set trực tiếp các thuộc tính cho ```TextView``` trong layout nhưng mà cách tiếp cận này nó có thể tẻ nhạt và thực sự không tối ưu cho lắm. Thử tưởng tượng việc bạn update color cho toàn bộ các view trong layout bằng cách thủ công này khi mà style của các view là như nhau. Thay vào đó chúng ta nên tạo một style riêng để apply cho trường hợp này khi mà nó đảm bảo được tính đồng nhất, tái sử dụng và dễ dàng update.  Đây là cách vô cùng đơn giản và  phần lớn đã được handle bởi Android view system(hình  minh họa trên cùng về cách tạo style).
 - Điều gì xảy ra khi chúng ta set 1 style trên 1 view. Nếu bạn đã từng custom view thì hẳn bạn sẽ thấy luôn có một hàm luôn được gọi như ```context.obtainStyledAttributes(AttributeSet, int[], int, int)```. Đây là cách mà Android view system hoạt động, nó sẽ đưa các thuộc tính đã chỉ định trong layout của bạn đến view. Và thông số ```AttributeSet``` cơ bản được hiểu như 1 tập các thuộc tính mà bạn đã chỉ định trong XML. Nếu thuộc tính này có chỉ định 1 style thì **style này nó sẽ được đọc đầu tiên**, sau đó các thuộc tính mà chúng ta thường chỉ định trực tiếp trong XML sẽ được đọc sau cùng, điều này đồng nghĩa là các thuộc tính mà được chỉ định trực tiếp trong XML luôn luôn "win" bởi vì nó sẽ override lại các thuộc tính mà đã chỉ định trong style. Cụ thể trong style bạn set thuộc tính textColor là màu đỏ, nhưng trong layout bạn cũng set trực tiếp 1 thuộc tính textColor là màu xanh thì kết quả đầu ra luôn là màu xanh, đúng như "hệ thống cấp bậc" nêu trên. Với cách này chúng ta đã đến được rule thứ nhất của độ ưu tiên.
<blockquote>
View > Style
</blockquote>

Trong khi style nó vô cùng hữu ích nhưng nó cũng có một số giới hạn nhất định, một trong những giới hạn đó là bạn chỉ có thể apply một single style đến một view( không giông như CSS ở trên web khi mà bạn có thể apply cho nhiều class). Tuy nhiên , vẫn còn một giải pháp cụ thể khác, đó là nó có cung cấp một thuộc tính   ```TextAppearance```   cũng có các chức năng tương tự như style nhưng nó khác ở style chỗ nào thì chúng ta sẽ xem tiếp ở phần dưới đây.

### III) TextAppearance
- Đầu tiên chúng ta nhìn vào đoạn code sau:

```javascript TypedArray a = theme.obtainStyledAttributes(attrs, com.android.internal.R.styleable.TextViewAppearance, defStyleAttr, defStyleRes);
TypedArray appearance = null;
int ap = a.getResourceId(com.android.internal.R.styleable.TextViewAppearance_textAppearance, -1);
a.recycle();
if (ap != -1) {
  appearance = theme.obtainStyledAttributes(ap, com.android.internal.R.styleable.TextAppearance);
}
if (appearance != null) {
  readTextAppearance(context, appearance, attributes, false);
  appearance.recycle();
}
// a little later
a = theme.obtainStyledAttributes(attrs, com.android.internal.R.styleable.TextView, defStyleAttr, defStyleRes);
readTextAppearance(context, a, attributes, true);
```

- Ủa điều gì sẽ xảy ra ở đây, cơ bản đầu tiên ```TextView``` nó sẽ tìm kiếm xem bạn đã cung cấp một ``android:textAppearance`` chưa, nếu có thì nó sẽ load style(textAppearance) và apply những thuộc tính mà đã chỉ định trong style đó. Sau cũng nó sẽ load toàn bộ các thuộc tính còn lại mà chúng ta chỉ định trực tiếp ở view(bao gồm cả style). Cơ bản chúng ta đã đến được rule thứ 2 của độ ưu tiên.

 <blockquote>
View > Style > TextAppearance
</blockquote>
<br>
Bởi vì text appearance nó được check đầu tiên, do đó bất kỳ thuộc tính nào mà đã định nghĩa trực tiếp trên view hoặc trong style thường sẽ override lại thằng text appearance này.

Ngoài ra  `TextAppearance ` còn hỗ trợ một tập con các thuộc tính style mà `TextView` cung cấp. Để hiểu rõ hơn, chúng ta cùng xem đoạn code đã được trích ở trên như sau.

`obtainStyledAttributes(ap, android.R.styleable.TextAppearance);`
- Tham số đầu tiên chính là id mà chúng ta đã xác định.
- Tham số thứ 2 là một mảng `R.styleable.TextAppearance` chứa các thuộc tính trong style.

As such the styleable `android.R.styleable.TextAppearance` defines the scope of what TextAppearance understands. 
Nhìn vào định nghĩa dưới đây chúng ta có thể thấy được rằng `TextAppearance` đã hỗ trợ rất nhiều thuộc tính nhưng không phải tất cả.
```javascript
<attr name="textColor" />
<attr name="textSize" />
<attr name="textStyle" />
<attr name="typeface" />
<attr name="fontFamily" />
<attr name="textColorHighlight" />
<attr name="textColorHint" />
<attr name="textColorLink" />
<attr name="textAllCaps" format="boolean" />
<attr name="shadowColor" format="color" />
<attr name="shadowDx" format="float" />
<attr name="shadowDy" format="float" />
<attr name="shadowRadius" format="float" />
<attr name="elegantTextHeight" format="boolean" />
<attr name="letterSpacing" format="float" />
<attr name="fontFeatureSettings" format="string" />
```
Một vài thuộc tính chung của `TextView` chưa bao gồm ở đây như `lineHeight[Multiplier|Extra], lines, breakStrategy & hyphenationFrequency`. Do đó `TextAppearance` nó chỉ làm việc tại cấp độ character, not paragraph, vậy nên các thuộc tính mà ảnh hưởng đến toàn bộ layout vẫn chưa được hỗ trợ.

 `TextAppearance` rất hữu dụng, tuy nhiên nó cũng có phạm vi giới hạn và nó nằm tại vị trị bottom của chuổi ưu tiên, dẫn đến vẫn có những hạn chế nhất định.

### Sensible defaults
- Để ý rằng khi chúng ta kéo thả hay tạo mới 1 widget nào đó thì các widget đó đều có một style mặc định, có bao giờ bạn thắc mắc về điều đó. Để chứng minh điều này chúng ta sẽ có 1 ví dụ minh họa sau đây, cụ thể khi bạn keo 1 button vào trong layout thì nó có dạng như sau:
 ![](https://images.viblo.asia/c53600b7-3eca-4ec3-9872-f732989eb6d4.png)

- Bầy giờ chúng ta thử nhìn vào source code của button này, có thể check [tại đây](https://android.googlesource.com/platform/frameworks/base/+/refs/heads/master/core/java/android/widget/Button.java):

```javascript
public class Button extends TextView {
  public Button(Context context) {
    this(context, null);
  }
  public Button(Context context, AttributeSet attrs) {
    this(context, attrs, com.android.internal.R.attr.buttonStyle);
  }
  public Button(Context context, AttributeSet attrs, int defStyleAttr) {
    this(context, attrs, defStyleAttr, 0);
  }
  public Button(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
    super(context, attrs, defStyleAttr, defStyleRes);
  }
  @Override public CharSequence getAccessibilityClassName() {
    return Button.class.getName();
  }
  @Override public PointerIcon onResolvePointerIcon(MotionEvent event, int pointerIndex) {
    if (getPointerIcon() == null && isClickable() && isEnabled()) {
      return PointerIcon.getSystemIcon(getContext(), PointerIcon.TYPE_HAND);
    }
    return super.onResolvePointerIcon(event, pointerIndex);
  }
}
```

Nhìn có về khá thưa thớt phải không, ủa vầy background của nó nằm ở đâu, rồi đến chữ hoa hay là hiệu ứng gợn sóng xuất hiện khi người dùng chạm tay vào button này?
Thực thất mọi thứ đều nằm ở trong constructor thứ 2 và bạn để ý đến `com.android.internal.R.attr.buttonStyle`. Thằng này nó chính là 1 thuộc tính trong thêm hiện tại và nó chứa 1 tham chiếu đến 1 style resource cung cấp các giá trị mặc định cho TypeArray và đây chính là cách mà chúng ta định nghĩa style mặc định cho tất cả các view cùng loại. Nếu không muốn sử dụng style mặc định thì có thể truyền vào param la 0, điều này cũng đồng nghĩa với việc chúng ta vứt bỏ đi mọi behavior của thằng cha. Vào sâu 1 tí chúng ta có thể thấy buttonStyle nằm bên trong theme mặc định của Android như sau:
`<item name="buttonStyle">@style/Widget.Material.Light.Button</item>`, thằng này nó sẽ cung cấp cho chúng ta tất cả các thuộc tính của 1 default style button và để lấy ra các thuộc tính của thằng này chúng ta chỉ việc thông qua hàm `theme.obtainStyledAttributes`

Quay trở lại với `TextView`, nó cũng cung cấp 1 style mặc định:`textviewStyle`. Điều này rất tiện dụng nếu bạn muốn apply một vài style đến từng hay toàn bộ `TextView` trong app của chúng ta. Ví dụ chúng ta muốn text color mặc định của `TextView` luôn là màu đen thì chúng ta làm như sau: 
```javascript
<style name="MyTheme" parent="android:Theme">
    <item name="android:textViewStyle">@style/MyTextViewStyle</item>
</style>

<style name="MyTextViewStyle" parent="android:Widget.TextView">
    <item name="android:textColor">@color/black</item>
</style>
```

Giờ đây rule của chúng ta sẽ trở thành như sau:
<blockquote>
    View > Style > Default Style > TextAppearance
</blockquote>

### IV) Theme

- Chúng ta sẽ đi vào 1 ví dụ nho nhỏ, đó là chúng ta sẽ thay đổi phông chữ trong suốt ứng dụng của mình. Với trường hợp này chúng ta có thể sử dụng 1 trong những ký thuật ở trên nhưng việc thiết lập style/text appearances 1 cách thủ công ở mọi nơi sẽ lặp đi lặp lại và dễ bị lỗi, còn default style thì nó chỉ làm việc tại cấp độ widget, các class con có thể override lên behavior này. Ví dụ 1 button định nghĩa 1 `android:buttonStyle` riêng thì sẽ không nhận 1 custom `android:textViewStyle`. Thay vào đó chúng ta có thể chỉ định phông chữ trong cái theme của chúng ta như sau:
```
<style name="Theme.MyApp"
  parent="@style/Theme.MaterialComponents.Light">
  ...
  <item name="android:fontFamily">@font/space_mono</item>
</style>
```
Giờ đây bất kỳ view nào mà được support với thuộc tính này thì sẽ luôn pick thằng này trừ khi bị override lại bởi 1 thứ gì đó có độ ưu tiên cao hơn.

<blockquote>
    View > Style > Default Style > Theme > TextAppearance
  </blockquote>
  
###   Conclusion
  Trên đây mình đã giải thích qua về các kỹ thuật tạo style cho text và độ ưu tiên của chúng, nếu có sai xót mong nhận được sự góp ý.