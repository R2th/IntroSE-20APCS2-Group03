Ở bài trước chúng ta đã tìm hiểu quá trình để tự động deploy hệ thống (CI/CD) và [cấu hình CI/CD với CricleCI & Docker](https://viblo.asia/p/tim-hieu-cicd-voi-circleci-docker-Eb85oOBO52G) nếu bạn nào nào chưa tìm hiểu về CI/CD thì ghé qua chút để hiểu kỹ hơn nhé. Ở bài này mình sẽ cùng nhau tìm hiểu cách cấu hình CI/CD trên git bằng github actions.

![image.png](https://images.viblo.asia/3fc5ff7b-667c-49f8-833a-9835b5dabc9a.png)


-----
-----

# Tìm hiểu về Git Actions
  GitHub Actions là một event-driven nghĩa là chương trình chạy một loạt các dòng lệnh khi bạn nhận được 1 event, ví dụ mỗi lần một developer nào đó tạo một pull request cho một repository nào đó thì dòng lệnh build được thực thi.
##   Các thành phần trong GitHub Action
![image.png](https://images.viblo.asia/ef631e44-62a6-422f-8cb1-270ddfcc2998.png)

* **Workflows**: Là một thủ tục tự động, workflows được tạo bởi một hay nhiều job và các job này có thể chạy theo định kỳ hoặc trigger chạy khi nhận được một event nào đó. 
* **Events**: Là một hành động ấn định để trigger một workflow, ví dụ khi một developer tạo một nhánh develop nào đó thì event này được gửi tới workflow, hoặc bạn có thể sử dụng webhook khi nhận một event bên ngoài trigger vào workflow. 
* **Jobs**: Là một tập các steps để thực thi trên cùng một runnner. Mặc định với một workflow chạy nhiều job thì các job này chạy song song (parallel).
* **Steps**:  Là những tác vụ riêng rẽ để chạy các command (mà còn gọi là action),  mỗi step trong một job thực thi trên .

* **Actions**: Là một building block, có tính portable được build sẵn,  bạn có thể tạo riêng một action riêng cho bạn. 
* **Runners**: Là một server mà GitHub Actions cài đặt các ứng dụng trong nó. Bạn có thể sử dụng runner của github hoặc bạn có thể sử dụng server riêng của bạn. Github runner hỗ trợ các hệ điều hành: Ubuntu Linux, Microsoft Windows, and macOS.

Đây là ví dụ github action cơ bản, sử dụng **runners** ubuntu chạy các câu lênh "**echo** "

{@embed: https://gist.github.com/thanhtb-2411/1aba2e7eb2a221ceaa28726a5500c2c9}

# Thực hành
## 1. Tạo react app demo
*  Ở đây mình sử dụng lại repo [ bathanh/reactApp ](https://github.com/thanhtb-2411/ReactCICD)của bài trước, nhưng mình sẽ bỏ phần config cricleCI.
*  Bạn cũng có thể init 1 project reactjs khác
```
npx create-react-app my-app
cd my-app
npm start
```
## 2. Chuẩn bị biến môi trường Actions secrets
* Tương tự bài trước chúng ta cũng cần phải có các biến môi trường sau. 

![git7.png](https://images.viblo.asia/f939507a-9b1e-4092-bb09-0ab16df7b128.png)

* Nếu bạn nào không biết lấy các biến môi trường này như thế nào thì xem lại bài [Tìm hiểu CI/CD với CircleCi + Docker](https://viblo.asia/p/tim-hieu-cicd-voi-circleci-docker-Eb85oOBO52G)
## 3. Tạo Workflows
Chúng ta tạo file` cicd.yml` trong folder `.guthub/workflows`. 
{@embed: https://gist.github.com/thanhtb-2411/8e477057fd4f0b850f69048645812b53}

Ở Workflows này mình chỉ triger branch master để deploy thôi các bạn có thể tạo thêm workflows triger cho các nhánh khác.

Mình tạo 1 job có tên là docker chạy ubuntu để thực hiện các steps:

1.  Checkout nhánh hiện tại vào trong con ubuntu
2.  Thực hiện Unitest với node version 14
3.  Login vào dockerhub
4.  Setup Docker Buildx
5.  Build and Push Docker Image lên dockerhub
6.  SSH deploy

Nếu 1 trong các step trên bị fail thì các step dưới sẽ không được chạy nữa.

## 4. Kết quả
Chúng ta vào github chọn actions để xem các [Jobs](https://github.com/thanhtb-2411/ReactCICD/runs/3633305706?check_suite_focus=true) chạy nhé. 

Bây giờ chúng ta tạo 1 [PR lên master](https://github.com/thanhtb-2411/ReactCICD/pull/12) nhé và hình dưới là là job deploy của chúng ta đã chạy thành công sau khi PR được merged 

![thanhthanh.png](https://images.viblo.asia/4d7f789e-678e-4a6d-aab9-8ca044b459f6.png)

Và thành quả cuối cùng, các bạn vào [thanhtb.com](http://thanhtb.com/)  để kiểm tra nhé. 

# Tổng kết
* So với việc cấu hình CI/CD trên CircleCI thì mình thấy sử dụng github actions khá là dễ và gần gũi hơn với chúng ta. Github actions làm được rất rất là nhiều thứ chứ không phải mỗi chạy CI/CD đâu nhé. Còn nó có thể làm gì thì các bạn có thể  vào [document](https://docs.github.com/en/actions/quickstart) để xem chi tiết hơn.
*  Bài viết của mình xin được kết thúc tại đây. Cảm ơn các bạn!
# Tài liệu tham khảo
Quickstart for GitHub Actions: https://docs.github.com/en/actions/quickstart