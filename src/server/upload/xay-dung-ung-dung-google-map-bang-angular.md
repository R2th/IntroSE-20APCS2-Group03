Bắt tay vào làm luôn nhỉ ?? :D ??

# AGM library

Đây là thư viện chính mà chúng ta sẽ sử dụng. Thư viện chính trong AGM là thư viện `@agm/core`. `@agm/core` chứa các giải pháp cho API JavaScript của Google Maps.
Để sử dụng điều này, trước tiên chúng ta sẽ dựng một project Angular:

```
ng new ng-maps
```

Bây giờ, chúng ta cài đặt thư viện `@agm/core`:

```
npm i @agm/core
```

Chúng ta cần một component, nơi chúng ta có thể hiển thị bản đồ, để làm điều đó, chúng ta tạo ra một component:

```
g c map
```

Lệnh trên sẽ tạo `map.component.ts` trong thư mục `src/app/map/`.

Chúng ta cần import `AgmModule` trong `AppModule` của chúng ta

```Typescript
...
import { AgmCoreModule } from '@agm/core';

@NgModule({
    declarations: [
        AppComponent,
        MapComponent
    ],
    imports: [
        BrowserModule,
        AgmCoreModule.forRoot({
            apiKey: "xxx",
            libraries: ["places", "geometry"]
        })
    ],
    providers: [
        ...
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

AgmModule đã được import, và chúng ta cần 1 Gmaps key, truy cập [console.developers.google.com](https://console.developers.google.com/?pli=1) để lấy key.

Để hiển thị bản đồ, chúng ta mở `map.component.ts` của thêm cái này:

```Typescript
// map.component.ts
@Component({
    ...
})
export class MapComponent {}
```

Tạo 1 file html với tên `map.component.html` để hiển thị map:
```html
<!-- map.component.html -->
<agm-map></agm-map>
```


Chạy `ng serve`, là chúng ta  thấy nó gg map trên trình duyệt rồi.

Thẻ `agm-map` được sử dụng để hiển thị Google Maps trên các thành phần của chúng ta. Nó có đầu vào và đầu ra mà chúng ta sẽ thấy trong các phần dưới đây.

# Hiển thị điểm có Vĩ độ và Kinh độ cho trước

Đoạn mã phía trên không có gì ngoài hiển thị bản đồ. Vậy hãy làm cho nó hiển thị một vị trí có vĩ độ, kinh độ cho trước.

```html
<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude"></agm-map>
```

```Typescript
// map.component.ts
@Component({
    ...
})
export class MapComponent implements OnInit{
    location: Location

    ngOnInit() {
        this.location = {
            latitude: -28.68352,
            longitude: -147.20785
        }
    }
}

interface Location {
    latitude: number;
    longitude: number
}
```

# Map Type

Google Maps có các tùy chọn về chế độ xem bản đồ được hiển thị.

*street view*:  Điều này sẽ hiển thị các đường phố ngang tầm mắt, chúng ta có thể điều hướng / đi bộ trên đường phố bằng các nút mũi tên

*satellite*: Hiển thị map như cách được nhìn thấy bởi một vệ tinh.

*normal*: Bản đồ mặc định cho chúng ta thấy bởi Google.

```html

<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude" [mapTypeId]="location.mapType"></agm-map>
```

```Typescript
// map.component.ts
@Component({
    ...
})
export class MapComponent implements OnInit{
    location: Location

    ngOnInit() {
        this.location = {
            latitude: -28.68352,
            longitude: -147.20785,
            mapType: "satelite"
        }
    }
}

interface Location {
    latitude: number;
    longitude: number;
    mapType: ?string;
}
```

# Zoom

`agm-map` có một tùy chọn để phóng to hoặc thu nhỏ trong chế độ xem bản đồ. Chúng ta sử dụng đầu vào [zoom] để thực hiện điều đó.

```html
<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude" [mapTypeId]="location.mapType" [zoom]="location.zoom"></agm-map>
```

```Typescript
// map.component.ts
@Component({
    ...
})
export class MapComponent implements OnInit{
    location: Location

    ngOnInit() {
        this.location = {
            latitude: -28.68352,
            longitude: -147.20785,
            mapType: "satelite",
            zoom: 5
        }
    }
}

interface Location {
    latitude: number;
    longitude: number;
    mapType: ?string;
    zoom: ?number;
}
```

Tỷ lệ zoom chúng ta dùng là 5.
Có các loại tỷ lệ:

* 1: World
* 5: Landmass/continent
* 10: City
* 15: Streets
* 20: Buildings

# Hiển thị marker

Để đặt marker trên bản đồ giúp hiển thị vị trí chính xác, chúng ta sẽ sử dụng `agm-marker`.

```html
<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude" [mapTypeId]="location.mapType" [zoom]="location.zoom" (mapClick)="addMarker($event.coords.lat, $event.coords.lng)">
    <agm-marker [latitude]="location.marker.lat" [longitude]="location.marker.lng"></agm-marker>
</agm-map>
```

```Typescript
// map.component.ts
@Component({
    ...
})
export class MapComponent implements OnInit{
    location: Location

    ngOnInit() {
        this.location = {
            latitude: -28.68352,
            longitude: -147.20785,
            mapType: "satelite",
            zoom: 5,
            marker: {
                lat: -28.68352,
                lng: -147.20785
            }
        }
    }
}

interface Marker {
    lat: number;
    lng: number;
}

interface Location {
    latitude: number;
    longitude: number;
    mapType: ?string;
    zoom: ?number;
    marker: Marker;
}
```

Một marker sẽ được đặt chính xác tại tọa độ (-28.68352,-147.20785).

# Thêm marker 

```html
<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude" [mapTypeId]="location.mapType" [zoom]="location.zoom" (mapClick)="addMarker($event.coords.lat, $event.coords.lng)">
    <agm-marker *ngFor="let marker of location.markers" [latitude]="marker.lat" [longitude]="marker.lng"></agm-marker>
</agm-map>

```

```Typescript
// map.component.ts
@Component({
    ...
})
export class MapComponent implements OnInit{
    location: Location

    ngOnInit() {
        this.location = {
            latitude: -28.68352,
            longitude: -147.20785,
            mapType: "satelite",
            zoom: 5,
            markers: [
                {
                    lat: -28.68352,
                    lng: -147.20785
                }
            ]
        }
    }

    addMarker(lat: number, lng: number) {
        this.location.markers.push({
            lat,
            lng
        })
    }
}

interface Marker {
    lat: number;
    lng: number;
}

interface Location {
    latitude: number;
    longitude: number;
    mapType: ?string;
    zoom: ?number;
    markers: Array<Marker>;
}
```

Trong ví dụ này, khi người dùng nhấp vào bản đồ, nó sẽ thêm một marker mới vào bản đồ. Chúng ta giữ các marker trong một mảng, `agm-marker` lặp lại trên mảng và đặt chúng trên bản đồ. Khi chúng ta nhấp vào bản đồ, một marker mới sẽ được đẩy đến mảng `marker`. Một marker sẽ xuất hiện trên vị trí được nhấp.

# Chọn marker

```html
<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude" [mapTypeId]="location.mapType" [zoom]="location.zoom" (mapClick)="addMarker($event.coords.lat, $event.coords.lng)">
    <agm-marker *ngFor="let marker of location.markers" [latitude]="marker.lat" [longitude]="marker.lng" (markerClick)="selectMarker($event)"></agm-marker>
</agm-map>
<div>
    Selected Marker is: Longitude {{selectedMarker.lat}} Latitude {{selectedMarker.lng}}
</div>
```

```Typescript
// map.component.ts
@Component({
    ...
})
export class MapComponent implements OnInit{
    location: Location
    selectedMarker: Marker

    ngOnInit() {
        this.location = {
            latitude: -28.68352,
            longitude: -147.20785,
            mapType: "satelite",
            zoom: 5,
            markers: [
                {
                    lat: -28.68352,
                    lng: -147.20785
                }
            ]
        }
    }

    addMarker(lat: number, lng: number) {
        this.location.markers.push({
            lat,
            lng
        })
    }

    selectMarker(event) {
        this.selectedMarker = {
            lat: event.latitude,
            lng: event.longitude
        }
    }
}

interface Marker {
    lat: number;
    lng: number;
}

interface Location {
    latitude: number;
    longitude: number;
    mapType: ?string;
    zoom: ?number;
    markers: Array<Marker>;
}
```

# Di chuyển marker

Chúng ta có thể chọn marker và di chuyển nó

```html
<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude" [mapTypeId]="location.mapType" [zoom]="location.zoom" (mapClick)="addMarker($event.coords.lat, $event.coords.lng)">
    <agm-marker 
    *ngFor="let marker of location.markers" [latitude]="marker.lat" 
    [longitude]="marker.lng" 
    (markerClick)="selectMarker($event)"     [markerDraggable]="true"
    (dragEnd)="markerDragEnd(coords, $event)"
></agm-marker>
</agm-map>
<div>
    Selected Marker is: Longitude {{selectedMarker.lat}} Latitude {{selectedMarker.lng}}
</div>
```

```Typescript
// map.component.ts
@Component({
    ...
})
export class MapComponent implements OnInit{
    location: Location
    selectedMarker: Marker

    ngOnInit() {
        this.location = {
            latitude: -28.68352,
            longitude: -147.20785,
            mapType: "satelite",
            zoom: 5,
            markers: [
                {
                    lat: -28.68352,
                    lng: -147.20785
                }
            ]
        }
    }

    addMarker(lat: number, lng: number) {
        this.location.markers.push({
            lat,
            lng
        })
    }

    selectMarker(event) {
        this.selectedMarker = {
            lat: event.latitude,
            lng: event.longitude
        }
    }

    markerDragEnd(coords: any, $event: MouseEvent) {
        this.location.latitude = coords.latitude
        this.location.longitude = coodrs.longitude
    }
}

interface Marker {
    lat: number;
    lng: number;
}

interface Location {
    latitude: number;
    longitude: number;
    mapType: ?string;
    zoom: ?number;
    markers: Array<Marker>;
}
```

Chúng ta sử dụng `[MarkerDraggable] = "true"` để làm cho marker có thể kéo được. Sau đó, chúng ta có sự kiện `(dragEnd) = "MarkerDragEnd (coords, $ event)"`, sự kiện này được kích hoạt khi người dùng ngừng kéo marker

# Đặt tên cho marker
Chúng ta có thể gắn nhãn cho marker, tức là đính kèm tên hoặc mô tả vào marker. Nó sẽ là một tên lơ lửng phía trên marker

```html
<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude" [mapTypeId]="location.mapType" [zoom]="location.zoom" (mapClick)="addMarker($event.coords.lat, $event.coords.lng)">
    <agm-marker 
    *ngFor="let marker of location.markers" [latitude]="marker.lat" 
    [longitude]="marker.lng" 
    (markerClick)="selectMarker($event)"     [markerDraggable]="true"
    (dragEnd)="markerDragEnd(coords, $event)"
    [label]="marker.label"
></agm-marker>
</agm-map>
<div>
    Selected Marker is: Longitude {{selectedMarker.lat}} Latitude {{selectedMarker.lng}}
</div>
```

```Typescript
// map.component.ts
@Component({
    ...
})
export class MapComponent implements OnInit{
    location: Location
    selectedMarker: Marker

    ngOnInit() {
        this.location = {
            latitude: -28.68352,
            longitude: -147.20785,
            mapType: "satelite",
            zoom: 5,
            markers: [
                {
                    lat: -28.68352,
                    lng: -147.20785,
                    label: "new york"
                }
            ]
        }
    }

    addMarker(lat: number, lng: number) {
        this.location.markers.push({
            lat,
            lng,
            label: Date.now().toLocaleString()
        })
    }
    ...
}

interface Marker {
    lat: number;
    lng: number;
    label: string;
}

interface Location {
    latitude: number;
    longitude: number;
    mapType: ?string;
    zoom: ?number;
    markers: Array<Marker>;
}
```

Chúng ta đã sử dụng đầu vào `[label]` để thêm nhãn vào marker. Chúng ta đã thêm một thuộc `label` vào interface Marker, vì vậy chúng ta đã thay đổi cdoe của mình để có thể thêm mới. Điểm đánh dấu đầu tiên của chúng ta sẽ hiển thị chữ `new york` phía trên marker, những cái khác sẽ có ngày nó được tạo.
Bây giờ, thật tuyệt nếu các marker hiển thị đúng tên của tọa độ. Chúng ta dùng geocoding:

Chúng ta cần cài đặt thư viện `googlemaps`:

```
npm i googlemaps
```

Import nó vào `MapComponent` và khai báo biến `google`:

```Typescript
import {} from "googlemaps"
declare var google: any;
...
```

Và giờ:

```html
<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude" [mapTypeId]="location.mapType" [zoom]="location.zoom" (mapClick)="addMarker($event.coords.lat, $event.coords.lng)">
    <agm-marker 
    *ngFor="let marker of location.markers" [latitude]="marker.lat" 
    [longitude]="marker.lng" 
    (markerClick)="selectMarker($event)"     [markerDraggable]="true"
    (dragEnd)="markerDragEnd(coords, $event)"
    [label]="marker.label"
></agm-marker>
</agm-map>
<div>
    Selected Marker is: Longitude {{selectedMarker.lat}} Latitude {{selectedMarker.lng}}
</div>
```

```Typescript
// map.component.ts
...
@Component({
    ...
})
export class MapComponent implements OnInit {
    location: Location
    selectedMarker: Marker

    ngOnInit() {
        this.location = {
            latitude: -28.68352,
            longitude: -147.20785,
            mapType: "satelite",
            zoom: 5,
            markers: [
                {
                    lat: -28.68352,
                    lng: -147.20785,
                    label: this.getAddress(-28.68352, -147.20785)
                }
            ]
        }
    }

    addMarker(lat: number, lng: number) {
        this.location.markers.push({
            lat,
            lng,
            label: this.getAddress(lat, lng)
        })
    }

  getAddress(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    const request: google.maps.GeocoderRequest = {
      location: latlng
    };
    geocoder.geocode(request, (results, status) => {
      this.ngZone.run(() => {
        const address = results[0].formatted_address;
        return address
      });
    });
  }    
    ...
}

interface Marker {
    lat: number;
    lng: number;
    label: string;
}

interface Location {
    latitude: number;
    longitude: number;
    mapType: ?string;
    zoom: ?number;
    markers: Array<Marker>;
}
```

# Hiển thị tọa độ hiện tại của chúng ta
```html
<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude" [mapTypeId]="location.mapType" [zoom]="location.zoom" (mapClick)="addMarker($event.coords.lat, $event.coords.lng)">
    <agm-marker 
    *ngFor="let marker of location.markers" [latitude]="marker.lat" 
    [longitude]="marker.lng" 
    (markerClick)="selectMarker($event)"     [markerDraggable]="true"
    (dragEnd)="markerDragEnd(coords, $event)"
    [label]="marker.label"
></agm-marker>
</agm-map>
<div>
    Selected Marker is: Longitude {{selectedMarker.lat}} Latitude {{selectedMarker.lng}}
</div>
```

```Typescript
// map.component.ts
...
@Component({
    ...
})
export class MapComponent implements OnInit {
    location: Location
    selectedMarker: Marker

    ngOnInit() {
        this.setCurrentPosition()
    }

    addMarker(lat: number, lng: number) {
        this.location.markers.push({
            lat,
            lng,
            label: this.getAddress(lat, lng)
        })
    }
    setCurrentPosition() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position
            this.location = {
                latitude,
                longitude,
                mapType: "satelite",
                zoom: 14,
                markers: [
                    {
                        lat: longitude,
                        lng: latitude,
                        label: "My current position"
                    }
                ]
            }
        });
        } else {
        alert("Geolocation is not supported by this browser, please use google chrome.");
        }
    }
    ...
}

interface Marker {
    lat: number;
    lng: number;
    label: string;
}

interface Location {
    latitude: number;
    longitude: number;
    mapType: ?string;
    zoom: ?number;
    markers: ?Array<Marker>;
}
```

Bây giờ, chúng ta đã đặt component để hiển thị vị trí hiện tại của chúng ta trên bản đồ khi được tải. Chúng ta đã làm nó như thế nào? Đơn giản, chúng ta đã sử dụng đối tượng điều hướng. Trình điều hướng có một đối tượng định vị địa lý mà chúng ta sử dụng để gọi hàm `getCienPocation()`, hàm này chấp nhận một hàm gọi lại mà nó gọi với đối tượng vị trí. Xem chức năng gọi lại của chúng ta sẽ nhận được vị trí trong tham số `position`.

# Chỉ đường

Chúng ta có thể vẽ hướng trên bản đồ. Chúng ta làm với sự giúp đỡ của `agm-direction`

```
npm i agm-direction
```

Import modul

```Typescript
// app.module.ts
...
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  ...
  imports: [
    ...
    AgmDirectionModule
  ]
})
export class AppModule { }
```

Và 
```html
<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude" [mapTypeId]="location.mapType" [zoom]="location.zoom" (mapClick)="addMarker($event.coords.lat, $event.coords.lng)">
    <!-- ... -->
    <agm-direction 
        [origin]="origin" 
        [destination]="destination"
    ></agm-direction>
</agm-map>
<!-- ... -->
```

```Typescript
// map.component.ts
...
@Component({
    ...
})
export class MapComponent implements OnInit {
    ...
    origin: any;
    destination: any;

    ngOnInit() {
        this.origin = { 
            lat: 24.799448, 
            lng: 120.979021 
        };
        this.destination = { 
            lat: 24.799524, 
            lng: 120.975017 
        };
    }
    ...
}
...
```

# Tính toán khoảng cách giữa các điểm
```html
<!-- map.component.html -->
<agm-map [latitude]="location.latitude" [longitude]="location.longitude" [mapTypeId]="location.mapType" [zoom]="location.zoom" (mapClick)="addMarker($event.coords.lat, $event.coords.lng)">
    <!-- ... -->
    <agm-direction 
        [origin]="origin" 
        [destination]="destination"
    ></agm-direction>
</agm-map>
<div>
    Distance: {{distance}}
</div>
<!-- ... -->
```

```Typescript
// map.component.ts
...
@Component({
    ...
})
export class MapComponent implements OnInit {
    ...
    origin: any;
    destination: any;
    distance: Number;

    ngOnInit() {
        this.origin = { 
            lat: 24.799448, 
            lng: 120.979021 
        };
        this.destination = { 
            lat: 24.799524, 
            lng: 120.975017 
        };
        this.distance = this.calculatedistance(this.origin, this.destination)
    }

    // calculate the distances from point1 to point2
    calculateDistance(point1, point2) {
        const p1 = new google.maps.LatLng(
        point1.lat,
        point1.lng
        );
        const p2 = new google.maps.LatLng(
        point2.lat,
        point2.lng
        );
        return (
        google.maps.geometry.spherical.computeDistanceBetween(p1, p2)/1000
        ).toFixed(2);
    }
    ...
}
...
```

Chúng ta có một method `calculateDistance` tính toán chính xác tính khoảng cách giữa hai điểm được truyền vào. Chúng ta xây dựng các đối tượng LatLng của hai điểm và chuyển nó tới `google.maps.geometry.spherical.computeDistanceBetween(...)`. Nó sẽ trả về khoảng cách giữa hai điểm


# Kết luận
Mong rằng, qua ví dụ bạn có thể áp dụng Google Maps trong Angular.
Sẽ còn nhiều hơn nữa để tìm hiểu. Nhiều đầu vào và đầu ra trong `agm-circle`, `agm-rectangle`, `agm-info`, `agm-marker`, `agm-direction` và `agm-map`. Nếu có thời gian, chúng ta sẽ cùng tìm hiểu tiếp

Via [https://blog.bitsrc.io](https://blog.bitsrc.io)