> Trong khi phát triển ứng dụng, điều quan trọng nhất là tạo ra sự tập trung vào tiến độ của mình và tăng tốc độ phát triển. Chế độ toàn màn hình có thể giúp bạn tập trung mà không bị phân tâm khỏi các ứng dụng khác. Với phiên bản Xcode mới nhất, giờ đây chúng ta có thể chỉ cần sử dụng và kiểm soát các nhiệm vụ của mình để tập trung vào phát triển ứng dụng.

### 1. Chế độ toàn màn hình với Xcode và simulator cạnh nhau

Chế độ toàn màn hình sẽ trông như sau và là một cách tuyệt vời để tập trung vào việc viết code và phát triển ứng dụng:

![](https://images.viblo.asia/ce98ed2f-6628-4a34-a740-bbaaa8984dbb.png)

Như bạn có thể thấy, thứ duy nhất có thể nhìn thấy là Xcode ở bên trái và simulator ở bên phải. Một môi trường tập trung mà không nhìn thấy dock hoặc thanh menubar với khả năng gây xao lãng.

Để vào chế độ này, bạn phải bắt đầu với việc cho Xcode ở chế độ toàn màn hình và làm theo các bước như sau:

* Nhập toàn màn hình Xcode bằng cách nhấp vào nút màu xanh lá cây nằm trong 3 nút ở góc trên bên trái hoặc bằng cách sử dụng phím tắt `⌃ CTRL + ⌘ CMD + F`

* Đảm bảo cửa sổ Simulator đang mở và mở điều khiển nhiệm vụ bằng cách nhấn phím F3

* Kéo cửa sổ Simulator đi và thả nó bên cạnh Xcode

### 2. Sử dụng chế độ toàn màn hình trong các phiên bản Xcode cũ hơn

Thử các bước trên với phiên bản Xcode cũ hơn sẽ dẫn đến biểu tượng chặn:

![](https://images.viblo.asia/2f985609-08dc-4123-a8af-ac6e44b98154.png)

Chúng ta có thể giải quyết điều này bằng cách thực hiện lệnh sau trong terminal:

```
defaults write com.apple.iphonesimulator AllowFullscreenMode -bool YES
```

Đảm bảo khởi động lại Simulator nếu hiện tại bạn đang mở nó và thực hiện lại các bước như trên :D

### 3. Kết luận 

Vậy là bài viết của mình đến đây là hết 😁. Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn.

Cảm ơn các bạn đã theo dõi bài viết. 😃