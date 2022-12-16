## Tại sao nên đọc bài này?

- Biết được react 18 có gì hot. Có nên update không?
- Có feature gì có thể tận dụng được ở React 18

## React 18 - Một version linh hoạt hơn - nhưng cũng khó hơn

### Automatic batching

![Untitled.png](https://images.viblo.asia/681109dc-4c7b-4f8d-a7ed-0c0f8657cd1b.png)


Trước đây trong một hàm, khi bạn `setState` 2 lần thì app của các bạn cũng sẽ render 2 lần. Kiểu như vầy

![React_18_-_Frame_1.jpg](https://images.viblo.asia/1e100f5e-846e-4d1e-bb66-224d1f241887.jpg)

Thay vì phải render 2 lần, do mình đổi state state 2 lần, thì version mới sẽ gom lại một lần để tạo ra state cuối cùng rồi render luôn.

Với kinh nghiệm của mình thì cái này cực kì lợi hại. Vì hầu hết performance của React app đều bị ảnh hưởng rất lớn ở đoạn render, do đó, nếu skip được những lần render thừa như vậy thì app của chúng ta sẽ cực kì smooth luôn

Good job react team!

### startTransition

![Untitled 1.png](https://images.viblo.asia/c2a3481d-9f2c-4fa6-9989-8154581f6762.png)

Okey, lại thêm một `hook` mới liên quan tới việc render. Vậy cái hook này để làm gì?

Trong một component, sẽ có những phần cần được render/xử lý sớm hơn những phần còn lại. Hầu hết các phần xử lý tương tác với user sẽ cần được priority hơn là những phần còn lại như là show kết quả, hiện loading,...

Mình lấy một ví dụ kinh điển là component search. Thường phần user input sẽ cần được handle ngay lập tức, còn phần thể hiện kết quả thì delay xíu cũng được.

![Untitled 2.png](https://images.viblo.asia/ddd0ab32-d6a9-4a34-ba77-1ed85e46ab8a.png)

Như trên hình, phần kết quả phụ thuộc vào ô search ở trên. Nếu user gõ khá nhanh, thì những kết quả ở dưới sẽ bị out-date, do đó cần render lại. Vậy state của ô Input là high priority, còn state để thể hiện kết quả là low priority

Mình lấy ví dụ khi user gõ “AB” vào ô search thì react sẽ chạy bên dưới như sau

[![React-18-Frame-3.jpg](https://i.postimg.cc/nhsXdJm0/React-18-Frame-3.jpg)](https://postimg.cc/DSTfZRBX)

Với hook mới này từ react, thay vì phải render UI khi user gõ từ A (Trong khi user đã gõ AB luôn rồi), sau đó mới render kết quả cuối cùng cho “AB” thì bây giờ, nó có thể skip luôn việc xử lý state và render khi user mới chỉ gõ “A” vào ô search

### Suspense API có thêm một vài improve

![Untitled 3.png](https://images.viblo.asia/7c3f3ac4-4ec2-4162-87a4-e0e8c131ebf8.png)
![Untitled 4.png](https://images.viblo.asia/0e3c5544-edbc-4532-9d82-e3ef0a438ac2.png)


Nếu react chạy trên server với Suspense, thì nó sẽ render fallback component và sau đó nếu component bên trong Suspense đã ready để render, React sẽ send bundle code cho phần này riêng

![React_18_-_Frame_4.jpg](https://images.viblo.asia/805f88bd-af17-4120-8a22-694886eb69cc.jpg)

Lấy ví dụ cho đơn giản nhé, ví dụ component `<Comments />` load data, và cục data này cần 3s mới trả về.

Thì với React 17, server phải chờ data đã load về rồi mới render ra được HTML, xong rồi trả về cho user. Nghĩa là, chắc chắn, user phải chờ hơn 3s mới có thể nhận được response

Với React 18, server sẽ không chờ data load về mà render luôn fallback component, ở đây là `<Spinner />`  rồi sau đó, nếu component `<Comments />` load xong thì gửi thêm một bundle riêng để client bỏ vào. Đồng nghĩa với việc, user không phải chờ 3s mới có response mà vấn có thể load được web và xem các component khác

Túm lại, với React 18, một component nếu gói trong `<Suspense />` thì sẽ không làm chậm các thành phần render khác

![Untitled 5.png](https://images.viblo.asia/5ac37d74-c0bd-4788-b0dc-bd498038b435.png)

Ngoài ra, ở phía client, nếu component được gói trong `<Suspense />` thì khi user interact với component này sẽ được ưu tiên xử lý trước

Và một vài thứ khác nữa

[React v18.0 - React Blog](https://reactjs.org/blog/2022/03/29/react-v18.html)

## Có nên update không?

Không, mấy cái project làm chơi thì được. Mình thấy khá nhiều users complain khi upgrade lên version mới này thì không chạy được nữa, ngay cả với Nextjs. Do đó mình khuyến khích mọi người nghịch thì được chứ upgrade lên project công ty thì vỡ alo đó

[How to Upgrade to React 18 - React Blog](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html)

## Vậy thì khi nào?

Với kinh nghiệm của mình thì mỗi lần Big Update từ React thì nên đợi tầm 6 tháng - 1 năm thì mọi thứ mới có thể fit với nhau được

## Tổng kết

Với roadmap của React hiện tại, team đang chú ý rất nhiều vào performance, đặc biệt là Interactive performance. Do đó, nếu các project thiên nhiều về xử lý logic, render state thì sắp tới sẽ có những improve rất lớn

Riêng mình thì vẫn đang chờ React support lazy hydrating component, hy vọng sẽ có trong tương lai không xa!

Bài gốc: https://thanhle.blog/vi/blog/react-18-co-gi-hot