# Lời mở đầu
Một vấn đề hay bị bỏ qua khi ta chọn ORM (object relational mapper) cho 1 dự án mới là khả năng testing của nó. Nếu bạn tìm kiếm giải pháp trên StackOverflow, bạn sẽ tìm thấy vài câu trả lời xung quanh vấn đề này.

Trong bài viết này, mình sẽ đi vào việc setup testing cho kiến trúc sử dụng [Sequelize](http://docs.sequelizejs.com/)

## Test Data 
Giả sử ta có 1 user model được định nghiã như sau 

```
sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'users',
  });
```

**Nào hãy bắt tay vào công việc testing nó**

**Bước 1:** Ta sẽ tạo 1 fake data cho user model

```
// test/factories/user.js
import faker from 'faker';
import models from 'src/models';
/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 * 
 * @param  {Object} props Properties to use for the user.
 * 
 * @return {Object}       An object to build the user from.
 */
const data = async (props = {}) => {
  const defaultProps = {
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
  };
  return Object.assign({}, defaultProps, props);
};
/**
 * Generates a user instance from the properties provided.
 * 
 * @param  {Object} props Properties to use for the user.
 * 
 * @return {Object}       A user instance
 */
export default async (props = {}) =>
  models.User.create(await data(props));
```

**Bước 2:** Thêm vài dòng sau vào package.json 
```

...
"scripts": {
  "db:migrate": "babel-node ./scripts/db/migrate",
  "pretest": "NODE_ENV=test npm run db:migrate",
  "test": "NODE_PATH=./ NODE_ENV=test mocha test/models",
},
...
```

**Bước 3:** Tạo file migrate 
```
// scripts/db/migrate.js
import path from 'path';
import { spawn } from 'child-process-promise';
const spawnOptions = { stdio: 'inherit' };
(async () => {
  // Our database URL
  const url = 'mysql://root@localhost:3306/my_database'
try {
    // Migrate the DB
    await spawn('./node_modules/.bin/sequelize', ['db:migrate', `--url=${url}`], spawnOptions);
    console.log('*************************');
    console.log('Migration successful');
  } catch (err) {
    // Oh no!
    console.log('*************************');
    console.log('Migration failed. Error:', err.message);
    process.exit(1);
  }
process.exit(0);
})();
```

Ở bước này sẽ được run trước mỗi khi chúng ta test bằng câu lệnh `npm run db:migrate`

**Bước 4:** Truncate all data of all table 
```
// test/truncate.js
import map from 'lodash/map';
import models from 'src/models';
export default async function truncate() {
  return await Promise.all(
    map(Object.keys(models), (key) => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return models[key].destroy({ where: {}, force: true });
    })
  );
}
```

**Cuối cùng:** Tạo 1 file để test nào :D 
```
// test/models/user.js
import chai, { assert } from 'chai';
import truncate from 'test/truncate';
import userFactory from 'test/factories/user';
describe('User model', () => {
  let user;
  beforeEach(async () => {
    await truncate();
    user = await userFactory();
  });
it('should do something', async () => {
    // TODO
  });
});
```

Bạn sẽ nhận thấy rằng ở đây mình dùng beforEach chứ k phải là before, điều này đảm bảo mỗi khi bạn define nhiều đoạn tests thì nó sẽ clear hết data cho bạn trước khi bạn test user. 

# Kết luận 
Hy vọng qua bài viết này, bạn sẽ hiểu được phần nào về việc test Sequelize ORM sử dụng chai và mocha. Rất mong nhận được sự góp ý của các bạn.

**Link tham khảo bài viết **
https://medium.com/riipen-engineering/testing-with-sequelize-cc51dafdfcf4