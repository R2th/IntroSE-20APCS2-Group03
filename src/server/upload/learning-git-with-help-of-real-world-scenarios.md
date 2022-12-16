Git là một công cụ kiểm soát phiên bản rất hữu ích giúp các nhà phát triển làm việc hiệu quả. Tuy nhiên, hiểu cách thực sự tận dụng tính linh hoạt và sức mạnh mà git cung cấp thường có thể khó khăn ngay cả đối với các nhà phát triển có kinh nghiệm trong ngành. Trong bài viết này, chúng ta sẽ cố gắng hiểu các tính năng khác nhau của git với sự trợ giúp của các kịch bản thực tế xảy ra khi làm việc với git.

## Scenario #1: Quên thêm 1 vài thay đổi trong commit trước / Chỉnh sửa commit message

Thường thì trường hợp chúng ta quên thêm một tập tin hoặc một thay đổi trong một commit. Nếu bạn từng thấy mình trong tình huống như vậy bạn không cần phải lo lắng. Bạn có thể chỉ cần sử dụng ***-amend*** để sửa đổi lần commit cuối cùng của bạn.

Giả sử bạn đang có 2 file chưa được commit:

> FileA.txt

> FileB.txt

Bạn thực hiện một số thay đổi ở chúng và tạo một commit:

> git commit -m 'first commit'

Sau khi tạo commit đầu tiên, bạn nhận ra rằng bạn cần thực hiện thêm một số thay đổi trong file FileB.txt. Trong trường hợp đó thay vì tạo một commit mới sau khi thay đôi FileB bạn có thể sử dụng cờ ***-amend*** để cập nhật lại commit trước đó

> git commit -amend

Sau một thời giạn nếu bạn nhận ra rằng mình cũng cần sửa đổi message của lần commit cuối cùng mà bạn đã tạo ra. Bạn cũng có thể làm được điều đó bằng cách sử dụng cờ ***-amend*** bằng cách sử dụng như sau:

> git commit -amend -m 'first commit modified'


## Scenario #2: Push một vài thay đổi  không được cho là đã commit

Đây là một case khá là phổ biến khi vô tình đẩy lên một vài thay đổi hay file mà không mong muốn có mặt trong commit của bạn. Giả sử bạn có một số file cấu hình hoặc file xác thực như AWS secrets hay .pem files. Chúng không nên được đẩy lên repo git. Một điều mà nhiều người có thể thử để loại bỏ những thứ không cần thiết từ repository:

- Pull code mới nhất từ repository.
- Xóa file không cần thiết
- Tạo một commit mới với những file không cần thiết đã bị xóa.
- Và đẩy những thay đổi đó lên lại.

Tuy nhiên, trong cách tiếp cận này, chúng ta đã không xóa hoàn toàn các file không cần thiết đó khỏi git. Bạn có thể thấy Git giữ lại dấu vết của tất cả các file mà bạn đã commit. Vì vậy, bất kỳ ai cũng có thể đào sâu vào lịch sử commit và truy cập vào những file mà bạn nghĩ đã xóa đi.

Thay vào đó, Git cho phép bạn thay đổi lại lịch sử. Vì vậy, giải pháp ở đây là sẽ di chuyển ngược trở lại commit an toàn trước đó và force push.

*git reset HEAD~n* là một câu lệnh cho phép bạn di chuyển về n lần commit trước. Vì vậy git rết HEAD ~2 sẽ đưa bạn trở lại 2 commit và cho bạn thấy những thay đổi của 2 lần commit cuối cùng.

*git reset HEAD-hard* sẽ xóa sạch toàn bộ thay đổi. Ví dụ bạn có các commit sau:

![](https://images.viblo.asia/53d516c7-c6df-4ae3-a053-8e00d45749db.png)

Bây giờ giả sử bạn muốn loại bỏ 2 commit cuối cùng (thêm AWS secrets và ,pem files)

Đầu tiên bạn sẽ lùi lại 2 commit
> git reset HEAD~2

Bây giờ bạn cần loại bỏ 2 commit

> git reset HEAD-hard

Cuối cùng là push code lên repo, bạn sẽ thấy lịch sử việc push .pem files đã bị loại bỏ. **Lưu ý: Việc force push lên remote repo là rất rủi ro vì nó thay đổi lịch sử trên nhánh git remote. Như một quy tắc, bạn không bao giờ nên force push lên nhánh master/stage. Hãy đảm bảo chắc chắn rằng bạn chỉ force push lên nhánh cá nhân của bạn và bạn thực sự hiểu mình đang làm gì**.

## Scenario #3: Cherry Picking

Cherry pick là một tính năng rất mạnh mẽ của git. Nó cho phép bạn chọn các commit từ một nhánh và merge nó vào một nhánh khách. Giả sử bạn đang ở nhánh develop là 3 commit trên master, trong số 3 commit đó, chỉ có commit thứ 2 cần merge vào master. Đây là cách mà bạn xử lý tình huống này trong git.

> Step1: checkout đến nhánh master

> Step2: sử dụng *git cherry-pick <commit-hash>* để merge chính xác commit được chỉ định vào nhánh master

Chú ý:  Bạn có thể xem toàn bộ commit bạn đã tạo và giá trị hash của chúng bằng *git log*

Cuối cùng nếu bạn muốn merge phần còn lại của nhánh develop với nhánh master đơn giản chỉ cần

> git rebase develop

Trên đây là một vài trường hợp có thể bạn sẽ gặp trong quá trình làm việc thực tế. Hy vọng sẽ giúp bạn phần nào làm việc với git dễ dàng hơn.