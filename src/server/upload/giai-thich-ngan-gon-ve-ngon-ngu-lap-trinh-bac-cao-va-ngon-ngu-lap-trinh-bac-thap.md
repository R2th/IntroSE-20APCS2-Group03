Dịch từ bài viết [”低水準言語と高水準言語とは？5分でわかりやすく解説！”](https://jpazamu.com/programming-level/)

Dựa vào đặc trưng mà ngôn ngữ lập trình có thể được chia thành ngôn ngữ lập trình bậc cao và ngôn ngữ lập trình bậc thấp.

Vậy thì, tiêu chuẩn cao/thấp đối với ngôn ngữ lập trình là gì, và ưu điểm của mỗi loại ngôn ngữ như thế nào?

Trong bài viết sau đây, tôi sẽ giải thích một cách dễ hiểu 2 vấn đề nêu trên.
# 1.Tiêu chuẩn ngôn ngữ lập trình
Tiểu chuẩn phân loại ngôn ngữ lập trình kỳ thực rất đơn giản.

Một ngôn ngữ gần với ngôn ngữ máy tính thì được coi ngôn ngữ lập trình bậc cao; ngược lại, ngôn ngữ gần với ngôn ngữ tự nhiên của con người sẽ được gọi là ngôn ngữ lập trình bậc cao. 
## Ngôn ngữ càng gần với ngôn ngữ của con người bậc của ngôn ngữ ấy càng cao?
Ngôn ngữ lập trình bậc thấp, tiếng anh là low-level programming language. Bậc thấp ở đây nhằm chỉ việc ngôn ngữ thuộc về tầng thứ thấp hơn, nói cách khác, ngôn ngữ ghi chép và đưa ra những lệnh chi tiết và cụ thể hơn cho các hoạt động của máy tính.

Mặt khác, ngôn ngữ bậc cao, hay high-level programming language, là ngôn ngữ thuộc về tầng thứ cao hơn, những lệnh chi tiết và cụ thể hơn sẽ do compiler xử lý. 
## Vậy tiêu chuẩn ở đây chính là tầng thứ (dimension) của việc xử lý？
Từ Tầng thứ (dimension) mà tôi dùng trong giải thích trên có thể có đôichút khó hiểu. Tầng thứ (dimension) ở đây có đôi chút khác với Dimention của 2D, 3D mà bạn vẫn quen thuộc trong toán học. Dimension dùng để chỉ cấp độ xem xét một vật thể. 

Hãy cùng xem xét ví dụ về tầng thứ của một miếng khoai tây chiên chẳng hạn.

Việc xem xét nó dưới góc độ phân tử và nguyên tử sẽ được xem là quan sát ở tầng thứ thấp.

Vậy thì, tầng thứ đối với máy tính cũng tương tự như vậy.
# 2.Ngôn ngữ lập trình bậc thấp（low-level programming language）
Trong số các ngôn ngữ lập trình, hợp ngữ -  Assembly language được goi là một ví dụ tiêu tiểu cho ngôn ngữ lập trình bậc thấp. Nó là tên gọi chung của các ngôn ngữ không phải ngôn ngữ máy, nhưng rất gần với ngôn ngữ máy.

Hợp ngữ là phiên bản dễ hiểu hơn đối với con người so với ngông ngữ của máy tính chỉ được kết cấu bởi 2 trạng thái có điện lưu (1) và không có điện lưu (0).
## Đặc trưng và ưu điểm của ngôn ngữ lập trình bậc thấp
Các ngôn ngữ bậc thấp như Ngôn ngữ máy và hợp ngữ có những đặc trưng và ưu điểm như sau:

* Dễ hiểu đối với máy tính: Máy tính có thể lập tức hiểu và thực hiện chỉ thị viết bằng ngôn ngữ máy. Ngược lại, đối với con người, thật khó để hình dung chuyện gì đang diễn ra
* Có thể viết được những xử lý đặc trưng riêng cho từng platform 
* Có thể thực hiện thao tác ở cấp độ CPU như thao tác với bộ nhớ, khống chế IO

**Một ví dụ về chương trình viết bằng hợp ngữ**
```
XOR	r0, r0,	r0
		ADDI	r8,	r0,	0
		ADDI	r10,	r0,	512
		ADDI	r14,	r0,	1
		ADDI	r8,	r0,	0
		ADDI	r24,	r0,	400

	FOR0S:
		BLE	r24,	r8,	FOR0E
		ADD	r15,	r8,	r10
		SW	r14,	0(r15)
		ADDI	r8,	r8,	4
		J	FOR0S

	FOR0E:
		SW	r0,	0(r10)
		SW	r0,	4(r10)
		ADDI	r9,	r0,	2
		ADDI	r25,	r0,	51

	FOR1S:
		BLE	r25,	r9,	FOR1E
		SLL	r14,	r9,	2
		ADD	r15,	r10,	r14
		LW	r11,	0(r15)
		BNE	r0,	r11,	IF0E
		ADDI	r9,	r9,	1
		J	FOR1S

	IF0E:
		SLL	r14,	r9,	3
		ADD	r8,	r0,	r14
		ADDI	r24,	r0,	400
	
	FOR2S:
		BLE	r24,	r8,	FOR2E
		ADD	r15,	r8,	r10
		SW	r0,	0(r15)
		SLL	r14,	r9,	2
		ADD	r8,	r8,	r14
		J	FOR2S

	FOR2E:
		ADDI	r9,	r9,	1
		J	FOR1S

	FOR1E:
		ADDI	r8,	r0,	8
		ADDI	r24,	r0,	400

	FOR3S:
		BLE	r24,	r8,	FOR3E
		ADD	r15,	r8,	r10
		LW	r11,	0(r15)
		BEQ	r0,	r11,	IF1E
		SRA	r14,	r8,	2
		ADD	r15,	r8,	r10
		SW	r14,	0(r15)

	IF1E:
		ADDI	r8,	r8,	4
		J	FOR3S

	FOR3E:
		HALT
```
**Một ví dụ về chương trình viết bằng ngôn ngữ máy:**
```
00000000000000000000000000001010
00000100000010000000000000000000
00000100000010100000001000000000
00000100000011100000000000000001
00000100000010000000000000000000
00000100000110000000000110010000
10001111000010000000000000010000
00000001000010100111100000000000
01100001111011100000000000000000
00000101000010000000000000000100
10100000000000000000000000011000
01100001010000000000000000000000
01100001010000000000000000000100
00000100000010010000000000000010
00000100000110010000000000110011
10001111001010010000000001000100
00000001001000000111000010010000
00000001010011100111100000000000
01000001111010110000000000000000
10000100000010110000000000001000
00000101001010010000000000000001
10100000000000000000000000111100
00000001001000000111000011010000
00000000000011100100000000000000
00000100000110000000000110010000
10001111000010000000000000010100
00000001000010100111100000000000
01100001111000000000000000000000
00000001001000000111000010010000
00000001000011100100000000000000
10100000000000000000000001100100
00000101001010010000000000000001
10100000000000000000000000111100
00000100000010000000000000001000
00000100000110000000000110010000
10001111000010000000000000100000
00000001000010100111100000000000
01000001111010110000000000000000
10000000000010110000000000001100
00000001000000000111000010010010
00000001000010100111100000000000
01100001111011100000000000000000
00000101000010000000000000000100
10100000000000000000000010001100
11111100000000000000000000000000
```
Có phải bạn thấy rất khó hiểu không? Đây chính là thế giới của ngôn ngữ lập trình bậc thấp
# 3. Ngôn ngữ lập trình bậc cao （high-level programming language）
Ngược lại với ngôn ngữ lập trình bậc thấp là ngôn ngữ lập trình bậc cao. Hiện nay, phần lớn programming languages được phân loại vào nhóm này.

So với các ngôn ngữ lập trình khác, tầng thứ của ngôn ngữ C thấp hơn, tuy nhiên, nó vẫn được phân loại là một ngôn ngữ lập trình bậc cao.

## Đặc trưng và ưu điểm của ngôn ngữ lập trình bậc cao:
* Dễ hiểu đối với con người: Do được viết gần hơn với ngôn ngữ tự nhiên của con người nên đối với chúng ta, tất nhiên ngôn ngữ lập trình bậc cao sẽ dễ hiểu hơn. Thực tế khi nhìn vào một đoạn code viết bằng ngôn ngữ lập trình bậc cao, không phải ai cũng hiểu được, tuy nhiên, khi so sánh với hợp ngữ và ngôn ngữ máy, chắc hẳn ai cũng phải đồng tình rằng ngôn ngữ bậc cao dễ hiểu hơn nhiều.
* Có thể dựa vào những process sẵn có để thiết lập các xử lý mới
* Không cần phải chú ý các thao tác bậc thấp như  khống chế bộ nhớ

**Một ví dụ với chương trình viết bằng ngôn ngữ C**
```
#include <stdio.h>

int main()
{
	printf("Hello, world\n");
	return 0;
}
```
**Viết chương trình bằng Java**
```
public class Hello_world {
	public static void main(String[] args) {
		System.out.println("Hello, world");
	}
}
```
# 4.Học loại ngôn ngữ nào thì khó hơn? Tất nhiên là ngôn ngữ lập trình bậc thấp
Tất nhiên, việc học ngôn ngữ lập trình bậc thấp sẽ khó khăn hơn rất nhiều so với ngôn ngữ bậc cao. Bạn cần phải chú ý cả về việc control bộ nhớ nữa, nên tất nhiên lượng kiến thức cần học sẽ nhiều lên. Và giống như ví dụ tôi vừa đưa ra ở trên, việc học để hiểu được source code của ngôn ngữ máy và hợp nghĩ cần “nghị lực” vô cùng lớn. Không biết các bạn thấy sao, nhưng tôi thì tuyệt đối không đủ động lực theo đuổi loại ngôn ngữ này.

Chắc hẳn chúng ta đều đồng ý rằng ngôn ngữ lập trình bậc cao thân thiện và gần gũi hơn. Ví dụ như trong Python, Java, v.v, các từ #include, #define đều xuất phát từ tiếng Anh, chỉ cần hiểu tiếng Anh thì bạn có thể hình dung đại khái ý nghĩa của chúng đúng không nào? Việc dịch những câu lệnh bạn viết ra thành ngôn ngữ máy để máy tính thực hiện thì đã có compiler lo.
# 5.Kết luận:
Chắc hẳn bạn đã hiểu tiêu chuẩn tầng thứ trong ngôn ngữ lập trình. Đối với những người mới bắt đầu học lập trình, tôi nghĩ các bạn hãy thử từ ngôn ngữ lập trình bậc cao trước. Tuy nhiên, nếu bạn cảm thấy ngôn ngữ lập trình bậc thấp thú vị hơn nhiều, hay quyết tâm chinh phục ngôn ngữ máy thì tôi cũng không ngăn cản đâu. Nhưng hãy chú ý đừng để mình trở thành robot nhé!

*À, nhắc đến Robot, gần đây AI đang là một nghành rất hot nhỉ? Hãy tra cứu thêm về lĩnh vực thú vị này nếu muốn!*