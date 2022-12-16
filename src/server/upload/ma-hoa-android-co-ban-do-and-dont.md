# 1. Những điều cần tránh:
**Tránh sử dụng chuỗi khối ECB (được áp dụng theo mặc định trừ khi được quy định khác) khi sử dụng [Symmetric AES ciphers](https://developer.android.com/training/articles/keystore#SupportedCiphers) để mã hóa. Thay vào đó, sử dụng các phương pháp chuỗi khối GCM hoặc CBC**. ECB không an toàn vì nó không tạo ra các mã hóa duy nhất khi được cung cấp dữ liệu trùng lặp.

### DO 
```
Cipher.getInstance("AES/GCM/NOPADDING");
```
### Don’t (Sẽ áp dụng ECB theo mặc định)
```
Cipher.getInstance("AES");
```
### 
**Không sử dụng các giá trị được mã hóa cứng để khởi tạo mật mã**. Tính toàn vẹn của mật mã bị xâm phậm nếu không được cung cấp thông tin duy nhất cho mọi hoạt động. Cung cấp SecureRandom cho phương thức init của mật mã vì  [các giá trị theo mặc định có thể không ngẫu nhiên cho các phiên bản cũ hơn](https://doridori.github.io/Android-Security-Beware-of-the-default-IV/#sthash.jymTOnIq.BQ94FuXg.dpbs)
### DO 
```
SecureRandom secureRandom = new SecureRandom();
byte[] iv = new byte[IV_LENGTH];    
secureRandom.nextBytes(iv);    
myCipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(iv));
```
### Don’t
```
myCipher.init(Cipher.ENCRYPT_MODE, key);
byte[] iv = myCipher.getIV();
```
# 2. Những điều cần làm: 
**Sử dụng kích thược khóa lớn khơn khi tạo khóa**. ( [Xem tại đây để tạo cặp khóa RSA](https://proandroiddev.com/secure-data-in-android-encryption-in-android-part-2-991a89e55a23) và [ở đây cho AES](https://stackoverflow.com/questions/18228579/how-to-create-a-secure-random-aes-key-in-java)). Điều này có thể rõ ràng nhưng cần phải nói vì kích thước khóa mặc định trong mỗi nền tảng có thể không được chấp nhận đối với một số người.  [Xem ở đây để biết kích thước khóa được hỗ trợ](https://developer.android.com/training/articles/keystore).
### 
**Không có mảng byte nhạy cảm**. Giả sử, thay thế mỗi chỉ mục trong mảng byte bằng 0 giúp chống lại các cuộc tấn công bộ nhớ. Tôi không ngần ngại về tính chính xác của điều này do tất cả các bộ phận chuyển động trong hệ sinh thái Android, vì vậy hãy dùng nó nếu bạn tin tưởng
```
byte[] decrypt(byte[] dataToDecrypt, byte[] secretKey) {
    //Decrypt data using cipher and secretKey
    ...
    //Clear out secret key encoding byte array 
    Arrays.fill(secretKey, (byte) 0);
    return decryptedData;
}

```
# 3. Rất vui được biết:
**RSA không thể mã khóa dữ liệu lớn hơn kích thước khóa của nó ([phần đệm cũng ảnh hưởng đến điều này](https://proandroiddev.com/secure-data-in-android-encrypting-large-data-dda256a55b36)). Nếu kích thước dữ liệu không thể đoán trước thì hãy sử dụng AES**. Đối với những người target API 19 và chỉ có thể sử dụng RSA cho Keystore (AES được hỗ trợ sau API 23). Một số giải pháp có thể bao gồm tách dữ liệu thành các đoạn và chạy mã hóa mật mã trên mỗi phần (Mặc dù lưu ý rằng điều này sẽ làm cho mã hóa chậm hơn). [Ngoài ra, mã hóa dữ liệu bằng AES và khóa bóc AES bằng khóa RSA được hỗ trợ bởi keystore](https://proandroiddev.com/secure-data-in-android-encrypting-large-data-dda256a55b36).
### 
**Phương thức destroy trong SecretKey là không đáng tin cậy** nếu [target API <= 25 sẽ crash với "method not found" exception. Nếu api version > 25 thì method sẽ đơn giản throw DestroyFailedException theo mặc định](https://developer.android.com/reference/javax/security/auth/Destroyable#destroy%28%29). Tôi không có bất kỳ đề xuất nào bên ngoài các secret key byte arrays, vì các giải pháp mà tôi đã thấy là hacky và sử dụng reflection/ Nếu bạn có bất cứ ý kiến đóng góp nào, hãy cho tôi biết.
### 
**Cipher chấp nhận mảng byte rỗng nhưng không null**. Tôi đã nhận thức được bằng bạn có thể mã hóa bất cứ thứ gì đó rỗng. 
### 
**Sử dụng Base64 (hoặc các định dạng khác như Hex, Base32, ...) khi xử lý các mảng byte được tạo ra thông qua encryption/decryption.** Base64 tạo điều kiện vận chuyển dữ liệu bit bằng cách biến nó thành các ký tự dễ hiểu tồn tại trong hầu hết các hệ thống. Một số chiến lược tốt để mã hóa những thứ như String là thực hiện String.byte("UTF=8") ->encrypt -> encode thành chuỗi Base64. Decoding mặt khác sẽ được thực hiện theo hướng ngược lại. 
### 
*Encoding:*
 ```
String encryptAndEncode(String data) {
    Charset charSet = Charset.forName(UTF_8);
    //encrypt method not implemented
    byte[] encrypted = encrypt(data.getBytes(charSet));
    return Base64.encodeToString(encrypted, Base64.NO_WRAP);
}
```

*Decoding:*
```
String decodeAndDecrypt(String encrypted) {
    Charset charSet = Charset.forName(UTF_8); 
    //decrypt method not implemented
    byte[] data = decrypt(Base64.decode(encrypted, Base64.NO_WRAP));
    return new String(data, charSet);
}
```
### 
Nguồn: [Medium](https://medium.com/@tiensinodev/basic-android-encryption-dos-and-don-ts-7bc2cd3335ff?fbclid=IwAR06klf4I9-Ax4Qwh4zYQSzs6JmoW3GHKrH3qDu0wTnbm810aQ7wk0QnD8w)