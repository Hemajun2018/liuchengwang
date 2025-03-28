import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置NProgress
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.1,
  easing: 'ease',
  speed: 500
});

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/LoginView.vue'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  {
    path: '/',
    component: () => import('../components/layout/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/dashboard/DashboardView.vue'),
        meta: {
          title: '仪表盘',
          icon: 'Menu'
        }
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('../views/projects/ProjectListView.vue'),
        meta: {
          title: '项目管理',
          icon: 'Folder'
        }
      },
      {
        path: 'projects/create',
        name: 'ProjectCreate',
        component: () => import('../views/projects/ProjectCreateView.vue'),
        meta: {
          title: '创建项目',
          icon: 'Plus',
          hideInMenu: true
        }
      },
      {
        path: 'projects/:id',
        name: 'ProjectDetail',
        component: () => import('../views/projects/ProjectDetailView.vue'),
        meta: {
          title: '项目详情',
          hideInMenu: true,
          dynamicTitle: true
        },
        props: true
      },
      {
        path: 'projects/:id/nodes',
        name: 'NodeList',
        component: () => import('../views/nodes/NodeListView.vue'),
        meta: {
          title: '节点管理',
          hideInMenu: true,
          dynamicTitle: true,
          parentTitle: '项目管理'
        },
        props: true
      },
      {
        path: 'nodes/:nodeId/issues',
        name: 'IssueList',
        component: () => import('../views/issues/IssueListView.vue'),
        meta: {
          title: '问题管理',
          hideInMenu: true,
          dynamicTitle: true
        },
        props: true
      },
      {
        path: 'nodes/:nodeId/materials',
        name: 'MaterialList',
        component: () => import('../views/materials/MaterialListView.vue'),
        meta: {
          title: '材料管理',
          hideInMenu: true,
          dynamicTitle: true
        },
        props: true
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../views/users/UserListView.vue'),
        meta: {
          title: '用户管理',
          icon: 'User'
        }
      }
    ]
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '页面不存在',
      hideInMenu: true
    }
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// 路由守卫
router.beforeEach((to, _, next) => {
  // 开始加载进度条
  NProgress.start();
  
  // 设置页面标题
  let title = '流程王';
  if (to.meta.title) {
    if (to.meta.dynamicTitle && to.meta.currentTitle) {
      title = `${to.meta.currentTitle} - ${title}`;
    } else {
      title = `${to.meta.title} - ${title}`;
    }
  }
  document.title = title;
  
  // 获取token
  const token = localStorage.getItem('token');
  
  // 检查是否需要登录权限
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth && !token) {
    // 如果需要认证但没有token，重定向到登录页
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else if (to.path === '/login' && token) {
    // 如果已登录但访问登录页，重定向到首页
    next('/');
  } else {
    next();
  }
});

// 路由后置钩子
router.afterEach(() => {
  // 结束加载进度条
  NProgress.done();
});

export default router; 