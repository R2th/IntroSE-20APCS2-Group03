# PhpStorm Live Template và  PhpStorm VCS
## PhpStorm Live Template
Bạn có nhiều đoạn code lặp lại, bạn muốn sử dụng cho lần sau mà không muốn phải viết lại, hay đơn giản bạn muốn code nhanh hơn `n lần` so với bình thường. Một công cụ tuyệt vời có thể giúp bạn làm điều đó: PhpStorm Live Template.
Chỉ cần gõ 2-3 từ rồi ấn `tab` mọi thứ sẽ được tự đông thực hiện, cứ theo thể bạn nghĩ gì là có nấy.
Nghe thôi đã thấy hào hứng rồi. Vây bây giờ chúng ta hãy thử tạo một Live Template cho mình nhé:
### Tạo Live Template qua `Setting`
Đầu tiên trong màn hình PhpStorm, chọn File/Setting/Editor/Live Template
![](https://images.viblo.asia/c359418c-c1ab-4435-9abb-dee5f7386b16.png)
Chúng ta sẽ nhìn thấy rất nhiều các Template khác nhau mà thường chúng ta hay sử dụng, ví dụ: `eco` viết tắt cho `echo "$end"`...

Chúng ta sẽ tạo một `Live Template` riêng cho mình bằng cách: 
Từ `Live Template`  chọn `user` chọn biểu tượng dấu `+` góc trên bên phải cửa sổ, chọn `1, Live Template` để tạo 1 `Live Template` mới.
Các thuộc tính cần có:
- `abbreviation`: `keyword` nơi mà bạn muốn dùng để thay thế cho đoạn mã code cần lưu.
- `Description`:  miêu tả về đoạn code.
- `Template text`: nơi viết đoạn code bạn cần lưu.
Sau đó bạn cần chọn loại file sử dụng `Live Template` này bằng cách click vào `Define` hoặc `Change` sau đó chọn loại file. Thường khi viết code PHP mình thường để HTML text, HTML.
![](https://images.viblo.asia/377f5022-a4ba-413a-b8e3-fe2a03d1d14a.png)
ấn `OK` để lưu lại và bắt đầu sử dụng.
### Tạo Live Template trực tiếp trong khi code:
Trong quá trình code, bạn viết 1 dòng, 1 đoạn code hay và muốn sử dụng làm Live Template chúng ta có thể làm bằng cách:
Bôi đen đoạn code muốn lưu trữ, chọn `Tools` trên thanh công cụ, chọn `Save  as Live Template`  và thực hiện các bước như cách thứ nhất. 
Vậy là chúng ta đã tạo được một `Live Template` để sử dụng cho lần sau! Rất nhanh phải không, và sau đó muốn lấy đoạn code đó ra chỉ cần gõ `keyword` + `tab` . Code sẽ tự sinh ra như một điều kỳ diệu, bạn sẽ code nhanh mà không cần lo quên thuộc tính, quên chính tả!
## PhpStorm VCS
### PhpStorm VCS một công cụ quản lý code siêu dễ hiểu:
PhpStorm VCS là công cụ quản lý code của PhpStorm, nó tự lưu code khi vừa thay đổi (rất tuyệt khi không cần phải Save file khi chỉnh sửa).
Nó còn được tích hợp với GIT.
Lịch sử thay đổi files cũng sẽ được lưu lại, mang lại hiệu quả khi chỉnh sửa code. Ví dụ, bạn code một file, hôm nay bạn thay đổi cái này, ngày mai thay đổi cái kia, ...
Đến một lúc nào đó bạn muốn trở về đoạn code nào đó nhớ là đã từng viết trước đây nhưng không nhớ nó là gì, vậy bạn phải làm sao?
Lúc này `VCS History` sẽ giúp được bạn:
chọn file muốn xem. Chọn `VCS/ Local History/ Show History` 
Một màn hình trực quan sẽ được hiển thị:
![](https://images.viblo.asia/766c9572-f936-46ea-ad60-4ae9fb7ac4e1.png)
Ở đây bạn có thể xem lại code từ 30 ngày trước và lấy code từ 30 ngày trước. Thật là một cỗ máy thời gian tuyệt vời cho coder!

### VCS thể hiện trực quan các Branch
 Bạn có thể xem các Branch của mình một cách trực qua qua cây `Branch` mà VCS đã tạo ra:
 ![](https://images.viblo.asia/0241cc7c-4832-4043-8a2f-3174d567134a.png)
 Để làm được điều này bạn cần click vào `Version Control` góc dưới bên trái màn hình, sau đó chon `Log`:
  Màn hình cây `Branch` thể hiện rất nhiều điều:
  Bạn có thể biết các `branch` hoặc `commit` nào được tạo, thời gian tạo, các lần `rebase`, `merger` nhánh chưa được `merger`, các `file` đã thay đổi trong khi code.  
  ### Conflict với PhpStorm
   Hầu hết, ban đầu khi học `GIT` rất là khó khăn khi phải fix `conflict`, với những dấu `xương cá` đầy nguy hiểm, có khi xóa nhầm code của người khác vì nó quá khó nhìn. Nhưng với PhpStorm VCS việc fix `conflict` không còn là lỗ lo nữa:
  Đầu tiên để fix được `conflict` bạn cần:
  - Chọn: VCS/Git/Resolve Conflict 
  -  Chon các file đang bị `conflict`. Click đúp vào file cần sửa:
  ![](https://images.viblo.asia/1362ba0f-abaf-4d75-a03c-8d649964eb98.png)
  khi đó màn hình sẽ hiển thị trực quan các thay đổi giữa: `code local`   --   `result` -- `code Server`
  Bạn sẽ click vào các mũi tên xanh lá, xanh dương, đỏ để fix `conflict`. 
  Cuối cùng là `Apply`. 
  Rất trực quan và dễ hiểu phải không.
  Như vây, sẽ không còn mối lo mỗi khi fix `conflict` nữa rồi, PhpStorm thật tuyệt vời (ngoại trừ việc phải trả phí).