## Giới thiệu
Khi làm các dự án frontend, thỉnh thoảng chúng ta sẽ gặp một vài task liên quan đến encrypt / decrypt. Như là encrypt / decrypt một query string chẳng hạn. Trong trường hợp này chúng ta có thể sử dụng các thư viện có sẵn như CryptoJS, forge, sjcl. Mình search thì ra một list như sau:

Tham khảo:
+ JavaScript Crypto Libraries: https://gist.github.com/jo/861941
+ Benchmarks một số thư viện: http://dominictarr.github.io/crypto-bench/ 

Trong list đó có một cái tên đáng chú ý là [WebCryptoAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API). Theo mdn thì khuyên chúng ta nên dùng api mới hơn là [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto). API này là native mọi người nhé, và chỉ hỗ trợ đối với các website có HTTPS. OK, cùng tìm hiểu thôi, go go!!

Note: bài viết chỉ mang tính chất tham khảo để sau này research tiếp :D 

## Nên dùng API này hay dùng các thư viện khác ?
Theo https://webkit.org/blog/7790/update-on-web-cryptography/ (được viết vào nằm 2017), trước khi WebCryptoAPI (hay SubtleCrypto) ra đời thì đã có  một vài thư viện về crypto này. Tuy nhiên người ta vẫn tạo ra library này và thêm vào Native APIs vì lý do chính đó là performance và bảo mật. Mọi người có thể tham khảo thêm ở link bài viết trên nha. Có một số so sánh về performance đều cũng mấy năm trước rồi, coi cho vui thôi :v 

Theo mình thì cái nào OK thì dùng thôi. API này cũng chỉ hỗ trợ một vài thuật toán cơ bản, với cú pháp nó cũng hơi lằn nhằn. Mọi người cân nhắc nhé :v 

## Browser compatibility
![](https://images.viblo.asia/7adbbd96-2722-4662-8b17-d8341eddf1b0.png)
## Các methods và thuật toán hỗ trợ 
![](https://images.viblo.asia/1137a25a-dd64-4976-bffe-03267d6ccb69.png)

Tham khảo: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto

Hơi nhiều methods, mọi người tham khảo đây nhé :D
## Ví dụ 

### Symmetric encrypt / decrypt
Tham khảo: https://dev.to/halan/4-ways-of-symmetric-cryptography-and-javascript-how-to-aes-with-javascript-3o1b
+ Encrypt
```js
const encoder = new TextEncoder();

const toBase64 = buffer =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)));

const PBKDF2 = async (
  password, salt, iterations,
  length, hash, algorithm =  'AES-CBC') => {

  keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    {name: 'PBKDF2'},
    false,
    ['deriveKey']
  );


  return await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode(salt),
        iterations,
        hash
      },
      keyMaterial,
      { name: algorithm, length },
      false, // we don't need to export our key!!!
      ['encrypt', 'decrypt']
    );
}


const salt = window.crypto.getRandomValues(new Uint8Array(16));
const iv = window.crypto.getRandomValues(new Uint8Array(16));
const plain_text = encoder.encode("That is our super secret text");
const key = await PBKDF2('my password', salt, 100000, 256, 'SHA-256');

const encrypted = await window.crypto.subtle.encrypt(
  {name: "AES-CBC", iv },
  key,
  plain_text
);

console.log({
  salt: toBase64(salt),
  iv: toBase64(iv),
  encrypted: toBase64(encrypted),
  concatennated: toBase64([
    ...salt,
    ...iv,
    ...new Uint8Array(encrypted)
  ])
});

/*

{ salt: "g9cGh/FKtMV1LhnGvii6lA==",
  iv: "Gi+RmKEzDwKoeDBHuHrjPQ==",
  encrypted: "uRl6jYcwHazrVI+omj18UEz/aWsdbKMs8GxQKAkD9Qk=",
  concatennated:

"g9cGh/FKtMV1LhnGvii6lBovkZihMw8CqHgwR7h64z25GXqNhzAdrOtUj6iaPXxQTP9pax1soyzwbFAoCQP1CQ=="}

*/
```

+ Decrypt
```js
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const fromBase64 = buffer =>
  Uint8Array.from(atob(buffer), c => c.charCodeAt(0));

const PBKDF2 = async (
  password, salt, iterations,
  length, hash, algorithm =  'AES-CBC') => {

  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    {name: 'PBKDF2'},
    false,
    ['deriveKey']
  );
  return await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations,
      hash
    },
    keyMaterial,
    { name: algorithm, length },
    false, // we don't need to export our key!!!
    ['encrypt', 'decrypt']
  );
};


const salt_len = iv_len = 16;

const encrypted = fromBase64('g9cGh/FKtMV1LhnGvii6lBovkZihMw8CqHgwR7h64z25GXqNhzAdrOtUj6iaPXxQTP9pax1soyzwbFAoCQP1CQ==');

const salt = encrypted.slice(0, salt_len);
const iv = encrypted.slice(0+salt_len, salt_len+iv_len);
const key = await PBKDF2('my password', salt, 100000, 256, 'SHA-256');

const decrypted = await window.crypto.subtle.decrypt(
  { name: "AES-CBC", iv },
  key,
  encrypted.slice(salt_len + iv_len)
);
console.log(decoder.decode(decrypted));
```

### Asymmetric encrypt / decrypt 
Tham khảo: https://levelup.gitconnected.com/introducing-the-javascript-window-object-cryptography-7316d60fd1ef
```js
const enc = new TextEncoder();
const dec = new TextDecoder();
const keyPair = window.crypto.subtle.generateKey({
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
  },
  true,
  ["encrypt", "decrypt"]
);
const encodedMessage = enc.encode('hello');
(async () => {
  const {
    privateKey,
    publicKey
  } = await keyPair;
  const encryptedText = await window.crypto.subtle.encrypt({
      name: "RSA-OAEP"
    },
    publicKey,
    encodedMessage
  )
  console.log(encryptedText);
  const decryptedText = await window.crypto.subtle.decrypt({
      name: "RSA-OAEP"
    },
    privateKey,
    encryptedText
  )
  console.log(decryptedText);
  console.log(dec.decode(decryptedText)); // hello
})()
```

### Asymmetric sign / verify
Tham khảo: https://levelup.gitconnected.com/introducing-the-javascript-window-object-cryptography-7316d60fd1ef
```js
const enc = new TextEncoder();
const encodedMessage = enc.encode('hello');
const keyPair = window.crypto.subtle.generateKey({
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
  },
  true,
  ["sign", "verify"]
);
(async () => {
  const {
    privateKey,
    publicKey
  } = await keyPair;
  const signature = await window.crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    encodedMessage
  );
  const signatureValid = await window.crypto.subtle.verify("RSASSA-PKCS1-v1_5", publicKey, signature, encodedMessage);
  console.log(signatureValid); // true
})()
```

## Lời kết 
OK, vậy thôi. Mình cũng chỉ mới xem qua mấy đoạn code, lúc nào dùng đến thì lại xem tiếp. Hy vọng sẽ giúp ích cho mọi người trong các dự án sắp tới. Chúc mọi người thành công <3