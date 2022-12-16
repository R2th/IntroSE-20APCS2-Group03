![](https://images.viblo.asia/eefa2e94-8230-4f25-a1a3-204e682efe93.jpg)

Xin chào tất cả mọi người. Công nghệ Blockchain đã có từ rất lâu, với sự dẫn đầu nổi tiếng là Blockchain của Bitcoin và của Ethereum. Một vài năm trở lại đây, có 1 hệ sinh thái blockchain nổi lên như 1 đối trọng của Ethereum, đó là [Hệ sinh thái Solana](https://solana.com/). Đối với anh em Developer, nếu mọi người đã quá quen với việc tạo ra các Smart Contract trên mạng lưới Ethereum, thì hãy thử cùng tìm hiểu về blockchain Solana, và viết program trên đó xem sao 😉😉

# 1. Tại sao lại là Blockchain của Solana

![](https://images.viblo.asia/30c36142-db42-4166-a67f-86f71a149469.jpg)


Năm 2020, Solana nổi lên là 1 dự án có vai trò hỗ trợ các ứng dụng tài chính phi tập trung (DeFi), tăng khả năng mở rộng mạng lưới và tạo các hợp đồng thông minh với hiệu suất cao. Đối với những người đã và đang đầu tư tiền kỹ thuật số, chắc hẳn mọi người không còn lạ gì với đồng coin SOL. Một dự án có đội ngũ Developers chất lượng với người đứng đầu là [Anatoly Yakovenko](https://www.topionetworks.com/people/anatoly-yakovenko-5d4bb4c71dedae48dc39811d) đã từng rất nổi tiếng ở Qualcomm.

Solana là hệ sinh thái đầu tiên áp dụng cơ chế đồng thuận Proof of History (PoH - bằng chứng lịch sử), kết hợp với cơ chế Proof of Stake (PoS - bằng chứng cổ phần), giúp tốc độ xử lý giao dịch lên tới 1600 TPS (transactions per second) vào thời gian đầu, cao hơn rất nhiều so với chỉ 30 TPS của Ethereum và 5-7 TPS của Bitcoin. Hiện tại thì con số đó đã lên tới gần 2400 TPS, và theo Whitepaper của hệ sinh thái, nếu ở điều kiện lý tưởng thì có thể xử lý tới 700.000 transactions/s. Để bạn dễ hình dung, thì các hệ thống thanh toán quốc tế như Visa hay Mastercard chỉ đạt khoảng 1700 TPS, nghĩa là về tương lai Solana có thể xử lý nhanh hơn gấp nhiều lần các hệ thống này. Ngoài ra, chi phí cho mỗi giao dịch trong mạng Solana rất thấp chỉ khoảng 0.00005 đô la.

Điểm yếu của Solana được nhìn thấy rõ nhất đó là sự kiện ngày 14/9/2021. Khi đồng loạt các Validators đều ngừng hoạt động. Gián đoạn kéo dài 17h cho đến khi được hoạt động lại. Nguyên nhân được cho là [Raydium](https://raydium.io/) - Một blockchain layer 2 chạy trên nền của Solana, thực hiện đợt IDO với 300.000 transactions/s. Điều đó làm cho các Validators bị tràn bộ nhớ khi gặp phải lượng giao dịch đột biến như vậy, trong khi các Validators cũng đã được Solana khuyến cáo về sức mạnh tính toán tối thiểu là 128 GB Ram. Câu hỏi đặt ra là: Việc xác thực các Block bị phụ thuộc quá nhiều vào sức mạnh tính toán của tập các Validators thì blockchain của họ có thực sự phi tập trung  🙃🙃

Từ trước đến nay, hầu hết các Smart Contract (của Ethereum) đều được xây dựng với ngôn ngữ Solidity. Nhưng trong thời gian tới, Solidity có thể sẽ mất đi vị thế của mình về tay Rust. Vì mức độ linh hoạt của Rust có thể "ăn đứt" Solidity, và sự hạn chế nữa là Solidity chỉ tạo được Smart Contract. Với Rust thì có thể làm được rất nhiều thứ. Rất nhiều blockchain mới nổi đều hỗ trợ Developer với ngôn ngữ Rust như: Solana, [Near Protocol](https://near.org/), [Hệ sinh thái Polkadot](https://polkadot.network/), [Casper Network](https://casper.network/en/network), ... Tuy nhiên, Rust là một ngôn ngữ khá khó đối với người mới bắt đầu, đặc biệt là với những người chưa thành thạo C/C++. Vì thế, nếu bạn chưa học Rust, thì trước tiên hãy bỏ chút thời gian để học Rust cơ bản, còn không thì mình tin chắc sẽ khá khó ở các phần dưới nếu bạn chưa thành thạo Rust 😅😅
# 2. Cấu trúc 1 program trong Solana

Trong Solana, không có thuật ngữ Smart Contract như của Ethereum, mà thay vào đó là thuật ngữ program. Khi có 1 ứng dụng muốn tương tác với Cluster trong mạng Solana, nó sẽ gửi đi các transactions lên mạng, mỗi transaction sẽ có 1 hoặc vài instruction. Solana sau đó sẽ điều hướng các transaction tương tác trực tiếp với program mà Developer đã deploy trước đó. Để hiểu rõ hơn về cách tương tác với mạng blockchain Solana, hay cấu tạo 1 transaction gửi lên thế nào, bạn có thể tham khảo ở [Programming Model](https://docs.solana.com/developing/programming-model/overview).

## Cài đặt Rust

Để tạo 1 program, trước tiên chúng ta phải cài đặt môi trường lập trình ngôn ngữ Rust, việc cài đặt rất đơn giản, bạn có thể tham khảo cách cài đặt [Rust Installation](https://www.rust-lang.org/tools/install). Tạo 1 project mới với Rust bằng câu lệnh `cargo new project_name --lib`

Cấu trúc ban đầu của project sẽ như thế này:
```
project_name
|----src
         |-----lib.rs
|----target
         ...
|----Cargo.lock
|----Cargo.toml
```
- Code sẽ được build từ file `lib.rs`
- Chạy lệnh `cargo run` để run project, khi đó thư mục target mới được tạo ra
- File Cargo.toml quản lý các thông tin project, các thư viện phụ thuộc. Hiểu tương tự như package.json trong Javascript.
- Lệnh `cargo build-bpf` sẽ biên dịch code tạo file `.so` và keypair. Tất cả ở thư mục `target/deploy/`

## Cài đặt Solana

Tiếp theo là chúng ta cần cài đặt công cụ Solana, trình tự cài đặt khá đơn giản, bạn có thể xem hướng dẫn [Solana CLI Tool](https://docs.solana.com/cli/install-solana-cli-tools). Kiểm tra xem chúng ta có cài đặt thành công hay chưa bằng lệnh `solana`, nếu không có lỗi gì thì ngon rồi. 😃😃

Chúng ta cũng cần phải tạo 1 ví cho Solana ngay dưới local bằng lệnh:
```
solana-keygen pubkey /home/solana/my_wallet.json
```
Lệnh này sẽ hiển thị ngay trên terminal 1 public key cho bạn, bạn có thể kiểm tra địa chỉ ví với lệnh `solana address`, ví này có private key được lưu dưới dạng keypair. Từ giờ trở đi, ví này sẽ được dùng để ký lên các giao dịch mà deploy ở máy chúng ta lên mạng blockchain Solana.

Bạn chạy lệnh `solana config get` để kiểm tra các config trong máy. Lúc này, chúng ta sẽ thấy `RPC URL: https://api.mainnet.solana.com`. Trường RPC đang để là mainnet, đó là môi trường thực của Solana, khi deploy sẽ mất phí giao dịch. Vì thế chúng ta cần đưa về môi trường devnet để phải triển sau này, với lệnh: `solana config set --url https://api.devnet.solana.com`. Bạn cũng cần set lại trường Key Pair thành đường dẫn đến file keypair mà chúng ta đã tạo phía trên.

Chúng ta cần cài đặt `spl-token-cli` với lệnh `cargo install spl-token-cli` để thuận lợi cho việc sử dụng các token sau này.

Cuối cùng, thì ví của chúng ta phải có 1 lượng coin SOL để làm phí giao dịch deploy phải không nào ? 😅😅 Bạn chỉ cần chạy lệnh `solana airdrop 1 your_publickey`. Kiểm tra xem ví bạn có bao nhiêu coin SOL bằng lệnh `solana balance your_publickey --url https://api.devnet.solana.com`.

Vậy là xong, ví chúng ta đã có lượng coin là 1 SOL để giao dịch sau này. Giờ thì thoải mái code thôi 😉😉😉

## Cấu trúc 1 program

Trong Solana, họ đưa ra cấu tạo chuẩn để tạo ra 1 program, đó là [Repo template](https://github.com/mvines/solana-bpf-program-template). Trước tiên, bạn cần xóa bỏ hết những gì có trong file `src/lib.rs`, và thêm 2 dòng lệnh sau vào cuối file Cargo.toml:
```
[lib]
crate-type = ["cdylib", "lib"]
```
> Lưu ý: Đây sẽ là template cho tất cả các program chuẩn trong Solana, cho tới khi Solana có bản cập nhật template mới. Hãy ngó qua template đó một chút nhé 😉

Chúng ta sẽ sử dụng Macro `entrypoint!` để khai báo hàm `process_instruction` cho chương trình. Entrypoint là cổng vào duy nhất mà một lời gọi có thể gọi đến program của Solana.

> Khi có lời gọi đến, chương trình sẽ được nạp vào [BPF Loader](https://docs.solana.com/developing/on-chain-programs/overview). Mỗi BPF Loader sẽ có 1 hoặc nhiều Entrypoint.

Trong hàm `process_instruction`, các đối số là `program_id` là ID của chương trình sau khi deploy, mọi biến state trong chương trình sẽ đính kèm ở `accounts`, dữ liệu truyền lên theo lời gọi sẽ để ở trong `instruction_data`.

Quay lại với Solidity trong Ethereum một chút, có 2 loại address trong Solidity đó là:

- User Address: Để lưu trữ các token, ký lên các giao dịch, tạo Smart Contract mới
- Contract Address: Chỉ có thể lưu trữ các token và tương tác với các Smart Contract khác

Trong Solana thì chia làm 3 loại Account (có thể hiểu đơn giản là public address):

- Account được sở hữu bởi System program. Đó chính là các địa chỉ của chúng ta dùng để ký lên các giao dịch tương tự như User Address trong Solidity, ví dụ là địa chỉ mình đã tạo trên máy local.
- Account được sở hữu bởi Token Program. Đó là các địa chỉ có thể chứa coin hoặc token mà thuộc sở hữu của 1 chương trình nào đó. Tuy nhiên, khi có giao dịch thì người ký lên giao dịch vẫn là chúng ta
> Loại Account thứ 2 này thuộc sở hữu của Token Program, nhưng người tạo ra nó sẽ là chúng ta (Account owned by system program).
- Account được sở hữu bởi chính chương trình của chúng ta, nó sẽ lưu trữ các biến state của chương trình.

> Kết luận: Tất cả các Account chỉ được sở hữu bởi các chương trình.

Nhưng chờ chút, kết luận trên có vẻ mâu thuẫn với các phân chia loại Account phía trên, không lẽ Account của mình sở hữu coin SOL lại không phải thuộc sở hữu của mình 😆😆. Trên thực tế, tất cả các giao dịch trên Solana đều được xử lý bởi 1 chương trình nào đó. Hãy nhớ là các dữ liệu state đều được lưu trong Account, mà tất cả Account đều được sở hữu bởi BPF Loader. Chỉ có 1 chương trình duy nhất là không thuộc sở hữu của BPF Loader đó là System Program.

Trên phía trên là giải thích cho các biến `accounts` được truyền vào hàm `process_instruction`😉

Tiếp theo là trong file `instruction.rs`, nhìn tên thì bạn có thể đoán được đó là các `instruction` được nói đến trong docs của Solana. Nó sẽ xác định lời gọi bạn truyền lên là gì, phân tích nó và điều hướng đến các hàm phía sau đó.

> Instruction được định nghĩa là "API" của chương trình

File `error.rs` sẽ định nghĩa các lỗi xảy ra trong chương trình.

Cuối cùng là file `state.rs` sẽ khai báo các biến state lưu trữ trong chương trình

> Kết luận luồng chạy:
> - Có người gọi vào program (đưa ra 1 caller)
> - Cổng vào Entrypoint sẽ chuyển các đối số đến bộ xử lý processor
> - Bộ xử lý yêu cầu `instruction.rs` giải mã `instruction_data` truyền lên.
> - Dựa vào dữ liệu giải mã, `instruction.rs` sẽ quyết định gọi tiếp đến hàm nào
> - Bộ xử lý sẽ dùng `state.rs` để mã hóa hoặc giải mã state của 1 tài khoản

Trên đây là toàn bộ luồng chạy khi có 1 giao dịch gọi đến 1 chương trình trong Solana 😉

# 3. Chương trình Escrow (ký quỹ)

![](https://images.viblo.asia/6ff23fec-993e-418e-8032-a945b3e81970.gif)

Một program không quá khó cũng không quá dễ để mọi người hiểu và thực hành, đó là 1 chương trình ký quỹ.

Khi bạn muốn trao đổi 1 tài sản X lấy 1 tài sản Y của người khác. Bạn giao cho người ta X trước và họ giao lại cho bạn Y sau. Thế là xong rồi, cần gì đến blockchain nhỉ 😂😂. Nhưng nếu học không giao Y cho bạn và rời đi thì sao, lúc này bạn sẽ cần 1 người làm trung gian mà cả 2 tin tưởng, mỗi người sẽ giao tài sản của mình cho họ, rồi họ sẽ giao tài sản tương ứng cho 2 bên. Nhưng nếu cả bên trung gian cũng gian lận thì sao. Lúc này là lúc blockchain thể hiện, nó sẽ là trung gian, bạn có thể kiểm tra xem blockchain có gian lận hay không bằng cách xem code của nó 😉😉

![image.png](https://images.viblo.asia/f6115a43-3b8c-4037-99b2-4f89f4ed3047.png)

Nhìn vào sơ đồ phía trên, mình có thể phân tích như sau:

- 2 người Alice và Bob, mỗi người sẽ tạo 1 account chính của mình, đó là account mà họ dùng để ký lên các giao dịch. Chính là loại Account thứ nhất mình đã nói bên trên.
- Sau khi giao dịch thành công, cả Alice và Bob đều sở hữu token X và token Y. Vì thế, chúng ta sẽ yêu cầu cả 2 người, mỗi người phải tạo 2 Account để lưu trữ X và Y. Loại Account này chính là loại thứ 2 mình đã nói. Nó thuộc sở hữu của Token Program X và Token Program Y.
- Cuối cùng là Escrow State Account, chính là loại thứ 3, dùng để lưu trữ các biến state trong chương trình.

![image.png](https://images.viblo.asia/a5157e0a-c4fb-4ac2-af3a-70e30662428e.png)

Trên đây là tính sở hữu cho mỗi loại Account, tương ứng là 3 loại mình đã nói phía trên.

![image.png](https://images.viblo.asia/009b6bc6-63cc-4d41-8673-a3b972165fab.png)

Nhìn sơ đồ phía trên, chúng ta có thêm 1 Account nữa đó là `Alice temp token acc X`, đó là account sẽ chỉ chứa lượng token X mà Alice muốn trao đổi. Alice sẽ phải cấp quyền cho `Escrow State Account` trên `Alice temp token acc X` để nó có thể tự động lấy token X trong ví đó và chuyển đi. Đương nhiên nó cũng là 1 Account loại 2 và hiểu nó như là ví phụ để chứa token X.

# 4. Viết chương trình ký quỹ

## Các Dependencies

Trong file `Cargo.toml`, chúng ta sẽ cần phải khai báo một số Dependencies, đó chính là các thư viện mà chúng ta nạp vào project Escrow này. Tất cả các dependencies này bạn có thể tìm kiểm trên [Crate.io](https://crates.io/)

```
[dependencies]
solana-program = "1.9.5"
thiserror = "1.0.30"
spl-token = {version = "3.3.0", features = ["no-entrypoint"]}
arrayref = "0.3.6"
```
Giải thích 1 chút:

- `solana-program` là 1 thư viện Solana đã viết để hỗ trợ tạo program. Mình sẽ phải sử dụng nó rất nhiều khi tạo program
- `thiserror` là thư viện giúp tạo các lỗi được raise lên, nếu không dùng nó, chúng ta sẽ phải khai báo cụ thể các lỗi như thế nào
- `spl-token` là thư viện giúp ích rất nhiều trong việc kiểm tra các Account thuộc sở hữu của Token Program
- `arrayref` giúp mã hóa và giải mã dữ liệu từ `instruction_data` gửi lên

## Khai báo Error

```
use thiserror::Error;

use solana_program::program_error::ProgramError;

#[derive(Error, Debug, Copy, Clone)]
pub enum EscrowError {
    /// Invalid instruction
    #[error("Invalid Instruction")]
    InvalidInstruction,
    /// Not Rent Exempt
    #[error("Not Rent Exempt")]
    NotRentExempt,
    /// Expected Amount Mismatch
    #[error("Expected Amount Mismatch")]
    ExpectedAmountMismatch,
    /// Amount Overflow
    #[error("Amount Overflow")]
    AmountOverflow,
}
```

Trong đoạn code trên, mình khi báo 4 loại lỗi có thể xảy ra:

- `InvalidInstruction`: Khi `instruction_data` gửi lên program với định dạng không hợp lệ
- `NotRentExempt`: Khi Account dùng để deploy chương trình không đủ số dư để 'thuê' không gian lưu trữ dữ liệu trên Solana
- `ExpectedAmountMismatch`: Xảy ra khi Bob gửi số token Y lên program là không tương ứng với token X mà Alice đã gửi
- `AmountOverflow`: Khi Alice trao đổi 1 lượng token X vượt quá số token mà Alice đã sở hữu.

4 loại lỗi trên mình để vào 1 enum.

Tất cả các lỗi trong program đều chỉ được phép đưa về dạng `ProgramError`. Rất đơn giản, chúng ta dùng hàm from để ép kiểu `enum` về `ProgramErro`

```
impl From<EscrowError> for ProgramError {
    fn from(e: EscrowError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
```

Cuối cùng là import file `error.rs` và file `lib.rs`:

```
pub mod error;
```

## Khai báo Entrypoint

Tiếp theo là chúng ta phải khai báo Entrypoint cho chương trình:

```
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, pubkey::Pubkey,
};

use crate::processor::Processor;

entrypoint!(process_instruction);
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    Processor::process(program_id, accounts, instruction_data)
}
```

Macro `entrypoint!` và hàm `process_instruction` mình đã giải thích ở phần phía trên. Đó chỉ đơn giản là nhận vào 3 đối số `program_id`, `accounts` và `instruction_data`. Và hàm xử lý tiếp theo là `process` trong file `processor.rs`

Tương tự chúng ta cũng import file trên vào file `lib.rs` và tạo 1 file mới `processor.rs`:
```
pub mod error;
pub mod instruction;
pub mod processor;

#[cfg(not(feature = "no-entrypoint"))]
pub mod entrypoint;
```

## Khai báo Instruction

Như mình đã nói ở trên, `instruction.rs` như là API của chương trình. Ở trong đó, chúng ta sẽ khai báo các 'lối đi' cho luồng chạy
```
use solana_program::program_error::ProgramError;
use std::convert::TryInto;

use crate::error::EscrowError::InvalidInstruction;

pub enum EscrowInstruction {
    InitEscrow {
        amount: u64,
    },
    Exchange {
        /// the amount the taker expects to be paid in the other token, as a u64 because that's the max possible supply of a token
        amount: u64,
    },
}
```

Trên đây mình khai báo 2 lối đi cho luồng chạy, đó là `InitEscrow` và `Exchange`. `InitEscrow` dùng để khởi tạo ký quỹ. `Exchange` dùng để thực hiện trao đổi token

Tiếp theo là mình phải khai báo phần giải mã dữ liệu mà luồng chạy gửi lên:
```
impl EscrowInstruction {
    /// Unpacks a byte buffer into a [EscrowInstruction](enum.EscrowInstruction.html).
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = input.split_first().ok_or(InvalidInstruction)?;

        Ok(match tag {
            0 => Self::InitEscrow {
                amount: Self::unpack_amount(rest)?,
            },
            1 => Self::Exchange {
                amount: Self::unpack_amount(rest)?,
            },
            _ => return Err(InvalidInstruction.into()),
        })
    }

    fn unpack_amount(input: &[u8]) -> Result<u64, ProgramError> {
        let amount = input
            .get(..8)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .ok_or(InvalidInstruction)?;
        Ok(amount)
    }
}
```

Chúng ta sẽ "bóc gói" dữ liệu gửi lên program, phần tử đầu tiên trong mảng `instruction_data` là để xác định đường đi xem Init hay Exchange. Các phần tử còn lại sẽ được `unpack` để giải mã các đối số.

Cuối cùng chúng ta cũng phải import nó vào `lib.rs`:
```
pub mod error;
pub mod instruction;

#[cfg(not(feature = "no-entrypoint"))]
pub mod entrypoint;
```

## Khai báo Processor

File `processor.rs` sẽ là file xử lý dữ liệu sau khi nó đã được `unpack` trong Instruction
```
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program::{invoke, invoke_signed},
    program_error::ProgramError,
    program_pack::{IsInitialized, Pack},
    pubkey::Pubkey,
    sysvar::{rent::Rent, Sysvar},
};
use spl_token::state::Account as TokenAccount;
use crate::{error::EscrowError, instruction::EscrowInstruction, state::Escrow};

pub struct Processor;

impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = EscrowInstruction::unpack(instruction_data)?;

        match instruction {
            EscrowInstruction::InitEscrow { amount } => {
                msg!("Instruction: InitEscrow");
                Self::process_init_escrow(accounts, amount, program_id)
            }
            EscrowInstruction::Exchange { amount } => {
                msg!("Instruction: Exchange");
                Self::process_exchange(accounts, amount, program_id)
            }
        }
    }
}
```

2 hàm chúng ta cần khai báo tiếp theo là `process_init_escrow` và `process_exchange`

```
...
fn process_init_escrow(
    accounts: &[AccountInfo],
    amount: u64,
    program_id: &Pubkey,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let initializer = next_account_info(account_info_iter)?;

    if !initializer.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    let temp_token_account = next_account_info(account_info_iter)?;

    let token_to_receive_account = next_account_info(account_info_iter)?;
    if *token_to_receive_account.owner != spl_token::id() {
        return Err(ProgramError::IncorrectProgramId);
    }
    ...
    Ok(())
}
...
```

Trong hàm nay, chúng ta sẽ khai báo 1 iter để duyệt qua tất cả các Accounts mà chúng ta truyền lên. Account đầu tiên chính là Account của Alice, người sẽ ký lên giao dịch đầu tiên.

Tiếp theo là Account phụ của Alice để chứa token X, và cuối cùng là Account nhận token X của Bob.

Chúng ta sẽ phải thực hiện kiểm tra `token_to_receive_account` có owner có phải là 1 Token Program hay không.

Chúng ta có thể thắc mắc: tại sao `token_to_receive_account` cần kiểm tra hợp lệ mà `temp_token_account` lại không kiểm tra ? 😄😄
Câu trả lời là phía sau mình sẽ thực hiện Alice sẽ cấp quyền cho PDA. Việc chuyển này sẽ tự động thất bại nếu `temp_token_account` không thuộc sở hữu của Token Program. Còn `token_to_receive_account` thì chúng ta sẽ phải tự kiểm tra.

```
...
fn process_init_escrow(
    accounts: &[AccountInfo],
    amount: u64,
    program_id: &Pubkey,
) -> ProgramResult {
    ...
        let escrow_account = next_account_info(account_info_iter)?;
        let rent = &Rent::from_account_info(next_account_info(account_info_iter)?)?;

        if !rent.is_exempt(escrow_account.lamports(), escrow_account.data_len()) {
            return Err(EscrowError::NotRentExempt.into());
        }

        let mut escrow_info = Escrow::unpack_unchecked(&escrow_account.try_borrow_data()?)?;
        if escrow_info.is_initialized() {
            return Err(ProgramError::AccountAlreadyInitialized);
        }

        escrow_info.is_initialized = true;
        escrow_info.initializer_pubkey = *initializer.key;
        escrow_info.temp_token_account_pubkey = *temp_token_account.key;
        escrow_info.initializer_token_to_receive_account_pubkey = *token_to_receive_account.key;
        escrow_info.expected_amount = amount;

        Escrow::pack(escrow_info, &mut escrow_account.try_borrow_mut_data()?)?;
        let (pda, _nonce) = Pubkey::find_program_address(&[b"escrow"], program_id);
    ...
    Ok(())
}
...
```

Tiếp theo trong hàm `process_init_escrow` chúng ta sẽ phải lấy Account `escrow_program` và Account `rent`. Sau đó, thực hiện `unpack` dữ liệu được đính kém trong Account `escrow_program`, kiểm tra xem `escrow_info` đã được khởi tạo chưa. Chỗ này sẽ raise ra lỗi nếu nó đã được khởi tạo, mà chúng ta lại khởi tạo 1 lần nữa. Chúng ta sẽ truyền dữ liệu đối số vào và đóng gói dữ liệu mới vào dữ liệu đã đính kèm trong Account `escrow_program`.

Phía trên mình có nhắc tới PDA, vậy nó là cái gì vậy ? 🤣🤣Đó chính là 1 public key trong Solana theo chuẩn [ED25519](http://ed25519.cr.yp.to/). Trong Solana, tất cả các public key đều phải tuân thủ theo đường cong Eliptic, PDA sinh ra từ `program_id` và `seeds`, nhưng `seeds` lại không nằm trên đường cong, nên PDA sẽ không tuân theo đường cong Eliptic. Chi tiết bạn có thể đọc [Program Derived Address](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses).

![image.png](https://images.viblo.asia/1dfcb112-b07d-4d1b-b094-ca95cdb0a576.png)

Alice sẽ phải cấp quyền sở hữu token X từ Account temp sang cho PDA. Chúng ta tạo nó bằng hàm `find_program_address` và truyền đối số `program_id` và mảng các `seeds` vào.

PDA gần như là thu được chắc chắn, tỷ lệ thất bại của hàm tạo PDA này khoảng `1/2^255`, điều này là gần như không thể. 1 PDA có thể sở hữu nhiều Account temp token.

Để thực hiện cấp quyền chúng ta sẽ phải sử dụng [Cross-Program Invocation](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations) và thực thi `invoke` (cho Alice) hoặc `invoke_signed` (cho Bob). Chi tiết về sự khác nhau thì mình sẽ giải thích sau.

```
...
fn process_init_escrow(
    accounts: &[AccountInfo],
    amount: u64,
    program_id: &Pubkey,
) -> ProgramResult {
    ...
        let token_program = next_account_info(account_info_iter)?;
        let owner_change_ix = spl_token::instruction::set_authority(
            token_program.key,
            temp_token_account.key,
            Some(&pda),
            spl_token::instruction::AuthorityType::AccountOwner,
            initializer.key,
            &[&initializer.key],
        )?;

        msg!("Calling the token program to transfer token account ownership...");
        invoke(
            &owner_change_ix,
            &[
                temp_token_account.clone(),
                initializer.clone(),
                token_program.clone(),
            ],
        )?;
    Ok(())
}
...
```

Về phần tạo chữ ký, các bạn có thể tìm hiểu [Instructions that require privileges](https://docs.solana.com/developing/programming-model/calling-between-programs#instructions-that-require-privileges).

## Deploy chương trình

Toàn bộ code phía trên mình đã giải thích cho lời gọi khởi tạo `InitEscrow`, chúng ta có thể hoàn toàn deploy ngay bây giờ. Mình sẽ giải thích chức năng Exchange ở bài viết sau.

Compile toàn bộ project bằng câu lệnh:
```
cargo build-bpf
```

Lúc này, trong thư mục `target/deploy/` sẽ có 2 file `.so` và file keypair.

Chúng ta chạy lệnh sau để deploy lên mạng devnet:

```
solana program deploy target/deploy/file_name.so
```

Blockchain Solana có 2 site để chúng ta xem được mọi giao dịch diễn ra trong mạng: [Explorer Solana](https://explorer.solana.com/) và [Solscan.io](https://solscan.io/). Bạn có thể paste Id của Program đã deploy, lên phần search của 2 site trên.

# 5. Tài liệu tham khảo

- Trang chủ của Blockchain Solana: https://solana.com
- Kiến trúc chương trình trong Solana: https://docs.solana.com/developing/programming-model/overview
- Thư viện lập trình Solana: https://spl.solana.com
- Solana và Ethereum: https://www.fool.com/investing/2022/01/04/is-solana-a-better-buy-than-ethereum-in-2022
- Điểm yếu của Solana: https://solana.com/news/9-14-network-outage-initial-overview
- Code cho bài viết: https://github.com/kobby-pentangeli/solana-escrow

> Trong bài viết tới, mình sẽ cố gắng hoàn thiện chức năng Exchange. Cũng như sẽ tạo 1 giao diện UI bằng React Typescript và thư viện [Solana Web3](https://solana-labs.github.io/solana-web3.js) để có thể kết nối ví và tương tác với Blockchain. 😉😉

Cảm ơn mọi người đã theo dõi đến đây. Chúc mọi người năm mới An khang thịnh vượng, Vạn sự như ý. 🤩🤩