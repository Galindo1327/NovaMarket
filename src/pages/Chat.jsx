import React, { useState, useEffect } from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonInput, IonButton, IonList, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonFooter } from '@ionic/react';
import { collection, addDoc, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import { db, auth } from '../credentials';
import { useHistory } from "react-router-dom";

function Chat({ productoId }) {
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserName(user.displayName);
      }
    };

    fetchUserInfo();

    if (productoId) {
      const q = query(collection(db, 'Mensajes'), where('productoId', '==', productoId), orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = querySnapshot.docs.map(doc => doc.data());
        setMessages(msgs);
      });

      return () => unsubscribe();
    }
  }, [productoId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const user = auth.currentUser;
    const displayName = user ? user.displayName : "Anónimo";

    await addDoc(collection(db, 'Mensajes'), {
      msg: newMessage,
      name: displayName,
      productoId: productoId,
      timestamp: new Date()
    });

    setNewMessage("");
  };

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
            <h1 className="text-white font-bold text-3xl w-full">Chat Producto</h1>
        </div>
      </IonHeader>

      <IonContent>
        <IonList>
          {messages.map((message, index) => (
            <IonItem key={index}>
              <div className={`rounded-lg p-3 my-2 w-full ${message.name === userName ? 'bg-blue-200' : 'bg-slate-200'}`}>
                <h2 className="font-semibold">{message.name}</h2>
                <p className="break-words">{message.msg}</p>
              </div>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      <IonFooter>
        <div className="flex items-center p-4 border border-t-slate-300">
          <IonInput
            value={newMessage}
            placeholder="Escribe un mensaje..."
            onIonChange={(e) => setNewMessage(e.detail.value)}
            className="flex-1"
          />
          <IonButton onClick={handleSendMessage} className="ml-2">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/>
            </svg>
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
}

export default Chat;