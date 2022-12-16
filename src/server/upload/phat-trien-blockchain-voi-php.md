Năm 2021 chắc hẳn là một năm bùng nổ của Blockchain, khi người người nhà nhà làm Blockchain, game NFT, Token.... Vậy nếu Blockchain được phát triển trên ngôn ngữ PHP thì sao?
# Blockchain là gì?
Blockchain (hay gọi là cuốn sổ cái) là hệ thống cơ sở dữ liệu cho phép lưu trữ và truyền tải các khối thông tin (block). Chúng được liên kết với nhau nhờ mã hóa. Các khối thông tin này hoạt động độc lập và có thể mở rộng theo thời gian. Chúng được quản lý bởi những người tham gia hệ thống chứ không thông qua đơn vị trung gian. Nghĩa là khi một khối thông tin được ghi vào hệ thống Blockchain thì không có cách nào thay đổi được. Chỉ có thể bổ sung thêm khi đạt được sự đồng thuận của tất cả mọi người.
# Tạo một block
Chúng ta sẽ khởi tạo 1 class có tên là Block, Class này sẽ làm nhiệm vụ mã hóa toàn bộ dữ liệu vào thành 1 chuỗi khóa

```php
<?php

class Block
{
    public $index; //index là key của 1 block
    public $previousHash; // đây là hash của block trước
    public $timeHash; // là thời gian mã hóa của block
    public $data; // data là của block ( nội dung transaction chẳng hạn )
    public $hash; // hash của block này

    public function __construct($index = 0, $previousHash = '', $timeHash = '', $data = '')
    {

        $this->index = $index;
        $this->previousHash = $previousHash;
        $this->timeHash = $timeHash;
        $this->data = $data;
        $this->hash = $this->execHash();
    }

    public function execHash()
    {
        if(is_array($this->data)) {
            $dataContent = json_encode($this->data);
        } else {
            $dataContent = $this->data;
        }

        return hash('sha256', $this->index . $this->previousHash . $dataContent . $this->timeHash);
    }
}

```

Tiếp đến chúng ta tạo một class Blockchain

```php
<?php

namespace App\Services;

use Carbon\Carbon;

class BlockChain extends Block
{
    public $chain = array();

    public function __construct()
    {
        $this->chain[] = $this->createGenesisBlock();

        parent::__construct();
    }

    public function createGenesisBlock()
    {
        return new Block(0000,'the first', Carbon::now()->format('d/m/Y H:i:s'), ['from' => 'hunghd', 'to' => 'hunghd2', 'amount'=> 3000]);
    }

    private function getLatestBlock()
    {
        return $this->chain[(count($this->chain) - 1)];
    }

    public function addBlock($index, $timeHash, $data)
    {
        $previousHash = $this->getLatestBlock()->hash;
        $newBlock = new Block($index, $previousHash, $timeHash, $data);

        $this->chain[] = $newBlock;
    }

}

```

Ở đây mình sẽ tạo 1 block khi có 1 data truyền vào. Giả dụ data là 1 transaction *hunghd*  gửi tiền cho *hunghd2* thì lúc này mình sẽ tạo ra 1 Block mới. Block này là block đầu tiên thế nên index = 0 , `previousHash = 'the first'`. Và khi có thêm transaction *hunghd2* gửi cho *hunghd3* thì block tiếp theo sẽ có `previousHash = mã hash của block trước đó`. Từ đó cứ thêm transaction mới được thêm vào sẽ tạo ra thêm 1 block mới nối với các trước đó. Từ đó chúng ta có một blockchain cơ bản.
Đây là code kết quả khi mình chạy thêm block:
```php
$bl = new \App\Services\BlockChain();
$bl->addBlock(1, Carbon::now()->format('d/m/Y H:i:s'), ['from' => 'hunghd2', 'to' => 'hunghd3', 'amount'=> 4000]);
$bl->addBlock(2, Carbon::now()->format('d/m/Y H:i:s'), ['from' => 'hunghd3', 'to' => 'hunghd4', 'amount'=> 5000]);
$bl->addBlock(3, Carbon::now()->format('d/m/Y H:i:s'), ['from' => 'hunghd4', 'to' => 'hunghd', 'amount'=> 6000]);
```

```php
array:4 [▼
  0 => App\Services\Block {#1578 ▼
    +index: 0
    +previousHash: "the first"
    +timeHash: "10/12/2021 11:23:14"
    +data: array:3 [▼
      "from" => "hunghd"
      "to" => "hunghd2"
      "amount" => 3000
    ]
    +hash: "ff0525def6dcb4ad33d5784f37c88e3ca7ac356c1ac186ae13796b756faf9a05"
  }
  1 => App\Services\Block {#1579 ▼
    +index: 1
    +previousHash: "ff0525def6dcb4ad33d5784f37c88e3ca7ac356c1ac186ae13796b756faf9a05"
    +timeHash: "10/12/2021 11:23:14"
    +data: array:3 [▼
      "from" => "hunghd2"
      "to" => "hunghd3"
      "amount" => 4000
    ]
    +hash: "3b67c70f4e22032a7d4d0d2d0252b7b41f7ea218bfb199e647d16e4e9398f18c"
  }
  2 => App\Services\Block {#1580 ▼
    +index: 2
    +previousHash: "3b67c70f4e22032a7d4d0d2d0252b7b41f7ea218bfb199e647d16e4e9398f18c"
    +timeHash: "10/12/2021 11:23:14"
    +data: array:3 [▼
      "from" => "hunghd3"
      "to" => "hunghd4"
      "amount" => 5000
    ]
    +hash: "ceabfe6fe846ea0ad4b44cabfebbdd1c5694d33247eba5f95210dd6d738ccadf"
  }
  3 => App\Services\Block {#1581 ▼
    +index: 3
    +previousHash: "ceabfe6fe846ea0ad4b44cabfebbdd1c5694d33247eba5f95210dd6d738ccadf"
    +timeHash: "10/12/2021 11:23:14"
    +data: array:3 [▼
      "from" => "hunghd4"
      "to" => "hunghd"
      "amount" => 6000
    ]
    +hash: "c77a07b3e0f8987c95310f82546237e541191a05f940dc4e9d2ca04e5c8ad3be"
  }
]
```

# Kiểm tra chain bị thay đổi hay không
Chúng ta đã tạo được một chain ở phía trên nhưng nếu giờ hacker muốn thay đổi 1 block bất kỳ trong chain thì sẽ như nào? Nếu mà dễ dàng thay đổi thế thì block chain đã không được thịnh hành như bây giờ rồi. Để ngăn chặn việc đó thì mình sẽ phải kiểm tra tính của chain như sau đó là lấy `previousHash` === `hash` trước đó.

```php
public function inValidBlock()
    {
        for ($i = 1; $i < count($this->chain); $i++) {
            $currentBlock = $this->chain[$i];
            $previousBlock = $this->chain[$i - 1];

            if ($currentBlock->hash !== $currentBlock->execHash()) {
                return false;
            }

            if ($currentBlock->previousHash !== $previousBlock->hash) {
                return false;
            }
        }

        return true;
    }
```

Giờ mình sẽ thử thay đổi 1 block ( thay đổi data hoặc hash ) trong chain sẽ có kết quả như sau:

```php
$bl = new \App\Services\BlockChain();
$bl->addBlock(1, Carbon::now()->format('d/m/Y H:i:s'), ['from' => 'hunghd2', 'to' => 'hunghd3', 'amount'=> 4000]);
$bl->addBlock(2, Carbon::now()->format('d/m/Y H:i:s'), ['from' => 'hunghd3', 'to' => 'hunghd4', 'amount'=> 5000]);
$bl->addBlock(3, Carbon::now()->format('d/m/Y H:i:s'), ['from' => 'hunghd4', 'to' => 'hunghd', 'amount'=> 6000]);

$bl->chain[2]->data = [
    'from' => 'hunghd3',
    'to' => 'hunghd',
    'amount' => 5000
];
$bl->chain[2]->hash = $bl->chain[2]->execHash();

$bl->invalid = $bl->inValidBlock();
```

Ở đây thấy mã hash của block thứ 2 đã bị thay đổi mà block thứ 3 đã lưu lại mã hash của block thứ 2 trước khi thay đổi. Nên kết quả kiểm tra là `false`

![](https://images.viblo.asia/6e984ecc-1d94-46eb-8b78-d8365e604303.png)

# Proof-of-work

Nhưng thực tế, `hash` và `previousHash` khi mọi người có thể thay đổi dữ liệu 1 block rồi thay `previousHash` và `hash` của các block sau là vẫn tạo được một chain hợp lệ và chúng ta cũng muốn người dùng cùng phải đồng thuận (consensus) về một lịch sử duy nhất của chain. Và proof-of-work ra đời để giải quyết vấn đề này.

Nếu bạn muốn sửa đổi 1 block trước đó, bạn sẽ phải mine lại toàn bộ các block sau nó. Nó yêu cầu quét một giá trị bắt đầu bằng một số số 0 nhất định khi được hash. Giá trị được gọi là giá trị *nonce*, số bit 0 đứng đầu được gọi là *difficulty*. Bằng cách tăng độ khó việc khai thác, đồng nghĩa rằng việc mine sẽ ngày càng khó hơn.
Chúng ta có thể làm hệ thống này bằng cách tạo method mine

Giờ class Block mình sẽ code cuối cùng như này:

```php
<?php

class Block
{
    public $index;
    public $previousHash;
    public $timeHash;
    public $data;
    public $hash;
    public $mineVar;

    public function __construct($index = 0, $previousHash = '', $timeHash = '', $data = '')
    {

        $this->index = $index;
        $this->previousHash = $previousHash;
        $this->timeHash = $timeHash;
        $this->data = $data;
        $this->hash = $this->execHash();
        $this->mineVar = 0;
    }

    public function execHash()
    {
        if(is_array($this->data)) {
            $dataContent = json_encode($this->data);
        } else {
            $dataContent = $this->data;
        }

        return hash('sha256', $this->index . $this->previousHash . $dataContent . $this->timeHash . $this->mineVar );
    }

    public function mine($difficulty)
    {
        while (!str_starts_with($this->execHash(), str_repeat('0', $difficulty))) {
            $this->mineVar++;
            $this->hash = $this->execHash();
        }

        return $this->mineVar;
    }
}

```

Trong class Blockchain cũng cần bổ sung code như này:
```php
<?php

use Carbon\Carbon;

class BlockChain extends Block
{
    public $chain = array();
    public $difficulty;

    public function __construct($difficulty)
    {
        $this->chain[] = $this->createGenesisBlock();
        $this->difficulty = $difficulty;

        parent::__construct();
    }

    public function createGenesisBlock()
    {
        return new Block(0000,'the first', Carbon::now()->format('d/m/Y H:i:s'), ['from' => 'hunghd', 'to' => 'hunghd2', 'amount'=> 3000]);
    }

    private function getLatestBlock()
    {
        return $this->chain[(count($this->chain) - 1)];
    }

    public function addBlock($index, $timeHash, $data)
    {
        $previousHash = $this->getLatestBlock()->hash;
        $newBlock = new Block($index, $previousHash, $timeHash, $data);

        $newBlock->mine($this->difficulty);
        $this->chain[] = $newBlock;
    }

    public function inValidBlock()
    {
        for ($i = 1; $i < count($this->chain); $i++) {
            $currentBlock = $this->chain[$i];
            $previousBlock = $this->chain[$i - 1];

            if ($currentBlock->hash !== $currentBlock->execHash()) {
                return false;
            }

            if ($currentBlock->previousHash !== $previousBlock->hash) {
                return false;
            }
        }

        return true;
    }

}

```

Ok!! Giờ chúng ta sẽ thử chạy xem sao

```php
$bl = new \App\Services\BlockChain(4);
$bl->addBlock(1, Carbon::now()->format('d/m/Y H:i:s'), ['from' => 'hunghd2', 'to' => 'hunghd3', 'amount'=> 4000]);
$bl->addBlock(2, Carbon::now()->format('d/m/Y H:i:s'), ['from' => 'hunghd3', 'to' => 'hunghd4', 'amount'=> 5000]);
$bl->addBlock(3, Carbon::now()->format('d/m/Y H:i:s'), ['from' => 'hunghd4', 'to' => 'hunghd', 'amount'=> 6000]);
```

Kết quả chúng ta sẽ có các block có số `nonce` như mong muốn. Để tăng độ khó là 5 số 0 thì mình chỉ cần thay đổi  `difficulty = 5`.
```php
array:4 [▼
  0 => App\Services\Block {#1578 ▼
    +index: 0
    +previousHash: "the first"
    +timeHash: "10/12/2021 11:58:04"
    +data: array:3 [▶]
    +hash: "f636898ed8e8d5ddf3db99134694921a491ebd1fc80a1b4d3eb28f8d2c7e9ed5"
    +mineVar: 0
  }
  1 => App\Services\Block {#1579 ▼
    +index: 1
    +previousHash: "f636898ed8e8d5ddf3db99134694921a491ebd1fc80a1b4d3eb28f8d2c7e9ed5"
    +timeHash: "10/12/2021 11:58:04"
    +data: array:3 [▶]
    +hash: "00001c87474ccbf7cc6ef4eefa0fd4499989583716f41e6373e70a1e1b89585b"
    +mineVar: 13413
  }
  2 => App\Services\Block {#1580 ▼
    +index: 2
    +previousHash: "00001c87474ccbf7cc6ef4eefa0fd4499989583716f41e6373e70a1e1b89585b"
    +timeHash: "10/12/2021 11:58:04"
    +data: array:3 [▶]
    +hash: "0000dd0d602d647ac6e3aa4d6672073c5d229a0f2a2a12322c11b18661751639"
    +mineVar: 25881
  }
  3 => App\Services\Block {#1581 ▼
    +index: 3
    +previousHash: "0000dd0d602d647ac6e3aa4d6672073c5d229a0f2a2a12322c11b18661751639"
    +timeHash: "10/12/2021 11:58:04"
    +data: array:3 [▶]
    +hash: "00008ae256d9ccb10c578dc77629e89c3f2bf4cc4a146758b5c57e284d9fef86"
    +mineVar: 5349
  }
]
```

Tuy nhiên bài viết này mang tính cơ bản nên sẽ sử dụng proof-of-work. Trên thực tế công nghệ này đã lỗi thời chậm chạp, tốn tài nguyên và có hại cho môi trường nên các platform hiện nay thường sử dụng proof-of-stake.

Đây là bài viết dựa trên sự tìm hiểu của cá nhân mình nên có nhiều sai sót mong được mọi người đóng góp thêm!!!
# Nguồn tham khảo
1. https://viblo.asia/p/tu-tao-blockchain-trong-60-dong-code-javascript-1VgZvQN1KAw
2. https://www.youtube.com/watch?v=TlW5KqOKWoQ
3. http://ilook.asia/thu-thuat/phat-trien-blockchain-voi-php-83.html