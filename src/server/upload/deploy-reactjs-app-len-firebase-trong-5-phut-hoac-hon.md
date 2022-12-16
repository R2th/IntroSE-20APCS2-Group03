Ở bài này, vì thời gian có hạn nên mình sẽ không giới thiệu lại Firebase là gì nữa và sẽ đi thẳng luôn vào việc làm thế nào để có thể deploy được ReactJs app lên Firebase một cách nhanh nhất.

Chuẩn bị:
Trước khi bắt đầu, hãy chắc chắn rằng bạn đã cài đặt 2 module create-react-app và firebase-tools

Ở terminal, chạy 2 lệnh sau:

```
npm i -g create-react-app
```

```
npm i -g firebase-tools
```

Tiếp theo, hãy chuẩn bị cho mình một tài khoản Firebase. Firebase là của Google nên toàn bộ đăng nhập/đăng kí đều dùng tài khoản Gmail. Đăng nhập/Đăng kí xong, chọn Go to console ở góc trên bên phải để chuyển đến trang tạo project mớimới, chọn tiếp Create a project.

Ở trường project name, hãy chọn tên cho project của bạn, ở đây mình đặt là firebase-deploy.

Tick chọn I accept Firebase terms rồi bấm Continue.

![](https://images.viblo.asia/2add2d60-059d-4dc3-9b17-af3183ac9803.png)

Tiếp tục bấm Continue

![](https://images.viblo.asia/331b6945-f784-4121-84d5-843c2276c848.png)

Chọn Create project hoặc thay đổi lựa chọn tuỳ theo ý của bạn.

![](https://images.viblo.asia/6f484213-77b3-4d0e-b860-e62762f1a195.png)

Sau khi tạo xong, chúng ta có thể bắt đầu deploy ReactJs app lên Firebase.

Bước 1:
Đầu tiên, tạo một chiếc ReactJs app mới với tên firebase-deploy chẳng hạn, công cụ sử dụng sẽ là create-react-app 

create-react-app firebase-deploy

Sau khi chương trình chạy xong, bạn sẽ thấy folder firebase-deploy có cấu trúc như sau:

![](https://images.viblo.asia/4656f52b-4119-4674-afff-9bb109324f0f.png)

Bước 2:
Nếu như đã quen với việc sử dụng create-react-app để tạo ReactJs app thì bạn cũng biết hiện tại firebase-deploy đang ở chế độ development build. Để deploy được app lên hosting thì phải chuyển app từ chế độ development build sang production build, cách chuyển đổi như sau:

```
cd firebase-deploy
```

Ở đây, mình đang dùng yarn nên câu lệnh để build sẽ như sau:

```
yarn build
```

Nếu bạn sử dụng npm, câu lệnh build sẽ là:

```
npm run build
```

Sau khi build xong, bạn sẽ thấy trong firebase-deploy có thêm 1 folder build

![](https://images.viblo.asia/90765c8b-a085-43fd-aec3-6b0831c0ff8a.png)

Bước 3:
Login vào firebase bằng câu lệnh:

```
firebase login
```

Lúc này, Firebase CLI sẽ hỏi bạn có muốn để nó thu thập dữ liệu và các reporting về lỗi không, có thể chọn có (Y) hoặc không (n):

![](https://images.viblo.asia/e3f8862c-088f-4741-a33f-45c581ddc6e2.png)

Sau đó thì sẽ bật ra một tab mới trên trình duyệt để đăng nhập tài khoản mới hoặc lựa chọn tài khoản Gmail đang có sẵn trên trình duyệt. Login xong thì ở terminal sẽ có thông báo đã đăng nhập thành công.

![](https://images.viblo.asia/d6314cf2-f6e1-44c7-befd-6b25b3464171.png)

Bước 4:
Trên terminal, chạy câu lệnh:

```
firebase init
```

Ở terminal sẽ chạy firebase CLI với một số lựa chọn như sau:

![](https://images.viblo.asia/36f1a7bf-203b-4cfc-9c87-09c1aed60aa3.png)

Ở đây chúng ta chọn Hosting rồi confirm bằng cách ấn Enter.

![](https://images.viblo.asia/52cbf7d4-3c78-4eb1-8da8-5bf1b758ad2e.png)

![](https://images.viblo.asia/693dab5a-400f-44b3-8c01-c0e976244df8.png)


Chọn tiếp Use an existing project để chọn project chúng ta vừa tạo ở trên. Project firebase-deploy sẽ hiện ra ở đây, tiếp tục Enter để chuyển đến phần Hosting Setup

Hosting Setup sẽ tiếp tục là các lưa chọn, các bạn chọn như sau:

```
What do you want to use as your public directory? => build
Configure as a single-page app (rewrite all urls to /index.html)? => y
File build/index.html already exists. Overwrite? => N
```

Setup xong hosting bạn sẽ thấy folder firebase-deploy có thêm 2 file .firebaserc và firebase.json.

![](https://images.viblo.asia/4a26a291-999f-42f2-8ab4-820113b5f369.png)

Mở filebase.json ra và thêm đoạn headers vào trong hosting như sau:

```
"headers": [
  {"source": "/service-worker.js", "headers": [{"key": "Cache-Control", "value": "no-cache"}]}
]
```

![](https://images.viblo.asia/72ec7517-0a9d-4d3c-aef1-1b1488177c3a.png)


Bước 5:
Chạy lệnh sau trên terminal:

```
firebase deploy
```

Đợi lệnh chạy xong, bạn sẽ thấy thông báo thành công và sẽ có 2 đường link trong đó Hosting URL là đường dẫn đến ReactJs app của bạn.

![](https://images.viblo.asia/0ee3c282-2326-4c80-ae85-cd44466fbe58.png)

Vậy là xong.

Happy coding!