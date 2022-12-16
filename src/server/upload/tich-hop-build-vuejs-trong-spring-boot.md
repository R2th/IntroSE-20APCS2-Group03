Dạo gần đây, do có chút thời gian rảnh mình có vọc vạch về Spring Boot + Gradle thay cho Spring Boot + Maven như bình thường vẫn hay sử dụng do được vài đại ca giang hồ bảo là Gradle nó xịn xò hơn Maven nhiều. Kết quả thì mình thấy có vẻ là đúng thật, về cả hiệu năng và cách viết build-script trong Gradle có vẻ gọn gàng hơn Maven. Để minh họa thử, mình sẽ tạo một project Spring kết hợp với FE (cụ thể là VueJS, các bạn có thể thay thế bằng ReactJS cũng được) và build chung trong một lần luôn (cũng khá giống với việc viết Jenkins Pipeline để build cả FE và BE lên server vậy). Dài dòng đủ rồi, giờ bắt đầu thôi.
## 1. Tạo Project
Các bạn có thể tạo project tại [Spring Initializr](https://start.spring.io/) hoặc tạo trực tiếp trong IDE (mình sử dụng Eclipse, các bạn có thể sử dụng IntelliJ hoặc bất cứ IDE nào khác). Do đây chỉ là demo về build nên mình chỉ chọn các dependency đơn giản
![](https://images.viblo.asia/f399d952-6b3f-4385-8616-2ac41c5ea818.jpg)
Giờ mình sẽ tạo thêm project vue. Cấu trúc của project như sau
![](https://images.viblo.asia/5d28ea9a-9a96-4e28-8a61-834df8e2a803.jpg)
Ok vậy là xong. Các bạn có thể chạy thử 2 project vừa tạo để kiểm tra
## 2. Config build.gradle
Giờ chúng ta sẽ đi vào mục tiêu chính của bài viết. Về cơ bạn các task build của chúng ta sẽ như sau
1.  `yarn install` để kéo các dependency về trong node_modules
2.   `yarn build` webpack sẽ build các code, component, css, ảnh thành các static resource duy nhất tại thư mục dist.
3.   Copy tất cả các static resource vào thư mục static resource của spring project
4.   Biên dịch các resource và java code thành một gói jar duy nhất.
Đây là các step chúng ta sẽ làm khi build thông thường, tuy vậy với việc config trong build.gradle, Gradle sẽ tự chạy các task tương ứng và làm điều này dùm chúng ta (cũng từa tựa cấu hình các step trong CI/CD vậy). !
Cài đặt thêm plugin để hỗ trợ node và các script của node
```
plugins {
	id "com.moowork.node" version "1.3.1"
}
```
Config cấu hình của node
```
node {
    version = '14.15.4'
    workDir = file("${project.projectDir}/src/main/fe/node")
}
```
Các task build
```
processResources{
    dependsOn 'vueBuild'
    dependsOn 'copyFrontendToBuild'
}

task copyFrontendToBuild(type: Copy) {
	from "$projectDir/src/main/fe/dist/"
    into "$buildDir/resources/main/static"
}

task vueBuild(type: YarnTask) {
	dependsOn 'vueInstall'
    execOverrides {
        it.workingDir = 'src/main/fe'
    }
    args = ['run', 'build']
}

task vueInstall (type: YarnTask) {
    execOverrides {
        it.ignoreExitValue = true
        it.workingDir = 'src/main/fe'
    }
    args = ['install']
}
```
Các task build sẽ bắt đầu chạy trong `processResources` đầu tiên là sẽ chạy vueBuild, mà cụ thể sẽ đợi vueInstall hoàn thành trước. Thứ tự sẽ giống với các step chúng ta khai báo ở trên. Sau đó, Gradle sẽ copy các file vừa build tới folder resource.
![](https://images.viblo.asia/2fb84cc2-d67e-4608-b3b0-69752543e83e.png)
![](https://images.viblo.asia/14185395-bc04-40e8-9eff-fff0c91124bc.png)
## 3. Build project
Chạy thử lệnh `gradlew clean build` hoặc `gradlew bootRun`(lệnh này sẽ chạy file jar vừa build luôn) và xem thành quả
![](https://images.viblo.asia/d7939a47-15e7-4947-aa4b-1061d916e3bf.png)
Các bạn cũng có thể chạy thử file jar vừa build tại build/libs bằng cách `java -jar <tên_file.jar>`
![](https://images.viblo.asia/376d3e82-60b6-4054-9e54-8c4c1fd742c6.png)
Các bạn có thể xem thử bằng trình duyệt http://localhost:8080/#/ xem thử đã thấy welcome page của vue hay chưa.