**[Thư viện Angular](https://tienanhvn.blogspot.com/2019/07/nhung-thu-vien-trong-angular.html)** được xây dựng như một giải pháp của các vấn đề chung như trình bày một giao diện người dùng thống nhất, trình bày dữ liệu, và cho phép nhập dữ liệu. Các nhà phát triển có thể tạo các giải pháp chung cho các miền cụ thể được thích nghi để sử dụng lại trong các ứng dụng khác nhau. Các giải pháp này có thể được xây dựng như các thư viện Angular và các thư viện này có thể được công bố và chia sẻ như các gói npm.
Những thư viện trong Angular

Một thư viện Angular là một dự án góc nhưng khác với ứng dụng Angular trong các thuật ngữ mà nó không thể tự chạy. Nó được nhập khẩu và sử dụng trong ứng dụng.
Sử dụng thư viện Angular
Các thư viện Angular mở rộng các chức năng cơ bản của Angular. Ví dụ: nếu bạn muốn thêm biểu mẫu phản hồi vào một ứng dụng, hãy thêm gói thư viện bằng cách sử dụng thêm @angular/biểu mẫu, sau đó nhập ReactiveFormsModule từ thư viện @angular/Forms trong mã ứng dụng của bạn.
Vật liệu góc là một ví dụ về một thư viện lớn, mục đích chung cung cấp các thành phần giao diện người dùng tinh vi, có thể tái sử dụng và thích nghi.
Cài đặt thư viện
Thư viện được công bố như các gói npm và tích hợp với Angular CLI. Để tích hợp mã thư viện sử dụng lại vào một ứng dụng, chúng ta phải cài đặt gói và nhập các chức năng được cung cấp, nơi chúng ta sẽ sử dụng nó.

Cú pháp
 ng add <lib_name>  
Lệnh thêm sử dụng trình quản lý gói npm để cài đặt gói thư viện, và invokes sơ đồ được bao gồm trong gói cho giàn giáo khác trong mã dự án, chẳng hạn như thêm nhập báo cáo, phông chữ, chủ đề, và như vậy.
Nhập thư viện
Thư viện gói bao gồm typings trong tập tin. d. TS. Nếu gói thư viện của bạn không bao gồm typings và IDE Hiển thị lỗi, bạn phải cài đặt thư viện liên kết @types/ Angular.
Ví dụ, giả sử bạn có một thư viện có tên D1:
 npm install D1--save
npm install @types/D1--save-dev
Các loại được xác định trong @types/gói cho thư viện cài đặt vào không gian làm việc sẽ tự động được thêm vào cấu hình TypeScript cho dự án sử dụng thư viện đó. TypeScript tìm kiếm các loại trong thư mục node_modules/@types theo mặc định, vì vậy bạn không phải thêm từng gói loại riêng lẻ.
Nếu một thư viện không chứa typings tại @types/, bạn vẫn có thể sử dụng nó bằng cách thêm typings thủ công cho nó. Bạn có thể làm điều đó bằng cách làm theo:

Tạo một tập tin typings. d. TS trong SRC/thư mục của bạn. Tệp này được tự động đưa vào định nghĩa loại chung.

Thêm mã sau đây trong SRC/typings. d. TS.
declare module 'host' {
  export interface Host {
    protocol?: string;
    hostname?: string;
   pathname?: string;
}
  export function parse(url: string, queryString?: string): Host;
}  
Thêm mã sau trong phần hoặc tệp sử dụng thư viện:
import * as host from 'host';
const parsedUrl = host.parse('https://angular.io');
console.log(parsedUrl.hostname);  
Cập Nhật thư viện
Bạn có thể cập nhật các thư viện Angular bằng cách sử dụng lệnh Cập Nhật. Nó Cập nhật các phiên bản thư viện riêng lẻ. CLI Angular kiểm tra bản phát hành xuất bản mới nhất của thư viện, và nếu nó thấy rằng phiên bản mới nhất là mới hơn phiên bản đã cài đặt của bạn, tải nó và Update package Angular, JSON của bạn để phù hợp với phiên bản mới nhất.
Cú pháp:
ng update <lib_name>   
Làm thế nào để thêm một thư viện Angular?
Các thư viện JavaScript cũ không được nhập vào ứng dụng có thể được thêm vào phạm vi toàn cầu thời gian chạy và tải như trong thẻ script. Bạn phải cấu hình CLI để thực hiện việc này tại thời điểm xây dựng bằng cách sử dụng "kịch bản" và "phong cách" tùy chọn của mục tiêu xây dựng trong tập tin cấu hình CLI, Angular  JSON.
Ví dụ: để sử dụng thư viện bootstrap 4, trước tiên cài đặt thư viện và các phụ thuộc của nó bằng cách sử dụng trình quản lý gói npm:
Cú pháp:
npm install bootstrap--save
Thêm tập tin bootstrap CSS vào mảng "Styles":
npm install bootstrap--save
Thêm tập tin bootstrap CSS vào mảng "Styles":
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.css",
  "src/styles.css"
],  
Nguon : https://tienanhvn.blogspot.com/