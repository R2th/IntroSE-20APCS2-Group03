![](https://images.viblo.asia/a9e9dc2b-f2e8-4c47-ad1b-82ed91edcf24.png)
# Mở đầu
Trong [phần 1](https://viblo.asia/p/don-gian-hoa-tac-vu-trong-linux-voi-bash-script-phan-1-gGJ59gaGZX2), tôi đã giới thiệu về **Bash script** trong **Linux** cũng như các hướng dẫn về variable (biến) và câu lệnh điều kiện. Tiếp tục với phần 2 này, tôi sẽ tiếp tục giới thiệu về những tính năng hữu ích khác của **Bash script**, bao gồm luồng điều khiển (**Flow control**) và các lệnh tiện ích khác của **Bash**. 
# Luồng điều khiển
Luồng điều khiển hay Flow control là một tính năng rất quan trọng của bất cứ ngôn ngữ lập trình nào, nó thường được nhắc tới bên cạnh câu lệnh điều kiện cũng là một tính năng quan trọng khác. **Bash** cũng không ngoại lệ, nó cũng bao gồm những chỉ dẫn cho việc lập trình với luồng điều khiển. Đó là những câu lệnh mà có lẽ không ai còn xa lạ: `for`, `while` và `until`.
Bạn nghe xong có thể có chút hoài nghi chứ, thực tế các câu lệnh tôi vừa liệt kê có lẽ nên gọi là các câu lệnh điều khiển vòng lặp thì đúng hơn. Tất nhiên, chỉ với các câu lệnh này thì cũng không đủ để một script **Bash** có thể có một khái niệm gọi là luồng điều khiển. Thực chất luồng điều khiển là bao gồm cả câu lệnh điều kiện và câu lệnh lặp cùng phối hợp theo một cách nào đó để tạo ra một điểm đặc trưng của chương trình. Đây mới chân chính được coi là khái niệm của luồng điều khiển, đồng thời nó cũng là cách mà bất cứ một chương trình hay script **Bash** nào hoạt động.

## Các dạng vòng lặp trong luồng điều khiển của *Bash*
### 1) Vòng lặp `for`
Trong **Bash**, `for` có 2 dạng thể hiện, đó là: `for` với điều kiện và `for each`

Dạng `for` với điều kiện:
- Cú pháp:`for (( exp1; exp2; exp3 )); do COMMANDS; done`
    - Ở dạng này, vòng lặp `for` tương đương với vòng lặp thường thấy trong ngôn ngữ lập trình **C** và các ngôn ngữ dẫn xuất từ nó như **C++**, **C#**, **Java** ...
  + `exp1` thường là biểu thức khởi tạo
  + `exp2` là biểu thức kiểm tra điều kiện, nếu không thỏa mãn vòng lặp sẽ dừng
  + `exp3` là biểu thức thay đổi giá trị khởi tạo ở `exp1`.
- `COMMANDS` bao gồm 1 hoặc nhiều câu lệnh được thực hiện trong khi điều kiện lặp vẫn thỏa mãn.
- VD: in các giá trị số nguyên từ 0 đến 9 (chú ý rằng khi gán sẽ chỉ dùng tên biến còn khi gọi đến biến thì phải thêm ký tự `$`)
![](https://images.viblo.asia/2ae61b0b-8e60-49f6-8513-0c12c1353560.png)

Dạng `for each`: 
- Cú pháp: `for NAME [in WORDS ... ]; do COMMANDS; done`
- Ở dạng này, vòng lặp `for` tương đương với các vòng lặp mặc định trong các ngôn ngữ như **Ruby**, **Python** ... Các câu lệnh `COMMANDS` sẽ được thực hiện 1 lần cho mỗi giá trị được truyền vào trong danh sách `WORDS`, được gán và sử dụng thông qua `NAME`
- Đặc biệt, nếu WORDS không được chỉ định cụ thể, vòng lặp sẽ tự động sử dụng danh sách tham số truyền vào file `Bash`.
- VD: in các thư mục con có trong thư mục hiện tại, kết hợp lệnh điều kiện `if` để bỏ qua không in tên các file không phải thư mục:
![](https://images.viblo.asia/0beff348-9ecf-4147-9303-6d40c0e6f9e9.png)

### 2) Vòng lặp `while`
- Cú pháp: `while CONDITION; do COMMANDS; done`
- Không giống như vòng lặp `for` chỉ thực hiện dựa trên số lần lặp cố định (nếu không chỉ định `exp2` thì `for` sẽ trở thành vòng lặp vô hạn) , `while` không có số vòng lặp cụ thể, mà chỉ kết thúc khi `CONDITION` không còn thỏa mãn. Vì vậy, khi sử dụng `while`, ta cần chú ý thay đổi điều kiện khi cần thiết làm cho `CONDITION` có thể sai để vòng lặp kết thúc, tránh gây lãng phí bộ nhớ.
- VD: In các số nguyên từ 0 đến 9 (`-lt` có nghĩa là little than)

![](https://images.viblo.asia/3cae9748-d34f-4001-ace5-2784792e2e82.png)

- VD2: Cùng vòng lặp này, nếu thay vì tăng giá trị của `$i` ta lại giảm nó đi thì vòng lặp sẽ không bao giờ kết thúc do điều kiện `CONDITION` sẽ luôn đúng khi giá trị `$i` giảm đi. Khi gặp tình trạng này, ta có thể dùng `Ctrl+C` để hủy việc thực hiện vòng lặp. Dù sao, ta cũng nên hạn chế việc này.

![](https://images.viblo.asia/5b0c3783-de9f-4b5e-bec7-2ffda1daa0bf.png)

- Tác hại của vòng lặp vô hạn có thể thấy rất rõ khi %CPU bị đẩy lên rất cao (Core4 đạt mức 100%, bình thường chỉ khoảng 0.7%)
  + Khi hệ thống bình thường

  ![](https://images.viblo.asia/39108173-8e3f-4d51-ba63-cbb9d8ab5ed5.png) 
  + Khi có vòng lặp vô hạn hoạt động

  ![](https://images.viblo.asia/e3eb4536-b512-49cd-bdeb-345d183ab087.png)

### 3) Vòng lặp `until`
- Cú pháp: `until CONDITION; do COMMANDS; done`
- Vòng lặp `until` có thể coi là sự kế thừa của vòng lặp `repeat until` trong ngôn ngữ lập trình **Pascal**.
- Vòng lặp này chỉ khác vòng lặp `while` ở cách thực thi, ở đây, `COMMAND` sẽ còn thực hiện khi `CONDITION` không thỏa mãn (ở `while` thì thực hiện khi `CONDITION` thỏa mãn)
- VD: Vẫn là in các số từ 0 đến 9 nhưng điều kiện sẽ đổi thành `-ge` (greater than or equal) thay vì `-lt` ở `while`

![](https://images.viblo.asia/cec32b7d-e0f1-4484-a841-55823d015e3b.png)

## Điều kiện dừng vòng lặp
Do tính chất vòng lặp có thể thực thi rất nhiều lần và đôi khi có một số lần lặp không cần thiết và cần dừng, do đó **Bash** cũng cung cấp 1 số cú pháp để dừng vòng lặp khi cần thiêt:
### Dừng theo điều kiện *CONDITION*
Ở trên tôi có sử dụng các từ như `-lt`, `-ge`, đây là các cú pháp sử dụng khi muốn dừng vòng lặp tại `CONDITION`, ngoài ra **Bash** còn hỗ trợ các ký hiệu sau (chú ý các ký hiệu này không phải của **Bash** mà là của câu lệnh `test`):
* `-eq`: bằng (equal)
* `-gt`: lớn hơn (greater than)
* `-le`: nhỏ hơn hoặc bằng (little than or equal)
* `-ne`: không bằng (not equal)
Ngoài ra còn rất nhiều ký hiệu hữu ích khác mà bạn có thể dễ dàng kiểm tra thông qua câu lệnh `man test`.

### Dừng theo điều kiện trong *COMMAND*
**Bash** hỗ trợ 2 cú pháp bao gồm `continue` và `break`, tương tự như trong các ngôn ngữ lập trình phổ biến
* `continue`: thực hiện ngay lập tức lần lặp tiếp theo cho dù lần lặp hiện tại vẫn còn câu lệnh chưa thực hiện xong.
![](https://images.viblo.asia/937ed9c5-a9ec-4d28-99bf-5648e2a8932e.png)

* `break`: thực hiện việc kết thúc vòng lặp cho dù còn bao nhiêu lần lặp đi nữa.
![](https://images.viblo.asia/750fb893-fe5d-4434-b476-e783ae6d839c.png)

# Các câu lệnh hữu ích khác của *Bash*
* `alias`: Cú pháp dùng để gán tên cho một chuỗi các lệnh thực thi phức tạp  
VD: ``` alias print_10_number='for (( i=0; i < 10; i++ )); do echo $i; done' ```
![](https://images.viblo.asia/6948f327-217f-4dbf-983d-d761a2428bda.png)

* `history`: Dùng để in danh sách các câu lệnh **Bash** được sử dụng gần nhất.
* `test`: Không được cung cấp bởi **Bash** tuy nhiên lại được sử dụng nhiều nhất, dùng để kiểm tra điều kiện.
* `getopts`: Truy cập với các tham số dòng lệnh
   VD: Chương trình đơn giản yêu cầu 1 giá trị số nguyên (< 10) và 1 giá trị chuỗi ký tự
   ```
   #!/bin/bash
   usage() { echo "Usage: $0 [-i (< 10)] [-s <string>]" 1>&2; exit 1; }
   while getopts ":i:s:" o; do
       case "${o}" in
           i)
               i=${OPTARG}
               ((i < 10)) || usage
               ;;
           s)
               s=${OPTARG}
               ;;
           *)
               usage
               ;;
       esac
   done
   shift $((OPTIND-1))
    if [ -z "${i}" ] || [ -z "${s}" ]; then
        usage
    fi
    echo "i = ${i}"
    echo "s = ${s}"
   ```
   ![](https://images.viblo.asia/b0e2f57a-d8b6-4dd5-a0bc-4b7a2bf35832.png)
   
* `exit`: Thoát khỏi **Bash** shell.
# Lời kết
Với hiểu biết còn hạn hẹp, qua 2 bài viết về **Bash** script, tôi chỉ trình bày những điều cơ bản nhất của ngôn ngữ kịch bản này. Tuy nhiên cũng là vừa đủ để bạn có thể bắt đầu làm quen và tự viết các Scrip của riêng mình. Hy vọng qua hai bài viết này các bạn sẽ thấy hữu ích và có thể rút ngắn được thời gian thao tác với các câu lệnh **Linux** trên cửa sổ dòng lệnh. Cảm ơn mọi người đã đọc bài viết.  
> *Linux is fun. Bash is awesome* - **GoLoCe**
# Tài liệu tham khảo
* https://viblo.asia/p/don-gian-hoa-tac-vu-trong-linux-voi-bash-script-phan-1-gGJ59gaGZX2
* https://bash.cyberciti.biz/guide/Main_Page
* http://www.tldp.org/LDP/Bash-Beginners-Guide/html