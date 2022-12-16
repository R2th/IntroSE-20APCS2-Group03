Chào mọi người, Mình xin chia sẻ chút ít kiến thức về **git** mà mình sưu tầm và tổng hợp được, mong nó sẽ giúp ích cho những người mới tiếp cận với Git.
   
   Một chút lý thuyết và khái niệm:

   Git đơn giản hơn đó là nó sẽ giúp bạn lưu lại các phiên bản của những lần **thay đổi** vào mã nguồn và có thể dễ dàng **khôi phục** lại mà không cần copy lại mã nguồn rồi cất vào đâu đó. Và một người khác có thể xem các thay đổi của bạn ở từng phiên bản, họ cũng có thể đối chiếu các thay đổi của bạn rồi gộp phiên bản của bạn vào phiên bản của họ. Cuối cùng là tất cả có thể đưa các thay đổi vào mã nguồn của mình lên một kho chứa mã nguồn.
   
   Khi nói tới **git** thì mọi người thường nghĩ ngay tới **github** và có thể sẽ có một số hiểu lầm với họ. Xin nhắc lại rằng, **Git** là tên gọi của **một mô hình hệ thống**. Như đã giải thích ở trên, các máy tính có thể **clone** lại mã nguồn từ một **repository** và **Github** chính là một **dịch vụ máy chủ repository công cộng**, mỗi người có thể tạo tài khoản trên đó để tạo ra các kho chứa của riêng mình để có thể làm việc.
   
## 1. Các thao tác với Git và Github
   Trước tiên hãy hiểu **Repository** là gì?
   **Repository viết tắt là repo**
    Git là một công cụ để **quản lý mã nguồn**, có thể sử dụng **git** và **github** để lưu trữ các file cấu hình của mình, các script, viết các bài hướng dẫn, các bản nháp,... Các **repo** là những nơi tôi phân loại, lưu trữ những thứ bên trên và nó được lưu cả ở máy trạm và ở **server github**. Để làm việc với repo thì bạn phải hiểu về nó. 
    
## Một số điều bạn cần biết là:
**3 trạng thái của một repo:**

  ![](https://images.viblo.asia/63e49cc7-80d7-43c2-b0d2-d9751811fa98.png)

Như hình trên bạn có thể thấy có 3 điểm cần lưu ý:

* **Working dir**: đây là nơi bạn thực hiện các thao tác **chỉnh sửa** với file mã nguồn của mình, nó có thể là eclipse, netbean, notepad++,...
* **Stagging area**: những sự thay đổi của bạn với file mã nguồn được lưu lại, giống như bạn ấn Save trong một file notepad.
    
    Theo mình tìm hiểu được thì vùng này được chia làm **hai phân vùng**, một nửa là phần vùng mà ta có thể **xem được**, còn một nửa là phân vùng mà ta **không thể nào biết được nó hoạt động như thế nào**, ra sao (ý kiến cá nhân).
    
    *Cụ thể theo mình nghĩ thì khi sử add thì file sẽ ở phần mà mình có thể xem được trên  Stagging area, còn khi commit thì có thể nói các file sắn sàng để đưa vào repo trên server github, hay lúc này thì các file sẽ ở phân vùng không thể xem được của  Stagging area*
* **Git directory:** nơi lưu trữ mã nguồn của bạn (ở đây là **github**)
Tương ứng với 3 vị trí này ta có các hành động cơ bản như:

![](https://images.viblo.asia/a83c4125-b540-4972-b942-86d276a49296.png)

* **Add**: lưu file thay đổi (mang tính cục bộ) - tương ứng với câu lệnh:

           git add
            Để add file README.md
            git add README.md
            Để add tất cả các file hiện có.
            git add * ` hoăc `git add .
        
    Vậy `git add *` và `git add .` có gì **khác nhau**?
    
    Theo tôi biết thì git add * có nghĩa là thêm tất cả các tệp trong thư mục hiện tại, ngoại trừ các tệp có tên **bắt đầu bằng dấu chấm**. Còn git add . thêm toàn bộ thư mụcbao gồm cả các tệp có tên bắt đầu bằng dấu chấm, 2 lệnh gần như gần như giống nhau.
    
* **Commit**: Ghi lại trạng thái thay đổi tại máy local (ví dụ như bạn có thể ấn Save nhiều lần với file README.md nhưng chỉ khi commit thì trạng thái của lần ấn Save cuối cùng trước đó mới được lưu lại) - tương ứng với câu lệnh

           git commit
		VD: git commit README.md hoặc 
            git commit * (để commit tất cả, ta nên thêm tham số -m để ghi lại một comment cho hành động đó)
            git commit README.md -m "first commit"

* **Push**: Đẩy những thay đổi từ máy trạm lên server để đồng bộ thực hiện lệnh: 

            `git push origin master`
* **Pull**: đồng bộ trạng thái từ server về máy trạm, cập nhật sự thay đổi mới nhất - tương đương lệnh

           ` git pull [remote] [name branch]`
           (Bạn có thể xem remote bằng lệnh `git remote -v`, xem các branch bằng lệnh `git branch`)
           
**Trạng thái File trong Git:**
	Trong Git, File có **2 trạng thái** chính là **Tracked** và **Untracked**:
  <br>**1. Tracked**: Tập tin đã được đánh dấu theo dõi (các file khi đã từng được add 1 lần) gồm :
            <br>***Unmodified***: chưa chỉnh sửa gì.
            <br>***Modified***: đã chỉnh sửa.
            <br>***Staged***: đã sẵn sàng để commit.
    <br>**2. Untracked**: các tập tin mới được tạo ra hoặc thêm vào và chưa được Git theo dõi.

![](https://images.viblo.asia/1788f729-e68a-49c5-9bf4-266ec9dd95b6.png)

## Các câu lệnh git cơ bản:
* Khởi tạo từ một project đã có ở local: `git init`
* Add remote server: 
<br>`git remote add [name] [url]` (name tùy biến, url trên server github)
* Add to **staging area, commit, push**<br>
		`git add *`<br>
		`git commit –m “Commit description”`<br>
		`git push origin [name branch]`
        
* Pull:  Lệnh này sẽ tự động lấy toàn bộ dữ liệu từ remote repository và gộp vào cái branch hiện tại bạn đang làm việc.
		`git pull origin [name]`
        
* Fetch: Lệnh này sẽ lấy toàn bộ dữ liệu  từ remote repository lưu vào vùng nhớ tạm để so sánh mà không gộp code luôn vào thư mục trên local và cho phép ta gộp thủ công.<br>
      `  git fetch [name branch]`
      
* Xem log (nhật ký commit)<br>
		`git log`
        
* Xem nhật ký commit trên một dòng<br>
       ` git log --online`
       
* Thay đổi commit cuối cùng, trong một số trường hợp bạn commit nhưng bị quên add một số file nào đó và bạn không muốn tạo ra một commit mới thì có thể sử dụng lệnh commit kết hợp tahm số amend gộp các file đó và bổ sung vào commit cuối cùng, vì vậy không tạo ra commit mới.<br>
		`git  - -amend`<br>
    Khi sử dụng **- - amend**  để gộp commit thì khi **push** ta thêm option **-f** để nó ghi đè tất cả các file mới nên các file cũ của lần commit trước.<br>
        `git push origin master -f`
        
* Xem thông tin về commit cụ thể:<br>
        `git show <mã commit>`
        
* Xem trạng thái của file (có 5 trạng thái ở trên):<br>
        `git status`
        
* Xem trước khi merge:<br>
        `git diff <branch-nguồn> <branch-đích>`
        
* Reset: Quay về một commit nào đó<br>
        `git reset --hard HEAD^`<br>
            **HEAD^** quay về trước đó **1 commit**, giống với **HEAD~**, **HEAD@**<br>
            Quay về n commit trước: **HEAD^n**<br>
            **--hard** bỏ commit và bỏ cả những thay đổi của các file trên local khi chưa commit<br>
            **--soft** bỏ commit nhưng giữ nguyên những thay đổi của các file chưa commit
            
* Stash: Dùng lệnh git stash hiệu quả<br>
    **Lưu lại thay đổi**<br>
        - Lưu lại những thay đổi chưa commit<br>
            + Lưu toàn bộ nội dung đang làm dở:<br>
                `git stash save #` (hoặc) `git stash`<br>
            Sau đó thì branch này trở nên clear và có thể chuyển branch luôn<br>
            Mỗi lần git **stash** sẽ lưu các thay đổi vào 1 **stack** trong vùng nhớ đệm<br>
        - Lấy lại thay đổi<br>
            + Xem danh sách<br>
                `git stash list`<br>
            + Xem danh sách và nội dung<br>
               ` git stash list -p`<br>
            + Xem nội dung của lần thay đổi 1<br>
                `git stash show stash@{1}`<br>
            + Apply lại thay đổi từ stash lần 1<br>
                `git stash apply stash@{1}`<br>
        - Xóa các thay đổi không cần thiết<br>
            + Lấy lại stash và xóa<br>
               ` git stash apply stash@{1}`<br>
                `git stash drop stash@{1} hoặc`<br>
                `git stash pop stash@{1}`<br>
        - Xóa toàn bộ stack<br>
                `git stash clear`<br>
                
* Bỏ qua các tập tin<br>
    Thường thì hay có một số loại tập tin mà bạn không muốn Git tự động thêm vào, để git biết các file hay fodler ko cho up lên ta tạo một file là .**gitignore** trong folder của mình và liệt kê các file hay thư mục không cho upload lên server như sau:<br>
			
            /file không cho đẩy
			/folder không cho đẩy
            
* Làm việc với nhánh:
    - Tạo và chuyển tới nhánh mới:<br>
			`git checkout -b [tên nhánh]`
    - Chuyển sang một nhánh đã có:<br>
			`git checkout [tên nhánh]`
            
### Merge và Rebase 	
   Cả hai lệnh rebase và merge đều dùng để giải quyết cùng một vấn đề: tích hợp những thay đổi từ một nhánh vào một nhánh khác. Tuy nhiên chúng thực hiện điều này theo những cách rất khác nhau.<br>
* **Merge**: Cách này khá đơn giản và nhanh chóng, bạn merge nhánh master vào nhánh đang làm việc  bằng các thao tác:<br>
		`git checkout feature`<br>
		`git merge master` hoặc<br>
		`git merge master feature`<br>
    Với cách làm này, một **commit merge** mới sẽ xuất hiện ở lịch sử commit của nhánh feature, giống như một mối nối để ghép lại lịch sử của cả 2 nhánh. Bạn sẽ có một cấu trúc commit trông giống như này:<br>

![](https://images.viblo.asia/2fa5a3a8-67d5-48a5-a346-498d674bb6a5.png)

* **Rebase**: Như đã nói ở trên, cách khác để tích hợp những thay đổi ở nhánh master vào nhánh feature là sử dụng rebase:<br>
        `git checkout feature`<br>
        `git rebase master`<br>
    Thao tác này sẽ đưa toàn bộ những commit mới tạo ở nhánh feature nối tiếp vào "ngọn" của nhánh master, nhưng thay vì sử dụng một commit merge , nó sẽ viết lại lịch sử của project bằng cách tạo ra những commit mới ứng với mỗi commit ban đầu của nhánh feature. Lợi ích chính của việc rebase là bạn sẽ nhận được một lịch sử commit rõ ràng, dễ theo dõi hơn<br>
  <strong>Dùng rebase đảm bảo thứ tự commit, giúp cho việc tracking sau này dễ hiểu hơn.</strong><br>

![](https://images.viblo.asia/d704dc24-f7ce-4e25-9677-70e5b8787a14.png)

* Xử lý conflict<br>
		
        Conflict có dạng
		<<<<<<< HEAD
		Code branch hiện tại
		=======
		Code branch merge
		>>>>>>> branch
       
    Đoạn bị xung đột được bắt đầu bằng` <<<<<<< HEAD` và kết thúc tại ` >>>>>>> branch`, được ngăn cách bởi đường `=======`. <br> Trong đó đoạn trên là 	của branch hiện tại và đoạn dưới là của branch cần merge (branch).<br>
Nhiệm vụ bây giờ của bạn là xem xét nội dung bị conflict đó xem cần sửa chỗ nào, lấy đoạn nào, sau đó xóa đi những ký hiệu trên. Giả sử mình muốn lấy code ở nhánh hiện tại thì mình sẽ tìm file bị conflict xong xóa như sau:<br>
        `Code branch hiện tại`
        
* Xóa tất cả các file trê repo ở server:<br>
			
            B1: git pull để tải tất cả các file về local
			B2:	C1 - Xóa hết các file trong folder trên local
	    		C2 - dùng git rm -r * -f -q
			B3: git commit -m "Xóa data"
			B4: git push -u origin master
            
* Khôi phục lại dữ liệu lỡ tay reset như trên đối với các thay đổi có commit:<br>
			`git reflog`<br>
			(để liệt kê history của con trỏ HEAD -để lấy index thao tác)
			`git branch recover-branch [ff31686 - index thao tác]`<br>
			(Tạo một nhánh để recovery dữ liệu)