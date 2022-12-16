# 1. Non-Fungible Token là gì?
> Fungible Token  có thể phổ biến trong thời kỳ đầu của công nghệ Blockchain. Tuy nhiên, trong thời gian tới, Non-Fungible Token (NFT) có thể chiếm lĩnh ngôi vị đó vì nó có thể sử dụng linh hoạt hơn nhiều so với Fungible Token. Vậy Non-Fungible Token là gì?

Non-Fungible Token thường đại diện cho những tài sản được cấu thành từ nhiều thuộc tính. [CryptoKitties](https://www.cryptokitties.co/) là một ví dụ về việc ứng dụng của NFT. Đây là một trò chơi chạy trên Ethereum, người chơi có thể sưu tập và nuôi những con mèo mà "genetic material" của chúng được lưu trữ trên Ethereum.

Non-Fungible Token có thể được sử dụng rộng rãi trong các dApps như **crypto-collectables** và **crypto-games**. Nó có thể đại diện cho các loại chứng chỉ nào như bằng lái xe, bằng cấp học thuật và các chứng chỉ giáo dục khác, hoặc các loại loại giấy tờ như di chúc, phiếu bầu,  hoặc dữ liệu trong chuỗi cung ứng, dữ liệu trong y tế,... NFT cũng cho phép gắn một token với một tài sản vật lý nào đó như tác phẩm nghệ thuật, ngôi nhà, mảnh đất hoặc bất kỳ tài sản số nào khác. Điều này làm tăng tính thanh khoản cho các khoản đầu tư của các nhà đầu. Người ta có thể mã hóa một tòa nhà, mà tòa nhà đó có thể được chia thành nhiều phần bằng các token để mỗi người có thể sở hữu một phần khác nhau của tòa nhà, và định nghĩa thêm 1 token khác để biểu thị cho quyền ra vào tòa nhà.

Khái niệm về Non-Fungible Token không phải là mới. Vào năm 2013, **Colours Coins** là một trong những dự án đầu tiên cố gắng gắn các tài sản thực tế vào các token, ý tưởng của họ là sử dụng Bitcoin để đại diện cho các tài sản thực như cổ phiếu, trái phiếu, hàng hóa hoặc quyển sở hữu một ngôi nhà. **Counterparty** cũng là một dự án khác được xây dựng trên ý tưởng này, nhưng có thêm một bước cải tiến mới là nó cho phép người dùng tạo tài sản ảo của riêng họ trên Bitcoin. Cả hai dự án đều rất khó khăn để có được sự chấp nhận rộng rãi  trước khi Ethereum ra đời, cho phép phát hành và bán token đơn giản hơn chỉ với một vài dòng code.

Trái ngược với ERC-20 (Fungible Token), chỉ bao gồm một số thuộc tính như tên, ký hiệu, tổng cung và số dư, ERC-721 (Non-Fungible Token) cho phép các định nghĩa các thuộc tính chi tiết hơn, ngoài tên, số dư, tổng cung và ký hiệu, nó còn bao gồm cả *metadata* (siêu dữ liệu) về
tài sản và thông tin về quyền sở hữu tài sản đó. Tuy nhiên để biểu diễn cho các tài sản có cấu trúc phức tạp mà từng thành phần trong nó lại là một tài sản phức tạp khác thì ERC721 vẫn còn nhiều hạn chế, việc trao đổi một tài sản một tài sản lớn thực chất là việc chuyển lần lượt các tài sản nhỏ cấu thành nên nó, điều này làm giảm hiệu năng hệ thống và tốn nhiều phí giao dịch của người dùng.

ERC998 ra đời để giải quyết vấn để này. ERC-998 là bản mở rộng của ERC-721, cho phép một Non-Fungible Token có thể sở hữu một token khác có thể Fungible Token hoặc Non-Fungible Token

# 2. ERC998 - Composable Non-Fungible Token
## 2.1 Hình dung về ERC998
ERC998 là một chuẩn mới cho token trong Ethereum được giới thiệu bởi 3 tác giả Matt Lockyer, Nick Mudge, Jordan Schalm vào 07-07-2018, và có thể tóm tắt theo hai khía cạnh:
- Là một bản mở rộng của tiêu chuẩn ERC721, một token ERC721 có thể chứa các token ERC721 khác và các token ERC20.
- Là một bản mở rộng của các tiêu chuẩn ERC20 và ERC223 để cho phép các token ERC20 và ERC223 được sở hữu bởi các token ERC721.
 
 
 >So sánh giữa ERC20, ERC721, ERC998:
>- **ERC20** là Fungible Token, nghĩa là các token là giống nhau và có cùng giá trị.
>
>- **ERC721** là Non-Fungible Token, mỗi token là duy nhất. Do đó, các sự vật có tính duy nhất, chẳng hạn như một con mèo trên trò chơi CryptoKitties, có thể được lưu trữ bởi một token ERC721.
>
>- **ERC998** tương tự như **ERC721** ở chỗ chúng đều là Non-Fungible Token. Các token ERC998 có tính kết hợp ("composable"), có nghĩa là các token có thể kết hợp với nhau thành 1 token ERC998, việc chuyển quyền sở hữu tất cả token đã kết hợp đó chỉ đơn giản là việc chuyển quyền sở hữu của token ERC998.

<br>
ERC998 được chia thành 4 loại khác nhau:

- ERC998ERC721 top-down composable: một token ERC721 sở hữu các token ERC721 khác
- ERC998ERC20 top-down composable: một token ERC721 sở hữu các token ERC20 khác
- ERC998ERC721 bottom-up composable: một token ERC721 được sở hữu bởi một token ERC721
- ERC998ERC20 bottom-up composable: một token ERC20 được sở hữu bởi một token ERC721

Với mỗi token ERC998, sẽ có một cây biểu diễn sự sở hữu của các token ERC721 và ERC20 từ trên xuống dưới. Gốc của cây là token sở hữu của toàn bộ các token con bên dưới. Toàn bộ token thành phần có thể được chuyển quyền sở hữu chỉ với một giao dịch là chuyển quyền sở hữu token ở gốc.

![](https://images.viblo.asia/e70c0bf7-13cd-4495-a05f-b4b5f9dc4b0a.png)

ERC998 có thể chứa cả hai ERC721 và ERC20.

## 2.2 Ứng dụng của ERC998

Một ví dụ đơn giản về việc sử dụng ERC998 là chẳng hạn một chiếc xe bus (tương đương với ERC721) và các ghế ngồi - vé (tương đương với ERC20) kết hợp với nhau thành ERC998

![](https://images.viblo.asia/1ebd2b0b-f413-4b49-aabc-3179aa4cd0ed.png)

Một ví dụ phức tạp hơn là một con tàu vũ trụ có thể được mô hình hóa theo chuẩn ERC998. Phần thân tàu và các thuộc tính của nó được đại diện bởi token ERC721, các thùng nhiên liệu giống nhau  được đại diện bởi các token ERC20, còn bảo hiểm của con tàu có thể được đại diện một token của một chuẩn khác, cả 3 phần được kết hợp với nhau thành một token ERC998. Việc chuyển quyền sở hữu toàn bộ con tàu lúc này chỉ đơn giản là chuyển quyền sở hữu token ERC998. 

Vậy ERC998 là cải tiến, làm tăng tính giá trị cho các tiêu chuẩn hiện trước đây và mở ra nhiều trường hợp sử dụng mới.

### Ứng dụng vào game
Với các game Blockchain trước kia, khi mà một nhân vật và các vật phẩm liên quan đến nhân vật đó đều được thể hiện dưới dạng token ERC721, khi bạn muốn bán nhân vật đấy cho một người khác thì bạn phải chuyển từng vật phẩm được đại diện bởi token ERC721 một, việc này mất khá nhiều thời gian và chi phí. Tuy nhiên với sự ra đời của ERC998, việc này đã đơn  giản hơn nhiều, việc bán một nhân vật giờ đây chỉ là việc chuyển quyền sở hữu của token ERC998.

## Tham khảo
https://blockchainhub.net/blog/blog/nfts-fungible-tokens-vs-non-fungible-tokens/

https://eips.ethereum.org/EIPS/eip-998

https://medium.com/hackernoon/erc998-tokens-5e2544d874fa

http://erc998.org/