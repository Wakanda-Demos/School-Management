/**

* @author admin

*/

directory.setLoginListener("loginHandler");
addHttpRequestHandler('/logmein' , 'Scripts/handlersImpl.js' , 'loginMe');
addHttpRequestHandler('/getCal' , 'Scripts/handlersImpl.js' , 'exportCal');

new SharedWorker("Workers/initApp.js", "InitApp");
