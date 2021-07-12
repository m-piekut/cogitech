// store.js
import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
	state: {
		posts: []
	},
	mutations: {
		loadPosts(state, payload) { state.posts = payload },
		
		deletePost(state, id){
			console.log(id)
			let newArray = this.state.posts
			.filter(function(element) {
			  // console.log(element.id)
			  console.log(id);
			  return element.id !== id;
			});
			this.state.posts = newArray
	  
		},
	},
	actions: {
		loadPosts(context){
			axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
				console.log('pobierz');
				let reversed = response.data
				context.commit('loadPosts', reversed)
			})
		},
	},
	getters: {
		posts: state => state.posts,
	}
})