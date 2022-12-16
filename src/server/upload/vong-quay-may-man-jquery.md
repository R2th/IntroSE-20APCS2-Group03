# Giới thiệu
Chả là đợt vừa rồi section mình có tổ chức 20/10 cho chị em, sau hàng loạt các đầu mục chương trình sẽ diễn ra thì mình có nẩy ra ý tưởng làm cái vòng quay may mắn này để tìm ra 3 chị em may mắn kiếm về giải thưởng từ 50k cho đến 150k. Hôm nay mình xin chia sẻ với mọi người về cách làm nó. ![](https://images.viblo.asia/ebdbedc9-b9a0-402e-a27f-1039b7346708.png) ![](https://images.viblo.asia/8a373a1e-fb77-45c0-a9f9-8a03e5281d0f.png)
# Thực hiện
- Mình có sử dụng thêm các package như `sweetalert2` để hiển thị kết quả, `jquery, bootstrap, font-awesome...` các bạn nhớ chú ý thêm vào nhé
- MÌnh sẽ trình bày source từ trên xuống dưới (viết note ở code), chứ không trình bày theo logic bởi vì như vậy sẽ khá dài, chỗ nào cần note thì mình sẽ thêm message.

HTML
```
<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=550, initial-scale=1">
    <title>Section Bar - Pes Club</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/bootstrap/css/bootstrap.css') }}" media="screen" />
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/font-awesome/css/font-awesome.min.css') }}" media="screen" />
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/sweetalert/sweetalert2.min.css') }}" media="screen" />
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/custom/css/app.css') }}" media="screen" />
</head>
<body>
    <div class="container">
        <div class="container-fluid">
        <div class="col-md-6">
            <h2>Kết quả vòng quay may mắn</h2>           
              <table class="table" style="color: black;">
                <thead style="display: block">
                  <tr>
                    <th>Avatar</th>
                    <th>Họ tên</th>
                  </tr>
                </thead>
                <tbody id="results" style="display: block;">
                </tbody>
              </table>
        </div>
        <div class="col-md-6">
            <div id="wrapper" style="">
                <audio style="display: none;" controls src="{{ asset('assets/images/nhacchuong.mp3') }}" id="audio"></audio>
                // chỗ này là để có nhạc khi quay.
                <div id="wheel">
                    <div id="inner-wheel" style="transform: rotate(1802deg);">
                    //Jquery sẽ hiển thị list các thành viên ở đây
                    </div>
                    <div id="spin" class="showing">
                        <div id="inner-spin" style="background: rgba(0, 0, 0, 0) url('{{ asset('assets/images/2010/logo.jpg') }}') no-repeat scroll center center;"></div>
                    </div>
                    <div id="shine"></div>
                </div>
            </div>
        </div>
        
        <div class="text-center" style="color: black;">Made by <a href="https://www.facebook.com/son.hip.1" target="_blank">Bố Su</a> © 2019</div>
    </div>
    </div>
</body>
    <script src="{{ asset('assets/js/jquery.min.js') }}"></script>
    <script src="{{ asset('assets/sweetalert/sweetalert2.min.js') }}"></script>
    <script src="{{ asset('assets/custom/js/rotation.js') }}"></script>
</html>
```
CSS sweetalert2 animation
```
.swal2-popup {
  font-size: 4rem !important;
}

.swal2-image, .swal2-title {
    margin-top: 25px;
    font-size: 21px;
    text-align: center;

    -webkit-animation: fadein 20s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 20s; /* Firefox < 16 */
        -ms-animation: fadein 20s; /* Internet Explorer */
         -o-animation: fadein 20s; /* Opera < 12.1 */
            animation: fadein 20s;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

@import 'rotation.scss';

```
CSS Rotation
```
*{margin:0;padding:0}body{color:#fff;font-size:18px;font-family:sans-serif;overflow:hidden}a{color:#34495e}#wrapper{margin:20px auto;width:516px;position:relative}#txt{margin:20px;font-size:11px;text-align:center;user-select:none}#wheel{width:500px;height:500px;border-radius:50%;position:relative;overflow:hidden;border:8px solid #fff;box-shadow:rgba(0,0,0,.2) 0 0 10px,rgba(0,0,0,.05) 0 3px 0;transform:rotate(0)}#wheel:before{content:'';position:absolute;border:4px solid rgba(0,0,0,.1);width:492px;height:492px;border-radius:50%;z-index:1000}#inner-wheel{width:100%;height:100%;-webkit-transition:all 6s cubic-bezier(0,.99,.44,.99);-moz-transition:all 6 cubic-bezier(0,.99,.44,.99);-o-transition:all 6s cubic-bezier(0,.99,.44,.99);-ms-transition:all 6s cubic-bezier(0,.99,.44,.99);transition:all 6s cubic-bezier(0,.99,.44,.99)}#wheel div.sec{position:absolute;width:0;height:0;border-style:solid;border-width:280px 25px 0;border-color:transparent;transform-origin:25px 280px;left:225px;top:-30px;opacity:1}#wheel div.sec:nth-child(2){transform:rotate(20deg);-webkit-transform:rotate(20deg);-moz-transform:rotate(20deg);-o-transform:rotate(20deg);-ms-transform:rotate(20deg)}#wheel div.sec:nth-child(4){transform:rotate(40deg);-webkit-transform:rotate(40deg);-moz-transform:rotate(40deg);-o-transform:rotate(40deg);-ms-transform:rotate(40deg)}#wheel div.sec:nth-child(6){transform:rotate(60deg);-webkit-transform:rotate(60deg);-moz-transform:rotate(60deg);-o-transform:rotate(60deg);-ms-transform:rotate(60deg)}#wheel div.sec:nth-child(8){transform:rotate(80deg);-webkit-transform:rotate(80deg);-moz-transform:rotate(80deg);-o-transform:rotate(80deg);-ms-transform:rotate(80deg)}#wheel div.sec:nth-child(10){transform:rotate(100deg);-webkit-transform:rotate(100deg);-moz-transform:rotate(100deg);-o-transform:rotate(100deg);-ms-transform:rotate(100deg)}#wheel div.sec:nth-child(12){transform:rotate(120deg);-webkit-transform:rotate(120deg);-moz-transform:rotate(120deg);-o-transform:rotate(120deg);-ms-transform:rotate(120deg)}#wheel div.sec:nth-child(14){transform:rotate(140deg);-webkit-transform:rotate(140deg);-moz-transform:rotate(140deg);-o-transform:rotate(140deg);-ms-transform:rotate(140deg)}#wheel div.sec:nth-child(16){transform:rotate(160deg);-webkit-transform:rotate(160deg);-moz-transform:rotate(160deg);-o-transform:rotate(160deg);-ms-transform:rotate(160deg)}#wheel div.sec:nth-child(18){transform:rotate(180deg);-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-o-transform:rotate(180deg);-ms-transform:rotate(180deg)}#wheel div.sec:nth-child(20){transform:rotate(200deg);-webkit-transform:rotate(200deg);-moz-transform:rotate(200deg);-o-transform:rotate(200deg);-ms-transform:rotate(200deg)}#wheel div.sec:nth-child(22){transform:rotate(220deg);-webkit-transform:rotate(220deg);-moz-transform:rotate(220deg);-o-transform:rotate(220deg);-ms-transform:rotate(220deg)}#wheel div.sec:nth-child(24){transform:rotate(240deg);-webkit-transform:rotate(240deg);-moz-transform:rotate(240deg);-o-transform:rotate(240deg);-ms-transform:rotate(240deg)}#wheel div.sec:nth-child(26){transform:rotate(260deg);-webkit-transform:rotate(260deg);-moz-transform:rotate(260deg);-o-transform:rotate(260deg);-ms-transform:rotate(260deg)}#wheel div.sec:nth-child(28){transform:rotate(280deg);-webkit-transform:rotate(280deg);-moz-transform:rotate(280deg);-o-transform:rotate(280deg);-ms-transform:rotate(280deg)}#wheel div.sec:nth-child(30){transform:rotate(300deg);-webkit-transform:rotate(300deg);-moz-transform:rotate(300deg);-o-transform:rotate(300deg);-ms-transform:rotate(300deg)}#wheel div.sec:nth-child(32){transform:rotate(320deg);-webkit-transform:rotate(320deg);-moz-transform:rotate(320deg);-o-transform:rotate(320deg);-ms-transform:rotate(320deg)}#wheel div.sec:nth-child(34){transform:rotate(340deg);-webkit-transform:rotate(340deg);-moz-transform:rotate(340deg);-o-transform:rotate(340deg);-ms-transform:rotate(340deg)}#wheel div.sec:nth-child(36){transform:rotate(360deg);-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg)}#wheel div.sec:nth-child(1){transform:rotate(10deg);-webkit-transform:rotate(10deg);-moz-transform:rotate(10deg);-o-transform:rotate(10deg);-ms-transform:rotate(10deg)}#wheel div.sec:nth-child(3){transform:rotate(30deg);-webkit-transform:rotate(30deg);-moz-transform:rotate(30deg);-o-transform:rotate(30deg);-ms-transform:rotate(30deg)}#wheel div.sec:nth-child(5){transform:rotate(50deg);-webkit-transform:rotate(50deg);-moz-transform:rotate(50deg);-o-transform:rotate(50deg);-ms-transform:rotate(50deg)}#wheel div.sec:nth-child(7){transform:rotate(70deg);-webkit-transform:rotate(70deg);-moz-transform:rotate(70deg);-o-transform:rotate(70deg);-ms-transform:rotate(70deg)}#wheel div.sec:nth-child(9){transform:rotate(90deg);-webkit-transform:rotate(90deg);-moz-transform:rotate(90deg);-o-transform:rotate(90deg);-ms-transform:rotate(90deg)}#wheel div.sec:nth-child(11){transform:rotate(110deg);-webkit-transform:rotate(110deg);-moz-transform:rotate(110deg);-o-transform:rotate(110deg);-ms-transform:rotate(110deg)}#wheel div.sec:nth-child(13){transform:rotate(130deg);-webkit-transform:rotate(130deg);-moz-transform:rotate(130deg);-o-transform:rotate(130deg);-ms-transform:rotate(130deg)}#wheel div.sec:nth-child(15){transform:rotate(150deg);-webkit-transform:rotate(150deg);-moz-transform:rotate(150deg);-o-transform:rotate(150deg);-ms-transform:rotate(150deg)}#wheel div.sec:nth-child(17){transform:rotate(170deg);-webkit-transform:rotate(170deg);-moz-transform:rotate(170deg);-o-transform:rotate(170deg);-ms-transform:rotate(170deg)}#wheel div.sec:nth-child(19){transform:rotate(190deg);-webkit-transform:rotate(190deg);-moz-transform:rotate(190deg);-o-transform:rotate(190deg);-ms-transform:rotate(190deg)}#wheel div.sec:nth-child(21){transform:rotate(210deg);-webkit-transform:rotate(210deg);-moz-transform:rotate(210deg);-o-transform:rotate(210deg);-ms-transform:rotate(210deg)}#wheel div.sec:nth-child(23){transform:rotate(230deg);-webkit-transform:rotate(230deg);-moz-transform:rotate(230deg);-o-transform:rotate(230deg);-ms-transform:rotate(230deg)}#wheel div.sec:nth-child(25){transform:rotate(250deg);-webkit-transform:rotate(250deg);-moz-transform:rotate(250deg);-o-transform:rotate(250deg);-ms-transform:rotate(250deg)}#wheel div.sec:nth-child(27){transform:rotate(270deg);-webkit-transform:rotate(270deg);-moz-transform:rotate(270deg);-o-transform:rotate(270deg);-ms-transform:rotate(270deg)}#wheel div.sec:nth-child(29){transform:rotate(290deg);-webkit-transform:rotate(290deg);-moz-transform:rotate(290deg);-o-transform:rotate(290deg);-ms-transform:rotate(290deg)}#wheel div.sec:nth-child(31){transform:rotate(310deg);-webkit-transform:rotate(310deg);-moz-transform:rotate(310deg);-o-transform:rotate(310deg);-ms-transform:rotate(310deg)}#wheel div.sec:nth-child(33){transform:rotate(330deg);-webkit-transform:rotate(330deg);-moz-transform:rotate(330deg);-o-transform:rotate(330deg);-ms-transform:rotate(330deg)}#wheel div.sec:nth-child(35){transform:rotate(350deg);-webkit-transform:rotate(350deg);-moz-transform:rotate(350deg);-o-transform:rotate(350deg);-ms-transform:rotate(350deg)}#wheel div.sec:nth-child(odd){border-color:#e0e0e0 transparent}#wheel div.sec:nth-child(even){border-color:#ccc transparent}#wheel div.sec img{margin-top:-240px;z-index:10000000;display:block;margin-left:-18px;height:35px}#spin{width:168px;height:168px;position:absolute;top:50%;left:50%;margin:-84px 0 0 -84px;border-radius:50%;box-shadow:rgba(0,0,0,.1) 0 3px 0;z-index:1000;background:#fff;cursor:pointer;font-family:sans-serif;font-size:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}#spin:after{content:"CLICK";text-align:center;line-height:168px;color:rgba(0,0,0,.4);position:relative;z-index:100000;width:168px;height:168px;display:block}#spin.showing:after{content:""}#spin:before{content:"";position:absolute;width:0;height:0;border-style:solid;border-width:0 25px 50px 25px;border-color:transparent transparent #fff transparent;top:-39px;left:59px}#inner-spin{width:144px;height:144px;position:absolute;top:50%;left:50%;margin:-73px 0 0 -73px;border-radius:50%;background:#fff;z-index:999;box-shadow:rgba(255,255,255,1) 0 -2px 0 inset,rgba(255,255,255,1) 0 2px 0 inset,rgba(0,0,0,.4) 0 0 5px;background:#fff;background:-moz-radial-gradient(center,ellipse cover,rgba(255,255,255,1) 0,rgba(234,234,234,1) 100%);background:-webkit-gradient(radial,center center,0,center center,100%,color-stop(0,rgba(255,255,255,1)),color-stop(100%,rgba(234,234,234,1)));background:-webkit-radial-gradient(center,ellipse cover,rgba(255,255,255,1) 0,rgba(234,234,234,1) 100%);background:-o-radial-gradient(center,ellipse cover,rgba(255,255,255,1) 0,rgba(234,234,234,1) 100%);background:-ms-radial-gradient(center,ellipse cover,rgba(255,255,255,1) 0,rgba(234,234,234,1) 100%);background:radial-gradient(ellipse at center,rgba(255,255,255,1) 0,rgba(234,234,234,1) 100%)}#spin:active #inner-spin{box-shadow:rgba(0,0,0,.4) 0 0 5px inset}#spin:active:after{font-size:15px}#shine{width:250px;height:250px;position:absolute;top:0;left:0;background:-moz-radial-gradient(center,ellipse cover,rgba(255,255,255,1) 0,rgba(255,255,255,.99) 1%,rgba(255,255,255,.91) 9%,rgba(255,255,255,0) 100%);background:-webkit-gradient(radial,center center,0,center center,100%,color-stop(0,rgba(255,255,255,1)),color-stop(1%,rgba(255,255,255,.99)),color-stop(9%,rgba(255,255,255,.91)),color-stop(100%,rgba(255,255,255,0)));background:-webkit-radial-gradient(center,ellipse cover,rgba(255,255,255,1) 0,rgba(255,255,255,.99) 1%,rgba(255,255,255,.91) 9%,rgba(255,255,255,0) 100%);background:-o-radial-gradient(center,ellipse cover,rgba(255,255,255,1) 0,rgba(255,255,255,.99) 1%,rgba(255,255,255,.91) 9%,rgba(255,255,255,0) 100%);background:-ms-radial-gradient(center,ellipse cover,rgba(255,255,255,1) 0,rgba(255,255,255,.99) 1%,rgba(255,255,255,.91) 9%,rgba(255,255,255,0) 100%);background:radial-gradient(ellipse at center,rgba(255,255,255,1) 0,rgba(255,255,255,.99) 1%,rgba(255,255,255,.91) 9%,rgba(255,255,255,0) 100%);opacity:.1}@-webkit-keyframes hh{0%,100%{transform:rotate(0);-webkit-transform:rotate(0)}50%{transform:rotate(7deg);-webkit-transform:rotate(7deg)}}@keyframes hh{0%,100%{transform:rotate(0);-webkit-transform:rotate(0)}50%{transform:rotate(7deg);-webkit-transform:rotate(7deg)}}.spin{-webkit-animation:hh .1s;animation:hh .1s}
```
JQuery
- Setup 
```
var degree = 18000,
    clicks = 10000;

function getRotationDegrees(e) {
    var r = e.css("-webkit-transform") || e.css("-moz-transform") || e.css("-ms-transform") || e.css("-o-transform") || e.css("transform");
    if ("none" !== r) var s = r.split("(")[1].split(")")[0].split(","),
        n = s[0],
        t = s[1],
        a = Math.round(Math.atan2(t, n) * (180 / Math.PI));
    else a = 0;
    return a < 0 ? a + 360 : a
}
$(document).ready(function() {
    var data = {
        'name': 'image-in-rotation.jpg',
    };

    var resultImages = {
        'name': 'image-in-result.jpg',
    }
```
- Ở đây giao diện giành cho 36 vị trí, vậy nên bạn có gắng sắp xếp cho đủ vị trí nhé
ví dụ hôm section mình tổ chức thì có 18 chị em nên mình có làm 2 vòng `for` ở dưới :)
```
    for (let i in data) {
        $('#inner-wheel').append(`
            <div class="sec">
                <img data-name="${i}" src="/assets/images/2010/${data[i]}">
            </div>
        `);
    }

    for (let i in data) {
        $('#inner-wheel').append(`
            <div class="sec">
                <img data-name="${i}" src="/assets/images/2010/${data[i]}">
            </div>
        `);
    }
```
```
// tất nhiền rồi, để có thể lọc được người đã được chọn thì mình sẽ lưu những người đã trúng vào localStorage
// Hiên thị tất cả chị em đã được quay trúng vào bên bảng và hiển thị người trúng cuối cùng trên nút click quay.
    let allItems = JSON.parse(localStorage.getItem('allItems')) ? JSON.parse(localStorage.getItem('allItems')) : [];
    if (allItems.length > 0) {
        for (let i in allItems) {
            $('#results').append(`
                  <tr>
                    <td><img style="width: 100%; height: 250px;" data-name="${allItems[i].key}" src="/assets/images/2010/main/${allItems[i].image}"></td>
                    <td>${allItems[i].key} <button class="delete" data-image="${allItems[i]}" data-key="${allItems[i].key}"><i class="fa fa-trash"></i></button></td>
                  </tr>
            `);
        }

        $("#inner-spin").css("background", "url(/assets/images/2010/" + allItems[allItems.length - 1].image + ") center center no-repeat"), $("#spin").addClass("showing"), !1
    }
```
- Thực hiện quay
```
    $("#spin").click(function() {
        play(); // thực hiện audio, mình giải thích ở dưới hàm nhé.
        var e = degree * ++clicks + (Math.floor(360 * Math.random()) + 1),
            r = 360 - e % 360;
        $("#spin").removeClass("showing"), $("#inner-spin").css("background", ""), $("#inner-wheel").css({
            transform: "rotate(" + e + "deg)"
        }), setTimeout(function() {
            $("#wheel div.sec").each(function(e, s) {
                var n = getRotationDegrees($(s));
                if (0 === n && (n = 360), n - 5 < r && r <= n + 5) {
                    var t = $(s).children("img").attr("src");
                    let items = JSON.parse(localStorage.getItem('allItems')) ? JSON.parse(localStorage.getItem('allItems')) : []; // lấy ra list chị em đã trúng
                    for (let i in data) {
                        if (data[i] == t.split('/')[4] && JSON.stringify(allItems).indexOf(JSON.stringify({ // đoạn if này sẽ check những người đã trúng thì đảm bảo sẽ không được trúng nữa.
                            key: i,
                            image: data[i]
                        })) < 0) {
                            items.push({
                                key: i,
                                image: data[i]
                            });
                            Swal.fire({
                                title: `<strong>${i}! </strong>`,
                                imageUrl: `/assets/images/2010/main/${data[i]}`,
                                imageHeight: 550,
                                imageWidth: 500,
                                animation: false
                            });
                            //Đoạn này là để hiện thị ra kết quả người thắng
                            //Mình sử dụng sweetalert2 để show ra và thêm một animation css để cho nó hiển thị chậm (Bởi vì anh này sẽ là ảnh troll (yaoming))
                            //Sau khi đã chọn được người thì sẽ lưu vào localstorage
                            localStorage.setItem('allItems', JSON.stringify(items))
                        }
                    }

                    volume(); 
                    //hàm để run audio, xuống dưới mình giải thích cách hoạt động nhé
                    //Chỗ này là để hiển thị người vừa trúng được nè
                    $("#inner-spin").css("background", "url(" + t + ") center center no-repeat"), $("#spin").addClass("showing"), !1
                }
            })
            // vì làm nhanh nên không tránh khỏi code rác =)) hàm này hoạt động giống lúc mới vào trang nhe nhưng n làm việc sau hành
            //động click quay.
            let allItemsAfter = JSON.parse(localStorage.getItem('allItems')) ? JSON.parse(localStorage.getItem('allItems')) : [];
            if (allItemsAfter.length > 0) {
                $('#results').html('');
                for (let i in allItemsAfter) {
                    $('#results').append(`
                          <tr>
                            <td><img style="width: 100%; height: 250px;" data-name="${allItemsAfter[i].key}" src="/assets/images/2010/main/${allItemsAfter[i].image}"></td>
                            <td>${allItemsAfter[i].key} <button class="delete" data-key="${allItemsAfter[i].key}" data-image="${allItemsAfter[i]}"><i class="fa fa-trash"></i></button></td>
                          </tr>
                    `);
                }

                $("#inner-spin").css("background", "url(/assets/images/2010/" + allItemsAfter[allItemsAfter.length - 1].image + ") center center no-repeat"), $("#spin").addClass("showing"), !1
            }
        }, 6000)
    }), $("#wrapper").css("margin-top", Math.max((parseFloat($(document).height()) - 500) / 2), 10)
```
Event này để xóa các chị em đã được chọn (dĩ nhiên case này chỉ sử dụng khi giới hạn số người may mắn và người đã chọn  trước đó không có mặt thì xóa đi :))
```
    $('#results').on('click', '.delete', function () {
        if (confirm('Are you sure?')) {
            let key = $(this).data('key');
            let image = $(this).data('image');
            let allItems = JSON.parse(localStorage.getItem('allItems')) ? JSON.parse(localStorage.getItem('allItems')) : [];

            $.each(allItems, function (i, val) {
                if (val && val.key == key) {
                    allItems.splice(i, 1);
                }
            })

            $('#results').html('');
            for (let i in allItems) {
                $('#results').append(`
                      <tr>
                        <td><img style="width: 100%; height: 250px;" data-name="${allItems[i].key}" src="/assets/images/2010/main/${allItems[i].image}"></td>
                        <td>${allItems[i].key} <button class="delete" data-key="${allItems[i].key}" data-image="${allItems[i]}"><i class="fa fa-trash"></i></button></td>
                      </tr>
                `);
            }

            localStorage.setItem('allItems', JSON.stringify(allItems))

            location.reload();
        }
    })
```
Chỗ này là để thực hiện audio đây
```
    function play(){
     //Lúc bắt đầu click vòng quay thì mình sẽ set lại audio về ban đầu và thực hiện start lại audio
       var audio = document.getElementById("audio");
       audio.currentTime=0;
       audio.volume = 1; // âm lượng nè
       audio.play();
    }

    function volume() {
     //Hàm này được gọi ghi có kết quả, vì khi có kết quả mình sẽ cho nhỏ âm lượng chứ không tắt để không bị giảm không khí trong    //phòng
       var audio = document.getElementById("audio");
       audio.volume = 0.2;
    }
});
```
# Kết thúc
- Trên đây là toàn bộ source mình sử dụng để làm vòng quay may mắn cho chị em, nếu bạn nào cần thì cứ inbox chatwork mình share source cho nhé. 
- Dù 20/10 cũng đã qua được vài ngày nhưng xin chúc các chị em ngày càng xinh đẹp và khỏe mạnh để luôn bên cạnh cánh mày râu chúng tôi (love)