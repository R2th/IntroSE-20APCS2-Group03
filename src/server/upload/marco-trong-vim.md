Hi mọi người, trong bài viết này mình sẽ viết về những trường hợp thực tế mình gặp dùng đến `marco` của VIM.

Case 1:  
Ở case này, khi mình dùng [sequelize-cli](https://www.npmjs.com/package/sequelize-cli) để generate ra model thì tên của attributes trong model sẽ được xem như tên của cột trong database luôn.

![image.png](https://images.viblo.asia/9615d64d-f3b4-4299-90c6-f6cc5e032a43.png)
Tuy nhiên, mình muốn đặt tên cột tương với attibute ở dạng snake_case của attribute đó. 

![image.png](https://images.viblo.asia/0942928c-4b83-4623-bfe7-306e42b1cc8e.png)

Đây là cách mình tạo marco cho trường hợp này. Để chuyển giữa camel, snake, kebab, pascal thì các bạn cài đặt plug-in này [vim-abolish](https://github.com/tpope/vim-abolish)



`17gg`: di chuyển đế dòng 17.

`0`: đi đến đầu dòng 17.

`qq`: Lưu marco vào register `q`.

`f:`: Đi đến vị trí của dấu `:`.

`l`: Sang phải 1 kí tự

`a`: chuyển sang `insert` mode

nhập {} và enter ở bên trong cặp ngoặc
![image.png](https://images.viblo.asia/4d06e19f-a26f-4090-b303-fa1a55a97c00.png)

gõ `type :`, sau đõ `esc` vể normal mode, `jj` xuống dòng dưới, cut đoạn `DataTypes.STRING`, rồi lại `k` đi lên để paste `DataTypes.STRING` đăng sau `type :`

sau đó, về `normal`,  gõ `o` để xuống dòng, nhâp `filed: `,  `kk` di chuyển lên, copy tên attribute, r `jj` xuống dòng `filed :` để paste tên attrbute, sau đó di chuyển con trỏ vào tên attribute, gõ `crc` để chuyển từ camelCase sang snake_case.

Sau khi edit xong, di chuyển con trỏ xuống đầu dòng của attribute tiếp theo, gõ `q` để lưu marco và sau áp dụng marco cho các dòng tiếp theo.


# Tham khảo 
https://vim.fandom.com/wiki/Macros#Recording_a_macro

https://kipalog.com/posts/Vim-Macro