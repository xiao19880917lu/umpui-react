/**
 * @file 左侧边栏和上方导航配置
 * */
const NavData = {
    header: {
        icon: '../dist/img/logo.png',
        navData: {
            '实践案例': 'practice.php',
            '框架搭建': 'framework.php',
            '返回旧版': 'index_old.php',
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
        }
    },
    siderBar: [{
        text: '简要介绍',
        href: 'Introduction',
        icon: 'mif-home',
        id: 1
    }, {
        text: '安装及快速使用',
        href: 'Install',
        icon: 'mif-home',
        id: 2
    }, {
        text: '组件',
        href: 'Component',
        icon: 'mif-home',
        nodes: [{
            text: 'table',
            href: 'table',
            icon: 'mif-home',
            id: 3
        }, {
            text: 'FormSlider',
            href: 'formSlider',
            icon: 'mif-home',
            id: 4
        }, {
            text: 'tips弹出框',
            href: 'tipModal',
            icon: 'mif-home',
            id: 5
        }, {
            text: 'Form表单弹出框',
            href: 'formModal',
            icon: 'mif-home',
            id: 5
        }, {
            text: 'checkbox列表弹出框',
            href: 'ckListModal',
            icon: 'mif-home',
            id: 5
        }, {
            text: 'Form表单(纵向或者横向)',
            href: 'form',
            icon: 'mif-home',
            id: 5
        }, {
            text: '自定义多个表单元素',
            href: 'tableForm',
            icon: 'mif-home',
            id: 5
        }, {
            text: '带有checkbox-label的元素选择',
            href: 'checkbox',
            icon: 'mif-home',
            id: 5
        
        }, {
            text: '侧边栏-带router',
            href: 'treeView',
            icon: 'mif-home',
            id: 5
        }, {
            text: '图表widget-highcharts',
            href: 'widgetCharts',
            icon: 'mif-home',
            id: 5
        }, {
            text: '顶部导航组件',
            href: 'header',
            icon: 'mif-home',
            id: 5
        }]
    }]
};
export default NavData;
