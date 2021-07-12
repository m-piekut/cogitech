<template>
    <div class="post__up">
        <div class="post__dot"></div>
        <h2 class="post__title">{{post.title}}</h2>
        <button @click="deleteHandler" class="post__delete"><i class="fas fa-times"></i></button>
        
    </div>
    <p class="post__body">{{this.otpBody}}</p>
   
    <div class="post__down">
        <p class="post__author">{{userName}}</p>
        <button @click="clickHandler" class="post__more"><i class="fas fa-angle-down"></i></button>

    </div>
</template>

<script>

export default {
    name: 'Post',
    props:{
        post: Object,
        id: Number,
        body: String
    },
    data(){
        return{
            userName: '',
            slicedBody: this.post.body.slice(0,40)+'...',
            otpBody: this.post.body.slice(0,40)+'...',
            fullBody: this.post.body
        }
    },
    methods:{
        async fetchId(){
            fetch(`https://jsonplaceholder.typicode.com/users/${this.id}`)
            .then(response => response.json())
            .then(json =>  this.userName = json.name)
        },
        clickHandler(e){
            console.log('click')
            if(this.otpBody == this.slicedBody){
                this.otpBody = this.fullBody
            }else{
                this.otpBody = this.slicedBody
            }
            e.target.closest('button').firstChild.classList.toggle("fa-angle-down")
            e.target.closest('button').firstChild.classList.toggle("fa-angle-up")
            },
        async deleteHandler(){
            if(confirm('Czy chcesz usunąć ten post?')){
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.post.id}`, {
                    method: 'DELETE'
                })
                this.$store.commit('deletePost',  this.post.id)
                console.log( res.status)
            }
            
        }
    },
    created(){
        this.fetchId()
        
    }
}
</script>