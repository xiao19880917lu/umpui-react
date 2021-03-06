/**
 * @file 左侧边栏和上方导航配置
 * */
const NavData = {
    header: {
        icon: '../dist/img/logo.png',
        navData: {
            '实践案例': 'practice.php',
            '框架搭建': 'framework.php',
            '返回旧版': 'index_old.php'
        },
        menuData: {
            dropdown: {
                icon: '',
                name: '陆永芳',
                data: {
                    '设置': '?r=op/setting',
                    '退出': '?r=op/quit'
                }
            }
        },
        operationData: {
            'search': 'fa fa-search',
            'alert': 'fa fa-bell-o',
            'list': 'fa fa-list'
        }

    },
    siderBar: [{
        text: '简要介绍',
        key: 'Introduction',
        href: 'Introduction',
        icon: 'mif-home',
        isLeaf: false
    }, {
        text: '安装及快速使用',
        href: 'Install',
        key: 'Install',
        icon: 'mif-home',
        isLeaf: false
    }, {
        text: '更新日志',
        href: 'ChangeLog',
        key: 'ChangeLog',
        icon: 'mif-home',
        isLeaf: false
    }, {
        text: '组件',
        href: 'Component',
        key: 'Component',
        icon: 'mif-home',
        isLeaf: false,
        state: {
            expanded: true
        },
        nodes: [{
            text: 'table',
            href: 'table',
            key: 'table',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: '分页组件',
            href: 'pagination',
            key: 'pagination',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: 'FormSlider',
            href: 'formSlider',
            key: 'formSlider',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: '数据导出组件',
            href: 'export',
            key: 'export',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: '日期范围选择',
            href: 'rangeDatepicker',
            key: 'rangeDatepicker',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: 'Loading组件',
            href: 'loading',
            key: 'loading',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: 'tips弹出框',
            href: 'tipModal',
            key: 'tipModal',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: 'Form表单弹出框',
            href: 'formModal',
            key: 'formModal',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: '复选框列表弹出框',
            href: 'ckListModal',
            key: 'ckListModal',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: 'Form表单(纵向或者横向)',
            href: 'form',
            key: 'form',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: '自定义多个表单元素',
            href: 'tableForm',
            key: 'tableForm',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: '复选框-Label',
            href: 'checkbox',
            key: 'checkbox',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: '侧边栏-带router',
            href: 'treeView',
            key: 'treeView',
            isLeaf: true,
            icon: 'mif-home'
        },  {
            text: '自定义Tab',
            href: 'tab',
            key: 'tab',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: '一级或二级导航',
            href: 'nav',
            key: 'nav',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: 'list展示',
            href: 'list',
            key: 'list',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: 'Widget',
            href: 'Widget',
            key: 'Widget',
            isLeaf: true,
            icon: 'mif-home'
        },  {
            text: 'ReactHighcharts',
            href: 'ReactHighcharts',
            key: 'ReactHighcharts',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: 'Reacthighstock',
            href: 'ReactHighstock',
            key: 'ReactHighstock',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: '顶部导航组件',
            href: 'header',
            key: 'header',
            isLeaf: true,
            icon: 'mif-home'
        }, {
            text: 'Business组件',
            href: 'business',
            key: 'business',
            isLeaf: true,
            icon: 'mif-home'
        }]
    }]
};
export default NavData;
