Chào mọi người, bài viết này mình sẽ giới thiệu đến mọi người cách sử dụng Instagram filter cho 1 ảnh trong project *React Native* nhé.

Trước tiên chúng ta cần có 1 project *React Native* cơ bản và tất nhiên là project sẽ bao gồm cả một bức ảnh mẫu để làm demo nhé. Trong ví dụ này mình sự dụng ảnh mẫu có tên là `car.png`. 

Và package để sử dụng các filter đó là [**react-native-image-filter-kit**](https://github.com/iyegoroff/react-native-image-filter-kit)

```
npm install -s react-native-image-filter-kit
```

Trong file `App.js` import ảnh mẫu như sau

```
import React from 'react';
import {Image, SafeAreaView} from 'react-native';
import {Emboss} from 'react-native-image-filter-kit';
const App = () => (
  <>
    <SafeAreaView />
    <Image
      style={styles.image}
      source={require('./car.png')}
      resizeMode={'contain'}
    />
    <Emboss
      image={
        <Image
          style={styles.image}
          source={require('./car.png')}
          resizeMode={'contain'}
        />
      }
    />
  </>
);
const styles = {
  image: {
    width: 320,
    height: 320,
    marginVertical: 10,
    alignSelf: 'center',
  },
};
```

Component **Emposs** được cung cấp bởi thư viện `react-native-image-filter-kit` sẽ nhận `Image` như một prop và trả ra một bức ảnh mới kèm filter.

![](https://images.viblo.asia/e9be0f67-bebb-48a0-9f28-6379e087aec2.png)

Tuy nhiên thư viện còn cung cấp rất nhiều các filter khác nữa, nên để view được các filter đó trông như thế nào thì chúng ta sẽ xử lý khác đi một chút. Chúng ta sẽ import một loạt các component và define chúng thành một mảng filter như sau:

```
import {
  AdenCompat,
  _1977Compat,
  BrannanCompat,
  BrooklynCompat,
  ClarendonCompat,
  EarlybirdCompat,
  GinghamCompat,
  HudsonCompat,
  InkwellCompat,
  KelvinCompat,
  LarkCompat,
  LofiCompat,
  MavenCompat,
  MayfairCompat,
  MoonCompat,
  NashvilleCompat,
  PerpetuaCompat,
  ReyesCompat,
  RiseCompat,
  SlumberCompat,
  StinsonCompat,
  ToasterCompat,
  ValenciaCompat,
  WaldenCompat,
  WillowCompat,
  Xpro2Compat,
} from 'react-native-image-filter-kit'; 
const FILTERS = [
  {
    title: 'Normal',
    filterComponent: AdenCompat,
  },
  {
    title: 'Maven',
    filterComponent: MavenCompat,
  },
  {
    title: 'Mayfair',
    filterComponent: MayfairCompat,
  },
  {
    title: 'Moon',
    filterComponent: MoonCompat,
  },
  {
    title: 'Nashville',
    filterComponent: NashvilleCompat,
  },
  {
    title: 'Perpetua',
    filterComponent: PerpetuaCompat,
  },
  {
    title: 'Reyes',
    filterComponent: ReyesCompat,
  },
  {
    title: 'Rise',
    filterComponent: RiseCompat,
  },
  {
    title: 'Slumber',
    filterComponent: SlumberCompat,
  },
  {
    title: 'Stinson',
    filterComponent: StinsonCompat,
  },
  {
    title: 'Brooklyn',
    filterComponent: BrooklynCompat,
  },
  {
    title: 'Earlybird',
    filterComponent: EarlybirdCompat,
  },
  {
    title: 'Clarendon',
    filterComponent: ClarendonCompat,
  },
  {
    title: 'Gingham',
    filterComponent: GinghamCompat,
  },
  {
    title: 'Hudson',
    filterComponent: HudsonCompat,
  },
  {
    title: 'Inkwell',
    filterComponent: InkwellCompat,
  },
  {
    title: 'Kelvin',
    filterComponent: KelvinCompat,
  },
  {
    title: 'Lark',
    filterComponent: LarkCompat,
  },
  {
    title: 'Lofi',
    filterComponent: LofiCompat,
  },
  {
    title: 'Toaster',
    filterComponent: ToasterCompat,
  },
  {
    title: 'Valencia',
    filterComponent: ValenciaCompat,
  },
  {
    title: 'Walden',
    filterComponent: WaldenCompat,
  },
  {
    title: 'Willow',
    filterComponent: WillowCompat,
  },
  {
    title: 'Xpro2',
    filterComponent: Xpro2Compat,
  },
  {
    title: 'Aden',
    filterComponent: AdenCompat,
  },
  {
    title: '_1977',
    filterComponent: _1977Compat,
  },
  {
    title: 'Brannan',
    filterComponent: BrannanCompat,
  },
];
```

Tiếp theo chúng ta cần render một list các filter nằm dưới bức ảnh mặc định ban đầu và căn giữa khi filter được chọn. Trong `App.js`:

```
import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
const App = () => {
  const extractedUri = useRef('https://www.hyundai.com/content/hyundai/ww/data/news/data/2021/0000016609/image/newsroom-0112-photo-1-2021elantranline-1120x745.jpg');
  const [selectedFilterIndex, setIndex] = useState(0);
  const onExtractImage = ({nativeEvent}) => {
    extractedUri.current = nativeEvent.uri;
  };
  const onSelectFilter = selectedIndex => {
    setIndex(selectedIndex);
  };
  const renderFilterComponent = ({item, index}) => {
    const FilterComponent = item.filterComponent;
    const image = (
      <Image
        style={styles.filterSelector}
        source={require('./car.jpg')}
        resizeMode={'contain'}
      />
    );
    return (
      <TouchableOpacity onPress={() => onSelectFilter(index)}>
        <Text style={styles.filterTitle}>{item.title}</Text>
        <FilterComponent image={image} />
      </TouchableOpacity>
    );
  };
  const SelectedFilterComponent = FILTERS[selectedFilterIndex].filterComponent;
  return (
    <>
      <SafeAreaView />
      {selectedFilterIndex === 0 ? (
        <Image
          style={styles.image}
          source={require('./car.jpg')}
          resizeMode={'contain'}
        />
      ) : (
        <SelectedFilterComponent
          onExtractImage={onExtractImage}
          extractImageEnabled={true}
          image={
            <Image
              style={styles.image}
              source={require('./car.jpg')}
              resizeMode={'contain'}
            />
          }
        />
      )}
      <FlatList
        data={FILTERS}
        keyExtractor={item => item.title}
        horizontal={true}
        renderItem={renderFilterComponent}
      />
    </>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 520,
    height: 520,
    marginVertical: 10,
    alignSelf: 'center',
  },
  filterSelector: {
    width: 100,
    height: 100,
    margin: 5,
  },
  filterTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
});
```

Nó sẽ như ảnh sau


![](https://images.viblo.asia/d0ea0fc6-fcb9-47d6-810e-6378093bb5d3.gif)

Sau khi chọn, thì method `onExtractImage` sẽ lưu URL ảnh được trích xuất sau khi đã apply filter bởi biến `extractedUri` ref, cái mà bạn có thể dùng để lưu trên server.

Trên đây là một ví dụ nhỏ về  sử dụng filter **react-native-image-filter-kit**, hi vọng nó có ích cho mọi người.

Cảm ơn vì đã đọc bài viết!