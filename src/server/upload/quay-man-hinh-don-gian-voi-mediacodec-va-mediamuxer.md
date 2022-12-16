Lớp [MediaCodec](https://developer.android.com/reference/android/media/MediaCodec) có thể được sử dụng để truy cập các thông tin của [media codec ](https://www.freemake.com/blog/video-codec/)cấp thấp, tức là các thành phần bộ mã hóa / giải mã. 

[MediaMuxer](https://developer.android.com/reference/android/media/MediaMuxer.html) tạo điều kiện cho việc truyền các luồng cơ bản. Hiện tại MediaMuxer hỗ trợ file MP4, Webm và 3GP làm đầu ra.

Tóm tắt lại là chúng ta sẽ dùng MediaCodec để encode video, và từ dũ liệu được encode dùng MediaMuxer để tạo video :D.

### Tạo ứng dụng quay màn hình
#### Xin quyền và tạo layout
Xem lại tại [bài viết trước ](https://viblo.asia/p/quay-man-hinh-android-don-gian-voi-mediarecorder-va-mediaprojection-Az45bYWNlxY#_tao-man-hinh-gom-2-nut-startrecord-va-stoprecord--2)  :D
#### Tạo lớp RecordHelper thực hiện việc quay màn hình
**Khai báo các đối tượng**
```java
private Activity activity;
        private Point screenPoint;

        private MediaMuxer mediaMuxer;
        private MediaCodec videoEncoder;
        private Surface inputSurface;

        private MediaProjectionManager projectionManager;
        private MediaProjection mediaProjection;

        private boolean muxerStarted;
        private int trackIndex = -1;

        private android.media.MediaCodec.Callback encoderCallback;
```
* Surface: dùng để làm đầu vào(input) cho việc encode, thay thế cho bộ đệm
* MediaCodec.Callback: callback của MediaCodec. Được sử dụng để thông báo một cách không đồng bộ các sự kiện MediaCodec khác nhau.
* muxerStarted: xác định trạng thái của MediaMuxer
* trackIndex : index của track mới được thêm vào muxer

**Các phương thức thực hiện việc record**

Để khởi tạo được MediaProjection, chúng ta tạo Intent từ phương thức MediaProjectionManager.createScreenCaptureIntent() và truyền Intent đó qua phương thức Acitivity.startActivityForResult() cùng với một requestCode. Nếu requestCode trả về trong phương thức onActivityForResult() bằng với requestCode đã gửi đi và resultCode = RESULT_OK thì resultCode đó và Intent trả về sẽ được dùng để khởi tạo MediaProjection :
```java
 public void requestRecord(int requestCode) {
        activity.startActivityForResult(projectionManager.createScreenCaptureIntent(), requestCode);
 }
    
 public void startRecord(Intent intent, int resultCode) {
        if (mediaProjection == null) {
            mediaProjection = projectionManager.getMediaProjection(resultCode, intent);
        }
        startRecording();
    }
    
  private void startRecording() {
        DisplayManager dm = (DisplayManager) activity.getSystemService(Context.DISPLAY_SERVICE);
        Display defaultDisplay;
        if (dm != null) {
            defaultDisplay = dm.getDisplay(Display.DEFAULT_DISPLAY);
        } else {
            throw new IllegalStateException("Cannot display manager?!?");
        }
        if (defaultDisplay == null) {
            throw new RuntimeException("No display found.");
        }

        // Lấy thông tin kích thước và tỉ lệ màn hình
        Display display = activity.getWindowManager().getDefaultDisplay();
        DisplayMetrics metrics = new DisplayMetrics();
        display.getRealSize(screenPoint);
        display.getRealMetrics(metrics);

        // Khởi tạo các thành phần
        initCallback();
        prepareVideoEncoder(screenPoint.x , screenPoint.y);
        initMuxer();
        initVirtualDisplay(metrics);
    }
```

**MediaFormat** đóng gói thông tin mô tả định dạng của dữ liệu dưới  dạng cặp key-value. Một vài key là bắt buộc và bạn phải set value cho nó.

Đặc biệt nữa là, hai giá trị width và height phải là số chẵn, nếu không sẽ không thể config được MediaCodec, vậy nếu kích thước màn hình cảu bạn là lẻ thì cộng thêm 1 vào width height chẳn hạn :v.
```java
private void prepareVideoEncoder(int width, int height) {
        MediaFormat format = MediaFormat.createVideoFormat(VIDEO_MIME_TYPE, width, height);
        int frameRate = 30; // 30 fps

        // Set những thuộc tính bắt buộc, MediaCodec có thể lỗi nếu những thuộc tính đó không được set.
        //Với đầu vào là Surface, phải set color format là COLOR_FormatSurface (còn gọi là AndroidOpaque.)
        format.setInteger(MediaFormat.KEY_COLOR_FORMAT,
            MediaCodecInfo.CodecCapabilities.COLOR_FormatSurface);
         //Bitrate cho chất lượng video
        format.setInteger(MediaFormat.KEY_BIT_RATE, 6000000); // 6Mbps
        //Frame rate cho số frame trên 1 giây
        format.setInteger(MediaFormat.KEY_FRAME_RATE, frameRate);
        //Capture rate tốc độ ghi theo frame/giây
        format.setInteger(MediaFormat.KEY_CAPTURE_RATE, frameRate);
        //Thời gian tính bảng micro giây cho việc repeat frame hiện tại nếu không có frame mới nào
        format.setInteger(MediaFormat.KEY_REPEAT_PREVIOUS_FRAME_AFTER, 1000000 / frameRate);
        format.setInteger(MediaFormat.KEY_CHANNEL_COUNT, 1);
        format.setInteger(MediaFormat.KEY_I_FRAME_INTERVAL, 1); // 1 seconds between I-frames

        //Tạo instance  MediaCodec và cấu hình nó, lấy Surface dùng để record  
        try {
            videoEncoder = MediaCodec.createEncoderByType(VIDEO_MIME_TYPE);
            videoEncoder.configure(format, null, null, MediaCodec.CONFIGURE_FLAG_ENCODE);
            inputSurface = videoEncoder.createInputSurface();
            videoEncoder.setCallback(encoderCallback);
            videoEncoder.start();
        } catch (IOException e) {
            releaseEncoders();
        }
    }
```
**Tạo MediaMuxer** quy định địa chỉ file đầu ra và định dạng của nó.
```java
 private void initMuxer() {
        try {
            File outputFile = new File(Environment.getExternalStoragePublicDirectory(
                Environment.DIRECTORY_DOWNLOADS) + "/video", "Screen-record-" +
                Long.toHexString(System.currentTimeMillis()) + ".mp4");
            if (!outputFile.getParentFile().exists()) {
                outputFile.getParentFile().mkdirs();
            }
            mediaMuxer = new MediaMuxer(outputFile.getCanonicalPath(), MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4);
        } catch (IOException ioe) {
            throw new RuntimeException("MediaMuxer creation failed", ioe);
        }
    }
```

**Tạo Virtual Displays** màn hình ảo có thể được sử dụng để ghi lại màn hình hoặc gửi qua mạng.
```java
private void initVirtualDisplay(DisplayMetrics metrics) {
        mediaProjection.createVirtualDisplay("Recording Display", screenPoint.x,
            screenPoint.y, metrics.densityDpi, DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR/* flags */, inputSurface,
            null /* callback */, null /* handler */);
    }
```
**Tạo MediaCodec.Callback** việc endcode và ghi video sẽ được thực hiện trong các phương thức của Callback này
```java
private void initCallback() {
        encoderCallback = new MediaCodec.Callback() {
            @Override
            public void onInputBufferAvailable(@NonNull MediaCodec codec, int index) {
                Log.d("-----", "Input Buffer Avail");
            }

            @Override
            public void onOutputBufferAvailable(@NonNull MediaCodec codec, int index, @NonNull MediaCodec.BufferInfo info) {
                Log.d("-----", "onOutputBufferAvailable: " + index);
                ByteBuffer encodedData = videoEncoder.getOutputBuffer(index);
                if (encodedData == null) {
                    throw new RuntimeException("couldn't fetch buffer at index " + index);
                }

                if ((info.flags & MediaCodec.BUFFER_FLAG_CODEC_CONFIG) != 0) {
                    info.size = 0;
                }

                if (info.size != 0) {
                    if (muxerStarted) {
                        encodedData.position(info.offset);
                        encodedData.limit(info.offset + info.size);
                        mediaMuxer.writeSampleData(trackIndex, encodedData, info);
                    }
                }

                videoEncoder.releaseOutputBuffer(index, false);
            }

            @Override
            public void onError(@NonNull MediaCodec codec, @NonNull MediaCodec.CodecException e) {
                Log.e("-----", "MediaCodec " + codec.getName() + " onError:", e);
            }

            @Override
            public void onOutputFormatChanged(@NonNull MediaCodec codec, @NonNull MediaFormat format) {
                Log.d("-----", "Output Format changed");
                if (trackIndex >= 0) {
                    throw new RuntimeException("format changed twice");
                }
                trackIndex = mediaMuxer.addTrack(videoEncoder.getOutputFormat());
                if (!muxerStarted && trackIndex >= 0) {
                    mediaMuxer.start();
                    muxerStarted = true;
                }
            }
        };
    }
```

**Dừng record**
```java
public void releaseEncoders() {
        if (mediaMuxer != null) {
            if (muxerStarted) {
                mediaMuxer.stop();
            }
            mediaMuxer.release();
            mediaMuxer = null;
            muxerStarted = false;
        }
        if (videoEncoder != null) {
            videoEncoder.stop();
            videoEncoder.release();
            videoEncoder = null;
        }
        if (inputSurface != null) {
            inputSurface.release();
            inputSurface = null;
        }
        if (mediaProjection != null) {
            mediaProjection.stop();
            mediaProjection = null;
        }
        trackIndex = -1;
    }
```
#### Gọi các phương thức ở Activity
```java
private static final int PERMISSION_CODE = 218;
private static final int RECORD_REQUEST_CODE = 101;
 
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        findViewById(R.id.button_start).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                recordHelper.requestRecord(RECORD_REQUEST_CODE);
            }
        });
        findViewById(R.id.button_end).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                recordHelper.releaseEncoders();
            }
        });

        recordHelper = new RecordHelper(this);

        if (!hasPermission(permissions)) {
            requestPermission(permissions);
        }
    }
    
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if (requestCode == RECORD_REQUEST_CODE && resultCode == RESULT_OK && data != null) {
            recordHelper.startRecord(data, resultCode);
        }
    }
```

### Kết quả
https://drive.google.com/open?id=1--R8maSLVfSeYfZQc8ZmIFbYKGBsHQq8

#### Tài liệu tham khảo 
https://github.com/google/grafika/blob/master/app/src/main/java/com/android/grafika/ScreenRecordActivity.java