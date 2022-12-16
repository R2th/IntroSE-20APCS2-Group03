### Giới thiệu
Hiện nay các website quản lý càng trở nên phong phú và đa dạng nên việc thống kê quản lý và báo cáo là điều khá phổ biến. Để việc thống kê dữ liệu trở nên trực quan hơn thì biểu đồ là một trong những công cụ hỗ trợ tuyệt vời. Biểu đồ là gì? Ưu điểm của việc biểu diễn dữ liệu bằng biểu đồ là gì?

Biểu đồ là hình vẽ biểu diễn các số liệu, thường dùng để so sánh nhận ra sự khác biệt và biết được cụ thể tỷ lệ của từng thành phần so với tổng thể.

Ưu điểm của việc biểu diễn dữ liệu bằng biểu đồ là giúp dễ dàng so sánh dữ liệu đưa ra dự đoán xu thế tăng giảm của các số liệu.

Có rất nhiều loại biểu đồ khác nhau và việc vẽ các biểu đồ này trên website rất dễ dàng bởi vì hiện nay đã có rất nhiều thư viện hỗ trợ như  `ChartJS`, `Google Charts`, `Highcharts JS`...

**ChartJS** là gì? Chart.js là một thư viện mã nguồn mở hỗ trợ các loại biểu đồ:  bar, line, area, pie (doughnut), radar, polar... ChartJS mặc định là responsive, giúp cho việc hoạt động trên đa nền tảng tốt hơn. Chắc chắn **ChartJS** là một trong những thư viện mã nguồn mở về biểu đồ ấn tượng nhất trong thời gian gần đây.

Bài viết này mình sẽ sử dụng **ChartJS** kết hợp với PHP, MySQL để biểu diễn đồ thị một cách đơn giản  nhất, từ đó bạn có thể tự custom thêm để biểu đồ của bạn trở nên phù hợp và đẹp hơn.
### Tạo cơ sở dữ liệu

Đầu tiên ta cần tạo một database để chứa các thông tin cần tạo biểu đồ:

```SQL
CREATE DATABASE student_chart;

CREATE TABLE student_chart.graph ( 
    user_id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(20) NOT NULL , 
    major VARCHAR(40) NOT NULL , 
    status VARCHAR(20) NOT NULL , 
    PRIMARY KEY (user_id)
) ENGINE = InnoDB;


INSERT INTO graph(name, major, status) VALUES ("Hòa","An toàn thông tin","Đồng ý");
INSERT INTO graph(name, major, status) VALUES ("Huy","Công nghệ thông tin","Từ chối");
INSERT INTO graph(name, major, status) VALUES ("Hùng","Điện tử viễn thông","Đang chờ");
INSERT INTO graph(name, major, status) VALUES ("Hải","Điện tử viễn thông","Đồng ý");
INSERT INTO graph(name, major, status) VALUES ("Nam","Công nghệ thông tin","Đang chờ");
INSERT INTO graph(name, major, status) VALUES ("Đông","Điện tử viễn thông","Đang chờ");
```

### Cấu trúc thư mục

![](https://images.viblo.asia/b5259083-81a2-4bc0-bf42-bfcf015a6950.png)

Sẽ có một thư mục gốc gồm có các file như data.php để lấy dữ liệu từ phía server, database.php để kết nối đến database, file index.php để biểu diễn dữ liệu dưới dạng biểu đồ, và thư mục js chưa các thư viện như jquery và Chart.js.
#### 1. database.php

Tiếp theo cần một file để kết nối với cơ sở dữ liệu MySQL:

```php
<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "student_chart";
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;", $username, $password);
    if(!$conn){
        die("Connect database failed");
    }
?>
```

#### 2. data.php
 File data.php sẽ truy vấn bảng và xuất dữ liệu được trích xuất từ cơ sở dữ liệu MySQL và encode dưới dạng json.
```php
<?php
    header('Content-Type: application/json');
    require_once("database.php");
    $data = array();
    $query = "SELECT status, COUNT(status) AS size_status FROM graph GROUP BY status";
    $stmt = $conn->prepare($query);
    if($stmt->execute()){
        if($stmt->rowCount()>0){
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    foreach($result as $row){
        $data[] = $row;
    }
    echo json_encode($data);
?>
```
Để kiểm tra kết quả các bạn có thể truy cập vào đường dẫn đến file ví dụ: http://localhost/graph/data.php

![](https://images.viblo.asia/87363fcb-9183-4c30-bb59-d507a4f5095d.png)


#### 3. index.php

```php
<!DOCTYPE html>
<html>
<head>
<title>Tạo biểu đồ sử dụng PHP và Chart.js</title>
<style type="text/css">
BODY {
    width: 550PX;
}

#chart-container {
    width: 100%;
    height: auto;
}
</style>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/Chart.min.js"></script>


</head>
<body>
    <div id="chart-container">
        <canvas id="graph"></canvas>
    </div>

    <script>
        $(document).ready(function () {
            showGraph();
        });


        function showGraph(){
                $.post("data.php",
                function (data){
                    var labels = [];
                    var result = [];
                    for (var i in data) {
                        labels.push(data[i].status);
                        result.push(data[i].size_status);
                    }
                    var pie = $("#graph");
                    var myChart = new Chart(pie, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    data: result,
                                    borderColor: ["rgba(217, 83, 79,1)","rgba(240, 173, 78, 1)","rgba(92, 184, 92, 1)"],
                                    backgroundColor: ["rgba(217, 83, 79,0.2)","rgba(240, 173, 78, 0.2)","rgba(92, 184, 92, 0.2)"],
                                }
                            ]
                        },
                        options: {
                            title: {
                                display: true,
                                text: "Chuyên ngành"
                            }
                        }
                    });
                });
        }
        </script>

</body>
</html>
```
Trong đó ta sử dụng hàm post lên file data.php đã xử lý trước đó để lấy dữ liệu được trả về dưới dạng JSON. Sau khi nhận được data trả về sẽ tiền hành gán vào từng label và data cho từng label đó.

Khi gán dữ liệu xong thì ta có thể tiến hành custom màu cho biểu đồ bằng cách set `bordercolor` và `backgroundcolor` tùy theo ý muốn của bạn.

`$("#graph");` Là ID của thẻ nơi các bạn muốn hiển thị biểu đồ của mình.

Sau khi hoàn thành các bước trên các bạn tiền hành tạo một Chart với kiểu biểu đồ bạn muốn. Trong đó Chart.js hỗ trợ rất  nhiều loại biểu đồ như:
+ line
+ bar
+ radar
+ ...

![](https://images.viblo.asia/0ea78c57-f33e-4fc1-85d2-344cf8e1f82f.png)


#### Hoặc có thể vẽ biểu đồ cột như sau
```php
<!DOCTYPE html>
<html>
<head>
<title>Tạo biểu đồ sử dụng PHP và Chart.js</title>
<style type="text/css">
BODY {
    width: 550PX;
}

#chart-container {
    width: 100%;
    height: auto;
}
</style>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/Chart.min.js"></script>


</head>
<body>
    <div id="chart-container">
        <canvas id="graph"></canvas>
    </div>

    <script>
        $(document).ready(function () {
            showGraph();
        });

        function showGraph(){
        
            $.post("data.php",
                function (data){
                    console.log(data);
                    var formStatusVar = [];
                    var total = []; 

                    for (var i in data) {
                        formStatusVar.push(data[i].status);
                        total.push(data[i].size_status);
                    }

                    var options = {
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                display: true
                            }],
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    };

                    var myChart = {
                        labels: formStatusVar,
                        datasets: [
                            {
                                label: 'Tổng số',
                                backgroundColor: '#17cbd1',
                                borderColor: '#46d5f1',
                                hoverBackgroundColor: '#0ec2b6',
                                hoverBorderColor: '#42f5ef',
                                data: total
                            }
                        ]
                    };

                    var bar = $("#graph"); 
                    var barGraph = new Chart(bar, {
                        type: 'bar',
                        data: myChart,
                        options: options
                    });
                });
        }
    </script>
</body>
</html>
```

![](https://images.viblo.asia/e3df36c3-8d74-455c-8ff4-75a2ec0e171d.png)

### Kết luận
Bài viết trên là một ví dụ đơn giản về **ChartJS** hy vọng nó sẽ giúp bạn trong bước đầu tìm hiểu về biểu đồ trên website.

Để tìm hiểu thêm các bạn có thể tham khảo tại [Chart.js]([https://www.chartjs.org/]) hoặc một số tài liệu khác để custom biểu đồ cho đẹp hơn.