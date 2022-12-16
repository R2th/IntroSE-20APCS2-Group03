![](https://images.viblo.asia/13d8cfea-7600-484c-b49b-1cb0e8a60eaf.jpg)

Chào các bạn!
Năm nay đã là năm 2019, hẳn với những bạn là tín đồ shopping sẽ thấy được công nghệ đã áp dụng vào trong việc thanh toán nhanh và tiện lợi tới mức nào!

Từ việc các bạn không còn cần mang theo tiền mặt, không cần mang theo thẻ ATM, tới việc các bạn chỉ đơn giản đưa camera điện thoại về hướng 1 cái "hình với các chi tiết vô cùng rối mắt", thế là xong, việc thanh toán đã hoàn tất, và việc còn lại của chúng ta là chờ phố lên đèn và em lên đồ ^_^

Và cái "hình với các chi tiết vô cùng rối mắt" được gọi là QRCode.

### Vậy QR Code là gì?

*--- Trích dẫn Wikipedia ---*
> Mã QR (mã hai chiều), một mã ma trận (hay mã vạch hai chiều, mã phản hồi nhanh) được phát triển bởi công ty Denso Wave (Nhật Bản) vào năm 1994. Chữ "QR" xuất phát từ "Quick Response", trong tiếng Anh có nghĩa là đáp ứng nhanh, vì người tạo ra nó có ý định cho phép mã được giải mã ở tốc độ cao. Các mã QR được sử dụng phổ biến nhất ở Nhật Bản, Trung Quốc, và hiện là loại mã hai chiều thông dụng nhất ở Nhật Bản...... Chi tiết hơn chúng ta sẽ đọc trên wikipedia nhé ;)

### Hôm nay chúng ta sẽ làm gì với QR Code?

Vì QR Code có tính ứng dụng rất cao trong thực tế, vì vậy chúng ta có thể sử dụng nó vào nhiều mục đích khác nhau như: đánh dấu đồ vật, thanh toán, chống làm giả, check-in, hay chỉ đơn giản là lấy ra mật khẩu truy cập wifi ở một nơi công cộng nào đó!

Vậy chúng ta sẽ thử làm 1 cái App đọc các mã QR Code đó coi nó có thông tin gì nhé ;)

### Bước 1: Tạo project Unity.

![](https://images.viblo.asia/5c26a6a7-4531-4d56-939d-87cf5062e179.JPG)

### Bước 2: Download thư viện zxing.unity.dll và đưa vào dự án.

- Download thư viện zxing.unity.dll theo đường link sau:
    https://raw.githubusercontent.com/nenuadrian/qr-code-unity-3d-read-generate/master/zxing.unity.dll
    
- Tạo thư mục Plugins, sau đó copy file zxing.unity.dll vào trong thư mục Plugins vừa tạo.

### Bước 3: Tạo 1 file đặt tên là ReadQRCode.cs.
### Bước 4: Mở file ReadQRCode.cs ra và sửa lại với nội dung như sau.

- Cấu hình và mở webcam của thiết bị:

```
private WebCamTexture webCamTexture;
private Rect screenRect;
void Start() {
      screenRect = new Rect(0, 0, Screen.width, Screen.height);
      webCamTexture = new WebCamTexture();
      webCamTexture.requestedHeight = Screen.height;
      webCamTexture.requestedWidth = Screen.width;
      if (webCamTexture != null) {
            webCamTexture.Play();
      }
}
```

- Vẽ một camera trên màn hình:

```
GUI.DrawTexture (screenRect, webCamTexture, ScaleMode.ScaleToFit);
```

- Giải mã khung hình hiện tại trên màn hình:

```
IBarcodeReader barcodeReader = new BarcodeReader ();
// Giải mã khung hình hiện tại.
var result = barcodeReader.Decode(webCamTexture.GetPixels32(), webCamTexture.width , webCamTexture.height);
```

- Code đầy đủ của file ReadQRCode.cs như sau:

```
using System;
using UnityEngine;
using ZXing;

public class ReadQRCode : MonoBehaviour
{

    private WebCamTexture webCamTexture;
    private Rect screenRect;
    void Start()
    {
        screenRect = new Rect(0, 0, Screen.width, Screen.height);
        webCamTexture = new WebCamTexture();
        webCamTexture.requestedHeight = Screen.height;
        webCamTexture.requestedWidth = Screen.width;
        if (webCamTexture != null)
        {
            webCamTexture.Play();
        }
    }

    void OnGUI()
    {
        // Vẽ một camera trên màn hình
        GUI.DrawTexture(screenRect, webCamTexture, ScaleMode.ScaleToFit);
        // Đọc nội dung trên màn hình.
        try
        {
            IBarcodeReader barcodeReader = new BarcodeReader();
            // Giải mã khung hình hiện tại.
            var result = barcodeReader.Decode(webCamTexture.GetPixels32(), webCamTexture.width, webCamTexture.height);
            if (result != null)
            {
                Debug.Log("Dữ liệu giải mã được từ mã QR là: " +result.Text);
            }
        }
        catch (Exception ex) { Debug.LogWarning(ex.Message); }
    }
}

```

### Bước 5: Chạy và test thử.

- Lưu ý, nếu bạn sử dụng pc thì cần gắn thêm webcam vào để đảm bảo ứng dụng có thể có "mắt quét các hình ảnh QR Code". Nếu bạn sử dụng laptop thì dùng webcam của laptop là được nhé ;)

=> Như vậy với mỗi hình quét được bạn sẽ nhận được 1 đoạn mã, câu giới thiêu, link trang web, hoặc một điều gì đó bất kì mà người tạo mã muốn nhắn nhủ ;)

Rất thú vị đúng ko nào? giờ thì chúng ta có thể quét bất cứ cái mã QR Code nào để thấy được nội dung của mã QR Code đó, nhưng chú ý ko phải lúc nào bạn cũng hiểu được nội  dung của các mã đó, vì họ tạo ra nó để cho ứng dụng riêng của họ mà!

À đó, vậy thì giờ chúng ta lại đặt ra câu hỏi, làm sao để tạo ra 1 hình ảnh QR Code nhỉ?

OK, vậy triển luôn nhé ;)

### Bước 6: Tạo 1 file đặt tên là GenerateQRCode.cs
### Bước 7: Mở file GenerateQRCode.cs ra và sửa lại với nội dung như sau.

- Mã hóa nội dung của file QR Code muốn tạo ra:

```
private static Color32[] Encode(string textForEncoding, int width, int height) {
      var writer = new BarcodeWriter {
        Format = BarcodeFormat.QR_CODE,
        Options = new QrCodeEncodingOptions {
          Height = height,
          Width = width
        }
      };
      return writer.Write(textForEncoding);
}
```

- Tạo ra file ảnh sau khi mã hóa:

```
public Texture2D generateQR(string text) {
      var encoded = new Texture2D (256, 256);
      var color32 = Encode(text, encoded.width, encoded.height);
      encoded.SetPixels32(color32);
      encoded.Apply();
      return encoded;
    }
```

- Code đầy đủ của file GenerateQRCode.cs sẽ là:

```
using UnityEngine;
using ZXing;
using ZXing.QrCode;

public class GenerateQRCode : MonoBehaviour
{

    private static Color32[] Encode(string textForEncoding, int width, int height)
    {
        var writer = new BarcodeWriter
        {
            Format = BarcodeFormat.QR_CODE,
            Options = new QrCodeEncodingOptions
            {
                Height = height,
                Width = width
            }
        };
        return writer.Write(textForEncoding);
    }

    public Texture2D generateQR(string text)
    {
        var encoded = new Texture2D(256, 256);
        var color32 = Encode(text, encoded.width, encoded.height);
        encoded.SetPixels32(color32);
        encoded.Apply();
        return encoded;
    }

    void OnGUI()
    {
        Texture2D myQR = generateQR("DAO DINH CUONG");
        if (GUI.Button(new Rect(300, 300, 256, 256), myQR, GUIStyle.none)) { }
    }
}

```

### Bước 8: Chạy và test thử.

- Thay vì add script ReadQRCode.cs vào camera thì bạn add script GenerateQRCode.cs sau đó ấn play để thấy kết quả nhé ;)

=> như vậy là sau bài viết này chúng ta đã có 1 app có thể đọc được "bí mật" phía sau của các mã QR Code, và cũng có thể tự sinh ra những mã QR Code chứa "bí mật" của riêng chúng ta ;) Chúc các bạn có thể ứng dụng nó vào nhiều ý tưởng thú vị nhé ;)

Tài liệu tham khảo: https://archive.codeplex.com/?p=zxingnet