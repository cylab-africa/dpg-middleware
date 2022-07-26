import { toast } from 'react-toastify';
export default class NotificationManager {
	static notify({ message, type = "info", duration = 3000 }) {
		if (["info", "warning", "success", "error"].includes(type)) {
			toast[type](message, { duration })
		}
	}
}