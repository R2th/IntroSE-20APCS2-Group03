Offline.js là một thư việc dùng để xác định user có đang kết nối mạng hay không. Đây là hoạt động của offline.js:
1. Phụ thuộc và ajax request. Lúc nào có ajax request fail offline.js sẽ request tới url của một image hoặc một resource nào đó. 
2. Nếu request tới image success có nghĩa là kết nối vẫn tồn tại.
3. Nếu request fail có nghĩa không kết nối được mạng.
4. Request sẽ được lặp lại từ bước 1 đến bước 4.

### Cách cài đặt

1. Javascript libray

    Include javascript library vào trong project. Link download tại đây [offline.js](https://raw.githubusercontent.com/HubSpot/offline/v0.7.13/offline.min.js)

2. Chọn theme

    Offline.js đã cung cấp một số theme rất đẹp và nếu bạn không cần dùng bạn có thể bỏ qua bước này. vd: 
![](https://images.viblo.asia/11acde7b-ef68-4e9f-8933-a8f9247fdf53.png)
![](https://images.viblo.asia/c2210f1c-bb1f-4d42-935b-0a96de3fbdf6.png)
![](https://images.viblo.asia/be83c745-1aa6-4d35-9a9b-81f5dfb867ce.png)
Bạn có thể tìm hiểu thêm về theme tại đây [theme](https://github.hubspot.com/offline/docs/welcome/)
3. Chọn ngôn ngữ
Bạn có thể chọn một ngôn ngữ trong danh sách [ngôn ngữ ](https://github.com/HubSpot/offline/tree/master/themes)

### Sử dụng

Mình sẽ lấy ví dụ về việc gọi check connection liên tục 10s một lần và kết quả sẽ như ảnh bên dưới.

```
function checkConnection(){
  $.ajax({
    url: "/check_connection"
  }).always(function(){
    setTimeout(function(){
      self.checkConnection();
    }, 10000);
  })
}
```
![](https://images.viblo.asia/2852c1ea-011f-4a5f-bce4-1baa2b450509.gif)

### Tài liệu tham khảo
* https://github.hubspot.com/offline/