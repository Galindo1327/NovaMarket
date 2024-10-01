import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonButton, IonList, IonItem, IonLabel, IonPage, IonHeader, IonToolbar } from '@ionic/react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage("");
      // Simula una respuesta del vendedor
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "Respuesta del vendedor", sender: 'seller' },
        ]);
      }, 1000);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonCardTitle>Chat con el Vendedor</IonCardTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonList>
              {messages.map((message, index) => (
                <IonItem key={index}>
                  <IonLabel className={message.sender === 'user' ? 'text-right' : 'text-left'}>
                    <strong>{message.sender === 'user' ? 'Tú' : 'Vendedor'}:</strong> {message.text}
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
            <IonInput
              value={newMessage}
              placeholder="Escribe un mensaje..."
              onIonChange={e => setNewMessage(e.detail.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <IonButton onClick={handleSend} expand="full">Enviar</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Chat;
