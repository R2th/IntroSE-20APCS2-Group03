## I. Angular là gì?
* Angular là một platform và framework để xây dựng các ứng dụng single page client sử dụng HTML và TypeScript. Angular được viết bằng TypeScript. 
* Angular triển khai chức năng cốt lõi và chức năng tùy chọn như một tập hợp các thư viện TypeScript mà bạn nhập vào ứng dụng của mình.
* Angular đã phát hành vào năm 2016, nhưng trước khi có Angular thì đã có AngularJS. 

Tiếp theo cùng tìm hiểu AngularJS vs Angular phân biệt như thế nào nhé.
## II. AngularJS vs Angular
2 phiên bản Angular này khiến nhiều nhà phát triển nhầm lẫn. AngularJS và Angular là những framework hoàn toàn khác nhau. Các phiên bản Angular 1x như: 1, 1.2, 1.5, v.v. được gọi là Angular JS và từ phiên bản 2 trở lên được gọi là Angular.

* Angular JS → phiên bản từ 1.x
* Angular → phiên bản 2 trở lên

Vì vậy, Angular 2x+ là một bản viết lại hoàn chỉnh của framework AngularJS và các phiên bản mới hơn như: 4, 5, 6, v.v. là những thay đổi nhỏ của Angular phiên bản 2.

Trong loạt bài này, bạn sẽ tìm hiểu Angular 2+.

## III. Angular CLI là gì?
CLI là viết tắt của Command Line Interface. Angular có CLI riêng giúp cho developer rất nhiều thứ trong quá trình lập trình từ đầu đến cuối.

Angular CLI đang được sử dụng để tự động hóa các hoạt động trong các dự án Angular thay vì phải thực hiện theo cách thủ công.

Ví dụ, Angular CLI có thể được sử dụng cho:

* Cấu hình, Thiết lập Môi trường
* Xây dựng component, services, routers
* start serer, testing, deploy project
* Cài đặt thư viện của bên thứ 3 (như Bootstrap, Sass, Less, v.v.)
* ...

Bây giờ, mình sẽ tạo project Angular sample đầu tiên từng bước qua CLI nhé.

## IV. Tạo project sample
### 4.1. Cài đặt NPM (Node Package Manager)
Trước hết, chúng ta sẽ cần Node js. NPM (trình quản lý gói nút, là một phần của nút js) là một công cụ để cài đặt các thư viện của bên thứ 3 và các phụ thuộc vào dự án của chúng tôi. Nếu bạn chưa có nó, bạn có thể tải xuống và cài đặt nó từ đây . Tôi cũng đã giải thích nó từng bước trên video hướng dẫn.

### 4.2 Cài đặt Angular CLI
Nếu bạn đã cài đặt nút js, bước tiếp theo là cài đặt Angular CLI vào máy tính của bạn:
```

npm install -g @angular/cli
```
`g` là viết tắt của cài đặt `global`. Nếu bạn sử dụng `-g` sau này, bạn có thể sử dụng CLI trong bất kỳ dự án Angular nào trên máy tính của bạn.

Note: Nhập `ng version` vào terminal của bạn để xem version Angular đang sử dụng.
![Angular Version](https://images.viblo.asia/be646dac-bddd-47cb-af48-c1340a19c85f.png)

### 4.3 Tạo một dự án Angular mới
Sau khi cài đặt xong, bạn có thể sử dụng Angular CLI để tạo một dự án Angular mới bằng lệnh sau:
```

ng new first-angular-app
```
Lệnh này tạo một dự án Angular mới có tên là first-angular-app, tất cả source common sẽ được CLI tự động cài đặt, bạn không phải tự tạo gì hết.
![First angular application](https://images.viblo.asia/4998bcd6-190b-4561-8fb0-1be4fb1f4db0.png)

### 4.4 Chạy ứng dụng
Sau khi cài đặt CLI và tạo một ứng dụng Angular mới, bước cuối cùng là start dự án. Để làm điều đó, chúng ta cần sử dụng lệnh sau:
```

ng serve --open
```
Param `open` sẽ tự động mở cửa sổ trình duyệt cục bộ của bạn.

Angular hỗ trợ realtime listen server, vì vậy khi bạn thay đổi code, trình duyệt sẽ được tự động thay đổi, bạn không cần refresh lại trình duyệt nữa.
![Open Browser](https://images.viblo.asia/ba253fb9-d51b-4a10-bab1-c67073f13489.png)

![First Angular App](https://images.viblo.asia/626bf266-53b6-4b3a-b317-98f3d0e509b5.png)

## V. Kết luận
Oke, như vậy mình đã giới thiệu qua cho các bạn về Angular và Angular CLI, cách cài đặt ứng dụng Angular đầu tiên. Ở bài sau mình sẽ đi vào chi tiết hơn về các thành phần của Angular nhé. 

Cảm ơn các bạn đã đọc bài viết của mình. See you!

### Tham khảo
1. https://www.freecodecamp.org/news/angular-9-for-beginners-how-to-install-your-first-app-with-angular-cli/
2. https://blog.angular.io/version-9-of-angular-now-available-project-ivy-has-arrived-23c97b63cfa3
3. https://angular.io/guide/architecture