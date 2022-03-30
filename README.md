# Vue3 + Typescript : Vue3, TypeScript로 간단한 게시판 구현하기. (for DI Development Team Study)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white)

---
## TypeScript.
- [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- JavaScript + 정적 타입 정의(static type definitions)

```javascript
// 자바스크립트 : 동적 타입(dynamically typed)

let myVariable = ???
// -> myVariable 변수안에는 string, number, boolean, array, object 등 모든 타입 할당 가능. (장점)


// 단점 : 코드를 보고 어떻게 작동되는지 예측이 힘듦.

const myAge = 26
function increaseAge() {
  if (typeof(myAge) === 'number') {
    myAge++
  } else {
    console.error('myAge is not a number')
  }
}

// -> myAge 변수는 항상 number 타입이어야 하는데 도구를 사용하지 않는 한 확인이 어려움.
//    따라서 조건문을 추가하여 myAge 값이 number 타입인지 확인해야 함. (정적 타입의 필요성)
```

---
## Vue + JavaScript 에서 타입 활용.
- 이미 우리는 Vue에서 정적 타입을 다루고 있음
```vue
// props를 배열 형태로 작성.
<script>
export default {
  props: ['color', 'text'],
}
</script>

// props를 객체 형태로 작성.
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'blue',
      validator: (value) => {
        const validColor = ['red', 'green', 'blue']
        return validColor.includes(value)
      }
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

대부분의 Vue로 작성된 코드를 보면 props를 배열 형태가 아닌 객체 형태로 작성.
-> 객체 형태로 작성하게 되면 타입 정의, 기본 값 정의, validator(조건 추가) 등 활용 가능.
-> 타입을 정의하여 더 정확한 데이터를 받을 수 있고, validator를 사용하여 조건을 추가할 수 있음.
```

---
## Vue에서 TypeScript 지원.
###  Vue2에서 TypeScript를 사용할 때 가장 큰 문제점   
- 기능 구현하기까지 너무 많은 시간과 노동(비용)이 크고, 어떤 것들은 구현이 안되는 점.  
  ex) Vuex에서 Type을 쉽게 감지할 수 없고 이 문제를 해결하기 위해 원하는 깔끔한 코드가 아닌 이것저것 코드를 억지로 만듦.
###  Vue3에서는 TypeScript 지원이 더 간편해지고 훨씬 사용하기 편해짐.

---
## Vue3 + TypeScript 프로젝트 세팅.
- https://vuejs.org/guide/typescript/overview.html
```javascript
// vue cli 설치하기.
npm install -g @vue/cli
OR
yarn global add @vue/cli

// vue cli를 이용하여 프로젝트 생성하기.
vue create [프로젝트 명]       // vue/cli 3.x 이상
vue init webpack [프로젝트 명] // vue/cli 3.x 미만

// 기존 Vue 프로젝트에 TypeScript 추가하기.
vue add typescript
```

---
## TypeScript 컴포넌트 변화.
### 1. 개발 언어 속성(The Language Attribute) : 싱글 파일 컴포넌트에서 script 태그에 lang 속성 추가.
```javascript
<script lang="ts"> // TypeScript 사용 시 명시해야 함.
```
### 2. defineComponent Method 사용.
```javascript
// Vue3를 잘 활용하기 위해 필요한 새로운 것 중 하나가 헬퍼 메서드(helper methods)를 불러오는 것.
// TypeScript를 사용할 경우, Vue에서 제공하는 헬퍼 메서드인 defineComponent를 명시적으로 사용한다고 알려줘야 함.
import { defineComponent } from 'vue'

export default defineComponent({ ... })
```
### 3. 기존 컴포넌트에 TypeScript 문법 추가.
```vue
// 기존(TypeScript 적용 전)
<script>
import EventCard from '../components/EventCard.vue'
import EventService from '../service/EventService'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      event: null
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>


==============================================
[TypeScript로 전환하기 위해서 해야 할 일]
1. script 태그에 lang 속성 정의하기.
2. 헬퍼 메서드(defineComponent) import 하기.
3. 헬퍼 메서드(defineComponent) 적용하기.
==============================================


// TypeScript 적용 후
<script lang="ts">
import { defineComponent } from 'vue'

import EventCard from '../components/EventCard.vue'
import EventService from '../services/EventService'

export default defineComponent({
  name: 'EventList',
  components: {
    EentCard
  },
  data() {
    return {
      events: null
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
})
</script>
```

---
## 타입 (Types).
### JavaScript에서 사용되는 기본 타입.
- String, Number, Boolean, Array, Function, Object 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures

### TypeScript에서 보는 새로운 타입. (New Types from TypeScript)
- any : 변수에 어떠한 타입도 할당 받음. (타입 체킹을 하지 않는 것과 같음)
- tuple : 타입이 명시되어 있는 고정된 수의 요소를 포함한 타입 배열을 정의.
- enum : numberic 값들을 익숙한 네임으로 정의.
- https://www.typescriptlang.org/docs/handbook/basic-types.html

### 변수에 타입을 적용하는 방법. (How to Apply a Type to a Variable)
```typescript
// String, Number, Boolean : `:(세미콜론)`으로 타입 정의.
let stageName: string = 'A Beautiful Vue'
let roomSize: number = 100
let isComplete: boolean = false


// Arrays : 배열에 예상되는 타입들에 대해 명시적으로 알려야 함.
let shoppingList: string[] = ['apple', 'bananas', 'cherries']


// Function : Parameter, Return에 타입 정의.
// - Parameter : 각 parameter 뒤에 `:(세미콜론)` 사용 후 type 지정.
// - return    : 전체 parameter 감싼 괄호 뒤에 `:(세미콜론)` 사용 후 type 지정. 
// 타입 추가 전.
let generateFullName = (firstName, lastName) => {
  return firstName + '' + lastName
}
// 타입 추가 후.
let generateFullName = (firstName: string, lastName: string):string => {
  return firstName + '' + lastName
}


// Object : `:(세미콜론)` 뒤에 객체를 만들고 key값에 타입을 지정.
// 타입 추가 전.
let person = {
  name: 'Peter Parker',
  age: 20,
  activeAvenger: true,
  powers: ['wall-crawl', 'spider-sense']
}
// 타입 추가 후.
let person: {
  name: string;
  age: number;
  activeAvenger: boolean;
  posers: string[];
} = {
  name: 'Peter Parker',
  age: 20,
  activeAvenger: true,
  powers: ['wall-crawl', 'spider-sense']
}
```

### 타입의 제한(Limitations of Predefined Types).
- JavaScript, TypeScript가 제공하는 미리 정의된 타입들이 있지만, 직접 사용하다 보면 기술적인 타입들에 대한 아쉬움이 있음.
- ex) 개발자들이 미리 정의된 버튼 스타일 타입(primary, seconday, error, disabled)을 변수에 할당해야 하는 경우.
```javascript
let buttonStyles: string = 'primary' 
// 위와 같이 적으면 작동은 되나 개발자들이 잘못된 타입들을 할당하는 것을 막진 못함. (custom types 정의 필요)
```

---
## 커스텀 타입 정의(Defining Custom Types).
- TypeScript에서 custom type을 만드는 2가지 방법 : Type Alias, Interface.
- Type Alias와 Interface 차이 : https://medium.com/humanscape-tech/type-vs-interface-%EC%96%B8%EC%A0%9C-%EC%96%B4%EB%96%BB%EA%B2%8C-f36499b0de50
- vue에서 커스텀 타입 적용 : https://hasudoki.tistory.com/entry/Vuejs-Vue3-TypeScript-6-%EB%A7%88%EC%A7%80%EB%A7%89-%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%83%80%EC%9E%85-%EC%A0%95%EC%9D%98%ED%95%98%EA%B8%B0Type-Assertion-data-props-computed-methods?category=1064875

### Type Alias로 custom type 정의.
- type alias 선언하여 사용. (변수 선언과 비슷)
```typescript
type buttonType = 'primary' // buttonType이라는 type을 선언하고. type은 'primary'값을 포함한다.

let buttonStyles: buttonType = 'primary'


// buttonType에 포함되지 않은 값을 할당한 경우 에러 발생.
let buttonStyles: buttonType = 'secondary'


// 다수의 값을 포함하는 type 정의.
type buttonType = 'primary' | 'secondary' | 'success' | 'danger'

const errorBtnStyles: buttonType = 'error'
```

### Interface로 custom type 정의.
- (type alias과 같이) interface 선언하여 사용.
```typescript
interface Hero {
  name: string;
  age: number;
  activeAvenger: boolean;
  posers: string[];
}

let person: Hero = {
  name: string,
  age: number,
  activeAvenger: boolean,
  posers: string[]
}
```

### Interface안에서 Type Alias 사용.
```typescript
// Hero interface에 universe key를 추가하여 Marvel 세계관인지 DC 세계관인지 구분하고 싶은 경우 type 사용.

type ComicUniverse = 'Marvel' | 'DC'

interface Hero {
  name: string;
  age: number;
  activeAvenger: boolean;
  posers: string[];
  universe: ComicUniverse;
}
```

---
## shims-vue.d.ts
- IDE(Integrated Development Environment, 통합개발환경)가 .vue 파일이 어떤 파일인지 이해하는 것을 도움.
- 수 많은 파일 중 .vue 파일이 어떤 파일인지 IDE가 판단하기 쉽게 해줌.
- https://stackoverflow.com/questions/54622621/what-does-the-shims-tsx-d-ts-file-do-in-a-vue-typescript-project
- https://fettblog.eu/typescript-modules-for-webpack/
```typescript
// *.vue 파일을 import할 때 .vue파일이 있는 것처럼 처리. (TypeScript는 .vue 파일을 이해하지 못함)
// ~~이름이 있는 모듈을 가져올 때마다 실제로 수행하지 말고(TypeScript에선 이해할 수 없으니 모듈을 못 가져옴)
// ~~이러한 내용이 있는 것처럼 처리.
declare module "*.vue" {
  import Vue from 'vue';
  export default Vue;
}
```

---