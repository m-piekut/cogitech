<template>
    <header>
        <img src="../assets/logo.png" alt="" srcset="">
        <h1>cogitech</h1>
    </header>
</template>

<script>

export default ({
    name: 'Header'
})
</script>

<style lang="scss" scoped>
    header{
        position: fixed;
        top: 0;
        z-index: 10;
        width: 100vw;
        box-shadow: 0 0 5px black;
        // height: 10px;
        border-bottom: 1px solid #8a2be2;;
        background: white;
        display: flex;
        align-items: center;
        img{
            width: 40px;
            height: 40px;
            
        }
        h1{
            font-size: 26px;
        }
    }
</style>