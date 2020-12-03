const { ipcRenderer } = require("electron");
const items = require('./items')
//dom nodes

let showModal = document.getElementById('show-modal'),
 closeModal = document.getElementById('close-modal'),
 modal = document.getElementById('modal'),
 addItem= document.getElementById('add-item'),
 itemUrl= document.getElementById('url');
search = document.getElementById('search');

//filter itesm
search.addEventListener('keyup',e=>{
  //loop items
  //weż wszystkie leemeny z tą klasą i zamień je na tablicę
  Array.from(document.getElementsByClassName('read-item')).forEach(item=> {
    let hasMatch = item.innerText.toLowerCase().includes(search.value)
    item.style.display = hasMatch ?'flex':'none';
  })
})

//navigate item selection with up/down key
document.addEventListener('keydown',e=>{
  if (e.key==='ArrowUp' || e.key==='ArrowDown') {
    items.changeSelection(e.key)
  }
})


//disable & enable modal buttons
const toggleModalButtons =()=>{
  if (addItem.disabled===true) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.innerText='Add Item.'
    closeModal.style.dispaly ='inline'
  } else {
    addItem.disabled = true;
    addItem.style.opacity = 0.5;
    addItem.innerText='Adding...'
    closeModal.style.dispaly ='none'
  }
}

 //show modal
 showModal.addEventListener('click',e=>{
   modal.style.display = 'flex';
   itemUrl.focus();
 })

  //close modal
  closeModal.addEventListener('click',e=>{
    modal.style.display = 'none'
  })
 
//handle new item
addItem.addEventListener('click',e=>{
  if (itemUrl.value) {
   // console.log(itemUrl.value);
   //send item to main process
   ipcRenderer.send('new-item',itemUrl.value);

   //disable buttons
   toggleModalButtons()
  }
})

//listen for new item form main process
ipcRenderer.on('new-item-success',(e,newItem)=>{
  console.log(newItem);
  // add new iteim to interface w zewnętrznym module uruchom funkcję additem
  items.addItem(newItem,true);



     //enable buttons
     toggleModalButtons()

     //hide modal
     modal.style.display = 'none';
     itemUrl.value=''
})

///listen for key even
itemUrl.addEventListener('keyup',e=>{
  if (e.key==='Enter') {
    addItem.click();
  }
})