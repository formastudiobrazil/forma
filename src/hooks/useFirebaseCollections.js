import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../firebase';

export function useFirebaseCollections(collectionName, initialValue = []) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // LISTEN TO FIRESTORE CHANGES
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, collectionName),
        (snapshot) => {
          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setData(items);
          setLoading(false);
        },
        (err) => {
          console.error(`Erro ao ler ${collectionName}:`, err);
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error(`Erro ao configurar listener para ${collectionName}:`, err);
      setError(err.message);
      setLoading(false);
    }
  }, [collectionName]);

  // CRUD OPERATIONS
  const add = async (item) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), item);
      console.log(`✅ Adicionado em ${collectionName}:`, docRef.id);
      return docRef.id;
    } catch (err) {
      console.error(`❌ Erro ao adicionar em ${collectionName}:`, err);
      throw err;
    }
  };

  const update = async (docId, item) => {
    try {
      await updateDoc(doc(db, collectionName, docId), item);
      console.log(`✅ Atualizado em ${collectionName}:`, docId);
    } catch (err) {
      console.error(`❌ Erro ao atualizar ${collectionName}:`, err);
      throw err;
    }
  };

  const remove = async (docId) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      console.log(`✅ Deletado de ${collectionName}:`, docId);
    } catch (err) {
      console.error(`❌ Erro ao deletar de ${collectionName}:`, err);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    add,
    update,
    remove
  };
}
