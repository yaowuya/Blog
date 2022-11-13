import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    server: {
        host: "localhost",
        port: 3000,
        proxy: {
            "/api": {
                // 匹配请求路径
                target: "http://localhost:8000/", // 代理的目标地址
                changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
                ws: false, // 是否代理websockets
                // 这里新增一个配置
                secure: false,
                rewrite: (pathStr) => pathStr.replace("/api", ""), // 路径重写
                timeout: 5000,
            },
        },
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
});
