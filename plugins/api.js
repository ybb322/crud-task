export default ({$axios}, inject) => {
    inject ('api', {
        users: {
        async find () {
            const response = await $axios.get ('https://jsonplaceholder.typicode.com/users')
            return response.data
        },
        async findOne (id) {
            const response = await $axios.get (`https://jsonplaceholder.typicode.com/users/${id}`)
            console.log(response.data)
            return response.data
        },

        },
    })
}