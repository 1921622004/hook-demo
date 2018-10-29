# react-hook demo

## 简介
就在前几天，react在新的16.7.0-alpha.0版本中推出了新的hooks函数，其作用就是让你可以不用类组件就可以使用react的state和其他功能。众所周知，class的写法有的时候对新手其实是很难的，比如其中的this问题。本篇文章主要介绍函数包括这几个`useState`、`useEffect`、`useContext`、`useRef`，这篇文章主要介绍一下这些函数的作用。

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
同时在function组件中，useState可以调用多次，当然，initialState可以是数组也可以是对象，也就是说不一定要这样写，不过这样写的话，我觉得语义更加清晰。
上面这个组件在点击button后，打开控制台看到两次更改状态只render了一次，所以这里的useState也是会将一次循环中的state变化合并，然后一起更新。

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



### useReducer
这个函数简直和redux一模一样了，不多介绍。