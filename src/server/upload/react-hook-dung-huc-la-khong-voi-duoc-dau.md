# `React Hook - Dùng húc là không vội được đâu`
Gần đây mình khá là vật lộn khi thử migrate từ sử dụng class base component sang react hook để kiểm chứng mức độ hiệu quả thực tế trước khi đem và giới thiệu cho các member sử dụng rộng rãi.
Thứ đầu tiền sau khi nghĩ đến là ừ thì nhanh gọn đấy nhưng mà performance chán quá. Tại sao thế nhỉ? Qua một quá trình đọc document kỹ hơn và vọc code (code cha Ala hay Aba gì gì này viết loằng ngoằng thật) thì cũng có đúc rút ra một số kinh nghiệm xương máu để chia sẻ cho các bạn. Dùng `Hook` là không vội được đâu!<br><br>
![](https://images.viblo.asia/3b9b3cd5-5376-4f5f-aa41-57dc9d46e045.png)
## Testing profile
Bài toán test của mình khá đơn giản, render danh sách 1ooo phân tử. Khi click vào item bất kỳ thì item đó sẽ được sáng lên. Click lại lần nữa thì item đó tối trở lại.
Để kiểm tra xem liệu cái nào sẽ nhanh hơn.
Đầu tiên ta viết code trước nhé
Với class trước nhé khá là thân thuộc
```js
import PLAYERS from './players.bigdata.json'

class HomePage extends React.Component {
  state = {
    selectedPlayer: null,
  }

  onClickItem = (id) => {
    this.setState((state) => {
      const value = id === state[key]
        ? null
        : id

      return { selectedPlayer: value }
    })
  }

  render() {
    return (
      <>
        <h1>Hello, Toan</h1>
        <HomePageRow>
          <HomePageColumn>
            <h2>Players</h2>
            {PLAYERS.map(player => (
              <PlayerItem
                key={player.id}
                data={player}
                onClick={this.onClickPlayer}
                isSelectedPlayer={selectedPlayer === player.id}
              />
            ))}
          </HomePageColumn>
      </>
    )
  }
}
```
Với hook nào
```js
import React, {
  useState,
} from 'react'

import PLAYERS from './players.bigdata.json'

const Parent = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  
  const selectPlayer = (id) => {
    const value = id === selectedPlayer ? null : id
    setSelectedPlayer(value)
  }

  console.log('render parent')

  return (
    <>
      <h1>Hello, Toan</h1>
      <div className="ui equal width  grid">
        <div className="row">
          <div className="column ui">
            <h2>Players</h2>
            {PLAYERS.map(player => (
              <PlayerItem
                key={player.id}
                data={player}
                onClick={setSelectedPlayer}
                isSelectedPlayer={selectedPlayer === player.id}
              />
            ))}
          </div>
    </>
  )
}
```
Done, ở trong các component và parent, mình đều đặt một console.log và apply PureComponent cho children hoặc memo nhé.

## Profiling Result
Kết quả cũng khá ấn tượng.
##### Với class component
* Render lần đầu: Parent 1 lần, Child 1ooo lần
* Select 1 item: Parent 1 lần, Child 1 lần
* Select 1 item khác: Parent 1 lần, Child 2 lần
##### Với hook component
* Render lần đầu: Parent 1 lần, Child 1ooo lần
* Select 1 item: Parent 1 lần, Child 1000 lần
* Select 1 item khác: Parent 1 lần, Child 1000 lần
---
Kết quả ta thấy ở lần render đầu cả 2 đều như nhau nhưng mà khi click vào 1 item nào đó thì hook lại bị render lại toàn bộ danh sách chứ đáng lý phải là dùng cái nào, thay đổi cái đó.
Cũng khá dễ hiểu. Nhìn vào mình có thể thấy rằng, mỗi khi có sự thay đổi state thì hàm selectPlayer đều được khởi tạo lại và truyền xuống Child. Child do đó mà bị render lại toàn bộ danh sách cho dùng bất cứ là props của ai nào.

## Optimizing
* Tối ưu lần 1.
```js
const selectPlayer = useCallback(
  (id) => {
    const value = id === selectedPlayer ? null : id
    setSelectedPlayer(value)
  },
  [selectedPlayer],
)
```
Kết quả:
Select 1 item: Parent 1 lần, Child 1000 lần
Select 1 item khác: Parent 1 lần, Child 1000 lần
Có gì đó sai sai.  Mặc dùng mình đang dùng `useCallback` để hạn chế việc tạo lại function này. Tuy nhiên sự thay đổi này lại khong tác động vào bài toán ta đang gặp. Nhưng mà luôn sử dụng `useCallback` nhé.
* Tối ưu lần 2
```js
  const resetSelectPlayer = useCallback(
    (): void => {
      setSelectedPlayer(null)
    },
    []
  )

  const setNewSelectPlayer = useCallback(
    (id: string | null): void => {
      setSelectedPlayer(id)
    },
    []
  )
```
Select 1 item: Parent 1 lần, Child 1 lần
Select 1 item khác: Parent 1 lần, Child 2 lần
Rồi. Kết quả đã đúng như là ta mong muốn. Để tránh việc hàm bị tạo lại ta sẽ cần phải độc lập chúng với sự thay đổi của state. Ở đây mình đã chia thành 2 function nhỏ hơn, do đó nhưng Child nào mà không đang dùng đến state `selectedPlayer` thì sẽ không bị render lại. Nhưng mà khá phức tạp và rắc rối cho newbie phải không nào?

* Tối ưu lần 3
```js
const selectPlayer = useCallback(
  (id) => {
    setSelectedPlayer((selectedPlayer) => id === selectedPlayer
      ? null
      : id
    )
  },
  [],
)
```
Mình đã chót quên một cái đó là tương tự với `setState` ta sẽ có một cách khác nữa đó chính là callback function. Nhờ cách này, mình có thể access đến giá trị cuối cùng của state mà không cần phải render lại function cho mỗi khi state đó thay đổi.

## Conclusion
Đúng như mình kỳ vọng, hook thật sự ngắn gọn, nhưng mà để làm chủ được nó thì bạn sẽ phải làm chủ trong từng dòng code của mình.
Điều này chẳng dễ dàng gì, chỉ một sai sót nhở cũng có rất nhiều ảnh hưởng đến performance chung của dự án
Profile mình test thì mới dựa trên thời gian render và số lượng render mà thôi, còn nhiều yếu tổ khác liên quan đến perfomance như bundle size, memory taken, ... nữa
Nắn nót và cận thận là điều rất cần thiết
## `References`
Bài này  mình lừa tìm thêm mấy nguồn thông tin nữa nên là bài gốc rồi :D