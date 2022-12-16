Các ứng dụng ngày nay ngày càng trú trọng vào việc quản lý thông tin riêng tư của người dùng. Độ tin cậy của ứng dụng cũng phụ  thuộc rất lớn vào yếu tố này. Android đã cho ra đời nhiều API mạnh mẽ giúp đảm bảo an toàn cho thông tin riêng tư của người dùng, tránh sự xâm hại trái phép từ bên ngoài.

Bài viết này sẽ cung cấp cho các bạn về cách hệ thống mã hóa và lưu trữ dữ liệu nhạy cảm thông qua mật mã do người dùng cung cấp.

# 1. Những phần cơ bản
Câu hỏi đầu tiên cần suy nghĩ là bạn cần lưu trữ bao nhiêu dữ liệu. Một cách tiếp cận tốt là tránh lưu trữ dữ liệu riêng tư nếu bạn không thực sự phải làm vậy.

Đối với dữ liệu mà bạn phải lưu trữ, Android sẵn sàng trợ giúp. Kể từ 6.0 Marshmallow, mặc định mã hóa toàn bộ dữ liệu trên lưu trữ trong bộ nhớ, cho các thiết bị có khả năng. Các tệp và SharedPreferences được lưu bởi ứng dụng sẽ tự động được đặt với hằng số MODE_PRIVATE. Điều này có nghĩa là dữ liệu chỉ có thể được truy cập bởi ứng dụng của riêng bạn.

Đó là một ý tưởng tốt để bảo vệ dữ liệu của người dùng. Tuy nhiên các lập trình viên có thể thay đổi tùy chọn này tùy vào mục đích của họ.
```java
SharedPreferences.Editor editor = getSharedPreferences("preferenceName", MODE_PRIVATE).edit();
editor.putString("key", "value");
editor.commit();
```
hoặc khi lưu trữ một file
```java
FileOutputStream fos = openFileOutput(filenameString, Context.MODE_PRIVATE);
fos.write(data);
fos.close();
```
Tránh lưu trữ dữ liệu trên bộ nhớ ngoài, vì sau đó các ứng dụng và người dùng khác có thể đọc được dữ liệu. Trên thực tế, để giảm khả năng sao chép dữ liệu nhị phân và dữ liệu ứng dụng của bạn, bạn có thể ngăn người dùng không thể cài đặt ứng dụng trên bộ nhớ ngoài. Thêm` android: installLocation` với giá trị `InternalOnly` vào tệp manifest.
Bạn cũng có thể ngăn ứng dụng và dữ liệu của ứng dụng được sao lưu. Điều này cũng ngăn nội dung của thư mục dữ liệu riêng tư của ứng dụng được tải xuống bằng cách sử dụng sao lưu adb. Để làm như vậy, hãy đặt thuộc tính `android: allowBackup` thành false trong file manifest. Mặc định, thuộc tính này luôn luôn là true.
Đây là những cách tốt nhất, nhưng chúng sẽ không hoạt động đối với thiết bị bị xâm nhập hoặc bị root và mã hóa ổ đĩa chỉ hữu ích khi thiết bị được bảo mật bằng màn hình khóa.
# 2. Bảo vệ dữ liệu người dùng với mật khẩu
## 2.1 AES and Password-Based Key Derivation
Ở đây mình sẽ sử dụng thuật toán AES, mã hóa dữ liệu được cung cấp một khóa. Khóa tương tự được sử dụng để mã hóa dữ liệu được sử dụng để giải mã dữ liệu, được gọi là mã hóa đối xứng. Có các kích thước khóa khác nhau và AES256 (256 bit) là độ dài tối ưu để dữ mã hóa dữ liệu nhạy cảm.

Mặc dù trải nghiệm người dùng của ứng dụng của bạn sẽ buộc người dùng sử dụng mật mã mạnh, có khả năng mật mã tương tự cũng sẽ được người dùng khác chọn. Đặt bảo mật dữ liệu được mã hóa vào tay người dùng sẽ không đảm bảo an toàn. Vì vậy dữ liệu cần được bảo mật băng mật bằng khóa ngẫu nhiên và có đủ entropy để được coi là mạnh. Đây là lý do tại sao không bao giờ nên sử dụng mật khẩu trực tiếp để mã hóa dữ liệu. Do đó chưc năng phát sinh khóa dựa trên mật khẩu PBKDF2 được ra đời và nó mang lại một kết quả khá tốt.

PBKDF2 lấy được một khóa từ mật khẩu bằng cách băm nó nhiều lần. Điều này được gọi là kéo dài khóa bằng 'salt'. Salt chỉ là một chuỗi dữ liệu ngẫu nhiên và làm cho khóa dẫn xuất là duy nhất ngay cả khi người khác sử dụng cùng một mật khẩu.
Hãy bắt đầu bằng cách tạo ra chuỗi ngẫu nhiên đó.
```markdown
SecureRandom random = new SecureRandom();
byte salt[] = new byte[256];
random.nextBytes(salt);
```
Lớp SecureRandom đảm bảo rằng đầu ra được tạo sẽ khó dự đoán được vì đây là "trình tạo số ngẫu nhiên mạnh về mặt mật mã". Bây giờ chúng ta có thể đặt chuỗi ngẫu nhiên và mật khẩu vào một đối tượng mã hóa dựa trên mật khẩu: PBEKeySpec. Hàm tạo của đối tượng cũng có dạng đếm lặp, làm cho khóa mạnh hơn. Điều này là do việc tăng số lần lặp lại sẽ mở rộng thời gian cần thiết để hoạt động trên một bộ chìa khóa trong một cuộc tấn công mạnh. PBEKeySpec sau đó được chuyển vào SecretKeyFactory, cuối cùng tạo ra khóa dưới dạng mảng byte []. Chúng tôi sẽ gói mảng byte [] thô đó vào một đối tượng SecretKeySpec.
```csharp
char[] passwordChar = passwordString.toCharArray(); //Turn password into char[] array
PBEKeySpec pbKeySpec = new PBEKeySpec(passwordChar, salt, 1324, 256); //1324 iterations
SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
byte[] keyBytes = secretKeyFactory.generateSecret(pbKeySpec).getEncoded();
SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
```
Lưu ý rằng mật khẩu được truyền dưới dạng mảng char [] và lớp PBEKeySpec cũng lưu nó dưới dạng mảng char []. Các mảng char [] thường được sử dụng cho các chức năng mã hóa bởi vì trong khi lớp String là bất biến, một mảng char [] chứa thông tin nhạy cảm có thể được ghi đè lên, do đó loại bỏ hoàn toàn dữ liệu nhạy cảm khỏi bộ nhớ của thiết bị.
## 2.2 Initialization Vectors
Bây giờ dữ liệu đã sẵn sàng được mã hóa, nhưng chúng ta có một việc nữa phải làm. Có nhiều chế độ mã hóa khác nhau với AES, nhưng ở đây, tôi sẽ sử dụng một chế độ được đề xuất: chuỗi khối mật mã (CBC). Nó hoạt động trên một khối dữ liệu của tôi tại một thời điểm. 

Nếu một tin nhắn được mã hóa bắt đầu giống như một tin nhắn khác được mã hóa, thì đầu ra được mã hóa ban đầu sẽ giống nhau và điều đó sẽ cho kẻ tấn công một manh mối để tìm ra tin nhắn đó có thể là gì. Giải pháp là sử dụng một vectơ khởi tạo (IV).

IV chỉ là một khối byte ngẫu nhiên sẽ là XOR  với khối dữ liệu người dùng đầu tiên. Vì mỗi khối phụ thuộc vào tất cả các khối được xử lý cho đến thời điểm đó, toàn bộ tin nhắn sẽ được mã hóa duy nhất các tin nhắn giống hệt nhau được mã hóa với cùng một khóa sẽ không tạo ra kết quả giống hệt nhau.
```csharp
SecureRandom ivRandom = new SecureRandom(); //not caching previous seeded instance of SecureRandom
byte[] iv = new byte[16];
ivRandom.nextBytes(iv);
IvParameterSpec ivSpec = new IvParameterSpec(iv);
```
## 2.3 Encrypting the Data
Được trang bị IvParameterSpec, giờ đây chúng ta có thể thực hiện mã hóa thực tế.
```csharp
Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding");
cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);
byte[] encrypted = cipher.doFinal(plainTextBytes);
```
Ở đây tôi chuyển qua chuỗi "AES / CBC / PKCS7Padding". Điều này chỉ định mã hóa AES với chuỗi khối cypher. Phần cuối cùng của chuỗi này đề cập đến PKCS7, đây là một tiêu chuẩn được thiết lập để đệm dữ liệu không phù hợp hoàn hảo với kích thước khối. (Khối là 128 bit và việc đệm được thực hiện trước khi mã hóa.)

Để hoàn thành ví dụ này, tôi sẽ đặt mã này vào một phương thức mã hóa sẽ đóng gói kết quả vào HashMap chứa dữ liệu được mã hóa, cùng với vectơ salt và khởi tạo các thứ cần thiết để giải mã.
```java
private HashMap<String, byte[]> encryptBytes(byte[] plainTextBytes, String passwordString)
{
    HashMap<String, byte[]> map = new HashMap<String, byte[]>();

    try
    {
        //Random salt for next step
        SecureRandom random = new SecureRandom();
        byte salt[] = new byte[256];
        random.nextBytes(salt);

        //PBKDF2 - derive the key from the password, don't use passwords directly
        char[] passwordChar = passwordString.toCharArray(); //Turn password into char[] array
        PBEKeySpec pbKeySpec = new PBEKeySpec(passwordChar, salt, 1324, 256); //1324 iterations
        SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] keyBytes = secretKeyFactory.generateSecret(pbKeySpec).getEncoded();
        SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");

        //Create initialization vector for AES
        SecureRandom ivRandom = new SecureRandom(); //not caching previous seeded instance of SecureRandom
        byte[] iv = new byte[16];
        ivRandom.nextBytes(iv);
        IvParameterSpec ivSpec = new IvParameterSpec(iv);

        //Encrypt
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding");
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);
        byte[] encrypted = cipher.doFinal(plainTextBytes);

        map.put("salt", salt);
        map.put("iv", iv);
        map.put("encrypted", encrypted);
    }
    catch(Exception e)
    {
        Log.e("MYAPP", "encryption exception", e);
    }

    return map;
}
```
## 2.4 The Decryption Method
Bạn chỉ cần lưu trữ khối byte được sinh ngẫu nhiên (IV) và chuỗi ngẫu nhiên(salt) với dữ liệu của bạn. Mặc dù salt và IV được coi là công khai, hãy đảm bảo rằng chúng không được tăng dần hoặc tái sử dụng. Để giải mã dữ liệu, tất cả những gì chúng ta cần làm là thay đổi chế độ trong hàm tạo mã hóa từ ENCRYPT_MODE thành DECRYPT_MODE.

Phương thức giải mã sẽ lấy HashMap chứa cùng thông tin bắt buộc (dữ liệu được mã hóa, salt và IV) và trả về một mảng byte [] đã giải mã, được cung cấp mật khẩu chính xác. Phương thức giải mã sẽ tạo lại khóa mã hóa từ mật khẩu.
```csharp
private byte[] decryptData(HashMap<String, byte[]> map, String passwordString)
{
    byte[] decrypted = null;
    try
    {
        byte salt[] = map.get("salt");
        byte iv[] = map.get("iv");
        byte encrypted[] = map.get("encrypted");

        //regenerate key from password
        char[] passwordChar = passwordString.toCharArray();
        PBEKeySpec pbKeySpec = new PBEKeySpec(passwordChar, salt, 1324, 256);
        SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] keyBytes = secretKeyFactory.generateSecret(pbKeySpec).getEncoded();
        SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");

        //Decrypt
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding");
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
        decrypted = cipher.doFinal(encrypted);
    }
    catch(Exception e)
    {
        Log.e("MYAPP", "decryption exception", e);
    }

    return decrypted;
}
```
# 3. Saving Encrypted Data
Bây giờ chúng ta có một mảng byte [] được mã hóa, chúng ta có thể lưu nó vào bộ lưu trữ.
```sql
FileOutputStream fos = openFileOutput("map.dat", Context.MODE_PRIVATE);
ObjectOutputStream oos = new ObjectOutputStream(fos);
oos.writeObject(map);
oos.close();
```
Lưu dữ liệu an toàn vào SharedPreferences
```sql
SharedPreferences.Editor editor = getSharedPreferences("prefs", Context.MODE_PRIVATE).edit();
String keyBase64String = Base64.encodeToString(encryptedKey, Base64.NO_WRAP);
String valueBase64String = Base64.encodeToString(encryptedValue, Base64.NO_WRAP);
editor.putString(keyBase64String, valueBase64String);
editor.commit();
```
# Conclusion
Trong bài đăng này, bạn đã học cách mã hóa và giải mã dữ liệu nhạy cảm một cách an toàn bằng mật khẩu do người dùng cung cấp. Thật dễ dàng để làm khi bạn biết cách, nhưng điều quan trọng là phải tuân theo tất cả các thực tiễn tốt nhất để đảm bảo dữ liệu của người dùng của bạn thực sự an toàn.

Trong bài đăng tiếp theo, chúng tôi sẽ xem xét cách tận dụng KeyStore và các API liên quan đến thông tin xác thực khác để lưu trữ các mục một cách an toàn. Trong thời gian chờ đợi, hãy xem một số bài viết tuyệt vời khác của chúng tôi về phát triển ứng dụng Android.