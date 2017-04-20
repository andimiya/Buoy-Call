export function getAllUsers(){
  return new Promise((resolve, reject) =>{
    function reqListener(){
      let data = JSON.parse(this.responseText)
      resolve(data)
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListener)
    oReq.open('GET', '/api/users'); 
    oReq.setRequestHeader('Content-Type', 'application/json')
    oReq.send();
  })
}

export const auth = {
  login() {
    return false
    //if(loggedin){
    //   return;
    // }
  },

  test(){
    console.log("hello")
  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    delete localStorage.token;
    if(cb){
      cb();
      this.onChange(false);
    }
  },

  loggedIn() {
    return !!localStorage.token;
  },

  onChange(){}
}