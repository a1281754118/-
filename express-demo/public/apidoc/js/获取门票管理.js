/**
 * 
 * @api {get} /ticket/get 获取门票管理界面
 * @apiName get
 * @apiGroup ticket
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {string} keyword 搜索内容
 * @apiParam  {string} size 一页行数
 * @apiParam  {string} page 第几页
 * 
 * @apiSuccess (请求成功状态200) {boolean} success 是否获取成功
 * @apiSuccess (请求成功状态200) {string} message 提示信息
 * 
 * @apiParamExample  {json} 请求实例: 
 * {
 *     keyword : 
 *     size: "1"
 *     page: "10"
 * }
 * 
 * 
 * @apiSuccessExample {json} 响应示例:
 * {
 *     "success" : true,
 *     "message" : "获取成功"
 * }
 * 
 * 
 */