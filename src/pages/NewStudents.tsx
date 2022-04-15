import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonInput, IonButton, IonLabel } from "@ionic/react";
import React, { ChangeEvent, useRef, useState } from "react";
import { Redirect } from "react-router";
import { UrlInsertStudents } from "../data/UrlDatabase";

const NewStudents: React.FC = () => {
  const [data, setData] = useState('');
  const url = UrlInsertStudents;
  const nim = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File>();

  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedFile(event.target!.files![0]);
  };

  const insertHandler = () => {
      const formData = new FormData();

      const inNim = nim.current?.value as string;
      const inNama = nama.current?.value as string;
      const inProdi = prodi.current?.value as string;

      formData.append("nim", inNim);
      formData.append("nama", inNama);
      formData.append("prodi", inProdi);
      formData.append("foto", selectedFile as File);

      fetch(url, {
          method: "POST",
          body: formData
      }).then(response => response.text()).then((data)=>{
          setData(data);
      })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add New Students</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonItem>
            <IonLabel position="floating">NIM</IonLabel>
            <IonInput ref={nim}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Nama</IonLabel>
            <IonInput ref={nama}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Prodi</IonLabel>
            <IonInput ref={prodi}></IonInput>
          </IonItem>
          <IonItem>
              <input type="file" onChange={fileChangeHandler}></input>
          </IonItem>
          <IonButton routerLink="/students" onClick={insertHandler}>Simpan</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NewStudents;
