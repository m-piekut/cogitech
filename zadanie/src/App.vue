<!-- MAIN APP -->
<template>
  <div id="app">
    <Header/>
    <postsPaginated
					:data="posts"
					:total-pages="Math.ceil(posts.length / 10)"
					:total="posts.length"
					:per-page="10"
					:current-page="currentPage"
					@pagechanged="onPageChange"
				/>
  </div>
</template>

/* eslint-disable */
<script>
import PostsPaginated from './PostsPaginated.vue'
import { mapGetters, mapActions } from 'vuex'
import Header from './components/Header.vue'

export default {
  name: 'app',
  mounted(){
    this.loadPosts()
  },
  data(){
    return {
			currentPage: 1,
    }
  },
  methods: {
		...mapActions(['loadPosts']),
    onPageChange(currentPage) {
      this.currentPage = currentPage;
		},
  },
  computed: {
    ...mapGetters(['posts'])
  },
  components: {
    PostsPaginated,
    Header
  }
}
</script>

<style lang="sass">


*
  margin: 0
  padding: 0
  box-sizing: border-box

#app 
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Roboto', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  // margin-top: 60px;




  
body
  font-family: "Roboto"
  font-size: 16px
  color: #505050

// #app
//   background-color: #fafafa
//   max-width: 30%
//   height: 21rem
//   margin: 0 auto
//   margin-top: 3rem
//   border-radius: 1rem
//   padding: 1rem
  hr
    border: 1px solid silver
    width: 100%
  h2
    font-size: 1.5rem
    text-align: center
    margin-top: 0
  .transactions
    display: flex
    height: calc(100% - 1.25rem)
    flex-direction: column
    .row
      display: flex
      align-items: center
      padding: 0
      margin: .75rem 0
      .col
        justify-content: center
        flex-basis: 25%
        display: inline-flex
    .pagination
      display: flex
      justify-content: center
      padding: 0
      margin: auto 0 0 0
      list-style-type: none
      .pagination-item
        button
          margin: 0!important
          padding: .25rem .5rem
          font-size: 1.1rem
          border: none
          border-radius: .25rem
          background: none
          &:hover
            cursor: pointer
            background-color: silver
          &[disabled="disabled"]
            color: silver
            cursor: default
            &:hover
              cursor: default
              background-color: transparent
          &.active
            color: red

</style>
<!-- END MAIN APP -->
