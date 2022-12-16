Chắc hẳn đối với các lập trinh viên js thì ai cũng đã từng dùng các thư viện trên npm rồi

Nhưng khi các thư viện xảy ra lỗi thì ta sẽ phải báo cáo lỗi và chờ tác giả cập nhật thư viện

Tuy nhiên đối với những thư viện cũ, vài tháng hoặc thậm chí cả năm không được cập nhât thì phải làm thế nào?

Cách thường thấy là chúng ta sẽ phải fork thư viện về git của mình, và clone về sửa

Sau đó thì ta sẽ sửa phiên bản của `dependency` trong `package.json` bằng đường dẫn của repository mà ta đã sửa bằng: 

```
+git<link-repo>
```

Vậy là đã giải quyết được vấn đề, phương pháp trên cũng là 1 giải pháp hiệu quả

Nhưng trong bài này mình sẽ giới thiệu 1 phương pháp khác với tên gọi là `patch-package`

![](https://images.viblo.asia/8916d74a-5cfb-47ca-8e82-061488df5cbf.png)

# Vấn đề

Thư viện mình đang sử dụng là `react-smooth-dnd` dùng để kéo thả

Mọi thứ không có vấn đề gì nhưng từ phiên bản react 18 trở đi, khi dùng thư viện này với typescript thì ta sẽ bắt gặp lỗi

```
Property 'children' does not exist on type 'IntrinsicAttributes'
```

Các phương án được nghĩ đến đầu tiên là là giảm phiên bản `React` xuống 17 hoặc là sẽ phải sửa thư viện để khai báo thêm type `PropsWithChildren` cho các `component`

# Tạo bản vá bằng `patch-package`

Những thứ trong `node_modules` là thứ mà không một ai muốn đụng vào

Nhưng lần này chúng ta tìm những phần bị lỗi của thư viên trong folder `node-modules` rồi sửa nó

Sau khi sửa xong thì ta dùng câu lệnh

```
npx patch-package <package name> 
```

`package name` là tên thư viện chúng ta cần vá, ở đây `react-smooth-dnd`


```
npx patch-package react-smooth-dnd
```

```
patch-package 6.4.7
• Creating temporary folder
• Installing react-smooth-dnd@0.11.1 with yarn
• Diffing your files with clean files
✔ Created file patches/react-smooth-dnd+0.11.1.patch

💡 react-smooth-dnd is on GitHub! To draft an issue based on your patch run

npx patch-package react-smooth-dnd --create-issue
```

Xong, nó đã tạo cho chúng ta 1 folder `patches` chứa bản vá bên trong

```
patches
 └──react-smooth-dnd+0.11.1.patch
```

Nội dung bên trong bản vá là nhưng thay đổi chúng ta đã chỉnh sửa, nó sẽ giúp chúng ta giữ lại code mình sửa kể cả khi xóa `node_modules`

```js
// react-smooth-dnd+0.11.1.patch

diff --git a/node_modules/react-smooth-dnd/dist/src/Container.d.ts b/node_modules/react-smooth-dnd/dist/src/Container.d.ts
index cdd0c03..211eb1c 100644
--- a/node_modules/react-smooth-dnd/dist/src/Container.d.ts
+++ b/node_modules/react-smooth-dnd/dist/src/Container.d.ts
@@ -1,11 +1,11 @@
-import React, { Component, CSSProperties } from 'react';
+import React, { Component, CSSProperties, PropsWithChildren } from 'react';
 import PropTypes from 'prop-types';
 import { ContainerOptions, SmoothDnD } from 'smooth-dnd';
 interface ContainerProps extends ContainerOptions {
     render?: (rootRef: React.RefObject<any>) => React.ReactElement;
     style?: CSSProperties;
 }
-declare class Container extends Component<ContainerProps> {
+declare class Container extends Component<PropsWithChildren<ContainerProps>> {
     static propTypes: {
         behaviour: PropTypes.Requireable<string>;
         groupName: PropTypes.Requireable<string>;
```

Cuối cùng chỉ cần chạy project lại là đã giải quyết xong vấn đề lỗi của thư viện

Và cũng không quên chạy thêm câu lệnh

```
npx patch-package react-smooth-dnd --create-issue
```

Để tạo issue giúp cho những ai gặp phải biết cách giải quyết và để tác giả sớm fix lỗi này

Nếu có tâm hơn nữa thì tạo cả pull request luôn

![image.png](https://images.viblo.asia/52a83ef7-09e8-4a10-b6b2-4070907cc86a.png)