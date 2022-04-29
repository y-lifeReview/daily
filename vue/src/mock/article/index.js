import Mock, { Random } from "mockjs";
import { baseData } from "../base.js";

import {urlForGetMockArticle} from '@/api/url';

Mock.mock(RegExp(urlForGetMockArticle),function(){
    return Mock.mock({
        ...baseData,
        data:[
            {
                md_url:function(){
                    return Random.url()
                },
                category:function(){
                    return Random.capitalize(Random.word(4,8))
                },
                create_at:function(){
                    return Random.datetime()
                },
                updata_at:function(){
                    return Random.datetime()
                },
                article_view:function(){
                    return Random.integer(254,3542)
                }
            }
        ]
    })
})