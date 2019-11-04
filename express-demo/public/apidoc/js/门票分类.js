/**
 * 
 * @api {get} /category/get 获取门票分类界面
 * @apiName get
 * @apiGroup category
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {string} keyword 搜索内容
 * 
 * @apiSuccess (请求成功状态200) {boolean} success 是否获取成功
 * @apiSuccess (请求成功状态200) {string} message 提示信息
 * 
 * @apiParamExample  {json} 请求实例: 
 * {
 *     keyword : 
 * }
 * 
 * 
 * @apiSuccessExample {json} 响应示例:
 * {
 *     "success" : true,
 *     "message" : "获取数据"
 * }
 * 
 * 
 */