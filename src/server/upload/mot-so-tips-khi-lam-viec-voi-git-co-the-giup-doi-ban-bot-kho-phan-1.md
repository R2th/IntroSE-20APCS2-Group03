### [Memo]Một số Tips and Tricks khi làm việc với Git có thể giúp đời bạn bớt khổ 
![](https://images.viblo.asia/29ece78b-8f3a-4363-8436-a505d1cc076e.png)
Dưới đây là một số vấn đề các cách em thường giải quyết. 
Rất có thể mọi người có cách giải quyết hay hơn, có gì comment giúp em nhé. 

**Note:** Post này sẽ thường xuyên được cập nhật mỗi khi em nhớ ra hoặc gặp vấn về mới và tìm ra cách giải quyết mới ạ.

### Một số vấn đề 

Thường trong một dự án, bạn thường tạo mới branch khi nào?  
Cái này chắc mỗi dự án sẽ quy định khác nhau.
Nhưng thông thường bọn mình sẽ tạo mới branch cho từng feature và đôi khi là từng task.  
Điều này dẫn tới việc sau một thời gian dài, lượng local branch sẽ tăng lên kha khá  
Và khi `$git branch -a` ta sẽ thấy cả đống branch được sắp sếp theo thứ tự alphabet.  
Về lâu dài, thường có 2 vấn đề sảy ra:  
1. Làm sao có thể order danh sách branch theo thời gian commit (hoặc theo thời gian tạo branch) ? 
2. Làm sao xóa bớt branch ko cần thiết ?  
Để xóa branch, ta có thể dùng **$git branch -D tên_branch** .  
Tuy nhiên nếu có quá nhiều branch thì việc làm đi làm lại là max chán, dù nó easy :sweat_smile: 

### Cách giải quyết.
#### 1. OrderBy Git branchs theo thời gian commit
Để order by branch theo thời gian commit ta dùng 2 lệnh sau:  

`$git branch --sort=-committerdate  # desc`  

Or

`$git branch --sort=committerdate  # asc`

#### 2. Xóa multiple branch theo pattern
Để xóa nhiều branch 1 lúc, ta nên tạo ra quy tắc đặt tên cho từng branch từ ban đầu.  
Và khi muốn xóa, ta chỉ cần đưa pattern của các branch là có thể giải quyết đc.  

`$git branch | grep "<pattern>" | xargs git branch -D`

Updating...

Cảm ơn mọi người đã đọc tới đây ạ.  
Nếu có vấn đề và cách giải quyết nào, mong mọi người comment giúp em nữa nhé!