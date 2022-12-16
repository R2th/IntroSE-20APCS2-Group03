Xin chào !

Thông thường chúng ta cần lưu địa chỉ trong cơ sở dữ liệu và chúng ta muốn biết con đường để tới đó như thế nào. Bài viết này sẽ giúp các bạn xây dựng một công cụ chọn vị trí của Google với API Google Maps.
# Bước 1: Tạo database và model
đầu tiên chúng ta tạo một migration với nội dung như sau:
```php
Schema::create('companies', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->string('address_address')->nullable();
    $table->double('address_latitude')->nullable();
    $table->double('address_longitude')->nullable();
    $table->timestamps();
});
```
Tiếp theo là model `app/Company.php`:

```php
class Company extends Model
{
    protected $fillable = [
        'name',
        'address_address',
        'address_latitude',
        'address_longitude',
    ];
  }
```

Chúng ta cần thêm một controller để điều hướng trong `CompaniesController` như sau:
```php
public function store(StoreCompanyRequest $request)
{
    abort_unless(\Gate::allows('company_create'), 403);
    $company = Company::create($request->all());
    return redirect()->route('admin.companies.index');
}
```
Xong, về cơ bản những bước đơn giản này thì chúng ta không mất nhiều thời gian cho lắm.

# Bước 2: Chuẩn bị Google Maps API
Để sử dụng Google Maps API bạn cần tạo một ứng dụng trong Google Developer Console và kích hoạt một loạt các API liên quan.

Không chỉ vậy, vào tháng 6 năm 2018 Google đã thay đổi cách sử dụng và giá API của Maps. Về cơ bản, bạn có thể sử dụng Google API mà không cần bật hóa đơn trong Bảng điều khiển dành cho nhà phát triển của Google. 

Chúng ta cần get api key [tại đây](https://developers.google.com/maps/documentation/javascript/get-api-key)

Không chỉ vậy, vào tháng 6 năm 2018 [Google đã thay đổi cách sử dụng và giá API của Maps](https://cloud.google.com/maps-platform/pricing/sheet/). Chi tiết tại đây, và hãy cẩn thận vì bạn cần thẻ tín dụng đó. Lơ ngơ bay ngay một số tiền lớn =)).

![](https://images.viblo.asia/1da91278-197c-4b06-93fa-5897ec50b546.png)

ví dụ trên đây là các API của google map. nhưng bạn chỉ cần những thứ dưới đây:
* Maps JavaScript API: để hiển thị bản đồ

* Places API for Web: tự động hiển thị địa chỉ

* Geocoding API: truy vấn vĩ độ và kinh độ theo địa chỉ.

Bây giờ, bạn sẽ nhận được khóa API của mình, đây sẽ là chìa khóa cho tất cả những điều này. Chúng ta đặt nó trong tập tin .env dự án Laravel:

`GOOGLE_MAPS_API_KEY=AIzaSyBi2dVBkdQSUcV8_uwwa**************`

# Bước 3: Điền địa chỉ / tọa độ trong JavaScript
Chúng ta tạo một blade `resources/views/companies/create.blade.php` code như sau:
```html
div class="form-group">
    <label for="address_address">Address</label>
    <input type="text" id="address-input" name="address_address" class="form-control map-input">
    <input type="hidden" name="address_latitude" id="address-latitude" value="0" />
    <input type="hidden" name="address_longitude" id="address-longitude" value="0" />
</div>
<div id="address-map-container" style="width:100%;height:400px; ">
    <div style="width: 100%; height: 100%" id="address-map"></div>
</div>
```

Phần cuối của file blade sẽ thêm như sau:
```js
@section('scripts')
    @parent
    <script src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAPS_API_KEY') }}&libraries=places&callback=initialize" async defer></script>
    <script src="/js/mapInput.js"></script>
@stop
```

Hãy nhớ rằng chúng taã thêm khóa API của mình vào tệp .env? Đây là nơi chúng ta sử dụng nó và cần
@yield(‘scripts’) nữa nhé.

Cuối cùng chúng ta cần thêm `public/js/mapInput.js` nó sẽ như thế này:
```js
function initialize() {

    $('form').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });
    const locationInputs = document.getElementsByClassName("map-input");

    const autocompletes = [];
    const geocoder = new google.maps.Geocoder;
    for (let i = 0; i < locationInputs.length; i++) {

        const input = locationInputs[i];
        const fieldKey = input.id.replace("-input", "");
        const isEdit = document.getElementById(fieldKey + "-latitude").value != '' && document.getElementById(fieldKey + "-longitude").value != '';

        const latitude = parseFloat(document.getElementById(fieldKey + "-latitude").value) || -33.8688;
        const longitude = parseFloat(document.getElementById(fieldKey + "-longitude").value) || 151.2195;

        const map = new google.maps.Map(document.getElementById(fieldKey + '-map'), {
            center: {lat: latitude, lng: longitude},
            zoom: 13
        });
        const marker = new google.maps.Marker({
            map: map,
            position: {lat: latitude, lng: longitude},
        });

        marker.setVisible(isEdit);

        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.key = fieldKey;
        autocompletes.push({input: input, map: map, marker: marker, autocomplete: autocomplete});
    }

    for (let i = 0; i < autocompletes.length; i++) {
        const input = autocompletes[i].input;
        const autocomplete = autocompletes[i].autocomplete;
        const map = autocompletes[i].map;
        const marker = autocompletes[i].marker;

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            marker.setVisible(false);
            const place = autocomplete.getPlace();

            geocoder.geocode({'placeId': place.place_id}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    const lat = results[0].geometry.location.lat();
                    const lng = results[0].geometry.location.lng();
                    setLocationCoordinates(autocomplete.key, lat, lng);
                }
            });

            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                input.value = "";
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

        });
    }
}

function setLocationCoordinates(key, lat, lng) {
    const latitudeField = document.getElementById(key + "-" + "latitude");
    const longitudeField = document.getElementById(key + "-" + "longitude");
    latitudeField.value = lat;
    longitudeField.value = lng;
```

Phần này tải bản đồ và đặt điểm đánh dấu trung tâm:
```js
const map = new google.maps.Map(document.getElementById(fieldKey + '-map'), {
            center: {lat: latitude, lng: longitude},
            zoom: 13
        });
const marker = new google.maps.Marker({
    map: map,
    position: {lat: latitude, lng: longitude},
});
```
Đoạn này xử lý việc tự động hoàn thành địa chỉ.
```js
const autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.key = fieldKey;
autocompletes.push({input: input, map: map, marker: marker, autocomplete: autocomplete});
```

Cuối cùng truy vấn cho vĩ độ và kinh độ:
```js
geocoder.geocode({'placeId': place.place_id}, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {

        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        setLocationCoordinates(autocomplete.key, lat, lng);
    }
});
```

Xong !!!!

Chúc các bạn hoàn thành =)).
# Tài liệu tham khảo
* https://developers.google.com/maps/documentation/javascript/tutorial