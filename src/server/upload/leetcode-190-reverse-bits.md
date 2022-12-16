![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/08/binary-1327493_1920.jpeg?w=1920&ssl=1)

Hôm nay mình sẽ mở đầu cho series giải đề trên leetcode 🥳  Vì khả năng còn rất có hạn nên mình sẽ chọn những bài dễ làm trước hehe. 

Bài đầu tiên là [190. Reverse Bits](https://leetcode.com/problems/reverse-bits/)

Reverse bits of a given 32 bits unsigned integer.

**Note:**

Note that in some languages such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer’s internal binary representation is the same, whether it is signed or unsigned.

In Java, the compiler represents the signed integers using 2’s complement notation. Therefore, in Example 2 above, the input represents the signed integer -3 and the output represents the signed integer -1073741825.

**Follow up:**

If this function is called many times, how would you optimize it?

**Constraints:**

The input must be a binary string of length 32

#### Example 1
```
Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.
```
#### Example 2

```
Input: n = 11111111111111111111111111111101
Output:   3221225471 (10111111111111111111111111111111)
Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.
```

## Phân tích đề

Theo đề bài yêu cầu thì mình cần chuyển một số nguyên về số nhị phân(có 32 bit), đảo ngược n và chuyển nó về lại giá trị số nguyên tương ứng. 

Như trong ví dụ 1,  n có giá trị số nguyên là 43261596 và ở dạng binary thì 

n = 00000010100101000001111010011100 thì đảo ngược của 

n ở dạng bit từ sau ra trước là: **0011100101111000001010010100000**

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-28-at-09.07.33.png?w=641&ssl=1)

Sau khi đã có được số đảo ngược, thì kết quả chính là số đảo ngược đó ở dạng số nguyên, là 3221225471

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-28-at-09.24.40.png?resize=768%2C261&ssl=1)

Và kết quả đúng chính là 3221225471

<hr>
Để giải được bài này, mình cần biết:

– cách chuyển một số nguyên về một số dạng bit và ngược lại, chuyển một số dạng bit về một số nguyên, ví dụ: 

   – chuyển về binary: 12 = 8 + 4 = 1* 2^3 + 1 * 2^2 + 0 * 2^1 + 0 * 2^0 = 110

   – chuyển về số nguyên: 1010 = 1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 0 *  2^0 = 8 + 0 + 2 + 0 = 10

– cách đảo ngược một chuỗi, ví dụ ‘1010‘ thành ‘0101’.

## Hướng tiếp cận 1:
### Chuyển số nguyên về số binary và ngược lại
#### Chuyển số binary về số nguyên bằng cách chia cho 2
Ở cách này, mình lần lượt chia số đó cho 2 và nhận được kết quả là x và số dư là 0 nếu chia hết cho 2, hoặc 1 nếu chia không hết cho hai. Tiếp tục lấy x chia với 2 cho đến khi nhận kết quả cuối cùng là 0. Khi đó, số binary sẽ được lấy theo thứ tự từ dưới lên trên.

Cách làm này được mô tả như sau:
![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-28-at-09.55.40.png?w=563&ssl=1)

Trong code sẽ mô tả là:

```python
def number_to_binary(n):
    if n >= 1:
        number_to_binary(n // 2)
        print(n % 2, end=" ")
```

Code mô tả cho công việc này mình có làm [ở đây](https://replit.com/@diemthanhthanh/number-to-bit-recursive), bạn có thể fork về tài khoản của mình để thực hành nhé.

#### Chuyển số nguyên về số binary bằng cách nhân cho 2
Ngược lại, để chuyển từ số binary về số nguyên mình cần thực hiện nhân cho 2 và cộng dồn kết quả với các số dư, chính là các số binary 0 hay 1.

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-28-at-14.42.50.png?w=642&ssl=1)

Như mô tả trên hình, thì mình sẽ lặp qua từng số trong số binary, rồi thực hiện nhân kết quả đang có cho 2 và cộng với số dư chính là số binary ở thời điểm hiện tại. 

Bắt đầu với giá trị 0, số đầu tiên là 1 nên kết quả có được là 0 * 2 + 1 = 1

Tiếp theo, bắt đầu với 1, số tiếp theo là 1 nên kết quả có được là 1 * 2 + 1 = 3

Và tiếp tục thực hiện cho đến hết. 

Code mô tả cho công việc này mình có làm [ở đây](https://replit.com/@diemthanhthanh/binary-to-number), bạn có thể fork về tài khoản của mình để thực hành nhé.

```python
def binary_to_number(b):
  n = 0
  for digit in b:
    n = n * 2 + int(digit)

  return n 
```
#### Giải bài toán với hướng tiếp cận 1
Vậy là đã rõ cách chuyển giữa số nguyên và số binary rồi, còn việc đảo ngược một chuỗi thì đơn giản là mình sử dụng slice trong Python [::-1]

Mình có thể bắt tay vào giải bài này rồi đó, bạn nãy làm thử ở tài khoản leetcode của mình trước khi xem đáp án nha.

Một gợi ý nhỏ nữa là đề bài yêu cầu số binary của mình có 32 bit, nên sau khi chuyển từ số nguyên về số nhị phân rồi, nếu chưa đủ 32 bit thì mình cần thêm số 0 ở phía trước kết quả cho đủ 32 bit trước khi thực hiện đảo ngược thứ tự nhé.

##### Code Python
```python
class Solution:
    def reverseBits(self, n: int) -> int:
        n_binary_str = ""
        n_binary_str = self.number_to_binary(n, n_binary_str)
        
        # because n in binary could not enough 32 bit then need to fill 0 until reach 32 bit
        while len(n_binary_str) < 32:
            n_binary_str = "0" + n_binary_str
        
        # reverse the order of the binary
        n_binary_str = n_binary_str[::-1]
        
        # convert back to integer with binary
        x = int(n_binary_str, 2)
        return x
        
        
    def number_to_binary(self, n, n_binary_str):
        if n >= 1:
            n_binary_str = str(n % 2) + n_binary_str
            return self.number_to_binary(n // 2, n_binary_str)
        
        return n_binary_str

    
    def binary_to_number(self, binary, n):
        if n >= 1:
            n_binary_str = str(n % 2) + n_binary_str
            return self.number_to_binary(n // 2, n_binary_str)
        
        return n_binary_s
```

Tuy nhiên, tuy nhiên, kết quả này dù đúng nhưng vẫn chậm lắm, khi mình submit bài tập chỉ hơn có 7% những người khác thôi. Cho nên tiếp theo mình sẽ cùng đi thêm một hướng tiếp cận khác hay ho hơn nha, hi vọng sẽ nhanh hơn nào.

## Hướng tiếp cận 2:
Thực ra, ngay từ đầu mình có thể đi theo hướng này liền, cho nó nhanh gọn, nhưng mà mình muốn mình và các bạn đọc bài viết này có thể hiểu thêm về cách chuyển đổi giữa số nguyên và số nhị phân nên mình mới đi theo hướng kia trước. Với hướng tiếp cận 1 thì dù bạn có sử dụng ngôn ngữ nào để thực hiện bài toán thì đều có thể áp dụng được.

### Chuyển số nguyên về số binary và ngược lại

Trong Python, có một hàm built-in có thể giúp mình chuyển số nguyên về số nhị phân tên là bin

```python
>>> bin(12)
'0b1100'
>>> bin(12).replace("0b", "")
'1100'
```
Ngoài ra, còn một cách khác nữa có thể chuyển từ số nguyên sang số nhị phân ở dạng chuỗi bằng cách dùng hàm format với dạng binary, nó sẽ như thế này 

```python
>>> "{0:b}".format(int(12))
'1100'
```

Và để chuyển ngược từ số nhị phân sang số nguyên mình có thể sử dụng hàm int có sẵn trong Python với base là 2. Hàm này mặc định có base là 10.

```python
>>> int('1100', 2)
12
>>> int('1100', base=2)
12
```

### Giải bài toán với hướng tiếp cận 2
Hẳn là bạn đã thấy cách này nó đơn giản như thế nào rồi, và bài giải của mình chỉ đơn giản là như thế này:

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        # chuyển số nguyên về số nhị phân
        n_binary_str = bin(n).replace("0b", "")
        
        # thêm số 0 cho đủ 32 bit
        while len(n_binary_str) < 32:
            n_binary_str = "0" + n_binary_str
        
        # đảo ngược thứ tự 
        n_binary_str = n_binary_str[::-1]
        
        # chuyển nhị phân về số nguyên
        return int(n_binary_str, 2)
```

Và tén ten, lần submit này đã hơn 88.74% những submissions khác rồi 🥰

## Bản tối ưu từ một bạn comment bên Kipalog

Sau khi mình đăng bài viết trên Kipalog thì có một bạn comment khá hay nên mình lưu lại cách giải này để tham khảo, một vài điểm hay ở đáp án này là:

– chỉ dùng một dòng code

– dùng hàm zfill trong Python để điền số 0 phía trước cho đủ 32 bit

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        return int(bin(n)[2:].zfill(32)[::-1], 2)
```

Bài tập hôm nay đến đây là hết rồi, ai có cách giải nào xịn hơn thì nhớ comment bày mình với nhé. 

À, mình có tạo một danh sách các bài easy trên Leetcode mà mình thực hành [ở đây](https://leetcode.com/list/9xtc7k6t), bạn có thể Clone về tài khoản leetcode của bạn để thực hành nhé.

Hi vọng bài viết sẽ hữu ích với bạn,

Và [bài gốc của nội dung này](https://beautyoncode.com/leetcode-190-reverse-bits/) nằm trên blog cá nhân của mình nhé!

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!