Vừa qua cuộc thi CTF "zh3r0 2021" đã kết thúc một cách thành công và đón nhận được sự quan tâm to lớn của cộng đồng những nhà nghiên cứu bảo mật trên toàn thế giới. Đây là cuộc thi có chất lượng cao, thể hiện qua số đội tham dự (509) và điểm rating (21.85). Cuộc thi có nhiều challenge thú vị, trong số đó mình sẽ chọn "Baby RE" làm đối tượng để viết bài write up. Đây là một challenge thuộc thể loại "Reverse Engineering" có độ khó vừa phải, phù hợp với những người chơi mới, tuy vậy, với những người có kinh nghiệm, nếu không cẩn trọng vẫn có thể mắc sai sót qua đó để lãng phí thời gian tại challenge này.
# Tổng quan chương trình
File thực thi có thể tải về từ đường link: https://guesstheflag.zh3r0.com/challenges#BabyRE-1

Thông tin về file thực thi:

![](https://images.viblo.asia/474d23f2-8a46-47f7-9e67-a97f60e84ab3.png)

Chương trình có giao diện đơn giản, yêu cầu nhập mật khẩu (cũng chính là flag của challenge):

![](https://images.viblo.asia/840696b8-ae10-4d86-8d0d-442371dd8f4b.png)

Với kiểu challenge này, chúng ta cần tìm thuật toán mã hóa mật khẩu, cài đặt chương trình để đảo ngược xâu kết quả qua đó tìm ra flag.
# Phân tích thuật toán mã hóa mật khẩu
Chúng ta nên tìm đoạn mã kiểm tra mật khẩu trước tiên, sau đó truy ngược lại những dòng code trước đó để tìm ra đoạn mã mã hóa mật khẩu.
## Tìm đoạn mã kiểm tra mật khẩu
Load file thực thi vào Ghidra, kiểm tra danh sách các hàm mà chương trình sử dụng, chúng ta nhận thấy có hàm "**memcmp**" dùng để so sánh hai xâu với nhau:

![](https://images.viblo.asia/c6c44b4b-cc7f-485a-965b-eb5d08a62299.png)

Có khả năng hàm này được sử dụng để so sánh kết quả cuối cùng. Chúng ta sẽ kiểm chứng điều đó.

Tìm địa chỉ nơi gọi đến hàm "memcmp" (chuột phải vào tên hàm --> References --> Find references to memcmp):

![](https://images.viblo.asia/76bf8a84-da5c-44a4-bf00-91bf67fbf0ea.png)

Đi đến địa chỉ vừa tìm được:

![](https://images.viblo.asia/bb25b7de-b3b5-4a5f-a311-5d2a618a5635.png)

Nhận thấy dòng lệnh trên thuộc hàm "FUN_00101560" có một tham số. Đó có khả năng là xâu mật khẩu đọc vào từ bàn phím, và hàm này có khả năng là hàm kiểm tra mật khẩu. Chúng ta xác nhận bằng cách kiểm tra cách giá trị trả về của hàm này được sử dụng bởi hàm gọi nó.

Hàm "FUN_00101560" được gọi bởi hàm FUN_00101600:

![](https://images.viblo.asia/2a0e2158-a97b-4402-9b34-6f06e05cf3c1.png)

![](https://images.viblo.asia/ced57d6a-9383-4e88-a383-378bbd786b82.png)

Nếu kết quả trả về của "FUN_00101560" là 0 (hai xâu được so sánh trước đó giống nhau) thì sẽ in ra xâu "CORRECT PASSWORD" nếu không sẽ in ra "INCORRECT PASSWORD". Vậy "FUN_00101560" chính là hàm kiểm tra mật khẩu.

Ta gọi hàm "FUN_00101560" là "check_password".

Nhưng liệu dữ liệu truyền vào liệu có đúng là xâu ký tự được nhập? Cách nhanh nhất để xác nhận là debug.

Mở gdb chạy chế độ remote debugging để debug file thực thi "babyrev" (Lý do cho việc sử dụng remote debugging: file thực thi sử dụng full màn hình terminal, khi gdb break sẽ không thể cuộn lại những dòng trước đó)
* terminal 1:
    ![](https://images.viblo.asia/39dea261-ec36-45ed-8b7b-b94efab2116b.png)

   input đầu vào:
   ![](https://images.viblo.asia/43179c8b-bf83-4a54-a2a6-4094bd9be4dd.png)

* terminal 2:
    Kết nối đến gdbserver:
    
    ![](https://images.viblo.asia/de6ab2c7-3db5-40a9-8bf0-2f435c7fb10c.png)
    
    Tìm base address của image "babyrev" trên memory:
    
    ![](https://images.viblo.asia/d2598804-a92d-43ec-b9e6-ae35dc00d78c.png)

    Đặt breakpoint tại hàm "check_password":

    ![](https://images.viblo.asia/a4a77e80-01ee-4918-bccf-a415904490b9.png)

    Giá trị của các thanh ghi tại thời điểm break point được kích hoạt:

    ![](https://images.viblo.asia/45c1089e-6a48-42ec-aa68-5db1cc0f6699.png)
    
Vậy tham số truyền vào hàm "check_password" chính là chuỗi input gốc. Ta sẽ phân tích thuật toán mã hóa.
## Phân tích hàm "check_password"
Kết quả trả về của hàm "check_password" chính là kết quả so sánh giữa hai xâu trỏ tới bởi con trỏ "local_58" và tại địa chỉ "0x00104020":

![](https://images.viblo.asia/d374116b-d969-4ec0-91b4-3829fbf0c46b.png)

Do đó chắc chắn "local_58" là con trỏ đến chuỗi mật khẩu được mã hóa và "0x00104020" là địa chỉ của xâu mật khẩu đúng bị mã hóa. Ta gọi chúng lần lượt là "encoded_password" và "valid_encoded_password". Truy ngược lại đoạn code trước đó ta nhận thấy khối bộ nhớ mà nó trỏ tới được ghi vào theo các khối 8 byte, giá trị mỗi khối được tính toán bởi hàm FUN_001014d0, với tham số chính là địa chỉ tăng dần của xâu ký tự đầu vào:

![](https://images.viblo.asia/5cc72761-d86d-4077-a1e6-b60bfde93fda.png)

Chúng ta có thể miêu tả hoạt động của hàm "check_password như sau": Chương trình sẽ chia xâu đầu vào (có độ dài 32 bytes) thành 4 khúc, mỗi khúc dài 8 byte. Với mỗi 8 byte, hàm FUN_010014d0 sẽ thực hiện tính toán và trả về một giá trị kiểu long (8 byte) "uVar4". Giá trị này sẽ được ghi vào vị trí 8 byte tương ứng của mảng trỏ tới bởi "encoded_password". Do đó, để tìm được mật khẩu, chúng ta có thể chia xâu valid_encoded_password thành 4 khối 8 byte sau đó đảo ngược lại thuật toán của hàm "FUN_001014d0" để tính ra các giá trị ban đầu. Ta gọi hàm "FUN_001014d0" là "calculate_block".

## Phân tích hàm "calculate_block"
![](https://images.viblo.asia/571b4795-d8b0-4d19-92a3-0eb48f91981b.png)

Để ý đến giá trị mà hàm trả về (lưu trong biến "local_18"). Địa chỉ của biến này bị ghi vào thông qua con trỏ plVar1 tại dòng lệnh thứ 22:

![](https://images.viblo.asia/9c07074d-3ff4-4150-8632-3c6fcefd0913.png)

Giá trị được ghi vào là một byte, được tính bởi công thức (1):

![](https://images.viblo.asia/4b69288f-dffa-4c2f-abd0-1d3d2f15aa86.png)

Sau mỗi byte ghi được, địa chỉ của plVar1 được tăng thêm một đơn vị:

![](https://images.viblo.asia/6a67cafc-3526-4200-856e-dc3542151781.png)

Sau đó quá trình trên lặp lại, tổng cộng 8 lần (local_10 là địa chỉ ở ngay sau local_18 trên stack)

![](https://images.viblo.asia/2d0f4726-954e-4821-a355-52fa4d6b27c0.png)

Phân tích công thức tính ra một byte ở trên, ta nhận thấy:
* uVar3: byte đọc từ xâu đầu vào. Sau mỗi vòng lặp nhỏ, giá trị sẽ được dịch một bit sang phải.
* lVar4: index để duyệt xâu đầu vào
* local_18: byte thuộc địa chỉ chứa giá trị trả về. Đây là một sai sót của Ghidra, vì thực chất giá trị được sử dụng là \*(local_18 + index). Bằng chứng:
    * ![](https://images.viblo.asia/9596e708-ea2b-4502-b3d2-4601ff41c4a5.png)

Vậy chúng ta có thể suy ra được công thức tính của hàm calculate_block: Hàm sẽ duyệt từng byte trong xâu ký tự tham số truyền vào, với mỗi byte ký tự truyền vào, chương trình sẽ chạy một vòng lặp cập nhật từng byte trong chuỗi giá trị đầu ra. Trong mỗi vòng lặp công thức (1) sẽ được áp dụng. Như vậy, tất cả các bit cuối cùng của mỗi byte truyền vào sẽ tạo nên byte đầu tiên trong chuỗi đầu ra, bit thứ hai từ dưới lên của mỗi byte truyền vào sẽ tạo nên byte thứ hai trong chuỗi đầu ra, cứ như vậy, bit đầu tiên của mỗi byte truyền vào sẽ tạo nên byte cuối cùng trong chuỗi đầu ra.

# Viết chương trình giải mật khẩu
## Thuật toán giải mã
Chúng ta sẽ đảo ngược lại thuật toán trên bằng cách:
* Chia xâu kiểm tra thành 4 khối, mỗi khối dài 8 byte.
* Với mỗi khối:
    * Đảo ngược 8 byte (do chương trình ghi 8 byte vào trong khối dưới dạng số nguyên dạng long, do đó thứ tự sẽ bị đảo lộn)
    * Phân tích mỗi byte ra dạng nhị phân. Chúng ta có một ma trận 8x8.
    * Sử dụng các bit có cùng thứ tự của mỗi byte để tạo thành 8 byte mới (áp dụng phép nghịch đảo ma trận)
    * Ghép các byte mới vào xâu kết quả.
* Chúng ta thu được flag.
## Code
```
from textwrap import wrap
import numpy as np

valid_encoded_password = "\xa4\xad\xc0\xa3\xfd\x7f\xab\x00\xe8\xd5\xe2\x48\xda\xbf\xfd\x00\xd1\x40\xf2\xc4\x7b\xbf\x76\x00\x87\x07\xd5\xad\xae\x82\xfd\x00"
valid_encoded_password_blocks = wrap(valid_encoded_password, 8) # split the strings to blocks of 8-byte
password = ""
for block in valid_encoded_password_blocks:
    block = block[::-1]
    matrix = []
    for byte in block:
        byte = ord(byte)
        byte = bin(byte)[2:].zfill(8)
        bits = wrap(byte, 1)[::-1]
        matrix.append(bits)

    matrix = np.array(matrix).T

    for byte in matrix:
        str_byte_binary = '0b' + ''.join(x for x in byte)
        byte = int(str_byte_binary, base=2)
        password = password + chr(byte)

print(password)
```
Chúng ta thu được flag:
```
zh3r0{4_b4byre_w1th0ut_-O3_XDXD}
```
# Kết luận
Trên đây là bài write up cách giải của mình với challenge "babyRE" của cuộc thi "zh3r0 CTF 2021". Đây là một challenge khá đơn giản, phù hợp với những người mới bắt đầu, nhưng nếu không cẩn thận ở bước đọc thuật toán mã hóa và cài đặt chương trình, người làm rất có thể sẽ bỏ phí nhiều thời gian quý báu. 

Nhân tiện, đây cũng là bài viết đầu tiên của mình trên Viblo, rất mong nhân được sự ủng hộ của mọi người để mình có động lực tiếp tục những bài viết tương tự và ngày càng cải thiện chất lượng. Chúc các bạn thành công trong công việc. Happy hacking!