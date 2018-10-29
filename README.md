# react-hook demo

## 简介
就在前几天，react在新的16.7.0-alpha.0版本中推出了新的hooks函数，其作用就是让你可以不用类组件就可以使用react的state和其他功能。众所周知，class的写法有的时候对新手其实是很难的，比如其中的this问题等等。本篇文章主要介绍函数包括这几个`useState`、`useEffect`、`useContext`、`useRef`，这篇文章主要介绍一下这些函数的作用。

### useState
比如说有一个组件需要内部维护自己的状态，之前我们写class组件的话一般都是定义一下state，然后需要修改的时候，用setState去修改自身的状态。**useState**这个函数就是起到了这个作用，接受一个参数`initialState`，也就是初始的state，同时返回一个数组，第一个是当前的state，第二个就是相当于以前class组件的setState，每次调用这个函数都会更新state同时让当前组件重新渲染一遍，看一下简单的count计数器用hooks怎么写
```javascript
function Cunter() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('hello-react');
  console.log('render ===============');
  return (
    <div className="count-box">
      <h1 className="title">点了{count}次</h1>
      <button onClick={() => {
        setCount(count + 1);
        setTitle('hello-hooks');
      }}>
        Click Me!
      </button>
      <p>{title}</p>
    </div>
  )
}
```
上面这个组件在点击button后，打开控制台看到两次更改状态只render了一次，所以这里的useState也是会将一次循环中的state变化合并，然后一起更新。
同时在function组件中，useState可以调用多次，但不意味着一定要这样写，当然，initialState可以是数组也可以是对象，所以你可以在一次set函数中直接修改像class组件中调用setState一样，不过这样写的话，我觉得语义更加清晰。


### useEffect
使用这个函数你可以通知react在当前组件每次渲染完成之后需要完成什么动作，我觉得其作用可以理解为与之前的`componentDidMount`和`componentDidUpdate`两个生命周期函数类似。
这个函数支持两个参数，第一个参数是一个函数，会在每次render之后执行，同时这个函数也可以返回一个函数，这个函数会在组件卸载后执行，类似于类组件的`componnentDidUnmount`生命周期函数。
举个例子，比如说我们想实时获取窗口的宽度，然后在这个组件被卸载的时候取消这个功能。看下代码
```javascript
function Width() {
    const [width,setWidth] = useState(window.innerWidth);
    const setWidthFn = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize',setWidthFn);
        return () => {
            window.removeEventListener('resize',setWidthFn)
        }
    });
    return(
        <div>
            <h1>当前窗口宽度{width}px</h1>
        </div>
    )
}
```
但是这样也有缺点，就是每次render的时候都会执行一遍这个函数，有的时候我们并不希望都去执行，比如说一个详情组件在第一次render的时候会跟根据props传递过来的id去取值，如果这样写的话，每一次render都会重新请求一遍，react已经帮我们做好了处理，我们可以给useEffect函数传递第二个参数，****** 这样，请求详情的这个函数就只会在id改变的时候执行。

### useRef
这个函数同样会接受一个initialState作为参数，同时返回一个对象，其中的current就是你当前传递进去的initialState，你可以把返回的对象作为ref属性，传递给子组件来获取DOM对象，同时你也可以用它来获取previousProps，用法如下：
```javascript
function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;

  return <h1>Now: {count}, before: {prevCount}</h1>;
}
```

### useContext
用法很简单，将React.createContext返回的结果传入useContext即可，同时context改变的时候也会引发该组件重新渲染。

### useReducer
这个函数简直和redux一模一样了，不多介绍。

### custom hooks & todo-app
我们可以把hooks函数抽象出来，实现复用，具体怎么用，还是看下代码吧。

### 注意点
- hooks函数可以让你用function组件来完成很多class组件的生命周期函数，但是目前还不支持`getSnapshotBeforeUpdate`和`componentDidCatch`，但是不能在class函数组件中使用，同时也不建议一个项目里面两者混用，保持团队的一致性。
- hooks函数在函数组件中最好写在Top Level，当然也不是非要这样，主要是要保证每次组件render的时候都写入一致的hooks函数，不要根据某个条件判断决定是否要使用hooks。 

### 写在最后
这里我想引用一下Dan在React Conf上[关于Hooks的演讲](https://www.youtube.com/watch?v=dpw9EHDh2bM)，简单翻译一下。
> 我开始学习react的时候想过两个问题，一个是为什么要用JSX，第二个是react的logo和react有什么关系，这个项目也不叫做Atom（原子），也不是一个物理引擎，其中的一个解释是基于reaction（反应）的，化学反应就是基于原子在其中的表现，所以叫react。但是，我发现了一个更合理的解释，我觉得是这样，原子的种类和属性决定了物理反应的表现和形态，react让我知道了你可以把用户界面分离成一个个独立的个体，这个个体叫做组件，这些组件的属性和种类决定了用户界面的外观和特效。可是搞笑的是，Atom这个词的本身含义就是不可分离的，当科学家们第一次发现原子的时候，他们以为这就是最小的物质，但不久他们就发现了电子，电子就是原子中更小的一部分，电子对原子如何表现进行了更深一层的解释。我觉得hooks就像是电子一样，他不是一个新的功能，他只是让我能够使用那些react已知的功能，比如说state（状态），context（上下文），life cycle生命周期函数，hooks是react一种更直接的表达方式，更好的解释了组件如何在内部工作的，我觉得这些已经隐藏了长达四年久，现在你看一下react的logo，你可以看到那些电子的运动轨道，所以说hooks可能就一直存在，就像logo上的电子轨道一样。


