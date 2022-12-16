Đây là phần tiếp theo của [một tuần chán đời đi cày rank viblo code
](https://viblo.asia/p/mot-tuan-chan-doi-di-cay-rank-viblo-code-RnB5pzqGZPG), chuyên mục CTF. <br>
Cũng chú thích luôn với các bạn là trước khi sử dụng các dịch vụ của Viblo (Code/CTF) thì mình cũng chưa chơi mấy cái này bao giờ, nên mong mọi người đừng nghĩ mình pro gì nhé :'<

### Gáy trước, nói chuyện sau.
8 ngày Tết thì làm gì?
![](https://images.viblo.asia/c6ca0109-8e25-4d37-a9e4-7d6c6f809892.png)

2 tuần tiếp theo phá đảo thế giới ảo.
![](https://images.viblo.asia/b50f0cc5-382d-44a0-a62c-a7aa137cb81d.png)

Sau khi được mời làm CTF bởi các anh em cyber thì mình cũng đã tryhard cho bõ. Hết bài rồi, hú. Đến lượt mình được mời ra đề (dead)

![](https://images.viblo.asia/40db9e33-087d-49b1-8697-b17000ab0d00.png)
Những bài nào mình thấy hay/khó đều có writeup đầy đủ. Nếu bạn muốn tìm hiểu hãy đừng ngại give up mà vào đọc nhé. Các bài tập rất beginner-friendly.

### Giới thiệu về Viblo CTF
Như tên gọi, đây là một trang web gồm các bài CTF (Capture the Flag). Mục đích của các bài này là tìm một dòng chữ là "cờ" (ở trang này có định dạng `Flag{cờ_k1ểu_như_tk3_n4y_n3}`), qua việc sử dụng các exploit, code xử lý các bài toán, và hơn nữa. Như footer của trang web đã nêu, Viblo CTF lấy cảm hứng cả design lẫn thiết kế từ [HackTheBox](https://www.hackthebox.eu/), một trang Wargame CTF khác rất hay. Nếu bạn định theo ngành cybersec/học lấy OSCP, hãy sử dụng HTB; còn Viblo CTF như một phiên bản cơ bản hơn của nó vậy:
- Lượng bài hơi ít (tuy nhiên bên HTB thực ra cũng ít)
- Không (chưa) có loại `pwn` - loại bài khó nhất, dành cho các cơ thủ chuyên nghiệp.
- `stego` chẳng bao giờ có hint nên sẽ không thể làm ra đâu (cảm ơn các admin đã hint em/anh chút ít mỗi lúc bí).
- bài ra cứ thỉnh thoảng lại có sự cố: lúc thì chọn server xịn quá giấu luôn file cần tìm, lúc thì đề bài ra thiếu dữ kiện (LMAO)
- Xào lại của các trang khác nhiều nên google ra cũng nhiều.
- Mục `web` khá cơ bản/bài bản, không quá cầu kỳ (sử dụng nhiều exploit/hack quá nhiều bước) và thực sự là khá vui.

Nói chung là ngoài các sự cố ra thì Viblo CTF là một trang giới thiệu người mới như mình đến với CTF rất ổn. 8/10, 9 với "cơm."

### Những gì đã học được
- Có text input qua request GET/POST? Ngay lập tức thử pass array vào coi sao?

*Ví dụ:* nếu request là `?field=`, hãy bắn thử `?field[]=` coi sao. Kết quả sẽ không làm bạn thất vọng :D
- Các mánh lặt vặt học được mà không thể nói ra không bài đơn giản quá.
- Với các bài có password, hãy thử một dictionary -- nổi tiếng nhất là [`rockyou.txt`](https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt) **Chú ý: file to 135Mb**.
- Hãy học cách xài `RsaCtfTool`, `sagemath`, `pycryptodome` cho các bài `crypto`.
- Hãy dùng `DIIT`, `StegSolve`, `stego-toolkit` cho các bài `stego` bằng ảnh.
- Hãy học cách dùng `socket` trong Python, hoặc module `pwntools`/`pwnlib` cho các bài sử dụng `netcat`.
- Hãy học SQL Injection, hoặc ít nhất học cách xài `sqlmap`.
- Hãy học Template Injection, hoặc ít nhất học cách xài `tplmap`.
- Hãy dùng Burp Suite để chặn request mà phân tích, và Postman để bắn POST request lên các server cần thiết. Tuy nhiên Burp giao diện của Java nên xấu thấy bà nội.

### Các mánh farm điểm tự rút ra

Ngày xưa mình cũng học nhiều thuyết số nhưng làm xong mấy bài crypto mới thấy là mình quên gần hết rồi =))

- `Reversing`: tất cả những gì bạn cần là flag, thế nên kệ mẹ reversing đi, tìm những cái gì đưa ra được flag là được :) (nhất là các chuỗi số nhìn giống ASCII)
- `Stego`: không có hint đố bạn làm ra. Cố gắng lên, nhưng đừng tự làm khổ mình; và nếu bạn muốn bỏ cuộc thì cứ bỏ cuộc nhé đừng ngại. Nếu bạn muốn hint, comment dưới này hoặc pm mình nhé. Nếu bạn là nữ xinh thì cafe cũng được ahihi
- `Web`: thực sự là làm có cảm giác rất mở mang đầu óc. Hãy tìm writeup trên mạng, tự tò mò vọc; mình chứng nhận là rất vui! Sau 2 tuần mình đã biết viết `Warning:  strlen() expects parameter 1 to be string, array given in /var/www/html/index.php on line 20` bằng PHP!
- `Programming`/`Misc`: nó sẽ khá là tương tự với những gì đã làm ở Viblo Code, nên hãy thử xem. Cũng khá thú vị đó.
- **Google is your friend.** Hãy Google đi vì bạn sẽ tìm được nhiều lời giải trên đó lắm =)) Và nếu có không tìm được thì bạn cũng đọc được nhiều lời giải các bài CTF khác mở mang đầu óc :D

### Đánh giá về một số bài tiêu biểu

- **Thích**: [**OTP** - *Rank S*](https://ctf.viblo.asia/puzzles/otp-ilvjvco01mz)

Cho dù là rank S, nhưng bài này không quá khó. Hãy thử đi!

- **Thích**: [**Video0110** - *Rank A*](https://ctf.viblo.asia/puzzles/video0110-suxab6x8jkq)

Phải qua 3 lớp mới đến được đáp án, nhưng các bước đều rẩt tự nhiên. Hơi nhạt tí tẹo, 9/10.

- **Thích**: [**Hacker Chi Dan** - *Rank A*](https://ctf.viblo.asia/puzzles/hacker-chi-dan-chdwbagtjz4)

Reverse PHP khá đơn giản, và là real case-study (và cũng là Sun* Cybersecurity training :D) Nhớ để ý endpoint lúc bắn payload.

- **Thích**: [**Be A Team** - *Rank B*](https://ctf.viblo.asia/puzzles/be-a-team-jxhbeidw6m1)

Như mấy bài đố vui có thưởng. Vui.

- **Ghét**: [**Eat "cơm"** - *Rank B*](https://ctf.viblo.asia/puzzles/eat-com-g82fgk9vfxl)

Không có hint đố ai làm ra. Hint: stego có password.

- **Thích**: [**Decode Me** - *Rank C*](https://ctf.viblo.asia/puzzles/decode-me-vkhrxvutxr0)

Khá straightforward. Flow tự nhiên. 10/10.

- **Thích**: [**It's OT TIME!** - *Rank C*](https://ctf.viblo.asia/puzzles/it-s-ot-time-pofkh4esw6w)

Đề bài đơn giản, thiết kế có khiếu hài hước nhẹ nhàng mà thanh tao. 69/420.

- **Ghét**: [**Vietnam in my heart** - *Rank C*](https://ctf.viblo.asia/puzzles/vietnam-in-my-heart-mf5nsvnow1o)

Không có hint đố ai làm ra. Hint: giấu file, platform dependent.

- **Ghét**: [**Demonic Language** - *Rank C*](https://ctf.viblo.asia/puzzles/demonic-language-vxjjeobbdjz)

Nội dung dễ làm người ta tưởng là có thể phân tích tay (bạn không thể phân tích tay được đâu, tin tôi đi). Hint: trong đề bài có khi đó là "code":
> Mr. Tien sent me this code.
> 
và file đó cũng tên là `code.zip`.

- *Bình thường*: [**We're out of idea, let's call it Web2** - *Rank C*](https://ctf.viblo.asia/puzzles/we-re-out-of-idea-let-s-call-it-web2-hlygivzyghj)

Bài này nó dễ lắm. Dễ cực. Thề. Dễ quá đáng luôn. Làm đi ez điểm đó.

- **Thích**: [**Do you love cat?** - *Rank D*](https://ctf.viblo.asia/puzzles/do-you-love-cat-zrtyv9llx1e)

Trời ơi bài này nó cuteeeeeeeeeeeeeeeeeeee

- *Bình thường*: [**Decode Hash** - *Rank D*](https://ctf.viblo.asia/puzzles/decode-hash-gfgc8oroj3s)

Mình chỉ muốn nói là bài này thì các bạn hãy thử đoán đáp án trước khi nghĩ đến lời giải thật =))

### Kết?
Mục `stego` như đã nói trên rất khó, nên nếu bạn nào cần hint mình sẵn sàng giúp đỡ hết mức có thể mà không spoil lời giải, DM mình nha các bạn nữ ( ͡° ͜ʖ ͡°)

Mình đã là người đầu tiên lên rank S bên Viblo Code (yayyy) nhưng mà đã bị vượt lại rồi (noooo). Còn 2 câu nữa sẽ phá đảo (lại), nên các bạn chờ đó.

Và kết cuối cùng, cảm ơn anh @vigov5 và em @minhtuanact đã làm admin trang này và giúp đỡ :)