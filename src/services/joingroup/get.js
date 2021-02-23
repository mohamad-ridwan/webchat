import endpoint from "../endpoint"

const getJoinGroup = (path) => {
    const promise = new Promise((resolve, reject) => {
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

export default getJoinGroup