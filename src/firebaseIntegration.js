// ═══════════════════════════════════════════════════════════════════════════════
// 🔄 FIREBASE INTEGRATION - Funções CRUD
// ═══════════════════════════════════════════════════════════════════════════════
// Arquivo: src/firebaseIntegration.js
// Contém todas as funções para ler/salvar dados no Firestore

import { db } from './firebaseConfig';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 FUNÇÕES GENÉRICAS DE LEITURA
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Lê todos os documentos de uma coleção
 * @param {string} collectionName - Nome da coleção (ex: 'clientes', 'members')
 * @returns {Promise<Array>} Array de documentos
 */
export const readCollection = async (collectionName) => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`❌ Erro ao ler ${collectionName}:`, error);
    return [];
  }
};

/**
 * Lê um documento específico
 * @param {string} collectionName - Nome da coleção
 * @param {string} docId - ID do documento
 * @returns {Promise<Object|null>} Documento ou null
 */
export const readDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`❌ Erro ao ler documento ${docId}:`, error);
    return null;
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// ✍️ FUNÇÕES GENÉRICAS DE ESCRITA
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Cria/atualiza um documento
 * @param {string} collectionName - Nome da coleção
 * @param {string} docId - ID do documento
 * @param {Object} data - Dados do documento
 * @param {boolean} merge - Se true, mescla com dados existentes
 * @returns {Promise<boolean>} Sucesso ou falha
 */
export const writeDocument = async (collectionName, docId, data, merge = false) => {
  try {
    const docRef = doc(db, collectionName, docId);
    
    // Adiciona timestamp automático
    const dataWithTimestamp = {
      ...data,
      updatedAt: serverTimestamp()
    };
    
    await setDoc(docRef, dataWithTimestamp, { merge });
    console.log(`✅ ${collectionName}/${docId} salvo com sucesso!`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao salvar em ${collectionName}:`, error);
    return false;
  }
};

/**
 * Atualiza campos específicos de um documento
 * @param {string} collectionName - Nome da coleção
 * @param {string} docId - ID do documento
 * @param {Object} updates - Campos a atualizar
 * @returns {Promise<boolean>} Sucesso ou falha
 */
export const updateDocument = async (collectionName, docId, updates) => {
  try {
    const docRef = doc(db, collectionName, docId);
    
    const updatesWithTimestamp = {
      ...updates,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(docRef, updatesWithTimestamp);
    console.log(`✅ ${collectionName}/${docId} atualizado!`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao atualizar ${collectionName}:`, error);
    return false;
  }
};

/**
 * Deleta um documento
 * @param {string} collectionName - Nome da coleção
 * @param {string} docId - ID do documento
 * @returns {Promise<boolean>} Sucesso ou falha
 */
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log(`✅ ${collectionName}/${docId} deletado!`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao deletar ${collectionName}:`, error);
    return false;
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 FUNÇÕES ESPECÍFICAS DO FORMA STUDIO
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Carrega todos os clientes
 */
export const loadClientes = async () => {
  return await readCollection('clientes');
};

/**
 * Carrega todos os membros da equipe
 */
export const loadMembers = async () => {
  return await readCollection('members');
};

/**
 * Carrega todas as demandas/criações
 */
export const loadDemands = async () => {
  return await readCollection('demands');
};

/**
 * Carrega o calendário
 */
export const loadCalendar = async () => {
  return await readCollection('calendar');
};

/**
 * Salva um cliente
 */
export const saveCliente = async (clienteId, clienteData) => {
  return await writeDocument('clientes', clienteId, clienteData, true);
};

/**
 * Salva um membro da equipe
 */
export const saveMember = async (memberId, memberData) => {
  return await writeDocument('members', memberId, memberData, true);
};

/**
 * Salva uma demanda/criação
 */
export const saveDemand = async (demandId, demandData) => {
  return await writeDocument('demands', demandId, demandData, true);
};

/**
 * Salva um evento do calendário
 */
export const saveCalendarEvent = async (eventId, eventData) => {
  return await writeDocument('calendar', eventId, eventData, true);
};

/**
 * Deleta um cliente
 */
export const deleteCliente = async (clienteId) => {
  return await deleteDocument('clientes', clienteId);
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🔄 SINCRONIZAÇÃO EM TEMPO REAL (opcional para fase 2)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Listener em tempo real para uma coleção
 * (Para implementar depois)
 */
export const listenToCollection = (collectionName, callback) => {
  // Implementar com onSnapshot() para sincronização em tempo real
  console.log('⏳ Real-time listeners serão implementados na fase 2');
};

export default {
  readCollection,
  readDocument,
  writeDocument,
  updateDocument,
  deleteDocument,
  loadClientes,
  loadMembers,
  loadDemands,
  loadCalendar,
  saveCliente,
  saveMember,
  saveDemand,
  saveCalendarEvent,
  deleteCliente
};
