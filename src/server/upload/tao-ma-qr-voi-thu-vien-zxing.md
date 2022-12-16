Hi,
Lần trước mình đã giới thiệu đến các bạn cách đọc mã QR sử dụng thư viện [barcodescanner](https://viblo.asia/p/doc-qrcodebarcode-voi-thu-vien-barcodescanner-gDVK2kBnZLj)
Hôm nay mình giới thiệu cách để tạo ra 1 ảnh png là mã QR sử dụng thư viện zxing.

Bản chất nội dung encode của 1 ảnh QR là 1 chuỗi thông thường. Tùy theo chuỗi đó có cấu trúc như thế nào sẽ quy định ý nghĩa thông tin trong đó, ví dụ:
Email là 1 chuỗi cấu trúc như sau:
```
mailto:abc@framgia.com?subject=tieudecuaemail&body=noidung
```
WIFI có cấu trúc :
```
WIFI:S:ssid_name;P:password;T:mã hóa;H:true nếu mạng ẩn
```

Khi QR scanner đọc ra chuỗi nội dung và tùy theo cấu trúc trên để biết được hành động cần thiết như gửi email, kết nối wifi.

Vậy giờ bạn muốn tạo ảnh QR để chia sẻ 1 nội dung nào đó hãy tạo chuỗi theo cấu trúc tương ứng sau đó sẽ tạo QR từ chuỗi đó.

Bước 1: Thêm dependency thư viện zxing
```
  implementation 'com.google.zxing:core:3.3.2'
```

Bước 2: Tạo 1 class QRGenerator và thêm method BitMatrix encodeBitMatrix(), đây chính là method encode chuỗi nội dung của chúng ta thành mã QR tuy nhiên BitMatrix chỉ là ma trận 2D true/false chưa thể nhìn được bằng mắt

```
public BitMatrix encodeBitMatrix(String content, int width, int height){
            String encoding = guessAppropriateEncoding(content);
            if (encoding != null) {
                hints = new EnumMap<>(EncodeHintType.class);
                hints.put(EncodeHintType.CHARACTER_SET, encoding);
                hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
        }
         Writer qrWriter = new QRCodeWriter();
         BitMatrix result = qrWriter.encode(content, BarcodeFormat.QR_CODE, width, height, hints);
         return result;
}
```

**content** là nội dung encode trong QR
**width** kích thước MitMatrix mong muốn
**height** kích thước MitMatrix mong muốn

Bước 3: Chuyển kết quả BitMatrix sang dạng Bitmap để có thể nhìn được hoặc lưu lại vào bộ nhớ dưới dạng ảnh
Vì BitMatrix chỉ là ma trận 2D true/false chúng ta cần ánh xạ các phần tử đó sang Bitmap để hiển thị.

```
    public Bitmap getBitmapFromBitMatrix(BitMatrix result, int bitmapW, int bitmapH, int padding, int backgroundColor, int dataColor){
        int width = result.getWidth();
        int height = result.getHeight();
        int pixelSize = bitmapW / width;
        if (pixelSize > (bitmapH / height)) {
            pixelSize = bitmapH / height;
        }
        if (pixelSize == 0) {
            pixelSize = 1;
        }
        bitmapW = pixelSize * width;
        bitmapH = pixelSize * height;
        int[] pixels = new int[bitmapW * bitmapH];
        for (int y = 0; y < height; y++) {
            int offset = y * bitmapW * pixelSize;

            for (int pixelSizeH = 0; pixelSizeH < pixelSize; pixelSizeH++, offset += bitmapW) {
                for (int x = 0; x < width; x++) {
                    int color = result.get(x, y) ? dataColor : backgroundColor;
                    for (int pixelSizeWidth = 0; pixelSizeWidth < pixelSize; pixelSizeWidth++) {
                        pixels[offset + x * pixelSize + pixelSizeWidth] = color;
                    }
                }
            }
        }

        Bitmap bitmap = Bitmap.createBitmap(bitmapW, bitmapH, Bitmap.Config.ARGB_8888);
        bitmap.setPixels(pixels, 0, bitmapW, 0, 0, bitmapW, bitmapH);

        int outW = bitmap.getWidth() + padding * 2;
        int outH = bitmap.getHeight() + padding * 2;
        Bitmap outbitmap = Bitmap.createBitmap(outW, outH, Bitmap.Config.ARGB_8888);
        outbitmap.eraseColor(backgroundColor);
        Canvas canvas = new Canvas(outbitmap);
        canvas.drawBitmap(bitmap, padding, padding, null);
        return outbitmap;
    }
```

Kết quả thu được là bitmap mã QR. bạn có thể share hoặc lưu lại vào bộ nhớ.