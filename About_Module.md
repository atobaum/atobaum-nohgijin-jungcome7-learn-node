# NodeJs의 모듈을 알아보자

### index.js(모듈을 사용하는 곳), cal.js(모듈을 만드는 곳)이라고 가정한다.

* cal.js
- module.exprots.사용할모듈명=만든함수명
이렇게 cal.js에서 만든 모듈을 index.js에서 사용을 해보자.

* index.js
```
var a = require('./cal');
a.add(1,2)
```

- a.설정한변수명
을 이용해서 함수를 호출할 수 있다.
