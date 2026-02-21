import { Injectable, inject } from '@angular/core';
import {
    Firestore,
    collection,
    doc,
    docData,
    collectionData,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    QueryConstraint,
    SetOptions
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    private firestore = inject(Firestore);

    doc$<T>(path: string): Observable<T | undefined> {
        const docRef = doc(this.firestore, path);
        return docData(docRef, { idField: 'id' }) as Observable<T | undefined>;
    }

    async get<T>(path: string): Promise<T | undefined> {
        const docRef = doc(this.firestore, path);
        const snapshot = await getDoc(docRef);
        return snapshot.exists() ? (snapshot.data() as T) : undefined;
    }

    async getCollection<T>(path: string, ...queryConstraints: QueryConstraint[]): Promise<T[]> {
        const collectionRef = collection(this.firestore, path);
        const q = query(collectionRef, ...queryConstraints);
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
    }

    collection$<T>(path: string, ...queryConstraints: QueryConstraint[]): Observable<T[]> {
        const collectionRef = collection(this.firestore, path);
        const q = query(collectionRef, ...queryConstraints);
        return collectionData(q, { idField: 'id' }) as Observable<T[]>;
    }

    set(path: string, data: any, options?: SetOptions): Promise<void> {
        const docRef = doc(this.firestore, path);
        return setDoc(docRef, data, options || {});
    }

    update(path: string, data: any): Promise<void> {
        const docRef = doc(this.firestore, path);
        return updateDoc(docRef, data);
    }

    delete(path: string): Promise<void> {
        const docRef = doc(this.firestore, path);
        return deleteDoc(docRef);
    }

    createId(): string {
        return doc(collection(this.firestore, '_')).id;
    }
}
