
// const md5 = require('md5-node')
const qqMusic  = require('qq-music-api')

const getMusicList =  function () {
    return qqMusic.api('songlist',{
        id:1574204418
    })
}
const getMusicCookie =  function () {
    return qqMusic.api('user/getCookie',{
        id:1847868423
    })
}
const setMusicCookie =  function () {
    return qqMusic.api('/user/setCookie',{
        data:'pgv_pvi=5355928576; RK=wthd42kMGl; ptcz=40cd35ffc2df7c087ae7cd586ea1b8a5bc4c81cae69395cf36ef1e9fc50beeb3; tvfe_boss_uuid=0f299b179c7d3386; ts_uid=708092760; o_cookie=1847868423; eas_sid=c1s6u2I7o2e6j57364m2z6B4i6; pgv_pvid=240386338; pac_uid=1_1847868423; iip=0; _qpsvr_localtk=0.18585826670734362; pgv_info=ssid=s3096846545; fqm_pvqid=62a4f656-dfd5-428f-af1b-64c22f01d787; fqm_sessionid=2ed6b984-27f9-4992-9b54-9429721f778e; tmeLoginType=2; euin=oKcP7icsNevAoz**; ptui_loginuin=1847868423; ts_refer=jsososo.github.io/; login_type=1; wxopenid=; psrf_musickey_createtime=1652174923; qqmusic_key=Q_H_L_5afxoSf-oOdgB2sdfrgMNyKosEVtYX4QEyYxAx_je_LsOObnRSnbLmg; psrf_qqrefresh_token=85C72F2550F9DC9DEE7C83322BE63CAB; qm_keyst=Q_H_L_5afxoSf-oOdgB2sdfrgMNyKosEVtYX4QEyYxAx_je_LsOObnRSnbLmg; psrf_qqaccess_token=B613E382D9EEE5870CA68EF9DBC67830; wxunionid=; uin=1847868423; psrf_access_token_expiresAt=1659950923; psrf_qqunionid=5DEB8F9A85F73EA2B88A24ACD07E9B45; qm_keyst=Q_H_L_5afxoSf-oOdgB2sdfrgMNyKosEVtYX4QEyYxAx_je_LsOObnRSnbLmg; psrf_qqopenid=FE702C65DB4E7E4BAA89C163E327A7E6; wxrefresh_token=; ts_last=y.qq.com/n/ryqq/profile'
    })
}
const getMusicUrls =  function (ids) {
    console.log(ids)
    return qqMusic.api('song/urls',{
        id:ids
    })
}

module.exports = {
    getMusicList,
    getMusicUrls,
    getMusicCookie,
    setMusicCookie
}