<b>Lời nói đầu: </b> Nếu ai có đọc bài trước của mình và thấy ảnh chụp tuyển dụng từ Sun*, trong số các yêu cầu "Non-ML" thì Git có vẻ quen thuộc nhất. Ai chả có vài dự án nho nhỏ up lên Github rồi đúng không? Chưa cũng không sao, đọc bài này đi và những đoạn code đầu tiên sẽ được bạn đưa lên Github bằng câu lệnh Terminal (CMD) ngầu lòi thay vì vào Github bấm từng nút một.
# 1. Cài đặt và setup mọi thứ
<b>Cài đặt: </b>Bỏ qua những thứ như khái niệm, tác dụng hay gì đó đi, dùng khắc biết hết mà (hoặc lên mạng tra cũng có). Ta đi đến cài đặt luôn nhé. Tốt nhất là cài đặt theo trang chủ (https://git-scm.com/downloads), nó cũng hướng dẫn khá chi tiết rồi. Lưu ý là khi cài đặt Git trên Windows thì bạn sẽ có thể sử dụng 1 thứ hay ho là Git Bash. Bạn có thể đọc [tại đây](https://developpaper.com/the-difference-between-git-bash-and-git-cmd-in-windows-operating-system/) để biết sự "hay ho" của Git Bash. Về cơ bản, dùng Git Bash có thể giúp bạn chạy Bash script files - thứ mà Windows CMD và PowerShell đều không chạy được.<br>

Mình đang dùng máy nhà Windows để viết bài này, vậy nên sẽ dùng Git Bash nha. <b>Mình vẫn dùng chữ Terminal cho nó tổng quát</b>, còn ảnh sẽ là Git Bash đấy.

<b>Config: </b>Sau khi cài đặt xong rồi thì hãy mở Terminal (hoặc Git Bash trên Windows) và gõ vài lệnh để Git biết rằng đây chính là bạn.<br>
<b>Lưu ý</b>: Có 3 configuration level mà bạn nên lưu ý khi tạo các thiết lập về Git:<br>
-   ```--local```: thiết lập chỉ áp dụng cho repository hiện tại
-   ```--global```: thiết lập cho tất cả repository của user hiện tại
-   ```--system```: thiết lập cho tất cả repository của tất cả user trên hệ thống

(À <b>respository</b> bạn cứ hiểu là thư mục được khởi tạo Git nhé, còn cách tạo ra nó thì sau sẽ có.)<br>

Mình thì đang thiết lập Git cho máy cá nhân của mình, nên sẽ dùng ```--global```<br>
Gõ lần lượt 2 lệnh dưới vào Terminal:  
 ```
git config --global user.name <username>
```
```
git config --global user.email <email>
```
Nhớ thay username bằng tên Github của bạn, email là  địa chỉ email ứng với Github đó. Ví dụ với mình thì sẽ là ```git config --global user.name huydt84```

Tiếp theo cho Git biết bạn gõ code ở đâu. Bước này cũng khá quan trọng đấy. Vì giả sử bạn dùng Ubuntu hoặc MacOS mà quên bước này, máy sẽ tự hiểu là trình gõ mặc định của bạn là Vim. Mà gõ Vim thì là ác mộng thật sự, hoặc nếu bạn muốn hardcore thì cứ thoải mái. Còn mình thích [VSCode](https://code.visualstudio.com/) hơn. Mình nghĩ VSCode là công cụ lập trình tốt nhất khi code bằng nhiều ngôn ngữ: vừa đa dụng, tiện lợi, dễ điều chỉnh, bị mỗi cái ngốn RAM. 
Để thiết lập công cụ lập trình mặc định là VSCode thì gõ:
 ```
git config --global core.editor "code --wait"
```
Cái ```code --wait``` bên trên có thể hiểu là khi bạn mở VSCode từ Terminal (gõ ```code``` chẳng hạn) thì Terminal sẽ đợi khi bạn đóng VSCode rồi mới tiếp tục nhận câu lệnh.<br>

Bạn có thể xem thêm các thiết lập khác tại https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-config
Sau khi thiết lập xong, bạn có thể gõ ```git config --global -e``` để vào file .gitconfig bằng VSCode và xem các thiết lập của bạn:

![.gitconfig-image](https://images.viblo.asia/c2083062-9164-4536-aa6b-eceac5076dad.png)

Mở Git Bash lên thì sẽ thấy mấy dòng như dưới đây, Terminal trên Linux và MacOS thì không có, nhưng cơ bản là nó vẫn đợi bạn thôi, đóng VSCode thì em với anh mới tiếp tục bên nhau:
![gitbash-codewait](https://images.viblo.asia/e5d358af-fc56-4892-8cb2-948c9615fb79.png)

<b>Setup SSH-key</b>:
Ngại viết quá, mọi người xem [Cấu hình SSH Key cho Github](https://viblo.asia/p/cau-hinh-ssh-key-cho-github-E375zXQdZGW) luôn nha. Chỉ có lưu ý nhỏ là nếu ```git clone``` bằng HTTPS thì sau khi push code bằng ```git push``` bạn sẽ mắc lỗi kiểu <b>"remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead."</b> Cách xử lý thì có thể xem ở https://200lab.io/blog/cach-giai-quyet-loi-password-authentication-github/, cũng tốn thời gian phết.

Nói dông dài khó hiểu thế chứ chung quy lại và phải setup SSH-key để sau này làm việc, "giao tiếp" với Github bằng SSH cho tiện, đỡ dính lỗi về sau.

# 2. Git siêu cơ bản
### 2.1: Vài khái niệm cần biết
- <b>Git provider: </b>hiểu đơn giản là các dịch vụ lưu trữ kho mã nguồn dựa trên Git, tiêu biểu là Github, Gitlab, Bitbucket. Bài này của mình thì viết với Git provider là Github.
- <b>Repository: </b> Như mình nói ở trên, <b>repository</b> là thư mục được khởi tạo Git. Bạn có thể tạo 1 repository bằng cách ấn vào nút "New" trên Github (hoặc https://github.com/new/) và làm theo hướng dẫn. Nhanh hơn thì tạo thư mục rồi ```cd``` vào đó, gõ ```git init``` và bùm, thư mục đó thành repository

![git-init](https://images.viblo.asia/af2161c0-8f3f-4f4a-a89b-80e3bf3c58df.png)

- <b>Remote: </b>Cấu hình kết nối tới Remote Repository (cứ hiểu là Repository trên web là được) 
- <b>Branch: </b>là nhánh. Nhìn lại ảnh trên, bạn có thấy sau khi tạo repository, có thêm chữ "master" màu xanh xuất hiện không? Nó thể hiện rằng ta đang ở nhánh <b>"Master"</b> - nhánh chính của repository, luôn chứa source code đang sử dụng trên production.<br>
Trong 1 dự án sẽ có rất nhiều branch, chúng làm các nhiệm vụ khác nhau dựa theo quy trình làm việc tạo ra sản phẩm. Một loại thiết kế quy trình phổ biến là Gitflow. Bạn có thể tìm hiểu thêm về Gitflow tại https://viblo.asia/p/co-ban-ve-gitflow-workflow-4dbZNn6yZYM

### 2.2: Thực hành vài lệnh cơ bản
#### a) Clone repository
Đầu tiên, từ Remote (trên web) kéo code về máy mình để phát triến mở rộng dự án. Mình thực hành trên repository tự tạo cho tiện, bạn có thể tự thực hành trên Github repository của bản thân nha. Bạn copy dòng được tô đỏ và dùng câu lệnh ```git clone <dòng vừa copy>```:

![git-clone](https://images.viblo.asia/ee9c3c04-e671-4a20-ae0e-26ec30a1ea3e.png)

![git-clone-cmd](https://images.viblo.asia/0aefdd4f-7f49-43f9-b0b5-604512aca1d0.png)

<b>Giờ vào việc thôi!</b> Ta sẽ tạo 1 branch mới là "develop" để xử lý trên đó.

![git-branch](https://images.viblo.asia/a683f9dc-4a6d-4ec6-8be7-f05d3299fbe4.png)

Đừng vội, mình sẽ giải thích từng dòng:
- ```git branch``` sẽ liệt kê các branch hiện có của repository. Dấu * ở trước thể hiện rằng chúng ta đang ở nhánh đó, trong trường hợp này là <b>main</b> (nó như nhánh <b>master</b> thôi). Thực ra đặc quyền của Git Bash là không cần quan tâm dấu * này lắm, vì ta có thể biết mình đang ở branch nào thông qua chữ màu xanh lam ở ngay dòng phía trên câu lệnh thực hiện.
- ```git checkout -b <branch_name>``` sẽ tạo ra 1 branch mới tên là branch_name (ở đây là <b>develop</b>) và chuyển sang branch đó. Mình đã tạo 2 branch mới là <b>develop</b> và <b>develop-2</b>
- Giờ ```git branch``` để kiểm tra và thấy đã có thêm 2 branch.

![git-branch-delete](https://images.viblo.asia/d21f1cb2-b5fb-4705-861a-dc88c51b75c7.png)

- Có vẻ tạo <b>develop-2</b> không cần thiết lắm, nên mình sẽ xóa nó, và phải chuyển sang branch khác thì mới xóa được. 
- ```git checkout <branch_name>``` sẽ chuyển sang branch có sẵn tên branch_name (ở đây là <b>develop</b>)
- Xóa branch <b>develop-2</b> bằng lệnh ```git branch -d develop-2```
- Giờ check lại bằng ```git branch``` ta thấy chỉ còn 2 branch - vì vừa xóa 1 branch xong

#### b) Work with Git
- <b>Lưu ý: </b><b>Working directory</b> là thư mục làm việc của bạn, khác <b>repository</b>. File trong working directory phải được <b>commit</b> thì mới được xuất hiện trong repository.  Còn nữa, lệnh ```git status``` dùng để xem đầy đủ trạng thái của các file trong working directory, còn ```git status -s``` để xem trạng thái rút gọn. Mình sẽ dùng 2 lệnh này khá nhiều trong phần còn lại của bài viết.<br>
Giờ dùng thì cũng chưa có gì cả, vì ta đã làm gì đâu:

 ![git-status-1](https://images.viblo.asia/06d3cb17-27cf-452f-9fbd-bfc3234a6fc2.png)

- <b>Giải thích chút về cơ chế của Git:</b> Trong Git có 1 vùng đặc biệt gọi là <b>staging area</b>, bạn có thể hiểu nó như 1 vùng đệm. Khi xuất hiện 1 sự thay đổi nào đó ở project directory, bạn cần đưa file bị thay đổi lên staging area (lệnh ```add```). Đó là nơi bạn "review" lại những sự thay đổi đó lần cuối. Nếu không ổn thì chỉnh sửa tiếp, nếu ổn rồi thì mới ```commit``` để lưu sự thay đổi đó vào repository.

Giờ mình sẽ tạo thêm 3 file ở working directory. Lệnh ```echo "hello" > file1.txt``` nghĩa là viết "hello" vào file1.txt (nếu file này chưa tồn tại thì sẽ được tự tạo mới)

![git-create-file](https://images.viblo.asia/8e34dfd9-0108-47c4-ab47-b8bfed5a4095.png)

Khi gõ ```git status``` ta thấy tên 3 file được tô màu đỏ, nghĩa là chúng chưa được cho vào staging area. Sau khi được cho vào staging area, tên file sẽ hiển thị màu xanh, còn khi commit rồi thì...làm gì còn status nữa!

![git-add](https://images.viblo.asia/d58d4934-c081-4d3d-9da5-18e9650eefc9.png)

Tiếp theo, mình dùng ```git add file2.txt``` để đưa file2.txt vào staging area, và làm tương tự với file3.txt. Ta có vài cách viết gọn hơn:
- ```git add file2.txt file3.txt``` thì add cả 2 file luôn
- ```git add *.txt``` thì add tất cả các file chưa add mà có đuôi .txt
- ```git add .``` sẽ add tất cả các file chưa được add ở working directory
Giờ ta viết "18 tuoi" (là viết mới, không phải thêm vào, muốn thêm vào thì dùng ```>>``` thay vì ```>```) vào file3.txt, 1 file đã được add rồi. Vậy thì sao? Check status cái xem nào:

![git-status-2](https://images.viblo.asia/6b0bb53f-c934-485c-9f3b-c9cf9c976c97.png)

Với ```git status```, ta thấy:
- <b>file2.txt và file3.txt có màu xanh</b>, nghĩa là có 1 "bản" nào đó của 2 file này đã được đưa vào staging area và vẫn còn trong đó. Bản này có thể không là bản mới nhất, ví dụ như file3.txt
- <b>"modified file3.txt" màu đỏ</b> nghĩa là file3.txt đã được thay đổi (modified) so với phiên bản đưa vào staging area trước đó, và hệ thống đề nghị ta nên dùng ```git add``` để update file3.txt mới vào staging area, hoặc ```git restore``` để loại bỏ sự thay đổi, nôm na là đưa file3.txt về trạng thái như trong staging area
- <b>file1.txt màu đỏ</b> nghĩa là nó chưa được add vào staging area
- Phải <b>đưa file vào staging area</b> thì nó mới track được sự thay đổi (ví dụ như file3.txt), chứ giờ dù có thay đổi file1.txt rồi kiểm tra status thì kết quả vẫn là vậy thôi

Với ```git status -s```, mình sẽ giải thích các ký hiệu
- A màu xanh là đã được add rồi, chưa chỉnh sửa.
- M đỏ là đã được modified nhưng chưa add lại. 
- ?? là file chưa được add bao giờ

Giờ nếu mình muốn phục hồi 1 file modified thì làm thế nào? Ta có thể đưa nó về trạng thái như trong staging area bằng ```git checkout -- <filename>``` hoặc ```git restore <filename>```

<b>Chú ý: </b> Ta có thể ```git restore``` với nhiều file, cú pháp tương tự ```git add```

![git-restore](https://images.viblo.asia/d9ff5364-53f4-43cc-a4d7-4676d77b0031.png)

Giờ ta sẽ commit file2.txt và file3.txt. Cú pháp là ```git commit -m "<Message>"```, nó sẽ đưa tất cả các file trong staging area vào repository (ở đây là file2.txt và file3.txt) và gửi 1 dòng tin nhắn là kèm theo (nó giống tin nhắn để sau này ai đọc thì biết commit đó để làm gì)
- file1.txt chưa đưa vào staging area nên không thể commit bằng lệnh trên. Nếu vẫn muốn commit cả file1.txt thì dùng  ```git commit -am "<Message>"```
- Nếu message dài, nhiều dòng, bạn có thể gõ ```git commit``` và editor mặc định sẽ được mở ra để bạn gõ message

Lệnh ```git log``` có thể show chi tiết lịch sử commit từ mới đến cũ
- ```git log --oneline```: tóm tắt lịch sử commit từ mới đến cũ

![git-log](https://images.viblo.asia/a46bde9c-13f6-4f11-989c-8ac5dcfd7a0f.png)

- ```git log --reverse```: chi tiết lịch sử commit từ cũ đến mới (reverse - đảo ngược) => ```git log --reverse --oneline```: tóm tắt lịch sử commit từ cũ đến mới
- Để xem sự thay đổi commit trên nhánh chính, ta có thể dùng ```git log origin/main``` (vì nhánh chính của mình là origin/main)

![git-log-reverse](https://images.viblo.asia/48d2f833-de02-483a-bd59-5cbd1a331cff.png)

Nhìn vào ảnh trên, ta thấy 1 dãy ký tự khá dài màu vàng sau từ "commit". Ta có thể coi đó là mã số của commit. Mã số rút gọn của commit thì là 7 ký tự đầu (hoặc một số lượng ký tự đầu sao cho mã số là duy nhất) mà ta có thể thấy khi chạy  ```git log --reverse --oneline```

<b>git diff</b>: phần này cũng quan trọng nhưng khá dài, các bạn có thể tham khảo thêm ở [Git Diff: A Complete Comparison Tutorial for Git](https://www.cloudbees.com/blog/git-diff-a-complete-comparison-tutorial-for-git). Lưu ý nhỏ là nhìn diff ở Git Bash/Terminal khá là mệt (nhất là với file dài), nên ta có thể sử dụng VSCode nhìn cho dễ:
- Gõ 2 lệnh config sau đây:
```
git config --global diff.tool --vscode
```
```
git config --global difftool.vscode.cmd "code --wait --diff $LOCAL $REMOTE"
```
- Gõ ```git config --global -e``` để vào file .gitconfig kiểm tra xem đã thêm thiết lập chưa. Nếu config của bạn chỉ hiện "code --wait --diff" thì có thể gõ thêm phần sau vào cho đủ.
- Gõ ```git difftool``` và làm theo hướng dẫn để thấy sự kỳ diệu!

<b>git reset</b>: ngại viết quá, xem ở [Cách sử dụng Git Reset to HEAD](https://viblo.asia/p/cach-su-dung-git-reset-to-head-naQZRByAZvx) nha.

<b>git pull</b>: vào [Tự học Git | Lệnh git pull](https://cafedev.vn/tu-hoc-git-lenh-git-pull/) đọc chút nhé.

<b>git push</b>: là lệnh để đẩy các commit của bản thân lên remote. Sau đó mình dùng ```git remote -v``` nhằm kiểm tra remote version để chắc rằng mình đã push lên đúng repository
```
git push -u origin <from_branch_in_local>:<target_branch_in_remote>
```
- Ở bước này thì hãy để ý chút - ví dụ với mình, ảnh dưới mình từ develop đẩy lên <b>master</b> ở remote mà không phải main (main là branch chính) nên Git sẽ tự tạo 1 branch mới tên là "master" và đẩy commit lên đó:

![push-master](https://images.viblo.asia/83056a1d-6733-4a4b-aac9-21c4d8482ad9.png)

![view-master](https://images.viblo.asia/bf9d313e-413a-47dd-a389-29fb6a771684.png)

- Giờ mình tạo file4.txt, add, commit, rồi push vào main xem sao:

![push-main](https://images.viblo.asia/0c6d12cf-af6d-4fce-92d9-0b60c06bb265.png)

![view-main](https://images.viblo.asia/908fd70a-9b1c-4fc6-97eb-c33e308da38e.png)

**=> Đó, giờ nhánh chính mới được thay đổi!**

# 3. Kết
Thực ra học Git nhanh mà, viết bài blog mới lâu. Mọi người cố gắng gõ từng câu lệnh theo để nhớ hơn nha, lười quá mới copy thôi. Cảm ơn mọi người đã đọc đến đây, nhớ đón chờ phần sau của mình nhé!