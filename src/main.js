import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// 创建 Apollo 客户端的一个实例，并传入 GraphQL 端点的 URL
const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/graphql', // graphql服务的地址 （注意服务端开启cors）
});

Vue.use(VueApollo); // 使用 VueApollo 插件将 Apollo 集成到我们的 Vue APP 中

// 创建了 Apollo Provider，它包含所有 Vue 组件都可以使用的 Apollo Client 实例。
const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
    apolloProvider, // 将 Apollo Provider 添加到 Vue 实例中
}).$mount('#app');
