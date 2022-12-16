## 1. Blockchain là gì ?

Cuộc cách mạng công nghiệp 4.0 ngày càng tác động mạnh mẽ đến xã hội của chúng ta, đây là một thời kỳ bùng nổ về công nghệ, nó thay đổi xoành xoạch, chỉ cần lười vài tháng thôi thì bạn đã trở thành một người lạc hậu rồi !!! Công nghệ phát triển kéo theo sự gia tăng tội phạm công nghệ ( những người này cực kỳ giỏi những rất tiếc họ lại không đi theo chính nghĩa ), họ thao túng dữ liệu, tạo ra thông tin mà mang lại lợi ích cho họ, nếu như không có blockchain thì thật khó để truy vết về thông tin đúng mà đã bị những người này sửa thành sai. Vì, mọi dữ liệu một khi được ghi vào blockchain thì sẽ không bao giờ bị thay đổi hay xóa bỏ, chính vì thế mà dù thông tin đã được update nhưng hành động update thông tin đó ( đóng vai trò là dữ liệu trong blockchain ) sẽ lưu lại vĩnh viễn trên blockchain, để khi phát hiện bất thường chúng ta có thể điều tra về sự thay đổi này. 

### 1.1 Hàm băm 

Hàm băm là một kiểu hàm mà với một tham số đầu vào nó sẽ mã hóa ra một chuỗi các ký tự không liên quan, nhìn vào rất khó hiểu nhưng nó lại xác định cho một tham số đầu vào duy nhất, nghĩa là băm chuỗi " a " sẽ ra kết quả cực khác với băm chuỗi " a' ".
Hằm băm có tính một chiều, nghĩa là từ kết quả băm được ta không thể giải mã để tìm ra giá trị đầu vào là gì.

Thế nên, hăm băm có ý nghĩa trong việc kiểm tra xem liệu dữ liệu có giống nhau hay không  mà không tiết lộ dữ liệu.

Ví dụ, A và B cùng giả một bài toán là 5 + 3 = ?. A giải ra được bằng 8, B giải ra được bằng 9, A quay sang hỏi B xem kết quả của B có giống mình không, nhưng cả hai lại đều không muốn nói ra kết quả của mình. Thế là cả hai thống nhất dùng hàm băm sha256() ( một hàm băm điển hình, mà với mọi tham số đầu vào dù dài ngắn đến đâu cũng sẽ cho ra một mã băm 64 ký tự ) để kiểm tra. 
```
sha256(8) = 2C624232CDD221771294DFBB310ACA000A0DF6AC8B66B696D90EF06FDEFB64A3
sha256(9) = 19581E27DE7CED00FF1CE50B2047E7A567C76B1CBAEBABE5EF03F7C3017BB5B7
```
sau khi cả A và B băm kết quả của mình và đem 2 mã băm ra so sánh nếu hai mã băm giống nhau thì cả 2 đều tự hiểu là đối phương có cùng kết quả với mình, còn nếu khác nhau thì có ít nhất một người giải sai. :joy_cat:

### 1.2 Hàm băm là cốt lõi của Blockchain. 

Hiểu đơn giản mỗi block trong Blockchain là một cấu trúc dữ liệu, các block được liên kết theo một trật tự cố định vĩnh viễn với nhau tạo thành một chain ( chuỗi ) nên gọi là Blockchain. 

Ta xét cấu trúc đơn giản nhất của một block:
```json
block = {
    'index': 0,
    'timestamp': 1506057125.900780,
    'content': [
        {
            'name': "Trinh Van Tan",
            'gender': "male",
            'old': 22
        }
    ],
    'previous_hash': "thien than gay canh"
}

block = {
    'index': 1,
    'timestamp': 1506057125.900785,
    'content': [
        {
            'name': "Trinh Tan Phat",
            'gender': "male",
            'amount': 11
        }
    ],
    'previous_hash': "F3052F001F2A3153ED6B08A88F1AF7745403B55408CB1C1CA6A427F839DCA30E"
}

block = {
    'index': 2,
    'timestamp': 1506057125.900790,
    'content': [
        {
            'name': "Trinh Thao Vy",
            'gender': "female",
            'amount': 9
        }
    ],
    'previous_hash': "3B60568D124E79C4CE935426CC004D36373F38EB76ABFC44DAFB2862D3CAB35C"
}

block = {
    'index': 3,
    'timestamp': 1506057125.900795,
    'content': [
        {
            'name': "Trinh Yen Nhi",
            'gender': "female",
            'amount': 5
        }
    ],
    'previous_hash': "146AFDA717F7B2F6DDC357A0CE49B4F84B3926645F1709FCC73BB26EC26A9D0E"
}
```

Đây là nội dung của block 0, 1, 2, 3, để ý trong đó ta thấy có một  trường là **previous_hash**, đây là trường quan trọng nhất, tạo nên tính bất biến của blockchain. Giá trị previous_hash của block 1 chính ra giá trị mà ta băm block 0 bằng hàm băm sha256(), bạn có thể copy nội dung của block 0 bên dưới và băm tại một web băm sha256() online như này http://www.convertstring.com/vi/Hash/SHA256

```json
'index': 0,
'timestamp': 1506057125.900780,
'content': [
   {
       'name': "Trinh Van Tan",
       'gender': "male",
       'old': 22
   }
],
'previous_hash': "thien than gay canh"
```

Kết quả đúng bằng giá trị previous_hash của block 1! Cứ như thế khi block 2 được thêm vào thì người ta sẽ sha256( block 1)  và đặt làm giá trị previous_hash của block 2, tương tự previous_hash của block 3 sẽ là giá trị sha256(block 2), nếu thích, bạn có thể kiểm tra tại web trên kia. À ! Vì block 0 là block đầu tiên của chain hay còn gọi genisis block nên làm gì có block nào trước nó đúng không ? Nên giá trị previous_hash của block 0 ta có thể đặt tự do theo ý thích. 

Điều gì sẽ xảy ra khi ta muốn thay đổi giá trị **gender** của **Trinh Van Tan** ở block 0 ? Ví dụ thay đổi thành :
```json
'index': 0,
'timestamp': 1506057125.900780,
'content': [
   {
       'name': "Trinh Van Tan",
       'gender': "female",
       'old': 22
   }
],
'previous_hash': "thien than gay canh"
```
Khi đó, previous_hash của block 1 sẽ thành: ```9E41B4998D81E48DBA1CAB8F0DD0113725D32750C3234E7205BD1F2BBC1B2BF0```. Điều này có nghĩa là nội dung của block 1 cũng đã bị thay đổi ( thay đổi ở trường previous_hash) => sha256(block 1) không còn bằng với trường previous_hash ở block 2 nữa, lại phải thay đổi previuos_hash ở block 2, tiếp đến là lại phải thay đổi previous_hash ở block 3.

Nghĩa là trong nếu trong chain đang có **n** block, mà bạn muốn thay đổi nội dung của block **m** ( 0 < m < n) thì cũng phải thay đổi previous_hash toàn bộ các block m+1,  m+2,  m+3,..., n. Với trường hợp ví dụ ở trên thì chỉ có 4 block nên bạn nghĩ thay đổi một tí là xong, nhưng với các blockchain đã có hàng ngàn block thì việc thay đổi khá mất thời gian. Và nếu không thay đổi đến cùng thì hệ thống blockchain đó cũng sẽ kiểm tra và phát hiện các block giả mạo của bạn và loại bỏ. Do đó, hệ thống blockchain nào hoạt động càng lâu sẽ càng an toàn.

Giống như trong phim Endgame có nói, việc quay về quá khứ để thay đổi 1 việc trong quá khứ cũng không làm ảnh hưởng đến thực tại này, mà nó chỉ tạo ra một thực tại khác, bạn quay lại thay đổi block m nghĩa là bạn tạo ra một nhánh chain khác bắt đấu rẽ từ block m. Nhưng có câu "Một điều nói dối nếu nói dối đủ nhiều thì có thể trở thành sự thật !", nghĩa là nếu nhánh bạn tạo ra, bạn thay đổi xong các block m+1, m+2,...n cho phù hợp với nhánh của bạn và bạn thêm được một block n + 1 vào nhánh thì lúc này nhánh bạn lại dài hơn nhánh chính 1 block, biết đâu hệ thống sẽ thấy nhánh bạn dài hơn và lấy nhánh của bạn thành nhánh chính. 

![](https://images.viblo.asia/50254d23-f2ed-4996-9e93-36f49e1a50f4.jpg)

Xanh lam: genisis block

Đen: các block của nhánh chính ( được chấp nhận )

Tím: block m bị thay đổi ( sẽ sớm bị loại bỏ ) 


### 1.3 Tính phân tán không nằm ở Blockchain mà nói đúng là Blockchain phù hợp để lưu trữ phân tán. 

Việc lưu trữ theo kiểu tập trung mang lại sự hoài nghi cho mọi người. Node A lưu trữ, các node B, C, D truy vấn nhưng lại luôn sợ node A đã làm giả dữ liệu, ảnh hưởng đến lợi ích của mình. 

=> Bây giờ mỗi node sẽ có 1 bản sao của dữ liệu, nhưng điều gì sẽ xảy ra nếu các node tự thay đổi dữ liệu để lợi cho mình, đến lúc đem ra đối chiếu lại dữ liệu thì chẳng node nào giống node nào ? ĐÁNH NHAU TO !!!

=> Sự xuất hiện của blockchain đã làm cho việc lưu trữ phân tán trở nên tuyệt đối an toàn. Vì các node đồng thuận với nhau theo từng block một, nghĩa là cứ khi có block mới được tạo ra tại một node nào đó, nó sẽ được nối vào bản sao blockchain của node đó, các node liên tục trao đổi bản sao blockchain với nhau và chúng coi dữ liệu đúng được lưu trên blockchain xác thực dài nhất mà chúng nhận được ( Sự đồng thuận ). Nếu một node muốn làm giả dữ liệu thì node đó phải đủ mạnh và đủ nhanh để tạo ra một chain ít nhất dài bằng nhánh chính trước khi các node khác liên tục thêm block vào nhánh chính, đồng nghĩa với việc node đó nắm giữ >50% sức mạnh tính toán của hệ thống ( tấn công 51% ).

### 1.4 Cơ bản về đồng thuận trong Blockchain

Bây giờ ta sẽ đưa ra các function cơ bản (pyhton) của một node trong hệ thống blockchain để sự đồng thuân dễ hiểu hơn: 
 ```python
 import hashlib
import json
from time import time


class Blockchain(object):
    def __init__(self):
        self.current_contents = []
        self.chain = []

        # Tạo genisis block
        self.new_block(previous_hash="thien than gay canh")
     
    ### Tạo một content mới với các tham số đầu vào tương ứng
    def new_content(self, name, gender, old):
        self.current_contents.append({
            'name': name,
            'gender': gender,
            'old': old
        })

        return self.last_block['index'] + 1

    # Từ content mới được thêm vào, tạo một block mới
    def new_block(self, previous_hash=None):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'content: self.current_contents,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }

        # sau khi tạo block mới thì reset content để đợi tạo block tiếp theo
        self.current_content = []

        # khối mới tạo được thêm vào chain
        self.chain.append(block)
        return block

   

    @property
    def last_block(self):
        return self.chain[-1]

    # hàm hash để tìm ra hash của 1 block
    @staticmethod
    def hash(block):
    
        # We must make sure that the Dictionary is Ordered, or we'll have inconsistent hashes
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()
        
     # Kiểm tra tính chính xác của một chain bằng cách kiểm tra từng đôi block một từ đầu đến cuối
    def valid_chain(self, chain):
    
        last_block = chain[0]
        current_index = 1

        while current_index < len(chain):
            # băm lại và kiểm tra xem hash của block m có bằng previous_hash của block m + 1 không 
            if block['previous_hash'] != self.hash(last_block):
                return False

            last_block = block
            current_index += 1

        return True

    def resolve_conflicts(self):
        
        # neighbours chính là tất cả các node đang có trong hệ thống 
        neighbours = self.nodes
        new_chain = None

        # We're only looking for chains longer than ours
        max_length = len(self.chain)

        # Đối chiếu chain và đồng thuận với tất cả các node
        for node in neighbours:
            response = requests.get(f'http://{node}/chain')

            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']

                # Nếu tìm được chain dài hơn thì kiểm tra tính xác thực của chain bằng hàm valid_chain()
                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    new_chain = chain

        # Sau khi các node đồng bộ với nhau thì chain chính thức của toàn hệ thống sẽ là chain chính xác dài nhất
        if new_chain:
            self.chain = new_chain
            return True

        return False
 ```
 
 Trên đây là prototype để các bạn hiểu hơn về cách đồng bộ đơn giản nhất giữa các node trong hệ thống blockchain, các bạn có thể tham khảo thêm tại https://blockchain.works-hub.com/learn/Learn-Blockchains-by-Building-One để xây dựng 1 simple app và thử tương tác với nó ( lưu ý content chính là transaction ). Ngoài ra, kiểu đồng thuận ở trên là kiểu đồng thuận đơn giản nhất, các bạn có thể tham khảo thêm các thuật toán đồng thuận khác phức tạp hơn, hiệu quả hơn.
 
 
 ## 2. Bitcoin, nguyên lý của Bitcoin
 
 ### 2.1 Giới thiệu Bitcoin 
 
 Được **Satoshi Nakamoto** ( vẫn chưa biết ông này là ai ) phát hành năm 2009. Là đồng tiền điện tử thành công và đắt giá nhất hiện tai. Bạn có thể xem whitepaper của Bitcoin tại https://bitcoin.org/bitcoin.pdf để nghiên cứu thêm. Mình sẽ chỉ giới thiệu sơ qua nó.
 Bitcoin là Blockchain nhưng Blockchain không phải là Bitcoin. Hay nói đúng Bitcoin là một sản phẩm thành công nhất dựa trên Blockchain. Nên nếu bạn đọc xong bài này mà nghe ai nói họ đang theo Blockchain thì đừng có bảo là " Tao nghe nói Blockchain hay gì gì đó lừa đảo, đang bị cấm mà, bla bla...". Họ cười cho đấy :rofl::rofl::rofl:
 
 Mà thật ra Bitcoin cũng chẳng có gì xấu hay lừa đảo cả, chỉ là người ta lười tìm hiểu về nó, thấy nó tăng giá nhanh quá mà suốt ngày bốc phốt nó thôi. Có rất nhiều cá nhân, mặc dù không hiểu rõ về Bitcoin, yêu thích việc bôi xấu hình ảnh Bitcoin khi cố ý gắn liền nó với lừa đảo đa cấp, lừa đảo Ponzi, đồng tiền tài trợ khủng bố,... bằng những luận điểm không khoa học. Việc này được giải thích trên tâm lý chối bỏ sự sợ hãi khi phải đối mặt với sự thay đổi, với thứ không quen thuộc của con người. Họ yêu thích việc tuyên bố rằng Bitcoin "đã chết". Tính tới tháng 1 năm 2016, Bitcoin đã được cáo phó tới 89 lần trong 7 năm tồn tại. Tạp chí Forbes công bố Bitcoin "chết" vào tháng 6 năm 2011, tiếp theo là Gizmodo Úc vào tháng 8 năm 2011. Tạp chí Wired tuyên bố nó đã "hết hạn" vào tháng 12 năm 2012. Reuters công bố một "cáo phó" cho Bitcoin trong tháng 1 năm 2014. Tháng 1 năm 2015, báo Telegraph tuyên bố "thí nghiệm Bitcoin đã kết thúc". Giám đốc phát triển kinh doanh điện tử của Isle of Man cho rằng: "Các báo cáo về cái chết của Bitcoin đã bị thổi phồng quá đáng". Tuy nhiên, xu hướng chung của công luận sau một thời gian tìm hiểu về Bitcoin là đều theo hướng tích cực. Trong thời gian gần đây, các báo trên đều đưa những bản tin tốt cho Bitcoin.
 
 ### 2.2 Cấu trúc của một block trong Bitcoin.
 ![](https://images.viblo.asia/b67cb5bb-cf1a-4e21-acc9-85805cd8df95.png)
 
 Nhìn vào hình bên bạn sẽ thấy nó có cấu trúc cơ bản giống với cấu trúc của một block mà ở **Phần 1** mình lấy ví dụ, nó chỉ khác là thay **content** thành Tx_Root, được hình thành từ việc băm các Tx con lại với nhau, Tx ở đây có nghĩa là transaction, vậy Tx_root có nghĩa là nó được hash từ thông tin các giao dịch mà được gom vào block đó, còn nội dung giao dịch sẽ được lưu ở một nơi khác. Bạn chỉ cần hiểu đơn giản nó như content của một block là được. Có thêm một trường bổ sung ở đây là **nonce**, đây là một trường quan trọng làm nên giá trị của Bitcoin ( mình sẽ nói ở bên dưới ).  
 
### 2.3 Giao dịch Bitcoin 

Mỗi người tham gia vào Hệ thống của Bitcoin sẽ nhận được một cặp **Public-key** ( khóa công khai ), **Private-key** ( khóa bí mật ), hai khóa này có liên kết với nhau mà khi thực hiện một loại kiểm tra thì một Private-key chỉ khớp với  một Public-key tương ứng duy nhất, đồng Bitcoin được xác định chủ sở hữu dựa vào cặp khóa này. Và nếu người dùng lỡ quên mất Private-Key của mình thì hệ thống cũng không có cách nào cấp lại Private key cho người đó, người dùng 1 là cố nhớ ra Private-key của mình, 2 là chấp nhận mất toàn bộ coin. 

Hiểu đơn giản là Public-key là địa chỉ nhà, còn Private-key là chìa khóa nhà, người ta sẽ gửi tiền đến theo địa chỉ nhà, và dùng chìa khóa để mở nhà lấy tiền mang đi gửi mỗi khi muốn gửi tiền cho ai đó .

Khi một giao dịch được thực hiện, thì người đang sở hữu coin đó sẽ lấy Private-key mở tủ lấy tiền cho vào giao dịch, ký Private-key với nội dung giao dịch => Tạo thành một thông điệp được mã hóa => Thông điệp này được "broadcast" đến tất cả các node => Các node sẽ giải mã thông điệp để được nội dung giao dịch + private-key, node kiểm tra nội dung giao dịch bằng cách kiểm tra xem liệu số dư của người gửi có đủ hay không và Public-key của người nhận có thật hay không + kiểm tra xem private-key trong giao dịch có khớp với public-key của người gửi hay không => thỏa mãn 2 điều kiện đó thì được xem là giao dịch hợp lệ.  

### 2.4 Đào coin - tìm nonce

Như đã nói ở trên  trường **nonce** chính là thứ làm nên giá trị của Bitcoin. 

Sau khi các giao dịch được xác thực thì các giao dịch hợp lệ sẽ được hash thành Tx_root. 
Các node tiến hành tạo block, nhưng trường nonce là do node tự thêm vào sao cho khi hash block đang chuẩn bị tạo thì tạo ra một mã băm với yêu cầu có 4 chữ số "0" ở đầu chẳng hạn
```0000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx``` 

Như đã nói ở đầu là hằm băm một chiều không thể suy ngược nên node không thể tự nghĩ ra 1 mã hash có 4 chữ số "0" ở đầu xong rồi suy ngược lại nonce. 
```0000B4998D81E48DBA1CAB8F0DD0113725D32750C3234E7205BD1F2BBC1B2BF0``` từ hash như naỳ không thể suy ngược để tìm nonce.

Các node sẽ phải thử nhiều nonce để tìm ra nonce thỏa mãn điều kiện, node nào tìm ra nonce đầu tiên sẽ "broadcast" đến toàn hệ thống và được hệ thống thưởng cho một lượng coin thưởng, và lượng coin này sẽ được chuyển về cho node trong giao dịch ở block + 100 tiếp theo. Để tìm thấy được số nonce thì node phải thực hiện rất nhiều phép tính, tốn rất nhiều điện năng nên số nonce còn được gọi là "proof of work" chứng mình node đã chăm chỉ làm việc. 

### 2.5 Tính giới hạn của Bitcoin ( sẽ chỉ có 21 triệu Bitcoin được tạo ra )

Đơn vị nhỏ nhất mà hệ thống Bitcoin chấp nhận là **satoshi** = 1/100.000.000 Bitcoin. Cứ sau 10 phút sẽ có 1 block mới được thêm vào chain và sẽ có một lượng coin được thưởng cho node đã tìm ra nonce của khối đó. Nhưng lượng tiền thưởng này sẽ giảm một nửa theo chu kỳ 4 năm, vào tháng 7 năm 2016, 12,5 bitcoin được thưởng cho mỗi khối mới, sẽ giảm một nửa còn 6,25 bitcoin vào khoảng tháng 5 năm 2020, đến 2140 thì sẽ giảm xuống dưới mức **satoshi** nên sẽ không giảm được nữa, và không có tiền thưởng được thưởng cho khối mới được thêm vào, lúc này các node chỉ đưởng lợi từ phí giao dịch, vừa đúng lúc thì lượng coin đã được tạo ra là 21 triệu. 


## 3. Phân biệt Public Blockchain với Private Blockchain

Bitcoin là Public Blockchain thành công và giá trị nhất, nơi mà mọi người có thể đến và rời đi, chỉ cần họ còn giữ được private-key thì họ có thể tái tham gia vào mạng bất cứ lúc nào. Còn Private Blockchain là một mạng do một nhóm tổ chức cùng nhau dựng lên một mạng phục vụ những nghiệp vụ kinh doanh nhất định trong nhóm tổ chức đó, mà họ không muốn bên ngoài can thiệp vào, ví dụ như một mạng phân phối xe hơi giữa các tổ chức nhà sản xuất, nhà phân phối, nhà bán lẻ,..., mỗi người khi tham gia vào mạng sẽ được nhận một cặp public-private key, giúp xác định danh tính của họ, họ thuộc về tổ chức nào, quyền của họ đối với hệ thống.

Hiểu đơn giản, Public Blockchain là một buổi biểu diễn ngoài trời miễn phí, người ta thích thì ghé vào xem, không thích thì bỏ đi, nhưng họ vẫn là duy nhất nhờ public-private key, sẽ chả có ai giống họ, còn Private Blockchain là một buổi diễn trong nhà, ai có vé mới được vào và trên vé lúc này còn xác định thêm hạng ghế, khách mời hay nhà tài trợ hay chỉ là người mua vé bình thường.


## Tài liệu tham khảo 
http://www.convertstring.com/vi/Hash/SHA256
https://blockchain.works-hub.com/learn/Learn-Blockchains-by-Building-One
https://bitcoin.org/bitcoin.pdf
https://vi.wikipedia.org/wiki/Bitcoin
https://vi.wikipedia.org/wiki/Blockchain