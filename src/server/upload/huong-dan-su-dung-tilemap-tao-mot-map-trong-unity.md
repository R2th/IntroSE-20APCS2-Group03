Chào các bạn, hôm nay mình sẽ hướng dẫn các bạn sử dụng Tilemap, một công cụ mặc định trong Unity từ bản 2017.2 để tạo ra một map theo ý muốn nhé!

![](https://images.viblo.asia/5c669171-fa3e-474c-b4f2-c6145a5b965b.jpg)

Trước đây mình từng có những bài giới thiệu nhiều cách để tạo ra một map, nhưng chúng đều là cách tự viết hoặc phải sử dụng những Plugin ngoài, còn bây giờ chúng ta đã có thể tạo ra map bằng Tilemap là công cụ có sẵn, được cung cấp bởi chính Unity, rất tuyệt đúng ko nào? ^_^

Bắt đầu nhé!

Bước 1: Tải một Texture sử dụng làm nguyên liệu tạo map.
    - Các bạn có thể lên link sau để tải về tài nguyên bao gồm cả miễn phí và mất phí: https://itch.io/
    - Copy Texture vừa download về vào trong dự án.
    - Chỉnh sửa Sprite Mode của Texture thành Multiple.
    
![](https://images.viblo.asia/d4ea9036-a010-4aee-b0df-9cd42b67de61.PNG)
    
    - Ấn vào Sprite Editor để chỉnh sửa Texture cho phù hợp.
    
![](https://images.viblo.asia/ed6c427d-2a17-4988-9dcb-86ce44ab89bc.PNG)
    
Bước 2: Tạo một Tilemap trên Scene.
    - Các bạn làm theo các bước sau: GameObject -> 2D Object -> Tilemap.
    
![](https://images.viblo.asia/89080203-4935-4a35-9126-8c685b8d98e2.PNG)
    
    - Trên Scene các bạn sẽ có được Tilemap và môi trường tạo map theo dạng grid.
    
![](https://images.viblo.asia/cd2b0678-d6f2-4340-b002-eaa935402e2f.PNG)
    
Bước 3: Thao tác với Tile Palette.
    - Bật Tile Palette bằng các thao tác sau: Windows -> 2D -> Tile Palette.
    
![](https://images.viblo.asia/aaa2f87b-28ab-4cee-8511-d2ac3fc42c65.PNG)
    
    - Giao diện của Tile Palette như sau:
    
![](https://images.viblo.asia/1a48dd80-cd55-49d7-9141-0f002cc03f35.PNG)
    
    - Tạo một Palette mới:
    
![](https://images.viblo.asia/b6d1d97f-a432-485b-a8d0-7ba2a134e140.PNG)
    
        + Các bạn có thể tạo Palette chia Grid theo các kiểu như sau:
        
![](https://images.viblo.asia/a9496153-b62a-412f-9ab7-a71174c31963.PNG)    
        
            Rectangle : Chia theo các hình chữ nhật, vuông.
            Hexagon : Chia theo hình lục giác
            Isometric : Chia theo hình thoi.
            Isometric Z As Y : Cũng chia theo hình thoi nhưng thay trục Y thành trục Z.
        + Tạo thư mục chứa Palette.
        
![](https://images.viblo.asia/486306dd-5b7f-4bc4-9017-a119c0374d2d.PNG)
        
    - Tạo các Tile bằng cách kéo một Texture/Sprite vào trong Palette vừa tạo.
        + Tạo thư mục chứa các Tile.
        
![](https://images.viblo.asia/0942be78-1e30-4c54-b700-ad09f3e1d0a5.PNG)
        
        + Sau khi tạo xong ta sẽ được một Tile Palette như sau.
        
![](https://images.viblo.asia/af330917-db3f-4a55-af25-3c566dfe8224.PNG)
        
    - Ý nghĩa các Icon theo thứ tự từ trái qua phải như sau:
    
![](https://images.viblo.asia/6e68befa-2c47-44fd-aae4-2815f448aeb2.PNG)
    
        + Lựa chọn 1 vùng của Grid để thao tác.
        + Di chuyển vùng vừa được lựa chọn.
        + Vẽ ra tile bạn đang chọn.
        + Vẽ ra theo dạng khối hình chữ nhât, ví dụ bạn vẽ nguyên 1 khối hình được tạo ra từ nhiều tile có sẵn.
        + Lựa chọn và lưu các tile vào bộ nhớ sẵn sàng để vẽ ra.
        + Tẩy sử dụng để xóa đi các Tile bạn không muốn sử dụng nữa hoặc vẽ nhầm.
        + Công cụ để vẽ 1 loạt tile cùng lúc trong cùng 1 khoảng grid liên tục.
Bước 4: Tạo một Tilemap mới.
    Mỗi Tilemap sẽ được hiểu là 1 layer, vì vậy để tạo ra 1 map đa dạng, ta cần có nhiều layer khác nhau, sau đây là các bước các bạn cần thao tác để tạo 1 layer mới và thao tác được với chúng.
    -  Tạo Tilemap mới: Chuột phải vào Grid trên Scene -> 2D Object -> Tilemap.
    
![](https://images.viblo.asia/0889f895-5c1c-43b7-8895-a35216f814f2.PNG)
    
    - Đổi Tilemap Active trong Tile Palette.
    
![](https://images.viblo.asia/73e8f972-85d9-429e-b8ae-c188266ac39c.PNG)
    
    - Lúc này các bạn đã có thể tương tác với Tilemap mới rồi (Tilemap(1)).
    
![](https://images.viblo.asia/e6c7722f-aae5-4114-9d3e-e8285a7df597.PNG)

Như vậy, qua bài hướng dẫn này, mình hi vọng các bạn có thể tự tạo cho mình các map game với công cụ Tilemap được Unity cung cấp, phiên bản mình sử dụng là phiên bản trên Unity 2018.3.3 Tilemap đã hoàn thiện, nếu các bạn sử dụng những phiên bản cũ hơn như 2017.2 thì sẽ thiếu 1 số tính năng nhé!

![](https://images.viblo.asia/a4b6b727-5af9-4651-8861-3e19f3627702.png)

Chúc các bạn thành công.