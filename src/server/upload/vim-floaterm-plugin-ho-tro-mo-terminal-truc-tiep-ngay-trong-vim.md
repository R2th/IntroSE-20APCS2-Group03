*Giả sử các bạn đang code python trong vim và bây giờ các bạn cần chạy file `.py` này của các bạn, có hai cách thông thường nhất một là các bạn sẽ lưu file lại, thoát vim và sau đó chạy file python ngay trên terminal này, hai là sẽ mở một terminal khác rồi `tab` qua `tab` lại. Dĩ nhiên là oke thôi nhưng dùng những cách này hơi không ngầu một tí, trong bài viết này mình giới thiệu tới mọi người plugin vim-floaterm hỗ trợ mở trực tiếp terminal ngay trong Vim.*

## Cài đặt 
**Github vim-floaterm: [https://github.com/voldikss/vim-floaterm](https://github.com/voldikss/vim-floaterm)**

Tại file `init.vim` thêm vào dòng sau: 
```
Plug 'voldikss/vim-floaterm'
```

Sau đó mở vim lên chạy `:PlugInstall` để vim tải lại các Plugin được định nghĩa trong file `init.nvim`.

Lưu ý: các bạn chưa biết file `init.vim` là gì và nằm ở đâu thì xem lại bài viết [Cấu hình và cài đặt Vim từ A-Z](https://viblo.asia/p/cau-hinh-va-cai-dat-vim-tu-a-z-GrLZD1knlk0) nha. 

## Sử dụng Vim-Floaterm

Để mở một terminal mới bạn chạy lệnh tương ứng như bên dưới: 
```
:FLoatermNew
```

![image.png](https://images.viblo.asia/73cb38e0-467a-418b-8781-3bc5327db365.png)

Một terminal mới được mở ra ở giữa ngay trong Vim, tuy nhiên ban đầu bạn có thể thấy nó không được bự cho lắm, để thay đổi kích thước của terminal này cho nó to lên, bạn có thể thêm các tham số: 
```
:FloatermNew --height=0.6 --width=0.4
```

Muốn bự nữa các bạn cứ điều chỉnh tham số sao cho phù hợp, cửa sổ terminal hiện ra trong vim sẽ giống như hình bên dưới, nó hoàn toàn có chức năng như những terminal bình thường và không có hạn chế gì: 

![image.png](https://images.viblo.asia/4075c474-409c-4339-90cd-ad7bcf9cc81e.png)

Để thoát khỏi terminal này, bạn có thể sử dụng tổ hợp phím `Ctrl + D` hoặc gõ vào chữ `exit`:

![image.png](https://images.viblo.asia/7af76276-5f7c-450a-9b0a-c176e18f32e9.png)

Bây giờ lần nào mở terminal mà lần nào cũng thêm các tham số `height` hay `width` để thay đổi kích thước của cửa sổ thì bạn có thể cấu hình chúng ngay trong file `plugged/vim-flaterm`: 

![image.png](https://images.viblo.asia/23ee2ee9-1baf-482b-a526-2cf27ac4528c.png)