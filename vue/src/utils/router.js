import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "../router";

NProgress.configure({
    showSpinner: false,
});

router.beforeEach(async (to) => {
    // to and from are both route objects. must call `next`.
    console.log('beforeEach', to)
    NProgress.start();

})
router.afterEach(() => {
    NProgress.done();
});