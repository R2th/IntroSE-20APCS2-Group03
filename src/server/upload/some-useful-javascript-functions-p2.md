Như [Phần trước](https://viblo.asia/p/4-useful-javascript-function-eW65GJvYlDO) mình đã đề cập đến 4 functions mình cho là khá hữu dụng trong javascript. Trong bài này mình sẽ tiếp tục đưa ra một số functions nữa.

## 1. Poll

Đôi khi bạn không thể kết nối với một sự kiện để biểu thị trạng thái mong muốn - nếu sự kiện không tồn tại, bạn cần kiểm tra trạng thái mong muốn của mình trong một khoảng thời gian. 

```
// The polling function
function poll(fn, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    var checkCondition = function(resolve, reject) {
        // If the condition is met, we're done! 
        var result = fn();
        if(result) {
            resolve(result);
        }
        // If the condition isn't met but the timeout hasn't elapsed, go again
        else if (Number(new Date()) < endTime) {
            setTimeout(checkCondition, interval, resolve, reject);
        }
        // Didn't match and too much time, reject!
        else {
            reject(new Error('timed out for ' + fn + ': ' + arguments));
        }
    };

    return new Promise(checkCondition);
}

// Usage:  ensure element is visible
poll(function() {
	return document.getElementById('lightbox').offsetWidth > 0;
}, 2000, 150).then(function() {
    // Polling done, now do something else!
}).catch(function() {
    // Polling timed out, handle the error!
});
```

Polling từ lâu đã hữu ích trên web và sẽ tiếp tục có ích trong tương lai!

## 2. Once

Đôi khi bạn muốn một chức năng nhất định chỉ xảy ra một lần, tương tự như cách bạn sử dụng sự kiện tải. Mã này cung cấp cho bạn chức năng đã nói tương tự như hàm **once** của Lodash.

```
function once(fn, context) { 
	var result;

	return function() { 
		if(fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	};
}

// Usage
var canOnlyFireOnce = once(function() {
	console.log('Fired!');
});

canOnlyFireOnce(); // "Fired!"
canOnlyFireOnce(); // 
```

Tiếp theo sẽ là 1 số functions trong React, React Native

## 3. usePrevious

Khi không còn có thể componentWillReceiveProps với các function component, đôi khi chúng ta muốn lưu giá trị trước đó của props truyền vào, có thế hàm dưới đây sẽ hữu ích:

```
const usePrevious = <Type>(value: Type) => {
    const ref = useRef<Type>();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};
```

## 4. useWhyDidYouUpdate

Hook này sẽ giúp chúng ta nhìn thấy sự thay đổi của props khiến cho 1 component re-render. 

```
function useWhyDidYouUpdate(name, props) {
   // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
```

## 5. componentDidMount & componentWillUnMount

- ComponentDidMount

```
useEffect(() => {
        // TODO
}, []);
```

- ComponentWillUnMount

```
useEffect(() => {
    return () => {
        // TODO    
    }
}, []);
```
Thoạt nhìn thì trông có vẻ giống nhau nhưng trên thực tế, sự khác biệt duy nhất nằm ở việc return ra một function trong useEffect. Việc này sẽ khiến cho function được trả về sẽ được gọi chỉ khi component được loại bỏ khỏi DOM. Chúng ta hoàn toàn có thể combine chúng lại thành 1.

```
useEffect(() => {
        // TODO when componentDidMount
        return () => {
        // TODO when componentWillUnMount    
    }
}, []);
```