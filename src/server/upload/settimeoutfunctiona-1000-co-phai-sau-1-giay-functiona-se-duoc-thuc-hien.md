Để trả lời cho câu hỏi trên, cùng thực hiện 2 ví dụ để xem kết quả là gì nhé!

Ví dụ 1: 
```
console.log(1);
setTimeout(function () {
  console.log(3);
}, 1000);
console.log(2);
```
Trong ví dụ trên, thứ tự hiển thị sẽ là 1, 2 rồi đến 3, và số 3 xuất hiện sau 1 giây.
```
1
2
3 //will appear after 1s
```
OK chuẩn rồi, tiếp tục đến ví dụ thứ 2.

Ví dụ 2:
```
console.log(1);
setTimeout(function () {
  console.log(3);
}, 1000);
for (let i = 0; i < 1e+25; i++) {
  //do nothing
}
```
Kết quả khi chạy là sau 1 giây, số 3 sẽ không xuất hiện. Tại sao vậy, theo lý thuyết nó phải xuất hiện chứ?  Cùng tìm hiểu tại sao lại thế nhé. 

Javascript chỉ thực thi <b>đơn luồng</b>, có nghĩa là <b>tại mỗi thời điểm chỉ có một tác vụ được thực thi</b>. Do đó, function setTimeout ở trên chỉ thực hiện khi kết thúc vòng lặp, và vòng lặp này chạy tới 1e+25 nên thời gian để chạy là rất lâu. Vì vậy, mặc dù thời gian mong muốn là 1 giây sẽ in ra số 3, nhưng thực tế phải đợi cho tới khi nào vòng lặp thực hiện xong. Điều đó có nghĩa rằng bạn set 1000ms vào setTimeout nhưng không phải sau đúng 1000ms là function sẽ được thực thi, ngay cả với trường hợp 0ms, function cũng không chắc chắn được thực thi ngay lúc đó. 

Thử xem lại định nghĩa về setTimeout là gì tại [<b>đây</b>](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) nhé.
> delay | Optional
> 
> The time, in milliseconds (thousandths of a second), the timer should wait before the specified function or code is executed. If this parameter is omitted, a value of 0 is used, meaning execute "immediately", or more accurately, the next event cycle. Note that in either case, the actual delay may be longer than intended.

<br />
Nếu tham số này không được truyền, thì giá trị 0 sẽ được sử dụng, có nghĩa là "ngay lập tức", <b> hoặc chính xác hơn, trong chu kì sự kiện tiếp theo </b>. Lưu ý rằng thời gian thực tế có thể lâu hơn so với dự kiến. 

OK vế đầu là những cái cơ bản chúng ta biết, còn cái "hoặc" phía sau có nghĩa là gì, chu kì sự kiện tiếp theo là gì?

Đây là cơ chế hoạt động của <b>Event loop</b>.

![](https://images.viblo.asia/6845ae20-7620-42e1-b064-25b4da77ce96.png)

Event loop chỉ có duy nhất 1 nhiệm vụ, theo dõi call stack và những tác vụ nào cần thực hiện trong callback queue. Chỉ khi nào call stack trống, thì nó sẽ lấy tác vụ đầu tiên trong callback queue ra và đẩy vào call stack. 

Để minh họa đơn giản cho ví dụ 2, mình nhóm từng bước vòng lặp lại là loop_at_i=0, ... loop_at_i=X (với 0 < X < (1e+25)-1), loop_at_i=(1e+25)-1.

1. Call stack rỗng, chưa có gì được thực hiện

![](https://images.viblo.asia/cc7ea1b6-024c-4cdc-b342-80e37f334979.png)

2. `console.log(1)` được đẩy vào stack

![](https://images.viblo.asia/fbfbe051-d231-4052-b949-5cf9039b32a7.png)

3. `console.log(1)` được thực hiện

![](https://images.viblo.asia/af19d697-b406-49a9-bb61-115c3f18c246.png)

4. `console.log(1)` bị xóa khỏi stack

![](https://images.viblo.asia/8914f02e-d2c1-42fe-af23-da1ceeed2fc5.png)

5. `setTimeout` được đẩy vào stack 

![](https://images.viblo.asia/b3fa2b4c-cbc6-45cb-88cb-3fcaccabf3b2.png)

6. `setTimeout` được thực hiện

![](https://images.viblo.asia/abf1b4a0-d915-428c-bf89-4912581fc638.png)

7. `setTimeout` bị xóa khỏi stack

![](https://images.viblo.asia/ef8bcf6a-297b-48bc-b247-dcfd383ff91a.png)

8. `loop_at_i=0` được đẩy vào stack

![](https://images.viblo.asia/f9ef26b5-887f-409c-b17a-afe955e36e87.png)

9. `loop_at_i=0` được thực hiện (Không có gì thay đổi)
10. `loop_at_i=0` bị xóa khỏi stack

![](https://images.viblo.asia/50376a5f-4fa1-4d67-8791-46ffa5c3c0be.png)

11. Sau 1s, `cb` được đẩy vào callback queue

![](https://images.viblo.asia/d297c111-ddda-4356-ac94-140c23b28a59.png)

12. `loop_at_i=X` được đẩy vào stack

![](https://images.viblo.asia/08ca2d43-939c-48ab-9222-a026fc730c5b.png)

13. `loop_at_i=X` được thực hiện (Không có gì thay đổi)
14. `loop_at_i=X` bị xóa khỏi stack

![](https://images.viblo.asia/8678fb45-8f11-4d38-8a2d-33919c12cc40.png)

15. `loop_at_i=(1e+25)-1` được đẩy vào stack

![](https://images.viblo.asia/0b86dad6-b9b3-47e3-b64d-50546fd4a4cc.png)

16. `loop_at_i=(1e+25)-1` được thực hiện (Không có gì thay đổi)
17. `loop_at_i=(1e+25)-1` bị xóa khỏi stack

![](https://images.viblo.asia/8678fb45-8f11-4d38-8a2d-33919c12cc40.png)

18. stack trống, event loop đẩy `cb` vào stack

![](https://images.viblo.asia/26fd1861-15d8-40be-9c3b-4665dc03047f.png)

19. `cb` được thực hiện, đẩy `console.log(3)` vào stack

![](https://images.viblo.asia/702982d6-671f-4740-9521-bbb26f67d5fb.png)

20. `console.log(3)` được thực hiện

![](https://images.viblo.asia/bf5ada36-da2e-4c7f-bf6d-7763f0770ce2.png)

21. `console.log(3)` bị xóa khỏi stack

![](https://images.viblo.asia/59021034-1d75-4043-a22b-7e1f7bee06b4.png)

22. `cb` bị xóa khỏi stack

![](https://images.viblo.asia/2bdd76c7-45c4-4f80-bb91-0793636d29ee.png)

<br />
Vậy trả lời thế nào là đúng cho câu hỏi ở tiêu đề, đó là functionA sẽ được thực hiện sau <b>ít nhất</b> 1 giây.


<br/>
<br/>

Tài liệu tham khảo:

https://medium.com/javascript-in-plain-english/better-understanding-of-timers-in-javascript-settimeout-vs-requestanimationframe-bf7f99b9ff9b

https://dev.to/khaosdoctor/node-js-under-the-hood-3-deep-dive-into-the-event-loop-135d