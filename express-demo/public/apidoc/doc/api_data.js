define({ "api": [
  {
    "type": "get",
    "url": "/category/get",
    "title": "获取门票分类界面",
    "name": "get",
    "group": "category",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索内容</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求实例: ",
          "content": "{\n    keyword : \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "请求成功状态200": [
          {
            "group": "请求成功状态200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>是否获取成功</p>"
          },
          {
            "group": "请求成功状态200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "响应示例:",
          "content": "{\n    \"success\" : true,\n    \"message\" : \"获取数据\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "js/登陆界面.js",
    "groupTitle": "category",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/category/get"
      }
    ]
  },
  {
    "type": "get",
    "url": "/customer/get",
    "title": "用户信息界面",
    "name": "get",
    "group": "customer",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索内容</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "size",
            "description": "<p>一页行数</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "page",
            "description": "<p>第几页</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求实例: ",
          "content": "{\n    keyword : \n    size: \"1\"\n    page: \"10\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "请求成功状态200": [
          {
            "group": "请求成功状态200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>是否获取成功</p>"
          },
          {
            "group": "请求成功状态200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "响应示例:",
          "content": "{\n    \"success\" : true,\n    \"message\" : \"获取成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "js/用户管理界面.js",
    "groupTitle": "customer",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/customer/get"
      }
    ]
  },
  {
    "type": "post",
    "url": "/login",
    "title": "用户登录",
    "name": "login",
    "group": "login",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loginname",
            "description": "<p>登录名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n    \"loginname\" : \"admin\" ,\n    \"password\"  : \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "请求成功状态200": [
          {
            "group": "请求成功状态200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>是否登录成功</p>"
          },
          {
            "group": "请求成功状态200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ],
        "登录成功设置Cookie": [
          {
            "group": "登录成功设置Cookie",
            "type": "set-cookie",
            "optional": false,
            "field": "node_auth",
            "description": "<p>设置cookie，值是签名过的用户名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "响应示例:",
          "content": "{\n    \"success\" : true,\n    \"message\" : \"登录成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "js/门票分类管理界面.js",
    "groupTitle": "login",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/login"
      }
    ]
  },
  {
    "type": "get",
    "url": "/ticket/get",
    "title": "获取门票管理界面",
    "name": "get",
    "group": "ticket",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索内容</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "size",
            "description": "<p>一页行数</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "page",
            "description": "<p>第几页</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求实例: ",
          "content": "{\n    keyword : \n    size: \"1\"\n    page: \"10\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "请求成功状态200": [
          {
            "group": "请求成功状态200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>是否获取成功</p>"
          },
          {
            "group": "请求成功状态200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "响应示例:",
          "content": "{\n    \"success\" : true,\n    \"message\" : \"获取成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "js/获取门票管理.js",
    "groupTitle": "ticket",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/ticket/get"
      }
    ]
  }
] });
