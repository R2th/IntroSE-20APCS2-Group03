## Cold boot attack là gì ?

Trong bảo mật máy tính, cold boot attack là 1 kiểu tấn công side channel , tức là nó cần phải cho phép attacker có thể truy cập vật lý với một máy tính để thực hiện dump bộ nhớ từ RAM. Về cơ bản, cold boot attack được thực hiện để lấy được key mã hóa nhờ sử dụng một hệ điều hành hay thiết bị chuyên biệt dành cho điều tra. Kiểu tấn công này dựa theo tính chất vật lí khi dữ liệu được lưu trữ trên [DRAM](https://en.wikipedia.org/wiki/Dynamic_random-access_memory) và [SRAM](https://en.wikipedia.org/wiki/Static_random-access_memory) để có thể thu thập được dữ liệu trước khi bị mất hoàn toàn sau vài giây khi nguồn điện bị ngắt.

Một attacker với quyền truy cập vật lí với 1 máy tính đang chạy có thể thực hiện cold boot attack sau đó reboot lại máy tính vào boot vào 1 hệ điều hành hoặc USB chuyên dụng để dump được các thông tin từ RAM trong quá trình pre-boot và sau đó có thể phân tích và tìm được các thông tin nhạy cảm , mật khẩu, keys,... Và từ khi cold boot attack nhắm các mục tiêu như RAM, mã hóa toàn bộ ổ đĩa, thì thậm chí với thiết bị có cả [Trusted Platform module](https://en.wikipedia.org/wiki/Trusted_Platform_Module) (TMP) cũng không chống được lại được kiểu tấn công này. Bởi vì đây là vấn đề nhằm vào phần cứng (bộ nhớ không được bảo mật) không phải từ phần mềm cho nên chỉ có thể ngăn chặn những sự truy cập độc hại bằng cách giới hạn những sự tiếp xúc vật lí với thiết bị và sử dụng những công nghệ mới để tránh lưu trữ thông tin nhạy cảm trong RAM.

![](https://images.viblo.asia/f4088259-4649-4afa-ba98-7377d7d0cd16.jpg)


## Chi tiết về kỹ thuật

Có thể trong trường học bạn được dạy rằng bộ nhớ RAM sẽ không thể giữ được dữ liệu ngay sau khi bạn tắt máy. Nhưng trên thực tế,đúng ra là bộ nhớ DIMM theo thời gian mất dần dữ liệu sau khi nguồn điện bị ngắt, nhưng nó không mất ngay lập tức mất toàn bộ dữ liệu bởi sau sau khi thiết bị ngắt khỏi nguồn điện thì vẫn còn tồn dư 1 ít trong mạch. Khi đó tùy thuộc vào nhiệt độ, điều kiện mội trường thì bộ nhớ vẫn có thể có thể duy trì ngầm trong khoảng từ vài giây cho đến vài phút sau khi thiết bị ngắt khỏi nguồn. Khi đó tận dụng khoảng thời gian đó thì đối với tùy bộ nhớ thì thời gian lưu trữ có thể kéo dài lên đến vài giờ và thậm chí cả tuần nhờ bằng cách làm lạnh chúng bằng nitơ lỏng hoặc dạng nén khí  .Bởi vì trong vật lí các bạn cũng biết đối với nhiệt độ lạnh, sẽ làm chậm lại các chuyển động của nguyên tử và các nguyên tử sẽ dừng lại khi ở nhiệt độ -273 độ C thì khi đó ta tận dụng tính chất vật lí và đông lạnh chúng bằng nito nhằm giảm chuyển động dòng điện hay cụ thể là các chuyển động electron .giúp lưu giữ điện tích trên các bộ nhớ 

## Các bước để thực hiện Cold boot attack

1. Thay đổi thông tin trong BIOS cho phép boot vào USB đầu tiên.
2. Cắm USB boot chuyên dụng để điều tra và thu thập cũng như để dump thông tin.
3. tắt nguồn/tắt máy một cách bắt buộc nhằm bộ xử lí không có thời gian để gỡ bỏ bất kỳ keys mã hóa hay những thông tin quan trọng khác. Ta có thể biết đến cách nhấn giữ nút nguồn =)) 
4. Nhanh nhất có thể, hãy đông lạnh bộ nhớ có bằng nito lỏng hoặc nén
5. Có thể tháo dời bộ nhớ và lắp sang 1 thiết bị chuyên dụng hoặc hãy khởi động và boot vào usb hoặc hệ điều hành chuyên dụng
6. khi load vào OS thường sẽ có 1 process tự động thu thập những thông tin lưu trong RAM và lưu vào trong bộ nhớ ngoài đó.

## Những thông tin gì sẽ có thể bị lộ bởi Cold boot attack

Hầu tất cả các thông tin phổ biến như Key mã hóa ổ đĩa, mật khẩu và thông thường cuộc tấn công này là để lấy được key mã hóa một cách hợp lý mà không qua sự xác nhận nào.
Bởi vì đối với tắt máy thông thường thì điều cuối cùng sẽ là dismount ổ đĩa và sử dụng key mã hóa để để mã hóa ổ đĩa lại cho nên nó hoàn toàn có thể vẫn đượcn lưu trữ trong RAM nếu máy tính bị ngắt bất chợt.

## Bảo vệ bản thân khỏi cuộc tấn công này

### Truy cập vật lý
### 
Để tránh khỏi kiểu tấn công này, bạn có thể chắc chắn rằng bạn sẽ ở gần máy tính bạn ít nhất 5 phút sau khi tắt máy và thêm 1 chú ý nữa là khi tắt máy sẽ sử dụng nút tắt trong menu chứ không phải ấn giữ nút nguồn trên máy tính để tắt.

### Mã hóa toàn bộ bộ nhớ

Mã hóa toàn bộ RAM là có thể nhằm tránh hacker thực hiện cold boot attack. Nhưng có 1 điều là cách này sẽ cần phải thay đổi về hệ điều hành, ứng dụng và cả về phần cứng . Và một ví dụ đã được thực hiện chính là trên Xbox của Microsoft.
Và có 1 số sản phẩm thương mại như [PrivateCore](https://en.wikipedia.org/wiki/PrivateCore) hay [RamCrypt](https://en.wikipedia.org/wiki/RamCrypt) có cách giải quyết là sẽ có 1 bản patch kernal cho linux sẽ mã hóa toàn hộ thông tin bộ nhớ và lưu key mã hóa trong CPU register và tương tự với [TRESOR](https://en.wikipedia.org/wiki/TRESOR)
Và kể từ bản 1.24 của VeraCrypt có hỗ trợ mã hóa RAM đối với keys và mật khẩu

### Xóa các thông tin bộ nhớ 

Trong 1 số hệ điều hành như [Tails ](https://en.wikipedia.org/wiki/Tails_(operating_system)) cũng cung cấp tính năng bảo mật là ghi đè các thông tin lên bộ nhớ khi tắt máy cho dù đột ngột.
Tính năng đó cho phép nếu có bất kì sự can thiệp nào về nguồn điện sẽ xóa toàn bộ RAM trong vòng dưới 300 mili giây trước khi nguồn điện được mất hoàn toàn dưới sự can thiệp của BIOS và ổ cứng sẽ được mã hóa bởi cổng M-2 và SATAx

## Mô phỏng lại về cuộc tấn công
Ngoài ra trong phim Mr.Robot mùa 4 cũng có đoạn sử dụng phương pháp này :)) Dưới đây là 1 số demo khác 

{@embed: https://www.youtube.com/watch?v=E6gzVVjW4yY}
{@embed: https://www.youtube.com/watch?v=vWHDqBV9yGc}