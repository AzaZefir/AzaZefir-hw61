let addBtn = document.querySelector('#pushItem');
let getBtn = document.querySelector('#getItem');
let request = indexedDB.open('Gallery', 1);
let count = 0;
request.onupgradeneeded = (event) => {
    let DB = event.target.result;

    if (!DB.objectStoreNames.contains('Photos')) {
        var ObjectStore = DB.createObjectStore('Photos');
    }
}

request.onsuccess = (event) => {
    alert('Success! DB has been opened!');
    db = event.target.result;

}
request.onerror = (event) => {
    alert('Error! There is problem with opening your DB');
}
addBtn.addEventListener('click', (event) => {
    count++;
    let File = document.querySelector('input').files[0];
    let transaction = db.transaction(['Photos'], 'readwrite');
    let store = transaction.objectStore('Photos');
    let BlobUpload = new Blob([File], {
        type: 'image/png'
    });
    let res = store.put(BlobUpload, count);
    res.onsuccess = (e) => {
        alert('File was uploaded to DB', e)
    }
    res.onerror = (e) => {
        alert('There is some error with downloading file to DB', e)
    }
});
getBtn.addEventListener('click', (event) => {
    let fieldInput = document.querySelector('#num').value;
    let transaction = db.transaction(['Photos'], 'readwrite');
    let store = transaction.objectStore('Photos');
    let res = store.get(+fieldInput);
    res.onsuccess = (e) => {
        if (e.target.result === undefined) {
            alert('There is no such file in DB');
            return;
        } else {
            let imgFile = e.target.result;
            let imgUrl = URL.createObjectURL(imgFile);
            document.querySelector('img').setAttribute('src', imgUrl);
        }
    }
    res.onerror = (e) => {
        alert('Error connecting for DB', e)
    }


});