import endpoint from "../endpoint"

const DeleteNotifikasi = async (path, data) => {
    return await new Promise((resolve, reject) => {
        fetch(`${endpoint}/${path}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(console.log(err)))
    })
}

export default DeleteNotifikasi
