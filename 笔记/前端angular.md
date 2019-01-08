## RxJS
- [学习地址](https://segmentfault.com/a/1190000013141856)
- [30天地址](https://ithelp.ithome.com.tw/articles/10186103) 这个湾湾的论坛很有意思
- [angular中RxJS](https://www.jianshu.com/p/869a3f74d3ca)
- 如果我们使用RxJS，上面所有的API都可以透过RxJS来处理，就能用同样的API操作（RxJS的API）

- Observable
  - 更簡單的來說，Observable 就像是一個**序列**，裡面的元素會**隨著時間**推送。
  - 自我理解：还是状态机，订阅他的状态，本质都是离散的状态间的跃动，其他主体（subject）针对他的变动做出响应
  - “今天講了 Iterator 跟 Observer 兩個 Pattern，這兩個 Pattern 都是漸進式的取得元素，差異在於 Observer 是靠生產者推送資料，Iterator 則是消費者去要求資料，而 Observable 就是這兩個思想的結合！”
  - 比如： 游戏一改版，去研究，去调整打法；市场条令改动，很多营销策略改动；
- 延迟运算(lazy evaluation)
  - 所有Observable一定会等到订阅后才开始对元素做运算，如果没有订阅就不会有运算的行为
  - 每個元素送出後就是運算到底，在這個過程中不會等待其他的元素運算。
```javascript

// 使用generator 来返回一个 iterator
function* getNumbers(words) {
  // for...of语法
  for (let word of words ) {
    if (/^[0-9]+$/.test(word)) {
      yield parseInt(word, 10);
    }
  }
}

const iterator = getNumbers('30 天精通RxJS （04）');

iterator.next();// 注意： 只有执行到这个next()时，才会真的做运算
// { value：3, done: false}
iterator.next();
// { value: 0, done: false}

```

- Observable 可以同時處理同步跟非同步行為
  - Observer（观察者） 是一個物件，這個物件具有三個方法，分別是 next, error, complete
- Observable是个自执行的generator，从结果角度看是个iterator
```javascript
  var source = Rx.Observable.of('Jerry', 'Anna');
  source.subscribe({
    next: function(value) {
      console.log(value);
    },
    complete: function() {
      console.log('complete!');
    },
    error: function(error) {
      console.log(error);
    }
  });
  // Jerry
  // Anna
  // complete!
```
- 什么是subject
  - 既是Obsever，也是一个Observable
  - Subject会对内部的observers清单进行组播（multicast）(就是标准的观察者模式)


## angular地址
- [基础教程](https://www.jianshu.com/p/9af9f203e0b1?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)


- 设置spa入口 关键标签
  - <base href="/"> 将这个标签放在head的最顶端

- 路由配置
  - 路由配置在src/app/app.module.ts
  - 也就是说，一个路由相当于是一个模块
  - 路由出口
    - <router-outlet></router-outlet>写在app.component.html的末尾
  ```javascript
    // 路径配置的顺序非常重要，angular2 "先匹配优先"原则
    // 整个的forRoot方法的返回值可以看成是 一个module
    // 当一些配置变的臃肿时，提炼成一个独立js文件，然后引入进来
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ])
  ```
- 路由参数
  ```typescript
  // 配置部分
  {
    path: 'todo/:filter',
    component: TodoComponent
  }

  //...
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let filter  = params['filter'];
      this.filterTodos(filter);
    })
  }

  ```

- 路由拦截
  ```typescript
  // 由下往上 canDeactivate 离开路由的拦截
  // 从上到下 canActivate   进入某个路由的拦截
  import { AuthGuardService } from '../core/auth-guard.service';
  const routes: Routes = [
    {
      path: 'todo/:filter',
      canActivate: [AuthGuardService],// 
      component: TodoComponent
    }
  ]
  ```
  ```javascript
  
  ```

- 条件判断
  - *ngIf="usrenameRef.errors?.required"
  - errors可能为空
- 双向绑定 和 事件绑定
  ```html
    <!-- 事件 -->
    <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">

    <!-- 双向绑定 [()] 是双向绑定的意思 -->
    <input type="text" 
      [(ngModel)]="username"
    >
  ```

- 循环指令
  ```html
    <div>
      <input type="text" [(ngModel)]="desc" (keyup.enter)="addTodo()">
      <ul>
        <li *ngFor="let todo of todos">{{ todo.desc }}</li>
      </ul>
    </div>
  ```

- fieldset 
  - <fieldset ngModelGroup="login">...</fieldset>
  - 里面数据会包在login对象内

- 父组件传递数据给子组件
  - 子组件中声明(类似vue中props)，每个都需要@Input() 来注解：
    - @Input() itemCount: number;
  - 子组件发送事件
    - @Output() textChanges = new EventEmitter<string>();
    - @Output onEnterUp = new EventEmitter<boolean>();
    - 泛型 直接决定了 this.onEnterUp.emit(true); // emit()方法参数的类型

- 封装成独立模块
  - 默认组件都申明在根模块AppModule当中；
  - 封装成module后；
  - module中需要有，自己的路由配置文件；
  - 根路由中，配置成redirectTo: 'todo'无组件路由；
  - 配置到根 app.module.ts的 imports:[...]中

- 组件属性同步,(同步到父组件的数据)
  - get set 并通过@Input() 注解修饰
  ```typescript
  export class TodoListComponent {
    _todos: Todo[] = [];
    @Input()
    set todos(todos: Todo[]) {
      this._todos = [...todos];
    }

    get todos() {
      return this._todos;
    }
  }
  ```
- module的全局单例
```typescript
// @Optional() @SkipSelf() 应该是这个框架最难懂的点了
// 理解了这个地方的单例，越是难的地方 越是通往核心的关键
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    // @SkipSelf()
  }
}
```
## 与RXjs的深度
```typescript
// class中这样定义属性
// todos: Observable<Todo[]>

let template = `<div>
  <app-todo-list
  [todos]="todos | async"
  >
  </app-todo-list>
</div>`;

</template>
```

## typescript部分
- JIT Just-In-Time
- AOT Ahead-Of-Time
- 推荐大家在dev时使用jit可以提高开发调试效率，在prod时使用aot

- RX响应式编程
- a = b + c 但在响应式编程中，a的值会随着b或c的更新而更新

- 类型断言
  - [参考地址](https://segmentfault.com/q/1010000010770590)
  ```typescript
  return this.http.get(this.api_url)
            .toPromise()
            .then(res => res.json().data as Todo[])
            .catch(this.handleError);
  // 这里的 as 关键字
  // typescript提供了两种语法：
  // 比typescript更了解某个值的详细信息，
  // 相当于告诉typescript，“相信我，我知道自己在干什么”。
  // 语法一：
  let someValue: any = "this is a string";
  let strLength: number = (<string>someValue).length;

  // 语法二：
  let someValue: any = "this is a string";
  let strLength: number = (someValue as string).length;
  // 注意： jsx中，只有as语法断言是被允许的
  ```

### complile-time run-time
- Interfaces are a compile-time language feature of TypeScript, and the compiler dose not generate any JavaScript code from intefaces that you include in your TypeScript projects.