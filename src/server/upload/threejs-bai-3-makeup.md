![](https://images.viblo.asia/e418c522-df70-45c4-86b2-e24d3af731b4.gif)

https://threejs.tothemoon-min.com/lightmap.html

Sau 2 bài giới thiệu cơ bản, hôm nay sẽ là bài cơ bản tiếp theo (:D) đó là make up. Tất nhiên là đem cái khung xương mà 2 bài trước đem ra thì trông không được hấp dẫn lắm, vì vậy giờ sẽ cần trang trí 1 cho mấy cái hình của mình.
# Vẽ mặt
Để đơn giản và tối thiểu cho dễ hiểu, mình sẽ lấy ví dụ là khối 'cube' cơ bản nhé. Chỉ cần đơn giản sử dụng lại [project đầu tiên](https://codepen.io/bunnypi04/pen/QWNzjaR): thay khai báo `geometry` từ `Shpere` sang `cube` rồi chỉnh lại kích cỡ cho dễ nhìn là đc
```javascript
var geometry = new THREE.SphereGeometry(1, 8, 5); // size of box
```

Thành
```javascript
var geometry = new THREE.CubeGeometry(1, 1, 1); // size of box
```
## Mặt ảnh
Được rồi, giờ bạn lại thấy 1 cái khung lần này là hình lập phương trên màn hình. Như đã nói, giờ cần phải thay cái khung bằng các mặt hình ảnh vẽ vời cho đẹp. Đang sử dụng hình hộp lập phương nên sẽ có 6 mặt cần vẽ. Bởi vì bây giờ phải thay ảnh vào các mặt, có nghĩa là 'vật liệu' cấu tạo nên hình khối đã thay bằng các hình ảnh. Vậy thì cần viết lại `material` thay bằng các hình ảnh thôi. Để có thể load được ảnh cần vào khối của mình, cần phải gọi thư viện load kết cấu (Texture) ra:
```javascript
var textureLoader = new THREE.TextureLoader();
```

Tiếp theo mình sẽ load các hình ảnh vào các thành phần kết cấu mới:
```javascript
var texture0 = textureLoader.load( 'images/cube1.jpg' );
var texture1 = textureLoader.load( 'images/cube2.jpg' );
... // làm đủ 6 mặt nhé
```
Giờ, có 6 mặt kết cấu hình ảnh được load lên rồi, ghép lại vào `material` nữa là được
```javascript
var material = [
    new THREE.MeshBasicMaterial({map: texture0}), //right
    new THREE.MeshBasicMaterial({map: texture1}), //left
    new THREE.MeshBasicMaterial({map: texture2}), //top
    new THREE.MeshBasicMaterial({map: texture3}), //bottom
    new THREE.MeshBasicMaterial({map: texture4}), //front
    new THREE.MeshBasicMaterial({map: texture5}), //back
];
```
Đọc chú thích của mình chắc các bạn cũng hiểu, trên kia là thứ tự load hình ảnh vào các mặt của khối lập phương của mình.
Giờ, sau đoạn này tất nhiên là đến thêm material vào khối rồi:
```javascript
    var sphere = new THREE.Mesh(geometry, material);
```

Nào giờ load trên trình duyệt xem nhé (nhớ sử dụng [Trackball control](https://viblo.asia/p/threejs-bai-2-dich-chuyen-doi-tuong-3d-controls-4P856n6W5Y3#_trackball---xoay-khong-gian-4) để xoay xoay cái hình xem các mặt nhé)

![](https://images.viblo.asia/24498552-60c6-4609-91ac-98abdf1c5e51.gif)

Bùm! chúng ta có 1 khối đen thui cả 6 mặt :D. Lý do là bởi vì lối 'Cross Origin' huyền thoại quen thuộc :D. Trình duyệt ko cho bạn load hình ảnh từ `file:///` hoặc bất kỳ hình ảnh nào khác ngoài domain. Giải quyết thì có thể sử dụng proxy, vào cài đặt lại cái allow cho trình duyệt (tất nhiên tiềm ẩn vấn đề security sau này cho bạn), hoặc đơn giản là cho hình ảnh về chung domain thế là đỡ phải cần xin phép :D. Lúc này nếu bạn đang sử dụng việc double click để load file html chưa project js kia, và hình ảnh thì ở `file:///`, thì mặc dù open image in new tab vẫn hiện ra ảnh, nhưng hình ảnh sẽ ko hiện lên.

Giải quyết vấn đề này, để đưa hình ảnh vào chung 1 domain với project đang làm, bạn cần chạy nó trên server. Mình code PHP nên sẽ chạy project này bằng PHP: Chỉ cần cd vào folder project, mở command line chạy lệnh:
```bash
php -S 127.0.1.1:1000
```
Sẽ thấy được thông báo là project đang chạy trên `127.0.1.1:1000` (port mình chọn bừa thôi :D). Giờ chạy web trên trình duyệt bằng đường dẫn `127.0.1.1:1000`. Bạn đã thấy khối với các mặt hình lên chưa? nếu chưa thì chắc là sai đường dẫn đâu đấy rồi :D

![](https://images.viblo.asia/fe46aa33-4599-461b-ab7e-caa44dcad107.gif)

Xem mình zoom thử phát thì thấy có gì đó lạ? Khi zoom vào (camera tiến gần tới vật thể), tới khi cắt ngang cái khối. Lúc này là đang nhìn vào bên trong khối, có thể thấy là bên trong trống rỗng, nhưng cũng ko thấy các mặt của khối đâu?

Do ở trên map mới có 1 mặt bên ngoài nên hiện tại mặt bên trong đang là `null`. Để 2 mặt cùng in 1 hình, thêm `side: THREE.DoubleSide` vào khi map từng mặt material nhé:
```javascript
var material = [
    new THREE.MeshBasicMaterial({
        map: texture0,
        side: THREE.DoubleSide
    }), //right
    new THREE.MeshBasicMaterial({
        map: texture1,
        side: THREE.DoubleSide
    }), //left
    new THREE.MeshBasicMaterial({
        map: texture2,
        side: THREE.DoubleSide
    }), //top
    new THREE.MeshBasicMaterial({
        map: texture3,
        side: THREE.DoubleSide
    }), //bottom
    new THREE.MeshBasicMaterial({
        map: texture4,
        side: THREE.DoubleSide
    }), //front
    new THREE.MeshBasicMaterial({
        map: texture5,
        side: THREE.DoubleSide
    }) //back
];
```

![](https://images.viblo.asia/ac134463-c037-4b6c-9c97-6424db0031d0.png)

Đây là hình ảnh 'zoom' lên khi mình chỉ double side cho đúng mặt bên phải.

https://i.pinimg.com/564x/b8/a4/c2/b8a4c259fd4267b4027a0776df644f71.jpg

## Mặt màu
Nếu không thích mặt hình, muốn mặt màu, thì đổi 1 chút là xong nhé:
```javascript
new THREE.MeshBasicMaterial({
    color: '#271952'
}),
```
# Tạo khối - ánh sáng
Sau khi thêm các mặt cho khối, thì nhìn vẫn hơi 'giả trân'. Giờ sẽ thêm 1 ít ánh sáng cho đối tượng của chúng ta nhé

## Các loại ánh sáng - hướng sáng
Trước hết thì có vài loại ánh sáng, với mỗi loại ánh sáng - hay hướng sáng, sẽ quyết định các vùng tối - sáng của vật thể. Giờ sẽ tìm hiểu các loại ánh sáng trước nhé:
 - Ambient Light - Ánh sáng tự nhiên
 - Directional Light - Ánh sáng định hướng
 - Point Light - Ánh sáng từ 1 điểm
 - SpotLight - Ánh sáng đèn studio

![](https://images.viblo.asia/1ca9f045-8802-4d37-ad36-af38ea559a35.gif)


### Ambient Light
Có thể hiểu đơn giản là Ánh sáng sẵn có trong môi trường chụp ảnh (có thể bao gồm ánh sáng mặt trời hoặc/và các loại ánh sáng đèn thông thường, không phải lúc nắng gắt hoặc đèn dây tóc nhé :D). Nó sẽ chiếu sáng toàn bộ vật thể cho dù vật đó ở rất xa hoặc rất gần camera, và chiếu sáng đều mọi vật thể trong môi trường

![](https://images.viblo.asia/0a1b9fe0-1d4d-48b7-9083-9c60e8727e96.jpg)

Khai báo như sau:
```javascript
var ambientLight = new THREE.AmbientLight(<Màu của ánh sáng>, <cường độ sáng>);
```
Và cần truyền vào 2 tham số: 
 - Màu ánh sáng - Dạng hexa nhé (VD: 0xffffff => ánh sáng trắng)
 - Cường độ ánh sáng: default là 1

### Directional Light

Đây là kiểu ánh sáng chỉ chiếu sáng từ 1 hướng. Thường thì nguồn sáng này sẽ khá là xa so với vật thể, các tia sáng sẽ song song với nhau như hình minh họa. Kiểu sáng này sẽ tạo bóng - shadow cho vật thể do chỉ chiếu sáng từ 1 hướng
![](https://images.viblo.asia/9c4851ab-a38e-4b82-a201-c04596e2bdbb.jpeg)


### Point Light

Point Light như tên của nó, nguồn sáng xuất phát từ 1 điểm, và không xa so với vật thể, giống như là cái đèn ngủ vậy.
![](https://images.viblo.asia/ad7a1619-9ede-4a53-8894-c988ca349459.jpg)

Khai báo như sau:
```javascript
var pointLight = new THREE.PointLight(<Màu của ánh sáng>, <cường độ sáng>, <khoảng cách>);
pointLight.position.set( 50, 50, 50 );
```
Và cần truyền vào 2 tham số: 
 - Màu ánh sáng - Dạng hexa nhé (VD: 0xffffff => ánh sáng trắng)
 - Cường độ ánh sáng: default là 1
 - Khoảng cách: giới hạn tối đa chiếu sáng. Default là 0. Nếu bạn apply Point light mà thấy hình của mình đen thui tức là khoảng cách này chưa đúng, thử tăng lên xem nhé :D
 - PointLight position: vị trí của nguồn sáng

### Spot Light

> Spot Light trông và hoạt động giống như ánh sáng điểm trong thế giới thực và tuân theo quy luật vật lý về cường độ suy giảm bình phương nghịch đảo. Ánh sáng bức xạ từ một điểm duy nhất chiếu ra ngoài theo hình nón, càng mở rộng đối tượng ra khỏi chính nguồn sáng, và bị cản lại như cái chụp đèn ấy.

Nói chung hiểu đơn giản là ánh sáng như là đèn chiếu trong studio chụp ảnh ấy :D

![](https://images.viblo.asia/dbcca6f3-3005-4c1a-8552-af5ed63a2e34.jpg)

Việc sử dụng thì tương tự như Spot Light nhé:
```javascript
var spotLight = new THREE.SpotLight(<Màu của ánh sáng>, <cường độ sáng>, <khoảng cách>);
spotLight.position.set( 50, 50, 50 );
```

## Tô bóng bề mặt
Để xác định được ảnh hưởng của ánh sáng lên vật thể trông như thế nào, còn phải xem tới bề mặt vật thể đó thuộc dạng nào nữa
Các loại tô bóng bề mặt mình cần tìm hiểu là:
 - Phong Material
 - Blinn Material
 - Lambert Material
### Phong
Nghe tên Việt Việt nên mình cũng ngờ ngợ, qua tìm hiểu thì đây là phương pháp tô bóng do Bui Tuong Phong (Bùi Tường Phong?) là người Việt tạo ra thật :D (theo https://en.wikipedia.org/wiki/Phong_shading )

Đại loại là máy sẽ tính toán dựa trên 1 mô hình phản xạ ánh sáng từ các bề mặt và ước lượng màu sắc của điểm ảnh bằng cách nội suy vecto trực giao bề mặt (@@ đau đầu) (Cũng theo Wiki)

![](https://images.viblo.asia/97a946d1-0d77-4059-b4a5-031ec91f82e8.png)

### Blinn
Đây là cách tô bóng tốn công tính toán nhất trong 3 loại tô bóng ở trên. Cách tô bóng này thường dùng cho các vật liệu như là kính, mặt kim loại với độ bóng sáng cao.

Về cơ bản Blinn và Phong khá giống nhau, nhưng dạng Phong có xu hướng khuếch tán ánh sáng cao hơn, khiến độ bóng 'mềm' hơn, còn Blinn thì ánh sáng phản xạ tập trung hơn, có vẻ 'glossy' hơn. Về vấn đề phân biệt 2 cái này thì mình có xem khá nhiều tài liệu nhưng vẫn không thể làm thế nào cho clear và giải thích dễ hiểu cho mọi người được, nên các bạn cứ xem hình ảnh minh họa và chọn cái nào ưng ý nhé.

### Lambert
Đây là bề mặt non-shiny, tức là kiểu như không bị bóng sáng, mặt lì, như là bề mặt vải chẳng hạn.

## Bắt đầu chiếu sáng

Tùy vào mục đích và ý đồ, bạn sẽ chọn loại ánh sáng cho phù hợp dựa vào những mô tả ở trên. Mình chọn AmbientLight
```javascript
var ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
// và đừng quên add ánh sáng vào scene nhé:
scene.add(ambientLight);
```
AmbientLight Tất nhiên là sẽ được thay bằng loại ánh sáng bạn muốn nhé

Nếu mới define ánh sáng mà bạn thử refresh lại, sẽ thấy là: hình như có cái gì thay đổi đâu? Thế nên mới cần cái chất liệu bề mặt ở trên này. Ban đầu mặc định chúng ta đang sử dụng Material là 'MeshBasicMaterial', đây là dạng bề mặt solid cơ bản, không bị ảnh hưởng bởi ánh sáng. Về mặt tích cực thì dùng cái này thì không cần bật đèn vẫn nhìn thấy rõ vật thể :D. Hãy xem hình ảnh dưới đây:

![](https://images.viblo.asia/3cea30fb-595d-40cc-8a20-9588581dd433.png)

Có thể thấy, các Bề mặt khác nhau có cách phản chiếu ánh sáng khác nhau. Với bề mặt dạng 'Lambert', là dạng khá lì, không bị 'bóng' trong khi dạng 'Phong' và 'Blinn' có thể thấy phản chiếu bóng (glossy and shiny). Và như hình ảnh, thì dạng MeshBasicMaterial chính là dạng 'Constant' ở cuối, chẳng có phản chiếu bóng bẩy nào cả :D. 4 dạng trên có độ bóng khác nhau, chọn bóng mạnh mẽ, bóng gồng hay thẳng tùy bạn nhé :D

Chọn được Material rồi thì chỉ cần thay vào MeshBasicMaterial của bạn thôi:

```javascript
var material = [
    new THREE.MeshLambertMaterial({
        color: '#271952'
    }), //right
    new THREE.MeshLambertMaterial({
        map: texture1,
        side: THREE.DoubleSide
    }), //left
    new THREE.MeshLambertMaterial({
        map: texture2,
        side: THREE.DoubleSide
    }), //top
    new THREE.MeshLambertMaterial({
        map: texture3,
        side: THREE.DoubleSide
    }), //bottom
    new THREE.MeshLambertMaterial({
        map: texture4,
        side: THREE.DoubleSide
    }), //front
    new THREE.MeshLambertMaterial({
        map: texture5,
        side: THREE.DoubleSide
    }) //back
];
```
Nếu bạn đang sử dụng Ambient Light, bạn có thể xoay vật thể và thấy mọi thứ sáng choang bình thường

![](https://images.viblo.asia/64ebf397-00f0-4649-8f1a-682c371543ef.gif)

Tuy nhiên bạn chọn các dạng chiếu sáng khác (chiếu sáng từ 1 phía có tạo bóng), thì sẽ thấy mặt đối diện với ánh sáng bị đen thui

![](https://images.viblo.asia/3fb7acce-ae66-46b9-a80f-1e7ab38c2996.gif)

Đây là do ánh sáng không chiếu tới mặt sau, tạo khoảng đen như vậy. Để tránh điều này bạn có thể add thêm các ánh sáng khác vào nữa nhé, tưởng tượng như 1 phòng có nhiều bóng đèn, và có cả ánh sáng tự nhiên ấy. Bóng ở vị trí nào sẽ soi cường độ của bóng tới các mặt hướng về phía nó.

```javascript
var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 5.0 );
scene.add(ambientLight);

var light1 = new THREE.PointLight( 0xff0040, 4, 50 ); // lắp thêm 1 bóng đèn đỏ cường độ sáng x4
scene.add( light1 );

var light2 = new THREE.PointLight( 0x0040ff, 3, 50 ); // lắp thêm bóng nữa
scene.add( light2 );

var light3 = new THREE.PointLight( 0x80ff80, 4, 50 );
scene.add( light3 );
```

Dưới đây là project mẫu của mình, mọi người có thể F12 lên xem nhé: https://threejs.tothemoon-min.com/lightmap.html