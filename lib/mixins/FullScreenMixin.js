/**
 * @file 根据英文名请求详细信息等
 * **/
const FullScreenMixin = {
    launchFullScreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullscreen) {
            elem.mozRequestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    },
    ExitFullScreen(elem) {
        if (elem.cancelFullScreen) {
            elem.cancelFullScreen();
        } else if (elem.mozCancelFullScreen) {
            elem.mozCancelFullScreen();
        } else if (elem.webkitCancelFullScreen) {
            elem.webkitCancelFullScreen();
        }
    }
};
export default FullScreenMixin;
