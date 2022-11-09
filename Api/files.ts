import {FirebaseApp} from "@/services/firebase"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"


export const uploadFile = async (file?: File, place?: string, name?: string) => {
	if (file) {
		const storage = getStorage(FirebaseApp)


		const storageRef = ref(storage, `images/${place}/${name || file.name}`)

		const uploadTask = uploadBytesResumable(storageRef, file)

		const snapshot = await uploadTask

		return await getDownloadURL(snapshot.ref)
	}
}
