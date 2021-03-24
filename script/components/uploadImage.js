import { baseUrl } from '../utills/baseUrl.js';
import { upload } from '../utills/settings.js';
import { getToken } from '../utills/storage.js';
import { displayMessage } from '../utills/error.js';

export default uploadImageToApi;

async function uploadImageToApi(id, files, refId, field, ref){
    const url = baseUrl + upload;
	const data = JSON.stringify({
		id,
        files,
		refId,
        field,
		ref,
});
    const token = getToken();

    const options = {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.error) {
            displayMessage(json.error, json.message);
        }

        displayMessage(json.title, 'Was successfully updated! You will be taken back shortly.');
        document.querySelector('#error').style.color = 'green';
    } catch (error) {
        console.log(error);
    }
    // } finally {
    //     setTimeout(function() {
    //         window.history.back();
    //     }, 8000);
    // }
};