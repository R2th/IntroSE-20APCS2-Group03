## I. Turborepo là gì?
- Turborepo là một `fast build system` được xây dựng dành cho các project Javascript/Typescript monorepos - Codebase bao gồm những project (từ nhiều library/framework khác nhau) sử dụng chung business logic, utils,...
- Monorepos có rất nhiều ưu điểm, nhưng để triển khai thì khá phức tạp. Turborepo thì khác, họ cung cấp các tooling và giải pháp, giảm độ phức tạp của các configuration, scripts, tooling vào 1 config `turbo.json`. Hơn thế nữa, Turborepo còn dễ dàng tích hợp vào các codebase hiện tại mà không mất quá nhiều effort.

## II. Tại sao lại chọn Turborepo
Để trả lời câu hỏi này, chúng ta cùng đi qua một vài ưu điểm mà Turborepo mang lại nhé:
1. Tính nhất quán (Consistency) - Dễ dàng chia sẻ các Business logic, UI modules, documentation thông qua shared packages.
2. Tính hiển thị (Visibility) - Mọi người (developers) sử dụng codebase dễ dàng đọc code, cải thiện khả năng giao tiếp, chia sẻ khi làm việc cross-team.
3. Build and Development Caching - Turborepo cho phép chỉ build trên những package có sự thay đổi về source (tương tự như Nx). 
4. Single source of truth - Đảm bảo source code luôn luôn mới nhất, loại bỏ tình trạng các team làm việc với `outdated legacy code` của team khác.
5. A single CI/CD pipeline - Không cần triển khai CI/CD trên từng application, chúng ta có thể handle CI/CD ở 1 nơi duy nhất.
6. Loại các packages bỏ trùng lặp trong node modules - Packages trong node modules của các application luôn được tính toán và loại bỏ các package không cần thiết ở codebase. Tiết kiệm rất nhiều tài nguyên và build time.
7. Remote Caching - [xem thêm](https://turborepo.org/docs/core-concepts/remote-caching)
8. Config đơn giản - Như mình có nói ở trên, tất cả config đơn thuần nằm ở file `turbo.json` 

## III. Khởi tạo project với Turborepo
- Tại terminal, gõ: `npx create-turbo@latest`
- Gõ `y` -> enter để tiếp tục: ![image.png](https://images.viblo.asia/ed52a6e8-ca0b-432e-9f2d-993c636e95be.png)
- Nhập tên cho project của mình ở bước tiếp theo nhé:![image.png](https://images.viblo.asia/7fa798ae-fe63-4ea1-878f-616c224619a7.png)
- Chọn package manager mong muốn (ở demo này mình chọn pnpm) và enter tiếp tục
- Ổn áp rồi, project đã được tạo ra với structure như sau:![image.png](https://images.viblo.asia/38be9834-c815-46d2-8f79-fc8a6158201c.png)

## IV. Chạy ứng dụng dã được tạo ở trên

Mình sẽ nói sơ qua về structure và chức năng của các file/folder có trong setup source trước
![image.png](https://images.viblo.asia/8072855f-d94f-4e64-b358-ce4388dce7b9.png)

- Folder apps là nơi chứa các project chính của chúng ta. Mặc định thì 2 project được tạo ra ở `docs` và `web` (sử dụng Reactjs)
- Folder Packages sẽ lưu những shared resources để phục vụ cho việc tái sử dụng code trong các project `docs` và `web` ở trên. Thường là các Business logic, UI modules, utilities, hay các eslint/tsconfig/tailwind scripts...
- Ở root codebase thì sẽ chứa những file config khác. Và quan trọng nhất vẫn là file `turbo.json` nhé


Được rồi, bây giờ chúng ta start ứng dụng luôn bằng câu lệnh: `pnpm dev`.  Khi đứng ở root, chúng ta sẽ start một lần 2 project `docs` và `web`.  Nếu muốn run project riêng biệt, bạn vào đúng thư mục của project đấy và run là được.
![image.png](https://images.viblo.asia/8a8019ef-791d-492f-8d4d-066db659c5c5.png)
 
Hai project được tạo ra sẽ run trên 2 port 3000 và 3001.
![image.png](https://images.viblo.asia/af6dcb1f-8b7c-42e7-a618-21df6ce0def7.png)

Vào trong code của 2 trang này, chúng ta sẽ thấy được button `Boop` được import từ package `ui` 
![image.png](https://images.viblo.asia/9282973e-9167-475f-a974-2aa03d5b7885.png)

Chúng ta sử dụng được chung 1 component Button từ shared packages. Tới đây thì mọi người cũng đã có thể đi tiếp được rồi.


## V. Kết
Bên cạnh những ưu điểm kể trên, Turborepo cũng có nhiều khuyết điểm như tăng độ lớn của source -> giảm tốc độ IDE. Mất thời gian cho việc tiếp cận ban đầu. 
![image.png](https://images.viblo.asia/2169527c-8466-45f4-abbc-c099bd720024.png)
Hơn nữa, nếu so với build system khác như `Nx` hay `Lerna`, thì Turbo vẫn chưa so sánh được về tốc độ build cũng như cộng đồng sử dụng còn khiêm tốn. Nhưng với việc được mua lại bởi **Vercel** (cũng là nhà phát triển cho NextJs), chúng ta hoàn toàn có thể tin vào một tương lai dành cho Turborepo. ^^

Cảm ơn các bạn đã đọc.

## VI. References
- https://www.libhunt.com/compare-turborepo-vs-nx
- https://blog.theodo.com/2022/02/architecting-a-modern-monorepo/
- https://turborepo.org/
- https://www.youtube.com/watch?v=IaedbdXsX2Q&ab_channel=DanielLaera

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).