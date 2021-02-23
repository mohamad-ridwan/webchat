import endpoint from "../endpoint"

const GetSigninById = (path) => {
    const promise = new Promise((resolve, reject) => {
        fetch(`${endpoint}/${path}`, {
            mode: 'cors',
            method: 'GET',
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

export default GetSigninById