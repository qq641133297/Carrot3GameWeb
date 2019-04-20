// vue.config.js
module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/': {
        target: 'http://106.14.191.79:3001', // target host
        ws: false, // proxy websockets
        changeOrigin: true // needed for virtual hosted sites
      }
    }
  }
}
