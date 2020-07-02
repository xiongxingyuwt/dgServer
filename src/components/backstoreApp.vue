<template>
    <div id="backstoreApp ">
        <tpheader></tpheader>
        <btLeft></btLeft>
        <btRight></btRight>
    </div>  
</template>

<script>
import tpheader from './fixed/header'
import btLeft from './fixed/btLeft'
import btRight from './fixed/btRight'
export default {
    components: {
        tpheader,
        btLeft,
        btRight
    }
}
</script>