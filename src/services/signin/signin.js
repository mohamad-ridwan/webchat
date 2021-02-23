import endpoint from "../endpoint"

const SigninGoogle = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        fetch(`${endpoint}/${path}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                googleId: data.googleId,
                email: data.email
            })
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(console.log(err)))
    })
    return promise
}

export default SigninGoogle