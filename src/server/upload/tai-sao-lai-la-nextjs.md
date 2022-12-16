Next.js là một framework dùng để phát triển các ứng dụng React theo tư tưởng Isomophic (Universal ), được phát triển bởi [Zeit](https://zeit.co).
Nhờ Next.js chúng ta có thể dễ dàng tạo được một ứng dụng React theo tư tưởng Isomophic, có bao gồm chức năng Server Side Redering.

# Tại sao cần Server Side Rendering (SSR)?
Server Side Rendering cho React có nghĩa là cho thực hiện JavaScript ở phía server để rendering React, rồi sau đó trả kết quả (html) về phía client.
Tại sao cần phải làm như vậy?

Ở Single Page Application (SPA), việc rendering được thực hiện ở Client, cho nên khi chuyển màn hình hay có biến đổi ở màn hình, những nơi nào cần thiết sẽ được rendering lại mà không cần phải load lại cả trang như cách truyền thống. Single Page Application (SPA) giúp người dùng có trải nghiệm tốt hơn, tuy nhiên có hai vấn đề như sau.
1. Thời gian trả về First View lâu
So với phương pháp trả html trực tiếp từ Server về thì SPA sẽ tốn nhiều thời gian hơn. Bởi vì sau khi Server trả response về, phía Client phải thực hiện JavaScript mới tạo được html để hiển thị.
Mất nhiều thời gian hiển thị First View có thể khiến chúng ta mất nhiều người dùng.
2. SEO
Trong trường hợp không SSR, thì tại thời điểm Server trả response, html chưa được sinh ra, nên không thể chắc chắn rằng clawler của Search Engine sẽ nhận biết được content của chúng ta.
Nghĩa là trang web của chúng ta sẽ bị yếu thế trong SEO.

Bằng việc kết hợp giữa SPA và SSR, chúng ta sẽ lấy được điểm tốt của mỗi phương pháp. Việc đó được thực hiện bằng cách cho chỉ SSR ở lần đầu tiên, và kể từ sau đó các biến đổi ở màn hình sẽ được thực hiện như một ứng dụng SPA.

# Isomophic (Universal) JavaScript
Một khái niệm nữa được đề cập ở đây đó là Isomophic JavaScript.
Isomophic JavaScript là cơ chế để dùng chung code source giữa Frontend và Backend.
Ví dụ như khi chúng ta phát triển ứng dụng mà ngôn ngữ dùng ở Frontend và Backend khác nhau, thì việc validation ở Frontend và Backend phải được thực hiện một cách riêng biệt.
Điều đó khiến cùng một logic chúng ta phải thực hiện đối với nhiều ngôn ngữ khác nhau, vừa tốn công code, maintain lại càng khó.

Ở Isomophic JavaScript, bằng việc thống nhất source giữa Frontend và Backend, chúng ta sẽ giải quyết được vấn đề đó.

Universal JavaScript là một tư tưởng phát triển từ Isomophic JavaScript. Ở Universal JavaScript, vấn đề không chỉ nằm ở Frontend và Backend, mà code source được tạo ra để chạy được kể cả ở môi trường mobile hay các thiết bị nhúng. Nguồn gốc của Univeral JavaScript là từ bài viết dưới đây.

https://cdb.reacttraining.com/universal-javascript-4761051b7ae9#.d39eaqcjp

# Tóm lại
Dùng Next.js nhằm mục đích:
 1. Dễ dàng thực hiện Server Side Rendering (để khắc phục các điểm yếu của Single Page Application)
 2. Thực hiện tư tưởng Isomophic (Universal) JavaScript

Tài liệu về Next.js các bạn có thể tham khảo tại [đây](https://nextjs.org/docs/)