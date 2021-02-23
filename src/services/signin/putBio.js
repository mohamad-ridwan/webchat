import endpoint from "../endpoint"

const PutBio = async (path, data) => {
    const promise = await new Promise((resolve, reject) => {
        fetch(`${endpoint}/${path}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(console.log(err)))
    })

    return promise
}

export default PutBio