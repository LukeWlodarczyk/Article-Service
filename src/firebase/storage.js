import { storage } from './firebase';

export const doUpdateUserPhoto = (userId, photo) =>
  storage.ref('userPhoto/'+userId).put(photo)
