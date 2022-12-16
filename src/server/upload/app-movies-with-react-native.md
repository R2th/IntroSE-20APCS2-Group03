## Giới thiệu
Mình sẻ làm một project movies with api từ 1 server khác và cách sử dụng một số thư viện trong react native.
## Install project
# Cài đặt, build project mình đã hướng dẫn ở https://viblo.asia/p/react-native-LzD5d6kdZjY
# Đăng ký 
Tạo tài khoản https://www.themoviedb.org/ để lấy api key data từ servers này
## Build project
*  Mình sẻ làm 3 trang chính: Genders, Movies, DetailMovie
*  Sử dụng một số component của react native:   StyleSheet, Text, View, TouchableOpacity, ListView, ActivityIndicator, Dimensions, Image ,... tài liệu: https://facebook.github.io/react-native/docs/getting-started.html
* App này lấy api từ server nên chủ yếu dùng Fetch api, đọc tài liệu ở đây https://facebook.github.io/react-native/docs/network.html
* Tạo một số file sau:
+ App.js 
```javascript
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';
// react-navigation hướng dẫn https://reactnavigation.org/docs/en/getting-started.html
import {StackNavigator,} from 'react-navigation';
import Genders from './src/Screens/Genders';
import Movies from './src/Screens/Movies';
import DetailMovie from './src/Screens/DetailMovie';

export default class App extends Component {
  render() {
    return <RootStack/>;
  }
}

const RootStack = StackNavigator(
  {
    genders: {screen: Genders},
    movies: {screen: Movies},
    detailMovie: {screen: DetailMovie}
  },
  {
    initialRouteName: 'genders',
  }
);
```
+ src/Screens/Genders.js 
```javascript
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  ActivityIndicator,
} from 'react-native';
import {StackNavigator,} from 'react-navigation';

class Genders extends Component {
  static navigationOptions = {
    title: 'Genders',
  };

  constructor() {
    super();
    this.state = {
      dataSource: this.listData([{id: "id", name: "null"}]),
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getGendersFromApi();
  }

  listData(data) {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(data);
  }

    // Fetch api hướng dẫn ở https://facebook.github.io/react-native/docs/network.html
  getGendersFromApi() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=xxxxxxx')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: this.listData(responseJson.genres),
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {navigate} = this.props.navigation; // navigate =  this.props.navigation.navigate;

    if (this.state.isLoading) {
    // ActivityIndicator hướng dẫn ở https://facebook.github.io/react-native/docs/activityindicator.html
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" style={styles.colorLoading} />
        </View>
      )
    } else {
    // ListView hướng dẫn ở https://facebook.github.io/react-native/docs/listview.html
      return (
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity onPress={() => navigate('movies', {id: rowData.id})}>
              <Text style={styles.item}>{rowData.name}</Text>
            </TouchableOpacity>
          }
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    fontSize: 20,
    margin: 2,
    paddingBottom: 4,
    color: '#000000',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  colorLoading: {
    color: "#0000ff",
  },
});

export default Genders;
```
+ src/Screens/Movies.js
```javascript
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {StackNavigator,} from 'react-navigation';

class Movies extends Component {
  static navigationOptions = {
    title: 'Movies',
  };

  constructor() {
    super();
    this.state = {
      genderId: '',
      page: '',
      total_pages: '',
      results: this.listData([{original_language: "en", id: "null"}]),
      isLoading: true,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const genderId = navigation.getParam('id', 'NO-ID');
    this.getMoviesFromApi(genderId);
  }

  listData(data) {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(data);
  }

  getMoviesFromApi(id) {
    return fetch('https://api.themoviedb.org/3/genre/' + id + '/movies?api_key=xxxxxx')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          genderId: responseJson.id,
          page: responseJson.page,
          total_pages: responseJson.total_pages,
          results: this.listData(responseJson.results),
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {navigate} = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" style={styles.colorLoading} />
        </View>
      )
    } else {
      const width = (Dimensions.get('window').width / 3) - 4;
      return (
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.results}
          renderRow={(rowData) =>
            <TouchableOpacity onPress={() => navigate('detailMovie', {id: rowData.id})}>
              <Image style={{width: width, height: 200, margin: 2}}
                source={{uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + rowData.backdrop_path}} />
            </TouchableOpacity>
          }
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  colorLoading: {
    color: "#0000ff",
  },
});

export default Movies;
```
+ src/Screens/DetailMovie.js
```javascript
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

class DetailMovie extends Component {
  static navigationOptions = {
    title: 'Movie Detail',
  };

  constructor() {
    super();
    this.state = {
      id: '',
      adult: '',
      backdrop_path: '',
      popularity: '',
      budget: '',
      title: '',
      original_language: '',
      vote_average: '',
      vote_count: '',
      tagline: '',
      runtime: '',
      release_date: '',
      revenue: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    this.getMovieFromApi(id);
  }

  getMovieFromApi(id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=xxxxx')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          id: responseJson.id,
          adult: responseJson.adult,
          backdrop_path: responseJson.backdrop_path,
          popularity: responseJson.popularity,
          budget: responseJson.budget,
          title: responseJson.title,
          original_language: responseJson.original_language,
          vote_average: responseJson.vote_average,
          vote_count: responseJson.vote_count,
          tagline: responseJson.tagline,
          runtime: responseJson.runtime,
          release_date: responseJson.release_date,
          revenue: responseJson.revenue,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" style={styles.colorLoading} />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Image style={[styles.image, {width: Dimensions.get('window').width}]}
              source={{uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.state.backdrop_path}} />
          </View>
          <View style={styles.content}>
            <Text>Title: {this.state.title}</Text>
            <Text>Language: {this.state.original_language}</Text>
            <Text>Time: {this.state.runtime} minutes</Text>
            <Text>Release date: {this.state.release_date}</Text>
            <Text>Vote: {this.state.vote_count}</Text>
            <Text>Average: {this.state.vote_average}</Text>
            <Text>Popularity: {this.state.popularity}</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    height: 300,
  },
  content: {
    flex: 1,
    marginTop: 4,
    padding: 4,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  colorLoading: {
    color: "#0000ff",
  },
});

export default DetailMovie;
```
## Kết quả
+ Screen Genders
![](https://images.viblo.asia/c5ec0e0d-4f4f-435a-a87d-02358b85dbee.png)
+ Screen Movies
![](https://images.viblo.asia/ab15fa3d-567f-411b-9ffd-4d5abe4dfb67.png)
+ Screen Detail Movie
![](https://images.viblo.asia/4c02238e-59c6-4739-9a18-5ba6bc7731f9.png)

Thật đơn giản, vậy là chúng ta đã làm xong một App. Chúc các bạn thành công =))
## Tài liệu tham khảo
https://facebook.github.io/react-native/docs/getting-started.html\

source: https://github.com/tjn0994/foody/pull/2