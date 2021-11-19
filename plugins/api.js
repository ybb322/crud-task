export default ({$axios}, inject) => {
    inject ('api', {
        responseData:{},
        async find () {
            const response = await $axios.get ('https://jsonplaceholder.typicode.com/users')
            this.responseData = response.data
        }
    })
}