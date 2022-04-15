import { IonContent, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonMenuButton, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/react';
import { addOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Foto, UrlSelectStudents } from "../data/UrlDatabase";

const Students: React.FC = () => {
  const [data, setData] = useState<Response>();
  type Student = any;
  const url = UrlSelectStudents;
  const [students, setStudents] = useState<Array<Student>>([]);

  const foto = Foto;

  useEffect(() => {
    setInterval(() => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setStudents(data.students);
      });
    },500)
  }, []);

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="primary">
          <IonButton routerLink="newstudents" onClick={() => {}}>
            <IonIcon slot="icon-only" icon={addOutline} />
          </IonButton>
        </IonButtons>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Students</IonTitle>
      </IonToolbar>
      <IonContent>
        <IonList>
          {students.map((student) => (
            <IonItem key={student.nim}>
              <IonAvatar slot="start">
                <img
                  src={
                    foto + (student.foto ? student.foto : "uploads/wil.jpg")
                  }
                />
              </IonAvatar>
              <IonLabel>
                {student.nim} <br />
                {student.nama} <br />
                {student.prodi}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Students;
