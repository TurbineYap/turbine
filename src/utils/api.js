import { baseUrl } from './consts';

const getTracks = async () => {
    try {
        const track = fetch(`${baseUrl}/tracks`, {
        headers: {

        }
    })
        return track
} catch (err) {
        console.log(err);
    }
}

export {getTracks}