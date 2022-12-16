> Mình đang viết một ngôn ngữ lập trình scripting và rất chú trọng về hiệu năng, cũng như tốc độ xử lý của nó. Bài viết này là một phần kinh nghiệm đã trãi qua khi xử lý phần virtual machine cho ngôn ngữ.
 
Trong bài viết này, mình sẽ đi chi tiết từ cách tạo một máy ảo (virtual machine) thực thi bytecode của một ngôn ngữ lập trình, cho đến từng cách tối ưu nó trên các trình biên dịch phổ biến (cross-compiler).

Bài viết này có thể sẽ hữu ích đối với những ai đam mê nghiên cứu về viết ngôn ngữ lập trình hay sử dụng virtual machine cho mục đích nào đó, viết [giả lập](https://github.com/JaCzekanski/Avocado) chẳng hạn.

### **Bytecode**
> Bytecode, còn được gọi là portable code hoặc p-code, là cách thức lưu trữ dạng mã các chỉ thị (instructions - các opcode) trong lập trình máy tính, được thiết kế để phần mềm thông dịch thực hiện hiệu quả trên nền tảng máy ảo - *theo Wiki*

Nói dễ hiểu hơn thì bytecode là một loạt chỉ thị được tạo sau khi biên dịch source code, sau đó đưa chúng vào máy ảo để thực thi.

Hiện tại, thì opcode instruction thường được biểu diễn theo 2 dạng

#### 32bit
Theo kiểu nguyên mẫu của [ISA](https://en.wikipedia.org/wiki/Instruction_set_architecture), giống với các chỉ thị được sử dụng trên CPU thật. Gói gọn trong 32bit đó, sẽ chứa cả opcode, các tham số phụ như dấu, đối số khác, địa chỉ register...

Từ Lua 5.0, người ta đã chuyển sang sử dụng register-based và 32bit instruction, có thể thấy nó trong [The Implementation of Lua 5.0](https://www.lua.org/doc/jucs05.pdf) và [Lua 5.0 source code](https://www.lua.org/source/5.0/lopcodes.h.html).

![](https://i.imgur.com/orrlnp5.png)

- 6bit đầu chứa **opcode**, 8bit cho arg **A**, 18bit còn lại chia đều cho **B** và **C**
- 18bit cuối cũng dành cho **Bx**, để biểu diễn số hạng đơn lớn hơn, **sBx** cho số có dấu.

#### 8bit (1 byte đơn)

Phương pháp này tương đối ít gặp hơn, nhưng có ưu điểm là không tốn nhiều byte như ở trên, là sao?
- Ví dụ bạn có một opcode **NOTHING** với mục đích là không cần làm gì cả. Và khi đọc đến nó thì máy ảo chẳng làm gì, cứ next đến opcode tiếp theo. Như vậy, nếu dùng 32bit (4 byte) thì có phải là thừa đến tận 3 byte.
- Nhưng cũng có tí nhược điểm là phải dùng nhiều mã hơn để biểu diễn trong một số trường hợp, chẳng hạn muốn có số nguyên 64bit, thì phải cần đến 8 byte tiếp theo.

Ta dễ dàng bắt gặp nó trong ebook [Crafting Interpreters](http://www.craftinginterpreters.com/chunks-of-bytecode.html#constant-instructions).

![](https://i.imgur.com/JcKa6Rg.png)

- `OP_RETURN` chỉ cần 1 byte
- `OP_CONSTANT` thì cần thêm 1 byte để lấy vị trí đã lưu của constant (giới hạn là 256 constant, nếu muốn tăng thêm thì cần 1 byte hoặc hơn).

### **Virtual machine**

(Phần này mình chỉ nói nhanh qua)

Máy ảo ở đây là môi trường được xây dựng trên máy thật, về hình thức thì nó giống như mô phỏng CPU hay máy thật và được dùng để thực thi các chỉ thị đưa vào (bytecode).

Trong ngôn ngữ lập trình có sử dụng máy ảo, nó thường được xây dựng theo 2 kiểu
- Registers based (các thanh ghi), giống như một CPU vậy, thường thấy trong JVM và Lua VM.
- Stack based (mô hình ngăn xếp), thay vì giới hạn nghiêm ngặt số thanh ghi chứa giá trị, thì cách này rộng hơn và cũng tốn nhiều tài nguyên hơn, bù lại các giá trị có thể lưu trữ lâu dài hơn trên stack ảo.

### **Triển khai máy ảo**

Mục đích của máy ảo trong post là tương tác với hai giá trị **constant** và **value** (đơn giản chỉ là số nguyên), thông qua các chỉ thị đã thiết lập sẵn, kết thúc chương trình sẽ trả về **value**.

Phần này mình chỉ sử dụng ngôn ngữ **C** đơn giản vì 2 lý do:
- Ngôn ngữ cấp hệ thống, dễ dàng tương tác với bộ nhớ
- Hầu hết các máy ảo cần hiệu năng cao đều viết bằng **C**

**C++** cũng không ngoại lệ, nhưng chỉ **C** là đủ rồi.

#### Khai báo

```c
#include <stdio.h>
#include <stdint.h>
typedef uint8_t  u8;    // for opcode
typedef uint16_t u16;   //   _ arg
typedef uint32_t u32;   //   _ instruction
typedef uint64_t u64;   //   _ value, constant
```
- Đầu tiên, ta cần một số type cơ bản
- Chỉ sử dụng standard library nên có thể chạy trên nhiều nền tảng

#### Xây đựng mã chỉ thị

Mình sẽ cho các chỉ thị vào một `enum` như sau
```c
typedef enum {
    OP_HLT = 0,         // return value
    OP_LDK = 1,         // constant = constants[arg]
    OP_ADD = 2,         // value += constant
    OP_SUB = 3,         // value -= constant
    OP_LEQ = 4          // if value <= constant, pc -= arg
} OpCode;
```
- `OP_HLT` (halt), dừng chương trình và trả về **value**
- `OP_LDK` (load constant), load một giá trị **constant**
- `OP_ADD` (add), cộng **value** với **constant**
- `OP_SUB` (subtract), trừ **value** cho **constant**
- `OP_LEQ` (less than or equal), nếu **value** bé hơn hoặc bằng **constant** thì jump đến một vị trí trong bytecode (nhằm mục đích tạo vòng lặp, kéo dài chương trình)

Tiếp theo là instruction, mình sẽ dùng macro để viết theo 2 cách biểu diễn bytecode đã nói ở trên.
- 1 byte đơn
```c
#ifdef OPCODE_BYTE
typedef u8 Inst;
    ...
```
- và 32bit, dựa trên instruction layout của **Lua**
```c
    ...
#else
typedef union {
    struct {
        OpCode op :  6; // OP  |
        u32       :  8; // A   | 
        u32   arg : 18; // Bx  |
    };                  //     v
    u32 n;              // -> 32bit
} Inst;
#endif
```

Đến phần emit code, mình tiếp tục dùng macro.
```c
#ifdef OPCODE_BYTE
#define EMIT_HLT()  (OP_HLT)
#define EMIT_LDK(k) (OP_LDK), ((k) & 0xff), (((k) >> 8) & 0xff)
#define EMIT_ADD()  (OP_ADD)
#define EMIT_SUB()  (OP_SUB)
#define EMIT_LEQ(n) (OP_LEQ), ((n) & 0xff), (((n) >> 8) & 0xff)
    ...
```
- `EMIT_LDK` và `EMIT_LEQ` đều có 1 tham số, và mình dùng số nguyên 16bit
- Ở trên sẽ gộp 2 byte lại, còn bên dưới thì cho nó vào field 18bit

```c
    ...
#else
#define EMIT_HLT()  ((Inst) { .op = OP_HLT })
#define EMIT_LDK(k) ((Inst) { .op = OP_LDK, .arg = (k) })
#define EMIT_ADD()  ((Inst) { .op = OP_ADD })
#define EMIT_SUB()  ((Inst) { .op = OP_SUB })
#define EMIT_LEQ(n) ((Inst) { .op = OP_LEQ, .arg = (n) })
#endif
```

#### Phần cốt lõi của máy ảo

Đây là hàm để thực thi code
```c
static u64 exec(Inst *code, u64 *consts) {
    const Inst *pc;
    u64 value, constant;
    ...
```
- `code`, bytecode hay các chỉ thị đầu vào
- `consts`, mảng các giá trị, ở đầy mình dùng số nguyên 64bit 
- `pc`, program counter, trỏ đến chỉ thị hiện tại
- `value` và `constant` sẽ giống như hai **register**
    - `value` - biến lưu giá trị chính, cũng là giá trị trả về của hàm
    - `constant` - sẽ chứa giá trị sau khi load từ mảng `consts`

Tiếp theo là khởi tạo giá trị
```
    ...
    value = 0;
    constant = 0;
    pc = code;
```

Phần đọc code của máy ảo sẽ là một vòng lặp, khi đọc đến các opcode sẽ rẻ nhánh. Mình sẽ dùng `for` và `switch`, nhưng để tiện cho các phần sau của bài viết, nên mình chuyển chúng sang macro
```c
    ...
#define DISPATCH() for (;;) switch(GET_OP())
#define CODE(op)   case op
#define NEXT()     continue
```
- `DISPATCH` sẽ rẽ nhánh theo opcode
    - `for (;;)` cho vòng lặp vô hạn
    - `GET_OP(pc)` sẽ lấy opcode từ instruction, một lát sẽ biết nó là gì
    - động từ *dispatch* có nghĩa là gửi công văn đi, chỉ đạo thực hiện :))
- `CODE` để định nghĩa nhánh, thông qua opcode nhập vào
- `NEXT` để đọc tiếp
    - `continue` để trực tiếp trở về `for` (thay vì qua 2 bước nếu dùng `break`)

Đi tiếp các nhánh opcode, đầu tiên là `OP_HALT`
```c
    ...
    DISPATCH() {
        CODE(OP_HLT): {
            return value;   // returns away
        }
```

tiếp theo, `OP_ADD` và `OP_SUB`
```c
    ...
        CODE(OP_ADD): {
            value += constant;
            NEXT();
        }
        CODE(OP_SUB): {
            value -= constant;
            NEXT();
        }
```
- `NEXT` để đi tiếp, phần `OP_HALT` không có vì nó trả về kết quả luôn

tiếp theo nữa là `OP_LDK`
```c
    ...
        CODE(OP_LDK): {
            int slot = GET_ARG();
            constant = consts[slot];
            NEXT();
        }
```
- `GET_ARG` sẽ lấy tham số theo sau opcode trong instruction
- vị trí `slot` là nơi lưu giá trị constant đã định nghĩa ban đầu

...và cuối cùng là `OP_LEQ`
```c
    ...
        CODE(OP_LEQ): {
            int offset = GET_ARG();
            if (value <= constant) \
                pc -= offset;
            NEXT();    
        }
    }
} // end exec(...)
```
- roll `pc` ngược về `offset` đơn vị (hay jump back `offset` đơn vị)

Xử lý nốt hai macro `GET_OP` và `GET_ARG` nữa là có thể chạy được.

Do hai instruction layout khác nhau nên phải chia làm 2 phần, đặt code dưới vào sau phần khởi tạo giá trị
```c
#ifdef OPCODE_BYTE
#define GET_OP()    (*pc++)
#define GET_ARG()   (pc += 2, pc[-2] | ((pc)[-1] << 8))
    ...
```
- `GET_OP`, lấy giá trị (opcode) và tăng `pc` lên 1
- `GET_ARG`, tăng trước 2, sau đó `xor` hai giá trị byte trước
```c
    ...
#else
#define GET_OP()    (pc++)->op
#define GET_ARG()   (pc-1)->arg
#endif
```
- phần này dễ sử dụng hơn, do chúng nằm gọn trong struct
- chỗ `GET_ARG` có `pc-1` vì trước đó đã tăng `pc` lên rồi (để ý chỗ `DISPATCH` ở trên sẽ thấy, sau đó mới đến `NEXT`)

Vậy là xong toàn bộ máy ảo, đến phần không thể thiếu của một chương trình **C** - main
```c
int main() {
    u64 consts[]...
    Inst code[]...
        ...
    u64 result = exec(code, consts);
    printf("%result: lld\n", result);   
}
```

Mà khoan, phải xác định rõ sẽ cho máy ảo thực thi cái gì trước đã. Mình nghĩ ra mẫu code đơn giản sau
```
val = 0
loop:
    val -= 4
    val += 5
if (val <= 1234567890)
    goto loop
```
- gán `val = 0`
- set một label `loop`
- giảm `val` đi `4`
- tăng `val` thêm `5`
- nếu `val <= 1234567890` thì `goto loop`

Vậy là ta sẽ có 3 giá trị trong constant
```
    u64 consts[] = {4, 5, 1234567890};
        ...
```

Tiếp theo là emit code
```c
    Inst code[] = {
        EMIT_LDK(0),    // 0. load 4
        EMIT_SUB(),     // 1. sub
        EMIT_LDK(1),    // 2. load 5
        EMIT_ADD(),     // 3. add
        EMIT_LDK(2),    // 4. load 1234567890
        EMIT_LEQ([?]),  // 5. if <= 1234567890, jump back [?]
        EMIT_HLT()      // 6. halt
    };
        ... 
```
- Chỗ `[?]` nên cho gì vào? Phải tính toán thôi.

Ta để ý chỗ `CODE(OP_LEQ)` ở trên, sẽ có `pc -= offset`, `offset` chính là `[?]` ta cần tìm.

Trong mảng `code` ở trên, vị trí tương ứng của label `loop` (trong code mẫu) chính là `code[0]`. Vậy ta chỉ cần tìm khoảng cách giữa `EMIT_LDK(0)` và `EMIT_LEQ([?])`. Có thể thấy rõ, một thằng ở vị trí `0` và một thằng ở vị trí `5`, ở trên có `pc++` nên sẽ điền vào là `4` (tức `5-0-1`).

Nhưng đừng vội, hãy nhìn `EMIT_LDK` và `EMIT_LEQ` (phần `OPCODE_BYTE`), xem là nó được định nghĩa như thế nào? Có đến 2 dấu phẩy, tức không phải 1 mà là 3 giá trị đấy!

Quay trở lại, ban đầu chỉ là `4`, nhưng nếu có define `OPCODE_BYTE` thì sẽ là `10` (4 cộng thêm (2 nhân 3), vì có 3 `OP_LDK`, tức `11-0-1`), vậy mình thêm macro vào đây
```c
        ...
        EMIT_LDK(2),    // 4. load 1234567890
#ifdef OPCODE_BYTE
        EMIT_LEQ(10),   // 5. if <= 1234567890, jump back 10
#else
        EMIT_LEQ(4),    //  _ if <= 1234567890, jump back 4
#endif
        EMIT_HLT()      // 6. halt
    };
```

#### Test thử

Ok, giờ có thể chạy để test 2 phương pháp bytecode. Mình test trên `Win 10 64bit, i3 2.0GHz, 8GB RAM`

Các case test đều sử dụng tùy chọn tối ưu hóa, kết quả theo format `8bit \ 32bit` opcode, tính theo giây.
```bash
$ gcc -w -O3    # GNU C Compiler
$ cl /MD /O2    # Microsoft Visual C++ Compiler
$ clang -w -O3  # Clang LLVM Compiler
```

platforms|gcc *-O3*|msvc */O2*|clang *-O3*
:--|:--:|:--:|:--:
Linux x64 (WLS) | **2.49s** \ 2.60s | _ |  2.71s \ **1.85s**
Windows 32bit   | **2.90s** \ 3.27s | **2.36s** \ 2.75s | _
Windows 64bit   | 2.96s \ **2.95s** | 2.39s \ **2.15s** |  **2.27s** \ 2.37s

Kết quả trên cho thấy rằng, 2 phương pháp bytecode không hơn kém nhau bao nhiêu, mà còn phụ thuộc khá nhiều vào compiler.

Và tất nhiên là bài viết vẫn chưa kết thúc đâu, đến phần tiếp theo thôi nào!

### **Tối ưu _nhẹ_ phần runtime**
Khi chuyển code trên sang assembly (thông qua [Godbolt](https://godbolt.org/)), ta sẽ thấy vài chỗ khác biệt nhỏ giữa **GCC** và **MSVC**, đây cũng là điểm khiến **GCC** chậm hơn trong code trên
```c
                        // gcc                  // msvc
for (;;)                // @LN4:                   @LN4:
    switch(x)           //   ...                     ...
        case 1:         //   ...                     ...
            ...         //
            continue;   //   nop                     jmp SHORT @LN4
                        //   jmp QWORD PTR @LN4   
```
- `nop` không đáng kể, nếu dùng option *-O2*, *-O3*
- `jmp` trong **MSVC** đều sử dụng short (2 byte) cho tất cả near label, còn **GCC** thì khác, đều là `DWORD` hoặc `QWORD PTR` (x86_64).
- `switch` hoạt động gần giống như các `if` nối nhau, đồng nghĩa sẽ có rất nhiều `jmp` được sử dụng.

Để hạn chế điều này, có một trick nhỏ đó là sử dụng [computed goto](https://gcc.gnu.org/onlinedocs/gcc/Labels-as-Values.html) (tạm dịch: bước đi có tính toán). Cách này chỉ có thể sử dụng trên được trên **GCC** và **Clang** compiler.

Về cơ bản thì địa chỉ của các label sẽ được đưa vào một mảng, truy xuất mảng đó thông qua index để lấy địa chỉ và jump đến label tương ứng.
Ta thực hiện với máy ảo trên như sau:
```c
#if defined(__GNUC__) || defined(__clang__)
    ...
#else
#define DISPATCH() for (;;) switch(GET_OP())
#define CODE(op)   case op
#define NEXT()     continue
#endif
```
- Ngay đoạn `#define DISPATCH`, ta chỉ cần thêm vào trước đó một `#if defined...` để xác định compiler có phải là **GCC** hay **Clang**.
```c
    ...
#define DISPATCH() goto *__jt[GET_OP()];
#define CODE(op)   __##op
#define NEXT()     DISPATCH()
    ...
```
- `__jt` sẽ là array chứa các địa chỉ của label
```c
    ...
    static void *__jt[] = {
        &&CODE(OP_HLT),
        &&CODE(OP_LDK),
        &&CODE(OP_ADD),
        &&CODE(OP_SUB),
        &&CODE(OP_LEQ)
    };
```
- Dùng `&&` để lấy địa chỉ của label
- Các address được add vào tất nhiên phải theo thứ tự của `enum`

Vậy là xong, ta có thể test ngay, kết quả nhanh hơn trước rất nhiều.
```bash
$ gcc -w -O3 -o main -DOPCODE_BYTE main.c && time ./main
real    0m1.656s
$ gcc -w -O3 -o main main.c && time ./main
real    0m1.874s
```
```bash
$ clang -w -O3 -o main -DOPCODE_BYTE main.c && time ./main
real    0m1.848s
$ clang -w -O3 -o main main.c && time ./main
real    0m1.853s
```
#### Có một câu hỏi đặt ra, có thể áp dụng cách này trên **MSVC** được không?
> Về cách code thì không thể vì dính ngay syntax error, nhưng về cách thức hoạt động thì có thể code giống như vậy bằng assembly (*x86* có thể dễ dàng sử dụng [inline assembler](https://docs.microsoft.com/en-us/cpp/assembler/inline/inline-assembler), còn *x64* thì không).

> Nhưng trớ trêu thay, tốc độ sẽ tồi tệ hơn đấy!
Và đây là cách mà mình thực hiện trên kiến trúc *x86*
```c
    ...
#else
#if defined(_WIN32) || defined(_M_IX86)
    static void *__jt[5];
#define DISPATCH()              \
    do {                        \
        int i = GET_OP();       \
        __asm mov ecx, [i]      \
        __asm shl ecx, [2]      \
        __asm jmp [__jt+ecx]    \
    } while (0);
#define CODE(op)   __##op
#define NEXT()     DISPATCH()
    ...
```
- Load opcode vào `ecx`, sau đó shift left `2` (tức nhân `4`, size cố định của pointer trên x86) để lấy offset (hay index của opcode trong `__jt`) và jump đến label `__jt[i]`
- `do..while(0)` nhằm mục đích cho compiler hiểu nó là 1 statement duy nhất, nếu dùng `{..}` sẽ là một scope
```c
    ...
    if (!__jt[0]) __asm {
        mov ecx, [0]
        mov [__jt+ecx], offset CODE(OP_HLT)
        add ecx, [4]
        mov [__jt+ecx], offset CODE(OP_LDK)
        add ecx, [4]
        mov [__jt+ecx], offset CODE(OP_ADD)
        add ecx, [4]
        mov [__jt+ecx], offset CODE(OP_SUB)
        add ecx, [4]
        mov [__jt+ecx], offset CODE(OP_LEQ)
    }
```
- Lấy địa chỉ của các label và cho vào `__jt`
```c
    ...
#else
#define DISPATCH() for (;;) switch(GET_OP())
#define CODE(op)   case op
#define NEXT()     continue
#endif
#endif
```
> Mọi code trên bạn có thể xem [tại đây](https://github.com/wy3/wy3.github.io/blob/master/posts/optimize-bytecode-virtual-machine/main.c)

Đến đây là kết thúc rồi, hẹn gặp lại vào các post sau nhé!