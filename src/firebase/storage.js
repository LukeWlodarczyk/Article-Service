import { storage } from './firebase';

const doUpdateUserPhoto = (userId, photo) => {
  storage.ref('userPhoto/'+userId).put(photo)
}
