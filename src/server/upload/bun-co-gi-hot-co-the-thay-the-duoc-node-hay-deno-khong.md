## Giới thiệu

Hello các bạn, mình là Toàn Hồ. Hiện tại mình đang là Frontend Engineer

Là một Frontend Engineer, hàng ngày các bạn đều sẽ bắt gặp vài library mới ra đời nhằm giải quyết vấn đề abc, xyz,…

Hôm nay mình sẽ giới thiệu với các bạn, không phải library, mà là javascript run time. Nó tên là Bun (mình nghĩ Bun trong bundler hay gì đó đại loại thế, chứ ko phải Bún, Phở đâu nha :D)

![image.png](https://images.viblo.asia/2bc046f0-ae6d-43c3-89aa-8270c5fd9cc0.png)

## [Bun](http://Bun.sh) là gì?

![image.png](https://images.viblo.asia/26a50e77-18ac-49af-94b5-a46ded85a0f6.png)
<div align="center">(klq mà logo của Bun nhìn cute ghê)
</div>

Bun là javascript runtime giống như Node và Deno. Được giới thiệu là nhanh và có rất nhiều built-in function

Trước khi đi sâu hơn về Bun, mình sẽ giới thiệu một chút về javascript runtime

## Javascript runtime là gì?

> Warning: Có nhiều định nghĩa liên quan tới Javascript runtime, và chưa có định nghĩa hoàn chỉnh cho nó. Dưới đây là mô tả theo cách hiểu của mình, chỉ mang tính chất tham khảo

Hãy tưởng tượng Javascript là nhiên liệu (xăng, dầu,…). Trong thực tế, nhiên liệu chuyển hoá thành năng lượng nhờ vào động cơ.

Đối với Javascript, động cơ (engine) chuyển hoá nhiên liệu thành mã máy (machine code). Động cơ phổ biến nhất hiện nay là: V8 engine (Google)

![image.png](https://images.viblo.asia/1b0867e3-c275-417e-bfe2-e3a5b0250c7e.png)
Động cơ thôi là chưa đủ. Là một người bình thường, cái chúng ta cần là một loại phương tiện hoàn chỉnh. Đó có thể là xe hơi, máy bay,… với đầy đủ tính năng như: đèn, phanh, còi,… 

Ở đây, javascript runtime chính là xe hơi, máy bay

Ví dụ:

- browser runtime environment (Chrome, Firefox, Edge,…) sẽ cung cấp các APIs như: window, DOM, HTTP request,…
- node runtime environment thì sẽ cung cấp các APIs như: process, required,….

Nhờ vào các javascript runtime environment, mà engineer mới có thể tương tác được với DOM object (frontend) hay process (backend).

## Bun có gì đặc biệt?

### **Hiệu năng**

Dưới đây là so sánh giữa Bun, Node và Deno (số liệu từ [https://bun.sh/](https://bun.sh/))

![image.png](https://images.viblo.asia/b0cfcd3a-99b8-4551-9856-e700508024ac.png)
![image.png](https://images.viblo.asia/e9913646-11b4-4426-96ca-b8b56572ce64.png)
![image.png](https://images.viblo.asia/01ddaac8-6ca3-4dee-aaa4-1fcdd7d1026e.png)

Có thể thấy Bun rất nhanh (nhanh 3 đến 4 lần khi so sánh với Node và Deno)

**Bí mật đằng sau** 

Để đạt được tốc độ đáng kinh ngạc như vậy, thì Bun dùng JavascriptCore (from Webkit) thay vì V8 như Node và Deno.

> JavascriptCore được đánh giá là nhanh hơn V8 Engine

*(cho các bạn thắc mắc tại sao ngay lúc đầu thằng Node và Deno không xài JavascriptCore đi? không chắc đó có phải là lí do chính hay không, nhưng interact với V8 dễ hơn JavascriptCore)*

![image.png](https://images.viblo.asia/154bbdf5-c9ec-4ab8-99f4-f5d2ac95a386.png)
Thêm nữa, Bun được viết bằng Zig ([https://ziglang.org/](https://ziglang.org/)) (low level programming language ra đời vào năm 2016, các bạn có thể hình dung nó giống như C hoặc Rust)

Cuối cùng, tác giả của Bun nói rằng nó có không có hidden flow, nên giúp cho việc viết phần mềm trở nên đơn giản hơn

### All-in-one

- Bun có sẵn native bundler → Chúng ta không cần dùng webpack nữa :open_mouth: 
- Bun có native transpiler → Có thể viết typescript trực tiếp, với một vài cool feature như: `await function` có thể nằm ở ngoài cùng của file (Deno cũng có cái này),…
- Web APIs như: fetch, WebSocket,… đều được Bun support
- Tương thích với NPM packages
- …

(các bạn vào trang chủ để đọc thêm: [https://bun.sh/](https://bun.sh/))

## Demo

![image.png](https://images.viblo.asia/ce16fdeb-7fc9-4a24-95be-956089e7d202.png)
(nguồn: [https://twitter.com/jarredsumner/status/1449729989432074244/photo/1](https://twitter.com/jarredsumner/status/1449729989432074244/photo/1))

Dựa vào hình trên, có thể thấy `bun create react app` nhanh hơn `yarn create react app` 11 lần 😲

Quá khủng khiếp

## Kết luận

- Chúng ta có thể thấy Bun rất triển vọng, nhưng để thay thế được Node thì mình nghĩ là chưa. Vì Bun mới đang là beta version, cần thời gian để chứng minh độ hiệu quả.
- Rất tốt nếu các bạn dùng Bun cho pet project, vì nó xịn như vậy, thì ngại gì không thử 😃

## Nguồn tham khảo

- Idea, outline mình tham khảo chính ở video này: [https://www.youtube.com/watch?v=FMhScnY0dME](https://www.youtube.com/watch?v=FMhScnY0dME&t=70s)
- [https://stackoverflow.com/questions/29027845/what-is-the-difference-between-javascript-engine-and-javascript-runtime-environm](https://stackoverflow.com/questions/29027845/what-is-the-difference-between-javascript-engine-and-javascript-runtime-environm)