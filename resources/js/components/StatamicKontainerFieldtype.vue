<template>
    <div>
        <div v-if="type === 'image' && url" class="kontainer-preview">
            <a :href="url" target="_blank"><img :src="url + '?w=300&h=300'"></a>
        </div>
        <div v-if="type === 'video' && url" class="kontainer-preview">
            <video controls width="300">
                <source :src="url" type="video/mp4">
                {{ __('Sorry, your browser doesn\'t support embedded videos.') }}
            </video>
        </div>
        <div v-if="(type === 'file' || type === 'vector' || type === 'document') && url" class="kontainer-preview kontainer-file">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="kontainer-file-icon">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M23.25 9.9 12.273 20.878a6.75 6.75 0 0 1-9.546-9.546l9.016-9.015a4.5 4.5 0 1 1 6.363 6.363L9.091 17.7a2.25 2.25 0 0 1-3.182-3.181L14.925 5.5"/>
            </svg>
            <a :href="url" target="_blank">{{ url }}</a>
        </div>
        <div class="kontainer-actions">
            <Button :disabled="config.read_only" @click="openKontainer" :text="value ? __('Edit') : __('Browse')" />
            <Button v-if="url" :disabled="config.read_only" @click="remove" variant="danger" :text="__('Unlink')" />
        </div>
    </div>
</template>

<script>
import { FieldtypeMixin as Fieldtype } from '@statamic/cms';
import { Button } from '@statamic/cms/ui';

export default {
    mixins: [Fieldtype],

    components: { Button },

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

    unmounted () {
        window.removeEventListener("message", this.receive, false)
    },

    methods: {
        openKontainer () {
            if (! this.config.kontainer_url) {
                Statamic.$toast.error(__('Kontainer URL is missing'))
                return
            }

            // End the Kontainer URL with a trailing slash
            let url = this.config.kontainer_url.replace(/\/?$/, '/');

            if (this.folderId || this.fileId) {
                if (this.folderId) {
                    url += 'folder/' + this.folderId + '/'
                }

                if (this.fileId) {
                    url += 'file/' + this.fileId + '/'
                }
            } else {
                url += 'login-cms-redirect/'
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
                Statamic.$toast.error(__('Error parsing image data'))
                return
            }

            if (! imageData.url) {
                Statamic.$toast.error(__('Invalid URL'))
                return
            }

            if (imageData.token !== this.token) {
                return
            }

            if (! ['image', 'video', 'file', 'vector', 'document'].includes(imageData.type)) {
                Statamic.$toast.error(__('Unknown type'))
                return
            }

            if (this.config.allow_type === 'images' && imageData.type !== 'image') {
                Statamic.$toast.error(__('Only images allowed'))
                return
            }

            if (this.config.allow_type === 'videos' && imageData.type !== 'video') {
                Statamic.$toast.error(__('Only videos allowed'))
                return
            }

            if (this.config.allow_type === 'files' && imageData.type !== 'file') {
                Statamic.$toast.error(__('Only files allowed'))
                return
            }

            if (this.config.allow_type === 'vectors' && imageData.type !== 'vector') {
                Statamic.$toast.error(__('Only vectors allowed'))
                return
            }

            if (this.config.allow_type === 'documents' && imageData.type !== 'document') {
                Statamic.$toast.error(__('Only documents allowed'))
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

<style scoped>
.kontainer-preview { margin-bottom: 0.5rem; }
.kontainer-preview a { display: inline-block; }
.kontainer-file {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    font-size: 0.875rem;
    border: 1px solid var(--color-gray-300, #d1d5db);
    border-radius: 0.375rem;
}
.kontainer-file-icon { flex: none; width: 1rem; height: 1rem; }
.kontainer-actions { display: flex; gap: 0.5rem; }
</style>
