# Git dành cho người đi làm
Xin chào các bạn, trong bài viết này mình sẽ giới thiệu cũng như là chia sẻ những kinh nghiệm sử dụng Git khi mình đi làm. Có thể thiếu xót nhiều, nhưng mình hi vọng có ích cho các bạn mới vào môi trường làm việc như mình
Nếu như có sai xót gì, các bạn hãy nói cho mình biết nhé, để mình hoàn thiện bài viết tốt hơn.

Mình sẽ không giới thiệu về Git với những dòng lệnh nữa, mà trong bài hôm nay mình sẽ giới thiệu cho các bạn TortoiseGit UI.

**Quản Lý Source Code Trên Github Đơn Giản Với TortoiseGit.**

Mỗi người đều có lựa chọn riêng, có thể dùng Git qua gitbash, nhưng khi mình đi làm, mình được đồng nghiệp giới thiệu và sử dụng TortoiseGit, mình cảm thấy dễ dàng hơn và tốc độ thao tác nhanh hơn rất nhiều :D

Trước khi bắt đầu, mình sẽ giới thiệu lại 1 chút về Git nhé.![](https://images.viblo.asia/af42d260-9e7f-404f-a1c8-e3535e604666.png)
Mình hiểu nôm na như này nhé, khi làm việc chung với nhau, ta nhất định sẽ có những file chung hoặc riêng chia sẽ với những người khác trong team hoặc mỗi người sẽ có task riêng, làm trên phần riêng của mình đã được giao mà khi làm xong rồi không lẽ phải gửi tất cho một người để họ tổng hợp hay merge code. Để thuận tiện hơn, chúng ta sẽ sử dụng Git để quản lí source. Trên hình các bạn có thể thấy, các máy tính của các nhân viên(local) sẽ được kết nối với các repo(remote), thao tác chủ yếu sẽ là pull(kéo từ remote về local) và push( đẩy từ local lên remote cho người khác cùng sử dụng). Teamwork sẽ được cải thiện rất nhiều, quản lí source dễ dàng hơn nhiều.

### Phần 1: Cách Setup TortoiseGit
1. Đầu tiên là bạn phải có tài khoản tại github.com cái đã, nhấn vào liên kết và tạo một tài khoản cho mình thôi, nếu đã có tài khoản bạn có thể skip bước 1.
2. Tạo một repository rồi làm tiếp.
3. Tiếp theo ta tải về git-for-windows [tại đây](https://git-scm.com/download). Và cài vào máy.
4. Tải và cài đặt TortoiseGit [tại đây](https://tortoisegit.org/download/). Tải thêm pack ngôn ngữ nếu bạn muốn (optional)

Nếu không, các bạn có thể làm theo video sau [link](https://www.youtube.com/watch?v=pttIoMyyMaM)

### Phần 2: Hướng dẫn sử dụng và chia sẻ kinh nghiệm sử dụng TortoiseGit
**1. Thao tác sơ qua về cách sử dụng TortoiseGit**
- Mình tạo một repository trên github.com tên là "git-test-repo"![](https://images.viblo.asia/655de841-57e7-4165-8f1c-444e7ef5de39.png)
- Giờ clone về thôi :D![](https://images.viblo.asia/99f9927b-3628-422b-9924-6c7bfc586015.png)
- Nhập url + chọn nhánh + đặt tên thư mục clone về![](https://images.viblo.asia/e1121cac-7652-4c0c-b2ca-1b1760a991d8.png)
- Clone thành công, rất dễ sử dụng phải không :D![](https://images.viblo.asia/b8ca03df-4316-4998-a3cc-abf9c9aa116b.png)

- Cùng thử một số thao tác cơ bản nhé, dạng kiểu đổi từ cmd -> sử dụng UI thôi mà hehe( thêm file -> push file lên -> edit thử trên github( giống như file được edit và push từ máy khác) -> pull về)
![](https://images.viblo.asia/603a9d04-cfd8-47bf-bf23-94597720ce57.png)
![](https://images.viblo.asia/2529d036-646e-49bc-a20e-7dcd965181bc.png)
![](https://images.viblo.asia/6e4324aa-ca91-49c1-a6c6-b763a6a74369.png)

- Sau khi commit sau, thông thường sẽ có 2 lựa chọn commit + push lên luôn nếu bạn làm 1 mình 1 brach hoặc không động( mở file hoặc edit file) đến file ai đang làm cả. Tuy nhiên theo lời khuyên của mình, các bạn cứ pull về r push lên nhé.![](https://images.viblo.asia/3e9a2471-8f69-4ba3-b904-ad913357a01e.png)
- Tuy nhiên đây là repo mình mới tạo nên push luôn.![](https://images.viblo.asia/067667df-57ec-4160-9133-49c612358401.png)
- F5 github và coi repo đã update rồi![](https://images.viblo.asia/6cec66dd-ae53-455b-a527-2e672694d35c.png)
- Edit file trên repo![](https://images.viblo.asia/cf9fdd26-ed83-42d2-8242-385d42b35ed7.png)
- Ok, giờ kéo về thôi![](https://images.viblo.asia/97abd2f3-0811-4fdd-9a6c-a0e9e12f4c5b.png)
- Done![](https://images.viblo.asia/2ab6b7d6-f2cb-47da-83b1-e9f6fcd93617.png)
![](https://images.viblo.asia/f09e0eac-3a17-480d-a998-0c5b4bee233a.png)
- Kiểm tra file test.text xem đã thay đổi chưa?![](https://images.viblo.asia/dcb78199-d68a-4e03-83a6-9dc05589ed34.png)

**2. Sau đây mình sẽ chia sẻ một số tips khi sử dụng Git nhé**

**- Đầu tiền, trước khi bắt đầu làm việc, hãy pull source mới nhất về, hay nói chính xác đó trước khi tạo mới hay edit file nào đó, ta phải đảm bảo rằng file đó phải là version mới nhất trên Git**

Tại sao mình lại đưa ra cái tip này? Bởi hồi mình mới đi làm, mình rất hay quên kéo source mới nhất về, mà đã update file đó rồi dẫn đến khi mình commit rồi push file đó lên thì dính conflict mà các bạn biết rồi đó, conflict sửa nhiều khi rất mất công và thậm trí còn rất đau đầu nữa, nên để hạn chế vấn đề này, hãy pull về rồi hẵng làm gì thì không, chứ không lại khóc không ra nước mắt đó hehe

**- Tiếp theo, thủ thuật tạo nhánh phụ để code rồi merge vào nhánh develop cực nhanh :D**

**Bước 1: tạo folder theo tên nhánh phụ ví dụ depchai_branch, rồi clone nhánh develop về nhé( rất quan trọng đó)**
ở đây mình đã tạo sẵn nhánh develop rồi nhé, tạo folder rồi clone về thôi 
![](https://images.viblo.asia/89695ef5-2dde-442f-aad4-e653ef9e4ef8.png)
![](https://images.viblo.asia/9f8195b5-016d-4b06-9748-b727f4051a32.png)

- nhánh develop trên remote![](https://images.viblo.asia/8b41f440-3cb1-46c2-9dd2-d0ec06185be0.png)
- nhánh develop trên local(máy của ta đó :D)![](https://images.viblo.asia/036440c9-7eee-49eb-9e79-948965d12ae4.png)

**Bước 2: Tạo nhánh rồi chuyển sang nhánh đó**![](https://images.viblo.asia/4fb97e55-8c30-4bbf-8bae-f6e5a9c317d6.png)

- Mình tạo nhánh "depchai"
![](https://images.viblo.asia/57e801e8-bab3-4179-8ce3-3e42169e7582.png)

- chuyển sang nhánh "depchai"![](https://images.viblo.asia/521cb72c-63a4-4af1-9650-5e69c0d8adb1.png)
![](https://images.viblo.asia/8f230f06-3c0c-48a7-9eb7-a6734821e2e3.png)
![](https://images.viblo.asia/b933a2ba-ef55-4123-9c50-da3e8dfb907e.png)

**Bước 3: push lên remote, quá easy đúng không nào :D**![](https://images.viblo.asia/d460b0cc-203b-46e0-b64c-21cfd58cc85e.png)
![](https://images.viblo.asia/7377e3b9-def1-46b0-b59f-5c0b0777b9f9.png)

- Done rồi, check remote thôi![](https://images.viblo.asia/702e3e28-5ff9-412a-b982-fdc534b23a38.png)
![](https://images.viblo.asia/2849cf54-3d1f-4ae7-8ae8-16fc5f909934.png)

**Bước 4: Sau khi code xong, cần merge vào nhanh develop, ta làm như sau:**

- Có nhiều cách tạo merge request, tuy nhiên mình sẽ làm cái dễ + an toàn nhất thôi hehe
- Đầu tiên phải có gì thay đổi so với nhanh depchai so với nhanh develop![](https://images.viblo.asia/71b88828-566f-4b2e-8a04-1b8bffbc1a08.png)

- Sau đó, các bạn lên trên github hoặc gitlab tạo merge request( github là pull request)![](https://images.viblo.asia/7709c090-b9cd-4524-b068-34164c310821.png)
- Chọn nhanh cần compare, ở đây là nhánh depchai và nhanh develop![](https://images.viblo.asia/5123a6dc-df37-4be7-8a0a-caf6c62f5698.png)
- Ta kéo xuống sẽ thay sự khác nhau giữa 2 nhanh![](https://images.viblo.asia/726ca9e7-cb1a-4aaa-b3d5-9483a2f616d8.png)
- tạo pull request thôi ![](https://images.viblo.asia/755e4e94-a6d8-4b27-bf92-3c96578ecca4.png)

- Thường ở step này, nếu chắc chắn ok rồi thì merge thôi còn không thì đưa link merge request cho PM hay teamlead review nhé ![](https://images.viblo.asia/dc56ac72-1520-4016-9de8-e5c970b985c0.png)
- Ở đây mình là PM luôn nên merge luôn hehe![](https://images.viblo.asia/0739822e-8ec3-443b-a77a-04228023d44a.png)
![](https://images.viblo.asia/2a50cc8a-15d4-422d-bf5a-1d1c782d8d17.png)

- giờ check xem nhánh develop đã merge chưa nhé![](https://images.viblo.asia/0390d3c1-d3ec-4a02-9f36-a86e143d921a.png)
-> quá dễ để tạo nhánh và merge nhánh phải không nào hehe

**- Tiếp theo, khi các bạn update code thì chỉ để động vào những dòng mà các bạn thay đổi so với source, không nên thay đổi những dòng cũ**

- Trong tip này, mình cũng hướng dẫn các bạn compare file trước và sau khi sửa hoặc compare với những commit cũ hơn
- Ở đây, mình sẽ sửa file develop.txt![](https://images.viblo.asia/5eb1b404-30cf-4848-b712-b424e4231d27.png)
- Thử compare xem với source cũ và với file hiện tại nhé![](https://images.viblo.asia/647f0788-7ee0-43bc-9c29-8a6ff6783674.png)
- Chọn các mục cần so sánh![](https://images.viblo.asia/3022c835-9f28-45b5-ae7a-5d44c9bde4e8.png)
- Phần bôi vàng chính là những phần đã thay đổi![](https://images.viblo.asia/1a2b7488-7e63-489d-a388-aa269edc724e.png)
- Khi muốn thay đổi dòng bên file các bạn đang làm giống với commit trước thì chỉ cần ấn vào dòng đó rồi click "use left block" rồi control + s là ok![](https://images.viblo.asia/f4880d04-e390-4894-81ca-fef1fa062fa4.png)
- > Cách compare này rất tiện cho các bạn muốn so sánh xem mình đã update đúng format chưa? thừa thiếu chỗ nào không? hay thậm chí xử lí conflict nhé

**- Tip cuối này, mình hướng dẫn fix conflicts 1 cách cục súc, đặc biệt conflict file excel( con hàng này rất khó giải quyết)**
Đối với dạng conflicts do excel khi các bạn UT hay viết tài liệu, ... thì trước khi push lên tốt nhất là backup file đó ra chỗ khác rồi hẵng thao tác. Và khi bị conflicts, đỡ đau đầu nhất là xóa hết folder đó đi và clone lại rồi nhét file của bạn vào hoặc revert tất cả các phần hay folder bị đỏ khi pull về, rồi pull lại rồi push lên, khi commit nhớ xem số lượng file nhé, kẻo ghi đè lên file của đồng đội là nguy hiểm lắm đó hehe

Lời kết, cám ơn tất cả các bạn đã đọc bài viết của mình. Mình sẽ cố gắng tích lũy và chia sẽ cho các bạn kinh nghiệm mà mình đọc được nhé :D