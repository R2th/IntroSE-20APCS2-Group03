# Giới thiệu
Ở phần trước, chúng ta đã tìm hiểu cơ bản về blockchain, genesis, ... Bạn nào chưa tìm hiểu thì có thể xem lại nhé.

Github: https://github.com/lequocbinh04/the-simple-blockchain

# Tiếp tục câu chuyện
#### Monday, March 25.
Sau một tuần làm việc mệt mỏi, quán bar đã chấp nhận sử dụng token TBB. Nhưng không may chả có ai đến cả :(, nên John tự đặt 3 ly vodka cho mình và viết sự thay đổi của dữ liệu vào 1 tờ giấy:

```shell
john-3; // 3 ly vodka
john+3; // +3 do anh ấy mua từ chính quán bar của anh ấy
john+700; // tiền thưởng cho 1 tuần làm việc (7x100 mỗi ngày)
```

Để tránh việc tính lại số dư của user, John đã tạo một file `./database/state.json` để lưu trữ số dư.

```json
{
    "balances": {
        "john": 1000700
    }
}
```


#### Tuesday, March 26.
Để tăng lượng khách hàng, John đã thông báo tặng 100% token TBB cho bất kì ai mua nó vào 24h tới. 

Bing! Và anh ấy đã có khách hàng đầu tiên cho mình, **Jack**. Jack liền mua token với 1000$, và cô ấy mua một ly vodka để thưởng thức.

Lịch sử giao dịch được John ghi vào một tờ giấy nhỏ:
```shell
john-2000; // chuyển cho jack
jack+2000; // mua token với khuyến mãi 100%
jack-1; // mua vodka
john+1;
john+100; // 1 tiền thưởng cho một ngày
```

và tất nhiên, DB mới:

```shell
{
    "balances": {
        "john": 998801,
        "jack": 1999
    }
}
```

# Tóm tắt
[🔑] Block chain là một cơ sở dữ liệu.

Tổng cung của token, số dư ban đầu của user, và các setting của blockchain sẽ được đặt ở Genesis file. **Số dư, trạng thái ban đầu của blockchain được ghi ở genesis file là không bao giờ thay đổi.**

**Các thay đổi lên cơ sở dữ liệu gọi là giao dịch (Transaction | TX).**

# Kết bài
Phần này nhẹ nhàng tí, mọi người chuẩn bị sắn tay áo lên vào bắt đầu vào code với phần sau nhé, nếu thấy bài viết hay hãy upvote nheee cảm ơn mọi người nhiều

Github: https://github.com/lequocbinh04/the-simple-blockchain