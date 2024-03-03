
import router from "../router";


router.beforeEach(async (to) => {
    // to and from are both route objects. must call `next`.
    // console.log('beforeEach', to)
    if (to.meta.title) { // 判断是否有标题
        document.title = to.meta.title;
      }

})
router.afterEach(() => {
    
});