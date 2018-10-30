const request = async (api,data) => {
    const res = await fetch(api,{
        method:data ? 'POST' : 'GET',
        mode:'cors',
        body:JSON.stringify(data),
        headers:{
            'content-type':'application/json'
        }
    }).then(res => res.json()).then(res => res.data)
    return res
}
export default request
