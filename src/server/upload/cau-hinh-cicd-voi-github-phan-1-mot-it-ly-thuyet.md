# CI/CD là gì?
Có rất nhiều khái niệm cả chính thống và cả tà đạo về CI/CD nhưng theo mình thì CI/CD hiểu đơn giản nhất là CI (Continuous Integration) và CD (Continuous Delivery) tức là quá trình tích và triển khai hợp nhanh và liên tục.

Về mặt khái niệm là vậy nhưng về mặt triển khai thì CI/CD là quá trình tự động thực hiện các quá trình build, test, release, deploy khi có các trigger như commit/merge code lên một branch định sẵn hoặc có thể là tự động chạy theo một lịch cố định.

Đây là một mô hình mà công ty minh đã apply cho một dự án:
![Mô hình CI/CD](https://images.viblo.asia/c334d2bd-3851-499c-9bc2-81c8631fdaf8.png)

* khi hoàn thành một feature thì teamlead tạo merge request rồi merge vào bran develop, đúng 5h chiều hàng ngày hệ thống sẽ tự động build, test, quét sonar.... và deploy lên develop eviroment (quá trình này là CD), không trtigger merger code để deploy với branch này vì code được merge vào đây liên tục nếu trigger merger code sẽ dẫn đến việc build liên tục, làm chậm hệ thống.
* với branch prepro thì sẽ được trigger mỗi lần có sự thay đổi về code sẽ tự động thực hiện các bước như với branch develop.
* Với branch master thì có hơi khách một chúc, Git cũng sẽ tự động trigger và tiến hành các bước build, run unit test, quét sonar.... nhưng không tiến hành deploy (quá trình này chỉ là CI) lên server mà chỉ được deploy khi có confirm từ một người có quyền hoặc deploy bằng tay để đảm bảo quá trình delevery sản phẩm không xảy ra lỗi và đúng với thời gian khách hàng mong muốn.
# Giới thiệu về GitHub Actions
Github actions được sinh ra để hỗ trợ việc tự động hóa các tác vụ trong vòng đời của một phần mềm.  Git actions hoạt động theo hướng sự kiện, nghĩa là nó sẽ thực hiện một loạt commands đã được định nghĩa sẵn khi có một sự kiện được xảy ra. Ví dụ như, bạn có thể cấu hình để mỗi khi có người tạo một mergers request lên một repository nào đó hệ thống sẽ tự động run commands để run các unit test case của bạn.

Mô hình mô tả cách một git actions có thể tiến hành một công việc bất kì (như trong ví dụ trên là run các unit test case có sẵn). Một sự kiện sẽ tự động kích hoạt workflow đã được định nghĩa sẵn trong một job. Mỗi job sử dụng steps control để kiểm soát acttions. Actions là  comands thực hiện một hành động cụ thể nào đó (run các unit test case)
![overview về một github actions](https://images.viblo.asia/0bf9bf23-94a6-46b4-9276-e9622cf3c47d.png)

## Các thành phần của một Github Actions
Dưới đây là danh sách nhiều thành phần của GitHub Acttions hoạt động cùng nhau để chạy công việc. Bạn có thể thấy các thành phần này tương tác với nhau như thế nào.
![Các thành phần của một Github Actions](https://images.viblo.asia/7b04552b-2918-4a89-adb1-23fc6a708233.png)

**Workflows** là một tập các hành động mà bạn thêm và reponsitory của mình để định nghĩa các hành động. các jobs trong workflows có thể được thực thi theo lịch hoặc dựa vào một trigger nào đó. Workflows có thể được định nghĩa để build, test, release, deplpy.... một dự án trên Github. Một workflows được định nghĩa bằng file yml.

**Events** là một trigger đặc biệt để workflow bắt đầu. ví dụ như, bạn có thể cấu hình để workflow bắt đầu khi có một người nó đó push code hoặc tạo merger request lên branch develop. Bạn có thể sử dụng [repository dispatch webhook](https://docs.github.com/en/rest/reference/repos#create-a-repository-dispatch-event) để trigger một workflow khi một sự kiện bên ngoài xảy ra (Đọc cho vui chứ đoạn này cũng không dùng mấy ;) ). Các bạn có thể xem danh sách các events có thể dùng để trigger một workflow ở [đây](https://docs.github.com/en/actions/reference/events-that-trigger-workflows).

**Jobs** là tập hợp các bước thược hiện một công việc của một runner. Mặc định thì các jobs trong một workflow được chạy song song. Bạn cũng có thể cấu hình để các jobs chạy một các tuần tự. Ví dụ trong một workflow có thể có jobs là build, run test case. Nhưng nếu build fails thì test case sẽ không được run. 

**Steps** là một tác vụ độc lập nó có thể là một command trong một jobs. Mỗi steps có thể là một action hoặc một command để thực hiện một hành động nào đó. Mỗi step trong một job thực thi trong cùng một runner, có thể share data từ steps này với step khác.

**Actions** là một command độc lập khi kết hợp lại tạo thành một steps để tạo ra jobs trong workflow. Actions là đơn vị nhỏ nhất của một workflow là thành phần trực tiếp thực hiện các tác vụ mong muốn. 

**Runners** là một server được cài đặt sẵn [GitHub Actions runner application](https://github.com/actions/runner). Bạn có thể sử dụng runner hosted bởi GitHub hoặc bạn có thể tự host cho mình để sử dụng. Một runner luôn sẵn sàng lắng nghe các jobs, run một job tại một thời điểm, report process, logs và trả kết quả về cho GitHub. Với GitHub-hosted runner mỗi job được runs trên một máy ảo hoàn tòan mới (Điều này có nghĩa là mỗi job bạn đều cần có bước setup môi trường từ đầu )

GitHub-hosted runner chạy trên Ubuntu Linux, Microsoft Windows và MacOS. Các bạn có thể đọc thêm thông tin ở ["Virtual environments for GitHub-hosted runners."](https://docs.github.com/en/actions/reference/specifications-for-github-hosted-runners). Nếu bạn muốn một hệ điều hành khác hoặc một cấu hình phần cứng cụ thể bạn có thể host một Github-hosted runner cho mình, xem thêm thông tin ở ["Hosting your own runners."](https://docs.github.com/en/actions/hosting-your-own-runners).

Nguồn tham khảo: https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions, https://docs.github.com/en/actions/reference/events-that-trigger-workflows, https://github.com/actions/runner, https://docs.github.com/en/actions/reference/specifications-for-github-hosted-runners