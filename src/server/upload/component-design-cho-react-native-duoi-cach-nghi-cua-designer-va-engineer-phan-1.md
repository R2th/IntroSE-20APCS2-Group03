Nguồn: https://tech.kitchhike.com/entry/2018/09/30/230000
# Component design có liên quan trực tiếp tới tốc độ phát triển React native

Tôi là Shoken của CTO. Tôi đã bắt đầu phát triển app bằng React native từ 1,5 năm trước với KitchHike. Cái quan trọng khi phát triển, bảo trì dài hạn app React native chính là Component design. Qua 1,5 năm phát triển, Designer và Engineer đã có được nhận thức chung về Component design, chúng tôi còn học được rằng Component design liên quan trực tiếp đến tốc độ phát triển khi thêm mới, chỉnh sửa chức năng. Ở đây, tôi xin giới thiệu cách suy nghĩ về Component design của KitchHike app.

# Ngôn ngữ chung Atomic Design

Trong số các ngôn ngữ chung của Designer và Engineer, chúng tôi đã chọn Atomic Design. Với lựa chọn này tôi cảm thấy đã hình thành được khái niệm chung giữa Designer và Engineer, giúp ích rất lớn cho việc giao tiếp. Mặt khác, chúng tôi cũng phải rất vất cả để thống nhất được phạm vi và nhận thức về Atom, Molecule, Organism. Từ đó chúng tôi hiểu được rằng có vẻ logic phân tách component của Designer và Engineer là khác nhau. Thông qua tiến hành thảo luận, chúng tôi cũng nhận ra sự khác nhau này xảy ra là do quan điểm của mỗi bên khác nhau.
Vậy nên trước tiên phải bắt đầu với việc lý giải các yếu tố của component và nhiệm vụ của chúng.

# 4 yếu tố cấu thành nên component
Tại sao lại có sự khác nhau trong Component design giữa Designer và Engineer. Trong team của chúng tôi thì nguyên nhân đến từ nhận thức khác biệt giữa hai bên. Khi nhìn vào cấu trúc component từ 4 yếu tố sau, chúng tôi đã nhận ra sự khác nhau về phạm vi phụ trách của Designer và Engineer.

| Yếu tố | Giải thích | 
| -------- | -------- | 
| Information structure     | HTML là phần đảm nhận nhiệm vụ     | 
| Style     | CSS là phần đảm nhận nhiệm vụ     | 
| State     | React component sẽ quản lý. Cũng có trường hợp phát sinh communicate với bên ngoài     | 
| Interaction/Funtion     | CSS là phần đảm nhận nhiệm vụ     | 

.

Với team chúng tôi, Designer hướng đến Information structure, Style, Interaction/Funtion, còn Engineer thì hướng đến State, Interaction/Funtion. Có những lúc việc thay đổi để tối ưu hoá trên quan điểm design theo cách nghĩ của designer, và việc thay đổi để tối ưu hoá trên quan điểm implement theo cách nghĩ của engineer là không đồng nhất. Sau khi tiến hành tranh luận, việc lý giải và nhận thức được vẫn đề này rõ ràng là một điều vô cùng quan trọng.

# “Tính cấu trúc design" và “Tính tái sử dụng code"
Theo tôi việc đóng gói nhiều vai trò lại với nhau là nguyên nhân chủ yếu khiến Component design trở nên khó khăn. Component của React native tự thân đã mang trạng thái và có nhiệm vụ gắn với trigger thay đổi trạng thái.
Thêm vào đó để tiến hành communicate với bên ngoài hay nhận truyền callback thì cần phải cân nhắc đến những cái như giới hạn hay tính tái sử dụng code. Nếu chỉ nhắm mục tiêu Component design vào việc nâng cao tính cấu trúc design thì tuỳ trường hợp mà component đó có thể khó mà tái sử dụng code được. 
Sau khi xem xét, team tôi đã đưa ra được phương châm là: Trường hợp cân nhắc đến tính tái sử dụng của component thì các yếu tố implement sẽ có độ ảnh hưởng lớn và engineer sẽ là người chịu trách nhiệm cuối cùng về Component design.

# Vấn đề Button là Atom hay Molecule
Về cơ bản thì trong component button sẽ có icon và string. Nếu coi icon hay string là Atom thì button sẽ là Molecule nhưng vấn đề là điều đó có thực sự tốt hay không.
Nếu xem xét từ quan điểm Tính tái sử dụng component mang tính engineer đã nói bên trên, thì toàn bộ team đều nhận thức chung rằng: “Để icon hay string làm component thì có vẻ có thể sử dụng nó để tổ chức các button. Chúng tôi muốn tái sử dụng button dưới dạng component nhỏ nhất. Nên sẽ để nó là Atom".

(còn tiếp)