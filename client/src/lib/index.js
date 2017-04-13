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