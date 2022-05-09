
const md5 = require('md5-node')
const qqMusic  = require('qq-music-api')
// const getCookie = function(){
//     return qqMusic.api('user/collect/songlist',{
//         id:1847868423
//     })
// }
const getMusicList =  function () {
    // getCookie().then((res)=>{
    //     console.log('cookie:',res)
    // }).catch((err)=>{
    //     console.log('获取cookie失败',err)
    // })
    return qqMusic.api('songlist',{
        id:1574204418
    })
    
    // const result = await playlist_detail({
    //     id: 2188281118,
    //     cookie:'EVNSM=1.0.0; osver=9; deviceId=ODY4OTk0MDQxNzk5MDAzCWRjOmYwOjkwOmI3OjZmOmJkCWRiNjIwYTUwYTAxODAwNGUJZWUxZjMwMjhjNGVmNDgyYQ%3D%3D; NMDI=Q1NKTQkBDACvETwvhPKoJINrz9hBAAAAuMMpCgrPuza2vLiKHgVeutUO0Wbh2ykgrgdMWcL%2FwMLAFvUnKjy9xH5k6viOdjiyF%2B%2BO7FU4dtyNxN3Cuwhr%2BWo%3D; appver=8.7.41; NMCID=nebwky.1652068267405.01.4; versioncode=8007041; mobilename=NX619J; buildver=220427163047; resolution=2160x1080; os=android; channel=tencent'
    // })
    // console.log('music login', result)
    // return result

}

module.exports = {
    getMusicList
}