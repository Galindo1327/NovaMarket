import React, { useState, useEffect } from 'react';
import { db } from '../credentials';
import { collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const Notifications = () => {
  const history = useHistory();
  const [contacts, setContacts] = useState([]);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const q = query(collection(db, 'MensajesPrivados'), where('users', 'array-contains', userId));
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const contactsData = [];

        const uniqueContacts = new Set();

        for (const docSnapshot of querySnapshot.docs) {
          const data = docSnapshot.data();
          const contactId = data.users.find(id => id !== userId);
          
          if (contactId && !uniqueContacts.has(contactId)) {
            uniqueContacts.add(contactId);

            const contactDoc = await getDoc(doc(db, 'users', contactId));
            const contactName = contactDoc.exists() ? contactDoc.data().name : 'Usuario desconocido';

            contactsData.push({
              chatId: data.chatId,
              id: contactId,
              name: contactName
            });
          }
        }

        setContacts(contactsData);
        console.log(contactsData);
      });

      return () => unsubscribe();
    }
  }, [userId]);

  return (
    <IonPage>
      <IonHeader>
      <div className="bg-[#0070ff] flex justify-start items-center w-full px-4 rounded-b-lg shadow-md">
          <div className="m-3 flex flex-row items-center">
            <IonButton shape="round" color="light" onClick={() => history.goBack()}>
            <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088l5.927-4.88Z" clip-rule="evenodd"/>
            </svg>
            </IonButton>
          </div>
            <h1 className="text-white font-bold text-3xl w-full">Chats registrados</h1>
        </div>
      </IonHeader>
      <IonContent>
        <IonList>
          {contacts.map((contact, index) => (
            <IonItem
              key={index}
              button
              onClick={() => history.push('/private-chat', { recipientId: contact.id, recipientName: contact.name })}
            >
              <IonLabel>{contact.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
