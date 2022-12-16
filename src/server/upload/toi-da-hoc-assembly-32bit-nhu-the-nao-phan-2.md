Sau khi ôn lại các kiến thức nền tảng về biểu diễn dữ liệu, phần tiếp theo chúng ta cần nắm vững để có thể code Assembly 32bit là kiến thức về các thanh ghi.

## 3. Các thanh ghi 32 bit
Trong Assembly, các lệnh sẽ rất gần với mã máy. Đối với máy tính thì không có khái niệm biến như chúng ta thường sử dụng trong các ngôn ngữ bậc cao.

Thay vào đó, chúng ta sẽ thao tác qua các thanh ghi và bộ nhớ.

![](https://images.viblo.asia/7fa6d603-ce53-438a-9b1f-d24b9d3a3453.png)

### 3.1 Thanh ghi đa năng
Các thanh ghi đa năng có thể được chia thành 3 nhóm:
- Nhóm thanh ghi dữ liệu
- Nhóm thanh ghi con trỏ
- Nhóm thanh ghi chỉ số


#### 3.1.1 Thanh ghi dữ liệu
![](https://images.viblo.asia/1cee2a35-96b7-4453-9342-b0952c5e6109.png)
Có 4 thanh ghi dữ liệu:
- EAX: thanh ghi tích lũy. Thường được dùng trong nhập xuất và các lệnh tính toán số học như nhân, chia.
- EBX: thanh ghi cơ sở. Thường được dùng để đánh dấu địa chỉ, lưu địa chỉ bắt đầu của 1 mảng.
- EDX: thanh ghi dữ liệu. Thanh ghi này cũng thường được sử dụng trong nhập xuất như EAX
- ECX: thanh ghi đếm. Thường được dùng trong vòng lặp, đếm số lần lặp.

![](https://images.viblo.asia/c09e8f41-d5da-46d5-8fb7-b4097881b0fa.png)
Mỗi thanh ghi trên được chia thành các đoạn nhỏ hơn như sau:
- Nhỏ nhất là hai thanh ghi 8 bit AH và AL.
- Hai thanh ghi AH và AL hợp lại thành thanh ghi 16 bit AX. Trong đó AH chứa phần bit cao và AL chứa phần bit thấp của thanh ghi AX.
- Thanh ghi AX chứa phần bit thấp của thanh ghi 32 bit EAX.

Cách chia nhỏ này tương tự với 3 thanh ghi đa năng còn lại.

Bit cao và bit thấp là sao ? Lấy VD với thanh ghi AX. Thanh ghi 16 bit AX gồm 2 phần:
- 8 bit cao AH
- 8 bit thấp AL

Việc thay đổi giá trị của 2 thanh ghi trên sẽ làm thay đổi giá trị của AX.  
Giả sử ban đầu AX = 0 thì trong AX sẽ trông như này: 00000000 00000000b  
- Nếu ta gán cho AL giá trị 5 thì lúc này giá trị của AX cũng là 5: 00000000 00000101b  
- Nếu ta gán cho AH giá trị 5 thì lúc này giá trị của AX sẽ là 1280: 00000101 00000000b  
- Nếu ta gán cho cả AH và AL giá trị 5 thì lúc này AX sẽ mang giá trị 1285: 00000101 00000101b

Việc thay đổi giá trị của AX cũng sẽ làm EAX thay đổi theo. Tuy nhiên, chúng ta chỉ có thể trực tiếp thay đổi giá trị 16 bit thấp của EAX (tức AX), muốn thay đổi giá trị 16 bit cao của EAX thì sẽ cần sử dụng các thủ thuật khác, ví dụ như dịch bit trái (<<).

#### 3.1.2 Thanh ghi con trỏ
Có 3 thanh ghi con trỏ là EIP, ESP và EBP. Ba thanh ghi này cũng được chia nhỏ ra 3 thanh ghi 16 nữa là IP, SP và BP.

![](https://images.viblo.asia/03691dd0-2fed-4ad2-a390-c786e6306bba.png)

EIP và IP là các thanh ghi con trỏ lệnh (Instruction Pointer), trỏ tới địa chỉ chứa lệnh tiếp theo sẽ được thực thi. Thanh ghi IP kết hợp cùng thanh ghi CS sẽ cho biết địa chỉ chính xác của instruction tiếp theo trong code segment (chúng ta sẽ tìm hiểu về code segment và các segment khác sau).

ESP và SP là các thanh ghi con trỏ stack (Stack Pointer), trỏ tới đỉnh hiện thời của stack. SP cùng với thanh ghi SS tham chiếu tới vị trí hiện tại của dữ liệu hoặc địa chỉ nằm trong program stack.

EBP và BP là các thanh ghi con trỏ cơ sở (Base Pointer), thường dùng để tham chiếu đến các biến tham số sử dụng trong chương trình con.

Khi code Assembly thì chúng ta sẽ chủ yếu làm việc với ESP và EBP nhiều hơn EIP.

#### 3.1.3 Thanh ghi chỉ số
Các thanh ghi chỉ số (Index Register) thường được dùng để đánh chỉ số cho các địa chỉ của mảng, xâu. Đôi khi sẽ được sử dụng trong các phép tính số học. ESI và EDI cũng được chia thành các thanh ghi 16 bit SI và DI.

![](https://images.viblo.asia/6075d81d-e59a-4587-8f7b-cefd8b9fa636.png)

ESI và SI (Source Index) được sử dụng làm địa chỉ nguồn cho các phép toán với xâu.

EDI và DI (Destination Index) được sử dụng làm địa chỉ đích cho các phép toán với xâu.

### 3.2 Thanh ghi điều khiển
Thanh ghi con trỏ lệnh 32 bit và thanh ghi cờ 32 bit (Flags Register) kết hợp với nhau được coi là thanh ghi điều khiển.

Trong Assembly không có các cấu trúc điều khiển: if else, while, do while,... như trong các ngôn ngữ lập trình bậc cao. Để sử dụng các cấu trúc này chúng ta sẽ cần kết hợp các lệnh so sánh, lệnh nhảy và giá trị của các cờ. 

Trong phần này thì mình sẽ chỉ nói về việc thay đổi giá trị của các cờ, còn sử dụng các cờ như nào sẽ có trong phần sau.

![](https://images.viblo.asia/659fbfe6-622d-4a18-9fab-853a21e922f7.png)

Thanh ghi cờ có độ dài 16 bit, nhưng không phải toàn bộ 16 bit đó đều được sử dụng để biểu diễn giá trị cờ:
- Cờ tràn (Overflow Flag - OF) bằng 1 khi kết quả của phép toán có dấu lớn hơn so với kích thước của địa chỉ đích.
- Cờ hướng (Direction Flag - DF) xác định hướng trái hay phải cho việc di chuyển hoặc so sánh chuỗi dữ liệu. Khi giá trị DF bằng 0, chuỗi hoạt động lấy từ trái qua phải và ngược lại khi DF bằng 1.
- Cờ ngắt (Interupt Flag - IF) xác định khi nào các ngắt ngoài như nhập dữ liệu từ bàn phím được xử lý. Khi IF bằng 1 thì tín hiệu ngắt sẽ được xử lý, ngược lại thì bỏ qua.
- Cờ dừng (Trap Flag - TF - chẳng biết dịch thành từ gì cho sát nghĩa nhất ???) hỗ trợ thực thi chương trình theo Single-step mode. Trình Debug chúng ta thường sử dụng sẽ đặt giá trị cho TF, nhờ đó chúng ta có thể thực thi từng lệnh một.
- Cờ dấu (Sign Flag - SF) cho biết kết quả của phép toán số học là âm hay dương. Giá trị của SF tùy thuộc vào giá trị của bit ngoài cùng bên trái (High order bit - Most significant bit). SF bằng 1 nếu kết quả của phép toán số học là một giá trị âm.
- Cờ không (Zero Flag - ZF) thể hiện kết quả của phép toán số học hoặc phép so sánh. Cờ dấu có giá trị bằng 1 khi kết quả của phép toán bằng 0, hoặc phép so sánh cho kết quả bằng nhau. Ngược lại, khi kết quả khác không hoặc so sánh cho kết quả là khác nhau thì ZF bằng 0.
- Cờ nhớ (Carry Flag - CF) chứa giá trị nhớ (nhớ 0, hoặc nhớ 1) của MSB sau khi thực hiện phép toán số học. Ngoài ra, khi thực hiện lệnh dịch bit (shift) hoặc quay (rotate) thì giá trị của bit bị đẩy ra cuối cùng sẽ được lưu tại CF.  
VD: giá trị 0000 1101 sau khi dịch phải 1 bit sẽ trở thành 0000 0110, bit 1 bị đẩy ra sẽ được lưu trong CF (CF = 1). Trong trường hợp nếu dịch phải 2 bit thì bit cuối cùng bị đẩy ra sẽ là bit 0, lúc này CF = 0. Tương tự với khi dịch trái.
- Cờ nhớ phụ trợ (Auxiliary Carry Flag - AF) chứa giá trị nhớ khi chuyển từ bit có trọng số 3 lên bit có trọng số 4 (nhớ từ lower nibble sang high nibble) khi thực hiện phép toán số học.

![](https://images.viblo.asia/686b6d60-b999-4aa7-92f6-e731c652bbe1.jpeg)

- Cờ chẵn lẻ (Parity Flag - PF) bằng 0 khi số lượng bit 1 trong trong kết quả của phép toán số học là một số chẵn, và bằng 1 khi số lượng bit 1 là một số lẻ. Trong một số trường hợp, PF còn được dùng để kiểm tra lỗi.

Trong các cờ trên thì DF, IF và TF là 3 cờ điều khiển. OF, SF, ZF, CF, AF và PF là 6 cờ trạng thái.

### 3.3 Thanh ghi đoạn
Một chương trình Assembly được chia thành các đoạn (Segment) chứa dữ liệu, code và stack:
- Code segment: chứa các mã lệnh thực thi. Thanh ghi đoạn code CS chứa địa chỉ bắt đầu của Code segment.
- Data segment: chứa các biến, hằng số, dữ liệu của chương trình. Thanh ghi đoạn dữ liệu DS chứa địa chỉ bắt đầu của Data segment.
- Stack segment: chứa dữ liệu và địa chỉ trả về của các chương trình con. Các dữ liệu này được lưu trữ theo cấu trúc Stack. Thanh ghi đoạn stack SS chứa địa chỉ bắt đầu của Stack segment.

Ngoài CS, DS và SS ra còn có các thanh ghi đoạn ES (Extra Segment Register), FS và GS cung cấp các phân đoạn bổ sung cho việc lưu trữ dữ liệu.

![](https://images.viblo.asia/df5c9a13-b1e9-49bc-91aa-22b8ce5df1d8.png)

Các chương trình Assembly đều cần truy cập tới bộ nhớ. Tất cả vị trí trong bộ nhớ thuộc các phân đoạn đều phụ thuộc vào địa chỉ bắt đầu của phân đoạn đó. Do các thanh ghi đoạn lưu địa chỉ bắt đầu của phân đoạn, để xác định chính xác địa chỉ của 1 dữ liệu hoặc 1 lệnh thuộc phân đoạn, cần có thêm giá trị offset. Địa chỉ thực tế sẽ được tính bằng cách cộng thêm giá trị offset vào địa chỉ đầu phân đoạn.