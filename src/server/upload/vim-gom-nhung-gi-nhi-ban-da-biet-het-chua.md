## 1. Vì sao mọi người dùng Vim:
- Phổ biến: Vim có trên cả MAC, Ubuntu và Windows.
- Nhẹ. Cùng một file lớn, mở bằng vim sẽ nhẹ hơn so với các trình soạn thảo khác (ít nhất là so với gedit).
- Nhanh: Bạn có thể chỉnh sửa các đoạn văn bản mà không cần dùng chuột, chỉ sử dụng bàn phím
- Khi triển khai các server, việc remote vào máy ảo, việc cài đặt gedit hay sublime text rõ ràng không khả thi mà cần một số trình chỉnh sửa văn bản dòng lệnh. Vim là một lựa chọn không hề tồi 😄.

## 2. Các chế độ ở trong Vim: (Mode)

### 1. Normal Mode
Đây là chế độ đầu tiên khi bạn khởi động Vim.

Các lệnh trong Normal Mode:

**i** trong insert, ngay lập tức chuyển vim sang chế độ insert.

**a** trong 'append', điều này sẽ di chuyển con trỏ sau vị trí con trỏ đang đứng trong chế độ insert

**o** chèn một dòng mới bên dưới dòng hiện tại và vào chế độ chèn trên dòng mới

<br>

**I** trong 'insert' nó di chuyển con trỏ hiện tại đến đầu dòng và vào chế độ insert.

**A** trong 'append' nó di chuyển con trỏ hiện tại đến cuối dòng và vào chế độ insert

**O** chèn một dòng mới phía trên dòng hiện tại và vào chế độ insert

### 2. Command Mode
Chế độ này là nơi bạn phô diễn kỹ thuật với hàng loạt các lệnh và các phím tắt trong Vim. Với một người dùng Vim chuyên nghiệp, đây có lẽ là chế độ bạn dùng nhiều nhất.

### 3. Insert Mode
Chế độ này cho phép bạn chèn kí tự vào trong văn bản.

### 4. Visual  Mode
Chế độ này cho phép bạn chọn các vùng văn bản để thao tác với chúng (ví dụ như chọn đoạn văn bản để copy, cut hay xóa ...).

Các lệnh trong Visual Mode:
**I**
**A**
**o**
**r**
**R**

### 5. Replace Mode
Bạn chỉ cần gõ **r** để thay thế ký tự hiện tại mà bạn đặt con trỏ hoặc bạn có thể gõ **R** (chữ hoa) để thay thế từng ký tự ngay chỗ con trỏ đang đặt cho tới cuối dòng

Để chuyển qua giữa các chế độ này với nhau ta sử dụng các phím Esc (chuyển chế độ dòng lệnh), i để sang chế độ insert và V hoặc v để chuyển sang chế độ Visual.
![](https://images.viblo.asia/a278bcaa-e3d4-4d9e-9857-e635cb1883c6.png)


## 3. Điều hướng trong Vim (Navigating)
![](https://images.viblo.asia/199d5174-b52d-4af6-8640-468cbe210592.jpeg)

Link tham khảo: https://viblo.asia/p/cac-lenh-dieu-huong-trong-vim-navigation-in-vim-bJzKmPXw59N

## 4. Các lệnh trong Vim (Command)
```
:q: Thoát khỏi Vim
:q!: Bắt buộc thoát không cần lưu
:w: Lưu file
:w!: Bắt buộc ghi file (ghi đè)
:wq: Lưu xong thoát
:saveas filename
:w filename
```

```
$: nhảy về cuối dòng hiện tại
0 (số không @@): nhảy về đầu dòng hiện tại
```

```
gg: nhảy lên đầu file
G: nhảy xuống cuối file
50G: nhảy tới dòng 50 của file
Ctrl + G: Xem thông tin dòng hiện tại
Ctrl + F: Move to page forward
```

### Cut, Coppy, Delete
```
yy: yank copy dòng hiện tại
dd: cut dòng hiện tại
p: paste
```

### **Act, Repeat và Reverse**

![](https://images.viblo.asia/dcf5050a-e863-4e2a-a17b-65482af0fa5a.png)

### **Search**

![](https://images.viblo.asia/e24c0712-3cc3-4bd7-805f-d5de76e42581.png)

### **Auto-completion**

![](https://images.viblo.asia/33d6acb9-e5b6-4a51-9019-ee2b5cc40064.png)

### Mark
![](https://images.viblo.asia/d48cdd0d-05d4-440f-b65b-405276f5c247.png)

### Text Indent
![](https://images.viblo.asia/0270cf2b-8fe4-450a-a1db-0ed3fcb13133.png)

### Syntax highlighting
![](https://images.viblo.asia/f0c3e593-32cb-4353-9a41-0b2d29b3b2e5.png)

### Compare file
```
vimdiff file1 file2
```

```
vim -d file1 file2
```

```
vimdiff -o
```

```
vimdiff -do 
```

```
]c: change to next change
```

```
diffupdate
```

Tham khảo các lệnh ở đây:
https://viblo.asia/p/cac-cau-lenh-vim-ma-cac-developer-nen-biet-ByEZkLyglQ0#_syntax-highlighting-14

### Numbers
```
Ctrl + a => Increament by 1
Ctrl + x => Descrease 
5Ctrl + a
:put =range(10, 15)
:set nu!
:12put =range(10, 15) => put từ dòng 12
:0put =range(1, 2) => put từ dòng đầu tiên
:$put =range(1111, 1115)
:for i in range(1111, 1115) | put = '192.168.9.'.i | endfor
```

### Cú pháp lệnh trong Vim
So in English you have present simple tense:
```
S + V + O
```

**Formula: Subject + Verb + Object**

**Example: I love Javascript**

So in Vim we also have the action structure:
```
C + M + TO
Formula: Command + Motion + Text Object
Example: diw ( delete in words)
```

So as you can see in english we have basic tense is present simple. So we also have action structure in Vim ( C + M + TO).

**Main commands**
```
d: delete
c: change
v: visual
y: yank
```

**Main Motion:**
```
1, 2, 4, 5, … (Numbers)
a: all
i: in
t: till
f: find forward
F: find backward
```

**Main Text Objects:**
```
w: words
s: sentences
p: paragraphs
t: tags
```

### Practice to make your habit
**1. Play game**: https://vim-adventures.com/

**2.** [Vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)

**3.** Bắt đầu chỉnh sửa code bằng Vim trên terminal