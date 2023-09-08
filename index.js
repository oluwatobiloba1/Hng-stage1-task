const http = require('node:http');
// const fetch = require('node:fetch');
// require('dotenv').config()

// const authToken = process.env.GITHUB_TOKEN

// console.log(authToken)

// fetch('https://api.github.com/repos/oluwatobiloba1/repository', {
//   headers: {
//     'Authorization': `token ${authToken}`
//   }
// })
// .then(response => response.json())
// .then(data => {
//   console.log(data);
// })


const currentDate = new Date()
const server = http.createServer((req,res)=>{
    const reqUrl = new URL(req.url,`http://${req.headers.host}`)
    const searchParams = {};
    reqUrl.searchParams.forEach((value,name)=>{
        searchParams[name] = value;
    })
  
    
    if(req.method === 'GET' && req.url.startsWith('/api')){
        const hngInternDetail = {
            slack_name: searchParams.slack_name ??'slack name here',
            current_day: currentDate.toLocaleString('en-us', {  weekday: 'long' }),
            utc_time: currentDate.toISOString().split('.')[0] +'Z',
            track: searchParams.track ?? "track here",
            github_file_url: "https://github.com/oluwatobiloba1/Hng-stage1-task/blob/main/index.js",
            github_repo_url: "https://github.com/oluwatobiloba1/Hng-stage1-task",
            status_code: 200
        }
        res.writeHead(200,{'Content-Type': "application/json"})
        res.end(JSON.stringify(hngInternDetail));

    }
    else{
        res.writeHead(404,{'Content-Type': "application/json"})
        res.end(JSON.stringify({message: "you must be trying to access the '/api' route. Don't forget to do that and include the search params"}));
    }
})

server.listen(5000,()=>{
    console.log('server is running on port 5000');
})