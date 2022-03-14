<template>
    <div>
        <div v-if="type === 'image' && url" class="mb-2">
            <a :href="url" target="_blank" class="inline-block"><img :src="url + '?w=300&h=300'"></a>
        </div>
        <div v-if="type === 'video' && url" class="mb-2">
            <video controls width="300">
                <source :src="url" type="video/mp4">
                {{ __('Sorry, your browser doesn\'t support embedded videos.') }}
            </video>
        </div>
        <div v-if="type === 'file' && url" class="flex items-center text-sm text-grey-80 bg-grey-10 border border-grey-40 rounded p-2 mb-2">
            <div class="flex-none w-4 h-4 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="block">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M23.25 9.9 12.273 20.878a6.75 6.75 0 0 1-9.546-9.546l9.016-9.015a4.5 4.5 0 1 1 6.363 6.363L9.091 17.7a2.25 2.25 0 0 1-3.182-3.181L14.925 5.5"/>
                </svg>
            </div>
            <div>
                <a :href="url" target="_blank">{{ url }}</a>
            </div>
        </div>

        <button @click="openKontainer" class="btn" v-text="value ? __('Edit') : __('Browse')"></button>
        <button v-if="url" @click="remove" class="btn text-red" v-text="__('Unlink')"></button>
    </div>
</template>

<script>
export default {
    mixins: [Fieldtype],

    data () {
        return {
            url: null,
            type: null,
            fileId: null,
            folderId: null,
            token: null,
            popupWidth: 1024,
            popupHeight: 768,
            popupTop: 0,
            popupLeft: 0,
        }
    },

    mounted () {
        if (this.value) {
            this.url = this.value.url
            this.type = this.value.type
            this.folderId = this.value.folderId
            this.fileId = this.value.fileId
        }

        this.token = this.makeid(32)
        this.popupWidth = window.screen.width * 0.8
        this.popupHeight = window.screen.height * 0.8
        this.popupTop = (window.screen.height * 0.15) / 2
        this.popupLeft = (window.screen.width * 0.2) / 2

        window.addEventListener("message", this.receive, false)
    },

    destroyed () {
        window.removeEventListener("message", this.receive, false)
    },

    methods: {
        openKontainer () {
            if (! this.config.kontainer_url) {
                this.$toast.error(__('Kontainer URL is missing'))
                return
            }

            // End the Kontainer URL with a trailing slash
            let url = this.config.kontainer_url.replace(/\/?$/, '/')

            if (this.folderId) {
                url += 'folder/' + this.folderId + '/'
            }

            if (this.fileId) {
                url += 'file/' + this.fileId + '/'
            }

            url += '?cmsMode=1&cmsToken=' + this.token

            window.open(url, 'kontainer', 'width='+this.popupWidth+',height='+this.popupHeight+',top='+this.popupTop+',left='+this.popupLeft+',popup')
        },
        receive (data) {
            if (! this.config.kontainer_url.includes(data.origin)) {
                return
            }

            let imageData = JSON.parse(data.data)

            if (this.meta.debug) {
                console.log(this.fieldId, imageData)
            }

            if (! imageData) {
                this.$toast.error(__('Error parsing image data'))
                return
            }

            if (! imageData.url) {
                this.$toast.error(__('Invalid URL'))
                return
            }

            if (imageData.token !== this.token) {
                return
            }

            if (! ['image', 'video', 'file'].includes(imageData.type)) {
                this.$toast.error(__('Unknown type'))
                return
            }

            if (this.config.allow_type === 'images' && imageData.type !== 'image') {
                this.$toast.error(__('Only images allowed'))
                return
            }

            if (this.config.allow_type === 'videos' && imageData.type !== 'video') {
                this.$toast.error(__('Only videos allowed'))
                return
            }

            if (this.config.allow_type === 'files' && imageData.type !== 'file') {
                this.$toast.error(__('Only files allowed'))
                return
            }

            this.url = imageData.url
            this.type = imageData.type
            this.folderId = imageData.folderId
            this.fileId = imageData.fileId

            this.update(imageData)
        },
        remove () {
            this.url = null
            this.type = null
            this.folderId = null
            this.fileId = null

            this.update(null)
        },
        makeid (length) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;

            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            return result;
        }
    }
};
</script>
