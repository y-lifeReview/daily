let getClientIp = function (req) {
    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
        // console.log(ip.match(/\d+.\d+.\d+.\d+/));
        ip = ip.match(/\d+.\d+.\d+.\d+/)[0]
        // console.log(ip);
        return ip
};
module.exports = getClientIp
// let ip = getClientIp(req);

