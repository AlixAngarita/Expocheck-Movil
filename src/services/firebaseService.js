import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyD95jO6GIPKBUikS3GDDnLVlKOGm8Feeh8",
  authDomain: "easy-check-b9106.firebaseapp.com",
  databaseURL: "https://easy-check-b9106.firebaseio.com",
  projectId: "easy-check-b9106",
  storageBucket: "easy-check-b9106.appspot.com",
  messagingSenderId: "888063604860",
  appId: "1:888063604860:web:d8081e3e8663daa4df31f9",
  measurementId: "G-N8NHN5N2R2"
};

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore()

class FirebaseService {

      constructor(){
        
      }


  static addDocument(deal, data){
      return new Promise(async (resolve, reject) => {
        try {
          const _id = Date.parse(new Date())
          data['_id'] = _id
          let docRef = db.collection(deal)
          await docRef.add(data)
          resolve(true)

        } catch (error) {
          reject(error)
        }
    })
  }


  static getDocuments(deal){
        return  new Promise(async (resolve, reject) => {
          try {
            let docRef = db.collection(deal)
            let docs = await docRef.get()
            if (docs){
                let data = []
                docs.forEach(doc => {
                    data.push(doc.data())
                });
                resolve(data)
            }

          } catch (error) {
            reject(error)
          }
        })
  }

  static deleteDocument(deal, id){
        return new Promise( async (resolve, reject) => {
          try {
            let docRef = db.collection(deal)
            let doc = await docRef.where('_id','==', id).get()

            if (!doc.empty){
                doc.forEach(async document => {
                    await docRef.doc(document.id).delete()
                    resolve(true)
                });
            }else{
                reject(false)
            }

          } catch (error) {
             reject(error)
          }
        })
  }


  static updateDocument(deal, id, data){
        return new Promise( async (resolve, reject) => {
          try {
            let docRef = db.collection(deal)
            let doc = await docRef.where('_id','==', id).get()
            
            if (!doc.empty){
                doc.forEach(async document => {
                    await docRef.doc(document.id).update(data)
                    resolve(true)
                });
            }else{
                reject(false)
            }

          } catch (error) {
             reject(error)
          }
        })
  }

  
  static getDocById(deal, id){
    return new Promise( async (resolve, reject) => {
      try {
        let docRef = db.collection(deal)
        let doc = await docRef.where('_id','==', id).get()
        
        if (!doc.empty){
            doc.forEach(async document => {
                resolve(document.data())
            });
        }else{
            reject(false)
        }

      } catch (error) {
         reject(error)
      }
    })
  }

  }

  

export default  FirebaseService