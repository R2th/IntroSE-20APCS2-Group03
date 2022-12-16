Bài gốc: [Các phương pháp hay nhất cho Git trong nhóm - Cách sử dụng Git Flow đúng cách](https://anonystick.com/blog-developer/cac-phuong-phap-hay-nhat-cho-git-trong-nhom-cach-su-dung-git-flow-dung-cach-2022071961655104)


Là một lập trình viên mới tham gia vào một công ty mới, thì việc code không bàn tới, nhưng cách làm việc nhóm trên git cũng là một điều quan trọng không hề kém. Nếu như bạn không hiểu câu chuyện về sử dụng Git Flow trong một Team thì có lẽ bạn sẽ lên đường sớm. Nhưng không sao, bài viết này sẽ giúp bạn đạt được điều đó. Nếu chỉ đọc không hiểu, thì bạn có thể xem video, điều đó sẽ giúp bạn tốt hơn.

## Git Flow trong team

Cũng giống như khi bạn viết code, thì đặt tính logic lên hàng đầu, thì việc quản lý code cũng cần một quy trình và đặc điểm kỹ thuật rõ ràng không kém. Và Vincent Driessen đã đề xuất [Mô hình phân nhánh Git thành công để giải quyết vấn đề này](http://nvie.com/posts/a-successful-git-branching-model/) và đã 10 năm tất cả mọi người cũng đồng ý.

Dưới đây là sơ đồ luồng của Git Flow. 

<img src="https://nvie.com/img/git-model@2x.png">

Nếu bạn không thể hiểu bức tranh trên? Không quan trọng, đó không phải lỗi của bạn. Mà do lỗi của tôi không hướng dẫn trước khi bạn vào công ty.

## Branch thường được sử dụng trong Git Flow

-   Branch `main`

Tức là nhánh `main` mà chúng ta thường sử dụng, nhánh này là dành cho `production`, được  hợp nhất từ các nhánh khác, nên nhớ không nên sửa đổi trực tiếp trong nhánh này.

-   Branch `develop`

Nhánh này là nhánh phát triển chính của team trong công ty và chứa tất cả code sẽ được phát hành cho phiên bản tiếp theo. Nên nhớ nhánh này hợp nhất với các nhanh khác ở dạng phát triển thêm tính năng `feature`.

-   Branch `feature`

Nhánh này chủ yếu được sử dụng để phát triển một chức năng mới. Sau khi quá trình phát triển hoàn tất, chúng tôi hợp nhất trở lại nhánh `develop` và tham gia các tính năng tiếp theo

-    Branch `release`

Khi bạn cần phát hành bản phát hành mới, chúng tôi tạo một nhánh bản `release` dựa trên nhánh `develop`. Sau khi  `branch release` hoàn tất, chúng ta sẽ `merge` nó và thành các nhánh `main` và `develop`.

-   Branch `hotfix`

Khi chúng tôi tìm thấy một lỗi mới trong dự án của chúng, nghĩa là trong môi trường `production` thì chúng ta cần tạo một nhánh `hotfix`. Sau khi `hotfix` hoàn tất, chúng tôi hợp nhất trở lại các nhánh `Master` và `Develop`, vì vậy những thay đổi trong `Hotfix` sẽ vào bản phát hành tiếp theo.

## VIDEO Cách triển khai git follow

Video: [Tóm tắt toàn diện về việc sử dụng Git và quy trình làm việc của GitFlow và sếp yêu cầu tôi phải học](https://www.youtube.com/watch?v=vQgcl8VouLU)