# Giới thiệu
Bài này mình sử dụng  solidity 0.6.12, và Openzeppelin 3.2
Nếu như bạn đã tìm hiểu về chuẩn ERC721, một chuẩn token mà trong đó mỗi tokenId chỉ được sở hữu bởi một người duy nhất, và người ta có thể mint token theo một cách không theo thứ tự Id tăng dần:
```javascript
// Mapping from holder address to their (enumerable) set of owned tokens
mapping (address => EnumerableSet.UintSet) private _holderTokens;
// Enumerable mapping from token ids to their owners
EnumerableMap.UintToAddressMap private _tokenOwners;
```
Vậy làm thế nào để có thể dễ dàng query được các thông tin như: một tokenId nào đấy đang thuộc về ai, một người đang sở hữu bao nhiêu tokenId và đó là những tokenId nào. Ở phiên bản `3.2.0` Openzeppelin đã sử dụng 2 cách lưu trữ `EnumerableSet` để lưu thông tin một address đang sở hữu các tokenId nào và `EnumerableMap` để lưu thông tin tokenId đang được sở hữu bởi address nào

# EnumerableSet
Đầu tiên, chúng ta sẽ tìm hiểu về EnumerableSet.
Cấu trúc chung của một `Set`:
```javascript
struct Set {
        // Storage of set values
        bytes32[] _values;

        // Position of the value in the `values` array, plus 1 because index 0
        // means a value is not in the set.
        mapping (bytes32 => uint256) _indexes;
}
```

Ở đây, các `values` đều nằm ở dạng bytes và lưu vào mảng, bên cạnh đó còn có thông tin vị trí của một `value` xem nó đang nằm ở `index` nào, do đó trong ERC721 nó được sử dụng vào việc lưu trữ xem một address đang nằm giữ những tokenId nào:

```javascript
// Mapping from holder address to their (enumerable) set of owned tokens
mapping (address => EnumerableSet.UintSet) private _holderTokens;
```

Chúng ta sẽ xem qua các `function` get set chính của struct `Set` này.

## Add: Thêm một value vào mảng
```javascript
/**
* @dev Add a value to a set. O(1).
*
* Returns true if the value was added to the set, that is if it was not
* already present.
*/
function _add(Set storage set, bytes32 value) private returns (bool) {
    if (!_contains(set, value)) {
        set._values.push(value);
        // The value is stored at length-1, but we add 1 to all indexes
        // and use 0 as a sentinel value
        set._indexes[value] = set._values.length;
        return true;
    } else {
        return false;
    }
}
```
Khi thêm một `value` và array chỉ đơn giản là kiểm tra `value` đấy đã tồn tại trong array chưa và push nó vào array, tuy nhiên, ở bước lưu lại `index` của `value`, ta lại lưu giá trị `index + 1` nghĩa là một `value` nằm ở index 0 sẽ được lưu là 1 trong mapping `_indexes`. Mục đích là người ta muốn dùng 0 làm lính canh để tiện cho các function sau này.

## Remove: Xóa một value khỏi mảng
```javascript
/**
* @dev Removes a value from a set. O(1).
*
* Returns true if the value was removed from the set, that is if it was
* present.
*/
function _remove(Set storage set, bytes32 value) private returns (bool) {
    // We read and store the value's index to prevent multiple reads from the same storage slot
    uint256 valueIndex = set._indexes[value];

    if (valueIndex != 0) { // Equivalent to contains(set, value)
        // To delete an element from the _values array in O(1), we swap the element to delete with the last one in
        // the array, and then remove the last element (sometimes called as 'swap and pop').
        // This modifies the order of the array, as noted in {at}.

        uint256 toDeleteIndex = valueIndex - 1;
        uint256 lastIndex = set._values.length - 1;

        // When the value to delete is the last one, the swap operation is unnecessary. However, since this occurs
        // so rarely, we still do the swap anyway to avoid the gas cost of adding an 'if' statement.

        bytes32 lastvalue = set._values[lastIndex];

        // Move the last value to the index where the value to delete is
        set._values[toDeleteIndex] = lastvalue;
        // Update the index for the moved value
        set._indexes[lastvalue] = toDeleteIndex + 1; // All indexes are 1-based

        // Delete the slot where the moved value was stored
        set._values.pop();

        // Delete the index for the deleted slot
        delete set._indexes[value];

        return true;
    } else {
        return false;
    }
}
```
Đầu tiên, sẽ kiểm tra xem `value` có tồn tại trong mảng hay không, bằng cách check index của nó có khác 0 hay không (do dùng 0 làm lính canh). Sau đó sẽ đổi chỗ `value` đấy với `lastValue` nằm ở cuối mảng với nhau, pop() phần tử cuối ra khỏi mảng, cập nhật lại giá trị `_indexes[lastValue]` và xóa bỏ giá trị `_indexes[lastValue]`.
## Contains, Length và At
Kiểm tra xem một `value` có tồn tại trong mảng hay không: `_contains`
```javascript
/**
* @dev Returns true if the value is in the set. O(1).
*/
function _contains(Set storage set, bytes32 value) private view returns (bool) {
    return set._indexes[value] != 0;
}
```
 
Kiểm tra số lượng value có trong mảng: `length`, trong ERC721 nó dùng để xem một address đang sở hữu bao nhiêu tokenId
```javascript
/**
* @dev Returns the number of values on the set. O(1).
*/
function _length(Set storage set) private view returns (uint256) {
        return set._values.length;
}
```
Ví dụ một address đang sở hữu 5 tokenId, người ta muốn xem tokenId thứ 3 mà address ấy đang sở hữu là tokenId nào, ta sử dụng hàm `_at`:
```javascript
/**
* @dev Returns the value stored at position `index` in the set. O(1).
*
* Note that there are no guarantees on the ordering of values inside the
* array, and it may change when more values are added or removed.
*
* Requirements:
*
* - `index` must be strictly less than {length}.
*/
function _at(Set storage set, uint256 index) private view returns (bytes32) {
    require(set._values.length > index, "EnumerableSet: index out of bounds");
    return set._values[index];
}
```
## EnumerableSet.UintSet và EnumerableSet.AddressSet
`Set` là struct cơ bản để hình thành lên `AddressSet` và `UintSet`, trong ERC721 họ dùng ``UintSet`:
```javascript
// AddressSet
struct AddressSet {
    Set _inner;
}

// UintSet
struct UintSet {
    Set _inner;
}
```
Với mỗi struct, trước khi sử dụng các hàm ```_add, _remove, _contains```, thì `value` sẽ được convert về `bytes32`: 
```javascript
// AddressSet
function add(AddressSet storage set, address value) internal returns (bool) {
    return _add(set._inner, bytes32(uint256(value)));
}

function remove(AddressSet storage set, address value) internal returns (bool) {
    return _remove(set._inner, bytes32(uint256(value)));
}

function contains(AddressSet storage set, address value) internal view returns (bool) {
    return _contains(set._inner, bytes32(uint256(value)));
}

function length(AddressSet storage set) internal view returns (uint256) {
    return _length(set._inner);
}

function at(AddressSet storage set, uint256 index) internal view returns (address) {
    return address(uint256(_at(set._inner, index)));
}

// UintSet
function add(UintSet storage set, uint256 value) internal returns (bool) {
    return _add(set._inner, bytes32(value));
}

function remove(UintSet storage set, uint256 value) internal returns (bool) {
    return _remove(set._inner, bytes32(value));
}

function contains(UintSet storage set, uint256 value) internal view returns (bool) {
    return _contains(set._inner, bytes32(value));
}

function length(UintSet storage set) internal view returns (uint256) {
    return _length(set._inner);
}

function at(UintSet storage set, uint256 index) internal view returns (uint256) {
    return uint256(_at(set._inner, index));
}
```
# EnumerableMap
Trong ERC721 người ta sử dụng `EnumerableMap.UintToAddressMap` để lưu trữ thông tin xem một `tokenId` nào đấy đang được sở hữu bởi address nào. 

Tuy nhiên nếu chỉ để lưu thông tin đấy sao họ không dùng cách đơn giản hơn là `mapping`: 
```javascript
mapping (uint256 => address) private _tokenOwners;
```
mà lại phải dùng đến `EnumerableMap.UintToAddressMap` :
```javascript
EnumerableMap.UintToAddressMap private _tokenOwners;
```
Câu trả lời là vì ngoài thông tin trên, `UintToAddressMap` còn giúp chúng ta biết được đã có bao nhiêu tokenId được phát hành mặc dù tokenId không cần được mint theo Id tăng dần, mặt khác nó còn giúp add, remove, contains, get,... chặt chẽ hơn.
```javascript
struct MapEntry {
    bytes32 _key;
    bytes32 _value;
}

struct Map {
    // Storage of map keys and values
    MapEntry[] _entries;

    // Position of the entry defined by a key in the `entries` array, plus 1
    // because index 0 means a key is not in the map.
    mapping (bytes32 => uint256) _indexes;
}
```

Mỗi `Entry` sẽ có cặp `_key, _value`, sau đó khi nó được lưu vào  `Map`, thực chất nó sẽ push vào mảng `_entries` lưu lại vị trí trong mảng ở `_indexes`

## Set
```javascript
/**
* @dev Adds a key-value pair to a map, or updates the value for an existing
* key. O(1).
*
* Returns true if the key was added to the map, that is if it was not
* already present.
*/
function _set(Map storage map, bytes32 key, bytes32 value) private returns (bool) {
    // We read and store the key's index to prevent multiple reads from the same storage slot
    uint256 keyIndex = map._indexes[key];

    if (keyIndex == 0) { // Equivalent to !contains(map, key)
        map._entries.push(MapEntry({ _key: key, _value: value }));
        // The entry is stored at length-1, but we add 1 to all indexes
        // and use 0 as a sentinel value
        map._indexes[key] = map._entries.length;
        return true;
    } else {
        map._entries[keyIndex - 1]._value = value;
        return false;
    }
}
```

Ở đây, `key` là tokenid, `value` là một address, khi gán quyền sở hữu tokenId cho address, Map sẽ thực hiện cập nhật như sau: 
- Nếu tokenId chưa được sở hữu bởi một address nào trước đó, nghĩa là `keyIndex == 0`: push một `Entry` mới vào `_entries`, gắn `_indexes[key] = _entries.length` (do dùng giá trị 0 làm lính canh).
-  Nếu tokenId đã được sở hửu bởi một address trước đấy, thì đơn giản chỉ là cập nhập lại `_value` của `Entry` ở vị trí `keyIndex -1`: `map._entries[keyIndex - 1]._value = value;`

## Remove
Hàm này được dùng trong việc burn một tokenId, nghĩa là tokenId không còn tồn tại và không ai có thể sở hữu tokenId đấy nữa:
```javascript
/**
* @dev Removes a key-value pair from a map. O(1).
*
* Returns true if the key was removed from the map, that is if it was present.
*/
function _remove(Map storage map, bytes32 key) private returns (bool) {
    // We read and store the key's index to prevent multiple reads from the same storage slot
    uint256 keyIndex = map._indexes[key];

    if (keyIndex != 0) { // Equivalent to contains(map, key)
        // To delete a key-value pair from the _entries array in O(1), we swap the entry to delete with the last one
        // in the array, and then remove the last entry (sometimes called as 'swap and pop').
        // This modifies the order of the array, as noted in {at}.

        uint256 toDeleteIndex = keyIndex - 1;
        uint256 lastIndex = map._entries.length - 1;

        // When the entry to delete is the last one, the swap operation is unnecessary. However, since this occurs
        // so rarely, we still do the swap anyway to avoid the gas cost of adding an 'if' statement.

        MapEntry storage lastEntry = map._entries[lastIndex];

        // Move the last entry to the index where the entry to delete is
        map._entries[toDeleteIndex] = lastEntry;
        // Update the index for the moved entry
        map._indexes[lastEntry._key] = toDeleteIndex + 1; // All indexes are 1-based

        // Delete the slot where the moved entry was stored
        map._entries.pop();

        // Delete the index for the deleted slot
        delete map._indexes[key];

        return true;
   } else {
       return false;
   }
}
```
Hàm này tương tự như `_remove` của EnumerableSet, xác định `entry` cần xóa bằng `key`  và hoán đổi `entry` cần xóa với `lastEntry` sau đó `pop()` array và xóa giá trị `_indexes[key]`
## Contains, Length, At, Get
```javascript
/**
* @dev Returns true if the key is in the map. O(1).
*/
function _contains(Map storage map, bytes32 key) private view returns (bool) {
    return map._indexes[key] != 0;
}
```
Kiểm tra xem một `key` có tồn tại không, trong ERC721 nó dùng để kiếm tra xem một tokenId có tồn tại hay không.

```javascript
/**
* @dev Returns the number of key-value pairs in the map. O(1).
*/
function _length(Map storage map) private view returns (uint256) {
    return map._entries.length;
}
```
Xem tổng cộng có bao nhiêu `key` tồn tại, trong ERC721 nó được gọi trong `totalSupply()` để xem có bao nhiêu tokenId đã được mint.
```javascript
function _at(Map storage map, uint256 index) private view returns (bytes32, bytes32) {
    require(map._entries.length > index, "EnumerableMap: index out of bounds");

    MapEntry storage entry = map._entries[index];
    return (entry._key, entry._value);
}
```
Lấy về `Entry` ở vị trí `index`, trong ERC721 nó dùng để kiểm tra xem token thứ `index` là tokenId nào và được sở hữu bới address nào
```javascript
/**
* @dev Returns the value associated with `key`.  O(1).
*
* Requirements:
*
* - `key` must be in the map.
*/
function _get(Map storage map, bytes32 key) private view returns (bytes32) {
    return _get(map, key, "EnumerableMap: nonexistent key");
}

/**
* @dev Same as {_get}, with a custom error message when `key` is not in the map.
*/
function _get(Map storage map, bytes32 key, string memory errorMessage) private view returns (bytes32) {
    uint256 keyIndex = map._indexes[key];
    require(keyIndex != 0, errorMessage); // Equivalent to contains(map, key)
    return map._entries[keyIndex - 1]._value; // All indexes are 1-based
}
```
Get `_value` của `Entry` có `_key = key`, nó `key` không tồn tại , nó sẽ xảy ra lỗi, trong ERC721 nó được dùng để xem address nào đang sở hữu tokenId đấy.
## UintToAddressMap
`Map` là struct cơ bản để hình thành nên `UintToAddressMap`, và `UintToAddressMap` dùng lại các hàm của `Map` bằng cách convert `key` và `value` về dạng `bytes32` trước khi sử dụng:
```javascript
// UintToAddressMap
struct UintToAddressMap {
    Map _inner;
}

function set(UintToAddressMap storage map, uint256 key, address value) internal returns (bool) {
    return _set(map._inner, bytes32(key), bytes32(uint256(value)));
}

function remove(UintToAddressMap storage map, uint256 key) internal returns (bool) {
    return _remove(map._inner, bytes32(key));
}

function contains(UintToAddressMap storage map, uint256 key) internal view returns (bool) {
    return _contains(map._inner, bytes32(key));
}

function length(UintToAddressMap storage map) internal view returns (uint256) {
    return _length(map._inner);
}

function at(UintToAddressMap storage map, uint256 index) internal view returns (uint256, address) {
    (bytes32 key, bytes32 value) = _at(map._inner, index);
    return (uint256(key), address(uint256(value)));
}

function get(UintToAddressMap storage map, uint256 key) internal view returns (address) {
    return address(uint256(_get(map._inner, bytes32(key))));
}

function get(UintToAddressMap storage map, uint256 key, string memory errorMessage) internal view returns (address) {
    return address(uint256(_get(map._inner, bytes32(key), errorMessage)));
}
```

## Tổng kết
Đây là bài mình giải thích cách hoạt động của EnumerableSet và EnumerableMap, đã được vận dụng vào ERC721. Hy vọng bài này sẽ giúp các bạn hiểu rõ về chúng để dễ dàng triển khai chúng trong sản phẩm của các bạn.