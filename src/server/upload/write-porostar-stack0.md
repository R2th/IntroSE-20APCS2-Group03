Chào mọi người, đây là bài đầu tiên mình làm về Porostar, phần này mình sẽ viết về stack, bắt đầu từ stack0. Đây là bài write đầu tiên của mình, có sai sót gì mong các bạn góp ý ở dưới.
Về cơ bản, các bài writeup của mình sẽ giải thích chi tiết cách hoạt động của từng phần.
Link tải và cài đặt các bạn xem ở đây: https://exploit.education/protostar/stack-zero/
Sau khi cài đặt máy ảo về, các bạn có thể suy cập thẳng từ máy ảo, hoặc truy cập ssh với username, passwd là user – user. Gõ bash để truy cập chế độ dòng lệnh, các file bài tập lưu ở /opt/porostar/bin.

![](https://images.viblo.asia/43cfa798-2515-4439-8b86-14a4b19fd58c.png)

Tiếp theo sử dụng gdb để debug stack0

![](https://images.viblo.asia/cc7eafed-2df6-4fba-a798-000ffa2d5bad.png)

Đầu tiên  mình thực hiện 1 số cài đặt cơ bản, chuyển flavor về intel vì mình quen với chế độ này, các bạn có thể giữ nguyên. Cài đặt break ở *main, thực hiện `disassembly main`được kết quả như sau:

![](https://images.viblo.asia/d8aabafd-3e72-4578-8ff0-95e0a8823188.png)
	
Phần này liên quan đến stack, cơ chế stack là LIFO (last in first out), đặc trưng bởi 2 thao tác là push và pop. ESP và EBP là 2 thanh ghi hỗ trợ làm việc trên stack. ESP (stack pointer) là con trỏ stack, trỏ đến đỉnh stack, giá trị của esp sẽ thay đổi mỗi khi stack thực hiện push hay pop. EBP (base pointer) là con trỏ cơ bản, có giá trị không đổi trong 1 hàm cho trước, chương trình coi nó như là 1 người giữ chỗ để theo dõi các biến cục bộ và tham số.
Ở 2 dòng đầu tiên, thực hiện push ebp và stack, sau đó lưu trữ ebp = esp. Để xem chi tiết hơn, ta thực hiện cài đặt hook-stop. Hiểu 1 cách đơn giản, hook-stop là 1 hàm sẽ thực hiện mỗi khi gặp break.

 ![](https://images.viblo.asia/c15e6b7c-3495-4f65-919c-35f29cac3ef2.png)

info registers : in ra thông tin các thanh ghi 
x/32wx: in ra 32 giá trị lưu trong stack từ $esp 
x/2i: in ra 2 dòng lệnh kế tiếp sau break
Tham khảo thêm về các sử dụng x command: https://visualgdb.com/gdbreference/commands/x
Sau khi cài đặt hook-stop, mình thực hiện run chương trình, chương trình sẽ thực hiện break tại *main, kế tiếp có thể sử dụng si để chạy step và xem sự thay đổi của thanh ghi. 
Ta thấy trong hàm main có lệnh gọi hàm khác là gets và puts. Hàm gets sẽ lấy dữ liệu từ bàn phím, tuy nhiên hàm này có thể gây lỗi buffer overflow. 
 
5 dòng kế tiếp để cấp phát bộ nhớ cho mảng buffer[64] và thực hiện gán biến modified = 0;
Biến modified lưu tại địa chỉ esp + 0x5c.

![](https://images.viblo.asia/ff5bb128-c9eb-4413-b2aa-6b8789ee5fd4.png)

Đặt break tại gets. Sau đó chạy c (sử dụng để continue chạy chương trình).

![](https://images.viblo.asia/52016a06-3a76-4bf5-bcdf-64c266fd2cc0.png)
 
Vị trí bôi xanh trong ảnh chính là biến modified. Eax lúc này mang địa chỉ 0xbffff75c, vị trí của biến modified là 0xbffff79c. Hàm gets sẽ thực hiện lấy dữ liệu bắt đầu từ địa chỉ mang trong eax, nếu ta tính toán thì từ 0xbffff79c đến 0xbffff75c sẽ là 64bits, tương ứng với 64bytes (Mỗi bits địa chỉ chứa 1 bytes dữ liệu). Đặt break phía sau gets (break *0x08048411), thực hiện gets với 64 kí tự A ta được kết quả như sau:

 ![](https://images.viblo.asia/92f99aac-d8ed-4d35-9267-6a778f927917.png)

0x41 chính là giá trị của ‘A’ trong bảng ascii, có thể thấy nếu ta thực hiện thêm 1 kí tự, vị trí lưu biến modified sẽ bị thay đổi, thực hiện chạy lại chương trình, thêm vào 65 kí tự A, và đây là kết quả:
 
 ![](https://images.viblo.asia/e4a58665-5860-4df5-91c6-65298139cbaa.png)

Biến modified đã bị thay đổi. Run hết chương trình, ta được kết quả mong muốn:
 
 ![](https://images.viblo.asia/f2adfdac-917e-4069-ba2a-f4e3fcad976d.png)

Ngoài ra, ở 2 dòng cuối của hàm main có lệnh leave có tác dụng leave: Đặt esp = ebp và pop ebp from stack, đó là lý do ban đầu ta sử dụng ebp để lưu esp.
Tương tự các bạn có thể thử với stack1 và stack2.
Cảm ơn các bạn đã đọc bài của mình, nếu có ý kiến các bạn để lại comment ở dưới để mình rút kinh nghiệm nhé.