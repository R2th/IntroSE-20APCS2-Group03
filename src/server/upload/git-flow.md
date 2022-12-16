![](https://images.viblo.asia/ab2e549c-32dc-48c3-b928-e4c0b26d99ca.png)

Dành cho những bạn còn gặp nhiều vấn đề về process dùng git và kiến thức branch trong dự án giống như mình.
# Khái quát về git-flow
git-flow là tên gọi của 1 tool (command) hỗ trợ branch model gọi là **A successful Git branching model** do Vincent Driessen đề xuất ra.
Người ta thường gọi đó là model hay tool, và trong git-flow có 5 kiểu với mỗi vai trò khác nhau (tùy trường hợp mà có lúc là 6 kiểu), switch các kiểu với nhau để phát triển
Bằng việc set trước các branch, những rule khi merge, dù có bao nhiêu developer cùng thời điểm phát triển vẫn có thể quản lý branch dễ dàng, và tránh được những vấn đề do merge
Tiếp theo, chúng ta cùng xem về các kiểu của branch có trong git-flow
# 6 kiểu branch được định nghĩa trong git-flow
Trước khi vào chi tiết chúng ta xem qua về định nghĩa các kiểu branch trong git-flow trước nhé.
## master brach
Branch master là branch được tạo mới repository và tạo mặc định trong Git. Những người mới bắt đầu thường có xu hướng commit trực tiếp và branch master, nhưng trong git-flow thì ta không commit trực tiếp vào master, mà đây chỉ là branch dùng để thực hiện merge, nên chúng ta lưu ý nhé.
## develop branch
Branch develop là branch trung tâm cho việc phát triển. Do với mỗi thay đổi ta lại ngắt branch feature tương ứng cho nên có thể nói đây là branch được dùng nhiều nhất trong quá trình phát triển. Cần đặt tên branch sao cho người khác có thể biết được ngay nội dung thay đổi là gì. Mỗi branch được ngắt ra để làm n ày sau khi làm xong ta lại merge vào develop, merge xong sẽ  xóa nó đi.
## release branch
Branch release là branch dùng để release sản phẩm như đúng tên gọi của nó. Khi release sản phẩm thì có rất nhiều những task liên quan khác cần thiết nữa, những task liên quan đó sẽ được release trên branch release mà ta ngắt ra từ branch develop. Sau khi release xong, sẽ merge vào branch master và branch develop, ghi release tag vào merge commit của branch master sau đó xóa branch release đi.
## hotfix branch
Khi release sản phẩm cũng có khi ta phát hiện ra bug rất nghiêm trọng, chắc hẳn mọi người cũng từng trải qua vấn đề này rồi nhỉ?
Những lúc như vậy ta sẽ ngắt ra branch hotfix trực tiếp từ branch master để tiến hành sửa, sau khi sửa xong sẽ merge vào master và develop và ghi lại release tag. Sau đó sẽ xóa branch hotfix đi. 
## support branch
Cũng không phải PJ nào cũng cần,  có chăng nó đặc thù với những PJ cần tiếp tục support các version cũ. Ở branch này sẽ thực hiện lưu version cũ và release
# Thực hành git-flow
Phần thực hành này ta sẽ lấy ví dụ về 1 app đơn giản có sử dụng JavaScript để hiểu process phát triển sử dụng git-flow.
## Đặc tả cho chương trình sẽ tạo
Dựa trên vấn đề Fizz Buzz nổi tiếng, ta program theo đặc tả dưới đây
Số đã nhập mà chia hết cho 3 thì hiển thị là Fizz
Số đã nhập mà chi hết cho 5 thì hiển thị Buzz
Số đã nhập mà chia hết cho cả 3 và 5 thì hiển thị là FizzBuzz
Nếu ko rơi vào trường hợp nào ở trên thì hiển thị nguyên số đã nhập
## Tạo Git repository
Trước hết ta cần tạo repo, tạo folder mới cho PJ, ở đây với ví dụ này ta sẽ tạo folder với tên fizzbuzz.
Sau khi tạo folder xong thì lập console rồi set nó thành current folder. Với những người dùng trên môi trường Windows, ấn giữ shift và click chuột phải thì sẽ thấy hiện ra mục “Mở command window tại đây”

![](https://images.viblo.asia/5902505a-bd17-4553-b9b9-655361a6f431.png)

Tiếp theo, dùng command dưới đây tạo repository mới. Thông thường thì dùng *git init*  để tạo nhưng vì ta đang làm theo cách git-flow nên sẽ phải là *git flow init*
 
`git flow init`
 
![](https://images.viblo.asia/cbbef2e7-09b8-435c-ba63-b89d2e28d3d0.png)

Như vậy là ta chuẩn bị xong repo. Thời điểm này ở repo mới chỉ có branch master và develop

## Ngắt branch feature tạp application base
Repo chuẩn bị xong thì ta cần tạo app base. Để thực hiện thì cần có branch feature, thao tác này rất dễ gây ra miss không đáng có nếu thao tác thủ công nên ta hãy thực hiện bằng command sau. Ở đây, ta sẽ tạo branch có tên *implement-app-base*
 
`git flow feature start implement-app-base`
 
Thì tự động branch feature sẽ được tạo từ develop.
Như vậy là ta đã có được đầy đủ môi trường để có thể bắt tay vào phát triển, nên ta sẽ thêm file HTML để làm app base. Ở đây ta sẽ tạo file có nội dung như sau, tên file đặt tên là index.html, để trong folder fizzbuzz
 
```
<!doctype html>
<html>
 
<head>
    <meta charset="utf-8">
    <title>Fizz Buzz</title>
</head>
 
<body>
    <div>
        <input type="text" id="input-number">
        <button id="run">Run</button>
    </div>
    <div>
        <p id="output"></p>
    </div>
    <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="app.js"></script>
</body>
 
</html>
```
 
Đây chỉ là page đơn giản gồm text box và 1 button. Do sử dụng jQuery nên nó đang đọc từ CDN, nếu mà thêm vào thì nhập cmd sau rồi commit lên. 
 
`git add *
git commit -m Created app base`
 
Đến đây trạng thái của repo sẽ như sau
![](https://images.viblo.asia/9d601a87-0461-494b-9cd4-d9937001d72c.png)

Hoàn thành thao tác rồi thì ta merge vào branch develop bằng cmd git-flow
 
`git flow feature finish implement-app-base`
 
![](https://images.viblo.asia/88b17e6d-9cac-48f9-8be3-f7813735d451.png)

Thực hiện cmd xong đồng nghĩa với việc merge vào develop đã hoàn tất và branch feature đã được xóa, lúc này repo sẽ chỉ còn lại 2 branch master và develop
## Tiếp tục ngắt branch feature để làm chức năng app
Tiếp đến ta sẽ thực hiện chức năng bằng JavaScript, giống như bước trên ta tạo tên mới cho branch lần này như sau
 
`git flow feature start implement-fizz-buzz`
 
![](https://images.viblo.asia/3c63b0d5-8836-48ca-8e1c-bec44582f2f7.png)

Ở Fizz Buzz có rất nhiều giải pháp nhưng để dễ hiểu nên ta lấy ví dụ sau, đặt tên file là *app.js*
 
```
$("#run").click(function () {
    var n = $("#input-number").val();
    if(n % 3 === 0 && n % 5 === 0) {
        $("#output").text("FizzBuzz");
    }
    else if(n % 3 === 0) {
        $("#output").text("Fizz");
    }
    else if(n % 5 === 0) {
        $("#output").text("Buzz");
    }
});
```
 
Thực hiện xong chức năng cần thiết thì ta commit lên, merge vào develop và xóa branch đã ngắt ra giống như trình tự đã nêu.
## Release
Đến bước này ta thử làm thao tác release coi phần đã thực hiện như là version 1.0, như đã nói ở trên ta cần có branch release, ta có cmd như sau:
 
`git flow release start 1.0`
 
![](https://images.viblo.asia/8396b1dc-8f01-427a-8b8c-af9a53987739.png)

Công cuộc release, ta cần lưu ý là phải ghi số version vào title của page. Sửa tag tilte của file HTML như sau rồi commit lên:
 
`<title>Fizz Buzz v1.0</title>`
 
Bây giờ ta sẽ merge lên branch release, đến đây chắc các bạn biết cần dùng cmd nào rồi nhỉ:
 
`git flow release finish 1.0`
 
Chạy cmd này thực tế nó sẽ xử lý rất nhiều, đúng như messege của cmd, sẽ có những xử lý theo trình tự như sau:
Merge branch release vào master
Gắn tag release vào branch master
Merge branch master (tag 1.0）vào develop
Xóa branch release
Lúc này repo sẽ có trạng thái như sau:

![](https://images.viblo.asia/e808f0a0-978a-48df-a69d-b19c8b3d3b4b.png)

Phần release đến đây là hoàn thành!
# Tổng kết
Các bạn chắc hẳn đã nắm được bước thực hiện khi sử dụng git-flow rồi nhỉ.
Nhất định hãy vận dụng thuần thục nó vào thực tế nhé.
Tôi bổ sung thêm, trong số branch model của Git, ngoài ra còn rất nhiều các kiểu model khác như là GitHub Flow, GitLab Flow, với mỗi sắc thái ưu điểm nhược điểm riêng nên chúng ta cũng sẽ cùng tìm hiểu thêm về các model khác đó nữa nhé.

[Xem bài gốc tại đây.](http://tracpath.com/bootcamp/learning_git_git_flow.html)