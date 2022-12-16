## Giới thiệu tổng quan.
Bài viết này dựa trên github project [LondonEyeLayoutManager](https://github.com/danylovolokh/LondonEyeLayoutManager), cái được xuất bản thường xuyên tại [Android Weekly](http://androidweekly.net/issues/issue-183).
Vì mục đích đơn giản, các đoạn mã nguồn ở đây có thể khác với mã nguồn trên repository.

**Chúng ta phải làm gì để đạt được mục đích theo những thư mà ListView cung cấp? Chúng ta phải:**
1. Hiểu tổ chức views trên màn hình như thế nào.
2. Xử lý các sự kiện touch, tính toán hướng và vận tốc scroll.
3. Di chuyển các views vào screen trong quá trình scroll.
4. Thực hiện quá trình hủy các views.

**Với RecyclerView và LayoutManager một vài điểm ở trên đã được xử lý.**
1. Chúng ta không phải xử lý các sự kiện touch và tính toán hướng và vận tốc scroll.
2. Chúng ta không phải thực hiện quá trình hủy các views.

**=> Vậy chúng ta phải thực hiện những gì:**
1. Tổ chức views trên screen.
2. Di chuyển các view trên screen trong quá trình scroll.

## Custom RecyclerView's LayoutManager.
Mục tiêu là tạo một layout manager cái sẽ tổ chức và quản lý các views trên một quỹ đạo tròn. Cái đảm bảo hai yêu cầu:
1. Tổ chức các views trên một phần tư hình tròn. Trục Y trong Android chỉ hướng ngược lại so với hệ tọa độ Cartesian.
2. View ở giữa được giữ ở giữa cung tròn.
<div align="center"><img src="https://images.viblo.asia/def571c1-e698-4150-8d7d-1da513bc4995.gif"></div>

Như đã trình bày ở trên, để triển khai một Custom LayoutManager cho RecyclerView, chúng ta sẽ phải thực hiện 2 công việc(Tổ chức views trên screen và di truyển các views đó trong quá trình scroll).
**5 bước tổ chức views trên screen**
1. Lấy vị trí của view.
2. Thêm view vào RecyclerView.
3. Lấy tọa độ của view trên màn hình.
4. Đặt bố cục view này.
5. Tăng vị trí của view.

**5 bước xử lý quá trình cuộn**
1. Tính toán khoảng bù(phần tăng thêm - offset) của các views bằng cách lấy về giá trị scroll(dx, dy).
2. Tính toán vị trí mới cho một view sử dụng kết quả khoảng bù(offset) đã nhận được.
3. Thay đổi tọa độ của view.
4. Hủy các views cái trở thành view ẩn khi chúng đã được di chuyển.
5. Thêm các views vào không gian trống được tạo ra bởi các view đã được di chuyển nếu cần.

**Quá trình tạo hình tròn**<br/>
Theo trình tự, để tổ chức và di chuyển các views trên một phần tư của hình tròn chúng ta phải tạo một thiết lập các điểm định nghĩa trước cái là trung tâm của các views. Có được điều này sẽ giúp ích tính năng của chúng ta rất nhiều:
Khi quá trình scroll xảy ra, chúng ta sẽ không phải tính toán điểm trên đường tròn cái mà chúng ta cần để di chuyển view. Chúng ta chỉ cần lấy chỉ số của điểm trung tâm của view và tăng chỉ số này bởi khoảng bù scroll. Tọa độ của điểm dựa trên vị trí của chỉ số được tăng sẽ là điểm giữa của view. Các điểm nên được đặt với các pixel-pixel chính xác, đó là lý do chúng ta không thể sử dụng một phương trình hình tròn hoặc sin/cos để tạo ra các điểm.
Chúng ta sẽ sử dụng Mid point circle algorithm để tạo các điểm nhưng có chỉnh sửa một chút.
Note: Từ giờ tôi sẽ mô tả quá trình thực hiện nhằm đảm bảo rằng người đọc biết Mid point algorithm hoạt động như thế nào.
Đây là thuật toán nguyên thủy được copy-pasted từ Wikipedia:
```
void DrawCircle(int x0, int y0, int radius) {
  int x = radius;
  int y = 0;
  int decisionOver2 = 1 - x;   // Decision criterion divided by 2 evaluated at x=r, y=0

  while( y <= x ) {
    DrawPixel( x + x0,  y + y0); // Octant 1
    DrawPixel( y + x0,  x + y0); // Octant 2
    DrawPixel(-x + x0,  y + y0); // Octant 4
    DrawPixel(-y + x0,  x + y0); // Octant 3
    DrawPixel(-x + x0, -y + y0); // Octant 5
    DrawPixel(-y + x0, -x + y0); // Octant 6
    DrawPixel( x + x0, -y + y0); // Octant 8
    DrawPixel( y + x0, -x + y0); // Octant 7
    y++;
    if (decisionOver2<=0) {
      decisionOver2 += 2 * y + 1;   // Change in decision criterion for y -> y+1
    } else {
      x--;
      decisionOver2 += 2 * (y - x) + 1;   // Change for y -> y+1, x -> x-1
   }
 }
}
```
Thuật toán này là quá trình tạo tất cả 8 quãng tám tương đồng(octants prallel). Điều đó có nghĩa là các views được tạo ra trong danh sách sẽ theo trình tự sau:
(x1, y1) — 1st Octant (Black)

(x2, y2) — 2nd Octant (Blue)

(x3, y3) — 3rd Octant (Dark Grey)

(x4, y4) — 4th Octant (Cyan)

(x5, y5) — 5th Octant (Green)

(x6, y6) — 6th Octant (Pink)

(x7, y7) — 7th Octant (Yellow)

(x8, y8) — 8th Octant (Red)

Và đây là vấn đề: Nếu điểm chính giữa của một View là điểm (x1, y1) và nhận được offset từ **scrollVerticallyBy(int dy, Recycler recycler)** là **dy=3** chúng ta nên di chuyển view của mình khoảng 3 điểm tới điểm (x4, y4) và điểm (x4, y4) là thuộc quãng tám thứ 4. Nhưng mà nó nên chỉ di chuyển khoảng vài pixels.
<div align="center"><img src="https://images.viblo.asia/4a43d128-da3e-4eb1-87eb-e998a54a5259.gif"></div>
Phải có được danh sách theo trình tự liên tiếp nhằm dễ dàng lấy được vị trí trước/sau trên đường tròn do đó cần chỉnh sửa lại thuật toán:
1. Tạo các điểm cho quãng tám thứ nhất sử dụng Mid point algorithm.
2. Các điểm đối tâm trên quãng tám thứ hai sử dụng các điểm trên quãng đầu tiên. Sau hành động này chính ta có các điểm của góc phần tư thứ nhất.
3. Các điểm đối tâm của góc phần tư thứ hai sử dụng các điểm của góc phần tư thứ nhất. Sau hành động này, ta có các điểm của nửa đường tròn đầu tiên.
4. Các điểm phản chiếu của nửa đường tròn thứ hai sử dụng các điểm từ nửa thứ nhất.
<div align="center"><img src="https://images.viblo.asia/10e3a74a-35dc-483b-a965-a7b36ec05ccf.gif"></div>
Và bây giờ tất cả các điểm được tạo liên tiếp:
(x1, y1) — 1st Octant (Pink)

(x2, y2) — 2nd Octant (Red)

(x3, y3) — 3rd Octant (Black)

(x4, y4) — 4th Octant (Black)

(x5, y5) — 5th Octant (Blue)

(x6, y6) — 6th Octant (Blue)

(x7, y7) — 7th Octant (Blue)

(x8, y8) — 8th Octant (Blue)

Và trong khi scroll nếu chúng ta nhận được **dy=3** thì view của chúng ta sẽ được di chuyển một cách chính xác.
[Đây](https://github.com/danylovolokh/MidPointCircleExplained) là ứng dụng thử.

Mã nguồn tương tự cũng được sử dụng trong LondonEyeLayoutManager. Chúng ta có một sư trừu tượng hóa được gọi là **CircleMirrorHelper** cái mang tới những APIs nhằm thực hiện quá trình tạo ra các điểm đối tâm.

```
public interface CircleMirrorHelper {

void mirror_2nd_Octant(
            Map<Integer, Point> circleIndexPoint,
            Map<Point, Integer> circlePointIndex
    );

void mirror_2nd_Quadrant(
            Map<Integer, Point> circleIndexPoint,
            Map<Point, Integer> circlePointIndex
    );

void mirror_2nd_Semicircle(
            Map<Integer, Point> circleIndexPoint,
            Map<Point, Integer> circlePointIndex
    );

}
```

Và có một quá trình triển khai **FirstQuadrantCircleMirrorHelper** cụ thể cái biết làm thế nào để phản chiếu lại các điểm trong góc phần tư thứ nhất cụ thể của chúng ta.

```
public class FirstQuadrantCircleMirrorHelper implements CircleMirrorHelper {

// relevant code here

}
```

Bạn có thể chú ý đến một chữ kí kì quoặc của các phương thức. Các điểm được thêm vào hai maps. Nó được hoàn thành từ cách thực hiện phép toán đơn giản bên dưới:
Khi quá trình scroll xảy ra chúng ta lấy được điểm chính giữa của views và sử dụng nó như một chìa khóa để lấy index(chỉ số) của điểm này. Chúng ta tăng (hoặc giảm) dựa vào hướng scroll) chỉ số này bởi giá trị nhận được từ **scrollVerticallyBy(dy, recycler, state)** và sử dụng chỉ số này như một chìa khóa để lấy về một điểm mới cái sẽ là tâm điểm của một view.

Nó sẽ trông đơn giản hơn rất nhiều nếu nó là một **List<Point>** nhưng như vậy là đủ cho mục đích của quá trình thực hiện. Nó là nhanh hơn để lấy "index by point"(chỉ số bởi điểm) khi chúng ta có một Map của chúng.

### Tổ chức views trên screen.
Để có được chất liệu cụ thể cho góc phần tư, có một sự trừu tượng hóa gọi là **QuadrantHelper**.
```
/** This is generic interface for quadrant related          
 * functionality.
 *
 * To lay out in each quadrant you should implement quadrant-
 * specific classes :
 * {@link FirstQuadrantHelper}
 */
public interface QuadrantHelper {
 
   Point findNextViewCenter(ViewData previousViewData, int     nextViewHalfViewWidth, int nextViewHalfViewHeight);

    int getViewCenterPointIndex(Point point);

    Point getViewCenterPoint(int newCenterPointIndex);

    int getNewCenterPointIndex(int newCalculatedIndex);
    
    Point findPreviousViewCenter(ViewData nextViewData, int previousViewHalfViewHeight);

    boolean isLastLayoutedView(int recyclerHeight, View view);
    
    int checkBoundsReached(int recyclerViewHeight, int dy, 

    View firstView, View lastView, boolean isFirstItemReached, boolean isLastItemReached);

    int getOffset(int recyclerViewHeight, View lastView);
}
```

Và có một quá trình triển khai thực tế: **FirstQuadrantHelper**.

```
public class FirstQuadrantHelper implements QuadrantHelper {

// code here :)

}
```

LayoutManager buộc chúng ta phải triển khai chỉ một phương thức

```
@Override
public RecyclerView.LayoutParams generateDefaultLayoutParams() {
return new RecyclerView.LayoutParams(
                RecyclerView.LayoutParams.WRAP_CONTENT,
                RecyclerView.LayoutParams.WRAP_CONTENT);
}
```

Nhưng chúng ta cần phải ghi đè một vài phương thức khác, và quan trọng nhất là **onLayoutChildren**:

```
private Layouter mLayouter;

@Override
public void onLayoutChildren(RecyclerView.Recycler recycler, RecyclerView.State state) {

// some code here...

// It will be our stop flag
boolean isLastLayoutedView;

do{
// 1. get view by position
View view = recycler.getViewForPosition(mLastVisiblePosition);

// 2. add view to the recycler view
addView(view);

// 3. get view location on the screen.
// 4. layout this view
// Points 3 and 4 are performed by "Layouter"
viewData = mLayouter.layoutNextView(view, viewData);

isLastLayoutedView = mLayouter.isLastLaidOutView(view);

// 5. increment view position
mLastVisiblePosition++;

// we do this until we laid out last visible view
} while (!isLastLayoutedView && mLastVisiblePosition < itemCount);

}
```

**Layouter** đã sử dụng đoạn code này là một thực thể cái sử dụng **QuadrantHelper** để lấy một vài thông tin về vị trí các views trong góc phần tư thực tế(**FirstQuadrantHelper** trong trường hợp của chúng ta) và cũng cấp những APIs bên dưới cho LayoutManager:

```
// This method is using a data from previous view in order to 
// layout the next view with pixel precision to the previous

public ViewData layoutNextView(View view, ViewData previousViewData);

// This method is using a data from next view in order to 
// layout the previous view with pixel precision to the 
// previous

public ViewData layoutViewPreviousView(View view, ViewData previousViewData);

// This method checks if view is the last visible view on the screen

public boolean isLastLaidOutView(View view);
```

Hãy giải thích về **layoutNextView**

```
public ViewData layoutNextView(View view, ViewData previousViewData) {

int halfViewHeight;
int halfViewWidth;

// measure view and get a half of it's height & width
// QuadrantHelper uses it to find next view center

Point viewCenter = mQuadrantHelper.findNextViewCenter(previousViewData, halfViewHeight, halfViewWidth);

// Layouter uses callback to LayoutManager to perform layout

int left, top, right, bottom;
// calculate values using viewCenter

// layout view using method layoutDecorated from LayoutManager
mLayoutManagerCallback.layoutDecorated(view, left, top, right, bottom);

return viewData of just laid out view.

}
```

**layoutNextView** đưa **previousViewData** như là một tham số. Trong lần khởi tạo đầu tiên, previousViewData là:

```
ViewData viewData = new ViewData(0, 0, 0, 0,
    mQuadrantHelper.getViewCenterPoint(0)
);
```

Sau khi chúng ta triển khai **onLayoutChildren** chúng ta có được các views đã được bố trí trên screen, nhưng không có quá trình scrolling, recycling và các thức cần thiết khác cho cái RecyclerView chúng ta cần.

### Xử lý quá trình cuộn.

Để thực hiện điều này chúng ta phải ghi đè các phương thức **scrollVerticallyBy** và/hoặc **scrollHorizontallyBy**, cũng như trả về **true** cho các phương thức **canScrollVertically** và/hoặc **canScrollHorizontally**.

Trong trường hợp của mình, chúng ta chỉ xử lý vertical scroll.

```
@Override
public boolean canScrollVertically() {
    return true;
}

@Override
public int scrollVerticallyBy(int dy, RecyclerView.Recycler recycler, RecyclerView.State state){

int childCount = getChildCount();
if (childCount == 0) {
    // we cannot scroll when there is no views
    return 0;
}

return mScroller.scrollVerticallyBy(dy, recycler);
}
```

Chúng ta có một interface chúng là **IScrollHandler** và hai quá trình thực thi: **PixelPerfectScrollHandler** và **NaturalScrollHandler**. Mỗi cái đều có ưu/nhược điểm của chúng.

Scroll handler cũng sử dụng **QuadrantHelper** để lấy dữ liệu cụ thể cho góc phần tư thực tế.

```
public interface IScrollHandler {

int scrollVerticallyBy(int dy, RecyclerView.Recycler recycler);

}
```

Ở cái nhìn đầu tiên, quá trình scrolling có vẻ đơn giản: Bạn chỉ lấy **dy** và di chuyển mỗi view theo giá trị này, nhưng không phải như thế.

**NaturalScrollHandler**
Tại sao "Natural"? Bởi vì khi các view được cuộn, nó trông rất tự nhiên. Quãng đường giữa tâm của các views được giữ.

Quá trình sử dụng các view được xử lý scroll này, mỗi view sẽ được di chuyển bởi cùng một quãng đường(**dy**) trên vòng tròn cái nhìn rất tuyệt vời khi các views có quãng đường giữa chúng và chúng là những hình vuông như bên dưới:

<div align="center"><img src="https://images.viblo.asia/0e2090d2-3067-4c7f-8db2-b7387e937db6.gif"></div>

Nhưng khi không có những khoảng trống giữa các views chúng sẽ đè lên mỗi cái khác, hoặc có cảm giác khoảng cách giữa chúng sẽ lớn hơn.

<div align="center"><img src="https://images.viblo.asia/681c7e09-9c9e-42f2-9a2e-48ab5bc39bff.gif"></div>

Đây là mã nguồn:

Trong scroller(trình cuộn) này chúng ta có thể bỏ qua điểm đầu tiên: **Tính toán các khoảng bù(offset) của các views bằng các giá trị scroll(dx, dy) nhận được**, bởi vì khoảng bù của chúng ta là **dy**.

```
public class NaturalScrollHandler //..

public int scrollVerticallyBy(int dy, RecyclerView.Recycler recycler){

for (int indexOfView = 0; indexOfView <    mCallback.getChildCount(); indexOfView++) {

    View view = mCallback.getChildAt(indexOfView); 
     // Points 1, 2, 4 here
    scrollSingleViewVerticallyBy(view, delta);
}

// after scrolling perform recycling
// Points 4,5 here

performRecycling();

}

/**
 * This method calculates new position of single view and  
 * returns new center point of the view
 */
protected Point scrollSingleViewVerticallyBy(View view, int indexOffset) {

// find view center using view properties
int viewCenterX = view.getRight() - view.getWidth() / 2;
int viewCenterY = view.getTop() + view.getHeight() / 2;

//this object will be updated many times during search of view
SCROLL_HELPER_POINT.update(viewCenterX, viewCenterY);

int centerPointIndex = mQuadrantHelper.getViewCenterPointIndex(SCROLL_HELPER_POINT);

// increase the point by indexOffset
int newCenterPointIndex = mQuadrantHelper.getNewCenterPointIndex(centerPointIndex + indexOffset);

// after increasing index, find point by index
// 2. Calculate new position of a view using received offset.

Point newCenterPoint = mQuadrantHelper.getViewCenterPoint(newCenterPointIndex);

// calculate dy and dx
int dx = newCenterPoint.getX() - viewCenterX;
int dy = newCenterPoint.getY() - viewCenterY;

// 3. Change view location.
view.offsetTopAndBottom(dy);
view.offsetLeftAndRight(dx);

return newCenterPoint;

}
```

Phương thức **performRecycling** cũng chịu trách nhiệm làm đầy khoảng trống được tạo ra bởi quá trình di chuyển các views.

```
/**
* This method recycles views:
* If views was scrolled down then it recycles top if needed 
* and add views from the bottom
* If views was scrolled up then it recycles bottom if needed 
* and add views from the top
* @param delta - indicator of scroll direction
*/
private void performRecycling(int delta, View firstView, View       lastView,  RecyclerView.Recycler recycler) {
	if (delta < 0) {
	    /** Scroll down*/
	    // 4. Recycle views that become invisible when they were 
	    // moved.
	    recycleTopIfNeeded(firstView, recycler);
	 
	    // 5. Add views to empty space created by moved views if
	    // needed.
	    addToBottomIfNeeded(lastView, recycler);

	} else {
	    /** Scroll up*/
	    // 4. Recycle views that become invisible when they were 
	    // moved.
	    recycleBottomIfNeeded(lastView, recycler);

	    // 5. Add views to empty space created by moved views if
	    // needed.
	    addTopIfNeeded(firstView, recycler);
	}
}
```

Do không thể sử dụng **NaturalScrollHandler** với các views không vuông, tôi đã xác định thực hiện một cái khác.

**PixelPerfectScrollHandler**
PixelPerfectScrollHandler đã được thiết kế tuân theo hai nguyên tắc trong quá trình scrolling.

Trình xử lý scrolling này giữ các views dính với nhau trong khi scroll.
1. Tâm của các views nằm trên đường tròn.
2. Các cạnh của các views luôn dính với mỗi cái khác.
Thỉnh thoảng điều này đòi hỏi quá trình tạo các "jump views" khi scroll. Nghĩa là nếu view B ở bên dưới view A và các views được scroll xuống chúng ta có thể nhận được một điểm khi mà view B không thể ở bên dưới view A lâu hơn nữa mà vẫn giữ tâm của nó nằm trên đường tròn. Do đó, trong trường hợp này, view B nhảy tới phía tiếp theo nhằm giữ cho nó dính với view A đồng thời giữ cho tâm của nó nằm trên đường tròn. Theo logic sẽ là:
    * Cuộn view đầu tiên bởi khoảng bù(offset) đã nhận được.
    * Tính vị trí của các views liên quan khác với view đầu tiên.

Đây là demo jump trông như thế nào:

<div align="center"><img src="https://images.viblo.asia/03402025-dd04-421b-b66b-208cef753ad5.gif"></div>

```
public class PixelPerfectScrollHandler//...

//..

public int scrollVerticallyBy(int dy, RecyclerView.Recycler recycler){

// 1. Calculate views offset by received scroll value dy.
int delta;
// calculate delta. Look if we reached bottom or top of the 
// list If yes then return actual distance on which we have 
// moved views

// 2.Calculate new position of a view using received offset.

Point newCenterPoint = mQuadrantHelper.getNewCenterPoint(/*some ars here*/)

int yOffset;
int xOffset;

// calcute yOffeset and xOffset using new center point of this view

// 3. Change view location.
// calling these methods will cause view to change it position
view.offsetTopAndBottom(yOffset);
view.offsetLeftAndRight(xOffset);

// Using position of first view now we have to find position of other 
// views. Because it's a pixel perfect scroller we have to find a 
// location which will be right below previous view or to the left of 
// previous view and still keep it's center on the circle.

// There is a lot of code here, so please check 
// {@link PixelPerectScrollHandler#scrollSingleView} for the reference
```

Sau khi chúng ta hoàn thành quá trình di chuyển các views, chúng ta phải tái sử dụng các views ẩn và lấp đầy khoảng trống đó bởi các views đã được di chuyển. Chúng ta gọi phương thức **performRecycling**, chính xác giống như trong **NaturalScrollHandler**.

Dĩ nhiên, có rất nhiều thứ phải thực hiện:
1. Hỗ trợ animations.
2. Xử lý **inPrelayout**
3. Save/Restore instance state.
4. Xử lý data set changes.

Và cũng như có bugs trong project này. Đây là một PoC(Proof of Concept) và không là một thư viện được kiểm thử đầy đủ. Do đó mọi người đều được chào đón để đóng góp.

## Tổng kết.

Việc hiển thị một số đoạn mã có lẽ không đủ để giải thích đầy đủ về cách triển khai một LayoutManager tùy chỉnh, nhưng hy vọng nó sẽ giúp ai đó nếu họ muốn (hoặc cần) thực hiện một cái gì đó tương tự.

## Source.
https://medium.com/@v.danylo/10-steps-to-create-a-custom-layoutmanager-2f30ab2f979d
## Reference
http://wiresareobsolete.com/2014/09/building-a-recyclerview-layoutmanager-part-1/
http://wiresareobsolete.com/2014/09/recyclerview-layoutmanager-2/
http://wiresareobsolete.com/2015/02/recyclerview-layoutmanager-3/