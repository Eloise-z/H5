import {loginForm} from './loginInfo.json'

export default {
    // 登录检查
    loginCheck(user) {
        if (loginForm !== null) {
            for (let u of loginForm) {
                if (u.username === user.username && u.pwd === user.pwd) {
                    return true
                }
            }
        }
        return false
    }
}
