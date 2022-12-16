Như tiêu đề mà tôi đã đề cập phía trên. Nội dung bài viết này tôi sẽ hướng dẫn mọi người cách lưu trữ 1 token hay có thể là 1 key mà chúng ta không muốn người khác thấy được ngay cả khi app của chúng ta bị decompile. Trước khi đến với chi tiết tôi xin phép được trích dẫn 1 câu như sau:

> Absolute security does not exist. Security is a set of measures, being piled up and combined, trying to slow down the inevitable.

Nôm na là "Sự tuyệt đối trong bảo mật không tồn tại. Bảo mật là tập hợp các biện pháp được kết hợp lại với nhau nhằm làm chậm những thứ chắc chắn xảy ra không mong muốn".

Ai đã từng làm về Android thì chắc chắn rằng đều biết đến web service. Ứng dụng Android muốn có dữ liệu online thì phải giao tiếp và trao đổi dữ liệu với web service. Dữ liệu trao đổi giữa client và web service có thể chứa những thông tin nhạy cảm, và làm thay đổi dữ liệu đang lưu trữ ở máy chủ. Cần thiết phải thiết lập các phương thức bảo mật để tránh khiến kẻ xấu sử dụng giao tiếp này thực hiện nhưng mưu đồ xấu.

Phương pháp đầu tiên thường thấy ở đây đó là sử dụng kết nối [SSL](http://info.ssl.com/article.aspx?id=10241) (Secure Sockets Layer) giữa client và server. Nhưng hãy xem lại trích dẫn ban đầu của tôi, ừ thì nó có bảo mật thật đó nhưng không thể không bị hack và cũng chẳng có gì là tuyệt đối ở đây. Tại sao tôi lại nói như vậy hãy cùng tôi phân tích nhé.

Khi chúng ta sử dụng kết nối SSL (giống như bạn đang nhìn thấy 1 ổ khóa trên trình duyệt) nó cho biết bạn và server đang kết nối với nhau bằng 1 sự mã hóa. Về mặt lý thuyết thì không gì có thể truy cập đc vào những thông tin này.

Nhưng như tôi đã nói ngay từ đầu không có bảo mật nào là tuyệt đối cả. SSL vần có thể bị xâm phạm. SSL có thể bị làm giả , điển hình là cuộc tấn công *Man-in-the-Middle* . Như vậy cần làm 1 điều gì đó để tăng tính bảo mật lên phải không nào.

Biện pháp tiếp theo này tôi nghĩ nhiều người cũng không còn xa lạ với nó nữa. Đó là sử dụng *Authentication Token* hoặc *API key*  để giao tiếp giữa client và server nhằm xác thực người dùng. Sau khi client gửi yêu cầu. Back end của chúng ta sẽ nhận yêu cầu và kiểm tra xem token hay api key client gửi lên có hợp lệ hay không , nếu hợp lệ thì Backend sẽ cho client tiếp tục thực hiện yêu cầu nếu không thì tùy vào luật và ta đưa ra cho vấn đề này ví dụ như ta sẽ lưu các IP lại, kiểm tra tần suất gọi đến không hợp lệ để có thể cân nhắc việc block ip đó.

Cùng xem cấu trúc của 1 API key sẽ như thế nào. API key sẽ được gửi lên server mỗi khi 1 api được gọi . Dưới đây là 1 ví dụ: 

```
private final static String API_KEY = “67a5af7f89ah3katf7m20fdj202”
```
Bạn lưu chuỗi kí tự này dưới app và gửi nó lên nhằm xác thực mình là hợp lệ, điều đó hoàn toàn bình thường nhưng một vấn đề rất nghiêm trọng ở đây là nếu bạn lưu trữ một cách thông thường như trên thì sau khi decomplie app chắc chắn bạn sẽ bị lộ key này.

Ngoài API key ra thì ta còn 1 phương pháp khác đó là xác thực thông qua Authenticate Token , hiểu đơn giản là sau khi login thì server sẽ trả về cho client 1 cặp token và refresh token. Token nhằm xác thực người dùng, Refresh token nhằm gen lại token sau khi token bị hết hạn. Biện pháp phổ biến chúng ta thường dùng để lưu trữ 2 chuỗi này thường sẽ là SharePreference. Dữ liệu ở SharePreference không hề an toàn khi mà các thiết bị Android thường bị root 1 cách dễ dàng.
 
 Bài toàn đặt ra lúc này là làm sao để lưu trữ API key hoặc token kia một cách bảo mật  là ta đã nâng mức độ bảo mật của giao tiếp client server lên 1 mức rồi đó.
Đối với việc lưu trữ 1 chuỗi được sinh ra trong quá trình app chạy như token thì tôi có đề xuất mọi người dùng Android Key Store. Được tối đề cập tại bài viết này [Cách sử dụng Android Keystore để lưu trữ mật khẩu và các thông tin nhạy cảm trong một ứng dụng Android](https://viblo.asia/p/cach-su-dung-android-keystore-de-luu-tru-mat-khau-va-cac-thong-tin-nhay-cam-trong-mot-ung-dung-android-1VgZv3a9lAw).  Con đối với 1 hằng số có sẵn thì cùng tôi tìm hiểu phương pháp sau: 
 
### Native Development Kit (NDK)
Hãy cùng xem 2 hàm dưới đây
```
    private static byte[] encrypt(byte[] raw, byte[] clear) throws Exception {
        SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
        byte[] encrypted = cipher.doFinal(clear);
        return encrypted;
    }

    private static byte[] decrypt(byte[] raw, byte[] encrypted) throws Exception {
        SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, skeySpec);
        byte[] decrypted = cipher.doFinal(encrypted);
        return decrypted;
    }
```
Không có gì đặc biệt nhỉ. 2 hàm trên sẽ dùng 1 key để mã hóa và giải mã. Chúng ta dùng 2 hàm trên như sau:
```
ByteArrayOutputStream baos = new ByteArrayOutputStream();  
bm.compress(Bitmap.CompressFormat.PNG, 100, baos); 
byte[] b = baos.toByteArray();  

byte[] keyStart = "encryption key".getBytes();
KeyGenerator kgen = KeyGenerator.getInstance("AES");
SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
sr.setSeed(keyStart);
kgen.init(128, sr); 
SecretKey skey = kgen.generateKey();
byte[] key = skey.getEncoded();    

// encrypt
byte[] encryptedData = encrypt(key,b);
// decrypt
byte[] decryptedData = decrypt(key,encryptedData);

```

Một lớp bảo mật nữa được thêm vào, khi code bị xóa trộn do việc complile thì việc tìm kiếm String cũng không phải là dễ dàng. Nhưng không dễ chứ không phải là không tìm được. Theo như code phía trên thì khi lưu trữ 1 String thì vẫn có 1 chuỗi text thuần túy được khai báo trong java code. Giờ ta chỉ cần giấu nó đi sao cho trình decompile không tìm ra được nó nữa là tuyệt vời phải không nào.
Lúc đó hãy nghĩ ngay đến **NDK** . NDK cho phép ta truy cập vào mã C++ từ Android code. Điều tuyệt vời ở đây là dữ liệu lưu trong code C++ này sẽ không bị dịch ngược. Vậy tại sao ta lại không tận dụng nó để lưu API key của ta vào đây nhỉ. Đúng là như vậy đó hãy tạo 1 hàm bên C++ để trả về API key nhé:

```
Java_com_example_exampleApp_ExampleClass_getSecretKey( JNIEnv* env,
                                                  jobject thiz )
{
    return (*env)->NewStringUTF(env, "API key");
}
```

và gọi nó bên Java Code:

```
static {
        System.loadLibrary("library-name");
    }

public native String getSecretKey();
```

Khi decomplie ta sẽ không thấy hoặc rất rất khó để có thể tìm thấy hàm getSecretKey(). Như vậy coi như là đã thành công rồi nhé!

Tuy nhiên như đã nói ngay từ đầu rồi nhé. Bảo mật là không tuyệt đối NDK cũng vậy. Đối với những công cụ mạnh mẽ, tập hợp những  người có đủ khả năng và nguồn lực thì khả năng có thể truy cập dữ liệu của chúng ta tuy nhiên việc gây cực kì khó khăn cho việc truy cập dữ liệu trái phép cũng đã nâng cao tính bảo mật của hệ thống chúng ta nên rồi phải không?

Ngoài những biện pháp trên ta còn có thể áp dụng biện pháp dưới đây để tăng cường bảo mật cho hệ thống

### Sinh key realtime trên thiết bị
Với giải pháp này thiết bị của bạn sẽ không cần phải lưu trữ bất cứ key nào hết. Đây là 1 kỹ thuật khá cũ rồi được sử dụng cho các dịch như xác thực key từ xa.
1. Client biết function() trả về key
2. BackEnd biết function() thực thị dưới client
3. Client thực hiện function() và gửi nó đến server
4. Server xác thực và tiếp tục cho truy cập nếu hợp lệ

Có rất nhiều thủ thuật và kỹ thuật nhằm nâng cao tính bảo mật cả hệ thống. Tuy nhiên trong phạm vi bài viết này tôi chỉ đề cập 1 số ít trong số đó.
### Tổng kết
1. Sự tuyệt đối trong bảo mật không tồn tại
2. Kết hợp nhiều phương pháp bảo mật khác nhau thì sẽ tạo ra một hệ thống có mức bảo mật càng cao
3. Không lưu trữ String quan trọng trong code của bạn
4. Sử dụng NDK để lưu trữ những key quan trọng.

Qua bài viết này tôi mong rằng các bạn có thể có thêm kiến thức về bảo mật . Từ đó có thể áp dụng và nâng cao tính mật trong các dự án của các bạn. Hẹn gặp lại các bạn vào những bài viết khác.
Tham khảo [A follow-up on how to store tokens securely in Android](https://medium.com/google-developer-experts/a-follow-up-on-how-to-store-tokens-securely-in-android-e84ac5f15f17)