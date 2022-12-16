# "Tự nhiên tui thấy hiện tượng lạ”

Khi nhập liệu một chuỗi các kí tự vào thẻ input, thông thường chúng ta nhập thế nào thì hiển thị thế ấy, không làm phép biến đổi gì cả. Ví dụ nhập "abc" bằng bàn phím tiếng Anh thì hiển thị "abc". Nếu là hạng mục nhập số thì đôi khi khách hàng sẽ yêu cầu là format số thành dạng số có dấu phẩy, hoặc là dạng tiền tệ. Ví dụ nhập "1234" thì hiển thị "1,234" hay "1,234 ¥". Mọi chuyện rất đơn giản với bàn phím tiếng Anh. Tôi chỉ cần lưu vào state giá trị gốc, và set value cho ô input giá trị đã được format.

```jsx
const [value, setValue] = useState("")

const formatter = (str) => str ? str.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""

const parser = (str) => str.replaceAll(",", "")

const convertFullwidthToHalfwidth = (str) => {
	return str.replace(/[！-～]/g, (r) => {
    return String.fromCharCode(r.charCodeAt(0) - 0xFEE0)
  })
}

return (
	<input
		value={formatter(value)}
		onChange={(e) => setValue(parser(e.target.value))}
	/>
)
```

Nhưng khi tôi chuyển bàn phím sang bàn phím tiếng Nhật thì bắt đầu nhiều chuyện lạ xảy ra.

Chuyện lạ 1:

Cứ khi nào tôi gõ 4 chữ số trở lên là bị duplicate chữ số đầu. Ví dụ:

1234 → “11,234”

123456 → “1,123,456”

Chuyện lạ 2:

Đấy mới chỉ là tôi nhập số half-width. Nếu nhập số full-width thì chắc chắn hàm formatter trên của tôi không hoạt động (vì regex trên chỉ check với số half-width). Giả sử tôi thêm hàm chuyển đổi số full-width sang half-width và chen vào trước khi truyền value cho hàm formatter, thì hiện tượng còn diễn biến khó lường hơn, lúc bị duplicate chữ số, lúc thì không, mà quy luật không còn giống như trước nữa.

123 → “1,233”

1234567890 → “123,345,678,900”

Chuyện lạ 3:

Nếu tôi đang nhập dở chừng mà click out ra ngoài, có lúc bị mất chữ số đang nhập, có lúc thì fill vào mỗi chữ số đầu.

Chuyện lạ 4:

Tôi muốn chen thêm 1 chữ số vào giữa. Nhưng quái lạ, chữ số tôi vừa nhập lại bay xuống cuối chuỗi và ăn mất 1 chữ số cuối!?

Vậy vấn đề có thực sự nằm ở bàn phím tiếng Nhật, hay ở trang web của chúng ta? Nếu như không thể can thiệp vào bàn phím tiếng Nhật, thì có thể khắc phục bằng JS hay không?

À, trước khi vào đề, tôi nên giới thiệu một chút. “Bàn phím tiếng Nhật” mà tôi đang nhắc đến là bàn phím của ngôn ngữ Nhật mà chúng ta cài đặt trong máy tính. Nếu bạn chưa biết cài như nào thì: Settings > Time & language > Language & region > chọn Add a language, tìm “Japanese” rồi cài đặt. Đối với người dùng Nhật, họ buộc phải dùng bàn phím này để gõ được các chữ kana, kanji hay các kí tự khác trong tiếng Nhật.

# IME

IME (Input Method Editor) là một chương trình dùng để chuyển đổi các kí tự tiếng Anh sang các kí tự của ngôn ngữ khác, ví dụ như tiếng Nhật, tiếng Hàn, tiếng Trung, tiếng Ả Rập, kể cả tiếng Việt nếu dùng IME để gõ tiếng Việt thay cho Unikey.

IME là chương trình thuộc về hệ thống, không thuộc về trình duyệt.

Cách thức hoạt động của IME đó là giữ tạm thời các kí tự nhập trong một session, chuyển đổi chúng thành các kí tự ở ngôn ngữ mong muốn, sau cùng trả các kí tự đã chuyển đổi về cho ô input.

![https://www.w3.org/TR/ime-api/images/image10.png](https://www.w3.org/TR/ime-api/images/image10.png)

Một IME gồm có 2 module chính: composer và converter.

- Composer:
    
    Là module giúp phân chia các thông tin đầu vào thành các tổ hợp và mapping tổ hợp với các kí tự phù hợp.
    
    Thông tin đầu vào chia làm 2 loại: âm vị và tự vị. Do đó cũng có 2 loại composer để xử lý riêng cho từng loại thông tin này:
    
    - Phonetic composer: Các kí tự ASCII đại diện cho âm vị. Phonetic composer tổ hợp các âm vị và mapping với các kí tự non-ASCII tương ứng. Ví dụ, khi tôi gõ “otoko”, composer sẽ mapping với kí tự “男”.
    - Radical composer: Phonetic radical là tự vị, là thành phần tạo nên một chữ. Ví dụ, chữ “男” (nam) tạo bởi 2 tự vị là “田” (điền) và “カ” (lực). Radical composer tổ hợp các tự vị thành chữ.
- Converter:
    
    Trong thực tế, có rất nhiều từ đồng âm. Cùng một âm “ka” nhưng cho ra rất nhiều kết quả như “か”, “カ”, “火”, “科”, ... Converter sẽ gợi ý những kết quả phù hợp nhất với ngữ cảnh, dựa vào từ điển. Đôi khi người ta cho thêm tính năng gợi ý những từ được sử dụng thường xuyên nhất.
    

# Composition events

Quá trình IME chuyển hóa các thông tin đầu vào thành các kí tự được gọi là composition. Trong JS, có 3 sự kiện chính của composition:

- [compositionstart](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event)
- [compositionupdate](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event)
- [compositionend](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event)

Trong React, chúng ta có 3 hàm bắt sự kiện tương ứng với 3 sự kiện trên:

- `onCompositionStart`
- `onCompositionUpdate`
- `onCompositionEnd`

Cái tên đã đủ nói lên sự kiện đó được fire lên khi nào. Cách dùng cũng đơn giản. Giá trị nằm trong trường “data” của sự kiện.

```jsx
return (
	<input
		onCompositionStart={(e) => console.log("onCompositionStart", e.data)}
		onCompositionUpdate={(e) => console.log("onCompositionUpdate", e.data)}
		onCompositionEnd={(e) => console.log("onCompositionEnd", e.data)}
	/>
)
```

Các sự kiện composition được fire lên trước cả sự kiện onchange. Tức là composition phải được hoàn thành (hoặc bị hủy) thì mới bắt được sự kiện onchange.

# Tại sao các hiện tượng lạ ở trên lại xảy ra?

Thú thật tôi vẫn chưa tìm được câu trả lời đích xác cho vấn đề này. Tạm giả thiết là việc thay đổi giá trị của thẻ input đồng thời với quá trình composition đang diễn ra sẽ làm sai lệch quá trình chuyển hóa của IME. Nếu bạn đặt debug vào hàm `onChange`, bạn sẽ thấy sự kiện onchange được fire tới 3 lần, mỗi lần trả về giá trị khác nhau, rất khó nắm bắt quy luật.

Trong quá trình google search, tôi đã tìm được một hướng giải quyết rất giống với ý tưởng của tôi, đó là hãy lờ đi sự kiện onchange khi composition diễn ra, chỉ bắt sự kiện onchange khi composition đã hoàn thành hoặc bị hủy.

# Cách giải quyết

## Cách 1: dùng thuộc tính `type=”tel”` cho thẻ `input`

Khi người dùng focus vào hạng mục có thuộc tính `type=”tel”`, bàn phím sẽ tự động chuyển sang chế độ nhập Romaji, đảm bảo rằng chuỗi số nhập vào là số half-width giống như số trong bàn phím tiếng Anh. Đây là một cách hay và đơn giản. Tuy nhiên việc tự động chuyển đổi chế độ nhập chỉ có hiệu quả ngay sau khi focus vào hạng mục. Nó không ngăn chặn người dùng cố tình chuyển chế độ nhập (ấn tổ hợp phím Alt + `), hoặc paste vào một chuỗi chưa được convert.

```html
<input type="tel" .... />
```

## Cách 2: bắt sự kiện `onfocus`, `onblur` thay cho `onchange` khi diễn ra composition

Dưới đây là lời giải của cá nhân tôi. Nó chưa hoàn toàn trọn vẹn (có thể có bug không chừng 🤣), nhưng xin được chia sẻ với tất cả mọi người để cùng nhau nghiên cứu.

```jsx
const formatter = (str) => str ? str.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""

const parser = (str) => str.replaceAll(",", "")

const convertFullwidthToHalfwidth = (str) => {
	return str.replace(/[！-～]/g, (r) => {
    return String.fromCharCode(r.charCodeAt(0) - 0xFEE0)
  })
}

const MODE = {
	INTERNAL: 0,
	EXTERNAL: 1,
}

const InputNumberCustom = (props) => {
	const [value, setValue] = useState("")
	const isComposing = useRef(false)
	const inputRef = useRef()
	const mode = useRef(MODE.EXTERNAL)

	useEffect(() => {
    if (mode.current === MODE.EXTERNAL) {
      setValue(formatter(props.value))
    }
  }, [props.value])

	const prepareValue = (str) => {
		let val = parser(str)
		val = convertFullwidthToHalfwidth(val)
		return val
	}

	const handleOnFocus = () => {
		mode.current = MODE.INTERNAL
	}

	const handleOnBlur = (e) => {
		if (isComposing.current) {
			inputRef?.current?.blur()
		}
		isComposing.current = false
		mode.current = MODE.EXTERNAL
		const val = prepareValue(e.target.value)
		setValue(formatter(val))
		props.onChange(val)
	}

	const handleOnChange = (e) => {
		if (mode.current === MODE.INTERNAL && !isComposing.current) {
			const val = prepareValue(e.target.value)
			setValue(formatter(val))
			props.onChange(val)
		}
	}

	return (
		<input
			{...props}
			ref={inputRef}
			value={value}
			onCompositionStart={() => isComposing.current = true}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			onChange={handleOnChange}
		/>
	)
}

export default InputNumberCustom
```

Giải thích một chút:

- Biến `isComposing` để nhận biết có phải đang diễn ra composition hay không. Nếu đúng thì đọc giá trị từ sự kiện onblur, nếu không thì đọc từ sự kiện onchange.
- Ở đây tôi đặt thêm `mode` để phân biệt trường hợp value được truyền từ bên ngoài vào với trường hợp value thay đổi nội sinh khi người dùng nhập vào ô input. Lí do là vì khi tôi gọi hàm `props.onChange` để đưa giá trị ra ngoài, giá trị đó lập tức quay trở lại bằng con đường `props.value`, gây ra vòng lặp vô hạn.
- Trong hàm `handleOnBlur` tôi thêm lệnh `inputRef.current.blur()`. Chắc các bạn sẽ thắc mắc đã fire sự kiện onblur rồi sao còn ép phần tử input phải blur thêm lần nữa. Cái này để chặn 1 bug khỉ ho mà tester bắt tôi 🤣. Khi người dùng click vào nút search bên trong cửa sổ gợi ý (biểu tượng “kính lúp” sau mỗi kết quả gợi ý trong cửa sổ gợi ý của IME ấy), trình duyệt sẽ mở cửa sổ mới, composition bị hủy nhưng phần tử input vẫn chưa thoát focus, dẫn đến những giá trị kì lạ vẫn được đẩy vào ô input. Vậy nên tôi chủ động blur ra khỏi hạng mục ngay sau khi fire sự kiện onblur.

# Tham khảo

1. [Input Method Editor API (w3.org)](https://www.w3.org/TR/ime-api/#background)
2. [CompositionEvent - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent)
3. [Composition Events(Chinese, Japanese IME) problem in controlled components(input, textarea) · Issue #8683 · facebook/react · GitHub](https://github.com/facebook/react/issues/8683)