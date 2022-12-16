Trong công việc, tôi được giao một task như sau: hiển thị danh sách các tỉnh / thành phố của Việt Nam; khi click vào từng tỉnh thì hiển thị trên bản đồ tỉnh đó. Tôi sẽ chia sẽ lại với các bạn các bước mà tôi đã thực hiện.

### Crawl dữ liệu

Đầu tiên, tôi sẽ lấy danh sách tên các tỉnh của Việt Nam cùng địa chỉ Wikipedia của tỉnh đó. Lý do tôi sử dụng Wikipedia vì ở trang chi tiết từng tỉnh có thông tin tọa độ (kinh độ vĩ độ).

Danh sách các tỉnh / thành phố của Việt Nam ở địa chỉ sau:

[Provinces of Vietnam - Wikipedia](https://en.wikipedia.org/wiki/Provinces_of_Vietnam)

Tôi sẽ sử dụng PHP để bóc tách cấu trúc HTML của trang web và lấy ra danh sách tỉnh. Sau khi có danh sách, tôi sẽ thực hiện vòng lặp để gọi trang chi tiết của từng tỉnh và lấy ra kinh độ vĩ độ.

File `get_province_list.php` như sau:

 ```php
<?php

/**
 * Lấy mã HTML của trang web.
 * @param string $url Địa chỉ trang web
 * @return string Mã HTML
 */
function getHtml(string $url): string
{
    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false
    ]);
    $resp = curl_exec($curl);
    curl_close($curl);
    return $resp;
}


/**
 * Bóc tách mã HTML, lấy danh sách các tỉnh / thành phố của Việt Nam.
 */
function getProvinceList(string $html): array
{
    $doc = new DomDocument();
    @$doc->loadHTML($html);

    $table = $doc->getElementsByTagName('table')->item(2);
    $rows = $table->getElementsByTagName('tr');

    $provinceList = [];
    foreach ($rows as $idx => $row) {
        // Dòng header không có thẻ td
        if ($idx == 0) {
            continue;
        }

        $cols = $row->getElementsByTagName('td');
        $firstCell = $cols->item(0);
        $link = $firstCell->getElementsByTagName('a')->item(0);
        $provinceName = $link->nodeValue;
        $provinceName = str_replace([' Province', ' City'], ['', ''], $provinceName);
        $url = $link->getAttribute('href');
        
        $provinceList[] = [
            'name' => $provinceName,
            'url' => 'https://en.m.wikipedia.org' . $url
        ];
    }

    return $provinceList;
}


/**
 * Lấy tọa độ của từng tỉnh từ trang Wikipedia của tỉnh đó.
 */
function getCoordinatesOfProvince(string $url): array
{
    $html = getHtml($url);
    $doc = new DomDocument();
    @$doc->loadHTML($html);

    $xpath = new DOMXpath($doc);
    $elems = $xpath->query("//span[@class='geo-dec']");
    $summary = $elems[0]->textContent;
    echo $summary . PHP_EOL;

    $lat = 0;
    $lng = 0;
    $regex = '/([\d.]+)°N ([\d.]+)°E/';
    if (preg_match($regex, $summary, $maches)) {
        $lat = floatval($maches[1]);
        $lng = floatval($maches[2]);
    }

    return [
        $lat,
        $lng
    ];
}


/**
 * Lưu đầu ra JSON ra file.
 */
function writeToJsonFile(array $provinceList): void
{
    $filePath = 'data/provinceList.json';
    $json = json_encode($provinceList, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    file_put_contents($filePath, $json);
}


function main(): void
{
    $html = getHtml('https://en.m.wikipedia.org/wiki/Provinces_of_Vietnam');
    $provinceList = getProvinceList($html);
    foreach ($provinceList as $i => $province) {
        [$lat, $lng] = getCoordinatesOfProvince($province['url']);
        echo $province['name'] . PHP_EOL . $lat . ', ' . $lng . PHP_EOL . PHP_EOL;
        $provinceList[$i]['lat'] = $lat;
        $provinceList[$i]['lng'] = $lng;
        unset($provinceList[$i]['url']);
    }
    writeToJsonFile($provinceList);
}

main();
 ```

Thực hiện script:

 ```
php get_province_list.php
 ```

Sau khi thực hiện xong script, chúng ta sẽ được file đầu ra `data/provinceList.json` như sau:

 ```json
[
    {
        "name": "Bắc Giang",
        "lat": 21.333,
        "lng": 106.333
    },
    {
        "name": "Bắc Kạn",
        "lat": 22.167,
        "lng": 105.833
    },
    {
        "name": "Cao Bằng",
        "lat": 22.667,
        "lng": 106
    },
    {
        "name": "Hà Giang",
        "lat": 22.75,
        "lng": 105
    },
    {
        "name": "Lạng Sơn",
        "lat": 21.75,
        "lng": 106.5
    },
    {
        "name": "Phú Thọ",
        "lat": 21.333,
        "lng": 105.167
    },
    {
        "name": "Quảng Ninh",
        "lat": 21.25,
        "lng": 107.333
    },
    {
        "name": "Thái Nguyên",
        "lat": 21.667,
        "lng": 105.833
    },
    {
        "name": "Tuyên Quang",
        "lat": 22.117,
        "lng": 105.25
    },
    {
        "name": "Lào Cai",
        "lat": 22.333,
        "lng": 104
    },
    {
        "name": "Yên Bái",
        "lat": 21.5,
        "lng": 104.667
    },
    {
        "name": "Điện Biên",
        "lat": 21.383,
        "lng": 103.017
    },
    {
        "name": "Hòa Bình",
        "lat": 20.333,
        "lng": 105.25
    },
    {
        "name": "Lai Châu",
        "lat": 22,
        "lng": 103
    },
    {
        "name": "Sơn La",
        "lat": 21.167,
        "lng": 104
    },
    {
        "name": "Bắc Ninh",
        "lat": 21.083,
        "lng": 106.167
    },
    {
        "name": "Hà Nam",
        "lat": 20.583,
        "lng": 106
    },
    {
        "name": "Hải Dương",
        "lat": 20.917,
        "lng": 106.333
    },
    {
        "name": "Hưng Yên",
        "lat": 20.833,
        "lng": 106.083
    },
    {
        "name": "Nam Định",
        "lat": 20.25,
        "lng": 106.25
    },
    {
        "name": "Ninh Bình",
        "lat": 20.25,
        "lng": 105.833
    },
    {
        "name": "Thái Bình",
        "lat": 20.5,
        "lng": 106.333
    },
    {
        "name": "Vĩnh Phúc",
        "lat": 21.3,
        "lng": 105.6
    },
    {
        "name": "Hà Nội",
        "lat": 21.02833,
        "lng": 105.85417
    },
    {
        "name": "Hải Phòng",
        "lat": 20.865139,
        "lng": 106.683833
    },
    {
        "name": "Hà Tĩnh",
        "lat": 18.333,
        "lng": 105.9
    },
    {
        "name": "Nghệ An",
        "lat": 19.333,
        "lng": 104.833
    },
    {
        "name": "Quảng Bình",
        "lat": 17.5,
        "lng": 106.333
    },
    {
        "name": "Quảng Trị",
        "lat": 16.75,
        "lng": 107
    },
    {
        "name": "Thanh Hóa",
        "lat": 20,
        "lng": 105.5
    },
    {
        "name": "Thừa Thiên-Huế",
        "lat": 16.333,
        "lng": 107.583
    },
    {
        "name": "Đắk Lắk",
        "lat": 12.667,
        "lng": 108.05
    },
    {
        "name": "Đắk Nông",
        "lat": 11.983,
        "lng": 107.7
    },
    {
        "name": "Gia Lai",
        "lat": 13.75,
        "lng": 108.25
    },
    {
        "name": "Kon Tum",
        "lat": 14.75,
        "lng": 107.917
    },
    {
        "name": "Lâm Đồng",
        "lat": 11.95,
        "lng": 108.433
    },
    {
        "name": "Bình Định",
        "lat": 14.167,
        "lng": 109
    },
    {
        "name": "Bình Thuận",
        "lat": 10.933,
        "lng": 108.1
    },
    {
        "name": "Khánh Hòa",
        "lat": 12.25,
        "lng": 109.2
    },
    {
        "name": "Ninh Thuận",
        "lat": 11.75,
        "lng": 108.833
    },
    {
        "name": "Phú Yên",
        "lat": 13.167,
        "lng": 109.167
    },
    {
        "name": "Quảng Nam",
        "lat": 15.58333,
        "lng": 107.91667
    },
    {
        "name": "Quảng Ngãi",
        "lat": 15,
        "lng": 108.667
    },
    {
        "name": "Đà Nẵng",
        "lat": 16.06944,
        "lng": 108.20972
    },
    {
        "name": "Bà Rịa-Vũng Tàu",
        "lat": 10.583,
        "lng": 107.25
    },
    {
        "name": "Bình Dương",
        "lat": 11.167,
        "lng": 106.667
    },
    {
        "name": "Bình Phước",
        "lat": 11.75,
        "lng": 106.917
    },
    {
        "name": "Đồng Nai",
        "lat": 11.117,
        "lng": 107.183
    },
    {
        "name": "Tây Ninh",
        "lat": 11.333,
        "lng": 106.167
    },
    {
        "name": "Hồ Chí Minh",
        "lat": 10.8,
        "lng": 106.65
    },
    {
        "name": "An Giang",
        "lat": 10.5,
        "lng": 105.167
    },
    {
        "name": "Bạc Liêu",
        "lat": 9.25,
        "lng": 105.75
    },
    {
        "name": "Bến Tre",
        "lat": 10.167,
        "lng": 106.5
    },
    {
        "name": "Cà Mau",
        "lat": 9.083,
        "lng": 105.083
    },
    {
        "name": "Đồng Tháp",
        "lat": 10.667,
        "lng": 105.667
    },
    {
        "name": "Hậu Giang",
        "lat": 9.783,
        "lng": 105.467
    },
    {
        "name": "Kiên Giang",
        "lat": 10,
        "lng": 105.167
    },
    {
        "name": "Long An",
        "lat": 10.667,
        "lng": 106.167
    },
    {
        "name": "Sóc Trăng",
        "lat": 9.667,
        "lng": 105.833
    },
    {
        "name": "Tiền Giang",
        "lat": 10.417,
        "lng": 106.167
    },
    {
        "name": "Trà Vinh",
        "lat": 9.833,
        "lng": 106.25
    },
    {
        "name": "Vĩnh Long",
        "lat": 10.167,
        "lng": 106
    },
    {
        "name": "Cần Thơ",
        "lat": 10.033,
        "lng": 105.783
    }
]
 ```

### Hiển thị trên bản đồ

Tôi sử dụng Leaflet và OpenStreetMap để hiển thị bản đồ. Ngoài ra tôi cũng dùng Vue để code gọn hơn. File `province_list.html` như sau:

 ```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bản đồ tỉnh thành phố</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>

<body>
    <div id="app"
        class="container-fluid">
        <div class="row">
            <div class="col-md-2">
                <div class="custom-scrollbar overflow-auto vh-100 pt-3">
                    <ul>
                        <li v-for="province in provinceList">
                            <a href=""
                                @click.prevent="chooseProvince(province)">{{province.name}}</a>
                        </li>
                    </ul>
                </div>
                
            </div>

            <div class="col-md-10 p-0">
                <div ref="mapContainer"
                    class="vh-100"></div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js"></script>
    
    <script src="js/script.js"></script>
</body>
</html>
 ```

File `js/script.js` như sau:

 ```javascript
async function getProvinceList() {
    const data = await fetch('data/provinceList.json').then(resp => resp.json());
    return data;
}


function initVue(provinceList) {
    new Vue({
        el: '#app',

        data() {
            return {
                provinceList,
                map: null
            };
        },

        mounted() {
            this.initMap();
            this.addMarkers();
        },

        methods: {
            initMap() {
                this.map = L.map(this.$refs.mapContainer, {
                    attributionControl: false,
                    center: [21.0819, 105.6363],
                    zoom: 8
                });

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
                    .addTo(this.map);
            },

            addMarkers() {
                this.provinceList.forEach(province => {
                    const latlng = L.latLng(province.lat, province.lng);
                    const marker = L.marker(latlng)
                        .addTo(this.map)
                        .bindPopup(province.name);
                    province.latlng = latlng;
                    province.marker = marker;
                });
            },

            chooseProvince(province) {
                this.map.panTo(province.latlng);
                province.marker.openPopup();
            }
        }
    });
}


async function main() {
    const provinceList = await getProvinceList();
    initVue(provinceList);
}

main();
 ```

Kết quả:

![](https://lockex1987.github.io/posts/project%20-%20vietnamese%20divisions/images/province_list.png)

[Demo](https://lockex1987.github.io/posts/project%20-%20vietnamese%20divisions/province_list.html)

Hy vọng bài viết này có thể giúp đỡ được bạn nào đó cũng được giao task tương tự.