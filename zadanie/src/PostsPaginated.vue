<template>
  <div class="transactions">
		  
		<hr>
		<div class="wrapper">
			<div class="post" v-for="(post, index) in paginatedData" :key="index">
    <Post
         :post="post" 
         :id="post.userId"
        :body='post.body'
        
          />
			</div>
		</div>

		<ul class="pagination" v-if="data.length > 5 || currentPage > 1">
        <li class="pagination-item" title="Первая страница">
          <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
            <i class="fas fa-chevron-left"></i> <i class="fas fa-chevron-left"></i>
          </button>
        </li>

        <li class="pagination-item" title="">
          <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
            <i class="fas fa-chevron-left"></i>
          </button>
        </li>

        <li class="pagination-item" v-for="(page, index) in pages" :key="index">
          <button 
          type="button" 
          @click="onClickPage(page.number)" 
          :disabled="page.isDisabled" 
          :class="{ active: isPageActive(page.number) }">
            {{ page.number }}
          </button>
        </li>

        <li class="pagination-item" title="Следующая страница">
          <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
            <i class="fas fa-chevron-right"></i>
          </button>
        </li>
        <li class="pagination-item" title="Последняя страница">
          <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
            <i class="fas fa-chevron-right"></i> <i class="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>
	</div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import Post from './components/Post.vue'
export default {
  name: 'postsPaginated',
  components:{
    Post
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
  },
  computed: {
    paginatedData(){
      let start = (this.currentPage - 1) * this.perPage, end = start + this.perPage
      return this.data.slice(start, end)
    },
    startPage() {
      if (this.currentPage === 1) return 1
      if (this.currentPage === this.totalPages) return this.totalPages - this.maxVisibleButtons + (this.maxVisibleButtons -1)
      return this.currentPage - 1
    },
    endPage() { return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages) },
    pages() {
      let range = []
      for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage 
        });
      }
      return range
    },
    isInFirstPage() { return this.currentPage === 1 },
    isInLastPage() { return this.currentPage === this.totalPages },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);   
    },
    isPageActive(page) {
      return this.currentPage === page
    },
    onPageChange(page) {
       this.currentPage = page
    },async fetchId(){
            fetch(`https://jsonplaceholder.typicode.com/users/${this.id}`)
            .then(response => response.json())
            .then(json =>  this.userName = json.name)
        },
    async deleteHandler(e){
            if(confirm('Czy chcesz usunąć ten post?')){
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${e}`, {
                    method: 'DELETE'
                })
                
                 this.$store.commit('deletePost',  e)
                console.log( res.status)
            }
        }
  },
}
</script>
<!-- END COMPONENT -->
<style  lang='scss'>
  .wrapper {
        max-width: 1200px;
        margin: 50px auto;
        width: 95%;
        // border: 1px solid red
    }
    .post{
        position: relative;
        margin: 10px 0;
        padding: 10px 5px;
        box-shadow: 0px 0px 4px rgb(17, 17, 17);
        transition: box-shadow .2s;
        border-bottom: 2px solid #8a2be2;
        &:hover{
            box-shadow: 0 1px 20px  rgb(12, 12, 12);
            &::before{
            box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.98), inset -1px -1px 4px #8D8D8D;
            
            }
        }
        &::before{
            content: '';
            width: 20px;
            height: 20px;
            background-color: #8a2be2;
            position: absolute;
            left: 15px;
            top: 15px;
            border-radius: 50%;
            box-shadow: 0px 0px 2px #000000, -1px -1px 2px rgba(140, 140, 140, 0.25), iset 0 0 0;
            transition: box-shadow .3s;
        }
        &__up{
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 10px auto;
        }
        &__title{
            font-size: 16px;
            width: 80%;
            margin: 0 auto;
            font-weight: 700;
        }
        &__body{
            color: #575454;
            font-size: 12px;
            padding: 5px 10px;
        }
        &__delete{
            position: absolute;
            right: 5px;
            top: 5px;
        }
        &__down{
            display: flex;
            justify-content: space-around;
            margin-top: 15px;
        }
        &__author{
            font-style: italic;
            width: 70%;
            text-align: left;
            font-size: 12px;
            text-decoration: underline;
        }
        &__more{
            background-color: #8a2be2;;
            border: none;
            border-radius: 10px;
            padding: 3px 6px;
            // font-weight: bold;
            color: white;
            cursor: pointer;
            transition: scale .2s;
            &:hover{
                scale: 1.2;
            }
        }
        &__delete{
            background: white;
            border: none;
            padding: 3px;
            cursor: pointer;
            &:hover{
                color: rgb(224, 64, 64);
            }
        }
    }
  .pagination{
    display: flex;
    justify-content: center;
      padding: 0;
      margin: auto 0 0 0;
      list-style-type: none;
      &-item{

        button{

          margin: 0!important;
          padding: .25rem .5rem;
          font-size: 1.1rem;
          border: none;
          border-radius: .25rem;
          background: none;
          // cursor: pointer;
          &:hover{

            cursor: pointer;
            background-color: silver;
          }
          &[disabled="disabled"]{

            color: silver;
            cursor: default;
          }
            &:hover{

              cursor: default;
              
              background-color: #892be23d;
            }
          &.active{
            color: white;
            background-color: #8a2be2;
          }
        }
      }


  }
  @media (min-width: 768px) {
    .post{
      margin: 20px auto;
      &__title{
        font-size: 22px;
        // margin: 10px auto;
        line-height: 30px;
      }
      &__body{
        margin: 0 auto;
        font-size: 16px;
        width: 70%;
       line-height: 130%;
      }
    }
  }
</style>