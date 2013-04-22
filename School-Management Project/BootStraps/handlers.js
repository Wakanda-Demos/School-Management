/**

* @author admin

*/

directory.setLoginListener("loginHandler");
addHttpRequestHandler('/logmein' , 'Scripts/handlersImpl.js' , 'loginMe');
addHttpRequestHandler('/getCal' , 'Scripts/handlersImpl.js' , 'exportCal');

// Temporary handlers :
addHttpRequestHandler('^/$' , 'Scripts/handlersImpl.js' , 'index');

ds.Utils.generateRandomData();
