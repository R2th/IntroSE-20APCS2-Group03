## ELF x86 - 0 protection
đây là challenge đầu tiên trong mảng cracking của **rootme**. Vì thế chương trình khá đơn giản, chủ yếu nhắm mục đích làm quen với chủ đề reverse này.

### Solution
Đầu tiên, chương trình nạp vào 1 đoạn string từ biến `a123456789`.

```i386
push    ebp
mov     ebp, esp
push    ecx
sub     esp, 24h
mov     [esp + s2], a123456789 
```

Biến này chứa đoạn string **123456789**. Tiếp theo, chương trình in ra màn hình một số đoạn string ban đầu

```
mov     dword ptr [esp], offset s ; "#######################################"...
call    _puts
mov     dword ptr [esp], offset  Bienvennue dans ce challenge "...
call    _puts
mov     dword ptr [esp], offset asc_80488CC ; "#######################################"...
call    _puts
mov     dword ptr [esp], offset aVeuillezEntrer ; "Veuillez entrer le mot de passe :"
call    _printf
```

Tiếp theo là đọc dữ liệu người dùng nhập vào

```
mov eax, [ebp + s1]
mov [esp], eax
call getString
```

Lưu kết quả trong `eax` vào `[ebp + s1]`

```
mov [ebp + s1], eax
```

So sánh 2 string người dùng nhập vào với string trong biến `a123456789`

```
mov eax, [ebp + s2]
mov [esp + 4], eax
mov eax, [ebp + s1]
mov [esp], eax
call _strcmp
```

Nếu kết quả trả về khác 0 thì in ra thông báo fail

```
test eax, eax
jnz short loc_804871E
```
```
mov     dword ptr [esp], offset aDommageEssayeE ; "Dommage, essaye encore une fois."
call    _puts
```
Nếu đúng thì in ra thông báo success cùng mật khẩu
```
mov     eax, [ebp+s2]
mov     [esp+4], eax
mov     dword ptr [esp], offset aBienJoueVousPo ; "Bien joue, vous pouvez valider l'epreuv"...
call    _printf
```

Như vậy, để in ra thông báo chúc mừng, cần giá trị nhập vào tương ứng với giá trị của biến `a123456789`. 

### Flag

[![](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628845067641.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628845067641.png)

123456789
## ELF x86 - Basic
Đây là một bài tiếp theo vẫn rất đơn giản để làm quen mảng này. 

### Solution
Đầu tiên, chương trình lưu 2 biến local là `aJohn` và `aTheRipper`.

```
push    ebp
mov     ebp, esp
push    ecx
sub     esp, 24h
mov     [ebp+var_C], offset aJohn ; "john"
mov     [ebp+var_10], offset aTheRipper ; "the ripper"
```

Tiếp theo, chương trình in ra một số thông báo chào mừng và yêu cầu người dùng nhập username

```
mov     dword ptr [esp], offset asc_80A6B2C ; "#######################################"...
call    puts
mov     dword ptr [esp], offset aBienvennueDans ; "##        Bienvennue dans ce challenge "...
call    puts
mov     dword ptr [esp], offset asc_80A6BAC ; "#######################################"...
call    puts
mov     dword ptr [esp], offset aUsername ; "username: "
call    printf
```

Giá trị này được lưu vào 1 biến local của hàm và được so sánh với giá trị `aJohn`.

```
mov     eax, [ebp+var_8]
mov     [esp], eax
call    getString
mov     [ebp+var_8], eax
mov     eax, [ebp+var_C]
mov     [esp+4], eax
mov     eax, [ebp+var_8]
mov     [esp], eax
call    strcmp
```

Nếu sai thì in ra **Bad username**

```
test    eax, eax
jnz     short loc_80483D0
```

```
loc_80483D0:
mov     dword ptr [esp], offset aBadUsername ; "Bad username"
call    puts
```

Nếu đúng thì sẽ yêu cầu người dùng nhập password

```
mov     dword ptr [esp], offset aPassword ; "password: "
call    printf
mov     eax, [ebp+var_8]
mov     [esp], eax
call    getString
mov     [ebp+var_8], eax
```

Sau đó so sánh giá trị này với biến `aTheRipper`

```
mov     eax, [ebp+var_10]
mov     [esp+4], eax
mov     eax, [ebp+var_8]
mov     [esp], eax
call    strcmp
```

Nếu sai thì in ra **Bad password**

```
test    eax, eax
jnz     short loc_80483C2
```

```
loc_80483C2:
mov     dword ptr [esp], offset aBadPassword ; "Bad password"
call    puts
```

Nếu đúng thì in ra flag

```
mov     dword ptr [esp+4], offset a987654321 ; "987654321"
mov     dword ptr [esp], offset aBienJoueVousPo ; "Bien joue, vous pouvez valider l'epreuv"...
call    printf
```

### Flag

[![](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628845133507.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628845133507.png)

Flag: 987654321

## PE x86 - 0 protection
Tiếp theo 2 bài đơn giản trên là một bài phức tạp hơn 1 tí tẹo.

### Solution
Đầu tiên, ta có 1 file `ch15.exe`. Chạy thử file này với input bất kì, ta có

[![](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628845226298.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628845226298.png)

search thử *Wrong password* trong source code asm, ta thấy nó được gọi tại 

[![![](..\img\ch15_2.png)
](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628845235546.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628845235546.png)

đoạn mã này được gọi tại hàm

[![![](..\img\ch15_3.png)
](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628845254844.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628845254844.png)

Dựa theo mã asm, đầu tiên

```
.text:00401733                 cmp     [ebp+arg_4], 7
```

sẽ kiểm tra độ dài của input string phải bằng 7. Tiếp theo, các đoạn mã có dạng 

```
.text:00401739                 mov     eax, [ebp+arg_0]
.text:0040173C                 movzx   eax, byte ptr [eax]
.text:0040173F                 cmp     al, 53h
```

là đoạn mã so sánh từng kí tự trong input string với một kí tự cho trước (như `53h` ở s[0]). Theo đó, các kí tự của string lần lượt phải là

```
s[0] == 53h
s[1] == 50h
s[2] == 61h
s[3] == 43h
s[4] == 49h
s[5] == 6fh
s[6] == 53h
```

Nếu không thoả mãn các điều kiện trên, sẽ in ra wrong input. Ngược lại, nếu input string thoả mãn các điều kiện chương trình sẽ in ra dòng chúc mừng "*Gratz man :)*.

có thể tạo giả mã C cho chương trình đơn giản như sau:

```C
void printWrongPassword(){
    printf("Wrong password");
}

int main(char** args){
    if(strlen(args[1]) == 7){
        if(args[1][0] == 53h){
            if(args[1][1] == 50h){
                if(args[1][2] == 61){
                    if(args[1][3] == 43){
                        if(args[1][4] == 49){
                            if(args[1][5] == 6f){
                                if(args[1][6] == 53h){
                                    printf("Gratz man :)");
                                }
                                else{
                                    printWrongPassword();
                                }
                            }
                            else{
                                printWrongPassword();
                            }
                        }
                        else{
                            printWrongPassword();
                        }
                    }
                    else{
                        printWrongPassword();
                    }
                }
                else{
                    printWrongPassword();
                }
            }
            else{
                printWrongPassword();
            } 
        }
        else{
            printWrongPassword();
        }
    }
    else{
        printWrongPassword();
    }
    return;
}



```
Vậy input string cần tìm sẽ là

[![](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628845206939.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628845206939.png)

### Flag

```
SPaCIoS
```

## ELF C++ - 0 protection
Tiếp theo sẽ là một bài khác cũng ở mức cơ bản, mục tiêu là sử dụng các công cụ debug để hiểu hơn về chương trình. 

### Solution
Đầu tiên, bài cho chúng ta 1 file `ch25.bin`. Thực thi file với input bất kì, ta có:

[![![](..\img\ch25_1.png)
](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628845331326.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628845331326.png)

Tìm kiếm output này trong source code asm, ta có đoạn code in ra nó là

```
loc_8048BE5:                            ; CODE XREF: main+113↑j
    mov     dword ptr [esp+4], offset aPasswordIncorr ; "Password incorrect."
    mov     dword ptr [esp], offset _ZSt4cout@@GLIBCXX_3_4
    call    __ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc ;
```

Đoạn code này được nhảy tới từ đoạn 

[![![](..\img\ch25_2.png)
](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628845347765.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628845347765.png)

Theo đó, nếu kết quả của hàm `_ZSteqIcSt11char_traitsIcESaIcEEbRKSbIT_T0_T1_EPKS3_` là 0 thì sẽ in ra *Incorrect password*, ngược lại sẽ in ra *Congratz. ...*


OK, xem thử trong hàm `_ZSteqIcSt11char_traitsIcESaIcEEbRKSbIT_T0_T1_EPKS3_`, ta có

```
push    ebp
mov     ebp, esp
sub     esp, 18h
mov     eax, [ebp+arg_4]
mov     [esp+4], eax    ; char *
mov     eax, [ebp+arg_0]
mov     [esp], eax      ; this
call    __ZNKSs7compareEPKc ; std::string::compare(char const*)
test    eax, eax
setz    al
leave
retn
```

Có thể thấy hàm này sẽ so sánh 2 tham số truyền vào dựa trên hàm `strcmp`. Trong các tham số truyền vào, 1 tham số là input string, tham số còn lại là string có sẵn của chương trình. Ta chỉ cần tìm xem string nào được truyền vào hàm này để giải được bài này

Sử dụng gdb debug file, đặt breakpoint tại địa chỉ mà hàm này được gọi là `0x08048B92`

[![![](..\img\ch25_3.png)
](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628845362946.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628845362946.png)

có thể thấy, tham số cần tìm sẽ được trỏ bởi `esp` -> `eax` -> mem ("Here_you_have_to_understand_a_little_C++_stuffs")

Vậy string cần tìm sẽ là *Here_you_have_to_understand_a_little_C++_stuffs*.

[![![](..\img\ch25_4.png)
](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628845381235.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628845381235.png)

### Flag

```
Here_you_have_to_understand_a_little_C++_stuffs
```
## PE DotNet - 0 protection
Bài này là một bài cơ bản nhất để làm quen với reverse .NET

### Solution
Đầu tiên, chương trình cung cấp cho ta 1 file `ch22.exe`. Thực thi file này sẽ hiển thị một form với 1 trường input và 1 button `Valider`

![](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628845972599.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628845972599.png)

Khi clicj vào form với input bất kì, ta sẽ có một thông báo sai mật khẩu

![](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628846020953.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628846020953.png)

Ở bài này, mình dùng DotPeek của JetBrain để decompile source code của file này

[![](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628846089341.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628846089341.png)

Thử tìm kiếm *Bad password* trong source code, ta thấy nó được xử lý trong `Form1`. Ở đây, khi click vào button `Valider`(button1) sẽ gọi tới hàm

```.NET
private void Button1_Click(object sender, EventArgs e)
{
	if (Operators.CompareString(this.TextBox1.Text, "DotNetOP", false) == 0)
    {
    	int num1 = (int) Interaction.MsgBox((object) "Bravo! Vous pouvez valider avec ce mot de passe\r\nWell done! You can validate with this password");
	}
    else
    {
    int num2 = (int) Interaction.MsgBox((object) "Mauvais mot de passe\r\nBad password");
    }
}
```

Vì là bài cơ bản nên ở đây đơn giản là string compare với đoạn string `DotNetOP`.

[![](https://0xbadcode.ml/uploads/images/gallery/2021-08/scaled-1680-/image-1628846441481.png)](https://0xbadcode.ml/uploads/images/gallery/2021-08/image-1628846441481.png)

### Flag

```
DotNetOP
```