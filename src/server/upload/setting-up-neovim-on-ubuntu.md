# NeoVim?

NeoVim là 1 extension của Vim nhằm cải thiện khả năng phát triển mở rộng cho các dự án open source, . Không chỉ mang lại sự ổn định hơn và cải thiện hiệu suất, năng suất cho Vim, NeoVim còn làm cho code dễ bảo trì hơn rất nhiều và làm giảm rào cản cho bất kỳ ai quan tâm đóng góp cho cộng đồng NeoVim. 

Mình làm việc trên VSCode cũng 1 thời gian dài rồi nhưng cũng quyết định chuyển qua NeoVim vì sự gọn nhẹ, linh hoạt không dùng quá nhiều tài nguyên của máy tính (VSCode thì các bạn biết rồi đó, dự án mình làm phải chạy nhiều thứ cùng lúc nên bật 1, 2 cái lên là treo ngay :rofl:)

# Install NeoVim

Ở đây mình đang sử dụng hệ điều hành Ubuntu nên sẽ hướng dẫn cài đặt NeoVim và 1 số lưu ý trên Ubuntu. Ở các hệ điều hành khác, các bạn có thể tham khảo thêm phần cài đặt trên trang [Installing-Neovim](https://github.com/neovim/neovim/wiki/Installing-Neovim).

Ở **Ubuntu 18.04** thì NeoVim đã được tích hợp hỗ trợ sẵn rồi nên các bạn chỉ cần chạy lệnh
`sudo apt install neovim` là có thể cài đặt được NeoVim rồi. Vì NeoVim sử dụng cả python và python3 để chạy 1 số feature hay plugin nên các bạn nhớ kiểm tra xem máy đã có support hay chưa bằng lệnh `:python` rồi nhấn `<TAB>` để hiện thị như trong hình.

![](https://images.viblo.asia/460ac296-10c6-4445-8f4b-fd6c6bb43fbf.png)

Nếu chưa cài thì chỉ cần chạy 2 lệnh sau là ổn: 

```
sudo apt install python-neovim
sudo apt install python3-neovim
```

Đối với **Ubuntu 16.04** (bản này mình đang xài) thì sẽ hơi phức tạp hơn 1 xíu do NeoVim chưa được tích hợp trong hệ điều hành lúc đó. NeoVim được add trong "Personal Package Archive" nên chúng ta có thể cài đặt bằng `apt-get`.

Hiện tại NeoVim có 2 bản (stable và unstable) để các bạn lựa chọn. Đối với những bạn đã có kinh nghiệm lâu năm với Vim hay NeoVim và muốn test thử tính năng mới hay viết các plugin thì có thể mạnh tay chọn bản unstable, còn những ai như mình còn tập tành sử dụng thì cứ stable cho chắc ăn :joy:

```
sudo add-apt-repository ppa:neovim-ppa/stable  "chuyển stable thành unstable cho bản unstable NeoVim
sudo apt-get update
sudo apt-get install neovim
```

**Note**: nếu không sử dụng được lệnh `add-apt-repository` thì các bạn chạy thêm `sudo apt-get install software-properties-common`. Version cũ hơn nữa của Ubuntu thì cài thêm `sudo apt-get install python-software-properties`.

Tất nhiên cũng cần phải cài thêm 1 số module tiên quyết của python và python3 nữa để hoạt động trơn tru:
`sudo apt-get install python-dev python-pip python3-dev python3-pip`. Nếu các bạn dùng bản Ubuntu cũ hơn 16.04 thì cài các module trên bằng các lệnh sau:

```
sudo apt-get install python-dev python-pip python3-dev
sudo apt-get install python3-setuptools
sudo easy_install3 pip
```

Các bạn nhấn tổ hợp phím `Crtl + Alt + T` để bật terminal mặc định của Ubuntu lên, gõ `nvim` rồi nhấn `Enter` và... Tada, vậy là đã cài đặt thành công NeoVim rồi.

![](https://images.viblo.asia/5ef9dfd7-f34a-4689-9db0-1b7bedd51e07.png)

Nói thế chớ vẫn phải kiểm tra lại xem mọi thứ đã cài đặt ổn thỏa hết chưa chớ nếu không trong lúc chạy lại quăng ra 1 đống lỗi đấy :rofl:. Các bạn dùng lệnh `:checkhealth` để kiểm tra tình trạng NeoVim của mình.

 ![](https://images.viblo.asia/2ab1b753-b4c6-4261-868a-7725b22a42af.png)
 
 `OK` xanh lè thế này hết là ổn rồi đấy. Nhưng chẳng may chỗ nào bị `ERROR` thì nhớ hỏi Google tìm cách fix nhé :joy:
 
 # NeoVim Configurations
 
 Đã cài đặt xong rồi thì không thể thiếu bước tiếp theo quan trọng không kém đó là config. Các bạn tạo file `init.vim` theo đường dẫn `~/.config/nvim/` vì khi khởi động NeoVim bằng câu lệnh `nvim`, file `init.vim` sẽ mặc định được gọi tới đầu tiên (nếu có) để thiết lập các config cơ bản của NeoVim.
 
NeoVim cho phép chúng ta thiết lập nhiều các config khác nhau. Ở trên mạng cũng có rất nhiều file config Vim/NeoVim khác nhau và hầu như 1 file rất dài và được tạo bởi rất nhiều câu lệnh. Hầu như có 1 số câu lệnh các bạn hầu như không dùng tới hoặc sẽ không thể sử dụng nếu không cài đặt thêm plugin, nên trước khi sử dụng thì mình khuyên mọi người nên tra cứu tìm hiểu tác dụng của từng câu lệnh ngay trên NeoVim bằng cách gõ `:help ten_lenh` với `ten_lenh` các bạn thay thế bằng tên của lệnh muốn tra cứu. Ví dụ: `:help number`

### Lấy ví dụ về hiển thị line number

1.  Absolute line number:  Hiển thị chính xác vị trí số dòng cố định (không phụ thuộc vào vị trí con trỏ)
```
set number      " hoặc là set nu
```
![](https://images.viblo.asia/e99e850a-4bb0-4427-87db-a1aadeafbb57.png)

2. Relative line number: Hiển thị chỉ số dòng có vị trí tương đối so với vị trí dòng chứa con trỏ (dòng chứa con trỏ là 0)
```
set relativenumber      " hoặc là set rnu
```
![](https://images.viblo.asia/7973e042-9a79-4390-b8c6-b321c07b2dba.png)

3. Hybrid line number: Kết hợp 2 mode trên, hiển thị chỉ số dòng có vị trí tương đối so với vị trí dòng chứa con trỏ, đồng thời hiển thị vị trí tuyệt đối của dòng chứa con trỏ
```
set number
set relativenumber
```
![](https://images.viblo.asia/75519c3e-15f0-4c69-b634-9988b8c3c948.png)

Bản thân mình sẽ thích sử dụng cách số 3, vừa biết được vị trí của dòng mình đang ở, vừa có thể chuyển con trỏ xuống những dòng khác một cách nhanh chóng mà không cần dùng chuột hay thực hiện cộng trừ quá nhiều :rofl:

Do sẽ còn có nhiều và rất nhiều các câu lệnh khác nữa nên thường mình sẽ chia lệnh thành các mục để quản lý, mỗi mục tương ứng với 1 file `.vim`. Trường hợp của mình (như ở hình dưới) thì ngoại trừ file `init.vim` ban đầu chỉ chứa khai báo các plugins, mình tạo thêm 

* File `base.vim` chỉ bao gồm các thiết lập cơ bản của Vim thuần túy (core Vim).
* File `mappings.vim` chỉ bao gồm các thiết lập mappings và bindings.
* File `plugins.vim` chỉ bao gồm thiết lập cho các plugins.

Tuy mức độ mở rộng của thằng NeoVim của các bạn mà có thể chia nhỏ ra thêm nhiều file hay thư mục để dễ quản lý hơn nữa nhé :grin:

![](https://images.viblo.asia/98d0bc76-3d4d-42a4-85f4-051bc6edfce1.png)

Cuối cùng là khai báo các file ấy vào trong `init.vim` nữa là xong rồi :100:

![](https://images.viblo.asia/cf59f88d-27c0-4114-ab02-f2f7a56ca573.png)

**Note**: Một số config cần lưu ý

* Python/Python3

Tại đầu file `init.vim` các bạn nên set up trước các biến global cho python và python3 vì NeoVim chạy phụ thuộc chủ yếu vào 2 thằng này (vì đang chạy trên Ubuntu thường đã có sẵn python và python3 nên dù không khai báo thì NeoVim vẫn hoạt động được do nó sẽ tự động tìm ở các thư mục mặc định). 

Tuy nhiên ở 1 số plugin còn đòi hỏi phải có python3.6 trở lên (như thằng deoplete) thì các bạn down phiên bản python phù hợp rồi thay vào câu lệnh dưới là được (ở đây mình sử dụng hẳn bản 3.7 luôn :grin:)

```
let g:python_host_prog = '/usr/bin/python2'
let g:python3_host_prog = '/usr/bin/python3.7'     "python3.7
```

* nocompatible mode

Vì NeoVim mặc định đã là nocompatible mode rồi (để check thì các bạn gõ `:help nocompatible` là thấy ngay) nên không cần phải thêm lệnh `set nocompatible` vào đầu file `init.vim` như 1 số trang tutorial trên web. 1 số file config không chỉ dùng cho NeoVim mà dùng cho cả Vim nữa nên mới cần thêm dòng trên. Bởi vậy nên trước khi bỏ lệnh nào vô file config thì cũng phải tìm hiểu trước là nó có tác dụng gì là vậy :joy:

* Vim-Plug

Đối với 1 số bạn sử dụng Vim-Plug làm plugin manager thì cũng không cần câu lệnh `filetype plugin indent on` vì mặc định Vim-Plug sẽ tự động thiết lập cho mình luôn rồi nhé. (tương tự muốn biết lệnh trên có tác dụng gì thì lại `:help` thôi).

# Enjoy NeoVim

Thiết lập xong xuôi rồi thì nhúng tay vào xài thôi :sunglasses:. Đối với những bạn mới lần đầu sử dụng cú pháp của Vim chưa quen thì nên lướt qua `:Tutor` làm đi làm lại vài chục lần cho quen tay nhé.