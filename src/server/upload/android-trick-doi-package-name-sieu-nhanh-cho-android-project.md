# Nếu bạn đang vật vã làm sao để đổi package name một cách dễ dàng thì đây là bài viết dành cho bạn.
## Hoặc nếu chưa thì nó cũng sẽ giúp ích cho bạn trong tương lai.

Android Studio có khả năng refactor tuyệt vời chỉ bằng cách chuột phải vào file hoặc package => Chọn refactor => rename => done.

Tuy nhiên điều này không hiệu quả nếu như bạn muốn đổi package name từ com.android.example => brand.com.product

Cách làm chỉ đơn giản gồm 3 bước:

1.  Copy package name => Nhấn tổ hợp phím Ctrl + shift + R => Replace all

![](https://images.viblo.asia/2f01dbc8-8c85-432f-bb8f-0eee870b7600.png)

2. Click chuột phải vào package root(ở đây là com) => chọn Show in explorer => Đổi tên thành "brand" => Vào tiếp bên trong đổi tên "android" => "com"

![](https://images.viblo.asia/c55b7fd0-c236-40ca-ad62-c2cf1d42cd39.png)

3. Mở lại Android Studio => Build => Clean project
   Sau đó vào File => Invalidate Cahes/ Restart => Chọn invalidate and restart.
   
   ![](https://images.viblo.asia/8c2fad63-fce0-47ee-ad6a-dd800c2ac6b7.png)

   
   Done :D