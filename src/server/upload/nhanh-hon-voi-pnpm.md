Với các bạn đã làm việc với javascript thì sẽ thường xuyên làm việc với các `package manager` như `npm`, `yarn`. Trong bài viết lần này mình sẽ giới thiệu với các bạn về một `package mannager` có tốc độ đáng kể so với các `package manager`khác là `pnpm`. Bắt đầu nào :D
# PNPM là gì?
- PNPM là package manager cho javascript tương tự như `npm`, `yarn`, cung cấp những cải tiến đáng kể về tốc độ và sử dụng dung lượng ổ đĩa. 
- Cũng như `npm`, `yarn` thì `pnpm` sử dụng package.json để quản lý các dependencies và sử dụng file lock để đảm bảo cài đặt nhất quán trên nhiều máy
# Ưu điểm
- Nhanh hơn gấp 2 lần so với `npm` và `yarn`
- Sử dụng ít dung lượng ổ đĩa hơn `npm` và `yarn`

Dưới đây là là hình ảnh so sánh `pnpm` với các package manager khác:

![](https://images.viblo.asia/e68571d5-126c-40cf-a733-ed10a07946ea.png)

- clear install: Mất bao lâu để chạy một bản cài đặt hoàn toàn mới: không có file lock, không có package nào trong cache, không có thư mục node_modules
- with cache, with lockfile, with node_modules: Sau lần cài đặt đầu tiên được thực hiện xong, command cài đặt được chạy lại
- with cache, with lockfile: Khi một repo được fetch và cài đặt được chạy lần đầu tiên
- with cache: Tương tự như ở trên, nhưng package manager không có file lock để làm việc.
- with lockfile: Khi cài đặt chạy trên máy chủ CI
- with cache, with node_modules: file lock bị xóa và lệnh cài đặt được chạy lại.
- with node_modules, with lockfile: Bộ nhớ cache của package bị xóa và lệnh cài đặt được chạy lại.
- with node_modules: Bộ nhớ cache của package và file lock bị xóa và lệnh cài đặt được chạy lại.
- update: cập nhật dependencies bằng cách thay đổi phiên bản trong package.json và chạy lại lệnh cài đặt.

Với 1 file [package.json](https://github.com/pnpm/benchmarks-of-javascript-package-managers/blob/main/fixtures/alotta-files/package.json) thì thời gian chạy thực tế như sau:

![](https://images.viblo.asia/371c0742-5075-49c9-a1f4-2ac098bb1474.png)

# PNPM hoạt động như thế nào
Khi sử dụng `npm` thì ở trong thư mục dự án, sẽ có thư mục node_modules bên trong, là các thư mục cho từng module mà bạn đã cài đặt bên trong dự án.

```
- node_modules:
    - eslint
    - lodash
```

Các module này thường được tải xuống bằng internet mỗi khi chúng ta cần cài đặt chúng. Ở mỗi dự án khác nhau mà chúng ta sử dụng các thư viện giống nhau thì sẽ có mỗi bản sao của chúng ở mỗi dự án. 

Còn khi chúng ta sử dụng `pnpm` sẽ có cách thức hoạt động khác. `pnpm` sẽ tạo một kho lưu trữ trên cùng một ổ cứng với thư mục dự án và khi chúng ta yêu cầu `pnpm` cài đặt một module vào dự án, pnpm cài đặt nó vào `store` và sau đó tạo thư mục liên kết như sau:

![](https://images.viblo.asia/22ae264a-b1b4-4e26-b25b-ae566cc4f253.png)

# Bảo mật
pnpm kết hợp các ưu điểm của npm và yarn để cung cấp cấp khả năng bảo mật tốt hơn. Nó cũng thực hiện một cơ chế kiểm soát việc truy cập chặt chẽ ràng buộc một package chỉ sử dụng các dependencies được xác định trong tệp `package.json` của nó
# Cài đặt pnpm
Cài đặt pnpm chúng ta sử dụng npm để cài đặt nó:
```
npm install -g pnpm
```
# Sử dụng 
Cách sử dụng nó cũng như npm/yarn, cài đặt một dependencies như sau:
```
pnpm install lodash
```
ngoài ra, chúng ta cũng có thể sử dụng pnpx thay npx:
```
pnpx create-react-app demo-pnpm
```
# Kết luận
Qua bài viết này chúng ta biết thêm về một package manager cung cấp cho chúng ta tốc độ tốt hơn và sử dụng bộ nhớ hiệu quả. Khi sử dụng bạn có thể cân nhắc sử dụng `pnpm`. Trong bài viết mình có sử dụng một số hình ảnh của [PNPM](https://pnpm.js.org/). Cảm ơn bạn đã theo dõi bài viết :D

## Tài liệu tham khảo
- https://pnpm.js.org/