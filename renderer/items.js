//add new item
let items = document.getElementById('items')

//track items in storage
//poiberz dane ze storage , a jeśli ich nie ma to utwórz pustą tablicę
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

//[resist storage
exports.save=()=>{
  localStorage.setItem('readit-items',JSON.stringify(this.storage))
}
exports.addItem = (item,isNew=false) => {
  // create new dom node
  let itemNode = document.createElement('div');
  itemNode.setAttribute('class','read-item');
  itemNode.innerHTML = `<img src="${item.screenshot}"> <h2>${item.title}</h2>`
  items.appendChild(itemNode)

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