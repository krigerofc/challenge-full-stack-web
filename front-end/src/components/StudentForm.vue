<template>
  <v-card class="pa-4 rounded elevation-6 form-card dialog-panel">
    <v-card-title>
      <div class="group-title">GRUPO A</div>
      <div class="form-title">{{ title }}</div>
    </v-card-title>
    <v-card-text>
      <v-form ref="formRef" v-model="valid" lazy-validation>
        <v-text-field v-model="form.fullName" label="Full Name" :rules="[rules.required]" outlined dense />
        <v-text-field v-model="form.email" label="Email" :rules="[rules.required, rules.email]" outlined dense />
        <v-text-field v-model="form.ra" label="RA" :disabled="isEdit" :rules="[rules.required]" outlined dense />
        <v-text-field v-model="form.cpf" label="CPF" :disabled="isEdit" :rules="[rules.required, rules.cpf]" outlined dense />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" color="blue" :disabled="loading" @click="onCancel"><v-icon left>mdi-cancel</v-icon>Cancel</v-btn>
      <v-btn :loading="loading" :disabled="loading || !valid" color="primary" @click="onSave"><v-icon left>mdi-content-save</v-icon>Save</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script setup>
import { ref, reactive, computed, watch, toRef } from 'vue'
import { validateCPF } from '../utils/cpf'
// import ConfirmDialog from '@/components/ConfirmDialog.vue'

const props = defineProps({ modelValue: Object, mode: { type: String, default: 'create' }, loading: { type: Boolean, default: false } })
const loading = toRef(props, 'loading')
const emit = defineEmits(['save', 'cancel'])

// const discardConfirmOpen = ref(false)

const isEdit = computed(() => props.mode === 'edit')

const formRef = ref(null)
const valid = ref(false)

const form = reactive({ fullName: '', email: '', ra: '', cpf: '' })

const initial = ref('')

watch(
  () => props.modelValue,
  val => {
    if (val) Object.assign(form, val)
    else {
      form.fullName = ''
      form.email = ''
      form.ra = ''
      form.cpf = ''
    }
    // store initial snapshot for dirty-check
    initial.value = JSON.stringify(val || { fullName: '', email: '', ra: '', cpf: '' })
  },
  { immediate: true }
)

function isDirty() {
  try {
    return JSON.stringify({ fullName: form.fullName, email: form.email, ra: form.ra, cpf: form.cpf }) !== initial.value
  } catch (e) {
    return false
  }
}

defineExpose({ isDirty })

const rules = {
  required: v => !!v || 'Field is required',
  email: v => /\S+@\S+\.\S+/.test(v) || 'Invalid email',
  cpf: v => validateCPF(v) || 'Invalid CPF',
}

const title = computed(() => (isEdit.value ? 'Edit Student' : 'Register Student'))

function onCancel() {
  emit('cancel')
}

// removed: discard confirmation modal

function onSave() {
  const ok = formRef.value?.validate ? formRef.value.validate() : valid.value
  if (!ok) return
  emit('save', { ...form })
}
</script>

<style scoped>
.v-card-title { display:flex; align-items:baseline; gap:12px }
.group-title { font-weight:700; color:#0d47a1; font-size:1rem }
.form-title { color: rgba(0,0,0,0.7); font-size:0.95rem }
.form-card { background:#ffffff; border-radius:12px }
.v-text-field { margin-bottom: 8px }
.dialog-panel { box-shadow: 0 8px 30px rgba(13,71,161,0.08); border: 1px solid rgba(13,71,161,0.06) }
</style>
