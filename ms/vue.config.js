module.exports = {
    devServer: {
        port:8000,
        proxy: {
            //   /api/login
            '/api': {
                target: 'http://localhost:3000', // http://localhost:3000/api/login
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/"
                }
            },
            "/images":{
                target: 'http://localhost:3000', // http://localhost:3000/api/login
                changeOrigin: true,
            }
        }
    }
}