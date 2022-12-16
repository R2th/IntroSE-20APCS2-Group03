# Viết jsdoc cho một thư viện cũ

## Đặt vấn đề

Bạn đang có một thư viện cũ, sau khi chèn script <script src="cdn//"></script> thì bạn có thể sử dụng ngay tiện ích.
Bạn sẽ tìm vào tài liệu của thư viện đó để học cách sử dụng chúng. Nhưng khi lập trình thì không có code suggestion CTRL SPACE được.
Bạn có thể xem hình dưới mình sử dụng momentjs. 

![image.png](https://images.viblo.asia/c04f0139-db3c-45c7-923a-ddad5153a894.png)

Lập trình web ngày nay thì các thư viện đều đã hỗ trợ jsdoc @type hay typescript sẵn rồi, nhưng chắc vẫn sẽ gặp dự án cũ, code javascript cũ. Bản thân mình đôi khi lại code javascript thuần, không dùng typescript, react, ..., vì khi sử dụng chúng thì ta cần phải build, build có thể lâu, rắc rối cho người mới.

![image.png](https://images.viblo.asia/7b51a3f1-f23d-4a66-a868-7399bcb6c658.png)

Ở bài này thì mình sẽ giới thiệu về jsdoc để giải quyết chuyện trên, làm sao để thuận tiện trong khi code.

## Demo project

Các bạn xem hình bên dưới, ta có thư viện MyLib() nhưng hiện tại không suggestion gì cả

![image.png](https://images.viblo.asia/a12db218-2198-4cfa-9631-2ac602ac27a6.png)

![image.png](https://images.viblo.asia/ad3e41c0-b64d-4323-84dc-b62d33de3b28.png)

## Thêm jsdoc inline

![image.png](https://images.viblo.asia/9ff6316c-7a95-460f-8bc5-58e6d97c77d5.png)

## Thêm jsdoc in .d.ts

![image.png](https://images.viblo.asia/03b68f82-f2ae-4017-be97-3a5c80efe601.png)


## Import jsdoc tự động trong vscode

Mỗi khi import .d.ts file lại phải chỉ định đường dẫn tương đối khá mất công ta có thể làm việc này bằng cách thêm thuộc tính types trong package.json

![image.png](https://images.viblo.asia/b08fc969-adee-4aea-a610-a4d26f6660ea.png)

![image.png](https://images.viblo.asia/f9522036-a056-4a2b-bbe2-8ada4c4ba05a.png)

## Code example

https://github.com/taminhluan/examples/tree/main/220920_jsdoc_for_legacy_code/01