# Intro 
Chắc hẳn mọi người cũng đã nghe qua đến cái tên Augmented Reality hay mình thường hay gọi tắ là AR. Về AR thì mình seach thì thấy nó xuất hiện cũng đã khá lâu rồi cũng đã được ứng dụng vào thực tế cũng không phải là ít. Nó sử dụng Camera, các cảm biến trên thiết bị để có thể biểu diễn object. Các bạn cũng có thể đọc thêm bài viết [Build ứng dụng Augmented Reality đơn giản với OpenCV [Phần 1] ](https://viblo.asia/p/build-ung-dung-augmented-reality-don-gian-voi-opencv-phan-1-RnB5pWaGlPG), cũng có mô tả về cách map 3D Object trong AR. 

![](https://images.viblo.asia/1eb3eb25-1c9b-476c-bd90-bc9db6519667.png)
 
Bài viết này mình cũng sẽ làm thử App sử dụng AR trong thiết bị mobile Android. Trên chính trang chủ của Android Developer cũng có phần hướng dẫn cơ bản, có giải thích từ việc config camera đến việc create Ar rồi Debug như thế nào, mọi người xem chi tiết trong link sau [Quickstart for Android](https://developers.google.com/ar/develop/java/quickstart), hoặc cũng có thể xem thêm việc build trên các nền tảng khác như IOS, Unity,...tại[ link này](https://developers.google.com/ar).Thậm chí có cả [Codalab](https://codelabs.developers.google.com/codelabs/augimg-intro#0) do chính Google hướng dẫn luôn. Ngoài trên mobile thì AR cũng được ứng dụng như kính AR, xe tự lái, cả trong quân sự nữa (mô phỏng chiến trường),...Ứng dụng của thằng này là vô cùng lớn.
# App 
Để có thể lấy ảnh mẫu làm ví dụ thì mình vào trang [Poly](https://poly.google.com/) của Google để tải một số ảnh 3D để làm. Hoặc các bạn có thể tải [Blender](https://www.blender.org/) để tự mình thiết kế cho riêng mình.
 
![](https://images.viblo.asia/ef48acc6-e96a-4584-a10a-9e7422519e21.png)

Trên Android thì việc đầu tiên là ta phải import Dependencies, để có thể sử dụng AR được.

```java
implementation "com.google.ar.sceneform.ux:sceneform-ux:1.10.0"
```
Tiếp theo là khai báo quyền truy cập camera trong AndroidManifest.xml:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera.ar" android:required="true"/>
```
Cuối cùng là trong thẻ *<application>* thêm thẻ meta-data sau :
```xml
<meta-data android:name="com.google.ar.core" android:value="required" />
```
Xong, vậy là ta đã setup các thứ cần thiết. Tiếp theo sau đây sẽ là phần chính AR.
Như bên trên mình sẽ vào trang Poly để down một vài object về làm thử. Ta sẽ tạo folder asset để chứa object. Trong activity_main.xml  mình chỉ dùng 1 fragment thôi .
   
  ```xml
     <fragment
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/arFragment"
        android:name="com.google.ar.sceneform.ux.ArFragment"/>
   ```
    
   Trong MainActivity.java ta sẽ khai báo các thuộc tính và define AR đơn giản :
    
    
   ```java
        private ArFragment arFragment;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        arFragment = (ArFragment) getSupportFragmentManager().findFragmentById(R.id.arFragment);

        arFragment.setOnTapArPlaneListener((hitResult, plane, motionEvent) -> {
            Anchor anchor = hitResult.createAnchor();

            ModelRenderable.builder()
                    .setSource(this, Uri.parse("TocoToucan.sfb")) # đường link thư mục đến asset.
                    .build()
                    .thenAccept(modelRenderable -> addModelToScene(anchor, modelRenderable));
        });
    }

    private void addModelToScene(Anchor anchor, ModelRenderable modelRenderable) {
        AnchorNode node = new AnchorNode(anchor);
        TransformableNode transformableNode = new TransformableNode(arFragment.getTransformationSystem()); 
        transformableNode.setParent(node);
        transformableNode.setRenderable(modelRenderable);

        arFragment.getArSceneView().getScene().addChild(node);
        transformableNode.select();
    } 
   ```
    
  Mọi người hãy run thử và xem kết quả nhận được ntn.
    
 Nếu như ta muốn nhiều object hơn thì như thế nào. Cách đơn giản là ta sẽ tạo một List chứa các image (có thể đưa vào asset hoặc trong drawable). Còn các lệnh khai báo khác thì vẫn giữ nguyên như thế.
   ```java
        View view = viewRenderable.getView();
        ViewPager pager = view.findViewById(R.id.viewPager);

        List<Integer> images = new ArrayList<>();
        images.add(R.drawable.iu);
        images.add(R.drawable.im2);
        images.add(R.drawable.im3);
        images.add(R.drawable.im4);
        images.add(R.drawable.im5);

        ArAdapter adapter = new ArAdapter(images);
        pager.setAdapter(adapter);
   ```
 
Do tạo một List các image ta sẽ tạo class Adapter để quản lý việc này.
    
    
```java
   private class ArAdapter extends PagerAdapter {

        List<Integer> images;

        public ArAdapter(List<Integer> images){
            this.images = images;
        }

        @NonNull
        @Override
        public Object instantiateItem(@NonNull ViewGroup container, int position) {
            View view = getLayoutInflater().inflate(R.layout.image_item, container, false);
            ImageView imageView = view.findViewById(R.id.imageView);
            imageView.setImageResource(images.get(position));

            container.addView(view);

            return view;
        }

        @Override
        public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
            container.removeView((View) object);
        }

        @Override
        public int getCount() {
            return images.size();
        }

        @Override
        public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
            return view == object;
        }
    }
 ```
    
Done!!!
> Chú ý là khi build trên máy thật thì nó sẽ yêu cầu install một app để hỗ trợ cho việc build AR :smiley::smiley:
    
  Ngoài ra thì m cũng có ý tưởng là sử dụng AR cho việc mua sắm trang sức như đồng hồ ( sử dụng model AI để detec chỗ cánh tay đeo đồng hồ, rồi map đồng hồ mà mình chọn), hay sử dụng AR để thử quần áo chẳng hạn. Và rất nhiều ứng dụng tiềm năng khác mà có thể dùng AR. Dưới đây mình xin giới thiệu một vài App như thế (sản phẩm có trên Store).
# Example Other 
 ## 1. App InkHunter  
Trong quá trình tìm hiểu các app đã sử dụng AR thì mình tìm được thằng này. Về ý tưởng của app là sử dụng AR cho việc thử hình Xăm (Tatoo), với hình xăm có cung cấp sẵn hoặc cũng có thể tự mình design (quá xịn sò). Tuy nhiên là hiện tại App chỉ đang hỗ trợ HĐH IOS từ 8.0 trở lên. Và cũng chỉ cung cấp một vài mẫu để mình thử, có những cái (đệp ) mình sẽ phải trả phí để mua nó. Mọi người cũng có thể down sử dụng tại [link](https://apps.apple.com/vn/app/inkhunter-try-tattoo-designs/id991558368#?platform=ipad) sau.

![](https://images.viblo.asia/d419a0e1-9cdf-40a8-8235-45b49a0b99d6.png)
## 2. App Furniture IKEA Place
Tiếp theo là một sản phẩm ứng dụng khác trong lĩnh vực nội thất Agmenty AR Furniture. Trong app ta sẽ chọn các đồ vật, nội thất mình thích, sử dụng AR đưa Camera vào vị trí trong căn nhà mà mình dự định đặt đồ vật đó, nó sẽ giúp ta hình dung được phần nào về kết quả nếu ta đặt nó ở đó. Hiện app có trên cả Android và IOS.

{@youtube: https://youtu.be/ca3Ru8H2WBg}

## 3. App YouCam Makeup
Một siêu phẩm trong lĩnh vực làm đẹp khác là [YouCam Makeup](https://www.perfectcorp.com/consumer/apps/ymk). Vào trang chủ của App đã thấy thích rồi. Nó cũng cho ta thử các loại tran điểm như son, kẻ mắt, lông mày, da, phấn nền, loại bỏ mụn, đốm mắt, thâm,.....Hiện app có trên cả Android và IOS 12 trở lên.
{@youtube: https://youtu.be/_SL113GHLz0}

## 4. App Pokemon Go
Nói về AR thì không thể thiếu Pokemon Go được, một trò chơi nổi tiếng trên thế giới (mặc dù bị nghi ngờ lấy dữ liệu vị trí người dùng và một số nước, khu vực, đơn vị cấm dùng). Trò chơi cho phép người dùng trao đổi, săn Pokemon bằng định vị GPS và Camera của thiết bị. App Game cũng đã đạt được hàng chục triệu lượt tải. 

![](https://images.viblo.asia/6db45b38-e2a9-4f6c-9950-59907caa9a4a.jpeg)

Và còn rất nhiều ứng dụng trong thực tế có sử dụng AR mọi người có thể tìm thêm. Nếu có ý tưởng gì hay thì hãy chia sẻ biết đâu sẽ làm ra sản phẩm được nhiều người đón nhận.
# Refer
1. https://creativetech.blog/home/augmented-faces-makeup
2. https://viblo.asia/p/build-ung-dung-augmented-reality-don-gian-voi-opencv-phan-1-RnB5pWaGlPG
3. https://medium.com/deemaze-software/augmented-reality-a-simple-technical-introduction-83d5e77206b9
4. https://medium.com/@OmniVirt/guide-to-augmented-reality-ar-app-development-e85a037c4d19
5. https://code.tutsplus.com/tutorials/code-your-first-augmented-reality-app-with-arkit--cms-29705
6. https://www.udemy.com/topic/arkit/