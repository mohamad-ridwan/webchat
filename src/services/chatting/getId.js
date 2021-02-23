import endpoint from "../endpoint"

const getChattingById = async (path) => {
    const promise = await new Promise((resolve, reject) => {
        fetch(`${endpoint}/${path}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(console.log(err)))
    })

    return promise
}

export default getChattingById