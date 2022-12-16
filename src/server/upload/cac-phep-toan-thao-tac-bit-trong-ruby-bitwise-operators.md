Như mọi người đã biết tới hệ nhị phân từ các môn học ở đại học hoặc đọc đâu đó trên internet. Chúng là cái đống 1010... mà nhờ nó máy tính hiểu cần phải làm gì! Trong bài viết này tôi sẽ đề cấp tới các toán tử áp dụng trong hệ nhị phân sử dụng trong ruby.

Các toán tử nhị phân làm việc tương tự như trong bộ nhớ máy tính.

Để convert một số nguyên sang dạng string gồm các số 0 và 1 (nhị phân). ta dùng method `.to_s(2)`
ví dụ: `5.to_s(2) => "101"`

- Trong ruby cung cấp cho chúng ta 6 toán tử bitwise:

| Toán tử | Mô tả | 
| -------- | -------- | 
|`&` | Phép AND     | 
|`|`| Phép OR | 
|`^ `| Phép XOR     | 
| `~` | Phép NOT| 
| `<<` | Phép dịch trái     | 
| `>>` | Phép dịch phải | 


* oke định nghĩa giới thiệu thế là đủ rồi vào mục chính này
1. **Phép AND `&`**
    
    Phép AND so sánh dưới dạng nhị phân của 2 số nguyên, so sánh từ bit từ trái sang phải của 2 số (ở dạng nhị phân). nếu cả 2 vị trí lấy ra so sánh có giá trị bằng 1 thì trả về là 1 còn các trường hợp còn lại trả về 0.
    
    **ví dụ:** 
    ```
     18.to_s(2)           #=> "10010"
     20.to_s(2)           #=> "10100"
     (18 & 20).to_s(2)    #=> "10000"
    ```
2. **Phép OR `|`**
    
    Phép OR cách thực hiện gần tương tự như phép AND nhưng khi so sánh cặp bit tương ứng thì chỉ cần 1 số 
    có giá trị bằng 1 thì sẽ trả về 1.
    
    **ví dụ:** 
    ```
     18.to_s(2)           #=> "10010"
     20.to_s(2)           #=> "10100"
     (18 | 20).to_s(2)    #=> "10110"
    ```
3. **Phép XOR `^ `**

    Phép XOR chỉ có giá trị là 0 khi cả 2 bit mang ra so sánh có giá trị giống nhau
    
    **ví dụ:** 
    ```
     (18).to_s(2)     #=> "10010"
     (20).to_s(2)     #=> "10100"
     (18 ^ 20).to_s(2)      #=>   "110"
    ```
5. **Phép NOT `~`**
    
    Phép NOT đơn giản chỉ là việc đảo lại giá trị cho các bit 0 -> 1, 1 -> 0 đơn giản đúng không! :v: nghe thì có vẻ đơn giản đấy nhưng bạn cứ xem cái ví dụ này đi sẽ thấy:
    
    **ví dụ:**
     ```
       18.to_s(2)       #=> "10010"
       ~18              #=> -19
       (~18).to_s(2)    #=> "-10011"
    ```
    
    ruby convert nó sang dạng như trên ví dụ! nghe rất sai trái nhưng đó chính là do Fixnum#to_s chuyển qua dạng đó. Nó trả vệ dạng số âm toán học. Bạn muốn hiển thị đúng dạng như định nghĩa ở trên thì dùng cách sau:
    
    ```
        5.downto(0).map { |n| 18[n] }.join     #=> "010010"
        5.downto(0).map { |n| -19[n] }.join    #=> "101101"
    ```
6. **Phép Dịch Trái `<<` và Phép Dịch Phải `>>`** 

    Dịch sang trái hoặc sang phải với số bit tương ứng. Bạn xem ví dụ dưới đây.
    
   **ví dụ:**

    ```
        18.to_s(2)           #=>   "10010"
        (18 << 1).to_s(2)    #=>  "100100"
        (18 << 2).to_s(2)    #=> "1001000"
        (18 >> 1).to_s(2)    #=>    "1001"
        (18 >> 2).to_s(2)    #=>     "100"
    ```
Trên đây là mình giới thiệu về các toán tử bit cơ bản được xử lý trong ruby.

link tham khảo: https://www.calleerlandsson.com/posts/rubys-bitwise-operators/


**Ứng dụng:** Sau khi ngồi tìm hiểu xem cái thằng bitwise này nó có cái ựng dụng qoái gì trong code thì mình ra được mấy cái này khá thú vị:

- Kiểm tra chẵn lẻ của một số:
    ```
    (43 & 1) == 0 #=> false
    (2 & 1) == 0 #=> true
    ```
    vì sao lại như thế? :v: khi chúng ta thấy lấy số cần kiểm tra thực hiện & với số 1 thì nếu bít cuối cùng của số đó là 1 thì sẽ được 1 dãy kiểu này:
    ```
        00101011
    &   00000001
        --------
        00000001
    ```
    => đó bạn có thể thấy ví dụ trên số 43 (00101011) và số 1 (00000001) kết quả của phép `&` là 00000001 đương nhiên là nó khác 0 và bạn đã biết thêm 1 cách kiểm tra chẵn lẻ của số nguyên rồi đó.
- Nhân 1 số với 2:
    ```
       1 << 1 #=> 2
       2 << 1 #=> 4
       3 << 1 #=> 6
       4 << 1 #=> 8
    ```
- Chia 1 số với 2 (chỉ lấy phần nguyên):
    ```
       1 >> 1 #=> 0
       2 >> 1 #=> 1
       3 >> 1 #=> 1
       4 >> 1 #=> 2
    ```
- Lũy thừa của một số với 2:
    ```
       1 << 1 #=> 2
       1 << 2 #=> 4
       1 << 3 #=> 8
       1 << 4 #=> 16
    ```
- Căn bậc n của một số với 2 (lấy phần nguyên):
    ```
       16 >> 1 #=> 8
       16 >> 2 #=> 4
       16 >> 3 #=> 2
       16 >> 4 #=> 2
    ```
- Lấy giá trị tuyệt đối của một số:
    ```
        n = -10
        (n ^ (n >> 31)) - (n >> 31) #=> 10
    ```
- Trả về số lớn hơn trong 2 số a và b:
    ```
        a = 10
        b = 20
        b & ((a-b) >> 31) | a & (~(a-b) >> 31) #=> 20
    ```
 - Tăng lên và giảm đi 1:
    ```
     -~2 #=> 3
     ~-2 #=> 1
    ```
 - Lấy số đối:
    ```
     n = 2
     ~n + 1 #=> -2
     (n ^ -1) + 1 #=> -2
    ```
 - Chuyển qua giá trị của 2 số:
    ```
     x = 1
     a = 1
     b = 2
     x = a ^ b ^ x #=> 2 //if (x==a) x=b; if (x==b) x=a;
    ```
Mọi người ghé qua link này: https://stackoverflow.com/questions/1533131/what-useful-bitwise-operator-code-tricks-should-a-developer-know-about sẽ có nhiều thứ về bitwise cho các bạn nghịch này!

Mình tìm hiểu được thì có cách phân quyền rất đơn giản cho hệ thống mà lại hiệu quả ra phết. mọi người nghía qua ví dụ dưới đây nhé:

```
READ   = 1 << 1 #=> 2
WRITE  = 1 << 2 #=> 4
UPDATE = 1 << 3 #=> 8
DELETE = 1 << 4 #=> 16

CUSTOMER = READ #=> 2
USER = READ | WRITE | UPDATE #=> 16
ADMIN = READ | WRITE | UPDATE | DELETE #=> 30
```

với ví dụ trên các bạn có thể nghĩ tới một module phân quyền để extend cho model user để cải thiện phần role rồi chứ! 

mỗi quyền như CUSTOMER, USER, ADMIN sẽ là sự kết hợp của các hằng số đã được định nghĩa sẵn với giá trị tương ứng, với sự kết hợp như trên thì sẽ không có cặp hoặc nhóm nào kết hợp các quyền lại ra một trọng số giống nhau nên từ đó ta có thể chia các quyền cho phụ hợp với hệ thống! 

việc thêm quyền cũng rất đơn giản! chỉ việc định nghĩa thêm một quyền rồi gán giá trị tương ứng cho nó! bạn có thể tạo một model riêng để phần phân quyền có thể linh hoạt hơn.

trong đó sử dụng module hoặc đơn giản là callback để tự gán giá trị cho mỗi bản ghi quyền được định nghĩa trong model đó.

với kiểu phân quyền trên bạn có thể liếc sang một chút hệ thống của linux: bạn có thể đọc bài viết này để hiểu rõ hơn https://viblo.asia/p/phan-quyen-trong-linux-oZVRgl4lMmg5. 

Cảm ơn bạn đã đọc bài viết của mình! Mong rằng nó giúp chút ích cho bạn về các toán tử xử lý bit.