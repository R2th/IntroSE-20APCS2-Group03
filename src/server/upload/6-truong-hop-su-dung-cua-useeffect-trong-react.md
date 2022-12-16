Hello anh em, chắc khi làm việc với ReactJs thì chúng ta cũng đã làm quen với việc sử dụng các hooks của nó rồi phải không, vậy thì hôm nay mình sẽ cùng anh em biết và đã biết tìm hiểu lại một chút về thằng hook **useEffect()** nhé.

**useEffect()** sinh ra mục đích để quản lý vòng đời của của một component và nó phục vụ chúng ta sử dụng trong function component thay vì các lifecycle như trước đây trong class component (về cơ bản là giống nhau). **useEffect()** lắng nghe các thay đổi của biến và state trong array phụ thuộc, khi giá trị của chúng thay đổi thì phần thân trong useEffect() sẽ được thực thi.

**return** trong hook này được sử dụng để clean các methods đã chạy. Lần đầu thiên hook này được gọi thì phần thân của nó sẽ được đánh giá đầu tiên. Các lần tiếp theo và tiếp theo nữa các câu lệnh return trả về sẽ được đánh giá đầu tiên và sau đó mới là phân thân chính của hook. Điều này đặc biệt có ích trong việc clean code đã chạy trước khi chạy lại, ngăn chặn việc rò rỉ bộ nhớ.

Có một điều thú vị là khi chúng ta sử dụng các non-primittive data types Javascript ( arrays, objects, functions ) làm phụ thuộc, với các primitive value như integers và strings, chúng ta có thể difine một biến từ một biến khác :

```javascript
const a = 1
const b = 1
a === b
// Output: true
```

Nhưng đối với các giá trị non-primittive, ví dụ như object thì nó lại khác :

```javascript
{} === {}
// Output: false
```

Vì vậy chúng ta cần phải rất cẩn thận trong việc sử dụng các object làm đối tượng phụ thuộc, bởi vì bằng mắt thường nhìn thì chúng ta có thể thấy rằng object này không thay đổi nhưng thật ra là không phải vậy. Thay vì sửa dụng các object, chúng ta có thể sử dụng các properties làm giá trị phụ thuộc, chẳng hạn :

```javascript
useEffect(() => {
        // đoạn code sử dụng properties của anh em
    }, [myObject.property1, myObject.property2]);
```

Sơ sơ là như vậy, giờ chúng ta cùng đi vào các trường hợp sử dụng của **useEffect()** nhé :

* Chạy **một lần** khi mount : tìm nạp data API.
* Chạy khi **thay đổi state** : thường thì khi validate input đầu vào.
* Chạy khi **thay đổi state** : filtering trực tiếp.
* Chạy khi **thay đổi state** : trigger animation trên giá trị của array  mới.
* Chạy khi **props thay đổi** : update lại list đã fetched API khi data update.
* Chạy khi **props thay đổi** : updateing data API để cập nhật BTC

# Chạy **một lần** khi mount : tìm nạp data API.

Khi chúng ta muốn thực hiện hành động này một lần, đặc biệt là khi sử dụng loads hoặc mounts, có thể sử dụng useEffect() để thực hiện. Trong trường hợp cụ thể dưới đây, chúng ta gọi fetch() yêu cầu GET khi ứng dụng được mount, sử dụng một array rỗng làm giá trị phụ thuộc:

```javascript
import { useState, useEffect } from "react";

const UseCaseFetchApi = props => {
  
    const [bio, setBio] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api/people/1/');
            const data = await response.json();
            console.log(data);
            setBio(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <hr />
            <h2>useEffect use case</h2>
            <h3>Running once on mount: fetch API data</h3>
            <p>bio:</p>
            <pre>{JSON.stringify(bio, null, '\t')}</pre>
        </>
    );
};

export default UseCaseFetchApi;
```

# Chạy khi **thay đổi state** : thường thì khi validate input đầu vào.

Xác thực đầu vào cũng là một trường hợp khá hay. Trong khi value đầu vào lưu ở useState, việc xác thực input đầu vào mỗi khi thay đổi, đưa ra phản hồi ngay lập tức cho người dùng.

Chúng ta có thể thêm một hàm setTimeout() để kiểm tra input sau một thời gian, để trì hoãn việc kiểm tra mỗi lần gõ phím của người dùng, chúng ta sẽ cần xóa bộ đếm thời gian đó bằng cách sử dụng clearTimeout() hàm trong return của **useEffect()** :

```javascript
import { useEffect, useState } from "react";

const UseCaseInputValidation = props => {
    const [input, setInput] = useState('');
    const [isValid, setIsValid] = useState(false);

    const inputHandler = e => {
        setInput(e.target.value);
    };

    useEffect(() => {
        if (input.length < 5 || /\d/.test(input)) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [input]);

    return (
        <>
            <hr />
            <h2>useEffect use case</h2>
            <h3>Running on state change: validating input field</h3>
            <form>
                <label htmlFor="input">Write something (more than 5 non numerical characters is a valid input)</label><br />
                <input type="text" id="input" autoComplete="off" onChange={inputHandler} style={{ height: '1.5rem', width: '20rem', marginTop: '1rem' }} />
            </form>
            <p><span style={isValid ? { backgroundColor: 'lightgreen', padding: '.1px' } : { backgroundColor: 'lightpink', padding: '.1px' }}>{isValid ? 'Valid input' : 'Input not valid'}</span></p>
        </>
    );
};

export default UseCaseInputValidation;
```

# Chạy khi **thay đổi state** : filtering trực tiếp.

Chúng ta có thể sử dụng **useEffect()** để lọc một mảng bằng cách nhập các chữ cái của một phần tử đầu vào. Để làm như vậy, chúng ta sẽ cần sử dụng một trạng thái để lưu dữ liệu đầu vào và việc triển khai bộ lọc bên trong **useEffect()**  sẽ được kích hoạt khi đầu vào thay đổi, nhờ vào các **useEffect()** phụ thuộc.

```javascript
import { useEffect, useState } from "react";

const array = [
    { key: '1', type: 'planet', value: 'Tatooine' },
    { key: '2', type: 'planet', value: 'Alderaan' },
    { key: '3', type: 'starship', value: 'Death Star' },
    { key: '4', type: 'starship', value: 'CR90 corvette' },
    { key: '5', type: 'starship', value: 'Star Destroyer' },
    { key: '6', type: 'person', value: 'Luke Skywalker' },
    { key: '7', type: 'person', value: 'Darth Vader' },
    { key: '8', type: 'person', value: 'Leia Organa' },
];

const UseCaseLiveFilter = props => {
    const [inputValue, setInputValue] = useState('');
    const [inputType, setInputType] = useState('');
    const [filteredArray, setFilteredArray] = useState(array);

    const inputValueHandler = e => {
        setInputValue(e.target.value);
    };

    const inputTypeHandler = e => {
        setInputType(e.target.value);
    };

    useEffect(() => {
        setFilteredArray((_) => {
            const newArray = array.filter(item => item.value.includes(inputValue)).filter(item => item.type.includes(inputType));
            return newArray;
        });
    }, [inputValue, inputType]);

    // Prepare array to be rendered
    const listItems = filteredArray.map((item) =>
        <>
            <tr>
                <td style={{ border: '1px solid lightgray', padding: '0 1rem' }}>{item.type}</td>
                <td style={{ border: '1px solid lightgray', padding: '0 1rem' }} > {item.value}</td>
            </tr >
        </>
    );

    return (
        <>
            <hr />
            <h2>useEffect use case</h2>
            <h3>Running on state change: live filtering</h3>
            <form style={{ maxWidth: '23rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <label htmlFor="input-type">Filter by <b>type</b></label><br />
                    <input type="text" id="input-type" autoComplete="off" onChange={inputTypeHandler} style={{ height: '1.5rem', width: '10rem', marginTop: '1rem' }} />
                </div>
                <div>
                    <label htmlFor="input-value">Filter by <b>value</b></label><br />
                    <input type="text" id="input-value" autoComplete="off" onChange={inputValueHandler} style={{ height: '1.5rem', width: '10rem', marginTop: '1rem' }} />
                </div>
            </form>
            <br />
            <table style={{ width: '20rem', border: '1px solid gray', padding: '0 1rem' }}>
                <tr>
                    <th>Type</th>
                    <th>Value</th>
                </tr>
                {listItems}
            </table>
        </>
    );
};

export default UseCaseLiveFilter;
```

#  Chạy khi **thay đổi state** : trigger animation trên giá trị của array  mới.

Chúng ta có thể sử dụng **useEffect()** để kích hoạt animation trên giỏ hàng khi thêm sản phẩm mới vào đó. Trong trường hợp này, chúng ta sẽ cần mộtstate để xử lý các mặt hàng trong giỏ hàng và một state khác để xử lý khi kích hoạt animation.

```javascript
import { useState, useEffect } from 'react';
import classes from './UseCaseAnimation.module.css';

const products = [
    'Death Star',
    'CR90 corvette',
    'Millennium Falcon',
    'X-wing fighter',
    'TIE fighter'
];

const UseCaseAnimation = props => {
    const [cart, setCart] = useState([]);
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    // Add item to the cart (array)
    const clickHandler = e => {
        e.preventDefault();
        setCart(prevCart => {
            const newCart = [...prevCart];
            newCart.push(e.target.value);
            return newCart;
        });
    };

    // Clear the cart (array)
    const clearHandler = e => {
        e.preventDefault();
        setCart([]);
    };

    // Trigger cart animation
    useEffect(() => {
        setTriggerAnimation(true);

        const timer = setTimeout(() => {
            setTriggerAnimation(false);
        }, 900); // The duration of the animation defined in the CSS file

        // Clear the timer before setting a new one
        return () => {
            clearTimeout(timer);
        };
    }, [cart]);

    const cartClasses = triggerAnimation ? `${classes['jello-horizontal']} ${classes.cart}` : classes.cart;

    const itemsOnSale = products.map(itemOnSale => {
        return <li><form><span className={classes.item}>{itemOnSale}  <button onClick={clickHandler} value={`"${itemOnSale}"`}>Add to cart</button></span></form></li >;
    });

    const cartItems = cart.map(item => {
        return <li>{item}</li>;
    });

    return (
        <>
            <hr />
            <h2>useEffect use case</h2>
            <h3>Running on state change: trigger animation on new array value</h3>
            <h4 style={{ color: 'blue' }}>Starship Marketplace</h4>
            <ul>
                {itemsOnSale}
            </ul>
            <div className={cartClasses}><span>Cart</span></div>
            <div>
                <p>Elements in cart:</p>
                <ul>
                    {cartItems}
                </ul>
            </div>
            <form><button className={classes.margin} onClick={clearHandler} value="clear">Clear cart</button></form>
        </>
    );
};

export default UseCaseAnimation;
```

# Chạy khi **props thay đổi** : update lại list đã fetched API khi data update.

Trong trường hợp sử dụng này, chúng ta muốn kích hoạt cập nhật state khi gọi fetch(). Chúng ta đang gửi dữ liệu đã tìm nạp đến một component con và bất cứ khi nào dữ liệu đó được thay đổi, component con sẽ xử lý lại nó.

```javascript
import { useState, useEffect, useCallback } from "react";

const BaconParagraphs = props => {
    const [baconParagraphText, setBaconParagraphText] = useState([]);

    useEffect(() => {
        setBaconParagraphText(props.chopBacon.map(piece => <p key={Math.random()}>{piece}</p>));
    }, [props.chopBacon]); // Props

    return (
        <>
            <p>Number of paragraphs: {baconParagraphText.length}</p>
            {baconParagraphText}
        </>
    );
};

const UseCaseUpdateFetch = () => {
    const [bacon, setBacon] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async e => {
        e.preventDefault();

        setIsLoading(true);
        const response = await fetch(`https://baconipsum.com/api/?type=all-meat&paras=${e.target.paragraphs.value}&start-with-lorem=1`);
        const data = await response.json();
        setIsLoading(false);
        setBacon(data);
    };

    return (
        <>
            <hr />
            <h2>useEffect use case</h2>
            <h3>Running on props change: update paragraph list on fetched API data update</h3>
            <form onSubmit={submitHandler}>
                <label htmlFor="paragraphs" style={{ display: "block", marginBottom: "1rem" }}>How many paragraphs of "Bacon ipsum" do you want?</label>
                <select id="paragraphs" name="paragraphs">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <input type="submit" value="Show me the bacon!" style={{ marginLeft: "1rem" }} /> {isLoading && <span>Getting paragraphs... 🐷</span>}
            </form>
            <BaconParagraphs chopBacon={bacon} />
        </>
    );
};

export default UseCaseUpdateFetch;
```

# Chạy khi **props thay đổi** : updateing data API để cập nhật BTC

Trong ví dụ này, **useEffect()** được sử dụng để tìm nạp dữ liệu mới từ một API sau mỗi 3 giây. Thành phần con useEffect() nhận thời gian là phụ thuộc và mỗi khi phụ thuộc đó thay đổi, một thành phần mới fetch() được kích hoạt. Bằng cách này, chúng ta có thể có tỷ giá hối đoái BTC cập nhật trong ứng dụng của mình.

```javascript
import { useState, useEffect } from "react";
import classes from './UseCaseUpdateApi.module.css';

// SECTION - Functions

const getCurrentTime = () => {
    const now = new Date();
    const time = now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);
    return time;
};

// SECTION - Components

const ExchangeRate = props => {
    const [exchangeRate, setExchangeRate] = useState(0);
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const getExchangeRate = async () => {
            const response = await fetch("api của anh em");
            const data = await response.json();
            console.log(data.find(item => item.currency === "BTC").rate);
            setExchangeRate(data.find(item => item.currency === "BTC").rate);
        };
        getExchangeRate();

        // Triggering animation
        setIsAnimated(true);
        const classTimer = setTimeout(() => {
            setIsAnimated(false);
        }, 1500);

        // Clear the timer before setting a new one
        return () => {
            clearTimeout(classTimer);
            setExchangeRate(exchangeRate); 
        };
    }, [props.onTime]);

    const priceClasses = isAnimated ? `${classes.price} ${classes.heartbeat}` : `${classes.price}`;

    return <div className={priceClasses}>USD <b>{exchangeRate}</b></div>;
};

const UseCaseUpdateApi = props => {
    const [time, setTime] = useState(getCurrentTime());

    // Trigger the update interval on startup (mount)
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getCurrentTime());
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    console.log(time);

    return (
        <>
            <hr />
            <h2>useEffect use case</h2>
            <h3>Running on props change: updating fetched API data to get updated BTC price</h3>
            <span>Last updated: {time} (polling every 3 seconds)</span><ExchangeRate onTime={time} />
        </>
    );
};

export default UseCaseUpdateApi;
```

# Kết bài

Vậy là bài viết đến đây là kết thúc rồi.

Mong là nó sẽ giúp ich cho anh em nhiều hơn

Nếu thấy hay hãy **like**, **share** và **upvote** cho mình nhé.