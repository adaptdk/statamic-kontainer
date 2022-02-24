<template>
    <div>
        <div v-if="type === 'image' && url">
            <a :href="url" target="_blank"><img :src="url + '?w=300&h=300'" class="mb-2"></a>
        </div>
        <div v-if="type === 'video' && url">
            <video controls width="300">
                <source :src="url" type="video/mp4">
                Sorry, your browser doesn't support embedded videos.
            </video>
        </div>

        <button @click="openKontainer" class="btn">Browse</button>
        <button v-if="url" @click="remove" class="btn text-red">Unlink</button>
    </div>
</template>

<script>
export default {
    mixins: [Fieldtype],

    data () {
        return {
            url: null,
            type: null,
        }
    },

    mounted () {
        if (this.value) {
            this.url = this.value.url
            this.type = this.value.type
        }

        window.addEventListener("message", this.receive, false)
    },

    destroyed () {
        window.removeEventListener("message", this.receive, false)
    },

    methods: {
        openKontainer () {
            if (! this.config.kontainer_url) {
                this.$toast.error('Kontainer URL is missing')
                return
            }

            window.open(this.config.kontainer_url + '?cmsMode=1', 'kontainer', 'width=1024,height=768,popup,toolbar=no,location=no')
        },
        receive (data) {
            if (! (new RegExp('kontainer\.com')).test(data.origin)) {
                return
            }

            let imageData = JSON.parse(data.data)

            if (this.meta.debug) {
                console.log(this.fieldId, imageData)
            }

            if (! imageData) {
                this.$toast.error('Error parsing image data')
                return
            }

            if (imageData.type !== 'image' && imageData.type !== 'video') {
                this.$toast.error('Unknown type')
                return
            }

            if (! imageData.url) {
                this.$toast.error('Invalid URL')
                return
            }

            this.url = imageData.url
            this.type = imageData.type

            this.update(imageData)
        },
        remove () {
            this.url = null
            this.type = null

            this.update(null)
        }
    }
};
</script>
