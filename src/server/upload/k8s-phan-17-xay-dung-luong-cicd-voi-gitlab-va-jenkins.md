# Giới thiệu
Hello mọi người. Kịch hay tới rồi. Hôm nay mình sẽ chia sẻ về một mô hình CICD cơ bản để giải quyết bài toán hôm trước khi mà mỗi lần thay đổi code lại phải to tay update để triển khai lên hệ thống.

Trong bài trước mình đã chia sẻ cách để [**đóng gói ứng dụng thành helmchart và triển lên K8S**](https://viblo.asia/p/k8s-phan-16-huong-dan-dong-goi-ung-dung-bang-helm-va-cai-dat-len-kubernetes-jvElakRdKkw). Sau khi đã dựng dc helmchart thì việc áp dụng vào luồng CICD sẽ trở nên đơn giản và thuận tiện hơn rất nhiều.

Khi áp dụng CICD thì ngay trong môi trường dev ta đã thấy được lợi ích to lớn nó mang lại.  Ông dev sau khi commit xong muốn test deploy lên môi trường Dev thì sẽ chỉ cần thực hiện 1 cú click và nhâm nhi ngụm cafe chờ kết quả thôi!

# Mô hình CICD cơ bản
Mình đã có tham khảo ở một vài công ty (cũng có tiếng tăm) thì thấy việc triển khai cũng như quản lý luồng CICD ở mỗi nơi sẽ khác nhau một chút, nhưng tựu chung lại thì vẫn gốm các phase chính như sau:
![cicd2.png.jpg](https://images.viblo.asia/63d41c24-fc33-4408-9407-8f6b42a58a12.jpg)
Trong đó tùy yêu cầu mà có thể tích hợp thêm các bước code scan, automation test nhưng trong phạm vi bài viết này mình không đề cập tới.
Ở đây CICD nó là một khái niệm, là đích đến, còn các đối tượng như Gitlab, Jenkins.. là công cụ. Do đó bạn hoàn toàn có thể sử dụng các công cụ khác có chức năng tương đương. Ví dụ Gitlab vs Github vs AWS Code Commit vs Azure Repos... Còn Jenkins thì có thể thay bằng Gitlab Runner..

Quan trọng là bạn hiểu được idea của nó, còn việc triển khai thì bạn có thể chọn các công cụ sao cho phù hợp nhất với yêu cầu đặt ra và điều kiện thực tế.

**Quay lại bài viết, mình sẽ xây dựng một mô hình CICD đơn giản, ý tưởng thực hiện của nó như sau:**
- Dev hoàn thiện một module/tính năng và commit code lên gitlab 
- Pull source code về Jenkins server để build
- Build docker image và push image lên registry
- Triển khai/cập nhật lên K8S bằng kubectl/helm

# Các bước thực hiện trong bài lab như sau:
- Tạo helmchart cho ứng dụng (Đã thực hiện ở [bài trước](https://viblo.asia/p/k8s-phan-16-huong-dan-dong-goi-ung-dung-bang-helm-va-cai-dat-len-kubernetes-jvElakRdKkw))
- Cài đặt và cấu hình gitlab để quản lý source code
- Cài đặt và cấu hình Jenkins để tạo luồng CICD
- Tạo job pipeline cho Jenkins, thực hiện và test từng bước nhỏ trong cả luồng CICD
- Thay đổi code và chạy CICD job để kiểm tra kết quả


***Rồi, mục tiêu và công việc đã rõ ràng, ta bắt tay vào làm từng việc một.***

## Tạo helmchart cho ứng dụng
Trong bài trước ta đã đóng gói dc ứng dụng thành một helmchart gồm các phần chính như deployment, service và ingress và deploy thành công lên k8s. 
Trong bài này ta sẽ xây dựng luồng CICD để tự động update thay đổi và deploy lên hệ thống, chính là update ứng dụng đã cài đặt hôm trước bằng helm. 

## Cài đặt và cấu hình gitlab
Các bạn tìm hướng dẫn cài đặt gitlab trên mạng nhé vì nó rất phổ biến. Ở đây mình đã cài đặt xong trên Centos7 và sẵn sàng sử dụng ở địa chỉ: **https://gitlab.prod.viettq.com/** *(Phiên bản mình cài là 15.1)*
![image.png](https://images.viblo.asia/784b76eb-ddd4-4faa-b75f-e222597cfe0a.png)

**Các bước cần làm với thằng Gitlab này:**
- Tạo repo để lưu source code. Các bạn down bộ code mẫu của mình ở đây về máy và push lên gitlab của các bạn nhé! Mình đã tạo repos ở link **https://github.com/rockman88v/nodejs-helm-demo**
- Tạo user trên gitlab để Jenkins dùng để kết nối và pull source code. Mình tạo user là **jenkin_gitlab/Admin@123**
- Gán cho user jenkin_gitlab có quyền với project trên
Những thao tác này chắc là rất basic rồi nên mình không hướng dẫn ở đây nữa. Như vậy là xong với thằng Gitlab

## Cài đặt và cấu hình Harbor Registry
Mình đã có bài [hướng dẫn cài đặt Harbor Registry](https://viblo.asia/p/k8s-phan-11-xay-dung-private-docker-registry-phuc-vu-cicd-voi-kubernetes-Qbq5QRQRKD8) và mình sẽ dùng nó trong bài lab này. Registry của mình: **https://harbor.prod.viettq.com**. 

Nếu các bạn dùng registry khác thì lưu ý thay đổi tương ứng nhé!
Các bước cần thực hiện với Harbor Registry:
- Tạo Project mới để lưu các image. Ở đây mình tạo project **demo** là public project. Khi push lên (từ Jenkins) thì cần user/pass còn pull về (từ k8s worker node) thì không cần.
- Tạo user trên Harbor để Jenkins kết nối và push image lên. Vào mục Users tạo user mới. Mình tạo user **jenkin_harbor/Admin@123**
- Gán quyền cho user này có quyền push lên repo: Vào mục Project -> Chọn project Demo -> Chọn Member --> Add member jenkin_harbor với role là Developer.

**Kết quả:**

![image.png](https://images.viblo.asia/703cd664-3bbb-4086-b75c-da82dfeda566.png)

## Cài đặt và cấu hình Jenkins
Tương tự Gitlab, các bạn cài Jenkin theo hướng dẫn nhé! Mình cài Jenkins trên Centos7 và đã ready ở đường dẫn: **https://jenkin.prod.viettq.com/** (version 2.346.3)

**Các bước cần thực hiện với thằng Jenkins:**
- Cài đặt các plugin: **Git, Docker Pipeline**. Đây là 2 plugin chính dùng cho việc pull code từ git về jenkins, và cho việc build docker và push lên registry (Vào Manage Jenkins --> Manage Plugins --> Chọn Available --> Tìm các plugin theo tên, sau đó tick chọn và ấn Install without restart --> Chờ kết quả Successful hết là được)

![image.png](https://images.viblo.asia/24a15263-d531-44a1-b852-e6e3b970c134.png)

- Tạo credential để kết nối vào Gitlab và Harbor Registry: Vào Manage Jenkins --> Manage Credentials --> Click vào Domain global màu xanh --> Add Credential --> Username with Password --> Điền user/pass như đã tạo bên trên.
    - Đặt ID trùng với Username, ID này dùng để khai báo trong pipeline, bước tiếp theo sẽ dùng tới 
    - Phần mô tả điền "User dùng để kết nối Gitlab/Registry..)
![image.png](https://images.viblo.asia/341f9eee-3acb-4e43-babd-642bbb0f5bf6.png)
- Cấu hình cho user jenkins có quyền chạy docker without sudo:
```
sudo usermod -aG docker jenkins
sudo service jenkins restart
```
- Cấu hình cho máy chủ Jenkins (cicd) này có kết nối tới registry (cấu hình file hosts và cấu hình certificate [**theo hướng dẫn này**](https://viblo.asia/p/k8s-phan-11-xay-dung-private-docker-registry-phuc-vu-cicd-voi-kubernetes-Qbq5QRQRKD8)) ==> Chỗ này thực hiện xong nên thử push một image lên để test trước khi tiếp tục các bước tiếp theo. 
- Cấu hình kết nối tới K8S cho user jenkins, phục vụ cho việc deploy/upgrade ứng dụng trên K8S bằng lệnh kubecty/helm. 
    - Note: Máy chủ cicd này mình đã cài sẵn kubectl và helm3 rồi, các bạn nếu chưa có thì phải cài vào
    - Thông thường khi cài Jenkins thì user jenkins sẽ được tạo ra nhưng không có cấu hình shell và không ssh được. Do đó ta phải cho phép su sang user jenkins (hoặc ssh) bằng cách sửa thông tin login shell của user jenkins trong file** /etc/password** "jenkins:x:994:990:Jenkins Automation Server:/var/lib/jenkins:**/bin/bash**"
    - Login vào user jenkins (sudo su - jenkins) và tạo file config ở đường dẫn ~/.kube/config tương tự với lúc cấu hình kubectl trên Master vậy. 
    - Từ user jenkins gõ thử "kubectl get nodes" nếu kết quả ok là được
```
-bash-4.2$ pwd
/var/lib/jenkins
-bash-4.2$ whoami
jenkins
-bash-4.2$ kubectl get nodes
NAME          STATUS   ROLES                  AGE    VERSION
vtq-master1   Ready    control-plane,master   6d2h   v1.20.7
vtq-worker1   Ready    <none>                 6d2h   v1.20.7
vtq-worker2   Ready    <none>                 6d2h   v1.20.7
vtq-worker3   Ready    <none>                 6d2h   v1.20.7
vtq-worker4   Ready    <none>                 6d2h   v1.20.7
```

***Như vậy bước đầu đã cấu hình xong một số thứ cơ bản cho thằng Jenkins, nó đã có thể tích hợp với Gitlab, Registry và K8S rồi. Ta sẽ bắt tay vào dựng pipeline để thực hiện luồng CICD***

## Tạo job trên jenkins
Tại giao diện dashboard chọn "New Item" vào tạo một folder mới có tên APP_DEMO. Vào thư mục này tạo một pipeline job mới tên là "my-app".
![image.png](https://images.viblo.asia/125110c3-57ad-42cf-837b-3a9dae408521.png)

Trong mục General bạn có thể cấu hình lưu hông tin các build cũ theo thời gian hoặc theo số lần build gần nhất:
![image.png](https://images.viblo.asia/fb68d2ea-fde8-4a0a-a531-7e24b55ef258.png)

Tiếp đến là cấu hình Pipeline, mình chọn Pipeline script để viết script ở đây.
Với những bạn mới làm quen với phần CICD này thì mình khuyên nên chia nhỏ từng bước để thực hiện, xong bước 1 mới qua bước 2, như vậy sẽ hiểu rõ hơn và debug cũng dễ hơn.

Bước 1, mình sẽ tạo pipeline để thực hiện pull code từ gitlab về xem kết quả có ok hay không. Nếu có lỗi phát sinh thì xử lý.
```
	// git repository info
	def gitRepository = 'http://gitlab.prod.viettq.com/viettq/nodejs-demo-k8s.git'
	def gitBranch = 'master'

	// gitlab credentials
	def gitlabCredential = 'jenkin_gitlab'	

	pipeline {
		agent any
				
		stages {		
			stage('Checkout project') 
			{
			  steps 
			  {
				echo "checkout project"
				git branch: gitBranch,
				   credentialsId: gitlabCredential,
				   url: gitRepository
				sh "git reset --hard"				
			  }
			}
		}
	}
```
Nội dung bên trên mình khai báo thông tin kết nối gitlab gồm URL và branch cũng như thông tin credential ID của Gitlab (mà ta đã khai báo trên Jenkins ở bên trên). Các thông tin này sẽ được dùng cho plugin Git để pull source code. Lệnh "git reset --hard" để lấy commit mới nhất của branch này.
Mình build job này không có lỗi gì phát sinh,chi tiết các bước như sau:
![image.png](https://images.viblo.asia/1893c2d4-83d8-4771-990c-a98635acd385.png)

Kết quả là source code được pull về thư mục theo quy tắc: [jenkins-home-dir]/workspaces/[folder-name]/[job-name]
```
-bash-4.2$ pwd
/var/lib/jenkins/workspace/APP_DEMO/my-app
-bash-4.2$ ll
total 52
-rw-r--r--  1 jenkins jenkins  1652 Aug 15 04:16 app.js
-rw-r--r--  1 jenkins jenkins   116 Aug 15 04:16 Dockerfile
drwxr-xr-x  2 jenkins jenkins    58 Aug 15 04:59 documents
drwxrwxr-x  3 jenkins jenkins    49 Aug 14 23:43 helmchart
drwxr-xr-x  2 jenkins jenkins    69 Aug 15 04:16 kubernetes
drwxr-xr-x 51 jenkins jenkins  4096 Aug 15 04:59 node_modules
-rw-r--r--  1 jenkins jenkins   560 Aug 15 04:16 package.json
-rw-r--r--  1 jenkins jenkins 32524 Aug 15 04:59 package-lock.json
-rw-r--r--  1 jenkins jenkins  1834 Aug 15 04:16 README.md
```

Bước 2, ta sẽ build code, build docker và push lên registry. Để làm được thì ta cần bổ sung các thông tin:
- Thông tin registry
- Thông tin user/pass kết nối registry (chính là credential ID mà ta đã khai user/pass vào registry)
- Thông tin repo/tag cho image

Ta cập nhật lại job như sau:
```
	// git repository info
	def gitRepository = 'http://gitlab.prod.viettq.com/viettq/nodejs-demo-k8s.git'
	def gitBranch = 'master'

	// Image infor in registry
	def imageGroup = 'demo'
	def appName = "my-app"
	def namespace = "helm-demo"	

	// harbor-registry credentials
	def registryCredential = 'jenkin_harbor'
	// gitlab credentials
	def gitlabCredential = 'jenkin_gitlab'
	
	dockerBuildCommand = './'
	def version = "prod-0.${BUILD_NUMBER}"

	pipeline {
		agent any
		
		environment {
			DOCKER_REGISTRY = 'https://harbor.prod.viettq.com'
			DOCKER_IMAGE_NAME = "${imageGroup}/${appName}"
			DOCKER_IMAGE = "harbor.prod.viettq.com/${DOCKER_IMAGE_NAME}"
		}

		stages {
		
			stage('Checkout project') 
			{
			  steps 
			  {
				echo "checkout project"
				git branch: gitBranch,
				   credentialsId: gitlabCredential,
				   url: gitRepository
				sh "git reset --hard"				
			  }
			}
			stage('Build project') 
			{
			  steps 
			  {
				sh "npm install"
			  }
			}
			stage('Build docker and push to registry') 
			{
			  steps 
			  {
				script {
						app = docker.build(DOCKER_IMAGE_NAME, dockerBuildCommand)
						docker.withRegistry( DOCKER_REGISTRY, registryCredential ) {                       
						   app.push(version)
						}

						sh "docker rmi ${DOCKER_IMAGE_NAME} -f"
						sh "docker rmi ${DOCKER_IMAGE}:${version} -f"				
					}
			  }
			}			
		}
	}
```
Ý tưởng ở đây là ở mỗi lần build job, thì sẽ được định danh bởi giá trị BUILD_NUMBER. Mình dùng giá trị này để đánh tên cho image, nó sẽ có dạng: harbor.prod.viettq.com/demo/my-app:prod-0.15

Ở đây mình build success. Các bạn nếu có gặp lỗi liên quan tới permission của Docker thì lưu ý bên trên có hướng dẫn gán quyền chạy docker without sudo rồi nhé!

Kết quả image được push lên registry thành công:
![image.png](https://images.viblo.asia/2f144fc6-90ad-4362-90b1-44e639aed7a6.png)

Như vậy là mọi thứ gần xong rồi. Giờ chỉ còn bước cuối cùng là deploy nó lên k8s thôi. Ta đã có helmchart + có image mới rồi thì chỉ onehit nữa là xong.

**Để thực hiện được bước update cuối cùng này mình cần khai báo các thông tin:**
- Tên helm release, đường dẫn tới file helmchart và file value
```
    //helm param for upgrade
	def helmRelease="my-app"
	def helmValues = "/var/lib/jenkins/workspace/APP_DEMO/my-app/helmchart/app-demo-value.yaml"
	def helmChart = "/var/lib/jenkins/workspace/APP_DEMO/my-app/helmchart/app-demo"
```
- Khai báo tên của namespace cài đặt ứng dụng
```
def namespace = "helm-demo"
```
- Cập nhật image tag mới nhất
```
def version = "prod-0.${BUILD_NUMBER}"
environment {
			DOCKER_REGISTRY = 'https://harbor.prod.viettq.com'
			DOCKER_IMAGE_NAME = "${imageGroup}/${appName}"
			DOCKER_IMAGE = "harbor.prod.viettq.com/${DOCKER_IMAGE_NAME}"
		}
```

Pipeline hoàn thiện sẽ như thế này:
```
	// git repository info
	def gitRepository = 'http://gitlab.prod.viettq.com/viettq/nodejs-demo-k8s.git'
	def gitBranch = 'master'

	// Image infor in registry
	def imageGroup = 'demo'
	def appName = "my-app"
	def namespace = "helm-demo"

	//helm param for upgrade
	def helmRelease="my-app"
	def helmValues = "/var/lib/jenkins/workspace/APP_DEMO/my-app/helmchart/app-demo-value.yaml"
	def helmChart = "/var/lib/jenkins/workspace/APP_DEMO/my-app/helmchart/app-demo"

	// harbor-registry credentials
	def registryCredential = 'jenkin_harbor'
	// gitlab credentials
	def gitlabCredential = 'jenkin_gitlab'
	
	dockerBuildCommand = './'
	def version = "prod-0.${BUILD_NUMBER}"

	pipeline {
		agent any
		
		environment {
			DOCKER_REGISTRY = 'https://harbor.prod.viettq.com'
			DOCKER_IMAGE_NAME = "${imageGroup}/${appName}"
			DOCKER_IMAGE = "harbor.prod.viettq.com/${DOCKER_IMAGE_NAME}"
		}

		stages {
		
			stage('Checkout project') 
			{
			  steps 
			  {
				echo "checkout project"
				git branch: gitBranch,
				   credentialsId: gitlabCredential,
				   url: gitRepository
				sh "git reset --hard"				
			  }
			}
			stage('Build project') 
			{
			  steps 
			  {
				sh "npm install"
			  }
			}
			stage('Build docker and push to registry') 
			{
			  steps 
			  {
				script {
						app = docker.build(DOCKER_IMAGE_NAME, dockerBuildCommand)
						docker.withRegistry( DOCKER_REGISTRY, registryCredential ) {                       
						   app.push(version)
						}

						sh "docker rmi ${DOCKER_IMAGE_NAME} -f"
						sh "docker rmi ${DOCKER_IMAGE}:${version} -f"				
					}
			  }
			}
			stage('Apply k8s') {
				steps {
					script {
						echo "Deploy to k8s"
						sh "helm --namespace=$namespace upgrade $helmRelease -f $helmValues $helmChart  image.repository=${DOCKER_IMAGE},image.tag=prod-0.${BUILD_NUMBER}"
					}
				}
			}
		}
	}
```

Thực hiện build job và chờ kết quả thôi!
![image.png](https://images.viblo.asia/58342ae6-fbb6-4612-a398-634bc76fa315.png)

**Hola xanh hết lượt rồi. Vào lại ứng dụng trên web xem sao:**
![image.png](https://images.viblo.asia/824d9aea-c1e8-46be-b603-f1a7fa65f16e.png)

**Bây giờ ta sẽ test thử thay đổi code và chạy lại luồng CICD xem sao. Mục tiêu là sau khi sửa code và commit thì build lại job mà mọi thứ phải được update.**

Ở đây mình sẽ đổi dòng thông báo "These are some information" ở file documents/index.html thành "This is version 2" và build lại job.

***Kết quả là ăn tiền luôn:***

![image.png](https://images.viblo.asia/a012b922-1c81-4957-95ea-09db8d6227b5.png)

**Từ bây giờ mỗi khi update code và commit thì mình chỉ cần ấn nút build là có thể rung đùi uống cf chờ kết quả thôi :D** 

PS: Ở đây có thể tự động hoàn toàn, bạn chỉ cần commit và rung đùi luôn chứ không cần ấn build thử công trên Jenkins. Khi đó bạn phải cấu hình web hook để trigger sự kiện commit trên gitlab cho jenkins tự động build. Mình thích mọi thay đổi lên hệ thống phải có kiểm soát nên để build thủ công.

**NOTE:**
Nếu chạy lệnh helm báo lỗi "**Error: "helm upgrade" requires 2 arguments**" thì các bạn thêm tham số "--set " vào trong câu lệnh helm upgrade cho nó như bên dưới nhé. Lỗi này có thể do phiên bản helm của các bạn mới hơn phiên bản mình đang dùng hiện tại.
```
sh "helm --namespace=$namespace upgrade $helmRelease -f $helmValues $helmChart  --set image.repository=${DOCKER_IMAGE},image.tag=prod-0.${BUILD_NUMBER}"
```

***Qua bài này hy vọng các bạn cũng hiểu được cơ bản về CICD. Phần hướng dẫn này khá đơn giản, chủ yếu là POC các khái niệm basic. Và trong từng môi trường làm việc ở các cty khác nhau thì luồng nghiệp vụ, quy trình cũng khác nhau.*** 

**Cty của các bạn đang triển khai theo mô hình như thế nào, dùng công cụ gì để chạy CICD?**

Tags: viettq, devops, gitlab, jenkins, cicd