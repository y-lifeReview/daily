// ispassword
import {
    urlForArticleIsPassword,
    urlForArticleCheckPassword
} from '@/api/url'
import { useGet ,usePost} from '.'
let get = useGet(),post = usePost()
const articleispasswprd = function (id) {
    return get({
        url:urlForArticleIsPassword,
        data:{
            id
        }
    })
}
const articlecheckpasswprd = function (id,content) {
    return post({
        url:urlForArticleCheckPassword,
        data:{
            id,
            content
        }
    })
}
export {
    articleispasswprd,
    articlecheckpasswprd
}