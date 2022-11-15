import { openDB } from 'idb';
console.log('read db.js')
const initDb = async () =>{
  console.log('ran init');
  openDB('jate', 1, {
    
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
}

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
  try{
    const jateDb = await openDB('jate', 1);
    const transaction = jateDb.transaction('jate', 'readwrite');
    const store = transaction.objectStore('jate');
    return await store.add({content});
  }catch(err){
    console.error(err);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try{
    const jateDb = await openDB('jate', 1);
    const transaction = jateDb.transaction('jate', 'readonly');
    const store = transaction.objectStore('jate');
    return await store.getAll();
  }catch(err){
    console.error(err);
  }
};

initDb();
