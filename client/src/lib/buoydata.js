exports = function loadData(){
  return new Promise((resolve, reject) => {
    function reqListener(){
      const parsedData = JSON.parse(this.responseText);
      console.log('loadData', parsedData);
      resolve(parsedData);
    }
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", 'http://localhost:8080/allbuoys');
    oReq.send();
  });
};