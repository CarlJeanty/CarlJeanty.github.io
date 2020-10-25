
// You may wish to find an effective randomizer function on MDN.
function getRandomIntInclusive(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(org, compare, key) {
  if (org[key] < compare[key]) {
    return -1;
  } if (org[key] > compare[key]) {
    return 1;
  }
  return 0;
}


document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
     console.log(fromServer)
     if (document.querySelector('.flex-inner')){
      document.querySelector('.flex-inner').remove();
    }; 
    const  newArr = range(10);
    const newArr2 = newArr.map(() => {
    const number = getRandomIntInclusive(0,243);
      return fromServer[number];
    }); 
    const revL = newArr2.sort((org,compare) => sortFunction(compare,org,'name'));
    const ol = document.createElement('ol');
    ol.className = 'flex-inner';
    $('form').prepend(ol);

    revL.forEach((el,i) => {
      li = document.createElement('li');
      $(li).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
      $(li).append(`<label for=${el.code}>${el.name}</label>`);
      $(ol).append(li);
    });
    

    
      //console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});