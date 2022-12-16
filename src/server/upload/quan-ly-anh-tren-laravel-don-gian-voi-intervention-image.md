## 1 Mở đầu
Để tạo chức năng quản lý ảnh trên Laravel, chúng ta sử dụng library Intervention Image.
Dưới đây, tôi xin giới thiệu các sử dụng Library này.
## 2 Nội dung
### 2.1 Điều kiện tiền đề
・Base image（Height 42px Width123px Backgroud White）. Kết hợp text và image đã upload.

・Image đã upload đã được resize để matching với base image

### 2.2 Chuẩn bị mẫu
・Kết hợp text vào chiều dọc

・Kết hợp text vào chiều ngang

・Chỉ kết hợp text

![](https://images.viblo.asia/6163b7ef-bea3-479a-89b6-33e31ed4f55e.png)


## Chuẩn bị
Trước tiên chúng ta sẽ instal library Intervention Image

Command :

```
    composer require intervention/image
```

※ Nếu Laravel version 5.4  trở xuống, sẽ không có Package Auto-Discovery, vì vậy chúng ta phải instal package bằng tay tại config/app.php

Khi thêm setting vào app.php↓

```app.php
'providers' => [
    Intervention\Image\ImageServiceProvider::class
]
```
 
```app.php
'aliases' => [
    'Image' => Intervention\Image\Facades\Image::class
]
```

※Symbolic link đã được gắn sẵn 


## 2 Code
Ngay lập tức có thể sử dụng library : Intervention Image

Xử lý cần thiết : 

１.Định nghĩa giá trị tọa độ của Logo・Text và Size

２.Load base image

３.Tạo tham số resize image và text

４.Chỉ kết hợp text

５.Kết hợp Text image theo chiều ngang. dọc

６.Xử lý theo yêu cầu từ phía Client

Việc xử lý ảnh sẽ xử lý tại : ImageDomain để ngăn việc controller bị cồng kềnh

### 2.１ Định nghĩa giá trị tọa độ của Logo・Text và Size
Trước tiên định nghĩa const để cho tọa độ, size phù hợp với Base image（Height 42px Width123px Backgroud White）

```ImageDomain.php
    
 //Tọa độ của Logo・Text
    
    const COORDINATES = [
        'logoCenterX' => 0,
        'logoCenterY' => 5,
        'logoLeftX' => 5,
        'logoLeftY' => 0,
        'textCenterX' => 61,
        'textCenterY' => 37,
        'textLeftX' => 77,
        'textLeftY' => 21,
        'textOnlyX' => 61,
        'textOnlyY' => 21,
    ];

    //Định nghĩa size logo sẽ thực hiện resize
    const RESIZE_LOGO_SIZE = [
        'widthLeft' => 27,
        'heightLeft' => 27,
        'widthCenter' => 37,
        'heightCenter' => 15,
    ];
 ```
    
### 2.2 Load base image
Save base image tại path xác định rồi sau đó chỉ việc, load call nó ra thôi nhé ! 
Đối với library Intervention Image, Có thể load image bằng hàm Image::make(＊＊＊);
Make - Intervention Image : Hỗ trợ rất nhiều định dạng 

```ImageDomain.php
   public static function common(): array
    {
        //Gọi Image default （White background）
        $whiteBackground = storage_path('app/public/sample/default.png');
        $default = Image::make($whiteBackground);
        //Định nghĩa path sẽ save image 
        $save_path = storage_path('app/public/sample/image.png');

        return [$default, $save_path];
    }
```


### 2.3 Tạo tham số resize image và text
Do sau này sẽ sử dụng lại nhiều lần, tại đây chúng ta sẽ tạo tham số resize
```
ImageDomain.php
   public static function resizedLogoText($request): array
    {
        //Resize logo image phía client đã upload
        $upload_image = $request->file('sample_image');
        $logoImage = Image::make($upload_image);
        //Thêm logo và Company name đã resize vào base image 
        $uploadClientName = $request->input('sample_text');

        return [$logoImage, $uploadClientName];
    }
```
 
### 2.4 Trường hợp chỉ kết hợp text 
Quá trình xử lý kết hợp sẽ thực hiện từ bước này.
Về text, sẽ tùy thuộc vào số lượng ký tự để thay đổi fontsize .

Tham số trong Intervention Image: 
file( )・・・Quyết định font sẽ sử dụng. Trong bài viết sử dụng font NotoSansJPを使用
size( )・・・Chỉ định fontsize　
align( )・・・Chỉ định căn chỉnh theo chiều ngang. Có 3 param : left, center, right
valign( )・・・Chỉ định căn chỉnh theo chiều dọc。Có 3 param : top, middle, bottom
save( )・・・Save

```ImageDomain.php
   public static function onlyText($request)
    {
        [$default, $save_path] = self::common($request);

        $uploadClientName = $request->input('only_text');
        $lengthText = mb_strlen($uploadClientName, "UTF-8");
        $size = floor(100 / $lengthText);
        if ($size < 8){
            $size = 8;
        }elseif ($size > 25){
            $size = 25;
        }
        $onlyText = $default->text($uploadClientName, self::COORDINATES['textOnlyX'], self::COORDINATES['textOnlyY'], function($font) use($size){
            $font->file(base_path('public/font/NotoSansJP-Black.otf'));
            $font->size($size);
            $font->color('#333333');
            $font->align('center');
            $font->valign('middle');
        });
        $imageData = $onlyText->save($save_path);

        return $imageData;
    }
```
    
    
### 2.5  Kết hợp Text image theo chiều ngang, dọc
Cách xử lý không khác nhiều so với pattern số 2.4.
Sử dụng các hàm đã khai báo ở trên để thực hiện xử lý resize, kết hợp image + text

Các hàm trong Intervention Image sẽ được sử dụng :
resize( )・・・Resize image. Resize(Width, Height)
insert( )・・・Insert image. Insert(Image muốn chèn, vị trí, trục ngang, trục dọc)

```ImageDomain.php
   public static function imageVertical($request)
    {
        list($default, $save_path) = self::common();
        list($logoImage, $uploadClientName) = self::resizedLogoText($request);

        //Resize image đã chọn
        $resizedCenter = $logoImage->resize(self::RESIZE_LOGO_SIZE['widthCenter'], self::RESIZE_LOGO_SIZE['heightCenter']);
        //Kết hợp image đã resize trên  whitebackground
        $vertical = $default->insert($resizedCenter, 'top', self::COORDINATES['logoCenterX'], self::COORDINATES['logoCenterY']);
        $vertical->text($uploadClientName, self::COORDINATES['textCenterX'], self::COORDINATES['textCenterY'], function($font) {
            $font->file(storage_path('app/public/font/NotoSansJP-Black.otf'));
            $font->size(8);
            $font->color('#333333');
            $font->align('center');
            $font->valign('bottom');
        });
        $imageData = $vertical->save($save_path);

        return $imageData;
    }
```

### 2.6 Phân chia xử lý 
Lần này, về xử lý hiển thị không được ghi trong bài viết, chúng ta có thể phán đoán và xử lý theo request được gửi lên từ phía Client.

```ImageController.php
   public function update(Request $request)
    {
         if ($request->filled('only_text') === true) {
            $imageData = ImageDomain::onlyText($request);
        } else {
            if ($request->boolean('image') === true) {
                $imageData = ImageDomain::imageVertical($request);
            } else {
                $imageData = ImageDomain::imageSide($request);
            }
        }
```

Nguồn : https://qiita.com/lvn-nishimura/items/9e5f9f731b89c9a03928