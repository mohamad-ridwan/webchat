import endpoint from "../endpoint"

const PostSignin = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        fetch(`${endpoint}/${path}`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(console.log(err)))
    })

    return promise
}

export default PostSignin