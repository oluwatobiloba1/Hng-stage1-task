const http = require('node:http');

const currentDate = new Date()
const server = http.createServer((req,res)=>{
    const reqUrl = new URL(req.url,`http://${req.headers.host}`)
    const searchParams = {};
    reqUrl.searchParams.forEach((value,name)=>{
        searchParams[name] = value;
    })
    console.log(searchParams);
    
    if(req.method === 'GET' && req.url.startsWith('/api')){
        const hngInternDetail = {
            slack_name: searchParams.slack_name ??'slack name here',
            current_day: currentDate.getDay(),
            utc_time: currentDate.getUTCDate(),
            track: searchParams.track ?? "track here",
            github_file_url: "",
            github_repo_url: "https://github.com/oluwatobiloba1",
            status_code: 200
        }
        res.writeHead(200,{'Content-Type': "application/json"})
        res.end(JSON.stringify(hngInternDetail));

    }
})

server.listen(5000,()=>{
    console.log('server is running on port 5000');
})