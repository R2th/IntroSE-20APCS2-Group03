# Mở đầu
OpenCV được viết tắt bởi Open Source Computer Vision là một thư viện mã nguồn mở hàng đầu về xử lý ảnh. OpenCV đươc viết bằng C/C++, vì vậy có tốc độ tính toán rất nhanh, có thể sử dụng với các ứng dụng liên quan đến thời gian thực. OpenCV có các interface cho C/C++, Python, Java vì vậy hỗ trợ được cho Window, Linux, MacOS lẫn Android, iOS. OpenCV có cộng đồng hơn 47 nghìn người dùng và số lượng download vượt quá 6 triệu lần. Phiên bản OpenCV mới nhất hiện hành trên trang chủ https://opencv.org là 4.0.0-rc.

# Cài đặt
Có thể tải các phiên bản release của OpenCV tại [đây](https://opencv.org/release.html). Sau khi tải và giải nén xong ta thu được kết quả:

![](https://images.viblo.asia/e2dad816-308f-4356-8293-8fe51859fe0b.PNG)

Sử dụng Visual Studio tạo một project Win32 Console Application, sau đó config các đường dẫn đến opencv, gồm có:
- include path: opencv/build/include
- library path: opencv/build/x64/vc14/lib
- linker input: opencv_world330d.lib dành cho chế độ debug và opencv_world330.lib dành cho chế độ release.

# Bắt đầu
Bài toán đặt ra là giả sử ta có một bức ảnh sau:

![](https://images.viblo.asia/7b222b90-c956-43f4-9b3b-19e1e09d0aaf.jpg)

Làm sao cho máy tính có thể nhận ra được trong bức ảnh này có những số nào. Sau đây là cách giải quyết.

## Bước 1: Tìm vị trí của các thẻ số trong ảnh

Bước này có nhiệm vụ tìm và xác định được các vùng có chứa các thẻ số. Thứ nhất là xác định trong ảnh, vùng nào có thể chứa thẻ số. Và thứ 2 là làm đơn giản hóa cho quá trình tính toán về sau.

Trước hết, để tìm vị trí của các thẻ số, ta cần phải tìm được các đường bao có trong ảnh hay còn gọi là các contour. Ảnh cần được qua một bước tiền xử lí để giảm bớt những thông tin phức tạp trong ảnh, đồng thời phải làm rõ ra thông tin các cạnh (edge) của thẻ số. Bởi vì OpenCV không tự động tìm cho chúng ta vị trí chính xác của đối tượng nên sau khi có danh sách các đường bao, ta phải đặt điều kiện khi duyệt các đường bao đó, ví dụ như: kích thước về chiều rộng và chiều cao, tỉ lệ giữa chiều rộng và chiều cao,... Độ chính xác của việc tìm vị trí thẻ số cũng phụ thuộc một phần vào các điều kiện này.

```cpp
    cv::Mat img1 = imread(path);
	cv::Mat img;
	img1.copyTo(img);
	if (img1.cols > img1.rows) {
		resize(img1, img, cvSize(960, 720), CV_INTER_CUBIC);
	}
	else {
		resize(img1, img, cvSize(720, 960), CV_INTER_CUBIC);
	}

	cv::Mat imgx;
	img.copyTo(imgx);
	cv::Mat img2, img11;
	cv::medianBlur(imgx, img11, 13);
	cv::cvtColor(img11, img11, CV_BGR2GRAY);
	cv::adaptiveThreshold(img11, img2, 255, ADAPTIVE_THRESH_MEAN_C, CV_THRESH_BINARY, 15, 1);

	double sigma = 0.33;
	double v = NativeLib::median(img2);
	double lower = int(MAX(0, (1.0 - sigma)*v));
	double upper = int(MIN(255, (1.0 + sigma)*v));
	cv::Mat edged;
	cv::Canny(img2, edged, lower, upper);

	std::vector<std::vector<cv::Point>> contours;
	std::vector<cv::Vec4i> hierarchy;
	cv::findContours(edged, contours, hierarchy, RETR_TREE, CHAIN_APPROX_SIMPLE);
```

Khi đã tìm được các contours rồi, ta sẽ tiến hành duyệt và lọc ra những vùng có thể chứa thẻ số. Kết quả sẽ thu được như sau:

![](https://images.viblo.asia/518e4bca-a03f-4bf0-89df-5952fd71bb00.PNG)

## Bước 2: Crop chữ số trong vùng ROI

ROI viết tắt của Region Of Interest là vùng trong ảnh mả ta đang cần tìm kiếm. Kết quả của bước trên là một ví dụ.

Bước thứ 2 này hoàn toàn tương tụ với bước thứ nhất. Những điều kiện đặt khi duyệt các contour sẽ được điều chỉnh sao có kết quả đạt độ chính xác cao nhất. Ảnh số sau khi được crop ra từ ROI sẽ được nhị phân hóa nhằm giảm bớt những thông tin không cần thiết để tăng tốc độ khi tính toán.

```cpp
cv::Mat cr;
cv::Mat ROI(ROIX, rxx);
ROI.copyTo(cr);
cv::Mat croop;
cv::resize(cr, croop, CvSize(28, 28), 0, 0, CV_INTER_CUBIC);
cv::Mat bina;
croop.copyTo(bina);
cv::threshold(croop, bina, 0, 255, THRESH_BINARY + THRESH_OTSU);
bitwise_not(bina, bina);
```

## Bước 3: Sử dụng SVM để predict kết quả
Sử dụng thuật toán SVM được cài đặt sẵn trong thư viện OpenCV để nhận diện kết quả:

```cpp
cv::Ptr<cv::ml::SVM> svm2 = cv::ml::SVM::create();
svm2 = svm2->load("path-to-model");
```

Và sử dụng predict để dự đoán kết quả:

```cpp
cv::Mat res;
vector<Mat> deskewedTrainCells;
NativeLib::CreateDeskewedTrainTest(deskewedTrainCells, v_crops);
std::vector<std::vector<float> > trainHOG;
NativeLib::CreateTrainTestHOG(trainHOG, deskewedTrainCells);
Mat input(trainHOG.size(), trainHOG[0].size(), CV_32FC1);
NativeLib::ConvertVectortoMatrix(trainHOG, input);
svm2->predict(input, res);
```

Cuối cùng là duyệt kết quả:

```cpp
int i = 0;
while (i < v_crops.size()) {
    float result = res.at<float>(i, 0);
    cout << result << " ";
	i++;
}
```

# Kết luận
Trên đây đã trình bày quy trình nhận diện một đối tượng trong ảnh sử dụng thư viện OpenCV. Chúng ta có thể vận dụng kết quả của bài toán trên áp dụng cho nhiều mục đích khác nhau như làm một ứng dụng game nho nhỏ kết hợp xử lí ảnh hay có thể thay nhận diện thẻ số thành nhận diện biển số xe và nhiều các đối tượng khác. Chúc mọi người có những ý tưởng hay hơn và độc đáo hơn từ bài viết này.