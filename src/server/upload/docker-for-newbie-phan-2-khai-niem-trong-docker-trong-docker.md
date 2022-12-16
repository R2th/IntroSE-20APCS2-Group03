## Vài lời tựa đầu
Hehe, xin chào các bạn lại trở lại với những series về Docker của mình. Ngày xưa thích viết blog lắm nhưng bãng đi thời gian tầm 1-2 năm nay không lên chú blog nào :D Nay thấy MayFest Viblo nên nhiệt tình tham gia lại. Mình quyết định trở lại Series Docker cho Newbie vì hiện nay các công ty càng ngày càng sử dụng Docker nhiều hơn và nhiều bạn khá confuse về các khái niệm Docker. Nào, hãy cùng mình tìm hiểu về cơ bản trước nhé

## Bước đầu tiên
Trước hết, nếu bạn là người đầu tiên tiếp cận với từ `Docker` hay là có nghe qua nhưng không thực sự hiểu và đặt ra những câu hỏi như `Docker là gì nhở? Tại sao phải dùng Docker` thì hãy đọc phần 1 của mình tại đây [Làm quen một chút với Docker](https://viblo.asia/p/lam-quen-1-chut-voi-docker-gDVK2Qr25Lj)

## Okay, mình đã sẵn sàng để đặt chân vào Docker

#### Trước hết bạn phải cài Docker trước đã 
Docker hiện tại có version desktop trên 2 nền tảng phổ biến là Windows và Mac bạn có thể tại [đây](https://docs.docker.com/get-docker/), còn linux sẽ có version cli thôi nhé (Windows với Mac cũng có CLI nhé :( Chỉ có điều là Desktop dễ nhìn, dễ sử dụng hơn xíu với các bạn mới vào)

Phần cái đặt mình nghĩ khá dễ hiểu vì docs khá chi tiết nên mình xin phép được skip nó. Nếu bạn có thắc mắc gì hãy comment ở dưới nhé.

Okay, sau khi đã cài đặt xong hãy mở docker lên và chờ trong chút lát để Docker tiến hành khởi động. Có 1 tip giúp các bạn biết docker đã khởi động lên chưa là nhìn vào thanh Taskbar (ở Windows) hoặc MenuBar (ở Mac), nếu Icon con cá voi chuyển động thì docker đang starting còn nếu mà đã khởi động thành công thì sẽ đứng yên :D Mình không thể cap ảnh động được nên hơi khó hình dung hehe
![](https://images.viblo.asia/348f9c97-a000-4429-904f-a2cc1750aecd.png)

Để kiểm tra hãy mở Terminal lên và gõ `docker run hello-world`, nếu như hình bên dưới thì coi như bạn thành công rồi đó :D
![](https://images.viblo.asia/53bcb724-2eff-4706-aed9-f36628f92a0a.png)

#### Hãy tìm hiểu về một số khái niệm nhé
- Docker Daemon: Là server Docker nhận yêu cầu từ Docker API, chịu trách nhiệm quản lí các Images, Containers, Networks, Volumes (Chưa cần hiểu các khái niệm này vội mình sẽ giải thích bên dưới)
- Docker Client: Là client bạn tương tác với Docker Daemon (Docker Desktop - Windows, MacOS hay CLI ở mọi nền tảng)

Đây là 2 thứ mà khi bạn cài Docker nó sẽ tự cài cho bạn. Nếu bạn là 1 Developer hoặc có chút khái niệm về Server và Client thì thấy bản thân Client và Daemon cũng giao tiếp với nhau qua API, tức là nó không phải là 1 thứ mà tách hẳn riêng ra và có suy nghĩ: `Ủa thế thì máy tôi yếu thì có thể cài Daemon trên VPS và Client ở máy tính không?`. Câu trả lời là có, bản thân mình trước sử dụng chiếc Chromebook của Google máy khá yếu nhưng mình cài Docker Client và sử dụng Daemon trên VPS Google vẫn ngon lành cành đào luôn.

*Thế còn những khái niệm Images, Containers, Networks và Volumes ở trên thì sao?*
- Images: Nếu bạn là 1 tay chơi PC các kiểu ngày xưa thì chắc cũng phải biết đến kiểu ghost win các thứ thì đấy khái niệm images của docker cũng giống bản ghost đó. Còn nếu mà chưa bao giờ tiếp cận thì không sao, bạn dịch đúng nghĩa images là bức ảnh luôn, bức ảnh đó chụp lại toàn bộ hệ thống vào thời điểm nào đó.
- Containers: Bạn hiểu nôm na thì nó là 1 cái máy ảo cũng được vì nó hoạt động gần như vậy (Bản chất Containers với máy ảo khác nhau như nào bạn có thể research `Different Docker and VM`)

2 khái niệm này gần như có sự liên quan đến nhau, lấy ví dụ thực tế nhé, nếu bạn coi images là bức ảnh (Mình sẽ lấy là 1 file ảnh jpg hay png hay heic gì đó =))) ) thì file ảnh đó nếu bạn backup lại và sửa lên thì tạo ra vô số bản sao với các bức ảnh khác nhau. Images của docker cũng giống vậy, bạn sẽ lưu lại cái images đó và khi run lên sẽ tạo ra containers (Hành động run tương tự như bạn edit 1 bức ảnh). Mọi hành vi chỉnh sửa, tương tác sẽ là ở container chứ không phải ở images. Hoặc có thể hiểu đơn giản hơn images là file iso để bạn cài win và khi cài vào máy bạn thì máy bạn là containers cũng được

- Networks: Là mạng ảo trong docker giúp các container tương tác với nhau. Như trên mình đã nói thì container cũng giống như 1 máy tính, vậy đương nhiên là nhiều máy tính hoàn toàn có thể tương tác trong mạng LAN. Docker Networking sẽ tạo ra 1 mạng ảo giúp các container liên kết với nhau (Như server ở 1 container, db ở 1 container và client ở 1 container, 3 thứ này sẽ gọi nhau qua VLAN của docker networking).
- Volumes: Là phần vùng mà docker tạo ra giữa các container. Phân vùng này cũng giống như mạng, có thể sử dụng ở 1 container hay nhiều container liên kết với volumes đó (shared volumes) hay giữa máy chính và container. Ở môi trường development, người ta sẽ mount code từ máy chính vào máy thật để có thể sử dụng hot reload hoặc một vài thứ khác liên quan đến edit, nhưng ở product người ta sẽ copy code và build ở trong container để đồng nhất môi trường. Tương tự, ở product, người ta thường share volumes của container database để backup cũng như là sync data

Đó là những khái niệm cơ bản nhất của docker ngoài ra còn một số khái niệm như
- Docker Registry: Là nơi quản lí docker images. Nó gần giống như github khi cũng có các khái niệm push pull images từ client đến registry vậy. 
- Docker Hub: Là Docker registry mặc định và lớn nhất. Bạn hoàn toàn có thể tìm thấy các images nổi tiếng như ubuntu, nginx, mysql,.. tại đây. Ngoài ra cũng có các docker registry khác như AWS ECR, Azure, Google,...

Ở bài viết sau chúng ta sẽ cùng đến với thực hành docker qua CLI nhé :D Tạm biệt