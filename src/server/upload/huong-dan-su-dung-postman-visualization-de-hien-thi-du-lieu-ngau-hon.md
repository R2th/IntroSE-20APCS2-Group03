Bình thường, anh em vẫn dùng postman để test API.
Đối với dữ liệu trả về có một vài field ngắn và ít record thì không thành vấn đề.

Nhưng đối với dữ liệu dài dài cỡ vài trăm record, trong khi chúng ta chỉ cần lấy 1 số field nhất định của từng record như id, name, price thì thật mất công scroll để đọc.

Sử dụng tính năng visualization thì anh em hoàn toàn có thể custom response, chỉ hiển thị những thứ cần hiển thị, giúp năng suất làm việc tăng cao hơn.

## Cơ chế hoạt động

Khi bạn gửi 1 request ở postman, flow hoạt động sẽ như sau:
![Flow](https://minhphong306.files.wordpress.com/2020/05/selection_019.jpg)

Postman cung cấp cơ chế thay đổi hiển thị của dữ liệu (visualize data) thông qua template được set ở step test (step cuối trong hình trên).
Template là một chuỗi HTML, sử dụng cú pháp của handlebar để truyền biến vào.

Ví dụ tớ có API trả về dữ liệu như thế này

```
{
  "singers": [
    {
      "id": 1,
      "name": "Sơn Tùng M-TP",
      "hot_songs": [
        "Hãy trao cho anh",
        "Lạc trôi",
        "Không phải dạng vừa đâu",
        "Cơn mưa ngang qua"
      ]
    },
    {
      "id": 2,
      "name": "Mr. Siro",
      "hot_songs": [
        "Lắng nghe nước mắt",
        "Một bước yêu vạn dặm đau"
      ]
    },
    {
      "id": 3,
      "name": "Bích Phương",
      "hot_songs": [
        "Có khi nào rời xa",
        "Đi đu đưa đi",
        "Bao giờ lấy chồng"
      ]
    }
  ],
  "total": 3,
  "total_song": 9
}
```

Giờ tớ muốn hiển thị danh sách trên ra dạng bảng thì làm như sau:

Bước 1: Lấy response trả về, lưu vào 1 biến

Bước 2: Viết template dữ liệu dạng bảng

Bước 3: Gọi hàm `pm.visualizer.set(template, objectData)` để postman biên dịch template và hiển thị dữ liệu ngoài tab visualize.

Để đơn giản thì tớ sẽ fake luôn cái response vào object, url để là google.com luôn như hình dưới. Bạn thay tương ứng bằng API cần test, và dùng hàm pm.response.json() để lấy ra dữ liệu dạng json nhé

![Flow](https://minhphong306.files.wordpress.com/2020/05/postman_visualization.jpg)

Full code của đoạn tests script trên:

```
// Bước 1: lưu data cần visualize vào 1 object
// Lấy json response từ API: var objectData = pm.response.json()
var objectData = {"singers":[{"id":1,"name":"Sơn Tùng M-TP","hot_songs":["Hãy trao cho anh","Lạc trôi","Không phải dạng vừa đâu","Cơn mưa ngang qua"]},{"id":2,"name":"Mr. Siro","hot_songs":["Lắng nghe nước mắt","Một bước yêu vạn dặm đau"]},{"id":3,"name":"Bích Phương","hot_songs":["Có khi nào rời xa","Đi đu đưa đi","Bao giờ lấy chồng"]}],"total":3,"total_song":9}

// Bước 2: Tạo template
var template = `<div>
    <p>- Tổng số ca sĩ: {{total}}</p>
    <p>- Tổng số bài hát: {{total_song}}</p>
</div>
<table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Hot songs</th>
    </tr>
    </thead>
    <tbody>
    {{#each singers}}
    <tr>
        <td>{{id}}</td>
        <td>{{name}}</td>
        <td>
            {{#each this.hot_songs}}
            <span>{{this}}, </span>
            {{/each}}
        </td>
    </tr>
    {{/each}}
    </tbody>
</table>`

// Bước 3: Set template
pm.visualizer.set(template, objectData)
```

Cú pháp sử dụng của handlebar khá đơn giản, anh em có thể tham khảo thêm ở đây:

https://handlebarsjs.com/guide/

## Hiển thị dữ liệu dạng biểu đồ
Anh em cũng có thể sử dụng các loại biểu đồ để hiển thị dữ liệu cho trực quan hơn.

Ở ví dụ dưới đây, tớ dùng API https://covidapi.info/api/v1/country/VNM để lấy dữ liệu số ca nhiễm, hồi phục và số ca chết bởi dịch corona ở Việt Nam; sau đó dùng thư viện chartjs để hiển thị dạng biểu đồ đường

```
// Bước 1: Lấy data từ response
var response = pm.response.json()

// Bước 2: Thêm vào title để set trong template
var objectData = {
    title: `Biểu đồ dịch COVID-19 ở Việt Nam`,
    response: response
}

// Bước 3: Tạo template sử dụng chartjs
var template = `
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    <canvas id="myChart"></canvas>
    <script>
        pm.getData( function (error, data) {
        console.log(data.response.result)
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',
            
                // The data for our dataset
                data: {
                    labels: Object.entries(data.response.result).map( (item) => item[0]),
                    datasets: [{
                        label: data.title,
                        backgroundColor: 'rgb(255, 20, 147)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: Object.entries(data.response.result).map( (item) => item[1].confirmed)
                    }]
                },
            
                // Configuration options go here
                options: {}
            });
        });
    </script>
`;

// Bước 4: Set template
pm.visualizer.set(template, objectData);
```

Chạy thử thì được kết quả như sau

![Flow](https://minhphong306.files.wordpress.com/2020/05/postman_visualize_using_chartjs.jpg)

Anh em có thể thắc mắc đoạn script tớ có dùng 1 hàm để wrap lại như này:

```
pm.getData(function (error, data) {
    // Code ...
});
```

Đây là cú pháp postman yêu cầu sử dụng khi truyền dữ liệu vào trong thẻ script (nghĩa là nếu trong template có dùng cặp thẻ `<script></script>` thì cần dùng hàm trên wrap lại thì mới truy cập được vào dữ liệu của postman)

Ngoài chartjs ra, anh em hoàn toàn có thể custom màu mè theo ý thích và sự sáng tạo của riêng mình.

## Tham khảo
- https://learning.postman.com/docs/postman/sending-api-requests/visualizer/
- https://handlebarsjs.com/guide/
- https://www.youtube.com/watch?v=5K952EUbUDo&list=PL6yYBvW22vbqiyhb_U-RWfxuZNv0DKBP8&index=6
- 

Nếu trong bài có gì sai sót, chưa tối ưu hoặc nên bổ sung thêm gì đó, hãy comment cho tớ biết nhé ^^

Thanks for reading ^^

Nguồn bài viết từ blog của tớ: https://minhphong306.wordpress.com/2020/05/24/huong-dan-su-dung-postman-visualization/