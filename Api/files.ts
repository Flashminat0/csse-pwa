import {FirebaseApp} from "@/services/firebase"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"


export const uploadFile = async (file?: File, place?: string , name? : string) => {
	if (file) {
		const storage = getStorage(FirebaseApp)


		const storageRef = ref(storage, `images/${place}/${name || file.name}`)

		const uploadTask = uploadBytesResumable(storageRef, file)

		await uploadTask.on("state_changed",
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				// console.log('Upload is ' + progress + '% done')

			},
			(error) => {
				return error
			},
		)

		return getDownloadURL(uploadTask.snapshot.ref)
	}
}
