Ở bài lần trước mình đã giới thiệu về  [Immutability trong React và Redux](https://viblo.asia/p/tong-quan-immutability-trong-react-va-redux-maGK77MaKj2)!
Hôm nay mình xin giới thiệu về các cách để update state được sử dụng rất phổ biến trong Redux!
Như các bạn đã biết trong redux state sẽ được update trong reducer, mà các hàm trong reducer phải là các pure function, có nghĩa là không được sửa trực tiếp trên state, mà phải tạo ra một state mới dựa trên state cũ, phần này mình cũng đã nói trong bài trước rồi. 
Việc viết các đoạn code update state immutability có thể sẽ hơi khó khăn đối với những ai mới code. Trong bài này mình sẽ hướng dẫn một số mẫu update state được sử dụng chung cho hầu hết các trường hợp.
Một lưu ý nhỏ nữa là các cách này các bạn cũng có thể sử dụng với việc update state thông thường như là setState chứ không nhất thiết là phải sử dụng redux mới sử dụng được nhé!
# Toán sử spreed
Spreed là toán tử ba chấm... , nó cũng khá dễ để sử dụng và được sử dụng thường xuyên đối vói các object hoặc array. Vậy mình sẽ cũng xem cách nó hoạt động như thế nào.
Spreed...được đặt trước một object hay một mảng, nó sẽ trải các thành phần con bên trong ra và đồng thời tạo thành một Array hoặc object mới.
Ví dụ bên dưới sẽ làm hiểu rõ hơn về vấn đề này: 
```
// For arrays:
let nums = [1, 2, 3];
let newNums = [...nums]; // => [1, 2, 3]
nums === newNums // => false! it's a new array

// For objects:
let person = {
  name: "Liz",
  age: 32
}
let newPerson = {...person};
person === newPerson // => false! it's a new object

// Internal properties are left alone:
let company = {
  name: "Foo Corp",
  people: [
    {name: "Joe"},
    {name: "Alice"}
  ]
}
let newCompany = {...company};
newCompany === company // => false! not the same object
newCompany.people === company.people // => true!
```
Toán tử spreed sẽ giúp mình tạo một object hoặc một Array mới với giá trị và cấu trúc giống hết array hoặc object cũ. Điều này sẽ rất hữu ích để mình có thể coppy một array/object và sau đó ghi đè các thuộc tính con bên trong mà mình muốn thay đổi
```
let liz = {
  name: "Liz",
  age: 32,
  location: {
    city: "Portland",
    state: "Oregon"
  },
  pets: [
    {type: "cat", name: "Redux"}
  ]
}

// Bây giờ mình muốn tạo ra một olderLiz và thay đổi thuộc tính age có gíá trị 33
let olderLiz = {
  ...liz,
  age: 33
}
```
# Cập nhật state là một object
Như mình có nói ở trên, muốn cập nhật một state ở dạng object thì cách đơn giản nhất là dùng toán tử spreed để trải các các thuộc tính bên trong state ra như thế này ...state. Sau đó ghi đè lại các thuộc tính mà mình cần thay đổi giá trị. Ví dụ mình có một reducer đơn giản cập nhật một state khi mình nhấn vào button tăng giảm số lượng click vào một button nào đó
```
function reducer(state, action) {
  /*
    State looks like:

    state = {
      clicks: 0,
      count: 0
    }
  */

  return {
    ...state,
    clicks: state.clicks + 1,
    count: state.count - 1
  }
}
```
# Cập nhật một đối tượng trong một đối tượng
Khi muốn cập nhật một đối tượng có nhiều cấp độ, tức là một object có các thuộc tính là một object, thì trường hợp này mình sẽ làm tương tự nhưng phải coppy tất cả các level của object đó.
```
function reducer(state, action) {
  /*
    State looks like:

    state = {
      house: {
        name: "Ravenclaw",
        points: 17
      }
    }
  */

  // Two points for Ravenclaw
  return {
    ...state, // copy the state (level 0)
    house: {
      ...state.house, // copy the nested object (level 1)
      points: state.house.points + 2
    }
  }
```
Tất nhiên ở đây mình làm như vậy là để tạo ra một object mới và update thuộc tính points, chứ đơn thuần nếu chỉ chỉ cần tạo ra một object mới mà không cần update thuộc tính nào cả thì các bạn chỉ cần làm ngắn gọn như phía trên là được rồi.
Một ví dụ nữa giải thích  cho việc update object có 2 cấp độ, mình sẽ làm tương tự
```
function reducer(state, action) {
  /*
    State looks like:

    state = {
      school: {
        name: "Hogwarts",
        house: {
          name: "Ravenclaw",
          points: 17
        }
      }
    }
  */

  // Two points for Ravenclaw
  return {
    ...state, // copy the state (level 0)
    school: {
      ...state.school, // copy level 1
      house: {         // replace state.school.house...
        ...state.school.house, // copy existing house properties
        points: state.school.house.points + 2  // change a property
      }
    }
  }
```
Trong trường hợp object có nhiều level như trên thì có vẻ hơi khó đọc và hiểu, tuy nhiên nếu quen rồi thì các bạn sẽ thấy nó đây là cách viết ngắn gọn và được sử dụng rất phổ biến
# Chèn một element vào đầu mảng
Khi muốn chèn một element vào đầu mảng thì mình nghĩ ngay đến với dùng hàm unshift trong javascript, tuy nhiên cách này sẽ update trên chính mảng đó. Đây là điều mình không mong muốn và không đúng với nguyên tắc immutability. Vậy nếu áp dụng toán tử spreed ở trên để phù hợp vởi redux, thì mình sẽ làm như thế nào?
```
function reducer(state, action) {
  /*
    State looks like:

    state = [1, 2, 3];
  */

  const newItem = 0;
  return [    // a new array
    newItem,  // add the new item first
    ...state  // then explode the old state at the end
  ];
  // vậy là mình sẽ được một state mới:
  state = [0,1,2,3,4];
```
Vậy nếu mình không chèn vào đầu mảng mà chèn vào cuối mảng thì sao? Chỉ cần một thay đổi nhỏ
```
function reducer(state, action) {
  /*
    State looks like:

    state = [1, 2, 3];
  */

  const newItem = 0;
  return [    // a new array
    ...state, // explode the old state first
    newItem   // then add the new item at the end
  ];
```
Ở trường hợp này có một cách đơn giản hơn nếu các bạn không muốn sử dụng toán tử spreed:
```
function reducer(state, action) {
  const newItem = 0;
  const newState = state.slice();

  newState.push(newItem);
  return newState;
```
Là mình sẽ tạo một bản sao với slice, sau đó thêm phần tử vào cuối mảng với hàm push quen thuộc.
# Update một object trong một Array
Cuối cùng mình sẽ đến với một trương hợp khó hơn đó là giả sử mình có array, trong array lại có nhiều object, và bây giờ mình muốn update một hoặc nhiều object bất kì trong array đó thì phải làm thế nào?
Thì cách làm cũng sẽ tương tự như ở trên, điểm khác ở đây là cách mà mình tạo một array mới trả về các bản sao các object đã được thay đổi.
Mình cũng sử dụng một hàm quen thuộc đó là hàm map. Hàm map sẽ trả vể một array mới dựa trên array mà bạn đã cũng cấp, nó sẽ duyệt qua từng thành phần trong mảng và coppy các thành phần đó vô một mảng mới thông qua câu lệnh return.
Nói một cách dễ hiểu thì nếu mảng mình có N phần tử và cũng muốn trả về N phần tử thì mình sẽ dùng map. Do đó mình có thể dễ dàng update một object kết hợp với điều kiện.
Xem ví dụ bên dưới:
```
function reducer(state, action) {
  /*
    State looks like:

    state = [
      {
        id: 1,
        email: 'jen@reynholmindustries.com'
      },
      {
        id: 2,
        email: 'peter@initech.com'
      }
    ]

    Action contains the new info:

    action = {
      type: "UPDATE_EMAIL"
      payload: {
        userId: 2,  // Peter's ID
        newEmail: 'peter@construction.co'
      }
    }
  */

  return state.map((item, index) => {
    // Find the item with the matching id
    if(item.id === action.payload.userId) {
      // Return a new object
      return {
        ...item,  // copy the existing item
        email: action.payload.newEmail  // replace the email addr
      }
    }

    // Leave every other item unchanged
    return item;
  });
}
```
Ở ví dụ trên mình có một list object trong một array, và mình muốn cập nhật một hoặc nhiều email trên từng object. Vậy để phân biệt giữa các object với nhau mình sẽ dựa vào trường ID, Thông tin mà object cần update nằm ở trong action. Vậy khi duyệt qua các item mình sẽ kết hợp với điều kiện item.id === action.payload.userId để biết mình cần update object nào! Easy :D
Trên đây mình đã giới thiệu một số cách cập nhật state trong redux nói riêng và trong react js nói chung. Nếu bài viết có chỗ nào thiếu xót mong các bạn góp ý!
# Tài liệu tham khảo
https://daveceddia.com/react-redux-immutability-guide/