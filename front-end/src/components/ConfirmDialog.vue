<template>
  <v-dialog v-model="open" max-width="480" attach="body" overlay-class="confirm-overlay" content-class="confirm-content">
    <v-card>
      <v-card-title class="text-h6">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" color="grey" @click="onCancel">{{ cancelText }}</v-btn>
        <v-btn color="primary" @click="onConfirm">{{ confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: 'Confirm' },
  message: { type: String, default: 'Are you sure?' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
})
const emits = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const open = ref(props.modelValue)

// Keep local `open` in sync with incoming prop
watch(
  () => props.modelValue,
  (val) => {
    if (val !== open.value) open.value = val
  }
)

// Emit update when local `open` changes
watch(open, (val) => {
  if (val !== props.modelValue) emits('update:modelValue', val)
})

function onConfirm() {
  emits('confirm')
  open.value = false
}

function onCancel() {
  emits('cancel')
  open.value = false
}
</script>

<style scoped>
/* Small adjustments */
</style>

<!-- global style to ensure confirm dialogs appear above other overlays -->
<style>
.confirm-overlay { z-index: 9999999 !important; position: fixed !important }
.confirm-content { z-index: 10000000 !important; position: relative !important }
/* ensure the scrim sits above other overlays and the dialog content is above scrim */
.confirm-overlay .v-overlay__scrim { z-index: 9999998 !important }
</style>
