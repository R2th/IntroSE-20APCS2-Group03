Hôm nay chúng ta sẽ cùng nhau tìm hiểu cách zoom một ImageView khi double tap vào nó.

Để hiểu rõ cách hoạt động, mình sẽ đi thẳng vào cách implement và giải thích từng phần.

## Let's go!

Đầu tiên, chúng ta sẽ tạo ra một class riêng để xử lý có tên là `HandleZoomImage`  với constructor sẽ nhận ImageView object là đối số.
```
public class HandleZoomImage implements View.OnTouchListener {

    private ImageView mImageView;

    private GestureDetector mGestureDetector;

    private Matrix mMatrix = new Matrix();
    private RectF mDisplayRect = new RectF();
    private float[] mMatrixValues = new float[9];

    private float mMinScale = 1.0f;
    private float mMaxScale = 3.0f;
    private int mZoomDuration = 200;
    private Interpolator mInterpolator = new AccelerateDecelerateInterpolator();

    public HandleZoomImage(ImageView imageView) {
        mImageView = imageView;
        mImageView.setOnTouchListener(this);

        mGestureDetector = new GestureDetector(imageView.getContext(),
                new GestureDetector.SimpleOnGestureListener());

        mGestureDetector.setOnDoubleTapListener(new GestureDetector.OnDoubleTapListener() {
            @Override
            public boolean onSingleTapConfirmed(MotionEvent e) {
                return false;
            }

            @Override
            public boolean onDoubleTap(MotionEvent ev) {
                float scale = getScale();
                float x = ev.getX();
                float y = ev.getY();
                if (scale < mMaxScale) {
                    mImageView.post(new ZoomAnimation(getScale(), mMaxScale, focalX, focalY));
                } else {
                    mImageView.post(new ZoomAnimation(getScale(), mMinScale, focalX, focalY));
                }
               
                return true;
            }

            @Override
            public boolean onDoubleTapEvent(MotionEvent e) {
                return false;
            }
        });
    }
    
    @Override
    public boolean onTouch(View v, MotionEvent ev) {
        mGestureDetector.onTouchEvent(ev);
        mImageView.setScaleType(ImageView.ScaleType.MATRIX);
        return true;
    }
    ...
}
```
Như các bạn thấy ở trên thì chúng ta sẽ khai báo và khởi tạo một số biến để sử dụng:
* **GestureDetector**: Chúng ta sẽ sử dụng lớp này để có thể bắt được các cử chỉ tương tác của người dùng. Điển hình ở đây, chúng ta muốn bắt sự kiện `onDoubleTap` nên mình sẽ thêm event này vào GestureDetector object.
* **Matrix**: Class này sẽ chứa một ma trận 3x3 tương đương với 9 giá trị. Các giá trị này là các chỉ số dùng để transform (Scale, Skew, Translate) ImageView. Bạn có thể tìm hiểu thêm tại [đây](https://developer.android.com/reference/android/graphics/Matrix)
* **RectF**: Class này sẽ chứa 4 giá trị tọa độ của một hình chữ nhật với giá trị **left** là tọa độ **X** của cạnh bên trái hcn, **top** là tọa độ **Y** của cạnh trên hcn, **right** là tọa độ **X** của cạnh bên phải hcn và **bottom** là tọa độ **Y** của cạnh dưới hcn.

Và để GestureDectector hoạt động, chúng ta cũng cần phải set TouchEvent cho nó.

Như vậy, Khi chúng ta double tap vào ImageView thì chúng ta sẽ bắt được sự kiện trong hàm `onDoubleTap`. Trong hàm này chúng ta sẽ kiểm tra giá trị scale của ImageView, nếu giá trị là min ( default = 1.0) thì chúng ta sẽ scale Image lên max = 3.0 và ngược lại, nếu giá trị scale là max thì chúng ta sẽ set lại là min.

Để lấy được giá trị scale chúng ta sẽ sử dụng hàm sau:
```
private float getScale() {
    mMatrix.getValues(mMatrixValues);
    return mMatrixValues[Matrix.MSCALE_X];
}
```
Khi gọi mMatrix.getValues(), chương trình sẽ trả lại cho chúng ta một mảng có 9 giá trị của Matrix và ta sẽ lấy giá trị scale thông qua index của MSCALE_X hoặc MSCALE_Y.

Tiếp theo, chúng ta sẽ bắt đầu việc scale ImageView với animtation zoom in, zoom out. 

**Tạo class ZoomAnimation**
```
private class ZoomAnimation implements Runnable {
    private final float mFocalX, mFocalY;
    private final long mStartTime;
    private final float mZoomStart, mZoomEnd;

    ZoomAnimation(final float currentZoom, final float targetZoom, final float focalX,
            final float focalY) {
        mFocalX = focalX;
        mFocalY = focalY;
        mStartTime = System.currentTimeMillis();
        mZoomStart = currentZoom;
        mZoomEnd = targetZoom;
    }

    @Override
    public void run() {
        float t = interpolate();
        
        float scale = mZoomStart + t * (mZoomEnd - mZoomStart);
        
        float deltaScale = scale / getScale();
        
        // thực hiện scale
        onScale(deltaScale, mFocalX, mFocalY);
        
        // Nếu animation chưa hoàn thành (<1) thì ta chạy lại hàm này
        if (t < 1f) {
            mImageView.postOnAnimation(this);
        }
    }

    // Tính tiến độ của animation
    private float interpolate() {
        float t = 1f * (System.currentTimeMillis() - mStartTime) / mZoomDuration;
        t = Math.min(1f, t);
        return mInterpolator.getInterpolation(t);  // Truyền vào % thời gian hiện tại animation -> trả về % animation được thưc hiện 
        }
}
```
Hàm `interpolate` được dùng để tính tiến độ của animation. Ví dụ chúng ta thực hiện việc zoom trong vòng 200 milis, thời gian bắt đầu animation là 1550338896673, thời gian gọi hàm `interpolate` là 1550338896773 thì chúng ta sẽ có được tỷ lệ thời gian là 0.5. Truyền giá trị này vào hàm `getInterpolation()` của `AccelerateDecelerateInterpolator` object, chương trình sẽ trả lại giá trị tỉ lệ của animation tại thời gian đó.

Sau khi có tỉ lệ animation, chúng ta sẽ tính được tỉ lệ scale để apply vào **Matrix object**.


**Các hàm khác:**
```
private void onScale(float scaleFactor, float focusX, float focusY) {
    if (getScale() < mMaxScale || scaleFactor < 1f) {
       // apply scale lên matrix
        mMatrix.postScale(scaleFactor, scaleFactor, focusX, focusY);
        displayMatrix();
    }
}

private void displayMatrix() {
    if (checkMatrixBounds()) {
        mImageView.setImageMatrix(matrix);
    }
}

// Kiểm tra và tính tọa độ ảnh sau khi scale để translate.
private boolean checkMatrixBounds() {
    final RectF rect = getDisplayRect();
    if (rect == null) {
        return false;
    }
    float height = rect.height(), width = rect.width();
    float deltaX = 0, deltaY = 0;
    final int viewHeight = mImageView.getHeight();
    if (height <= viewHeight) {
        deltaY = (viewHeight - height) / 2 - rect.top;
    } else if (rect.top > 0) {
        deltaY = -rect.top;
    } else if (rect.bottom < viewHeight) {
        deltaY = viewHeight - rect.bottom;
    }

    int viewWidth = mImageView.getWidth();
    if (width <= viewWidth) {
        deltaX = (viewWidth - width) / 2 - rect.left;
    } else if (rect.left > 0) {
        deltaX = -rect.left;
    } else if (rect.right < viewWidth) {
        deltaX = viewWidth - rect.right;
    }
    mMatrix.postTranslate(deltaX, deltaY);
    return true;
}

private RectF getDisplayRect() {
    Drawable d = mImageView.getDrawable();
    if (d != null) {
        mDisplayRect.set(0, 0, d.getIntrinsicWidth(), d.getIntrinsicHeight());
        mMatrix.mapRect(mDisplayRect);
        return mDisplayRect;
    }
    return null;
}
```

Kết quả đạt được:
![](https://images.viblo.asia/12e0af52-a85a-446a-8c89-40384278edb0.gif)