<template>
    <div>
        <!-- template 中 this可省略 -->
        <h3>当前最新的count值为: {{ $store.state.count }}</h3>
        <button>+1</button>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
}
</script>
