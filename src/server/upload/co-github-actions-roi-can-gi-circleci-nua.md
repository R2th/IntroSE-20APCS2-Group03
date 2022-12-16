Gần đây Github mới giới thiệu một tính năng mới được gọi là [GitHub Actions](https://github.com/features/actions), hỗ trợ CI/CD và tôi đã nghĩ đến việc migrate toàn bộ dự án đang sử dụng CI của mình lên đó. Tôi đã được  sử dụng bản beta của `Github Actions` và thử chuyển ứng dụng React Native  từ CircleCI lên `Github Actions`. Và đây là cách nó chạy: 
![](https://images.viblo.asia/a53c8546-ffe5-4560-85e7-917049c950c3.jpeg)

## Picking an operating environment
Github hiện đang hỗ trợ thực thi các task trên macOS, môi trường chỉ được lựa chọn khi build ứng dụng iOS. Với Android, bạn có 2 lựa chọn là:

- Sử dụng `Docker Image` (sử dụng  `container` option)
- Chạy một process trên máy raw Ubuntu.

Sau khi gặp vài vấn đến với quyền trong `Docker Image` tôi quyết định tiếp tục với môi trường `Ubuntu 18.04`.

## Using Actions or run raw commands?

`Workflows` được chia thành các bậc: `Workflow` -> `Jobs` -> `Steps`. Mỗi `step` cho phép bạn định nghĩa một `command` (ví dụ:` - run: pod install`) hoặc sử dụng một `Action` đã được người khác chuẩn bị trước và chạy trong một `Docker container`. Tôi đã thử với các actions cho `yarn`, `fastlane` và `bundle`, nhưng theo cá nhân tôi, tôi sẽ tự gõ và sử dụng các `bash command`.

## Installing Ruby, Node, Fastlane etc.
Trong [đây](https://help.github.com/en/articles/software-in-virtual-environments-for-github-actions) có liệt kê các software hỗ trợ bạn cài đặt trên Ubuntu hoặc macOS machine. Phiên bản mặc định của Node trên macOS khá cũ (v6.17.0) và `ruby` command thì không có sẵn trên Ubuntu. Vì vậy, để sử dụng, bạn cần cài đặt `node`, `ruby`, `gem`, `bundle` trước.

## Using secrets and environment variables
Không giống như CircleCI, bạn phải định nghĩa biến mỗi trường cho mỗi `step` và chúng không sử dụng chung trong `workflow` được =)) Tôi đã định nghĩa chúng trong file thay vì encode chúng thành chuỗi base64 ở trong `Secrets` setting trong Github repo, và sử dụng chúng trong `env` section ở trong mỗi `step`. 

## Sudo or not sudo
Tôi nhận thấy `Github Actions` hạn chế nhiều quyền trên các filesystem so với dưới môi trường `local` và so với CircleCI. Tôi phải sử dụng `sudo` cho nhiều command trên Ubuntu như `gem install bundler` hay `npx jetify` hoặc `fastlane android beta`.

## Setting up the iOS keystore
Khi sử dụng `Fastlane`, có một vài `setup_ci` command sẽ tạo `temporary keychain` trên macOS. Việc này là bắt buộc, nếu không thì bản `build` sẽ bị kẹt lại. Tuy nhiên, trên `Github Actions` thì `Fastlane` không nhận biết được việc này như các `CI provider` khác và nó bỏ qua yêu cầu này. Vì thế bạn cần chắc chắn mình đã set `force: true` để tránh gặp phải nó.

## Syncing certificates and provisioning profiles
Trước đây tôi có sử dụng `Fastlane Match` để auto-sync iOS certificates với Github repo. Để làm được việc này, tôi tạo ra 1 deploy key trên Github và thêm chúng vào CircleCI, việc này giúp tôi có thể clone private repository đó về CircleCI. Trớ trêu thay là không dễ dàng gì để clone private Github repo trên `Github Actions` (Thật khó hiểu phải không =)) chức năng của Github lại không dễ dàng thực hiện trên Github) bởi vì bạn không thể thêm `SSH keys` vào nó. Vì thế tôi phải chuyển certificates đó lên 1 nơi lưu trữ khác mà được hỗ trợ bởi `Fastlane Match` là `Google Cloud Storage Buckets`.

## Increasing the number of watchers
Khi bạn đóng gói ứng dụng Javascript sử dụng `Metro`, bản build sẽ bị `fail` với error code `ENOSPC: no space left on device`. Lỗi này khá khó hiểu, việc bạn phải làm là tăng số lượng `file watchers` trên máy lên (có thể sử dụng command `echo fs.inotify.max_user_watches=52488 | sudo tee - a /etc/sysctl.conf && sudo sysctl -p`). Vấn đề này không xuất hiện trên CircleCI.
![](https://images.viblo.asia/54fe10a6-c259-4e7f-b185-e6d8369b9b05.png)

*Cả một list các bản build, được phân theo workflow. Khá chậm để chuyển đến 1 bản build, có vẻ như Github Actions load 100 bản build trong 1 lần luôn*

## Watching the logs
Theo dõi logs cuộn trên màn hình thực sự đem lại cảm giác thú vị. `Github Actions` bắt đầu hỗ trợ streaming logs. Nhưng bạn chỉ có thể xem logs được in ra sau khi bạn reload lại trang ...

Như tôi đề cập ở trước, bản build bị kẹt trong quá trình `signing`, nhưng bởi vì tôi không mở trang `Github Actions` nào, nên tôi không thấy được logs, cách duy nhất để xem là tôi phải cancel bản build đó lại hoặc kệ cho nó chạy =))
![](https://images.viblo.asia/d69c9e67-2906-4f11-8158-b0693c1ed0db.png)

*Bản build chạy 32 phút. Chậm hay bị đơ =)) không thể biết nguyên nhân khi logs cũng chẳng xuất hiện.*

Việc này thật sự khó chịu, `Github` cần phải cải thiện nó.

## When to trigger workflows
Tôi không muốn khởi tạo việc build ứng dụng iOS, Android trên mỗi commit, nó sẽ mất rất nhiều thời gian, cũng như tôi không muốn mỗi commit lại release một lần. Tôi chỉ cần build khi tôi nghĩ app sẵn sàng được phân phối tới beta channels.

Có nhiều cách như đặt lịch build, hoặc là chọn build khi có các event như `issue comment`, `tag`, `release`, `wiki update` nhưng không thấy nút nào để `Build now`.
Cách duy nhất để chủ động build là trigger build khi có ai đó rate star cho repository. Và bạn có thể unstar đi và star lại để trigger bản build =)) 
![](https://images.viblo.asia/b0e1212c-b28c-418f-8e28-3d903b5c1f34.png)

*Unstar và star lại để trigger việc build*

## Pricing and usage
Đây có lẽ là điều mọi người quan tâm nhất.  Nhưng hiện tại không có cách nào để bạn biết được bạn đã build hết bao nhiêu phút và giá của chúng là bao nhiêu (Có thể do trong thời điểm beta nên mọi thứ là miễn phí). Có thể giá của `Github Actions` sẽ **rẻ** hơn CircleCI kha khá. 

Trong môi trường Linux/Docker, bạn sẽ có 2000 phút miễn phí (hoặc 3000 phút với tài khoản Pro). Gần đây CircleCI  giảm thời gian miễn phí xuống từ 1500 phút còn 1000 phút mỗi tháng, và bây giờ cũng chia nhỏ giới hạn từng tuần còn 250 phút, và thực sự thời gian đó rất nhanh hết.

Build trên môi trường macOS có giá 8cent mỗi phút, tương đương với CircleCI là 39$ mỗi 500 phút và 8 cent cho mỗi phút ngoài quota. Nhưng trên `Github Actions` bạn sẽ trả theo từng phút, sẽ là rẻ hơn nếu bạn dùng ít hơn 500 phút. Bạn có thể sử dụng 3000 phút miễn phí trên macOS để tiết kiệm được thêm 400$ mỗi năm.

CircleCI offer bạn plan sử dụng 1x parallelization trên Linux và 2x parallelization trên macOS, điều đó nghĩa là bạn sẽ phải chờ rất lâu, nhưng trên `Github Actions` bạn có thể sở hữu 20 bản build đồng thời trên mỗi repository.

## Tóm lại
`Github Actions Beta` vẫn chưa thực sự hoàn hảo, kha khá bug và những điều bất tiện trên UI, docs cũng như nền tảng. 

CircleCI vẫn là sản phẩm tốt hơn, nhưng so về giá cả và khả năng tương thích, tôi vẫn sẽ chọn `Github Actions`. 
Github đã cải thiện rất nhiều điều nhỏ trong sản phẩm của mình và cải thiện `Github Actions` chỉ trong 8 tháng, để có được bản beta như này là thực sự đáng ngưỡng mộ. Tôi sẽ chuyển toàn bộ dự án của mình lên `Github Actions` bởi tôi tin chúng có thể nhanh hơn nữa, và Github rất biết lắng nghe yêu cầu tính năng từ user để cải thiện, giúp sản phẩm của mình tốt hơn.

## Nguồn tham khảo
- https://github.com/features/actions
- https://medium.com/@jonnyburger/first-look-using-github-actions-for-building-ios-and-android-apps-4749609b96f0