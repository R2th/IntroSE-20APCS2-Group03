Hello xin chào mn lại là mình đây, hôm nay mình xin chia sẻ cho các bạn một vài Tips để giúp code của các bạn trông đẹp, gọn và tối ưu hơn nhé.

Lúc mới nhập môn lập trình mình cũng chỉ biết là code như thế nào chạy là được, không quan tâm code có tối ưu, gọn hay không, và dần sau này khi mình được học tiếp cận sâu hơn thì mình không chỉ quan tâm là code có chạy hay không mà phải đẹp đẽ ngon lành nữa. Nào mình cùng tìm hiểu thôi chứ cũng lòng vòng quá :).

## 1. Returning Early Instead of if…else
Khi viết code các bạn thường rất hay sử dụng if else, nó thật sự rất hữu ích khi ta muốn kiểm tra một điều kiện.
Nhưng if else lồng nhau nó thật sự không được đẹp mắt, khó control, debugger và maintenance

**If else nested**
```javascript
const isBabyPet = (pet, age) => {
  if (pet) {
    if (isPet(pet)) {
      console.log(‘It is a pet!’);
      
      if (age < 1) {
        console.log(‘It is a baby pet!’);
      }
    } else {
      throw new Error(‘Not a pet!’);
    }
  } else {
    throw new Error(‘Error!’);
  }
};
```

Code trên thực sự khó đọc phải không ạ. Sau đây sẽ là một cách viết khác *xinh* hơn rất nhiều nè

```javascript
const isBabyPet = (pet, age) => {
  if (!pet) throw new Error(‘Error!’);
  if (!isPet(pet)) throw new Error(‘Not a pet!’);
  
  console.log(‘It is a pet!’);
  if (age < 1) {
    console.log(‘It is a baby pet!’);
  }
};
```

Bạn có thấy code trên rất gọn, mỗi dòng sẽ có nhiệm vụ là check một điều kiện duy nhất, khi nhìn vào bạn có thể nhận biết được ngay, rất tường minh.

## 2. Using Array.includes
Bạn hãy tự hỏi bản thân có khi nào bạn viết một đoạn code tương tự như bên dưới ?
Mình đoán là có. Lúc trước mình cũng hay dùng như thế này. Mới nhìn thì có vẻ ok đó nhưng nếu bạn cần check nhiều hơn thì sao.

```javascript
const isPet = animal => {
  if (animal === ‘cat’ || animal === ‘dog’) {
    return true;
  }
  
  return false;
};
```

...nhưng khi bạn biết đến **includes**  thì mọi chuyện sẽ khác

```javascript
const isPet = animal => {
  const pets = [‘cat’, ‘dog’, ‘snake’, ‘bird’];
  
  return pets.includes(animal);
};
```

Đẹp rồi phải không ạ, ngoài ra bạn có thể sử dụng indexOf

## 3. Using Default Function Parameters
Thường thường khi bạn thực hiện một chức năng có các tham số và trong chức năng đó bạn có thể sẽ check một điều kiện và set tham số đó bằng một giá trị nào đó ( Khó hiểu vãi ). Thôi thì nhìn ví dụ cho dể:

```javascript
const isBabyPet = (pet, age) => {
  if (!pet) pet = ‘cat’;
  if (!age) age = 1;
  if (age < 1) {
    // Do something
  }
};
```

Thay vào đó bạn có thể set default value cho tham số như thế này.

```javascript
const isBabyPet = (pet = ‘cat’, age = 1) => {
  if (age < 1) {
    console.log(‘baby’);
  }
};
```

## 4. Using Array.every
Giả sử bạn có một bài tập là kiểm tra các giá trị trong một array có đồng thời cùng một giá trị hoặc kiểm tra trong một list sđt đều được verify hay chưa.
Thì cách truyền thống bạn có thể dùng for loop.

```javascript
const phoneNumbers = [
  { tel: '012345671', verified: true },
  { tel: '012345671', verified: true },
  { tel: '012345671',   verified: true },
  { tel: '012345671',  verified: false }
];
const isVerify = (phoneNumbers) => {
  for (let i = 0; i < phoneNumbers.length; i++) {
    if (!phoneNumbers[i].verified) {
      return false;
    }
  }
  return true;
}
console.log(isVerify(phoneNumbers)) // false
```

Bạn có thể viết lại với **every**
Sử dụng every khi  bạn muốn check **nếu tất cả giá trị là đúng với điều kiện**

```javascript
const phoneNumbers = [
  { tel: '012345671', verified: true },
  { tel: '012345671', verified: false },
  { tel: '012345671',   verified: true },
  { tel: '012345671',  verified: false }
];
const isVerify = (phoneNumbers) => {
 return phoneNumbers.every(v => v.verified)
}
console.log(isVerify(phoneNumbers)) // false
```

Nhẹ nhàng dể hiểu :D

## 5. Using Array.some
Lấy ví dụ trên thì **some** ngược lại với **every**, nó sẽ check **nếu ít nhất 1 giá trị là đúng với điều kiện**

```javascript
const phoneNumbers = [
  { tel: '012345671', verified: true },
  { tel: '012345671', verified: false },
  { tel: '012345671',   verified: true },
  { tel: '012345671',  verified: false }
];
const isVerify = (phoneNumbers) => {
 return phoneNumbers.some(v => v.verified)
}
console.log(isVerify(phoneNumbers)) // true
```

## 6. Using Indexing Instead of switch…case
Đã là dân lập trình thì không ai không biết tới **switch...case**, cú pháp này rất hữu ích, tuy nhiên không phải lúc nào sử dụng đều là hợp lý.
Ví dụ trong trường hợp này:
Bạn cần lấy ra một chuỗi các loại vật là 'dog', 'cat' hoặc 'bird'

```javascript
const getBreeds = pet => {
  switch (pet) {
    case ‘dog’:
      return [‘Husky’, ‘Poodle’, ‘Shiba’];
    case ‘cat’:
      return [‘Korat’, ‘Donskoy’];
    case ‘bird’:
      return [‘Parakeets’, ‘Canaries’];
    default:
      return [];
  }
};
let dogBreeds = getBreeds(‘dog’); //[“Husky”, “Poodle”, “Shiba”]
```

Cách viết trên thật sự nhàm chán, cái gì là **case...return lại case...return**. Thay vào đó bạn có thể thay thế bằng cách sử dụng index.

```javascript
const breeds = {
  ‘dog’: [‘Husky’, ‘Poodle’, ‘Shiba’],
  ‘cat’: [‘Korat’, ‘Donskoy’],
  ‘bird’: [‘Parakeets’, ‘Canaries’]
};
const getBreeds = pet => {
  return breeds[pet] || [];
};
let dogBreeds = getBreeds(‘cat’); //[“Korat”, “Donskoy”]
```

**Đến đây cũng đã hết rồi :)**
Cảm ơn các bạn đã ghé thăm, hy vọng các bạn sẽ có thêm cho mình kiến thức thật bổ ích. Bye bye <3