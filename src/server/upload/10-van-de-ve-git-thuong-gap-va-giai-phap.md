**1. Bỏ phần chỉnh sửa local file**

Đôi khi cách tốt nhất để nắm được vấn đề là phải “ngụp lặn” mầm mò trong code. Nhưng đáng tiếc là, những thay đổi trong quá trình lại không được tối ưu lắm, trong trường hợp này thì revert file về lại trạng thái ban đầu có lẽ là cách nhanh gọn nhất:

git checkout -- Gemfile # reset specified path 

git checkout -- lib bin # also works with multiple arguments

Dấu 2 gạch (--) biểu thị cho tính năng command line để báo kết thúc các option của command.

**2. Undo các local commit**

Đôi khi chúng ta phải tốn khá nhiều thời gian để nhận ra rằng mình đang đi sai hướng, và đến lúc đó thì không ít thay đổi đã được áp dụng. Đấy là lúc mà git reset trở nên có ích:

git reset HEAD~2        # undo last two commits, keep changes

git reset --hard HEAD~2 # undo last two commits, discard changes

Hãy cẩn thận với option --hard! Nó sẽ reset hệ thống bạn làm việc, cũng như tất cả các thay đổi cũng sẽ bị mất đi luôn.

**3. Remove một file khỏi git mà không phải remove nó khỏi file system**

Nếu bạn không cẩn thận khi dùng git add, bạn sẽ add một mớ file không mong muốn vào mà không hay biết. Tuy nhiên, git rm sẽ remove nó trên cả staging area, cũng như file system của bạn – một điều không ai mong muốn. Trong trường hợp này, hãy đảm bảo rằng bạn chỉ remove bản staged thôi, và add file vào .gitignore để tránh lặp lại lỗi lần hai:

git reset filename          # or git remove --cached filename

echo filename >> .gitignore # add it to .gitignore to avoid re-adding it

**4. Edit commit message**

Lúc này sẽ có typo, nhưng may thay là bạn có thể sửa nó khá dễ trên commit messages:

git commit --amend                  # start $EDITOR to edit the message

git commit --amend -m "New message" # set the new message directly

Nhưng đó vẫn chưa hết công dụng của git-amend. Nếu bạn có quên add một file vào, chỉ cần add vào và chỉnh lại commit trước đó!

git add forgotten_file 

git commit --amend

Hãy nhớ rằng --amend thật ra tạo commit mới thay thế cho cái trước, nên đừng dùng nó để thay đổi commit mà đã được đẩy vào giữa repository. Có một ngoại lệ đó là bạn phải chắc chắn về việc không có developer nào đã check các bản trước và làm dựa trên đó, như thế thì một forced push (git push --force) vẫn sẽ ổn. Cần có option --force ở đây vì lịch sử của hệ thống đã bị điều chỉnh local, nghĩa là push sẽ bị reject bởi server từ xa vì fast-forward merge là không thể.

**5. Dọn local commit trước khi push**

Mặc dù --amend rất hữu ích, nó không thật sự có tác dụng nếu phần commit bạn muốn  reword không phải là cái cuối. Trong trường hợp này, bạn sẽ cần đến một interactive rebase:

git rebase --interactive 

 if you didn't specify any tracking information for this branch 
 
 you will have to add upstream and remote branch information: 
git rebase --interactive origin branch

**6. Revert các commit đã push**

Mặc dù một số giải pháp đã được nêu rõ trong những tip trước, một số commit sai đôi khi sẽ trội lên hẳn trong repository. Không sao cả, vì git đã cho bạn một cách đơn giản để revert một hoặc nhiều commit:

 git revert c761f5c              # reverts the commit with the specified id
 
 git revert HEAD^                # reverts the second to last commit
 
 git revert develop~4..develop~2 # reverts a whole range of commits
 
Nếu bạn không muốn tạo thêm revert commit mà chỉ muốn áp dụng các thay đổi cần thiết vào hệ thống, bạn có thể dùng option --no-commit/-n.

 undo the last commit, but don't create a revert commit 
 
git revert -n HEAD

Trang manual tại man 1 git-revert cũng list ra nhiều option khác và cho thêm một số ví dụ khác nữa.

**7. Tránh các conflict trùng lặp về merge**

Một chuyện mà mọi developer đều hiểu, rằng việc fix merge conflict nghe thật sự kinh dị, nhưng việc cứ xử lý đi xử lý lại một conflict (ví dụ: trong các feature branch chạy lâu dài) thì thật sự là một cơn ác mộng. Nếu bạn đã gặp tình trạng này, bạn sẽ rất vui khi được biết về feature reuse recorded resolution feature. Hãy add nó vào global config cho tất cả các project:

git config --global rerere.enabled true

Ngoài ra, bạn có thể dùng nó trên từng dự án bằng cách tạo thủ công thư mục .git/rr-cache.

Đây không phải là một feature cho tất cả mọi người, nhưng riêng đối với những ai cần nó,  nó sẽ tiết kiệm cho bạn không ít thời gian. Hãy tưởng tượng team của bạn đang làm nhiều nhánh tính năng khác nhau cùng một lúc. Bây giờ bạn muốn hợp nhất tất cả chúng lại với nhau thành một nhánh có thể test được trước khi release. Từ đó bạn sẽ phải xử lý một số conflict về merge. Không may một trong các nhánh vẫn chưa hoàn thiện, vì vậy bạn phải hủy merge lại một lần nữa. Vài ngày (hoặc vài tuần) sau khi nhánh cuối cùng đã sẵn sàng, bạn sẽ merge lại, nhưng nhờ vào các độ phân giải đã ghi, bạn sẽ không phải giải quyết xung đột hợp nhất lần nữa.

Trang chính (man git-rerere) có nhiều info hơn về các case và các command (git rerere status, git rerere diff, v.v).

**8. Tìm commit gây lỗi sau khi merge**

Việc mò ra commit đã kéo bug sau khi merge khá tốn thời gian. May mắn là git cung cấp cho chức năng search nhị phân rất hay dưới dạng git-bisect. Đầu tiên bạn cần biểu hiện setup đầu tiên:

git bisect start         # starts the bisecting session

 git bisect bad           # marks the current revision as bad
 
 git bisect good revision # marks the last known good revision
 
After this git will automatically checkout a revision halfway between the known “good” and “bad” versions. You can now run your specs again and mark the commit as “good” or “bad” accordingly.

Sau khi git tự động checkout các phiên bản “tốt” và bản “xấu”. Bạn cũng có thể chạy lại các spec và đánh dấu commit tương ứng là “tốt” hay “xấu”.

git bisect good # or git bisec bad

Process này sẽ tiếp tục cho đến khi bạn tìm ra commit mang bug.

**9. Tránh các lỗi thường gặp các git hook**

Một số lỗi bị lặp lại rất thường xuyên, nhưng sẽ dễ tránh được nếu như check thường xuyên hoặc các task cleanup ở một stage nhất định trong git workflow. Hook được thiết kế để dùng cho trường hợp này. Để tạo ra hook mới, hãy add thêm một file vào .git/hooks. Tên của script phải tương thích với một trong những hook có sẵn , một list đầy đủ những cái có sẵn trên manual page (man githooks). Bạn cũng có thể define các global hook để dùng trong các project của mình bằng cách tạo ra template directory cho git sử dụng khi khởi động một repository mới

**10. Nếu tất cả đều fail**

Tới đây thì chúng ta đã cover được khá nhiều cách fix các lỗi thường gặp khi làm việc với git. Hầu hết giải pháp đều khá ổn, tuy nhiên cũng có lúc không dùng được cách dễ và phải viết lại history của nguyên branch. Một cách hay dùng trong trường hợp này đó là remove phần data nhạy cảm (ví dụ như uỷ quyền login cho hệ thống production) gắn liền với public repository:

git filter-branch --force --index-filter 

  'git rm --cached --ignore-unmatch secrets.txt'
  
  --prune-empty --tag-name-filter cat -- --all
  
Việc này sẽ remove file secrets.txt khỏi tất cả các branch và tag. Nó cũng remove mọi commit trống sau khi thực hiện remove. Hãy nhớ rằng việc này cũng sẽ viết lại history của toàn bộ project mà có thể broke trên workflow. Và trong lúc file đang bị remove, phần uỷ quyền vẫn khá nguy hiểm!

GitHub đã có một bài tutorial cách remove data nhạy cảm và man git-filter-branch có mọi chi tiết về những filter và option có sẵn.