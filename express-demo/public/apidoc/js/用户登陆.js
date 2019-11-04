/**
 * 
 * @api {post} /login 用户登录
 * @apiName  login
 * @apiGroup login
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {string} loginname 登录名
 * @apiParam  {string} password  密码
 * 
 * @apiSuccess (请求成功状态200) {boolean} success 是否登录成功
 * @apiSuccess (请求成功状态200) {string} message 提示信息
 * 
 * @apiSuccess (登录成功设置Cookie) {set-cookie} node_auth 设置cookie，值是签名过的用户名
 *
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *     "loginname" : "admin" ,
 *     "password"  : "123456"
 * }
 * 
 * @apiSuccessExample {json} 响应示例:
 * {
 *     "success" : true,
 *     "message" : "登录成功"
 * }
 * 
 */
