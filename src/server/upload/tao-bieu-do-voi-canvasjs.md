# 1.  Giới thiệu về CanvasJs
CanvasJS Charts là một thư viện biểu đồ HTML5 chạy trên các thiết bị và trình duyệt và có hiệu suất gấp 10 lần so với thư viện biểu đồ SVG truyền thống. Điều này cho phép bạn tạo các dashboard phong phú hoạt động trên các thiết bị mà không ảnh hưởng đến khả năng bảo trì hoặc chức năng của ứng dụng web của bạn.<br>
* Link thư viện CanvasJs: https://canvasjs.com/
* Các công ty lớn đã sử dụng CanvasJs: NASA, Microsoft, Apple, Intel, Boeing, BMW, SONY, SAMSUNG, ...
# 2.  Ưu điểm của CanvasJs
-  JavaScript API dễ sử dụng.
-  Hiệu suốt gấp 10 lần thư viện biểu đồ SVG truyền thống.
![](https://images.viblo.asia/2b5cd1e3-36e2-42ee-abc7-e00aa1b3d0ca.PNG)

-  Hơn 30 loại biểu đồ khác nhau.
-  Tài liệu hướng dẫn đầy đủ và dễ hiểu.
-  Hỗ trợ nhiều trình duyệt: Chrome, Firefox, Safari, IE8+, ...
-  Có thể nhận hỗ trợ trực tiếp từ nhà phát triển CanvasJ.
-  Có thể hoạt động với nhiều công nghệ và frameworks khác nhau: React, Angular, JavaScript, .NET MVC, php,...
-  Có thể lồng ghép nhiều loại biểu đồ với nhau trên 1 hệ đồ thị
![](https://images.viblo.asia/a585e449-3c1f-4689-bf9b-04562853fbc6.PNG)
- Hỗ trợ export biểu đồ ra ảnh.
- Tự động responsive với các độ phân giải màn hình khác nhau
 # 3.  Nhược điểm của CanvasJs
-  Là thư viện trả phí
- Có 1 số loại biểu đồ đặc biệt chưa hỗ trợ
 # 4.  Ví dụ cơ bản (Simple line chart)
 ![](https://images.viblo.asia/df41fa17-3902-4566-b392-a3b64e129d3a.png)

 ```html
 <!DOCTYPE HTML>
<html>
<head>  
<script>
window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Simple Line Chart"
	},
	data: [{        
		type: "line",
      	indexLabelFontSize: 16,
		dataPoints: [
			{ y: 450 },
			{ y: 414},
			{ y: 520, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
			{ y: 460 },
			{ y: 450 },
			{ y: 500 },
			{ y: 480 },
			{ y: 480 },
			{ y: 410 , indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
			{ y: 500 },
			{ y: 480 },
			{ y: 510 }
		]
	}]
});
chart.render();

}
</script>
</head>
<body>
<div id="chartContainer" style="height: 370px; width: 100%;"></div>
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</body>
</html>
 ```
 
 
### Chú thích các tham số:
* animationEnabled: bật(tắt) animation khi tạo biểu đồ
    Mặc định: false
    Giá trị: false, true
* theme: chủ đề hiển thị của biểu đồ
    Mặc định: "light1"
    Giá trị: “light1″,”light2”, “dark1”, “dark2”
* title: tiêu đề hiển thị của biểu đồ
* type: loại biểu đồ
    Default: “column”
    Options: “line”, “column”, “bar”, “area”, “spline”, “splineArea”, “stepLine”, “scatter”, “bubble”, “stackedColumn”, “stackedBar”, “stackedArea”, “stackedColumn100”, “stackedBar100”, “stackedArea100”, “pie”, “doughnut”.
*  indexLabelFontSize: tùy chỉnh size của thông số trong biểu đồ
    Default: 18
    Example: 12, 16, 22..
* dataPoints : dữ liệu để vẽ biểu đồ
 # 4.  Kết
 Trên đây là giới thiệu sơ qua và 1 ví dụ cơ bản về thư viện CanvasJs. Theo mình thì đây là 1 thư viện đáng để sử dụng vì nó hỗ trợ rất nhiều  loại biểu đồ và có tài liệu miêu tả rất đầy đủ cùng với giao diện khá đẹp.
 Nhưng hiện tại trên trang chủ của CanvasJs chưa có nhiều ví dụ về các ví dụ kết hợp nhiều biểu đồ khác nhau. Nên nếu cần tham khảo thêm, các bạn có thể vào [đây](https://jsfiddle.net/user/canvasjs/fiddles/) để tham khảo nhiều ví dụ hơn.