## Lời mở đầu
Trước khi bắt đầu bài viết này cho mình xin phép tâm sự đôi lời. Hiện tại thì mình cũng đang là một developer. Mình gặp rất nhiều bạn newBie, mới vào nghề, chưa có kinh nghiệm làm việc nhiều nên hầu hết các bạn này rất lúng túng khi làm việc với Git (Git cơ bản thôi nhé), hoặc thậm chí có bạn còn chưa biết Git là gì, chưa biết làm việc với nó như thế nào. Trên quan điểm của mình, việc này không phải lỗi của bạn ấy, chẳng qua các bạn ấy chưa có cơ hội để sử dụng Git, nên chưa tìm hiểu. Nhưng, sẽ là lỗi của các bạn ấy, nếu trong dự án sử dụng Git mà lại không tìm hiểu.

Vậy nên, mình xin mạnh dạn chia sẻ về Git trong bài viết này với hy vọng sẽ giúp ích được những bạn đang ở trong trường hợp kể trên. Hoặc chí ít cũng là một tài liệu tham khảo hữu ích để giúp các bạn mới có thể hiểu Git hơn, tự tin làm việc trôi chảy với Git hơn. Mặc dù, đây không phải là kiến thức cao siêu gì. Mình xin kết thúc lời mở đầu của mình tại đây. Các bạn hãy dành một chút xíu thời gian để lướt qua Table of contents (mục lục) ở bên phải màn hình nhé. Nào, xin mời các bạn vào phần chính.

## Version Control System (VCS)
### VCS là gì?
Trước hết, hãy bắt đầu với VCS. VCS là gì? VCS là viết tắt của **Version Control System** tạm dịch là **Hệ thống quản lý phiên bản**. Sỡ dĩ được gọi như vậy là vì các VCS sẽ lưu trữ tất cả các file trong dự án và ghi lại toàn bộ lịch sử thay đổi của file, mỗi sự thay đổi **được lưu lại** sẽ được ***phiên bản hóa*** thành một version (phiên bản). (Để ý giúp mình từ "được lưu lại", mình sẽ giải thích thêm ở phần **Commit**).

Và tất nhiên, bạn có thể xem lại danh sách các sự thay đổi của file như xem một timeline của các version. Mỗi version bao gồm: nội dung file bị thay đổi, ngày giờ sửa đổi, người thay đổi là ai, lý do thay đổi hay tên version...

### VCS sinh ra để làm gì?
Có hai điều quan trọng nhất để tạo ra một VCS:
1. Lưu lại lịch sử các phiên bản của bất kỳ thay đổi nào của mã nguồn. Giúp xem lại các sự thay đổi hoặc khôi phục lại sau này. Như mình đã trình bày ở trên.
2. Chia sẻ mã nguồn trở nên dễ dàng hơn khi kết hợp với các hosting-service để lưu trữ các version-control. Có để public cho bất kỳ ai, hoặc private chỉ cho một số người có thẩm quyền có thể truy cập và lấy source về.

### Phân loại VCS
Đối với các hệ thống VCS, hiện tại chúng được phân ra gồm ba loại dựa trên cách lưu trữ và chia sẻ các phiên bản:
- **Local Version Control System** - Hệ thống quản lý phiên bản cục bộ.
- **CVCS - Centralized Version Control System** - Hệ thống quản lý phiên bản tập trung. 
- **DVCS - Distributed Version Control System** - Hệ thống quản lý phiên bản phân tán (***Git là thuộc loại này***).

Trong nội dung hôm nay mình không đề cập nhiều tới phần này. Các bạn vui lòng tham khảo thêm [tại đây](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control).

## Git là gì?
`Git` chính là một hệ thống VCS cho dự án của bạn. Chính vì là một VCS ở trên nên Git cũng ghi nhớ lại toàn bộ lịch sử thay đổi của source code trong dự án. Bạn sửa file nào, thêm dòng code nào, xóa dòng code nào, bỏ thừa dấu ở đâu .etc. Tất tần tật đều được Git ghi lại.

Điểm khác biệt của Git so với các VCS khác (như Subversion...) chính là "cách Git nghĩ về dữ liệu". Phần lớn các hệ thống khác coi thông tin được lưu trữ như là một tập hợp các file kèm theo các thay đổi được thực hiện trên mỗi file theo thời gian, như hình bên dưới.

![](https://git-scm.com/figures/18333fig0104-tn.png)

Tuy nhiên ở Git, lại coi thông tin được lưu trữ là một tập hợp các snapshot (ảnh chụp toàn bộ nội dung tất cả các file tại thời điểm). Mỗi khi bạn "commit", Git sẽ "chụp" và tạo ra một snapshot cùng một tham chiếu tới snapshot đó, như này:

![](https://git-scm.com/figures/18333fig0105-tn.png)

Đó là cách Git nghĩ về dữ liệu. Để cài đặt Git, vui lòng truy cập [trang Download của Git](https://git-scm.com/downloads) để tải về và làm theo hướng dẫn cài đặt.

## Sử dụng Git như thế nào?
Sau khi cài đặt, Git được sử dụng thông qua cửa sổ dòng lệnh với terminal (command-line). Ví dụ như này:

```bash
git init
git add .
git commit -m "Save my first changed"
```

Ngoài ra cũng có một số GUI tool giúp bạn dùng mà không phải dùng lệnh. Nhưng mà mình thấy nó chẳng cần thiết chút nào. Dùng terminal là xong hết, mà lại đơn giản. Dùng tool lại phải cài đặt, rồi phải học cách dùng, bla bla... :D

Trong bài này, chúng ta sẽ sử dụng Git trên terminal nhé. Không có tool tiếc gì ở đây :P cả.

## Repository
### Repository là gì?
Trong Git, Repository là một kho chứa, lưu trữ source code của bạn. Có hai loại repository, mình tạm gọi là:
- **Local repository**: Là repository được lưu tại một máy tính không. Bạn có thể thêm, sửa, xóa file, tạo ***"commmit"*** để lưu lại nhưng chưa thể dùng để chia sẻ tới người khác được. Để tạo local repository, đơn giản tại folder chứa source, sau đó bạn thực hiện command line:
    ```bash
    # Create local repository:
    > git init
    Initialized empty Git repository in /home/ubuntu/my-project/.git/
    ```
- **Server repository**: Là repository nhưng được lưu tại server của các hosting-service sử dụng Git. Một số hosting-service các bạn có thể biết như: [Github](https://github.com), [Gitlab](https://gitlab.com), [Bitbucket](https://bitbucket.org)... Repository này có thể dùng để share tới những người khác để họ có quyền truy cập và lấy source code về. Để tạo server repository, bạn đơn giản truy cập vào trang web của hosting-service bạn dùng và thực hiện qua vài cú click tùy nhà cung cấp dịch vụ.

### Làm việc với repository
1. Tạo một repository trên máy, ta chỉ cần tạo một folder cho nó, rồi thực hiện câu lệnh:
    ```bash
    > git init
    ```
2. Tạo một local repository từ server repository:
    ```bash
    > git clone repository_url
    ```

Đó là tổng kết toàn bộ kiến thức về repository trong Git. Bây giờ chúng ta hãy chuyển sang phần tiếp theo nhé!

## Commit
Tiếp đây cũng là một khái niệm quan trọng của Git nên các bạn chú ý nha. Cho bạn xem một cái ảnh này trước đi ha (Ảnh Google):

![](https://images.viblo.asia/6525d9ce-66c9-4e2d-a462-6702bb2caf2a.png)

Quay lại với bức hình cái cây ở trên. Bạn để ý sẽ thấy trên mỗi cành đều có những quả tròn màu xanh, đỏ, vàng. Mỗi quả tương ứng với một "commit". Vậy commit là gì?

### Commit là gì?
Trên mỗi ***branch*** bạn làm việc, sau khi sửa đổi các file source code... Những thay đổi đấy cần **được lưu lại** bằng cách tạo ra một điểm mốc đánh dấu. Điểm đánh dấu các thay đổi này gọi là **Commit**. Tại mỗi commit, git chụp lại toàn bộ dữ liệu, tạo ra một snapshot version hóa dữ liệu.

> Như vậy, một version mới được tạo ra bằng cách tạo một "commit" cho các sự đổi của dữ liệu.

Mỗi commit được tạo ra gồm một số thông tin chính:
- Tên và email của ngưởi tạo commit
- Ngày giờ commit được tạo ra
- Message: Mô tả cho sự các sửa đổi (Để sau này xem lại còn biết nó sửa vì mục đích gì)
- Một ID là một chuỗi SHA gồm 2 dạng: Full và Short.
    - Full: Chuỗi SHA đầy đủ
    - Short: Là 7 ký tự đầu tiên được cắt ra từ chuỗi Full

### Làm việc với commit
1. Tạo một commit lưu lại các thay sửa đổi.
    ```bash
    # Cú pháp: git commit -m <message>
    > git commit -m "Message mô tả thay đổi"

    # Lưu lại thay đổi nhưng gì đè lên commit trước đó:
    > git commit --amend -m "Message mô tả thay đổi"

    # Ghi đè commit trước đó và đổi người tạo commit:
    # git commit --amend --author "Your name <your email>" # Chú ý ghi cả dấu < > trong case này.
    > git commit --amend --author "Nguyen Huu Kim <nguyen.huu.kim@framgia.com>"
    ```
2. Xem lại danh sách `n` các commit đã tạo gần đây:
    ```bash
    # Cú pháp: git log -<n>
    > git log -5
    # Hiển thị mỗi commit trên một dòng
    > git log --oneline -5
    ```
3. So sánh cá thay đổi của code trước khi add thay đổi vào commit
    ```bash
    > git diff
    ```
4. Tạo commit vào message trên nhiều dòng (mặc định chỉ trên một dòng), sử dụng dấu `'` thay thế `"` khi tạo message:
    ```bash
    > git commit -m '- First line
    > - Second line'
    ```
5. Gộp nhiều commit làm 1 commit. VD: Gộp 3 commit gần nhất làm 1.
    - Thực hiện command:
    ```bash
    > git rebase -i HEAD~3
    ```
    - Một file mới hiện ra với danh sách 3 commit gần nhất.
    ```bash
    pick fd3fea3 Three
    pick fd3fea2 Two
    pick fd3fea1 One
    ```
    Dòng commit đầu giữ nguyên, hai dòng thứ 2, 3 sửa pick thành `s` để gộp. Sửa `pick` thành `d` để xóa commit tại dòng đó. Ctrl+O, Enter để lưu lại.
    - Sửa lại commit message, chèn dấu `#` vào đầu dòng các commit message để loại bỏ message đó. Để lại một message cho commit mới sau khi gộp. Ctrl+O, Enter lưu lại là xong.
6. Resolve conflict sau khi tạo merge request. Checkout về branch mà bạn dùng để gửi merge_request.
    - Fetch mới lại target branch của merge request trên máy bạn:
        ```bash
        > git fetch <remote_name> <target_branch_name>:<target_branch_name>
        ```
    - Rebase lại target branch
        ```bash
        > git rebase <target_branch>
        ```
        Sau khi chạy lệnh rebase, những file bị conflict sẽ hiện thị với từ khóa conflict. Bạn mở các file đấy lên và xem những phần code bị conflict. Những đoạn code này sẽ được chia ra thành 2 phần, phần nửa trên là code hiện tại của target_branch, nửa dưới là code mà bạn đang sửa. Hãy đọc và giữ lại những phần code phù hợp. xóa bỏ các dấu == phân cách.
    - Thêm lại các file sửa đổi vào commit và kết thúc rebase
        ```bash
        > git add .
        > git rebase --continute
        ```
    - Trường hợp bạn chưa biết resolve những đoạn conflict như nào, có thể huỷ bỏ quá trình rebase bằng cách:\
        ```bash
        > git rebase --abort
        ```


> Trước khi tạo một commit, nếu bạn chưa config thông tin định danh của bạn, git sẽ yêu cầu bạn config thông tin định danh của bạn trước khi cho phép commit. Câu lệnh config:
> ```bash
> > git config user.name "Nguyen Huu Kim"
> > git config user.email "kimnh@webee.asia"
> ```

## Branch

### Ví von vui về Branch
Trong một project, mình hay ví von vui như này. Nếu mình coi Repository bên trên như là một cái gốc cây. Thì Branch sẽ các cành, các nhánh con phát triển từ cái gốc (Repository) mà thành như hình cái cây bên trên. Như bạn biết, một cái cây thì phải có một thân cây to đùng. Cái thân cây cũng chẳng qua chỉ là một cái nhánh (branch), chỉ khác là nó to mà thôi. Và nó là cái Branch chính **để sinh ra (checkout)** những branch nhỏ hơn tạo thành một cây project sum sê. Trong Git, cái thân cây đó chính là branch chủ đạo có tên là ***master*** :D.

### Branch sinh ra để làm gì?
Như đã trình bày, master branch là nhánh chính. Sau khi bạn dùng lệnh tạo repository, master branch sẽ tự động được tạo ra. "Commit" của các thay đổi đầu tiên được tạo cũng sẽ được lưu vào master branch. Hãy tưởng tượng, nếu sau khi tạo repository, bạn chỉ có lưu các thay đổi lại dưới dạng một **commit**. Như vậy, tất cả chỉ source code của project chỉ lưư tập trung tại một branch master, và cái cây Git này nó đang là một cây thân cọc trơ trụi :D.

Một dự án công nghệ thì có nhiều tính năng, khi bạn đang code dở chừng một chức năng A nhưng khách hàng thay đổi muốn có chức năng B trước, hoặc họ muốn phát triển đồng thời cả hai. Rõ ràng, chúng ta không thể lưu chung tại một branch master mãi được. Do đó, branch sinh ra để giải quyết vấn đề này. Mỗi branch cho các chức năng A, B riêng và phát triển riêng biệt. Và chúng ta có thể lưu lại công việc dở dang trên mỗi branch, chuyển đổi qua lại giữa chúng; Cũng có thể gộp hai branch lại. Và bây giờ, cái cây thân cọc đã mọc thêm nhiều branch từ `master` branch.

### Làm việc với branch
Học đi đôi với hành, hãy đút túi những câu lệnh sau để sử dụng branch trong Git nhé. Giả sử bạn đang ở master sau khi tạo mới repository nhé.

1. Tạo một branch mới có tên là `feature/a`:
    ```bash
    # Cách 1, chỉ thực hiện tạo branch:
    > git branch feature/a
    # Cách 2, tạo mới branch và chuyển luôn sang branch đấy để code:
    > git checkout -b feature/a
    ```
2. Xem danh sách branch hiện có:
    ```bash
    > git branch
      feature/a
    * master
    ```
    Branch hiện tại bạn đang working sẽ có dấu `*` ở đầu dòng. Khi có qua nhiều branch trong danh sách, git sẽ hiển thị dạng ScrollView, bạn nhấn nút điều hướng lên/xuống để cuộn lên/xuống. Muốn thoát khỏi chế độ cuộn, gõ:
    ```bash
    > :q
    ```
    Rồi nhấn `Enter` để thoát khỏi danh sách.
3. Chuyển đổi qua lại giữa các branch
    Để thực hiện chuyển đổi qua lại giữa các branch, thực hiện command:
    ```bash
    > git checkout <branch_name>
    # Ví dụ:
    > git checkout feature/a
    ```
    Khi muốn chuyển sang một branch khác, hãy hết sức lưu ý rằng bạn cần phải tạo thói quen commit lại các thay đổi trước khi chuyển bằng lệnh:
    ```bash
    > git commit -m "My message for note"
    ```
4. Xóa branch:
    ```bash
    # Xóa local branch
    > git branch -D branch/name
    # Xóa remote branch <xem phần dưới>
    > git push remote_name branch/name --delete
    ```
5. Đẩy code lên remote branch
    ```bash
    # Cú pháp: git push <remote_name> <branch_name>
    > git push origin master
    # Nếu muốn bắt buộc ghi đè lên remote branch, thêm -f (force)
    > git push orgin master -f
    ```
6. Merge branch, để merge code từ nhánh B vào nhánh A.
    - Checkout về nhánh A
        ```bash
        > git checkout A
        ```
    - Merge nhánh B vào
        ```bash
        > git merge B
        ```
    - Nhập message, lưu lại là xong.

## Remote và Remote branch
### Remote
Để đẩy code lên server repository, chúng ta cần các tham chiếu tới server repository tương ứng. Các tham chiếu này được gọi là `Remote`. Mỗi remote sẽ có các thông tin:
- Tên remote
- URL: đường link tới repository (Có hai dạng tương ứng cho 2 giao thức http và ssh).

> Khi sử dụng URL dạng HTTP, mỗi khi bạn thao tác với server repository bạn sẽ phải nhập username và password. Còn URL dạng cho ssh, bạn sẽ không phải nhập username, password nữa.

> Mặc định, sau khi clone một repository về máy, remote tham chiếu tới server repository được gán tên là `origin`.

### Remote Branch
Như bạn đã biết ở trên, mỗi repository có các branch. Local repository của chúng lại tham chiếu tới nhiều repository khác thông qua remote. Dĩ nhiên các repository này sẽ có các branch bị trùng tên với nhau, chẳng hạn như `master`. Vậy làm sao phân biệt branch nào của repository nào?

Câu trả lời là Remote Branch. Các remote branch cũng là các branch bình thường, nhưng có prefix được git thêm vào chính là tên của remote.

VD: Chúng ta có:
- master
- origin/master
- upstream/master

### Làm việc với remote
1. Thêm một remote
    ```bash
    # Cú pháp: git remote add <remote_name> <remote_url>
    > git remote add upstream git@github.com/kimnguyen-ict/demo-repository.git
    ```
2. Xem danh sách remote đang có:
    ```bash
    > git remote -v
    ```
3. Thay đổi url của remote
    ```bash
    # Cú pháp: git remote set-url <remote_name> <remote_url>
    > git remote set-url upstream https://github.com/kimnguyen-ict/demo-repository
    ```
4. Thay đổi tên của remote
    ```bash
    # Cú pháp: git remote rename <old_name> <new_name>
    > git remote rename upstream demo
    ```
5. Xóa một remote
    ```bash
    # Cú pháp: git remote remove <remote_name>
    > git remote remove demo
    ```
6. Lấy code của một pull request bất kỳ trên remote repository về local để làm việc:
    ```bash
    # Cú pháp: git fetch <remote_name> pull/<pull_id>/head:<local_branch_name>
    > git fetch pull/2210/head:new-feature
    ```

## Git flow
Để làm việc với Git hiệu quả, cả team của dự án cần tuân thủ các quy tắc của git flow.

1. Repository có 2 nhánh chính: `master` và `develop`. Master chứa code hoàn chỉnh, sử dụng để deploy lên production. Develop chứ code mới nhất đang được phát triển; sử dụng để deploy lên server testing. Hai nhánh này cần được bảo vệ (protected), chỉ người có quyền mới merge, push commit lên nhánh này.
2. Mỗi developer (hay contributor) khi phát triển, cần fork Repository gốc về thành một repository của mình. Khi thực hiện sửa đổi một chức năng A, cần checkout từ develop ra một branch mới có tên theo cú pháp: `feature/branch-name` hoặc `fix/feature-a` và làm việc trên branch đó. Sau khi hoàn thành, commit lại và tạo merge request (pull request) về repository gốc.
3. Khi tạo có bug nghiêm trọng cần fix gấp trên production, có thể tạo pull merge request tới thẳng master bỏ qua testing. Tuy nhiên, commit hotfix này cũng phải được merge lại vào nhánh develop để đảm bảo develop có code mới nhất đã được fix lỗi trên đồng thời phục vụ test lại.

> Flow chính: Code sửa đổi -> Merge code vào develop -> testing -> merge develop vào master cho production.

Lúc này, quá trình làm việc với git flow có thể được mô tả qua bức ảnh sau:
![](https://images.viblo.asia/4d67b9cd-249f-43c3-9a73-363f876a6b1e.png)

## Tổng kết
Trên đây là Sổ tay Git cơ bản cho các bạn mới tìm hiểu về Git. Mọi ý kiến đóng góp bổ sung thêm hoặc sửa đổi, mời mọi người comment vào bên dưới để mình cập nhật vào bài viết. Chân thành cảm ơn các bạn đón đọc. Hy vọng bài này sẽ hữu ích cho mọi người, chúc mọi người thành công!

## References
- https://git-scm.com/book/en/v2

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***