# 1. SurfaceView là gì
Trong Android, các lớp View cơ bản như Button, TextView... được “vẽ” trên một luồng và hầu như chỉ thay đổi hình dáng, màu sắc của chúng khi có tương tác với người dùng, chẳng hạn như khi chúng ta click vào Button thì Button đó sáng lên. Trong trường hợp chúng ta cần hiển thị một thứ gì đó thay đổi liên tục như màn hình hiển thị camera, hay đồ họa game… thì chúng ta nên sử dụng lớp SurfaceView, lớp SurfaceView cung cấp cho lập trình viên 1 mặt phẳng để có thể vẽ (draw) liên tục lên mặt phẳng đó thông qua việc can thiệp tới từng điểm ảnh trên mặt phẳng.


`SurfaceView` cung cấp cho lập trình viên 1 `SurfaceHolder` để tiến hành các thao tác thay đổi trên khung nhìn. Dù là tiện lợi và đáp ứng được đa số các ứng dụng cần sự thay đổi liên tục trên màn hình như (stream video, custom camera vvv.) nhưng `SurfaceView` có 1 số hạn chế như sau:
- Việc rotate, scale holder thông qua surfaceView không dễ dàng chút nào
- Việc render display (number frame/second) còn hạn chế
- Customize view (hoặc add thêm view, draw object) trên holder của SurfaceView là điều không thể vì holder đã được sử dụng để hiển thi view trên màn hình.
- Với sử dụng SurfaceView ta cần khai báo cố định về các thuộc tính width, height và position của nó, việc thay đổi vị trí, drag, drop là điều không thể.

# 2. TextureView

`TextureView` cũng giống như  `SurfaceView` dùng để hiển thị lên màn hình những hình ảnh có độ thay đổi khung hình liên tục ví dụ như, video, game hay 1 `stream` lấy từ internet. 
Sự khác biệt chính ở đây là `SurfaceView` sử dụng mặt phẳng 2D và vẽ cách hình ảnh theo không gian 2 chiều còn `TextureView` sử dụng không gian 3D để hiển thị hình ảnh, ngoài ra `TextureView` còn cho phép ta tùy biến nhiều hơn với độ "refesh view" cao hơn.

Không giống như  `SurfaceView`, `TextureView`  không tạo ra 1 `separate window` riêng mà hoạt động  như 1 `View` bình thường khi hiển thị nội dung. Sự khác biệt này cho phép `TextureView` có thể thay đổi các thuộc tính liên tục trong quá trình hiển thị hình ảnh vd: "moved, transformed, animated, vvv" . Trong quá trình `draw view` bạn có thể thay đổi độ trong suốt vủa View thông qua `myView.setAlpha();`...

Sử dụng `TextureView`  khá là đơn giản, tất cả mọi việc bạn cần là lấy `SurfaceTexture` của  `TextureView`. Với `SurfaceTexture`  bạn có thể sử dụng để hiển thị nội dụng (nó tương đối giống như  SurfaceHolder của SurfaceView).
Với VD dưới đây mình sẽ `TextureView`  để hiển thị Custom Camera hiển thị lên màn hình:

``` Java
public class CameraPreviewActivity extends AppCompatActivity implements TextureView.SurfaceTextureListener {
      private Camera mCamera;
      private TextureView mTextureView;

      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);

          mTextureView = new TextureView(this);
          mTextureView.setSurfaceTextureListener(this);

          setContentView(mTextureView);
      }

      public void onSurfaceTextureAvailable(SurfaceTexture surface, int width, int height) {
          mCamera = Camera.open();

          try {
              mCamera.setPreviewTexture(surface);
              mCamera.startPreview();
          } catch (IOException ioe) {
              // Something bad happened
          }
      }

      public void onSurfaceTextureSizeChanged(SurfaceTexture surface, int width, int height) {
          // Ignored, Camera does all the work for us
      }

      public boolean onSurfaceTextureDestroyed(SurfaceTexture surface) {
          mCamera.stopPreview();
          mCamera.release();
          return true;
      }

      public void onSurfaceTextureUpdated(SurfaceTexture surface) {
          // Invoked every time there's a new Camera preview frame
      }
  }
```

`SurfaceTexture` của  `TextureView` có thể được gọi qua hàm `getSurfaceTexture()` hoặc là sử dụng `TextureView.SurfaceTextureListener` để lắng nghe sự kiện. Nhưng điều qua trọng là `SurfaceTexture` chỉ `available` khi `TextureView` được gắn vào 1 cửa sổ windown, do đó mình khuyến kích các bạn sử dụng `SurfaceTextureListener` để lắng nghe sự kiện trong `onSurfaceTextureAvailable`.

Một lưu ý nữa là `TextureView` chỉ được sử dụng bởi 1 nguồn dữ liệu duy nhất, do đó trong khi bạn đang sử dụng `TextureView` để hiển thị camera thì bạn không thể gọi hàm `lockCanvas()` để có thể vẽ 1 hình ảnh nào đó lên `TextureView`  cùng 1 lúc.

Ở bài sau mình sẽ giới thiệu các bạn cách sử dụng `TextureView` để CustomPreviewCamera hoàn chỉnh. Qua CustomPreviewCamera đấy chúng ta có thể lấy ảnh hoặc lưu video từ Camera.

*- Link tham khảo: https://developer.android.com/reference/android/view/TextureView*