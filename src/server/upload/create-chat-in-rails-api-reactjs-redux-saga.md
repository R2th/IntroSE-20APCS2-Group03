# Giới thiệu
Ở bài viết trước mình đã tạo một ứng dụng [Create App](https://viblo.asia/p/create-app-rails-api-reactjs-redux-saga-vyDZOb9aKwj) cơ bản sử dụng kết hợp Rails API, ReactJS, Redux Saga. Tiếp theo mình sẽ tạo chức năng chat với user, trong bài viết này mình sẽ thực hiện hiển thị danh sách user đã chat.
# BackEnd
Trước tiên, bạn cần tạo các bảng cần thiết: users, chat_rooms, messages.

Tạo bảng chat_rooms: `rails generate migration CreateChatRooms sender_id:integer recipient_id:integer`

Tạo bảng messages: `rails generate migration CreateMessages content:text read:boolean chat_room:references user:references`

Chay lệnh: `rails db:migrate`

## Model
Trong Model, ta tạo các file chat_room.rb, message.rb và viết các liên kết cho nó.

File chat_room.rb:
```
class ChatRoom < ApplicationRecord
  belongs_to :sender, foreign_key: :sender_id, class_name: "User"
  belongs_to :recipient, foreign_key: :recipient_id, class_name: "User"

  has_many :messages, dependent: :destroy

  ATTRIBUTE_PARAMS = %i(sender_id recipient_id)
  
  validates_uniqueness_of :sender_id, scope: :recipient_id
end
```

Scope: tùy chọn giới hạn kiểm tra tính duy nhất. Ở đây, sender_id và recipient_id đều là id của user.

File message.rb:

```
class Message < ApplicationRecord
  belongs_to :chat_room
  belongs_to :user
end
```

Ngoài ra, bạn có thể viết thêm validates khác cho các thuộc tính trong 2 model trên.

## Controller

Tiếp tục, ta sẽ thực hiện lấy danh sách user đã chat trong controller. 

Tạo file controller chat_rooms_controller.rb:

```
class Api::V1::ChatRoomsController < Api::V1::BaseController
  def index
    @listChats = ChatRoom.list_chats params[:user_id]        # Lấy danh sách chat của user.
    @listMessages ||= []
    @listChats.each do |chat_room|
      @message = ChatRoom.find_message(chat_room.id).first   # Lấy message cuối cùng trong box chat đó.
      @message ? @listMessages << @message : nil
    end
    @users = User.where.not(id: params[:user_id])            # Lấy danh sách user đã chat.

    render json: { listMessages: @listMessages.as_json, listUsers: @users }
  end

  private

  def chat_room_params
    params.require(:chat_room).permit(ChatRoom::ATTRIBUTE_PARAMS)
  end
end
```

Cuối cùng, trong file routes.rb ta thêm: `resources :chat_rooms, only: %i(index create)`

# FrontEnd
Như vậy bên backEnd ta đã xử lý xong việc lấy ra danh sách chat của user rồi. Vậy tiếp theo ta sẽ hiển thị danh sách đó ra, và phía frontEnd sẽ xử lý giúp chúng ta việc này.

Bạn cài đặt thêm: `npm install --save  '@livechat/ui-kit'` 

Sau đó, ta lần lượt tạo các file: constants.js, actions.js, reducer.js, saga.js.

## constants

Trong file constants.js, ta định nghĩa các constant cần dùng cho reducer và action.

```
export const SHOW_LIST_MESSAGES= 'app/ListMessages/SHOW_LIST_MESSAGES';
export const SHOW_LIST_SUCCESS= 'app/ListMessages/SHOW_LIST_SUCCESS';
export const SHOW_LIST_ERROR= 'app/ListMessages/SHOW_LIST_ERROR';
```

## actions
Trong file actions.js, ta viết các actions tương ứng để thực hiện list chat của user.

```
import {
  SHOW_LIST_MESSAGES,
  SHOW_LIST_SUCCESS,
  SHOW_LIST_ERROR
} from './constants';

export const showListMessages = (user_id) => ({
  type: SHOW_LIST_MESSAGES,
  user_id,
});

export const showListSuccess = (listMessages) => ({
  type: SHOW_LIST_SUCCESS,
  listMessages,
});

export const showListError = (error) => ({
  type: SHOW_LIST_ERROR,
  error,
});
```

## reducer
File reducer.js sẽ giúp ta quản lý các state:

```
import produce from 'immer';
import {
  SHOW_LIST_MESSAGES,
  SHOW_LIST_SUCCESS,
  SHOW_LIST_ERROR
} from './constants';

export const initialState = {
  listMessages: [],
  listUsers: [],
  success: true,
  error: false,
};

const listMessagesReducer = (state = initialState, action) =>
  produce(state, ( draft ) => {
    switch (action.type) {
      case SHOW_LIST_MESSAGES:
        draft.success = true;
        draft.error = false;
        break;
      case SHOW_LIST_SUCCESS:
        draft.listMessages = action.listMessages.listMessages;
        draft.listUsers = action.listMessages.listUsers;
        draft.success = true;
        draft.error = false;
        break;
      case SHOW_LIST_ERROR:
        draft.success = false;
        draft.error = true;
        break;
    }
  });

export default listMessagesReducer;
```
## saga
Tiếp theo, để liên kết tới API, ta sẽ viết trong file saga.js

```
import { call, put, takeLatest } from 'redux-saga/effects';
import { SHOW_LIST_MESSAGES } from './constants';
import apiCaller from 'api/apiCaller';
import {
  showListSuccess,
  showListError,
} from './actions';

export function* getListMessages(params) {
  const userId = {user_id: params.user_id};

  try {
    const repos = yield call(apiCaller, 'GET', 'api/v1/chat_rooms', userId);
    yield put(showListSuccess(repos.data));
  } catch (err) {
    yield put(showListError(err));
  }
}

export default function* listMessagesSaga() {
  yield takeLatest(SHOW_LIST_MESSAGES, getListMessages);
}
```

Ở bài viết trước, mình có viết chung phần call đến API, giờ ta sẽ tách riêng ra 1 file khác để có thể tái sử dụng nó.

Tạo file api/apiCaller.js

```
import axios from 'axios';

const apiCaller = (method, subUrl, params) => {
  let common = {
    method: method,
    url: process.env.DOMAIN_API_SERVER + subUrl,
    headers: {
      auth_token: localStorage.getItem('auth_token'),
    }
  };

  common =
    method.toUpperCase() === 'GET'
      ? { ...common, params: params }
      : { ...common, data: params };

      return axios(common);
};

export default apiCaller;
```

Để lấy danh sách chat của user, bạn tạo thêm file selectors.js

```
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectListMessagesDomain = state => state.listMessages || initialState;

const makeSelectListMessages = () =>
  createSelector(
    selectListMessagesDomain,
    substate => substate.listMessages,
  );

const makeSelectListUsers = () =>
  createSelector(
    selectListMessagesDomain,
    substate => substate.listUsers,
  );

export default makeSelectListMessages;
export { selectListMessagesDomain, makeSelectListMessages, makeSelectListUsers };
```

Sau khi đã thực hiện việc lấy data xong, ta sẽ đi hiển thị nó ra ngoài, tạo file index.js:

```
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectListMessages, makeSelectListUsers} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { showListMessages } from './actions';
import { makeUserProfile } from 'containers/App/selectors';
import { API_URL_IMAGE } from 'api/configUrl';
import {
  makeStyles,
  Avatar,
  IconButton,
} from '@material-ui/core';
import {
  Row,
  Title,
  Column,
  Subtitle,
  ChatIcon,
  CloseIcon,
} from '@livechat/ui-kit'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    left: 'auto',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    background: '#0093FF',
    color: '#fff',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  listUsers: {
    width: '300px',
    maxWidth: '500px',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '500px',
    marginBottom: '10px',
    background: '#fff',
    border: '1px solid rgba(100, 100, 100, .4)',
    borderRadius: '0 0 2px 2px',
    boxShadow: '0 3px 8px rgba(0, 0, 0, .25)',
  },
  user: {
    borderBottom: '1px solid #dddfe2',
    padding: '6px 10px 6px 10px',
    fontSize: '15px',
    '&:hover': {
      background: 'rgba(244, 244, 244, 1)',
    },
    '&:active': {
      background: 'rgba(0, 0, 0, 0.38)',
    }
  },
  avatar: {
    float: 'left',
    marginRight: '10px',
  },
  header: {
    background: 'cadetblue',
    height: '40px',
    padding: '5px',
    borderRadius: '5px 5px 0px 0px',
  },
  close: {
    float: 'right',
    marginTop: '-5px',
  },
}));

export function ListMessages({
  currentUser,
  listUsers,
  listMessages,
  onGetListMessages,
}) {
  useInjectReducer({ key: 'listMessages', reducer });
  useInjectSaga({ key: 'listMessages', saga });

  const classes = useStyles();
  const [button, setButton] = useState(true);

  const handleOnClick = () => {
    setButton(false);
    onGetListMessages(currentUser.id);
  }

  const handleOnClose = () => {
    setButton(true);
  }

  return (
    <div className={classes.root}>
      {button ?
        <div
          className={classes.button}
          onClick={handleOnClick}
        >
          <IconButton color="inherit">
            <ChatIcon />
          </IconButton>
        </div>
      :
        <div>
          <div className={classes.header}>
            <span>List Messeage</span>
            <IconButton className={classes.close} onClick={handleOnClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className={classes.listUsers}>
            {listMessages.map(chatRoom => (
              listUsers.map(user => (
                (chatRoom.sender_id == user.id || chatRoom.recipient_id == user.id) &&
                <div className={classes.user} key={chatRoom.id}>
                  <Avatar
                    className={classes.avatar}
                    alt=""
                    src={API_URL_IMAGE(user.image)}
                  />
                  <Column>
                    <Row justify>
                      <Title ellipsis>{user.user_name}</Title>
                      <Subtitle nowrap>{chatRoom.message_created_at}</Subtitle>
                    </Row>
                    <Subtitle ellipsis>
                      {chatRoom.content}
                    </Subtitle>
                  </Column>
                </div>
              ))
            ))}
          </div>
        </div>
      }
    </div>
  );
}

ListMessages.defaultProps = {
  listUsers: [],
  listMessages: [],
  onGetListMessages: () => {},
};

ListMessages.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  listMessages: makeSelectListMessages(),
  listUsers: makeSelectListUsers(),
  currentUser: makeUserProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetListMessages: (user_id) => {
      dispatch(showListMessages(user_id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ListMessages);
```

Cuối cùng các bạn chạy http://localhost:3000/ và cùng xem kết quả nhé.

# Kết Luận

Vậy là bài viết trên mình đã thực hiện lấy danh sách chat của user và hiển thị chúng ra, trong bài tiếp theo mình sẽ thực hiện gửi message giữa các user. Mong bài viết trên sẽ giúp ích cho các bạn mới tìm hiểu về redux-saga có thể hiểu về nó hơn. Thanks!