/**
 * 实现鼠标hover上时的信息展示
 * 使用方法如：
 *  var elem = $('#is_permit_reinstall_0').parents('tr');
 *  var data = {
 *		'情况1:':'硬件故障无法保留/home分区',
 *		'情况2:':'分区已损坏，无法保留/home分区'
 *	};
 *	card.init(config,evnetType)
 *  @params  config一些配置
 *  @params  eventType 现在支持hover‘
 *  @file 提示框插件
 *  @author luyongfang
 */
var Card = {
    isCardShow: false,
    defaultConfig: {
        // 单纯的string,'object','request','server_status'
        type: 'object',
        keyWidth: 10,
        valueWidth: 100,
        showFields: undefined,
        chMaps: undefined,
        data: '',
        arrow_direction: 'left',
        showIcon: false,
        iconsMap: {
            'phone': 'glyphicon glyphicon-phone',
            'name': 'glyphicon glyphicon-user',
            'email': 'glyphicon glyphicon-envelope',
            'company': 'glyphicon glyphicon-home',
            'default': 'glyphicon  glyphicon-map-marker'
        },
        // request类型，可以传递的参数
        params: {},
        indivParamName: ''
    },
    init: function (config, eventType, e) {
        var cfg = $.extend({}, Card.defaultConfig, config, true);
        var eventType = eventType ? eventType : 'hover';
        var elem = config.elem;
        var timeFn = false;
        var isVisible = false;
        switch (eventType) {
            case 'click':
                $(elem).die('click').live('click', function (e) {
                    e.stopPropagation();
                    var target = $(e.target);
                    var params = JSON.parse(target.attr('data_val'));
                    config.data = params;
                    Card.disposal(config, target);
                    // 阻止冒泡事件
                    return false;
                });
            case 'leave':
                Card.hideCard();
            /*	elem.hover(function(e) {
                    Card.showCard(cfg,e.pageX,e.pageY);
                },function() {
                    Card.hideCard();
                });
                break;*/
                break;
            case 'hover':
                Card.showCard(cfg, e.pageX, e.pageY);
                return;
                /*elem.unbind("mouseenter,mouseleave").bind('mouseenter',function(e){
                    if(cfg.type == 'request' && Card.isCardShow == true){
                        return ;
                    }
                    if(cfg.indivParamName){
                        var val = JSON.parse($(e.target).attr('data_val'));
                        cfg = $.extend(cfg,{"params":val},true);
                    }
                    timeFn&&clearTimeout(timeFn);
                    timeFn = setTimeout(function() {
                        Card.showCard(cfg,e.pageX,e.pageY);
                        isVisible = true;
                        Card.isCardShow = true;
                    },isVisible?10:150);
                }).bind('mouseleave',function(e){
                    timeFn&&clearTimeout(timeFn);
                    timeFn = setTimeout(function(){
                        Card.hideCard();
                        isVisible = false;
                        Card.isCardShow = false;
                    },100);
                });
                $('#cus_card').die('mouseenter,mouseleave').live('mouseenter',function(e) {
                    timeFn&&clearTimeout(timeFn);
                }).live('mouseleave',function() {
                    timeFn&&clearTimeout(timeFn);
                    timeFn = setTimeout(function(){
                        Card.hideCard();
                        isVisible = false;
                        Card.isCardShow = false;
                    },10);
                })*/
                break;
        }
    },
    createRequestCard: function (config, pageX, pageY) {
        var html = ['<div id="cus_card" style="display:none"><span class="right"></span>'];
        var keyWidth = config.keyWidth;
        var valueWidth = config.valueWidth;
        var keyStyle = ' style="width:' + keyWidth + 'px"';
        var valueStyle = ' style="width:' + valueWidth + 'px"';
        if (config.showFields) {
            $.each(config.showFields, function (dex, key) {
                var className = config.iconsMap[key] ? config.iconsMap[key] : config.iconsMap['default'];
                var curKey =  (config.chMaps !== undefined && config.chMaps) ? config.chMaps[key] : key;
                html.push('<div>');
                html.push('<strong class="' + className + '"></strong><span ' + keyStyle + '>', curKey, '</span><span ' + valueStyle + '>', config.data[key], '</span></div>');
            });
        }else {
            $.each(config.data, function (key, obj) {
                var className = config.iconsMap[key] ? config.iconsMap[key] : config.iconsMap['default'];
                var curKey =  (config.chMaps !== undefined && config.chMaps) ? config.chMaps[key] : key;
                html.push('<div>');
                html.push('<strong class="' + className + '"></strong><span ' + keyStyle + '>', curKey, '</span><span' + valueStyle + '>', obj, '</span></div>');
            });
        }
        html.push('</div>');
        $('body').append(html.join(''));
        Card.setPosition(config, pageX, pageY);
    },
    disposal: function (config, target) {
        var cfg = $.extend(Card.defaultConfig, config, true);
        switch (cfg.type) {
            case 'server_status':
                Card.searchUnifiedListByServer(cfg, target);
                break;
        }
    },
    showCard: function (config, pageX, pageY) {
        if ($('#cus_card').length > 0) {
            Card.setPosition(config, pageX, pageY);
        }
        switch (config.type) {
            case 'string' :
                Card.createStringCard(config, pageX, pageY);
                break;
            case 'object':
            case 'array' :
                Card.createObjectOrArrayCard(config, pageX, pageY);
                break;
            case 'request':
                if (!config.url) {
                    // Rms.msg.warning('url没有配置');
                }
                $.ajax({
                    url: config.url,
                    data: config.params,
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (data) {
                        if (data.status * 1 === 0) {
                            config.data = data.data || data.result || {};
                            Card.createRequestCard(config, pageX, pageY);
                        }else {
                            // Rms.msg.warning(data.msg || data.messege);
                        }
                    },
                    error: function () {
                        // Rms.msg.error("请求出错:".concat(config.url));
                    }
                });
                break;
        }
    },
    createStringCard: function (config, pageX, pageY) {
        if ($('#cus_card').length > 0) {
            Card.setPosition(config, pageX, pageY);
            return;
        }
        var data = config.data;
        if (data && typeof(data) === 'string') {
            var html = ['<div id="cus_card" style="display:none"><span class="' + config.arrow_direction + '"></span><span>'];
            html.push(data);
            html.push('</span><span class="extra"></span></div>');
            $('body').append(html.join(''));
            var height = ''.concat($('#cus_card').height()).concat('px');
            $('#cus_card .extra').css({
                'line-height': height,
                'height': height,
                'vertical-align': 'middle'
            });
            $('#cus_card').css({
                background: '#fff'
            });
        }
        Card.setPosition(config, pageX, pageY);
    },
    createObjectOrArrayCard: function (config, pageX, pageY) {
        if ($('#cus_card').length > 0) {
            Card.setPosition(config, pageX, pageY);
            return;
        }
        var data = config.data;
        if (typeof(data) !== 'array' && typeof(data) !== 'object') {
            // Rms.msg.warning('所传参数应该是数组或者对象');
            return;
        }
        var html = ['<div id="cus_card" style="display:none"><span class="' + config.arrow_direction + '"></span>'];
        var keyStyle = ' style="width:' + config.keyWidth + 'px"';
        var valueStyle = ' style="width:' + config.valueWidth + 'px"';
        $.each(data, function (key, obj) {
            html.push('<div>');
            if (config.showIcon) {
                var className = config.iconsMap[key] ? config.iconsMap[key] : config.iconsMap['default'];
                html.push('<strong class="' + className + '"></strong><span ' + keyStyle + '>', key, '</span><span' + valueStyle + '>', obj, '</span></div>');
            }else {
                html.push('<span ' + keyStyle + '>', key, '</span><span' + valueStyle + '>', obj, '</span></div>');
            }
        });
        html.push('</div>');
        $('body').append(html.join(''));
        Card.setPosition(config, pageX, pageY);
    },
    searchUnifiedListByServer: function (config, target) {
        var data_val = target.attr('data_val');
        var obj = JSON.parse(data_val);
        // 查询参数定义
        window.open('?r=query/jobs&hostname=' + obj['hostname'] + '&sn=' + obj['sn'] + '');
    },
    setPosition: function (config, pageX, pageY) {
        switch (config.arrow_direction) {
            case 'left':
                pageX = pageX + 15;
                pageY = pageY - 25;
                break;
            case 'right':
                pageX = pageX - $('#cus_card').outerWidth() - 10;
                pageY = pageY - 25;
                break;
            case 'up':
                pageY = pageY + 25;
                break;
        }
        $('#cus_card').css({
            position: 'absolute',
            display: 'block',
            left: pageX,
            top: pageY - 10
        });
    },
    hideCard: function () {
        $('#cus_card').remove();
    }
};
export default Card;
