![](https://images.viblo.asia/eac8ae4f-78e9-4b58-a194-be991d0931e7.png)
Những năm gần đây Devops ngày càng được ưa chuộng bởi Developer, những khái niệm docker, docker swarm, kubernetes không còn quá lạ lẫm nữa. Bản thân mình cũng vậy, mình áp dụng docker swarm cho dự án của mình từ khá sớm. Tuy nhiên trong qúa trình sử dụng, mình nhận thấy rằng Docker Swarm có khả năng chịu lỗi hạn chế. Trong Docker Swarm, các service có thể phải thay đổi quy mô thủ công, không tự động, khi mình muốn thay đổi service lại phải vào docker-stack.yaml viết lại file rồi deploy lại khá mất công và nếu mình không cẩn thận sai sót trong lúc sửa file cũng khiến ứng dụng của mình bị "tèo". Mình đã có bài học nhớ đời là file docker-stack.yaml mình sửa lỗi mà không biết khiến ứng dụng bị down mà không biết. Ngoài ra, cộng đồng Kubernetes khá là lớn với các dự án siêu to sử dụng nên mình có chuyển kiến trúc dự án sang Kubernetes (k8s)

Nếu bạn đã, đang sử dụng Kubernetes thì helm là một công cụ rất cần thiết. Helm là một package manager dành cho Kubernetes. Helm giúp chúng ta quản lý resource trong k8s hay nói chính xác là quản lý các **Chart** Repository.

## 1. Cài đặt helm

Để cài đặt helm bạn chạy các lệnh sau đây (Debian/Ubuntu) nhé :)
```bash
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
sudo apt-get install apt-transport-https --yes
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```
Bạn sử dụng các os khác tham khảo: [Installation helm](https://helm.sh/docs/intro/install/)

Sau khi cài xong helm bạn kiểm tra xem máy của bạn đã có helm chưa nhé:
```bash
$ helm --help
The Kubernetes package manager

Common actions for Helm:

- helm search:    search for charts
- helm pull:      download a chart to your local directory to view
- helm install:   upload the chart to Kubernetes
- helm list:      list releases of charts

```

Tiếp theo thử tạo một Chart xem sao nhỉ =))
```bash
$ helm create chart-test
```
Và helm đã giúp chúng ta tạo một template chart như này
![](https://images.viblo.asia/23517a8a-0035-40e8-99bc-8ed8ca18be08.png)
Và giờ chúng ta triển khai ứng dụng thêm các services,... và deploy chart lên k8s thôi =)) easy game đúng không.
## Sử dụng Chartmuseum để custom chart
Bài toán đặt ra ở đây là ở dưới local sau khi mình thêm các services, config trong chart repo cho ứng dụng thì mình sẽ test nó như thế nào. Plugin **Chartmuseum** sẽ là một giải pháp giúp bạn làm "chuyện ấy" được hiệu quả
### 1. Cài đặt Chartmuseum
Để cài đặt plugin **Chartmuseum** dưới máy bạn chỉ cần gõ:
```bash
# on Linux
curl -LO https://s3.amazonaws.com/chartmuseum/release/latest/bin/linux/amd64/chartmuseum

# on macOS
curl -LO https://s3.amazonaws.com/chartmuseum/release/latest/bin/darwin/amd64/chartmuseum

# on Windows
curl -LO https://s3.amazonaws.com/chartmuseum/release/latest/bin/windows/amd64/chartmuseum

chmod +x ./chartmuseum
mv ./chartmuseum /usr/local/bin
```
### 2.  Chạy Chartmuseum dưới local
Bạn chạy dưới local với lệnh sau

```bash
chartmuseum --port=8080 --storage="local" --storage-local-rootdir="/home/nguyen.van.quyb/Desktop/chart-test"
```

Vào sau đó bạn sẽ chartmuseum sẽ chạy dưới local với port:8080. Lưu ý trong suốt quá trình coding thì giữ nguyên cửa sổ này nhé, nếu không sẽ không có api để bạn dùng ở phía dưới đâu
```bash
chartmuseum --port=8080 --storage="local" --storage-local-rootdir="/home/nguyen.van.quyb/Desktop/chart-test"
2021-07-14T22:13:29.827+0700	INFO	Starting ChartMuseum	{"port": 8080}
```

Một số API mà bạn có thể sử dụng:

- `POST /api/charts` - tải lên một chart version mới

- `POST /api/prov` - tải lên một tệp nguồn mới

- `DELETE /api/charts/<name>/<version>` - xóa một chart version (và tệp nguồn tương ứng)

- `GET /api/charts` - Danh sách tất cả các chart

- `GET /api/charts/<name>` - Danh sách tất cả các version của chart

- `GET /api/charts/<name>/<version>` - một tả một chart version

- `HEAD /api/charts/<name>` - kiểm tra nếu chart tồn tại (bất kỳ version nào)

- `HEAD /api/charts/<name>/<version>` - kiểm tra nếu chart version tồn tại
### 3. Cài đặt Charts cho Kubernetes
- Thêm URL của **Chartmuseum** vào danh sách local repository:
```bash
$ helm repo add chartmuseum http://localhost:8080
```

- Push chart repo chúng ta vừa tạo ở trên vào chartmuseum:
```bash
$ helm push chart-test/ chartmuseum
```
- Sau khi push chart vào chartmuseum nhớ update lại repo nhé
```bash
$ helm repo update
```
-  Tìm kiếm các chart đã được add vào chartmuseum:
```bash
$ helm search repo chartmuseum/
NAME                 	CHART VERSION	APP VERSION	DESCRIPTION                     
chartmuseum/chart-test	0.0.1        	           	ahihi.
```
- Cài đặt chart
```bash
$ helm install chartmuseum/chart-test --generate-name
```
- Kiểm tra các chart đã được cài đặt trên k8s
```
NAME      	NAMESPACE 	REVISION	UPDATED                                	STATUS  	CHART           	APP VERSION
chart-test	chart-test	1      	2021-07-14 22:50:27.505546235 +0000 UTC	deployed	chart-test-0.0.1	
```
Ok vậy là chúng ta đã deploy được chart với helm sử dụng **Chartmuseum** để lưu trữ chart phía local. Sau đó khi bạn muốn sửa nội dung của chart bạn dùng helm push lại vào chartmuseum, và dùng `helm upgrade` để upgrade lại chart cho k8s.