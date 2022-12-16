Chào anh em bạn hữu gần xa.  Rãnh rỗi quá không biết làm gì nên chia sẻ cho anh em xíu về System Design.
Mình khuyến khích anh em nên tìm hiểu vì nó là một kĩ năng để giúp anh em có thể bay cao, bay xa hơn đấy 😏

Hôm nay, mình sẽ giới thiệu qua một build tools giúp các bạn có thể xây dựng một MonoRepo cho project của mình và doanh nghiệp.

# MonoRepo & MultiRepo?
* Monorepo: là kiểu cấu trúc project trong đó tất cả module (hoặc project con) đều nằm trong cùng 1 git repository.
* MultiRepo: là kiểu cấu trúc project trong đó mỗi module sẽ nằm trong 1 git repository riêng.
![image.png](https://images.viblo.asia/afff47db-6e58-475a-b465-a34fc8b23c3a.png)

Mặc dù hiện tại, Micro Frontends nổi lên như là một software architecture hàng đầu trong việc system design phía frontend. 

Tuy nhiên, với quan điểm của mình thì MonoRepo vẫn là một cách an toàn và tiết kiệm chi phí đối với các start-up và doanh nghiệp nhỏ.

Trong đó, Nx và Lerna trở thành đối thủ nặng kí trong việc xây dựng ứng dụng MonoRepo.

# Nx & Lerna
Trước hết, ta so sánh hai ông kẹ này nhá
* Lerna
    * Nó tập trung vào việc liên kết nhiều packages từ cùng một dự án và **quản lý xuất bản npm.**
    * Nó phù hợp hơn với các dự án **open source** với nhiều packages (vì chúng ta có thể dễ dàng xuất bản các gói của mình).
* Nx
    * Nó tập trung vào việc quản lý quy trình phát triển cho nhiều packages.  Nghĩa là chúng ta có thể xác định các cấu hình về runner và builder cho project, theo cách tương tự như Webpack.
    * Bên cạnh đó, nó cũng có thể hoạt động để sinh ra nhiều process cùng một lúc. Ví dụ như việc chạy frontend và backend cùng lúc mà không cần mở hai terminal khác nhau. Tương tự với docker-composer.
    * Nó phù hợp hơn để xử lý các **quy trình công việc** phức tạp với nhiều packages

> Khi sử dụng khái niệm **mono-repo**, chúng ta hình dung ra trải nghiệm của nhà phát triển phong phú hơn nhiều, không chỉ đơn giản là sắp xếp một vài dự án song song với nhau.
> Đó là lý do tôi chọn NX để phát triển.

# 🌯 Cài đặt
Đầu tiên, chúng tôi sẽ cài đặt **Nx Editor Plugins**. Nó giúp chúng tôi quản lý tất cả các dự án với phần mở rộng một cách hiệu quả.
Tham khảo:  https://nx.dev/using-nx/console#nx-console-for-vscode

![Screen Shot 2022-03-10 at 4.32.41 PM.png](https://images.viblo.asia/d0565f2d-68c0-4d6e-b48c-3527427404ac.png)

> Lưu ý rằng, chúng ta cần tạo đúng mục đích để tránh dư thừa trong code. Bên cạnh đó, **tag** cũng không thể thiếu nha.
Nếu bạn muốn chạy task runner, bạn chỉ cần chú ý đến tệp ** project.json **.

Tệp ** `project.json` **
* Chứa các cấu hình cụ thể cho dự án.
* Thường được tạo khi chúng ta sử dụng Nx Plugins.
* Nó cấu hình custom executors ( cung cấp tính linh hoạt hơn rất nhiều để chạy các long-time process), được sử dụng thay vì các tập lệnh ** npm. **.
https://nx.dev/configuration/projectjson#configuration-projectjson-and-nxjson
# 🔎 Application (/apps) là gì?
Đây là nơi chỉ chứa mã của các nền tảng: web, desktop, backoffice,...  Nó có thể cấu hình dependency injection và kết nối các libs.

### Ví dụ: chúng ta sẽ chọn:
* **NextJS** cho web:
    - Cung cấp SEO
    - Customized Open Graph.
    - Nâng cao performance (Fast refresh).
- **Electron** cho desktop.

![Screen Shot 2022-03-10 at 4.56.36 PM.png](https://images.viblo.asia/fed18104-d6a7-469c-984b-58d904520cdd.png)

### Quy tắc:
* Không chứa business logic, components, services.
* Chỉ những thư viện mới được phép imported.

# ❤️‍🔥 Libs (/libs) là gì?
Cơ bản, libs là nơi để chứa các services, components, utils,... 
Một Nx workplace điển hình sẽ có nhiều libs hơn apps. Vì thế,chúng ta nên đặc biệt cẩn thận trong việc tổ chức thư mục libs này.

Theo kinh nghiệm của mình thì chúng ta nên chia libs theo **scope** và **type** vì:
* Dễ dàng maintain cũng như scale sản phẩm.
* Dựa trên concept của micro frontends (thằng nào chỉ làm nhiệm vụ của thằng đó).

# Tags là gì mà sao nói nó quan trọng?
Khi chúng ta sử dụng Nx Editor Plugins (Vscode plugin) để tạo một app hay lib thì chúng ta cần chú ý thêm **tag** cho nó.
Nguyên nhân là vì **tag** này sẽ giải quyết vấn đề dependency injection đấy.

Một vài loại điển hình mình có liệt kê như sau:
- **scope-client:** represent web, desktop.
- **scope-client-lib:** dependencies (/libs) of each apps.
- **scope-shared:** common dependencies of the whole project like ui-kit, services, packages.
- **type-feature**
- **type-package**
- **type-util**
- **type-ui:** only UI-kit.
- **type-shell:** config for the root of the app like ThemeProvider, Store, ex.
- **type-service**

![Screen Shot 2022-03-10 at 5.19.09 PM.png](https://images.viblo.asia/e86e7ce5-c67a-4175-8542-82edf10354b5.png)

### Có bạn sẽ tự hỏi là vậy có tag rồi thì mình giải quyết dependency injection ở đâu?
Các bạn chú ý đến tệp **eslintrc.json**.

Ở đây, các bạn sẽ sử dụng một plugin từ Nx (@nrwl/nx/enforce-module-boundaries). Plugin này giúp chúng ta chỉ cho phép import những libs được define trước mà thôi. Nếu bạn cố imported thì nó sẽ báo lỗi nhé.

![Screen Shot 2022-04-02 at 9.22.49 PM.png](https://images.viblo.asia/8b42d5e1-f41f-42f0-b350-a6f172c130be.png)

Ví dụ:  Ở đây, mình sẽ chỉ cho phép app có tag là `scope:client` import những apps hay libs có các tag là  `"type:package", "type:feature",  "type:shell", "type:ui", "type:util"`

# Chạy scripts như thế nào?
- Install: yarn install
- Web:
    - dev: `yarn web:serve`
    - build: `yarn web:build`
- Desktop:
    - dev: `yarn desktop:serve`
    - build: `yarn desktop:build`

Bên cạnh đó, chúng ta có thể sử dụng **Nx commands** để chạy scripts tức thì (Vscode)
![Screen Shot 2022-03-10 at 5.30.44 PM.png](https://images.viblo.asia/97919a8f-a5a7-499b-ad38-f3db8b088c62.png)


# ❤️‍🔥 Dep graph
Đây là một tính năng siêu hữu ích của Nx.
Nó cho chúng ta một góc nhìn tổng quan toàn bộ project. Từ đó, ta có thể hạn chế được dependency injection.

### Chạy scripts:
- yarn dep-graph.
- yarn affected:dep-graph

![Screen Shot 2022-03-10 at 5.33.14 PM.png](https://images.viblo.asia/74affab7-a059-4ed1-a427-04d991a66119.png)

# Tổng kết
Nx tuy không phải là mới nhưng mình biết có rất nhiều anh em lập trình FE vẫn chưa biết nó là gì.

Hy vọng qua bài viết này, mọi người đã có một xíu kiến thức về việc chọn một tools để xây dựng một project của team mình.  Từ đó, chúng ta có thể dễ dàng bắt đầu con đường tìm hiểu về cách xây dựng một project thế nào là chuẩn, thế nào là phù hợp với nhân lực hay tham vọng của công ty.

> Mình là Thoại - một dev quèn thôi

Mọi thắc mắc xin liên hệ: https://www.facebook.com/tieunais/