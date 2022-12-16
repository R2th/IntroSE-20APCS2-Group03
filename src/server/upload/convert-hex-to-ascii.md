**Link tham khảo: http://www.baeldung.com/java-convert-hex-to-ascii**

### 1. Overview
Trong bài viết này, chúng ta sẽ thực hiện một số chuyển đổi đơn giản giữa các định dạng Hex và ASCII.
Trong một số trường hợp điển hình, dạng Hex có thể được dùng để viết 1 số kiểu int có giá trị rất lớn trong một dạng nhỏ gọn. Ví dụ AD45 ngắn hơn so với số cùng giá trị là 44357, và khi giá trị tăng lên thì sự khác biệt và độ dài chuỗi trở lên rõ ràng hơn

### 2. ASCII to Hex

Để chuyển đổi từ ASCII sang Hex, chúng ta sẽ làm theo các bước:
- Chuyển *String* sang *char array*.
- Đổi từng ký tự *char* sang *int*.
- Sử dụng Integer.toHexString() để convert *int* sang Hex String.

Ví dụ: 
```
private static String asciiToHex(String asciiStr) {
    char[] chars = asciiStr.toCharArray();
    StringBuilder hex = new StringBuilder();
    for (char ch : chars) {
        hex.append(Integer.toHexString((int) ch));
    }
    return hex.toString();
}
```
### 3. Hex to ASCII format

Tương tự, để chuyển đổi từ Hex sang ASCII, chúng ta cũng làm theo 3 bước:
- Cắt Hex String thành các nhóm gồm 2 ký tự
- Chuyển đổi nó thành base 16 Interger sử dụng Integer.parseInt(hex, 16) sau đó cast sang kiểu *char*.
- Ghép tất cả các ký tự lại với nhau.

Ví dụ:

```
private static String hexToAscii(String hexStr) {
    StringBuilder output = new StringBuilder("");
    for (int i = 0; i < hexStr.length(); i += 2) {
        String str = hexStr.substring(i, i + 2);
        output.append((char) Integer.parseInt(str, 16));
    }
    return output.toString();
}
```

### 4. Test
Cuối cùng thực hiện một bài test nhanh: 

```
@Test
public static void whenHexToAscii() {
    String asciiString = "www.baeldung.com";
    String hexEquivalent = 
      "7777772e6261656c64756e672e636f6d";
    assertEquals(asciiString, hexToAscii(hexEquivalent));
}
 
@Test
public static void whenAsciiToHex() {
    String asciiString = "www.baeldung.com";
    String hexEquivalent = 
      "7777772e6261656c64756e672e636f6d";
    assertEquals(hexEquivalent, asciiToHex(asciiString));
}
```

### 5. Conclusion
Chúng ta đã có cách đơn giản nhất để chuyển đổi giữa ASCII và Hex.

Việc implement này rất đơn giản, có thể đặt những đoạn code này vào bất kỳ project nào đó và nó sẽ chạy một cách bình thường.