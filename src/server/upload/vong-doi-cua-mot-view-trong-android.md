Khi chúng ta nhìn vào một ứng dụng, điều đầu tiên chúng ta để ý là thứ mà ta nhìn thấy trên màn hình. Một view sẽ là thứ hiển thị trên màn hình.
Lớp View đại diện cho các thành phần cơ bản để xây dựng nên giao diện người dùng. Một view sẽ chiếm một khu vực hình chữ nhật trên màn hình và chịu trách nhiệm cho việc vẽ và xử lý sự kiện. View là lớp cơ sở cho các widget, thứ được sử dụng để tạo nên các thành phần UI tương tác (button, text, ...). ViewGroup lại là lớp cơ sở cho layouts. Layout chính là những container vô hình chứa những View khác (hoặc ViewGroup khác) và định nghĩa những thuộc tính của layout.
![](https://images.viblo.asia/77948d86-5b5e-4661-8515-399f67279287.png)
# View Life Cycle
Mỗi Activity có một vòng đời riêng của nó, tương tự như thế, view cũng có một vòng đời. Một view đã được render trên màn hình sẽ phải đi qua các phương thức trong vòng đời của nó để được tạo ra trên màn hình một cách đúng đắn. Mỗi phương thức này có những nhiệm vụ quan trọng riêng. Ta sẽ cùng đi sâu vào tìm hiểu chúng.
![](https://images.viblo.asia/06efbb92-b4b7-4c85-994c-256784a1affc.png)
# Constructor
Thông thường, chúng ta sẽ bị bối rối khi thấy có tận 4 constructor cho một view
```
View(Context context) 
View(Context context, @Nullable AttributeSet attrs) 
View(Context context, @Nullable AttributeSet attrs, int defStyleAttr) 
View(Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes)
```
## View(Context context)
Constructor đơn giản để tạo một view từ code một cách linh động. Tham số context ở đây là Context nơi mà view sẽ chạy vào, thông qua context, ta có thể truy cập vào theme, resouce, ..
## View(Context context, @Nullable AttributeSet attrs)
Constructor được gọi khi ta inflate một view từ XML. Nó sẽ được gọi khi một view được khởi tạo từ một file XML, cung cấp các thuộc tính đã được chỉ định trong file XML. Phiên bản này sử dụng kiểu mặc định là 0, do đó, chỉ các thuộc tính được áp dụng chỉ bao gồm trong Theme của Context và AtributeSet đã cho.
## View(Context context, @Nullable AttributeSet attrs, int defStyleAttr)
Thực hiện việc inflate từ XML và áp dụng một style cơ bản của một lớp cụ thể từ theme attribute. Constructor này của view cho phép các lớp con sử dụng style cơ bản tiêng của chúng khi inflate. Ví dụ, một constructor của lớp Button có thể gọi constructor này của lớp cha và áp dụng R.attr.buttonStyle cho tham số defStyleAttr. Điều này cho phép style button của theme được chỉnh sửa tất cả các thuộc tính cơ bản của view cũng như các thuộc tính của lớp Button.
Tham số defStyleAttr là một thuộc tính trong theme hiện tại mà chứa một tham chiếu tới một style resouce, thứ sẽ cung cấp giá trị mặc định cho view. 
## View(Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes)
Thực hiện inflate từ XML và áp dụng một them cơ bản của một class cụ thể từ một theme attribute hoặc style resouce. Constructor này của View cho phép các lớp con sử dụng base style riêng của chúng khi chúng được inflate, tương tự như ở trên.
Tham số defStyleRes là id của một resource cho một style resouce để cung cấp giá trị default cho view.
Life của một view được tạo ra bởi ba thứ chính
**Attachment / Detachment**
**Traversals**
**State Save/ Restore**
# Attachment / Detachment
Đây là phase mà khi một view được attach hay detach trên một window. Trong phase này, có một số phương thức ta sẽ nhận được qua callback để thực hiện một số thứ cụ thể.
## onAttachedToWindow()
Callback này được gọi tới khi một view được attach tới một window. Đây là phase mà view biết rằng nó có thể được active và có một bề mặt để vẽ. Do đó, ta có thể bắt đầu phân bổ bất kỳ tài nguyên nào hay thiết lập các listener.
## onDetachedFromWindow()
Callback này được gọi khi view bị detach khỏi một window. Tại thời điểm này, nó sẽ không còn bề mặt để vẽ nữa. Đây là nơi ta cần phải dừng bất cứ công việc nào được lập lịch và giải phóng các resouce được phân bổ. Phương thức này được gọi khi chúng ta gọi tới việc remove view trên ViewGroup hay khi activity bị destroy,...
## onFinishInflate()
Callback sẽ được gọi sau khi tất cả view con được add vào view cha.
# Traversals
Phase này được gọi là phase Traversal bởi vì phân cấp view trông giống như một cấu trúc cây từ node parent (ViewGroup), với các nhánh tới node lá (view con). Vì vậy, mỗi phương thức bắt đầu từ parent và truyền cho tới nút cuối cùng để xác định các ràng buộc.
![](https://images.viblo.asia/4f88a29b-05bc-4270-88d9-fe74678c08fd.png)
![](https://images.viblo.asia/b32069ba-fce2-4c62-a4f5-53d7c5a446ef.png)
Phase Measure và phase Layout luôn luôn xảy ra đồng thời. Nó là một quá trình tuần tự như hình trên.
## onMeasure()
Callback này đươc gọi để xác định kích thước của view. Trong trường hợp của ViewGroup, nó sẽ tiếp tục và tiến hành tính toán kích thước các view con và từ đó giúp quyết định kích thước của chính nó
```
**onMeasure**(int widthMeasureSpec, int heightMeasureSpec)
**@param** widthMeasureSpec Horizontal space requirements as imposed by the parent
**@param** heightMeasureSpec Vertical space requirements as imposed by the parent
```
## onLayout()
Callback này được gọi sau khi kích thước của view để định vị chúng trên màn hình.
## onDraw()
Kích thước và vị trí được tính toán trong các bước trước, do đó, view có thể được vẽ nên dựa trên chúng. Trong call back này, đối tượng Canvas được khởi tạo có một list các command của OpenGL-ES để gửi tới GPU. Không bao giờ khởi tạo đối tượng trong callback onDraw() vì nó được gọi một số lần.
Có hai phương thức nữa sẽ được thực hiện khi có một sự thay đổi thuộc tính của một view cụ thể, chúng là:
## invalidate()
Callback này là một phương thức sẽ phải chạy khi ta muốn thực hiện vẽ lại một view cụ thể. Nói một cách đơn giản, callback invalidate() cần phải được gọi bất cứ khi nào xảy ra thay đổi cách hiển thị của view.
## requestLayout()
Tại một số thời điểm, có một sự thay đổi trạng thái trong view, callback requestLayout là tín hiện để hệ thống view biết được rằng cần phải tính toán Measure phase và Layout phase của view. Một cách đơn giản, ta có thể hiểu rằng callback requestLayout cần phải được gọi khi có một sự thay đổi xảy ra ở các đường bao của view.
# State Save / Restore
## onSaveInstanceState()
Để lưu trữ trạng thái của một view, đầu tiên ta cần phải đưa một ID cho nó. Tiếp theo, ta cần một lớp kế thừa từ View.BaseSavedSate và sau đó lưu trữ những thuộc tính của chúng. Có một ví dụ minh hoạ dưới đây để giúp bạn dễ hiểu hơn.
## onRestoreInstanceState(Parcelable state)
Ta cần ghi đè callback này và đọc dữ liệu từ Parcelable và sau đó viết logic dựa trên dữ liệu có trong Parcelable.
```
@Override
public Parcelable onSaveInstanceState() {
    Bundle bundle = new Bundle();
    // The vars you want to save - in this instance a string and a boolean
    String someString = "something";
    boolean someBoolean = true;
    State state = new State(super.onSaveInstanceState(), someString, someBoolean);
    bundle.putParcelable(State.STATE, state);
    return bundle;
}

@Override
public void onRestoreInstanceState(Parcelable state) {
    if (state instanceof Bundle) {
        Bundle bundle = (Bundle) state;
        State customViewState = (State) bundle.getParcelable(State.STATE);
        // The vars you saved - do whatever you want with them
        String someString = customViewState.getText();
        boolean someBoolean = customViewState.isSomethingShowing());
        super.onRestoreInstanceState(customViewState.getSuperState());
        return;
    }
    // Stops a bug with the wrong state being passed to the super
    super.onRestoreInstanceState(BaseSavedState.EMPTY_STATE); 
}

protected static class State extends BaseSavedState {
    protected static final String STATE = "YourCustomView.STATE";

    private final String someText;
    private final boolean somethingShowing;

    public State(Parcelable superState, String someText, boolean somethingShowing) {
        super(superState);
        this.someText = someText;
        this.somethingShowing = somethingShowing;
    }

    public String getText(){
        return this.someText;
    }

    public boolean isSomethingShowing(){
        return this.somethingShowing;
    }
}
```
# Tổng kết
Trên đây là một số kiến thức cơ bản về vòng đời của view.
Cảm ơn bạn đã dành thời gian đọc bài viết của mình.
Tà liệu tham khảo : [The Life Cycle of a View in Android](https://proandroiddev.com/the-life-cycle-of-a-view-in-android-6a2c4665b95e)