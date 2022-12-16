# Cocos creator là gì?
Cocos creator là một công cụ để phát triển game trên nền tảng cocos2dx sử dụng ngôn ngữ java script. Cocos creator là công cụ bao gồm nhiều tính năng hỗ trợ trọn gói cho quá trình làm game từ việc thiết kế ui, xây dựng component, kiểm thử, build sản phẩm... Nhờ đó cocos creator được đông đảo game deverloper yêu thích platform cocos2dx sử dụng. 
Bạn có thể download cocos creator tại đường link: http://www.cocos2d-x.org/download
Sau đây mình sẽ giới thiệu tổng quát cocos creator tới các bạn.
## Editor view
![](https://images.viblo.asia/c59abc8c-46f5-4396-8e26-d71855a33a62.png)
Đây là toàn bộ giao diện thiết kế UI của cocos creator sau khi bạn đã tạo và mở project mới, được chia thành 4 phần quan trọng scene view, assets view, component inpector và timeline view.
### Scene view
![](https://images.viblo.asia/e7cc7425-3b09-484a-ab83-5daeeb8864f6.png)
Bên trái của scene view là Node tree hiển thị các thành phần trong scene như sprite, image, label... có thể thay đổi các thuộc tính của đối tượng này bằng cách chọn vào đối tượng đó trong node tree, khi đó sẽ khung component inpector sẽ xuất hiện, phần này chúng ta sẽ tìm hiểu trong component spector.
Bên phải là thanh node library chứa các đối tượng phổ biến hay được sử dụng trong game, để thêm các đối tượng này vào trong scene chúng ta chỉ cần kéo thả chúng sang khung Scene. Phần custom node là nơi chứa các node đặc trưng được deverloper xây dựng theo đặc thù của game mình. Đây là 1 tính năng làm cho cocos creator linh động hơn rất nhiều.
### Assets view
![](https://images.viblo.asia/317c21c4-ed42-4487-a2d7-018b0caf33e5.png)
Nơi quản lý tài nguyên của game như hình ảnh, component, scenes, popup, scripts, prefab... 
### Component inpector
![](https://images.viblo.asia/92345916-4968-4d66-8149-04714399f4c0.png)
Nơi chứa các component của 1 đối tượng như sprite, image... Mỗi đối tượng sẽ bao gồm nhiều component. Tuỳ vào các component mà đối tượng sở hữu mà component inpector sẽ hiển thị các component đó.
### Timeline View
![](https://images.viblo.asia/2dfad694-f3c2-4ae3-b944-ac6fb7effd40.png)
Nơi để tạo ra các component animation một thành phần không thể thiếu trong game.
## Component
Cocos creator giúp lập trình theo hướng component, các đối tượng được chia thành nhiều các component, mỗi component có thuộc tính và tính năng riêng xây dựng bằng javascript. Một số component phổ biến có sẵn trong cocos creator như Node, WiWidget, Sprite, Button... một số component deverloper phải tự xây dựng để phù hợp với từng game riêng. 
 Thêm mới 1 component
![](https://images.viblo.asia/08f44787-c4fc-4fe9-82b0-af74d190c19e.png)
Để add 1 component vào trong 1 đối tượng trong phần component inpector của đối tượng đó chọn "add component" 
![](https://images.viblo.asia/87c4c8fb-b2c9-46a2-9335-0391637c3f82.png)
Các đối tượng có thể dùng chung các component nếu có các đặc tính giống nhau, đây là 1 điều rất thuận lợi khi mở rộng đối tượng.
## Build sản phẩm
Để build sản phẩm chúng ta chọn Project->Build... Một hộp thoại build setting hiện ra
![](https://images.viblo.asia/229773db-a5b4-4983-b843-e6a9b425064b.png)
Cocos creator hỗ trợ build ra nhiều platform : Web mobile, web desktopdesktop, android, ios, mac... Việc setting build tương đối đơn giản. Thời gian build phụ thuộc vào độ phức tạp của project và việc chọn platform, thông thường build lần đầu sẽ mất từ 20p đến 40p.
# Tổng kết
Cocos creator là một editor tương đối hoàn thiện để phát triển game 2D đơn giản. Cocos creator giúp cho việc lập trình hướng component trở nên đơn giản. Nhược điểm của cocos creator là chỉ hỗ trợ ngôn ngữ javascript, số lượng các component có sẵn chưa được phong phú. Cocos creator là một phiên bản Unity của cocos2d-x. Hy vọng trong tương lai cocos creator phát triển hơn nữa và sẽ hỗ trợ cả về 3D.