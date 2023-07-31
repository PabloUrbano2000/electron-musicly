import { v4 as uuid } from "uuid";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  where,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "../utils";
import { map } from "lodash";

export class Album {
  collectionName = "albums";

  async create(name, image, artist) {
    try {
      const id = uuid();
      const created_at = new Date();
      const data = { id, name, image, artist, created_at };
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, data);
    } catch (error) {
      throw error;
    }
  }

  async obtainAll() {
    try {
      const collectionRef = collection(db, this.collectionName);
      const snapshot = await getDocs(collectionRef);
      return map(snapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }

  async getAlbum(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const snapshot = await getDoc(docRef);
      return snapshot.data();
    } catch (error) {
      throw error;
    }
  }
  async getAlbumsByArtist(idArtist) {
    try {
      const whereRef = where("artist", "==", idArtist);
      const collectionRef = collection(db, this.collectionName);
      const queryRef = query(collectionRef, whereRef);
      const snapshot = await getDocs(queryRef);
      return map(snapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }

  async getLastAlbums(limitItem = 20) {
    try {
      const collectionRef = collection(db, this.collectionName);
      const limitRef = limit(limitItem);
      const orderByRef = orderBy("created_at", "desc");
      const queryRef = query(collectionRef, orderByRef, limitRef);

      const snapshot = await getDocs(queryRef);
      return map(snapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }
}
