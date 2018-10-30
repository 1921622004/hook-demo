const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Route = require('koa-router')();
const cors = require('@koa/cors');

const app = new koa();

let mockData = [
    {
        content: '学习angular',
        isChecked: false,
        id: 0
    },
    {
        content: '学习PWA',
        isChecked: false,
        id: 1
    }
]

app.use(cors());
app.use(bodyParser());

Route.get('/api/list', async ctx => {
    ctx.body = ({
        success: true,
        data: mockData.map(item => item.id)
    })
})

Route.post('/api/add', async ctx => {
    const { content, isChecked } = ctx.body;
    mockData.push({ content, isChecked })
    ctx.body = ({
        success: true,
        data: null
    })
})

Route.get('/api/find', async ctx => {
    const { id } = ctx.request.query;
    const res = mockData.find(item => item.id == id);
    ctx.body = ({
        success: true,
        data: res
    })
})

Route.get('/api/del', async ctx => {
    const { id } = ctx.request.query;
    mockData = mockData.filter(item => item.id != id);
    ctx.body = ({
        success: true,
        data: null
    })
})

app.use(Route.routes());
app.listen(4040);