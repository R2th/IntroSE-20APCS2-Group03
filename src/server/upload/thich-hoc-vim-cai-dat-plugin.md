# Mở bài
Trong VIM, có một thứ không cần nhắc đến thì ai cũng biết nó là gì mà không ai nói nó là gì thì cũng chẳng ai biết nó là gì. Nên mình cũng không biết nó là gì mà Thân bài thì biết đấy.
# Thân bài
## Cài đặt Plugin Manager
Để cài đặt plugin, trước hết chúng ta cần có plugin manager. Có một vài plugin manager phổ biến được nhiều người dùng như là NeoBundle, Vundle, VimPlug, Pathogen,... Mình thì dùng VimPlug vì nó nhanh, gọn nhẹ nên mình cũng sẽ hướng dẫn các bạn dùng plugin manager này. Các bạn có thể tham khảo thêm repo này để thấy được tốc độ của VimPlug khá là nhanh: https://github.com/junegunn/vim-startuptime-benchmark#result. Trong chart này sẽ có Vanilla, đừng nghĩ nó là kem Vani mà nó là dùng Vim 8 thuần, Vim 8 hỗ trợ load, cài đặt plugin nếu như bạn đặt đúng folder mà Vim 8 là setting. 

Quay trở lại, để cài VimPlug, trước hết, các bạn cần truy cập vào trang github này: https://github.com/junegunn/vim-plug. Các bạn mở terminal lên, đối với những bạn dùng unix như Ubuntu, Mac thì các bạn chạy lệnh: 
```
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```
Còn đối với những bạn dùng Windows thì các bạn chạy lệnh:
```
iwr -useb https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim |`
ni $HOME/vimfiles/autoload/plug.vim -Force
```
Các bạn đợi một xíu, những command này sẽ tự động lấy chương trình từ repo này, rồi cài đặt vào máy, setup những folder cần thiết cho chúng ta. Sau khi xong thì hoan hô, các bạn đã có plugin manager cho VIM trong máy mình rồi đấy
## Sử dụng Plugin Manager
Sau khi đã cài đặt xong, các bạn mở file `.vimrc` lên, copy và paste cái này vào
```
call plug#begin()
// Your plugin go here
call plug#end()

// Your setting go here
```
Như các bạn thấy, tên của plugin sẽ được bỏ vào giữ cái begin với end. Còn những cái setting sẽ được để xuống phía dưới. Lí do nên để setting ở dưới vì nếu để trước khi cài plugin, thì đôi khi plugin chưa được cài mà setting lại dùng plugin đó sẽ gây ra lỗi.
## Cài đặt Plugin
Phù, cuối cùng cũng đến bước cài đặt plugin. Trong video của bài colorscheme, mình có nhắc đến cái issue là cài onedark khá là khó nhằn, phải copy paste đủ thứ chứ không dễ thở như gruvbox. May thay, diễm giờ đã khác diễm xưa, chúng ta đã có plugin manager, cài đặt onedark sẽ dễ dàng hơn. Đây là repo của plugin one dark có chứa colorscheme onedark.vim. Để cài đặt plugin này, các bạn sẽ copy tên repo, trong ví dụ này, tên repo sẽ là `joshdick/onedark.vim`. Sau đó, các bạn vào `.vimrc`paste vào chỗ kẹp giữa hai cái call begin với call end :D. Thêm chử Plug ở đầu và thêm nháy đơn bọc lấy tên repo. Nó sẽ trông như vầy: 
```
call plug#begin()

Plug 'joshdick/onedark.vim'

call plug#end()

// Your setting go here
```
Xong rồi chúng ta sẽ làm mới lại file này để vim thấy nó mới mẻ :D bằng cách dùng lệnh `source ~/.vimrc`. Sau đó, trong vim, chuyển sang command mode và gõ lệnh `:PlugInstall`. VIM sẽ có thêm một cái màn hình bên trái như vầy để show cho chúng ta thấy quá trình cài đặt:
![image.png](https://images.viblo.asia/3aa8edea-eb3f-4624-aa07-6c7632918359.png)
Sau khi cài xong, các bạn gõ `:q` để tắt màn hình bên trái. Để sử dụng onedark, đổi colorscheme thành onedark, lưu lại. Bùm, magic chưa xuất hiện, poor VIM. Lí do chưa có gì thay đổi vì VIM chưa thấy mới mẻ :D. Chúng ta phải refresh lại bằng `source ~/.vimrc`. Sau đó thì đây là kết quả:
v![image.png](https://images.viblo.asia/e9519bab-73b4-4581-bb4d-66c093c01ee1.png)
Nhìn nghệ nghệ con bà hai bán kệ.
# Kết bài
So đó là tất cả cho bài ngày hôm nay. Mong là các bạn đã biết cách cài đặt plugin manager cũng như là cách cài đặt plugin trong VIM nhé. Sau khi biết cài plugin, mình sure là VIM journey của bạn sẽ thú vị hơn vì chúng ta có nhiều plugin cool ngầu lắm :D :D :D.