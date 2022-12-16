Xin chào các bạn !

Đợt dịch vừa rồi nghỉ không lương ở nhà, chèo queo như một con mèo. May sao có anh chàng người Đức kia assign cho mình 1 project khá thú vị. Đó là 1 ứng dụng đại loại như là eMarket, tức là anh ấy yêu cầu có 3 roles
- Client : Khách hàng, vào order sản phẩm
- Seller : Người bán, được phép đăng bán sản phẩm và xử lý order. Khi order xử lý xong thì có đơn trên hệ thống
- Shipper: Vào hệ thống xem có đơn nào hợp lý thì pick đơn đó đi ship kiếm tiền
Nghe qua thì cũng okay, nhưng anh đó note vs mình là phải đặt riêng ra các database trên các Firebase project riêng lẻ, không được tập trung.
Ta không đi sâu vào vì sao anh ta muốn thế, cá nhân mình nghĩ là anh ấy muốn quản lý riêng phần thông tin, không muốn gom tất cả trứng vào 1 chỗ, tạm vậy đi.

Trước giờ, mình toàn làm kiểu multiple app trong 1 Firebase project, dùng chung 1 database chứ chưa từng làm kiểu như anh này nói, nên mình rất hứng thú để làm vụ này. Và sau vài chục phút mày mò và thử nghiệm thì mình đã dựng lên được base project hoạt động theo ý anh ấy, với đúng yêu cầu là các database nằm riêng lẻ. Vậy nên, trong sự hân hoan đó mình biên ngay 1 bài hướng dẫn, để sau này lỡ có gặp lại trường hợp trên thì mình còn biết cách xử lý, và mạo muội chia sẻ cho các bạn cùng nghiên cứu và phát triển các cách hay hơn nhé.

Okay, đầu tiên, chúng ta tạo mới các dự án Firebase riêng lẻ, việc tạo mới dự án Firebase mình xin phép lược qua, vì nó chỉ là mấy cái click chuột và đặt tên thôi

Rồi, giả xử mình tạo ra 3 dự án Firebase như sau:
*1. EDMTDevClient
2. EDMTDevSeller
3. EDMTDevServer*

Tiếp theo, trong dự án Android, mình sẽ tạo một class mới, theo design pattern Singleton như sau:

```
public class EDMTDevClientConfig {
    private static FirebaseApp instance;

    public static FirebaseApp getInstance(Context context) {
        if (instance == null)
            instance = EDMTDevClientConnector(context);
        return instance;
    }


    public static FirebaseApp EDMTDevClientConnector(Context context) {
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setProjectId("Your Firebase Project Id")
                .setApplicationId("Your Firebase Project Application Id")
                .setApiKey("Your Firebase API key")
                .setDatabaseUrl("Your Firebase Database Url")
                .build();
        return FirebaseApp.initializeApp(context, options, "client");
    }
}

```
Class trên mình khai báo một instance là kiểu FirebaseApp, tức là trả về 1 FirebaseApp object đã được init theo thông tin FirebaseOptions đã cấu hình ở trên.
Thông tin cấu hình gồm những gì :
> 1. Firebase Project Id 
> 2. Firebase Project Application Id
> 3. Firebase API key
> 4. Firebase Database Url
P/s: Ở đây mình sử dụng Firebase Database Realtime nhé, nếu bạn nào hứng thú với vấn đề này nhưng trên Cloud FireStore thì inbox mình biên thêm 1 phiên bản cho Cloud FireStore. Mà mình nghĩ nó giống nhau thôi hehe
Rồi quay lại bài viết nào, 4 thông tin trên lấy ở đâu, xin thưa là ở ngay trong Firebase. Mình sẽ show cho các bạn ngay đây:

Vào **Firebase Console** , chọn **Project Setting - có hình bánh răng cưa ở góc trái đó** và các bạn sẽ thấy ảnh sau
![](https://images.viblo.asia/e2caef8c-de1f-49a8-aee4-9fe830823b3c.PNG)


Ở đây các bạn đã có đc (1) Firebase Project Id và (3) Firebase API key rồi. (phần mình che đi bằng màu đỏ là thông tin đó, nhưng nhạy cảm quá nên che)

Tiếp tục, quay lại **Firebase Console** và chọn **Project Overview**, chọn ứng dụng Android (nếu chưa có thì tạo mới) và copy App ID trong thông tin ứng dụng đó
![](https://images.viblo.asia/f7481877-df01-49c0-8116-95276f715081.PNG)
Vậy là bạn đã có thông tin số (2) Project Application Id

Cuối cùng là Firebase Database Url, các bạn vào **Firebase Console** , menu bên trái chọn **Realtime Database** và các bạn sẽ thấy 
![](https://images.viblo.asia/f79264fd-0400-47ab-9a35-d8a7d8a334bf.PNG)
Phần đc che đi màu xanh đó

Và thế là các bạn đã tạo xong 1 FirebaseApp và init theo thông tin trên, vậy để sử dụng thì các bạn nhớ config lại Rules cho Firebase nhé, có bao nhiêu Reference thì config bấy nhiêu Rules
Nguyên tắc là : Ref nào share dùng chung giữa các app thì để READ / WRITE là auth != null. Ref nào chỉ cho đọc thì WRITE set False.

Sau đó, trong code Android, muốn sử dụng Firebase thì các bạn gọi như sau

# a. Với Firebase Auth:
`FirebaseAuth firebaseAuth = FirebaseAuth.getInstance(EDMTDevClientConfig.getInstance(this));`

# b. Với Firebase Database:
```
 DatabaseReference userRef = FirebaseDatabase.getInstance(EDMTDevClientConfig.getInstance(this))
                .getReference("Users")
```
# c. Với Firebase Storage:
Với ông nhõi này thì hơi khác một tí, các bạn config như sau:
```
FirebaseStorage storage = FirebaseStorage.getInstance(EDMTDevClientConfig.getInstance(this));
StorageReference storageReference= storage.getReferenceFromUrl("Your Storage Url");
```
Storage Url lấy ở đâu ? Các bạn vào **Firebase Console**, menu bên trái chọn **Storage** và lấy ở đây
![](https://images.viblo.asia/5509b194-3faa-47c6-9292-034291303018.PNG)
Đấy, chỗ bị che đấy, có cái dây xích các bạn thấy ko ? Click vào đó nó sẽ copy url vào cho các bạn !

Okay ! Với config kia xong, các bạn có thể sử dụng Firebase project của Client cho các ứng dụng khác kết nối, chỉ việc init theo thông tin trên
Tương tự, các bạn hoàn toàn có thể làm lại những bước trên để tạo ra **EDMTDevSellerConfig** và **EDMTDevShipperConfig** để sử dụng chéo với nhau.

Bài viết của mình đến đây là hết rồi, nếu các bạn thấy nó thú vị thì đừng quên thả "lai" và "sụp rai" nhé :D 
Cảm ơn các bạn !