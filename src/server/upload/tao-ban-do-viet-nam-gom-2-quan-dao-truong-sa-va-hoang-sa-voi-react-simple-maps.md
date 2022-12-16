Xin chào các bạn, lần đầu viết bài ở Viblo, nên có gì sai sót, mọi người góp ý để cải thiện.

Nhân ngày Quốc Khánh nước Việt Nam, mình xin chia sẻ với các bạn cách vẽ bản đồ Việt Nam với  2 quần đảo Hoàng Sa và Trường Sa với ReactJS, đồng thời khẳng định chủ quyền không thể tranh cãi với hai quần đảo Hoàng Sa và Trường Sa.

Ok. bắt đầu thôi nào.

# Setup

Để vẽ map ở ReactJS, thì mình sẽ sử dụng thư viện [react-simple-maps](https://www.react-simple-maps.io)

> [React Simple Maps](https://www.react-simple-maps.io)
> 
> Create beautiful SVG maps in react with d3-geo and topojson using a declarative api.

Mọi người hãy đọc qua doc của thư viện để biết cách sử dụng chi tiết nhé.

Để cho nhanh thì mình sẽ lấy luôn [1 ví dụ](https://www.react-simple-maps.io/examples/map-chart-with-tooltip/) ở trang Examples của nó. 

```javascript
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const MapChart = () => {
  return (
    <>
      <ComposableMap>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}

                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
```

Ok, ở ví dụ này thì nó đang hiển thị bản đồ thế giới. Và cái chúng ta cần là bản đồ Việt Nam.

Vậy thì chúng ta sẽ thay thế cái `geography` prop bằng bản đồ của chúng ta.

`geography` prop có thể là một `topojson` hoặc `geojson` object, hoặc đường dẫn tới `topojson` `geojson` object.  (`topojson` và `geoJson` là  2 kiểu định dạng chuyên để mã hóa nhiều loại cấu trúc dữ liệu địa lý)

Vậy, chúng ta sẽ cần file topojson của Vietnam.

# Lấy dữ liệu bản đồ Việt Nam + Hoàng Sa và Trường Sa

Để lấy dữ liệu bản đồ Việt Nam. Các bạn có thể truy cập vào trang [gadm.org](https://gadm.org/download_country_v3.html). GADM cung cấp bản đồ và dữ liệu không gian cho tất cả các quốc gia và các khu vực.

Tìm kiếm Việt Nam, và download `Shapefile`.

![Download bản đồ Việt Nam](https://images.viblo.asia/10c34a97-1ca3-450e-91a5-15bb47017644.jpg)

Ở GADM, thì dữ liệu trang web này ko bao gồm Hoàng Sa và Trường Sa ở bản đồ chính Việt Nam

Vì vậy, tiếp tục các bạn tìm thêm Paracel Islands (Hoàng Sa)  và Spratly Islands (Trường Sa) và tải Shapefile.

Khi tải xong bạn sẽ có 3 file:

1. gadm36_VNM_shp.zip 
2. gadm36_XPI_shp.zip
3. gadm36_XSP_shp.zip

# Chuyển đổi `shapefile` sang `topojson`

Bước tiếp theo, mình phải chuyển 3 shapefile thành topojson. Mình đã nghĩ rằng có thể chuyển đổi 3 `shapefile` thành 1 file `topojson` để hiển thị bằng `react-simple-maps`. Tuy nhiên hiện tại thì `react-simple-maps` không hỗ trợ multi-layer topojson. Các bạn có thể xem [issue](https://github.com/zcreativelabs/react-simple-maps/issues/164) ở đây 

Nhưng mà không sao, chúng ta vẫn có thể hiển thị 3 file `topojson`.

Để làm điều đó, các bạn lần lượt xử lý từng file zip đã download bằng cách:

### 1. Import zip file

 Truy cập vào trang [https://mapshaper.org/](https://mapshaper.org/), và import file zip vào 

![Import shapefile to mapshaper.org](https://images.viblo.asia/f9cd56ac-80b7-4840-a77b-61229aa48236.jpg)

### 2. Chọn layer 

Sau khi import thì các bạn sẽ thấy phần bản đồ hiện ra. 

Ở bản đồ Việt Nam thì các bạn sẽ thấy có những layers khác nhau, như là `VNM_0`, `VNM_1`, `VNM_2`. Số đuôi 1, 2, 3 tương ứng với level của các đơn vị hành chính. Ví dụ như ở Việt Nam thì 0 tương ứng với biên giới quốc gia, 1 là biên giới các tỉnh và thành phố trực thuộc trung ương...

Tùy vào nhu cầu sử dụng, các bạn có thể chọn level phù hợp. Ở đây mình chỉ cần hiển thị biên giới Việt Nam, nên mình sẽ chọn lớp `_0` và xóa những lớp khác.

![Select layer to export](https://images.viblo.asia/18c879aa-1a24-4c74-9a8e-772f714630a7.jpg)

### 3. Simplify (Điều chỉnh mức độ chi tiết của bản đồ)

Sau khi đã chọn layer, các bạn có thể chọn Simplify để điểu chỉnh mức độ chi tiết bản đồ (bằng cách kéo 1 slider). Bạn càng đơn giản hóa bản đồ thì kích thước file topojson càng gọn. Mình khuyên các bạn nên dùng Simplify để làm gọn bản đồ, vì thậm chí khi giảm 50% mức độ chi tiết,  chúng ta cũng khó có thể nhận ra sự khác biệt.

Ở đây, mình sẽ simplify bản đồ ở mức độ 3% cho lớp Việt Nam

![Simplify map](https://images.viblo.asia/ec64fd10-ebdc-42df-b2c2-c7ffdbb2ff84.jpg)

### 4. Export topojson

Sau khi đã Simplify, mình sẽ tiến hành export 3 layers theo định dang `topojson`

![Export topojson](https://images.viblo.asia/aa3254b7-1924-4f80-a356-c9b72721ad18.jpg)

Các bạn tiếp tục thực hiện bước 1 -  4 với 2 file zip còn lại (của quần đảo Hoàng Sa và Trường Sa). Lưu ý, là với 2 quần đào thì các bạn không nên Simplify hoặc Simplify ít thôi, vì các đảo rất nhỏ.

Khi hoàn thành, các bạn sẽ có 3 file `topojson`.

# Sử dụng file topojson

Như vậy thì chúng ta đã có 3 file json dành cho 3 khu vực. Và như mình đã nói thì đáng lẽ chỉ cần 1 file `topojson` gộp chung 3 layer nhưng `react-simple-maps` không hỗ trợ.

Nhưng cũng rất đơn giản chúng ta có thể sử dụng 3 component `Geographies` để hiển thị 3 khu vực sử dụng 3 file `topojson` đã export.

Để đơn giản thì mình upload 3 file json lên [gist.github.com](https://gist.github.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4).

```javascript
const vietnamGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_VNM_0.json";

const paracelIslandsGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_XPI_0.json";

const spralyIslandsGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_XSP_0.json";
```

Việc còn lại thì mình sẽ update code mình để hiển thị 3 khu vực bằng 3 `Geographies` component

```javascript
const vietnam = [vietnamGeoUrl, paracelIslandsGeoUrl, spralyIslandsGeoUrl];
const MapChart = () => {
  return (
    <ComposableMap
      style={{
        width: "100%",
        height: "auto"
      }}
    >
      <ZoomableGroup>
        {vietnam.map((geoUrl) => (
          <Geographies key={geoUrl} geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                />
              ));
            }
          </Geographies>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};

```

Và chúng ta có kết quả:

![Vietnam map](https://images.viblo.asia/8c809a75-41a3-489e-b6e9-92758b421f2a.jpg)

Oh. nhưng mà sao cảm giác bản đồ bị nghiêng nghiêng vậy cà? :o

# Map projection?

Lý do đó là do chúng ta đang sử dụng sai *projection* (phép chiếu bản đồ).  Phép chiếu bản đồ (projection) là cách để làm phẳng bề mặt địa cầu thành một mặt phẳng để tạo bản đồ.

Và có khá nhiều các phép chiếu khác nhau như  Equal Earth, Albers, Orthographic.... và mặc định thì `react-simple-maps` sử dụng Equal Earth projection. Và như chúng ta thấy trong trường hợp của Việt Nam thì có vẻ nó không đúng.

Sau khi mò mẫm qua một số projection khác nhau thì mình tìm thấy projection Mercator có vẻ là projection phù hợp nhất.  

![de.geoMercator](https://images.viblo.asia/88f53b56-7c18-4893-adb3-f4ae1a2116f2.png)

Ok, update code nào.

```javascript
const vietnam = [vietnamGeoUrl, paracelIslandGeoUrl, spralyIslandGeoUrl];
const MapChart = () => {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 1000,
        center: [105, 15] // coordinate of VietNam [long, lat]
      }}
      style={{
        width: "100%",
        height: "auto"
      }}
    >
      <ZoomableGroup>
        {vietnam.map((geoUrl) => (
          <Geographies key={geoUrl} geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                />
              ))
            }
          </Geographies>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};

```

Và TADA, kết quả.!

![Bản đồ Việt Nam hoàn chỉnh](https://images.viblo.asia/ea25c40b-5896-4b11-a3ea-cdb1f0430b70.jpg)

Vậy là chúng ta đã có một bản đồ Việt Nam hoàn chỉnh bao gồm cả Hoàng Sa Trường Sa.

Mình cũng xin kết thúc bài chia sẻ tại đây. Cảm ơn mọi người đã dành thời gian đọc. :) Nếu có sai sót gì vẫn mong mọi người phản hồi ở phần bình luận. :)

Đây là source code của mình. Mọi người có thể tham khảo: [vietnam-map Codesandbox](https://codesandbox.io/s/vietnam-paracel-spralty-islands-p273t?fontsize=14&hidenavigation=1&theme=dark)

# References
* [React-simple-maps](https://www.react-simple-maps.io/docs/getting-started/)

* [Convert and prepare TopoJSON files for interactive mapping with d3](https://medium.com/hackernoon/how-to-convert-and-prepare-topojson-files-for-interactive-mapping-with-d3-499cf0ced5f)

* [Geo Projections - D3 Wiki](https://d3-wiki.readthedocs.io/zh_CN/master/Geo-Projections/)