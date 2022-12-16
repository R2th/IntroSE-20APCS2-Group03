Lại là mình trở lại với series "xây nhà" rồi đây.

Hôm nay mình sẽ giới thiệu với mọi người về một công cụ để quản lí và chia sẻ source code. Đó là **Git**
# 1. Vấn đề đặt ra
- Nhiều bạn sẽ đặt câu hỏi tại sao lại phải có hẳn một chương trình để quản lí và chia sẻ source code trong khi code thì ở trong tay mình, do mình toàn quyền quản lí, còn việc chia sẻ thì quá đơn giản: nén lại rồi gửi qua usb/mail/chatwork/...? Trước đây mình cũng nghĩ như vậy và cũng đã làm như vậy (copy source code từ máy này sang máy khác qua usb ^^) ---> mình xin gọi cách làm này là "**cách nông dân**" :D 
- Cho đến khi gặp phải một project lớn mà một mình mình không thể ôm hết được và bắt buộc phải có thêm 1 người nữa code cùng mình, vấn đề của "**cách nông dân**" kia bắt đầu xuất hiện. Đó là khi hai người đã hoàn thành phần việc của mình và muốn ghép code lại với nhau. 
- Nó không giống như việc xếp hình, chỉ cần đặt cùng với nhau là có thể sử dụng được. Nhất là khi trong quá trình code, sẽ có những file bị cả 2 người cùng đụng vào gây ra xung đột (gọi là **conflict**).

--> và để giải quyết vấn đề này, GIT đã được Linus Torvalds phát triển vào năm 2005, ban đầu dành cho việc phát triển nhân Linux. Đến nay, Git trở thành một trong các phần mềm quản lý mã nguồn phổ biến nhất.

- Và trong bài viết này, mình chỉ xin giới thiệu về cách hoạt động và các câu lệnh cơ bản của Git, còn việc cài đặt và cấu hình thì có rất nhiều bài hướng dẫn trên [đây](www.google.com) rồi.

# 2. Bắt đầu với git và cấu trúc hoạt động của nó:
### Hình ảnh dưới đây thể hiện các hoạt động mà người dùng tương tác với hệ thống Git
![](https://images.viblo.asia/a8430b4b-121b-4d54-af30-5e85fd69762e.png)
- Ở đây chúng ra sẽ tìm  hiểu về khái niệm **Repository**: hay được gọi tắt là Repo đơn giản là nơi chứa/cơ sở dữ liệu (database) tất cả những thông tin cần thiết để duy trì và quản lý các sửa đổi và lịch sử của dự án (theo wikipedia.org).
- Và trong hình ảnh trên, ta thấy có 2 loại Repo là Repo bên phía **Server** (Remote Repository) và Repo bên phía **Workstation** (Local Repository):
  - **Remote repository**: Là repository để chia sẻ giữa nhiều người và bố trí trên server chuyên dụng.
  - **Local repository**: Là repository bố trí trên máy của bản thân mình, dành cho một người dùng sử dụng.
- Về cách hoạt động:
    - Lập trình viên sẽ làm việc trực tiếp với "**Local Repo**", và sau khi hoàn thành công việc của mình sẽ lưu commit trên "**Local Repo**" rồi push request lên "**Remote Repo**". 
    - **Remote Repo** sẽ do **Team-Lead** quản lí, sẽ kiểm tra trước ghi quyết định có gộp request đó vào hay không. Nếu không sẽ thông báo cho lập trình viên sửa lại rồi gửi lại request. Đến khi có request được gộp vào **Remote Repo**, tất cả các máy cá nhân (**Local Repo**) sẽ phải tải lại bản mới nhất trên **Remote Repo** về và tiếp tục làm việc.

### Hoạt động trên Repository:
![](https://images.viblo.asia/fb582cf4-e36e-4a91-acb6-0cb108d9245c.png)

Khái niệm **branch**: dùng để phân nhánh và ghi lại luồng của lịch sử. Branch đã phân nhánh sẽ không ảnh hưởng đến branch khác nên có thể tiến hành nhiều thay đổi đồng thời trong cùng 1 repository. Hơn nữa, branch đã phân nhánh có thể chỉnh sửa tổng hợp lại thành 1 branch bằng việc hợp lại (merge) với branch khác.

Git sẽ quản lí code giống như sơ đồ xương cá với 1 nhánh chính là  **branch Master** (nhánh màu xanh lá).

Khi bạn bắt đầu làm việc, bạn sẽ phải tạo một branch khác và làm việc trên đó. Đến khi phần công việc đó hoàn thành, bạn có thể gộp nó vào branch master rồi tiếp tục thực hiện phần việc khác, và lịch sử sửa đổi này sẽ được lưu lại (nếu cần có thể quay trở về giống như Ctrl Z vậy). 

**CHÚ Ý**: 
- Mỗi branch chỉ nên thực hiện một công việc cụ thể
- Branch mới bắt buộc phải được tạo ra từ branch master (chứ không phải một branch nhánh khác)
# 3. Các câu lệnh cơ bản:
## Quản lý branch:
- Kiểm tra danh sách branch: `$ git branch` , để **thực thi trên remote repo, ta chỉ cần cho thêm tùy chọn `-r` hoặc `--remote`**
- Xóa branch: 
    - khi đang ở branch khác: `$ git branch -d <branch_name>`
    - khi đang ở branch cùng tên với remote branch muốn xóa: `$ git push <remote_name> -d <branch_name>`
- Push branch từ Local lên Remote với tên khác: 
    - Bình thường, việc push một branch ở local lên remote branch được thực hiện bằng cách: `$ git push <remote_name> <branch_name>` 
    - Tuy nhiên việc push dưới một tên khác sẽ có khác biệt, cụ thể: `$ git push <remote_name> <local_branch_name>:<remote_branch_name>`

## Rebase và merge:
- **Rebase**:

    `$ git checkout <branch_name> `
    
    `$ git rebase <rebase_branch_name>`

    - **Cách thực hiện**: Lấy code từ rebase_branch_name sau đó từ những commit ở đó tạo ra những commit tương tự lên branch_name. Thực hiện rebase thì các commit đã tồn tại bị bỏ đi và tái tạo lại các commit tương tự nhưng thực ra là khác biệt. Điều này làm lịch sử commit ở local và remote khác nhau.
    - **Đặc điểm**: các commit của nhánh được tạo mới sẽ nằm liền mạch, và các commit của rebase-branch sẽ là các commit mới nhất. 
    
- **Merge**: 
- 
    `$ git checkout <branch_name> `
    
     `$ git merge <branch_2_name>`
     
    - **Cách thực hiện**: git dùng 2 bản commit cuối cùng của từng nhánh rồi tích hợp lại với nhau tạo thành 1 commit mới theo kiểu hình thoi. Thực hiện merge thì các commit đã tồn tại không bị thay đổi, chỉ tạo ra 1 commit mới tích hợp của 2 commit mới nhất.
    - **Đặc điểm**: các commit của 2 nhánh được sắp xếp theo thời gian tạo commit.
## Gộp commit:
Tùy vào từng môi trường, công ty khác nhau sẽ có những yêu cầu khác nhau về việc quản lý commit. Ví dụ công ty yêu cầu mỗi request bạn gửi lên chỉ có duy nhất 1 commit. Bạn vào kiểm tra thì lại thấy nhiều hơn, thì công việc của bạn là gộp những commit ấy lại. Và việc thực hiện sẽ ra sao?

`$ git rebase -i <id_commit_end> || $ git rebase -i HEAD~<index>`
- **<id_commit_end>** là id của commit cuối trong nhóm cần gộp. 
- **<index>**: số commit cần gộp. Sau đó, cửa sổ làm việc hiện lên, Ta có các lựa chọn **pick|squash|fixup** các commit trước khi save.

Sau đó kiểm tra lại bằng lệnh: `$ git log --oneline` xem commit đã được gộp thành công hay chưa.
## Git stash:
Khi đang làm việc với một branch rồi bạn chợt nhận ra mình cần sửa ở branch cũ, bạn sẽ cần checkout và phải commit những thay đổi. Tuy nhiên, bạn chỉ cần lưu nó lại mà chưa commit, và **git stash** sẽ giúp bạn. Ngoài ra, có 1 số tuỳ chọn như:

- Xem lại lịch sử thay đổi: `$ git stash list`
- Xem lại lịch sử thay đổi cùng nội dung của nó: `$ git stash list -p`
- Xem lại lịch sử thay đổi: `$ git stash list`
- Xem lại lịch sử thay đổi cụ thể của lần 1: `$ git stash show stash@{1}`
- Apply thay đổi của lần 1: `$ git stash apply stash@{1}`
- Xoá thay đổi: `$ git stash drop stash@{1}`
- Xoá toàn bộ: `$ git stash clear`
## Git reset:
Trong cuộc sống, mọi hành động thì không thể "hoàn tác" được. Nhưng khi làm việc với máy tính, Ctrl-Z luôn sẵn sàng để sửa chữa sai lầm cho bạn, và git cung cấp cho bạn 3 phương pháp:
- `$ git reset <commit_id>` khi ta muốn di chuyển HEAD đến commit reset và giữ nguyên tất cả thay đổi của file đến vị trị hiện tại. Tuy nhiên sẽ loại bỏ thay đổi khỏi stage.
- `$ git reset --hard <commit_id>` khi nó vẫn di chuyển HEAD đến commit reset nhưng sẽ loại bỏ tất cả thay đổi của file sau commit reset.
- `$ git reset --soft <commit_id>` khi muốn di chuyển HEAD đến commit reset và có **ưu điểm** là sẽ **giữ nguyên tất cả thay đổi của file và các thay đổi ở stage**.
--> vì vậy reset --soft được khuyến khích sử dụng hơn, tuy vậy, bạn cũng nên tùy chọn phù hợp với hoàn cảnh và mục đích bạn mong muốn.

# Kết luận:
Trên đây chỉ là một số tình huống thường gặp khi làm việc với **Git** mà mình gặp phải.
Ngoài ra, muốn trở thành Master Git thì mình khuyên các bạn nên lao vào làm thực tế, khi đó sẽ phát sinh ra nhiều tình huống hơn, giúp bạn nâng cao trình độ. Ngoài ra, cuốn **Pro Git** ở dưới sẽ giúp đỡ các bạn phần nào.

Cảm ơn các bạn và mong sớm gặp lại các bạn trong các bài viết tiếp theo.

# Tham khảo:
Khái niệm, lịch sử phát triển của Git: https://vi.wikipedia.org/wiki/Git_(ph%E1%BA%A7n_m%E1%BB%81m)

Ebook **Pro Git** rất chi tiết, bài bản về git:  https://git-scm.com/book/vi/v1/B%E1%BA%AFt-%C4%90%E1%BA%A7u-C%C6%A1-B%E1%BA%A3n-v%E1%BB%81-Git

https://viblo.asia/p/mot-vai-cau-hoi-ve-git-GrLZDAgOlk0