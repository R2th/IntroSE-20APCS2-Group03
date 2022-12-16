Công việc của một lập trình viên thường là phải ngồi viết và sửa code, trong 2 công việc này có rất nhiều những việc mang tính lặp lại. Cho dù đó là sửa một dấu phẩy hay là chuyển một function sang một nơi khác trong file, chúng ta phải lặp lại rất nhiều hành động.

<br>
Vim là một trình văn bản được tối ưu cho những công việc mang tính lặp lại. Tính hiệu quả của Vim bắt nguồn từ việc Vim theo dõi những hành động gần đây nhất của người sử dụng, điều này làm Vim có thể thực hiện thay đổi cuối cùng chỉ bằng một nút nhấn. Đây là một sức mạnh vô biên nếu được sử dụng đúng cách, tuy nhiên không phải ai cũng biết cách sử dụng của sức mạnh tiềm ẩn này.

# 1. Dấu `.` thần thánh
Điểm bắt đầu của chúng ta trong việc tìm hiểu về nguồn sức mạnh này chính từ dấu chấm (`.`) trong Vim. Một dấu chấm có thể giúp bạn làm mọi việc theo ý của bạn, một dấu chấm có thể tiết kiệm cho bạn thời gian, công sức.

Giả sử, bạn có một file chứ một danh sách các công việc như bên trái, và bạn muốn chuyển nó thành như bên phải.
```
Job 1                  |                    - Job 1
Job 2                  |->                  - Job 2
Job 3                  |                    - Job 3
Job 4                  |                    - Job 4
```

Thông thường, bạn sẽ phải chỉ chuột vào đầu dòng của từng `Job` để thêm 1 dấu gạch và 1 dấu cách cho mỗi dòng. Còn trong Vim, giả sử ta đang ở dòng 1, ta có thể ấn `I` để đưa con trỏ về đầu dòng và vào Insert Mode, sau đó thêm 1 dấu gạch và 1 dấu cách. Như vậy dòng 1, đã đúng như yêu cầu. Nhưng dòng 2, 3 và 4 sẽ nhanh hơn rất nhiều. Bây giờ, hãy nhấn `j` để chuyển con trỏ xuống dòng 2, và nhấn `.`. Chỉ như vậy thôi là dòng 2 đã trở nên đúng với yêu cầu. Tương tự với dòng 3 và dòng 4

![](https://images.viblo.asia/28c292d5-c282-4d9c-b51a-a030753a450b.jpg)

<br>
Và rồi bạn ghi thêm một số công việc con trong những `Job` đó mà chưa có thời gian format chúng.

```
Job 1                              |       Job 1
some boring work for Job 1         |         some boring work for Job 1
Job 2                              |       Job 2
Job 3                              |       Job 3
some boring work for Job 3         |->       some boring work for Job 3
another boring work for Job 3      |         another boring work for Job 3
yet another boring work for Job 3  |         yet another boring work for Job 3
Job 4                              |       Job 4
```

Thông thường, bạn sẽ phải chỉ chuột vào đầu những dòng cần được `tab` để có thể thụt lề cho chúng, nhưng với Vim, bạn có thể làm việc này một cách nhanh chóng. Giả sử con trỏ của bạn đang ở chữ `w` tại dòng 2, bạn có thể gõ `>>` để có thể thụt lề dòng 2 này, tuy nhiên còn dòng 5, 6 và 7 cần phải thụt vào, những dòng này lại càng đơn giản hơn. 

Sau khi bạn gõ `>>`, Vim đã ghi nhớ câu lệnh này để có thể thực hiện nhanh bằng câu lệnh `.`. Bây giờ, con trỏ vẫn đang ở dòng 2, chữ `s` sau khi thụt lề, bạn gõ `3j` để chuyển sang dòng 5, sau đó ấn `3.` và BOOOOM, tận 3 dòng đã thụt lề.

![](https://images.viblo.asia/27467561-d51e-4a37-9587-3c3c83dd69d5.jpg)

Bên trên là một số ví dụ đơn giản để miêu tả sức mạnh của dấu chấm `.` trong Vim. Bạn có thể sử dụng dấu chấm này để thực hiện một công việc phức tạp hơn trong Vim.

Trong `:help` của Vim, dấu chấm này có tác dụng là: ***lặp lại thay đổi gần nhất với bộ đếm được sử dụng trước dấu chấm***. 

<br>
Như vậy, những thay đổi đơn giản như thụt lề, thêm `-` hoặc như thêm `;` vào cuối câu có thể dùng với dấu chấm. Tuy nhiên những công việc phức tạp hơn thì cần một công cụ cao cấp hơn!!!

# 2. Macro for the rescue!

**Macro** chính là công cụ nâng cấp hơn mà chúng ta nhắc đến trong mục 1. Với dấu chấm, ta có thể thực hiện lại 1 thay đổi, nhưng với macro, ta có thể thực hiện lại một cụm các thay đổi. Điều này giúp macro trở nên đặc biệt mạnh mẽ khi có thể giúp ta thực hiện một công việc phức tạp chỉ với một nốt nhạc.

Ví dụ: Bạn có một đoạn code Javascript như bên trái và bạn cần phải chuyển nó về như bên phải
```
foo = 1                |        let foo = 1;
bar = 'a'              |->      let bar = 'a';
foobar = foo + bar     |        let foobar = foo + bar;
```

Công việc chỉ đơn giản là thêm chữ `let` ở đầu mỗi dòng và dấu `;` ở cuối mỗi dòng. Việc sử dụng dấu chấm ở đây là không thể vì nó yêu cầu ta phải chỉnh sửa 2 nơi trong cùng một dòng (2 thay đổi).

Và như thường lệ, bản năng của ta sẽ và trỏ chuột vào đầu dòng của từng dòng và thêm `let` vào từng dòng và sau đó trỏ chuột vào cuối dòng của từng dòng để thêm `;`. Hãy tưởng tượng làm việc này với 100 dòng code!!!

<br>
May mắn là ta đã có Macro, vị cứu tinh cho những công việc lặp lại buồn tẻ và mệt nhọc!

Để kích hoạt Macro, ta sử dụng lệnh `q{register}`, `register` là một chữ cái trên bàn phím (in hoa hoặc in thường) và dãy số, như vậy ta có thể có tới 62 register cho ta thoải mái lựa chọn :)


Và giả sử trong ví dụ này, con trỏ đang ở dòng 1, ta dùng `q1` để đánh macro với số `1`. Sau khi đã đánh macro, ta sẽ tiến hành thay đổi trong dòng 1 như sau: nhấn `I` để đưa con trỏ về đầu dòng và vào Insert Mode, gõ "var" và dấu cách, sau đó nhấn **[ESC]** để trở về Normal mode, nhấn `A` để đưa con trỏ về cuối dòng và vào Insert Mode, gõ `;` và nhấn **[ESC]** để trở về Normal mode. Như vậy dòng 1 đã có nội dung là:

```
let foo = 1;
```

Như vậy, ta đã xong những thay đổi của macro, nhấn `q` để báo hiệu kết thúc macro. Khi đó, trong register `1` của chúng ta sẽ có nội dung như sau: `Ilet ^[A;^[` đây là những thay đổi của macro vừa rồi của chúng ta.

<br>
Để áp dụng macro này với dòng 2, ta nhấn `j` để xuống dòng. Rồi gõ `@1` để áp dụng macro trong register `1` ở dòng hiện tại.  Tương tự với dòng 3, ta cũng nhấn `j` để xuống dòng rồi gõ `@1` để áp dụng macro trong register `1` ở dòng 3.

Kết quả sau khi dùng macro trong dòng 2 vào 3 là như sau:

```
let bar = 'a';
let foobar = foo + bar;
```

Bạn cũng có thể xem các áp dụng macro trên bằng [asciinema video này](https://asciinema.org/a/EfSZeRHZfKyy29uPxLzWbKV7s)

![](https://images.viblo.asia/76237117-641b-456e-83f9-5f95d55409e6.jpg)

Bên trên là một ví dụ rất đơn giản để thể hiện khả năng xử lý những hành động lặp lại của Macro. ***Sức mạnh thực sự của Macro nằm ở cách người dùng viết và áp dụng Macro đó như thế nào.***

Dưới đây là một số những đoạn video thể hiện tính hữu dụng của Macro trong quá trình lập trình

[asciinema - vim-macro](https://asciinema.org/a/14131)

[asciinema - Play with vim record and macros](https://asciinema.org/a/40852)

[asciinama - Vim macro skills](https://asciinema.org/a/89216)


# 3. Lời kết
Công việc của chúng ta, những lập trình viên thường phải edit text rất nhiều, hãy làm cho công việc của mình vui vẻ, hứng thú hơn bằng cách sử dụng những công cụ giúp bạn lặp lại những công việc buồn chán thay vì phải ngồi sửa những chi tiết nhỏ nhặt trong từng dòng, từng câu, hãy dành những khoảng thời gian đó cho những việc quan trong hơn

<br>

***Happy Hacking!!!***