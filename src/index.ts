import  { App }  from "./initialize/index"


(async ()=>{

  const application = new App()
  const server = await application.appInitialize()

  server.start()
})();
