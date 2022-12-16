![](https://images.viblo.asia/039b747e-29a2-447d-b371-41b583f21307.jpg)

Trong bài viết này, tôi sẽ chia sẻ về một phương pháp gắn nhiều ghim tùy chỉnh và thông tin popup trong Google Maps trên Web.

## Mục lục
1. Các trang web được xây dựng sử dụng phương thức này
2. Chuẩn bị data
3. Xây dựng map
     3.1. Xây dựng map thông thường
     3.2. Thiết đặt ghim
     3.3. Gắn sự kiện click vào ghim
4. Tổng kết

## 1. Các trang web được xây dựng sử dụng phương thức này
![](https://images.viblo.asia/cdbdde32-8b40-44f6-9451-d3d9e6a2e202.png)
https://www.guidoor.jp/

Đây là một trang thông tin du lịch của Nhật bản, các thông tin du lịch được kết hợp với bảng thông tin các điểm du lịch đó.

![](https://images.viblo.asia/9d793fd2-23c5-42ce-920c-2687d9a5eb23.png)

Bạn có thể kiểm tra được danh sách các điểm tham qua của mỗi thành phố. Và để có thể thêm được những thông tin các điểm tham quan trên bản đồ bằng cách gắn các ghim tùy chỉnh lên trên google maps để theo dõi được các thông tin đó.
## 2. Chuẩn bị data
Để tạo ra nhiều dữ liệu động, thì tôi đã tạo ra list các dữ liệu trên html như bên dưới : 

```
<div id="js-city-section__map-list" class="city-section__map-list">
        <ul id="js-spot-lists" class="spot-lists">
        　　<li class="spot-list is-current" data-lat="35.1248742" data-lng="138.9109075">
           　　<div class="spot-list__icon">
              　　<img class="spot-list__icon-current" src="https://www.guidoor.jp/wordpress/assets/images/city/pin_red1.png" alt="">
                 <img class="spot-list__icon-normal" src="https://www.guidoor.jp/wordpress/assets/images/city/pin_black1.png" alt="">
              </div>
              <p class="spot-list__title">
              　　<span class="spot-list__title-jp">楽寿園</span>
                 <span class="spot-list__pipe"></span>
                 <span class="spot-list__title-en">Rakujuen Park</span>
              </p>
              <a class="spot-list__arrow" href="https://www.guidoor.jp/place/mishima/rakujuen-park/">
                 <i class="icon icon-link-mini"></i>
              </a>
                         
 〜
  〜
  〜
      </ul>
    </div>
```

Tiếp theo chuẩn bị html sử dụng cho tạo map.
```
<div id="js-city-section__map-canvas" class="city-section__map-canvas" style="position: relative; overflow: hidden;"></div>

```
## 3. Xây dựng map
Gán các dữ liệu đã chuẩn bị trước đo vào map bằng JS.
Toàn bộ source code:
```
const CENTER_LAT = $items.eq(0).data('lat');
const CENTER_LNG = $items.eq(0).data('lng');
const ICON_W = 58/2;
const ICON_H = 72/2;
let map;
let marker = [];
let infoWindow = [];
 
function init() {
    if($('#js-city-section__map-canvas').length &amp;lt; 1) {
        return;
    }
    let mapOptions = {
        center: new google.maps.LatLng(CENTER_LAT, CENTER_LNG),
        zoom: (window.UA.isSP)? 15 :16,
        zoomControl: true,
        disableDoubleClickZoom: false,
        mapTypeControl: true,
        scaleControl: true,
        scrollwheel: false,
        panControl: true,
        streetViewControl: false,
        draggable : true,
        overviewMapControl: false,
        overviewMapControlOptions: {
            opened: false
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let mapElement = document.getElementById('js-city-section__map-canvas');
    map = new google.maps.Map(mapElement, mapOptions);
    //ピンの設置
    for(let i = 0; i < $items.length; i++) {
        let $item = $items.eq(i);
        let markerLatLng = new google.maps.LatLng({
            lat: parseFloat($item.data('lat')),
            lng: parseFloat($item.data('lng'))
        }); // 緯度経度のデータ作成
        let iconClass = (i === 0)? '.spot-list__icon-current': '.spot-list__icon-normal';
        marker[i] = new google.maps.Marker({ // マーカーの追加
            animation: google.maps.Animation.DROP,
            position: markerLatLng, // マーカーを立てる位置を指定
            map: map, // マーカーを立てる地図を指定
            icon: {
                url: $item.find(iconClass).attr('src'),// マーカーの画像を変更
                scaledSize : new google.maps.Size(ICON_W, ICON_H)
            }
        });
 
        let $icon = '<i class="icon icon-link-mini"></i>';
        let $blank = '';
        if($item.find('.spot-list__arrow').attr('target') === '_blank') {
            $icon = '<i class="icon icon-blank"></i>';
            $blank = 'target=_blank';
        }
        infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
            content: `<div class="map-popup"><a href="${$item.find('.spot-list__arrow').attr('href')}" ${$blank}><p><strong>${$item.find('.spot-list__title-jp').text()}</strong></p><p><small>${$item.find('.spot-list__title-en').text()}</small>${$icon}</p></a></div>`
        });
 
        markerEvent(i); // マーカーにクリックイベントを追加
    }
    infoWindow[0].open(map, marker[0]);
}
// マーカーにクリックイベントを追加
function markerEvent(i) {
    marker[i].addListener('click', function() { // マーカーをクリックしたとき
        closeInfoWindow();
        infoWindow[i].open(map, marker[i]); // 吹き出しの表示
        //マーカー色変更
        changeIcon(i);
        //リストの色変更
        changeCurrent(i);
    });
}
function panToSelectedMap(i) {
    //選択したcenterに移動
    let $list = $items.eq(i);
    map.panTo(new google.maps.LatLng($list.data('lat'), $list.data('lng')));
    closeInfoWindow();
    infoWindow[i].open(map, marker[i]);
}
function moveMapOffsetTop() {
    //地図の上部までスクロール
    $('html, body').stop().animate({
        scrollTop: $('#js-city-section__map-box').offset().top - 130
    });
}
function closeInfoWindow() {
    for(let i = 0; i &amp;lt; infoWindow.length; i++) {
        infoWindow[i].close(map, marker[i]);
    }
}
function changeCurrent(i) {
    let $list = $items.eq(i);
    $items.removeClass('is-current');
    $list.addClass('is-current');
    changeIcon(i);
}
function changeIcon(i) {
    let iconClass = null;
    for(let k = 0; k &amp;lt; marker.length; k++) {
        if(k === i) {
            iconClass = '.spot-list__icon-current';
        } else {
            iconClass = '.spot-list__icon-normal';
        }
        marker[k].setOptions({
            icon: {
                url: $items.eq(k).find(iconClass).attr('src'),// マーカーの画像を変更
                scaledSize : new google.maps.Size(ICON_W, ICON_H)
            }
        });
    }
}
 
init();
```
Flow tạo map được thể hiện thông qua các bước như sau:
### 3.1. Xây dựng map thông thường
Để có thể tạo ra một map thông thường chỉ cần thiết đặt các thông số cần thiết như sau : 
```
let mapOptions = {
  center: new google.maps.LatLng(CENTER_LAT, CENTER_LNG),
  zoom: (window.UA.isSP)? 15 :16,
  zoomControl: true,
  disableDoubleClickZoom: false,
  mapTypeControl: true,
  scaleControl: true,
  scrollwheel: false,
  panControl: true,
  streetViewControl: false,
  draggable : true,
  overviewMapControl: false,
  overviewMapControlOptions: {
    opened: false
  },
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
let mapElement = document.getElementById('js-city-section__map-canvas');
map = new google.maps.Map(mapElement, mapOptions);
```
###  3.2. Thiết đặt ghim
Lặp các data đã chuẩn bị trên html và tạo các ghim.
```
let $items = $('#js-spot-lists li');
〜
〜
〜
//ピンの設置
            for(let i = 0; i < $items.length; i++) {
                let $item = $items.eq(i);
                let markerLatLng = new google.maps.LatLng({
                    lat: parseFloat($item.data('lat')),
                    lng: parseFloat($item.data('lng'))
                }); // 緯度経度のデータ作成
                let iconClass = (i === 0)? '.spot-list__icon-current': '.spot-list__icon-normal';
                marker[i] = new google.maps.Marker({ // マーカーの追加
                    animation: google.maps.Animation.DROP,
                    position: markerLatLng, // マーカーを立てる位置を指定
                    map: map, // マーカーを立てる地図を指定
                    icon: {
                        url: $item.find(iconClass).attr('src'),// マーカーの画像を変更
                        scaledSize : new google.maps.Size(ICON_W, ICON_H)
                    }
                });
 
                let $icon = '<i class="icon icon-link-mini"></i>';
                let $blank = '';
                if($item.find('.spot-list__arrow').attr('target') === '_blank') {
                    $icon = '<i class="icon icon-blank"></i>';
                    $blank = 'target=_blank';
                }
                infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
                    content: `<div class="map-popup"><a href="${$item.find('.spot-list__arrow').attr('href')}" ${$blank}><p><strong>${$item.find('.spot-list__title-jp').text()}</strong></p><p><small>${$item.find('.spot-list__title-en').text()}</small>${$icon}</p></a></div>`
                });
}
```
### 3.3. Gắn sự kiện click vào ghim
Gắn sự kiện khi người dùng click vào ghim để hiện thị được popup như sau :
```
// マーカーにクリックイベントを追加
        function markerEvent(i) {
            marker[i].addListener('click', function() { // マーカーをクリックしたとき
                closeInfoWindow();
                infoWindow[i].open(map, marker[i]); // 吹き出しの表示
                //マーカー色変更
                changeIcon(i);
                //リストの色変更
                changeCurrent(i);
            });
        }
```
## 4. Tổng kết
Bài viết này tôi đã giới thiệu một cách đơn giản làm thế nào để có thể gắn các ghim tùy chỉnh lên google maps. Hi vọng sẽ có ích cho mọi người.