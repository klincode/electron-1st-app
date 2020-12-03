
let items = document.getElementById('items')

//track items in storage
//poiberz dane ze storage , a jeśli ich nie ma to utwórz pustą tablicę
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

//[resist storage
exports.save=()=>{
  localStorage.setItem('readit-items',JSON.stringify(this.storage))
}

//set item as selected
exports.select = e=>{
  //remove currnetly selecterd item class
  document.getElementsByClassName('read-item selected')[0].classList.remove('selected');

  //add to clickied item
  e.currentTarget.classList.add('selected');

}


//move to newly selected item
exports.changeSelection = direction =>{
  console.log(direction);
  let currentItem = document.getElementsByClassName('read-item selected')[0]
  //handle up/down
  if (direction ==='ArrowUp' && currentItem.previousElementSibling) {
    currentItem.classList.remove('selected');
    currentItem.previousElementSibling.classList.add('selected')
  } else if (direction==='ArrowDown' && currentItem.nextElementSibling) {
    currentItem.classList.remove('selected');
    currentItem.nextElementSibling.classList.add('selected')
  }
}

//open selected item
exports.open =()=>{
  //only if we have items 
  if (!this.storage.length) return;

  let selectedItem = document.getElementsByClassName('read-item selected')[0];

  //get items url
  let contentUrl = selectedItem.dataset.url;
  console.log('Opening item ',contentUrl);

}
//add new item
exports.addItem = (item,isNew=false) => {
  // create new dom node
  let itemNode = document.createElement('div');
  itemNode.setAttribute('class','read-item');

  //set item url in dataset
  itemNode.setAttribute('data-url',item.url);
  itemNode.innerHTML = `<img src="${item.screenshot}"> <h2>${item.title}</h2>`
  items.appendChild(itemNode)

//attach click handler select
itemNode.addEventListener('click',this.select);


//attach double click to open item
itemNode.addEventListener('dblclick',e=>{
  this.open();
})
//if this is the first item, select it
if (document.getElementsByClassName('read-item').length ===1) {
  itemNode.classList.add('selected');
}


  //add and save in storage
  if (isNew) {

    this.storage.push(item);
    this.save();
  }

  //add items from storage when app loads

}
    this.storage.forEach(item=>{
      this.addItem(item,false)
    })

