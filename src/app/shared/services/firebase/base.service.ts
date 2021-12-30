import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBaseEntity, IBaseService } from '../../models/firebase.model';

export abstract class BaseService<T extends IBaseEntity>
	implements IBaseService<T>
{
	protected collection: AngularFirestoreCollection<T>;

	constructor(path: string, protected afs: AngularFirestore) {
		this.collection = this.afs.collection(path);
	}

	get(identifier: string): Observable<T> {
		return this.collection
			.doc<T>(identifier)
			.snapshotChanges()
			.pipe(
				map((doc) => {
					if (doc.payload.exists) {
						const data = doc.payload.data() as any;
						const id = doc.payload.id;
						return { id, ...data };
					}
				}),
			);
	}

	list(): Observable<T[]> {
		return this.collection.snapshotChanges().pipe(
			map((changes) => {
				return changes.map((a) => {
					const data = a.payload.doc.data() as T;
					data.id = a.payload.doc.id;
					return data;
				});
			}),
		);
	}

	add(item: T): Promise<T> {
		const promise = new Promise<T>((resolve, reject) => {
			this.collection.add(item).then((ref) => {
				const newItem = {
					id: ref.id,
					...item,
				};
				ref.set(newItem);
				resolve(newItem);
			});
		});

		return promise;
	}

	update(item: T): Promise<T> {
		const promise = new Promise<T>((resolve, reject) => {
			this.collection
				.doc<T>(item.id)
				.set(item)
				.then(() => {
					resolve({
						...(item as any),
					});
				})
				.catch(() => {
					reject({ error: 'Something went wrong' });
				});
		});

		return promise;
	}

	delete(id: string): void {
		const docRef = this.collection.doc<T>(id);
		docRef.delete();
	}
}
