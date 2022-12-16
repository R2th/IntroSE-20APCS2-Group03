Như đã đề cập ở phần trước, Assembly là một ngôn ngữ lập trình bậc thấp. Trong Assembly thì không có các lệnh "nhanh gọn" như trong các ngôn ngữ lập trình bậc cao (C/C++, Java, Python,...).  
Để chỉ định cho máy tính thực hiện các công việc cụ thể, chúng ta phải dùng các chỉ thị (hoặc có thể gọi là lệnh) để thao tác với các thanh ghi và bộ nhớ.

Trong phần này, chúng ta sẽ tìm hiểu về các chế độ địa chỉ và cấu trúc một chương trình Assembly.

### 4 Cấu trúc lệnh
Các lệnh trong asm có cấu trúc như sau:
```
<Lệnh>         [Toán hạng đích]    [Toán hạng nguồn]   ; <chú thích>
<Instruction>  [Destination]       [Source address]    ; <comment>
```
Mỗi lệnh chỉ có 1 toán hạng đích, và có thể có nhiều hơn 1 toán hạng nguồn. Nhưng  chúng ta sẽ thấy các lệnh 2 toán hạng là chính.

Mỗi lệnh trong asm được viết trên 1 dòng. Phần sau dấu ```;``` (semi-colon) là comment, không được biên dịch thành mã máy.

### 5. Các chế độ địa chỉ (addressing modes)

Các bạn không cần phải chú ý quá đến các lệnh mình đề cập trong ví dụ, mình sẽ nói kỹ hơn về các lệnh này sau. Ở phần này chúng ta chỉ cần hiểu các chế độ địa chỉ hoạt động như nào là được.

#### 5.1 Chế độ địa chỉ thanh ghi (Register Addressing)
Trong chế độ này, các thanh ghi có thể là toán hạng nguồn, toán hạng đích, hoặc là cả hai.
```
MOV DX, TAX_RATE   ; Register in first operand
MOV COUNT, CX	   ; Register in second operand
MOV EAX, EBX	   ; Both the operands are in registers
```

#### 5.2 Chế độ địa chỉ tức thì (Immediate Addressing)
Trong chế độ này, toán hạng nguồn là hằng số, toán hạng đích có thể là 1 thanh ghi hoặc 1 địa chỉ ô nhớ.
```
BYTE_VALUE  DB  150    ; A byte value is defined
WORD_VALUE  DW  300    ; A word value is defined
ADD  BYTE_VALUE, 65    ; An immediate operand 65 is added
MOV  AX, 45H           ; Immediate constant 45H is transferred to AX
```

#### 5.3 Chế độ địa chỉ trực tiếp (Direct Memory Addressing)
Trong chế độ này, một toán hạng là giá trị tham chiếu trực tiếp đến địa chỉ trên bộ nhớ (qua biến), toán hạng còn lại là thanh ghi.
```
ADD	BYTE_VALUE, DL	; Adds the register in the memory location
MOV	BX, WORD_VALUE	; Operand from the memory is added to register
```

#### 5.4 Chế độ địa chỉ trực tiếp dựa vào độ lệch (Direct-Offset Addressing)
Trong chế độ này, độ lệch (offset) kết hợp với các toán tử số học để xác định địa chỉ trên bộ nhớ.
```
BYTE_TABLE DB  14, 15, 22, 45      ; Tables of bytes
WORD_TABLE DW  134, 345, 564, 123  ; Tables of words

MOV CL, BYTE_TABLE[2]	; Gets the 3rd element of the BYTE_TABLE
MOV CL, BYTE_TABLE + 2	; Gets the 3rd element of the BYTE_TABLE
MOV CX, WORD_TABLE[3]	; Gets the 4th element of the WORD_TABLE
MOV CX, WORD_TABLE + 3	; Gets the 4th element of the WORD_TABLE
```

#### 5.5 Chế độ địa chỉ gián tiếp (Indirect Memory Addressing)
Trong chế độ này, địa chỉ của ô nhớ chứa toán hạng được lưu trong thanh ghi (thường là các thanh ghi con trỏ EBP, ESP). Đặt các thanh ghi này vào trong ngoặc vuông sẽ cho phép truy cập giá trị tại ô nhớ đó.

Chế độ địa chỉ này thường được sử dụng để truy cập mảng.
```
MY_TABLE TIMES 10 DW 0  ; Allocates 10 words (2 bytes) each initialized to 0
MOV EBX, [MY_TABLE]     ; Effective Address of MY_TABLE in EBX
MOV [EBX], 110          ; MY_TABLE[0] = 110
ADD EBX, 2              ; EBX = EBX +2
MOV [EBX], 123          ; MY_TABLE[1] = 123
```
Chế độ này tương tự với con trỏ trong C. Các bạn có thể so sánh qua ví dụ bằng code C dưới dây, kết quả đoạn code dưới đây và đoạn code Assembly ở trên là tương tự (mình code thêm 2 dòng printf để tiện theo dõi giá trị).
```C
#include <stdio.h>

int main(void) {
	int a[10] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
	int *p;
	p = &a;
	
	*p = 110;
	*(p + 1) = 123;
	
    // In ra tiện theo dõi giá trị đã thay đổi
	for(int i = 0; i < 10; ++i) {
		printf("%d ", *(p + i));
	}
	
	return 0;
}
```

### 6. Cấu trúc một chương trình Assembly

#### 6.1. MASM (windows)

Một chương trình assembly trên windows có thể chia thành 3 phần sau:
- Section data: khai báo các dữ liệu khởi tạo, các hằng số, các giá trị không thay đổi trong quá trình chạy.  
Khai báo:
```
section .data
```
- Section code: phần chứa các mã lệnh thực thi của chương trình.  
Khai báo:
```
.code
    start:
    <nội dung chương trình>
    end start
```
- Các section khác: khai báo các thông tin về cấu hình, thư viện cho chương trình,...  
Mình thường khai báo như sau:
```
.386
.model flat, stdcall
option casemap: none

include windows.inc
include user32.inc
include kernel32.inc
includelib user32.lib
includelib kernel32.lib
```

Chương trình HelloWorld viết bằng MASM sử dụng Win32 API trên Windows:
```
.386
.model flat, stdcall
option casemap: none

include windows.inc
include user32.inc
include kernel32.inc
includelib user32.lib
includelib kernel32.lib

.data
    szCaption   db  'Hello', 0
    szText      db  'Hello, World!', 0

.code
    start:
            invoke MessageBox, NULL, offset szText, offset szCaption, MB_OK
            invoke ExitProcess, NULL        
    end start
```

#### 6.2. NASM (linux)

Một chương trình assembly trên linux gồm 3 phần chính sau (3 sections):
- Section data: khai báo các dữ liệu khởi tạo, các hằng số, các giá trị không thay đổi trong quá trình chạy.  
Khai báo:
```
section .data
```
- Section bss: khai báo các biến.  
Khai báo:
```
section .bss 
```
- Section text: phần chứa các mã lệnh thực thi của chương trình. Phần này cần bắt đầu với dòng khai báo **global _start**.  
Khai báo:
```
section.text
   global _start
_start:
```

Chương trình HelloWorld viết bằng NASM trên Linux:
```
section	.text
   global _start     ;must be declared for linker (ld)
	
_start:	            ;tells linker entry point
   mov	edx,len     ;message length
   mov	ecx,msg     ;message to write
   mov	ebx,1       ;file descriptor (stdout)
   mov	eax,4       ;system call number (sys_write)
   int	0x80        ;call kernel
	
   mov	eax,1       ;system call number (sys_exit)
   int	0x80        ;call kernel

section	.data
msg db 'Hello, world!', 0xa  ;string to be printed
len equ $ - msg     ;length of the string
```