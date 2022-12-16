Sau một thời gian làm việc với redux thì mình có rút ra được một vài tips để viết reducer một cách ngắn gọn hơn. Giúp bạn dễ bảo trì code hơn. Ví dụ như mình muốn lưu một `Array` questions vào reducer `questions`. Bình thường mình sẽ viết như thế này
```javascript
const questions = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return action.payload
    case MERGE:
      const isExist = state.some(question => question.id === action.payload.id)
      if (isExist) {
        return state.concat(action.payload)
      }
      return state.map((question) => {
        if (question.id !== action.payload.id) {
          return question
        }

        return action.payload
      })
    case DELETE:
      return state.filter(question => question.id !== action.payload.id)
    default:
      return state
  }
}
```

mới case là `MERGE` thì trông code như khi vừa rút cái tai nghe để trong túi quần ra vậy. Sau đây là một vài cách tối ưu code reducer
## Dùng thư viện ImmutableJS
Khi dùng thư viện này thì code sẽ ngắn gọn hơn ở case `MERGE`
```javascript
case MERGE:
  const questionIndex = state.findIndex(question => question.get('id') === action.payload.id)
  if (questionIndex === -1) {
    return state.push(action.payload)
  }
  return state.update(questionIndex, () => action.payload)
  }
}
```
## Lưu dưới dạng Object thay vì array
Cách mình thích nhất vẫn là thay vì lưu `question` dưới dạng array thì sẽ lưu dưới dạng object kiểu 
```javascript
{
    1: {id: 1, content: 'abcd'},
    ...
}
```
Cách này cũng có hơi bất cập tí là bạn phải transform data lúc nhận từ server về dạng object. Nhưng Khi dùng kiểu này kết hợp với thư viện `redux-actions` thì file reducer của mình trông rất gọn, chỉ còn từng này code. Rất là ngắn gọn
```javascript
const questions = handleActions({
  [SET]: (state, { payload }) => payload,
  [MERGE]: (state, { payload }) => ({
    ...state,
    [payload.id]: payload,
  }),
  [DELETE]: (state, { payload }) => {
    const { [payload.toString()]: question, ...newState } = state

    return newState
  },
}, initialState)
```
Trên đây là một vài kinh nghiệm nhỏ của mình về `reducer` trong redux. Hi vọng sẽ hữu ích với bạn. xD