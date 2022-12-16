## Giới thiệu chung
Giới thiệu qua thì Colyseus là 1 Authoritative Multiplayer Game Server trên Node.js. Nhiệm vụ nó là tạo ra 1 giải pháp để phát triển game nhiều người dùng bằng JavaScript.<br/>
Một số điều mà Colyseus cung cấp cho bạn là:
*	Giao tiếp bằng = WebSocket
*	API đơn giản giữa client và server
*	Đồng bộ trạng thái giữa client và server
*	Tạo màn chơi
*	Khả năng scale<br/>
Như vậy nhiệm vụ của bạn chỉ cần tập trung vào phần GameEngine (logic trò chơi, business, client), xử lý database.
## Mindset
Server sẽ xác thực các hành động của người dùng, còn client đơn giản là trình bày trạng thái game tại thời điểm hiện tại.
Một vòng lặp của quá trình xử lý trong game được mô tả như sau:
*	Client gửi 1 message lên server, yêu cầu thay đổi trạng thái
*	Input này sẽ được validate bởi room
*	Game state được update
*	Tất cả các clients sẽ nhận được trạng thái mới nhất
*	Update giao diện theo trạng thái<br/>
Dưới đây là diagram ví dụ:<br/>
![](https://images.viblo.asia/58869c5c-8e13-490d-a92d-6826722bb920.png)<br/>
## Concepts
Concepts của Colyseus dựa trên:<br/>
1. Đồng bộ trạng thái
*	Sử dụng MessagePack để mã hoá trạng thái room dạng binary
*	Khi kết nối lần đầu client sẽ nhận room state mới nhất dạng binary
*	Mỗi patch nhị phân được đánh giá bằng thuật toán Fossil's Delta
*	Room state sau khi được patched sẽ được send cho tất cả các clients
2.	Tạo bàn chơi
Để tạo bàn chơi cần implement 1 đối tượng thực thi của room và đăng ký nó với server. Vòng lặp màn chơi như sau:
*	Client gọi request to join 1 room
![](https://images.viblo.asia/a3466c01-ff5c-4403-bdff-421cc9973d79.png)<br/>
*	Server chạy vòng lăp tất cả room và request join 1 lần nữa
![](https://images.viblo.asia/bc6994d0-d32e-45b6-83d9-3b938b60604a.png)<br/>
*	Nếu vào room thành công, hàm onJoin sẽ được call với client tương ứng
*	Nếu fail sẽ trả về trong onError<br/>
Bên cạnh đó trong  hàm requestJoin, có thể thay đổi độ ưu tiên của client bằng cách return biến kiểu số trong khoảng từ 0 đến 1<br/>
![](https://images.viblo.asia/98901f72-4e7d-4a81-bee1-b8d6ee672876.png)<br/>
## Thực hành
Chúng ta đã tìm hiểu qua về cơ chế hoạt động cũng như những cung cấp của Colyseus, vậy còn chờ gì nữa mà không làm thử 1 game đơn giản nào.<br/>
Đầu tiên yêu cầu về cài đặt, chắc chắn bạn cần có node.js rồi đúng không: https://nodejs.org<br/>
Ở đây tôi dùng Typescript nên cần cài thêm bằng câu lệnh:<br/>
```
npm install -g typescript
```
Khởi tạo file package.json, với 1 số dependencies:<br/>
![](https://images.viblo.asia/2dcd1eb3-4dc5-4446-b67e-6d321920e2ec.png)<br/>
Ở đây chúng ta có thể điểm qua 1 số dependencies cần dùng:
-	express để tạo http server
-	uws: websocket library
-	serve-index: để tạo link đến các file của frontend<br/>
Tiếp đến, tôi Khởi tạo tsconfig.json, tạo config cho build typescript được dễ dàng<br/>
![](https://images.viblo.asia/23de78f4-48c7-4055-a276-995ea4f6a3c3.png)<br/>
<br/>
Sau khi xong những phần setup râu ria, tôi đi vào phần chính
1. Tạo room play
Như các bạn biết xử lý room (room handler) là 1 trong những thành phần quan trọng đầu tiên mà chúng ta phải tạo. Đầu tiên tôi sẽ tạo demo 1 đơn giản<br/>
![](https://images.viblo.asia/634b429f-a874-4184-9b90-92f29d680f2e.png)<br/>
Như các bạn thấy hầu như các function xử lý chỉ là log ra các trạng thái update trong life cycle của room thôi.<br/>
2. Frontend
Đã có room vậy làm sao để chúng ta test được, tôi sẽ tạo ra 1 trang frontend đơn giản với 1 form để test dễ dàng hơn.<br/>
Đầu tiên tạo file tên first.html với nội dung cơ bản như sau:<br/>
![](https://images.viblo.asia/f6c49852-3149-4334-b1bc-bfb5b2d88b2f.png)<br/>
Đây là 1 form đơn giản nhập tên bạn và 2 button với chức năng tạo và join 1 room.
3. Client
Viết thêm phần javascript khởi tạo Client cho frontend<br/>
![](https://images.viblo.asia/089c0183-bffc-41c2-93e7-6d57f0fee92a.png)<br/>
Như chúng ta thấy ở đây Client chỉ có 2 functions đơn giản nhất là join room và create room<br/>
![](https://images.viblo.asia/e5a1b9d2-1f44-44a7-9852-fc90be988d51.png)<br/>
Tiếp đến là add event listener để check các action thành công không.<br/>
4. Khởi tạp Server bằng Express
Tạo 1 file khởi tạo ví dụ : index.ts, nội dung như sau: <br/>
![](https://images.viblo.asia/562cd159-3e2f-48cd-aa2f-bd836d51904e.png)<br/>
Phân tích 1 chút về những gì chúng ta làm ở trên đây. Đầu tiên là khởi tạo port và 1 web application bằng express.<br/>
Sau đó với hàm khởi tạo new Server truyền vào 2 tham số là WebSocket và WebApp.<br/>
Một vài hàm routing đến file html tĩnh mà chúng ta để trong folder frontend.<br/>
Tiếp đến là register RoomHandler mà chúng ta đã tạo ở trên<br/>
Khá là ez phải không nào!^^. Giờ chúng ta có thể chạy thử demo và xem kết quả. Đầu tiên chạy<br/>
```
tsc
```
để build typescript, sau đó bạn có thể run bằng lệnh:
```
npm start
```
Server bây giờ đã được start. Chúng ta vào localhost:3000/first.html, sẽ thấy 1 form hiện ra:<br/>
![](https://images.viblo.asia/c1363800-27b0-4097-851f-7b8562fc08d8.png)<br/>
Nhập tên và create Room, check log console của browser bạn sẽ thấy:<br/>
![](https://images.viblo.asia/8d93a0b4-7a0c-4b55-9195-6b1691c27a84.png)<br/>
Nghĩa là chúng ta đã tạo thành công 1 room id từ user này với id là `rkl8wdPNMQ`.
Mở tiếp 1 tab browser khác và nhập accout rồi join, check log console bạn sẽ thấy kết quả tương tự là user mới cũng sẽ join vào room với id là `rkl8wdPNMQ`.<br/>
Vậy là chúng ta đã practice thành công phần đầu tiên sơ khai cơ bản nhất của việc tạo room cho 1 GameServer. Phần tiếp theo sẽ là tương tác giữa các Client trong Room, rất ez thôi, mọi người cùng đón xem nhé!